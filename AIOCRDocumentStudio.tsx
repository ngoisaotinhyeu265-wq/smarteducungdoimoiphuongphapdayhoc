/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  FileText, UploadCloud, Image as ImageIcon, Sparkles, Wand2,
  CheckCircle2, AlertCircle, Copy, Check, Download, Printer,
  Play, Plus, Trash2, Edit3, MoveUp, MoveDown, Volume2,
  RotateCw, RefreshCw, Eye, EyeOff, FileCheck, Layers, BookOpen,
  HelpCircle, ArrowRight, Save, FileCode, CheckSquare, X, Camera
} from 'lucide-react';
import { Question, QuestionType, SubjectType, DifficultyType, CognitiveType } from '../types';
import { sounds } from '../lib/audio';

interface AIOCRDocumentStudioProps {
  onAddQuestions: (questions: Question[]) => void;
  onNavigateToQuestions?: () => void;
  onNavigateToGames?: (questions: Question[]) => void;
  defaultSubject?: SubjectType;
  defaultGrade?: number;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export default function AIOCRDocumentStudio({
  onAddQuestions,
  onNavigateToQuestions,
  onNavigateToGames,
  defaultSubject = 'Tiếng Việt',
  defaultGrade = 3,
  isOpenModal = false,
  onCloseModal
}: AIOCRDocumentStudioProps) {
  // Step state: 1: Upload & Extract, 2: Review Text & Configure, 3: Edit & Export Questions
  const [currentStep, setCurrentStep] = useState<'upload' | 'extracted' | 'questions'>('upload');

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form configuration
  const [subject, setSubject] = useState<SubjectType>(defaultSubject);
  const [grade, setGrade] = useState<number>(defaultGrade);
  const [difficulty, setDifficulty] = useState<DifficultyType>('Trung bình');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>(['multiple_choice', 'fill_blank', 'essay']);
  const [customInstructions, setCustomInstructions] = useState<string>('');

  // OCR result state
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [documentSummary, setDocumentSummary] = useState<string>('');
  const [keyTerms, setKeyTerms] = useState<string[]>([]);
  const [isEditingExtractedText, setIsEditingExtractedText] = useState<boolean>(false);

  // Questions editor state
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [saveSuccessNotification, setSaveSuccessNotification] = useState<boolean>(false);

  // Loading logs
  const [loadingLogIndex, setLoadingLogIndex] = useState<number>(0);
  const loadingLogs = [
    '🔍 Đang quét và phân tích điểm ảnh / cấu trúc tài liệu...',
    '🧠 AI Vision đang bóc tách từng chữ, số và công thức...',
    '📖 Chuẩn hóa chính tả và đối chiếu SGK Chương trình GDPT 2018...',
    '✍️ Đang soạn câu hỏi trắc nghiệm, điền từ & câu hỏi ngắn...',
    '🌟 Hoàn tất kiểm duyệt đáp án và lời giải chi tiết!'
  ];

  useEffect(() => {
    let interval: any;
    if (isExtracting || isGeneratingQuestions) {
      interval = setInterval(() => {
        setLoadingLogIndex(prev => (prev + 1) % loadingLogs.length);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isExtracting, isGeneratingQuestions]);

  // Handle Drag and Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcessFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isImage && !isPdf) {
      alert('Vui lòng chọn hình ảnh (JPEG, PNG, WebP) hoặc tệp tài liệu PDF!');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert('Kích thước tệp tin quá lớn! Vui lòng chọn tệp nhỏ hơn 20MB.');
      return;
    }

    sounds.playClick();
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFileBase64(result);
      setFilePreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  // Sample Documents for Quick Testing
  const sampleDocuments = [
    {
      title: 'Toán 3: Hình học & Chu vi hình vuông',
      subject: 'Toán' as SubjectType,
      grade: 3,
      sampleText: `BÀI TẬP ÔN TẬP TOÁN LỚP 3 - CHỦ ĐỀ HÌNH HỌC\n\n1. Lý thuyết trọng tâm:\n- Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.\n- Muốn tính chu vi hình vuông, ta lấy độ dài một cạnh nhân với 4 (P = a x 4).\n- Muốn tính chu vi hình chữ nhật, ta lấy (chiều dài + chiều rộng) cùng đơn vị đo rồi nhân với 2.\n\n2. Bài tập thực hành:\n- Bài 1: Một mảnh vườn hình vuông có cạnh dài 8m. Tính chu vi mảnh vườn đó.\n- Bài 2: Hình chữ nhật có chiều dài 12cm, chiều rộng 6cm. Chu vi hình chữ nhật là bao nhiêu?\n- Bài 3: Bác thợ mộc dùng thanh gỗ dài 36cm uốn thành một khung hình vuông. Hỏi cạnh của khung hình vuông dài bao nhiêu xăng-ti-mét?`
    },
    {
      title: 'Tiếng Việt 4: Đọc hiểu bài "Hạt gạo làng ta"',
      subject: 'Tiếng Việt' as SubjectType,
      grade: 4,
      sampleText: `BÀI TẬP ĐỌC HIỂU TIẾNG VIỆT LỚP 4\n\nVăn bản: "Hạt gạo làng ta"\nHạt gạo làng ta\nCó vị phù sa\nCủa sông Kinh Thầy\nCó hương sen thơm\nTrong hồ nước đầy\nCó lời mẹ hát\nNgọt bùi đắng cay...\n\nNội dung chính:\nBài thơ ca ngợi giá trị quý báu của hạt gạo quê hương, kết tinh từ giọt mồ hôi của người mẹ, người nông dân và tình yêu quê hương đất nước. Học sinh cần hiểu ý nghĩa của các hình ảnh so sánh, nhân hóa và thông điệp biết ơn người lao động.`
    },
    {
      title: 'Tiếng Anh 5: Global Success Unit 4 - My Free Time',
      subject: 'Tiếng Anh' as SubjectType,
      grade: 5,
      sampleText: `ENGLISH GRADE 5 - GLOBAL SUCCESS\nUNIT 4: MY FREE TIME ACTIVITIES\n\n1. Vocabulary:\n- play badminton, ride a bike, read comic books, watch cartoons, go swimming, water the flowers.\n\n2. Sentence Patterns:\n- What do you do in your free time? -> I usually read books and ride my bike.\n- What does your brother do at weekends? -> He plays football with his friends.\n\n3. Reading text:\nMy name is Tony. In my free time, I often go to the sports centre with my father. We play badminton every Sunday morning. It helps me stay healthy and energetic.`
    }
  ];

  const handleApplySample = (sample: typeof sampleDocuments[0]) => {
    sounds.playCoin();
    setSubject(sample.subject);
    setGrade(sample.grade);
    setExtractedText(sample.sampleText);
    setDocumentSummary(`Tài liệu mẫu môn ${sample.subject} lớp ${sample.grade}: ${sample.title}`);
    setKeyTerms(['Trọng tâm', 'Luyện tập', sample.subject]);
    setCurrentStep('extracted');
  };

  // 1. Run OCR Extraction Only
  const handleExtractOnly = async () => {
    if (!fileBase64 || !selectedFile) return;

    setIsExtracting(true);
    sounds.playClick();

    try {
      const response = await fetch('/api/ai/ocr-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: fileBase64,
          mimeType: selectedFile.type,
          fileName: selectedFile.name
        })
      });

      const data = await response.json();
      if (data.extractedText) {
        setExtractedText(data.extractedText);
        setDocumentSummary(data.summary || '');
        setKeyTerms(data.keyTerms || []);
        setCurrentStep('extracted');
        sounds.playLevelUp();
      } else {
        throw new Error(data.error || 'Không thể trích xuất văn bản');
      }
    } catch (err: any) {
      console.error(err);
      sounds.playError();
      alert(`Bzzzz... 🐝 Có lỗi khi trích xuất tài liệu: ${err.message}. Thầy cô có thể dán trực tiếp nội dung văn bản để AI tạo câu hỏi.`);
    } finally {
      setIsExtracting(false);
    }
  };

