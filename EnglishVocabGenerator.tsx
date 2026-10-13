/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Volume2, Play, Presentation, Printer, 
  Plus, Trash2, Edit3, ArrowUp, ArrowDown, Eye, EyeOff, 
  Save, FolderOpen, BookOpen, Layers, CheckCircle2, 
  AlertCircle, RefreshCw, Snail, Rabbit, HelpCircle, 
  FileDown, Copy, Check, ChevronRight, Bookmark, Image as ImageIcon, Lightbulb, Languages
} from 'lucide-react';
import { EnglishVocabItem, EnglishVocabPackage, EnglishGradeLevel } from '../../types';
import { 
  PRIMARY_VOCAB_TOPICS, 
  DEFAULT_SAMPLE_PACKAGES, 
  VOCAB_IMAGE_MAP 
} from '../../data/primaryEnglishVocabData';
import {
  GS_CURRICULUM_CATALOG,
  getUnitsByGrade,
  buildVocabItemsFromWordList,
  GlobalSuccessUnitOption,
  GlobalSuccessLessonOption
} from '../../data/globalSuccessUnitsData';
import { englishSpeech } from '../../utils/englishSpeech';
import { sounds } from '../../lib/audio';
import VocabPresentationModal from './VocabPresentationModal';
import VocabEditModal from './VocabEditModal';
import VocabPrintModal from './VocabPrintModal';
import PrimaryDictionaryModal from '../PrimaryDictionaryModal';

interface EnglishVocabGeneratorProps {
  onNavigateToPlan?: () => void;
}

