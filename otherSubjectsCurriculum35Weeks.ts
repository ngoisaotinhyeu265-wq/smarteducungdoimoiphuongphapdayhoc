// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH CHI TIẾT 35 TUẦN CHO CÁC MÔN TIỂU HỌC KHÁC
// (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG / BỘ GIÁO DỤC VÀ ĐÀO TẠO)
// Tự nhiên và Xã hội (Lớp 1-3), Khoa học (Lớp 4-5), Lịch sử & Địa lí (Lớp 4-5), Đạo đức, HĐTN
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';
import { getScience35Weeks } from './scienceCurriculum35Weeks';
import { getHistoryGeography35Weeks } from './historyGeographyCurriculum35Weeks';
import { getEthics35Weeks } from './ethicsCurriculum35Weeks';
import { getInformatics35Weeks } from './informaticsTechnologyCurriculum35Weeks';
import { getExperience35Weeks } from './experienceCurriculum35Weeks';

// -------------------------------------------------------------------------
// TỰ NHIÊN VÀ XÃ HỘI (LỚP 1, 2, 3) - KNTT
// -------------------------------------------------------------------------
export const TNXH_GRADE_1_TITLES: Record<number, { title: string; theme: string; knowledge: string }> = {
  1: { theme: 'Gia đình', title: 'Bài 1: Kể về gia đình em (Tiết 1 & 2)', knowledge: 'Nhận biết các thành viên trong gia đình và tình cảm yêu thương giữa các thành viên.' },
  2: { theme: 'Gia đình', title: 'Bài 2: Ngôi nhà của em (Tiết 1 & 2)', knowledge: 'Các phòng chức năng trong ngôi nhà và đồ dùng quen thuộc.' },
  3: { theme: 'Gia đình', title: 'Bài 3: Giữ gìn nhà ở gọn gàng, sạch sẽ (Tiết 1 & 2)', knowledge: 'Biết làm những việc vừa sức để nhà ở luôn ngăn nắp, sạch đẹp.' },
  4: { theme: 'Gia đình', title: 'Bài 4: An toàn khi ở nhà (Tiết 1 & 2)', knowledge: 'Phòng tránh một số đồ vật nguy hiểm như dao kéo, ổ cắm điện, nước sôi.' },
  5: { theme: 'Gia đình', title: 'Bài 5: Ôn tập chủ đề Gia đình (Tiết 1 & 2)', knowledge: 'Tổng kết kiến thức về gia đình, thói quen sinh hoạt và an toàn tại nhà.' },
  6: { theme: 'Trường học', title: 'Bài 6: Lớp học của em (Tiết 1 & 2)', knowledge: 'Tên trường, lớp, thầy cô và các bạn trong lớp.' },
  7: { theme: 'Trường học', title: 'Bài 7: Các hoạt động ở lớp học (Tiết 1 & 2)', knowledge: 'Các hoạt động học tập, vui chơi đoàn kết cùng bạn bè.' },
  8: { theme: 'Trường học', title: 'Bài 8: Cùng giữ trường lớp sạch đẹp (Tiết 1 & 2)', knowledge: 'Ý thức giữ gìn vệ sinh lớp học và khuôn viên sân trường.' },
  9: { theme: 'Trường học', title: 'Bài 9: An toàn khi ở trường (Tiết 1 & 2)', knowledge: 'Những trò chơi an toàn và phòng tránh tai nạn thương tích tại trường.' },
  10: { theme: 'Trường học', title: 'Bài 10: Ôn tập chủ đề Trường học (Tiết 1 & 2)', knowledge: 'Củng cố kiến thức và hành vi văn minh, an toàn trong trường học.' },
  11: { theme: 'Cộng đồng địa phương', title: 'Bài 11: Nơi em sinh sống (Tiết 1 & 2)', knowledge: 'Cảnh quan xung quanh nhà ở và các địa điểm công cộng quen thuộc.' },
  12: { theme: 'Cộng đồng địa phương', title: 'Bài 12: Hoạt động mua bán hàng hóa (Tiết 1 & 2)', knowledge: 'Các chợ, cửa hàng, siêu thị và cách mua bán đồ dùng thiết yếu.' },
  13: { theme: 'Cộng đồng địa phương', title: 'Bài 13: Giao thông và an toàn giao thông (Tiết 1 & 2)', knowledge: 'Các phương tiện giao thông và quy tắc đi bộ an toàn trên đường.' },
  14: { theme: 'Cộng đồng địa phương', title: 'Bài 14: Ôn tập chủ đề Cộng đồng địa phương (Tiết 1 & 2)', knowledge: 'Hành vi đẹp và tuân thủ an toàn giao thông tại địa phương.' },
  15: { theme: 'Thực vật và Động vật', title: 'Bài 15: Cây xanh xung quanh em (Tiết 1 & 2)', knowledge: 'Các bộ phận chính của cây: rễ, thân, lá, hoa, quả.' },
  16: { theme: 'Thực vật và Động vật', title: 'Bài 16: Một số con vật quen thuộc (Tiết 1 & 2)', knowledge: 'Tên gọi, đặc điểm bên ngoài của chó, mèo, gà, lợn, cá.' },
  17: { theme: 'Thực vật và Động vật', title: 'Bài 17: Chăm sóc và bảo vệ vật nuôi, cây trồng (Tiết 1 & 2)', knowledge: 'Ý thức tưới cây, cho thú cưng ăn và đối xử nhân hậu với loài vật.' },
  18: { theme: 'Đánh giá HKI', title: 'Bài 18: Ôn tập và Đánh giá Học kì I', knowledge: 'Hệ thống hóa kiến thức các chủ đề Gia đình, Trường học, Địa phương, Tự nhiên.' },
  19: { theme: 'Thực vật và Động vật', title: 'Bài 19: Ôn tập chủ đề Thực vật và Động vật (Tiết 1 & 2)', knowledge: 'Phân loại cây cối và loài vật theo môi trường sống.' },
  20: { theme: 'Con người và Sức khỏe', title: 'Bài 20: Các giác quan của cơ thể (Tiết 1 & 2)', knowledge: 'Mắt, mũi, tai, lưỡi, da và vai trò nhận biết thế giới xung quanh.' },
  21: { theme: 'Con người và Sức khỏe', title: 'Bài 21: Chăm sóc và bảo vệ các giác quan (Tiết 1 & 2)', knowledge: 'Vệ sinh mắt, tai, mũi, họng đúng cách hàng ngày.' },
  22: { theme: 'Con người và Sức khỏe', title: 'Bài 22: Cơ thể em lớn lên mỗi ngày (Tiết 1 & 2)', knowledge: 'Sự thay đổi chiều cao, cân nặng và tầm quan trọng của dinh dưỡng.' },
  23: { theme: 'Con người và Sức khỏe', title: 'Bài 23: Ăn uống đủ chất và an toàn (Tiết 1 & 2)', knowledge: 'Các nhóm thực phẩm có lợi cho sức khỏe và thói quen ăn uống lành mạnh.' },
  24: { theme: 'Con người và Sức khỏe', title: 'Bài 24: Vận động và nghỉ ngơi hợp lý (Tiết 1 & 2)', knowledge: 'Tập thể dục, ngủ đúng giờ để cơ thể phát triển khỏe mạnh.' },
  25: { theme: 'Con người và Sức khỏe', title: 'Bài 25: Phòng tránh bệnh theo mùa (Tiết 1 & 2)', knowledge: 'Nhận biết dấu hiệu cảm cúm, sốt xuất huyết và cách giữ ấm, bảo vệ cơ thể.' },
  26: { theme: 'Con người và Sức khỏe', title: 'Bài 26: Ôn tập chủ đề Con người và Sức khỏe (Tiết 1 & 2)', knowledge: 'Thực hành kỹ năng chăm sóc bản thân, phòng tránh bệnh tật.' },
  27: { theme: 'Trái Đất và Bầu trời', title: 'Bài 27: Thời tiết hôm nay thế nào? (Tiết 1 & 2)', knowledge: 'Các hiện tượng thời tiết: nắng, mưa, gió, mây, nóng, lạnh.' },
  28: { theme: 'Trái Đất và Bầu trời', title: 'Bài 28: Giữ ấm khi trời rét, che chắn khi trời nắng (Tiết 1 & 2)', knowledge: 'Lựa chọn trang phục phù hợp với từng kiểu thời tiết.' },
  29: { theme: 'Trái Đất và Bầu trời', title: 'Bài 29: Mặt Trời và phương hướng (Tiết 1 & 2)', knowledge: 'Mặt Trời mọc ở hướng Đông, lặn ở hướng Tây và vai trò chiếu sáng, sưởi ấm.' },
  30: { theme: 'Trái Đất và Bầu trời', title: 'Bài 30: Bầu trời ban ngày và ban đêm (Tiết 1 & 2)', knowledge: 'Quan sát các vì sao, Mặt Trăng ban đêm và Mặt Trời ban ngày.' },
  31: { theme: 'Trái Đất và Bầu trời', title: 'Bài 31: Ôn tập chủ đề Trái Đất và Bầu trời (Tiết 1 & 2)', knowledge: 'Tổng hợp kiến thức thời tiết và hiện tượng thiên nhiên quen thuộc.' },
  32: { theme: 'Tổng ôn tập', title: 'Bài 32: Dự án Học tập Tự nhiên và Xã hội em yêu', knowledge: 'Trưng bày tranh vẽ, mô hình sáng tạo và thuyết trình nhóm.' },
  33: { theme: 'Tổng ôn tập', title: 'Bài 33: Ôn tập kiến thức cuối năm (Phần 1: Con người & Xã hội)', knowledge: 'Củng cố kỹ năng sống an toàn, giao tiếp và hành vi văn minh.' },
  34: { theme: 'Tổng ôn tập', title: 'Bài 34: Ôn tập kiến thức cuối năm (Phần 2: Tự nhiên quanh ta)', knowledge: 'Củng cố kiến thức giới sinh vật, thời tiết và môi trường sống.' },
  35: { theme: 'Đánh giá HKII', title: 'Bài 35: Đánh giá Cuối năm học môn Tự nhiên và Xã hội Lớp 1', knowledge: 'Đánh giá tổng kết năng lực khoa học và phẩm chất học sinh lớp 1.' }
};

