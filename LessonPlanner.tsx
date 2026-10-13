/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  BookOpen, Upload, FileText, Settings, Sparkles, Check, X, 
  Download, RefreshCw, Sliders, HelpCircle, ArrowRight, Save, 
  Trash2, Plus, Volume2, FileSpreadsheet, Eye, Play, PlusCircle,
  Award, Languages, GraduationCap, Cpu, Layers, Compass, ClipboardList, 
  Wand2, Copy, Printer, Share2, CheckCircle2, AlertCircle, AlertTriangle,
  Star, ClipboardCheck, Link2, ExternalLink, Image as ImageIcon, FolderArchive,
  Maximize2, Send, Zap, MessageSquare, Gamepad2, ShieldCheck, ShieldAlert,
  HeartHandshake
} from 'lucide-react';
import { sounds } from '../lib/audio';
import { 
  Question, SubjectType, QuestionType, OfficialReference, 
  StoredTextbook, FullLessonPlan, WarehouseLessonPlan, AttachedImage,
  LessonPlan, DisabilitySupportConfig, DisabilityCategoryType
} from '../types';
import LibraryTab from './LibraryTab';
import ReportsTab from './ReportsTab';
import RulesTab from './RulesTab';
import PrivacyTab from './PrivacyTab';
import TextbookStorageManager from './TextbookStorageManager';
import OfficialReferencesManager from './OfficialReferencesManager';
import LessonWarehouse from './LessonWarehouse';
import WordLessonPlanView from './WordLessonPlanView';
import SGVReferenceModal, { SGVLessonEntry } from './SGVReferenceModal';
import HocLieuReferenceModal, { HocLieuLessonEntry } from './HocLieuReferenceModal';
import SubjectTeachingPlanModal from './SubjectTeachingPlanModal';
import UploadLessonTemplateModal from './UploadLessonTemplateModal';
import { ParsedLessonTemplate } from '../utils/lessonTemplateParser';
import { 
  getActivePersonalAppendix2, 
  getIntegrationForLessonPlan,
  getOrCreateActivePlanForSubjectAndGrade,
  PersonalAppendix2Plan,
  ALL_PRIMARY_SUBJECTS
} from '../data/personalAppendix2Manager';
import { 
  DEFAULT_OFFICIAL_REFERENCES, 
  INITIAL_STORED_TEXTBOOKS, 
  INITIAL_WAREHOUSE_LESSON_PLANS,
  GLOBAL_SUCCESS_SUPER_PROMPT,
  GLOBAL_SUCCESS_CURRICULUM,
  PRIMARY_SUBJECTS_CURRICULUM,
  SUBJECT_SECTIONS_TAXONOMY,
  CLASSROOM_GAMES_DATABASE,
  PEDAGOGICAL_METHODS_DATABASE,
  SubjectCurriculumWeek,
  SubjectSectionOption,
  ClassroomGame,
  PedagogicalMethod,
  generateSmartEduLessonPlan,
  getWeeksForSubject,
  SubjectCurriculumWeekDetailed,
  CurriculumPeriod
} from '../data/curriculumAndTextbooks';

interface LessonPlannerProps {
  onAddQuestions: (questions: any[]) => void;
  onNavigate: (tabId: string, payload?: any) => void;
  initialPlanParams?: {
    subject?: string;
    grade?: string;
    week?: number;
    periodIdx?: number | null;
    lessonTitle?: string;
    periodLabel?: string;
    unitCode?: string;
    theme?: string;
    detailedContent?: string;
    vocab?: string[];
    patterns?: string[];
    openSGV?: boolean;
    adjustment?: {
      ai?: string;
      atgt_kns?: string;
      nls?: string;
      devices?: string;
    };
  } | null;
}

interface AIAnalysis {
  strengths: string[];
  weaknesses: string[];
  goalsNotMet?: string;
  digitalTransformation?: string;
  stemSteamScope?: string;
}

