/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * INCLUSIVE CLASS DISABILITY SUPPORT COMPONENT
 * Section XXXIII: Support for Students with Disabilities
 * 
 * Features:
 * - Two-mode switch: Mode 1 – Standard Class Mode (CV 2345) vs Mode 2 – Inclusive Class Mode
 * - Optional and explicit: system does NOT automatically add disability content unless selected
 * - Disability categories: Physical/Motor, Hearing/Speech, Visual, Intellectual, Neurological/Mental, Other
 * - Teacher notes for specific individual needs
 * - Clear reminder that adaptations appear in RED text in General Objectives and ONE practice activity
 */

import React from 'react';
import { 
  Accessibility, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  UserCheck, 
  Heart, 
  Eye, 
  VolumeX, 
  Brain, 
  Smile, 
  FileEdit,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { DisabilityCategoryType, DisabilitySupportConfig } from '../../types';

export const DISABILITY_OPTIONS: {
  id: DisabilityCategoryType;
  labelEn: string;
  labelVn: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'physical',
    labelEn: 'Physical / Motor Disability',
    labelVn: 'Khuyết tật Vận động',
    description: 'Chỉ tay, gật đầu, dùng thẻ từ to/công cụ hỗ trợ thay thế viết nhanh hoặc vận động mạnh',
    icon: Accessibility
  },
  {
    id: 'hearing_speech',
    labelEn: 'Hearing and/or Speech Disability',
    labelVn: 'Khuyết tật Nghe - Nói',
    description: 'Ngồi đầu bàn, nhìn khẩu hình giáo viên, chấp nhận từ đơn/cử chỉ TPR hoặc tranh ảnh thay thế',
    icon: VolumeX
  },
  {
    id: 'visual',
    labelEn: 'Visual Disability',
    labelVn: 'Khuyết tật Nhìn',
    description: 'Tranh ảnh kích thước lớn độ tương phản cao, học qua kênh âm thanh và vật thật (realia)',
    icon: Eye
  },
  {
    id: 'intellectual',
    labelEn: 'Intellectual Disability',
    labelVn: 'Khuyết tật Trí tuệ',
    description: 'Giảm tải mục tiêu nhận biết 1-2 từ vựng cốt lõi, lệnh đơn giản 1 bước, khen thưởng tích cực',
    icon: Brain
  },
  {
    id: 'neurological_mental',
    labelEn: 'Neurological / Mental Disability',
    labelVn: 'Khuyết tật Thần kinh / Tâm thần',
    description: 'Môi trường học bình tĩnh, nhịp độ thân thiện, tránh gây áp lực, hỗ trợ kiểm soát cảm xúc',
    icon: Heart
  },
  {
    id: 'other',
    labelEn: 'Other / Developmental Disabilities',
    labelVn: 'Khuyết tật Khác / Chậm phát triển',
    description: 'Tiếp cận đa giác quan, chia nhỏ bài tập, hỗ trợ từ bạn học đôi bạn cùng tiến',
    icon: Smile
  }
];

interface InclusiveClassDisabilitySectionProps {
  config: DisabilitySupportConfig;
  onChange: (updated: DisabilitySupportConfig) => void;
  grade?: string | number;
  compact?: boolean;
}

