// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH HOẠT ĐỘNG TRẢI NGHIỆM 35 TUẦN - KNTT
// LỚP 1 ĐẾN LỚP 5 - MỖI TUẦN 3 TIẾT (TỔNG CỘNG 105 TIẾT/NĂM)
// TIẾT 1: SINH HOẠT DƯỚI CỜ - TIẾT 2: HĐGD THEO CHỦ ĐỀ - TIẾT 3: SINH HOẠT LỚP
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface ExperienceWeekItem {
  week: number;
  theme: string;
  title: string;
  flagActivity: string;
  topicActivity: string;
  classActivity: string;
  knowledge: string;
}

export const EXPERIENCE_THEMES_KNTT: Record<number, { theme: string; topic: string }> = {
  1: { theme: 'Chủ đề 1: Em và mái trường mến yêu', topic: 'Chào năm học mới và Làm quen với trường lớp' },
  2: { theme: 'Chủ đề 1: Em và mái trường mến yêu', topic: 'Nền nếp học tập và Giữ gìn vệ sinh lớp học' },
  3: { theme: 'Chủ đề 1: Em và mái trường mến yêu', topic: 'An toàn trong trường học và phòng tránh tai nạn' },
  4: { theme: 'Chủ đề 1: Em và mái trường mến yêu', topic: 'Tự hào về truyền thống nhà trường' },
  5: { theme: 'Chủ đề 2: Khám phá bản thân', topic: 'Hình ảnh và nét riêng của em' },
  6: { theme: 'Chủ đề 2: Khám phá bản thân', topic: 'Sở thích và khả năng của bản thân' },
  7: { theme: 'Chủ đề 2: Khám phá bản thân', topic: 'Cảm xúc của em và cách điều chỉnh cảm xúc' },
  8: { theme: 'Chủ đề 2: Khám phá bản thân', topic: 'Tự chăm sóc và rèn luyện thói quen tốt' },
  9: { theme: 'Chủ đề 3: Thầy cô và bạn bè', topic: 'Kính yêu thầy cô giáo' },
  10: { theme: 'Chủ đề 3: Thầy cô và bạn bè', topic: 'Tri ân thầy cô nhân ngày Nhà giáo Việt Nam 20/11' },
  11: { theme: 'Chủ đề 3: Thầy cô và bạn bè', topic: 'Tình bạn bè thân thiết và gắn bó' },
  12: { theme: 'Chủ đề 3: Thầy cô và bạn bè', topic: 'Hợp tác và giúp đỡ bạn bè cùng tiến bộ' },
  13: { theme: 'Chủ đề 4: Em với gia đình yêu thương', topic: 'Tổ ấm gia đình và tình yêu thương của cha mẹ' },
  14: { theme: 'Chủ đề 4: Em với gia đình yêu thương', topic: 'Bổn phận của con cháu đối với ông bà, cha mẹ' },
  15: { theme: 'Chủ đề 4: Em với gia đình yêu thương', topic: 'Chia sẻ công việc gia đình vừa sức' },
  16: { theme: 'Chủ đề 4: Em với gia đình yêu thương', topic: 'Đón mừng năm mới cùng gia đình sum vầy' },
  17: { theme: 'Đánh giá Học kì I', topic: 'Sơ kết hoạt động trải nghiệm Học kì I' },
  18: { theme: 'Đánh giá Học kì I', topic: 'Hội chợ xuân và Triển lãm sản phẩm sáng tạo kì I' },
  19: { theme: 'Chủ đề 5: Nghề nghiệp em yêu', topic: 'Khám phá thế giới nghề nghiệp xung quanh' },
  20: { theme: 'Chủ đề 5: Nghề nghiệp em yêu', topic: 'Biết ơn người lao động và sản phẩm lao động' },
  21: { theme: 'Chủ đề 5: Nghề nghiệp em yêu', topic: 'Ước mơ nghề nghiệp tương lai của em' },
  22: { theme: 'Chủ đề 5: Nghề nghiệp em yêu', topic: 'Trải nghiệm một ngày làm người lao động' },
  23: { theme: 'Chủ đề 6: Em và cộng đồng', topic: 'Giao tiếp văn minh và ứng xử lịch sự nơi công cộng' },
  24: { theme: 'Chủ đề 6: Em và cộng đồng', topic: 'Tôn trọng sự khác biệt và giúp đỡ người khó khăn' },
  25: { theme: 'Chủ đề 6: Em và cộng đồng', topic: 'Lan tỏa yêu thương - Dự án thiện nguyện nhỏ' },
  26: { theme: 'Chủ đề 6: Em và cộng đồng', topic: 'Văn hóa giao thông và an toàn trên đường phố' },
  27: { theme: 'Chủ đề 7: Yêu thương quê hương', topic: 'Cảnh đẹp và danh lam thắng cảnh quê hương' },
  28: { theme: 'Chủ đề 7: Yêu thương quê hương', topic: 'Lễ hội truyền thống và phong tục tập quán tốt đẹp' },
  29: { theme: 'Chủ đề 7: Yêu thương quê hương', topic: 'Nghề truyền thống và sản vật quê hương em' },
  30: { theme: 'Chủ đề 7: Yêu thương quê hương', topic: 'Hành động bảo vệ môi trường và giữ sạch làng xóm' },
  31: { theme: 'Chủ đề 8: Bảo vệ môi trường sống', topic: 'Bảo vệ nguồn nước và bầu không khí trong lành' },
  32: { theme: 'Chủ đề 8: Bảo vệ môi trường sống', topic: 'Giảm thiểu rác thải nhựa và Tái chế sáng tạo' },
  33: { theme: 'Tổng kết năm học', topic: 'Nhìn lại hành trình rèn luyện và trưởng thành' },
  34: { theme: 'Tổng kết năm học', topic: 'Kế hoạch kì nghỉ hè an toàn, vui tươi và bổ ích' },
  35: { theme: 'Đánh giá cuối năm', topic: 'Tổng kết Hoạt động trải nghiệm cả năm học' }
};

