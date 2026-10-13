/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import mammoth from 'mammoth';
import { 
  FolderArchive, Upload, Plus, FileText, Check, Trash2, Eye, 
  Download, Printer, Copy, Star, RefreshCw, Layers, Sparkles, 
  BookOpen, CheckCircle2, AlertCircle, ArrowRight, Save, Edit3,
  Calendar, Award, Globe, Cpu, ShieldAlert, HeartHandshake,
  Compass, Search, Filter, Share2, FileSpreadsheet, X, HelpCircle,
  ChevronRight, BookCheck, CheckSquare
} from 'lucide-react';
import { sounds } from '../lib/audio';
import { 
  PersonalAppendix2Plan,
  getPersonalAppendix2Plans,
  saveOrUpdatePersonalPlan,
  deletePersonalPlan,
  setActivePersonalAppendix2,
  createPersonalPlanFromBaseline,
  parsePastedTextToAppendix2,
  getOrCreateActivePlanForSubjectAndGrade,
  ALL_PRIMARY_SUBJECTS,
  ALL_PRIMARY_GRADES,
  ALL_BOOK_SERIES,
  SUBJECT_METADATA
} from '../data/personalAppendix2Manager';
import { exportCurriculumPlanToWord } from '../utils/exportCurriculumWord';
import { SubjectCurriculumWeekDetailed, CurriculumPeriod, normalizeGrade } from '../data/full35WeeksCurriculum';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface PersonalAppendix2ManagerProps {
  onNavigateToPlanner?: (params: {
    subject: string;
    grade: string;
    week?: number;
    periodIdx?: number | null;
    lessonTitle?: string;
    periodLabel?: string;
    unitCode?: string;
    theme?: string;
    detailedContent?: string;
    vocab?: string[];
    patterns?: string[];
    adjustment?: {
      ai?: string;
      atgt_kns?: string;
      nls?: string;
      devices?: string;
    };
  }) => void;
  onOpenDictionary?: () => void;
}

