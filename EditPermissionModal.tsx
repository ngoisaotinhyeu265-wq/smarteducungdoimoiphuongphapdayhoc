/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Lock, KeyRound, Send, ShieldAlert, Sparkles, 
  CheckCircle2, AlertCircle, HelpCircle, Eye
} from 'lucide-react';
import { sounds } from '../lib/audio';

interface EditPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionTitle?: string;
  ownerPin: string;
  onUnlockSuccess: () => void;
  onRequestPermission: (requesterName: string, reason: string) => void;
}

export default function EditPermissionModal({
  isOpen,
  onClose,
  actionTitle = 'chỉnh sửa nội dung này',
  ownerPin,
  onUnlockSuccess,
  onRequestPermission
}: EditPermissionModalProps) {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requesterName, setRequesterName] = useState('');
  const [requesterSchool, setRequesterSchool] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ownerPin.trim()) {
      sounds.playLevelUp();
      setErrorMsg(null);
      onUnlockSuccess();
      onClose();
    } else {
      sounds.playError?.();
      setErrorMsg('Mã PIN chưa chính xác! Vui lòng liên hệ cô Thanh Nguyễn hoặc gửi yêu cầu xin cấp quyền.');
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requesterName.trim()) {
      alert('Vui lòng nhập tên của thầy cô!');
      return;
    }
    onRequestPermission(
      requesterName.trim(), 
      requesterSchool.trim() ? `Trường: ${requesterSchool.trim()} - Xin phép ${actionTitle}` : `Xin phép ${actionTitle}`
    );
    sounds.playCoin();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setShowRequestForm(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-[36px] w-full max-w-lg overflow-hidden shadow-2xl border-4 border-amber-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🔒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fredoka font-black text-xl text-white">
                  Yêu Cầu Quyền Chỉnh Sửa
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Nội dung được bảo vệ bởi tác giả <b>ThanhNguyen</b>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer font-bold z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">
                Ứng dụng đang ở Chế độ Xem An Toàn (Read-Only):
              </p>
              <p className="mt-0.5">
                Để tránh thay đổi dữ liệu gốc khi chia sẻ link, chỉ một mình tài khoản chính chủ <b>Cô giáo Thanh Nguyễn</b> (Email: <i>ngoisaotinhyeu265@gmail.com</i>) được chỉnh sửa trực tiếp không cần hỏi.
              </p>
            </div>
          </div>

          {requestSent ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-5 rounded-2xl text-center space-y-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h5 className="font-fredoka font-extrabold text-sm">Đã Gửi Yêu Cầu Xin Phép!</h5>
              <p className="text-xs">
                Yêu cầu của thầy cô đã được gửi tới bảng thông báo của <b>Cô Thanh Nguyễn</b>. Khi cô phê duyệt, thầy cô sẽ có quyền chỉnh sửa.
              </p>
            </div>
          ) : !showRequestForm ? (
            <div className="space-y-4">
              {/* PIN Code Verification Form */}
              <form onSubmit={handleVerifyPin} className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-800">
                  Nhập Mã PIN cấp quyền từ cô Thanh Nguyễn (nếu có):
                </label>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Nhập mã PIN (Mặc định: 123456)"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    Mở Khóa 🔓
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-[11px] font-bold text-red-500 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
                  </p>
                )}
              </form>

              {/* Option 2: Request permission */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(true)}
                  className="text-xs font-fredoka font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Tôi chưa có mã PIN? Gửi lời nhắn xin quyền cô Thanh Nguyễn ✉️</span>
                </button>
              </div>
            </div>
          ) : (
            /* Send Request Form */
            <form onSubmit={handleSendRequest} className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h5 className="font-fredoka font-bold text-xs text-gray-900 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-indigo-600" />
                <span>Gửi Lời Nhắn Xin Quyền Chỉnh Sửa</span>
              </h5>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Họ và tên của thầy cô (*)</label>
                <input
                  type="text"
                  required
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="Ví dụ: Thầy Hoàng Hùng"
                  className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Trường / Đơn vị công tác</label>
                <input
                  type="text"
                  value={requesterSchool}
                  onChange={(e) => setRequesterSchool(e.target.value)}
                  placeholder="Ví dụ: Trường Tiểu học Kim Đồng"
                  className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-800 outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-3 py-1.5 text-xs text-gray-500 font-bold hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Gửi yêu cầu ngay
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="text-xs font-bold text-gray-500 hover:text-gray-700 cursor-pointer flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> Tiếp tục xem (Chỉ đọc)
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-fredoka font-bold text-xs rounded-xl cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
