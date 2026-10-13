/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Component hiển thị danh sách các mục tích hợp liên môn theo đúng màu sắc quy định
 * Hỗ trợ hiển thị Song ngữ (Anh - Việt), Tiếng Anh Sư Phạm, hoặc Tiếng Việt.
 */

import React from 'react';
import { 
  Sparkles, Cpu, ShieldAlert, HeartHandshake, Accessibility, 
  Compass, Leaf, Flame, Sliders, Edit3, Globe
} from 'lucide-react';
import { 
  FlexibleIntegrationItem, 
  INTEGRATION_DOMAINS, 
  IntegrationDomainId 
} from '../../utils/pedagogicalIntegrationTranslator';

export type IntegrationDisplayMode = 'bilingual' | 'english_only' | 'vietnamese_only';

interface FlexibleIntegrationBadgeListProps {
  items: FlexibleIntegrationItem[];
  displayMode?: IntegrationDisplayMode;
  onOpenEdit?: () => void;
  compact?: boolean;
  activityScope?: string;
}

export default function FlexibleIntegrationBadgeList({
  items,
  displayMode = 'bilingual',
  onOpenEdit,
  compact = false,
  activityScope
}: FlexibleIntegrationBadgeListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="space-y-1.5 text-left">
        {activityScope && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/70 border-2 border-amber-400 dark:border-amber-500 text-amber-950 dark:text-amber-100 font-fredoka font-bold text-[10px] shadow-2xs">
            <span className="text-amber-700 dark:text-amber-300">📌</span>
            <span>Vị trí tích hợp:</span>
            <span className="underline decoration-amber-500">
              {activityScope === 'act123'
                ? 'HĐ 1, 2, 3 (Khởi động & Khám phá)'
                : activityScope === 'act456'
                ? 'HĐ 4, 5, 6 (Luyện tập & Vận dụng)'
                : activityScope === 'act_1_2'
                ? 'HĐ 1, 2 (Tiết 1)'
                : activityScope === 'act_3_4_5'
                ? 'HĐ 3, 4, 5 (Tiết 2)'
                : activityScope === 'act_6_7_8'
                ? 'HĐ 6, 7, 8 (Tiết 3)'
                : 'Toàn bộ tiết dạy'}
            </span>
          </div>
        )}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-[10.5px] flex items-center justify-between">
          <span>Tiến độ chuẩn SGK (Chưa cài đặt mã tích hợp)</span>
          {onOpenEdit && (
            <button
              type="button"
              onClick={onOpenEdit}
              className="text-blue-600 hover:underline font-bold text-[10px] cursor-pointer flex items-center gap-0.5"
            >
              <Edit3 className="w-3 h-3" />
              <span>Thêm</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const getDomainIcon = (domain: IntegrationDomainId) => {
    switch (domain) {
      case 'gdhn': return <Accessibility className="w-3.5 h-3.5 shrink-0" />;
      case 'nls': return <Cpu className="w-3.5 h-3.5 shrink-0" />;
      case 'kns': return <HeartHandshake className="w-3.5 h-3.5 shrink-0" />;
      case 'atgt': return <ShieldAlert className="w-3.5 h-3.5 shrink-0" />;
      case 'ai': return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
      case 'ethics': return <Compass className="w-3.5 h-3.5 shrink-0" />;
      case 'environment': return <Leaf className="w-3.5 h-3.5 shrink-0" />;
      case 'stem': return <Flame className="w-3.5 h-3.5 shrink-0" />;
      default: return <Sliders className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <div className="space-y-1.5 text-left">
      {/* Vị trí tích hợp: Bôi màu vàng đóng khung nổi bật */}
      {activityScope && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/70 border-2 border-amber-400 dark:border-amber-500 text-amber-950 dark:text-amber-100 font-fredoka font-bold text-[10.5px] shadow-2xs">
          <span className="text-amber-700 dark:text-amber-300">📌</span>
          <span>Vị trí tích hợp:</span>
          <span className="underline decoration-amber-500 decoration-2">
            {activityScope === 'act123'
              ? 'Hoạt động 1, 2, 3 (Khởi động & Khám phá)'
              : activityScope === 'act456'
              ? 'Hoạt động 4, 5, 6 (Luyện tập & Vận dụng)'
              : activityScope === 'act_1_2'
              ? 'Hoạt động 1, 2 (Tiết 1)'
              : activityScope === 'act_3_4_5'
              ? 'Hoạt động 3, 4, 5 (Tiết 2)'
              : activityScope === 'act_6_7_8'
              ? 'Hoạt động 6, 7, 8 (Tiết 3)'
              : 'Toàn bộ hoạt động trong tiết'}
          </span>
        </div>
      )}
      {items.map((item) => {
        if (item.enabled === false) return null;
        const meta = INTEGRATION_DOMAINS[item.domain] || INTEGRATION_DOMAINS.custom;
        
        return (
          <div
            key={item.id || item.code}
            className={`rounded-xl border transition-all ${meta.cardBg} ${meta.cardBorder} ${meta.cardText} ${
              compact ? 'p-1.5' : 'p-2'
            } shadow-2xs space-y-1`}
          >
            {/* Header: Code & Domain Name with distinct badge */}
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 rounded-md border font-mono font-bold text-[9.5px] uppercase shadow-2xs ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText} flex items-center gap-1`}>
                  {getDomainIcon(item.domain)}
                  <span>{item.code}</span>
                </span>
                <span className="font-bold text-[10.5px] leading-tight">
                  {meta.nameVn}
                </span>
              </div>

              <span className="text-[9px] opacity-75 font-serif italic hidden md:inline">
                {meta.nameEn}
              </span>
            </div>

            {/* Content Display based on displayMode */}
            <div className="text-[10px] leading-relaxed space-y-0.5">
              {/* Vietnamese content */}
              {(displayMode === 'bilingual' || displayMode === 'vietnamese_only') && (
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {item.contentVn}
                </p>
              )}

              {/* Pedagogical English content */}
              {(displayMode === 'bilingual' || displayMode === 'english_only') && (
                <p className={`font-medium italic text-blue-900 dark:text-blue-200 ${
                  displayMode === 'bilingual' ? 'text-[9.5px] pt-0.5 border-t border-black/5 dark:border-white/5' : ''
                }`}>
                  <span className="font-sans font-bold not-italic text-[9px] uppercase opacity-80 mr-1 text-blue-800 dark:text-blue-300">
                    [EN]:
                  </span>
                  {item.contentEn || item.contentVn}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Optional edit button at bottom */}
      {onOpenEdit && (
        <div className="pt-0.5 flex justify-end">
          <button
            type="button"
            onClick={onOpenEdit}
            className="text-[9.5px] text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-2.5 h-2.5" />
            <span>Tùy chỉnh mã & nội dung tích hợp</span>
          </button>
        </div>
      )}
    </div>
  );
}