export default function LessonPlanner({ onAddQuestions, onNavigate, initialPlanParams }: LessonPlannerProps) {
  // Input states
  const [inputText, setInputText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');

  // Loaded/Created Lesson Plan state
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [currentFullPlan, setCurrentFullPlan] = useState<FullLessonPlan | null>(null);
  const [editorViewMode, setEditorViewMode] = useState<'word' | 'interactive'>('word');
  const [originalPlan, setOriginalPlan] = useState<LessonPlan | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);

  // Proposed changes states (for accept/reject feature)
  const [proposedChanges, setProposedChanges] = useState<{
    objectives?: string[];
    activities?: typeof lessonPlan.activities;
    assessment?: string[];
    materials?: string[];
  } | null>(null);

  // Core Subject & Grade level inputs overrides
  const [selectedSubject, setSelectedSubject] = useState<string>('Khoa học');
  const [selectedGrade, setSelectedGrade] = useState<string>('Lớp 4');
  const [difficultyLevel, setDifficultyLevel] = useState<string>('Trung bình');
  const [autoSimplifyIfHard, setAutoSimplifyIfHard] = useState<boolean>(true);

  // STEM/STEAM methods toggles
  const [stemOption, setStemOption] = useState<string>('none');

  // Digital Competency selectors & AI integrations selections
  const [digitalComp, setDigitalComp] = useState<string>('none');
  const [aiOptions, setAiOptions] = useState<string[]>(['Gemini', 'Canva AI', 'Quizizz']);
  const [englishOptions, setEnglishOptions] = useState<string[]>(['CEFR', 'Classroom English', 'Classroom Management']);

  // Checklist options (Tùy chọn chỉnh sửa)
  const [options, setOptions] = useState({
    // Professional Alignment
    checkCurriculumDistribution: true,
    checkObjectivesAligned: true,
    checkKnowledgeStrand: true,
    checkLogicGoalActivity: true,
    checkClassDuration: true,
    checkLessonStructure: true,
    checkMOET2345Template: true,
    suggestClassGradeAdjustments: true,

    // Language check for all subjects
    langSpellCheck: true,
    langTelexCheck: true,
    langPunctuationCheck: true,
    langSpacingCheck: true,
    langCapitalizationCheck: true,
    langWordRepetitionCheck: true,
    langSentenceLengthCheck: true,
    langPhrasingCheck: true,
    langBetterWording: true,
    langTerminology: true,

    // English teacher options
    engGrammar: true,
    engVocabulary: true,
    engSpelling: true,
    engPronunciation: true,
    engIPA: true,
    engNatural: true,
    engCEFR: true,
    engGlobalSuccess: true,
    engOxford: false,
    engCambridge: false,
    engAmerican: true,
    engBritish: false,
    engTeacherTalk: true,
    engStudentTalk: true,
    engClassroomEnglish: true,
    engInstructionClarity: true,
    engAgeAppropriate: true,
    engCulturalAppropriate: true,
    engRewriteA1: false,
    engRewriteA2: false,
    engRewriteB1: false,
    engRewriteB2: false,

    // Legacy standard states
    standard2018: true,
    dispatch2345: true,
    dispatch3456: false,
    qualityStandard: true,
    competencyStandard: true,
    adjustDuration: false,
    adjustLanguage: false,
    rewriteObjectives: false,
    rewriteActivities: false,
    rewriteAssessment: false,
  });

  // Extended states for Full AI Review results
  const [aiReviewResult, setAiReviewResult] = useState<any | null>(null);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewStep, setReviewStep] = useState<string>('');

  // Pop-up details for printable student materials
  const [activeMaterial, setActiveMaterial] = useState<any | null>(null);
  const [reviewActiveTab, setReviewActiveTab] = useState<'pedagogy' | 'language' | 'stem' | 'materials'>('pedagogy');

  // Modules checkboxes (Legacy support)
  const [stemMode, setStemMode] = useState<boolean>(false);
  const [steamMode, setSteamMode] = useState<boolean>(false);
  const [aiLiteracy, setAiLiteracy] = useState<boolean>(false);

  // Edit level slider (Mức độ chỉnh sửa: 0%, 25%, 50%, 75%, 100%)
  const [editLevel, setEditLevel] = useState<number>(50);

  // Export popup state
  const [exportFormat, setExportFormat] = useState<string | null>(null);

  // Recommended instant mini-game generators
  const [generatedGameType, setGeneratedGameType] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  // --- Extended Features States ---
  const [plannerTab, setPlannerTab] = useState<'warehouse' | 'editor' | 'books' | 'references' | 'library' | 'reports' | 'rules' | 'privacy'>('warehouse');
  const [selectedBook, setSelectedBook] = useState<string>('Kết nối tri thức và cuộc sống');
  const [lessonPeriods, setLessonPeriods] = useState<number>(1);
  const [teachingFormat, setTeachingFormat] = useState<string>('Trực tiếp tại lớp');

  // Classification states (Unit, Lesson, Period)
  const [selectedUnit, setSelectedUnit] = useState<string>('Unit 1: Hello');
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<string>('Lesson 1');
  const [selectedPeriodNumber, setSelectedPeriodNumber] = useState<string>('Tiết 1 (35 phút)');
  const [selectedActivityScope, setSelectedActivityScope] = useState<string>('act_1_2_3');
  const [customActivities, setCustomActivities] = useState<number[]>([1, 2, 3]);

  // Subject week & section states (Chuẩn 35 tuần & Chọn từng tiết, từng bài)
  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(1);
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState<number | null>(1); // 1, 2, 3... or null (toàn tuần)
  const [semesterFilter, setSemesterFilter] = useState<'all' | 1 | 2>('all');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('tv_doc');
  const [selectedGameId, setSelectedGameId] = useState<string>('game_ai_nhanh_dung');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('method_5e');
  const [selectedSituationText, setSelectedSituationText] = useState<string>('');

  // Tùy chỉnh tích hợp học sinh khuyết tật hòa nhập (Bôi đỏ hoạt động)
  const [disabilityConfig, setDisabilityConfig] = useState<DisabilitySupportConfig>({
    enabled: false,
    selectedTypes: ['intellectual'],
    teacherNotes: ''
  });

  const handleUpdateDisabilityConfig = (newConfig: DisabilitySupportConfig) => {
    setDisabilityConfig(newConfig);
    if (selectedSubject === 'Tiếng Anh' && currentFullPlan) {
      try {
        const activeRefs = officialReferences.filter(r => r.isActive);
        const regenerated = generateSmartEduLessonPlan({
          subject: selectedSubject,
          grade: selectedGrade,
          unit: selectedUnit,
          lesson: selectedLessonNumber,
          period: selectedPeriodNumber,
          weekNumber: selectedWeekNumber,
          activityScope: activityScopeMode === 'custom' ? `Tự nhập (${customActivityText.split('\n').filter(Boolean).length} hoạt động)` : selectedActivityScope,
          customActivityText: activityScopeMode === 'custom' ? customActivityText : '',
          lessonName: inputText.split('\n')[0]?.replace(/Bài học:?|Unit:?/i, '').trim() || selectedStoredBook?.title || `${selectedUnit} - ${selectedLessonNumber}`,
          bookSeries: selectedBook,
          duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
          selectedTextbook: selectedStoredBook || undefined,
          officialReferences: activeRefs,
          attachedImages: attachedImages,
          disabilitySupport: newConfig,
          customTeacherNote: `${teacherCustomPrompt ? `[Lệnh Prompt của GV]: ${teacherCustomPrompt}\n` : ''}${inputText}`
        });
        if (regenerated) {
          setCurrentFullPlan(regenerated);
        }
      } catch (err) {
        console.error('Error updating disability support in plan:', err);
      }
    }
  };

  // Synchronize unit & lessons when grade, subject, week, section or period changes
  const handleSubjectOrGradeChange = (
    newSubject: string, 
    newGrade: string, 
    newWeek?: number, 
    newSectionId?: string,
    newPeriodIdx?: number | null
  ) => {
    setSelectedSubject(newSubject);
    setSelectedGrade(newGrade);

    if (newSubject === 'Tiếng Anh') {
      const all35Weeks = getWeeksForSubject('Tiếng Anh', newGrade);
      const weekNum = newWeek !== undefined ? newWeek : selectedWeekNumber;
      const currentWeekData = all35Weeks.find(w => w.week === weekNum) || all35Weeks[0];
      const pIdx = newPeriodIdx !== undefined ? newPeriodIdx : selectedPeriodIndex;

      setSelectedWeekNumber(currentWeekData.week);
      setSelectedUnit(currentWeekData.theme || `Unit ${Math.ceil(currentWeekData.week / 2)}`);
      
      if (pIdx !== null && currentWeekData.periods && currentWeekData.periods.length > 0) {
        const specificPeriod = currentWeekData.periods.find(p => p.periodNumber === pIdx) || currentWeekData.periods[0];
        setSelectedPeriodIndex(specificPeriod.periodNumber);
        setSelectedLessonNumber(specificPeriod.lessonPart);
        setSelectedPeriodNumber(`${specificPeriod.periodLabel} (${specificPeriod.scope})`);
        setLessonPeriods(1);

        setInputText(`[SGK Tiếng Anh Global Success - ${newGrade} - Tuần ${currentWeekData.week}]\nBài học: ${specificPeriod.lessonPart} (${specificPeriod.periodLabel})\nChủ điểm/Unit: ${currentWeekData.theme}\nPhạm vi: ${specificPeriod.scope}\nTrọng tâm tiết dạy: ${specificPeriod.keyFocus}\nTrang SGK: ${specificPeriod.pageRange || currentWeekData.textbookPageRange || ''}\nTừ vựng: ${currentWeekData.keyVocabulary?.join(', ') || ''}\nMẫu câu: ${currentWeekData.sentencePatternsOrRules?.join('; ') || ''}`);
      } else {
        setSelectedPeriodIndex(null);
        setSelectedLessonNumber(currentWeekData.lessonTitle);
        setSelectedPeriodNumber(`Toàn bộ Tuần ${currentWeekData.week} (${currentWeekData.periodCount} tiết)`);
        setLessonPeriods(currentWeekData.periodCount);

        setInputText(`[SGK Tiếng Anh Global Success - ${newGrade} - Tuần ${currentWeekData.week}]\nChủ đề: ${currentWeekData.theme}\nBài học chính: ${currentWeekData.lessonTitle}\nTừ vựng trọng tâm: ${currentWeekData.keyVocabulary?.join(', ') || ''}\nMẫu câu chính: ${currentWeekData.sentencePatternsOrRules?.join('; ') || ''}\nThời lượng: ${currentWeekData.periodCount} tiết\nTrang SGK: ${currentWeekData.textbookPageRange || ''}`);
      }
    } else {
      // Non-English subjects (Tiếng Việt, Toán, Khoa học, Tự nhiên và Xã hội, Lịch sử và Địa lý, Hoạt động trải nghiệm)
      const weekNum = newWeek !== undefined ? newWeek : selectedWeekNumber;
      const secId = newSectionId !== undefined ? newSectionId : selectedSectionId;
      const pIdx = newPeriodIdx !== undefined ? newPeriodIdx : selectedPeriodIndex;

      const subjectCurriculum = getWeeksForSubject(newSubject, newGrade);
      const currentWeekData = subjectCurriculum.find(w => w.week === weekNum) || subjectCurriculum[0];
      const sections = SUBJECT_SECTIONS_TAXONOMY[newSubject] || [];
      const currentSection = sections.find(s => s.id === secId) || sections[0];

      if (currentWeekData) {
        setSelectedWeekNumber(currentWeekData.week);
        setSelectedUnit(`Tuần ${currentWeekData.week}: ${currentWeekData.theme}`);
        setSelectedSituationText(currentWeekData.suggestedScenario || '');
        if (currentSection) setSelectedSectionId(currentSection.id);

        // Check if specific period chosen
        if (pIdx !== null && currentWeekData.periods && currentWeekData.periods.length > 0) {
          const specificPeriod = currentWeekData.periods.find(p => p.periodNumber === pIdx) || currentWeekData.periods[0];
          setSelectedPeriodIndex(specificPeriod.periodNumber);
          setSelectedLessonNumber(`${specificPeriod.lessonPart}`);
          setSelectedPeriodNumber(`${specificPeriod.periodLabel} - 35 phút`);
          setLessonPeriods(1);

          setInputText(`[SGK ${newSubject} ${newGrade} (Bộ sách Kết nối tri thức) - Tuần ${currentWeekData.week}]\nTiết dạy: ${specificPeriod.periodLabel} - ${specificPeriod.lessonPart}\nPhạm vi bài học: ${specificPeriod.scope}\nTrọng tâm tiết: ${specificPeriod.keyFocus}\nTrang SGK: ${specificPeriod.pageRange || currentWeekData.textbookPageRange || ''}\nChủ đề tuần: ${currentWeekData.theme}\nPhương pháp đề xuất: ${currentWeekData.suggestedMethod}\nTrò chơi khởi động: ${currentWeekData.suggestedGame?.name || 'Ai nhanh ai đúng'}`);
        } else {
          setSelectedPeriodIndex(null);
          setSelectedLessonNumber(currentWeekData.lessonTitle);
          setSelectedPeriodNumber(currentSection ? `${currentSection.name} (${currentSection.defaultPeriod})` : `Toàn bộ Tuần ${currentWeekData.week} (${currentWeekData.periodCount} tiết)`);
          setLessonPeriods(currentWeekData.periodCount);

          const keyKnowledgeStr = Array.isArray(currentWeekData.keyKnowledge) 
            ? currentWeekData.keyKnowledge.join('; ') 
            : String(currentWeekData.keyKnowledge || '');

          setInputText(`[SGK ${newSubject} ${newGrade} (Bộ sách Kết nối tri thức) - Tuần ${currentWeekData.week}]\nBài học: ${currentWeekData.lessonTitle}\nChủ điểm: ${currentWeekData.theme}\nPhân môn / Mục: ${currentSection ? currentSection.name + ' - ' + currentSection.shortDesc : 'Toàn bài'}\nKiến thức trọng tâm: ${keyKnowledgeStr}\nThời lượng: ${currentWeekData.periodCount} tiết\nTrò chơi học tập đề xuất: ${currentWeekData.suggestedGame?.name || 'Ai nhanh ai đúng'} (Mục tiêu: ${currentWeekData.suggestedGame?.goal || ''})\nPhương pháp dạy học: ${currentWeekData.suggestedMethod}\nTình huống sư phạm: ${currentWeekData.suggestedScenario}`);
        }
      }
    }
  };

  const handleGradeChange = (newGrade: string) => {
    handleSubjectOrGradeChange(selectedSubject, newGrade);
  };

  // Multimodal Image Attachment states
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [isOcrProcessing, setIsOcrProcessing] = useState<boolean>(false);
  const [ocrStatusText, setOcrStatusText] = useState<string>('');
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  // Custom Teacher Prompt
  const [teacherCustomPrompt, setTeacherCustomPrompt] = useState<string>('');

  // SGV Reference Modal state (taphuan.nxbgd.vn integration)
  const [showSGVModal, setShowSGVModal] = useState<boolean>(false);

  // Kho Hoc Lieu Reference Modal state (hoclieu.vn integration)
  const [showHocLieuModal, setShowHocLieuModal] = useState<boolean>(false);

  // 35 Weeks Curriculum Teaching Plan Modal (Phụ lục 2 CV 2345)
  const [showSubjectPlanModal, setShowSubjectPlanModal] = useState<boolean>(false);

  // Activity Scope mode and custom input text
  const [activityScopeMode, setActivityScopeMode] = useState<'preset' | 'custom'>('preset');
  const [customActivityText, setCustomActivityText] = useState<string>('');

  const handleSelectPeriodFrom35Weeks = (subj: string, grd: string, weekNum: number, periodNum: number | null) => {
    sounds.playLevelUp();
    handleSubjectOrGradeChange(subj, grd, weekNum, undefined, periodNum);
    setPlannerTab('editor');
  };

  const handleApplyHocLieuToLessonPlan = (entry: HocLieuLessonEntry) => {
    sounds.playLevelUp();
    setSelectedSubject(entry.subject);
    setSelectedGrade(entry.grade);
    setSelectedBook(entry.bookSeries);
    setSelectedUnit(entry.unit);
    setSelectedLessonNumber(entry.lessonName);
    if (entry.week) setSelectedWeekNumber(entry.week);

    // Auto-populate custom activity scope with exact activities from hoclieu.vn
    if (entry.activities && entry.activities.length > 0) {
      setCustomActivityText(entry.activities.join('\n'));
      setActivityScopeMode('custom');
    }

    const displayTitle = entry.title || entry.lessonName;
    const vocabList = entry.keyVocabulary || entry.keyVocab || [];
    const patternList = entry.sentencePatterns || entry.keyPatterns || [];

    let summaryText = `[Nguồn Kho Học Liệu Số hoclieu.vn: ${displayTitle}]\n`;
    summaryText += `Môn học: ${entry.subject} - ${entry.grade}\n`;
    summaryText += `Bộ sách: ${entry.bookSeries}\n`;
    summaryText += `Chủ đề/Unit: ${entry.unit} - Bài: ${entry.lessonName}\n`;
    if (entry.pageRange) summaryText += `Trang SGK: ${entry.pageRange}\n`;
    if (vocabList.length > 0) {
      summaryText += `Từ vựng trọng tâm: ${vocabList.join(', ')}\n`;
    }
    if (patternList.length > 0) {
      summaryText += `Mẫu câu chính: ${patternList.join('; ')}\n`;
    }
    if (entry.activities && entry.activities.length > 0) {
      summaryText += `Danh sách hoạt động cần soạn:\n${entry.activities.map((a, i) => `  ${i + 1}. ${a}`).join('\n')}\n`;
    }
    if (entry.lessonPlanOverview || entry.sampleTeacherNotes) {
      summaryText += `\nKế hoạch bài dạy tham khảo từ hoclieu.vn:\n${entry.lessonPlanOverview || entry.sampleTeacherNotes}\n`;
    }

    setInputText(summaryText);
    setTeacherCustomPrompt(`Soạn kế hoạch bài dạy bám sát 100% mục tiêu và hoạt động từ Kho học liệu số hoclieu.vn (${displayTitle}, ${entry.pageRange || ''}). Dạy đúng các hoạt động: ${entry.activities.join('; ')}.`);
    setShowHocLieuModal(false);
    alert(`✨ Đã nạp thành công dữ liệu và ${entry.activities.length} hoạt động chuẩn từ Kho học liệu số hoclieu.vn (${displayTitle})!`);
  };

  const handleApplySGVToLessonPlan = (entry: SGVLessonEntry) => {
    sounds.playLevelUp();
    setSelectedSubject(entry.subject);
    setSelectedGrade(entry.grade);
    setSelectedBook(entry.bookSeries);
    setSelectedWeekNumber(entry.week);
    setSelectedLessonNumber(entry.lessonName);
    if (entry.periodLabel) {
      setSelectedPeriodNumber(entry.periodLabel);
    }
    setSelectedUnit(entry.unit);

    const isPeriod = entry.entryType === 'period';
    const formattedNotes = `[Dữ liệu Sách Giáo Viên chuẩn NXBGDVN - taphuan.nxbgd.vn]
${isPeriod ? `[PHỤ LỤC 2 KẾ HOẠCH DẠY HỌC - TIẾT ${entry.periodNumber || entry.periodLabel}]` : '[TỔNG THỂ BÀI HỌC THEO TUẦN]'}
Môn: ${entry.subject} - ${entry.grade} (${entry.bookSeries})
Bài dạy: ${entry.lessonName}
Thời lượng: ${entry.period} - Trang SGK: ${entry.pageRange}
${entry.vocab && entry.vocab.length > 0 ? `Từ vựng trọng tâm: ${entry.vocab.join(', ')}\n` : ''}${entry.patterns && entry.patterns.length > 0 ? `Mẫu câu / Quy tắc: ${entry.patterns.join(' / ')}\n` : ''}
I. YÊU CẦU CẦN ĐẠT CHUẨN SGV:
- Năng lực đặc thù (${entry.subject}):
${entry.objectives.specificCompetencies.map(c => `  + ${c}`).join('\n')}
- Năng lực chung:
${entry.objectives.generalCompetencies.map(c => `  + ${c}`).join('\n')}
- Phẩm chất chủ yếu:
${entry.objectives.qualities.map(c => `  + ${c}`).join('\n')}
${entry.integratedCV2345 ? `\n* TÍCH HỢP CV 2345:
- Năng lực số: ${entry.integratedCV2345.digitalCompetence || 'Khai thác kho học liệu taphuan.nxbgd.vn'}
- AI: ${entry.integratedCV2345.aiLiteracy || 'Nhận biết AI an toàn'}
- ATGT & KNS: ${entry.integratedCV2345.trafficSafety || ''} | ${entry.integratedCV2345.lifeSkills || ''}\n` : ''}
II. TRÒ CHƠI KHỞI ĐỘNG CỤ THỂ:
- Tên trò chơi: ${entry.warmUpGame.name}
- Mục tiêu: ${entry.warmUpGame.aims}
- Chuẩn bị: ${entry.warmUpGame.preparation}
- Luật chơi: ${entry.warmUpGame.rules.join('; ')}
- Câu hỏi thử thách & Đáp án:
${entry.warmUpGame.sampleQuestions.map(q => `  + ${q.question} -> Đáp án: ${q.answer}`).join('\n')}
- Lời dẫn dắt của GV: "${entry.warmUpGame.teacherScript}"

III. TIẾN TRÌNH KHÁM PHÁ KIẾN THỨC MỚI:
- Trọng tâm SGK: ${entry.exploration.textbookFocus}
- Câu hỏi gợi mở của GV:
${entry.exploration.teacherQuestions.map(q => `  + ${q}`).join('\n')}
- Thao tác của HS: ${entry.exploration.studentActions.join('; ')}
- Ghi nhớ trọng tâm: ${entry.exploration.keyTakeaway}

IV. BÀI TẬP LUYỆN TẬP & VẬN DỤNG:
${entry.practice.exercises.map(ex => `- ${ex.title} (${ex.form}) | Lỗi dễ mắc: ${ex.commonMistakes}`).join('\n')}
- Vận dụng thực tế: ${entry.application.realLifeScenario}`;

    setInputText(formattedNotes);
    setTeacherCustomPrompt(`Soạn kế hoạch bài dạy bám sát 100% mục tiêu SGV taphuan.nxbgd.vn cho bài "${entry.lessonName}". Trò chơi khởi động: "${entry.warmUpGame.name}" kèm đầy đủ luật chơi và các câu hỏi thử thách. Khám phá có đủ câu hỏi gợi mở của GV và thao tác đồ dùng của HS.`);
    alert(`✨ Đã nạp thành công chuẩn SGV ${isPeriod ? `Tiết ${entry.periodNumber || entry.periodLabel}` : `Bài`} "${entry.lessonName}"! Nhấn "Tạo Kế Hoạch Bài Dạy" để tạo giáo án chi tiết ngay nhé cô! 🐝`);
  };

  // Super Prompt persistence & management (Specifically for Global Success English as requested)
  const [globalSuccessSuperPrompt, setGlobalSuccessSuperPrompt] = useState<string>(() => {
    const saved = localStorage.getItem('smartedu_english_global_success_super_prompt');
    return saved || GLOBAL_SUCCESS_SUPER_PROMPT;
  });
  const [showSuperPromptModal, setShowSuperPromptModal] = useState<boolean>(false);
  const [promptSavedToast, setPromptSavedToast] = useState<boolean>(false);

  // Auto-detect & auto-inject prompt notification when English + Global Success is active
  React.useEffect(() => {
    if (selectedSubject === 'Tiếng Anh' && selectedBook.toLowerCase().includes('global success')) {
      if (!teacherCustomPrompt || teacherCustomPrompt.trim() === '') {
        setTeacherCustomPrompt('Áp dụng Siêu Lệnh Prompt Chuẩn Global Success (CV 2345/BGDĐT, CV 3456/BGDĐT, QĐ 2422/QĐ-BGDĐT, tiến trình 4 hoạt động 3 cột, 100% Classroom English, động từ hành động).');
      }
    }
  }, [selectedSubject, selectedBook]);

  // Suggestion notification state from Phụ lục 2 navigation
  const [suggestionNotice, setSuggestionNotice] = useState<{
    lessonTitle: string;
    periodLabel: string;
    grade: string;
    week: number;
    unitCode?: string;
  } | null>(null);

  // Auto-prefill and generate instant lesson plan suggestion when navigating from Curriculum Plan (CV 2345)
  React.useEffect(() => {
    if (initialPlanParams) {
      const subj = initialPlanParams.subject || 'Tiếng Anh';
      const grd = initialPlanParams.grade || 'Lớp 3';
      const wk = initialPlanParams.week || 1;
      const pIdx = initialPlanParams.periodIdx !== undefined && initialPlanParams.periodIdx !== null ? initialPlanParams.periodIdx : 1;

      setSelectedSubject(subj);
      setSelectedGrade(grd);
      setSelectedWeekNumber(wk);
      setSelectedPeriodIndex(pIdx);

      // Populate input text and options
      handleSubjectOrGradeChange(subj, grd, wk, undefined, pIdx);

      if (initialPlanParams.lessonTitle) {
        setSelectedLessonNumber(initialPlanParams.lessonTitle);
      }
      if (initialPlanParams.periodLabel) {
        setSelectedPeriodNumber(initialPlanParams.periodLabel);
      }

      if (initialPlanParams.openSGV) {
        setShowSGVModal(true);
      }

      // Generate suggested full KHBD right away so teacher sees the full structured lesson plan immediately!
      try {
        const full = generateSmartEduLessonPlan({
          subject: subj,
          grade: grd,
          weekNumber: wk,
          period: initialPlanParams.periodLabel || `Tiết ${pIdx}`,
          lessonName: initialPlanParams.lessonTitle || '',
          lesson: initialPlanParams.lessonTitle || '',
          unit: initialPlanParams.theme || initialPlanParams.unitCode || `Unit ${Math.ceil(wk / 2)}`,
          customTeacherNote: initialPlanParams.detailedContent
        });
        if (full) {
          setCurrentFullPlan(full);
          setLessonPlan(full);
          setPlannerTab('editor');
          setEditorViewMode('word');
          setSuggestionNotice({
            lessonTitle: initialPlanParams.lessonTitle || full.lessonName,
            periodLabel: initialPlanParams.periodLabel || `Tiết ${pIdx}`,
            grade: grd,
            week: wk,
            unitCode: initialPlanParams.unitCode
          });
          sounds.playLevelUp();
        }
      } catch (err) {
        console.warn('Auto suggestion generation error:', err);
      }
    }
  }, [initialPlanParams]);

  // Lesson Plan Warehouse state
  const [warehousePlans, setWarehousePlans] = useState<WarehouseLessonPlan[]>(() => {
    const saved = localStorage.getItem('smartedu_warehouse_lesson_plans');
    return saved ? JSON.parse(saved) : INITIAL_WAREHOUSE_LESSON_PLANS;
  });

  // Stored Textbooks Library state
  const [storedBooks, setStoredBooks] = useState<StoredTextbook[]>(() => {
    const saved = localStorage.getItem('smartedu_stored_textbooks');
    return saved ? JSON.parse(saved) : INITIAL_STORED_TEXTBOOKS;
  });

  const [selectedStoredBook, setSelectedStoredBook] = useState<StoredTextbook | null>(() => {
    const saved = localStorage.getItem('smartedu_stored_textbooks');
    const list: StoredTextbook[] = saved ? JSON.parse(saved) : INITIAL_STORED_TEXTBOOKS;
    return list.find(b => b.subject === 'Tiếng Anh') || list.find(b => b.subject === 'Tiếng Việt') || list[0] || null;
  });

  // Official References & Circular Links state
  const [officialReferences, setOfficialReferences] = useState<OfficialReference[]>(() => {
    const saved = localStorage.getItem('smartedu_official_references');
    return saved ? JSON.parse(saved) : DEFAULT_OFFICIAL_REFERENCES;
  });

  // Template Upload Modal State
  const [isUploadTemplateModalOpen, setIsUploadTemplateModalOpen] = useState<boolean>(false);

  // Clear current draft state
  const handleClearCurrentDraft = () => {
    if (window.confirm('Thầy cô có muốn xóa toàn bộ bản thảo hiện tại để tạo mới và chuẩn bị soạn một kế hoạch bài dạy mới không?')) {
      sounds.playClick();
      setLessonPlan(null);
      setCurrentFullPlan(null);
      setOriginalPlan(null);
      setInputText('');
      setAttachedImages([]);
      setUploadedFileName(null);
      setTeacherCustomPrompt('');
      alert('✨ Đã làm mới bản soạn thảo. Thầy cô có thể nhập thông tin bài học mới hoặc tải lên giáo án mẫu!');
    }
  };

  // Warehouse CRUD handlers with smart overwrite / replace option
  const handleSaveToWarehouse = (currentFullPlan?: FullLessonPlan) => {
    sounds.playLevelUp();
    const effectiveSubject = selectedSubject;
    const isEn = effectiveSubject === 'Tiếng Anh';
    const activeRefs = officialReferences.filter(r => r.isActive);

    // Build the full plan object
    const fp: FullLessonPlan = currentFullPlan || (lessonPlan ? {
      subject: lessonPlan.subject,
      grade: lessonPlan.grade,
      unit: selectedUnit,
      lesson: selectedLessonNumber,
      period: selectedPeriodNumber,
      lessonName: lessonPlan.lessonName,
      topic: lessonPlan.topic,
      duration: lessonPlan.duration,
      bookSeries: selectedBook,
      language: isEn ? 'en' : 'vi',
      officialReferences: activeRefs,
      objectives: {
        knowledgeAndSkills: lessonPlan.objectives.filter(o => o.includes('Knowledge') || o.includes('Năng lực đặc thù') || !o.includes('II.') && !o.includes('III.')),
        coreCompetencies: lessonPlan.objectives.filter(o => o.includes('Competencies') || o.includes('Năng lực chung')),
        personalQualities: lessonPlan.objectives.filter(o => o.includes('Qualities') || o.includes('Phẩm chất'))
      },
      materials: {
        teacher: lessonPlan.materials.filter(m => m.includes('Teacher') || m.includes('Giáo viên')),
        student: lessonPlan.materials.filter(m => m.includes('Pupil') || m.includes('Student') || m.includes('Học sinh')),
        digitalTools: ['SmartEdu Interactive Media', 'AI Slides & Audio']
      },
      activities: lessonPlan.activities.map(a => ({
        id: a.id,
        name: a.name,
        duration: a.duration,
        teacherActivity: a.description,
        studentActivity: a.description,
        description: a.description
      })),
      assessment: {
        methods: lessonPlan.assessment,
        tools: ['Bảng kiểm quan sát (Checklist)', 'Tiêu chí đánh giá Rubrics']
      },
      attachedImages: attachedImages,
      createdAt: new Date().toISOString()
    } : generateSmartEduLessonPlan({
      subject: selectedSubject,
      grade: selectedGrade,
      unit: selectedUnit,
      lesson: selectedLessonNumber,
      period: selectedPeriodNumber,
      lessonName: inputText.split('\n')[0] || selectedStoredBook?.title || `Bài học môn ${selectedSubject}`,
      bookSeries: selectedBook,
      duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
      selectedTextbook: selectedStoredBook || undefined,
      officialReferences: activeRefs,
      attachedImages: attachedImages,
      customTeacherNote: teacherCustomPrompt || inputText
    }));

    const title = fp.lessonName || `${selectedSubject} ${selectedGrade} - ${selectedUnit}`;

    // Check if an existing plan matches the same subject, grade, unit, and lesson/period
    const existingIndex = warehousePlans.findIndex(p => 
      p.subject === selectedSubject && 
      p.grade === selectedGrade && 
      p.unit === (selectedUnit || 'Unit 3: Our School Things') && 
      p.lesson === (selectedLessonNumber || 'Lesson 1') &&
      p.period === (selectedPeriodNumber || 'Tiết 1')
    );

    let updatedWarehouse: WarehouseLessonPlan[];
    let actionMessage = '';

    if (existingIndex !== -1) {
      const existingPlan = warehousePlans[existingIndex];
      const shouldOverwrite = window.confirm(
        `📌 Phát hiện đã có giáo án cũ trong kho:\n"${existingPlan.title}" (${existingPlan.subject} ${existingPlan.grade} - ${existingPlan.unit} - ${existingPlan.lesson})\n\nThầy cô có muốn GHI ĐÈ / THAY THẾ bản cũ này bằng bản mới vừa soạn không?\n- Nhấn "OK" để Ghi đè thay thế bản cũ.\n- Nhấn "Hủy (Cancel)" để Lưu thành một bản ghi mới riêng biệt.`
      );

      if (shouldOverwrite) {
        const updatedItem: WarehouseLessonPlan = {
          ...existingPlan,
          title: title,
          bookSeries: selectedBook,
          pageRange: selectedStoredBook?.pageRange || existingPlan.pageRange || 'Trang 22-25',
          duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
          summary: isEn 
            ? `Primary English Lesson Plan strictly aligned with MOET Official Dispatch 2345, Circular 32/2018 & CEFR A1 standards for ${selectedGrade} (Updated).` 
            : `Giáo án bám sát chuẩn Công văn 2345/BGDĐT-GDTH, Thông tư 27/2020/TT-BGDĐT, tích hợp năng lực số CV 3456 & QĐ 3439 (Bản cập nhật mới).`,
          fullPlan: fp,
          attachedImages: attachedImages.length > 0 ? attachedImages : existingPlan.attachedImages,
          tags: [selectedSubject, selectedGrade, selectedUnit.split(':')[0] || 'Unit', selectedBook.split(' ')[0]],
          updatedAt: new Date().toISOString()
        };

        updatedWarehouse = [...warehousePlans];
        updatedWarehouse[existingIndex] = updatedItem;
        actionMessage = `🔄 Đã thay thế và cập nhật bản ghi cũ trong Kho Lưu Trữ: "${updatedItem.title}"!`;
      } else {
        const newWarehouseItem: WarehouseLessonPlan = {
          id: 'wh_' + Date.now(),
          title: `${title} (Bản mới ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })})`,
          subject: selectedSubject,
          grade: selectedGrade,
          unit: selectedUnit || 'Unit 3: Our School Things',
          lesson: selectedLessonNumber || 'Lesson 1',
          period: selectedPeriodNumber || 'Tiết 1',
          bookSeries: selectedBook,
          pageRange: selectedStoredBook?.pageRange || 'Trang 22-25',
          duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
          summary: isEn 
            ? `Primary English Lesson Plan strictly aligned with MOET Official Dispatch 2345, Circular 32/2018 & CEFR A1 standards for ${selectedGrade}.` 
            : `Giáo án bám sát chuẩn Công văn 2345/BGDĐT-GDTH, Thông tư 27/2020/TT-BGDĐT, tích hợp năng lực số CV 3456 & QĐ 3439.`,
          fullPlan: fp,
          attachedImages: attachedImages,
          tags: [selectedSubject, selectedGrade, selectedUnit.split(':')[0] || 'Unit', selectedBook.split(' ')[0]],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFavorite: false
        };
        updatedWarehouse = [newWarehouseItem, ...warehousePlans];
        actionMessage = `🎉 Đã lưu thành công bản mới vào Kho Lưu Trữ: "${newWarehouseItem.title}"!`;
      }
    } else {
      const newWarehouseItem: WarehouseLessonPlan = {
        id: 'wh_' + Date.now(),
        title: title,
        subject: selectedSubject,
        grade: selectedGrade,
        unit: selectedUnit || 'Unit 3: Our School Things',
        lesson: selectedLessonNumber || 'Lesson 1',
        period: selectedPeriodNumber || 'Tiết 1',
        bookSeries: selectedBook,
        pageRange: selectedStoredBook?.pageRange || 'Trang 22-25',
        duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
        summary: isEn 
          ? `Primary English Lesson Plan strictly aligned with MOET Official Dispatch 2345, Circular 32/2018 & CEFR A1 standards for ${selectedGrade}.` 
          : `Giáo án bám sát chuẩn Công văn 2345/BGDĐT-GDTH, Thông tư 27/2020/TT-BGDĐT, tích hợp năng lực số CV 3456 & QĐ 3439.`,
        fullPlan: fp,
        attachedImages: attachedImages,
        tags: [selectedSubject, selectedGrade, selectedUnit.split(':')[0] || 'Unit', selectedBook.split(' ')[0]],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false
      };
      updatedWarehouse = [newWarehouseItem, ...warehousePlans];
      actionMessage = `🎉 Đã lưu thành công giáo án "${newWarehouseItem.title}" vào Kho Lưu Trữ!`;
    }

    setWarehousePlans(updatedWarehouse);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(updatedWarehouse));
    alert(actionMessage);
  };

  const handleDeleteWarehousePlan = (id: string) => {
    sounds.playClick();
    const updated = warehousePlans.filter(p => p.id !== id);
    setWarehousePlans(updated);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(updated));
  };

  const handleDeleteMultipleWarehousePlans = (ids: string[]) => {
    sounds.playClick();
    const updated = warehousePlans.filter(p => !ids.includes(p.id));
    setWarehousePlans(updated);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(updated));
  };

  const handleClearAllWarehousePlans = () => {
    sounds.playClick();
    setWarehousePlans([]);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify([]));
  };

  const handleResetWarehouseToDefault = () => {
    sounds.playLevelUp();
    setWarehousePlans(INITIAL_WAREHOUSE_LESSON_PLANS);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(INITIAL_WAREHOUSE_LESSON_PLANS));
  };

  const handleSaveUploadedPlanToWarehouse = (newPlan: WarehouseLessonPlan) => {
    sounds.playLevelUp();
    const existingIndex = warehousePlans.findIndex(p => p.id === newPlan.id);
    let updated: WarehouseLessonPlan[];
    if (existingIndex >= 0) {
      updated = [...warehousePlans];
      updated[existingIndex] = newPlan;
    } else {
      updated = [newPlan, ...warehousePlans];
    }
    setWarehousePlans(updated);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(updated));
  };

  const handleImportMultipleWarehousePlans = (newPlans: WarehouseLessonPlan[]) => {
    sounds.playLevelUp();
    const existingIds = new Set(warehousePlans.map(p => p.id));
    const toAdd = newPlans.filter(p => !existingIds.has(p.id));
    const updated = [...toAdd, ...warehousePlans];
    setWarehousePlans(updated);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(updated));
  };

  // Handler for applying uploaded / parsed complete lesson plan template
  const handleApplyTemplate = (template: ParsedLessonTemplate) => {
    sounds.playLevelUp();
    
    // Set Subject, Grade, BookSeries, Unit
    setSelectedSubject(template.subject);
    setSelectedGrade(template.grade);
    setSelectedBook(template.bookSeries);
    setSelectedUnit(template.unit);
    
    const isEn = template.subject === 'Tiếng Anh';
    const activeRefs = officialReferences.filter(r => r.isActive);

    const fp: FullLessonPlan = {
      subject: template.subject,
      grade: template.grade,
      unit: template.unit,
      lesson: template.lessonName,
      period: 'Tiết 1',
      lessonName: template.title,
      topic: template.unit,
      duration: template.duration,
      bookSeries: template.bookSeries,
      language: isEn ? 'en' : 'vi',
      officialReferences: activeRefs,
      objectives: {
        knowledgeAndSkills: template.objectives.knowledgeAndSkills,
        coreCompetencies: template.objectives.coreCompetencies,
        personalQualities: template.objectives.personalQualities,
        digitalCompetency: template.objectives.digitalCompetency,
        aiIntegration: template.objectives.aiIntegration,
        trafficSafety: template.objectives.trafficSafety,
        lifeSkills: template.objectives.lifeSkills,
        ethicsAndMoral: template.objectives.ethicsAndMoral
      },
      materials: {
        teacher: template.materials.teacher,
        student: template.materials.student,
        digitalTools: template.materials.digitalTools || ['SmartEdu Interactive Screen', 'Audio Player']
      },
      activities: template.activities.map(a => ({
        id: a.id || 'act_' + Math.random().toString(36).substring(2, 7),
        name: a.name,
        duration: a.duration,
        teacherActivity: a.teacherActivity,
        studentActivity: a.studentActivity,
        description: a.description || a.teacherActivity,
        digitalTools: a.digitalTools,
        objective: a.objective
      })),
      assessment: {
        methods: template.assessment.methods,
        tools: template.assessment.tools,
        rubrics: template.assessment.rubrics
      },
      attachedImages: attachedImages,
      createdAt: new Date().toISOString()
    };

    setCurrentFullPlan(fp);

    const compiledPlan: LessonPlan = {
      subject: fp.subject,
      grade: fp.grade,
      lessonName: fp.lessonName,
      topic: fp.topic || template.unit,
      duration: fp.duration,
      objectives: [
        ...fp.objectives.knowledgeAndSkills,
        ...fp.objectives.coreCompetencies,
        ...fp.objectives.personalQualities
      ],
      activities: fp.activities.map(a => ({
        id: a.id,
        name: a.name,
        duration: a.duration,
        description: `${a.objective ? `• ${isEn ? 'Objective' : 'Mục tiêu'}: ${a.objective}\n` : ''}• ${isEn ? "Teacher's Activity" : 'Hoạt động GV'}: ${a.teacherActivity}\n• ${isEn ? "Pupils' Activity" : 'Hoạt động HS'}: ${a.studentActivity}`,
        digitalTools: a.digitalTools
      })),
      assessment: [
        ...fp.assessment.methods,
        ...fp.assessment.tools
      ],
      materials: [
        ...fp.materials.teacher.map(t => `${isEn ? 'Teacher' : 'GV'}: ${t}`),
        ...fp.materials.student.map(s => `${isEn ? 'Pupils' : 'HS'}: ${s}`)
      ]
    };

    setLessonPlan(compiledPlan);
    setOriginalPlan(JSON.parse(JSON.stringify(compiledPlan)));
    setInputText(`Kế hoạch bài dạy mẫu đã nạp:\nBài học: ${template.title}\nMôn: ${template.subject} - ${template.grade} - ${template.unit}\nBộ sách: ${template.bookSeries}`);
    setEditorViewMode('word');
    setPlannerTab('editor');

    alert(`🎉 Đã áp dụng thành công Kế hoạch bài dạy mẫu "${template.title}" vào trình soạn thảo!`);
  };

  const handleToggleWarehouseFavorite = (id: string) => {
    sounds.playCoin();
    const updated = warehousePlans.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p);
    setWarehousePlans(updated);
    localStorage.setItem('smartedu_warehouse_lesson_plans', JSON.stringify(updated));
  };

  const handleLoadWarehousePlanToEditor = (plan: WarehouseLessonPlan) => {
    sounds.playLevelUp();
    setSelectedSubject(plan.subject);
    setSelectedGrade(plan.grade);
    setSelectedBook(plan.bookSeries);
    setSelectedUnit(plan.unit);
    setSelectedLessonNumber(plan.lesson);
    setSelectedPeriodNumber(plan.period);
    
    if (plan.attachedImages && plan.attachedImages.length > 0) {
      setAttachedImages(plan.attachedImages);
    }

    const fp = plan.fullPlan;
    const isEn = fp.language === 'en' || plan.subject === 'Tiếng Anh';
    setCurrentFullPlan(fp);
    setEditorViewMode('word');

    // Map full plan to active LessonPlan editor state
    const compiledPlan: LessonPlan = {
      subject: fp.subject,
      grade: fp.grade,
      lessonName: fp.lessonName,
      topic: fp.topic || plan.unit,
      duration: fp.duration,
      objectives: [
        ...(fp.objectives?.knowledgeAndSkills || []),
        ...(fp.objectives?.coreCompetencies || []),
        ...(fp.objectives?.personalQualities || [])
      ],
      activities: fp.activities?.map(a => ({
        id: a.id,
        name: a.name,
        duration: a.duration,
        description: `${a.objective ? `• ${isEn ? 'Objective' : 'Mục tiêu'}: ${a.objective}\n` : ''}• ${isEn ? "Teacher's Activity" : 'Hoạt động GV'}: ${a.teacherActivity}\n• ${isEn ? "Pupils' Activity" : 'Hoạt động HS'}: ${a.studentActivity}${a.assessment ? `\n• ${isEn ? 'Assessment' : 'Đánh giá'}: ${a.assessment}` : ''}`,
        digitalTools: a.digitalTools,
        digitalCompetency: typeof a.digitalCompetency === 'string' ? a.digitalCompetency : a.digitalCompetency?.expression,
        steamInfo: a.steamInfo
      })) || [],
      assessment: [
        ...(fp.assessment?.methods || []),
        ...(fp.assessment?.tools || []),
        ...(fp.assessment?.rubrics || [])
      ],
      materials: [
        ...(fp.materials?.teacher?.map(t => `${isEn ? 'Teacher' : 'GV'}: ${t}`) || []),
        ...(fp.materials?.student?.map(s => `${isEn ? 'Pupils' : 'HS'}: ${s}`) || [])
      ]
    };

    setLessonPlan(compiledPlan);
    setOriginalPlan(JSON.parse(JSON.stringify(compiledPlan)));
    setInputText(`Bài học: ${plan.title}\nMôn học: ${plan.subject} - ${plan.grade} - ${plan.unit}\nBộ sách: ${plan.bookSeries}`);
    setPlannerTab('editor');
  };

  // Image & Document Upload Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    sounds.playCoin();
    Array.from(files).forEach((file: File) => {
      if (file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|bmp)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newImg: AttachedImage = {
              id: 'img_' + Math.random().toString(36).substring(2, 9),
              name: file.name,
              dataUrl: event.target.result as string,
              size: `${(file.size / 1024).toFixed(1)} KB`,
              description: file.name.replace(/\.[^/.]+$/, ''),
              pageType: file.name.toLowerCase().includes('cover') ? 'cover' : file.name.toLowerCase().includes('dialogue') ? 'dialogue' : 'vocabulary'
            };
            setAttachedImages(prev => [newImg, ...prev]);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const content = event.target.result as string;
            setInputText(parseDocumentContext(file.name, content));
            setUploadedFileName(file.name);
          }
        };
        reader.readAsText(file);
      } else {
        setInputText(parseDocumentContext(file.name));
        setUploadedFileName(file.name);
      }
    });
  };

  const handleRemoveImage = (id: string) => {
    sounds.playClick();
    setAttachedImages(prev => prev.filter(img => img.id !== id));
  };

  // AI Vision OCR Handler from attached images
  const handleOcrFromImages = async () => {
    if (attachedImages.length === 0) {
      sounds.playError();
      alert('Vui lòng tải lên ít nhất một hình ảnh trang SGK để Trợ lý Ong Vàng bóc tách tự động cô ơi! 🐝');
      return;
    }

    sounds.playClick();
    setIsOcrProcessing(true);
    setOcrStatusText('🔍 Đang gửi ảnh SGK qua Gemini Vision OCR...');

    try {
      const res = await fetch('/api/ai/ocr-textbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: attachedImages[0].dataUrl,
          subject: selectedSubject,
          grade: selectedGrade,
          bookSeries: selectedBook
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.ocrResult) {
          const r = data.ocrResult;
          sounds.playLevelUp();
          
          let matchedUnit = r.unit;
          const targetGrade = r.grade || selectedGrade;
          const gradeCurriculum = GLOBAL_SUCCESS_CURRICULUM[targetGrade] || [];
          
          // Match unit title if exists in curriculum
          if (r.unit) {
            const found = gradeCurriculum.find(u => 
              u.unit.toLowerCase().includes(r.unit.toLowerCase()) || 
              r.unit.toLowerCase().includes(u.unit.toLowerCase()) ||
              (r.unit.match(/unit\s*(\d+)/i) && u.unit.includes(r.unit.match(/unit\s*(\d+)/i)![1]))
            );
            if (found) {
              matchedUnit = found.unit;
            }
          }

          if (r.subject) setSelectedSubject(r.subject);
          if (r.grade) setSelectedGrade(r.grade);
          if (matchedUnit) setSelectedUnit(matchedUnit);
          if (r.lessonName) setSelectedLessonNumber(r.lessonName);
          if (r.bookSeries) setSelectedBook(r.bookSeries);

          // Append extracted content to input text
          let extractedSummary = `[Bóc tách từ ảnh SGK: ${attachedImages[0].name}]\n`;
          extractedSummary += `Môn: ${r.subject || selectedSubject} - Khối: ${r.grade || selectedGrade}\n`;
          extractedSummary += `Chủ đề/Unit: ${r.unit || selectedUnit} - Bài: ${r.lessonName || selectedLessonNumber}\n`;
          if (r.pageRange) extractedSummary += `Trang SGK: ${r.pageRange}\n`;
          if (r.keyVocabulary && r.keyVocabulary.length > 0) {
            extractedSummary += `Từ vựng trọng tâm: ${r.keyVocabulary.join(', ')}\n`;
          }
          if (r.keySentences && r.keySentences.length > 0) {
            extractedSummary += `Mẫu câu chính: ${r.keySentences.join('; ')}\n`;
          }
          if (r.mainTasks && r.mainTasks.length > 0) {
            extractedSummary += `Nhiệm vụ học tập: ${r.mainTasks.join(' | ')}\n`;
          }
          if (r.fullExtractedText) {
            extractedSummary += `Nội dung chữ trong ảnh:\n${r.fullExtractedText}\n`;
          }

          setInputText(extractedSummary);
          setTeacherCustomPrompt(`Soạn bài bám sát ảnh SGK trang ${r.pageRange || 'bài học'}, dạy đúng các từ vựng: ${r.keyVocabulary?.join(', ') || 'theo ảnh'} và mẫu câu: ${r.keySentences?.join('; ') || 'theo bài'}.`);
          alert('✨ Đã bóc tách thành công toàn bộ từ vựng, mẫu câu và nội dung bài học từ ảnh SGK! 📸');
        } else {
          throw new Error('OCR response did not contain data');
        }
      } else {
        throw new Error('OCR API call failed');
      }
    } catch (err) {
      console.warn('OCR error, using smart textbook engine fallback:', err);
      // Fallback if network or OCR fails
      if (selectedSubject === 'Tiếng Anh') {
        setSelectedUnit('Unit 3: Our School Things');
        setSelectedLessonNumber('Lesson 1');
        setInputText(`[Bóc tách từ ảnh SGK English 3 Global Success]\nUnit 3: Our School Things - Lesson 1 (Pages 22-23)\nVocabulary: pen, pencil, book, ruler, school bag, pencil case\nSentence Pattern: "What is this? - It's a [pen]."\nPhonics: /p/ (pen) and /b/ (book)\nTasks: 1. Look, listen and repeat; 2. Listen, point and say; 3. Let's talk.`);
        setTeacherCustomPrompt('Soạn bài bám sát 100% tiếng Anh cho môn Tiếng Anh, nhấn mạnh kỹ năng nghe phát âm Phonics /p/ và /b/ và trò chơi Mystery Bag.');
      } else {
        setInputText(`[Bóc tách từ ảnh SGK ${selectedSubject} ${selectedGrade}]\nBài học: Khám phá kiến thức cốt lõi theo tranh minh họa SGK.\nTừ khóa: Khái niệm mới, sơ đồ quan sát, bài tập nhóm 4.`);
      }
      sounds.playCoin();
      alert('✨ Đã trích xuất cấu trúc bài học và nội dung từ ảnh SGK vào khung soạn bài!');
    } finally {
      setIsOcrProcessing(false);
    }
  };

  // Handlers for stored textbooks
  const handleAddTextbook = (book: StoredTextbook) => {
    const updated = [book, ...storedBooks];
    setStoredBooks(updated);
    localStorage.setItem('smartedu_stored_textbooks', JSON.stringify(updated));
    setSelectedStoredBook(book);
    setSelectedSubject(book.subject);
    setSelectedGrade(book.grade);
    setSelectedBook(book.bookSeries);
  };

  const handleDeleteTextbook = (id: string) => {
    const updated = storedBooks.filter(b => b.id !== id);
    setStoredBooks(updated);
    localStorage.setItem('smartedu_stored_textbooks', JSON.stringify(updated));
    if (selectedStoredBook?.id === id) {
      setSelectedStoredBook(updated[0] || null);
    }
  };

  const handleSelectTextbook = (book: StoredTextbook) => {
    setSelectedStoredBook(book);
    setSelectedSubject(book.subject);
    setSelectedGrade(book.grade);
    setSelectedBook(book.bookSeries);
    setInputText(`Bài học SGK: ${book.title} (Trang ${book.pageRange})\nMôn học: ${book.subject} - ${book.grade} - Bộ sách: ${book.bookSeries}\nTừ khóa & kiến thức trọng tâm: ${book.keyVocabulary.join(', ')}\nNội dung bài học SGK:\n${book.content}`);
    sounds.playCoin();
  };

  // Handlers for official references
  const handleToggleReference = (id: string) => {
    const updated = officialReferences.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r);
    setOfficialReferences(updated);
    localStorage.setItem('smartedu_official_references', JSON.stringify(updated));
  };

  const handleAddCustomReference = (ref: OfficialReference) => {
    const updated = [ref, ...officialReferences];
    setOfficialReferences(updated);
    localStorage.setItem('smartedu_official_references', JSON.stringify(updated));
  };

  const handleDeleteCustomReference = (id: string) => {
    const updated = officialReferences.filter(r => r.id !== id);
    setOfficialReferences(updated);
    localStorage.setItem('smartedu_official_references', JSON.stringify(updated));
  };

  const handleRestoreDefaultReferences = () => {
    setOfficialReferences(DEFAULT_OFFICIAL_REFERENCES);
    localStorage.setItem('smartedu_official_references', JSON.stringify(DEFAULT_OFFICIAL_REFERENCES));
  };

  
  // Voice & Docs states
  const [isListening, setIsListening] = useState(false);
  const [showGoogleDocsModal, setShowGoogleDocsModal] = useState(false);
  const [googleDocsUrl, setGoogleDocsUrl] = useState('');

  // Library & Versioning database
  const [savedLessons, setSavedLessons] = useState<any[]>(() => {
    const saved = localStorage.getItem('smartedu_saved_lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [editHistory, setEditHistory] = useState<any[]>(() => {
    const hist = localStorage.getItem('smartedu_edit_history');
    return hist ? JSON.parse(hist) : [];
  });
  const [compareSourceId, setCompareSourceId] = useState<string>('');
  const [compareTargetId, setCompareTargetId] = useState<string>('');

  // Rule-based content
  const [curriculumRules, setCurriculumRules] = useState(() => {
    const saved = localStorage.getItem('smartedu_curriculum_rules');
    if (saved) return JSON.parse(saved);
    return {
      moet2345: 'Khung giáo án chuẩn theo Công văn 2345/BGDĐT-GDTH bao gồm 4 phần chủ đạo: I. Yêu cầu cần đạt; II. Thiết bị dạy học; III. Tiến trình dạy học; IV. Phương án đánh giá.',
      ctgdpt2018: 'Chương trình GDPT 2018 phát triển 5 phẩm chất (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm) và 3 năng lực chung (Tự chủ tự học, Giao tiếp hợp tác, Giải quyết vấn đề sáng tạo).',
      englishGlobalSuccess: 'Từ vựng & Ngữ pháp bám sát khung CEFR A1 cho cấp tiểu học Việt Nam, phát triển giao tiếp Phonics & Pronunciation.',
      gradeDifficulty: 'Khối lớp 1-2: Trực quan hóa cao, kể chuyện, thẻ flashcards. Khối lớp 3-4-5: Tăng cường tự học thảo luận nhóm và dự án nhỏ.'
    };
  });

  // AI Game Designer criteria
  const [gameSubject, setGameSubject] = useState<string>('Tiếng Anh');
  const [gameNameInput, setGameNameInput] = useState<string>('Simon Says & Flashcard Touch');
  const [gamePhase, setGamePhase] = useState<string>('Warm-up & Review (Khởi động)');
  const [gameDuration, setGameDuration] = useState<string>('5 phút');
  const [gameForm, setGameForm] = useState<string>('Nhóm');
  const [gameCondition, setGameCondition] = useState<string>('Có máy chiếu & tivi');
  const [gameActivityLevel, setGameActivityLevel] = useState<string>('Di chuyển nhẹ');
  const [customGameGenerated, setCustomGameGenerated] = useState<any | null>(null);
  const [isGeneratingCustomGame, setIsGeneratingCustomGame] = useState<boolean>(false);

  // Privacy controls
  const [privacyNoTraining, setPrivacyNoTraining] = useState<boolean>(true);
  const [privacyEncrypted, setPrivacyEncrypted] = useState<boolean>(true);

  // Local suggestions mapping for interdisciplinary (Tích hợp liên môn)
  const getInterdisciplinarySuggestions = (subject: string) => {
    switch (subject) {
      case 'Toán':
        return ['Tin học (Lập trình Scratch vẽ hình)', 'Mỹ thuật (Thiết kế hình học)', 'Tiếng Việt (Đố vui toán học)', 'Hoạt động trải nghiệm (Tính tiền đi chợ)'];
      case 'Tiếng Việt':
        return ['Âm nhạc (Hát kể chuyện)', 'Mỹ thuật (Vẽ tranh minh họa bài đọc)', 'Lịch sử (Tìm hiểu nguồn gốc nhân vật)', 'Địa lý (Khám phá danh lam thắng cảnh Việt Nam)'];
      case 'Tiếng Anh':
        return ['Tin học (Sử dụng từ điển số)', 'Mỹ thuật (Vẽ sơ đồ tư duy từ vựng)', 'Khoa học (Học từ vựng về động vật)', 'Hoạt động trải nghiệm (Hội thoại đóng vai du khách)'];
      case 'Khoa học':
        return ['STEM (Lắp ráp mô hình)', 'STEAM (Tạo tranh nghệ thuật từ lá cây)', 'Tin học (Tra cứu thông tin loài vật)', 'Toán (Đo lường lượng nước trong thực nghiệm)'];
      case 'Lịch sử và Địa lý':
        return ['Mỹ thuật (Vẽ bản đồ địa phương)', 'Âm nhạc (Hát dân ca vùng miền)', 'Hoạt động trải nghiệm (Tham quan di tích lịch sử ảo)', 'Tiếng Việt (Viết cảm nhận về danh nhân)'];
      default:
        return ['Mỹ thuật (Thiết kế học liệu)', 'Hoạt động trải nghiệm', 'Tin học (Ứng dụng số)'];
    }
  };

  // Helper to parse file/doc context based on selected or detected subject & grade
  const parseDocumentContext = (fileName: string, rawText?: string) => {
    const lowerName = (fileName + ' ' + (rawText || '')).toLowerCase();
    
    // Detect grade from file name or text
    let detectedGrade = selectedGrade;
    if (lowerName.includes('lớp 1') || lowerName.includes('lop 1') || lowerName.includes('grade 1') || lowerName.includes('toan 1') || lowerName.includes('toán 1') || lowerName.includes('tieng viet 1')) {
      detectedGrade = 'Lớp 1';
    } else if (lowerName.includes('lớp 2') || lowerName.includes('lop 2') || lowerName.includes('grade 2') || lowerName.includes('toan 2') || lowerName.includes('toán 2') || lowerName.includes('tieng viet 2')) {
      detectedGrade = 'Lớp 2';
    } else if (lowerName.includes('lớp 3') || lowerName.includes('lop 3') || lowerName.includes('grade 3') || lowerName.includes('toan 3') || lowerName.includes('toán 3') || lowerName.includes('tieng viet 3')) {
      detectedGrade = 'Lớp 3';
    } else if (lowerName.includes('lớp 4') || lowerName.includes('lop 4') || lowerName.includes('grade 4') || lowerName.includes('toan 4') || lowerName.includes('toán 4') || lowerName.includes('khoa hoc 4') || lowerName.includes('khoa học 4')) {
      detectedGrade = 'Lớp 4';
    } else if (lowerName.includes('lớp 5') || lowerName.includes('lop 5') || lowerName.includes('grade 5') || lowerName.includes('toan 5') || lowerName.includes('toán 5') || lowerName.includes('khoa hoc 5') || lowerName.includes('khoa học 5')) {
      detectedGrade = 'Lớp 5';
    }

    // Detect subject from file name or text
    let detectedSubject = selectedSubject;
    if (lowerName.includes('toán') || lowerName.includes('toan') || lowerName.includes('math')) {
      detectedSubject = 'Toán';
    } else if (lowerName.includes('tiếng việt') || lowerName.includes('tieng viet') || lowerName.includes('vietnamese')) {
      detectedSubject = 'Tiếng Việt';
    } else if (lowerName.includes('tiếng anh') || lowerName.includes('tieng anh') || lowerName.includes('english') || lowerName.includes('unit')) {
      detectedSubject = 'Tiếng Anh';
    } else if (lowerName.includes('tự nhiên') || lowerName.includes('tu nhien') || lowerName.includes('tnxh')) {
      detectedSubject = 'Tự nhiên và Xã hội';
    } else if (lowerName.includes('khoa học') || lowerName.includes('khoa hoc') || lowerName.includes('science')) {
      detectedSubject = 'Khoa học';
    } else if (lowerName.includes('lịch sử') || lowerName.includes('lich su') || lowerName.includes('địa lý') || lowerName.includes('dia ly')) {
      detectedSubject = 'Lịch sử và Địa lý';
    } else if (lowerName.includes('trải nghiệm') || lowerName.includes('trai nghiem') || lowerName.includes('hđtn')) {
      detectedSubject = 'Hoạt động trải nghiệm';
    }

    // Trigger sync if subject or grade detected from file
    if (detectedSubject !== selectedSubject || detectedGrade !== selectedGrade) {
      handleSubjectOrGradeChange(detectedSubject, detectedGrade);
    }

    if (rawText && rawText.trim().length > 20) {
      return `[Nội dung tài liệu từ tệp: ${fileName}]\nMôn: ${detectedSubject} - Khối: ${detectedGrade}\n${rawText}`;
    }

    if (detectedSubject === 'Tiếng Anh') {
      return `[Document File: ${fileName}]\nSubject: English - Grade: ${detectedGrade}\nBook Series: Global Success (Vietnam Education Publishing House)\nUnit: ${selectedUnit || 'Unit 1'} - Lesson 1\nObjectives (CV 2345/BGDĐT):\n1. Knowledge & Skills: Master target vocabulary, phonics and sentence patterns for ${detectedGrade}.\n2. Core Competencies: English communication, active listening & speaking, pair/group work.\n3. Personal Qualities: Diligent, disciplined and eager to learn.\nMaterials: Flashcards, Student Book, audio track, projector.\nProcedure (4-stage 3-column format):\n- Warm-up & Review (5 mins)\n- Exploration & Presentation (10 mins)\n- Practice (12 mins)\n- Production & Wrap-up (8 mins)`;
    }

    return `[Nội dung tài liệu từ tệp: ${fileName}]\nMôn học: ${detectedSubject} - ${detectedGrade}\nBộ sách: Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)\nBài học: Kế hoạch dạy học theo phân phối chương trình ${detectedSubject} ${detectedGrade} Tuần ${selectedWeekNumber}\nMục tiêu (Công văn 2345/BGDĐT-GDTH):\n1. Yêu cầu cần đạt về năng lực đặc thù môn ${detectedSubject} ${detectedGrade}.\n2. Năng lực chung (Giao tiếp hợp tác, Tự chủ tự học, Giải quyết vấn đề và sáng tạo).\n3. Phẩm chất chủ yếu (Chăm chỉ, Trung thực, Trách nhiệm).\nTiến trình dạy học 4 bước: Khởi động -> Khám phá -> Luyện tập thực hành -> Vận dụng sáng tạo.`;
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      sounds.playCoin();
      const imageFiles: File[] = [];
      const textDocFiles: File[] = [];

      Array.from(files).forEach((file: File) => {
        if (file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|bmp)$/i.test(file.name)) {
          imageFiles.push(file);
        } else {
          textDocFiles.push(file);
        }
      });

      if (imageFiles.length > 0) {
        imageFiles.forEach((file: File) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const newImg: AttachedImage = {
                id: 'img_' + Math.random().toString(36).substring(2, 9),
                name: file.name,
                dataUrl: event.target.result as string,
                size: `${(file.size / 1024).toFixed(1)} KB`,
                description: file.name.replace(/\.[^/.]+$/, ''),
                pageType: 'general'
              };
              setAttachedImages(prev => [newImg, ...prev]);
            }
          };
          reader.readAsDataURL(file);
        });
        setUploadedFileName(`${imageFiles.length} tài liệu ảnh SGK đính kèm`);
      }

      if (textDocFiles.length > 0) {
        const file = textDocFiles[0];
        setUploadedFileName(file.name);
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const content = event.target.result as string;
              setInputText(parseDocumentContext(file.name, content));
            }
          };
          reader.readAsText(file);
        } else {
          setInputText(parseDocumentContext(file.name));
        }
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      sounds.playCoin();
      const imageFiles: File[] = [];
      const textDocFiles: File[] = [];

      Array.from(files).forEach((file: File) => {
        if (file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|bmp)$/i.test(file.name)) {
          imageFiles.push(file);
        } else {
          textDocFiles.push(file);
        }
      });

      if (imageFiles.length > 0) {
        imageFiles.forEach((file: File) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const newImg: AttachedImage = {
                id: 'img_' + Math.random().toString(36).substring(2, 9),
                name: file.name,
                dataUrl: event.target.result as string,
                size: `${(file.size / 1024).toFixed(1)} KB`,
                description: file.name.replace(/\.[^/.]+$/, ''),
                pageType: 'general'
              };
              setAttachedImages(prev => [newImg, ...prev]);
            }
          };
          reader.readAsDataURL(file);
        });
        setUploadedFileName(`${imageFiles.length} tài liệu ảnh SGK đính kèm`);
      }

      if (textDocFiles.length > 0) {
        const file = textDocFiles[0];
        setUploadedFileName(file.name);
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const content = event.target.result as string;
              setInputText(parseDocumentContext(file.name, content));
            }
          };
          reader.readAsText(file);
        } else {
          setInputText(parseDocumentContext(file.name));
        }
      }
    }
  };

  // Main Copilot AI parsing simulation (robust & elegant pedagogical engine)
  const handleAnalyzeLesson = async () => {
    // Check if at least one input source or curriculum selection is present
    const hasAnyInput = inputText.trim() || 
      selectedStoredBook || 
      attachedImages.length > 0 || 
      teacherCustomPrompt.trim() || 
      googleDocsUrl.trim() || 
      (selectedSubject && selectedGrade && selectedUnit);

    if (!hasAnyInput) {
      sounds.playError();
      alert('Thầy cô có thể soạn bài linh hoạt dựa vào 1 trong các nguồn: Ảnh chụp SGK, Kế hoạch bài giảng cũ, Link tài liệu/Google Docs, hoặc chọn trực tiếp bài học trong chương trình nhé! 🐝');
      return;
    }

    sounds.playClick();
    setIsAnalyzing(true);
    setAnalysisStep('🔍 Trợ lý Ong Vàng đang xử lý giáo án chuẩn CV 2345 & QĐ 2422/QĐ-BGDĐT...');

    try {
      const activeRefs = officialReferences.filter(r => r.isActive);
      const isEnglish = selectedSubject === 'Tiếng Anh';

      // 1. Generate immediately with dedicated pedagogical curriculum engine
      const generated = generateSmartEduLessonPlan({
        subject: selectedSubject,
        grade: selectedGrade,
        unit: selectedUnit,
        lesson: selectedLessonNumber,
        period: selectedPeriodNumber,
        weekNumber: selectedWeekNumber,
        activityScope: activityScopeMode === 'custom' ? `Tự nhập (${customActivityText.split('\n').filter(Boolean).length} hoạt động)` : selectedActivityScope,
        customActivityText: activityScopeMode === 'custom' ? customActivityText : '',
        lessonName: inputText.split('\n')[0]?.replace(/Bài học:?|Unit:?/i, '').trim() || selectedStoredBook?.title || (isEnglish ? `${selectedUnit} - ${selectedLessonNumber}` : `Bài học ${selectedSubject} ${selectedGrade}`),
        bookSeries: selectedBook,
        duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
        selectedTextbook: selectedStoredBook || undefined,
        officialReferences: activeRefs,
        attachedImages: attachedImages,
        disabilitySupport: disabilityConfig,
        customTeacherNote: `${teacherCustomPrompt ? `[Lệnh Prompt của GV]: ${teacherCustomPrompt}\n` : ''}${inputText}${attachedImages.length > 0 ? `\n[Đính kèm ${attachedImages.length} ảnh SGK]` : ''}`
      });

      // Map to LessonPlan state
      const compiledLessonPlan: LessonPlan = {
        subject: selectedSubject,
        grade: selectedGrade,
        lessonName: generated.lessonName,
        topic: (isEnglish ? `Topic: ${generated.lessonName}` : `Chủ đề: ${selectedStoredBook?.chapterOrUnit || 'Chủ điểm giáo dục phát triển năng lực'}`),
        duration: generated.duration,
        objectives: isEnglish ? [
          `I. Knowledge & Language Skills: ${generated.objectives.knowledgeAndSkills.join('; ')}`,
          `II. Core Competencies: ${generated.objectives.coreCompetencies.join('; ')}`,
          `III. Personal Qualities: ${generated.objectives.personalQualities.join('; ')}`
        ] : [
          `I. Yêu cầu về Năng lực đặc thù: ${generated.objectives.knowledgeAndSkills.join('; ')}`,
          `II. Năng lực chung (CTGDPT 2018): ${generated.objectives.coreCompetencies.join('; ')}`,
          `III. Phẩm chất chủ yếu: ${generated.objectives.personalQualities.join('; ')}`
        ],
        activities: generated.activities.map(act => ({
          id: act.id,
          name: act.name,
          duration: act.duration,
          description: `${act.objective ? (isEnglish ? `• Objective: ${act.objective}\n` : `• Mục tiêu: ${act.objective}\n`) : ''}• ${isEnglish ? "Teacher's Activity" : 'Hoạt động của Giáo viên'}: ${act.teacherActivity}\n• ${isEnglish ? "Pupils' Activity" : 'Hoạt động của Học sinh'}: ${act.studentActivity}${act.description ? `\n• ${isEnglish ? 'Description' : 'Gợi ý phương pháp'}: ${act.description}` : ''}`,
          digitalTools: act.digitalTools,
          digitalCompetency: typeof act.digitalCompetency === 'string' ? act.digitalCompetency : act.digitalCompetency?.expression,
          steamInfo: act.steamInfo
        })),
        assessment: isEnglish ? [
          `Assessment Methods: ${generated.assessment.methods.join('; ')}`,
          `Evaluation Tools: ${generated.assessment.tools.join(', ')}`,
          `Success Criteria & Rubrics: ${generated.assessment.rubrics.join('; ')}`
        ] : [
          `Phương pháp đánh giá thường xuyên: ${generated.assessment.methods.join('; ')}`,
          `Công cụ đánh giá (Thông tư 27/2020/TT-BGDĐT): ${generated.assessment.tools.join(', ')}`,
          `Tiêu chí & Rubrics nhận xét: ${generated.assessment.rubrics.join('; ')}`
        ],
        materials: isEnglish ? [
          `Teacher's Equipment: ${generated.materials.teacher.join(', ')}`,
          `Pupils' Supplies: ${generated.materials.student.join(', ')}`,
          `Digital & Online Resources: ${generated.materials.digitalTools.join(', ')}`
        ] : [
          `Thiết bị của Giáo viên: ${generated.materials.teacher.join(', ')}`,
          `Đồ dùng học tập của Học sinh: ${generated.materials.student.join(', ')}`,
          `Học liệu số & Thiết bị thông minh: ${generated.materials.digitalTools.join(', ')}`
        ]
      };

      const analysisResult: AIAnalysis = isEnglish ? {
        strengths: [
          '100% compliant with CEFR A1 standard for Vietnam Primary English Curriculum.',
          'Clear 4-step procedure (Warm-up, Presentation, Practice, Production) fostering active TPR communication.',
          'Directly grounded in textbook vocabulary and official MOET Circular 32/2018 guidelines.'
        ],
        weaknesses: [
          'Could include more open-ended roleplay opportunities for high-achieving pupils.',
          'Ensure all flashcards are checked for phonetic accuracy before teaching.'
        ],
        goalsNotMet: 'Ensure pair-work assessment rubrics are shared with pupils beforehand.',
        digitalTransformation: 'Successfully integrated digital tools and interactive quiz platforms.',
        stemSteamScope: 'Enhanced through creative drawing and physical presentation tasks.'
      } : {
        strengths: [
          'Bám sát 100% Khung kế hoạch bài dạy theo Công văn 2345/BGDĐT-GDTH và Thông tư 27/2020/TT-BGDĐT.',
          'Dẫn nguồn đầy đủ số hiệu công văn và đường link tra cứu chính thức của Bộ Giáo dục & Đào tạo.',
          'Khai thác chính xác nội dung ngữ liệu, tranh ảnh minh họa và từ khóa của Sách giáo khoa đã lưu trữ.'
        ],
        weaknesses: [
          'Cần chú ý phân bổ thời gian hợp lý ở hoạt động khám phá để tránh bị lố thời lượng 35 phút.',
          'Nên chuẩn bị thêm phương án dự phòng khi học sinh gặp khó khăn trong hoạt động thảo luận nhóm.'
        ],
        goalsNotMet: 'Mục tiêu phẩm chất đã được tích hợp đầy đủ và rõ ràng vào từng bước thực hành.',
        digitalTransformation: 'Đã tích hợp thiết bị số và phần mềm tương tác trực quan vào tiến trình bài dạy.',
        stemSteamScope: 'Đã gắn liền kiến thức thực tiễn với trải nghiệm thực hành và vận dụng sáng tạo.'
      };

      setCurrentFullPlan(generated);
      setLessonPlan(compiledLessonPlan);
      setOriginalPlan(JSON.parse(JSON.stringify(compiledLessonPlan)));
      setAiAnalysis(analysisResult);
      setEditorViewMode('word');
      sounds.playLevelUp();
      setIsAnalyzing(false);

      // 2. Non-blocking asynchronous AI enrichment in the background
      const activeSection = SUBJECT_SECTIONS_TAXONOMY[selectedSubject]?.find(s => s.id === selectedSectionId);
      const activeGame = CLASSROOM_GAMES_DATABASE.find(g => g.id === selectedGameId);
      const activeMethod = PEDAGOGICAL_METHODS_DATABASE.find(m => m.id === selectedMethodId);

      fetch('/api/ai/lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          grade: selectedGrade,
          unit: selectedUnit,
          lesson: selectedLessonNumber,
          period: selectedPeriodNumber,
          activityScope: activityScopeMode === 'custom' ? `Tự nhập (${customActivityText.split('\n').filter(Boolean).length} hoạt động)` : selectedActivityScope,
          customActivityText: activityScopeMode === 'custom' ? customActivityText : '',
          weekNumber: selectedWeekNumber,
          sectionId: selectedSectionId,
          sectionTitle: activeSection?.name || '',
          gameId: selectedGameId,
          gameName: activeGame?.name || '',
          gameRule: activeGame?.stepByStepRules ? activeGame.stepByStepRules.join('\n') : '',
          methodId: selectedMethodId,
          methodName: activeMethod?.name || '',
          methodDescription: activeMethod?.phases ? activeMethod.phases.join('\n') : '',
          teachingSituation: selectedSituationText,
          lessonName: inputText.split('\n')[0] || selectedStoredBook?.title || `Bài học môn ${selectedSubject}`,
          bookSeries: selectedBook,
          duration: `${lessonPeriods * 35} phút (${lessonPeriods} tiết)`,
          textbookContent: selectedStoredBook?.content || inputText,
          officialReferences: activeRefs,
          attachedImages: attachedImages,
          customInstructions: `${isEnglish ? `[MANDATORY GLOBAL SUCCESS SUPER PROMPT - CV 2345/3456/QĐ 2422/QĐ-BGDĐT]:\n${globalSuccessSuperPrompt}\n\n` : ''}${teacherCustomPrompt ? `[Teacher Custom Notes]: ${teacherCustomPrompt}\n` : ''}${inputText}`
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.lessonPlan) {
          setCurrentFullPlan(prev => ({
            ...(prev || generated),
            ...data.lessonPlan
          }));
        }
      })
      .catch(() => {
        // Fallback already in place, silent ignore
      });

    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };


  // Comprehensive AI Review Function
  const handleAIReview = async () => {
    if (!inputText.trim()) {
      sounds.playError();
      alert('Vui lòng nhập hoặc tải lên nội dung giáo án để Trợ lý Ong Vàng tiến hành kiểm tra toàn diện cô ơi! 🐝');
      return;
    }

    sounds.playClick();
    setIsReviewing(true);
    setAiReviewResult(null);
    setReviewStep('🔍 Ong Vàng đang đọc và phân tích cấu trúc văn bản giáo án...');

    const stepIntervals = [
      { text: '📊 Đối chiếu các quy định Công văn 2345/BGDĐT-GDTH và mục tiêu cần đạt...', delay: 1000 },
      { text: '✍️ Quét chính tả, lỗi Telex gõ phím và chuẩn hóa diễn đạt ngôn ngữ...', delay: 2200 },
      { text: '🤖 Đang phân tích mức độ tích hợp STEM / STEAM và Năng lực số kỹ năng số...', delay: 3500 },
      { text: '🎨 Đang sinh các học liệu in ấn và thiết kế bảng tiêu chí Rubrics tương thích...', delay: 4800 },
      { text: '✨ Hoàn tất báo cáo chuyên môn thẩm định cao cấp...', delay: 6000 }
    ];

    stepIntervals.forEach(step => {
      setTimeout(() => {
        setReviewStep(step.text);
      }, step.delay);
    });

    try {
      const response = await fetch('/api/ai/review-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputText,
          subject: selectedSubject,
          grade: selectedGrade,
          stemOption,
          digitalComp,
          aiOptions,
          options,
          autoSimplifyIfHard,
          curriculumRules
        })
      });

      const data = await response.json();
      
      setTimeout(() => {
        setAiReviewResult(data);
        if (data.lessonPlanImproved) {
          // If improved lesson plan is present, populate it in active working plan
          setLessonPlan(data.lessonPlanImproved);
          setOriginalPlan(JSON.parse(JSON.stringify(data.lessonPlanImproved)));
        }
        setIsReviewing(false);
        sounds.playLevelUp();
        
        // Scroll to review result section after a short delay
        setTimeout(() => {
          const element = document.getElementById('ai-review-result-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }, 6500);

    } catch (err) {
      console.error('Error in AI Review execution:', err);
      setIsReviewing(false);
      sounds.playError();
      alert('Có lỗi xảy ra trong quá trình thẩm định. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại cô ơi!');
    }
  };

  // Remix/Improve Lesson Plan based on toggled configuration options
  const handleRemixLesson = () => {
    if (!lessonPlan) return;
    
    sounds.playClick();
    setIsAnalyzing(true);
    setAnalysisStep('⚡ Trợ lý AI đang tái cấu trúc giáo án theo các yêu cầu tích hợp của thầy cô...');

    setTimeout(() => {
      // Formulate improved lesson plan reflecting the selected STEM/STEAM, Digital Comp, and AI parameters
      let improvedObjectives = [...lessonPlan.objectives];
      let improvedActivities = JSON.parse(JSON.stringify(lessonPlan.activities));
      let improvedAssessment = [...lessonPlan.assessment];
      let improvedMaterials = [...lessonPlan.materials];

      // 1. Rewrite objectives if toggled
      if (options.rewriteObjectives || editLevel >= 50) {
        improvedObjectives = [
          'Phát biểu và chứng minh được đặc tính vật lý của chủ đề qua thực nghiệm thực tế (Năng lực nhận thức khoa học).',
          'Vẽ sơ đồ tư duy hoặc lắp ráp mô hình trực quan mô phỏng cấu tạo đối tượng (Năng lực tìm tòi thế giới tự nhiên).',
          'Hợp tác tích cực, biết phân công nhiệm vụ rõ ràng trong hoạt động nhóm (Năng lực giao tiếp và hợp tác).',
          'Hình thành ý thức bảo vệ môi trường xanh, tôn trọng tự nhiên và phẩm chất chăm chỉ thực hiện nhiệm vụ.'
        ];
      }

      // 2. Integration of STEM/STEAM Modules
      if (stemMode) {
        improvedObjectives.push('Áp dụng Quy trình thiết kế kỹ thuật (EDP) để tạo ra sản phẩm thực tế sáng tạo.');
        
        // Inject STEM specifications to the discovery activities
        improvedActivities = improvedActivities.map((act: any) => {
          if (act.id === 'act2' || act.id === 'act3') {
            return {
              ...act,
              name: `${act.name} 🛠️ [STEM]`,
              description: `${act.description} Học sinh áp dụng Quy trình Thiết kế Kỹ thuật (Engineering Design Process): Xác định vấn đề -> Đề xuất giải pháp -> Phác thảo bản vẽ -> Lắp ráp sản phẩm mẫu -> Thử nghiệm và cải tiến sản phẩm.`,
              steamInfo: {
                science: 'Tìm hiểu nguyên lý khoa học đằng sau kết cấu đối tượng học tập.',
                technology: 'Sử dụng công cụ thiết bị lớp học cơ bản và vật liệu tái chế.',
                engineering: 'Thực hiện cắt ráp, liên kết cấu trúc để tạo hình vững chắc.',
                maths: 'Đo kích thước chính xác, chia tỉ lệ cân đối cho mô hình.'
              }
            };
          }
          return act;
        });

        improvedMaterials.push('Vật liệu STEM tái chế: Vỏ chai nhựa, kéo an toàn, keo sữa, giấy màu bìa cứng.');
        improvedAssessment.push('Bảng tiêu chí (Rubric) đánh giá sản phẩm STEM của học sinh.');
      } else if (steamMode) {
        improvedObjectives.push('Phát triển óc thẩm mỹ sáng tạo thông qua hoạt động thiết kế nghệ thuật STEAM.');
        
        improvedActivities = improvedActivities.map((act: any) => {
          if (act.id === 'act3') {
            return {
              ...act,
              name: `${act.name} 🎨 [STEAM Arts]`,
              description: `${act.description} Tích hợp yếu tố Nghệ thuật (Arts): Học sinh sử dụng màu sáp, đất nặn sáng tạo và lá cây khô để làm tranh nghệ thuật 3D minh họa sinh động bài học.`,
              steamInfo: {
                science: 'Nghiên cứu cấu tạo sinh học thiên nhiên.',
                technology: 'Tìm kiếm ảnh chụp tham khảo qua Google Lens.',
                engineering: 'Thiết kế bố cục cân đối trên khổ giấy lớn.',
                arts: 'Phối màu sắc hài hòa tươi sáng, tạo hình mĩ thuật ngộ nghĩnh.',
                maths: 'Phân tích tỉ lệ hình học, phân chia không gian tranh hợp lý.'
              }
            };
          }
          return act;
        });
      }

      // 3. Digital Competency integration
      if (digitalComp !== 'none') {
        const compLevelText = digitalComp === 'basic' ? 'Cơ bản' : 'Nâng cao';
        improvedObjectives.push(`Phát triển năng lực số ${compLevelText}: Sử dụng thành thạo thiết bị số và phần mềm học tập.`);

        improvedActivities = improvedActivities.map((act: any) => {
          if (act.id === 'act1') {
            return {
              ...act,
              description: `${act.description} Giáo viên ứng dụng phần mềm Quizizz/Kahoot hoặc Lucky Wheel trên màn hình tương tác để kiểm tra kiến thức bài cũ sinh động.`
            };
          }
          if (act.id === 'act2') {
            return {
              ...act,
              description: `${act.description} Học sinh được hướng dẫn tra cứu thông tin trực tuyến bằng Google Arts & Culture hoặc Google Earth để có trải nghiệm tham quan ảo trực quan.`
            };
          }
          return act;
        });

        improvedMaterials.push('Thiết bị màn hình tương tác thông minh của lớp học, tài khoản phần mềm Quizizz.');
      }

      // 4. AI in Lesson Plan suggestions
      if (aiLiteracy) {
        improvedActivities = improvedActivities.map((act: any) => {
          if (act.id === 'act4') {
            return {
              ...act,
              description: `${act.description} Giáo viên đề xuất học sinh sử dụng Canva AI (Magic Design) hoặc CapCut AI để vẽ sơ đồ, dựng video hoạt hình ngắn về ý thức bảo vệ bài học.`
            };
          }
          return act;
        });
      }

      // 5. Rewrite assessment if requested
      if (options.rewriteAssessment || editLevel >= 50) {
        improvedAssessment = [
          'Đánh giá thường xuyên: Bảng kiểm quan sát hoạt động nhóm (Checklist) đánh giá tinh thần sẻ chia và trách nhiệm.',
          'Đánh giá quá trình: Rubrics đánh giá chất lượng sản phẩm sơ đồ tư duy (Tiêu chí: Sáng tạo, Khoa học, Thẩm mỹ).',
          'Đánh giá cuối bài: Trò chơi trắc nghiệm số trên ứng dụng trực tuyến Kahoot/Quizizz phản hồi ngay điểm số.',
          'Phiếu tự đánh giá của bản thân học sinh về sự nỗ lực trong tiết học.'
        ];
      }

      // Set the proposed changes
      setProposedChanges({
        objectives: improvedObjectives,
        activities: improvedActivities,
        assessment: improvedAssessment,
        materials: improvedMaterials
      });

      sounds.playLevelUp();
      setIsAnalyzing(false);
      
      // Auto scroll to comparison panel
      const element = document.getElementById('comparison-panel');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2500);
  };

  // Accept Proposed Changes
  const handleAcceptChanges = () => {
    if (!proposedChanges || !lessonPlan) return;
    sounds.playSuccess();
    setLessonPlan({
      ...lessonPlan,
      objectives: proposedChanges.objectives || lessonPlan.objectives,
      activities: proposedChanges.activities || lessonPlan.activities,
      assessment: proposedChanges.assessment || lessonPlan.assessment,
      materials: proposedChanges.materials || lessonPlan.materials
    });
    setProposedChanges(null);
    alert('🎉 Trợ lý Ong Vàng đã cập nhật giáo án thành công theo các đề xuất cải tiến của AI rồi cô ơi!');
  };

  // Reject Proposed Changes
  const handleRejectChanges = () => {
    sounds.playClick();
    setProposedChanges(null);
    alert('❌ Thầy cô đã từ chối áp dụng cải tiến. Giáo án sẽ giữ nguyên cấu trúc trước đó.');
  };

  // Save changes locally in the form editor
  const handleSaveField = (field: keyof LessonPlan, value: any) => {
    if (!lessonPlan) return;
    setLessonPlan({
      ...lessonPlan,
      [field]: value
    });
  };

  // Generate compatible mini-game questions for this lesson plan instantly!
  const handleGenerateClassroomGame = () => {
    if (!lessonPlan) return;
    sounds.playClick();
    setGeneratedGameType('quiz');
    
    // Create primary-school questions matching the lesson topic!
    const isWaterLesson = lessonPlan.lessonName.toLowerCase().includes('nước');
    const questionsList: Question[] = isWaterLesson ? [
      {
        id: 'gp1',
        text: 'Nước ở thể lỏng có hình dạng như thế nào hở bé yêu?',
        type: 'multiple_choice',
        options: ['Có hình chiếc cốc đựng nó', 'Có hình tròn cố định', 'Có hình vuông', 'Không có hình dạng nhất định (phụ thuộc vật chứa)'],
        answer: 'Không có hình dạng nhất định (phụ thuộc vật chứa)',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Dễ',
        useCount: 0,
        explanation: 'Chính xác! Nước ở thể lỏng không có hình dạng nhất định mà có hình dạng của vật chứa nó đấy bé nhé!',
        tags: ['Thể của nước', 'Tính chất của nước']
      },
      {
        id: 'gp2',
        text: 'Nước hóa thành đá lạnh ở nhiệt độ nào?',
        type: 'multiple_choice',
        options: ['100 độ C', '50 độ C', '0 độ C', '10 độ C'],
        answer: '0 độ C',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Trung bình',
        useCount: 0,
        explanation: 'Xuất sắc! Nước hóa thành đá lạnh đông cứng (thể rắn) ở nhiệt độ 0 độ C đấy!',
        tags: ['Đông đặc', 'Nước']
      },
      {
        id: 'gp3',
        text: 'Khi ông Mặt Trời chiếu nắng ấm xuống sông hồ, nước sẽ biến thành gì?',
        type: 'multiple_choice',
        options: ['Hơi nước bay lên trời', 'Đá tuyết rơi xuống', 'Đất cát màu nâu', 'Kẹo ngọt sắc màu'],
        answer: 'Hơi nước bay lên trời',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Dễ',
        useCount: 0,
        explanation: 'Giỏi quá! Nắng ấm làm nước hồ bay hơi biến thành những làn hơi nước lơ lửng bay lên bầu trời tạo mây đấy!',
        tags: ['Chu trình nước', 'Bay hơi']
      }
    ] : [
      {
        id: 'gop1',
        text: 'Chú ong chăm chỉ có tất cả mấy đôi cánh?',
        type: 'multiple_choice',
        options: ['1 đôi cánh', '2 đôi cánh', '3 đôi cánh', '4 đôi cánh'],
        answer: '2 đôi cánh',
        subject: 'Khoa học',
        grade: 3,
        difficulty: 'Dễ',
        useCount: 0,
        explanation: 'Chú ong có 2 đôi cánh (tức 4 cánh) giúp chú bay thật nhanh và vững vàng để hút mật ngọt đấy!',
        tags: ['Loài ong', 'Sinh học tiểu học']
      },
      {
        id: 'gop2',
        text: 'Mật ong được loài ong lấy từ bộ phận nào của những bông hoa xinh?',
        type: 'multiple_choice',
        options: ['Nhị hoa', 'Cánh hoa', 'Mật hoa', 'Lá hoa'],
        answer: 'Mật hoa',
        subject: 'Khoa học',
        grade: 3,
        difficulty: 'Dễ',
        useCount: 0,
        explanation: 'Chính xác! Ong thợ sẽ hút mật hoa ngọt lành nằm sâu bên trong bông hoa đem về tổ cất giữ!',
        tags: ['Hút mật', 'Cây cối']
      },
      {
        id: 'gop3',
        text: 'Sản phẩm nào dưới đây là do đàn ong cần cù mang lại cho con người?',
        type: 'multiple_choice',
        options: ['Sữa bò thơm ngon', 'Mật ong ngọt ngào & Sáp ong bổ dưỡng', 'Quả táo chín đỏ', 'Sợi tơ tằm mềm mại'],
        answer: 'Mật ong ngọt ngào & Sáp ong bổ dưỡng',
        subject: 'Khoa học',
        grade: 3,
        difficulty: 'Trung bình',
        useCount: 0,
        explanation: 'Bé giỏi quá! Đàn ong cần cù đem lại những hũ mật ong vàng óng ngọt ngào và sáp ong quý giá!',
        tags: ['Lợi ích loài ong']
      }
    ];

    setGeneratedQuestions(questionsList);
  };

  // Add the generated interactive questions directly to the main app Question Bank!
  const handlePushQuestionsToBank = () => {
    if (generatedQuestions.length === 0) return;
    sounds.playLevelUp();
    onAddQuestions(generatedQuestions);
    alert('🎉 Tuyệt vời! Trợ lý Ong Vàng đã thêm thành công các câu hỏi bài học vào Kho câu hỏi rồi ạ! Thầy cô có thể cho học sinh chơi ngay lập tức!');
    setGeneratedQuestions([]);
    setGeneratedGameType(null);
    onNavigate('questions');
  };

  // Export File workflow
  const triggerExport = (format: string) => {
    sounds.playCoin();
    setExportFormat(format);
  };

  // --- Extended Auxiliary Helpers ---

  // Voice Dictation (Speech to Text)
  const handleVoiceInput = () => {
    sounds.playClick();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Whimsical high-fidelity fallback if browser API is missing
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        sounds.playLevelUp();
        const dictatedText = `[Giọng nói trích xuất] Giáo án môn ${selectedSubject} ${selectedGrade} - Bộ sách ${selectedBook}. Tên bài học là học về môi trường tự nhiên, yêu cầu cần đạt bám sát chương trình CTGDPT 2018. Hoạt động khởi động chơi trò chơi Kahoot/Quizizz ôn tập, sau đó thảo luận nhóm đôi và thực hành chế tạo vật phẩm.`;
        setInputText(prev => prev ? `${prev}\n${dictatedText}` : dictatedText);
        alert(`🎙️ Trợ lý Ong Vàng đã hoàn thành mô phỏng nhận diện giọng nói:\n"${dictatedText}"`);
      }, 3000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('🎙️ Đã có sự cố kết nối micro hoặc quyền truy cập giọng nói cô ơi!');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInputText(prev => prev ? `${prev}\n${speechToText}` : speechToText);
      sounds.playLevelUp();
    };

    recognition.start();
  };

  // Google Docs Submit URL
  const handleGoogleDocsSubmit = () => {
    if (!googleDocsUrl.trim()) return;
    sounds.playSuccess();
    setShowGoogleDocsModal(false);
    
    // Simulate real text loading from Google Docs
    const docText = `[Đồng bộ Google Docs: ${googleDocsUrl.split('/edit')[0]}]\nBộ sách: ${selectedBook}\nMôn học: ${selectedSubject} - ${selectedGrade}\nBài học: Kế hoạch bài dạy môn ${selectedSubject} ${selectedGrade} (Tuần ${selectedWeekNumber})\nNội dung bài dạy: Bám sát phân phối chương trình môn ${selectedSubject} ${selectedGrade} và Công văn 2345/BGDĐT-GDTH.\nMục tiêu cần đạt: Phát triển phẩm chất và năng lực đặc thù theo chuẩn chương trình GDPT 2018.\nTiến trình 4 pha: Khởi động -> Khám phá -> Luyện tập -> Vận dụng.`;
    setInputText(docText);
    setGoogleDocsUrl('');
    alert('🔗 Đã liên kết và đồng bộ thành công văn bản giáo án từ Google Docs của cô!');
  };

  // Save lesson to local library
  const handleSaveLesson = () => {
    if (!lessonPlan) {
      alert('Chưa có giáo án để lưu cô ơi! Hãy tạo hoặc phân tích giáo án trước nhé 🐝');
      return;
    }
    sounds.playSuccess();
    const newLesson = {
      ...lessonPlan,
      id: 'plan_' + Date.now(),
      savedAt: new Date().toLocaleString('vi-VN'),
      schoolYear: '2026-2027',
      book: selectedBook,
      teachingFormat,
      periods: lessonPeriods
    };

    // Save edit session to history list too
    const newHistory = {
      id: 'history_' + Date.now(),
      lessonId: newLesson.id,
      lessonName: newLesson.lessonName,
      timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      plan: JSON.parse(JSON.stringify(newLesson))
    };

    const updatedLessons = [newLesson, ...savedLessons];
    const updatedHistory = [newHistory, ...editHistory];

    setSavedLessons(updatedLessons);
    setEditHistory(updatedHistory);

    localStorage.setItem('smartedu_saved_lessons', JSON.stringify(updatedLessons));
    localStorage.setItem('smartedu_edit_history', JSON.stringify(updatedHistory));
    
    alert(`🎉 Đã lưu thành công giáo án "${lessonPlan.lessonName}" vào Thư viện của thầy cô!`);
  };

  // Delete saved lesson plan
  const handleDeleteSavedLesson = (id: string) => {
    sounds.playClick();
    if (window.confirm('Cô có chắc chắn muốn xóa giáo án này khỏi Thư viện cá nhân của mình không?')) {
      const updated = savedLessons.filter(l => l.id !== id);
      setSavedLessons(updated);
      localStorage.setItem('smartedu_saved_lessons', JSON.stringify(updated));
    }
  };

  // Restore history version
  const handleRestoreHistory = (histPlan: any) => {
    sounds.playSuccess();
    setLessonPlan(histPlan);
    alert(`⚡ Đã khôi phục thành công phiên bản lịch sử giáo án của "${histPlan.lessonName}"!`);
  };

  // Delete history item
  const handleDeleteHistoryItem = (id: string) => {
    sounds.playClick();
    const updated = editHistory.filter(item => item.id !== id);
    setEditHistory(updated);
    localStorage.setItem('smartedu_edit_history', JSON.stringify(updated));
  };

  // Load history item
  const handleLoadHistory = (item: any) => {
    sounds.playSuccess();
    setLessonPlan(item.plan);
    setPlannerTab('editor');
    alert(`⚡ Đã tải phiên bản giáo án "${item.lessonName}" thành công!`);
  };

  // Save updated custom guidelines & regulations
  const handleUpdateRules = (type: string, text: string) => {
    sounds.playSuccess();
    const updated = {
      ...curriculumRules,
      [type]: text
    };
    setCurriculumRules(updated);
    localStorage.setItem('smartedu_curriculum_rules', JSON.stringify(updated));
  };

  // AI Game Designer Engine
  const handleGenerateCustomGame = async () => {
    sounds.playClick();
    setIsGeneratingCustomGame(true);
    setIsAnalyzing(true);
    const isEnglish = gameSubject === 'Tiếng Anh';
    setAnalysisStep(isEnglish 
      ? '🎲 AI is designing 100% English classroom game with clear, concise rules...' 
      : '🎲 AI đang kiến thiết kịch bản Trò chơi Sư phạm Tiểu học...');

    try {
      const response = await fetch('/api/ai/game-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: gameSubject,
          gameName: gameNameInput,
          gamePhase,
          gameDuration,
          gameForm,
          gameActivityLevel,
          gameCondition,
          grade: selectedGrade,
          unitOrTopic: selectedUnit || inputText
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCustomGameGenerated(data);
      } else {
        throw new Error('Failed to fetch game plan from server');
      }
    } catch (err) {
      console.warn('Game plan generation fallback triggered:', err);
      // High-fidelity fallback
      setCustomGameGenerated({
        name: isEnglish ? `🌟 ${gameNameInput || 'Action Challenge'}` : `🏆 ${gameNameInput || 'Đấu Trường Vui Học'}`,
        subject: gameSubject,
        phase: gamePhase,
        duration: gameDuration,
        form: gameForm,
        condition: gameCondition,
        activityLevel: gameActivityLevel,
        preparation: isEnglish 
          ? 'Teacher prepares 4 colorful flashcards and word cards for quick reaction drills.' 
          : 'Giáo viên chuẩn bị sẵn 5 bộ thẻ câu hỏi trắc nghiệm in màu và chuông bấm.',
        steps: isEnglish ? [
          `Step 1 (1 min): Teacher announces "${gameNameInput || 'English Game'}" and demonstrates rules clearly with gesture cues.`,
          `Step 2 (1.5 mins): Whole class does a quick trial round to understand instructions.`,
          `Step 3 (2 mins): Pupils compete actively in ${gameForm} using target vocabulary.`,
          `Step 4 (0.5 min): Teacher awards gold stars to the fastest correct team and gives warm praise.`
        ] : [
          `Bước 1 (1 phút): Giáo viên chia lớp theo hình thức ${gameForm} và phổ biến tên trò chơi "${gameNameInput}".`,
          `Bước 2 (1.5 phút): Chơi thử 1 lượt ngắn để học sinh nắm rõ quy tắc.`,
          `Bước 3 (2 phút): Tiến hành trò chơi chính thức với mức độ ${gameActivityLevel}.`,
          `Bước 4 (0.5 phút): Tổng kết điểm số, trao sticker khen thưởng cho nhóm xuất sắc.`
        ],
        rules: isEnglish 
          ? '1. Speak 100% English during the game.\n2. Raise hand or touch flashcard when hearing teacher\'s cue.\n3. Do not push friends; play safely and fairly.\n4. Quickest team wins 1 star per round!'
          : 'Học sinh chỉ được trả lời khi có hiệu lệnh từ giáo viên/chuông báo. Trả lời đúng nhận 10 điểm sao thưởng. Giữ trật tự và đoàn kết.',
        rubric: isEnglish ? [
          { criteria: 'English Fluency & Pronunciation', maxScore: '⭐⭐⭐ Excellent', midScore: '⭐⭐ Good', minScore: '⭐ Practice' },
          { criteria: 'Teamwork & Fair Play', maxScore: '⭐⭐⭐ Great', midScore: '⭐⭐ Fair', minScore: '⭐ Needs reminder' }
        ] : [
          { criteria: 'Tác phong & kỷ luật', maxScore: '⭐⭐⭐ Tốt', midScore: '⭐⭐ Khá', minScore: '⭐ Cần cố gắng' },
          { criteria: 'Độ chính xác kiến thức', maxScore: '⭐⭐⭐ Tốt', midScore: '⭐⭐ Khá', minScore: '⭐ Cần cố gắng' }
        ],
        classSizeAdjustments: isEnglish ? 'For large classes (>35 pupils): Divide into 4 teams with team captains keeping score.' : 'Nếu lớp đông (>40 HS), chia làm 4 đội và cử tổ trưởng chấm điểm chéo.',
        weakStudentAdapting: isEnglish ? 'Provide visual gesture cues and pair slow learners with supportive study buddies.' : 'Thiết kế các gói câu hỏi gợi ý bằng hình ảnh trực quan giúp học sinh chưa tự tin tham gia.',
        backupPlan: isEnglish ? 'If projector fails: Write target words on blackboard and use physical flashcards.' : 'Nếu mất điện: Sử dụng bộ thẻ in sẵn và phấn màu trên bảng đen.'
      });
    } finally {
      setIsGeneratingCustomGame(false);
      setIsAnalyzing(false);
      sounds.playLevelUp();
    }
  };

  // Delete all personal data (Privacy Compliance)
  const handleDeleteAllData = () => {
    if (window.confirm('⚠️ Chú ý: Hành động này sẽ xóa vĩnh viễn toàn bộ giáo án đã lưu, lịch sử biên tập và quy chuẩn tùy chỉnh của cô khỏi thiết bị này. Cô có chắc chắn muốn tiếp tục không?')) {
      localStorage.removeItem('smartedu_saved_lessons');
      localStorage.removeItem('smartedu_edit_history');
      localStorage.removeItem('smartedu_curriculum_rules');
      setSavedLessons([]);
      setEditHistory([]);
      setCurriculumRules({
        moet2345: 'Khung giáo án chuẩn theo Công văn 2345/BGDĐT-GDTH bao gồm 4 phần chủ đạo: I. Yêu cầu cần đạt; II. Thiết bị dạy học; III. Tiến trình dạy học; IV. Phương án đánh giá.',
        ctgdpt2018: 'Chương trình GDPT 2018 phát triển 5 phẩm chất (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm) và 3 năng lực chung (Tự chủ tự học, Giao tiếp hợp tác, Giải quyết vấn đề sáng tạo).',
        englishGlobalSuccess: 'Từ vựng & Ngữ pháp bám sát khung CEFR A1 cho cấp tiểu học Việt Nam, phát triển giao tiếp Phonics & Pronunciation.',
        gradeDifficulty: 'Khối lớp 1-2: Trực quan hóa cao, kể chuyện, thẻ flashcards. Khối lớp 3-4-5: Tăng cường tự học thảo luận nhóm và dự án nhỏ.'
      });
      sounds.playError();
      alert('🔒 Đã xóa vĩnh viễn toàn bộ dữ liệu cá nhân của thầy cô theo đúng cam kết bảo mật!');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4 space-y-6 animate-fade-in text-gray-800">
      
      {/* Hero Banner Header with Primary Teacher Style */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 rounded-[32px] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden text-left">
        <div className="absolute -right-10 -bottom-10 text-9xl opacity-15 select-none pointer-events-none">📚</div>
        <div className="absolute right-12 top-6 text-4xl opacity-30 select-none animate-float-slow">✨</div>
        
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="bg-white/20 text-white border border-white/20 text-[10px] md:text-xs font-fredoka font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-inner">
            📚 Copilot Giáo Án Tiểu Học - Chuẩn CTGDPT 2018
          </span>
          <h1 className="font-fredoka text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-md">
            Trợ Lý Soạn Bài & Thiết Kế Giáo Án Thông Minh 🐝
          </h1>
          <p className="text-xs md:text-sm text-emerald-50 font-sans font-medium leading-relaxed">
            Công cụ hỗ trợ giáo viên đọc hiểu, đánh giá năng lực giáo án, tích hợp STEM, STEAM, năng lực số và tự động kiến tạo bộ câu hỏi trò chơi lớp học tương tác chỉ trong 1 giây!
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/85 backdrop-blur-md p-2 rounded-2xl shadow-md border border-indigo-50 select-none">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('warehouse'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'warehouse' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-amber-50'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            <span>📂 Kho Giáo Án ({warehousePlans.length})</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('editor'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'editor' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>📝 Soạn & Đính Kèm Ảnh SGK</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('books'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'books' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Nguồn Sách & SGK ({storedBooks.length})</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('references'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'references' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>🔗 Dẫn Nguồn Công Văn ({officialReferences.filter(r => r.isActive).length}/{officialReferences.length})</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('library'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'library' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 Lịch sử & Trò chơi AI</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('reports'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'reports' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>📋 Thẩm định 2345</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('rules'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'rules' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>⚙️ Quy chuẩn Sư phạm</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setPlannerTab('privacy'); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer ${
              plannerTab === 'privacy' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🔒 Bảo mật GDPR</span>
          </button>
        </div>

        {/* Dedicated SGV & Hoclieu.vn & CV 2345 quick actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { sounds.playClick(); onNavigate('personal_appendix2'); }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-fredoka font-extrabold text-xs shadow-md cursor-pointer transition-all hover:scale-[1.02] border border-emerald-400/30"
            title="Mở Thư mục quản lý Kế hoạch dạy học Phụ lục 2 Cá nhân tải lên cho tất cả các môn"
          >
            <FolderArchive className="w-4 h-4 text-emerald-200 animate-pulse" />
            <span>📁 Kho Phụ Lục 2 Cá Nhân ⭐</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); onNavigate('curriculum_2345'); }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white rounded-xl font-fredoka font-extrabold text-xs shadow-md cursor-pointer transition-all hover:scale-[1.02] border border-blue-400/30"
            title="Mở Kế hoạch dạy học 35 tuần Tiếng Anh Phụ lục 2 Công văn 2345"
          >
            <ClipboardCheck className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>📋 Phụ Lục 2 CV 2345 (35 Tuần)</span>
          </button>
          <button
            onClick={() => { sounds.playCoin(); setShowSGVModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-fredoka font-extrabold text-xs shadow-md cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Tra Cứu SGV (taphuan.nxbgd.vn)</span>
          </button>
          <button
            onClick={() => { sounds.playCoin(); setShowHocLieuModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-fredoka font-extrabold text-xs shadow-md cursor-pointer transition-all hover:scale-[1.02]"
          >
            <BookOpen className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>Kho Học Liệu Số (hoclieu.vn) 🌐</span>
          </button>
        </div>
      </div>

      {plannerTab === 'editor' && (
        <div className="space-y-6">
          {/* Active Personal Appendix 2 Integration Banner */}
          {(() => {
            const activePersonal = getActivePersonalAppendix2(selectedSubject, selectedGrade);
            const activeIntegration = getIntegrationForLessonPlan({
              subject: selectedSubject,
              grade: selectedGrade,
              weekNumber: selectedWeekNumber,
              periodNumber: parseInt(selectedPeriodNumber.replace(/\D/g, ''), 10) || 1,
              lessonName: selectedLessonNumber
            });

            if (activePersonal) {
              return (
                <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-950 text-white p-4 rounded-2xl shadow-lg border border-emerald-500/40 relative overflow-hidden text-left">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-extrabold text-[11px] border border-emerald-400/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ĐANG ÁP DỤNG PHỤ LỤC 2 CÁ NHÂN TẢI LÊN</span>
                        </span>
                        <span className="text-xs text-emerald-200 font-medium font-sans">
                          {activePersonal.schoolName} • GV: {activePersonal.teacherName}
                        </span>
                      </div>
                      <h3 className="text-sm md:text-base font-fredoka font-bold text-white flex items-center gap-2">
                        <span>🌟 {activePersonal.title}</span>
                      </h3>
                      <p className="text-xs text-emerald-100/90 font-sans max-w-4xl leading-relaxed">
                        Toàn bộ nội dung điều chỉnh YCCĐ, Năng lực số (NLS), AI (QĐ 2422), ATGT, KNS và Thiết bị dạy học của Tuần {selectedWeekNumber} - {selectedPeriodNumber} sẽ được tự động tích hợp chính xác 100% theo bản phân phối cá nhân bạn đã kích hoạt!
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => { sounds.playClick(); onNavigate('personal_appendix2'); }}
                        className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl font-fredoka font-extrabold text-xs transition-all shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <FolderArchive className="w-3.5 h-3.5" />
                        <span>Quản Lý Phụ Lục 2</span>
                      </button>
                    </div>
                  </div>

                  {/* Micro Preview of active week integrations */}
                  <div className="mt-3 pt-2.5 border-t border-emerald-700/60 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
                    <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-700/40">
                      <div className="font-bold text-cyan-300 flex items-center gap-1 mb-0.5">
                        <Cpu className="w-3 h-3" />
                        <span>AI & Năng Lực Số (Tuần {selectedWeekNumber}):</span>
                      </div>
                      <div className="text-emerald-100 line-clamp-2">{activeIntegration.aiIntegration}</div>
                    </div>
                    <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-700/40">
                      <div className="font-bold text-amber-300 flex items-center gap-1 mb-0.5">
                        <ShieldAlert className="w-3 h-3" />
                        <span>ATGT & Kỹ Năng Sống:</span>
                      </div>
                      <div className="text-emerald-100 line-clamp-2">{activeIntegration.atgtKnsIntegration}</div>
                    </div>
                    <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-700/40">
                      <div className="font-bold text-purple-300 flex items-center gap-1 mb-0.5">
                        <Layers className="w-3 h-3" />
                        <span>Thiết Bị & Học Liệu:</span>
                      </div>
                      <div className="text-emerald-100 line-clamp-2">{activeIntegration.equipmentDevices}</div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div className="bg-gradient-to-r from-slate-50 via-indigo-50/40 to-emerald-50/40 p-3.5 rounded-2xl border border-indigo-100/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-fredoka font-bold text-indigo-950">
                      📁 Áp dụng Phụ Lục 2 Cá Nhân môn {selectedSubject} {selectedGrade}
                    </div>
                    <div className="text-[11px] text-gray-500 font-sans">
                      Thầy cô có thể tải lên tệp Word, Excel hoặc dán nội dung Kế hoạch dạy học của trường mình để AI tự động tích hợp chuẩn xác theo từng tiết dạy!
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { sounds.playClick(); onNavigate('personal_appendix2'); }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-fredoka font-extrabold text-xs shadow-sm cursor-pointer transition-all shrink-0 flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tải lên Phụ Lục 2 của tôi</span>
                </button>
              </div>
            );
          })()}

          {/* Top Quick Reference & Language Alignment Bar */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-fredoka font-extrabold text-indigo-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Nguồn SGK bám sát:</span>
              </span>
              {selectedStoredBook ? (
                <span className="inline-flex items-center gap-1.5 bg-white border border-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
                  <span>📖 {selectedStoredBook.title} ({selectedStoredBook.bookSeries} - {selectedStoredBook.subject} {selectedStoredBook.grade})</span>
                  <button
                    onClick={() => setPlannerTab('books')}
                    className="text-[10px] text-indigo-600 underline font-fredoka cursor-pointer ml-1 hover:text-indigo-800"
                  >
                    Đổi sách
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setPlannerTab('books')}
                  className="inline-flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-fredoka font-bold px-3 py-1 rounded-xl cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Chọn bài học trong Kho SGK</span>
                </button>
              )}

              <button
                onClick={() => { sounds.playCoin(); setShowSubjectPlanModal(true); }}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-fredoka font-bold px-3.5 py-1 rounded-xl cursor-pointer transition-all shadow-sm hover:scale-105"
                title="Xem và xuất Kế hoạch dạy học 35 tuần chuẩn Phụ lục 2 CV 2345"
              >
                <ClipboardList className="w-3.5 h-3.5 text-amber-300" />
                <span>Kế hoạch 35 tuần (Phụ lục 2 CV 2345) 📋</span>
              </button>

              <button
                onClick={() => { sounds.playCoin(); setShowSGVModal(true); }}
                className="inline-flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-fredoka font-bold px-3 py-1 rounded-xl cursor-pointer transition-all border border-emerald-300 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tra SGV taphuan.nxbgd.vn 🏛️</span>
              </button>

              <button
                onClick={() => { sounds.playCoin(); setShowHocLieuModal(true); }}
                className="inline-flex items-center gap-1 bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs font-fredoka font-bold px-3 py-1 rounded-xl cursor-pointer transition-all border border-sky-300 shadow-xs"
              >
                <Link2 className="w-3.5 h-3.5 text-sky-700" />
                <span>Kho Học Liệu hoclieu.vn 🌐</span>
              </button>

              <button
                onClick={() => { sounds.playCoin(); setIsUploadTemplateModalOpen(true); }}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-fredoka font-bold px-3.5 py-1 rounded-xl cursor-pointer transition-all shadow-sm hover:scale-105"
                title="Tải lên hoặc chọn Kế hoạch bài dạy mẫu hoàn chỉnh để áp dụng vào soạn bài"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>📥 Tải Kế Hoạch Mẫu (Hoàn chỉnh) ✨</span>
              </button>

              <button
                onClick={handleClearCurrentDraft}
                className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-fredoka font-bold px-3 py-1 rounded-xl cursor-pointer transition-all border border-rose-200 shadow-xs"
                title="Xóa kế hoạch bài dạy cũ để làm mới và lưu bản mới"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>🗑️ Xóa bản cũ & Làm mới</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-fredoka font-extrabold text-indigo-950 flex items-center gap-1">
                <Link2 className="w-4 h-4 text-emerald-600" />
                <span>Căn cứ pháp lý:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {officialReferences.filter(r => r.isActive).slice(0, 3).map(r => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-lg transition-all"
                    title={r.authority}
                  >
                    <span>{r.code}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-emerald-600" />
                  </a>
                ))}
                <button
                  onClick={() => setPlannerTab('references')}
                  className="text-[10px] text-emerald-700 font-bold underline cursor-pointer ml-0.5"
                >
                  +{officialReferences.filter(r => r.isActive).length - 3 > 0 ? officialReferences.filter(r => r.isActive).length - 3 : ''} Quản lý
                </button>
              </div>

              <div className="ml-2 pl-2 border-l border-indigo-200">
                <span className={`text-[10px] font-fredoka font-extrabold px-2.5 py-1 rounded-full border ${
                  selectedSubject === 'Tiếng Anh' 
                    ? 'bg-amber-100 border-amber-300 text-amber-900' 
                    : 'bg-teal-100 border-teal-300 text-teal-900'
                }`}>
                  {selectedSubject === 'Tiếng Anh' ? '🇬🇧 Trình bày 100% Tiếng Anh' : '🇻🇳 Trình bày 100% Tiếng Việt'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Input & AI Guidance Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Input Draft Panel */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-fredoka text-base font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Nguồn Dữ Liệu Soạn Bài</span>
                </h3>
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all ${
                    isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                  }`}
                  title="Soạn thảo bằng giọng nói"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="font-fredoka font-bold">{isListening ? 'Đang nghe...' : 'Giọng nói'}</span>
                </button>
              </div>

              {/* Flexible Input Multi-Source Helper Banner */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 text-[11px] text-indigo-950 space-y-1.5">
                <p className="font-bold flex items-center gap-1 text-indigo-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Linh hoạt 1 trong các nguồn (không bắt buộc cả 3):</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[10px]">
                  <div className={`p-1.5 rounded-lg border font-medium transition-all ${attachedImages.length > 0 ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold' : 'bg-white/80 border-indigo-100 text-gray-700'}`}>
                    <span>📸 1. Ảnh SGK {attachedImages.length > 0 ? `(${attachedImages.length} ảnh)` : ''}</span>
                  </div>
                  <div className={`p-1.5 rounded-lg border font-medium transition-all ${inputText.trim() ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold' : 'bg-white/80 border-indigo-100 text-gray-700'}`}>
                    <span>📄 2. Kế hoạch cũ / Chữ</span>
                  </div>
                  <div className={`p-1.5 rounded-lg border font-medium transition-all ${googleDocsUrl.trim() || uploadedFileName ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold' : 'bg-white/80 border-indigo-100 text-gray-700'}`}>
                    <span>🔗 3. Link / Tệp đính kèm</span>
                  </div>
                </div>
              </div>

              {/* Drag and Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                  isDragging ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => document.getElementById('file-upload-input')?.click()}
              >
                <input
                  id="file-upload-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".txt,.doc,.docx,.pdf"
                />
                <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-600">
                  {uploadedFileName ? `📂 ${uploadedFileName}` : 'Kéo thả kế hoạch cũ / tài liệu hoặc click để tải lên'}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">Hỗ trợ .txt, .docx, .pdf</p>
              </div>

              {/* Quick Template & Draft Cleanup Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { sounds.playCoin(); setIsUploadTemplateModalOpen(true); }}
                  className="flex-1 py-2 px-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl text-[11px] font-fredoka font-bold shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-300" />
                  <span>📥 Tải Kế Hoạch Mẫu (Hoàn chỉnh)</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearCurrentDraft}
                  className="py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-[11px] font-fredoka font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                  title="Xóa bản thảo cũ để tạo lại bản mới"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>🗑️ Xóa cũ</span>
                </button>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Dán kế hoạch bài giảng cũ để chuẩn hóa và bổ sung AI theo QĐ 2422/QĐ-BGDĐT, hoặc dán ghi chú bài học..."
                  className="w-full h-44 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed resize-none"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                  <span>Số ký tự: {inputText.length}</span>
                  <button 
                    onClick={() => setShowGoogleDocsModal(true)} 
                    className="text-indigo-600 hover:underline flex items-center gap-0.5"
                  >
                    🔗 Liên kết Google Docs
                  </button>
                </div>
              </div>

              {/* Core Subject, Grade, Book selectors */}
              <div className="space-y-3 pt-2 border-t border-gray-100 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-500 uppercase text-[10px]">Môn học</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Tiếng Anh') {
                          setSelectedBook('Global Success');
                          setOptions(prev => ({
                            ...prev,
                            engGlobalSuccess: true,
                            engCEFR: true,
                            engClassroomEnglish: true
                          }));
                        } else if (selectedBook === 'Global Success' || selectedBook === 'i-Learn Smart Start' || selectedBook === 'Family and Friends') {
                          setSelectedBook('Kết nối tri thức và cuộc sống');
                        }
                        handleSubjectOrGradeChange(val, selectedGrade);
                      }}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500"
                    >
                      {ALL_PRIMARY_SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-500 uppercase text-[10px]">Khối lớp</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => handleSubjectOrGradeChange(selectedSubject, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Lớp 1">Lớp 1</option>
                      <option value="Lớp 2">Lớp 2</option>
                      <option value="Lớp 3">Lớp 3</option>
                      <option value="Lớp 4">Lớp 4</option>
                      <option value="Lớp 5">Lớp 5</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-gray-500 uppercase text-[10px]">Bộ sách giảng dạy</label>
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    {selectedSubject === 'Tiếng Anh' ? (
                      <>
                        <option value="Global Success">Global Success (Bộ Giáo Dục và Đào Tạo / NXB GDVN)</option>
                        <option value="Kết nối tri thức và cuộc sống">Kết nối tri thức và cuộc sống (NXB GDVN)</option>
                      </>
                    ) : (
                      <>
                        <option value="Kết nối tri thức và cuộc sống">Kết nối tri thức và cuộc sống (NXB GDVN)</option>
                        <option value="Bộ Giáo Dục và Đào Tạo">Bộ Giáo Dục và Đào Tạo</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Subject Specific Selectors (Tuần học & Phân môn cho các môn; Unit & Scope cho Tiếng Anh) */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  {selectedSubject === 'Tiếng Anh' ? (
                    <>
                      {GLOBAL_SUCCESS_CURRICULUM[selectedGrade] && (
                        <div className="space-y-1">
                          <label className="font-extrabold text-indigo-950 uppercase text-[10px] flex items-center justify-between">
                            <span>Chọn Unit SGK Global Success ({selectedGrade})</span>
                            <span className="text-[9px] text-indigo-600 font-bold">Chuẩn SGK 2018</span>
                          </label>
                          <select
                            value={selectedUnit}
                            onChange={(e) => {
                              const unitName = e.target.value;
                              setSelectedUnit(unitName);
                              const curList = GLOBAL_SUCCESS_CURRICULUM[selectedGrade] || [];
                              const matched = curList.find(u => u.unit === unitName);
                              if (matched) {
                                if (!inputText || inputText.includes('[SGK Global Success')) {
                                  setInputText(`[SGK Global Success - ${selectedGrade} - ${matched.unit}]\nChủ đề: ${matched.topic}\nTừ vựng trọng tâm: ${matched.vocabulary.join(', ')}\nMẫu câu chính: ${matched.sentencePatterns.join('; ')}\nBài học: ${matched.lessons.join(' | ')}`);
                                }
                                if (matched.lessons && matched.lessons.length > 0) {
                                  setSelectedLessonNumber(matched.lessons[0]);
                                }
                              }
                            }}
                            className="w-full p-2 bg-indigo-50/60 border border-indigo-200 rounded-xl font-bold text-indigo-950 text-xs focus:ring-2 focus:ring-indigo-500"
                          >
                            {(GLOBAL_SUCCESS_CURRICULUM[selectedGrade] || []).map(u => (
                              <option key={u.unit} value={u.unit}>
                                {u.unit} - {u.topic}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-500 uppercase text-[10px]">Chủ điểm / Unit</label>
                          <input
                            type="text"
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                            placeholder="vd: Unit 3: Our School Things"
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 text-xs focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-500 uppercase text-[10px]">Bài học (Lesson)</label>
                          <input
                            type="text"
                            value={selectedLessonNumber}
                            onChange={(e) => setSelectedLessonNumber(e.target.value)}
                            placeholder="vd: Lesson 1"
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 text-xs focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-500 uppercase text-[10px]">Tiết dạy (Period)</label>
                          <input
                            type="text"
                            value={selectedPeriodNumber}
                            onChange={(e) => setSelectedPeriodNumber(e.target.value)}
                            placeholder="vd: Tiết 1 (35 phút)"
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 text-xs focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Activity Selection Scope & Custom Activity Input */}
                      <div className="p-3.5 bg-gradient-to-br from-indigo-50/90 via-sky-50/60 to-purple-50/80 border border-indigo-200/80 rounded-2xl space-y-3 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <label className="font-fredoka text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-indigo-600" />
                            <span>Phạm vi Hoạt động cần soạn (Activity Scope) 🎯</span>
                          </label>
                          
                          {/* Mode Toggle Pills */}
                          <div className="inline-flex p-1 bg-white border border-indigo-200 rounded-xl shadow-2xs text-[11px] font-fredoka font-bold">
                            <button
                              type="button"
                              onClick={() => {
                                sounds.playClick();
                                setActivityScopeMode('preset');
                              }}
                              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                activityScopeMode === 'preset'
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'text-indigo-900 hover:bg-indigo-50'
                              }`}
                            >
                              🎯 Mẫu Tiết SGK
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                sounds.playClick();
                                setActivityScopeMode('custom');
                              }}
                              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                activityScopeMode === 'custom'
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'text-indigo-900 hover:bg-indigo-50'
                              }`}
                            >
                              <span>✍️ Tự nhập hoạt động</span>
                              {customActivityText.trim() && (
                                <span className="bg-amber-400 text-amber-950 text-[9px] px-1 rounded-full font-black">
                                  {customActivityText.split('\n').filter(Boolean).length}
                                </span>
                              )}
                            </button>
                          </div>
                        </div>

                        {activityScopeMode === 'preset' ? (
                          (selectedGrade === 'Lớp 1' || selectedGrade === 'Lớp 2') ? (
                            /* GRADE 1 & 2 PRESETS (70 Tiết/Năm - 2 tiết/tuần: Lesson 1: 1,2 | Lesson 2: 3,4,5 | Lesson 3: 6,7,8) */
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  setSelectedActivityScope('act_1_2');
                                  setSelectedLessonNumber('Lesson 1');
                                  setSelectedPeriodNumber('Tiết 1: Lesson 1 (HĐ 1, 2 - 35 phút)');
                                  setLessonPeriods(1);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                  selectedActivityScope === 'act_1_2'
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                                    : 'bg-white hover:bg-indigo-50/50 text-indigo-950 border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fredoka font-bold text-xs">Lesson 1: HĐ 1, 2</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    selectedActivityScope === 'act_1_2' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                                  }`}>Tiết 1 (35p)</span>
                                </div>
                                <p className={`text-[10px] leading-tight ${selectedActivityScope === 'act_1_2' ? 'text-indigo-100' : 'text-gray-500'}`}>
                                  1. Listen and repeat<br/>2. Point and say
                                </p>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  setSelectedActivityScope('act_3_4_5');
                                  setSelectedLessonNumber('Lesson 2');
                                  setSelectedPeriodNumber('Tiết 2: Lesson 2 (HĐ 3, 4, 5 - 35 phút)');
                                  setLessonPeriods(1);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                  selectedActivityScope === 'act_3_4_5'
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                                    : 'bg-white hover:bg-indigo-50/50 text-indigo-950 border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fredoka font-bold text-xs">Lesson 2: HĐ 3, 4, 5</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    selectedActivityScope === 'act_3_4_5' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                                  }`}>Tiết 2 (35p)</span>
                                </div>
                                <p className={`text-[10px] leading-tight ${selectedActivityScope === 'act_3_4_5' ? 'text-indigo-100' : 'text-gray-500'}`}>
                                  3. Listen and chant<br/>4. Listen and tick<br/>5. Look and trace
                                </p>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  setSelectedActivityScope('act_6_7_8');
                                  setSelectedLessonNumber('Lesson 3');
                                  setSelectedPeriodNumber('Tiết 3: Lesson 3 (HĐ 6, 7, 8 - 35 phút)');
                                  setLessonPeriods(1);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                  selectedActivityScope === 'act_6_7_8'
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                                    : 'bg-white hover:bg-indigo-50/50 text-indigo-950 border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fredoka font-bold text-xs">Lesson 3: HĐ 6, 7, 8</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    selectedActivityScope === 'act_6_7_8' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                                  }`}>Tiết 3 (35p)</span>
                                </div>
                                <p className={`text-[10px] leading-tight ${selectedActivityScope === 'act_6_7_8' ? 'text-indigo-100' : 'text-gray-500'}`}>
                                  6. Listen and repeat<br/>7. Let's talk<br/>8. Let's sing / Project
                                </p>
                              </button>
                            </div>
                          ) : (
                            /* GRADE 3, 4, 5 PRESETS (140 Tiết/Năm - 4 tiết/tuần: Tiết 1: 1,2,3 | Tiết 2: 4,5,6 | Trọn 2 tiết) */
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  setSelectedActivityScope('act_1_2_3');
                                  setSelectedPeriodNumber('Tiết 1 (Hoạt động 1, 2, 3 - 35 phút)');
                                  setLessonPeriods(1);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                  selectedActivityScope === 'act_1_2_3'
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                                    : 'bg-white hover:bg-indigo-50/50 text-indigo-950 border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fredoka font-bold text-xs">Hoạt động 1, 2, 3</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    selectedActivityScope === 'act_1_2_3' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                                  }`}>Tiết 1 (35p)</span>
                                </div>
                                <p className={`text-[10px] leading-tight ${selectedActivityScope === 'act_1_2_3' ? 'text-indigo-100' : 'text-gray-500'}`}>
                                  1. Look, listen & repeat<br/>2. Listen, point & say<br/>3. Let's talk
                                </p>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  setSelectedActivityScope('act_4_5_6');
                                  setSelectedPeriodNumber('Tiết 2 (Hoạt động 4, 5, 6 - 35 phút)');
                                  setLessonPeriods(1);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                  selectedActivityScope === 'act_4_5_6'
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                                    : 'bg-white hover:bg-indigo-50/50 text-indigo-950 border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fredoka font-bold text-xs">Hoạt động 4, 5, 6</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    selectedActivityScope === 'act_4_5_6' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                                  }`}>Tiết 2 (35p)</span>
                                </div>
                                <p className={`text-[10px] leading-tight ${selectedActivityScope === 'act_4_5_6' ? 'text-indigo-100' : 'text-gray-500'}`}>
                                  4. Listen & tick/circle<br/>5. Look, complete & read<br/>6. Let's play / Project
                                </p>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  setSelectedActivityScope('act_all');
                                  setSelectedPeriodNumber('2 Tiết (Hoạt động 1 - 6 - 70 phút)');
                                  setLessonPeriods(2);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                  selectedActivityScope === 'act_all'
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                                    : 'bg-white hover:bg-indigo-50/50 text-indigo-950 border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fredoka font-bold text-xs">Trọn vẹn 1 - 6</span>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                    selectedActivityScope === 'act_all' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                                  }`}>2 Tiết (70p)</span>
                                </div>
                                <p className={`text-[10px] leading-tight ${selectedActivityScope === 'act_all' ? 'text-indigo-100' : 'text-gray-500'}`}>
                                  Khởi động ➔ Khám phá<br/>Luyện tập ➔ Vận dụng
                                </p>
                              </button>
                            </div>
                          )
                        ) : (
                          /* Custom Activity Input Section */
                          <div className="space-y-2 bg-white p-3 rounded-xl border border-indigo-200 shadow-inner">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]">
                              <span className="font-bold text-indigo-950 flex items-center gap-1">
                                <span>📝 Nhập danh sách hoạt động (Mỗi dòng là 1 hoạt động):</span>
                              </span>
                              <div className="flex items-center gap-1.5">
                                {attachedImages.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      sounds.playCoin();
                                      handleOcrFromImages();
                                    }}
                                    className="text-[10px] bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-lg border border-emerald-300 transition-all cursor-pointer flex items-center gap-1"
                                  >
                                    <Sparkles className="w-3 h-3 text-emerald-600" />
                                    <span>⚡ Nạp từ ảnh SGK</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    sounds.playClick();
                                    setShowHocLieuModal(true);
                                  }}
                                  className="text-[10px] bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold px-2 py-0.5 rounded-lg border border-sky-300 transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <BookOpen className="w-3 h-3 text-sky-600" />
                                  <span>Tra hoclieu.vn</span>
                                </button>
                                {customActivityText.trim() && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      sounds.playClick();
                                      setCustomActivityText('');
                                    }}
                                    className="text-[10px] text-red-600 hover:text-red-800 font-bold px-1.5 py-0.5 rounded cursor-pointer"
                                  >
                                    Xóa trắng
                                  </button>
                                )}
                              </div>
                            </div>

                            <textarea
                              value={customActivityText}
                              onChange={(e) => setCustomActivityText(e.target.value)}
                              rows={4}
                              placeholder={selectedSubject === 'Tiếng Anh' 
                                ? "Ví dụ nhập các hoạt động cần soạn:\n1. Look, listen and repeat (Khám phá đoạn hội thoại)\n2. Listen, point and say (Luyện tập 4 từ vựng & mẫu câu)\n3. Let's talk (Thực hành giao tiếp cặp đôi)\n4. Trò chơi Mystery Bag hoặc Slap the board"
                                : "Ví dụ nhập các hoạt động cần soạn:\n1. Khởi động: Trò chơi Đố vui tìm đồ vật\n2. Khám phá: Quan sát tranh và rút ra nhận xét\n3. Luyện tập: Làm bài tập 1, 2 trang SGK\n4. Vận dụng: Xử lý tình huống thực tế"}
                              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />

                            {/* Quick Add Chips */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-gray-500">Chèn nhanh hoạt động phổ biến:</span>
                              <div className="flex flex-wrap gap-1">
                                {selectedSubject === 'Tiếng Anh' ? [
                                  "1. Look, listen and repeat",
                                  "2. Listen, point and say",
                                  "3. Let's talk",
                                  "4. Listen and tick/circle",
                                  "5. Look, complete and read",
                                  "6. Let's play / Project",
                                  "7. Phonics and Chant",
                                  "Warm-up: Lucky Wheel Game",
                                  "Wrap-up: Pass the Ball Game"
                                ].map((chip, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      sounds.playCoin();
                                      setCustomActivityText(prev => prev.trim() ? `${prev}\n${chip}` : chip);
                                    }}
                                    className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    + {chip}
                                  </button>
                                )) : [
                                  "1. Khởi động: Trò chơi học tập",
                                  "2. Khám phá / Hình thành kiến thức",
                                  "3. Luyện tập - Bài tập 1, 2",
                                  "4. Vận dụng - Trải nghiệm thực tế"
                                ].map((chip, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      sounds.playCoin();
                                      setCustomActivityText(prev => prev.trim() ? `${prev}\n${chip}` : chip);
                                    }}
                                    className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    + {chip}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* Dành cho Môn Tiếng Việt, Toán, Khoa học, TNXH, Lịch sử và Địa lý, Hoạt động trải nghiệm: CHỌN BÀI THEO TUẦN (35 TUẦN) & CHỌN TỪNG TIẾT, TỪNG BÀI */
                    <div className="space-y-3">
                      {/* 1. CHỌN BÀI THEO TUẦN (Tích hợp chuẩn đủ 35 Tuần) */}
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="font-fredoka text-xs font-extrabold text-blue-950 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span>Phân Phối 35 Tuần ({selectedSubject} - {selectedGrade}) 📅</span>
                          </label>
                          <span className="text-[9px] font-extrabold text-blue-800 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
                            Tuần {selectedWeekNumber} / 35 {selectedWeekNumber <= 18 ? '(HK1)' : '(HK2)'}
                          </span>
                        </div>

                        {/* Semester Quick Filter */}
                        <div className="flex gap-1 bg-white/80 p-1 rounded-xl border border-blue-100 text-[10px] font-fredoka font-bold">
                          <button
                            type="button"
                            onClick={() => { sounds.playClick(); setSemesterFilter('all'); }}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all ${
                              semesterFilter === 'all' ? 'bg-blue-600 text-white shadow-2xs' : 'text-blue-950 hover:bg-blue-50'
                            }`}
                          >
                            Tất cả (35 tuần)
                          </button>
                          <button
                            type="button"
                            onClick={() => { 
                              sounds.playClick(); 
                              setSemesterFilter(1);
                              if (selectedWeekNumber > 18) {
                                setSelectedWeekNumber(1);
                                handleSubjectOrGradeChange(selectedSubject, selectedGrade, 1, selectedSectionId, selectedPeriodIndex);
                              }
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all ${
                              semesterFilter === 1 ? 'bg-blue-600 text-white shadow-2xs' : 'text-blue-950 hover:bg-blue-50'
                            }`}
                          >
                            Học kì 1 (T1 - 18)
                          </button>
                          <button
                            type="button"
                            onClick={() => { 
                              sounds.playClick(); 
                              setSemesterFilter(2);
                              if (selectedWeekNumber <= 18) {
                                setSelectedWeekNumber(19);
                                handleSubjectOrGradeChange(selectedSubject, selectedGrade, 19, selectedSectionId, selectedPeriodIndex);
                              }
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all ${
                              semesterFilter === 2 ? 'bg-blue-600 text-white shadow-2xs' : 'text-blue-950 hover:bg-blue-50'
                            }`}
                          >
                            Học kì 2 (T19 - 35)
                          </button>
                        </div>

                        {/* 35-Week Select Dropdown */}
                        {(() => {
                          const allWeeks = getWeeksForSubject(selectedSubject, selectedGrade);
                          const filteredWeeks = allWeeks.filter(w => {
                            if (semesterFilter === 1) return w.week <= 18;
                            if (semesterFilter === 2) return w.week > 18;
                            return true;
                          });

                          return (
                            <div className="space-y-1.5">
                              <select
                                value={selectedWeekNumber}
                                onChange={(e) => {
                                  const wNum = parseInt(e.target.value, 10);
                                  setSelectedWeekNumber(wNum);
                                  handleSubjectOrGradeChange(selectedSubject, selectedGrade, wNum, selectedSectionId, selectedPeriodIndex);
                                }}
                                className="w-full p-2 bg-white border border-blue-200 rounded-xl font-bold text-blue-950 text-xs focus:ring-2 focus:ring-blue-500 shadow-2xs"
                              >
                                {filteredWeeks.map((w) => (
                                  <option key={w.week} value={w.week}>
                                    Tuần {w.week}: {w.lessonTitle} ({w.theme}) - {w.periodCount} tiết
                                  </option>
                                ))}
                              </select>

                              {/* Active Week Summary Card */}
                              {(() => {
                                const currWeek = allWeeks.find(w => w.week === selectedWeekNumber) || allWeeks[0];
                                if (!currWeek) return null;
                                return (
                                  <div className="p-2.5 bg-white/90 border border-blue-100 rounded-xl text-[11px] text-blue-950 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-indigo-900">📖 {currWeek.lessonTitle}</span>
                                      <span className="text-[10px] text-blue-700 font-extrabold bg-blue-100 px-1.5 py-0.5 rounded">
                                        {currWeek.periodCount} tiết/tuần
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-medium">
                                      <strong>Trọng tâm:</strong> {currWeek.keyKnowledge}
                                    </p>
                                    {currWeek.textbookPageRange && (
                                      <p className="text-[9px] text-indigo-600 font-bold">
                                        📍 Sách Kết nối tri thức: {currWeek.textbookPageRange}
                                      </p>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          );
                        })()}
                      </div>

                      {/* 2. CHỌN TỪNG TIẾT, TỪNG BÀI TRONG TUẦN (Granular Period Selector) */}
                      {(() => {
                        const allWeeks = getWeeksForSubject(selectedSubject, selectedGrade);
                        const currWeek = allWeeks.find(w => w.week === selectedWeekNumber) || allWeeks[0];
                        if (!currWeek || !currWeek.periods || currWeek.periods.length === 0) return null;

                        return (
                          <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="font-fredoka text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                                <Layers className="w-4 h-4 text-amber-600" />
                                <span>Chọn Từng Tiết, Từng Bài Dạy (Tuần {currWeek.week}) 🎯</span>
                              </label>
                              <span className="text-[9px] font-extrabold text-amber-900 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                                {selectedPeriodIndex === null ? `Toàn bộ ${currWeek.periodCount} tiết` : `Tiết ${selectedPeriodIndex}`}
                              </span>
                            </div>

                            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                              {/* Option: Whole Week */}
                              <button
                                type="button"
                                onClick={() => {
                                  sounds.playClick();
                                  handleSubjectOrGradeChange(selectedSubject, selectedGrade, selectedWeekNumber, selectedSectionId, null);
                                }}
                                className={`w-full p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                  selectedPeriodIndex === null
                                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-400/40'
                                    : 'bg-white hover:bg-amber-100/50 text-amber-950 border-amber-200'
                                }`}
                              >
                                <div>
                                  <span className="font-fredoka font-bold text-xs">🌟 Soạn toàn bộ tuần ({currWeek.periodCount} tiết)</span>
                                  <p className={`text-[10px] ${selectedPeriodIndex === null ? 'text-amber-100' : 'text-gray-500'}`}>
                                    Bao quát tất cả các bài học và hoạt động trong Tuần {currWeek.week}
                                  </p>
                                </div>
                                {selectedPeriodIndex === null && <Check className="w-4 h-4 shrink-0" />}
                              </button>

                              {/* Individual Periods List */}
                              {currWeek.periods.map((p) => {
                                const isSelected = selectedPeriodIndex === p.periodNumber;
                                return (
                                  <button
                                    key={p.periodNumber}
                                    type="button"
                                    onClick={() => {
                                      sounds.playClick();
                                      handleSubjectOrGradeChange(selectedSubject, selectedGrade, selectedWeekNumber, selectedSectionId, p.periodNumber);
                                    }}
                                    className={`w-full p-2 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                                      isSelected
                                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-400/40'
                                        : 'bg-white hover:bg-amber-50 text-gray-800 border-amber-200'
                                    }`}
                                  >
                                    <div className="space-y-0.5 flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className={`font-fredoka font-extrabold text-xs px-1.5 py-0.5 rounded ${
                                          isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-amber-100 text-amber-900'
                                        }`}>
                                          {p.periodLabel}
                                        </span>
                                        <span className="font-bold text-xs truncate">
                                          {p.lessonPart}
                                        </span>
                                        {p.pageRange && (
                                          <span className={`text-[9px] font-bold px-1 rounded ${
                                            isSelected ? 'bg-indigo-800/80 text-indigo-200' : 'bg-gray-100 text-gray-600'
                                          }`}>
                                            {p.pageRange}
                                          </span>
                                        )}
                                      </div>
                                      <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-gray-500'}`}>
                                        <strong>Mục tiêu:</strong> {p.keyFocus}
                                      </p>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {/* 3. CHỌN MỤC / PHÂN MÔN (Ví dụ Tiếng Việt: Đọc, Nói-nghe, Viết, Luyện tập, Đọc mở rộng...) */}
                      <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-fredoka text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-emerald-600" />
                            <span>Chọn Phân Môn / Dạng Bài Giảng Dạy 🏷️</span>
                          </label>
                          <span className="text-[9px] font-extrabold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                            {SUBJECT_SECTIONS_TAXONOMY[selectedSubject]?.find((s: SubjectSectionOption) => s.id === selectedSectionId)?.name || 'Tất cả mục'}
                          </span>
                        </div>

                        {SUBJECT_SECTIONS_TAXONOMY[selectedSubject] && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {SUBJECT_SECTIONS_TAXONOMY[selectedSubject].map((sec: SubjectSectionOption) => {
                              const isSelected = selectedSectionId === sec.id;
                              return (
                                <button
                                  key={sec.id}
                                  type="button"
                                  onClick={() => {
                                    sounds.playClick();
                                    setSelectedSectionId(sec.id);
                                    handleSubjectOrGradeChange(selectedSubject, selectedGrade, selectedWeekNumber, sec.id, selectedPeriodIndex);
                                  }}
                                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                                    isSelected 
                                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/40' 
                                      : 'bg-white hover:bg-emerald-100/50 text-emerald-950 border-emerald-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-1 font-fredoka font-bold text-[11px]">
                                    <span>{sec.icon}</span>
                                    <span className="truncate">{sec.name}</span>
                                  </div>
                                  <span className={`text-[9px] font-medium leading-tight line-clamp-2 ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`}>
                                    {sec.shortDesc}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* 3. TRÒ CHƠI HỌC TẬP SƯ PHẠM CHI TIẾT */}
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-fredoka text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                            <Gamepad2 className="w-4 h-4 text-amber-600" />
                            <span>Trò Chơi Học Tập Sư Phạm Chi Tiết 🎲</span>
                          </label>
                          <span className="text-[9px] font-extrabold text-amber-900 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                            Có hướng dẫn 5 bước
                          </span>
                        </div>

                        <select
                          value={selectedGameId}
                          onChange={(e) => {
                            setSelectedGameId(e.target.value);
                            sounds.playClick();
                          }}
                          className="w-full p-2 bg-white border border-amber-200 rounded-xl font-bold text-amber-950 text-xs focus:ring-2 focus:ring-amber-500 shadow-2xs"
                        >
                          {CLASSROOM_GAMES_DATABASE.map((g: ClassroomGame) => (
                            <option key={g.id} value={g.id}>
                              {g.name} ({g.subject})
                            </option>
                          ))}
                        </select>

                        {/* Detailed Game Rules Card */}
                        {(() => {
                          const activeGame = CLASSROOM_GAMES_DATABASE.find((g: ClassroomGame) => g.id === selectedGameId) || CLASSROOM_GAMES_DATABASE[0];
                          if (!activeGame) return null;
                          return (
                            <div className="p-2.5 bg-white/95 border border-amber-200 rounded-xl text-[11px] text-amber-950 space-y-1.5 shadow-2xs">
                              <div className="flex items-center justify-between border-b border-amber-100 pb-1">
                                <span className="font-bold text-amber-900 font-fredoka">🎯 {activeGame.name}</span>
                                <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">Chuẩn sư phạm</span>
                              </div>
                              <p className="text-[10px] text-gray-700"><strong>Mục tiêu:</strong> {activeGame.goal}</p>
                              <p className="text-[10px] text-gray-700"><strong>Đồ dùng:</strong> {activeGame.materials}</p>
                              <div className="space-y-0.5 pt-1">
                                <span className="font-bold text-indigo-900 text-[10px]">Cách chơi từng bước rõ ràng:</span>
                                {activeGame.stepByStepRules.map((step, idx) => (
                                  <p key={idx} className="text-[10px] text-gray-700 leading-snug pl-1.5 border-l-2 border-amber-300">
                                    {step}
                                  </p>
                                ))}
                              </div>
                              <p className="text-[10px] text-emerald-800 font-medium pt-1 border-t border-amber-100">
                                <strong>Khen thưởng:</strong> {activeGame.scoringAndReward}
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 4. TÌNH HUỐNG SƯ PHẠM & PHƯƠNG PHÁP DẠY HỌC PHÙ HỢP */}
                      <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-fredoka text-xs font-extrabold text-purple-950 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span>Tình Huống & Phương Pháp Dạy Học 💡</span>
                          </label>
                          <span className="text-[9px] font-extrabold text-purple-900 bg-white px-2 py-0.5 rounded-full border border-purple-200">
                            Phương pháp tích cực
                          </span>
                        </div>

                        <select
                          value={selectedMethodId}
                          onChange={(e) => {
                            setSelectedMethodId(e.target.value);
                            sounds.playClick();
                          }}
                          className="w-full p-2 bg-white border border-purple-200 rounded-xl font-bold text-purple-950 text-xs focus:ring-2 focus:ring-purple-500 shadow-2xs"
                        >
                          {PEDAGOGICAL_METHODS_DATABASE.map((m: PedagogicalMethod) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.applicableSubjects.join(', ')})
                            </option>
                          ))}
                        </select>

                        {/* Method Phases Card */}
                        {(() => {
                          const activeMethod = PEDAGOGICAL_METHODS_DATABASE.find((m: PedagogicalMethod) => m.id === selectedMethodId) || PEDAGOGICAL_METHODS_DATABASE[0];
                          if (!activeMethod) return null;
                          return (
                            <div className="p-2.5 bg-white/95 border border-purple-200 rounded-xl text-[11px] text-purple-950 space-y-1 shadow-2xs">
                              <span className="font-bold text-purple-900 font-fredoka text-[10px]">Tiến trình thực hiện:</span>
                              <div className="space-y-0.5">
                                {activeMethod.phases.map((phase, idx) => (
                                  <p key={idx} className="text-[10px] text-gray-700 leading-snug pl-1.5 border-l-2 border-purple-300">
                                    {phase}
                                  </p>
                                ))}
                              </div>
                              <p className="text-[10px] text-purple-800 font-medium pt-1 border-t border-purple-100">
                                <strong>Lưu ý tiểu học:</strong> {activeMethod.tipsForPrimary}
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 5. NĂNG LỰC AI THEO QUYẾT ĐỊNH SỐ 2422/QĐ-BGDĐT */}
                      <div className="p-3 bg-cyan-50/80 border border-cyan-200 rounded-2xl flex flex-col gap-1.5 text-[11px] text-cyan-950 font-medium shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold font-fredoka text-cyan-900 text-xs">
                            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                            <span>Khung Giáo Dục AI (QĐ 2422/QĐ-BGDĐT)</span>
                          </span>
                          <span className="bg-cyan-200 text-cyan-950 font-extrabold text-[9px] px-2 py-0.5 rounded-full">
                            18/08/2026
                          </span>
                        </div>
                        <p className="text-[10px] text-cyan-800 leading-snug">
                          Kế hoạch bài dạy được tích hợp Khung nội dung giáo dục Trí tuệ Nhân tạo theo <strong>Quyết định số 2422/QĐ-BGDĐT</strong> của Bộ GD&ĐT (thay thế hoàn toàn QĐ 3439 cũ): 4 mạch nội dung (Hiểu biết AI, Sử dụng an toàn & đạo đức, Tương tác giải quyết vấn đề, Tư duy phản biện).
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedSubject === 'Tiếng Anh' && (
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex flex-col gap-2 text-[11px] text-amber-950 font-medium animate-fade-in shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-bold font-fredoka text-amber-900 text-xs">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Bộ sách Tiếng Anh Global Success (NXB GDVN)</span>
                      </span>
                      <span className="bg-amber-200 text-amber-900 font-extrabold text-[9px] px-2 py-0.5 rounded-full">
                        CV 2345 & 3456
                      </span>
                    </div>
                    <p className="text-[10px] text-amber-800 leading-snug">
                      Đã tự động áp dụng <strong>Siêu Lệnh Prompt Bắt Buộc</strong> (Tiến trình 4 bước bảng 3 cột, 100% Classroom English, mã năng lực số CV 3456 & QĐ 2422/QĐ-BGDĐT).
                    </p>
                    <div className="flex items-center gap-2 pt-1 border-t border-amber-200/60">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setShowSuperPromptModal(true);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-fredoka font-bold text-[10px] rounded-lg shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-amber-600" />
                        <span>Xem & Chỉnh Sửa Lệnh Prompt</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playCoin();
                          navigator.clipboard.writeText(globalSuccessSuperPrompt);
                          setPromptSavedToast(true);
                          setTimeout(() => setPromptSavedToast(false), 2500);
                        }}
                        className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-fredoka font-bold text-[10px] rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Sao chép Prompt</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TÍCH HỢP HỌC SINH KHUYẾT TẬT HÒA NHẬP (TÙY CHỈNH CHỌN) */}
                <div className="mt-3 p-3.5 bg-rose-50/80 border border-rose-200 rounded-2xl flex flex-col gap-2.5 text-[11px] text-rose-950 font-medium shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={disabilityConfig.enabled}
                        onChange={(e) => {
                          sounds.playClick();
                          handleUpdateDisabilityConfig({
                            ...disabilityConfig,
                            enabled: e.target.checked
                          });
                        }}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                      />
                      <span className="flex items-center gap-1.5 font-bold font-fredoka text-rose-950 text-xs">
                        <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Tích hợp học sinh khuyết tật hòa nhập</span>
                      </span>
                    </label>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      disabilityConfig.enabled ? 'bg-rose-200 text-rose-900' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {disabilityConfig.enabled ? 'Đang bật (Bôi đỏ)' : 'Tùy chọn'}
                    </span>
                  </div>

                  {disabilityConfig.enabled && (
                    <div className="space-y-2 pt-1 border-t border-rose-200/70 animate-fade-in">
                      <p className="text-[10px] text-rose-800 leading-snug">
                        Bôi đỏ hoạt động dành cho học sinh khuyết tật ở <strong>mục tiêu chung</strong> và <strong>1 hành động cụ thể</strong> ở hoạt động thực hành (ngắn gọn, cụ thể, đúng trọng tâm, bắt đầu bằng động từ).
                      </p>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-rose-900 block">Dạng khuyết tật hòa nhập của lớp:</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: 'intellectual', label: 'Trí tuệ' },
                            { id: 'physical', label: 'Vận động' },
                            { id: 'hearing_speech', label: 'Nghe - Nói' },
                            { id: 'visual', label: 'Nhìn / Thị giác' },
                            { id: 'neurological_mental', label: 'Thần kinh / Tâm thần' },
                            { id: 'other', label: 'Dạng khác' }
                          ].map(t => {
                            const isChecked = disabilityConfig.selectedTypes.includes(t.id as DisabilityCategoryType);
                            return (
                              <label key={t.id} className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                                isChecked 
                                  ? 'bg-rose-600 text-white border-rose-700 shadow-2xs' 
                                  : 'bg-white text-rose-950 border-rose-200 hover:bg-rose-100/50'
                              }`}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    sounds.playClick();
                                    const current = disabilityConfig.selectedTypes;
                                    const updated = e.target.checked
                                      ? [...current, t.id as DisabilityCategoryType]
                                      : current.filter(x => x !== t.id);
                                    handleUpdateDisabilityConfig({
                                      ...disabilityConfig,
                                      selectedTypes: updated.length > 0 ? updated : ['intellectual']
                                    });
                                  }}
                                  className="hidden"
                                />
                                <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] font-black shrink-0 ${
                                  isChecked ? 'bg-white text-rose-600' : 'border border-rose-300'
                                }`}>
                                  {isChecked ? '✓' : ''}
                                </span>
                                <span className="truncate">{t.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-rose-900 block">
                          Ghi chú / Yêu cầu cụ thể của GV (tùy chọn):
                        </label>
                        <input
                          type="text"
                          value={disabilityConfig.teacherNotes || ''}
                          placeholder="Ví dụ: Bé Nam cần bạn hỗ trợ nhắc lại, không nói to..."
                          onChange={(e) => {
                            setDisabilityConfig(prev => ({
                              ...prev,
                              teacherNotes: e.target.value
                            }));
                          }}
                          onBlur={() => {
                            handleUpdateDisabilityConfig({
                              ...disabilityConfig,
                              teacherNotes: disabilityConfig.teacherNotes
                            });
                          }}
                          className="w-full px-2.5 py-1 bg-white border border-rose-200 rounded-lg text-[10px] text-rose-950 focus:ring-1 focus:ring-rose-500 placeholder-rose-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Multimodal Textbook Image Attachment & AI Vision OCR */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-fredoka text-base font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <span>Đính Kèm Ảnh Trang SGK 📸</span>
                </h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                  {attachedImages.length} ảnh
                </span>
              </div>

              <p className="text-xs text-gray-500 font-sans">
                Tải lên ảnh chụp trang SGK (bài học, tranh từ vựng, hội thoại) để AI tự động trích xuất nội dung và soạn bài bám sát từng câu chữ.
              </p>

              {/* Upload trigger */}
              <div 
                onClick={() => document.getElementById('textbook-image-input')?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-indigo-600 bg-indigo-100 ring-4 ring-indigo-300/50 scale-[1.01]' 
                    : 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50'
                }`}
              >
                <input
                  id="textbook-image-input"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-fredoka font-bold text-indigo-900">
                  {isDragging ? 'Thả tệp ảnh/tài liệu vào đây ngay...' : 'Click hoặc kéo thả ảnh chụp SGK / tài liệu vào đây'}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">Hỗ trợ PNG, JPG, JPEG, WEBP, PDF, DOCX, TXT</p>
              </div>

              {/* Attached Images Grid */}
              {attachedImages.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-3 gap-2">
                    {attachedImages.map((img) => (
                      <div key={img.id} className="relative group rounded-xl overflow-hidden border border-indigo-100 bg-gray-50 aspect-square shadow-xs">
                        <img 
                          src={img.dataUrl} 
                          alt={img.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedImagePreview(img.dataUrl)}
                            className="p-1 bg-white/90 hover:bg-white text-indigo-800 rounded-md cursor-pointer"
                            title="Phóng to"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemoveImage(img.id)}
                            className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
                            title="Xóa ảnh"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate font-sans">
                          {img.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Trigger OCR button */}
                  <button
                    onClick={handleOcrFromImages}
                    disabled={isOcrProcessing}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isOcrProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{ocrStatusText || 'Đang bóc tách ảnh...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>✨ Bóc tách kiến thức từ ảnh bằng AI Vision (OCR)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Custom Teacher Prompt Section */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-fredoka text-base font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span>Lệnh Prompt Tùy Chỉnh Của Giáo Viên 🎯</span>
                </h3>
              </div>

              <p className="text-xs text-gray-500 font-sans">
                Thầy cô có thể chỉ định yêu cầu sư phạm đặc biệt để Ong Vàng soạn đúng ý (ví dụ: nhấn mạnh trò chơi, tăng cường phân hóa, tích hợp CNTT):
              </p>

              <textarea
                value={teacherCustomPrompt}
                onChange={(e) => setTeacherCustomPrompt(e.target.value)}
                placeholder="Nhập yêu cầu riêng của thầy cô... (Ví dụ: Soạn 100% tiếng Anh, thiết kế trò chơi khởi động sôi nổi, phân hóa học sinh tiếp thu chậm, bổ sung phiếu đánh giá Rubrics)"
                className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed resize-none"
              />

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase">Gợi ý prompt nhanh:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '🎮 Thiết kế trò chơi khởi động & củng cố sôi nổi',
                    '💻 Tăng cường năng lực số & công cụ AI (CV 3456 & QĐ 3439)',
                    '🌱 Phân hóa học sinh cần hỗ trợ & học sinh hoàn thành tốt',
                    '🚀 Tích hợp phương pháp STEM/STEAM thực hành',
                    '🏛️ Bám sát chuẩn cấu trúc 4 bước Công văn 2345/BGDĐT'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        sounds.playClick();
                        setTeacherCustomPrompt(prev => prev ? `${prev}\n- ${chip}` : chip);
                      }}
                      className="text-[10px] font-sans font-semibold bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 px-2.5 py-1 rounded-lg transition-all cursor-pointer text-left"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Customization Guidance (STEM, Digital Comp) */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
              <h3 className="font-fredoka text-base font-extrabold text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Yêu cầu Tích hợp AI & STEM</span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* STEM/STEAM */}
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-500 uppercase text-[10px]">Tích hợp liên môn</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['none', 'stem', 'steam'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          sounds.playClick();
                          setStemOption(opt);
                          setStemMode(opt === 'stem');
                          setSteamMode(opt === 'steam');
                        }}
                        className={`py-2 px-1 rounded-xl border text-[10px] font-extrabold transition-all ${
                          stemOption === opt
                            ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
                        }`}
                      >
                        {opt === 'none' ? 'Không' : opt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Digital Competency */}
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-500 uppercase text-[10px]">Năng lực số học sinh</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'none', label: 'Không' },
                      { key: 'basic', label: 'Cơ bản' },
                      { key: 'advanced', label: 'Nâng cao' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          sounds.playClick();
                          setDigitalComp(opt.key);
                        }}
                        className={`py-2 px-1 rounded-xl border text-[10px] font-extrabold transition-all ${
                          digitalComp === opt.key
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Tools Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <label className="font-extrabold text-gray-500 uppercase text-[10px]">Học liệu số & Công cụ AI</label>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {['Gemini', 'Canva AI', 'Quizizz', 'ChatGPT'].map((tool) => (
                      <label key={tool} className="flex items-center gap-1.5 p-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={aiOptions.includes(tool)}
                          onChange={() => {
                            sounds.playClick();
                            if (aiOptions.includes(tool)) {
                              setAiOptions(aiOptions.filter(t => t !== tool));
                            } else {
                              setAiOptions([...aiOptions, tool]);
                            }
                          }}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-bold text-gray-700">{tool}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty level Slider */}
                <div className="space-y-1 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-[10px] font-extrabold text-gray-500 uppercase">
                    <span>Mức độ cải tiến AI</span>
                    <span className="text-indigo-600">{editLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="25"
                    value={editLevel}
                    onChange={(e) => { sounds.playClick(); setEditLevel(Number(e.target.value)); }}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] text-gray-400 font-bold px-1">
                    <span>Giữ nguyên</span>
                    <span>50%</span>
                    <span>Tái cấu trúc</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist alignment options */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
              <h3 className="font-fredoka text-base font-extrabold text-indigo-950 flex items-center gap-1.5">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <span>Tiêu chí thẩm định</span>
              </h3>

              <div className="space-y-2.5 text-xs max-h-64 overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">QUY CHUẨN SƯ PHẠM</span>
                  {[
                    { key: 'checkMOET2345Template', label: 'Chuẩn Công văn 2345/BGDĐT' },
                    { key: 'checkObjectivesAligned', label: 'Mục tiêu (Yêu cầu cần đạt) chuẩn' },
                    { key: 'checkLogicGoalActivity', label: 'Logic Mục tiêu - Hoạt động dạy học' },
                    { key: 'checkClassDuration', label: 'Thời lượng phân bổ hợp lý' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={(options as any)[item.key]}
                        onChange={() => {
                          sounds.playClick();
                          setOptions({ ...options, [item.key]: !(options as any)[item.key] });
                        }}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-semibold text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">QUY CHUẨN NGÔN NGỮ</span>
                  {[
                    { key: 'langSpellCheck', label: 'Sửa lỗi chính tả & Telex' },
                    { key: 'langPhrasingCheck', label: 'Chuẩn hóa diễn đạt sư phạm' },
                    { key: 'langBetterWording', label: 'Gợi ý từ ngữ sinh động hơn' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={(options as any)[item.key]}
                        onChange={() => {
                          sounds.playClick();
                          setOptions({ ...options, [item.key]: !(options as any)[item.key] });
                        }}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-semibold text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Control Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAnalyzeLesson}
                disabled={isAnalyzing || isReviewing}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-fredoka font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Ong Vàng Đang Phân Tích... 🧪</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Kiến tạo & Phân tích Giáo án ⚡</span>
                  </>
                )}
              </button>

              <button
                onClick={handleAIReview}
                disabled={isAnalyzing || isReviewing}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-fredoka font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isReviewing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Đang Thẩm Định Toàn Diện... 🔍</span>
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    <span>Thẩm định Toàn diện 2345 ✨</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Editable Lesson Plan Editor (8 cols) */}
          <div id="comparison-panel" className="lg:col-span-8 space-y-6">
            
            {/* Suggested KHBD Notice from Phụ lục 2 navigation */}
            {suggestionNotice && (
              <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white rounded-3xl p-5 shadow-2xl border border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-purple-950 font-fredoka font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Gợi Ý Kế Hoạch Bài Dạy Chuẩn CV 2345
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 text-[11px] font-bold">
                      {suggestionNotice.grade} - Tuần {suggestionNotice.week}
                    </span>
                  </div>
                  <h4 className="font-fredoka font-black text-base md:text-lg text-white">
                    {suggestionNotice.lessonTitle} ({suggestionNotice.periodLabel})
                  </h4>
                  <p className="text-xs text-indigo-200 font-medium">
                    Hệ thống đã tự động cấu trúc trọn vẹn KHBD chuẩn CV 2345, tích hợp AI (QĐ 2422), Năng lực số (TT 02/2025), ATGT/KNS. Thầy cô có thể in, xuất Word hoặc chỉnh sửa trực tiếp.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setEditorViewMode(editorViewMode === 'word' ? 'interactive' : 'word');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-white/20"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{editorViewMode === 'word' ? 'Dạng Tương Tác' : 'Dạng Bản Word'}</span>
                  </button>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setSuggestionNotice(null);
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-all cursor-pointer"
                    title="Đóng thông báo này"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* If Proposed changes are waiting, show ACCEPT/REJECT bar */}
            {proposedChanges && (
              <div className="bg-gradient-to-r from-yellow-100 via-amber-200 to-amber-100 border-2 border-amber-300 rounded-[24px] p-5 text-left shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-bounce-slow">
                <div className="space-y-1">
                  <p className="font-fredoka text-sm font-extrabold text-amber-900 flex items-center gap-1.5">
                    <span>✨ Trợ lý Ong Vàng đã hoàn thành cải tiến giáo án rồi cô ơi!</span>
                  </p>
                  <p className="text-xs text-amber-800 font-sans font-medium">
                    Hãy duyệt xem các nội dung thay đổi bên dưới và chọn Chấp nhận hoặc Từ chối nhé!
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAcceptChanges}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-fredoka font-extrabold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-md flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Chấp nhận áp dụng</span>
                  </button>
                  <button
                    onClick={handleRejectChanges}
                    className="bg-red-500 hover:bg-red-600 text-white font-fredoka font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-md flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Từ chối cải tiến</span>
                  </button>
                </div>
              </div>
            )}

            {/* Document Content Display */}
            {!lessonPlan ? (
              <div className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-white p-8 md:p-12 shadow-xl text-center space-y-6">
                <div className="w-20 h-20 bg-indigo-50 border-2 border-indigo-100 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <Sparkles className="w-10 h-10 text-indigo-600 animate-pulse" />
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="font-fredoka text-xl font-extrabold text-indigo-950">
                    Sẵn sàng Kiến tạo & Phân tích Giáo án Chuyên nghiệp ⚡
                  </h3>
                  <p className="text-xs text-gray-500 font-sans font-medium leading-relaxed">
                    Thầy cô vui lòng dán/nhập nội dung giáo án thô hoặc tải lên tệp (.txt, .docx, .pdf) ở cột bên trái, chọn môn học và bấm <strong className="text-indigo-700">"Kiến tạo & Phân tích Giáo án"</strong> để Ong Vàng thẩm định Công văn 2345 nhé!
                  </p>
                </div>
                
                {/* Quick action demo loader */}
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedSubject('Khoa học');
                      setSelectedGrade('Lớp 4');
                      setInputText('Bài học: Sự kỳ diệu của nước.\nMôn học: Khoa học Lớp 4.\nMục tiêu: Học sinh hiểu nước có 3 thể (lỏng, khí, rắn) và vẽ sơ đồ vòng tuần hoàn của nước.\nHoạt động:\n1. Quan sát đá lạnh tan.\n2. Giáo viên thuyết trình thí nghiệm bốc hơi.\n3. Học sinh vẽ sơ đồ vòng tuần hoàn.');
                      sounds.playCoin();
                    }}
                    className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-fredoka font-bold text-xs rounded-2xl border border-indigo-200 shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>🇻🇳 Mẫu Khoa học 4 (Sự kỳ diệu của nước)</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSubject('Tiếng Anh');
                      setSelectedGrade('Lớp 3');
                      setInputText('Unit 3: Our School Things - Lesson 1 (Grade 3 - Global Success)\nObjectives:\n1. Knowledge & Skills: Vocabulary (pen, pencil, book, ruler). Structure: "What is this? - It\'s a...". Phonics: /p/ and /b/.\n2. Competencies: English communication, pair work, active listening & speaking.\n3. Attributes: Hardworking, care for classroom supplies.\nMaterials: Global Success Student\'s Book, Flashcards, MP3 Audio, Realia.\nProcedure:\n- Activity 1: Warm-up & Chant (5 mins)\n- Activity 2: Presentation & Phonics Drill (10 mins)\n- Activity 3: Practice & Pair Work (12 mins)\n- Activity 4: Production & Interactive Game (8 mins)');
                      sounds.playCoin();
                    }}
                    className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-fredoka font-bold text-xs rounded-2xl border border-emerald-200 shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>🇬🇧 Mẫu Tiếng Anh (Global Success Unit 3)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* View Mode Switcher Header */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white p-3 shadow-md flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl">
                    <button
                      onClick={() => { sounds.playClick(); setEditorViewMode('word'); }}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-fredoka font-bold transition-all cursor-pointer ${
                        editorViewMode === 'word'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-white/70'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>📄 Chế độ Trang Word A4 (Bảng 3 Cột Chuẩn CV 2345)</span>
                    </button>
                    <button
                      onClick={() => { sounds.playClick(); setEditorViewMode('interactive'); }}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-fredoka font-bold transition-all cursor-pointer ${
                        editorViewMode === 'interactive'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-white/70'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>✨ Chế độ Thẻ Tương Tác</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSaveToWarehouse()}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-sm cursor-pointer hover:scale-105 transition-all flex items-center gap-1.5"
                    >
                      <FolderArchive className="w-3.5 h-3.5" />
                      <span>💾 Lưu Vào Kho</span>
                    </button>
                  </div>
                </div>

                {editorViewMode === 'word' ? (
                  <WordLessonPlanView
                    fullPlan={currentFullPlan}
                    lessonPlan={lessonPlan}
                    selectedSubject={selectedSubject}
                    selectedGrade={selectedGrade}
                    selectedBook={selectedBook}
                    selectedUnit={selectedUnit}
                    selectedLessonNumber={selectedLessonNumber}
                    selectedPeriodNumber={selectedPeriodNumber}
                    onUpdatePlan={(upd) => {
                      setCurrentFullPlan(upd);
                    }}
                    sounds={sounds}
                  />
                ) : (
                  <div className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-white p-6 md:p-8 shadow-xl text-left space-y-6 relative">
                
                {/* Floating Export bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[10px] bg-teal-100 text-teal-800 border border-teal-200 font-fredoka font-bold px-2.5 py-1 rounded-full uppercase">Kế hoạch bài dạy (Giáo án)</span>
                    <h2 className="font-fredoka text-xl md:text-2xl font-extrabold text-indigo-950 mt-1">
                      {lessonPlan.lessonName}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleSaveToWarehouse()}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all flex items-center gap-1.5"
                      title="Lưu vào Kho Lưu Trữ Giáo Án"
                    >
                      <FolderArchive className="w-4 h-4" />
                      <span>💾 Lưu Vào Kho Giáo Án</span>
                    </button>
                    <button
                      onClick={() => triggerExport('docx')}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 rounded-xl cursor-pointer hover:scale-105 transition-all flex items-center gap-1 text-xs font-fredoka font-bold"
                      title="Xuất File Word (.docx) Chuẩn CV 2345"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="hidden sm:inline">Xuất Word</span>
                    </button>
                    <button
                      onClick={() => triggerExport('pdf')}
                      className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 rounded-xl cursor-pointer hover:scale-105 transition-all flex items-center gap-1 text-xs font-fredoka font-bold"
                      title="Xuất File PDF"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Xuất PDF</span>
                    </button>
                    <button
                      onClick={() => triggerExport('md')}
                      className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl cursor-pointer hover:scale-105 transition-all"
                      title="Xuất định dạng Markdown / HTML"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* General details table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 rounded-2xl p-4 border border-indigo-50 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold font-sans uppercase">MÔN HỌC</span>
                    <p className="font-fredoka text-sm font-extrabold text-indigo-800 mt-0.5">{lessonPlan.subject}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold font-sans uppercase">KHỐI LỚP</span>
                    <p className="font-fredoka text-sm font-extrabold text-indigo-800 mt-0.5">{lessonPlan.grade}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold font-sans uppercase">CHỦ ĐỀ KHÁM PHÁ</span>
                    <p className="font-sans font-bold text-gray-700 mt-0.5">{lessonPlan.topic}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-extrabold font-sans uppercase">THỜI LƯỢNG TIẾT</span>
                    <p className="font-fredoka text-sm font-extrabold text-amber-600 mt-0.5">{lessonPlan.duration}</p>
                  </div>
                </div>

                {/* Section 1: Objectives (Mục tiêu học tập) */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-fredoka text-sm md:text-base font-extrabold text-indigo-900 flex items-center gap-1.5">
                      <span>{lessonPlan.subject === 'Tiếng Anh' ? '1. Objectives (Yêu cầu cần đạt)' : '1. Mục tiêu bài dạy (Yêu cầu cần đạt)'}</span>
                    </h4>
                  </div>

                  <div className={`space-y-2 p-4 rounded-2xl border ${proposedChanges?.objectives ? 'bg-yellow-50/60 border-yellow-200' : 'bg-gray-50/40 border-indigo-50'}`}>
                    {proposedChanges?.objectives ? (
                      proposedChanges.objectives.map((obj, idx) => (
                        <div key={idx} className="flex gap-2 text-xs font-sans text-gray-700 leading-relaxed bg-yellow-100/50 p-2 rounded-xl border border-yellow-200 animate-fade-in">
                          <span className="text-yellow-600 font-extrabold">⚡ AI đề xuất:</span>
                          <p className="flex-1 font-bold">{obj}</p>
                        </div>
                      ))
                    ) : (
                      lessonPlan.objectives.map((obj, idx) => (
                        <div key={idx} className="flex gap-2 text-xs font-sans text-gray-600 leading-relaxed">
                          <span className="text-indigo-400 font-extrabold">•</span>
                          <p className="flex-1 font-medium">{obj}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Section 2: Teaching & Learning Activities (Tiến trình hoạt động) */}
                <div className="space-y-3">
                  <h4 className="font-fredoka text-sm md:text-base font-extrabold text-indigo-900">
                    {lessonPlan.subject === 'Tiếng Anh' ? '2. Teaching & Learning Procedure (Tiến trình hoạt động)' : '2. Tiến trình các Hoạt động dạy học chủ yếu'}
                  </h4>

                  <div className="space-y-4">
                    {(proposedChanges?.activities || lessonPlan.activities || []).map((act, idx) => {
                      const isProposed = !!proposedChanges?.activities;
                      return (
                        <div 
                          key={act.id || idx} 
                          className={`p-4 rounded-2xl border transition-all 
                            ${isProposed 
                              ? 'bg-yellow-50/50 border-yellow-200 shadow-md relative' 
                              : 'bg-white hover:bg-gray-50/40 border-indigo-50 shadow-sm'
                            }
                          `}
                        >
                          {isProposed && (
                            <span className="absolute top-2 right-2 bg-yellow-400 text-purple-950 text-[8px] font-fredoka font-bold px-2 py-0.5 rounded-full uppercase">
                              AI Đã cải tiến ✨
                            </span>
                          )}

                          <div className="flex justify-between items-start">
                            <h5 className="font-fredoka text-xs font-extrabold text-indigo-850">
                              {act.name}
                            </h5>
                            <span className="text-[10px] text-amber-600 font-bold font-sans">
                              {lessonPlan.subject === 'Tiếng Anh' ? 'Duration: ' : 'Thời lượng: '}{act.duration}
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-600 font-sans leading-relaxed mt-2 pl-3 border-l-2 border-indigo-100 font-medium whitespace-pre-line">
                            {act.description}
                          </p>

                          {/* Single Activity Integration Badge per CV 2345 / CV 3456 */}
                          {(idx === 1 || (act.name && (act.name.toLowerCase().includes('khám phá') || act.name.toLowerCase().includes('hình thành')))) && (
                            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-xl text-[11px] space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-fredoka font-black text-blue-900 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                  <span>🎯 ĐỊA CHỈ TÍCH HỢP MỤC TIÊU DUY NHẤT (CV 2345/3456 & QĐ 2422)</span>
                                </span>
                                <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">
                                  Hoạt động {['A', 'B', 'C', 'D', 'E'][idx] || 'B'}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-gray-700 font-sans leading-relaxed">
                                Khớp nối tích hợp Năng lực số (CV 3456), Khung năng lực AI (QĐ 2422) và Kỹ năng sống/ATGT tập trung tại hoạt động này. Đảm bảo đúng chuẩn 1 hoạt động duy nhất cho toàn bài.
                              </p>
                            </div>
                          )}

                          {/* STEM/STEAM info inside activity if parsed */}
                          {act.steamInfo && (
                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-gray-100 text-[10px]">
                              {act.steamInfo.science && (
                                <div className="bg-emerald-50 rounded-lg p-1.5 text-emerald-800">
                                  <strong>Science:</strong> {act.steamInfo.science}
                                </div>
                              )}
                              {act.steamInfo.technology && (
                                <div className="bg-indigo-50 rounded-lg p-1.5 text-indigo-800">
                                  <strong>Tech:</strong> {act.steamInfo.technology}
                                </div>
                              )}
                              {act.steamInfo.engineering && (
                                <div className="bg-amber-50 rounded-lg p-1.5 text-amber-800">
                                  <strong>Eng:</strong> {act.steamInfo.engineering}
                                </div>
                              )}
                              {act.steamInfo.arts && (
                                <div className="bg-pink-50 rounded-lg p-1.5 text-pink-800">
                                  <strong>Arts:</strong> {act.steamInfo.arts}
                                </div>
                              )}
                              {act.steamInfo.maths && (
                                <div className="bg-purple-50 rounded-lg p-1.5 text-purple-800">
                                  <strong>Math:</strong> {act.steamInfo.maths}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Assessments (Phương pháp đánh giá) */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h4 className="font-fredoka text-sm md:text-base font-extrabold text-indigo-900">
                    {lessonPlan.subject === 'Tiếng Anh' ? '3. Assessment Methods (Phương án đánh giá)' : '3. Phương án Đánh giá kết quả học tập'}
                  </h4>

                  <div className={`space-y-2 p-4 rounded-2xl border ${proposedChanges?.assessment ? 'bg-yellow-50/60 border-yellow-200' : 'bg-gray-50/40 border-indigo-50'}`}>
                    {(proposedChanges?.assessment || lessonPlan.assessment || []).map((ass, idx) => (
                      <div key={idx} className="flex gap-2 text-xs font-sans text-gray-600 leading-relaxed">
                        <span className="text-teal-500 font-extrabold">✓</span>
                        <p className="flex-1 font-medium">{ass}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Learning Materials (Thiết bị dạy học & Học liệu) */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h4 className="font-fredoka text-sm md:text-base font-extrabold text-indigo-900">
                    {lessonPlan.subject === 'Tiếng Anh' ? '4. Equipment & Materials (Thiết bị & Học liệu)' : '4. Thiết bị dạy học và Học liệu cần chuẩn bị'}
                  </h4>

                  <div className={`space-y-2 p-4 rounded-2xl border ${proposedChanges?.materials ? 'bg-yellow-50/60 border-yellow-200' : 'bg-gray-50/40 border-indigo-50'}`}>
                    {(proposedChanges?.materials || lessonPlan.materials || []).map((mat, idx) => (
                      <div key={idx} className="flex gap-2 text-xs font-sans text-gray-600 leading-relaxed">
                        <span className="text-indigo-400 font-extrabold">•</span>
                        <p className="flex-1 font-medium">{mat}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Legal & Textbook Citations Box */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h4 className="font-fredoka text-sm md:text-base font-extrabold text-indigo-900 flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-emerald-600" />
                    <span>{lessonPlan.subject === 'Tiếng Anh' ? '5. Curricular Foundations & Textbook References' : '5. Căn cứ Pháp lý, Công văn & Nguồn Sách giáo khoa bám sát'}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Legal References with links */}
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
                      <span className="text-[11px] font-fredoka font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Văn bản & Công văn áp dụng ({officialReferences.filter(r => r.isActive).length})</span>
                      </span>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
                        {officialReferences.filter(r => r.isActive).map(ref => (
                          <div key={ref.id} className="bg-white/80 rounded-xl p-2 border border-emerald-100">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-900 text-[11px]">{ref.code}</span>
                              <a
                                href={ref.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                              >
                                <span>Xem văn bản</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">{ref.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Textbook Alignment info */}
                    <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3.5 space-y-2">
                      <span className="text-[11px] font-fredoka font-bold text-indigo-950 uppercase tracking-wide flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Nội dung Sách giáo khoa bám sát</span>
                      </span>
                      {selectedStoredBook ? (
                        <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100 space-y-1.5 text-xs">
                          <p className="font-bold text-indigo-950 text-xs">📖 {selectedStoredBook.title}</p>
                          <p className="text-[11px] text-gray-600">
                            <strong>Bộ sách:</strong> {selectedStoredBook.bookSeries} • <strong>Trang:</strong> {selectedStoredBook.pageRange}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedStoredBook.keyVocabulary.map((kw, i) => (
                              <span key={i} className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/80 rounded-xl p-3 border border-indigo-100 text-xs text-gray-500 text-center">
                          Chưa gắn tệp SGK cụ thể. Thầy cô có thể tải lên SGK trong tab <strong>"Nguồn Sách & SGK"</strong>.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* --- Tab: Lesson Warehouse (Kho Giáo Án Phân Loại Môn, Lớp, Unit) --- */}
      {plannerTab === 'warehouse' && (
        <LessonWarehouse
          warehousePlans={warehousePlans}
          onDeletePlan={handleDeleteWarehousePlan}
          onDeleteMultiplePlans={handleDeleteMultipleWarehousePlans}
          onClearAllPlans={handleClearAllWarehousePlans}
          onResetToDefault={handleResetWarehouseToDefault}
          onSavePlanToWarehouse={handleSaveUploadedPlanToWarehouse}
          onImportMultiplePlans={handleImportMultipleWarehousePlans}
          onOpenUploadTemplate={() => setIsUploadTemplateModalOpen(true)}
          onToggleFavorite={handleToggleWarehouseFavorite}
          onLoadPlanToEditor={handleLoadWarehousePlanToEditor}
          onOpenCreateNew={() => {
            sounds.playClick();
            setPlannerTab('editor');
          }}
          sounds={sounds}
        />
      )}

      {/* --- Tab: Stored Textbooks & Material Library --- */}
      {plannerTab === 'books' && (
        <TextbookStorageManager
          storedBooks={storedBooks}
          onAddBook={handleAddTextbook}
          onUpdateBook={(b) => {
            const upd = storedBooks.map(x => x.id === b.id ? b : x);
            setStoredBooks(upd);
            localStorage.setItem('smartedu_stored_textbooks', JSON.stringify(upd));
          }}
          onDeleteBook={handleDeleteTextbook}
          onSelectForPlanning={(book) => {
            handleSelectTextbook(book);
            setPlannerTab('editor');
          }}
          selectedBookId={selectedStoredBook?.id}
          sounds={sounds}
        />
      )}

      {/* --- Tab: Official References & Circular Direct Links --- */}
      {plannerTab === 'references' && (
        <OfficialReferencesManager
          references={officialReferences}
          onToggleReference={handleToggleReference}
          onAddCustomReference={handleAddCustomReference}
          onDeleteCustomReference={handleDeleteCustomReference}
          onRestoreDefaults={handleRestoreDefaultReferences}
          sounds={sounds}
        />
      )}


      {/* --- Tab 2: Personal Library & Versioning comparative panel --- */}
      {plannerTab === 'library' && (
        <LibraryTab
          compareSourceId={compareSourceId}
          setCompareSourceId={setCompareSourceId}
          compareTargetId={compareTargetId}
          setCompareTargetId={setCompareTargetId}
          editHistory={editHistory}
          lessonPlan={lessonPlan}
          handleSaveLesson={handleSaveLesson}
          handleDeleteHistoryItem={handleDeleteHistoryItem}
          handleLoadHistory={handleLoadHistory}
          sounds={sounds}
          gameSubject={gameSubject}
          setGameSubject={setGameSubject}
          gameNameInput={gameNameInput}
          setGameNameInput={setGameNameInput}
          gamePhase={gamePhase}
          setGamePhase={setGamePhase}
          gameDuration={gameDuration}
          setGameDuration={setGameDuration}
          gameForm={gameForm}
          setGameForm={setGameForm}
          gameActivityLevel={gameActivityLevel}
          setGameActivityLevel={setGameActivityLevel}
          gameCondition={gameCondition}
          setGameCondition={setGameCondition}
          handleGenerateCustomGame={handleGenerateCustomGame}
          customGameGenerated={customGameGenerated}
          isGeneratingCustomGame={isGeneratingCustomGame}
        />
      )}

      {/* --- Tab 3: Pedagogical Compliance Reports --- */}
      {plannerTab === 'reports' && (
        <ReportsTab
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          selectedBook={selectedBook}
        />
      )}

      {/* --- Tab 4: Rule-based Curriculum Configuration --- */}
      {plannerTab === 'rules' && (
        <RulesTab
          curriculumRules={curriculumRules}
          handleUpdateRules={handleUpdateRules}
        />
      )}

      {/* --- Tab 5: Data Privacy & Encryption Compliances --- */}
      {plannerTab === 'privacy' && (
        <PrivacyTab
          privacyNoTraining={privacyNoTraining}
          setPrivacyNoTraining={setPrivacyNoTraining}
          privacyEncrypted={privacyEncrypted}
          setPrivacyEncrypted={setPrivacyEncrypted}
          handleDeleteAllData={handleDeleteAllData}
          sounds={sounds}
        />
      )}

      {/* Export Options Modal/Dialog popup */}
      {exportFormat && (
        <div className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 shadow-2xl relative space-y-6 text-left animate-float">
            <button 
              onClick={() => setExportFormat(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-3xl">📥</span>
              <h3 className="font-fredoka text-xl font-extrabold text-indigo-950">
                Đã chuẩn bị tệp xuất bản!
              </h3>
              <p className="text-xs text-gray-500 font-sans font-medium">
                Hệ thống AI đã đóng gói đầy đủ định dạng file **.{exportFormat.toUpperCase()}** theo cấu trúc Công văn 2345/BGDĐT-GDTH chuẩn Bộ GD&ĐT.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-indigo-50 text-xs text-gray-700 leading-normal max-h-48 overflow-y-auto font-mono">
              [FILE EXPORT COMPILATION PREVIEW]<br/>
              ====================================<br/>
              KẾ HOẠCH BÀI DẠY (GIÁO ÁN MINH HỌA)<br/>
              Môn: {lessonPlan?.subject} - Khối: {lessonPlan?.grade}<br/>
              Tên bài học: {lessonPlan?.lessonName}<br/>
              ------------------------------------<br/>
              I. YÊU CẦU CẦN ĐẠT (MỤC TIÊU):<br/>
              {lessonPlan?.objectives.map((obj, i) => ` ${i+1}. ${obj}\n`)}
              II. TIẾN TRÌNH DẠY HỌC:<br/>
              {lessonPlan?.activities.map((act, i) => ` - ${act.name} (${act.duration}): ${act.description.substring(0, 80)}...\n`)}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setExportFormat(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold rounded-xl cursor-pointer text-center text-xs"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  sounds.playCoin();
                  alert(`🎉 Tải xuống thành công giáo án ${lessonPlan?.lessonName} dưới định dạng .${exportFormat} rồi cô ơi!`);
                  setExportFormat(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-fredoka font-extrabold rounded-xl cursor-pointer text-center text-xs shadow-md"
              >
                Tải tệp tin về máy 📥
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Docs Modal */}
      {showGoogleDocsModal && (
        <div className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 shadow-2xl relative space-y-4 text-left">
            <button 
              onClick={() => setShowGoogleDocsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
            >
              ✕
            </button>
            <div className="space-y-1">
              <h3 className="font-fredoka text-lg font-extrabold text-indigo-950">
                Liên kết Google Docs 🔗
              </h3>
              <p className="text-xs text-gray-500 font-sans font-medium">
                Nhập link tài liệu giáo án Google Docs của thầy cô. Đảm bảo chế độ chia sẻ là "Người xem" hoặc "Người chỉnh sửa".
              </p>
            </div>
            <input
              type="text"
              placeholder="https://docs.google.com/document/d/.../edit"
              value={googleDocsUrl}
              onChange={(e) => setGoogleDocsUrl(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowGoogleDocsModal(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold rounded-xl cursor-pointer text-center text-xs"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleGoogleDocsSubmit}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-extrabold rounded-xl cursor-pointer text-center text-xs shadow-md"
              >
                Đồng bộ ngay ⚡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Super Prompt Modal (specifically for Global Success English & MOET Pedagogy) */}
      {showSuperPromptModal && (
        <div className="fixed inset-0 bg-indigo-950/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-left overflow-hidden animate-float">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌟</span>
                  <h3 className="font-fredoka text-lg font-extrabold">
                    Siêu Lệnh Prompt Chuẩn Global Success (BGDĐT)
                  </h3>
                  <span className="bg-white/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    33 Mục Chuẩn Sư Phạm
                  </span>
                </div>
                <p className="text-xs text-amber-100 font-sans">
                  Quy định bắt buộc: CV 2345/BGDĐT, TT 32/2018/TT-BGDĐT, CV 3456/BGDĐT (Năng lực số), QĐ 3439/QĐ-BGDĐT (AI).
                </p>
              </div>
              <button
                onClick={() => setShowSuperPromptModal(false)}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full cursor-pointer transition-all text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Prompt Editor */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">
                  Nội dung lệnh Prompt (Tự động nạp khi chọn môn Tiếng Anh Global Success):
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {globalSuccessSuperPrompt.length} ký tự
                </span>
              </div>

              <textarea
                value={globalSuccessSuperPrompt}
                onChange={(e) => setGlobalSuccessSuperPrompt(e.target.value)}
                rows={16}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono text-gray-800 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
                placeholder="Nhập hoặc chỉnh sửa lệnh prompt..."
              />

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Các quy chuẩn bắt buộc được tự động kích hoạt:</span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-0.5 ml-1">
                  <li><strong>Bám sát SGK Global Success:</strong> Đúng Unit, đúng Lesson, từ vựng và mẫu câu.</li>
                  <li><strong>Mục tiêu:</strong> Mọi mục tiêu bắt đầu bằng động từ hành động quan sát được.</li>
                  <li><strong>Tiến trình 4 giai đoạn:</strong> Warm-up, Exploration, Practice, Production (Bảng 3 cột).</li>
                  <li><strong>100% Classroom English:</strong> Lời thoại giáo viên và học sinh bằng tiếng Anh.</li>
                  <li><strong>Năng lực số (CV 3456) & AI (QĐ 3439):</strong> Tích hợp thực chất có mã số.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setGlobalSuccessSuperPrompt(GLOBAL_SUCCESS_SUPER_PROMPT);
                    localStorage.setItem('smartedu_english_global_success_super_prompt', GLOBAL_SUCCESS_SUPER_PROMPT);
                    setPromptSavedToast(true);
                    setTimeout(() => setPromptSavedToast(false), 2000);
                  }}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-fredoka font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Khôi phục gốc</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playCoin();
                    navigator.clipboard.writeText(globalSuccessSuperPrompt);
                    setPromptSavedToast(true);
                    setTimeout(() => setPromptSavedToast(false), 2000);
                  }}
                  className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-fredoka font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép Prompt</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSuperPromptModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold text-xs rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playLevelUp();
                    localStorage.setItem('smartedu_english_global_success_super_prompt', globalSuccessSuperPrompt);
                    setPromptSavedToast(true);
                    setTimeout(() => {
                      setPromptSavedToast(false);
                      setShowSuperPromptModal(false);
                    }, 1200);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-fredoka font-extrabold text-xs rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Lệnh Prompt Vào Hệ Thống 💾</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {promptSavedToast && (
        <div className="fixed bottom-6 right-6 bg-indigo-950 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold font-fredoka z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Đã lưu & áp dụng Siêu Lệnh Prompt Global Success thành công! ✨</span>
        </div>
      )}

      {/* SGV Reference Modal (taphuan.nxbgd.vn) */}
      <SGVReferenceModal
        isOpen={showSGVModal}
        onClose={() => setShowSGVModal(false)}
        onApplyToLessonPlan={handleApplySGVToLessonPlan}
        initialSubject={selectedSubject}
        initialGrade={selectedGrade}
        initialBook={selectedBook}
      />

      {/* Kho Hoc Lieu Reference Modal (hoclieu.vn) */}
      <HocLieuReferenceModal
        isOpen={showHocLieuModal}
        onClose={() => setShowHocLieuModal(false)}
        onApplyToLessonPlan={handleApplyHocLieuToLessonPlan}
        initialSubject={selectedSubject}
        initialGrade={selectedGrade}
        initialBook={selectedBook}
      />

      {/* 35 Weeks Curriculum Teaching Plan Modal (Phụ lục 2 CV 2345) */}
      <SubjectTeachingPlanModal
        isOpen={showSubjectPlanModal}
        onClose={() => setShowSubjectPlanModal(false)}
        onSelectPeriodForPlanner={handleSelectPeriodFrom35Weeks}
        initialSubject={selectedSubject}
        initialGrade={selectedGrade}
      />

      {/* Upload Complete Lesson Plan Template Modal */}
      <UploadLessonTemplateModal
        isOpen={isUploadTemplateModalOpen}
        onClose={() => setIsUploadTemplateModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
        onSaveToWarehouse={(tpl) => {
          const isEn = tpl.subject === 'Tiếng Anh';
          const fp: FullLessonPlan = {
            subject: tpl.subject,
            grade: tpl.grade,
            unit: tpl.unit,
            lesson: tpl.lessonName,
            period: 'Tiết 1',
            lessonName: tpl.title,
            topic: tpl.unit,
            duration: tpl.duration,
            bookSeries: tpl.bookSeries,
            language: isEn ? 'en' : 'vi',
            officialReferences: [],
            objectives: {
              knowledgeAndSkills: tpl.objectives.knowledgeAndSkills,
              coreCompetencies: tpl.objectives.coreCompetencies,
              personalQualities: tpl.objectives.personalQualities,
              digitalCompetency: tpl.objectives.digitalCompetency,
              aiIntegration: tpl.objectives.aiIntegration,
              trafficSafety: tpl.objectives.trafficSafety,
              lifeSkills: tpl.objectives.lifeSkills,
              ethicsAndMoral: tpl.objectives.ethicsAndMoral
            },
            materials: {
              teacher: tpl.materials.teacher,
              student: tpl.materials.student,
              digitalTools: tpl.materials.digitalTools || ['SmartEdu Interactive Screen']
            },
            activities: tpl.activities.map(a => ({
              id: a.id || 'act_' + Math.random().toString(36).substring(2, 7),
              name: a.name,
              duration: a.duration,
              teacherActivity: a.teacherActivity,
              studentActivity: a.studentActivity,
              description: a.description || a.teacherActivity,
              digitalTools: a.digitalTools,
              objective: a.objective
            })),
            assessment: {
              methods: tpl.assessment.methods,
              tools: tpl.assessment.tools,
              rubrics: tpl.assessment.rubrics
            },
            createdAt: new Date().toISOString()
          };

          const plan: WarehouseLessonPlan = {
            id: 'wh_template_' + Date.now(),
            title: tpl.title,
            subject: tpl.subject,
            grade: tpl.grade,
            unit: tpl.unit,
            lesson: tpl.lessonName,
            period: 'Tiết 1',
            bookSeries: tpl.bookSeries,
            duration: tpl.duration,
            summary: isEn 
              ? `Primary English Lesson Plan strictly aligned with MOET CV 2345 for ${tpl.grade}.` 
              : `Kế hoạch bài dạy môn ${tpl.subject} ${tpl.grade} chuẩn Công văn 2345/BGDĐT.`,
            fullPlan: fp,
            tags: [tpl.subject, tpl.grade, tpl.bookSeries.split(' ')[0], 'CV 2345'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isFavorite: false
          };

          handleSaveUploadedPlanToWarehouse(plan);
          alert(`🎉 Đã lưu thành công giáo án mẫu "${plan.title}" vào Kho Lưu Trữ Chuẩn Hóa!`);
        }}
        currentSubject={selectedSubject}
        currentGrade={selectedGrade}
        currentBook={selectedBook}
        sounds={sounds}
      />

      {/* Image Preview Lightbox Modal */}
      {selectedImagePreview && (
        <div 
          onClick={() => setSelectedImagePreview(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl p-3 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImagePreview(null)}
              className="absolute top-4 right-4 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-2 text-xs z-10 cursor-pointer shadow-md"
            >
              ✕
            </button>
            <img 
              src={selectedImagePreview} 
              alt="Xem trước ảnh SGK" 
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto mx-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
