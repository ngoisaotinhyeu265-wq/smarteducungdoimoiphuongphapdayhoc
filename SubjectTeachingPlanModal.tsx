/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  X, Download, Printer, Copy, Check, Search, Filter, BookOpen, 
  Sparkles, ExternalLink, FileText, ChevronRight, Layers, Award,
  CheckCircle2, Globe, Cpu, ShieldAlert, HeartHandshake, Compass
} from 'lucide-react';
import { sounds } from '../lib/audio';
import { getFull35WeeksForSubjectAndGrade } from '../data/full35WeeksCurriculum';

interface SubjectTeachingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPeriodForPlanner?: (subject: string, grade: string, week: number, periodIdx: number | null) => void;
  initialSubject?: string;
  initialGrade?: string;
}

export default function SubjectTeachingPlanModal({
  isOpen,
  onClose,
  onSelectPeriodForPlanner,
  initialSubject = 'Tiếng Anh',
  initialGrade = 'Lớp 3'
}: SubjectTeachingPlanModalProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade);
  const [semesterFilter, setSemesterFilter] = useState<'all' | 1 | 2>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('Trường Tiểu học Chuẩn Quốc Gia');
  const [teacherName, setTeacherName] = useState<string>('Giáo viên Bộ môn');
  const [academicYear, setAcademicYear] = useState<string>('2024 - 2025');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Subjects list
  const subjects = ['Tiếng Anh', 'Toán', 'Tiếng Việt', 'Khoa học', 'Tự nhiên và Xã hội', 'Lịch sử và Địa lý', 'Hoạt động trải nghiệm'];
  const grades = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'];

  // Load 35 weeks curriculum data
  const curriculumData = useMemo(() => {
    return getFull35WeeksForSubjectAndGrade(selectedSubject, selectedGrade);
  }, [selectedSubject, selectedGrade]);

  // Compute total periods
  const totalYearPeriods = useMemo(() => {
    return curriculumData.reduce((sum, w) => sum + (w.periodCount || w.periods?.length || 0), 0);
  }, [curriculumData]);

  // Flattened periods list for Phụ lục 2 Table with exact sub-columns
  const tableRows = useMemo(() => {
    const rows: {
      globalIndex: number;
      week: number;
      weekLabel: string;
      semester: number;
      theme: string;
      unitTitle: string;
      detailedContent: string;
      periodLabel: string;
      periodNumber: number;
      adjustmentIntegration: {
        ai: string;
        atgt_kns: string;
        nls: string;
        devices: string;
      };
      note: string;
    }[] = [];

    let count = 0;

    curriculumData.forEach((w) => {
      if (semesterFilter !== 'all' && w.semester !== semesterFilter) {
        return;
      }

      // Determine Primary English theme if not explicitly set
      let macroTheme = w.theme;
      if (selectedSubject === 'Tiếng Anh') {
        const uNum = parseInt(w.unitCode?.replace(/\D/g, '') || '0', 10);
        if (selectedGrade === 'Lớp 1' || selectedGrade === 'Lớp 2') {
          if (w.unitCode?.toLowerCase().includes('starter') || w.week === 1) {
            macroTheme = 'Làm quen & Khởi động đầu năm';
          } else if (uNum >= 1 && uNum <= 4) {
            macroTheme = 'Me and my friends';
          } else if (uNum >= 5 && uNum <= 8) {
            macroTheme = 'Me and my school';
          } else if (uNum >= 9 && uNum <= 12) {
            macroTheme = 'Me and my family';
          } else if (uNum >= 13 && uNum <= 16) {
            macroTheme = 'Me and the world around';
          } else if (w.unitCode?.toLowerCase().includes('review') || w.unitCode?.toLowerCase().includes('assessment')) {
            macroTheme = 'Ôn tập & Đánh giá định kỳ';
          } else {
            macroTheme = 'Me and my friends';
          }
        } else {
          // Grade 3, 4, 5 (Units 1-20)
          if (w.unitCode?.toLowerCase().includes('starter') || w.week === 1) {
            macroTheme = 'Làm quen & Khởi động đầu năm';
          } else if (uNum >= 1 && uNum <= 5) {
            macroTheme = 'Me and my friends';
          } else if (uNum >= 6 && uNum <= 10) {
            macroTheme = 'Me and my school';
          } else if (uNum >= 11 && uNum <= 15) {
            macroTheme = 'Me and my family';
          } else if (uNum >= 16 && uNum <= 20) {
            macroTheme = 'Me and the world around';
          } else if (w.unitCode?.toLowerCase().includes('review') || w.unitCode?.toLowerCase().includes('assessment')) {
            macroTheme = 'Ôn tập & Đánh giá định kỳ';
          } else {
            macroTheme = 'Me and my friends';
          }
        }
      }

      if (w.periods && w.periods.length > 0) {
        w.periods.forEach((p, pIdx) => {
          count++;

          // Build realistic pedagogical integration entries
          let aiTag = '';
          let atgtTag = '';
          let nlsTag = '';
          let deviceTag = 'SGK Tiếng Anh Global Success, Flashcards tranh từ, Loa bluetooth, Màn hình TV/Tương tác';

          const vocabList = w.keyVocabulary && w.keyVocabulary.length > 0 ? w.keyVocabulary.slice(0, 3).join(', ') : 'từ vựng bài học';
          const pLower = p.lessonPart.toLowerCase();

          if (pLower.includes('làm quen') || pLower.includes('starter')) {
            aiTag = 'AI 1.C1.1: Học sinh nhận biết Robot (AI) có thể phát âm tiếng Anh chuẩn và tương tác câu lệnh cơ bản.';
            atgtTag = 'KNS: Rèn luyện tính tự giác, tư thế ngồi học ngay ngắn và văn hóa chào hỏi lễ phép khi vào lớp.';
            nlsTag = 'NLS 1.3.CB1a: Hướng dẫn học sinh nhận biết mã QR và mở tệp âm thanh bài học trên kho học liệu số an toàn (taphuan.nxbgd.vn & hoclieu.vn).';
            deviceTag = 'SGK, Video giới thiệu sách trên sachmem.vn, Tranh khẩu lệnh TPR, Loa âm thanh';
          } else if (pLower.includes('lesson 1') || p.periodNumber % 2 === 1) {
            aiTag = `AI 1.C1.1: Học sinh nhận biết Robot (AI) có bộ phận loa giúp phát âm chuẩn các từ vựng (${vocabList}). Luyện đọc chuẩn âm bản ngữ.`;
            atgtTag = pLower.includes('playground') || pLower.includes('school') || pLower.includes('park')
              ? 'ATGT: Nhắc nhở quy tắc an toàn: không đá bóng/chạy nhảy dưới lòng đường, chỉ vui chơi trong sân trường an toàn.'
              : 'KNS: Tự tin phát âm to rõ ràng, lắng nghe bạn bè và chủ động hợp tác thực hành theo cặp.';
            nlsTag = 'NLS 1.3.CB1a: Sử dụng màn hình cảm ứng để chạm nghe và lặp lại từ ngữ trên ứng dụng học liệu số.';
            deviceTag = `SGK, Bộ Flashcards từ vựng (${vocabList}), File Audio từ sachmem.vn, Loa, Máy chiếu`;
          } else if (pLower.includes('lesson 2') || pLower.includes('lesson 3') || pLower.includes('chant')) {
            aiTag = `AI 1.C1.2: Sử dụng công cụ nhận diện giọng nói AI để phát hiện và chỉnh sửa lỗi ngữ điệu câu giao tiếp: "${w.sentencePatternsOrRules?.[0] || 'Hello!'}".`;
            atgtTag = 'KNS: Kỹ năng lắng nghe tích cực, điều chỉnh âm lượng giọng nói phù hợp khi tham gia trò chơi tiếp sức nhóm.';
            nlsTag = 'NLS 2.2.CB2b: Tham gia trò chơi tương tác số trắc nghiệm (Wordwall/Quizizz) nhận biết tranh và âm vần.';
            deviceTag = 'SGK, Tranh tình huống số hóa, Dải câu mẫu, Thẻ trò chơi tương tác, Loa';
          } else if (pLower.includes('project') || pLower.includes('fun time') || pLower.includes('sing')) {
            aiTag = 'AI 1.D1.1: Khám phá tranh minh họa được tối ưu hóa bằng công cụ AI hỗ trợ ghi nhớ từ vựng thị giác.';
            atgtTag = 'GDĐP & KNS: Giữ gìn vệ sinh lớp học sau giờ làm dự án thủ công, trân trọng và tự hào giới thiệu sản phẩm của bản thân.';
            nlsTag = 'NLS 3.1.CB3a: Chụp ảnh sản phẩm dự án học tập (Project) để lưu trữ vào góc học tập số hóa của lớp.';
            deviceTag = 'SGK, Giấy vẽ A4, Bút màu sáp, Kéo thủ công, File nhạc bài hát MP3, Bảng nỉ trưng bày';
          } else {
            aiTag = 'AI 1.C1.1: Luyện tập phát âm tự động và chấm điểm độ chính xác ngữ âm qua phần mềm hỗ trợ.';
            atgtTag = 'KNS & ATGT: Tự giác làm bài kiểm tra trung thực, tuân thủ an toàn phòng học khi sử dụng thiết bị điện tử.';
            nlsTag = 'NLS 1.3.CB1a: Làm bài khảo sát đánh giá năng lực ngôn ngữ trên nền tảng kiểm tra trực tuyến.';
            deviceTag = 'Phiếu bài tập / Đề kiểm tra định kỳ, File âm thanh bài nghe, Máy tính giáo viên, Loa';
          }

          // Build detailed lesson text
          let detail = p.scope ? `${p.lessonPart} (${p.scope})` : p.lessonPart;
          if (p.suggestedActivity && !detail.includes('+')) {
            detail += ` + ${p.suggestedActivity.split(',')[0]}`;
          }

          rows.push({
            globalIndex: count,
            week: w.week,
            weekLabel: `Tuần ${w.week}`,
            semester: w.semester,
            theme: macroTheme,
            unitTitle: w.lessonTitle,
            detailedContent: detail,
            periodLabel: p.periodLabel || `Tiết ${p.periodNumber || pIdx + 1}`,
            periodNumber: p.periodNumber || (pIdx + 1),
            adjustmentIntegration: {
              ai: aiTag,
              atgt_kns: atgtTag,
              nls: nlsTag,
              devices: deviceTag
            },
            note: 'Tích hợp AI theo QĐ 2422/QĐ-BGDĐT & NLS theo TT 02/2025/TT-BGDĐT'
          });
        });
      } else {
        count++;
        rows.push({
          globalIndex: count,
          week: w.week,
          weekLabel: `Tuần ${w.week}`,
          semester: w.semester,
          theme: macroTheme,
          unitTitle: w.lessonTitle,
          detailedContent: w.allLessonsInWeek?.join('; ') || w.lessonTitle,
          periodLabel: `Toàn tuần (${w.periodCount} tiết)`,
          periodNumber: 1,
          adjustmentIntegration: {
            ai: 'AI: Ứng dụng công nghệ số và trợ lý ảo hỗ trợ học tập theo QĐ 2422/QĐ-BGDĐT.',
            atgt_kns: 'KNS & ATGT: Rèn luyện kỹ năng sống, an toàn giao thông và giao tiếp tự tin.',
            nls: 'NLS: Khai thác kho học liệu số taphuan.nxbgd.vn và hoclieu.vn theo TT 02/2025/TT-BGDĐT.',
            devices: 'SGK, Bộ đồ dùng dạy học chuẩn, File âm thanh/hình ảnh số hóa, TV/Máy chiếu'
          },
          note: 'Tích hợp NLS (TT 02/2025) & AI (QĐ 2422)'
        });
      }
    });

    // Apply Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return rows.filter(r => 
        r.unitTitle.toLowerCase().includes(q) ||
        r.detailedContent.toLowerCase().includes(q) ||
        r.theme.toLowerCase().includes(q) ||
        r.adjustmentIntegration.ai.toLowerCase().includes(q) ||
        r.adjustmentIntegration.atgt_kns.toLowerCase().includes(q) ||
        r.adjustmentIntegration.nls.toLowerCase().includes(q) ||
        r.weekLabel.toLowerCase().includes(q)
      );
    }

    return rows;
  }, [curriculumData, semesterFilter, searchQuery, selectedSubject, selectedGrade]);

  // Copy table TSV for Excel matching exact requested columns
  const handleCopyTable = () => {
    sounds.playSuccess();
    const headers = [
      'Tuần/tháng',
      'Chủ đề/ Mạch nội dung',
      'Tên bài học',
      'Nội dung chi tiết',
      'Tiết học/ Thời lượng',
      'Nội dung điều chỉnh, bổ sung (nếu có)',
      'Ghi chú'
    ];
    const lines = tableRows.map(r => {
      const adjustmentText = [
        r.adjustmentIntegration.ai,
        r.adjustmentIntegration.atgt_kns,
        r.adjustmentIntegration.nls,
        `Thiết bị & Học liệu: ${r.adjustmentIntegration.devices}`
      ].filter(Boolean).join('\n');

      return [
        r.weekLabel,
        `"${r.theme.replace(/"/g, '""')}"`,
        `"${r.unitTitle.replace(/"/g, '""')}"`,
        `"${r.detailedContent.replace(/"/g, '""')}"`,
        r.periodLabel,
        `"${adjustmentText.replace(/"/g, '""')}"`,
        `"${r.note.replace(/"/g, '""')}"`
      ].join('\t');
    });

    const fullTsv = [headers.join('\t'), ...lines].join('\n');
    navigator.clipboard.writeText(fullTsv);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Export HTML / Docx format strictly following CV 2345 Phụ lục 2
  const handleExportWord = () => {
    sounds.playSuccess();
    const gradeNumberStr = String(selectedGrade || '1').replace(/\D/g, '') || '1';
    const semesterTitle = semesterFilter === 'all' ? 'CẢ NĂM' : `HỌC KỲ ${semesterFilter}`;

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Kế hoạch dạy học môn ${selectedSubject} ${gradeNumberStr} - ${semesterTitle} (Global Success)</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.3; }
          .header-table { width: 100%; border: none; margin-bottom: 15px; }
          .header-table td { border: none; vertical-align: top; }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .main-title { font-size: 14pt; font-weight: bold; text-align: center; margin-top: 10px; margin-bottom: 4px; text-transform: uppercase; }
          .sub-title { font-size: 11pt; text-align: center; margin-bottom: 4px; font-style: italic; }
          table.content-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 10.5pt; }
          table.content-table th, table.content-table td { border: 1px solid black; padding: 5px 6px; }
          table.content-table th { background-color: #f2f2f2; text-align: center; font-weight: bold; }
          .sign-table { width: 100%; border: none; margin-top: 30px; }
          .sign-table td { border: none; text-align: center; vertical-align: top; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 45%; text-align: center;">
              <strong>${schoolName.toUpperCase()}</strong><br/>
              <strong>TỔ CHUYÊN MÔN: ${selectedGrade.toUpperCase()}</strong>
            </td>
            <td style="width: 55%; text-align: center;">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br/>
              <strong>Độc lập - Tự do - Hạnh phúc</strong><br/>
              <em>........., ngày ..... tháng ..... năm 2024</em>
            </td>
          </tr>
        </table>

        <div class="main-title">KẾ HOẠCH DẠY HỌC MÔN ${selectedSubject.toUpperCase()} ${gradeNumberStr} - ${semesterTitle} (GLOBAL SUCCESS)</div>
        <div class="sub-title">(theo Phụ Lục 2 Công văn 2345/BGDĐT-GDTH và bổ sung tích hợp Trí tuệ nhân tạo AI theo QĐ số 2422/QĐ-BGDĐT, Năng lực số theo Thông tư 02/2025/TT-BGDĐT và tích hợp liên môn)</div>
        <div class="sub-title">Năm học: ${academicYear} | Tổng số tiết: ${totalYearPeriods} tiết (${selectedGrade === 'Lớp 1' || selectedGrade === 'Lớp 2' ? '70 tiết / 35 tuần - 2 tiết/tuần' : '140 tiết / 35 tuần - 4 tiết/tuần'})</div>

        <table class="content-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 7%;">Tuần/<br/>tháng</th>
              <th colspan="4" style="width: 45%;">CHƯƠNG TRÌNH VÀ SÁCH GIÁO KHOA<br/>${selectedSubject.toUpperCase()} ${gradeNumberStr} – GLOBAL SUCCESS</th>
              <th rowspan="2" style="width: 38%;">Nội dung điều chỉnh, bổ sung (nếu có)<br/><span style="font-weight: normal; font-size: 9pt;">(Những điều chỉnh về nội dung, thời lượng, thiết bị dạy học và học liệu tham khảo; xây dựng chủ đề học tập, bổ sung tích hợp liên môn; thời gian và hình thức tổ chức...)</span></th>
              <th rowspan="2" style="width: 10%;">Ghi chú</th>
            </tr>
            <tr>
              <th style="width: 11%;">Chủ đề/<br/>Mạch nội dung</th>
              <th style="width: 14%;">Tên bài học</th>
              <th style="width: 14%;">Nội dung chi tiết</th>
              <th style="width: 6%;">Tiết học/<br/>Thời lượng</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows.map(r => `
              <tr>
                <td style="text-align: center; font-weight: bold;">${r.weekLabel}</td>
                <td>${r.theme}</td>
                <td><strong>${r.unitTitle}</strong></td>
                <td>${r.detailedContent}</td>
                <td style="text-align: center; font-weight: bold;">${r.periodLabel}</td>
                <td>
                  <strong>${r.adjustmentIntegration.ai}</strong><br/>
                  ${r.adjustmentIntegration.atgt_kns ? `${r.adjustmentIntegration.atgt_kns}<br/>` : ''}
                  ${r.adjustmentIntegration.nls ? `${r.adjustmentIntegration.nls}<br/>` : ''}
                  <em style="color: #444;">Thiết bị & Học liệu: ${r.adjustmentIntegration.devices}</em>
                </td>
                <td style="font-size: 9pt; text-align: center;">${r.note}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <br/>
        <table class="sign-table">
          <tr>
            <td style="width: 50%;">
              <strong>TỔ TRƯỞNG CHUYÊN MÔN</strong><br/>
              <em>(Ký và ghi rõ họ tên)</em><br/><br/><br/><br/>
              <strong>${teacherName}</strong>
            </td>
            <td style="width: 50%;">
              <strong>HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG</strong><br/>
              <em>(Ký, đóng dấu và ghi rõ họ tên)</em><br/><br/><br/><br/>
              <strong>Ban Giám Hiệu</strong>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ke_Hoach_Day_Hoc_${selectedSubject}_${gradeNumberStr}_CV2345.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const gradeNumberStr = String(selectedGrade || '1').replace(/\D/g, '') || '1';
  const semesterTitle = semesterFilter === 'all' ? 'Cả năm' : `Học kỳ ${semesterFilter}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md overflow-hidden">
      <div className="bg-white w-full max-w-7xl h-[95vh] rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner">
              📋
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-fredoka text-lg sm:text-xl font-bold text-white tracking-wide">
                  Kế Hoạch Dạy Học 35 Tuần (Phụ Lục 2 CV 2345/BGDĐT-GDTH)
                </h2>
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Chuẩn Global Success & QĐ 2422
                </span>
              </div>
              <p className="text-xs text-blue-200 font-medium">
                Tích hợp Trí tuệ nhân tạo AI (QĐ 2422), Năng lực số (TT 02/2025/TT-BGDĐT), ATGT, KNS, GDĐP & STEM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://taphuan.nxbgd.vn/tap-huan"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
              title="Tra cứu kho tài liệu tập huấn NXBGD"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-300" />
              <span>taphuan.nxbgd.vn</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://hoclieu.vn/kho-hoc-lieu"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
              title="Tra cứu kho học liệu điện tử hoclieu.vn"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>hoclieu.vn</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Subject Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-600">Môn học:</span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                {subjects.slice(0, 3).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => { sounds.playClick(); setSelectedSubject(sub); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSubject === sub
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sub === 'Tiếng Anh' ? '🇬🇧 ' : sub === 'Toán' ? '📐 ' : '📖 '}
                    {sub}
                  </button>
                ))}
              </div>

              {/* Grade Selector */}
              <span className="text-xs font-bold text-slate-600 ml-2">Khối:</span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                {grades.map((gr) => (
                  <button
                    key={gr}
                    onClick={() => { sounds.playClick(); setSelectedGrade(gr); }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedGrade === gr
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {gr}
                  </button>
                ))}
              </div>

              {/* Semester Filter */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs ml-2">
                <button
                  onClick={() => { sounds.playClick(); setSemesterFilter('all'); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    semesterFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cả năm (35T)
                </button>
                <button
                  onClick={() => { sounds.playClick(); setSemesterFilter(1); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    semesterFilter === 1 ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Học kì 1
                </button>
                <button
                  onClick={() => { sounds.playClick(); setSemesterFilter(2); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    semesterFilter === 2 ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Học kì 2
                </button>
              </div>
            </div>

            {/* Actions: Export Word, Copy, Print */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTable}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                title="Sao chép bảng để dán vào Excel"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                <span>{isCopied ? 'Đã sao chép!' : 'Copy Excel'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                title="In hoặc xuất PDF"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>In / PDF</span>
              </button>

              <button
                onClick={handleExportWord}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                title="Xuất file Word chuẩn Phụ lục 2 Công văn 2345"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Word (.doc) CV 2345</span>
              </button>
            </div>
          </div>

          {/* Search and Info Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo Unit, Lesson, Hoạt động, Từ vựng, NLS, AI..."
                className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                📊 Tổng cộng: <strong>{totalYearPeriods} tiết / 35 tuần</strong> ({selectedGrade === 'Lớp 1' || selectedGrade === 'Lớp 2' ? '2 tiết/tuần' : '4 tiết/tuần'})
              </span>
              <span className="text-[11px] text-slate-500">
                Hiển thị: <strong>{tableRows.length}</strong> tiết học
              </span>
            </div>
          </div>
        </div>

        {/* Main Table Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100/60">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Formal Document Heading inside table */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white text-center space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-2">
                <div>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="font-bold uppercase text-slate-800 border-b border-dashed border-slate-300 focus:outline-hidden text-left bg-transparent"
                  />
                  <div className="text-[11px] text-slate-500">TỔ CHUYÊN MÔN: {selectedGrade.toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold uppercase text-slate-800">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                  <div className="text-[11px] text-slate-500 italic">Độc lập - Tự do - Hạnh phúc</div>
                </div>
              </div>

              <h1 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-900 tracking-wide uppercase">
                Kế Hoạch Dạy Học Môn {selectedSubject} {gradeNumberStr} - {semesterTitle} (Global Success)
              </h1>
              <p className="text-xs text-slate-600 italic">
                (theo Phụ Lục 2 Công văn 2345/BGDĐT-GDTH và bổ sung tích hợp Trí tuệ nhân tạo AI theo QĐ số 2422/QĐ-BGDĐT, Năng lực số theo Thông tư 02/2025/TT-BGDĐT và tích hợp liên môn)
              </p>
              <div className="flex items-center justify-center gap-3 text-xs font-bold text-blue-900 bg-blue-50 py-1.5 px-4 rounded-full max-w-xl mx-auto border border-blue-100">
                <span>Bộ SGK: Global Success (Kết nối tri thức)</span>
                <span>•</span>
                <span>Năm học: {academicYear}</span>
                <span>•</span>
                <span>Tổng: {totalYearPeriods} tiết / 35 tuần</span>
              </div>
            </div>

            {/* Table matching the exact 4-tier sub-column specification */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  {/* Tier 1 Header */}
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider">
                    <th rowSpan={2} className="p-3 border-r border-slate-200 text-center w-20 bg-slate-100">
                      Tuần/<br/>tháng
                    </th>
                    <th colSpan={4} className="p-3 border-r border-slate-200 text-center bg-blue-50/70 text-blue-900">
                      CHƯƠNG TRÌNH VÀ SÁCH GIÁO KHOA<br/>
                      <span className="text-[10px] font-bold text-blue-700">{selectedSubject} {gradeNumberStr} – Global Success</span>
                    </th>
                    <th rowSpan={2} className="p-3 border-r border-slate-200 min-w-[340px] bg-slate-100">
                      <div>Nội dung điều chỉnh, bổ sung (nếu có)</div>
                      <div className="text-[10px] font-normal text-slate-500 normal-case mt-0.5 leading-tight">
                        (Những điều chỉnh về nội dung, thời lượng, thiết bị dạy học và học liệu tham khảo; xây dựng chủ đề học tập, bổ sung tích hợp liên môn; thời gian và hình thức tổ chức...)
                      </div>
                    </th>
                    <th rowSpan={2} className="p-3 border-r border-slate-200 text-center w-28 bg-slate-100">
                      Ghi chú
                    </th>
                    <th rowSpan={2} className="p-3 text-center w-28 bg-indigo-50/80 text-indigo-900 print:hidden">
                      Thao tác
                    </th>
                  </tr>

                  {/* Tier 2 Sub-Header */}
                  <tr className="bg-blue-100/60 border-b border-slate-300 text-blue-950 font-bold text-[10px] uppercase tracking-wider">
                    <th className="p-2 border-r border-slate-200 min-w-[130px] text-center">
                      Chủ đề/<br/>Mạch nội dung
                    </th>
                    <th className="p-2 border-r border-slate-200 min-w-[160px] text-center">
                      Tên bài học
                    </th>
                    <th className="p-2 border-r border-slate-200 min-w-[200px] text-center">
                      Nội dung chi tiết
                    </th>
                    <th className="p-2 border-r border-slate-200 text-center w-20">
                      Tiết học/<br/>Thời lượng
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {tableRows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500">
                        Không tìm thấy tiết học phù hợp với từ khóa "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    tableRows.map((row) => (
                      <tr 
                        key={`${row.week}-${row.globalIndex}`}
                        className="hover:bg-blue-50/40 transition-colors group"
                      >
                        {/* Tuần / tháng */}
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-indigo-900 bg-indigo-50/20">
                          {row.weekLabel}
                        </td>

                        {/* Chủ đề / Mạch nội dung */}
                        <td className="p-3 border-r border-slate-200 font-semibold text-slate-800 text-[11px]">
                          <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                            {row.theme}
                          </span>
                        </td>

                        {/* Tên bài học */}
                        <td className="p-3 border-r border-slate-200 font-bold text-blue-900 text-[11px]">
                          {row.unitTitle}
                        </td>

                        {/* Nội dung chi tiết */}
                        <td className="p-3 border-r border-slate-200 text-slate-800 text-[11px]">
                          <div className="font-medium">{row.detailedContent}</div>
                        </td>

                        {/* Tiết học / Thời lượng */}
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-slate-700 text-[11px]">
                          {row.periodLabel}
                        </td>

                        {/* Nội dung điều chỉnh, bổ sung (nếu có) */}
                        <td className="p-3 border-r border-slate-200 text-[11px] text-slate-700 space-y-1.5">
                          {/* AI tag */}
                          {row.adjustmentIntegration.ai && (
                            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-950 border border-purple-200 font-medium">
                              <span className="font-bold text-purple-700">🤖 </span>
                              {row.adjustmentIntegration.ai}
                            </div>
                          )}

                          {/* ATGT & KNS */}
                          {row.adjustmentIntegration.atgt_kns && (
                            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-950 border border-amber-200 font-medium">
                              <span className="font-bold text-amber-700">🚦 </span>
                              {row.adjustmentIntegration.atgt_kns}
                            </div>
                          )}

                          {/* NLS */}
                          {row.adjustmentIntegration.nls && (
                            <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-950 border border-cyan-200 font-medium">
                              <span className="font-bold text-cyan-700">📱 </span>
                              {row.adjustmentIntegration.nls}
                            </div>
                          )}

                          {/* Devices */}
                          <div className="text-[10px] text-slate-500 italic flex items-start gap-1 pt-0.5">
                            <span>📦</span>
                            <span>Thiết bị & học liệu: {row.adjustmentIntegration.devices}</span>
                          </div>
                        </td>

                        {/* Ghi chú */}
                        <td className="p-3 border-r border-slate-200 text-center text-[10px] text-slate-500">
                          {row.note}
                        </td>

                        {/* Thao tác */}
                        <td className="p-3 text-center bg-blue-50/20 print:hidden">
                          <button
                            type="button"
                            onClick={() => {
                              sounds.playClick();
                              if (onSelectPeriodForPlanner) {
                                onSelectPeriodForPlanner(selectedSubject, selectedGrade, row.week, row.periodNumber);
                              }
                              onClose();
                            }}
                            className="w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[10px] transition-all shadow-2xs hover:shadow-md cursor-pointer flex items-center justify-center gap-1"
                            title="Soạn Kế hoạch bài dạy chi tiết cho tiết này"
                          >
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>Soạn Tiết Này</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Signatures */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <span className="font-bold uppercase text-slate-800">TỔ TRƯỞNG CHUYÊN MÔN</span>
                <p className="text-[11px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
                <div className="h-16"></div>
                <p className="font-bold text-slate-700">{teacherName}</p>
              </div>
              <div>
                <span className="font-bold uppercase text-slate-800">HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG</span>
                <p className="text-[11px] text-slate-500 italic mt-0.5">(Ký, đóng dấu và ghi rõ họ tên)</p>
                <div className="h-16"></div>
                <p className="font-bold text-slate-700">Ban Giám Hiệu</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
