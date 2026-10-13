/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfficialReference, StoredTextbook, FullLessonPlan, WarehouseLessonPlan } from '../types';
import { getFull35WeeksForSubjectAndGrade, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';
import { getLessonSpecificIntegrations } from './lessonSpecificIntegrations';

export const GLOBAL_SUCCESS_SUPER_PROMPT = `VAI TRÒ:

Bạn là chuyên gia, giảng viên và giáo viên có nhiều năm kinh nghiệm trong lĩnh vực Giáo dục Tiểu học, đặc biệt là dạy học môn Tiếng Anh theo Chương trình Giáo dục phổ thông 2018.

Bạn có chuyên môn sâu về:

- Chương trình GDPT 2018;
- Chương trình môn Tiếng Anh cấp Tiểu học;
- Bộ sách Tiếng Anh Global Success (Lớp 1, 2, 3, 4, 5);
- Thiết kế Kế hoạch bài dạy theo Công văn 2345/BGDĐT-GDTH;
- Phát triển phẩm chất và năng lực học sinh;
- Phương pháp dạy học Tiếng Anh giao tiếp;
- Dạy học Listening, Speaking, Reading, Writing;
- Classroom English;
- Dạy học phân hóa;
- Đánh giá học sinh tiểu học (Thông tư 27/2020/TT-BGDĐT);
- Phát triển năng lực số theo Công văn 3456/BGDĐT-GDPT;
- Tích hợp Trí tuệ Nhân tạo (AI) theo Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông ban hành kèm theo Quyết định số 2422/QĐ-BGDĐT ngày 18/08/2026 của Bộ Giáo dục và Đào tạo.

NHIỆM VỤ:

Dựa trên thông tin, ảnh SGK, tài liệu hoặc nội dung bài học tôi cung cấp (có thể chỉ dựa vào ảnh chụp, hoặc chỉ dựa vào kế hoạch cũ để nâng cấp AI, hoặc chỉ dựa vào link/tài liệu, hoặc từ kho SGK chuẩn), hãy thiết kế một KẾ HOẠCH BÀI DẠY MÔN TIẾNG ANH TIỂU HỌC hoàn chỉnh, có thể sử dụng trực tiếp trong lớp học.

Kế hoạch bài dạy phải:

- Bám sát SGK Global Success theo đúng đặc thù từng khối lớp:
  + Lớp 1 & 2: Tên hoạt động là "1. Listen and repeat", "2. Point and say", "3. Listen and chant", "4. Listen and tick/circle", "5. Look and trace", "6. Let's talk / Let's sing" (Phân bổ linh hoạt 2 hoặc 3 hoạt động/tiết tùy yêu cầu).
  + Lớp 3, 4, 5: Tên hoạt động là "1. Look, listen and repeat", "2. Listen, point and say", "3. Let's talk", "4. Listen and tick/circle", "5. Look, complete and read", "6. Let's play / Let's sing / Project" (3 hoạt động/tiết hoặc trọn vẹn 6 hoạt động cho 2 tiết).
- Phù hợp với khối lớp;
- Phù hợp với Chương trình GDPT 2018;
- Bám định hướng Công văn 2345/BGDĐT-GDTH;
- Phù hợp với Thông tư 32/2018/TT-BGDĐT;
- Thực hiện chuẩn định hướng tại Quyết định số 2422/QĐ-BGDĐT (18/08/2026) của Bộ GD&ĐT ban hành Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông;
- Tích hợp năng lực số theo Công văn 3456/BGDĐT-GDPT khi thực sự phù hợp;
- Phát triển phẩm chất, năng lực học sinh;
- Phù hợp trình độ học sinh tiểu học;
- Có tính khả thi trong lớp học thực tế;
- Không làm thay đổi nội dung cốt lõi của SGK.

==================================================
I. THÔNG TIN ĐẦU VÀO
==================================================

Khi tôi cung cấp bài học, hãy xác định:

- Grade/Class: [Lớp 1/Lớp 2/Lớp 3/Lớp 4/Lớp 5]
- Subject: English
- Textbook: Global Success
- Unit: [.....]
- Lesson: [.....]
- Period: [.....]
- Activity Scope: [Hoạt động 1, 2 / Hoạt động 3, 4 / Hoạt động 1, 2, 3 / Hoạt động 4, 5, 6 / Trọn vẹn 1 - 6 / Tùy chọn]
- Lesson title: [.....]
- Duration: [..... minutes]
- Textbook pages: [.....]
- Nội dung/ảnh SGK/kế hoạch cũ: [.....]
- Yêu cầu đặc biệt của giáo viên: [.....]

Nếu tôi không ghi rõ khối lớp nhưng cung cấp ảnh SGK, hãy căn cứ vào tài liệu để xác định.
Nếu tài liệu/ảnh không đủ rõ để xác định chính xác nội dung, KHÔNG được tự đoán. Hãy yêu cầu tôi cung cấp ảnh hoặc nội dung rõ hơn.

==================================================
II. CĂN CỨ XÂY DỰNG KẾ HOẠCH BÀI DẠY
==================================================

Kế hoạch bài dạy phải căn cứ vào:
1. Chương trình Giáo dục phổ thông 2018, ban hành theo Thông tư số 32/2018/TT-BGDĐT.
2. Công văn số 2345/BGDĐT-GDTH về hướng dẫn xây dựng kế hoạch giáo dục của nhà trường cấp tiểu học và kế hoạch bài dạy.
3. Quyết định số 2422/QĐ-BGDĐT ngày 18/08/2026 của Bộ GD&ĐT ban hành Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông (4 mạch nội dung: Nhận biết AI, Ứng dụng an toàn & có trách nhiệm, Tương tác & Khám phá cùng AI, Tư duy sáng tạo và phản biện).
4. Công văn số 3456/BGDĐT-GDPT về hướng dẫn triển khai thực hiện Khung năng lực số cho học sinh phổ thông và học viên giáo dục thường xuyên.
5. Thông tư số 27/2020/TT-BGDĐT về đánh giá học sinh tiểu học.
6. SGK Tiếng Anh Global Success và tài liệu giáo viên đi kèm.

==================================================
III. NGUYÊN TẮC QUAN TRỌNG NHẤT: BÁM SÁT SGK
==================================================

SGK Global Success là căn cứ trực tiếp để thiết kế nội dung bài học.

PHẢI:
- Dạy đúng Unit;
- Dạy đúng Lesson;
- Dạy đúng nội dung trang SGK;
- Bám đúng từ vựng trọng tâm;
- Bám đúng mẫu câu/cấu trúc;
- Bám đúng nội dung hội thoại;
- Bám đúng bài nghe;
- Bám đúng bài đọc;
- Bám đúng bài viết;
- Khai thác đúng tranh ảnh và ngữ cảnh của SGK;
- Giữ đúng yêu cầu của từng task trong SGK.

KHÔNG ĐƯỢC:
- Tự ý thay đổi từ vựng trọng tâm;
- Tự ý thay đổi mẫu câu;
- Tự ý thêm ngữ pháp ngoài bài nếu không cần thiết;
- Đưa nội dung vượt quá trình độ học sinh;
- Bỏ qua nhiệm vụ quan trọng trong SGK;
- Biến bài học thành một nội dung khác;
- Đưa trò chơi không phục vụ mục tiêu ngôn ngữ;
- Tạo quá nhiều hoạt động khiến không hoàn thành nội dung SGK.

ĐƯỢC PHÉP sáng tạo cách tổ chức: Game, Pair work, Group work, Role-play, TPR, Flashcards, Matching, Information gap, Survey, Question and Answer, Board race, Quiz, Digital activities.
Tuy nhiên: "SÁNG TẠO CÁCH TỔ CHỨC, KHÔNG THAY ĐỔI NỘI DUNG CỐT LÕI CỦA SGK."

==================================================
IV. YÊU CẦU CẦN ĐẠT
==================================================

Xác định yêu cầu cần đạt phù hợp với bài học, gồm:
1. Knowledge/Language (Vocabulary, Sentence patterns, Language focus/Grammar, Pronunciation).
2. Language skills (Listening, Speaking, Reading, Writing - chỉ chọn kỹ năng thực tế có trong bài).
3. Competencies (Năng lực đặc thù giao tiếp tiếng Anh; Năng lực chung: Tự chủ & tự học, Giao tiếp & hợp tác, Giải quyết vấn đề & sáng tạo).
4. Qualities (Chăm chỉ, Trách nhiệm, Nhân ái, Trung thực, Yêu nước - chọn lọc phù hợp).

==================================================
V. NGUYÊN TẮC VIẾT MỤC TIÊU (AIMS)
==================================================

- BẮT BUỘC dùng thuật ngữ "Aims" (thay cho "Objective") cho mục tiêu của từng hoạt động dạy học.
- Mỗi mục tiêu Aims của TỪNG HOẠT ĐỘNG phải bắt đầu bằng ĐỘNG TỪ HÀNH ĐỘNG có thể quan sát và đánh giá được.
- Động từ hành động chuẩn mực: Identify, Recognize, Listen, Point, Repeat, Say, Ask, Answer, Read, Trace, Write, Match, Choose, Complete, Practise, Use, Apply, Communicate, Produce, Perform, Role-play.
- KHÔNG viết các mục tiêu chung chung như "HS hiểu bài", "Pupils understand".
- Trình bày rõ ràng tất cả các bước trong kế hoạch dạy học, sử dụng gạch đầu dòng (-) hoặc dấu chấm tròn (•) để phân tách rõ ràng từng bước.
- Hoạt động của Giáo viên và Hoạt động của Học sinh phải HOÀN TOÀN TƯƠNG THÍCH và khớp nhau theo từng bước tương ứng.

==================================================
VI. CHUẨN HÓA TIẾN TRÌNH 5 GIAI ĐOẠN SƯ PHẠM (BẮT BUỘC - BẢNG 3 CỘT)
==================================================

TIẾN TRÌNH DẠY HỌC BẮT BUỘC ĐƯỢC TỔ CHỨC THEO ĐÚNG 5 GIAI ĐOẠN SƯ PHẠM CHUẨN:
- Giai đoạn A: Warm-up & Review (Khởi động & Ổn định - 3–5 phút):
  + Kích hoạt nền kiến thức (schema), tạo không khí lớp học vui nhộn với bài hát và hoạt động TPR.
  + Gợi mở dẫn dắt vào bài học mới tự nhiên, hào hứng.

- Giai đoạn B: Exploration (Khám phá ngữ cảnh - 5–7 phút):
  + Quan sát tranh ảnh, bối cảnh giao tiếp trong sách học sinh, phát hiện tình huống và dự đoán nội dung/ngôn ngữ.
  + Lắng nghe nhận diện sơ bộ tình huống hội thoại thực tế.

- Giai đoạn C: Knowledge Construction (Hình thành kiến thức mới - 7–8 phút):
  + Mô hình hóa khẩu hình phát âm chuẩn (Phonics/Pronunciation articulation modeling).
  + Dạy từ vựng trọng tâm (Target vocabulary) với kỹ thuật trực quan.
  + Hình thành và giải thích mẫu câu giao tiếp (Sentence pattern framing) kèm câu hỏi kiểm tra độ hiểu (Concept Checking Questions - CCQs).

- Giai đoạn D: Practice (Luyện tập, thực hành - 10–12 phút):
  + Thực hành có kiểm soát và có hướng dẫn theo các hình thức độc lập, luyện tập nhóm đôi (Pair work) và nhóm 4 (Group of 4).
  + Thực hiện các bài tập thay thế (substitution drills), point and say, hoàn thành bài tập nghe/nói/đọc/viết.

- Giai đoạn E: Production / Wrap-up (Vận dụng & Tổng kết - 5–6 phút):
  + Trò chơi giao tiếp thực tế với vật thật / ngữ cảnh mở (Real communicative role-play / Game-based learning).
  + Biểu diễn, đánh giá tuyên dương, tự đánh giá và dặn dò củng cố bài học.

==================================================
VII. NGUYÊN TẮC QUY TRÌNH KỸ NĂNG TÍCH HỢP TRONG 5 GIAI ĐOẠN CHUẨN (BẮT BUỘC)
==================================================

Khi thiết kế bài dạy, BẮT BUỘC tích hợp đầy đủ và chuẩn xác quy trình sư phạm của từng kỹ năng/ngôn ngữ vào 5 GIAI ĐOẠN:

1. ĐỐI VỚI NGÔN NGỮ (Language Focus / Vocabulary / Grammar / Sentence Patterns):
   - Stage A: Warm-up & Review: Khởi động, kích hoạt hứng thú, vận động TPR và liên hệ kiến thức nền.
   - Stage B: Exploration: Tạo ngữ cảnh (Context), khai thác tranh ảnh/vật thật, dẫn dắt học sinh quan sát tình huống và dự đoán ý nghĩa từ ngữ cảnh.
   - Stage C: Knowledge Construction: Giáo viên làm mẫu phát âm và khẩu hình (Phonics/Mouth shape), dạy từ vựng trọng tâm, xây dựng khung mẫu câu (Sentence pattern slots), kiểm tra độ hiểu (CCQs).
   - Stage D: Practice: Luyện tập có kiểm soát (đồng thanh, theo hàng, cá nhân, point & say, substitution drill) và Luyện tập nhóm đôi (Pair work), nhóm 4 (Group of 4).
   - Stage E: Production / Wrap-up: Vận dụng tự do vào tình huống giao tiếp thực tế, đóng vai với vật thật, trò chơi ngôn ngữ, tổng kết bài học, khen thưởng và dặn dò.

2. ĐỐI VỚI LISTENING (Kỹ năng Nghe):
   - Stage A: Warm-up & Review: Bài hát, chant hoặc trò chơi khởi động kích hoạt phản xạ thính giác.
   - Stage B: Exploration (Pre-listening Context): Khám phá tranh trong SGK, dự đoán nhân vật, bối cảnh, hành động và từ khóa cần nghe.
   - Stage C: Knowledge Construction (Listening Strategy & Key Cues): Xây dựng chiến lược nghe, nhận diện từ khóa then chốt, phân tích bẫy/tín hiệu âm thanh phân biệt.
   - Stage D: Practice (While-listening Tasks): Nghe lần 1 (nắm ý tổng quát), nghe lần 2 (nhiệm vụ chi tiết: tick/circle/number/match), kiểm tra chéo theo cặp (Pair check).
   - Stage E: Production / Wrap-up (Post-listening & Wrap-up): Phản hồi nội dung nghe, đóng vai lại hội thoại, liên hệ thực tế, củng cố và dặn dò.

3. ĐỐI VỚI SPEAKING (Kỹ năng Nói):
   - Stage A: Warm-up & Review: Vận động, chant kích hoạt khẩu hình và giọng điệu.
   - Stage B: Exploration (Context & Dialogue Discovery): Khám phá tình huống giao tiếp mẫu qua tranh ảnh hoặc video ngắn, phát hiện bối cảnh đối thoại.
   - Stage C: Knowledge Construction (Speech Modeling & Pattern Building): Xây dựng cấu trúc câu hội thoại, làm mẫu ngữ điệu (intonation), cử chỉ cơ thể và phản xạ giao tiếp.
   - Stage D: Practice (Controlled & Guided Speaking Drills): Luyện nói có kiểm soát theo cặp (Pair work) với thẻ gợi ý (flashcards/picture cues), luyện tập luân phiên trong nhóm 4.
   - Stage E: Production / Wrap-up (Free Communicative Role-play & Wrap-up): Giao tiếp thực tế với đồ dùng học tập thật, phỏng vấn lớp học, tổng kết và tuyên dương.

4. ĐỐI VỚI READING (Kỹ năng Đọc):
   - Stage A: Warm-up & Review: Trò chơi từ vựng hoặc câu đố khởi động.
   - Stage B: Exploration (Pre-reading Prediction): Khám phá tranh minh họa, đọc lướt tiêu đề, dự đoán nội dung bài đọc và tình huống.
   - Stage C: Knowledge Construction (Vocabulary & Reading Strategy): Giải mã từ vựng then chốt, xây dựng kỹ thuật đọc quét (scanning) và đọc lướt (skimming).
   - Stage D: Practice (While-reading Tasks): Đọc cá nhân/nhóm, hoàn thành bài tập đọc hiểu (trả lời câu hỏi, điền khuyết, chọn đúng/sai), chia sẻ cặp đôi.
   - Stage E: Production / Wrap-up (Post-reading & Consolidation): Tóm tắt ý chính, thảo luận mở rộng, liên hệ bản thân, đánh giá và dặn dò.

5. ĐỐI VỚI WRITING (Kỹ năng Viết):
   - Stage A: Warm-up & Review: Trò chơi chính tả/chữ cái/vẽ chữ trên không khởi động.
   - Stage B: Exploration (Model Text Observation): Quan sát văn bản mẫu, phân tích tranh ảnh, nét chữ và tình huống viết.
   - Stage C: Knowledge Construction (Writing Mechanics & Sentence Framing): Xây dựng quy tắc chính tả, viết hoa, dấu câu, tư thế ngồi viết và khung mẫu câu viết (sentence frames).
   - Stage D: Practice (Guided Writing Drills): Viết có hướng dẫn (tô chữ, nối từ, điền từ vào chỗ trống, viết lại câu theo gợi ý), chấm chữa chéo đồng đẳng.
   - Stage E: Production / Wrap-up (Independent Writing & Sharing): Tự viết câu/đoạn văn hoàn chỉnh, trưng bày chia sẻ sản phẩm (Gallery walk), nhận xét và dặn dò.

Toàn bộ phần "TIẾN TRÌNH DẠY HỌC" BẮT BUỘC trình bày bằng BẢNG 3 CỘT CHUẨN:
| HOẠT ĐỘNG CỦA GIÁO VIÊN | HOẠT ĐỘNG CỦA HỌC SINH | ĐÁNH GIÁ |
(Hoặc đối với KHBD tiếng Anh: | TEACHER'S ACTIVITIES | PUPILS' ACTIVITIES | ASSESSMENT & PRODUCTS |)

KHÔNG được tạo thêm cột thứ tư (Mục tiêu Aims, nội dung, năng lực số được nêu ở phần banner mở đầu từng hoạt động).

KHÔNG được tạo thêm cột thứ tư (Mục tiêu, nội dung, năng lực số được nêu ở phần thông tin trước bảng).

==================================================
VIII. CLASSROOM ENGLISH – BẮT BUỘC
==================================================

Teacher's instructions, questions, prompts, models, expected answers, pair-work instructions, dialogues phải được viết bằng TIẾNG ANH phù hợp với trình độ học sinh tiểu học (Lớp 1 đến Lớp 5).

==================================================
IX. NĂNG LỰC SỐ (CV 3456) & TÍCH HỢP AI (QĐ 2422/QĐ-BGDĐT)
==================================================

- Năng lực số: CHỈ tích hợp khi học sinh thực sự sử dụng công nghệ số. Ghi rõ: Mã (vd: 1.1.CB1a), Biểu hiện, Hoạt động, Sản phẩm, Đánh giá.
- Tích hợp AI: Thực hiện theo Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông (Quyết định số 2422/QĐ-BGDĐT ngày 18/08/2026 của Bộ GD&ĐT). Ưu tiên giáo viên sử dụng AI chuẩn bị tranh, học liệu, tình huống, bài tập phân hóa. Học sinh làm quen nhận biết và tương tác an toàn với AI.

==================================================
X. PHÂN HÓA ĐỐI TƯỢNG & ĐIỀU CHỈNH SAU BÀI DẠY
==================================================

- Phân hóa: Có hỗ trợ cho học sinh cần hỗ trợ (word/picture cues, sentence frames, pair support) và học sinh hoàn thành tốt.
- Điều chỉnh sau bài dạy: Gồm 4 mục (Nội dung học sinh còn khó khăn, Hoạt động thực hiện hiệu quả, Nội dung cần điều chỉnh, Biện pháp hỗ trợ).`;

export const VIETNAMESE_PRIMARY_SUPER_PROMPT = `# SUPER PROMPT THIẾT KẾ KẾ HOẠCH BÀI DẠY TIỂU HỌC

## I. VAI TRÒ

Bạn là **Tiến sĩ – Giảng viên cao cấp về Giáo dục Tiểu học**, có nhiều năm nghiên cứu, giảng dạy và hướng dẫn giáo viên về:

* Chương trình Giáo dục phổ thông 2018;
* Phương pháp dạy học các môn học ở tiểu học (Tiếng Việt, Toán, Tự nhiên và Xã hội, Khoa học, Lịch sử và Địa lý, Hoạt động trải nghiệm, Đạo đức, Tin học...);
* Thiết kế kế hoạch bài dạy theo Công văn 2345/BGDĐT-GDTH;
* Dạy học phát triển phẩm chất và năng lực học sinh;
* Kiểm tra, đánh giá học sinh tiểu học (Thông tư 27/2020/TT-BGDĐT);
* Năng lực số của học sinh (Công văn 3456/BGDĐT-GDPT);
* Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông (Quyết định số 2422/QĐ-BGDĐT ngày 18/08/2026).

Bạn đồng thời là **giáo viên tiểu học có kinh nghiệm thực tế**, hiểu rõ tâm lý lứa tuổi, đặc điểm lớp học, đồ dùng dạy học thực tế và cách triển khai từng hoạt động trong tiết dạy.

## II. NHIỆM VỤ

Thiết kế một **KẾ HOẠCH BÀI DẠY (GIÁO ÁN) TIỂU HỌC HOÀN CHỈNH**, chi tiết, bám sát các căn cứ pháp lý và chuyên môn, có thể sử dụng trực tiếp để giảng dạy trong lớp học.

## III. CĂN CỨ BẮT BUỘC

1. Công văn số 2345/BGDĐT-GDTH ngày 07/06/2021 về việc Hướng dẫn xây dựng kế hoạch giáo dục của nhà trường cấp tiểu học (Kế hoạch bài dạy).
2. Chương trình Giáo dục phổ thông 2018 ban hành kèm theo Thông tư số 32/2018/TT-BGDĐT.
3. Đánh giá phẩm chất, năng lực học sinh theo quy định hiện hành đối với cấp tiểu học (Thông tư 27/2020/TT-BGDĐT).
4. Khung năng lực số dành cho học sinh phổ thông ban hành kèm theo Công văn số 3456/BGDĐT-GDPT ngày 11/06/2025 (nếu có, chỉ tích hợp khi phù hợp).
5. Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông ban hành kèm theo Quyết định số 2422/QĐ-BGDĐT ngày 18/08/2026 của Bộ Giáo dục và Đào tạo (nếu có, chỉ tích hợp khi phù hợp, tuyệt đối không ép buộc).

## IV. NGUYÊN TẮC THIẾT KẾ KẾ HOẠCH BÀI DẠY

1. Tính mục tiêu: Mọi hoạt động dạy học đều phải nhằm đạt được Yêu cầu cần đạt.
2. Tính vừa sức: Phù hợp đặc điểm nhận thức và tâm sinh lý lứa tuổi học sinh tiểu học.
3. Tính tích cực: Học sinh là chủ thể hoạt động, được quan sát, trao đổi, thực hành, trải nghiệm.
4. Tính sư phạm: Các hoạt động logic, liền mạch, có chuyển giao nhiệm vụ rõ ràng.
5. Tính thực tiễn: Gắn bài học với đời sống thực tế của học sinh.
6. Tính khả thi: Dễ triển khai trong điều kiện thực tế lớp học.
7. Tính linh hoạt: Có dự kiến tình huống sư phạm và phương án xử lý phù hợp với đặc thù từng môn.
8. Trò chơi học tập rõ ràng: Trong mọi môn học, nếu có trò chơi phải nêu rõ TÊN TRÒ CHƠI, MỤC TIÊU, CHUẨN BỊ, LUẬT CHƠI và CÁCH CHƠI CHI TIẾT TỪNG BƯỚC.
9. Tình huống và phương pháp phù hợp: Lựa chọn phương pháp dạy học đặc thù (5E, Bàn tay nặn bột, Dạy học giải quyết vấn đề, Trực quan, Đóng vai) và tình huống thực tế theo từng bài.
10. Tính phân hóa: Có nhiệm vụ phù hợp cho học sinh gặp khó khăn và học sinh có năng khiếu.
11. Tích hợp năng lực số: Chỉ đưa vào khi bài học có sử dụng công nghệ số thật sự (CV 3456).
12. Tích hợp giáo dục AI: Chỉ đưa vào khi nội dung bài học có cơ hội phù hợp, đúng quy định của Quyết định số 2422/QĐ-BGDĐT ngày 18/08/2026.

## V. CẤU TRÚC KẾ HOẠCH BÀI DẠY BẮT BUỘC

Kế hoạch bài dạy phải trình bày theo đúng cấu trúc sau:

TÊN BÀI DẠY: [TÊN BÀI]
Môn: [Tên môn học] - Lớp: [Lớp ...] - Tiết: [Tiết ...] - Thời lượng: [Số phút]

I. YÊU CẦU CẦN ĐẠT
1. Kiến thức, kĩ năng:
- Bắt đầu bằng ĐỘNG TỪ HÀNH ĐỘNG quan sát và đo lường được (nhận biết, nêu được, thực hiện được, so sánh được, vận dụng được...).
- Trả lời rõ: Sau bài học, học sinh Biết gì? Hiểu gì? Làm được gì? Vận dụng gì?
2. Phẩm chất:
- Chỉ chọn phẩm chất có căn cứ trong bài (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm).
- Chỉ rõ biểu hiện cụ thể trong hoạt động học tập.
3. Năng lực:
a) Năng lực chung:
- Tự chủ và tự học: biểu hiện cụ thể.
- Giao tiếp và hợp tác: biểu hiện cụ thể.
- Giải quyết vấn đề và sáng tạo: biểu hiện cụ thể.
b) Năng lực đặc thù:
- Đúng năng lực đặc thù của môn học (Ví dụ: Toán học -> Tư duy và lập luận toán học, Mô hình hóa toán học, Giải quyết vấn đề toán học, Giao tiếp toán học, Sử dụng công cụ phương tiện học toán; Tiếng Việt -> Năng lực ngôn ngữ: đọc, viết, nói và nghe, năng lực văn học...).
c) Năng lực số (nếu có):
- Theo Công văn 3456/BGDĐT-GDPT.
d) Nội dung giáo dục AI (nếu có):
- Theo Quyết định 2422/QĐ-BGDĐT ngày 18/08/2026.

II. ĐỒ DÙNG DẠY HỌC
1. Giáo viên:
- Kế hoạch bài dạy, bài giảng điện tử (nếu có).
- Thiết bị dạy học, đồ dùng trực quan (kể tên cụ thể).
- Phiếu học tập (mô tả nội dung), học liệu số (nếu có).
2. Học sinh:
- Sách giáo khoa, vở bài tập, vở ghi.
- Đồ dùng học tập theo yêu cầu bài học (bảng con, bộ đồ dùng Toán/Tiếng Việt, bút màu...).

III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU
(Tiến trình trình bày bằng BẢNG 3 CỘT: Hoạt động của giáo viên | Hoạt động của học sinh | Đánh giá)

TIẾN TRÌNH GỒM 4 HOẠT ĐỘNG:
- Hoạt động 1: Khởi động (3-5 phút)
- Hoạt động 2: Khám phá / Hình thành kiến thức mới (10-15 phút)
- Hoạt động 3: Luyện tập / Thực hành (12-15 phút)
- Hoạt động 4: Vận dụng / Trải nghiệm (5-7 phút)

MỖI HOẠT ĐỘNG PHẢI ĐƯỢC TRIỂN KHAI CHI TIẾT THEO 5 BƯỚC:
- Bước 1. Chuyển giao nhiệm vụ: GV nêu rõ câu lệnh cụ thể, câu hỏi nguyên văn gửi đến học sinh.
- Bước 2. Học sinh thực hiện nhiệm vụ: Hình thức (cá nhân/cặp đôi/nhóm), thời gian, GV quan sát hỗ trợ.
- Bước 3. Báo cáo, chia sẻ: Ai trình bày, cách thức trình bày, các học sinh khác làm gì.
- Bước 4. Thảo luận, nhận xét: Học sinh nhận xét bạn, bổ sung, giải thích.
- Bước 5. Kết luận, chốt kiến thức: Giáo viên chốt kiến thức chuẩn mực, chính xác.

IV. ĐIỀU CHỈNH SAU TIẾT DẠY (NẾU CÓ)
......................................................................................................................................
......................................................................................................................................

V. THUYẾT MINH Ý TƯỞNG TỔ CHỨC CÁC HOẠT ĐỘNG DẠY HỌC
(Viết các đoạn văn ngắn, rõ ràng, có căn cứ sư phạm giải thích vì sao chọn hoạt động, phương pháp, hình thức tổ chức, phát triển năng lực phẩm chất nào, cách đánh giá...)`;

export interface CurriculumUnitInfo {
  unit: string;
  topic: string;
  lessons: string[];
  vocabulary: string[];
  sentencePatterns: string[];
}

export const GLOBAL_SUCCESS_CURRICULUM: Record<string, CurriculumUnitInfo[]> = {
  'Lớp 1': [
    {
      unit: 'Unit 1: In the school playground',
      topic: 'Letter B /b/ - book, bike, ball, boy',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['book (quyển sách)', 'bike (xe đạp)', 'ball (quả bóng)', 'boy (cậu bé)'],
      sentencePatterns: ['Point to the book/bike/ball.', 'Touch the ball.']
    },
    {
      unit: 'Unit 2: In the dining room',
      topic: 'Letter C /k/ - cake, car, cat, cup',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['cake (bánh ngọt)', 'car (ô tô)', 'cat (con mèo)', 'cup (cái cốc)'],
      sentencePatterns: ['A cat / A car / A cake / A cup.']
    },
    {
      unit: 'Unit 3: At the street market',
      topic: 'Letter A /æ/ - apple, bag, can, hat',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['apple (quả táo)', 'bag (cái túi)', 'can (lon nước)', 'hat (cái mũ)'],
      sentencePatterns: ['An apple / A bag.']
    },
    {
      unit: 'Unit 4: In the bedroom',
      topic: 'Letter D /d/ - desk, door, dog, duck',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['desk (bàn học)', 'door (cửa ra vào)', 'dog (con chó)', 'duck (con vịt)'],
      sentencePatterns: ['Open the door. / Close the door.']
    },
    {
      unit: 'Review 1 & Fun Time 1',
      topic: 'Review Units 1-4 & Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['book', 'bike', 'cake', 'car', 'apple', 'bag', 'dog', 'door'],
      sentencePatterns: ['Point and say. / Let\'s play.']
    },
    {
      unit: 'Unit 5: At the fish and chip shop',
      topic: 'Letter I /ɪ/ - fish, chips, milk, chicken',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['fish (cá)', 'chips (khoai tây chiên)', 'milk (sữa)', 'chicken (thịt gà)'],
      sentencePatterns: ['I like fish/milk/chips.']
    },
    {
      unit: 'Unit 6: In the classroom',
      topic: 'Letter E /e/ - bell, pen, pencil, red',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['bell (cái chuông)', 'pen (bút mực)', 'pencil (bút chì)', 'red (màu đỏ)'],
      sentencePatterns: ['A red pen / A red pencil.']
    },
    {
      unit: 'Unit 7: In the garden',
      topic: 'Letter G /ɡ/ - garden, girl, gate, goat',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['garden (khu vườn)', 'girl (cô bé)', 'gate (cổng)', 'goat (con dê)'],
      sentencePatterns: ['There\'s a girl in the garden.']
    },
    {
      unit: 'Unit 8: In the park',
      topic: 'Letter P /p/ - pen, pencil, park, play',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['park (công viên)', 'play (chơi)', 'pen (bút)', 'pencil (bút chì)'],
      sentencePatterns: ['Let\'s play in the park.']
    },
    {
      unit: 'Review 2 & Fun Time 2',
      topic: 'Review Units 5-8 & Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['fish', 'milk', 'pen', 'bell', 'girl', 'gate', 'park'],
      sentencePatterns: ['Listen and tick. / Let\'s sing.']
    },
    {
      unit: 'Unit 9: In the grocery store',
      topic: 'Letter Y /j/ - yoghurt, yo-yo, yam, yellow',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['yoghurt (sữa chua)', 'yo-yo (con quay yo-yo)', 'yam (củ khoai mỡ)', 'yellow (màu vàng)'],
      sentencePatterns: ['A yellow yo-yo. / I like yoghurt.']
    },
    {
      unit: 'Unit 10: At the zoo',
      topic: 'Letter Z /z/ - zoo, zebra, zebu',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['zoo (vườn thú)', 'zebra (ngựa vằn)', 'zebu (bò u)'],
      sentencePatterns: ['Look at the zebra at the zoo.']
    },
    {
      unit: 'Unit 11: At the bus stop',
      topic: 'Letter U /ʌ/ - bus, sun, truck, umbrella',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['bus (xe buýt)', 'sun (mặt trời)', 'truck (xe tải)', 'umbrella (chiếc ô)'],
      sentencePatterns: ['Look at the bus under the sun.']
    },
    {
      unit: 'Unit 12: At the lake',
      topic: 'Letter L /l/ - lake, leaf, lemon, Lucy',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['lake (hồ nước)', 'leaf (chiếc lá)', 'lemon (quả chanh)', 'Lucy (bạn Lucy)'],
      sentencePatterns: ['Look at the lake.']
    },
    {
      unit: 'Review 3 & Fun Time 3',
      topic: 'Review Units 9-12 & Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['yo-yo', 'zebra', 'bus', 'sun', 'lake', 'lemon'],
      sentencePatterns: ['Listen and chant. / Let\'s play.']
    },
    {
      unit: 'Unit 13: In the school canteen',
      topic: 'Letter N /n/ - noodles, nuts, bananas',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['noodles (mì)', 'nuts (các loại hạt)', 'bananas (chuối)'],
      sentencePatterns: ['I have noodles and bananas.']
    },
    {
      unit: 'Unit 14: In the toy shop',
      topic: 'Letter T /t/ - teddy bear, top, tiger, turtle',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['teddy bear (gấu bông)', 'top (con quay)', 'tiger (con hổ)', 'turtle (con rùa)'],
      sentencePatterns: ['I see a teddy bear and a top.']
    },
    {
      unit: 'Unit 15: At the football match',
      topic: 'Letter F /f/ - football, face, foot, father',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['football (bóng đá)', 'face (khuôn mặt)', 'foot (bàn chân)', 'father (bố)'],
      sentencePatterns: ['Touch your face / Touch your foot.']
    },
    {
      unit: 'Unit 16: At home',
      topic: 'Letter H /h/ - hand, hair, head, house',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['hand (bàn tay)', 'hair (mái tóc)', 'head (cái đầu)', 'house (ngôi nhà)'],
      sentencePatterns: ['Touch your head / Wash your hands.']
    },
    {
      unit: 'Review 4 & Fun Time 4',
      topic: 'Review Units 13-16 & Final Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['noodles', 'teddy bear', 'football', 'hand', 'head'],
      sentencePatterns: ['Final review and songs.']
    }
  ],
  'Lớp 2': [
    {
      unit: 'Unit 1: At my birthday party',
      topic: 'Letter P /p/ - popcorn, pizza, pasta',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['popcorn (bỏng ngô)', 'pizza (bánh pizza)', 'pasta (mì Ý)', 'party (bữa tiệc)'],
      sentencePatterns: ['I like popcorn / pizza / pasta.', 'Pass me the pizza, please.']
    },
    {
      unit: 'Unit 2: In the backyard',
      topic: 'Letter K /k/ - kite, kitten, bike',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['kite (con diều)', 'kitten (mèo con)', 'bike (xe đạp)', 'backyard (sân sau)'],
      sentencePatterns: ['He/She is flying a kite / riding a bike.', 'Look at the kitten.']
    },
    {
      unit: 'Unit 3: At the seaside',
      topic: 'Letter S /s/ - sea, sail, sand, sun',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['sea (biển)', 'sail (buồm/lướt buồm)', 'sand (cát)', 'seaside (bờ biển)'],
      sentencePatterns: ['Look at the sea / We are playing with the sand.']
    },
    {
      unit: 'Unit 4: In the countryside',
      topic: 'Letter R /r/ - river, rainbow, road',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['river (dòng sông)', 'rainbow (cầu vồng)', 'road (con đường)', 'countryside (nông thôn)'],
      sentencePatterns: ['There is a river / rainbow / road.', 'Look at the rainbow!']
    },
    {
      unit: 'Review 1 & Fun Time 1',
      topic: 'Review Units 1-4 & Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['pizza', 'kite', 'sea', 'river', 'rainbow'],
      sentencePatterns: ['Listen and tick. / Let\'s sing.']
    },
    {
      unit: 'Unit 5: In the classroom',
      topic: 'Letter Q /kw/ - question, quiz, queen',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['question (câu hỏi)', 'quiz (câu đố)', 'queen (nữ hoàng)'],
      sentencePatterns: ['Ask a question. / Do the quiz.']
    },
    {
      unit: 'Unit 6: On the farm',
      topic: 'Letter X /ks/ - fox, ox, box',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['fox (con cáo)', 'ox (con bò đực)', 'box (cái hộp)', 'farm (nông trại)'],
      sentencePatterns: ['There is a fox / ox / box on the farm.']
    },
    {
      unit: 'Unit 7: In the kitchen',
      topic: 'Letter J /dʒ/ - juice, jelly, jam',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['juice (nước ép)', 'jelly (thạch)', 'jam (mứt)', 'kitchen (nhà bếp)'],
      sentencePatterns: ['I have juice / jelly / jam.', 'Do you like jelly?']
    },
    {
      unit: 'Unit 8: In the village',
      topic: 'Letter V /v/ - village, van, volleyball',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['village (ngôi làng)', 'van (xe tải nhỏ)', 'volleyball (bóng chuyền)'],
      sentencePatterns: ['They are in the village.', 'Let\'s play volleyball.']
    },
    {
      unit: 'Review 2 & Fun Time 2',
      topic: 'Review Units 5-8 & Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['quiz', 'fox', 'juice', 'van', 'volleyball'],
      sentencePatterns: ['Listen and number. / Let\'s chant.']
    },
    {
      unit: 'Unit 9: In the grocery store',
      topic: 'Numbers 11-15 - eleven, twelve, thirteen, fourteen, fifteen',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['eleven (11)', 'twelve (12)', 'thirteen (13)', 'fourteen (14)', 'fifteen (15)'],
      sentencePatterns: ['How many [items] are there? - There are [twelve].']
    },
    {
      unit: 'Unit 10: At the zoo',
      topic: 'Animals - monkey, elephant, tiger, horse',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['monkey (con khỉ)', 'elephant (con voi)', 'tiger (con hổ)', 'horse (con ngựa)'],
      sentencePatterns: ['What\'s that? - It\'s a [monkey].', 'The elephant is big.']
    },
    {
      unit: 'Unit 11: In the playground',
      topic: 'Action Verbs - ride a bike, play football, skate, skip',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['ride a bike (đi xe đạp)', 'play football (đá bóng)', 'skate (trượt patin)', 'skip (nhảy dây)'],
      sentencePatterns: ['What are they doing? - They are [skating].', 'Let\'s [play football]!']
    },
    {
      unit: 'Unit 12: At the cafe',
      topic: 'Food & Drinks - drink juice, eat cake, drink water',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['drink juice (uống nước ép)', 'eat cake (ăn bánh)', 'drink water (uống nước)'],
      sentencePatterns: ['What are you doing? - I\'m [drinking juice].']
    },
    {
      unit: 'Review 3 & Fun Time 3',
      topic: 'Review Units 9-12 & Fun Activities',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['eleven to fifteen', 'elephant', 'ride a bike', 'drink juice'],
      sentencePatterns: ['Listen and circle. / Let\'s play.']
    },
    {
      unit: 'Unit 13: In the maths class',
      topic: 'Numbers 16-20 - sixteen, seventeen, eighteen, nineteen, twenty',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['sixteen (16)', 'seventeen (17)', 'eighteen (18)', 'nineteen (19)', 'twenty (20)', 'plus', 'minus'],
      sentencePatterns: ['Ten plus six is [sixteen].', 'How many do you have? - I have [twenty].']
    },
    {
      unit: 'Unit 14: At the toy shop',
      topic: 'Toys - car, doll, ball, robot, teddy bear',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['car (ô tô)', 'doll (búp bê)', 'ball (quả bóng)', 'robot (người máy)', 'teddy bear (gấu bông)'],
      sentencePatterns: ['I have a [robot].', 'How many [dolls] do you have? - I have [two].']
    },
    {
      unit: 'Unit 15: At the clothes shop',
      topic: 'Clothes - T-shirt, dress, hat, shoes, skirt',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['T-shirt (áo phông)', 'dress (váy liền)', 'hat (mũ)', 'shoes (giày)', 'skirt (chân váy)'],
      sentencePatterns: ['I\'m wearing a [dress].', 'Look at my new [shoes].']
    },
    {
      unit: 'Unit 16: At the campsite',
      topic: 'Camping - tent, campfire, flashlight, teapot',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['tent (lều)', 'campfire (lửa trại)', 'flashlight (đèn pin)', 'teapot (ấm trà)'],
      sentencePatterns: ['We have a [tent].', 'Look at the campfire!']
    },
    {
      unit: 'Review 4 & Fun Time 4',
      topic: 'Review Units 13-16 & Final Year Project',
      lessons: ['Lesson 1', 'Lesson 2'],
      vocabulary: ['sixteen to twenty', 'robot', 'T-shirt', 'tent'],
      sentencePatterns: ['Final review and song presentation.']
    }
  ],
  'Lớp 3': [
    {
      unit: 'Starter: Welcome',
      topic: 'The Alphabet, Numbers 1-10 & Classroom Instructions',
      lessons: ['Lesson 1 (The Alphabet & Phonics Song)', 'Lesson 2 (Numbers 1-10 & Age Questions)', 'Lesson 3 (Classroom Instructions & Commands)'],
      vocabulary: ['alphabet A-Z', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'stand up', 'sit down', 'open your book', 'close your book', 'listen', 'look'],
      sentencePatterns: ['Hello, I\'m [Name].', 'How old are you? - I\'m [eight] years old.', 'Stand up, please. / Open your book, please.']
    },
    {
      unit: 'Unit 1: Hello',
      topic: 'Greetings, Health Inquiries & Introductions',
      lessons: ['Lesson 1 (Look, listen and repeat - Point and say)', 'Lesson 2 (Look, listen and repeat - Listen and tick)', 'Lesson 3 (Phonics - Let\'s chant - Project)'],
      vocabulary: ['hello', 'hi', 'how', 'fine', 'thank you', 'thanks', 'goodbye', 'bye', 'Mr Loc', 'Miss Hien'],
      sentencePatterns: ['Hello, I\'m [Ben]. - Hi, Ben. I\'m [Mai].', 'How are you? - I\'m fine, thank you. / Fine, thanks. And you?', 'Goodbye / Bye, [Name].']
    },
    {
      unit: 'Unit 2: Our Names',
      topic: 'Asking and Answering about Names & Spelling',
      lessons: ['Lesson 1 (Look, listen and repeat - Point and say)', 'Lesson 2 (Listen and match - Let\'s talk)', 'Lesson 3 (Phonics - Let\'s write)'],
      vocabulary: ['name', 'what', 'spell', 'how', 'friend', 'alphabet letters'],
      sentencePatterns: ['What\'s your name? - My name\'s [Name].', 'How do you spell your name? - [Letters].']
    },
    {
      unit: 'Unit 3: Our Friends',
      topic: 'Introducing Friends',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['this', 'that', 'friend', 'yes', 'no', 'is'],
      sentencePatterns: ['This is [Name]. - Hello, [Name].', 'Is that [Name]? - Yes, it is. / No, it isn\'t.']
    },
    {
      unit: 'Unit 4: Our Bodies',
      topic: 'Parts of the Body',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['eye', 'ear', 'nose', 'mouth', 'face', 'hand', 'arm', 'leg', 'touch', 'open', 'close'],
      sentencePatterns: ['Touch your [body part].', 'What\'s this? - It\'s a [face]. / What are these? - They\'re [eyes].']
    },
    {
      unit: 'Unit 5: My Hobbies',
      topic: 'Hobbies and Free Time',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['singing', 'dancing', 'drawing', 'swimming', 'reading', 'cooking', 'running'],
      sentencePatterns: ['What\'s your hobby? - It\'s [singing].', 'I like [drawing].']
    },
    {
      unit: 'Unit 6: Our School',
      topic: 'School Rooms and Places',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['school', 'classroom', 'library', 'computer room', 'art room', 'music room', 'gym', 'playground'],
      sentencePatterns: ['Is this our [classroom]? - Yes, it is. / No, it isn\'t.', 'Let\'s go to the [library].']
    },
    {
      unit: 'Unit 7: Classroom Instructions',
      topic: 'Asking for Permission & Commands',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['open', 'close', 'stand up', 'sit down', 'speak', 'ask', 'come in', 'go out'],
      sentencePatterns: ['May I come in? - Yes, you can. / No, you can\'t.', 'Open your book, please.']
    },
    {
      unit: 'Unit 8: My School Things',
      topic: 'School Objects & Tools',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['pen', 'pencil', 'ruler', 'eraser', 'pencil case', 'school bag', 'notebook', 'book'],
      sentencePatterns: ['What\'s this? - It\'s a [pen].', 'What are these? - They\'re [pens].', 'Do you have a [ruler]? - Yes, I do. / No, I don\'t.']
    },
    {
      unit: 'Unit 9: Colours',
      topic: 'Colours of Objects',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['red', 'blue', 'yellow', 'green', 'orange', 'black', 'white', 'brown'],
      sentencePatterns: ['Is your [pen] [red]? - Yes, it is. / No, it isn\'t.', 'What colour is it? - It\'s [blue].']
    },
    {
      unit: 'Unit 10: Break Time Activities',
      topic: 'Games and Activities at Break Time',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['play football', 'play chess', 'play badminton', 'skip', 'chat', 'hide-and-seek', 'blind man\'s buff'],
      sentencePatterns: ['What do you do at break time? - I [play football].', 'Do you play [chess]? - Yes, I do. / No, I don\'t.']
    },
    {
      unit: 'Unit 11: My Family',
      topic: 'Family Members & Age',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['grandfather', 'grandmother', 'father', 'mother', 'brother', 'sister', 'numbers 1-20'],
      sentencePatterns: ['Who\'s that? - It\'s my [father].', 'How old is he/she? - He\'s/She\'s [eight] years old.']
    },
    {
      unit: 'Unit 12: Jobs',
      topic: 'Occupations',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['teacher', 'doctor', 'nurse', 'farmer', 'driver', 'cook', 'worker', 'police officer'],
      sentencePatterns: ['What\'s his/her job? - He\'s/She\'s a [doctor].', 'Is he/she a [teacher]? - Yes, he/she is. / No, he/she isn\'t.']
    },
    {
      unit: 'Unit 13: My House',
      topic: 'Rooms in the House',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['living room', 'bedroom', 'kitchen', 'bathroom', 'hall', 'garden', 'here', 'there'],
      sentencePatterns: ['Where\'s the [living room]? - It\'s here / It\'s there.']
    },
    {
      unit: 'Unit 14: My Bedroom',
      topic: 'Furniture & Position',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['bed', 'desk', 'chair', 'lamp', 'door', 'window', 'in', 'on', 'under'],
      sentencePatterns: ['Where\'s the [bed]? - It\'s [in the room].', 'Where are the [chairs]? - They\'re [near the desk].']
    },
    {
      unit: 'Unit 15: At the Dining Table',
      topic: 'Food & Drinks',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['rice', 'bread', 'meat', 'fish', 'eggs', 'beans', 'juice', 'water', 'milk'],
      sentencePatterns: ['Would you like some [rice]? - Yes, please. / No, thanks.']
    },
    {
      unit: 'Unit 16: My Pets',
      topic: 'Pets & Quantity',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['dog', 'cat', 'bird', 'rabbit', 'fish', 'parrot', 'goldfish'],
      sentencePatterns: ['Do you have any [cats]? - Yes, I do. / No, I don\'t.', 'How many [dogs] do you have? - I have [two].']
    },
    {
      unit: 'Unit 17: Our Toys',
      topic: 'Toys & Position',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['doll', 'car', 'teddy bear', 'kite', 'plane', 'truck', 'robot', 'ball'],
      sentencePatterns: ['What toys do you have? - I have a [robot].', 'Where is my [kite]? - It\'s [on the bed].']
    },
    {
      unit: 'Unit 18: Playing and doing',
      topic: 'Actions & Free Time Activities',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['playing', 'singing', 'drawing', 'reading', 'dancing', 'cooking', 'swimming', 'running', 'watching TV', 'listening to music'],
      sentencePatterns: ['What are you doing? - I am [playing].', 'What is he/she doing? - He/She is [drawing].']
    },
    {
      unit: 'Unit 19: Outdoor Activities',
      topic: 'Activities happening now',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['cycling', 'skating', 'flying a kite', 'running', 'walking', 'playing'],
      sentencePatterns: ['What are you doing? - I\'m [cycling].', 'What is he/she doing? - He\'s/She\'s [skating].']
    },
    {
      unit: 'Unit 20: At the Zoo',
      topic: 'Zoo Animals',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['tiger', 'monkey', 'elephant', 'peacock', 'bear', 'kangaroo', 'giraffe'],
      sentencePatterns: ['What can you see? - I can see a [tiger].', 'What is the [monkey] doing? - It\'s [climbing].']
    }
  ],
  'Lớp 4': [
    {
      unit: 'Starter: Welcome',
      topic: 'Welcome Back to Grade 4, Characters, Numbers 1-100, Alphabet Spelling & Classroom Commands',
      lessons: ['Lesson 1 (Characters & Greetings Review)', 'Lesson 2 (Alphabet Spelling & Numbers 1-100)', 'Lesson 3 (Classroom Commands & Pair Work Instructions)'],
      vocabulary: ['welcome', 'again', 'Nam', 'Mai', 'Phong', 'Linda', 'Tony', 'Mary', 'Tom', 'numbers 1-100', 'alphabet spelling', 'work in pairs', 'work in groups', 'ask a question'],
      sentencePatterns: ['Welcome back to Grade 4!', 'Nice to see you again!', 'How do you spell your name? - [Letters].', 'May I ask a question? / Let\'s work in pairs.']
    },
    {
      unit: 'Unit 1: My Friends',
      topic: 'Countries, Nationalities and Friends',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['Vietnam', 'America', 'England', 'Australia', 'Japan', 'Malaysia', 'Singapore'],
      sentencePatterns: ['Where are you from? - I\'m from [Vietnam].', 'Where is he/she from? - He\'s/She\'s from [America].']
    },
    {
      unit: 'Unit 2: Time and Daily Routines',
      topic: 'Telling Time and Daily Routines',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['get up', 'have breakfast', 'go to school', 'have lunch', 'go home', 'have dinner', 'go to bed', 'o\'clock'],
      sentencePatterns: ['What time is it? - It\'s [seven o\'clock].', 'What time do you [get up]? - I [get up] at [six o\'clock].']
    },
    {
      unit: 'Unit 3: My Week',
      topic: 'Days of the Week and Activities',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'study', 'swim'],
      sentencePatterns: ['What day is it today? - It\'s [Monday].', 'What do you do on [Mondays]? - I [go to school] in the morning.']
    },
    {
      unit: 'Unit 4: My Birthday Party',
      topic: 'Months, Dates and Parties',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      sentencePatterns: ['When is your birthday? - It\'s in [May].', 'What do you want to eat/drink? - I want some [juice].']
    },
    {
      unit: 'Unit 5: Things We Can Do',
      topic: 'Abilities & Talents',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['swim', 'ride a bike', 'play football', 'play the guitar', 'draw', 'dance', 'sing', 'cook'],
      sentencePatterns: ['Can you [swim]? - Yes, I can. / No, I can\'t.', 'What can you do? - I can [play the guitar].']
    },
    {
      unit: 'Unit 6: Our School Facilities',
      topic: 'Buildings, Rooms and Facilities',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['building', 'garden', 'gym', 'music room', 'computer room', 'playground'],
      sentencePatterns: ['Where is your school? - It\'s in the [mountains/city].', 'How many [buildings] are there? - There are [three].']
    },
    {
      unit: 'Unit 7: Our Timetables',
      topic: 'School Subjects and Schedules',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['English', 'Vietnamese', 'Maths', 'Science', 'Art', 'Music', 'PE', 'IT', 'timetable'],
      sentencePatterns: ['What subjects do you have today? - I have [Maths] and [English].', 'When do you have [Science]? - I have it on [Tuesdays].']
    },
    {
      unit: 'Unit 8: My Favourite Subject',
      topic: 'Preferences and Reasons',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['favourite', 'because', 'interesting', 'fun', 'like', 'sing songs', 'draw pictures'],
      sentencePatterns: ['What is your favourite subject? - It\'s [English].', 'Why do you like [English]? - Because I want to [sing English songs].']
    },
    {
      unit: 'Unit 9: Our Sports Day',
      topic: 'School Events and Sports',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['Sports Day', 'Teachers\' Day', 'Children\'s Day', 'play basketball', 'table tennis', 'relay race'],
      sentencePatterns: ['When will [Sports Day] be? - It\'ll be in [November].', 'What are you going to do on [Sports Day]? - I\'m going to [play basketball].']
    },
    {
      unit: 'Unit 10: Where Were You Yesterday?',
      topic: 'Past Activities and Locations',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['yesterday', 'at home', 'at school', 'on the beach', 'in the school library', 'watered the flowers', 'painted a picture'],
      sentencePatterns: ['Where were you yesterday? - I was [at home].', 'What did you do yesterday? - I [watered the flowers].']
    },
    {
      unit: 'Unit 11: My Home',
      topic: 'Rooms and Locations in the Home',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['living room', 'kitchen', 'bathroom', 'bedroom', 'in front of', 'behind', 'next to'],
      sentencePatterns: ['Where is the [lamp]? - It\'s [next to the bed].']
    },
    {
      unit: 'Unit 12: Jobs and Workplaces',
      topic: 'Occupations and Workplace Locations',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['hospital', 'school', 'farm', 'factory', 'office', 'doctor', 'worker', 'farmer'],
      sentencePatterns: ['Where does a [doctor] work? - A doctor works in a [hospital].']
    },
    {
      unit: 'Unit 13: Appearance and Character',
      topic: 'Describing Looks and Personality',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['tall', 'short', 'slim', 'strong', 'friendly', 'hard-working', 'helpful'],
      sentencePatterns: ['What does he/she look like? - He\'s/She\'s [tall and slim].']
    },
    {
      unit: 'Unit 14: Daily Activities',
      topic: 'Daily routines and free time',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['wash face', 'brush teeth', 'have lunch', 'cook dinner', 'watch TV', 'early', 'late'],
      sentencePatterns: ['What do you do in the [evening]? - I [watch TV].']
    },
    {
      unit: 'Unit 15: My Future Job',
      topic: 'Dream Careers and Reasons',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['architect', 'pilot', 'singer', 'artist', 'writer', 'police officer', 'fly a plane', 'design buildings'],
      sentencePatterns: ['What would you like to be in the future? - I\'d like to be an [architect].']
    },
    {
      unit: 'Unit 16: Weather and Clothes',
      topic: 'Weather conditions and Outfit',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['sunny', 'rainy', 'windy', 'cold', 'hot', 'wear', 'jacket', 'sunglasses', 'T-shirt'],
      sentencePatterns: ['What\'s the weather like? - It\'s [sunny and hot].', 'I\'m wearing a [jacket].']
    },
    {
      unit: 'Unit 17: In the City',
      topic: 'Places in Town and Directions',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['bakery', 'cinema', 'pharmacy', 'supermarket', 'bookshop', 'go straight', 'turn left', 'turn right'],
      sentencePatterns: ['Where is the [bakery]? - It\'s [opposite the cinema].']
    },
    {
      unit: 'Unit 18: At the Shopping Mall',
      topic: 'Prices, Clothes and Purchasing',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['T-shirt', 'shoes', 'cap', 'skirt', 'thousand dong', 'how much', 'cheap', 'expensive'],
      sentencePatterns: ['How much is the [cap]? - It\'s [50,000 dong].', 'How much are the [shoes]? - They\'re [200,000 dong].']
    },
    {
      unit: 'Unit 19: Animal World',
      topic: 'Zoo animals and characteristics',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['tiger', 'elephant', 'monkey', 'crocodile', 'kangaroo', 'fast', 'slow', 'scary', 'funny'],
      sentencePatterns: ['Why do you like [monkeys]? - Because they are [funny].']
    },
    {
      unit: 'Unit 20: Our Summer Holidays',
      topic: 'Summer vacation plans and destinations',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['Phu Quoc', 'Ha Long Bay', 'Da Nang', 'Nha Trang', 'swim in the sea', 'build sandcastles'],
      sentencePatterns: ['Where are you going this summer? - I\'m going to [Ha Long Bay].']
    }
  ],
  'Lớp 5': [
    {
      unit: 'Starter: Welcome',
      topic: 'Welcome Back to Grade 5, Summer Holidays Review & Classroom English',
      lessons: ['Lesson 1 (Welcome back & Summer Holidays Review)', 'Lesson 2 (Calendar, Schedule & Daily Routines Revision)', 'Lesson 3 (Classroom English for Grade 5 & Cooperative Project Rules)'],
      vocabulary: ['welcome back', 'Grade 5', 'summer holiday', 'classmate', 'introduce', 'calendar', 'schedule', 'project', 'collaborate', 'share'],
      sentencePatterns: ['Welcome back to Grade 5!', 'What did you do during your summer holiday?', 'Let\'s work together on our project.', 'Nice to meet you all again!']
    },
    {
      unit: 'Unit 1: All About Me',
      topic: 'Personal Information & Addresses',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['address', 'lane', 'street', 'avenue', 'tower', 'village', 'quiet', 'busy', 'crowded', 'friendly'],
      sentencePatterns: ['What\'s your address? - It\'s [105 Hoa Binh Lane].', 'What\'s the [village] like? - It\'s [small and quiet].']
    },
    {
      unit: 'Unit 2: Our Homes',
      topic: 'Houses, Hometowns and Living Areas',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['flat', 'cottage', 'apartment', 'house', 'city', 'countryside', 'hometown'],
      sentencePatterns: ['Who do you live with? - I live with my [parents].', 'Where do you live? - I live in a [flat in Hanoi].']
    },
    {
      unit: 'Unit 3: My Foreign Friends',
      topic: 'Friends from around the world',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['American', 'English', 'Australian', 'Japanese', 'Malaysian', 'talkative', 'kind', 'clever'],
      sentencePatterns: ['What is your foreign friend like? - He/She is very [friendly and clever].']
    },
    {
      unit: 'Unit 4: Our Free-Time Activities',
      topic: 'Free time habits and frequency',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'surf the Internet', 'ride a bicycle'],
      sentencePatterns: ['How often do you [surf the Internet]? - I [surf the Internet] [once a week].', 'What do you do in your free time? - I often [read books].']
    },
    {
      unit: 'Unit 5: My Future Job',
      topic: 'Dream Careers and Reasons',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['pilot', 'architect', 'writer', 'astronaut', 'artist', 'engineer', 'fly a plane', 'design buildings'],
      sentencePatterns: ['What would you like to be in the future? - I\'d like to be an [architect].', 'Why would you like to be an [architect]? - Because I\'d like to [design buildings].']
    },
    {
      unit: 'Unit 6: Our School Festival',
      topic: 'School events and past activities',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['Sports Festival', 'Book Fair', 'Music Show', 'Teachers\' Day', 'sang songs', 'danced', 'played games'],
      sentencePatterns: ['Did you go to the [Book Fair]? - Yes, I did. / No, I didn\'t.', 'What did you do there? - I [bought some comic books].']
    },
    {
      unit: 'Unit 7: Favourite Sports and Games',
      topic: 'Sports preferences and rules',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['table tennis', 'badminton', 'volleyball', 'basketball', 'chess', 'play', 'practise'],
      sentencePatterns: ['What sport do you like best? - I like [table tennis].', 'How often do you play it? - [Twice a week].']
    },
    {
      unit: 'Unit 8: What Are You Reading?',
      topic: 'Books, Fairy Tales and Characters',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['fairy tale', 'comic book', 'main character', 'Snow White', 'Aladdin', 'brave', 'generous', 'hard-working'],
      sentencePatterns: ['What are you reading? - I\'m reading [The Story of Tam and Cam].', 'What\'s the main character like? - He/She is [kind and generous].']
    },
    {
      unit: 'Unit 9: What Happened in the Story?',
      topic: 'Story sequences and past events',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['first', 'then', 'next', 'in the end', 'fox', 'crow', 'delicious', 'dropped'],
      sentencePatterns: ['First, the fox saw the crow. Then, the crow opened its beak and dropped the cheese.']
    },
    {
      unit: 'Unit 10: How Can We Learn English?',
      topic: 'English learning methods & tips',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['watch cartoons', 'read stories', 'write new words', 'speak with foreigners', 'practise listening'],
      sentencePatterns: ['How do you practise [speaking English]? - I [speak English every day with my friends].']
    },
    {
      unit: 'Unit 11: Family Health & Habits',
      topic: 'Health problems and advice',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['headache', 'toothache', 'stomach ache', 'fever', 'sore throat', 'go to the doctor', 'take medicine', 'rest'],
      sentencePatterns: ['What\'s the matter with you? - I have a [toothache].', 'You should [go to the dentist].']
    },
    {
      unit: 'Unit 12: Don\'t Ride Your Bike Too Fast!',
      topic: 'Accident prevention and safety rules',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['cut yourself', 'get a burn', 'fall off the bike', 'touch the stove', 'play with matches', 'dangerous'],
      sentencePatterns: ['Don\'t [play with matches]! - OK, I won\'t.', 'Why shouldn\'t I [touch the stove]? - Because you may [get a burn].']
    },
    {
      unit: 'Unit 13: Free-Time Habits at Home',
      topic: 'Household chores and leisure activities',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['clean the room', 'wash the dishes', 'water the plants', 'walk the dog', 'surf the web'],
      sentencePatterns: ['What does your brother do in his free time? - He [cleans the room].']
    },
    {
      unit: 'Unit 14: What Happened to You?',
      topic: 'Past experiences and stories',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['fell down', 'lost the way', 'visited relatives', 'had a party', 'enjoyed the trip'],
      sentencePatterns: ['What happened to you last weekend? - I [visited my grandparents].']
    },
    {
      unit: 'Unit 15: What Would You Like to Be?',
      topic: 'Career aspirations and contributions',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['nurse', 'tour guide', 'detective', 'scientist', 'help sick people', 'explore nature'],
      sentencePatterns: ['Why would you like to be a [tour guide]? - Because I\'d like to [travel around Vietnam].']
    },
    {
      unit: 'Unit 16: Where\'s the Post Office?',
      topic: 'Directions and Landmarks',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['post office', 'bus stop', 'museum', 'theatre', 'turn left', 'take a bus', 'on the corner'],
      sentencePatterns: ['Excuse me, where\'s the [post office]? - Go straight and [turn right].']
    },
    {
      unit: 'Unit 17: How Much Is the T-Shirt?',
      topic: 'Prices and Shopping for clothes',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['jumper', 'jacket', 'trousers', 'scarf', 'hundred thousand dong', 'try on'],
      sentencePatterns: ['How much is this [jumper]? - It\'s [150,000 dong].']
    },
    {
      unit: 'Unit 18: What Animal Would You Like to See?',
      topic: 'Wild animals and zoo visits',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['peacock', 'gorilla', 'hippopotamus', 'python', 'roar loudly', 'dance beautifully'],
      sentencePatterns: ['What animal would you like to see? - I\'d like to see [peacocks] because they [dance beautifully].']
    },
    {
      unit: 'Unit 19: Which Place Would You Like to Visit?',
      topic: 'Tourist attractions in Vietnam',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['Thong Nhat Park', 'Museum of History', 'Trang An', 'Ben Thanh Market', 'attractive', 'exciting'],
      sentencePatterns: ['Which place would you like to visit, [Trang An] or [Ha Long Bay]? - I\'d like to visit [Ha Long Bay].']
    },
    {
      unit: 'Unit 20: Which One Is More Attractive?',
      topic: 'Comparisons of places and landmarks',
      lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
      vocabulary: ['more attractive', 'more beautiful', 'more peaceful', 'more exciting', 'historic', 'modern'],
      sentencePatterns: ['Which one is [more attractive], Da Nang or Nha Trang? - I think [Da Nang] is.']
    }
  ]
};


export const DEFAULT_OFFICIAL_REFERENCES: OfficialReference[] = [
  {
    id: 'ref_cv_2345',
    title: 'Công văn 2345/BGDĐT-GDTH về Hướng dẫn xây dựng Kế hoạch bài dạy cấp Tiểu học',
    code: 'Công văn số 2345/BGDĐT-GDTH',
    issuer: 'Bộ Giáo dục và Đào tạo',
    issueDate: '07/06/2021',
    url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1423',
    summary: 'Quy định khung Kế hoạch bài dạy phát triển phẩm chất và năng lực học sinh, xác định yêu cầu cần đạt, thiết bị dạy học, tiến trình tổ chức hoạt động dạy học, đánh giá và điều chỉnh sau bài dạy.',
    applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
    applicableSubjects: ['Tất cả các môn'],
    isRequired: true,
    isActive: true
  },
  {
    id: 'ref_tt_32',
    title: 'Thông tư 32/2018/TT-BGDĐT Ban hành Chương trình Giáo dục phổ thông 2018',
    code: 'Thông tư số 32/2018/TT-BGDĐT',
    issuer: 'Bộ Giáo dục và Đào tạo',
    issueDate: '26/12/2018',
    url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1325',
    summary: 'Khung chương trình tổng thể và 5 phẩm chất chủ yếu (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm) cùng 3 năng lực chung và các năng lực đặc thù môn học.',
    applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
    applicableSubjects: ['Tất cả các môn'],
    isRequired: true,
    isActive: true
  },
  {
    id: 'ref_cv_3456',
    title: 'Công văn 3456/BGDĐT-GDPT về Khung năng lực số cho học sinh phổ thông',
    code: 'Công văn số 3456/BGDĐT-GDPT',
    issuer: 'Bộ Giáo dục và Đào tạo',
    issueDate: '21/08/2020',
    url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1398',
    summary: 'Hướng dẫn triển khai Khung năng lực số cho học sinh tiểu học (Mã 1.1.CB1a, 1.2.CB2b...), khai thác học liệu số, audio tương tác và công cụ học tập số thực chất.',
    applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
    applicableSubjects: ['Tất cả các môn'],
    isRequired: true,
    isActive: true
  },
  {
    id: 'ref_qd_2422',
    title: 'Quyết định 2422/QĐ-BGDĐT về Khung nội dung Giáo dục Trí tuệ Nhân tạo cho học sinh phổ thông',
    code: 'Quyết định số 2422/QĐ-BGDĐT',
    issuer: 'Bộ Giáo dục và Đào tạo (Hà Nội, ngày 18/08/2026)',
    issueDate: '18/08/2026',
    url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=2422',
    summary: 'Khung nội dung giáo dục Trí tuệ Nhân tạo (AI) cho học sinh phổ thông với 4 mạch nội dung cốt lõi: Nhận biết AI, Ứng dụng an toàn & có trách nhiệm, Tương tác & Khám phá cùng AI, Tư duy sáng tạo và phản biện.',
    applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
    applicableSubjects: ['Tất cả các môn'],
    isRequired: true,
    isActive: true
  },
  {
    id: 'ref_tt_27',
    title: 'Thông tư 27/2020/TT-BGDĐT Quy định đánh giá học sinh tiểu học',
    code: 'Thông tư số 27/2020/TT-BGDĐT',
    issuer: 'Bộ Giáo dục và Đào tạo',
    issueDate: '04/09/2020',
    url: 'https://thuvienphapluat.vn/van-ban/Giao-duc/Thong-tu-27-2020-TT-BGDDT-quy-dinh-danh-gia-hoc-sinh-tieu-hoc-451996.aspx',
    summary: 'Đánh giá thường xuyên bằng nhận xét, khen thưởng động viên kịp thời, đánh giá vì sự tiến bộ của học sinh theo 3 mức độ (Hoàn thành tốt, Hoàn thành, Chưa hoàn thành).',
    applicableGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
    applicableSubjects: ['Tất cả các môn'],
    isRequired: true,
    isActive: true
  },
  {
    id: 'ref_sgk_gs',
    title: 'Sách giáo khoa Tiếng Anh Global Success (NXB Giáo dục Việt Nam)',
    code: 'SGK Tiếng Anh Global Success 3, 4, 5',
    issuer: 'Bộ Giáo dục và Đào tạo & NXB Giáo dục Việt Nam',
    issueDate: '2022',
    url: 'https://hanhtrangso.nxbgd.vn/sach-dien-tu/tieng-anh-3-global-success',
    summary: 'Căn cứ trực tiếp và quan trọng nhất để thiết kế nội dung hoạt động bài học Tiếng Anh tiểu học.',
    applicableGrades: ['Lớp 3', 'Lớp 4', 'Lớp 5'],
    applicableSubjects: ['Tiếng Anh'],
    isRequired: true,
    isActive: true
  }
];

export const INITIAL_STORED_TEXTBOOKS: StoredTextbook[] = [
  {
    id: 'sgk_en3_gs_u3',
    title: 'Tiếng Anh 3 Global Success - Unit 3: Our School Things',
    subject: 'Tiếng Anh',
    grade: 3,
    bookSeries: 'Global Success (NXB Giáo dục Việt Nam)',
    volume: 'Tập 1',
    chapterOrUnit: 'Unit 3: Our School Things',
    lessonName: 'Lesson 1 (Period 1)',
    pageRange: 'Trang 22 - 25',
    content: `UNIT 3: OUR SCHOOL THINGS
Lesson 1 - Page 22-23:
1. Look, listen and repeat:
- Picture a: Mai: "What is this?" - Nam: "It's a pen."
- Picture b: Mai: "And what is that?" - Nam: "It's a ruler."
2. Listen, point and say:
- Picture a: a pen
- Picture b: a pencil
- Picture c: a book
- Picture d: a ruler
Sentence pattern:
- Question: "What's this? / What is this?"
- Answer: "It's a [school thing]."
3. Let's talk:
- Pupils hold up their classroom objects and ask/answer in pairs: "What's this? - It's a..."
4. Phonics sound:
- Sound /p/: pen, pencil
- Sound /b/: book, bag`,
    keyVocabulary: ['pen (bút mực)', 'pencil (bút chì)', 'book (quyển sách)', 'ruler (thước kẻ)', 'school bag (cặp sách)', 'eraser (cục tẩy)'],
    keySentences: ['What is this? - It\'s a pen.', 'What is that? - It\'s a ruler.', 'Open your book, please.'],
    exercises: ['Point and say (p.22)', 'Let\'s chant: Pen, pencil, book! (p.23)', 'Look and write (Workbook p.18)'],
    sourceType: 'system_standard',
    uploadedAt: '2025-08-10T08:00:00.000Z',
    driveOrOnlineLink: 'https://hanhtrangso.nxbgd.vn/sach-dien-tu/tieng-anh-3-global-success'
  },
  {
    id: 'sgk_en4_gs_u5',
    title: 'Tiếng Anh 4 Global Success - Unit 5: Things we can do',
    subject: 'Tiếng Anh',
    grade: 4,
    bookSeries: 'Global Success (NXB Giáo dục Việt Nam)',
    volume: 'Tập 1',
    chapterOrUnit: 'Unit 5: Things we can do',
    lessonName: 'Lesson 1 (Period 1)',
    pageRange: 'Trang 34 - 37',
    content: `UNIT 5: THINGS WE CAN DO
Lesson 1 - Page 34-35:
1. Look, listen and repeat:
- Picture a: "Can you swim, Ben?" - "Yes, I can."
- Picture b: "Can you ride a bike?" - "No, I can't. But I can run fast."
2. Listen, point and say:
- Picture a: swim
- Picture b: ride a bike
- Picture c: sing English songs
- Picture d: play football
Sentence pattern:
- Question: "Can you [action]?"
- Answer: "Yes, I can. / No, I can't."
3. Let's talk & survey:
- Ask classmates about their abilities and fill in the class survey chart.`,
    keyVocabulary: ['swim (bơi)', 'ride a bike (đi xe đạp)', 'sing (hát)', 'play football (đá bóng)', 'draw (vẽ tranh)', 'dance (nhảy múa)'],
    keySentences: ['Can you swim? - Yes, I can.', 'Can you ride a bike? - No, I can\'t.', 'I can play the piano.'],
    exercises: ['Listen and tick (p.35)', 'Role-play interview (p.36)'],
    sourceType: 'system_standard',
    uploadedAt: '2025-08-10T08:00:00.000Z',
    driveOrOnlineLink: 'https://hanhtrangso.nxbgd.vn/sach-dien-tu/tieng-anh-4-global-success'
  },
  {
    id: 'sgk_tv3_kntt_b5',
    title: 'Tiếng Việt 3 Kết nối tri thức - Bài 5: Nhật kí tập bơi',
    subject: 'Tiếng Việt',
    grade: 3,
    bookSeries: 'Kết nối tri thức với cuộc sống',
    volume: 'Tập 1',
    chapterOrUnit: 'Chủ điểm 1: Những trải nghiệm tuổi thơ',
    lessonName: 'Bài 5: Nhật kí tập bơi (Tiết 1 + 2)',
    pageRange: 'Trang 24 - 27',
    content: `BÀI 5: NHẬT KÍ TẬP BƠI (Trang 24-25)
1. Đọc văn bản:
"Ngày... tháng... năm...
Hôm nay là buổi đầu tiên mình đi học bơi. Thầy giáo dạy mình cách thở dưới nước. Ban đầu mình sợ nước vào mũi, nhưng làm theo lời thầy hướng dẫn, mình đã nín thở được 10 giây.
Ngày... tháng... năm...
Mình đã biết đạp chân ếch. Cảm giác nổi bồng bềnh trên mặt nước thật là thích..."
2. Trả lời câu hỏi:
- Câu 1: Bạn nhỏ trong bài học bơi cùng ai và bắt đầu học từ động tác nào?
- Câu 2: Khi mới tập thở dưới nước, bạn nhỏ có cảm giác thế nào?
- Câu 3: Em thích nhất điều gì trong những ngày tập bơi của bạn nhỏ?
3. Luyện từ và câu:
- Dấu hai chấm (báo hiệu lời nói trực tiếp hoặc phần giải thích, liệt kê).
- Từ ngữ chỉ hoạt động thể thao rèn luyện sức khỏe.`,
    keyVocabulary: ['nhật kí', 'bồng bềnh', 'đạp chân ếch', 'nín thở', 'tự tin', 'rèn luyện'],
    keySentences: ['Tập bơi giúp cơ thể khỏe mạnh và phòng chống đuối nước.', 'Thầy giáo dặn: "Các em phải khởi động kĩ trước khi xuống nước."'],
    exercises: ['Đọc đúng, diễn cảm bài Nhật kí tập bơi', 'Tìm các từ chỉ hoạt động thể thao', 'Viết đoạn văn 3-4 câu kể về một hoạt động rèn luyện thể chất'],
    sourceType: 'system_standard',
    uploadedAt: '2025-08-10T08:00:00.000Z',
    driveOrOnlineLink: 'https://hanhtrangso.nxbgd.vn/sach-dien-tu/tieng-viet-3-tap-1-ket-noi-tri-thuc'
  },
  {
    id: 'sgk_toan3_kntt_b14',
    title: 'Toán 3 Kết nối tri thức - Bài 14: Bảng nhân 7, Bảng chia 7',
    subject: 'Toán',
    grade: 3,
    bookSeries: 'Kết nối tri thức với cuộc sống',
    volume: 'Tập 1',
    chapterOrUnit: 'Chủ đề: Phép nhân và phép chia trong phạm vi 1000',
    lessonName: 'Bài 14: Bảng nhân 7, Bảng chia 7 (Tiết 1)',
    pageRange: 'Trang 42 - 45',
    content: `BÀI 14: BẢNG NHÂN 7, BẢNG CHIA 7 (Trang 42)
1. Khám phá kiến thức:
- Mỗi đĩa có 7 quả táo. 1 đĩa có 7 quả táo: 7 x 1 = 7.
- 2 đĩa có: 7 + 7 = 7 x 2 = 14 quả táo.
- 3 đĩa có: 7 x 3 = 21 quả táo.
-> Thành lập Bảng nhân 7:
7 x 1 = 7; 7 x 2 = 14; 7 x 3 = 21; 7 x 4 = 28; 7 x 5 = 35;
7 x 6 = 42; 7 x 7 = 49; 7 x 8 = 56; 7 x 9 = 63; 7 x 10 = 70.
2. Hoạt động luyện tập:
- Bài 1: Tính nhẩm (7 x 4 = ?, 7 x 6 = ?, 7 x 8 = ?)
- Bài 2: Mỗi tuần lễ có 7 ngày. Hỏi 4 tuần lễ có bao nhiêu ngày? (Lời giải: 7 x 4 = 28 ngày)
- Bài 3: Trò chơi tiếp sức "Nối phép tính với kết quả đúng".`,
    keyVocabulary: ['bảng nhân 7', 'thừa số', 'tích', 'gấp lên nhiều lần', 'tuần lễ', 'tính nhẩm'],
    keySentences: ['Muốn tìm kết quả phép nhân 7, ta đếm thêm 7 đơn vị.', '7 nhân 4 bằng 28.'],
    exercises: ['Bài 1 trang 43 (Tính nhẩm)', 'Bài 2 trang 43 (Toán có lời văn về tuần lễ)', 'Bài 3 trang 44 (Đố vui toán học)'],
    sourceType: 'system_standard',
    uploadedAt: '2025-08-10T08:00:00.000Z',
    driveOrOnlineLink: 'https://hanhtrangso.nxbgd.vn/sach-dien-tu/toan-3-tap-1-ket-noi-tri-thuc'
  },
  {
    id: 'sgk_kh4_kntt_b8',
    title: 'Khoa học 4 Kết nối tri thức - Bài 8: Sự kì diệu của nước và vòng tuần hoàn của nước',
    subject: 'Khoa học',
    grade: 4,
    bookSeries: 'Kết nối tri thức với cuộc sống',
    volume: 'Tập 1',
    chapterOrUnit: 'Chủ đề 1: Chất (Nước và không khí)',
    lessonName: 'Bài 8: Vòng tuần hoàn của nước trong tự nhiên',
    pageRange: 'Trang 32 - 35',
    content: `BÀI 8: VÒNG TUẦN HOÀN CỦA NƯỚC TRONG TỰ NHIÊN (Trang 32-34)
1. Quan sát và thí nghiệm:
- Nước tồn tại ở ba thể: thể lỏng (nước sinh hoạt, mưa, sông hồ), thể khí (hơi nước bốc lên khi đun sôi/dưới ánh mặt trời), thể rắn (nước đá, tuyết).
- Hiện tượng bay hơi và ngưng tụ: Mặt trời chiếu nóng nước sông hồ -> nước bay hơi tạo thành mây -> mây gặp lạnh ngưng tụ thành giọt nước rơi xuống thành mưa -> nước mưa chảy về sông hồ.
2. Vẽ và chú thích sơ đồ:
- Học sinh làm việc nhóm đôi vẽ sơ đồ vòng tuần hoàn của nước bằng hình ảnh các đám mây, giọt mưa, mặt trời và dòng sông.
3. Vận dụng:
- Tại sao phải giữ sạch nguồn nước sinh hoạt quanh ta?`,
    keyVocabulary: ['thể lỏng', 'thể khí', 'thể rắn', 'bay hơi', 'ngưng tụ', 'vòng tuần hoàn', 'bảo vệ nguồn nước'],
    keySentences: ['Nước có thể chuyển từ thể lỏng sang thể khí qua sự bay hơi, và từ thể khí sang thể lỏng qua sự ngưng tụ.', 'Vòng tuần hoàn của nước diễn ra liên tục trong tự nhiên.'],
    exercises: ['Thực hiện thí nghiệm hơi nước gặp nắp đậy lạnh', 'Vẽ sơ đồ tư duy vòng tuần hoàn nước', 'Kể các việc làm tiết kiệm và bảo vệ nước sạch'],
    sourceType: 'system_standard',
    uploadedAt: '2025-08-10T08:00:00.000Z',
    driveOrOnlineLink: 'https://hanhtrangso.nxbgd.vn/sach-dien-tu/khoa-hoc-4-ket-noi-tri-thuc'
  }
];

/**
 * Generates high quality lesson plans conforming to:
 * 1. 100% English for English subject
 * 2. 100% Vietnamese for other subjects
 * 3. Exact MOET 2345 4-stage structure + Official Circulars links
 * 4. 100% Textbook alignment from stored textbook source
 */
export const INITIAL_WAREHOUSE_LESSON_PLANS: WarehouseLessonPlan[] = [
  {
    id: 'wh_lp_en3_u3_l1',
    title: 'Unit 3: Our School Things - Lesson 1 (Period 1)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    unit: 'Unit 3: Our School Things',
    lesson: 'Lesson 1',
    period: 'Period 1 (35 mins)',
    bookSeries: 'Global Success (Vietnam Education Publishing House)',
    pageRange: 'Pages 22 - 23',
    duration: '35 minutes',
    summary: 'Teach target vocabulary for school things (pen, pencil, book, ruler) and question pattern: "What is this? - It\'s a..." aligned with Global Success & MOET Circular 2345.',
    tags: ['Global Success', 'Unit 3', 'School Things', 'Phonics /p/ /b/', 'CV 2345'],
    createdAt: '2025-08-15T08:00:00.000Z',
    updatedAt: '2025-08-15T08:00:00.000Z',
    isFavorite: true,
    fullPlan: {
      id: 'plan_en3_u3_l1',
      subject: 'Tiếng Anh',
      grade: 'Grade 3',
      unit: 'Unit 3: Our School Things',
      lesson: 'Lesson 1',
      period: 'Period 1 (35 minutes)',
      lessonName: 'UNIT 3: OUR SCHOOL THINGS - LESSON 1 (PERIOD 1)',
      topic: 'Classroom Objects (pen, pencil, book, ruler), Phonics /p/ and /b/, Pattern: "What is this? - It\'s a..."',
      duration: '35 minutes',
      bookSeries: 'Global Success (Vietnam Education Publishing House)',
      pageRange: 'Pages 22 - 23',
      language: 'en',
      officialReferences: DEFAULT_OFFICIAL_REFERENCES,
      objectives: {
        knowledgeAndSkills: [
          '• Identify and pronounce correctly target vocabulary: pen, pencil, book, ruler.',
          '• Recognize and model target phonics sounds /p/ (pen, pencil) and /b/ (book, bag) with clear mouth shape.',
          '• Ask and answer about singular classroom objects using: "What is this? - It\'s a (pen)."'
        ],
        coreCompetencies: [
          '• English Communicative Competence: Actively initiate dialogue in English during pair drills and role-plays.',
          '• Self-regulation & Autonomy: Independently point, read and complete workbook tasks.',
          '• Collaborative Teamwork: Work cooperatively in pairs during TPR movement and flashcard guessing.'
        ],
        personalQualities: [
          '• Diligence: Eagerly sing songs, chant, and repeat target phrases.',
          '• Responsibility: Keep stationery neat and tidy, share school items with peers politely.'
        ],
        digitalCompetency: [
          '• 1.1.CB1a: Pupils listen to digital MP3 audio track to identify specific school objects accurately.'
        ],
        aiIntegration: [
          '• AI Purpose: Teacher uses AI to generate visual cartoon flashcards and interactive classroom quiz.'
        ]
      },
      materials: {
        teacher: [
          'Teacher\'s Guide & Student\'s Book (English 3 Global Success).',
          'Interactive smartboard slides with embedded audio Tracks 22-24.',
          'Flashcards of pen, pencil, book, ruler and real objects (realia).'
        ],
        student: [
          'English 3 Student\'s Book & Activity Workbook.',
          'Real classroom items (pencil case, pen, pencil, ruler, book).'
        ],
        digitalTools: [
          'SmartEdu Digital Interactive Audio Player',
          'SmartEdu Balloon Pop & Wheel of Fortune Mini-game'
        ]
      },
      activities: [
        {
          id: 'act1',
          name: 'Activity 1. WARM-UP & REVIEW (4 mins)',
          duration: '4 mins',
          objective: 'Recall greeting patterns, energize pupils, and introduce the school things topic with TPR.',
          content: 'Greeting & "Let\'s Sing: My School Things" song.',
          methodsAndTechniques: 'Total Physical Response (TPR), Song and Movement.',
          teacherActivity: '• T greets the class: "Good morning, class! How are you today?"\n• T plays the audio song "School Things" and models TPR actions (holding up stationery).\n• T points to real objects on teacher\'s desk: "Look! What do I have here?"',
          studentActivity: '• Ss respond cheerfully: "Good morning, teacher!"\n• Ss sing along, do TPR gestures, and name familiar items (book, bag).\n• Ss get eager for the new lesson.',
          expectedOutcome: 'Ss sing along, perform TPR actions, and recall familiar vocabulary.',
          assessment: 'T observes participation, rhythm, and cheerful English interaction.',
          digitalCompetency: {
            code: '1.1.CB1a',
            expression: 'Pupils listen to digital audio to sing along.',
            activity: 'Sing and move with digital audio track.',
            product: 'Active singing with gestures.',
            assessment: 'Teacher observes active engagement.'
          }
        },
        {
          id: 'act2',
          name: 'Activity 2. KNOWLEDGE EXPLORATION (10 mins)',
          duration: '10 mins',
          objective: 'Identify target words (pen, pencil, book, ruler) and notice the sentence pattern: "What is this? - It\'s a..."',
          content: 'Task 1: Look, listen and repeat (p. 22). Task 2: Listen, point and say (p. 22).',
          methodsAndTechniques: 'Direct visual method, Phonics modeling, Choral & individual drill.',
          teacherActivity: '• T shows Picture a (Mai and Nam talking about a pen).\n• T asks: "Who can you see? What does Mai ask?"\n• T plays audio Track 22: "What is this? - It\'s a pen."\n• T says: "Listen and repeat."\n• T shows flashcards for pen, pencil, book, ruler and models Phonics sounds /p/ and /b/.\n• T guides drilling: Whole class -> Rows -> Individuals.',
          studentActivity: '• Ss look at the pictures in SB page 22.\n• Ss listen to audio and repeat in chorus and individually.\n• Ss touch lips to feel /p/ and /b/ pronunciation.\n• Individual Ss stand up and pronounce target words confidently.',
          expectedOutcome: 'Ss pronounce pen, pencil, book, ruler accurately and repeat the dialogue with natural rhythm.',
          assessment: 'T listens carefully to pronunciation and provides instant phonetic feedback.'
        },
        {
          id: 'act3',
          name: 'Activity 3. PRACTICE & DRILL (13 mins)',
          duration: '13 mins',
          objective: 'Practise asking and answering "What is this? - It\'s a..." in controlled and guided pair work.',
          content: 'Task 3: Let\'s talk (p. 23) with picture cues and realia.',
          methodsAndTechniques: 'Pair work, Substitution drill, Information gap.',
          teacherActivity: '• T models with a pupil assistant: T holds up a ruler: "What is this?"; Pupil answers: "It\'s a ruler."\n• T divides class into pairs.\n• T sets a 6-minute timer and moves around to assist struggling pairs and reward gold stars.',
          studentActivity: '• Ss work in pairs: Pupil A points to an item or holds a real object: "What is this?"; Pupil B answers: "It\'s a...". Then they switch roles.\n• 3-4 pairs volunteer to perform in front of the class.',
          expectedOutcome: 'Ss ask and answer fluently in pairs using target vocabulary and correct sentence structure.',
          assessment: 'Peer assessment with star stickers & Teacher observation checklist.'
        },
        {
          id: 'act4',
          name: 'Activity 4. APPLICATION & PRODUCTION (8 mins)',
          duration: '8 mins',
          objective: 'Apply target language into a communicative "Mystery Bag" game and wrap up.',
          content: 'Communicative Game: "Mystery School Bag" & Self-reflection.',
          methodsAndTechniques: 'Role-play game, Digital wheel quiz, Summary.',
          teacherActivity: '• T invites a pupil to touch an item inside a mystery bag without looking: T asks class: "What is this?"; Class guesses: "It\'s a pen!"\n• T summarizes key words & structures on the board.\n• T praises outstanding students and assigns homework: "Review words on p. 22 and draw your pencil case."',
          studentActivity: '• Ss participate excitedly in the guessing game.\n• Ss summarize what they learned in English today.\n• Ss note down homework in their notebooks and say goodbye.',
          expectedOutcome: 'Ss confidently use English in a real game setting and retain vocabulary.',
          assessment: 'Teacher wraps up points and records formative learning evidence.'
        }
      ],
      differentiation: {
        needingSupport: [
          'Provide visual flashcards with phonetic cues (/p/ pen, /b/ book).',
          'Use sentence frames: "What is this? - It\'s a [____]." with peer buddy support.'
        ],
        advanced: [
          'Encourage pupils to expand sentences: "It\'s a blue pen.", "It\'s a big book."',
          'Ask extension questions: "Is this your ruler? - Yes, it is."'
        ]
      },
      consolidation: 'Consolidate 4 vocabulary words (pen, pencil, book, ruler) and structure "What is this? - It\'s a...". Remind pupils to keep school items tidy.',
      assessment: {
        methods: [
          'Continuous observation of pronunciation and fluency.',
          'Peer assessment during pair work.',
          'Formative quick check using SmartEdu interactive game.'
        ],
        tools: [
          'CEFR A1 Speaking Rubric (Pronunciation 40%, Accuracy 30%, Fluency 30%).',
          'Observation checklist for MOET Primary English competencies.'
        ],
        rubrics: [
          'Level 1 (Needs support): Hesitant with words, needs teacher prompts.',
          'Level 2 (Achieved): Pronounces target words correctly, speaks full sentence with minor hesitation.',
          'Level 3 (Excellence): Fluent, confident interaction, uses natural English intonation.'
        ]
      },
      postLessonAdjustments: {
        difficulties: 'Some pupils confused the ending sound of "book" /k/ and "bag" /g/.',
        effectiveActivities: 'The "Mystery School Bag" game generated great excitement and active speaking.',
        neededAdjustments: 'Spend 2 more minutes on individual Phonics drilling for slower pupils in Period 2.',
        supportMeasures: 'Assign friendly study buddies and flashcard review cards.'
      }
    }
  },
  {
    id: 'wh_lp_en4_u1_l1',
    title: 'Unit 1: My School - Lesson 1 (Period 1)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 4',
    unit: 'Unit 1: My School',
    lesson: 'Lesson 1',
    period: 'Period 1 (35 mins)',
    bookSeries: 'Global Success (Vietnam Education Publishing House)',
    pageRange: 'Pages 10 - 11',
    duration: '35 minutes',
    summary: 'Teach target vocabulary for school facilities (classroom, library, computer room, playground) and location pattern: "Where\'s your school? - It\'s in the..."',
    tags: ['Global Success', 'Unit 1', 'My School', 'Grade 4', 'CV 2345'],
    createdAt: '2025-08-14T08:00:00.000Z',
    updatedAt: '2025-08-14T08:00:00.000Z',
    isFavorite: false,
    fullPlan: {
      id: 'plan_en4_u1_l1',
      subject: 'Tiếng Anh',
      grade: 'Grade 4',
      unit: 'Unit 1: My School',
      lesson: 'Lesson 1',
      period: 'Period 1 (35 minutes)',
      lessonName: 'UNIT 1: MY SCHOOL - LESSON 1 (PERIOD 1)',
      topic: 'School facilities (classroom, library, computer room, playground) & Locations (in the city/mountains)',
      duration: '35 minutes',
      bookSeries: 'Global Success (Vietnam Education Publishing House)',
      pageRange: 'Pages 10 - 11',
      language: 'en',
      officialReferences: DEFAULT_OFFICIAL_REFERENCES,
      objectives: {
        knowledgeAndSkills: [
          '• Identify and pronounce correctly school places: classroom, library, computer room, playground.',
          '• Ask and answer about school locations using: "Where\'s your school? - It\'s in the (mountains/city)."'
        ],
        coreCompetencies: [
          '• English Communicative Competence: Engage in school tour interviews in English.',
          '• Collaborative Teamwork: Work in groups of 4 to design a mini school map.'
        ],
        personalQualities: [
          '• Love for school: Show pride in their school facilities and keep the campus clean.'
        ],
        digitalCompetency: [
          '• 1.2.CB2b: Pupils interact with digital school map on interactive whiteboard.'
        ]
      },
      materials: {
        teacher: ['Teacher\'s Guide, audio Tracks 1-3, digital school photos.'],
        student: ['Student\'s Book 4, mini whiteboard, colored markers.'],
        digitalTools: ['SmartEdu Interactive Map Game']
      },
      activities: [
        {
          id: 'act1',
          name: 'Activity 1. WARM-UP (AND REVIEW) (5 mins)',
          duration: '5 mins',
          objective: 'Activate school vocabulary through "Pass the Ball" game.',
          content: 'Review Grade 3 school words (school, classroom, desk).',
          methodsAndTechniques: 'Game: Pass the ball with music.',
          teacherActivity: '• T plays lively music while pupils pass a soft ball. When music stops, T asks: "What do you like in our school?"',
          studentActivity: '• Ss pass the ball and answer cheerfully: "I like my classroom / I like my friends."',
          expectedOutcome: 'Ss activate vocabulary and enter positive learning mood.'
        },
        {
          id: 'act2',
          name: 'Activity 2. EXPLORATION (10 mins)',
          duration: '10 mins',
          objective: 'Introduce library, computer room, playground, mountains, town.',
          content: 'Task 1: Look, listen and repeat (p. 10).',
          methodsAndTechniques: 'Visual pictures & Audio repetition.',
          teacherActivity: '• T shows pictures on slide and plays Track 1: "Where\'s your school? - It\'s in the mountains."\n• T guides pronunciation for "mountains" and "playground".',
          studentActivity: '• Ss listen, point to pictures, and repeat in chorus and in pairs.',
          expectedOutcome: 'Ss pronounce new words accurately.'
        },
        {
          id: 'act3',
          name: 'Activity 3. PRACTICE (12 mins)',
          duration: '12 mins',
          objective: 'Practise asking and answering in pairs using picture cards.',
          content: 'Task 2: Listen, point and say (p. 10).',
          methodsAndTechniques: 'Pair work & Information exchange.',
          teacherActivity: '• T models with Pupil A: "Where\'s your school? - It\'s in the town."\n• T monitors pair practice.',
          studentActivity: '• Ss ask and answer in pairs: Pupil A holds card, Pupil B answers.',
          expectedOutcome: 'Ss ask and answer fluently.'
        },
        {
          id: 'act4',
          name: 'Activity 4. PRODUCTION (8 mins)',
          duration: '8 mins',
          objective: 'Present their dream school location to the class.',
          content: 'Mini Presentation: "My Dream School".',
          methodsAndTechniques: 'Speaking presentation & Peer feedback.',
          teacherActivity: '• T invites 3 pupils to show their mini drawings and present: "My school is in..."',
          studentActivity: '• Ss present proudly and peers give applause and star stickers.',
          expectedOutcome: 'Ss use language creatively in authentic context.'
        }
      ],
      differentiation: {
        needingSupport: ['Provide visual cards with text cues.'],
        advanced: ['Encourage adding reasons: "It\'s in the city because it has a big library."']
      },
      consolidation: 'Review 4 school places and location pattern.',
      assessment: {
        methods: ['Teacher observation', 'Peer feedback'],
        tools: ['Speaking Rubric A1'],
        rubrics: ['Achieved / Needs support']
      }
    }
  },
  {
    id: 'wh_lp_tv3_cd1_b5',
    title: 'Chủ điểm 1: Mái trường mến yêu - Bài 5: Nhật kí tập bơi',
    subject: 'Tiếng Việt',
    grade: 'Lớp 3',
    unit: 'Chủ điểm 1: Mái trường mến yêu',
    lesson: 'Bài 5: Nhật kí tập bơi (Tiết 1 & 2)',
    period: 'Tiết 1 - 2 (70 phút)',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    pageRange: 'Trang 24 - 27',
    duration: '70 phút',
    summary: 'Đọc đúng, diễn cảm bài "Nhật kí tập bơi", hiểu nội dung kiên trì rèn luyện và mở rộng vốn từ về trường học, thể thao theo CV 2345.',
    tags: ['Kết nối tri thức', 'Tiếng Việt 3', 'Tập đọc', 'CV 2345', 'CTGDPT 2018'],
    createdAt: '2025-08-13T08:00:00.000Z',
    updatedAt: '2025-08-13T08:00:00.000Z',
    isFavorite: true,
    fullPlan: {
      id: 'plan_tv3_cd1_b5',
      subject: 'Tiếng Việt',
      grade: 'Lớp 3',
      unit: 'Chủ điểm 1: Mái trường mến yêu',
      lesson: 'Bài 5: Nhật kí tập bơi',
      period: 'Tiết 1 - 2 (70 phút)',
      lessonName: 'BÀI 5: NHẬT KÍ TẬP BƠI (TIẾT 1 & 2)',
      topic: 'Rèn luyện tính kiên trì, kỹ năng bơi lội an toàn và phòng chống đuối nước',
      duration: '70 phút',
      bookSeries: 'Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)',
      pageRange: 'Trang 24 - 27',
      language: 'vi',
      officialReferences: DEFAULT_OFFICIAL_REFERENCES,
      objectives: {
        knowledgeAndSkills: [
          '• Đọc đúng từ ngữ khó: ngụp lặn, sặc nước, phao bơi, tự tin.',
          '• Đọc trôi chảy, ngắt nghỉ đúng dấu câu, thể hiện được cảm xúc háo hức rồi tự tin của bạn nhỏ.',
          '• Hiểu nội dung: Bạn nhỏ kiên trì vượt qua nỗi sợ nước để học bơi thành công.'
        ],
        coreCompetencies: [
          '• Năng lực ngôn ngữ: Đọc hiểu văn bản nhật kí, kể lại được trải nghiệm đáng nhớ.',
          '• Năng lực tự chủ và tự học: Tự giác luyện đọc và trả lời câu hỏi SGK.'
        ],
        personalQualities: [
          '• Chăm chỉ: Kiên trì rèn luyện thể dục thể thao.',
          '• Trách nhiệm: Biết ý thức an toàn khi ở gần sông nước.'
        ],
        digitalCompetency: [
          '• 1.1.CB1a: HS quan sát video ngắn về kỹ năng bơi an toàn trên màn hình thông minh.'
        ]
      },
      materials: {
        teacher: ['SGK Tiếng Việt 3, Slide bài giảng điện tử, video hướng dẫn bơi an toàn.'],
        student: ['SGK, Vở bài tập Tiếng Việt 3, bút.'],
        digitalTools: ['SmartEdu Vòng quay may mắn chọn học sinh đọc bài']
      },
      activities: [
        {
          id: 'act1',
          name: 'Hoạt động 1: Khởi động (5 phút)',
          duration: '5 phút',
          objective: 'Tạo tâm thế hào hứng, kết nối trải nghiệm bơi lội vào bài đọc.',
          content: 'Trò chơi: "Ai biết bơi giơ tay" & Quan sát tranh mở bài.',
          teacherActivity: '• GV chiếu hình ảnh hồ bơi sinh động và hỏi: "Em nào đã từng đi tập bơi? Cảm giác ngày đầu tiên xuống nước thế nào?"',
          studentActivity: '• HS hào hứng chia sẻ cảm xúc: "Lúc đầu em hơi sợ nước, sau đó rất vui ạ!"',
          expectedOutcome: 'HS vui vẻ, kết nối tự nhiên vào bài học mới.'
        },
        {
          id: 'act2',
          name: 'Hoạt động 2: Khám phá - Luyện đọc đúng & Tìm hiểu bài (30 phút)',
          duration: '30 phút',
          objective: 'Đọc đúng từ khó, ngắt nghỉ câu dài và trả lời 4 câu hỏi đọc hiểu trong SGK.',
          content: 'Luyện đọc từng đoạn theo nhóm đôi & Trả lời câu hỏi 1, 2, 3, 4 trang 25.',
          teacherActivity: '• GV đọc mẫu toàn bài với giọng tươi vui, hào hứng.\n• GV hướng dẫn ngắt giọng câu dài.\n• GV tổ chức đọc theo nhóm 2 và điều hành phần tìm hiểu bài.',
          studentActivity: '• HS lắng nghe, đọc nối tiếp câu, đọc trong nhóm 2.\n• HS thảo luận và trả lời: "Ngày đầu bạn nhỏ sợ vì bị sặc nước, sau đó nhờ thầy giáo tận tình và kiên trì nên bạn đã biết bơi ếch."',
          expectedOutcome: 'HS đọc trôi chảy và nắm chắc bài học về lòng kiên trì.'
        },
        {
          id: 'act3',
          name: 'Hoạt động 3: Luyện tập - Luyện đọc lại & Mở rộng vốn từ (25 phút)',
          duration: '25 phút',
          objective: 'Luyện đọc diễn cảm đoạn yêu thích và mở rộng vốn từ về thể thao, rèn luyện.',
          content: 'Luyện đọc diễn cảm & Bài tập 1, 2 trang 26.',
          teacherActivity: '• GV hướng dẫn nhấn giọng ở các từ ngữ: "háo hức, ngụp lặn, sung sướng".\n• GV tổ chức thi đọc diễn cảm giữa các tổ.',
          studentActivity: '• Đại diện các tổ lên thi đọc, cả lớp bình chọn bạn đọc hay nhất.\n• HS hoàn thành bài tập mở rộng vốn từ vào vở.',
          expectedOutcome: 'HS thể hiện tốt ngữ điệu và làm đúng bài tập.'
        },
        {
          id: 'act4',
          name: 'Hoạt động 4: Vận dụng (10 phút)',
          duration: '10 phút',
          objective: 'Viết 2-3 câu chia sẻ về một môn thể thao hoặc kỹ năng em muốn học.',
          content: 'Viết ngắn & Giáo dục kỹ năng phòng chống đuối nước.',
          teacherActivity: '• GV yêu cầu: "Hãy viết 2 câu vào phiếu nhỏ về việc em muốn kiên trì rèn luyện."\n• GV lồng ghép nhắc nhở an toàn sông nước.',
          studentActivity: '• HS viết bài, dán lên cây tri thức của lớp.\n• HS lắng nghe quy tắc an toàn khi bơi.',
          expectedOutcome: 'HS vận dụng bài học vào ý thức rèn luyện bản thân.'
        }
      ],
      differentiation: {
        needingSupport: ['GV cho đọc từng đoạn ngắn và hướng dẫn đánh vần từ khó.'],
        advanced: ['Khuyến khích đọc phân vai và nêu bài học sâu sắc cho bản thân.']
      },
      consolidation: 'Củng cố thông điệp: Kiên trì, không nản chí trước khó khăn.',
      assessment: {
        methods: ['Quan sát đọc', 'Đánh giá vở bài tập'],
        tools: ['Bảng kiểm kỹ năng đọc thành tiếng']
      }
    }
  },
  {
    id: 'wh_lp_toan3_c1_b12',
    title: 'Chương 1: Bảng nhân 7 và Bảng chia 7',
    subject: 'Toán',
    grade: 'Lớp 3',
    unit: 'Chương 1: Phép nhân và phép chia trong phạm vi 1000',
    lesson: 'Bảng nhân 7 (Tiết 1)',
    period: 'Tiết 1 (35 phút)',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    pageRange: 'Trang 42 - 44',
    duration: '35 phút',
    summary: 'Thành lập Bảng nhân 7 từ phép cộng lặp lại, tính nhẩm nhanh và giải toán có lời văn thực tế theo CV 2345.',
    tags: ['Kết nối tri thức', 'Toán 3', 'Bảng nhân 7', 'Tính nhẩm', 'CV 2345'],
    createdAt: '2025-08-12T08:00:00.000Z',
    updatedAt: '2025-08-12T08:00:00.000Z',
    isFavorite: false,
    fullPlan: {
      id: 'plan_toan3_c1_b12',
      subject: 'Toán',
      grade: 'Lớp 3',
      unit: 'Chương 1: Phép nhân và phép chia trong phạm vi 1000',
      lesson: 'Bảng nhân 7',
      period: 'Tiết 1 (35 phút)',
      lessonName: 'BẢNG NHÂN 7 (TIẾT 1)',
      topic: 'Hình thành bảng nhân 7, học thuộc và vận dụng giải toán thực tế',
      duration: '35 phút',
      bookSeries: 'Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)',
      pageRange: 'Trang 42 - 44',
      language: 'vi',
      officialReferences: DEFAULT_OFFICIAL_REFERENCES,
      objectives: {
        knowledgeAndSkills: [
          '• Thành lập được bảng nhân 7 dựa trên bản chất phép cộng các số hạng bằng nhau (7 + 7 = 7 x 2 = 14...).',
          '• Thuộc lòng bảng nhân 7 và tính nhẩm thành thạo.',
          '• Giải được bài toán thực tế đơn giản có lời văn sử dụng phép nhân 7.'
        ],
        coreCompetencies: [
          '• Năng lực tư duy và lập luận toán học: Phát hiện quy luật cộng thêm 7 đơn vị.',
          '• Năng lực mô hình hóa toán học: Chuyển tình huống thực tế sang phép nhân 7.'
        ],
        personalQualities: [
          '• Chăm chỉ và cẩn thận khi tính toán.'
        ]
      },
      materials: {
        teacher: ['Bộ đồ dùng học Toán lớp 3, các tấm thẻ có 7 chấm tròn, slide tương tác.'],
        student: ['Bộ đồ dùng que tính/chấm tròn, bảng con, SGK Toán 3 Kết nối tri thức.'],
        digitalTools: ['SmartEdu Game Vua Tính Nhẩm Bảng Nhân 7']
      },
      activities: [
        {
          id: 'act1',
          name: 'Hoạt động 1: Khởi động (4 phút)',
          duration: '4 phút',
          objective: 'Ôn tập đếm thêm 7 đơn vị và tạo không khí vui tươi.',
          content: 'Trò chơi: "Đếm nhảy 7 bước" (7, 14, 21, 28, 35, 42, 49, 56, 63, 70).',
          methodsAndTechniques: 'Trò chơi vận động, Hỏi đáp nhanh.',
          teacherActivity: '• GV hô: "7 thêm 7 bằng mấy?", chỉ định HS tiếp sức nhanh.\n• GV dẫn dắt vào bài mới.',
          studentActivity: '• Cả lớp đứng dậy vận động và hô to kết quả nối tiếp nhau.\n• HS mở SGK trang 42.',
          expectedOutcome: 'Tạo tâm thế hào hứng và nhớ lại quy luật đếm thêm 7.'
        },
        {
          id: 'act2',
          name: 'Hoạt động 2: Hình thành kiến thức mới (14 phút)',
          duration: '14 phút',
          objective: 'Thành lập bảng nhân 7 từ 7 x 1 đến 7 x 10.',
          content: 'Hình thành các phép tính trong bảng nhân 7.',
          methodsAndTechniques: 'Trực quan, Thảo luận nhóm đôi, Quy nạp toán học.',
          teacherActivity: '• GV gắn 1 tấm thẻ có 7 chấm tròn: "7 lấy 1 lần bằng mấy?" -> 7 x 1 = 7.\n• Gắn tiếp tấm thứ 2: "7 lấy 2 lần là 7 + 7 = 14" -> 7 x 2 = 14.\n• Yêu cầu HS dùng que tính/chấm tròn tự lập các phép tính còn lại.',
          studentActivity: '• HS thao tác trên bộ đồ dùng học tập theo nhóm đôi.\n• HS nêu kết quả và ghi vào bảng nhóm.\n• Cả lớp đồng thanh đọc bảng nhân 7.',
          expectedOutcome: 'HS hiểu bản chất phép nhân và hoàn thành bảng nhân 7.'
        },
        {
          id: 'act3',
          name: 'Hoạt động 3: Luyện tập, thực hành (11 phút)',
          duration: '11 phút',
          objective: 'Học thuộc bảng nhân 7 và làm bài tập 1, 2 (SGK tr.43).',
          content: 'Tính nhẩm và điền số thích hợp vào ô trống.',
          methodsAndTechniques: 'Luyện tập cá nhân, Trò chơi truyền điện.',
          teacherActivity: '• GV tổ chức trò chơi "Truyền điện" đọc thuộc bảng nhân 7.\n• GV hướng dẫn HS làm bài tập 1 (Tính nhẩm) và bài tập 2 vào vở.',
          studentActivity: '• HS tham gia truyền điện sôi nổi.\n• HS làm bài cá nhân và đổi vở kiểm tra chéo.',
          expectedOutcome: '100% HS làm đúng bài tập tính nhẩm cơ bản.'
        },
        {
          id: 'act4',
          name: 'Hoạt động 4: Vận dụng (6 phút)',
          duration: '6 phút',
          objective: 'Vận dụng bảng nhân 7 vào giải quyết bài toán thực tế (Bài 3 SGK).',
          content: 'Giải toán có lời văn: Mỗi tuần lễ có 7 ngày, hỏi 4 tuần lễ có bao nhiêu ngày?',
          methodsAndTechniques: 'Giải quyết vấn đề, Làm việc cá nhân.',
          teacherActivity: '• GV nêu bài toán thực tế.\n• GV gợi ý tóm tắt và hướng dẫn trình bày bài giải.',
          studentActivity: '• 1 HS lên bảng giải, cả lớp làm vào vở: "4 tuần lễ có số ngày là: 7 x 4 = 28 (ngày)".\n• HS nhận xét bài bạn.',
          expectedOutcome: 'HS biết áp dụng phép nhân 7 để tính toán trong đời sống.'
        }
      ],
      differentiation: {
        needingSupport: ['Sử dụng bảng cộng hoặc que tính để tìm kết quả nếu chưa thuộc.'],
        advanced: ['Tính nhẩm nhanh các bài toán mở rộng: 7 x 11, 7 x 12 hoặc giải bài toán 2 bước tính.']
      },
      consolidation: 'Củng cố quy luật bảng nhân 7: Tích liền sau hơn tích liền trước 7 đơn vị.',
      assessment: {
        methods: ['Quan sát thao tác đồ dùng', 'Đánh giá bài làm trong vở'],
        tools: ['Bảng kiểm kỹ năng tính nhẩm']
      }
    }
  }
];

export function generateSmartEduLessonPlan(params: {
  subject?: string;
  grade?: string | number;
  bookSeries?: string;
  unit?: string;
  lesson?: string;
  lessonName?: string;
  period?: string;
  activityScope?: string;
  customActivityText?: string;
  customVocabulary?: string[] | string;
  customSentencePatterns?: string[] | string;
  textbookId?: string;
  duration?: string;
  attachedImages?: string[];
  customTopic?: string;
  customTeacherNote?: string;
  selectedTextbook?: import('../types').StoredTextbook;
  officialReferences?: import('../types').OfficialReference[];
  weekNumber?: number;
  sectionId?: string;
  sectionTitle?: string;
  gameId?: string;
  gameName?: string;
  gameRule?: string;
  methodId?: string;
  methodName?: string;
  methodDescription?: string;
  teachingSituation?: string;
  disabilitySupport?: import('../types').DisabilitySupportConfig;
}): import('../types').LessonPlanFull {
  const isEnglish = params.subject === 'Tiếng Anh' || params.subject === 'English';
  const gradeNum = typeof params.grade === 'number' ? params.grade : parseInt(String(params.grade || '3').replace(/\D/g, ''), 10) || 3;
  const tb = params.selectedTextbook || INITIAL_STORED_TEXTBOOKS.find(t => t.id === params.textbookId) || INITIAL_STORED_TEXTBOOKS.find(t => t.grade === gradeNum && (isEnglish ? t.subject === 'Tiếng Anh' : true));

  const refs = params.officialReferences && params.officialReferences.length > 0
    ? params.officialReferences
    : DEFAULT_OFFICIAL_REFERENCES;

  const effectiveUnit = params.unit || tb?.chapterOrUnit || (isEnglish ? `Unit 1: Hello` : `Chủ đề 1`);
  const effectiveLesson = params.lesson || tb?.lessonName || (isEnglish ? `Lesson 1` : `Bài 1`);
  const effectivePeriod = params.period || `Tiết 1 (35 phút)`;
  const actScope = params.activityScope || 'act_1_2_3';
  const effectivePageRange = tb?.pageRange || 'Trang 10 - 12';

  const normalizedAttachedImages: import('../types').AttachedImage[] = (params.attachedImages || []).map((img: any, idx: number) => {
    if (typeof img === 'string') {
      return {
        id: `img_${idx}_${Date.now()}`,
        name: `Tài liệu đính kèm ${idx + 1}`,
        dataUrl: img,
        pageType: 'general' as const
      };
    }
    return img;
  });

  if (isEnglish) {
    const isG12 = gradeNum === 1 || gradeNum === 2;
    const gradeKey = `Lớp ${gradeNum}`;
    const foundCurriculum = GLOBAL_SUCCESS_CURRICULUM[gradeKey] || GLOBAL_SUCCESS_CURRICULUM['Lớp 3'] || [];
    const foundUnit = foundCurriculum.find(u => u.unit.toLowerCase().includes((effectiveUnit || '').toLowerCase())) || foundCurriculum[0];
    let cleanVocabArray: string[] = [];
    if (params.customVocabulary) {
      if (Array.isArray(params.customVocabulary)) {
        cleanVocabArray = params.customVocabulary.map(v => String(v).trim()).filter(Boolean);
      } else if (typeof params.customVocabulary === 'string') {
        cleanVocabArray = params.customVocabulary.split(/[,;\n]+/).map(v => v.trim()).filter(Boolean);
      }
    }
    if (!cleanVocabArray || cleanVocabArray.length === 0) {
      cleanVocabArray = foundUnit?.vocabulary || tb?.keyVocabulary || ['school', 'bag', 'book', 'pen', 'pencil', 'ruler'];
    }

    let sentencePatternsArray: string[] = [];
    if (params.customSentencePatterns) {
      if (Array.isArray(params.customSentencePatterns)) {
        sentencePatternsArray = params.customSentencePatterns.map(s => String(s).trim()).filter(Boolean);
      } else if (typeof params.customSentencePatterns === 'string') {
        sentencePatternsArray = params.customSentencePatterns.split(/[;\n]+/).map(s => s.trim()).filter(Boolean);
      }
    }
    if (!sentencePatternsArray || sentencePatternsArray.length === 0) {
      sentencePatternsArray = foundUnit?.sentencePatterns || tb?.keySentences || ['What is this? - It\'s a pen.'];
    }

    const vocabList = cleanVocabArray.join(', ');
    const sentenceList = sentencePatternsArray.join(' | ');

    // Extract phonics letter, sound, and clean vocabulary words for Global Success 1 and 2
    const topicStr = foundUnit?.topic || '';
    const letterMatch = topicStr.match(/Letter\s+([A-Za-z])(?:\s*\/([^\/]+)\/)?/i);
    const letterUpper = letterMatch ? letterMatch[1].toUpperCase() : (cleanVocabArray[0]?.[0]?.toUpperCase() || 'C');
    const letterLower = letterUpper.toLowerCase();
    const letterPair = `${letterUpper}/${letterLower}`;
    const sound = letterMatch && letterMatch[2] ? `/${letterMatch[2]}/` : `/${letterLower}/`;

    // Clean English vocabulary words (remove Vietnamese explanations like '(con mèo)')
    const rawVocab: string[] = (cleanVocabArray && cleanVocabArray.length > 0)
      ? cleanVocabArray
      : (foundUnit?.vocabulary || ['cat (con mèo)', 'car (ô tô)', 'cake (bánh ngọt)', 'cup (cái cốc)']);
    const cleanWords = rawVocab.map(v => v.replace(/\s*\([^)]*\)/g, '').trim()).filter(Boolean);
    const word1 = cleanWords[0] || 'cat';
    const word2 = cleanWords[1] || 'car';
    const word3 = cleanWords[2] || 'cake';
    const word4 = cleanWords[3] || 'cup';
    const wordsString = cleanWords.slice(0, 4).join(', ') || `${word1}, ${word2}, ${word3}, ${word4}`;

    // Unit number and textbook pages
    const unitNumMatch = (effectiveUnit || foundUnit?.unit || '').match(/\d+/);
    const unitNum = unitNumMatch ? parseInt(unitNumMatch[0], 10) : 2;
    const pageL1 = Math.max(6, (unitNum - 1) * 3 + 6);
    const pageL2 = pageL1 + 1;
    const pageL3 = pageL1 + 2;

    // Target sentence pattern for Lesson 3
    const rawPatterns: string[] = (sentencePatternsArray && sentencePatternsArray.length > 0)
      ? sentencePatternsArray
      : (foundUnit?.sentencePatterns || []);
    let sentencePattern = `I have a ${word2}.`;
    let sentencePatternBubble = `I have a _____.`;
    if (rawPatterns.length > 0) {
      const firstPattern = rawPatterns[0].split('/')[0].replace(/\s*\([^)]*\)/g, '').trim();
      if (firstPattern && firstPattern.length > 3) {
        sentencePattern = firstPattern;
        if (sentencePattern.includes(word1)) {
          sentencePatternBubble = sentencePattern.replace(word1, '_____');
        } else if (sentencePattern.includes(word2)) {
          sentencePatternBubble = sentencePattern.replace(word2, '_____');
        } else {
          sentencePatternBubble = sentencePattern.replace(/\b[A-Za-z]+(?=[.?!]?$)/, '_____');
        }
      }
    }

    // Determine Lesson 1, Lesson 2, Lesson 3 for Global Success 1 and 2
    const lessonStr = (params.lesson || effectiveLesson || '').toLowerCase();
    const periodStr = (params.period || effectivePeriod || '').toLowerCase();
    const scopeStr = (actScope || '').toLowerCase();

    // Check if Lesson 2: Activities 3, 4, 5 (Period 2)
    const isG12Lesson2 = isG12 && (
      scopeStr === 'act_3_4_5' ||
      scopeStr.includes('3, 4, 5') ||
      scopeStr === 'act_3_4' ||
      scopeStr.includes('3, 4') ||
      scopeStr.includes('lesson 2') ||
      lessonStr.includes('lesson 2') ||
      periodStr.includes('tiết 2') ||
      periodStr.includes('lesson 2')
    );

    // Check if Lesson 3: Activities 6, 7, 8 (Period 3)
    const isG12Lesson3 = isG12 && !isG12Lesson2 && (
      scopeStr === 'act_6_7_8' ||
      scopeStr.includes('6, 7, 8') ||
      scopeStr === 'act_5_6' ||
      scopeStr.includes('5, 6') ||
      scopeStr.includes('6, 7') ||
      scopeStr.includes('lesson 3') ||
      lessonStr.includes('lesson 3') ||
      periodStr.includes('tiết 3') ||
      periodStr.includes('lesson 3')
    );

    // Default for G1-2 is Lesson 1: Activities 1, 2 (Period 1)
    const isG12Lesson1 = isG12 && !isG12Lesson2 && !isG12Lesson3;

    // For Grade 3, 4, 5: Each Unit has 3 Lessons, each Lesson has 2 Periods
    const isG345 = !isG12;
    const isG345Lesson3 = isG345 && (
      lessonStr.includes('lesson 3') ||
      periodStr.includes('lesson 3') ||
      periodStr.includes('tiết 5') ||
      periodStr.includes('tiết 6') ||
      scopeStr.includes('lesson 3') ||
      scopeStr.includes('l3')
    );
    const isG345Lesson12 = isG345 && !isG345Lesson3;

    const isAct456 = !isG12 && (
      actScope === 'act_4_5_6' ||
      actScope.includes('4, 5, 6') ||
      actScope.includes('4_5_6') ||
      actScope === 'act_3_4' ||
      actScope === 'act_3_4_5' ||
      actScope === 'act_6_7_8' ||
      scopeStr.includes('4, 5, 6') ||
      scopeStr.includes('4_5_6') ||
      scopeStr.includes('tiết 2') ||
      periodStr.includes('tiết 2') ||
      periodStr.includes('tiết 4') ||
      periodStr.includes('tiết 6') ||
      periodStr.includes('hoạt động 4') ||
      periodStr.includes('period 2') ||
      periodStr.includes('period 4') ||
      periodStr.includes('period 6')
    );
    const isFull = !isG12 && (
      actScope === 'full' ||
      actScope.includes('Toàn bộ') ||
      actScope.includes('All') ||
      actScope === 'act_all' ||
      scopeStr.includes('toàn bộ') ||
      (scopeStr.includes('full') && !scopeStr.includes('1, 2, 3') && !scopeStr.includes('4, 5, 6'))
    );
    const isAct123 = !isG12 && !isAct456 && !isFull;

    let act1Name = '1. Look, listen and repeat';
    let act2Name = '2. Listen, point and say (Vocabulary & Model sentence)';
    let act3Name = "3. Let's talk";
    let act4Name = '4. Listen and tick / circle';
    let act5Name = '5. Look, complete and read (+ Role play)';
    let act6Name = "6. Let's sing / Let's play";

    if (isG12) {
      act1Name = '1. Listen and repeat';
      act2Name = '2. Point and say';
      act3Name = "3. Listen and chant";
      act4Name = '4. Listen and tick';
      act5Name = '5. Look and trace';
      act6Name = "6. Listen and repeat";
    } else if (isG345Lesson3) {
      act1Name = '1. Phonics / Word stress';
      act2Name = '2. Listen and circle / Listen and tick';
      act3Name = "3. Listen and chant";
      act4Name = '4. Read and circle / Read and match';
      act5Name = "5. Let's write (Complete text with own information)";
      act6Name = "6. Project (Poster presentation / Show and tell)";
    }

    let scopeSuffix = 'Activities 1, 2, 3 (Period 1)';
    if (isG12) {
      if (isG12Lesson1) scopeSuffix = 'Activities 1, 2 (Lesson 1 - Period 1)';
      else if (isG12Lesson2) scopeSuffix = 'Activities 3, 4, 5 (Lesson 2 - Period 2)';
      else if (isG12Lesson3) scopeSuffix = 'Activities 6, 7, 8 (Lesson 3 - Period 3)';
      else scopeSuffix = 'Activities 1 to 8 (Full Unit)';
    } else if (isG345Lesson3) {
      if (isAct123) scopeSuffix = 'Activities 1, 2, 3 (Lesson 3 - Period 1: Phonics/Stress & Chant)';
      else if (isAct456) scopeSuffix = 'Activities 4, 5, 6 (Lesson 3 - Period 2: Reading, Writing & Project)';
      else scopeSuffix = 'Activities 1 to 6 (Lesson 3 Full - 2 Periods)';
    } else {
      if (isAct123) scopeSuffix = `Activities 1, 2, 3 (${effectiveLesson || 'Lesson 1'} - Period 1)`;
      else if (isAct456) scopeSuffix = `Activities 4, 5, 6 (${effectiveLesson || 'Lesson 1'} - Period 2)`;
      else scopeSuffix = `Activities 1 to 6 (${effectiveLesson || 'Lesson 1'} Full - 2 Periods)`;
    }

    const effectiveLessonName = params.lessonName || tb?.lessonName || tb?.title || `Unit ${unitNum}: ${effectiveUnit} - ${effectiveLesson}`;
    const effectiveTopic = `${effectiveUnit} - ${effectiveLesson}: ${cleanVocabArray.slice(0, 3).join(', ')}`;

    // Resolve context-aware, unit-specific integrations (AI, NLS, ATGT, KNS, Ethics)
    const specificIntegration = getLessonSpecificIntegrations({
      grade: gradeKey,
      week: params.weekNumber || 1,
      unitCode: effectiveUnit,
      lessonTitle: effectiveLessonName,
      periodNumber: 1,
      periodInWeek: 1,
      lessonPart: `${effectiveUnit} - ${effectiveLesson}`,
      scope: actScope,
      vocab: cleanVocabArray,
      patterns: foundUnit?.sentencePatterns || [],
      activityScope: isG12Lesson1 || isAct123 ? 'act123' : isG12Lesson2 || isAct456 ? 'act456' : 'all'
    });

    const disabilityConfig = params.disabilitySupport;
    const hasDisabilities = Boolean(
      disabilityConfig &&
      disabilityConfig.enabled &&
      disabilityConfig.selectedTypes &&
      disabilityConfig.selectedTypes.length > 0 &&
      !disabilityConfig.selectedTypes.every(t => t === 'none')
    );
    const activeDisabilityTypes = hasDisabilities
      ? disabilityConfig!.selectedTypes.filter(t => t !== 'none')
      : [];

    // Red objectives for Students with Disabilities (Mục tiêu chung dành cho học sinh khuyết tật)
    // Quy chuẩn: Bắt đầu bằng động từ, ngắn gọn, cụ thể, đúng trọng tâm, bôi đỏ
    const redObjectiveSpans: string[] = [];
    if (hasDisabilities) {
      if (activeDisabilityTypes.includes('physical')) {
        redObjectiveSpans.push(
          '<span style="color:red;">• Đối với học sinh khuyết tật: Thực hiện thao tác chỉ tranh, gật đầu lựa chọn phương án thay cho viết và vận động nhanh; tham gia giao tiếp cùng bạn theo khả năng.</span>'
        );
      }
      if (activeDisabilityTypes.includes('hearing_speech')) {
        redObjectiveSpans.push(
          '<span style="color:red;">• Đối với học sinh khuyết tật: Quan sát khẩu hình miệng, nhận biết âm thanh mẫu và làm cử chỉ TPR minh họa hoặc nhắc lại từ ngữ quen thuộc theo khả năng.</span>'
        );
      }
      if (activeDisabilityTypes.includes('visual')) {
        redObjectiveSpans.push(
          '<span style="color:red;">• Đối với học sinh khuyết tật: Lắng nghe âm thanh mẫu, cảm nhận đồ vật thật/tranh phóng to và nhắc lại từ vựng theo hướng dẫn của giáo viên.</span>'
        );
      }
      if (activeDisabilityTypes.includes('intellectual')) {
        redObjectiveSpans.push(
          `<span style="color:red;">• Đối với học sinh khuyết tật: Nhận biết và nhắc lại được 1-2 từ vựng/mẫu câu trọng tâm (${cleanVocabArray.slice(0, 2).join(', ') || 'từ vựng cơ bản'}) với sự trợ giúp của giáo viên và bạn cùng tiến.</span>`
        );
      }
      if (activeDisabilityTypes.includes('neurological_mental')) {
        redObjectiveSpans.push(
          '<span style="color:red;">• Đối với học sinh khuyết tật: Tham gia các hoạt động học tập theo nhịp độ cá nhân trong không khí lớp học thoải mái, thân thiện, không áp lực.</span>'
        );
      }
      if (activeDisabilityTypes.includes('other')) {
        redObjectiveSpans.push(
          '<span style="color:red;">• Đối với học sinh khuyết tật: Tiếp thu bài học theo mục tiêu cá nhân hóa, nhận biết và nhắc lại được từ vựng cơ bản của bài.</span>'
        );
      }
      if (disabilityConfig?.teacherNotes && disabilityConfig.teacherNotes.trim()) {
        redObjectiveSpans.push(
          `<span style="color:red;">• Lưu ý riêng cho học sinh khuyết tật: Thực hiện kế hoạch giáo dục cá nhân (${disabilityConfig.teacherNotes.trim()}).</span>`
        );
      }
    }

    const englishRefs: import('../types').OfficialReference[] = [
      ...refs.filter(r => !r.code.includes('2345')),
      {
        id: 'ref_eng_2018',
        title: 'Chương trình GDPT 2018 Môn Tiếng Anh cấp Tiểu học (CEFR A1)',
        code: 'GDPT 2018 Primary English',
        issuer: 'Bộ Giáo dục và Đào tạo',
        url: 'https://moet.gov.vn',
        summary: 'Chương trình Tiếng Anh tiểu học chuẩn đầu ra Bậc 1 theo Khung năng lực ngoại ngữ 6 bậc.',
        isRequired: true,
        isActive: true
      },
      {
        id: 'ref_cv2345_eng',
        title: 'Công văn 2345/BGDĐT-GDTH về Hướng dẫn xây dựng Kế hoạch bài dạy môn Tiếng Anh',
        code: 'Công văn 2345/BGDĐT-GDTH',
        issuer: 'Bộ Giáo dục và Đào tạo',
        url: 'https://moet.gov.vn',
        summary: 'Tiến trình chuẩn hóa 5 giai đoạn sư phạm và cấu trúc bảng 3 cột cho bài dạy tiếng Anh tiểu học.',
        isRequired: true,
        isActive: true
      }
    ];

    // BUILD ACTIVITIES BASED ON ACTIVITY SCOPE (5-STAGE STANDARDS A-E)
    let activitiesList: import('../types').LessonPlanActivity[] = [];

    const customLines = (params.customActivityText || '').split('\n').map(l => l.trim()).filter(l => l.length > 0);

    if (customLines.length > 0) {
      scopeSuffix = `Custom Scope (${customLines.length} activities)`;
      activitiesList = customLines.map((line, idx) => {
        const cleanName = line.replace(/^[0-9]+[.\-)]\s*/, '').trim();
        const stageLabel = ['A. Warm-up & Review', 'B. Exploration (Context Discovery)', 'C. Knowledge Construction (Phonics & CCQs)', 'D. Practice (Controlled & Guided Drills)', 'E. Production / Real-life Application', 'F. Wrap-up & Project'][idx] || `Activity ${idx + 1}`;
        const isWarmUp = idx === 0 || cleanName.toLowerCase().includes('warm') || cleanName.toLowerCase().includes('game') || cleanName.toLowerCase().includes('song') || cleanName.toLowerCase().includes('khởi động');
        const isExploration = !isWarmUp && (idx === 1 || cleanName.toLowerCase().includes('look') || cleanName.toLowerCase().includes('listen and repeat') || cleanName.toLowerCase().includes('khám phá'));
        
        return {
          id: `act_${idx + 1}`,
          name: `Activity ${idx + 1}. ${stageLabel}: ${cleanName}`,
          duration: `${Math.max(4, Math.round(35 / customLines.length))} mins`,
          aims: isWarmUp 
            ? `Energize pupils, activate schema, and lead into ${cleanName} with interactive TPR and games.`
            : `Develop communicative competence and target skills through ${cleanName}.`,
          objective: isWarmUp
            ? `Energize pupils, activate schema, and lead into ${cleanName} with interactive TPR and games.`
            : `Pupils actively participate in ${cleanName} with high accuracy and confidence.`,
          content: `${cleanName}. Target vocabulary: ${vocabList} | Sentence pattern: ${sentenceList}`,
          methodsAndTechniques: isWarmUp ? 'Game-based learning, Total Physical Response (TPR)' : isExploration ? 'Visual contextualization, Gist listening' : 'Guided pair work, Substitution drill, Concept Checking Questions (CCQs)',
          teacherActivity: isWarmUp 
            ? `• NỘI DUNG:\n- Khởi động lớp học, tạo không khí hào hứng và kích hoạt kiến thức nền cho ${cleanName}.\n\n• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):\nStep 1: Teacher introduces ${cleanName} with clear rules and models 1 sample item.\nStep 2: Teacher coordinates whole-class participation, awards star stickers, and leads smoothly into the main lesson.`
            : `• NỘI DUNG:\n- Thực hiện nhiệm vụ học tập của ${cleanName} theo SGK; luyện tập phát triển kỹ năng giao tiếp tiếng Anh.\n\n• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):\nStep 1: Teacher directs pupils' attention to ${cleanName} and explains the communicative objective.\nStep 2: Teacher demonstrates with examples and guides choral, row, and pair drilling.\nStep 3: Teacher asks Concept Checking Questions (CCQs) to ensure 100% comprehension.\nStep 4: Teacher invites volunteer pairs to perform and gives constructive feedback.`,
          studentActivity: isWarmUp
            ? `- Step 1: Pupils listen attentively to instructions and engage cheerfully in ${cleanName}.\n- Step 2: Pupils receive reward stars and transition with enthusiasm to the next stage.`
            : `- Step 1: Pupils observe teacher's model and look at the corresponding task in Student's Book.\n- Step 2: Pupils work in pairs/groups to practice ${cleanName}.\n- Step 3: Volunteer pairs come to the front to perform; peers evaluate with thumbs up.`,
          expectedOutcome: `Pupils actively participate, pronounce correctly, and achieve the learning objective of ${cleanName}.`,
          assessment: 'Teacher evaluates pronunciation accuracy, communicative fluency, and peer cooperation.',
          digitalCompetency: {
            code: '1.1.CB1a',
            expression: 'Pupils interact with digital audio and visual learning resources.',
            activity: `Engage with digital cues and interactive tasks during ${cleanName}.`,
            product: 'Accurate verbal responses and active engagement.',
            assessment: 'Teacher observation and praise.'
          }
        };
      });
    } else if (isG12Lesson1) {
      // =========================================================================
      // GLOBAL SUCCESS 1 & 2 - LESSON 1 (ACTIVITIES 1 & 2)
      // TIẾN TRÌNH CHUẨN THEO YÊU CẦU:
      // A: Warm-up / Review: Game / song / chant / review
      // B: Exploration: Hoạt động 1 (Dạy letter, sound, từ vựng TPR, picture, real things - 6 bước đầy đủ)
      // C: KNOWLEDGE CONSTRUCTION: Hoạt động 2 (Point and say - 6 bước đầy đủ)
      // D: Practice: Luyện tập thêm hoạt động 2 bằng nhiều hình thức (game, nhóm, vẽ tranh, tô màu, thuyết trình,...)
      // E: Production / Wrap-up: Game: Pass the ball!
      // =========================================================================
      activitiesList = [
        {
          id: 'act1',
          name: 'A: Warm-up / Review: Game / Song / Chant / Review (4 mins)',
          duration: '4 mins',
          aims: `Arouse pupils' interest, energize the classroom atmosphere, and activate schema related to the unit topic using a lively game, song, or chant.`,
          objective: `Arouse pupils' interest, energize the classroom atmosphere, and activate schema related to the unit topic using a lively game, song, or chant.`,
          content: 'Warm-up game/song/chant to create excitement and introduce the new topic.',
          methodsAndTechniques: 'Game-based learning, Total Physical Response (TPR), Chant with rhythm.',
          teacherActivity: `• NỘI DUNG:\n- Khởi động lớp học, tạo không khí hào hứng và kích hoạt kiến thức nền liên quan đến bài học bằng trò chơi/bài hát/chant sôi động kết hợp động tác TPR.\n\n• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):\nStep 1: Greet the class warmly and play an energetic chant or song on the board/hoclieu.vn.\nStep 2: Have pupils sing or chant along with hand-clapping and TPR body movements.\nStep 3: Lead into the new lesson by drawing attention to the topic, the target letter ${letterPair} and sound ${sound}.`,
          studentActivity: `- Step 1: Respond to teacher's greeting enthusiastically.\n- Step 2: Sing/chant aloud together, clapping hands and copying teacher's rhythmic actions.\n- Step 3: Direct attention to the board and prepare for the new letter, sound, and vocabulary.`,
          expectedOutcome: '100% of pupils are engaged, cheerful, and ready to discover the new letter and vocabulary.',
          assessment: 'Teacher observes pupils\' engagement, rhythm, and cheerful participation.',
          digitalCompetency: {
            code: '1.1.CB1a',
            expression: 'Pupils interact with digital audio and visual materials.',
            activity: 'Listen and react to digital audio cues.',
            product: 'Quick and accurate verbal responses.',
            assessment: 'Teacher observation and praise.'
          }
        },
        {
          id: 'act2',
          name: `B: Exploration: Hoạt động 1. Listen and repeat (Page ${pageL1} - 8 mins)`,
          duration: '8 mins',
          aims: `Teach the letter ${letterPair}, the sound ${sound}, and target vocabulary (${wordsString}) using TPR actions, visual flashcards, and real things (realia) through 6 clear steps.`,
          objective: `Teach the letter ${letterPair}, the sound ${sound}, and target vocabulary (${wordsString}) using TPR actions, visual flashcards, and real things (realia) through 6 clear steps.`,
          content: `Activity 1 (Student's Book page ${pageL1} / hoclieu.vn). Teaching letter ${letterPair}, sound ${sound}, and target words: ${wordsString}.`,
          methodsAndTechniques: 'Visual contextualization (hoclieu.vn), Phonics modeling, Total Physical Response (TPR), Realia demonstration.',
          teacherActivity: `• NỘI DUNG:
- Dạy chữ cái ${letterPair}, âm ${sound}, và từ vựng trọng tâm (${wordsString}) kết hợp đa giác quan: cử chỉ điệu bộ (TPR), tranh ảnh (picture flashcards), và đồ vật thật (real things / realia) với đầy đủ các bước chuẩn sư phạm:
  - Letter ${letterPair} & Sound ${sound}
  - Từ vựng 1: ${word1} (Dạy bằng picture flashcard & TPR action)
  - Từ vựng 2: ${word2} (Dạy bằng real things / realia & gesture)
  - Từ vựng 3: ${word3} (Dạy bằng visual cue & picture cue)
  - Từ vựng 4: ${word4} (Dạy bằng mime action & TPR movement)

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Open books or access hoclieu.vn. Have pupils look at the picture, saying "Look at the picture, please!" and describe it (in Vietnamese). Draw pupils’ attention to the letter ${letterPair}, the word next to Bill/characters and other words next to the things and the colour of the letter ${letterPair}.
Step 2: Ask pupils to point to the letter ${letterPair}. Have them listen and repeat the sound of the letter ${letterPair} (saying "Listen and repeat, please!") more than once, if necessary.
Step 3: Have pupils point to the ${word1} and/or the word ${word1} (saying "Point to the ${word1} and the word ${word1}"). Ask them to listen and repeat the word, saying "Listen and repeat, please!"
Step 4: Repeat the same procedure with the ${word2}, the ${word3} and the ${word4}. Give further support to those pupils who find it difficult to do the task (sử dụng picture flashcards, TPR actions, và đồ vật thật / real things / realia).
Step 5: Play the recording again and have them listen, point to the letter ${letterPair} and the ${word1}, ${word2}, ${word3} and ${word4} and repeat until they feel confident. Correct pronunciation, if necessary.
Step 6: Play the recording again and call some pupils to say the letter ${letterPair} and the words ${wordsString} in front of the class (saying "Well done!" when they performed well).`,
          studentActivity: `- Step 1: Open Student's Book page ${pageL1} or access hoclieu.vn. Look at the contextual picture, describe the scene (in Vietnamese), and spot the letter ${letterPair} and target items.\n- Step 2: Point to the letter ${letterPair}. Listen attentively to the recording and repeat the sound ${sound} clearly (chorus -> group -> individuals).\n- Step 3: Point to the ${word1} and the word ${word1}. Listen and repeat "${word1}" with accurate pronunciation.\n- Step 4: Repeat the procedure with ${word2}, ${word3}, and ${word4}, performing corresponding TPR actions and observing realia.\n- Step 5: Listen to the recording again, point to the letter ${letterPair} and items (${wordsString}), and repeat until confident.\n- Step 6: Volunteer pupils say the letter ${letterPair} and words (${wordsString}) in front of the class; peers applaud.`,
          expectedOutcome: `Pupils recognise the letter ${letterPair}, pronounce the sound ${sound} accurately, and say target words (${wordsString}) clearly.`,
          assessment: 'Teacher observes pronunciation, mouth shapes, pointing accuracy, and participation.'
        },
        {
          id: 'act3',
          name: `C: KNOWLEDGE CONSTRUCTION: Hoạt động 2. Point and say (Page ${pageL1} - 8 mins)`,
          duration: '8 mins',
          aims: `Construct firm knowledge of letter ${letterPair}, sound ${sound}, and target vocabulary (${wordsString}) through pointing, choral/group/pair drilling, and individual elicitation.`,
          objective: `Construct firm knowledge of letter ${letterPair}, sound ${sound}, and target vocabulary (${wordsString}) through pointing, choral/group/pair drilling, and individual elicitation.`,
          content: `Activity 2 (Student's Book page ${pageL1} / hoclieu.vn). Point and say the sound ${sound} and words: ${wordsString}.`,
          methodsAndTechniques: 'Poster / Book pointing drill, Phonics articulation, Pair work, Individual elicitation.',
          teacherActivity: `• NỘI DUNG:
- Củng cố và khắc sâu kiến thức về chữ cái ${letterPair}, âm ${sound} và các từ vựng (${wordsString}) qua hoạt động chỉ tranh và phát âm chuẩn xác.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Ask pupils to look at the picture again (Student’s book, page ${pageL1} or hoclieu.vn) or at Poster for ${foundUnit?.unit || 'Unit 2'}, saying "Look at the picture on Page ${pageL1}, please!". Ask them to describe the picture again (in Vietnamese). Draw their attention to the letter ${letterPair} and the words they have learnt in Activity 1.
Step 2: Get pupils to point to the letter ${letterPair}, saying "Look at the letter ${letterPair}, please!". Then have them listen to the recording and repeat the sound of the letter ${letterPair}, saying "Listen and repeat, please!"
Step 3: Let them point to ${word1} and say the word ${word1}, saying "Point to the ${word1} and say, please!". Give further support to those pupils who find it difficult to do the task.
Step 4: Follow the same procedure with other things (${word2}, ${word3}, ${word4}). Give further support to those pupils who find it difficult to do the task.
Step 5: Ask pupils to work in pairs or in groups to point to the picture and say the sound of the letter ${letterPair} and the words. Go around and offer help or correct pronunciation, if necessary.
Step 6: Invite two or three pupils to point to the picture and say the sound of the letter and the words in front of the class. If they performed well, praise them, saying "Well done!"`,
          studentActivity: `- Step 1: Look at the picture on page ${pageL1} or at the unit poster, describe the picture again in Vietnamese, and recall target words.\n- Step 2: Point to the letter ${letterPair}, listen to the recording, and repeat sound ${sound} in chorus and individually.\n- Step 3: Point to ${word1} and say "${word1}" clearly.\n- Step 4: Point to other items and say "${word2}", "${word3}", "${word4}".\n- Step 5: Work in pairs/groups: one pupil points to the picture/letter, the other says the sound and word; then swap roles.\n- Step 6: Volunteer pupils point to the poster/board and say the sound and words in front of the class with confidence.`,
          expectedOutcome: `Over 95% of pupils can point to pictures independently and pronounce the letter sound ${sound} and words (${wordsString}) accurately.`,
          assessment: 'Teacher evaluates pronunciation, pointing accuracy, and peer cooperation.'
        },
        {
          id: 'act4',
          name: `D: Practice: Luyện tập mở rộng Hoạt động 2 (8 mins)`,
          duration: '8 mins',
          aims: `Deepen vocabulary retention and phonics fluency through varied practice formats: interactive games, group work, drawing, coloring, and oral presentations.`,
          objective: `Deepen vocabulary retention and phonics fluency through varied practice formats: interactive games, group work, drawing, coloring, and oral presentations.`,
          content: `Extension practice for Activity 2 using multi-format learning: game "Slap the board", group practice, letter/word coloring and drawing worksheets, and mini-presentations.`,
          methodsAndTechniques: 'Game-based learning, Group work, Drawing & coloring, Oral presentation ("Point and Present").',
          teacherActivity: `• NỘI DUNG:
- Luyện tập thêm Hoạt động 2 bằng nhiều hình thức phong phú: trò chơi (game), làm việc nhóm (group work), vẽ tranh, tô màu, và thuyết trình tranh ("Point and Present").

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Game-based Drill ("Slap the board"): Place flashcards of ${wordsString} and letter ${letterPair} on the board. Divide the class into two teams. Call out a word or sound, two representatives race to slap the correct card and say it aloud.
Step 2: Group Work & Creative Task (Drawing / Coloring): Divide pupils into groups of 4-6. Distribute worksheets or have pupils draw/color the target letter ${letterPair} and items (${wordsString}) in their notebooks. Encourage pupils to say the words while coloring. Teacher circulates to assist.
Step 3: Mini-presentation ("Point and Present"): Invite representatives from groups to bring their drawings or point to classroom flashcards, introduce the items to the whole class: "Look! This is a ${word1}. It has sound ${sound}.". Teacher praises, says "Well done! / Excellent!", and awards bonus stars.`,
          studentActivity: `- Step 1: Participate excitedly in "Slap the board", racing to tap the correct card and pronounce the word/sound accurately.\n- Step 2: Work in groups of 4-6, practice saying words aloud with peers, and color/draw pictures of target items (${wordsString}) neatly.\n- Step 3: Group representatives hold up their artwork, point and present the target words proudly before the class; classmates applaud.`,
          expectedOutcome: 'Pupils retain target vocabulary securely, express creativity, and build confidence in English speaking.',
          assessment: 'Teacher assesses group collaboration, artwork completion, and presentation clarity.'
        },
        {
          id: 'act5',
          name: `E: Production / Wrap-up: Game "Pass the ball!" & Goodbye (7 mins)`,
          duration: '7 mins',
          aims: `Consolidate letter ${letterPair}, sound ${sound}, and vocabulary (${wordsString}) through the communicative game "Pass the ball!", summarize learning, and wrap up.`,
          objective: `Consolidate letter ${letterPair}, sound ${sound}, and vocabulary (${wordsString}) through the communicative game "Pass the ball!", summarize learning, and wrap up.`,
          content: `Game: "Pass the ball!" to produce target words independently, lesson review, and goodbye routine.`,
          methodsAndTechniques: 'Game-based production, Total Physical Response (TPR), Formative reinforcement.',
          teacherActivity: `• NỘI DUNG:
- Trò chơi vận dụng "Pass the ball!", củng cố toàn bộ chữ cái ${letterPair}, âm ${sound} và từ vựng (${wordsString}), tổng kết tiết học và dặn dò.

• TRÒ CHƠI: GAME: PASS THE BALL!
- Divide the class into 3 teams.
- Each team has 1 sticky ball (or soft ball).
- Play the music, pupils in each team take turns passing the ball.
- When the music ends, 3 pupils holding the ball stand up and say the words having the sound ${sound} / letter ${letterPair} (e.g., "${word1}!", "${word2}!", "${word3}!").
- Teacher praises and awards bonus stars for accurate pronunciation.

• TỔNG KẾT & DẶN DÒ (WRAP-UP):
Step 1: Point to the letter ${letterPair} and flashcards on the board, guide the whole class to chant the sound ${sound} and target words (${wordsString}) one last time.
Step 2: Remind pupils to point to things at home and say the words to their parents.
Step 3: Conduct goodbye routine: "Goodbye, class! - Goodbye, teacher!"`,
          studentActivity: `- Step 1: Play "Pass the ball!" enthusiastically, passing the ball quickly to the rhythm of the music.\n- Step 2: When the music stops, pupils holding the ball stand up proudly, say the words with sound ${sound} clearly in front of the class, and earn stars for their team.\n- Step 3: Chant the target letter, sound, and words together in a joyful whole-class chorus.\n- Step 4: Pack books neatly and respond: "Goodbye, teacher!"`,
          expectedOutcome: 'Pupils produce target words independently with high excitement, retaining the lesson gains.',
          assessment: 'Teacher evaluates oral production fluency and stamps reward stickers.'
        }
      ];
    } else if (isG12Lesson2) {
      // =========================================================================
      // GLOBAL SUCCESS 1 & 2 - LESSON 2 (ACTIVITIES 3, 4, 5)
      // TIẾN TRÌNH CHUẨN THEO YÊU CẦU:
      // A: Warm-up / Review: Game / sing
      // B: Practice: Hoạt động 3 (Listen and chant - giới thiệu từ/cụm từ/câu trong chant, 5 bước đầy đủ)
      // C: Practice: Hoạt động 4 (Listen and tick - 6 bước đầy đủ)
      // D: Practice: Hoạt động 5 (Look and trace - 6 bước đầy đủ)
      // E: Production / Wrap-up: Game
      // =========================================================================
      activitiesList = [
        {
          id: 'act1',
          name: 'A: Warm-up / Review: Game / Sing (4 mins)',
          duration: '4 mins',
          aims: `Review letter ${letterPair}, sound ${sound}, and vocabulary (${wordsString}) from Lesson 1 with an energetic game or song.`,
          objective: `Review letter ${letterPair}, sound ${sound}, and vocabulary (${wordsString}) from Lesson 1 with an energetic game or song.`,
          content: 'Warm-up game: "Flashcard Blitz" or singing the Alphabet Song to activate prior knowledge.',
          methodsAndTechniques: 'Game-based learning, Total Physical Response (TPR), Quick response drill.',
          teacherActivity: `• NỘI DUNG:\n- Ôn lại chữ cái ${letterPair}, âm ${sound} và từ vựng (${wordsString}) từ Lesson 1 thông qua trò chơi/bài hát nhịp điệu nhanh để chuẩn bị tâm thế cho bài chant.\n\n• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):\nStep 1: Greet pupils warmly and display flashcards of ${wordsString} on the board.\nStep 2: Host a quick guessing game: show half of a picture or make a sound cue, pupils call out the word.\nStep 3: Lead into the chant activity by asking pupils to clap their hands to a steady beat.`,
          studentActivity: `- Step 1: Greet teacher and look at the flashcards.\n- Step 2: Guess and call out the target words (${wordsString}) excitedly.\n- Step 3: Clap hands rhythmically to prepare for the chant.`,
          expectedOutcome: 'Pupils recall 100% of target vocabulary and are energized for the lesson.',
          assessment: 'Teacher observes speed of recall and pronunciation.'
        },
        {
          id: 'act2',
          name: `B: Practice: Hoạt động 3. Listen and chant (Page ${pageL2} - 8 mins)`,
          duration: '8 mins',
          aims: `Introduce words, phrases, and lines in the chant, familiarize pupils with rhythm and lyrics, and practice chanting sound ${sound} and words (${wordsString}) with clapping through 5 clear steps.`,
          objective: `Introduce words, phrases, and lines in the chant, familiarize pupils with rhythm and lyrics, and practice chanting sound ${sound} and words (${wordsString}) with clapping through 5 clear steps.`,
          content: `Activity 3 (Student's Book page ${pageL2} / hoclieu.vn). Rhythmic chant focusing on letter ${letterPair}, sound ${sound}, and words (${wordsString}).`,
          methodsAndTechniques: 'Rhythm exposure, Audio-visual contextualization (hoclieu.vn), Line-by-line chanting, Hand clapping and TPR.',
          teacherActivity: `• NỘI DUNG:
- Giới thiệu từ, cụm từ, và câu trong bài chant chứa chữ cái ${letterPair}, âm ${sound} và các từ vựng (${wordsString}).
- Hướng dẫn học sinh chant kết hợp vỗ tay theo phách theo quy trình 5 bước chuẩn sư phạm.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at the chant on page ${pageL2} in their books or on hoclieu.vn. Say "Look at the chant, please!". Draw pupils’ attention to the first line and explain its meaning. Ask them to pay attention to the letter ${letterPair} and the word ${word1}. Check comprehension.
Step 2: Let them look at the first line of the chant. Play the recording, ask pupils to listen and repeat the sound of the letter ${letterPair} and the word a ${word4}, saying "Look at the letter ${letterPair}, listen and repeat, please!". Then have them listen again and repeat the sound of the letter ${letterPair} and the word a ${word4} individually and in chorus. Say "Listen and repeat, please!". If they chanted well, praise them, saying "Well done!". Follow the same procedure with other lines. Correct pronunciation, if necessary. Show them how to chant and clap their hands.
Step 3: Play the recording all the way through again (more than once, if necessary) for pupils to do choral and individual repetition.
Step 4: Put the class into two groups to practise chanting and clapping. Each group should sing one verse of the chant, saying "Chant in groups, please!".
Step 5: If there is enough time, encourage a few groups to the front of the class to chant and clap their hands. The rest of the class may clap along to the rhythm. If they performed well, praise them, saying "Very good!".`,
          studentActivity: `- Step 1: Open Student's Book page ${pageL2} or look at hoclieu.vn. Look at the chant lines, listen to teacher explain meaning, and focus on letter ${letterPair} and word ${word1}.\n- Step 2: Listen to the recording, repeat the sound of letter ${letterPair} and words line by line in chorus and individually, clapping hands along.\n- Step 3: Listen to the whole chant and chant all the way through with rhythmic clapping.\n- Step 4: Practise chanting and clapping in two alternating groups.\n- Step 5: Volunteer groups come to the front of the class to perform the chant; classmates clap along to the rhythm.`,
          expectedOutcome: `Pupils chant fluently with accurate pronunciation of sound ${sound}, target words (${wordsString}), and correct rhythm.`,
          assessment: 'Teacher evaluates rhythmic accuracy, clear phonetic pronunciation, and group participation.'
        },
        {
          id: 'act3',
          name: `C: Practice: Hoạt động 4. Listen and tick (Page ${pageL2} - 8 mins)`,
          duration: '8 mins',
          aims: `Develop listening comprehension and auditory discrimination between target items, ticking the correct box through 6 clear steps.`,
          objective: `Develop listening comprehension and auditory discrimination between target items, ticking the correct box through 6 clear steps.`,
          content: `Activity 4 (Student's Book page ${pageL2} / hoclieu.vn). Question 1 (1a: a ${word1}, 1b: a ${word2}) and Question 2 (2a: a ${word3}, 2b: a ${word4}).`,
          methodsAndTechniques: 'Pre-listening prediction, Auditory discrimination, While-listening check, Confirmation.',
          teacherActivity: `• NỘI DUNG:
- Phát triển kỹ năng nghe hiểu và phân biệt âm/từ qua việc quan sát tranh, nghe và đánh dấu tick (✓) vào ô tương ứng với 6 bước rõ ràng:

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at the pictures (saying "Look at the pictures, please!") and say what they can see. You may say "Now look at the pictures in Question 1. What can you see? Can you see a ${word1}? Yes, a ${word1}. Can you see a ${word2}? Yes, a ${word2}.". Draw pupils’ attention to the boxes next to the letters a and b, saying "What do you see? You see a box? Yes, it’s a box. Now listen to the recording and tick the correct box.". Check comprehension.
Step 2: Invite some pupils to point to the pictures and say the words in front of the class, saying "Point to the pictures and say, please!" E.g. 1a: a ${word1}, 1b: a ${word2} and/or 2a: a ${word3}, 2b: a ${word4}.
Step 3: Play the recording of the first phrase for pupils to listen, saying "Now listen, please!". Play the recording of the first phrase for pupils to listen again.
Step 4: Ask pupils to say what they have heard and ticked. Say "What did you hear? Did you hear “a ${word1}“ or “a ${word2}”?". If some pupils say “a ${word2}”, let them listen to the recording again, saying "Now listen again, please!". Play the recording and ask "What did you hear? Did you hear “a ${word1}” or “a ${word2}”? Yes, “a ${word1}”. Tick the box a. So a is the correct answer.".
Step 5: Follow the same procedure with the pictures in Question 2. Before playing the recording, say "Are you ready? OK, now listen and tick, please!". Play the recording (several times if needed).
Step 6: Call a few pupils to the front of the class to point to the pictures and say what they have heard. E.g. 1. a ${word1}, 2. a ${word4}. If they said the correct words, praise them, saying "Well done!" or "Very good!".`,
          studentActivity: `- Step 1: Look at the pictures in Questions 1 and 2, identify items aloud ("a ${word1}", "a ${word2}", "a ${word3}", "a ${word4}"), and notice tick boxes.\n- Step 2: Volunteer pupils point to the pictures and say the words aloud in front of the class.\n- Step 3: Listen attentively to the first recorded phrase.\n- Step 4: Say what they heard, confirm the correct answer with teacher, and tick (✓) the box in books.\n- Step 5: Listen to Question 2 recording and tick the correct box.\n- Step 6: Point to the pictures in books, say the heard phrases aloud, and receive praise.`,
          expectedOutcome: 'Over 90% of pupils correctly identify the recorded words and tick the right boxes.',
          assessment: 'Teacher checks workbooks and observes auditory discrimination.'
        },
        {
          id: 'act4',
          name: `D: Practice: Hoạt động 5. Look and trace (Page ${pageL2} - 9 mins)`,
          duration: '9 mins',
          aims: `Recognise upper case ${letterUpper} and lower case ${letterLower}, understand stroke formation, air-trace, and trace neatly in books through 6 clear steps.`,
          objective: `Recognise upper case ${letterUpper} and lower case ${letterLower}, understand stroke formation, air-trace, and trace neatly in books through 6 clear steps.`,
          content: `Activity 5 (Student's Book page ${pageL2} / hoclieu.vn). Tracing upper case ${letterUpper} and lower case ${letterLower}.`,
          methodsAndTechniques: 'Board demonstration, Air-tracing, Kinesthetic tracing, Pair checking.',
          teacherActivity: `• NỘI DUNG:
- Nhận biết chữ in hoa ${letterUpper} và chữ thường ${letterLower}, nắm quy tắc nét viết, viết trên không (air-tracing) và tô chữ vào sách/vở bài tập với 6 bước sư phạm chi tiết:

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at the letter ${letterUpper} (upper case) and ${letterLower} (lower case), saying "What can you see? Yes, you can see the ${letterUpper} (upper case) and the ${letterLower} (lower case).". Point to the upper case ${letterUpper} and say "This is the letter ${letterUpper} (upper case).". Then point to the lower case ${letterLower} and say "and this is the letter ${letterLower} (lower case).". Check comprehension.
Step 2: Write the letter ${letterUpper} (upper case) and ${letterLower} (lower case) in broken lines on the board, saying "Look at the board. What can you see now? Yes, you can see the letter ${letterUpper} (upper case) and ${letterLower} (lower case).". Check to make sure pupils understand the letters written in solid lines and those in broken lines.
Step 3: Tell pupils to trace the letter ${letterPair}, saying "Now trace the letter ${letterPair} with your pencil.". You can demonstrate by air tracing or tracing the broken lines of the letter ${letterPair}. Then let pupils do the tracing. Give further support to those pupils who find it difficult to do the task.
Step 4: Check the results of pupils’ tracing and give feedback. Ask pupils to work in pairs and swap their answers, saying "Now work in pairs and check each other’s answers.". Give pupils time to work. Go around and offer help, if necessary.
Step 5: Ask some pupils to show what they have done. Praise them if they have done well, saying "Well done!" or "Good job!".
Step 6: If there is enough time, write the letter ${letterPair} in broken lines on the board and invite some pupils to trace them.`,
          studentActivity: `- Step 1: Look at upper case ${letterUpper} and lower case ${letterLower}, repeat their names, and distinguish upper/lower case forms.\n- Step 2: Observe teacher writing broken lines on the board and understand solid vs. broken lines.\n- Step 3: Air-trace the letter with index finger, then trace letter ${letterPair} neatly with pencils in Student's Book.\n- Step 4: Swap books with seat partner to check each other's tracing and give friendly comments.\n- Step 5: Hold up books to show completed work; receive teacher's stars and praise.\n- Step 6: Volunteer pupils come to the board and trace the broken lines neatly.`,
          expectedOutcome: `Pupils write and trace upper case ${letterUpper} and lower case ${letterLower} correctly in stroke order and neatness.`,
          assessment: 'Teacher checks sitting posture, pencil grip, handwriting neatness, and stamps stars.'
        },
        {
          id: 'act5',
          name: 'E: Production / Wrap-up: Game & Wrap-up (6 mins)',
          duration: '6 mins',
          aims: `Reinforce chant rhythm, handwriting achievements, and vocabulary through an engaging group game, summarize, and wrap up.`,
          objective: `Reinforce chant rhythm, handwriting achievements, and vocabulary through an engaging group game, summarize, and wrap up.`,
          content: 'Game: "Chant Battle" or "Letter & Word Bingo", lesson summary, and goodbye routine.',
          methodsAndTechniques: 'Game-based consolidation, Showcase, Goodbye routine.',
          teacherActivity: `• NỘI DUNG:\n- Trò chơi củng cố bài học ("Chant Battle" / "Letter & Word Bingo"), trưng bày vở tô chữ đẹp, tổng kết và chào tạm biệt.\n\n• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):\nStep 1: Production Game ("Chant Battle"): Divide class into 2 teams to perform the chant with actions and claps. The team chanting more rhythmically and clearly wins bonus stars.\nStep 2: Handwriting Showcase: Display 3 neatest tracing workbooks under the document camera or on the board.\nStep 3: Recap lesson achievements and conduct goodbye routine: "Goodbye, class!"`,
          studentActivity: `- Step 1: Compete eagerly in the Chant Battle with rhythmic clapping and clear pronunciation.\n- Step 2: Applaud classmates' neat tracing work.\n- Step 3: Pack books neatly and respond: "Goodbye, teacher!"`,
          expectedOutcome: 'Pupils leave the lesson proud of their chanting and handwriting achievements.',
          assessment: 'Teacher evaluates rhythm, confidence, and neatness.'
        }
      ];
    } else if (isG12Lesson3) {
      // =========================================================================
      // GLOBAL SUCCESS 1 & 2 - LESSON 3 (ACTIVITIES 6, 7, 8)
      // TIẾN TRÌNH CHUẨN THEO YÊU CẦU:
      // A: Warm-up / Review: Game / song / chant review
      // B: KNOWLEDGE CONSTRUCTION: Hoạt động 6 (Listen and repeat - mẫu câu, 3 bước đầy đủ)
      // C: Practice: Hoạt động 7 (Let's talk - mẫu câu và tranh gợi ý, 6 bước đầy đủ)
      // D: Practice: Hoạt động 8 (Let's sing - bài hát, 5 bước đầy đủ)
      // E: Production / Wrap-up: Game / Wrap-up
      // =========================================================================
      activitiesList = [
        {
          id: 'act1',
          name: 'A: Warm-up / Review: Game / Chant Activation (4 mins)',
          duration: '4 mins',
          aims: `Arouse interest, review target words (${wordsString}) and letter sound ${sound} through a lively chant.`,
          objective: `Arouse interest, review target words (${wordsString}) and letter sound ${sound} through a lively chant.`,
          content: 'Chant review from Lesson 2 with hand clapping and actions to lead into the new communicative structure.',
          methodsAndTechniques: 'Musical warm-up, Total Physical Response (TPR).',
          teacherActivity: `• NỘI DUNG:\n- Khởi động lớp học, ôn lại các từ vựng (${wordsString}) và âm ${sound} bằng bài chant sôi động, dẫn dắt vào cấu trúc câu giao tiếp mới.\n\n• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):\nStep 1: Greet pupils and play the unit chant on the interactive screen.\nStep 2: Encourage the whole class to chant along with clapping and energetic movements.\nStep 3: Introduce the communicative goal of today's lesson: learning how to say "${sentencePattern}".`,
          studentActivity: `- Step 1: Respond to greeting and listen to the chant audio.\n- Step 2: Chant aloud with rhythmic clapping and smiles.\n- Step 3: Focus on the new sentence pattern on the board.`,
          expectedOutcome: 'Pupils are motivated and ready for communicative speaking activities.',
          assessment: 'Teacher observes enthusiasm and rhythm.'
        },
        {
          id: 'act2',
          name: `B: KNOWLEDGE CONSTRUCTION: Hoạt động 6. Listen and repeat (Page ${pageL3} - 8 mins)`,
          duration: '8 mins',
          aims: `Understand and repeat the target communicative sentence structure "${sentencePattern}" in context through 3 clear steps.`,
          objective: `Understand and repeat the target communicative sentence structure "${sentencePattern}" in context through 3 clear steps.`,
          content: `Activity 6 (Student's Book page ${pageL3} / hoclieu.vn). Communicative sentence pattern: "${sentencePattern}".`,
          methodsAndTechniques: 'Visual contextualization, Gist listening, Choral & individual repetition, Realia modeling.',
          teacherActivity: `• NỘI DUNG:
- Hình thành kiến thức mẫu câu mới: "${sentencePattern}" qua ngữ cảnh trực quan trong tranh và băng ghi âm với 3 bước chuẩn sư phạm:

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at the picture, saying "Look at the picture, please! What’s in his hand? Yes, it’s a ${word2}. He has a ${word2}. He says “${sentencePattern}” Now listen and repeat, please!". Play the recording for pupils to listen. Explain the meaning of the sentence and how it is used. Check comprehension.
Step 2: Play the recording several times again for pupils to listen and repeat the sentence, saying "Now listen and repeat, please!". Give support to those pupils who find it difficult to do the task.
Step 3: Invite a few pupils to listen and repeat the sentence “${sentencePattern}” in front of the class. Correct their pronunciation, if necessary or praise them if they pronounced the sentence correctly, saying "Very well!".`,
          studentActivity: `- Step 1: Look at the picture in books, answer teacher's questions about the item (${word2}), listen to the recording, and understand the meaning of "${sentencePattern}".\n- Step 2: Listen to the recording several times and repeat "${sentencePattern}" in chorus, by rows, and individually with clear intonation.\n- Step 3: Volunteer pupils stand up and repeat the sentence “${sentencePattern}” in front of the class; receive praise from teacher and peers.`,
          expectedOutcome: `Pupils comprehend the communicative function and repeat the sentence pattern "${sentencePattern}" fluently with natural intonation.`,
          assessment: 'Teacher assesses sentence stress, intonation, and comprehension.'
        },
        {
          id: 'act3',
          name: `C: Practice: Hoạt động 7. Let's talk (Page ${pageL3} - 10 mins)`,
          duration: '10 mins',
          aims: `Practise communicative speaking in pairs using the speech bubble frame "${sentencePatternBubble}" and picture cues through 6 clear steps.`,
          objective: `Practise communicative speaking in pairs using the speech bubble frame "${sentencePatternBubble}" and picture cues through 6 clear steps.`,
          content: `Activity 7 (Student's Book page ${pageL3} / hoclieu.vn). Picture cues: a (${word1}), b (${word2}), c (${word3}), d (${word4}) with speech bubble frame "${sentencePatternBubble}".`,
          methodsAndTechniques: 'Speech bubble explanation, Teacher modeling, Choral & individual drilling, Pair work, Volunteer presentation.',
          teacherActivity: `• NỘI DUNG:
- Luyện tập giao tiếp theo mẫu câu "${sentencePatternBubble}" với các tranh gợi ý (${wordsString}) qua hình thức đồng thanh, cá nhân và làm việc nhóm đôi với 6 bước rõ ràng:

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at the bubble to understand how the language is used (${sentencePatternBubble}). Explain the meaning of the sentence, if necessary.
Step 2: Have pupils look at the first picture. Say "Look at Picture a, please!". Point to the ${word1} and ask them, saying "What is this?". Tell them that "It’s a ${word1}.". Then point to the bubble and the ${word1} and say "I have a ${word1}.".
Step 3: Ask pupils to say the sentence “I have a ${word1}.” in chorus and individually ("Now, point to Picture a and say “I have a ${word1}.”"). If they said the sentence correctly, praise them "Well done!". Correct pronunciation, if necessary.
Step 4: Follow the same procedure with Pictures b, c, d (using ${word2}, ${word3}, ${word4}). Give further support to those pupils who find it difficult to do the task, if necessary.
Step 5: Ask a few pupils to point to the pictures and say “${sentencePatternBubble}”, saying "Now practise saying what you have.". Offer help, if necessary.
Step 6: Invite some pairs of pupils to practise pointing to the pictures or flashcards and say what they have in front of the class. Praise them, saying "Excellent!" if they performed well.`,
          studentActivity: `- Step 1: Look at the speech bubble and understand the sentence structure "${sentencePatternBubble}".\n- Step 2: Look at Picture a, answer teacher's question ("It's a ${word1}."), and observe teacher's model: "I have a ${word1}.".\n- Step 3: Point to Picture a and say “I have a ${word1}.” in chorus and individually.\n- Step 4: Practice saying sentences for Picture b ("I have a ${word2}."), Picture c ("I have a ${word3}."), and Picture d ("I have a ${word4}.").\n- Step 5: Practice pointing and saying independently with desk partner.\n- Step 6: Pairs of pupils point to flashcards/pictures and say their sentences in front of the class; peers applaud.`,
          expectedOutcome: `Over 90% of pupils produce complete target sentences ("${sentencePatternBubble}") smoothly in pair dialogues.`,
          assessment: 'Teacher assesses oral communicative fluency, pronunciation accuracy, and peer interaction.'
        },
        {
          id: 'act4',
          name: `D: Practice: Hoạt động 8. Let's sing (Page ${pageL3} - 8 mins)`,
          duration: '8 mins',
          aims: `Sing the unit song with proper rhythm, melody, and TPR hand clapping through 5 clear steps to reinforce target language.`,
          objective: `Sing the unit song with proper rhythm, melody, and TPR hand clapping through 5 clear steps to reinforce target language.`,
          content: `Activity 8 (Student's Book page ${pageL3} / hoclieu.vn). Unit song incorporating target words (${wordsString}) and sentence structure.`,
          methodsAndTechniques: 'Lyrics familiarization, Line-by-line repetition, Choral singing, Group singing with TPR.',
          teacherActivity: `• NỘI DUNG:
- Hát bài hát của bài học kèm động tác vỗ tay theo giai điệu (TPR) để củng cố từ vựng và mẫu câu qua 5 bước sư phạm chuẩn:

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils read the lyrics (in their books or hoclieu.vn) to familiarize themselves with the first verse of the song. Say "Now look at the first verse, please!". Explain the meanings of the verse, if necessary (as mentioned in Input). Check comprehension.
Step 2: Play the recording several times for pupils to repeat line after line to make sure that they can sing the verse correctly. Say "Now listen and repeat, please!".
Step 3: Follow the same procedure with other lines. Correct pronunciation and the tune, the rhythm and the melody of the first verse of the song, if necessary.
Step 4: Play the recording all the way through for pupils to listen, to sing and clap their hands. Offer help, if necessary. If they sang well, praise them "Excellent!".
Step 5: Invite some pupils to sing the song in front of the class. The rest of the class sings along and claps their hands to reinforce the tune, the rhythm and the melody. Go around and offer help, if necessary.`,
          studentActivity: `- Step 1: Look at the song lyrics on page ${pageL3} or hoclieu.vn, read along with teacher, and understand the meaning.\n- Step 2: Listen to the audio and repeat line after line carefully to master the rhythm and melody.\n- Step 3: Repeat other lines with accurate pronunciation and joyful intonation.\n- Step 4: Sing the complete song together, clapping hands to the musical beat.\n- Step 5: Volunteer groups/pupils sing in front of the class; classmates sing along and clap enthusiastically.`,
          expectedOutcome: 'Pupils sing the unit song joyfully with correct tune, rhythm, and clear pronunciation.',
          assessment: 'Teacher evaluates singing enthusiasm, rhythm, and clear articulation.'
        },
        {
          id: 'act5',
          name: 'E: Production / Wrap-up: Game / Wrap-up (5 mins)',
          duration: '5 mins',
          aims: `Consolidate unit communicative language through an interactive game and "Show and Tell", summarize, and conclude the lesson.`,
          objective: `Consolidate unit communicative language through an interactive game and "Show and Tell", summarize, and conclude the lesson.`,
          content: 'Communicative Game: "Lucky Number" or "Show and Tell", lesson summary, and goodbye routine.',
          methodsAndTechniques: 'Communicative game, Realia Show and Tell, Formative praise, Goodbye routine.',
          teacherActivity: `• NỘI DUNG:
- Trò chơi củng cố và vận dụng giao tiếp ("Lucky Number" / "Show and Tell" với đồ dùng học tập thật), tổng kết bài học, khen ngợi và dặn dò.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Production Game / Show and Tell: Have 3-4 pupils hold up real classroom items or drawings and say: "${sentencePattern}" (e.g. "I have a pen.", "I have a car."). Teacher praises and awards star stickers.
Step 2: Summary: Recap the target communicative structures and words learned across the 3 lessons of the unit.
Step 3: Homework & Goodbye: Remind pupils to practice singing and saying sentences to family members. Conduct goodbye routine: "Goodbye, class! - Goodbye, teacher!"`,
          studentActivity: `- Step 1: Hold up real items and speak spontaneously in front of peers using "${sentencePatternBubble}".\n- Step 2: Recap key knowledge points proudly with teacher.\n- Step 3: Say "Goodbye, teacher!" with big smiles.`,
          expectedOutcome: 'Pupils apply target communicative language spontaneously in everyday situations with high joy.',
          assessment: 'Teacher evaluates spontaneous speaking confidence and awards stickers.'
        }
      ];
    } else if (isG345Lesson3) {
      // =========================================================================
      // GRADES 3, 4, 5 - LESSON 3 (2 PERIODS: PERIOD 1 = ACTS 1, 2, 3 | PERIOD 2 = ACTS 4, 5, 6)
      // =========================================================================
      const targetPhonicsWords = cleanVocabArray.slice(0, 2).map(w => w.replace(/\s*\([^)]*\)/g, '').trim());
      const phonicsWord1 = targetPhonicsWords[0] || (gradeNum === 3 ? 'pen' : 'dolphin');
      const phonicsWord2 = targetPhonicsWords[1] || (gradeNum === 3 ? 'book' : 'tennis');
      const isGrade3 = gradeNum === 3;
      const phonicsHeading = isGrade3 ? 'Phonics (Ngữ âm: âm và chữ cái)' : 'Word stress (Trọng âm từ)';
      const phonicsTarget1 = isGrade3 ? `${phonicsWord1[0]?.toLowerCase()} - ${phonicsWord1}` : `'${phonicsWord1}`;
      const phonicsTarget2 = isGrade3 ? `${phonicsWord2[0]?.toLowerCase()} - ${phonicsWord2}` : `'${phonicsWord2}`;
      const phonicsSentence1 = sentencePatternsArray[0] ? sentencePatternsArray[0].split('/')[0].trim() : `I like ${phonicsWord1}s.`;
      const phonicsSentence2 = sentencePatternsArray[1] ? sentencePatternsArray[1].split('/')[0].trim() : `He has a ${phonicsWord2}.`;

      if (isAct123) {
        // LESSON 3 - TIẾT 1 (HOẠT ĐỘNG 1, 2, 3): Phonics / Word stress & Chant
        // A: Warm-up: Review
        // B: KNOWLEDGE CONSTRUCTION: Hoạt động 1 (Phonics / Word stress)
        // C: Practice: Hoạt động 2 (Listen and circle / Listen and tick)
        // D: Practice: Hoạt động 3 (Listen and chant)
        // E: Production / wrap-up: Game / fun game / Chant battle
        activitiesList = [
          {
            id: 'act1',
            name: 'A: Warm-up: Review (4 mins)',
            duration: '4 mins',
            aims: 'Energize pupils, activate schema, and lead into pronunciation, phonics, and word stress discovery.',
            objective: 'Energize pupils, activate schema, and lead into pronunciation, phonics, and word stress discovery.',
            content: 'Warm-up Game / Rhythmic Chant to activate acoustic schema and review familiar vocabulary.',
            methodsAndTechniques: 'Game-based learning, Rhythmic warm-up, Total Physical Response (TPR).',
            teacherActivity: `• NỘI DUNG:
- Khởi động tiết học bằng bài chant hoặc trò chơi nhịp điệu sôi động, ôn tập từ vựng quen thuộc và dẫn dắt vào bài học về Ngữ âm và Trọng âm từ.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly: "Good morning/afternoon, class! How are you today?" và ổn định nền nếp lớp học.
Step 2: Tổ chức bài chant / trò chơi nhịp điệu: Bật nhạc hoặc gõ phách nhịp, cho cả lớp đứng dậy thực hiện các động tác vỗ tay theo nhịp.
Step 3: Giáo viên biểu dương tinh thần hào hứng của học sinh.
Step 4: Dẫn dắt vào bài mới: "Today, we are going to explore ${phonicsHeading} in Lesson 3!"`,
            studentActivity: `- Step 1: Respond enthusiastically to teacher's greeting and participate in the warm-up chant.\n- Step 2: Focus attention on the board to discover new pronunciation and stress patterns.`,
            expectedOutcome: '100% of pupils are engaged, cheerful, and ready for phonics discovery.',
            assessment: 'Teacher observes pupils\' engagement and rhythm.',
            digitalCompetency: {
              code: '1.1.CB1a',
              expression: 'Pupils interact with digital audio and visual pronunciation resources.',
              activity: 'Listen and react to digital audio cues.',
              product: 'Accurate acoustic recognition.',
              assessment: 'Teacher observation and praise.'
            }
          },
          {
            id: 'act2',
            name: 'B: KNOWLEDGE CONSTRUCTION: Hoạt động 1 (Phonics / Word stress) (10 mins)',
            duration: '10 mins',
            aims: `Explain and demonstrate ${phonicsHeading}, sound/stress placement, and accurate pronunciation of target words and sentences.`,
            objective: `Pupils understand ${phonicsHeading}, recognize target sound/stress, and pronounce target words and sentences accurately.`,
            content: `Activity 1 (Student's Book / hoclieu.vn). Target: ${phonicsTarget1} (${phonicsSentence1}); ${phonicsTarget2} (${phonicsSentence2}).`,
            methodsAndTechniques: 'Acoustic modeling, Stress mark visualization, Choral & individual repetition, Pair drilling.',
            teacherActivity: `• NỘI DUNG (KNOWLEDGE CONSTRUCTION):
1. MỤC TIÊU TRỌNG TÂM (${phonicsHeading.toUpperCase()}):
- Âm/Trọng âm 1: ${phonicsTarget1} trong từ "${phonicsWord1}" và câu mẫu: "${phonicsSentence1}"
- Âm/Trọng âm 2: ${phonicsTarget2} trong từ "${phonicsWord2}" và câu mẫu: "${phonicsSentence2}"

2. HƯỚNG DẪN BẢN CHẤT KIẾN THỨC:
${isGrade3 ? '- Hướng dẫn học sinh khẩu hình miệng chuẩn phát âm, sự tương ứng giữa chữ cái và âm thanh trong tiếng Anh.' : '- Hướng dẫn học sinh nhận diện trọng âm từ (word stress), vị trí dấu trọng âm (‘) đặt trước âm tiết được nhấn mạnh hơn, to hơn, rõ hơn.'}

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to ${phonicsTarget1} and the sentence "${phonicsSentence1}". Play the recording and encourage them to point to the word and sentence while listening. Explain to pupils the pronunciation/stress rule clearly.
Step 2: Play the recording again and encourage pupils to listen and repeat. Do this a few times until pupils feel confident. Correct their pronunciation where necessary and praise them when their pronunciation is good.
Step 3: Repeat Steps 1 and 2 for the second target (${phonicsTarget2} and "${phonicsSentence2}").
Step 4: Let pupils work in pairs or groups to say the target words and read sentences aloud. Invite a few pupils to say the language in front of the class. If they perform well, praise them.`,
            studentActivity: `- Step 1: Pupils look at the screen/book, point to ${phonicsTarget1} and sentence "${phonicsSentence1}" while listening.
- Step 2: Pupils listen to teacher's explanation about pronunciation rules and notice the stress mark (‘) / letter sound.
- Step 3: Pupils listen to the recording and repeat the words and sentences in chorus, in rows, and individually with clear stress:
  * Target 1: ${phonicsTarget1} - "${phonicsSentence1}".
  * Target 2: ${phonicsTarget2} - "${phonicsSentence2}".
- Step 4: Pupils work in pairs to practise pronouncing the words and reading sentences aloud; selected pairs perform in front of the class.`,
            expectedOutcome: `Pupils pronounce target words (${phonicsWord1}, ${phonicsWord2}) and sentences with accurate pronunciation and intonation.`,
            assessment: 'Teacher checks pronunciation accuracy, mouth shapes, and stress placement.'
          },
          {
            id: 'act3',
            name: 'C: Practice: Hoạt động 2 (Listen and circle / Listen and tick) (8 mins)',
            duration: '8 mins',
            aims: 'Identify words with target sound / stress on the first syllable through attentive listening.',
            objective: 'Pupils listen to the recording and circle/tick the word with the correct target sound / stress.',
            content: 'Activity 2 (Student\'s Book). Three sets of two-syllable words for auditory discrimination.',
            methodsAndTechniques: 'Auditory discrimination, Pre/While/Post listening checks, Peer verification.',
            teacherActivity: `• NỘI DUNG:
- Rèn luyện kỹ năng nghe phân biệt âm và nhận diện trọng âm rơi vào âm tiết thứ nhất qua 3 bộ từ có hai âm tiết theo tiến trình Pre-, While-, Post-listening.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-LISTENING:
Step 1: Draw pupils' attention to the sets of words (e.g. three sets of two-syllable words). Explain what pupils have to do. Check comprehension and model reading the words aloud.

• WHILE-LISTENING:
Step 2: Ask pupils to look at three words in the first line, read them aloud and circle the word that has the stress on the first syllable. Then play the recording for pupils to listen and check their answer.
Step 3: Repeat Step 2 for the second and third lines. Play the recording again for pupils to complete and confirm choices.

• POST-LISTENING:
Step 4: Tell pupils to swap books with a partner, then check the answers as a class. Write the correct answers on the board. Play the recording again for pupils to listen and check their answers again.

• EXTENSION:
Invite one or two pupils to stand up, listen to and repeat the words. For a more able class, have pupils find out more two-syllable words with the stress on the first syllable.`,
            studentActivity: `- Pre-listening: Look at the sets of words in Student's Book, understand task requirements, and read words aloud with teacher.\n- While-listening: Listen to audio track, identify stress mark/sounds, and circle the correct word with stress on the first syllable for lines 1, 2, and 3.\n- Post-listening: Swap books with a partner to check, verify with board answers, and listen again to confirm.\n- Extension: Individual pupils repeat words aloud; suggest more words with first-syllable stress.`,
            expectedOutcome: 'At least 85-90% of pupils correctly identify and circle the target stressed words.',
            assessment: 'Teacher checks workbooks and marks star stickers for correct answers.'
          },
          {
            id: 'act4',
            name: 'D: Practice: Hoạt động 3 (Listen and chant) (8 mins)',
            duration: '8 mins',
            aims: 'Chant with correct rhythm, pronunciation, and stress on target words while clapping hands through Pre-, While-, and Post-chanting phases.',
            objective: 'Pupils chant with natural rhythm, accurate stress, and lively body actions.',
            content: 'Activity 3 (Student\'s Book). Rhythmic chant with stressed words: pandas, dolphins, tennis, football.',
            methodsAndTechniques: 'Pre-, While-, Post-listening framework, Rhythmic chanting, Line-by-line repetition, Clapping along to beat.',
            teacherActivity: `• NỘI DUNG:
- Luyện đọc bài chant theo giai điệu chuẩn, phát âm chính xác các từ có trọng âm rơi vào âm tiết đầu (pandas, dolphins, tennis, football) kết hợp vỗ tay theo phách qua các bước Pre-, While-, Post-chanting.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-CHANTING (PRE-LISTENING):
Step 1: Draw pupils' attention to the lyrics of the chant. Check comprehension. Draw pupils' attention to two-syllable words with the stress on the first syllable in the chant, e.g. pandas, dolphins, tennis and football, and the sentences containing those words.

• WHILE-CHANTING (WHILE-LISTENING):
Step 2: Play the recording all the way through. Encourage pupils to listen carefully to the rhythm and pronunciation.
Step 3: Play the recording, line by line, for pupils to listen and repeat. Correct their pronunciation, if necessary.
Step 4: Play the recording all the way through for pupils to chant along. Encourage them to clap while chanting.

• POST-CHANTING (POST-LISTENING):
Step 5: Divide the class into 2 groups to take turns chanting and clapping. Invite volunteer groups to perform before class.

• EXTENSION:
Have pupils write their own chants by replacing the animal and sports in the chant and using their favourite ones. Ask pupils to practise the new chant.`,
            studentActivity: `- Pre-chanting: Read chant lyrics, check comprehension, and identify stressed words (pandas, dolphins, tennis, football).\n- While-chanting: Listen to audio track all the way through; repeat line by line with clear pronunciation; chant along while clapping to the beat.\n- Post-chanting: Group chanting contest between halves of the class; volunteer pairs perform before peers.\n- Extension: Replace animal and sports words with personal favorites and chant enthusiastically.`,
            expectedOutcome: 'Pupils chant smoothly, clap to the rhythm, and remember target stressed vocabulary.',
            assessment: 'Teacher observes chanting rhythm, pronunciation, and enthusiastic participation.'
          },
          {
            id: 'act5',
            name: 'E: Production/ wrap-up: Game/ fun game / Chant battle (5 mins)',
            duration: '5 mins',
            aims: 'Consolidate word stress mastery and chanting through an energetic group battle; assign homework.',
            objective: 'Pupils consolidate phonics and word stress knowledge and participate enthusiastically in team battle.',
            content: 'Chant battle between groups, summary of phonics rules, and homework.',
            methodsAndTechniques: 'Team competition, Formative praise, Closing routine.',
            teacherActivity: `• NỘI DUNG:
- Thi đấu Chant Battle giữa các nhóm, củng cố quy tắc đánh dấu trọng âm (‘) và dặn dò bài tập về nhà.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Chant Battle (3 mins): Tổ chức cuộc thi đọc chant thi đua giữa Nhóm A và Nhóm B kết hợp vỗ tay theo nhịp. Tặng sao khen thưởng (bonus stars) cho nhóm có ngữ điệu và trọng âm chuẩn nhất.
Step 2: Review & Summary (1 min): Giáo viên cùng cả lớp nhắc lại quy tắc trọng âm từ và vị trí đặt dấu trọng âm (‘) trên bảng.
Step 3: Homework & Goodbye (1 min): Dặn dò học sinh luyện đọc bài chant ở nhà và chuẩn bị cho tiết học sau. Chào tạm biệt: "Goodbye, class!"`,
            studentActivity: `- Step 1: Groups compete enthusiastically in the Chant Battle with rhythmic clapping.\n- Step 2: Repeat target stressed words one final time.\n- Step 3: Record homework and say: "Goodbye, teacher!"`,
            expectedOutcome: 'Pupils consolidate the lesson takeaways with high enthusiasm.',
            assessment: 'Teacher assesses team spirit and assigns formative points.'
          }
        ];
      } else if (isAct456) {
        // LESSON 3 - TIẾT 2 (HOẠT ĐỘNG 4, 5, 6): Reading, Writing & Project
        // A: Warm-up/ review
        // B: Practice: Hoạt động 4 (Read and circle / Read and match / Read and complete - Pre-, while-, post-reading)
        // C: Practice: Hoạt động 5 (Let's write / Complete text with own information - Pre-, while-, post-writing)
        // D: Practice: Hoạt động 6 (Project: Poster presentation / Show and tell)
        // E: Wrap-up/ Production: Game / fun game
        activitiesList = [
          {
            id: 'act1',
            name: 'A: Warm-up/ review (4 mins)',
            duration: '4 mins',
            aims: 'Recall Lesson 3 chant and words from Period 1 to activate reading and writing schema.',
            objective: 'Recall Lesson 3 chant and words from Period 1 to activate reading and writing schema.',
            content: 'Chant performance / Quick flashcard recall to energize the classroom and activate schema.',
            methodsAndTechniques: 'Choral chanting, Quick response drill.',
            teacherActivity: `• NỘI DUNG:
- Khởi động tiết học, ôn lại bài chant của Lesson 3 từ Tiết 1 và các từ có trọng âm để kích hoạt tâm thế học tập trước khi vào phần Đọc - Viết.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly: "Good morning/afternoon, class!" và bật lại đoạn băng bài chant của Tiết 1.
Step 2: Cho cả lớp cùng đọc chant và vỗ tay theo phách nhịp nhàng.
Step 3: Ôn lại nhanh các từ có trọng âm rơi vào âm tiết thứ nhất ('dolphin, 'tennis, 'panda, 'football).
Step 4: Tuyên dương học sinh và dẫn dắt khéo léo vào Hoạt động 4 (Rèn luyện kỹ năng Đọc hiểu).`,
            studentActivity: `- Step 1: Chant enthusiastically with hand-clapping.\n- Step 2: Open Student's Book to Activity 4.`,
            expectedOutcome: 'Pupils are energized and prepared for reading and writing tasks.',
            assessment: 'Teacher observes engagement.'
          },
          {
            id: 'act2',
            name: 'B: Practice: Hoạt động 4 (Read and circle / Read and match / Read and complete) (9 mins)',
            duration: '9 mins',
            aims: 'Develop reading comprehension skills through structured Pre-, While-, and Post-reading phases.',
            objective: 'Pupils scan short texts for details and circle/match/complete correct answers accurately.',
            content: 'Activity 4 (Student\'s Book). Reading text with comprehension questions.',
            methodsAndTechniques: 'Pre-, While-, Post-reading framework, Silent reading, Scanning, Peer verification.',
            teacherActivity: `• NỘI DUNG:
- Phát triển kỹ năng đọc hiểu qua 3 giai đoạn chuẩn: Pre-reading (đọc chung, tìm hiểu ngữ cảnh), While-reading (đọc thầm, quét thông tin chi tiết và chọn đáp án), Post-reading (đối chiếu, chữa bài).

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-READING:
Step 1: Draw pupils' attention to the two paragraphs / text and read them as a class. Check comprehension.
Step 2: Draw pupils' attention to the incomplete sentences and answer options. Explain what pupils have to do. Have them pay attention to the sentences about personal information of characters (e.g. Tom and Lan).

• WHILE-READING:
Step 3: Have pupils read the text again silently and circle the correct answers in their Student's Book. Teacher moves around to observe and offer support where necessary.

• POST-READING:
Step 4: Tell pupils to swap books with a partner, then check answers as a class. Write the correct answers on the board.
Step 5: Get pupils to look at the board and check their answers again. If time allows, ask a few pupils to read the paragraph aloud in front of the class.`,
            studentActivity: `- Pre-reading: Read paragraphs as a class and understand the context and questions.\n- While-reading: Read text silently, scan for key personal details, and circle the correct answers in books.\n- Post-reading: Swap books with partner to check, verify with board answers, and read the paragraph aloud.`,
            expectedOutcome: 'Pupils comprehend the text, extract key information, and select correct answers.',
            assessment: 'Teacher evaluates workbook answers and reading pronunciation.'
          },
          {
            id: 'act3',
            name: "C: Practice: Hoạt động 5 (Let's write / Complete the text with own information) (9 mins)",
            duration: '9 mins',
            aims: 'Develop guided writing skills through Pre-, While-, and Post-writing phases using pupils\' own personal information.',
            objective: 'Pupils write a short paragraph about themselves using accurate sentence structures and spelling.',
            content: "Activity 5 (Student's Book). Gapped paragraph completed with pupils' own details.",
            methodsAndTechniques: 'Pre-, While-, Post-writing framework, Board modeling, Individual writing, Peer editing.',
            teacherActivity: `• NỘI DUNG:
- Phát triển kỹ năng viết cá nhân qua 3 giai đoạn: Pre-writing (hướng dẫn mẫu câu đầu), While-writing (tự điền thông tin cá nhân), Post-writing (đọc to chia sẻ trước lớp).

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-WRITING:
Step 1: Tell pupils the goal of this activity: they are going to look at the gapped paragraph and complete it using their own information. Check comprehension.
Step 2: Write the sentence with the first gap on the board: "My name is ____." Read the sentence as a class. When you reach the gap, ask pupils to identify the information needed to complete the gap (their names) and encourage pupils to say the whole sentence (e.g. "My name is Nam."). Give pupils time to complete the sentence. Read the sentence as a class.

• WHILE-WRITING:
Step 3: Repeat Step 2 for the other sentences in the paragraph. Have pupils fill in their own personal information into each gap in their Student's Book neatly.

• POST-WRITING:
Step 4: If time allows, invite a few pupils to read the sentences they have completed in front of the class. Have the class observe, listen, and praise their work.`,
            studentActivity: `- Pre-writing: Identify writing goals and understand what personal info is needed for each gap.\n- While-writing: Write neatly into their books using their own true personal information (name, age, favourite things).\n- Post-writing: Volunteer pupils read their completed paragraphs aloud with pride; peers listen and praise.`,
            expectedOutcome: 'Pupils complete writing accurately with proper spelling, capitalization, and punctuation.',
            assessment: 'Teacher evaluates written workbooks and board presentations.'
          },
          {
            id: 'act4',
            name: 'D: Practice: Hoạt động 6 (Project: Poster presentation / Show and tell) (8 mins)',
            duration: '8 mins',
            aims: 'Present poster projects about favourite things in groups and display them in the classroom gallery across Pre-, While-, and Post-project phases.',
            objective: 'Pupils confidently present their poster in groups and communicate their favourite things in English.',
            content: 'Activity 6: Project (Student\'s Book). Poster presentation / Show and tell.',
            methodsAndTechniques: 'Pre-, While-, Post-speaking framework, Project-based learning, Group presentation, Gallery display, Peer feedback.',
            teacherActivity: `• NỘI DUNG:
- Báo cáo dự án áp phích (Project): Thuyết trình tự tin về những điều yêu thích (favourite things) theo nhóm và trưng bày sản phẩm tại phòng triển lãm lớp học qua các giai đoạn Pre-, While-, Post-project.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-PROJECT (PREPARATION):
Step 1: Tell pupils the goal of this activity. Explain that they are going to show posters that they have made at home (or prepared in class) and tell the class about their favourite things. Model a sample presentation: "Hello, everyone. My favourite sport is chess. My favourite food is chicken."

• WHILE-PROJECT (GROUP PRESENTATION):
Step 2: Have pupils work in groups of five. Each pupil shows his / her poster and tells the group about their favourite things. Go around the class and offer help with vocabulary and pronunciation.

• POST-PROJECT (CLASS PRESENTATION & GALLERY DISPLAY):
Step 3: Invite volunteer pupils to show their work and talk about their favourite things in front of the class. Have pupils stick their posters on the wall (or board) as a display gallery for peers to view.`,
            studentActivity: `- Pre-project: Hold up posters, listen to teacher's instructions, and observe teacher's sample presentation model.\n- While-project: Work in groups of 5: show posters, introduce favourite things to peers in English, and support each other.\n- Post-project: Present before the class; stick posters on the classroom wall display for a mini gallery walk.`,
            expectedOutcome: 'Pupils speak English with confidence and take pride in their creative posters.',
            assessment: 'Teacher evaluates presentation fluency, poster effort, and group collaboration.'
          },
          {
            id: 'act5',
            name: 'E: Wrap-up/ Production: Game / fun game (5 mins)',
            duration: '5 mins',
            aims: 'Evaluate posters, celebrate achievements with star stickers, summarize, and wrap up.',
            objective: 'Celebrate unit achievements and reinforce pupils\' confidence in speaking English.',
            content: 'Gallery walk evaluation, sticker awards, and lesson wrap-up.',
            methodsAndTechniques: 'Peer feedback, Formative assessment, Closing routine.',
            teacherActivity: `• NỘI DUNG:
- Tham quan phòng tranh mini (Gallery walk), đánh giá sản phẩm bằng nhãn dán sao, tổng kết toàn bộ đơn vị bài học và dặn dò.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Gallery Walk & Sticker Vote (3 mins): Cho học sinh di chuyển xung quanh lớp học tham quan áp phích của các bạn và dán nhãn sao bình chọn cho áp phích ấn tượng nhất.
Step 2: Summary & Celebration (1 min): Giáo viên tổng kết, khen ngợi sự sáng tạo, tinh thần làm việc nhóm và năng lực giao tiếp tiếng Anh tự tin của học sinh.
Step 3: Homework & Goodbye (1 min): Dặn dò học sinh ôn tập chuẩn bị cho bài học tiếp theo và chào tạm biệt: "Goodbye, class!"`,
            studentActivity: `- Step 1: Walk around the room, view peers' posters, and place star stickers.\n- Step 2: Listen to teacher's praise and celebrate unit completion.\n- Step 3: Say: "Goodbye, teacher!" with big smiles.`,
            expectedOutcome: 'Pupils celebrate their learning journey and develop high self-efficacy in English.',
            assessment: 'Final review points and sticker awards.'
          }
        ];
      } else {
        // LESSON 3 - FULL (2 PERIODS: 10 ACTIVITIES COVERING TIẾT 1 & TIẾT 2)
        activitiesList = [
          // TIẾT 1
          {
            id: 'act1',
            name: '[Tiết 1] A: Warm-up: Review (4 mins)',
            duration: '4 mins',
            aims: 'Energize pupils, activate schema, and lead into pronunciation, phonics, and word stress discovery.',
            objective: 'Energize pupils, activate schema, and lead into pronunciation, phonics, and word stress discovery.',
            content: 'Warm-up game / chant to review vocabulary and activate acoustic schema.',
            methodsAndTechniques: 'Game-based learning, Rhythmic warm-up, Total Physical Response (TPR).',
            teacherActivity: `• NỘI DUNG:
- Khởi động tiết học bằng bài chant hoặc trò chơi nhịp điệu sôi động, ôn tập từ vựng quen thuộc và dẫn dắt vào bài học về Ngữ âm và Trọng âm từ.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly: "Good morning/afternoon, class! How are you today?" và ổn định nền nếp lớp học.
Step 2: Tổ chức bài chant / trò chơi nhịp điệu: Bật nhạc hoặc gõ phách nhịp, cho cả lớp đứng dậy thực hiện các động tác vỗ tay theo nhịp.
Step 3: Giáo viên biểu dương tinh thần hào hứng của học sinh.
Step 4: Dẫn dắt vào bài mới: "Today, we are going to explore ${phonicsHeading} in Lesson 3!"`,
            studentActivity: `- Step 1: Respond enthusiastically to teacher's greeting and participate in the warm-up chant.\n- Step 2: Focus attention on the board to discover new pronunciation and stress patterns.`,
            expectedOutcome: '100% of pupils are engaged, cheerful, and ready for phonics discovery.',
            assessment: 'Teacher observes pupils\' engagement and rhythm.'
          },
          {
            id: 'act2',
            name: '[Tiết 1] B: KNOWLEDGE CONSTRUCTION: Hoạt động 1 (Phonics / Word stress) (10 mins)',
            duration: '10 mins',
            aims: `Explain and demonstrate ${phonicsHeading}, sound/stress placement, and accurate pronunciation of target words and sentences.`,
            objective: `Pupils understand ${phonicsHeading}, recognize target sound/stress, and pronounce target words and sentences accurately.`,
            content: `Activity 1 (Student's Book / hoclieu.vn). Target: ${phonicsTarget1} (${phonicsSentence1}); ${phonicsTarget2} (${phonicsSentence2}).`,
            methodsAndTechniques: 'Acoustic modeling, Stress mark visualization, Choral & individual repetition, Pair drilling.',
            teacherActivity: `• NỘI DUNG (KNOWLEDGE CONSTRUCTION):
1. MỤC TIÊU TRỌNG TÂM (${phonicsHeading.toUpperCase()}):
- Âm/Trọng âm 1: ${phonicsTarget1} trong từ "${phonicsWord1}" và câu mẫu: "${phonicsSentence1}"
- Âm/Trọng âm 2: ${phonicsTarget2} trong từ "${phonicsWord2}" và câu mẫu: "${phonicsSentence2}"

2. HƯỚNG DẪN BẢN CHẤT KIẾN THỨC:
${isGrade3 ? '- Hướng dẫn học sinh khẩu hình miệng chuẩn phát âm, sự tương ứng giữa chữ cái và âm thanh trong tiếng Anh.' : '- Hướng dẫn học sinh nhận diện trọng âm từ (word stress), vị trí dấu trọng âm (‘) đặt trước âm tiết được nhấn mạnh hơn, to hơn, rõ hơn.'}

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to ${phonicsTarget1} and the sentence "${phonicsSentence1}". Play the recording and encourage them to point to the word and sentence while listening. Explain to pupils the pronunciation/stress rule clearly.
Step 2: Play the recording again and encourage pupils to listen and repeat. Do this a few times until pupils feel confident. Correct their pronunciation where necessary and praise them when their pronunciation is good.
Step 3: Repeat Steps 1 and 2 for the second target (${phonicsTarget2} and "${phonicsSentence2}").
Step 4: Let pupils work in pairs or groups to say the target words and read sentences aloud. Invite a few pupils to say the language in front of the class. If they perform well, praise them.`,
            studentActivity: `- Step 1: Pupils look at the screen/book, point to ${phonicsTarget1} and sentence "${phonicsSentence1}" while listening.
- Step 2: Pupils listen to teacher's explanation about pronunciation rules and notice the stress mark (‘) / letter sound.
- Step 3: Pupils listen to the recording and repeat the words and sentences in chorus, in rows, and individually with clear stress:
  * Target 1: ${phonicsTarget1} - "${phonicsSentence1}".
  * Target 2: ${phonicsTarget2} - "${phonicsSentence2}".
- Step 4: Pupils work in pairs to practise pronouncing the words and reading sentences aloud; selected pairs perform in front of the class.`,
            expectedOutcome: `Pupils pronounce target words (${phonicsWord1}, ${phonicsWord2}) and sentences with accurate pronunciation and intonation.`,
            assessment: 'Teacher checks pronunciation accuracy, mouth shapes, and stress placement.'
          },
          {
            id: 'act3',
            name: '[Tiết 1] C: Practice: Hoạt động 2 (Listen and circle / Listen and tick) (8 mins)',
            duration: '8 mins',
            aims: 'Identify words with target sound / stress on the first syllable through attentive listening.',
            objective: 'Pupils listen to the recording and circle/tick the word with the correct target sound / stress.',
            content: 'Activity 2 (Student\'s Book). Sets of words for auditory discrimination.',
            methodsAndTechniques: 'Auditory discrimination, Pre/While/Post listening checks, Peer verification.',
            teacherActivity: `• NỘI DUNG:
- Rèn luyện kỹ năng nghe phân biệt âm và nhận diện trọng âm rơi vào âm tiết thứ nhất qua 3 bộ từ có hai âm tiết.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to the sets of words. Explain what pupils have to do. Check comprehension.
Step 2: Ask pupils to look at three words in the first line, read them aloud and circle the word that has the stress on the first syllable. Then play the recording for pupils to listen and check their answer.
Step 3: Repeat Step 2 for the second and third lines.
Step 4: Tell pupils to swap books with a partner, then check the answers as a class. Write the correct answers on the board. Play the recording again for pupils to listen and check their answers again.

• EXTENSION:
Invite one or two pupils to stand up, listen to and repeat the words. For a more able class, have pupils find out more two-syllable words with the stress on the first syllable.`,
            studentActivity: `- Step 1: Look at the sets of words in Student's Book and understand the task requirements.\n- Step 2: Read words aloud, listen to the audio track, and circle the correct word with stress on the first syllable.\n- Step 3: Complete the remaining lines following the same procedure.\n- Step 4: Swap books with a partner to check, verify with board answers, and listen again to confirm.\n- Extension: Individual pupils repeat words aloud; suggest more words with first-syllable stress.`,
            expectedOutcome: 'Pupils correctly identify and circle target stressed words.',
            assessment: 'Teacher checks workbooks and marks star stickers.'
          },
          {
            id: 'act4',
            name: '[Tiết 1] D: Practice: Hoạt động 3 (Listen and chant) (8 mins)',
            duration: '8 mins',
            aims: 'Chant with correct rhythm, pronunciation, and stress on target words while clapping hands.',
            objective: 'Pupils chant with natural rhythm, accurate stress, and lively body actions.',
            content: 'Activity 3 (Student\'s Book). Rhythmic chant with stressed words: pandas, dolphins, tennis, football.',
            methodsAndTechniques: 'Rhythmic chanting, Line-by-line repetition, Clapping along to beat.',
            teacherActivity: `• NỘI DUNG:
- Luyện đọc bài chant theo giai điệu chuẩn, phát âm chính xác các từ có trọng âm rơi vào âm tiết đầu (pandas, dolphins, tennis, football) kết hợp vỗ tay theo phách.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to the lyrics of the chant. Check comprehension.
Step 2: Play the recording all the way through. Encourage pupils to listen carefully to the rhythm and pronunciation. Draw pupils' attention to two-syllable words with the stress on the first syllable in the chant, e.g. pandas, dolphins, tennis and football, and the sentences containing those words.
Step 3: Play the recording, line by line, for pupils to listen and repeat. Correct their pronunciation, if necessary.
Step 4: Play the recording all the way through for pupils to chant along. Encourage them to clap while chanting.

• EXTENSION:
Have pupils write their own chants by replacing the animal and sports in the chant and using their favourite ones. Ask pupils to practise the new chant.`,
            studentActivity: `- Step 1: Read the chant lyrics and check comprehension.\n- Step 2: Listen to the whole chant, noticing rhythm and stressed words.\n- Step 3: Listen and repeat line by line with clear pronunciation.\n- Step 4: Chant all the way through, clapping hands along with the rhythm.`,
            expectedOutcome: 'Pupils chant smoothly, clap to the rhythm, and remember target stressed vocabulary.',
            assessment: 'Teacher observes chanting rhythm and pronunciation.'
          },
          {
            id: 'act5',
            name: '[Tiết 1] E: Production/ wrap-up: Chant battle & Review (5 mins)',
            duration: '5 mins',
            aims: 'Consolidate word stress mastery and chanting through an energetic group battle.',
            objective: 'Pupils consolidate phonics and word stress knowledge and participate enthusiastically in team battle.',
            content: 'Chant battle between groups and summary.',
            methodsAndTechniques: 'Team competition, Formative praise.',
            teacherActivity: `• NỘI DUNG:
- Thi đấu Chant Battle giữa các nhóm, củng cố quy tắc đánh dấu trọng âm (‘) và dặn dò bài tập về nhà.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Chant Battle (3 mins): Tổ chức cuộc thi đọc chant thi đua giữa Nhóm A và Nhóm B kết hợp vỗ tay theo nhịp. Tặng sao khen thưởng (bonus stars) cho nhóm có ngữ điệu và trọng âm chuẩn nhất.
Step 2: Review (2 mins): Giáo viên cùng cả lớp nhắc lại quy tắc trọng âm từ và vị trí đặt dấu trọng âm (‘) trên bảng.`,
            studentActivity: `- Step 1: Groups compete enthusiastically in the Chant Battle with rhythmic clapping.\n- Step 2: Repeat target stressed words one final time.`,
            expectedOutcome: 'Pupils consolidate period 1 takeaways with high enthusiasm.',
            assessment: 'Teacher assesses team spirit and assigns formative points.'
          },
          // TIẾT 2
          {
            id: 'act6',
            name: '[Tiết 2] A: Warm-up/ review (4 mins)',
            duration: '4 mins',
            aims: 'Recall Lesson 3 chant and words from Period 1 to activate reading and writing schema.',
            objective: 'Recall Lesson 3 chant and words from Period 1 to activate reading and writing schema.',
            content: 'Chant performance / Quick flashcard recall to energize the classroom.',
            methodsAndTechniques: 'Choral chanting, Quick response drill.',
            teacherActivity: `• NỘI DUNG:
- Khởi động tiết học, tái hiện bài chant của Lesson 3 từ Tiết 1 và các từ có trọng âm để kích hoạt tâm thế học tập trước khi vào phần Đọc - Viết.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly: "Good morning/afternoon, class!" và bật lại đoạn băng bài chant của Tiết 1.
Step 2: Cho cả lớp cùng đọc chant và vỗ tay theo phách nhịp nhàng.
Step 3: Ôn lại nhanh các từ có trọng âm rơi vào âm tiết thứ nhất ('dolphin, 'tennis, 'panda, 'football).
Step 4: Tuyên dương học sinh và dẫn dắt khéo léo vào Hoạt động 4 (Rèn luyện kỹ năng Đọc hiểu).`,
            studentActivity: `- Step 1: Chant enthusiastically with hand-clapping.\n- Step 2: Open Student's Book to Activity 4.`,
            expectedOutcome: 'Pupils are energized and prepared for reading and writing tasks.',
            assessment: 'Teacher observes engagement.'
          },
          {
            id: 'act7',
            name: '[Tiết 2] B: Practice: Hoạt động 4 (Read and circle / Read and match) (9 mins)',
            duration: '9 mins',
            aims: 'Develop reading comprehension skills through structured Pre-, While-, and Post-reading phases.',
            objective: 'Pupils scan short texts for details and circle/match/complete correct answers accurately.',
            content: 'Activity 4 (Student\'s Book). Reading text with comprehension questions.',
            methodsAndTechniques: 'Pre-, While-, Post-reading framework, Silent reading, Scanning, Peer verification.',
            teacherActivity: `• NỘI DUNG:
- Phát triển kỹ năng đọc hiểu qua 3 giai đoạn chuẩn: Pre-reading (đọc chung, tìm hiểu ngữ cảnh), While-reading (đọc thầm, quét thông tin chi tiết và chọn đáp án), Post-reading (đối chiếu, chữa bài).

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-READING:
Step 1: Draw pupils' attention to the two paragraphs / text and read them as a class. Check comprehension.
Step 2: Draw pupils' attention to the incomplete sentences and answer options. Explain what pupils have to do. Have them pay attention to the sentences about personal information of characters (e.g. Tom and Lan).

• WHILE-READING:
Step 3: Have pupils read the text again silently and circle the correct answers in their Student's Book. Teacher moves around to observe and offer support where necessary.

• POST-READING:
Step 4: Tell pupils to swap books with a partner, then check answers as a class. Write the correct answers on the board.
Step 5: Get pupils to look at the board and check their answers again. If time allows, ask a few pupils to read the paragraph aloud in front of the class.`,
            studentActivity: `- Pre-reading: Read paragraphs as a class and understand the context and questions.\n- While-reading: Read text silently, scan for key personal details, and circle the correct answers in books.\n- Post-reading: Swap books with partner to check, verify with board answers, and read the paragraph aloud.`,
            expectedOutcome: 'Pupils comprehend the text, extract key information, and select correct answers.',
            assessment: 'Teacher evaluates workbook answers and reading pronunciation.'
          },
          {
            id: 'act8',
            name: "[Tiết 2] C: Practice: Hoạt động 5 (Let's write / Complete the text with own info) (9 mins)",
            duration: '9 mins',
            aims: 'Develop guided writing skills through Pre-, While-, and Post-writing phases using pupils\' own personal information.',
            objective: 'Pupils write a short paragraph about themselves using accurate sentence structures and spelling.',
            content: "Activity 5 (Student's Book). Gapped paragraph completed with pupils' own details.",
            methodsAndTechniques: 'Pre-, While-, Post-writing framework, Board modeling, Individual writing, Peer editing.',
            teacherActivity: `• NỘI DUNG:
- Phát triển kỹ năng viết cá nhân qua 3 giai đoạn: Pre-writing (hướng dẫn mẫu câu đầu), While-writing (tự điền thông tin cá nhân), Post-writing (đọc to chia sẻ trước lớp).

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-WRITING:
Step 1: Tell pupils the goal of this activity: they are going to look at the gapped paragraph and complete it using their own information. Check comprehension.
Step 2: Write the sentence with the first gap on the board: "My name is ____." Read the sentence as a class. When you reach the gap, ask pupils to identify the information needed to complete the gap (their names) and encourage pupils to say the whole sentence (e.g. "My name is Nam."). Give pupils time to complete the sentence. Read the sentence as a class.

• WHILE-WRITING:
Step 3: Repeat Step 2 for the other sentences in the paragraph. Have pupils fill in their own personal information into each gap in their Student's Book neatly.

• POST-WRITING:
Step 4: If time allows, invite a few pupils to read the sentences they have completed in front of the class. Have the class observe, listen, and praise their work.`,
            studentActivity: `- Pre-writing: Identify writing goals and understand what personal info is needed for each gap.\n- While-writing: Write neatly into their books using their own true personal information (name, age, favourite things).\n- Post-writing: Volunteer pupils read their completed paragraphs aloud with pride; peers listen and praise.`,
            expectedOutcome: 'Pupils complete writing accurately with proper spelling, capitalization, and punctuation.',
            assessment: 'Teacher evaluates written workbooks and board presentations.'
          },
          {
            id: 'act9',
            name: '[Tiết 2] D: Practice: Hoạt động 6 (Project: Poster presentation / Show and tell) (8 mins)',
            duration: '8 mins',
            aims: 'Present poster projects about favourite things in groups and display them in the classroom gallery.',
            objective: 'Pupils confidently present their poster in groups and communicate their favourite things in English.',
            content: 'Activity 6: Project (Student\'s Book). Poster presentation / Show and tell.',
            methodsAndTechniques: 'Project-based learning, Group presentation, Gallery display, Peer feedback.',
            teacherActivity: `• NỘI DUNG:
- Báo cáo dự án áp phích (Project): Thuyết trình tự tin về những điều yêu thích (favourite things) theo nhóm và trưng bày sản phẩm tại phòng triển lãm lớp học.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Tell pupils the goal of this activity. Explain that they are going to show posters that they have made at home (or prepared in class) and tell the class about their favourite things.
Step 2: Have pupils work in groups of five. Each pupil shows his / her poster that he / she has made at home and tells the group about their favourite things, e.g. "My favourite sport is chess. My favourite food is chicken." Go around the class and offer help if necessary (e.g. when pupils need some more vocabulary to talk about favourite things).
Step 3: Invite some pupils to show their work and talk about their favourite things in front of the class. Have pupils stick their posters on the wall (or board) as a display gallery.`,
            studentActivity: `- Step 1: Hold up their posters and listen to teacher's instructions.\n- Step 2: Work in groups of 5: show posters and introduce their favourite things to peers in English.\n- Step 3: Present in front of the class; stick posters on the classroom wall display for a mini gallery walk.`,
            expectedOutcome: 'Pupils speak English with confidence and take pride in their creative posters.',
            assessment: 'Teacher evaluates presentation fluency, poster effort, and group collaboration.'
          },
          {
            id: 'act10',
            name: '[Tiết 2] E: Wrap-up/ Production: Game / fun game (5 mins)',
            duration: '5 mins',
            aims: 'Evaluate posters, celebrate achievements with star stickers, summarize, and wrap up.',
            objective: 'Celebrate unit achievements and reinforce pupils\' confidence in speaking English.',
            content: 'Gallery walk evaluation, sticker awards, and lesson wrap-up.',
            methodsAndTechniques: 'Peer feedback, Formative assessment, Closing routine.',
            teacherActivity: `• NỘI DUNG:
- Tham quan phòng tranh mini (Gallery walk), đánh giá sản phẩm bằng nhãn dán sao, tổng kết toàn bộ đơn vị bài học và dặn dò.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Gallery Walk & Sticker Vote (3 mins): Cho học sinh di chuyển xung quanh lớp học tham quan áp phích của các bạn và dán nhãn sao bình chọn cho áp phích ấn tượng nhất.
Step 2: Summary & Celebration (1 min): Giáo viên tổng kết, khen ngợi sự sáng tạo, tinh thần làm việc nhóm và năng lực giao tiếp tiếng Anh tự tin của học sinh.
Step 3: Homework & Goodbye (1 min): Dặn dò học sinh ôn tập chuẩn bị cho bài học tiếp theo và chào tạm biệt: "Goodbye, class!"`,
            studentActivity: `- Step 1: Walk around the room, view peers' posters, and place star stickers.\n- Step 2: Listen to teacher's praise and celebrate unit completion.\n- Step 3: Say: "Goodbye, teacher!" with big smiles.`,
            expectedOutcome: 'Pupils celebrate their learning journey and develop high self-efficacy in English.',
            assessment: 'Final review points and sticker awards.'
          }
        ];
      }
    } else if (isG345Lesson12) {
      // =========================================================================
      // GRADES 3, 4, 5 - LESSON 1 & LESSON 2 (2 PERIODS: PERIOD 1 = ACTS 1, 2, 3 | PERIOD 2 = ACTS 4, 5, 6)
      // =========================================================================
      const vocabTeachingDetails = cleanVocabArray.length > 0
        ? cleanVocabArray.map((w, idx) => {
            const cleanW = w.replace(/\s*\([^)]*\)/g, '').trim();
            const meaning = w.includes('(') ? w.slice(w.indexOf('(')) : '';
            const tech = ['picture flashcard & TPR action', 'real things (realia) & gesture', 'mime action & picture cue', 'visual cue & TPR movement'][idx % 4];
            return `  - Từ vựng ${idx + 1}: ${cleanW} ${meaning} (Dạy bằng ${tech})`;
          }).join('\n')
        : '  - Từ vựng 1: Hello (Dạy bằng action / picture / TPR)\n  - Từ vựng 2: Hi (Dạy bằng picture / TPR / Real things)';

      const checkupGameDetails = `- Sau khi dạy xong từ vựng: Tổ chức trò chơi Check-up vocabulary: "Slap the board" / "Matching" / "What's missing?" để kiểm tra khả năng ghi nhớ và nhận diện từ của học sinh.`;

      const modelSentenceDetails = sentencePatternsArray && sentencePatternsArray.length > 0
        ? sentencePatternsArray.map((s, idx) => `  - Mẫu câu ${idx + 1}: ${s}`).join('\n')
        : "  - Mẫu câu 1: Hello/Hi. I'm [Name].";

      if (isAct123) {
        // LESSON 1 & 2 - TIẾT 1 (HOẠT ĐỘNG 1, 2, 3): Look, listen, repeat; Listen, point, say; Let's talk
        // A: Warm-up / review: game / sing / chant
        // B: Exploration: Hoạt động 1 Look, listen and repeat
        // C: KNOWLEDGE CONSTRUCTION: Hoạt động 2 Listen, point and say (Vocabulary, Check-up, Model sentence)
        // D: PRACTICE: Hoạt động 3: Let's talk
        // E: Production / wrap-up: Game / vẽ mindmap / review lại kiến thức đã học
        activitiesList = [
          {
            id: 'act1',
            name: 'A: Warm up/ review: game/ sing/ chant (4 mins)',
            duration: '4 mins',
            aims: `Create a friendly, energetic atmosphere, activate schema, and lead into ${effectiveUnit} - ${effectiveLesson} using TPR and games.`,
            objective: `Create a friendly, energetic atmosphere, activate schema, and lead into ${effectiveUnit} - ${effectiveLesson} using TPR and games.`,
            content: 'Warm-up Game: 1. Pick the numbers / Flashcard Blitz / Sing & Chant to review vocabulary and structures.',
            methodsAndTechniques: 'Game-based learning, Total Physical Response (TPR), Quick response drill.',
            teacherActivity: `• NỘI DUNG:
- Khởi động lớp học, tạo không khí hào hứng, kích hoạt kiến thức nền và dẫn dắt vào bài học thông qua trò chơi Pick the numbers / Flashcard Blitz / Sing & Chant.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly. Teacher says the numbers / vocabulary items for the pupils to choose.
Step 2: Give points to the pupils with the correct choice, celebrate with classmates, and lead into Activity 1.`,
            studentActivity: `- Step 1: Pupils listen attentively to teacher's call and choose the corresponding numbers / cards.\n- Step 2: Pupils receive reward stars and celebrate with classmates.`,
            expectedOutcome: '100% of students are fully engaged, energized, and ready for language discovery.',
            assessment: 'Teacher observes engagement, rhythm, and cheerful English interaction.',
            digitalCompetency: {
              code: '1.1.CB1a',
              expression: 'Pupils listen to digital audio to sing along and follow rhythm.',
              activity: 'Sing and move with digital audio track.',
              product: 'Active singing with gestures.',
              assessment: 'Teacher observes active engagement.'
            }
          },
          {
            id: 'act2',
            name: 'B: exploration: Hoạt động 1 Look, listen and repeat (7 mins)',
            duration: '7 mins',
            aims: 'Explore the communicative context, observe characters and situations, and discover language naturally.',
            objective: 'Explore the communicative context, observe characters and situations, and discover language naturally.',
            content: `${act1Name} (Student's Book). Contextual dialogue introducing: ${sentenceList}.`,
            methodsAndTechniques: 'Visual contextualization, Gist listening, Choral and individual repetition.',
            teacherActivity: `• NỘI DUNG:
- Khám phá ngữ cảnh giao tiếp (Pictures a và b), nhận diện nhân vật, lắng nghe hội thoại mẫu giới thiệu cấu trúc giao tiếp: ${sentenceList} và nhắc lại theo từng câu.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at Pictures a and b and identify the characters in the pictures.
Step 2: Ask pupils to look at Picture a. Play the recording for them to listen.
Step 3: Play the recording again for pupils to listen and repeat in chorus, sentence by sentence. Follow the same procedure with Picture b. Correct their pronunciation where necessary.
Step 4: Invite a few pairs to the front of the class to listen and repeat the sentences in the recording.
Step 5: Draw their attention to the sentences Hello. I'm Ben and Hi, Ben. I'm Mai (or target unit sentences: ${sentenceList}). Tell pupils that these sentences are used to greet, self-introduce and respond to greetings; and that Hi is more friendly than Hello in conversation (communicative function).`,
            studentActivity: `- Pupils look at Pictures a and b and identify the characters in the pictures.\n- Pupils look at Picture a and listen to the recording.\n- Pupils listen again and repeat in chorus, sentence by sentence.\n- Context a:\n  Ben: Hello. I'm Ben.\n  Mai: Hi, Ben. I'm Mai.\n- Context b:\n  Minh: Hi. I'm Minh.\n  Lucy: Hello, Minh. I'm Lucy.\n- Pairs of pupils come to the front of the class to listen and repeat the sentences in the recording.\n- Pupils draw attention to the key communicative sentences and understand their usage.`,
            expectedOutcome: 'Pupils understand the communicative context clearly and pronounce sentences accurately.',
            assessment: 'Teacher evaluates visual engagement and context comprehension.'
          },
          {
            id: 'act3',
            name: 'C: KNOWLEDGE CONSTRUCTION: Hoạt động 2 Listen, point and say (10 mins)',
            duration: '10 mins',
            aims: `Construct target vocabulary (${cleanVocabArray.slice(0, 4).map(w => w.replace(/\s*\([^)]*\)/g, '').trim()).join(', ')}) and model sentence patterns (${sentenceList}) through multisensory presentation, check-up games, and communicative pair work.`,
            objective: `Pupils recognize, memorize, and pronounce target vocabulary (${vocabList}) and model sentence patterns (${sentenceList}) accurately and confidently.`,
            content: `Core Knowledge: Target Vocabulary (${vocabList}); Check-up Game; Model Sentence Patterns: ${sentenceList}.`,
            methodsAndTechniques: 'Flashcard & Realia presentation, TPR modeling, Vocabulary Check-up, Substitution drill, Pair work.',
            teacherActivity: `• NỘI DUNG (KNOWLEDGE CONSTRUCTION - HÌNH THÀNH KIẾN THỨC MỚI):
1. TỪ VỰNG TRỌNG TÂM (CORE TARGET VOCABULARY):
${vocabTeachingDetails}
* Danh sách toàn bộ từ vựng mục tiêu: ${vocabList}

2. TRÒ CHƠI KIỂM TRA TỪ VỰNG (CHECK-UP VOCABULARY):
${checkupGameDetails}

3. MẪU CÂU CHÍNH (CORE MODEL SENTENCE PATTERNS):
${modelSentenceDetails}

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to picture cues a, b, c, d. Elicit the name/label of each target character or item (${cleanVocabArray.slice(0, 4).map((w, idx) => `${String.fromCharCode(97 + idx)}. ${w.replace(/\s*\([^)]*\)/g, '').trim()}`).join('; ')}).
Step 2: Point at Picture a and the word under it. Check comprehension and give feedback. Play the recording for pupils to repeat the words a few times. Follow the same procedure with pictures b, c, and d. Write the words on the board until pupils feel confident. Tell pupils to point at the relevant item in the picture when repeating.
Step 3: Draw pupils' attention to the speech bubbles. Explain the communicative function and meaning. Elicit the missing words for substitution. Play the recording for pupils to repeat the model sentence pattern (${sentencePatternsArray[0] || sentenceList}). Divide the class into halves to take turns to repeat each role in picture a until confident. Remind pupils to point at the relevant item/character in the picture when repeating.
Step 4: Repeat the same procedure with pictures b, c, and d using target vocabulary (${cleanVocabArray.slice(0, 4).map(w => w.replace(/\s*\([^)]*\)/g, '').trim()).join(', ')}).
Step 5: Give pupils time to work in pairs and take turns to act out the dialogue using pictures a, b, c, d. Go around the room to offer guidance and praise.
Step 6: Invite a few pairs to come to the front of the classroom, point at the relevant picture, and act out their roles with confident pronunciation and gestures.

• GAME (LUYỆN TẬP CẶP ĐÔI - PAIR WORK PRACTICE):
- Work in pairs with a partner using target sentence patterns (${sentenceList}) to communicate, ask, and answer. Invite volunteer pairs to perform. Praise and award stars.`,
            studentActivity: `- Step 1: Look at Pictures a, b, c, d and identify target items/characters:
${cleanVocabArray.slice(0, 4).map((w, idx) => `  * Picture ${String.fromCharCode(97 + idx)}: ${w.replace(/\s*\([^)]*\)/g, '').trim()}`).join('\n')}
- Step 2: Repeat target vocabulary (${vocabList}) chorally, in groups, and individually following audio cues and teacher's modeling; point to corresponding picture cues in Student's Book.
- Step 3: Check-up vocabulary: Pupils participate enthusiastically in "Slap the board" / "Matching" / "What's missing?".
- Step 4: Model sentence patterns & Speech bubbles:
${sentencePatternsArray.map(s => `  * ${s}`).join('\n')}
- Step 5: Pupils work in pairs, take turns pointing to pictures and acting out dialogues using target sentence patterns: "${sentenceList}".
- Step 6: Volunteer pairs come to the front of the classroom, point, speak, and act out their roles with expressive intonation; peers applaud.`,
            expectedOutcome: `100% of pupils pronounce target words correctly (${vocabList}), understand meanings, and apply model sentences smoothly (${sentenceList}).`,
            assessment: `Teacher assesses vocabulary recall (${vocabList}), pronunciation accuracy, and pair dialogue performance (${sentenceList}).`
          },
          {
            id: 'act4',
            name: "D: PRACTICE: Hoạt động 3: Let's talk (8 mins)",
            duration: '8 mins',
            aims: 'Practise communicative speaking in groups using visual contextual cues across Pre-, While-, and Post-speaking phases.',
            objective: 'Pupils use target sentence patterns to communicate freely with classmates.',
            content: `Task 3: Let's talk (Student's Book). Contextual speaking with picture cues.`,
            methodsAndTechniques: 'Pre-, While-, Post-speaking framework, Context identification, Sentence elicitation, Group work.',
            teacherActivity: `• NỘI DUNG:
- Luyện nói giao tiếp tự do theo nhóm 4 học sinh (groups of four) dựa trên tranh ngữ cảnh gợi ý và bóng thoại trong sách giáo khoa qua 3 bước Pre-, While-, Post-speaking.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-SPEAKING:
Step 1: Draw pupils' attention to the picture. Ask questions to help them identify the context and characters.
Step 2: Elicit the missing words in the speech bubbles and write them on the board. Get pupils to say the completed sentences in chorus.

• WHILE-SPEAKING:
Step 3: Put pupils into groups of four to practise the communicative exchanges. Go around the classroom to offer guidance and monitor natural intonation. Remind pupils to swap roles.

• POST-SPEAKING:
Step 4: Invite some volunteer groups to perform their exchanges in front of the class. Peers listen and give constructive feedback with thumbs up; teacher awards reward stars.`,
            studentActivity: `- Pre-speaking: Look at the picture and answer questions to identify the communicative context; elicit and read completed sentences.\n- While-speaking: Work in groups of four to practise the exchanges naturally, swap roles, and support each other.\n- Post-speaking: Volunteer groups perform before the class; peers evaluate and clap.`,
            expectedOutcome: 'Pupils speak in groups with confidence, natural intonation, and good peer support.',
            assessment: 'Teacher observes group interactions and offers on-the-spot encouragement.'
          },
          {
            id: 'act5',
            name: 'E: Production/ wrap-up: Game/ vẽ mindmap/ review lại kiến thức đã học (6 mins)',
            duration: '6 mins',
            aims: 'Apply language to real-life situations, consolidate vocabulary and sentence patterns, and conclude the lesson.',
            objective: 'Pupils consolidate vocabulary and sentence patterns, summarize learning, and complete self-evaluation.',
            content: 'Communicative game / Mindmap drawing, summary of key points, and homework assignment.',
            methodsAndTechniques: 'Game-based learning, Mind mapping, Formative self-reflection.',
            teacherActivity: `• NỘI DUNG:
- Vận dụng kiến thức vào thực tế qua trò chơi giao tiếp hoặc vẽ sơ đồ tư duy (mindmap) trên bảng con, củng cố toàn bộ từ vựng và mẫu câu của Tiết 1, dặn dò bài về nhà.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Production Game / Mindmap (4 mins): Organize a communicative game (e.g. "Pass the secret" / "Interview relay") or guide pupils to draw a quick mindmap of target words on mini-boards. Award star stickers.
Step 2: Review & Consolidation (2 mins): Teacher recaps target vocabulary and model sentences on the board with class chorus.
Step 3: Homework & Goodbye: Teacher assigns workbook exercises and leads goodbye routine: "Goodbye, class!"`,
            studentActivity: `- Step 1: Pupils engage enthusiastically in the communicative game / mindmap drawing, speaking English spontaneously.\n- Step 2: Whole class reviews vocabulary and model sentence patterns together.\n- Step 3: Pupils record homework in notebooks and respond warmly: "Goodbye, teacher!"`,
            expectedOutcome: 'Pupils retain target vocabulary and structures with high enthusiasm.',
            assessment: 'Teacher observes participation and awards commendation stars.'
          }
        ];
      } else if (isAct456) {
        // LESSON 1 & 2 - TIẾT 2 (HOẠT ĐỘNG 4, 5, 6): Listen and tick/circle; Look, complete and read; Let's sing/play
        // A: Warm-up/ review
        // B: Practice: Hoạt động 4: Listen and tick/ Listen and circle (Pre-, while-, post-)
        // C: Practice: Hoạt động 5: Look, complete and read (Pre-, while-, post- & Role play)
        // D: Practice: Hoạt động 6: Let's sing / Let's play
        // E: Production/ wrap-up: Game/ sing/ mindmap/...
        activitiesList = [
          {
            id: 'act1',
            name: 'A: Warm-up/ review (4 mins)',
            duration: '4 mins',
            aims: `Create classroom atmosphere, activate schema, and review target vocabulary (${vocabList}) and sentence patterns (${sentenceList}) from Period 1.`,
            objective: `Create classroom atmosphere, activate schema, and review target vocabulary (${vocabList}) and sentence patterns (${sentenceList}) from Period 1.`,
            content: 'Review game: 1. Pick the numbers / Flashcard Blitz to review words and structures.',
            methodsAndTechniques: 'Game-based learning, Total Physical Response (TPR), Quick response drill.',
            teacherActivity: `• NỘI DUNG:
- Khởi động lớp học, tạo không khí vui tươi, kích hoạt kiến thức nền và ôn tập từ vựng (${vocabList}) cùng mẫu câu (${sentenceList}) của Tiết 1 qua trò chơi Pick the numbers / Flashcard Blitz.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly. Teacher says the numbers / target words (${vocabList}) for the pupils to choose.
Step 2: Give points to the pupils with the correct choice, celebrate with classmates, and lead into listening practice.`,
            studentActivity: `- Step 1: Pupils listen attentively to teacher's call and choose the corresponding numbers / cards.\n- Step 2: Pupils receive reward stars and celebrate with classmates.`,
            expectedOutcome: 'Pupils actively recall 100% of target vocabulary and are motivated for listening and writing practice.',
            assessment: 'Teacher observes pupils\' recall speed and pronunciation accuracy.'
          },
          {
            id: 'act2',
            name: 'B: Practice: Hoạt động 4: Listen and tick/ Listen and circle/ Listen and number/... (8 mins)',
            duration: '8 mins',
            aims: 'Develop listening comprehension skills through structured Pre-, While-, and Post-listening phases.',
            objective: 'Pupils listen to the recording, identify key audio clues, and tick/circle the correct pictures.',
            content: `${act4Name} (Student's Book). Target vocabulary: ${vocabList}.`,
            methodsAndTechniques: 'Pre-, While-, Post-listening framework, Gist & detail listening, Peer verification.',
            teacherActivity: `• NỘI DUNG:
- Rèn luyện kỹ năng nghe hiểu chi tiết qua 3 giai đoạn sư phạm chuẩn (Pre-listening, While-listening, Post-listening) và đánh dấu tick/khoanh tròn vào tranh đúng.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-LISTENING:
Step 1: Draw pupils' attention to Pictures 1a and 1b. Tell them about the activity. Use Pictures 1a and 1b as an example. Elicit the names of the characters / objects in each picture. Point at the pictures respectively to explain the context.

• WHILE-LISTENING:
- Play the recording for Question 1 for pupils to listen. Play the recording again. Elicit pupils to give the answer. Circle / tick the letter b in Picture 1b (or correct picture). Play the recording a third time for pupils to double-check their answers.
Step 2: Play the recording for Question 2 for pupils to do the task.

• POST-LISTENING:
Step 3: Get pupils to swap books with a partner. Play the recording again to check answers together as a class. Write the answers on the board for pupils to correct their answers.
Step 4: Play the recording all the way through for pupils to double-check all the answers.

• EXTENSION:
If time allows, play the recording, sentence by sentence, for the class to listen and repeat in chorus. Correct their pronunciation where necessary.`,
            studentActivity: `- Pre-listening: Look at Pictures 1a and 1b, identify the characters and objects, and predict audio cues with teacher.\n- While-listening: Listen attentively to Question 1 and Question 2, select and tick/circle the correct pictures in Student's Book.\n- Post-listening: Swap books with a partner to peer-check, verify answers with the board, and double-check.\n- Extension: Listen to the recording sentence by sentence and repeat in chorus with natural intonation.`,
            expectedOutcome: 'At least 85-90% of students choose the correct options and understand the audio clues.',
            assessment: 'Teacher checks workbooks and marks star stickers for correct answers.'
          },
          {
            id: 'act3',
            name: 'C: Practice: Hoạt động 5: Look, complete and read / Read and complete (10 mins)',
            duration: '10 mins',
            aims: 'Develop guided reading and writing skills with Pre-, While-, Post-writing phases and an interactive Role-play game.',
            objective: 'Pupils complete written gaps accurately with correct spelling and role-play the completed dialogues.',
            content: `${act5Name} (Student's Book). Target: ${vocabList} & ${sentenceList}.`,
            methodsAndTechniques: 'Pre-, While-, Post-writing framework, Scaffolding demonstration, Game Role play.',
            teacherActivity: `• NỘI DUNG:
- Rèn luyện kỹ năng đọc hiểu và viết hoàn thành câu theo 3 giai đoạn (Pre-writing, While-writing, Post-writing) kết hợp trò chơi đóng vai (Role-play game) thi đua giữa các đội.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-WRITING:
Step 1: Get pupils to look at the pictures. Get them to identify the characters / objects (e.g. Ben, Lucy, Mai and Ben, Minh and Lucy).
Step 2: Have pupils look at the four incomplete sentences. Draw their attention to the missing words in the sentences.
Step 3: Model with sentence 1. Ask them what is missing in the sentence. Have them look at the picture and complete the gap, then read the completed sentence in chorus.

• WHILE-WRITING:
Step 4: Follow the same procedure with sentences 2, 3 and 4. Draw pupils' attention to the gap in sentences 2 and 3; particularly, the two gaps in sentence 4. Tell pupils to think about the appropriate word to fill each gap. Give pupils time to complete the sentences individually.

• POST-WRITING:
Step 5: Have pupils swap books to check, ask a few pupils to stand up and read them aloud.

• GAME: ROLE PLAY:
Step 1: Divide the class into 2 teams.
Step 2: Invite 1 pupil in each team to go to the board and role play.
Step 3: Give points to each team.
Step 4: Encourage pupils to role play to practise speaking English.`,
            studentActivity: `- Pre-writing: Observe picture cues, identify characters, and follow teacher's model for sentence 1.\n- While-writing: Fill in missing words into sentences 2, 3, and 4 in Student's Book neatly.\n- Post-writing: Swap books with partner to check; individual pupils stand up and read completed sentences aloud.\n- Game Role play: Representatives from 2 teams come to the board and role play the dialogue; class awards points and claps.`,
            expectedOutcome: 'Pupils spell target words correctly, fill in missing blanks accurately, and read sentences smoothly.',
            assessment: 'Teacher evaluates written accuracy in Student\'s Book and board writing.'
          },
          {
            id: 'act4',
            name: "D: Practice: Hoạt động 6: Let's sing / Let's play (7 mins)",
            duration: '7 mins',
            aims: 'Consolidate language through melody, rhythm, TPR actions, and group singing performance.',
            objective: 'Pupils sing the unit song with proper tune, clear pronunciation, and lively physical actions.',
            content: `${act6Name} (Student's Book). Unit song / communicative game with rhythmic actions.`,
            methodsAndTechniques: 'Musical singing, Total Physical Response (TPR), Group performance.',
            teacherActivity: `• NỘI DUNG:
- Củng cố ngôn ngữ qua giai điệu bài hát của Unit hoặc trò chơi giao tiếp, kết hợp vận động hình thể TPR và biểu diễn theo nhóm.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to the title and lyrics of the song. Check comprehension of the lyrics and give feedback. Play the recording for pupils to listen to the whole song. Have them repeat the title and lyrics line by line. Tell pupils to point at the relevant character while singing his or her name.
Step 2: Play the recording all the way through for pupils to listen to the whole song again. Tell them to pay attention to the pronunciation and melody.
Step 3: Play the recording line by line for pupils to listen, repeat and point at the relevant character. Correct their pronunciation where necessary.
Step 4: Introduce actions for pupils to do while singing along with the recording, for example, using hand movements to greet, introduce and respond to greetings (TPR). Play the recording all the way through for pupils to sing and do actions.
Step 5: Give pupils time to practice singing and doing actions in pairs or groups.

• EXTENSION:
Put pupils into groups to make up their own actions for the song. Invite groups to the front of the classroom to perform the song and the rest of the class sings and/or claps along the song.`,
            studentActivity: `- Step 1: Read the lyrics, repeat line by line after the recording, and point to relevant characters.\n- Step 2: Listen to the whole song, paying attention to rhythm and pronunciation.\n- Step 3: Sing along line by line with clear intonation.\n- Step 4: Perform TPR hand movements and actions along with the song.\n- Step 5: Practise in groups and volunteer groups perform proudly in front of the class while peers clap along.`,
            expectedOutcome: 'Pupils enjoy singing, show confidence, and consolidate all key competencies of the lesson.',
            assessment: 'Teacher assesses musical enthusiasm, pronunciation, and group coordination.'
          },
          {
            id: 'act5',
            name: 'E: Production/ wrap-up: Game/ sing/ mindmap/... (6 mins)',
            duration: '6 mins',
            aims: 'Summarize lesson outcomes, consolidate language retention, and conduct closing routine.',
            objective: 'Pupils synthesize all learning points and complete self-assessment.',
            content: 'Consolidation game / Singing relay / Mindmap review and homework.',
            methodsAndTechniques: 'Summary, Formative self-reflection, Homework instruction.',
            teacherActivity: `• NỘI DUNG:
- Thi đua ca hát hoặc thi đấu tiếp sức từ vựng giữa các dãy bàn, tổng kết kiến thức trọng tâm của toàn bài học và dặn dò bài tập về nhà.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Production Game / Sing (3 mins): Organize a quick singing competition or vocabulary relay between rows. Award praise stars.
Step 2: Wrap-up & Summary (2 mins): Review key reading, writing, and listening points on the board.
Step 3: Homework & Goodbye: Assign workbook exercises and lead goodbye routine: "Goodbye, class!"`,
            studentActivity: `- Step 1: Participate in singing relay / game happily.\n- Step 2: Summarize what was achieved in the period.\n- Step 3: Record homework and say goodbye: "Goodbye, teacher!"`,
            expectedOutcome: 'Pupils consolidate period takeaways with high confidence and joy.',
            assessment: 'Teacher assesses team spirit, communicative fluency, and assigns formative points.'
          }
        ];
      } else {
        // LESSON 1 & 2 - FULL (2 PERIODS: 10 ACTIVITIES COVERING TIẾT 1 & TIẾT 2)
        activitiesList = [
          // TIẾT 1
          {
            id: 'act1',
            name: '[Tiết 1] A: Warm up/ review: game/ sing/ chant (4 mins)',
            duration: '4 mins',
            aims: `Create a friendly, energetic atmosphere, activate schema, and lead into ${effectiveUnit} - ${effectiveLesson} using TPR and games.`,
            objective: `Create a friendly, energetic atmosphere, activate schema, and lead into ${effectiveUnit} - ${effectiveLesson} using TPR and games.`,
            content: 'Warm-up Game: 1. Pick the numbers / Flashcard Blitz / Sing & Chant to review vocabulary and structures.',
            methodsAndTechniques: 'Game-based learning, Total Physical Response (TPR), Quick response drill.',
            teacherActivity: `• NỘI DUNG:
- Khởi động lớp học, tạo không khí hào hứng, kích hoạt kiến thức nền và dẫn dắt vào bài học thông qua trò chơi Pick the numbers / Flashcard Blitz / Sing & Chant.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly. Teacher says the numbers / vocabulary items for the pupils to choose.
Step 2: Give points to the pupils with the correct choice, celebrate with classmates, and lead into Activity 1.`,
            studentActivity: `- Step 1: Pupils listen attentively to teacher's call and choose the corresponding numbers / cards.\n- Step 2: Pupils receive reward stars and celebrate with classmates.`,
            expectedOutcome: '100% of students are fully engaged, energized, and ready for language discovery.',
            assessment: 'Teacher observes engagement, rhythm, and cheerful English interaction.'
          },
          {
            id: 'act2',
            name: '[Tiết 1] B: exploration: Hoạt động 1 Look, listen and repeat (7 mins)',
            duration: '7 mins',
            aims: 'Explore the communicative context, observe characters and situations, and discover language naturally.',
            objective: 'Explore the communicative context, observe characters and situations, and discover language naturally.',
            content: `${act1Name} (Student's Book). Contextual dialogue introducing: ${sentenceList}.`,
            methodsAndTechniques: 'Visual contextualization, Gist listening, Choral and individual repetition.',
            teacherActivity: `• NỘI DUNG:
- Khám phá ngữ cảnh giao tiếp (Pictures a và b), nhận diện nhân vật, lắng nghe hội thoại mẫu giới thiệu cấu trúc giao tiếp: ${sentenceList} và nhắc lại theo từng câu.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Have pupils look at Pictures a and b and identify the characters in the pictures.
Step 2: Ask pupils to look at Picture a. Play the recording for them to listen.
Step 3: Play the recording again for pupils to listen and repeat in chorus, sentence by sentence. Follow the same procedure with Picture b. Correct their pronunciation where necessary.
Step 4: Invite a few pairs to the front of the class to listen and repeat the sentences in the recording.
Step 5: Draw their attention to the sentences Hello. I'm Ben and Hi, Ben. I'm Mai (or target unit sentences: ${sentenceList}). Tell pupils that these sentences are used to greet, self-introduce and respond to greetings; and that Hi is more friendly than Hello in conversation (communicative function).`,
            studentActivity: `- Pupils look at Pictures a and b and identify the characters in the pictures.\n- Pupils look at Picture a and listen to the recording.\n- Pupils listen again and repeat in chorus, sentence by sentence.\n- Context a:\n  Ben: Hello. I'm Ben.\n  Mai: Hi, Ben. I'm Mai.\n- Context b:\n  Minh: Hi. I'm Minh.\n  Lucy: Hello, Minh. I'm Lucy.\n- Pairs of pupils come to the front of the class to listen and repeat the sentences in the recording.\n- Pupils draw attention to the key communicative sentences and understand their usage.`,
            expectedOutcome: 'Pupils understand the communicative context clearly and pronounce sentences accurately.',
            assessment: 'Teacher evaluates visual engagement and context comprehension.'
          },
          {
            id: 'act3',
            name: '[Tiết 1] C: KNOWLEDGE CONSTRUCTION: Hoạt động 2 Listen, point and say (10 mins)',
            duration: '10 mins',
            aims: `Construct target vocabulary (${cleanVocabArray.slice(0, 4).map(w => w.replace(/\s*\([^)]*\)/g, '').trim()).join(', ')}) and model sentence patterns (${sentenceList}) through multisensory presentation, check-up games, and communicative pair work.`,
            objective: `Pupils recognize, memorize, and pronounce target vocabulary (${vocabList}) and model sentence patterns (${sentenceList}) accurately and confidently.`,
            content: `Core Knowledge: Target Vocabulary (${vocabList}); Check-up Game; Model Sentence Patterns: ${sentenceList}.`,
            methodsAndTechniques: 'Flashcard & Realia presentation, TPR modeling, Vocabulary Check-up, Substitution drill, Pair work.',
            teacherActivity: `• NỘI DUNG (KNOWLEDGE CONSTRUCTION - HÌNH THÀNH KIẾN THỨC MỚI):
1. TỪ VỰNG TRỌNG TÂM (CORE TARGET VOCABULARY):
${vocabTeachingDetails}
* Danh sách toàn bộ từ vựng mục tiêu: ${vocabList}

2. TRÒ CHƠI KIỂM TRA TỪ VỰNG (CHECK-UP VOCABULARY):
${checkupGameDetails}

3. MẪU CÂU CHÍNH (CORE MODEL SENTENCE PATTERNS):
${modelSentenceDetails}

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to picture cues a, b, c, d. Elicit the name/label of each target character or item (${cleanVocabArray.slice(0, 4).map((w, idx) => `${String.fromCharCode(97 + idx)}. ${w.replace(/\s*\([^)]*\)/g, '').trim()}`).join('; ')}).
Step 2: Point at Picture a and the word under it. Check comprehension and give feedback. Play the recording for pupils to repeat the words a few times. Follow the same procedure with pictures b, c, and d. Write the words on the board until pupils feel confident. Tell pupils to point at the relevant item in the picture when repeating.
Step 3: Draw pupils' attention to the speech bubbles. Explain the communicative function and meaning. Elicit the missing words for substitution. Play the recording for pupils to repeat the model sentence pattern (${sentencePatternsArray[0] || sentenceList}). Divide the class into halves to take turns to repeat each role in picture a until confident. Remind pupils to point at the relevant item/character in the picture when repeating.
Step 4: Repeat the same procedure with pictures b, c, and d using target vocabulary (${cleanVocabArray.slice(0, 4).map(w => w.replace(/\s*\([^)]*\)/g, '').trim()).join(', ')}).
Step 5: Give pupils time to work in pairs and take turns to act out the dialogue using pictures a, b, c, d. Go around the room to offer guidance and praise.
Step 6: Invite a few pairs to come to the front of the classroom, point at the relevant picture, and act out their roles with confident pronunciation and gestures.

• GAME (LUYỆN TẬP CẶP ĐÔI - PAIR WORK PRACTICE):
- Work in pairs with a partner using target sentence patterns (${sentenceList}) to communicate, ask, and answer. Invite volunteer pairs to perform. Praise and award stars.`,
            studentActivity: `- Step 1: Look at Pictures a, b, c, d and identify target items/characters:
${cleanVocabArray.slice(0, 4).map((w, idx) => `  * Picture ${String.fromCharCode(97 + idx)}: ${w.replace(/\s*\([^)]*\)/g, '').trim()}`).join('\n')}
- Step 2: Repeat target vocabulary (${vocabList}) chorally, in groups, and individually following audio cues and teacher's modeling; point to corresponding picture cues in Student's Book.
- Step 3: Check-up vocabulary: Pupils participate enthusiastically in "Slap the board" / "Matching" / "What's missing?".
- Step 4: Model sentence patterns & Speech bubbles:
${sentencePatternsArray.map(s => `  * ${s}`).join('\n')}
- Step 5: Pupils work in pairs, take turns pointing to pictures and acting out dialogues using target sentence patterns: "${sentenceList}".
- Step 6: Volunteer pairs come to the front of the classroom, point, speak, and act out their roles with expressive intonation; peers applaud.`,
            expectedOutcome: `100% of pupils pronounce target words correctly (${vocabList}), understand meanings, and apply model sentences smoothly (${sentenceList}).`,
            assessment: `Teacher assesses vocabulary recall (${vocabList}), pronunciation accuracy, and pair dialogue performance (${sentenceList}).`
          },
          {
            id: 'act4',
            name: "[Tiết 1] D: PRACTICE: Hoạt động 3: Let's talk (8 mins)",
            duration: '8 mins',
            aims: 'Practise communicative speaking in groups using visual contextual cues.',
            objective: 'Pupils use target sentence patterns to communicate freely with classmates.',
            content: `Task 3: Let's talk (Student's Book). Contextual speaking with picture cues.`,
            methodsAndTechniques: 'Context identification, Sentence elicitation, Group work, Communicative exchange.',
            teacherActivity: `• NỘI DUNG:
- Luyện nói giao tiếp tự do theo nhóm 4 học sinh (groups of four) dựa trên tranh ngữ cảnh gợi ý và bóng thoại trong sách giáo khoa.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to the picture. Ask questions to help them identify the context (see Input).
Step 2: Elicit the missing words in the speech bubbles and write them on the board. Get pupils to say the completed sentences.
Step 3: Put pupils into groups of four to practise the exchanges. Go around the classroom to offer support where necessary.
Step 4: Invite some groups to perform their exchanges in front of the class. Praise and give formative feedback.`,
            studentActivity: `- Pupils look at the picture and answer questions to identify the context.\n- Pupils identify the missing words and say the completed sentences aloud.\n- Pupils work in groups of four to practise the exchanges naturally and support one another.`,
            expectedOutcome: 'Pupils speak in groups with confidence, natural intonation, and good peer support.',
            assessment: 'Teacher observes group interactions and offers on-the-spot encouragement.'
          },
          {
            id: 'act5',
            name: '[Tiết 1] E: Production/ wrap-up: Mindmap & Review (6 mins)',
            duration: '6 mins',
            aims: 'Apply language to real-life situations, consolidate vocabulary and sentence patterns, and conclude period 1.',
            objective: 'Pupils consolidate vocabulary and sentence patterns, summarize learning, and complete self-evaluation.',
            content: 'Communicative game / Mindmap drawing, summary of key points.',
            methodsAndTechniques: 'Game-based learning, Mind mapping, Formative self-reflection.',
            teacherActivity: `• NỘI DUNG:
- Vận dụng kiến thức vào thực tế qua trò chơi giao tiếp hoặc vẽ sơ đồ tư duy (mindmap) trên bảng con, củng cố toàn bộ từ vựng và mẫu câu của Tiết 1, dặn dò bài về nhà.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Production Game / Mindmap (4 mins): Organize a communicative game (e.g. "Pass the secret" / "Interview relay") or guide pupils to draw a quick mindmap of target words on mini-boards. Award star stickers.
Step 2: Review & Consolidation (2 mins): Teacher recaps target vocabulary and model sentences on the board with class chorus.
Step 3: Homework & Goodbye: Teacher assigns workbook exercises and leads goodbye routine: "Goodbye, class!"`,
            studentActivity: `- Step 1: Pupils engage enthusiastically in the communicative game / mindmap drawing, speaking English spontaneously.\n- Step 2: Whole class reviews vocabulary and model sentence patterns together.`,
            expectedOutcome: 'Pupils retain target vocabulary and structures with high enthusiasm.',
            assessment: 'Teacher observes participation and awards commendation stars.'
          },
          // TIẾT 2
          {
            id: 'act6',
            name: '[Tiết 2] A: Warm-up/ review (4 mins)',
            duration: '4 mins',
            aims: `Create classroom atmosphere, activate schema, and review target vocabulary (${vocabList}) and sentence patterns (${sentenceList}) from Period 1.`,
            objective: `Create classroom atmosphere, activate schema, and review target vocabulary (${vocabList}) and sentence patterns (${sentenceList}) from Period 1.`,
            content: 'Review game: 1. Pick the numbers / Flashcard Blitz to review words and structures.',
            methodsAndTechniques: 'Game-based learning, Total Physical Response (TPR), Quick response drill.',
            teacherActivity: `• NỘI DUNG:
- Khởi động lớp học, tạo không khí vui tươi, kích hoạt kiến thức nền và ôn tập từ vựng (${vocabList}) cùng mẫu câu (${sentenceList}) của Tiết 1 qua trò chơi Pick the numbers / Flashcard Blitz.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Greet the class warmly. Teacher says the numbers / target words (${vocabList}) for the pupils to choose.
Step 2: Give points to the pupils with the correct choice, celebrate with classmates, and lead into listening practice.`,
            studentActivity: `- Step 1: Pupils listen attentively to teacher's call and choose the corresponding numbers / cards.\n- Step 2: Pupils receive reward stars and celebrate with classmates.`,
            expectedOutcome: 'Pupils actively recall 100% of target vocabulary and are motivated for listening and writing practice.',
            assessment: 'Teacher observes pupils\' recall speed and pronunciation accuracy.'
          },
          {
            id: 'act7',
            name: '[Tiết 2] B: Practice: Hoạt động 4: Listen and tick / Listen and circle (8 mins)',
            duration: '8 mins',
            aims: 'Develop listening comprehension skills through structured Pre-, While-, and Post-listening phases.',
            objective: 'Pupils listen to the recording, identify key audio clues, and tick/circle the correct pictures.',
            content: `${act4Name} (Student's Book). Target vocabulary: ${vocabList}.`,
            methodsAndTechniques: 'Pre-, While-, Post-listening framework, Gist & detail listening, Peer verification.',
            teacherActivity: `• NỘI DUNG:
- Rèn luyện kỹ năng nghe hiểu chi tiết qua 3 giai đoạn sư phạm chuẩn (Pre-listening, While-listening, Post-listening) và đánh dấu tick/khoanh tròn vào tranh đúng.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-LISTENING:
Step 1: Draw pupils' attention to Pictures 1a and 1b. Tell them about the activity. Use Pictures 1a and 1b as an example. Elicit the names of the characters / objects in each picture. Point at the pictures respectively to explain the context.

• WHILE-LISTENING:
- Play the recording for Question 1 for pupils to listen. Play the recording again. Elicit pupils to give the answer. Circle / tick the letter b in Picture 1b (or correct picture). Play the recording a third time for pupils to double-check their answers.
Step 2: Play the recording for Question 2 for pupils to do the task.

• POST-LISTENING:
Step 3: Get pupils to swap books with a partner. Play the recording again to check answers together as a class. Write the answers on the board for pupils to correct their answers.
Step 4: Play the recording all the way through for pupils to double-check all the answers.

• EXTENSION:
If time allows, play the recording, sentence by sentence, for the class to listen and repeat in chorus. Correct their pronunciation where necessary.`,
            studentActivity: `- Pre-listening: Look at Pictures 1a and 1b, identify the characters and objects, and predict audio cues with teacher.\n- While-listening: Listen attentively to Question 1 and Question 2, select and tick/circle the correct pictures in Student's Book.\n- Post-listening: Swap books with a partner to peer-check, verify answers with the board, and double-check.\n- Extension: Listen to the recording sentence by sentence and repeat in chorus with natural intonation.`,
            expectedOutcome: 'At least 85-90% of students choose the correct options and understand the audio clues.',
            assessment: 'Teacher checks workbooks and marks star stickers for correct answers.'
          },
          {
            id: 'act8',
            name: '[Tiết 2] C: Practice: Hoạt động 5: Look, complete and read (+ Role play) (10 mins)',
            duration: '10 mins',
            aims: 'Develop guided reading and writing skills with Pre-, While-, Post-writing phases and an interactive Role-play game.',
            objective: 'Pupils complete written gaps accurately with correct spelling and role-play the completed dialogues.',
            content: `${act5Name} (Student's Book). Target: ${vocabList} & ${sentenceList}.`,
            methodsAndTechniques: 'Pre-, While-, Post-writing framework, Scaffolding demonstration, Game Role play.',
            teacherActivity: `• NỘI DUNG:
- Rèn luyện kỹ năng đọc hiểu và viết hoàn thành câu theo 3 giai đoạn (Pre-writing, While-writing, Post-writing) kết hợp trò chơi đóng vai (Role-play game) thi đua giữa các đội.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
• PRE-WRITING:
Step 1: Get pupils to look at the pictures. Get them to identify the characters / objects (e.g. Ben, Lucy, Mai and Ben, Minh and Lucy).
Step 2: Have pupils look at the four incomplete sentences. Draw their attention to the missing words in the sentences.
Step 3: Model with sentence 1. Ask them what is missing in the sentence. Have them look at the picture and complete the gap, then read the completed sentence in chorus.

• WHILE-WRITING:
Step 4: Follow the same procedure with sentences 2, 3 and 4. Draw pupils' attention to the gap in sentences 2 and 3; particularly, the two gaps in sentence 4. Tell pupils to think about the appropriate word to fill each gap. Give pupils time to complete the sentences individually.

• POST-WRITING:
Step 5: Have pupils swap books to check, ask a few pupils to stand up and read them aloud.

• GAME: ROLE PLAY:
Step 1: Divide the class into 2 teams.
Step 2: Invite 1 pupil in each team to go to the board and role play.
Step 3: Give points to each team.
Step 4: Encourage pupils to role play to practise speaking English.`,
            studentActivity: `- Pre-writing: Observe picture cues, identify characters, and follow teacher's model for sentence 1.\n- While-writing: Fill in missing words into sentences 2, 3, and 4 in Student's Book neatly.\n- Post-writing: Swap books with partner to check; individual pupils stand up and read completed sentences aloud.\n- Game Role play: Representatives from 2 teams come to the board and role play the dialogue; class awards points and claps.`,
            expectedOutcome: 'Pupils spell target words correctly, fill in missing blanks accurately, and read sentences smoothly.',
            assessment: 'Teacher evaluates written accuracy in Student\'s Book and board writing.'
          },
          {
            id: 'act9',
            name: "[Tiết 2] D: Practice: Hoạt động 6: Let's sing / Let's play (7 mins)",
            duration: '7 mins',
            aims: 'Consolidate language through melody, rhythm, TPR actions, and group singing performance.',
            objective: 'Pupils sing the unit song with proper tune, clear pronunciation, and lively physical actions.',
            content: `${act6Name} (Student's Book). Unit song / communicative game with rhythmic actions.`,
            methodsAndTechniques: 'Musical singing, Total Physical Response (TPR), Group performance.',
            teacherActivity: `• NỘI DUNG:
- Củng cố ngôn ngữ qua giai điệu bài hát của Unit hoặc trò chơi giao tiếp, kết hợp vận động hình thể TPR và biểu diễn theo nhóm.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Draw pupils' attention to the title and lyrics of the song. Check comprehension of the lyrics and give feedback. Play the recording for pupils to listen to the whole song. Have them repeat the title and lyrics line by line. Tell pupils to point at the relevant character while singing his or her name.
Step 2: Play the recording all the way through for pupils to listen to the whole song again. Tell them to pay attention to the pronunciation and melody.
Step 3: Play the recording line by line for pupils to listen, repeat and point at the relevant character. Correct their pronunciation where necessary.
Step 4: Introduce actions for pupils to do while singing along with the recording, for example, using hand movements to greet, introduce and respond to greetings (TPR). Play the recording all the way through for pupils to sing and do actions.
Step 5: Give pupils time to practice singing and doing actions in pairs or groups.

• EXTENSION:
Put pupils into groups to make up their own actions for the song. Invite groups to the front of the classroom to perform the song and the rest of the class sings and/or claps along the song.`,
            studentActivity: `- Step 1: Read the lyrics, repeat line by line after the recording, and point to relevant characters.\n- Step 2: Listen to the whole song, paying attention to rhythm and pronunciation.\n- Step 3: Sing along line by line with clear intonation.\n- Step 4: Perform TPR hand movements and actions along with the song.\n- Step 5: Practise in groups and volunteer groups perform proudly in front of the class while peers clap along.`,
            expectedOutcome: 'Pupils enjoy singing, show confidence, and consolidate all key competencies of the lesson.',
            assessment: 'Teacher assesses musical enthusiasm, pronunciation, and group coordination.'
          },
          {
            id: 'act10',
            name: '[Tiết 2] E: Production/ wrap-up: Game/ sing/ mindmap/... (6 mins)',
            duration: '6 mins',
            aims: 'Summarize lesson outcomes, consolidate language retention, and conduct closing routine.',
            objective: 'Pupils synthesize all learning points and complete self-assessment.',
            content: 'Consolidation game / Singing relay / Mindmap review and homework.',
            methodsAndTechniques: 'Summary, Formative self-reflection, Homework instruction.',
            teacherActivity: `• NỘI DUNG:
- Thi đua ca hát hoặc thi đấu tiếp sức từ vựng giữa các dãy bàn, tổng kết kiến thức trọng tâm của toàn bài học và dặn dò bài tập về nhà.

• CÁC BƯỚC TIẾN HÀNH (TEACHING STEPS):
Step 1: Production Game / Sing (3 mins): Organize a quick singing competition or vocabulary relay between rows. Award praise stars.
Step 2: Wrap-up & Summary (2 mins): Review key reading, writing, and listening points on the board.
Step 3: Homework & Goodbye: Assign workbook exercises and lead goodbye routine: "Goodbye, class!"`,
            studentActivity: `- Step 1: Participate in singing relay / game happily.\n- Step 2: Summarize what was achieved in the period.\n- Step 3: Record homework and say goodbye: "Goodbye, teacher!"`,
            expectedOutcome: 'Pupils consolidate period takeaways with high confidence and joy.',
            assessment: 'Teacher assesses team spirit, communicative fluency, and assigns formative points.'
          }
        ];
      }
    }

    // Inject Single Practice Activity Adaptation for Inclusive Class Mode
    // Quy chuẩn người dùng: Bôi đỏ hoạt động dành cho học sinh khuyết tật, 1 hành động cụ thể ở bất kì hoạt động nào.
    // Ngắn gọn, cụ thể, đúng trọng tâm, bắt đầu bằng động từ.
    if (hasDisabilities) {
      const teacherAdaptations: string[] = [];
      const studentAdaptations: string[] = [];

      if (activeDisabilityTypes.includes('physical')) {
        teacherAdaptations.push('Chuẩn bị thẻ tranh phóng to, cho phép chỉ tranh hoặc gật đầu lựa chọn phương án thay cho thao tác viết/vận động nhanh; dành đủ thời gian phản hồi.');
        studentAdaptations.push('Chỉ tay vào tranh phóng to hoặc gật đầu chọn phương án với sự hỗ trợ của bạn cùng bàn.');
      }
      if (activeDisabilityTypes.includes('hearing_speech')) {
        teacherAdaptations.push("Làm mẫu cử chỉ điệu bộ (TPR), phát âm chậm rõ khẩu hình miệng và phân công bạn cùng tiến hỗ trợ nhắc lại 1-2 từ ngữ quen thuộc.");
        studentAdaptations.push("Quan sát khẩu hình miệng của cô và làm cử chỉ TPR minh họa hoặc nhắc lại từ ngữ theo khả năng.");
      }
      if (activeDisabilityTypes.includes('visual')) {
        teacherAdaptations.push('Đọc to âm thanh mẫu, hướng dẫn sờ cảm nhận đồ vật thật (realia), chuẩn bị tranh phóng to và xếp chỗ ngồi đủ ánh sáng.');
        studentAdaptations.push('Lắng nghe âm thanh mẫu, cảm nhận đồ vật thật và nhắc lại từ ngữ theo bạn cùng tiến.');
      }
      if (activeDisabilityTypes.includes('intellectual')) {
        teacherAdaptations.push('Chia nhỏ nhiệm vụ thành từng bước đơn giản, tập trung vào 1-2 từ ngữ quen thuộc và phân công bạn cùng tiến hỗ trợ thực hành.');
        studentAdaptations.push('Quan sát tranh và nhắc lại 1-2 từ vựng theo hướng dẫn của giáo viên và bạn cùng tiến.');
      }
      if (activeDisabilityTypes.includes('neurological_mental')) {
        teacherAdaptations.push('Tạo không khí lớp học thoải mái, thân thiện, không tạo áp lực và khuyến khích tham gia luyện tập theo nhóm đôi quen thuộc.');
        studentAdaptations.push('Tham gia luyện tập giao tiếp tự nhiên cùng bạn cùng bàn trong trạng thái thoải mái.');
      }
      if (activeDisabilityTypes.includes('other')) {
        teacherAdaptations.push('Làm mẫu từng bước cụ thể, dùng hình ảnh trực quan và phân công bạn cùng tiến đồng hành hỗ trợ.');
        studentAdaptations.push('Quan sát tranh và thực hiện thao tác theo khả năng dưới sự trợ giúp của bạn cùng tiến.');
      }

      if (disabilityConfig?.teacherNotes && disabilityConfig.teacherNotes.trim()) {
        teacherAdaptations.push(`Thực hiện điều chỉnh riêng: ${disabilityConfig.teacherNotes.trim()}`);
      }

      // ONLY ONE ACTIVITY receives disability adaptation (Activity 4: Practice)
      const practiceIdx = activitiesList.findIndex(a => 
        a.id === 'act4' || a.name.toLowerCase().includes('practice') || a.name.includes('D.')
      );
      const targetIdx = practiceIdx !== -1 ? practiceIdx : (activitiesList.length >= 4 ? 3 : activitiesList.length - 1);

      if (activitiesList[targetIdx]) {
        const targetAct = activitiesList[targetIdx];
        activitiesList[targetIdx] = {
          ...targetAct,
          teacherActivity: `${targetAct.teacherActivity}\n<span style="color:red;">* Hướng dẫn học sinh khuyết tật: ${teacherAdaptations.join(' ')}</span>`,
          studentActivity: `${targetAct.studentActivity}\n<span style="color:red;">* Học sinh khuyết tật: ${studentAdaptations.join(' ')}</span>`,
          expectedOutcome: `${targetAct.expectedOutcome} <span style="color:red;">(Học sinh khuyết tật: Tham gia tích cực và nhận biết được từ vựng/mẫu câu cơ bản theo khả năng).</span>`,
          assessment: `${targetAct.assessment}\n<span style="color:red;">* Đánh giá học sinh khuyết tật: Động viên, khen ngợi sự nỗ lực và tinh thần tham gia của học sinh.</span>`
        };
      }
    }

    return {
      id: 'lp_' + Math.random().toString(36).substring(2, 9),
      subject: 'English',
      grade: `Grade ${gradeNum}`,
      unit: effectiveUnit,
      lesson: effectiveLesson,
      period: effectivePeriod,
      activityScope: scopeSuffix,
      lessonName: effectiveLessonName,
      topic: effectiveTopic,
      duration: params.duration || (isFull ? '70 minutes (2 periods)' : '35 minutes (1 period)'),
      bookSeries: params.bookSeries || tb?.bookSeries || 'Global Success (Vietnam Education Publishing House)',
      pageRange: effectivePageRange,
      language: 'en',
      inclusiveClassMode: hasDisabilities,
      disabilitySupport: disabilityConfig,
      textbookSource: {
        id: tb?.id,
        title: tb?.title || `English ${gradeNum} Global Success Student's Book`,
        bookSeries: tb?.bookSeries || 'Global Success (Vietnam Education Publishing House)',
        pageRange: effectivePageRange,
        keyVocabulary: cleanVocabArray,
        keySentences: foundUnit?.sentencePatterns || tb?.keySentences || ['What is this? - It\'s a pen.']
      },
      officialReferences: englishRefs,
      objectives: {
        knowledgeAndSkills: isG12 ? (
          isG12Lesson1 ? [
            `• Recognise and pronounce the letter ${letterPair} and its sound ${sound} with correct mouth shape and natural intonation.`,
            `• Identify, pronounce, and memorize target vocabulary: ${wordsString} using TPR, picture flashcards, and real objects (realia).`,
            `• Point to the pictures and say the words accurately in Activity 1 and Activity 2 on Student's Book page ${pageL1} / hoclieu.vn.`,
            `• Participate actively in interactive games ("Slap the board", "Pass the ball!") and collaborative pair/group work.`,
            ...redObjectiveSpans
          ] : isG12Lesson2 ? [
            `• Chant fluently with correct rhythm, pronunciation of sound ${sound}, and hand-clapping in Activity 3 (Listen and chant).`,
            `• Listen attentively to the recording and tick the correct picture boxes (Questions 1 and 2) in Activity 4 (Listen and tick).`,
            `• Recognise upper case ${letterUpper} and lower case ${letterLower}, master stroke order, and neatly trace the letter in Activity 5 (Look and trace).`,
            `• Develop rhythmic, listening, and handwriting skills through active pair and team games.`,
            ...redObjectiveSpans
          ] : [
            `• Understand and accurately produce the communicative sentence pattern: "${sentencePattern}" in Activity 6 (Listen and repeat).`,
            `• Confidently practise speaking in pairs using the speech bubble frame "${sentencePatternBubble}" with picture cues in Activity 7 (Let's talk).`,
            `• Sing the unit song with proper tune, rhythm, and actions in Activity 8 (Let's sing).`,
            `• Communicate freely about their own possessions using real objects ("Show and Tell") and collaborate effectively.`,
            ...redObjectiveSpans
          ]
        ) : isG345Lesson3 ? (
          isAct123 ? [
            `• Recognize and explain word stress concept with the stress mark (‘), pronouncing target words and sentences accurately in Activity 1 (Phonics / Word stress).`,
            `• Discriminate and circle words with stress on the first syllable through attentive listening in Activity 2 (Listen and circle / Listen and tick).`,
            `• Chant fluently with natural rhythm, accurate pronunciation, and stressed syllables while clapping along in Activity 3 (Listen and chant).`,
            `• Develop auditory discrimination, rhythm, and phonics articulation through collaborative chant battles and games.`,
            ...redObjectiveSpans
          ] : isAct456 ? [
            `• Comprehend written texts across Pre-, While-, and Post-reading phases in Activity 4 (Read and circle / Read and match / Read and complete).`,
            `• Compose and complete a short personal writing paragraph with accurate spelling and punctuation in Activity 5 (Let's write / Complete the text with own info).`,
            `• Present a poster project with confidence in groups and display it in the classroom gallery in Activity 6 (Project: Poster presentation / Show and tell).`,
            `• Foster reading comprehension, creative writing, and oral presentation competencies.`,
            ...redObjectiveSpans
          ] : [
            `• Recognize word stress, chant fluently, comprehend written texts, write personal information, and present posters across both periods of Lesson 3.`,
            `• Master phonics, word stress, reading comprehension, writing, and speaking competencies comprehensively.`,
            ...redObjectiveSpans
          ]
        ) : (
          isAct123 ? [
            `• Discover communicative context and repeat dialogues with natural intonation in Activity 1 (Look, listen and repeat).`,
            `• Memorize, pronounce, and check up target vocabulary: ${vocabList} (using TPR, picture flashcards, and real things/realia), and apply model sentence pattern: "${sentenceList}" in Activity 2 (Listen, point and say).`,
            `• Practise communicative speaking with peers in groups of four in Activity 3 (Let's talk) using picture cues.`,
            `• Develop conversational fluency, vocabulary retention with check-up games ("Slap the board", "Matching"), and pair collaboration.`,
            ...redObjectiveSpans
          ] : isAct456 ? [
            `• Develop listening comprehension across Pre-, While-, and Post-listening phases in Activity 4 (Listen and tick / Listen and circle).`,
            `• Develop reading and writing skills through guided scaffolding (Pre-, While-, Post-writing) and interactive Role-play games in Activity 5 (Look, complete and read / Read and complete).`,
            `• Sing the unit song with proper tune, melody, clear pronunciation, and TPR actions in Activity 6 (Let's sing / Let's play).`,
            `• Synthesize listening, reading, writing, and speaking skills in authentic communicative classroom contexts.`,
            ...redObjectiveSpans
          ] : [
            `• Identify, pronounce, and memorize target vocabulary: ${vocabList} and model sentence patterns: "${sentenceList}".`,
            `• Master all 6 activities across both periods of Lesson 1/2 with full 5-stage pedagogical cycles (A: Warm-up, B: Exploration, C: Knowledge Construction, D: Practice, E: Production/Wrap-up).`,
            ...redObjectiveSpans
          ]
        ),
        coreCompetencies: [
          `• Năng lực đặc thù - Năng lực giao tiếp Tiếng Anh (CT GDPT 2018):`,
          `  - Kỹ năng Nghe (Listening): Nghe hiểu từ vựng (${vocabList}) và nhận biết mẫu câu giao tiếp (${sentenceList}) trong các đoạn hội thoại mẫu hoặc bài nghe chuẩn; phân biệt được phát âm và ngữ điệu tự nhiên.`,
          `  - Kỹ năng Nói (Speaking): Phát âm chuẩn từ vựng, sử dụng trôi chảy mẫu câu (${sentenceList}) để chào hỏi, trao đổi thông tin và tương tác tự tin theo cặp đôi/nhóm 4 học sinh.`,
          `  - Kỹ năng Đọc (Reading): Đọc đúng và hiểu nghĩa các từ vựng và câu ngắn trong bài học; đối chiếu và lựa chọn đúng tranh minh họa tương ứng.`,
          `  - Kỹ năng Viết (Writing): Viết đúng chính tả các từ vựng mục tiêu, điền chính xác từ còn thiếu vào câu và hoàn thành bài viết ngắn với thông tin bản thân.`,
          `• Năng lực chung (Thông tư 32/2018/TT-BGDĐT):`,
          `  - Tự chủ và tự học: Tự giác hoàn thành bài tập trong SGK/VBT, chủ động lắng nghe và tự điều chỉnh phát âm theo mẫu của giáo viên.`,
          `  - Giao tiếp và hợp tác: Tích cực phối hợp cùng bạn trong các hoạt động đóng vai (role-play), trò chơi ngôn ngữ và làm việc nhóm.`,
          `  - Giải quyết vấn đề và sáng tạo: Vận dụng linh hoạt từ vựng và mẫu câu vào ngữ cảnh thực tế hàng ngày một cách tự nhiên.`
        ],
        personalQualities: [
          `• Ethics & Morality (TT 32/2018): ${specificIntegration.ethicsDesc}`,
          '• Diligence: Eagerly participate in classroom activities, chants, and practice dialogues.',
          '• Responsibility: Keep school supplies tidy, respect peers, and share stationery politely.'
        ],
        digitalCompetency: [
          `• ${specificIntegration.nlsDesc}`
        ],
        aiIntegration: [
          `• ${specificIntegration.aiDesc}`
        ],
        trafficSafety: [
          `• Traffic Safety Education (CV 3456): ${specificIntegration.atgtDesc}`
        ],
        lifeSkills: [
          `• Life Skills (KNS): ${specificIntegration.knsDesc}`
        ],
        ethicsAndMoral: [
          `• Moral Qualities (TT 32/2018): ${specificIntegration.ethicsDesc}`
        ]
      },
      materials: {
        teacher: isG12 ? [
          `Teacher's Guide & Student's Book (English ${gradeNum} Global Success, page ${isG12Lesson1 ? pageL1 : isG12Lesson2 ? pageL2 : pageL3}).`,
          'Interactive smartboard slides with embedded audio tracks from hoclieu.vn.',
          `Phonics cards for letter ${letterPair}, flashcards for target words (${wordsString}), soft ball for "Pass the ball!" game, and real classroom objects (realia).`
        ] : [
          `Teacher's Guide & Student's Book (English ${gradeNum} Global Success).`,
          'Interactive smartboard slides with embedded audio tracks.',
          `Flashcards of target vocabulary (${vocabList}) and real classroom objects (realia).`
        ],
        student: [
          `English ${gradeNum} Student's Book and Activity Workbook.`,
          'Real school supplies (pencil case, pen, pencil, ruler, book).'
        ],
        digitalTools: [
          specificIntegration.devicesDesc || 'SmartEdu Digital Interactive Audio Player with slow-speed repetition',
          'SmartEdu Interactive Game Center (Wheel of Fortune & Balloon Pop)'
        ]
      },
      activities: activitiesList,
      differentiation: {
        needingSupport: [
          `Provide visual flashcards with phonetic cues for target words: ${vocabList}.`,
          `Use sentence frames: "${sentenceList.split('|')[0] || sentenceList}" with peer buddy support.`
        ],
        advanced: [
          'Encourage pupils to expand sentences with adjectives (e.g., color, size).',
          'Ask extension questions and invite pupils to create their own mini dialogues.'
        ]
      },
      consolidation: isG12 ? (
        isG12Lesson1
          ? `Consolidate the letter ${letterPair}, sound ${sound}, and 4 target words (${wordsString}). Praise pupils' active participation in the "Pass the ball!" game. Remind pupils to point and say the words to their family at home.`
          : isG12Lesson2
          ? `Consolidate chant rhythm, listening check answers, and letter ${letterPair} tracing strokes. Encourage daily chant practice and neat handwriting.`
          : `Consolidate communicative sentence pattern "${sentencePattern}" and the unit song. Remind pupils to sing the song and practice speaking English daily.`
      ) : `Consolidate target vocabulary (${vocabList}) and sentence structures (${sentenceList}). Remind pupils to practice English daily and keep their learning materials organized.`,
      assessment: {
        methods: [
          'Continuous observation of pronunciation and fluency.',
          'Peer assessment during pair work.',
          'Formative quick check using SmartEdu interactive game.'
        ],
        tools: [
          'CEFR A1 Speaking Rubric (Pronunciation 40%, Accuracy 30%, Fluency 30%).',
          'Observation checklist for MOET Primary English competencies (CV 2345).'
        ],
        rubrics: [
          'Level 1 (Needs support): Hesitant with words, needs teacher prompts.',
          'Level 2 (Achieved): Pronounces target words correctly, speaks full sentence with minor hesitation.',
          'Level 3 (Excellence): Fluent, confident interaction, uses natural English intonation.'
        ]
      },
      postLessonAdjustments: {
        difficulties: 'Some pupils needed extra support with initial/ending consonants.',
        effectiveActivities: `The communicative activities in ${scopeSuffix} generated great excitement and active speaking.`,
        neededAdjustments: 'Spend 2 more minutes on individual phonetic drilling for slower pupils.',
        supportMeasures: 'Assign friendly study buddies and flashcard review cards.'
      },
      attachedImages: normalizedAttachedImages,
      createdAt: new Date().toISOString(),
      authorName: 'SmartEdu AI Pedagogical Copilot'
    };
  }

  // 100% VIETNAMESE PRESENTATION FOR ALL OTHER SUBJECTS (CV 2345)
  const effectiveSubject = params.subject || tb?.subject || 'Toán';
  const effectiveLessonName = params.lessonName || tb?.lessonName || tb?.title || `Bài học môn ${effectiveSubject} lớp ${gradeNum}`;
  const effectiveTopic = tb?.chapterOrUnit || `Nội dung cốt lõi theo SGK ${params.bookSeries || 'Kết nối tri thức'}`;
  
  // Resolve context-aware, unit-specific integrations for Vietnamese subjects
  const vnSpecificIntegration = getLessonSpecificIntegrations({
    grade: `Lớp ${gradeNum}`,
    week: params.weekNumber || 1,
    unitCode: effectiveTopic,
    lessonTitle: effectiveLessonName,
    periodNumber: 1,
    periodInWeek: 1,
    lessonPart: `${effectiveTopic} - ${effectiveLessonName}`,
    scope: actScope,
    vocab: tb?.keyVocabulary || [],
    patterns: [],
    activityScope: actScope.includes('1, 2, 3') ? 'act123' : actScope.includes('4, 5, 6') ? 'act456' : 'all'
  });

  let vnScopeLabel = 'Toàn bộ bài học';
  if (actScope === 'act_1_2_3' || actScope.includes('1, 2, 3')) {
    vnScopeLabel = 'Hoạt động 1, 2, 3 (Khởi động & Khám phá bài mới)';
  } else if (actScope === 'act_4_5_6' || actScope.includes('4, 5, 6')) {
    vnScopeLabel = 'Hoạt động 4, 5, 6 (Luyện tập & Vận dụng sáng tạo)';
  }

  let vnActivitiesList: import('../types').LessonPlanActivity[] = [];
  const vnCustomLines = (params.customActivityText || '').split('\n').map(l => l.trim()).filter(l => l.length > 0);

  if (vnCustomLines.length > 0) {
    vnScopeLabel = `Tự nhập (${vnCustomLines.length} hoạt động)`;
    vnActivitiesList = vnCustomLines.map((line, idx) => {
      const cleanName = line.replace(/^[0-9]+[.\-)]\s*/, '').trim();
      const defaultStep = ['Khởi động (Warm-up & Review)', 'Khám phá / Hình thành kiến thức mới', 'Luyện tập / Thực hành', 'Vận dụng / Trải nghiệm', 'Mở rộng / Dự án học tập'][idx] || `Hoạt động ${idx + 1}`;
      const isWarmUp = idx === 0 || cleanName.toLowerCase().includes('khởi động') || cleanName.toLowerCase().includes('trò chơi') || cleanName.toLowerCase().includes('hát');
      const isExploration = !isWarmUp && (idx === 1 || cleanName.toLowerCase().includes('khám phá') || cleanName.toLowerCase().includes('đọc') || cleanName.toLowerCase().includes('hình thành'));
      
      return {
        id: `act_${idx + 1}`,
        name: `Hoạt động ${idx + 1}: ${defaultStep} - ${cleanName}`,
        duration: `${Math.max(5, Math.round(35 / vnCustomLines.length))} phút`,
        objective: isWarmUp
          ? `Tạo tâm thế vui tươi, kích hoạt kiến thức nền cho ${cleanName}.`
          : `Học sinh nắm vững mục tiêu bài học, chủ động thực hiện và hoàn thành tốt ${cleanName}.`,
        content: `${cleanName}: Khai thác chuẩn kiến thức SGK trang ${effectivePageRange}.`,
        methodsAndTechniques: isWarmUp ? 'Trò chơi học tập, Vấn đáp gợi mở' : isExploration ? 'Trực quan hóa, Thao tác đồ dùng, Thảo luận nhóm đôi' : 'Thực hành - Luyện tập, Đánh giá đồng đẳng',
        teacherActivity: isWarmUp 
          ? `1. Tổ chức ${cleanName}:\n- GV phổ biến mục tiêu và luật chơi rõ ràng.\n- GV điều hành cả lớp tham gia hào hứng, nhận xét và dẫn dắt chuyển tiếp mượt mà vào bài học mới.`
          : `1. Chuyển giao nhiệm vụ:\n- Giáo viên hướng dẫn chi tiết yêu cầu của ${cleanName} trong SGK trang ${effectivePageRange}.\n- Đặt câu hỏi gợi mở, hướng dẫn học sinh thao tác với đồ dùng / bảng con / vở bài tập.\n2. Quan sát và hỗ trợ học sinh còn lúng túng.\n3. Nhận xét, chuẩn hóa kiến thức trọng tâm và biểu dương học sinh.`,
        studentActivity: isWarmUp
          ? `- Học sinh hào hứng tham gia ${cleanName}, trả lời câu hỏi và nhận sao khen thưởng.\n- Mở SGK trang ${effectivePageRange}, ghi tựa bài và sẵn sàng học tập.`
          : `- Học sinh quan sát, lắng nghe hướng dẫn của GV.\n- Tự giác làm việc cá nhân / thảo luận nhóm đôi để hoàn thành ${cleanName}.\n- Đại diện học sinh chia sẻ kết quả trước lớp, lắng nghe góp ý và tự sửa sai.`,
        expectedOutcome: `100% học sinh hiểu và hoàn thành tốt yêu cầu của ${cleanName}.`,
        assessment: 'Phương pháp: Quan sát & Đánh giá sản phẩm; Công cụ: Bảng kiểm, Phiếu học tập & Lời khen.'
      };
    });
  } else {
    vnActivitiesList = [
      {
        id: 'act1',
        name: 'Hoạt động 1: Khởi động (Warm-up & Review) (5 phút)',
        duration: '5 phút',
        objective: 'Tạo tâm thế vui tươi, ôn lại kiến thức bài trước và kích hoạt kiến thức nền dẫn dắt tự nhiên vào bài học mới.',
        content: `Trò chơi học tập: "${effectiveSubject === 'Toán' ? 'Bắn tên toán học' : effectiveSubject === 'Tiếng Việt' ? 'Hộp quà bí mật' : 'Vòng quay may mắn'}" - Khởi động và kết nối bài học.`,
        teacherActivity: `1. Tên trò chơi: "${effectiveSubject === 'Toán' ? 'Bắn tên toán học' : effectiveSubject === 'Tiếng Việt' ? 'Hộp quà bí mật' : 'Vòng quay may mắn'}".\n2. Chuẩn bị: Thẻ câu hỏi tương tác, bảng con, quà tặng mini / sao khen thưởng.\n3. Luật chơi chi tiết:\n- Giáo viên hô: "Bắn tên, bắn tên!" - Cả lớp đáp: "Tên ai, tên ai?".\n- GV gọi tên học sinh bất kỳ trả lời câu hỏi ôn tập / khởi động. Trả lời đúng được thưởng 1 sao điểm tốt và được quyền "bắn tên" bạn tiếp theo.\n4. Hệ thống câu hỏi thử thách cụ thể:\n- Câu 1: ${effectiveSubject === 'Toán' ? 'Tính nhẩm nhanh kết quả phép tính ôn tập của bài trước.' : 'Nhắc lại nội dung hoặc từ ngữ trọng tâm của bài trước.'} (Đáp án chính xác: Đúng theo SGK)\n- Câu 2: Quan sát tranh khởi động và nêu các đối tượng / hiện tượng xuất hiện trong tranh.\n- Câu 3: Nêu một phát hiện hoặc dự đoán của em về bài học hôm nay.\n5. Lời dẫn dắt chuyển tiếp nguyên văn của Giáo viên:\n"Cô khen ngợi cả lớp đã tham gia trò chơi rất sôi nổi và trả lời rất chính xác các câu hỏi. Để giúp các em khám phá sâu hơn những điều thú vị của bài học hôm nay, cô trò chúng ta cùng bước vào bài: ${effectiveLessonName}!"`,
        studentActivity: `- Học sinh chăm chú lắng nghe GV phổ biến luật chơi và hào hứng hô khẩu hiệu.\n- Học sinh được gọi tên tự tin đứng dậy đọc to câu hỏi và trả lời dõng dạc trước lớp.\n- Cả lớp quan sát, đối chiếu kết quả, vỗ tay tán thưởng khi bạn trả lời đúng.\n- Học sinh mở SGK trang ${effectivePageRange}, ghi tựa bài vào vở và sẵn sàng bước vào hoạt động khám phá.`,
        expectedOutcome: '100% học sinh hào hứng tham gia trò chơi, trả lời đúng các câu hỏi khởi động và sẵn sàng tâm thế học tập tích cực.',
        assessment: 'Phương pháp: Quan sát; Công cụ: Nhận xét bằng lời & Thưởng sao tích lũy; Tiêu chí: Sự hào hứng, tinh thần phản xạ nhanh và câu trả lời chính xác.'
      },
      {
        id: 'act2',
        name: 'Hoạt động 2: Khám phá / Hình thành kiến thức mới (12 - 15 phút)',
        duration: '15 phút',
        objective: 'Học sinh tự quan sát, phân tích dữ liệu SGK/SGV, thao tác với học liệu để phát hiện bản chất và chiếm lĩnh kiến thức trọng tâm của bài.',
        content: `Nhiệm vụ mục Khám phá trong SGK trang ${effectivePageRange}: Khai thác ví dụ mẫu, tranh minh họa và mô hình trực quan của bài "${effectiveLessonName}".`,
        teacherActivity: `Bước 1. Chuyển giao nhiệm vụ:\n- Giáo viên yêu cầu học sinh quan sát tranh/ví dụ mục Khám phá trong SGK trang ${effectivePageRange}.\n- Hướng dẫn học sinh lấy bộ đồ dùng học tập ra bàn.\n- Hệ thống câu hỏi gợi mở chi tiết của Giáo viên:\n  + Câu hỏi 1: "Các em hãy quan sát kỹ hình vẽ/ví dụ mẫu và cho cô biết có những đại lượng/yếu tố nào?"\n  + Câu hỏi 2: "Khi thực hiện thao tác/so sánh, em nhận thấy quy luật/đặc điểm gì nổi bật?"\n  + Câu hỏi 3: "Từ đó, em rút ra được cách thực hiện/quy tắc ghi nhớ như thế nào?"\n\nBước 3. Báo cáo, chia sẻ:\n- Giáo viên mời đại diện 2 - 3 nhóm dán kết quả lên bảng và trình bày.\n- Giáo viên viết bảng tóm tắt từng bước tư duy.\n\nBước 5. Kết luận, chốt kiến thức:\n- Giáo viên chuẩn hóa kiến thức, đóng khung QUY TẮC / GHI NHỚ TRỌNG TÂM lên bảng:\n  "Ghi nhớ: Nắm vững bản chất kiến thức và quy trình thực hiện bài ${effectiveLessonName} theo chuẩn SGK/SGV."\n- Cho 2 - 3 học sinh đọc lại ghi nhớ trước lớp.`,
        studentActivity: `Bước 2. Học sinh thực hiện nhiệm vụ:\n- Học sinh mở SGK, lấy que tính/bảng con/đồ dùng thao tác theo hướng dẫn.\n- Thảo luận nhóm đôi trong 3 phút để tìm câu trả lời cho hệ thống câu hỏi gợi mở.\n- Câu trả lời mong đợi:\n  + Trả lời câu 1: Nhận diện đúng các thành phần, đối tượng trong ví dụ mẫu SGK.\n  + Trả lời câu 2: Nêu được sự biến đổi hoặc mối quan hệ giữa các đại lượng/từ ngữ.\n  + Trả lời câu 3: Nêu được quy tắc hoặc công thức bài học một cách tự nhiên.\n\nBước 3. Báo cáo, chia sẻ:\n- Đại diện các nhóm tự tin đứng dậy thuyết trình kết quả phát hiện của nhóm mình.\n\nBước 4. Thảo luận, nhận xét:\n- Các nhóm bạn chú ý lắng nghe, đối chiếu kết quả, đặt câu hỏi phản biện.\n- Đồng thanh đọc to và khắc sâu phần Ghi nhớ chốt bài.`,
        expectedOutcome: 'Học sinh hiểu sâu bản chất kiến thức mới, tự tin phát biểu quy tắc/khái niệm và biết thao tác thành thạo trên đồ dùng trực quan.',
        assessment: 'Phương pháp: Vấn đáp & Đánh giá qua sản phẩm thao tác; Công cụ: Bảng kiểm quan sát; Tiêu chí: Hiểu đúng bản chất và diễn đạt mạch lạc.'
      },
      {
        id: 'act3',
        name: 'Hoạt động 3: Luyện tập / Thực hành (12 - 15 phút)',
        duration: '15 phút',
        objective: 'Củng cố kiến thức vừa khám phá, rèn luyện kỹ năng thực hành từ mức độ nhận biết đến vận dụng qua các bài tập cụ thể trong SGK.',
        content: `Các bài tập 1, 2, 3 trong SGK trang ${effectivePageRange}: Rèn luyện kỹ năng giải bài tập từ cơ bản đến mở rộng.`,
        teacherActivity: `* Bài tập 1 (Mức độ Nhận biết & Thông hiểu):\n- Giáo viên nêu yêu cầu: "Bài 1: Thực hiện cá nhân vào bảng con trong 3 phút."\n- Giáo viên quan sát cả lớp, kịp thời hỗ trợ các em học sinh còn lúng túng.\n- Hiệu lệnh giơ bảng, giáo viên nhận xét nhanh và chốt đáp án đúng.\n\n* Bài tập 2 (Mức độ Thực hành & Vận dụng):\n- Giáo viên yêu cầu: "Bài 2: Làm bài vào vở bài tập, sau đó đổi chéo vở kiểm tra bài cho bạn cùng bàn."\n- Mời 2 học sinh lên bảng chữa bài và giải thích chi tiết các bước làm.\n- Giáo viên phân tích lỗi sai điển hình mà học sinh dễ mắc phải và hướng dẫn cách khắc phục.\n\n* Bài tập 3 (Trò chơi tiếp sức / Bài tập mở rộng):\n- Tổ chức trò chơi thi đua tiếp sức giữa các tổ/nhóm.\n- Giáo viên tổng kết điểm thi đua, biểu dương tổ hoàn thành nhanh và chính xác nhất.`,
        studentActivity: `* Bài tập 1: Học sinh đọc kỹ yêu cầu, tự giác làm bài vào bảng con, giơ bảng dứt khoát theo hiệu lệnh của GV. Tự sửa sai nếu có.\n* Bài tập 2: Học sinh làm bài cẩn thận vào vở ghi. Đổi chéo vở cho bạn cùng bàn để kiểm tra, chấm chéo. 2 bạn lên bảng chữa bài và tự tin giải thích cách làm.\n* Bài tập 3: Đại diện các tổ tham gia trò chơi tiếp sức, cả lớp theo dõi và hào hứng cổ vũ.\n* Học sinh lắng nghe cô phân tích các lỗi sai cần tránh và ghi nhớ cách làm chuẩn.`,
        expectedOutcome: '100% học sinh hoàn thành bài 1; ít nhất 85-90% học sinh hoàn thành bài 2, 3 chính xác và trình bày sạch đẹp.',
        assessment: 'Phương pháp: Đánh giá qua sản phẩm vở ghi/bảng con; Công cụ: Đánh giá đồng đẳng & Chấm chữa bài; Tiêu chí: Kết quả chính xác và trình bày rõ ràng.'
      },
      {
        id: 'act4',
        name: 'Hoạt động 4: Vận dụng / Trải nghiệm (5 - 7 phút)',
        duration: '5 phút',
        objective: 'Vận dụng kiến thức, kỹ năng đã học vào giải quyết các tình huống thực tiễn gắn với cuộc sống gia đình và nhà trường; phát triển tư duy sáng tạo.',
        content: `Tình huống thực tế đời sống liên quan đến bài "${effectiveLessonName}": Liên hệ thực tế và dặn dò củng cố.`,
        teacherActivity: `1. Tình huống thực tế đời sống:\n- Giáo viên nêu tình huống gắn liền với đời sống: "Trong thực tế hàng ngày ở nhà hoặc ở trường, khi gặp tình huống tương tự bài học hôm nay, em sẽ xử lý như thế nào? Hãy nêu một ví dụ cụ thể."\n2. Giáo viên lắng nghe, gợi mở và khen ngợi các câu trả lời sáng tạo, có tính ứng dụng cao.\n3. Củng cố & Dặn dò tổng kết:\n- Giáo viên chốt lại các nội dung cốt lõi của bài học hôm nay.\n- Tuyên dương tinh thần học tập tích cực, tự giác của cả lớp.\n- Dặn dò học sinh về nhà ôn lại bài, thực hành chia sẻ cùng người thân và chuẩn bị đồ dùng cho bài học tiếp theo.`,
        studentActivity: `- Học sinh chú ý lắng nghe tình huống, tích cực liên hệ bản thân và cuộc sống xung quanh.\n- 2 - 3 học sinh tự tin giơ tay chia sẻ câu chuyện/ví dụ thực tế của mình trước lớp.\n- Cả lớp lắng nghe, học hỏi kinh nghiệm lẫn nhau.\n- Ghi nhớ lời cô dặn, thu dọn sách vở và đồ dùng học tập ngay ngắn, sạch sẽ.`,
        expectedOutcome: 'Học sinh hiểu được ý nghĩa thực tiễn của bài học, biết cách vận dụng linh hoạt kiến thức vào đời sống hàng ngày.',
        assessment: 'Phương pháp: Vấn đáp; Công cụ: Lời khen ngợi tuyên dương; Tiêu chí: Khả năng liên hệ thực tiễn và tính sáng tạo của học sinh.'
      }
    ];
  }

  return {
    id: 'lp_' + Math.random().toString(36).substring(2, 9),
    subject: effectiveSubject,
    grade: `Lớp ${gradeNum}`,
    unit: effectiveUnit,
    lesson: effectiveLesson,
    period: effectivePeriod,
    activityScope: vnScopeLabel,
    lessonName: effectiveLessonName,
    topic: effectiveTopic,
    duration: params.duration || '2 tiết (70 phút)',
    bookSeries: params.bookSeries || tb?.bookSeries || 'Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)',
    pageRange: effectivePageRange,
    language: 'vi',
    textbookSource: {
      id: tb?.id,
      title: tb?.title || `SGK ${effectiveSubject} ${gradeNum} (${params.bookSeries || 'Kết nối tri thức'})`,
      bookSeries: tb?.bookSeries || 'Kết nối tri thức với cuộc sống',
      pageRange: effectivePageRange,
      keyVocabulary: tb?.keyVocabulary || ['Khái niệm cốt lõi', 'Quy trình thực hành', 'Vận dụng thực tiễn']
    },
    officialReferences: refs,
    objectives: {
      knowledgeAndSkills: [
        `• Năng lực đặc thù (${effectiveSubject}): Học sinh nhận biết, giải thích và vận dụng thành thạo các kiến thức trọng tâm của bài: ${tb?.keyVocabulary?.join(', ') || 'khái niệm, định lý, quy tắc thực hành'}.`,
        `• Kỹ năng thực hành: Biết quan sát trực quan từ SGK, phân tích số liệu/hình ảnh, thực hiện thao tác chuẩn xác và trình bày kết quả rõ ràng, mạch lạc.`,
        `• Liên hệ thực tế: Vận dụng kiến thức bài học để giải quyết các tình huống gắn liền với đời sống hàng ngày của học sinh tiểu học.`
      ],
      coreCompetencies: [
        '• Năng lực tự chủ và tự học: Tự giác chuẩn bị sách giáo khoa, đồ dùng học tập; chủ động quan sát, đọc thông tin và tự thực hiện nhiệm vụ học tập được giao.',
        '• Năng lực giao tiếp và hợp tác: Tích cực thảo luận nhóm, biết lắng nghe ý kiến của bạn, cùng nhau chia sẻ, hoàn thành sản phẩm học tập chung.',
        '• Năng lực giải quyết vấn đề và sáng tạo: Biết đặt câu hỏi thắc mắc, tự tin đề xuất cách giải quyết tình huống học tập mới mẻ.'
      ],
      personalQualities: [
        `• Phẩm chất Đạo đức (Thông tư 32/2018): ${vnSpecificIntegration.ethicsDesc}`,
        '• Chăm chỉ: Tích cực tham gia các hoạt động học tập, kiên trì hoàn thành các bài tập và nhiệm vụ rèn luyện.',
        '• Trách nhiệm: Có ý thức giữ gìn sách vở, đồ dùng học tập của bản thân và của lớp; tôn trọng và hỗ trợ các bạn trong nhóm.',
        '• Trung thực & Nhân ái: Thật thà khi tự đánh giá và đánh giá bạn; biết chia sẻ yêu thương và giúp đỡ mọi người xung quanh.'
      ],
      digitalCompetency: [
        `• ${vnSpecificIntegration.nlsDesc}`
      ],
      aiIntegration: [
        `• ${vnSpecificIntegration.aiDesc}`
      ],
      trafficSafety: [
        `• Giáo dục ATGT (CV 3456): ${vnSpecificIntegration.atgtDesc}`
      ],
      lifeSkills: [
        `• Kỹ năng sống (KNS): ${vnSpecificIntegration.knsDesc}`
      ],
      ethicsAndMoral: [
        `• Phẩm chất Đạo đức (TT 32/2018): ${vnSpecificIntegration.ethicsDesc}`
      ]
    },
    materials: {
      teacher: [
        `Sách giáo khoa, Sách giáo viên môn ${effectiveSubject} lớp ${gradeNum} (${params.bookSeries || 'Bộ sách chuẩn Bộ GD&ĐT'}).`,
        'Giáo án điện tử, bài giảng tương tác trên màn hình Tivi/Máy chiếu.',
        'Học liệu số trích xuất trực tiếp từ kho SGK đã lưu trữ (kênh hình, kênh chữ, bài tập).',
        'Bộ đồ dùng dạy học trực quan, phiếu bài tập in màu, bảng nhóm khổ A0 và bút dạ.'
      ],
      student: [
        `Sách giáo khoa, Vở bài tập môn ${effectiveSubject} lớp ${gradeNum}.`,
        'Bảng con, phấn, bút viết, thước kẻ và bộ que tính/đồ dùng học tập cá nhân.'
      ],
      digitalTools: [
        vnSpecificIntegration.devicesDesc || 'Hệ thống Mini-game tương tác SmartEdu (Vòng quay may mắn, Đố vui chú ong)',
        'Màn hình trình chiếu hình ảnh động minh họa từ SGK số'
      ]
    },
    activities: vnActivitiesList,
    differentiation: {
      needingSupport: [
        'Hỗ trợ phiếu gợi ý các bước giải quyết, cho phép làm việc nhóm đôi với bạn học lực khá hơn.',
        'Giáo viên trực tiếp đến tận nơi gợi ý các thao tác cơ bản, tạo cơ hội cho học sinh hoàn thành từng phần nhỏ.'
      ],
      advanced: [
        'Giao thêm câu hỏi tư duy mở rộng, bài toán nâng cao liên hệ thực tế sáng tạo.',
        'Đảm nhiệm vai trò nhóm trưởng điều phối thảo luận và hỗ trợ hướng dẫn các bạn trong nhóm.'
      ]
    },
    consolidation: 'Củng cố kiến thức trọng tâm của bài học và dặn dò học sinh rèn luyện thêm tại nhà.',
    assessment: {
      methods: [
        'Đánh giá thường xuyên theo Thông tư 27/2020/TT-BGDĐT: Quan sát thái độ, tinh thần tương tác và mức độ tự giác của học sinh.',
        'Đánh giá qua sản phẩm học tập: Vở bài tập, phiếu thực hành nhóm, bảng con và bài trình bày trước lớp.',
        'Đánh giá đồng đẳng & Tự đánh giá: Học sinh tự nhận xét bài làm của mình và bạn theo bảng kiểm tiêu chí đơn giản.'
      ],
      tools: [
        'Bảng kiểm quan sát năng lực (Checklist) theo chuẩn CTGDPT 2018.',
        'Phiếu đánh giá nhận xét thường xuyên theo các mức độ (Hoàn thành tốt, Hoàn thành, Cần cố gắng).',
        'Hệ thống thưởng sao, huy hiệu vinh danh SmartEdu.'
      ],
      rubrics: [
        'Mức 1 (Cần cố gắng): Chưa nắm chắc kiến thức cơ bản, cần giáo viên hướng dẫn nhiều khi làm bài tập SGK.',
        'Mức 2 (Hoàn thành): Trả lời đúng các câu hỏi SGK, làm được bài tập cơ bản, tích cực tham gia hoạt động nhóm.',
        'Mức 3 (Hoàn thành tốt): Nắm chắc kiến thức, giải bài nhanh chính xác, tự tin trình bày và biết vận dụng sáng tạo vào thực tế.'
      ]
    },
    postLessonAdjustments: {
      difficulties: '......................................................................................................................................',
      effectiveActivities: '......................................................................................................................................',
      neededAdjustments: '......................................................................................................................................',
      supportMeasures: '......................................................................................................................................'
    },
    pedagogicalRationale: [
      `1. Căn cứ mục tiêu bài học: Các hoạt động được thiết kế tuần tự từ Khởi động -> Khám phá -> Luyện tập -> Vận dụng nhằm giúp học sinh tiếp thu kiến thức một cách tự nhiên, chủ động và có hệ thống theo đúng tinh thần CV 2345/BGDĐT-GDTH.`,
      `2. Phương pháp dạy học tích cực: Tăng cường hoạt động nhóm, thảo luận cặp đôi và trò chơi học tập giúp phát triển tối đa năng lực giao tiếp, hợp tác và giải quyết vấn đề của học sinh tiểu học.`,
      `3. Đánh giá vì sự tiến bộ: Kết hợp đa dạng hình thức đánh giá (GV đánh giá, HS tự đánh giá, đánh giá đồng đẳng) theo Thông tư 27/2020/TT-BGDĐT, chú trọng động viên và khích lệ kịp thời.`
    ],
    attachedImages: normalizedAttachedImages,
    createdAt: new Date().toISOString(),
    authorName: 'SmartEdu AI Pedagogical Copilot'
  };
}

// =========================================================================
// HỆ THỐNG MỤC PHÂN MÔN & TIẾN TRÌNH THEO TUẦN CHO TẤT CẢ CÁC MÔN TIỂU HỌC
// =========================================================================

export interface SubjectSectionOption {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  defaultPeriod: string;
  suggestedMethods: string[];
}

export interface SubjectCurriculumWeek {
  week: number;
  weekLabel: string;
  theme: string;
  lessonTitle: string;
  periodCount: number;
  sections: string[]; // List of section IDs applicable
  keyKnowledge: string;
  suggestedGame: {
    name: string;
    goal: string;
    materials: string;
    rules: string;
  };
  suggestedMethod: string;
  suggestedScenario: string;
}

export const SUBJECT_SECTIONS_TAXONOMY: Record<string, SubjectSectionOption[]> = {
  'Tiếng Việt': [
    { id: 'tv_doc', name: 'Đọc', icon: '📖', shortDesc: 'Đọc thành tiếng, đọc hiểu & luyện đọc diễn cảm', defaultPeriod: 'Tiết 1 - 2', suggestedMethods: ['Đọc mẫu - Luyện đọc cá nhân/nhóm', 'Đọc hiểu tương tác', 'Đọc phân vai'] },
    { id: 'tv_noi_nghe', name: 'Nói và nghe', icon: '🗣️', shortDesc: 'Kể chuyện theo tranh, trao đổi ý kiến, chia sẻ chủ đề', defaultPeriod: 'Tiết 1', suggestedMethods: ['Kể chuyện sáng tạo', 'Phỏng vấn nhóm đôi', 'Hỏi đáp chia sẻ'] },
    { id: 'tv_viet', name: 'Viết', icon: '✍️', shortDesc: 'Chính tả, Tập viết, Viết đoạn văn / Bài văn hoàn chỉnh', defaultPeriod: 'Tiết 1', suggestedMethods: ['Phân tích bài mẫu', 'Viết có giàn ý gợi mở', 'Chấm chữa chéo đồng đẳng'] },
    { id: 'tv_luyen_tap', name: 'Luyện tập (Từ & Câu)', icon: '🔤', shortDesc: 'Mở rộng vốn từ, dấu câu, biện pháp tu từ', defaultPeriod: 'Tiết 1', suggestedMethods: ['Trò chơi ngôn ngữ', 'Thực hành bài tập SGK', 'Ghép thẻ từ ngữ'] },
    { id: 'tv_doc_mo_rong', name: 'Đọc mở rộng', icon: '📚', shortDesc: 'Đọc sách báo theo chủ điểm, ghi chép nhật ký đọc', defaultPeriod: 'Tiết 1', suggestedMethods: ['Góc đọc sách', 'Chia sẻ phiếu đọc sách', 'Giới thiệu cuốn sách em yêu'] },
    { id: 'tv_sang_tao', name: 'Góc sáng tạo / Tự đánh giá', icon: '🎨', shortDesc: 'Trình bày sản phẩm, viết thiệp, vẽ tranh, tự đánh giá', defaultPeriod: 'Tiết 1', suggestedMethods: ['Dự án trải nghiệm', 'Trưng bày triển lãm tranh chữ', 'Bảng tự kiểm'] }
  ],
  'Toán': [
    { id: 'toan_kham_pha', name: 'Khám phá kiến thức mới', icon: '💡', shortDesc: 'Quan sát trực quan, hình thành khái niệm, công thức mới', defaultPeriod: 'Tiết 1', suggestedMethods: ['Trực quan hóa đồ dùng', 'Nêu và giải quyết vấn đề', 'Quy nạp từ ví dụ thực tế'] },
    { id: 'toan_luyen_tap', name: 'Hoạt động / Luyện tập', icon: '✏️', shortDesc: 'Thực hành các bài tập tính toán và giải toán SGK', defaultPeriod: 'Tiết 1', suggestedMethods: ['Luyện tập cá nhân vào vở', 'Chia sẻ cặp đôi', 'Chữa bài trên bảng con'] },
    { id: 'toan_tro_choi', name: 'Trò chơi toán học & Thực hành', icon: '🎲', shortDesc: 'Đố vui toán học, tiếp sức, giải mã ô số', defaultPeriod: 'Tiết 1', suggestedMethods: ['Trò chơi tiếp sức', 'Rung chuông vàng', 'Ong tìm mật'] },
    { id: 'toan_van_dung', name: 'Vận dụng giải toán thực tế', icon: '🚀', shortDesc: 'Xử lý tình huống mua sắm, đo lường, biểu đồ đời sống', defaultPeriod: 'Tiết 1', suggestedMethods: ['Tình huống đời thực', 'Dự án mua sắm mini', 'Đóng vai cửa hàng'] }
  ],
  'Tự nhiên và Xã hội': [
    { id: 'tnxh_kham_pha', name: 'Khám phá qua quan sát & Tranh ảnh', icon: '🔍', shortDesc: 'Tìm hiểu thế giới tự nhiên và cộng đồng xã hội xung quanh', defaultPeriod: 'Tiết 1', suggestedMethods: ['Quan sát tranh ảnh SGK', 'Thảo luận nhóm 4', 'Động não'] },
    { id: 'tnxh_thuc_hanh', name: 'Thực hành & Điều tra trải nghiệm', icon: '🧪', shortDesc: 'Thu thập mẫu vật, quan sát thói quen, vệ sinh môi trường', defaultPeriod: 'Tiết 1', suggestedMethods: ['Điều tra nhỏ', 'Lập phiếu theo dõi', 'Thực hành thao tác mẫu'] },
    { id: 'tnxh_tinh_huong', name: 'Xử lý tình huống & Thảo luận', icon: '🎭', shortDesc: 'Ứng phó an toàn, phòng chống tai nạn thương tích', defaultPeriod: 'Tiết 1', suggestedMethods: ['Đóng vai xử lý tình huống', 'Khăn trải bàn', 'Phân tích hành vi đúng/sai'] },
    { id: 'tnxh_van_dung', name: 'Vận dụng đời sống & Tự chăm sóc', icon: '🌱', shortDesc: 'Thực hiện thói quen tốt giữ vệ sinh và bảo vệ môi trường', defaultPeriod: 'Tiết 1', suggestedMethods: ['Cam kết hành động', 'Sổ tay sức khỏe nhỏ', 'Thông điệp xanh'] }
  ],
  'Khoa học': [
    { id: 'kh_kham_pha', name: 'Khám phá hiện tượng khoa học', icon: '🔬', shortDesc: 'Quan sát tranh ảnh, video và đặt câu hỏi thắc mắc ban đầu', defaultPeriod: 'Tiết 1', suggestedMethods: ['Quan sát trực quan', 'Kỹ thuật KWL', 'Đưa ra dự đoán'] },
    { id: 'kh_thi_nghiem', name: 'Thực hành thí nghiệm (5E / Bàn tay nặn bột)', icon: '⚗️', shortDesc: 'Nêu giả thuyết, tiến hành thí nghiệm kiểm chứng, rút ra kết luận', defaultPeriod: 'Tiết 1', suggestedMethods: ['Bàn tay nặn bột', 'Mô hình 5E', 'Thực hành thí nghiệm nhóm'] },
    { id: 'kh_tinh_huong', name: 'Xử lý tình huống khoa học & Môi trường', icon: '🌍', shortDesc: 'Giải thích hiện tượng đời sống, bảo vệ nguồn nước và năng lượng', defaultPeriod: 'Tiết 1', suggestedMethods: ['Đóng vai chuyên gia nhí', 'Nêu giải pháp bảo vệ', 'Thảo luận góc'] },
    { id: 'kh_stem', name: 'Dự án STEM & Vận dụng đời sống', icon: '🛠️', shortDesc: 'Chế tạo mô hình lọc nước, bình tưới tự động, chuông điện...', defaultPeriod: 'Tiết 1', suggestedMethods: ['Quy trình thiết kế kỹ thuật', 'Thực hành STEM', 'Báo cáo sản phẩm'] }
  ],
  'Lịch sử và Địa lý': [
    { id: 'lsdl_tu_lieu', name: 'Khám phá tư liệu & Lược đồ địa lý', icon: '🗺️', shortDesc: 'Đọc bản đồ, lược đồ, phân tích tư liệu và hiện vật lịch sử', defaultPeriod: 'Tiết 1', suggestedMethods: ['Đọc bản đồ/lược đồ', 'Khai thác tranh ảnh tư liệu', 'Đọc hiểu văn bản lịch sử'] },
    { id: 'lsdl_nhan_vat', name: 'Tìm hiểu nhân vật, sự kiện & Vùng miền', icon: '🏛️', shortDesc: 'Chiến công anh hùng dân tộc, nét văn hóa vùng miền', defaultPeriod: 'Tiết 1', suggestedMethods: ['Kể chuyện lịch sử', 'Du lịch qua màn ảnh nhỏ', 'Sơ đồ tư duy'] },
    { id: 'lsdl_dong_vai', name: 'Đóng vai & Tái hiện sự kiện', icon: '🎬', shortDesc: 'Tái hiện hoạt cảnh lịch sử, thảo luận ứng xử nhân vật', defaultPeriod: 'Tiết 1', suggestedMethods: ['Đóng vai nhân vật', 'Diễn đàn lịch sử', 'Thuyết minh viên nhí'] },
    { id: 'lsdl_que_huong', name: 'Vận dụng & Tự hào quê hương đất nước', icon: '🇻🇳', shortDesc: 'Giới thiệu di tích địa phương, ý thức bảo vệ chủ quyền biển đảo', defaultPeriod: 'Tiết 1', suggestedMethods: ['Làm tập san quê hương', 'Thuyết trình giới thiệu di sản', 'Hành động bảo vệ di tích'] }
  ],
  'Hoạt động trải nghiệm': [
    { id: 'hdtn_chao_co', name: 'Sinh hoạt dưới cờ', icon: '🚩', shortDesc: 'Tham gia nghi lễ chào cờ, nghe phát động theo chủ đề toàn trường', defaultPeriod: 'Tiết 1', suggestedMethods: ['Nghe nói chuyện chuyên đề', 'Giao lưu câu hỏi nhanh', 'Biểu diễn văn nghệ chủ đề'] },
    { id: 'hdtn_chu_de', name: 'Hoạt động giáo dục theo chủ đề', icon: '🎯', shortDesc: 'Khám phá bản thân, rèn luyện kỹ năng sống, hợp tác nhóm', defaultPeriod: 'Tiết 2', suggestedMethods: ['Trải nghiệm thực tế', 'Thảo luận và đóng vai', 'Trò chơi rèn kỹ năng'] },
    { id: 'hdtn_sinh_hoat_lop', name: 'Sinh hoạt lớp', icon: '🏫', shortDesc: 'Sơ kết tuần, bình bầu khen thưởng, xây dựng kế hoạch tuần mới', defaultPeriod: 'Tiết 3', suggestedMethods: ['Đánh giá tuần', 'Tuyên dương bạn tốt', 'Kế hoạch hành động nhóm'] }
  ],
  'Tiếng Anh': [
    { id: 'en_act_123', name: 'Hoạt động 1, 2, 3 (Tiết 1)', icon: '1️⃣', shortDesc: 'Look, listen & repeat; Listen, point & say; Let\'s talk', defaultPeriod: 'Tiết 1', suggestedMethods: ['Presentation - Controlled Practice - Guided Practice', 'TPR & Chanting', 'Pair work dialogue'] },
    { id: 'en_act_456', name: 'Hoạt động 4, 5, 6 (Tiết 2)', icon: '2️⃣', shortDesc: 'Listen & tick/circle; Look, complete & read; Let\'s play/Project', defaultPeriod: 'Tiết 2', suggestedMethods: ['Pre-listening to While-listening', 'Reading/Writing practice', 'Interactive classroom game / Project'] },
    { id: 'en_full_16', name: 'Trọn vẹn: Hoạt động 1 - 6 (2 tiết)', icon: '⭐', shortDesc: 'Toàn bộ 6 hoạt động theo tiến trình SGK hoàn chỉnh', defaultPeriod: '2 tiết (70 phút)', suggestedMethods: ['Quy trình 4 giai đoạn chuẩn (Warm-up, Exploration, Practice, Production)', 'Tích hợp đầy đủ 4 kỹ năng'] },
    { id: 'en_custom', name: 'Tùy chọn hoạt động', icon: '⚙️', shortDesc: 'Giáo viên tự chọn các hoạt động cụ thể cần soạn', defaultPeriod: 'Linh hoạt', suggestedMethods: ['Soạn theo yêu cầu riêng của giáo viên'] }
  ]
};

// =========================================================================
// KHO TRÒ CHƠI HỌC TẬP SƯ PHẠM CHI TIẾT DÀNH CHO CÁC MÔN
// =========================================================================

export interface ClassroomGame {
  id: string;
  name: string;
  subject: string;
  goal: string;
  materials: string;
  preparation: string;
  stepByStepRules: string[];
  scoringAndReward: string;
}

export const CLASSROOM_GAMES_DATABASE: ClassroomGame[] = [
  {
    id: 'game_ai_nhanh_dung',
    name: 'Ai nhanh ai đúng (Who is Faster and Correct)',
    subject: 'Tất cả các môn',
    goal: 'Kích hoạt phản xạ nhanh, củng cố từ vựng/phép tính/khái niệm mới, phát huy tinh thần đồng đội.',
    materials: 'Bảng con, bút dạ / thẻ chữ, thẻ số hoặc chuông bấm cho các nhóm.',
    preparation: 'Giáo viên chuẩn bị 4 - 6 câu hỏi ngắn hoặc phép tính trọng tâm của bài.',
    stepByStepRules: [
      'Bước 1: Giáo viên chia lớp thành 4 đội (hoặc các nhóm bàn) và phổ biến thể lệ thi đấu.',
      'Bước 2: Giáo viên đọc to câu hỏi/phép tính (hoặc chiếu trên màn hình TV), các đội có 5-10 giây suy nghĩ.',
      'Bước 3: Khi có hiệu lệnh "Hết giờ - Bấm chuông / Giơ bảng!", đại diện đội bấm chuông hoặc cả đội đồng loạt giơ cao bảng con.',
      'Bước 4: Đội giơ bảng nhanh và chính xác nhất đọc to câu trả lời và giải thích ngắn gọn.',
      'Bước 5: Giáo viên cùng cả lớp nhận xét, chuẩn hóa kiến thức và ghi điểm cho các đội.'
    ],
    scoringAndReward: 'Mỗi câu đúng được cộng 10 điểm (hoặc 1 ngôi sao). Đội về nhất nhận tràng pháo tay siêu nhân và cờ thi đua của lớp.'
  },
  {
    id: 'game_rung_chuong_vang',
    name: 'Rung chuông vàng nhí (Golden Bell Challenge)',
    subject: 'Toán, Tiếng Việt, Khoa học, TNXH, Tiếng Anh',
    goal: 'Kiểm tra, đánh giá nhanh mức độ tiếp thu bài của 100% học sinh trong lớp một cách hào hứng.',
    materials: 'Bảng con, phấn/bút dạ, khăn lau của từng học sinh.',
    preparation: 'Hệ thống câu hỏi trắc nghiệm hoặc điền khuyết gồm 5 - 8 câu từ mức độ nhận biết đến vận dụng.',
    stepByStepRules: [
      'Bước 1: Tất cả học sinh ngồi ngay ngắn tại vị trí, chuẩn bị sẵn bảng con và bút.',
      'Bước 2: Giáo viên đọc câu hỏi và đưa ra thời gian suy nghĩ 10 giây (kèm đồng hồ đếm ngược sinh động).',
      'Bước 3: Học sinh tự ghi đáp án (A, B, C, D hoặc kết quả số/từ ngữ) vào bảng con.',
      'Bước 4: Hiệu lệnh "Giơ bảng!" vang lên, tất cả đồng loạt đưa bảng lên ngang ngực.',
      'Bước 5: Giáo viên công bố đáp án chuẩn, giải thích câu khó. Các bạn có đáp án đúng tiếp tục tham gia chặng tiếp theo.'
    ],
    scoringAndReward: 'Những học sinh trả lời đúng tất cả các câu hỏi được phong danh hiệu "Nhà thông thái nhí" và nhận sticker khen thưởng.'
  },
  {
    id: 'game_ong_tim_mat',
    name: 'Ong tìm mật (Bee Seeking Honey)',
    subject: 'Tiếng Việt, Tiếng Anh, Toán',
    goal: 'Rèn kỹ năng ghép nối từ ngữ với hình ảnh, phép tính với kết quả, từ đồng nghĩa/trái nghĩa.',
    materials: 'Bộ thẻ hình chú ong (mang câu hỏi/phép tính/từ ngữ) và các bông hoa (mang câu trả lời/kết quả/nghĩa của từ).',
    preparation: 'Dán các bông hoa rải rác trên bảng lớp hoặc góc học tập.',
    stepByStepRules: [
      'Bước 1: Giáo viên phát cho 4 - 6 học sinh mỗi bạn một thẻ chú ong.',
      'Bước 2: Cả lớp cùng hát vang bài hát theo nhịp vỗ tay (ví dụ: "Chị ong nâu nâu").',
      'Bước 3: Các bạn mang thẻ ong di chuyển nhanh lên bảng để tìm đúng bông hoa chứa đáp án tương ứng của mình.',
      'Bước 4: Khi ghép đúng, học sinh đọc to cặp ghép (ví dụ: "3 x 4 = 12" hoặc "Chăm chỉ - Siêng năng").',
      'Bước 5: Cả lớp làm giám khảo đồng thanh hô "Đúng rồi!" hoặc hướng dẫn bạn chỉnh sửa.'
    ],
    scoringAndReward: 'Bạn ong tìm đúng mật trong thời gian bài hát nhận được 1 bông hoa điểm tốt vào sổ tay học tập.'
  },
  {
    id: 'game_tiep_suc_dong_doi',
    name: 'Tiếp sức đồng đội (Relay Race Board Game)',
    subject: 'Tất cả các môn',
    goal: 'Củng cố kỹ năng phân loại, giải bài tập liên hoàn, rèn luyện sự nhanh nhẹn và tinh thần hợp tác.',
    materials: 'Bảng phụ chia thành 2 - 3 cột tương ứng các đội, bút lông viết bảng.',
    preparation: 'Kẻ sẵn bảng phân loại (ví dụ: Từ chỉ sự vật / Từ chỉ hoạt động; Số chẵn / Số lẻ; Động vật đẻ con / Động vật đẻ trứng).',
    stepByStepRules: [
      'Bước 1: Giáo viên chọn 2 - 3 đội chơi, mỗi đội gồm 5 học sinh đứng thành hàng dọc.',
      'Bước 2: Khi có hiệu lệnh "Bắt đầu!", bạn số 1 chạy lên bảng viết 1 đáp án vào cột của đội mình, sau đó nhanh chóng chạy về trao bút cho bạn số 2.',
      'Bước 3: Bạn số 2 tiếp tục chạy lên viết đáp án thứ hai (không được trùng lặp với bạn trước), lần lượt cho đến bạn cuối cùng.',
      'Bước 4: Thành viên sau có quyền sửa đáp án cho thành viên trước nếu phát hiện sai sót.',
      'Bước 5: Đội hoàn thành trước hô to khẩu hiệu của đội và dừng bút.'
    ],
    scoringAndReward: 'Mỗi đáp án đúng được 1 điểm. Đội có nhiều đáp án chính xác nhất và nhanh nhất giành chiến thắng toàn đoàn.'
  },
  {
    id: 'game_chiec_hop_bi_mat',
    name: 'Chiếc hộp bí mật / Thử tài đoán vật (Mystery Sensory Box)',
    subject: 'Khoa học, TNXH, Tiếng Việt, Tiếng Anh',
    goal: 'Phát triển giác quan quan sát, xúc giác, kỹ năng miêu tả đặc điểm sự vật và phán đoán khoa học.',
    materials: 'Một chiếc hộp kín có khoét lỗ tròn vừa tay luồn vào, bên trong chứa mẫu vật thật (lá cây, quả, đồ vật, cục đá, khối gỗ...).',
    preparation: 'Giáo viên bí mật đặt đồ vật vào hộp trước tiết học.',
    stepByStepRules: [
      'Bước 1: Giáo viên mời 1 học sinh lên bảng, bịt mắt hoặc chỉ dùng tay chạm vào vật trong hộp bí mật.',
      'Bước 2: Học sinh dùng tay sờ và miêu tả cảm giác cho cả lớp nghe (ví dụ: "Vật này bề mặt nhám, hình tròn, cứng, mát...").',
      'Bước 3: Học sinh dưới lớp giơ tay đặt câu hỏi gợi mở "Có phải nó làm bằng kim loại không?", bạn trên bảng trả lời Có/Không.',
      'Bước 4: Học sinh dưới lớp đoán tên đồ vật. Giáo viên mở nắp hộp công bố vật thật.',
      'Bước 5: Giáo viên dẫn dắt vào bài học mới một cách tự nhiên và hào hứng.'
    ],
    scoringAndReward: 'Học sinh miêu tả khéo léo và bạn đoán đúng tên đồ vật đều nhận được một tràng pháo tay cổ vũ nồng nhiệt.'
  },
  {
    id: 'game_hai_hoa_dan_chu',
    name: 'Hái hoa dân chủ / Cây tri thức (Knowledge Tree)',
    subject: 'Tất cả các môn',
    goal: 'Củng cố kiến thức cuối bài hoặc ôn tập, rèn luyện sự tự tin khi nói và trả lời câu hỏi trước tập thể.',
    materials: 'Cây hoa mô hình hoặc bảng gắn các bông hoa nhiều màu sắc, mặt sau chứa câu hỏi hoặc thử thách.',
    preparation: 'Soạn 6 - 8 câu hỏi tình huống hoặc thử thách vui liên quan đến bài học.',
    stepByStepRules: [
      'Bước 1: Giáo viên giới thiệu Cây tri thức với các bông hoa mang thông điệp bí ẩn.',
      'Bước 2: Giáo viên dùng hình thức bắt thăm hoặc vòng quay may mắn để chọn học sinh lên hái hoa.',
      'Bước 3: Học sinh lên hái một bông hoa mình yêu thích, đọc to câu hỏi cho cả lớp cùng nghe.',
      'Bước 4: Học sinh có 10 giây suy nghĩ và trình bày câu trả lời của mình.',
      'Bước 5: Các bạn trong lớp lắng nghe, giơ thẻ mặt cười nếu đồng ý hoặc bổ sung ý kiến.'
    ],
    scoringAndReward: 'Mỗi câu trả lời hoàn hảo nhận được chính bông hoa đã hái có ghi lời khen tặng của cô giáo.'
  }
];

// =========================================================================
// KHO PHƯƠNG PHÁP DẠY HỌC & TÌNH HUỐNG SƯ PHẠM ĐẶC THÙ
// =========================================================================

export interface PedagogicalMethod {
  id: string;
  name: string;
  applicableSubjects: string[];
  phases: string[];
  tipsForPrimary: string;
}

export const PEDAGOGICAL_METHODS_DATABASE: PedagogicalMethod[] = [
  {
    id: 'method_ban_tay_nan_bot',
    name: 'Phương pháp Bàn tay nặn bột (Inquiry-based Learning)',
    applicableSubjects: ['Khoa học', 'Tự nhiên và Xã hội'],
    phases: [
      'Pha 1: Tình huống xuất phát và câu hỏi nêu vấn đề (Đặt câu hỏi kích thích tò mò về hiện tượng tự nhiên).',
      'Pha 2: Bộc lộ biểu tượng ban đầu của học sinh (Học sinh vẽ/viết suy nghĩ ban đầu ra vở thí nghiệm).',
      'Pha 3: Đề xuất câu hỏi nghiên cứu và phương án tìm tòi (Học sinh thảo luận cách kiểm chứng: làm thí nghiệm, quan sát mẫu vật, tra cứu tài liệu).',
      'Pha 4: Tiến hành thực nghiệm tìm tòi - nghiên cứu (Học sinh làm thí nghiệm theo nhóm dưới sự giám sát của GV).',
      'Pha 5: Kết luận và hợp thức hóa kiến thức (Đối chiếu kết quả với biểu tượng ban đầu, GV chuẩn hóa khoa học).'
    ],
    tipsForPrimary: 'Tuyệt đối không đưa ngay câu trả lời cho học sinh; để học sinh tự làm thí nghiệm và rút ra kết luận bằng ngôn ngữ của chính mình.'
  },
  {
    id: 'method_5e',
    name: 'Mô hình Dạy học 5E (Engage - Explore - Explain - Elaborate - Evaluate)',
    applicableSubjects: ['Khoa học', 'Toán', 'Tự nhiên và Xã hội', 'Tiếng Anh'],
    phases: [
      'Engage (Gắn kết): Khơi gợi hứng thú bằng câu đố, video ngắn hoặc tình huống bất ngờ.',
      'Explore (Khám phá): Học sinh thao tác với đồ dùng, tranh ảnh, dữ liệu để tự khám phá quy tắc.',
      'Explain (Giải thích): Học sinh giải thích hiện tượng theo cách hiểu của mình; GV chuẩn hóa thuật ngữ.',
      'Elaborate (Áp dụng/Củng cố): Vận dụng quy tắc vào tình huống mới hoặc thực hiện dự án nhỏ.',
      'Evaluate (Đánh giá): Đánh giá thường xuyên quá trình học tập và sản phẩm học sinh.'
    ],
    tipsForPrimary: 'Thiết kế các hoạt động chuyển tiếp mượt mà, dùng câu hỏi gợi mở dạng mở thay vì câu hỏi đóng Có/Không.'
  },
  {
    id: 'method_dong_vai_tinh_huong',
    name: 'Phương pháp Đóng vai & Xử lý tình huống (Role-Playing & Situational Learning)',
    applicableSubjects: ['Tiếng Việt', 'Đạo đức', 'Tự nhiên và Xã hội', 'Hoạt động trải nghiệm', 'Lịch sử và Địa lý'],
    phases: [
      'Pha 1: Giới thiệu tình huống thực tế gắn liền với đời sống (ví dụ: bị lạc trong siêu thị, bạn làm hỏng đồ chơi của mình...).',
      'Pha 2: Phân công vai diễn trong nhóm và chuẩn bị kịch bản ngắn (3-5 phút).',
      'Pha 3: Các nhóm lên sân khấu hóa / đóng vai thể hiện cách xử lý tình huống.',
      'Pha 4: Cả lớp cùng phân tích: Cách ứng xử nào phù hợp? Vì sao? Có cách nào khác hay hơn không?',
      'Pha 5: Rút ra bài học hành vi chuẩn mực và quy tắc ứng xử văn minh.'
    ],
    tipsForPrimary: 'Khuyến khích học sinh tự do biểu cảm ngôn ngữ cơ thể, không gò bó học thuộc lòng từng câu thoại.'
  },
  {
    id: 'method_truc_quan_thao_tac',
    name: 'Phương pháp Trực quan & Thao tác trên đồ dùng học tập',
    applicableSubjects: ['Toán', 'Tiếng Việt', 'Khoa học'],
    phases: [
      'Pha 1: Quan sát vật thật, mô hình hoặc tranh ảnh mẫu.',
      'Pha 2: Học sinh tự tay thao tác trên bộ đồ dùng học tập cá nhân (que tính, khối lập phương, thẻ từ...).',
      'Pha 3: Trình bày kết quả thao tác và chia sẻ quy trình thực hiện với bạn bên cạnh.',
      'Pha 4: Giáo viên khái quát hóa từ thao tác cụ thể sang biểu tượng trừu tượng (công thức, quy tắc).'
    ],
    tipsForPrimary: 'Đảm bảo 100% học sinh có đồ dùng để thao tác; dành thời gian đủ cho học sinh chậm làm quen.'
  }
];

// =========================================================================
// CHƯƠNG TRÌNH CHI TIẾT 35 TUẦN THEO TỪNG MÔN VÀ KHỐI LỚP (GDPT 2018)
// =========================================================================

export const PRIMARY_SUBJECTS_CURRICULUM: Record<string, Record<string, SubjectCurriculumWeek[]>> = {
  'Tiếng Việt': {
    'Lớp 1': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Em là học sinh', lessonTitle: 'Bài 1: A a - B b (Làm quen âm chữ)', periodCount: 10, sections: ['tv_doc', 'tv_noi_nghe', 'tv_viet', 'tv_luyen_tap'], keyKnowledge: 'Nhận biết chữ a, b; đọc đúng tiếng ba, bà; tư thế ngồi viết đúng chuẩn', suggestedGame: { name: 'Ai nhanh ai đúng', goal: 'Nhận diện chữ cái a, b', materials: 'Thẻ chữ cái a, b', rules: 'GV phát âm, HS tìm và giơ nhanh thẻ chữ tương ứng' }, suggestedMethod: 'Trực quan - Đọc mẫu - Thao tác ghép chữ', suggestedScenario: 'Ngày đầu tiên bé đến trường, tự giới thiệu tên mình với cô giáo và các bạn.' },
      { week: 2, weekLabel: 'Tuần 2', theme: 'Em là học sinh', lessonTitle: 'Bài 2: C c - O o (Luyện đọc và ghép vần)', periodCount: 10, sections: ['tv_doc', 'tv_noi_nghe', 'tv_viet', 'tv_luyen_tap'], keyKnowledge: 'Đọc đúng c, o; ghép tiếng ca, cô, cờ; viết đúng chữ c, o', suggestedGame: { name: 'Ong tìm mật', goal: 'Ghép âm đầu và dấu thanh', materials: 'Thẻ hoa mang chữ o, thẻ ong mang chữ c', rules: 'HS mang thẻ ong ghép với bông hoa tạo thành tiếng có nghĩa' }, suggestedMethod: 'Ghép chữ thao tác bộ chữ học vần', suggestedScenario: 'Cùng mẹ chuẩn bị đồ dùng học tập cho năm học mới.' },
      { week: 3, weekLabel: 'Tuần 3', theme: 'Trường học của em', lessonTitle: 'Bài 3: E e - Ê ê (Âm chữ và thanh điệu)', periodCount: 10, sections: ['tv_doc', 'tv_noi_nghe', 'tv_viet', 'tv_luyen_tap'], keyKnowledge: 'Phân biệt e, ê; dấu sắc, huyền; đọc câu ngắn', suggestedGame: { name: 'Tiếp sức đồng đội', goal: 'Phân loại âm e và ê', materials: 'Bảng phụ 2 cột', rules: 'Từng bạn chạy lên gắn thẻ từ có âm e hoặc ê vào đúng cột' }, suggestedMethod: 'Phân tích âm vần trực quan', suggestedScenario: 'Giờ ra chơi cùng bạn chơi nhảy dây dưới sân trường.' },
      { week: 18, weekLabel: 'Tuần 18', theme: 'Ôn tập học kì 1', lessonTitle: 'Ôn tập và Đánh giá cuối học kì 1', periodCount: 10, sections: ['tv_doc', 'tv_viet', 'tv_luyen_tap', 'tv_sang_tao'], keyKnowledge: 'Hệ thống hóa toàn bộ các vần đã học trong học kì 1, đọc trơn bài văn ngắn 40-50 từ', suggestedGame: { name: 'Rung chuông vàng nhí', goal: 'Kiểm tra đọc hiểu từ ngữ', materials: 'Bảng con', rules: 'Học sinh viết đáp án trắc nghiệm đọc hiểu vào bảng con' }, suggestedMethod: 'Ôn tập tích cực qua sơ đồ vần', suggestedScenario: 'Bé kể cho ông bà nghe những bài thơ hay đã học được ở trường.' },
      { week: 19, weekLabel: 'Tuần 19', theme: 'Mái ấm gia đình', lessonTitle: 'Bài đọc: Ngôi nhà ấm áp của em', periodCount: 10, sections: ['tv_doc', 'tv_noi_nghe', 'tv_viet', 'tv_doc_mo_rong'], keyKnowledge: 'Luyện đọc trơn đoạn văn có vần phức, hiểu tình cảm gia đình', suggestedGame: { name: 'Hái hoa dân chủ', goal: 'Trả lời câu hỏi đọc hiểu', materials: 'Cây hoa tri thức', rules: 'Hái bông hoa và đọc câu hỏi, nêu việc làm giúp đỡ bố mẹ' }, suggestedMethod: 'Đọc hiểu tương tác và liên hệ thực tế', suggestedScenario: 'Bé giúp mẹ quét nhà và nhặt rau sau giờ học.' },
      { week: 35, weekLabel: 'Tuần 35', theme: 'Ôn tập cuối năm', lessonTitle: 'Tổng kết và Ôn tập cuối năm học Lớp 1', periodCount: 10, sections: ['tv_doc', 'tv_viet', 'tv_noi_nghe', 'tv_sang_tao'], keyKnowledge: 'Đọc lưu loát bài văn 60-80 chữ, viết đúng chính tả đoạn văn ngắn, tự tin giao tiếp', suggestedGame: { name: 'Cây tri thức', goal: 'Đánh giá tổng kết năm học', materials: 'Cây điều ước và thiệp hoa', rules: 'Học sinh viết một câu cảm ơn thầy cô và dán lên cây tri thức' }, suggestedMethod: 'Trải nghiệm sáng tạo và tự đánh giá', suggestedScenario: 'Buổi lễ bế giảng năm học đầu tiên đầy ắp kỷ niệm đẹp.' }
    ],
    'Lớp 2': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Em đã lớn hơn', lessonTitle: 'Bài 1: Tôi là học sinh lớp 2 (Đọc & Nói nghe)', periodCount: 10, sections: ['tv_doc', 'tv_noi_nghe', 'tv_viet', 'tv_luyen_tap'], keyKnowledge: 'Đọc đúng và diễn cảm bài văn tự sự; từ chỉ sự vật; viết đoạn tự giới thiệu bản thân', suggestedGame: { name: 'Phỏng vấn nhanh', goal: 'Rèn kỹ năng nói và lắng nghe', materials: 'Microphone đồ chơi', rules: 'Học sinh đóng vai phóng viên phỏng vấn bạn về cảm xúc lên lớp 2' }, suggestedMethod: 'Dạy học giao tiếp và hợp tác nhóm đôi', suggestedScenario: 'Học sinh làm quen với bạn mới ngồi cùng bàn và chia sẻ mục tiêu học tập.' },
      { week: 2, weekLabel: 'Tuần 2', theme: 'Em đã lớn hơn', lessonTitle: 'Bài 2: Thời khóa biểu của em (Đọc hiểu & Luyện từ và câu)', periodCount: 10, sections: ['tv_doc', 'tv_luyen_tap', 'tv_viet', 'tv_doc_mo_rong'], keyKnowledge: 'Đọc hiểu bảng thời khóa biểu; từ chỉ hoạt động; sắp xếp công việc khoa học', suggestedGame: { name: 'Ai nhanh ai đúng', goal: 'Tra cứu thông tin trên thời khóa biểu', materials: 'Bảng thời khóa biểu mẫu', rules: 'GV nêu môn học, HS tìm nhanh thứ và tiết học tương ứng' }, suggestedMethod: 'Thực hành khai thác văn bản thông tin', suggestedScenario: 'Bạn Nam tự sắp xếp góc học tập và soạn sách vở theo thời khóa biểu mỗi tối.' },
      { week: 18, weekLabel: 'Tuần 18', theme: 'Ôn tập học kì 1', lessonTitle: 'Ôn tập và Đánh giá định kỳ cuối học kì 1', periodCount: 10, sections: ['tv_doc', 'tv_viet', 'tv_luyen_tap', 'tv_sang_tao'], keyKnowledge: 'Hệ thống hóa từ chỉ sự vật, hoạt động, đặc điểm; câu kiểu Ai là gì? Ai làm gì? Ai thế nào?', suggestedGame: { name: 'Rung chuông vàng', goal: 'Đánh giá kiến thức ngữ pháp kì 1', materials: 'Bảng con', rules: 'Viết kiểu câu phù hợp với tình huống cho trước vào bảng con' }, suggestedMethod: 'Hệ thống hóa kiến thức bằng sơ đồ tư duy', suggestedScenario: 'Tham gia hội chợ sách thiếu nhi tại trường tiểu học.' },
      { week: 35, weekLabel: 'Tuần 35', theme: 'Ôn tập cuối năm', lessonTitle: 'Ôn tập và Đánh giá tổng hợp cuối năm học', periodCount: 10, sections: ['tv_doc', 'tv_viet', 'tv_noi_nghe', 'tv_sang_tao'], keyKnowledge: 'Đọc hiểu truyện kể, viết đoạn văn kể về một việc tốt đã làm, sử dụng đúng dấu câu', suggestedGame: { name: 'Góc sáng tạo triển lãm', goal: 'Trưng bày bài viết đẹp', materials: 'Tranh ảnh và bài viết', rules: 'Học sinh dán bài văn của mình lên góc lớp và đi bình chọn bài hay nhất' }, suggestedMethod: 'Triển lãm tranh chữ và đánh giá đồng đẳng', suggestedScenario: 'Kể lại một hành động đẹp em đã giúp đỡ cụ già qua đường.' }
    ],
    'Lớp 3': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Mái trường mến yêu', lessonTitle: 'Bài 1: Chiếc nhãn vở đặc biệt (Đọc, Viết, Luyện từ và câu)', periodCount: 7, sections: ['tv_doc', 'tv_viet', 'tv_luyen_tap', 'tv_noi_nghe'], keyKnowledge: 'Đọc diễn cảm bài đọc; so sánh sự vật; viết đoạn văn nêu tình cảm với trường lớp', suggestedGame: { name: 'Tiếp sức tìm hình ảnh so sánh', goal: 'Tìm từ so sánh (như, là, giống)', materials: 'Bảng phụ', rules: 'Các đội chạy tiếp sức viết câu có hình ảnh so sánh sinh động' }, suggestedMethod: 'Phân tích nghệ thuật so sánh qua ngữ cảnh', suggestedScenario: 'Tự tay viết chiếc nhãn vở xinh xắn dán lên quyển sách Tiếng Việt mới.' },
      { week: 18, weekLabel: 'Tuần 18', theme: 'Ôn tập học kì 1', lessonTitle: 'Ôn tập cuối học kì 1 - Đọc hiểu & Viết văn miêu tả/kể chuyện', periodCount: 7, sections: ['tv_doc', 'tv_viet', 'tv_luyen_tap', 'tv_doc_mo_rong'], keyKnowledge: 'Tổng kết phép so sánh, nhân hóa; viết đoạn văn thuật lại một hoạt động', suggestedGame: { name: 'Thử tài đoán vật (Nhân hóa)', goal: 'Nhận diện biện pháp nhân hóa', materials: 'Hộp bí mật', rules: 'Học sinh nghe câu đố nhân hóa và đoán tên sự vật' }, suggestedMethod: 'Dạy học tích hợp và rèn kỹ năng viết đoạn', suggestedScenario: 'Thuật lại buổi sinh hoạt chào cờ đầu tuần đầy trang nghiêm.' }
    ],
    'Lớp 4': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chân trời tuổi thơ', lessonTitle: 'Bài 1: Tuổi Ngựa (Đọc diễn cảm & Luyện từ và câu)', periodCount: 7, sections: ['tv_doc', 'tv_luyen_tap', 'tv_viet', 'tv_noi_nghe'], keyKnowledge: 'Đọc diễn cảm bài thơ; Danh từ chung và Danh từ riêng; viết bài văn kể lại câu chuyện', suggestedGame: { name: 'Phân loại danh từ', goal: 'Phân biệt danh từ chung và danh từ riêng', materials: 'Bộ thẻ từ', rules: 'Dán nhanh các thẻ từ vào cột Danh từ chung và Danh từ riêng viết hoa đúng quy tắc' }, suggestedMethod: 'Khám phá quy tắc ngữ pháp qua ngữ liệu chuẩn', suggestedScenario: 'Ước mơ tuổi thơ được khám phá những miền đất tươi đẹp của Tổ quốc.' },
      { week: 18, weekLabel: 'Tuần 18', theme: 'Ôn tập học kì 1', lessonTitle: 'Ôn tập cuối học kì 1 - Danh từ, Động từ, Tính từ & Bài văn miêu tả', periodCount: 7, sections: ['tv_doc', 'tv_viet', 'tv_luyen_tap', 'tv_sang_tao'], keyKnowledge: 'Hệ thống hóa từ loại (Danh từ, Động từ, Tính từ); cấu trúc bài văn miêu tả cây cối/con vật', suggestedGame: { name: 'Rung chuông vàng từ loại', goal: 'Xác định từ loại trong ngữ cảnh', materials: 'Bảng con', rules: 'Xác định từ in đậm thuộc từ loại nào và giải thích lý do' }, suggestedMethod: 'Hệ thống hóa qua bảng so sánh đặc điểm từ loại', suggestedScenario: 'Quan sát và miêu tả cây bàng thân thương che mát góc sân trường.' }
    ],
    'Lớp 5': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Khung trời tuổi thơ', lessonTitle: 'Bài 1: Thanh âm của gió (Đọc hiểu & Từ đồng nghĩa)', periodCount: 7, sections: ['tv_doc', 'tv_luyen_tap', 'tv_viet', 'tv_noi_nghe'], keyKnowledge: 'Cảm thụ vẻ đẹp thiên nhiên; Từ đồng nghĩa hoàn toàn và không hoàn toàn; Viết đoạn văn tả cảnh', suggestedGame: { name: 'Truy tìm từ đồng nghĩa', goal: 'Tìm từ đồng nghĩa phù hợp ngữ cảnh', materials: 'Bảng thi đấu nhóm', rules: 'Tìm càng nhiều từ đồng nghĩa với từ cho trước (ví dụ: xanh biếc, xanh ngắt, xanh ngút ngàn...)' }, suggestedMethod: 'Cảm thụ văn học và lựa chọn từ ngữ đắc địa', suggestedScenario: 'Đứng trước cánh đồng lúa chín quê hương, lắng nghe âm thanh kỳ diệu của thiên nhiên.' },
      { week: 18, weekLabel: 'Tuần 18', theme: 'Ôn tập học kì 1', lessonTitle: 'Ôn tập học kì 1 - Từ đa nghĩa, Từ đồng âm & Bài văn tả người', periodCount: 7, sections: ['tv_doc', 'tv_viet', 'tv_luyen_tap', 'tv_doc_mo_rong'], keyKnowledge: 'Phân biệt từ nhiều nghĩa và từ đồng âm; Lập dàn ý và viết bài văn tả người thân yêu', suggestedGame: { name: 'Đố bạn tìm ra nghĩa gốc - nghĩa chuyển', goal: 'Phân biệt nghĩa của từ đa nghĩa', materials: 'Thẻ ngữ cảnh', rules: 'Xác định từ "chân" trong câu nào mang nghĩa gốc, câu nào mang nghĩa chuyển' }, suggestedMethod: 'Dạy học phân tích ngữ nghĩa và thực hành hành văn', suggestedScenario: 'Tả hình ảnh người mẹ tảo tần nấu bữa cơm gia đình đầm ấm.' }
    ]
  },
  'Toán': {
    'Lớp 1': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Các số từ 0 đến 10', lessonTitle: 'Bài 1: Các số 1, 2, 3 (Nhận biết và Đếm số lượng)', periodCount: 4, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Đếm, đọc, viết đúng các số 1, 2, 3; gắn số với số lượng đồ vật tương ứng', suggestedGame: { name: 'Đếm nhanh lấy đúng', goal: 'Khớp số lượng với chữ số', materials: 'Bộ đồ dùng Toán 1', rules: 'GV giơ thẻ số 3, HS lấy nhanh 3 que tính hoặc vỗ tay 3 tiếng' }, suggestedMethod: 'Trực quan - Thao tác vật thật', suggestedScenario: 'Bé đếm số đồ dùng trong hộp bút (1 bút chì, 2 cục tẩy, 3 chiếc thước).' },
      { week: 2, weekLabel: 'Tuần 2', theme: 'Các số từ 0 đến 10', lessonTitle: 'Bài 2: Các số 4, 5 (Đếm và So sánh số lượng)', periodCount: 4, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Nhận biết, đọc, viết các số 4, 5; so sánh nhiều hơn, ít hơn, bằng nhau', suggestedGame: { name: 'Ai nhiều hơn', goal: 'So sánh số lượng trực quan', materials: 'Khối lập phương', rules: 'Hai bạn cùng bốc một nắm khối lập phương và so sánh xem ai có nhiều hơn' }, suggestedMethod: 'Thao tác ghép tương ứng 1-1', suggestedScenario: 'Chia bánh kẹo đều cho các bạn trong nhóm sinh nhật.' },
      { week: 18, weekLabel: 'Tuần 18', theme: 'Ôn tập học kì 1', lessonTitle: 'Ôn tập phép cộng, phép trừ trong phạm vi 10', periodCount: 4, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Thành thạo bảng cộng trừ trong phạm vi 10, giải bài toán có tranh ảnh minh họa', suggestedGame: { name: 'Ong tìm mật', goal: 'Tính nhẩm nhanh phép cộng trừ', materials: 'Thẻ ong và hoa toán học', rules: 'Ghép chú ong mang phép tính 4 + 3 với bông hoa số 7' }, suggestedMethod: 'Trò chơi hóa bài tập tính toán', suggestedScenario: 'Mẹ mua 6 quả cam, biếu bà 4 quả, tính số cam còn lại.' }
    ],
    'Lớp 2': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Ôn tập và Bổ sung', lessonTitle: 'Bài 1: Ôn tập các số đến 100 & Tia số', periodCount: 5, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Đọc, viết, phân tích cấu tạo số có hai chữ số (chục và đơn vị); xác định vị trí trên tia số', suggestedGame: { name: 'Rung chuông vàng', goal: 'Phân tích số có 2 chữ số', materials: 'Bảng con', rules: 'Viết số gồm 5 chục và 7 đơn vị vào bảng con' }, suggestedMethod: 'Thao tác bảng chục - đơn vị', suggestedScenario: 'Đọc số nhà trên con phố em đi học mỗi ngày.' },
      { week: 10, weekLabel: 'Tuần 10', theme: 'Phép cộng có nhớ', lessonTitle: 'Bài: Phép cộng (có nhớ) trong phạm vi 100', periodCount: 5, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Kỹ thuật đặt tính rồi tính phép cộng có nhớ, cộng từ phải sang trái, nhớ sang hàng chục', suggestedGame: { name: 'Tiếp sức đặt tính đúng', goal: 'Rèn kỹ năng cộng có nhớ', materials: 'Bảng phụ', rules: 'Hai đội chạy tiếp sức thực hiện từng bước đặt tính và tính toán' }, suggestedMethod: 'Mô hình hóa phép cộng có nhớ qua que tính', suggestedScenario: 'Tính tổng số cây hoa trồng được ở hai bồn hoa lớp 2A và 2B.' }
    ],
    'Lớp 3': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Bảng nhân, Bảng chia', lessonTitle: 'Bài 1: Ôn tập phép nhân, phép chia & Bảng nhân 2, 5', periodCount: 5, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Ý nghĩa của phép nhân (tổng các số hạng bằng nhau), học thuộc bảng nhân 2, 5', suggestedGame: { name: 'Vòng quay may mắn', goal: 'Đọc nhanh kết quả bảng nhân', materials: 'Bánh xe số', rules: 'Quay vào số nào thì nhân số đó với 2 hoặc 5 và đọc to kết quả' }, suggestedMethod: 'Dạy học khám phá quy luật dãy số cách đều', suggestedScenario: 'Mỗi hộp bút có 5 chiếc bút, hỏi 4 hộp bút như vậy có tất cả bao nhiêu chiếc bút.' }
    ],
    'Lớp 4': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Số tự nhiên', lessonTitle: 'Bài 1: Các số có sáu chữ số - Hàng và Lớp', periodCount: 5, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Nhận biết lớp đơn vị, lớp nghìn; đọc và viết số tự nhiên có nhiều chữ số chính xác', suggestedGame: { name: 'Đọc số nhanh - Viết số chuẩn', goal: 'Nhận biết cấu tạo hàng và lớp', materials: 'Bảng con', rules: 'GV đọc số, HS viết nhanh số đó và phân tích chữ số thuộc hàng nào, lớp nào' }, suggestedMethod: 'Sử dụng bảng gài hàng và lớp trực quan', suggestedScenario: 'Đọc số lượng khán giả cổ vũ trong sân vận động quốc gia Mỹ Đình.' }
    ],
    'Lớp 5': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Phân số và Số thập phân', lessonTitle: 'Bài 1: Ôn tập Khái niệm phân số & Phân số thập phân', periodCount: 5, sections: ['toan_kham_pha', 'toan_luyen_tap', 'toan_tro_choi', 'toan_van_dung'], keyKnowledge: 'Bản chất phân số, tử số và mẫu số; chuyển đổi phân số thập phân sang số thập phân', suggestedGame: { name: 'Ai nhanh ai đúng', goal: 'Chuyển đổi phân số thập phân', materials: 'Thẻ phân số', rules: 'Ghép cặp phân số thập phân với số thập phân tương ứng' }, suggestedMethod: 'Trực quan hóa qua mô hình chia bánh/hình tròn', suggestedScenario: 'Chia đều 3 chiếc bánh pizza cho 4 bạn cùng ăn.' }
    ]
  },
  'Tự nhiên và Xã hội': {
    'Lớp 1': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề 1: Gia đình', lessonTitle: 'Bài 1: Các thành viên trong gia đình em', periodCount: 2, sections: ['tnxh_kham_pha', 'tnxh_thuc_hanh', 'tnxh_tinh_huong', 'tnxh_van_dung'], keyKnowledge: 'Nhận biết các thế hệ trong gia đình (ông bà, bố mẹ, con cái); tình cảm yêu thương kính trọng', suggestedGame: { name: 'Cây gia đình yêu thương', goal: 'Giới thiệu các thành viên trong nhà', materials: 'Tranh ảnh gia đình', rules: 'Học sinh dán ảnh gia đình lên cây và giới thiệu nghề nghiệp, sở thích của người thân' }, suggestedMethod: 'Kể chuyện qua tranh ảnh thật và đóng vai', suggestedScenario: 'Bé vẽ một bức tranh tặng mẹ nhân ngày sinh nhật.' }
    ],
    'Lớp 2': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề 1: Gia đình', lessonTitle: 'Bài 1: Các thế hệ trong gia đình và nghề nghiệp', periodCount: 2, sections: ['tnxh_kham_pha', 'tnxh_thuc_hanh', 'tnxh_tinh_huong', 'tnxh_van_dung'], keyKnowledge: 'Phân biệt gia đình 2 thế hệ, 3 thế hệ; bổn phận của con cháu đối với ông bà cha mẹ', suggestedGame: { name: 'Đóng vai ứng xử gia đình', goal: 'Rèn kỹ năng lễ phép, hiếu thảo', materials: 'Đạo cụ đóng vai', rules: 'Xử lý tình huống khi ông bà bị ốm hoặc khi bố mẹ đi làm về mệt' }, suggestedMethod: 'Dạy học xử lý tình huống và đóng vai', suggestedScenario: 'Rót nước mời ông bà và đấm lưng giúp mẹ sau giờ làm việc.' }
    ],
    'Lớp 3': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề 1: Gia đình', lessonTitle: 'Bài 1: Họ hàng nội, họ hàng ngoại của em', periodCount: 2, sections: ['tnxh_kham_pha', 'tnxh_thuc_hanh', 'tnxh_tinh_huong', 'tnxh_van_dung'], keyKnowledge: 'Phân biệt mối quan hệ họ nội, họ ngoại; xưng hô đúng mực theo phong tục truyền thống', suggestedGame: { name: 'Sơ đồ cây phả hệ', goal: 'Xác định đúng vai vế họ hàng', materials: 'Bảng sơ đồ phả hệ', rules: 'Gắn thẻ tên chú, bác, cô, dì vào đúng nhánh nội hoặc ngoại' }, suggestedMethod: 'Khám phá qua sơ đồ gia đình', suggestedScenario: 'Về quê chúc Tết ông bà và gặp gỡ các anh chị em họ.' }
    ]
  },
  'Khoa học': {
    'Lớp 4': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề 1: Chất', lessonTitle: 'Bài 1: Nước có những tính chất gì? (Thực hành thí nghiệm)', periodCount: 2, sections: ['kh_kham_pha', 'kh_thi_nghiem', 'kh_tinh_huong', 'kh_stem'], keyKnowledge: 'Nước là chất lỏng trong suốt, không màu, không mùi, không vị, không có hình dạng nhất định, chảy từ cao xuống thấp, hòa tan một số chất', suggestedGame: { name: 'Nhà khoa học tí hon', goal: 'Khám phá tính chất hòa tan của nước', materials: 'Cốc nước, đường, muối, cát, dầu ăn', rules: 'Học sinh làm thí nghiệm khuấy các chất vào nước và ghi chép vào phiếu quan sát' }, suggestedMethod: 'Phương pháp Bàn tay nặn bột và Thực hành thí nghiệm 5E', suggestedScenario: 'Giải thích vì sao khi pha nước chanh đường thì đường tan còn hạt chanh nổi lên.' }
    ],
    'Lớp 5': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề 1: Chất', lessonTitle: 'Bài 1: Sự biến đổi hóa học và Sự biến đổi lý học của chất', periodCount: 2, sections: ['kh_kham_pha', 'kh_thi_nghiem', 'kh_tinh_huong', 'kh_stem'], keyKnowledge: 'Phân biệt sự biến đổi vật lý (chỉ thay đổi trạng thái, hình dạng) và sự biến đổi hóa học (tạo ra chất mới)', suggestedGame: { name: 'Thử tài phán đoán biến đổi', goal: 'Phân loại biến đổi lý học và hóa học', materials: 'Bảng con', rules: 'GV chiếu các hiện tượng (đốt cháy mẩu giấy, đun sôi nước, đinh gỉ...), HS giơ bảng LÝ HỌC hoặc HÓA HỌC' }, suggestedMethod: 'Thực nghiệm đối chứng và thảo luận khoa học', suggestedScenario: 'Giải thích hiện tượng chiếc đinh sắt để ngoài trời mưa lâu ngày bị gỉ sét màu nâu đỏ.' }
    ]
  },
  'Lịch sử và Địa lý': {
    'Lớp 4': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề 1: Địa phương em', lessonTitle: 'Bài 1: Làm quen với phương tiện học tập môn Lịch sử và Địa lý', periodCount: 2, sections: ['lsdl_tu_lieu', 'lsdl_nhan_vat', 'lsdl_dong_vai', 'lsdl_que_huong'], keyKnowledge: 'Cách sử dụng bản đồ, lược đồ, biểu đồ, trục thời gian, tranh ảnh tư liệu và hiện vật lịch sử', suggestedGame: { name: 'Truy tìm tọa độ trên bản đồ', goal: 'Đọc ký hiệu bản đồ', materials: 'Bản đồ hành chính Việt Nam', rules: 'Tìm nhanh tên thủ đô Hà Nội, các thành phố trực thuộc Trung ương' }, suggestedMethod: 'Khai thác bản đồ trực quan', suggestedScenario: 'Đóng vai hướng dẫn viên du lịch giới thiệu về quê hương của em.' }
    ],
    'Lớp 5': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề: Đất nước và Con người Việt Nam', lessonTitle: 'Bài 1: Vị trí địa lý, địa hình và khoáng sản Việt Nam', periodCount: 2, sections: ['lsdl_tu_lieu', 'lsdl_nhan_vat', 'lsdl_dong_vai', 'lsdl_que_huong'], keyKnowledge: 'Việt Nam nằm trên bán đảo Đông Dương, hình chữ S; vùng biển rộng lớn giàu tài nguyên và chủ quyền thiêng liêng', suggestedGame: { name: 'Tôi là hướng dẫn viên nhí', goal: 'Thuyết trình về vị trí địa lý nước ta', materials: 'Quả địa cầu, lược đồ', rules: 'Học sinh chỉ vị trí tiếp giáp của Việt Nam trên bản đồ thế giới' }, suggestedMethod: 'Đọc bản đồ và thuyết trình dự án nhóm', suggestedScenario: 'Tự hào giới thiệu về quần đảo Hoàng Sa và Trường Sa của Việt Nam.' }
    ]
  },
  'Hoạt động trải nghiệm': {
    'Lớp 1': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề: Chào năm học mới', lessonTitle: 'Bài 1: Làm quen với trường lớp và bạn bè mới', periodCount: 3, sections: ['hdtn_chao_co', 'hdtn_chu_de', 'hdtn_sinh_hoat_lop'], keyKnowledge: 'Biết tên trường, tên thầy cô giáo chủ nhiệm, tên các bạn trong tổ; tự tin chào hỏi', suggestedGame: { name: 'Kết bạn bốn phương', goal: 'Làm quen bạn mới', materials: 'Bóng chuyền tay', rules: 'Vừa chuyền bóng vừa hát, bóng dừng ở ai người đó đứng lên giới thiệu tên và sở thích' }, suggestedMethod: 'Trải nghiệm giao lưu và gắn kết tập thể', suggestedScenario: 'Chủ động chào hỏi và giúp đỡ bạn cùng bàn cất cặp sách ngăn nắp.' }
    ],
    'Lớp 2': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề: Em và trường tiểu học thân yêu', lessonTitle: 'Bài 1: Nề nếp học tập và Góc học tập ngăn nắp của em', periodCount: 3, sections: ['hdtn_chao_co', 'hdtn_chu_de', 'hdtn_sinh_hoat_lop'], keyKnowledge: 'Rèn thói quen tự giác học tập, giữ gìn sách vở sạch đẹp, sắp xếp đồ dùng gọn gàng', suggestedGame: { name: 'Thử tài sắp xếp nhanh', goal: 'Rèn tính ngăn nắp gọn gàng', materials: 'Cặp sách và đồ dùng mẫu', rules: 'Hai bạn thi đua xếp sách vở vào cặp đúng cách trong 30 giây' }, suggestedMethod: 'Thực hành thao tác và rèn thói quen tốt', suggestedScenario: 'Tự lau dọn bàn học và xếp sách vở ngăn nắp mỗi tối sau khi học bài.' }
    ],
    'Lớp 3': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề: Tự hào truyền thống trường em', lessonTitle: 'Bài 1: Xây dựng nội quy lớp học và Đội ngũ tự quản', periodCount: 3, sections: ['hdtn_chao_co', 'hdtn_chu_de', 'hdtn_sinh_hoat_lop'], keyKnowledge: 'Cùng nhau thảo luận và thống nhất bảng Nội quy lớp học hạnh phúc, bầu ban cán sự lớp', suggestedGame: { name: 'Cây cam kết hành động đẹp', goal: 'Xây dựng nề nếp lớp học', materials: 'Cây cam kết và giấy note', rules: 'Mỗi học sinh viết 1 hành động tích cực sẽ thực hiện trong năm học mới và dán lên cây' }, suggestedMethod: 'Thảo luận dân chủ và cam kết tập thể', suggestedScenario: 'Bầu chọn bạn lớp trưởng gương mẫu, chan hòa và trách nhiệm.' }
    ],
    'Lớp 4': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề: Tự chủ và Trách nhiệm', lessonTitle: 'Bài 1: Nhận diện điểm mạnh, điểm cần cố gắng của bản thân', periodCount: 3, sections: ['hdtn_chao_co', 'hdtn_chu_de', 'hdtn_sinh_hoat_lop'], keyKnowledge: 'Tự tin phát huy sở trường, lập kế hoạch khắc phục điểm còn yếu trong học tập và sinh hoạt', suggestedGame: { name: 'Bông hoa phẩm chất', goal: 'Tự nhận thức bản thân', materials: 'Phiếu hoa 5 cánh', rules: 'Ghi 5 ưu điểm nổi bật của mình vào cánh hoa và chia sẻ với bạn thân' }, suggestedMethod: 'Tự đánh giá và chia sẻ nhóm đôi', suggestedScenario: 'Lập kế hoạch rèn luyện môn Toán và tự giác tập thể dục buổi sáng.' }
    ],
    'Lớp 5': [
      { week: 1, weekLabel: 'Tuần 1', theme: 'Chủ đề: Xây dựng tập thể lớp đoàn kết', lessonTitle: 'Bài 1: Kỹ năng hợp tác và Giải quyết bất đồng thân thiện', periodCount: 3, sections: ['hdtn_chao_co', 'hdtn_chu_de', 'hdtn_sinh_hoat_lop'], keyKnowledge: 'Biết lắng nghe tích cực, tôn trọng sự khác biệt, tìm giải pháp thỏa đáng khi có mâu thuẫn', suggestedGame: { name: 'Bước chân đồng điệu', goal: 'Rèn tinh thần đồng đội', materials: 'Dây buộc chân nhóm', rules: 'Nhóm 4 bạn cùng buộc chân và bước đi nhịp nhàng về đích mà không bị ngã' }, suggestedMethod: 'Trò chơi Teambuilding và đúc kết kỹ năng sống', suggestedScenario: 'Hòa giải mâu thuẫn khi hai bạn trong lớp cùng tranh giành một quả bóng đá.' }
    ]
  }
};

import type { CurriculumPeriod } from './full35WeeksCurriculum';

export type { CurriculumPeriod, SubjectCurriculumWeekDetailed };

/**
 * Helper lấy danh sách 35 tuần đầy đủ kèm chi tiết từng tiết và từng bài theo chuẩn CTGDPT 2018
 */
export function getWeeksForSubject(subject: string, grade: string): SubjectCurriculumWeekDetailed[] {
  return getFull35WeeksForSubjectAndGrade(subject, grade);
}

/**
 * Helper lấy danh sách phân mục / phân môn theo môn học
 */
export function getSectionsForSubject(subject: string): SubjectSectionOption[] {
  return SUBJECT_SECTIONS_TAXONOMY[subject] || [
    { id: 'sec_kham_pha', name: 'Khám phá / Kiến thức mới', icon: '💡', shortDesc: 'Khám phá kiến thức mới', defaultPeriod: 'Tiết 1', suggestedMethods: ['Trực quan', 'Vấn đáp gợi mở'] },
    { id: 'sec_luyen_tap', name: 'Luyện tập / Thực hành', icon: '✏️', shortDesc: 'Luyện tập kỹ năng bài học', defaultPeriod: 'Tiết 1', suggestedMethods: ['Luyện tập cá nhân', 'Chia sẻ nhóm'] },
    { id: 'sec_van_dung', name: 'Vận dụng / Trải nghiệm', icon: '🚀', shortDesc: 'Vận dụng thực tế đời sống', defaultPeriod: 'Tiết 1', suggestedMethods: ['Tình huống thực tế', 'Trò chơi học tập'] }
  ];
}

