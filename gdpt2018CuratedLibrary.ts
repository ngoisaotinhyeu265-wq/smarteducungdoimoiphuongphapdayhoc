/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, SubjectType, GameType } from '../types';

export type GDPTCategoryKey = 'math' | 'vietnamese' | 'english' | 'science' | 'social_studies';

export interface GDPTTopic {
  id: string;
  categoryKey: GDPTCategoryKey;
  subject: SubjectType;
  title: string;
  grade: number; // 1 to 5
  icon: string;
  color: string;
  badgeBg: string;
  unitOrChapter: string;
  bookSeries: string;
  standardCode: string; // GDPT 2018 YCCĐ
  learningOutcomes: string[];
  competencies: string[];
  recommendedGames: GameType[];
  conceptNotes: string;
  questions: Question[];
}

export interface GDPTCategoryInfo {
  key: GDPTCategoryKey;
  name: string;
  vietnameseName: string;
  icon: string;
  color: string;
  bgLight: string;
  borderColor: string;
  gradient: string;
  description: string;
  coreCompetencies: string[];
}

export const GDPT_CATEGORIES: GDPTCategoryInfo[] = [
  {
    key: 'math',
    name: 'Math',
    vietnameseName: 'Toán học',
    icon: '📐',
    color: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    gradient: 'from-indigo-600 via-blue-600 to-cyan-700',
    description: 'Số học & phép tính, Hình học trực quan, Đo lường & Thống kê xác suất chuẩn GDPT 2018 Tiểu học.',
    coreCompetencies: ['Tư duy và lập luận toán học', 'Mô hình hóa toán học', 'Giải quyết vấn đề toán học', 'Sử dụng công cụ học toán']
  },
  {
    key: 'vietnamese',
    name: 'Vietnamese Language',
    vietnameseName: 'Tiếng Việt',
    icon: '📖',
    color: 'text-rose-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    gradient: 'from-rose-600 via-pink-600 to-red-700',
    description: 'Đọc hiểu văn bản, Luyện từ và câu, Chính tả ngữ âm, Viết sáng tạo & Biện pháp nghệ thuật.',
    coreCompetencies: ['Năng lực ngôn ngữ (Đọc - Viết - Nói - Nghe)', 'Năng lực thẩm mỹ & Cảm thụ văn học', 'Tự chủ và tự học']
  },
  {
    key: 'english',
    name: 'English',
    vietnameseName: 'Tiếng Anh',
    icon: '🔤',
    color: 'text-sky-600',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    gradient: 'from-sky-600 via-cyan-600 to-blue-700',
    description: 'Global Success & CEFR A1: Từ vựng theo chủ đề, Ngữ âm Phonics, Mẫu câu giao tiếp & Nghe - Nói tương tác.',
    coreCompetencies: ['Giao tiếp tiếng Anh (A1)', 'Phát âm chuẩn & Phonics', 'Giao lưu văn hóa quốc tế', 'Tự tin thuyết trình']
  },
  {
    key: 'science',
    name: 'Science',
    vietnameseName: 'Khoa học / TN&XH',
    icon: '🔬',
    color: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
    description: 'Tự nhiên & Xã hội (Lớp 1-3) & Khoa học (Lớp 4-5): Con người, Thực vật, Động vật, Năng lượng & Môi trường.',
    coreCompetencies: ['Nhận thức khoa học tự nhiên', 'Tìm hiểu môi trường tự nhiên xung quanh', 'Vận dụng kiến thức khoa học vào thực tiễn']
  },
  {
    key: 'social_studies',
    name: 'Social Studies',
    vietnameseName: 'Lịch sử & Địa lý',
    icon: '🌏',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gradient: 'from-amber-600 via-orange-600 to-yellow-700',
    description: 'Lịch sử và Địa lý (Lớp 4-5) & Tìm hiểu địa phương: Đất nước, con người, mốc son lịch sử hào hùng & danh lam thắng cảnh.',
    coreCompetencies: ['Nhận thức khoa học lịch sử và địa lý', 'Tìm hiểu lịch sử và địa lý', 'Vận dụng kiến thức, kĩ năng đã học vào cuộc sống']
  }
];

