/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Star, Gift, Sparkles, CheckCircle2, Trophy, Clock, 
  ArrowUpRight, Award, Zap, Heart, BookOpen, FileText, Eye
} from 'lucide-react';
import { sounds } from '../lib/audio';
import TeacherCertificateModal from './TeacherCertificateModal';
import StudentRewardStickersModal from './StudentRewardStickersModal';

interface CoinRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onAddCoins: (amount: number) => void;
}

export default function CoinRewardsModal({
  isOpen,
  onClose,
  coins,
  onAddCoins
}: CoinRewardsModalProps) {
  const [hasClaimedDaily, setHasClaimedDaily] = useState(() => {
    const today = new Date().toDateString();
    return localStorage.getItem('smartedu_daily_coin_claimed') === today;
  });
  const [claimedReward, setClaimedReward] = useState<string | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showStickersModal, setShowStickersModal] = useState(false);

  // Track if creative cert is unlocked
  const [isCertUnlocked, setIsCertUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('smartedu_creative_cert_unlocked') === 'true' || true;
  });

  // Track if 50+ Sticker Pack is unlocked (defaults to true since user already redeemed & had coins deducted)
  const [isStickerPackUnlocked, setIsStickerPackUnlocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('smartedu_sticker_pack_unlocked');
    if (saved === 'false') return false;
    localStorage.setItem('smartedu_sticker_pack_unlocked', 'true');
    return true;
  });

  const [certCode, setCertCode] = useState<string>(() => {
    let saved = localStorage.getItem('smartedu_cert_code');
    if (!saved) {
      saved = 'SMARTEDU-GVST-2026-' + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('smartedu_cert_code', saved);
    }
    return saved;
  });

  if (!isOpen) return null;

  const handleDailyCheckIn = () => {
    if (hasClaimedDaily) return;
    const today = new Date().toDateString();
    localStorage.setItem('smartedu_daily_coin_claimed', today);
    setHasClaimedDaily(true);
    onAddCoins(50);
    sounds.playLevelUp();
  };

  const handleRedeemGift = (giftId: string, title: string, cost: number) => {
    if (coins < cost) {
      alert(`Cô cần thêm ${cost - coins} xu nữa để đổi phần thưởng này nhé!`);
      return;
    }
    onAddCoins(-cost);
    setClaimedReward(title);
    sounds.playLevelUp();

    if (giftId === 'gift_creative_cert') {
      localStorage.setItem('smartedu_creative_cert_unlocked', 'true');
      setIsCertUnlocked(true);
      setTimeout(() => {
        setShowCertModal(true);
      }, 1000);
    }

    if (giftId === 'gift_sticker_pack') {
      localStorage.setItem('smartedu_sticker_pack_unlocked', 'true');
      setIsStickerPackUnlocked(true);
      setTimeout(() => {
        setShowStickersModal(true);
      }, 800);
    }

    setTimeout(() => setClaimedReward(null), 3500);
  };

  const redeemableGifts = [
    {
      id: 'gift_stem_templates',
      title: 'Trọn Bộ 30+ Mẫu Giáo Án STEM & AI Tiểu Học',
      desc: 'Thiết kế chuẩn Công văn 2345 với đầy đủ tiến trình 5E & bảng đặc tả.',
      cost: 0, // Free for Pro
      tag: 'ĐÃ SỞ HỮU PRO 👑',
      isUnlocked: true,
      icon: '📚'
    },
    {
      id: 'gift_creative_cert',
      title: 'Huy Hiệu & Chứng Nhận Giáo Viên Sáng Tạo Tiêu Biểu',
      desc: 'Xuất file PDF giấy chứng nhận vinh danh đổi mới phương pháp dạy học bằng thư viện jsPDF.',
      cost: 500,
      tag: isCertUnlocked ? 'ĐÃ SỞ HỮU 🏆' : '500 xu',
      isUnlocked: isCertUnlocked,
      icon: '🏆',
      isCertificate: true
    },
    {
      id: 'gift_sticker_pack',
      title: 'Bộ 50+ Nhãn Dán Khen Thưởng Học Sinh Động',
      desc: 'Hình sticker thú cưng ngộ nghĩnh, chèn trực tiếp vào bài kiểm tra & Word.',
      cost: 200,
      tag: isStickerPackUnlocked ? 'ĐÃ SỞ HỮU 🎨' : '200 xu',
      isUnlocked: isStickerPackUnlocked,
      icon: '🎨',
      isStickerPack: true
    },
    {
      id: 'gift_ai_voice',
      title: 'Gói Giọng Đọc AI Giáo Viên Chuẩn Phổ Thông',
      desc: 'Giọng Nam/Nữ truyền cảm, phát âm Tiếng Anh chuẩn quốc tế bản địa.',
      cost: 0,
      tag: 'ĐÃ KÍCH HOẠT ⭐',
      isUnlocked: true,
      icon: '🎙️'
    }
  ];

  const recentHistory = [
    { title: 'Điểm danh giáo viên tích cực hôm nay', delta: '+50 xu', time: 'Hôm nay' },
    { title: 'Đổi giấy chứng nhận Giáo viên Sáng tạo Tiêu biểu', delta: '-500 xu', time: 'Hôm nay' },
    { title: 'Hoàn thành soạn Kế hoạch bài dạy CV 2345', delta: '+100 xu', time: 'Hôm qua' },
    { title: 'Tạo 3 trò chơi lớp học vui nhộn cho học sinh', delta: '+150 xu', time: '2 ngày trước' }
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
        <div className="bg-white rounded-[36px] w-full max-w-2xl overflow-hidden shadow-2xl border-4 border-yellow-300 flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 text-purple-950 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3.5 z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-yellow-200 animate-bounce">
                ⭐
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-fredoka font-black text-2xl md:text-3xl text-purple-950">
                    Kho Xu Thưởng Sư Phạm
                  </span>
                </div>
                <p className="text-xs font-bold text-purple-900/80">
                  Tích lũy từ hoạt động soạn bài, tạo trò chơi và tương tác cùng học sinh!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-white/40 hover:bg-white text-purple-950 flex items-center justify-center transition-all cursor-pointer font-bold z-10 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Main Balance & Daily Check-in Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/20">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-300">Số dư hiện tại của cô:</span>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="font-fredoka text-4xl md:text-5xl font-black text-yellow-300 drop-shadow-md">
                    {coins.toLocaleString()} xu
                  </span>
                </div>
                <p className="text-xs text-indigo-200 font-medium">Hạng giáo viên: <b>Vàng Sáng Tạo 🌟</b> (Top 5% giáo viên tích cực)</p>
              </div>

              {/* Daily Checkin Button */}
              <button
                onClick={handleDailyCheckIn}
                disabled={hasClaimedDaily}
                className={`px-6 py-3.5 rounded-2xl font-fredoka font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all cursor-pointer ${
                  hasClaimedDaily 
                    ? 'bg-white/20 text-indigo-200 cursor-not-allowed border border-white/10'
                    : 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-purple-950 hover:scale-105 active:scale-95 border-2 border-white shadow-yellow-400/40 animate-pulse'
                }`}
              >
                {hasClaimedDaily ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Đã điểm danh hôm nay!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-purple-950" />
                    <span>Điểm danh nhận +50 xu 🎁</span>
                  </>
                )}
              </button>
            </div>

            {claimedReward && (
              <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 animate-bounce">
                <Trophy className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-xs">Đổi quà thành công!</p>
                  <p className="text-xs">Cô đã nhận: <b>{claimedReward}</b>. Hãy xuất giấy chứng nhận PDF hoặc kiểm tra trong kho tài nguyên nhé!</p>
                </div>
              </div>
            )}

            {/* Redeem gifts section */}
            <div className="space-y-3">
              <h4 className="font-fredoka font-extrabold text-base text-gray-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <span>Đổi Quà & Giấy Chứng Nhận Sư Phạm</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {redeemableGifts.map((gift) => (
                  <div 
                    key={gift.id}
                    className={`rounded-2xl p-4 border transition-all flex flex-col justify-between space-y-3 ${
                      gift.isCertificate 
                        ? 'bg-gradient-to-br from-amber-50 to-yellow-50/80 border-amber-300 shadow-sm' 
                        : 'bg-gray-50 hover:bg-indigo-50/50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl p-2 bg-white rounded-xl shadow-xs border border-gray-100">{gift.icon}</span>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-xs text-gray-900 leading-snug">{gift.title}</h5>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{gift.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 flex-wrap gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        gift.isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {gift.tag}
                      </span>

                      {gift.isUnlocked ? (
                        gift.isCertificate ? (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              setShowCertModal(true);
                            }}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-purple-950 rounded-xl text-xs font-fredoka font-black cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center gap-1 border border-amber-600/30"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Xuất Giấy PDF 📄</span>
                          </button>
                        ) : gift.isStickerPack ? (
                          <button
                            onClick={() => {
                              sounds.playLevelUp();
                              setShowStickersModal(true);
                            }}
                            className="px-3.5 py-1 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl text-xs font-fredoka font-black cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center gap-1 border border-pink-300 animate-pulse"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Mở Nhãn Dán 🎨</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng dùng
                          </span>
                        )
                      ) : (
                        <button
                          onClick={() => handleRedeemGift(gift.id, gift.title, gift.cost)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-fredoka font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                          Đổi ngay
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* History list */}
            <div className="space-y-3">
              <h4 className="font-fredoka font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Lịch Sử Nhận & Đổi Xu Gần Đây</span>
              </h4>
              <div className="bg-gray-50 rounded-2xl p-3 divide-y divide-gray-100 border border-gray-200">
                {recentHistory.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs first:pt-1 last:pb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.delta.startsWith('+') ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      <span className="font-medium text-gray-700">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-fredoka font-bold ${item.delta.startsWith('+') ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {item.delta}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium">💡 Mẹo: Nhấn nút "Xuất Giấy PDF 📄" để tải chứng nhận về máy!</p>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              Đóng bảng xu
            </button>
          </div>

        </div>
      </div>

      {/* Certificate Modal directly accessible from Coin Rewards */}
      <TeacherCertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        certCode={certCode}
      />

      {/* Student Reward Stickers Modal (Bộ 50+ Nhãn Dán Khen Thưởng Học Sinh Động) */}
      <StudentRewardStickersModal
        isOpen={showStickersModal}
        onClose={() => setShowStickersModal(false)}
      />
    </>
  );
}

