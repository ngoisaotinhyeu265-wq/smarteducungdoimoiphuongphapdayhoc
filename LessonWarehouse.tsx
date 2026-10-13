/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  FolderArchive, Search, Filter, BookOpen, Layers, Sparkles, 
  Trash2, Eye, Download, Printer, Copy, Star, Plus, CheckCircle2,
  FileText, ExternalLink, RefreshCw, Image as ImageIcon, ArrowUpDown,
  Tag, Calendar, Clock, Share2, Award, ChevronRight, Check, Mic, FileCheck, X,
  Upload, Save, FileUp
} from 'lucide-react';
import { WarehouseLessonPlan, SubjectType, FullLessonPlan, TeacherScript } from '../types';
import { INITIAL_WAREHOUSE_LESSON_PLANS } from '../data/curriculumAndTextbooks';
import TeacherScriptModal from './TeacherScriptModal';
import { generateTeacherScript } from '../data/teacherScriptGenerator';
import UploadLessonToWarehouseModal from './UploadLessonToWarehouseModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { extractTextFromFile, parseCompleteLessonPlanText } from '../utils/lessonTemplateParser';

interface LessonWarehouseProps {
  warehousePlans: WarehouseLessonPlan[];
  onLoadPlanToEditor: (plan: WarehouseLessonPlan) => void;
  onSavePlanToWarehouse?: (plan: WarehouseLessonPlan) => void;
  onImportMultiplePlans?: (plans: WarehouseLessonPlan[]) => void;
  onDeletePlan: (id: string) => void;
  onDeleteMultiplePlans?: (ids: string[]) => void;
  onClearAllPlans?: () => void;
  onResetToDefault?: () => void;
  onToggleFavorite: (id: string) => void;
  onOpenCreateNew: () => void;
  onOpenUploadTemplate?: () => void;
  sounds: {
    playClick: () => void;
    playCoin: () => void;
    playLevelUp: () => void;
  };
}

