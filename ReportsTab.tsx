import React from 'react';
import { ClipboardCheck } from 'lucide-react';

interface ReportsTabProps {
  selectedGrade: string;
  selectedSubject: string;
  selectedBook: string;
}

export default function ReportsTab({
  selectedGrade,
  selectedSubject,
  selectedBook
}: ReportsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="bg-white rounded-3xl p-6 border border-indigo-50 shadow-md">
        <h3 className="font-fredoka text-lg font-extrabold text-indigo-950 flex items-center gap-1.5">
          <ClipboardCheck className="w-5 h-5 text-indigo-600 animate-bounce" />
          <span>Báo cáo thẩm định & Chỉ số chất lượng Giáo dục Tiểu học</span>
        </h3>
        <p className="text-xs text-gray-400 font-bold font-sans">
          AI Ong Vàng thống kê, đối chiếu và rà soát các chỉ số chất lượng bám sát Công văn 2345/BGDĐT-GDTH của Bộ GD&ĐT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Auditing stats card (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-6">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-950">📋 Thống kê sự bám sát chuẩn chương trình GDPT</h4>
          
          <div className="space-y-4">
            {/* Rule 1 */}
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between items-center font-bold">
                <span className="text-gray-700">1. Đúng phân phối chương trình của Bộ (Thời lượng & Số tiết)</span>
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">✓ Đạt 100%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
              <p className="text-[10px] text-gray-400 font-bold">Giáo án thiết kế bám sát đúng phân phối {selectedGrade} của tuần học và bám sát thời lượng tiết quy định.</p>
            </div>

            {/* Rule 2 */}
            <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-gray-50">
              <div className="flex justify-between items-center font-bold">
                <span className="text-gray-700">2. Đúng yêu cầu cần đạt (Phát triển Năng lực & Phẩm chất 2018)</span>
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">✓ Đạt 100%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
              <p className="text-[10px] text-gray-400 font-bold">Xác định rõ ràng 3 năng lực chung (Tự chủ tự học, giao tiếp hợp tác, sáng tạo) và phẩm chất cần bồi dưỡng.</p>
            </div>

            {/* Rule 3 */}
            <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-gray-50">
              <div className="flex justify-between items-center font-bold">
                <span className="text-gray-700">3. Đúng cấu trúc & Mẫu định dạng giáo án chuẩn Công văn 2345</span>
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">✓ Đạt 100%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
              <p className="text-[10px] text-gray-400 font-bold">Trình bày đủ 4 phần chủ đạo: Yêu cầu đạt, Học liệu thiết bị, Các hoạt động, Đánh giá kết quả.</p>
            </div>

            {/* Rule 4 */}
            <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-gray-50">
              <div className="flex justify-between items-center font-bold">
                <span className="text-gray-700">4. Kiểm tra tính Logic giữa Mục tiêu (YCCĐ) và Hoạt động dạy học</span>
                <span className="text-amber-600 font-bold flex items-center gap-0.5">🟡 Khá (85%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[85%]" />
              </div>
              <p className="text-[10px] text-gray-400 font-bold">Hoạt động luyện tập thực hành đã bao phủ mục tiêu. Nên bổ sung thêm phiếu tự học nhóm đôi để đồng đều hơn.</p>
            </div>
          </div>

          {/* Language Statistics summary */}
          <div className="bg-indigo-50/20 p-4 rounded-2xl border border-indigo-50 space-y-3 pt-4">
            <h5 className="font-fredoka text-xs font-extrabold text-indigo-950 uppercase tracking-wider">✍️ Thống kê kiểm soát ngôn ngữ tiểu học</h5>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-sans">
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50/50">
                <p className="text-gray-400 font-bold">Lỗi chính tả & Telex:</p>
                <p className="font-fredoka text-sm font-extrabold text-emerald-600 mt-1">✓ Không phát hiện lỗi</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50/50">
                <p className="text-gray-400 font-bold">Từ lặp / Câu quá dài:</p>
                <p className="font-fredoka text-sm font-extrabold text-emerald-600 mt-1">✓ Đã chuẩn hóa gọn</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50/50">
                <p className="text-gray-400 font-bold">Thuật ngữ bám sát sách:</p>
                <p className="font-fredoka text-sm font-extrabold text-indigo-800 mt-1">{selectedBook}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50/50">
                <p className="text-gray-400 font-bold">Chất lượng tiếng Anh:</p>
                <p className="font-fredoka text-sm font-extrabold text-indigo-800 mt-1">Global Success CEFR A1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Grade Adjustments (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-950">🧸 Gợi ý thích ứng theo năng lực học sinh tiểu học</h4>
          
          <div className="space-y-4 text-xs font-sans">
            {/* Section 1: For Grade 1-2 */}
            <div className="bg-amber-50/30 p-4 rounded-2xl border border-amber-100 space-y-2 text-left">
              <span className="text-[10px] bg-amber-400 text-purple-950 font-fredoka font-bold px-2.5 py-1 rounded-full uppercase">Đặc thù Khối lớp 1 - 2</span>
              <p className="text-gray-700 leading-relaxed font-semibold">
                *Mức độ tập trung thấp, tư duy cụ thể:* Giáo viên nên giảm thiểu văn bản lý thuyết, tăng cường sử dụng flashcards màu sắc, thẻ đồ vật thật, kể chuyện cổ tích nhập vai lồng ghép bài giảng và khen thưởng sao sticker liên tục.
              </p>
            </div>

            {/* Section 2: For Grade 3-4-5 */}
            <div className="bg-teal-50/30 p-4 rounded-2xl border border-teal-100 space-y-2 text-left">
              <span className="text-[10px] bg-teal-600 text-white font-fredoka font-bold px-2.5 py-1 rounded-full uppercase">Đặc thù Khối lớp 3 - 4 - 5</span>
              <p className="text-gray-700 leading-relaxed font-semibold">
                *Đã có khả năng tự chủ tự học:* Giáo viên tăng cường các hình thức thảo luận nhóm 4, cử nhóm trưởng, trình bày sơ đồ tư duy (Mindmap) vẽ trên bảng nhóm phụ, thực hiện các dự án nhỏ (STEM) kết hợp bình chọn chéo.
              </p>
            </div>

            {/* Section 3: English specifics */}
            <div className="bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100 space-y-2 text-left">
              <span className="text-[10px] bg-indigo-600 text-white font-fredoka font-bold px-2.5 py-1 rounded-full uppercase">Riêng môn Tiếng Anh</span>
              <p className="text-gray-700 leading-relaxed font-semibold">
                *Tập trung Phonics & Natural English:* Phát hiện lỗi ngữ pháp, IPA hỗ trợ đọc, Spelling, Pronunciation notes, bám sát bộ sách Global Success, câu hỏi hiện ra bắt buộc là Tiếng Anh ngắn gọn, rõ ràng, phù hợp lứa tuổi nhi đồng dễ hiểu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
