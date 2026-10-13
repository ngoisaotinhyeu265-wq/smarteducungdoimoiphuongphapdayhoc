/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, Plus, Star, Award, ShieldAlert, Sparkles, UserPlus } from 'lucide-react';
import { Student } from '../types';
import { sounds } from '../lib/audio';

export default function StudentReport() {
  const [students, setStudents] = useState<Student[]>([
    { id: 's1', name: 'Nguyễn Lâm Đăng', avatar: '🐶', level: 4, xp: 80, coins: 120, petName: 'Lulu', petType: 'Cún Cứu Hộ', badges: ['Chăm Chỉ', 'Vua Toán Học'] },
    { id: 's2', name: 'Lê Mai Vy', avatar: '🐱', level: 3, xp: 95, coins: 210, petName: 'Miu Miu', petType: 'Mèo Cam', badges: ['Sáng Tạo', 'Đồng Đội Tốt'] },
    { id: 's3', name: 'Trần Gia Bảo', avatar: '🦁', level: 3, xp: 40, coins: 150, petName: 'Simba', petType: 'Sư Tử Nhí', badges: ['Nhanh Nhẹn'] },
    { id: 's4', name: 'Phạm Đan Thanh', avatar: '🐼', level: 2, xp: 75, coins: 90, petName: 'Bubu', petType: 'Gấu Trúc', badges: ['Tỉ Mỉ'] },
    { id: 's5', name: 'Hoàng Hải Đăng', avatar: '🦊', level: 2, xp: 20, coins: 60, petName: 'Kiki', petType: 'Cáo Đỏ', badges: [] }
  ]);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAvatar, setNewStudentAvatar] = useState('🐵');
  const [newStudentPet, setNewStudentPet] = useState('Khủng Long Nhỏ');

  const avatarOptions = ['🐶', '🐱', '🦁', '🐼', '🦊', '🐵', '🐸', '🐨', '🦄', '🐰'];
  const petOptions = ['Khủng Long Nhỏ', 'Rồng Lửa', 'Phượng Hoàng', 'Thỏ Trắng', 'Chim Cánh Cụt'];

  // Particle effect state for star reward click
  const [rewardingStudentId, setRewardingStudentId] = useState<string | null>(null);

  const handleReward = (id: string) => {
    sounds.playCoin();
    setRewardingStudentId(id);
    setTimeout(() => setRewardingStudentId(null), 800);

    setStudents(prev => 
      prev.map(s => {
        if (s.id === id) {
          let newXp = s.xp + 15;
          let newLevel = s.level;
          let levelUpTriggered = false;

          if (newXp >= 100) {
            newLevel += 1;
            newXp = newXp - 100;
            levelUpTriggered = true;
          }

          if (levelUpTriggered) {
            setTimeout(() => {
              sounds.playLevelUp();
              alert(`🎉 Bé ${s.name} vừa THĂNG CẤP lên Cấp ${newLevel}! Bé giỏi quá xá! 🏆`);
            }, 100);
          }

          return {
            ...s,
            xp: newXp,
            level: newLevel,
            coins: s.coins + 10
          };
        }
        return s;
      })
    );
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName) {
      sounds.playError();
      return;
    }

    const newS: Student = {
      id: 's_' + Math.random().toString(36).substring(2, 9),
      name: newStudentName,
      avatar: newStudentAvatar,
      level: 1,
      xp: 0,
      coins: 20,
      petName: 'Pipo',
      petType: newStudentPet,
      badges: ['Tân Binh']
    };

    setStudents([...students, newS]);
    setNewStudentName('');
    setShowAddStudent(false);
    sounds.playSuccess();
  };

  // Sort students for leaderboard rankings
  const leaderboard = [...students].sort((a, b) => {
    if (b.level !== a.level) return b.level - a.level;
    return b.xp - a.xp;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 select-none animate-fade-in text-left">
      
      {/* 1. Managed Students Roster List (2 cols on large screen) */}
      <div className="lg:col-span-2 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-fredoka text-xl md:text-2xl font-extrabold text-white flex items-center gap-1.5 drop-shadow-md">
              👦 Quản lý học sinh & Điểm thưởng
            </h2>
            <p className="text-xs md:text-sm text-indigo-100 font-semibold mt-1">
              Khích lệ học sinh phát biểu, làm bài tập và thăng tiến cấp độ học tập!
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowAddStudent(true);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-fredoka font-extrabold text-xs px-4 py-3 rounded-2xl shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm học sinh</span>
          </button>
        </div>

        {/* Student card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => {
            const progressPercentage = student.xp;
            const isRewarding = rewardingStudentId === student.id;

            return (
              <div 
                key={student.id}
                className="bg-white/15 backdrop-blur-xl rounded-[28px] p-5 border border-white/20 shadow-xl relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-2xl text-white"
              >
                {/* Reward star shower container */}
                {isRewarding && (
                  <div className="absolute inset-0 bg-yellow-300/15 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none animate-ping">
                    <Star className="w-16 h-16 fill-yellow-400 text-yellow-500 animate-spin" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Avatar Bubble */}
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-3xl border border-white/20 shadow-inner relative shrink-0">
                    {student.avatar}
                    <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white font-fredoka font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      {student.level}
                    </span>
                  </div>

                  {/* Student description and credentials */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-fredoka text-base font-extrabold text-white truncate">
                      {student.name}
                    </h3>
                    <p className="text-xs text-indigo-200 font-bold flex items-center gap-1.5 mt-1">
                      <span>Thú đồng hành: {student.petName} ({student.petType}) 🐾</span>
                    </p>

                    {/* Progress to next level bar */}
                    <div className="space-y-1 mt-3">
                      <div className="flex justify-between text-[10px] text-indigo-200 font-bold">
                        <span>XP Tiến trình: {student.xp}/100</span>
                        <span>Cấp {student.level + 1}</span>
                      </div>
                      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/10 p-[1px]">
                        <div 
                          className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Badges list */}
                    {student.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {student.badges.map((badge, idx) => (
                          <span key={idx} className="bg-yellow-400/20 text-yellow-300 border border-yellow-300/30 font-fredoka font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                            <Award className="w-2.5 h-2.5" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom CTA points awards row */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-xl text-xs font-bold shadow-inner">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <span>{student.coins} xu</span>
                  </div>

                  <button
                    onClick={() => handleReward(student.id)}
                    className="flex items-center gap-1 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 text-purple-950 font-fredoka font-extrabold text-xs px-4 py-2 rounded-2xl shadow-md border-2 border-white hover:scale-105 active:scale-95 cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+10 Sao thưởng 🌟</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Leaderboard Rankings Sidepanel (1 col on large screen) */}
      <div className="space-y-5">
        <div>
          <h2 className="font-fredoka text-xl md:text-2xl font-extrabold text-white flex items-center gap-1.5 drop-shadow-md">
            🏆 Bảng vàng học tập
          </h2>
          <p className="text-xs md:text-sm text-indigo-100 font-semibold mt-1">
            Vinh danh tinh thần xuất sắc thi đua sôi nổi
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-xl rounded-[28px] border border-white/20 p-5 shadow-2xl space-y-4 relative overflow-hidden text-white">
          {/* Decorative halo overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full translate-x-12 -translate-y-12 blur-md opacity-20"></div>

          {leaderboard.map((s, idx) => {
            const medals = ['🥇 Vua Lớp', '🥈 Á Quân', '🥉 Hạng 3'];
            const medalColors = ['bg-yellow-400/20 border-yellow-300 text-yellow-300', 'bg-slate-300/20 border-slate-200 text-slate-200', 'bg-orange-400/20 border-orange-300 text-orange-300'];

            return (
              <div 
                key={s.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all
                  ${idx === 0 ? 'border-yellow-300 ring-2 ring-yellow-400/30 bg-white/20' : 'border-white/10 bg-white/5'}
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Rank position index */}
                  {idx < 3 ? (
                    <span className={`px-2.5 py-1 text-[10px] font-fredoka font-bold rounded-full border ${medalColors[idx]}`}>
                      {medals[idx]}
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-white/10 text-indigo-200 font-fredoka font-extrabold text-xs flex items-center justify-center border border-white/10">
                      {idx + 1}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-xl select-none">{s.avatar}</span>
                    <span className="font-fredoka text-sm font-extrabold text-white">{s.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                  <span className="font-fredoka text-xs font-bold text-indigo-200">
                    Cấp {s.level} ({s.coins} sao)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Add Student Form Modal Pop-up */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handleAddStudent}
            className="w-full max-w-md bg-[#231A54] rounded-[32px] border border-white/25 shadow-2xl p-6 relative animate-float text-white"
          >
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setShowAddStudent(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center font-bold text-indigo-200 text-lg cursor-pointer transition-all"
            >
              ✕
            </button>

            <h3 className="font-fredoka text-xl font-extrabold text-emerald-300 flex items-center gap-1.5 mb-4 border-b border-white/10 pb-2">
              👦 Thêm học sinh mới
            </h3>

            <div className="space-y-4 text-xs font-bold text-indigo-100 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-indigo-200">📝 Họ và Tên học sinh</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Minh Quang"
                  className="p-3 bg-white/10 border border-white/20 rounded-xl outline-none text-white font-sans font-semibold text-sm focus:ring-1 focus:ring-white/30"
                />
              </div>

              {/* Selector for avatar emoji */}
              <div className="space-y-1.5">
                <label className="text-indigo-200">🐹 Chọn Avatar hoạt hình của bé</label>
                <div className="flex flex-wrap gap-2">
                  {avatarOptions.map(av => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => {
                        sounds.playClick();
                        setNewStudentAvatar(av);
                      }}
                      className={`text-2xl p-2.5 rounded-xl border-2 transition-all hover:scale-110 cursor-pointer
                        ${newStudentAvatar === av ? 'border-emerald-400 bg-emerald-400/20 scale-105' : 'border-white/10 bg-white/5'}
                      `}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector for starting Pet companion */}
              <div className="flex flex-col gap-1.5">
                <label className="text-indigo-200">🐾 Thú cưng đồng hành ban đầu</label>
                <select
                  value={newStudentPet}
                  onChange={(e) => setNewStudentPet(e.target.value)}
                  className="p-3 bg-indigo-700 border border-white/20 rounded-xl outline-none text-xs font-bold text-white cursor-pointer select-none"
                >
                  {petOptions.map(pet => (
                    <option key={pet} value={pet} className="bg-indigo-900 text-white">{pet}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Bottom actions */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setShowAddStudent(false);
                }}
                className="px-5 py-2.5 rounded-2xl bg-white/10 text-indigo-100 font-fredoka font-bold text-sm hover:bg-white/20 cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-fredoka font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Thêm học sinh</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