export const TNXH_GRADE_2_TITLES: Record<number, { title: string; theme: string; knowledge: string }> = {
  1: { theme: 'Gia đình', title: 'Bài 1: Các thế hệ trong gia đình (Tiết 1 & 2)', knowledge: 'Gia đình hai thế hệ, ba thế hệ và sự gắn kết yêu thương.' },
  2: { theme: 'Gia đình', title: 'Bài 2: Nghề nghiệp của người lớn trong gia đình (Tiết 1 & 2)', knowledge: 'Công việc, nghề nghiệp và ý nghĩa của lao động.' },
  3: { theme: 'Gia đình', title: 'Bài 3: Phòng tránh ngộ độc khi ở nhà (Tiết 1 & 2)', knowledge: 'Nhận biết thuốc men, hóa chất tẩy rửa nguy hiểm và cách phòng tránh.' },
  4: { theme: 'Gia đình', title: 'Bài 4: Vệ sinh nhà ở và đồ dùng sinh hoạt (Tiết 1 & 2)', knowledge: 'Quy trình lau dọn phòng ngủ, nhà bếp, nhà vệ sinh sạch sẽ.' },
  5: { theme: 'Gia đình', title: 'Bài 5: Ôn tập chủ đề Gia đình (Tiết 1 & 2)', knowledge: 'Tổng kết kỹ năng chăm sóc và bảo vệ tổ ấm gia đình.' },
  6: { theme: 'Trường học', title: 'Bài 6: Các phòng chức năng và hoạt động ở trường (Tiết 1 & 2)', knowledge: 'Phòng thư viện, tin học, y tế, nhà đa năng và nội quy sử dụng.' },
  7: { theme: 'Trường học', title: 'Bài 7: Sự kiện tiêu biểu của trường em (Tiết 1 & 2)', knowledge: 'Lễ khai giảng, ngày Nhà giáo Việt Nam 20-11, Hội khỏe Phù Đổng.' },
  8: { theme: 'Trường học', title: 'Bài 8: Giữ vệ sinh trường học và phân loại rác (Tiết 1 & 2)', knowledge: 'Cách phân loại rác hữu cơ, vô cơ và tái chế trong trường học.' },
  9: { theme: 'Trường học', title: 'Bài 9: Phòng tránh đuối nước và tai nạn ở trường (Tiết 1 & 2)', knowledge: 'Quy tắc an toàn khi chơi đùa và kỹ năng phòng chống tai nạn.' },
  10: { theme: 'Trường học', title: 'Bài 10: Ôn tập chủ đề Trường học (Tiết 1 & 2)', knowledge: 'Hành vi văn minh trong trường học và tham gia sự kiện văn thể mỹ.' },
  11: { theme: 'Cộng đồng', title: 'Bài 11: Hoạt động sản xuất nông nghiệp (Tiết 1 & 2)', knowledge: 'Trồng trọt, chăn nuôi và giá trị của sản phẩm nông nghiệp.' },
  12: { theme: 'Cộng đồng', title: 'Bài 12: Hoạt động sản xuất công nghiệp và thủ công (Tiết 1 & 2)', knowledge: 'Nhà máy, xí nghiệp, làng nghề truyền thống quê hương.' },
  13: { theme: 'Cộng đồng', title: 'Bài 13: Hoạt động giao thông đường bộ, đường thủy, đường sắt, đường hàng không', knowledge: 'Biển báo giao thông cơ bản và văn hóa khi đi phương tiện công cộng.' },
  14: { theme: 'Cộng đồng', title: 'Bài 14: Ôn tập chủ đề Cộng đồng địa phương (Tiết 1 & 2)', knowledge: 'Tự hào về quê hương và ý thức chấp hành luật lệ giao thông.' },
  15: { theme: 'Thực vật & Động vật', title: 'Bài 15: Thực vật sống ở đâu? (Tiết 1 & 2)', knowledge: 'Cây sống trên cạn, dưới nước, bám trên cây khác.' },
  16: { theme: 'Thực vật & Động vật', title: 'Bài 16: Động vật sống ở đâu? (Tiết 1 & 2)', knowledge: 'Động vật sống trên cạn, dưới nước, trên không trung.' },
  17: { theme: 'Thực vật & Động vật', title: 'Bài 17: Bảo vệ môi trường sống của thực vật và động vật', knowledge: 'Không chặt phá rừng, không xả rác xuống ao hồ sông suối.' },
  18: { theme: 'Đánh giá HKI', title: 'Bài 18: Ôn tập và Kiểm tra Đánh giá Học kì I', knowledge: 'Hệ thống toàn bộ chuẩn kiến thức HKI TNXH Lớp 2.' },
  19: { theme: 'Thực vật & Động vật', title: 'Bài 19: Ôn tập chủ đề Thực vật và Động vật (Tiết 1 & 2)', knowledge: 'Sơ đồ tư duy về môi trường sống của giới sinh vật.' },
  20: { theme: 'Con người & Sức khỏe', title: 'Bài 20: Cơ quan vận động (Tiết 1 & 2)', knowledge: 'Bộ xương và hệ cơ, các khớp xương giúp cơ thể cử động.' },
  21: { theme: 'Con người & Sức khỏe', title: 'Bài 21: Chăm sóc và bảo vệ cơ quan vận động (Tiết 1 & 2)', knowledge: 'Tư thế ngồi học, đứng, đi đúng tránh cong vẹo cột sống.' },
  22: { theme: 'Con người & Sức khỏe', title: 'Bài 22: Cơ quan hô hấp (Tiết 1 & 2)', knowledge: 'Đường đi của không khí: mũi, khí quản, phế quản, hai lá phổi.' },
  23: { theme: 'Con người & Sức khỏe', title: 'Bài 23: Chăm sóc và bảo vệ cơ quan hô hấp (Tiết 1 & 2)', knowledge: 'Đeo khẩu trang, tránh khói bụi, thuốc lá, giữ ấm đường thở.' },
  24: { theme: 'Con người & Sức khỏe', title: 'Bài 24: Cơ quan bài tiết nước tiểu (Tiết 1 & 2)', knowledge: 'Thận, ống dẫn nước tiểu, bóng đái, ống đái và chức năng.' },
  25: { theme: 'Con người & Sức khỏe', title: 'Bài 25: Chăm sóc cơ quan bài tiết nước tiểu (Tiết 1 & 2)', knowledge: 'Uống đủ nước, không nhịn tiểu, vệ sinh cá nhân hàng ngày.' },
  26: { theme: 'Con người & Sức khỏe', title: 'Bài 26: Ôn tập chủ đề Con người và Sức khỏe (Tiết 1 & 2)', knowledge: 'Bảo vệ cơ quan vận động, hô hấp và bài tiết.' },
  27: { theme: 'Trái Đất & Bầu trời', title: 'Bài 27: Các mùa trong năm (Tiết 1 & 2)', knowledge: 'Khí hậu 4 mùa miền Bắc (Xuân - Hạ - Thu - Đông) và 2 mùa miền Nam (Mưa - Khô).' },
  28: { theme: 'Trái Đất & Bầu trời', title: 'Bài 28: Một số thiên tai thường gặp (Tiết 1 & 2)', knowledge: 'Bão, lũ lụt, hạn hán, sạt lở đất và thiệt hại do thiên tai.' },
  29: { theme: 'Trái Đất & Bầu trời', title: 'Bài 29: Phòng chống và ứng phó với thiên tai (Tiết 1 & 2)', knowledge: 'Kỹ năng tìm nơi trú ẩn an toàn khi có bão dông, lũ lụt.' },
  30: { theme: 'Trái Đất & Bầu trời', title: 'Bài 30: Các đới khí hậu và cảnh quan trên Trái Đất (Tiết 1 & 2)', knowledge: 'Đồi núi, đồng bằng, biển đảo và sông ngòi nước ta.' },
  31: { theme: 'Trái Đất & Bầu trời', title: 'Bài 31: Ôn tập chủ đề Trái Đất và Bầu trời (Tiết 1 & 2)', knowledge: 'Mùa khí hậu, phòng chống thiên tai và địa hình Trái Đất.' },
  32: { theme: 'Dự án', title: 'Bài 32: Dự án Trải nghiệm Khoa học nhí Lớp 2', knowledge: 'Thiết kế mô hình bảo vệ thiên nhiên và ứng phó thiên tai.' },
  33: { theme: 'Tổng ôn tập', title: 'Bài 33: Ôn tập Tổng hợp Cuối năm học (Phần Tự nhiên)', knowledge: 'Thực vật, động vật, cơ thể người và Trái Đất.' },
  34: { theme: 'Tổng ôn tập', title: 'Bài 34: Ôn tập Tổng hợp Cuối năm học (Phần Xã hội)', knowledge: 'Gia đình, trường học, cộng đồng và văn hóa giao thông.' },
  35: { theme: 'Đánh giá HKII', title: 'Bài 35: Đánh giá Cuối năm học môn Tự nhiên và Xã hội Lớp 2', knowledge: 'Đánh giá năng lực tổng hợp chuẩn GDPT 2018.' }
};

