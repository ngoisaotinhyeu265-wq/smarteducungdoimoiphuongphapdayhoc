// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH KHOA HỌC 35 TUẦN - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// THEO CHUẨN NXB GIÁO DỤC VIỆT NAM (TẬP HUẤN SGK CTGDPT 2018)
// LỚP 4 & LỚP 5 - MỖI TUẦN 2 TIẾT (TỔNG CỘNG 70 TIẾT/NĂM)
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface ScienceWeekItem {
  week: number;
  theme: string;
  title: string;
  knowledge: string;
  periods: string[];
  game: {
    name: string;
    goal: string;
    materials: string;
    rules: string;
  };
  method: string;
  scenario: string;
}

export const SCIENCE_GRADE_4_DATA: Record<number, ScienceWeekItem> = {
  1: {
    week: 1,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 1: Tính chất của nước và nước trong cuộc sống',
    knowledge: 'Nước là chất lỏng không màu, không mùi, không vị, không có hình dạng nhất định; chảy từ cao xuống thấp, lan ra khắp phía; thấm qua một số vật và hòa tan một số chất.',
    periods: ['Tiết 1: Quan sát và làm thí nghiệm tìm hiểu tính chất của nước', 'Tiết 2: Tìm hiểu vai trò và ứng dụng của nước trong sinh hoạt và sản xuất'],
    game: { name: 'Thí nghiệm viên tí hon', goal: 'Kiểm tra tính hòa tan của nước', materials: 'Cốc nước, muối, đường, cát, dầu ăn', rules: 'Học sinh khuấy các chất vào cốc nước và ghi nhận chất nào tan, chất nào không tan' },
    method: 'Phương pháp Bàn tay nặn bột & Thực hành thí nghiệm trực quan',
    scenario: 'Học sinh giải thích vì sao đường tan trong nước chanh còn hạt chanh thì nổi lên mặt nước.'
  },
  2: {
    week: 2,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 2: Sự chuyển thể của nước và vòng tuần hoàn của nước trong tự nhiên',
    knowledge: 'Nước tồn tại ở ba thể: rắn, lỏng, khí (hơi). Nước có thể chuyển từ thể này sang thể khác thông qua bay hơi, ngưng tụ, đông đặc và nóng chảy; sơ đồ vòng tuần hoàn của nước trong tự nhiên.',
    periods: ['Tiết 1: Khám phá ba thể của nước và hiện tượng chuyển thể', 'Tiết 2: Vẽ và thuyết trình sơ đồ vòng tuần hoàn của nước trong tự nhiên'],
    game: { name: 'Giọt nước du kí', goal: 'Hiểu các giai đoạn của vòng tuần hoàn nước', materials: 'Thẻ tranh biểu diễn mây, mưa, sông hồ, hơi nước', rules: 'Sắp xếp các thẻ tranh theo đúng thứ tự chu trình tuần hoàn của nước' },
    method: 'Mô hình hóa chu trình tự nhiên và thuyết trình nhóm',
    scenario: 'Quan sát hiện tượng những giọt nước đọng trên nắp nồi cơm đang sôi và giải thích hiện tượng ngưng tụ.'
  },
  3: {
    week: 3,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 3: Sự ô nhiễm và bảo vệ nguồn nước. Một số cách làm sạch nước',
    knowledge: 'Nguyên nhân gây ô nhiễm nguồn nước và tác hại; các biện pháp bảo vệ nguồn nước; thực hành làm mô hình lọc nước đơn giản bằng cát, sỏi, than hoạt tính.',
    periods: ['Tiết 1: Tìm hiểu nguyên nhân gây ô nhiễm nguồn nước và tác hại', 'Tiết 2: Thực hành làm bình lọc nước mini bằng cát, sỏi và than hoạt tính'],
    game: { name: 'Bảo vệ dòng sông quê em', goal: 'Phân biệt hành vi bảo vệ và làm ô nhiễm nguồn nước', materials: 'Thẻ hành động', rules: 'Gắn các thẻ hành vi đúng vào cột Xanh và hành vi sai vào cột Đỏ' },
    method: 'Dạy học STEM chế tạo mô hình lọc nước mini',
    scenario: 'Xử lý tình huống khi thấy bạn nhỏ vứt túi ni lông và rác thải xuống ao hồ trường học.'
  },
  4: {
    week: 4,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 4: Không khí có ở đâu? Tính chất và thành phần của không khí',
    knowledge: 'Không khí có ở xung quanh mọi vật và trong các chỗ rỗng; không khí trong suốt, không màu, không mùi, không vị, có thể bị nén lại hoặc giãn ra; thành phần gồm khí ni-tơ, khí ô-xi, các-bô-níc và hơi nước.',
    periods: ['Tiết 1: Thí nghiệm chứng minh không khí có ở xung quanh và tính chất của không khí', 'Tiết 2: Khám phá các thành phần chính của không khí'],
    game: { name: 'Bắt lấy không khí', goal: 'Chứng minh không khí tồn tại xung quanh ta', materials: 'Túi ni lông trong, dây buộc, kim chọc', rules: 'Dùng túi ni lông thu gom không khí trong phòng học và nhận xét hình dáng túi' },
    method: 'Thực hành thí nghiệm khám phá và thảo luận nhóm',
    scenario: 'Dùng bơm tiêm không có kim để làm thí nghiệm nén và giãn không khí.'
  },
  5: {
    week: 5,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 5: Vai trò của không khí và bảo vệ bầu không khí trong lành',
    knowledge: 'Vai trò của không khí đối với sự cháy và sự sống của con người, động vật, thực vật; các nguyên nhân gây ô nhiễm không khí và hành động giữ gìn không khí trong lành.',
    periods: ['Tiết 1: Vai trò của không khí đối với sự sống và sự cháy', 'Tiết 2: Tìm hiểu nguyên nhân ô nhiễm không khí và biện pháp bảo vệ'],
    game: { name: 'Cây xanh và lá phổi', goal: 'Hiểu vai trò của cây xanh lọc sạch không khí', materials: 'Tranh ảnh rừng cây và khói bụi', rules: 'Thi ghép tranh giải thích quá trình cây xanh quang hợp tạo khí ô-xi' },
    method: 'Dạy học dự án môi trường và đóng vai tuyên truyền viên nhí',
    scenario: 'Đề xuất các biện pháp giảm thiểu khói bụi xung quanh trường học và khu dân cư.'
  },
  6: {
    week: 6,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 6: Gió, bão và phòng chống bão',
    knowledge: 'Nguyên nhân tạo ra gió (sự chuyển động của không khí từ nơi lạnh đến nơi nóng); các cấp độ gió; tác hại của bão và kỹ năng phòng chống, ứng phó khi có bão.',
    periods: ['Tiết 1: Tìm hiểu sự hình thành của gió và các cấp gió', 'Tiết 2: Tác hại của bão và kỹ năng an toàn phòng chống bão'],
    game: { name: 'Chong chóng quay nhanh', goal: 'Khám phá năng lượng của gió', materials: 'Chong chóng giấy', rules: 'Học sinh mang chong chóng chạy và nhận xét chiều quay và tốc độ theo luồng gió' },
    method: 'Trực quan, giải quyết tình huống thực tiễn phòng chống thiên tai',
    scenario: 'Gia đình cần chuẩn bị những đồ dùng gì khi nghe tin bão đổ bộ vào địa phương.'
  },
  7: {
    week: 7,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 7: Ôn tập chủ đề Chất',
    knowledge: 'Hệ thống hóa kiến thức về nước và không khí: tính chất, sự chuyển thể, vai trò, bảo vệ nguồn nước và không khí trong lành.',
    periods: ['Tiết 1: Hệ thống hóa kiến thức chủ đề Chất bằng sơ đồ tư duy', 'Tiết 2: Báo cáo dự án nhỏ và làm bài tập vận dụng'],
    game: { name: 'Rung chuông vàng Khoa học', goal: 'Đánh giá kiến thức chủ đề Chất', materials: 'Bảng con, câu hỏi trắc nghiệm', rules: 'Học sinh ghi đáp án trắc nghiệm trên bảng con' },
    method: 'Sơ đồ tư duy và ôn tập tích cực qua trò chơi',
    scenario: 'Thuyết trình trước lớp sơ đồ tư duy về vai trò của nước và không khí.'
  },
  8: {
    week: 8,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 8: Ánh sáng và sự truyền ánh sáng',
    knowledge: 'Vật phát sáng và vật được chiếu sáng; ánh sáng truyền theo đường thẳng; vật cho ánh sáng truyền qua và vật cản ánh sáng; hiện tượng tạo bóng của vật.',
    periods: ['Tiết 1: Khám phá vật tự phát sáng, vật được chiếu sáng và đường truyền ánh sáng', 'Tiết 2: Thí nghiệm vật cản ánh sáng và bóng của vật cản'],
    game: { name: 'Múa rối bóng nghệ thuật', goal: 'Khám phá sự hình thành và thay đổi bóng của vật', materials: 'Đèn pin, bìa hình con vật, màn chiếu', rules: 'Dùng đèn pin chiếu vào con rối bìa tạo bóng trên tường và thay đổi khoảng cách' },
    method: 'Thực hành thí nghiệm bóng tối và đường truyền thẳng của tia sáng',
    scenario: 'Giải thích vì sao bóng của em thay đổi độ dài vào các thời điểm sáng, trưa, chiều.'
  },
  9: {
    week: 9,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 9: Vai trò của ánh sáng',
    knowledge: 'Vai trò của ánh sáng đối với sự sống của con người, động vật và thực vật; thói quen chiếu sáng hợp lý, bảo vệ mắt khi học tập và sinh hoạt.',
    periods: ['Tiết 1: Vai trò của ánh sáng đối với con người, thực vật và động vật', 'Tiết 2: Thực hành bố trí góc học tập đủ ánh sáng và bảo vệ đôi mắt'],
    game: { name: 'Bác sĩ nhí chăm sóc mắt', goal: 'Rèn thói quen ngồi học đúng quy chuẩn ánh sáng', materials: 'Đèn bàn học sinh', rules: 'Đánh giá các bức tranh ngồi học ngược sáng, thiếu sáng hoặc quá chói' },
    method: 'Đóng vai bác sĩ nhí và rèn thói quen bảo vệ thị lực',
    scenario: 'Điều chỉnh tư thế ngồi học và góc chiếu đèn bàn sao cho không bị sấp bóng.'
  },
  10: {
    week: 10,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 10: Âm thanh và sự truyền âm thanh',
    knowledge: 'Âm thanh phát ra từ các vật rung động; âm thanh có thể truyền qua môi trường chất rắn, chất lỏng và chất khí; âm thanh nhỏ dần khi ra xa nguồn âm.',
    periods: ['Tiết 1: Thí nghiệm nhận biết nguồn âm và sự rung động phát ra âm thanh', 'Tiết 2: Khám phá sự truyền âm thanh qua chất rắn, chất lỏng và chất khí'],
    game: { name: 'Điện thoại ống bơ', goal: 'Chứng minh âm thanh truyền qua chất rắn', materials: '2 cốc giấy, sợi dây cước', rules: 'Hai bạn đứng xa căng dây và nói chuyện qua cốc giấy' },
    method: 'Phương pháp dạy học STEM chế tạo điện thoại dây truyền âm',
    scenario: 'Giải thích vì sao khi áp tai xuống mặt bàn, ta nghe tiếng gõ ngón tay to và rõ hơn khi nghe trong không khí.'
  },
  11: {
    week: 11,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 11: Âm thanh trong cuộc sống',
    knowledge: 'Ích lợi của âm thanh trong giao tiếp, học tập, báo hiệu và thưởng thức nghệ thuật; tác hại của tiếng ồn và các biện pháp chống ô nhiễm tiếng ồn.',
    periods: ['Tiết 1: Vai trò và ích lợi của âm thanh trong đời sống', 'Tiết 2: Tác hại của tiếng ồn và biện pháp phòng chống tiếng ồn'],
    game: { name: 'Thanh âm cuộc sống', goal: 'Phân biệt âm thanh dễ chịu và tiếng ồn có hại', materials: 'File âm thanh mẫu', rules: 'Nghe đoạn âm thanh và phân loại vào nhóm Nhạc điệu hay Tiếng ồn' },
    method: 'Khai thác học liệu âm thanh trực quan và thảo luận bảo vệ thính giác',
    scenario: 'Nêu các quy định giữ yên lặng trong bệnh viện, thư viện và lớp học.'
  },
  12: {
    week: 12,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 12: Nhiệt độ và sự truyền nhiệt',
    knowledge: 'Khái niệm nhiệt độ và cách đo bằng nhiệt kế; sự truyền nhiệt từ vật nóng hơn sang vật lạnh hơn; sự co giãn vì nhiệt của các chất.',
    periods: ['Tiết 1: Tập sử dụng nhiệt kế đo nhiệt độ nước và nhiệt độ cơ thể', 'Tiết 2: Thí nghiệm tìm hiểu sự truyền nhiệt giữa các vật'],
    game: { name: 'Thử tài đo nhiệt độ', goal: 'Đọc đúng chỉ số nhiệt kế', materials: 'Nhiệt kế thủy ngân mô hình, nhiệt kế điện tử', rules: 'Đọc nhanh và chính xác chỉ số nhiệt độ trong các tình huống' },
    method: 'Thao tác dụng cụ đo lường và thực hành thí nghiệm truyền nhiệt',
    scenario: 'Giải thích vì sao khi cho thìa kim loại vào cốc nước nóng một lúc thì cán thìa cũng bị nóng lên.'
  },
  13: {
    week: 13,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 13: Vật dẫn nhiệt tốt, vật dẫn nhiệt kém',
    knowledge: 'Phân biệt vật dẫn nhiệt tốt (kim loại: nhôm, đồng, sắt...) và vật dẫn nhiệt kém (gỗ, nhựa, len, xốp, không khí...); ứng dụng cách nhiệt và giữ nhiệt trong cuộc sống.',
    periods: ['Tiết 1: Thí nghiệm phân biệt vật dẫn nhiệt tốt và dẫn nhiệt kém', 'Tiết 2: Ứng dụng vật liệu dẫn nhiệt và cách nhiệt trong gia đình'],
    game: { name: 'Chế tạo bình giữ nhiệt mini', goal: 'Ứng dụng vật liệu cách nhiệt', materials: 'Cốc nhựa, xốp, giấy báo, bông gòn', rules: 'Bọc cốc nước đá bằng vật liệu cách nhiệt và đo thời gian đá tan' },
    method: 'Dạy học trải nghiệm chế tạo sản phẩm giữ nhiệt',
    scenario: 'Giải thích vì sao quai nồi thường làm bằng nhựa hoặc gỗ cách nhiệt.'
  },
  14: {
    week: 14,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 14: Ôn tập chủ đề Năng lượng',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức về ánh sáng, âm thanh và nhiệt độ; ứng dụng và an toàn năng lượng trong cuộc sống.',
    periods: ['Tiết 1: Tổng kết kiến thức Ánh sáng, Âm thanh và Nhiệt độ', 'Tiết 2: Thực hành giải quyết các bài tập khoa học và đánh giá chủ đề'],
    game: { name: 'Chiếc nón kì diệu Khoa học', goal: 'Ôn tập tổng kết chủ đề Năng lượng', materials: 'Vòng quay câu hỏi', rules: 'Quay vòng quay và trả lời câu hỏi tương ứng với các ô năng lượng' },
    method: 'Hệ thống hóa kiến thức bằng bảng phân loại và sơ đồ tư duy',
    scenario: 'Báo cáo sản phẩm STEM liên quan đến ánh sáng, âm thanh hoặc truyền nhiệt.'
  },
  15: {
    week: 15,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 15: Thực vật cần gì để sống?',
    knowledge: 'Các yếu tố cần thiết cho sự sống và phát triển của thực vật: ánh sáng, không khí, nước, chất khoáng và nhiệt độ thích hợp.',
    periods: ['Tiết 1: Quan sát và làm thí nghiệm về các yếu tố cần cho thực vật sống', 'Tiết 2: Phân tích kết quả thí nghiệm và rút ra kết luận khoa học'],
    game: { name: 'Chăm sóc mầm xanh', goal: 'Hiểu các điều kiện sống của cây', materials: 'Tranh 5 chậu cây thí nghiệm', rules: 'Chỉ ra yếu tố thiếu ở từng chậu cây (thiếu nước, thiếu sáng, thiếu đất...)' },
    method: 'Thực nghiệm khoa học đối chứng trên cây trồng',
    scenario: 'Giải thích hiện tượng cây trồng trong phòng tối thường có lá vàng úa và còi cọc.'
  },
  16: {
    week: 16,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 16: Động vật cần gì để sống?',
    knowledge: 'Các yếu tố cần cho sự sống của động vật: thức ăn, nước uống, không khí, ánh sáng và nhiệt độ thích hợp; phân loại động vật theo nhóm thức ăn.',
    periods: ['Tiết 1: Tìm hiểu các điều kiện sống cần thiết của động vật', 'Tiết 2: Phân loại động vật ăn cỏ, động vật ăn thịt và động vật ăn tạp'],
    game: { name: 'Thực đơn của muôn loài', goal: 'Phân loại nhóm thức ăn của động vật', materials: 'Thẻ tên con vật và thẻ thức ăn', rules: 'Ghép đúng con vật với thức ăn ưa thích của chúng' },
    method: 'Quan sát tranh ảnh, video tự nhiên và phân loại động vật',
    scenario: 'Giải thích vì sao khi nuôi cá cảnh trong bể kín cần có máy sục khí ô-xi.'
  },
  17: {
    week: 17,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 17: Chăm sóc cây trồng và vật nuôi',
    knowledge: 'Các công việc chăm sóc cây trồng (tưới nước, bón phân, tỉa cành, bắt sâu) và chăm sóc vật nuôi (cho ăn, tiêm phòng, giữ ấm, vệ sinh chuồng trại).',
    periods: ['Tiết 1: Kĩ năng chăm sóc và bảo vệ cây trồng', 'Tiết 2: Kĩ năng chăm sóc, nuôi dưỡng và tiêm phòng cho vật nuôi'],
    game: { name: 'Bác sĩ thú y và người làm vườn nhí', goal: 'Rèn kĩ năng chăm sóc sinh vật', materials: 'Dụng cụ mô hình', rules: 'Xử lý tình huống khi cây bị héo hoặc vật nuôi biếng ăn' },
    method: 'Thực hành liên hệ thực tế đời sống gia đình và địa phương',
    scenario: 'Lập thời gian biểu chăm sóc một chậu cây xanh hoặc thú cưng tại nhà.'
  },
  18: {
    week: 18,
    theme: 'Chủ đề 3 & Đánh giá HKI',
    title: 'Bài 18: Ôn tập chủ đề Thực vật và động vật & Đánh giá Học kì I',
    knowledge: 'Tổng kết kiến thức chủ đề Thực vật và Động vật; đánh giá định kì năng lực khoa học và phẩm chất học sinh học kì I.',
    periods: ['Tiết 1: Ôn tập tổng kết Thực vật và Động vật', 'Tiết 2: Đánh giá định kì cuối học kì I môn Khoa học Lớp 4'],
    game: { name: 'Thử tài tranh biện Khoa học', goal: 'Đánh giá kiến thức tổng hợp học kì I', materials: 'Bộ câu hỏi tình huống', rules: 'Hai đội tranh biện về các giải pháp bảo vệ môi trường và sinh vật' },
    method: 'Đánh giá năng lực khoa học và tổng kết kiến thức học kì I',
    scenario: 'Tự đánh giá kết quả học tập môn Khoa học trong học kì I và lập kế hoạch rèn luyện.'
  },
  19: {
    week: 19,
    theme: 'Chủ đề 4: Nấm',
    title: 'Bài 19: Đặc điểm chung của nấm',
    knowledge: 'Hình dạng, kích thước, cấu tạo các bộ phận chính của nấm (mũ nấm, thân nấm, chân nấm); môi trường sống ẩm ướt của nấm.',
    periods: ['Tiết 1: Quan sát hình dạng, cấu tạo và môi trường sống của nấm', 'Tiết 2: Phân biệt nấm men, nấm mốc và nấm lớn'],
    game: { name: 'Giải phẫu cây nấm', goal: 'Nhận biết các bộ phận cấu tạo của nấm', materials: 'Mẫu nấm rơm thật hoặc mô hình', rules: 'Chỉ và gọi đúng tên mũ nấm, phiến nấm, cuống nấm và chân nấm' },
    method: 'Quan sát mẫu vật thật kết hợp kính lúp phóng đại',
    scenario: 'Dùng kính lúp quan sát cấu tạo mũ nấm rơm và nấm sò.'
  },
  20: {
    week: 20,
    theme: 'Chủ đề 4: Nấm',
    title: 'Bài 20: Nấm ăn và nấm trong chế biến thực phẩm',
    knowledge: 'Một số loại nấm ăn giàu dinh dưỡng (nấm hương, nấm rơm, nấm kim châm, mộc nhĩ...); ứng dụng của nấm men trong làm bánh mì, nấu bia và lên men thực phẩm.',
    periods: ['Tiết 1: Tìm hiểu các loại nấm ăn phổ biến và giá trị dinh dưỡng', 'Tiết 2: Ứng dụng nấm men trong chế biến thực phẩm'],
    game: { name: 'Đầu bếp nhí thông thái', goal: 'Lựa chọn nấm an toàn và bổ dưỡng', materials: 'Thẻ hình các món ăn từ nấm', rules: 'Lên thực đơn bữa cơm gia đình có món ăn bổ dưỡng từ nấm' },
    method: 'Khám phá ẩm thực dinh dưỡng và công nghệ sinh học lên men',
    scenario: 'Quan sát bột làm bánh mì nở phồng nhờ nấm men sinh khí các-bô-níc.'
  },
  21: {
    week: 21,
    theme: 'Chủ đề 4: Nấm',
    title: 'Bài 21: Nấm gây hỏng thực phẩm và nấm độc',
    knowledge: 'Tác hại của nấm mốc làm hỏng thức ăn, đồ dùng; nhận biết một số loại nấm độc nguy hiểm và cách phòng tránh ngộ độc nấm.',
    periods: ['Tiết 1: Tác hại của nấm mốc và cách bảo quản thực phẩm chống mốc', 'Tiết 2: Nhận biết nấm độc và xử lý khi nghi ngờ ngộ độc nấm'],
    game: { name: 'Cảnh giác với nấm độc', goal: 'Phòng tránh ngộ độc nấm trong tự nhiên', materials: 'Hình ảnh nấm độc và nấm ăn', rules: 'Tuyệt đối không hái và ăn các loại nấm lạ mọc trong rừng hay ven đường' },
    method: 'Giáo dục kĩ năng an toàn thực phẩm và giải quyết tình huống',
    scenario: 'Xử lý khi thấy mẩu bánh mì hoặc quả cam trong tủ bếp bị mọc mốc xanh mốc đen.'
  },
  22: {
    week: 22,
    theme: 'Chủ đề 4: Nấm',
    title: 'Bài 22: Ôn tập chủ đề Nấm',
    knowledge: 'Hệ thống hóa đặc điểm, vai trò có ích và tác hại của nấm; quy tắc bảo quản thực phẩm và an toàn khi sử dụng nấm.',
    periods: ['Tiết 1: Hệ thống hóa kiến thức chủ đề Nấm', 'Tiết 2: Trưng bày dự án tìm hiểu về nấm và đánh giá'],
    game: { name: 'Thế giới nấm kì diệu', goal: 'Tổng kết kiến thức chủ đề Nấm', materials: 'Sơ đồ tư duy, phiếu bài tập', rules: 'Hoàn thành sơ đồ tư duy phân loại nấm ăn, nấm men, nấm mốc và nấm độc' },
    method: 'Thuyết trình dự án nhóm và sơ đồ hóa tri thức',
    scenario: 'Tuyên truyền cho người thân trong gia đình cách chọn mua và bảo quản nấm rơm tươi.'
  },
  23: {
    week: 23,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 23: Vai trò của các nhóm chất dinh dưỡng với cơ thể',
    knowledge: 'Bốn nhóm chất dinh dưỡng cần thiết: chất bột đường, chất đạm, chất béo, vi-ta-min và chất khoáng; vai trò của từng nhóm chất đối với sự phát triển thể chất và trí tuệ.',
    periods: ['Tiết 1: Nhận biết 4 nhóm chất dinh dưỡng chính trong thức ăn', 'Tiết 2: Vai trò của từng nhóm chất dinh dưỡng đối với cơ thể người'],
    game: { name: 'Bữa ăn đủ 4 nhóm chất', goal: 'Nhận biết thành phần dinh dưỡng', materials: 'Bộ thẻ thức ăn', rules: 'Chọn các món ăn xếp vào 4 đĩa tượng trưng cho 4 nhóm chất dinh dưỡng' },
    method: 'Dạy học tương tác nhóm và phân tích tháp dinh dưỡng',
    scenario: 'Phân tích thành phần dinh dưỡng trong bữa cơm trưa bán trú tại trường.'
  },
  24: {
    week: 24,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 24: Chế độ ăn uống cân bằng',
    knowledge: 'Tháp dinh dưỡng hợp lý; tầm quan trọng của việc ăn phối hợp nhiều loại thức ăn và uống đủ nước mỗi ngày; thói quen ăn uống lành mạnh.',
    periods: ['Tiết 1: Khám phá Tháp dinh dưỡng hợp lý của lứa tuổi học sinh tiểu học', 'Tiết 2: Thiết kế thực đơn bữa ăn cân bằng dinh dưỡng trong một ngày'],
    game: { name: 'Chuyên gia dinh dưỡng nhí', goal: 'Thiết kế bữa ăn cân bằng', materials: 'Mô hình tháp dinh dưỡng', rules: 'Lập thực đơn 3 bữa sáng, trưa, tối đảm bảo đủ chất và lượng nước' },
    method: 'Dạy học dự án thực đơn gia đình hạnh phúc',
    scenario: 'Chia sẻ với bạn về lượng nước em uống hàng ngày và thói quen ăn rau xanh.'
  },
  25: {
    week: 25,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 25: Một số bệnh liên quan đến dinh dưỡng',
    knowledge: 'Nguyên nhân và cách phòng tránh bệnh suy dinh dưỡng, béo phì, thiếu máu do thiếu sắt, bướu cổ do thiếu i-ốt; thói quen vận động thể thao.',
    periods: ['Tiết 1: Tìm hiểu nguyên nhân và biểu hiện của bệnh suy dinh dưỡng, béo phì', 'Tiết 2: Biện pháp phòng tránh các bệnh thiếu vi chất dinh dưỡng'],
    game: { name: 'Khỏe - Đẹp cùng thể thao', goal: 'Phòng chống béo phì và suy dinh dưỡng', materials: 'Thước đo chiều cao, cân nặng', rules: 'Tính chỉ số cân nặng chiều cao hợp lý và nêu kế hoạch tập thể dục' },
    method: 'Tư vấn sức khỏe học đường và liên hệ bản thân',
    scenario: 'Lời khuyên cho bạn nhỏ thích ăn đồ ăn nhanh chiên rán và lười vận động.'
  },
  26: {
    week: 26,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 26: Thực phẩm an toàn',
    knowledge: 'Thế nào là thực phẩm an toàn và thực phẩm không an toàn; cách lựa chọn thực phẩm tươi ngon, có nguồn gốc rõ ràng, còn hạn sử dụng; giữ vệ sinh an toàn thực phẩm.',
    periods: ['Tiết 1: Tiêu chí nhận biết thực phẩm an toàn và hạn sử dụng', 'Tiết 2: Các biện pháp giữ gìn vệ sinh và an toàn thực phẩm khi chế biến'],
    game: { name: 'Đi chợ cùng mẹ', goal: 'Chọn mua thực phẩm tươi sạch', materials: 'Mô hình rau củ, tem nhãn bao bì', rules: 'Kiểm tra hạn sử dụng và bao bì sản phẩm trước khi cho vào giỏ hàng' },
    method: 'Thực hành đọc nhãn mác thực phẩm và đóng vai đi siêu thị',
    scenario: 'Quan sát tem nhãn hộp sữa để biết ngày sản xuất và hạn sử dụng.'
  },
  27: {
    week: 27,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 27: Phòng tránh đuối nước',
    knowledge: 'Nguyên nhân gây đuối nước; những nơi nguy hiểm cần tránh xa; các quy tắc an toàn khi bơi lội và kĩ năng xử lý khi thấy người bị đuối nước (hô hoán, ném phao/vật nổi).',
    periods: ['Tiết 1: Nhận diện nguy cơ đuối nước và quy tắc an toàn dưới nước', 'Tiết 2: Thực hành kĩ năng xử lý tình huống khi gặp người bị nạn dưới nước'],
    game: { name: 'Cứu hộ nhí trên cạn', goal: 'Rèn kĩ năng phòng tránh đuối nước', materials: 'Phao bơi, cây gậy dài, dây thừng', rules: 'Thực hành hô cứu và dùng sào gậy ném phao cứu nạn mà không nhảy xuống nước' },
    method: 'Đóng vai tình huống cứu nạn an toàn và rèn luyện kĩ năng sinh tồn',
    scenario: 'Tình huống thấy bạn nhỏ đang chơi đùa sát mép ao hồ sâu không có rào chắn.'
  },
  28: {
    week: 28,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 28: Ôn tập chủ đề Con người và sức khoẻ',
    knowledge: 'Hệ thống hóa kiến thức dinh dưỡng, vệ sinh an toàn thực phẩm và kĩ năng phòng tránh tai nạn thương tích, đuối nước.',
    periods: ['Tiết 1: Tổng kết kiến thức Dinh dưỡng và Sức khỏe học đường', 'Tiết 2: Thực hành xử lý tình huống sức khỏe và đánh giá chủ đề'],
    game: { name: 'Đường đua sức khỏe', goal: 'Đánh giá kiến thức chăm sóc sức khỏe', materials: 'Bảng thi đua xúc xắc', rules: 'Tung xúc xắc và trả lời các câu hỏi về dinh dưỡng và an toàn sống' },
    method: 'Học tập tương tác qua trò chơi tổng kết và tự đánh giá',
    scenario: 'Lập cam kết thực hiện chế độ ăn uống lành mạnh và tập thể dục 30 phút mỗi ngày.'
  },
  29: {
    week: 29,
    theme: 'Chủ đề 6: Sinh vật và môi trường',
    title: 'Bài 29: Chuỗi thức ăn trong tự nhiên',
    knowledge: 'Khái niệm chuỗi thức ăn; sinh vật sản xuất (thực vật), sinh vật tiêu thụ (động vật ăn thực vật, động vật ăn thịt) và sinh vật phân giải.',
    periods: ['Tiết 1: Khám phá mối quan hệ thức ăn giữa các loài sinh vật', 'Tiết 2: Vẽ và giải thích sơ đồ chuỗi thức ăn trong tự nhiên'],
    game: { name: 'Xâu chuỗi mắt xích sinh tồn', goal: 'Hiểu cấu trúc chuỗi thức ăn', materials: 'Thẻ hình cây cỏ, châu chấu, ếch, rắn, đại bàng', rules: 'Xếp các con vật theo đúng chiều mũi tên của chuỗi thức ăn' },
    method: 'Mô hình hóa chuỗi thức ăn bằng sơ đồ mắt xích sinh thái',
    scenario: 'Vẽ chuỗi thức ăn gồm: Cỏ -> Thỏ -> Cáo -> Vi sinh vật phân giải.'
  },
  30: {
    week: 30,
    theme: 'Chủ đề 6: Sinh vật và môi trường',
    title: 'Bài 30: Vai trò của thực vật trong chuỗi thức ăn',
    knowledge: 'Thực vật là mắt xích đầu tiên (sinh vật sản xuất) trong đa số chuỗi thức ăn; vai trò của thực vật trong việc duy trì cân bằng sinh thái và cung cấp dưỡng khí.',
    periods: ['Tiết 1: Tìm hiểu vị trí và tầm quan trọng của thực vật trong chuỗi thức ăn', 'Tiết 2: Phân tích hậu quả đối với hệ sinh thái khi rừng cây bị phá hủy'],
    game: { name: 'Mất một mắt xích thì sao?', goal: 'Hiểu tính toàn vẹn của hệ sinh thái', materials: 'Sợi dây kết nối nhóm', rules: 'Mô phỏng khi thực vật biến mất thì các mắt xích động vật phía sau bị ảnh hưởng' },
    method: 'Mô phỏng hệ sinh thái và thảo luận bảo vệ đa dạng sinh học',
    scenario: 'Giải thích vì sao bảo vệ rừng cũng chính là bảo vệ các loài thú quý hiếm.'
  },
  31: {
    week: 31,
    theme: 'Chủ đề 6: Sinh vật và môi trường',
    title: 'Bài 31: Ôn tập chủ đề Sinh vật và môi trường',
    knowledge: 'Hệ thống hóa mối quan hệ sinh thái, chuỗi thức ăn và trách nhiệm bảo vệ môi trường sống tự nhiên.',
    periods: ['Tiết 1: Hệ thống hóa kiến thức Chuỗi thức ăn và Cân bằng sinh thái', 'Tiết 2: Báo cáo dự án bảo vệ môi trường và đa dạng sinh học'],
    game: { name: 'Hành tinh xanh', goal: 'Đánh giá kiến thức sinh thái học', materials: 'Cây tri thức môi trường', rules: 'Gắn các thẻ hành động xanh lên cây cam kết bảo vệ môi trường' },
    method: 'Thuyết trình dự án bảo vệ thiên nhiên và sơ đồ tư duy',
    scenario: 'Đề xuất ý tưởng trồng thêm cây xanh và bảo vệ chim muông trong khuôn viên trường.'
  },
  32: {
    week: 32,
    theme: 'Thực hành & Dự án Khoa học',
    title: 'Bài 32: Thực hành: Khảo sát mối quan hệ giữa sinh vật và môi trường xung quanh',
    knowledge: 'Kĩ năng quan sát thực địa, ghi chép nhật kí khoa học và tổng hợp số liệu về cây trồng, con vật và môi trường sống tại địa phương.',
    periods: ['Tiết 1: Lập kế hoạch và tiến hành khảo sát sinh vật trong vườn trường', 'Tiết 2: Tổng hợp kết quả, vẽ sơ đồ chuỗi thức ăn thực tế và báo cáo'],
    game: { name: 'Nhà tự nhiên học khám phá vườn trường', goal: 'Rèn kĩ năng quan sát thực địa', materials: 'Kính lúp, sổ tay ghi chép', rules: 'Quan sát các loài sâu bọ, cây cỏ và chim chóc trong vườn trường' },
    method: 'Dạy học ngoài không gian lớp học và trải nghiệm thực địa',
    scenario: 'Ghi chép vào nhật kí các loài sinh vật bắt gặp tại bồn hoa trường học.'
  },
  33: {
    week: 33,
    theme: 'Ôn tập cuối năm học',
    title: 'Bài 33: Ôn tập cuối năm học (Phần 1: Chất, Năng lượng, Thực vật và Động vật)',
    knowledge: 'Hệ thống hóa kiến thức 3 chủ đề đầu: Nước, Không khí, Ánh sáng, Âm thanh, Nhiệt, Sự sống của Thực vật và Động vật.',
    periods: ['Tiết 1: Ôn tập chủ đề Chất và Năng lượng', 'Tiết 2: Ôn tập chủ đề Thực vật và Động vật'],
    game: { name: 'Chinh phục đỉnh cao tri thức', goal: 'Ôn tập học kì II', materials: 'Bảng thi đua theo nhóm', rules: 'Giải các câu đố khoa học vượt qua các trạm thử thách' },
    method: 'Ôn tập tích cực qua trạm học tập (Learning Stations)',
    scenario: 'Giải thích hiện tượng cốc nước đá để ngoài trời nóng bị đọng nước xung quanh thành cốc.'
  },
  34: {
    week: 34,
    theme: 'Ôn tập cuối năm học',
    title: 'Bài 34: Ôn tập cuối năm học (Phần 2: Nấm, Con người và Sức khoẻ, Sinh vật và Môi trường)',
    knowledge: 'Hệ thống hóa kiến thức 3 chủ đề sau: Đặc điểm của nấm, Dinh dưỡng và an toàn sức khỏe, Chuỗi thức ăn và bảo vệ môi trường.',
    periods: ['Tiết 1: Ôn tập chủ đề Nấm, Con người và Sức khỏe', 'Tiết 2: Ôn tập chủ đề Sinh vật, Môi trường và Rèn kĩ năng thực hành'],
    game: { name: 'Rung chuông vàng tổng kết', goal: 'Đánh giá kiến thức toàn diện Khoa học Lớp 4', materials: 'Bảng con, chuông bấm', rules: 'Học sinh viết đáp án các câu hỏi khoa học tổng hợp' },
    method: 'Hệ thống hóa kiến thức toàn khóa và giải quyết tình huống thực tế',
    scenario: 'Trình bày giải pháp giữ gìn nguồn nước và bảo vệ thực phẩm an toàn cho cả nhà trong mùa hè.'
  },
  35: {
    week: 35,
    theme: 'Đánh giá cuối năm',
    title: 'Bài 35: Đánh giá cuối năm học môn Khoa học Lớp 4',
    knowledge: 'Đánh giá định kì cuối năm học môn Khoa học Lớp 4 theo chuẩn kiến thức, kĩ năng và năng lực khoa học GDPT 2018.',
    periods: ['Tiết 1: Kiểm tra đánh giá năng lực nhận thức khoa học', 'Tiết 2: Kiểm tra đánh giá kĩ năng tìm hiểu tự nhiên và vận dụng kiến thức'],
    game: { name: 'Ngày hội Sáng tạo Khoa học nhí', goal: 'Tổng kết và vinh danh', materials: 'Giấy chứng nhận Nhà khoa học nhí', rules: 'Trưng bày các sản phẩm thí nghiệm và mô hình STEM xuất sắc trong năm' },
    method: 'Đánh giá chuẩn năng lực và phẩm chất học sinh tiểu học',
    scenario: 'Tự tin thuyết minh về một thí nghiệm khoa học em yêu thích nhất trong năm học Lớp 4.'
  }
};

