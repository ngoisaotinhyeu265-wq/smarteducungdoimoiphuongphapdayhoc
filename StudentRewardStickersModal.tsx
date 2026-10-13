/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal Bộ 50+ Nhãn Dán Khen Thưởng Học Sinh Động
 * Phục vụ giáo viên khen thưởng, đánh giá thường xuyên theo Thông tư 27/2020/TT-BGDĐT
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  X, Search, Copy, Check, Download, Printer, Sparkles, 
  Heart, Star, Award, ShieldCheck, Filter, Send, Edit3, 
  Smile, Share2, Layers, RefreshCw
} from 'lucide-react';
import { 
  STUDENT_REWARD_STICKERS, 
  STICKER_CATEGORIES, 
  StudentSticker, 
  generateStickerHtmlBadge 
} from '../data/studentRewardStickers';
import { sounds } from '../lib/audio';

interface StudentRewardStickersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertToPlan?: (stickerHtml: string) => void;
}

export default function StudentRewardStickersModal({
  isOpen,
  onClose,
  onInsertToPlan
}: StudentRewardStickersModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Custom stamp settings
  const [showCustomStampModal, setShowCustomStampModal] = useState<boolean>(false);
  const [activeStickerForStamp, setActiveStickerForStamp] = useState<StudentSticker | null>(null);
  const [studentNameInput, setStudentNameInput] = useState<string>('Nguyễn Bảo Nam');
  const [teacherNameInput, setTeacherNameInput] = useState<string>('Cô Thanh');
  const [stampDateInput, setStampDateInput] = useState<string>(() => {
    const today = new Date();
    return `Ngày ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  });

  // Print A4 sheet mode
  const [isPrintA4Mode, setIsPrintA4Mode] = useState<boolean>(false);

  // Hidden canvas ref for downloading high-res PNG
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter stickers
  const filteredStickers = useMemo(() => {
    return STUDENT_REWARD_STICKERS.filter(stk => {
      const matchCategory = selectedCategory === 'all' || stk.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        stk.title.toLowerCase().includes(q) ||
        stk.englishTitle.toLowerCase().includes(q) ||
        stk.quote.toLowerCase().includes(q) ||
        (stk.scoreTag && stk.scoreTag.toLowerCase().includes(q)) ||
        stk.categoryName.toLowerCase().includes(q) ||
        stk.suitableFor.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Copy sticker HTML to clipboard
  const handleCopySticker = async (sticker: StudentSticker, customStudent?: string) => {
    sounds.playClick();
    const htmlBadge = generateStickerHtmlBadge(
      sticker, 
      customStudent || (activeStickerForStamp?.id === sticker.id ? studentNameInput : undefined), 
      teacherNameInput, 
      stampDateInput
    );

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const textBlob = new Blob([htmlBadge], { type: 'text/html' });
        const plainBlob = new Blob([`[STAMP] ${sticker.emoji} ${sticker.title} - "${sticker.quote}"`], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': textBlob,
            'text/plain': plainBlob
          })
        ]);
      } else {
        await navigator.clipboard.writeText(htmlBadge);
      }
      setCopiedId(sticker.id);
      sounds.playCoin();
      showToast(`Đã sao chép "${sticker.title}"! Hãy dán (Ctrl+V) vào Word, PowerPoint hoặc Zalo!`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      // Fallback plain copy
      navigator.clipboard.writeText(htmlBadge);
      setCopiedId(sticker.id);
      showToast(`Đã sao chép mã nhãn dán "${sticker.title}"!`);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Download high-resolution PNG using HTML5 Canvas
  const handleDownloadPng = (sticker: StudentSticker, customStudent?: string) => {
    sounds.playClick();
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background rounded rectangle
    ctx.clearRect(0, 0, 600, 600);
    
    // Gradient or white card
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.12)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;
    
    // Draw rounded card
    const r = 40;
    const x = 30, y = 30, w = 540, h = 540;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';

    // Border
    ctx.lineWidth = 8;
    ctx.strokeStyle = sticker.accentColor || '#f59e0b';
    ctx.stroke();

    // Inner subtle border
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();

    // Draw Emoji
    ctx.font = '120px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sticker.emoji, 300, 160);

    // Draw Title
    ctx.font = 'bold 36px "Segoe UI", Tahoma, sans-serif';
    ctx.fillStyle = '#111827';
    ctx.fillText(sticker.title, 300, 270);

    // Draw Tag Pill
    if (sticker.scoreTag) {
      const tagText = sticker.scoreTag;
      ctx.font = 'bold 22px "Segoe UI", sans-serif';
      const textMetrics = ctx.measureText(tagText);
      const pillW = textMetrics.width + 40;
      const pillH = 38;
      const pillX = 300 - pillW / 2;
      const pillY = 305;

      ctx.fillStyle = sticker.accentColor || '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 20);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(tagText, 300, pillY + 26);
    }

    // Draw Quote
    ctx.font = 'italic 24px "Segoe UI", sans-serif';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(`"${sticker.quote}"`, 300, 390);

    // Draw Student & Teacher note if customized
    const student = customStudent || (activeStickerForStamp?.id === sticker.id ? studentNameInput : '');
    if (student) {
      ctx.font = 'bold 24px "Segoe UI", sans-serif';
      ctx.fillStyle = '#1e3a8a';
      ctx.fillText(`Khen ngợi em: ${student}`, 300, 445);
    }

    ctx.font = '18px "Segoe UI", sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`${teacherNameInput} • ${stampDateInput}`, 300, student ? 485 : 460);

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Sticker_${sticker.id}_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    sounds.playCoin();
    showToast(`Đã tải ảnh nhãn dán "${sticker.title}" (PNG chất lượng cao)!`);
  };

  // Insert to current active lesson plan
  const handleInsertToPlan = (sticker: StudentSticker) => {
    sounds.playClick();
    const htmlBadge = generateStickerHtmlBadge(
      sticker, 
      activeStickerForStamp?.id === sticker.id ? studentNameInput : undefined,
      teacherNameInput,
      stampDateInput
    );
    if (onInsertToPlan) {
      onInsertToPlan(htmlBadge);
      showToast(`Đã chèn nhãn dán vào Kế hoạch bài dạy!`);
    } else {
      handleCopySticker(sticker);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in text-left">
        <div className="bg-white rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl border-4 border-pink-300 flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-5 sm:p-6 text-white flex items-center justify-between relative overflow-hidden shrink-0">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-3.5 z-10">
              <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/30 animate-bounce">
                🎨
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-fredoka font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wide">
                    Bộ 50+ Nhãn Dán Khen Thưởng Học Sinh Động
                  </h2>
                  <span className="bg-yellow-300 text-purple-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                    ĐÃ SỞ HỮU VĨNH VIỄN 👑
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-pink-100 font-medium mt-0.5">
                  Chuẩn đánh giá thường xuyên Thông tư 27/2020/TT-BGDĐT • 1-Click sao chép vào Word, PowerPoint, in A4 & tạo con dấu khen thưởng!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-purple-950 flex items-center justify-center transition-all cursor-pointer font-bold z-10 hover:scale-110 shrink-0"
              title="Đóng bảng nhãn dán"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="p-3.5 sm:p-4 bg-pink-50/70 border-b border-pink-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhãn dán (vd: điểm 10, superstar, tiến bộ, chữ đẹp...)"
                className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-pink-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowCustomStampModal(true);
                }}
                className="px-3.5 py-2 bg-white hover:bg-pink-100 text-purple-950 font-fredoka font-bold text-xs rounded-xl border border-pink-300 shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Tạo con dấu khen thưởng có tên học sinh và lời phê"
              >
                <Edit3 className="w-3.5 h-3.5 text-pink-600" />
                <span>Đóng Dấu Tên Em ✍️</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsPrintA4Mode(!isPrintA4Mode);
                }}
                className={`px-3.5 py-2 font-fredoka font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  isPrintA4Mode
                    ? 'bg-purple-600 text-white border border-purple-700'
                    : 'bg-white hover:bg-purple-50 text-purple-950 border border-purple-300'
                }`}
                title="Xem và in bảng nhãn dán khổ giấy A4 để dán vào vở thật"
              >
                <Printer className="w-3.5 h-3.5 text-purple-600" />
                <span>{isPrintA4Mode ? 'Trở lại xem thẻ' : 'In Bảng Sticker A4 🖨️'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            {STICKER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-fredoka font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm scale-102'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="mx-6 mt-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs font-bold animate-bounce shadow-md">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900 font-black ml-2">✕</button>
            </div>
          )}

          {/* Main Content Area */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            
            {/* A4 PRINT VIEW */}
            {isPrintA4Mode ? (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Printer className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>
                      <b>Chế độ in bảng A4:</b> Các nhãn dán được xếp thẳng hàng trên khổ A4 chuẩn đường viền cắt dán. Cô nhấn nút <b>"In Ngay"</b> bên cạnh để in trực tiếp ra giấy Decal dán vào vở học sinh!
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-purple-950 font-fredoka font-black rounded-xl text-xs shadow-md cursor-pointer shrink-0 ml-3 flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>In Bảng Này Ngay 🖨️</span>
                  </button>
                </div>

                <div 
                  id="printable-sticker-sheet"
                  className="bg-white p-8 border-2 border-dashed border-gray-300 rounded-2xl shadow-inner grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {filteredStickers.map((stk) => (
                    <div 
                      key={stk.id}
                      className="border-2 border-dashed rounded-2xl p-3 text-center flex flex-col items-center justify-center space-y-1 bg-gray-50/50 hover:bg-white"
                      style={{ borderColor: stk.accentColor }}
                    >
                      <span className="text-4xl animate-bounce" style={{ animationDuration: '3s' }}>{stk.emoji}</span>
                      <p className="font-bold text-xs text-gray-900">{stk.title}</p>
                      {stk.scoreTag && (
                        <span 
                          className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: stk.accentColor }}
                        >
                          {stk.scoreTag}
                        </span>
                      )}
                      <p className="text-[10px] text-gray-500 italic line-clamp-1">"{stk.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* CARD GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStickers.map((sticker) => {
                  const isCopied = copiedId === sticker.id;

                  return (
                    <div 
                      key={sticker.id}
                      className="bg-white rounded-2xl border-2 border-gray-200 hover:border-pink-400 p-4 transition-all duration-200 shadow-xs hover:shadow-xl flex flex-col justify-between group relative overflow-hidden text-left"
                    >
                      {/* Top Accent Gradient Bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${sticker.bgGradient}`} />

                      {/* Header row inside card */}
                      <div className="flex items-start justify-between gap-2 pt-1">
                        <span 
                          className="text-[10px] font-black px-2 py-0.5 rounded-full text-white shadow-xs"
                          style={{ backgroundColor: sticker.accentColor }}
                        >
                          {sticker.scoreTag || sticker.categoryName}
                        </span>

                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          #{sticker.id.replace('stk_', '')}
                        </span>
                      </div>

                      {/* Emoji & Animated Mascot */}
                      <div className="my-3 flex flex-col items-center justify-center text-center">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-gray-100 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-3 cursor-pointer"
                          style={{ backgroundColor: `${sticker.accentColor}15` }}
                          onClick={() => handleCopySticker(sticker)}
                          title="Nhấn để sao chép nhanh"
                        >
                          <span className={
                            sticker.animation === 'bounce' ? 'animate-bounce' :
                            sticker.animation === 'pulse' ? 'animate-pulse' :
                            sticker.animation === 'wiggle' ? 'animate-wiggle' :
                            sticker.animation === 'sparkle' ? 'animate-spin-slow' : 'animate-float'
                          }>
                            {sticker.emoji}
                          </span>
                        </div>

                        <h4 className="font-fredoka font-bold text-sm text-gray-900 mt-2 leading-tight">
                          {sticker.title}
                        </h4>
                        <p className="text-[11px] text-indigo-900/70 font-semibold italic">
                          {sticker.englishTitle}
                        </p>
                      </div>

                      {/* Quote / Pedagogical Praise */}
                      <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 mb-3 space-y-1 text-center">
                        <p className="text-[11.5px] text-gray-700 italic font-medium leading-relaxed">
                          "{sticker.quote}"
                        </p>
                        <p className="text-[9.5px] text-gray-400">
                          🎯 Phù hợp: {sticker.suitableFor}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-1.5 pt-1 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-1.5">
                          {/* 1-Click Copy Badge for Word */}
                          <button
                            onClick={() => handleCopySticker(sticker)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-fredoka font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs ${
                              isCopied 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-pink-500 hover:bg-pink-600 text-white hover:scale-103 active:scale-95'
                            }`}
                            title="Sao chép hình nhãn dán để dán (Ctrl+V) trực tiếp vào Word hay PowerPoint"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đã chép!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Chép Word</span>
                              </>
                            )}
                          </button>

                          {/* Download PNG */}
                          <button
                            onClick={() => handleDownloadPng(sticker)}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-fredoka font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center gap-1 transition-all hover:scale-103 active:scale-95 cursor-pointer"
                            title="Tải ảnh PNG độ nét cao về máy tính"
                          >
                            <Download className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Tải PNG</span>
                          </button>
                        </div>

                        {/* Stamp Customizer Button */}
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setActiveStickerForStamp(sticker);
                            setShowCustomStampModal(true);
                          }}
                          className="w-full py-1 text-[10.5px] font-bold text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-pink-500" />
                          <span>Đóng dấu tên học sinh</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredStickers.length === 0 && (
              <div className="text-center py-12 space-y-3">
                <span className="text-5xl">🔍</span>
                <p className="font-bold text-base text-gray-700">Không tìm thấy nhãn dán phù hợp!</p>
                <p className="text-xs text-gray-500">Cô hãy thử tìm từ khóa khác hoặc bấm nút chọn "Tất Cả Nhãn Dán" nhé.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-fredoka font-bold text-xs rounded-xl cursor-pointer"
                >
                  Xem lại tất cả 52 nhãn dán
                </button>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="text-amber-500 text-base">💡</span>
              <span>
                <b>Mẹo cho cô giáo:</b> Sau khi nhấn <b>"Chép Word"</b>, cô chỉ cần mở file Word kế hoạch bài dạy hoặc đề kiểm tra rồi nhấn <b>Ctrl + V</b> là nhãn dán sẽ xuất hiện lung linh!
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              Đóng bảng nhãn dán
            </button>
          </div>

        </div>
      </div>

      {/* CUSTOM STAMP BUILDER MODAL */}
      {showCustomStampModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-left">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border-4 border-yellow-300 flex flex-col">
            
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-5 text-purple-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">✍️</span>
                <div>
                  <h3 className="font-fredoka font-black text-lg text-purple-950">
                    Tùy Chỉnh Con Dấu Khen Thưởng
                  </h3>
                  <p className="text-[11px] font-bold text-purple-900/80">
                    Điền tên học sinh và lời khen riêng để tạo con dấu độc quyền
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCustomStampModal(false)}
                className="w-8 h-8 rounded-full bg-white/40 hover:bg-white text-purple-950 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
              {/* Sticker Selector or Current Active */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Mẫu nhãn dán đã chọn:</label>
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-2xl border border-pink-200">
                  <span className="text-3xl animate-bounce">
                    {activeStickerForStamp ? activeStickerForStamp.emoji : '⭐'}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">
                      {activeStickerForStamp ? activeStickerForStamp.title : 'Ngôi Sao Chăm Ngoan'}
                    </h5>
                    <p className="text-[11px] text-gray-500 italic">
                      "{activeStickerForStamp ? activeStickerForStamp.quote : 'Em làm bài rất cẩn thận và chính xác!'}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                  <span>Họ và tên học sinh được khen:</span>
                  <span className="text-[10px] text-pink-600 font-semibold">* Hiển thị trên con dấu</span>
                </label>
                <input
                  type="text"
                  value={studentNameInput}
                  onChange={(e) => setStudentNameInput(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Bảo Nam, Lê Thị Mai..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Teacher Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Tên giáo viên phê:</label>
                  <input
                    type="text"
                    value={teacherNameInput}
                    onChange={(e) => setTeacherNameInput(e.target.value)}
                    placeholder="Cô Thanh"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Thời gian đánh giá:</label>
                  <input
                    type="text"
                    value={stampDateInput}
                    onChange={(e) => setStampDateInput(e.target.value)}
                    placeholder="Hôm nay"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-800"
                  />
                </div>
              </div>

              {/* Live Preview Stamp */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-gray-700">Bản xem trước con dấu thực tế:</label>
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div 
                    className="bg-white p-4 rounded-2xl shadow-md border-2 text-center max-w-xs space-y-1.5"
                    style={{ borderColor: activeStickerForStamp?.accentColor || '#f59e0b' }}
                  >
                    <span className="text-4xl inline-block animate-bounce">{activeStickerForStamp?.emoji || '⭐'}</span>
                    <h4 className="font-bold text-xs uppercase text-gray-900 tracking-wide">
                      {activeStickerForStamp?.title || 'Ngôi Sao Chăm Ngoan'}
                    </h4>
                    <p className="text-[11px] text-gray-600 italic">
                      "{activeStickerForStamp?.quote || 'Em làm bài rất cẩn thận và chính xác!'}"
                    </p>
                    {studentNameInput && (
                      <div className="text-xs font-black text-blue-900 pt-1 border-t border-gray-100">
                        Khen ngợi em: <span className="text-purple-700">{studentNameInput}</span>
                      </div>
                    )}
                    <div className="text-[10px] text-gray-500 italic">
                      {teacherNameInput} • {stampDateInput}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions in Stamp Modal */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    if (activeStickerForStamp) {
                      handleCopySticker(activeStickerForStamp, studentNameInput);
                    } else {
                      handleCopySticker(STUDENT_REWARD_STICKERS[0], studentNameInput);
                    }
                    setShowCustomStampModal(false);
                  }}
                  className="py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-fredoka font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Sao Chép Dán Word</span>
                </button>

                <button
                  onClick={() => {
                    if (activeStickerForStamp) {
                      handleDownloadPng(activeStickerForStamp, studentNameInput);
                    } else {
                      handleDownloadPng(STUDENT_REWARD_STICKERS[0], studentNameInput);
                    }
                    setShowCustomStampModal(false);
                  }}
                  className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Ảnh Con Dấu PNG</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Hidden Canvas element for generating PNGs */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
