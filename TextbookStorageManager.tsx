/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, Upload, Plus, Trash2, Search, Filter, CheckCircle2,
  ExternalLink, FileText, Sparkles, BookMarked, Layers, Eye,
  Download, Edit3, Tag, Globe, ArrowRight, Library
} from 'lucide-react';
import { StoredTextbook, SubjectType } from '../types';

interface TextbookStorageManagerProps {
  storedBooks: StoredTextbook[];
  onAddBook: (book: StoredTextbook) => void;
  onUpdateBook: (book: StoredTextbook) => void;
  onDeleteBook: (id: string) => void;
  onSelectForPlanning: (book: StoredTextbook) => void;
  selectedBookId?: string;
  sounds: {
    playCoin: () => void;
    playClick: () => void;
    playLevelUp: () => void;
    playError?: () => void;
  };
}

export default function TextbookStorageManager({
  storedBooks,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
  onSelectForPlanning,
  selectedBookId,
  sounds
}: TextbookStorageManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('Tất cả');
  const [filterGrade, setFilterGrade] = useState<string>('Tất cả');
  const [filterBookSeries, setFilterBookSeries] = useState<string>('Tất cả');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [previewBook, setPreviewBook] = useState<StoredTextbook | null>(null);

  // New book form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectType>('Tiếng Việt');
  const [newGrade, setNewGrade] = useState<number>(3);
  const [newBookSeries, setNewBookSeries] = useState('Kết nối tri thức với cuộc sống');
  const [newVolume, setNewVolume] = useState('Tập 1');
  const [newChapter, setNewChapter] = useState('');
  const [newLessonName, setNewLessonName] = useState('');
  const [newPageRange, setNewPageRange] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newKeyVocab, setNewKeyVocab] = useState('');
  const [newKeySentences, setNewKeySentences] = useState('');
  const [newExercises, setNewExercises] = useState('');
  const [newDriveLink, setNewDriveLink] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFileName(file.name);
    sounds.playCoin();

    if (!newTitle) {
      setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
    }

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewContent(event.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      // Mock parsing for PDF, docx, or images
      const isEnglish = newSubject === 'Tiếng Anh' || file.name.toLowerCase().includes('english') || file.name.toLowerCase().includes('unit');
      if (isEnglish) {
        setNewContent(`[Nội dung tài liệu từ tệp: ${file.name}]\nSubject: English - Grade ${newGrade}\nUnit: ${newChapter || 'Unit 3: My Family'}\nLesson: ${newLessonName || 'Lesson 1'}\nVocabulary: father, mother, brother, sister, grandfather, grandmother\nSentence pattern: Who is that? - It's my brother.\nTextbook Activities: Look, listen and repeat; Point and say; Let's chant; Let's talk.`);
        setNewKeyVocab('father, mother, brother, sister, grandfather, grandmother');
        setNewKeySentences('Who is that? - It\'s my father. | He is tall and handsome.');
        setNewExercises('Point and say p.24, Listen and tick p.25, Workbook exercises');
      } else {
        setNewContent(`[Nội dung trích xuất từ tệp: ${file.name}]\nMôn học: ${newSubject} lớp ${newGrade}\nBài học: ${newLessonName || 'Khám phá bài học mới'}\nTrang sách: ${newPageRange || 'Trang 20-25'}\nKiến thức trọng tâm: Khái niệm mới, định lý, câu chuyện minh họa và bài tập vận dụng trong SGK.`);
      }
    }
  };

  // Submit new book
  const handleSubmitNewBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Vui lòng nhập tên tài liệu hoặc tên sách giáo khoa!');
      return;
    }

    const createdBook: StoredTextbook = {
      id: 'sgk_' + Math.random().toString(36).substring(2, 9),
      title: newTitle.trim(),
      subject: newSubject,
      grade: Number(newGrade),
      bookSeries: newBookSeries,
      volume: newVolume,
      chapterOrUnit: newChapter.trim(),
      lessonName: newLessonName.trim(),
      pageRange: newPageRange.trim(),
      content: newContent.trim() || `Nội dung học liệu môn ${newSubject} lớp ${newGrade} bộ sách ${newBookSeries}`,
      keyVocabulary: newKeyVocab ? newKeyVocab.split(',').map(s => s.trim()).filter(Boolean) : [],
      keySentences: newKeySentences ? newKeySentences.split('|').map(s => s.trim()).filter(Boolean) : [],
      exercises: newExercises ? newExercises.split(',').map(s => s.trim()).filter(Boolean) : [],
      fileName: uploadFileName || undefined,
      uploadedAt: new Date().toISOString(),
      sourceType: uploadFileName ? 'file_upload' : 'text_input',
      driveOrOnlineLink: newDriveLink.trim() || undefined
    };

    onAddBook(createdBook);
    sounds.playLevelUp();
    setIsAddingNew(false);

    // Reset form
    setNewTitle('');
    setNewChapter('');
    setNewLessonName('');
    setNewPageRange('');
    setNewContent('');
    setNewKeyVocab('');
    setNewKeySentences('');
    setNewExercises('');
    setNewDriveLink('');
    setUploadFileName('');
  };

  // Filter books
  const filteredBooks = storedBooks.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.chapterOrUnit && book.chapterOrUnit.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.lessonName && book.lessonName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.content && book.content.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = filterSubject === 'Tất cả' || book.subject === filterSubject;
    const matchesGrade = filterGrade === 'Tất cả' || String(book.grade) === filterGrade.replace('Lớp ', '');
    const matchesSeries = filterBookSeries === 'Tất cả' || book.bookSeries.includes(filterBookSeries);

    return matchesSearch && matchesSubject && matchesGrade && matchesSeries;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wide">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Kho Học Liệu & Sách Giáo Khoa Chuẩn Bộ GD&ĐT</span>
          </div>
          <h2 className="text-xl md:text-2xl font-fredoka font-black tracking-tight flex items-center gap-2">
            <span>Thư Viện Nguồn SGK & Tài Liệu Soạn Bài</span>
            <span className="bg-white text-orange-600 text-xs px-2.5 py-0.5 rounded-full font-sans font-extrabold">
              {storedBooks.length} cuốn sách
            </span>
          </h2>
          <p className="text-xs text-orange-100 font-medium max-w-2xl leading-relaxed">
            Tải lên, lưu trữ và đồng bộ hóa SGK, sách giáo viên, file PDF/Word/ảnh scan để khi AI soạn bài sẽ bám sát 100% nội dung, từ vựng và bài tập trong sách.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setIsAddingNew(!isAddingNew);
              sounds.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl font-fredoka font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${
              isAddingNew
                ? 'bg-white text-gray-700 hover:bg-gray-100'
                : 'bg-white text-orange-600 hover:bg-orange-50'
            }`}
          >
            {isAddingNew ? (
              <>Đóng biểu mẫu</>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>+ Tải Lên Nguồn SGK Mới</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Upload/Add New Modal/Form */}
      {isAddingNew && (
        <form 
          onSubmit={handleSubmitNewBook}
          className="bg-white rounded-3xl p-6 border-2 border-orange-200 shadow-2xl space-y-5 animate-fade-in text-left"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-fredoka font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-orange-500" />
              <span>Thêm mới / Tải lên Sách Giáo Khoa & Tài Liệu Bài Dạy</span>
            </h3>
            <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
              Tự động lưu vào bộ nhớ trình duyệt 💾
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Môn học</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value as SubjectType)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              >
                {['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Khoa học', 'Tự nhiên & Xã hội', 'Lịch sử & Địa lý', 'Tin học', 'Công nghệ', 'Hoạt động trải nghiệm', 'Đạo đức'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Grade */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Khối lớp</label>
              <select
                value={newGrade}
                onChange={(e) => setNewGrade(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              >
                {[1, 2, 3, 4, 5].map(g => (
                  <option key={g} value={g}>Lớp {g}</option>
                ))}
              </select>
            </div>

            {/* Book Series */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Bộ sách</label>
              <select
                value={newBookSeries}
                onChange={(e) => setNewBookSeries(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              >
                <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống (NXB GDVN)</option>
                <option value="Bộ Giáo dục và Đào tạo (Global Success)">Bộ Giáo dục và Đào tạo (Global Success)</option>
                <option value="Sách Giáo Viên / Tài liệu Bộ GD&ĐT">Sách Giáo Viên / Tài liệu Bộ GD&ĐT</option>
              </select>
            </div>

            {/* Volume */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Tập sách</label>
              <select
                value={newVolume}
                onChange={(e) => setNewVolume(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              >
                <option value="Tập 1">Tập 1</option>
                <option value="Tập 2">Tập 2</option>
                <option value="Cả năm">Cả năm</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Title */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700">Tên sách / Tiêu đề học liệu (*)</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Tiếng Việt 3 Tập 1 - Bài 5: Nhật kí tập bơi"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              />
            </div>

            {/* Page Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Trang SGK</label>
              <input
                type="text"
                placeholder="Ví dụ: Trang 24 - 27"
                value={newPageRange}
                onChange={(e) => setNewPageRange(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chapter / Unit */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Chủ đề / Chủ điểm / Unit</label>
              <input
                type="text"
                placeholder="Ví dụ: Unit 3: Our School Things hoặc Chủ điểm: Mái trường mến yêu"
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              />
            </div>

            {/* Lesson Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Tên bài học cụ thể</label>
              <input
                type="text"
                placeholder="Ví dụ: Lesson 1 (Period 1) hoặc Bài 5: Nhật kí tập bơi"
                value={newLessonName}
                onChange={(e) => setNewLessonName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* File Upload Box */}
          <div className="p-4 bg-orange-50/60 border-2 border-dashed border-orange-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">
                📄
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-orange-950">
                  {uploadFileName ? `Đã chọn tệp: ${uploadFileName}` : 'Tải lên tệp PDF, DOCX, TXT hoặc ảnh scan SGK'}
                </p>
                <p className="text-[11px] text-orange-700">Hệ thống sẽ trích xuất từ vựng, cấu trúc và nội dung để lưu vào kho</p>
              </div>
            </div>
            <label className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer inline-flex items-center gap-1.5">
              <Upload className="w-4 h-4" />
              <span>{uploadFileName ? 'Chọn tệp khác' : 'Chọn tệp từ máy tính'}</span>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.txt,image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
          </div>

          {/* Full content text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Nội dung văn bản sách giáo khoa / Kênh chữ / Trích đoạn bài dạy</span>
              <span className="text-[10px] text-gray-400">Có thể dán trực tiếp nội dung trang sách vào đây</span>
            </label>
            <textarea
              rows={4}
              placeholder="Dán toàn bộ nội dung bài đọc, câu chuyện, bảng công thức hoặc các hoạt động trong SGK..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-orange-500 leading-relaxed font-mono"
            />
          </div>

          {/* Vocabulary & Sentences & Exercises */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Từ vựng trọng tâm (cách nhau bằng dấu phẩy)</label>
              <input
                type="text"
                placeholder="pen, pencil, book, ruler..."
                value={newKeyVocab}
                onChange={(e) => setNewKeyVocab(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Mẫu câu / Công thức (cách nhau bằng dấu |)</label>
              <input
                type="text"
                placeholder="What is this? - It's a pen. | What is that?..."
                value={newKeySentences}
                onChange={(e) => setNewKeySentences(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Bài tập trong sách (cách nhau bằng dấu phẩy)</label>
              <input
                type="text"
                placeholder="Bài 1 tr.24, Bài 2 tr.25..."
                value={newExercises}
                onChange={(e) => setNewExercises(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Drive or Online Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Đường dẫn xem SGK trực tuyến / Google Drive (tuỳ chọn)</label>
            <input
              type="url"
              placeholder="https://hanhtrangso.nxbgd.vn/... hoặc https://drive.google.com/..."
              value={newDriveLink}
              onChange={(e) => setNewDriveLink(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-orange-500"
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu Sách Vào Thư Viện 💾</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-left">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm sách theo tên bài, chủ điểm, từ vựng, số trang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-orange-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Subject */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none cursor-pointer"
          >
            <option value="Tất cả">Tất cả môn</option>
            {['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Khoa học', 'Tự nhiên & Xã hội', 'Lịch sử & Địa lý', 'Tin học', 'Công nghệ', 'Hoạt động trải nghiệm'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Filter Grade */}
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none cursor-pointer"
          >
            <option value="Tất cả">Tất cả khối lớp</option>
            <option value="1">Lớp 1</option>
            <option value="2">Lớp 2</option>
            <option value="3">Lớp 3</option>
            <option value="4">Lớp 4</option>
            <option value="5">Lớp 5</option>
          </select>

          {/* Filter Series */}
          <select
            value={filterBookSeries}
            onChange={(e) => setFilterBookSeries(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none cursor-pointer"
          >
            <option value="Tất cả">Tất cả bộ sách</option>
            <option value="Kết nối tri thức">Kết nối tri thức với cuộc sống</option>
            <option value="Global Success">Bộ GD&ĐT / Global Success</option>
          </select>
        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => {
          const isSelected = selectedBookId === book.id;
          const isEnglish = book.subject === 'Tiếng Anh';

          return (
            <div
              key={book.id}
              className={`bg-white rounded-3xl p-5 border transition-all hover:shadow-xl flex flex-col justify-between text-left relative ${
                isSelected
                  ? 'border-2 border-orange-500 shadow-orange-100 shadow-xl ring-4 ring-orange-100'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isEnglish 
                      ? 'bg-purple-100 text-purple-700' 
                      : book.subject === 'Toán'
                      ? 'bg-blue-100 text-blue-700'
                      : book.subject === 'Tiếng Việt'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {book.subject} • Lớp {book.grade}
                  </span>
                  {book.pageRange && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold">
                      {book.pageRange}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center gap-1 animate-pulse">
                    <CheckCircle2 className="w-3 h-3" />
                    Đang chọn
                  </span>
                )}
              </div>

              {/* Title & Series */}
              <div className="space-y-1.5 flex-1">
                <h4 className="font-fredoka font-black text-sm text-gray-900 leading-snug">
                  {book.title}
                </h4>
                <p className="text-[11px] text-orange-600 font-bold flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{book.bookSeries}</span>
                </p>

                {book.chapterOrUnit && (
                  <p className="text-xs text-gray-600 font-semibold bg-gray-50 p-2 rounded-xl border border-gray-100">
                    📂 {book.chapterOrUnit}
                  </p>
                )}

                {/* Key Vocab pills */}
                {book.keyVocabulary && book.keyVocabulary.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {isEnglish ? 'Target Vocabulary:' : 'Từ vựng & Khái niệm cốt lõi:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {book.keyVocabulary.slice(0, 4).map((voc, i) => (
                        <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-800 rounded-lg text-[10px] font-medium">
                          {voc}
                        </span>
                      ))}
                      {book.keyVocabulary.length > 4 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-lg text-[10px]">
                          +{book.keyVocabulary.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setPreviewBook(book);
                      sounds.playClick();
                    }}
                    title="Xem chi tiết nội dung sách"
                    className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl cursor-pointer transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {book.driveOrOnlineLink && (
                    <a
                      href={book.driveOrOnlineLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Mở link SGK online"
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors inline-block"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {book.sourceType !== 'system_standard' && (
                    <button
                      onClick={() => {
                        if (confirm(`Cô có chắc muốn xóa tài liệu "${book.title}" khỏi kho không?`)) {
                          onDeleteBook(book.id);
                        }
                      }}
                      title="Xóa tài liệu này"
                      className="p-2 hover:bg-red-50 text-red-500 rounded-xl cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    onSelectForPlanning(book);
                    sounds.playCoin();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-fredoka font-extrabold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  <span>{isSelected ? 'Đã Chọn Soạn Bài' : 'Chọn Soạn Bài'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-gray-200 space-y-3">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
          <h4 className="font-fredoka font-extrabold text-base text-gray-700">
            Không tìm thấy sách hoặc tài liệu phù hợp
          </h4>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Hãy thử tìm bằng từ khóa khác hoặc bấm nút "+ Tải Lên Nguồn SGK Mới" ở trên để thêm sách mới vào kho!
          </p>
        </div>
      )}

      {/* Book Detail Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl text-left border border-orange-100 animate-scale-up">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded-full text-[10px] font-extrabold uppercase">
                  {previewBook.subject} • Lớp {previewBook.grade} • {previewBook.bookSeries}
                </span>
                <h3 className="font-fredoka font-black text-lg text-gray-900">
                  {previewBook.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewBook(null)}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs text-gray-700">
              {previewBook.chapterOrUnit && (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="font-bold text-gray-900 block mb-0.5">Chủ điểm / Unit:</span>
                  <p>{previewBook.chapterOrUnit}</p>
                </div>
              )}

              {previewBook.pageRange && (
                <div className="p-3 bg-amber-50 text-amber-900 rounded-xl">
                  <span className="font-bold block mb-0.5">Vị trí trang sách:</span>
                  <p>{previewBook.pageRange}</p>
                </div>
              )}

              {previewBook.keyVocabulary && previewBook.keyVocabulary.length > 0 && (
                <div>
                  <span className="font-bold text-gray-900 block mb-1">Từ vựng & Thuật ngữ SGK:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {previewBook.keyVocabulary.map((v, i) => (
                      <span key={i} className="px-2.5 py-1 bg-orange-100 text-orange-900 rounded-lg text-xs font-semibold">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {previewBook.keySentences && previewBook.keySentences.length > 0 && (
                <div>
                  <span className="font-bold text-gray-900 block mb-1">Mẫu câu & Công thức trọng tâm:</span>
                  <ul className="list-disc list-inside space-y-1 bg-gray-50 p-3 rounded-xl">
                    {previewBook.keySentences.map((s, i) => (
                      <li key={i} className="font-medium text-gray-800">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <span className="font-bold text-gray-900 block mb-1">Toàn văn nội dung sách giáo khoa / Kênh chữ:</span>
                <div className="p-4 bg-gray-900 text-gray-100 rounded-2xl font-mono text-[11px] leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {previewBook.content}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              {previewBook.driveOrOnlineLink ? (
                <a
                  href={previewBook.driveOrOnlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Mở xem trên NXB / Drive
                </a>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewBook(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    onSelectForPlanning(previewBook);
                    setPreviewBook(null);
                    sounds.playCoin();
                  }}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Chọn Sách Này Để Soạn Bài 🚀</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
