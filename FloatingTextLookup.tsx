/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Floating Instant Dictionary & Text Selection Lookup Tooltip
 * Tra cứu nghĩa tiếng Việt tức thì khi bôi đen văn bản tiếng Anh trên toàn bộ ứng dụng
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Volume2, 
  Sparkles, 
  Copy, 
  Check, 
  Pin, 
  PinOff, 
  X, 
  ExternalLink, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Languages, 
  Search,
  Settings,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { lookupPrimaryDictionaryOffline, DictionaryEntry } from '../data/primaryDictionary400';
import { sounds } from '../lib/audio';
import { copyToClipboard } from '../utils/clipboard';

interface FloatingTextLookupProps {
  onOpenFullDictionary?: () => void;
}

export default function FloatingTextLookup({ onOpenFullDictionary }: FloatingTextLookupProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('smartedu_selection_lookup_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [accent, setAccent] = useState<'en-US' | 'en-GB'>(() => {
    return (localStorage.getItem('smartedu_tts_accent') as 'en-US' | 'en-GB') || 'en-US';
  });

  const [selectedText, setSelectedText] = useState<string>('');
  const [position, setPosition] = useState<{ x: number; y: number; placement: 'top' | 'bottom' } | null>(null);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFloatingBadge, setShowFloatingBadge] = useState<boolean>(() => {
    const saved = localStorage.getItem('smartedu_lookup_badge_visible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save settings
  const toggleEnabled = () => {
    sounds.playClick();
    const next = !isEnabled;
    setIsEnabled(next);
    localStorage.setItem('smartedu_selection_lookup_enabled', JSON.stringify(next));
    if (!next) {
      setPosition(null);
      setSelectedText('');
    }
  };

  const toggleAccent = () => {
    sounds.playClick();
    const next = accent === 'en-US' ? 'en-GB' : 'en-US';
    setAccent(next);
    localStorage.setItem('smartedu_tts_accent', next);
  };

  // Perform AI Lookup via backend
  const handleAiLookup = useCallback(async (queryToLookup: string) => {
    if (!queryToLookup.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/dictionary/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToLookup.trim(),
          context: 'Lớp học tiểu học chương trình GDPT 2018 Global Success',
          grade: 3
        })
      });
      if (res.ok) {
        const data = await res.json();
        setEntry({
          word: data.word || queryToLookup,
          ipa: data.ipa || `/${queryToLookup}/`,
          wordType: data.wordType || 'Phrase',
          vietnameseMeaning: data.vietnameseMeaning || queryToLookup,
          easyEnglishExplanation: data.easyEnglishExplanation || 'English expression in school lessons.',
          modelSentence: data.modelSentence || `Look at "${queryToLookup}" in English.`,
          modelSentenceVi: data.modelSentenceVi || `Nhìn vào "${queryToLookup}" trong tiếng Anh.`,
          category: data.category || 'Daily Conversation',
          teachingNotes: data.teachingNotes || 'Luyện phát âm chuẩn và làm động tác TPR minh họa.'
        });
      }
    } catch (err) {
      console.error('Error fetching AI dictionary lookup:', err);
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  // Native Speech Synthesis with accent support
  const playWordAudio = (textToSpeak?: string) => {
    const text = textToSpeak || entry?.word || selectedText;
    if (!text || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent;
    utterance.rate = 0.85; // slightly slower for clear primary classroom pronunciation
    utterance.pitch = 1.05;

    // Pick best available voice for requested accent
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang === accent) || 
      voices.find(v => v.lang.startsWith('en')) || 
      voices[0];

    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Copy word and meaning
  const handleCopy = async () => {
    if (!entry && !selectedText) return;
    sounds.playSuccess();
    const copyContent = entry 
      ? `${entry.word} ${entry.ipa || ''}\n➔ Nghĩa: ${entry.vietnameseMeaning}\nVí dụ: ${entry.modelSentence || ''} (${entry.modelSentenceVi || ''})`
      : selectedText;
    await copyToClipboard(copyContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Global Selection Listener
  const handleSelection = useCallback(() => {
    if (!isEnabled) return;
    if (isPinned) return; // Keep current window if pinned

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      if (!isPinned) {
        // Delay clear to avoid flickering when clicking tooltip controls
        hideTimeoutRef.current = setTimeout(() => {
          if (!isPinned) {
            setPosition(null);
            setSelectedText('');
          }
        }, 300);
      }
      return;
    }

    const rawText = selection.toString().trim();
    // Filter: Ignore single non-alphabet chars, empty strings, or very long passages (> 150 chars)
    if (!rawText || rawText.length < 2 || rawText.length > 150) {
      return;
    }

    // Check if contains Latin/English letters
    const hasEnglishLetters = /[a-zA-Z]/.test(rawText);
    if (!hasEnglishLetters) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (rect.width === 0 && rect.height === 0) return;

    // Calculate best position (above or below selection)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 340;
    const tooltipHeight = 180;

    let x = rect.left + rect.width / 2 - tooltipWidth / 2;
    // Boundary check X
    if (x < 12) x = 12;
    if (x + tooltipWidth > viewportWidth - 12) {
      x = viewportWidth - tooltipWidth - 12;
    }

    let y = rect.top - tooltipHeight - 10;
    let placement: 'top' | 'bottom' = 'top';

    // If not enough space on top, show below selection
    if (rect.top < tooltipHeight + 20) {
      y = rect.bottom + 10;
      placement = 'bottom';
    }

    setSelectedText(rawText);
    setPosition({ x, y, placement });

    // Look up in primary offline dictionary first
    const offlineResult = lookupPrimaryDictionaryOffline(rawText);
    if (offlineResult) {
      setEntry(offlineResult);
      setIsAiLoading(false);
    } else {
      setEntry(null);
      // Auto trigger AI lookup for short novel phrases (< 60 chars)
      if (rawText.length <= 60) {
        handleAiLookup(rawText);
      }
    }
  }, [isEnabled, isPinned, handleAiLookup]);

  useEffect(() => {
    const onMouseUp = () => {
      setTimeout(handleSelection, 20);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPosition(null);
        setSelectedText('');
        setIsPinned(false);
      } else if (e.shiftKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        setTimeout(handleSelection, 50);
      }
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('keyup', onKeyUp);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [handleSelection]);

  // Don't render anything if selection lookup is not triggered
  return (
    <>
      {/* Floating Status & Quick-Toggle Button (Bottom Right) */}
      {showFloatingBadge && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-700/60 text-xs font-semibold transition-all group select-none">
          <button
            type="button"
            onClick={toggleEnabled}
            className={`flex items-center gap-1.5 transition-colors ${isEnabled ? 'text-emerald-400' : 'text-slate-400'}`}
            title={isEnabled ? 'Bật tra nhanh khi bôi đen từ (Click để tắt)' : 'Đang tắt tra từ nhanh (Click để bật)'}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Tra nhanh: <strong className={isEnabled ? 'text-emerald-300' : 'text-slate-400'}>{isEnabled ? 'BẬT' : 'TẮT'}</strong></span>
          </button>

          <span className="w-px h-3 bg-slate-700 mx-0.5" />

          <button
            type="button"
            onClick={toggleAccent}
            className="flex items-center gap-1 text-[11px] text-blue-300 hover:text-blue-200 px-1.5 py-0.5 rounded bg-blue-900/40 hover:bg-blue-900/60"
            title={`Chuyển giọng đọc bản xứ (Đang dùng: ${accent === 'en-US' ? 'Mỹ 🇺🇸' : 'Anh 🇬🇧'})`}
          >
            <span>{accent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}</span>
          </button>

          {onOpenFullDictionary && (
            <button
              type="button"
              onClick={() => { sounds.playClick(); onOpenFullDictionary(); }}
              className="text-amber-300 hover:text-amber-200 p-1 hover:bg-white/10 rounded transition-colors"
              title="Mở Từ điển Tiểu học 400+ từ (Global Success)"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setShowFloatingBadge(false);
              localStorage.setItem('smartedu_lookup_badge_visible', 'false');
            }}
            className="text-slate-400 hover:text-white p-0.5"
            title="Ẩn nút nổi (Có thể bật lại trong Cài đặt)"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Instant Floating Tooltip */}
      {position && selectedText && (
        <div
          ref={tooltipRef}
          onMouseDown={(e) => e.stopPropagation()} // Prevent closing when interacting with popup
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999
          }}
          className="w-[340px] max-w-[94vw] bg-white rounded-2xl shadow-2xl border border-indigo-200/90 text-slate-800 animate-in fade-in zoom-in-95 duration-150 overflow-hidden font-sans select-text"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-3.5 py-2 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Languages className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-xs font-bold tracking-wide truncate">
                {entry?.category ? entry.category : 'Từ Điển Tiếng Anh Tiểu Học'}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Accent Switcher */}
              <button
                type="button"
                onClick={toggleAccent}
                className="text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-1.5 py-0.5 rounded transition-all cursor-pointer"
                title={`Đổi giọng đọc: ${accent === 'en-US' ? 'Mỹ (en-US)' : 'Anh (en-GB)'}`}
              >
                {accent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}
              </button>

              {/* Pin toggle */}
              <button
                type="button"
                onClick={() => { sounds.playClick(); setIsPinned(!isPinned); }}
                className={`p-1 rounded hover:bg-white/20 transition-colors cursor-pointer ${isPinned ? 'text-amber-300 bg-white/20' : 'text-white/80'}`}
                title={isPinned ? 'Bỏ ghim cửa sổ' : 'Ghim cửa sổ tra cứu'}
              >
                {isPinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setPosition(null);
                  setSelectedText('');
                  setIsPinned(false);
                }}
                className="p-1 rounded hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-3.5 space-y-2.5">
            {/* Word title, IPA, Audio & Copy */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-fredoka text-base sm:text-lg font-bold text-slate-900 tracking-tight break-words">
                    {entry?.word || selectedText}
                  </h4>
                  {entry?.wordType && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {entry.wordType}
                    </span>
                  )}
                </div>
                {entry?.ipa && (
                  <p className="text-xs font-mono font-medium text-slate-500 mt-0.5">
                    {entry.ipa}
                  </p>
                )}
              </div>

              {/* Audio & Copy Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => playWordAudio()}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-purple-600 text-white border-purple-700 animate-pulse'
                      : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:scale-105'
                  }`}
                  title={`Nghe phát âm chuẩn (${accent === 'en-US' ? 'Mỹ' : 'Anh'})`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 rounded-xl border bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
                  title="Sao chép từ & nghĩa"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Vietnamese Meaning (Key Highlight) */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5">
              <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <span>🇻🇳 Nghĩa tiếng Việt:</span>
              </div>
              <p className="text-sm font-bold text-indigo-950 leading-snug">
                {entry?.vietnameseMeaning ? (
                  entry.vietnameseMeaning
                ) : isAiLoading ? (
                  <span className="flex items-center gap-1.5 text-blue-600 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    Đang phân tích nghĩa sư phạm chuẩn...
                  </span>
                ) : (
                  <span className="text-slate-500 font-normal italic text-xs">
                    Chưa có nghĩa mẫu. Nhấn Tra cứu AI bên dưới.
                  </span>
                )}
              </p>
            </div>

            {/* Expanded Detailed View (Examples, TPR Teaching tips, Easy English) */}
            {entry && isExpanded && (
              <div className="space-y-2 pt-1 text-xs border-t border-slate-100 animate-in fade-in duration-150">
                {/* Easy English Explanation */}
                {entry.easyEnglishExplanation && (
                  <div className="bg-blue-50/70 p-2 rounded-lg border border-blue-100 text-blue-950">
                    <span className="font-bold text-blue-800">💡 Giải thích dễ hiểu: </span>
                    <span>{entry.easyEnglishExplanation}</span>
                  </div>
                )}

                {/* Model Sentence */}
                {entry.modelSentence && (
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-0.5">
                    <div className="font-semibold text-slate-900 flex items-center gap-1">
                      <span>🗣️ Ví dụ:</span>
                      <span className="font-medium text-blue-900 italic">"{entry.modelSentence}"</span>
                    </div>
                    {entry.modelSentenceVi && (
                      <p className="text-slate-600 text-[11px]">
                        ➔ {entry.modelSentenceVi}
                      </p>
                    )}
                  </div>
                )}

                {/* TPR Pedagogical Tip */}
                {entry.teachingNotes && (
                  <div className="bg-emerald-50/80 p-2 rounded-lg border border-emerald-200 text-emerald-950 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-800">Mẹo sư phạm / TPR: </span>
                      <span>{entry.teachingNotes}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
              {!entry && !isAiLoading && (
                <button
                  type="button"
                  onClick={() => handleAiLookup(selectedText)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:brightness-110 shadow-sm transition-all cursor-pointer text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tra cứu bằng AI</span>
                </button>
              )}

              {entry && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết & Ví dụ'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}

              {onOpenFullDictionary && (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onOpenFullDictionary();
                  }}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-700 ml-auto cursor-pointer"
                  title="Mở toàn bộ kho từ điển tiểu học"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Kho 400+ từ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
