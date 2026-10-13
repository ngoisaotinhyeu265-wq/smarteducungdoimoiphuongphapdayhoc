import React from 'react';
import { Sliders, ClipboardCheck, Award, Languages, GraduationCap } from 'lucide-react';

interface CurriculumRules {
  moet2345: string;
  ctgdpt2018: string;
  englishGlobalSuccess: string;
  gradeDifficulty: string;
}

interface RulesTabProps {
  curriculumRules: CurriculumRules;
  handleUpdateRules: (field: keyof CurriculumRules, val: string) => void;
}

export default function RulesTab({
  curriculumRules,
  handleUpdateRules
}: RulesTabProps) {
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="bg-white rounded-3xl p-6 border border-indigo-50 shadow-md">
        <h3 className="font-fredoka text-lg font-extrabold text-indigo-950 flex items-center gap-1.5">
          <Sliders className="w-5 h-5 text-indigo-600 animate-spin-slow" />
          <span>Cấu hình Quy phạm & Quy chuẩn Sư phạm (Rule Engine)</span>
        </h3>
        <p className="text-xs text-gray-400 font-bold font-sans">
          Thay đổi hướng dẫn, thông tư, công văn của Bộ GD&ĐT hay của Trường học mà không cần can thiệp hay sửa đổi mã nguồn phần mềm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Box 1: CV 2345 */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-3 text-left">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-900 flex items-center gap-1.5">
            <ClipboardCheck className="w-5 h-5 text-indigo-600" />
            <span>Công văn 2345/BGDĐT-GDTH</span>
          </h4>
          <p className="text-xs text-gray-400 font-bold font-sans">Cấu trúc khung kế hoạch bài dạy quy chuẩn cho cấp tiểu học Việt Nam.</p>
          <textarea
            value={curriculumRules.moet2345}
            onChange={(e) => handleUpdateRules('moet2345', e.target.value)}
            className="w-full h-36 p-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl outline-none text-xs text-gray-700 font-sans leading-relaxed"
          />
          <button
            onClick={() => handleUpdateRules('moet2345', curriculumRules.moet2345)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl cursor-pointer"
          >
            Lưu quy chuẩn CV 2345 💾
          </button>
        </div>

        {/* Box 2: CTGDPT 2018 */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-3 text-left">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-900 flex items-center gap-1.5">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Chương trình GDPT 2018</span>
          </h4>
          <p className="text-xs text-gray-400 font-bold font-sans">Các phẩm chất chủ yếu và năng lực chung cần đạt theo thông tư định hướng phát triển học sinh.</p>
          <textarea
            value={curriculumRules.ctgdpt2018}
            onChange={(e) => handleUpdateRules('ctgdpt2018', e.target.value)}
            className="w-full h-36 p-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl outline-none text-xs text-gray-700 font-sans leading-relaxed"
          />
          <button
            onClick={() => handleUpdateRules('ctgdpt2018', curriculumRules.ctgdpt2018)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl cursor-pointer"
          >
            Lưu quy chuẩn GDPT 2018 💾
          </button>
        </div>

        {/* Box 3: English Global Success Standards */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-3 text-left">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-900 flex items-center gap-1.5">
            <Languages className="w-5 h-5 text-indigo-600" />
            <span>English Global Success (Sách của Bộ)</span>
          </h4>
          <p className="text-xs text-gray-400 font-bold font-sans">Cấu trúc từ vựng, ngữ pháp, phonics bám sát CEFR A1 cấp tiểu học Việt Nam.</p>
          <textarea
            value={curriculumRules.englishGlobalSuccess}
            onChange={(e) => handleUpdateRules('englishGlobalSuccess', e.target.value)}
            className="w-full h-36 p-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl outline-none text-xs text-gray-700 font-sans leading-relaxed"
          />
          <button
            onClick={() => handleUpdateRules('englishGlobalSuccess', curriculumRules.englishGlobalSuccess)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl cursor-pointer"
          >
            Lưu quy chuẩn Global Success 💾
          </button>
        </div>

        {/* Box 4: Grade difficulty parameters */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-3 text-left">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-900 flex items-center gap-1.5">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>Tham số phân độ khó Khối lớp 1 - 5</span>
          </h4>
          <p className="text-xs text-gray-400 font-bold font-sans">Quy định cách thiết kế học liệu trực quan, thời gian chơi game, mức độ vận động phù hợp lứa tuổi.</p>
          <textarea
            value={curriculumRules.gradeDifficulty}
            onChange={(e) => handleUpdateRules('gradeDifficulty', e.target.value)}
            className="w-full h-36 p-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl outline-none text-xs text-gray-700 font-sans leading-relaxed"
          />
          <button
            onClick={() => handleUpdateRules('gradeDifficulty', curriculumRules.gradeDifficulty)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl cursor-pointer"
          >
            Lưu quy chuẩn Khối lớp 💾
          </button>
        </div>
      </div>
    </div>
  );
}
