/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, ShieldCheck, Lock, Unlock, KeyRound, UserCheck, 
  Crown, Mail, Sparkles, CheckCircle2, AlertTriangle, Copy, 
  Eye, RefreshCw, Smartphone, Globe, Award, FileText
} from 'lucide-react';
import { sounds } from '../lib/audio';
import TeacherCertificateModal from './TeacherCertificateModal';

interface AuthorProfileAndSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwnerMode: boolean;
  setIsOwnerMode: (val: boolean) => void;
  isEditLockedForGuests: boolean;
  setIsEditLockedForGuests: (val: boolean) => void;
  ownerPin: string;
  setOwnerPin: (pin: string) => void;
}

export default function AuthorProfileAndSecurityModal({
  isOpen,
  onClose,
  isOwnerMode,
  setIsOwnerMode,
  isEditLockedForGuests,
  setIsEditLockedForGuests,
  ownerPin,
  setOwnerPin
}: AuthorProfileAndSecurityModalProps) {
  const [pinInput, setPinInput] = useState(ownerPin);
  const [showPinSaved, setShowPinSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const certCode = localStorage.getItem('smartedu_cert_code') || 'SMARTEDU-GVST-2026-882391';

  if (!isOpen) return null;

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim() || pinInput.length < 4) {
      alert('Mã PIN cần có tối thiểu 4 ký tự!');
      return;
    }
    setOwnerPin(pinInput.trim());
    localStorage.setItem('smartedu_owner_pin', pinInput.trim());
    setShowPinSaved(true);
    sounds.playLevelUp();
    setTimeout(() => setShowPinSaved(false), 2500);
  };

  const handleCopyShareLink = () => {
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    sounds.playCoin();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
        <div className="bg-white rounded-[36px] w-full max-w-2xl overflow-hidden shadow-2xl border-4 border-indigo-300 flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-6 text-white flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3.5 z-10">
              <div className="w-14 h-14 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white animate-bounce text-purple-950 font-bold">
                👩‍🏫
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-fredoka font-black text-2xl md:text-3xl text-yellow-300">
                    ThanhNguyen
                  </span>
                  <span className="bg-amber-400 text-purple-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-purple-950" /> CHÍNH CHỦ
                  </span>
                </div>
                <p className="text-xs text-indigo-100 font-bold">
                  Tác giả hệ thống & Bảng điều khiển phân quyền chỉnh sửa link chia sẻ
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-purple-950 flex items-center justify-center transition-all cursor-pointer font-bold z-10 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Author info card */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-3xl p-5 border border-indigo-200/80 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-fredoka font-black text-base text-gray-900 flex items-center gap-2">
                    <span>Cô Giáo Thanh Nguyễn (ThanhNguyen)</span>
                  </h4>
                  <p className="text-xs text-gray-600 font-medium flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Email xác thực: <b>ngoisaotinhyeu265@gmail.com</b></span>
                  </p>
                </div>

                <div className="px-3 py-1.5 bg-indigo-600 text-white rounded-2xl text-xs font-fredoka font-bold shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-yellow-300" />
                  <span>Toàn Quyền Sư Phạm 100%</span>
                </div>
              </div>

              <div className="text-xs text-gray-700 bg-white/80 p-3 rounded-2xl border border-indigo-100/60 leading-relaxed font-sans">
                ✨ <b>Chính sách bảo vệ:</b> Tài khoản chính chủ <b>ThanhNguyen</b> có quyền tự do thêm, sửa, xóa giáo án, câu hỏi, đề thi và tài liệu SGK mà không bao giờ bị hỏi mã cấp quyền.
              </div>
            </div>

            {/* Creative Teacher Certificate Honor Card in Profile */}
            <div className="bg-gradient-to-br from-amber-400/20 via-yellow-400/15 to-amber-500/20 rounded-3xl p-4 md:p-5 border-2 border-amber-300/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-12 h-12 bg-amber-400 text-purple-950 rounded-2xl flex items-center justify-center text-2xl font-black shadow-md border border-white shrink-0">
                  🏆
                </div>
                <div>
                  <h5 className="font-fredoka font-black text-sm text-gray-900 flex items-center justify-center sm:justify-start gap-1.5">
                    <span>Giấy Chứng Nhận Giáo Viên Sáng Tạo Tiêu Biểu</span>
                  </h5>
                  <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                    Mã xác thực duy nhất: <b className="font-mono text-purple-950">{certCode}</b>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setShowCertModal(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-purple-950 font-fredoka font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0 border border-white/60"
              >
                <FileText className="w-4 h-4" />
                <span>Xuất Giấy Chứng Nhận PDF 📄</span>
              </button>
            </div>

            {/* Edit Lock Feature Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-fredoka font-extrabold text-base text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  <span>Khóa Chỉnh Sửa Cho Người Truy Cập Link (Chỉ Xem)</span>
                </h4>
              </div>

              {/* Toggle Switch */}
              <div className="bg-gray-50 rounded-3xl p-5 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-xs text-gray-900">
                      Bật chế độ Khóa Chỉnh Sửa khi người khác truy cập link:
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Người ngoài mở link chỉ được xem và trải nghiệm, nếu muốn sửa phải nhập Mã PIN hoặc gửi yêu cầu xin phép cô Thanh Nguyễn.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const next = !isEditLockedForGuests;
                      setIsEditLockedForGuests(next);
                      localStorage.setItem('smartedu_lock_for_guests', JSON.stringify(next));
                      sounds.playClick();
                    }}
                    className={`w-14 h-8 rounded-full transition-all flex items-center p-1 cursor-pointer shrink-0 ${
                      isEditLockedForGuests ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[10px]">
                      {isEditLockedForGuests ? '🔒' : '🔓'}
                    </div>
                  </button>
                </div>

                {/* Status Alert */}
                <div className={`p-3.5 rounded-2xl text-xs font-medium flex items-center gap-3 ${
                  isEditLockedForGuests ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  {isEditLockedForGuests ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span><b>Đang BẬT bảo vệ link:</b> Chỉ một mình Cô Thanh Nguyễn được sửa trực tiếp. Người khác sẽ bị khóa và hiển thị hộp thoại xin phép.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span><b>Đang TẮT khóa:</b> Tất cả mọi người có link đều có thể tạm thời chỉnh sửa nội dung.</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick PIN Code Config */}
            <form onSubmit={handleSavePin} className="bg-gray-50 rounded-3xl p-5 border border-gray-200 space-y-3">
              <h5 className="font-fredoka font-extrabold text-xs text-gray-900 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-indigo-600" />
                <span>Mã PIN Mở Khóa Nhanh Cho Đồng Nghiệp / Khách Được Phép</span>
              </h5>
              
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Cô có thể gửi Mã PIN này cho đồng nghiệp tin cậy nếu muốn cấp quyền chỉnh sửa cho họ mà không cần phê duyệt thủ công:
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ví dụ: 123456"
                  className="w-48 p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-extrabold text-indigo-900 tracking-widest text-center outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  Lưu Mã PIN 💾
                </button>

                {showPinSaved && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Đã lưu mã mới!
                  </span>
                )}
              </div>
            </form>

            {/* Test Switch: Owner View vs Guest View */}
            <div className="bg-purple-50/70 rounded-3xl p-5 border border-purple-200 space-y-3">
              <h5 className="font-fredoka font-extrabold text-xs text-purple-950 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-700" />
                <span>Thử Nghiệm Góc Nhìn Của Khách Truy Cập (Test Chế Độ Khóa)</span>
              </h5>

              <p className="text-[11px] text-purple-900/80 leading-relaxed">
                Cô có thể tạm thời chuyển sang vai trò "Khách xem" để tự mình kiểm tra xem khi người ngoài bấm vào nút Sửa/Xóa giáo án thì hộp thoại xin phép sẽ hiển thị ra sao:
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const next = !isOwnerMode;
                    setIsOwnerMode(next);
                    localStorage.setItem('smartedu_owner_mode', JSON.stringify(next));
                    sounds.playClick();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                    isOwnerMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-amber-500 hover:bg-amber-600 text-purple-950'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>
                    {isOwnerMode ? 'Chuyển sang Góc nhìn Khách xem (Đang là Chính chủ)' : 'Trở về Vai trò Chính chủ Cô Thanh Nguyễn'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="px-3.5 py-2 bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Đã sao chép link!' : 'Sao chép link web'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold">Tác giả: Cô Thanh Nguyễn • SmartEdu Build</span>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              Đóng bảng quản lý
            </button>
          </div>

        </div>
      </div>

      <TeacherCertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        certCode={certCode}
      />
    </>
  );
}

