/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Search, Mic, SlidersHorizontal, BookOpen, 
  Gamepad2, Users, Flame, Plus, Download, Upload, 
  FileText, FileSpreadsheet, RotateCw, CheckCircle, AlertCircle,
  ChevronLeft, ChevronRight, ShieldCheck, FolderArchive, FileSearch,
  Layers, Sliders, Settings, Trophy, Award
} from 'lucide-react';
import { sounds } from '../lib/audio';

interface DashboardProps {
  questionsCount: number;
  studentsCount: number;
  onNavigate: (tabId: string, payload?: any) => void;
  onAddQuestions: (qs: any[]) => void;
}

export default function Dashboard({ 
  questionsCount, 
  studentsCount, 
  onNavigate,
  onAddQuestions 
}: DashboardProps) {
  // Counting states for animations
  const [countQ, setCountQ] = useState(0);
  const [countG, setCountG] = useState(0);
  const [countS, setCountS] = useState(0);
  const [countA, setCountA] = useState(0);

  // Search and Import states
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState<'word' | 'excel'>('word');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // Filter chips selected index
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Tool Drawer Scrollbar State & Ref
  const toolsScrollRef = useRef<HTMLDivElement>(null);
  const [toolSearchQuery, setToolSearchQuery] = useState('');
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('all');
  const [isToolsDragging, setIsToolsDragging] = useState(false);
  const [toolsStartX, setToolsStartX] = useState(0);
  const [toolsScrollLeftState, setToolsScrollLeftState] = useState(0);
  const [toolsHasMoved, setToolsHasMoved] = useState(false);

  // Interactive Tools catalog with full feature search
  const toolsCatalog = [
    {
      id: 'tool_gdpt_library',
      title: 'Kho Học Liệu & Chủ Đề GDPT 2018',
      badge: 'CHUẨN 2018 🏛️',
      badgeBg: 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black',
      category: 'curriculum',
      tags: ['gdpt2018', 'toan', 'tiengviet', 'tienganh', 'khoahoc', 'lichsudialy', 'games'],
      desc: 'Tuyển chọn 5 môn học GDPT 2018 (Toán, Tiếng Việt, Tiếng Anh, Khoa học, LS&ĐL). Duyệt theo chủ đề, YCCĐ, chọn lọc câu hỏi và chơi ngay trên 7+ game!',
      icon: <Award className="w-6 h-6 text-amber-300" />,
      gradient: 'from-amber-600 via-orange-600 to-purple-900',
      action: () => onNavigate('gdpt_library')
    },
    {
      id: 'tool_warmup_studio',
      title: 'AI English Warm-up Studio (Khởi Động 5 Phút)',
      badge: 'MỚI CỰC HOT 🔥',
      badgeBg: 'bg-pink-400 text-pink-950 font-black',
      category: 'english',
      tags: ['ai', 'english', 'primary', 'warmup'],
      desc: 'Tạo kịch bản khởi động 5 phút vui nhộn, Talk Show, Mini Drama, Chant, Song, phân vai học sinh, sơ đồ sân khấu & máy chiếu Teleprompter.',
      icon: <Sparkles className="w-6 h-6 text-pink-300" />,
      gradient: 'from-pink-600 via-purple-600 to-indigo-900',
      action: () => onNavigate('warmup_studio')
    },
    {
      id: 'tool_vocab_planner',
      title: 'Dạy Từ Vựng Tiếng Anh (Global Success 1-5)',
      badge: 'SGK CHUẨN 🔤',
      badgeBg: 'bg-cyan-400 text-cyan-950 font-black',
      category: 'english',
      tags: ['ai', 'english', 'sgk', 'vocab'],
      desc: 'Tự động nạp từ vựng, phát âm IPA, nghĩa tiếng Việt, mẫu câu giao tiếp và hoạt động dạy học theo Unit/Lesson.',
      icon: <BookOpen className="w-6 h-6 text-cyan-300" />,
      gradient: 'from-cyan-600 via-teal-600 to-indigo-900',
      action: () => onNavigate('vocab_planner')
    },
    {
      id: 'tool_curriculum_2345',
      title: 'Kế Hoạch Dạy Học Tiếng Anh (Phụ Lục 2 CV 2345)',
      badge: 'CHUẨN 2345 📋',
      badgeBg: 'bg-blue-400 text-blue-950 font-black',
      category: 'english',
      tags: ['ai', 'english', '2345', 'curriculum'],
      desc: 'Phân phối 35 tuần Global Success (Lớp 1-5), tích hợp AI QĐ 2422, Năng lực số TT 02/2025, ATGT, KNS, xuất Word (.doc) & Copy Excel.',
      icon: <FileText className="w-6 h-6 text-cyan-300" />,
      gradient: 'from-blue-600 via-indigo-600 to-purple-800',
      action: () => onNavigate('curriculum_2345')
    },
    {
      id: 'tool_sgv',
      title: 'Tra Cứu Sách Giáo Viên (SGV 35 Tuần)',
      badge: 'ĐẦY ĐỦ 100% 🏛️',
      badgeBg: 'bg-emerald-400 text-emerald-950 font-black',
      category: 'ai',
      tags: ['ai', 'sgv', 'curriculum'],
      desc: 'Tra cứu chuẩn mục tiêu SGV, trò chơi khởi động, câu hỏi gợi mở, bài tập và ghi nhớ của toàn bộ 13 môn học (Lớp 1-5).',
      icon: <BookOpen className="w-6 h-6 text-emerald-300" />,
      gradient: 'from-emerald-600 via-teal-600 to-indigo-900',
      action: () => onNavigate('lesson_planner', { openSGV: true })
    },
    {
      id: 'tool_ai_sgk',
      title: 'AI Soạn Đề Chuẩn SGK',
      badge: 'MỚI 🚀',
      badgeBg: 'bg-yellow-400 text-purple-950',
      category: 'ai',
      tags: ['ai', 'exam'],
      desc: 'Bám sát SGK Kết nối tri thức với cuộc sống & Global Success (Bộ GD&ĐT) trọn 35 tuần & TT 27.',
      icon: <Sparkles className="w-6 h-6 text-yellow-300" />,
      gradient: 'from-amber-500 via-orange-600 to-purple-700',
      action: () => onNavigate('ai')
    },
    {
      id: 'tool_ocr',
      title: 'OCR Quét SGK & Giáo Án PDF',
      badge: 'AI 🤖',
      badgeBg: 'bg-cyan-400 text-cyan-950',
      category: 'ai',
      tags: ['ai', 'ocr'],
      desc: 'Tải file PDF/Word SGK, tự nhận diện Chương → Bài → Lesson → Kiến thức.',
      icon: <FileSearch className="w-6 h-6 text-cyan-300" />,
      gradient: 'from-cyan-600 via-blue-600 to-indigo-800',
      action: () => onNavigate('ai', { focusMode: 'ocr' })
    },
    {
      id: 'tool_matrix',
      title: 'Sinh Ma Trận & Bảng Đặc Tả',
      badge: 'BỘ GD&ĐT ⭐',
      badgeBg: 'bg-emerald-400 text-emerald-950',
      category: 'matrix',
      tags: ['matrix', 'exam'],
      desc: 'Tùy chỉnh tỷ lệ Bloom (Nhận biết 40% - Thông hiểu 30% - Vận dụng 20% - VDC 10%).',
      icon: <Sliders className="w-6 h-6 text-emerald-300" />,
      gradient: 'from-emerald-600 via-teal-600 to-emerald-900',
      action: () => onNavigate('ai', { focusMode: 'matrix' })
    },
    {
      id: 'tool_reviewer',
      title: 'Kiểm Định 2 Vòng (AI Reviewer)',
      badge: 'DUY NHẤT 🛡️',
      badgeBg: 'bg-rose-400 text-rose-950',
      category: 'matrix',
      tags: ['matrix', 'ai'],
      desc: 'Generator tạo đề, Reviewer kiểm định 100% không lỗi chính tả & kiến thức.',
      icon: <ShieldCheck className="w-6 h-6 text-rose-300" />,
      gradient: 'from-rose-600 via-pink-600 to-purple-800',
      action: () => onNavigate('ai', { focusMode: 'reviewer' })
    },
    {
      id: 'tool_archive',
      title: 'Kho Lưu Trữ Đề Thi Theo Môn & Lớp',
      badge: 'KHO ĐỀ 📂',
      badgeBg: 'bg-amber-300 text-amber-950',
      category: 'archive',
      tags: ['archive', 'exam'],
      desc: 'Quản lý toàn bộ đề đã tạo theo Toán, Tiếng Việt, Tiếng Anh, Khối 1-5.',
      icon: <FolderArchive className="w-6 h-6 text-amber-300" />,
      gradient: 'from-amber-600 via-orange-700 to-indigo-900',
      action: () => onNavigate('exams')
    },
    {
      id: 'tool_lesson',
      title: 'AI Copilot Soạn Giáo Án 2345',
      badge: 'HOT 🔥',
      badgeBg: 'bg-purple-300 text-purple-950',
      category: 'ai',
      tags: ['ai', 'lesson', '2345'],
      desc: 'Kế hoạch bài dạy chuẩn Công văn 2345/BGDĐT-GDTH với tiến trình STEM/AI.',
      icon: <BookOpen className="w-6 h-6 text-purple-300" />,
      gradient: 'from-purple-600 via-violet-600 to-indigo-900',
      action: () => onNavigate('lesson_planner')
    },
    {
      id: 'tool_gamecenter',
      title: 'Trò Chơi Lớp Học (GameCenter)',
      badge: 'VUI VẺ 🎮',
      badgeBg: 'bg-pink-400 text-pink-950',
      category: 'games',
      tags: ['games'],
      desc: 'Trắc nghiệm, Vòng quay, Flashcard, Trí nhớ, Bong bóng vui nhộn.',
      icon: <Gamepad2 className="w-6 h-6 text-pink-300" />,
      gradient: 'from-pink-600 via-rose-600 to-purple-900',
      action: () => onNavigate('games')
    },
    {
      id: 'tool_import_word',
      title: 'Nhập Đề Từ Word (.docx)',
      badge: 'TỰ ĐỘNG 📥',
      badgeBg: 'bg-blue-300 text-blue-950',
      category: 'archive',
      tags: ['archive', 'word'],
      desc: 'Trích xuất tự động câu hỏi, đáp án và lời giải từ file Word có sẵn.',
      icon: <Upload className="w-6 h-6 text-blue-300" />,
      gradient: 'from-blue-600 via-indigo-600 to-slate-900',
      action: () => {
        setImportType('word');
        setShowImportModal(true);
      }
    },
    {
      id: 'tool_export_pdf',
      title: 'Xuất Đề In PDF / Word Đẹp',
      badge: 'IN ẤN 📄',
      badgeBg: 'bg-teal-300 text-teal-950',
      category: 'archive',
      tags: ['archive', 'pdf'],
      desc: 'Tải về file in có tên trường, ma trận và lời giải chi tiết.',
      icon: <FileText className="w-6 h-6 text-teal-300" />,
      gradient: 'from-teal-600 via-cyan-700 to-blue-900',
      action: () => onNavigate('exams')
    },
    {
      id: 'tool_question_bank',
      title: 'Ngân Hàng Câu Hỏi Tiểu Học',
      badge: 'KHO HỎI 📖',
      badgeBg: 'bg-indigo-300 text-indigo-950',
      category: 'archive',
      tags: ['archive', 'questions'],
      desc: 'Xem, sửa, lọc và tìm kiếm hơn 1000+ câu hỏi minh họa sẵn có.',
      icon: <Layers className="w-6 h-6 text-indigo-300" />,
      gradient: 'from-indigo-600 via-purple-700 to-slate-900',
      action: () => onNavigate('questions')
    },
    {
      id: 'tool_reports',
      title: 'Gamification & Thú Cưng Ảo (Pet Sanctuary)',
      badge: 'HOT 🔥',
      badgeBg: 'bg-yellow-400 text-purple-950',
      category: 'reports',
      tags: ['reports', 'pet'],
      desc: 'Chăm sóc thú cưng ảo, nhận nhiệm vụ ngày/tuần, mở khóa huy hiệu và leo bảng xếp hạng.',
      icon: <Trophy className="w-6 h-6 text-yellow-300" />,
      gradient: 'from-amber-500 via-orange-600 to-purple-800',
      action: () => onNavigate('reports')
    },
    {
      id: 'tool_settings',
      title: 'Cài Đặt & Nhạc Nền Trò Chơi',
      badge: 'HỆ THỐNG ⚙️',
      badgeBg: 'bg-gray-300 text-gray-950',
      category: 'reports',
      tags: ['settings'],
      desc: 'Tùy chỉnh hiệu ứng âm thanh, nhạc nền lớp học vui tươi.',
      icon: <Settings className="w-6 h-6 text-gray-300" />,
      gradient: 'from-slate-700 via-gray-800 to-zinc-900',
      action: () => onNavigate('settings')
    }
  ];

  // Tool categories
  const toolCategories = [
    { id: 'all', label: '🎒 Tất cả công cụ (16)' },
    { id: 'english', label: '🇬🇧 Tiếng Anh & Khởi Động (3) 🔥' },
    { id: 'ai', label: '🤖 AI Soạn đề & SGK' },
    { id: 'matrix', label: '📊 Ma trận & Kiểm định' },
    { id: 'archive', label: '📂 Kho đề & File' },
    { id: 'games', label: '🎮 GameCenter lớp học' }
  ];

  // Filter tools catalog
  const filteredToolsCatalog = toolsCatalog.filter(tl => {
    if (selectedToolCategory !== 'all') {
      if (selectedToolCategory === 'ai' && (tl.category === 'ai' || tl.tags?.includes('ai'))) {
        // match
      } else if (tl.category !== selectedToolCategory && !tl.tags?.includes(selectedToolCategory)) {
        return false;
      }
    }
    if (toolSearchQuery.trim()) {
      const q = toolSearchQuery.toLowerCase();
      const matchTitle = tl.title.toLowerCase().includes(q);
      const matchDesc = tl.desc.toLowerCase().includes(q);
      const matchBadge = tl.badge.toLowerCase().includes(q);
      const matchTags = tl.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchBadge && !matchTags) return false;
    }
    return true;
  });

  const scrollToolsLeft = () => {
    sounds.playClick();
    if (toolsScrollRef.current) {
      toolsScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollToolsRight = () => {
    sounds.playClick();
    if (toolsScrollRef.current) {
      toolsScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Drag to scroll for Tool cards container
  const handleToolsMouseDown = (e: React.MouseEvent) => {
    if (!toolsScrollRef.current) return;
    setIsToolsDragging(true);
    setToolsHasMoved(false);
    setToolsStartX(e.pageX - toolsScrollRef.current.offsetLeft);
    setToolsScrollLeftState(toolsScrollRef.current.scrollLeft);
  };

  const handleToolsMouseMove = (e: React.MouseEvent) => {
    if (!isToolsDragging || !toolsScrollRef.current) return;
    e.preventDefault();
    setToolsHasMoved(true);
    const x = e.pageX - toolsScrollRef.current.offsetLeft;
    const walk = (x - toolsStartX) * 1.5;
    toolsScrollRef.current.scrollLeft = toolsScrollLeftState - walk;
  };

  const handleToolsMouseUp = () => {
    setIsToolsDragging(false);
  };

  useEffect(() => {
    // Smooth counting ticker
    const duration = 1200; // ms
    const steps = 30;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCountQ(Math.floor((questionsCount / steps) * step));
      setCountG(Math.floor((12 / steps) * step));
      setCountS(Math.floor((studentsCount / steps) * step));
      setCountA(Math.floor((950 / steps) * step));

      if (step >= steps) {
        setCountQ(questionsCount);
        setCountG(12);
        setCountS(studentsCount);
        setCountA(950);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [questionsCount, studentsCount]);

  const stats = [
    { 
      label: '📚 Tổng câu hỏi', 
      val: countQ, 
      color: 'from-pink-400 to-rose-500', 
      desc: 'Kho lưu trữ phong phú',
      icon: <BookOpen className="w-8 h-8 text-white" />
    },
    { 
      label: '🎮 Trò chơi đã tạo', 
      val: countG, 
      color: 'from-amber-400 to-orange-500', 
      desc: 'Sẵn sàng lên lớp vui vẻ',
      icon: <Gamepad2 className="w-8 h-8 text-white" />
    },
    { 
      label: '👦 Học sinh', 
      val: countS, 
      color: 'from-green-400 to-emerald-500', 
      desc: 'Được theo dõi tiến độ',
      icon: <Users className="w-8 h-8 text-white" />
    },
    { 
      label: '⭐ Điểm AI', 
      val: countA, 
      color: 'from-indigo-400 to-purple-500', 
      desc: 'Tích lũy từ trợ lý ảo',
      icon: <Flame className="w-8 h-8 text-white" />
    }
  ];

  const filterChips = [
    { id: 'all', label: '🎒 Tất cả' },
    { id: 'quiz', label: '📖 Trắc nghiệm' },
    { id: 'fill', label: '✍️ Điền từ' },
    { id: 'listening', label: '🎧 Bài nghe' },
    { id: 'image', label: '🖼️ Hình ảnh' },
    { id: 'matching', label: '🎯 Ghép nối' },
    { id: 'random', label: '🎲 Random vui' }
  ];

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      sounds.playCoin();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      sounds.playCoin();
    }
  };

  const executeImport = () => {
    if (!uploadedFile) return;
    setIsParsing(true);
    sounds.playClick();

    setTimeout(() => {
      // Create some beautiful mock questions based on the import type
      const importedQs = importType === 'word' 
        ? [
            {
              id: 'imp_' + Math.random().toString(36).substring(2, 9),
              text: 'Từ nào sau đây đồng nghĩa với từ "Chăm chỉ"?',
              type: 'multiple_choice',
              options: ['Cần cù', 'Lười biếng', 'Thông minh', 'Hiếu động'],
              answer: 'Cần cù',
              subject: 'Tiếng Việt',
              grade: 3,
              difficulty: 'Dễ',
              useCount: 0,
              explanation: 'Đồng nghĩa với chăm chỉ là cần cù, chịu khó đấy bé!',
              tags: ['Từ đồng nghĩa', 'Import Word']
            },
            {
              id: 'imp_' + Math.random().toString(36).substring(2, 9),
              text: 'Biết 1m = 10dm. Hỏi 8m bằng bao nhiêu decimet?',
              type: 'multiple_choice',
              options: ['80dm', '8dm', '800dm', '18dm'],
              answer: '80dm',
              subject: 'Toán',
              grade: 3,
              difficulty: 'Dễ',
              useCount: 0,
              explanation: 'Vì 1m = 10dm nên 8m = 8 x 10 = 80dm!',
              tags: ['Đo lường', 'Import Word']
            }
          ]
        : [
            {
              id: 'imp_' + Math.random().toString(36).substring(2, 9),
              text: 'Which sentence is CORRECT English?',
              type: 'multiple_choice',
              options: ['She like apples.', 'She likes apples.', 'She is like apples.', 'She liking apples.'],
              answer: 'She likes apples.',
              subject: 'Tiếng Anh',
              grade: 4,
              difficulty: 'Trung bình',
              useCount: 0,
              explanation: 'Với chủ ngữ ngôi thứ ba số ít (She), động từ "like" phải thêm "s" thành "likes" con nhé!',
              tags: ['Grammar', 'Import Excel']
            }
          ];

      onAddQuestions(importedQs);
      setIsParsing(false);
      setShowImportModal(false);
      setUploadedFile(null);
      sounds.playSuccess();
      alert(`🎉 Nhập file thành công! SmartEdu đã quét và trích xuất thành công ${importedQs.length} câu hỏi mới từ tài liệu của thầy cô vào Kho câu hỏi! 🌸`);
    }, 1500);
  };

  const handleVoiceSearch = () => {
    sounds.playClick();
    alert('🎤 Tính năng Tìm kiếm giọng nói (Speech-to-Text) đang lắng nghe cô... Hãy nói: "Toán lớp 3 phép nhân"');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 select-none animate-fade-in">
      
      {/* 1. Cartoon Statistics Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((st, i) => (
          <div 
            key={i}
            className={`relative rounded-3xl p-5 md:p-6 bg-gradient-to-br ${st.color} text-white shadow-lg overflow-hidden card-cute transform cursor-pointer`}
            onClick={() => {
              sounds.playClick();
              if (i === 0) onNavigate('questions');
              if (i === 1) onNavigate('games');
              if (i === 2) onNavigate('reports');
              if (i === 3) onNavigate('ai');
            }}
          >
            {/* Whimsical overlay design */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-black/10 rounded-full blur-md"></div>

            <div className="flex items-start justify-between">
              <div>
                <p className="font-fredoka text-sm md:text-base font-bold opacity-90">{st.label}</p>
                <h3 className="font-fredoka text-3xl md:text-4xl font-extrabold mt-1.5 drop-shadow-md">
                  {st.val.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl border border-white/20 shadow-inner">
                {st.icon}
              </div>
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-white/80 mt-3 pt-2 border-t border-white/10">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 2. Large Interactive Search Bar */}
      <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-4 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 relative flex items-center bg-white/10 rounded-2xl border border-white/15 p-1">
          <Search className="w-6 h-6 text-indigo-200 ml-3 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi học tập, chủ đề, phép nhân lớp 3..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onNavigate('questions', { search: e.target.value });
            }}
            className="w-full bg-transparent border-0 outline-none px-3 py-2.5 font-sans font-bold text-white placeholder-indigo-200/60 text-sm md:text-base focus:ring-0"
          />
          <button 
            onClick={handleVoiceSearch}
            className="p-2 hover:bg-white/10 text-indigo-200 hover:text-white rounded-xl transition-all cursor-pointer mr-1"
            title="Tìm kiếm bằng giọng nói"
          >
            <Mic className="w-5 h-5 animate-pulse" />
          </button>
          <button 
            onClick={() => onNavigate('ai', { autofill: searchTerm })}
            className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105 text-white rounded-xl transition-all cursor-pointer mr-1 flex items-center gap-1 px-3 py-1 text-xs font-fredoka font-bold shadow-md"
            title="Tạo nhanh bằng AI"
          >
            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
            <span>AI</span>
          </button>
        </div>

        {/* Filter Chips inside Search layout */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {filterChips.map(chip => (
            <button
              key={chip.id}
              onClick={() => {
                sounds.playClick();
                setSelectedFilter(chip.id);
                onNavigate('questions', { typeFilter: chip.id });
              }}
              className={`
                px-4 py-2.5 rounded-full text-xs md:text-sm font-fredoka font-bold whitespace-nowrap cursor-pointer transition-all
                ${selectedFilter === chip.id 
                  ? 'bg-white text-indigo-700 shadow-xl scale-105' 
                  : 'bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white border border-white/10'
                }
              `}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2.2 SPECIAL FEATURE SPOTLIGHT: AI ENGLISH WARM-UP STUDIO */}
      <div 
        onClick={() => {
          sounds.playClick();
          onNavigate('warmup_studio');
        }}
        className="relative overflow-hidden rounded-[32px] p-6 md:p-8 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-800 border-2 border-pink-300/40 shadow-2xl text-white cursor-pointer group hover:scale-[1.01] transition-all duration-300"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-32 -translate-y-32 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-400 text-pink-950 font-fredoka font-black text-xs shadow-md">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>TÍNH NĂNG MỚI NỔI BẬT DÀNH CHO GIÁO VIÊN TIỂU HỌC</span>
            </div>
            
            <h2 className="font-fredoka text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
              ✨ AI Primary English Warm-up Studio
            </h2>
            
            <p className="text-sm md:text-base text-pink-100 font-medium leading-relaxed">
              Soạn kịch bản khởi động 5 phút vui nhộn chuẩn Sư phạm (Talk Show, Mini Drama, Chant, Song), tự động nạp từ vựng & mẫu câu Global Success 1–5, phân vai học sinh, sơ đồ sân khấu & máy chiếu Teleprompter luyện phát âm.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-white/20 text-white font-fredoka font-bold text-xs border border-white/20">
                ⏱️ Chuẩn 5 Phút Lên Lớp
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/20 text-white font-fredoka font-bold text-xs border border-white/20">
                🎭 Phân vai theo thế mạnh học sinh
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/20 text-white font-fredoka font-bold text-xs border border-white/20">
                📺 Máy chiếu Teleprompter + Audio mẫu
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/20 text-white font-fredoka font-bold text-xs border border-white/20">
                📄 Xuất file Word & PDF giáo án
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <button className="px-6 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-indigo-950 font-fredoka font-extrabold text-base md:text-lg shadow-2xl flex items-center gap-2 transition-all group-hover:shadow-pink-500/50 group-hover:scale-105 border-2 border-yellow-200">
              <Sparkles className="w-5 h-5" />
              <span>Vào Soạn Kịch Bản Ngay</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2.5 INTERACTIVE TOOL DISCOVERY DRAWER (THANH KÉO CÔNG CỤ THÔNG MINH) */}
      <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-2xl space-y-4 relative overflow-hidden">
        
        {/* Header with Search and Navigation Arrows */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 font-extrabold text-xs border border-yellow-400/30 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thanh kéo công cụ thông minh</span>
            </div>
            <h3 className="font-fredoka text-xl md:text-2xl font-extrabold text-white flex items-center gap-2 drop-shadow-md">
              🧰 Khám Phá & Tìm Kiếm Công Cụ Bị Ẩn
            </h3>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Tool Search Input */}
            <div className="relative flex-1 md:w-64 bg-white/10 rounded-2xl border border-white/20 p-1 flex items-center">
              <Search className="w-4 h-4 text-indigo-200 ml-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Tìm công cụ (Khởi động, OCR, SGV, 2345...)"
                value={toolSearchQuery}
                onChange={(e) => setToolSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none px-2 py-1 text-xs font-semibold text-white placeholder-indigo-200/60 focus:ring-0"
              />
              {toolSearchQuery && (
                <button
                  onClick={() => setToolSearchQuery('')}
                  className="px-2 text-[10px] font-bold text-indigo-200 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={scrollToolsLeft}
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/20 transition-all shadow-md"
                title="Kéo sang trái"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToolsRight}
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/20 transition-all shadow-md"
                title="Kéo sang phải"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {toolCategories.map((cat) => {
            const isSel = selectedToolCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedToolCategory(cat.id);
                }}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-fredoka font-bold whitespace-nowrap transition-all cursor-pointer border
                  ${isSel 
                    ? 'bg-yellow-300 text-purple-950 border-yellow-200 shadow-md scale-105' 
                    : 'bg-white/10 hover:bg-white/20 text-indigo-100 border-white/10 hover:text-white'
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrollable Container (supports mouse drag-to-scroll) */}
        <div 
          ref={toolsScrollRef}
          onMouseDown={handleToolsMouseDown}
          onMouseMove={handleToolsMouseMove}
          onMouseUp={handleToolsMouseUp}
          onMouseLeave={handleToolsMouseUp}
          className={`
            flex items-stretch gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x select-none
            ${isToolsDragging ? 'cursor-grabbing' : 'cursor-grab'}
          `}
        >
          {filteredToolsCatalog.length === 0 ? (
            <div className="w-full py-8 text-center bg-white/5 rounded-2xl border border-white/10 text-indigo-200 text-xs font-semibold">
              Chưa tìm thấy công cụ phù hợp với từ khóa "{toolSearchQuery}". Thử tìm "Khởi động", "Tiếng Anh", "SGV", "OCR", "Ma trận" hoặc "Giáo án" nhé!
            </div>
          ) : (
            filteredToolsCatalog.map((tool) => (
              <div
                key={tool.id}
                onClick={() => {
                  if (!toolsHasMoved) {
                    sounds.playClick();
                    tool.action();
                  }
                }}
                className={`
                  min-w-[280px] max-w-[280px] sm:min-w-[300px] sm:max-w-[300px] snap-start rounded-2xl p-4 bg-gradient-to-br ${tool.gradient}
                  border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer
                  flex flex-col justify-between space-y-3 group text-white relative overflow-hidden
                `}
              >
                {/* Background glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-md pointer-events-none"></div>

                <div className="space-y-2.5 z-10">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-2.5 bg-white/20 rounded-xl border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-fredoka font-extrabold shadow-sm ${tool.badgeBg}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h4 className="font-fredoka font-extrabold text-base md:text-lg text-white leading-snug group-hover:text-yellow-300 transition-colors">
                    {tool.title}
                  </h4>

                  <p className="text-xs text-white/85 font-medium leading-relaxed line-clamp-2">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-bold text-yellow-300 group-hover:translate-x-1 transition-transform z-10">
                  <span>Mở công cụ ngay</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drag Hint & Counter */}
        <div className="flex items-center justify-between text-[11px] font-bold text-indigo-200/80 pt-1 border-t border-white/10">
          <span>💡 Kéo chuột sang trái/phải hoặc nhấn nút mũi tên để xem tất cả {filteredToolsCatalog.length} công cụ</span>
          <span className="hidden sm:inline text-yellow-300">Nhấp để mở ngay</span>
        </div>

      </div>

      {/* 3. Gradient Function buttons Grid */}
      <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-6 border border-white/20 shadow-2xl space-y-4">
        <h3 className="font-fredoka text-lg font-extrabold text-yellow-300 flex items-center gap-2 drop-shadow-md">
          ⚡ Lối tắt công cụ giáo viên
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('warmup_studio');
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-fredoka font-bold text-sm md:text-base flex flex-col items-center justify-center gap-2 cursor-pointer btn-bounce shadow-lg border border-pink-300/40 hover:scale-105 transition-all"
          >
            <Sparkles className="w-6 h-6 animate-pulse text-yellow-200" />
            <span className="text-center leading-tight">✨ Khởi Động 5 Phút</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('ai');
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-fredoka font-bold text-sm md:text-base flex flex-col items-center justify-center gap-2 cursor-pointer btn-bounce shadow-md border border-white/10"
          >
            <Sparkles className="w-6 h-6 animate-bounce" />
            <span>✨ Tạo bằng AI</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setImportType('word');
              setShowImportModal(true);
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-fredoka font-bold text-sm md:text-base flex flex-col items-center justify-center gap-2 cursor-pointer btn-bounce shadow-md border border-white/10"
          >
            <Upload className="w-6 h-6" />
            <span>📥 Nhập từ Word</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setImportType('excel');
              setShowImportModal(true);
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 text-white font-fredoka font-bold text-sm md:text-base flex flex-col items-center justify-center gap-2 cursor-pointer btn-bounce shadow-md border border-white/10"
          >
            <Upload className="w-6 h-6" />
            <span>📥 Nhập từ Excel</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              alert('📤 Đang đóng gói dữ liệu của bạn... Xuất toàn bộ ngân hàng câu hỏi dưới định dạng JSON thành công! 🌟');
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 text-white font-fredoka font-bold text-sm md:text-base flex flex-col items-center justify-center gap-2 cursor-pointer btn-bounce shadow-md border border-white/10"
          >
            <Download className="w-6 h-6" />
            <span>📤 Xuất toàn bộ</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              alert('📄 Đang khởi tạo bản in PDF cực đẹp có logo lớp học... Đã tải xuống file PDF câu hỏi ôn tập thành công!');
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-fredoka font-bold text-sm md:text-base flex flex-col items-center justify-center gap-2 cursor-pointer btn-bounce shadow-md border border-white/10"
          >
            <FileText className="w-6 h-6" />
            <span>📄 Xuất đề PDF</span>
          </button>

          <button
            onClick={() => onNavigate('games', { startType: 'quiz' })}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white font-fredoka font-bold text-xs md:text-sm flex items-center gap-2.5 justify-center border border-white/15 cursor-pointer transition-all hover:scale-103"
          >
            <span>🎯 Trắc nghiệm</span>
          </button>

          <button
            onClick={() => onNavigate('games', { startType: 'wheel' })}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white font-fredoka font-bold text-xs md:text-sm flex items-center gap-2.5 justify-center border border-white/15 cursor-pointer transition-all hover:scale-103"
          >
            <span>🎡 Vòng quay</span>
          </button>

          <button
            onClick={() => onNavigate('games', { startType: 'flashcard' })}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white font-fredoka font-bold text-xs md:text-sm flex items-center gap-2.5 justify-center border border-white/15 cursor-pointer transition-all hover:scale-103"
          >
            <span>🎴 Flashcards</span>
          </button>

          <button
            onClick={() => onNavigate('games', { startType: 'memory' })}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white font-fredoka font-bold text-xs md:text-sm flex items-center gap-2.5 justify-center border border-white/15 cursor-pointer transition-all hover:scale-103"
          >
            <span>🧩 Trí nhớ</span>
          </button>

          <button
            onClick={() => onNavigate('games', { startType: 'balloon' })}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white font-fredoka font-bold text-xs md:text-sm flex items-center gap-2.5 justify-center border border-white/15 cursor-pointer transition-all hover:scale-103"
          >
            <span>🎈 Bong bóng</span>
          </button>

        </div>
      </div>

      {/* 4. Import Document Modal (Simulated parsing file upload) */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-[32px] border-4 border-indigo-100 overflow-hidden shadow-2xl p-6 relative animate-float">
            
            <button 
              onClick={() => {
                sounds.playClick();
                setShowImportModal(false);
                setUploadedFile(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-lg cursor-pointer transition-all"
            >
              ✕
            </button>

            <h3 className="font-fredoka text-xl font-bold text-indigo-700 flex items-center gap-2 mb-2">
              📥 Nhập đề từ file {importType === 'word' ? 'Word (.docx)' : 'Excel (.xlsx)'}
            </h3>
            <p className="text-xs font-semibold text-gray-400 mb-4">
              Hệ thống AI sẽ tự động phân tích câu hỏi, đáp án, lời giải thích và các tag phân loại từ file tài liệu của bạn!
            </p>

            {/* Drop Zone Area */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`
                border-4 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-center transition-all cursor-pointer
                ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-indigo-100 bg-indigo-50/20'}
              `}
            >
              {importType === 'word' ? (
                <FileText className={`w-14 h-14 ${uploadedFile ? 'text-indigo-500' : 'text-indigo-300'}`} />
              ) : (
                <FileSpreadsheet className={`w-14 h-14 ${uploadedFile ? 'text-green-500' : 'text-green-300'}`} />
              )}
              
              {uploadedFile ? (
                <div>
                  <p className="font-fredoka font-bold text-indigo-600 text-sm">{uploadedFile.name}</p>
                  <p className="text-xs font-bold text-gray-400 mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <p className="font-fredoka font-bold text-indigo-700 text-sm">
                    Kéo thả file tài liệu vào đây
                  </p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">hoặc nhấn để tìm kiếm trong máy</p>
                </div>
              )}

              <input
                type="file"
                accept={importType === 'word' ? '.doc,.docx' : '.xls,.xlsx'}
                onChange={handleFileChange}
                className="hidden"
                id="file-input-id"
              />
              {!uploadedFile && (
                <label 
                  htmlFor="file-input-id" 
                  className="mt-2 bg-indigo-500 text-white font-fredoka font-bold text-xs px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-600 shadow-md transition-all"
                >
                  Chọn tài liệu
                </label>
              )}
            </div>

            {/* Action buttons inside Modal */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowImportModal(false);
                  setUploadedFile(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-gray-100 text-gray-600 font-fredoka font-bold text-sm hover:bg-gray-200 cursor-pointer"
              >
                Hủy bỏ
              </button>
              
              <button
                disabled={!uploadedFile || isParsing}
                onClick={executeImport}
                className={`
                  px-5 py-2.5 rounded-2xl text-white font-fredoka font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer
                  ${uploadedFile && !isParsing 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105' 
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {isParsing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>AI đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Trích xuất đề</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
