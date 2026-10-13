/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, Download, Copy, Check, Search, Filter, BookOpen, 
  Sparkles, Layers, Award, CheckCircle2, Globe, Cpu, ShieldAlert, 
  HeartHandshake, Compass, Printer, Edit3, RotateCcw, Eye, 
  ChevronRight, Calendar, Bookmark, FolderOpen, AlertCircle, Share2,
  Tv, Volume2, Gamepad2, Info, Settings2, Sliders, CheckSquare,
  Square, RefreshCw, CheckCircle, HelpCircle, ToggleLeft, ToggleRight
} from 'lucide-react';
import { sounds } from '../lib/audio';
import { getEnglish35Weeks } from '../data/englishCurriculum35Weeks';
import { SubjectCurriculumWeekDetailed } from '../data/full35WeeksCurriculum';
import { 
  CurriculumPlanRow, 
  ActivityScope, 
  PeriodIntegrationOverride, 
  UnitIntegrationOverride,
  AdminDocumentInfo 
} from '../types/curriculum2345';
import { exportCurriculumWordDocument } from '../utils/exportCurriculumWord';
import { getLessonSpecificIntegrations } from '../data/lessonSpecificIntegrations';
import PeriodCustomizerModal from './curriculum/PeriodCustomizerModal';
import CurriculumIntegrationModal from './curriculum/CurriculumIntegrationModal';
import RefreshAppendix2Modal from './curriculum/RefreshAppendix2Modal';
import SGVComprehensiveExplorer from './SGVComprehensiveExplorer';
import FlexibleIntegrationBadgeList, { IntegrationDisplayMode } from './curriculum/FlexibleIntegrationBadgeList';
import FlexibleIntegrationModal from './curriculum/FlexibleIntegrationModal';
import InclusiveClassDisabilitySection from './curriculum/InclusiveClassDisabilitySection';
import { DisabilitySupportConfig } from '../types';
import { 
  FlexibleIntegrationItem, 
  buildFlexibleItemsFromPeriod,
  translateToPedagogicalEnglish
} from '../utils/pedagogicalIntegrationTranslator';

interface EnglishCurriculumPlan2345Props {
  onNavigateToPlanner?: (subject: string, grade: string, week: number, periodIdx: number | null, unitData?: any) => void;
  onNavigateToVocab?: (grade: string, unitTitle: string) => void;
  onNavigateToSGV?: (subject: string, grade: string, week: number) => void;
  onOpenDictionary?: () => void;
}

// Map month for each week
function getMonthForWeek(week: number): string {
  if (week >= 1 && week <= 4) return 'Tháng 9';
  if (week >= 5 && week <= 8) return 'Tháng 10';
  if (week >= 9 && week <= 13) return 'Tháng 11';
  if (week >= 14 && week <= 18) return 'Tháng 12';
  if (week >= 19 && week <= 22) return 'Tháng 1';
  if (week >= 23 && week <= 26) return 'Tháng 2';
  if (week >= 27 && week <= 30) return 'Tháng 3';
  if (week >= 31 && week <= 34) return 'Tháng 4';
  return 'Tháng 5';
}

// Map macro themes in Global Success
function getMacroTheme(week: number, grade: string, unitCode: string): string {
  const uNum = parseInt(unitCode?.replace(/\D/g, '') || '0', 10);
  if (unitCode?.toLowerCase().includes('starter') || week === 1) {
    return 'Làm quen & Khởi động đầu năm';
  }
  if (unitCode?.toLowerCase().includes('review') || unitCode?.toLowerCase().includes('assessment') || unitCode?.toLowerCase().includes('self-check')) {
    return 'Ôn tập & Đánh giá định kỳ';
  }
  
  if (grade === 'Lớp 1' || grade === 'Lớp 2') {
    if (uNum >= 1 && uNum <= 4) return 'Me and my friends';
    if (uNum >= 5 && uNum <= 8) return 'Me and my school';
    if (uNum >= 9 && uNum <= 12) return 'Me and my family';
    if (uNum >= 13 && uNum <= 16) return 'Me and the world around';
    return 'Me and my friends';
  } else {
    // Grade 3, 4, 5
    if (uNum >= 1 && uNum <= 5) return 'Me and my friends';
    if (uNum >= 6 && uNum <= 10) return 'Me and my school';
    if (uNum >= 11 && uNum <= 15) return 'Me and my family';
    if (uNum >= 16 && uNum <= 20) return 'Me and the world around';
    return 'Me and my friends';
  }
}