export const TNXH_GRADE_3_TITLES: Record<number, { title: string; theme: string; knowledge: string }> = {
  1: { theme: 'Gia đình', title: 'Bài 1: Họ nội, họ ngoại (Tiết 1 & 2)', knowledge: 'Xưng hô đúng và biết yêu quý, kính trọng ông bà, cô dì chú bác họ nội họ ngoại.' },
  2: { theme: 'Gia đình', title: 'Bài 2: Phòng tránh hỏa hoạn khi ở nhà (Tiết 1 & 2)', knowledge: 'Nguyên nhân gây cháy nhà và kỹ năng thoát hiểm khi có đám cháy.' },
  3: { theme: 'Gia đình', title: 'Bài 3: Vệ sinh xung quanh nhà ở (Tiết 1 & 2)', knowledge: 'Phát quang bụi rậm, khơi thông cống rãnh diệt lăng quăng bọ gậy.' },
  4: { theme: 'Gia đình', title: 'Bài 4: Ôn tập chủ đề Gia đình (Tiết 1 & 2)', knowledge: 'Tổng kết mối quan hệ họ hàng và an toàn phòng chống cháy nổ.' },
  5: { theme: 'Trường học', title: 'Bài 5: Hoạt động kết nối trường học với xã hội (Tiết 1 & 2)', knowledge: 'Thăm viện dưỡng lão, trồng cây gây rừng, quyên góp ủng hộ bạn nghèo.' },
  6: { theme: 'Trường học', title: 'Bài 6: Truyền thống nhà trường (Tiết 1 & 2)', knowledge: 'Lịch sử thành lập, thành tích và các tấm gương tiêu biểu của trường.' },
  7: { theme: 'Trường học', title: 'Bài 7: Giữ an toàn và vệ sinh trường học (Tiết 1 & 2)', knowledge: 'Xử lý các tình huống bắt nạt học đường và giữ vệ sinh chung.' },
  8: { theme: 'Trường học', title: 'Bài 8: Ôn tập chủ đề Trường học (Tiết 1 & 2)', knowledge: 'Tự hào truyền thống trường và trách nhiệm của người học sinh.' },
  9: { theme: 'Cộng đồng', title: 'Bài 9: Hoạt động sản xuất ở địa phương (Tiết 1 & 2)', knowledge: 'Đặc trưng kinh tế, cây trồng, vật nuôi hoặc nghề thủ công quê hương.' },
  10: { theme: 'Cộng đồng', title: 'Bài 10: Di tích lịch sử - văn hóa và cảnh quan thiên nhiên (Tiết 1 & 2)', knowledge: 'Giới thiệu danh lam thắng cảnh và ý thức bảo tồn di sản quê hương.' },
  11: { theme: 'Cộng đồng', title: 'Bài 11: Ôn tập chủ đề Cộng đồng địa phương (Tiết 1 & 2)', knowledge: 'Thuyết trình về nét đẹp văn hóa và sản vật quê hương.' },
  12: { theme: 'Thực vật & Động vật', title: 'Bài 12: Các bộ phận của thực vật và chức năng (Tiết 1 & 2)', knowledge: 'Chức năng của rễ cọc, rễ chùm, thân thảo, thân gỗ, lá quang hợp.' },
  13: { theme: 'Thực vật & Động vật', title: 'Bài 13: Con vật và các bộ phận bên ngoài (Tiết 1 & 2)', knowledge: 'Đầu, mình, cơ quan di chuyển (chân, cánh, vây) của các loài thú, chim, cá, côn trùng.' },
  14: { theme: 'Thực vật & Động vật', title: 'Bài 14: Sử dụng hợp lý thực vật và động vật (Tiết 1 & 2)', knowledge: 'Ích lợi của sinh vật đối với con người và chống săn bắt buôn bán trái phép.' },
  15: { theme: 'Thực vật & Động vật', title: 'Bài 15: Ôn tập chủ đề Thực vật và Động vật (Tiết 1 & 2)', knowledge: 'Vẽ sơ đồ phân loại và biện pháp bảo tồn đa dạng sinh học.' },
  16: { theme: 'Con người & Sức khỏe', title: 'Bài 16: Cơ quan tuần hoàn (Tiết 1 & 2)', knowledge: 'Tim, mạch máu và vòng tuần hoàn lớn, vòng tuần hoàn nhỏ.' },
  17: { theme: 'Con người & Sức khỏe', title: 'Bài 17: Chăm sóc và bảo vệ cơ quan tuần hoàn (Tiết 1 & 2)', knowledge: 'Đo nhịp tim, nhịp mạch và chế độ luyện tập thể thao điều độ.' },
  18: { theme: 'Đánh giá HKI', title: 'Bài 18: Ôn tập và Đánh giá Học kì I (TNXH Lớp 3)', knowledge: 'Hệ thống hóa toàn bộ kiến thức nửa đầu năm học.' },
  19: { theme: 'Con người & Sức khỏe', title: 'Bài 19: Cơ quan thần kinh (Tiết 1 & 2)', knowledge: 'Não, tủy sống và các dây thần kinh điều khiển mọi hoạt động.' },
  20: { theme: 'Con người & Sức khỏe', title: 'Bài 20: Chăm sóc và bảo vệ cơ quan thần kinh (Tiết 1 & 2)', knowledge: 'Ngủ đủ giấc, tránh căng thẳng, không sử dụng chất kích thích.' },
  21: { theme: 'Con người & Sức khỏe', title: 'Bài 21: Thức ăn, đồ uống có lợi và có hại cho các cơ quan (Tiết 1 & 2)', knowledge: 'Tác hại của rượu bia, nước ngọt có ga và lợi ích của rau quả tươi.' },
  22: { theme: 'Con người & Sức khỏe', title: 'Bài 22: Ôn tập chủ đề Con người và Sức khỏe (Tiết 1 & 2)', knowledge: 'Sơ đồ cơ quan tuần hoàn, thần kinh và lối sống khỏe mạnh.' },
  23: { theme: 'Trái Đất & Bầu trời', title: 'Bài 23: Trái Đất trong hệ Mặt Trời (Tiết 1 & 2)', knowledge: 'Hình dạng Trái Đất, 8 hành tinh trong hệ Mặt Trời và vị trí thứ ba của Trái Đất.' },
  24: { theme: 'Trái Đất & Bầu trời', title: 'Bài 24: Chuyển động tự quay quanh trục của Trái Đất (Tiết 1 & 2)', knowledge: 'Giải thích hiện tượng ngày và đêm luân phiên nhau.' },
  25: { theme: 'Trái Đất & Bầu trời', title: 'Bài 25: Chuyển động của Trái Đất quanh Mặt Trời (Tiết 1 & 2)', knowledge: 'Giải thích hiện tượng các mùa trong năm và độ dài ngày đêm.' },
  26: { theme: 'Trái Đất & Bầu trời', title: 'Bài 26: Bề mặt Trái Đất và các lục địa, đại dương (Tiết 1 & 2)', knowledge: '6 châu lục (lục địa) và 4 đại dương lớn trên Trái Đất.' },
  27: { theme: 'Trái Đất & Bầu trời', title: 'Bài 27: Đất, nước và không khí xung quanh chúng ta (Tiết 1 & 2)', knowledge: 'Đặc điểm của tầng đất trồng, nguồn nước ngọt và bầu khí quyển.' },
  28: { theme: 'Trái Đất & Bầu trời', title: 'Bài 28: Ô nhiễm môi trường và biện pháp bảo vệ (Tiết 1 & 2)', knowledge: 'Nguyên nhân ô nhiễm nguồn nước, không khí và hành động bảo vệ màu xanh.' },
  29: { theme: 'Trái Đất & Bầu trời', title: 'Bài 29: Mặt Trăng và các pha của Mặt Trăng (Tiết 1 & 2)', knowledge: 'Trăng tròn, trăng khuyết, trăng lưỡi liềm và chu kỳ âm lịch.' },
  30: { theme: 'Trái Đất & Bầu trời', title: 'Bài 30: Ôn tập chủ đề Trái Đất và Bầu trời (Tiết 1 & 2)', knowledge: 'Hệ thống hóa chuyển động vũ trụ và môi trường Trái Đất.' },
  31: { theme: 'Dự án STEM', title: 'Bài 31: Dự án STEM: Chế tạo Quả Địa Cầu mini và Ngày Đêm', knowledge: 'Thực hành làm mô hình quả địa cầu và đèn pin biểu diễn ngày đêm.' },
  32: { theme: 'Tổng ôn tập', title: 'Bài 32: Ôn tập Tổng kết Kiến thức Tự nhiên Lớp 3', knowledge: 'Cơ thể người, thực vật, động vật và vũ trụ học.' },
  33: { theme: 'Tổng ôn tập', title: 'Bài 33: Ôn tập Tổng kết Kiến thức Xã hội Lớp 3', knowledge: 'Gia đình, trường học, quê hương và bảo vệ môi trường sống.' },
  34: { theme: 'Tổng ôn tập', title: 'Bài 34: Rèn luyện kỹ năng giải quyết tình huống khoa học', knowledge: 'Xử lý các câu hỏi thực tiễn và bài tập đánh giá năng lực.' },
  35: { theme: 'Đánh giá HKII', title: 'Bài 35: Đánh giá Cuối năm học môn Tự nhiên và Xã hội Lớp 3', knowledge: 'Đánh giá chính thức kết quả học tập năm học Lớp 3.' }
};

