/**
 * Modal to customize integration for a single period (Tiết học)
 */

import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Cpu, ShieldAlert, HeartHandshake, 
  Layers, Sliders, Info, CheckSquare, Square, FileText, ArrowRight,
  Accessibility, Edit3, Languages, RefreshCw
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { CurriculumPlanRow, ActivityScope } from '../../types/curriculum2345';
import { 
  FlexibleIntegrationItem, 
  buildFlexibleItemsFromPeriod,
  translateToPedagogicalEnglish
} from '../../utils/pedagogicalIntegrationTranslator';
import FlexibleIntegrationBadgeList from './FlexibleIntegrationBadgeList';
import FlexibleIntegrationModal from './FlexibleIntegrationModal';

interface PeriodCustomizerModalProps {
  row: CurriculumPlanRow | null;
  onClose: () => void;
  onSave: (periodNumber: number, config: {
    isIntegrated: boolean;
    activityScope: ActivityScope;
    enableAI: boolean;
    enableNLS: boolean;
    enableATGT: boolean;
    enableKNS: boolean;
    enableEthics: boolean;
    enableInclusive?: boolean;
    customIntegrations?: FlexibleIntegrationItem[];
  }) => void;
}

export default function PeriodCustomizerModal({
  row,
  onClose,
  onSave
}: PeriodCustomizerModalProps) {
  if (!row) return null;

  const [isIntegrated, setIsIntegrated] = useState<boolean>(row.isIntegrated);
  const [activityScope, setActivityScope] = useState<ActivityScope>(row.activityScope);
  const [enableAI, setEnableAI] = useState<boolean>(row.isAIEnabled);
  const [enableNLS, setEnableNLS] = useState<boolean>(row.isNLSEnabled);
  const [enableATGT, setEnableATGT] = useState<boolean>(row.isATGTEnabled);
  const [enableKNS, setEnableKNS] = useState<boolean>(row.isKNSEnabled);
  const [enableEthics, setEnableEthics] = useState<boolean>(row.isEthicsEnabled ?? true);
  const [enableInclusive, setEnableInclusive] = useState<boolean>(true);

  // Flexible integration items
  const [customItems, setCustomItems] = useState<FlexibleIntegrationItem[]>(() => {
    if (row.customIntegrations && row.customIntegrations.length > 0) {
      return row.customIntegrations;
    }
    return buildFlexibleItemsFromPeriod(row);
  });

  const [showFlexibleModal, setShowFlexibleModal] = useState<boolean>(false);

  const handleSave = () => {
    sounds.playCoin();
    onSave(row.periodNumber, {
      isIntegrated,
      activityScope,
      enableAI,
      enableNLS,
      enableATGT,
      enableKNS,
      enableEthics,
      enableInclusive,
      customIntegrations: customItems
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 border border-white/20">
              <Sliders className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-purple-950 font-fredoka font-black text-xs">
                  {row.periodLabel}
                </span>
                <span className="text-xs text-indigo-200 font-semibold">
                  {row.weekLabel} • {row.month}
                </span>
              </div>
              <h3 className="text-base font-bold font-fredoka mt-0.5 line-clamp-1">
                {row.unitCode}: {row.lessonTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          
          {/* Main Toggle: Enable/Disable Integration for this period */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-sm text-indigo-950 dark:text-indigo-200 block">
                Trạng thái tích hợp liên môn (CV 2345)
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                {isIntegrated 
                  ? 'Bật nội dung bổ sung (AI, Năng lực số, ATGT, KNS)' 
                  : 'Chỉ thực hiện theo tiến độ chuẩn SGK Global Success'}
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setIsIntegrated(!isIntegrated);
              }}
              className={`px-4 py-2 rounded-xl font-bold font-fredoka text-xs transition-all cursor-pointer flex items-center gap-1.5 border
                ${isIntegrated 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }
              `}
            >
              {isIntegrated ? <Check className="w-4 h-4" /> : null}
              <span>{isIntegrated ? 'ĐANG BẬT' : 'ĐANG TẮT'}</span>
            </button>
          </div>

          {isIntegrated && (
            <>
              {/* Activity Scope Selector */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 text-xs block">
                  🎯 Chọn phạm vi hoạt động tích hợp trong tiết:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActivityScope('act123');
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between
                      ${activityScope === 'act123'
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Hoạt động 1, 2, 3</span>
                      {activityScope === 'act123' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      Khởi động & Khám phá (Look, listen, repeat; Listen, point, say)
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActivityScope('act456');
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between
                      ${activityScope === 'act456'
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Hoạt động 4, 5, 6</span>
                      {activityScope === 'act456' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      Luyện tập & Vận dụng (Listen & tick; Complete; Let's sing/play)
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActivityScope('all');
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between
                      ${activityScope === 'all'
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Tất cả hoạt động</span>
                      {activityScope === 'all' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      Tích hợp xuyên suốt toàn bộ tiết học
                    </span>
                  </button>
                </div>
              </div>

              {/* Sub-modules checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-slate-700 dark:text-slate-300 text-xs block">
                  🧩 Chọn các thành phần tích hợp trong tiết học này:
                </label>

                <div className="space-y-2">
                  <button
                    onClick={() => setEnableAI(!enableAI)}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer text-left
                      ${enableAI 
                        ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                      }
                    `}
                  >
                    {enableAI ? <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <span className="font-bold block">🤖 Trí tuệ nhân tạo (AI - QĐ 2422/QĐ-BGDĐT)</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{row.adjustment.ai.replace(/^\[[^\]]+\]\s*/, '')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setEnableNLS(!enableNLS)}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer text-left
                      ${enableNLS 
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                      }
                    `}
                  >
                    {enableNLS ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <span className="font-bold block">📱 Năng lực số (TT 02/2025/TT-BGDĐT)</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{row.adjustment.nls.replace(/^\[[^\]]+\]\s*/, '')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setEnableATGT(!enableATGT)}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer text-left
                      ${enableATGT 
                        ? 'bg-rose-50/80 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                      }
                    `}
                  >
                    {enableATGT ? <CheckSquare className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <span className="font-bold block">🚦 An toàn giao thông (ATGT - CV 3456/BGDĐT-GDPT)</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{row.adjustment.atgt.replace(/^\[[^\]]+\]\s*/, '')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setEnableKNS(!enableKNS)}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer text-left
                      ${enableKNS 
                        ? 'bg-purple-50/80 dark:bg-purple-950/50 border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                      }
                    `}
                  >
                    {enableKNS ? <CheckSquare className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <span className="font-bold block">🤝 Kỹ năng sống & Tự chủ (KNS)</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{row.adjustment.kns.replace(/^\[[^\]]+\]\s*/, '')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setEnableEthics(!enableEthics)}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer text-left
                      ${enableEthics 
                        ? 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                      }
                    `}
                  >
                    {enableEthics ? <CheckSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <span className="font-bold block">❤️ Giáo dục Đạo đức & 5 Phẩm chất (TT 32/2018)</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{row.adjustment.ethics ? row.adjustment.ethics.replace(/^\[[^\]]+\]\s*/, '') : 'Rèn luyện 5 phẩm chất chủ yếu: Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm trong học tập.'}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setEnableInclusive(!enableInclusive)}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer text-left
                      ${enableInclusive 
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                      }
                    `}
                  >
                    {enableInclusive ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <span className="font-bold block">💚 Giáo dục hòa nhập học sinh khuyết tật (TT 03/2018/TT-BGDĐT)</span>
                      <p className="text-[11px] opacity-80 mt-0.5">Bố trí tranh ảnh phóng to, trợ giúp cá nhân và phân hóa bài tập phù hợp cho học sinh khuyết tật.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Flexible Integration Section: Custom Codes & Auto Translation */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/40 border border-blue-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-bold text-xs text-indigo-950 dark:text-indigo-200">
                      Mã Tích Hợp & Lĩnh Vực Linh Hoạt (Tiếng Anh Sư Phạm)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFlexibleModal(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold font-fredoka text-[11px] shadow-sm cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Nhập Linh Hoạt & Dịch ✏️</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Cho phép tùy chỉnh mã tích hợp (VD: TH-GDHN-01, TH-NLS-02...), lĩnh vực và tự động chuyển đổi sang Tiếng Anh Sư Phạm đúng chuẩn Bộ GD&ĐT.
                </p>

                {/* Live Preview List */}
                <FlexibleIntegrationBadgeList
                  items={customItems}
                  displayMode="bilingual"
                  onOpenEdit={() => setShowFlexibleModal(true)}
                  compact={true}
                />
              </div>
            </>
          )}
        </div>

        {/* Flexible Integration Edit Modal */}
        <FlexibleIntegrationModal
          isOpen={showFlexibleModal}
          title={`Tùy chỉnh mã tích hợp & Dịch Tiếng Anh Sư Phạm - ${row.periodLabel}`}
          periodLabel={row.periodLabel}
          lessonTitle={`${row.unitCode}: ${row.lessonTitle}`}
          initialItems={customItems}
          onClose={() => setShowFlexibleModal(false)}
          onSave={(updatedItems) => {
            setCustomItems(updatedItems);
          }}
        />

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold cursor-pointer"
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Lưu Thiết Lập Tiết Học</span>
          </button>
        </div>
      </div>
    </div>
  );
}
