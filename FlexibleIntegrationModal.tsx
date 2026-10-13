/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal cho phép giáo viên nhập linh hoạt nội dung tích hợp liên môn:
 * - Mã tích hợp (VD: TH-GDHN-01, TH-KNS-02, TH-NLS-03...)
 * - Lĩnh vực tích hợp (Kỹ năng sống, An toàn giao thông, Năng lực số, Giáo dục hòa nhập học sinh khuyết tật...)
 * - Tự động chuyển toàn bộ nội dung tiếng Việt sang tiếng Anh đúng chuẩn sư phạm
 * - Hiển thị đúng màu sắc đặc trưng của từng lĩnh vực
 */

import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Cpu, ShieldAlert, HeartHandshake, 
  Accessibility, Compass, Leaf, Flame, Sliders, Plus, Trash2,
  RefreshCw, Languages, ArrowRight, Info, CheckCircle2, Copy
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { 
  INTEGRATION_DOMAINS, 
  IntegrationDomainId, 
  FlexibleIntegrationItem, 
  translateToPedagogicalEnglish, 
  generateIntegrationCode 
} from '../../utils/pedagogicalIntegrationTranslator';

interface FlexibleIntegrationModalProps {
  isOpen: boolean;
  title: string;
  periodLabel: string;
  lessonTitle: string;
  initialItems: FlexibleIntegrationItem[];
  onClose: () => void;
  onSave: (items: FlexibleIntegrationItem[]) => void;
}

