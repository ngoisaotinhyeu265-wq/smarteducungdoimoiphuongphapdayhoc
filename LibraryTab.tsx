import React from 'react';
import { BookOpen, Save, Trash2, Sparkles, FileText, RotateCcw, PlusCircle, Gamepad2, Trophy, Flame, ShieldAlert, CheckCircle } from 'lucide-react';

interface LibraryTabProps {
  compareSourceId: string;
  setCompareSourceId: (val: string) => void;
  compareTargetId: string;
  setCompareTargetId: (val: string) => void;
  editHistory: any[];
  lessonPlan: any;
  handleSaveLesson: () => void;
  handleDeleteHistoryItem: (id: string) => void;
  handleLoadHistory: (item: any) => void;
  sounds: {
    playCoin: () => void;
    playClick: () => void;
    playLevelUp: () => void;
  };
  gameSubject?: string;
  setGameSubject?: (val: string) => void;
  gameNameInput?: string;
  setGameNameInput?: (val: string) => void;
  gamePhase: string;
  setGamePhase: (val: string) => void;
  gameDuration: string;
  setGameDuration: (val: string) => void;
  gameForm: string;
  setGameForm: (val: string) => void;
  gameActivityLevel: string;
  setGameActivityLevel: (val: string) => void;
  gameCondition: string;
  setGameCondition: (val: string) => void;
  handleGenerateCustomGame: () => void;
  customGameGenerated: any;
  isGeneratingCustomGame: boolean;
}

