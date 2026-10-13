/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Copy, Share2, Wand2, Eye, 
  Check, X, HelpCircle, Save, BookOpen, AlertCircle,
  Volume2, VolumeX, Image as ImageIcon, Sparkles, Play,
  Download, FileText, Camera
} from 'lucide-react';
import { Question, QuestionType, SubjectType, DifficultyType } from '../types';
import { sounds } from '../lib/audio';
import AIOCRDocumentStudio from './AIOCRDocumentStudio';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface QuestionBankProps {
  questions: Question[];
  onDeleteQuestion: (id: string) => void;
  onUpdateQuestion: (id: string, q: Question) => void;
  onCreateQuestion: (q: Omit<Question, 'id' | 'useCount'>) => void;
  searchQuery?: string;
  typeFilter?: string;
  onNavigateToAI: () => void;
  onPlayQuestion: (q: Question) => void;
}

// Utility to play raw PCM 24khz Int16 audio data from Base64
function playRawPCM(base64Data: string, sampleRate = 24000) {
  try {
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const buffer = bytes.buffer;
    const int16Array = new Int16Array(buffer);
    
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = audioCtx.createBuffer(1, int16Array.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < int16Array.length; i++) {
      channelData[i] = int16Array[i] / 32768.0;
    }
    
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
    return { source, audioCtx };
  } catch (err) {
    console.error('Failed to play raw PCM:', err);
    return null;
  }
}

