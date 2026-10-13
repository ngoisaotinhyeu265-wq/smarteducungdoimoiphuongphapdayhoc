/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, X } from 'lucide-react';
import { sounds } from '../lib/audio';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: '🏠 Trang chủ', 
      keywords: 'home dashboard trang chu tong quan',
      color: 'hover:bg-purple-100 hover:text-purple-600' 
    },
    { 
      id: 'gdpt_library', 
      label: '🏛️ Kho Học Liệu GDPT 2018', 
      badge: 'CHUẨN 2018',
      badgeBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black',
      keywords: 'kho hoc lieu gdpt 2018 toan tieng viet tieng anh khoa hoc lich su dia ly chu de game',
      color: 'hover:bg-amber-100 hover:text-amber-700' 
    },
    { 
      id: 'warmup_studio', 
      label: '✨ Khởi Động Tiếng Anh (5 Phút)', 
      badge: 'MỚI 🔥',
      badgeBg: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white animate-pulse',
      keywords: 'khoi dong tieng anh warm up warmup 5 phut 5-minute drama talkshow chant',
      color: 'hover:bg-pink-100 hover:text-pink-700' 
    },
    { 
      id: 'vocab_planner', 
      label: '🔤 Dạy Từ Vựng Tiếng Anh', 
      badge: 'SGK',
      badgeBg: 'bg-cyan-500 text-white',
      keywords: 'day tu vung tieng anh vocabulary flashcard global success phat am ipa',
      color: 'hover:bg-cyan-100 hover:text-cyan-700' 
    },
    { 
      id: 'personal_appendix2', 
      label: '📁 Kho Phụ Lục 2 Cá Nhân', 
      badge: 'TẤT CẢ MÔN',
      badgeBg: 'bg-emerald-500 text-white',
      keywords: 'kho thu muc phu luc 2 ca nhan ke hoach day hoc tai len upload tat ca cac mon',
      color: 'hover:bg-emerald-100 hover:text-emerald-700' 
    },
    { 
      id: 'curriculum_2345', 
      label: '📋 Phụ Lục 2 CV 2345', 
      badge: 'CHUẨN',
      badgeBg: 'bg-blue-500 text-white',
      keywords: 'phu luc 2 cong van 2345 ke hoach day hoc global success 35 tuan',
      color: 'hover:bg-blue-100 hover:text-blue-700' 
    },
    { 
      id: 'khdh_phuluc2_ntkt', 
      label: '📂 KHDH phụ lục 2 NTKT', 
      badge: '2026-2027',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black shadow-xs',
      keywords: 'khdh phu luc 2 ntkt ke hoach day hoc tai len may tinh khong dung ai 2026-2027 70 tiet 140 tiet',
      color: 'hover:bg-indigo-100 hover:text-indigo-700' 
    },
    { 
      id: 'sgv_explorer', 
      label: '📖 Tra Cứu SGV (13 Môn)', 
      keywords: 'tra cuu sach giao vien sgv 13 mon ket noi tri thuc 35 tuan',
      color: 'hover:bg-emerald-100 hover:text-emerald-700' 
    },
    { 
      id: 'lesson_planner', 
      label: '📚 AI Copilot Giáo Án', 
      keywords: 'ai copilot giao an stem tiet hoc',
      color: 'hover:bg-emerald-100 hover:text-emerald-700' 
    },
    { 
      id: 'ai', 
      label: '🤖 AI Soạn Đề SGK', 
      keywords: 'ai soan de thi sgk trac nghiem tu luan',
      color: 'hover:bg-yellow-100 hover:text-yellow-700' 
    },
    { 
      id: 'exams', 
      label: '📂 Kho Đề Thi', 
      keywords: 'kho de thi luu tru de kiem tra 15 phut giua ky cuoi ky',
      color: 'hover:bg-amber-100 hover:text-amber-700' 
    },
    { 
      id: 'questions', 
      label: '📖 Ngân Hàng Câu Hỏi', 
      keywords: 'ngan hang cau hoi trac nghiem dien tu ghep noi',
      color: 'hover:bg-blue-100 hover:text-blue-600' 
    },
    { 
      id: 'games', 
      label: '🎮 Trò Chơi Lớp Học', 
      keywords: 'tro choi game lop hoc vong quay flashcard memory quiz',
      color: 'hover:bg-pink-100 hover:text-pink-600' 
    },
    { 
      id: 'reports', 
      label: '🏆 Học Sinh & Thú Cưng Ảo', 
      keywords: 'hoc sinh pet thu cung ao gamification bao cao',
      color: 'hover:bg-yellow-100 hover:text-yellow-700' 
    },
    { 
      id: 'settings', 
      label: '⚙️ Cài Đặt', 
      keywords: 'cai dat setting am thanh nhac nen',
      color: 'hover:bg-gray-100 hover:text-gray-700' 
    }
  ];

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  const handleScrollLeft = () => {
    sounds.playClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    sounds.playClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    setHasMoved(true);
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    updateScrollButtons();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const filteredItems = menuItems.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q);
  });

  return (
    <div className="w-full mt-2 px-2 sm:px-4 select-none relative">
      <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 shadow-2xl p-1.5 sm:p-2">
        
        {/* Left Scroll Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-900/90 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg border border-white/30 transition-all hover:scale-110 cursor-pointer backdrop-blur-md"
            title="Kéo sang trái"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Quick Search Toggle Button */}
        <button
          onClick={() => {
            sounds.playClick();
            setShowQuickSearch(!showQuickSearch);
            if (!showQuickSearch) {
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }
          }}
          className={`
            shrink-0 mr-1.5 px-3 py-2.5 rounded-full font-fredoka font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border
            ${showQuickSearch 
              ? 'bg-yellow-300 text-indigo-950 border-yellow-200 shadow-lg scale-105' 
              : 'bg-white/15 hover:bg-white/25 text-indigo-100 hover:text-white border-white/20'
            }
          `}
          title="Tìm nhanh công cụ"
        >
          <Search className="w-4 h-4 text-yellow-300" />
          <span className="hidden sm:inline">Tìm nhanh</span>
        </button>

        {/* Scrollable / Draggable Menu Items Container */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`
            flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-none py-1 px-2 flex-nowrap
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          `}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (!hasMoved) {
                    sounds.playClick();
                    setActiveTab(item.id);
                  }
                }}
                className={`
                  px-4 md:px-5 py-2.5 md:py-3 rounded-full font-fredoka font-extrabold text-xs sm:text-sm md:text-base cursor-pointer
                  transition-all duration-300 transform flex items-center gap-2 whitespace-nowrap shrink-0 relative
                  ${isActive 
                    ? 'bg-white text-indigo-700 shadow-xl scale-105 border border-white' 
                    : 'text-indigo-100 hover:text-white hover:bg-white/15 hover:scale-105 border border-transparent hover:border-white/15 active:scale-95'
                  }
                  ${item.id === 'warmup_studio' && !isActive ? 'ring-2 ring-pink-400/50 bg-pink-500/10' : ''}
                `}
                style={{
                  boxShadow: isActive ? '0 8px 20px -2px rgba(255, 255, 255, 0.25)' : ''
                }}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-sm ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Arrow Button */}
        {canScrollRight && (
          <button
            onClick={handleScrollRight}
            className="absolute right-2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-900/90 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg border border-white/30 transition-all hover:scale-110 cursor-pointer backdrop-blur-md"
            title="Kéo sang phải"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Search Floating Popup */}
      {showQuickSearch && (
        <div className="absolute top-full left-4 right-4 sm:left-auto sm:right-4 sm:w-96 mt-2 z-50 bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 shadow-2xl animate-fade-in text-white space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 font-fredoka font-bold text-sm text-yellow-300">
              <Sparkles className="w-4 h-4" />
              <span>Tìm kiếm nhanh thanh công cụ</span>
            </div>
            <button
              onClick={() => setShowQuickSearch(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center bg-white/10 rounded-2xl border border-white/20 px-3 py-2">
            <Search className="w-4 h-4 text-indigo-300 mr-2 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Nhập: khởi động, tiếng anh, SGV, đề thi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-xs font-semibold text-white placeholder-indigo-200/50 focus:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-indigo-300 hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick List */}
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 scrollbar-none">
            {filteredItems.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-400">
                Không tìm thấy thanh công cụ phù hợp với "{searchQuery}"
              </div>
            ) : (
              filteredItems.map(item => {
                const isCurrent = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab(item.id);
                      setShowQuickSearch(false);
                      setSearchQuery('');
                    }}
                    className={`
                      w-full px-3.5 py-2.5 rounded-2xl text-left flex items-center justify-between gap-2 text-xs font-fredoka font-bold transition-all cursor-pointer
                      ${isCurrent 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' 
                        : 'bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white'
                      }
                    `}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

