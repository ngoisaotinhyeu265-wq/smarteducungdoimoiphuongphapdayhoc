/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Wand2, MessageSquare, Send, RotateCw, Check, 
  HelpCircle, ChevronRight, BookOpen, Volume2, Smile,
  UploadCloud, FileText, CheckSquare, Eye, FileQuestion,
  FileDown, Download, CheckCircle2, AlertCircle, Shuffle, 
  Gamepad2, Share2, Settings2, ShieldCheck, Layers, Award,
  FileSpreadsheet, Presentation, Sliders, Printer, Copy, X,
  ListFilter, Plus, Trash2, CheckCheck
} from 'lucide-react';
import { 
  Question, SubjectType, QuestionType, DifficultyType, ChatMessage,
  ExamPackage, ExamAnalysis, ExamVariant 
} from '../types';
import { sounds } from '../lib/audio';
import AIOCRDocumentStudio from './AIOCRDocumentStudio';

const standardUnits: Record<string, Record<number, string[]>> = {
  'Toán': {
    1: ['Chương 1: Các số từ 1 đến 10', 'Chương 2: Hình học trực quan đơn giản', 'Chương 3: Phép cộng phép trừ trong phạm vi 10', 'Chương 4: Phép cộng phép trừ trong phạm vi 20', 'Chương 5: Các số đến 100'],
    2: ['Chương 1: Ôn tập các số trong phạm vi 100', 'Chương 2: Phép cộng, phép trừ có nhớ phạm vi 100', 'Chương 3: Bảng nhân 2, bảng chia 2', 'Chương 4: Bảng nhân 5, bảng chia 5', 'Chương 5: Làm quen với hình khối, Ki-lô-gam, Lít'],
    3: ['Chương 1: Ôn tập và bổ sung', 'Chương 2: Phép nhân phép chia trong phạm vi 1000', 'Chương 3: Làm quen với hình phẳng và hình khối', 'Chương 4: Đơn vị đo độ dài, khối lượng, dung tích', 'Chương 5: Phép nhân phép chia trong phạm vi 100.000'],
    4: ['Chương 1: Ôn tập số tự nhiên và phép tính', 'Chương 2: Số tự nhiên và các góc học tập', 'Chương 3: Đơn vị đo lường: tạ, tấn, giây, thế kỷ', 'Chương 4: Phép nhân và phép chia nâng cao', 'Chương 5: Phân số và các phép tính phân số'],
    5: ['Chương 1: Ôn tập phân số và hỗn số', 'Chương 2: Số thập phân và phép tính số thập phân', 'Chương 3: Hình tam giác, hình thang, hình tròn', 'Chương 4: Số đo thời gian, vận tốc, quãng đường, thời gian', 'Chương 5: Thể tích hình hộp chữ nhật, hình lập phương']
  },
  'Tiếng Việt': {
    1: ['Tuần 1: Học âm chữ và nét viết cơ bản', 'Tuần 2: Học các vần tiếng Việt cơ bản', 'Tuần 3: Bài tập đọc ngắn gia đình mến yêu', 'Tuần 4: Luyện nói viết từ vựng quanh bé'],
    2: ['Tuần 1: Em là học sinh lớp 2 (Chào năm học mới)', 'Tuần 2: Trường học thân yêu (Thầy cô bè bạn)', 'Tuần 3: Gia đình ấm áp (Kính trọng cha mẹ)', 'Tuần 4: Muôn loài quanh ta (Thế giới động vật)', 'Tuần 5: Quê hương tươi đẹp (Yêu đất nước)'],
    3: ['Tuần 1: Ngày khai trường rực rỡ nắng vàng', 'Tuần 2: Mái ấm gia đình và người thân yêu', 'Tuần 3: Luyện từ và câu: Từ chỉ hoạt động, sự vật', 'Tuần 4: Đọc hiểu văn bản ngộ nghĩnh trẻ thơ', 'Tuần 5: Ngôi nhà chung Trái Đất (Môi trường sống)'],
    4: ['Tuần 1: Chân dung của em (Tính cách, sở thích)', 'Tuần 2: Trải nghiệm kì thú và học hỏi muôn điều', 'Tuần 3: Phát huy niềm vui sáng tạo học tập', 'Tuần 4: Chắp cánh ước mơ bay cao', 'Tuần 5: Ôn tập từ chỉ đặc điểm và thành ngữ'],
    5: ['Tuần 1: Việt Nam quê hương tôi (Danh lam thắng cảnh)', 'Tuần 2: Giữ lấy màu xanh Trái Đất (Bảo vệ môi trường)', 'Tuần 3: Cánh chim hòa bình (Tình hữu nghị bốn phương)', 'Tuần 4: Luyện từ và câu: Từ đồng nghĩa, trái nghĩa', 'Tuần 5: Ôn tập văn miêu tả sinh động']
  },
  'Tiếng Anh': {
    1: ['Unit 1: Hello!', 'Unit 2: In the classroom', 'Unit 3: At the shop', 'Unit 4: In the bedroom', 'Unit 5: At the playground', 'Unit 6: In the kitchen'],
    2: ['Unit 1: At the camp', 'Unit 2: In the backyard', 'Unit 3: At the supermarket', 'Unit 4: In the kitchen', 'Unit 5: In the school yard', 'Unit 6: At the zoo'],
    3: ['Unit 1: Hello', 'Unit 2: Our names', 'Unit 3: Our school', 'Unit 4: Our bodies', 'Unit 5: Our hobbies', 'Unit 6: Our school things'],
    4: ['Unit 1: My friends', 'Unit 2: Time and daily routines', 'Unit 3: My week', 'Unit 4: My birthday party', 'Unit 5: Things we can do', 'Unit 6: Our school subjects'],
    5: ['Unit 1: All about me', 'Unit 2: My school days', 'Unit 3: My foreign friends', 'Unit 4: My free-time activities', 'Unit 5: My future job', 'Unit 6: Travel plans']
  },
  'Tự nhiên & Xã hội': {
    1: ['Chủ đề 1: Gia đình (Các thành viên, Nhà ở)', 'Chủ đề 2: Trường học (Mái trường, bạn bè)', 'Chủ đề 3: Cộng đồng địa phương (Nghề nghiệp)', 'Chủ đề 4: Thực vật và động vật quanh bé'],
    2: ['Chủ đề 1: Gia đình tôi (Sinh hoạt, truyền thống)', 'Chủ đề 2: Trường học thân thương (Sự kiện lớp học)', 'Chủ đề 3: Môi trường sống địa phương (Giao thông)', 'Chủ đề 4: Thực vật và động vật (Thức ăn, môi trường sống)'],
    3: ['Chủ đề 1: Gia đình an toàn và phòng tránh ngộ độc', 'Chủ đề 2: Trường học thân thiện và giữ gìn vệ sinh', 'Chủ đề 3: Di tích lịch sử văn hóa và danh lam địa phương', 'Chủ đề 4: Tìm hiểu cơ quan hô hấp, tuần hoàn, bài tiết ở người', 'Chủ đề 5: Chăm sóc cơ thể và phòng bệnh học đường']
  },
  'Khoa học': {
    4: ['Chủ đề 1: Chất (Nước có tính chất gì, Không khí quanh ta)', 'Chủ đề 2: Năng lượng (Vai trò của Ánh sáng, Nhiệt độ)', 'Chủ đề 3: Thực vật và động vật (Chuỗi thức ăn trao đổi chất)', 'Chủ đề 4: Nấm, men vi sinh và vi khuẩn có lợi/hại', 'Chủ đề 5: Con người và sức khỏe (Phòng tránh tai nạn đuối nước)'],
    5: ['Chủ đề 1: Sự biến đổi hóa học và tính chất vật chất', 'Chủ đề 2: Năng lượng điện, chất đốt phục vụ cuộc sống', 'Chủ đề 3: Sự sinh sản và lớn khôn của động thực vật', 'Chủ đề 4: Sự sinh sản và phát triển lành mạnh của con người', 'Chủ đề 5: Sử dụng năng lượng mặt trời, gió và nước chảy']
  },
  'Lịch sử & Địa lý': {
    4: ['Bài 1: Làm quen với phương tiện học tập môn Lịch sử Địa lý', 'Bài 2: Vùng Trung du và miền núi Bắc Bộ', 'Bài 3: Đền Hùng và Giỗ Tổ Hùng Vương', 'Bài 4: Vùng Đồng bằng Bắc Bộ và Thăng Long - Hà Nội', 'Bài 5: Vùng Duyên hải miền Trung', 'Bài 6: Vùng Tây Nguyên và lễ hội cồng chiêng', 'Bài 7: Vùng Nam Bộ và sông nước Tây Nam Bộ'],
    5: ['Bài 1: Lãnh thổ, vùng biển và thềm lục địa nước Việt Nam', 'Bài 2: Thiên nhiên, khí hậu và tài nguyên sông ngòi nước ta', 'Bài 3: Buổi đầu dựng nước và giữ nước thời đại Hùng Vương', 'Bài 4: Cuộc kháng chiến chống quân xâm lược lịch sử', 'Bài 5: Các nước láng giềng Đông Nam Á và thế giới rộng lớn']
  },
  'Đạo đức': {
    1: ['Chủ đề 1: Kính trọng thầy cô, đoàn kết thân thiện bạn bè', 'Chủ đề 2: Tự chăm sóc bản thân sạch sẽ', 'Chủ đề 3: Thật thà, dũng cảm nhận lỗi và sửa lỗi'],
    2: ['Chủ đề 1: Quý trọng thời gian và sắp xếp giờ giấc học tập', 'Chủ đề 2: Nhận lỗi khi làm sai, cư xử lịch sự nhã nhặn', 'Chủ đề 3: Trân trọng tình cảm gia đình, hiếu thảo mẹ cha'],
    3: ['Chủ đề 1: Kính yêu Bác Hồ kính yêu vô vàn', 'Chủ đề 2: Biết giữ lời hứa và tự giác học bài làm việc', 'Chủ đề 3: Tôn trọng tài sản công cộng và gắn bó với hàng xóm'],
    4: ['Chủ đề 1: Biết ơn những anh hùng và người có công quê hương', 'Chủ đề 2: Sự cảm thông, sẻ chia và giúp đỡ hoàn cảnh khó khăn', 'Chủ đề 3: Tôn trọng sự khác biệt của bạn bè trong lớp'],
    5: ['Chủ đề 1: Em yêu Tổ quốc Việt Nam gấm vóc', 'Chủ đề 2: Biết ơn các anh hùng liệt sĩ đã hy sinh vì đất nước', 'Chủ đề 3: Chấp hành nghiêm chỉnh luật lệ giao thông đường bộ']
  },
  'Hoạt động trải nghiệm': {
    1: ['Chủ đề 1: Làm quen bạn mới và trường tiểu học yêu thương', 'Chủ đề 2: Rèn luyện thói quen sinh hoạt tốt ngăn nắp', 'Chủ đề 3: Biết ơn thầy cô dìu dắt dạy bảo'],
    2: ['Chủ đề 1: Chào năm học mới ngập tràn niềm vui', 'Chủ đề 2: Vệ sinh cá nhân và dọn dẹp góc học tập của em', 'Chủ đề 3: Kính yêu người thân trong gia đình ấm áp'],
    3: ['Chủ đề 1: Tự hào về bản thân và những điều tốt đẹp', 'Chủ đề 2: Rèn luyện ý thức tổ chức nề nếp sinh hoạt lớp', 'Chủ đề 3: Bày tỏ tình cảm tri ân ấm lòng thầy cô giáo'],
    4: ['Chủ đề 1: Em khôn lớn trưởng thành mỗi ngày', 'Chủ đề 2: Sử dụng thời gian hợp lý và quản lý tiền nuôi heo đất', 'Chủ đề 3: Gắn kết yêu thương và quan tâm mọi người xung quanh'],
    5: ['Chủ đề 1: Em là học sinh lớn nhất trường lớp 5', 'Chủ đề 2: Rèn luyện tính tự lập, nghị lực vượt qua thử thách', 'Chủ đề 3: Tích cực tham gia các hoạt động thiện nguyện xã hội']
  }
};