export function getGeneralSubject35Weeks(subject: string, grade: string | number): SubjectCurriculumWeekDetailed[] {
  const gradeStr = String(grade || 'Lớp 1');

  // Khoa học (Lớp 4, 5)
  if (subject === 'Khoa học') {
    return getScience35Weeks(gradeStr);
  }

  // Lịch sử và Địa lí (Lớp 4, 5)
  if (subject === 'Lịch sử và Địa lí' || subject === 'Lịch sử & Địa lí') {
    return getHistoryGeography35Weeks(gradeStr);
  }

  // Đạo đức (Lớp 1 - 5)
  if (subject === 'Đạo đức') {
    return getEthics35Weeks(gradeStr);
  }

  // Tin học (Lớp 3 - 5)
  if (subject === 'Tin học' || subject === 'Tin học và Công nghệ') {
    return getInformatics35Weeks(gradeStr);
  }

  // Hoạt động trải nghiệm (Lớp 1 - 5)
  if (subject === 'Hoạt động trải nghiệm') {
    return getExperience35Weeks(gradeStr);
  }

  let periodCount = 2;
  if (subject === 'Âm nhạc' || subject === 'Mĩ thuật' || subject === 'Giáo dục thể chất') periodCount = 1;

  // Check TNXH Grade 1-3
  if (subject === 'Tự nhiên và Xã hội') {
    let map = TNXH_GRADE_1_TITLES;
    if (gradeStr.includes('2')) map = TNXH_GRADE_2_TITLES;
    else if (gradeStr.includes('3')) map = TNXH_GRADE_3_TITLES;

    return Array.from({ length: 35 }, (_, idx) => {
      const week = idx + 1;
      const item = map[week] || map[1];
      const semester: 1 | 2 = week <= 18 ? 1 : 2;

      const periods: CurriculumPeriod[] = Array.from({ length: periodCount }, (_, pIdx) => ({
        periodNumber: pIdx + 1,
        periodLabel: `Tiết ${pIdx + 1} (35 phút)`,
        lessonPart: `Tiết ${pIdx + 1}: Khám phá kiến thức & Luyện tập`,
        scope: `${item.title} - Phần ${pIdx + 1}`,
        keyFocus: `${item.knowledge}`,
        pageRange: `SGK TNXH ${gradeStr.replace('Lớp ', '')}, tr.${week * 2 + pIdx}`,
        suggestedActivity: 'Quan sát tranh thực tế, thảo luận nhóm 4, trò chơi đóng vai xử lý tình huống cuộc sống.'
      }));

      return {
        week,
        weekLabel: `Tuần ${week}`,
        semester,
        theme: item.theme,
        lessonTitle: item.title,
        allLessonsInWeek: [item.title],
        periodCount,
        sections: ['kham_pha', 'thuc_hanh', 'van_dung'],
        periods,
        keyKnowledge: item.knowledge,
        textbookPageRange: `SGK Tự nhiên và Xã hội ${gradeStr} - KNTT`,
        suggestedGame: {
          name: 'Hành Trình Khám Phá Tri Thức Tự Nhiên',
          goal: 'Giúp học sinh khắc sâu kiến thức thông qua đố vui tương tác và tình huống thực tiễn.',
          materials: 'Thẻ bài tình huống, bảng nhóm.',
          rules: 'Các nhóm bốc thăm tình huống thực tế và đưa ra cách ứng xử chuẩn mực trong 3 phút.'
        },
        suggestedMethod: 'Phương pháp trực quan, Phương pháp bàn tay nặn bột, Dạy học giải quyết vấn đề.',
        suggestedScenario: 'Gắn liền với không gian sống tại gia đình, trường học và địa phương của học sinh.'
      };
    });
  }

  // Fallback for Khoa học / Lịch sử Địa lí / Đạo đức / HĐTN
  return Array.from({ length: 35 }, (_, idx) => {
    const week = idx + 1;
    const semester: 1 | 2 = week <= 18 ? 1 : 2;
    const weekTitle = `Tuần ${week}: Bài học môn ${subject} ${gradeStr}`;

    const periods: CurriculumPeriod[] = Array.from({ length: periodCount }, (_, pIdx) => ({
      periodNumber: pIdx + 1,
      periodLabel: `Tiết ${pIdx + 1} (35 phút)`,
      lessonPart: `Tiết ${pIdx + 1}: Hình thành kiến thức & Thực hành`,
      scope: `Hoạt động học tập tuần ${week}`,
      keyFocus: `Trọng tâm kiến thức môn ${subject} ${gradeStr} - Tuần ${week} Tiết ${pIdx + 1}`,
      pageRange: `SGK ${subject} ${gradeStr.replace('Lớp ', '')}, tr.${week * 2 + pIdx}`,
      suggestedActivity: 'Khám phá học liệu trực quan, thực hành cá nhân và nhóm, vận dụng liên hệ thực tế.'
    }));

    return {
      week,
      weekLabel: `Tuần ${week}`,
      semester,
      theme: `Chủ đề ${Math.ceil(week / 5)}: Môn ${subject}`,
      lessonTitle: `${weekTitle} (Phân phối chuẩn KNTT/BGD)`,
      allLessonsInWeek: [weekTitle],
      periodCount,
      sections: ['kham_pha', 'thuc_hanh', 'van_dung'],
      periods,
      keyKnowledge: `Nắm vững toàn bộ kiến thức trọng tâm môn ${subject} ${grade} theo phân phối 35 tuần chuẩn CTGDPT 2018 (Kết nối tri thức với cuộc sống).`,
      textbookPageRange: `SGK ${subject} ${grade}`,
      suggestedGame: {
        name: 'Rung Chuông Vàng Khám Phá',
        goal: 'Củng cố kiến thức và khơi gợi tư duy phản biện.',
        materials: 'Bảng con, chuông bấm, câu hỏi trắc nghiệm.',
        rules: 'Học sinh ghi đáp án đúng trên bảng con theo từng câu hỏi tăng dần độ khó.'
      },
      suggestedMethod: 'Dạy học tích cực, mô hình 5E, thảo luận nhóm và trải nghiệm thực hành.',
      suggestedScenario: 'Vận dụng kiến thức bài học để giải quyết các tình huống học tập và đời sống.'
    };
  });
}
