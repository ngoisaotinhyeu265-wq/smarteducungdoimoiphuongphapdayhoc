import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Layers, 
  GraduationCap, 
  FileText, 
  Compass, 
  Headphones, 
  Tv, 
  ArrowRight,
  Filter,
  Copy,
  Check
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export interface HocLieuLessonItem {
  id: string;
  subject: string;
  grade: string;
  bookSeries: string;
  unit: string;
  lessonName: string;
  title?: string;
  week?: string;
  pageRange: string;
  activities: string[];
  audioTracks?: string[];
  digitalTools: string[];
  keyVocab?: string[];
  keyVocabulary?: string[];
  keyPatterns?: string[];
  sentencePatterns?: string[];
  sampleTeacherNotes?: string;
  lessonPlanOverview?: string;
  hocLieuUrl: string;
}

export const HOC_LIEU_DATABASE: HocLieuLessonItem[] = [
  // --- TIẾNG ANH GLOBAL SUCCESS LỚP 3 ---
  {
    id: 'hl_eng3_starter',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Starter: Welcome',
    lessonName: 'Starter: Welcome (Lesson 1 - 3)',
    pageRange: 'Trang 6 - 9',
    activities: [
      '1. The Alphabet Song & Phonics sound check',
      '2. Numbers 1 to 10: Count and say',
      '3. Age questions: How old are you? - I\'m [eight] years old.',
      '4. Classroom Instructions: Stand up, Sit down, Open your book, Close your book',
      '5. Fun Game: Simon Says & Number Bingo'
    ],
    audioTracks: ['Track 01 (Alphabet Song)', 'Track 02 (Numbers 1-10)', 'Track 03 (Classroom rules)'],
    digitalTools: ['hoclieu.vn Flashcards số', 'Trò chơi tương tác Bấm chọn số', 'Slide bài giảng điện tử'],
    keyVocab: ['alphabet A-Z', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'stand up', 'sit down', 'open your book', 'close your book'],
    keyPatterns: ['Hello, I\'m [Name].', 'How old are you? - I\'m [eight] years old.', 'Stand up, please.'],
    sampleTeacherNotes: 'Khởi động bài học bằng bài hát Alphabet Song. Dạy kỹ khẩu lệnh lớp học để học sinh làm quen với Classroom English.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=english'
  },
  {
    id: 'hl_eng3_u1_l1',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Unit 1: Hello',
    lessonName: 'Lesson 1 (Greetings & Introductions - Tiết 1: Act 1, 2, 3)',
    pageRange: 'Trang 10 - 11',
    activities: [
      '1. Look, listen and repeat (Tranh a, b: Ben - Mai, Minh - Lucy)',
      '2. Listen, point and say (Luyện tập cấu trúc Hello / Hi, I\'m...)',
      '3. Let\'s talk (Thực hành giao tiếp chào và giới thiệu tên theo cặp)'
    ],
    audioTracks: ['Track 04 (Look, listen and repeat)', 'Track 05 (Point and say)'],
    digitalTools: ['hoclieu.vn Audio tương tác', 'Trò chơi Nối tranh nhân vật', 'Tranh điện tử tương tác'],
    keyVocab: ['hello', 'hi', 'I', 'am', 'Ben', 'Mai', 'Minh', 'Lucy'],
    keyPatterns: ['Hello. I\'m Ben.', 'Hi, Ben. I\'m Mai.'],
    sampleTeacherNotes: 'Hướng dẫn HS phân biệt Hello (trang trọng/lịch sự) và Hi (thân mật giữa bạn bè).',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=english'
  },
  {
    id: 'hl_eng3_u1_l2',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Unit 1: Hello',
    lessonName: 'Lesson 2 (Health Inquiries - Tiết 2: Act 4, 5, 6)',
    pageRange: 'Trang 12 - 13',
    activities: [
      '4. Listen and tick (Nghe và đánh dấu chọn tranh đúng)',
      '5. Look, complete and read (Điền từ còn thiếu vào chỗ trống)',
      '6. Let\'s play: Slap the board / Chain game'
    ],
    audioTracks: ['Track 06 (Listen and tick)', 'Track 07 (Chant)'],
    digitalTools: ['hoclieu.vn Bài tập trắc nghiệm tự chấm', 'Bảng tương tác Kéo thả từ'],
    keyVocab: ['how', 'fine', 'thank you', 'thanks', 'goodbye', 'bye', 'Mr Loc', 'Miss Hien'],
    keyPatterns: ['How are you? - I\'m fine, thank you. / Fine, thanks. And you?', 'Goodbye, Miss Hien.'],
    sampleTeacherNotes: 'Học sinh luyện tập hỏi thăm sức khỏe và cảm ơn, chào tạm biệt thầy cô và bạn bè.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=english'
  },
  {
    id: 'hl_eng3_u2_l1',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Unit 2: Our Names',
    lessonName: 'Lesson 1 (Asking Names - Act 1, 2, 3)',
    pageRange: 'Trang 16 - 17',
    activities: [
      '1. Look, listen and repeat (Hỏi và trả lời tên)',
      '2. Listen, point and say (Thực hành với các nhân vật: Nam, Linh, Peter, Mary)',
      '3. Let\'s talk (Hỏi tên bạn trong lớp)'
    ],
    audioTracks: ['Track 10 (Dialogues)', 'Track 11 (Point and say)'],
    digitalTools: ['hoclieu.vn Vòng quay tên gọi', 'Flashcards nhân vật điện tử'],
    keyVocab: ['name', 'what', 'your', 'my', 'is', 'Nam', 'Linh', 'Peter', 'Mary'],
    keyPatterns: ['What\'s your name? - My name\'s [Name].'],
    sampleTeacherNotes: 'Nhấn mạnh dạng viết tắt What\'s = What is, Name\'s = Name is.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=english'
  },
  {
    id: 'hl_eng3_u3_l1',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Unit 3: Our Friends',
    lessonName: 'Lesson 1 (Introducing Friends - Act 1, 2, 3)',
    pageRange: 'Trang 22 - 23',
    activities: [
      '1. Look, listen and repeat (Giới thiệu bạn This is...)',
      '2. Listen, point and say (Luyện tập giới thiệu bạn thân)',
      '3. Let\'s talk (Giới thiệu bạn cùng bàn với cả lớp)'
    ],
    audioTracks: ['Track 16', 'Track 17'],
    digitalTools: ['hoclieu.vn Video tình huống', 'Bài tập kéo thả ghép đôi'],
    keyVocab: ['this', 'that', 'friend', 'teacher', 'classmate', 'yes', 'no'],
    keyPatterns: ['This is [Name]. - Hello, [Name].', 'Is that [Name]? - Yes, it is. / No, it isn\'t.'],
    sampleTeacherNotes: 'Sử dụng kỹ thuật chỉ trỏ (cận cảnh: This is; khoảng cách xa: That is).',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=english'
  },

  // --- TIẾNG ANH GLOBAL SUCCESS LỚP 4 ---
  {
    id: 'hl_eng4_starter',
    subject: 'Tiếng Anh',
    grade: 'Lớp 4',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Starter: Welcome',
    lessonName: 'Starter: Welcome (Lesson 1 - 3)',
    pageRange: 'Trang 6 - 9',
    activities: [
      '1. Review characters: Nam, Mai, Phong, Linda, Tony, Tom',
      '2. Alphabet spelling & Numbers 1 - 100',
      '3. Classroom Commands & Pair work instructions: Work in pairs, Ask a question',
      '4. Game: Word Search & Lucky Numbers'
    ],
    audioTracks: ['Track 01 (Welcome Song)', 'Track 02 (Numbers 1-100)'],
    digitalTools: ['hoclieu.vn Trắc nghiệm số đếm', 'Flashcard nhân vật Lớp 4'],
    keyVocab: ['welcome', 'again', 'numbers 1-100', 'spelling', 'work in pairs', 'ask a question'],
    keyPatterns: ['Welcome back to Grade 4!', 'Nice to see you again!', 'How do you spell your name? - [Letters].'],
    sampleTeacherNotes: 'Tạo không khí hào hứng đón năm học mới, củng cố đếm số từ 20 đến 100.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=4&subject=english'
  },
  {
    id: 'hl_eng4_u1_l1',
    subject: 'Tiếng Anh',
    grade: 'Lớp 4',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Unit 1: My Friends',
    lessonName: 'Lesson 1 (Countries & Nationalities - Act 1, 2, 3)',
    pageRange: 'Trang 10 - 11',
    activities: [
      '1. Look, listen and repeat (Where are you from?)',
      '2. Listen, point and say (America, Australia, Britain, Japan, Malaysia, Singapore, Vietnam)',
      '3. Let\'s talk (Hỏi và đáp về quê hương, quốc gia)'
    ],
    audioTracks: ['Track 03 (Dialogue countries)', 'Track 04 (Point and say)'],
    digitalTools: ['hoclieu.vn Bản đồ thế giới tương tác', 'Game Ghép cờ quốc gia'],
    keyVocab: ['America', 'Australia', 'Britain', 'Japan', 'Malaysia', 'Singapore', 'Vietnam'],
    keyPatterns: ['Where are you from? - I\'m from Vietnam.', 'Where is he/she from? - He\'s/She\'s from Japan.'],
    sampleTeacherNotes: 'Dùng bản đồ hoặc quả địa cầu trực quan để học sinh chỉ vị trí các quốc gia.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=4&subject=english'
  },

  // --- TIẾNG ANH GLOBAL SUCCESS LỚP 5 ---
  {
    id: 'hl_eng5_starter',
    subject: 'Tiếng Anh',
    grade: 'Lớp 5',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Starter: Welcome',
    lessonName: 'Starter: Welcome (Lesson 1 - 3)',
    pageRange: 'Trang 6 - 9',
    activities: [
      '1. Welcome back & Summer Holiday Review',
      '2. Calendar, Schedule & Daily Routines Revision',
      '3. Classroom English for Grade 5 & Cooperative Project Rules'
    ],
    audioTracks: ['Track 01 (Welcome to Grade 5)', 'Track 02 (Summer Stories)'],
    digitalTools: ['hoclieu.vn Dự án nhóm tương tác', 'Trắc nghiệm tổng hợp'],
    keyVocab: ['welcome back', 'Grade 5', 'summer holiday', 'classmate', 'calendar', 'schedule', 'project'],
    keyPatterns: ['Welcome back to Grade 5!', 'What did you do during your summer holiday?', 'Let\'s work together on our project.'],
    sampleTeacherNotes: 'Cho học sinh chia sẻ trải nghiệm mùa hè bằng các câu đơn giản trước khi vào bài mới.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=5&subject=english'
  },
  {
    id: 'hl_eng5_u1_l1',
    subject: 'Tiếng Anh',
    grade: 'Lớp 5',
    bookSeries: 'Global Success (NXBGDVN)',
    unit: 'Unit 1: All About Me',
    lessonName: 'Lesson 1 (Addresses & Hometowns - Act 1, 2, 3)',
    pageRange: 'Trang 10 - 11',
    activities: [
      '1. Look, listen and repeat (What\'s your address?)',
      '2. Listen, point and say (Lane, street, avenue, tower, floor, flat)',
      '3. Let\'s talk (Hỏi và trả lời về địa chỉ nhà của mình)'
    ],
    audioTracks: ['Track 03', 'Track 04'],
    digitalTools: ['hoclieu.vn Mô hình thành phố 3D', 'Bài tập kéo ghép địa chỉ'],
    keyVocab: ['address', 'lane', 'street', 'avenue', 'tower', 'floor', 'flat', 'hometown', 'busy', 'quiet'],
    keyPatterns: ['What\'s your address? - It\'s 81 Tran Hung Dao Street.', 'What\'s the city like? - It\'s big and busy.'],
    sampleTeacherNotes: 'Luyện phát âm đuôi các từ vựng chỉ địa chỉ: street, flat, avenue.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=5&subject=english'
  },

  // --- MÔN TOÁN & TIẾNG VIỆT (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG) ---
  {
    id: 'hl_math3_w1',
    subject: 'Toán',
    grade: 'Lớp 3',
    bookSeries: 'Kết nối tri thức với cuộc sống (NXBGDVN)',
    unit: 'Chủ đề 1: Bảng nhân, bảng chia',
    lessonName: 'Bài 1: Ôn tập các số đến 1000 (Tiết 1)',
    pageRange: 'Trang 6 - 8',
    activities: [
      '1. Khởi động: Trò chơi "Bắn tên toán học" đếm thêm 10, 100',
      '2. Khám phá: Đọc, viết và phân tích cấu tạo số có 3 chữ số',
      '3. Luyện tập: Bài tập 1 (Bảng con), Bài tập 2 (Vở), Bài tập 3 (Nhóm đôi)',
      '4. Vận dụng: Trò chơi "Ai nhanh ai đúng" tìm số nhà'
    ],
    digitalTools: ['hoclieu.vn Bộ que tính và khối lập phương ảo', 'Bài tập trắc nghiệm số học'],
    keyVocab: ['trăm', 'chục', 'đơn vị', 'số liền trước', 'số liền sau', 'so sánh số'],
    keyPatterns: ['Số gồm [3] trăm, [5] chục và [2] đơn vị viết là 352.'],
    sampleTeacherNotes: 'Sử dụng đồ dùng trực quan tia số và bảng trăm chục đơn vị để học sinh thao tác.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=math'
  },
  {
    id: 'hl_tv3_w1',
    subject: 'Tiếng Việt',
    grade: 'Lớp 3',
    bookSeries: 'Kết nối tri thức với cuộc sống (NXBGDVN)',
    unit: 'Chủ điểm 1: Những búp măng non',
    lessonName: 'Bài 1: Ngày gặp lại (Tiết 1: Đọc)',
    pageRange: 'Trang 10 - 12',
    activities: [
      '1. Khởi động: Hát bài "Mùa khai trường" và chia sẻ cảm xúc ngày tựu trường',
      '2. Khám phá (Luyện đọc thành tiếng): Đọc mẫu của GV, đọc nối tiếp câu, luyện phát âm từ khó',
      '3. Luyện đọc hiểu: Trả lời câu hỏi 1, 2, 3 trong SGK trang 11; rút ra nội dung bài đọc',
      '4. Luyện tập & Vận dụng: Luyện đọc diễn cảm đoạn yêu thích, nói lời chào bạn bè'
    ],
    digitalTools: ['hoclieu.vn Tranh minh họa động', 'Bản ghi âm giọng đọc chuẩn NXBGDVN'],
    keyVocab: ['rộn ràng', 'náo nức', 'bỡ ngỡ', 'tựu trường', 'bạn bè', 'thầy cô'],
    keyPatterns: ['Đoạn văn miêu tả tâm trạng náo nức, vui tươi của các bạn nhỏ khi gặp lại nhau sau kỳ nghỉ hè.'],
    sampleTeacherNotes: 'Khuyến khích học sinh thể hiện cảm xúc chân thực, giọng đọc trong sáng, vui tươi.',
    hocLieuUrl: 'https://hoclieu.vn/kho-hoc-lieu?grade=3&subject=vietnamese'
  }
];

