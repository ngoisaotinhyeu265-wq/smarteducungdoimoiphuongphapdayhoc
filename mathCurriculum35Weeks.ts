// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH TOÁN 35 TUẦN - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// TỪNG TUẦN CÓ TÊN BÀI, CHỦ ĐỀ, MỤC TIÊU VÀ TIẾT DẠY RIÊNG BIỆT (LỚP 1 -> 5)
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface WeekTopicItem {
  title: string;
  theme: string;
  focus: string;
  periods: string[];
}

// -------------------------------------------------------------------------
// TOÁN LỚP 1 (35 TUẦN CHUẨN KNTT)
// -------------------------------------------------------------------------
export const MATH_GRADE_1: Record<number, WeekTopicItem> = {
  1: {
    title: 'Bài 1: Các số 0, 1, 2, 3, 4, 5',
    theme: 'Làm quen với số',
    focus: 'Đếm, nhận biết, đọc, viết các số từ 0 đến 5; so sánh các số trong phạm vi 5.',
    periods: ['Tiết 1: Đếm và nhận biết số 1, 2, 3', 'Tiết 2: Đếm và nhận biết số 4, 5', 'Tiết 3: Số 0 và dãy số từ 0 đến 5', 'Tiết 4: So sánh các số trong phạm vi 5', 'Tiết 5: Luyện tập chung & Thực hành']
  },
  2: {
    title: 'Bài 2: Các hình phẳng: Hình vuông, tròn, tam giác, chữ nhật',
    theme: 'Hình học trực quan',
    focus: 'Nhận diện hình vuông, hình tròn, hình tam giác, hình chữ nhật qua đồ vật thật.',
    periods: ['Tiết 1: Nhận biết hình vuông, hình tròn', 'Tiết 2: Nhận biết hình tam giác, chữ nhật', 'Tiết 3: Ghép hình sáng tạo', 'Tiết 4: Tìm hình trong đời sống', 'Tiết 5: Trò chơi xếp hình toán học']
  },
  3: {
    title: 'Bài 3: Các số 6, 7, 8, 9, 10',
    theme: 'Số trong phạm vi 10',
    focus: 'Đọc, viết, đếm các số từ 6 đến 10; cấu tạo số 10.',
    periods: ['Tiết 1: Nhận biết số 6, 7, 8', 'Tiết 2: Nhận biết số 9, 10', 'Tiết 3: Tách - gộp số trong phạm vi 10', 'Tiết 4: So sánh các số trong phạm vi 10', 'Tiết 5: Luyện tập chung']
  },
  4: {
    title: 'Bài 4: Tách - gộp số và So sánh trong phạm vi 10 (Dấu >, <, =)',
    theme: 'Tách gộp số & So sánh',
    focus: 'Nắm chắc cấu tạo số và dấu so sánh lớn hơn, bé hơn, bằng nhau.',
    periods: ['Tiết 1: Tách gộp số 6, 7', 'Tiết 2: Tách gộp số 8, 9, 10', 'Tiết 3: Dấu lớn hơn (>), bé hơn (<)', 'Tiết 4: Dấu bằng (=) và so sánh', 'Tiết 5: Luyện tập so sánh số']
  },
  5: {
    title: 'Bài 5: Vị trí và định hướng trong không gian',
    theme: 'Định hướng không gian',
    focus: 'Nhận biết vị trí trên - dưới, trước - sau, phải - trái, ở giữa.',
    periods: ['Tiết 1: Trên - dưới, trước - sau', 'Tiết 2: Phải - trái, ở giữa', 'Tiết 3: Định hướng vị trí đồ vật', 'Tiết 4: Thực hành không gian lớp học', 'Tiết 5: Trò chơi tìm vị trí']
  },
  6: {
    title: 'Bài 6: Khối lập phương, khối hộp chữ nhật',
    theme: 'Hình khối trực quan',
    focus: 'Nhận biết hình dạng khối lập phương và khối hộp chữ nhật.',
    periods: ['Tiết 1: Nhận biết khối lập phương', 'Tiết 2: Nhận biết khối hộp chữ nhật', 'Tiết 3: Phân biệt hai khối hình', 'Tiết 4: Tìm đồ vật dạng khối', 'Tiết 5: Xếp hình mô hình']
  },
  7: {
    title: 'Bài 7: Phép cộng trong phạm vi 10 (Khái niệm và dấu +)',
    theme: 'Phép tính cộng',
    focus: 'Khái niệm phép cộng, dấu cộng (+), bảng cộng trong phạm vi 6.',
    periods: ['Tiết 1: Khái niệm phép cộng', 'Tiết 2: Phép cộng trong phạm vi 4', 'Tiết 3: Phép cộng trong phạm vi 6', 'Tiết 4: Đặt tính và tính nhẩm', 'Tiết 5: Luyện tập phép cộng']
  },
  8: {
    title: 'Bài 8: Bảng cộng trong phạm vi 10',
    theme: 'Bảng cộng phạm vi 10',
    focus: 'Thành lập bảng cộng trong phạm vi 10, tính nhẩm nhanh.',
    periods: ['Tiết 1: Phép cộng trong phạm vi 8', 'Tiết 2: Phép cộng trong phạm vi 10', 'Tiết 3: Bảng cộng 10 hoàn chỉnh', 'Tiết 4: Giải toán tranh ảnh minh họa', 'Tiết 5: Luyện tập chung']
  },
  9: {
    title: 'Bài 9: Luyện tập chung & Đánh giá Giữa học kì 1',
    theme: 'Ôn tập giữa kì 1',
    focus: 'Củng cố số từ 0 đến 10, hình phẳng và phép cộng.',
    periods: ['Tiết 1: Ôn tập số và hình', 'Tiết 2: Ôn tập phép cộng', 'Tiết 3: Trắc nghiệm củng cố', 'Tiết 4: Thực hành kiểm tra định kì', 'Tiết 5: Chữa bài và động viên']
  },
  10: {
    title: 'Bài 10: Phép trừ trong phạm vi 10 (Khái niệm và dấu -)',
    theme: 'Phép tính trừ',
    focus: 'Khái niệm phép trừ, dấu trừ (-), bảng trừ trong phạm vi 6.',
    periods: ['Tiết 1: Khái niệm phép trừ', 'Tiết 2: Phép trừ trong phạm vi 4', 'Tiết 3: Phép trừ trong phạm vi 6', 'Tiết 4: Tính nhẩm phép trừ', 'Tiết 5: Luyện tập phép trừ']
  },
  11: {
    title: 'Bài 11: Bảng trừ trong phạm vi 10',
    theme: 'Bảng trừ phạm vi 10',
    focus: 'Thành lập bảng trừ trong phạm vi 10, mối quan hệ giữa phép cộng và phép trừ.',
    periods: ['Tiết 1: Phép trừ trong phạm vi 8', 'Tiết 2: Phép trừ trong phạm vi 10', 'Tiết 3: Mối liên hệ cộng và trừ', 'Tiết 4: Bài toán bớt đi', 'Tiết 5: Luyện tập bảng trừ']
  },
  12: {
    title: 'Bài 12: Bảng cộng và bảng trừ trong phạm vi 10',
    theme: 'Cộng trừ phạm vi 10',
    focus: 'Thành thạo cộng trừ nhẩm trong phạm vi 10.',
    periods: ['Tiết 1: Bảng cộng trừ 10', 'Tiết 2: Tính giá trị biểu thức hai dấu tính', 'Tiết 3: Tìm số còn thiếu', 'Tiết 4: Giải bài toán tình huống', 'Tiết 5: Luyện tập nâng cao']
  },
  13: {
    title: 'Bài 13: Luyện tập phép cộng, phép trừ trong phạm vi 10',
    theme: 'Luyện tập tổng hợp',
    focus: 'Rèn kỹ năng tính nhẩm nhanh và giải bài toán bằng hình vẽ.',
    periods: ['Tiết 1: Luyện tính nhẩm nhanh', 'Tiết 2: Bài toán thêm vào, bớt ra', 'Tiết 3: So sánh biểu thức', 'Tiết 4: Trò chơi tiếp sức', 'Tiết 5: Đánh giá quá trình']
  },
  14: {
    title: 'Bài 14: Khối cầu, khối trụ và Thực hành xếp hình',
    theme: 'Hình khối không gian',
    focus: 'Nhận biết khối cầu, khối trụ qua vật thật; xếp mô hình.',
    periods: ['Tiết 1: Nhận biết khối cầu', 'Tiết 2: Nhận biết khối trụ', 'Tiết 3: So sánh khối trụ và cầu', 'Tiết 4: Thực hành xếp hình lâu đài', 'Tiết 5: Trưng bày sản phẩm']
  },
  15: {
    title: 'Bài 15: Vị trí, phương hướng và Sơ đồ đơn giản',
    theme: 'Sơ đồ & Định hướng',
    focus: 'Đọc sơ đồ vị trí đơn giản trong lớp học và ngôi nhà.',
    periods: ['Tiết 1: Đọc sơ đồ lớp học', 'Tiết 2: Xác định đường đi', 'Tiết 3: Vị trí trên sơ đồ', 'Tiết 4: Thực hành tìm đồ vật', 'Tiết 5: Trò chơi kho báu']
  },
  16: {
    title: 'Bài 16: Luyện tập chung: Phép tính và Số học phạm vi 10',
    theme: 'Luyện tập cuối HKI',
    focus: 'Hệ thống hóa toàn bộ kiến thức số học và hình học Học kì 1.',
    periods: ['Tiết 1: Ôn tập dãy số từ 0 đến 10', 'Tiết 2: Ôn tập bảng cộng 10', 'Tiết 3: Ôn tập bảng trừ 10', 'Tiết 4: Ôn tập hình học trực quan', 'Tiết 5: Luyện giải bài toán']
  },
  17: {
    title: 'Bài 17: Ôn tập Học kì 1: Số, Phép tính và Hình học',
    theme: 'Ôn tập cuối kì 1',
    focus: 'Ôn tập toàn diện chuẩn bị kiểm tra đánh giá cuối học kì 1.',
    periods: ['Tiết 1: Ôn tập số học', 'Tiết 2: Ôn tập phép tính', 'Tiết 3: Ôn tập hình khối', 'Tiết 4: Đề luyện tổng hợp 1', 'Tiết 5: Đề luyện tổng hợp 2']
  },
  18: {
    title: 'Bài 18: Đánh giá Cuối học kì 1 môn Toán Lớp 1',
    theme: 'Kiểm tra cuối HKI',
    focus: 'Kiểm tra đánh giá chất lượng học kì 1 và chữa bài.',
    periods: ['Tiết 1: Hướng dẫn làm bài kiểm tra', 'Tiết 2: Kiểm tra định kì HKI', 'Tiết 3: Đánh giá năng lực tư duy', 'Tiết 4: Chữa bài và rút kinh nghiệm', 'Tiết 5: Tuyên dương và khen thưởng']
  },
  19: {
    title: 'Bài 19: Các số từ 11 đến 20 (Chục và đơn vị)',
    theme: 'Số từ 11 đến 20',
    focus: 'Nhận biết hàng chục, hàng đơn vị; đọc viết các số từ 11 đến 20.',
    periods: ['Tiết 1: Đếm và nhận biết 11, 12, 13', 'Tiết 2: Nhận biết 14, 15, 16', 'Tiết 3: Nhận biết 17, 18, 19, 20', 'Tiết 4: Chục và đơn vị', 'Tiết 5: Luyện tập viết số']
  },
  20: {
    title: 'Bài 20: So sánh các số trong phạm vi 20',
    theme: 'So sánh phạm vi 20',
    focus: 'So sánh số có hai chữ số, sắp xếp thứ tự từ bé đến lớn và ngược lại.',
    periods: ['Tiết 1: So sánh hai số', 'Tiết 2: Dãy số từ bé đến lớn', 'Tiết 3: Dãy số từ lớn đến bé', 'Tiết 4: Số liền trước, liền sau', 'Tiết 5: Trò chơi tìm số']
  },
  21: {
    title: 'Bài 21: Phép cộng (không nhớ) trong phạm vi 20',
    theme: 'Phép cộng phạm vi 20',
    focus: 'Thực hiện cộng dạng 10 + 3, 12 + 3, 14 + 5.',
    periods: ['Tiết 1: Dạng 10 cộng với một số', 'Tiết 2: Dạng 12 + 3', 'Tiết 3: Đặt tính rồi tính', 'Tiết 4: Tính nhẩm nhanh', 'Tiết 5: Luyện tập giải toán']
  },
  22: {
    title: 'Bài 22: Phép trừ (không nhớ) trong phạm vi 20',
    theme: 'Phép trừ phạm vi 20',
    focus: 'Thực hiện trừ dạng 13 - 3, 15 - 4, 17 - 5.',
    periods: ['Tiết 1: Dạng 15 trừ đi 5', 'Tiết 2: Dạng 17 - 4', 'Tiết 3: Đặt tính trừ', 'Tiết 4: Luyện tính nhẩm', 'Tiết 5: Luyện tập chung']
  },
  23: {
    title: 'Bài 23: Đo độ dài và Đơn vị xăng-ti-mét (cm)',
    theme: 'Đo lường độ dài',
    focus: 'Làm quen thước đo có vạch chia cm, đọc viết số đo có đơn vị cm.',
    periods: ['Tiết 1: Khái niệm đo độ dài', 'Tiết 2: Đơn vị xăng-ti-mét (cm)', 'Tiết 3: Thực hành dùng thước kẻ', 'Tiết 4: Đo đồ dùng học tập', 'Tiết 5: Ước lượng độ dài']
  },
  24: {
    title: 'Bài 24: Các số tròn chục (10, 20, 30, ... 90)',
    theme: 'Số tròn chục',
    focus: 'Đếm, đọc, viết và so sánh các số tròn chục; cộng trừ số tròn chục.',
    periods: ['Tiết 1: Đọc viết các số tròn chục', 'Tiết 2: So sánh số tròn chục', 'Tiết 3: Phép cộng số tròn chục', 'Tiết 4: Phép trừ số tròn chục', 'Tiết 5: Luyện tập cộng trừ nhẩm']
  },
  25: {
    title: 'Bài 25: Các số có hai chữ số (từ 21 đến 99)',
    theme: 'Số có hai chữ số',
    focus: 'Nhận biết, đọc, viết cấu tạo các số có hai chữ số từ 21 đến 99.',
    periods: ['Tiết 1: Các số từ 21 đến 50', 'Tiết 2: Các số từ 51 đến 70', 'Tiết 3: Các số từ 71 đến 99', 'Tiết 4: Cấu tạo số chục và đơn vị', 'Tiết 5: Luyện tập bảng số']
  },
  26: {
    title: 'Bài 26: So sánh các số có hai chữ số trong phạm vi 100',
    theme: 'So sánh số đến 100',
    focus: 'So sánh chữ số hàng chục trước, nếu bằng nhau so sánh hàng đơn vị.',
    periods: ['Tiết 1: So sánh hàng chục khác nhau', 'Tiết 2: So sánh hàng chục giống nhau', 'Tiết 3: Xếp thứ tự 4 số', 'Tiết 4: Tìm số lớn nhất, bé nhất', 'Tiết 5: Luyện tập so sánh']
  },
  27: {
    title: 'Bài 27: Ôn tập và Đánh giá Giữa học kì 2',
    theme: 'Ôn tập giữa kì 2',
    focus: 'Củng cố số có hai chữ số, đo độ dài cm và cộng trừ số tròn chục.',
    periods: ['Tiết 1: Ôn tập số có hai chữ số', 'Tiết 2: Ôn tập phép tính tròn chục', 'Tiết 3: Ôn tập đo độ dài cm', 'Tiết 4: Kiểm tra định kì giữa kì 2', 'Tiết 5: Chữa bài kiểm tra']
  },
  28: {
    title: 'Bài 28: Bảng các số từ 1 đến 100 và Thứ tự các số',
    theme: 'Bảng 100 số',
    focus: 'Khám phá quy luật bảng số từ 1 đến 100 (hàng ngang, cột dọc).',
    periods: ['Tiết 1: Khám phá bảng số 1-100', 'Tiết 2: Quy luật hàng ngang, cột dọc', 'Tiết 3: Điền số còn thiếu vào ô trống', 'Tiết 4: Số tròn chục và số liền kề', 'Tiết 5: Trò chơi mê cung số']
  },
  29: {
    title: 'Bài 29: Phép cộng số có hai chữ số với số có một chữ số (không nhớ)',
    theme: 'Phép cộng không nhớ',
    focus: 'Kỹ thuật đặt tính và tính cộng dạng 34 + 5, 52 + 6.',
    periods: ['Tiết 1: Đặt tính thẳng cột', 'Tiết 2: Thực hiện phép tính từ phải sang trái', 'Tiết 3: Tính nhẩm dạng 43 + 4', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập cộng']
  },
  30: {
    title: 'Bài 30: Phép cộng số có hai chữ số với số có hai chữ số (không nhớ)',
    theme: 'Cộng hai chữ số',
    focus: 'Kỹ thuật đặt tính cộng dạng 23 + 34, 45 + 52.',
    periods: ['Tiết 1: Khám phá phép cộng 25 + 14', 'Tiết 2: Đặt tính và tính', 'Tiết 3: Luyện tập đặt tính chuẩn', 'Tiết 4: Bài toán thêm vào thực tế', 'Tiết 5: Trò chơi tiếp sức cộng']
  },
  31: {
    title: 'Bài 31: Phép trừ số có hai chữ số (không nhớ)',
    theme: 'Phép trừ không nhớ',
    focus: 'Kỹ thuật đặt tính và tính trừ dạng 57 - 4, 68 - 25.',
    periods: ['Tiết 1: Trừ số có hai chữ số cho một chữ số', 'Tiết 2: Trừ số có hai chữ số cho hai chữ số', 'Tiết 3: Đặt tính và tính', 'Tiết 4: Bài toán bớt đi thực tế', 'Tiết 5: Luyện tập cộng trừ']
  },
  32: {
    title: 'Bài 32: Xem đồng hồ, thời gian và Các ngày trong tuần',
    theme: 'Thời gian & Đồng hồ',
    focus: 'Xem đồng hồ đúng giờ (kim ngắn chỉ số, kim dài chỉ 12); 7 ngày trong tuần.',
    periods: ['Tiết 1: Xem đồng hồ đúng giờ', 'Tiết 2: Thực hành xoay kim đồng hồ', 'Tiết 3: 7 ngày trong tuần', 'Tiết 4: Thời gian biểu của em', 'Tiết 5: Trò chơi một ngày của bé']
  },
  33: {
    title: 'Bài 33: Thực hành và trải nghiệm: Ước lượng, đo đạc và Mua sắm',
    theme: 'Thực hành trải nghiệm',
    focus: 'Ứng dụng đo đạc lớp học, ước lượng chiều dài và làm quen tiền tệ.',
    periods: ['Tiết 1: Đo chiều dài bàn ghế', 'Tiết 2: Ước lượng khoảng cách bước chân', 'Tiết 3: Làm quen tờ tiền 1000đ, 2000đ, 5000đ', 'Tiết 4: Trò chơi đi chợ mini', 'Tiết 5: Báo cáo trải nghiệm']
  },
  34: {
    title: 'Bài 34: Ôn tập cuối năm: Số và phép tính trong phạm vi 100',
    theme: 'Ôn tập cuối năm',
    focus: 'Củng cố toàn bộ kỹ năng cộng trừ trong phạm vi 100.',
    periods: ['Tiết 1: Ôn tập đọc viết số đến 100', 'Tiết 2: Ôn tập phép cộng không nhớ', 'Tiết 3: Ôn tập phép trừ không nhớ', 'Tiết 4: Ôn tập giải toán có lời văn', 'Tiết 5: Luyện đề tổng hợp 1']
  },
  35: {
    title: 'Bài 35: Ôn tập cuối năm: Hình học, đo lường & Đánh giá tổng hợp',
    theme: 'Tổng kết Toán Lớp 1',
    focus: 'Ôn tập hình phẳng, hình khối, cm, đồng hồ và kiểm tra cuối năm.',
    periods: ['Tiết 1: Ôn tập hình học và hình khối', 'Tiết 2: Ôn tập đo độ dài và thời gian', 'Tiết 3: Kiểm tra định kì cuối năm', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Tổng kết năm học']
  }
};

// -------------------------------------------------------------------------
// TOÁN LỚP 2 (35 TUẦN CHUẨN KNTT)
// -------------------------------------------------------------------------
export const MATH_GRADE_2: Record<number, WeekTopicItem> = {
  1: {
    title: 'Bài 1: Ôn tập các số đến 100 & Phép cộng, phép trừ không nhớ',
    theme: 'Ôn tập đầu năm',
    focus: 'Củng cố số có hai chữ số, bảng cộng trừ không nhớ trong phạm vi 100.',
    periods: ['Tiết 1: Ôn tập các số đến 100', 'Tiết 2: Ôn tập phép cộng không nhớ', 'Tiết 3: Ôn tập phép trừ không nhớ', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  2: {
    title: 'Bài 2: Tia số và Số liền trước, số liền sau',
    theme: 'Tia số',
    focus: 'Biểu diễn số trên tia số, tìm số liền trước, số liền sau của một số.',
    periods: ['Tiết 1: Khám phá tia số', 'Tiết 2: Số liền trước, số liền sau', 'Tiết 3: Tìm số trên tia số', 'Tiết 4: So sánh trên tia số', 'Tiết 5: Luyện tập chung']
  },
  3: {
    title: 'Bài 3: Các thành phần của phép cộng, phép trừ',
    theme: 'Thành phần phép tính',
    focus: 'Nhận biết Số hạng - Tổng; Số bị trừ - Số trừ - Hiệu.',
    periods: ['Tiết 1: Số hạng và Tổng', 'Tiết 2: Luyện tập về Tổng', 'Tiết 3: Số bị trừ, Số trừ, Hiệu', 'Tiết 4: Luyện tập về Hiệu', 'Tiết 5: Trò chơi gọi tên thành phần']
  },
  4: {
    title: 'Bài 4: Hơn, kém nhau bao nhiêu & Bài toán nhiều hơn, ít hơn',
    theme: 'Dạng toán nhiều hơn - ít hơn',
    focus: 'Phương pháp giải bài toán về nhiều hơn, bài toán về ít hơn.',
    periods: ['Tiết 1: Khái niệm hơn, kém nhau', 'Tiết 2: Bài toán về nhiều hơn', 'Tiết 3: Bài toán về ít hơn', 'Tiết 4: Luyện tập giải toán', 'Tiết 5: Vận dụng thực tế']
  },
  5: {
    title: 'Bài 5: Bảng cộng (qua 10) trong phạm vi 20 (9, 8 cộng với một số)',
    theme: 'Phép cộng qua 10',
    focus: 'Kỹ thuật tách số để cộng cho tròn 10 rồi cộng với số còn lại.',
    periods: ['Tiết 1: 9 cộng với một số', 'Tiết 2: 8 cộng với một số', 'Tiết 3: Luyện tập cộng qua 10', 'Tiết 4: Tính nhẩm nhanh', 'Tiết 5: Trò chơi tiếp sức']
  },
  6: {
    title: 'Bài 6: Bảng cộng 7, 6 cộng với một số & Đề-xi-mét (dm)',
    theme: 'Cộng qua 10 & Đơn vị dm',
    focus: 'Hoàn thiện bảng cộng qua 10 và làm quen đơn vị đo độ dài đề-xi-mét.',
    periods: ['Tiết 1: 7 cộng với một số', 'Tiết 2: 6 cộng với một số', 'Tiết 3: Đơn vị Đề-xi-mét (dm)', 'Tiết 4: Đổi đơn vị dm ra cm', 'Tiết 5: Thực hành đo đạc']
  },
  7: {
    title: 'Bài 7: Phép cộng (có nhớ) số có hai chữ số với số có một chữ số',
    theme: 'Cộng có nhớ',
    focus: 'Kỹ thuật đặt tính và nhớ 1 sang hàng chục.',
    periods: ['Tiết 1: Khám phá phép tính 37 + 5', 'Tiết 2: Đặt tính và tính', 'Tiết 3: Luyện tính nhẩm', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  8: {
    title: 'Bài 8: Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số',
    theme: 'Cộng hai chữ số có nhớ',
    focus: 'Thành thạo cộng có nhớ dạng 48 + 25, 36 + 27.',
    periods: ['Tiết 1: Khám phá phép tính 38 + 25', 'Tiết 2: Đặt tính và tính', 'Tiết 3: Luyện tập tính toán', 'Tiết 4: Bài toán thêm vào', 'Tiết 5: Trò chơi toán học']
  },
  9: {
    title: 'Bài 9: Luyện tập chung & Đánh giá Giữa học kì 1',
    theme: 'Ôn tập giữa kì 1',
    focus: 'Củng cố phép cộng có nhớ, tia số và đơn vị dm.',
    periods: ['Tiết 1: Ôn tập phép cộng có nhớ', 'Tiết 2: Ôn tập bài toán nhiều hơn ít hơn', 'Tiết 3: Ôn tập đơn vị dm', 'Tiết 4: Kiểm tra định kì giữa kì 1', 'Tiết 5: Chữa bài kiểm tra']
  },
  10: {
    title: 'Bài 10: Bảng trừ (qua 10) trong phạm vi 20 (11, 12 trừ đi một số)',
    theme: 'Phép trừ qua 10',
    focus: 'Kỹ thuật trừ để được 10 rồi trừ số còn lại.',
    periods: ['Tiết 1: 11 trừ đi một số', 'Tiết 2: 12 trừ đi một số', 'Tiết 3: Luyện tập bảng trừ', 'Tiết 4: Tính nhẩm', 'Tiết 5: Trò chơi đố vui']
  },
  11: {
    title: 'Bài 11: Bảng trừ (qua 10) trong phạm vi 20 (13, 14, 15, 16, 17, 18 trừ một số)',
    theme: 'Bảng trừ qua 10',
    focus: 'Hoàn thiện hệ thống bảng trừ trong phạm vi 20.',
    periods: ['Tiết 1: 13, 14 trừ đi một số', 'Tiết 2: 15, 16 trừ đi một số', 'Tiết 3: 17, 18 trừ đi một số', 'Tiết 4: Bảng trừ 20 hoàn chỉnh', 'Tiết 5: Luyện tập chung']
  },
  12: {
    title: 'Bài 12: Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số',
    theme: 'Trừ có nhớ',
    focus: 'Kỹ thuật mượn 1 chục ở hàng chục để trừ hàng đơn vị.',
    periods: ['Tiết 1: Khám phá phép tính 52 - 7', 'Tiết 2: Đặt tính và tính', 'Tiết 3: Luyện tập đặt tính', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  13: {
    title: 'Bài 13: Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số',
    theme: 'Trừ hai chữ số có nhớ',
    focus: 'Thành thạo trừ có nhớ dạng 63 - 28, 70 - 35.',
    periods: ['Tiết 1: Khám phá phép tính 64 - 27', 'Tiết 2: Dạng số tròn chục trừ đi số có hai chữ số', 'Tiết 3: Luyện tập tính toán', 'Tiết 4: Giải bài toán bớt đi', 'Tiết 5: Trò chơi toán học']
  },
  14: {
    title: 'Bài 14: Đo lường: Đơn vị Lít (l) và Thực hành đong đo',
    theme: 'Đơn vị dung tích Lít',
    focus: 'Làm quen đơn vị Lít, thực hành đong rót bằng ca 1 lít.',
    periods: ['Tiết 1: Khái niệm đơn vị Lít (l)', 'Tiết 2: Cộng trừ số đo có đơn vị lít', 'Tiết 3: Thực hành đong nước', 'Tiết 4: Giải bài toán chứa đựng', 'Tiết 5: Luyện tập dung tích']
  },
  15: {
    title: 'Bài 15: Đo lường: Đơn vị Ki-lô-gam (kg) và Cân đĩa, cân đồng hồ',
    theme: 'Đơn vị khối lượng Ki-lô-gam',
    focus: 'Làm quen đơn vị kg, thực hành đọc cân đồng hồ và cân đĩa.',
    periods: ['Tiết 1: Khái niệm Ki-lô-gam (kg)', 'Tiết 2: Tập đọc số cân đồng hồ', 'Tiết 3: Cộng trừ số đo có đơn vị kg', 'Tiết 4: Giải bài toán cân nặng', 'Tiết 5: Thực hành cân đồ vật']
  },
  16: {
    title: 'Bài 16: Điểm, đoạn thẳng, đường cong, đường gấp khúc, ba điểm thẳng hàng',
    theme: 'Hình học phẳng',
    focus: 'Nhận biết điểm, đoạn thẳng, đường cong, đường gấp khúc và tính độ dài.',
    periods: ['Tiết 1: Điểm và đoạn thẳng', 'Tiết 2: Đường thẳng và ba điểm thẳng hàng', 'Tiết 3: Đường cong và đường gấp khúc', 'Tiết 4: Tính độ dài đường gấp khúc', 'Tiết 5: Luyện tập hình học']
  },
  17: {
    title: 'Bài 17: Ôn tập Học kì 1: Phép cộng trừ có nhớ và Đo lường',
    theme: 'Ôn tập cuối HKI',
    focus: 'Tổng hợp kiến thức phép cộng trừ có nhớ, hình học và đại lượng HKI.',
    periods: ['Tiết 1: Ôn tập phép cộng có nhớ', 'Tiết 2: Ôn tập phép trừ có nhớ', 'Tiết 3: Ôn tập hình học và đường gấp khúc', 'Tiết 4: Ôn tập kg, lít, dm', 'Tiết 5: Đề ôn tập tổng hợp']
  },
  18: {
    title: 'Bài 18: Đánh giá Cuối học kì 1 môn Toán Lớp 2',
    theme: 'Kiểm tra cuối HKI',
    focus: 'Kiểm tra định kì cuối học kì 1 và chữa bài.',
    periods: ['Tiết 1: Hướng dẫn ôn tập trọng tâm', 'Tiết 2: Kiểm tra định kì HKI', 'Tiết 3: Đánh giá kĩ năng tính toán', 'Tiết 4: Chữa bài và rút kinh nghiệm', 'Tiết 5: Khen thưởng học kì 1']
  },
  19: {
    title: 'Bài 19: Làm quen với Phép nhân: Thừa số và Tích',
    theme: 'Phép nhân',
    focus: 'Hình thành khái niệm phép nhân từ tổng các số hạng bằng nhau.',
    periods: ['Tiết 1: Khái niệm phép nhân', 'Tiết 2: Dấu nhân (x) và chuyển tổng thành tích', 'Tiết 3: Thừa số và Tích', 'Tiết 4: Tính giá trị tích', 'Tiết 5: Luyện tập phép nhân']
  },
  20: {
    title: 'Bài 20: Bảng nhân 2 và Bảng nhân 5',
    theme: 'Bảng nhân 2 & 5',
    focus: 'Thành lập, ghi nhớ và vận dụng bảng nhân 2, bảng nhân 5.',
    periods: ['Tiết 1: Khám phá Bảng nhân 2', 'Tiết 2: Luyện tập bảng nhân 2', 'Tiết 3: Khám phá Bảng nhân 5', 'Tiết 4: Luyện tập bảng nhân 5', 'Tiết 5: Trò chơi đố vui bảng nhân']
  },
  21: {
    title: 'Bài 21: Làm quen với Phép chia: Số bị chia, Số chia, Thương',
    theme: 'Phép chia',
    focus: 'Khái niệm phép chia từ thao tác chia đều thành các phần bằng nhau.',
    periods: ['Tiết 1: Khái niệm phép chia', 'Tiết 2: Dấu chia (:) và phép tính', 'Tiết 3: Số bị chia, Số chia, Thương', 'Tiết 4: Mối quan hệ giữa nhân và chia', 'Tiết 5: Luyện tập phép chia']
  },
  22: {
    title: 'Bài 22: Bảng chia 2 và Bảng chia 5',
    theme: 'Bảng chia 2 & 5',
    focus: 'Thành lập, học thuộc và vận dụng bảng chia 2, bảng chia 5.',
    periods: ['Tiết 1: Khám phá Bảng chia 2', 'Tiết 2: Luyện tập bảng chia 2', 'Tiết 3: Khám phá Bảng chia 5', 'Tiết 4: Luyện tập bảng chia 5', 'Tiết 5: Trò chơi tính nhẩm nhanh']
  },
  23: {
    title: 'Bài 23: Hình tứ giác, Khối trụ và Khối cầu',
    theme: 'Hình học & Hình khối',
    focus: 'Nhận biết hình tứ giác, khối trụ, khối cầu và tìm trong thực tế.',
    periods: ['Tiết 1: Nhận biết hình tứ giác', 'Tiết 2: Khối trụ và khối cầu', 'Tiết 3: Phân loại hình khối', 'Tiết 4: Ghép hình sáng tạo', 'Tiết 5: Luyện tập chung']
  },
  24: {
    title: 'Bài 24: Độ dài đoạn thẳng, Độ dài đường gấp khúc',
    theme: 'Đo độ dài',
    focus: 'Tính độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng.',
    periods: ['Tiết 1: Đo độ dài đoạn thẳng', 'Tiết 2: Tính độ dài đường gấp khúc', 'Tiết 3: Luyện tập tính độ dài', 'Tiết 4: Bài toán thực tế đường đi', 'Tiết 5: Trò chơi toán học']
  },
  25: {
    title: 'Bài 25: Chu vi hình tam giác, Chu vi hình tứ giác',
    theme: 'Chu vi hình học',
    focus: 'Khái niệm chu vi; tính chu vi tam giác, tứ giác bằng tổng độ dài các cạnh.',
    periods: ['Tiết 1: Chu vi hình tam giác', 'Tiết 2: Chu vi hình tứ giác', 'Tiết 3: Luyện tập tính chu vi', 'Tiết 4: Bài toán tính chu vi khung ảnh', 'Tiết 5: Thực hành đo và tính']
  },
  26: {
    title: 'Bài 26: Các số có ba chữ số: Trăm, chục, đơn vị (Đến 200)',
    theme: 'Số có ba chữ số',
    focus: 'Khái niệm hàng trăm; đọc viết các số có 3 chữ số từ 101 đến 200.',
    periods: ['Tiết 1: Khái niệm hàng trăm', 'Tiết 2: Các số từ 101 đến 110', 'Tiết 3: Các số từ 111 đến 200', 'Tiết 4: Cấu tạo số trăm, chục, đơn vị', 'Tiết 5: Luyện tập viết số']
  },
  27: {
    title: 'Bài 27: Các số có ba chữ số (đến 999) & Đánh giá Giữa học kì 2',
    theme: 'Số đến 999 & Giữa kì 2',
    focus: 'Đọc viết cấu tạo các số đến 999; đánh giá giữa học kì 2.',
    periods: ['Tiết 1: Các số tròn trăm', 'Tiết 2: Đọc viết các số đến 999', 'Tiết 3: Phân tích cấu tạo số', 'Tiết 4: Kiểm tra định kì giữa kì 2', 'Tiết 5: Chữa bài kiểm tra']
  },
  28: {
    title: 'Bài 28: So sánh các số có ba chữ số',
    theme: 'So sánh số có 3 chữ số',
    focus: 'So sánh hàng trăm trước, rồi so sánh hàng chục và hàng đơn vị.',
    periods: ['Tiết 1: So sánh hàng trăm', 'Tiết 2: So sánh hàng chục và đơn vị', 'Tiết 3: Thứ tự từ bé đến lớn', 'Tiết 4: Tìm số lớn nhất, bé nhất', 'Tiết 5: Luyện tập so sánh']
  },
  29: {
    title: 'Bài 29: Đơn vị đo độ dài Mét (m) và Ki-lô-mét (km)',
    theme: 'Đơn vị m và km',
    focus: 'Nhận biết 1m = 10dm = 100cm; 1km = 1000m; ước lượng quãng đường.',
    periods: ['Tiết 1: Khám phá đơn vị Mét (m)', 'Tiết 2: Đổi đơn vị mét ra dm, cm', 'Tiết 3: Khám phá Ki-lô-mét (km)', 'Tiết 4: Bài toán tính quãng đường', 'Tiết 5: Thực hành đo đạc sân trường']
  },
  30: {
    title: 'Bài 30: Phép cộng (không nhớ) trong phạm vi 1000',
    theme: 'Phép cộng phạm vi 1000',
    focus: 'Đặt tính và tính cộng số có 3 chữ số không nhớ dạng 235 + 142.',
    periods: ['Tiết 1: Cộng số tròn trăm', 'Tiết 2: Đặt tính cộng số có 3 chữ số', 'Tiết 3: Luyện tập đặt tính', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  31: {
    title: 'Bài 31: Phép trừ (không nhớ) trong phạm vi 1000',
    theme: 'Phép trừ phạm vi 1000',
    focus: 'Đặt tính và tính trừ số có 3 chữ số không nhớ dạng 568 - 234.',
    periods: ['Tiết 1: Trừ số tròn trăm', 'Tiết 2: Đặt tính trừ số có 3 chữ số', 'Tiết 3: Luyện tập đặt tính', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  32: {
    title: 'Bài 32: Đơn vị đo khối lượng Gam (g) và Đơn vị Tiền Việt Nam',
    theme: 'Gam & Tiền Việt Nam',
    focus: 'Làm quen đơn vị gam (1kg = 1000g) và nhận biết các tờ tiền đến 100 000đ.',
    periods: ['Tiết 1: Khái niệm đơn vị Gam (g)', 'Tiết 2: Cộng trừ số đo đơn vị gam', 'Tiết 3: Nhận biết tờ tiền 1000đ đến 50 000đ', 'Tiết 4: Bài toán mua sắm hàng ngày', 'Tiết 5: Trò chơi đi chợ mini']
  },
  33: {
    title: 'Bài 33: Xem đồng hồ chính xác đến 5 phút, Ngày - tháng',
    theme: 'Xem đồng hồ & Lịch',
    focus: 'Đọc giờ chính xác (giờ hơn, giờ kém); số ngày trong từng tháng.',
    periods: ['Tiết 1: Xem đồng hồ chính xác 5 phút', 'Tiết 2: Giờ hơn và giờ kém', 'Tiết 3: Xem tờ lịch tháng', 'Tiết 4: Số ngày trong các tháng', 'Tiết 5: Luyện tập thời gian']
  },
  34: {
    title: 'Bài 34: Thu thập, phân loại, kiểm đếm và Biểu đồ tranh',
    theme: 'Thống kê & Xác suất',
    focus: 'Thu thập số liệu, đọc biểu đồ tranh, khái niệm Chắc chắn - Có thể - Không thể.',
    periods: ['Tiết 1: Thu thập và kiểm đếm', 'Tiết 2: Đọc hiểu biểu đồ tranh', 'Tiết 3: Rút ra nhận xét từ biểu đồ', 'Tiết 4: Sự kiện Chắc chắn - Có thể - Không thể', 'Tiết 5: Trò chơi bốc thăm']
  },
  35: {
    title: 'Bài 35: Ôn tập cuối năm toàn diện môn Toán Lớp 2',
    theme: 'Tổng kết Toán Lớp 2',
    focus: 'Ôn tập 4 phép tính, hình khối, đo lường và đánh giá cuối năm.',
    periods: ['Tiết 1: Ôn tập số và phép cộng, trừ', 'Tiết 2: Ôn tập phép nhân, phép chia', 'Tiết 3: Ôn tập hình học và đo lường', 'Tiết 4: Đánh giá kiểm tra định kì', 'Tiết 5: Tổng kết khen thưởng']
  }
};

// -------------------------------------------------------------------------
// TOÁN LỚP 3 (35 TUẦN CHUẨN KNTT)
// -------------------------------------------------------------------------
export const MATH_GRADE_3: Record<number, WeekTopicItem> = {
  1: {
    title: 'Bài 1: Ôn tập các số đến 1000 & Phép cộng, phép trừ trong phạm vi 1000',
    theme: 'Ôn tập đầu năm',
    focus: 'Củng cố số có 3 chữ số, cộng trừ có nhớ trong phạm vi 1000.',
    periods: ['Tiết 1: Ôn tập số đến 1000', 'Tiết 2: Phép cộng có nhớ phạm vi 1000', 'Tiết 3: Phép trừ có nhớ phạm vi 1000', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  2: {
    title: 'Bài 2: Ôn tập bảng nhân 2, 5 và Bảng chia 2, 5',
    theme: 'Ôn tập nhân chia',
    focus: 'Củng cố và tính nhẩm nhanh bảng nhân chia 2, 5.',
    periods: ['Tiết 1: Bảng nhân 2, 5', 'Tiết 2: Bảng chia 2, 5', 'Tiết 3: Tìm thừa số, số bị chia', 'Tiết 4: Giải toán gấp, giảm', 'Tiết 5: Trò chơi tiếp sức']
  },
  3: {
    title: 'Bài 3: Bảng nhân 3 và Bảng chia 3',
    theme: 'Bảng nhân chia 3',
    focus: 'Thành lập, ghi nhớ và vận dụng bảng nhân 3, bảng chia 3.',
    periods: ['Tiết 1: Khám phá Bảng nhân 3', 'Tiết 2: Luyện tập bảng nhân 3', 'Tiết 3: Khám phá Bảng chia 3', 'Tiết 4: Luyện tập bảng chia 3', 'Tiết 5: Trò chơi tính nhẩm nhanh']
  },
  4: {
    title: 'Bài 4: Bảng nhân 4 và Bảng chia 4',
    theme: 'Bảng nhân chia 4',
    focus: 'Thành lập, ghi nhớ và vận dụng bảng nhân 4, bảng chia 4.',
    periods: ['Tiết 1: Bảng nhân 4', 'Tiết 2: Luyện tập bảng nhân 4', 'Tiết 3: Bảng chia 4', 'Tiết 4: Luyện tập bảng chia 4', 'Tiết 5: Ứng dụng thực tế']
  },
  5: {
    title: 'Bài 5: Bảng nhân 6 và Bảng chia 6 & Gấp một số lên nhiều lần',
    theme: 'Bảng nhân chia 6',
    focus: 'Thành lập bảng nhân chia 6 và bài toán gấp một số lên nhiều lần.',
    periods: ['Tiết 1: Bảng nhân 6', 'Tiết 2: Luyện tập bảng nhân 6', 'Tiết 3: Bảng chia 6', 'Tiết 4: Luyện tập bảng chia 6', 'Tiết 5: Bài toán gấp lên 6 lần']
  },
  6: {
    title: 'Bài 6: Bảng nhân 7 và Bảng chia 7 & Giảm đi một số lần',
    theme: 'Bảng nhân chia 7',
    focus: 'Thành lập bảng nhân chia 7 và bài toán giảm đi một số lần.',
    periods: ['Tiết 1: Bảng nhân 7', 'Tiết 2: Luyện tập bảng nhân 7', 'Tiết 3: Bảng chia 7', 'Tiết 4: Luyện tập bảng chia 7', 'Tiết 5: Bài toán giảm đi 7 lần']
  },
  7: {
    title: 'Bài 7: Bảng nhân 8 và Bảng chia 8 & So sánh số lớn gấp mấy lần số bé',
    theme: 'Bảng nhân chia 8',
    focus: 'Bảng cửu chương 8 và dạng toán so sánh số lớn gấp mấy lần số bé.',
    periods: ['Tiết 1: Bảng nhân 8', 'Tiết 2: Bảng chia 8', 'Tiết 3: So sánh số lớn gấp mấy lần số bé', 'Tiết 4: Luyện tập giải toán', 'Tiết 5: Đấu trường cửu chương']
  },
  8: {
    title: 'Bài 8: Bảng nhân 9 và Bảng chia 9',
    theme: 'Bảng cửu chương 9',
    focus: 'Hoàn thiện hệ thống bảng cửu chương từ 2 đến 9.',
    periods: ['Tiết 1: Bảng nhân 9', 'Tiết 2: Bảng chia 9', 'Tiết 3: Luyện tập bảng cửu chương', 'Tiết 4: Tính nhẩm nâng cao', 'Tiết 5: Trò chơi vòng quay']
  },
  9: {
    title: 'Bài 9: Luyện tập chung & Đánh giá Giữa học kì 1',
    theme: 'Ôn tập giữa kì 1',
    focus: 'Củng cố toàn bộ bảng nhân chia từ 2 đến 9 và giải bài toán 2 bước.',
    periods: ['Tiết 1: Ôn tập bảng nhân', 'Tiết 2: Ôn tập bảng chia', 'Tiết 3: Giải toán bằng 2 bước tính', 'Tiết 4: Kiểm tra định kì giữa kì 1', 'Tiết 5: Chữa bài kiểm tra']
  },
  10: {
    title: 'Bài 10: Làm quen với Biểu thức số & Quy tắc tính giá trị biểu thức',
    theme: 'Biểu thức số',
    focus: 'Quy tắc tính giá trị biểu thức chỉ có phép cộng, trừ hoặc nhân, chia.',
    periods: ['Tiết 1: Khái niệm biểu thức số', 'Tiết 2: Tính giá trị biểu thức cộng trừ', 'Tiết 3: Tính giá trị biểu thức nhân chia', 'Tiết 4: Luyện tập tính toán', 'Tiết 5: Trò chơi ghép đúng giá trị']
  },
  11: {
    title: 'Bài 11: Biểu thức có chứa dấu ngoặc & Thứ tự thực hiện phép tính',
    theme: 'Biểu thức có dấu ngoặc',
    focus: 'Thực hiện phép tính trong ngoặc trước, ngoài ngoặc sau.',
    periods: ['Tiết 1: Biểu thức có dấu ngoặc ()', 'Tiết 2: Thứ tự thực hiện phép tính', 'Tiết 3: Luyện tính giá trị', 'Tiết 4: Bài toán áp dụng biểu thức', 'Tiết 5: Luyện tập chung']
  },
  12: {
    title: 'Bài 12: Góc vuông, góc không vuông và Dùng ê-ke để kiểm tra',
    theme: 'Góc & Ê-ke',
    focus: 'Nhận biết góc vuông, góc nhọn, tù; kiểm tra và vẽ góc bằng ê-ke.',
    periods: ['Tiết 1: Góc, đỉnh và cạnh', 'Tiết 2: Góc vuông và góc không vuông', 'Tiết 3: Dùng ê-ke kiểm tra góc vuông', 'Tiết 4: Vẽ góc vuông bằng ê-ke', 'Tiết 5: Luyện tập nhận diện góc']
  },
  13: {
    title: 'Bài 13: Hình tròn, tâm, đường kính, bán kính và Compa',
    theme: 'Hình tròn',
    focus: 'Nhận biết các yếu tố hình tròn, thực hành vẽ hình tròn bằng compa.',
    periods: ['Tiết 1: Tâm, bán kính, đường kính', 'Tiết 2: Đường kính gấp 2 lần bán kính', 'Tiết 3: Hướng dẫn sử dụng compa', 'Tiết 4: Vẽ hình tròn sáng tạo', 'Tiết 5: Xếp hình hoa văn hình tròn']
  },
  14: {
    title: 'Bài 14: Đơn vị đo độ dài Mi-li-mét (mm) và Mi-li-lít (ml)',
    theme: 'Đơn vị mm và ml',
    focus: 'Nhận biết 1cm = 10mm; 1l = 1000ml; thực hành đong đo chi tiết.',
    periods: ['Tiết 1: Khám phá Mi-li-mét (mm)', 'Tiết 2: Thực hành đo bằng mm', 'Tiết 3: Khám phá Mi-li-lít (ml)', 'Tiết 4: Thực hành đong bằng ml', 'Tiết 5: Luyện tập đại lượng']
  },
  15: {
    title: 'Bài 15: Nhiệt độ và Đơn vị đo nhiệt độ độ C (°C)',
    theme: 'Nhiệt độ & Nhiệt kế',
    focus: 'Làm quen nhiệt kế, đọc nhiệt độ thời tiết và nhiệt độ cơ thể (°C).',
    periods: ['Tiết 1: Khái niệm nhiệt độ', 'Tiết 2: Đọc số đo trên nhiệt kế', 'Tiết 3: Nhiệt độ ngày nắng, ngày lạnh', 'Tiết 4: Thực hành đo nhiệt độ nước', 'Tiết 5: Luyện tập chung']
  },
  16: {
    title: 'Bài 16: Khối lập phương, khối hộp chữ nhật và Trải nghiệm không gian',
    theme: 'Khối hộp & Lập phương',
    focus: 'Nhận biết đỉnh, mặt, cạnh của khối lập phương và khối hộp chữ nhật.',
    periods: ['Tiết 1: Số đỉnh, số mặt, số cạnh', 'Tiết 2: Nhận diện đồ vật dạng khối', 'Tiết 3: Ghép khối hình hộp', 'Tiết 4: Thực hành xếp hình theo mẫu', 'Tiết 5: Trò chơi kiến trúc sư nhí']
  },
  17: {
    title: 'Bài 17: Ôn tập Học kì 1: Phép nhân chia và Biểu thức, hình học',
    theme: 'Ôn tập cuối HKI',
    focus: 'Tổng kết cửu chương, biểu thức, hình học phẳng và đại lượng đo lường.',
    periods: ['Tiết 1: Ôn tập bảng nhân chia 2-9', 'Tiết 2: Ôn tập tính giá trị biểu thức', 'Tiết 3: Ôn tập góc vuông, hình tròn', 'Tiết 4: Ôn tập mm, ml, nhiệt độ', 'Tiết 5: Đề kiểm tra thử HKI']
  },
  18: {
    title: 'Bài 18: Đánh giá Cuối học kì 1 môn Toán Lớp 3',
    theme: 'Kiểm tra cuối HKI',
    focus: 'Kiểm tra định kì cuối học kì 1 và chữa bài.',
    periods: ['Tiết 1: Hướng dẫn kỹ năng làm bài', 'Tiết 2: Kiểm tra định kì HKI', 'Tiết 3: Đánh giá năng lực giải toán', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Sơ kết học kì 1']
  },
  19: {
    title: 'Bài 19: Các số trong phạm vi 10 000 (Hàng nghìn)',
    theme: 'Số có 4 chữ số',
    focus: 'Đọc, viết, phân tích cấu tạo số có 4 chữ số (nghìn, trăm, chục, đơn vị).',
    periods: ['Tiết 1: Khám phá hàng nghìn', 'Tiết 2: Đọc viết số đến 10 000', 'Tiết 3: Cấu tạo số có 4 chữ số', 'Tiết 4: Viết số thành tổng', 'Tiết 5: Luyện tập chung']
  },
  20: {
    title: 'Bài 20: So sánh các số trong phạm vi 10 000',
    theme: 'So sánh số 4 chữ số',
    focus: 'So sánh các hàng từ nghìn đến đơn vị; làm tròn số đến hàng trăm, nghìn.',
    periods: ['Tiết 1: So sánh số có số chữ số khác nhau', 'Tiết 2: So sánh số có cùng số chữ số', 'Tiết 3: Thứ tự dãy số', 'Tiết 4: Làm tròn số đến hàng trăm', 'Tiết 5: Trò chơi tìm số']
  },
  21: {
    title: 'Bài 21: Phép cộng các số trong phạm vi 10 000 (có nhớ)',
    theme: 'Cộng phạm vi 10 000',
    focus: 'Kỹ thuật đặt tính và tính cộng 4 chữ số có nhớ không quá 2 lần.',
    periods: ['Tiết 1: Cộng không nhớ', 'Tiết 2: Cộng có nhớ 1 lần', 'Tiết 3: Cộng có nhớ 2 lần', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập cộng']
  },
  22: {
    title: 'Bài 22: Phép trừ các số trong phạm vi 10 000 (có nhớ)',
    theme: 'Trừ phạm vi 10 000',
    focus: 'Kỹ thuật đặt tính và tính trừ 4 chữ số có nhớ.',
    periods: ['Tiết 1: Trừ không nhớ', 'Tiết 2: Trừ có nhớ 1 lần', 'Tiết 3: Trừ có nhớ 2 lần', 'Tiết 4: Giải toán bớt đi', 'Tiết 5: Luyện tập trừ']
  },
  23: {
    title: 'Bài 23: Chu vi hình tam giác, tứ giác, chữ nhật, hình vuông',
    theme: 'Chu vi hình học',
    focus: 'Công thức tính chu vi hình tam giác, tứ giác, hình chữ nhật và hình vuông.',
    periods: ['Tiết 1: Chu vi hình tam giác, tứ giác', 'Tiết 2: Chu vi hình chữ nhật', 'Tiết 3: Chu vi hình vuông', 'Tiết 4: Bài toán tính chu vi thực tế', 'Tiết 5: Luyện tập đo đạc và tính chu vi']
  },
  24: {
    title: 'Bài 24: Làm quen với Diện tích & Đơn vị Xăng-ti-mét vuông (cm²)',
    theme: 'Khái niệm diện tích',
    focus: 'Khái niệm diện tích của một hình phẳng; đơn vị xăng-ti-mét vuông (cm²).',
    periods: ['Tiết 1: Khái niệm diện tích', 'Tiết 2: So sánh diện tích các hình', 'Tiết 3: Đơn vị xăng-ti-mét vuông (cm²)', 'Tiết 4: Đếm ô vuông tính diện tích', 'Tiết 5: Luyện tập diện tích']
  },
  25: {
    title: 'Bài 25: Diện tích hình chữ nhật, diện tích hình vuông',
    theme: 'Diện tích HCN & Hình vuông',
    focus: 'Công thức S = a x b (hình chữ nhật) và S = a x a (hình vuông).',
    periods: ['Tiết 1: Diện tích hình chữ nhật', 'Tiết 2: Diện tích hình vuông', 'Tiết 3: Phân biệt chu vi và diện tích', 'Tiết 4: Bài toán tính diện tích phòng', 'Tiết 5: Luyện tập giải toán']
  },
  26: {
    title: 'Bài 26: Các số trong phạm vi 100 000 (Hàng chục nghìn)',
    theme: 'Số có 5 chữ số',
    focus: 'Đọc, viết, so sánh số có 5 chữ số (chục nghìn, nghìn, trăm, chục, đơn vị).',
    periods: ['Tiết 1: Số tròn chục nghìn', 'Tiết 2: Đọc viết số đến 100 000', 'Tiết 3: Cấu tạo số 5 chữ số', 'Tiết 4: Viết số thành tổng', 'Tiết 5: Luyện tập chung']
  },
  27: {
    title: 'Bài 27: So sánh và Làm tròn số đến hàng nghìn, hàng chục nghìn & Giữa kì 2',
    theme: 'So sánh & Giữa kì 2',
    focus: 'So sánh số đến 100 000; làm tròn số; kiểm tra đánh giá giữa kì 2.',
    periods: ['Tiết 1: So sánh số đến 100 000', 'Tiết 2: Làm tròn số hàng nghìn, chục nghìn', 'Tiết 3: Ôn tập giữa kì 2', 'Tiết 4: Kiểm tra định kì giữa kì 2', 'Tiết 5: Chữa bài kiểm tra']
  },
  28: {
    title: 'Bài 28: Phép cộng và Phép trừ trong phạm vi 100 000',
    theme: 'Cộng trừ phạm vi 100 000',
    focus: 'Đặt tính và tính cộng trừ số có 5 chữ số có nhớ.',
    periods: ['Tiết 1: Phép cộng trong phạm vi 100 000', 'Tiết 2: Luyện tập phép cộng', 'Tiết 3: Phép trừ trong phạm vi 100 000', 'Tiết 4: Luyện tập phép trừ', 'Tiết 5: Luyện tập chung']
  },
  29: {
    title: 'Bài 29: Nhân số có năm chữ số với số có một chữ số',
    theme: 'Phép nhân số có 5 chữ số',
    focus: 'Kỹ thuật nhân số có 5 chữ số với số có 1 chữ số có nhớ.',
    periods: ['Tiết 1: Nhân không nhớ', 'Tiết 2: Nhân có nhớ', 'Tiết 3: Đặt tính và tính', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập nhân']
  },
  30: {
    title: 'Bài 30: Chia số có năm chữ số cho số có một chữ số',
    theme: 'Phép chia số có 5 chữ số',
    focus: 'Kỹ thuật chia hết và chia có dư cho số có 1 chữ số.',
    periods: ['Tiết 1: Chia hết', 'Tiết 2: Chia có dư', 'Tiết 3: Trường hợp chữ số 0 ở thương', 'Tiết 4: Giải bài toán chia đều', 'Tiết 5: Luyện tập chia']
  },
  31: {
    title: 'Bài 31: Tiền Việt Nam và Bài toán mua sắm thực tế',
    theme: 'Tiền tệ thực tế',
    focus: 'Nhận biết các tờ tiền 1000đ, 2000đ, 5000đ, 10000đ, 20000đ, 50000đ, 100000đ.',
    periods: ['Tiết 1: Nhận biết mệnh giá tiền', 'Tiết 2: Đổi tiền và trả lại tiền thừa', 'Tiết 3: Bài toán mua sắm hàng ngày', 'Tiết 4: Trò chơi đi chợ mini', 'Tiết 5: Luyện tập quản lý chi tiêu']
  },
  32: {
    title: 'Bài 32: Bảng số liệu thống kê và Khả năng xảy ra của một sự kiện',
    theme: 'Thống kê & Xác suất',
    focus: 'Đọc bảng số liệu 2 cột, 2 dòng; xác định khả năng xảy ra của sự kiện.',
    periods: ['Tiết 1: Thu thập số liệu', 'Tiết 2: Đọc bảng số liệu thống kê', 'Tiết 3: Khả năng Chắc chắn, Có thể, Không thể', 'Tiết 4: Trò chơi bốc bóng màu', 'Tiết 5: Luyện tập thống kê']
  },
  33: {
    title: 'Bài 33: Thực hành và trải nghiệm: Ước lượng, tính toán chi tiêu và Diện tích',
    theme: 'Thực hành trải nghiệm',
    focus: 'Ứng dụng đo đạc sân trường, tính diện tích bồn hoa, lập dự toán chi tiêu.',
    periods: ['Tiết 1: Đo diện tích bồn hoa', 'Tiết 2: Ước lượng khoảng cách thực tế', 'Tiết 3: Lập kế hoạch mua sách vở', 'Tiết 4: Báo cáo kết quả nhóm', 'Tiết 5: Đánh giá dự án']
  },
  34: {
    title: 'Bài 34: Ôn tập cuối năm: Số và phép tính trong phạm vi 100 000',
    theme: 'Ôn tập cuối năm',
    focus: 'Tổng hợp kỹ năng cộng, trừ, nhân, chia trong phạm vi 100 000.',
    periods: ['Tiết 1: Ôn tập đọc viết số đến 100 000', 'Tiết 2: Ôn tập phép cộng và phép trừ', 'Tiết 3: Ôn tập phép nhân và phép chia', 'Tiết 4: Giải toán có lời văn 2 bước', 'Tiết 5: Luyện đề tổng hợp']
  },
  35: {
    title: 'Bài 35: Ôn tập cuối năm: Hình học, đo lường, thống kê & Đánh giá',
    theme: 'Tổng kết Toán Lớp 3',
    focus: 'Ôn tập chu vi, diện tích, tiền tệ, bảng số liệu và đánh giá cuối năm.',
    periods: ['Tiết 1: Ôn tập chu vi và diện tích', 'Tiết 2: Ôn tập đo lường và tiền tệ', 'Tiết 3: Kiểm tra định kì cuối năm', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Tổng kết năm học']
  }
};

// -------------------------------------------------------------------------
// TOÁN LỚP 4 (35 TUẦN CHUẨN KNTT)
// -------------------------------------------------------------------------
export const MATH_GRADE_4: Record<number, WeekTopicItem> = {
  1: {
    title: 'Bài 1: Ôn tập các số đến 100 000 & Biểu thức chứa một chữ',
    theme: 'Ôn tập và biểu thức chữ',
    focus: 'Đọc viết số đến 100 000; giá trị biểu thức chữ; tính chất giao hoán.',
    periods: ['Tiết 1: Ôn tập số đến 100 000', 'Tiết 2: Ôn tập bốn phép tính', 'Tiết 3: Biểu thức chứa một chữ', 'Tiết 4: Tính giá trị biểu thức chữ', 'Tiết 5: Luyện tập chung']
  },
  2: {
    title: 'Bài 2: Hàng và lớp & Các số có nhiều chữ số (Lớp triệu)',
    theme: 'Số có nhiều chữ số',
    focus: 'Lớp đơn vị, lớp nghìn, lớp triệu; đọc và viết số có nhiều chữ số.',
    periods: ['Tiết 1: Triệu và lớp triệu', 'Tiết 2: Đọc viết số có nhiều chữ số', 'Tiết 3: Cấu tạo hàng và lớp', 'Tiết 4: Viết số thành tổng', 'Tiết 5: Luyện tập thực hành']
  },
  3: {
    title: 'Bài 3: So sánh số có nhiều chữ số & Làm tròn số',
    theme: 'So sánh & Làm tròn',
    focus: 'Quy tắc so sánh số nhiều chữ số; làm tròn số đến hàng trăm nghìn, hàng triệu.',
    periods: ['Tiết 1: So sánh số có nhiều chữ số', 'Tiết 2: Sắp xếp thứ tự các số', 'Tiết 3: Làm tròn số đến hàng nghìn, chục nghìn', 'Tiết 4: Làm tròn số đến hàng trăm nghìn', 'Tiết 5: Trò chơi tìm số bí mật']
  },
  4: {
    title: 'Bài 4: Góc nhọn, góc tù, góc bẹt & Dùng thước đo độ',
    theme: 'Góc & Đo góc',
    focus: 'Nhận biết các loại góc; dùng thước đo độ để đo góc (độ - °).',
    periods: ['Tiết 1: Góc nhọn, góc tù, góc bẹt', 'Tiết 2: Làm quen thước đo góc', 'Tiết 3: Thực hành đo độ lớn của góc', 'Tiết 4: Vẽ góc có số đo cho trước', 'Tiết 5: Luyện tập nhận diện góc']
  },
  5: {
    title: 'Bài 5: Hai đường thẳng vuông góc & Hai đường thẳng song song',
    theme: 'Đường thẳng vuông góc & song song',
    focus: 'Nhận biết, kiểm tra và vẽ hai đường thẳng vuông góc, hai đường thẳng song song.',
    periods: ['Tiết 1: Hai đường thẳng vuông góc', 'Tiết 2: Vẽ hai đường thẳng vuông góc', 'Tiết 3: Hai đường thẳng song song', 'Tiết 4: Vẽ hai đường thẳng song song', 'Tiết 5: Thực hành hình học']
  },
  6: {
    title: 'Bài 6: Đơn vị đo khối lượng Yến, Tạ, Tấn và Thời gian Giây, Thế kỉ',
    theme: 'Đại lượng đo lường',
    focus: 'Nắm vững yến, tạ, tấn (1 tấn = 10 tạ = 100 yến = 1000kg); giây, thế kỉ (1 thế kỉ = 100 năm).',
    periods: ['Tiết 1: Yến, tạ, tấn', 'Tiết 2: Đổi đơn vị đo khối lượng', 'Tiết 3: Giây và thế kỉ', 'Tiết 4: Xác định năm thuộc thế kỉ nào', 'Tiết 5: Luyện tập đo lường tổng hợp']
  },
  7: {
    title: 'Bài 7: Phép cộng và Phép trừ các số có nhiều chữ số',
    theme: 'Cộng trừ số nhiều chữ số',
    focus: 'Kỹ thuật đặt tính và tính cộng trừ các số có nhiều chữ số có nhớ.',
    periods: ['Tiết 1: Phép cộng số nhiều chữ số', 'Tiết 2: Luyện tập phép cộng', 'Tiết 3: Phép trừ số nhiều chữ số', 'Tiết 4: Luyện tập phép trừ', 'Tiết 5: Giải toán có lời văn']
  },
  8: {
    title: 'Bài 8: Tính chất giao hoán và Tính chất kết hợp của phép cộng',
    theme: 'Tính chất phép cộng',
    focus: 'Vận dụng tính chất a + b = b + a và (a + b) + c = a + (b + c) để tính thuận tiện.',
    periods: ['Tiết 1: Tính chất giao hoán của phép cộng', 'Tiết 2: Tính chất kết hợp của phép cộng', 'Tiết 3: Tính bằng cách thuận tiện nhất', 'Tiết 4: Giải bài toán ứng dụng', 'Tiết 5: Luyện tập chung']
  },
  9: {
    title: 'Bài 9: Luyện tập chung & Đánh giá Giữa học kì 1',
    theme: 'Ôn tập giữa kì 1',
    focus: 'Củng cố số nhiều chữ số, góc, yến tạ tấn, thế kỉ và cộng trừ.',
    periods: ['Tiết 1: Ôn tập số và phép tính', 'Tiết 2: Ôn tập hình học và đo lường', 'Tiết 3: Tính thuận tiện', 'Tiết 4: Kiểm tra định kì giữa kì 1', 'Tiết 5: Chữa bài kiểm tra']
  },
  10: {
    title: 'Bài 10: Tìm số trung bình cộng của nhiều số',
    theme: 'Số trung bình cộng',
    focus: 'Công thức Trung bình cộng = Tổng các số : Số các số hạng.',
    periods: ['Tiết 1: Khái niệm số trung bình cộng', 'Tiết 2: Quy tắc tìm trung bình cộng', 'Tiết 3: Giải bài toán trung bình cộng', 'Tiết 4: Bài toán nâng cao', 'Tiết 5: Trò chơi toán học']
  },
  11: {
    title: 'Bài 11: Tìm hai số khi biết Tổng và Hiệu của hai số đó',
    theme: 'Toán Tổng - Hiệu',
    focus: 'Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng - Hiệu) : 2.',
    periods: ['Tiết 1: Khám phá sơ đồ đoạn thẳng', 'Tiết 2: Công thức tìm số lớn, số bé', 'Tiết 3: Luyện tập giải toán tổng - hiệu', 'Tiết 4: Các bài toán thực tế', 'Tiết 5: Trò chơi tiếp sức']
  },
  12: {
    title: 'Bài 12: Nhân với số có một chữ số & Tính chất của phép nhân',
    theme: 'Phép nhân',
    focus: 'Tính chất giao hoán, kết hợp của phép nhân và nhân với 10, 100, 1000.',
    periods: ['Tiết 1: Nhân số nhiều chữ số với số có 1 chữ số', 'Tiết 2: Tính chất giao hoán của phép nhân', 'Tiết 3: Tính chất kết hợp của phép nhân', 'Tiết 4: Nhân với 10, 100, 1000', 'Tiết 5: Luyện tập tính thuận tiện']
  },
  13: {
    title: 'Bài 13: Nhân một số với một tổng & Nhân một số với một hiệu',
    theme: 'Nhân với tổng và hiệu',
    focus: 'Quy tắc a x (b + c) = a x b + a x c; a x (b - c) = a x b - a x c.',
    periods: ['Tiết 1: Nhân một số với một tổng', 'Tiết 2: Nhân một số với một hiệu', 'Tiết 3: Tính bằng cách thuận tiện', 'Tiết 4: Nhân với số có tận cùng là 0', 'Tiết 5: Luyện tập chung']
  },
  14: {
    title: 'Bài 14: Nhân với số có hai chữ số & Kỹ thuật viết tích riêng',
    theme: 'Nhân số có hai chữ số',
    focus: 'Tích riêng thứ nhất, tích riêng thứ hai lùi sang trái một cột.',
    periods: ['Tiết 1: Khám phá tích riêng thứ 1 và 2', 'Tiết 2: Đặt tính nhân số có 2 chữ số', 'Tiết 3: Luyện tập đặt tính', 'Tiết 4: Giải bài toán diện tích', 'Tiết 5: Luyện tập nâng cao']
  },
  15: {
    title: 'Bài 15: Chia cho số có một chữ số & Chia cho số có tận cùng là 0',
    theme: 'Phép chia',
    focus: 'Kỹ thuật chia số nhiều chữ số cho số có 1 chữ số; chia cho 10, 100, 1000.',
    periods: ['Tiết 1: Chia cho số có 1 chữ số', 'Tiết 2: Chia cho số có tận cùng là 0', 'Tiết 3: Chia một tổng cho một số', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chia']
  },
  16: {
    title: 'Bài 16: Chia cho số có hai chữ số (Ước lượng thương)',
    theme: 'Chia số có hai chữ số',
    focus: 'Phương pháp làm tròn và ước lượng thương trong phép chia cho số có 2 chữ số.',
    periods: ['Tiết 1: Chia hết cho số có 2 chữ số', 'Tiết 2: Chia có dư', 'Tiết 3: Kỹ năng ước lượng thương', 'Tiết 4: Chữ số 0 ở thương', 'Tiết 5: Luyện tập chia']
  },
  17: {
    title: 'Bài 17: Ôn tập Học kì 1: Bốn phép tính với số tự nhiên và Hình học',
    theme: 'Ôn tập cuối HKI',
    focus: 'Tổng hợp 4 phép tính, tổng hiệu, trung bình cộng và hình học góc.',
    periods: ['Tiết 1: Ôn tập cộng, trừ số nhiều chữ số', 'Tiết 2: Ôn tập nhân, chia', 'Tiết 3: Ôn tập toán tổng - hiệu và trung bình cộng', 'Tiết 4: Ôn tập góc, đường vuông góc, song song', 'Tiết 5: Đề kiểm tra thử HKI']
  },
  18: {
    title: 'Bài 18: Đánh giá Cuối học kì 1 môn Toán Lớp 4',
    theme: 'Kiểm tra cuối HKI',
    focus: 'Kiểm tra định kì cuối học kì 1 và chữa bài.',
    periods: ['Tiết 1: Hướng dẫn kỹ năng làm bài', 'Tiết 2: Kiểm tra định kì HKI', 'Tiết 3: Đánh giá kĩ năng tính toán', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Sơ kết học kì 1']
  },
  19: {
    title: 'Bài 19: Khái niệm Phân số & Phân số và phép chia số tự nhiên',
    theme: 'Khái niệm phân số',
    focus: 'Tử số, mẫu số; biểu diễn phân số qua hình vẽ; thương của phép chia là phân số.',
    periods: ['Tiết 1: Khái niệm phân số', 'Tiết 2: Tử số và mẫu số', 'Tiết 3: Phân số và phép chia số tự nhiên', 'Tiết 4: Phân số lớn hơn 1, bé hơn 1, bằng 1', 'Tiết 5: Luyện tập nhận biết phân số']
  },
  20: {
    title: 'Bài 20: Phân số bằng nhau & Rút gọn phân số',
    theme: 'Tính chất phân số',
    focus: 'Tính chất cơ bản của phân số; kỹ thuật chia cả tử và mẫu để rút gọn phân số tối giản.',
    periods: ['Tiết 1: Phân số bằng nhau', 'Tiết 2: Tính chất cơ bản của phân số', 'Tiết 3: Rút gọn phân số', 'Tiết 4: Phân số tối giản', 'Tiết 5: Luyện tập rút gọn']
  },
  21: {
    title: 'Bài 21: Quy đồng mẫu số các phân số',
    theme: 'Quy đồng mẫu số',
    focus: 'Phương pháp tìm mẫu số chung và quy đồng mẫu số 2 phân số.',
    periods: ['Tiết 1: Khái niệm quy đồng mẫu số', 'Tiết 2: Mẫu số này chia hết cho mẫu số kia', 'Tiết 3: Quy đồng hai phân số khác mẫu', 'Tiết 4: Luyện tập quy đồng', 'Tiết 5: Luyện tập chung']
  },
  22: {
    title: 'Bài 22: So sánh hai phân số cùng mẫu số và khác mẫu số',
    theme: 'So sánh phân số',
    focus: 'So sánh tử số khi cùng mẫu số; quy đồng mẫu số rồi so sánh khi khác mẫu.',
    periods: ['Tiết 1: So sánh phân số cùng mẫu số', 'Tiết 2: So sánh phân số khác mẫu số', 'Tiết 3: So sánh phân số với 1', 'Tiết 4: Xếp thứ tự các phân số', 'Tiết 5: Luyện tập so sánh']
  },
  23: {
    title: 'Bài 23: Phép cộng và Phép trừ phân số',
    theme: 'Cộng trừ phân số',
    focus: 'Quy tắc cộng, trừ phân số cùng mẫu và khác mẫu số (quy đồng rồi cộng/trừ tử số).',
    periods: ['Tiết 1: Cộng phân số cùng mẫu số', 'Tiết 2: Cộng phân số khác mẫu số', 'Tiết 3: Trừ phân số cùng mẫu số', 'Tiết 4: Trừ phân số khác mẫu số', 'Tiết 5: Luyện tập cộng trừ phân số']
  },
  24: {
    title: 'Bài 24: Luyện tập phép cộng, phép trừ phân số & Tính thuận tiện',
    theme: 'Luyện tập cộng trừ phân số',
    focus: 'Tính chất giao hoán, kết hợp của phép cộng phân số; tìm x với phân số.',
    periods: ['Tiết 1: Tính chất giao hoán, kết hợp phân số', 'Tiết 2: Tính bằng cách thuận tiện', 'Tiết 3: Tìm thành phần chưa biết', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập chung']
  },
  25: {
    title: 'Bài 25: Phép nhân phân số & Tìm phân số của một số',
    theme: 'Nhân phân số',
    focus: 'Tử x tử, mẫu x mẫu; tìm m/n của số a bằng cách lấy a x (m/n).',
    periods: ['Tiết 1: Phép nhân phân số', 'Tiết 2: Rút gọn trong khi nhân', 'Tiết 3: Tìm phân số của một số', 'Tiết 4: Bài toán ứng dụng thực tế', 'Tiết 5: Luyện tập nhân phân số']
  },
  26: {
    title: 'Bài 26: Phép chia phân số (Nhân với phân số đảo ngược)',
    theme: 'Chia phân số',
    focus: 'Phân số đảo ngược; lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
    periods: ['Tiết 1: Phân số đảo ngược', 'Tiết 2: Phép chia phân số', 'Tiết 3: Luyện tập chia phân số', 'Tiết 4: Bốn phép tính với phân số', 'Tiết 5: Luyện tập chung']
  },
  27: {
    title: 'Bài 27: Ôn tập phân số và bốn phép tính phân số & Đánh giá Giữa học kì 2',
    theme: 'Ôn tập giữa kì 2',
    focus: 'Hệ thống hóa bốn phép tính với phân số; kiểm tra định kì giữa kì 2.',
    periods: ['Tiết 1: Ôn tập rút gọn và quy đồng', 'Tiết 2: Ôn tập bốn phép tính phân số', 'Tiết 3: Giải toán phân số có lời văn', 'Tiết 4: Kiểm tra định kì giữa kì 2', 'Tiết 5: Chữa bài kiểm tra']
  },
  28: {
    title: 'Bài 28: Hình bình hành và Diện tích hình bình hành',
    theme: 'Hình bình hành',
    focus: 'Đặc điểm hai cặp cạnh đối diện song song và bằng nhau; Diện tích S = a x h.',
    periods: ['Tiết 1: Khám phá hình bình hành', 'Tiết 2: Đáy và chiều cao', 'Tiết 3: Diện tích hình bình hành', 'Tiết 4: Bài toán tính diện tích', 'Tiết 5: Luyện tập hình bình hành']
  },
  29: {
    title: 'Bài 29: Hình thoi và Diện tích hình thoi',
    theme: 'Hình thoi',
    focus: 'Đặc điểm 4 cạnh bằng nhau, 2 đường chéo vuông góc; Diện tích S = (m x n) : 2.',
    periods: ['Tiết 1: Khám phá hình thoi', 'Tiết 2: Hai đường chéo của hình thoi', 'Tiết 3: Diện tích hình thoi', 'Tiết 4: Bài toán tính diện tích', 'Tiết 5: Luyện tập hình thoi']
  },
  30: {
    title: 'Bài 30: Đơn vị đo diện tích: Đề-xi-mét vuông (dm²), Mét vuông (m²), Mi-li-mét vuông (mm²)',
    theme: 'Đơn vị đo diện tích',
    focus: 'Bảng đơn vị đo diện tích; quan hệ giữa m², dm², cm², mm² (gấp kém nhau 100 lần).',
    periods: ['Tiết 1: Đề-xi-mét vuông (dm²)', 'Tiết 2: Mét vuông (m²)', 'Tiết 3: Mi-li-mét vuông (mm²)', 'Tiết 4: Đổi đơn vị đo diện tích', 'Tiết 5: Luyện tập diện tích']
  },
  31: {
    title: 'Bài 31: Tỉ số và Tỉ lệ bản đồ - Ứng dụng của tỉ lệ bản đồ',
    theme: 'Tỉ số & Bản đồ',
    focus: 'Khái niệm tỉ số a/b; tỉ lệ bản đồ 1:1000; tính khoảng cách thực tế từ bản đồ.',
    periods: ['Tiết 1: Khái niệm tỉ số', 'Tiết 2: Tỉ lệ bản đồ', 'Tiết 3: Tính khoảng cách thực tế', 'Tiết 4: Tính độ dài trên bản đồ', 'Tiết 5: Luyện tập tỉ lệ bản đồ']
  },
  32: {
    title: 'Bài 32: Dãy số liệu thống kê và Biểu đồ cột',
    theme: 'Thống kê biểu đồ cột',
    focus: 'Đọc và phân tích thông tin từ biểu đồ cột; vẽ biểu đồ cột đơn giản.',
    periods: ['Tiết 1: Dãy số liệu thống kê', 'Tiết 2: Đọc hiểu biểu đồ cột', 'Tiết 3: Nhận xét và so sánh số liệu', 'Tiết 4: Thực hành vẽ biểu đồ cột', 'Tiết 5: Luyện tập thống kê']
  },
  33: {
    title: 'Bài 33: Thực hành và trải nghiệm: Lập kế hoạch tài chính và Thiết kế hình học',
    theme: 'Thực hành trải nghiệm',
    focus: 'Ứng dụng tính toán diện tích sơn tường, thiết kế sân chơi và quản lý ngân sách.',
    periods: ['Tiết 1: Đo diện tích phòng học', 'Tiết 2: Tính lượng sơn cần dùng', 'Tiết 3: Lập kế hoạch chi tiêu hội chợ', 'Tiết 4: Trình bày poster dự án', 'Tiết 5: Đánh giá sản phẩm']
  },
  34: {
    title: 'Bài 34: Ôn tập cuối năm: Số tự nhiên, Phân số và Bốn phép tính',
    theme: 'Ôn tập cuối năm',
    focus: 'Hệ thống hóa toàn bộ kiến thức số học và phân số Lớp 4.',
    periods: ['Tiết 1: Ôn tập số tự nhiên và phép tính', 'Tiết 2: Ôn tập phân số và bốn phép tính', 'Tiết 3: Ôn tập toán tổng - hiệu và trung bình cộng', 'Tiết 4: Ôn tập tìm phân số của một số', 'Tiết 5: Đề tổng hợp 1']
  },
  35: {
    title: 'Bài 35: Ôn tập cuối năm: Hình học, đo lường, xác suất thống kê & Đánh giá',
    theme: 'Tổng kết Toán Lớp 4',
    focus: 'Ôn tập hình bình hành, hình thoi, diện tích, biểu đồ cột và kiểm tra cuối năm.',
    periods: ['Tiết 1: Ôn tập hình học và diện tích', 'Tiết 2: Ôn tập đo lường và tỉ lệ bản đồ', 'Tiết 3: Kiểm tra định kì cuối năm', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Tổng kết năm học']
  }
};

// -------------------------------------------------------------------------
// TOÁN LỚP 5 (35 TUẦN CHUẨN KNTT)
// -------------------------------------------------------------------------
export const MATH_GRADE_5: Record<number, WeekTopicItem> = {
  1: {
    title: 'Bài 1: Ôn tập về phân số & Phân số thập phân, Hỗn số',
    theme: 'Ôn tập và phân số thập phân',
    focus: 'Khái niệm phân số, tính chất cơ bản; phân số thập phân và hỗn số.',
    periods: ['Tiết 1: Ôn tập phân số và rút gọn phân số', 'Tiết 2: Quy đồng mẫu số các phân số', 'Tiết 3: Phân số thập phân', 'Tiết 4: Hỗn số và chuyển đổi', 'Tiết 5: Luyện tập chung']
  },
  2: {
    title: 'Bài 2: Khái niệm số thập phân & Hàng của số thập phân',
    theme: 'Số thập phân',
    focus: 'Nhận biết số thập phân; cấu tạo phần nguyên và phần thập phân; đọc viết số thập phân.',
    periods: ['Tiết 1: Khái niệm số thập phân', 'Tiết 2: Hàng của số thập phân', 'Tiết 3: Đọc, viết số thập phân', 'Tiết 4: Số thập phân bằng nhau', 'Tiết 5: So sánh hai số thập phân']
  },
  3: {
    title: 'Bài 3: So sánh số thập phân & Viết các số đo đại lượng dưới dạng số thập phân',
    theme: 'Số thập phân & Đo lường',
    focus: 'So sánh số thập phân; viết số đo độ dài, khối lượng dưới dạng số thập phân.',
    periods: ['Tiết 1: So sánh hai số thập phân', 'Tiết 2: Xếp thứ tự số thập phân', 'Tiết 3: Viết số đo độ dài dưới dạng số thập phân', 'Tiết 4: Viết số đo khối lượng dưới dạng số thập phân', 'Tiết 5: Luyện tập chung']
  },
  4: {
    title: 'Bài 4: Viết số đo diện tích dưới dạng số thập phân & Đơn vị Héc-ta (ha)',
    theme: 'Đo diện tích & Héc-ta',
    focus: 'Đơn vị Héc-ta (1ha = 10 000m²); viết số đo diện tích dưới dạng số thập phân.',
    periods: ['Tiết 1: Đơn vị Héc-ta (ha)', 'Tiết 2: Đổi đơn vị ha ra m²', 'Tiết 3: Viết số đo diện tích dưới dạng số thập phân', 'Tiết 4: Giải bài toán diện tích đất đai', 'Tiết 5: Luyện tập đo diện tích']
  },
  5: {
    title: 'Bài 5: Phép cộng số thập phân & Tính chất giao hoán, kết hợp',
    theme: 'Cộng số thập phân',
    focus: 'Kỹ thuật đặt tính dấu phẩy thẳng cột; tính chất giao hoán và kết hợp để tính thuận tiện.',
    periods: ['Tiết 1: Đặt tính cộng số thập phân', 'Tiết 2: Tính chất giao hoán của phép cộng', 'Tiết 3: Tính chất kết hợp của phép cộng', 'Tiết 4: Tính bằng cách thuận tiện nhất', 'Tiết 5: Giải toán có lời văn']
  },
  6: {
    title: 'Bài 6: Phép trừ số thập phân',
    theme: 'Trừ số thập phân',
    focus: 'Kỹ thuật trừ số thập phân (thêm chữ số 0 vào phần thập phân khi cần).',
    periods: ['Tiết 1: Trừ hai số thập phân', 'Tiết 2: Trừ số tự nhiên cho số thập phân', 'Tiết 3: Luyện tập đặt tính trừ', 'Tiết 4: Tìm thành phần chưa biết', 'Tiết 5: Luyện tập cộng trừ']
  },
  7: {
    title: 'Bài 7: Phép nhân số thập phân (Nhân với số tự nhiên, nhân với 10, 100, 1000)',
    theme: 'Nhân số thập phân',
    focus: 'Quy tắc nhân số thập phân với số tự nhiên; nhân nhẩm với 10, 100, 1000 (dịch dấu phẩy sang phải).',
    periods: ['Tiết 1: Nhân số thập phân với số tự nhiên', 'Tiết 2: Nhân nhẩm với 10, 100, 1000', 'Tiết 3: Luyện tập đặt tính nhân', 'Tiết 4: Giải bài toán tính chu vi', 'Tiết 5: Luyện tập chung']
  },
  8: {
    title: 'Bài 8: Phép nhân số thập phân với số thập phân & Nhân với 0.1, 0.01',
    theme: 'Nhân hai số thập phân',
    focus: 'Đếm chữ số ở phần thập phân để đặt dấu phẩy ở tích; nhân nhẩm với 0.1, 0.01, 0.001.',
    periods: ['Tiết 1: Nhân hai số thập phân', 'Tiết 2: Nhân nhẩm với 0.1, 0.01, 0.001', 'Tiết 3: Tính chất phân phối của phép nhân', 'Tiết 4: Tính bằng cách thuận tiện', 'Tiết 5: Giải toán diện tích hình chữ nhật']
  },
  9: {
    title: 'Bài 9: Luyện tập chung & Đánh giá Giữa học kì 1',
    theme: 'Ôn tập giữa kì 1',
    focus: 'Củng cố số thập phân, ha, phép cộng, trừ, nhân số thập phân.',
    periods: ['Tiết 1: Ôn tập số thập phân và đo lường', 'Tiết 2: Ôn tập phép cộng và trừ số thập phân', 'Tiết 3: Ôn tập phép nhân số thập phân', 'Tiết 4: Kiểm tra định kì giữa kì 1', 'Tiết 5: Chữa bài kiểm tra']
  },
  10: {
    title: 'Bài 10: Chia một số thập phân cho một số tự nhiên',
    theme: 'Chia số thập phân',
    focus: 'Chia phần nguyên trước, đặt dấu phẩy vào thương rồi chia phần thập phân.',
    periods: ['Tiết 1: Chia số thập phân cho số tự nhiên', 'Tiết 2: Đặt dấu phẩy vào thương', 'Tiết 3: Chia phần thập phân có dư', 'Tiết 4: Giải toán chia đều', 'Tiết 5: Luyện tập chia']
  },
  11: {
    title: 'Bài 11: Chia một số tự nhiên cho một số tự nhiên thương là số thập phân',
    theme: 'Chia thương số thập phân',
    focus: 'Viết thêm dấu phẩy và chữ số 0 vào số bị chia để tiếp tục chia.',
    periods: ['Tiết 1: Chia số tự nhiên thương là số thập phân', 'Tiết 2: Chia một số tự nhiên cho một số thập phân', 'Tiết 3: Đếm chữ số phần thập phân của số chia', 'Tiết 4: Luyện tập đặt tính chia', 'Tiết 5: Giải toán có lời văn']
  },
  12: {
    title: 'Bài 12: Chia một số thập phân cho một số thập phân & Chia nhẩm 10, 100 / 0.1, 0.01',
    theme: 'Chia hai số thập phân',
    focus: 'Chuyển dấu phẩy ở số chia và số bị chia; chia nhẩm cho 10, 100 và 0.1, 0.01.',
    periods: ['Tiết 1: Chia số thập phân cho số thập phân', 'Tiết 2: Chia nhẩm cho 10, 100, 1000', 'Tiết 3: Chia nhẩm cho 0.1, 0.01, 0.001', 'Tiết 4: Bốn phép tính với số thập phân', 'Tiết 5: Luyện tập chung']
  },
  13: {
    title: 'Bài 13: Khái niệm Tỉ số phần trăm & Đọc viết tỉ số phần trăm',
    theme: 'Tỉ số phần trăm',
    focus: 'Khái niệm kí hiệu %; chuyển phân số thập phân thành tỉ số phần trăm.',
    periods: ['Tiết 1: Khái niệm tỉ số phần trăm (%)', 'Tiết 2: Viết tỉ số dưới dạng phần trăm', 'Tiết 3: Cộng trừ tỉ số phần trăm', 'Tiết 4: Nhân chia tỉ số phần trăm với một số', 'Tiết 5: Luyện tập nhận biết %']
  },
  14: {
    title: 'Bài 14: Giải toán về tỉ số phần trăm (Dạng 1: Tìm tỉ số phần trăm của hai số)',
    theme: 'Toán tỉ số phần trăm',
    focus: 'Tìm thương của hai số rồi nhân nhẩm với 100 và viết thêm kí hiệu %.',
    periods: ['Tiết 1: Phương pháp tìm tỉ số % của hai số', 'Tiết 2: Luyện giải bài toán tỉ số % học sinh', 'Tiết 3: Bài toán tỉ lệ phần trăm sản phẩm', 'Tiết 4: Tính % vượt mức kế hoạch', 'Tiết 5: Luyện tập dạng 1']
  },
  15: {
    title: 'Bài 15: Giải toán về tỉ số phần trăm (Dạng 2: Tìm giá trị phần trăm của một số)',
    theme: 'Tìm giá trị % của một số',
    focus: 'Lấy số đó chia cho 100 rồi nhân với số phần trăm (hoặc nhân với số phần trăm rồi chia 100).',
    periods: ['Tiết 1: Khám phá công thức tìm a% của số B', 'Tiết 2: Bài toán tính tiền lãi tiết kiệm', 'Tiết 3: Bài toán giảm giá khuyến mãi', 'Tiết 4: Bài toán thuế VAT', 'Tiết 5: Luyện tập dạng 2']
  },
  16: {
    title: 'Bài 16: Giải toán về tỉ số phần trăm (Dạng 3: Tìm một số khi biết giá trị phần trăm)',
    theme: 'Tìm số biết giá trị %',
    focus: 'Lấy giá trị đó chia cho số phần trăm rồi nhân với 100.',
    periods: ['Tiết 1: Khám phá công thức tìm số khi biết a% là B', 'Tiết 2: Bài toán tính tổng số dân, tổng sản lượng', 'Tiết 3: Tổng hợp 3 dạng toán tỉ số phần trăm', 'Tiết 4: Phân biệt và lựa chọn cách giải', 'Tiết 5: Trò chơi chuyên gia tài chính']
  },
  17: {
    title: 'Bài 17: Ôn tập Học kì 1: Số thập phân, Bốn phép tính và Tỉ số phần trăm',
    theme: 'Ôn tập cuối HKI',
    focus: 'Tổng hợp số thập phân, 4 phép tính, đại lượng đo diện tích ha và tỉ số phần trăm.',
    periods: ['Tiết 1: Ôn tập đọc viết số thập phân', 'Tiết 2: Ôn tập bốn phép tính số thập phân', 'Tiết 3: Ôn tập ba dạng toán tỉ số phần trăm', 'Tiết 4: Ôn tập bảng đơn vị đo', 'Tiết 5: Đề kiểm tra thử HKI']
  },
  18: {
    title: 'Bài 18: Đánh giá Cuối học kì 1 môn Toán Lớp 5',
    theme: 'Kiểm tra cuối HKI',
    focus: 'Kiểm tra định kì cuối học kì 1 và chữa bài.',
    periods: ['Tiết 1: Hướng dẫn kỹ năng làm bài', 'Tiết 2: Kiểm tra định kì HKI', 'Tiết 3: Đánh giá năng lực tư duy số học', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Sơ kết học kì 1']
  },
  19: {
    title: 'Bài 19: Hình tam giác: Đáy, chiều cao và Diện tích hình tam giác',
    theme: 'Hình tam giác',
    focus: 'Nhận diện đáy và chiều cao tương ứng; Công thức diện tích S = (a x h) : 2.',
    periods: ['Tiết 1: Khám phá đáy và đường cao tam giác', 'Tiết 2: Công thức diện tích hình tam giác', 'Tiết 3: Tính diện tích tam giác vuông', 'Tiết 4: Bài toán tính chiều cao hoặc đáy khi biết diện tích', 'Tiết 5: Luyện tập diện tích tam giác']
  },
  20: {
    title: 'Bài 20: Hình thang: Các yếu tố và Diện tích hình thang',
    theme: 'Hình thang',
    focus: 'Hai đáy song song, chiều cao; Công thức diện tích S = (a + b) x h : 2.',
    periods: ['Tiết 1: Khám phá hình thang, đáy lớn, đáy bé, chiều cao', 'Tiết 2: Hình thang vuông, hình thang cân', 'Tiết 3: Công thức tính diện tích hình thang', 'Tiết 4: Bài toán tính diện tích thửa ruộng hình thang', 'Tiết 5: Luyện tập diện tích hình thang']
  },
  21: {
    title: 'Bài 21: Hình tròn: Đường kính, bán kính, Chu vi và Diện tích hình tròn',
    theme: 'Hình tròn',
    focus: 'Chu vi C = d x 3.14 = r x 2 x 3.14; Diện tích S = r x r x 3.14.',
    periods: ['Tiết 1: Bán kính, đường kính và số Pi (3.14)', 'Tiết 2: Công thức tính chu vi hình tròn', 'Tiết 3: Công thức tính diện tích hình tròn', 'Tiết 4: Bài toán thực tế bánh xe, mặt bàn tròn', 'Tiết 5: Luyện tập chu vi, diện tích hình tròn']
  },
  22: {
    title: 'Bài 22: Hình hộp chữ nhật và Hình lập phương: Diện tích xung quanh và toàn phần',
    theme: 'Hình khối không gian',
    focus: 'Diện tích xung quanh Sxq = Chu vi đáy x chiều cao; Diện tích toàn phần Stp = Sxq + 2 x Sđáy.',
    periods: ['Tiết 1: Khám phá hình hộp chữ nhật', 'Tiết 2: Diện tích xung quanh, toàn phần HHCN', 'Tiết 3: Khám phá hình lập phương', 'Tiết 4: Diện tích xung quanh, toàn phần HLP', 'Tiết 5: Bài toán quét sơn căn phòng']
  },
  23: {
    title: 'Bài 23: Thể tích của một hình & Đơn vị đo thể tích cm³, dm³',
    theme: 'Khái niệm thể tích',
    focus: 'Khái niệm thể tích; đơn vị xăng-ti-mét khối (cm³), đề-xi-mét khối (dm³); 1dm³ = 1000cm³ = 1 lít.',
    periods: ['Tiết 1: Khái niệm thể tích của một hình', 'Tiết 2: Xăng-ti-mét khối (cm³)', 'Tiết 3: Đề-xi-mét khối (dm³)', 'Tiết 4: Mối quan hệ giữa dm³ và lít', 'Tiết 5: Luyện tập thể tích']
  },
  24: {
    title: 'Bài 24: Đơn vị đo thể tích Mét khối (m³) & Mối quan hệ đơn vị',
    theme: 'Mét khối (m³)',
    focus: '1m³ = 1000dm³ = 1 000 000cm³; Bảng đơn vị đo thể tích (mỗi hàng gấp kém nhau 1000 lần).',
    periods: ['Tiết 1: Khám phá đơn vị Mét khối (m³)', 'Tiết 2: Bảng đơn vị đo thể tích', 'Tiết 3: Đổi đơn vị đo thể tích', 'Tiết 4: Viết số đo thể tích dưới dạng số thập phân', 'Tiết 5: Luyện tập chung']
  },
  25: {
    title: 'Bài 25: Thể tích hình hộp chữ nhật và Thể tích hình lập phương',
    theme: 'Thể tích HHCN & HLP',
    focus: 'Thể tích HHCN V = a x b x c; Thể tích HLP V = a x a x a.',
    periods: ['Tiết 1: Công thức thể tích hình hộp chữ nhật', 'Tiết 2: Công thức thể tích hình lập phương', 'Tiết 3: Bài toán tính thể tích bể nước', 'Tiết 4: Tính mức nước dâng trong bể', 'Tiết 5: Luyện tập thể tích hình khối']
  },
  26: {
    title: 'Bài 26: Bảng đơn vị đo thời gian & Phép cộng, trừ số đo thời gian',
    theme: 'Đo thời gian',
    focus: 'Bảng đơn vị đo thời gian (năm, tháng, ngày, giờ, phút, giây); Đặt tính cộng trừ thời gian.',
    periods: ['Tiết 1: Bảng đơn vị đo thời gian', 'Tiết 2: Phép cộng số đo thời gian', 'Tiết 3: Phép trừ số đo thời gian (có đổi đơn vị)', 'Tiết 4: Giải toán về thời gian thực tế', 'Tiết 5: Luyện tập cộng trừ thời gian']
  },
  27: {
    title: 'Bài 27: Phép nhân, chia số đo thời gian & Đánh giá Giữa học kì 2',
    theme: 'Nhân chia thời gian & Giữa kì 2',
    focus: 'Kỹ thuật nhân chia số đo thời gian với một số; Đánh giá giữa học kì 2.',
    periods: ['Tiết 1: Nhân số đo thời gian với một số', 'Tiết 2: Chia số đo thời gian cho một số', 'Tiết 3: Ôn tập giữa kì 2', 'Tiết 4: Kiểm tra định kì giữa kì 2', 'Tiết 5: Chữa bài kiểm tra']
  },
  28: {
    title: 'Bài 28: Toán chuyển động đều: Khái niệm Vận tốc (km/h, m/s)',
    theme: 'Toán chuyển động: Vận tốc',
    focus: 'Công thức tính vận tốc v = s : t; đơn vị km/giờ, m/phút, m/giây.',
    periods: ['Tiết 1: Khái niệm vận tốc', 'Tiết 2: Công thức v = s : t', 'Tiết 3: Đổi đơn vị vận tốc (km/h sang m/phút)', 'Tiết 4: Giải bài toán tìm vận tốc', 'Tiết 5: Luyện tập vận tốc']
  },
  29: {
    title: 'Bài 29: Toán chuyển động đều: Quãng đường (s = v x t)',
    theme: 'Toán chuyển động: Quãng đường',
    focus: 'Công thức tính quãng đường s = v x t; chú ý đồng nhất đơn vị vận tốc và thời gian.',
    periods: ['Tiết 1: Khám phá công thức s = v x t', 'Tiết 2: Chuyển đổi số đo thời gian trước khi tính', 'Tiết 3: Bài toán tính quãng đường xe chạy', 'Tiết 4: Giải toán có lời văn', 'Tiết 5: Luyện tập quãng đường']
  },
  30: {
    title: 'Bài 30: Toán chuyển động đều: Thời gian (t = s : v)',
    theme: 'Toán chuyển động: Thời gian',
    focus: 'Công thức tính thời gian t = s : v; tính thời điểm xuất phát, thời điểm đến nơi.',
    periods: ['Tiết 1: Khám phá công thức t = s : v', 'Tiết 2: Đổi thương số thập phân ra giờ phút', 'Tiết 3: Tính thời điểm đến nơi = Giờ đi + Thời gian chạy', 'Tiết 4: Tính thời gian nghỉ', 'Tiết 5: Luyện tập thời gian']
  },
  31: {
    title: 'Bài 31: Bài toán hai chuyển động cùng chiều và ngược chiều',
    theme: 'Hai xe chuyển động',
    focus: 'Ngược chiều gặp nhau: t = s : (v1 + v2); Cùng chiều đuổi kịp: t = s : (v1 - v2).',
    periods: ['Tiết 1: Hai xe đi ngược chiều gặp nhau', 'Tiết 2: Hai xe đi cùng chiều đuổi kịp nhau', 'Tiết 3: Chuyển động của dòng nước (vận tốc xuôi dòng, ngược dòng)', 'Tiết 4: Luyện tập bài toán chuyển động', 'Tiết 5: Trò chơi hành trình kì thú']
  },
  32: {
    title: 'Bài 32: Biểu đồ hình quạt tròn & Bảng số liệu thống kê nâng cao',
    theme: 'Biểu đồ quạt tròn',
    focus: 'Đọc và giải thích tỉ lệ phần trăm trên biểu đồ hình quạt tròn.',
    periods: ['Tiết 1: Làm quen biểu đồ hình quạt tròn', 'Tiết 2: Đọc số liệu phần trăm trên biểu đồ quạt', 'Tiết 3: Tính số lượng thực tế từ biểu đồ quạt', 'Tiết 4: So sánh và rút ra nhận xét', 'Tiết 5: Luyện tập thống kê']
  },
  33: {
    title: 'Bài 33: Thực hành và trải nghiệm: Đo đạc thực địa, Tính chi phí xây dựng',
    theme: 'Thực hành trải nghiệm',
    focus: 'Ứng dụng đo diện tích sân trường, lập bảng dự toán kinh phí lát gạch và xây bồn hoa.',
    periods: ['Tiết 1: Đo diện tích sân khấu trường', 'Tiết 2: Tính số lượng gạch lát cần mua', 'Tiết 3: Lập dự toán chi phí', 'Tiết 4: Thuyết trình phương án tối ưu', 'Tiết 5: Đánh giá dự án']
  },
  34: {
    title: 'Bài 34: Ôn tập cuối năm: Số tự nhiên, Phân số, Số thập phân và Chuyển động đều',
    theme: 'Ôn tập cuối năm',
    focus: 'Tổng hợp toàn diện hệ thống số học và bài toán chuyển động đều Tiểu học.',
    periods: ['Tiết 1: Ôn tập số tự nhiên và phân số', 'Tiết 2: Ôn tập số thập phân và bốn phép tính', 'Tiết 3: Ôn tập toán chuyển động đều', 'Tiết 4: Ôn tập toán tỉ số phần trăm', 'Tiết 5: Luyện đề tổng hợp 1']
  },
  35: {
    title: 'Bài 35: Ôn tập cuối năm toàn diện & Đánh giá tổng hợp Toán Tiểu học',
    theme: 'Tổng kết Toán Lớp 5',
    focus: 'Ôn tập hình học (chu vi, diện tích, thể tích), đo lường, kiểm tra đánh giá hoàn thành chương trình Tiểu học.',
    periods: ['Tiết 1: Ôn tập chu vi, diện tích tam giác, thang, tròn', 'Tiết 2: Ôn tập diện tích, thể tích hình khối', 'Tiết 3: Kiểm tra đánh giá cuối năm', 'Tiết 4: Chữa bài kiểm tra', 'Tiết 5: Lễ vinh danh tốt nghiệp môn Toán']
  }
};

export function getMath35Weeks(grade: string): SubjectCurriculumWeekDetailed[] {
  let mapData = MATH_GRADE_1;
  if (grade === 'Lớp 2') mapData = MATH_GRADE_2;
  else if (grade === 'Lớp 3') mapData = MATH_GRADE_3;
  else if (grade === 'Lớp 4') mapData = MATH_GRADE_4;
  else if (grade === 'Lớp 5') mapData = MATH_GRADE_5;

  return Array.from({ length: 35 }, (_, idx) => {
    const week = idx + 1;
    const semester: 1 | 2 = week <= 18 ? 1 : 2;
    const topic = mapData[week] || MATH_GRADE_1[week];

    const periods: CurriculumPeriod[] = topic.periods.map((pLabel, pIdx) => {
      const pNum = pIdx + 1;
      return {
        periodNumber: pNum,
        periodLabel: `Tiết ${pNum} (35 phút)`,
        lessonPart: pLabel,
        scope: `Tiết ${pNum}: ${pLabel}`,
        keyFocus: `${topic.focus} - Trọng tâm ${pLabel}`,
        pageRange: `Trang ${week * 3 + pNum} - ${week * 3 + pNum + 1}`,
        suggestedActivity: `Thao tác đồ dùng que tính/bảng con, chia sẻ nhóm đôi, thực hành giải bài tập SGK Toán ${grade} (Kết nối tri thức).`
      };
    });

    return {
      week,
      weekLabel: `Tuần ${week}`,
      semester,
      theme: topic.theme,
      lessonTitle: topic.title,
      allLessonsInWeek: topic.periods,
      periodCount: 5,
      sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'],
      periods,
      keyKnowledge: topic.focus,
      textbookPageRange: `Trang ${week * 3} - ${week * 3 + 6}`,
      suggestedGame: {
        name: week % 2 === 1 ? 'Vua Tính Nhẩm & Đua Xe Toán Học' : 'Vòng Quay Kỳ Diệu & Bắn Tên Toán Học',
        goal: 'Củng cố kỹ năng tính nhẩm nhanh, rèn phản xạ chính xác và tinh thần hợp tác nhóm.',
        materials: 'Bảng con, thẻ số, xúc xắc toán học.',
        rules: 'Giáo viên chiếu phép tính, các nhóm thi đua ghi đáp án đúng lên bảng con trong 10 giây.'
      },
      suggestedMethod: 'Phương pháp trực quan quy nạp, Dạy học nêu và giải quyết vấn đề, Phương pháp kiến tạo kết hợp trò chơi sư phạm.',
      suggestedScenario: `Tình huống mua sắm tại siêu thị mini, chia quà cho các bạn trong lớp học môn Toán ${grade}.`
    };
  });
}
