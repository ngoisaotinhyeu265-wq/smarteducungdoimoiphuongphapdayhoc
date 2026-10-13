/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Copy, 
  Download, 
  Printer, 
  Edit3, 
  Check, 
  Sparkles, 
  Users, 
  User, 
  Layers, 
  Clock, 
  MessageSquare, 
  Award, 
  Gamepad2, 
  HelpCircle, 
  X, 
  Share2, 
  BookOpen,
  CheckCircle2,
  Smile,
  Zap,
  Flame
} from 'lucide-react';
import { TeacherScript, TeacherScriptSection, TeacherScriptPart, ScriptPartType } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface TeacherScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: TeacherScript | null;
  onUpdateScript?: (updated: TeacherScript) => void;
  onRegenerate?: () => void;
  isGenerating?: boolean;
  sounds: any;
}

export default function TeacherScriptModal({
  isOpen,
  onClose,
  script,
  onUpdateScript,
  onRegenerate,
  isGenerating = false,
  sounds
}: TeacherScriptModalProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableScript, setEditableScript] = useState<TeacherScript | null>(null);

  // Speech Synthesis states
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // Slightly slower for primary teaching clarity
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    if (script) {
      setEditableScript(JSON.parse(JSON.stringify(script)));
    }
  }, [script]);

  if (!isOpen || !script) return null;

  const currentData = editableScript || script;
  const isEn = currentData.language === 'en' || currentData.subject === 'Tiếng Anh';

  // Stop any ongoing speech
  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setPlayingId(null);
    setIsPlayingAll(false);
  };

  // Play single part audio using Web Speech API
  const playSpeech = (text: string, id: string) => {
    if (!synthRef.current) {
      alert('Trình duyệt của thầy cô không hỗ trợ Speech Synthesis API.');
      return;
    }

    stopSpeech();
    sounds.playPop();
    setPlayingId(id);

    const cleanText = text
      .replace(/[•*#]/g, '')
      .replace(/\([^)]*\)/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isEn ? 'en-US' : 'vi-VN';
    utterance.rate = speechRate;
    utterance.pitch = 1.05; // Slightly enthusiastic

    utterance.onend = () => {
      setPlayingId(null);
    };

    utterance.onerror = () => {
      setPlayingId(null);
    };

    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  // Play whole section
  const playSectionSpeech = (section: TeacherScriptSection) => {
    const fullText = section.parts
      .map(p => p.teacherSpeech)
      .join('. ');
    playSpeech(fullText, section.activityId);
  };

  // Copy plain text formatted script
  const handleCopyScript = async () => {
    sounds.playCoin();
    let text = `KỊCH BẢN LỜI DẪN & HIỆU LỆNH GIÁO VIÊN\n`;
    text += `BÀI: ${currentData.lessonTitle}\n`;
    text += `MÔN: ${currentData.subject} - ${currentData.grade} (${currentData.bookSeries})\n`;
    text += `THỜI LƯỢNG: ${currentData.totalDuration}\n\n`;

    text += `=== KHẨU LỆNH QUẢN LÝ LỚP HỌC (ATTENTION-GRABBERS) ===\n`;
    currentData.classroomManagementCues.forEach(c => {
      text += `• GV: "${c.callOut}" -> HS: "${c.response}" (${c.purpose})\n`;
    });
    text += `\n`;

    currentData.sections.forEach(sec => {
      text += `==========================================\n`;
      text += `${sec.activityName.toUpperCase()} (${sec.duration})\n`;
      if (sec.gameName) text += `Trò chơi: ${sec.gameName}\n`;
      text += `==========================================\n\n`;

      sec.parts.forEach(p => {
        text += `[${p.title}] (${p.timing || '1-2 mins'})\n`;
        text += `• LỜI DẪN CỦA GV (Teacher): \n"${p.teacherSpeech}"\n`;
        if (p.teacherAction) text += `• CỬ CHỈ & HÀNH ĐỘNG: ${p.teacherAction}\n`;
        if (p.expectedStudentResponse) text += `• PHẢN XẠ CỦA HS: ${p.expectedStudentResponse}\n`;
        text += `\n`;
      });
    });

    try {
      await copyToClipboard(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch (e) {
      console.warn('Clipboard copy error:', e);
    }
  };

  // Download formatted Word (.doc) file
  const handleDownloadWordScript = () => {
    sounds.playLevelUp();
    const docHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Kich_Ban_Loi_Dan_${currentData.lessonTitle}</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.5; color: #111827; padding: 20pt; }
    h1 { font-size: 18pt; text-align: center; color: #1e3a8a; text-transform: uppercase; margin-bottom: 4pt; }
    h2 { font-size: 14pt; color: #047857; border-bottom: 2pt solid #047857; padding-bottom: 4pt; margin-top: 18pt; }
    h3 { font-size: 13pt; color: #1e40af; margin-top: 12pt; margin-bottom: 4pt; }
    .box-speech { background-color: #f0fdf4; border-left: 4pt solid #10b981; padding: 8pt 12pt; margin: 6pt 0; font-size: 13pt; font-weight: bold; color: #065f46; }
    .box-action { background-color: #fffbeb; border-left: 4pt solid #f59e0b; padding: 6pt 10pt; margin: 4pt 0; font-style: italic; color: #92400e; font-size: 12pt; }
    .box-response { background-color: #eff6ff; border-left: 4pt solid #3b82f6; padding: 6pt 10pt; margin: 4pt 0; color: #1e40af; font-size: 12pt; }
    .cue-table { width: 100%; border-collapse: collapse; margin-top: 8pt; }
    .cue-table th, .cue-table td { border: 1pt solid #cbd5e1; padding: 6pt 8pt; }
    .cue-table th { background-color: #f1f5f9; color: #0f172a; text-align: left; }
  </style>
</head>
<body>
  <h1>KỊCH BẢN LỜI DẪN, LỜI THOẠI & HIỆU LỆNH GIÁO VIÊN</h1>
  <p style="text-align: center; font-style: italic; margin-top: 0;">
    Bài: <b>${currentData.lessonTitle}</b> | Môn: <b>${currentData.subject} - ${currentData.grade} (${currentData.bookSeries})</b>
  </p>

  <h2>I. KHẨU LỆNH QUẢN LÝ LỚP HỌC & HIỆU LỆNH TẬP TRUNG (CLASSROOM CUES)</h2>
  <table class="cue-table">
    <thead>
      <tr>
        <th style="width: 35%;">Khẩu lệnh của Giáo viên</th>
        <th style="width: 35%;">Phản xạ của Học sinh</th>
        <th style="width: 30%;">Mục đích sư phạm</th>
      </tr>
    </thead>
    <tbody>
      ${currentData.classroomManagementCues.map(c => `
      <tr>
        <td><b>"${c.callOut}"</b></td>
        <td><i>"${c.response}"</i></td>
        <td>${c.purpose}</td>
      </tr>
      `).join('')}
    </tbody>
  </table>

  <h2>II. TIẾN TRÌNH LỜI DẪN CHI TIẾT TỪNG HOẠT ĐỘNG (4 GIAI ĐOẠN)</h2>
  ${currentData.sections.map(sec => `
    <h3>${sec.activityName} (${sec.duration}) ${sec.gameName ? `- [Trò chơi: ${sec.gameName}]` : ''}</h3>
    ${sec.parts.map(p => `
      <div style="margin-bottom: 12pt;">
        <p style="font-weight: bold; color: #1e293b; margin-bottom: 2pt;">
          ▶ ${p.title} (${p.timing || '1-2 phút'}) - [${getGroupFormatLabel(p.groupFormat)}]
        </p>
        <div class="box-speech">
          <b>🎤 Lời dẫn của Giáo viên:</b><br/>
          "${p.teacherSpeech.replace(/\n/g, '<br/>')}"
        </div>
        ${p.teacherAction ? `
        <div class="box-action">
          <b>💡 Cử chỉ & Hành động:</b> ${p.teacherAction}
        </div>` : ''}
        ${p.expectedStudentResponse ? `
        <div class="box-response">
          <b>🎯 Phản xạ & Câu trả lời của HS:</b> ${p.expectedStudentResponse}
        </div>` : ''}
      </div>
    `).join('')}
  `).join('')}

  <h2>III. LỜI KHUYÊN & KINH NGHIỆM SƯ PHẠM</h2>
  <ul>
    ${currentData.pedagogicalTips.map(t => `<li>${t}</li>`).join('')}
  </ul>
</body>
</html>`;

    const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KichBan_LoiDan_GV_${currentData.subject}_${currentData.grade}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print script
  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  // Save edits
  const handleSaveEdits = () => {
    sounds.playLevelUp();
    setIsEditing(false);
    if (editableScript && onUpdateScript) {
      onUpdateScript(editableScript);
    }
  };

  const filteredSections = activeTab === 'all' 
    ? currentData.sections 
    : currentData.sections.filter(s => s.activityId === activeTab || s.stageType === activeTab);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white p-5 md:p-6 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
              <Mic className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-fredoka text-lg md:text-2xl font-extrabold tracking-wide">
                  Kịch Bản Lời Dẫn & Hiệu Lệnh Giáo Viên 🎤
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 uppercase tracking-wider">
                  {isEn ? '100% Classroom English' : 'Tiếng Việt Sư Phạm'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-emerald-100 font-sans mt-0.5">
                {currentData.lessonTitle} • {currentData.subject} {currentData.grade} ({currentData.bookSeries})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyScript}
              className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-fredoka font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sao chép toàn bộ kịch bản"
            >
              <Copy className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">Sao chép</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadWordScript}
              className="p-2.5 bg-amber-500 hover:bg-amber-600 rounded-xl text-white text-xs font-fredoka font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
              title="Tải tệp tin Word (.doc) kịch bản"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Tải File Word</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 bg-white/10 hover:bg-red-500/80 rounded-xl text-white transition-all cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert when copied */}
        {copiedToast && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-fredoka font-bold text-center flex items-center justify-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã sao chép thành công toàn bộ Kịch bản lời dẫn giáo viên vào bộ nhớ tạm! 📋</span>
          </div>
        )}

        {/* Secondary Subheader & Quick Classroom Management Toolbar */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Quick Classroom Management Attention Grabbers */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <span className="text-xs font-fredoka font-bold text-emerald-900 flex items-center gap-1 shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Khẩu lệnh nề nếp:</span>
            </span>
            {currentData.classroomManagementCues.map((cue, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => playSpeech(`${cue.callOut}. ${cue.response}`, `cue_${idx}`)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                  playingId === `cue_${idx}`
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm animate-pulse'
                    : 'bg-white text-emerald-950 border-emerald-200 hover:bg-emerald-100/60'
                }`}
                title={`Mục đích: ${cue.purpose}`}
              >
                <Volume2 className="w-3 h-3 text-emerald-600" />
                <span className="font-bold">"{cue.callOut}"</span>
                <span className="text-gray-500">→ "{cue.response}"</span>
              </button>
            ))}
          </div>

          {/* Controls: Edit & Speech Speed */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-xs text-emerald-900 bg-white px-2.5 py-1 rounded-xl border border-emerald-200">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>Tốc độ đọc:</span>
              <button
                type="button"
                onClick={() => setSpeechRate(0.8)}
                className={`px-1.5 py-0.5 rounded font-bold ${speechRate === 0.8 ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Chậm
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.95)}
                className={`px-1.5 py-0.5 rounded font-bold ${speechRate === 0.95 ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Chuẩn
              </button>
            </div>

            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveEdits}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu kịch bản</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Chỉnh sửa lời dẫn</span>
              </button>
            )}

            {onRegenerate && (
              <button
                type="button"
                onClick={onRegenerate}
                disabled={isGenerating}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isGenerating ? 'Đang tạo...' : 'Tạo lại với AI'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Stage Filter Tabs */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-fredoka font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'all' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            📋 Toàn Bộ Tiết Học ({currentData.sections.length} Giai đoạn)
          </button>

          {currentData.sections.map((sec, idx) => {
            const isSelected = activeTab === sec.activityId || activeTab === sec.stageType;
            let badgeIcon = '📌';
            let activeBg = 'bg-indigo-600';
            if (sec.stageType === 'warm_up') {
              badgeIcon = '🔥';
              activeBg = 'bg-amber-600';
            } else if (sec.stageType === 'exploration') {
              badgeIcon = '🔍';
              activeBg = 'bg-blue-600';
            } else if (sec.stageType === 'knowledge_construction') {
              badgeIcon = '💡';
              activeBg = 'bg-cyan-600';
            } else if (sec.stageType === 'practice') {
              badgeIcon = '👥';
              activeBg = 'bg-emerald-600';
            } else if (sec.stageType === 'production') {
              badgeIcon = '🏆';
              activeBg = 'bg-purple-600';
            }

            return (
              <button
                key={sec.activityId || idx}
                type="button"
                onClick={() => setActiveTab(sec.activityId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-fredoka font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected 
                    ? `${activeBg} text-white shadow-sm` 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {badgeIcon} HĐ {idx + 1}: {sec.activityName.replace(/^Stage \d+\.?\s*/i, '').replace(/\(.*?\)/g, '').trim()}
              </button>
            );
          })}
        </div>

        {/* Scrollable Script Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {filteredSections.map((section, sIndex) => (
            <div 
              key={section.activityId || sIndex}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-slate-100 to-indigo-50/40 p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-indigo-600 text-white rounded-xl text-xs font-extrabold">
                    {sIndex + 1}
                  </span>
                  <div>
                    <h3 className="font-fredoka text-sm md:text-base font-extrabold text-indigo-950">
                      {section.activityName}
                    </h3>
                    {section.gameName && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-xs font-bold text-amber-800">
                          Trò chơi học tập: {section.gameName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-600" />
                    <span>{section.duration}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => playSectionSpeech(section)}
                    className={`px-3 py-1 rounded-lg text-xs font-fredoka font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      playingId === section.activityId
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {playingId === section.activityId ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{playingId === section.activityId ? 'Dừng đọc' : 'Đọc cả phần'}</span>
                  </button>
                </div>
              </div>

              {/* Section Parts / Dialogues */}
              <div className="p-4 sm:p-5 space-y-4">
                {section.parts.map((part, pIndex) => (
                  <div 
                    key={part.id || pIndex}
                    className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-indigo-300 transition-all space-y-3"
                  >
                    {/* Part Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getPartTypeBadge(part.type)}
                        <span className="text-xs font-bold text-gray-900">
                          {part.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {part.groupFormat && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{getGroupFormatLabel(part.groupFormat)}</span>
                          </span>
                        )}
                        {part.timing && (
                          <span className="text-[11px] font-medium text-gray-500">
                            ⏱️ {part.timing}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => playSpeech(part.teacherSpeech, part.id)}
                          className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                            playingId === part.id
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                          }`}
                          title="Nghe giọng đọc mẫu"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Speech Box: What the Teacher says */}
                    <div className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200/90 relative group">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-fredoka font-extrabold uppercase tracking-wider text-emerald-900 mb-1">
                            {isEn ? "TEACHER'S SPEECH (LỜI DẪN CỦA GIÁO VIÊN):" : "LỜI DẪN / HIỆU LỆNH CỦA GIÁO VIÊN:"}
                          </p>
                          {isEditing ? (
                            <textarea
                              value={part.teacherSpeech}
                              onChange={(e) => {
                                const newSections = [...editableScript!.sections];
                                newSections[sIndex].parts[pIndex].teacherSpeech = e.target.value;
                                setEditableScript({ ...editableScript!, sections: newSections });
                              }}
                              className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs md:text-sm font-sans font-medium text-emerald-950 focus:ring-2 focus:ring-emerald-500"
                              rows={3}
                            />
                          ) : (
                            <p className="text-xs md:text-sm font-sans font-bold text-emerald-950 whitespace-pre-line leading-relaxed">
                              "{part.teacherSpeech}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Teacher Action & Expected Response Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Action Box */}
                      {part.teacherAction && (
                        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                          <Smile className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-900 block mb-0.5">
                              💡 Cử chỉ, Ngôn ngữ cơ thể & Học liệu:
                            </span>
                            <p className="text-amber-950 font-sans leading-snug">
                              {part.teacherAction}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Expected Response Box */}
                      {part.expectedStudentResponse && (
                        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-blue-900 block mb-0.5">
                              🎯 Phản xạ & Câu trả lời của Học sinh:
                            </span>
                            <p className="text-blue-950 font-sans leading-snug">
                              {part.expectedStudentResponse}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Pedagogical Tips Box */}
          {currentData.pedagogicalTips && currentData.pedagogicalTips.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-200 space-y-2">
              <h4 className="font-fredoka text-sm font-extrabold text-indigo-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Kinh Nghiệm Sư Phạm Dành Cho Giáo Viên Tiểu Học:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-indigo-950 font-sans pl-2">
                {currentData.pedagogicalTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-gray-200 p-4 px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kịch bản đã sẵn sàng phục vụ giảng dạy thực tế và tiết dạy hội giảng!</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-gray-600" />
              <span>In Kịch Bản</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadWordScript}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-fredoka font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Tải File Word (.doc)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helpers
function getGroupFormatLabel(format?: string) {
  switch (format) {
    case 'individual':
      return 'Luyện Cá Nhân';
    case 'pair':
      return 'Luyện Nhóm Đôi (2 bạn)';
    case 'group_4':
      return 'Luyện Nhóm 4';
    case 'whole_class':
    default:
      return 'Cả Lớp Đồng Thanh';
  }
}

function getPartTypeBadge(type: ScriptPartType) {
  switch (type) {
    case 'classroom_management':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
          Hiệu Lệnh Nề Nếp
        </span>
      );
    case 'warm_up_lead_in':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
          Dẫn Nhập Bài Mới
        </span>
      );
    case 'game_instruction':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
          Luật & Dẫn Trò Chơi
        </span>
      );
    case 'vocab_teaching':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
          Dạy Từ Vựng & Phát Âm
        </span>
      );
    case 'sentence_pattern':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
          Dạy Mẫu Câu / Quy Tắc
        </span>
      );
    case 'pair_work':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          Luyện Nhóm Đôi (Pairs)
        </span>
      );
    case 'group_4':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
          Luyện Nhóm 4 (Groups of 4)
        </span>
      );
    case 'individual_work':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-800 border border-gray-200">
          Luyện Cá Nhân
        </span>
      );
    case 'wrap_up_praise':
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-100 text-pink-800 border border-pink-200">
          Khen Thưởng & Dặn Dò
        </span>
      );
    default:
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
          Hướng Dẫn Nhiệm Vụ
        </span>
      );
  }
}
