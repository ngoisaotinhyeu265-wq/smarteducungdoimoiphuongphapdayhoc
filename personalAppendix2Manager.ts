/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// =========================================================================
// QUẢN LÝ VÀ LƯU TRỮ KẾ HOẠCH DẠY HỌC PHỤ LỤC 2 CÁ NHÂN (TẤT CẢ CÁC MÔN)
// HỖ TRỢ TẢI LÊN FILE WORD (.DOCX/.DOC), EXCEL (.XLSX/.CSV), JSON & TEXT
// TỰ ĐỘNG TRÍCH XUẤT VÀ TÍCH HỢP ĐÚNG CHUẨN VÀO KẾ HOẠCH BÀI DẠY (CV 2345)
// =========================================================================

import { 
  SubjectCurriculumWeekDetailed, 
  CurriculumPeriod,
  getFull35WeeksForSubjectAndGrade,
  normalizeGrade
} from './full35WeeksCurriculum';

export interface PersonalAppendix2Plan {
  id: string;
  title: string; // Tên hiển thị (e.g. "Kế hoạch dạy học Tiếng Anh 3 - Cô Nguyễn Thu Hà - Năm học 2024-2025")
  teacherName: string;
  schoolName: string;
  academicYear: string;
  subject: string; // "Tiếng Anh", "Toán", "Tiếng Việt", "Khoa học", "Tự nhiên và Xã hội", "Lịch sử và Địa lý", "Tin học", "Công nghệ", "Đạo đức", "Hoạt động trải nghiệm", "Âm nhạc", "Mỹ thuật", "Giáo dục thể chất"
  grade: string; // "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"
  bookSeries: string; // "Kết nối tri thức với cuộc sống", "Global Success", "Chân trời sáng tạo", "Cánh diều", "Bộ Giáo dục và Đào tạo"
  isActive: boolean; // Đang kích hoạt làm nguồn dữ liệu chính khi soạn Kế hoạch bài dạy
  createdAt: string;
  updatedAt: string;
  sourceType: 'uploaded_file' | 'pasted_text' | 'custom_created' | 'system_baseline';
  fileName?: string;
  totalWeeks: number; // 35
  totalPeriods: number;
  weeks: SubjectCurriculumWeekDetailed[];
  notes?: string;
  isFavorite?: boolean;
}

const STORAGE_KEY = 'smartedu_personal_appendix2_plans_v1';

// All standard primary subjects supported
export const ALL_PRIMARY_SUBJECTS = [
  'Tiếng Việt',
  'Toán',
  'Tiếng Anh',
  'Đạo đức',
  'Tự nhiên và Xã hội',
  'Lịch sử và Địa lý',
  'Khoa học',
  'Tin học',
  'Công nghệ',
  'Hoạt động trải nghiệm',
  'Âm nhạc',
  'Mỹ thuật',
  'Giáo dục thể chất'
];