export type HocLieuLessonEntry = HocLieuLessonItem;

interface HocLieuReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialGrade?: string;
  initialBook?: string;
  currentSubject?: string;
  currentGrade?: string;
  onApplyToLessonPlan?: (item: HocLieuLessonItem) => void;
  onApplyLesson?: (item: HocLieuLessonItem) => void;
}

export default function HocLieuReferenceModal({
  isOpen,
  onClose,
  initialSubject,
  initialGrade,
  initialBook,
  currentSubject,
  currentGrade,
  onApplyToLessonPlan,
  onApplyLesson
}: HocLieuReferenceModalProps) {
  const defaultSub = initialSubject || currentSubject || 'Tất cả';
  const defaultGrd = initialGrade || currentGrade || 'Tất cả';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>(defaultSub);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>(defaultGrd);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleApply = (item: HocLieuLessonItem) => {
    sounds.playSuccess();
    if (onApplyToLessonPlan) {
      onApplyToLessonPlan(item);
    } else if (onApplyLesson) {
      onApplyLesson(item);
    }
    onClose();
  };

  if (!isOpen) return null;

  const filteredItems = HOC_LIEU_DATABASE.filter(item => {
    const matchSubject = selectedSubjectFilter === 'Tất cả' || item.subject === selectedSubjectFilter;
    const matchGrade = selectedGradeFilter === 'Tất cả' || item.grade === selectedGradeFilter;
    const matchSearch = searchQuery === '' || 
      item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lessonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.activities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.keyVocab || []).some(v => v.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.pageRange.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchGrade && matchSearch;
  });

  const handleCopy = (item: HocLieuLessonItem) => {
    sounds.playCoin();
    const vocabStr = (item.keyVocab || []).join(', ');
    const patternStr = (item.keyPatterns || []).join('; ');
    const text = `[HocLieu.vn - ${item.subject} ${item.grade}]\nBài: ${item.lessonName}\nUnit: ${item.unit}\nTrang SGK: ${item.pageRange}\nHoạt động:\n${item.activities.map(a => `- ${a}`).join('\n')}\nTừ vựng: ${vocabStr}\nMẫu câu: ${patternStr}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-indigo-950/85 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
              <BookOpen className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-fredoka text-xl sm:text-2xl font-bold tracking-wide">
                  Kho Học Liệu Số Quốc Gia 📚
                </h2>
                <span className="bg-sky-400/30 text-sky-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-sky-300/40">
                  hoclieu.vn
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium mt-0.5">
                Tra cứu chuẩn SGK, phân phối bài học, trang sách và học liệu tương tác NXB Giáo dục Việt Nam
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://hoclieu.vn/kho-hoc-lieu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-sky-50 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-indigo-600" />
              <span>Mở hoclieu.vn/kho-hoc-lieu</span>
            </a>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Unit, bài học, trang SGK, hoạt động..."
                className="pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 w-56 sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>

            {/* Subject Filter */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl px-2 py-1 text-xs shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="bg-transparent font-bold text-slate-700 text-xs focus:outline-none cursor-pointer"
              >
                <option value="Tất cả">Tất cả môn</option>
                <option value="Tiếng Anh">Tiếng Anh (Global Success)</option>
                <option value="Toán">Toán (Kết nối tri thức)</option>
                <option value="Tiếng Việt">Tiếng Việt (Kết nối tri thức)</option>
              </select>
            </div>

            {/* Grade Filter */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl px-2 py-1 text-xs shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedGradeFilter}
                onChange={(e) => setSelectedGradeFilter(e.target.value)}
                className="bg-transparent font-bold text-slate-700 text-xs focus:outline-none cursor-pointer"
              >
                <option value="Tất cả">Tất cả khối lớp</option>
                <option value="Lớp 1">Lớp 1</option>
                <option value="Lớp 2">Lớp 2</option>
                <option value="Lớp 3">Lớp 3</option>
                <option value="Lớp 4">Lớp 4</option>
                <option value="Lớp 5">Lớp 5</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <span>Tìm thấy:</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-[11px] font-extrabold">
              {filteredItems.length} bài học chuẩn
            </span>
          </div>
        </div>

        {/* Lesson List Display */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-100/60">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
              <Compass className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-fredoka text-base font-bold text-slate-600">
                Không tìm thấy bài học phù hợp với bộ lọc tìm kiếm
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Thầy cô có thể mở trực tiếp trang web chính thức hoclieu.vn để tra cứu toàn bộ kho học liệu điện tử phong phú nhé!
              </p>
              <a
                href="https://hoclieu.vn/kho-hoc-lieu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md cursor-pointer mt-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở hoclieu.vn/kho-hoc-lieu</span>
              </a>
            </div>
          ) : (
            filteredItems.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 space-y-3 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>

                {/* Card Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 pl-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {item.subject} - {item.grade}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {item.bookSeries}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {item.pageRange}
                      </span>
                    </div>

                    <h3 className="font-fredoka text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.lessonName}
                    </h3>
                    <p className="text-xs text-indigo-700 font-semibold">
                      Chủ điểm / Unit: {item.unit}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                      title="Sao chép nội dung"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                      <span className="hidden sm:inline">{copiedId === item.id ? 'Đã chép' : 'Sao chép'}</span>
                    </button>

                    <button
                      onClick={() => handleApply(item)}
                      className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Áp Dụng Vào Bài Soạn</span>
                    </button>
                  </div>
                </div>

                {/* Activities Breakdown */}
                <div className="pl-2 space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h4 className="font-fredoka text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Danh sách Hoạt động học tập chuẩn (Activity Scope):</span>
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {item.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-medium leading-tight">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vocabulary & Patterns */}
                <div className="pl-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-amber-50/60 border border-amber-200/70 p-2.5 rounded-xl space-y-1">
                    <p className="font-bold text-amber-950 flex items-center gap-1 text-[11px]">
                      <span>📝 Từ vựng trọng tâm:</span>
                    </p>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {item.keyVocab.join(', ')}
                    </p>
                  </div>

                  <div className="bg-sky-50/60 border border-sky-200/70 p-2.5 rounded-xl space-y-1">
                    <p className="font-bold text-sky-950 flex items-center gap-1 text-[11px]">
                      <span>💬 Mẫu câu giao tiếp:</span>
                    </p>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {item.keyPatterns.join('; ')}
                    </p>
                  </div>
                </div>

                {/* Digital Tools & Audio info */}
                <div className="pl-2 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  <div className="flex flex-wrap items-center gap-3">
                    {item.audioTracks && item.audioTracks.length > 0 && (
                      <span className="flex items-center gap-1 text-slate-600 font-semibold">
                        <Headphones className="w-3 h-3 text-indigo-500" />
                        <span>{item.audioTracks.join(', ')}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-slate-600 font-semibold">
                      <Tv className="w-3 h-3 text-emerald-500" />
                      <span>{item.digitalTools.join(' • ')}</span>
                    </span>
                  </div>

                  <a
                    href={item.hocLieuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Xem trực tiếp trên hoclieu.vn</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Hệ thống dữ liệu số đồng bộ với Sách Giáo Khoa & Kho Học Liệu NXBGDVN</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://hoclieu.vn/kho-hoc-lieu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-800 rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              <span>Truy cập hoclieu.vn/kho-hoc-lieu</span>
            </a>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
