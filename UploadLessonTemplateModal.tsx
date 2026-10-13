/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Upload, FileText, CheckCircle2, Sparkles, BookOpen, 
  Trash2, Eye, X, ArrowRight, Layers, Award, AlertCircle,
  FileCheck, Download, RefreshCw, Check, Save
} from 'lucide-react';
import { 
  ParsedLessonTemplate, 
  SAMPLE_LESSON_PLAN_PRESETS, 
  extractTextFromFile, 
  parseCompleteLessonPlanText 
} from '../utils/lessonTemplateParser';
import { FullLessonPlan } from '../types';

interface UploadLessonTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: ParsedLessonTemplate) => void;
  onSaveToWarehouse?: (template: ParsedLessonTemplate) => void;
  currentSubject?: string;
  currentGrade?: string;
  currentBook?: string;
  sounds?: {
    playClick: () => void;
    playCoin: () => void;
    playLevelUp: () => void;
  };
}

export default function UploadLessonTemplateModal({
  isOpen,
  onClose,
  onApplyTemplate,
  onSaveToWarehouse,
  currentSubject,
  currentGrade,
  currentBook,
  sounds
}: UploadLessonTemplateModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets'>('upload');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [parsedTemplate, setParsedTemplate] = useState<ParsedLessonTemplate | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset_en_global_success');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pasteText, setPasteText] = useState<string>('');

  const safeSounds = sounds || {
    playClick: () => {},
    playCoin: () => {},
    playLevelUp: () => {}
  };

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    safeSounds.playCoin();
    setIsProcessing(true);
    setUploadedFileName(file.name);

    try {
      const rawText = await extractTextFromFile(file);
      const template = parseCompleteLessonPlanText(rawText, file.name);
      setParsedTemplate(template);
      safeSounds.playLevelUp();
    } catch (err) {
      console.error('Error parsing file:', err);
      alert('Không thể đọc file hoặc định dạng chưa phù hợp. Thầy cô có thể thử copy/paste nội dung hoặc chọn các mẫu có sẵn nhé!');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleParsePastedText = () => {
    if (!pasteText.trim()) {
      alert('Vui lòng dán nội dung giáo án mẫu vào ô văn bản trước nhé!');
      return;
    }
    safeSounds.playCoin();
    setIsProcessing(true);
    setTimeout(() => {
      const template = parseCompleteLessonPlanText(pasteText, 'Giao_an_mau_tu_van_ban.txt');
      setParsedTemplate(template);
      setUploadedFileName('Văn bản giáo án đã dán');
      setIsProcessing(false);
      safeSounds.playLevelUp();
    }, 400);
  };

  const handleSelectPreset = (presetId: string) => {
    safeSounds.playClick();
    setSelectedPresetId(presetId);
    const found = SAMPLE_LESSON_PLAN_PRESETS.find(p => p.id === presetId);
    if (found) {
      setParsedTemplate(found.template);
    }
  };

  const handleConfirmApply = () => {
    if (!parsedTemplate) {
      alert('Vui lòng tải lên hoặc chọn một kế hoạch bài dạy mẫu trước khi áp dụng.');
      return;
    }
    safeSounds.playLevelUp();
    onApplyTemplate(parsedTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn text-left">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-indigo-100 max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-fredoka text-lg font-black text-indigo-950 flex items-center gap-2">
                <span>Nạp & Áp Dụng Kế Hoạch Bài Dạy Mẫu (Hoàn Chỉnh)</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Chuẩn CV 2345
                </span>
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Tải lên file Word (.docx, .doc, .txt, .json) hoặc chọn giáo án chuẩn mẫu để tự động điền toàn bộ cấu trúc bài dạy
              </p>
            </div>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 pt-4 pb-2 shrink-0">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('upload'); }}
            className={`flex-1 py-2.5 px-4 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>1. Tải lên file Giáo án (.docx / .doc / .txt / .json)</span>
          </button>

          <button
            onClick={() => { 
              sounds.playClick(); 
              setActiveTab('presets'); 
              if (!parsedTemplate) {
                const def = SAMPLE_LESSON_PLAN_PRESETS[0];
                setSelectedPresetId(def.id);
                setParsedTemplate(def.template);
              }
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>2. Chọn Giáo án Mẫu Tiêu Chuẩn có sẵn (3 Mẫu Chuẩn)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-4">
          {activeTab === 'upload' ? (
            <div className="space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('template-file-upload-input')?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging ? 'border-indigo-600 bg-indigo-50/60' : 'border-gray-200 hover:border-indigo-400 bg-gray-50/50'
                }`}
              >
                <input
                  id="template-file-upload-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".docx,.doc,.txt,.json"
                />
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  {isProcessing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <FileCheck className="w-6 h-6" />}
                </div>
                <h4 className="font-fredoka font-bold text-sm text-indigo-950">
                  {uploadedFileName ? `📂 Đã nạp: ${uploadedFileName}` : 'Kéo thả tệp Kế hoạch bài dạy mẫu vào đây hoặc click để chọn'}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Hỗ trợ định dạng Microsoft Word <strong>.docx, .doc</strong>, tệp văn bản <strong>.txt</strong> và tệp <strong>.json</strong>
                </p>
              </div>

              {/* Paste raw text alternative */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>Hoặc dán trực tiếp nội dung giáo án mẫu tại đây:</span>
                  </span>
                  <button
                    onClick={handleParsePastedText}
                    className="text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bóc tách nội dung ngay</span>
                  </button>
                </div>
                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Dán toàn bộ kế hoạch bài dạy mẫu (gồm Mục tiêu, Đồ dùng, Các hoạt động 1, 2, 3, 4)..."
                  rows={4}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          ) : (
            /* Presets Tab */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SAMPLE_LESSON_PLAN_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-500 shadow-md ring-2 ring-indigo-400/40'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded-lg">
                          {preset.badge}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600 font-bold" />}
                      </div>
                      <h4 className="font-fredoka font-bold text-xs text-indigo-950 leading-snug">
                        {preset.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-3">
                        {preset.description}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-gray-100 text-[10px] text-indigo-700 font-bold flex items-center justify-between">
                      <span>{preset.subject} - {preset.grade}</span>
                      <span>{preset.bookSeries}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Parsed Structure Preview Card */}
          {parsedTemplate && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-fredoka font-extrabold text-sm text-emerald-950">
                    Bản Phân Tích Kế Hoạch Dạy Học Chuẩn Bị Áp Dụng:
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-2xs">
                  {parsedTemplate.subject} | {parsedTemplate.grade} | {parsedTemplate.duration}
                </span>
              </div>

              <div className="bg-white rounded-xl p-3 border border-emerald-100 text-xs space-y-2">
                <p className="font-bold text-indigo-950 text-sm">
                  📖 Bài dạy: {parsedTemplate.title}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="font-bold text-gray-700 block">I. Yêu cầu cần đạt:</span>
                    <ul className="list-disc list-inside text-gray-600 pl-1 space-y-0.5">
                      <li>Đặc thù: {parsedTemplate.objectives.knowledgeAndSkills[0]?.slice(0, 75)}...</li>
                      <li>Năng lực chung: {parsedTemplate.objectives.coreCompetencies[0]?.slice(0, 75)}...</li>
                      {parsedTemplate.objectives.digitalCompetency && (
                        <li className="text-blue-700 font-medium">Năng lực số: {parsedTemplate.objectives.digitalCompetency[0]?.slice(0, 70)}...</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-gray-700 block">III. Tiến trình 4 Hoạt động ({parsedTemplate.activities.length} hoạt động):</span>
                    <ul className="list-decimal list-inside text-gray-600 pl-1 space-y-0.5">
                      {parsedTemplate.activities.slice(0, 4).map((act, i) => (
                        <li key={i} className="truncate">
                          <strong>{act.name}</strong> ({act.duration})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Đóng
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {onSaveToWarehouse && (
              <button
                onClick={() => {
                  if (parsedTemplate) {
                    sounds.playLevelUp();
                    onSaveToWarehouse(parsedTemplate);
                    onClose();
                  }
                }}
                disabled={!parsedTemplate}
                className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-fredoka font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save className="w-3.5 h-3.5 text-indigo-600" />
                <span>Lưu Vào Kho Chuẩn Hóa 💾</span>
              </button>
            )}

            <button
              onClick={handleConfirmApply}
              disabled={!parsedTemplate}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Áp Dụng Vào Kế Hoạch Bài Dạy Hiện Tại 🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
