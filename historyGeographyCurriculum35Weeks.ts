// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH LỊCH SỬ VÀ ĐỊA LÍ 35 TUẦN - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// THEO CHUẨN NXB GIÁO DỤC VIỆT NAM (TẬP HUẤN SGK CTGDPT 2018)
// LỚP 4 & LỚP 5 - MỖI TUẦN 2 TIẾT (TỔNG CỘNG 70 TIẾT/NĂM)
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface HistoryGeoWeekItem {
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

export const HISTORY_GEO_GRADE_4_DATA: Record<number, HistoryGeoWeekItem> = {
  1: {
    week: 1,
    theme: 'Chủ đề Mở đầu',
    title: 'Bài 1: Làm quen với phương tiện học tập môn Lịch sử và Địa lí',
    knowledge: 'Nhận biết và biết cách sử dụng bản đồ, lược đồ, trục thời gian, tranh ảnh, hiện vật lịch sử và số liệu thống kê.',
    periods: ['Tiết 1: Khám phá các phương tiện học tập: Bản đồ, lược đồ, biểu đồ', 'Tiết 2: Thực hành sử dụng trục thời gian và tranh ảnh hiện vật lịch sử'],
    game: { name: 'Nhà thám hiểm bản đồ', goal: 'Đọc đúng ký hiệu bản đồ và bảng chú giải', materials: 'Bản đồ hành chính Việt Nam', rules: 'Tìm nhanh thủ đô, các dòng sông lớn và ranh giới vùng miền' },
    method: 'Phương pháp trực quan khai thác bản đồ và tài liệu lịch sử',
    scenario: 'Học sinh tập xác định vị trí tỉnh/thành phố quê hương trên bản đồ Việt Nam.'
  },
  2: {
    week: 2,
    theme: 'Chủ đề 1: Địa phương em',
    title: 'Bài 2: Thiên nhiên và con người địa phương em',
    knowledge: 'Vị trí địa lí, địa hình, khí hậu, sông ngòi, đất đai; đặc điểm dân cư và các hoạt động sản xuất tiêu biểu của địa phương.',
    periods: ['Tiết 1: Tìm hiểu vị trí địa lí và điều kiện tự nhiên địa phương em', 'Tiết 2: Tìm hiểu dân cư và các ngành nghề sản xuất tại địa phương'],
    game: { name: 'Tôi yêu quê hương tôi', goal: 'Giới thiệu nét đẹp thiên nhiên và kinh tế địa phương', materials: 'Tranh ảnh sản vật quê hương', rules: 'Thuyết trình nhanh 1 sản vật nổi tiếng hoặc cảnh đẹp quê hương trong 2 phút' },
    method: 'Dạy học dự án tìm hiểu địa phương và liên hệ thực tế',
    scenario: 'Đóng vai hướng dẫn viên du lịch nhí giới thiệu nét độc đáo của quê hương em.'
  },
  3: {
    week: 3,
    theme: 'Chủ đề 1: Địa phương em',
    title: 'Bài 3: Lịch sử và văn hoá truyền thống địa phương em',
    knowledge: 'Các di tích lịch sử - văn hoá tiêu biểu; lễ hội truyền thống, danh nhân lịch sử và phong tục tập quán tốt đẹp của địa phương.',
    periods: ['Tiết 1: Tìm hiểu các di tích lịch sử và danh nhân địa phương', 'Tiết 2: Khám phá lễ hội truyền thống và phong tục tập quán quê hương'],
    game: { name: 'Đi tìm dấu ấn lịch sử quê hương', goal: 'Khắc sâu công lao của các vị tiền nhân địa phương', materials: 'Phiếu học tập, tranh di tích', rules: 'Ghép tên di tích lịch sử với sự kiện hoặc danh nhân tương ứng' },
    method: 'Kể chuyện lịch sử và thuyết trình di sản văn hóa',
    scenario: 'Kể lại một câu chuyện về vị anh hùng hoặc lễ hội dân gian tại quê hương.'
  },
  4: {
    week: 4,
    theme: 'Chủ đề 2: Trung du và miền núi Bắc Bộ',
    title: 'Bài 4: Thiên nhiên vùng Trung du và miền núi Bắc Bộ',
    knowledge: 'Vị trí địa lí, địa hình đồi núi hiểm trở (dãy Hoàng Liên Sơn, đỉnh Phan-xi-păng); khí hậu nhiệt đới gió mùa có mùa đông lạnh, tuyết rơi ở vùng núi cao; mạng lưới sông ngòi dốc giàu tiềm năng thủy điện.',
    periods: ['Tiết 1: Xác định vị trí và đặc điểm địa hình, khí hậu vùng Trung du miền núi Bắc Bộ', 'Tiết 2: Tìm hiểu sông ngòi, khoáng sản và cảnh quan thiên nhiên đặc sắc'],
    game: { name: 'Chinh phục đỉnh Phan-xi-păng', goal: 'Nắm vững địa hình và khí hậu vùng núi phía Bắc', materials: 'Lược đồ tự nhiên vùng Bắc Bộ', rules: 'Trả lời đúng các câu hỏi địa lí để leo từng nấc thang lên đỉnh núi' },
    method: 'Khai thác lược đồ địa hình và tranh ảnh cảnh quan',
    scenario: 'Mô tả vẻ đẹp của ruộng bậc thang Mù Cang Chải và đỉnh Hoàng Liên Sơn phủ tuyết trắng.'
  },
  5: {
    week: 5,
    theme: 'Chủ đề 2: Trung du và miền núi Bắc Bộ',
    title: 'Bài 5: Dân cư và hoạt động sản xuất ở vùng Trung du và miền núi Bắc Bộ',
    knowledge: 'Các dân tộc anh em sinh sống (Tày, Nùng, Mông, Dao, Thái...); hoạt động sản xuất: làm ruộng bậc thang, trồng chè, cây ăn quả, chăn nuôi gia súc, khai thác khoáng sản và phát triển thủy điện.',
    periods: ['Tiết 1: Tìm hiểu đặc điểm dân cư và các dân tộc vùng Trung du và miền núi Bắc Bộ', 'Tiết 2: Khám phá hoạt động sản xuất: Trồng trọt, khai khoáng và thủy điện'],
    game: { name: 'Hương chè Tân Cương', goal: 'Nhận biết các sản phẩm kinh tế thế mạnh của vùng', materials: 'Thẻ sản phẩm kinh tế', rules: 'Chọn đúng sản phẩm đặc trưng của vùng núi phía Bắc (chè, mận, quặng apatit, thủy điện)' },
    method: 'Thảo luận nhóm về mô hình kinh tế vùng đồi bát úp',
    scenario: 'Giải thích vì sao đồng bào vùng cao thường làm ruộng bậc thang trên các sườn đồi.'
  },
  6: {
    week: 6,
    theme: 'Chủ đề 2: Trung du và miền núi Bắc Bộ',
    title: 'Bài 6: Một số nét văn hoá ở vùng Trung du và miền núi Bắc Bộ',
    knowledge: 'Nhà sàn truyền thống, trang phục thổ cẩm rực rỡ; các lễ hội đặc sắc: Lễ hội Lồng Tồng (xuống đồng), chợ phiên vùng cao, múa xòe Thái, hát then đàn tính.',
    periods: ['Tiết 1: Tìm hiểu kiến trúc nhà sàn, trang phục và ẩm thực truyền thống', 'Tiết 2: Khám phá nét độc đáo của chợ phiên và các lễ hội dân gian'],
    game: { name: 'Sắc màu thổ cẩm vùng cao', goal: 'Cảm nhận nét đẹp văn hóa đa dạng', materials: 'Hình ảnh trang phục các dân tộc', rules: 'Nhận diện đúng trang phục của dân tộc Mông, Dao, Tày, Thái' },
    method: 'Trải nghiệm văn hóa đa phương tiện và tôn trọng bản sắc dân tộc',
    scenario: 'Đóng vai du khách trải nghiệm không khí náo nhiệt tại một phiên chợ vùng cao Sa Pa.'
  },
  7: {
    week: 7,
    theme: 'Chủ đề 2: Trung du và miền núi Bắc Bộ',
    title: 'Bài 7: Đền Hùng và lễ giỗ Tổ Hùng Vương',
    knowledge: 'Vị trí Khu di tích lịch sử Đền Hùng (Phú Thọ); truyền thuyết Lạc Long Quân - Âu Cơ; ý nghĩa thiêng liêng của ngày Giỗ Tổ Hùng Vương (10 tháng 3 âm lịch) - đạo lí Uống nước nhớ nguồn.',
    periods: ['Tiết 1: Tìm hiểu về Khu di tích lịch sử Đền Hùng và nguồn gốc tổ tiên', 'Tiết 2: Ý nghĩa lễ hội Giỗ Tổ Hùng Vương và lời dặn của Bác Hồ'],
    game: { name: 'Hướng về cội nguồn dân tộc', goal: 'Khắc sâu truyền thống yêu nước', materials: 'Tranh ảnh Đền Thượng, Đền Trung, Đền Hạ', rules: 'Đọc vang câu ca dao "Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba"' },
    method: 'Giáo dục truyền thống yêu nước, kể chuyện lịch sử hào hùng',
    scenario: 'Học sinh đọc thuộc và phân tích lời dặn của Bác Hồ: "Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước".'
  },
  8: {
    week: 8,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 8: Thiên nhiên vùng Đồng bằng Bắc Bộ',
    knowledge: 'Vị trí, hình dạng tam giác châu thổ do phù sa sông Hồng và sông Thái Bình bồi đắp; địa hình bằng phẳng; hệ thống đê điều kiên cố chống lũ lụt độc đáo.',
    periods: ['Tiết 1: Xác định vị trí, địa hình và mạng lưới sông ngòi đồng bằng Bắc Bộ', 'Tiết 2: Tìm hiểu hệ thống đê sông Hồng - công trình vĩ đại của cha ông'],
    game: { name: 'Người đắp đê ngăn lũ', goal: 'Hiểu vai trò của đê sông Hồng', materials: 'Tranh cắt lớp mặt cắt con đê', rules: 'Mô tả cấu tạo và vai trò bảo vệ làng xóm mùa nước lũ của hệ thống đê' },
    method: 'Khai thác tranh ảnh lịch sử địa lí và thảo luận nhóm',
    scenario: 'Quan sát dòng sông Hồng đỏ nặng phù sa bồi đắp cho những cánh đồng xanh tươi.'
  },
  9: {
    week: 9,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 9: Dân cư và hoạt động sản xuất ở vùng Đồng bằng Bắc Bộ',
    knowledge: 'Vùng có mật độ dân số đông đúc nhất cả nước; vựa lúa lớn thứ hai của Việt Nam; phát triển nghề thủ công truyền thống (gốm Bát Tràng, lụa Vạn Phúc...) và công nghiệp hiện đại.',
    periods: ['Tiết 1: Đặc điểm dân cư và nghề trồng lúa nước vùng châu thổ Bắc Bộ', 'Tiết 2: Khám phá các làng nghề truyền thống và hoạt động công nghiệp'],
    game: { name: 'Nghệ nhân làng nghề', goal: 'Nhận biết các làng nghề truyền thống tiêu biểu', materials: 'Thẻ tên làng nghề và sản phẩm', rules: 'Ghép Bát Tràng với gốm sứ, Vạn Phúc với lụa tơ tằm, Đồng Kị với đồ gỗ' },
    method: 'Dạy học trải nghiệm văn hóa nghề thủ công truyền thống',
    scenario: 'Tìm hiểu quy trình người nghệ nhân nhào đất sét và tạo hình chiếc bình gốm Bát Tràng.'
  },
  10: {
    week: 10,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 10: Một số nét văn hoá ở vùng Đồng bằng Bắc Bộ',
    knowledge: 'Làng quê Bắc Bộ với cây đa, giếng nước, sân đình; dân ca Quan họ Bắc Ninh (Di sản văn hóa phi vật thể đại diện của nhân loại), múa rối nước và các lễ hội truyền thống.',
    periods: ['Tiết 1: Tìm hiểu không gian làng quê Bắc Bộ và nghệ thuật múa rối nước', 'Tiết 2: Thưởng thức và tìm hiểu nét đặc sắc của Dân ca Quan họ Bắc Ninh'],
    game: { name: 'Liền anh liền chị Quan họ', goal: 'Cảm nhận nét đẹp dân ca Quan họ', materials: 'Video làn điệu Quan họ, nón quai thao mô hình', rules: 'Nghe giai điệu và đoán tên bài dân ca Quan họ Bắc Ninh quen thuộc' },
    method: 'Tích hợp âm nhạc dân tộc và thưởng thức nghệ thuật di sản',
    scenario: 'Đóng vai nghệ sĩ múa rối nước điều khiển chú Tễu trên mặt nước ao đình.'
  },
  11: {
    week: 11,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 11: Sông Hồng và văn minh sông Hồng',
    knowledge: 'Sông Hồng - cái nôi của nền văn minh lúa nước; thời kì dựng nước Văn Lang - Âu Cổ; hiện vật tiêu biểu: Trống đồng Đông Sơn, mũi tên đồng Cổ Loa.',
    periods: ['Tiết 1: Vai trò của sông Hồng trong sự hình thành nền văn minh lúa nước', 'Tiết 2: Khám phá vẻ đẹp Trống đồng Đông Sơn và huyền thoại thành Cổ Loa'],
    game: { name: 'Giải mã hoa văn Trống đồng Đông Sơn', goal: 'Tìm hiểu hoa văn người giã gạo, thuyền chiến, chim Lạc', materials: 'Hình vẽ phóng to mặt Trống đồng Đông Sơn', rules: 'Tìm và nêu ý nghĩa các họa tiết cuộc sống cổ xưa khắc trên mặt trống đồng' },
    method: 'Phân tích hiện vật bảo tàng lịch sử và giáo dục lòng tự hào dân tộc',
    scenario: 'Kể lại truyền thuyết An Dương Vương xây thành Cổ Loa và chiếc nỏ thần.'
  },
  12: {
    week: 12,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 12: Thăng Long – Hà Nội',
    knowledge: 'Chiếu dời đô của vua Lý Thái Tổ (năm 1010); lịch sử hơn 1000 năm văn hiến của Thăng Long - Hà Nội; các di tích tiêu biểu: Hoàng thành Thăng Long, Hồ Hoàn Kiếm, phố cổ Hà Nội.',
    periods: ['Tiết 1: Sự kiện vua Lý Thái Tổ dời đô về Thăng Long và ý nghĩa lịch sử', 'Tiết 2: Tìm hiểu các danh lam thắng cảnh và di tích lịch sử Thủ đô Hà Nội'],
    game: { name: 'Dạo quanh 36 phố phường', goal: 'Khám phá tên phố nghề truyền thống Hà Nội', materials: 'Bản đồ phố cổ Hà Nội', rules: 'Kể tên các phố bắt đầu bằng chữ "Hàng" (Hàng Bạc, Hàng Đào, Hàng Gai...)' },
    method: 'Khai thác văn bản Chiếu dời đô và hình ảnh Thủ đô nghìn năm văn hiến',
    scenario: 'Kể lại truyền thuyết vua Lê Lợi trả gươm báu cho Rùa Vàng tại Hồ Hoàn Kiếm.'
  },
  13: {
    week: 13,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 13: Văn Miếu – Quốc Tử Giám',
    knowledge: 'Trường đại học đầu tiên của Việt Nam; Khuê Văn Các; 82 bia Tiến sĩ vinh danh những người đỗ đạt cao thời phong kiến - truyền thống hiếu học của dân tộc.',
    periods: ['Tiết 1: Lịch sử xây dựng Văn Miếu và trường Quốc Tử Giám', 'Tiết 2: Khám phá ý nghĩa 82 Bia Tiến sĩ và truyền thống tôn sư trọng đạo'],
    game: { name: 'Bảng vàng ghi danh', goal: 'Hiểu truyền thống hiếu học Việt Nam', materials: 'Tranh ảnh Khuê Văn Các và rùa đội bia đá', rules: 'Đọc câu trích bất hủ của Thân Nhân Trung: "Hiền tài là nguyên khí của quốc gia"' },
    method: 'Giáo dục truyền thống tôn sư trọng đạo và hiếu học ngàn đời',
    scenario: 'Học sinh chia sẻ cảm nghĩ khi ngắm nhìn hình ảnh Khuê Văn Các - biểu tượng của Thủ đô.'
  },
  14: {
    week: 14,
    theme: 'Chủ đề 3: Đồng bằng Bắc Bộ',
    title: 'Bài 14: Ôn tập chủ đề Đồng bằng Bắc Bộ',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức về thiên nhiên, dân cư, sản xuất, văn minh sông Hồng, Thăng Long - Hà Nội và Văn Miếu - Quốc Tử Giám.',
    periods: ['Tiết 1: Tổng kết kiến thức Đồng bằng Bắc Bộ qua sơ đồ tư duy', 'Tiết 2: Báo cáo dự án "Hà Nội trong mắt em" và giải bài tập vận dụng'],
    game: { name: 'Rung chuông vàng Lịch sử & Địa lí', goal: 'Đánh giá chủ đề Đồng bằng Bắc Bộ', materials: 'Bảng con, bộ câu hỏi trắc nghiệm', rules: 'Học sinh ghi đáp án chính xác trên bảng con' },
    method: 'Học tập hợp tác nhóm và sơ đồ hóa tri thức lịch sử - địa lí',
    scenario: 'Thuyết trình nhóm về một nét văn hóa đặc sắc của người dân châu thổ sông Hồng.'
  },
  15: {
    week: 15,
    theme: 'Chủ đề 4: Duyên hải miền Trung',
    title: 'Bài 15: Thiên nhiên vùng Duyên hải miền Trung',
    knowledge: 'Địa hình hẹp ngang, dải đồng bằng nhỏ hẹp ven biển; dãy Trường Sơn bao bọc phía tây; khí hậu khắc nghiệt: mùa hạ khô nóng có gió Lào, mùa thu đông mưa bão lũ lụt.',
    periods: ['Tiết 1: Xác định vị trí địa lí, địa hình và bờ biển khúc khuỷu miền Trung', 'Tiết 2: Tìm hiểu khí hậu đặc thù, thiên tai bão lũ và cảnh quan biển đảo'],
    game: { name: 'Dọc dải miền Trung', goal: 'Nắm vững đặc điểm địa hình và bờ biển miền Trung', materials: 'Lược đồ vùng Duyên hải miền Trung', rules: 'Chỉ và đọc tên các bãi biển đẹp từ Sầm Sơn, Cửa Lò, Lăng Cô đến Nha Trang' },
    method: 'Khai thác bản đồ địa hình và tư liệu thời tiết khí hậu',
    scenario: 'Đồng cảm và chia sẻ với sự kiên cường của người dân miền Trung trước mùa bão lũ.'
  },
  16: {
    week: 16,
    theme: 'Chủ đề 4: Duyên hải miền Trung',
    title: 'Bài 16: Dân cư và hoạt động sản xuất ở vùng Duyên hải miền Trung',
    knowledge: 'Hoạt động kinh tế biển phong phú: đánh bắt và nuôi trồng thủy hải sản, làm muối (Cà Ná, Sa Huỳnh), du lịch biển đảo, cảng biển nước sâu và công nghiệp lọc hóa dầu.',
    periods: ['Tiết 1: Đặc điểm dân cư và nghề đánh bắt, chế biến thủy hải sản, làm muối', 'Tiết 2: Khám phá ngành du lịch biển và phát triển các khu kinh tế ven biển'],
    game: { name: 'Chuyến tàu vươn khơi', goal: 'Nhận biết các ngành kinh tế biển tiêu biểu', materials: 'Thẻ ngành nghề kinh tế biển', rules: 'Phân loại các hoạt động vào nhóm Khai thác hải sản, Làm muối hay Du lịch biển' },
    method: 'Thảo luận nhóm về tiềm năng kinh tế biển của đất nước',
    scenario: 'Tìm hiểu quy trình phơi cát làm muối của diêm dân miền Trung dưới ánh nắng hè gay gắt.'
  },
  17: {
    week: 17,
    theme: 'Chủ đề 4: Duyên hải miền Trung',
    title: 'Bài 17: Một số nét văn hoá ở vùng Duyên hải miền Trung',
    knowledge: 'Lễ hội Cầu ngư của ngư dân vùng biển; các di sản văn hóa Chăm-pa (tháp Chăm, lễ hội Ka-tê); ẩm thực cay nồng đậm đà hương vị miền Trung.',
    periods: ['Tiết 1: Tìm hiểu phong tục thờ cúng Cá Ông và Lễ hội Cầu ngư', 'Tiết 2: Khám phá di sản kiến trúc Tháp Chăm và Lễ hội Ka-tê độc đáo'],
    game: { name: 'Khúc ca chèo bả trạo', goal: 'Cảm nhận nét đẹp văn hóa miền biển', materials: 'Video Lễ hội Cầu ngư', rules: 'Mô phỏng động tác chèo thuyền nhịp nhàng của ngư dân trong lễ hội cầu ngư' },
    method: 'Khám phá nét đẹp văn hóa phi vật thể của cộng đồng cư dân ven biển',
    scenario: 'Tìm hiểu ý nghĩa của việc ngư dân tôn kính gọi cá voi là "Cá Ông" cứu người trên biển.'
  },
  18: {
    week: 18,
    theme: 'Đánh giá Học kì I',
    title: 'Bài 18: Ôn tập và Đánh giá Học kì I môn Lịch sử và Địa lí Lớp 4',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức địa phương, Bắc Bộ và Duyên hải miền Trung; đánh giá định kì năng lực học tập học kì I.',
    periods: ['Tiết 1: Ôn tập tổng kết kiến thức trọng tâm học kì I', 'Tiết 2: Đánh giá định kì cuối học kì I môn Lịch sử và Địa lí Lớp 4'],
    game: { name: 'Hành trình di sản Việt Nam', goal: 'Đánh giá năng lực tổng hợp kì I', materials: 'Bảng con, bộ câu hỏi trắc nghiệm', rules: 'Vượt qua các câu hỏi để hoàn thành tấm bản đồ di sản miền Bắc và miền Trung' },
    method: 'Đánh giá định kì chuẩn CTGDPT 2018',
    scenario: 'Tự tin trình bày kiến thức lịch sử - địa lí đã học trước thầy cô và bạn bè.'
  },
  19: {
    week: 19,
    theme: 'Chủ đề 4: Duyên hải miền Trung',
    title: 'Bài 19: Cố đô Huế',
    knowledge: 'Vị trí Cố đô Huế bên dòng sông Hương thơ mộng; Quần thể di tích Cố đô Huế (Đại Nội, Ngọ Môn, lăng tẩm các vua triều Nguyễn); Nhã nhạc cung đình Huế (Di sản văn hóa thế giới).',
    periods: ['Tiết 1: Tìm hiểu Quần thể kiến trúc Cố đô Huế và sông Hương núi Ngự', 'Tiết 2: Khám phá nét độc đáo của Nhã nhạc cung đình Huế và trang phục cung đình'],
    game: { name: 'Thử tài thuyết minh di sản Huế', goal: 'Nắm vững các công trình kiến trúc cung đình Huế', materials: 'Tranh ảnh Ngọ Môn, Điện Thái Hòa, Chùa Thiên Mụ', rules: 'Chỉ và thuyết minh nhanh về cổng Ngọ Môn và Cột cờ Đại Nội Huế' },
    method: 'Khai thác hình ảnh di sản thế giới UNESCO và âm nhạc truyền thống',
    scenario: 'Cảm nhận vẻ đẹp cổ kính, trầm mặc của kinh thành Huế khi nghe một bản Nhã nhạc.'
  },
  20: {
    week: 20,
    theme: 'Chủ đề 4: Duyên hải miền Trung',
    title: 'Bài 20: Phố cổ Hội An',
    knowledge: 'Vị trí Phố cổ Hội An (Quảng Nam) bên bờ sông Hoài; lịch sử thương cảng quốc tế sầm uất thế kỉ XVII - XVIII; kiến trúc nhà cổ mái ngói rêu phong, Chùa Cầu và lễ hội đèn lồng lung linh.',
    periods: ['Tiết 1: Lịch sử thương cảng cổ Hội An và kiến trúc nhà cổ, Chùa Cầu', 'Tiết 2: Trải nghiệm không gian văn hóa đêm phố cổ và ẩm thực Hội An'],
    game: { name: 'Đêm rằm phố cổ', goal: 'Khám phá nét đẹp văn hóa Hội An', materials: 'Đèn lồng giấy ngũ sắc', rules: 'Ghép tranh các công trình tiêu biểu: Chùa Cầu, Nhà cổ Tấn Ký, Hội quán Phúc Kiến' },
    method: 'Dạy học di sản sống và tìm hiểu giao lưu văn hóa quốc tế',
    scenario: 'Thả đèn hoa đăng trên dòng sông Hoài và thưởng thức món cao lầu Hội An.'
  },
  21: {
    week: 21,
    theme: 'Chủ đề 5: Tây Nguyên',
    title: 'Bài 21: Thiên nhiên vùng Tây Nguyên',
    knowledge: 'Vị trí địa lí không giáp biển; các cao nguyên xếp tầng đất đỏ ba dan màu mỡ (Kon Tum, Pleiku, Đắk Lắk, Lâm Viên, Di Linh); khí hậu 2 mùa mưa - khô rõ rệt; rừng nhiệt đới giàu tài nguyên.',
    periods: ['Tiết 1: Xác định vị trí và đặc điểm các cao nguyên xếp tầng Tây Nguyên', 'Tiết 2: Tìm hiểu khí hậu 2 mùa, sông ngòi nhiều thác ghềnh và rừng rậm Tây Nguyên'],
    game: { name: 'Khám phá miền đất đỏ ba dan', goal: 'Nhận biết các cao nguyên Tây Nguyên', materials: 'Lược đồ địa hình vùng Tây Nguyên', rules: 'Đọc tên các cao nguyên từ Bắc xuống Nam trên lược đồ địa hình' },
    method: 'Khai thác lược đồ cao nguyên xếp tầng và video thác nước hùng vĩ',
    scenario: 'Ngắm nhìn vẻ đẹp hùng vĩ của thác Y-aly và cánh rừng nguyên sinh bạt ngàn.'
  },
  22: {
    week: 22,
    theme: 'Chủ đề 5: Tây Nguyên',
    title: 'Bài 22: Dân cư và hoạt động sản xuất ở vùng Tây Nguyên',
    knowledge: 'Các dân tộc bản địa (Gia-rai, Ba-na, Ê-đê, Mơ-nông...); thủ phủ cây công nghiệp lâu năm của nước ta: cà phê, cao su, hồ tiêu, chè; chăn nuôi bò sữa, phát triển thủy điện lớn (Y-aly, Buôn Kuốp).',
    periods: ['Tiết 1: Đặc điểm dân cư và các dân tộc anh em vùng Tây Nguyên', 'Tiết 2: Khám phá hoạt động trồng cây công nghiệp và xây dựng nhà máy thủy điện'],
    game: { name: 'Vựa cà phê Buôn Ma Thuột', goal: 'Nhận diện sản phẩm nông sản thế mạnh', materials: 'Thẻ cây công nghiệp', rules: 'Phân loại cà phê, cao su, chè, tiêu vào đúng vùng sinh thái phù hợp' },
    method: 'Thảo luận nhóm về giá trị xuất khẩu nông sản của Tây Nguyên',
    scenario: 'Giải thích vì sao đất đỏ ba dan Tây Nguyên lại rất thích hợp để trồng cây cà phê và cao su.'
  },
  23: {
    week: 23,
    theme: 'Chủ đề 5: Tây Nguyên',
    title: 'Bài 23: Một số nét văn hoá và truyền thống yêu nước, cách mạng của đồng bào Tây Nguyên',
    knowledge: 'Nhà rông, nhà dài truyền thống; lễ hội đâm trâu, lễ ăn cơm mới; tinh thần quật cường chống giặc ngoại xâm của các anh hùng: N’Trang Lơng, Đinh Núp (Anh hùng Núp).',
    periods: ['Tiết 1: Tìm hiểu kiến trúc nhà rông, nhà dài và phong tục tập quán', 'Tiết 2: Tấm gương yêu nước của các anh hùng cách mạng Tây Nguyên'],
    game: { name: 'Ngọn đuốc anh hùng Núp', goal: 'Khắc sâu tấm gương yêu nước của đồng bào Tây Nguyên', materials: 'Tranh ảnh anh hùng Đinh Núp, làng Kông Hoa', rules: 'Kể lại một chiến công đánh Pháp oanh liệt của anh hùng Núp và dân làng' },
    method: 'Kể chuyện lịch sử cách mạng kết hợp giáo dục lòng biết ơn anh hùng dân tộc',
    scenario: 'Mô tả hình ảnh ngôi nhà rông cao vút như lưỡi búa vươn thẳng lên nền trời xanh.'
  },
  24: {
    week: 24,
    theme: 'Chủ đề 5: Tây Nguyên',
    title: 'Bài 24: Lễ hội Cồng chiêng Tây Nguyên',
    knowledge: 'Không gian văn hóa Cồng chiêng Tây Nguyên (Kiệt tác truyền khẩu và Di sản văn hóa phi vật thể của nhân loại); dàn cồng chiêng, nghệ thuật diễn tấu trong các lễ hội buôn làng.',
    periods: ['Tiết 1: Tìm hiểu giá trị độc đáo của Không gian văn hóa Cồng chiêng Tây Nguyên', 'Tiết 2: Trải nghiệm diễn tấu cồng chiêng và điệu múa xoang bên bếp lửa'],
    game: { name: 'Âm vang cồng chiêng đại ngàn', goal: 'Cảm nhận âm thanh cồng chiêng', materials: 'File âm thanh cồng chiêng, cồng chiêng mô hình', rules: 'Lắng nghe nhịp chiêng và thực hiện động tác múa xoang vòng tròn đoàn kết' },
    method: 'Cảm thụ âm nhạc di sản thế giới và trải nghiệm vũ điệu buôn làng',
    scenario: 'Tưởng tượng hòa mình vào đêm hội bên đống lửa rực sáng, lắng nghe tiếng cồng chiêng vang vọng khắp núi rừng.'
  },
  25: {
    week: 25,
    theme: 'Chủ đề 6: Nam Bộ',
    title: 'Bài 25: Thiên nhiên vùng Nam Bộ',
    knowledge: 'Vùng Đông Nam Bộ đồi thoai thoải và vùng Đồng bằng sông Cửu Long màu mỡ; mạng lưới sông ngòi, kênh rạch chằng chịt (sông Tiền, sông Hậu); khí hậu cận xích đạo nóng ẩm quanh năm.',
    periods: ['Tiết 1: Xác định vị trí, địa hình Đông Nam Bộ và Đồng bằng sông Cửu Long', 'Tiết 2: Tìm hiểu sông ngòi, kênh rạch chằng chịt và rừng ngập mặn Cần Giờ, U Minh'],
    game: { name: 'Mênh mông sông nước Cửu Long', goal: 'Nắm vững địa hình và sông ngòi Nam Bộ', materials: 'Lược đồ tự nhiên vùng Nam Bộ', rules: 'Xác định 9 cửa sông Cửu Long đổ ra biển Đông trên lược đồ' },
    method: 'Khai thác lược đồ sông ngòi và tranh ảnh miền tây sông nước',
    scenario: 'Khám phá hệ sinh thái độc đáo của rừng ngập mặn với cây đước, cây vẹt cắm sâu rễ vào bùn đất.'
  },
  26: {
    week: 26,
    theme: 'Chủ đề 6: Nam Bộ',
    title: 'Bài 26: Dân cư và hoạt động sản xuất ở vùng Nam Bộ',
    knowledge: 'Vựa lúa, vựa trái cây và vựa thủy hải sản lớn nhất cả nước; chợ nổi trên sông đặc sắc; vùng kinh tế phát triển năng động nhất Việt Nam.',
    periods: ['Tiết 1: Hoạt động nông nghiệp trù phú: Trồng lúa, vườn cây ăn trái và nuôi trồng thủy sản', 'Tiết 2: Tìm hiểu nét độc đáo của Chợ nổi trên sông và trung tâm kinh tế năng động'],
    game: { name: 'Ghé thăm chợ nổi Cái Răng', goal: 'Hiểu nét sinh hoạt chợ nổi miền sông nước', materials: 'Tranh ảnh cây bẹo treo hàng hóa trên thuyền', rules: 'Nhìn cây bẹo đoán xem thuyền buôn bán loại trái cây nào (xoài, dưa hấu, sầu riêng)' },
    method: 'Dạy học trực quan sinh động về văn hóa chợ nổi phương Nam',
    scenario: 'Ngắm nhìn những ghe thuyền chở đầy hoa trái tấp nập trên dòng sông vào buổi sớm mai.'
  },
  27: {
    week: 27,
    theme: 'Chủ đề 6: Nam Bộ',
    title: 'Bài 27: Một số nét văn hoá và truyền thống yêu nước, cách mạng của đồng bào Nam Bộ',
    knowledge: 'Đờn ca tài tử Nam Bộ (Di sản văn hóa phi vật thể của nhân loại); nhà bè trên sông, trang phục áo bà ba, khăn rằn; tinh thần dũng cảm quật cường của anh hùng Trương Định, Nguyễn Trung Trực.',
    periods: ['Tiết 1: Khám phá nghệ thuật Đờn ca tài tử và phong tục sinh hoạt miền sông nước', 'Tiết 2: Tấm gương yêu nước của Bình Tây Đại nguyên soái Trương Định và nghĩa quân'],
    game: { name: 'Ngón đàn tài tử phương Nam', goal: 'Tìm hiểu các nhạc cụ Đờn ca tài tử', materials: 'Tranh đàn kìm, đàn tranh, đàn bầu, đàn cò', rules: 'Nhận diện đúng 4 nhạc cụ trụ cột trong dàn nhạc Đờn ca tài tử Nam Bộ' },
    method: 'Thưởng thức di sản văn hóa phi vật thể và giáo dục truyền thống cách mạng',
    scenario: 'Đọc câu nói khí phách của anh hùng Nguyễn Trung Trực: "Bao giờ người Tây nhổ hết cỏ nước Nam thì mới hết người Nam đánh Tây".'
  },
  28: {
    week: 28,
    theme: 'Chủ đề 6: Nam Bộ',
    title: 'Bài 28: Thành phố Hồ Chí Minh',
    knowledge: 'Thành phố mang tên Bác - đô thị lớn nhất, trung tâm kinh tế, văn hoá, giáo dục hàng đầu cả nước; Bến Nhà Rồng nơi Bác Hồ ra đi tìm đường cứu nước năm 1911; Dinh Độc Lập.',
    periods: ['Tiết 1: Vị trí, vai trò đầu tàu kinh tế của Thành phố Hồ Chí Minh', 'Tiết 2: Khám phá Bến Nhà Rồng và Dinh Độc Lập - những chứng tích lịch sử vẻ vang'],
    game: { name: 'Hành trình theo chân Bác', goal: 'Khắc sâu sự kiện Bác Hồ ra đi tìm đường cứu nước', materials: 'Tranh Bến Nhà Rồng năm 1911, tàu Đô đốc Latouche-Tréville', rules: 'Nêu đúng ngày 5/6/1911 người thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước' },
    method: 'Khai thác tư liệu lịch sử Bác Hồ và hình ảnh đô thị văn minh hiện đại',
    scenario: 'Tự hào giới thiệu về Thành phố Hồ Chí Minh rực rỡ cờ hoa và tràn đầy sức sống.'
  },
  29: {
    week: 29,
    theme: 'Chủ đề 6: Nam Bộ',
    title: 'Bài 29: Địa đạo Củ Chi',
    knowledge: 'Hệ thống công trình địa đạo ngầm độc nhất vô nhị dài hơn 200km trong lòng đất; biểu tượng sáng ngời của lòng yêu nước, ý chí kiên cường và nghệ thuật chiến tranh nhân dân.',
    periods: ['Tiết 1: Tìm hiểu cấu tạo hệ thống đường hầm ngầm nhiều tầng của Địa đạo Củ Chi', 'Tiết 2: Cuộc sống, chiến đấu kiên cường của quân và dân "Đất thép thành đồng" Củ Chi'],
    game: { name: 'Đất thép kiên cường', goal: 'Khám phá cấu trúc địa đạo trong lòng đất', materials: 'Sơ đồ mặt cắt 3 tầng ngầm của Địa đạo Củ Chi', rules: 'Chỉ các phòng chức năng: Bếp Hoàng Cầm, giếng nước, phòng phẫu thuật, kho đạn' },
    method: 'Khai thác sơ đồ mặt cắt địa đạo và giáo dục chủ nghĩa anh hùng cách mạng',
    scenario: 'Tìm hiểu nguyên lý giấu khói của Bếp Hoàng Cầm giúp chiến sĩ nấu ăn mà không bị máy bay địch phát hiện.'
  },
  30: {
    week: 30,
    theme: 'Tổng kết các vùng miền',
    title: 'Bài 30: Ôn tập các vùng miền đất nước',
    knowledge: 'Hệ thống hóa đặc điểm tự nhiên, kinh tế, con người và lịch sử các vùng miền: Trung du miền núi Bắc Bộ, Đồng bằng Bắc Bộ, Duyên hải miền Trung, Tây Nguyên và Nam Bộ.',
    periods: ['Tiết 1: So sánh đặc điểm tự nhiên và kinh tế các vùng miền trên cả nước', 'Tiết 2: Tổng kết các di sản văn hóa và di tích lịch sử tiêu biểu của từng vùng'],
    game: { name: 'Bản đồ kết nối 5 miền đất nước', goal: 'Tổng kết kiến thức Lịch sử & Địa lí các vùng miền', materials: 'Bản đồ Việt Nam khổ lớn', rules: 'Gắn đúng các đặc trưng kinh tế và di sản văn hóa vào từng vùng lãnh thổ' },
    method: 'Hệ thống hóa bằng bảng so sánh tổng hợp và bản đồ tư duy',
    scenario: 'Thuyết trình trước lớp sự đa dạng, giàu đẹp và thống nhất của non sông gấm vóc Việt Nam.'
  },
  31: {
    week: 31,
    theme: 'Thực hành & Kĩ năng',
    title: 'Bài 31: Thực hành: Rèn luyện kĩ năng sử dụng bản đồ và tư liệu lịch sử',
    knowledge: 'Củng cố kĩ năng xác định tọa độ, đọc bản đồ, tra cứu niên biểu lịch sử và giải thích các mối liên hệ địa lí - lịch sử.',
    periods: ['Tiết 1: Thực hành đọc và phân tích số liệu trên biểu đồ, bản đồ địa lí', 'Tiết 2: Thực hành sắp xếp các sự kiện lịch sử trên trục thời gian'],
    game: { name: 'Truy tìm kho báu địa lí', goal: 'Rèn kĩ năng đọc bản đồ thành thạo', materials: 'Bản đồ câm và thẻ tọa độ', rules: 'Dựa vào gợi ý tọa độ và ký hiệu tìm ra tên thành phố bí ẩn' },
    method: 'Dạy học thực hành kĩ năng chuyên sâu và thao tác tư liệu',
    scenario: 'Vẽ sơ đồ trục thời gian thể hiện các mốc lịch sử lớn từ thời Hùng Vương đến nay.'
  },
  32: {
    week: 32,
    theme: 'Dự án học tập',
    title: 'Bài 32: Dự án học tập: Em yêu Tổ quốc Việt Nam',
    knowledge: 'Tập hợp tranh ảnh, bài viết, video ngắn giới thiệu về một danh lam thắng cảnh hoặc một vị anh hùng dân tộc em ngưỡng mộ.',
    periods: ['Tiết 1: Xây dựng đề cương và thiết kế sản phẩm dự án nhóm', 'Tiết 2: Báo cáo triển lãm sản phẩm dự án "Em yêu Tổ quốc Việt Nam"'],
    game: { name: 'Triển lãm Non sông ngàn dặm', goal: 'Bồi dưỡng tình yêu quê hương đất nước', materials: 'Báo tường, mô hình di tích, tranh vẽ', rules: 'Bình chọn sản phẩm dự án sáng tạo và có phần thuyết trình xuất sắc nhất' },
    method: 'Dạy học dự án tích hợp liên môn và triển lãm học tập',
    scenario: 'Học sinh mặc trang phục truyền thống các dân tộc cùng hát vang khúc ca ngợi ca Tổ quốc.'
  },
  33: {
    week: 33,
    theme: 'Ôn tập cuối năm',
    title: 'Bài 33: Ôn tập cuối năm: Vùng Bắc Bộ và Duyên hải miền Trung',
    knowledge: 'Hệ thống hóa kiến thức lịch sử, địa lí vùng Trung du miền núi Bắc Bộ, Đồng bằng Bắc Bộ và Duyên hải miền Trung.',
    periods: ['Tiết 1: Ôn tập địa lí và lịch sử vùng Bắc Bộ (Đền Hùng, Thăng Long, Văn Miếu)', 'Tiết 2: Ôn tập địa lí và lịch sử vùng Duyên hải miền Trung (Kinh thành Huế, Phố cổ Hội An)'],
    game: { name: 'Chuyến xe xuyên Việt', goal: 'Ôn tập học kì II', materials: 'Vé xe trò chơi, bảng câu hỏi', rules: 'Trả lời đúng câu hỏi để đưa xe qua các trạm Hà Nội, Huế, Đà Nẵng' },
    method: 'Ôn tập tích cực qua trạm học tập và sơ đồ tư duy',
    scenario: 'Tóm tắt những nét đặc sắc nhất về kinh tế và di sản của vùng miền Trung và miền Bắc.'
  },
  34: {
    week: 34,
    theme: 'Ôn tập cuối năm',
    title: 'Bài 34: Ôn tập cuối năm: Vùng Tây Nguyên và Nam Bộ',
    knowledge: 'Hệ thống hóa kiến thức lịch sử, địa lí vùng cao nguyên Tây Nguyên, Nam Bộ trù phú, Thành phố Hồ Chí Minh và Địa đạo Củ Chi.',
    periods: ['Tiết 1: Ôn tập địa lí và nét đẹp văn hóa vùng Tây Nguyên', 'Tiết 2: Ôn tập địa lí Nam Bộ, Thành phố Hồ Chí Minh và Địa đạo Củ Chi'],
    game: { name: 'Rung chuông vàng Lịch sử & Địa lí 4', goal: 'Đánh giá toàn diện kiến thức cả năm', materials: 'Bảng con, chuông bấm', rules: 'Học sinh ghi đáp án chính xác trên bảng con' },
    method: 'Hệ thống hóa tri thức toàn năm học và giải quyết bài tập tổng hợp',
    scenario: 'Nêu những cảm nhận sâu sắc nhất của em về con người và mảnh đất phương Nam hiền hòa, nghĩa hiệp.'
  },
  35: {
    week: 35,
    theme: 'Đánh giá cuối năm',
    title: 'Bài 35: Đánh giá cuối năm học môn Lịch sử và Địa lí Lớp 4',
    knowledge: 'Đánh giá định kì cuối năm học môn Lịch sử và Địa lí Lớp 4 theo chuẩn năng lực môn học CTGDPT 2018 (Kết nối tri thức với cuộc sống).',
    periods: ['Tiết 1: Đánh giá năng lực nhận thức lịch sử và địa lí', 'Tiết 2: Đánh giá năng lực tìm hiểu và vận dụng kiến thức lịch sử - địa lí vào thực tiễn'],
    game: { name: 'Vinh danh Đại sứ Văn hóa - Lịch sử nhí', goal: 'Tổng kết và trao thưởng', materials: 'Giấy chứng nhận, phần thưởng', rules: 'Trao chứng nhận cho các bạn học sinh có thành tích xuất sắc và yêu thích môn học' },
    method: 'Đánh giá chuẩn năng lực và phẩm chất học sinh tiểu học',
    scenario: 'Tự hào chia sẻ những hiểu biết sâu sắc về lịch sử hào hùng và non sông gấm vóc Việt Nam.'
  }
};

export const HISTORY_GEO_GRADE_5_DATA: Record<number, HistoryGeoWeekItem> = {
  1: {
    week: 1,
    theme: 'Chủ đề 1: Đất nước và con người Việt Nam',
    title: 'Bài 1: Vị trí địa lí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca',
    knowledge: 'Việt Nam nằm ở khu vực Đông Nam Á, trên bán đảo Đông Dương; hình chữ S; vùng biển rộng lớn có chủ quyền thiêng liêng; 63 tỉnh, thành phố trực thuộc Trung ương; ý nghĩa thiêng liêng của Quốc kì cờ đỏ sao vàng, Quốc huy và bài Tiến quân ca.',
    periods: ['Tiết 1: Xác định vị trí địa lí, giới hạn lãnh thổ và đơn vị hành chính Việt Nam', 'Tiết 2: Tìm hiểu ý nghĩa lịch sử thiêng liêng của Quốc kì, Quốc huy và Quốc ca'],
    game: { name: 'Tự hào cờ đỏ sao vàng', goal: 'Khắc sâu biểu tượng thiêng liêng của Tổ quốc', materials: 'Quốc kì, Quốc huy, nhạc bài Quốc ca', rules: 'Thực hiện tư thế chào cờ trang nghiêm và hát vang lời bài Quốc ca hào hùng' },
    method: 'Giáo dục lòng yêu nước, niềm tự hào dân tộc và ý thức chủ quyền quốc gia',
    scenario: 'Học sinh đứng nghiêm trang hướng về Quốc kì và giải thích ý nghĩa ngôi sao vàng năm cánh trên nền cờ đỏ.'
  },
  2: {
    week: 2,
    theme: 'Chủ đề 1: Đất nước và con người Việt Nam',
    title: 'Bài 2: Thiên nhiên Việt Nam',
    knowledge: 'Địa hình 3/4 là đồi núi, 1/4 là đồng bằng; khí hậu nhiệt đới gió mùa nóng ẩm, mưa nhiều; mạng lưới sông ngòi dày đặc (sông Hồng, sông Cửu Long); đất phù sa màu mỡ và đất feralit; tài nguyên rừng và khoáng sản.',
    periods: ['Tiết 1: Đặc điểm địa hình, khí hậu và mạng lưới sông ngòi Việt Nam', 'Tiết 2: Khám phá tài nguyên đất, rừng và khoáng sản của đất nước'],
    game: { name: 'Rừng vàng biển bạc', goal: 'Nhận biết các nguồn tài nguyên thiên nhiên phong phú', materials: 'Bản đồ khoáng sản và rừng Việt Nam', rules: 'Chỉ các mỏ than đá (Quảng Ninh), dầu khí (vùng biển phía Nam), bô-xít (Tây Nguyên)' },
    method: 'Khai thác bản đồ địa lí tự nhiên Việt Nam và liên hệ bảo vệ tài nguyên',
    scenario: 'Giải thích vì sao thiên nhiên nước ta lại rất thuận lợi cho việc phát triển nền nông nghiệp nhiệt đới.'
  },
  3: {
    week: 3,
    theme: 'Chủ đề 1: Đất nước và con người Việt Nam',
    title: 'Bài 3: Biển, đảo Việt Nam',
    knowledge: 'Vùng biển Việt Nam là một phần của Biển Đông với bờ biển dài 3260km; hàng nghìn đảo và quần đảo lớn nhỏ, tiêu biểu là Quần đảo Hoàng Sa và Quần đảo Trường Sa, đảo Phú Quốc, Côn Đảo; tài nguyên biển và chủ quyền biển đảo bất khả xâm phạm.',
    periods: ['Tiết 1: Xác định vị trí, phạm vi vùng biển đảo và hai Quần đảo Hoàng Sa, Trường Sa', 'Tiết 2: Tiềm năng kinh tế biển và ý thức bảo vệ chủ quyền biển đảo thiêng liêng'],
    game: { name: 'Chiến sĩ canh giữ biển đảo', goal: 'Khẳng định chủ quyền biển đảo thiêng liêng', materials: 'Bản đồ Biển đảo Việt Nam', rules: 'Xác định chính xác vị trí Quần đảo Hoàng Sa (TP Đà Nẵng) và Quần đảo Trường Sa (tỉnh Khánh Hòa)' },
    method: 'Giáo dục chủ quyền biển đảo thiêng liêng của Tổ quốc',
    scenario: 'Viết bức thư gửi các chú bộ đội hải quân đang ngày đêm canh giữ chủ quyền nơi đảo xa.'
  },
  4: {
    week: 4,
    theme: 'Chủ đề 1: Đất nước và con người Việt Nam',
    title: 'Bài 4: Dân cư và dân tộc ở Việt Nam',
    knowledge: 'Dân số nước ta hơn 100 triệu người (đứng thứ 3 Đông Nam Á và 15 thế giới); dân cư phân bố không đều giữa đồng bằng và miền núi; cộng đồng 54 dân tộc anh em luôn đoàn kết, thương yêu giúp đỡ lẫn nhau.',
    periods: ['Tiết 1: Tìm hiểu quy mô, tốc độ tăng dân số và sự phân bố dân cư', 'Tiết 2: Khám phá đại gia đình 54 dân tộc anh em đoàn kết một lòng'],
    game: { name: 'Đại gia đình 54 dân tộc', goal: 'Hiểu sự đa dạng và đoàn kết dân tộc', materials: 'Bản đồ phân bố các dân tộc Việt Nam', rules: 'Ghép tên các dân tộc anh em với địa bàn cư trú chủ yếu (Kinh, Tày, Thái, Mường, Chăm, Khmer...)' },
    method: 'Khai thác tháp dân số, biểu đồ và giáo dục tinh thần đại đoàn kết dân tộc',
    scenario: 'Chia sẻ thông điệp: "54 dân tộc anh em như những cánh hoa rực rỡ trong cùng một vườn hoa Việt Nam".'
  },
  5: {
    week: 5,
    theme: 'Chủ đề 2: Những quốc gia đầu tiên trên lãnh thổ Việt Nam',
    title: 'Bài 5: Nhà nước Văn Lang, Nhà nước Âu Lạc',
    knowledge: 'Nhà nước Văn Lang (thời các Vua Hùng, đóng đô ở Phong Châu - Phú Thọ); Nhà nước Âu Lạc (vua An Dương Vương, đóng đô ở Cổ Loa); tổ chức nhà nước sơ khai, đời sống vật chất và tinh thần của người Việt cổ.',
    periods: ['Tiết 1: Sự ra đời và tổ chức bộ máy Nhà nước Văn Lang thời Hùng Vương', 'Tiết 2: Nhà nước Âu Lạc, công trình thành Cổ Loa và kĩ thuật đúc nỏ thần'],
    game: { name: 'Bánh chưng bánh giầy', goal: 'Khắc sâu truyền thuyết thời dựng nước', materials: 'Tranh Lang Liêu dâng bánh chưng bánh giầy', rules: 'Kể lại câu chuyện Lang Liêu làm bánh tròn tượng trưng cho Trời, bánh vuông tượng trưng cho Đất' },
    method: 'Khai thác tư liệu lịch sử cổ đại, truyền thuyết và sơ đồ tổ chức nhà nước',
    scenario: 'Giải thích ý nghĩa tên gọi Âu Lạc gắn liền với sự hợp nhất giữa người Âu Việt và Lạc Việt.'
  },
  6: {
    week: 6,
    theme: 'Chủ đề 2: Những quốc gia đầu tiên trên lãnh thổ Việt Nam',
    title: 'Bài 6: Vương quốc Phù Nam',
    knowledge: 'Vương quốc Phù Nam hình thành ở vùng hạ lưu sông Mê Công (Nam Bộ ngày nay) từ thế kỉ I đến thế kỉ VII; thương cảng Óc Eo sầm uất; đời sống kinh tế nông nghiệp và nghề thủ công chế tác vàng bạc, gốm sứ tinh xảo.',
    periods: ['Tiết 1: Vị trí địa lí và sự hình thành Vương quốc cổ Phù Nam', 'Tiết 2: Khám phá di chỉ khảo cổ học Thương cảng Óc Eo và hiện vật văn hóa'],
    game: { name: 'Thương nhân cổ cảng Óc Eo', goal: 'Nhận biết các hiện vật khảo cổ học Óc Eo', materials: 'Tranh ảnh đồng tiền cổ, đồ trang sức vàng, tượng Phật gỗ', rules: 'Tìm các hiện vật chứng minh sự giao thương quốc tế rộng mở của Phù Nam' },
    method: 'Khai thác hiện vật bảo tàng khảo cổ học Óc Eo (An Giang)',
    scenario: 'Đóng vai nhà khảo cổ học nhí thuyết minh về đồng tiền cổ La Mã được tìm thấy tại cảng Óc Eo.'
  },
  7: {
    week: 7,
    theme: 'Chủ đề 2: Những quốc gia đầu tiên trên lãnh thổ Việt Nam',
    title: 'Bài 7: Vương quốc Chăm-pa',
    knowledge: 'Vương quốc Chăm-pa hình thành ở dải đất miền Trung từ thế kỉ II; kinh đô Sin-ha-pu-ra (Trà Kiệu - Quảng Nam); thành tựu văn hóa rực rỡ: chữ Phạn, kiến trúc đền tháp Chăm (Thánh địa Mỹ Sơn), điêu khắc đá tinh xảo.',
    periods: ['Tiết 1: Quá trình hình thành và phát triển của Vương quốc Chăm-pa', 'Tiết 2: Khám phá Di sản văn hóa thế giới Thánh địa Mỹ Sơn và tháp Chăm'],
    game: { name: 'Giải mã bí mật gạch xây Tháp Chăm', goal: 'Cảm phục tài năng kiến trúc người Chăm cổ', materials: 'Tranh ảnh Quần thể Tháp Mỹ Sơn, tượng vũ nữ Apsara', rules: 'Chỉ ra nét độc đáo xây tháp gạch không nhìn thấy mạch vữa của người Chăm' },
    method: 'Khám phá di sản kiến trúc văn hóa Chăm-pa',
    scenario: 'Mô tả vẻ đẹp huyền bí của các pho tượng vũ nữ Apsara uyển chuyển khắc trên đá.'
  },
  8: {
    week: 8,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 8: Đấu tranh giành độc lập thời kì Bắc thuộc',
    knowledge: 'Hơn 1000 năm nhân dân ta kiên cường đấu tranh chống ách đô hộ của phong kiến phương Bắc; các cuộc khởi nghĩa tiêu biểu: Khởi nghĩa Hai Bà Trưng (năm 40), Bà Triệu (năm 248), Lí Bí (năm 542), Mai Thúc Loan, Phùng Hưng; chiến thắng Bạch Đằng năm 938 của Ngô Quyền mở ra kỉ nguyên độc lập.',
    periods: ['Tiết 1: Khởi nghĩa Hai Bà Trưng và các cuộc khởi nghĩa giành quyền tự chủ', 'Tiết 2: Chiến thắng Bạch Đằng năm 938 của Ngô Quyền chấm dứt nghìn năm Bắc thuộc'],
    game: { name: 'Trận địa cọc gỗ Bạch Đằng giang', goal: 'Hiểu mưu lược đánh giặc tài ba của Ngô Quyền', materials: 'Lược đồ trận Bạch Đằng năm 938, mô hình cọc gỗ vạt nhọn', rules: 'Mô phỏng kế cắm cọc ngầm dưới lòng sông lợi dụng thủy triều tiêu diệt thuyền giặc Nam Hán' },
    method: 'Khai thác lược đồ trận đánh và kể chuyện chiến công hào hùng',
    scenario: 'Đọc lời thề Hai Bà Trưng khi xuất quân: "Một xin rửa sạch nước thù / Hai xin đem lại nghiệp xưa họ Hùng".'
  },
  9: {
    week: 9,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 9: Triều Lý và việc định đô ở Thăng Long',
    knowledge: 'Vua Lý Thái Tổ lập nên triều Lý (năm 1009); dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long (năm 1010); xây dựng thành Thăng Long, chùa Một Cột; cuộc kháng chiến chống Tống oanh liệt và bài thơ thần "Nam quốc sơn hà" của Lý Thường Kiệt.',
    periods: ['Tiết 1: Sự kiện dời đô về Thăng Long và công cuộc xây dựng đất nước thời Lý', 'Tiết 2: Kháng chiến chống Tống trên phòng tuyến sông Như Nguyệt và bài thơ Nam quốc sơn hà'],
    game: { name: 'Bản Tuyên ngôn độc lập đầu tiên', goal: 'Khắc sâu bài thơ thần Nam quốc sơn hà', materials: 'Bức tranh Lý Thường Kiệt đọc thơ bên sông Như Nguyệt', rules: 'Đọc diễn cảm bài thơ: "Nam quốc sơn hà Nam đế cư / Tiệt nhiên định phận tại thiên thư..."' },
    method: 'Phân tích tài liệu lịch sử, đọc diễn cảm thơ văn hào khí non sông',
    scenario: 'Cảm nhận khí phách quật cường của dân tộc khi vang lên bài thơ thần bên bờ sông Cầu.'
  },
  10: {
    week: 10,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 10: Triều Trần xây dựng đất nước và kháng chiến chống quân Mông - Nguyên xâm lược',
    knowledge: 'Triều Trần (1226 - 1400); chính sách khoan thư sức dân; ba lần đại thắng quân xâm lược Mông - Nguyên hung bạo; Hội nghị Diên Hồng (tiếng hô "ĐÁNH!"), Hội nghị Bình Than; thiên tài quân sự Trần Hưng Đạo và bài Hịch tướng sĩ.',
    periods: ['Tiết 1: Ba lần chiến thắng oanh liệt quân Mông - Nguyên và Hào khí Đông A', 'Tiết 2: Tinh thần đoàn kết toàn dân: Hội nghị Diên Hồng và tấm gương Trần Quốc Toản'],
    game: { name: 'Lá cờ thêu sáu chữ vàng', goal: 'Tấm gương tuổi trẻ yêu nước Trần Quốc Toản', materials: 'Lá cờ "Phá cường địch, báo hoàng ân", quả cam mô hình', rules: 'Kể lại câu chuyện Trần Quốc Toản vì căm giận giặc đã bóp nát quả cam trong tay lúc nào không biết' },
    method: 'Kể chuyện danh nhân lịch sử và phân tích tinh thần đoàn kết Diên Hồng',
    scenario: 'Hô vang tiếng "ĐÁNH!" như các bô lão trong Hội nghị Diên Hồng khi vua Trần hỏi kế sách.'
  },
  11: {
    week: 11,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 11: Khởi nghĩa Lam Sơn và Triều Hậu Lê',
    knowledge: 'Cuộc khởi nghĩa Lam Sơn (1418 - 1427) do Lê Lợi và Nguyễn Trãi lãnh đạo; chiến thắng Chi Lăng - Xương Giang quét sạch giặc Minh; tác phẩm bất hủ "Bình Ngô đại cáo"; Triều Hậu Lê phát triển rực rỡ với Bộ luật Hồng Đức và bản đồ Hồng Đức.',
    periods: ['Tiết 1: Diễn biến khởi nghĩa Lam Sơn và chiến thắng Chi Lăng giải phóng đất nước', 'Tiết 2: Thời kì hưng thịnh của Triều Hậu Lê: Bộ luật Hồng Đức và Bản đồ Hồng Đức'],
    game: { name: 'Mưu phạt tâm công', goal: 'Hiểu tư tưởng nhân nghĩa của Nguyễn Trãi', materials: 'Trích đoạn Bình Ngô đại cáo', rules: 'Đọc vang câu thơ: "Đem đại nghĩa để thắng hung tàn / Lấy chí nhân để thay cường bạo"' },
    method: 'Khai thác văn học lịch sử và phân tích tiến trình phục hưng dân tộc',
    scenario: 'Kể lại sự tích Hồ Gươm khi vua Lê Thái Tổ trả lại gươm báu cho Rùa Vàng sau ngày toàn thắng.'
  },
  12: {
    week: 12,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 12: Triều Nguyễn',
    knowledge: 'Nhà Nguyễn thành lập (năm 1802), vua Gia Long đặt quốc hiệu là Việt Nam; kinh đô Phú Xuân (Huế); công cuộc khai hoang mở rộng bờ cõi; xây dựng kinh thành Huế; khẳng định và củng cố chủ quyền trên hai Quần đảo Hoàng Sa, Trường Sa (Đội Hoàng Sa).',
    periods: ['Tiết 1: Sự thành lập Triều Nguyễn và công cuộc khai hoang, thống nhất bờ cõi', 'Tiết 2: Xây dựng kinh thành Huế và hoạt động của Đội Hoàng Sa kiêm quản Trường Sa'],
    game: { name: 'Hải đội Hoàng Sa giữ cõi bờ', goal: 'Khẳng định chủ quyền lịch sử tại Hoàng Sa, Trường Sa', materials: 'Châu bản triều Nguyễn, mô hình thuyền buồm lướt sóng', rules: 'Tìm các bằng chứng lịch sử ghi nhận việc vua Nguyễn cử hải đội ra cắm mốc chủ quyền Hoàng Sa' },
    method: 'Khai thác châu bản triều Nguyễn và tư liệu lịch sử chủ quyền biển đảo',
    scenario: 'Đọc lệnh chỉ của triều đình cử binh lính giong buồm ra quần đảo Hoàng Sa đo đạc hải trình.'
  },
  13: {
    week: 13,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 13: Cách mạng tháng Tám năm 1945',
    knowledge: 'Đảng Cộng sản Việt Nam ra đời (1930) do Bác Hồ sáng lập; cao trào Cách mạng tháng Tám năm 1945 giành chính quyền trên cả nước; ngày 2 tháng 9 năm 1945 tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    periods: ['Tiết 1: Không khí sục sôi tổng khởi nghĩa Cách mạng tháng Tám năm 1945', 'Tiết 2: Ngày 2/9/1945 tại Quảng trường Ba Đình và Bản Tuyên ngôn Độc lập'],
    game: { name: 'Lời Người vang vọng Ba Đình', goal: 'Khắc sâu mốc son lịch sử 2/9/1945', materials: 'Bản ghi âm giọng đọc Bác Hồ 2/9/1945, ảnh Quảng trường Ba Đình rực rỡ cờ hoa', rules: 'Nghe đoạn Bác Hồ hỏi "Tôi nói đồng bào nghe rõ không?" và cả triệu người đồng thanh "Có!"' },
    method: 'Khai thác tư liệu phim tài liệu, băng ghi âm lịch sử và giáo dục truyền thống',
    scenario: 'Học sinh đọc thuộc đoạn mở đầu và lời thề độc lập thiêng liêng trong Tuyên ngôn Độc lập.'
  },
  14: {
    week: 14,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 14: Chiến dịch Điện Biên Phủ năm 1954',
    knowledge: 'Chiến dịch lịch sử Điện Biên Phủ (56 ngày đêm "khoét núi, ngủ hầm, mưa dầm, cơm vắt"); ngày 7/5/1954 tướng Đờ Cát-xtơ-ri đầu hàng; chiến thắng "Lừng lẫy năm châu, chấn động địa cầu"; tấm gương anh hùng Phan Đình Giót, Tô Vĩnh Diện, Bế Văn Đàn.',
    periods: ['Tiết 1: Diễn biến 56 ngày đêm của Chiến dịch lịch sử Điện Biên Phủ', 'Tiết 2: Tấm gương các anh hùng liệt sĩ và ý nghĩa chiến thắng chấn động địa cầu'],
    game: { name: 'Kéo pháo qua đèo', goal: 'Tôn vinh sự hy sinh anh dũng của chiến sĩ Điện Biên', materials: 'Lược đồ tập đoàn cứ điểm Điện Biên Phủ, bài hát Hò kéo pháo', rules: 'Hát vang bài Hò kéo pháo và kể lại tấm gương Tô Vĩnh Diện lấy thân chèn pháo' },
    method: 'Khai thác lược đồ chiến dịch, phim tư liệu lịch sử và kể chuyện anh hùng',
    scenario: 'Kể lại khoảnh khắc lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm tướng Đờ Cát chiều ngày 7/5/1954.'
  },
  15: {
    week: 15,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 15: Chiến dịch Hồ Chí Minh năm 1975',
    knowledge: 'Cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975; Chiến dịch Hồ Chí Minh lịch sử; trưa ngày 30 tháng 4 năm 1975 xe tăng húc đổ cổng Dinh Độc Lập; giải phóng hoàn toàn miền Nam, thống nhất đất nước non sông thu về một mối.',
    periods: ['Tiết 1: Tiến trình Chiến dịch Hồ Chí Minh lịch sử giải phóng Sài Gòn', 'Tiết 2: Trưa ngày 30/4/1975 tại Dinh Độc Lập và niềm vui non sông thống nhất'],
    game: { name: 'Khúc ca toàn thắng', goal: 'Kỷ niệm ngày giải phóng miền Nam thống nhất đất nước', materials: 'Ảnh xe tăng 390 húc đổ cổng Dinh Độc Lập, bài hát Như có Bác trong ngày đại thắng', rules: 'Hát vang khúc ca Như có Bác trong ngày đại thắng và giải thích ý nghĩa ngày 30/4' },
    method: 'Khai thác tư liệu hình ảnh lịch sử và giáo dục lòng biết ơn vô hạn',
    scenario: 'Xem lại bức ảnh xe tăng húc đổ cánh cổng sắt Dinh Độc Lập trưa 30/4/1975.'
  },
  16: {
    week: 16,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 16: Đất nước Đổi mới',
    knowledge: 'Đại hội Đảng lần thứ VI (năm 1986) khởi xướng đường lối Đổi mới; những thành tựu to lớn: kinh tế tăng trưởng cao, đời sống nhân dân ấm no hạnh phúc, diện mạo đô thị - nông thôn khang trang, vị thế đối ngoại của Việt Nam ngày càng nâng cao trên trường quốc tế.',
    periods: ['Tiết 1: Bối cảnh và đường lối Đổi mới của Đảng từ năm 1986 đến nay', 'Tiết 2: Khám phá những thành tựu vượt bậc về kinh tế, văn hóa và hội nhập quốc tế'],
    game: { name: 'Việt Nam cất cánh', goal: 'Nhận biết các công trình biểu tượng của thời kì Đổi mới', materials: 'Tranh ảnh cầu Mỹ Thuận, hầm Hải Vân, đường sắt trên cao, tàu Metro', rules: 'Kể tên các công trình giao thông hiện đại của đất nước' },
    method: 'So sánh hình ảnh đất nước trước và sau thời kì Đổi mới',
    scenario: 'Kể về sự thay đổi của khu phố hoặc làng quê em trong những năm gần đây.'
  },
  17: {
    week: 17,
    theme: 'Chủ đề 3: Xây dựng và bảo vệ đất nước Việt Nam',
    title: 'Bài 17: Ôn tập chủ đề Xây dựng và bảo vệ đất nước',
    knowledge: 'Hệ thống hóa toàn bộ các mốc son lịch sử: Thời kì Bắc thuộc, Lý, Trần, Hậu Lê, Nguyễn, Cách mạng tháng Tám, Điện Biên Phủ, 30/4/1975 và Thời kì Đổi mới.',
    periods: ['Tiết 1: Hệ thống hóa trục thời gian lịch sử Việt Nam từ cổ đại đến cận đại', 'Tiết 2: Tổng kết lịch sử hiện đại và làm bài tập đánh giá chủ đề'],
    game: { name: 'Theo dòng lịch sử hào hùng', goal: 'Nắm vững các mốc son chói lọi của dân tộc', materials: 'Trục thời gian dài dán trên bảng', rules: 'Gắn đúng tên sự kiện và anh hùng vào các mốc năm: 938, 1010, 1288, 1427, 1945, 1954, 1975' },
    method: 'Sử dụng trục thời gian tổng hợp và bản đồ tư duy lịch sử',
    scenario: 'Thuyết trình trước lớp về một mốc son lịch sử mà em cảm thấy tự hào và xúc động nhất.'
  },
  18: {
    week: 18,
    theme: 'Đánh giá Học kì I',
    title: 'Bài 18: Ôn tập và Đánh giá Học kì I môn Lịch sử và Địa lí Lớp 5',
    knowledge: 'Tổng kết toàn diện kiến thức địa lí Việt Nam và lịch sử dựng nước, giữ nước; đánh giá định kì cuối học kì I.',
    periods: ['Tiết 1: Ôn tập tổng kết Địa lí Việt Nam và Lịch sử dân tộc kì I', 'Tiết 2: Đánh giá định kì cuối học kì I môn Lịch sử và Địa lí Lớp 5'],
    game: { name: 'Chinh phục Đỉnh cao Tri thức Lịch sử & Địa lí', goal: 'Đánh giá năng lực tổng hợp kì I', materials: 'Bảng con, bộ câu hỏi trắc nghiệm và tự luận', rules: 'Học sinh ghi đáp án chính xác trên bảng con' },
    method: 'Đánh giá định kì chuẩn CTGDPT 2018',
    scenario: 'Tự tin trình bày những hiểu biết của bản thân về đất nước và lịch sử Việt Nam.'
  },
  19: {
    week: 19,
    theme: 'Chủ đề 4: Các nước láng giềng',
    title: 'Bài 19: Nước Cộng hoà Nhân dân Trung Hoa',
    knowledge: 'Vị trí giáp phía bắc nước ta; diện tích rộng lớn thứ tư thế giới; dân số hơn 1,4 tỉ người; thủ đô Bắc Kinh; các công trình nổi tiếng: Vạn Lý Trường Thành, Tử Cấm Thành; mối quan hệ láng giềng hữu nghị và hợp tác kinh tế.',
    periods: ['Tiết 1: Vị trí địa lí, tự nhiên, dân cư và kinh tế Trung Quốc', 'Tiết 2: Khám phá Vạn Lý Trường Thành và mối quan hệ láng giềng Việt - Trung'],
    game: { name: 'Thám hiểm Vạn Lý Trường Thành', goal: 'Hiểu quy mô kì quan thế giới của Trung Quốc', materials: 'Tranh ảnh Vạn Lý Trường Thành, lược đồ châu Á', rules: 'Tìm hiểu chiều dài và mục đích xây dựng thành lũy cổ xưa của Trung Quốc' },
    method: 'Khai thác lược đồ châu Á và tranh ảnh danh lam thắng cảnh láng giềng',
    scenario: 'Xác định đường biên giới chung trên đất liền giữa Việt Nam và Trung Quốc trên bản đồ.'
  },
  20: {
    week: 20,
    theme: 'Chủ đề 4: Các nước láng giềng',
    title: 'Bài 20: Nước Cộng hoà Dân chủ Nhân dân Lào',
    knowledge: 'Nước láng giềng phía tây Việt Nam; không giáp biển; địa hình nhiều đồi núi; thủ đô Viêng Chăn; dòng sông Mê Công chảy qua; công trình tiêu biểu: Thạt Luổng; tình hữu nghị thủy chung đặc biệt Việt - Lào.',
    periods: ['Tiết 1: Vị trí địa lí, điều kiện tự nhiên và văn hóa đất nước Triệu Voi (Lào)', 'Tiết 2: Khám phá Tháp Thạt Luổng và tình hữu nghị vĩ đại đặc biệt Việt - Lào'],
    game: { name: 'Hoa Chăm-pa tươi thắm', goal: 'Tìm hiểu nét đẹp văn hóa Lào', materials: 'Quốc hoa Chăm-pa, hình ảnh Tháp Thạt Luổng', rules: 'Nêu ý nghĩa Lễ hội té nước Bun-pi-may cầu chúc may mắn của nhân dân Lào' },
    method: 'Tìm hiểu đất nước bạn bè thân thiết và giáo dục tình hữu nghị quốc tế',
    scenario: 'Đọc câu thơ của Bác Hồ về tình hữu nghị Việt - Lào: "Việt - Lào hai nước chúng ta / Tình sâu hơn nước Hồng Hà, Cửu Long".'
  },
  21: {
    week: 21,
    theme: 'Chủ đề 4: Các nước láng giềng',
    title: 'Bài 21: Vương quốc Cam-pu-chia',
    knowledge: 'Nước láng giềng phía tây nam; địa hình lòng chảo với Biển Hồ (hồ nước ngọt lớn nhất Đông Nam Á); thủ đô Phnôm Pênh; quần thể đền tháp Ăng-co Vát, Ăng-co Thom kì vĩ (Di sản văn hóa thế giới); tình đoàn kết láng giềng.',
    periods: ['Tiết 1: Vị trí, địa hình lòng chảo, Biển Hồ trù phú và nông nghiệp Cam-pu-chia', 'Tiết 2: Khám phá Quần thể Di sản thế giới Ăng-co Vát và Ăng-co Thom'],
    game: { name: 'Bí ẩn đền tháp Ăng-co Vát', goal: 'Cảm nhận kì quan kiến trúc đá của Cam-pu-chia', materials: 'Tranh ảnh đền Ăng-co Vát với tháp hoa sen, nụ cười Bay-on', rules: 'Mô tả kiến trúc đền tháp đá đồ sộ của người Khmer cổ' },
    method: 'Khám phá di sản kiến trúc nhân loại và địa lí Biển Hồ',
    scenario: 'Giải thích vai trò của Biển Hồ cung cấp nguồn cá tôm khổng lồ và điều hòa nước sông Mê Công.'
  },
  22: {
    week: 22,
    theme: 'Chủ đề 4: Các nước láng giềng',
    title: 'Bài 22: Hiệp hội các quốc gia Đông Nam Á (ASEAN)',
    knowledge: '11 quốc gia thành viên Đông Nam Á; mục tiêu thành lập ASEAN (hợp tác kinh tế, văn hóa, giữ gìn hòa bình, an ninh khu vực); Việt Nam gia nhập ASEAN năm 1995; biểu tượng bó lúa vàng 10 nhánh và khẩu hiệu "Một tầm nhìn, Một bản sắc, Một cộng đồng".',
    periods: ['Tiết 1: Tìm hiểu các nước thành viên và mục tiêu của Cộng đồng ASEAN', 'Tiết 2: Vai trò và đóng góp tích cực của Việt Nam trong ngôi nhà chung ASEAN'],
    game: { name: 'Lá cờ chung ASEAN', goal: 'Nhận biết quốc kì các nước Đông Nam Á', materials: 'Bộ thẻ quốc kì 11 nước ASEAN', rules: 'Ghép đúng quốc kì với tên nước: Indonesia, Malaysia, Singapore, Thái Lan, Việt Nam...' },
    method: 'Dạy học quốc tế hội nhập, khai thác bản đồ Đông Nam Á',
    scenario: 'Giải thích ý nghĩa biểu tượng bó lúa vàng trên lá cờ ASEAN thể hiện tình đoàn kết, gắn bó.'
  },
  23: {
    week: 23,
    theme: 'Chủ đề 5: Tìm hiểu thế giới',
    title: 'Bài 23: Các châu lục và đại dương trên thế giới',
    knowledge: 'Trái Đất có 6 châu lục: Châu Á (lớn nhất, đông dân nhất), Châu Âu, Châu Phi, Châu Mĩ, Châu Đại Dương (nhỏ nhất), Châu Nam Cực (lạnh nhất, không có cư dân thường trú); 4 đại dương lớn: Thái Bình Dương (lớn nhất), Đại Tây Dương, Ấn Độ Dương, Bắc Băng Dương (nhỏ nhất, lạnh nhất).',
    periods: ['Tiết 1: Xác định 6 châu lục và 4 đại dương trên Quả Địa Cầu và Bản đồ thế giới', 'Tiết 2: So sánh diện tích, vị trí và đặc điểm tự nhiên nổi bật của các châu lục'],
    game: { name: 'Vòng quanh thế giới trên Quả Địa Cầu', goal: 'Xác định nhanh vị trí các châu lục và đại dương', materials: 'Quả Địa Cầu, Bản đồ thế giới', rules: 'Xoay quả địa cầu và chỉ đúng vị trí châu Á, Thái Bình Dương, châu Nam Cực...' },
    method: 'Thao tác trực tiếp trên Quả Địa Cầu và Bản đồ thế giới',
    scenario: 'Đóng vai phi hành gia ngắm nhìn Trái Đất từ vũ trụ với màu xanh dương bao la của các đại dương.'
  },
  24: {
    week: 24,
    theme: 'Chủ đề 5: Tìm hiểu thế giới',
    title: 'Bài 24: Dân số và các chủng tộc chính trên thế giới',
    knowledge: 'Dân số thế giới hơn 8 tỉ người, phân bố không đều; 3 chủng tộc chính: Môn-gô-lô-it (da vàng, chủ yếu ở châu Á), Nê-grô-it (da đen, nguồn gốc châu Phi), Ơ-rô-pê-ô-it (da trắng, chủ yếu ở châu Âu và châu Mĩ); bình đẳng và tôn trọng giữa các chủng tộc, chống phân biệt chủng tộc.',
    periods: ['Tiết 1: Tìm hiểu quy mô dân số thế giới và đặc điểm 3 chủng tộc chính', 'Tiết 2: Ý thức bình đẳng, hữu nghị và chống nạn phân biệt chủng tộc toàn cầu'],
    game: { name: 'Trái Đất này là của chúng mình', goal: 'Giáo dục bình đẳng sắc tộc và tình hữu nghị', materials: 'Bài hát Trái Đất này là của chúng mình, tranh thiếu nhi các nước', rules: 'Hát vang khúc ca ca ngợi hòa bình và tình bạn năm châu' },
    method: 'Giáo dục công dân toàn cầu, tôn trọng sự đa dạng văn hóa nhân loại',
    scenario: 'Chia sẻ thông điệp: "Mỗi màu da đều mang vẻ đẹp riêng và đều bình đẳng dưới ánh mặt trời".'
  },
  25: {
    week: 25,
    theme: 'Chủ đề 5: Tìm hiểu thế giới',
    title: 'Bài 25: Văn minh Ai Cập',
    knowledge: 'Nền văn minh cổ đại bên dòng sông Nin kì vĩ ở châu Phi; các công trình kiến trúc vĩ đại: Kim tự tháp Kê-ốp (1 trong 7 kì quan thế giới cổ đại), tượng Nhân Sư (Sphinx); chữ tượng hình Ai Cập, kĩ thuật ướp xác và thiên văn học cổ.',
    periods: ['Tiết 1: Vai trò sông Nin và sự hình thành nền văn minh Ai Cập cổ đại', 'Tiết 2: Khám phá bí ẩn Kim tự tháp, tượng Nhân sư và chữ tượng hình'],
    game: { name: 'Bí ẩn lăng mộ Kim tự tháp', goal: 'Tìm hiểu cấu trúc Kim tự tháp Kê-ốp', materials: 'Tranh ảnh Kim tự tháp Kê-ốp, tượng Nhân Sư', rules: 'Kể tên các thành tựu vĩ đại của người Ai Cập cổ đại trong toán học và kiến trúc' },
    method: 'Khai thác tranh ảnh lịch sử thế giới cổ đại và video khảo cổ học',
    scenario: 'Giải thích câu danh ngôn cổ xưa: "Ai Cập là tặng phẩm của dòng sông Nin".'
  },
  26: {
    week: 26,
    theme: 'Chủ đề 5: Tìm hiểu thế giới',
    title: 'Bài 26: Văn minh Hy Lạp',
    knowledge: 'Nền văn minh Hy Lạp cổ đại ở vùng Địa Trung Hải (châu Âu); cái nôi của nền dân chủ cổ đại; công trình kiến trúc đền Pác-tê-nông trên đồi A-crô-pô-lit; quê hương của Thế vận hội Ô-lim-pích (Olympic); các nhà khoa học vĩ đại: Pi-ta-go, Ác-si-mét, Hô-me.',
    periods: ['Tiết 1: Điều kiện tự nhiên Địa Trung Hải và nền dân chủ cổ đại Hy Lạp', 'Tiết 2: Đền Pác-tê-nông, Thế vận hội Olympic và các nhà bác học Hy Lạp'],
    game: { name: 'Ngọn đuốc Olympic', goal: 'Hiểu nguồn gốc Thế vận hội thể thao lớn nhất hành tinh', materials: 'Vòng tròn 5 màu Olympic, tranh đền Pác-tê-nông', rules: 'Kể lại nguồn gốc ngọn đuốc Olympic được thắp sáng từ đỉnh núi thiêng Hy Lạp' },
    method: 'Khám phá văn minh phương Tây cổ đại và tinh thần thể thao Olympic',
    scenario: 'Ngắm nhìn vẻ đẹp hài hòa, tráng lệ của những hàng cột đá đền Pác-tê-nông.'
  },
  27: {
    week: 27,
    theme: 'Chủ đề 6: Chung tay xây dựng thế giới',
    title: 'Bài 27: Xây dựng thế giới xanh - sạch - đẹp',
    knowledge: 'Các thách thức môi trường toàn cầu: biến đổi khí hậu, hiệu ứng nhà kính, rác thải nhựa đại dương, suy giảm rừng nhiệt đới; các hiệp ước quốc tế và hành động chung tay của các quốc gia bảo vệ Hành tinh Xanh.',
    periods: ['Tiết 1: Nhận diện các vấn đề môi trường toàn cầu và biến đổi khí hậu', 'Tiết 2: Trách nhiệm của cộng đồng quốc tế và hành động xanh của học sinh'],
    game: { name: 'Giải cứu Hành tinh Xanh', goal: 'Ý thức bảo vệ môi trường Trái Đất', materials: 'Thẻ hành động xanh toàn cầu', rules: 'Phân loại các giải pháp năng lượng tái tạo, giảm khí thải và trồng rừng' },
    method: 'Dạy học công dân toàn cầu và giáo dục biến đổi khí hậu',
    scenario: 'Đề xuất một thông điệp bằng tiếng Anh và tiếng Việt gửi thiếu nhi thế giới về bảo vệ môi trường.'
  },
  28: {
    week: 28,
    theme: 'Chủ đề 6: Chung tay xây dựng thế giới',
    title: 'Bài 28: Xây dựng thế giới hoà bình',
    knowledge: 'Hậu quả tàn khốc của chiến tranh đối với nhân loại; vai trò của Liên Hợp Quốc (UN) trong việc gìn giữ hòa bình thế giới; Việt Nam tích cực tham gia lực lượng Gìn giữ hòa bình Liên Hợp Quốc; khát vọng sống trong hòa bình, hữu nghị của trẻ em toàn cầu.',
    periods: ['Tiết 1: Hậu quả của chiến tranh và vai trò của tổ chức Liên Hợp Quốc (UN)', 'Tiết 2: Đóng góp của Việt Nam gìn giữ hòa bình thế giới và khát vọng hòa bình'],
    game: { name: 'Cánh chim bồ câu hòa bình', goal: 'Giáo dục tình yêu hòa bình và chống chiến tranh', materials: 'Chim bồ câu giấy trắng, cờ Liên Hợp Quốc', rules: 'Gấp chim bồ câu giấy mang thông điệp hòa bình gửi đến trẻ em trên khắp thế giới' },
    method: 'Giáo dục hòa bình, tình hữu nghị quốc tế và nhân đạo toàn cầu',
    scenario: 'Hình ảnh chiến sĩ mũ nồi xanh Việt Nam đi làm nhiệm vụ gìn giữ hòa bình tại châu Phi.'
  },
  29: {
    week: 29,
    theme: 'Chủ đề 6: Chung tay xây dựng thế giới',
    title: 'Bài 29: Ôn tập chủ đề Thế giới và Việt Nam',
    knowledge: 'Hệ thống hóa kiến thức về các nước láng giềng, ASEAN, 6 châu lục, 4 đại dương, các nền văn minh cổ đại và trách nhiệm xây dựng thế giới hòa bình, xanh tươi.',
    periods: ['Tiết 1: Tổng kết kiến thức Các nước láng giềng, ASEAN và Châu lục thế giới', 'Tiết 2: Tổng kết Các nền văn minh nhân loại và sứ mệnh giữ gìn hòa bình'],
    game: { name: 'Hộ chiếu Công dân Toàn cầu', goal: 'Đánh giá kiến thức thế giới học', materials: 'Hộ chiếu du lịch tượng trưng', rules: 'Đóng dấu visa vào hộ chiếu khi trả lời đúng các câu hỏi về thế giới' },
    method: 'Sơ đồ tư duy và báo cáo dự án học tập toàn cầu',
    scenario: 'Thuyết trình trước lớp: "Nếu được chọn một quốc gia trên thế giới để ghé thăm, em sẽ chọn nước nào? Vì sao?".'
  },
  30: {
    week: 30,
    theme: 'Thực hành & Di sản',
    title: 'Bài 30: Thực hành: Khám phá các di sản văn hóa thế giới và Việt Nam',
    knowledge: 'Thu thập thông tin, hình ảnh về các Di sản văn hóa và thiên nhiên thế giới tại Việt Nam (Vịnh Hạ Long, Phong Nha - Kẻ Bàng, Tràng An, Hoàng thành Thăng Long, Cố đô Huế, Phố cổ Hội An, Mỹ Sơn).',
    periods: ['Tiết 1: Lập hồ sơ di sản văn hóa và thiên nhiên thế giới tại Việt Nam', 'Tiết 2: Thuyết trình giới thiệu và đề xuất biện pháp bảo tồn di sản'],
    game: { name: 'Bản đồ Di sản Việt Nam trên trường quốc tế', goal: 'Tự hào các di sản được UNESCO vinh danh', materials: 'Bản đồ di sản Việt Nam', rules: 'Đính các biểu tượng UNESCO vào đúng vị trí 8 di sản thế giới tại nước ta' },
    method: 'Dạy học di sản và rèn kĩ năng thuyết trình đa phương tiện',
    scenario: 'Tập làm hướng dẫn viên du lịch giới thiệu Vịnh Hạ Long - kì quan thiên nhiên thế giới.'
  },
  31: {
    week: 31,
    theme: 'Dự án học tập',
    title: 'Bài 31: Dự án học tập: Hành trình kết nối năm châu',
    knowledge: 'Thực hiện dự án tìm hiểu về mối quan hệ hợp tác hữu nghị giữa Việt Nam với các quốc gia trên thế giới.',
    periods: ['Tiết 1: Thu thập tài liệu và xây dựng báo cáo dự án "Hành trình kết nối năm châu"', 'Tiết 2: Trưng bày tập san, video clip và thuyết trình kết quả dự án'],
    game: { name: 'Ngày hội Văn hóa Năm Châu', goal: 'Giao lưu và hội nhập quốc tế', materials: 'Trang phục, cờ các nước, tranh ảnh', rules: 'Các nhóm hóa thân thành đại diện các châu lục giới thiệu nét văn hóa độc đáo' },
    method: 'Dạy học dự án tích hợp và ngày hội giao lưu văn hóa quốc tế',
    scenario: 'Học sinh cùng cất vang bài hát "We Are The World" trong ngày hội văn hóa quốc tế.'
  },
  32: {
    week: 32,
    theme: 'Ôn tập chuyên đề',
    title: 'Bài 32: Ôn tập chuyên đề: Địa lí Việt Nam và Thế giới',
    knowledge: 'Hệ thống hóa toàn bộ kiến thức Địa lí Việt Nam (vị trí, địa hình, khí hậu, sông ngòi, tài nguyên, dân cư) và Địa lí thế giới (các châu lục, đại dương, dân cư).',
    periods: ['Tiết 1: Ôn tập chuyên đề Địa lí tự nhiên và kinh tế - xã hội Việt Nam', 'Tiết 2: Ôn tập chuyên đề Các châu lục, đại dương và dân cư thế giới'],
    game: { name: 'Bách khoa toàn thư Địa lí', goal: 'Tổng kết kiến thức địa lí toàn cấp tiểu học', materials: 'Bảng thi đấu trắc nghiệm', rules: 'Giải các câu đố địa lí nhanh và chuẩn xác' },
    method: 'Hệ thống hóa bằng bảng tổng hợp và sơ đồ tư duy',
    scenario: 'Xác định nhanh trên bản đồ các dòng sông lớn nhất Việt Nam và thế giới (sông Mê Công, sông Nin, sông A-ma-dôn).'
  },
  33: {
    week: 33,
    theme: 'Ôn tập chuyên đề',
    title: 'Bài 33: Ôn tập chuyên đề: Các mốc son Lịch sử Việt Nam',
    knowledge: 'Hệ thống hóa toàn bộ tiến trình lịch sử dựng nước và giữ nước của dân tộc Việt Nam: Văn Lang - Âu Lạc, Ngô Quyền, Lý, Trần, Hậu Lê, Nguyễn, Cách mạng tháng Tám, Điện Biên Phủ, Đại thắng mùa Xuân 1975, Đổi mới.',
    periods: ['Tiết 1: Ôn tập lịch sử dựng nước và giữ nước thời phong kiến', 'Tiết 2: Ôn tập lịch sử cách mạng Việt Nam từ năm 1930 đến nay'],
    game: { name: 'Trục vàng Lịch sử dân tộc', goal: 'Nắm chắc toàn bộ biên niên sử Việt Nam', materials: 'Trục thời gian tổng hợp', rules: 'Sắp xếp đúng thứ tự các triều đại và chiến công oanh liệt của dân tộc' },
    method: 'Sơ đồ hóa trục thời gian và đúc kết hào khí dân tộc',
    scenario: 'Đọc diễn cảm những câu thơ ca ngợi truyền thống yêu nước bất khuất của dân tộc Việt Nam.'
  },
  34: {
    week: 34,
    theme: 'Ôn tập tổng kết',
    title: 'Bài 34: Ôn tập tổng kết cuối cấp Tiểu học môn Lịch sử và Địa lí',
    knowledge: 'Hệ thống hóa toàn diện kiến thức và rèn luyện kĩ năng đọc bản đồ, tư liệu, phân tích sự kiện lịch sử chuẩn bị chuyển cấp lên THCS.',
    periods: ['Tiết 1: Rèn kĩ năng phân tích bản đồ, lược đồ và trục thời gian', 'Tiết 2: Tổng kết kiến thức trọng tâm Lịch sử & Địa lí cấp Tiểu học'],
    game: { name: 'Đấu trường Tri thức Lịch sử & Địa lí', goal: 'Đánh giá toàn diện kiến thức cuối cấp', materials: 'Bảng con, chuông bấm', rules: 'Học sinh giải quyết các bài toán tình huống lịch sử và địa lí tổng hợp' },
    method: 'Hệ thống hóa tri thức toàn khóa và rèn tư duy phản biện lịch sử - địa lí',
    scenario: 'Tự hào nhìn lại chặng đường 5 năm tiểu học và sẵn sàng bước vào lớp 6 môn Lịch sử & Địa lí.'
  },
  35: {
    week: 35,
    theme: 'Đánh giá cuối năm',
    title: 'Bài 35: Đánh giá cuối năm học môn Lịch sử và Địa lí Lớp 5',
    knowledge: 'Kiểm tra đánh giá định kì cuối năm học môn Lịch sử và Địa lí Lớp 5 theo chuẩn năng lực CTGDPT 2018 (Kết nối tri thức với cuộc sống).',
    periods: ['Tiết 1: Đánh giá năng lực nhận thức lịch sử và địa lí', 'Tiết 2: Đánh giá năng lực tìm hiểu và vận dụng kiến thức lịch sử - địa lí vào thực tiễn'],
    game: { name: 'Vinh danh Đại sứ Lịch sử - Địa lí Tiểu học', goal: 'Tổng kết và vinh danh', materials: 'Giấy khen, kỷ niệm chương', rules: 'Trưng bày các bài viết và sản phẩm dự án xuất sắc của học sinh' },
    method: 'Đánh giá chuẩn năng lực đầu ra môn Lịch sử và Địa lí cấp Tiểu học',
    scenario: 'Bày tỏ lòng yêu nước nồng nàn và ý thức trách nhiệm xây dựng quê hương, đất nước giàu đẹp.'
  }
};

export function getHistoryGeography35Weeks(grade: string | number): SubjectCurriculumWeekDetailed[] {
  const isGrade5 = String(grade || '').includes('5');
  const dataMap = isGrade5 ? HISTORY_GEO_GRADE_5_DATA : HISTORY_GEO_GRADE_4_DATA;
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
      pageRange: `SGK Lịch sử và Địa lí ${gradeLabel.replace('Lớp ', '')} KNTT, tr.${week * 2 + pIdx}`,
      suggestedActivity: `${item.method}. Khai thác bản đồ, tư liệu lịch sử và thảo luận nhóm.`
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
      sections: ['lsdl_tu_lieu', 'lsdl_nhan_vat', 'lsdl_dong_vai', 'lsdl_que_huong'],
      periods,
      keyKnowledge: item.knowledge,
      textbookPageRange: `SGK Lịch sử và Địa lí ${gradeLabel} - Kết nối tri thức với cuộc sống`,
      suggestedGame: item.game,
      suggestedMethod: item.method,
      suggestedScenario: item.scenario
    };
  });
}