export default function EnglishCurriculumPlan2345({
  onNavigateToPlanner,
  onNavigateToVocab,
  onNavigateToSGV,
  onOpenDictionary
}: EnglishCurriculumPlan2345Props) {
  // Settings & Filter State
  const [selectedGrade, setSelectedGrade] = useState<'Lớp 1' | 'Lớp 2' | 'Lớp 3' | 'Lớp 4' | 'Lớp 5'>('Lớp 3');
  const [semesterFilter, setSemesterFilter] = useState<'all' | 1 | 2>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExportingWord, setIsExportingWord] = useState<boolean>(false);
  const [isParallelSGVOpen, setIsParallelSGVOpen] = useState<boolean>(false);
  const [sgvSelectedWeek, setSgvSelectedWeek] = useState<number | undefined>(undefined);

  // Administrative info for official Appendix 2 document
  const [schoolName, setSchoolName] = useState<string>(() => localStorage.getItem('smartedu_doc_school') || 'TRƯỜNG TIỂU HỌC NGUYỄN DU');
  const [departmentName, setDepartmentName] = useState<string>(() => localStorage.getItem('smartedu_doc_dept') || 'TỔ CHUYÊN MÔN TIẾNG ANH');
  const [teacherName, setTeacherName] = useState<string>(() => localStorage.getItem('smartedu_doc_teacher') || 'Cô Thanh Nguyễn');
  const [academicYear, setAcademicYear] = useState<string>(() => localStorage.getItem('smartedu_doc_year') || '2024 - 2025');
  const [principalName, setPrincipalName] = useState<string>(() => localStorage.getItem('smartedu_doc_principal') || 'Thầy Nguyễn Văn Nam');
  const [cityDate, setCityDate] = useState<string>(() => localStorage.getItem('smartedu_doc_date') || 'Hà Nội, ngày 28 tháng 08 năm 2024');

  // Integration Selection State
  const [integrationMode, setIntegrationMode] = useState<'all' | 'custom'>('all');
  
  // Set of selected week numbers (1..35) that have integration enabled
  const [selectedIntegratedWeeks, setSelectedIntegratedWeeks] = useState<Set<number>>(() => {
    return new Set<number>(Array.from({ length: 35 }, (_, i) => i + 1));
  });

  // Global default activity scope: 'all' | 'act123' | 'act456'
  const [globalActivityScope, setGlobalActivityScope] = useState<ActivityScope>('all');

  // Toggles for specific integration modules (Global defaults)
  const [enableAI, setEnableAI] = useState<boolean>(true);
  const [enableNLS, setEnableNLS] = useState<boolean>(true);
  const [enableATGT, setEnableATGT] = useState<boolean>(true);
  const [enableKNS, setEnableKNS] = useState<boolean>(true);
  const [enableEthics, setEnableEthics] = useState<boolean>(true);
  const [enableDevices, setEnableDevices] = useState<boolean>(true);

  // Granular Overrides per Unit and per Period with per-grade Persistence
  const [unitOverrides, setUnitOverrides] = useState<Record<string, UnitIntegrationOverride>>(() => {
    try {
      const saved = localStorage.getItem(`smartedu_curriculum_unit_overrides_${selectedGrade}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [periodOverrides, setPeriodOverrides] = useState<Record<number, PeriodIntegrationOverride>>(() => {
    try {
      const saved = localStorage.getItem(`smartedu_curriculum_period_overrides_${selectedGrade}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modals state
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [showRefreshModal, setShowRefreshModal] = useState<boolean>(false);
  const [editingPeriodRow, setEditingPeriodRow] = useState<CurriculumPlanRow | null>(null);
  const [flexibleModalRow, setFlexibleModalRow] = useState<CurriculumPlanRow | null>(null);

  // Inclusive Class & Disability Support Config
  const [disabilityConfig, setDisabilityConfig] = useState<DisabilitySupportConfig>(() => {
    try {
      const saved = localStorage.getItem(`smartedu_disability_config_${selectedGrade}`);
      return saved ? JSON.parse(saved) : {
        enabled: false,
        selectedTypes: ['none'],
        teacherNotes: '',
        studentCount: 0
      };
    } catch {
      return {
        enabled: false,
        selectedTypes: ['none'],
        teacherNotes: '',
        studentCount: 0
      };
    }
  });

  // Persist disability config when changed
  useEffect(() => {
    try {
      localStorage.setItem(`smartedu_disability_config_${selectedGrade}`, JSON.stringify(disabilityConfig));
    } catch (e) {
      // ignore
    }
  }, [disabilityConfig, selectedGrade]);

  // Flexible integration display mode: 'bilingual' | 'english_only' | 'vietnamese_only'
  const [integrationDisplayMode, setIntegrationDisplayMode] = useState<IntegrationDisplayMode>('bilingual');

  // Floating toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync admin info to localStorage
  useEffect(() => {
    localStorage.setItem('smartedu_doc_school', schoolName);
    localStorage.setItem('smartedu_doc_dept', departmentName);
    localStorage.setItem('smartedu_doc_teacher', teacherName);
    localStorage.setItem('smartedu_doc_year', academicYear);
    localStorage.setItem('smartedu_doc_principal', principalName);
    localStorage.setItem('smartedu_doc_date', cityDate);
  }, [schoolName, departmentName, teacherName, academicYear, principalName, cityDate]);

  // Load saved grade-specific customizations when selectedGrade changes
  useEffect(() => {
    try {
      const savedPeriodOverrides = localStorage.getItem(`smartedu_curriculum_period_overrides_${selectedGrade}`);
      if (savedPeriodOverrides) {
        setPeriodOverrides(JSON.parse(savedPeriodOverrides));
      } else {
        setPeriodOverrides({});
      }

      const savedUnitOverrides = localStorage.getItem(`smartedu_curriculum_unit_overrides_${selectedGrade}`);
      if (savedUnitOverrides) {
        setUnitOverrides(JSON.parse(savedUnitOverrides));
      } else {
        setUnitOverrides({});
      }

      const savedMode = localStorage.getItem(`smartedu_curriculum_mode_${selectedGrade}`);
      if (savedMode === 'all' || savedMode === 'custom') {
        setIntegrationMode(savedMode);
      } else {
        setIntegrationMode('all');
      }

      const savedWeeks = localStorage.getItem(`smartedu_curriculum_weeks_${selectedGrade}`);
      if (savedWeeks) {
        setSelectedIntegratedWeeks(new Set(JSON.parse(savedWeeks)));
      } else {
        setSelectedIntegratedWeeks(new Set(Array.from({ length: 35 }, (_, i) => i + 1)));
      }
    } catch (err) {
      console.error('Error loading grade curriculum state:', err);
    }
  }, [selectedGrade]);

  // Persist overrides whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(`smartedu_curriculum_period_overrides_${selectedGrade}`, JSON.stringify(periodOverrides));
    } catch (e) {
      console.error(e);
    }
  }, [periodOverrides, selectedGrade]);

  useEffect(() => {
    try {
      localStorage.setItem(`smartedu_curriculum_unit_overrides_${selectedGrade}`, JSON.stringify(unitOverrides));
    } catch (e) {
      console.error(e);
    }
  }, [unitOverrides, selectedGrade]);

  useEffect(() => {
    try {
      localStorage.setItem(`smartedu_curriculum_mode_${selectedGrade}`, integrationMode);
      localStorage.setItem(`smartedu_curriculum_weeks_${selectedGrade}`, JSON.stringify(Array.from(selectedIntegratedWeeks)));
    } catch (e) {
      console.error(e);
    }
  }, [integrationMode, selectedIntegratedWeeks, selectedGrade]);

  // Load raw 35 weeks curriculum
  const baseCurriculum = useMemo(() => {
    return getEnglish35Weeks(selectedGrade);
  }, [selectedGrade]);

  // Total periods in the year for selected grade
  const totalYearPeriods = selectedGrade === 'Lớp 1' || selectedGrade === 'Lớp 2' ? 70 : 140;

  // Flatten periods into official Appendix 2 format with running periods 1 -> 70 / 140
  const allRows: CurriculumPlanRow[] = useMemo(() => {
    let runningPeriod = 0;
    const rows: CurriculumPlanRow[] = [];

    baseCurriculum.forEach((w) => {
      const month = getMonthForWeek(w.week);
      const macroTheme = getMacroTheme(w.week, selectedGrade, w.unitCode);
      
      const unitOverride = unitOverrides[w.unitCode];
      const isWeekBaseIntegrated = integrationMode === 'all' || selectedIntegratedWeeks.has(w.week);
      const isUnitIntegrated = unitOverride?.isIntegrated !== undefined ? unitOverride.isIntegrated : isWeekBaseIntegrated;

      w.periods.forEach((p, pIdx) => {
        runningPeriod++;
        const currentPeriodNum = runningPeriod;
        const pOverride = periodOverrides[currentPeriodNum];

        // Determine final integration status
        const isPeriodIntegrated = pOverride?.isIntegrated !== undefined 
          ? pOverride.isIntegrated 
          : isUnitIntegrated;

        // Determine activity scope
        const periodScope = pOverride?.activityScope || unitOverride?.activityScope || globalActivityScope;

        // Determine active sub-modules
        const isAIActive = (pOverride?.enableAI !== undefined ? pOverride.enableAI : enableAI) && isPeriodIntegrated;
        const isNLSActive = (pOverride?.enableNLS !== undefined ? pOverride.enableNLS : enableNLS) && isPeriodIntegrated;
        const isATGTActive = (pOverride?.enableATGT !== undefined ? pOverride.enableATGT : enableATGT) && isPeriodIntegrated;
        const isKNSActive = (pOverride?.enableKNS !== undefined ? pOverride.enableKNS : enableKNS) && isPeriodIntegrated;
        const isEthicsActive = (pOverride?.enableEthics !== undefined ? pOverride.enableEthics : enableEthics) && isPeriodIntegrated;
        const isDevicesActive = enableDevices;

        // Scope label
        let scopeLabel = 'Toàn tiết';
        if (periodScope === 'act123') {
          scopeLabel = 'HĐ 1, 2, 3';
        } else if (periodScope === 'act456') {
          scopeLabel = 'HĐ 4, 5, 6';
        }

        // Custom game or TPR activity
        let gameName = 'Trò chơi Slap the board & Simon says';
        if (p.suggestedActivity?.includes('Game') || p.suggestedActivity?.includes('Trò chơi')) {
          gameName = p.suggestedActivity;
        } else if (pIdx % 2 === 0) {
          gameName = 'Trò chơi "Slap the board" / "Whisper Relay"';
        } else {
          gameName = 'Trò chơi "Simon says" / "Lucky Steps Board Game"';
        }

        const integrations = getLessonSpecificIntegrations({
          grade: selectedGrade,
          week: w.week,
          unitCode: w.unitCode,
          lessonTitle: w.lessonTitle,
          periodNumber: currentPeriodNum,
          periodInWeek: pIdx + 1,
          lessonPart: p.lessonPart,
          scope: p.scope,
          vocab: w.keyVocabulary,
          patterns: w.sentencePatternsOrRules,
          activityScope: periodScope
        });

        // Generate comprehensive integrations per period
        const scopePrefix = periodScope === 'act123' 
          ? '[Tích hợp tại HĐ 1, 2, 3 - Khởi động & Khám phá]' 
          : periodScope === 'act456' 
          ? '[Tích hợp tại HĐ 4, 5, 6 - Luyện tập & Vận dụng]' 
          : '[Tích hợp toàn tiết học]';

        const aiIntegration = `🤖 AI (QĐ 2422/QĐ-BGDĐT - ${integrations.aiCode}): ${integrations.aiDesc}`;
        const atgtIntegration = `🚦 ATGT (CV 3456/BGDĐT-GDPT): ${integrations.atgtDesc}`;
        const knsIntegration = `🤝 KNS: ${integrations.knsDesc}`;
        const atgtKnsIntegration = `🚦 ATGT & KNS (CV 3456): ${integrations.atgtDesc} ${integrations.knsDesc}`;
        const ethicsIntegration = `${integrations.ethicsDesc || 'Bồi dưỡng phẩm chất đạo đức theo TT 32/2018/TT-BGDĐT'}`;
        const nlsIntegration = `📱 Năng lực số (TT 02/2025/TT-BGDĐT): ${integrations.nlsDesc}`;
        const devicesIntegration = `📦 Thiết bị & PPDH (TT 32/2018/TT-BGDĐT): ${integrations.devicesDesc}`;

        const detailedStr = `${p.lessonPart} (${p.scope}) + ${gameName}. ${p.keyFocus || ''}`;

        // Note construction based on integration status
        let rowNote = '';
        if (isPeriodIntegrated) {
          rowNote = `CV 2345, QĐ 2422 (AI), TT 02/2025 (NLS), CV 3456 & TT 32/2018.`;
        } else {
          rowNote = `Tiến độ chuẩn SGK Global Success & CV 3456/BGDĐT-GDPT (TT 32/2018/TT-BGDĐT).`;
        }

        // Build flexible custom integration items
        const rowCustomIntegrations: FlexibleIntegrationItem[] = pOverride?.customIntegrations || [
          ...(isPeriodIntegrated && isAIActive ? [{
            id: `ai-${currentPeriodNum}`,
            code: integrations.aiCode || 'TH-AI-01',
            domain: 'ai' as const,
            domainLabelVn: 'Khung GD Trí Tuệ Nhân Tạo (AI)',
            domainLabelEn: 'Artificial Intelligence (AI) Literacy',
            contentVn: integrations.aiDesc,
            contentEn: translateToPedagogicalEnglish(integrations.aiDesc, 'ai'),
            enabled: true
          }] : []),
          ...(isPeriodIntegrated && isNLSActive ? [{
            id: `nls-${currentPeriodNum}`,
            code: 'TH-NLS-01',
            domain: 'nls' as const,
            domainLabelVn: 'Năng lực số (QĐ 2422 & TT 02/2025)',
            domainLabelEn: 'Digital Competence Framework',
            contentVn: integrations.nlsDesc,
            contentEn: translateToPedagogicalEnglish(integrations.nlsDesc, 'nls'),
            enabled: true
          }] : []),
          ...(isPeriodIntegrated ? [{
            id: `gdhn-${currentPeriodNum}`,
            code: 'TH-GDHN-01',
            domain: 'gdhn' as const,
            domainLabelVn: 'Giáo dục hòa nhập (HS khuyết tật - TT 03/2018)',
            domainLabelEn: 'Inclusive Education for Students with Disabilities',
            contentVn: 'Hỗ trợ học sinh khuyết tật nhìn/nghe qua tranh ảnh phóng to, khẩu hình rõ ràng, cử chỉ TPR trực quan và bạn học đồng hành.',
            contentEn: 'Support students with sensory impairments via enlarged visuals, distinct articulation, visual TPR gestures, and peer scaffolding.',
            enabled: true
          }] : []),
          ...(isPeriodIntegrated && isATGTActive ? [{
            id: `atgt-${currentPeriodNum}`,
            code: 'TH-ATGT-01',
            domain: 'atgt' as const,
            domainLabelVn: 'An toàn giao thông (CV 3456)',
            domainLabelEn: 'Traffic Safety Education',
            contentVn: integrations.atgtDesc,
            contentEn: translateToPedagogicalEnglish(integrations.atgtDesc, 'atgt'),
            enabled: true
          }] : []),
          ...(isPeriodIntegrated && isKNSActive ? [{
            id: `kns-${currentPeriodNum}`,
            code: 'TH-KNS-01',
            domain: 'kns' as const,
            domainLabelVn: 'Kỹ năng sống & Tự chủ',
            domainLabelEn: 'Life Skills & Self-Reliance',
            contentVn: integrations.knsDesc,
            contentEn: translateToPedagogicalEnglish(integrations.knsDesc, 'kns'),
            enabled: true
          }] : []),
          ...(isPeriodIntegrated && isEthicsActive && ethicsIntegration ? [{
            id: `ethics-${currentPeriodNum}`,
            code: 'TH-DD-01',
            domain: 'ethics' as const,
            domainLabelVn: 'Giáo dục Đạo đức & 5 Phẩm chất',
            domainLabelEn: 'Moral Education & Five Core Attributes',
            contentVn: ethicsIntegration,
            contentEn: translateToPedagogicalEnglish(ethicsIntegration, 'ethics'),
            enabled: true
          }] : [])
        ];

        rows.push({
          globalIndex: currentPeriodNum,
          week: w.week,
          weekLabel: `Tuần ${w.week}`,
          month,
          semester: w.semester as 1 | 2,
          theme: macroTheme,
          unitCode: w.unitCode,
          lessonTitle: w.lessonTitle,
          periodLabel: `Tiết ${currentPeriodNum}`,
          periodNumber: currentPeriodNum,
          periodInWeek: pIdx + 1,
          detailedContent: detailedStr,
          suggestedGame: gameName,
          pageRange: p.pageRange || w.textbookPageRange || `SGK ${selectedGrade}`,
          isIntegrated: isPeriodIntegrated,
          activityScope: periodScope,
          activityScopeLabel: scopeLabel,
          isAIEnabled: isAIActive,
          isNLSEnabled: isNLSActive,
          isATGTEnabled: isATGTActive,
          isKNSEnabled: isKNSActive,
          isEthicsEnabled: isEthicsActive,
          isDevicesEnabled: isDevicesActive,
          customIntegrations: rowCustomIntegrations,
          adjustment: {
            ai: `${scopePrefix} ${aiIntegration}`,
            atgt: `${scopePrefix} ${atgtIntegration}`,
            kns: `${scopePrefix} ${knsIntegration}`,
            atgt_kns: `${scopePrefix} ${atgtKnsIntegration}`,
            ethics: `${scopePrefix} ${ethicsIntegration}`,
            nls: `${scopePrefix} ${nlsIntegration}`,
            devices: devicesIntegration
          },
          note: rowNote,
          periodIndexInWeek: pIdx
        });
      });
    });

    return rows;
  }, [baseCurriculum, selectedGrade, integrationMode, selectedIntegratedWeeks, unitOverrides, periodOverrides, globalActivityScope, enableAI, enableNLS, enableATGT, enableKNS, enableEthics, enableDevices]);

  // Filtered rows for UI
  const filteredRows = useMemo(() => {
    return allRows.filter((r) => {
      if (semesterFilter !== 'all' && r.semester !== semesterFilter) return false;
      if (themeFilter !== 'all' && r.theme !== themeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.lessonTitle.toLowerCase().includes(q);
        const matchUnit = r.unitCode.toLowerCase().includes(q);
        const matchContent = r.detailedContent.toLowerCase().includes(q);
        const matchTheme = r.theme.toLowerCase().includes(q);
        const matchWeek = r.weekLabel.toLowerCase().includes(q) || `tuần ${r.week}`.includes(q);
        const matchPeriod = r.periodLabel.toLowerCase().includes(q) || `tiết ${r.periodNumber}`.includes(q);
        if (!matchTitle && !matchUnit && !matchContent && !matchTheme && !matchWeek && !matchPeriod) {
          return false;
        }
      }
      return true;
    });
  }, [allRows, semesterFilter, themeFilter, searchQuery]);

  // Distinct Units list for batch toggles
  const distinctUnits = useMemo(() => {
    const map = new Map<string, { unitCode: string; lessonTitle: string; weeks: number[]; semester: number }>();
    baseCurriculum.forEach(w => {
      if (!map.has(w.unitCode)) {
        map.set(w.unitCode, {
          unitCode: w.unitCode,
          lessonTitle: w.lessonTitle,
          weeks: [w.week],
          semester: w.semester
        });
      } else {
        const existing = map.get(w.unitCode)!;
        if (!existing.weeks.includes(w.week)) {
          existing.weeks.push(w.week);
        }
      }
    });
    return Array.from(map.values());
  }, [baseCurriculum]);

  // Stats calculation
  const totalIntegratedPeriodsCount = useMemo(() => {
    return allRows.filter(r => r.isIntegrated).length;
  }, [allRows]);

  const totalIntegratedWeeksCount = useMemo(() => {
    const weeksWithAtLeastOneIntegrated = new Set<number>();
    allRows.forEach(r => {
      if (r.isIntegrated) weeksWithAtLeastOneIntegrated.add(r.week);
    });
    return weeksWithAtLeastOneIntegrated.size;
  }, [allRows]);

  // Toggle integration for a single week
  const toggleWeekIntegration = (weekNum: number) => {
    sounds.playClick();
    setIntegrationMode('custom');
    setSelectedIntegratedWeeks(prev => {
      const next = new Set(prev);
      if (next.has(weekNum)) {
        next.delete(weekNum);
      } else {
        next.add(weekNum);
      }
      return next;
    });
  };

  // Toggle integration for an entire Unit
  const toggleUnitIntegration = (unitCode: string, unitWeeks: number[]) => {
    sounds.playClick();
    setIntegrationMode('custom');
    const currentUnitOverride = unitOverrides[unitCode];
    const isCurrentlyActive = currentUnitOverride?.isIntegrated !== undefined 
      ? currentUnitOverride.isIntegrated 
      : unitWeeks.every(w => selectedIntegratedWeeks.has(w));

    setUnitOverrides(prev => ({
      ...prev,
      [unitCode]: {
        ...prev[unitCode],
        isIntegrated: !isCurrentlyActive
      }
    }));

    setSelectedIntegratedWeeks(prev => {
      const next = new Set(prev);
      if (isCurrentlyActive) {
        unitWeeks.forEach(w => next.delete(w));
      } else {
        unitWeeks.forEach(w => next.add(w));
      }
      return next;
    });
  };

  // Change activity scope for an entire Unit
  const setUnitActivityScope = (unitCode: string, scope: ActivityScope) => {
    sounds.playClick();
    setUnitOverrides(prev => ({
      ...prev,
      [unitCode]: {
        ...prev[unitCode],
        activityScope: scope
      }
    }));
  };

  // Quick Preset Actions
  const handleSelectAllWeeks = () => {
    sounds.playCoin();
    setIntegrationMode('all');
    setSelectedIntegratedWeeks(new Set(Array.from({ length: 35 }, (_, i) => i + 1)));
    setPeriodOverrides({});
    setUnitOverrides({});
  };

  const handleDeselectAllWeeks = () => {
    sounds.playClick();
    setIntegrationMode('custom');
    setSelectedIntegratedWeeks(new Set());
    setPeriodOverrides({});
    setUnitOverrides({});
  };

  const handleSelectMainUnitsOnly = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const mainWeeks = baseCurriculum
      .filter(w => !w.unitCode.toLowerCase().includes('review') && !w.unitCode.toLowerCase().includes('assessment') && !w.unitCode.toLowerCase().includes('self-check'))
      .map(w => w.week);
    setSelectedIntegratedWeeks(new Set(mainWeeks));
  };

  const handleSelectSemester1Only = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const sem1Weeks = baseCurriculum.filter(w => w.semester === 1).map(w => w.week);
    setSelectedIntegratedWeeks(new Set(sem1Weeks));
  };

  const handleSelectSemester2Only = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const sem2Weeks = baseCurriculum.filter(w => w.semester === 2).map(w => w.week);
    setSelectedIntegratedWeeks(new Set(sem2Weeks));
  };

  // Smart Pedagogical Split:
  // Tiết 1, 2 mỗi tuần -> HĐ 1, 2, 3 (Khám phá & Kiến thức mới)
  // Tiết 3, 4 mỗi tuần -> HĐ 4, 5, 6 (Luyện tập & Vận dụng)
  const handleSmartPedagogicalSplit = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const newPeriodOverrides: Record<number, PeriodIntegrationOverride> = {};
    allRows.forEach(r => {
      if (r.periodInWeek <= 2) {
        newPeriodOverrides[r.periodNumber] = {
          ...periodOverrides[r.periodNumber],
          isIntegrated: true,
          activityScope: 'act123'
        };
      } else {
        newPeriodOverrides[r.periodNumber] = {
          ...periodOverrides[r.periodNumber],
          isIntegrated: true,
          activityScope: 'act456'
        };
      }
    });
    setPeriodOverrides(newPeriodOverrides);
    setSelectedIntegratedWeeks(new Set(Array.from({ length: 35 }, (_, i) => i + 1)));
  };

  // Preset: Chỉ tích hợp 1 tiết / tuần (Tiết 1) - Các tiết còn lại dạy chuẩn SGK
  const handleSelectOnePeriodPerWeek = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const newPeriodOverrides: Record<number, PeriodIntegrationOverride> = {};
    allRows.forEach(r => {
      newPeriodOverrides[r.periodNumber] = {
        ...periodOverrides[r.periodNumber],
        isIntegrated: r.periodInWeek === 1
      };
    });
    setPeriodOverrides(newPeriodOverrides);
  };

  // Preset: Chỉ tích hợp 2 tiết đầu / tuần (Tiết 1, 2)
  const handleSelectTwoPeriodsPerWeek = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const newPeriodOverrides: Record<number, PeriodIntegrationOverride> = {};
    allRows.forEach(r => {
      newPeriodOverrides[r.periodNumber] = {
        ...periodOverrides[r.periodNumber],
        isIntegrated: r.periodInWeek <= 2
      };
    });
    setPeriodOverrides(newPeriodOverrides);
  };

  // Preset: Chỉ tích hợp các tiết lẻ (Tiết 1, Tiết 3)
  const handleSelectOddPeriodsOnly = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const newPeriodOverrides: Record<number, PeriodIntegrationOverride> = {};
    allRows.forEach(r => {
      newPeriodOverrides[r.periodNumber] = {
        ...periodOverrides[r.periodNumber],
        isIntegrated: r.periodInWeek % 2 !== 0
      };
    });
    setPeriodOverrides(newPeriodOverrides);
  };

  // Preset: Chỉ tích hợp các tiết chẵn (Tiết 2, Tiết 4)
  const handleSelectEvenPeriodsOnly = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const newPeriodOverrides: Record<number, PeriodIntegrationOverride> = {};
    allRows.forEach(r => {
      newPeriodOverrides[r.periodNumber] = {
        ...periodOverrides[r.periodNumber],
        isIntegrated: r.periodInWeek % 2 === 0
      };
    });
    setPeriodOverrides(newPeriodOverrides);
  };

  // Preset: Loại bỏ tích hợp ở các bài Ôn tập / Kiểm tra (Review / Assessment / Self-check)
  const handleExcludeReviewsAndAssessments = () => {
    sounds.playCoin();
    setIntegrationMode('custom');
    const newPeriodOverrides: Record<number, PeriodIntegrationOverride> = { ...periodOverrides };
    allRows.forEach(r => {
      const isReviewOrExam = 
        r.unitCode.toLowerCase().includes('review') ||
        r.unitCode.toLowerCase().includes('assessment') ||
        r.unitCode.toLowerCase().includes('self-check') ||
        r.lessonTitle.toLowerCase().includes('review') ||
        r.lessonTitle.toLowerCase().includes('kiểm tra') ||
        r.lessonTitle.toLowerCase().includes('đánh giá');
      
      if (isReviewOrExam) {
        newPeriodOverrides[r.periodNumber] = {
          ...newPeriodOverrides[r.periodNumber],
          isIntegrated: false
        };
      }
    });
    setPeriodOverrides(newPeriodOverrides);
  };

  // Batch toggle for a list of period numbers
  const handleBatchSetPeriodsIntegration = (periodNumbers: number[], isIntegrated: boolean) => {
    sounds.playClick();
    setIntegrationMode('custom');
    setPeriodOverrides(prev => {
      const next = { ...prev };
      periodNumbers.forEach(pNum => {
        next[pNum] = {
          ...next[pNum],
          isIntegrated
        };
      });
      return next;
    });
  };

  // Direct 1-click submodule toggling per specific period
  const handleTogglePeriodSubModule = (
    periodNumber: number, 
    moduleKey: 'enableAI' | 'enableNLS' | 'enableATGT' | 'enableKNS' | 'enableEthics'
  ) => {
    sounds.playClick();
    setIntegrationMode('custom');
    
    setPeriodOverrides(prev => {
      const currentOverride = prev[periodNumber] || {};
      
      let currentVal = true;
      if (moduleKey === 'enableAI') {
        currentVal = currentOverride.enableAI !== undefined ? currentOverride.enableAI : enableAI;
      } else if (moduleKey === 'enableNLS') {
        currentVal = currentOverride.enableNLS !== undefined ? currentOverride.enableNLS : enableNLS;
      } else if (moduleKey === 'enableATGT') {
        currentVal = currentOverride.enableATGT !== undefined ? currentOverride.enableATGT : enableATGT;
      } else if (moduleKey === 'enableKNS') {
        currentVal = currentOverride.enableKNS !== undefined ? currentOverride.enableKNS : enableKNS;
      } else if (moduleKey === 'enableEthics') {
        currentVal = currentOverride.enableEthics !== undefined ? currentOverride.enableEthics : enableEthics;
      }

      const newVal = !currentVal;
      const isCurrentlyIntegrated = currentOverride.isIntegrated !== undefined 
        ? currentOverride.isIntegrated 
        : true;

      return {
        ...prev,
        [periodNumber]: {
          ...currentOverride,
          [moduleKey]: newVal,
          isIntegrated: newVal ? true : isCurrentlyIntegrated
        }
      };
    });
  };

  // Reset all custom overrides for this grade back to standard defaults
  const handleResetGradeToDefaults = () => {
    sounds.playClick();
    try {
      localStorage.removeItem(`smartedu_curriculum_period_overrides_${selectedGrade}`);
      localStorage.removeItem(`smartedu_curriculum_unit_overrides_${selectedGrade}`);
      localStorage.removeItem(`smartedu_curriculum_weeks_${selectedGrade}`);
      localStorage.removeItem(`smartedu_curriculum_mode_${selectedGrade}`);
    } catch (e) {
      console.error(e);
    }
    setPeriodOverrides({});
    setUnitOverrides({});
    setIntegrationMode('all');
    setSelectedIntegratedWeeks(new Set(Array.from({ length: 35 }, (_, i) => i + 1)));
  };

  // Reset a specific unit's overrides
  const handleResetSpecificUnit = (unitCode: string) => {
    sounds.playClick();
    setUnitOverrides(prev => {
      const next = { ...prev };
      delete next[unitCode];
      return next;
    });

    // Also clear period overrides belonging to this unit
    const unitRows = allRows.filter(r => r.unitCode === unitCode);
    setPeriodOverrides(prev => {
      const next = { ...prev };
      unitRows.forEach(r => {
        delete next[r.periodNumber];
      });
      return next;
    });
  };

  // Handle presets from Refresh modal
  const handleApplyPresetFromRefresh = (preset: 'all' | 'two_periods' | 'odd_periods' | 'no_reviews') => {
    sounds.playClick();
    if (preset === 'all') {
      handleSelectAllWeeks();
    } else if (preset === 'two_periods') {
      handleSelectTwoPeriodsPerWeek();
    } else if (preset === 'odd_periods') {
      handleSelectOddPeriodsOnly();
    } else if (preset === 'no_reviews') {
      handleExcludeReviewsAndAssessments();
    }
  };

  // Quick 1-click period toggle directly on the table row
  const togglePeriodIntegrationDirectly = (periodNumber: number, currentStatus: boolean) => {
    sounds.playClick();
    setIntegrationMode('custom');
    setPeriodOverrides(prev => ({
      ...prev,
      [periodNumber]: {
        ...prev[periodNumber],
        isIntegrated: !currentStatus
      }
    }));
  };

  // Update a single period's configuration
  const handleUpdatePeriod = (periodNumber: number, updates: PeriodIntegrationOverride) => {
    sounds.playClick();
    setPeriodOverrides(prev => ({
      ...prev,
      [periodNumber]: {
        ...prev[periodNumber],
        ...updates
      }
    }));
  };

  // Tự động chuyển toàn bộ 35 tuần sang Tiếng Anh Sư Phạm đúng chuẩn
  const handleTranslateAllPeriodsToEnglish = () => {
    sounds.playCoin();
    const updatedPeriodOverrides: Record<number, PeriodIntegrationOverride> = { ...periodOverrides };
    allRows.forEach(row => {
      const items = row.customIntegrations && row.customIntegrations.length > 0
        ? row.customIntegrations
        : buildFlexibleItemsFromPeriod(row);
      
      const translatedItems = items.map(item => ({
        ...item,
        contentEn: translateToPedagogicalEnglish(item.contentVn, item.domain)
      }));

      updatedPeriodOverrides[row.periodNumber] = {
        ...updatedPeriodOverrides[row.periodNumber],
        customIntegrations: translatedItems
      };
    });

    setPeriodOverrides(updatedPeriodOverrides);
    showToast('🌐 Đã tự động chuyển đổi toàn bộ 35 tuần sang Tiếng Anh Sư Phạm đúng chuẩn Bộ GD&ĐT!');
  };

  // Copy TSV for Excel / Google Sheets
  const handleCopyTSV = () => {
    sounds.playCoin();
    const headers = [
      'Tuần/ Tháng',
      'Chủ đề/ Mạch nội dung',
      'Tên bài học',
      'Nội dung chi tiết (Hoạt động & Trò chơi)',
      'Tiết học (Thời lượng)',
      'Phạm vi hoạt động tích hợp',
      'Nội dung điều chỉnh, bổ sung (AI QĐ 2422, NLS TT 02/2025, ATGT CV 3456, KNS, Đạo đức TT 32, Thiết bị TT 32)',
      'Ghi chú (Căn cứ pháp lý)'
    ].join('\t');

    const lines = filteredRows.map((r) => {
      const col1 = `${r.weekLabel} (${r.month})`;
      const col2 = r.theme;
      const col3 = r.lessonTitle;
      const col4 = r.detailedContent.replace(/\t|\n/g, ' ');
      const col5 = r.periodLabel;
      const col6_scope = r.isIntegrated 
        ? (r.activityScope === 'act123' ? 'Hoạt động 1, 2, 3' : r.activityScope === 'act456' ? 'Hoạt động 4, 5, 6' : 'Tất cả hoạt động trong tiết')
        : 'Theo chuẩn SGK (Không tích hợp)';
      
      let col7 = '';
      if (r.isIntegrated) {
        const parts: string[] = [];
        if (r.isAIEnabled) parts.push(r.adjustment.ai);
        if (r.isNLSEnabled) parts.push(r.adjustment.nls);
        if (r.isATGTEnabled) parts.push(r.adjustment.atgt);
        if (r.isKNSEnabled) parts.push(r.adjustment.kns);
        if (r.isEthicsEnabled && r.adjustment.ethics) parts.push(r.adjustment.ethics);
        if (r.isDevicesEnabled) parts.push(r.adjustment.devices);
        col7 = parts.join(' | ').replace(/\t|\n/g, ' ');
      } else {
        col7 = 'Thực hiện theo tiến độ chuẩn SGK Global Success & CV 3456/BGDĐT-GDPT; Thiết bị: SGK, File Audio, Flashcards (TT 32/2018/TT-BGDĐT)';
      }

      const col8 = r.note.replace(/\t|\n/g, ' ');

      return [col1, col2, col3, col4, col5, col6_scope, col7, col8].join('\t');
    });

    const fullTsv = `${headers}\n${lines.join('\n')}`;
    navigator.clipboard.writeText(fullTsv);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Export official Word document (.doc) with Phụ lục 2 formatting
  const handleExportWord = () => {
    sounds.playSuccess();
    setIsExportingWord(true);
    try {
      exportCurriculumWordDocument({
        rows: filteredRows,
        selectedGrade,
        semesterFilter,
        adminInfo: {
          schoolName,
          departmentName,
          teacherName,
          academicYear,
          principalName,
          cityDate
        }
      });
    } catch (err) {
      console.error('Word export error:', err);
    } finally {
      setIsExportingWord(false);
    }
  };

  // Print directly
  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const themesList = [
    'Tất cả mạch nội dung',
    'Me and my friends',
    'Me and my school',
    'Me and my family',
    'Me and the world around',
    'Làm quen & Khởi động đầu năm',
    'Ôn tập & Đánh giá định kỳ'
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 animate-fadeIn">
      
      {/* 1. Header Banner & Action Bar */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-950 rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-purple-950 font-fredoka font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Chuẩn Phụ Lục 2 Công Văn 2345/BGDĐT-GDTH
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/40 text-[11px] font-bold">
                🤖 AI QĐ 2422/QĐ-BGDĐT
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 text-[11px] font-bold">
                📱 Năng Lực Số TT 02/2025/TT-BGDĐT
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 text-[11px] font-bold">
                📖 CV 3456 & TT 32/2018
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-fredoka font-black tracking-wide text-white drop-shadow-md">
              Kế Hoạch Dạy Học Môn Tiếng Anh (Global Success)
            </h1>
            <p className="text-sm text-indigo-200 font-medium max-w-3xl leading-relaxed">
              Biểu mẫu khung phân phối 35 tuần theo chuẩn Phụ lục 2 CV 2345/BGDĐT-GDTH, tích hợp linh hoạt Giáo dục Trí tuệ nhân tạo (QĐ 2422), Năng lực số (TT 02/2025), An toàn giao thông & Kỹ năng sống (CV 3456 & TT 32/2018).
            </p>
          </div>

          {/* Quick Export & Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Tra Cứu SGV Song Song Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsParallelSGVOpen(!isParallelSGVOpen);
              }}
              className={`px-4 py-2.5 rounded-2xl font-fredoka font-extrabold text-xs md:text-sm shadow-xl border transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                isParallelSGVOpen
                  ? 'bg-emerald-400 text-emerald-950 border-emerald-300 ring-2 ring-emerald-300'
                  : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/40'
              }`}
              title="Mở giao diện tra cứu Sách giáo viên SGV song song để vừa xem SGV vừa soạn Phụ lục 2"
            >
              <BookOpen className="w-4 h-4 text-emerald-100" />
              <span>{isParallelSGVOpen ? 'Đang Mở SGV Song Song 📖' : 'Tra Cứu SGV Song Song 📖'}</span>
            </button>

            {/* Làm Mới Phụ Lục 2 Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowRefreshModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-fredoka font-black text-xs md:text-sm shadow-xl border border-rose-300 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              title="Làm mới hoặc chuẩn hóa lại nội dung tích hợp Phụ lục 2 theo từng Unit và Tiết học"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Làm Mới Phụ Lục 2 🔄</span>
            </button>

            {/* Custom Integration Selector Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowConfigModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-fredoka font-black text-xs md:text-sm shadow-xl border border-amber-300 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              title="Mở bảng chọn Tuần, Unit, Tiết hoặc phạm vi hoạt động 1-2-3 / 4-5-6"
            >
              <Sliders className="w-4 h-4 text-purple-900" />
              <span>Tùy Chọn Tích Hợp ({totalIntegratedWeeksCount}/35 Tuần)</span>
            </button>

            {/* Export Word */}
            <button
              onClick={handleExportWord}
              disabled={isExportingWord}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-fredoka font-bold text-xs md:text-sm shadow-xl hover:shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
              title="Xuất file Word .doc chuẩn văn bản hành chính Phụ lục 2 kèm chữ ký"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              <span>{isExportingWord ? 'Đang xuất Word...' : 'Xuất Word (.doc)'}</span>
            </button>

            {/* Copy TSV for Excel */}
            <button
              onClick={handleCopyTSV}
              className={`px-4 py-2.5 rounded-2xl font-fredoka font-bold text-xs md:text-sm shadow-xl border transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95
                ${isCopied 
                  ? 'bg-emerald-500 text-white border-emerald-400' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }
              `}
              title="Sao chép toàn bộ bảng (TSV) để dán 1-click vào Excel / Google Sheets"
            >
              {isCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-indigo-300" />}
              <span>{isCopied ? 'Đã copy Excel!' : 'Copy Excel (TSV)'}</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              title="In trực tiếp hoặc Lưu PDF (Khổ A4 Ngang)"
            >
              <Printer className="w-4 h-4 text-indigo-200" />
              <span className="hidden sm:inline">In / PDF</span>
            </button>

            {/* Open Dictionary */}
            {onOpenDictionary && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenDictionary();
                }}
                className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-indigo-200 font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Mở tra cứu Từ điển Tiếng Anh 400+ từ chuẩn GS"
              >
                <BookOpen className="w-4 h-4 text-cyan-300" />
                <span className="hidden sm:inline">Từ Điển GS</span>
              </button>
            )}
          </div>
        </div>

        {/* Grade Selection Pills */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Chọn Khối Lớp:</span>
            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-2xl border border-white/10">
              {(['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] as const).map((grade) => {
                const isSelected = selectedGrade === grade;
                const periodsCount = (grade === 'Lớp 1' || grade === 'Lớp 2') ? '70 tiết' : '140 tiết';
                return (
                  <button
                    key={grade}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedGrade(grade);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5
                      ${isSelected 
                        ? 'bg-amber-400 text-purple-950 shadow-md scale-105' 
                        : 'text-indigo-100 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <span>{grade}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-purple-950/20 text-purple-900' : 'bg-white/10 text-indigo-200'}`}>
                      {periodsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick stats & status */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-200">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              <span>35 tuần ({totalYearPeriods} tiết)</span>
            </div>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <div className="flex items-center gap-1 text-emerald-300 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đang tích hợp: {totalIntegratedWeeksCount}/35 tuần ({totalIntegratedPeriodsCount} tiết)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Integration Settings Strip */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200 dark:border-amber-800">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-fredoka text-base font-bold text-slate-800 dark:text-slate-100">
                  Cấu Hình Tích Hợp Nhanh
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${integrationMode === 'all' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'}`}>
                  {integrationMode === 'all' ? '🌟 Tích hợp Tất cả 35 Tuần' : `🎯 Tùy chọn (${selectedIntegratedWeeks.size}/35 Tuần)`}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Bật/tắt AI (QĐ 2422), NLS (TT 02/2025), ATGT/KNS (CV 3456) và chọn phạm vi hoạt động cho từng tuần/tiết.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSmartPedagogicalSplit}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-fredoka font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              title="Tiết 1, 2: Tích hợp HĐ 1-2-3; Tiết 3, 4: Tích hợp HĐ 4-5-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phân bổ sư phạm chuẩn</span>
            </button>

            <button
              onClick={handleSelectAllWeeks}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Tất cả 35 Tuần</span>
            </button>

            <button
              onClick={handleSelectMainUnitsOnly}
              className="px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 cursor-pointer"
            >
              <span>Chỉ Unit chính</span>
            </button>

            <button
              onClick={() => setShowConfigModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Mở cài đặt chi tiết...</span>
            </button>

            {(Object.keys(periodOverrides).length > 0 || Object.keys(unitOverrides).length > 0) && (
              <button
                onClick={handleResetGradeToDefaults}
                className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-rose-200 dark:border-rose-800"
                title="Khôi phục phân phối tích hợp mặc định cho khối lớp này"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục mặc định</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Module Toggles & Scope Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-bold text-slate-700 dark:text-slate-300">Thành phần chung:</span>
            
            <button
              onClick={() => setEnableAI(!enableAI)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 cursor-pointer border ${enableAI ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300' : 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800 opacity-60'}`}
            >
              {enableAI ? <CheckSquare className="w-3.5 h-3.5 text-blue-600" /> : <Square className="w-3.5 h-3.5" />}
              <span>🤖 AI (QĐ 2422)</span>
            </button>

            <button
              onClick={() => setEnableNLS(!enableNLS)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 cursor-pointer border ${enableNLS ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800 opacity-60'}`}
            >
              {enableNLS ? <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> : <Square className="w-3.5 h-3.5" />}
              <span>📱 Năng lực số (TT 02)</span>
            </button>

            <button
              onClick={() => setEnableATGT(!enableATGT)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 cursor-pointer border ${enableATGT ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800 opacity-60'}`}
            >
              {enableATGT ? <CheckSquare className="w-3.5 h-3.5 text-rose-600" /> : <Square className="w-3.5 h-3.5" />}
              <span>🚦 ATGT (CV 3456)</span>
            </button>

            <button
              onClick={() => setEnableKNS(!enableKNS)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 cursor-pointer border ${enableKNS ? 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300' : 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800 opacity-60'}`}
            >
              {enableKNS ? <CheckSquare className="w-3.5 h-3.5 text-purple-600" /> : <Square className="w-3.5 h-3.5" />}
              <span>🤝 KNS</span>
            </button>

            {Object.keys(periodOverrides).length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-[10px] font-black border border-indigo-200 dark:border-indigo-800">
                🎯 {Object.keys(periodOverrides).length} tiết tùy chỉnh riêng
              </span>
            )}
          </div>

          {/* Quick Scope selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 px-1.5">Phạm vi chung:</span>
            <button
              onClick={() => setGlobalActivityScope('act123')}
              className={`px-2 py-0.5 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${globalActivityScope === 'act123' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
            >
              HĐ 1-2-3
            </button>
            <button
              onClick={() => setGlobalActivityScope('act456')}
              className={`px-2 py-0.5 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${globalActivityScope === 'act456' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
            >
              HĐ 4-5-6
            </button>
            <button
              onClick={() => setGlobalActivityScope('all')}
              className={`px-2 py-0.5 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${globalActivityScope === 'all' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Toàn tiết
            </button>
          </div>
        </div>

        {/* Row 3: Flexible Integration & Pedagogical English Translation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Hiển thị nội dung tích hợp:</span>
            </span>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {[
                { id: 'bilingual' as const, label: '🇻🇳 🇬🇧 Song ngữ Anh - Việt' },
                { id: 'english_only' as const, label: '🇬🇧 Tiếng Anh Sư Phạm' },
                { id: 'vietnamese_only' as const, label: '🇻🇳 Tiếng Việt' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setIntegrationDisplayMode(opt.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    integrationDisplayMode === opt.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-900 dark:text-indigo-200 shadow-xs border border-indigo-200 dark:border-indigo-800 font-fredoka'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTranslateAllPeriodsToEnglish}
              className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-fredoka font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              title="Tự động dịch toàn bộ nội dung tích hợp của 35 tuần sang Tiếng Anh Sư Phạm chuẩn Bộ GD&ĐT"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Dịch Toàn Bộ 35 Tuần Sang Tiếng Anh Sư Phạm 🌐</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Administrative Settings (Collapsible / Clean) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <h3 className="font-fredoka text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              Thông tin phê duyệt hành chính (Tự động xuất vào file Word Phụ lục 2)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium italic">Tự động lưu vào máy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Tên Trường Tiểu Học:</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="VD: TRƯỜNG TIỂU HỌC NGUYỄN DU"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Tổ Chuyên Môn:</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="VD: TỔ CHUYÊN MÔN TIẾNG ANH"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Giáo Viên Lập Kế Hoạch:</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="VD: Cô Thanh Nguyễn"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Năm Học:</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="VD: 2024 - 2025"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Hiệu Trưởng / BGH Duyệt:</label>
            <input
              type="text"
              value={principalName}
              onChange={(e) => setPrincipalName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="VD: Thầy Nguyễn Văn Nam"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Địa Danh & Ngày Lập:</label>
            <input
              type="text"
              value={cityDate}
              onChange={(e) => setCityDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="VD: Hà Nội, ngày 28 tháng 08 năm 2024"
            />
          </div>
        </div>
      </div>

      {/* 4. Filters & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Semester selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => {
              sounds.playClick();
              setSemesterFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer
              ${semesterFilter === 'all' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            Cả năm (35 tuần)
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setSemesterFilter(1);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer
              ${semesterFilter === 1 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            Học kỳ 1 (Tuần 1-18)
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setSemesterFilter(2);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer
              ${semesterFilter === 2 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            Học kỳ 2 (Tuần 19-35)
          </button>
        </div>

        {/* Theme select & Search Input */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-2xl justify-end">
          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {themesList.map((t) => (
              <option key={t} value={t === 'Tất cả mạch nội dung' ? 'all' : t}>
                {t}
              </option>
            ))}
          </select>

          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo Unit, tiết, trò chơi, tuần..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'}`}
              title="Dạng Bảng Phụ lục 2 chuẩn"
            >
              Bảng CV 2345
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'cards' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'}`}
              title="Dạng Thẻ Tuần Học"
            >
              Thẻ Tuần
            </button>
          </div>
        </div>
      </div>

      {/* Parallel SGV Lookup Panel */}
      {isParallelSGVOpen && (
        <div className="bg-emerald-950/20 p-2.5 md:p-4 rounded-3xl border-2 border-emerald-400/50 shadow-2xl space-y-2">
          <div className="flex items-center justify-between px-2 text-white">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-emerald-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                📖 Tra Cứu SGV Song Song Đang Mở
              </span>
              <span className="text-xs text-emerald-100 hidden sm:inline">
                Tra cứu mục tiêu, trò chơi, câu hỏi gợi mở của SGV trong khi xem và hoàn thiện Kế hoạch dạy học Phụ lục 2.
              </span>
            </div>
            <button
              onClick={() => setIsParallelSGVOpen(false)}
              className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-xl cursor-pointer"
            >
              Đóng tra cứu SGV ✕
            </button>
          </div>
          <SGVComprehensiveExplorer 
            embeddedMode={true}
            initialSubject="Tiếng Anh"
            initialGrade={selectedGrade}
            initialWeek={sgvSelectedWeek}
            onCloseEmbedded={() => setIsParallelSGVOpen(false)}
            onNavigateToPlanner={(params) => {
              if (onNavigateToPlanner) {
                onNavigateToPlanner(params.subject, params.grade, params.week, null, params.entry);
              }
            }}
          />
        </div>
      )}

      {/* Chế độ Lớp học Hòa nhập & Hỗ trợ Học sinh khuyết tật (Mode 1 CV 2345 vs Mode 2 Inclusive) */}
      <InclusiveClassDisabilitySection
        config={disabilityConfig}
        onChange={setDisabilityConfig}
        grade={selectedGrade}
      />

      {/* 5. Main Plan Table (Standardized Appendix 2 CV 2345 Layout) */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          
          {/* Table Header Description Bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Hiển thị: <strong className="text-indigo-600 dark:text-indigo-400">{filteredRows.length}</strong> / {totalYearPeriods} tiết học ({selectedGrade} - Global Success)
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> 🤖 AI (QĐ 2422)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 📱 Năng lực số (TT 02)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> 🚦 ATGT (CV 3456)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> 🤝 KNS</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-indigo-900 text-white text-[11px] font-fredoka uppercase tracking-wider">
                  <th rowSpan={2} className="p-3 border border-indigo-800 text-center w-20">
                    Tuần, tháng
                  </th>
                  <th colSpan={4} className="p-2.5 border border-indigo-800 text-center bg-indigo-950/80 text-cyan-200">
                    CHƯƠNG TRÌNH VÀ SÁCH GIÁO KHOA TIẾNG ANH – GLOBAL SUCCESS
                  </th>
                  <th rowSpan={2} className="p-3 border border-indigo-800 text-center w-96 bg-amber-950/40 text-amber-200">
                    Nội dung điều chỉnh, bổ sung (nếu có)<br/>
                    <span className="text-[10px] font-normal normal-case opacity-90">(Tích hợp AI QĐ 2422, NLS TT 02/2025, ATGT & KNS CV 3456, Thiết bị TT 32)</span>
                  </th>
                  <th rowSpan={2} className="p-3 border border-indigo-800 text-center w-28">
                    Ghi chú & Thao tác
                  </th>
                </tr>
                <tr className="bg-indigo-800 text-indigo-100 text-[11px] font-bold">
                  <th className="p-2.5 border border-indigo-700 text-center w-36">Chủ đề/ Mạch nội dung</th>
                  <th className="p-2.5 border border-indigo-700 text-center w-48">Tên bài học</th>
                  <th className="p-2.5 border border-indigo-700 text-center">Nội dung chi tiết<br/><span className="text-[10px] font-normal opacity-90">(Hoạt động SGK & Trò chơi lớp học)</span></th>
                  <th className="p-2.5 border border-indigo-700 text-center w-24">Tiết học/<br/>Thời lượng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="font-bold text-sm">Không tìm thấy tiết học phù hợp với bộ lọc.</p>
                      <p className="text-xs mt-1">Hãy thử xóa từ khóa tìm kiếm hoặc chọn "Tất cả mạch nội dung".</p>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((r) => {
                    const isEvenRow = Math.floor(r.globalIndex / 2) % 2 === 0;

                    return (
                      <tr 
                        key={r.globalIndex}
                        className={`transition-colors hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 ${
                          isEvenRow ? 'bg-slate-50/40 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-900'
                        }`}
                      >
                        {/* 1. Tuần / Tháng & Toggle */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 text-center align-middle font-bold text-slate-700 dark:text-slate-200">
                          <span className="block text-indigo-700 dark:text-indigo-400 font-black">{r.weekLabel}</span>
                          <span className="text-[10px] text-slate-500 font-normal block">({r.month})</span>
                          
                          {/* Inline Toggle Button for this week */}
                          <button
                            onClick={() => toggleWeekIntegration(r.week)}
                            className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer block mx-auto border ${
                              r.isIntegrated 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' 
                                : 'bg-slate-100 text-slate-400 border-slate-300 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700'
                            }`}
                            title="Bật/Tắt tích hợp AI & Năng lực số cho tuần này"
                          >
                            {r.isIntegrated ? '🟢 Tích hợp' : '⚪ Mặc định'}
                          </button>
                        </td>

                        {/* 2a. Chủ đề / Mạch nội dung */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 align-middle">
                          <span className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] block">
                            {r.theme}
                          </span>
                        </td>

                        {/* 2b. Tên bài học */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 align-middle font-bold text-slate-800 dark:text-slate-100">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-[10px]">
                              {r.unitCode}
                            </span>
                          </div>
                          <span className="text-xs text-slate-900 dark:text-white leading-snug">
                            {r.lessonTitle}
                          </span>
                          <div className="text-[10px] text-slate-400 font-medium mt-1">
                            {r.pageRange}
                          </div>
                        </td>

                        {/* 2c. Nội dung chi tiết */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 align-top">
                          <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                            {r.detailedContent}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold flex items-center gap-1">
                              <Gamepad2 className="w-3 h-3" />
                              {r.suggestedGame.split('/')[0]}
                            </span>
                            {onNavigateToVocab && (
                              <button
                                onClick={() => onNavigateToVocab(selectedGrade, r.lessonTitle)}
                                className="px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold transition-all cursor-pointer"
                                title="Xem và nạp từ vựng của bài học này"
                              >
                                🔤 Dạy từ vựng Unit
                              </button>
                            )}
                          </div>
                        </td>

                        {/* 2d. Tiết học / Thời lượng */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 text-center align-middle font-fredoka font-black text-xs text-rose-600 dark:text-rose-400">
                          <span className="px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/50 inline-block">
                            {r.periodLabel}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                            (35 phút)
                          </span>
                          {/* 1-Click Toggle for this single period */}
                          <button
                            onClick={() => togglePeriodIntegrationDirectly(r.periodNumber, r.isIntegrated)}
                            className={`mt-1.5 px-2 py-0.5 rounded-md text-[9.5px] font-bold transition-all cursor-pointer block mx-auto border ${
                              r.isIntegrated 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100' 
                                : 'bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-200'
                            }`}
                            title="Bấm để bật hoặc tắt tích hợp riêng cho tiết học này"
                          >
                            {r.isIntegrated ? '🟢 Có tích hợp' : '⚪ Chuẩn SGK'}
                          </button>
                        </td>

                        {/* 3. Nội dung điều chỉnh, bổ sung */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 align-top space-y-2.5 text-[11px]">
                          {/* Granular Per-Period Control Bar */}
                          <div className="p-2 rounded-2xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2 shadow-2xs">
                            <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-slate-200/60 dark:border-slate-700/60 text-[10px]">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => togglePeriodIntegrationDirectly(r.periodNumber, r.isIntegrated)}
                                  className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer transition-all flex items-center gap-1 border ${
                                    r.isIntegrated 
                                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs' 
                                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                                  }`}
                                  title="Bật/tắt chế độ tích hợp liên môn cho riêng tiết học này"
                                >
                                  {r.isIntegrated ? <Check className="w-3 h-3" /> : null}
                                  <span>{r.isIntegrated ? '🟢 Tích hợp' : '⚪ Chuẩn SGK'}</span>
                                </button>

                                {r.isIntegrated && (
                                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                                    {r.activityScope === 'act123' ? 'HĐ 1, 2, 3 (Khám phá)' : r.activityScope === 'act456' ? 'HĐ 4, 5, 6 (Vận dụng)' : 'Toàn tiết'}
                                  </span>
                                )}
                              </div>

                              {r.isIntegrated && (
                                <div className="inline-flex items-center gap-0.5 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                  <button
                                    onClick={() => handleUpdatePeriod(r.periodNumber, { activityScope: 'act123' })}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-all ${r.activityScope === 'act123' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                    title="Tích hợp tại Hoạt động 1, 2, 3 (Khởi động & Khám phá)"
                                  >
                                    HĐ 1-3
                                  </button>
                                  <button
                                    onClick={() => handleUpdatePeriod(r.periodNumber, { activityScope: 'act456' })}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-all ${r.activityScope === 'act456' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                    title="Tích hợp tại Hoạt động 4, 5, 6 (Luyện tập & Vận dụng)"
                                  >
                                    HĐ 4-6
                                  </button>
                                  <button
                                    onClick={() => handleUpdatePeriod(r.periodNumber, { activityScope: 'all' })}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-all ${r.activityScope === 'all' ? 'bg-amber-400 text-purple-950 shadow-xs' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                    title="Tích hợp toàn bộ các hoạt động trong tiết"
                                  >
                                    Tất cả
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Direct Checkboxes for Individual Integration Modules */}
                            <div className="flex flex-wrap items-center gap-1">
                              {/* AI Toggle */}
                              <button
                                onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableAI')}
                                className={`px-1.5 py-0.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  r.isAIEnabled && r.isIntegrated
                                    ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-700 shadow-xs font-black'
                                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                                }`}
                                title="Bật/Tắt AI (QĐ 2422) cho riêng tiết này"
                              >
                                {r.isAIEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-blue-600 dark:text-blue-400" /> : <Square className="w-3 h-3" />}
                                <span>🤖 AI</span>
                              </button>

                              {/* NLS Toggle */}
                              <button
                                onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableNLS')}
                                className={`px-1.5 py-0.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  r.isNLSEnabled && r.isIntegrated
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700 shadow-xs font-black'
                                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                                }`}
                                title="Bật/Tắt Năng lực số (TT 02/2025) cho riêng tiết này"
                              >
                                {r.isNLSEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Square className="w-3 h-3" />}
                                <span>📱 NLS</span>
                              </button>

                              {/* ATGT Toggle */}
                              <button
                                onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableATGT')}
                                className={`px-1.5 py-0.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  r.isATGTEnabled && r.isIntegrated
                                    ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-700 shadow-xs font-black'
                                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                                }`}
                                title="Bật/Tắt An toàn giao thông (CV 3456) cho riêng tiết này"
                              >
                                {r.isATGTEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-rose-600 dark:text-rose-400" /> : <Square className="w-3 h-3" />}
                                <span>🚦 ATGT</span>
                              </button>

                              {/* KNS Toggle */}
                              <button
                                onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableKNS')}
                                className={`px-1.5 py-0.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  r.isKNSEnabled && r.isIntegrated
                                    ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-700 shadow-xs font-black'
                                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                                }`}
                                title="Bật/Tắt Kỹ năng sống (CV 3456) cho riêng tiết này"
                              >
                                {r.isKNSEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-purple-600 dark:text-purple-400" /> : <Square className="w-3 h-3" />}
                                <span>🤝 KNS</span>
                              </button>

                              {/* Ethics Toggle */}
                              <button
                                onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableEthics')}
                                className={`px-1.5 py-0.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  r.isEthicsEnabled && r.isIntegrated
                                    ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700 shadow-xs font-black'
                                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                                }`}
                                title="Bật/Tắt Phẩm chất đạo đức (TT 32/2018) cho riêng tiết này"
                              >
                                {r.isEthicsEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-amber-600 dark:text-amber-400" /> : <Square className="w-3 h-3" />}
                                <span>❤️ Đạo đức</span>
                              </button>
                            </div>
                          </div>

                          {r.isIntegrated ? (
                            <FlexibleIntegrationBadgeList
                              items={r.customIntegrations || []}
                              displayMode={integrationDisplayMode}
                              compact={false}
                              onOpenEdit={() => setFlexibleModalRow(r)}
                            />
                          ) : (
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                              <p className="font-semibold text-slate-600 dark:text-slate-300">⚪ Dạy theo tiến độ chuẩn SGK Global Success (Không tích hợp liên môn / điều chỉnh)</p>
                              <p className="text-[10px] mt-1 text-slate-400">📦 Thiết bị & PPDH: SGK Tiếng Anh {selectedGrade}, File Audio MP3 bản ngữ, Flashcards tranh từ vựng, TV/Màn hình tương tác (TT 32/2018/TT-BGDĐT).</p>
                            </div>
                          )}
                        </td>

                        {/* 4. Ghi chú & Thao tác */}
                        <td className="p-3 border border-slate-200 dark:border-slate-800 text-center align-middle space-y-2">
                          <span className="text-[10px] text-slate-500 font-medium block leading-tight">
                            {r.note}
                          </span>

                          <div className="flex flex-col gap-1.5">
                            {/* Edit Flexible Integration Modal */}
                            <button
                              type="button"
                              onClick={() => {
                                sounds.playClick();
                                setFlexibleModalRow(r);
                              }}
                              className="w-full px-2 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                              title="Tùy chỉnh mã tích hợp, lĩnh vực và dịch sang Tiếng Anh Sư Phạm"
                            >
                              <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              <span>Mã Tích Hợp ✏️</span>
                            </button>
                            {/* View SGV for this period */}
                            <button
                              onClick={() => {
                                sounds.playClick();
                                setSgvSelectedWeek(r.week);
                                setIsParallelSGVOpen(true);
                              }}
                              className="w-full px-2 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                              title="Tra cứu mục tiêu SGV, trò chơi khởi động và câu hỏi gợi mở cho tiết này"
                            >
                              <BookOpen className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Xem SGV</span>
                            </button>

                            {/* Customize single period */}
                            <button
                              onClick={() => setEditingPeriodRow(r)}
                              className="w-full px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                              title="Tùy chỉnh riêng AI, NLS, ATGT, KNS cho tiết này"
                            >
                              <Sliders className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              <span>Tùy chỉnh</span>
                            </button>

                            {/* Quick AI Lesson Plan Button */}
                            {onNavigateToPlanner && (
                              <button
                                onClick={() => {
                                  sounds.playClick();
                                  onNavigateToPlanner('Tiếng Anh', selectedGrade, r.week, r.periodIndexInWeek, {
                                    lessonTitle: r.lessonTitle,
                                    periodLabel: r.periodLabel,
                                    unitCode: r.unitCode,
                                    theme: r.theme,
                                    detailedContent: r.detailedContent,
                                    disabilitySupport: disabilityConfig
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-fredoka font-bold text-[11px] shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
                                title="Tạo giáo án chi tiết chuẩn CV 2345 bằng AI Copilot cho tiết này"
                              >
                                <Sparkles className="w-3 h-3 text-yellow-300" />
                                <span>Soạn KHBD</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* 6. Cards View for Interactive Week-by-Week Browsing */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRows.map((r) => (
            <div 
              key={r.globalIndex}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-fredoka font-black text-xs">
                      {r.weekLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{r.month}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleUpdatePeriod(r.periodNumber, { isIntegrated: !r.isIntegrated })}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer border ${
                        r.isIntegrated ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      {r.isIntegrated ? '🟢 Tích hợp' : '⚪ Chuẩn'}
                    </button>
                    <span className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-fredoka font-black text-xs border border-rose-200 dark:border-rose-800">
                      {r.periodLabel}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[11px]">
                    {r.theme}
                  </span>
                  <h4 className="font-fredoka text-base font-bold text-slate-800 dark:text-slate-100 mt-1.5">
                    {r.lessonTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {r.detailedContent}
                  </p>
                </div>

                {/* Integrations Chips & Granular Controls */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px]">
                  {/* Module Toggle Checkboxes */}
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableAI')}
                      className={`px-1.5 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                        r.isAIEnabled && r.isIntegrated
                          ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      {r.isAIEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-blue-600" /> : <Square className="w-3 h-3" />}
                      <span>🤖 AI</span>
                    </button>

                    <button
                      onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableNLS')}
                      className={`px-1.5 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                        r.isNLSEnabled && r.isIntegrated
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      {r.isNLSEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-emerald-600" /> : <Square className="w-3 h-3" />}
                      <span>📱 NLS</span>
                    </button>

                    <button
                      onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableATGT')}
                      className={`px-1.5 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                        r.isATGTEnabled && r.isIntegrated
                          ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      {r.isATGTEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-rose-600" /> : <Square className="w-3 h-3" />}
                      <span>🚦 ATGT</span>
                    </button>

                    <button
                      onClick={() => handleTogglePeriodSubModule(r.periodNumber, 'enableKNS')}
                      className={`px-1.5 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                        r.isKNSEnabled && r.isIntegrated
                          ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      {r.isKNSEnabled && r.isIntegrated ? <CheckSquare className="w-3 h-3 text-purple-600" /> : <Square className="w-3 h-3" />}
                      <span>🤝 KNS</span>
                    </button>
                  </div>

                  {r.isIntegrated ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between p-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 font-bold text-[9.5px]">
                        <span>Phạm vi: {r.activityScope === 'act123' ? 'HĐ 1-3' : r.activityScope === 'act456' ? 'HĐ 4-6' : 'Toàn tiết'}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleUpdatePeriod(r.periodNumber, { activityScope: 'act123' })}
                            className={`px-1 py-0.5 rounded cursor-pointer ${r.activityScope === 'act123' ? 'bg-amber-400 text-purple-950' : 'text-slate-500'}`}
                          >
                            1-3
                          </button>
                          <button
                            onClick={() => handleUpdatePeriod(r.periodNumber, { activityScope: 'act456' })}
                            className={`px-1 py-0.5 rounded cursor-pointer ${r.activityScope === 'act456' ? 'bg-amber-400 text-purple-950' : 'text-slate-500'}`}
                          >
                            4-6
                          </button>
                          <button
                            onClick={() => handleUpdatePeriod(r.periodNumber, { activityScope: 'all' })}
                            className={`px-1 py-0.5 rounded cursor-pointer ${r.activityScope === 'all' ? 'bg-amber-400 text-purple-950' : 'text-slate-500'}`}
                          >
                            Tất cả
                          </button>
                        </div>
                      </div>

                      <FlexibleIntegrationBadgeList
                        items={r.customIntegrations || []}
                        displayMode={integrationDisplayMode}
                        compact={true}
                        onOpenEdit={() => setFlexibleModalRow(r)}
                      />
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 italic">
                      Dạy chuẩn SGK Global Success (Không tích hợp).
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setFlexibleModalRow(r);
                  }}
                  className="py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-800 dark:text-indigo-300 font-bold text-[11px] border border-indigo-200 dark:border-indigo-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  title="Tùy chỉnh mã tích hợp & Dịch Tiếng Anh"
                >
                  <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Mã TH ✏️</span>
                </button>

                <button
                  onClick={() => setEditingPeriodRow(r)}
                  className="py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Tùy chỉnh</span>
                </button>

                {onNavigateToPlanner && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onNavigateToPlanner('Tiếng Anh', selectedGrade, r.week, r.periodIndexInWeek, {
                        lessonTitle: r.lessonTitle,
                        periodLabel: r.periodLabel,
                        unitCode: r.unitCode,
                        theme: r.theme,
                        detailedContent: r.detailedContent,
                        disabilitySupport: disabilityConfig
                      });
                    }}
                    className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Soạn AI</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7. Footer Legal & Standard Reference */}
      <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-3xl p-5 border border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-indigo-900 dark:text-indigo-200">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div>
            <h4 className="font-bold">Căn cứ pháp lý & Chuẩn chuyên môn Bộ GD&ĐT:</h4>
            <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
              • <b>Công văn 2345/BGDĐT-GDTH</b> (Hướng dẫn KHGD & Phụ lục 2) • <b>Quyết định 2422/QĐ-BGDĐT</b> (Giáo dục AI) • <b>Thông tư 02/2025/TT-BGDĐT</b> (Khung năng lực số) • <b>Công văn 3456/BGDĐT-GDPT</b> (Thực hiện GDPT 2018) • <b>Thông tư 32/2018/TT-BGDĐT</b> (Chương trình môn Tiếng Anh).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportWord}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Kế Hoạch 35 Tuần (.doc)</span>
          </button>
        </div>
      </div>

      {/* Configuration Center Modal (35 Weeks, Units & Periods) */}
      <CurriculumIntegrationModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        selectedGrade={selectedGrade}
        totalYearPeriods={totalYearPeriods}
        allRows={allRows}
        distinctUnits={distinctUnits}
        integrationMode={integrationMode}
        selectedIntegratedWeeks={selectedIntegratedWeeks}
        globalActivityScope={globalActivityScope}
        enableAI={enableAI}
        enableNLS={enableNLS}
        enableATGT={enableATGT}
        enableKNS={enableKNS}
        enableEthics={enableEthics}
        enableDevices={enableDevices}
        unitOverrides={unitOverrides}
        periodOverrides={periodOverrides}
        onSelectAllWeeks={handleSelectAllWeeks}
        onDeselectAllWeeks={handleDeselectAllWeeks}
        onSelectMainUnitsOnly={handleSelectMainUnitsOnly}
        onSelectSemester1Only={handleSelectSemester1Only}
        onSelectSemester2Only={handleSelectSemester2Only}
        onSmartPedagogicalSplit={handleSmartPedagogicalSplit}
        onSelectOnePeriodPerWeek={handleSelectOnePeriodPerWeek}
        onSelectTwoPeriodsPerWeek={handleSelectTwoPeriodsPerWeek}
        onSelectOddPeriodsOnly={handleSelectOddPeriodsOnly}
        onSelectEvenPeriodsOnly={handleSelectEvenPeriodsOnly}
        onExcludeReviewsAndAssessments={handleExcludeReviewsAndAssessments}
        onBatchSetPeriodsIntegration={handleBatchSetPeriodsIntegration}
        onSetGlobalActivityScope={setGlobalActivityScope}
        onToggleUnitIntegration={toggleUnitIntegration}
        onSetUnitActivityScope={setUnitActivityScope}
        onToggleGlobalAI={setEnableAI}
        onToggleGlobalNLS={setEnableNLS}
        onToggleGlobalATGT={setEnableATGT}
        onToggleGlobalKNS={setEnableKNS}
        onToggleGlobalEthics={setEnableEthics}
        onToggleGlobalDevices={setEnableDevices}
        onUpdatePeriod={handleUpdatePeriod}
        onOpenPeriodCustomizer={(row) => setEditingPeriodRow(row)}
      />

      {/* Single Period Customizer Modal */}
      <PeriodCustomizerModal
        row={editingPeriodRow}
        onClose={() => setEditingPeriodRow(null)}
        onSave={(pNum, cfg) => {
          handleUpdatePeriod(pNum, cfg);
        }}
      />

      {/* Refresh Appendix 2 Modal */}
      <RefreshAppendix2Modal
        isOpen={showRefreshModal}
        onClose={() => setShowRefreshModal(false)}
        selectedGrade={selectedGrade}
        totalYearPeriods={totalYearPeriods}
        distinctUnits={distinctUnits}
        onResetAllToStandard={handleResetGradeToDefaults}
        onAutoOptimizePedagogy={handleSmartPedagogicalSplit}
        onResetSpecificUnit={handleResetSpecificUnit}
        onApplyPreset={handleApplyPresetFromRefresh}
      />

      {/* Flexible Integration Edit Modal */}
      {flexibleModalRow && (
        <FlexibleIntegrationModal
          isOpen={true}
          title={`Tùy chỉnh mã tích hợp & Dịch Tiếng Anh Sư Phạm - ${flexibleModalRow.periodLabel}`}
          periodLabel={`${flexibleModalRow.periodLabel} (Tuần ${flexibleModalRow.week})`}
          lessonTitle={`${flexibleModalRow.unitCode} - ${flexibleModalRow.lessonTitle}`}
          initialItems={
            flexibleModalRow.customIntegrations && flexibleModalRow.customIntegrations.length > 0
              ? flexibleModalRow.customIntegrations
              : buildFlexibleItemsFromPeriod(flexibleModalRow)
          }
          onClose={() => setFlexibleModalRow(null)}
          onSave={(updatedItems) => {
            handleUpdatePeriod(flexibleModalRow.periodNumber, {
              customIntegrations: updatedItems
            });
            setFlexibleModalRow(null);
            showToast(`✅ Đã lưu và cập nhật mã tích hợp cho ${flexibleModalRow.periodLabel}!`);
          }}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 font-fredoka font-bold text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