export const SUBJECT_METADATA: Record<string, { icon: string; color: string; bg: string; applicableGrades: string[] }> = {
  'Tiếng Việt': { icon: '📖', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Toán': { icon: '📐', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Tiếng Anh': { icon: '🇬🇧', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Đạo đức': { icon: '❤️', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Tự nhiên và Xã hội': { icon: '🌿', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3'] },
  'Khoa học': { icon: '🔬', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200', applicableGrades: ['Lớp 4', 'Lớp 5'] },
  'Lịch sử và Địa lý': { icon: '🗺️', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', applicableGrades: ['Lớp 4', 'Lớp 5'] },
  'Tin học': { icon: '💻', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200', applicableGrades: ['Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Công nghệ': { icon: '⚙️', color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200', applicableGrades: ['Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Hoạt động trải nghiệm': { icon: '🌟', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Âm nhạc': { icon: '🎵', color: 'text-pink-700', bg: 'bg-pink-50 border-pink-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Mỹ thuật': { icon: '🎨', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] },
  'Giáo dục thể chất': { icon: '⚽', color: 'text-lime-700', bg: 'bg-lime-50 border-lime-200', applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'] }
};

export const ALL_PRIMARY_GRADES = [
  'Lớp 1',
  'Lớp 2',
  'Lớp 3',
  'Lớp 4',
  'Lớp 5'
];

export const ALL_BOOK_SERIES = [
  'Kết nối tri thức với cuộc sống (NXBGDVN)',
  'Global Success - Bộ Giáo dục và Đào tạo (NXBGDVN)',
  'Chân trời sáng tạo (NXBGDVN)',
  'Cánh diều (NXB ĐH Sư phạm)',
  'Cùng học để phát triển năng lực',
  'Vì sự bình đẳng và dân chủ trong giáo dục'
];

// In-memory cache for default sample plans to prevent deep duplicate memory pressure
let cachedSamplePlans: PersonalAppendix2Plan[] | null = null;

/**
 * Xây dựng đối tượng Kế hoạch Phụ lục 2 thuần túy (không gọi đệ quy lưu trữ)
 */
function buildPlanObject(params: {
  title?: string;
  teacherName?: string;
  schoolName?: string;
  academicYear?: string;
  subject: string;
  grade: string;
  bookSeries?: string;
  notes?: string;
  setActive?: boolean;
  sourceType?: 'uploaded_file' | 'pasted_text' | 'custom_created' | 'system_baseline';
}): PersonalAppendix2Plan {
  const normGrade = normalizeGrade(params.grade);
  const baselineWeeks = getFull35WeeksForSubjectAndGrade(params.subject, normGrade);
  
  // Count total periods
  const totalPeriods = baselineWeeks.reduce((sum, w) => sum + (w.periodCount || w.periods?.length || 0), 0);

  return {
    id: `app2_custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: params.title || `Kế hoạch dạy học ${params.subject} ${normGrade} - ${params.teacherName || 'Giáo viên'}`,
    teacherName: params.teacherName || 'Giáo viên Bộ môn',
    schoolName: params.schoolName || 'Trường Tiểu học Chuẩn Quốc Gia',
    academicYear: params.academicYear || '2024 - 2025',
    subject: params.subject,
    grade: normGrade,
    bookSeries: params.bookSeries || (params.subject === 'Tiếng Anh' ? 'Global Success (Bộ GD&ĐT)' : 'Kết nối tri thức với cuộc sống (NXBGDVN)'),
    isActive: params.setActive !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceType: params.sourceType || 'system_baseline',
    totalWeeks: 35,
    totalPeriods: totalPeriods,
    weeks: baselineWeeks,
    notes: params.notes || 'Khởi tạo từ phân phối chuẩn CTGDPT 2018 Công văn 2345, sẵn sàng tùy biến theo từng lớp.'
  };
}

/**
 * Lấy toàn bộ danh sách Kế hoạch dạy học Phụ lục 2 cá nhân đã lưu
 */
export function getPersonalAppendix2Plans(): PersonalAppendix2Plan[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return generateDefaultSamplePlans();
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = generateDefaultSamplePlans();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      } catch (saveErr) {
        // quota or serialization error, return memory objects safely
      }
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = generateDefaultSamplePlans();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      } catch (saveErr) {
        // ignore
      }
      return initial;
    }
    return parsed;
  } catch (err: any) {
    // If corrupt or maximum stack error, clear key and regenerate cleanly
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (_) {}
    return generateDefaultSamplePlans();
  }
}

/**
 * Lưu toàn bộ danh sách Kế hoạch dạy học Phụ lục 2
 */
export function savePersonalAppendix2Plans(plans: PersonalAppendix2Plan[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (err) {
    console.error('Error saving personal Appendix 2 plans:', err);
  }
}

/**
 * Tìm Kế hoạch Phụ lục 2 đang KÍCH HOẠT (Active) cho Môn và Khối lớp cụ thể
 */
export function getActivePersonalAppendix2(subject: string, grade: string): PersonalAppendix2Plan | null {
  const normGrade = normalizeGrade(grade);
  const plans = getPersonalAppendix2Plans();
  const matched = plans.find(p => p.isActive && p.subject.toLowerCase() === subject.toLowerCase() && normalizeGrade(p.grade) === normGrade);
  return matched || null;
}

/**
 * Kích hoạt một Kế hoạch Phụ lục 2 cho Môn và Khối lớp (hủy kích hoạt các bản cũ cùng môn/khối)
 */
export function setActivePersonalAppendix2(planId: string): PersonalAppendix2Plan[] {
  const plans = getPersonalAppendix2Plans();
  const target = plans.find(p => p.id === planId);
  if (!target) return plans;

  const updated = plans.map(p => {
    if (p.subject === target.subject && normalizeGrade(p.grade) === normalizeGrade(target.grade)) {
      return {
        ...p,
        isActive: p.id === planId,
        updatedAt: new Date().toISOString()
      };
    }
    return p;
  });

  savePersonalAppendix2Plans(updated);
  return updated;
}

/**
 * Thêm hoặc Cập nhật Kế hoạch Phụ lục 2
 */
export function saveOrUpdatePersonalPlan(plan: PersonalAppendix2Plan): PersonalAppendix2Plan[] {
  const plans = getPersonalAppendix2Plans();
  const index = plans.findIndex(p => p.id === plan.id);
  
  let updatedList: PersonalAppendix2Plan[];
  if (index >= 0) {
    updatedList = [...plans];
    updatedList[index] = {
      ...plan,
      updatedAt: new Date().toISOString()
    };
  } else {
    // If set as active, deactivate others with same subject & grade
    if (plan.isActive) {
      updatedList = plans.map(p => {
        if (p.subject === plan.subject && normalizeGrade(p.grade) === normalizeGrade(plan.grade)) {
          return { ...p, isActive: false };
        }
        return p;
      });
      updatedList.unshift(plan);
    } else {
      updatedList = [plan, ...plans];
    }
  }

  savePersonalAppendix2Plans(updatedList);
  return updatedList;
}

/**
 * Xóa một Kế hoạch Phụ lục 2
 */
export function deletePersonalPlan(planId: string): PersonalAppendix2Plan[] {
  const plans = getPersonalAppendix2Plans();
  const updated = plans.filter(p => p.id !== planId);
  savePersonalAppendix2Plans(updated);
  return updated;
}

/**
 * Tạo mới một Kế hoạch Phụ lục 2 từ khung phân phối 35 tuần chuẩn của hệ thống
 */
export function createPersonalPlanFromBaseline(params: {
  title?: string;
  teacherName?: string;
  schoolName?: string;
  academicYear?: string;
  subject: string;
  grade: string;
  bookSeries?: string;
  notes?: string;
  setActive?: boolean;
}): PersonalAppendix2Plan {
  const newPlan = buildPlanObject({
    ...params,
    sourceType: 'custom_created'
  });

  saveOrUpdatePersonalPlan(newPlan);
  return newPlan;
}

/**
 * Trích xuất tích hợp đặc thù (NLS, AI, ATGT, KNS, Thiết bị, YCCĐ) từ Kế hoạch Phụ lục 2 cá nhân (nếu có) hoặc hệ thống
 */
export function getIntegrationForLessonPlan(params: {
  subject: string;
  grade: string;
  weekNumber?: number;
  periodNumber?: number;
  lessonName?: string;
  unitCode?: string;
}): {
  source: 'personal_appendix2' | 'system_standard';
  planTitle?: string;
  aiIntegration: string;
  nlsIntegration: string;
  atgtKnsIntegration: string;
  stemLocalIntegration: string;
  equipmentDevices: string;
  learningObjectives: string[];
  keyVocabulary?: string[];
  patterns?: string[];
} {
  const normGrade = normalizeGrade(params.grade);
  const activePersonal = getActivePersonalAppendix2(params.subject, normGrade);

  // Default fallback values
  let aiTag = 'AI 1.C1.1: Sử dụng trợ lý phát âm và nhận diện giọng nói chuẩn bản ngữ.';
  let nlsTag = 'NLS 1.1.CB1a: Khai thác kho học liệu số an toàn trên taphuan.nxbgd.vn & hoclieu.vn.';
  let atgtKnsTag = 'KNS: Rèn luyện tính tự giác, tư thế ngồi học ngay ngắn và văn hóa chia sẻ hợp tác nhóm.';
  let stemLocalTag = 'STEM: Vận dụng làm sản phẩm thẻ từ / mô hình trực quan trải nghiệm.';
  let deviceTag = 'SGK, Flashcards tranh từ, Thiết bị trình chiếu TV/Màn hình tương tác, Loa bluetooth.';
  let objectives = [
    `Học sinh nhận biết và hoàn thành tốt nội dung bài học "${params.lessonName || 'Bài học'}" theo chuẩn CTGDPT 2018.`,
    'Rèn luyện kỹ năng tự chủ, giao tiếp và hợp tác thông qua các hoạt động học tập phong phú.',
    'Phát triển phẩm chất chăm chỉ, trách nhiệm và tinh thần hào hứng đối với môn học.'
  ];
  let vocab: string[] = [];
  let patterns: string[] = [];

  if (activePersonal && activePersonal.weeks && activePersonal.weeks.length > 0) {
    // Find matching week
    let matchedWeek = params.weekNumber 
      ? activePersonal.weeks.find(w => w.week === params.weekNumber)
      : null;

    if (!matchedWeek && params.unitCode) {
      matchedWeek = activePersonal.weeks.find(w => w.unitCode?.toLowerCase() === params.unitCode?.toLowerCase());
    }

    if (!matchedWeek && params.lessonName) {
      matchedWeek = activePersonal.weeks.find(w => 
        w.lessonTitle?.toLowerCase().includes(params.lessonName!.toLowerCase()) ||
        w.allLessonsInWeek?.some(l => l.toLowerCase().includes(params.lessonName!.toLowerCase()))
      );
    }

    if (!matchedWeek) {
      matchedWeek = activePersonal.weeks[0];
    }

    if (matchedWeek) {
      // Find matching period in week
      const pIdx = params.periodNumber ? params.periodNumber - 1 : 0;
      const matchedPeriod = matchedWeek.periods && matchedWeek.periods[pIdx] 
        ? matchedWeek.periods[pIdx] 
        : (matchedWeek.periods && matchedWeek.periods[0] ? matchedWeek.periods[0] : null);

      if (matchedPeriod) {
        if (matchedPeriod.integratedCV2345) {
          if (matchedPeriod.integratedCV2345.aiLiteracy) aiTag = matchedPeriod.integratedCV2345.aiLiteracy;
          if (matchedPeriod.integratedCV2345.digitalCompetence) nlsTag = matchedPeriod.integratedCV2345.digitalCompetence;
          if (matchedPeriod.integratedCV2345.lifeSkills || matchedPeriod.integratedCV2345.trafficSafety) {
            atgtKnsTag = [matchedPeriod.integratedCV2345.trafficSafety, matchedPeriod.integratedCV2345.lifeSkills].filter(Boolean).join(' | ');
          }
          if (matchedPeriod.integratedCV2345.stemSteam || matchedPeriod.integratedCV2345.localEducation) {
            stemLocalTag = [matchedPeriod.integratedCV2345.stemSteam, matchedPeriod.integratedCV2345.localEducation].filter(Boolean).join(' | ');
          }
        }

        if (matchedPeriod.keyFocus) {
          objectives[0] = matchedPeriod.keyFocus;
        }

        if (matchedPeriod.vocab && matchedPeriod.vocab.length > 0) {
          vocab = matchedPeriod.vocab;
        } else if (matchedWeek.keyVocabulary && matchedWeek.keyVocabulary.length > 0) {
          vocab = matchedWeek.keyVocabulary;
        }

        if (matchedPeriod.patterns && matchedPeriod.patterns.length > 0) {
          patterns = matchedPeriod.patterns;
        } else if (matchedWeek.sentencePatternsOrRules && matchedWeek.sentencePatternsOrRules.length > 0) {
          patterns = matchedWeek.sentencePatternsOrRules;
        }
      }

      return {
        source: 'personal_appendix2',
        planTitle: activePersonal.title,
        aiIntegration: aiTag,
        nlsIntegration: nlsTag,
        atgtKnsIntegration: atgtKnsTag,
        stemLocalIntegration: stemLocalTag,
        equipmentDevices: deviceTag,
        learningObjectives: objectives,
        keyVocabulary: vocab,
        patterns: patterns
      };
    }
  }

  // System standard fallback
  return {
    source: 'system_standard',
    aiIntegration: aiTag,
    nlsIntegration: nlsTag,
    atgtKnsIntegration: atgtKnsTag,
    stemLocalIntegration: stemLocalTag,
    equipmentDevices: deviceTag,
    learningObjectives: objectives,
    keyVocabulary: vocab,
    patterns: patterns
  };
}

/**
 * Lấy hoặc Tự động khởi tạo Kế hoạch Phụ lục 2 cho bất kỳ Môn và Khối lớp nào
 */
export function getOrCreateActivePlanForSubjectAndGrade(subject: string, grade: string): PersonalAppendix2Plan {
  const normGrade = normalizeGrade(grade);
  const active = getActivePersonalAppendix2(subject, normGrade);
  if (active) return active;

  // Check if any plan exists for subject & grade
  const plans = getPersonalAppendix2Plans();
  const existing = plans.find(p => p.subject.toLowerCase() === subject.toLowerCase() && normalizeGrade(p.grade) === normGrade);
  if (existing) {
    setActivePersonalAppendix2(existing.id);
    return { ...existing, isActive: true };
  }

  // Otherwise, create baseline plan automatically
  const created = createPersonalPlanFromBaseline({
    title: `Kế hoạch dạy học ${subject} ${normGrade} (Chuẩn CTGDPT 2018 - CV 2345)`,
    teacherName: 'Giáo viên Tiểu học',
    schoolName: 'Trường Tiểu học',
    academicYear: '2024 - 2025',
    subject: subject,
    grade: normGrade,
    bookSeries: subject === 'Tiếng Anh' ? 'Global Success (Bộ GD&ĐT)' : 'Kết nối tri thức với cuộc sống (NXBGDVN)',
    notes: 'Khởi tạo từ phân phối chuẩn CTGDPT 2018 Công văn 2345, bám sát từng tiết và địa chỉ tích hợp.',
    setActive: true
  });
  return created;
}

/**
 * Phân tích và nạp nội dung văn bản / bảng copy-paste thành Kế hoạch Phụ lục 2 35 tuần
 */
export function parsePastedTextToAppendix2(text: string, subject: string, grade: string, meta?: {
  title?: string;
  teacherName?: string;
  schoolName?: string;
  academicYear?: string;
  bookSeries?: string;
  fileName?: string;
}): PersonalAppendix2Plan {
  const normGrade = normalizeGrade(grade);
  const baseline = getFull35WeeksForSubjectAndGrade(subject, normGrade);
  const deepCloned: SubjectCurriculumWeekDetailed[] = JSON.parse(JSON.stringify(baseline));

  // Parse lines or table tabs
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  let parsedPeriodCount = 0;

  // Check if text has tabular format (tab \t or pipe | separated)
  const isTabular = lines.some(l => l.includes('\t') || l.includes('|'));

  if (isTabular) {
    lines.forEach((line) => {
      const parts = line.includes('\t') ? line.split('\t') : line.split('|');
      const cleanParts = parts.map(p => p.trim()).filter(Boolean);
      if (cleanParts.length >= 2) {
        // Look for week number and period number in row
        const rowText = cleanParts.join(' ');
        const weekMatch = rowText.match(/(?:Tuần|Tuan|Week|W)\s*([0-9]{1,2})/i);
        const periodMatch = rowText.match(/(?:Tiết|Tiet|Period|P)\s*([0-9]{1,3})/i);

        if (weekMatch) {
          const wNum = parseInt(weekMatch[1], 10);
          if (wNum >= 1 && wNum <= 35) {
            const targetWeek = deepCloned.find(w => w.week === wNum);
            if (targetWeek) {
              // Find content column (typically column with longest text or column 3/4)
              const candidateTitle = cleanParts.find(p => 
                p.length > 5 && 
                !p.match(/^(?:Tuần|Tiết|STT|[0-9]+)/i) && 
                !p.toLowerCase().includes('yêu cầu cần đạt') &&
                !p.toLowerCase().includes('tên bài')
              );

              if (candidateTitle) {
                targetWeek.lessonTitle = candidateTitle;
                if (targetWeek.periods && targetWeek.periods.length > 0) {
                  const pNum = periodMatch ? parseInt(periodMatch[1], 10) : 1;
                  const targetPeriod = targetWeek.periods.find(p => p.periodNumber === pNum) || targetWeek.periods[0];
                  if (targetPeriod) {
                    targetPeriod.lessonTitle = candidateTitle;
                    targetPeriod.periodLabel = `Tiết ${pNum}`;
                  }
                }
                parsedPeriodCount++;
              }

              // Check for YCCĐ / integration
              const candidateIntegration = cleanParts.find(p => 
                p.toLowerCase().includes('nls') || 
                p.toLowerCase().includes('ai') || 
                p.toLowerCase().includes('atgt') || 
                p.toLowerCase().includes('kns')
              );
              if (candidateIntegration && targetWeek.periods && targetWeek.periods[0]) {
                if (!targetWeek.periods[0].integratedCV2345) {
                  targetWeek.periods[0].integratedCV2345 = {};
                }
                if (candidateIntegration.toLowerCase().includes('nls')) {
                  targetWeek.periods[0].integratedCV2345.digitalCompetence = candidateIntegration;
                }
                if (candidateIntegration.toLowerCase().includes('ai')) {
                  targetWeek.periods[0].integratedCV2345.aiLiteracy = candidateIntegration;
                }
              }
            }
          }
        }
      }
    });
  } else {
    // Normal text parsing line by line
    let currentWeekNum = 1;
    lines.forEach((line) => {
      const weekMatch = line.match(/(?:Tuần|Tuan|Week)\s*([0-9]{1,2})/i);
      if (weekMatch) {
        currentWeekNum = parseInt(weekMatch[1], 10);
      }

      if (currentWeekNum >= 1 && currentWeekNum <= 35) {
        const targetWeek = deepCloned.find(w => w.week === currentWeekNum);
        if (targetWeek) {
          const cleanLine = line.replace(/^(?:Tuần|Tuan|Week)\s*[0-9]{1,2}[:.\-\s]*/i, '').trim();
          if (cleanLine.length > 4 && !cleanLine.toLowerCase().startsWith('stt')) {
            targetWeek.lessonTitle = cleanLine;
            if (targetWeek.periods && targetWeek.periods[0]) {
              targetWeek.periods[0].lessonTitle = cleanLine;
            }
            parsedPeriodCount++;
          }
        }
      }
    });
  }

  // Enforce sequential PPCT numbering and single integration activity constraint (CV 2345/3456)
  let runningPpct = 1;
  deepCloned.forEach((w) => {
    w.periods.forEach((p) => {
      p.ppctNumber = runningPpct;
      p.periodLabel = `Tiết ${runningPpct}`;
      if (!p.singleIntegrationActivity) {
        p.singleIntegrationActivity = 'B';
      }
      runningPpct++;
    });
  });

  const totalPeriods = deepCloned.reduce((sum, w) => sum + (w.periodCount || w.periods?.length || 0), 0);

  const newPlan: PersonalAppendix2Plan = {
    id: `app2_custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: meta?.title || `Kế hoạch dạy học ${subject} ${normGrade} (Tải lên / Nhập cá nhân)`,
    teacherName: meta?.teacherName || 'Giáo viên Tiểu học',
    schoolName: meta?.schoolName || 'Trường Tiểu học',
    academicYear: meta?.academicYear || '2024 - 2025',
    subject: subject,
    grade: normGrade,
    bookSeries: meta?.bookSeries || (subject === 'Tiếng Anh' ? 'Global Success (Bộ GD&ĐT)' : 'Kết nối tri thức với cuộc sống (NXBGDVN)'),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceType: meta?.fileName ? 'uploaded_file' : 'pasted_text',
    fileName: meta?.fileName,
    totalWeeks: 35,
    totalPeriods: totalPeriods,
    weeks: deepCloned,
    notes: `Nhập tự động thành công phân phối 35 tuần (${lines.length} dòng dữ liệu trích xuất).`
  };

  saveOrUpdatePersonalPlan(newPlan);
  return newPlan;
}

/**
 * Tạo dữ liệu mẫu sẵn có ban đầu khi người dùng mới mở tính năng
 */
function generateDefaultSamplePlans(): PersonalAppendix2Plan[] {
  if (cachedSamplePlans && cachedSamplePlans.length > 0) {
    return cachedSamplePlans;
  }

  const english3 = buildPlanObject({
    title: 'Kế hoạch dạy học Tiếng Anh 3 (Chuẩn CV 2345 & QĐ 2422)',
    teacherName: 'Nguyễn Thị Thu Hà',
    schoolName: 'Trường Tiểu học Thực Nghiệm Sư Phạm',
    academicYear: '2024 - 2025',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    notes: 'Phân phối chương trình chính thức 140 tiết / 35 tuần với địa chỉ tích hợp NLS, AI và KNS chi tiết từng tiết.',
    setActive: true
  });

  const math4 = buildPlanObject({
    title: 'Kế hoạch dạy học Toán 4 (Tích hợp STEM & Năng lực số)',
    teacherName: 'Trần Văn Minh',
    schoolName: 'Trường Tiểu học Thực Nghiệm Sư Phạm',
    academicYear: '2024 - 2025',
    subject: 'Toán',
    grade: 'Lớp 4',
    bookSeries: 'Kết nối tri thức với cuộc sống (NXBGDVN)',
    notes: 'Kế hoạch dạy học 175 tiết / 35 tuần tích hợp thiết bị thực hành và ứng dụng bài toán thực tiễn.',
    setActive: true
  });

  const vietnamese2 = buildPlanObject({
    title: 'Kế hoạch dạy học Tiếng Việt 2 (Tích hợp KNS & ATGT)',
    teacherName: 'Lê Hoàng Yến',
    schoolName: 'Trường Tiểu học Thực Nghiệm Sư Phạm',
    academicYear: '2024 - 2025',
    subject: 'Tiếng Việt',
    grade: 'Lớp 2',
    bookSeries: 'Kết nối tri thức với cuộc sống (NXBGDVN)',
    notes: 'Phân phối 350 tiết / 35 tuần rèn chữ, luyện đọc, luyện viết và phát triển ngôn ngữ toàn diện.',
    setActive: true
  });

  cachedSamplePlans = [english3, math4, vietnamese2];
  return cachedSamplePlans;
}
