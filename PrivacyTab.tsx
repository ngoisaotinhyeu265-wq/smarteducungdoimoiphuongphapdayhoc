import React from 'react';
import { Layers } from 'lucide-react';

interface PrivacyTabProps {
  privacyNoTraining: boolean;
  setPrivacyNoTraining: (val: boolean) => void;
  privacyEncrypted: boolean;
  setPrivacyEncrypted: (val: boolean) => void;
  handleDeleteAllData: () => void;
  sounds: {
    playCoin: () => void;
    playClick: () => void;
  };
}

export default function PrivacyTab({
  privacyNoTraining,
  setPrivacyNoTraining,
  privacyEncrypted,
  setPrivacyEncrypted,
  handleDeleteAllData,
  sounds
}: PrivacyTabProps) {
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="bg-white rounded-3xl p-6 border border-indigo-50 shadow-md">
        <h3 className="font-fredoka text-lg font-extrabold text-indigo-950 flex items-center gap-1.5">
          <Layers className="w-5 h-5 text-indigo-600 animate-pulse" />
          <span>Chính sách Bảo mật & Quyền riêng tư dữ liệu Giáo viên (GDPR Compliance)</span>
        </h3>
        <p className="text-xs text-gray-400 font-bold font-sans">
          Chúng tôi bảo vệ quyền sở hữu trí tuệ giáo án và dữ liệu cá nhân của thầy cô theo đúng tiêu chuẩn bảo vệ dữ liệu giáo dục GDPR & Local Education Act.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* General Privacy parameters */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-5 text-left">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-900">🔒 Quyền kiểm soát dữ liệu cá nhân của thầy cô</h4>
          
          <div className="space-y-4">
            
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={privacyNoTraining}
                onChange={(e) => {
                  sounds.playCoin();
                  setPrivacyNoTraining(e.target.checked);
                }}
                className="rounded text-indigo-600 w-4 h-4 mt-0.5"
              />
              <div>
                <p className="font-fredoka font-extrabold text-xs text-gray-800">Không sử dụng giáo án của tôi để huấn luyện AI (No Training Policy)</p>
                <p className="text-[10px] text-gray-400 font-bold font-sans mt-0.5">Kích hoạt tùy chọn này để ngăn chặn bất kỳ nội dung tài liệu nào tải lên từ việc bị ghi lại cho mục đích huấn luyện mô hình Generative AI lớn.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer select-none pt-3 border-t border-gray-50">
              <input
                type="checkbox"
                checked={privacyEncrypted}
                onChange={(e) => {
                  sounds.playCoin();
                  setPrivacyEncrypted(e.target.checked);
                }}
                className="rounded text-indigo-600 w-4 h-4 mt-0.5"
              />
              <div>
                <p className="font-fredoka font-extrabold text-xs text-gray-800">Mã hóa bộ nhớ đệm lưu trữ cá nhân (AES-256 Storage)</p>
                <p className="text-[10px] text-gray-400 font-bold font-sans mt-0.5">Tự động mã hóa bảo vệ các giáo án lưu trong Thư viện cá nhân trước khi lưu trữ vào bộ nhớ thiết bị nhằm chống rò rỉ.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Compliance information + Wipe button */}
        <div className="bg-white rounded-[32px] p-6 border border-red-100 shadow-xl space-y-5 text-left">
          <h4 className="font-fredoka text-base font-extrabold text-red-800">⚠️ Vùng nguy hiểm & Quyền bị lãng quên (GDPR Article 17)</h4>
          <p className="text-xs text-gray-500 font-sans font-medium leading-relaxed">
            Theo quy định bảo mật quyền riêng tư giáo dục, thầy cô có toàn quyền yêu cầu xóa vĩnh viễn toàn bộ dấu vết giáo án, các bản thảo cũ, lịch sử cải tiến hay quy chuẩn tùy chỉnh ngay lập tức.
          </p>

          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-xs text-red-950 font-semibold space-y-1">
            <p>✓ Thao tác này KHÔNG THỂ KHÔI PHỤC.</p>
            <p>✓ Toàn bộ Thư viện lưu trữ sẽ bị dọn dẹp trống rỗng.</p>
            <p>✓ Thiết lập quy chuẩn (Rule Engine) của cô sẽ quay về mặc định ban đầu.</p>
          </div>

          <button
            onClick={handleDeleteAllData}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-md cursor-pointer text-center"
          >
            Xóa vĩnh viễn toàn bộ dữ liệu & Lịch sử biên tập 🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
