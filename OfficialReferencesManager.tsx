/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileCheck2, Link2, ExternalLink, Plus, Trash2, CheckCircle2, 
  Sparkles, ShieldCheck, BookOpen, AlertCircle, Copy, Check, RotateCw
} from 'lucide-react';
import { OfficialReference } from '../types';

interface OfficialReferencesManagerProps {
  references: OfficialReference[];
  onToggleReference: (id: string) => void;
  onAddCustomReference: (ref: OfficialReference) => void;
  onDeleteCustomReference: (id: string) => void;
  onRestoreDefaults?: () => void;
  sounds: {
    playCoin: () => void;
    playClick: () => void;
    playLevelUp: () => void;
    playError?: () => void;
  };
}

export default function OfficialReferencesManager({
  references,
  onToggleReference,
  onAddCustomReference,
  onDeleteCustomReference,
  onRestoreDefaults,
  sounds
}: OfficialReferencesManagerProps) {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    sounds.playCoin();
    showToast('Đã sao chép đường dẫn văn bản! 📋');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (e: React.MouseEvent, id: string, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Thầy cô có chắc chắn muốn xóa dẫn nguồn "${code}" này khỏi danh sách không?`)) {
      onDeleteCustomReference(id);
      setDeleteConfirmId(null);
      sounds.playCoin();
      showToast(`Đã xóa dẫn nguồn "${code}" thành công! 🗑️`);
    }
  };

  const handleConfirmDelete = (e: React.MouseEvent, id: string, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteCustomReference(id);
    setDeleteConfirmId(null);
    sounds.playCoin();
    showToast(`Đã xóa dẫn nguồn "${code}" thành công! 🗑️`);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) {
      alert('Vui lòng nhập đầy đủ Tên văn bản và Số hiệu công văn/thông tư!');
      return;
    }

    const created: OfficialReference = {
      id: 'custom_ref_' + Math.random().toString(36).substring(2, 9),
      title: newTitle.trim(),
      code: newCode.trim(),
      issuer: newIssuer.trim() || 'Trường Tiểu học / Phòng GD&ĐT',
      issueDate: newDate.trim() || new Date().toLocaleDateString('vi-VN'),
      url: newUrl.trim() || 'https://moet.gov.vn',
      summary: newSummary.trim() || 'Văn bản chỉ đạo chuyên môn cấp trường/phòng/sở.',
      isRequired: false,
      isActive: true,
      isCustom: true
    };

    onAddCustomReference(created);
    sounds.playLevelUp();
    setIsAddingCustom(false);

    // Reset form
    setNewTitle('');
    setNewCode('');
    setNewIssuer('');
    setNewDate('');
    setNewUrl('');
    setNewSummary('');
  };

  const activeCount = references.filter(r => r.isActive).length;

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Căn Cứ Pháp Lý & Dẫn Nguồn Văn Bản Quy Chuẩn</span>
          </div>
          <h2 className="text-xl md:text-2xl font-fredoka font-black tracking-tight flex items-center gap-2">
            <span>Dẫn Nguồn Link Công Văn, Kế Hoạch & Thông Tư</span>
            <span className="bg-white text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-sans font-extrabold">
              {activeCount}/{references.length} đang kích hoạt
            </span>
          </h2>
          <p className="text-xs text-blue-100 font-medium max-w-2xl leading-relaxed">
            Hệ thống tự động nhúng các link tra cứu công văn chính thức của Bộ GD&ĐT (CV 2345, CV 3456, TT 27, TT 32...) và kế hoạch nhà trường vào giáo án để bám sát 100% quy định sư phạm khi kiểm tra.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onRestoreDefaults && (
            <button
              onClick={() => {
                if (window.confirm ? true : true) {
                  onRestoreDefaults();
                  sounds.playCoin();
                  showToast('Đã khôi phục danh sách công văn & thông tư chuẩn của Bộ GD&ĐT! 📜');
                }
              }}
              className="px-3.5 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-fredoka font-bold text-xs rounded-2xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              title="Khôi phục lại danh sách các văn bản, thông tư chuẩn mặc định"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Khôi Phục Gốc Bộ GD&ĐT</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsAddingCustom(!isAddingCustom);
              sounds.playClick();
            }}
            className="px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-fredoka font-bold text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Thêm Dẫn Nguồn / Kế Hoạch Mới</span>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 font-fredoka text-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Add Custom Reference Form */}
      {isAddingCustom && (
        <form
          onSubmit={handleCreateCustom}
          className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-2xl space-y-4 animate-fade-in text-left"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-fredoka font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-blue-600" />
              <span>Thêm Văn Bản / Kế Hoạch Giáo Dục Nhà Trường Mới</span>
            </h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
              Tự động dẫn link trong giáo án 🔗
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Số hiệu văn bản (*)</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Kế hoạch số 08/KH-TH hoặc CV 123/PGDĐT"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Cơ quan ban hành (*)</label>
              <input
                type="text"
                placeholder="Ví dụ: Trường Tiểu học Chu Văn An / Phòng GD&ĐT"
                value={newIssuer}
                onChange={(e) => setNewIssuer(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700">Tên đầy đủ của văn bản / kế hoạch (*)</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Kế hoạch Giáo dục nhà trường năm học 2024-2025"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Ngày ban hành</label>
              <input
                type="text"
                placeholder="05/09/2024"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Đường dẫn liên kết trực tuyến (URL / Link Google Drive)</label>
            <input
              type="url"
              placeholder="https://drive.google.com/... hoặc https://moet.gov.vn/..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Nội dung tóm tắt & Trọng tâm áp dụng</label>
            <textarea
              rows={2}
              placeholder="Tóm tắt yêu cầu chuyên môn, phân phối thời lượng, nội dung tích hợp cần tuân thủ..."
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu Dẫn Nguồn Này 💾</span>
            </button>
          </div>
        </form>
      )}

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {references.map((ref) => {
          const isCopied = copiedId === ref.id;

          return (
            <div
              key={ref.id}
              className={`bg-white rounded-3xl p-5 border transition-all hover:shadow-lg flex flex-col justify-between text-left relative ${
                ref.isActive
                  ? 'border-blue-300 shadow-md ring-2 ring-blue-50 bg-blue-50/20'
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="space-y-2.5">
                {/* Top status bar */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-black uppercase">
                      {ref.code}
                    </span>
                    {ref.issueDate && (
                      <span className="text-[10px] text-gray-400 font-bold">
                        {ref.issueDate}
                      </span>
                    )}
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => {
                      onToggleReference(ref.id);
                      sounds.playClick();
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-fredoka font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      ref.isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {ref.isActive ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Đang dẫn nguồn</span>
                      </>
                    ) : (
                      <span>Tắt dẫn nguồn</span>
                    )}
                  </button>
                </div>

                {/* Title */}
                <h4 className="font-fredoka font-extrabold text-sm text-gray-900 leading-snug">
                  {ref.title}
                </h4>

                <p className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                  🏛️ Cơ quan: <span className="text-gray-700 font-bold">{ref.issuer}</span>
                </p>

                {/* Summary */}
                <p className="text-xs text-gray-600 bg-white p-3 rounded-2xl border border-gray-100 leading-relaxed font-sans shadow-2xs">
                  {ref.summary}
                </p>
              </div>

              {/* Link Action Bar */}
              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline max-w-[200px] truncate"
                  >
                    <Link2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{ref.url}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyLink(ref.url, ref.id)}
                    title="Sao chép đường link"
                    className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg cursor-pointer transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  {deleteConfirmId === ref.id ? (
                    <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200 animate-fade-in">
                      <span className="text-[10px] font-bold text-red-700 pl-1">Xóa?</span>
                      <button
                        type="button"
                        onClick={(e) => handleConfirmDelete(e, ref.id, ref.code)}
                        className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all shadow-xs"
                      >
                        Có
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeleteConfirmId(null);
                        }}
                        className="px-1.5 py-0.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                      >
                        Không
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, ref.id, ref.code)}
                      title="Xóa dẫn nguồn này khỏi danh sách"
                      className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Note Box */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <p className="font-bold">Quy tắc chuẩn mực khi thanh kiểm tra hồ sơ giáo án:</p>
          <p className="leading-relaxed text-amber-800">
            Khi in ấn hoặc xuất bản giáo án, phần <strong>"Căn cứ pháp lý & Dẫn nguồn văn bản chỉ đạo"</strong> sẽ được tự động hiển thị ở đầu giáo án với đầy đủ siêu liên kết (hyperlinks) có thể click mở trực tiếp, giúp minh chứng rõ ràng việc soạn giáo án bám sát 100% chỉ đạo của Bộ Giáo dục & Đào tạo và Kế hoạch nhà trường.
          </p>
        </div>
      </div>
    </div>
  );
}