export default function InclusiveClassDisabilitySection({
  config,
  onChange,
  grade = 'Lớp 3',
  compact = false
}: InclusiveClassDisabilitySectionProps) {
  const isInclusive = config.enabled;

  const handleToggleMode = (inclusiveMode: boolean) => {
    if (!inclusiveMode) {
      onChange({
        enabled: false,
        selectedTypes: ['none'],
        teacherNotes: config.teacherNotes,
        studentCount: 0
      });
    } else {
      // Default to physical or keep existing if any
      const existingTypes = config.selectedTypes.filter(t => t !== 'none');
      onChange({
        enabled: true,
        selectedTypes: existingTypes.length > 0 ? existingTypes : ['physical'],
        teacherNotes: config.teacherNotes || '',
        studentCount: config.studentCount || 1
      });
    }
  };

  const handleToggleType = (typeId: DisabilityCategoryType) => {
    if (typeId === 'none') {
      onChange({
        ...config,
        enabled: false,
        selectedTypes: ['none']
      });
      return;
    }

    const currentTypes = config.selectedTypes.filter(t => t !== 'none');
    let nextTypes: DisabilityCategoryType[];

    if (currentTypes.includes(typeId)) {
      nextTypes = currentTypes.filter(t => t !== typeId);
      if (nextTypes.length === 0) {
        // If teacher unchecks all, revert to none
        onChange({
          ...config,
          enabled: false,
          selectedTypes: ['none']
        });
        return;
      }
    } else {
      nextTypes = [...currentTypes, typeId];
    }

    onChange({
      ...config,
      enabled: true,
      selectedTypes: nextTypes
    });
  };

  const handleNotesChange = (text: string) => {
    onChange({
      ...config,
      teacherNotes: text
    });
  };

  return (
    <div className={`rounded-2xl border transition-all ${
      isInclusive 
        ? 'bg-gradient-to-br from-rose-50/90 via-orange-50/50 to-amber-50/80 border-rose-300 dark:bg-rose-950/20 dark:border-rose-800 shadow-sm' 
        : 'bg-slate-50/80 border-slate-200 dark:bg-slate-900/40 dark:border-slate-700'
    } ${compact ? 'p-3' : 'p-4'} space-y-3`}>
      
      {/* Top Header & 2-Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isInclusive 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            <Accessibility className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-fredoka font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                Chế độ Lớp học & Hỗ trợ Học sinh khuyết tật
              </span>
              <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border ${
                isInclusive
                  ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-700'
                  : 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
              }`}>
                {isInclusive ? 'Mode 2: Lớp học Hòa nhập' : 'Mode 1: Lớp chuẩn CV 2345'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isInclusive 
                ? 'Đã bật dạy học phân hóa cho học sinh khuyết tật (Hiển thị CHỮ ĐỎ đúng chuẩn sư phạm)'
                : 'Dạy học theo chuẩn chương trình thông thường (Không thêm nội dung khuyết tật)'}
            </p>
          </div>
        </div>

        {/* 2-Mode Segmented Toggle */}
        <div className="inline-flex p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs shrink-0 text-[11px] font-fredoka font-bold">
          <button
            type="button"
            onClick={() => handleToggleMode(false)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              !isInclusive
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Lớp chuẩn CV 2345</span>
          </button>
          <button
            type="button"
            onClick={() => handleToggleMode(true)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              isInclusive
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-700'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>Lớp học Hòa nhập ♿</span>
          </button>
        </div>
      </div>

      {/* Expanded Inclusive Options if Mode 2 is Active */}
      {isInclusive && (
        <div className="pt-2 border-t border-rose-200/80 dark:border-rose-900/50 space-y-3 animate-fade-in">
          {/* Pedagogical Rule Reminder Banner */}
          <div className="p-2.5 bg-rose-100/90 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 rounded-xl flex items-start gap-2 text-[11px] text-rose-900 dark:text-rose-100 leading-snug">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Quy chuẩn hiển thị bắt buộc: </span>
              Toàn bộ mục tiêu điều chỉnh và biện pháp thích ứng dành riêng cho học sinh khuyết tật sẽ được{' '}
              <strong className="text-red-600 dark:text-red-400 uppercase font-black underline">
                hiển thị bằng chữ màu đỏ (Red Text)
              </strong>
              , chỉ xuất hiện tại <span className="font-bold">Mục tiêu chung</span> và{' '}
              <span className="font-bold">DUY NHẤT 1 hoạt động Luyện tập (Practice)</span>, không làm xáo trộn tiến trình bài học của cả lớp.
            </div>
          </div>

          {/* Disability Categories Checkbox Grid */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <span>Chọn dạng khuyết tật có trong lớp ({grade}):</span>
              </span>
              <span className="text-[10.5px] text-rose-700 dark:text-rose-300 font-medium">
                Đã chọn: {config.selectedTypes.filter(t => t !== 'none').length} dạng
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {DISABILITY_OPTIONS.map((opt) => {
                const isSelected = config.selectedTypes.includes(opt.id);
                const IconComponent = opt.icon;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleToggleType(opt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-rose-500 dark:border-rose-400 shadow-xs ring-1 ring-rose-400/40'
                        : 'bg-white/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected 
                        ? 'bg-rose-600 text-white' 
                        : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-slate-500'}`} />
                        <span className={`font-bold text-xs ${isSelected ? 'text-rose-950 dark:text-rose-100' : 'text-slate-700 dark:text-slate-300'}`}>
                          {opt.labelVn}
                        </span>
                      </div>
                      <p className="text-[9.5px] font-sans text-rose-700 dark:text-rose-300 italic">
                        {opt.labelEn}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Teacher's Specific Notes Text Box (Optional) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileEdit className="w-3.5 h-3.5 text-rose-600" />
              <span>Ghi chú riêng về đặc điểm/nhu cầu của học sinh (Tùy chọn):</span>
            </label>
            <input
              type="text"
              value={config.teacherNotes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="VD: Em Nam cần tranh in khổ A3 và ngồi bàn 1; em An phát âm từng từ đơn và có bạn Hoa ngồi cạnh hỗ trợ..."
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            <p className="text-[10px] text-slate-500 italic">
              * Ghi chú này sẽ được tự động dịch sang tiếng Anh sư phạm và lồng vào phần điều chỉnh dạy học chữ đỏ trong kế hoạch bài dạy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
