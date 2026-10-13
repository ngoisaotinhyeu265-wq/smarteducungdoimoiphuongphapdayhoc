/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Award, Download, Printer, Copy, CheckCircle2, 
  Sparkles, RefreshCw, Eye, Edit3, ShieldCheck, Share2, FileText
} from 'lucide-react';
import { 
  CertificateData, 
  drawCertificateToCanvas, 
  drawCertificateToCanvasAsync,
  exportCertificateToPdf, 
  exportCertificateToPng, 
  printCertificate 
} from '../utils/certificatePdfGenerator';
import { sounds } from '../lib/audio';
import { copyToClipboard } from '../utils/clipboard';

interface TeacherCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certCode: string;
  defaultTeacherName?: string;
  onCertCodeRegenerate?: () => void;
}

export default function TeacherCertificateModal({
  isOpen,
  onClose,
  certCode,
  defaultTeacherName = 'Cô Giáo Thanh Nguyễn (ThanhNguyen)',
  onCertCodeRegenerate
}: TeacherCertificateModalProps) {
  const [teacherName, setTeacherName] = useState(() => {
    return localStorage.getItem('smartedu_teacher_name') || defaultTeacherName;
  });
  const [schoolName, setSchoolName] = useState(() => {
    return localStorage.getItem('smartedu_cert_school') || 'Trường Tiểu Học & Hệ Thống Đổi Mới SmartEdu';
  });
  const [issueDate, setIssueDate] = useState(() => {
    return localStorage.getItem('smartedu_cert_date') || new Date().toLocaleDateString('vi-VN');
  });
  const [customReason, setCustomReason] = useState(() => {
    return localStorage.getItem('smartedu_cert_reason') || 
      'Đã có thành tích xuất sắc trong công tác Đổi mới Phương pháp Giảng dạy, Tích cực Soạn Kế hoạch Bài dạy Chuẩn Công văn 2345, Ứng dụng Trí tuệ Nhân tạo AI và Tạo dựng Môi trường Học tập Sinh động cho Học sinh.';
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);

  // Sync certificate data & render live preview
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const data: CertificateData = {
      teacherName: teacherName.trim() || 'Cô Giáo Thanh Nguyễn',
      schoolName: schoolName.trim() || 'Hệ Thống Đổi Mới Sư Phạm SmartEdu',
      certCode: certCode || 'SMARTEDU-GVST-2026-882391',
      issueDate: issueDate || new Date().toLocaleDateString('vi-VN'),
      reason: customReason
    };

    // Quick sync preview
    const fallbackCanvas = drawCertificateToCanvas(data);
    setPreviewUrl(fallbackCanvas.toDataURL('image/png'));

    // High quality async preview with sharp QR code
    drawCertificateToCanvasAsync(data)
      .then((canvas) => {
        if (isMounted) {
          setPreviewUrl(canvas.toDataURL('image/png'));
        }
      })
      .catch((err) => {
        console.warn('Async certificate preview fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, teacherName, schoolName, issueDate, customReason, certCode]);

  if (!isOpen) return null;

  const handleSaveInfo = () => {
    localStorage.setItem('smartedu_teacher_name', teacherName);
    localStorage.setItem('smartedu_cert_school', schoolName);
    localStorage.setItem('smartedu_cert_date', issueDate);
    localStorage.setItem('smartedu_cert_reason', customReason);
    setIsEditingMode(false);
    sounds.playSuccess();
  };

  const handleDownloadPdf = async () => {
    sounds.playCoin();
    setIsExportingPdf(true);
    try {
      await exportCertificateToPdf({
        teacherName,
        schoolName,
        certCode,
        issueDate,
        reason: customReason
      });
      sounds.playLevelUp();
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Có lỗi khi tạo file PDF, vui lòng thử lại!');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadPng = () => {
    sounds.playCoin();
    exportCertificateToPng({
      teacherName,
      schoolName,
      certCode,
      issueDate,
      reason: customReason
    });
    sounds.playLevelUp();
  };

  const handlePrint = () => {
    sounds.playClick();
    printCertificate({
      teacherName,
      schoolName,
      certCode,
      issueDate,
      reason: customReason
    });
  };

  const handleCopyCode = async () => {
    await copyToClipboard(certCode);
    setCopiedCode(true);
    sounds.playClick();
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in text-left overflow-y-auto">
      <div className="bg-white rounded-[36px] w-full max-w-5xl overflow-hidden shadow-2xl border-4 border-yellow-300 flex flex-col max-h-[92vh] my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-5 md:p-6 text-purple-950 flex items-center justify-between relative overflow-hidden shadow-md">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/25 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-yellow-200 animate-bounce shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-fredoka font-black text-xl md:text-2xl text-purple-950">
                  Giấy Chứng Nhận Giáo Viên Sáng Tạo Tiêu Biểu
                </span>
                <span className="bg-purple-900 text-yellow-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  XÁC THỰC 2026
                </span>
              </div>
              <p className="text-xs font-bold text-purple-900/85 mt-0.5">
                Vinh danh đổi mới phương pháp giảng dạy • Chuẩn Công văn 2345 & Ứng dụng AI
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/40 hover:bg-white text-purple-950 flex items-center justify-center transition-all cursor-pointer font-bold z-10 hover:scale-110 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50">
          
          {/* Certificate Code Banner & Quick Verification */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 rounded-3xl p-4 md:p-5 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-white/20">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-300/40 flex items-center justify-center text-yellow-300 shrink-0 text-xl">
                🔒
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-indigo-300 uppercase tracking-wider">
                  Mã chứng nhận độc quyền lưu tại LocalStorage:
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-black text-lg md:text-xl text-yellow-300 tracking-wider">
                    {certCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-yellow-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Sao chép mã chứng nhận"
                  >
                    {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Đã chép!' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditingMode(!isEditingMode)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-fredoka font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-yellow-300" />
                <span>{isEditingMode ? 'Ẩn form sửa' : 'Chỉnh sửa thông tin in'}</span>
              </button>
              
              {onCertCodeRegenerate && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onCertCodeRegenerate();
                  }}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-200 font-fredoka font-bold text-xs border border-white/10 transition-all flex items-center gap-1 cursor-pointer"
                  title="Tạo lại mã xác thực ngẫu nhiên mới"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Mã mới</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Form to Customize Certificate Info */}
          {isEditingMode && (
            <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-md space-y-4 animate-fade-in">
              <h4 className="font-fredoka font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Tùy chỉnh thông tin vinh danh trên giấy chứng nhận</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Họ và tên giáo viên:
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="VD: Cô Giáo Thanh Nguyễn"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Đơn vị công tác / Trường học:
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="VD: Trường Tiểu Học SmartEdu"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ngày cấp chứng nhận:
                  </label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    placeholder="VD: 23/08/2026"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nội dung vinh danh / Thành tích:
                </label>
                <textarea
                  rows={2}
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSaveInfo}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Lưu & Áp Dụng Ngay 💾
                </button>
              </div>
            </div>
          )}

          {/* Certificate Live Visual Preview Stage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-fredoka font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>Bản Xem Trước Trực Quan (Tỉ lệ chuẩn A4 Nằm Ngang 297x210mm)</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                ✨ Chuẩn in ấn 300 DPI sắc nét
              </span>
            </div>

            <div className="bg-slate-800 p-2 md:p-4 rounded-3xl shadow-inner flex items-center justify-center overflow-hidden border border-slate-700">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Bản xem trước Giấy chứng nhận Giáo viên Sáng tạo"
                  className="w-full max-h-[480px] object-contain rounded-xl shadow-2xl border border-white/20"
                />
              ) : (
                <div className="py-20 text-white font-fredoka text-sm animate-pulse">
                  Đang khởi tạo bản vẽ giấy chứng nhận...
                </div>
              )}
            </div>
          </div>

          {/* Export Action Buttons Section */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-5 border-2 border-yellow-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-fredoka font-extrabold text-base text-gray-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Xuất file để in ấn hoặc lưu giữ hồ sơ chuyên môn</span>
                </h4>
                <p className="text-xs text-gray-600 font-medium">
                  File PDF tạo bởi thư viện <b>jsPDF</b> tối ưu hóa độ phân giải cao, hỗ trợ in màu A4 và chèn vào hồ sơ thi đua.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap justify-center">
                
                {/* 1. Main PDF Download Button */}
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-5 py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-fredoka font-black text-sm rounded-2xl shadow-lg hover:shadow-red-500/30 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 border-white"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isExportingPdf ? 'Đang tạo PDF...' : 'Xuất Giấy PDF (jsPDF) 📄'}</span>
                </button>

                {/* 2. PNG Image Download */}
                <button
                  onClick={handleDownloadPng}
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-2xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Ảnh PNG (4K)</span>
                </button>

                {/* 3. Direct Print */}
                <button
                  onClick={handlePrint}
                  className="px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-fredoka font-bold text-xs rounded-2xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Printer className="w-4 h-4 text-indigo-600" />
                  <span>In Trực Tiếp 🖨️</span>
                </button>

              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mã bảo mật: <b>{certCode}</b> • Hệ thống chứng nhận SmartEdu 2026</span>
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-gray-800 hover:bg-black text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Đóng bảng
          </button>
        </div>

      </div>
    </div>
  );
}
