/**
 * Comprehensive Integration Configuration Modal for CV 2345 Curriculum Plan
 */

import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Cpu, ShieldAlert, HeartHandshake, 
  Layers, Sliders, Info, CheckSquare, Square, Search, Filter, 
  Calendar, CheckCircle, RotateCcw, ArrowRight, BookOpen, AlertCircle
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { CurriculumPlanRow, ActivityScope, PeriodIntegrationOverride, UnitIntegrationOverride } from '../../types/curriculum2345';

interface CurriculumIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGrade: string;
  totalYearPeriods: number;
  allRows: CurriculumPlanRow[];
  distinctUnits: { unitCode: string; lessonTitle: string; weeks: number[]; semester: number }[];
  integrationMode: 'all' | 'custom';
  selectedIntegratedWeeks: Set<number>;
  globalActivityScope: ActivityScope;
  enableAI: boolean;
  enableNLS: boolean;
  enableATGT: boolean;
  enableKNS: boolean;
  enableEthics: boolean;
  enableDevices: boolean;
  unitOverrides: Record<string, UnitIntegrationOverride>;
  periodOverrides: Record<number, PeriodIntegrationOverride>;
  onSelectAllWeeks: () => void;
  onDeselectAllWeeks: () => void;
  onSelectMainUnitsOnly: () => void;
  onSelectSemester1Only: () => void;
  onSelectSemester2Only: () => void;
  onSmartPedagogicalSplit: () => void;
  onSelectOnePeriodPerWeek: () => void;
  onSelectTwoPeriodsPerWeek: () => void;
  onSelectOddPeriodsOnly: () => void;
  onSelectEvenPeriodsOnly: () => void;
  onExcludeReviewsAndAssessments: () => void;
  onBatchSetPeriodsIntegration?: (periodNumbers: number[], isIntegrated: boolean) => void;
  onSetGlobalActivityScope: (scope: ActivityScope) => void;
  onToggleUnitIntegration: (unitCode: string, unitWeeks: number[]) => void;
  onSetUnitActivityScope: (unitCode: string, scope: ActivityScope) => void;
  onToggleGlobalAI: (val: boolean) => void;
  onToggleGlobalNLS: (val: boolean) => void;
  onToggleGlobalATGT: (val: boolean) => void;
  onToggleGlobalKNS: (val: boolean) => void;
  onToggleGlobalEthics: (val: boolean) => void;
  onToggleGlobalDevices: (val: boolean) => void;
  onUpdatePeriod: (periodNum: number, updates: PeriodIntegrationOverride) => void;
  onOpenPeriodCustomizer: (row: CurriculumPlanRow) => void;
}

