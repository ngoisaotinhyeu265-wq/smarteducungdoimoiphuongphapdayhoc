/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, Volume2, ChevronRight, ChevronLeft, 
  Clock, Sparkles, User, Users, Maximize2, Minimize2, Check, Radio
} from 'lucide-react';
import { WarmupScript, ScriptLine } from '../../types/warmup';
import { englishSpeech } from '../../utils/englishSpeech';
import { sounds } from '../../lib/audio';

interface PracticeTeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: WarmupScript;
  initialFilterStudent?: string | null;
}

export default function PracticeTeleprompterModal({
  isOpen,
  onClose,
  script,
  initialFilterStudent
}: PracticeTeleprompterModalProps) {
  // Collect all lines in flat array with scene info
  const allLinesWithScene = React.useMemo(() => {
    const list: Array<ScriptLine & { sceneTitle: string; sceneNumber: number }> = [];
    script.scenes.forEach(s => {
      s.lines.forEach(l => {
        list.push({
          ...l,
          sceneTitle: s.title,
          sceneNumber: s.sceneNumber
        });
      });
    });
    return list;
  }, [script]);

  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>(initialFilterStudent || 'all');
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // 5-Minute Timer (Stopwatch in seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Filtered lines based on student selection
  const filteredLines = React.useMemo(() => {
    if (selectedStudentFilter === 'all') return allLinesWithScene;
    return allLinesWithScene.filter(l => {
      const spk = l.speaker.toLowerCase();
      const target = selectedStudentFilter.toLowerCase();
      return spk.includes(target) || spk === 'all' || spk === 'performers' || spk === 'class';
    });
  }, [allLinesWithScene, selectedStudentFilter]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentLineIndex(0);
  }, [selectedStudentFilter]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentLine = filteredLines[currentLineIndex] || filteredLines[0];

  const handleNextLine = () => {
    sounds.playClick();
    if (currentLineIndex < filteredLines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  const handlePrevLine = () => {
    sounds.playClick();
    if (currentLineIndex > 0) {
      setCurrentLineIndex(prev => prev - 1);
    }
  };

  const handleSpeakCurrentLine = () => {
    if (!currentLine) return;
    setIsPlayingAudio(true);
    englishSpeech.speak(currentLine.lineEnglish, {
      onEnd: () => {
        setIsPlayingAudio(false);
      },
      onError: () => {
        setIsPlayingAudio(false);
      }
    });
  };

  // Keyboard navigation (ArrowRight, ArrowLeft, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextLine();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevLine();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleSpeakCurrentLine();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentLineIndex, filteredLines]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn ${
      isFullscreen ? 'p-0' : ''
    }`}>
      <div className={`w-full bg-slate-900 border border-indigo-500/40 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'h-full rounded-none border-none' : 'max-w-5xl max-h-[92vh] h-[850px]'
      }`}>
        
        {/* Top App Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-fredoka font-bold">
                  PRACTICE & TELEPROMPTER
                </span>
                <h3 className="font-fredoka font-bold text-base text-white truncate max-w-md">
                  {script.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Luyện tập lời thoại từng câu • Có âm thanh phát âm chuẩn bản xứ • Đồng hồ 5 phút
              </p>
            </div>
          </div>

          {/* Right Controls: Timer + Fullscreen + Close */}
          <div className="flex items-center gap-3">
            {/* 5-Minute Timer Module */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-inner">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="font-mono font-black text-sm text-emerald-300 tracking-wider">
                {formatTime(timerSeconds)}
              </span>
              <span className="text-[10px] text-slate-500">/ 05:00</span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                title={isTimerRunning ? 'Tạm dừng' : 'Bắt đầu đếm thời gian'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                title="Đặt lại đồng hồ"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình máy chiếu'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white border border-slate-700 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Student Filter Tabs (Rehearsal selector) */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-fredoka font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            Chọn vai luyện tập:
          </span>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setSelectedStudentFilter('all');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-fredoka font-bold transition-all shrink-0 ${
              selectedStudentFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🌟 Toàn bộ lời thoại ({allLinesWithScene.length})
          </button>

          {script.characters.map((char) => (
            <button
              key={char.name}
              type="button"
              onClick={() => {
                sounds.playClick();
                setSelectedStudentFilter(char.name);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                selectedStudentFilter.toLowerCase() === char.name.toLowerCase()
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <User className="w-3 h-3 text-pink-300" />
              <span>{char.name} ({char.roleTitle})</span>
            </button>
          ))}
        </div>

        {/* Main Teleprompter Display Stage */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          
          {/* Scene Tracker Badge */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-fredoka font-bold">
                Cảnh {currentLine?.sceneNumber || 1}: {currentLine?.sceneTitle}
              </span>
              {currentLine?.timing && (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-mono">
                  ⏱ {currentLine.timing}
                </span>
              )}
            </div>

            <div className="text-xs font-mono text-slate-400">
              Câu {currentLineIndex + 1} / {filteredLines.length}
            </div>
          </div>

          {/* Big Teleprompter Card */}
          <div className="my-auto py-8 text-center space-y-6 max-w-3xl mx-auto w-full">
            
            {/* Speaker Name Tag */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg border border-indigo-400/50">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-fredoka font-black text-lg tracking-wide uppercase">
                {currentLine?.speaker}
              </span>
              <span className="text-xs font-medium text-indigo-200">
                {currentLine?.speakerType === 'host' ? '🎤 MC' : currentLine?.speakerType === 'class' ? '👥 CẢ LỚP' : currentLine?.speakerType === 'teacher' ? '👩‍🏫 GIÁO VIÊN' : '⭐ DIỄN VIÊN'}
              </span>
            </div>

            {/* English Speech Text (Large & Crisp) */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-fredoka font-black text-amber-300 leading-tight tracking-wide drop-shadow-md">
                “{currentLine?.lineEnglish}”
              </h2>

              {/* Vietnamese Meaning Subtitle */}
              {currentLine?.lineVietnamese && (
                <p className="text-base sm:text-lg text-slate-300 font-medium italic">
                  ({currentLine.lineVietnamese})
                </p>
              )}
            </div>

            {/* Stage Direction Highlight */}
            {currentLine?.stageDirection && (
              <div className="inline-block px-5 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                🎭 Hướng dẫn diễn xuất: {currentLine.stageDirection}
              </div>
            )}
          </div>

          {/* Bottom Interactive Action Toolbar */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
            
            {/* Audio Pronunciation Speak Button */}
            <button
              type="button"
              onClick={handleSpeakCurrentLine}
              disabled={isPlayingAudio}
              className={`px-5 py-3 rounded-2xl font-fredoka font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : 'text-indigo-400'}`} />
              <span>{isPlayingAudio ? 'Đang phát âm tiếng Anh...' : 'Nghe Phát Âm Mẫu (Native Audio)'}</span>
            </button>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevLine}
                disabled={currentLineIndex === 0}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs sm:text-sm font-fredoka font-bold flex items-center gap-2 border border-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu Trước (Phím ⬅)</span>
              </button>

              <button
                type="button"
                onClick={handleNextLine}
                disabled={currentLineIndex >= filteredLines.length - 1}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-30 text-white text-xs sm:text-sm font-fredoka font-black flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>Câu Tiếp Theo (Phím ➡)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300"
            style={{
              width: `${((currentLineIndex + 1) / filteredLines.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}