export default function FlexibleIntegrationModal({
  isOpen,
  title,
  periodLabel,
  lessonTitle,
  initialItems,
  onClose,
  onSave
}: FlexibleIntegrationModalProps) {
  if (!isOpen) return null;

  const [items, setItems] = useState<FlexibleIntegrationItem[]>(() => {
    if (initialItems && initialItems.length > 0) {
      return JSON.parse(JSON.stringify(initialItems));
    }
    // Default 2 standard items if empty
    return [
      {
        id: 'init-1',
        code: 'TH-NLS-01',
        domain: 'nls',
        domainLabelVn: INTEGRATION_DOMAINS.nls.nameVn,
        domainLabelEn: INTEGRATION_DOMAINS.nls.nameEn,
        contentVn: 'Khai thác kho học liệu số hoclieu.vn và video tương tác.',
        contentEn: 'Navigate digital learning repositories on hoclieu.vn and interactive video tutorials.',
        enabled: true
      },
      {
        id: 'init-2',
        code: 'TH-GDHN-01',
        domain: 'gdhn',
        domainLabelVn: INTEGRATION_DOMAINS.gdhn.nameVn,
        domainLabelEn: INTEGRATION_DOMAINS.gdhn.nameEn,
        contentVn: 'Hỗ trợ học sinh khuyết tật nhìn/nghe qua tranh ảnh phóng to và bạn học đồng hành.',
        contentEn: 'Support students with visual/auditory impairments using enlarged visual flashcards and collaborative peer scaffolding.',
        enabled: true
      }
    ];
  });

  // Active domain tab for adding new items
  const [selectedDomain, setSelectedDomain] = useState<IntegrationDomainId>('gdhn');
  const [inputCode, setInputCode] = useState<string>(() => generateIntegrationCode('gdhn', 1));
  const [inputVn, setInputVn] = useState<string>('');
  const [inputEn, setInputEn] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // When changing domain in add form, auto-generate code prefix
  const handleSelectDomain = (domainId: IntegrationDomainId) => {
    sounds.playClick?.();
    setSelectedDomain(domainId);
    // Count existing items of this domain
    const count = items.filter(i => i.domain === domainId).length + 1;
    setInputCode(generateIntegrationCode(domainId, count));
  };

  // Auto translate the current input
  const handleAutoTranslateInput = () => {
    if (!inputVn.trim()) {
      showToast('Vui lòng nhập nội dung Tiếng Việt trước khi dịch.');
      return;
    }
    sounds.playCoin?.();
    setIsTranslating(true);
    setTimeout(() => {
      const en = translateToPedagogicalEnglish(inputVn, selectedDomain);
      setInputEn(en);
      setIsTranslating(false);
      showToast('Đã chuyển sang Tiếng Anh Sư Phạm chuẩn xác! ✨');
    }, 150);
  };

  // Add new item to list
  const handleAddItem = () => {
    if (!inputVn.trim()) {
      showToast('Vui lòng nhập nội dung tích hợp.');
      return;
    }

    sounds.playLevelUp?.();
    const finalEn = inputEn.trim() || translateToPedagogicalEnglish(inputVn, selectedDomain);
    const domainMeta = INTEGRATION_DOMAINS[selectedDomain];

    const newItem: FlexibleIntegrationItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      code: inputCode.trim() || generateIntegrationCode(selectedDomain, items.length + 1),
      domain: selectedDomain,
      domainLabelVn: domainMeta.nameVn,
      domainLabelEn: domainMeta.nameEn,
      contentVn: inputVn.trim(),
      contentEn: finalEn,
      enabled: true
    };

    setItems(prev => [...prev, newItem]);
    setInputVn('');
    setInputEn('');
    // Auto increment code
    const count = items.filter(i => i.domain === selectedDomain).length + 2;
    setInputCode(generateIntegrationCode(selectedDomain, count));
    showToast(`Đã thêm mã [${newItem.code}] thành công!`);
  };

  // Translate all items currently in list
  const handleTranslateAllItems = () => {
    sounds.playCoin?.();
    setIsTranslating(true);
    setTimeout(() => {
      setItems(prev => prev.map(item => ({
        ...item,
        contentEn: translateToPedagogicalEnglish(item.contentVn, item.domain)
      })));
      setIsTranslating(false);
      showToast('Đã tự động chuyển toàn bộ sang Tiếng Anh Sư Phạm! 🌐');
    }, 200);
  };

  // Remove an item
  const handleRemoveItem = (id: string) => {
    sounds.playClick?.();
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // Toggle item enabled
  const handleToggleItem = (id: string) => {
    sounds.playClick?.();
    setItems(prev => prev.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i));
  };

  // Choose a pre-defined suggestion
  const handlePickSuggestion = (s: { code: string; vn: string; en: string }) => {
    sounds.playClick?.();
    setInputCode(s.code);
    setInputVn(s.vn);
    setInputEn(s.en);
  };

  // Save changes
  const handleSave = () => {
    sounds.playCoin?.();
    onSave(items);
    onClose();
  };

  const domainMetaList = Object.values(INTEGRATION_DOMAINS);
  const activeMeta = INTEGRATION_DOMAINS[selectedDomain];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-[28px] w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] text-left">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20 shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-purple-950 font-fredoka font-black text-[11px] uppercase tracking-wider">
                  {periodLabel || 'Tiết Học'}
                </span>
                <span className="text-xs text-indigo-200 font-semibold truncate max-w-xs">
                  {title || 'Tùy Chỉnh Nội Dung Tích Hợp'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-fredoka mt-0.5 text-white line-clamp-1">
                {lessonTitle || 'Kế Hoạch Dạy Học & Phụ Lục 2'}
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

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          
          {/* Action Bar: Auto-Translate All & Overview */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-3.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-medium">
              <Languages className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>
                Tổng cộng <strong>{items.length}</strong> mục tích hợp liên môn (Bảo đảm chuẩn sư phạm Bộ GD&ĐT).
              </span>
            </div>

            <button
              type="button"
              disabled={isTranslating || items.length === 0}
              onClick={handleTranslateAllItems}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Tự động dịch lại toàn bộ nội dung tiếng Việt sang tiếng Anh đúng chuẩn sư phạm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
              <span>Chuyển Tất Cả Sang Tiếng Anh Sư Phạm 🔄</span>
            </button>
          </div>

          {/* Current Integration Items List with Domain Color Coding */}
          <div className="space-y-2.5">
            <label className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center justify-between">
              <span>📋 Danh sách nội dung tích hợp đã thiết lập:</span>
              <span className="text-[11px] text-slate-500 font-normal">Hiển thị đúng màu sắc chuẩn từng lĩnh vực</span>
            </label>

            {items.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
                Chưa có nội dung tích hợp nào. Hãy chọn lĩnh vực bên dưới và thêm mới!
              </div>
            ) : (
              <div className="space-y-2.5">
                {items.map((item) => {
                  const meta = INTEGRATION_DOMAINS[item.domain] || INTEGRATION_DOMAINS.custom;
                  return (
                    <div 
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all ${meta.cardBg} ${meta.cardBorder} ${meta.cardText} shadow-xs relative flex flex-col gap-2`}
                    >
                      {/* Item Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-lg border font-mono font-bold text-[11px] shadow-xs ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}>
                            [{item.code}]
                          </span>
                          <span className="font-bold text-xs">
                            {meta.nameVn}
                          </span>
                          <span className="text-[10px] opacity-75 font-serif italic hidden sm:inline">
                            ({meta.nameEn})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleItem(item.id)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all border ${
                              item.enabled !== false 
                                ? 'bg-emerald-600 text-white border-emerald-700' 
                                : 'bg-slate-200 text-slate-600 border-slate-300'
                            }`}
                          >
                            {item.enabled !== false ? 'Đang Bật' : 'Tạm Tắt'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer transition-all"
                            title="Xóa mục này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content: Vietnamese */}
                      <div className="bg-white/80 dark:bg-slate-900/60 rounded-xl p-2.5 border border-white/60 dark:border-slate-800/60 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <span>🇻🇳 Tiếng Việt:</span>
                        </div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 text-[11.5px] leading-relaxed">
                          {item.contentVn}
                        </p>
                      </div>

                      {/* Content: Pedagogical English */}
                      <div className="bg-white/95 dark:bg-slate-900/80 rounded-xl p-2.5 border border-blue-200 dark:border-blue-900/50 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                          <span className="flex items-center gap-1">
                            <span>🇬🇧 Tiếng Anh Sư Phạm:</span>
                            <span className="text-[9px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-1.5 py-0.2 rounded font-mono font-bold">Standard</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              sounds.playClick?.();
                              const updatedEn = translateToPedagogicalEnglish(item.contentVn, item.domain);
                              setItems(prev => prev.map(i => i.id === item.id ? { ...i, contentEn: updatedEn } : i));
                              showToast('Đã làm mới bản dịch Tiếng Anh!');
                            }}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1 text-[10px]"
                            title="Dịch lại mục này"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Dịch lại</span>
                          </button>
                        </div>
                        <p className="font-medium text-blue-950 dark:text-blue-100 text-[11.5px] leading-relaxed italic">
                          {item.contentEn || translateToPedagogicalEnglish(item.contentVn, item.domain)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* New Integration Item Input Form */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Thêm Mới Nội Dung Tích Hợp Linh Hoạt:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Căn cứ: {activeMeta.circularRef}
              </span>
            </div>

            {/* Select Domain Tabs with Color Accents */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                1. Chọn Lĩnh Vực Tích Hợp:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {domainMetaList.map((dom) => {
                  const isSelected = selectedDomain === dom.id;
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      onClick={() => handleSelectDomain(dom.id)}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? `${dom.badgeBg} ${dom.badgeBorder} ${dom.badgeText} shadow-sm ring-2 ring-blue-400/40` 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold text-[11px] line-clamp-1">{dom.nameVn}</span>
                      <span className="text-[9.5px] font-mono opacity-80 mt-0.5">{dom.codePrefix}-...</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code and Suggestions Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
                  <span>2. Mã Tích Hợp:</span>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick?.();
                      setInputCode(generateIntegrationCode(selectedDomain, items.length + 1));
                    }}
                    className="text-blue-600 hover:underline text-[10px] cursor-pointer"
                  >
                    ⚡ Tạo mã tự động
                  </button>
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="VD: TH-GDHN-01"
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-mono font-bold text-xs text-blue-900 dark:text-blue-200 uppercase"
                />
              </div>

              {/* Quick suggestion selector */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                  💡 Gợi ý nhanh chuẩn sư phạm (Bấm để chọn):
                </label>
                <div className="flex flex-wrap gap-1">
                  {activeMeta.defaultSuggestions.slice(0, 3).map((sugg, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePickSuggestion(sugg)}
                      className="px-2 py-1 bg-white dark:bg-slate-900 hover:bg-blue-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] cursor-pointer transition-all text-left line-clamp-1 max-w-[210px]"
                      title={sugg.vn}
                    >
                      {sugg.code}: {sugg.vn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vietnamese Content Textarea */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  3. Nội Dung Tích Hợp (Tiếng Việt):
                </label>
                <button
                  type="button"
                  onClick={handleAutoTranslateInput}
                  disabled={!inputVn.trim() || isTranslating}
                  className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg font-bold text-[10.5px] cursor-pointer transition-all flex items-center gap-1 disabled:opacity-50"
                  title="Dịch nội dung này sang Tiếng Anh Sư Phạm ngay lập tức"
                >
                  <RefreshCw className={`w-3 h-3 ${isTranslating ? 'animate-spin' : ''}`} />
                  <span>Dịch sang Tiếng Anh Sư Phạm 🇬🇧</span>
                </button>
              </div>
              <textarea
                value={inputVn}
                onChange={(e) => setInputVn(e.target.value)}
                placeholder={`Nhập nội dung tích hợp ${activeMeta.nameVn.toLowerCase()} bằng tiếng Việt...`}
                rows={2}
                className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pedagogical English Output / Edit Textarea */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-blue-900 dark:text-blue-300 flex items-center justify-between">
                <span>4. Nội Dung Tiếng Anh Sư Phạm (Tự động chuyển đổi hoặc tùy chỉnh):</span>
                <span className="text-[10px] text-slate-500 font-normal">Chuẩn Cambridge / MOET</span>
              </label>
              <textarea
                value={inputEn}
                onChange={(e) => setInputEn(e.target.value)}
                placeholder="Nội dung Tiếng Anh Sư Phạm sẽ tự động xuất hiện ở đây khi dịch hoặc có thể gõ trực tiếp..."
                rows={2}
                className="w-full p-2.5 bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-medium text-blue-950 dark:text-blue-100 resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!inputVn.trim()}
                onClick={handleAddItem}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 text-white font-fredoka font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Vào Danh Sách Tích Hợp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-fredoka font-bold rounded-xl text-xs cursor-pointer transition-all"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-fredoka font-black rounded-xl text-xs shadow-lg cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Lưu & Áp Dụng Cho Tiết Học</span>
          </button>
        </div>

        {/* Floating Toast Message */}
        {toastMsg && (
          <div className="absolute bottom-16 right-6 z-50 bg-indigo-950 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-indigo-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
