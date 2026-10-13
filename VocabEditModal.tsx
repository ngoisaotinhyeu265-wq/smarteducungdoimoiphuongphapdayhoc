/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, Save, Sparkles, Image as ImageIcon, Volume2, 
  AlertCircle, CheckCircle2, RefreshCw, Upload, Globe, Lightbulb
} from 'lucide-react';
import { EnglishVocabItem } from '../../types';
import { VOCAB_IMAGE_MAP, PRIMARY_VOCAB_TOPICS } from '../../data/primaryEnglishVocabData';
import { englishSpeech } from '../../utils/englishSpeech';
import { sounds } from '../../lib/audio';

interface VocabEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  wordItem: EnglishVocabItem | null;
  onSave: (updatedWord: EnglishVocabItem) => void;
}

export default function VocabEditModal({
  isOpen,
  onClose,
  wordItem,
  onSave
}: VocabEditModalProps) {
  const [formData, setFormData] = useState<Partial<EnglishVocabItem>>({});
  const [activeImageTab, setActiveImageTab] = useState<'url' | 'curated' | 'upload'>('curated');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    if (wordItem) {
      setFormData({ ...wordItem });
      setCustomImageUrl(wordItem.imageUrl || '');
      setWarningMessage(null);
    }
  }, [wordItem]);

  if (!isOpen || !wordItem) return null;

  // Validate pedagogical rules
  const handleExplanationChange = (text: string) => {
    setFormData(prev => ({ ...prev, easyEnglishExplanation: text }));

    const targetWord = (formData.word || '').trim().toLowerCase();
    if (targetWord && text.toLowerCase().includes(targetWord)) {
      setWarningMessage(`⚠️ Cảnh báo sư phạm: Phần Easy English Explanation không nên chứa chính từ cần dạy ("${targetWord}"). Hãy dùng đại từ hoặc miêu tả công dụng/đặc điểm (Ví dụ: "It's a school thing. We use it to write.")`);
    } else {
      setWarningMessage(null);
    }
  };

  const handleSave = () => {
    if (!formData.word) return;

    sounds.playClick();
    onSave({
      ...wordItem,
      ...formData,
      imageUrl: customImageUrl || formData.imageUrl
    } as EnglishVocabItem);
    onClose();
  };

  const handleSelectCuratedImage = (url: string) => {
    sounds.playClick();
    setCustomImageUrl(url);
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCustomImageUrl(base64);
        setFormData(prev => ({ ...prev, imageUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              ✏️
            </div>
            <div>
              <h3 className="text-xl font-fredoka font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Chỉnh Sửa Từ Vựng:</span>
                <span className="text-indigo-600 dark:text-indigo-400">"{formData.word}"</span>
              </h3>
              <p className="text-xs text-slate-500">
                Tùy chỉnh câu giải thích, câu mẫu, phiên âm và hình ảnh minh họa cho tiết dạy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Form */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Row 1: Word, IPA & Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Từ Tiếng Anh (Word) *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.word || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, word: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. pencil"
                />
                <button
                  type="button"
                  onClick={() => formData.word && englishSpeech.speak(formData.word)}
                  className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 transition-all shrink-0"
                  title="Nghe phát âm thử"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Phiên Âm IPA (Pronunciation) *
              </label>
              <input
                type="text"
                value={formData.pronunciation || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, pronunciation: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. /ˈpensl/"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Từ Loại (Word Type)
              </label>
              <select
                value={formData.wordType || 'Noun'}
                onChange={(e) => setFormData(prev => ({ ...prev, wordType: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Noun">Noun (Danh từ)</option>
                <option value="Verb">Verb (Động từ)</option>
                <option value="Adjective">Adjective (Tính từ)</option>
                <option value="Preposition">Preposition (Giới từ)</option>
                <option value="Adverb">Adverb (Trạng từ)</option>
                <option value="Pronoun">Pronoun (Đại từ)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category & Vietnamese Meaning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Chủ Đề / Phân Loại (Category)
              </label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. School things, Animals, Body parts..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Nghĩa Tiếng Việt (Vietnamese Meaning) *
              </label>
              <input
                type="text"
                value={formData.vietnameseMeaning || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, vietnameseMeaning: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. bút chì"
              />
            </div>
          </div>

          {/* Easy English Explanation (Core Pedagogical Field) */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Easy English Explanation (Giải thích tiếng Anh đơn giản cho HS) *</span>
              </label>
              <button
                type="button"
                onClick={() => formData.easyEnglishExplanation && englishSpeech.speak(formData.easyEnglishExplanation)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe đọc thử</span>
              </button>
            </div>

            <textarea
              rows={2}
              value={formData.easyEnglishExplanation || ''}
              onChange={(e) => handleExplanationChange(e.target.value)}
              className="w-full p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
              placeholder="e.g. It's a school thing. We use it to write."
            />

            {warningMessage ? (
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{warningMessage}</span>
              </div>
            ) : (
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Quy tắc: 1-2 câu ngắn, dễ hiểu, không dùng chính từ cần dạy.</span>
              </div>
            )}
          </div>

          {/* Model Sentence */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Câu Mẫu Tiếng Anh (Model Sentence) *
              </label>
              <button
                type="button"
                onClick={() => formData.modelSentence && englishSpeech.speak(formData.modelSentence)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe đọc thử</span>
              </button>
            </div>
            <input
              type="text"
              value={formData.modelSentence || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, modelSentence: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm italic focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. I write with a yellow pencil."
            />
          </div>

          {/* Teacher TPR Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Gợi ý cử chỉ TPR & Sư phạm cho giáo viên</span>
            </label>
            <input
              type="text"
              value={formData.teachingNotes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, teachingNotes: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Giơ bút chì và làm động tác viết chữ trên không (Air-writing)..."
            />
          </div>

          {/* Image Selection Section */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                <span>Hình ảnh minh họa trực quan (Visual Picture)</span>
              </label>

              {/* Tabs for Image Selection */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveImageTab('curated')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeImageTab === 'curated' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Kho mẫu chọn lọc
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageTab('url')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeImageTab === 'url' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Nhập link ảnh
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageTab('upload')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeImageTab === 'upload' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Tải ảnh lên
                </button>
              </div>
            </div>

            {/* Image Preview & Pickers */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-32 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center shadow-inner">
                {customImageUrl ? (
                  <img
                    src={customImageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Chưa có ảnh</span>
                )}
              </div>

              <div className="flex-1 w-full">
                {activeImageTab === 'curated' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Bấm chọn ảnh nhanh từ kho tranh tiểu học:</p>
                    <div className="grid grid-cols-5 gap-2 max-h-24 overflow-y-auto p-1">
                      {Object.entries(VOCAB_IMAGE_MAP).slice(0, 15).map(([key, url]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSelectCuratedImage(url)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${
                            customImageUrl === url ? 'border-indigo-600 scale-105 shadow-md' : 'border-transparent hover:border-slate-400'
                          }`}
                          title={key}
                        >
                          <img src={url} alt={key} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[10px] text-white text-center py-0.5 truncate">
                            {key}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeImageTab === 'url' && (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Dán link ảnh (https://...)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-[11px] text-slate-400">
                      Hỗ trợ link Unsplash, Wikimedia Commons hoặc link ảnh trực tiếp dạng .jpg / .png / .webp
                    </p>
                  </div>
                )}

                {activeImageTab === 'upload' && (
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/50 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all">
                      <Upload className="w-4 h-4 text-indigo-500" />
                      <span>Chọn file ảnh từ máy tính</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Hỗ trợ file PNG, JPG, JPEG kích thước tối đa 5MB.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
          >
            Hủy Bỏ
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Thay Đổi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
