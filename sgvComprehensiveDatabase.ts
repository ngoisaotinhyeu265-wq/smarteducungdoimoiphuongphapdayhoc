/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getFull35WeeksForSubjectAndGrade, normalizeGrade, SubjectCurriculumWeekDetailed, CurriculumPeriod } from './full35WeeksCurriculum';

export interface SGVLessonEntry {
  id: string;
  entryType: 'period' | 'week'; // Phân chia theo từng Tiết dạy (Phụ lục 2) hoặc theo Bài/Tuần học
  subject: string;
  grade: string;
  bookSeries: string;
  week: number;
  semester?: 1 | 2;
  unit: string;
  lessonName: string;
  period: string;
  periodNumber?: number; // Số thứ tự tiết (1 -> 140 hoặc 1 -> 70, 1 -> 175)
  periodInWeek?: number; // Tiết thứ mấy trong tuần (1, 2, 3, 4)
  periodLabel?: string;  // Nhãn tiết: 'Tiết 1', 'Tiết 2'
  lessonPart?: string;   // Phân nhánh bài học: 'Lesson 1: Part 1, 2', 'Khám phá & Luyện tập 1, 2'
  pageRange: string;
  activities?: string[];
  vocab?: string[];
  patterns?: string[];
  integratedCV2345?: {
    digitalCompetence?: string; // Năng lực số (CV 3456)
    aiLiteracy?: string;        // Nhận thức AI (QĐ 2422)
    trafficSafety?: string;     // An toàn giao thông
    lifeSkills?: string;        // Kỹ năng sống
    localEducation?: string;    // Giáo dục địa phương
    stemSteam?: string;         // Giáo dục STEM
  };
  objectives: {
    specificCompetencies: string[]; // Năng lực đặc thù chi tiết
    generalCompetencies: string[];  // Năng lực chung (Tự chủ, Giao tiếp, Sáng tạo)
    qualities: string[];            // Phẩm chất chủ yếu (Chăm chỉ, Trách nhiệm, Nhân ái)
  };
  warmUpGame: {
    name: string;
    aims: string;
    preparation: string;
    rules: string[];
    sampleQuestions: { question: string; answer: string }[];
    teacherScript: string;
  };
  exploration: {
    textbookFocus: string;
    teacherQuestions: string[];
    studentActions: string[];
    keyTakeaway: string; // Ghi nhớ / quy tắc chốt bài
  };
  practice: {
    exercises: { title: string; form: string; commonMistakes: string }[];
  };
  application: {
    realLifeScenario: string;
    activityGuide: string;
  };
  periodsList?: CurriculumPeriod[];
  sgvSourceUrl: string;
}

export interface SubjectMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
  grades: string[];
  defaultBook: string;
  periodsPerWeek: Record<string, number>; // Số tiết/tuần
  totalPeriodsPerYear: Record<string, number>; // Tổng tiết/năm
  hasOfficialPL2: boolean; // Có Phụ lục 2 KHDH chính thức
}

