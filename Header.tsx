/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, Crown, Star, Volume2, VolumeX, Award, ShieldCheck, 
  Lock, Unlock, UserCheck, Sparkles, BookOpen, Languages
} from 'lucide-react';
import { sounds } from '../lib/audio';
import CoinRewardsModal from './CoinRewardsModal';
import ProUpgradeModal from './ProUpgradeModal';
import NotificationCenterModal, { NotificationItem } from './NotificationCenterModal';
import AuthorProfileAndSecurityModal from './AuthorProfileAndSecurityModal';
import StudentRewardStickersModal from './StudentRewardStickersModal';

interface HeaderProps {
  onMuteToggle: () => void;
  isMuted: boolean;
  coins: number;
  onAddCoins: (amount: number) => void;
  isOwnerMode: boolean;
  setIsOwnerMode: (val: boolean) => void;
  isEditLockedForGuests: boolean;
  setIsEditLockedForGuests: (val: boolean) => void;
  ownerPin: string;
  setOwnerPin: (pin: string) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAllNotifications: () => void;
  onApprovePermissionRequest: (notifId: string) => void;
  onRejectPermissionRequest: (notifId: string) => void;
  onCheckCanEdit?: (actionTitle: string, onAuthorized: () => void) => void;
  onOpenDictionary?: () => void;
}