export default function LessonWarehouse({
  warehousePlans,
  onLoadPlanToEditor,
  onSavePlanToWarehouse,
  onImportMultiplePlans,
  onDeletePlan,
  onDeleteMultiplePlans,
  onClearAllPlans,
  onResetToDefault,
  onToggleFavorite,
  onOpenCreateNew,
  onOpenUploadTemplate,
  sounds
}: LessonWarehouseProps) {
  // Filters state
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedBookSeries, setSelectedBookSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'unit'>('newest');

  // Multi-select state for bulk deletion
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [showCleanupModal, setShowCleanupModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [isQuickDragging, setIsQuickDragging] = useState<boolean>(false);
  const [planToDelete, setPlanToDelete] = useState<WarehouseLessonPlan | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Preview modal state
  const [previewPlan, setPreviewPlan] = useState<WarehouseLessonPlan | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scriptModalPlan, setScriptModalPlan] = useState<WarehouseLessonPlan | null>(null);
  const [currentScript, setCurrentScript] = useState<TeacherScript | null>(null);

  // Subject list for filters
  const subjects = ['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Khoa học', 'Lịch sử và Địa lý', 'Tin học và Công nghệ', 'Đạo đức', 'Hoạt động trải nghiệm'];
  const grades = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'];
  const bookSeriesList = [
    'Kết nối tri thức với cuộc sống',
    'Global Success (Bộ GD&ĐT)',
    'Bộ Giáo dục và Đào tạo'
  ];

  // Distinct units extracted from current plans based on subject/grade filter
  const availableUnits = useMemo(() => {
    let list = warehousePlans;
    if (selectedSubject !== 'all') {
      list = list.filter(p => p.subject === selectedSubject);
    }
    if (selectedGrade !== 'all') {
      list = list.filter(p => p.grade === selectedGrade);
    }
    const units = Array.from(new Set(list.map(p => p.unit).filter(Boolean)));
    return units.sort();
  }, [warehousePlans, selectedSubject, selectedGrade]);

  // Filtered & sorted plans
  const filteredPlans = useMemo(() => {
    return warehousePlans.filter(plan => {
      // Subject filter
      if (selectedSubject !== 'all' && plan.subject !== selectedSubject) return false;
      // Grade filter
      if (selectedGrade !== 'all' && plan.grade !== selectedGrade) return false;
      // Unit filter
      if (selectedUnit !== 'all' && plan.unit !== selectedUnit) return false;
      // Book series filter
      if (selectedBookSeries !== 'all' && !plan.bookSeries?.toLowerCase().includes(selectedBookSeries.toLowerCase().split(' ')[0])) return false;
      // Favorite filter
      if (onlyFavorites && !plan.isFavorite) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = plan.title?.toLowerCase().includes(q);
        const matchLesson = plan.lesson?.toLowerCase().includes(q);
        const matchUnit = plan.unit?.toLowerCase().includes(q);
        const matchSubject = plan.subject?.toLowerCase().includes(q);
        const matchSummary = plan.summary?.toLowerCase().includes(q);
        const matchTags = plan.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchLesson && !matchUnit && !matchSubject && !matchSummary && !matchTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'unit') return (a.unit || '').localeCompare(b.unit || '');
      return 0;
    });
  }, [warehousePlans, selectedSubject, selectedGrade, selectedUnit, selectedBookSeries, onlyFavorites, searchQuery, sortBy]);

  // Copy plan content as markdown
  const handleCopyMarkdown = (plan: WarehouseLessonPlan) => {
    sounds.playCoin();
    const fp = plan.fullPlan;
    const isEn = fp.language === 'en' || plan.subject === 'Tiếng Anh';
    
    let text = `# ${plan.title}\n`;
    text += `**${isEn ? 'Subject' : 'Môn học'}:** ${plan.subject} | **${isEn ? 'Grade' : 'Khối lớp'}:** ${plan.grade} | **${isEn ? 'Unit' : 'Chủ điểm/Unit'}:** ${plan.unit} | **${isEn ? 'Period' : 'Tiết'}:** ${plan.period}\n`;
    text += `**${isEn ? 'Curriculum Book' : 'Bộ sách'}:** ${plan.bookSeries} ${plan.pageRange ? `(${plan.pageRange})` : ''}\n\n`;
    
    text += `## ${isEn ? 'I. OBJECTIVES' : 'I. YÊU CẦU CẦN ĐẠT'}\n`;
    text += `### 1. ${isEn ? 'Knowledge and Skills' : 'Năng lực đặc thù (Kiến thức & Kỹ năng)'}\n`;
    fp.objectives?.knowledgeAndSkills?.forEach(o => text += `${o}\n`);
    text += `\n### 2. ${isEn ? 'General Competencies' : 'Năng lực chung'}\n`;
    fp.objectives?.coreCompetencies?.forEach(o => text += `${o}\n`);
    text += `\n### 3. ${isEn ? 'Personal Qualities' : 'Phẩm chất chủ yếu'}\n`;
    fp.objectives?.personalQualities?.forEach(o => text += `${o}\n`);

    text += `\n## ${isEn ? 'II. TEACHING AIDS & EQUIPMENT' : 'II. ĐỒ DÙNG DẠY HỌC'}\n`;
    text += `- **${isEn ? 'Teacher' : 'Giáo viên'}:** ${fp.materials?.teacher?.join('; ')}\n`;
    text += `- **${isEn ? 'Pupils' : 'Học sinh'}:** ${fp.materials?.student?.join('; ')}\n`;

    text += `\n## ${isEn ? 'III. TEACHING AND LEARNING ACTIVITIES (4 STAGES)' : 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (4 BƯỚC)'}\n\n`;
    fp.activities?.forEach((act, idx) => {
      text += `### ${act.name} (${act.duration})\n`;
      text += `- **${isEn ? 'Objective' : 'Mục tiêu'}:** ${act.objective || act.description || ''}\n`;
      text += `- **${isEn ? "Teacher's Activities" : 'Hoạt động của Giáo viên'}:**\n${act.teacherActivity}\n`;
      text += `- **${isEn ? "Pupils' Activities" : 'Hoạt động của Học sinh'}:**\n${act.studentActivity}\n`;
      if (act.assessment) text += `- **${isEn ? 'Assessment' : 'Phương án đánh giá'}:** ${act.assessment}\n`;
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedId(plan.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Export to standard printable Word/Doc
  const handleExportWord = (plan: WarehouseLessonPlan) => {
    sounds.playLevelUp();
    const fp = plan.fullPlan;
    const isEn = fp.language === 'en' || plan.subject === 'Tiếng Anh';

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${plan.title}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.35; color: #000; margin: 20px; }
          h1 { font-size: 16pt; text-align: center; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }
          h2 { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 16px; margin-bottom: 6px; color: #1e3a8a; }
          h3 { font-size: 13pt; font-weight: bold; margin-top: 10px; margin-bottom: 4px; }
          .header-table { width: 100%; margin-bottom: 20px; border: none; }
          .header-table td { font-size: 12pt; }
          table.activity-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
          table.activity-table th, table.activity-table td { border: 1px solid #333; padding: 8px; vertical-align: top; font-size: 12pt; }
          table.activity-table th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
          .badge { display: inline-block; padding: 2px 6px; background: #e0e7ff; color: #3730a3; border-radius: 4px; font-size: 10pt; font-weight: bold; }
          .meta-info { text-align: center; font-style: italic; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="text-align: left; width: 50%;"><strong>${isEn ? 'PRIMARY SCHOOL' : 'TRƯỜNG TIỂU HỌC'}:</strong> ........................................<br><strong>${isEn ? 'DEPARTMENT' : 'TỔ CHUYÊN MÔN'}:</strong> ....................................</td>
            <td style="text-align: right; width: 50%;"><strong>${isEn ? 'TEACHER' : 'GIÁO VIÊN'}:</strong> ................................................<br><strong>${isEn ? 'SCHOOL YEAR' : 'NĂM HỌC'}:</strong> 2024 - 2025</td>
          </tr>
        </table>

        <h1>${isEn ? 'LESSON PLAN' : 'KẾ HOẠCH BÀI DẠY'}</h1>
        <div class="meta-info">
          <strong>${plan.subject} - ${plan.grade}</strong> | ${plan.bookSeries} ${plan.pageRange ? `(${plan.pageRange})` : ''}<br>
          <strong>${plan.unit}</strong> - <strong>${plan.lesson} (${plan.period})</strong>
        </div>

        <h2>${isEn ? 'I. OBJECTIVES' : 'I. YÊU CẦU CẦN ĐẠT'}</h2>
        <h3>1. ${isEn ? 'Knowledge and Skills' : 'Năng lực đặc thù'}</h3>
        <ul>${fp.objectives?.knowledgeAndSkills?.map(k => `<li>${k}</li>`).join('') || ''}</ul>

        <h3>2. ${isEn ? 'General Competencies' : 'Năng lực chung'}</h3>
        <ul>${fp.objectives?.coreCompetencies?.map(c => `<li>${c}</li>`).join('') || ''}</ul>

        <h3>3. ${isEn ? 'Personal Qualities' : 'Phẩm chất chủ yếu'}</h3>
        <ul>${fp.objectives?.personalQualities?.map(q => `<li>${q}</li>`).join('') || ''}</ul>

        <h2>${isEn ? 'II. TEACHING AIDS & EQUIPMENT' : 'II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU SỐ'}</h2>
        <p><strong>1. ${isEn ? 'Teacher' : 'Giáo viên'}:</strong> ${fp.materials?.teacher?.join('; ') || ''}</p>
        <p><strong>2. ${isEn ? 'Pupils' : 'Học sinh'}:</strong> ${fp.materials?.student?.join('; ') || ''}</p>

        <h2>${isEn ? 'III. TEACHING AND LEARNING ACTIVITIES (4 STAGES - MOET CV 2345)' : 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (THEO CÔNG VĂN 2345)'}</h2>
        <table class="activity-table">
          <thead>
            <tr>
              <th style="width: 50%;">${isEn ? "Teacher's Activities" : 'Hoạt động của Giáo viên'}</th>
              <th style="width: 50%;">${isEn ? "Pupils' Activities" : 'Hoạt động của Học sinh'}</th>
            </tr>
          </thead>
          <tbody>
            ${fp.activities?.map(act => `
              <tr>
                <td colspan="2" style="background-color: #f8fafc; font-weight: bold; color: #1e3a8a;">
                  ${act.name} (${act.duration})<br>
                  <span style="font-weight: normal; font-style: italic; font-size: 11pt;">${isEn ? 'Objective' : 'Mục tiêu'}: ${act.objective || act.description || ''}</span>
                </td>
              </tr>
              <tr>
                <td>${act.teacherActivity ? act.teacherActivity.replace(/\n/g, '<br>') : ''}</td>
                <td>${act.studentActivity ? act.studentActivity.replace(/\n/g, '<br>') : ''}</td>
              </tr>
            `).join('') || ''}
          </tbody>
        </table>

        <h2>${isEn ? 'IV. POST-LESSON ADJUSTMENTS' : 'IV. ĐIỀU CHỈNH SAU BÀI DẠY'}</h2>
        <p><strong>${isEn ? 'Assessment methods' : 'Phương pháp đánh giá'}:</strong> ${fp.assessment?.methods?.join('; ') || (isEn ? 'Observation and feedback during classroom activities.' : 'Quan sát, nhận xét quá trình học tập.')}</p>
        <p><strong>${isEn ? 'Differentiation & Support' : 'Dự kiến điều chỉnh / Hỗ trợ học sinh'}:</strong> ${typeof fp.postLessonAdjustments === 'object' ? fp.postLessonAdjustments?.supportMeasures || (isEn ? 'Provide extra guidance and flashcards for pupils needing support.' : 'Tăng cường kèm cặp học sinh còn lúng túng.') : fp.postLessonAdjustments || (isEn ? 'Monitor pupils’ progress continuously.' : 'Bám sát mức độ tiếp thu của học sinh.')}</p>
      </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Giao_An_${plan.subject}_${plan.grade}_${plan.unit.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportWarehouseBackup = () => {
    sounds.playCoin();
    const dataStr = JSON.stringify(warehousePlans, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SmartEdu_Kho_Giao_An_SaoLuu_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-[32px] p-6 border border-indigo-100 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-fredoka text-xl md:text-2xl font-black text-indigo-950 flex items-center gap-2">
                <span>Kho Lưu Trữ Giáo Án Chuẩn Hóa</span>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-200 font-sans">
                  {filteredPlans.length} Giáo án
                </span>
              </h2>
              <p className="text-xs text-gray-500 font-sans font-medium">
                Phân loại theo Môn học • Khối Lớp • Unit & Chủ điểm • Chuẩn Công văn 2345/BGDĐT & GDPT 2018
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Main Direct Upload to Warehouse Button */}
          <button
            onClick={() => {
              sounds.playCoin();
              setShowUploadModal(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-fredoka font-bold text-xs rounded-2xl shadow-md flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer ring-2 ring-emerald-400/30"
            title="Tải lên tệp Word (.docx), .json hoặc dán văn bản để lưu trữ vào kho giáo án"
          >
            <Upload className="w-4 h-4 text-emerald-200" />
            <span>Tải Giáo Án Lên Kho 📤</span>
          </button>

          {onOpenUploadTemplate && (
            <button
              onClick={() => {
                sounds.playCoin();
                onOpenUploadTemplate();
              }}
              className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-fredoka font-bold text-xs rounded-2xl shadow-xs flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
              title="Tải lên hoặc áp dụng kế hoạch bài dạy mẫu hoàn chỉnh vào trình soạn thảo"
            >
              <FileCheck className="w-4 h-4 text-indigo-600" />
              <span>Nạp Giáo Án Mẫu 📥</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              setShowCleanupModal(true);
            }}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-fredoka font-bold text-xs rounded-2xl shadow-xs flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
            title="Dọn dẹp và xóa các kế hoạch dạy học cũ để lưu bản mới"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>Dọn Dẹp Kế Hoạch 🧹</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenCreateNew();
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-fredoka font-black text-xs md:text-sm rounded-2xl shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Soạn Giáo Án Mới ✨</span>
          </button>
        </div>
      </div>

      {/* Quick Upload Dropzone Banner */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsQuickDragging(true); }}
        onDragLeave={() => setIsQuickDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsQuickDragging(false);
          setShowUploadModal(true);
        }}
        className={`bg-gradient-to-r from-emerald-50 via-teal-50/50 to-indigo-50/50 rounded-2xl p-4 border transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
          isQuickDragging ? 'border-emerald-500 bg-emerald-100/70 shadow-lg ring-2 ring-emerald-400' : 'border-emerald-200/80 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
            <FileUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-fredoka font-bold text-sm text-emerald-950 flex items-center gap-2">
              <span>Thêm Giáo Án Vào Kho Lưu Trữ Chuẩn Hóa</span>
              <span className="bg-emerald-200/70 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                Word (.docx) • Text • JSON
              </span>
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Kéo thả tệp giáo án từ máy tính vào đây, hoặc click nút tải lên để hệ thống tự động bóc tách và lưu vào kho.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportWarehouseBackup}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 text-indigo-900 border border-indigo-200 font-fredoka font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Tải toàn bộ danh sách giáo án trong kho về máy tính dạng tệp JSON để sao lưu"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Sao Lưu Kho (.json)</span>
          </button>

          <button
            onClick={() => {
              sounds.playCoin();
              setShowUploadModal(true);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-200" />
            <span>Tải Lên Ngay 📤</span>
          </button>
        </div>
      </div>

      {/* Bulk selection action bar */}
      {selectedPlanIds.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-900 to-purple-950 text-white rounded-2xl p-4 shadow-xl border border-indigo-500/30 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="bg-amber-400 text-amber-950 text-xs font-fredoka font-black px-2.5 py-1 rounded-xl">
              Đã chọn {selectedPlanIds.length} giáo án
            </span>
            <button
              onClick={() => {
                if (selectedPlanIds.length === filteredPlans.length) {
                  setSelectedPlanIds([]);
                } else {
                  setSelectedPlanIds(filteredPlans.map(p => p.id));
                }
              }}
              className="text-xs text-indigo-200 hover:text-white underline font-medium cursor-pointer"
            >
              {selectedPlanIds.length === filteredPlans.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả trong trang'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBulkDeleteOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa {selectedPlanIds.length} giáo án đã chọn 🗑️</span>
            </button>
            <button
              onClick={() => setSelectedPlanIds([])}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-[28px] p-5 border border-indigo-50 shadow-md space-y-4">
        
        {/* Row 1: Search & Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search bar (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm giáo án theo tên bài, từ khóa, Unit, chủ điểm, từ vựng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-indigo-500 rounded-2xl text-xs font-medium font-sans transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Favorite filter */}
          <div className="md:col-span-3 flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setOnlyFavorites(!onlyFavorites);
              }}
              className={`w-full py-2.5 px-3 rounded-2xl text-xs font-fredoka font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                onlyFavorites 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
              <span>{onlyFavorites ? 'Đang lọc: Mục yêu thích ⭐' : 'Chỉ xem Yêu thích'}</span>
            </button>
          </div>

          {/* Sort order */}
          <div className="md:col-span-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-fredoka font-bold text-gray-700 outline-none w-full cursor-pointer"
              >
                <option value="newest">Mới nhất trước</option>
                <option value="oldest">Cũ nhất trước</option>
                <option value="name">Theo tên bài A-Z</option>
                <option value="unit">Theo thứ tự Unit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Deep Taxonomic Filtering by Subject, Grade, Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
          
          {/* 1. Môn học (Subject) */}
          <div className="space-y-1">
            <label className="text-[11px] font-fredoka font-extrabold text-gray-600 flex items-center gap-1">
              <span>📚 1. Môn học</span>
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedUnit('all'); // reset unit when subject changes
              }}
              className="w-full p-2.5 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-fredoka font-bold text-indigo-950 outline-none cursor-pointer"
            >
              <option value="all">🌟 Tất cả các môn</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* 2. Khối Lớp (Grade) */}
          <div className="space-y-1">
            <label className="text-[11px] font-fredoka font-extrabold text-gray-600 flex items-center gap-1">
              <span>🎒 2. Khối Lớp</span>
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setSelectedUnit('all');
              }}
              className="w-full p-2.5 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-fredoka font-bold text-indigo-950 outline-none cursor-pointer"
            >
              <option value="all">🌟 Tất cả khối lớp (1-5)</option>
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* 3. Unit / Chủ điểm */}
          <div className="space-y-1">
            <label className="text-[11px] font-fredoka font-extrabold text-gray-600 flex items-center gap-1">
              <span>📑 3. Unit / Chủ điểm ({availableUnits.length})</span>
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full p-2.5 bg-amber-50/50 hover:bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-fredoka font-bold text-amber-950 outline-none cursor-pointer"
            >
              <option value="all">🌟 Tất cả các Unit / Chủ đề</option>
              {availableUnits.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* 4. Bộ sách SGK */}
          <div className="space-y-1">
            <label className="text-[11px] font-fredoka font-extrabold text-gray-600 flex items-center gap-1">
              <span>📖 4. Bộ sách</span>
            </label>
            <select
              value={selectedBookSeries}
              onChange={(e) => setSelectedBookSeries(e.target.value)}
              className="w-full p-2.5 bg-purple-50/50 hover:bg-purple-50 border border-purple-100 rounded-xl text-xs font-fredoka font-bold text-purple-950 outline-none cursor-pointer"
            >
              <option value="all">🌟 Tất cả bộ sách SGK</option>
              {bookSeriesList.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Unit Chips for the selected subject/grade */}
        {availableUnits.length > 0 && selectedUnit === 'all' && (
          <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-gray-400 font-sans uppercase shrink-0">Unit nhanh:</span>
            {availableUnits.slice(0, 6).map(u => (
              <button
                key={u}
                onClick={() => {
                  sounds.playClick();
                  setSelectedUnit(u);
                }}
                className="px-2.5 py-1 bg-amber-100/70 hover:bg-amber-200 text-amber-900 text-[11px] font-fredoka font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer"
              >
                {u}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Grid of Lesson Plan Cards */}
      {filteredPlans.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 border-2 border-dashed border-gray-200 text-center space-y-4">
          <span className="text-5xl block">📭</span>
          <div className="space-y-1">
            <h3 className="font-fredoka text-lg font-black text-indigo-950">Chưa tìm thấy giáo án phù hợp</h3>
            <p className="text-xs text-gray-500 font-medium font-sans max-w-md mx-auto">
              Không có giáo án nào khớp với bộ lọc Môn: {selectedSubject}, Lớp: {selectedGrade}, Unit: {selectedUnit}. Hãy thử xóa bộ lọc hoặc soạn giáo án mới nhé cô ơi! 🐝
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedSubject('all');
              setSelectedGrade('all');
              setSelectedUnit('all');
              setSelectedBookSeries('all');
              setSearchQuery('');
              setOnlyFavorites(false);
            }}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-fredoka font-extrabold rounded-xl transition-all cursor-pointer"
          >
            Đặt lại tất cả bộ lọc ↺
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlans.map(plan => {
            const isEnglish = plan.subject === 'Tiếng Anh' || plan.fullPlan?.language === 'en';
            const activityCount = plan.fullPlan?.activities?.length || 4;
            const hasImages = plan.attachedImages && plan.attachedImages.length > 0;

            return (
              <div 
                key={plan.id}
                className="bg-white rounded-[28px] p-5 border border-indigo-50 hover:border-indigo-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Badge & Favorite Button */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPlanIds.includes(plan.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                          if (e.target.checked) {
                            setSelectedPlanIds(prev => [...prev, plan.id]);
                          } else {
                            setSelectedPlanIds(prev => prev.filter(id => id !== plan.id));
                          }
                        }}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        title="Chọn để xóa hoặc thao tác hàng loạt"
                      />
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[10px] font-fredoka font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          plan.subject === 'Tiếng Anh' 
                            ? 'bg-blue-100 text-blue-800' 
                            : plan.subject === 'Toán'
                            ? 'bg-red-100 text-red-800'
                            : plan.subject === 'Tiếng Việt'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {plan.subject}
                        </span>
                        <span className="text-[10px] font-fredoka font-black px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                          {plan.grade}
                        </span>
                        {plan.period && (
                          <span className="text-[10px] font-sans font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200/50">
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleFavorite(plan.id)}
                      className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                        plan.isFavorite 
                          ? 'text-amber-500 hover:text-amber-600 bg-amber-50' 
                          : 'text-gray-300 hover:text-amber-400 bg-gray-50'
                      }`}
                      title={plan.isFavorite ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
                    >
                      <Star className={`w-4 h-4 ${plan.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Unit */}
                  <div>
                    <div className="text-[11px] font-fredoka font-bold text-indigo-600 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{plan.unit}</span>
                      {plan.lesson && <span>• {plan.lesson}</span>}
                    </div>
                    <h3 className="font-fredoka text-base font-black text-indigo-950 group-hover:text-indigo-600 transition-colors mt-0.5 line-clamp-2">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Book Series & Duration info */}
                  <div className="text-[11px] text-gray-500 font-sans font-medium space-y-1">
                    <p className="flex items-center gap-1 text-gray-600">
                      <BookOpen className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span className="truncate">{plan.bookSeries} {plan.pageRange ? `(${plan.pageRange})` : ''}</span>
                    </p>
                    <p className="flex items-center gap-1 text-gray-400 text-[10px]">
                      <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                      <span>Thời lượng: {plan.duration} • {activityCount} hoạt động</span>
                    </p>
                  </div>

                  {/* Summary / Highlights */}
                  <p className="text-xs text-gray-600 font-sans line-clamp-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    {plan.summary || 'Kế hoạch bài dạy chuẩn cấu trúc 4 bước Công văn 2345, tích hợp năng lực số và học liệu trực quan.'}
                  </p>

                  {/* Image attachment indicator if present */}
                  {hasImages && (
                    <div className="flex items-center gap-1 text-[10px] font-fredoka font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-lg w-fit">
                      <ImageIcon className="w-3 h-3" />
                      <span>Đính kèm {plan.attachedImages?.length} ảnh SGK</span>
                    </div>
                  )}

                  {/* Tags */}
                  {plan.tags && plan.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {plan.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] font-sans font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setPreviewPlan(plan);
                      }}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-all cursor-pointer"
                      title="Xem chi tiết giáo án"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyMarkdown(plan)}
                      className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all cursor-pointer relative"
                      title="Sao chép nội dung"
                    >
                      {copiedId === plan.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleExportWord(plan)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all cursor-pointer"
                      title="Xuất tệp Word (.doc) chuẩn mẫu BGD"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPlanToDelete(plan)}
                      className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-xl transition-all cursor-pointer"
                      title="Xóa giáo án này khỏi kho"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playCoin();
                      onLoadPlanToEditor(plan);
                    }}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <span>Nạp vào Soạn ✏️</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal for Full Lesson Plan */}
      {previewPlan && (() => {
        const isEnModal = previewPlan.fullPlan?.language === 'en' || previewPlan.subject === 'Tiếng Anh';
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-fredoka font-extrabold px-2.5 py-0.5 bg-white/20 text-white rounded-full">
                    {previewPlan.subject} • {previewPlan.grade}
                  </span>
                  <span className="text-[11px] font-fredoka font-extrabold px-2.5 py-0.5 bg-amber-400 text-amber-950 rounded-full">
                    {previewPlan.unit}
                  </span>
                  <span className="text-[11px] font-sans font-semibold text-indigo-200">
                    {previewPlan.period}
                  </span>
                </div>
                <h2 className="font-fredoka text-lg sm:text-xl font-black text-white">
                  {previewPlan.title}
                </h2>
                <p className="text-xs text-indigo-200 font-sans">
                  {previewPlan.bookSeries} {previewPlan.pageRange ? `(${previewPlan.pageRange})` : ''} • {previewPlan.duration}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportWord(previewPlan)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-fredoka font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isEnModal ? 'Export Word' : 'Xuất Word'}</span>
                </button>
                <button
                  onClick={() => setPreviewPlan(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-base font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-gray-800 font-sans text-sm">
              
              {/* Attached Images preview if any */}
              {previewPlan.attachedImages && previewPlan.attachedImages.length > 0 && (
                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 space-y-2">
                  <h4 className="font-fredoka text-xs font-black text-purple-950 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    <span>{isEnModal ? `Attached Textbook Illustrations (${previewPlan.attachedImages.length} images)` : `Hình ảnh SGK đính kèm (${previewPlan.attachedImages.length} ảnh)`}</span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {previewPlan.attachedImages.map(img => (
                      <div 
                        key={img.id}
                        onClick={() => setPreviewImage(img.dataUrl)}
                        className="w-20 h-24 rounded-xl border border-purple-200 overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer relative group bg-white"
                      >
                        <img 
                          src={img.dataUrl} 
                          alt={img.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold">
                          {isEnModal ? 'Zoom' : 'Phóng to'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section I: Objectives */}
              <div className="space-y-3 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100">
                <h3 className="font-fredoka text-sm font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>{isEnModal ? 'I. OBJECTIVES' : 'I. YÊU CẦU CẦN ĐẠT'}</span>
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <h5 className="font-fredoka font-bold text-indigo-900">
                      {isEnModal ? '1. Knowledge and Skills:' : '1. Năng lực đặc thù (Kiến thức & Kỹ năng):'}
                    </h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-1">
                      {previewPlan.fullPlan?.objectives?.knowledgeAndSkills?.map((k, i) => (
                        <li key={i}>{k}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-fredoka font-bold text-indigo-900">
                      {isEnModal ? '2. General Competencies:' : '2. Năng lực chung:'}
                    </h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-1">
                      {previewPlan.fullPlan?.objectives?.coreCompetencies?.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-fredoka font-bold text-indigo-900">
                      {isEnModal ? '3. Personal Qualities:' : '3. Phẩm chất chủ yếu:'}
                    </h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-1">
                      {previewPlan.fullPlan?.objectives?.personalQualities?.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section II: Materials */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                <h3 className="font-fredoka text-sm font-black text-indigo-950 uppercase tracking-wider">
                  {isEnModal ? 'II. TEACHING AIDS & MATERIALS' : 'II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU'}
                </h3>
                <p><strong>• {isEnModal ? 'Teacher:' : 'Giáo viên:'}</strong> {previewPlan.fullPlan?.materials?.teacher?.join('; ')}</p>
                <p><strong>• {isEnModal ? 'Pupils:' : 'Học sinh:'}</strong> {previewPlan.fullPlan?.materials?.student?.join('; ')}</p>
              </div>

              {/* Section III: 4-Step Teaching Activities */}
              <div className="space-y-3">
                <h3 className="font-fredoka text-sm font-black text-indigo-950 uppercase tracking-wider">
                  {isEnModal ? 'III. TEACHING AND LEARNING ACTIVITIES (4 STAGES - MOET CV 2345)' : 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (4 BƯỚC CV 2345)'}
                </h3>

                <div className="space-y-4">
                  {previewPlan.fullPlan?.activities?.map((act, index) => (
                    <div key={act.id || index} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-fredoka font-black text-xs text-indigo-950">
                          {act.name} ({act.duration})
                        </span>
                        <span className="text-[11px] text-gray-500 font-sans italic">
                          {isEnModal ? 'Objective: ' : 'Mục tiêu: '}{act.objective || act.description}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-xs p-3 gap-3 bg-white">
                        <div className="space-y-1">
                          <h6 className="font-fredoka font-extrabold text-indigo-800 text-[11px]">
                            {isEnModal ? "Teacher's Activities:" : "Hoạt động của Giáo viên:"}
                          </h6>
                          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {act.teacherActivity}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h6 className="font-fredoka font-extrabold text-emerald-800 text-[11px]">
                            {isEnModal ? "Pupils' Activities:" : "Hoạt động của Học sinh:"}
                          </h6>
                          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {act.studentActivity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section IV: Assessment & Adjustments */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 text-xs space-y-2">
                <h3 className="font-fredoka text-sm font-black text-amber-950 uppercase tracking-wider">
                  {isEnModal ? 'IV. POST-LESSON ADJUSTMENTS' : 'IV. ĐIỀU CHỈNH SAU BÀI DẠY'}
                </h3>
                <p>
                  <strong>• {isEnModal ? 'Assessment methods:' : 'Đánh giá định kỳ:'}</strong> {previewPlan.fullPlan?.assessment?.methods?.join(', ') || (isEnModal ? 'Observation and feedback.' : 'Quan sát và nhận xét quá trình học tập.')}
                </p>
                <p>
                  <strong>• {isEnModal ? 'Support for pupils needing assistance:' : 'Hỗ trợ học sinh cần nâng đỡ:'}</strong> {previewPlan.fullPlan?.differentiation?.needingSupport?.join('; ') || (isEnModal ? 'Provide extra guidance and visual cues.' : 'Kèm cặp và giao thêm flashcards gợi nhớ.')}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewPlan(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-fredoka font-bold text-xs rounded-xl cursor-pointer"
              >
                {isEnModal ? 'Close' : 'Đóng'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    const scr = previewPlan.fullPlan?.teacherScript || generateTeacherScript(previewPlan.fullPlan, {
                      subject: previewPlan.subject,
                      grade: previewPlan.grade,
                      bookSeries: previewPlan.bookSeries
                    });
                    setCurrentScript(scr);
                    setScriptModalPlan(previewPlan);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                  title="Xem và nghe kịch bản lời dẫn, hiệu lệnh của giáo viên"
                >
                  <Mic className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{isEnModal ? 'Teacher Script 🎤' : 'Lời Dẫn Giáo Viên 🎤'}</span>
                </button>

                <button
                  onClick={() => handleCopyMarkdown(previewPlan)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isEnModal ? 'Copy' : 'Sao chép'}</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playCoin();
                    onLoadPlanToEditor(previewPlan);
                    setPreviewPlan(null);
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isEnModal ? 'Load to Editor ✏️' : 'Nạp vào Biên tập ✏️'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
        );
      })()}

      {/* Teacher Script Modal */}
      {scriptModalPlan && currentScript && (
        <TeacherScriptModal
          isOpen={!!scriptModalPlan}
          onClose={() => {
            setScriptModalPlan(null);
            setCurrentScript(null);
          }}
          script={currentScript}
          onUpdateScript={(updated) => {
            setCurrentScript(updated);
          }}
          sounds={sounds}
        />
      )}

      {/* Cleanup & Delete Old Plans Modal */}
      {showCleanupModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn text-left">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-red-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-fredoka text-base font-black text-gray-900">
                    Dọn Dẹp & Xóa Kế Hoạch Dạy Học Cũ 🧹
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Chọn phương thức xóa để giải phóng kho và lưu các bản mới
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCleanupModal(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Option 1: Delete Filtered */}
              <button
                onClick={() => {
                  if (filteredPlans.length === 0) {
                    alert('Không có giáo án nào trong bộ lọc hiện tại để xóa.');
                    return;
                  }
                  if (window.confirm(`Thầy cô có chắc chắn muốn xóa toàn bộ ${filteredPlans.length} giáo án đang hiển thị trong bộ lọc này không?`)) {
                    const idsToDelete = filteredPlans.map(p => p.id);
                    if (onDeleteMultiplePlans) {
                      onDeleteMultiplePlans(idsToDelete);
                    } else {
                      idsToDelete.forEach(id => onDeletePlan(id));
                    }
                    setShowCleanupModal(false);
                    sounds.playLevelUp();
                  }
                }}
                className="w-full p-3.5 rounded-2xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-left transition-all cursor-pointer flex items-start gap-3 group"
              >
                <span className="text-xl">📑</span>
                <div className="flex-1">
                  <h4 className="font-fredoka font-bold text-amber-950 text-xs group-hover:text-amber-900">
                    1. Xóa các giáo án theo bộ lọc đang xem ({filteredPlans.length} bản ghi)
                  </h4>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">
                    Xóa các bài thuộc Môn: <strong>{selectedSubject}</strong>, Lớp: <strong>{selectedGrade}</strong>, Unit: <strong>{selectedUnit}</strong>.
                  </p>
                </div>
              </button>

              {/* Option 2: Clear Entire Warehouse */}
              <button
                onClick={() => {
                  if (window.confirm('⚠️ CẢNH BÁO: Thầy cô có chắc chắn muốn xóa TOÀN BỘ tất cả giáo án trong kho để bắt đầu lưu các bản hoàn toàn mới? Hành động này không thể hoàn tác.')) {
                    if (onClearAllPlans) {
                      onClearAllPlans();
                    } else {
                      warehousePlans.forEach(p => onDeletePlan(p.id));
                    }
                    setShowCleanupModal(false);
                    sounds.playLevelUp();
                  }
                }}
                className="w-full p-3.5 rounded-2xl border border-red-200 bg-red-50/60 hover:bg-red-100/70 text-left transition-all cursor-pointer flex items-start gap-3 group"
              >
                <span className="text-xl">🗑️</span>
                <div className="flex-1">
                  <h4 className="font-fredoka font-bold text-red-950 text-xs group-hover:text-red-900">
                    2. Xóa TOÀN BỘ kho giáo án cũ (Xóa sạch {warehousePlans.length} bài)
                  </h4>
                  <p className="text-[11px] text-red-700/80 mt-0.5">
                    Làm trống hoàn toàn bộ nhớ để chuẩn bị lưu các bản kế hoạch bài dạy mới tạo.
                  </p>
                </div>
              </button>

              {/* Option 3: Reset to Standard Template Warehouse */}
              {onResetToDefault && (
                <button
                  onClick={() => {
                    if (window.confirm('Khôi phục lại kho giáo án mẫu chuẩn ban đầu (gồm các bài mẫu chuẩn Global Success, Toán, Tiếng Việt)?')) {
                      onResetToDefault();
                      setShowCleanupModal(false);
                      sounds.playLevelUp();
                    }
                  }}
                  className="w-full p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-left transition-all cursor-pointer flex items-start gap-3 group"
                >
                  <span className="text-xl">↺</span>
                  <div className="flex-1">
                    <h4 className="font-fredoka font-bold text-indigo-950 text-xs group-hover:text-indigo-900">
                      3. Khôi phục lại kho Giáo án Mẫu Chuẩn mặc định
                    </h4>
                    <p className="text-[11px] text-indigo-700/80 mt-0.5">
                      Tải lại bộ giáo án mẫu chuẩn bộ GD&ĐT (CV 2345, QĐ 2422, CV 3456).
                    </p>
                  </div>
                </button>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCleanupModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold text-xs rounded-xl cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload & Store To Warehouse Modal */}
      {showUploadModal && (
        <UploadLessonToWarehouseModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          existingPlansCount={warehousePlans.length}
          onSaveToWarehouse={(plan) => {
            if (onSavePlanToWarehouse) {
              onSavePlanToWarehouse(plan);
            }
          }}
          onSaveAndOpenEditor={(plan) => {
            if (onSavePlanToWarehouse) {
              onSavePlanToWarehouse(plan);
            }
            onLoadPlanToEditor(plan);
          }}
          onImportMultiplePlans={(plans) => {
            if (onImportMultiplePlans) {
              onImportMultiplePlans(plans);
            } else if (onSavePlanToWarehouse) {
              plans.forEach(p => onSavePlanToWarehouse(p));
            }
          }}
          sounds={sounds}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-fredoka font-bold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Single Plan Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!planToDelete}
        onClose={() => setPlanToDelete(null)}
        title="Xác nhận xóa giáo án"
        itemName={planToDelete?.title}
        description="Thầy cô có chắc chắn muốn xóa giáo án này khỏi Kho Lưu Trữ không? Sau khi xóa, giáo án sẽ không còn xuất hiện trong kho."
        confirmText="Xác nhận xóa 🗑️"
        cancelText="Giữ lại"
        onConfirm={() => {
          if (planToDelete) {
            sounds.playClick();
            onDeletePlan(planToDelete.id);
            showToast(`Đã xóa giáo án "${planToDelete.title}" khỏi Kho lưu trữ!`);
            setPlanToDelete(null);
          }
        }}
      />

      {/* Bulk Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        title="Xác nhận xóa hàng loạt"
        itemName={`${selectedPlanIds.length} giáo án đang chọn`}
        description={`Thầy cô có chắc chắn muốn xóa toàn bộ ${selectedPlanIds.length} giáo án đã chọn khỏi Kho Lưu Trữ không?`}
        confirmText={`Xóa ${selectedPlanIds.length} giáo án 🗑️`}
        cancelText="Hủy bỏ"
        onConfirm={() => {
          sounds.playLevelUp();
          if (onDeleteMultiplePlans) {
            onDeleteMultiplePlans(selectedPlanIds);
          } else {
            selectedPlanIds.forEach(id => onDeletePlan(id));
          }
          showToast(`Đã xóa thành công ${selectedPlanIds.length} giáo án khỏi kho!`);
          setSelectedPlanIds([]);
          setIsBulkDeleteOpen(false);
        }}
      />

      {/* Enlarged Image Lightbox */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh]">
            <img 
              src={previewImage} 
              alt="Textbook Page Preview" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" 
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-bold">
              Nhấn để đóng ✕
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
