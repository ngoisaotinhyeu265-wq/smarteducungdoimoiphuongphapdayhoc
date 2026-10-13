/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Printer, LayoutGrid, FileText, Check, 
  Sparkles, Layers, Scissors, Eye, EyeOff, Volume2
} from 'lucide-react';
import { EnglishVocabItem } from '../../types';
import { sounds } from '../../lib/audio';

interface VocabPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: EnglishVocabItem[];
  title?: string;
  grade?: number;
}

export default function VocabPrintModal({
  isOpen,
  onClose,
  words,
  title = 'Phiếu Học Tập & Thẻ Từ Vựng Tiếng Anh Tiểu Học',
  grade = 3
}: VocabPrintModalProps) {
  const [printLayout, setPrintLayout] = useState<'flashcards_2x2' | 'flashcards_3x3' | 'worksheet' | 'double_sided'>('flashcards_2x2');
  const [includeVietnamese, setIncludeVietnamese] = useState(true);
  const [includeIPA, setIncludeIPA] = useState(true);
  const [includeExplanation, setIncludeExplanation] = useState(true);
  const [includeModelSentence, setIncludeModelSentence] = useState(true);

  if (!isOpen || words.length === 0) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header (Hidden during actual print) */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/70 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              🖨️
            </div>
            <div>
              <h3 className="text-xl font-fredoka font-bold text-slate-900 dark:text-white">
                In Thẻ Flashcard & Phiếu Học Tập Từ Vựng
              </h3>
              <p className="text-xs text-slate-500">
                Xuất file in chuẩn A4 với viền cắt kéo (Cut Lines) sắc nét dành cho học sinh Lớp {grade}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-fredoka font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>In Ngay (Print A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Control Toolbar (Hidden during actual print) */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/40 flex items-center justify-between flex-wrap gap-3 print:hidden">
          {/* Layout Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Mẫu In:</span>
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setPrintLayout('flashcards_2x2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  printLayout === 'flashcards_2x2' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Thẻ Lớn (2x2 / Trang)</span>
              </button>
              <button
                onClick={() => setPrintLayout('flashcards_3x3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  printLayout === 'flashcards_3x3' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Vừa (3x3 / Trang)</span>
              </button>
              <button
                onClick={() => setPrintLayout('worksheet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  printLayout === 'worksheet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Phiếu Bài Tập (Worksheet)</span>
              </button>
            </div>
          </div>

          {/* Option Checkboxes */}
          <div className="flex items-center gap-3 text-xs font-medium text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeVietnamese}
                onChange={(e) => setIncludeVietnamese(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>In nghĩa Tiếng Việt</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeIPA}
                onChange={(e) => setIncludeIPA(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>In phiên âm IPA</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeExplanation}
                onChange={(e) => setIncludeExplanation(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>In Easy Explanation</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeModelSentence}
                onChange={(e) => setIncludeModelSentence(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>In Câu Mẫu</span>
            </label>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-slate-100 dark:bg-slate-950/50 print:bg-white print:p-0">
          <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 shadow-xl print:shadow-none print:p-0 rounded-2xl">
            {/* Document Header for Print */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-fredoka uppercase tracking-tight text-slate-900">
                  {title}
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Primary English Vocabulary • Grade {grade} • SmartEdu Primary Teaching System
                </p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>Họ và tên HS: ....................................................</p>
                <p className="mt-1">Lớp: ........................ Ngày: ........................</p>
              </div>
            </div>

            {/* 1. Layout: Flashcards 2x2 Grid */}
            {printLayout === 'flashcards_2x2' && (
              <div className="grid grid-cols-2 gap-6 print:gap-4">
                {words.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="border-2 border-dashed border-slate-400 p-4 rounded-2xl flex flex-col items-center text-center bg-white relative break-inside-avoid"
                  >
                    <div className="absolute top-2 right-2 text-slate-400">
                      <Scissors className="w-3.5 h-3.5" />
                    </div>
                    
                    {/* Word Image */}
                    <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.word} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-sm font-bold text-slate-400">{item.word}</span>
                      )}
                    </div>

                    {/* Word & IPA */}
                    <h2 className="text-2xl font-fredoka font-black text-slate-900">
                      {item.word}
                    </h2>
                    {includeIPA && (
                      <p className="text-sm font-mono text-indigo-700 font-semibold mt-0.5">
                        {item.pronunciation}
                      </p>
                    )}

                    {/* Category & Word Type */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.wordType}
                      </span>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Easy English Explanation */}
                    {includeExplanation && (
                      <div className="mt-2.5 p-2 bg-indigo-50/80 rounded-lg text-xs text-indigo-950 font-medium leading-snug w-full">
                        "{item.easyEnglishExplanation}"
                      </div>
                    )}

                    {/* Model Sentence */}
                    {includeModelSentence && (
                      <p className="mt-1.5 text-xs text-emerald-800 italic font-medium">
                        "{item.modelSentence}"
                      </p>
                    )}

                    {/* Vietnamese Meaning */}
                    {includeVietnamese && (
                      <p className="mt-2 text-xs font-bold text-amber-900 border-t border-slate-200 pt-1.5 w-full">
                        Nghĩa TV: {item.vietnameseMeaning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 2. Layout: Flashcards 3x3 Grid */}
            {printLayout === 'flashcards_3x3' && (
              <div className="grid grid-cols-3 gap-3 print:gap-2">
                {words.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="border-2 border-dashed border-slate-400 p-2.5 rounded-xl flex flex-col items-center text-center bg-white relative break-inside-avoid"
                  >
                    <div className="w-full h-24 rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-200 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.word} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-xs font-bold text-slate-400">{item.word}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-fredoka font-black text-slate-900">
                      {item.word}
                    </h3>
                    {includeIPA && (
                      <p className="text-xs font-mono text-indigo-700 font-medium">
                        {item.pronunciation}
                      </p>
                    )}

                    {includeExplanation && (
                      <p className="mt-1 text-[10px] text-slate-700 leading-tight">
                        {item.easyEnglishExplanation}
                      </p>
                    )}

                    {includeVietnamese && (
                      <p className="mt-1 text-[11px] font-bold text-amber-900 border-t border-slate-200 pt-1 w-full truncate">
                        {item.vietnameseMeaning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 3. Layout: Student Worksheet */}
            {printLayout === 'worksheet' && (
              <div className="space-y-6">
                {/* Part 1: Vocabulary Bank */}
                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl">
                  <h3 className="text-sm font-bold text-slate-800 uppercase mb-2">
                    Part 1: Word Bank & Vocabulary Review (Ngân hàng từ vựng)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {words.map((item, idx) => (
                      <div key={idx} className="p-2 bg-white border border-slate-200 rounded-lg text-xs">
                        <strong className="text-indigo-700 text-sm">{idx + 1}. {item.word}</strong>
                        <span className="text-slate-500 font-mono ml-1">{item.pronunciation}</span>
                        <p className="text-[11px] text-slate-600 mt-0.5 italic">"{item.easyEnglishExplanation}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 2: Practice Worksheet Fill in the blanks */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 uppercase">
                    Part 2: Read the clues and write the correct words (Đọc gợi ý và viết từ thích hợp)
                  </h3>
                  <div className="space-y-3">
                    {words.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border-b border-slate-200">
                        <div className="text-xs">
                          <span className="font-bold mr-2">{idx + 1}.</span>
                          <span className="font-medium text-slate-800">"{item.easyEnglishExplanation}"</span>
                          <span className="text-slate-500 ml-2">({item.category})</span>
                        </div>
                        <div className="w-44 border-b-2 border-dotted border-slate-900 text-center font-bold text-indigo-700 text-sm">
                          ...................................
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 3: Sentence Writing */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-800 uppercase">
                    Part 3: Complete the model sentences (Hoàn thành câu mẫu)
                  </h3>
                  <div className="space-y-2.5">
                    {words.map((item, idx) => {
                      const sentenceBlank = item.modelSentence.replace(new RegExp(item.word, 'gi'), '_______________');
                      return (
                        <div key={idx} className="text-xs p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                          <span><strong>{idx + 1}.</strong> {sentenceBlank}</span>
                          <span className="text-slate-400 text-[11px] italic">[Hint: {item.vietnameseMeaning}]</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer (Hidden during actual print) */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500">
            Tổng cộng: {words.length} từ vựng • Bố cục in: {printLayout === 'worksheet' ? 'Phiếu bài tập' : 'Thẻ Flashcards'}
          </span>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-fredoka font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>In File (Ctrl + P)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
