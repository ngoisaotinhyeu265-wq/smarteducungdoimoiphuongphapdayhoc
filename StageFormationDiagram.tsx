/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, MapPin, Sparkles } from 'lucide-react';
import { CharacterRole } from '../../types/warmup';

interface StageFormationDiagramProps {
  formation: {
    layoutType: string;
    description: string;
    positions: Array<{
      characterName: string;
      roleTitle: string;
      x: number;
      y: number;
      facing: string;
    }>;
  };
  characters: CharacterRole[];
  selectedCharacter?: string | null;
  onSelectCharacter?: (name: string) => void;
}

export default function StageFormationDiagram({
  formation,
  characters,
  selectedCharacter,
  onSelectCharacter
}: StageFormationDiagramProps) {
  return (
    <div className="bg-slate-900/90 dark:bg-slate-950 text-white rounded-3xl p-5 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Users className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-fredoka font-bold text-sm text-white flex items-center gap-2">
              Sơ Đồ Đội Hình Sân Khấu Lớp Học (Stage Set-up)
              <span className="px-2 py-0.5 rounded-full bg-indigo-600/60 text-[10px] font-mono text-indigo-200">
                {formation.positions.length} Diễn viên nhí
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              {formation.description || 'Bố trí vị trí đứng trực quan để học sinh tự tin biểu diễn.'}
            </p>
          </div>
        </div>
        <div className="text-[11px] text-indigo-300 font-medium flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
          <span>Nhấp vào nhân vật để xem lời thoại riêng</span>
        </div>
      </div>

      {/* Visual Canvas Layout representing the Stage & Classroom */}
      <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 rounded-2xl border-2 border-dashed border-indigo-500/30 p-4 flex flex-col justify-between overflow-hidden select-none">
        
        {/* Top: Black Board / Interactive Screen Marker */}
        <div className="w-full flex justify-center">
          <div className="px-6 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-fredoka font-bold flex items-center gap-2 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>KHU VỰC BẢNG LỚP HỌC / MÀN HÌNH TƯƠNG TÁC (FRONT BOARD)</span>
          </div>
        </div>

        {/* Center: Stage Performers Area */}
        <div className="relative flex-1 my-2">
          {formation.positions.map((pos, idx) => {
            const charInfo = characters.find(c => pos.characterName.toLowerCase().includes(c.name.toLowerCase()));
            const isSelected = selectedCharacter && pos.characterName.toLowerCase().includes(selectedCharacter.toLowerCase());
            
            // Generate avatar emoji based on role
            let emoji = '👦';
            if (pos.roleTitle.toLowerCase().includes('host') || pos.characterName.toLowerCase().includes('anna') || pos.characterName.toLowerCase().includes('mai')) emoji = '👧';
            if (pos.roleTitle.toLowerCase().includes('reporter')) emoji = '🎙️';
            if (pos.roleTitle.toLowerCase().includes('guest')) emoji = '⭐';
            if (pos.roleTitle.toLowerCase().includes('actor') || pos.roleTitle.toLowerCase().includes('funny')) emoji = '🎭';

            return (
              <div
                key={idx}
                onClick={() => onSelectCharacter && onSelectCharacter(pos.characterName)}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute cursor-pointer transition-all duration-300 group ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
              >
                {/* Performer Avatar Pin */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-pink-500 to-amber-400 border-white ring-4 ring-pink-500/50 shadow-pink-500/50'
                      : 'bg-gradient-to-tr from-indigo-600 to-purple-600 border-indigo-300/80 shadow-indigo-600/30 group-hover:border-white'
                  }`}>
                    {emoji}
                  </div>
                  
                  {/* Name Tag Badge */}
                  <div className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-white text-[11px] font-fredoka font-bold flex items-center gap-1 shadow-md whitespace-nowrap">
                    <span>{pos.characterName.split(' ')[0]}</span>
                    <span className="text-[9px] text-indigo-300 font-normal">({pos.roleTitle})</span>
                  </div>

                  {/* Facing direction indicator */}
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {pos.facing === 'audience' ? '⬇ Hướng khán giả' : pos.facing === 'center' ? '🔄 Hướng trung tâm' : '↔ Đối diện'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Whole Class Audience Zone */}
        <div className="w-full pt-2 border-t border-slate-800 flex items-center justify-between px-4">
          <div className="text-[11px] font-fredoka font-semibold text-slate-400 flex items-center gap-1.5">
            <span>👥 KHÁN GIẢ: CẢ LỚP HỌC SINH (WHOLE CLASS AUDIENCE)</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <span>Tương tác: Vỗ tay • Hô to • TPR</span>
          </div>
        </div>
      </div>

      {/* Performer Character Tags & Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mt-4">
        {characters.map((char, cIdx) => (
          <div
            key={cIdx}
            onClick={() => onSelectCharacter && onSelectCharacter(char.name)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              selectedCharacter?.toLowerCase() === char.name.toLowerCase()
                ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-400/40 text-white'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-fredoka font-bold text-xs text-indigo-300">
                {char.name}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                char.speakingLoad === 'heavy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : char.speakingLoad === 'medium'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {char.speakingLoad === 'heavy' ? 'Nói nhiều' : char.speakingLoad === 'medium' ? 'Nói vừa' : 'Nói ngắn/Động tác'}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-white">{char.roleTitle}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{char.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