export const PRIMARY_SUBJECTS_METADATA: SubjectMeta[] = [
  { 
    id: 'Tiếng Anh', 
    name: 'Tiếng Anh', 
    icon: '🇬🇧', 
    color: 'blue', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Global Success (NXB Giáo dục Việt Nam)',
    periodsPerWeek: { 'Lớp 1': 2, 'Lớp 2': 2, 'Lớp 3': 4, 'Lớp 4': 4, 'Lớp 5': 4 },
    totalPeriodsPerYear: { 'Lớp 1': 70, 'Lớp 2': 70, 'Lớp 3': 140, 'Lớp 4': 140, 'Lớp 5': 140 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Toán', 
    name: 'Toán', 
    icon: '📐', 
    color: 'indigo', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 3, 'Lớp 2': 5, 'Lớp 3': 5, 'Lớp 4': 5, 'Lớp 5': 5 },
    totalPeriodsPerYear: { 'Lớp 1': 105, 'Lớp 2': 175, 'Lớp 3': 175, 'Lớp 4': 175, 'Lớp 5': 175 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Tiếng Việt', 
    name: 'Tiếng Việt', 
    icon: '📖', 
    color: 'rose', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 12, 'Lớp 2': 10, 'Lớp 3': 7, 'Lớp 4': 7, 'Lớp 5': 7 },
    totalPeriodsPerYear: { 'Lớp 1': 420, 'Lớp 2': 350, 'Lớp 3': 245, 'Lớp 4': 245, 'Lớp 5': 245 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Tự nhiên và Xã hội', 
    name: 'Tự nhiên và Xã hội', 
    icon: '🌿', 
    color: 'emerald', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 2, 'Lớp 2': 2, 'Lớp 3': 2 },
    totalPeriodsPerYear: { 'Lớp 1': 70, 'Lớp 2': 70, 'Lớp 3': 70 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Khoa học', 
    name: 'Khoa học', 
    icon: '🔬', 
    color: 'teal', 
    grades: ['Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 4': 2, 'Lớp 5': 2 },
    totalPeriodsPerYear: { 'Lớp 4': 70, 'Lớp 5': 70 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Lịch sử và Địa lí', 
    name: 'Lịch sử và Địa lí', 
    icon: '🗺️', 
    color: 'amber', 
    grades: ['Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 4': 2, 'Lớp 5': 2 },
    totalPeriodsPerYear: { 'Lớp 4': 70, 'Lớp 5': 70 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Tin học', 
    name: 'Tin học', 
    icon: '💻', 
    color: 'cyan', 
    grades: ['Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 3': 1, 'Lớp 4': 1, 'Lớp 5': 1 },
    totalPeriodsPerYear: { 'Lớp 3': 35, 'Lớp 4': 35, 'Lớp 5': 35 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Công nghệ', 
    name: 'Công nghệ', 
    icon: '⚙️', 
    color: 'orange', 
    grades: ['Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 3': 1, 'Lớp 4': 1, 'Lớp 5': 1 },
    totalPeriodsPerYear: { 'Lớp 3': 35, 'Lớp 4': 35, 'Lớp 5': 35 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Đạo đức', 
    name: 'Đạo đức', 
    icon: '❤️', 
    color: 'purple', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 1, 'Lớp 2': 1, 'Lớp 3': 1, 'Lớp 4': 1, 'Lớp 5': 1 },
    totalPeriodsPerYear: { 'Lớp 1': 35, 'Lớp 2': 35, 'Lớp 3': 35, 'Lớp 4': 35, 'Lớp 5': 35 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Hoạt động trải nghiệm', 
    name: 'Hoạt động trải nghiệm', 
    icon: '🎒', 
    color: 'fuchsia', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 3, 'Lớp 2': 3, 'Lớp 3': 3, 'Lớp 4': 3, 'Lớp 5': 3 },
    totalPeriodsPerYear: { 'Lớp 1': 105, 'Lớp 2': 105, 'Lớp 3': 105, 'Lớp 4': 105, 'Lớp 5': 105 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Âm nhạc', 
    name: 'Âm nhạc', 
    icon: '🎵', 
    color: 'pink', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 1, 'Lớp 2': 1, 'Lớp 3': 1, 'Lớp 4': 1, 'Lớp 5': 1 },
    totalPeriodsPerYear: { 'Lớp 1': 35, 'Lớp 2': 35, 'Lớp 3': 35, 'Lớp 4': 35, 'Lớp 5': 35 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Mĩ thuật', 
    name: 'Mĩ thuật', 
    icon: '🎨', 
    color: 'violet', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 1, 'Lớp 2': 1, 'Lớp 3': 1, 'Lớp 4': 1, 'Lớp 5': 1 },
    totalPeriodsPerYear: { 'Lớp 1': 35, 'Lớp 2': 35, 'Lớp 3': 35, 'Lớp 4': 35, 'Lớp 5': 35 },
    hasOfficialPL2: true 
  },
  { 
    id: 'Giáo dục thể chất', 
    name: 'Giáo dục thể chất', 
    icon: '⚽', 
    color: 'lime', 
    grades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'], 
    defaultBook: 'Kết nối tri thức với cuộc sống',
    periodsPerWeek: { 'Lớp 1': 2, 'Lớp 2': 2, 'Lớp 3': 2, 'Lớp 4': 2, 'Lớp 5': 2 },
    totalPeriodsPerYear: { 'Lớp 1': 70, 'Lớp 2': 70, 'Lớp 3': 70, 'Lớp 4': 70, 'Lớp 5': 70 },
    hasOfficialPL2: true 
  }
];

export const PRIMARY_GRADES_LIST = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'];

// Special hand-crafted showcase warm-up games by subject and period type
function getPeriodSpecificGame(subject: string, lessonPart: string, theme: string, vocab?: string[], pattern?: string) {
  const isEnglish = subject === 'Tiếng Anh';
  const isMath = subject === 'Toán';
  const isVietnamese = subject === 'Tiếng Việt';
  const isScience = subject === 'Khoa học' || subject === 'Tự nhiên và Xã hội';

  if (isEnglish) {
    if (lessonPart.toLowerCase().includes('part 1') || lessonPart.toLowerCase().includes('listen and repeat')) {
      return {
        name: 'Pass the Ball & Chant Warm-up ⚽',
        aims: 'Tạo không khí sôi động, kích hoạt phản xạ nghe và nhắc lại từ vựng / mẫu câu mở đầu.',
        preparation: 'Bóng mềm, loa Bluetooth, flashcards bài học.',
        rules: [
          'GV bật nhạc, HS chuyền bóng theo vòng tròn.',
          'Khi nhạc dừng, bạn đang cầm bóng đọc to từ vựng hoặc mẫu câu trên màn hình/flashcard.',
          'Cả lớp đồng thanh nhắc lại để nhận sao thưởng.'
        ],
        sampleQuestions: [
          { question: `Pronounce target word: "${vocab?.[0] || 'Hello'}"`, answer: 'Correct natural pronunciation' },
          { question: `Repeat sentence pattern: "${pattern || 'Hello, I am Mai.'}"`, answer: 'Accurate intonation' }
        ],
        teacherScript: 'Hello everyone! Let\'s pass the ball and say our magic words today!'
      };
    } else if (lessonPart.toLowerCase().includes('chant') || lessonPart.toLowerCase().includes('let\'s talk')) {
      return {
        name: 'Slap the Board & Mini Role-play ✋',
        aims: 'Rèn luyện phản xạ nghe - nhận diện từ vựng nhanh và tự tin nói theo cặp.',
        preparation: 'Bảng từ vựng, búa nhựa/tay dính đồ chơi.',
        rules: [
          'Chia lớp thành 2 đội (Red Team & Blue Team).',
          'GV đọc 1 từ vựng/mẫu câu, đại diện 2 đội chạy lên đập tay vào đúng từ/tranh trên bảng.',
          'Đội nhanh hơn được quyền đóng vai hỏi - đáp mẫu câu.'
        ],
        sampleQuestions: [
          { question: `Find and slap the word: "${vocab?.[1] || vocab?.[0] || 'Friend'}"`, answer: 'Quick touch on board' },
          { question: `Ask and answer: "${pattern || 'How are you? - I am fine, thank you.'}"`, answer: 'Fluent pair speaking' }
        ],
        teacherScript: 'Are you ready for the Slap the Board challenge? 1, 2, 3... Go!'
      };
    } else {
      return {
        name: 'Lucky Stars & Mystery Box 🎁',
        aims: 'Tổng hợp từ vựng, mẫu câu và phát triển kỹ năng giao tiếp qua trò chơi khám phá.',
        preparation: 'Hộp quà bí mật, các ngôi sao may mắn chứa câu hỏi.',
        rules: [
          'HS chọn ngôi sao may mắn để mở câu hỏi thử thách.',
          'Nếu trả lời đúng sẽ nhận quà và mở ra một gợi ý quan trọng của bài học.'
        ],
        sampleQuestions: [
          { question: 'Complete the sentence with the missing word', answer: 'Target vocabulary' },
          { question: 'Role-play in 30 seconds', answer: 'Natural performance' }
        ],
        teacherScript: 'Let\'s open the mystery box and discover today\'s exciting mission!'
      };
    }
  }

  if (isMath) {
    if (lessonPart.toLowerCase().includes('tiết 1') || lessonPart.toLowerCase().includes('khám phá')) {
      return {
        name: 'Bắn tên toán học & Tiếp sức số học 🏹',
        aims: `Kích hoạt kiến thức nền và tạo tâm thế hứng khởi trước khi khám phá ${theme}.`,
        preparation: 'Bảng con, thẻ số, vòng quay may mắn.',
        rules: [
          'GV hô: "Bắn tên, bắn tên!" - Cả lớp đồng thanh: "Tên ai, tên ai?".',
          'GV gọi tên 1 bạn trả lời phép tính hoặc quy tắc toán học.',
          'Bạn trả lời đúng được bắn tên tiếp sang bạn khác trong lớp.'
        ],
        sampleQuestions: [
          { question: `Nêu kết quả phép tính hoặc đặc điểm liên quan đến ${theme}?`, answer: 'Chính xác theo chuẩn SGK' },
          { question: 'Số liền trước/liền sau hoặc quy tắc thực hiện là gì?', answer: 'Quy tắc chuẩn' }
        ],
        teacherScript: 'Chào các con! Hôm nay chúng mình cùng khởi động với trò chơi Bắn tên để mở cánh cửa kiến thức mới nhé!'
      };
    } else {
      return {
        name: 'Vòng quay kì diệu - Giải cứu công chúa 🎡',
        aims: 'Luyện phản xạ tính nhẩm nhanh và vận dụng giải bài tập thực hành.',
        preparation: 'Vòng quay kỹ thuật số, hoa điểm thưởng.',
        rules: [
          'Quay vòng quay để chọn điểm số thử thách.',
          'HS tính nhẩm và viết đáp án vào bảng con trong 10 giây.'
        ],
        sampleQuestions: [
          { question: 'Tính nhanh kết quả phép tính trên vòng quay', answer: 'Đáp án chuẩn' },
          { question: 'Nêu cách làm ngắn gọn nhất', answer: 'Trình bày logic' }
        ],
        teacherScript: 'Cùng quay vòng quay và rinh về thật nhiều hoa điểm 10 nào các con!'
      };
    }
  }

  if (isVietnamese) {
    return {
      name: 'Hộp quà bí mật - Ô cửa tri thức 📦',
      aims: `Tạo cảm xúc kết nối với văn bản đọc và nội dung bài học ${theme}.`,
      preparation: 'Tranh ảnh gợi mở, bài hát hoặc video ngắn theo chủ đề.',
      rules: [
        'HS quan sát hình ảnh/nghe giai điệu bài hát và đoán tên đồ vật/nhân vật.',
        'Trả lời câu hỏi liên hệ thực tế đời sống để dẫn dắt vào bài đọc.'
      ],
      sampleQuestions: [
        { question: `Quan sát bức tranh mở đầu bài, em thấy những hình ảnh nào?`, answer: 'Chi tiết trong tranh SGK' },
        { question: `Chia sẻ một kỷ niệm của em liên quan đến chủ đề bài học?`, answer: 'Cảm nghĩ chân thật của HS' }
      ],
      teacherScript: 'Hôm nay cô có một món quà bí mật muốn gửi tặng lớp mình, chúng mình cùng khám phá nhé!'
    };
  }

  if (isScience) {
    return {
      name: 'Nhà khoa học nhí - Thử tài phán đoán 🔬',
      aims: 'Khơi gợi trí tò mò khoa học và kích hoạt quan sát thực tế.',
      preparation: 'Vật thật thí nghiệm, tranh ảnh trực quan.',
      rules: [
        'HS quan sát hiện tượng và đưa ra dự đoán kết quả.',
        'Thảo luận nhanh nhóm đôi để tìm ra lời giải thích hợp lý nhất.'
      ],
      sampleQuestions: [
        { question: 'Hiện tượng gì sẽ xảy ra khi ta làm thí nghiệm này?', answer: 'Dự đoán khoa học' }
      ],
      teacherScript: 'Chào mừng các nhà khoa học nhí đến với phòng thí nghiệm vui nhộn hôm nay!'
    };
  }

  return {
    name: 'Khởi động vui nhộn & Thử tài nhanh trí 🌟',
    aims: `Tạo không khí tích cực và dẫn dắt vào nội dung ${theme}.`,
    preparation: 'Bảng nhóm, thẻ bài tập.',
    rules: [
      'HS tham gia hoạt động vận động theo nhạc hoặc giải câu đố nhanh.',
      'Tuyên dương cá nhân và đội có câu trả lời sáng tạo nhất.'
    ],
    sampleQuestions: [
      { question: `Em biết gì về chủ đề ${theme}?`, answer: 'Hiểu biết ban đầu của HS' }
    ],
    teacherScript: 'Cùng bắt đầu tiết học với trò chơi khởi động tràn đầy năng lượng nào!'
  };
}

/**
 * Build a highly granular, period-specific SGV lesson entry (Phụ lục 2 KHDH level)
 */
function buildGranularPeriodEntry(
  subject: string,
  grade: string,
  bookSeries: string,
  weekData: SubjectCurriculumWeekDetailed,
  period: CurriculumPeriod,
  periodIndexInWeek: number,
  globalPeriodNum: number
): SGVLessonEntry {
  const normGrade = normalizeGrade(grade);
  const isEnglish = subject === 'Tiếng Anh';
  const isMath = subject === 'Toán';
  const isVietnamese = subject === 'Tiếng Việt';
  const isScience = subject === 'Khoa học' || subject === 'Tự nhiên và Xã hội';
  const isHistoryGeo = subject === 'Lịch sử và Địa lí';
  const isInformatics = subject === 'Tin học';
  const isTechnology = subject === 'Công nghệ';
  const isEthics = subject === 'Đạo đức';
  const isExperience = subject === 'Hoạt động trải nghiệm';

  const periodId = `sgv_${subject.toLowerCase().replace(/\s+/g, '_')}_${normGrade.toLowerCase().replace(/\s+/g, '_')}_p${globalPeriodNum}`;
  const periodLabel = period.periodLabel || `Tiết ${periodIndexInWeek + 1}`;
  const lessonPartTitle = period.lessonPart || `Tiết ${periodIndexInWeek + 1}`;

  // Period specific competencies
  const specificCompetencies: string[] = [];
  if (isEnglish) {
    if (period.vocab && period.vocab.length > 0) {
      specificCompetencies.push(`Nhận biết, hiểu nghĩa và phát âm chuẩn các từ vựng: ${period.vocab.join(', ')}.`);
    } else if (weekData.keyVocabulary && weekData.keyVocabulary.length > 0) {
      specificCompetencies.push(`Ghi nhớ và phát âm chuẩn xác từ vựng trọng tâm bài học: ${weekData.keyVocabulary.slice(0, 4).join(', ')}.`);
    }
    if (period.patterns && period.patterns.length > 0) {
      specificCompetencies.push(`Sử dụng đúng cấu trúc mẫu câu: "${period.patterns.join(' / ')}" để giao tiếp tự tin.`);
    } else if (weekData.sentencePatternsOrRules && weekData.sentencePatternsOrRules.length > 0) {
      specificCompetencies.push(`Vận dụng mẫu câu: "${weekData.sentencePatternsOrRules[0]}" trong ngữ cảnh giao tiếp thực tế.`);
    }
    specificCompetencies.push(`Thực hiện thuần thục các hoạt động trong tiết: ${period.scope || lessonPartTitle}.`);
  } else if (isMath) {
    specificCompetencies.push(`Nắm vững kiến thức trọng tâm của tiết dạy: ${period.keyFocus || weekData.keyKnowledge}.`);
    specificCompetencies.push(`Thực hiện thành thạo các dạng bài tập thực hành trong SGK trang ${period.pageRange || weekData.textbookPageRange || ''}.`);
    specificCompetencies.push(`Phát triển năng lực tư duy và lập luận toán học, năng lực giải quyết vấn đề toán học.`);
  } else if (isVietnamese) {
    specificCompetencies.push(`Đạt yêu cầu cần đạt phân môn (${lessonPartTitle}): đọc đúng, viết chuẩn, hoặc mở rộng vốn từ.`);
    specificCompetencies.push(`Hiểu và vận dụng đúng các kiến thức tiếng Việt vào bài thực hành.`);
    specificCompetencies.push(`Phát triển kỹ năng tương tác ngôn ngữ và cảm thụ văn học.`);
  } else {
    specificCompetencies.push(`Nắm vững kiến thức trọng tâm của tiết học: ${period.keyFocus || weekData.keyKnowledge}.`);
    specificCompetencies.push(`Vận dụng thực hành kỹ năng theo hướng dẫn trong SGK trang ${period.pageRange || weekData.textbookPageRange || ''}.`);
    specificCompetencies.push(`Hình thành năng lực đặc thù và phẩm chất tương ứng theo CTGDPT 2018.`);
  }

  // Generate Warm-up game
  const warmUp = getPeriodSpecificGame(
    subject, 
    lessonPartTitle, 
    weekData.theme || weekData.lessonTitle,
    period.vocab || weekData.keyVocabulary,
    period.patterns?.[0] || weekData.sentencePatternsOrRules?.[0]
  );

  // Discovery questions
  const teacherQuestions: string[] = [
    `Bước 1 (Quan sát - Trải nghiệm): Các em hãy quan sát kỹ tranh/học liệu trong SGK trang ${period.pageRange || weekData.textbookPageRange || ''} và cho cô biết có những chi tiết/dữ liệu nào?`,
    `Bước 2 (Phân tích - Khám phá): Qua hoạt động "${lessonPartTitle}", em phát hiện ra quy luật hoặc đặc điểm gì mới?`,
    `Bước 3 (Chuẩn hóa kiến thức): Hãy nêu lại quy tắc / mẫu câu / cách thực hiện bằng chính lời của em?`
  ];

  const studentActions: string[] = [
    'Học sinh mở SGK đúng trang bài học, quan sát tranh ảnh hoặc văn bản.',
    'Thao tác cá nhân với đồ dùng học tập hoặc trao đổi cặp đôi với bạn cùng bàn.',
    'Tích cực lắng nghe hướng dẫn của giáo viên và xung phong phát biểu xây dựng bài.',
    'Đọc đồng thanh hoặc ghi nhận kiến thức trọng tâm vào vở ghi/bảng con.'
  ];

  // Practice exercises for this period
  const exercises = [
    {
      title: `Hoạt động luyện tập 1: ${lessonPartTitle} (SGK trang ${period.pageRange || weekData.textbookPageRange || ''})`,
      form: isEnglish ? 'Thực hành theo cặp (Pair work) & Hỏi đáp cá nhân' : 'Làm bài cá nhân vào vở / bảng con',
      commonMistakes: isEnglish ? 'Phát âm thiếu âm cuối hoặc ngập ngừng khi nói' : 'Tính toán vội vàng hoặc đọc chưa kỹ đề'
    },
    {
      title: `Hoạt động luyện tập 2: Tương tác mở rộng & Vận dụng`,
      form: 'Thảo luận nhóm 4 & Báo cáo chia sẻ trước lớp',
      commonMistakes: 'Phân công nhiệm vụ chưa đồng đều trong nhóm'
    }
  ];

  // Title formatting
  const fullLessonTitle = isEnglish
    ? `${weekData.unitCode}: ${weekData.theme} • ${periodLabel}: ${lessonPartTitle}`
    : `${weekData.lessonTitle} • ${periodLabel}: ${lessonPartTitle}`;

  return {
    id: periodId,
    entryType: 'period',
    subject,
    grade: normGrade,
    bookSeries,
    week: weekData.week,
    semester: weekData.semester,
    unit: weekData.unitCode ? `${weekData.unitCode} - ${weekData.theme}` : weekData.theme,
    lessonName: fullLessonTitle,
    period: `${periodLabel} (35 phút) - Phân phối tiết ${globalPeriodNum}`,
    periodNumber: globalPeriodNum,
    periodInWeek: periodIndexInWeek + 1,
    periodLabel: periodLabel,
    lessonPart: lessonPartTitle,
    pageRange: period.pageRange || weekData.textbookPageRange || `SGK ${subject} ${normGrade}`,
    activities: isEnglish ? [lessonPartTitle, period.scope || 'Luyện tập các kỹ năng'] : [lessonPartTitle],
    vocab: period.vocab || weekData.keyVocabulary,
    patterns: period.patterns || weekData.sentencePatternsOrRules,
    integratedCV2345: period.integratedCV2345 || {
      digitalCompetence: 'NLS: Khai thác kho học liệu số tương tác hoclieu.vn & taphuan.nxbgd.vn.',
      aiLiteracy: 'AI: Hướng dẫn học sinh ứng dụng AI nhận diện phát âm và học tập an toàn.',
      trafficSafety: 'ATGT: Tích hợp kỹ năng đi bộ an toàn và đội mũ bảo hiểm chuẩn quy định.',
      lifeSkills: 'KNS: Kỹ năng lắng nghe tích cực, tự tin chia sẻ và hợp tác nhóm.'
    },
    objectives: {
      specificCompetencies,
      generalCompetencies: [
        'Tự chủ và tự học: Tự giác chuẩn bị sách vở, đồ dùng học tập môn học và hoàn thành nhiệm vụ.',
        'Giao tiếp và hợp tác: Tích cực tương tác với bạn cùng bàn, tự tin phát biểu ý kiến trước lớp.',
        'Giải quyết vấn đề và sáng tạo: Chủ động đề xuất phương án giải quyết bài tập hoặc câu hỏi tình huống.'
      ],
      qualities: [
        'Chăm chỉ: Tích cực tham gia các hoạt động học tập trong tiết học, kiên trì rèn luyện.',
        'Trách nhiệm: Giữ gìn sách vở, đồ dùng học tập và hoàn thành đầy đủ bài tập được giao.',
        'Nhân ái: Tôn trọng ý kiến của bạn bè, biết lắng nghe và giúp đỡ bạn cùng tiến bộ.'
      ]
    },
    warmUpGame: warmUp,
    exploration: {
      textbookFocus: `Học liệu trọng tâm tiết học: ${period.keyFocus || lessonPartTitle} (SGK trang ${period.pageRange || weekData.textbookPageRange || ''}).`,
      teacherQuestions,
      studentActions,
      keyTakeaway: isEnglish 
        ? `GHI NHỚ TIẾT HỌC: Từ vựng (${(period.vocab || weekData.keyVocabulary || []).join(', ') || 'Target words'}) | Mẫu câu: "${period.patterns?.[0] || weekData.sentencePatternsOrRules?.[0] || 'Target sentence'}"`
        : `GHI NHỚ TRỌNG TÂM TIẾT ${globalPeriodNum}: ${period.keyFocus || weekData.keyKnowledge}`
    },
    practice: {
      exercises
    },
    application: {
      realLifeScenario: isEnglish
        ? `Vận dụng từ vựng và mẫu câu vừa học để chào hỏi, giao tiếp thực tế với thầy cô và bạn bè trong giờ ra chơi.`
        : `Vận dụng kiến thức tiết học vào giải quyết tình huống thực tiễn hàng ngày của học sinh.`,
      activityGuide: 'Giáo viên giao nhiệm vụ liên hệ thực tế, động viên học sinh chia sẻ bài học với người thân khi về nhà.'
    },
    sgvSourceUrl: 'https://taphuan.nxbgd.vn/tap-huan'
  };
}

/**
 * Build Week/Lesson aggregate SGV entry
 */
function buildWeekAggregateEntry(
  subject: string,
  grade: string,
  bookSeries: string,
  weekData: SubjectCurriculumWeekDetailed
): SGVLessonEntry {
  const normGrade = normalizeGrade(grade);
  const weekNum = weekData.week;
  const id = `sgv_${subject.toLowerCase().replace(/\s+/g, '_')}_${normGrade.toLowerCase().replace(/\s+/g, '_')}_w${weekNum}`;

  const isEnglish = subject === 'Tiếng Anh';
  const isMath = subject === 'Toán';

  return {
    id,
    entryType: 'week',
    subject,
    grade: normGrade,
    bookSeries,
    week: weekNum,
    semester: weekData.semester,
    unit: weekData.unitCode ? `${weekData.unitCode} - ${weekData.theme}` : weekData.theme || `Chủ đề tuần ${weekNum}`,
    lessonName: weekData.lessonTitle,
    period: `${weekData.periodCount} tiết (${weekData.periodCount * 35} phút) • Tuần ${weekNum}`,
    pageRange: weekData.textbookPageRange || `SGK ${subject} ${normGrade} - Trang ${weekNum * 2 + 10} - ${weekNum * 2 + 14}`,
    vocab: weekData.keyVocabulary,
    patterns: weekData.sentencePatternsOrRules,
    objectives: {
      specificCompetencies: [
        `Nắm vững kiến thức trọng tâm toàn bài/toàn tuần: ${weekData.keyKnowledge}.`,
        `Thực hiện thành thạo các nhiệm vụ học tập chuẩn SGK và VBT môn ${subject} ${normGrade}.`,
        `Phát triển năng lực đặc thù và tư duy theo chuẩn Chương trình GDPT 2018.`
      ],
      generalCompetencies: [
        'Tự chủ và tự học: Tự giác chuẩn bị sách vở, đồ dùng học tập và hoàn thành nhiệm vụ được giao.',
        'Giao tiếp và hợp tác: Tích cực thảo luận cặp đôi, nhóm và tự tin trình bày trước lớp.',
        'Giải quyết vấn đề và sáng tạo: Chủ động đề xuất cách giải quyết nhiệm vụ học tập sáng tạo.'
      ],
      qualities: [
        'Chăm chỉ: Tích cực tham gia các hoạt động học tập và hoàn thành bài tập rèn luyện.',
        'Trách nhiệm: Có ý thức giữ gìn đồ dùng học tập và hợp tác tốt với bạn bè.',
        'Nhân ái & Trung thực: Tôn trọng ý kiến của bạn, đoàn kết và giúp đỡ nhau cùng tiến bộ.'
      ]
    },
    warmUpGame: {
      name: weekData.suggestedGame?.name || 'Vòng quay kì diệu & Hộp quà bí mật 🎡',
      aims: weekData.suggestedGame?.goal || `Tạo không khí hào hứng và kích hoạt kiến thức nền bài ${weekData.lessonTitle}.`,
      preparation: weekData.suggestedGame?.materials || 'Bảng con, thẻ học tập, máy chiếu, sao điểm thưởng.',
      rules: [
        'Giáo viên phổ biến luật chơi và hiệu lệnh bắt đầu.',
        'Học sinh lắng nghe câu hỏi thử thách và suy nghĩ trong 10-15 giây.',
        'Các nhóm hoặc cá nhân thi đua giơ tín hiệu trả lời nhanh và chính xác.',
        'Giáo viên tuyên dương, cộng điểm thưởng và dẫn dắt khéo léo vào bài học mới.'
      ],
      sampleQuestions: [
        { question: `Nêu kiến thức đã học liên quan đến ${weekData.theme}?`, answer: 'Đúng chuẩn kiến thức SGK' },
        { question: `Khái niệm nào là trọng tâm của bài học hôm nay?`, answer: weekData.keyKnowledge.slice(0, 50) }
      ],
      teacherScript: `Chào mừng các em đến với tiết học ${subject} ${normGrade}! Cùng khởi động tràn đầy hứng khởi với bài học "${weekData.lessonTitle}" nhé!`
    },
    exploration: {
      textbookFocus: `Học liệu toàn diện mục Khám phá bài ${weekData.lessonTitle} (${weekData.textbookPageRange || 'SGK'}).`,
      teacherQuestions: [
        `Bước 1: Quan sát dữ liệu trong SGK và phát hiện các yếu tố cơ bản.`,
        `Bước 2: Phân tích quy luật hoặc bản chất kiến thức.`,
        `Bước 3: Tóm tắt ghi nhớ trọng tâm toàn bài.`
      ],
      studentActions: [
        'Học sinh mở SGK, quan sát trực quan tranh ảnh hoặc ví dụ mẫu.',
        'Thao tác với bộ đồ dùng học tập cá nhân.',
        'Thảo luận cặp đôi chia sẻ kết quả và báo cáo trước lớp.'
      ],
      keyTakeaway: `QUY TẮC / GHI NHỚ TOÀN BÀI: ${weekData.keyKnowledge}`
    },
    practice: {
      exercises: [
        { title: `Bài tập 1: Luyện tập cơ bản (SGK)`, form: 'Làm việc cá nhân vào vở', commonMistakes: 'Đọc chưa kĩ yêu cầu đề bài' },
        { title: `Bài tập 2: Luyện tập mở rộng & Tương tác`, form: 'Thực hành theo cặp', commonMistakes: 'Chưa tự tin chia sẻ' },
        { title: `Bài tập 3: Vận dụng giải quyết tình huống`, form: 'Thảo luận nhóm 4', commonMistakes: 'Phân công chưa đều' }
      ]
    },
    application: {
      realLifeScenario: weekData.suggestedScenario || `Ứng dụng kiến thức bài "${weekData.lessonTitle}" vào đời sống thực tế hàng ngày.`,
      activityGuide: 'Giáo viên giao nhiệm vụ liên hệ thực tế cho học sinh trải nghiệm tại nhà.'
    },
    periodsList: weekData.periods,
    sgvSourceUrl: 'https://taphuan.nxbgd.vn/tap-huan'
  };
}

// In-memory cache for all generated SGV lesson entries
let CACHED_ALL_SGV_LESSONS: {
  all: SGVLessonEntry[];
  periodsOnly: SGVLessonEntry[];
  weeksOnly: SGVLessonEntry[];
} | null = null;

function buildAllSGVDatabase() {
  if (CACHED_ALL_SGV_LESSONS) {
    return CACHED_ALL_SGV_LESSONS;
  }

  const allEntries: SGVLessonEntry[] = [];
  const periodsOnly: SGVLessonEntry[] = [];
  const weeksOnly: SGVLessonEntry[] = [];

  for (const subjectMeta of PRIMARY_SUBJECTS_METADATA) {
    for (const grade of subjectMeta.grades) {
      try {
        const weeksData = getFull35WeeksForSubjectAndGrade(subjectMeta.name, grade);
        let globalPeriodCounter = 0;

        for (const weekData of weeksData) {
          // 1. Build week aggregate entry
          const weekEntry = buildWeekAggregateEntry(
            subjectMeta.name,
            grade,
            subjectMeta.defaultBook,
            weekData
          );
          allEntries.push(weekEntry);
          weeksOnly.push(weekEntry);

          // 2. Build granular period entries for each period in the week
          if (weekData.periods && weekData.periods.length > 0) {
            weekData.periods.forEach((p, pIdx) => {
              globalPeriodCounter++;
              const periodEntry = buildGranularPeriodEntry(
                subjectMeta.name,
                grade,
                subjectMeta.defaultBook,
                weekData,
                p,
                pIdx,
                globalPeriodCounter
              );
              allEntries.push(periodEntry);
              periodsOnly.push(periodEntry);
            });
          }
        }
      } catch (err) {
        console.warn(`Error generating SGV for ${subjectMeta.name} ${grade}:`, err);
      }
    }
  }

  CACHED_ALL_SGV_LESSONS = {
    all: allEntries,
    periodsOnly,
    weeksOnly
  };

  return CACHED_ALL_SGV_LESSONS;
}

/**
 * Get all SGV Lesson Entries
 */
export function getAllSGVLessons(): SGVLessonEntry[] {
  return buildAllSGVDatabase().all;
}

/**
 * Query SGV lessons by subject, grade, semester, week, search query, and viewMode
 */
export function querySGVLessons(params: {
  subject?: string;
  grade?: string | number;
  semester?: 1 | 2;
  week?: number;
  viewMode?: 'period' | 'week' | 'all'; // Default 'period' for Phụ lục 2 detailed periods
  searchQuery?: string;
}): SGVLessonEntry[] {
  const db = buildAllSGVDatabase();
  const viewMode = params.viewMode || 'period';
  
  const sourceList = viewMode === 'period' 
    ? db.periodsOnly 
    : viewMode === 'week' 
      ? db.weeksOnly 
      : db.all;

  const searchLower = (params.searchQuery || '').toLowerCase().trim();
  const subjectLower = (params.subject || '').toLowerCase().trim();
  const rawGrade = params.grade !== undefined && params.grade !== null ? String(params.grade) : '';
  const gradeClean = rawGrade ? rawGrade.replace(/Lớp|Grade/i, '').trim() : '';

  return sourceList.filter(item => {
    // Subject filter
    if (subjectLower && subjectLower !== 'tất cả' && subjectLower !== '' && subjectLower !== 'all') {
      if (item.subject.toLowerCase() !== subjectLower) {
        return false;
      }
    }

    // Grade filter
    if (gradeClean && gradeClean.toLowerCase() !== 'tất cả' && gradeClean.toLowerCase() !== 'all') {
      if (!item.grade.includes(gradeClean)) {
        return false;
      }
    }

    // Semester filter
    if (params.semester) {
      if (item.semester !== params.semester) {
        return false;
      }
    }

    // Week filter
    if (params.week && params.week > 0) {
      if (item.week !== params.week) {
        return false;
      }
    }

    // Search query filter
    if (searchLower) {
      const matchName = item.lessonName.toLowerCase().includes(searchLower);
      const matchUnit = item.unit.toLowerCase().includes(searchLower);
      const matchGame = item.warmUpGame.name.toLowerCase().includes(searchLower);
      const matchTakeaway = item.exploration.keyTakeaway.toLowerCase().includes(searchLower);
      const matchSubject = item.subject.toLowerCase().includes(searchLower);
      const matchGrade = item.grade.toLowerCase().includes(searchLower);
      const matchPeriod = (item.periodLabel || '').toLowerCase().includes(searchLower) || `tiết ${item.periodNumber || ''}`.includes(searchLower);
      const matchVocab = (item.vocab || []).some(v => v.toLowerCase().includes(searchLower));
      const matchPattern = (item.patterns || []).some(p => p.toLowerCase().includes(searchLower));
      const matchWeek = `tuần ${item.week}`.includes(searchLower) || `week ${item.week}`.includes(searchLower);

      if (!matchName && !matchUnit && !matchGame && !matchTakeaway && !matchSubject && !matchGrade && !matchPeriod && !matchVocab && !matchPattern && !matchWeek) {
        return false;
      }
    }

    return true;
  });
}