const SKILLS_BY_SUBJECT: Record<string, string[]> = {
  'Tiếng Anh': ['Vocabulary', 'Grammar', 'Pronunciation', 'Reading', 'Writing', 'Speaking', 'Listening'],
  'Toán': ['Số học & Phép tính', 'Hình học & Đo lường', 'Giải toán có lời văn', 'Đại lượng & Đơn vị', 'Thống kê & Xác suất'],
  'Tiếng Việt': ['Đọc hiểu văn bản', 'Chính tả & Phát âm', 'Luyện từ và câu', 'Tập làm văn / Viết'],
  'Khác': ['Nhận biết kiến thức', 'Giải thích hiện tượng', 'Vận dụng thực tế', 'Tình huống đạo đức / Xã hội']
};

const QUESTION_TYPE_OPTIONS: { id: QuestionType; label: string; icon: string }[] = [
  { id: 'multiple_choice', label: 'Trắc nghiệm (4 lựa chọn)', icon: '✍️' },
  { id: 'reading_comprehension', label: 'Đoạn văn & Đọc hiểu (Passage + Q&A)', icon: '📖' },
  { id: 'fill_blank', label: 'Điền vào chỗ trống', icon: '✏️' },
  { id: 'true_false', label: 'Đúng / Sai sinh động', icon: '⚖️' },
  { id: 'matching', label: 'Nối câu / Ghép cặp', icon: '🔗' },
  { id: 'reorder_words', label: 'Sắp xếp từ thành câu', icon: '🔤' },
  { id: 'reorder_letters', label: 'Sắp xếp chữ cái', icon: '🔠' },
  { id: 'answer_question', label: 'Trả lời câu hỏi', icon: '💬' },
  { id: 'essay', label: 'Tự luận / Trả lời ngắn', icon: '📝' },
  { id: 'listening', label: 'Bài tập Nghe (Listening)', icon: '🎧' },
  { id: 'speaking', label: 'Bài tập Nói (Speaking)', icon: '🗣️' },
  { id: 'crossword', label: 'Trò chơi Ô chữ (Crossword)', icon: '🧩' },
  { id: 'word_search', label: 'Tìm từ (Word Search)', icon: '🔍' },
  { id: 'drag_drop', label: 'Kéo thả (Drag & Drop)', icon: '👆' },
  { id: 'flashcard', label: 'Thẻ ghi nhớ (Flashcard)', icon: '🎴' }
];

interface AIAssistantProps {
  onAddQuestions: (newQs: Question[]) => void;
  onNavigateToQuestions: () => void;
  onNavigateToGames?: () => void;
  autofillTopic?: string;
}