export const SCIENCE_GRADE_5_DATA: Record<number, ScienceWeekItem> = {
  1: {
    week: 1,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 1: Thành phần và vai trò của đất đối với cây trồng',
    knowledge: 'Thành phần của đất gồm chất khoáng, chất mùn, không khí, nước và các sinh vật; vai trò của đất là cung cấp chất dinh dưỡng, nước, không khí và giữ cho rễ cây đứng vững.',
    periods: ['Tiết 1: Làm thí nghiệm khám phá các thành phần chính của đất', 'Tiết 2: Tìm hiểu vai trò của đất đối với cây trồng và đời sống con người'],
    game: { name: 'Nhà thổ nhưỡng học nhí', goal: 'Nhận biết thành phần của đất', materials: 'Mẫu đất khô, cốc nước, que khuấy', rules: 'Cho đất vào cốc nước khuấy đều, quan sát bọt khí nổi lên và các lớp hạt lắng đọng' },
    method: 'Thực hành thí nghiệm khám phá và quan sát mẫu vật thật',
    scenario: 'Giải thích vì sao đất có nhiều chất mùn màu đen lại tốt cho cây trồng hơn đất cát bạc màu.'
  },
  2: {
    week: 2,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 2: Ô nhiễm, xói mòn đất và bảo vệ môi trường đất',
    knowledge: 'Nguyên nhân gây ô nhiễm và xói mòn đất (lạm dụng thuốc trừ sâu, phân bón hóa học, chặt phá rừng, rác thải nhựa); tác hại và biện pháp bảo vệ, cải tạo đất trồng.',
    periods: ['Tiết 1: Tìm hiểu nguyên nhân và tác hại của ô nhiễm, xói mòn đất', 'Tiết 2: Đề xuất các biện pháp bảo vệ và cải tạo môi trường đất'],
    game: { name: 'Giữ đất giữ rừng', goal: 'Hiểu vai trò của thảm thực vật chống xói mòn đất', materials: 'Hai khay đất (một khay có cỏ, một khay đất trống), bình tưới', rules: 'Tưới nước vào hai khay và so sánh lượng đất bị trôi theo dòng nước' },
    method: 'Mô hình hóa thí nghiệm xói mòn đất và thảo luận dự án môi trường',
    scenario: 'Đề xuất biện pháp ủ phân hữu cơ từ rác nhà bếp để bón cho cây thay thế phân hóa học.'
  },
  3: {
    week: 3,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 3: Hỗn hợp và dung dịch',
    knowledge: 'Khái niệm hỗn hợp (hai hay nhiều chất trộn lẫn nhưng không tan vào nhau) và dung dịch (chất tan hòa tan hoàn toàn vào dung môi tạo thành chất lỏng đồng nhất); một số cách tách các chất ra khỏi hỗn hợp và dung dịch.',
    periods: ['Tiết 1: Thí nghiệm phân biệt hỗn hợp và dung dịch', 'Tiết 2: Thực hành các phương pháp tách chất (lọc, làm lắng, cô cạn)'],
    game: { name: 'Thợ pha chế tài ba', goal: 'Phân loại hỗn hợp và dung dịch', materials: 'Nước, dầu ăn, đường, muối, cát, cốc thủy tinh', rules: 'Pha các chất và xác định đâu là hỗn hợp, đâu là dung dịch' },
    method: 'Thực hành thí nghiệm đối chứng và phương pháp bàn tay nặn bột',
    scenario: 'Giải thích quy trình người nông dân làm muối bằng cách phơi nước biển dưới ánh nắng mặt trời.'
  },
  4: {
    week: 4,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 4: Đặc điểm của chất ở trạng thái rắn, lỏng, khí. Sự biến đổi trạng thái của chất',
    knowledge: 'Đặc điểm về hình dạng và thể tích của chất ở thể rắn, lỏng, khí; sự biến đổi trạng thái của chất khi nhiệt độ thay đổi (nóng chảy, đông đặc, bay hơi, ngưng tụ).',
    periods: ['Tiết 1: Khám phá đặc điểm hình dạng và thể tích của 3 thể', 'Tiết 2: Thí nghiệm về sự biến đổi trạng thái của sáp nến hoặc bơ khi đun nóng và làm nguội'],
    game: { name: 'Vũ điệu của các phân tử', goal: 'Mô phỏng chuyển động của các thể', materials: 'Thẻ vận động', rules: 'Đóng vai các phân tử đứng khít nhau (thể rắn), chuyển động trượt (thể lỏng), chuyển động tự do (thể khí)' },
    method: 'Đóng vai mô hình hóa phân tử và thực hành thí nghiệm nhiệt độ',
    scenario: 'Giải thích hiện tượng đun sáp nến chảy lỏng rồi đổ vào khuôn để làm nến thơm.'
  },
  5: {
    week: 5,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 5: Sự biến đổi hoá học của chất',
    knowledge: 'Phân biệt sự biến đổi vật lý (chỉ thay đổi thể, hình dạng) và sự biến đổi hóa học (tạo thành chất mới có tính chất khác hẳn); dấu hiệu nhận biết biến đổi hóa học (thay đổi màu sắc, tỏa nhiệt, sinh chất khí, tạo kết tủa).',
    periods: ['Tiết 1: Thí nghiệm nhận biết sự biến đổi hóa học (đốt đường, giấm tác dụng với baking soda)', 'Tiết 2: Phân biệt sự biến đổi vật lý và biến đổi hóa học trong đời sống'],
    game: { name: 'Biến đổi nào đây?', goal: 'Phân biệt biến đổi vật lý và hóa học', materials: 'Bảng chữ LÝ HỌC - HÓA HỌC', rules: 'Giơ bảng phân loại khi GV chiếu hiện tượng: đinh gỉ, xé giấy, đun sôi nước, trứng rán...' },
    method: 'Thực hành thí nghiệm hóa học an toàn và đối chiếu hiện tượng thực tế',
    scenario: 'Giải thích vì sao khi đun đường quá lửa đường chuyển từ màu trắng sang màu đen khét và có vị đắng.'
  },
  6: {
    week: 6,
    theme: 'Chủ đề 1: Chất',
    title: 'Bài 6: Ôn tập chủ đề Chất',
    knowledge: 'Hệ thống hóa kiến thức về đất trồng, hỗn hợp, dung dịch, 3 thể của chất, biến đổi vật lý và biến đổi hóa học.',
    periods: ['Tiết 1: Hệ thống hóa kiến thức chủ đề Chất bằng sơ đồ tư duy', 'Tiết 2: Làm bài tập thực hành vận dụng và đánh giá chủ đề'],
    game: { name: 'Đấu trường khoa học', goal: 'Tổng kết chủ đề Chất', materials: 'Chuông bấm, bảng nhóm', rules: 'Thi trả lời nhanh các câu hỏi lý thuyết và bài tập giải thích hiện tượng' },
    method: 'Học tập hợp tác nhóm và sơ đồ hóa hệ thống tri thức',
    scenario: 'Trình bày trước lớp sơ đồ phân biệt biến đổi vật lý và biến đổi hóa học kèm ví dụ minh họa.'
  },
  7: {
    week: 7,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 7: Vai trò của năng lượng',
    knowledge: 'Khái niệm năng lượng; các nguồn năng lượng quen thuộc (thức ăn, mặt trời, gió, nước chảy, chất đốt, điện); năng lượng cần thiết cho mọi hoạt động của con người, động vật, máy móc.',
    periods: ['Tiết 1: Khám phá các nguồn năng lượng xung quanh ta', 'Tiết 2: Tìm hiểu vai trò của năng lượng đối với hoạt động sống và sản xuất'],
    game: { name: 'Tiếp sức nguồn năng lượng', goal: 'Ghép đúng nguồn năng lượng với thiết bị hoạt động', materials: 'Bộ thẻ thiết bị và nguồn năng lượng', rules: 'Ghép ô tô với xăng dầu, quạt máy với điện, thuyền buồm với gió' },
    method: 'Dạy học trực quan và phân tích quy trình chuyển hóa năng lượng',
    scenario: 'Kể tên các nguồn năng lượng đang được sử dụng trong ngôi nhà của em.'
  },
  8: {
    week: 8,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 8: Sử dụng năng lượng điện',
    knowledge: 'Nguồn điện (nhà máy thủy điện, nhiệt điện, pin, ắc quy); ứng dụng của năng lượng điện để thắp sáng, đốt nóng, chạy máy, truyền tin; quy tắc sử dụng điện an toàn và tiết kiệm.',
    periods: ['Tiết 1: Tìm hiểu các nguồn cung cấp điện và ứng dụng của điện', 'Tiết 2: Thực hành quy tắc an toàn khi sử dụng điện và tiết kiệm điện'],
    game: { name: 'Thám tử tiết kiệm điện', goal: 'Nhận diện hành vi lãng phí và nguy cơ mất an toàn điện', materials: 'Tranh ảnh tình huống', rules: 'Tìm các lỗi sai trong tranh sử dụng điện gia đình và nêu cách khắc phục' },
    method: 'Giáo dục kĩ năng an toàn điện và xử lý tình huống thực tế',
    scenario: 'Nhắc nhở người thân tắt quạt, tắt đèn khi ra khỏi phòng để tiết kiệm điện.'
  },
  9: {
    week: 9,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 9: Mạch điện đơn giản. Vật dẫn điện và vật cách điện',
    knowledge: 'Cấu tạo mạch điện kín gồm nguồn điện (pin), dây dẫn và thiết bị tiêu thụ (bóng đèn); phân biệt vật dẫn điện (kim loại...) và vật cách điện (nhựa, cao su, thủy tinh, sứ...).',
    periods: ['Tiết 1: Thực hành lắp ráp mạch điện thắp sáng bóng đèn đơn giản', 'Tiết 2: Thí nghiệm kiểm tra vật dẫn điện và vật cách điện'],
    game: { name: 'Bóng đèn bừng sáng', goal: 'Lắp ráp thành công mạch điện kín', materials: 'Pin 1.5V, dây điện có kẹp cá sấu, bóng đèn pin mini, công tắc', rules: 'Lắp đúng mạch điện để bóng đèn phát sáng và chèn các vật liệu thử nghiệm' },
    method: 'Thực hành kĩ thuật STEM lắp mạch điện một chiều',
    scenario: 'Giải thích vì sao kìm điện và tua-vít có cán bọc nhựa dày.'
  },
  10: {
    week: 10,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 10: Năng lượng chất đốt',
    knowledge: 'Các loại chất đốt (rắn: than đá, củi; lỏng: xăng, dầu; khí: khí gas, khí biogas); ứng dụng và nguy cơ cháy nổ, ô nhiễm môi trường; sử dụng an toàn, tiết kiệm chất đốt.',
    periods: ['Tiết 1: Phân loại các chất đốt và công dụng trong đời sống', 'Tiết 2: Kĩ năng phòng cháy chữa cháy và sử dụng tiết kiệm chất đốt'],
    game: { name: 'Lính cứu hỏa nhí', goal: 'Kĩ năng thoát hiểm và dập lửa nhỏ', materials: 'Khăn ẩm, bình chữa cháy mô hình', rules: 'Thực hành thao tác bịt khăn ướt cúi thấp người thoát khỏi đám khói' },
    method: 'Dạy học kĩ năng sinh tồn phòng chống cháy nổ và ứng dụng biogas',
    scenario: 'Quy trình kiểm tra khóa van bình gas an toàn sau khi nấu ăn xong.'
  },
  11: {
    week: 11,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 11: Sử dụng năng lượng mặt trời, năng lượng gió, năng lượng nước chảy',
    knowledge: 'Năng lượng tái tạo xanh: mặt trời (quang điện, bình nước nóng), gió (tuabin gió), nước chảy (nhà máy thủy điện); ưu điểm không gây ô nhiễm môi trường và phát triển bền vững.',
    periods: ['Tiết 1: Khám phá ứng dụng năng lượng mặt trời, gió và nước chảy', 'Tiết 2: Chế tạo mô hình chong chóng gió phát điện hoặc xe chạy pin mặt trời mini'],
    game: { name: 'Năng lượng xanh cho tương lai', goal: 'Hiểu lợi ích của năng lượng tái tạo', materials: 'Mô hình pin mặt trời mini, quạt gió', rules: 'Thí nghiệm đưa pin mặt trời ra nắng để quạt quay' },
    method: 'Dạy học STEM năng lượng tái tạo và bảo vệ khí hậu toàn cầu',
    scenario: 'Giải thích vì sao ngày nay nhiều gia đình lắp đặt tấm pin năng lượng mặt trời trên mái nhà.'
  },
  12: {
    week: 12,
    theme: 'Chủ đề 2: Năng lượng',
    title: 'Bài 12: Ôn tập chủ đề Năng lượng',
    knowledge: 'Hệ thống hóa kiến thức về các nguồn năng lượng, năng lượng điện, mạch điện, chất đốt và năng lượng tái tạo sạch.',
    periods: ['Tiết 1: Tổng kết kiến thức chủ đề Năng lượng qua sơ đồ tư duy', 'Tiết 2: Báo cáo sản phẩm mô hình STEM và bài tập vận dụng'],
    game: { name: 'Thử thách Tri thức Năng lượng', goal: 'Đánh giá chủ đề Năng lượng', materials: 'Bộ câu hỏi tình huống', rules: 'Các đội vượt qua 4 trạm: Điện - Chất đốt - Mạch điện - Năng lượng xanh' },
    method: 'Học tập theo trạm và đánh giá sản phẩm học tập',
    scenario: 'Thuyết trình dự án "Trường học xanh sử dụng năng lượng tiết kiệm và hiệu quả".'
  },
  13: {
    week: 13,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 13: Sinh sản ở thực vật có hoa',
    knowledge: 'Cơ quan sinh sản của thực vật có hoa là hoa; cấu tạo nhị (cơ quan sinh dục đực) và nhụy (cơ quan sinh dục cái); các hình thức thụ phấn (nhờ côn trùng, nhờ gió) và quá trình thụ tinh tạo quả, hạt.',
    periods: ['Tiết 1: Quan sát cấu tạo hoa lưỡng tính và hoa đơn tính', 'Tiết 2: Tìm hiểu quá trình thụ phấn, thụ tinh, hình thành quả và hạt'],
    game: { name: 'Ong bướm truyền phấn hoa', goal: 'Hiểu vai trò của côn trùng trong thụ phấn', materials: 'Bông hoa dâm bụt thật hoặc hoa bưởi, kính lúp', rules: 'Dùng tăm bông lấy hạt phấn ở bao phấn nhị chạm vào đầu nhụy' },
    method: 'Quan sát mẫu vật hoa thật kết hợp kính lúp và video sinh học',
    scenario: 'Tách các bộ phận đài hoa, cánh hoa, nhị và nhụy của bông hoa dâm bụt trên khay nhựa.'
  },
  14: {
    week: 14,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 14: Sự lớn lên và phát triển của cây con',
    knowledge: 'Cây con có thể mọc lên từ hạt (cấu tạo hạt: vỏ, phôi, chất dinh dưỡng) hoặc mọc lên từ một số bộ phận của cây mẹ (thân, rễ củ, lá); các điều kiện cần cho hạt nảy mầm.',
    periods: ['Tiết 1: Làm thí nghiệm gieo hạt và tìm hiểu điều kiện nảy mầm của hạt', 'Tiết 2: Khám phá sự sinh sản của cây con từ thân, củ, lá (khoai lang, mía, lá bỏng)'],
    game: { name: 'Hành trình nảy mầm', goal: 'Khám phá sự phát triển của cây con', materials: 'Hạt đỗ xanh ngâm nảy mầm, củ khoai lang', rules: 'Sắp xếp các bức tranh từ hạt đỗ nứt nanh đến cây có 2 lá mầm theo đúng thứ tự' },
    method: 'Thực nghiệm gieo trồng và theo dõi nhật kí phát triển sinh vật',
    scenario: 'Quan sát mầm non mọc ra từ mắt củ khoai tây hoặc đốt thân cây mía.'
  },
  15: {
    week: 15,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 15: Sinh sản của động vật',
    knowledge: 'Động vật đẻ trứng (chim, cá, bò sát, lưỡng cư, côn trùng) và động vật đẻ con (thú/động vật có vú); quá trình thụ tinh kết hợp giữa tinh trùng của con đực và trứng của con cái tạo thành hợp tử.',
    periods: ['Tiết 1: Phân biệt động vật đẻ trứng và động vật đẻ con', 'Tiết 2: Tìm hiểu quá trình thụ tinh và chăm sóc con non ở động vật'],
    game: { name: 'Con sinh ra từ đâu?', goal: 'Phân loại động vật đẻ trứng và đẻ con', materials: 'Bộ thẻ động vật', rules: 'Xếp nhanh thẻ con vật vào 2 tổ: Tổ Đẻ trứng và Tổ Đẻ con' },
    method: 'Dạy học trực quan qua video thế giới động vật và thảo luận nhóm',
    scenario: 'Kể tên các loài động vật nuôi trong nhà đẻ con và nuôi con bằng sữa mẹ.'
  },
  16: {
    week: 16,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 16: Vòng đời và sự phát triển của động vật',
    knowledge: 'Vòng đời của động vật đẻ trứng có biến thái (bướm: trứng -> sâu -> nhộng -> bướm; ếch: trứng -> nòng nọc -> ếch con -> ếch trưởng thành) và không biến thái (gà, chó, mèo).',
    periods: ['Tiết 1: Khám phá vòng đời của loài bướm và loài ếch', 'Tiết 2: So sánh vòng đời của các loài động vật và biện pháp diệt trừ sâu bọ có hại'],
    game: { name: 'Vòng đời kì diệu', goal: 'Nắm vững các giai đoạn phát triển của bướm và ếch', materials: 'Mô hình vòng đời 4 giai đoạn', rules: 'Ghép đúng thứ tự vòng đời của bướm và chỉ ra giai đoạn sâu bướm phá hoại mùa màng' },
    method: 'Mô hình hóa vòng đời sinh học và liên hệ ứng dụng nông nghiệp',
    scenario: 'Giải thích vì sao nông dân thường phun thuốc trừ sâu ở giai đoạn sâu non thay vì giai đoạn bướm.'
  },
  17: {
    week: 17,
    theme: 'Chủ đề 3: Thực vật và động vật',
    title: 'Bài 17: Ôn tập chủ đề Thực vật và động vật',
    knowledge: 'Hệ thống hóa sự sinh sản của thực vật có hoa, cây con mọc từ hạt/thân/lá, động vật đẻ trứng/đẻ con và vòng đời sinh trưởng.',
    periods: ['Tiết 1: Hệ thống hóa kiến thức sinh sản của thực vật và động vật', 'Tiết 2: Thuyết trình sơ đồ vòng đời và đánh giá chủ đề'],
    game: { name: 'Vương quốc sinh vật', goal: 'Tổng kết chủ đề Thực vật và Động vật', materials: 'Sơ đồ tư duy, câu hỏi tương tác', rules: 'Hoàn thành bảng so sánh sinh sản ở thực vật và động vật' },
    method: 'Sơ đồ tư duy và báo cáo dự án sinh học',
    scenario: 'Vẽ sơ đồ vòng đời của loài ếch và giải thích hiện tượng đứt đuôi của nòng nọc.'
  },
  18: {
    week: 18,
    theme: 'Đánh giá Học kì I',
    title: 'Bài 18: Ôn tập và Đánh giá Học kì I môn Khoa học Lớp 5',
    knowledge: 'Tổng kết kiến thức học kì I: Chất (đất, hỗn hợp, biến đổi hóa học), Năng lượng (điện, chất đốt, năng lượng tái tạo), Thực vật và Động vật (sinh sản, vòng đời).',
    periods: ['Tiết 1: Ôn tập tổng hợp kiến thức trọng tâm học kì I', 'Tiết 2: Đánh giá định kì cuối học kì I môn Khoa học Lớp 5'],
    game: { name: 'Rung chuông vàng HKI', goal: 'Đánh giá kiến thức toàn diện nửa đầu năm học', materials: 'Bảng con, bộ câu hỏi trắc nghiệm và tự luận', rules: 'Học sinh ghi câu trả lời trên bảng con và giải thích hiện tượng khoa học' },
    method: 'Đánh giá chuẩn năng lực và phẩm chất học sinh học kì I',
    scenario: 'Tự đánh giá các kiến thức khoa học đã học và vận dụng vào thực tế gia đình.'
  },
  19: {
    week: 19,
    theme: 'Chủ đề 4: Vi khuẩn',
    title: 'Bài 19: Vi khuẩn xung quanh chúng ta',
    knowledge: 'Vi khuẩn là những sinh vật có kích thước vô cùng nhỏ bé, chỉ quan sát được dưới kính hiển vi; vi khuẩn có ở khắp mọi nơi (trong không khí, đất, nước, trên cơ thể người và sinh vật).',
    periods: ['Tiết 1: Tìm hiểu kích thước, hình dạng và môi trường sống của vi khuẩn', 'Tiết 2: Quan sát hình ảnh vi khuẩn qua kính hiển vi phóng đại'],
    game: { name: 'Thế giới vi mô bí ẩn', goal: 'Hiểu sự tồn tại của vi khuẩn', materials: 'Tranh ảnh kính hiển vi và các hình dạng vi khuẩn (hình cầu, hình que, hình xoắn)', rules: 'Phân loại vi khuẩn theo hình dạng đặc trưng' },
    method: 'Khai thác học liệu số, video kính hiển vi điện tử',
    scenario: 'Giải thích vì sao bàn tay dù nhìn rất sạch nhưng vẫn có hàng triệu vi khuẩn bám trên bề mặt.'
  },
  20: {
    week: 20,
    theme: 'Chủ đề 4: Vi khuẩn',
    title: 'Bài 20: Vi khuẩn có ích trong chế biến thực phẩm',
    knowledge: 'Vai trò có ích của vi khuẩn lên men trong sản xuất sữa chua, muối dưa cà, làm phô mai, nước tương; quy trình làm sữa chua tại nhà.',
    periods: ['Tiết 1: Khám phá vai trò có ích của vi khuẩn trong đời sống và nông nghiệp', 'Tiết 2: Thực hành tìm hiểu quy trình làm sữa chua lên men an toàn'],
    game: { name: 'Chế tạo hũ sữa chua thơm ngon', goal: 'Hiểu quá trình lên men lactic', materials: 'Sữa đặc, sữa tươi, hộp sữa chua men mồi', rules: 'Nêu đúng quy trình pha chế và ủ ấm sữa chua để vi khuẩn lên men tốt' },
    method: 'Dạy học STEM chế biến thực phẩm lên men hữu ích',
    scenario: 'Cùng mẹ làm sữa chua và giải thích vì sao cần ủ ấm hỗn hợp ở nhiệt độ 40-45 độ C.'
  },
  21: {
    week: 21,
    theme: 'Chủ đề 4: Vi khuẩn',
    title: 'Bài 21: Vi khuẩn gây bệnh ở người và cách phòng tránh',
    knowledge: 'Một số bệnh do vi khuẩn gây ra (tiêu chảy, tả, uốn ván, viêm họng, nhiễm trùng đường ruột); con đường lây truyền và các biện pháp phòng tránh (rửa tay bằng xà phòng, ăn chín uống sôi, tiêm phòng).',
    periods: ['Tiết 1: Tìm hiểu các bệnh truyền nhiễm do vi khuẩn và con đường lây bệnh', 'Tiết 2: Rèn luyện thói quen vệ sinh phòng bệnh và quy trình rửa tay 6 bước'],
    game: { name: 'Đánh bay vi khuẩn gây hại', goal: 'Thành thạo 6 bước rửa tay đúng chuẩn Bộ Y tế', materials: 'Xà phòng, khăn lau sạch', rules: 'Thực hành thuần thục 6 bước rửa tay bằng xà phòng dưới vòi nước sạch' },
    method: 'Thực hành thao tác vệ sinh chuẩn mực và đóng vai tuyên truyền viên y tế',
    scenario: 'Nhắc nhở bạn bè rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh.'
  },
  22: {
    week: 22,
    theme: 'Chủ đề 4: Vi khuẩn',
    title: 'Bài 22: Ôn tập chủ đề Vi khuẩn',
    knowledge: 'Hệ thống hóa kiến thức về đặc điểm của vi khuẩn, vi khuẩn có lợi trong thực phẩm và kĩ năng phòng chống vi khuẩn gây bệnh.',
    periods: ['Tiết 1: Tổng kết kiến thức chủ đề Vi khuẩn qua sơ đồ tư duy', 'Tiết 2: Đánh giá chủ đề và báo cáo sản phẩm nhật kí làm sữa chua'],
    game: { name: 'Chiến dịch Bàn tay sạch', goal: 'Tổng kết chủ đề Vi khuẩn', materials: 'Bộ câu hỏi trắc nghiệm, phiếu đánh giá', rules: 'Thi đua trả lời câu hỏi bảo vệ sức khỏe và vệ sinh an toàn thực phẩm' },
    method: 'Thuyết trình sản phẩm thực hành và sơ đồ tư duy',
    scenario: 'Tuyên truyền thông điệp "Ăn chín, uống sôi, rửa tay sạch khuẩn" trong trường học.'
  },
  23: {
    week: 23,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 23: Sự sinh sản ở người',
    knowledge: 'Con người sinh ra từ đâu: sự kết hợp giữa trứng của mẹ và tinh trùng của bố tạo thành hợp tử; sự phát triển của thai nhi trong bụng mẹ; tình cảm yêu thương, biết ơn cha mẹ.',
    periods: ['Tiết 1: Khám phá sự thụ tinh và phát triển của thai nhi trong cơ thể mẹ', 'Tiết 2: Bày tỏ lòng biết ơn và sự chăm sóc đối với phụ nữ mang thai'],
    game: { name: 'Hạt mầm sự sống', goal: 'Hiểu sự hình thành và lớn lên của thai nhi', materials: 'Tranh ảnh các giai đoạn phát triển thai nhi', rules: 'Sắp xếp các bức tranh thai nhi từ tháng thứ nhất đến tháng thứ 9 theo đúng trình tự' },
    method: 'Giáo dục giới tính khoa học, nhân văn và gắn kết tình cảm gia đình',
    scenario: 'Biết giúp đỡ mẹ mang xách đồ nặng và quan tâm khi mẹ mệt mỏi.'
  },
  24: {
    week: 24,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 24: Các giai đoạn phát triển của con người',
    knowledge: 'Các giai đoạn phát triển chính của con người từ lúc mới sinh: Tuổi ấu thơ (dưới 3 tuổi), Tuổi học sinh/Tuổi ấu thơ muộn (3-10 tuổi), Tuổi dậy thì/vị thành niên (10-19 tuổi), Tuổi trưởng thành (20-60 tuổi), Tuổi già (trên 60 tuổi).',
    periods: ['Tiết 1: Khám phá các giai đoạn phát triển từ sơ sinh đến tuổi già', 'Tiết 2: Đặc điểm nổi bật và ý nghĩa của từng giai đoạn cuộc đời'],
    game: { name: 'Dòng thời gian cuộc đời', goal: 'Xác định đúng các giai đoạn phát triển', materials: 'Trục thời gian, thẻ hình ảnh các lứa tuổi', rules: 'Gắn thẻ ảnh em bé, học sinh, thanh niên, người trung niên, ông bà vào đúng mốc tuổi' },
    method: 'Khai thác trục thời gian trực quan và liên hệ các thành viên trong gia đình',
    scenario: 'Nhận biết bản thân đang bước vào giai đoạn chuyển tiếp quan trọng từ trẻ em sang tuổi dậy thì.'
  },
  25: {
    week: 25,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 25: Nam và nữ',
    knowledge: 'Sự khác nhau về mặt sinh học giữa nam và nữ (cấu tạo cơ quan sinh dục); bình đẳng giới: nam và nữ đều có quyền lợi, nghĩa vụ và khả năng học tập, làm việc như nhau; tôn trọng bạn khác giới.',
    periods: ['Tiết 1: Phân biệt sự khác nhau về mặt sinh học giữa nam và nữ', 'Tiết 2: Tìm hiểu về bình đẳng giới và sự tôn trọng lẫn nhau trong học tập, cuộc sống'],
    game: { name: 'Ai cũng có thể làm được!', goal: 'Xóa bỏ định kiến giới', materials: 'Thẻ nghề nghiệp và hoạt động', rules: 'Khẳng định cả nam và nữ đều có thể làm phi công, bác sĩ, kĩ sư, đầu bếp giỏi' },
    method: 'Thảo luận nhóm về bình đẳng giới và giáo dục giới tính tôn trọng',
    scenario: 'Hợp tác hòa đồng, giúp đỡ lẫn nhau giữa các bạn nam và bạn nữ trong lớp học.'
  },
  26: {
    week: 26,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 26: Chăm sóc sức khoẻ tuổi dậy thì',
    knowledge: 'Những thay đổi về thể chất, sinh lý và tâm lý ở tuổi dậy thì của nam và nữ; kĩ năng giữ gìn vệ sinh cơ quan sinh dục, ăn uống đủ chất và điều hòa cảm xúc tuổi dậy thì.',
    periods: ['Tiết 1: Những thay đổi về thể chất và tâm sinh lý ở tuổi dậy thì', 'Tiết 2: Kĩ năng chăm sóc, vệ sinh thân thể và giữ tinh thần lành mạnh'],
    game: { name: 'Hộp thư điều em muốn hỏi', goal: 'Giải đáp thắc mắc tuổi dậy thì', materials: 'Hộp thư kín đáo, phiếu câu hỏi', rules: 'Học sinh viết câu hỏi thắc mắc giấu tên, GV tư vấn và giải đáp khoa học' },
    method: 'Tư vấn tâm lý học đường, giáo dục sức khỏe sinh sản lứa tuổi đầu cấp',
    scenario: 'Kĩ năng tắm rửa, giặt đồ lót sạch sẽ và tâm sự với bố mẹ khi cơ thể có sự thay đổi.'
  },
  27: {
    week: 27,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 27: An toàn trong cuộc sống và phòng tránh bị xâm hại',
    knowledge: 'Nhận biết các nguy cơ xâm hại tình dục và bạo lực thân thể; quy tắc 5 ngón tay (Quy tắc đồ lót); kĩ năng phòng tránh, từ chối kiên quyết (NÓI KHÔNG - BỎ CHẠY - KỂ LẠI) và tìm kiếm sự trợ giúp.',
    periods: ['Tiết 1: Nhận diện nguy cơ bị xâm hại và Quy tắc 5 ngón tay an toàn', 'Tiết 2: Thực hành kĩ năng ứng phó khi gặp tình huống nguy hiểm và số điện thoại khẩn cấp (111)'],
    game: { name: 'Vòng tròn bảo vệ an toàn', goal: 'Khắc sâu Quy tắc 5 ngón tay phòng chống xâm hại', materials: 'Bàn tay an toàn mô hình', rules: 'Nêu rõ ai được ôm hôn (ngón cái), ai được nắm tay (ngón trỏ), ai phải xua tay (ngón út)' },
    method: 'Dạy học kĩ năng tự bảo vệ bản thân, đóng vai xử lý tình huống khẩn cấp',
    scenario: 'Xử lý kiên quyết khi có người lạ rủ rê đi chơi hoặc có hành vi chạm vào vùng riêng tư.'
  },
  28: {
    week: 28,
    theme: 'Chủ đề 5: Con người và sức khoẻ',
    title: 'Bài 28: Ôn tập chủ đề Con người và sức khoẻ',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức về sự sinh sản, các giai đoạn phát triển, bình đẳng giới, chăm sóc tuổi dậy thì và phòng tránh xâm hại.',
    periods: ['Tiết 1: Tổng kết kiến thức chủ đề Con người và Sức khỏe', 'Tiết 2: Thực hành xử lý tình huống và đánh giá chủ đề'],
    game: { name: 'Hành trang tuổi lớn khôn', goal: 'Đánh giá kiến thức sức khỏe và kĩ năng sống', materials: 'Bộ thẻ tình huống ứng xử', rules: 'Bốc thăm tình huống và thể hiện cách xử lý thông minh, an toàn' },
    method: 'Đánh giá năng lực tự nhận thức và kĩ năng bảo vệ sức khỏe bản thân',
    scenario: 'Lập kế hoạch chăm sóc bản thân, ăn uống đủ chất và tự tin bước vào tuổi dậy thì.'
  },
  29: {
    week: 29,
    theme: 'Chủ đề 6: Sinh vật và môi trường',
    title: 'Bài 29: Chức năng của môi trường đối với sinh vật',
    knowledge: 'Môi trường tự nhiên và môi trường nhân tạo; 4 chức năng cốt lõi của môi trường đối với con người và sinh vật: nơi sinh sống, cung cấp tài nguyên, chứa đựng rác thải và lưu giữ thông tin.',
    periods: ['Tiết 1: Tìm hiểu các thành phần của môi trường và chức năng nơi ở, cung cấp tài nguyên', 'Tiết 2: Tìm hiểu chức năng tiếp nhận chất thải và bảo vệ sự sống trên Trái Đất'],
    game: { name: 'Môi trường cho ta những gì?', goal: 'Hiểu giá trị của môi trường', materials: 'Bộ tranh tài nguyên thiên nhiên', rules: 'Nêu tên tài nguyên thiên nhiên cung cấp cho ăn uống, mặc, nhà ở và năng lượng' },
    method: 'Khai thác tranh ảnh môi trường, thảo luận về tài nguyên thiên nhiên',
    scenario: 'Giải thích vì sao nếu con người thải quá nhiều rác thì môi trường sẽ bị quá tải và ô nhiễm.'
  },
  30: {
    week: 30,
    theme: 'Chủ đề 6: Sinh vật và môi trường',
    title: 'Bài 30: Tác động của con người và một số biện pháp bảo vệ môi trường',
    knowledge: 'Những tác động tiêu cực của con người (phá rừng, xả thải, săn bắt) và tác động tích cực (trồng rừng, xử lý rác, dùng năng lượng sạch); các biện pháp bảo vệ môi trường và ứng phó biến đổi khí hậu.',
    periods: ['Tiết 1: Phân tích tác động của con người làm biến đổi môi trường tự nhiên', 'Tiết 2: Đề xuất các hành động cụ thể để bảo vệ môi trường sống quanh em'],
    game: { name: 'Trái Đất màu xanh hay màu xám?', goal: 'Phân biệt hành vi hủy hoại và bảo vệ môi trường', materials: 'Tranh Trái Đất 2 nửa Xanh - Xám', rules: 'Dán các thẻ hành động vào đúng nửa Trái Đất tương ứng' },
    method: 'Dạy học dự án môi trường và đóng vai đại sứ xanh',
    scenario: 'Đề xuất giải pháp giảm rác thải nhựa một lần trong các buổi sinh hoạt lớp.'
  },
  31: {
    week: 31,
    theme: 'Chủ đề 6: Sinh vật và môi trường',
    title: 'Bài 31: Ôn tập chủ đề Sinh vật và môi trường',
    knowledge: 'Hệ thống hóa chức năng môi trường, tác động của con người và cam kết hành động vì một môi trường xanh - sạch - đẹp.',
    periods: ['Tiết 1: Hệ thống hóa kiến thức chủ đề Môi trường bằng sơ đồ tư duy', 'Tiết 2: Báo cáo dự án bảo vệ môi trường địa phương'],
    game: { name: 'Cây thông điệp xanh', goal: 'Cam kết hành động vì môi trường', materials: 'Cây cam kết và giấy note hình chiếc lá', rules: 'Mỗi học sinh viết một việc làm cụ thể bảo vệ môi trường và treo lên cây' },
    method: 'Thuyết trình dự án môi trường và cam kết hành động cộng đồng',
    scenario: 'Thuyết trình dự án phân loại rác tái chế tại gia đình và trường học.'
  },
  32: {
    week: 32,
    theme: 'Thực hành & Dự án Khoa học',
    title: 'Bài 32: Thực hành: Tìm hiểu tài nguyên thiên nhiên và môi trường địa phương',
    knowledge: 'Thu thập thông tin, điều tra thực tế về nguồn nước, không khí, đất trồng hoặc rác thải tại địa phương em sinh sống; đề xuất giải pháp cải thiện.',
    periods: ['Tiết 1: Lập phiếu điều tra và tiến hành khảo sát môi trường địa phương', 'Tiết 2: Tổng hợp dữ liệu khảo sát và làm báo cáo tranh ảnh thuyết trình'],
    game: { name: 'Phóng viên môi trường nhí', goal: 'Rèn kĩ năng phỏng vấn và thu thập thông tin', materials: 'Micro, sổ tay ghi chép', rules: 'Phỏng vấn bạn bè và người dân về ý thức giữ gìn vệ sinh môi trường khu dân cư' },
    method: 'Điều tra khảo sát thực tế và báo cáo dự án cộng đồng',
    scenario: 'Ghi nhận hiện trạng rác thải tại khu chợ hoặc con kênh gần nhà và đề xuất giải pháp thu gom.'
  },
  33: {
    week: 33,
    theme: 'Ôn tập cuối năm',
    title: 'Bài 33: Ôn tập tổng kết cuối năm học (Phần 1: Chất, Năng lượng, Thực vật và Động vật)',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức nửa đầu chương trình: Đất, Hỗn hợp, Biến đổi hóa học, Năng lượng điện, Năng lượng tái tạo, Sinh sản của thực vật và động vật.',
    periods: ['Tiết 1: Ôn tập chuyên đề Chất và Năng lượng', 'Tiết 2: Ôn tập chuyên đề Thực vật và Động vật'],
    game: { name: 'Vòng quanh thế giới Khoa học', goal: 'Ôn tập kiến thức tổng hợp', materials: 'Bản đồ trò chơi, xúc xắc', rules: 'Trả lời đúng câu hỏi ở mỗi trạm để tiến về đích' },
    method: 'Ôn tập tích cực qua trạm và sơ đồ hóa liên kết tri thức',
    scenario: 'Giải thích cơ chế hoạt động của bình nước nóng năng lượng mặt trời dựa trên kiến thức đã học.'
  },
  34: {
    week: 34,
    theme: 'Ôn tập cuối năm',
    title: 'Bài 34: Ôn tập tổng kết cuối năm học (Phần 2: Vi khuẩn, Con người và Sức khoẻ, Môi trường)',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức nửa sau chương trình: Thế giới vi khuẩn, Sự sinh sản và sức khỏe con người, Tuổi dậy thì, Phòng tránh xâm hại và Bảo vệ môi trường.',
    periods: ['Tiết 1: Ôn tập chuyên đề Vi khuẩn, Con người và Sức khỏe', 'Tiết 2: Ôn tập chuyên đề Sinh vật, Môi trường và Kĩ năng thực hành'],
    game: { name: 'Nhà thông thái Khoa học Tiểu học', goal: 'Đánh giá năng lực tổng hợp cuối cấp', materials: 'Bảng con, chuông bấm', rules: 'Học sinh giải đáp các bài toán tình huống khoa học đời sống thực tế' },
    method: 'Hệ thống hóa tri thức toàn cấp tiểu học và rèn kĩ năng phản biện',
    scenario: 'Tổng kết những thói quen tốt đã rèn luyện được qua môn Khoa học để chuẩn bị bước vào cấp THCS.'
  },
  35: {
    week: 35,
    theme: 'Đánh giá cuối năm',
    title: 'Bài 35: Đánh giá cuối năm học môn Khoa học Lớp 5',
    knowledge: 'Kiểm tra đánh giá định kì cuối năm học môn Khoa học Lớp 5 theo chuẩn năng lực khoa học CTGDPT 2018 (Kết nối tri thức với cuộc sống).',
    periods: ['Tiết 1: Đánh giá định kì năng lực nhận thức thế giới tự nhiên', 'Tiết 2: Đánh giá định kì năng lực tìm hiểu và vận dụng kiến thức khoa học vào thực tiễn'],
    game: { name: 'Vinh danh Nhà Khoa học tương lai', goal: 'Tổng kết và trao chứng nhận hoàn thành chương trình', materials: 'Bảng vinh danh, kỷ niệm chương', rules: 'Trưng bày các báo cáo dự án xuất sắc của học sinh trong suốt năm học' },
    method: 'Đánh giá chuẩn năng lực đầu ra môn Khoa học cấp Tiểu học',
    scenario: 'Tự tin thuyết trình sản phẩm khoa học tâm đắc nhất trước toàn thể thầy cô và bạn bè.'
  }
};

