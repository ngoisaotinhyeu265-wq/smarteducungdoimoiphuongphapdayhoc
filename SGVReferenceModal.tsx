/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, Search, ExternalLink, Sparkles, Check, Copy, 
  X, Filter, ChevronRight, Layers, Award, Gamepad2, 
  HelpCircle, Compass, ArrowRight, Zap, GraduationCap,
  Download, Eye, Lightbulb, Clock, Calendar, CheckCircle2,
  FileText, Bookmark, Share2, Info, LayoutGrid, ListFilter,
  ShieldCheck, Bot, HeartHandshake, Car
} from 'lucide-react';
import { sounds } from '../lib/audio';
import { 
  SGVLessonEntry, 
  PRIMARY_SUBJECTS_METADATA, 
  PRIMARY_GRADES_LIST, 
  getAllSGVLessons, 
  querySGVLessons 
} from '../data/sgvComprehensiveDatabase';

// Re-export SGVLessonEntry for compatibility
export type { SGVLessonEntry };

interface SGVReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToLessonPlan: (entry: SGVLessonEntry) => void;
  initialSubject?: string;
  initialGrade?: string;
  initialBook?: string;
}

export default function SGVReferenceModal({
  isOpen,
  onClose,
  onApplyToLessonPlan,
  initialSubject = 'Tiếng Anh',
  initialGrade = 'Lớp 3',
  initialBook = 'Global Success (NXB Giáo dục Việt Nam)'
}: SGVReferenceModalProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade);
  const [selectedSemester, setSelectedSemester] = useState<'all' | '1' | '2'>('all');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'period' | 'week'>('period'); // 'period': Phụ lục 2 theo từng tiết; 'week': Theo bài/tuần
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<SGVLessonEntry | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Update selection when initial props change
  useEffect(() => {
    if (initialSubject) setSelectedSubject(initialSubject);
    if (initialGrade) setSelectedGrade(initialGrade);
  }, [initialSubject, initialGrade, isOpen]);

  // Current subject metadata
  const currentSubjectMeta = useMemo(() => {
    return PRIMARY_SUBJECTS_METADATA.find(s => s.name === selectedSubject) || PRIMARY_SUBJECTS_METADATA[0];
  }, [selectedSubject]);

  // Query SGV entries based on filters and viewMode
  const filteredEntries = useMemo(() => {
    const sem = selectedSemester === '1' ? 1 : selectedSemester === '2' ? 2 : undefined;
    const wk = selectedWeek === 'all' ? undefined : Number(selectedWeek);

    return querySGVLessons({
      subject: selectedSubject === 'Tất cả' ? undefined : selectedSubject,
      grade: selectedGrade === 'Tất cả' ? undefined : selectedGrade,
      semester: sem,
      week: wk,
      viewMode: viewMode,
      searchQuery
    });
  }, [selectedSubject, selectedGrade, selectedSemester, selectedWeek, viewMode, searchQuery]);

  // Auto-select first item when filtered list changes if current selection is invalid
  useEffect(() => {
    if (filteredEntries.length > 0) {
      if (!selectedEntry || !filteredEntries.find(e => e.id === selectedEntry.id)) {
        setSelectedEntry(filteredEntries[0]);
      }
    } else {
      setSelectedEntry(null);
    }
  }, [filteredEntries]);

  if (!isOpen) return null;

  const handleCopyText = (text: string, sectionId: string) => {
    sounds.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleCopyFullSGV = () => {
    if (!selectedEntry) return;
    sounds.playCoin();
    const isPeriod = selectedEntry.entryType === 'period';
    const fullText = `[THAM CHIẾU SÁCH GIÁO VIÊN CHUẨN CTGDPT 2018 - taphuan.nxbgd.vn]
${isPeriod ? `[PHỤ LỤC 2 KẾ HOẠCH DẠY HỌC - TIẾT ${selectedEntry.periodNumber || selectedEntry.periodLabel}]` : '[TỔNG THỂ BÀI HỌC THEO TUẦN]'}
Môn học: ${selectedEntry.subject} - ${selectedEntry.grade} (${selectedEntry.bookSeries})
Bài dạy: ${selectedEntry.lessonName}
Chủ đề / Unit: ${selectedEntry.unit}
Thời lượng: ${selectedEntry.period}
Trang SGK: ${selectedEntry.pageRange}
${selectedEntry.vocab && selectedEntry.vocab.length > 0 ? `Từ vựng trọng tâm: ${selectedEntry.vocab.join(', ')}\n` : ''}${selectedEntry.patterns && selectedEntry.patterns.length > 0 ? `Mẫu câu / Quy tắc: ${selectedEntry.patterns.join(' / ')}\n` : ''}
I. YÊU CẦU CẦN ĐẠT (CHUẨN SGV):
1. Năng lực đặc thù (${selectedEntry.subject}):
${selectedEntry.objectives.specificCompetencies.map(c => `  + ${c}`).join('\n')}
2. Năng lực chung (CTGDPT 2018):
${selectedEntry.objectives.generalCompetencies.map(c => `  + ${c}`).join('\n')}
3. Phẩm chất chủ yếu:
${selectedEntry.objectives.qualities.map(c => `  + ${c}`).join('\n')}
${selectedEntry.integratedCV2345 ? `\n* TÍCH HỢP CV 2345 / CV 3456 / QĐ 2422:
- Năng lực số: ${selectedEntry.integratedCV2345.digitalCompetence || 'Khai thác học liệu số taphuan.nxbgd.vn'}
- AI: ${selectedEntry.integratedCV2345.aiLiteracy || 'Nhận biết AI an toàn'}
- ATGT & KNS: ${selectedEntry.integratedCV2345.trafficSafety || ''} | ${selectedEntry.integratedCV2345.lifeSkills || ''}\n` : ''}
II. TRÒ CHƠI KHỞI ĐỘNG CỤ THỂ: ${selectedEntry.warmUpGame.name}
- Mục tiêu: ${selectedEntry.warmUpGame.aims}
- Chuẩn bị: ${selectedEntry.warmUpGame.preparation}
- Luật chơi: ${selectedEntry.warmUpGame.rules.join('; ')}
- Câu hỏi thử thách & Đáp án:
${selectedEntry.warmUpGame.sampleQuestions.map((q, idx) => `  + Câu ${idx + 1}: ${q.question} -> Đáp án: ${q.answer}`).join('\n')}
- Lời dẫn dắt của Giáo viên: "${selectedEntry.warmUpGame.teacherScript}"

III. TIẾN TRÌNH KHÁM PHÁ KIẾN THỨC MỚI:
- Trọng tâm SGK: ${selectedEntry.exploration.textbookFocus}
- Hệ thống câu hỏi gợi mở của GV:
${selectedEntry.exploration.teacherQuestions.map(q => `  + ${q}`).join('\n')}
- Thao tác của HS:
${selectedEntry.exploration.studentActions.map(a => `  + ${a}`).join('\n')}
- Ghi nhớ / Quy tắc chốt bài: ${selectedEntry.exploration.keyTakeaway}

IV. LUYỆN TẬP & VẬN DỤNG:
- Bài tập SGK:
${selectedEntry.practice.exercises.map(ex => `  + ${ex.title} (${ex.form}) | Lỗi dễ mắc: ${ex.commonMistakes}`).join('\n')}
- Vận dụng thực tế đời sống: ${selectedEntry.application.realLifeScenario}
- Hướng dẫn thực hiện: ${selectedEntry.application.activityGuide}`;

    navigator.clipboard.writeText(fullText);
    setCopiedSection('full');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const totalPeriodsForSelected = currentSubjectMeta.totalPeriodsPerYear[selectedGrade] || 35;
  const periodsPerWeekForSelected = currentSubjectMeta.periodsPerWeek[selectedGrade] || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/65 backdrop-blur-md animate-fade-in text-gray-800">
      <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[32px] shadow-2xl border border-indigo-100 flex flex-col overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-900 p-4 md:p-5 text-white flex justify-between items-center relative overflow-hidden shadow-md shrink-0">
          <div className="space-y-1 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 text-white font-fredoka font-extrabold text-[10px] md:text-xs px-3 py-0.5 rounded-full uppercase tracking-wider">
                🏛️ NXB GIÁO DỤC VIỆT NAM • CTGDPT 2018
              </span>
              <span className="bg-amber-400 text-amber-950 text-[10px] md:text-xs font-fredoka font-extrabold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-800" />
                <span>Chia chi tiết từng bài & Phụ lục 2 KHDH</span>
              </span>
              <a
                href="https://taphuan.nxbgd.vn/tap-huan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white text-[10px] md:text-xs font-fredoka font-extrabold px-2.5 py-0.5 rounded-full transition-all border border-white/20"
              >
                <span>taphuan.nxbgd.vn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h2 className="text-lg md:text-2xl font-fredoka font-extrabold drop-shadow-sm flex items-center gap-2 pt-0.5">
              <BookOpen className="w-6 h-6 text-emerald-200 shrink-0" />
              <span>Tra Cứu Sách Giáo Viên (SGV) & Phân Phối Tiết Dạy Chuẩn</span>
            </h2>
            <p className="text-xs text-emerald-100 font-sans font-medium">
              Tra cứu chuẩn Yêu cầu cần đạt, trò chơi khởi động, câu hỏi gợi mở, bài tập và ghi nhớ theo từng tiết dạy Phụ lục 2 (Tiếng Anh 140/70 tiết) & 35 tuần tất cả các môn.
            </p>
          </div>

          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer relative z-10 shrink-0"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 bg-gray-50 border-b border-gray-200 space-y-2.5 shrink-0">
          
          {/* View Mode Toggle & Primary Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            
            {/* View Mode Switcher: Từng Tiết (Phụ lục 2) vs Theo Tuần/Bài */}
            <div className="flex items-center bg-gray-200/80 p-1 rounded-xl gap-1">
              <button
                onClick={() => { sounds.playClick(); setViewMode('period'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-fredoka font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'period'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-700 hover:text-indigo-900 hover:bg-white/50'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>🎯 Từng Tiết Dạy (Phụ lục 2 KHDH)</span>
              </button>

              <button
                onClick={() => { sounds.playClick(); setViewMode('week'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-fredoka font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'week'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-700 hover:text-indigo-900 hover:bg-white/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>📚 Theo Bài / Tuần Học (35 Tuần)</span>
              </button>
            </div>

            {/* Quick Stats Badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-gray-600 bg-white px-3 py-1 rounded-xl border border-gray-200 shadow-2xs">
              <span>{currentSubjectMeta.icon} {selectedSubject} - {selectedGrade}:</span>
              <span className="text-indigo-600 font-extrabold">
                {viewMode === 'period' ? `${totalPeriodsForSelected} tiết/năm (${periodsPerWeekForSelected} tiết/tuần)` : '35 tuần học'}
              </span>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tiết, bài học, từ vựng, trò chơi..."
                className="w-full pl-9 pr-7 py-1.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden shadow-2xs font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Secondary Filters: Subject, Grade, Semester, Week */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-200/60">
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Subject Select */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-gray-500 hidden sm:inline">Môn:</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => { sounds.playClick(); setSelectedSubject(e.target.value); }}
                  className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
                >
                  <option value="Tất cả">🌟 Tất cả Môn học (13 môn)</option>
                  {PRIMARY_SUBJECTS_METADATA.map(s => (
                    <option key={s.id} value={s.name}>
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade Select */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-gray-500 hidden sm:inline">Khối:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => { sounds.playClick(); setSelectedGrade(e.target.value); }}
                  className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
                >
                  <option value="Tất cả">Tất cả Khối (1-5)</option>
                  {PRIMARY_GRADES_LIST.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Semester Select */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-gray-500 hidden sm:inline">Kỳ:</span>
                <select
                  value={selectedSemester}
                  onChange={(e) => { sounds.playClick(); setSelectedSemester(e.target.value as any); }}
                  className="px-2 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Cả năm (35 tuần)</option>
                  <option value="1">Học kì I (Tuần 1-18)</option>
                  <option value="2">Học kì II (Tuần 19-35)</option>
                </select>
              </div>

              {/* Week Select */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-gray-500 hidden sm:inline">Tuần:</span>
                <select
                  value={selectedWeek}
                  onChange={(e) => { sounds.playClick(); setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value)); }}
                  className="px-2 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Tất cả tuần</option>
                  {Array.from({ length: 35 }, (_, i) => i + 1).map(w => (
                    <option key={w} value={w}>Tuần {w}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Quick Subject Category Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-thin max-w-full">
              {PRIMARY_SUBJECTS_METADATA.slice(0, 6).map(s => (
                <button
                  key={s.id}
                  onClick={() => { sounds.playClick(); setSelectedSubject(s.name); }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-fredoka font-bold whitespace-nowrap transition-all flex items-center gap-0.5 cursor-pointer ${
                    selectedSubject === s.name
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Modal Main Content (2 Columns: List on Left, Detail on Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left: Lessons / Periods List (4 cols) */}
          <div className="md:col-span-4 border-r border-gray-200 overflow-y-auto max-h-[62vh] p-2.5 space-y-2 bg-gray-50/50 text-left">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-fredoka font-extrabold text-gray-600 uppercase">
                {viewMode === 'period' ? `Danh sách tiết học (${filteredEntries.length})` : `Danh sách bài học (${filteredEntries.length})`}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {selectedSubject} • {selectedGrade}
              </span>
            </div>

            {filteredEntries.map((item) => {
              const isSelected = selectedEntry?.id === item.id;
              const isPeriod = item.entryType === 'period';

              return (
                <div
                  key={item.id}
                  onClick={() => { sounds.playClick(); setSelectedEntry(item); }}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                    isSelected 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-700 shadow-md transform scale-[1.01]' 
                      : 'bg-white text-gray-800 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-fredoka font-extrabold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {isPeriod && item.periodNumber ? `Tiết ${item.periodNumber}` : item.periodLabel || `Tuần ${item.week}`}
                    </span>
                    <span className={`text-[10px] font-bold ${
                      isSelected ? 'text-indigo-200' : 'text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200'
                    }`}>
                      Tuần {item.week}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold font-sans line-clamp-2 leading-snug">
                    {item.lessonName}
                  </h4>

                  {isPeriod && item.lessonPart && (
                    <div className={`text-[11px] font-medium line-clamp-1 mt-0.5 ${
                      isSelected ? 'text-indigo-100' : 'text-indigo-600'
                    }`}>
                      📍 {item.lessonPart}
                    </div>
                  )}

                  <p className={`text-[10px] line-clamp-1 mt-0.5 ${
                    isSelected ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    🎮 {item.warmUpGame.name}
                  </p>

                  <div className={`text-[10px] flex items-center justify-between mt-1 pt-1 border-t ${
                    isSelected ? 'border-indigo-500/50 text-indigo-200' : 'border-gray-100 text-gray-400'
                  }`}>
                    <span className="truncate max-w-[140px]">{item.pageRange}</span>
                    <span className="font-bold">{item.subject}</span>
                  </div>
                </div>
              );
            })}

            {filteredEntries.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-xs font-medium space-y-2 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="text-2xl">🔍</div>
                <div className="font-bold text-gray-700">Không tìm thấy bài học phù hợp</div>
                <p className="text-[11px] text-gray-500">
                  Thầy cô hãy thử đổi môn, đổi tuần hoặc xóa từ khóa tìm kiếm để xem danh mục nhé!
                </p>
                <button
                  onClick={() => {
                    setSelectedSubject('Tất cả');
                    setSelectedGrade('Tất cả');
                    setSelectedSemester('all');
                    setSelectedWeek('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Xem toàn bộ kho SGV
                </button>
              </div>
            )}
          </div>

          {/* Right: Detailed SGV View (8 cols) */}
          <div className="md:col-span-8 overflow-y-auto max-h-[62vh] p-4 md:p-5 space-y-5 text-left bg-white">
            {selectedEntry ? (
              <div className="space-y-5">
                
                {/* Header of selected entry */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-fredoka font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span>{PRIMARY_SUBJECTS_METADATA.find(s => s.name === selectedEntry.subject)?.icon || '📚'}</span>
                        <span>{selectedEntry.subject} - {selectedEntry.grade}</span>
                      </span>
                      
                      {selectedEntry.entryType === 'period' && (
                        <span className="text-[10px] text-purple-800 bg-purple-100 font-extrabold px-2 py-0.5 rounded-md border border-purple-200">
                          🎯 Phụ lục 2: Tiết {selectedEntry.periodNumber || selectedEntry.periodLabel}
                        </span>
                      )}

                      <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-2 py-0.5 rounded-md border border-indigo-100">
                        {selectedEntry.bookSeries}
                      </span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                        Tuần {selectedEntry.week} (Học kì {selectedEntry.semester || (selectedEntry.week <= 18 ? 1 : 2)})
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-fredoka font-extrabold text-indigo-950 pt-0.5">
                      {selectedEntry.lessonName}
                    </h3>
                    
                    <p className="text-xs text-gray-600 font-medium">
                      📁 {selectedEntry.unit} • ⏱️ {selectedEntry.period} • 📖 {selectedEntry.pageRange}
                    </p>

                    {/* Vocab & Patterns Pill Bar if available */}
                    {(selectedEntry.vocab && selectedEntry.vocab.length > 0) || (selectedEntry.patterns && selectedEntry.patterns.length > 0) ? (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {selectedEntry.vocab && selectedEntry.vocab.length > 0 && (
                          <div className="text-[11px] bg-blue-50 text-blue-900 px-2 py-0.5 rounded-md border border-blue-200 font-medium">
                            <strong>Từ vựng:</strong> {selectedEntry.vocab.join(', ')}
                          </div>
                        )}
                        {selectedEntry.patterns && selectedEntry.patterns.length > 0 && (
                          <div className="text-[11px] bg-teal-50 text-teal-900 px-2 py-0.5 rounded-md border border-teal-200 font-medium">
                            <strong>Mẫu câu / Quy tắc:</strong> {selectedEntry.patterns.join(' | ')}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyFullSGV}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all border border-gray-200"
                      title="Sao chép toàn bộ nội dung SGV"
                    >
                      {copiedSection === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'full' ? 'Đã sao chép' : 'Sao chép SGV'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playLevelUp();
                        onApplyToLessonPlan(selectedEntry);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-fredoka font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Áp dụng vào Giáo án</span>
                    </button>
                  </div>
                </div>

                {/* 1. Yêu cầu cần đạt chuẩn SGV */}
                <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-fredoka font-extrabold text-indigo-950 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      <span>I. YÊU CẦU CẦN ĐẠT (CHUẨN SÁCH GIÁO VIÊN & CTGDPT 2018)</span>
                    </h4>
                    <button
                      onClick={() => handleCopyText(selectedEntry.objectives.specificCompetencies.join('\n'), 'obj')}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSection === 'obj' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'obj' ? 'Đã sao chép' : 'Sao chép mục tiêu'}</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
                    <div>
                      <strong className="text-indigo-900 block font-bold mb-0.5">
                        1. Năng lực đặc thù ({selectedEntry.subject}):
                      </strong>
                      <ul className="list-disc pl-5 space-y-0.5">
                        {selectedEntry.objectives.specificCompetencies.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-indigo-900 block font-bold mb-0.5">
                        2. Năng lực chung (CTGDPT 2018):
                      </strong>
                      <ul className="list-disc pl-5 space-y-0.5">
                        {selectedEntry.objectives.generalCompetencies.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-indigo-900 block font-bold mb-0.5">
                        3. Phẩm chất chủ yếu:
                      </strong>
                      <ul className="list-disc pl-5 space-y-0.5">
                        {selectedEntry.objectives.qualities.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Integrated CV 2345 / CV 3456 / QĐ 2422 */}
                    {selectedEntry.integratedCV2345 && (
                      <div className="pt-2 border-t border-indigo-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {selectedEntry.integratedCV2345.digitalCompetence && (
                          <div className="bg-white/80 p-2 rounded-xl border border-indigo-100 text-indigo-950 flex items-start gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span>{selectedEntry.integratedCV2345.digitalCompetence}</span>
                          </div>
                        )}
                        {selectedEntry.integratedCV2345.aiLiteracy && (
                          <div className="bg-white/80 p-2 rounded-xl border border-indigo-100 text-indigo-950 flex items-start gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span>{selectedEntry.integratedCV2345.aiLiteracy}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Chi tiết Trò chơi Khởi động Chuẩn SGV */}
                <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-fredoka font-extrabold text-amber-950 flex items-center gap-1.5">
                      <Gamepad2 className="w-4 h-4 text-amber-600" />
                      <span>II. TRÒ CHƠI KHỞI ĐỘNG CỤ THỂ: {selectedEntry.warmUpGame.name}</span>
                    </h4>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-md">
                      Thời lượng: 5 phút
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-700">
                    <p><strong className="text-amber-900">• Mục tiêu trò chơi:</strong> {selectedEntry.warmUpGame.aims}</p>
                    <p><strong className="text-amber-900">• Đồ dùng chuẩn bị:</strong> {selectedEntry.warmUpGame.preparation}</p>
                    
                    <div>
                      <strong className="text-amber-900">• Luật chơi chi tiết từng bước:</strong>
                      <ol className="list-decimal pl-5 mt-0.5 space-y-0.5">
                        {selectedEntry.warmUpGame.rules.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-amber-200 space-y-1 shadow-2xs">
                      <strong className="text-amber-950 text-[11px] block font-bold">
                        📋 Hệ thống câu hỏi thử thách cụ thể của trò chơi:
                      </strong>
                      {selectedEntry.warmUpGame.sampleQuestions.map((q, i) => (
                        <div key={i} className="text-[11px] flex items-start gap-1">
                          <span className="font-bold text-amber-800 shrink-0">Câu {i + 1}:</span>
                          <span>{q.question} <strong className="text-emerald-700 font-bold">➔ Đáp án: {q.answer}</strong></span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 italic">
                      <strong className="font-bold not-italic text-emerald-950">Lời dẫn dắt chuyển tiếp của GV: </strong>
                      "{selectedEntry.warmUpGame.teacherScript}"
                    </div>
                  </div>
                </div>

                {/* 3. Khám phá kiến thức mới */}
                <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-fredoka font-extrabold text-blue-950 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>III. TIẾN TRÌNH KHÁM PHÁ & CÂU HỎI GỢI MỞ CỦA GIÁO VIÊN</span>
                    </h4>
                    <button
                      onClick={() => handleCopyText(selectedEntry.exploration.keyTakeaway, 'exp')}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSection === 'exp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'exp' ? 'Đã sao chép' : 'Sao chép ghi nhớ'}</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-gray-700">
                    <p><strong className="text-blue-950">• Trọng tâm SGK:</strong> {selectedEntry.exploration.textbookFocus}</p>
                    
                    <div>
                      <strong className="text-blue-950">• Hệ thống câu hỏi gợi mở dẫn dắt của Giáo viên:</strong>
                      <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                        {selectedEntry.exploration.teacherQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-blue-950">• Thao tác của học sinh với bộ đồ dùng học tập:</strong>
                      <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                        {selectedEntry.exploration.studentActions.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-blue-200 font-medium text-blue-900 shadow-2xs">
                      <strong className="block text-indigo-950 mb-0.5 font-bold">📌 Ghi nhớ / Quy tắc chốt bài đóng khung:</strong>
                      {selectedEntry.exploration.keyTakeaway}
                    </div>
                  </div>
                </div>

                {/* 4. Luyện tập & Vận dụng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 space-y-2 text-xs">
                    <h5 className="font-fredoka font-extrabold text-gray-900 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Luyện tập bài tập SGK & VBT</span>
                    </h5>
                    {selectedEntry.practice.exercises.map((ex, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-xl border border-gray-200 space-y-0.5 shadow-2xs">
                        <strong className="text-indigo-900 block font-bold">{ex.title}</strong>
                        <div className="text-[11px] text-gray-600">Hình thức: {ex.form}</div>
                        <div className="text-[10px] text-rose-600 font-medium">⚠️ Lỗi dễ mắc: {ex.commonMistakes}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-100 space-y-2 text-xs">
                    <h5 className="font-fredoka font-extrabold text-emerald-950 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Vận dụng thực tế đời sống</span>
                    </h5>
                    <p className="text-gray-700 leading-relaxed">{selectedEntry.application.realLifeScenario}</p>
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 shadow-2xs">
                      <strong className="block font-bold mb-0.5">Hướng dẫn thực hiện:</strong>
                      {selectedEntry.application.activityGuide}
                    </div>
                  </div>
                </div>

                {/* 5. Detailed periods in the week (If viewing week aggregate) */}
                {selectedEntry.entryType === 'week' && selectedEntry.periodsList && selectedEntry.periodsList.length > 0 && (
                  <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 space-y-2 text-xs">
                    <h5 className="font-fredoka font-extrabold text-purple-950 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span>V. PHÂN BỔ CHI TIẾT CÁC TIẾT DẠY TRONG TUẦN {selectedEntry.week}</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                      {selectedEntry.periodsList.map((p, pIdx) => (
                        <div key={pIdx} className="bg-white p-2.5 rounded-xl border border-purple-200 space-y-1 shadow-2xs">
                          <div className="font-fredoka font-extrabold text-purple-900 flex items-center justify-between">
                            <span>{p.periodLabel}</span>
                            <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                              Tiết {p.periodNumber}
                            </span>
                          </div>
                          <div className="font-bold text-gray-800 text-[11px] line-clamp-1">{p.lessonPart}</div>
                          <div className="text-[10px] text-gray-500 line-clamp-2">{p.keyFocus}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 text-center text-gray-400 text-sm space-y-2">
                <div className="text-3xl">📖</div>
                <div className="font-bold text-gray-600">Vui lòng chọn bài học từ danh sách bên trái</div>
                <p className="text-xs text-gray-400">
                  Thầy cô có thể lọc theo Môn học, Khối lớp hoặc chuyển đổi chế độ xem từng Tiết (Phụ lục 2) / theo Tuần.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-2 shrink-0">
          <div className="text-xs text-gray-500 flex flex-wrap items-center gap-1.5">
            <span>Dữ liệu SGV bám sát Chương trình GDPT 2018:</span>
            <a href="https://taphuan.nxbgd.vn/tap-huan" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline hover:text-indigo-800">
              taphuan.nxbgd.vn
            </a>
            <span>•</span>
            <a href="https://hoclieu.vn" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline hover:text-indigo-800">
              hoclieu.vn
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold cursor-pointer transition-all"
            >
              Đóng
            </button>
            {selectedEntry && (
              <button
                onClick={() => {
                  sounds.playLevelUp();
                  onApplyToLessonPlan(selectedEntry);
                  onClose();
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-fredoka font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Áp dụng vào Kế hoạch bài dạy</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