export default function LibraryTab({
  compareSourceId,
  setCompareSourceId,
  compareTargetId,
  setCompareTargetId,
  editHistory,
  lessonPlan,
  handleSaveLesson,
  handleDeleteHistoryItem,
  handleLoadHistory,
  sounds,
  gameSubject = 'Tiếng Anh',
  setGameSubject,
  gameNameInput = '',
  setGameNameInput,
  gamePhase,
  setGamePhase,
  gameDuration,
  setGameDuration,
  gameForm,
  setGameForm,
  gameActivityLevel,
  setGameActivityLevel,
  gameCondition,
  setGameCondition,
  handleGenerateCustomGame,
  customGameGenerated,
  isGeneratingCustomGame
}: LibraryTabProps) {
  const isEnglishSubject = gameSubject === 'Tiếng Anh';

  const englishGameSuggestions = [
    'Simon Says',
    'Mystery Box',
    'Whispering Chain',
    'Slap the Board',
    'Pass the Ball & Chant',
    'Musical Statues',
    'Word Bingo Relay',
    'Flashcard Run & Touch'
  ];

  const vietnameseGameSuggestions = [
    'Rung Chuông Vàng',
    'Ai Nhanh Ai Đúng',
    'Tiếp Sức Giải Đố',
    'Nối Từ Nhanh',
    'Ong Vàng Tìm Mật',
    'Vòng Quay Kỳ Diệu',
    'Truy Tìm Kho Báu'
  ];

  const currentSuggestions = isEnglishSubject ? englishGameSuggestions : vietnameseGameSuggestions;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Header Action bar */}
      <div className="bg-white rounded-3xl p-5 border border-indigo-50 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-fredoka text-lg font-extrabold text-indigo-950 flex items-center gap-1.5">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Thư viện Giáo án & Nhật ký Biên tập cá nhân</span>
          </h3>
          <p className="text-xs text-gray-400 font-bold font-sans">
            Lưu trữ các phiên bản giáo án, đối chiếu sự khác biệt giữa các lần chỉnh sửa và thiết kế trò chơi tương thích.
          </p>
        </div>
        
        {lessonPlan ? (
          <button
            onClick={handleSaveLesson}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Giáo án hiện tại vào Thư viện 💾</span>
          </button>
        ) : (
          <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-3 py-1.5 rounded-full uppercase">
            Chưa có giáo án đang biên soạn để lưu
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Saved History List (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-4">
          <h4 className="font-fredoka text-base font-extrabold text-indigo-950 flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-indigo-600" />
            <span>Lịch sử các phiên bản đã lưu ({editHistory.length})</span>
          </h4>
          
          {editHistory.length === 0 ? (
            <div className="p-8 text-center text-gray-400 space-y-2 border-2 border-dashed border-gray-100 rounded-2xl">
              <span className="text-4xl block">📦</span>
              <p className="text-xs font-bold font-sans">Thư viện trống. Hãy bắt đầu phân tích và lưu trữ các phiên bản giáo án của cô nhé!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {editHistory.map(hist => {
                if (!hist) return null;
                return (
                  <div key={hist.id || Math.random()} className="bg-gray-50 hover:bg-indigo-50/20 border border-gray-100 rounded-2xl p-4 flex justify-between items-center transition-all group">
                    <div className="space-y-1">
                      <p className="font-fredoka text-xs font-extrabold text-indigo-950">{hist.lessonName || hist.topic || 'Giáo án'}</p>
                      <div className="flex gap-2 text-[10px] text-gray-400 font-sans font-semibold">
                        <span>Môn: {hist.subject || 'Tổng hợp'} ({hist.grade || 'Tiểu học'})</span>
                        <span>•</span>
                        <span>Lưu lúc: {hist.timestamp || 'Chưa rõ'}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleLoadHistory(hist)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-[10px] rounded-lg shadow-sm cursor-pointer"
                      >
                        Nạp biên tập 📥
                      </button>
                      <button
                        onClick={() => handleDeleteHistoryItem(hist.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg cursor-pointer transition-all"
                        title="Xóa phiên bản này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Version Diff comparator */}
          {editHistory.length >= 2 && (
            <div className="border-t border-gray-100 pt-5 space-y-4">
              <div className="space-y-1">
                <h4 className="font-fredoka text-xs font-extrabold text-teal-800 uppercase tracking-wider">⚖️ Đối chiếu so sánh hai phiên bản (Diff Comparator)</h4>
                <p className="text-[10px] text-gray-400 font-bold font-sans">Chọn hai thời điểm khác nhau để so sánh các điểm cải tiến của giáo án.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-600 font-sans">Bản gốc (Trước):</span>
                  <select
                    value={compareSourceId}
                    onChange={(e) => setCompareSourceId(e.target.value)}
                    className="w-full p-2 border border-teal-100 rounded-xl outline-none bg-white font-sans text-xs shadow-sm"
                  >
                    <option value="">-- Chọn bản gốc --</option>
                    {editHistory.map(hist => (
                      <option key={hist?.id} value={hist?.id}>{hist?.timestamp} - {hist?.lessonName || 'Giáo án'}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-600 font-sans">Bản sửa đổi (Sau):</span>
                  <select
                    value={compareTargetId}
                    onChange={(e) => setCompareTargetId(e.target.value)}
                    className="w-full p-2 border border-teal-100 rounded-xl outline-none bg-white font-sans text-xs shadow-sm"
                  >
                    <option value="">-- Chọn bản sửa đổi --</option>
                    {editHistory.map(hist => (
                      <option key={hist?.id} value={hist?.id}>{hist?.timestamp} - {hist?.lessonName || 'Giáo án'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {compareSourceId && compareTargetId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="bg-red-50/40 p-4 rounded-2xl border border-red-100 text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-red-100 pb-2">
                      <span className="font-fredoka text-xs font-extrabold text-red-800">Bản Trước cải tiến 🔴</span>
                      <span className="text-[10px] text-gray-400 font-sans">
                        {editHistory.find(h => h?.id === compareSourceId)?.timestamp}
                      </span>
                    </div>
                    <div className="text-xs font-sans text-gray-700 space-y-2 leading-relaxed">
                      <p className="font-extrabold font-fredoka text-gray-900">Mục tiêu yêu cầu cần đạt:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {(editHistory.find(h => h?.id === compareSourceId)?.plan?.objectives || []).map((obj: string, i: number) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                      <p className="font-extrabold font-fredoka text-gray-900 mt-2">
                        Hoạt động chính ({(editHistory.find(h => h?.id === compareSourceId)?.plan?.activities || []).length}):
                      </p>
                      <div className="space-y-1">
                        {(editHistory.find(h => h?.id === compareSourceId)?.plan?.activities || []).map((act: any, i: number) => (
                          <p key={i}>• <strong>{act?.name} ({act?.duration}):</strong> {act?.description ? act.description.substring(0, 70) : ''}...</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                      <span className="font-fredoka text-xs font-extrabold text-emerald-800">Bản Sau cải tiến 🟢</span>
                      <span className="text-[10px] text-gray-400 font-sans">
                        {editHistory.find(h => h?.id === compareTargetId)?.timestamp}
                      </span>
                    </div>
                    <div className="text-xs font-sans text-gray-700 space-y-2 leading-relaxed">
                      <p className="font-extrabold font-fredoka text-gray-900">Mục tiêu yêu cầu cần đạt:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {(editHistory.find(h => h?.id === compareTargetId)?.plan?.objectives || []).map((obj: string, i: number) => (
                          <li key={i} className="text-emerald-950 font-medium bg-emerald-100/30 px-1 rounded">{obj}</li>
                        ))}
                      </ul>
                      <p className="font-extrabold font-fredoka text-gray-900 mt-2">
                        Hoạt động chính ({(editHistory.find(h => h?.id === compareTargetId)?.plan?.activities || []).length}):
                      </p>
                      <div className="space-y-1">
                        {(editHistory.find(h => h?.id === compareTargetId)?.plan?.activities || []).map((act: any, i: number) => (
                          <p key={i} className="text-emerald-950 font-medium">
                            • <strong>{act?.name} ({act?.duration}):</strong> {act?.description ? act.description.substring(0, 70) : ''}...
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Right: AI Physical/Movement Game Designer (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl space-y-5 text-left">
            <div className="flex items-center justify-between">
              <h4 className="font-fredoka text-base font-extrabold text-teal-800 flex items-center gap-1.5">
                <Gamepad2 className="w-5 h-5 text-teal-600 animate-pulse" />
                <span>🤸 AI Game & Movement Designer</span>
              </h4>
              {isEnglishSubject ? (
                <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2.5 py-1 rounded-full border border-blue-200">
                  🇬🇧 100% English Rules Mode
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full border border-emerald-200">
                  🇻🇳 Chế độ Tiếng Việt
                </span>
              )}
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-100/80 text-xs text-teal-950 space-y-2">
              <p className="font-bold">Thiết kế trò chơi sư phạm & vận động tương thích bài học:</p>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed font-sans">
                {isEnglishSubject 
                  ? 'Khi chọn môn Tiếng Anh: Toàn bộ kịch bản và Luật chơi (Game Rules) được tạo 100% bằng Tiếng Anh ngắn gọn, rõ ràng, dễ hiểu cho học sinh tiểu học.' 
                  : 'Chọn môn học và nhập tên trò chơi, AI sẽ lên kế hoạch chi tiết kịch bản, luật chơi, thang điểm và phương án dự phòng.'}
              </p>
            </div>

            <div className="space-y-3.5 bg-amber-50/40 p-4 rounded-2xl border border-amber-100 text-xs">
              
              {/* Row 1: Chọn môn học & Giai đoạn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <span>📚 Môn học (Subject):</span>
                  </span>
                  <select
                    value={gameSubject}
                    onChange={(e) => {
                      if (setGameSubject) setGameSubject(e.target.value);
                      if (e.target.value === 'Tiếng Anh' && setGameNameInput && (!gameNameInput || gameNameInput.includes('Đấu Trường'))) {
                        setGameNameInput('Simon Says & Quick Flashcard Touch');
                      } else if (e.target.value !== 'Tiếng Anh' && setGameNameInput && gameNameInput.includes('Simon')) {
                        setGameNameInput('Rung Chuông Vàng & Tiếp Sức');
                      }
                    }}
                    className="w-full p-2.5 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs font-semibold"
                  >
                    <option value="Tiếng Anh">🇬🇧 Tiếng Anh (English - 100% Rules)</option>
                    <option value="Toán">📐 Toán</option>
                    <option value="Tiếng Việt">📖 Tiếng Việt</option>
                    <option value="Tự nhiên & Xã hội">🌿 Tự nhiên & Xã hội</option>
                    <option value="Khoa học">🔬 Khoa học</option>
                    <option value="Lịch sử & Địa lý">🗺️ Lịch sử & Địa lý</option>
                    <option value="Đạo đức">💖 Đạo đức</option>
                    <option value="Hoạt động trải nghiệm">🎒 Hoạt động trải nghiệm</option>
                    <option value="Tin học">💻 Tin học & Công nghệ</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-amber-900">Tiến trình hoạt động</span>
                  <select
                    value={gamePhase}
                    onChange={(e) => setGamePhase(e.target.value)}
                    className="w-full p-2.5 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs"
                  >
                    <option value="Warm-up & Review (Khởi động)">1. Khởi động (Warm-up & Review) 🔥</option>
                    <option value="Knowledge Discovery (Hình thành kiến thức)">2. Khám phá (Knowledge Discovery) 🧠</option>
                    <option value="Practice (Luyện tập thực hành)">3. Luyện tập (Practice & Drills) 📐</option>
                    <option value="Application/Wrap-up (Vận dụng trải nghiệm)">4. Vận dụng (Application/Wrap-up) 🎒</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Nhập tên trò chơi (Game Name Input) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <span>🎮 Tên trò chơi (Game Name):</span>
                    <span className="text-[10px] text-amber-600 font-normal">*(AI hình thành kịch bản dựa vào tên)*</span>
                  </span>
                </div>
                <input
                  type="text"
                  value={gameNameInput}
                  onChange={(e) => setGameNameInput && setGameNameInput(e.target.value)}
                  placeholder={isEnglishSubject ? "Enter game name: Simon Says, Mystery Box, Whispering Chain, Slap the Board..." : "Nhập tên trò chơi: Rung Chuông Vàng, Ai Nhanh Ai Đúng, Ong Vàng Tìm Mật..."}
                  className="w-full p-2.5 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs shadow-inner font-medium text-gray-800 placeholder-gray-400"
                />

                {/* Quick suggestions tags */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] text-amber-700 font-bold">Gợi ý tên trò chơi hay:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (setGameNameInput) setGameNameInput(sug);
                          sounds.playClick();
                        }}
                        className="text-[10px] bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                      >
                        +{sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Thời lượng, Hình thức, Vận động */}
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <span className="font-bold text-amber-900">Thời lượng</span>
                  <select
                    value={gameDuration}
                    onChange={(e) => setGameDuration(e.target.value)}
                    className="w-full p-2 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs"
                  >
                    <option value="3 phút">3 phút</option>
                    <option value="5 phút">5 phút</option>
                    <option value="7 phút">7 phút</option>
                    <option value="10 phút">10 phút</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-amber-900">Hình thức</span>
                  <select
                    value={gameForm}
                    onChange={(e) => setGameForm(e.target.value)}
                    className="w-full p-2 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs"
                  >
                    <option value="Cá nhân (Individual)">Cá nhân</option>
                    <option value="Nhóm đôi (Pairs)">Nhóm đôi</option>
                    <option value="Nhóm 4-6 em (Group work)">Nhóm 4-6 em</option>
                    <option value="Toàn lớp (Whole class)">Cả lớp</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-amber-900">Mức độ vận động</span>
                  <select
                    value={gameActivityLevel}
                    onChange={(e) => setGameActivityLevel(e.target.value)}
                    className="w-full p-2 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs"
                  >
                    <option value="Tại chỗ ngồi (Sitting/TPR)">Tại chỗ ngồi</option>
                    <option value="Di chuyển nhẹ (Light Movement)">Di chuyển nhẹ</option>
                    <option value="Vận động sôi nổi (High Energy TPR)">Vận động sôi nổi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-amber-900">Điều kiện cơ sở vật chất</span>
                <select
                  value={gameCondition}
                  onChange={(e) => setGameCondition(e.target.value)}
                  className="w-full p-2 border border-amber-200 rounded-xl outline-none bg-white font-sans text-xs"
                >
                  <option value="Có máy chiếu & tivi tương tác">Có máy chiếu & Tivi bảng tương tác</option>
                  <option value="Chỉ có bảng phấn & Flashcards thẻ in (Không công nghệ)">Chỉ có bảng phấn & Flashcards thẻ in (Không công nghệ)</option>
                  <option value="Không gian sân trường / Hoạt động ngoài trời">Sân trường rộng rãi / Hoạt động ngoài trời</option>
                </select>
              </div>

              <button
                disabled={isGeneratingCustomGame}
                onClick={handleGenerateCustomGame}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-fredoka font-extrabold rounded-xl shadow-md cursor-pointer text-center text-xs disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingCustomGame ? 'Đang thiết kế kịch bản...' : `Biên soạn kịch bản "${gameNameInput || 'Trò chơi'}" ngay ⚡`}</span>
              </button>
            </div>

            {/* Custom Game Generated result card */}
            {customGameGenerated && (
              <div className="bg-gradient-to-b from-yellow-50 to-amber-50/70 rounded-2xl p-4 border border-amber-200 text-xs space-y-3 animate-float shadow-md">
                <div className="border-b border-amber-200 pb-2 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] bg-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase">
                        {customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? '🇬🇧 English Game Plan' : '🇻🇳 Kế hoạch trò chơi'}
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {customGameGenerated.phase}
                      </span>
                    </div>
                    <h5 className="font-fredoka text-sm font-extrabold text-amber-950">{customGameGenerated.name}</h5>
                  </div>
                  <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0" />
                </div>

                <div className="space-y-2.5 font-sans text-gray-700">
                  {/* Preparation */}
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <p className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                      <span>🛠️</span>
                      <span>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Preparation & Materials:' : 'Chuẩn bị học liệu:'}</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{customGameGenerated.preparation}</p>
                  </div>

                  {/* Procedure / Steps */}
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <p className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                      <span>📜</span>
                      <span>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Step-by-Step Procedure:' : 'Các bước thực hiện:'}</span>
                    </p>
                    <ul className="list-decimal pl-4 space-y-1 text-gray-600 text-[11px]">
                      {(customGameGenerated.steps || []).map((step: string, i: number) => (
                        <li key={i} className="leading-relaxed">{step}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Rules - 100% in English when English is selected */}
                  <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-blue-950 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                        <span>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Game Rules (Clear & Concise - 100% English):' : 'Luật chơi quy định:'}</span>
                      </p>
                      {(customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject) && (
                        <span className="text-[9px] bg-blue-200 text-blue-800 font-extrabold px-1.5 py-0.2 rounded">
                          100% English
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-blue-900 whitespace-pre-line font-medium leading-relaxed bg-white/70 p-2 rounded-lg border border-blue-100">
                      {customGameGenerated.rules}
                    </div>
                  </div>

                  {/* Rubric */}
                  {customGameGenerated.rubric && customGameGenerated.rubric.length > 0 && (
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <p className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                        <span>📊</span>
                        <span>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Assessment Rubric:' : 'Tiêu chí đánh giá (Rubric):'}</span>
                      </p>
                      <div className="space-y-1 text-[10px]">
                        {customGameGenerated.rubric.map((r: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 p-1.5 rounded-lg">
                            <span className="font-bold text-gray-700">{r.criteria}</span>
                            <span className="text-gray-500">{r.maxScore} | {r.midScore} | {r.minScore}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Adaptations */}
                  <div className="bg-orange-100/40 p-2.5 rounded-xl border border-orange-200 text-[10px] space-y-1.5 text-orange-950 font-medium">
                    <p>💡 <strong>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Large Class Adjustment:' : 'Điều chỉnh lớp đông:'}</strong> {customGameGenerated.classSizeAdjustments}</p>
                    <p>🧸 <strong>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Support for Slow Learners:' : 'Nâng đỡ học sinh yếu:'}</strong> {customGameGenerated.weakStudentAdapting}</p>
                    <p>🔌 <strong>{customGameGenerated.subject === 'Tiếng Anh' || isEnglishSubject ? 'Backup / No-Tech Plan:' : 'Dự phòng mất điện:'}</strong> {customGameGenerated.backupPlan}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

