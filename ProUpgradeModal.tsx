/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, Crown, CheckCircle2, Sparkles, ShieldCheck, 
  Zap, FileText, Gamepad2, Download, BookOpen
} from 'lucide-react';
import { sounds } from '../lib/audio';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProUpgradeModal({ isOpen, onClose }: ProUpgradeModalProps) {
  if (!isOpen) return null;

  const proFeatures = [
    {
      title: 'AI Soạn Giáo Án Chuẩn Công Văn 2345 Không Giới Hạn',
      desc: 'Tự động tích hợp khung năng lực, phẩm chất, phương pháp tích hợp STEM/AI và bảng đặc tả kiểm tra đánh giá.',
      icon: <BookOpen className="w-5 h-5 text-yellow-300" />
    },
    {
      title: 'OCR Bóc Tách Trực Tiếp Toàn Bộ SGK Tiểu Học 1-5',
      desc: 'Hỗ trợ bộ sách Kết nối tri thức với cuộc sống & Bộ Giáo dục và Đào tạo (Global Success) trọn 35 tuần.',
      icon: <Zap className="w-5 h-5 text-yellow-300" />
    },
    {
      title: '500+ Trò Chơi Lớp Học Vui Nhộn & Thú Cưng Ảo',
      desc: 'Tạo game Ô chữ, Điền từ, Flashcard, Trí nhớ, Vòng quay may mắn phục vụ khởi động và củng cố tiết học.',
      icon: <Gamepad2 className="w-5 h-5 text-yellow-300" />
    },
    {
      title: 'Xuất File Word (.docx) & PDF Sư Phạm Chuyên Nghiệp',
      desc: 'Xuất bản giáo án và đề kiểm tra chuẩn 100% định dạng Bộ GD&ĐT, không chứa watermark hay quảng cáo.',
      icon: <FileText className="w-5 h-5 text-yellow-300" />
    },
    {
      title: 'Chế Độ Bảo Mật Liên Kết & Khóa Quyền Chỉnh Sửa',
      desc: 'Bảo vệ bản quyền giáo án khi chia sẻ link cho đồng nghiệp, chỉ có chính chủ được quyền sửa nội dung.',
      icon: <ShieldCheck className="w-5 h-5 text-yellow-300" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-[36px] w-full max-w-2xl overflow-hidden shadow-2xl border-4 border-yellow-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white animate-bounce text-purple-950">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fredoka font-black text-2xl md:text-3xl text-yellow-300">
                  SmartEdu PRO VIP
                </span>
                <span className="bg-yellow-400 text-purple-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  VĨNH VIỄN
                </span>
              </div>
              <p className="text-xs text-indigo-100 font-bold">
                Tài khoản của Cô Thanh Nguyễn đã được kích hoạt đặc quyền VIP cao cấp nhất!
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Status Badge Card */}
          <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border-2 border-yellow-400/60 rounded-3xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-purple-950 shadow-md shrink-0 font-bold text-2xl">
              🌟
            </div>
            <div className="space-y-0.5">
              <h4 className="font-fredoka font-black text-base text-gray-900 flex items-center gap-2">
                <span>Gói Bản Quyền: SmartEdu Master Educator Pro</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">Active</span>
              </h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Được cấp quyền sử dụng toàn diện công nghệ AI Gemini 3.7 Flash & Thư viện số hóa SGK Bộ Giáo dục và Đào tạo.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h4 className="font-fredoka font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Đặc Quyền Nâng Cao Đã Bao Gồm Trong Tài Khoản:</span>
            </h4>

            <div className="space-y-2.5">
              {proFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-gray-50 hover:bg-yellow-50/40 rounded-2xl border border-gray-200 transition-all">
                  <div className="p-2 bg-indigo-600 rounded-xl text-yellow-300 shadow-xs shrink-0 mt-0.5">
                    {feat.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                      <span>{feat.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-semibold">Tác giả: Cô giáo Thanh Nguyễn (ngoisaotinhyeu265@gmail.com)</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-purple-950 font-fredoka font-black text-xs rounded-xl shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all border border-white"
          >
            Tuyệt vời! Tiếp tục soạn bài ✨
          </button>
        </div>

      </div>
    </div>
  );
}