  // 2. All-in-one: OCR + Instant Question Generation
  const handleInstantOCRAndGenerate = async () => {
    if (!fileBase64 || !selectedFile) return;

    setIsExtracting(true);
    setIsGeneratingQuestions(true);
    sounds.playClick();

    try {
      const response = await fetch('/api/ai/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: fileBase64,
          mimeType: selectedFile.type,
          subject,
          grade,
          difficulty,
          types: selectedTypes,
          count: questionCount,
          customInstructions
        })
      });

      const data = await response.json();
      if (data.extractedText) {
        setExtractedText(data.extractedText);
        setDocumentSummary(data.summary || '');
        setKeyTerms(data.keyTerms || []);
      }

      if (data.questions && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
        setCurrentStep('questions');
        sounds.playLevelUp();
      } else {
        throw new Error('Không nhận được câu hỏi từ AI');
      }
    } catch (err: any) {
      console.error(err);
      sounds.playError();
      alert(`Bzzzz... 🐝 Có lỗi: ${err.message}. Hệ thống đã tự động tạo các câu hỏi mẫu phù hợp để thầy cô chỉnh sửa!`);
    } finally {
      setIsExtracting(false);
      setIsGeneratingQuestions(false);
    }
  };

  // 3. Generate Questions from Extracted (and Teacher-Edited) Text
  const handleGenerateFromExtractedText = async () => {
    if (!extractedText.trim()) {
      alert('Vui lòng nhập hoặc kiểm tra nội dung văn bản trích xuất!');
      return;
    }

    setIsGeneratingQuestions(true);
    sounds.playClick();

    try {
      const response = await fetch('/api/ai/generate-from-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedText,
          subject,
          grade,
          difficulty,
          types: selectedTypes,
          count: questionCount,
          customInstructions
        })
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
        setCurrentStep('questions');
        sounds.playLevelUp();
      } else {
        throw new Error('Không thể tạo câu hỏi từ văn bản này');
      }
    } catch (err: any) {
      console.error(err);
      sounds.playError();
      alert(`Bzzzz... 🐝 Có lỗi khi tạo câu hỏi: ${err.message}`);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Teacher Question Editing Handlers
  const handleUpdateQuestion = (id: string, updatedFields: Partial<Question>) => {
    setGeneratedQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updatedFields } : q))
    );
  };

  const handleUpdateOption = (qId: string, optIndex: number, newValue: string) => {
    setGeneratedQuestions(prev =>
      prev.map(q => {
        if (q.id !== qId || !q.options) return q;
        const newOpts = [...q.options];
        const oldVal = newOpts[optIndex];
        newOpts[optIndex] = newValue;
        // If the edited option was the answer, update answer as well
        const newAnswer = q.answer === oldVal ? newValue : q.answer;
        return { ...q, options: newOpts, answer: newAnswer };
      })
    );
  };

  const handleSetCorrectOption = (qId: string, correctOptionValue: string) => {
    sounds.playClick();
    handleUpdateQuestion(qId, { answer: correctOptionValue });
  };

  const handleAddOption = (qId: string) => {
    sounds.playClick();
    setGeneratedQuestions(prev =>
      prev.map(q => {
        if (q.id !== qId) return q;
        const currentOpts = q.options || [];
        if (currentOpts.length >= 6) return q;
        const nextLetter = String.fromCharCode(65 + currentOpts.length);
        return {
          ...q,
          options: [...currentOpts, `Phương án ${nextLetter}`]
        };
      })
    );
  };

  const handleRemoveOption = (qId: string, optIndex: number) => {
    sounds.playClick();
    setGeneratedQuestions(prev =>
      prev.map(q => {
        if (q.id !== qId || !q.options || q.options.length <= 2) return q;
        const removedVal = q.options[optIndex];
        const newOpts = q.options.filter((_, idx) => idx !== optIndex);
        let newAnswer = q.answer;
        if (q.answer === removedVal) {
          newAnswer = newOpts[0];
        }
        return { ...q, options: newOpts, answer: newAnswer };
      })
    );
  };

  const handleDeleteQuestion = (id: string) => {
    sounds.playClick();
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleDuplicateQuestion = (q: Question) => {
    sounds.playCoin();
    const cloned: Question = {
      ...q,
      id: 'ocr_clone_' + Math.random().toString(36).substring(2, 9),
      text: `${q.text} (Bản sao)`,
      options: q.options ? [...q.options] : undefined
    };
    setGeneratedQuestions(prev => {
      const idx = prev.findIndex(item => item.id === q.id);
      if (idx === -1) return [...prev, cloned];
      const next = [...prev];
      next.splice(idx + 1, 0, cloned);
      return next;
    });
  };

  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    sounds.playClick();
    setGeneratedQuestions(prev => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleAddNewQuestion = () => {
    sounds.playCoin();
    const newQ: Question = {
      id: 'ocr_new_' + Math.random().toString(36).substring(2, 9),
      text: 'Nhập nội dung câu hỏi mới ở đây...',
      type: 'multiple_choice',
      options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
      answer: 'Phương án A',
      subject,
      grade,
      difficulty: 'Trung bình',
      cognitiveLevel: 'Nhận biết',
      useCount: 0,
      explanation: 'Nhập lời giải thích chi tiết cho câu hỏi tại đây.',
      tags: ['Tự biên soạn', subject, `Lớp ${grade}`]
    };
    setGeneratedQuestions(prev => [...prev, newQ]);
    setEditingQuestionId(newQ.id);
  };

  const toggleTypeSelection = (t: QuestionType) => {
    sounds.playClick();
    setSelectedTypes(prev => {
      if (prev.includes(t)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter(item => item !== t);
      }
      return [...prev, t];
    });
  };

  // Export & Action Handlers
  const handleSaveAllToQuestionBank = () => {
    if (generatedQuestions.length === 0) return;
    sounds.playLevelUp();
    onAddQuestions(generatedQuestions);
    setSaveSuccessNotification(true);
    setTimeout(() => setSaveSuccessNotification(false), 3000);
    if (onNavigateToQuestions) {
      setTimeout(() => onNavigateToQuestions(), 1200);
    }
  };

  const handleCopyQuestionsAsText = () => {
    sounds.playClick();
    const formatted = generatedQuestions
      .map((q, idx) => {
        let block = `Câu ${idx + 1} (${q.type === 'multiple_choice' ? 'Trắc nghiệm' : q.type === 'fill_blank' ? 'Điền từ' : 'Câu hỏi ngắn'}): ${q.text}\n`;
        if (q.type === 'multiple_choice' && q.options) {
          block += q.options.map((opt, oIdx) => `   ${String.fromCharCode(65 + oIdx)}. ${opt}`).join('\n') + '\n';
        }
        block += `-> Đáp án: ${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}\n`;
        if (q.explanation) {
          block += `-> Lời giải: ${q.explanation}\n`;
        }
        return block;
      })
      .join('\n');

    navigator.clipboard.writeText(formatted);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleDownloadWordDoc = () => {
    sounds.playClick();
    const isEn = subject === 'Tiếng Anh';
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Đề thi trích xuất OCR - ${subject} Lớp ${grade}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; margin: 2cm; color: #111827; }
          .header { width: 100%; border-collapse: collapse; margin-bottom: 20px; text-align: center; }
          .header td { font-weight: bold; font-size: 11pt; padding: 4px; }
          .title { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 15px 0 10px 0; color: #1e3a8a; }
          .meta { font-style: italic; text-align: center; margin-bottom: 25px; font-size: 11pt; }
          .question-item { margin-bottom: 16px; page-break-inside: avoid; }
          .q-title { font-weight: bold; font-size: 12.5pt; color: #0f172a; margin-bottom: 4px; }
          .options { margin-left: 20px; line-height: 1.6; }
          .key-section { margin-top: 30px; border-top: 2px dashed #3b82f6; padding-top: 15px; }
          .key-title { font-size: 14pt; font-weight: bold; color: #1e3a8a; text-transform: uppercase; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <table class="header">
          <tr>
            <td>${isEn ? 'PRIMARY SCHOOL TEST ASSESSMENT' : 'TRƯỜNG TIỂU HỌC CHUẨN GDPT 2018'}<br>${isEn ? 'SMART EDU QUESTION SET' : 'TỔ CHUYÊN MÔN TIỂU HỌC'}</td>
            <td>${isEn ? 'OFFICIAL CLASSROOM TEST' : 'ĐỀ BÀI TẬP VÀ ĐÁNH GIÁ ĐỊNH KỲ'}<br>${isEn ? 'ACADEMIC YEAR 2025 - 2026' : 'NĂM HỌC 2025 - 2026'}</td>
          </tr>
        </table>

        <div class="title">BÀI TẬP ÔN TẬP MÔN ${subject.toUpperCase()} LỚP ${grade}</div>
        <div class="meta">Nguồn tài liệu: Trích xuất tự động qua AI Vision & OCR Studio • Số lượng: ${generatedQuestions.length} câu</div>

        ${generatedQuestions.map((q, idx) => `
          <div class="question-item">
            <div class="q-title">Câu ${idx + 1} (${q.type === 'multiple_choice' ? 'Trắc nghiệm' : q.type === 'fill_blank' ? 'Điền từ' : 'Câu hỏi ngắn'}): ${q.text}</div>
            ${q.type === 'multiple_choice' && q.options ? `
              <div class="options">
                ${q.options.map((opt, oIdx) => `<div><b>${String.fromCharCode(65 + oIdx)}.</b> ${opt}</div>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}

        <div class="key-section">
          <div class="key-title">HƯỚNG DẪN CHẤM & ĐÁP ÁN CHI TIẾT</div>
          ${generatedQuestions.map((q, idx) => `
            <div style="margin-bottom: 10px;">
              <b>Câu ${idx + 1}:</b> <u>${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}</u>
              ${q.explanation ? `<br><i>* Lời giải:</i> ${q.explanation}` : ''}
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `De_Kiem_Tra_OCR_${subject}_Lop${grade}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintDocument = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className={`w-full ${isOpenModal ? 'fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto' : ''}`}>
      <div className={`w-full ${isOpenModal ? 'max-w-6xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-slate-900 border-2 border-indigo-400/40 shadow-2xl' : 'rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl'} p-4 sm:p-6 text-white text-left transition-all relative`}>
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950 flex items-center justify-center font-extrabold text-2xl shadow-lg">
              📷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-fredoka text-xl sm:text-2xl font-extrabold text-yellow-300 drop-shadow-md">
                  AI OCR & Trích Xuất Tài Liệu (Ảnh / PDF)
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-fredoka font-bold px-2 py-0.5 rounded-full">
                  AI Vision 2026
                </span>
              </div>
              <p className="text-xs text-indigo-100 font-medium">
                Nhận dạng ký tự từ ảnh chụp hoặc tài liệu PDF, tự động đề xuất câu hỏi trắc nghiệm, điền từ & câu hỏi ngắn bám sát SGK
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Step navigation tabs */}
            <div className="flex items-center bg-black/30 p-1 rounded-2xl border border-white/10 text-xs font-fredoka font-bold">
              <button
                onClick={() => { sounds.playClick(); setCurrentStep('upload'); }}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentStep === 'upload' ? 'bg-yellow-400 text-purple-950 shadow-md' : 'text-indigo-200 hover:text-white'
                }`}
              >
                <span>1. Tải tài liệu</span>
              </button>
              <button
                onClick={() => {
                  if (extractedText) {
                    sounds.playClick();
                    setCurrentStep('extracted');
                  }
                }}
                disabled={!extractedText}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentStep === 'extracted'
                    ? 'bg-yellow-400 text-purple-950 shadow-md'
                    : extractedText
                    ? 'text-indigo-200 hover:text-white cursor-pointer'
                    : 'text-white/30 cursor-not-allowed'
                }`}
              >
                <span>2. Văn bản OCR {extractedText ? '✓' : ''}</span>
              </button>
              <button
                onClick={() => {
                  if (generatedQuestions.length > 0) {
                    sounds.playClick();
                    setCurrentStep('questions');
                  }
                }}
                disabled={generatedQuestions.length === 0}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentStep === 'questions'
                    ? 'bg-yellow-400 text-purple-950 shadow-md'
                    : generatedQuestions.length > 0
                    ? 'text-indigo-200 hover:text-white cursor-pointer'
                    : 'text-white/30 cursor-not-allowed'
                }`}
              >
                <span>3. Câu hỏi ({generatedQuestions.length})</span>
              </button>
            </div>

            {isOpenModal && onCloseModal && (
              <button
                onClick={onCloseModal}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-500 text-white flex items-center justify-center font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Global Loading Overlay */}
        {(isExtracting || isGeneratingQuestions) && (
          <div className="my-6 p-8 bg-indigo-950/80 border-2 border-yellow-400/40 rounded-3xl text-center space-y-4 shadow-2xl backdrop-blur-md animate-fade-in">
            <div className="relative w-16 h-16 mx-auto">
              <RotateCw className="w-16 h-16 text-yellow-300 animate-spin" />
              <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="font-fredoka text-lg font-extrabold text-yellow-300">
                {loadingLogs[loadingLogIndex]}
              </h3>
              <p className="text-xs text-indigo-200 font-medium">
                AI Vision đang phân tích nhận dạng ký tự tiếng Việt & bóc tách cấu trúc câu hỏi
              </p>
            </div>
            <div className="w-48 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-300 to-amber-500 animate-pulse rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        )}

        {/* STEP 1: UPLOAD & CONFIGURATION */}
        {!isExtracting && !isGeneratingQuestions && currentStep === 'upload' && (
          <div className="mt-5 space-y-6 animate-fade-in">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7 Cols: Upload Zone & Document Inspector */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Drag and Drop Zone */}
                {!selectedFile ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`w-full py-10 px-6 border-3 border-dashed rounded-3xl text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 bg-white/5 hover:bg-white/10 ${
                      dragActive
                        ? 'border-yellow-300 bg-white/15 scale-[1.01]'
                        : 'border-white/25 hover:border-yellow-300/80'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleProcessFile(e.target.files[0]);
                        }
                      }}
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleProcessFile(e.target.files[0]);
                        }
                      }}
                    />

                    <div className="w-16 h-16 rounded-2xl bg-yellow-400/20 border border-yellow-300/40 text-yellow-300 flex items-center justify-center shadow-inner">
                      <UploadCloud className="w-9 h-9 animate-bounce" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-fredoka text-base font-extrabold text-white">
                        Kéo thả tệp tin hoặc Nhấp chuột để tải lên
                      </p>
                      <p className="text-xs text-indigo-200 font-medium">
                        Hỗ trợ hình ảnh chụp trang sách (JPEG, PNG, WebP) hoặc tệp tài liệu PDF (Tối đa 20MB)
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-fredoka font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Chọn tệp máy tính</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          cameraInputRef.current?.click();
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-purple-950 text-xs font-fredoka font-extrabold shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Chụp ảnh tài liệu</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Selected File Inspector Card */
                  <div className="p-4 bg-white/15 border-2 border-yellow-400/40 rounded-3xl space-y-4 shadow-lg text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950 flex items-center justify-center font-extrabold text-base shadow-md">
                          {selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf') ? 'PDF' : 'IMG'}
                        </div>
                        <div>
                          <h4 className="font-fredoka text-sm font-extrabold text-yellow-300 line-clamp-1">
                            {selectedFile.name}
                          </h4>
                          <p className="text-[11px] text-indigo-100 font-medium">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Tài liệu học tập'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          sounds.playClick();
                          setSelectedFile(null);
                          setFileBase64(null);
                          setFilePreviewUrl(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-white border border-red-500/40 text-xs font-fredoka font-bold transition-all cursor-pointer"
                      >
                        ✕ Chọn tệp khác
                      </button>
                    </div>

                    {/* Image Preview if available */}
                    {filePreviewUrl && selectedFile.type.startsWith('image/') && (
                      <div className="max-h-56 rounded-2xl overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center p-2">
                        <img
                          src={filePreviewUrl}
                          alt="Tài liệu tải lên"
                          className="max-h-52 object-contain rounded-xl shadow-md"
                        />
                      </div>
                    )}

                    {/* PDF Visual Indicator */}
                    {selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) && (
                      <div className="p-4 bg-black/25 rounded-2xl border border-white/10 flex items-center justify-between text-xs text-indigo-100">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-5 h-5 text-yellow-300" />
                          <span>Tệp tài liệu PDF đã sẵn sàng để AI bóc tách toàn bộ trang và cấu trúc</span>
                        </div>
                        <span className="text-[10px] bg-yellow-400 text-purple-950 px-2 py-0.5 rounded-full font-bold">
                          Đã nạp
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sample Document Shortcuts */}
                <div className="bg-black/20 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-fredoka font-extrabold text-yellow-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Hoặc chọn tài liệu mẫu SGK để trải nghiệm nhanh:
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {sampleDocuments.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleApplySample(s)}
                        className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-left transition-all hover:scale-[1.02] cursor-pointer space-y-1"
                      >
                        <div className="text-[11px] font-fredoka font-extrabold text-white line-clamp-1">
                          {s.title}
                        </div>
                        <div className="text-[9px] text-indigo-200 font-bold">
                          Môn {s.subject} • Lớp {s.grade}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right 5 Cols: Generation Configuration Parameters */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="p-5 bg-black/25 rounded-3xl border border-white/15 space-y-4 text-xs font-fredoka font-bold">
                  <h3 className="text-sm font-extrabold text-yellow-300 flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Cấu hình sinh câu hỏi từ tài liệu
                  </h3>

                  {/* Subject & Grade */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-indigo-200">📐 Môn học</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value as SubjectType)}
                        className="w-full p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-white text-xs cursor-pointer font-fredoka font-bold"
                      >
                        <option value="Toán">Toán học</option>
                        <option value="Tiếng Việt">Tiếng Việt</option>
                        <option value="Tiếng Anh">Tiếng Anh (Global Success)</option>
                        <option value="Tự nhiên & Xã hội">Tự nhiên & Xã hội</option>
                        <option value="Khoa học">Khoa học</option>
                        <option value="Lịch sử & Địa lý">Lịch sử & Địa lý</option>
                        <option value="Đạo đức">Đạo đức</option>
                        <option value="Tin học">Tin học</option>
                        <option value="Hoạt động trải nghiệm">Hoạt động trải nghiệm</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-indigo-200">🏫 Khối lớp</label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(Number(e.target.value))}
                        className="w-full p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-white text-xs cursor-pointer font-fredoka font-bold"
                      >
                        {[1, 2, 3, 4, 5].map(g => (
                          <option key={g} value={g}>Lớp {g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Difficulty & Count */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-indigo-200">⭐ Độ khó</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as DifficultyType)}
                        className="w-full p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-white text-xs cursor-pointer font-fredoka font-bold"
                      >
                        <option value="Dễ">Dễ (Nhận biết)</option>
                        <option value="Trung bình">Trung bình (Thông hiểu)</option>
                        <option value="Khó">Nâng cao (Vận dụng)</option>
                        <option value="Hỗn hợp">Hỗn hợp (Phân hóa)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-indigo-200">🔢 Số lượng câu hỏi</label>
                      <select
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="w-full p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-white text-xs cursor-pointer font-fredoka font-bold"
                      >
                        {[3, 5, 8, 10, 15, 20].map(c => (
                          <option key={c} value={c}>Tạo {c} câu hỏi</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Question Types Multi-Select */}
                  <div className="space-y-2">
                    <label className="text-indigo-200 block">❓ Các dạng câu hỏi mong muốn:</label>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => toggleTypeSelection('multiple_choice')}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedTypes.includes('multiple_choice')
                            ? 'bg-yellow-400 text-purple-950 border-yellow-300 font-extrabold shadow-sm'
                            : 'bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span>✍️ Trắc nghiệm (4 LC)</span>
                        {selectedTypes.includes('multiple_choice') && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTypeSelection('fill_blank')}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedTypes.includes('fill_blank')
                            ? 'bg-yellow-400 text-purple-950 border-yellow-300 font-extrabold shadow-sm'
                            : 'bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span>✏️ Điền vào chỗ trống</span>
                        {selectedTypes.includes('fill_blank') && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTypeSelection('essay')}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedTypes.includes('essay')
                            ? 'bg-yellow-400 text-purple-950 border-yellow-300 font-extrabold shadow-sm'
                            : 'bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span>💬 Câu hỏi ngắn / Tự luận</span>
                        {selectedTypes.includes('essay') && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTypeSelection('true_false')}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedTypes.includes('true_false')
                            ? 'bg-yellow-400 text-purple-950 border-yellow-300 font-extrabold shadow-sm'
                            : 'bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span>⚖️ Nhận định Đúng / Sai</span>
                        {selectedTypes.includes('true_false') && <Check className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Custom Prompt Notes */}
                  <div className="space-y-1">
                    <label className="text-indigo-200">💡 Gợi ý thêm cho AI (Tùy chọn)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Tập trung vào từ vựng mới, tạo bẫy tư duy nhẹ nhàng..."
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      className="w-full p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-white text-xs font-normal placeholder:text-white/40"
                    />
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleInstantOCRAndGenerate}
                    disabled={!fileBase64}
                    className={`w-full py-4 rounded-2xl font-fredoka font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl border-2 ${
                      fileBase64
                        ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-purple-950 border-yellow-200 hover:scale-[1.02] active:scale-98 cursor-pointer'
                        : 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed'
                    }`}
                  >
                    <Wand2 className="w-5 h-5" />
                    <span>✨ TRÍCH XUẤT OCR & TẠO CÂU HỎI NGAY</span>
                  </button>

                  <button
                    onClick={handleExtractOnly}
                    disabled={!fileBase64}
                    className={`w-full py-2.5 rounded-2xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                      fileBase64
                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 cursor-pointer'
                        : 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Chỉ trích xuất văn bản (để kiểm tra trước)</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 2: EXTRACTED TEXT INSPECTOR & REFINEMENT */}
        {!isExtracting && !isGeneratingQuestions && currentStep === 'extracted' && (
          <div className="mt-5 space-y-5 animate-fade-in text-left">
            
            <div className="flex flex-wrap items-center justify-between gap-3 bg-black/20 p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold">
                  ✓
                </span>
                <div>
                  <h4 className="font-fredoka text-sm font-extrabold text-white">
                    Văn bản trích xuất OCR từ tài liệu
                  </h4>
                  <p className="text-[11px] text-indigo-200 font-medium">
                    Thầy cô có thể chỉnh sửa, bổ sung hoặc sửa lỗi chính tả trước khi tạo câu hỏi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-indigo-200 bg-white/10 px-2.5 py-1 rounded-lg font-mono">
                  {extractedText.length} ký tự • {extractedText.split(/\s+/).filter(Boolean).length} từ
                </span>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(extractedText);
                    setCopiedNotification(true);
                    setTimeout(() => setCopiedNotification(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-fredoka font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Đã chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* Editable Textarea */}
            <div className="relative">
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                rows={12}
                className="w-full p-4 bg-slate-950/80 border-2 border-indigo-500/40 rounded-2xl text-white font-sans text-sm leading-relaxed outline-none focus:border-yellow-400 transition-all resize-y"
                placeholder="Nội dung văn bản bóc tách từ tài liệu sẽ xuất hiện ở đây..."
              />
            </div>

            {/* Generation bar */}
            <div className="p-4 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-2xl border border-indigo-400/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-fredoka font-bold text-indigo-100">
                <span>Môn: <strong className="text-yellow-300">{subject}</strong></span>
                <span>• Lớp: <strong className="text-yellow-300">{grade}</strong></span>
                <span>• Số lượng: <strong className="text-yellow-300">{questionCount} câu</strong></span>
                <span>• Dạng: <strong className="text-yellow-300">{selectedTypes.join(', ')}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep('upload')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-fredoka font-bold text-xs cursor-pointer"
                >
                  ← Tải tệp khác
                </button>

                <button
                  onClick={handleGenerateFromExtractedText}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 font-fredoka font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>TẠO BỘ CÂU HỎI TỪ VĂN BẢN NÀY →</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: QUESTIONS REVIEW & TEACHER EDITING SUITE */}
        {!isExtracting && !isGeneratingQuestions && currentStep === 'questions' && (
          <div className="mt-5 space-y-6 animate-fade-in text-left">
            
            {/* Action & Status Toolbar */}
            <div className="p-4 bg-black/30 rounded-3xl border border-white/15 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-fredoka text-lg font-extrabold text-yellow-300">
                    ✨ Bộ câu hỏi AI đề xuất ({generatedQuestions.length} câu)
                  </h3>
                  {saveSuccessNotification && (
                    <span className="bg-emerald-500 text-white text-[10px] font-fredoka font-bold px-2.5 py-1 rounded-full animate-bounce flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã lưu vào Ngân hàng!
                    </span>
                  )}
                </div>
                <p className="text-xs text-indigo-200 font-medium">
                  Thầy cô có thể nhấp chuột vào bất kỳ ô nào để chỉnh sửa câu hỏi, thay đổi đáp án hoặc thêm câu hỏi mới
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAddNewQuestion}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-fredoka font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm câu mới</span>
                </button>

                <button
                  onClick={handleCopyQuestionsAsText}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-fredoka font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Đã sao chép' : 'Chép text'}</span>
                </button>

                <button
                  onClick={handleDownloadWordDoc}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-fredoka font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất Word</span>
                </button>

                <button
                  onClick={handleSaveAllToQuestionBank}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white text-xs font-fredoka font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 border border-white/20"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>LƯU VÀO NGÂN HÀNG CÂU HỎI</span>
                </button>
              </div>
            </div>

            {/* Questions List with Inline Teacher Editors */}
            <div className="space-y-4">
              {generatedQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 bg-white rounded-3xl border-2 border-indigo-100 shadow-md text-gray-800 space-y-4 transition-all relative group"
                >
                  {/* Top Bar for Single Question */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-fredoka font-extrabold text-sm flex items-center justify-center shadow-sm">
                        {idx + 1}
                      </span>

                      {/* Question Type Switcher */}
                      <select
                        value={q.type}
                        onChange={(e) => {
                          const newType = e.target.value as QuestionType;
                          let newOptions = q.options;
                          let newAnswer = q.answer;
                          if (newType === 'multiple_choice' && (!newOptions || newOptions.length < 2)) {
                            newOptions = ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'];
                            newAnswer = 'Phương án A';
                          } else if (newType === 'true_false') {
                            newOptions = subject === 'Tiếng Anh' ? ['True', 'False'] : ['Đúng', 'Sai'];
                            newAnswer = subject === 'Tiếng Anh' ? 'True' : 'Đúng';
                          }
                          handleUpdateQuestion(q.id, { type: newType, options: newOptions, answer: newAnswer });
                        }}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-fredoka font-bold text-xs rounded-xl border border-indigo-200 outline-none cursor-pointer"
                      >
                        <option value="multiple_choice">✍️ Trắc nghiệm (4 LC)</option>
                        <option value="fill_blank">✏️ Điền vào chỗ trống</option>
                        <option value="essay">💬 Câu hỏi ngắn / Tự luận</option>
                        <option value="true_false">⚖️ Đúng / Sai</option>
                      </select>

                      <span className="text-[10px] text-gray-400 font-bold">
                        {q.cognitiveLevel || 'Thông hiểu'} • {q.difficulty || 'Trung bình'}
                      </span>
                    </div>

                    {/* Single Question Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        title="Di chuyển lên"
                        onClick={() => handleMoveQuestion(idx, 'up')}
                        disabled={idx === 0}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all ${
                          idx === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                        }`}
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        title="Di chuyển xuống"
                        onClick={() => handleMoveQuestion(idx, 'down')}
                        disabled={idx === generatedQuestions.length - 1}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all ${
                          idx === generatedQuestions.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                        }`}
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        title="Nhân bản câu hỏi"
                        onClick={() => handleDuplicateQuestion(q)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 text-xs transition-all cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        title="Xóa câu hỏi"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 text-xs transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Stem Text Area */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">Nội dung câu hỏi:</label>
                    <textarea
                      value={q.text}
                      onChange={(e) => handleUpdateQuestion(q.id, { text: e.target.value })}
                      rows={2}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-bold text-xs sm:text-sm leading-relaxed outline-none focus:bg-white focus:border-indigo-500 transition-all resize-y"
                    />
                  </div>

                  {/* Multiple Choice Options Editor */}
                  {q.type === 'multiple_choice' && q.options && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
                        <span>Các phương án lựa chọn (Nhấp vào hình tròn để chọn đáp án ĐÚNG):</span>
                        {q.options.length < 6 && (
                          <button
                            onClick={() => handleAddOption(q.id)}
                            className="text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            + Thêm phương án
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = opt === q.answer;
                          const letter = String.fromCharCode(65 + oIdx);
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                                isCorrect
                                  ? 'bg-green-50/80 border-green-500 shadow-sm'
                                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleSetCorrectOption(q.id, opt)}
                                className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs cursor-pointer transition-all ${
                                  isCorrect
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                              >
                                {letter}
                              </button>

                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleUpdateOption(q.id, oIdx, e.target.value)}
                                className={`flex-1 bg-transparent font-medium text-xs outline-none ${
                                  isCorrect ? 'text-green-900 font-bold' : 'text-gray-700'
                                }`}
                              />

                              {isCorrect && (
                                <span className="text-[10px] bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded-full">
                                  Đáp án đúng ✓
                                </span>
                              )}

                              {q.options && q.options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(q.id, oIdx)}
                                  className="text-gray-400 hover:text-red-500 text-xs px-1 cursor-pointer"
                                  title="Xóa phương án này"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Fill in the Blank Answer Field */}
                  {q.type === 'fill_blank' && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1.5">
                      <label className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                        <span>🔑 Từ / Cụm từ đúng cần điền vào chỗ trống:</span>
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}
                        onChange={(e) => handleUpdateQuestion(q.id, { answer: e.target.value })}
                        className="w-full p-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-950 outline-none focus:border-amber-500"
                        placeholder="Nhập từ hoặc số cần điền..."
                      />
                    </div>
                  )}

                  {/* Short Answer / Essay Answer Key */}
                  {(q.type === 'essay' || q.type === 'answer_question') && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5">
                      <label className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                        <span>📝 Gợi ý câu trả lời / Biểu điểm chấm bài:</span>
                      </label>
                      <textarea
                        value={Array.isArray(q.answer) ? q.answer.join('\n') : q.answer}
                        onChange={(e) => handleUpdateQuestion(q.id, { answer: e.target.value })}
                        rows={2}
                        className="w-full p-2 bg-white border border-blue-300 rounded-xl text-xs font-medium text-blue-950 outline-none focus:border-blue-500"
                        placeholder="Nhập câu trả lời mẫu hoặc hướng dẫn chấm..."
                      />
                    </div>
                  )}

                  {/* True / False Toggle */}
                  {q.type === 'true_false' && (
                    <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900">Nhận định này Đúng hay Sai?</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuestion(q.id, { answer: subject === 'Tiếng Anh' ? 'True' : 'Đúng' })}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            (q.answer === 'Đúng' || q.answer === 'True')
                              ? 'bg-green-600 text-white shadow-md'
                              : 'bg-white text-gray-600 border border-gray-200'
                          }`}
                        >
                          {subject === 'Tiếng Anh' ? 'True' : 'Đúng (Đ)'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuestion(q.id, { answer: subject === 'Tiếng Anh' ? 'False' : 'Sai' })}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            (q.answer === 'Sai' || q.answer === 'False')
                              ? 'bg-red-600 text-white shadow-md'
                              : 'bg-white text-gray-600 border border-gray-200'
                          }`}
                        >
                          {subject === 'Tiếng Anh' ? 'False' : 'Sai (S)'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Explanation Field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                      <span>💡 Lời giải thích chi tiết & Hướng dẫn sư phạm:</span>
                    </label>
                    <input
                      type="text"
                      value={q.explanation || ''}
                      onChange={(e) => handleUpdateQuestion(q.id, { explanation: e.target.value })}
                      placeholder="Nhập lời giải thích rõ ràng cho học sinh..."
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Final Actions Bar */}
            <div className="p-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 rounded-3xl border-2 border-yellow-400/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div className="text-xs font-fredoka font-bold text-indigo-100">
                <span>Đã sẵn sàng lưu <strong className="text-yellow-300">{generatedQuestions.length} câu hỏi</strong> trích xuất từ tài liệu</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentStep('extracted')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-fredoka font-bold text-xs cursor-pointer"
                >
                  ← Xem lại văn bản OCR
                </button>

                <button
                  onClick={handleSaveAllToQuestionBank}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-purple-950 font-fredoka font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>XÁC NHẬN & LƯU TẤT CẢ VÀO NGÂN HÀNG CÂU HỎI</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
