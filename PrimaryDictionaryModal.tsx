/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Primary School English Dictionary Explorer Modal (400+ Words Global Success)
 * Tra cứu & Khám phá Từ điển Chuyên biệt Tiểu học Lớp 1 - 5
 */

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Volume2, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  Filter, 
  Lightbulb, 
  Languages, 
  GraduationCap,
  Download,
  Plus
} from 'lucide-react';
import { PRIMARY_DICTIONARY_ENTRIES, DictionaryEntry } from '../data/primaryDictionary400';
import { sounds } from '../lib/audio';

interface PrimaryDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord?: (entry: DictionaryEntry) => void;
}

const CATEGORIES = [
  'Tất cả chủ đề',
  'School Subjects',
  'School Things',
  'Classroom Commands',
  'Action Verbs / TPR',
  'Daily Conversation',
  'Animals',
  'Food & Drinks',
  'Family & People',
  'Body Parts',
  'Colors & Shapes',
  'Numbers & Time'
];

export default function PrimaryDictionaryModal({ isOpen, onClose, onSelectWord }: PrimaryDictionaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả chủ đề');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [accent, setAccent] = useState<'en-US' | 'en-GB'>('en-US');
  const [customAiQuery, setCustomAiQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiCustomResults, setAiCustomResults] = useState<DictionaryEntry[]>([]);

  // Filter dictionary entries
  const filteredEntries = useMemo(() => {
    const combined = [...aiCustomResults, ...PRIMARY_DICTIONARY_ENTRIES];
    const q = searchTerm.toLowerCase().trim();

    return combined.filter(item => {
      const matchQuery = !q || 
        item.word.toLowerCase().includes(q) ||
        item.vietnameseMeaning.toLowerCase().includes(q) ||
        (item.ipa && item.ipa.toLowerCase().includes(q)) ||
        (item.modelSentence && item.modelSentence.toLowerCase().includes(q));

      const matchCategory = selectedCategory === 'Tất cả chủ đề' || item.category === selectedCategory;
      const matchGrade = selectedGrade === 'all' || item.grade === selectedGrade;

      return matchQuery && matchCategory && matchGrade;
    });
  }, [searchTerm, selectedCategory, selectedGrade, aiCustomResults]);

  if (!isOpen) return null;

  // Speak word
  const speakWord = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent;
    utterance.rate = 0.85;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === accent) || voices[0];
    if (voice) utterance.voice = voice;

    setPlayingWord(text);
    utterance.onend = () => setPlayingWord(null);
    utterance.onerror = () => setPlayingWord(null);

    window.speechSynthesis.speak(utterance);
  };

  // Copy entry
  const copyEntry = (item: DictionaryEntry) => {
    sounds.playSuccess();
    const text = `${item.word} ${item.ipa || ''}\n➔ Nghĩa: ${item.vietnameseMeaning}\nVí dụ: ${item.modelSentence || ''} (${item.modelSentenceVi || ''})`;
    navigator.clipboard.writeText(text);
    setCopiedWord(item.word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  // AI Instant Lookup
  const handleAiLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAiQuery.trim()) return;

    sounds.playClick();
    setIsAiSearching(true);
    try {
      const res = await fetch('/api/dictionary/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: customAiQuery.trim(),
          context: 'Lớp học tiểu học Global Success',
          grade: typeof selectedGrade === 'number' ? selectedGrade : 3
        })
      });
      if (res.ok) {
        const data = await res.json();
        const newEntry: DictionaryEntry = {
          word: data.word || customAiQuery,
          ipa: data.ipa || `/${customAiQuery}/`,
          wordType: data.wordType || 'Phrase',
          vietnameseMeaning: data.vietnameseMeaning || customAiQuery,
          easyEnglishExplanation: data.easyEnglishExplanation || 'English term in school.',
          modelSentence: data.modelSentence || `We use "${customAiQuery}".`,
          modelSentenceVi: data.modelSentenceVi || `Chúng ta dùng "${customAiQuery}".`,
          teachingNotes: data.teachingNotes || 'Luyện phát âm theo phương pháp TPR.',
          category: (data.category as any) || 'Daily Conversation',
          grade: (data.grade as any) || 3
        };
        setAiCustomResults(prev => [newEntry, ...prev]);
        setSearchTerm(customAiQuery);
        setCustomAiQuery('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-fredoka font-bold tracking-tight">
                  Từ Điển Chuyên Biệt Tiếng Anh Tiểu Học
                </h2>
                <span className="bg-amber-400/90 text-amber-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                  400+ Từ Chuẩn Global Success
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                Tra cứu thuật ngữ môn học, mệnh lệnh lớp học, mẫu câu giao tiếp & động từ TPR Lớp 1 – 5
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Accent toggle */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setAccent(accent === 'en-US' ? 'en-GB' : 'en-US');
              }}
              className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold transition-all"
              title="Chuyển giọng phát âm"
            >
              {accent === 'en-US' ? '🇺🇸 Giọng Mỹ (en-US)' : '🇬🇧 Giọng Anh (en-GB)'}
            </button>

            <button
              type="button"
              onClick={() => { sounds.playClick(); onClose(); }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/80 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Main Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Tìm nhanh từ vựng, môn học (Maths, English, Science, look and listen, pencil...)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* AI Lookup Field */}
            <form onSubmit={handleAiLookupSubmit} className="flex items-center gap-1.5 sm:w-80">
              <input
                type="text"
                value={customAiQuery}
                onChange={e => setCustomAiQuery(e.target.value)}
                placeholder="Tra từ mới bằng AI..."
                className="w-full px-3 py-2.5 bg-white border border-indigo-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={isAiSearching || !customAiQuery.trim()}
                className="px-3.5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-xs font-bold hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-1 shadow-sm shrink-0"
              >
                {isAiSearching ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Tra AI</span>
              </button>
            </form>
          </div>

          {/* Categories & Grade Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { sounds.playClick(); setSelectedCategory(cat); }}
                  className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grade selector */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-bold text-slate-500 text-[11px]">Khối lớp:</span>
              {(['all', 1, 2, 3, 4, 5] as const).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => { sounds.playClick(); setSelectedGrade(g); }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                    selectedGrade === g
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {g === 'all' ? 'Tất' : `L${g}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Word Cards Grid View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <span>Hiển thị <strong>{filteredEntries.length}</strong> từ vựng & thuật ngữ</span>
            <span className="italic">Mẹo: Bạn có thể bôi đen bất kỳ từ nào trên toàn bộ trang web để tra nghĩa tức thì!</span>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <Languages className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Không tìm thấy từ vựng phù hợp</h3>
              <p className="text-slate-500 text-xs mt-1 max-w-md mx-auto">
                Hãy thử tìm với từ khóa khác hoặc nhập từ khóa vào ô "Tra từ mới bằng AI" để hệ thống tự động phân tích và bổ sung ngay!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredEntries.map((item, idx) => (
                <div
                  key={`${item.word}_${idx}`}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Card Top */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-fredoka text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors break-words">
                            {item.word}
                          </h4>
                          {item.wordType && (
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {item.wordType}
                            </span>
                          )}
                          {item.grade && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                              Lớp {item.grade}
                            </span>
                          )}
                        </div>
                        {item.ipa && (
                          <p className="text-xs font-mono font-medium text-slate-500 mt-0.5">
                            {item.ipa}
                          </p>
                        )}
                      </div>

                      {/* Pronounce & Copy */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => speakWord(item.word)}
                          className={`p-1.5 rounded-xl border transition-all ${
                            playingWord === item.word
                              ? 'bg-purple-600 text-white border-purple-700 animate-pulse'
                              : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                          }`}
                          title="Phát âm chuẩn bản xứ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => copyEntry(item)}
                          className="p-1.5 rounded-xl border bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          title="Sao chép từ"
                        >
                          {copiedWord === item.word ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Vietnamese Meaning */}
                    <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-2 mb-2">
                      <p className="text-xs font-bold text-amber-950 leading-relaxed">
                        ➔ {item.vietnameseMeaning}
                      </p>
                    </div>

                    {/* Model Sentence & Translation */}
                    {item.modelSentence && (
                      <div className="text-xs text-slate-700 bg-slate-50 rounded-xl p-2 border border-slate-100 mb-2 space-y-0.5">
                        <p className="font-medium text-blue-900 italic">
                          "{item.modelSentence}"
                        </p>
                        {item.modelSentenceVi && (
                          <p className="text-[11px] text-slate-500">
                            ➔ {item.modelSentenceVi}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Teaching notes / TPR */}
                    {item.teachingNotes && (
                      <div className="flex items-start gap-1 text-[11px] text-emerald-900 bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                        <Lightbulb className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <p className="leading-tight">
                          <strong>Mẹo TPR:</strong> {item.teachingNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Category tag & Add to Lesson Action */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold">{item.category}</span>
                    {onSelectWord ? (
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playCoin();
                          onSelectWord(item);
                          onClose();
                        }}
                        className="px-2 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Dạy từ này</span>
                      </button>
                    ) : (
                      <span>Global Success</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-slate-700">
              Tính năng Tra nhanh khi Bôi đen (Instant Floating Tooltip) đang hoạt động toàn hệ thống!
            </span>
          </div>

          <button
            type="button"
            onClick={() => { sounds.playClick(); onClose(); }}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm"
          >
            Đóng từ điển
          </button>
        </div>
      </div>
    </div>
  );
}