export default function EnglishVocabGenerator({ onNavigateToPlan }: EnglishVocabGeneratorProps = {}) {
  // Curriculum Mode: 'curriculum' (Sách Global Success) or 'custom' (Tự nhập thủ công)
  const [selectionMode, setSelectionMode] = useState<'curriculum' | 'custom'>('curriculum');

  // Main Generator State
  const [selectedGrade, setSelectedGrade] = useState<EnglishGradeLevel>(3);
  const [selectedBookSeries, setSelectedBookSeries] = useState<string>('Global Success (Bộ GD&ĐT)');
  
  // Available units for the current grade
  const currentUnits = getUnitsByGrade(selectedGrade);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(() => {
    return currentUnits[0]?.unitId || 'g3_u1';
  });
  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');

  const currentSelectedUnit = currentUnits.find(u => u.unitId === selectedUnitId) || currentUnits[0];
  const currentSelectedLesson = currentSelectedUnit?.lessons.find(l => l.lessonId === selectedLessonId) || currentSelectedUnit?.lessons[0];

  const [inputWords, setInputWords] = useState<string>(() => {
    return currentSelectedLesson?.vocab.join(', ') || 'hello, hi, I, am, Mai, Nam, Ben, Lucy';
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return currentSelectedUnit?.category || 'Tự động phân loại theo nghĩa';
  });
  const [unitLesson, setUnitLesson] = useState<string>(() => {
    return `${currentSelectedUnit?.title || 'Unit 1'} - ${currentSelectedLesson?.shortLabel || 'Tất cả Lessons'}`;
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);

  // Active Vocab List - initialized with curriculum vocab items
  const [vocabList, setVocabList] = useState<EnglishVocabItem[]>(() => {
    const defaultWords = currentSelectedLesson?.vocab || ['hello', 'hi', 'name', 'how', 'fine', 'thank you'];
    return buildVocabItemsFromWordList(defaultWords, 3, currentSelectedUnit?.category || 'Greetings', currentSelectedUnit?.title || 'Unit 1: Hello');
  });

  // Handle Grade Change -> Auto populate Units for new grade
  const handleGradeChange = (newGrade: EnglishGradeLevel) => {
    sounds.playClick();
    setSelectedGrade(newGrade);
    const newUnits = getUnitsByGrade(newGrade);
    const firstUnit = newUnits[0];
    if (firstUnit) {
      setSelectedUnitId(firstUnit.unitId);
      setSelectedLessonId('all');
      const lesson = firstUnit.lessons[0];
      const words = lesson?.vocab || firstUnit.allVocab;
      const titleStr = `${firstUnit.title} - ${lesson?.shortLabel || 'Toàn bộ Unit'}`;
      setUnitLesson(titleStr);
      setSelectedCategory(firstUnit.category);
      setInputWords(words.join(', '));
      setVocabList(buildVocabItemsFromWordList(words, newGrade, firstUnit.category, firstUnit.title));
    }
  };

  // Handle Unit Change -> Auto populate Lessons and Vocab
  const handleUnitChange = (newUnitId: string) => {
    sounds.playClick();
    setSelectedUnitId(newUnitId);
    const unit = currentUnits.find(u => u.unitId === newUnitId) || currentUnits[0];
    if (unit) {
      setSelectedLessonId('all');
      const lesson = unit.lessons[0];
      const words = lesson?.vocab || unit.allVocab;
      const titleStr = `${unit.title} - ${lesson?.shortLabel || 'Toàn bộ bài học'}`;
      setUnitLesson(titleStr);
      setSelectedCategory(unit.category);
      setInputWords(words.join(', '));
      setVocabList(buildVocabItemsFromWordList(words, selectedGrade, unit.category, unit.title));
    }
  };

  // Handle Lesson Change -> Auto update words and cards instantly
  const handleLessonChange = (newLessonId: string) => {
    sounds.playClick();
    setSelectedLessonId(newLessonId);
    if (!currentSelectedUnit) return;
    const lesson = currentSelectedUnit.lessons.find(l => l.lessonId === newLessonId) || currentSelectedUnit.lessons[0];
    if (lesson) {
      const words = lesson.vocab;
      const titleStr = `${currentSelectedUnit.title} - ${lesson.shortLabel}`;
      setUnitLesson(titleStr);
      setInputWords(words.join(', '));
      setVocabList(buildVocabItemsFromWordList(words, selectedGrade, currentSelectedUnit.category, currentSelectedUnit.title));
    }
  };

  // Reload standard SGK vocabulary instantly
  const handleReloadStandardSGKVocab = () => {
    sounds.playSuccess();
    if (!currentSelectedUnit) return;
    const lesson = currentSelectedUnit.lessons.find(l => l.lessonId === selectedLessonId) || currentSelectedUnit.lessons[0];
    const words = lesson?.vocab || currentSelectedUnit.allVocab;
    setInputWords(words.join(', '));
    setVocabList(buildVocabItemsFromWordList(words, selectedGrade, currentSelectedUnit.category, currentSelectedUnit.title));
    setGenerationError(null);
  };

  // Presentation & Modals State
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [editingWord, setEditingWord] = useState<EnglishVocabItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // View Settings
  const [showAllVietnamese, setShowAllVietnamese] = useState<boolean>(true);
  const [isSlowMode, setIsSlowMode] = useState<boolean>(false);
  const [savedPackages, setSavedPackages] = useState<EnglishVocabPackage[]>(() => {
    const local = localStorage.getItem('smartedu_saved_vocab_packages');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
    return DEFAULT_SAMPLE_PACKAGES;
  });
  const [isSavedListOpen, setIsSavedListOpen] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // Persist saved packages
  const savePackagesToStorage = (pkgs: EnglishVocabPackage[]) => {
    setSavedPackages(pkgs);
    localStorage.setItem('smartedu_saved_vocab_packages', JSON.stringify(pkgs));
  };

  // AI Generation API Caller
  const handleGenerateVocabulary = async () => {
    const rawInput = inputWords.trim();
    if (!rawInput) {
      setGenerationError('Vui lòng nhập ít nhất một từ vựng tiếng Anh (Ví dụ: ear, pencil, teacher).');
      return;
    }

    sounds.playClick();
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/vocabulary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: rawInput,
          grade: selectedGrade,
          category: selectedCategory === 'Tự động phân loại theo nghĩa' ? undefined : selectedCategory,
          unitLesson: unitLesson,
          bookSeries: selectedBookSeries
        })
      });

      if (!response.ok) {
        throw new Error(`Lỗi máy chủ (${response.status})`);
      }

      const data = await response.json();
      if (data.words && Array.isArray(data.words) && data.words.length > 0) {
        sounds.playSuccess();
        setVocabList(data.words);
      } else {
        throw new Error('Không nhận được dữ liệu từ vựng hợp lệ.');
      }
    } catch (err: any) {
      console.error('Error generating vocabulary:', err);
      setGenerationError(err?.message || 'Có lỗi xảy ra khi tạo nội dung từ vựng. Đang dùng ngân hàng mẫu sư phạm.');
      sounds.playWarning();
    } finally {
      setIsGenerating(false);
    }
  };

  // Quick Load Sample Theme
  const handleLoadSampleTheme = (samplePkg: EnglishVocabPackage) => {
    sounds.playClick();
    setSelectedGrade(samplePkg.grade);
    if (samplePkg.category) setSelectedCategory(samplePkg.category);
    if (samplePkg.unitLesson) setUnitLesson(samplePkg.unitLesson);
    if (samplePkg.bookSeries) setSelectedBookSeries(samplePkg.bookSeries);
    setInputWords(samplePkg.words.map(w => w.word).join(', '));
    setVocabList(samplePkg.words);
    setIsSavedListOpen(false);
  };

  // Pronounce Word
  const handlePronounce = (word: string, id: string) => {
    setPlayingWordId(id);
    englishSpeech.speak(word, {
      rate: isSlowMode ? 0.72 : 0.88,
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null)
    });
  };

  // Pronounce Sentence
  const handlePronounceSentence = (sentence: string, id: string) => {
    setPlayingWordId(id + '_sent');
    englishSpeech.speak(sentence, {
      rate: isSlowMode ? 0.75 : 0.9,
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null)
    });
  };

  // Add New Empty Word
  const handleAddNewWord = () => {
    sounds.playClick();
    const newWord: EnglishVocabItem = {
      id: `vocab_${Date.now()}`,
      word: 'new word',
      pronunciation: '/nuː wɜːd/',
      wordType: 'Noun',
      category: selectedCategory === 'Tự động phân loại theo nghĩa' ? 'School things' : selectedCategory,
      easyEnglishExplanation: "It's an important thing we learn at school.",
      vietnameseMeaning: 'từ mới',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      modelSentence: 'I learn a new word today.',
      grade: selectedGrade,
      teachingNotes: 'Luyện đọc mẫu và cho học sinh nhắc lại đồng thanh.'
    };
    setVocabList(prev => [...prev, newWord]);
    setEditingWord(newWord);
    setIsEditModalOpen(true);
  };

  // Delete Word
  const handleDeleteWord = (id: string) => {
    sounds.playClick();
    setVocabList(prev => prev.filter(w => w.id !== id));
  };

  // Move Word Up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    sounds.playClick();
    setVocabList(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  // Move Word Down
  const handleMoveDown = (index: number) => {
    if (index === vocabList.length - 1) return;
    sounds.playClick();
    setVocabList(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  // Save Updated Word from Modal
  const handleSaveWordEdit = (updatedWord: EnglishVocabItem) => {
    setVocabList(prev => prev.map(w => w.id === updatedWord.id ? updatedWord : w));
  };

  // Save Current Package
  const handleSaveCurrentPackage = () => {
    if (vocabList.length === 0) return;
    sounds.playSuccess();
    const pkgTitle = prompt('Nhập tên cho bộ từ vựng này:', `${unitLesson || 'Bộ từ vựng'} - Lớp ${selectedGrade}`);
    if (!pkgTitle) return;

    const newPkg: EnglishVocabPackage = {
      id: `pkg_${Date.now()}`,
      title: pkgTitle,
      grade: selectedGrade,
      category: selectedCategory,
      unitLesson: unitLesson,
      bookSeries: selectedBookSeries,
      words: vocabList,
      createdAt: new Date().toISOString()
    };

    savePackagesToStorage([newPkg, ...savedPackages]);
    alert('✅ Đã lưu bộ từ vựng thành công vào kho lưu trữ của bạn!');
  };

  // Copy As Text
  const handleCopyText = () => {
    sounds.playClick();
    const textOutput = vocabList.map((item, idx) => `
${idx + 1}. ${item.word.toUpperCase()} ${item.pronunciation} (${item.wordType}) [${item.category}]
- Easy Explanation: "${item.easyEnglishExplanation}"
- Nghĩa Tiếng Việt: ${item.vietnameseMeaning}
- Model Sentence: "${item.modelSentence}"
- Gợi ý TPR: ${item.teachingNotes || 'N/A'}
`).join('\n----------------------------------------\n');

    navigator.clipboard.writeText(textOutput);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  // Export as Word Docx / HTML File
  const handleExportWordDoc = () => {
    sounds.playClick();
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${unitLesson || 'TuVungTiengAnh'}_Lop${selectedGrade}</title>
<style>
body { font-family: 'Times New Roman', serif; line-height: 1.5; padding: 30px; }
h1 { color: #1e3a8a; text-align: center; }
.header-info { text-align: center; margin-bottom: 20px; font-size: 14px; color: #475569; }
.vocab-card { border: 1px solid #cbd5e1; padding: 15px; margin-bottom: 15px; border-radius: 8px; }
.word-title { font-size: 20px; font-weight: bold; color: #1e40af; }
.ipa { font-style: italic; color: #64748b; margin-left: 8px; }
.tag { font-size: 11px; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; margin-left: 5px; }
.explanation { background: #f0fdf4; padding: 8px; border-left: 4px solid #16a34a; margin: 8px 0; font-size: 14px; }
.sentence { color: #0f172a; font-style: italic; margin: 5px 0; }
.vi { color: #9a3412; font-weight: bold; }
</style>
</head>
<body>
<h1>KẾ HOẠCH BÀI DẠY TỪ VỰNG TIẾNG ANH TIỂU HỌC</h1>
<div class="header-info">
  <strong>Khối lớp:</strong> Lớp ${selectedGrade} | <strong>Bộ SGK:</strong> ${selectedBookSeries} | <strong>Bài học:</strong> ${unitLesson}<br>
  <em>(Biên soạn theo chuẩn sư phạm trực quan & Easy English Explanation - Không dùng chính từ để giải thích)</em>
</div>
<hr/>
${vocabList.map((item, idx) => `
<div class="vocab-card">
  <div class="word-title">${idx + 1}. ${item.word} <span class="ipa">${item.pronunciation}</span> <span class="tag">${item.wordType}</span> <span class="tag">${item.category}</span></div>
  <div class="explanation"><strong>Easy English Explanation:</strong> "${item.easyEnglishExplanation}"</div>
  <div class="sentence"><strong>Model Sentence:</strong> "${item.modelSentence}"</div>
  <div class="vi"><strong>Nghĩa Tiếng Việt:</strong> ${item.vietnameseMeaning}</div>
  ${item.teachingNotes ? `<div style="font-size:12px; color:#64748b; margin-top:5px;"><strong>Gợi ý TPR sư phạm:</strong> ${item.teachingNotes}</div>` : ''}
</div>
`).join('')}
</body>
</html>
`;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TuVung_Lop${selectedGrade}_${(unitLesson || 'Lesson').replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-20 select-none animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 md:p-10 text-white shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Soạn Từ Vựng Tiếng Anh Tiểu Học</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/20">
                Chuẩn Sư Phạm Trực Quan
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
                100% Easy English Explanation
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-fredoka font-black tracking-tight text-white">
              Dạy Từ Vựng Tiếng Anh Trực Quan & Trình Chiếu Lớp Học
            </h1>

            <p className="text-indigo-200/90 text-sm md:text-base leading-relaxed">
              Tự động tạo phiên âm IPA chuẩn, phân loại chủ đề, câu giải thích tiếng Anh siêu đơn giản (không dùng chính từ cần dạy), câu mẫu giao tiếp tự nhiên và chế độ trình chiếu tương tác cho học sinh tiểu học.
            </p>
          </div>

          {/* Quick Action Buttons on Header */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPresentationOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-fredoka font-black text-base shadow-xl shadow-amber-500/30 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Presentation className="w-5 h-5" />
              <span>Trình Chiếu Lớp Học (Slideshow)</span>
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-fredoka font-bold text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>In Flashcards & Phiếu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Generation Input & Controls Form */}
      <div className="p-6 md:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              🔤
            </div>
            <div>
              <h2 className="text-xl font-fredoka font-bold text-slate-900 dark:text-white">
                Nhập Từ Vựng Cần Dạy
              </h2>
              <p className="text-xs text-slate-500">
                Nhập một hoặc nhiều từ vựng (ngăn cách bằng dấu phẩy hoặc xuống dòng)
              </p>
            </div>
          </div>

          {/* Header Action Buttons: Dictionary & Preset Themes */}
          <div className="flex items-center gap-2">
            {onNavigateToPlan && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigateToPlan();
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Mở Kế hoạch dạy học 35 tuần Tiếng Anh chuẩn Phụ lục 2 CV 2345"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Phụ Lục 2 CV 2345</span>
              </button>
            )}

            <button
              onClick={() => {
                sounds.playClick();
                setIsDictionaryOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Tra cứu từ điển 400+ từ chuẩn Global Success Lớp 1-5"
            >
              <Languages className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Từ Điển 400+ Từ GS</span>
            </button>

            {/* Preset Theme Quick Loader Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSavedListOpen(prev => !prev)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4 text-indigo-500" />
                <span>Chủ Đề Có Sẵn ({savedPackages.length})</span>
              </button>

              {isSavedListOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-30 space-y-1 animate-fadeIn">
                  <div className="p-2 text-xs font-bold text-slate-400 uppercase">
                    Chọn chủ đề để nạp nhanh:
                  </div>
                  {savedPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handleLoadSampleTheme(pkg)}
                      className="w-full p-2.5 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center justify-between"
                    >
                      <div>
                        <strong className="block text-slate-900 dark:text-white font-bold">{pkg.title}</strong>
                        <span className="text-[11px] text-slate-400">Lớp {pkg.grade} • {pkg.words.length} từ</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs: Global Success Preset vs Custom Manual Entry */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setSelectionMode('curriculum');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-2 ${
                selectionMode === 'curriculum'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📚 Chọn Sẵn Theo SGK Global Success (Nhanh, Chuẩn 100%)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setSelectionMode('custom');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-2 ${
                selectionMode === 'custom'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>✏️ Tự Nhập Từ Vựng Tùy Chỉnh</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tích hợp sẵn 100% Units & Lessons Lớp 1, 2, 3, 4, 5 Global Success</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE A: GLOBAL SUCCESS CURRICULUM SELECTOR (AUTO POPULATE)     */}
        {/* ------------------------------------------------------------- */}
        {selectionMode === 'curriculum' ? (
          <div className="space-y-5">
            {/* Step 1 & 2: Grade + Unit + Lesson Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Grade Selector (3 cols) */}
              <div className="lg:col-span-3 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  1. Chọn Khối Lớp *
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGradeChange(g as EnglishGradeLevel)}
                      className={`py-2.5 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                        selectedGrade === g
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105 ring-2 ring-indigo-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
                <span className="block text-[11px] text-slate-400">
                  Global Success Lớp {selectedGrade} ({currentUnits.length} Units)
                </span>
              </div>

              {/* Unit Dropdown Selector (5 cols) */}
              <div className="lg:col-span-5 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase flex items-center justify-between">
                  <span>2. Chọn Bài Học / Unit SGK *</span>
                  <span className="text-indigo-600 dark:text-indigo-400 normal-case font-medium text-[11px]">
                    Học kỳ {currentSelectedUnit?.semester || 1} • {currentSelectedUnit?.pageRange}
                  </span>
                </label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => handleUnitChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  {currentUnits.map((u) => (
                    <option key={u.unitId} value={u.unitId}>
                      {u.unitCode}: {u.theme} ({u.pageRange})
                    </option>
                  ))}
                </select>
                <span className="block text-[11px] text-slate-500 truncate">
                  {currentSelectedUnit?.title}
                </span>
              </div>

              {/* Lesson Dropdown / Selector (4 cols) */}
              <div className="lg:col-span-4 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  3. Chọn Lesson (Tiết Dạy) *
                </label>
                <select
                  value={selectedLessonId}
                  onChange={(e) => handleLessonChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  {currentSelectedUnit?.lessons.map((l) => (
                    <option key={l.lessonId} value={l.lessonId}>
                      {l.lessonName} ({l.vocab.length} từ)
                    </option>
                  ))}
                </select>
                <span className="block text-[11px] text-slate-400">
                  {currentSelectedLesson?.pageRange ? `Trang SGK: ${currentSelectedLesson.pageRange}` : 'Toàn bộ nội dung'}
                </span>
              </div>
            </div>

            {/* Quick Lesson Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-bold text-slate-500">Xem nhanh theo Lesson:</span>
              {currentSelectedUnit?.lessons.map((l) => (
                <button
                  key={l.lessonId}
                  type="button"
                  onClick={() => handleLessonChange(l.lessonId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedLessonId === l.lessonId
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {l.shortLabel}
                </button>
              ))}
            </div>

            {/* Curriculum Info & Fast Action Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 space-y-3.5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold font-fredoka">
                      {currentSelectedUnit?.unitCode}
                    </span>
                    <h3 className="text-base font-fredoka font-bold text-slate-900 dark:text-white">
                      {currentSelectedUnit?.title}
                    </h3>
                    <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                      • {currentSelectedLesson?.lessonName}
                    </span>
                  </div>

                  {/* Patterns & Phonics */}
                  <div className="mt-2 space-y-1 text-xs">
                    {currentSelectedLesson?.patterns && currentSelectedLesson.patterns.length > 0 && (
                      <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                        <strong className="text-indigo-900 dark:text-indigo-200 shrink-0">🎯 Mẫu câu trọng tâm:</strong>
                        <span className="italic font-medium">"{currentSelectedLesson.patterns.join(' " • " ')}"</span>
                      </div>
                    )}
                    {currentSelectedLesson?.phonics && (
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <strong className="text-purple-900 dark:text-purple-200 shrink-0">🔊 Âm / Phonics:</strong>
                        <span className="font-mono font-bold text-purple-700 dark:text-purple-300">{currentSelectedLesson.phonics}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Quick Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleReloadStandardSGKVocab}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    title="Nạp lại từ vựng SGK gốc chuẩn"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nạp Chuẩn SGK</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateVocabulary}
                    disabled={isGenerating}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-fredoka font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isGenerating ? 'AI Đang Soạn...' : 'AI Soạn & Mở Rộng Sư Phạm'}</span>
                  </button>
                </div>
              </div>

              {/* Target Words Badges Preview */}
              <div className="pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Từ vựng bài học:</span>
                {(currentSelectedLesson?.vocab || []).map((w, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-900 dark:text-indigo-200 text-xs font-bold font-fredoka border border-indigo-200 dark:border-indigo-700 shadow-xs"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* MODE B: CUSTOM MANUAL INPUT                                  */
          /* ------------------------------------------------------------- */
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Grade Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Khối Lớp (Grade) *
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGrade(g as EnglishGradeLevel)}
                      className={`py-2 rounded-xl text-xs font-fredoka font-bold transition-all ${
                        selectedGrade === g
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Series Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Bộ SGK Tiếng Anh
                </label>
                <select
                  value={selectedBookSeries}
                  onChange={(e) => setSelectedBookSeries(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Global Success (Bộ GD&ĐT)">Global Success (Bộ Giáo Dục và Đào Tạo)</option>
                  <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống (NXB GDVN)</option>
                </select>
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Chủ Đề (Category)
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Tự động phân loại theo nghĩa">✨ AI Tự Động Phân Loại Theo Nghĩa</option>
                  {PRIMARY_VOCAB_TOPICS.map(t => (
                    <option key={t.id} value={t.category}>{t.icon} {t.name}</option>
                  ))}
                </select>
              </div>

              {/* Unit / Lesson Context */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Tên Bài / Unit
                </label>
                <input
                  type="text"
                  value={unitLesson}
                  onChange={(e) => setUnitLesson(e.target.value)}
                  placeholder="e.g. Unit 3: In the Classroom"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Word Textarea Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Danh sách từ vựng tiếng Anh (Nhập thủ công) *
              </label>
              <textarea
                rows={2}
                value={inputWords}
                onChange={(e) => setInputWords(e.target.value)}
                placeholder="Nhập các từ tiếng Anh (e.g. ear, pencil, teacher, hospital, swim hoặc cat, dog, bird, fish...)"
                className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-fredoka font-semibold text-base focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
              />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-slate-500">Gợi ý từ vựng nhanh:</span>
              {['ear, eye, nose, mouth, hand', 'pencil, pen, book, ruler, eraser', 'teacher, doctor, nurse, hospital', 'swim, run, sing, dance, read', 'apple, banana, orange, milk'].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputWords(preset)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 text-xs transition-all"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Manual Generate Button */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Quy chuẩn sư phạm: Giải thích Easy English (không dùng từ đang dạy), câu mẫu chuẩn SGK.</span>
              </div>

              <button
                onClick={handleGenerateVocabulary}
                disabled={isGenerating}
                className={`px-8 py-3.5 rounded-2xl font-fredoka font-black text-base shadow-xl flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer ${
                  isGenerating
                    ? 'bg-indigo-400 text-white cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>AI Đang Soạn Nội Dung Dạy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Soạn Nội Dung Dạy Bằng AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Generated Vocabulary List & Teacher Workspace */}
      <div className="space-y-4">
        {/* Workspace Toolbar */}
        <div className="p-4 px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h3 className="font-fredoka font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <span>Danh Sách Từ Vựng Đang Dạy</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                {vocabList.length} từ
              </span>
            </h3>
          </div>

          {/* Quick Options */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Slow speed toggle */}
            <button
              onClick={() => setIsSlowMode(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSlowMode 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
              title="Tốc độ phát âm cho tiểu học"
            >
              {isSlowMode ? <Snail className="w-4 h-4" /> : <Rabbit className="w-4 h-4" />}
              <span>{isSlowMode ? 'Phát âm chậm (0.75x)' : 'Phát âm chuẩn (1.0x)'}</span>
            </button>

            {/* Toggle show all Vietnamese */}
            <button
              onClick={() => setShowAllVietnamese(prev => !prev)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5"
            >
              {showAllVietnamese ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Nghĩa TV: {showAllVietnamese ? 'Hiện tất cả' : 'Đang ẩn'}</span>
            </button>

            {/* Add New Word Button */}
            <button
              onClick={handleAddNewWord}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm từ</span>
            </button>

            {/* Save Package */}
            <button
              onClick={handleSaveCurrentPackage}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu bộ từ</span>
            </button>

            {/* Export Word */}
            <button
              onClick={handleExportWordDoc}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold border border-indigo-200 dark:border-indigo-800 transition-all flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Xuất Word</span>
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopyText}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMessage ? 'Đã sao chép!' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vocabList.map((item, index) => {
            const isPlayingThisWord = playingWordId === item.id;
            const isPlayingThisSent = playingWordId === (item.id + '_sent');

            return (
              <div
                key={item.id || index}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group relative"
              >
                {/* Top Section: Word, IPA, Badges & Actions */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Visual Thumbnail */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm relative group">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.word}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Word info */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h4 className="text-2xl font-fredoka font-black text-slate-900 dark:text-white capitalize">
                          {item.word}
                        </h4>
                        <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                          {item.pronunciation}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800">
                          {item.wordType}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Top Right Action Icons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white disabled:opacity-30 transition-all"
                      title="Chuyển lên"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === vocabList.length - 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white disabled:opacity-30 transition-all"
                      title="Chuyển xuống"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setEditingWord(item);
                        setIsEditModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all"
                      title="Chỉnh sửa từ này"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteWord(item.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all"
                      title="Xóa từ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Middle Section: Easy English Explanation Box (Pedagogical Core) */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Easy English Explanation:</span>
                    </span>
                    <button
                      onClick={() => handlePronounce(item.easyEnglishExplanation, item.id + '_exp')}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold normal-case text-xs"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Nghe</span>
                    </button>
                  </div>

                  <p className="text-sm font-fredoka font-medium text-indigo-950 dark:text-indigo-100 leading-snug">
                    "{item.easyEnglishExplanation}"
                  </p>
                </div>

                {/* Model Sentence Box */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <span>Model Sentence (Câu mẫu):</span>
                    <button
                      onClick={() => handlePronounceSentence(item.modelSentence, item.id)}
                      className={`text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold normal-case text-xs ${
                        isPlayingThisSent ? 'animate-pulse text-amber-500' : ''
                      }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Nghe</span>
                    </button>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                    "{item.modelSentence}"
                  </p>
                </div>

                {/* Bottom Row: Vietnamese Meaning & Word Speaker */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Nghĩa TV:</span>
                    {showAllVietnamese ? (
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-fredoka">
                        {item.vietnameseMeaning}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 italic">(Đang ẩn)</span>
                    )}
                  </div>

                  <button
                    onClick={() => handlePronounce(item.word, item.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-fredoka font-bold text-xs flex items-center gap-1.5 transition-all transform active:scale-95 ${
                      isPlayingThisWord
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlayingThisWord ? 'Đang đọc...' : 'Phát âm'}</span>
                  </button>
                </div>

                {/* TPR Teaching Note Banner (if present) */}
                {item.teachingNotes && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5 pt-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Gợi ý TPR:</strong> {item.teachingNotes}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout & Quick Launch Presentation */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30">
              📺
            </div>
            <div>
              <h4 className="font-fredoka font-bold text-base text-slate-900 dark:text-white">
                Sẵn sàng cho tiết dạy trên lớp?
              </h4>
              <p className="text-xs text-slate-500">
                Mở chế độ trình chiếu (Slideshow) toàn màn hình trên máy chiếu hoặc tivi thông minh của lớp học.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPresentationOpen(true)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <Presentation className="w-4 h-4" />
            <span>Bắt Đầu Trình Chiếu (F5)</span>
          </button>
        </div>
      </div>

      {/* 4. Presentation Fullscreen Modal */}
      <VocabPresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        words={vocabList}
        title={`${unitLesson || 'Từ Vựng Tiếng Anh'}`}
        grade={selectedGrade}
      />

      {/* 5. Teacher Edit Modal */}
      <VocabEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingWord(null);
        }}
        wordItem={editingWord}
        onSave={handleSaveWordEdit}
      />

      {/* 6. Print & Worksheet Modal */}
      <VocabPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        words={vocabList}
        title={`${unitLesson || 'Từ Vựng Tiếng Anh'}`}
        grade={selectedGrade}
      />

      {/* 7. Primary 400+ Dictionary Explorer Modal */}
      <PrimaryDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        onSelectWord={(wordItem) => {
          setInputWords(prev => prev ? `${prev}, ${wordItem.word}` : wordItem.word);
        }}
      />
    </div>
  );
}
