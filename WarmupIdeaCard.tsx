/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Users, Clock, Flame, Box, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WarmupIdea } from '../../types/warmup';
import { sounds } from '../../lib/audio';

export interface WarmupIdeaCardProps {
  idea: WarmupIdea;
  index: number;
  isSelected?: boolean;
  onSelect: (idea: WarmupIdea) => void;
  isGenerating?: boolean;
}

const WarmupIdeaCard: React.FC<WarmupIdeaCardProps> = ({
  idea,
  index,
  isSelected,
  onSelect,
  isGenerating
}) => {
  return (
    <div
      onClick={() => {
        sounds.playClick();
        onSelect(idea);
      }}
      className={`group relative rounded-3xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg ${
        isSelected
          ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/60 dark:via-purple-950/50 dark:to-slate-900 border-indigo-600 dark:border-indigo-400 ring-4 ring-indigo-500/20 scale-[1.02] shadow-indigo-500/20'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {/* Top Banner: Idea Number + Type Badge */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-fredoka font-black text-xs shadow-md">
            Ý TƯỞNG #{index + 1}
          </span>

          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[11px] font-fredoka font-bold">
            {idea.typeLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-fredoka font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {idea.title}
        </h3>

        {/* Concept Synopsis */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {idea.summary}
        </p>

        {/* Language Target Box */}
        <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 text-xs space-y-1">
          <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Mục tiêu ngôn ngữ:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 italic">
            {idea.languageGoal}
          </p>
        </div>

        {/* Metadata Chips: Students, Time, Energy, Props */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span><strong>{idea.targetStudents}</strong> học sinh</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{idea.duration}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < idea.energyLevel ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
            <Box className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="truncate" title={idea.propsNeeded.join(', ')}>
              {idea.propsNeeded.length > 0 ? idea.propsNeeded.slice(0, 2).join(', ') : 'Không cần đạo cụ'}
            </span>
          </div>
        </div>

        {/* Key Highlight */}
        {idea.keyHighlight && (
          <div className="text-[11px] text-pink-700 dark:text-pink-300 font-medium bg-pink-50 dark:bg-pink-950/40 px-3 py-1.5 rounded-xl border border-pink-200 dark:border-pink-900/50 flex items-center gap-1.5">
            <span>✨ Điểm hấp dẫn:</span>
            <span className="font-semibold">{idea.keyHighlight}</span>
          </div>
        )}
      </div>

      {/* Select Action Button */}
      <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-fredoka font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
          {isSelected ? 'Đã chọn ý tưởng này' : 'Chọn ý tưởng này'}
        </span>

        <button
          type="button"
          disabled={isGenerating}
          className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-indigo-600/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white'
          }`}
        >
          {isSelected ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tạo Kịch Bản</span>
            </>
          ) : (
            <>
              <span>Chi Tiết</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WarmupIdeaCard;