export default function QuestionBank({
  questions,
  onDeleteQuestion,
  onUpdateQuestion,
  onCreateQuestion,
  searchQuery = '',
  typeFilter = 'all',
  onNavigateToAI,
  onPlayQuestion
}: QuestionBankProps) {
  // Modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showOCRStudio, setShowOCRStudio] = useState(false);
  
  // Quick preview state
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  // Form states
  const [text, setText] = useState('');
  const [type, setType] = useState<QuestionType>('multiple_choice');
  const [subject, setSubject] = useState<SubjectType>('Toán');
  const [grade, setGrade] = useState<number>(3);
  const [difficulty, setDifficulty] = useState<DifficultyType>('Trung bình');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [tags, setTags] = useState<string>('');

  // AI loading state for in-place improvement
  const [improvingId, setImprovingId] = useState<string | null>(null);

  // TTS & Illustration states
  const [selectedVoice, setSelectedVoice] = useState<'Kore' | 'Zephyr' | 'Fenrir' | 'Puck' | 'Charon'>('Kore');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [ttsLoadingId, setTtsLoadingId] = useState<string | null>(null);
  const [imageLoadingId, setImageLoadingId] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<{ source: AudioBufferSourceNode, audioCtx: AudioContext } | null>(null);

  const handlePlaySpeech = async (q: Question) => {
    // Stop if already playing
    if (playingId === q.id) {
      sounds.playClick();
      if (activeAudio) {
        try { activeAudio.source.stop(); } catch (e) {}
        setActiveAudio(null);
      }
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    // Stop current playbacks
    if (activeAudio) {
      try { activeAudio.source.stop(); } catch (e) {}
      setActiveAudio(null);
    }
    window.speechSynthesis.cancel();

    setTtsLoadingId(q.id);
    sounds.playClick();

    try {
      const response = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: q.text, voice: selectedVoice })
      });

      const data = await response.json();
      if (data.audio) {
        const decoded = playRawPCM(data.audio);
        if (decoded) {
          setActiveAudio(decoded);
          setPlayingId(q.id);
          decoded.source.onended = () => {
            setPlayingId(null);
            setActiveAudio(null);
          };
        } else {
          throw new Error('PCM decode failure');
        }
      } else {
        // Fallback to web speech synth
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(q.text);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;
        utterance.pitch = selectedVoice === 'Kore' || selectedVoice === 'Zephyr' ? 1.1 : 0.9;
        utterance.onend = () => setPlayingId(null);
        utterance.onerror = () => setPlayingId(null);
        setPlayingId(q.id);
        synth.speak(utterance);
      }
    } catch (err) {
      console.warn('TTS fetch failed or unsupported, falling back to local SpeechSynthesis:', err);
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(q.text);
      utterance.lang = 'vi-VN';
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      setPlayingId(q.id);
      synth.speak(utterance);
    } finally {
      setTtsLoadingId(null);
    }
  };

  const handleGenerateIllustration = async (q: Question) => {
    sounds.playClick();
    setImageLoadingId(q.id);

    try {
      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q.text })
      });

      const data = await response.json();
      if (data.imageUrl) {
        onUpdateQuestion(q.id, {
          ...q,
          imageUrl: data.imageUrl
        });
        sounds.playLevelUp();
        alert('🎨 Vẽ tranh thành công rồi cô ơi! Trợ lý Ong Vàng đã hoàn thành một bức tranh minh họa siêu ngộ nghĩnh cho câu hỏi này rồi ạ!');
      } else {
        throw new Error('Image creation failed');
      }
    } catch (err: any) {
      console.error(err);
      sounds.playError();
      alert(`Bzzzz... Gặp lỗi khi vẽ tranh: ${err.message}`);
    } finally {
      setImageLoadingId(null);
    }
  };

  // Subject configurations for colorful styling
  const subjectStyles: Record<SubjectType, { bg: string, text: string, icon: string, border: string }> = {
    'Toán': { bg: 'bg-red-100', text: 'text-red-600 border-red-200', icon: '📐', border: 'border-red-100' },
    'Tiếng Việt': { bg: 'bg-indigo-100', text: 'text-indigo-600 border-indigo-200', icon: '📝', border: 'border-indigo-100' },
    'Tiếng Anh': { bg: 'bg-pink-100', text: 'text-pink-600 border-pink-200', icon: '🇬🇧', border: 'border-pink-100' },
    'Tự nhiên & Xã hội': { bg: 'bg-teal-100', text: 'text-teal-600 border-teal-200', icon: '🌱', border: 'border-teal-100' },
    'Khoa học': { bg: 'bg-sky-100', text: 'text-sky-600 border-sky-200', icon: '🔬', border: 'border-sky-100' },
    'Lịch sử & Địa lý': { bg: 'bg-amber-100', text: 'text-amber-700 border-amber-200', icon: '🗺️', border: 'border-amber-100' },
    'Đạo đức': { bg: 'bg-rose-100', text: 'text-rose-600 border-rose-200', icon: '💖', border: 'border-rose-100' },
    'Tin học': { bg: 'bg-cyan-100', text: 'text-cyan-600 border-cyan-200', icon: '💻', border: 'border-cyan-100' },
    'Công nghệ': { bg: 'bg-orange-100', text: 'text-orange-600 border-orange-200', icon: '⚙️', border: 'border-orange-100' },
    'Hoạt động trải nghiệm': { bg: 'bg-violet-100', text: 'text-violet-600 border-violet-200', icon: '🎒', border: 'border-violet-100' }
  };

  // Filter & Search the questions
  const filteredQuestions = (questions || []).filter(q => {
    if (!q) return false;
    const qText = q.text || '';
    const qExp = q.explanation || '';
    const qSubj = q.subject || '';
    // 1. Search Query
    const textMatch = qText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     qExp.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     qSubj.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Type Filter
    let typeMatch = true;
    if (typeFilter !== 'all') {
      if (typeFilter === 'quiz' || typeFilter === 'multiple_choice') typeMatch = q.type === 'multiple_choice';
      else if (typeFilter === 'fill' || typeFilter === 'fill_blank') typeMatch = q.type === 'fill_blank';
      else if (typeFilter === 'reorder_words') typeMatch = q.type === 'reorder_words';
      else if (typeFilter === 'answer_question') typeMatch = q.type === 'answer_question';
      else if (typeFilter === 'reorder_letters') typeMatch = q.type === 'reorder_letters';
      else if (typeFilter === 'true_false') typeMatch = q.type === 'true_false';
      else if (typeFilter === 'essay') typeMatch = q.type === 'essay';
      else if (typeFilter === 'matching') typeMatch = q.type === 'matching';
      else if (typeFilter === 'random') typeMatch = q.id.includes('ai') || q.id.includes('imp');
    }

    return textMatch && typeMatch;
  });

  // Export questions list to Word document (.docx format)
  const handleExportToWord = () => {
    sounds.playCoin();
    if (filteredQuestions.length === 0) {
      sounds.playError();
      alert('Không có câu hỏi nào trong kho để xuất ra file Word!');
      return;
    }

    const dateStr = new Date().toLocaleDateString('vi-VN');
    
    const headerHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Kho Câu Hỏi SmartEdu</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; margin: 2cm; }
          .header-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
          .header-table td { font-size: 11pt; vertical-align: top; }
          .title { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin-top: 15px; margin-bottom: 5px; color: #1e3a8a; }
          .subtitle { text-align: center; font-size: 11pt; font-style: italic; margin-bottom: 25px; color: #475569; }
          .section-header { font-size: 14pt; font-weight: bold; color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-top: 25px; margin-bottom: 15px; }
          .question-box { margin-bottom: 18px; }
          .question-title { font-weight: bold; color: #0f172a; }
          .badge { font-size: 10pt; color: #64748b; font-weight: normal; font-style: italic; }
          .options-table { margin-top: 6px; margin-left: 20px; width: 90%; border-collapse: collapse; }
          .options-table td { width: 50%; padding: 4px 0; font-size: 12pt; }
          .written-line { color: #475569; margin-top: 8px; margin-left: 20px; font-style: italic; }
          .answer-key-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .answer-key-table th, .answer-key-table td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-size: 11pt; }
          .answer-key-table th { background-color: #f1f5f9; font-weight: bold; color: #1e293b; }
          .footer-note { margin-top: 30px; text-align: center; font-size: 10pt; color: #94a3b8; font-style: italic; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 50%;">
              <b>TRƯỜNG TIỂU HỌC: ............................................</b><br/>
              <b>LỚP: ................................................................</b><br/>
              <b>HỌ VÀ TÊN: ....................................................</b>
            </td>
            <td style="width: 50%; text-align: right;">
              <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br/>
              <b>Độc lập - Tự do - Hạnh phúc</b><br/>
              <i>Ngày xuất file: ${dateStr}</i>
            </td>
          </tr>
        </table>

        <div class="title">BỘ CÂU HỎI VÀ ĐỀ THI TIỂU HỌC CHUẨN CTGDPT 2018</div>
        <div class="subtitle">(Trích xuất từ Ngân hàng câu hỏi thông minh SmartEdu AI)</div>

        <div class="section-header">PHẦN I: DANH SÁCH CÂU HỎI (${filteredQuestions.length} CÂU)</div>
    `;

    let bodyHtml = '';
    filteredQuestions.forEach((q, idx) => {
      let typeLabel = '';
      if (q.type === 'multiple_choice') typeLabel = 'Trắc nghiệm';
      else if (q.type === 'fill_blank') typeLabel = 'Điền từ vào chỗ trống (Fill in the blanks)';
      else if (q.type === 'reorder_words') typeLabel = 'Sắp xếp từ thành câu (Reorder the words)';
      else if (q.type === 'answer_question') typeLabel = 'Trả lời câu hỏi (Answering Questions)';
      else if (q.type === 'reorder_letters') typeLabel = 'Sắp xếp chữ cái (Reorder the letters)';
      else if (q.type === 'true_false') typeLabel = 'Đúng / Sai';
      else typeLabel = 'Tự luận';

      bodyHtml += `
        <div class="question-box">
          <div class="question-title">
            Câu ${idx + 1} <span class="badge">[Môn: ${q.subject} - Lớp ${q.grade} | Dạng: ${typeLabel} | Độ khó: ${q.difficulty}]</span>:
          </div>
          <div style="margin-left: 10px; margin-top: 4px; font-weight: 500;">${q.text}</div>
      `;

      if (q.type === 'multiple_choice' && q.options && q.options.length > 0) {
        bodyHtml += `
          <table class="options-table">
            <tr>
              <td>A. ${q.options[0] || ''}</td>
              <td>B. ${q.options[1] || ''}</td>
            </tr>
            <tr>
              <td>C. ${q.options[2] || ''}</td>
              <td>D. ${q.options[3] || ''}</td>
            </tr>
          </table>
        `;
      } else if (q.type === 'fill_blank') {
        bodyHtml += `<div class="written-line">👉 Điền vào chỗ trống: ............................................................................................</div>`;
      } else if (q.type === 'reorder_words') {
        bodyHtml += `<div class="written-line">👉 Sắp xếp lại câu hoàn chỉnh: ............................................................................................</div>`;
      } else if (q.type === 'answer_question') {
        bodyHtml += `<div class="written-line">👉 Trả lời câu hỏi: ....................................................................................................................</div>`;
      } else if (q.type === 'reorder_letters') {
        bodyHtml += `<div class="written-line">👉 Từ tiếng Anh hoàn chỉnh: ....................................................................................................</div>`;
      } else if (q.type === 'essay') {
        bodyHtml += `<div class="written-line">Bài làm:<br/>........................................................................................................................................................................................................................................................................................................</div>`;
      } else if (q.type === 'true_false') {
        bodyHtml += `<div class="written-line">Ghi [Đúng] hoặc [Sai]: [ .......... ]</div>`;
      }

      bodyHtml += `</div>`;
    });

    const keyHtml = `
      <div class="section-header" style="page-break-before: always;">PHẦN II: ĐÁP ÁN VÀ LỜI GIẢI CHI TIẾT</div>
      <table class="answer-key-table">
        <thead>
          <tr>
            <th style="width: 10%;">Câu</th>
            <th style="width: 30%;">Đáp án đúng</th>
            <th style="width: 60%;">Lời giải / Lời khuyên cho học sinh</th>
          </tr>
        </thead>
        <tbody>
          ${filteredQuestions.map((q, idx) => `
            <tr>
              <td style="text-align: center; font-weight: bold;">Câu ${idx + 1}</td>
              <td style="color: #166534; font-weight: bold;">${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}</td>
              <td>${q.explanation || 'Không có ghi chú.'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer-note">
        Trích xuất từ SmartEdu AI - Trợ Lý Giáo Viên Thông Minh 🐝🌸
      </div>
      </body>
      </html>
    `;

    const fullHtml = headerHtml + bodyHtml + keyHtml;
    const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartEdu_Kho_Cau_Hoi_${dateStr.replace(/\//g, '-')}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    sounds.playLevelUp();
    alert(`📄 Xuất file Word thành công! Đã tải xuống bộ đề thi ${filteredQuestions.length} câu hỏi (.docx) cho cô giáo!`);
  };

  const handleOpenCreateForm = () => {
    sounds.playClick();
    setEditingQuestion(null);
    setText('');
    setType('multiple_choice');
    setSubject('Toán');
    setGrade(3);
    setDifficulty('Trung bình');
    setOptions(['', '', '', '']);
    setAnswer('');
    setExplanation('');
    setTags('');
    setShowFormModal(true);
  };

  const handleOpenEditForm = (q: Question) => {
    sounds.playClick();
    setEditingQuestion(q);
    setText(q.text);
    setType(q.type);
    setSubject(q.subject);
    setGrade(q.grade);
    setDifficulty(q.difficulty);
    setOptions(q.options && q.options.length ? [...q.options] : ['', '', '', '']);
    setAnswer(typeof q.answer === 'string' ? q.answer : q.answer[0] || '');
    setExplanation(q.explanation || '');
    setTags(q.tags ? q.tags.join(', ') : '');
    setShowFormModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !answer) {
      sounds.playError();
      alert('Vui lòng điền nội dung câu hỏi và đáp án đúng nhé cô!');
      return;
    }

    const filteredOptions = type === 'multiple_choice' ? options.filter(o => o.trim() !== '') : [];

    const preparedData = {
      text,
      type,
      subject,
      grade: Number(grade),
      difficulty,
      options: filteredOptions,
      answer: answer.trim(),
      explanation,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t !== '') : []
    };

    if (editingQuestion) {
      onUpdateQuestion(editingQuestion.id, {
        ...editingQuestion,
        ...preparedData
      });
      sounds.playSuccess();
    } else {
      onCreateQuestion(preparedData);
      sounds.playSuccess();
    }

    setShowFormModal(false);
  };

  const handleCopy = (q: Question) => {
    sounds.playCoin();
    navigator.clipboard.writeText(q.text);
    alert('📋 Đã sao chép nội dung câu hỏi vào khay nhớ tạm!');
  };

  const handleShare = (q: Question) => {
    sounds.playSuccess();
    alert(`🔗 Đã tạo liên kết chia sẻ cho câu hỏi: "${q.text.substring(0, 30)}...". Bạn có thể gửi cho đồng nghiệp của mình!`);
  };

  // AI-powered improvement
  const handleAIImprove = async (q: Question) => {
    sounds.playClick();
    setImprovingId(q.id);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `Hãy viết lại câu hỏi sau đây cho dễ thương hơn, thú vị hơn, chèn thêm các phép so sánh ngộ nghĩnh hoặc nhân vật cổ tích dành cho học sinh tiểu học: "${q.text}"`,
          subject: q.subject,
          grade: q.grade,
          difficulty: q.difficulty,
          type: q.type,
          count: 1
        })
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        const aiQ = data.questions[0];
        onUpdateQuestion(q.id, {
          ...q,
          text: aiQ.text,
          options: aiQ.options && aiQ.options.length ? aiQ.options : q.options,
          answer: aiQ.answer || q.answer,
          explanation: aiQ.explanation || q.explanation,
          tags: [...(q.tags || []), 'Sửa bằng AI 🐝']
        });
        sounds.playLevelUp();
        alert('✨ Phép thuật AI thành công! Câu hỏi của cô đã được trau chuốt sinh động hơn gấp 10 lần rồi đấy! 🐝');
      }
    } catch (err) {
      console.error(err);
      sounds.playError();
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 select-none animate-fade-in">
      
      {/* Title & Floating Create Button Row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-fredoka text-xl md:text-2xl font-extrabold text-indigo-700 flex items-center gap-2">
            📖 Ngân hàng câu hỏi của bạn
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-semibold mt-1">
            Đang hiển thị {filteredQuestions.length} / {questions.length} câu hỏi • Xuất file Word sẵn sàng in ấn cho học sinh
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              sounds.playClick();
              setShowOCRStudio(true);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-950 font-fredoka font-extrabold text-sm px-4 py-3 rounded-2xl shadow-md border-2 border-yellow-200 hover:scale-105 active:scale-95 cursor-pointer transition-all"
            title="Sử dụng AI OCR để quét hình ảnh bài tập hoặc tài liệu PDF và tự động tạo câu hỏi"
          >
            <Camera className="w-4 h-4" />
            <span>📷 AI OCR (Ảnh / PDF)</span>
          </button>

          <button
            onClick={handleExportToWord}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-fredoka font-extrabold text-sm px-4 py-3 rounded-2xl shadow-md border-2 border-white/20 hover:scale-105 active:scale-95 cursor-pointer transition-all"
            title="Xuất danh sách câu hỏi ra file Word (.docx)"
          >
            <Download className="w-4 h-4" />
            <span>Tải về file Word (.docx)</span>
          </button>

          <button
            onClick={handleOpenCreateForm}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-fredoka font-extrabold text-sm px-4 py-3 rounded-2xl shadow-md border-2 border-white/20 hover:scale-105 active:scale-95 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm câu hỏi</span>
          </button>
        </div>
      </div>

      {/* Main Grid Card View */}
      {filteredQuestions.length === 0 ? (
        /* Cute Smart Owl Empty State */
        <div className="flex flex-col items-center justify-center py-16 bg-white/40 backdrop-blur-md rounded-[40px] border-4 border-dashed border-indigo-100 max-w-2xl mx-auto text-center p-8 space-y-5 animate-float-slow">
          <div className="w-40 h-40 rounded-full bg-indigo-50 flex items-center justify-center text-8xl shadow-inner relative animate-float">
            🦉
            <div className="absolute top-2 right-2 text-2xl animate-pulse">🎓</div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-fredoka text-2xl font-extrabold text-indigo-700">
              Kho câu hỏi của bạn đang trống!
            </h3>
            <p className="text-sm font-semibold text-gray-400 max-w-md mx-auto">
              Đừng lo lắng nhé! Hãy bắt đầu tạo ngay những câu đố dễ thương và vui vẻ với sự trợ giúp thông minh của trợ lý AI.
            </p>
          </div>

          <button
            onClick={onNavigateToAI}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-fredoka font-extrabold px-8 py-4 rounded-3xl shadow-lg border-2 border-white/30 hover:scale-105 active:scale-95 cursor-pointer transition-all animate-bounce"
          >
            <Wand2 className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>✨ Bắt đầu tạo ngay với AI</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Voice selection for TTS */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <div>
                <p className="font-fredoka text-xs font-extrabold text-indigo-800">Cấu hình giọng nói AI (Text-To-Speech)</p>
                <p className="text-[10px] text-gray-400 font-bold font-sans">Chọn giọng đọc của Trợ lý Ong Vàng để rèn luyện kỹ năng nghe cho các bé</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 font-sans">Giọng đọc:</span>
              <select
                value={selectedVoice}
                onChange={(e) => {
                  sounds.playCoin();
                  setSelectedVoice(e.target.value as any);
                }}
                className="p-2 bg-white border-2 border-indigo-100 rounded-xl outline-none font-fredoka font-bold text-xs text-indigo-700 cursor-pointer"
              >
                <option value="Kore">🌸 Kore (Nữ ngọt ngào)</option>
                <option value="Zephyr">🍃 Zephyr (Nữ trong trẻo)</option>
                <option value="Fenrir">🐾 Fenrir (Nam ấm áp)</option>
                <option value="Puck">🐝 Puck (Nam vui vẻ)</option>
                <option value="Charon">🦁 Charon (Nam dõng dạc)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuestions.map((q) => {
            const style = subjectStyles[q.subject] || { bg: 'bg-gray-100', text: 'text-gray-600 border-gray-200', icon: '❓', border: 'border-gray-100' };
            const isImproving = improvingId === q.id;

            return (
              <div 
                key={q.id}
                className="bg-white/80 backdrop-blur-sm rounded-[28px] border-3 border-indigo-50/50 p-5 shadow-lg card-cute flex flex-col justify-between"
              >
                {/* Card Top: Subject & Type & Difficulty badges */}
                <div className="flex items-center justify-between mb-3.5 flex-wrap gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{style.icon}</span>
                    <span className={`px-2.5 py-0.5 text-xs font-fredoka font-bold rounded-full border bg-white ${style.text}`}>
                      {q.subject} • Lớp {q.grade}
                    </span>
                  </div>

                  <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {q.type === 'multiple_choice' ? '✍️ Trắc nghiệm' 
                     : q.type === 'true_false' ? '⚖️ Đúng/Sai' 
                     : q.type === 'fill_blank' ? '✏️ Điền từ' 
                     : q.type === 'reorder_words' ? '🔤 Reorder Words' 
                     : q.type === 'answer_question' ? '💬 Answering Questions' 
                     : q.type === 'reorder_letters' ? '🔠 Reorder Letters' 
                     : '📝 Tự luận'}
                  </span>
                </div>

                {/* Card Middle: Question text */}
                <div className="space-y-3 flex-1">
                  {q.imageUrl && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden border-2 border-indigo-50 shadow-sm relative group bg-indigo-50 flex items-center justify-center mb-2.5">
                      <img 
                        src={q.imageUrl} 
                        alt={q.text} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                      />
                      <div className="absolute top-2 right-2 bg-indigo-600/90 backdrop-blur-md text-white text-[9px] font-fredoka font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Tranh hoạt hình AI 🎨
                      </div>
                    </div>
                  )}
                  <h4 className="font-sans font-bold text-gray-700 text-sm md:text-base leading-snug">
                    {q.text}
                  </h4>

                  {/* If Multiple choice, render choice pills */}
                  {q.type === 'multiple_choice' && q.options && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {q.options.map((opt, idx) => {
                        const isCorrect = opt === q.answer;
                        return (
                          <div 
                            key={idx}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border truncate text-left
                              ${isCorrect 
                                ? 'bg-green-50 text-green-700 border-green-200 shadow-inner' 
                                : 'bg-gray-50/50 text-gray-400 border-gray-100'
                              }
                            `}
                          >
                            <span className="opacity-50 mr-1">{idx === 0 ? 'A.' : idx === 1 ? 'B.' : idx === 2 ? 'C.' : 'D.'}</span>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Render Answer for non-multiple choice */}
                  {q.type !== 'multiple_choice' && (
                    <div className="p-2.5 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-inner">
                      <span className="text-base">🔑</span>
                      <span>Đáp án: <strong className="underline decoration-green-400 decoration-2">{q.answer}</strong></span>
                    </div>
                  )}

                  {/* Tags */}
                  {q.tags && q.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {q.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-indigo-50/50 text-indigo-400 font-bold px-2 py-0.5 rounded-full border border-indigo-50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Metadata and CTA tools */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-semibold">
                  <span>🎯 Dùng {q.useCount} lần</span>

                  <div className="flex items-center gap-1">
                    
                    {/* TTS Giọng đọc */}
                    <button
                      disabled={ttsLoadingId === q.id}
                      onClick={() => handlePlaySpeech(q)}
                      className={`p-1.5 rounded-lg border-2 text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 cursor-pointer hover:scale-105 transition-all
                        ${ttsLoadingId === q.id ? 'animate-pulse bg-amber-100' : 'border-amber-200'}
                      `}
                      title={playingId === q.id ? 'Dừng đọc câu hỏi' : 'Đọc câu hỏi bằng AI'}
                    >
                      {playingId === q.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-red-500 animate-bounce" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Minh họa hình hoạt hình */}
                    <button
                      disabled={imageLoadingId === q.id}
                      onClick={() => handleGenerateIllustration(q)}
                      className={`p-1.5 rounded-lg border-2 text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 cursor-pointer hover:scale-105 transition-all
                        ${imageLoadingId === q.id ? 'animate-spin border-rose-400 border-t-transparent' : 'border-rose-200'}
                      `}
                      title="AI vẽ tranh hoạt hình minh họa"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                    </button>

                    {/* Sửa nhanh bằng AI */}
                    <button
                      disabled={isImproving}
                      onClick={() => handleAIImprove(q)}
                      className={`p-1.5 rounded-lg border-2 text-indigo-500 hover:text-indigo-600 bg-indigo-50 hover:bg-indigo-100 cursor-pointer hover:scale-105 transition-all
                        ${isImproving ? 'animate-spin border-indigo-400 border-t-transparent bg-transparent' : 'border-indigo-200'}
                      `}
                      title="AI trau chuốt câu hỏi siêu dễ thương"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Preview */}
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setPreviewQuestion(q);
                      }}
                      className="p-1.5 rounded-lg border border-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer hover:scale-105 transition-all"
                      title="Xem trước giải thích"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Play Game */}
                    <button
                      onClick={() => {
                        sounds.playCoin();
                        onPlayQuestion(q);
                      }}
                      className="p-1.5 rounded-lg border border-pink-200 text-pink-500 hover:text-pink-600 hover:bg-pink-50 bg-white cursor-pointer hover:scale-110 transition-all font-bold flex items-center gap-1 shadow-sm"
                      title="Chơi câu hỏi này ngay!"
                    >
                      <Play className="w-3 h-3 fill-pink-500 text-pink-500" />
                      <span className="text-[10px] font-fredoka font-extrabold hidden md:inline">Chơi</span>
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(q)}
                      className="p-1.5 rounded-lg border border-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer hover:scale-105 transition-all"
                      title="Sao chép câu hỏi"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Share */}
                    <button
                      onClick={() => handleShare(q)}
                      className="p-1.5 rounded-lg border border-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer hover:scale-105 transition-all"
                      title="Chia sẻ câu hỏi"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleOpenEditForm(q)}
                      className="p-1.5 rounded-lg border border-pink-100 text-pink-500 hover:text-pink-600 hover:bg-pink-50 cursor-pointer hover:scale-105 transition-all"
                      title="Sửa thủ công"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setQuestionToDelete(q)}
                      className="p-1.5 rounded-lg border border-red-100 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer hover:scale-105 transition-all"
                      title="Xóa câu hỏi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* 5. Custom Form Popup Modal for Create/Edit */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <form 
            onSubmit={handleSave}
            className="w-full max-w-xl bg-white rounded-[32px] border-4 border-pink-100 shadow-2xl p-6 relative my-8 animate-float"
          >
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setShowFormModal(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-lg cursor-pointer transition-all"
            >
              ✕
            </button>

            <h3 className="font-fredoka text-xl font-extrabold text-pink-600 flex items-center gap-1.5 mb-4 border-b border-pink-50 pb-2">
              📝 {editingQuestion ? 'Sửa câu hỏi học tập' : 'Thêm câu hỏi thủ công'}
            </h3>

            <div className="space-y-4 text-xs font-bold text-gray-500 text-left">
              {/* Subject & Grade */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400">📚 Môn học</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as SubjectType)}
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none"
                  >
                    <option value="Toán">📐 Toán</option>
                    <option value="Tiếng Việt">📝 Tiếng Việt</option>
                    <option value="Tiếng Anh">🇬🇧 Tiếng Anh</option>
                    <option value="Tự nhiên & Xã hội">🌱 Tự nhiên & Xã hội</option>
                    <option value="Khoa học">🔬 Khoa học</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400">🏫 Khối lớp</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none"
                  >
                    {[1, 2, 3, 4, 5].map(g => (
                      <option key={g} value={g}>Lớp {g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type & Difficulty */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400">❓ Loại câu hỏi</label>
                  <select
                    value={type}
                    onChange={(e) => {
                      const selectedType = e.target.value as QuestionType;
                      setType(selectedType);
                      if (selectedType === 'true_false') {
                        setOptions(['Đúng', 'Sai']);
                        setAnswer('Đúng');
                      } else {
                        setOptions(['', '', '', '']);
                      }
                    }}
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none"
                  >
                    <option value="multiple_choice">✍️ Trắc nghiệm (4 lựa chọn)</option>
                    <option value="fill_blank">✏️ Điền vào chỗ trống (Fill in the blanks)</option>
                    <option value="reorder_words">🔤 Sắp xếp từ thành câu (Reorder the words)</option>
                    <option value="answer_question">💬 Trả lời câu hỏi (Answering Questions)</option>
                    <option value="reorder_letters">🔠 Sắp xếp chữ cái (Reorder the letters)</option>
                    <option value="true_false">⚖️ Đúng / Sai</option>
                    <option value="essay">📝 Tự luận / Trả lời ngắn</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400">⭐ Độ khó</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyType)}
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none"
                  >
                    <option value="Dễ">Dễ (Nhận biết)</option>
                    <option value="Trung bình">Trung bình (Thông hiểu)</option>
                    <option value="Khó">Khó (Vận dụng)</option>
                  </select>
                </div>
              </div>

              {/* Question Text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400">💬 Nội dung câu hỏi</label>
                <textarea
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ví dụ: Có bao nhiêu quả táo trong 3 túi nếu mỗi túi có 5 quả?"
                  className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none font-sans font-semibold text-gray-700 placeholder-gray-300"
                />
              </div>

              {/* Options for Multiple Choice */}
              {type === 'multiple_choice' && (
                <div className="space-y-2">
                  <label className="text-gray-400">🛠️ Các phương án lựa chọn (vui lòng chọn một đáp án đúng phía dưới)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border-2 border-indigo-50">
                        <span className="text-xs font-bold text-gray-400 ml-1.5">{idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D'}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...options];
                            newOpts[idx] = e.target.value;
                            setOptions(newOpts);
                          }}
                          placeholder={`Lựa chọn ${idx + 1}`}
                          className="w-full bg-transparent border-0 outline-none text-xs font-semibold px-2 py-1 text-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400">🔑 Đáp án đúng</label>
                {type === 'true_false' ? (
                  <select
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none"
                  >
                    <option value="Đúng">Đúng</option>
                    <option value="Sai">Sai</option>
                  </select>
                ) : type === 'multiple_choice' ? (
                  <select
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none text-gray-700"
                  >
                    <option value="">-- Chọn đáp án đúng từ các lựa chọn trên --</option>
                    {options.filter(o => o.trim() !== '').map((o, i) => (
                      <option key={i} value={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Điền từ hoặc số đúng nhất"
                    className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none text-gray-700"
                  />
                )}
              </div>

              {/* Explanation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400">💡 Giải thích vui tươi cho học sinh</label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Lời giải thích vui nhộn, khuyến khích học sinh bé nhỏ..."
                  className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none font-sans text-xs text-gray-700 placeholder-gray-300"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400">🏷️ Nhãn dán nhãn (cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="ví dụ: Phép nhân, Hình học, Trái cây, Động vật"
                  className="p-2.5 bg-gray-50 border-2 border-indigo-50 rounded-xl outline-none font-sans text-xs text-gray-700 placeholder-gray-300"
                />
              </div>
            </div>

            {/* Modal Bottom actions */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setShowFormModal(false);
                }}
                className="px-5 py-2.5 rounded-2xl bg-gray-100 text-gray-600 font-fredoka font-bold text-sm hover:bg-gray-200 cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-fredoka font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Lưu câu hỏi</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Explanation View Drawer/Modal */}
      {previewQuestion && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[32px] border-4 border-indigo-200 shadow-2xl p-6 relative animate-float">
            <button
              onClick={() => {
                sounds.playClick();
                setPreviewQuestion(null);
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-base cursor-pointer"
            >
              ✕
            </button>

            <span className="text-3xl">💡</span>
            <h3 className="font-fredoka text-lg font-bold text-indigo-700 mt-2 mb-1.5">
              Lời giải thích sinh động cho trẻ
            </h3>
            
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
              Môn {previewQuestion.subject} • Lớp {previewQuestion.grade}
            </p>

            <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4 text-left space-y-2">
              <p className="font-sans font-bold text-gray-700 text-sm italic">
                "{previewQuestion.text}"
              </p>
              <div className="h-[2px] bg-indigo-100"></div>
              <p className="font-sans font-semibold text-indigo-700 text-xs md:text-sm leading-relaxed">
                🎈 {previewQuestion.explanation || 'Không có lời giải thích kèm theo. Nhưng chúc mừng bé đã vượt qua câu hỏi xuất sắc!'}
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setPreviewQuestion(null);
              }}
              className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-fredoka font-bold py-3 rounded-2xl cursor-pointer transition-all active:scale-95 text-sm"
            >
              Hiểu rồi! Đóng xem thử
            </button>
          </div>
        </div>
      )}

      {/* AI OCR Document Studio Modal */}
      {showOCRStudio && (
        <AIOCRDocumentStudio
          isOpenModal={true}
          onCloseModal={() => setShowOCRStudio(false)}
          onAddQuestions={(newQuestions) => {
            newQuestions.forEach(q => onCreateQuestion(q));
            setShowOCRStudio(false);
          }}
          defaultSubject="Tiếng Việt"
          defaultGrade={3}
        />
      )}

      {/* Confirm Delete Question Modal */}
      <ConfirmDeleteModal
        isOpen={!!questionToDelete}
        onClose={() => setQuestionToDelete(null)}
        title="Xác nhận xóa câu hỏi"
        itemName={questionToDelete?.text}
        description="Thầy cô có chắc chắn muốn xóa câu hỏi này khỏi Ngân hàng câu hỏi không?"
        confirmText="Xác nhận xóa 🗑️"
        cancelText="Giữ lại"
        onConfirm={() => {
          if (questionToDelete) {
            sounds.playError();
            onDeleteQuestion(questionToDelete.id);
            setQuestionToDelete(null);
          }
        }}
      />
    </div>
  );
}
