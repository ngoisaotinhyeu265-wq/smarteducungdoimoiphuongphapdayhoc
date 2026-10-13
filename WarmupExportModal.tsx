/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Printer, Sparkles } from 'lucide-react';
import { WarmupScript } from '../../types/warmup';
import { sounds } from '../../lib/audio';

interface WarmupExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: WarmupScript;
}

export default function WarmupExportModal({
  isOpen,
  onClose,
  script
}: WarmupExportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate plain text script
  const generatePlainText = () => {
    let text = `======================================================\n`;
    text += `AI ENGLISH WARM-UP STUDIO – 5-MINUTE CREATIVE WARM-UP\n`;
    text += `======================================================\n\n`;
    text += `ACTIVITY TITLE: ${script.title.toUpperCase()}\n`;
    text += `Type: ${script.warmupTypeLabel} | Grade: ${script.grade} | Duration: ${script.duration}\n`;
    text += `Textbook: ${script.textbook} - ${script.unit} - ${script.lesson}\n`;
    text += `Topic: ${script.topic}\n`;
    text += `Language Focus:\n`;
    text += `  • Vocabulary: ${script.languageFocus.vocabulary.join(', ')}\n`;
    text += `  • Sentence Patterns: ${script.languageFocus.sentencePatterns.join(' | ')}\n\n`;
    text += `OBJECTIVES:\n`;
    script.objectives.forEach(obj => {
      text += `  • ${obj}\n`;
    });
    text += `\nMEET OUR PERFORMERS:\n`;
    text += `  Greeting: "${script.meetOurPerformers.introGreeting}"\n`;
    script.meetOurPerformers.studentIntroductions.forEach(si => {
      text += `  - ${si.studentName}: ${si.introLine}\n`;
    });
    text += `\nCHARACTERS & ROLES:\n`;
    script.characters.forEach(c => {
      text += `  - ${c.name} (${c.roleTitle}): ${c.description} [${c.speakingLoad} speaking]\n`;
    });
    text += `\nSTAGE SET-UP:\n${script.stageFormation.description}\n\n`;
    text += `PROPS: ${script.props.join(', ')}\n\n`;
    text += `TIMELINE (0:00 - 5:00):\n`;
    script.timingBreakdown.forEach(tb => {
      text += `  [${tb.range}] ${tb.sectionName}: ${tb.description}\n`;
    });
    text += `\n======================================================\n`;
    text += `FULL SCRIPT WITH STAGE DIRECTIONS\n`;
    text += `======================================================\n\n`;

    script.scenes.forEach(scene => {
      text += `--- SCENE ${scene.sceneNumber}: ${scene.title.toUpperCase()} (${scene.timeRange}) ---\n`;
      text += `Purpose: ${scene.purpose}\n\n`;
      scene.lines.forEach(line => {
        text += `${line.speaker}`;
        if (line.timing) text += ` [${line.timing}]`;
        text += `:\n`;
        if (line.stageDirection) text += `  ${line.stageDirection}\n`;
        text += `  "${line.lineEnglish}"\n`;
        if (line.lineVietnamese) text += `  (${line.lineVietnamese})\n`;
        text += `\n`;
      });
    });

    text += `======================================================\n`;
    text += `WHOLE-CLASS INTERACTION:\n`;
    script.wholeClassInteraction.interactionMoments.forEach(m => text += `  • ${m}\n`);
    text += `\nTRANSITION TO LESSON:\n`;
    text += `  Bridge Speech: ${script.transitionToLesson.bridgeSpeech}\n`;
    text += `  Teacher Closing: ${script.transitionToLesson.teacherClosingSentence}\n`;
    text += `  Lead-in Question: ${script.transitionToLesson.leadInQuestion}\n\n`;
    text += `TEACHER'S QUICK GUIDE:\n`;
    text += `  Before class briefing: ${script.teacherGuide.beforeClassBriefing}\n`;
    text += `  Stage arrangement: ${script.teacherGuide.stageArrangement}\n`;
    text += `  Teacher role: ${script.teacherGuide.teacherRole}\n`;
    return text;
  };

  const handleCopyClipboard = () => {
    sounds.playClick();
    const text = generatePlainText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadWordDoc = () => {
    sounds.playClick();
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${script.title}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; color: #1e293b; }
          h1 { color: #4338ca; text-align: center; font-size: 22pt; margin-bottom: 4px; }
          .subtitle { text-align: center; color: #64748b; font-size: 11pt; margin-bottom: 20px; font-weight: bold; }
          .header-box { background-color: #f1f5f9; border-left: 6px solid #4f46e5; padding: 15px; margin-bottom: 20px; }
          h2 { color: #1e1b4b; border-bottom: 2px solid #cbd5e1; padding-bottom: 4px; font-size: 14pt; margin-top: 24px; }
          h3 { color: #4338ca; font-size: 12pt; margin-top: 16px; background-color: #e0e7ff; padding: 6px 10px; }
          .speaker { font-weight: bold; color: #1e1b4b; }
          .stage-dir { color: #d97706; font-style: italic; margin-left: 15px; }
          .english-line { font-size: 12pt; font-weight: bold; color: #0f172a; margin-left: 15px; }
          .vietnamese-line { color: #64748b; font-style: italic; margin-left: 15px; font-size: 10pt; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; font-size: 10pt; }
          th { background-color: #4f46e5; color: white; }
          .footer-note { text-align: center; margin-top: 40px; font-size: 9pt; color: #94a3b8; }
        </style>
      </head>
      <body>
        <h1>5-MINUTE CREATIVE WARM-UP SCRIPT</h1>
        <div class="subtitle">${script.title.toUpperCase()} • GRADE ${script.grade} (${script.duration})</div>
        
        <div class="header-box">
          <p><strong>Textbook:</strong> ${script.textbook} | <strong>Unit:</strong> ${script.unit} | <strong>Lesson:</strong> ${script.lesson}</p>
          <p><strong>Type:</strong> ${script.warmupTypeLabel} | <strong>Duration:</strong> ${script.duration} (Strictly ~5 Mins)</p>
          <p><strong>Language Focus:</strong> ${script.languageFocus.vocabulary.join(', ')}</p>
          <p><strong>Sentence Patterns:</strong> ${script.languageFocus.sentencePatterns.join(' | ')}</p>
        </div>

        <h2>I. OBJECTIVES</h2>
        <ul>
          ${script.objectives.map(o => `<li>${o}</li>`).join('')}
        </ul>

        <h2>II. MEET OUR PERFORMERS</h2>
        <p><em>"${script.meetOurPerformers.introGreeting}"</em></p>
        <ul>
          ${script.meetOurPerformers.studentIntroductions.map(si => `<li><strong>${si.studentName}:</strong> ${si.introLine}</li>`).join('')}
        </ul>

        <h2>III. CHARACTERS & STAGE SET-UP</h2>
        <table>
          <tr>
            <th>Student Name</th>
            <th>Role Title</th>
            <th>Speaking Load</th>
            <th>Role Description</th>
          </tr>
          ${script.characters.map(c => `
            <tr>
              <td><strong>${c.name}</strong></td>
              <td>${c.roleTitle}</td>
              <td>${c.speakingLoad}</td>
              <td>${c.description}</td>
            </tr>
          `).join('')}
        </table>
        <p><strong>Stage Layout:</strong> ${script.stageFormation.description}</p>
        <p><strong>Props Needed:</strong> ${script.props.join(', ')}</p>

        <h2>IV. TIMING BREAKDOWN (0:00 - 5:00)</h2>
        <table>
          <tr>
            <th>Time Range</th>
            <th>Section</th>
            <th>Description</th>
          </tr>
          ${script.timingBreakdown.map(tb => `
            <tr>
              <td><strong>${tb.range}</strong></td>
              <td>${tb.sectionName}</td>
              <td>${tb.description}</td>
            </tr>
          `).join('')}
        </table>

        <h2>V. FULL SCRIPT WITH STAGE DIRECTIONS</h2>
        ${script.scenes.map(scene => `
          <h3>SCENE ${scene.sceneNumber}: ${scene.title.toUpperCase()} (${scene.timeRange})</h3>
          <p><em>Purpose: ${scene.purpose}</em></p>
          ${scene.lines.map(line => `
            <div style="margin-bottom: 12px;">
              <div class="speaker">${line.speaker} ${line.timing ? `[${line.timing}]` : ''}:</div>
              ${line.stageDirection ? `<div class="stage-dir">${line.stageDirection}</div>` : ''}
              <div class="english-line">“${line.lineEnglish}”</div>
              ${line.lineVietnamese ? `<div class="vietnamese-line">(${line.lineVietnamese})</div>` : ''}
            </div>
          `).join('')}
        `).join('')}

        <h2>VI. WHOLE-CLASS INTERACTION & LESSON BRIDGE</h2>
        <ul>
          ${script.wholeClassInteraction.interactionMoments.map(m => `<li>${m}</li>`).join('')}
        </ul>
        <p><strong>Bridge to Lesson:</strong> ${script.transitionToLesson.bridgeSpeech}</p>
        <p><strong>Teacher Closing:</strong> ${script.transitionToLesson.teacherClosingSentence}</p>

        <h2>VII. TEACHER'S QUICK GUIDE</h2>
        <p><strong>Before-class briefing:</strong> ${script.teacherGuide.beforeClassBriefing}</p>
        <p><strong>Teacher's role during warm-up:</strong> ${script.teacherGuide.teacherRole}</p>
        <p><strong>Praise Feedback:</strong> ${script.teacherGuide.suggestedPraiseFeedback.join(' • ')}</p>

        <div class="footer-note">
          Generated with SmartEdu AI English Warm-up Studio – 5-Minute Creative Warm-up
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Warmup_${script.title.replace(/[^a-zA-Z0-9]/g, '_')}_Grade${script.grade}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/20">
              <Download className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-fredoka font-bold text-base">Xuất Kịch Bản Khởi Động (5 Phút)</h3>
              <p className="text-xs text-indigo-100">{script.title} (Lớp {script.grade})</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">
                Kịch bản đã được tối ưu chuẩn 5 phút & tích hợp sư phạm đầy đủ:
              </p>
              <p>
                Bao gồm Lời thoại song ngữ Anh - Việt, Chỉ dẫn sân khấu [Stage Directions], Phân vai diễn viên, Sơ đồ vị trí và Hướng dẫn giáo viên trước giờ học.
              </p>
            </div>
          </div>

          {/* Export Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Word Download */}
            <button
              type="button"
              onClick={handleDownloadWordDoc}
              className="p-4 rounded-2xl border-2 border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-600 hover:text-white text-indigo-950 dark:text-indigo-200 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
              <span className="font-fredoka font-bold text-xs">Tải File Word (.doc)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-indigo-100">Đầy đủ định dạng & bảng</span>
            </button>

            {/* Copy to Clipboard */}
            <button
              type="button"
              onClick={handleCopyClipboard}
              className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              {copied ? (
                <Check className="w-8 h-8 text-emerald-500 animate-bounce" />
              ) : (
                <Copy className="w-8 h-8 text-slate-600 dark:text-slate-400 group-hover:text-emerald-500 transition-colors" />
              )}
              <span className="font-fredoka font-bold text-xs text-slate-800 dark:text-white group-hover:text-emerald-600">
                {copied ? 'Đã sao chép!' : 'Sao chép văn bản'}
              </span>
              <span className="text-[10px] text-slate-500 group-hover:text-emerald-700">Dán nhanh vào giáo án</span>
            </button>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <Printer className="w-8 h-8 text-slate-600 dark:text-slate-400 group-hover:text-purple-500 transition-colors" />
              <span className="font-fredoka font-bold text-xs text-slate-800 dark:text-white group-hover:text-purple-600">In / Lưu PDF</span>
              <span className="text-[10px] text-slate-500 group-hover:text-purple-700">In phát cho học sinh</span>
            </button>
          </div>

          {/* Quick Script Preview Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Xem trước kịch bản:</span>
              <span>{script.scenes.length} Cảnh • {script.duration}</span>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-h-40 overflow-y-auto whitespace-pre-wrap">
              {generatePlainText().slice(0, 800)}...
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-fredoka font-bold transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
