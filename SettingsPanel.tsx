/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, ShieldAlert, BookOpen, 
  Settings, RotateCw, Globe, HelpCircle, CheckCircle,
  Award, FileText, Download, Printer, Eye, Copy, Sparkles, CheckCircle2, RefreshCw
} from 'lucide-react';
import { sounds } from '../lib/audio';
import TeacherCertificateModal from './TeacherCertificateModal';
import { exportCertificateToPdf, exportCertificateToPng, printCertificate, CertificateData } from '../utils/certificatePdfGenerator';

interface SettingsPanelProps {
  isMuted: boolean;
  onMuteToggle: () => void;
  onResetQuestions: () => void;
  onOpenDictionary?: () => void;
}

export default function SettingsPanel({ 
  isMuted, 
  onMuteToggle, 
  onResetQuestions,
  onOpenDictionary 
}: SettingsPanelProps) {
  const [showCertModal, setShowCertModal] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copiedCertCode, setCopiedCertCode] = useState(false);

  // Selection lookup setting
  const [isLookupEnabled, setIsLookupEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('smartedu_selection_lookup_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [ttsAccent, setTtsAccent] = useState<'en-US' | 'en-GB'>(() => {
    return (localStorage.getItem('smartedu_tts_accent') as 'en-US' | 'en-GB') || 'en-US';
  });

  const toggleLookup = () => {
    sounds.playClick();
    const next = !isLookupEnabled;
    setIsLookupEnabled(next);
    localStorage.setItem('smartedu_selection_lookup_enabled', JSON.stringify(next));
  };

  const toggleAccent = () => {
    sounds.playClick();
    const next = ttsAccent === 'en-US' ? 'en-GB' : 'en-US';
    setTtsAccent(next);
    localStorage.setItem('smartedu_tts_accent', next);
  };

  // Certificate state from localStorage
  const [certUnlocked, setCertUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('smartedu_creative_cert_unlocked') === 'true' || true; // Default unlocked or redeemed
  });

  const [certCode, setCertCode] = useState<string>(() => {
    let saved = localStorage.getItem('smartedu_cert_code');
    if (!saved) {
      saved = 'SMARTEDU-GVST-2026-' + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('smartedu_cert_code', saved);
    }
    return saved;
  });

  const [teacherName, setTeacherName] = useState<string>(() => {
    return localStorage.getItem('smartedu_teacher_name') || 'Cô Giáo Thanh Nguyễn (ThanhNguyen)';
  });

  const [schoolName, setSchoolName] = useState<string>(() => {
    return localStorage.getItem('smartedu_cert_school') || 'Trường Tiểu Học & Hệ Thống Đổi Mới SmartEdu';
  });

  const [issueDate, setIssueDate] = useState<string>(() => {
    return localStorage.getItem('smartedu_cert_date') || new Date().toLocaleDateString('vi-VN');
  });

  const handleRegenerateCertCode = () => {
    const newCode = 'SMARTEDU-GVST-2026-' + Math.floor(100000 + Math.random() * 900000);
    setCertCode(newCode);
    localStorage.setItem('smartedu_cert_code', newCode);
    sounds.playLevelUp();
  };

  const handleCopyCertCode = () => {
    navigator.clipboard.writeText(certCode);
    setCopiedCertCode(true);
    sounds.playClick();
    setTimeout(() => setCopiedCertCode(false), 2000);
  };

  const handleQuickExportPdf = async () => {
    sounds.playCoin();
    setIsExportingPdf(true);
    try {
      const data: CertificateData = {
        teacherName: teacherName.trim() || 'Cô Giáo Thanh Nguyễn',
        schoolName: schoolName.trim() || 'Hệ Thống Đổi Mới Sư Phạm SmartEdu',
        certCode,
        issueDate: issueDate || new Date().toLocaleDateString('vi-VN')
      };
      await exportCertificateToPdf(data);
      sounds.playLevelUp();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Có lỗi khi tạo file PDF, vui lòng thử lại!');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleQuickExportPng = () => {
    sounds.playCoin();
    const data: CertificateData = {
      teacherName: teacherName.trim() || 'Cô Giáo Thanh Nguyễn',
      schoolName: schoolName.trim() || 'Hệ Thống Đổi Mới Sư Phạm SmartEdu',
      certCode,
      issueDate: issueDate || new Date().toLocaleDateString('vi-VN')
    };
    exportCertificateToPng(data);
    sounds.playLevelUp();
  };

  const handleReset = () => {
    sounds.playError();
    if (confirm('Cô có chắc chắn muốn Đặt lại Ngân hàng câu hỏi về mặc định ban đầu không? Các câu hỏi tự tạo hoặc import sẽ bị xóa sạch.')) {
      onResetQuestions();
      sounds.playSuccess();
      alert('♻️ Đã đặt lại dữ liệu ngân hàng câu hỏi tiểu học mặc định thành công! 🌸');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 select-none animate-fade-in text-left">
      
      <div>
        <h2 className="font-fredoka text-xl md:text-2xl font-extrabold text-white flex items-center gap-1.5 drop-shadow-md">
          ⚙️ Cấu hình hệ thống & Vinh danh Sư phạm
        </h2>
        <p className="text-xs md:text-sm text-indigo-100 font-semibold mt-1">
          Xuất giấy chứng nhận đổi xu, thiết lập âm lượng, quản lý bộ nhớ dữ liệu và hướng dẫn vận hành cho cô
        </p>
      </div>

      {/* FEATURED BANNER: Outstanding Teacher Certificate (Giấy chứng nhận Giáo viên Sáng tạo Tiêu biểu) */}
      <div className="bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 rounded-[32px] p-6 shadow-2xl border-4 border-yellow-200 text-purple-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-xl border-2 border-yellow-200 shrink-0 animate-bounce">
              🏆
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-fredoka font-black text-xl md:text-2xl text-purple-950">
                  Giấy Chứng Nhận Giáo Viên Sáng Tạo Tiêu Biểu
                </h3>
                <span className="bg-purple-900 text-yellow-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-yellow-300" /> ĐÃ ĐỔI XU & KÍCH HOẠT
                </span>
              </div>

              <p className="text-xs font-bold text-purple-900/85 max-w-xl leading-relaxed">
                Vinh danh thành tích đổi mới phương pháp giảng dạy, ứng dụng AI & soạn Kế hoạch bài dạy Chuẩn Công văn 2345.
              </p>

              <div className="flex items-center gap-3 pt-1 flex-wrap text-xs text-purple-950 font-bold">
                <span className="bg-white/60 px-3 py-1 rounded-xl flex items-center gap-1.5 border border-purple-900/10">
                  👩‍🏫 Người nhận: <b>{teacherName}</b>
                </span>
                <span className="bg-purple-950 text-yellow-300 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-xs font-mono font-black">
                  Mã: {certCode}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons for Certificate */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            
            {/* 1. Main PDF Export Button (using jsPDF) */}
            <button
              onClick={handleQuickExportPdf}
              disabled={isExportingPdf}
              className="px-5 py-3 bg-purple-950 hover:bg-black text-yellow-300 font-fredoka font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 border-yellow-300"
            >
              <FileText className="w-4 h-4 text-yellow-300" />
              <span>{isExportingPdf ? 'Đang xuất PDF...' : 'Xuất Giấy (PDF) 📄'}</span>
            </button>

            {/* 2. Open Full Certificate Modal for Visual Customization & Preview */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowCertModal(true);
              }}
              className="px-5 py-2.5 bg-white hover:bg-yellow-50 text-purple-950 font-fredoka font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 border border-yellow-300/60"
            >
              <Eye className="w-4 h-4 text-purple-700" />
              <span>Xem & Tùy Chỉnh Giấy Khen 👁️</span>
            </button>

            {/* 3. Quick Copy Code */}
            <button
              onClick={handleCopyCertCode}
              className="px-4 py-1.5 bg-purple-900/20 hover:bg-purple-900/30 text-purple-950 font-fredoka font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
            >
              {copiedCertCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCertCode ? 'Đã sao chép mã!' : 'Sao chép mã chứng nhận'}</span>
            </button>

          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: General settings */}
        <div className="bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/20 p-6 shadow-2xl space-y-5 text-white">
          <h3 className="font-fredoka text-base font-extrabold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-300" />
            <span>Thiết lập chung</span>
          </h3>

          <div className="space-y-4">
            {/* Volume toggle row */}
            <div className="flex items-center justify-between p-3.5 bg-white/10 rounded-2xl border border-white/10">
              <div>
                <h4 className="font-fredoka text-sm font-bold text-white">🔊 Hiệu ứng âm thanh sinh động</h4>
                <p className="text-[11px] text-indigo-200 font-semibold mt-0.5">Sử dụng tiếng click, tiếng xu rơi, mừng lên cấp khi chơi game</p>
              </div>
              
              <button
                onClick={() => {
                  onMuteToggle();
                  if (isMuted) {
                    setTimeout(() => sounds.playClick(), 50);
                  }
                }}
                className={`w-14 h-8 rounded-full transition-all relative p-1 cursor-pointer
                  ${!isMuted ? 'bg-indigo-600' : 'bg-white/10 border border-white/10'}
                `}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all flex items-center justify-center text-xs
                  ${!isMuted ? 'translate-x-6 text-indigo-600' : 'translate-x-0 text-indigo-400'}
                `}>
                  {!isMuted ? '⚡' : '✕'}
                </div>
              </button>
            </div>

            {/* Text Selection Quick Lookup */}
            <div className="flex items-center justify-between p-3.5 bg-white/10 rounded-2xl border border-white/10">
              <div>
                <h4 className="font-fredoka text-sm font-bold text-white">✨ Bôi đen tra nhanh nghĩa tiếng Việt</h4>
                <p className="text-[11px] text-indigo-200 font-semibold mt-0.5">
                  Tự động hiện thẻ thông minh (Floating Tooltip) kèm phiên âm & phát âm khi bôi đen từ/cụm từ
                </p>
              </div>
              
              <button
                onClick={toggleLookup}
                className={`w-14 h-8 rounded-full transition-all relative p-1 cursor-pointer
                  ${isLookupEnabled ? 'bg-emerald-500' : 'bg-white/10 border border-white/10'}
                `}
                title={isLookupEnabled ? 'Nhấn để tắt tra từ nhanh khi bôi đen' : 'Nhấn để bật tra từ nhanh'}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all flex items-center justify-center text-xs font-bold
                  ${isLookupEnabled ? 'translate-x-6 text-emerald-600' : 'translate-x-0 text-slate-400'}
                `}>
                  {isLookupEnabled ? 'ON' : 'OFF'}
                </div>
              </button>
            </div>

            {/* TTS Accent Selection */}
            <div className="flex items-center justify-between p-3.5 bg-white/10 rounded-2xl border border-white/10">
              <div>
                <h4 className="font-fredoka text-sm font-bold text-white">🗣️ Giọng phát âm bản xứ (TTS)</h4>
                <p className="text-[11px] text-indigo-200 font-semibold mt-0.5">
                  Chuyển đổi giữa ngữ điệu tiếng Anh - Mỹ và Anh - Anh
                </p>
              </div>
              
              <button
                onClick={toggleAccent}
                className="px-3.5 py-1.5 bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-100 border border-indigo-400/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {ttsAccent === 'en-US' ? '🇺🇸 Anh - Mỹ (US)' : '🇬🇧 Anh - Anh (UK)'}
              </button>
            </div>

            {/* Open Full Dictionary Modal */}
            {onOpenDictionary && (
              <div className="flex items-center justify-between p-3.5 bg-amber-500/20 rounded-2xl border border-amber-400/30">
                <div>
                  <h4 className="font-fredoka text-sm font-bold text-amber-200">📖 Từ điển Tiếng Anh Tiểu học 400+ từ</h4>
                  <p className="text-[11px] text-amber-100 font-semibold mt-0.5">
                    Môn học, đồ dùng, mệnh lệnh lớp học, động từ TPR chuẩn Global Success Lớp 1-5
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenDictionary();
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-purple-950 font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all hover:scale-105 shrink-0"
                >
                  Mở Từ Điển
                </button>
              </div>
            )}

            {/* Language Selection */}
            <div className="flex items-center justify-between p-3.5 bg-white/10 rounded-2xl border border-white/10">
              <div>
                <h4 className="font-fredoka text-sm font-bold text-white">🌐 Ngôn ngữ giao diện</h4>
                <p className="text-[11px] text-indigo-200 font-semibold mt-0.5">Mặc định hiển thị ngôn ngữ Việt hóa</p>
              </div>
              <span className="font-fredoka text-xs font-bold text-indigo-200 bg-indigo-500/30 px-3.5 py-1.5 rounded-xl border border-indigo-400/20">
                🇻🇳 Tiếng Việt
              </span>
            </div>

            {/* Clear Database Storage */}
            <div className="flex items-center justify-between p-3.5 bg-white/10 rounded-2xl border border-white/10">
              <div>
                <h4 className="font-fredoka text-sm font-bold text-white">♻️ Đặt lại dữ liệu mẫu</h4>
                <p className="text-[11px] text-indigo-200 font-semibold mt-0.5">Xóa trắng các thay đổi và khôi phục đề mẫu</p>
              </div>
              
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-fredoka font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all hover:scale-103"
              >
                Khôi phục
              </button>
            </div>

          </div>
        </div>

        {/* Right Card: AI Developer Secrets guide */}
        <div className="bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/20 p-6 shadow-2xl space-y-4 text-white">
          <h3 className="font-fredoka text-base font-extrabold text-yellow-300 border-b border-white/10 pb-2 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-yellow-300 animate-bounce" />
            <span>AI Studio Secrets & API Keys</span>
          </h3>

          <div className="space-y-3 font-sans text-xs font-semibold text-indigo-100 leading-relaxed">
            <p className="text-white">
              Hệ thống SmartEdu được tích hợp trực tiếp với mô hình AI <strong className="text-yellow-300">Gemini 1.5 Flash / 2.0 Flash</strong> thế hệ mới từ Google. 
            </p>

            <div className="p-4 bg-white/10 border border-white/10 rounded-2xl space-y-1.5 text-[11px] text-indigo-200">
              <span className="font-bold text-yellow-300">Cách cấu hình API Key:</span>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Mở mục <strong>Settings &gt; Secrets</strong> trên giao diện bên trái của Google AI Studio.</li>
                <li>Thêm biến bí mật tên là: <code className="bg-indigo-950/40 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">GEMINI_API_KEY</code></li>
                <li>Dán khóa API Gemini của bạn vào đó. Hệ thống sẽ tự động đồng bộ hóa an toàn tuyệt đối ở phía máy chủ, không bao giờ lộ ra trình duyệt!</li>
              </ol>
            </div>

            <p className="text-[11px] text-indigo-200">
              🔒 <strong>Bảo mật thông minh:</strong> Nhờ kiến trúc Full Stack (Express + Vite) an toàn, các yêu cầu AI đều được ký kết phía Server. Khi chưa có Key, Trợ lý Ong Vàng sẽ thông minh cung cấp các câu đố sẵn có để cô trải nghiệm mượt mà!
            </p>
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      <TeacherCertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        certCode={certCode}
        defaultTeacherName={teacherName}
        onCertCodeRegenerate={handleRegenerateCertCode}
      />

    </div>
  );
}