export default function AIAssistant({ 
  onAddQuestions, 
  onNavigateToQuestions,
  onNavigateToGames,
  autofillTopic = '' 
}: AIAssistantProps) {
  
  // Tab control
  const [aiTab, setAiTab] = useState<'prompt' | 'ocr'>('prompt');

  // Core Form State
  const [subject, setSubject] = useState<SubjectType>('Tiếng Anh');
  const [grade, setGrade] = useState<number>(3);
  const [bookSeries, setBookSeries] = useState<string>('Global Success');
  const [edition, setEdition] = useState<string>('Bộ GDĐT 2018');
  const [chapter, setChapter] = useState<string>('');
  const [lesson, setLesson] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [customUnitInput, setCustomUnitInput] = useState<string>('');
  const [part, setPart] = useState<string>('Tất cả Part');
  const [scope, setScope] = useState<string>('Chỉ bài này');
  const [purpose, setPurpose] = useState<string>('Kiểm tra thường xuyên');
  const [difficulty, setDifficulty] = useState<DifficultyType>('Trung bình');
  const [count, setCount] = useState<number>(5);
  const [topic, setTopic] = useState<string>('');
  
  // Word Preview State
  const [wordPreviewOpen, setWordPreviewOpen] = useState<boolean>(false);
  const [previewIncludeAnswers, setPreviewIncludeAnswers] = useState<boolean>(true);

  // Domain skills focus
  const [skillsFocus, setSkillsFocus] = useState<string[]>(['Vocabulary', 'Grammar', 'Reading']);

  // Question formats multi-select
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>(['multiple_choice', 'fill_blank']);

  // Matrix weights
  const [matrixWeights, setMatrixWeights] = useState({ nhanBiet: 40, thongHieu: 30, vanDung: 20, vanDungCao: 10 });

  const totalMatrix = matrixWeights.nhanBiet + matrixWeights.thongHieu + matrixWeights.vanDung + matrixWeights.vanDungCao;

  const handleMatrixChange = (key: keyof typeof matrixWeights, value: number) => {
    sounds.playClick();
    const val = Math.max(0, Math.min(100, Math.round(value)));
    setMatrixWeights(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleApplyPresetMatrix = (nb: number, th: number, vd: number, vdc: number) => {
    sounds.playCoin();
    setMatrixWeights({ nhanBiet: nb, thongHieu: th, vanDung: vd, vanDungCao: vdc });
  };

  const handleNormalizeMatrix = () => {
    sounds.playCoin();
    const sum = totalMatrix || 1;
    const nb = Math.round((matrixWeights.nhanBiet / sum) * 100);
    const th = Math.round((matrixWeights.thongHieu / sum) * 100);
    const vd = Math.round((matrixWeights.vanDung / sum) * 100);
    const vdc = 100 - (nb + th + vd);
    setMatrixWeights({ nhanBiet: nb, thongHieu: th, vanDung: vd, vanDungCao: Math.max(0, vdc) });
  };

  // Constraints & Rules
  const [constraints, setConstraints] = useState({
    sgkOnly: true,
    noExtraGrade: true,
    noWordsOutsideUnit: true,
    noOutsideProgram: true,
    checkTeacherBook: true
  });

  const [expertReviewer, setExpertReviewer] = useState<boolean>(true);

  // Result Exam Package
  const [createdExamPackage, setCreatedExamPackage] = useState<ExamPackage | null>(null);
  const [activeVariantCode, setActiveVariantCode] = useState<string>('Đề 101 (A)');
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<'word' | 'pdf' | 'ppt' | 'google_forms' | 'quizizz' | 'kahoot'>('word');

  // OCR file states
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [ocrSubject, setOcrSubject] = useState<SubjectType>('Tiếng Việt');
  const [ocrGrade, setOcrGrade] = useState<number>(3);
  const [ocrDifficulty, setOcrDifficulty] = useState<DifficultyType>('Trung bình');
  const [ocrFormat, setOcrFormat] = useState<QuestionType>('multiple_choice');
  const [ocrCount, setOcrCount] = useState<number>(3);
  const [ocrUnit, setOcrUnit] = useState('');

  // OCR result states
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrExtractedText, setOcrExtractedText] = useState<string | null>(null);
  const [ocrGeneratedQuestions, setOcrGeneratedQuestions] = useState<Question[]>([]);

  // Loading indicator logs
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingLogIndex, setLoadingLogIndex] = useState(0);

  const loadingLogs = [
    '🐝 Chuyên gia AI đang phân tích Yêu cầu cần đạt CTGDPT 2018...',
    '📖 Đang quét cấu trúc bài học trong bộ sách giáo khoa chuẩn...',
    '⚖️ Điêu khắc câu hỏi theo Ma trận tư duy Bloom 4 cấp độ...',
    '🔍 Trợ lý AI Reviewer đang thẩm định cú pháp, chính tả & đáp án...',
    '🎉 Đang đóng gói 4 mã đề thi (Đề A, B, C, D) và bảng ma trận!'
  ];

  const ocrLoadingLogs = [
    '⚡ Đang soi đèn đọc tài liệu cô gửi mến yêu...',
    '🔬 Trợ lý Ong Vàng đang giải mã từng dòng chữ (OCR)...',
    '🎨 Chọn lọc chất liệu kiến thức phù hợp tuổi học trò...',
    '🍬 Điêu khắc câu hỏi trắc nghiệm, điền từ & tự luận...',
    '🌟 Kiểm duyệt đáp án chính xác và rắc thêm gia vị lời giải!'
  ];

  const [ocrLoadingLogIndex, setOcrLoadingLogIndex] = useState(0);

  // Load configuration memory from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai_exam_creator_config');
      if (saved) {
        const cfg = JSON.parse(saved);
        if (cfg.subject) setSubject(cfg.subject);
        if (cfg.grade) setGrade(cfg.grade);
        if (cfg.bookSeries) setBookSeries(cfg.bookSeries);
        if (cfg.edition) setEdition(cfg.edition);
        if (cfg.scope) setScope(cfg.scope);
        if (cfg.purpose) setPurpose(cfg.purpose);
        if (cfg.skillsFocus) setSkillsFocus(cfg.skillsFocus);
        if (cfg.selectedTypes) setSelectedTypes(cfg.selectedTypes);
        if (cfg.constraints) setConstraints(cfg.constraints);
        if (cfg.matrixWeights) setMatrixWeights(cfg.matrixWeights);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save configuration memory to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_exam_creator_config', JSON.stringify({
        subject, grade, bookSeries, edition, scope, purpose, skillsFocus, selectedTypes, constraints, matrixWeights
      }));
    } catch (e) {
      console.error(e);
    }
  }, [subject, grade, bookSeries, edition, scope, purpose, skillsFocus, selectedTypes, constraints, matrixWeights]);

  // Dynamic book series selection based on subject
  useEffect(() => {
    if (subject === 'Tiếng Anh') {
      if (!['Global Success', 'Bộ Giáo dục và Đào tạo'].includes(bookSeries)) {
        setBookSeries('Global Success');
      }
    } else {
      if (!['Kết nối tri thức với cuộc sống', 'Bộ Giáo dục và Đào tạo'].includes(bookSeries)) {
        setBookSeries('Kết nối tri thức với cuộc sống');
      }
    }
    // Set default skills focus
    const availSkills = SKILLS_BY_SUBJECT[subject] || SKILLS_BY_SUBJECT['Khác'];
    setSkillsFocus(availSkills.slice(0, 3));
  }, [subject]);

  // Auto reset unit selections on subject/grade changes
  useEffect(() => {
    const list = standardUnits[subject]?.[grade] || [];
    if (list.length > 0) {
      setUnit(list[0]);
      setSelectedUnits([list[0]]);
    } else {
      setUnit('');
      setSelectedUnits([]);
    }
  }, [subject, grade]);

  const toggleUnitSelection = (u: string) => {
    sounds.playClick();
    setSelectedUnits(prev => {
      const next = prev.includes(u) ? prev.filter(x => x !== u) : [...prev, u];
      setUnit(next.join(', '));
      return next;
    });
  };

  const handleSelectAllUnits = () => {
    sounds.playCoin();
    const list = standardUnits[subject]?.[grade] || [];
    if (list.length > 0) {
      setSelectedUnits(list);
      setUnit(list.join(', '));
    }
  };

  const handleClearAllUnits = () => {
    sounds.playClick();
    setSelectedUnits([]);
    setUnit('');
  };

  const handleAddCustomUnit = () => {
    if (!customUnitInput.trim()) return;
    sounds.playCoin();
    const trimmed = customUnitInput.trim();
    if (!selectedUnits.includes(trimmed)) {
      const next = [...selectedUnits, trimmed];
      setSelectedUnits(next);
      setUnit(next.join(', '));
    }
    setCustomUnitInput('');
  };

  useEffect(() => {
    const list = standardUnits[ocrSubject]?.[ocrGrade] || [];
    if (list.length > 0) {
      setOcrUnit(list[0]);
    } else {
      setOcrUnit('');
    }
  }, [ocrSubject, ocrGrade]);

  useEffect(() => {
    if (autofillTopic) {
      setTopic(autofillTopic);
    }
  }, [autofillTopic]);

  // Animated loading log cycler
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingLogIndex((prev) => (prev + 1) % loadingLogs.length);
      }, 1600);
    } else {
      setLoadingLogIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const toggleSkillFocus = (skill: string) => {
    sounds.playClick();
    setSkillsFocus(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleQuestionType = (t: QuestionType) => {
    sounds.playClick();
    setSelectedTypes(prev => {
      if (prev.includes(t)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(item => item !== t);
      } else {
        return [...prev, t];
      }
    });
  };

  // Drag-and-drop handlers for OCR
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      sounds.playError();
      alert("Kích thước tệp lớn quá cô ơi! Vui lòng chọn tệp dưới 10MB để xử lý nhanh nhất nhé!");
      return;
    }

    sounds.playCoin();
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    sounds.playClick();
    setSelectedFile(null);
    setFileBase64(null);
    setOcrExtractedText(null);
    setOcrGeneratedQuestions([]);
  };

  const handleOCRGenerate = async () => {
    if (!fileBase64 || !selectedFile) {
      sounds.playError();
      alert("Cô mến yêu ơi, vui lòng tải lên tài liệu hình ảnh hoặc PDF trước nhé!");
      return;
    }

    setOcrLoading(true);
    setOcrLoadingLogIndex(0);
    sounds.playClick();
    setOcrExtractedText(null);
    setOcrGeneratedQuestions([]);

    try {
      const response = await fetch('/api/ai/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: fileBase64,
          mimeType: selectedFile.type,
          subject: ocrSubject,
          grade: ocrGrade,
          difficulty: ocrDifficulty,
          type: ocrFormat,
          count: ocrCount,
          unitOrLesson: ocrUnit
        })
      });

      const data = await response.json();
      if (data.questions) {
        setOcrExtractedText(data.extractedText);
        setOcrGeneratedQuestions(data.questions);
        sounds.playLevelUp();
        if (data.warning) {
          alert(`🎉 Trích xuất hoàn thành! (Lưu ý: ${data.warning})`);
        } else {
          alert(`🎉 Kỳ diệu chưa! Trợ lý Ong Vàng đã trích xuất văn bản và tạo thành công ${data.questions.length} câu hỏi từ tài liệu cho cô mến!`);
        }
      } else {
        throw new Error(data.error || 'No questions returned');
      }
    } catch (err: any) {
      console.error(err);
      sounds.playError();
      alert(`Bzzzz... 🐝 Có lỗi xảy ra trong quá trình nhận dạng: ${err.message}`);
    } finally {
      setOcrLoading(false);
    }
  };

  const handleImportAllOCRQuestions = () => {
    if (ocrGeneratedQuestions.length === 0) return;
    onAddQuestions(ocrGeneratedQuestions);
    sounds.playLevelUp();
    alert(`🌸 Chúc mừng cô! Đã lưu thành công cả ${ocrGeneratedQuestions.length} câu đố nhận diện OCR vào Ngân hàng câu hỏi rồi ạ!`);
    onNavigateToQuestions();
  };

  const handleImportSingleQuestion = (q: Question) => {
    onAddQuestions([q]);
    sounds.playCoin();
    setOcrGeneratedQuestions(prev => prev.filter(item => item.id !== q.id));
  };

  // Sample quick templates data
  const promptTemplates = [
    { title: '🇬🇧 Global Success Unit 3', text: 'Vocabulary and Grammar about Our Bodies: head, eyes, ears, touch your hair...', subject: 'Tiếng Anh', book: 'Global Success' },
    { title: '📐 Bảng nhân 5 (KNTT)', text: 'Phép nhân trong phạm vi bảng nhân 5, đếm số chân thỏ, số ô cửa sổ...', subject: 'Toán', book: 'Kết nối tri thức với cuộc sống' },
    { title: '📝 Tiếng Việt: Thành ngữ', text: 'Thành ngữ về tình cảm gia đình, kính trên nhường dưới, học đi đôi với hành...', subject: 'Tiếng Việt', book: 'Kết nối tri thức với cuộc sống' },
    { title: '🔬 Khoa học: Sự bay hơi của nước', text: 'Hiện tượng nước ngưng tụ hình thành mây và mưa trong tự nhiên...', subject: 'Khoa học', book: 'Kết nối tri thức với cuộc sống' },
    { title: '🗺️ Lịch sử: Vùng Đồng bằng Bắc Bộ', text: 'Sông Hồng, văn hóa trồng lúa nước, hội làng truyền thống...', subject: 'Lịch sử & Địa lý', book: 'Kết nối tri thức với cuộc sống' }
  ];

  const handleApplyTemplate = (tpl: typeof promptTemplates[0]) => {
    sounds.playCoin();
    setTopic(tpl.text);
    setSubject(tpl.subject as SubjectType);
    setBookSeries(tpl.book);
    setAiTab('prompt');
  };

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setLoadingLogIndex(0);
    sounds.playClick();

    const unitsList = selectedUnits.length > 0 ? selectedUnits : (unit ? [unit] : []);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          subject,
          grade,
          bookSeries,
          edition,
          chapter,
          lesson,
          unit: unitsList.join(', '),
          units: unitsList,
          selectedUnits: unitsList,
          part,
          scope,
          purpose,
          skillsFocus,
          cognitiveMatrix: matrixWeights,
          difficulty,
          types: selectedTypes,
          type: selectedTypes[0] || 'multiple_choice',
          count,
          unitOrLesson: unitsList.join(', ') || lesson || chapter,
          constraints,
          expertReviewer
        })
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        if (data.examPackage) {
          setCreatedExamPackage(data.examPackage);
          setActiveVariantCode(data.examPackage.variants[0]?.code || 'Đề 101 (A)');
        }
        onAddQuestions(data.questions);
        sounds.playLevelUp();
      } else {
        throw new Error('No questions returned');
      }
    } catch (err) {
      console.error(err);
      sounds.playError();
      alert('Bzzzz... 🐝 Có trục trặc sóng kết nối nhỏ. Ong Vàng đã cố gắng tự soạn đề mẫu phù hợp cho cô rồi nhé!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Build Word Document HTML (usable by both Word Export and Interactive Preview Modal)
  const buildWordHtml = (pkg: ExamPackage, vCode: string, includeAnswers: boolean = true) => {
    const variant = pkg.variants.find(v => v.code === vCode) || pkg.variants[0];
    const questions = variant.questions;
    const isEn = pkg.language === 'en' || pkg.subject === 'Tiếng Anh';

    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${pkg.title}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; margin: 2cm; color: #111827; }
          .header-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .header-table td { text-align: center; font-weight: bold; font-size: 11pt; }
          .title { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 15px 0 10px 0; color: #1e3a8a; }
          .meta-info { font-style: italic; text-align: center; margin-bottom: 20px; font-size: 11pt; color: #374151; }
          .matrix-box { border: 1.5px solid #2563eb; padding: 12px; margin-bottom: 20px; font-size: 10.5pt; background: #f8fafc; border-radius: 4px; }
          .question-item { margin-bottom: 18px; page-break-inside: avoid; }
          .q-title { font-weight: bold; font-size: 12.5pt; color: #0f172a; margin-bottom: 4px; }
          .passage-box { border: 1.5px solid #3b82f6; background-color: #f0f9ff; padding: 14px; margin: 10px 0 14px 0; border-radius: 6px; }
          .passage-heading { font-weight: bold; font-size: 11.5pt; color: #1e40af; margin-bottom: 6px; }
          .passage-title { text-align: center; font-weight: bold; font-size: 12pt; text-transform: uppercase; color: #1e3a8a; margin: 6px 0 8px 0; }
          .passage-text { line-height: 1.6; font-size: 12pt; color: #1e293b; text-align: justify; }
          .options-grid { margin-left: 20px; margin-top: 6px; line-height: 1.6; }
          .key-table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 11pt; }
          .key-table th { background-color: #1e3a8a; color: #ffffff; border: 1px solid #000; padding: 8px; text-align: center; }
          .key-table td { border: 1px solid #000; padding: 6px; text-align: center; }
          .explanation-box { background: #f8fafc; padding: 10px; border-left: 4px solid #3b82f6; margin-top: 8px; font-size: 11pt; border-radius: 0 4px 4px 0; }
          .student-info { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11pt; }
          .student-info td { padding: 4px; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td>${isEn ? 'MINISTRY OF EDUCATION AND TRAINING<br>PRIMARY SCHOOL STANDARD ASSESSMENT' : 'BỘ GIÁO DỤC VÀ ĐÀO TẠO<br>TRƯỜNG TIỂU HỌC CHUẨN GDPT 2018'}</td>
            <td>${isEn ? 'OFFICIAL PROGRESS ASSESSMENT<br>ACADEMIC YEAR 2025 - 2026' : 'ĐỀ KIỂM TRA ĐÁNH GIÁ CHUẨN ĐẦU RA<br>NĂM HỌC 2025 - 2026'}</td>
          </tr>
        </table>

        <div class="title">${pkg.title} - ${variant.code}</div>
        <div class="meta-info">
          ${isEn 
            ? `Subject: <b>English</b> | Grade: <b>${pkg.grade}</b> | Series: <b>${pkg.bookSeries} (${pkg.edition})</b><br>Units Covered: <b>${pkg.units && pkg.units.length > 0 ? pkg.units.join(', ') : (pkg.bookSeries || 'Standard Curriculum')}</b><br>Time limit: <b>${pkg.analysis.estimatedTimeMinutes} minutes</b> | AI Pedagogical Quality Score: <b>${pkg.analysis.qualityScore}/100</b>`
            : `Môn: <b>${pkg.subject}</b> | Lớp: <b>${pkg.grade}</b> | Bộ sách: <b>${pkg.bookSeries} (${pkg.edition})</b><br>Chủ đề / Units: <b>${pkg.units && pkg.units.length > 0 ? pkg.units.join(', ') : 'Toàn bộ chương trình'}</b><br>Thời gian làm bài: <b>${pkg.analysis.estimatedTimeMinutes} phút</b> | Điểm kiểm định AI: <b>${pkg.analysis.qualityScore}/100</b>`
          }
        </div>

        <table class="student-info">
          <tr>
            <td>${isEn ? 'Full Name: ..........................................................................' : 'Họ và tên học sinh: .........................................................'}</td>
            <td>${isEn ? 'Class: ........................' : 'Lớp: ........................'}</td>
          </tr>
        </table>

        <div class="matrix-box">
          <b>${isEn ? 'COGNITIVE ASSESSMENT MATRIX (CIRCULAR 27 - MOET):' : 'BẢNG MA TRẬN MỨC ĐỘ TƯ DUY (THÔNG TƯ 27 - BGDĐT):'}</b><br>
          • ${isEn ? 'Recognition' : 'Nhận biết'}: ${pkg.analysis.cognitiveMatrix.nhanBiet}% | ${isEn ? 'Comprehension' : 'Thông hiểu'}: ${pkg.analysis.cognitiveMatrix.thongHieu}% | ${isEn ? 'Application' : 'Vận dụng'}: ${pkg.analysis.cognitiveMatrix.vanDung}% | ${isEn ? 'High Application' : 'Vận dụng cao'}: ${pkg.analysis.cognitiveMatrix.vanDungCao}%<br>
          • ${isEn ? 'Knowledge Coverage' : 'Phạm vi kiến thức'}: ${pkg.analysis.knowledgeCoverage}
        </div>

        <h3>${isEn ? `I. TEST QUESTIONS (${questions.length} Questions)` : `I. PHẦN CÂU HỎI (${questions.length} câu)`}</h3>
        ${questions.map((q, i) => `
          <div class="question-item">
            ${q.passage ? `
              <div class="passage-box">
                <div class="passage-heading">📖 ${isEn ? 'Read the following passage carefully and answer the question:' : 'Đọc đoạn văn sau và thực hiện yêu cầu:'}</div>
                ${q.passageTitle ? `<div class="passage-title">${q.passageTitle}</div>` : ''}
                <div class="passage-text">${q.passage}</div>
              </div>
            ` : ''}
            <div class="q-title">${isEn ? `Question ${i + 1}` : `Câu ${i + 1}`} [${q.cognitiveLevel || (isEn ? 'Comprehension' : 'Thông hiểu')}]: ${q.text}</div>
            ${q.options && q.options.length > 0 && !['fill_blank', 'crossword', 'reorder_words', 'reorder_letters', 'essay', 'answer_question'].includes(q.type) ? `
              <div class="options-grid">
                A. ${q.options[0] || ''}<br>
                B. ${q.options[1] || ''}<br>
                C. ${q.options[2] || ''}<br>
                D. ${q.options[3] || ''}
              </div>
            ` : (q.type === 'crossword' ? `
              <div style="margin-left: 20px; font-style: italic; color: #4b5563; margin-top: 6px;">[Ô chữ ${String(q.answer).replace(/\s/g, '').length} chữ cái: ................................................................................]</div>
            ` : q.type === 'fill_blank' ? `
              <div style="margin-left: 20px; font-style: italic; color: #4b5563; margin-top: 6px;">[Từ/Số cần điền: ................................................................................]</div>
            ` : q.type === 'reorder_words' || q.type === 'reorder_letters' ? `
              <div style="margin-left: 20px; font-style: italic; color: #4b5563; margin-top: 6px;">[Sắp xếp lại: ........................................................................................]</div>
            ` : (q.type === 'essay' || q.type === 'answer_question') ? `
              <div style="margin-left: 20px; font-style: italic; color: #4b5563; margin-top: 6px;">[Bài làm: ........................................................................................<br>............................................................................................................]</div>
            ` : '')}
          </div>
        `).join('')}

        ${includeAnswers ? `
          <br><hr><br>
          <h3>${isEn ? `II. ANSWER KEY & ASSESSMENT MATRIX (${variant.code})` : `II. ĐÁP ÁN VÀ MA TRẬN ĐỐI CHIẾU (${variant.code})`}</h3>
          <table class="key-table">
            <tr>
              <th>${isEn ? 'Question' : 'Câu số'}</th>
              <th>${isEn ? 'Correct Answer' : 'Đáp án đúng'}</th>
              <th>${isEn ? 'Cognitive Level' : 'Mức độ tư duy'}</th>
              <th>${isEn ? 'Skill Domain' : 'Kỹ năng'}</th>
            </tr>
            ${questions.map((q, i) => `
              <tr>
                <td>${isEn ? `Q${i + 1}` : `Câu ${i + 1}`}</td>
                <td><b>${q.answer}</b></td>
                <td>${q.cognitiveLevel || (isEn ? 'Comprehension' : 'Thông hiểu')}</td>
                <td>${q.skillCategory || (isEn ? 'Reading' : 'Đọc hiểu')}</td>
              </tr>
            `).join('')}
          </table>

          <br>
          <h4>${isEn ? 'DETAILED PEDAGOGICAL EXPLANATIONS & CURRICULUM REFERENCES:' : 'HƯỚNG DẪN GIẢI CHI TIẾT & GHI CHÚ CHUẨN SGK:'}</h4>
          ${questions.map((q, i) => `
            <div class="explanation-box">
              <b>${isEn ? `Question ${i + 1}` : `Câu ${i + 1}`}:</b> ${isEn ? 'Correct Answer:' : 'Đáp án đúng:'} <b>${q.answer}</b><br>
              💡 <i>${isEn ? 'Explanation:' : 'Giải thích:'}</i> ${q.explanation || (isEn ? 'Standard answer aligned with curriculum.' : 'Đang cập nhật')}<br>
              ✔ <i>${isEn ? 'Why correct:' : 'Vì sao đúng:'}</i> ${q.reasonRight || (isEn ? `100% compliant with ${pkg.bookSeries} textbook.` : 'Đúng theo quy định sách giáo khoa')}<br>
              📖 <i>${isEn ? 'Reference source:' : 'Nguồn tham chiếu:'}</i> ${q.relatedKnowledge || pkg.bookSeries}
            </div>
          `).join('')}
        ` : ''}
      </body>
      </html>
    `;
  };

  // Export handlers
  const handleExportWord = (pkg: ExamPackage, vCode: string) => {
    sounds.playCoin();
    const variant = pkg.variants.find(v => v.code === vCode) || pkg.variants[0];
    const htmlContent = buildWordHtml(pkg, vCode, true);

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pkg.title.replace(/\s+/g, '_')}_${variant.code}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPrintPDF = () => {
    sounds.playCoin();
    window.print();
  };

  const handleExportFormsQuizizz = (type: 'google_forms' | 'quizizz' | 'kahoot') => {
    if (!createdExamPackage) return;
    sounds.playCoin();
    const questions = createdExamPackage.variants[0].questions;
    
    let text = `=== DỮ LIỆU CÂU HỎI CHO ${type.toUpperCase()} ===\n\n`;
    questions.forEach((q, i) => {
      text += `Câu ${i + 1}: ${q.text}\n`;
      if (q.options) {
        q.options.forEach((opt, oi) => {
          text += `${String.fromCharCode(65 + oi)}. ${opt}\n`;
        });
      }
      text += `Đáp án đúng: ${q.answer}\n\n`;
    });

    navigator.clipboard.writeText(text);
    alert(`🎉 Đã sao chép dữ liệu câu hỏi định dạng ${type.toUpperCase()} vào bộ nhớ tạm! Cô chỉ cần dán vào công cụ là xong ngay!`);
  };

  // Send questions to game center
  const handleSendToGames = () => {
    sounds.playLevelUp();
    if (onNavigateToGames) {
      onNavigateToGames();
    } else {
      onNavigateToQuestions();
    }
  };

  // --- FLOATING CHATBOT WIDGET STATE ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Chào cô giáo mến yêu! 🐝 Ong Vàng là Trợ lý AI Chuyên gia Đề thi CTGDPT 2018. Cô cần tư vấn thiết kế ma trận hay đặt tiêu chuẩn câu hỏi nào ạ?',
      timestamp: 'Vừa xong'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    sounds.playClick();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          context: `Môn: ${subject}, Lớp: ${grade}, Sách: ${bookSeries}`
        })
      });
      const data = await res.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Bzzzz... 🐝 Ong Vàng sẵn sàng trợ giúp cô thiết kế bài giảng sinh động!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      sounds.playCoin();
    } catch (err) {
      console.error(err);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Bzzzz... Ong Vàng gặp chút nhiễu sóng nhỏ, nhưng em vẫn ở đây cùng cô nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* HEADER HERO BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-[32px] p-6 md:p-8 text-white shadow-2xl border-4 border-white/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-yellow-300" />
              <span>HỆ THỐNG TẠO ĐỀ THI THÔNG MINH GDPT 2018</span>
            </div>
            <h1 className="font-fredoka text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide">
              Chuyên Gia Soạn Đề & Kiểm Định AI
            </h1>
            <p className="text-xs md:text-sm text-indigo-100 font-medium max-w-2xl leading-relaxed">
              Bám sát Công văn 2345, Thông tư 27, Chuẩn kiến thức SGK & Tạo tự động 4 Mã đề thi (A, B, C, D) kèm Bảng Ma trận tư duy & Thẩm định chất lượng.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={() => { sounds.playClick(); setAiTab('prompt'); }}
              className={`px-4 py-2.5 rounded-2xl font-fredoka font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                aiTab === 'prompt' ? 'bg-yellow-300 text-purple-950 scale-105 border-2 border-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Kiến tạo Đề thi</span>
            </button>
            <button
              onClick={() => { sounds.playClick(); setAiTab('ocr'); }}
              className={`px-4 py-2.5 rounded-2xl font-fredoka font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                aiTab === 'ocr' ? 'bg-yellow-300 text-purple-950 scale-105 border-2 border-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Nhận diện OCR / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Main Generator Form or Created Exam Result */}
        <div className="lg:col-span-2 bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/25 p-6 shadow-2xl text-white space-y-6 text-left">
          
          {aiTab === 'prompt' ? (
            <>
              {/* Form Title & Subtitle */}
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-yellow-400 text-purple-950 rounded-2xl shadow-lg">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-fredoka text-lg md:text-xl font-extrabold text-yellow-300 drop-shadow-md">
                      Cấu hình Đề thi chuẩn GDPT 2018
                    </h3>
                    <p className="text-xs text-indigo-100 font-medium">
                      Chọn thông số môn học, bộ sách, chương bài & ma trận câu hỏi
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl text-[10px] font-bold text-yellow-300 border border-white/10">
                  <Award className="w-3.5 h-3.5" />
                  <span>Bộ GD&ĐT Approved</span>
                </div>
              </div>

              {/* SECTION I: THÔNG TIN SÁCH & BÀI HỌC */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>I. Thông tin Chương trình & Bộ sách Giáo khoa</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-indigo-100 flex items-center gap-1">
                      <span>📐 Môn học</span>
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as SubjectType)}
                      className="p-3 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-xs font-bold text-white cursor-pointer"
                    >
                      <option value="Tiếng Anh">🇬🇧 Tiếng Anh (English)</option>
                      <option value="Toán">📐 Toán học</option>
                      <option value="Tiếng Việt">📝 Tiếng Việt</option>
                      <option value="Tự nhiên & Xã hội">🌱 Tự nhiên & Xã hội</option>
                      <option value="Khoa học">🔬 Khoa học</option>
                      <option value="Lịch sử & Địa lý">🗺️ Lịch sử & Địa lý</option>
                      <option value="Đạo đức">💖 Đạo đức</option>
                      <option value="Hoạt động trải nghiệm">🎒 Hoạt động trải nghiệm</option>
                    </select>
                  </div>

                  {/* Grade */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-indigo-100 flex items-center gap-1">
                      <span>🏫 Khối lớp</span>
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(Number(e.target.value))}
                      className="p-3 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-xs font-bold text-white cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map(g => (
                        <option key={g} value={g}>Lớp {g}</option>
                      ))}
                    </select>
                  </div>

                  {/* Textbook Series */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-indigo-100 flex items-center gap-1">
                      <span>📖 Bộ sách SGK</span>
                    </label>
                    <select
                      value={bookSeries}
                      onChange={(e) => setBookSeries(e.target.value)}
                      className="p-3 bg-indigo-950/70 border border-white/20 rounded-xl outline-none text-xs font-bold text-white cursor-pointer"
                    >
                      {subject === 'Tiếng Anh' ? (
                        <>
                          <option value="Global Success">Global Success (Bộ Giáo dục và Đào tạo)</option>
                          <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống (NXB GDVN)</option>
                        </>
                      ) : (
                        <>
                          <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống (NXB GDVN)</option>
                          <option value="Bộ Giáo dục và Đào tạo">Bộ Giáo dục và Đào tạo</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Edition & Scope & Purpose */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-indigo-100">📌 Phiên bản sách</label>
                    <select
                      value={edition}
                      onChange={(e) => setEdition(e.target.value)}
                      className="p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                    >
                      <option value="Bộ GDĐT 2018">Chuẩn Bộ GDĐT 2018</option>
                      <option value="Tái bản 2024">Tái bản mới 2024</option>
                      <option value="Tái bản 2025">Tái bản mới 2025</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-indigo-100">🎯 Mục tiêu đề thi</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                    >
                      <option value="Kiểm tra thường xuyên">Kiểm tra thường xuyên (15p)</option>
                      <option value="Kiểm tra định kỳ">Kiểm tra định kỳ (1 tiết)</option>
                      <option value="Thi Giữa kỳ">Thi Giữa học kỳ (1&2)</option>
                      <option value="Thi Cuối kỳ">Thi Cuối học kỳ (1&2)</option>
                      <option value="Bồi dưỡng Học sinh giỏi">Bồi dưỡng Học sinh giỏi</option>
                      <option value="Thi IOE">Thi IOE / Violympic cấp trường</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-indigo-100">🌐 Phạm vi kiến thức</label>
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                    >
                      <option value="Chỉ bài này">Chỉ trong Bài học / Unit này</option>
                      <option value="Từ bài này đến bài khác">Từ bài này đến bài khác</option>
                      <option value="Cả chương">Cả Chương / Chủ đề</option>
                      <option value="Ôn tập tổng hợp">Ôn tập tổng hợp</option>
                    </select>
                  </div>
                </div>

                {/* 100% English Notice Banner */}
                {subject === 'Tiếng Anh' && (
                  <div className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 p-3.5 rounded-2xl border border-blue-400/40 flex items-start gap-3 shadow-lg">
                    <span className="text-2xl shrink-0 animate-bounce">🇬🇧</span>
                    <div className="text-xs space-y-0.5">
                      <span className="font-fredoka font-bold text-yellow-300 text-sm block">CHẾ ĐỘ 100% TIẾNG ANH CHUẨN QUỐC TẾ (CEFR PRIMARY)</span>
                      <p className="text-blue-100 text-[11px] leading-relaxed">
                        Đề thi môn Tiếng Anh bắt buộc được biên soạn <b>100% bằng Tiếng Anh chuẩn MOET / Global Success</b> (bao gồm bài đọc hiểu, câu hỏi, lựa chọn, đáp án đúng, giải thích và bảng ma trận Thông tư 27). Không chứa từ ngữ tiếng Việt trong đề thi.
                      </p>
                    </div>
                  </div>
                )}

                {/* Multi-Unit Selection Box */}
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <label className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Chọn Các Unit / Bài Học Vào Đề Thi (Được chọn nhiều Unit):</span>
                      </label>
                      <span className="text-[10px] text-indigo-200">
                        Hệ thống AI sẽ phân bổ câu hỏi đều khắp các Unit được chọn
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleSelectAllUnits}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/40 hover:bg-indigo-500/60 text-yellow-300 font-bold text-[10px] transition-all border border-indigo-400/30 cursor-pointer"
                      >
                        ⚡ Chọn tất cả ({standardUnits[subject]?.[grade]?.length || 0})
                      </button>
                      <button
                        type="button"
                        onClick={handleClearAllUnits}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-indigo-200 font-bold text-[10px] transition-all border border-white/10 cursor-pointer"
                      >
                        ✖ Bỏ chọn
                      </button>
                    </div>
                  </div>

                  {/* Standard Unit pills grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {(standardUnits[subject]?.[grade] || []).map((u, ui) => {
                      const isSelected = selectedUnits.includes(u);
                      return (
                        <button
                          key={ui}
                          type="button"
                          onClick={() => toggleUnitSelection(u)}
                          className={`p-2 rounded-xl text-left text-xs font-bold transition-all flex items-start gap-2 border cursor-pointer ${
                            isSelected 
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-purple-950 border-white shadow-sm scale-[1.01]' 
                              : 'bg-white/5 text-indigo-100 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5 border ${isSelected ? 'bg-purple-950 text-yellow-300 border-purple-900' : 'bg-white/10 border-white/20'}`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          <span className="line-clamp-2 leading-tight">{u}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom unit tag adder & manual input */}
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customUnitInput}
                        onChange={(e) => setCustomUnitInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomUnit(); } }}
                        placeholder="Tự nhập thêm Unit / Bài học (ví dụ: Unit 7: At the farm, Bài 12...)"
                        className="flex-1 p-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white placeholder-indigo-200/50 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomUnit}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all shrink-0 cursor-pointer shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm Unit</span>
                      </button>
                    </div>

                    <div className="sm:w-1/3 flex items-center gap-1">
                      <select
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                        className="w-full p-2 bg-indigo-950/70 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                      >
                        <option value="Tất cả Part">Mọi Part trong Unit</option>
                        <option value="Look and Listen">Part 1: Look & Listen</option>
                        <option value="Listen and Repeat">Part 2: Listen & Repeat</option>
                        <option value="Let's Talk">Part 3: Let's Talk</option>
                        <option value="Reading & Writing">Part 4: Reading & Writing</option>
                        <option value="Project & Review">Part 5: Project & Review</option>
                      </select>
                    </div>
                  </div>

                  {/* Selected units badge bar */}
                  {selectedUnits.length > 0 && (
                    <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-400/30 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[11px] font-bold text-yellow-300 shrink-0 flex items-center gap-1">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Đã chọn ({selectedUnits.length} Units):
                      </span>
                      {selectedUnits.map((u, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-yellow-300 text-purple-950 px-2 py-0.5 rounded-lg text-[11px] font-extrabold shadow-sm"
                        >
                          <span className="truncate max-w-[200px]">{u}</span>
                          <button
                            type="button"
                            onClick={() => toggleUnitSelection(u)}
                            className="hover:text-red-700 font-black cursor-pointer ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION II: SKILLS & QUESTION FORMATS */}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <h4 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider flex items-center justify-between">
                  <span>II. Mạch Kiến Thức & Dạng Câu Hỏi</span>
                  <span className="text-[10px] text-indigo-200 font-normal">Đã chọn {selectedTypes.length} dạng</span>
                </h4>

                {/* Skills focus selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-indigo-100">🎯 Trọng tâm kỹ năng (Click chọn):</label>
                  <div className="flex flex-wrap gap-2">
                    {(SKILLS_BY_SUBJECT[subject] || SKILLS_BY_SUBJECT['Khác']).map(sk => {
                      const active = skillsFocus.includes(sk);
                      return (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => toggleSkillFocus(sk)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            active 
                              ? 'bg-yellow-300 text-purple-950 border-white shadow-md scale-102' 
                              : 'bg-white/10 text-indigo-100 border-white/10 hover:bg-white/20'
                          }`}
                        >
                          {active ? '✓ ' : '＋ '}{sk}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-select question formats */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-indigo-100">✍️ Dạng bài đưa vào đề (Chọn nhiều):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {QUESTION_TYPE_OPTIONS.map(opt => {
                      const active = selectedTypes.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleQuestionType(opt.id)}
                          className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                            active 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-white shadow-md' 
                              : 'bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-base">{opt.icon}</span>
                          <span className="line-clamp-1">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Count & Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-yellow-300">🔢 Tổng số lượng câu hỏi</label>
                    <select
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                    >
                      {[3, 5, 8, 10, 12, 15, 20].map(c => (
                        <option key={c} value={c}>Tạo đúng {c} câu hỏi</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-yellow-300">⭐ Mức độ tổng thể</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as DifficultyType)}
                      className="p-2.5 bg-indigo-950/70 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                    >
                      <option value="Dễ">Dễ (Chủ yếu Nhận biết)</option>
                      <option value="Trung bình">Trung bình (Cân bằng Chuẩn)</option>
                      <option value="Khó">Nâng cao (Tăng Vận dụng cao)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION III: MA TRẬN & NGUỒN KIỂM SOÁT AI */}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <h4 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider flex items-center justify-between">
                  <span>III. Ma Trận Tư Duy & Kiểm Soát Chuẩn SGK</span>
                </h4>

                {/* Cognitive Matrix Weights Interactive Editor */}
                <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold text-yellow-300">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-yellow-300" />
                      <span>📊 Tỷ lệ Ma trận Bloom (Chỉnh sửa trực tiếp):</span>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 border ${
                        totalMatrix === 100 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                          : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                      }`}>
                        {totalMatrix === 100 ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Tổng 100% (Chuẩn)</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Tổng: {totalMatrix}% (Cần 100%)</span>
                          </>
                        )}
                      </span>
                      {totalMatrix !== 100 && (
                        <button
                          type="button"
                          onClick={handleNormalizeMatrix}
                          className="px-2 py-1 bg-yellow-400 text-purple-950 font-extrabold text-[10px] rounded-lg hover:bg-yellow-300 transition-all cursor-pointer shadow-sm flex items-center gap-1"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Quy về 100%</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/10">
                    <span className="text-[11px] text-indigo-200 font-semibold mr-1">Tỷ lệ mẫu:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetMatrix(40, 30, 20, 10)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer border ${
                        matrixWeights.nhanBiet === 40 && matrixWeights.thongHieu === 30 && matrixWeights.vanDung === 20 && matrixWeights.vanDungCao === 10
                          ? 'bg-yellow-300 text-purple-950 border-white shadow-md'
                          : 'bg-white/10 text-indigo-100 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      4:3:2:1 (Chuẩn TT27)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetMatrix(50, 30, 20, 0)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer border ${
                        matrixWeights.nhanBiet === 50 && matrixWeights.thongHieu === 30 && matrixWeights.vanDung === 20 && matrixWeights.vanDungCao === 0
                          ? 'bg-yellow-300 text-purple-950 border-white shadow-md'
                          : 'bg-white/10 text-indigo-100 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      5:3:2:0 (Dễ / Lớp 1-2)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetMatrix(30, 40, 20, 10)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer border ${
                        matrixWeights.nhanBiet === 30 && matrixWeights.thongHieu === 40 && matrixWeights.vanDung === 20 && matrixWeights.vanDungCao === 10
                          ? 'bg-yellow-300 text-purple-950 border-white shadow-md'
                          : 'bg-white/10 text-indigo-100 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      3:4:2:1 (Tăng Thông hiểu)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetMatrix(20, 30, 30, 20)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer border ${
                        matrixWeights.nhanBiet === 20 && matrixWeights.thongHieu === 30 && matrixWeights.vanDung === 30 && matrixWeights.vanDungCao === 20
                          ? 'bg-yellow-300 text-purple-950 border-white shadow-md'
                          : 'bg-white/10 text-indigo-100 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      2:3:3:2 (Nâng cao / HSG)
                    </button>
                  </div>

                  {/* 4 Levels Sliders & Number Editors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Nhận biết */}
                    <div className="bg-blue-950/50 p-2.5 rounded-xl border border-blue-400/30 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-blue-300">
                        <span>🟦 Nhận biết</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={5}
                            value={matrixWeights.nhanBiet}
                            onChange={(e) => handleMatrixChange('nhanBiet', Number(e.target.value))}
                            className="w-12 text-center bg-blue-900/90 border border-blue-300/40 rounded px-1 py-0.5 text-white font-extrabold text-xs outline-none"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={matrixWeights.nhanBiet}
                        onChange={(e) => handleMatrixChange('nhanBiet', Number(e.target.value))}
                        className="w-full accent-blue-400 cursor-pointer h-1.5 bg-blue-950 rounded-lg"
                      />
                    </div>

                    {/* Thông hiểu */}
                    <div className="bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-400/30 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300">
                        <span>🟩 Thông hiểu</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={5}
                            value={matrixWeights.thongHieu}
                            onChange={(e) => handleMatrixChange('thongHieu', Number(e.target.value))}
                            className="w-12 text-center bg-emerald-900/90 border border-emerald-300/40 rounded px-1 py-0.5 text-white font-extrabold text-xs outline-none"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={matrixWeights.thongHieu}
                        onChange={(e) => handleMatrixChange('thongHieu', Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-emerald-950 rounded-lg"
                      />
                    </div>

                    {/* Vận dụng */}
                    <div className="bg-amber-950/50 p-2.5 rounded-xl border border-amber-400/30 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                        <span>🟧 Vận dụng</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={5}
                            value={matrixWeights.vanDung}
                            onChange={(e) => handleMatrixChange('vanDung', Number(e.target.value))}
                            className="w-12 text-center bg-amber-900/90 border border-amber-300/40 rounded px-1 py-0.5 text-white font-extrabold text-xs outline-none"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={matrixWeights.vanDung}
                        onChange={(e) => handleMatrixChange('vanDung', Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer h-1.5 bg-amber-950 rounded-lg"
                      />
                    </div>

                    {/* Vận dụng cao */}
                    <div className="bg-rose-950/50 p-2.5 rounded-xl border border-rose-400/30 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-rose-300">
                        <span>🟥 Vận dụng cao</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={5}
                            value={matrixWeights.vanDungCao}
                            onChange={(e) => handleMatrixChange('vanDungCao', Number(e.target.value))}
                            className="w-12 text-center bg-rose-900/90 border border-rose-300/40 rounded px-1 py-0.5 text-white font-extrabold text-xs outline-none"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={matrixWeights.vanDungCao}
                        onChange={(e) => handleMatrixChange('vanDungCao', Number(e.target.value))}
                        className="w-full accent-rose-400 cursor-pointer h-1.5 bg-rose-950 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Constraints & Checks */}
                <div className="space-y-2 bg-indigo-950/40 p-3.5 rounded-2xl border border-white/10 text-xs">
                  <span className="font-bold text-yellow-300 block">🔒 Giới hạn an toàn kiến thức (AI Enforcer):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-indigo-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={constraints.sgkOnly} 
                        onChange={(e) => setConstraints({...constraints, sgkOnly: e.target.checked})}
                        className="rounded accent-yellow-400"
                      />
                      <span>Chỉ sử dụng kiến thức trong SGK</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={constraints.noExtraGrade} 
                        onChange={(e) => setConstraints({...constraints, noExtraGrade: e.target.checked})}
                        className="rounded accent-yellow-400"
                      />
                      <span>Không vượt quá trình độ Lớp {grade}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={constraints.noWordsOutsideUnit} 
                        onChange={(e) => setConstraints({...constraints, noWordsOutsideUnit: e.target.checked})}
                        className="rounded accent-yellow-400"
                      />
                      <span>Không dùng từ vựng ngoài Bài / Unit</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={constraints.checkTeacherBook} 
                        onChange={(e) => setConstraints({...constraints, checkTeacherBook: e.target.checked})}
                        className="rounded accent-yellow-400"
                      />
                      <span>Đầu ra được AI Reviewer thẩm định</span>
                    </label>
                  </div>
                </div>

                {/* Additional topic prompt textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-yellow-300 flex items-center gap-1">
                    <span>🎨 Yêu cầu hoặc ngữ cảnh bổ sung</span>
                  </label>
                  <textarea
                    rows={2}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ví dụ: Lồng ghép hình ảnh chú gấu Pooh, bạn thỏ Bunny cho sinh động; câu hỏi bám sát các đoạn hội thoại thực tế..."
                    className="p-3 bg-white/10 border border-white/20 rounded-2xl text-xs font-semibold text-white placeholder-indigo-200/50"
                  />
                </div>
              </div>

              {/* ACTION BUTTON */}
              {isGenerating ? (
                <div className="p-6 bg-indigo-950/80 border-2 border-yellow-400/50 rounded-3xl text-center space-y-3 animate-pulse text-white shadow-2xl">
                  <RotateCw className="w-8 h-8 text-yellow-300 animate-spin mx-auto" />
                  <p className="font-fredoka text-sm font-extrabold text-yellow-300">
                    {loadingLogs[loadingLogIndex]}
                  </p>
                  <span className="text-[10px] text-indigo-200 font-bold block">Chuyên gia AI đang khởi tạo 4 mã đề & kiểm định chất lượng...</span>
                </div>
              ) : (
                <button
                  onClick={handleGenerateQuestions}
                  className="w-full py-4 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-purple-950 font-fredoka font-extrabold text-base md:text-lg flex items-center justify-center gap-2.5 cursor-pointer shadow-xl border-2 border-white hover:scale-101 active:scale-98 transition-all"
                >
                  <Wand2 className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>✨ TẠO ĐỀ THI CHUẨN GDPT 2018 (4 MÃ ĐỀ)</span>
                </button>
              )}

              {/* RESULT EXAM PACKAGE INSPECTOR & EXPORTER */}
              {createdExamPackage && (
                <div className="mt-8 p-6 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 border-2 border-yellow-400/60 rounded-3xl space-y-5 text-white shadow-2xl animate-fade-in">
                  
                  {/* Quality & Audit Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-0.5 rounded-full text-[11px] font-bold border border-emerald-400/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đã được AI Reviewer thẩm định</span>
                      </div>
                      <h3 className="font-fredoka text-lg md:text-xl font-extrabold text-yellow-300">
                        {createdExamPackage.title}
                      </h3>
                      <p className="text-xs text-indigo-200">
                        Phạm vi: {createdExamPackage.analysis.knowledgeCoverage} • Thời gian gợi ý: {createdExamPackage.analysis.estimatedTimeMinutes} phút
                      </p>
                    </div>

                    <div className="bg-yellow-400 text-purple-950 px-4 py-3 rounded-2xl text-center font-fredoka shadow-lg border border-white shrink-0">
                      <span className="text-[10px] font-extrabold block uppercase tracking-wider">Điểm Thẩm Định</span>
                      <span className="text-2xl font-black">{createdExamPackage.analysis.qualityScore}/100</span>
                    </div>
                  </div>

                  {/* Reviewer Notes & Audit checkmarks */}
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 space-y-2 text-xs">
                    <span className="font-bold text-yellow-300 block">📝 Ghi chú từ Hội đồng Thẩm định AI:</span>
                    <ul className="space-y-1 text-indigo-100 text-[11px]">
                      {(Array.isArray(createdExamPackage.analysis.reviewerNotes)
                        ? createdExamPackage.analysis.reviewerNotes
                        : [createdExamPackage.analysis.reviewerNotes || 'Đã kiểm định đạt chuẩn CTGDPT 2018']
                      ).map((note, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Variant Switcher Tabs */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-fredoka text-xs font-extrabold text-yellow-300 flex items-center gap-1.5">
                        <Shuffle className="w-4 h-4" />
                        <span>4 Mã đề thi hoán đổi tự động:</span>
                      </span>
                      <span className="text-[10px] text-indigo-200">Bấm mã đề để xem chi tiết</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {createdExamPackage.variants.map((v) => {
                        const active = activeVariantCode === v.code;
                        return (
                          <button
                            key={v.code}
                            onClick={() => { sounds.playClick(); setActiveVariantCode(v.code); }}
                            className={`p-2.5 rounded-xl font-fredoka font-extrabold text-xs transition-all cursor-pointer border text-center ${
                              active 
                                ? 'bg-yellow-300 text-purple-950 border-white shadow-lg scale-102' 
                                : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                            }`}
                          >
                            <span>{v.code}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Questions Preview for Selected Variant */}
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/10 space-y-3 max-h-96 overflow-y-auto">
                    <h4 className="font-bold text-xs text-yellow-300 flex items-center justify-between">
                      <span>📄 Xem trước {activeVariantCode} ({createdExamPackage.variants.find(v => v.code === activeVariantCode)?.questions.length || 0} câu):</span>
                      <button
                        onClick={() => { sounds.playClick(); setWordPreviewOpen(true); }}
                        className="text-[11px] text-teal-300 hover:text-teal-200 font-bold underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Mở bản xem trước trang in Word
                      </button>
                    </h4>

                    {createdExamPackage.variants
                      .find(v => v.code === activeVariantCode)
                      ?.questions.map((q, i) => (
                        <div key={q.id || i} className="bg-white/10 p-3.5 rounded-xl space-y-2 text-xs border border-white/10">
                          <div className="flex items-center justify-between text-[10px] font-bold text-yellow-300">
                            <span>Câu {i + 1} [{q.cognitiveLevel || 'Thông hiểu'}]</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded-full text-indigo-100">{q.skillCategory || 'Đọc hiểu'}</span>
                          </div>

                          {/* Reading Comprehension Passage Box */}
                          {q.passage && (
                            <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-400/40 space-y-1">
                              <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Đoạn văn đọc hiểu (Reading Passage): {q.passageTitle ? `"${q.passageTitle}"` : ''}</span>
                              </span>
                              <p className="text-xs text-blue-100 italic leading-relaxed whitespace-pre-wrap pl-1 border-l-2 border-cyan-400/50">
                                {q.passage}
                              </p>
                            </div>
                          )}

                          <p className="font-semibold text-white text-xs leading-relaxed">{q.text}</p>
                          
                          {q.options && q.options.length > 0 && !['fill_blank', 'crossword', 'reorder_words', 'reorder_letters', 'essay', 'answer_question'].includes(q.type) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-indigo-100 pl-2">
                              {q.options.map((opt, oi) => (
                                <div key={oi} className={`p-1.5 rounded-lg ${opt === q.answer ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30' : 'bg-white/5'}`}>
                                  {String.fromCharCode(65 + oi)}. {opt}
                                </div>
                              ))}
                            </div>
                          )}

                          {q.type === 'crossword' && (
                            <div className="bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-400/30 text-yellow-200 text-[11px]">
                              🔤 <b>Dạng Trò chơi Ô chữ</b>: Ô chữ gồm <b>{String(q.answer).replace(/\s/g, '').length}</b> chữ cái.
                            </div>
                          )}

                          {q.type === 'fill_blank' && (
                            <div className="bg-blue-500/10 p-2.5 rounded-lg border border-blue-400/30 text-blue-200 text-[11px]">
                              ✏️ <b>Dạng Điền vào chỗ trống</b>: Học sinh nhập từ hoặc số thích hợp.
                            </div>
                          )}

                          {q.type === 'reorder_words' && (
                            <div className="bg-purple-500/10 p-2.5 rounded-lg border border-purple-400/30 text-purple-200 text-[11px]">
                              🔀 <b>Dạng Sắp xếp từ thành câu</b>: Sắp xếp các cụm từ theo đúng cú pháp ngữ pháp.
                            </div>
                          )}
                          <p className="text-[11px] text-emerald-300 font-medium bg-emerald-950/30 p-1.5 rounded-lg border border-emerald-500/20">
                            🔑 Đáp án: <b className="text-emerald-200">{q.answer}</b>
                          </p>
                        </div>
                      ))}
                  </div>

                  {/* EXPORT TOOLBAR */}
                  <div className="space-y-2 border-t border-white/15 pt-4">
                    <span className="font-fredoka text-xs font-extrabold text-yellow-300 block">
                      📥 Xuất đề thi & Chuyển thành Game học tập:
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <button
                        onClick={() => { sounds.playClick(); setWordPreviewOpen(true); }}
                        className="p-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all border border-white/20"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Xem trước Word</span>
                      </button>

                      <button
                        onClick={() => handleExportWord(createdExamPackage, activeVariantCode)}
                        className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all border border-white/20"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Xuất Word (.doc)</span>
                      </button>

                      <button
                        onClick={handleExportPrintPDF}
                        className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all border border-white/20"
                      >
                        <Download className="w-4 h-4" />
                        <span>In / Xuất PDF</span>
                      </button>

                      <button
                        onClick={() => handleExportFormsQuizizz('quizizz')}
                        className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all border border-white/20"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Google Form / Quizizz</span>
                      </button>

                      <button
                        onClick={handleSendToGames}
                        className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-fredoka font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:scale-102 active:scale-98 transition-all border border-white/30"
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span>🎮 Tạo Game</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </>
          ) : (
            /* COMPREHENSIVE AI OCR & DOCUMENT QUESTION GENERATION STUDIO */
            <AIOCRDocumentStudio 
              onAddQuestions={onAddQuestions} 
              defaultSubject={subject} 
              defaultGrade={grade} 
            />
          )}

        </div>

        {/* Right 1 Col: Quick templates & Ministry Guidance */}
        <div className="space-y-6">
          
          {/* Quick templates panel */}
          <div className="bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/25 p-5 shadow-2xl space-y-4 text-white text-left">
            <h3 className="font-fredoka text-base font-extrabold text-yellow-300 flex items-center gap-1.5 drop-shadow-md">
              💡 Gợi ý bài học mẫu chuẩn SGK
            </h3>
            <p className="text-[10px] text-indigo-100 font-medium leading-relaxed">
              Click chọn bài học mẫu để AI tự điền ma trận và chủ đề bài học:
            </p>

            <div className="space-y-3">
              {promptTemplates.map((tpl, i) => (
                <div
                  key={i}
                  onClick={() => handleApplyTemplate(tpl)}
                  className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 rounded-2xl cursor-pointer transition-all hover:scale-102 shadow-sm text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-fredoka text-xs font-extrabold text-white">
                      {tpl.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="font-sans text-[10px] font-bold text-indigo-100/70 line-clamp-2 mt-1">
                    {tpl.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ministry of Education Guidance Note */}
          <div className="bg-indigo-950/60 backdrop-blur-xl rounded-[32px] border border-yellow-400/30 p-5 shadow-xl text-white space-y-3 text-left">
            <div className="flex items-center gap-2 text-yellow-300 font-fredoka font-extrabold text-xs">
              <ShieldCheck className="w-4 h-4 text-yellow-300" />
              <span>Tiêu Chuẩn Đánh Giá Thông Tư 27</span>
            </div>
            <p className="text-[11px] text-indigo-100 leading-relaxed font-medium">
              Đề thi tạo bởi AI được rà soát theo 4 mức độ tư duy (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao), tự động sinh 4 mã đề hoán đổi chống quay quay đáp án và trích xuất file Word có khung ma trận chuẩn.
            </p>
          </div>

        </div>

      </div>

      {/* FLOATING CHATBOT LAUNCHER & WINDOW */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {chatOpen && (
          <div className="w-[320px] sm:w-[360px] h-[450px] bg-white rounded-[32px] border-4 border-yellow-300 shadow-2xl flex flex-col justify-between overflow-hidden mb-4 animate-float text-xs">
            
            {/* Chat header */}
            <div className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 p-4 border-b-2 border-yellow-200 flex items-center justify-between text-purple-950">
              <div className="flex items-center gap-2 text-left">
                <span className="text-3xl animate-bounce">🐝</span>
                <div>
                  <h4 className="font-fredoka text-sm font-extrabold leading-none">Trợ lý Ong Vàng</h4>
                  <span className="text-[9px] font-extrabold opacity-80">Hoạt động 24/7 • Tư vấn CTGDPT 2018 🌸</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setChatOpen(false);
                }}
                className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
              {messages.map((m) => {
                const isAI = m.sender === 'assistant';
                return (
                  <div 
                    key={m.id}
                    className={`flex items-start gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAI && (
                      <span className="text-xl shrink-0 select-none">🐝</span>
                    )}
                    <div className="max-w-[75%] space-y-1 text-left">
                      <div className={`p-3 rounded-2xl font-sans text-xs leading-relaxed shadow-sm
                        ${isAI 
                          ? 'bg-white border border-gray-100 text-gray-700' 
                          : 'bg-indigo-500 text-white font-semibold'
                        }
                      `}>
                        {m.text}
                      </div>
                      <span className="text-[9px] text-gray-400 font-semibold px-1 block">{m.timestamp}</span>
                    </div>
                  </div>
                );
              })}
              {chatLoading && (
                <div className="flex items-center gap-1.5 justify-start text-xs text-gray-400 font-bold p-1">
                  <span className="text-xl animate-spin">🐝</span>
                  <span>Ong vàng đang nhẩm đáp án...</span>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Chat input form */}
            <form 
              onSubmit={handleSendChat}
              className="p-3 border-t border-gray-100 flex items-center gap-2 bg-white"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Hỏi Ong Vàng tư vấn Ma trận đề thi..."
                className="flex-1 bg-gray-50 border-2 border-indigo-50 rounded-xl px-3 py-2 font-sans font-semibold text-xs outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center cursor-pointer disabled:opacity-40 transition-all shrink-0 shadow-md"
              >
                <Send className="w-4 h-4 fill-white" />
              </button>
            </form>

          </div>
        )}

        {/* Big Float Launcher Button */}
        <button
          onClick={() => {
            sounds.playLevelUp();
            setChatOpen(!chatOpen);
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-purple-950 flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer hover:scale-110 active:scale-90 transition-all animate-float relative"
        >
          <MessageSquare className="w-7 h-7" />
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase border-2 border-white shadow-md">
              CHAT 🐝
            </span>
          )}
        </button>

      </div>

      {/* WORD DOCUMENT LIVE PREVIEW MODAL */}
      {wordPreviewOpen && createdExamPackage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fade-in">
          <div className="bg-slate-900 border-2 border-yellow-400/80 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 rounded-xl shadow-md">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-fredoka text-base md:text-lg font-extrabold text-yellow-300">
                    Bản Xem Trước Văn Bản Word Chuẩn (.doc)
                  </h3>
                  <p className="text-xs text-blue-200">
                    {createdExamPackage.title} • {activeVariantCode}
                  </p>
                </div>
              </div>

              {/* Toolbar in Modal */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Variant selector */}
                <select
                  value={activeVariantCode}
                  onChange={(e) => setActiveVariantCode(e.target.value)}
                  className="bg-indigo-950 border border-white/30 text-yellow-300 font-bold text-xs rounded-xl px-2.5 py-1.5 cursor-pointer outline-none"
                >
                  {createdExamPackage.variants.map(v => (
                    <option key={v.code} value={v.code}>{v.code}</option>
                  ))}
                </select>

                {/* Include answers toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewIncludeAnswers(!previewIncludeAnswers)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    previewIncludeAnswers 
                      ? 'bg-amber-400 text-purple-950 border-white' 
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  {previewIncludeAnswers ? '✓ Kèm Đáp Án' : 'Chỉ Đề Thi'}
                </button>

                {/* Download Word button */}
                <button
                  type="button"
                  onClick={() => handleExportWord(createdExamPackage, activeVariantCode)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-fredoka font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-white/30"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Tải File .doc</span>
                </button>

                {/* Print button */}
                <button
                  type="button"
                  onClick={handleExportPrintPDF}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer border border-white/20"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In</span>
                </button>

                {/* Close modal */}
                <button
                  type="button"
                  onClick={() => setWordPreviewOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-red-600 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: A4 Paper Preview */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-800 flex justify-center">
              <div 
                className="w-full max-w-2xl bg-white text-black p-8 md:p-12 shadow-2xl rounded-lg font-serif text-[14px] leading-relaxed border border-gray-300"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {/* School Header */}
                <div className="flex justify-between items-start text-center text-xs font-bold uppercase mb-4 border-b pb-3 border-black">
                  <div>
                    {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? (
                      <>MINISTRY OF EDUCATION & TRAINING<br />PRIMARY ASSESSMENT COUNCIL</>
                    ) : (
                      <>BỘ GIÁO DỤC VÀ ĐÀO TẠO<br />TRƯỜNG TIỂU HỌC CHUẨN GDPT 2018</>
                    )}
                  </div>
                  <div>
                    {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? (
                      <>OFFICIAL EXAM ASSESSMENT<br />ACADEMIC YEAR 2025 - 2026</>
                    ) : (
                      <>ĐỀ KIỂM TRA ĐÁNH GIÁ CHUẨN<br />NĂM HỌC 2025 - 2026</>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="text-center font-bold text-lg uppercase my-3 text-blue-900">
                  {createdExamPackage.title} - {activeVariantCode}
                </div>

                {/* Meta details */}
                <div className="text-center italic text-xs mb-4 text-gray-700">
                  {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? (
                    <>Subject: <b>English</b> | Grade: <b>{createdExamPackage.grade}</b> | Series: <b>{createdExamPackage.bookSeries} ({createdExamPackage.edition})</b><br />Units: <b>{createdExamPackage.units && createdExamPackage.units.length > 0 ? createdExamPackage.units.join(', ') : 'Curriculum Units'}</b> | Time: <b>{createdExamPackage.analysis.estimatedTimeMinutes} mins</b></>
                  ) : (
                    <>Môn: <b>{createdExamPackage.subject}</b> | Lớp: <b>{createdExamPackage.grade}</b> | Sách: <b>{createdExamPackage.bookSeries} ({createdExamPackage.edition})</b><br />Chủ đề / Units: <b>{createdExamPackage.units && createdExamPackage.units.length > 0 ? createdExamPackage.units.join(', ') : 'Toàn bộ bài học'}</b> | Thời gian: <b>{createdExamPackage.analysis.estimatedTimeMinutes} phút</b></>
                  )}
                </div>

                {/* Student name box */}
                <div className="flex justify-between text-xs mb-4 border border-dashed border-gray-400 p-2 rounded">
                  <span>{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Student Full Name: ................................................................' : 'Họ và tên học sinh: ................................................................'}</span>
                  <span>{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Class: ..............' : 'Lớp: ..............'}</span>
                </div>

                {/* Cognitive Matrix */}
                <div className="bg-blue-50 border border-blue-600 p-3 rounded text-xs mb-5 text-gray-800">
                  <b>{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'COGNITIVE ASSESSMENT MATRIX (CIRCULAR 27):' : 'MA TRẬN ĐÁNH GIÁ MỨC ĐỘ TƯ DUY (THÔNG TƯ 27):'}</b><br />
                  • {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Recognition' : 'Nhận biết'}: {createdExamPackage.analysis.cognitiveMatrix.nhanBiet}% | {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Comprehension' : 'Thông hiểu'}: {createdExamPackage.analysis.cognitiveMatrix.thongHieu}% | {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Application' : 'Vận dụng'}: {createdExamPackage.analysis.cognitiveMatrix.vanDung}% | {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'High Application' : 'Vận dụng cao'}: {createdExamPackage.analysis.cognitiveMatrix.vanDungCao}%<br />
                  • {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Coverage' : 'Phạm vi kiến thức'}: {createdExamPackage.analysis.knowledgeCoverage}
                </div>

                {/* Questions Section */}
                <h4 className="font-bold text-sm uppercase mb-3 text-blue-900 border-b pb-1">
                  {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? `I. TEST QUESTIONS (${createdExamPackage.variants.find(v => v.code === activeVariantCode)?.questions.length || 0} Questions)` : `I. PHẦN CÂU HỎI (${createdExamPackage.variants.find(v => v.code === activeVariantCode)?.questions.length || 0} câu)`}
                </h4>

                <div className="space-y-4">
                  {createdExamPackage.variants
                    .find(v => v.code === activeVariantCode)
                    ?.questions.map((q, idx) => (
                      <div key={idx} className="space-y-1.5">
                        
                        {/* Reading Comprehension Passage */}
                        {q.passage && (
                          <div className="border-2 border-blue-500 bg-sky-50 p-3 rounded my-2 text-xs">
                            <div className="font-bold text-blue-900 mb-1">
                              📖 {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Read the following passage and answer the questions:' : 'Đọc đoạn văn sau và trả lời câu hỏi:'}
                            </div>
                            {q.passageTitle && <div className="font-bold text-center text-xs uppercase mb-1">{q.passageTitle}</div>}
                            <p className="italic text-gray-800 leading-relaxed whitespace-pre-wrap">{q.passage}</p>
                          </div>
                        )}

                        <div className="font-bold text-xs text-black">
                          {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? `Question ${idx + 1}` : `Câu ${idx + 1}`} [{q.cognitiveLevel || 'Thông hiểu'}]: <span className="font-normal">{q.text}</span>
                        </div>

                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 text-xs pl-4">
                            {q.options.map((opt, oi) => (
                              <div key={oi}>
                                <span className="font-bold">{String.fromCharCode(65 + oi)}.</span> {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* Answers Section if enabled */}
                {previewIncludeAnswers && (
                  <div className="mt-8 pt-6 border-t-2 border-black">
                    <h4 className="font-bold text-sm uppercase mb-3 text-blue-900">
                      {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? `II. ANSWER KEY & EXPLANATIONS (${activeVariantCode})` : `II. ĐÁP ÁN & HƯỚNG DẪN GIẢI CHI TIẾT (${activeVariantCode})`}
                    </h4>

                    {/* Table of answers */}
                    <table className="w-full border-collapse border border-black text-xs text-center mb-4">
                      <thead>
                        <tr className="bg-blue-900 text-white">
                          <th className="border border-black p-1">{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Question' : 'Câu'}</th>
                          <th className="border border-black p-1">{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Answer' : 'Đáp án'}</th>
                          <th className="border border-black p-1">{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Cognitive Level' : 'Mức độ'}</th>
                          <th className="border border-black p-1">{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Skill' : 'Kỹ năng'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {createdExamPackage.variants
                          .find(v => v.code === activeVariantCode)
                          ?.questions.map((q, idx) => (
                            <tr key={idx}>
                              <td className="border border-black p-1 font-bold">{idx + 1}</td>
                              <td className="border border-black p-1 font-black text-blue-900">{q.answer}</td>
                              <td className="border border-black p-1">{q.cognitiveLevel || 'Thông hiểu'}</td>
                              <td className="border border-black p-1">{q.skillCategory || 'Đọc hiểu'}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    {/* Explanations */}
                    <div className="space-y-2 text-xs">
                      {createdExamPackage.variants
                        .find(v => v.code === activeVariantCode)
                        ?.questions.map((q, idx) => (
                          <div key={idx} className="bg-gray-50 border-l-4 border-blue-600 p-2 rounded text-gray-800">
                            <b>{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? `Question ${idx + 1}` : `Câu ${idx + 1}`}:</b> {createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Answer:' : 'Đáp án:'} <b>{q.answer}</b><br />
                            💡 <i>{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Explanation:' : 'Giải thích:'}</i> {q.explanation || 'Đáp án theo SGK chuẩn.'}<br />
                            ✔ <i>{createdExamPackage.language === 'en' || createdExamPackage.subject === 'Tiếng Anh' ? 'Reference:' : 'Nguồn tham chiếu:'}</i> {q.relatedKnowledge || createdExamPackage.bookSeries}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 text-right border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setWordPreviewOpen(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Đóng bản xem trước
              </button>
              <button
                type="button"
                onClick={() => handleExportWord(createdExamPackage, activeVariantCode)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <FileDown className="w-4 h-4" />
                <span>Tải File Word Ngay</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
