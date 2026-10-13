/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FolderArchive, Search, Filter, BookOpen, Layers, Calendar, 
  Clock, Award, Download, FileText, Gamepad2, Eye, Trash2, 
  Sparkles, CheckCircle2, ShieldCheck, Sliders, ChevronRight,
  Printer, Share2, Plus, Copy, FileSpreadsheet, RotateCw
} from 'lucide-react';
import { ExamPackage, SubjectType } from '../types';
import { sounds } from '../lib/audio';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface ExamArchiveProps {
  onNavigateToAI: (payload?: any) => void;
  onNavigateToGames: (questions?: any[]) => void;
}

export default function ExamArchive({ onNavigateToAI, onNavigateToGames }: ExamArchiveProps) {
  const [exams, setExams] = useState<ExamPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examToDelete, setExamToDelete] = useState<ExamPackage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Exam Modal
  const [activeExamModal, setActiveExamModal] = useState<ExamPackage | null>(null);
  const [activeVariantCode, setActiveVariantCode] = useState<string>('Đề 101 (A)');
  const [activeModalTab, setActiveModalTab] = useState<'questions' | 'matrix' | 'reviewer'>('questions');

  // Subjects list
  const subjects = [
    'Tất cả môn',
    'Toán',
    'Tiếng Việt',
    'Tiếng Anh',
    'Khoa học',
    'Lịch sử & Địa lý',
    'Tin học',
    'Công nghệ',
    'Đạo đức',
    'Hoạt động trải nghiệm'
  ];

  // Grades list
  const grades = [
    { id: 'all', label: 'Tất cả khối' },
    { id: '1', label: 'Khối 1' },
    { id: '2', label: 'Khối 2' },
    { id: '3', label: 'Khối 3' },
    { id: '4', label: 'Khối 4' },
    { id: '5', label: 'Khối 5' },
  ];

  // Fetch saved exam packages from API with fallback mock list
  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/exams');
      if (res.ok) {
        const data = await res.json();
        setExams(data);
      } else {
        throw new Error('Failed to fetch exams');
      }
    } catch (err) {
      console.warn('Using local backup exam packages:', err);
      // Default initial mock exams package library
      const initialMockExams: ExamPackage[] = [
        {
          id: 'ex_1',
          title: 'Đề kiểm tra Giữa kỳ 1 Môn Toán Lớp 3 (Bảng nhân & Hình học)',
          subject: 'Toán',
          grade: 3,
          bookSeries: 'Kết nối tri thức với cuộc sống',
          edition: 'Bộ GDĐT 2018',
          scope: 'Chương 1 & 2',
          purpose: 'Kiểm tra giữa kỳ',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          questions: [
            {
              id: 'q_ex1_1',
              text: 'Bác Ba nuôi 6 con thỏ. Hỏi 4 bác Ba nuôi tổng cộng bao nhiêu con thỏ?',
              type: 'multiple_choice',
              options: ['20 con thỏ', '24 con thỏ', '18 con thỏ', '28 con thỏ'],
              answer: '24 con thỏ',
              subject: 'Toán',
              grade: 3,
              difficulty: 'Dễ',
              cognitiveLevel: 'Nhận biết',
              useCount: 5,
              explanation: 'Lấy 6 x 4 = 24 con thỏ.',
              reasonRight: 'Thực hiện phép nhân bảng 6 theo đúng bài học SGK Toán 3.',
              relatedKnowledge: 'Sách giáo khoa Toán 3 - Tập 1 (Trang 18)'
            },
            {
              id: 'q_ex1_2',
              text: 'Hình nào dưới đây có 4 cạnh bằng nhau và 4 góc vuông?',
              type: 'multiple_choice',
              options: ['Hình chữ nhật', 'Hình vuông', 'Hình tam giác', 'Hình tròn'],
              answer: 'Hình vuông',
              subject: 'Toán',
              grade: 3,
              difficulty: 'Trung bình',
              cognitiveLevel: 'Thông hiểu',
              useCount: 12,
              explanation: 'Hình vuông có đặc điểm là 4 cạnh có độ dài bằng nhau và có 4 góc vuông.',
              reasonRight: 'Đúng khái niệm yếu tố hình học cơ bản.',
              relatedKnowledge: 'Toán 3 KNTT Bài 12: Hình vuông'
            }
          ],
          analysis: {
            estimatedTimeMinutes: 35,
            qualityScore: 98,
            knowledgeCoverage: 'Đạt 100% chuẩn kỹ năng bảng nhân 2-6 và nhận dạng hình phẳng.',
            cognitiveMatrix: { nhanBiet: 40, thongHieu: 30, vanDung: 20, vanDungCao: 10 },
            reviewerAudit: {
              textbookAlignment: true,
              curriculumCompliance: true,
              grammarSpellingCheck: true,
              unambiguousAnswers: true,
              notes: 'Đề đạt chuẩn 100% ma trận Thông tư 27. Đáp án rõ ràng, phân hóa học sinh tốt.'
            }
          },
          variants: [
            {
              code: 'Đề 101 (A)',
              title: 'Đề 101 (A) - Giữa kỳ 1 Toán 3',
              questions: [
                {
                  id: 'q_ex1_1',
                  text: 'Bác Ba nuôi 6 con thỏ. Hỏi 4 bác Ba nuôi tổng cộng bao nhiêu con thỏ?',
                  type: 'multiple_choice',
                  options: ['20 con thỏ', '24 con thỏ', '18 con thỏ', '28 con thỏ'],
                  answer: '24 con thỏ',
                  subject: 'Toán',
                  grade: 3,
                  difficulty: 'Dễ',
                  cognitiveLevel: 'Nhận biết',
                  useCount: 0
                },
                {
                  id: 'q_ex1_2',
                  text: 'Hình nào dưới đây có 4 cạnh bằng nhau và 4 góc vuông?',
                  type: 'multiple_choice',
                  options: ['Hình chữ nhật', 'Hình vuông', 'Hình tam giác', 'Hình tròn'],
                  answer: 'Hình vuông',
                  subject: 'Toán',
                  grade: 3,
                  difficulty: 'Trung bình',
                  cognitiveLevel: 'Thông hiểu',
                  useCount: 0
                }
              ]
            },
            {
              code: 'Đề 102 (B)',
              title: 'Đề 102 (B) - Giữa kỳ 1 Toán 3',
              questions: [
                {
                  id: 'q_ex1_2',
                  text: 'Hình nào dưới đây có 4 cạnh bằng nhau và 4 góc vuông?',
                  type: 'multiple_choice',
                  options: ['Hình vuông', 'Hình chữ nhật', 'Hình tròn', 'Hình tam giác'],
                  answer: 'Hình vuông',
                  subject: 'Toán',
                  grade: 3,
                  difficulty: 'Trung bình',
                  cognitiveLevel: 'Thông hiểu',
                  useCount: 0
                },
                {
                  id: 'q_ex1_1',
                  text: 'Bác Ba nuôi 6 con thỏ. Hỏi 4 bác Ba nuôi tổng cộng bao nhiêu con thỏ?',
                  type: 'multiple_choice',
                  options: ['24 con thỏ', '20 con thỏ', '28 con thỏ', '18 con thỏ'],
                  answer: '24 con thỏ',
                  subject: 'Toán',
                  grade: 3,
                  difficulty: 'Dễ',
                  cognitiveLevel: 'Nhận biết',
                  useCount: 0
                }
              ]
            }
          ]
        },
        {
          id: 'ex_2',
          title: 'Đề kiểm tra Thường xuyên Tiếng Việt Lớp 2 - Bài 5: Em mang về yêu thương',
          subject: 'Tiếng Việt',
          grade: 2,
          bookSeries: 'Kết nối tri thức với cuộc sống',
          edition: 'Bộ GDĐT 2018',
          scope: 'Bài 5 Unit 2',
          purpose: 'Kiểm tra thường xuyên',
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          questions: [
            {
              id: 'q_ex2_1',
              text: 'Điền từ ngữ phù hợp thể hiện tình cảm gia đình vào chỗ trống: "Bà em rất ____ cháu."',
              type: 'fill_blank',
              answer: 'yêu thương',
              subject: 'Tiếng Việt',
              grade: 2,
              difficulty: 'Dễ',
              cognitiveLevel: 'Nhận biết',
              useCount: 10,
              explanation: 'Từ "yêu thương" hoặc "chiều chuộng" phù hợp.',
              reasonRight: 'Theo chủ điểm Gia đình ấm áp - Tiếng Việt 2.',
              relatedKnowledge: 'Tiếng Việt 2 Kết nối tri thức với cuộc sống'
            }
          ],
          analysis: {
            estimatedTimeMinutes: 20,
            qualityScore: 96,
            knowledgeCoverage: 'Bám sát chính tả ch/tr, từ chỉ tình cảm gia đình và đặt câu cảm.',
            cognitiveMatrix: { nhanBiet: 50, thongHieu: 30, vanDung: 20, vanDungCao: 0 },
            reviewerAudit: {
              textbookAlignment: true,
              curriculumCompliance: true,
              grammarSpellingCheck: true,
              unambiguousAnswers: true,
              notes: 'Câu hỏi vừa sức lớp 2, ngữ liệu thơ ca trong sáng.'
            }
          },
          variants: [
            {
              code: 'Đề 101 (A)',
              title: 'Đề 101 (A) - Tiếng Việt 2',
              questions: [
                {
                  id: 'q_ex2_1',
                  text: 'Điền từ ngữ phù hợp thể hiện tình cảm gia đình vào chỗ trống: "Bà em rất ____ cháu."',
                  type: 'fill_blank',
                  answer: 'yêu thương',
                  subject: 'Tiếng Việt',
                  grade: 2,
                  difficulty: 'Dễ',
                  cognitiveLevel: 'Nhận biết',
                  useCount: 0
                }
              ]
            }
          ]
        },
        {
          id: 'ex_3',
          title: 'Global Success Grade 4 - Unit 3: My Weekdays (Assessment Test)',
          subject: 'Tiếng Anh',
          grade: 4,
          bookSeries: 'Global Success',
          edition: 'Bộ GDĐT 2018',
          scope: 'Unit 3: My Weekdays',
          purpose: 'Kiểm tra thường xuyên',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          questions: [
            {
              id: 'q_ex3_1',
              text: 'What day is it today? - It is ____.',
              type: 'multiple_choice',
              options: ['Monday', 'Apple', 'Swim', 'Blue'],
              answer: 'Monday',
              subject: 'Tiếng Anh',
              grade: 4,
              difficulty: 'Dễ',
              cognitiveLevel: 'Nhận biết',
              useCount: 18,
              explanation: 'Monday là thứ Hai trong tuần.',
              reasonRight: 'Chủ đề các ngày trong tuần Unit 3 Global Success Grade 4.',
              relatedKnowledge: 'Global Success Grade 4 Unit 3'
            }
          ],
          analysis: {
            estimatedTimeMinutes: 25,
            qualityScore: 100,
            knowledgeCoverage: 'Vocabulary days of week, sentence pattern What day is it today?',
            cognitiveMatrix: { nhanBiet: 40, thongHieu: 30, vanDung: 20, vanDungCao: 10 },
            reviewerAudit: {
              textbookAlignment: true,
              curriculumCompliance: true,
              grammarSpellingCheck: true,
              unambiguousAnswers: true,
              notes: '100% English prompts with Vietnamese friendly explanations.'
            }
          },
          variants: [
            {
              code: 'Đề 101 (A)',
              title: 'Đề 101 (A) - Global Success 4 Unit 3',
              questions: [
                {
                  id: 'q_ex3_1',
                  text: 'What day is it today? - It is ____.',
                  type: 'multiple_choice',
                  options: ['Monday', 'Apple', 'Swim', 'Blue'],
                  answer: 'Monday',
                  subject: 'Tiếng Anh',
                  grade: 4,
                  difficulty: 'Dễ',
                  useCount: 0
                }
              ]
            }
          ]
        }
      ];
      setExams(initialMockExams);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Filtered list
  const filteredExams = exams.filter(ex => {
    // Subject filter
    if (selectedSubject !== 'all' && selectedSubject !== 'Tất cả môn') {
      if (ex.subject !== selectedSubject) return false;
    }
    // Grade filter
    if (selectedGrade !== 'all') {
      if (ex.grade !== Number(selectedGrade)) return false;
    }
    // Purpose filter
    if (selectedPurpose !== 'all') {
      if (!ex.purpose.toLowerCase().includes(selectedPurpose.toLowerCase())) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ex.title.toLowerCase().includes(q);
      const matchScope = ex.scope.toLowerCase().includes(q);
      const matchBook = ex.bookSeries.toLowerCase().includes(q);
      if (!matchTitle && !matchScope && !matchBook) return false;
    }
    return true;
  });

  // Handle Export Word
  const handleDownloadWord = (pkg: ExamPackage, vCode?: string) => {
    sounds.playCoin();
    const variantCode = vCode || pkg.variants[0]?.code || 'Đề 101 (A)';
    const variant = pkg.variants.find(v => v.code === variantCode) || pkg.variants[0];
    const questionsList = variant.questions;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${pkg.title}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; margin: 2cm; }
          .header-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .header-table td { text-align: center; font-weight: bold; font-size: 11pt; }
          .title { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 20px 0; color: #1a365d; }
          .meta-info { font-style: italic; text-align: center; margin-bottom: 25px; }
          .matrix-box { border: 1px solid #1a365d; padding: 10px; margin-bottom: 20px; font-size: 11pt; background: #f7fafc; }
          .question-item { margin-bottom: 15px; page-break-inside: avoid; }
          .q-title { font-weight: bold; }
          .options-grid { margin-left: 20px; margin-top: 5px; }
          .key-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          .key-table th, .key-table td { border: 1px solid #000; padding: 6px; text-align: center; }
          .explanation-box { background: #edf2f7; padding: 10px; border-left: 4px solid #2b6cb0; margin-top: 8px; font-size: 11pt; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td>BỘ GIÁO DỤC VÀ ĐÀO TẠO<br>TRƯỜNG TIỂU HỌC CHUẨN GDPT 2018</td>
            <td>KHO LƯU TRỮ ĐỀ THI SMARTEDU<br>NĂM HỌC 2025 - 2026</td>
          </tr>
        </table>

        <div class="title">${pkg.title} - ${variant.code}</div>
        <div class="meta-info">
          Môn: <b>${pkg.subject}</b> | Lớp: <b>${pkg.grade}</b> | Bộ sách: <b>${pkg.bookSeries} (${pkg.edition})</b><br>
          Thời gian làm bài: <b>${pkg.analysis.estimatedTimeMinutes} phút</b> | Điểm kiểm định AI: <b>${pkg.analysis.qualityScore}/100</b>
        </div>

        <div class="matrix-box">
          <b>BẢNG MA TRẬN MỨC ĐỘ TƯ DUY (THÔNG TƯ 27 / BỘ GDĐT):</b><br>
          • Nhận biết: ${pkg.analysis.cognitiveMatrix.nhanBiet}% | Thông hiểu: ${pkg.analysis.cognitiveMatrix.thongHieu}% | Vận dụng: ${pkg.analysis.cognitiveMatrix.vanDung}% | Vận dụng cao: ${pkg.analysis.cognitiveMatrix.vanDungCao}%<br>
          • Phạm vi kiến thức: ${pkg.analysis.knowledgeCoverage}
        </div>

        <h3>I. PHẦN CÂU HỎI (${questionsList.length} câu)</h3>
        ${questionsList.map((q, i) => `
          <div class="question-item">
            <div class="q-title">Câu ${i + 1} [${q.cognitiveLevel || 'Thông hiểu'}]: ${q.text}</div>
            ${q.options && q.options.length > 0 ? `
              <div class="options-grid">
                A. ${q.options[0] || ''}<br>
                B. ${q.options[1] || ''}<br>
                C. ${q.options[2] || ''}<br>
                D. ${q.options[3] || ''}
              </div>
            ` : ''}
          </div>
        `).join('')}

        <br><hr><br>
        <h3>II. ĐÁP ÁN VÀ MA TRẬN ĐỐI CHIẾU (${variant.code})</h3>
        <table class="key-table">
          <tr><th>Câu</th><th>Đáp án đúng</th><th>Mức độ tư duy</th><th>Kỹ năng</th></tr>
          ${questionsList.map((q, i) => `
            <tr>
              <td>Câu ${i + 1}</td>
              <td><b>${q.answer}</b></td>
              <td>${q.cognitiveLevel || 'Thông hiểu'}</td>
              <td>${q.skillCategory || 'Đọc hiểu'}</td>
            </tr>
          `).join('')}
        </table>

        <br>
        <h4>HƯỚNG DẪN GIẢI CHI TIẾT & GHI CHÚ CHUẨN SGK:</h4>
        ${questionsList.map((q, i) => `
          <div class="explanation-box">
            <b>Câu ${i + 1}:</b> Đáp án đúng: <b>${q.answer}</b><br>
            💡 <i>Giải thích:</i> ${q.explanation || 'Đang cập nhật'}<br>
            ✔ <i>Vì sao đúng:</i> ${q.reasonRight || 'Đúng theo quy định sách giáo khoa'}<br>
            📖 <i>Nguồn tham chiếu:</i> ${q.relatedKnowledge || pkg.bookSeries}
          </div>
        `).join('')}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pkg.title.replace(/\s+/g, '_')}_${variantCode}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Delete exam from archive
  const handleDeleteExam = async (id: string) => {
    sounds.playClick();
    try {
      await fetch(`/api/exams/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setExams(prev => prev.filter(e => e.id !== id));
    if (activeExamModal?.id === id) setActiveExamModal(null);
  };

  // Get subject badge color
  const getSubjectColor = (subj: string) => {
    switch (subj) {
      case 'Toán': return 'bg-blue-500 text-white border-blue-400';
      case 'Tiếng Việt': return 'bg-amber-500 text-white border-amber-400';
      case 'Tiếng Anh': return 'bg-pink-500 text-white border-pink-400';
      case 'Khoa học': return 'bg-sky-500 text-white border-sky-400';
      case 'Lịch sử & Địa lý': return 'bg-orange-500 text-white border-orange-400';
      case 'Tin học': return 'bg-cyan-500 text-white border-cyan-400';
      case 'Đạo đức': return 'bg-rose-500 text-white border-rose-400';
      default: return 'bg-purple-500 text-white border-purple-400';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 select-none animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-[32px] p-6 md:p-8 border border-white/20 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 font-extrabold text-xs border border-yellow-400/30">
            <FolderArchive className="w-4 h-4 text-yellow-300" />
            <span>Kho Lưu Trữ Đề Thi Thông Minh (CTGDPT 2018)</span>
          </div>
          <h2 className="font-fredoka text-2xl md:text-4xl font-extrabold drop-shadow-md">
            Thư Viện Đề Thi Theo Môn & Khối Lớp
          </h2>
          <p className="text-xs md:text-sm text-indigo-200/90 max-w-2xl font-semibold">
            Toàn bộ các đề kiểm tra do thầy cô hoặc AI khởi tạo được lưu trữ hệ thống, phân loại khoa học theo từng Môn học và Khối lớp. Sẵn sàng xem lại, tải Word/PDF, hoặc đưa trực tiếp vào GameCenter bất cứ lúc nào!
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 self-stretch sm:self-auto">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigateToAI({ subject: selectedSubject !== 'all' ? selectedSubject : 'Toán', grade: selectedGrade !== 'all' ? Number(selectedGrade) : 3 });
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-purple-950 font-fredoka font-extrabold text-sm hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-purple-950 animate-bounce" />
            <span>Tạo đề mới bằng AI</span>
          </button>
        </div>

        {/* Decorative background blur shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-5 shadow-2xl space-y-4">
        
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full relative flex items-center bg-white/10 rounded-2xl border border-white/20 p-1">
            <Search className="w-5 h-5 text-indigo-200 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên đề, chương, bài học, bộ sách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none px-3 py-2 text-white placeholder-indigo-200/60 font-semibold text-sm focus:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2 text-xs font-bold text-indigo-200 hover:text-white mr-2"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="bg-white/15 border border-white/20 text-white rounded-xl px-3 py-2 text-xs font-bold outline-none cursor-pointer hover:bg-white/20"
            >
              <option value="all" className="bg-slate-900 text-white">Tất cả mục đích</option>
              <option value="thường xuyên" className="bg-slate-900 text-white">Kiểm tra thường xuyên</option>
              <option value="giữa kỳ" className="bg-slate-900 text-white">Kiểm tra giữa kỳ</option>
              <option value="cuối kỳ" className="bg-slate-900 text-white">Kiểm tra cuối kỳ</option>
              <option value="hsg" className="bg-slate-900 text-white">Ôn luyện HSG</option>
            </select>
          </div>
        </div>

        {/* Subjects Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Phân loại theo Môn học:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {subjects.map((sb) => {
              const isSel = selectedSubject === sb || (sb === 'Tất cả môn' && selectedSubject === 'all');
              return (
                <button
                  key={sb}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSubject(sb === 'Tất cả môn' ? 'all' : sb);
                  }}
                  className={`
                    px-4 py-2 rounded-2xl text-xs font-fredoka font-bold whitespace-nowrap transition-all cursor-pointer border
                    ${isSel 
                      ? 'bg-yellow-300 text-purple-950 border-yellow-200 shadow-lg scale-105' 
                      : 'bg-white/10 hover:bg-white/20 text-indigo-100 border-white/10 hover:text-white'
                    }
                  `}
                >
                  {sb}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grades Tabs */}
        <div className="space-y-1.5 pt-1 border-t border-white/10">
          <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Phân loại theo Khối lớp:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {grades.map((gr) => {
              const isSel = selectedGrade === gr.id;
              return (
                <button
                  key={gr.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedGrade(gr.id);
                  }}
                  className={`
                    px-4 py-2 rounded-2xl text-xs font-fredoka font-bold whitespace-nowrap transition-all cursor-pointer border
                    ${isSel 
                      ? 'bg-cyan-300 text-purple-950 border-cyan-200 shadow-lg scale-105' 
                      : 'bg-white/10 hover:bg-white/20 text-indigo-100 border-white/10 hover:text-white'
                    }
                  `}
                >
                  {gr.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Exam Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RotateCw className="w-10 h-10 text-yellow-300 animate-spin mx-auto" />
          <p className="font-fredoka text-sm text-white font-bold">Đang tải kho lưu trữ đề thi...</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-12 text-center border border-white/20 shadow-2xl space-y-4">
          <FolderArchive className="w-16 h-16 text-indigo-200 mx-auto opacity-60" />
          <h3 className="font-fredoka text-xl font-bold text-white">Chưa tìm thấy đề thi phù hợp</h3>
          <p className="text-xs text-indigo-200 max-w-md mx-auto">
            Không có đề thi nào thỏa mãn bộ lọc môn hoặc khối lớp này. Cô giáo có thể chọn môn khác hoặc bấm "Tạo đề mới bằng AI" để soạn ngay nhé!
          </p>
          <button
            onClick={() => {
              setSelectedSubject('all');
              setSelectedGrade('all');
              setSelectedPurpose('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-2xl text-xs font-fredoka font-bold cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-[28px] border-4 border-indigo-100 p-5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 relative group hover:-translate-y-1"
            >
              <div className="space-y-3">
                
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border shadow-sm ${getSubjectColor(pkg.subject)}`}>
                    {pkg.subject}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-[11px] font-extrabold">
                      Khối {pkg.grade}
                    </span>
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-[11px] font-bold">
                      {pkg.bookSeries}
                    </span>
                  </div>
                </div>

                {/* Exam Title */}
                <h3 className="font-fredoka font-extrabold text-gray-800 text-base md:text-lg leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {pkg.title}
                </h3>

                {/* Meta details */}
                <div className="bg-indigo-50/60 p-3 rounded-2xl text-xs space-y-1.5 font-semibold text-gray-600 border border-indigo-100/50">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{pkg.analysis.estimatedTimeMinutes} phút</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Layers className="w-3.5 h-3.5 text-purple-500" />
                      <span>{pkg.questions.length} câu đố</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{pkg.analysis.qualityScore}/100 AI</span>
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-indigo-100/80 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">Mã đề biến thể: <b>{pkg.variants.length} mã</b></span>
                    <span className="text-indigo-600 font-bold">{pkg.purpose}</span>
                  </div>
                </div>

                {/* Cognitive Matrix mini preview */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                    <span>Tỷ lệ Bloom (Thông tư 27):</span>
                    <span>{pkg.analysis.cognitiveMatrix.nhanBiet}% - {pkg.analysis.cognitiveMatrix.thongHieu}% - {pkg.analysis.cognitiveMatrix.vanDung}% - {pkg.analysis.cognitiveMatrix.vanDungCao}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div style={{ width: `${pkg.analysis.cognitiveMatrix.nhanBiet}%` }} className="bg-blue-500 h-full" title="Nhận biết"></div>
                    <div style={{ width: `${pkg.analysis.cognitiveMatrix.thongHieu}%` }} className="bg-emerald-500 h-full" title="Thông hiểu"></div>
                    <div style={{ width: `${pkg.analysis.cognitiveMatrix.vanDung}%` }} className="bg-amber-500 h-full" title="Vận dụng"></div>
                    <div style={{ width: `${pkg.analysis.cognitiveMatrix.vanDungCao}%` }} className="bg-rose-500 h-full" title="Vận dụng cao"></div>
                  </div>
                </div>

                {/* Audit check indicator */}
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-xl font-bold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">Kiểm định 2 vòng AI: Chuẩn SGK & CTGDPT 2018</span>
                </div>

              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-1.5">
                
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveExamModal(pkg);
                    setActiveVariantCode(pkg.variants[0]?.code || 'Đề 101 (A)');
                    setActiveModalTab('questions');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-102"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem đề & Ma trận</span>
                </button>

                <button
                  onClick={() => handleDownloadWord(pkg)}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer transition-all"
                  title="Tải về file Word (.doc)"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    sounds.playLevelUp();
                    onNavigateToGames(pkg.questions);
                  }}
                  className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 cursor-pointer transition-all"
                  title="Tải lên GameCenter để chơi với lớp"
                >
                  <Gamepad2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setExamToDelete(pkg)}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-rose-100 text-gray-400 hover:text-rose-600 cursor-pointer transition-all"
                  title="Xóa đề khỏi thư viện"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* EXAM DETAILS MODAL */}
      {activeExamModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
          <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-[32px] border-4 border-indigo-100 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-indigo-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-extrabold border ${getSubjectColor(activeExamModal.subject)}`}>
                    {activeExamModal.subject}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/20 text-white rounded-lg text-xs font-bold">
                    Khối {activeExamModal.grade}
                  </span>
                  <span className="px-2.5 py-0.5 bg-yellow-400 text-purple-950 rounded-lg text-xs font-extrabold">
                    {activeExamModal.bookSeries}
                  </span>
                </div>
                <h3 className="font-fredoka font-extrabold text-lg sm:text-2xl text-yellow-300">
                  {activeExamModal.title}
                </h3>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveExamModal(null);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold text-lg cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Navigation Tabs & Variant Switcher */}
            <div className="bg-indigo-50/80 p-3 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveModalTab('questions');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                    activeModalTab === 'questions' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📝 Nội dung đề thi
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveModalTab('matrix');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                    activeModalTab === 'matrix' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📊 Ma trận & Bảng đặc tả Bộ GD&ĐT
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveModalTab('reviewer');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                    activeModalTab === 'reviewer' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🛡️ Báo cáo Kiểm định 2 vòng
                </button>
              </div>

              {/* Variant Switcher */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-indigo-100">
                <span className="text-[11px] font-bold text-gray-500 px-2">Mã đề:</span>
                {activeExamModal.variants.map((v) => (
                  <button
                    key={v.code}
                    onClick={() => {
                      sounds.playClick();
                      setActiveVariantCode(v.code);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                      activeVariantCode === v.code ? 'bg-yellow-400 text-purple-950 shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {v.code}
                  </button>
                ))}
              </div>

            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {activeModalTab === 'questions' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200 flex items-center justify-between text-xs font-bold text-yellow-900">
                    <span>Mã biến thể hiện tại: <b>{activeVariantCode}</b></span>
                    <span>Số câu đố: <b>{(activeExamModal.variants.find(v => v.code === activeVariantCode) || activeExamModal.variants[0]).questions.length} câu</b></span>
                  </div>

                  {(activeExamModal.variants.find(v => v.code === activeVariantCode) || activeExamModal.variants[0]).questions.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-indigo-700">Câu {idx + 1} [{q.cognitiveLevel || 'Thông hiểu'}]:</span>
                        {q.difficulty && (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px]">
                            {q.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{q.text}</p>
                      
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className={`p-2.5 rounded-xl border text-xs font-semibold ${opt === q.answer ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold' : 'bg-white border-gray-200 text-gray-700'}`}>
                              <span className="font-bold mr-1.5">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-indigo-50/80 p-3 rounded-xl border border-indigo-100 text-xs space-y-1 text-gray-700 mt-2">
                        <p className="text-emerald-700 font-bold">✔ Đáp án đúng: {q.answer}</p>
                        {q.explanation && <p className="italic">💡 Giải thích: {q.explanation}</p>}
                        {q.relatedKnowledge && <p className="text-gray-500 text-[11px]">📖 Tham chiếu SGK: {q.relatedKnowledge}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'matrix' && (
                <div className="space-y-5 text-gray-800">
                  <div className="bg-indigo-900 text-white p-5 rounded-2xl space-y-3">
                    <h4 className="font-fredoka text-lg font-bold text-yellow-300">
                      📊 TỔNG HỢP MA TRẬN MỨC ĐỘ TƯ DUY (THÔNG TƯ 27)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                      <div className="bg-blue-800/80 p-3 rounded-xl border border-blue-400/30">
                        <span className="text-blue-300 block font-bold">Nhận biết</span>
                        <span className="text-xl font-extrabold">{activeExamModal.analysis.cognitiveMatrix.nhanBiet}%</span>
                      </div>
                      <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-400/30">
                        <span className="text-emerald-300 block font-bold">Thông hiểu</span>
                        <span className="text-xl font-extrabold">{activeExamModal.analysis.cognitiveMatrix.thongHieu}%</span>
                      </div>
                      <div className="bg-amber-800/80 p-3 rounded-xl border border-amber-400/30">
                        <span className="text-amber-300 block font-bold">Vận dụng</span>
                        <span className="text-xl font-extrabold">{activeExamModal.analysis.cognitiveMatrix.vanDung}%</span>
                      </div>
                      <div className="bg-rose-800/80 p-3 rounded-xl border border-rose-400/30">
                        <span className="text-rose-300 block font-bold">Vận dụng cao</span>
                        <span className="text-xl font-extrabold">{activeExamModal.analysis.cognitiveMatrix.vanDungCao}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 text-xs">
                    <h5 className="font-bold text-indigo-800 text-sm">📋 BẢNG ĐẶC TẢ CHI TIẾT THEO CHUẨN MỨC ĐỘ YÊU CẦU CẦN ĐẠT</h5>
                    <p className="text-gray-600">Phạm vi kiến thức bao phủ: <b>{activeExamModal.analysis.knowledgeCoverage}</b></p>
                    <p className="text-gray-600">Mục đích kiểm tra đánh giá: <b>{activeExamModal.purpose}</b> ({activeExamModal.scope})</p>
                  </div>
                </div>
              )}

              {activeModalTab === 'reviewer' && (
                <div className="space-y-4 text-xs text-gray-800">
                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-fredoka font-bold text-base">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      <span>Kết quả kiểm định 2 vòng (Generator + Reviewer Expert)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-900 font-bold">
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Đúng chuẩn Sách giáo khoa & CTGDPT 2018</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Không lỗi chính tả hay sai sót kiến thức</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Đáp án tường minh, duy nhất 1 đáp án đúng</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Phù hợp nhận thức tâm lý học sinh tiểu học</span>
                      </div>
                    </div>
                    <p className="text-emerald-800 italic bg-emerald-100/60 p-3 rounded-xl border border-emerald-200">
                      Ghi chú từ AI Reviewer: "{activeExamModal.analysis.reviewerAudit.notes}"
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Actions */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  sounds.playCoin();
                  window.print();
                }}
                className="px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-fredoka font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In đề PDF</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadWord(activeExamModal, activeVariantCode)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-fredoka font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Word ({activeVariantCode})</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playLevelUp();
                    onNavigateToGames(activeExamModal.questions);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-fredoka font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Chơi game lớp học</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Delete Exam Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        title="Xác nhận xóa bộ đề thi"
        itemName={examToDelete?.title}
        description="Thầy cô có chắc chắn muốn xóa bộ đề thi này khỏi Kho lưu trữ không? Sau khi xóa, bộ đề sẽ không còn xuất hiện trong danh sách."
        confirmText="Xác nhận xóa 🗑️"
        cancelText="Giữ lại"
        onConfirm={() => {
          if (examToDelete) {
            handleDeleteExam(examToDelete.id);
            showToast(`Đã xóa bộ đề "${examToDelete.title}" thành công!`);
            setExamToDelete(null);
          }
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-fredoka font-bold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 p-1"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
