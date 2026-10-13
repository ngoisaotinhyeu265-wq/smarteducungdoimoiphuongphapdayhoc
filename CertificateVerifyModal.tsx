/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Calendar, School, User, ExternalLink, X, Sparkles, FileCheck, Share2 } from 'lucide-react';
import { sounds } from '../lib/audio';

export interface VerifyCertificateInfo {
  code: string;
  name: string;
  school: string;
  date: string;
  title: string;
}

interface CertificateVerifyModalProps {
  info: VerifyCertificateInfo | null;
  onClose: () => void;
  onOpenApp?: () => void;
}

export default function CertificateVerifyModal({
  info,
  onClose,
  onOpenApp
}: CertificateVerifyModalProps) {
  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
        {/* Close button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-700 transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Verified Badge */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-400/20 animate-bounce">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-fredoka font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>XÁC THỰC CHÍNH HÃNG THÀNH CÔNG</span>
          </div>
          <h2 className="font-fredoka text-xl sm:text-2xl font-extrabold text-amber-300 uppercase tracking-wide">
            {info.title || 'GIÁO VIÊN SÁNG TẠO TIÊU BIỂU'}
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            Hệ thống Chứng nhận Giáo viên Đổi mới Sư phạm SmartEdu 2026
          </p>
        </div>

        {/* Verified Teacher Info Card */}
        <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Giáo viên được vinh danh</div>
              <div className="font-fredoka text-lg sm:text-xl font-extrabold text-white">
                {info.name}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 shrink-0">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Đơn vị công tác</div>
              <div className="font-semibold text-sm text-slate-200">
                {info.school}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/60">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Mã định danh chứng nhận</div>
              <div className="font-mono text-xs font-bold text-amber-400 truncate">
                {info.code}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Ngày cấp chứng nhận</div>
              <div className="font-bold text-xs text-slate-200">
                {info.date}
              </div>
            </div>
          </div>
        </div>

        {/* Standard Verification Details */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 text-xs text-emerald-200 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <FileCheck className="w-4 h-4" />
            <span>Tiêu chuẩn thẩm định sư phạm:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 pl-1">
            <li>Kế hoạch bài dạy chuẩn Công văn 2345/BGDĐT-GDTH.</li>
            <li>Tích hợp Khung giáo dục Trí tuệ Nhân tạo (QĐ 2422/QĐ-BGDĐT).</li>
            <li>Phát triển năng lực số học sinh theo Công văn 3456/BGDĐT-GDPT.</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => {
              sounds.playSuccess();
              onClose();
              if (onOpenApp) onOpenApp();
            }}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-fredoka font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Truy cập Nền Tảng SmartEdu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