export default function Header({
  onMuteToggle,
  isMuted,
  coins,
  onAddCoins,
  isOwnerMode,
  setIsOwnerMode,
  isEditLockedForGuests,
  setIsEditLockedForGuests,
  ownerPin,
  setOwnerPin,
  notifications,
  onMarkAllRead,
  onClearAllNotifications,
  onApprovePermissionRequest,
  onRejectPermissionRequest,
  onCheckCanEdit,
  onOpenDictionary
}: HeaderProps) {
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showStickersModal, setShowStickersModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <div className="relative w-full h-[180px] md:h-[200px] rounded-[32px] md:rounded-[40px] overflow-hidden bg-white/15 backdrop-blur-xl border border-white/25 shadow-2xl flex flex-col justify-between p-6 text-white select-none">
        
        {/* Decorative Whimsical Background Elements */}
        <div className="absolute top-0 left-1/4 w-[180px] h-[180px] md:w-[240px] md:h-[240px] border-[16px] md:border-[24px] border-white/20 border-b-transparent rounded-full -translate-y-1/2 rotate-45 pointer-events-none opacity-40 blur-[1px]"></div>
        <div className="absolute top-0 left-1/4 w-[180px] h-[180px] md:w-[240px] md:h-[240px] border-[8px] md:border-[12px] border-amber-300/30 border-b-transparent rounded-full -translate-y-1/2 rotate-45 pointer-events-none opacity-50"></div>
        
        {/* Tiny Twinkling Stars */}
        <div className="absolute top-4 left-10 text-yellow-200 animate-pulse-star opacity-80 pointer-events-none">⭐</div>
        <div className="absolute top-16 left-1/3 text-yellow-100 animate-pulse-star opacity-60 pointer-events-none text-xs" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-8 right-1/4 text-yellow-200 animate-pulse-star opacity-95 pointer-events-none text-lg" style={{ animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute top-24 left-12 text-yellow-300 animate-pulse-star opacity-50 pointer-events-none text-sm" style={{ animationDelay: '0.5s' }}>⭐</div>
        
        {/* Interactive Floating Clouds */}
        <div className="absolute bottom-6 left-6 w-16 h-8 bg-white/30 rounded-full blur-[2px] animate-float-slow pointer-events-none"></div>
        <div className="absolute top-4 right-12 w-24 h-10 bg-white/20 rounded-full blur-[1px] animate-float pointer-events-none"></div>

        {/* Floating Confetti Elements */}
        <div className="absolute top-8 left-1/2 w-3 h-3 bg-pink-400 rotate-12 rounded-sm opacity-60 animate-bounce"></div>
        <div className="absolute top-20 right-1/3 w-2 h-4 bg-yellow-300 -rotate-45 rounded-sm opacity-60 animate-bounce"></div>
        <div className="absolute top-12 right-20 w-3 h-3 bg-cyan-300 rotate-45 rounded-full opacity-60 animate-bounce"></div>

        {/* Header Content Top Row */}
        <div className="z-10 flex items-center justify-between w-full">
          {/* Left: Brand Identity & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-14 h-14 bg-white/90 rounded-2xl shadow-lg border-2 border-yellow-300 animate-bounce text-3xl">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fredoka text-2xl md:text-3xl font-extrabold text-yellow-300 tracking-wide drop-shadow-md">
                  SmartEdu
                </span>
                <button
                  onClick={() => {
                    sounds.playLevelUp();
                    setShowProModal(true);
                  }}
                  className="bg-yellow-400 text-purple-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse border border-white/30 cursor-pointer hover:scale-110 transition-transform"
                  title="Nhấn để xem chứng nhận Pro VIP"
                >
                  PRO
                </button>
              </div>
              <h1 className="font-fredoka text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-sm mt-0.5">
                Cùng đổi mới phương pháp giảng dạy
              </h1>
            </div>
          </div>

          {/* Right: Actions, Point Counter, Teacher Profile */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Dictionary Quick Button */}
            {onOpenDictionary && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenDictionary();
                }}
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 border border-white/30 px-3 py-1.5 rounded-2xl cursor-pointer transition-all hover:scale-105 active:scale-95 text-xs font-bold text-white shadow-sm"
                title="Mở Từ điển Tiếng Anh Tiểu học 400+ từ (Global Success)"
              >
                <Languages className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span className="hidden lg:inline">Từ điển Tiểu học</span>
              </button>
            )}

            {/* Sound Toggle Button */}
            <button
              onClick={() => {
                onMuteToggle();
                if (isMuted) {
                  setTimeout(() => sounds.playClick(), 50);
                }
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center cursor-pointer transition-all hover:scale-115 active:scale-90"
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-gray-200" /> : <Volume2 className="w-5 h-5 text-yellow-300" />}
            </button>

            {/* Reward Points Badge -> CLICK TO OPEN COINS MODAL */}
            <button
              onClick={() => {
                sounds.playCoin();
                setShowCoinsModal(true);
              }}
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-purple-950 px-3.5 py-1.5 rounded-2xl font-fredoka font-bold shadow-md border-2 border-white/50 animate-float cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Nhấn để mở Kho Xu & Nhận Thưởng Điểm Danh"
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{coins.toLocaleString()} xu</span>
            </button>

            {/* Quick Access to Student Reward Sticker Pack (Bộ 50+ Nhãn Dán Khen Thưởng Học Sinh Động) */}
            <button
              onClick={() => {
                sounds.playLevelUp();
                setShowStickersModal(true);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-3.5 py-1.5 rounded-2xl font-fredoka font-bold shadow-md border-2 border-white/60 cursor-pointer hover:scale-105 active:scale-95 transition-all animate-pulse"
              title="Mở Bộ 50+ Nhãn Dán Khen Thưởng Học Sinh Động (Đã Kích Hoạt)"
            >
              <span className="text-base">🎨</span>
              <span className="hidden sm:inline">Nhãn Dán</span>
              <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-black">50+</span>
            </button>

            {/* Upgrade Pro Button -> CLICK TO OPEN PRO MODAL */}
            <button
              onClick={() => {
                sounds.playLevelUp();
                setShowProModal(true);
              }}
              className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-purple-950 font-fredoka font-extrabold text-sm px-4 py-2 rounded-2xl shadow-lg border-2 border-white hover:shadow-yellow-300/30 cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Nhấn để xem bảng quyền lợi VIP Pro"
            >
              <Crown className="w-4 h-4 fill-yellow-600 text-yellow-700 animate-bounce" />
              <span>Nâng cấp Pro</span>
            </button>

            {/* Notification Button -> CLICK TO OPEN NOTIFICATION MODAL */}
            <div className="relative">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowNotificationsModal(true);
                }}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
                title="Nhấn để xem Trung tâm thông báo"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-purple-950 font-extrabold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Teacher Profile Avatar "ThanhNguyen" -> CLICK TO OPEN PROFILE & PERMISSION CONTROL */}
            <button
              onClick={() => {
                sounds.playClick();
                if (isOwnerMode) {
                  // Owner account: open directly without asking!
                  setShowProfileModal(true);
                } else {
                  // Guest: trigger permission challenge / ask to edit
                  if (onCheckCanEdit) {
                    onCheckCanEdit('truy cập hồ sơ & phân quyền chỉnh sửa tác giả', () => {
                      setShowProfileModal(true);
                    });
                  } else {
                    setShowProfileModal(true);
                  }
                }
              }}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-full pl-2 pr-3.5 py-1.5 border border-white/30 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md text-left"
              title={isOwnerMode ? "Tài khoản Cô Thanh Nguyễn (Chính chủ) - Nhấn để quản lý" : "Nhấn để xin quyền chỉnh sửa từ Cô Thanh Nguyễn"}
            >
              <div className="w-9 h-9 bg-gradient-to-tr from-amber-300 to-yellow-400 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xl overflow-hidden font-bold select-none text-purple-950">
                👩‍🏫
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-black leading-none text-yellow-200">ThanhNguyen</p>
                  {isOwnerMode ? (
                    <Crown className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <Lock className="w-3 h-3 text-amber-300" />
                  )}
                </div>
                <span className="text-[10px] text-indigo-100 font-bold">
                  {isOwnerMode ? '👑 Tác Giả (Chính Chủ)' : '🔒 Chế Độ Khách'}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Header Subtext Bottom Row */}
        <div className="z-10 flex items-center justify-between w-full mt-2 md:mt-4">
          <p className="font-sans text-xs md:text-sm text-indigo-100 font-bold max-w-lg">
            🚀 Hệ thống Soạn Kế hoạch bài dạy CV 2345 & Trợ lý Sư phạm Đổi mới của Cô Thanh Nguyễn
          </p>
          <div className="flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-fredoka font-bold px-3 py-1 rounded-full border border-white/20 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>
              {isOwnerMode ? 'Tài Khoản Toàn Quyền Chỉnh Sửa 👑' : 'Chế Độ Xem Chia Sẻ 🔒'}
            </span>
          </div>
        </div>

      </div>

      {/* Modals Container */}
      <CoinRewardsModal
        isOpen={showCoinsModal}
        onClose={() => setShowCoinsModal(false)}
        coins={coins}
        onAddCoins={onAddCoins}
      />

      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
      />

      <NotificationCenterModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={notifications}
        onMarkAllRead={onMarkAllRead}
        onClearAll={onClearAllNotifications}
        onApproveRequest={onApprovePermissionRequest}
        onRejectRequest={onRejectPermissionRequest}
      />

      <AuthorProfileAndSecurityModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        isOwnerMode={isOwnerMode}
        setIsOwnerMode={setIsOwnerMode}
        isEditLockedForGuests={isEditLockedForGuests}
        setIsEditLockedForGuests={setIsEditLockedForGuests}
        ownerPin={ownerPin}
        setOwnerPin={setOwnerPin}
      />

      {/* Student Reward Stickers Modal accessible from Header */}
      <StudentRewardStickersModal
        isOpen={showStickersModal}
        onClose={() => setShowStickersModal(false)}
      />
    </>
  );
}
