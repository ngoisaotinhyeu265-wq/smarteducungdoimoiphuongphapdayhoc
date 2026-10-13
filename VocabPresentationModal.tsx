/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Volume2, Eye, EyeOff, 
  Maximize, Minimize, Snail, Rabbit, Sparkles, BookOpen, 
  HelpCircle, CheckCircle, RotateCcw, Lightbulb, Play
} from 'lucide-react';
import { EnglishVocabItem } from '../../types';
import { englishSpeech } from '../../utils/englishSpeech';
import { sounds } from '../../lib/audio';

interface VocabPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: EnglishVocabItem[];
  title?: string;
  grade?: number;
}

export default function VocabPresentationModal({
  isOpen,
  onClose,
  words,
  title = 'Bài Học Từ Vựng Tiếng Anh',
  grade = 3
}: VocabPresentationModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVietnamese, setShowVietnamese] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [showModelSentence, setShowModelSentence] = useState(true);
  const [isSlowAudio, setIsSlowAudio] = useState(false);
  const [isPlayingWordAudio, setIsPlayingWordAudio] = useState(false);
  const [isPlayingSentenceAudio, setIsPlayingSentenceAudio] = useState(false);
  const [isPlayingExpAudio, setIsPlayingExpAudio] = useState(false);
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentWord = words[currentIndex] || null;

  // Speak word handler
  const handleSpeakWord = useCallback((wordText?: string) => {
    if (!wordText && !currentWord) return;
    const text = wordText || currentWord?.word;
    if (!text) return;

    setIsPlayingWordAudio(true);
    englishSpeech.speak(text, {
      rate: isSlowAudio ? 0.72 : 0.88,
      onEnd: () => setIsPlayingWordAudio(false),
      onError: () => setIsPlayingWordAudio(false)
    });
  }, [currentWord, isSlowAudio]);

  // Speak sentence handler
  const handleSpeakSentence = useCallback(() => {
    if (!currentWord?.modelSentence) return;
    setIsPlayingSentenceAudio(true);
    englishSpeech.speak(currentWord.modelSentence, {
      rate: isSlowAudio ? 0.75 : 0.9,
      onEnd: () => setIsPlayingSentenceAudio(false),
      onError: () => setIsPlayingSentenceAudio(false)
    });
  }, [currentWord, isSlowAudio]);

  // Speak explanation handler
  const handleSpeakExplanation = useCallback(() => {
    if (!currentWord?.easyEnglishExplanation) return;
    setIsPlayingExpAudio(true);
    englishSpeech.speak(currentWord.easyEnglishExplanation, {
      rate: isSlowAudio ? 0.75 : 0.9,
      onEnd: () => setIsPlayingExpAudio(false),
      onError: () => setIsPlayingExpAudio(false)
    });
  }, [currentWord, isSlowAudio]);

  // Next slide
  const handleNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      sounds.playClick();
      setCurrentIndex(prev => prev + 1);
      setShowVietnamese(false); // Reset hidden meaning for new elicitation
    }
  }, [currentIndex, words.length]);

  // Previous slide
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      sounds.playClick();
      setCurrentIndex(prev => prev - 1);
      setShowVietnamese(false);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleSpeakWord();
      } else if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setShowVietnamese(prev => !prev);
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSpeakSentence();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, handleSpeakWord, handleSpeakSentence, onClose]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  if (!isOpen || words.length === 0 || !currentWord) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col select-none overflow-hidden animate-fadeIn">
      {/* Top Header Bar for Teacher Control */}
      <div className="h-16 px-6 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg font-bold">
            {currentIndex + 1}
          </div>
          <div>
            <h2 className="text-white font-fredoka font-bold text-lg flex items-center gap-2">
              <span>{title}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Grade {grade} (Lớp {grade})
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Từ {currentIndex + 1} / {words.length} • Phím tắt: [← / →] Đổi từ, [Space] Nghe phát âm, [V] Mở nghĩa TV
            </p>
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center gap-2">
          {/* Slow speed toggle */}
          <button
            onClick={() => setIsSlowAudio(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isSlowAudio 
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Chế độ phát âm chậm (Slow Speed) dành cho học sinh tiểu học"
          >
            {isSlowAudio ? <Snail className="w-4 h-4" /> : <Rabbit className="w-4 h-4" />}
            <span>{isSlowAudio ? 'Tốc độ: Chậm (0.75x)' : 'Tốc độ: Chuẩn (1.0x)'}</span>
          </button>

          {/* Toggle Vietnamese Meaning for class */}
          <button
            onClick={() => setShowVietnamese(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              showVietnamese 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Bật/tắt hiển thị nghĩa tiếng Việt để đố học sinh trước khi chốt kiến thức"
          >
            {showVietnamese ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>Nghĩa Tiếng Việt: {showVietnamese ? 'HIỆN' : 'ẨN'}</span>
          </button>

          {/* Teacher TPR Note Toggle */}
          {currentWord.teachingNotes && (
            <button
              onClick={() => setShowTeacherNotes(prev => !prev)}
              className={`p-2 rounded-xl text-xs transition-all ${
                showTeacherNotes ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Gợi ý sư phạm & cử chỉ TPR cho giáo viên"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            title="Toàn màn hình"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-all ml-2"
            title="Đóng trình chiếu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 gap-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Left Column: Big Image Card */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <div className="relative group w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden bg-slate-900 border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/10 flex items-center justify-center">
            {currentWord.imageUrl ? (
              <img
                src={currentWord.imageUrl}
                alt={currentWord.word}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                <BookOpen className="w-16 h-16 text-indigo-400/50 mb-3" />
                <span className="text-lg font-bold text-slate-400">{currentWord.word}</span>
                <span className="text-sm text-slate-500">Hình ảnh minh họa trực quan</span>
              </div>
            )}

            {/* Category & Word Type Floating Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-900/80 backdrop-blur-md text-indigo-200 border border-indigo-400/30 text-xs font-bold tracking-wide uppercase shadow-lg">
                {currentWord.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-900/80 backdrop-blur-md text-purple-200 border border-purple-400/30 text-xs font-bold shadow-lg">
                {currentWord.wordType}
              </span>
            </div>

            {/* Quick Word Speaker button on image hover */}
            <button
              onClick={() => handleSpeakWord()}
              className="absolute bottom-4 right-4 w-14 h-14 rounded-2xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-xl flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-110 active:scale-95 border border-white/20"
              title="Phát âm từ vựng"
            >
              <Volume2 className={`w-7 h-7 ${isPlayingWordAudio ? 'animate-bounce text-amber-300' : ''}`} />
            </button>
          </div>

          {/* Teacher TPR Note Banner */}
          {showTeacherNotes && currentWord.teachingNotes && (
            <div className="mt-4 w-full max-w-lg p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-sm flex items-start gap-2.5 animate-fadeIn">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Gợi ý cử chỉ TPR cho giáo viên:</strong>
                <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
                  {currentWord.teachingNotes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Teaching Content Card */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 max-w-xl">
          {/* Main Word & IPA Pronunciation */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-fredoka font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-200 to-white tracking-tight">
                  {currentWord.word}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl md:text-2xl font-mono text-indigo-300 font-medium">
                    {currentWord.pronunciation}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    IPA
                  </span>
                </div>
              </div>

              {/* Big Word Speaker Button */}
              <button
                onClick={() => handleSpeakWord()}
                className={`px-5 py-3 rounded-2xl font-fredoka font-bold text-base flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                  isPlayingWordAudio
                    ? 'bg-amber-400 text-slate-950 shadow-amber-400/30 ring-4 ring-amber-400/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlayingWordAudio ? 'Đang phát...' : 'Phát âm (Listen)'}</span>
              </button>
            </div>
          </div>

          {/* Easy English Explanation Card (Core Pedagogical Feature) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900/90 border border-indigo-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Easy English Explanation (Giải thích trực tiếp bằng Tiếng Anh đơn giản)
                </span>
              </div>
              <button
                onClick={handleSpeakExplanation}
                className="p-1.5 rounded-lg bg-indigo-800/50 hover:bg-indigo-700 text-indigo-200 transition-all text-xs flex items-center gap-1"
                title="Nghe câu giải thích tiếng Anh"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe</span>
              </button>
            </div>

            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed font-fredoka">
              "{currentWord.easyEnglishExplanation}"
            </p>
          </div>

          {/* Model Sentence Card */}
          <div className="p-5 md:p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Model Sentence (Câu mẫu thực hành giao tiếp)</span>
              </span>
              <button
                onClick={handleSpeakSentence}
                className="p-1.5 rounded-lg bg-emerald-800/40 hover:bg-emerald-700 text-emerald-200 transition-all text-xs flex items-center gap-1"
                title="Nghe câu mẫu"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe</span>
              </button>
            </div>

            <p className="text-lg md:text-xl font-medium text-emerald-100 italic">
              "{currentWord.modelSentence}"
            </p>
          </div>

          {/* Vietnamese Meaning (Toggleable for Teacher Elicitation) */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Nghĩa Tiếng Việt:</span>
              {showVietnamese ? (
                <span className="text-lg font-bold text-amber-300 font-fredoka animate-fadeIn">
                  {currentWord.vietnameseMeaning}
                </span>
              ) : (
                <span className="text-sm text-slate-500 italic">
                  (Đang ẩn - Bấm nút bên phải hoặc phím [V] để hiển thị)
                </span>
              )}
            </div>

            <button
              onClick={() => setShowVietnamese(prev => !prev)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-all flex items-center gap-1.5"
            >
              {showVietnamese ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showVietnamese ? 'Ẩn nghĩa' : 'Mở nghĩa TV'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Control Bar */}
      <div className="h-20 px-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between z-20">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-5 py-3 rounded-2xl font-fredoka font-bold text-sm md:text-base flex items-center gap-2 transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-slate-800 hover:bg-indigo-600 text-white shadow-lg active:scale-95'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Từ Trước (Previous)</span>
        </button>

        {/* Thumbnail / Dot Stepper */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto max-w-md px-2 py-1">
          {words.map((w, idx) => (
            <button
              key={w.id || idx}
              onClick={() => {
                sounds.playClick();
                setCurrentIndex(idx);
                setShowVietnamese(false);
              }}
              className={`h-9 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                idx === currentIndex
                  ? 'bg-indigo-600 text-white shadow-md scale-105 border border-indigo-400/40'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{w.word}</span>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
          className={`px-6 py-3 rounded-2xl font-fredoka font-bold text-sm md:text-base flex items-center gap-2 transition-all ${
            currentIndex === words.length - 1
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 active:scale-95'
          }`}
        >
          <span>Từ Kế Tiếp (Next)</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
