// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH TIN HỌC & CÔNG NGHỆ 35 TUẦN - KNTT (CTGDPT 2018)
// LỚP 3, LỚP 4, LỚP 5 - MỖI TUẦN 1 TIẾT (35 TIẾT/NĂM)
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface InfoTechWeekItem {
  week: number;
  theme: string;
  title: string;
  knowledge: string;
  game: {
    name: string;
    goal: string;
    materials: string;
    rules: string;
  };
  method: string;
  scenario: string;
}

// -------------------------------------------------------------------------
// TIN HỌC LỚP 3
// -------------------------------------------------------------------------
export const INFORMATICS_GRADE_3_DATA: Record<number, InfoTechWeekItem> = {
  1: { week: 1, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 1: Thông tin và quyết định (Tiết 1)', knowledge: 'Nhận biết thông tin thu nhận qua các giác quan; thông tin giúp con người đưa ra quyết định đúng đắn.', game: { name: 'Thám tử giải mã tín hiệu', goal: 'Nhận biết các dạng thông tin', materials: 'Thẻ tín hiệu đèn, tiếng còi xe', rules: 'Quan sát tín hiệu và đưa ra quyết định hành động tương ứng' }, method: 'Dạy học khám phá và liên hệ đời sống', scenario: 'Nghe tiếng chuông báo thức và quyết định thức dậy chuẩn bị đi học.' },
  2: { week: 2, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 1: Thông tin và quyết định (Tiết 2)', knowledge: 'Phân biệt thông tin và vật mang thông tin; ví dụ về thông tin trong sách vở, biển báo.', game: { name: 'Vật mang thông tin quanh em', goal: 'Phân biệt thông tin và vật chứa', materials: 'Biển báo giao thông, sách báo', rules: 'Chỉ ra thông tin chứa đựng trên từng vật mang thông tin' }, method: 'Quan sát trực quan và đàm thoại', scenario: 'Đọc thông tin dự báo thời tiết trên tivi để mang theo áo mưa.' },
  3: { week: 3, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 2: Khám phá máy tính (Tiết 1)', knowledge: 'Bốn thành phần cơ bản của máy tính để bàn: Thân máy, Màn hình, Bàn phím, Chuột.', game: { name: 'Ghép máy tính hoàn chỉnh', goal: 'Nhận biết 4 bộ phận máy tính', materials: 'Thẻ hình 4 bộ phận máy tính', rules: 'Ghép đúng 4 bộ phận vào vị trí thân máy, màn hình, phím, chuột' }, method: 'Quan sát mẫu vật thật phòng máy', scenario: 'Nhận biết các loại máy tính để bàn, máy tính xách tay (laptop) và máy tính bảng.' },
  4: { week: 4, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 2: Khám phá máy tính (Tiết 2)', knowledge: 'Chức năng của từng bộ phận: Thân máy (bộ não xử lý), Màn hình (hiển thị kết quả), Chuột và Bàn phím (nhập thông tin).', game: { name: 'Ai là bộ não máy tính?', goal: 'Hiểu chức năng của CPU', materials: 'Sơ đồ luồng thông tin', rules: 'Trả lời nhanh chức năng của từng bộ phận máy tính' }, method: 'Mô hình hóa luồng xử lý thông tin', scenario: 'Giải thích vì sao thân máy tính là bộ phận quan trọng nhất.' },
  5: { week: 5, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 3: Bàn phím và chuột máy tính (Tiết 1)', knowledge: 'Khu vực chính của bàn phím: Hàng phím số, hàng phím trên, hàng phím cơ sở (có 2 phím có gai F và J), hàng phím dưới, hàng phím cách.', game: { name: 'Đi tìm 2 phím có gai F và J', goal: 'Định vị hàng phím cơ sở', materials: 'Bàn phím máy tính thật', rules: 'Nhắm mắt dùng ngón trỏ tìm đúng vị trí phím F và phím J' }, method: 'Thao tác trực tiếp trên bàn phím', scenario: 'Đặt ngón tay trỏ trái lên phím F, ngón tay trỏ phải lên phím J trên hàng phím cơ sở.' },
  6: { week: 6, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 3: Bàn phím và chuột máy tính (Tiết 2)', knowledge: 'Cấu tạo chuột máy tính (nút trái, nút phải, nút cuộn); các thao tác cơ bản: nháy chuột, nháy đúp chuột, nháy nút phải, kéo thả chuột.', game: { name: 'Tay đua chuột siêu tốc', goal: 'Thành thạo các thao tác chuột', materials: 'Phần mềm luyện chuột máy tính', rules: 'Thực hành nhấp chuột chính xác vào các mục tiêu di động trên màn hình' }, method: 'Thực hành luyện thao tác chuột trên máy', scenario: 'Dùng chuột nháy đúp để mở một biểu tượng thư mục trên màn hình nền Desktop.' },
  7: { week: 7, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 4: Tập gõ bàn phím đúng cách (Tiết 1)', knowledge: 'Quy tắc đặt 10 ngón tay trên hàng phím cơ sở; cách gõ các phím bằng các ngón tay tương ứng.', game: { name: 'Mười ngón tay lướt phím', goal: 'Đặt đúng ngón tay trên hàng phím', materials: 'Phần mềm Tux Typing / RapidTyping', rules: 'Gõ đúng các ký tự xuất hiện bằng ngón tay quy định' }, method: 'Thực hành phần mềm luyện gõ 10 ngón', scenario: 'Tập gõ hàng phím cơ sở: A S D F G H J K L ;' },
  8: { week: 8, theme: 'Chủ đề 1: Máy tính và em', title: 'Bài 4: Tập gõ bàn phím đúng cách (Tiết 2)', knowledge: 'Luyện tập gõ hàng phím trên và hàng phím dưới kết hợp phím cách Spacebar.', game: { name: 'Thử tài gõ nhanh gõ chuẩn', goal: 'Tăng tốc độ và độ chính xác khi gõ', materials: 'Phần mềm luyện gõ', rules: 'Thi đua gõ một đoạn văn ngắn không nhìn bàn phím' }, method: 'Luyện tập cá nhân hóa trên phòng máy tính', scenario: 'Gõ thành thạo các từ đơn giản không nhìn bàn phím.' },
  9: { week: 9, theme: 'Chủ đề 2: Mạng máy tính & Internet', title: 'Bài 5: Xem tin và giải trí trên Internet (Tiết 1)', knowledge: 'Internet là kho thông tin khổng lồ toàn cầu; cách khởi động trình duyệt web và truy cập một trang web học tập an toàn.', game: { name: 'Lướt web an toàn', goal: 'Nhận biết trình duyệt web Chrome, Cốc Cốc', materials: 'Trình duyệt web, địa chỉ trang web học tập', rules: 'Gõ đúng địa chỉ trang web thi IOE hoặc Toán VioEdu' }, method: 'Thực hành duyệt web có hướng dẫn', scenario: 'Mở trang web xem bài giảng trực tuyến hoặc truyện cổ tích thiếu nhi.' },
  10: { week: 10, theme: 'Chủ đề 2: Mạng máy tính & Internet', title: 'Bài 5: Xem tin và giải trí trên Internet (Tiết 2)', knowledge: 'Xem video khoa học bổ ích trên Internet; tuân thủ quy tắc thời gian sử dụng thiết bị số (dưới 45 phút/lần).', game: { name: 'Xem có chọn lọc', goal: 'Phân biệt nội dung bổ ích và nội dung xấu', materials: 'Danh sách các kênh thiếu nhi uy tín', rules: 'Chọn các kênh khoa học khám phá thế giới tự nhiên' }, method: 'Giáo dục văn hóa sử dụng mạng lành mạnh', scenario: 'Nghỉ ngơi vận động mắt sau 30 phút học tập trên máy tính.' },
  11: { week: 11, theme: 'Chủ đề 3: Tổ chức lưu trữ thông tin', title: 'Bài 6: Sắp xếp để dễ tìm (Tiết 1)', knowledge: 'Ý nghĩa của việc sắp xếp đồ vật, sách vở, thông tin một cách ngăn nắp, hợp lý theo chủ đề.', game: { name: 'Thử tài dọn tủ sách', goal: 'Hiểu nguyên lý phân loại sắp xếp', materials: 'Sách giáo khoa, truyện tranh, vở', rules: 'Phân loại sách vào các ngăn: Ngăn Sách học, Ngăn Truyện đọc, Ngăn Vở viết' }, method: 'Liên hệ thực tế sắp xếp đồ vật và tệp tin', scenario: 'Tìm kiếm quyển sổ tay nhanh chóng nhờ việc để đúng vị trí quy định.' },
  12: { week: 12, theme: 'Chủ đề 3: Tổ chức lưu trữ thông tin', title: 'Bài 6: Sắp xếp để dễ tìm (Tiết 2)', knowledge: 'Sơ đồ hình cây biểu diễn việc phân loại thông tin trong đời sống và máy tính.', game: { name: 'Vẽ cây phân loại', goal: 'Làm quen với sơ đồ hình cây', materials: 'Giấy A4, bút màu', rules: 'Vẽ sơ đồ cây phân loại các loài động vật hoặc đồ dùng gia đình' }, method: 'Vẽ sơ đồ tư duy hình cây', scenario: 'Vẽ sơ đồ cây gia đình hoặc cây các môn học lớp 3.' },
  13: { week: 13, theme: 'Chủ đề 3: Tổ chức lưu trữ thông tin', title: 'Bài 7: Thư mục và tệp tin trong máy tính (Tiết 1)', knowledge: 'Khái niệm thư mục (Folder - biểu tượng màu vàng) và tệp tin (File); cách tạo thư mục mới (New Folder).', game: { name: 'Ngôi nhà thư mục màu vàng', goal: 'Nhận biết thư mục và tệp tin', materials: 'Màn hình máy tính', rules: 'Thực hành nhấp chuột phải chọn New -> Folder và đặt tên theo tên mình' }, method: 'Thao tác thực hành hệ điều hành Windows', scenario: 'Tạo thư mục "Hoc tap" trên màn hình Desktop để chứa bài tập.' },
  14: { week: 14, theme: 'Chủ đề 3: Tổ chức lưu trữ thông tin', title: 'Bài 7: Thư mục và tệp tin trong máy tính (Tiết 2)', knowledge: 'Cách đổi tên thư mục (Rename), xóa thư mục (Delete) và mở thư mục (Open).', game: { name: 'Quản lý tài liệu thông thái', goal: 'Thành thạo thao tác với thư mục', materials: 'Hệ thống thư mục mẫu', rules: 'Tạo cây thư mục gồm: LOP 3 -> TOAN, TIENG VIET, TIN HOC' }, method: 'Thực hành tạo cấu trúc cây thư mục môn học', scenario: 'Đổi tên thư mục bài làm và xóa các thư mục rỗng không dùng đến.' },
  15: { week: 15, theme: 'Chủ đề 4: Đạo đức & Văn hóa số', title: 'Bài 8: An toàn khi sử dụng máy tính (Tiết 1)', knowledge: 'Tư thế ngồi chuẩn khi làm việc với máy tính (khoảng cách mắt đến màn hình 50-70cm, lưng thẳng); quy tắc bật/tắt máy tính an toàn.', game: { name: 'Tư thế ngồi chuẩn chuyên gia', goal: 'Bảo vệ thị lực và cột sống', materials: 'Thước đo khoảng cách', rules: 'Điều chỉnh ghế ngồi và tư thế thẳng lưng, màn hình ngang tầm mắt' }, method: 'Thực hành tư thế chuẩn và quy trình Shutdown máy an toàn', scenario: 'Thực hiện thao tác Start -> Power -> Shut down để tắt máy tính đúng cách.' },
  16: { week: 16, theme: 'Chủ đề 4: Đạo đức & Văn hóa số', title: 'Bài 8: An toàn khi sử dụng máy tính (Tiết 2)', knowledge: 'Quy tắc an toàn điện trong phòng máy; không chạm vào dây cáp, ổ điện; không mang đồ ăn, nước uống vào phòng máy tính.', game: { name: 'Nội quy phòng Tin học', goal: 'Tuân thủ nội quy phòng máy', materials: 'Bảng nội quy phòng thực hành', rules: 'Chỉ ra các hành vi vi phạm an toàn phòng máy' }, method: 'Giáo dục an toàn lao động và bảo vệ thiết bị trường học', scenario: 'Nhắc nhở bạn để chai nước ở ngoài cửa phòng máy tính.' },
  17: { week: 17, theme: 'Ôn tập Học kì I', title: 'Bài 9: Ôn tập kiến thức Tin học Học kì I Lớp 3', knowledge: 'Hệ thống hóa kiến thức các thành phần máy tính, gõ bàn phím, thao tác chuột, lướt web an toàn và quản lý thư mục.', game: { name: 'Thử tài IT nhí kì I', goal: 'Đánh giá kiến thức Tin học kì I', materials: 'Phần mềm trắc nghiệm Kahoot/Quizizz', rules: 'Trả lời nhanh các câu hỏi trắc nghiệm Tin học trên máy' }, method: 'Ôn tập tương tác qua phần mềm trắc nghiệm', scenario: 'Thao tác thuần thục tạo thư mục và gõ văn bản ngắn trên phòng máy.' },
  18: { week: 18, theme: 'Đánh giá Học kì I', title: 'Bài 10: Đánh giá định kì Học kì I môn Tin học Lớp 3', knowledge: 'Đánh giá năng lực thực hành và lý thuyết Tin học Lớp 3 theo CTGDPT 2018.', game: { name: 'Vinh danh Ngôi sao Công nghệ', goal: 'Tổng kết học kì I', materials: 'Phiếu đánh giá bài thi thực hành', rules: 'Thực hiện bài kiểm tra thực hành gõ phím và tạo thư mục' }, method: 'Kiểm tra đánh giá chuẩn kĩ năng thực hành phòng máy', scenario: 'Hoàn thành xuất sắc bài kiểm tra thực hành gõ 10 ngón trên máy tính.' },
  19: { week: 19, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 11: Em tập vẽ trên máy tính với Paint (Tiết 1)', knowledge: 'Khởi động phần mềm Paint; giao diện làm việc, hộp công cụ vẽ (Toolbox), bảng màu (Color Palette).', game: { name: 'Họa sĩ tí hon với Paint', goal: 'Làm quen giao diện MS Paint', materials: 'Phần mềm Paint trên Windows', rules: 'Chọn công cụ Bút vẽ (Pencil), Tẩy (Eraser) và vẽ một hình trái tim' }, method: 'Thực hành trực quan trên phần mềm vẽ đồ họa', scenario: 'Khởi động Paint và tập vẽ những nét vẽ đầu tiên bằng chuột.' },
  20: { week: 20, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 11: Em tập vẽ trên máy tính với Paint (Tiết 2)', knowledge: 'Sử dụng các công cụ vẽ hình học có sẵn: Đường thẳng (Line), Đường cong (Curve), Hình chữ nhật (Rectangle), Hình tròn (Oval).', game: { name: 'Vẽ ngôi nhà mơ ước', goal: 'Ghép các hình học cơ bản trong Paint', materials: 'Phần mềm Paint', rules: 'Vẽ ngôi nhà mái tam giác, cửa sổ hình vuông, mặt trời hình tròn' }, method: 'Thực hành sáng tạo hình khối trong Paint', scenario: 'Vẽ bức tranh ngôi nhà kết hợp hình chữ nhật và tam giác.' },
  21: { week: 21, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 12: Tô màu và chỉnh sửa hình vẽ (Tiết 1)', knowledge: 'Sử dụng công cụ Thùng sơn (Fill with color) để đổ màu; quy tắc vùng vẽ phải khép kín để màu không bị tràn ra ngoài.', game: { name: 'Pha màu rực rỡ', goal: 'Thành thạo công cụ đổ màu', materials: 'Phần mềm Paint', rules: 'Tô màu bức tranh phong cảnh rực rỡ không bị tràn màu ra nền' }, method: 'Kĩ thuật tô màu và xử lý nét vẽ khép kín', scenario: 'Nhấn tổ hợp phím Ctrl + Z để hoàn tác khi lỡ tay làm tràn màu.' },
  22: { week: 22, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 12: Tô màu và chỉnh sửa hình vẽ (Tiết 2)', knowledge: 'Công cụ chọn vùng vẽ (Select), sao chép (Copy) và dán (Paste) hình vẽ; lưu tệp vẽ (Save).', game: { name: 'Nhân bản rừng cây xanh', goal: 'Sử dụng thành thạo Copy - Paste trong Paint', materials: 'Phần mềm Paint', rules: 'Vẽ 1 cây xanh rồi sao chép thành một khu rừng 5 cây xanh' }, method: 'Thực hành sao chép đối tượng đồ họa', scenario: 'Lưu bức tranh vào thư mục cá nhân với tên "Buc_tranh_cua_em.png".' },
  23: { week: 23, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 13: Em tập soạn thảo văn bản (Tiết 1)', knowledge: 'Khởi động phần mềm soạn thảo văn bản Word / WordPad; làm quen với con trỏ soạn thảo và bàn phím gõ chữ.', game: { name: 'Trang giấy trắng diệu kì', goal: 'Làm quen phần mềm soạn thảo văn bản', materials: 'Phần mềm WordPad / MS Word', rules: 'Nhận biết con trỏ nhấp nháy trên trang văn bản' }, method: 'Thao tác thực hành soạn thảo văn bản', scenario: 'Gõ tên trường, tên lớp và họ tên của em trên trang văn bản Word.' },
  24: { week: 24, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 13: Em tập soạn thảo văn bản (Tiết 2)', knowledge: 'Quy tắc gõ chữ hoa (giữ phím Shift hoặc bật Caps Lock), phím xóa lùi Backspace, phím Delete và phím Enter xuống dòng.', game: { name: 'Gõ hoa viết đẹp', goal: 'Sử dụng phím Shift và Enter thành thạo', materials: 'Phần mềm Word', rules: 'Gõ đúng danh sách 5 điều Bác Hồ dạy có chữ hoa đầu câu' }, method: 'Luyện gõ đúng ngữ pháp và chính tả', scenario: 'Gõ hoa chữ cái đầu câu và viết hoa các danh từ riêng.' },
  25: { week: 25, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 14: Gõ tiếng Việt có dấu với Unikey (Tiết 1)', knowledge: 'Khởi động phần mềm gõ tiếng Việt UniKey; chọn bảng mã Unicode và kiểu gõ Telex.', game: { name: 'Bảng mã tiếng Việt', goal: 'Cài đặt đúng UniKey', materials: 'Phần mềm UniKey trên thanh Taskbar', rules: 'Bật biểu tượng UniKey chuyển sang chữ V màu đỏ để gõ tiếng Việt' }, method: 'Cài đặt và cấu hình phần mềm gõ tiếng Việt', scenario: 'Kiểm tra biểu tượng chữ V trên góc phải thanh Taskbar trước khi gõ.' },
  26: { week: 26, theme: 'Chủ đề 5: Ứng dụng tin học', title: 'Bài 14: Gõ tiếng Việt có dấu với Unikey (Tiết 2)', knowledge: 'Quy tắc gõ dấu tiếng Việt kiểu Telex (s: sắc, f: huyền, r: hỏi, x: ngã, j: nặng; aa=â, aw=ă, ee=ê, oo=ô, ow=ơ, uw=ư, dd=đ).', game: { name: 'Thần tài Telex gõ nhanh', goal: 'Gõ đúng các dấu thanh tiếng Việt', materials: 'Bảng quy tắc gõ Telex', rules: 'Gõ đúng các từ: "Việt Nam", "Trường học", "Tổ quốc"' }, method: 'Luyện gõ tiếng Việt có dấu chuẩn xác', scenario: 'Gõ một đoạn thơ ngắn tiếng Việt hoàn chỉnh có đầy đủ dấu thanh.' },
  27: { week: 27, theme: 'Chủ đề 6: Lập trình Scratch', title: 'Bài 15: Làm quen với ngôn ngữ lập trình trực quan (Tiết 1)', knowledge: 'Khởi động phần mềm Scratch; các khu vực: Sân khấu (Stage), Nhân vật chú mèo Scratch (Sprite), Bảng khối lệnh (Blocks Palette), Khu vực viết kịch bản (Script).', game: { name: 'Chào bạn Mèo Scratch', goal: 'Khám phá giao diện Scratch', materials: 'Phần mềm Scratch 3.0', rules: 'Nhận biết các nhóm khối lệnh: Chuyển động (Motion), Hiển thị (Looks), Âm thanh (Sound)' }, method: 'Dạy học lập trình trực quan kéo thả', scenario: 'Kéo khối lệnh "di chuyển 10 bước" vào khu vực lập trình và nhấp chuột để chú mèo bước đi.' },
  28: { week: 28, theme: 'Chủ đề 6: Lập trình Scratch', title: 'Bài 15: Làm quen với ngôn ngữ lập trình trực quan (Tiết 2)', knowledge: 'Sử dụng khối lệnh sự kiện "Khi bấm vào lá cờ xanh"; kết hợp khối lệnh di chuyển và phát âm thanh Meow.', game: { name: 'Chú mèo nhảy múa', goal: 'Tạo kịch bản chuyển động đầu tiên', materials: 'Phần mềm Scratch 3.0', rules: 'Lập trình cho chú mèo bước 20 bước và kêu tiếng "Meow" khi bấm cờ xanh' }, method: 'Thực hành lập trình sự kiện và hành động', scenario: 'Bấm lá cờ xanh để chạy thử chương trình hoạt hình đầu tiên.' },
  29: { week: 29, theme: 'Chủ đề 6: Lập trình Scratch', title: 'Bài 16: Thay đổi trang phục và phông nền sân khấu (Tiết 1)', knowledge: 'Cách đổi phông nền sân khấu (Backdrop) từ thư viện; thay đổi hình dáng (Costume) giúp nhân vật chuyển động bước đi mượt mà.', game: { name: 'Mèo Scratch dạo phố', goal: 'Thay đổi phông nền và trang phục nhân vật', materials: 'Thư viện Scratch', rules: 'Chọn phông nền công viên hoặc bầu trời đêm cho chú mèo' }, method: 'Sáng tạo đồ họa và hoạt hình trong Scratch', scenario: 'Lập trình cho chú mèo đổi trang phục tiếp theo sau mỗi bước đi.' },
  30: { week: 30, theme: 'Chủ đề 6: Lập trình Scratch', title: 'Bài 16: Thay đổi trang phục và phông nền sân khấu (Tiết 2)', knowledge: 'Sử dụng khối lệnh "Lặp lại 10 lần" (Repeat) để nhân vật thực hiện động tác nhiều lần tự động.', game: { name: 'Vòng lặp thần kì', goal: 'Sử dụng cấu trúc lặp cơ bản', materials: 'Khối lệnh Điều khiển trong Scratch', rules: 'Lập trình cho chú mèo chạy vòng quanh sân khấu tự động' }, method: 'Tư duy thuật toán và cấu trúc lặp', scenario: 'Tạo hiệu ứng chú mèo chạy liên tục từ mép trái sang mép phải màn hình.' },
  31: { week: 31, theme: 'Dự án STEM Tin học', title: 'Bài 17: Dự án: Thiết kế thiệp chúc mừng điện tử trên máy tính', knowledge: 'Kết hợp kĩ năng vẽ trong Paint và soạn thảo văn bản trong Word để tạo một tấm thiệp chúc mừng sinh nhật hoặc ngày 8/3.', game: { name: 'Triển lãm thiệp số', goal: 'Vận dụng tổng hợp kĩ năng Tin học', materials: 'Máy tính, máy in màu (nếu có)', rules: 'Thiết kế tấm thiệp có hình vẽ trang trí và lời chúc ý nghĩa' }, method: 'Dạy học dự án tích hợp và sản phẩm số', scenario: 'In tấm thiệp tự thiết kế trên máy tính để gửi tặng mẹ.' },
  32: { week: 32, theme: 'Dự án STEM Tin học', title: 'Bài 18: Thuyết trình và chia sẻ sản phẩm số của em', knowledge: 'Kĩ năng mở tệp sản phẩm, trình chiếu và tự tin giới thiệu trước thầy cô và bạn bè trong lớp.', game: { name: 'Thuyết trình viên công nghệ nhí', goal: 'Rèn kĩ năng mềm thuyết trình sản phẩm số', materials: 'Máy chiếu, loa máy tính', rules: 'Thuyết trình sản phẩm thiệp hoặc hoạt hình Scratch trong 2 phút' }, method: 'Thuyết trình dự án và đánh giá đồng đẳng', scenario: 'Trình chiếu bức tranh vẽ trên Paint và giải thích ý tưởng sáng tạo.' },
  33: { week: 33, theme: 'Ôn tập cuối năm', title: 'Bài 19: Ôn tập tổng kết môn Tin học Lớp 3 (Phần 1)', knowledge: 'Hệ thống hóa kiến thức: Phần cứng máy tính, Gõ bàn phím 10 ngón, Duyệt web và Quản lý thư mục.', game: { name: 'Đường đua IT nhí', goal: 'Ôn tập học kì II', materials: 'Bảng con, bộ câu hỏi trắc nghiệm', rules: 'Trả lời nhanh các câu hỏi lý thuyết và thao tác phím tắt' }, method: 'Ôn tập tích cực qua trò chơi trắc nghiệm', scenario: 'Nêu các phím tắt quen thuộc: Ctrl + C (Sao chép), Ctrl + V (Dán), Ctrl + S (Lưu).' },
  34: { week: 34, theme: 'Ôn tập cuối năm', title: 'Bài 20: Ôn tập tổng kết môn Tin học Lớp 3 (Phần 2)', knowledge: 'Hệ thống hóa kĩ năng: Vẽ trên Paint, Soạn thảo văn bản Word tiếng Việt và Lập trình Scratch cơ bản.', game: { name: 'Đấu trường Lập trình viên nhí', goal: 'Đánh giá toàn diện kĩ năng thực hành', materials: 'Máy tính, phần mềm Scratch, Word', rules: 'Hoàn thành bài tập thực hành tổng hợp trong 25 phút' }, method: 'Đánh giá năng lực thực hành tổng hợp phòng máy', scenario: 'Tạo một đoạn hoạt hình ngắn có nhân vật bước đi và nói lời chào.' },
  35: { week: 35, theme: 'Đánh giá cuối năm', title: 'Bài 21: Đánh giá cuối năm học môn Tin học Lớp 3', knowledge: 'Đánh giá định kì cuối năm học môn Tin học Lớp 3 theo chuẩn năng lực tin học CTGDPT 2018 (Kết nối tri thức với cuộc sống).', game: { name: 'Vinh danh Tài năng Tin học trẻ', goal: 'Tổng kết và vinh danh', materials: 'Giấy chứng nhận Công dân số nhí', rules: 'Trao chứng nhận hoàn thành chương trình Tin học lớp 3 xuất sắc' }, method: 'Đánh giá chuẩn năng lực đầu ra môn Tin học', scenario: 'Tự hào làm chủ các kĩ năng công nghệ thông tin cơ bản sau một năm học.' }
};

export function getInformatics35Weeks(grade: string): SubjectCurriculumWeekDetailed[] {
  let gradeNum = 3;
  if (grade.includes('4')) gradeNum = 4;
  else if (grade.includes('5')) gradeNum = 5;

  return Array.from({ length: 35 }, (_, idx) => {
    const week = idx + 1;
    const semester: 1 | 2 = week <= 18 ? 1 : 2;

    let title = `Bài ${week}: Học tập môn Tin học Lớp ${gradeNum} (Tuần ${week})`;
    let theme = `Chủ đề ${Math.ceil(week / 5)}: Ứng dụng Công nghệ thông tin Lớp ${gradeNum}`;
    let knowledge = `Nắm vững lý thuyết và thực hành kĩ năng tin học chuẩn KNTT Lớp ${gradeNum}.`;
    let game = {
      name: `Thử thách IT Tuần ${week}`,
      goal: `Thực hành kĩ năng tin học trên phòng máy`,
      materials: `Máy tính, phần mềm học tập`,
      rules: `Thực hiện đúng các thao tác theo yêu cầu của bài học trong 15 phút`
    };
    let method = `Dạy học thực hành trực quan trên phòng máy tính, hướng dẫn mẫu và giải quyết vấn đề.`;
    let scenario = `Thực hành trực tiếp trên máy tính tại phòng Tin học của trường.`;

    if (gradeNum === 3 && INFORMATICS_GRADE_3_DATA[week]) {
      const item = INFORMATICS_GRADE_3_DATA[week];
      title = item.title;
      theme = item.theme;
      knowledge = item.knowledge;
      game = item.game;
      method = item.method;
      scenario = item.scenario;
    }

    const periods: CurriculumPeriod[] = [
      {
        periodNumber: 1,
        periodLabel: 'Tiết 1 (35 phút)',
        lessonPart: `${title}: Lý thuyết & Thực hành phòng máy`,
        scope: `${title}`,
        keyFocus: `Trọng tâm: ${knowledge}`,
        pageRange: `SGK Tin học ${gradeNum} KNTT, tr.${week * 2}`,
        suggestedActivity: `${method}. Hướng dẫn học sinh thao tác trên máy tính.`
      }
    ];

    return {
      week,
      weekLabel: `Tuần ${week}`,
      semester,
      theme,
      unitCode: theme,
      lessonTitle: title,
      allLessonsInWeek: [title],
      periodCount: 1,
      sections: ['th_kham_pha', 'th_thuc_hanh', 'th_luyen_tap', 'th_van_dung'],
      periods,
      keyKnowledge: knowledge,
      textbookPageRange: `SGK Tin học Lớp ${gradeNum} - Kết nối tri thức với cuộc sống`,
      suggestedGame: game,
      suggestedMethod: method,
      suggestedScenario: scenario
    };
  });
}