export const GDPT_CURATED_TOPICS: GDPTTopic[] = [
  // ==================== 1. TOÁN HỌC (MATH) ====================
  {
    id: 'math_g1_addition_subtraction_100',
    categoryKey: 'math',
    subject: 'Toán',
    title: 'Phép cộng, phép trừ trong phạm vi 100 (Không nhớ & Có lời văn)',
    grade: 1,
    icon: '➕',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    unitOrChapter: 'Chủ đề 8: Phép cộng, phép trừ không nhớ trong phạm vi 100',
    bookSeries: 'Kết nối tri thức & Cánh diều',
    standardCode: 'TOAN_G1_YCCD_ST_02',
    learningOutcomes: [
      'Thực hiện được phép cộng, phép trừ trong phạm vi 100 (dạng 30 + 20, 50 - 20, 32 + 25, 57 - 23)',
      'Nhận biết số liền trước, số liền sau, cấu tạo thập phân của số có hai chữ số',
      'Giải quyết được bài toán thực tế đơn giản có một phép tính cộng hoặc trừ'
    ],
    competencies: ['Tư duy tính toán nhanh', 'Nhận biết quan hệ số lượng', 'Giải quyết vấn đề thực tế'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'balloon'],
    conceptNotes: 'Quy tắc cộng trừ số có hai chữ số: cộng/trừ hàng đơn vị trước, sau đó cộng/trừ hàng chục. Đặt tính thẳng cột.',
    questions: [
      {
        id: 'gdpt_m1_01',
        text: 'Kết quả của phép tính: 42 + 35 là bao nhiêu?',
        type: 'multiple_choice',
        options: ['77', '76', '87', '67'],
        answer: '77',
        subject: 'Toán',
        grade: 1,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 42,
        explanation: 'Ta có: 2 + 5 = 7 (hàng đơn vị), 4 + 3 = 7 (hàng chục). Vậy 42 + 35 = 77.',
        tags: ['Phép cộng', 'Toán lớp 1', 'Cộng không nhớ']
      },
      {
        id: 'gdpt_m1_02',
        text: 'Số liền sau của số 79 là số nào?',
        type: 'multiple_choice',
        options: ['80', '78', '81', '70'],
        answer: '80',
        subject: 'Toán',
        grade: 1,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 38,
        explanation: 'Muốn tìm số liền sau của một số, ta lấy số đó cộng thêm 1 đơn vị: 79 + 1 = 80.',
        tags: ['Số liền sau', 'Số có hai chữ số']
      },
      {
        id: 'gdpt_m1_03',
        text: 'Mẹ hái được 35 quả cam, bà cho thêm 14 quả cam. Hỏi có tất cả bao nhiêu quả cam?',
        type: 'multiple_choice',
        options: ['49 quả cam', '48 quả cam', '59 quả cam', '39 quả cam'],
        answer: '49 quả cam',
        subject: 'Toán',
        grade: 1,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 51,
        explanation: 'Số quả cam có tất cả là: 35 + 14 = 49 (quả cam).',
        tags: ['Toán có lời văn', 'Phép cộng']
      },
      {
        id: 'gdpt_m1_04',
        text: 'Tìm số thích hợp điền vào chỗ chấm: 86 - .... = 50',
        type: 'multiple_choice',
        options: ['36', '26', '46', '30'],
        answer: '36',
        subject: 'Toán',
        grade: 1,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Vận dụng',
        useCount: 29,
        explanation: 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: 86 - 50 = 36.',
        tags: ['Tìm thành phần chưa biết', 'Phép trừ']
      },
      {
        id: 'gdpt_m1_05',
        text: 'Đồng hồ chỉ mấy giờ khi kim ngắn chỉ số 3 và kim dài chỉ số 12?',
        type: 'multiple_choice',
        options: ['3 giờ đúng', '12 giờ', '3 giờ 12 phút', '6 giờ'],
        answer: '3 giờ đúng',
        subject: 'Toán',
        grade: 1,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 33,
        explanation: 'Khi kim dài chỉ số 12 và kim ngắn chỉ số 3, đồng hồ đang chỉ 3 giờ đúng.',
        tags: ['Xem đồng hồ', 'Thời gian']
      }
    ]
  },
  {
    id: 'math_g2_multiplication_division_tables',
    categoryKey: 'math',
    subject: 'Toán',
    title: 'Bảng nhân 2, 5 & Bảng chia 2, 5 - Hình phẳng cơ bản',
    grade: 2,
    icon: '✖️',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    unitOrChapter: 'Chủ đề 9: Phép nhân và phép chia',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TOAN_G2_YCCD_ST_05',
    learningOutcomes: [
      'Thuộc và vận dụng thành thạo bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5',
      'Hiểu ý nghĩa của phép nhân (tổng các số hạng bằng nhau) và phép chia (chia thành các phần bằng nhau)',
      'Nhận biết điểm, đoạn thẳng, đường gấp khúc, hình tứ giác, khối trụ, khối cầu'
    ],
    competencies: ['Mô hình hóa phép nhân chia', 'Tư duy hình học trực quan', 'Tính toán nhẩm'],
    recommendedGames: ['frog', 'quiz', 'memory', 'wheel', 'balloon'],
    conceptNotes: 'Nhân với 5 luôn có tận cùng là 0 hoặc 5. Chia cho 2 là tìm một nửa của số đó.',
    questions: [
      {
        id: 'gdpt_m2_01',
        text: 'Mỗi bạn có 5 quyển vở. Hỏi 6 bạn như thế có tất cả bao nhiêu quyển vở?',
        type: 'multiple_choice',
        options: ['30 quyển vở', '25 quyển vở', '35 quyển vở', '20 quyển vở'],
        answer: '30 quyển vở',
        subject: 'Toán',
        grade: 2,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 60,
        explanation: 'Số quyển vở của 6 bạn là: 5 x 6 = 30 (quyển vở).',
        tags: ['Bảng nhân 5', 'Toán lời văn']
      },
      {
        id: 'gdpt_m2_02',
        text: 'Có 18 cái kẹo chia đều cho 2 bạn. Hỏi mỗi bạn nhận được bao nhiêu cái kẹo?',
        type: 'multiple_choice',
        options: ['9 cái kẹo', '8 cái kẹo', '7 cái kẹo', '10 cái kẹo'],
        answer: '9 cái kẹo',
        subject: 'Toán',
        grade: 2,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 45,
        explanation: 'Mỗi bạn nhận được số kẹo là: 18 : 2 = 9 (cái kẹo).',
        tags: ['Bảng chia 2', 'Chia đều']
      },
      {
        id: 'gdpt_m2_03',
        text: 'Hình nào dưới đây có 4 cạnh và 4 đỉnh?',
        type: 'multiple_choice',
        options: ['Hình tứ giác', 'Hình tam giác', 'Hình tròn', 'Khối trụ'],
        answer: 'Hình tứ giác',
        subject: 'Toán',
        grade: 2,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 34,
        explanation: 'Hình tứ giác là hình phẳng gồm 4 đoạn thẳng khép kín tạo thành 4 cạnh và 4 đỉnh.',
        tags: ['Hình học', 'Tứ giác']
      },
      {
        id: 'gdpt_m2_04',
        text: 'Một đoạn dây dài 40 cm được cắt thành 5 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu đề-xi-mét (dm)?',
        type: 'multiple_choice',
        options: ['8 dm', '0.8 dm (8 cm)', '8 cm', '5 dm'],
        answer: '8 cm',
        subject: 'Toán',
        grade: 2,
        difficulty: 'Khó',
        cognitiveLevel: 'Vận dụng',
        useCount: 39,
        explanation: 'Mỗi đoạn dây dài: 40 : 5 = 8 cm. (8 cm = 0.8 dm).',
        tags: ['Đo lường', 'Đổi đơn vị']
      },
      {
        id: 'gdpt_m2_05',
        text: 'Số nào nhân với bất kì số nào cũng cho kết quả bằng chính số đó?',
        type: 'multiple_choice',
        options: ['Số 1', 'Số 0', 'Số 2', 'Số 10'],
        answer: 'Số 1',
        subject: 'Toán',
        grade: 2,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 52,
        explanation: 'Số 1 nhân với số nào cũng bằng chính số đó: 1 x a = a x 1 = a.',
        tags: ['Quy tắc nhân', 'Tính chất số 1']
      }
    ]
  },
  {
    id: 'math_g3_perimeter_area_fractions',
    categoryKey: 'math',
    subject: 'Toán',
    title: 'Chu vi, Diện tích hình vuông - chữ nhật & Phân số đơn giản',
    grade: 3,
    icon: '📏',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    unitOrChapter: 'Chủ đề 11: Chu vi và Diện tích các hình',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TOAN_G3_YCCD_HH_04',
    learningOutcomes: [
      'Tính được chu vi và diện tích của hình chữ nhật, hình vuông theo công thức chuẩn',
      'Phân biệt đơn vị đo độ dài (cm, m) và đơn vị đo diện tích (cm², m²)',
      'Nhận biết một phần mấy của một hình hoặc một tập hợp đồ vật (1/2, 1/3, 1/4, 1/5)'
    ],
    competencies: ['Vận dụng công thức hình học', 'Ước lượng đo lường thực tế', 'Tư duy phân số trực quan'],
    recommendedGames: ['quiz', 'frog', 'memory', 'wheel', 'flashcard'],
    conceptNotes: 'Chu vi hình chữ nhật = (Dài + Rộng) x 2. Diện tích hình chữ nhật = Dài x Rộng (cùng đơn vị đo).',
    questions: [
      {
        id: 'gdpt_m3_01',
        text: 'Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Diện tích của hình chữ nhật đó là:',
        type: 'multiple_choice',
        options: ['40 cm²', '26 cm', '40 cm', '13 cm²'],
        answer: '40 cm²',
        subject: 'Toán',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 78,
        explanation: 'Diện tích hình chữ nhật = Chiều dài x Chiều rộng = 8 x 5 = 40 (cm²). Chú ý đơn vị là cm².',
        tags: ['Diện tích', 'Hình chữ nhật']
      },
      {
        id: 'gdpt_m3_02',
        text: 'Một hình vuông có cạnh dài 6 cm. Chu vi của hình vuông đó là bao nhiêu?',
        type: 'multiple_choice',
        options: ['24 cm', '36 cm²', '12 cm', '24 cm²'],
        answer: '24 cm',
        subject: 'Toán',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 65,
        explanation: 'Chu vi hình vuông = Cạnh x 4 = 6 x 4 = 24 (cm).',
        tags: ['Chu vi', 'Hình vuông']
      },
      {
        id: 'gdpt_m3_03',
        text: 'Một lớp học có 36 học sinh, trong đó có 1/4 số học sinh là học sinh xuất sắc. Hỏi có bao nhiêu học sinh xuất sắc?',
        type: 'multiple_choice',
        options: ['9 học sinh', '6 học sinh', '8 học sinh', '12 học sinh'],
        answer: '9 học sinh',
        subject: 'Toán',
        grade: 3,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Vận dụng',
        useCount: 54,
        explanation: 'Số học sinh xuất sắc là: 36 : 4 = 9 (học sinh).',
        tags: ['Tìm một phần mấy', 'Toán có lời văn']
      },
      {
        id: 'gdpt_m3_04',
        text: 'Đổi: 3 m 4 cm = .... cm. Số thích hợp điền vào chỗ chấm là:',
        type: 'multiple_choice',
        options: ['304 cm', '340 cm', '34 cm', '3400 cm'],
        answer: '304 cm',
        subject: 'Toán',
        grade: 3,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 48,
        explanation: 'Ta có: 3 m = 300 cm. Do đó 3 m 4 cm = 300 + 4 = 304 cm.',
        tags: ['Đo lường', 'Đổi đơn vị độ dài']
      },
      {
        id: 'gdpt_m3_05',
        text: 'Thương của phép chia 45 : 9 có giá trị bằng:',
        type: 'multiple_choice',
        options: ['5', '6', '4', '9'],
        answer: '5',
        subject: 'Toán',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 50,
        explanation: '45 chia cho 9 bằng 5 (vì 9 x 5 = 45).',
        tags: ['Phép chia', 'Bảng chia 9']
      }
    ]
  },
  {
    id: 'math_g4_average_fractions_operations',
    categoryKey: 'math',
    subject: 'Toán',
    title: 'Số trung bình cộng & Bốn phép tính với Phân số',
    grade: 4,
    icon: '➗',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    unitOrChapter: 'Chủ đề 6: Phân số và các phép tính với phân số',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TOAN_G4_YCCD_PS_03',
    learningOutcomes: [
      'Tìm được số trung bình cộng của nhiều số',
      'Thực hiện thành thạo cộng, trừ, nhân, chia phân số (cùng mẫu số và khác mẫu số)',
      'Rút gọn và quy đồng mẫu số các phân số thành thạo'
    ],
    competencies: ['Tư duy phân số & đại số', 'Lập luận giải toán trung bình cộng', 'Vận dụng tính toán nhanh'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'memory', 'fill_blank'],
    conceptNotes: 'Muốn cộng/trừ phân số khác mẫu số, ta quy đồng mẫu số rồi cộng/trừ tử số với nhau, giữ nguyên mẫu số chung.',
    questions: [
      {
        id: 'gdpt_m4_01',
        text: 'Tìm số trung bình cộng của ba số: 24, 36 và 60.',
        type: 'multiple_choice',
        options: ['40', '36', '45', '120'],
        answer: '40',
        subject: 'Toán',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 72,
        explanation: 'Trung bình cộng = (24 + 36 + 60) : 3 = 120 : 3 = 40.',
        tags: ['Số trung bình cộng', 'Toán lớp 4']
      },
      {
        id: 'gdpt_m4_02',
        text: 'Kết quả của phép tính: 2/5 + 3/10 là:',
        type: 'multiple_choice',
        options: ['7/10', '5/15 (1/3)', '5/10 (1/2)', '8/10'],
        answer: '7/10',
        subject: 'Toán',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 68,
        explanation: 'Quy đồng mẫu số: 2/5 = 4/10. Ta có: 4/10 + 3/10 = 7/10.',
        tags: ['Phân số', 'Cộng phân số']
      },
      {
        id: 'gdpt_m4_03',
        text: 'Rút gọn phân số 18/24 về phân số tối giản được:',
        type: 'multiple_choice',
        options: ['3/4', '9/12', '6/8', '2/3'],
        answer: '3/4',
        subject: 'Toán',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 59,
        explanation: 'Chia cả tử số và mẫu số cho 6: 18 : 6 = 3, 24 : 6 = 4. Vậy được 3/4.',
        tags: ['Rút gọn phân số', 'Phân số tối giản']
      },
      {
        id: 'gdpt_m4_04',
        text: 'Một hình bình hành có độ dài đáy 15 cm, chiều cao tương ứng 8 cm. Diện tích hình bình hành là:',
        type: 'multiple_choice',
        options: ['120 cm²', '60 cm²', '46 cm', '120 cm'],
        answer: '120 cm²',
        subject: 'Toán',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 55,
        explanation: 'Diện tích hình bình hành = Đáy x Chiều cao = 15 x 8 = 120 (cm²).',
        tags: ['Hình bình hành', 'Diện tích']
      },
      {
        id: 'gdpt_m4_05',
        text: 'Tìm x biết: x x 3/4 = 9/8. Giá trị của x là:',
        type: 'multiple_choice',
        options: ['3/2', '27/32', '6/4', '3/8'],
        answer: '3/2',
        subject: 'Toán',
        grade: 4,
        difficulty: 'Khó',
        cognitiveLevel: 'Vận dụng',
        useCount: 47,
        explanation: 'x = 9/8 : 3/4 = 9/8 x 4/3 = 36/24 = 3/2.',
        tags: ['Tìm x', 'Nhân chia phân số']
      }
    ]
  },
  {
    id: 'math_g5_decimals_percentage_speed',
    categoryKey: 'math',
    subject: 'Toán',
    title: 'Số thập phân, Tỉ số phần trăm & Toán chuyển động đều',
    grade: 5,
    icon: '⚡',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    unitOrChapter: 'Chủ đề 8: Toán chuyển động đều (Vận tốc, Quãng đường, Thời gian)',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TOAN_G5_YCCD_CD_02',
    learningOutcomes: [
      'Hiểu và vận dụng công thức tính vận tốc (v = s : t), quãng đường (s = v x t) và thời gian (t = s : v)',
      'Thực hiện thành thạo các phép tính cộng, trừ, nhân, chia số thập phân',
      'Giải toán về tỉ số phần trăm (tìm giá trị phần trăm của một số, tính lãi suất)'
    ],
    competencies: ['Mô hình hóa chuyển động vật lý', 'Tư duy toán học định lượng', 'Giải quyết vấn đề phức hợp'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'balloon', 'memory'],
    conceptNotes: 'Vận tốc là quãng đường đi được trong một đơn vị thời gian (km/giờ, m/phút, m/giây). Lưu ý đồng nhất đơn vị đo.',
    questions: [
      {
        id: 'gdpt_m5_01',
        text: 'Một ô tô đi được quãng đường 120 km trong thời gian 2 giờ 30 phút. Vận tốc của ô tô đó là:',
        type: 'multiple_choice',
        options: ['48 km/giờ', '50 km/giờ', '45 km/giờ', '60 km/giờ'],
        answer: '48 km/giờ',
        subject: 'Toán',
        grade: 5,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Vận dụng',
        useCount: 82,
        explanation: 'Đổi 2 giờ 30 phút = 2.5 giờ. Vận tốc ô tô = 120 : 2.5 = 48 (km/giờ).',
        tags: ['Vận tốc', 'Toán chuyển động']
      },
      {
        id: 'gdpt_m5_02',
        text: 'Tìm 25% của 160 kg. Kết quả là:',
        type: 'multiple_choice',
        options: ['40 kg', '32 kg', '50 kg', '40%'],
        answer: '40 kg',
        subject: 'Toán',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 70,
        explanation: '25% của 160 kg = 160 x 25 : 100 = 40 (kg). Hoặc 25% = 1/4 => 160 : 4 = 40 kg.',
        tags: ['Tỉ số phần trăm', 'Toán lớp 5']
      },
      {
        id: 'gdpt_m5_03',
        text: 'Một hình tròn có bán kính r = 5 cm. Chu vi của hình tròn đó là:',
        type: 'multiple_choice',
        options: ['31.4 cm', '78.5 cm²', '15.7 cm', '31.4 cm²'],
        answer: '31.4 cm',
        subject: 'Toán',
        grade: 5,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 64,
        explanation: 'Chu vi hình tròn = Bán kính x 2 x 3.14 = 5 x 2 x 3.14 = 31.4 (cm).',
        tags: ['Hình tròn', 'Chu vi']
      },
      {
        id: 'gdpt_m5_04',
        text: 'Kết quả của phép tính: 4.8 x 0.25 là:',
        type: 'multiple_choice',
        options: ['1.2', '12', '0.12', '1.25'],
        answer: '1.2',
        subject: 'Toán',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 58,
        explanation: 'Nhân với 0.25 tương đương chia cho 4: 4.8 : 4 = 1.2.',
        tags: ['Số thập phân', 'Tính nhẩm nhanh']
      },
      {
        id: 'gdpt_m5_05',
        text: 'Một hình lập phương có cạnh 4 dm. Thể tích của hình lập phương đó là:',
        type: 'multiple_choice',
        options: ['64 dm³', '96 dm²', '16 dm³', '64 dm²'],
        answer: '64 dm³',
        subject: 'Toán',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 61,
        explanation: 'Thể tích hình lập phương = Cạnh x Cạnh x Cạnh = 4 x 4 x 4 = 64 (dm³).',
        tags: ['Thể tích', 'Hình lập phương']
      }
    ]
  },

  // ==================== 2. TIẾNG VIỆT (VIETNAMESE LANGUAGE) ====================
  {
    id: 'vietnamese_g2_words_and_sentences',
    categoryKey: 'vietnamese',
    subject: 'Tiếng Việt',
    title: 'Từ chỉ sự vật, hoạt động, đặc điểm & Dấu chấm, dấu phẩy',
    grade: 2,
    icon: '✏️',
    color: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-800',
    unitOrChapter: 'Chủ điểm 3: Em lớn lên từng ngày - Luyện từ và câu',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TV_G2_YCCD_LTC_01',
    learningOutcomes: [
      'Nhận biết được các từ chỉ sự vật (người, đồ vật, con vật, cây cối)',
      'Nhận biết và phân biệt từ chỉ hoạt động, từ chỉ đặc điểm (màu sắc, hình dáng, tính nết)',
      'Sử dụng đúng dấu chấm khi kết thúc câu kể và dấu phẩy để ngăn cách các thành phần cùng loại'
    ],
    competencies: ['Năng lực ngôn ngữ tiếng Việt', 'Cảm thụ từ ngữ biểu cảm', 'Kỹ năng viết câu chuẩn ngữ pháp'],
    recommendedGames: ['quiz', 'frog', 'memory', 'fill_blank', 'wheel'],
    conceptNotes: 'Từ chỉ sự vật trả lời câu hỏi: Ai? Cái gì? Con gì?. Từ chỉ hoạt động: Làm gì?. Từ chỉ đặc điểm: Thế nào?.',
    questions: [
      {
        id: 'gdpt_v2_01',
        text: 'Dòng nào dưới đây gồm toàn các từ chỉ ĐẶC ĐIỂM?',
        type: 'multiple_choice',
        options: ['Xanh ngát, chăm chỉ, tròn xoe', 'Bác sĩ, quyển sách, dòng sông', 'Chạy nhảy, viết bài, nhảy dây', 'Học sinh, thông minh, đọc sách'],
        answer: 'Xanh ngát, chăm chỉ, tròn xoe',
        subject: 'Tiếng Việt',
        grade: 2,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 65,
        explanation: '"Xanh ngát" (chỉ màu sắc), "chăm chỉ" (chỉ tính nết), "tròn xoe" (chỉ hình dáng) đều là từ chỉ đặc điểm.',
        tags: ['Từ chỉ đặc điểm', 'Luyện từ và câu']
      },
      {
        id: 'gdpt_v2_02',
        text: 'Từ nào sau đây viết ĐÚNG chính tả?',
        type: 'multiple_choice',
        options: ['Trăn trở', 'Chăn chở', 'Trăn chở', 'Chăn trở'],
        answer: 'Trăn trở',
        subject: 'Tiếng Việt',
        grade: 2,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 52,
        explanation: 'Từ chuẩn chính tả tiếng Việt là "Trăn trở" (âm tr - tr) nghĩa là băn khoăn suy nghĩ.',
        tags: ['Chính tả', 'Phân biệt tr/ch']
      },
      {
        id: 'gdpt_v2_03',
        text: 'Câu: "Mặt trời đỏ ối như một quả cầu lửa khổng lồ." sử dụng biện pháp nghệ thuật gì?',
        type: 'multiple_choice',
        options: ['So sánh', 'Nhân hóa', 'Ẩn dụ', 'Điệp từ'],
        answer: 'So sánh',
        subject: 'Tiếng Việt',
        grade: 2,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 71,
        explanation: 'Câu có từ so sánh "như" để so sánh Mặt trời với quả cầu lửa.',
        tags: ['Biện pháp so sánh', 'Tập đọc']
      },
      {
        id: 'gdpt_v2_04',
        text: 'Dấu câu nào thích hợp điền vào ô trống sau: "Trên sân trường học sinh đang vui vẻ chơi đùa [...]"',
        type: 'multiple_choice',
        options: ['Dấu chấm (.)', 'Dấu chấm hỏi (?)', 'Dấu chấm than (!)', 'Dấu hai chấm (:)'],
        answer: 'Dấu chấm (.)',
        subject: 'Tiếng Việt',
        grade: 2,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 48,
        explanation: 'Đây là câu kể thông báo sự việc hoàn chỉnh, nên cuối câu dùng dấu chấm (.).',
        tags: ['Dấu câu', 'Dấu chấm']
      }
    ]
  },
  {
    id: 'vietnamese_g3_comparison_personification',
    categoryKey: 'vietnamese',
    subject: 'Tiếng Việt',
    title: 'Biện pháp nghệ thuật: So sánh & Nhân hóa trong văn thơ',
    grade: 3,
    icon: '✨',
    color: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-800',
    unitOrChapter: 'Chủ điểm: Khám phá thế giới kì thú - Biện pháp tu từ',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TV_G3_YCCD_TT_02',
    learningOutcomes: [
      'Nhận biết và phân tích được hình ảnh so sánh (các mô hình: A là B, A như B, A chẳng bằng B)',
      'Nhận diện các cách nhân hóa (gọi sự vật bằng từ gọi người, tả sự vật bằng từ tả hành động, tính cách người)',
      'Vận dụng so sánh và nhân hóa để viết đoạn văn miêu tả sinh động, giàu cảm xúc'
    ],
    competencies: ['Cảm thụ văn học', 'Sáng tạo ngôn ngữ', 'Kỹ năng làm văn miêu tả'],
    recommendedGames: ['quiz', 'memory', 'flashcard', 'frog', 'wheel'],
    conceptNotes: 'Nhân hóa có 3 cách chính: 1. Gọi vật như người (Bác Cú Mèo, Chị Gió); 2. Tả vật như người (cây bàng xòe tay đón nắng); 3. Trò chuyện với vật như với người.',
    questions: [
      {
        id: 'gdpt_v3_01',
        text: 'Câu thơ: "Bác kim giờ thận trọng / Nhích từng li, từng li" đã nhân hóa chiếc kim giờ bằng cách nào?',
        type: 'multiple_choice',
        options: [
          'Dùng từ gọi người (Bác) và từ tả tính cách con người (thận trọng)',
          'So sánh kim giờ với một người già',
          'Trò chuyện tâm sự với kim giờ',
          'Dùng từ ngữ chỉ màu sắc'
        ],
        answer: 'Dùng từ gọi người (Bác) và từ tả tính cách con người (thận trọng)',
        subject: 'Tiếng Việt',
        grade: 3,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 76,
        explanation: 'Tác giả gọi kim giờ là "Bác" (từ xưng hô chỉ người) và miêu tả phẩm chất "thận trọng" của con người.',
        tags: ['Nhân hóa', 'Biện pháp tu từ']
      },
      {
        id: 'gdpt_v3_02',
        text: 'Thành ngữ nào sau đây mang ý nghĩa ca ngợi sự kiên trì, nỗ lực không ngừng nghỉ?',
        type: 'multiple_choice',
        options: ['Có công mài sắt, có ngày nên kim', 'Uống nước nhớ nguồn', 'Lá lành đùm lá rách', 'Học thầy không tày học bạn'],
        answer: 'Có công mài sắt, có ngày nên kim',
        subject: 'Tiếng Việt',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 68,
        explanation: '"Có công mài sắt, có ngày nên kim" khuyên con người kiên nhẫn, bền chí ắt gặt hái thành công.',
        tags: ['Thành ngữ', 'Tục ngữ Việt Nam']
      },
      {
        id: 'gdpt_v3_03',
        text: 'Trong câu: "Mẹ là ngọn gió của con suốt đời", sự vật nào được so sánh với nhau?',
        type: 'multiple_choice',
        options: ['Mẹ và ngọn gió', 'Con và ngọn gió', 'Mẹ và cuộc đời', 'Con và bầu trời'],
        answer: 'Mẹ và ngọn gió',
        subject: 'Tiếng Việt',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 59,
        explanation: 'Câu so sánh "Mẹ" (sự vật A) với "ngọn gió" (sự vật B) qua từ nối "là".',
        tags: ['So sánh', 'Hình ảnh so sánh']
      },
      {
        id: 'gdpt_v3_04',
        text: 'Tìm từ trái nghĩa với từ "DŨNG CẢM":',
        type: 'multiple_choice',
        options: ['Hèn nhát', 'Gan dạ', 'Anh dũng', 'Kiên cường'],
        answer: 'Hèn nhát',
        subject: 'Tiếng Việt',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 62,
        explanation: '"Hèn nhát" trái nghĩa với "dũng cảm". Các từ còn lại là từ đồng nghĩa.',
        tags: ['Từ trái nghĩa', 'Mở rộng vốn từ']
      }
    ]
  },
  {
    id: 'vietnamese_g4_parts_of_speech_metaphor',
    categoryKey: 'vietnamese',
    subject: 'Tiếng Việt',
    title: 'Danh từ, Động từ, Tính từ & Câu kể Ai làm gì? Ai thế nào? Ai là gì?',
    grade: 4,
    icon: '📚',
    color: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-800',
    unitOrChapter: 'Chủ điểm: Chắp cánh ước mơ - Từ loại và Câu kể',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'TV_G4_YCCD_TL_01',
    learningOutcomes: [
      'Phân biệt chính xác Danh từ (chỉ người, vật, hiện tượng, khái niệm), Động từ và Tính từ',
      'Xác định Chủ ngữ và Vị ngữ trong 3 kiểu câu kể căn bản',
      'Hiểu và biết sử dụng dấu gạch ngang (đánh dấu lời nói trực tiếp, liệt kê) và dấu ngoặc kép'
    ],
    competencies: ['Phân tích ngữ pháp tiếng Việt', 'Xây dựng câu văn chặt chẽ', 'Kỹ năng viết luận ngắn'],
    recommendedGames: ['quiz', 'frog', 'memory', 'wheel', 'balloon'],
    conceptNotes: 'Danh từ chỉ sự vật; Động từ chỉ hoạt động, trạng thái; Tính từ chỉ đặc điểm, tính chất. Vị ngữ câu kể Ai làm gì? thường do Động từ cụm động từ tạo thành.',
    questions: [
      {
        id: 'gdpt_v4_01',
        text: 'Trong câu: "Những chú chim sơn ca đang hót líu lo trên cành cây bàng", bộ phận VỊ NGỮ là:',
        type: 'multiple_choice',
        options: [
          'đang hót líu lo trên cành cây bàng',
          'hót líu lo',
          'trên cành cây bàng',
          'Những chú chim sơn ca'
        ],
        answer: 'đang hót líu lo trên cành cây bàng',
        subject: 'Tiếng Việt',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 84,
        explanation: 'Chủ ngữ là "Những chú chim sơn ca" (Ai?). Vị ngữ trả lời câu hỏi Làm gì? là "đang hót líu lo trên cành cây bàng".',
        tags: ['Chủ ngữ vị ngữ', 'Câu kể Ai làm gì']
      },
      {
        id: 'gdpt_v4_02',
        text: 'Từ "NIỀM VUI" trong câu: "Niềm vui rạng rỡ trên khuôn mặt bé" thuộc từ loại nào?',
        type: 'multiple_choice',
        options: ['Danh từ', 'Tính từ', 'Động từ', 'Đại từ'],
        answer: 'Danh từ',
        subject: 'Tiếng Việt',
        grade: 4,
        difficulty: 'Khó',
        cognitiveLevel: 'Vận dụng',
        useCount: 77,
        explanation: '"Niềm vui" là danh từ chỉ khái niệm/tâm trạng trừu tượng (kết hợp với từ chỉ đơn vị niệm/nỗi/sự).',
        tags: ['Danh từ trừu tượng', 'Từ loại']
      },
      {
        id: 'gdpt_v4_03',
        text: 'Tác dụng của DẤU NGOẶC KÉP trong câu: Bác Hồ từng căn dặn: "Non sông Việt Nam có trở nên tươi đẹp hay không..." là gì?',
        type: 'multiple_choice',
        options: [
          'Dẫn lời dẫn trực tiếp của nhân vật',
          'Đánh dấu từ ngữ được hiểu theo nghĩa đặc biệt',
          'Giải thích cho bộ phận đứng trước',
          'Đánh dấu phần liệt kê'
        ],
        answer: 'Dẫn lời dẫn trực tiếp của nhân vật',
        subject: 'Tiếng Việt',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 63,
        explanation: 'Dấu ngoặc kép dùng để trích dẫn nguyên văn lời nói hoặc câu nói trực tiếp của Chủ tịch Hồ Chí Minh.',
        tags: ['Dấu ngoặc kép', 'Quy tắc dấu câu']
      },
      {
        id: 'gdpt_v4_04',
        text: 'Câu nào sau đây thuộc kiểu câu kể "AI THẾ NÀO?"',
        type: 'multiple_choice',
        options: [
          'Dòng sông Hương êm đềm và thơ mộng.',
          'Bác nông dân đang cày ruộng trên cánh đồng.',
          'Trần Quốc Toản là một thiếu niên dũng cảm.',
          'Em giúp mẹ quét nhà và tưới cây.'
        ],
        answer: 'Dòng sông Hương êm đềm và thơ mộng.',
        subject: 'Tiếng Việt',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 71,
        explanation: 'Vị ngữ "êm đềm và thơ mộng" là cụm tính từ chỉ đặc điểm, trả lời câu hỏi "Thế nào?".',
        tags: ['Câu kể Ai thế nào', 'Kiểu câu']
      }
    ]
  },

  // ==================== 3. TIẾNG ANH (ENGLISH) ====================
  {
    id: 'english_g3_daily_communication_routines',
    categoryKey: 'english',
    subject: 'Tiếng Anh',
    title: 'Unit 1-5: Greetings, School Things, Family & Hobbies',
    grade: 3,
    icon: '👋',
    color: 'text-sky-600',
    badgeBg: 'bg-sky-100 text-sky-800',
    unitOrChapter: 'Global Success Grade 3 - Starter & Units 1-5',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    standardCode: 'ENG_G3_YCCD_COMM_01',
    learningOutcomes: [
      'Giao tiếp chào hỏi, giới thiệu bản thân và bạn bè (Hello, My name is..., How are you?)',
      'Hỏi và trả lời về đồ dùng học tập (What is this? - It is a pen/book)',
      'Hỏi tuổi và giới thiệu thành viên trong gia đình (How old are you? - I am eight years old)'
    ],
    competencies: ['English Communication A1', 'Phonics & Pronunciation', 'Listening Comprehension'],
    recommendedGames: ['quiz', 'frog', 'memory', 'flashcard', 'balloon', 'wheel'],
    conceptNotes: 'Key patterns: "How old are you? - I am eight." / "What is this? - It is a ruler." / "Is this your pencil? - Yes, it is."',
    questions: [
      {
        id: 'gdpt_e3_01',
        text: 'Choose the best answer: "How old are you?" - "I am __________ years old."',
        type: 'multiple_choice',
        options: ['eight', 'fine', 'Nam', 'nice'],
        answer: 'eight',
        subject: 'Tiếng Anh',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 95,
        explanation: '"How old are you?" là câu hỏi tuổi, câu trả lời cần chỉ số tuổi (eight = 8 tuổi).',
        tags: ['Age', 'Unit 2', 'Global Success Grade 3']
      },
      {
        id: 'gdpt_e3_02',
        text: 'Look and complete: "What is this?" - "It is a __________."',
        type: 'multiple_choice',
        options: ['school bag', 'apple', 'sister', 'red'],
        answer: 'school bag',
        subject: 'Tiếng Anh',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 88,
        explanation: '"School bag" (cặp sách) là đồ dùng học tập phù hợp với câu hỏi "What is this?".',
        tags: ['School things', 'Unit 3']
      },
      {
        id: 'gdpt_e3_03',
        text: 'Find the odd one out (Tìm từ khác loại):',
        type: 'multiple_choice',
        options: ['Ruler', 'Pencil', 'Notebook', 'Father'],
        answer: 'Father',
        subject: 'Tiếng Anh',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 76,
        explanation: '"Father" (bố) là thành viên gia đình, còn lại là đồ dùng học tập (thước kẻ, bút chì, vở ghi).',
        tags: ['Odd one out', 'Vocabulary']
      },
      {
        id: 'gdpt_e3_04',
        text: 'Reorder the words to make a correct sentence: "your / What / name / is / ?"',
        type: 'multiple_choice',
        options: ['What is your name?', 'What your name is?', 'Your name is what?', 'Is what your name?'],
        answer: 'What is your name?',
        subject: 'Tiếng Anh',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 90,
        explanation: 'Cấu trúc câu hỏi tên chuẩn: "What is your name?".',
        tags: ['Sentence ordering', 'Greetings']
      },
      {
        id: 'gdpt_e3_05',
        text: 'Choose the correct greeting for the morning:',
        type: 'multiple_choice',
        options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
        answer: 'Good morning',
        subject: 'Tiếng Anh',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 80,
        explanation: '"Good morning" dùng để chào vào buổi sáng.',
        tags: ['Greetings', 'Time of day']
      }
    ]
  },
  {
    id: 'english_g4_activities_time_places',
    categoryKey: 'english',
    subject: 'Tiếng Anh',
    title: 'Unit 6-10: Time, Daily Activities, Subjects & Animals',
    grade: 4,
    icon: '⏰',
    color: 'text-sky-600',
    badgeBg: 'bg-sky-100 text-sky-800',
    unitOrChapter: 'Global Success Grade 4 - Term 1 & 2',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    standardCode: 'ENG_G4_YCCD_ACT_02',
    learningOutcomes: [
      'Hỏi và trả lời về thời gian (What time is it? - It is seven o\'clock)',
      'Hỏi về thời gian biểu hoạt động hàng ngày (What time do you get up? - I get up at 6:00 a.m.)',
      'Nói về môn học yêu thích (What subjects do you have today? - I have Maths and English)'
    ],
    competencies: ['Telling time & schedule', 'Daily routines description', 'Interactive role-play'],
    recommendedGames: ['quiz', 'frog', 'memory', 'wheel', 'flashcard', 'fill_blank'],
    conceptNotes: 'Structure: "What time is it? - It\'s [time]." / "What do you do at the weekend? - I visit my grandparents."',
    questions: [
      {
        id: 'gdpt_e4_01',
        text: 'Choose the correct answer: "What time is it?" - "It is __________."',
        type: 'multiple_choice',
        options: ['seven o\'clock', 'Monday', 'English', 'at school'],
        answer: 'seven o\'clock',
        subject: 'Tiếng Anh',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 92,
        explanation: 'Câu hỏi "What time is it?" hỏi giờ, đáp án là "seven o\'clock" (7 giờ đúng).',
        tags: ['Time', 'Global Success Grade 4']
      },
      {
        id: 'gdpt_e4_02',
        text: '"What subjects do you have on Wednesday?" - "I have __________ and Science."',
        type: 'multiple_choice',
        options: ['Maths', 'football', 'guitar', 'breakfast'],
        answer: 'Maths',
        subject: 'Tiếng Anh',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 85,
        explanation: '"Maths" (môn Toán) là từ chỉ môn học trường học.',
        tags: ['School subjects', 'Unit 8']
      },
      {
        id: 'gdpt_e4_03',
        text: 'Why do you like monkeys? - "Because they are __________."',
        type: 'multiple_choice',
        options: ['funny and clever', 'big and scary', 'hot and cold', 'slow and heavy'],
        answer: 'funny and clever',
        subject: 'Tiếng Anh',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 78,
        explanation: '"Funny and clever" (hài hước và thông minh) là tính từ miêu tả khỉ tích cực và chính xác trong SGK.',
        tags: ['Animals', 'Reasons']
      },
      {
        id: 'gdpt_e4_04',
        text: 'Where were you yesterday? - "I was __________ the beach."',
        type: 'multiple_choice',
        options: ['at', 'on', 'in', 'under'],
        answer: 'on',
        subject: 'Tiếng Anh',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 81,
        explanation: 'Cụm từ chuẩn: "on the beach" (ở trên bãi biển).',
        tags: ['Past simple', 'Prepositions']
      }
    ]
  },
  {
    id: 'english_g5_future_past_directions',
    categoryKey: 'english',
    subject: 'Tiếng Anh',
    title: 'Unit 11-16: Future Plans, Storytelling & Giving Directions',
    grade: 5,
    icon: '🗺️',
    color: 'text-sky-600',
    badgeBg: 'bg-sky-100 text-sky-800',
    unitOrChapter: 'Global Success Grade 5 - Core Units',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    standardCode: 'ENG_G5_YCCD_ADV_03',
    learningOutcomes: [
      'Hỏi và chỉ đường trong thành phố (Excuse me, where is the museum? - Go straight and turn left)',
      'Kể về chuyến đi trong quá khứ và dự định tương lai (Where did you go on holiday? / What will you do this weekend?)',
      'Nói về nghề nghiệp mơ ước và lý do (What would you like to be in the future? - I\'d like to be a teacher)'
    ],
    competencies: ['Advanced A1 English', 'Storytelling & Presentation', 'Future plans & Careers'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'memory', 'balloon'],
    conceptNotes: 'Key patterns: "How can I get to the pharmacy? - You can take a bus." / "I\'d like to be a doctor because I want to look after patients."',
    questions: [
      {
        id: 'gdpt_e5_01',
        text: 'Excuse me, where is the post office? - "Go straight ahead and __________ right."',
        type: 'multiple_choice',
        options: ['turn', 'take', 'walk', 'see'],
        answer: 'turn',
        subject: 'Tiếng Anh',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 90,
        explanation: 'Cụm từ chỉ đường: "turn right" (rẽ phải), "turn left" (rẽ trái).',
        tags: ['Directions', 'Unit 16', 'Grade 5']
      },
      {
        id: 'gdpt_e5_02',
        text: 'What would you like to be in the future? - "I would like to be an __________ because I want to design buildings."',
        type: 'multiple_choice',
        options: ['architect', 'astronaut', 'artist', 'actor'],
        answer: 'architect',
        subject: 'Tiếng Anh',
        grade: 5,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 84,
        explanation: '"Architect" (kiến trúc sư) là nghề thiết kế các tòa nhà (design buildings).',
        tags: ['Careers', 'Future dreams']
      },
      {
        id: 'gdpt_e5_03',
        text: 'How did you get to Ha Long Bay? - "We went there __________ coach."',
        type: 'multiple_choice',
        options: ['by', 'on', 'in', 'with'],
        answer: 'by',
        subject: 'Tiếng Anh',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 88,
        explanation: 'Dùng giới từ "by" trước phương tiện giao thông (by coach, by train, by plane).',
        tags: ['Transport', 'Prepositions']
      }
    ]
  },

  // ==================== 4. KHOA HỌC / TỰ NHIÊN VÀ XÃ HỘI (SCIENCE) ====================
  {
    id: 'science_g3_plants_animals_living_world',
    categoryKey: 'science',
    subject: 'Tự nhiên & Xã hội',
    title: 'Thế giới Thực vật và Động vật quanh em - Môi trường sống',
    grade: 3,
    icon: '🌱',
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    unitOrChapter: 'Chủ đề 4: Thực vật và Động vật',
    bookSeries: 'Kết nối tri thức & Cánh diều',
    standardCode: 'TNXH_G3_YCCD_TVDV_01',
    learningOutcomes: [
      'Nhận biết các bộ phận chính của cây (rễ, thân, lá, hoa, quả) và chức năng của chúng',
      'Phân biệt môi trường sống của các loài động vật (dưới nước, trên cạn, trên không)',
      'Nêu được ích lợi của cây xanh và hành động bảo vệ môi trường, không bẻ cành hái hoa'
    ],
    competencies: ['Nhận thức khoa học đời sống', 'Bảo vệ thiên nhiên', 'Quan sát và phân loại sinh vật'],
    recommendedGames: ['quiz', 'frog', 'memory', 'wheel', 'flashcard'],
    conceptNotes: 'Cây xanh quang hợp hút khí các-bô-níc và nhả khí ô-xi giúp làm sạch không khí. Rễ cây hút nước và chất khoáng nuôi cây.',
    questions: [
      {
        id: 'gdpt_s3_01',
        text: 'Bộ phận nào của cây có chức năng chính là hút nước và chất khoáng từ lòng đất?',
        type: 'multiple_choice',
        options: ['Rễ cây', 'Thân cây', 'Lá cây', 'Hoa'],
        answer: 'Rễ cây',
        subject: 'Tự nhiên & Xã hội',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 80,
        explanation: 'Rễ cây cắm sâu vào lòng đất để hút nước và các chất dinh dưỡng khoáng chất nuôi toàn bộ cây.',
        tags: ['Thực vật', 'Bộ phận của cây']
      },
      {
        id: 'gdpt_s3_02',
        text: 'Loài động vật nào dưới đây thở bằng mang và sống hoàn toàn dưới nước?',
        type: 'multiple_choice',
        options: ['Cá chép', 'Chim bồ câu', 'Con thỏ', 'Con ếch trưởng thành'],
        answer: 'Cá chép',
        subject: 'Tự nhiên & Xã hội',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 75,
        explanation: 'Cá chép là động vật dưới nước, có vây để bơi và dùng mang để hô hấp.',
        tags: ['Động vật', 'Môi trường sống']
      },
      {
        id: 'gdpt_s3_03',
        text: 'Để bảo vệ nguồn nước sạch và môi trường xung quanh, chúng ta NÊN làm gì?',
        type: 'multiple_choice',
        options: [
          'Thu gom rác thải đúng nơi quy định và tiết kiệm nước',
          'Vứt túi ni lông xuống ao hồ',
          'Xả nước thải sinh hoạt trực tiếp ra sông',
          'Để vòi nước chảy lãng phí'
        ],
        answer: 'Thu gom rác thải đúng nơi quy định và tiết kiệm nước',
        subject: 'Tự nhiên & Xã hội',
        grade: 3,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 68,
        explanation: 'Bảo vệ nguồn nước và môi trường bằng cách không xả rác bừa bãi và sử dụng nước tiết kiệm.',
        tags: ['Bảo vệ môi trường', 'Ý thức công dân']
      },
      {
        id: 'gdpt_s3_04',
        text: 'Cơ quan hô hấp của con người gồm những bộ phận nào?',
        type: 'multiple_choice',
        options: ['Mũi, khí quản, phế quản và hai lá phổi', 'Tim và các mạch máu', 'Dạ dày và ruột non', 'Não và tủy sống'],
        answer: 'Mũi, khí quản, phế quản và hai lá phổi',
        subject: 'Tự nhiên & Xã hội',
        grade: 3,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Nhận biết',
        useCount: 72,
        explanation: 'Cơ quan hô hấp gồm đường dẫn khí (mũi, khí quản, phế quản) và cơ quan trao đổi khí (hai lá phổi).',
        tags: ['Cơ thể người', 'Cơ quan hô hấp']
      }
    ]
  },
  {
    id: 'science_g4_water_air_light_energy',
    categoryKey: 'science',
    subject: 'Khoa học',
    title: 'Nước, Không khí, Ánh sáng & Năng lượng nhiệt',
    grade: 4,
    icon: '💧',
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    unitOrChapter: 'Chủ đề 1: Chất (Nước và Không khí xung quanh ta)',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'KH_G4_YCCD_CHAT_01',
    learningOutcomes: [
      'Nêu được các tính chất của nước (không màu, không mùi, không vị, không có hình dạng nhất định, chảy từ cao xuống thấp)',
      'Giải thích được vòng tuần hoàn của nước trong tự nhiên (bay hơi -> ngưng tụ thành mây -> mưa)',
      'Nêu được vai trò của không khí, thành phần của không khí (khí ô-xi duy trì sự cháy và sự sống, khí ni-tơ)'
    ],
    competencies: ['Tư duy thí nghiệm khoa học', 'Giải thích hiện tượng tự nhiên', 'Vận dụng bảo vệ tài nguyên'],
    recommendedGames: ['quiz', 'frog', 'memory', 'wheel', 'flashcard'],
    conceptNotes: 'Nước tồn tại ở 3 thể: Rắn (băng, đá), Lỏng (nước thường), Khí (hơi nước). Nước sôi ở 100°C và đóng băng ở 0°C.',
    questions: [
      {
        id: 'gdpt_s4_01',
        text: 'Nước có những tính chất nào sau đây?',
        type: 'multiple_choice',
        options: [
          'Chất lỏng trong suốt, không màu, không mùi, không vị, chảy từ cao xuống thấp',
          'Có màu trắng đục, mùi thơm và vị ngọt',
          'Có hình dạng cố định hình vuông',
          'Không thể hòa tan được bất kỳ chất nào'
        ],
        answer: 'Chất lỏng trong suốt, không màu, không mùi, không vị, chảy từ cao xuống thấp',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 94,
        explanation: 'Nước là chất lỏng trong suốt, không màu, không mùi, không vị, không có hình dạng nhất định, chảy từ cao xuống thấp và lan ra khắp phía.',
        tags: ['Tính chất của nước', 'Khoa học lớp 4']
      },
      {
        id: 'gdpt_s4_02',
        text: 'Hiện tượng nước chuyển từ THỂ LỎNG sang THỂ KHÍ (hơi nước) được gọi là gì?',
        type: 'multiple_choice',
        options: ['Sự bay hơi', 'Sự ngưng tụ', 'Sự đông đặc', 'Sự nóng chảy'],
        answer: 'Sự bay hơi',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 86,
        explanation: 'Nước từ thể lỏng chuyển sang thể khí gọi là sự bay hơi.',
        tags: ['Vòng tuần hoàn nước', 'Sự chuyển thể']
      },
      {
        id: 'gdpt_s4_03',
        text: 'Khí nào trong không khí CẦN THIẾT cho sự sống của sinh vật và duy trì sự cháy?',
        type: 'multiple_choice',
        options: ['Khí ô-xi', 'Khí ni-tơ', 'Khí các-bô-níc', 'Khí mê-tan'],
        answer: 'Khí ô-xi',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 89,
        explanation: 'Khí ô-xi (O2) duy trì sự hô hấp của con người, động vật, thực vật và duy trì sự cháy.',
        tags: ['Không khí', 'Khí ô-xi']
      },
      {
        id: 'gdpt_s4_04',
        text: 'Vật nào dưới đây là VẬT TỰ PHÁT SÁNG?',
        type: 'multiple_choice',
        options: ['Mặt Trời', 'Mặt Trăng', 'Tấm gương soi', 'Quyển sách'],
        answer: 'Mặt Trời',
        subject: 'Khoa học',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 75,
        explanation: 'Mặt Trời là ngôi sao tự phát ra ánh sáng. Mặt Trăng chỉ phản chiếu lại ánh sáng của Mặt Trời.',
        tags: ['Ánh sáng', 'Vật phát sáng']
      }
    ]
  },
  {
    id: 'science_g5_human_health_matter_energy',
    categoryKey: 'science',
    subject: 'Khoa học',
    title: 'Sự sinh sản và phát triển của thực vật, động vật & Năng lượng sạch',
    grade: 5,
    icon: '⚡',
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    unitOrChapter: 'Chủ đề 3: Thực vật và Động vật - Năng lượng tái tạo',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'KH_G5_YCCD_NL_02',
    learningOutcomes: [
      'Mô tả được quá trình sinh sản của thực vật có hoa (thụ phấn -> thụ tinh -> tạo quả và hạt)',
      'Phân biệt động vật đẻ trứng và động vật đẻ con',
      'Kể tên và giải thích lợi ích của các nguồn năng lượng sạch, tái tạo (năng lượng mặt trời, gió, nước chảy)'
    ],
    competencies: ['Tư duy sinh thái bền vững', 'Nhận thức năng lượng xanh', 'Phương pháp nghiên cứu thực nghiệm'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'memory', 'balloon'],
    conceptNotes: 'Năng lượng mặt trời, năng lượng gió và năng lượng nước chảy là nguồn năng lượng tái tạo vô tận và không gây ô nhiễm môi trường.',
    questions: [
      {
        id: 'gdpt_s5_01',
        text: 'Nguồn năng lượng nào dưới đây là NĂNG LƯỢNG TÁI TẠO (năng lượng sạch không cạn kiệt)?',
        type: 'multiple_choice',
        options: ['Năng lượng mặt trời và gió', 'Than đá', 'Dầu mỏ', 'Khí đốt tự nhiên'],
        answer: 'Năng lượng mặt trời và gió',
        subject: 'Khoa học',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 92,
        explanation: 'Năng lượng mặt trời và gió là nguồn năng lượng tái tạo sạch, vô tận, không gây khí thải nhà kính.',
        tags: ['Năng lượng sạch', 'Khoa học lớp 5']
      },
      {
        id: 'gdpt_s5_02',
        text: 'Cơ quan sinh sản của thực vật có hoa là bộ phận nào?',
        type: 'multiple_choice',
        options: ['Hoa', 'Lá', 'Rễ', 'Thân'],
        answer: 'Hoa',
        subject: 'Khoa học',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 83,
        explanation: 'Hoa là cơ quan sinh sản của thực vật có hoa, gồm có nhị (cơ quan sinh dục đực) và nhụy (cơ quan sinh dục cái).',
        tags: ['Sinh sản thực vật', 'Cấu tạo hoa']
      },
      {
        id: 'gdpt_s5_03',
        text: 'Loài động vật nào sau đây ĐẺ CON và NUÔI CON BẰNG SỮA MẸ?',
        type: 'multiple_choice',
        options: ['Cá voi xanh', 'Chim bồ câu', 'Cá chép', 'Rùa biển'],
        answer: 'Cá voi xanh',
        subject: 'Khoa học',
        grade: 5,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 88,
        explanation: 'Cá voi xanh tuy sống ở biển nhưng thuộc lớp thú (động vật có vú), đẻ con và nuôi con bằng sữa mẹ.',
        tags: ['Động vật có vú', 'Sinh sản động vật']
      },
      {
        id: 'gdpt_s5_04',
        text: 'Để phòng tránh bệnh sốt xuất huyết, biện pháp hiệu quả nhất là gì?',
        type: 'multiple_choice',
        options: [
          'Diệt muỗi, lăng quăng (bọ gậy) và ngủ phải mắc màn',
          'Ăn nhiều đồ ngọt',
          'Tắm nước lạnh',
          'Uống thuốc kháng sinh hàng ngày'
        ],
        answer: 'Diệt muỗi, lăng quăng (bọ gậy) và ngủ phải mắc màn',
        subject: 'Khoa học',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Thông hiểu',
        useCount: 79,
        explanation: 'Muỗi vằn là vật trung gian truyền virus sốt xuất huyết, do đó cần diệt muỗi, bọ gậy và ngủ màn để phòng bệnh.',
        tags: ['Sức khỏe', 'Phòng chống bệnh truyền nhiễm']
      }
    ]
  },

  // ==================== 5. LỊCH SỬ VÀ ĐỊA LÝ (SOCIAL STUDIES) ====================
  {
    id: 'social_g4_vietnam_geography_heritage',
    categoryKey: 'social_studies',
    subject: 'Lịch sử & Địa lý',
    title: 'Địa hình, Khí hậu & Danh lam di sản đất nước Việt Nam',
    grade: 4,
    icon: '🇻🇳',
    color: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
    unitOrChapter: 'Chủ đề: Đất nước và Con người Việt Nam - Thiên nhiên và Dân cư',
    bookSeries: 'Kết nối tri thức & Cánh diều',
    standardCode: 'LSD_G4_YCCD_VN_01',
    learningOutcomes: [
      'Xác định được vị trí địa lý, hình dáng đất nước Việt Nam hình chữ S trên bản đồ',
      'Kể tên các vùng địa lý lớn: Vùng Trung du và miền núi Bắc Bộ, Đồng bằng Bắc Bộ, Duyên hải miền Trung, Tây Nguyên, Nam Bộ',
      'Tự hào về các di sản thiên nhiên và văn hóa thế giới được UNESCO công nhận (Vịnh Hạ Long, Quần thể di tích Cố đô Huế, Phố cổ Hội An)'
    ],
    competencies: ['Đọc hiểu bản đồ địa lý', 'Tự hào di sản dân tộc', 'Hiểu biết văn hóa các vùng miền'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'memory', 'balloon'],
    conceptNotes: 'Việt Nam nằm ở bán đảo Đông Dương, thuộc khu vực Đông Nam Á. Phía đông, nam và tây nam giáp Biển Đông với hai quần đảo Hoàng Sa và Trường Sa.',
    questions: [
      {
        id: 'gdpt_ls4_01',
        text: 'Nước Việt Nam có hình dạng giống chữ cái nào và giáp với biển nào ở phía Đông?',
        type: 'multiple_choice',
        options: ['Hình chữ S và giáp Biển Đông', 'Hình chữ C và giáp Thái Bình Dương', 'Hình chữ O và giáp Ấn Độ Dương', 'Hình chữ V và giáp Biển Đỏ'],
        answer: 'Hình chữ S và giáp Biển Đông',
        subject: 'Lịch sử & Địa lý',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 96,
        explanation: 'Đất nước Việt Nam trải dài có hình chữ S uốn lượn, phía đông giáp trọn vẹn với Biển Đông giàu đẹp.',
        tags: ['Vị trí địa lý', 'Biển Đông', 'Lớp 4']
      },
      {
        id: 'gdpt_ls4_02',
        text: 'Di sản thiên nhiên thế giới nào của Việt Nam nổi tiếng với hàng nghìn hòn đảo đá vôi kỳ vĩ trên biển?',
        type: 'multiple_choice',
        options: ['Vịnh Hạ Long (Quảng Ninh)', 'Động Phong Nha', 'Hồ Ba Bể', 'Cố đô Huế'],
        answer: 'Vịnh Hạ Long (Quảng Ninh)',
        subject: 'Lịch sử & Địa lý',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 91,
        explanation: 'Vịnh Hạ Long thuộc tỉnh Quảng Ninh được UNESCO hai lần công nhận là Di sản thiên nhiên thế giới.',
        tags: ['Di sản thế giới', 'Vịnh Hạ Long']
      },
      {
        id: 'gdpt_ls4_03',
        text: 'Lễ hội Cồng chiêng là nét văn hóa truyền thống đặc sắc của đồng bào các dân tộc ở vùng nào?',
        type: 'multiple_choice',
        options: ['Tây Nguyên', 'Đồng bằng sông Cửu Long', 'Trung du Bắc Bộ', 'Duyên hải miền Trung'],
        answer: 'Tây Nguyên',
        subject: 'Lịch sử & Địa lý',
        grade: 4,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 82,
        explanation: 'Không gian văn hóa Cồng chiêng Tây Nguyên là di sản văn hóa phi vật thể đại diện của nhân loại.',
        tags: ['Văn hóa dân tộc', 'Tây Nguyên']
      },
      {
        id: 'gdpt_ls4_04',
        text: 'Hai con sông lớn nhất bồi đắp nên hai vựa lúa trù phú của Việt Nam là:',
        type: 'multiple_choice',
        options: [
          'Sông Hồng và sông Mê Kông (sông Cửu Long)',
          'Sông Đà và sông Hương',
          'Sông Đồng Nai và sông Mã',
          'Sông Thu Bồn và sông Lô'
        ],
        answer: 'Sông Hồng và sông Mê Kông (sông Cửu Long)',
        subject: 'Lịch sử & Địa lý',
        grade: 4,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Thông hiểu',
        useCount: 78,
        explanation: 'Đồng bằng Bắc Bộ được bồi đắp bởi hệ thống sông Hồng, Đồng bằng Nam Bộ được bồi đắp bởi sông Mê Kông.',
        tags: ['Hệ thống sông ngòi', 'Đồng bằng']
      }
    ]
  },
  {
    id: 'social_g5_glorious_history_patriotism',
    categoryKey: 'social_studies',
    subject: 'Lịch sử & Địa lý',
    title: 'Những mốc son lịch sử hào hùng & Tinh thần yêu nước Việt Nam',
    grade: 5,
    icon: '⭐',
    color: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
    unitOrChapter: 'Chủ đề: Dựng nước và Giữ nước thời hiện đại',
    bookSeries: 'Kết nối tri thức',
    standardCode: 'LSD_G5_YCCD_LS_03',
    learningOutcomes: [
      'Nêu được ý nghĩa lịch sử ngày 2/9/1945: Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',
      'Hiểu diễn biến và ý nghĩa của Chiến thắng lịch sử Điện Biên Phủ (7/5/1954) "lừng lẫy năm châu, chấn động địa cầu"',
      'Ghi nhớ Chiến dịch Hồ Chí Minh lịch sử, giải phóng hoàn toàn miền Nam, thống nhất đất nước ngày 30/4/1975'
    ],
    competencies: ['Lòng tự hào dân tộc', 'Biết ơn thế hệ cha anh', 'Ý thức trách nhiệm dựng xây Tổ quốc'],
    recommendedGames: ['quiz', 'frog', 'wheel', 'memory', 'balloon'],
    conceptNotes: 'Mốc son vàng: 2/9/1945 (Khai sinh nước Việt Nam Dân chủ Cộng hòa), 7/5/1954 (Chiến thắng Điện Biên Phủ), 30/4/1975 (Giải phóng miền Nam, thống nhất non sông).',
    questions: [
      {
        id: 'gdpt_ls5_01',
        text: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa vào ngày tháng năm nào?',
        type: 'multiple_choice',
        options: ['Ngày 2 tháng 9 năm 1945', 'Ngày 19 tháng 8 năm 1945', 'Ngày 30 tháng 4 năm 1975', 'Ngày 7 tháng 5 năm 1954'],
        answer: 'Ngày 2 tháng 9 năm 1945',
        subject: 'Lịch sử & Địa lý',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 110,
        explanation: 'Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Bác Hồ đã đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam mới.',
        tags: ['Quốc khánh 2/9', 'Tuyên ngôn Độc lập']
      },
      {
        id: 'gdpt_ls5_02',
        text: 'Chiến thắng nào được mệnh danh là "lừng lẫy năm châu, chấn động địa cầu" kết thúc 9 năm kháng chiến chống thực dân Pháp?',
        type: 'multiple_choice',
        options: ['Chiến thắng Điện Biên Phủ (1954)', 'Chiến dịch Việt Bắc (1947)', 'Chiến dịch Biên giới (1950)', 'Chiến thắng Điện Biên Phủ trên không (1972)'],
        answer: 'Chiến thắng Điện Biên Phủ (1954)',
        subject: 'Lịch sử & Địa lý',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 98,
        explanation: 'Ngày 7/5/1954, lá cờ "Quyết chiến quyết thắng" tung bay trên nóc hầm Đờ Cát, ghi dấu mốc toàn thắng của Chiến dịch Điện Biên Phủ.',
        tags: ['Điện Biên Phủ', 'Lịch sử lớp 5']
      },
      {
        id: 'gdpt_ls5_03',
        text: 'Ngày 30 tháng 4 năm 1975 gắn liền với sự kiện lịch sử trọng đại nào của dân tộc ta?',
        type: 'multiple_choice',
        options: [
          'Giải phóng hoàn toàn miền Nam, thống nhất đất nước',
          'Thành lập Đảng Cộng sản Việt Nam',
          'Bác Hồ ra đi tìm đường cứu nước',
          'Ký kết Hiệp định Pa-ri'
        ],
        answer: 'Giải phóng hoàn toàn miền Nam, thống nhất đất nước',
        subject: 'Lịch sử & Địa lý',
        grade: 5,
        difficulty: 'Dễ',
        cognitiveLevel: 'Nhận biết',
        useCount: 104,
        explanation: 'Trưa ngày 30/4/1975, xe tăng ta húc đổ cổng Dinh Độc Lập, kết thúc thắng lợi Chiến dịch Hồ Chí Minh lịch sử, non sông thu về một mối.',
        tags: ['30 tháng 4', 'Đại thắng mùa xuân 1975']
      },
      {
        id: 'gdpt_ls5_04',
        text: 'Người thanh niên yêu nước Nguyễn Tất Thành (Bác Hồ) ra đi tìm đường cứu nước vào ngày tháng năm nào, tại đâu?',
        type: 'multiple_choice',
        options: [
          'Ngày 5 tháng 6 năm 1911 tại Bến cảng Nhà Rồng (Sài Gòn)',
          'Ngày 19 tháng 5 năm 1890 tại Nghệ An',
          'Ngày 3 tháng 2 năm 1930 tại Hương Cảng',
          'Ngày 2 tháng 9 năm 1945 tại Hà Nội'
        ],
        answer: 'Ngày 5 tháng 6 năm 1911 tại Bến cảng Nhà Rồng (Sài Gòn)',
        subject: 'Lịch sử & Địa lý',
        grade: 5,
        difficulty: 'Trung bình',
        cognitiveLevel: 'Nhận biết',
        useCount: 92,
        explanation: 'Ngày 5/6/1911, người thanh niên Nguyễn Tất Thành rời Bến cảng Nhà Rồng trên con tàu Đô đốc Latouche-Tréville ra đi tìm đường cứu nước.',
        tags: ['Bác Hồ', 'Bến cảng Nhà Rồng']
      }
    ]
  }
];

// Helper functions for accessing curated items
export function getAllGDPTQuestions(): Question[] {
  return GDPT_CURATED_TOPICS.flatMap(t => t.questions);
}

export function getGDPTQuestionsByCategory(categoryKey: GDPTCategoryKey): Question[] {
  return GDPT_CURATED_TOPICS
    .filter(t => t.categoryKey === categoryKey)
    .flatMap(t => t.questions);
}

export function getGDPTQuestionsBySubjectAndGrade(subject?: SubjectType, grade?: number): Question[] {
  return GDPT_CURATED_TOPICS
    .filter(t => (!subject || t.subject === subject) && (!grade || t.grade === grade))
    .flatMap(t => t.questions);
}