export function getScience35Weeks(grade: string | number): SubjectCurriculumWeekDetailed[] {
  const isGrade5 = String(grade || '').includes('5');
  const dataMap = isGrade5 ? SCIENCE_GRADE_5_DATA : SCIENCE_GRADE_4_DATA;
  const gradeLabel = isGrade5 ? 'Lớp 5' : 'Lớp 4';

  return Array.from({ length: 35 }, (_, idx) => {
    const week = idx + 1;
    const item = dataMap[week] || dataMap[1];
    const semester: 1 | 2 = week <= 18 ? 1 : 2;

    const periods: CurriculumPeriod[] = item.periods.map((pName, pIdx) => ({
      periodNumber: pIdx + 1,
      periodLabel: `Tiết ${pIdx + 1} (35 phút)`,
      lessonPart: pName,
      scope: `${item.title} - Phần ${pIdx + 1}`,
      keyFocus: `Trọng tâm Tiết ${pIdx + 1}: ${item.knowledge}`,
      pageRange: `SGK Khoa học ${gradeLabel.replace('Lớp ', '')} KNTT, tr.${week * 2 + pIdx}`,
      suggestedActivity: `${item.method}. Tổ chức hoạt động nhóm và thí nghiệm thực hành trực quan.`
    }));

    return {
      week,
      weekLabel: `Tuần ${week}`,
      semester,
      theme: item.theme,
      unitCode: item.theme,
      lessonTitle: item.title,
      allLessonsInWeek: [item.title],
      periodCount: 2,
      sections: ['kh_kham_pha', 'kh_thi_nghiem', 'kh_tinh_huong', 'kh_stem'],
      periods,
      keyKnowledge: item.knowledge,
      textbookPageRange: `SGK Khoa học ${gradeLabel} - Kết nối tri thức với cuộc sống`,
      suggestedGame: item.game,
      suggestedMethod: item.method,
      suggestedScenario: item.scenario
    };
  });
}
