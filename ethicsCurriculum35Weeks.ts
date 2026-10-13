// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH ĐẠO ĐỨC 35 TUẦN - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// THEO CHUẨN NXB GIÁO DỤC VIỆT NAM (TẬP HUẤN SGK CTGDPT 2018)
// LỚP 1 ĐẾN LỚP 5 - MỖI TUẦN 1 TIẾT (TỔNG CỘNG 35 TIẾT/NĂM)
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface EthicsWeekItem {
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
// ĐẠO ĐỨC LỚP 1
// -------------------------------------------------------------------------
export const ETHICS_GRADE_1_DATA: Record<number, EthicsWeekItem> = {
  1: { week: 1, theme: 'Yêu thương gia đình', title: 'Bài 1: Em yêu thương người thân trong gia đình (Tiết 1)', knowledge: 'Nhận biết những biểu hiện của tình yêu thương gia đình; biết chào hỏi, lễ phép với ông bà, cha mẹ.', game: { name: 'Vòng tay yêu thương', goal: 'Bày tỏ tình cảm với gia đình', materials: 'Tranh ảnh gia đình', rules: 'Học sinh kể về một việc làm thể hiện tình yêu với cha mẹ' }, method: 'Kể chuyện theo tranh, đàm thoại gợi mở', scenario: 'Nói lời cảm ơn khi được mẹ nấu cho bữa ăn ngon.' },
  2: { week: 2, theme: 'Yêu thương gia đình', title: 'Bài 1: Em yêu thương người thân trong gia đình (Tiết 2)', knowledge: 'Thực hành các hành vi chăm sóc, hỏi thăm khi người thân ốm đau hoặc mệt mỏi.', game: { name: 'Bác sĩ nhí chăm sóc mẹ', goal: 'Biết quan tâm khi người thân mệt', materials: 'Khăn bông, cốc nước', rules: 'Đóng vai mang nước và đắp khăn khi mẹ bị sốt' }, method: 'Đóng vai xử lý tình huống', scenario: 'Rót nước mời bà uống khi bà vừa đi chợ về mệt.' },
  3: { week: 3, theme: 'Yêu thương gia đình', title: 'Bài 2: Quan tâm, chăm sóc anh chị em trong nhà (Tiết 1)', knowledge: 'Nhường nhịn đồ chơi, giúp đỡ em nhỏ và vâng lời anh chị.', game: { name: 'Chia sẻ đồ chơi', goal: 'Rèn tính nhường nhịn', materials: 'Đồ chơi gấu bông, bóng', rules: 'Thực hành nhường đồ chơi đẹp cho em nhỏ' }, method: 'Trải nghiệm đóng vai và thảo luận nhóm', scenario: 'Nhường món đồ chơi yêu thích cho em bé không tranh giành.' },
  4: { week: 4, theme: 'Yêu thương gia đình', title: 'Bài 2: Quan tâm, chăm sóc anh chị em trong nhà (Tiết 2)', knowledge: 'Biết dỗ dành em khi em khóc, hướng dẫn em cùng cất dọn đồ chơi gọn gàng.', game: { name: 'Cùng em dọn đồ chơi', goal: 'Giúp đỡ em nhỏ', materials: 'Hộp đồ chơi', rules: 'Thi xếp đồ chơi vào giỏ nhanh và gọn gàng nhất' }, method: 'Thực hành hành vi tích cực', scenario: 'Cùng em bé cất đồ chơi vào hộp sau khi chơi xong.' },
  5: { week: 5, theme: 'Tự chăm sóc bản thân', title: 'Bài 3: Tự giác làm vệ sinh cá nhân (Tiết 1)', knowledge: 'Các bước rửa mặt, đánh răng, chải tóc, rửa tay bằng xà phòng đúng cách.', game: { name: 'Bé sạch bé xinh', goal: 'Thuần thục kĩ năng vệ sinh cá nhân', materials: 'Bàn chải, khăn mặt mô hình', rules: 'Thực hành động tác đánh răng đúng cách theo nhịp bài hát' }, method: 'Thực hành thao tác mẫu', scenario: 'Tự giác đánh răng vào buổi sáng sau khi ngủ dậy và trước khi đi ngủ.' },
  6: { week: 6, theme: 'Tự chăm sóc bản thân', title: 'Bài 3: Tự giác làm vệ sinh cá nhân (Tiết 2)', knowledge: 'Hình thành thói quen tắm gội sạch sẽ, giữ quần áo gọn gàng, thơm tho.', game: { name: 'Gương sáng sạch gọn', goal: 'Tự giác vệ sinh cá nhân', materials: 'Gương soi, lược', rules: 'Tự chỉnh đốn trang phục, chải tóc ngay ngắn trước gương' }, method: 'Tự đánh giá và rèn luyện thói quen', scenario: 'Tự giác thay quần áo sạch sẽ sau khi đi học về.' },
  7: { week: 7, theme: 'Tự chăm sóc bản thân', title: 'Bài 4: Ăn uống đủ chất và hợp vệ sinh (Tiết 1)', knowledge: 'Ích lợi của việc ăn chín, uống sôi, ăn đúng giờ và đủ chất dinh dưỡng.', game: { name: 'Bữa cơm ngon miệng', goal: 'Nhận biết thức ăn sạch và bổ dưỡng', materials: 'Tranh món ăn', rules: 'Chọn các món ăn tốt cho sức khỏe: rau xanh, cá thịt, hoa quả' }, method: 'Quan sát tranh và đàm thoại', scenario: 'Ăn hết suất cơm và không kén chọn thức ăn.' },
  8: { week: 8, theme: 'Tự chăm sóc bản thân', title: 'Bài 4: Ăn uống đủ chất và hợp vệ sinh (Tiết 2)', knowledge: 'Kĩ năng rửa tay trước khi ăn, nhai kĩ, không nói chuyện khi trong miệng có thức ăn.', game: { name: 'Bàn ăn lịch sự', goal: 'Rèn văn hóa bàn ăn', materials: 'Khay thìa bát', rules: 'Thực hành cầm thìa đúng cách và mời người lớn trước khi ăn' }, method: 'Thực hành hành vi văn minh', scenario: 'Biết mời ông bà, bố mẹ trước khi bắt đầu bữa ăn.' },
  9: { week: 9, theme: 'Kính trọng thầy cô, bạn bè', title: 'Bài 5: Lễ phép với thầy cô giáo (Tiết 1)', knowledge: 'Biết chào hỏi thầy cô giáo khi gặp mặt; biết thưa gửi lễ phép.', game: { name: 'Lời chào thân thương', goal: 'Rèn kĩ năng chào hỏi lễ phép', materials: 'Tranh tình huống học đường', rules: 'Khoanh tay, cúi đầu chào thầy cô bằng giọng nói rõ ràng' }, method: 'Đóng vai và thực hành chào hỏi', scenario: 'Khoanh tay chào cô giáo khi gặp cô ở sân trường hoặc ngoài đường.' },
  10: { week: 10, theme: 'Kính trọng thầy cô, bạn bè', title: 'Bài 5: Lễ phép với thầy cô giáo (Tiết 2)', knowledge: 'Tập trung chú ý nghe giảng, giơ tay xin phép phát biểu trong giờ học.', game: { name: 'Bông hoa điểm mười kính dâng thầy cô', goal: 'Thể hiện lòng biết ơn thầy cô', materials: 'Bông hoa giấy', rules: 'Viết lời chúc hoặc vẽ tranh tặng thầy cô nhân ngày 20/11' }, method: 'Gợi mở cảm xúc và giáo dục lòng biết ơn', scenario: 'Đứng lên xin phép cô giáo trước khi ra ngoài hoặc trả lời câu hỏi.' },
  11: { week: 11, theme: 'Kính trọng thầy cô, bạn bè', title: 'Bài 6: Thân thiện với bạn bè (Tiết 1)', knowledge: 'Biết chào hỏi, chơi hòa đồng với các bạn trong lớp, không bắt nạt bạn.', game: { name: 'Kết bạn bốn phương', goal: 'Tạo sự gắn kết trong lớp', materials: 'Nhạc bài hát Lớp chúng mình', rules: 'Đi vòng tròn và kết nhóm 3, nhóm 4 bạn cùng bắt tay thân ái' }, method: 'Trò chơi tập thể gắn kết', scenario: 'Chủ động làm quen và rủ bạn mới cùng chơi trong giờ ra chơi.' },
  12: { week: 12, theme: 'Kính trọng thầy cô, bạn bè', title: 'Bài 6: Thân thiện với bạn bè (Tiết 2)', knowledge: 'Biết an ủi khi bạn buồn, giúp đỡ khi bạn gặp khó khăn (cho bạn mượn bút, tẩy).', game: { name: 'Đôi bạn cùng tiến', goal: 'Giúp đỡ bạn bè', materials: 'Bộ đồ dùng học tập', rules: 'Xử lý tình huống khi bạn quên mang hộp bút chì' }, method: 'Xử lý tình huống tương tác', scenario: 'Cho bạn ngồi cạnh mượn chiếc bút chì khi bạn để quên ở nhà.' },
  13: { week: 13, theme: 'Tự giác học tập & Sinh hoạt', title: 'Bài 7: Tự giác học tập ở lớp và ở nhà (Tiết 1)', knowledge: 'Tự giác chuẩn bị sách vở theo thời khóa biểu, ngồi vào bàn học đúng giờ.', game: { name: 'Thời khóa biểu thông thái', goal: 'Xếp sách vở đúng thời khóa biểu', materials: 'Sách giáo khoa, vở ghi, thời khóa biểu', rules: 'Thi xếp đúng sách vở theo các môn học ngày mai trong 2 phút' }, method: 'Thực hành kĩ năng tự phục vụ', scenario: 'Tự giác ngồi vào bàn học bài đúng 7 giờ tối không cần bố mẹ nhắc nhở.' },
  14: { week: 14, theme: 'Tự giác học tập & Sinh hoạt', title: 'Bài 7: Tự giác học tập ở lớp và ở nhà (Tiết 2)', knowledge: 'Chăm chỉ hoàn thành bài tập, không xem tivi hay chơi điện thoại khi đang học bài.', game: { name: 'Chiến sĩ đồng hồ tập trung', goal: 'Rèn tính tập trung khi học tập', materials: 'Đồng hồ cát', rules: 'Hoàn thành bài tập viết trong thời gian cát chảy hết' }, method: 'Tự rèn luyện và xây dựng thói quen tốt', scenario: 'Tự giác hoàn thành bài vẽ trước khi xin phép bố mẹ xem phim hoạt hình.' },
  15: { week: 15, theme: 'Thật thà trong cuộc sống', title: 'Bài 8: Thật thà không nói dối (Tiết 1)', knowledge: 'Hiểu thế nào là thật thà; dũng cảm nhận lỗi khi làm vỡ đồ chơi hay mắc khuyết điểm.', game: { name: 'Lời nói thật của chú bé gỗ', goal: 'Hiểu giá trị của lòng trung thực', materials: 'Truyện Chú bé người gỗ Pinocchio', rules: 'Rút ra bài học từ câu chuyện Pinocchio bị dài mũi khi nói dối' }, method: 'Kể chuyện đạo đức và phân tích hành vi', scenario: 'Dũng cảm nhận lỗi với mẹ khi lỡ tay làm vỡ chiếc cốc thủy tinh.' },
  16: { week: 16, theme: 'Thật thà trong cuộc sống', title: 'Bài 8: Thật thà không nói dối (Tiết 2)', knowledge: 'Không tự ý lấy đồ của người khác; nhặt được của rơi biết trả lại người đánh mất.', game: { name: 'Nhặt được của rơi trả người đánh mất', goal: 'Rèn tính trung thực', materials: 'Chiếc ví mô hình, hộp bút', rules: 'Đóng vai mang chiếc ví nhặt được gửi cô tổng phụ trách' }, method: 'Đóng vai tình huống thực tế', scenario: 'Gửi cô giáo chiếc thước kẻ nhặt được dưới sàn lớp học.' },
  17: { week: 17, theme: 'Ôn tập Học kì I', title: 'Bài 9: Ôn tập các chuẩn mực đạo đức Học kì I', knowledge: 'Hệ thống hóa các hành vi đạo đức: Yêu thương gia đình, Tự phục vụ, Lễ phép thầy cô, Thân thiện bạn bè và Thật thà.', game: { name: 'Cây táo việc tốt', goal: 'Tổng kết việc tốt đã làm', materials: 'Cây việc tốt, quả táo giấy', rules: 'Gắn quả táo ghi việc tốt em đã làm trong học kì I lên cây' }, method: 'Tự đánh giá và tuyên dương việc tốt', scenario: 'Kể lại một việc tốt em đã làm được trong học kì I.' },
  18: { week: 18, theme: 'Đánh giá Học kì I', title: 'Bài 10: Đánh giá kết quả rèn luyện Đạo đức Học kì I', knowledge: 'Đánh giá sự tiến bộ trong hành vi và thói quen đạo đức của học sinh.', game: { name: 'Ngôi sao chăm ngoan', goal: 'Bình chọn học sinh tiêu biểu', materials: 'Bảng tuyên dương', rules: 'Bình chọn những bạn có nhiều hành vi chuẩn mực nhất lớp' }, method: 'Đánh giá phẩm chất và thái độ học sinh', scenario: 'Tự tin nhận xét sự tiến bộ của bản thân sau nửa năm học lớp 1.' },
  19: { week: 19, theme: 'Phòng tránh tai nạn thương tích', title: 'Bài 11: Phòng tránh bị bỏng và điện giật (Tiết 1)', knowledge: 'Nhận biết các đồ vật gây bỏng (phích nước sôi, nồi canh nóng, bàn là) và nguy hiểm từ ổ điện, dây điện hở.', game: { name: 'Khu vực nguy hiểm - Tránh xa!', goal: 'Nhận diện đồ vật nguy hiểm trong nhà', materials: 'Tranh phích nước sôi, ổ cắm điện, bàn là', rules: 'Gắn biển cảnh báo màu đỏ vào các vật nguy hiểm' }, method: 'Quan sát tranh cảnh báo và phân tích nguy cơ', scenario: 'Tuyệt đối không chạm tay vào phích nước sôi hoặc chọc dị vật vào ổ cắm điện.' },
  20: { week: 20, theme: 'Phòng tránh tai nạn thương tích', title: 'Bài 11: Phòng tránh bị bỏng và điện giật (Tiết 2)', knowledge: 'Kĩ năng kêu cứu và xử lý khi thấy người bị nạn hoặc gặp sự cố chập điện, cháy nổ.', game: { name: 'Hô to kêu cứu', goal: 'Rèn phản xạ khi gặp nguy hiểm', materials: 'Số điện thoại khẩn cấp 114, 115', rules: 'Thực hành chạy nhanh ra chỗ an toàn và hô to "Cứu cháu với!"' }, method: 'Thực hành phản xạ an toàn', scenario: 'Gọi ngay người lớn khi thấy ổ cắm điện trong nhà phát ra tia lửa.' },
  21: { week: 21, theme: 'Phòng tránh tai nạn thương tích', title: 'Bài 12: Phòng tránh tai nạn ngã và thương tích (Tiết 1)', knowledge: 'Không leo trèo cây cao, ban công, không đùa nghịch xô đẩy nhau ở cầu thang.', game: { name: 'Bước chân an toàn', goal: 'Đi lại trật tự trong trường học', materials: 'Tranh hành lang và cầu thang', rules: 'Thực hành đi bộ bên tay phải trên cầu thang, không nhảy bậc' }, method: 'Thực hành quy tắc an toàn học đường', scenario: 'Nhắc bạn không leo trèo lên lan can ban công lớp học.' },
  22: { week: 22, theme: 'Phòng tránh tai nạn thương tích', title: 'Bài 12: Phòng tránh tai nạn ngã và thương tích (Tiết 2)', knowledge: 'Cẩn thận với các vật sắc nhọn (dao, kéo, compa, mảnh thủy tinh vỡ).', game: { name: 'Kéo ngoan an toàn', goal: 'Sử dụng kéo thủ công an toàn', materials: 'Kéo thủ công đầu tù', rules: 'Thực hành cầm đúng chuôi kéo và đưa kéo cho bạn bằng cách hướng đầu kéo về mình' }, method: 'Thao tác an toàn đồ dùng học tập', scenario: 'Cất kéo thủ công vào hộp ngay sau khi cắt dán xong.' },
  23: { week: 23, theme: 'Tuân thủ quy tắc công cộng', title: 'Bài 13: Giữ gìn trật tự và vệ sinh nơi công cộng (Tiết 1)', knowledge: 'Đi nhẹ, nói khẽ ở bệnh viện, thư viện; bỏ rác đúng nơi quy định ở công viên, đường phố.', game: { name: 'Họa mi nói khẽ', goal: 'Rèn thói quen giữ trật tự nơi công cộng', materials: 'Biển báo Im lặng', rules: 'Thực hành đi nhẹ, nói khẽ khi bước vào không gian thư viện trường' }, method: 'Quan sát biển báo và đóng vai', scenario: 'Giữ yên lặng và không cười đùa khi vào thăm người ốm ở bệnh viện.' },
  24: { week: 24, theme: 'Tuân thủ quy tắc công cộng', title: 'Bài 13: Giữ gìn trật tự và vệ sinh nơi công cộng (Tiết 2)', knowledge: 'Ý thức xếp hàng khi mua đồ, khi vào thang máy, khi lên xe buýt; không chen lấn.', game: { name: 'Đoàn tàu xếp hàng lịch sự', goal: 'Rèn văn hóa xếp hàng', materials: 'Vé xe buýt tượng trưng', rules: 'Học sinh nối đuôi nhau xếp hàng trật tự lên xe buýt không chen lấn' }, method: 'Trò chơi mô phỏng văn hóa xếp hàng', scenario: 'Kiên nhẫn xếp hàng chờ mua đồ ăn ở căng tin trường học.' },
  25: { week: 25, theme: 'Bảo vệ của công & Môi trường', title: 'Bài 14: Bảo quản đồ dùng học tập và của công (Tiết 1)', knowledge: 'Giữ gìn sách vở không bị quăn mép, không vẽ bậy lên bàn ghế, tường lớp học.', game: { name: 'Sách vở sạch đẹp', goal: 'Bảo quản đồ dùng học tập', materials: 'Sách vở, nhãn vở, bìa bọc', rules: 'Thực hành vuốt phẳng góc sách vở và dán nhãn vở cẩn thận' }, method: 'Rèn thói quen giữ gìn đồ vật', scenario: 'Không dùng bút mực vẽ bậy lên mặt bàn học sinh.' },
  26: { week: 26, theme: 'Bảo vệ của công & Môi trường', title: 'Bài 14: Bảo quản đồ dùng học tập và của công (Tiết 2)', knowledge: 'Tắt đèn, tắt quạt khi ra khỏi phòng học; khóa vòi nước sau khi rửa tay.', game: { name: 'Hiệp sĩ tiết kiệm năng lượng', goal: 'Bảo vệ của công và tài nguyên', materials: 'Công tắc mô hình, vòi nước', rules: 'Thực hành kiểm tra tắt quạt và khóa chặt vòi nước trước khi về' }, method: 'Thực hành trách nhiệm công dân nhỏ tuổi', scenario: 'Khóa chặt vòi nước rửa tay khi thấy nước bị rò rỉ.' },
  27: { week: 27, theme: 'An toàn giao thông', title: 'Bài 15: Đi bộ an toàn và đội mũ bảo hiểm (Tiết 1)', knowledge: 'Đi bộ trên vỉa hè hoặc sát lề đường bên tay phải; qua đường tại vạch kẻ đường dành cho người đi bộ.', game: { name: 'Đèn xanh đèn đỏ', goal: 'Nắm vững tín hiệu đèn giao thông', materials: 'Đèn tín hiệu giao thông 3 màu', rules: 'Đèn đỏ dừng lại, Đèn xanh được đi, Đèn vàng đi chậm lại' }, method: 'Trò chơi giao thông mô phỏng trên sân trường', scenario: 'Nắm tay người lớn khi đi qua đường tại ngã tư có đèn tín hiệu.' },
  28: { week: 28, theme: 'An toàn giao thông', title: 'Bài 15: Đi bộ an toàn và đội mũ bảo hiểm (Tiết 2)', knowledge: 'Tự giác đội mũ bảo hiểm đạt chuẩn và cài quai đúng cách khi ngồi trên xe máy, xe đạp điện.', game: { name: 'Mũ bảo hiểm xinh và an toàn', goal: 'Thực hành đội mũ bảo hiểm đúng quy chuẩn', materials: 'Mũ bảo hiểm học sinh', rules: 'Đội mũ ngay ngắn và cài quai vừa vặn hai ngón tay dưới cằm' }, method: 'Thực hành thao tác đội mũ bảo hiểm', scenario: 'Nhắc nhở bố mẹ mang mũ bảo hiểm cho em trước khi chở đi học.' },
  29: { week: 29, theme: 'Yêu thiên nhiên & Đất nước', title: 'Bài 16: Em yêu quê hương đất nước (Tiết 1)', knowledge: 'Nhận biết Quốc kì cờ đỏ sao vàng, ảnh Bác Hồ kính yêu; yêu quý cảnh đẹp quê hương.', game: { name: 'Vẽ tranh Bác Hồ và thiếu nhi', goal: 'Bày tỏ lòng kính yêu Bác Hồ', materials: 'Màu vẽ, giấy vẽ', rules: 'Vẽ tranh Bác Hồ đang quàng khăn đỏ cho các cháu thiếu nhi' }, method: 'Khai thác tranh ảnh Bác Hồ và âm nhạc ca ngợi Tổ quốc', scenario: 'Đứng nghiêm trang khi bài hát Quốc ca vang lên trong buổi lễ chào cờ.' },
  30: { week: 30, theme: 'Yêu thiên nhiên & Đất nước', title: 'Bài 16: Em yêu quê hương đất nước (Tiết 2)', knowledge: 'Bảo vệ cây xanh, không hái hoa bẻ cành nơi công viên, vườn trường.', game: { name: 'Ươm mầm cây xanh', goal: 'Chăm sóc và bảo vệ cây xanh', materials: 'Bình tưới mini, cây hoa trong chậu', rules: 'Tưới nước và nhổ cỏ dại cho bồn hoa của lớp' }, method: 'Trải nghiệm chăm sóc cây xanh thực tế', scenario: 'Nhắc nhở bạn nhỏ không được ngắt hoa trong công viên.' },
  31: { week: 31, theme: 'Rèn luyện kĩ năng đạo đức', title: 'Bài 17: Rèn luyện kĩ năng xử lý tình huống đạo đức', knowledge: 'Vận dụng các chuẩn mực đã học để ứng xử đúng đắn trong các tình huống phát sinh hàng ngày.', game: { name: 'Thử tài ứng xử thông minh', goal: 'Xử lý tình huống linh hoạt', materials: 'Thẻ bài tình huống', rules: 'Bốc thăm tình huống và thể hiện cách giải quyết chuẩn mực nhất' }, method: 'Dạy học giải quyết vấn đề', scenario: 'Xử lý khi bạn vô tình làm đổ hộp bút của em ra sàn.' },
  32: { week: 32, theme: 'Rèn luyện kĩ năng đạo đức', title: 'Bài 18: Tự đánh giá và rèn luyện thói quen tốt', knowledge: 'Tự soi lại các hành vi của bản thân trong cả năm học; lập kế hoạch phát huy điều tốt.', game: { name: 'Nhật kí việc tốt của em', goal: 'Duy trì thói quen tốt', materials: 'Sổ tay nhật kí bé ngoan', rules: 'Chia sẻ 3 điều tốt em tự hào nhất đã làm được trong năm học' }, method: 'Tự đánh giá và chia sẻ cảm xúc', scenario: 'Tự giác thực hiện nền nếp hàng ngày mà không cần bố mẹ nhắc nhở.' },
  33: { week: 33, theme: 'Ôn tập cuối năm', title: 'Bài 19: Ôn tập tổng kết môn Đạo đức Lớp 1 (Phần 1)', knowledge: 'Hệ thống hóa các chủ đề: Gia đình, Bản thân, Thầy cô bạn bè và Thật thà.', game: { name: 'Bông hoa nghìn việc tốt', goal: 'Tổng kết việc tốt học kì II', materials: 'Bông hoa giấy nhiều cánh', rules: 'Viết tên những việc tốt đã làm lên từng cánh hoa' }, method: 'Tổng kết hành vi đạo đức qua trò chơi', scenario: 'Kể lại việc làm thể hiện sự kính yêu ông bà cha mẹ.' },
  34: { week: 34, theme: 'Ôn tập cuối năm', title: 'Bài 20: Ôn tập tổng kết môn Đạo đức Lớp 1 (Phần 2)', knowledge: 'Hệ thống hóa các chủ đề: An toàn, Trật tự công cộng, Giao thông và Yêu quê hương đất nước.', game: { name: 'Rung chuông vàng Đạo đức 1', goal: 'Đánh giá toàn diện kiến thức đạo đức lớp 1', materials: 'Bảng con, chuông bấm', rules: 'Học sinh ghi Đúng (Đ) hoặc Sai (S) trước các hành vi ứng xử' }, method: 'Đánh giá tích cực qua trò chơi trắc nghiệm', scenario: 'Thể hiện cách đi bộ an toàn và đội mũ bảo hiểm chuẩn mực.' },
  35: { week: 35, theme: 'Đánh giá cuối năm', title: 'Bài 21: Đánh giá cuối năm học môn Đạo đức Lớp 1', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất môn Đạo đức Lớp 1 theo CTGDPT 2018.', game: { name: 'Vinh danh Bé ngoan xuất sắc', goal: 'Tổng kết và trao thưởng cuối năm', materials: 'Phiếu Bé ngoan, phần thưởng', rules: 'Tuyên dương các tấm gương học sinh chăm ngoan, lễ phép của lớp' }, method: 'Đánh giá chuẩn phẩm chất và khen thưởng', scenario: 'Tự hào là con ngoan trò giỏi, cháu ngoan Bác Hồ.' }
};

// Map generator for Grade 2, 3, 4, 5
export function getEthics35Weeks(grade: string): SubjectCurriculumWeekDetailed[] {
  let gradeNum = 1;
  if (grade.includes('2')) gradeNum = 2;
  else if (grade.includes('3')) gradeNum = 3;
  else if (grade.includes('4')) gradeNum = 4;
  else if (grade.includes('5')) gradeNum = 5;

  // Grade-specific themes and topics
  const gradeDataMap: Record<number, Record<number, EthicsWeekItem>> = {
    1: ETHICS_GRADE_1_DATA
  };

  // Generate standard 35 weeks for each grade
  return Array.from({ length: 35 }, (_, idx) => {
    const week = idx + 1;
    const semester: 1 | 2 = week <= 18 ? 1 : 2;

    let title = `Bài ${week}: Rèn luyện phẩm chất và hành vi đạo đức Tuần ${week}`;
    let theme = `Chủ đề ${Math.ceil(week / 4)}: Chuẩn mực đạo đức Lớp ${gradeNum}`;
    let knowledge = `Hiểu và thực hành các chuẩn mực hành vi đạo đức, kĩ năng sống tích cực phù hợp lứa tuổi Lớp ${gradeNum} (KNTT).`;
    let game = {
      name: `Góc ứng xử thông minh Tuần ${week}`,
      goal: `Thực hành kĩ năng ứng xử chuẩn mực đạo đức`,
      materials: `Thẻ bài tình huống, bảng nhóm`,
      rules: `Đóng vai xử lý các tình huống đạo đức đời sống trong 3 phút`
    };
    let method = `Phương pháp đóng vai, thảo luận nhóm, giải quyết vấn đề và liên hệ thực tế.`;
    let scenario = `Xử lý tình huống đạo đức xảy ra tại gia đình, trường học hoặc nơi công cộng.`;

    if (gradeNum === 1 && ETHICS_GRADE_1_DATA[week]) {
      const item = ETHICS_GRADE_1_DATA[week];
      title = item.title;
      theme = item.theme;
      knowledge = item.knowledge;
      game = item.game;
      method = item.method;
      scenario = item.scenario;
    } else if (gradeNum === 2) {
      const g2Titles: Record<number, { title: string; theme: string; knowledge: string }> = {
        1: { theme: 'Quý trọng thời gian', title: 'Bài 1: Quý trọng thời gian (Tiết 1)', knowledge: 'Hiểu thời gian là vốn quý; biết lập thời gian biểu trong ngày.' },
        2: { theme: 'Quý trọng thời gian', title: 'Bài 1: Quý trọng thời gian (Tiết 2)', knowledge: 'Thực hành sử dụng thời gian hợp lý, không lãng phí thời gian vào việc vô bổ.' },
        3: { theme: 'Nhận lỗi và sửa lỗi', title: 'Bài 2: Nhận lỗi và sửa lỗi (Tiết 1)', knowledge: 'Dũng cảm nhận lỗi khi mình làm sai; nói lời xin lỗi chân thành.' },
        4: { theme: 'Nhận lỗi và sửa lỗi', title: 'Bài 2: Nhận lỗi và sửa lỗi (Tiết 2)', knowledge: 'Có hành động cụ thể để khắc phục hậu quả lỗi lầm của bản thân.' },
        5: { theme: 'Bảo quản đồ dùng', title: 'Bài 3: Bảo quản đồ dùng cá nhân (Tiết 1)', knowledge: 'Biết giữ gìn cẩn thận sách vở, đồ chơi, quần áo giày dép cá nhân.' },
        6: { theme: 'Bảo quản đồ dùng', title: 'Bài 3: Bảo quản đồ dùng cá nhân (Tiết 2)', knowledge: 'Tự giác sắp xếp đồ dùng cá nhân gọn gàng, ngăn nắp tại góc học tập.' },
        7: { theme: 'Bảo quản đồ dùng', title: 'Bài 4: Bảo quản đồ dùng gia đình (Tiết 1)', knowledge: 'Sử dụng cẩn thận đồ dùng trong nhà: quạt điện, tivi, bàn ghế, bát đĩa.' },
        8: { theme: 'Bảo quản đồ dùng', title: 'Bài 4: Bảo quản đồ dùng gia đình (Tiết 2)', knowledge: 'Tắt các thiết bị điện khi không sử dụng và giữ gìn đồ đạc trong nhà sạch sẽ.' },
        9: { theme: 'Kính trọng thầy cô', title: 'Bài 5: Kính trọng thầy giáo, cô giáo (Tiết 1)', knowledge: 'Bày tỏ lòng biết ơn, kính trọng qua lời nói, thái độ và hành động lễ phép.' },
        10: { theme: 'Kính trọng thầy cô', title: 'Bài 5: Kính trọng thầy giáo, cô giáo (Tiết 2)', knowledge: 'Làm thiệp chúc mừng, thi đua hoa điểm tốt dâng tặng thầy cô.' },
        11: { theme: 'Yêu quý bạn bè', title: 'Bài 6: Yêu quý bạn bè (Tiết 1)', knowledge: 'Biết chia sẻ niềm vui, nỗi buồn cùng bạn; chơi đoàn kết không phân biệt đối xử.' },
        12: { theme: 'Yêu quý bạn bè', title: 'Bài 6: Yêu quý bạn bè (Tiết 2)', knowledge: 'Giúp đỡ bạn học chậm hoặc bạn gặp hoàn cảnh khó khăn cùng tiến bộ.' },
        13: { theme: 'Quan tâm hàng xóm', title: 'Bài 7: Quan tâm, giúp đỡ hàng xóm láng giềng (Tiết 1)', knowledge: 'Chào hỏi lễ phép người hàng xóm; giữ trật tự không làm phiền nhà bên cạnh.' },
        14: { theme: 'Quan tâm hàng xóm', title: 'Bài 7: Quan tâm, giúp đỡ hàng xóm láng giềng (Tiết 2)', knowledge: 'Biết giúp đỡ hàng xóm những việc vừa sức: trông nhà, nhặt đồ rơi, hỏi thăm khi ốm.' },
        15: { theme: 'Thật thà', title: 'Bài 8: Trả lại của rơi (Tiết 1)', knowledge: 'Nhặt được của rơi dứt khoát tìm cách trả lại cho người đánh mất.' },
        16: { theme: 'Thật thà', title: 'Bài 8: Trả lại của rơi (Tiết 2)', knowledge: 'Tuyên dương và noi theo các tấm gương trung thực nhặt được của rơi trả lại.' },
        17: { theme: 'Ôn tập HKI', title: 'Bài 9: Ôn tập chuẩn mực đạo đức Học kì I Lớp 2', knowledge: 'Hệ thống hóa các bài học từ tuần 1 đến tuần 16.' },
        18: { theme: 'Đánh giá HKI', title: 'Bài 10: Đánh giá định kì Học kì I môn Đạo đức Lớp 2', knowledge: 'Đánh giá phẩm chất và hành vi đạo đức của học sinh học kì I.' },
        19: { theme: 'Cảm xúc bản thân', title: 'Bài 11: Tìm hiểu cảm xúc của bản thân (Tiết 1)', knowledge: 'Nhận biết các trạng thái cảm xúc: vui, buồn, tức giận, sợ hãi, lo lắng.' },
        20: { theme: 'Cảm xúc bản thân', title: 'Bài 11: Tìm hiểu cảm xúc của bản thân (Tiết 2)', knowledge: 'Biết cách điều chỉnh và kiềm chế cơn tức giận bằng cách hít thở sâu, đếm từ 1 đến 10.' },
        21: { theme: 'Tìm kiếm trợ giúp', title: 'Bài 12: Tìm kiếm sự hỗ trợ khi ở nhà (Tiết 1)', knowledge: 'Biết gọi điện thoại cho bố mẹ hoặc người thân khi gặp sự cố bất ngờ ở nhà.' },
        22: { theme: 'Tìm kiếm trợ giúp', title: 'Bài 12: Tìm kiếm sự hỗ trợ khi ở nhà (Tiết 2)', knowledge: 'Ghi nhớ các số điện thoại khẩn cấp: 113 (Công an), 114 (Cứu hỏa), 115 (Cấp cứu).' },
        23: { theme: 'Tìm kiếm trợ giúp', title: 'Bài 13: Tìm kiếm sự hỗ trợ khi ở trường (Tiết 1)', knowledge: 'Báo ngay cho thầy cô giáo hoặc bác bảo vệ khi bị bạn bắt nạt hoặc bị thương.' },
        24: { theme: 'Tìm kiếm trợ giúp', title: 'Bài 13: Tìm kiếm sự hỗ trợ khi ở trường (Tiết 2)', knowledge: 'Thực hành các tình huống tìm sự trợ giúp an toàn tại trường học.' },
        25: { theme: 'Nơi công cộng', title: 'Bài 14: Giữ trật tự nơi công cộng (Tiết 1)', knowledge: 'Không nói to, cười đùa, la hét tại rạp chiếu phim, bảo tàng, bệnh viện.' },
        26: { theme: 'Nơi công cộng', title: 'Bài 14: Giữ trật tự nơi công cộng (Tiết 2)', knowledge: 'Xếp hàng văn minh khi mua vé, khi tham gia các hoạt động tập thể.' },
        27: { theme: 'An toàn giao thông', title: 'Bài 15: Tuân thủ quy định khi đi các phương tiện giao thông (Tiết 1)', knowledge: 'Ngồi ngay ngắn khi đi xe máy, thắt dây an toàn khi đi ô tô; không thò đầu ra ngoài cửa sổ.' },
        28: { theme: 'An toàn giao thông', title: 'Bài 15: Tuân thủ quy định khi đi các phương tiện giao thông (Tiết 2)', knowledge: 'Mặc áo phao khi đi đò, thuyền, ca nô trên sông nước.' },
        29: { theme: 'Yêu quê hương', title: 'Bài 16: Em yêu quê hương đất nước (Tiết 1)', knowledge: 'Tự hào về các di tích lịch sử và cảnh đẹp của quê hương em.' },
        30: { theme: 'Yêu quê hương', title: 'Bài 16: Em yêu quê hương đất nước (Tiết 2)', knowledge: 'Tích cực tham gia các hoạt động dọn vệ sinh, làm đẹp đường làng ngõ xóm.' },
        31: { theme: 'Thực hành đạo đức', title: 'Bài 17: Thực hành xử lý tình huống đạo đức học đường', knowledge: 'Rèn luyện phản xạ ứng xử có văn hóa trong đời sống học đường.' },
        32: { theme: 'Thực hành đạo đức', title: 'Bài 18: Lập kế hoạch rèn luyện bản thân trong kì nghỉ hè', knowledge: 'Xây dựng mục tiêu tự phục vụ và giúp đỡ gia đình trong dịp hè.' },
        33: { theme: 'Ôn tập cuối năm', title: 'Bài 19: Ôn tập tổng kết môn Đạo đức Lớp 2 (Phần 1)', knowledge: 'Hệ thống hóa các chuẩn mực đạo đức về bản thân, gia đình, bạn bè.' },
        34: { theme: 'Ôn tập cuối năm', title: 'Bài 20: Ôn tập tổng kết môn Đạo đức Lớp 2 (Phần 2)', knowledge: 'Hệ thống hóa các kĩ năng tìm kiếm trợ giúp, trật tự công cộng và an toàn giao thông.' },
        35: { theme: 'Đánh giá cuối năm', title: 'Bài 21: Đánh giá cuối năm học môn Đạo đức Lớp 2', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất môn Đạo đức Lớp 2 theo CTGDPT 2018.' }
      };
      if (g2Titles[week]) {
        title = g2Titles[week].title;
        theme = g2Titles[week].theme;
        knowledge = g2Titles[week].knowledge;
      }
    } else if (gradeNum === 3) {
      const g3Titles: Record<number, { title: string; theme: string; knowledge: string }> = {
        1: { theme: 'Chào cờ & Quốc ca', title: 'Bài 1: Chào cờ và hát Quốc ca (Tiết 1)', knowledge: 'Hiểu ý nghĩa trang nghiêm của lễ Chào cờ; tư thế đứng nghiêm, mắt nhìn cờ đỏ sao vàng.' },
        2: { theme: 'Chào cờ & Quốc ca', title: 'Bài 1: Chào cờ và hát Quốc ca (Tiết 2)', knowledge: 'Hát vang bài Tiến quân ca đúng nhạc, đúng lời với thái độ tự hào dân tộc.' },
        3: { theme: 'Quan tâm người thân', title: 'Bài 2: Quan tâm, chăm sóc người thân trong gia đình (Tiết 1)', knowledge: 'Hiểu bổn phận của con cháu đối với ông bà, cha mẹ; những việc làm cụ thể bày tỏ lòng hiếu thảo.' },
        4: { theme: 'Quan tâm người thân', title: 'Bài 2: Quan tâm, chăm sóc người thân trong gia đình (Tiết 2)', knowledge: 'Biết chia sẻ công việc nhà, chăm sóc khi người thân mệt mỏi, ốm đau.' },
        5: { theme: 'Ham học hỏi', title: 'Bài 3: Ham học hỏi (Tiết 1)', knowledge: 'Thế nào là ham học hỏi; ích lợi của việc đọc sách báo, tìm tòi và đặt câu hỏi vì sao.' },
        6: { theme: 'Ham học hỏi', title: 'Bài 3: Ham học hỏi (Tiết 2)', knowledge: 'Rèn luyện thói quen tự học, chủ động khám phá tri thức và trao đổi với bạn bè, thầy cô.' },
        7: { theme: 'Giữ lời hứa', title: 'Bài 4: Giữ lời hứa (Tiết 1)', knowledge: 'Thế nào là giữ lời hứa; người biết giữ lời hứa luôn được mọi người tin cậy và quý trọng.' },
        8: { theme: 'Giữ lời hứa', title: 'Bài 4: Giữ lời hứa (Tiết 2)', knowledge: 'Thực hành giữ đúng lời hứa với cha mẹ, thầy cô, bạn bè; biết xin lỗi chân thành khi chưa thực hiện được.' },
        9: { theme: 'Hoàn thành nhiệm vụ', title: 'Bài 5: Tích cực hoàn thành nhiệm vụ ở nhà (Tiết 1)', knowledge: 'Tự giác làm việc nhà vừa sức: quét nhà, rửa chén, gấp quần áo, tưới cây.' },
        10: { theme: 'Hoàn thành nhiệm vụ', title: 'Bài 5: Tích cực hoàn thành nhiệm vụ ở nhà (Tiết 2)', knowledge: 'Hoàn thành công việc đúng thời hạn, cẩn thận và có trách nhiệm.' },
        11: { theme: 'Hoàn thành nhiệm vụ', title: 'Bài 6: Tích cực hoàn thành nhiệm vụ ở trường (Tiết 1)', knowledge: 'Hoàn thành tốt nhiệm vụ học tập, trực nhật lớp, chăm sóc bồn hoa cây cảnh của trường.' },
        12: { theme: 'Hoàn thành nhiệm vụ', title: 'Bài 6: Tích cực hoàn thành nhiệm vụ ở trường (Tiết 2)', knowledge: 'Tự giác hỗ trợ ban cán sự lớp và các bạn trong tổ hoàn thành nhiệm vụ chung.' },
        13: { theme: 'Khám phá bản thân', title: 'Bài 7: Khám phá bản thân (Tiết 1)', knowledge: 'Nhận biết điểm mạnh, điểm yếu và sở thích, năng khiếu của bản thân.' },
        14: { theme: 'Khám phá bản thân', title: 'Bài 7: Khám phá bản thân (Tiết 2)', knowledge: 'Biết tự tin phát huy điểm mạnh và khắc phục những hạn chế của bản thân.' },
        15: { theme: 'Xử lý bất hòa', title: 'Bài 8: Xử lý bất hòa với bạn bè (Tiết 1)', knowledge: 'Nhận biết nguyên nhân gây ra bất hòa, tranh cãi với bạn bè trong học tập và vui chơi.' },
        16: { theme: 'Xử lý bất hòa', title: 'Bài 8: Xử lý bất hòa với bạn bè (Tiết 2)', knowledge: 'Kĩ năng lắng nghe, bình tĩnh đối thoại, giải thích và làm lành với bạn bè.' },
        17: { theme: 'Ôn tập HKI', title: 'Bài 9: Ôn tập chuẩn mực đạo đức Học kì I Lớp 3', knowledge: 'Hệ thống hóa các chủ đề Chào cờ, Gia đình, Ham học hỏi, Giữ lời hứa và Hoàn thành nhiệm vụ.' },
        18: { theme: 'Đánh giá HKI', title: 'Bài 10: Đánh giá định kì Học kì I môn Đạo đức Lớp 3', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất đạo đức học sinh học kì I.' },
        19: { theme: 'Tôn trọng khác biệt', title: 'Bài 11: Tôn trọng sự khác biệt của người khác (Tiết 1)', knowledge: 'Nhận biết sự khác biệt về ngoại hình, hoàn cảnh, sở thích, tính cách và phong tục tập quán.' },
        20: { theme: 'Tôn trọng khác biệt', title: 'Bài 11: Tôn trọng sự khác biệt của người khác (Tiết 2)', knowledge: 'Không chế giễu, trêu chọc; luôn tôn trọng và hòa đồng với bạn bè xung quanh.' },
        21: { theme: 'An toàn giao thông', title: 'Bài 12: Tuân thủ quy tắc an toàn giao thông (Tiết 1)', knowledge: 'Quy tắc đi bộ, đi xe đạp an toàn; nhận biết các nhóm biển báo giao thông đường bộ cơ bản.' },
        22: { theme: 'An toàn giao thông', title: 'Bài 12: Tuân thủ quy tắc an toàn giao thông (Tiết 2)', knowledge: 'Thực hành các hành vi văn hóa giao thông: đội mũ bảo hiểm, nhường đường cho người đi bộ.' },
        23: { theme: 'Bảo vệ của công', title: 'Bài 13: Bảo vệ của công nơi công cộng (Tiết 1)', knowledge: 'Ý thức bảo vệ ghế đá công viên, thiết bị vui chơi, đèn đường, di tích văn hóa.' },
        24: { theme: 'Bảo vệ của công', title: 'Bài 13: Bảo vệ của công nơi công cộng (Tiết 2)', knowledge: 'Nhắc nhở mọi người không khắc tên, vẽ bậy, làm hư hỏng tài sản công cộng.' },
        25: { theme: 'Bảo vệ môi trường', title: 'Bài 14: Em yêu và bảo vệ môi trường (Tiết 1)', knowledge: 'Tác hại của ô nhiễm rác thải nhựa; lợi ích của việc phân loại rác tại nguồn.' },
        26: { theme: 'Bảo vệ môi trường', title: 'Bài 14: Em yêu và bảo vệ môi trường (Tiết 2)', knowledge: 'Thực hành trồng và chăm sóc cây xanh, tái chế chai lọ nhựa thành đồ dùng hữu ích.' },
        27: { theme: 'Yêu quê hương', title: 'Bài 15: Giữ gìn và phát huy truyền thống quê hương (Tiết 1)', knowledge: 'Tự hào về nghề truyền thống, lễ hội và truyền thống hiếu học của quê hương.' },
        28: { theme: 'Yêu quê hương', title: 'Bài 15: Giữ gìn và phát huy truyền thống quê hương (Tiết 2)', knowledge: 'Tham gia các hoạt động đền ơn đáp nghĩa, chăm sóc nghĩa trang liệt sĩ tại địa phương.' },
        29: { theme: 'Kĩ năng tự bảo vệ', title: 'Bài 16: Phòng tránh xâm hại thân thể (Tiết 1)', knowledge: 'Quy tắc 5 ngón tay; nhận diện các vùng riêng tư trên cơ thể không ai được phép chạm vào.' },
        30: { theme: 'Kĩ năng tự bảo vệ', title: 'Bài 16: Phòng tránh xâm hại thân thể (Tiết 2)', knowledge: 'Kĩ năng NÓI KHÔNG - BỎ CHẠY - KỂ LẠI khi gặp người có hành vi xấu.' },
        31: { theme: 'Dự án việc tốt', title: 'Bài 17: Dự án: Hành động nhỏ - Ý nghĩa lớn', knowledge: 'Thực hiện việc làm tốt giúp đỡ người có hoàn cảnh khó khăn tại trường và địa phương.' },
        32: { theme: 'Dự án việc tốt', title: 'Bài 18: Báo cáo kết quả dự án và chia sẻ cảm xúc', knowledge: 'Trưng bày hình ảnh và nhật kí việc tốt trước toàn thể lớp học.' },
        33: { theme: 'Ôn tập cuối năm', title: 'Bài 19: Ôn tập tổng kết môn Đạo đức Lớp 3 (Phần 1)', knowledge: 'Hệ thống hóa các chuẩn mực đạo đức về bản thân, gia đình, bạn bè và học tập.' },
        34: { theme: 'Ôn tập cuối năm', title: 'Bài 20: Ôn tập tổng kết môn Đạo đức Lớp 3 (Phần 2)', knowledge: 'Hệ thống hóa chuẩn mực về Tôn trọng khác biệt, An toàn giao thông, Môi trường và Tự bảo vệ.' },
        35: { theme: 'Đánh giá cuối năm', title: 'Bài 21: Đánh giá cuối năm học môn Đạo đức Lớp 3', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất môn Đạo đức Lớp 3 theo CTGDPT 2018.' }
      };
      if (g3Titles[week]) {
        title = g3Titles[week].title;
        theme = g3Titles[week].theme;
        knowledge = g3Titles[week].knowledge;
      }
    } else if (gradeNum === 4) {
      const g4Titles: Record<number, { title: string; theme: string; knowledge: string }> = {
        1: { theme: 'Biết ơn người lao động', title: 'Bài 1: Biết ơn người lao động (Tiết 1)', knowledge: 'Hiểu vai trò của người lao động (nông dân, công nhân, bác sĩ, thầy cô, cô lao công); mọi nghề nghiệp chân chính đều đáng quý.' },
        2: { theme: 'Biết ơn người lao động', title: 'Bài 1: Biết ơn người lao động (Tiết 2)', knowledge: 'Thực hành thái độ tôn trọng, lễ phép và quý trọng thành quả của người lao động (không bỏ mứa thức ăn).' },
        3: { theme: 'Cảm thông & Giúp đỡ', title: 'Bài 2: Cảm thông và giúp đỡ người gặp khó khăn (Tiết 1)', knowledge: 'Hiểu đạo lý "Lá lành đùm lá rách"; cảm thông với người khuyết tật, người già neo đơn, nạn nhân thiên tai.' },
        4: { theme: 'Cảm thông & Giúp đỡ', title: 'Bài 2: Cảm thông và giúp đỡ người gặp khó khăn (Tiết 2)', knowledge: 'Tham gia phong trào nuôi heo đất, quyên góp sách vở ủng hộ bạn nghèo vượt khó.' },
        5: { theme: 'Yêu lao động', title: 'Bài 3: Yêu lao động (Tiết 1)', knowledge: 'Lao động giúp con người khỏe mạnh, sáng tạo và tạo ra của cải cho xã hội; phê phán thói lười biếng.' },
        6: { theme: 'Yêu lao động', title: 'Bài 3: Yêu lao động (Tiết 2)', knowledge: 'Tự giác tham gia các công việc lao động ở trường và gia đình; làm việc đến nơi đến chốn.' },
        7: { theme: 'Tôn trọng tài sản', title: 'Bài 4: Tôn trọng tài sản của người khác (Tiết 1)', knowledge: 'Hiểu không được tự ý sử dụng hoặc làm hư hỏng đồ dùng của bạn bè, người khác.' },
        8: { theme: 'Tôn trọng tài sản', title: 'Bài 4: Tôn trọng tài sản của người khác (Tiết 2)', knowledge: 'Hỏi mượn lịch sự, giữ gìn cẩn thận và trả lại đúng hẹn; bồi thường khi làm hỏng.' },
        9: { theme: 'Bảo vệ của công', title: 'Bài 5: Bảo vệ của công (Tiết 1)', knowledge: 'Của công là tài sản chung của toàn xã hội; trách nhiệm giữ gìn cơ sở vật chất trường học, công viên.' },
        10: { theme: 'Bảo vệ của công', title: 'Bài 5: Bảo vệ của công (Tiết 2)', knowledge: 'Kiên quyết nhắc nhở và ngăn chặn các hành vi phá hoại tài sản công cộng.' },
        11: { theme: 'Quan hệ bạn bè', title: 'Bài 6: Thiết lập và duy trì quan hệ bạn bè (Tiết 1)', knowledge: 'Kĩ năng mở đầu cuộc trò chuyện, lắng nghe chân thành và tôn trọng sở thích của bạn bè.' },
        12: { theme: 'Quan hệ bạn bè', title: 'Bài 6: Thiết lập và duy trì quan hệ bạn bè (Tiết 2)', knowledge: 'Biết tha thứ, bao dung khi bạn hối lỗi và giữ gìn tình bạn trong sáng, bền chặt.' },
        13: { theme: 'Quý trọng đồng tiền', title: 'Bài 7: Quý trọng đồng tiền (Tiết 1)', knowledge: 'Đồng tiền được làm ra từ mồ hôi công sức lao động vất vả của cha mẹ; biết chi tiêu tiết kiệm, hợp lý.' },
        14: { theme: 'Quý trọng đồng tiền', title: 'Bài 7: Quý trọng đồng tiền (Tiết 2)', knowledge: 'Lập kế hoạch tiết kiệm tiền tiêu vặt để mua sách vở hoặc làm việc nghĩa.' },
        15: { theme: 'Quyền trẻ em', title: 'Bài 8: Quyền và bổn phận của trẻ em (Tiết 1)', knowledge: 'Nhận biết 4 nhóm quyền cơ bản của trẻ em: Quyền Sống còn, Quyền Bảo vệ, Quyền Phát triển, Quyền Tham gia.' },
        16: { theme: 'Quyền trẻ em', title: 'Bài 8: Quyền và bổn phận của trẻ em (Tiết 2)', knowledge: 'Bổn phận của trẻ em đối với gia đình, nhà trường và xã hội: chăm ngoan, học giỏi, vâng lời người lớn.' },
        17: { theme: 'Ôn tập HKI', title: 'Bài 9: Ôn tập chuẩn mực đạo đức Học kì I Lớp 4', knowledge: 'Hệ thống hóa toàn bộ các bài học từ tuần 1 đến tuần 16.' },
        18: { theme: 'Đánh giá HKI', title: 'Bài 10: Đánh giá định kì Học kì I môn Đạo đức Lớp 4', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất đạo đức học sinh học kì I.' },
        19: { theme: 'Tôn trọng sự thật', title: 'Bài 11: Tôn trọng và bảo vệ sự thật (Tiết 1)', knowledge: 'Thế nào là tôn trọng sự thật; người dũng cảm bảo vệ sự thật luôn được kính trọng.' },
        20: { theme: 'Tôn trọng sự thật', title: 'Bài 11: Tôn trọng và bảo vệ sự thật (Tiết 2)', knowledge: 'Phê phán hành vi bao che cho điều sai trái, gian lận trong học tập và kiểm tra.' },
        21: { theme: 'Bảo vệ động vật', title: 'Bài 12: Yêu quý và bảo vệ động vật hoang dã (Tiết 1)', knowledge: 'Vai trò của động vật hoang dã đối với cân bằng sinh thái; các loài động vật quý hiếm có nguy cơ tuyệt chủng.' },
        22: { theme: 'Bảo vệ động vật', title: 'Bài 12: Yêu quý và bảo vệ động vật hoang dã (Tiết 2)', knowledge: 'Cam kết không sử dụng các sản phẩm từ động vật hoang dã; tuyên truyền bảo vệ thiên nhiên.' },
        23: { theme: 'An toàn mạng', title: 'Bài 13: Sử dụng mạng Internet an toàn và lành mạnh (Tiết 1)', knowledge: 'Nhận diện các nguy cơ trên không gian mạng: thông tin xấu độc, lừa đảo, bắt nạt trực tuyến.' },
        24: { theme: 'An toàn mạng', title: 'Bài 13: Sử dụng mạng Internet an toàn và lành mạnh (Tiết 2)', knowledge: 'Quy tắc bảo mật thông tin cá nhân; sử dụng mạng có thời lượng và mục đích học tập lành mạnh.' },
        25: { theme: 'Phòng chống bạo lực', title: 'Bài 14: Phòng tránh bạo lực học đường (Tiết 1)', knowledge: 'Nhận biết các hình thức bạo lực học đường (thể xác, tinh thần, ngôn từ); hậu quả nghiêm trọng.' },
        26: { theme: 'Phòng chống bạo lực', title: 'Bài 14: Phòng tránh bạo lực học đường (Tiết 2)', knowledge: 'Kĩ năng phòng tránh, tìm kiếm sự can thiệp từ thầy cô, gia đình và nói KHÔNG với bạo lực.' },
        27: { theme: 'Đền ơn đáp nghĩa', title: 'Bài 15: Đền ơn đáp nghĩa (Tiết 1)', knowledge: 'Hiểu công lao to lớn của các anh hùng thương binh, liệt sĩ, Mẹ Việt Nam Anh hùng.' },
        28: { theme: 'Đền ơn đáp nghĩa', title: 'Bài 15: Đền ơn đáp nghĩa (Tiết 2)', knowledge: 'Tham gia chăm sóc đài tưởng niệm liệt sĩ, thăm hỏi gia đình có công với cách mạng.' },
        29: { theme: 'Tự hào truyền thống', title: 'Bài 16: Tự hào truyền thống anh hùng dân tộc (Tiết 1)', knowledge: 'Tìm hiểu những trang sử vẻ vang và truyền thống đấu tranh dựng nước giữ nước.' },
        30: { theme: 'Tự hào truyền thống', title: 'Bài 16: Tự hào truyền thống anh hùng dân tộc (Tiết 2)', knowledge: 'Phát huy truyền thống yêu nước bằng hành động chăm chỉ học tập, rèn luyện thân thể.' },
        31: { theme: 'Kĩ năng sống', title: 'Bài 17: Rèn luyện kĩ năng giải quyết mâu thuẫn trong tập thể', knowledge: 'Phương pháp thương lượng hòa giải và hợp tác nhóm hiệu quả.' },
        32: { theme: 'Dự án nhân ái', title: 'Bài 18: Dự án: Vòng tay nhân ái - Chia sẻ yêu thương', knowledge: 'Tổ chức quyên góp và trao quà cho các bạn có hoàn cảnh khó khăn.' },
        33: { theme: 'Ôn tập cuối năm', title: 'Bài 19: Ôn tập tổng kết môn Đạo đức Lớp 4 (Phần 1)', knowledge: 'Hệ thống hóa các chuẩn mực về Lao động, Của công, Bạn bè, Tiền bạc và Quyền trẻ em.' },
        34: { theme: 'Ôn tập cuối năm', title: 'Bài 20: Ôn tập tổng kết môn Đạo đức Lớp 4 (Phần 2)', knowledge: 'Hệ thống hóa chuẩn mực về Sự thật, An toàn mạng, Phòng chống bạo lực và Đền ơn đáp nghĩa.' },
        35: { theme: 'Đánh giá cuối năm', title: 'Bài 21: Đánh giá cuối năm học môn Đạo đức Lớp 4', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất môn Đạo đức Lớp 4 theo CTGDPT 2018.' }
      };
      if (g4Titles[week]) {
        title = g4Titles[week].title;
        theme = g4Titles[week].theme;
        knowledge = g4Titles[week].knowledge;
      }
    } else if (gradeNum === 5) {
      const g5Titles: Record<number, { title: string; theme: string; knowledge: string }> = {
        1: { theme: 'Người có công', title: 'Bài 1: Biết ơn những người có công với quê hương, đất nước (Tiết 1)', knowledge: 'Hiểu công lao trời biển của các anh hùng, liệt sĩ, danh nhân văn hóa đối với độc lập tự do của Tổ quốc.' },
        2: { theme: 'Người có công', title: 'Bài 1: Biết ơn những người có công với quê hương, đất nước (Tiết 2)', knowledge: 'Hành động cụ thể: chăm sóc phần mộ liệt sĩ, kính trọng người có công, phấn đấu học giỏi.' },
        3: { theme: 'Tôn trọng văn hóa', title: 'Bài 2: Tôn trọng sự khác biệt giữa các nền văn hoá (Tiết 1)', knowledge: 'Sự đa dạng về trang phục, phong tục, lễ hội, tín ngưỡng của các dân tộc Việt Nam và các quốc gia.' },
        4: { theme: 'Tôn trọng văn hóa', title: 'Bài 2: Tôn trọng sự khác biệt giữa các nền văn hoá (Tiết 2)', knowledge: 'Thái độ cởi mở, tôn trọng, không kỳ thị hay phán xét các phong tục tập quán lành mạnh khác biệt.' },
        5: { theme: 'Truyền thống nhà trường', title: 'Bài 3: Tự hào về truyền thống nhà trường (Tiết 1)', knowledge: 'Tìm hiểu lịch sử thành lập, các tấm gương thầy cô và học sinh tiêu biểu của trường em.' },
        6: { theme: 'Truyền thống nhà trường', title: 'Bài 3: Tự hào về truyền thống nhà trường (Tiết 2)', knowledge: 'Giữ gìn danh dự nhà trường, thi đua lập nhiều thành tích tốt làm rạng danh mái trường thân yêu.' },
        7: { theme: 'Vượt qua khó khăn', title: 'Bài 4: Vượt qua khó khăn (Tiết 1)', knowledge: 'Hiểu trong cuộc sống ai cũng gặp khó khăn; ý chí và nghị lực vươn lên giúp ta trưởng thành.' },
        8: { theme: 'Vượt qua khó khăn', title: 'Bài 4: Vượt qua khó khăn (Tiết 2)', knowledge: 'Rèn luyện thói quen không nản chí trước bài toán khó, kiên trì theo đuổi mục tiêu tốt đẹp.' },
        9: { theme: 'Tôn trọng ý kiến', title: 'Bài 5: Tôn trọng ý kiến của người khác (Tiết 1)', knowledge: 'Hiểu mỗi người đều có quyền bày tỏ suy nghĩ; biết lắng nghe đa chiều và thảo luận dân chủ.' },
        10: { theme: 'Tôn trọng ý kiến', title: 'Bài 5: Tôn trọng ý kiến của người khác (Tiết 2)', knowledge: 'Kĩ năng phản biện văn minh, hòa nhã, không áp đặt ý kiến cá nhân lên người khác.' },
        11: { theme: 'Bảo vệ môi trường', title: 'Bài 6: Bảo vệ môi trường sống (Tiết 1)', knowledge: 'Các nguy cơ ô nhiễm nguồn nước, không khí, rác thải nhựa; trách nhiệm công dân bảo vệ môi trường.' },
        12: { theme: 'Bảo vệ môi trường', title: 'Bài 6: Bảo vệ môi trường sống (Tiết 2)', knowledge: 'Tham gia phong trào Ngày Chủ nhật Xanh, trồng cây, tiết kiệm điện nước tại gia đình và trường.' },
        13: { theme: 'Bảo vệ lẽ phải', title: 'Bài 7: Bảo vệ lẽ phải (Tiết 1)', knowledge: 'Thế nào là lẽ phải; ý nghĩa của việc dũng cảm đứng lên bảo vệ người yếu thế và điều đúng đắn.' },
        14: { theme: 'Bảo vệ lẽ phải', title: 'Bài 7: Bảo vệ lẽ phải (Tiết 2)', knowledge: 'Không hùa theo số đông làm điều sai trái; thẳng thắn góp ý chân tình giúp bạn sửa sai.' },
        15: { theme: 'An toàn giao thông', title: 'Bài 8: Chấp hành trật tự, an toàn giao thông (Tiết 1)', knowledge: 'Nắm vững Luật Giao thông đường bộ: chấp hành tín hiệu đèn, đi đúng làn đường, quy tắc sang đường.' },
        16: { theme: 'An toàn giao thông', title: 'Bài 8: Chấp hành trật tự, an toàn giao thông (Tiết 2)', knowledge: 'Tuyên truyền văn hóa giao thông an toàn cho gia đình và cộng đồng xung quanh.' },
        17: { theme: 'Ôn tập HKI', title: 'Bài 9: Ôn tập chuẩn mực đạo đức Học kì I Lớp 5', knowledge: 'Hệ thống hóa toàn bộ kiến thức đạo đức từ tuần 1 đến tuần 16.' },
        18: { theme: 'Đánh giá HKI', title: 'Bài 10: Đánh giá định kì Học kì I môn Đạo đức Lớp 5', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất đạo đức học sinh học kì I.' },
        19: { theme: 'Lối sống văn minh', title: 'Bài 11: Xây dựng nếp sống văn minh đô thị và nông thôn (Tiết 1)', knowledge: 'Quy tắc ứng xử văn minh nơi công cộng, giữ gìn cảnh quan sạch đẹp, không lấn chiếm lòng lề đường.' },
        20: { theme: 'Lối sống văn minh', title: 'Bài 11: Xây dựng nếp sống văn minh đô thị và nông thôn (Tiết 2)', knowledge: 'Xây dựng gia đình văn hóa, tình làng nghĩa xóm tối lửa tắt đèn có nhau.' },
        21: { theme: 'Tình bạn quốc tế', title: 'Bài 12: Hợp tác và hữu nghị với bạn bè quốc tế (Tiết 1)', knowledge: 'Truyền thống hòa hiếu, yêu chuộng hòa bình của dân tộc; tình đoàn kết thiếu nhi năm châu.' },
        22: { theme: 'Tình bạn quốc tế', title: 'Bài 12: Hợp tác và hữu nghị với bạn bè quốc tế (Tiết 2)', knowledge: 'Giao lưu văn hóa, học hỏi những nét đẹp tiến bộ của bạn bè quốc tế.' },
        23: { theme: 'Trách nhiệm bản thân', title: 'Bài 13: Tự chịu trách nhiệm về hành vi của mình (Tiết 1)', knowledge: 'Hiểu mỗi người phải chịu trách nhiệm về lời nói và việc làm của bản thân; không đổ lỗi cho người khác.' },
        24: { theme: 'Trách nhiệm bản thân', title: 'Bài 13: Tự chịu trách nhiệm về hành vi của mình (Tiết 2)', knowledge: 'Dũng cảm nhận trách nhiệm và tích cực sửa chữa khuyết điểm khi mắc lỗi.' },
        25: { theme: 'Bảo tồn di sản', title: 'Bài 14: Giữ gìn và phát huy di sản văn hóa dân tộc (Tiết 1)', knowledge: 'Giá trị vô giá của các di sản văn hóa vật thể và phi vật thể của đất nước.' },
        26: { theme: 'Bảo tồn di sản', title: 'Bài 14: Giữ gìn và phát huy di sản văn hóa dân tộc (Tiết 2)', knowledge: 'Ý thức giữ gìn di tích lịch sử, không xả rác hay làm hư hại khi tham quan danh lam thắng cảnh.' },
        27: { theme: 'Bình đẳng giới', title: 'Bài 15: Tôn trọng quyền bình đẳng giới (Tiết 1)', knowledge: 'Nam và nữ đều có quyền bình đẳng trong học tập, công việc và phát triển năng khiếu.' },
        28: { theme: 'Bình đẳng giới', title: 'Bài 15: Tôn trọng quyền bình đẳng giới (Tiết 2)', knowledge: 'Xóa bỏ định kiến giới tính, tôn trọng và hỗ trợ lẫn nhau trong tập thể.' },
        29: { theme: 'Lòng nhân ái', title: 'Bài 16: Nuôi dưỡng lòng nhân ái và bao dung (Tiết 1)', knowledge: 'Hiểu sức mạnh của lòng vị tha và tình thương yêu con người; sống hòa hợp, vị tha.' },
        30: { theme: 'Lòng nhân ái', title: 'Bài 16: Nuôi dưỡng lòng nhân ái và bao dung (Tiết 2)', knowledge: 'Biết tha thứ cho lỗi lầm của người khác và chủ động gắn kết tình bạn bè.' },
        31: { theme: 'Hành trang chuyển cấp', title: 'Bài 17: Tự tin bước vào ngưỡng cửa Trung học cơ sở (Tiết 1)', knowledge: 'Chuẩn bị tâm lý vững vàng, phẩm chất tự chủ, kĩ năng tự học và thích ứng môi trường mới.' },
        32: { theme: 'Hành trang chuyển cấp', title: 'Bài 17: Tự tin bước vào ngưỡng cửa Trung học cơ sở (Tiết 2)', knowledge: 'Lập kế hoạch rèn luyện bản thân trong giai đoạn chuyển cấp lên lớp 6.' },
        33: { theme: 'Ôn tập cuối năm', title: 'Bài 18: Ôn tập tổng kết môn Đạo đức Lớp 5 (Phần 1)', knowledge: 'Hệ thống hóa các chuẩn mực về Người có công, Truyền thống, Vượt khó, Bảo vệ lẽ phải.' },
        34: { theme: 'Ôn tập cuối năm', title: 'Bài 19: Ôn tập tổng kết toàn cấp Tiểu học môn Đạo đức', knowledge: 'Hệ thống hóa các phẩm chất Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm.' },
        35: { theme: 'Đánh giá cuối năm', title: 'Bài 20: Đánh giá cuối năm học môn Đạo đức Lớp 5', knowledge: 'Đánh giá chuẩn năng lực và phẩm chất môn Đạo đức Lớp 5 theo CTGDPT 2018.' }
      };
      if (g5Titles[week]) {
        title = g5Titles[week].title;
        theme = g5Titles[week].theme;
        knowledge = g5Titles[week].knowledge;
      }
    }

    const periods: CurriculumPeriod[] = [
      {
        periodNumber: 1,
        periodLabel: 'Tiết 1 (35 phút)',
        lessonPart: `${title}: Khám phá - Luyện tập - Vận dụng`,
        scope: `${title}`,
        keyFocus: `Trọng tâm: ${knowledge}`,
        pageRange: `SGK Đạo đức ${gradeNum} KNTT, tr.${week * 2}`,
        suggestedActivity: `${method}. Đóng vai xử lý tình huống và thảo luận nhóm.`
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
      sections: ['dd_kham_pha', 'dd_luyen_tap', 'dd_van_dung'],
      periods,
      keyKnowledge: knowledge,
      textbookPageRange: `SGK Đạo đức Lớp ${gradeNum} - Kết nối tri thức với cuộc sống`,
      suggestedGame: game,
      suggestedMethod: method,
      suggestedScenario: scenario
    };
  });
}