export function getExperience35Weeks(grade: string): SubjectCurriculumWeekDetailed[] {
  let gradeNum = 1;
  if (grade.includes('2')) gradeNum = 2;
  else if (grade.includes('3')) gradeNum = 3;
  else if (grade.includes('4')) gradeNum = 4;
  else if (grade.includes('5')) gradeNum = 5;

  return Array.from({ length: 35 }, (_, idx) => {
    const week = idx + 1;
    const semester: 1 | 2 = week <= 18 ? 1 : 2;
    const item = EXPERIENCE_THEMES_KNTT[week] || EXPERIENCE_THEMES_KNTT[1];

    const weekTitle = `Tuần ${week}: ${item.topic}`;

    const periods: CurriculumPeriod[] = [
      {
        periodNumber: 1,
        periodLabel: 'Tiết 1: Sinh hoạt dưới cờ (35 phút)',
        lessonPart: `SHDC: Chủ điểm "${item.topic}" toàn trường`,
        scope: `Nghi lễ chào cờ và phát động phong trào theo chủ điểm`,
        keyFocus: `Tập trung toàn trường, tham gia giao lưu và nghe phổ biến chủ điểm tuần ${week}.`,
        pageRange: `SGK HĐTN ${gradeNum} KNTT, tr.${week * 2}`,
        suggestedActivity: 'Chào cờ trang nghiêm, văn nghệ chào mừng, lắng nghe thông điệp tuần mới.'
      },
      {
        periodNumber: 2,
        periodLabel: 'Tiết 2: HĐGD theo chủ đề (35 phút)',
        lessonPart: `HĐGD: Khám phá, Rèn luyện & Thực hành "${item.topic}"`,
        scope: `Hoạt động nhóm, sắm vai và rèn luyện kĩ năng trải nghiệm`,
        keyFocus: `Hình thành kĩ năng, trải nghiệm thực tế và giải quyết các tình huống chủ điểm.`,
        pageRange: `SGK HĐTN ${gradeNum} KNTT, tr.${week * 2 + 1}`,
        suggestedActivity: 'Thảo luận nhóm 4, sắm vai tình huống, thực hành sản phẩm trải nghiệm sáng tạo.'
      },
      {
        periodNumber: 3,
        periodLabel: 'Tiết 3: Sinh hoạt lớp (35 phút)',
        lessonPart: `SHL: Đánh giá nền nếp tuần & Triển khai kế hoạch "${item.topic}"`,
        scope: `Sơ kết thi đua tuần, biểu dương gương tốt và lập kế hoạch mới`,
        keyFocus: `Tự đánh giá, lắng nghe nhận xét của ban cán sự và giáo viên chủ nhiệm.`,
        pageRange: `Sổ tay trải nghiệm HĐTN ${gradeNum}`,
        suggestedActivity: 'Báo cáo thi đua tổ, tuyên dương bông hoa điểm tốt, sinh hoạt văn nghệ tập thể.'
      }
    ];

    return {
      week,
      weekLabel: `Tuần ${week}`,
      semester,
      theme: item.theme,
      unitCode: item.theme,
      lessonTitle: weekTitle,
      allLessonsInWeek: [weekTitle],
      periodCount: 3,
      sections: ['hd_shdc', 'hd_chu_de', 'hd_shl'],
      periods,
      keyKnowledge: `Tham gia tích cực 3 loại hình hoạt động (Sinh hoạt dưới cờ, Hoạt động giáo dục theo chủ đề, Sinh hoạt lớp) chủ điểm ${item.topic} Lớp ${gradeNum}.`,
      textbookPageRange: `SGK Hoạt động trải nghiệm Lớp ${gradeNum} - Kết nối tri thức với cuộc sống`,
      suggestedGame: {
        name: `Vòng tròn kết nối Tuần ${week}`,
        goal: `Tạo không khí sôi nổi, gắn kết tập thể`,
        materials: `Khăn rằn, bóng chuyền tay, nhạc tập thể`,
        rules: `Cả lớp đứng vòng tròn cùng hát và chuyền bóng theo nhịp điệu`
      },
      suggestedMethod: 'Phương pháp trải nghiệm thực tế, trò chơi tập thể, thảo luận nhóm và dự án nhỏ.',
      suggestedScenario: 'Gắn liền với không gian lớp học, sân trường và môi trường gia đình, xã hội.'
    };
  });
}