export default function CurriculumIntegrationModal({
  isOpen,
  onClose,
  selectedGrade,
  totalYearPeriods,
  allRows,
  distinctUnits,
  integrationMode,
  selectedIntegratedWeeks,
  globalActivityScope,
  enableAI,
  enableNLS,
  enableATGT,
  enableKNS,
  enableEthics,
  enableDevices,
  unitOverrides,
  periodOverrides,
  onSelectAllWeeks,
  onDeselectAllWeeks,
  onSelectMainUnitsOnly,
  onSelectSemester1Only,
  onSelectSemester2Only,
  onSmartPedagogicalSplit,
  onSelectOnePeriodPerWeek,
  onSelectTwoPeriodsPerWeek,
  onSelectOddPeriodsOnly,
  onSelectEvenPeriodsOnly,
  onExcludeReviewsAndAssessments,
  onBatchSetPeriodsIntegration,
  onSetGlobalActivityScope,
  onToggleUnitIntegration,
  onSetUnitActivityScope,
  onToggleGlobalAI,
  onToggleGlobalNLS,
  onToggleGlobalATGT,
  onToggleGlobalKNS,
  onToggleGlobalEthics,
  onToggleGlobalDevices,
  onUpdatePeriod,
  onOpenPeriodCustomizer
}: CurriculumIntegrationModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'weeks_units' | 'periods' | 'legal'>('weeks_units');
  const [periodSearch, setPeriodSearch] = useState<string>('');
  const [unitFilter, setUnitFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'integrated' | 'non-integrated'>('all');

  const countIntegrated = allRows.filter(r => r.isIntegrated).length;
  const countAct123 = allRows.filter(r => r.isIntegrated && r.activityScope === 'act123').length;
  const countAct456 = allRows.filter(r => r.isIntegrated && r.activityScope === 'act456').length;
  const countActAll = allRows.filter(r => r.isIntegrated && r.activityScope === 'all').length;

  const filteredPeriods = allRows.filter(r => {
    if (unitFilter !== 'all' && r.unitCode !== unitFilter) return false;
    if (statusFilter === 'integrated' && !r.isIntegrated) return false;
    if (statusFilter === 'non-integrated' && r.isIntegrated) return false;
    if (periodSearch.trim()) {
      const q = periodSearch.toLowerCase();
      return (
        r.lessonTitle.toLowerCase().includes(q) ||
        r.unitCode.toLowerCase().includes(q) ||
        r.periodLabel.toLowerCase().includes(q) ||
        r.weekLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleBatchToggleCurrentFiltered = (targetIntegrated: boolean) => {
    sounds.playCoin();
    filteredPeriods.forEach(r => {
      onUpdatePeriod(r.periodNumber, { isIntegrated: targetIntegrated });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-900 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-purple-950 shadow-md">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white font-fredoka font-bold text-xs uppercase tracking-wider">
                  Cấu Hình Tích Hợp Chi Tiết (CV 2345)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold text-[11px] border border-amber-400/30">
                  {selectedGrade} ({totalYearPeriods} Tiết)
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-fredoka font-bold mt-1 text-white">
                Tùy Chọn Tích Hợp AI, NLS, ATGT, KNS & Hoạt Động Tiết Học
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats Strip */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Trạng thái hiện tại:</span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
              Đã tích hợp: {countIntegrated} / {totalYearPeriods} tiết
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
              HĐ 1,2,3: <b>{countAct123}</b> tiết
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              HĐ 4,5,6: <b>{countAct456}</b> tiết
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800">
              Toàn tiết: <b>{countActAll}</b> tiết
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('weeks_units')}
            className={`pb-3 px-3 font-fredoka font-bold text-xs md:text-sm transition-all border-b-2 flex items-center gap-1.5 cursor-pointer
              ${activeTab === 'weeks_units'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }
            `}
          >
            <Calendar className="w-4 h-4" />
            <span>1. Theo Tuần & Unit (35 Tuần)</span>
          </button>

          <button
            onClick={() => setActiveTab('periods')}
            className={`pb-3 px-3 font-fredoka font-bold text-xs md:text-sm transition-all border-b-2 flex items-center gap-1.5 cursor-pointer
              ${activeTab === 'periods'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }
            `}
          >
            <Layers className="w-4 h-4" />
            <span>2. Từng Tiết Học & Hoạt Động ({totalYearPeriods} Tiết)</span>
          </button>

          <button
            onClick={() => setActiveTab('legal')}
            className={`pb-3 px-3 font-fredoka font-bold text-xs md:text-sm transition-all border-b-2 flex items-center gap-1.5 cursor-pointer
              ${activeTab === 'legal'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }
            `}
          >
            <Info className="w-4 h-4" />
            <span>3. Thành Phần AI, NLS, ATGT, KNS</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          
          {/* TAB 1: Theo Tuần & Unit */}
          {activeTab === 'weeks_units' && (
            <div className="space-y-6">
              
              {/* Presets Grid */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-fredoka font-bold text-sm text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Kịch Bản & Phân Bổ Sư Phạm Nhanh (1-Click Presets)
                  </h4>
                  <span className="text-[11px] text-slate-500">Tự động áp dụng chuẩn sư phạm</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  <button
                    onClick={onSmartPedagogicalSplit}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 text-left transition-all cursor-pointer hover:shadow-md group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">🌟 Phân bổ sư phạm chuẩn</span>
                      <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.5 rounded font-black">Khuyên Dùng</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Tiết 1, 2: Tích hợp HĐ 1-2-3 (Kiến thức mới); Tiết 3, 4: Tích hợp HĐ 4-5-6 (Luyện tập & Vận dụng).
                    </p>
                  </button>

                  <button
                    onClick={onSelectAllWeeks}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 text-left transition-all cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">✅ Tích hợp TẤT CẢ (35 Tuần)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Bật đầy đủ AI, NLS, ATGT, KNS & Đạo đức xuyên suốt toàn bộ 35 tuần năm học.
                    </p>
                  </button>

                  <button
                    onClick={onExcludeReviewsAndAssessments}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 hover:border-amber-400 text-left transition-all cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-amber-800 dark:text-amber-300">🛡️ Tắt tích hợp Tiết Kiểm tra & Ôn tập</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Chỉ tích hợp các bài học chính; các tiết Review, Assessment, Self-check dạy thuần SGK.
                    </p>
                  </button>

                  <button
                    onClick={onSelectOnePeriodPerWeek}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">1️⃣ Chỉ tích hợp 1 tiết / tuần</span>
                    <span className="text-[10px] text-slate-400">Tiết 1 tích hợp, các tiết 2, 3, 4 theo chuẩn SGK</span>
                  </button>

                  <button
                    onClick={onSelectTwoPeriodsPerWeek}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">2️⃣ Chỉ tích hợp 2 tiết / tuần</span>
                    <span className="text-[10px] text-slate-400">Tiết 1, 2 tích hợp, các tiết 3, 4 theo chuẩn SGK</span>
                  </button>

                  <button
                    onClick={onSelectOddPeriodsOnly}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">🎲 Tích hợp Tiết Lẻ (Tiết 1, 3)</span>
                    <span className="text-[10px] text-slate-400">Chỉ tích hợp các tiết lẻ trong tuần</span>
                  </button>

                  <button
                    onClick={onSelectEvenPeriodsOnly}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">🎯 Tích hợp Tiết Chẵn (Tiết 2, 4)</span>
                    <span className="text-[10px] text-slate-400">Chỉ tích hợp các tiết chẵn trong tuần</span>
                  </button>

                  <button
                    onClick={onSelectSemester1Only}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">🍂 Chỉ tích hợp Học kỳ 1</span>
                    <span className="text-[10px] text-slate-400">Từ Tuần 1 đến Tuần 18 (Unit 1 - 10)</span>
                  </button>

                  <button
                    onClick={onSelectSemester2Only}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">🌸 Chỉ tích hợp Học kỳ 2</span>
                    <span className="text-[10px] text-slate-400">Từ Tuần 19 đến Tuần 35 (Unit 11 - 20)</span>
                  </button>

                  <button
                    onClick={onDeselectAllWeeks}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 text-left cursor-pointer sm:col-span-2 md:col-span-3"
                  >
                    <span className="font-bold text-rose-700 dark:text-rose-400 block">🚫 Đặt lại về Mặc định SGK (Tắt TẤT CẢ tích hợp)</span>
                    <span className="text-[10px] text-slate-400">Không tích hợp bất kỳ tiết nào, toàn bộ 35 tuần theo chuẩn SGK Global Success</span>
                  </button>
                </div>
              </div>

              {/* Global Activity Scope Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-fredoka font-bold text-sm text-slate-800 dark:text-slate-200">
                    Phạm vi hoạt động mặc định cho toàn bộ kế hoạch:
                  </h4>
                  <span className="text-[11px] text-slate-400">Có thể tùy biến riêng cho từng Unit hoặc từng tiết</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => onSetGlobalActivityScope('act123')}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between
                      ${globalActivityScope === 'act123'
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/20'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Hoạt động 1, 2, 3</span>
                      {globalActivityScope === 'act123' && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Khởi động & Khám phá (Look, listen, repeat; Listen, point, say; Let's talk)
                    </p>
                  </button>

                  <button
                    onClick={() => onSetGlobalActivityScope('act456')}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between
                      ${globalActivityScope === 'act456'
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/20'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Hoạt động 4, 5, 6</span>
                      {globalActivityScope === 'act456' && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Luyện tập & Vận dụng (Listen & tick; Complete; Let's sing / Play)
                    </p>
                  </button>

                  <button
                    onClick={() => onSetGlobalActivityScope('all')}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between
                      ${globalActivityScope === 'all'
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/20'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Tất cả hoạt động</span>
                      {globalActivityScope === 'all' && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Tích hợp xuyên suốt toàn bộ tiết học (Cả 6 hoạt động)
                    </p>
                  </button>
                </div>
              </div>

              {/* Unit by Unit Interactive Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-fredoka font-bold text-sm text-slate-800 dark:text-slate-200">
                    Bật/Tắt và cấu hình phạm vi theo từng Unit ({distinctUnits.length} Units):
                  </h4>
                  <span className="text-[11px] text-slate-400 italic">Click vào Unit để Bật/Tắt, đổi HĐ ở menu bên cạnh</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {distinctUnits.map((u) => {
                    const unitOverride = unitOverrides[u.unitCode];
                    const isIntegrated = unitOverride?.isIntegrated !== undefined 
                      ? unitOverride.isIntegrated 
                      : (integrationMode === 'all' || u.weeks.every(w => selectedIntegratedWeeks.has(w)));
                    const scope = unitOverride?.activityScope || globalActivityScope;
                    const isReview = u.unitCode.toLowerCase().includes('review') || u.unitCode.toLowerCase().includes('assessment') || u.unitCode.toLowerCase().includes('self-check');

                    return (
                      <div
                        key={u.unitCode}
                        className={`p-3 rounded-2xl border transition-all flex flex-col justify-between space-y-2
                          ${isIntegrated 
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-100 shadow-sm' 
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400 opacity-70'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${isReview ? 'bg-amber-200 text-amber-900' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'}`}>
                            {u.unitCode}
                          </span>
                          
                          <button
                            onClick={() => onToggleUnitIntegration(u.unitCode, u.weeks)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all border ${
                              isIntegrated 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' 
                                : 'bg-slate-200 text-slate-600 border-slate-300 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {isIntegrated ? '🟢 Tích hợp' : '⚪ Mặc định'}
                          </button>
                        </div>

                        <div>
                          <span className="font-bold text-xs block line-clamp-1">
                            {u.lessonTitle.replace(/^Unit \d+:\s*/, '')}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                            Tuần: {u.weeks.join(', ')} • HK{u.semester}
                          </span>
                        </div>

                        {/* Scope selector for this Unit */}
                        {isIntegrated && (
                          <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-slate-500 dark:text-slate-400">Phạm vi:</span>
                            <div className="flex items-center gap-1">
                              {(['act123', 'act456', 'all'] as const).map((sc) => (
                                <button
                                  key={sc}
                                  onClick={() => onSetUnitActivityScope(u.unitCode, sc)}
                                  className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all ${
                                    scope === sc
                                      ? 'bg-amber-400 text-purple-950 shadow-xs'
                                      : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white'
                                  }`}
                                >
                                  {sc === 'act123' ? 'HĐ 1-2-3' : sc === 'act456' ? 'HĐ 4-5-6' : 'Toàn tiết'}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Từng Tiết Học & Hoạt Động (Period by Period) */}
          {activeTab === 'periods' && (
            <div className="space-y-4">
              
              {/* Filter and Search Bar for Periods */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={periodSearch}
                      onChange={(e) => setPeriodSearch(e.target.value)}
                      placeholder="Tìm tiết học (VD: Tiết 1, Unit 3, Let's talk)..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <select
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs outline-none"
                  >
                    <option value="all">Tất cả Unit</option>
                    {distinctUnits.map(u => (
                      <option key={u.unitCode} value={u.unitCode}>
                        {u.unitCode}: {u.lessonTitle.substring(0, 20)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs outline-none font-medium"
                  >
                    <option value="all">Mọi trạng thái ({allRows.length})</option>
                    <option value="integrated">🟢 Đang tích hợp ({countIntegrated})</option>
                    <option value="non-integrated">⚪ Dạy chuẩn SGK ({allRows.length - countIntegrated})</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleBatchToggleCurrentFiltered(true)}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-[11px] cursor-pointer transition-all border border-emerald-300"
                    title="Bật tích hợp cho tất cả các tiết đang hiển thị theo bộ lọc"
                  >
                    + Bật ({filteredPeriods.length} tiết)
                  </button>
                  <button
                    onClick={() => handleBatchToggleCurrentFiltered(false)}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-bold text-[11px] cursor-pointer transition-all border border-rose-300"
                    title="Tắt tích hợp (chuyển sang dạy chuẩn SGK) cho các tiết đang hiển thị"
                  >
                    - Tắt ({filteredPeriods.length} tiết)
                  </button>
                </div>
              </div>

              {/* Period Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden max-h-[55vh] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 z-10 text-[11px] font-bold text-slate-700 dark:text-slate-200">
                    <tr>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-16 text-center">Tiết</th>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-20 text-center">Tuần</th>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-36">Bài học / Unit</th>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Nội dung bài & Trò chơi</th>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-36 text-center">Trạng thái tích hợp</th>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-44 text-center">Phạm vi hoạt động</th>
                      <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-24 text-center">Tùy biến</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredPeriods.map((r) => (
                      <tr 
                        key={r.globalIndex}
                        className={`hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors ${
                          r.isIntegrated ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/70 dark:bg-slate-900/50'
                        }`}
                      >
                        <td className="p-2.5 text-center font-black font-fredoka text-rose-600 dark:text-rose-400">
                          {r.periodLabel}
                        </td>
                        <td className="p-2.5 text-center font-bold text-slate-600 dark:text-slate-400">
                          {r.weekLabel}
                        </td>
                        <td className="p-2.5 font-bold">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 mr-1">
                            {r.unitCode}
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 leading-tight">
                            {r.lessonTitle}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600 dark:text-slate-300">
                          <p className="line-clamp-2">{r.detailedContent}</p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-600 dark:text-amber-400">
                            <span>🎮 {r.suggestedGame.split('/')[0]}</span>
                          </div>
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onUpdatePeriod(r.periodNumber, {
                                isIntegrated: !r.isIntegrated
                              });
                            }}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition-all border flex items-center justify-center gap-1 mx-auto ${
                              r.isIntegrated 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-xs' 
                                : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                            title={r.isIntegrated ? 'Click để tắt tích hợp (dạy chuẩn SGK)' : 'Click để bật tích hợp liên môn'}
                          >
                            {r.isIntegrated ? <Check className="w-3.5 h-3.5" /> : null}
                            <span>{r.isIntegrated ? 'Đang tích hợp' : '⚪ Chuẩn SGK'}</span>
                          </button>
                        </td>
                        <td className="p-2.5 text-center">
                          {r.isIntegrated ? (
                            <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                              <button
                                onClick={() => onUpdatePeriod(r.periodNumber, { activityScope: 'act123' })}
                                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                                  r.activityScope === 'act123' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-500'
                                }`}
                              >
                                HĐ 1-2-3
                              </button>
                              <button
                                onClick={() => onUpdatePeriod(r.periodNumber, { activityScope: 'act456' })}
                                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                                  r.activityScope === 'act456' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-500'
                                }`}
                              >
                                HĐ 4-5-6
                              </button>
                              <button
                                onClick={() => onUpdatePeriod(r.periodNumber, { activityScope: 'all' })}
                                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                                  r.activityScope === 'all' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-500'
                                }`}
                              >
                                Toàn tiết
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Theo chuẩn SGK</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => onOpenPeriodCustomizer(r)}
                            className="px-2 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto"
                            title="Tùy chỉnh sâu từng module AI, NLS, ATGT, KNS, Đạo đức"
                          >
                            <Sliders className="w-3 h-3" />
                            <span>Chi tiết</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Thành Phần & Căn Cứ Pháp Lý & Kiểm Tra Khung Năng Lực Tiểu Học */}
          {activeTab === 'legal' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                <h4 className="font-fredoka font-bold text-sm text-indigo-950 dark:text-indigo-200">
                  Bật/Tắt các thành phần tích hợp (Mặc định toàn hệ thống):
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <button
                      onClick={() => onToggleGlobalAI(!enableAI)}
                      className="mt-0.5 cursor-pointer"
                    >
                      {enableAI ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div>
                      <span className="font-bold text-blue-900 dark:text-blue-200 text-xs block">
                        🤖 Giáo dục Trí tuệ nhân tạo (AI - QĐ 2422/QĐ-BGDĐT)
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Tích hợp AI Voice Recognition, Text-to-Speech, AI Vision nhận diện hình ảnh, đối thoại tương tác và chấm điểm ngữ âm.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <button
                      onClick={() => onToggleGlobalNLS(!enableNLS)}
                      className="mt-0.5 cursor-pointer"
                    >
                      {enableNLS ? <CheckSquare className="w-5 h-5 text-emerald-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div>
                      <span className="font-bold text-emerald-900 dark:text-emerald-200 text-xs block">
                        📱 Khung Năng Lực Số (NLS - TT 02/2025/TT-BGDĐT)
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Khai thác học liệu số hoclieu.vn & taphuan.nxbgd.vn, bài tập tương tác Wordwall, Quizizz, an toàn số và bảo vệ thông tin.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <button
                      onClick={() => onToggleGlobalATGT(!enableATGT)}
                      className="mt-0.5 cursor-pointer"
                    >
                      {enableATGT ? <CheckSquare className="w-5 h-5 text-rose-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div>
                      <span className="font-bold text-rose-900 dark:text-rose-200 text-xs block">
                        🚦 An Toàn Giao Thông (ATGT - CV 3456/BGDĐT-GDPT)
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Quy tắc an toàn khi đi học, mũ bảo hiểm, biển báo chỉ dẫn, an toàn khi tham gia trò chơi vận động trong và ngoài lớp học.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <button
                      onClick={() => onToggleGlobalKNS(!enableKNS)}
                      className="mt-0.5 cursor-pointer"
                    >
                      {enableKNS ? <CheckSquare className="w-5 h-5 text-purple-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div>
                      <span className="font-bold text-purple-900 dark:text-purple-200 text-xs block">
                        🤝 Kỹ Năng Sống & Tự Chủ (KNS)
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Rèn luyện kỹ năng lắng nghe tích cực, tự tin giao tiếp trước đám đông, hợp tác làm việc nhóm và giữ gìn đồ dùng học tập.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <button
                      onClick={() => onToggleGlobalEthics(!enableEthics)}
                      className="mt-0.5 cursor-pointer"
                    >
                      {enableEthics ? <CheckSquare className="w-5 h-5 text-amber-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div>
                      <span className="font-bold text-amber-900 dark:text-amber-200 text-xs block">
                        ❤️ Giáo Dục Đạo Đức & 5 Phẩm Chất (TT 32/2018)
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Bồi dưỡng 5 phẩm chất chủ yếu: Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm trong từng ngữ cảnh bài học.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* In-depth Pedagogical Framework Validation Box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-fredoka font-bold text-sm text-emerald-300">
                      Bảng Đánh Giá Độ Tương Thích Khung Năng Lực Dành Cho Học Sinh Tiểu Học
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Đã được đối chiếu và chuẩn hóa theo đúng các quy định hiện hành của Bộ GD&ĐT
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                    <span className="font-bold text-blue-300 block">
                      1. Khung Trí Tuệ Nhân Tạo (QĐ 2422/QĐ-BGDĐT):
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      ✅ <b>Phù hợp lứa tuổi Tiểu học:</b> Chỉ dừng ở mức độ <i>Nhận biết & Trải nghiệm</i> (sử dụng AI nhận diện giọng đọc chuẩn bản ngữ, Text-to-Speech, AI camera nhận diện tranh ảnh, chatbot hội thoại đóng vai). Tuyệt đối <b>không yêu cầu lập trình hay lý thuyết phức tạp</b>, lồng ghép tự nhiên vào trò chơi luyện âm/mẫu câu.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                    <span className="font-bold text-emerald-300 block">
                      2. Khung Năng Lực Số Người Học (TT 02/2025/TT-BGDĐT):
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      ✅ <b>Bao phủ 6 miền năng lực số Tiểu học:</b> Khai thác kho học liệu số tương tác <i>(hoclieu.vn, taphuan.nxbgd.vn)</i>, thao tác kéo thả bảng tương tác, ghi âm tự đánh giá bài làm, tuân thủ an toàn số và quy tắc bảo vệ mắt khi sử dụng màn hình.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                    <span className="font-bold text-amber-300 block">
                      3. Đạo Đức & 5 Phẩm Chất Chủ Yếu (TT 32/2018):
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      ✅ <b>Lồng ghép xuyên suốt 5 phẩm chất:</b> <i>Yêu nước</i> (yêu danh lam, gia đình, quê hương); <i>Nhân ái</i> (yêu thương bạn bè, kính trọng thầy cô, bảo vệ động vật); <i>Chăm chỉ</i> (tự giác luyện nói); <i>Trung thực</i> (thật thà khi làm bài trắc nghiệm); <i>Trách nhiệm</i> (giữ gìn đồ dùng học tập).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                    <span className="font-bold text-rose-300 block">
                      4. An Toàn Giao Thông & Kỹ Năng Sống (CV 3456 & TT 32):
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      ✅ <b>Thực hành kỹ năng thiết thực:</b> Đội mũ bảo hiểm khi ngồi xe máy, quan sát đèn tín hiệu giao thông, trật tự khi di chuyển trong trường lớp, giao tiếp tự tin, làm việc nhóm và phản xạ nhanh qua các trò chơi vận động TPR.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal documents box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                <h5 className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wide">
                  Căn cứ pháp lý theo chuẩn Bộ GD&ĐT ban hành:
                </h5>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li><b>Công văn số 2345/BGDĐT-GDTH</b> ngày 07/6/2021 về Hướng dẫn xây dựng kế hoạch giáo dục nhà trường cấp Tiểu học (Phụ lục 2).</li>
                  <li><b>Quyết định số 2422/QĐ-BGDĐT</b> ngày 19/8/2024 ban hành Khung giáo dục Trí tuệ nhân tạo (AI) cấp Tiểu học.</li>
                  <li><b>Thông tư số 02/2025/TT-BGDĐT</b> ngày 24/01/2025 Quy định Khung năng lực số cho người học trong hệ thống giáo dục quốc dân.</li>
                  <li><b>Công văn số 3456/BGDĐT-GDPT</b> về Hướng dẫn thực hiện Chương trình GDPT 2018 môn Tiếng Anh.</li>
                  <li><b>Thông tư số 32/2018/TT-BGDĐT</b> ngày 26/12/2018 Ban hành Chương trình Giáo dục phổ thông môn Tiếng Anh.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Kế hoạch sẽ tự động cập nhật ngay trên bảng và khi xuất file Word.
          </div>

          <button
            onClick={() => {
              sounds.playSuccess();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Áp Dụng & Hoàn Tất</span>
          </button>
        </div>
      </div>
    </div>
  );
}
