// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH CHI TIẾT 35 TUẦN THEO CHUẨN CTGDPT 2018
// TÍCH HỢP ĐỘC QUYỀN 2 BỘ SÁCH:
// 1. KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (NXB GIÁO DỤC VIỆT NAM)
// 2. BỘ SÁCH GIẢNG DẠY CỦA BỘ GIÁO DỤC VÀ ĐÀO TẠO / GLOBAL SUCCESS
// ĐẢM BẢO ĐẦY ĐỦ VÀ CHÍNH XÁC CHO TỪNG KHỐI LỚP 1, 2, 3, 4, 5
// MỖI KHỐI LỚP VÀ MỖI TUẦN ĐỀU CÓ TÊN BÀI, NỘI DUNG VÀ MỤC TIÊU RIÊNG BIỆT 100%
// =========================================================================

import { getMath35Weeks } from './mathCurriculum35Weeks';
import { getVietnamese35Weeks } from './vietnameseCurriculum35Weeks';
import { getEnglish35Weeks } from './englishCurriculum35Weeks';
import { getGeneralSubject35Weeks } from './otherSubjectsCurriculum35Weeks';

export interface CurriculumPeriod {
  periodNumber: number; // 1, 2, 3, 4, 5, 6, 7...
  periodLabel: string; // "Tiết 1", "Tiết 2"...
  ppctNumber?: number; // 1 -> 70 (Grade 1-2) or 1 -> 140 (Grade 3-5)
  singleIntegrationActivity?: 'A' | 'B' | 'C' | 'D' | 'E'; // Target single activity for integration (CV 2345/3456)
  unitCode?: string;
  unitTitle?: string;
  lessonTitle?: string;
  theme?: string;
  lessonPart: string; // "Khám phá kiến thức mới", "Luyện tập 1", "Look, Listen & Repeat"...
  scope: string; // "Hoạt động 1, 2, 3", "Bài tập 1-4"...
  keyFocus: string; // Trọng tâm cụ thể của tiết này
  pageRange?: string; // Trang SGK
  suggestedActivity?: string; // Hoạt động sư phạm tiêu biểu
  vocab?: string[];
  patterns?: string[];
  integratedCV2345?: {
    digitalCompetence?: string;
    aiLiteracy?: string;
    trafficSafety?: string;
    lifeSkills?: string;
    localEducation?: string;
    stemSteam?: string;
    inclusiveEducation?: string;
    moralEthics?: string;
    customCode?: string;
    customDomain?: string;
    englishTranslation?: string;
  };
  customIntegrations?: Array<{
    id: string;
    code: string;
    domain: string;
    domainLabelVn: string;
    domainLabelEn: string;
    contentVn: string;
    contentEn: string;
    enabled?: boolean;
  }>;
}

export interface SubjectCurriculumWeekDetailed {
  week: number; // 1 -> 35
  weekLabel: string; // "Tuần 1" -> "Tuần 35"
  semester: 1 | 2; // 1: Tuần 1-18, 2: Tuần 19-35
  theme: string; // Chủ điểm / Chủ đề lớn
  unitCode?: string; // e.g. "Unit 1", "Chương 1", "Chủ điểm 1"
  lessonTitle: string; // Tên bài học chính
  allLessonsInWeek: string[]; // Danh sách các bài học / bài đọc / mục trong tuần
  periodCount: number; // Tổng số tiết trong tuần
  sections: string[]; // Mã phân môn
  periods: CurriculumPeriod[]; // Danh sách chi tiết từng tiết dạy
  keyKnowledge: string; // Kiến thức & kỹ năng trọng tâm
  keyVocabulary?: string[]; // Từ vựng / Thuật ngữ / Khái niệm
  sentencePatternsOrRules?: string[]; // Mẫu câu / Quy tắc / Công thức
  textbookPageRange?: string; // Trang SGK
  suggestedGame: {
    name: string;
    goal: string;
    materials: string;
    rules: string;
  };
  suggestedMethod: string;
  suggestedScenario: string;
}

export function normalizeGrade(grade: string | number): string {
  if (!grade) return 'Lớp 1';
  const clean = grade.toString().trim();
  if (clean.includes('1') || clean.toLowerCase().includes('grade 1')) return 'Lớp 1';
  if (clean.includes('2') || clean.toLowerCase().includes('grade 2')) return 'Lớp 2';
  if (clean.includes('3') || clean.toLowerCase().includes('grade 3')) return 'Lớp 3';
  if (clean.includes('4') || clean.toLowerCase().includes('grade 4')) return 'Lớp 4';
  if (clean.includes('5') || clean.toLowerCase().includes('grade 5')) return 'Lớp 5';
  return 'Lớp 1';
}

export const ENGLISH_GLOBAL_SUCCESS_35_WEEKS: Record<string, SubjectCurriculumWeekDetailed[]> = {
  'Lớp 1': getEnglish35Weeks('Lớp 1'),
  'Lớp 2': getEnglish35Weeks('Lớp 2'),
  'Lớp 3': getEnglish35Weeks('Lớp 3'),
  'Lớp 4': getEnglish35Weeks('Lớp 4'),
  'Lớp 5': getEnglish35Weeks('Lớp 5')
};

export const MATH_KNTT_35_WEEKS: Record<string, SubjectCurriculumWeekDetailed[]> = {
  'Lớp 1': getMath35Weeks('Lớp 1'),
  'Lớp 2': getMath35Weeks('Lớp 2'),
  'Lớp 3': getMath35Weeks('Lớp 3'),
  'Lớp 4': getMath35Weeks('Lớp 4'),
  'Lớp 5': getMath35Weeks('Lớp 5')
};

export const VIETNAMESE_KNTT_35_WEEKS: Record<string, SubjectCurriculumWeekDetailed[]> = {
  'Lớp 1': getVietnamese35Weeks('Lớp 1'),
  'Lớp 2': getVietnamese35Weeks('Lớp 2'),
  'Lớp 3': getVietnamese35Weeks('Lớp 3'),
  'Lớp 4': getVietnamese35Weeks('Lớp 4'),
  'Lớp 5': getVietnamese35Weeks('Lớp 5')
};

export function getFull35WeeksForSubjectAndGrade(subject: string, grade: string): SubjectCurriculumWeekDetailed[] {
  const normGrade = normalizeGrade(grade);

  if (subject === 'Tiếng Anh') {
    return getEnglish35Weeks(normGrade);
  }

  if (subject === 'Toán') {
    return getMath35Weeks(normGrade);
  }

  if (subject === 'Tiếng Việt') {
    return getVietnamese35Weeks(normGrade);
  }

  return getGeneralSubject35Weeks(subject, normGrade);
}
