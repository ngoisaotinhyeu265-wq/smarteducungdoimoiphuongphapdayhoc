/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  RotateCcw, Sparkles, CheckCircle2, AlertTriangle, 
  Layers, Check, Sliders, BookOpen, ShieldCheck, X, RefreshCw,
  Wand2, ArrowRight
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { CurriculumPlanRow } from '../../types/curriculum2345';

interface RefreshAppendix2ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGrade: string;
  totalYearPeriods: number;
  distinctUnits: { unitCode: string; lessonTitle: string; count: number }[];
  onResetAllToStandard: () => void;
  onAutoOptimizePedagogy: () => void;
  onResetSpecificUnit: (unitCode: string) => void;
  onApplyPreset: (preset: 'all' | 'two_periods' | 'odd_periods' | 'no_reviews') => void;
}

export const RefreshAppendix2Modal: React.FC<RefreshAppendix2ModalProps> = ({
  isOpen,
  onClose,
  selectedGrade,
  totalYearPeriods,
  distinctUnits,
  onResetAllToStandard,
  onAutoOptimizePedagogy,
  onResetSpecificUnit,
  onApplyPreset
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'units' | 'ai'>('quick');
  const [selectedUnitToReset, setSelectedUnitToReset] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    sounds.playSuccess();
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleFullReset = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onResetAllToStandard();
      setIsProcessing(false);
      showFeedback(`Đã làm mới và khôi phục 100% nội dung Phụ lục 2 ${selectedGrade} về chuẩn Bộ GD&ĐT!`);
    }, 400);
  };

  const handleAutoOptimize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onAutoOptimizePedagogy();
      setIsProcessing(false);
      showFeedback(`Đã tự động tối ưu hóa và phân bố nội dung tích hợp chuẩn theo từng Unit & Tiết học!`);
    }, 400);
  };

  const handleUnitReset = (unitCode: string) => {
    onResetSpecificUnit(unitCode);
    showFeedback(`Đã làm mới nội dung tích hợp cho ${unitCode} theo đúng bài học!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-rose-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-fredoka text-lg font-black text-white flex items-center gap-2">
                Làm Mới & Tối Ưu Hóa Phụ Lục 2
              </h3>
              <p className="text-xs text-rose-100 font-medium">
                {selectedGrade} ({totalYearPeriods} tiết/năm) • Khắc phục nội dung tích hợp chưa phù hợp
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Alert */}
        {successMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3 flex items-center gap-2 text-emerald-800 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/70 p-2 gap-1.5">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('quick');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'quick'
                ? 'bg-white text-rose-600 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Làm Mới Nhanh</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('units');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'units'
                ? 'bg-white text-rose-600 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Làm Mới Theo Unit ({distinctUnits.length})</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('ai');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-white text-indigo-600 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Trợ Lý Tối Ưu AI</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          
          {activeTab === 'quick' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Tại sao cần làm mới Phụ lục 2?</span>
                </div>
                <p>
                  Khi kế hoạch dạy học của tổ chuyên môn có điều chỉnh, hoặc nội dung tích hợp bị trùng lặp giữa các Unit, tính năng này sẽ tự động phân tích từ vựng, ngữ pháp, mẫu câu của từng bài để tạo nội dung tích hợp chuẩn xác, không rập khuôn.
                </p>
              </div>

              {/* Option 1: Khôi phục chuẩn 100% */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 space-y-2 hover:border-rose-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <h4 className="font-fredoka font-black text-sm text-rose-900">
                      Khôi phục 100% chuẩn tối ưu Bộ GD&ĐT
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-extrabold uppercase">
                    Khuyên dùng
                  </span>
                </div>
                <p className="text-xs text-rose-800 font-medium">
                  Xóa các cấu hình tùy chỉnh bị lỗi, tái thiết lập toàn bộ 35 tuần ({totalYearPeriods} tiết) với nội dung tích hợp đặc thù gắn liền với từng bài học sách Global Success.
                </p>
                <button
                  disabled={isProcessing}
                  onClick={handleFullReset}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-fredoka font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>Khôi Phục Chuẩn Toàn Bộ Kế Hoạch 35 Tuần</span>
                </button>
              </div>

              {/* Option 2: Tự động phân bổ sư phạm */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2 hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <h4 className="font-fredoka font-bold text-sm text-indigo-950">
                      Tự động chuẩn hóa nội dung & phạm vi từng tiết
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    Thông minh
                  </span>
                </div>
                <p className="text-xs text-indigo-800/80">
                  Tự động gán phạm vi tích hợp khoa học: Tiết 1 (HĐ 1,2,3 - Khám phá), Tiết 2 (HĐ 4,5,6 - Vận dụng), Tiết Phonics (Âm & Dự án), đồng thời loại trừ tuần ôn tập và kiểm tra định kỳ.
                </p>
                <button
                  disabled={isProcessing}
                  onClick={handleAutoOptimize}
                  className="w-full mt-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tự Động Chuẩn Hóa Phân Bổ Sư Phạm</span>
                </button>
              </div>

              {/* Option 3: Presets */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onApplyPreset('two_periods');
                    showFeedback('Đã đặt cấu hình: Chỉ tích hợp 2 tiết đầu mỗi tuần!');
                  }}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-all cursor-pointer"
                >
                  <p className="font-fredoka font-bold text-xs text-gray-800">Tích hợp 2 tiết/tuần</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Tiết 1 & Tiết 2 mỗi tuần</p>
                </button>

                <button
                  onClick={() => {
                    onApplyPreset('no_reviews');
                    showFeedback('Đã loại bỏ tích hợp ở các bài Ôn tập & Kiểm tra!');
                  }}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-all cursor-pointer"
                >
                  <p className="font-fredoka font-bold text-xs text-gray-800">Bỏ qua Review/Exam</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Giữ nguyên tiết ôn thi</p>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'units' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 font-medium">
                Chọn Unit cần làm mới để tái tạo lại nội dung tích hợp chuẩn xác theo chủ đề, từ vựng và mẫu câu của riêng Unit đó:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto p-1">
                {distinctUnits.map((u) => (
                  <div
                    key={u.unitCode}
                    className="p-3 rounded-2xl border border-gray-200 bg-white hover:bg-rose-50/50 hover:border-rose-200 transition-all flex items-center justify-between gap-2 shadow-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-fredoka font-bold text-xs text-gray-800 truncate">
                        {u.unitCode}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate" title={u.lessonTitle}>
                        {u.lessonTitle}
                      </p>
                      <span className="text-[9px] text-indigo-600 font-semibold">
                        {u.count} tiết học
                      </span>
                    </div>

                    <button
                      onClick={() => handleUnitReset(u.unitCode)}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-500 text-rose-700 hover:text-white font-fredoka font-bold text-[11px] transition-all shrink-0 cursor-pointer flex items-center gap-1"
                      title={`Làm mới nội dung tích hợp cho ${u.unitCode}`}
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Làm mới</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl mx-auto shadow-lg shadow-indigo-500/20">
                🤖
              </div>
              <div className="space-y-1.5">
                <h4 className="font-fredoka font-extrabold text-base text-gray-800">
                  Trợ Lý Tối Ưu Hóa Kế Hoạch Dạy Học AI
                </h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  AI sẽ quét toàn bộ 35 tuần của {selectedGrade}, đối chiếu từng tiết học với hướng dẫn của CV 2345, QĐ 2422 (AI), TT 02/2025 (NLS) và CV 3456 để tối ưu hóa đồng bộ.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Tự động nhận diện từ vựng và ngữ pháp của từng bài học</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Gán mã năng lực AI (AI 1.C1.1, AI 2.C1.1...) chính xác theo hoạt động</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Tích hợp ATGT và Kỹ năng sống thực tế, phù hợp lứa tuổi tiểu học</span>
                </div>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleAutoOptimize}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-fredoka font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bắt Đầu Tối Ưu Hóa Toàn Diện Với AI</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Dữ liệu tuân thủ chuẩn Công văn 2345/BGDĐT-GDTH</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-fredoka font-bold text-xs transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};

export default RefreshAppendix2Modal;