export default function PersonalAppendix2Manager({
  onNavigateToPlanner,
  onOpenDictionary
}: PersonalAppendix2ManagerProps) {
  const [plans, setPlans] = useState<PersonalAppendix2Plan[]>(() => getPersonalAppendix2Plans());
  const [activeTab, setActiveTab] = useState<'matrix_view' | 'list' | 'upload' | 'create_baseline'>('matrix_view');
  
  // Selected Grade & Subject for rapid switching
  const [selectedGrade, setSelectedGrade] = useState<string>('Lớp 3');
  const [selectedSubject, setSelectedSubject] = useState<string>('Tiếng Anh');
  
  // Semester filter & search in matrix
  const [semesterFilter, setSemesterFilter] = useState<'all' | '1' | '2'>('all');
  const [matrixSearch, setMatrixSearch] = useState<string>('');

  // Global search & filter for List tab
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Creation state
  const [newSubject, setNewSubject] = useState<string>('Tiếng Anh');
  const [newGrade, setNewGrade] = useState<string>('Lớp 3');
  const [newBookSeries, setNewBookSeries] = useState<string>('Global Success - Bộ Giáo dục và Đào tạo (NXBGDVN)');
  const [newTeacherName, setNewTeacherName] = useState<string>('Thầy/Cô Giáo');
  const [newSchoolName, setNewSchoolName] = useState<string>('Trường Tiểu học Chuẩn Quốc Gia');
  const [newAcademicYear, setNewAcademicYear] = useState<string>('2024 - 2025');
  const [newPlanTitle, setNewPlanTitle] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSubject, setUploadSubject] = useState<string>('Tiếng Anh');
  const [uploadGrade, setUploadGrade] = useState<string>('Lớp 3');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [pasteText, setPasteText] = useState<string>('');
  const [isProcessingUpload, setIsProcessingUpload] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Period editor modal
  const [editingPeriod, setEditingPeriod] = useState<{
    weekIdx: number;
    periodIdx: number;
    period: CurriculumPeriod;
  } | null>(null);

  // Delete modal state
  const [planToDelete, setPlanToDelete] = useState<PersonalAppendix2Plan | null>(null);

  // Toast / notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync upload/create defaults when selected grade/subject changes
  useEffect(() => {
    setUploadSubject(selectedSubject);
    setUploadGrade(selectedGrade);
    setNewSubject(selectedSubject);
    setNewGrade(selectedGrade);
  }, [selectedSubject, selectedGrade]);

  // Current active plan for selected grade & subject
  const currentPlan = useMemo(() => {
    const normG = normalizeGrade(selectedGrade);
    const matched = plans.find(p => p.isActive && p.subject.toLowerCase() === selectedSubject.toLowerCase() && normalizeGrade(p.grade) === normG);
    if (matched) return matched;

    const anyMatched = plans.find(p => p.subject.toLowerCase() === selectedSubject.toLowerCase() && normalizeGrade(p.grade) === normG);
    if (anyMatched) return anyMatched;

    // Return first plan or fallback
    return plans[0] || null;
  }, [plans, selectedGrade, selectedSubject]);

  // Filtered weeks for matrix view
  const filteredWeeks = useMemo(() => {
    if (!currentPlan) return [];
    return currentPlan.weeks.filter(w => {
      if (semesterFilter === '1' && w.week > 18) return false;
      if (semesterFilter === '2' && w.week <= 18) return false;
      if (matrixSearch.trim()) {
        const q = matrixSearch.toLowerCase();
        const matchTitle = w.lessonTitle?.toLowerCase().includes(q);
        const matchTopic = w.theme?.toLowerCase().includes(q);
        const matchKnowledge = w.keyKnowledge?.toLowerCase().includes(q);
        const matchPeriod = w.periods?.some(p => 
          p.lessonTitle?.toLowerCase().includes(q) || 
          p.keyFocus?.toLowerCase().includes(q) ||
          p.integratedCV2345?.digitalCompetence?.toLowerCase().includes(q) ||
          p.integratedCV2345?.aiLiteracy?.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchTopic && !matchKnowledge && !matchPeriod) return false;
      }
      return true;
    });
  }, [currentPlan, semesterFilter, matrixSearch]);

  // Filtered plans list for List tab
  const filteredPlans = useMemo(() => {
    return plans.filter(p => {
      if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;
      if (selectedGrade !== 'all' && p.grade !== selectedGrade) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTeacher = p.teacherName.toLowerCase().includes(q);
        const matchSchool = p.schoolName.toLowerCase().includes(q);
        const matchSubject = p.subject.toLowerCase().includes(q);
        if (!matchTitle && !matchTeacher && !matchSchool && !matchSubject) return false;
      }
      return true;
    });
  }, [plans, selectedSubject, selectedGrade, searchQuery]);

  // Handlers
  const handleSelectGradeAndSubject = (grade: string, subject: string) => {
    sounds.playClick();
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    
    // Check if plan exists; if not, create baseline automatically
    const plan = getOrCreateActivePlanForSubjectAndGrade(subject, grade);
    setPlans(getPersonalAppendix2Plans());
  };

  const handleToggleActive = (planId: string) => {
    sounds.playClick();
    const updated = setActivePersonalAppendix2(planId);
    setPlans(updated);
    showToast('Đã kích hoạt Kế hoạch Phụ lục 2! Giáo án soạn mới sẽ tự động tích hợp theo bản này.');
  };

  const handleDeletePlan = (planId: string) => {
    sounds.playClick();
    const updated = deletePersonalPlan(planId);
    setPlans(updated);
    showToast('Đã xóa bản kế hoạch.');
  };

  const handleCreateFromBaseline = () => {
    sounds.playClick();
    const created = createPersonalPlanFromBaseline({
      title: newPlanTitle || `Kế hoạch dạy học ${newSubject} ${newGrade} - ${newTeacherName}`,
      teacherName: newTeacherName,
      schoolName: newSchoolName,
      academicYear: newAcademicYear,
      subject: newSubject,
      grade: newGrade,
      bookSeries: newBookSeries,
      notes: newNotes,
      setActive: true
    });
    const updated = getPersonalAppendix2Plans();
    setPlans(updated);
    setSelectedSubject(newSubject);
    setSelectedGrade(newGrade);
    setActiveTab('matrix_view');
    showToast(`Đã tạo thành công Kế hoạch Phụ lục 2 cho môn ${newSubject} ${newGrade}!`);
  };

  const handleProcessUpload = async () => {
    setIsProcessingUpload(true);
    sounds.playClick();
    try {
      if (uploadedFile) {
        let extractedText = '';
        const fileName = uploadedFile.name;

        if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
          // Extract Word .docx using mammoth
          try {
            const arrayBuffer = await uploadedFile.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            extractedText = result.value || '';
          } catch (docErr) {
            console.warn('Mammoth extraction failed, falling back to text:', docErr);
            extractedText = await uploadedFile.text();
          }
        } else if (fileName.endsWith('.json')) {
          const jsonText = await uploadedFile.text();
          const parsed = JSON.parse(jsonText);
          const createdPlan: PersonalAppendix2Plan = {
            ...parsed,
            id: `app2_json_${Date.now()}`,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          saveOrUpdatePersonalPlan(createdPlan);
          const updated = getPersonalAppendix2Plans();
          setPlans(updated);
          setSelectedSubject(createdPlan.subject);
          setSelectedGrade(createdPlan.grade);
          setActiveTab('matrix_view');
          showToast(`Đã tải lên và nạp thành công phân phối 35 tuần từ file "${fileName}"!`);
          return;
        } else {
          // Plain text, csv, or table text
          extractedText = await uploadedFile.text();
        }

        const createdPlan = parsePastedTextToAppendix2(extractedText, uploadSubject, uploadGrade, {
          title: uploadTitle || fileName.replace(/\.[^/.]+$/, ""),
          teacherName: newTeacherName,
          schoolName: newSchoolName,
          academicYear: newAcademicYear,
          fileName: fileName
        });
        
        const updated = getPersonalAppendix2Plans();
        setPlans(updated);
        setSelectedSubject(uploadSubject);
        setSelectedGrade(uploadGrade);
        setActiveTab('matrix_view');
        showToast(`Đã tải lên và nạp thành công phân phối 35 tuần từ file Word "${fileName}"!`);
      } else if (pasteText.trim()) {
        const createdPlan = parsePastedTextToAppendix2(pasteText, uploadSubject, uploadGrade, {
          title: uploadTitle || `Kế hoạch dạy học ${uploadSubject} ${uploadGrade} (Nhập bảng cá nhân)`,
          teacherName: newTeacherName,
          schoolName: newSchoolName,
          academicYear: newAcademicYear
        });
        const updated = getPersonalAppendix2Plans();
        setPlans(updated);
        setSelectedSubject(uploadSubject);
        setSelectedGrade(uploadGrade);
        setActiveTab('matrix_view');
        showToast('Đã phân tích bảng phân phối thành công!');
      } else {
        alert('Vui lòng chọn tệp Word/Excel hoặc dán nội dung bảng phân phối chương trình!');
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi khi phân tích tệp. Vui lòng kiểm tra lại định dạng tệp!');
    } finally {
      setIsProcessingUpload(false);
      setUploadedFile(null);
      setPasteText('');
    }
  };

  const handleExportWord = (plan: PersonalAppendix2Plan) => {
    sounds.playClick();
    try {
      exportCurriculumPlanToWord({
        subject: plan.subject,
        grade: plan.grade,
        schoolName: plan.schoolName,
        teacherName: plan.teacherName,
        academicYear: plan.academicYear,
        weeks: plan.weeks,
        totalPeriods: plan.totalPeriods
      });
      showToast('Đã tải xuống tệp Word (.doc) Phụ lục 2 chuẩn Nghị định 30!');
    } catch (err) {
      console.error(err);
      alert('Lỗi xuất tệp Word. Vui lòng thử lại.');
    }
  };

  const handleSavePeriodEdit = () => {
    if (!editingPeriod || !currentPlan) return;
    sounds.playClick();

    const cloned = JSON.parse(JSON.stringify(currentPlan)) as PersonalAppendix2Plan;
    if (cloned.weeks[editingPeriod.weekIdx]?.periods[editingPeriod.periodIdx]) {
      cloned.weeks[editingPeriod.weekIdx].periods[editingPeriod.periodIdx] = editingPeriod.period;
      const updated = saveOrUpdatePersonalPlan(cloned);
      setPlans(updated);
      setEditingPeriod(null);
      showToast('Đã lưu thay đổi cho tiết dạy!');
    }
  };

  const handleLaunchPlannerForPeriod = (weekNum: number, pIdx: number, p: CurriculumPeriod, w: SubjectCurriculumWeekDetailed) => {
    sounds.playClick();
    if (onNavigateToPlanner && currentPlan) {
      onNavigateToPlanner({
        subject: currentPlan.subject,
        grade: currentPlan.grade,
        week: weekNum,
        periodIdx: pIdx,
        lessonTitle: p.lessonTitle || p.lessonPart || w.lessonTitle,
        periodLabel: p.periodLabel,
        unitCode: p.unitCode || w.unitCode,
        theme: p.theme || w.theme,
        detailedContent: p.scope,
        vocab: p.vocab || w.keyVocabulary,
        patterns: p.patterns || w.sentencePatternsOrRules,
        adjustment: {
          ai: p.integratedCV2345?.aiLiteracy,
          nls: p.integratedCV2345?.digitalCompetence,
          atgt_kns: [p.integratedCV2345?.trafficSafety, p.integratedCV2345?.lifeSkills].filter(Boolean).join(' | '),
          devices: 'SGK, Flashcards, Thiết bị trình chiếu TV/Màn hình tương tác, Loa bluetooth'
        }
      });
    }
  };

  // Applicable subjects for the selected grade
  const applicableSubjects = useMemo(() => {
    return ALL_PRIMARY_SUBJECTS.filter(subj => {
      const meta = SUBJECT_METADATA[subj];
      if (!meta) return true;
      return meta.applicableGrades.includes(selectedGrade);
    });
  }, [selectedGrade]);

  return (
    <div className="flex flex-col gap-5 w-full max-w-7xl mx-auto pb-16 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-emerald-200" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-indigo-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/30 backdrop-blur-md rounded-full text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-300/30">
              <FolderArchive className="w-3.5 h-3.5" />
              Kho Kế Hoạch Dạy Học Phụ Lục 2 (Tất Cả Các Môn Tiểu Học)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Quản Lý Phụ Lục 2 Theo Khối & Môn Học
            </h1>
            <p className="text-emerald-100 text-sm md:text-base max-w-3xl leading-relaxed">
              Chọn khối lớp và môn học của học sinh tiểu học để tải lên kế hoạch dạy học của bạn hoặc sử dụng phân phối 35 tuần chuẩn. Khi bấm <strong className="text-yellow-300">"Soạn KHBD"</strong>, kế hoạch bài dạy sẽ bám sát 100% từng tiết dạy, mục tiêu và địa chỉ tích hợp NLS, AI, KNS!
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => { sounds.playClick(); setActiveTab('upload'); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Tải Lên File Word (.docx)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveTab('create_baseline'); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-sm backdrop-blur-md border border-white/30 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tạo Mới 35 Tuần
            </button>
          </div>
        </div>
      </div>

      {/* CORE SELECTOR: KHỐI LỚP (GRADE) & MÔN HỌC (SUBJECT) */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200/80 space-y-4">
        {/* Step 1: Grade Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>1. Chọn Khối Lớp Tiểu Học:</span>
            </label>
            <span className="text-xs text-gray-500 font-medium">Khối đang chọn: <strong className="text-emerald-700">{selectedGrade}</strong></span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {ALL_PRIMARY_GRADES.map(grade => {
              const isSelected = selectedGrade === grade;
              const gradePlans = plans.filter(p => normalizeGrade(p.grade) === normalizeGrade(grade));
              return (
                <button
                  key={grade}
                  onClick={() => handleSelectGradeAndSubject(grade, selectedSubject)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400/40 scale-[1.02]'
                      : 'bg-gray-50 hover:bg-emerald-50/60 text-gray-800 border-gray-200'
                  }`}
                >
                  <span className="text-sm font-bold">{grade}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-gray-200/80 text-gray-600'
                  }`}>
                    {gradePlans.length} kế hoạch
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Subject Selector */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>2. Chọn Môn Học Của {selectedGrade}:</span>
            </label>
            <span className="text-xs text-gray-500 font-medium">Môn đang chọn: <strong className="text-indigo-700">{selectedSubject}</strong></span>
          </div>

          <div className="flex flex-wrap gap-2">
            {applicableSubjects.map(subject => {
              const isSelected = selectedSubject === subject;
              const meta = SUBJECT_METADATA[subject] || { icon: '📚', color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' };
              const plan = plans.find(p => p.subject === subject && normalizeGrade(p.grade) === normalizeGrade(selectedGrade));
              const isCustomUploaded = plan && plan.sourceType !== 'system_baseline';

              return (
                <button
                  key={subject}
                  onClick={() => handleSelectGradeAndSubject(selectedGrade, subject)}
                  className={`px-3.5 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-700 text-white border-indigo-800 shadow-md ring-2 ring-indigo-400/40 scale-[1.02]'
                      : `${meta.bg} ${meta.color} hover:shadow-xs`
                  }`}
                >
                  <span className="text-base">{meta.icon}</span>
                  <span>{subject}</span>
                  {isCustomUploaded && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${isSelected ? 'bg-amber-400 text-amber-950' : 'bg-emerald-600 text-white'}`}>
                      Đã tải lên
                    </span>
                  )}
                  {plan?.isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Đang kích hoạt" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('matrix_view'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'matrix_view'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Ma Trận 35 Tuần: {selectedSubject} {selectedGrade}
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('upload'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            Tải Lên File Word/Excel Môn Này
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('list'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            Kho Tất Cả Bản Kế Hoạch ({plans.length})
          </button>
        </div>

        {/* Quick Word export & launch planner */}
        {currentPlan && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExportWord(currentPlan)}
              className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Xuất tệp Word (.doc) Phụ lục 2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Word (.doc)</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                if (onNavigateToPlanner && currentPlan) {
                  onNavigateToPlanner({
                    subject: currentPlan.subject,
                    grade: currentPlan.grade,
                    week: 1,
                    periodIdx: 0
                  });
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Soạn KHBD Tuần 1</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: 35-WEEK MATRIX TABLE VIEW */}
      {activeTab === 'matrix_view' && currentPlan && (
        <div className="space-y-4">
          {/* Plan Header Info Box */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>{SUBJECT_METADATA[currentPlan.subject]?.icon || '📖'}</span>
                  <span>{currentPlan.subject} - {currentPlan.grade}</span>
                </span>
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-xs font-semibold">
                  {currentPlan.totalWeeks} Tuần ({currentPlan.totalPeriods} Tiết)
                </span>
                {currentPlan.sourceType === 'uploaded_file' && (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Upload className="w-3 h-3 text-amber-700" />
                    <span>Nguồn tệp tải lên: {currentPlan.fileName || 'Tệp cá nhân'}</span>
                  </span>
                )}
                {currentPlan.isActive ? (
                  <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đang kích hoạt áp dụng cho Kế hoạch bài dạy
                  </span>
                ) : (
                  <button
                    onClick={() => handleToggleActive(currentPlan.id)}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-800 rounded-full text-xs font-bold border border-gray-200 transition-all cursor-pointer"
                  >
                    Kích hoạt bản này
                  </button>
                )}
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">{currentPlan.title}</h2>
              <p className="text-xs text-gray-500">
                🏫 {currentPlan.schoolName} | 👤 {currentPlan.teacherName} | 📅 Năm học {currentPlan.academicYear} | 📚 {currentPlan.bookSeries}
              </p>
            </div>

            {/* Matrix Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="inline-flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setSemesterFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    semesterFilter === 'all' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Tất cả 35 tuần
                </button>
                <button
                  onClick={() => setSemesterFilter('1')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    semesterFilter === '1' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Học kì 1 (Tuần 1-18)
                </button>
                <button
                  onClick={() => setSemesterFilter('2')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    semesterFilter === '2' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Học kì 2 (Tuần 19-35)
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Lọc bài học / từ khóa..."
                  value={matrixSearch}
                  onChange={(e) => setMatrixSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Full 35-Weeks Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
              <table className="w-full text-xs text-left border-collapse min-w-[1050px]">
                <thead className="bg-emerald-800 text-white font-bold sticky top-0 z-20 shadow-sm">
                  <tr>
                    <th className="p-3 text-center border border-emerald-700 w-12">STT</th>
                    <th className="p-3 text-center border border-emerald-700 w-20">Tuần</th>
                    <th className="p-3 text-center border border-emerald-700 w-16">Tiết</th>
                    <th className="p-3 border border-emerald-700 w-64">Tên bài học / Mạch nội dung</th>
                    <th className="p-3 border border-emerald-700 w-64">Yêu cầu cần đạt / Trọng tâm</th>
                    <th className="p-3 border border-emerald-700 w-64">Địa chỉ tích hợp (NLS, AI, KNS, ATGT)</th>
                    <th className="p-3 border border-emerald-700 w-44">Thiết bị & Học liệu</th>
                    <th className="p-3 text-center border border-emerald-700 w-28">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredWeeks.flatMap((w, wIdx) => 
                    w.periods.map((p, pIdx) => {
                      const globalIdx = currentPlan.weeks.slice(0, currentPlan.weeks.indexOf(w)).reduce((acc, prev) => acc + (prev.periods?.length || 0), 0) + pIdx + 1;
                      return (
                        <tr key={`${w.week}_${p.periodNumber}_${pIdx}`} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="p-2.5 text-center border border-gray-200 text-gray-500 font-semibold">{globalIdx}</td>
                          <td className="p-2.5 text-center border border-gray-200 font-bold text-emerald-800 bg-emerald-50/30">Tuần {w.week}</td>
                          <td className="p-2.5 text-center border border-gray-200 font-semibold text-gray-700">{p.periodLabel || `Tiết ${p.periodNumber}`}</td>
                          
                          <td className="p-2.5 border border-gray-200">
                            <div className="font-bold text-gray-900">{p.lessonTitle || p.lessonPart || w.lessonTitle}</div>
                            {p.scope && <div className="text-[11px] text-gray-500 mt-0.5">{p.scope}</div>}
                          </td>

                          <td className="p-2.5 border border-gray-200 text-gray-700">
                            <div>{p.keyFocus || w.keyKnowledge}</div>
                            {p.vocab && p.vocab.length > 0 && (
                              <div className="text-[11px] text-indigo-700 font-medium mt-1">
                                🔤 Từ vựng: {p.vocab.join(', ')}
                              </div>
                            )}
                          </td>

                          <td className="p-2.5 border border-gray-200 space-y-1">
                            {p.integratedCV2345?.digitalCompetence ? (
                              <div className="text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                                💻 <strong>NLS:</strong> {p.integratedCV2345.digitalCompetence}
                              </div>
                            ) : (
                              <div className="text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                                💻 <strong>NLS:</strong> Khai thác học liệu số sachmem.vn / hoclieu.vn.
                              </div>
                            )}

                            {p.integratedCV2345?.aiLiteracy && (
                              <div className="text-[11px] text-purple-800 bg-purple-50 p-1.5 rounded border border-purple-200">
                                🤖 <strong>AI:</strong> {p.integratedCV2345.aiLiteracy}
                              </div>
                            )}

                            {(p.integratedCV2345?.trafficSafety || p.integratedCV2345?.lifeSkills) && (
                              <div className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                                🚦 <strong>KNS/ATGT:</strong> {[p.integratedCV2345?.trafficSafety, p.integratedCV2345?.lifeSkills].filter(Boolean).join(' | ')}
                              </div>
                            )}
                          </td>

                          <td className="p-2.5 border border-gray-200 text-gray-600 text-[11px]">
                            SGK, Flashcards, Màn hình tương tác/TV, Loa Bluetooth
                          </td>

                          <td className="p-2.5 text-center border border-gray-200">
                            <div className="flex flex-col gap-1.5 items-center">
                              <button
                                onClick={() => handleLaunchPlannerForPeriod(w.week, pIdx, p, w)}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-xs transition-all w-full flex items-center justify-center gap-1 cursor-pointer hover:scale-[1.02]"
                                title="Soạn kế hoạch bài dạy bám sát chính xác tiết này"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Soạn KHBD</span>
                              </button>
                              <button
                                onClick={() => {
                                  sounds.playClick();
                                  setEditingPeriod({
                                    weekIdx: currentPlan.weeks.indexOf(w),
                                    periodIdx: pIdx,
                                    period: { ...p }
                                  });
                                }}
                                className="px-2 py-0.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded text-[10px] font-semibold transition-all cursor-pointer"
                              >
                                ✏️ Sửa tiết
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD WORD / EXCEL FILE */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600" />
              Tải Lên Kế Hoạch Dạy Học Phụ Lục 2 (Tệp Word / Excel)
            </h2>
            <p className="text-sm text-gray-500">
              Tải lên tệp Word (.docx, .doc), Excel (.xlsx, .csv) hoặc dán bảng phân phối chương trình của trường bạn. Hệ thống sẽ tự động trích xuất theo 35 tuần và các tiết dạy chuẩn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Môn học</label>
              <select
                value={uploadSubject}
                onChange={(e) => setUploadSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {ALL_PRIMARY_SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Khối lớp</label>
              <select
                value={uploadGrade}
                onChange={(e) => setUploadGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {ALL_PRIMARY_GRADES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tên bản kế hoạch</label>
              <input
                type="text"
                placeholder={`VD: Kế hoạch dạy học ${uploadSubject} ${uploadGrade} - Trường em`}
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700 uppercase">1. Tải lên tệp Word (.docx) / Excel (.xlsx) / JSON</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/70 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3"
            >
              <Upload className="w-10 h-10 text-emerald-600 mx-auto" />
              <div>
                <p className="font-bold text-gray-800 text-sm">
                  {uploadedFile ? `Tệp đã chọn: ${uploadedFile.name}` : 'Bấm vào đây để chọn tệp Word (.docx) hoặc kéo thả tệp vào ô này'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Định dạng hỗ trợ tối ưu: .docx, .doc, .xlsx, .csv, .json, .txt</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedFile(e.target.files[0]);
                  }
                }}
                accept=".docx,.doc,.xlsx,.xls,.csv,.json,.txt"
                className="hidden"
              />
            </div>
          </div>

          {/* Paste Table / Text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase">2. Hoặc Dán Bảng Phân Phối / Văn Bản Vào Đây</label>
            <textarea
              rows={6}
              placeholder="Dán nội dung bảng phân phối từ Word hoặc Excel vào đây (Ví dụ: Tuần 1 - Tiết 1: Unit 1 Lesson 1...)"
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-2xl text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setActiveTab('matrix_view')}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleProcessUpload}
              disabled={isProcessingUpload || (!uploadedFile && !pasteText.trim())}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              {isProcessingUpload ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Tiến Hành Phân Tích & Nạp Phụ Lục 2</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: LIST OF SAVED PLANS */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm môn, khối, trường..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Hiển thị <strong className="text-emerald-700">{filteredPlans.length}</strong> / {plans.length} bản kế hoạch
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map(plan => {
              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-2xl p-5 border transition-all relative flex flex-col justify-between shadow-sm hover:shadow-md ${
                    plan.isActive 
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Active Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                          {plan.subject}
                        </span>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-xs font-bold">
                          {plan.grade}
                        </span>
                      </div>

                      {plan.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đang Áp Dụng
                        </span>
                      ) : (
                        <button
                          onClick={() => handleToggleActive(plan.id)}
                          className="text-xs font-semibold text-gray-500 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-100 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                        >
                          Kích hoạt áp dụng
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span>🏫 {plan.schoolName}</span> • <span>👤 {plan.teacherName}</span>
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-gray-50 rounded-xl text-xs text-gray-600">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Quy mô:</span>
                        <strong className="text-gray-800 font-semibold">{plan.totalWeeks} tuần ({plan.totalPeriods} tiết)</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Năm học:</span>
                        <strong className="text-gray-800 font-semibold">{plan.academicYear}</strong>
                      </div>
                    </div>

                    {/* Note */}
                    {plan.notes && (
                      <p className="text-xs text-gray-500 line-clamp-2 italic bg-yellow-50/60 p-2 rounded-lg border border-yellow-100">
                        💬 {plan.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setSelectedGrade(plan.grade);
                          setSelectedSubject(plan.subject);
                          setActiveTab('matrix_view');
                        }}
                        className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer"
                        title="Xem chi tiết 35 tuần"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleExportWord(plan)}
                        className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                        title="Tải tệp Word (.doc)"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPlanToDelete(plan)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="Xóa bản kế hoạch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        if (!plan.isActive) {
                          setActivePersonalAppendix2(plan.id);
                          setPlans(getPersonalAppendix2Plans());
                        }
                        if (onNavigateToPlanner) {
                          onNavigateToPlanner({
                            subject: plan.subject,
                            grade: plan.grade,
                            week: 1,
                            periodIdx: 0
                          });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Soạn KHBD</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CREATE FROM BASELINE */}
      {activeTab === 'create_baseline' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              Tạo Kế Hoạch Phụ Lục 2 Mới Từ Khung Chuẩn 35 Tuần
            </h2>
            <p className="text-sm text-gray-500">
              Hệ thống sẽ nạp sẵn bộ khung 35 tuần chuẩn CTGDPT 2018 và Công văn 2345 cho môn học bạn chọn. Sau đó bạn có thể tùy ý sửa đổi từng tuần, từng tiết.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Môn học</label>
              <select
                value={newSubject}
                onChange={(e) => {
                  setNewSubject(e.target.value);
                  if (e.target.value === 'Tiếng Anh') {
                    setNewBookSeries('Global Success - Bộ Giáo dục và Đào tạo (NXBGDVN)');
                  } else {
                    setNewBookSeries('Kết nối tri thức với cuộc sống (NXBGDVN)');
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {ALL_PRIMARY_SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Khối lớp</label>
              <select
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {ALL_PRIMARY_GRADES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bộ sách giáo khoa</label>
              <select
                value={newBookSeries}
                onChange={(e) => setNewBookSeries(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {ALL_BOOK_SERIES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Họ và tên Giáo viên</label>
              <input
                type="text"
                placeholder="VD: Nguyễn Thị Thu Hà"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tên trường Tiểu học</label>
              <input
                type="text"
                placeholder="VD: Trường Tiểu học Chuẩn Quốc Gia"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Năm học</label>
              <input
                type="text"
                placeholder="VD: 2024 - 2025"
                value={newAcademicYear}
                onChange={(e) => setNewAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ghi chú bổ sung (Tùy chọn)</label>
            <input
              type="text"
              placeholder="VD: Kế hoạch điều chỉnh tích hợp thêm tiết thực hành STEM và Năng lực số"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setActiveTab('matrix_view')}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleCreateFromBaseline}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Khởi Tạo & Kích Hoạt Ngay</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PERIOD INTEGRATION DETAILS */}
      {editingPeriod && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs font-bold">
                  Tuần {editingPeriod.weekIdx + 1} - {editingPeriod.period.periodLabel || `Tiết ${editingPeriod.period.periodNumber}`}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Chỉnh Sửa Tiết Dạy & Địa Chỉ Tích Hợp</h3>
              </div>
              <button
                onClick={() => setEditingPeriod(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tên bài học / Tên tiết</label>
                <input
                  type="text"
                  value={editingPeriod.period.lessonTitle || editingPeriod.period.lessonPart || ''}
                  onChange={(e) => {
                    setEditingPeriod({
                      ...editingPeriod,
                      period: {
                        ...editingPeriod.period,
                        lessonTitle: e.target.value,
                        lessonPart: e.target.value
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phạm vi hoạt động (Scope)</label>
                <input
                  type="text"
                  value={editingPeriod.period.scope || ''}
                  onChange={(e) => {
                    setEditingPeriod({
                      ...editingPeriod,
                      period: {
                        ...editingPeriod.period,
                        scope: e.target.value
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Yêu cầu cần đạt / Trọng tâm (Key Focus)</label>
                <textarea
                  rows={2}
                  value={editingPeriod.period.keyFocus || ''}
                  onChange={(e) => {
                    setEditingPeriod({
                      ...editingPeriod,
                      period: {
                        ...editingPeriod.period,
                        keyFocus: e.target.value
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Năng Lực Số (NLS / TT 02/2025 & CV 3456)
                </label>
                <input
                  type="text"
                  placeholder="VD: 1.1.CB1a - Khai thác tài nguyên trên kho học liệu taphuan.nxbgd.vn"
                  value={editingPeriod.period.integratedCV2345?.digitalCompetence || ''}
                  onChange={(e) => {
                    setEditingPeriod({
                      ...editingPeriod,
                      period: {
                        ...editingPeriod.period,
                        integratedCV2345: {
                          ...editingPeriod.period.integratedCV2345,
                          digitalCompetence: e.target.value
                        }
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-800 uppercase mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Trí Tuệ Nhân Tạo (AI / QĐ 2422/QĐ-BGDĐT)
                </label>
                <input
                  type="text"
                  placeholder="VD: AI 1.C1.1: Sử dụng trợ lý giọng nói kiểm tra phát âm"
                  value={editingPeriod.period.integratedCV2345?.aiLiteracy || ''}
                  onChange={(e) => {
                    setEditingPeriod({
                      ...editingPeriod,
                      period: {
                        ...editingPeriod.period,
                        integratedCV2345: {
                          ...editingPeriod.period.integratedCV2345,
                          aiLiteracy: e.target.value
                        }
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-800 uppercase mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Kỹ Năng Sống (KNS) & An Toàn Giao Thông (ATGT)
                </label>
                <input
                  type="text"
                  placeholder="VD: KNS: Rèn luyện tính tự giác, lịch sự chào hỏi khi vào lớp"
                  value={editingPeriod.period.integratedCV2345?.lifeSkills || editingPeriod.period.integratedCV2345?.trafficSafety || ''}
                  onChange={(e) => {
                    setEditingPeriod({
                      ...editingPeriod,
                      period: {
                        ...editingPeriod.period,
                        integratedCV2345: {
                          ...editingPeriod.period.integratedCV2345,
                          lifeSkills: e.target.value,
                          trafficSafety: e.target.value
                        }
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2 bg-amber-50/50 border border-amber-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setEditingPeriod(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSavePeriodEdit}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Thay Đổi Tiết Dạy</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!planToDelete}
        onClose={() => setPlanToDelete(null)}
        title="Xác nhận xóa Kế hoạch Phụ lục 2"
        itemName={planToDelete?.title}
        description="Thầy cô có chắc chắn muốn xóa bản Kế hoạch dạy học Phụ lục 2 này không? Thao tác này sẽ xóa bản phân phối khỏi danh sách."
        confirmText="Xác nhận xóa 🗑️"
        cancelText="Giữ lại"
        onConfirm={() => {
          if (planToDelete) {
            handleDeletePlan(planToDelete.id);
            setPlanToDelete(null);
          }
        }}
      />
    </div>
  );
}
