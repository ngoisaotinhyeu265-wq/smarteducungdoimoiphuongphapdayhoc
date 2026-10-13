/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Printer, 
  Check, 
  Sparkles, 
  Edit3, 
  BookOpen, 
  Calendar, 
  User, 
  Building2,
  Share2,
  ExternalLink,
  ChevronDown,
  Layers,
  Mic,
  Zap,
  Volume2
} from 'lucide-react';
import { FullLessonPlan, LessonPlan, TeacherScript } from '../types';
import TeacherScriptModal from './TeacherScriptModal';
import { generateTeacherScript } from '../data/teacherScriptGenerator';
import { 
  getSingleIntegrationTargetIndex, 
  extractIntegrationInfo, 
  generateWordHtmlSingleIntegrationBox,
  getActivityCode 
} from '../utils/singleActivityIntegration';
import { copyToClipboard } from '../utils/clipboard';

interface WordLessonPlanViewProps {
  fullPlan?: FullLessonPlan | null;
  lessonPlan?: LessonPlan | null;
  selectedSubject: string;
  selectedGrade: string;
  selectedBook: string;
  selectedUnit?: string;
  selectedLessonNumber?: string;
  selectedPeriodNumber?: string;
  onUpdatePlan?: (updated: FullLessonPlan) => void;
  sounds: any;
}

// Helper to safely render text that may contain red styling spans for inclusive education
function renderHtmlOrText(content: string) {
  if (!content) return '';
  if (content.includes('<span') || content.includes('<div') || content.includes('<b') || content.includes('<strong')) {
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
}

export default function WordLessonPlanView({
  fullPlan,
  lessonPlan,
  selectedSubject,
  selectedGrade,
  selectedBook,
  selectedUnit,
  selectedLessonNumber,
  selectedPeriodNumber,
  onUpdatePlan,
  sounds
}: WordLessonPlanViewProps) {
  // Customizable school header info for Word document
  const [schoolName, setSchoolName] = useState<string>(() => {
    return localStorage.getItem('smartedu_school_name') || 'TRƯỜNG TIỂU HỌC NGUYỄN BÁ NGỌC';
  });
  const [teacherName, setTeacherName] = useState<string>(() => {
    return localStorage.getItem('smartedu_teacher_name') || 'Cô giáo: Hoàng Thu Hương';
  });
  const [departmentName, setDepartmentName] = useState<string>(() => {
    return localStorage.getItem('smartedu_department_name') || 'Tổ Chuyên Môn Khối 3';
  });
  const [headerGrade, setHeaderGrade] = useState<string>(() => {
    return localStorage.getItem('smartedu_header_grade') || selectedGrade;
  });
  const [teachingDate, setTeachingDate] = useState<string>(() => {
    const today = new Date();
    return localStorage.getItem('smartedu_teaching_date') || `Ngày dạy: ${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  });
  const [teachingClass, setTeachingClass] = useState<string>(() => {
    return localStorage.getItem('smartedu_teaching_class') || `Lớp: ${String(selectedGrade || '3').replace(/Grade|Lớp/i, '').trim()}A1`;
  });

  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  
  // Teacher Script state
  const [isScriptModalOpen, setIsScriptModalOpen] = useState<boolean>(false);
  const [teacherScript, setTeacherScript] = useState<TeacherScript | null>(() => {
    return fullPlan?.teacherScript || null;
  });
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);

  // Handle open or generate teacher script
  const handleOpenTeacherScript = async () => {
    sounds.playPop();
    if (teacherScript) {
      setIsScriptModalOpen(true);
      return;
    }

    // If no script yet, generate using AI or fallback
    setIsGeneratingScript(true);
    try {
      const resp = await fetch('/api/lesson-plan/generate-teacher-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonPlan: fullPlan || lessonPlan,
          subject: selectedSubject,
          grade: selectedGrade,
          bookSeries: selectedBook,
          unit: selectedUnit,
          lesson: selectedLessonNumber ? `Lesson ${selectedLessonNumber}` : '',
          lessonName: lessonTitle
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.teacherScript) {
          setTeacherScript(data.teacherScript);
          if (fullPlan && onUpdatePlan) {
            onUpdatePlan({ ...fullPlan, teacherScript: data.teacherScript });
          }
          setIsScriptModalOpen(true);
          setIsGeneratingScript(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API error, using client-side teacher script generator:', e);
    }

    // Fallback generator
    const generated = generateTeacherScript(fullPlan || (lessonPlan as any), {
      subject: selectedSubject,
      grade: selectedGrade,
      bookSeries: selectedBook
    });
    setTeacherScript(generated);
    if (fullPlan && onUpdatePlan) {
      onUpdatePlan({ ...fullPlan, teacherScript: generated });
    }
    setIsScriptModalOpen(true);
    setIsGeneratingScript(false);
  };

  const handleRegenerateScript = async () => {
    sounds.playPop();
    setIsGeneratingScript(true);
    try {
      const resp = await fetch('/api/lesson-plan/generate-teacher-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonPlan: fullPlan || lessonPlan,
          subject: selectedSubject,
          grade: selectedGrade,
          bookSeries: selectedBook,
          unit: selectedUnit,
          lesson: selectedLessonNumber ? `Lesson ${selectedLessonNumber}` : '',
          lessonName: lessonTitle,
          customNotes: 'Tạo lời dẫn mới sinh động, tăng cường hoạt động nhóm và trò chơi'
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.teacherScript) {
          setTeacherScript(data.teacherScript);
          if (fullPlan && onUpdatePlan) {
            onUpdatePlan({ ...fullPlan, teacherScript: data.teacherScript });
          }
          setIsGeneratingScript(false);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    const generated = generateTeacherScript(fullPlan || (lessonPlan as any), {
      subject: selectedSubject,
      grade: selectedGrade,
      bookSeries: selectedBook
    });
    setTeacherScript(generated);
    if (fullPlan && onUpdatePlan) {
      onUpdatePlan({ ...fullPlan, teacherScript: generated });
    }
    setIsGeneratingScript(false);
  };

  // Normalize data between FullLessonPlan and LessonPlan
  const isEn = selectedSubject === 'Tiếng Anh' || fullPlan?.language === 'en';
  const lessonTitle = fullPlan?.lessonName || lessonPlan?.lessonName || 'KẾ HOẠCH BÀI DẠY PHÁT TRIỂN NĂNG LỰC';
  const topicTitle = fullPlan?.topic || lessonPlan?.topic || selectedUnit || 'Chủ đề bài học';
  const durationText = fullPlan?.duration || lessonPlan?.duration || '35 phút (1 tiết)';
  const bookSeriesText = fullPlan?.bookSeries || selectedBook || 'Kết nối tri thức với cuộc sống';
  const pageRangeText = fullPlan?.pageRange || fullPlan?.textbookSource?.pageRange || 'Trang 22 - 25';

  // Extract objectives
  const objectivesKnowledge = fullPlan?.objectives?.knowledgeAndSkills || (
    lessonPlan?.objectives?.filter(o => o.includes('Knowledge') || o.includes('Năng lực đặc thù') || !o.includes('II.') && !o.includes('III.')) || [
      'Nhận biết và vận dụng được các kiến thức trọng tâm của bài học vào thực tiễn.',
      'Rèn luyện kỹ năng quan sát, phân tích và thực hiện nhiệm vụ học tập theo nhóm.'
    ]
  );
  const objectivesCompetencies = fullPlan?.objectives?.coreCompetencies || (
    lessonPlan?.objectives?.filter(o => o.includes('Competencies') || o.includes('Năng lực chung')) || [
      'Năng lực tự chủ và tự học: Chủ động chuẩn bị đồ dùng và thực hiện nhiệm vụ cá nhân.',
      'Năng lực giao tiếp và hợp tác: Tích cực thảo luận, chia sẻ ý kiến với các bạn trong nhóm.'
    ]
  );
  const objectivesQualities = fullPlan?.objectives?.personalQualities || (
    lessonPlan?.objectives?.filter(o => o.includes('Qualities') || o.includes('Phẩm chất')) || [
      'Phẩm chất chăm chỉ: Tích cực phát biểu, hoàn thành bài tập đầy đủ.',
      'Phẩm chất trách nhiệm: Giữ gìn đồ dùng học tập và hỗ trợ bạn bè cùng tiến bộ.'
    ]
  );
  const objectivesDigital = fullPlan?.objectives?.digitalCompetency || [
    'Mã 1.1.CB1a (CV 3456/BGDĐT): Khai thác và tương tác với học liệu số trên màn hình thông minh.'
  ];
  const objectivesAI = fullPlan?.objectives?.aiIntegration || [
    'Quyết định 2422/QĐ-BGDĐT: Giáo viên sử dụng công cụ AI trợ giảng để chuẩn bị hình ảnh trực quan, học sinh tương tác nhận diện giọng nói.'
  ];
  const objectivesTrafficSafety = fullPlan?.objectives?.trafficSafety || [];
  const objectivesLifeSkills = fullPlan?.objectives?.lifeSkills || [];
  const objectivesEthics = fullPlan?.objectives?.ethicsAndMoral || [];

  // Extract materials
  const materialsTeacher = fullPlan?.materials?.teacher || (
    lessonPlan?.materials?.filter(m => m.includes('Teacher') || m.includes('Giáo viên') || m.includes('GV')) || [
      'Kế hoạch bài dạy, Sách giáo khoa, Sách giáo viên.',
      'Thiết bị trình chiếu, máy tính kết nối mạng, bài giảng điện tử.',
      'Bộ thẻ từ vựng / Tranh ảnh minh họa trực quan.'
    ]
  );
  const materialsStudent = fullPlan?.materials?.student || (
    lessonPlan?.materials?.filter(m => m.includes('Pupil') || m.includes('Student') || m.includes('Học sinh') || m.includes('HS')) || [
      'Sách giáo khoa, Vở bài tập, Bảng con, Phấn/Bút dạ viết bảng.',
      'Bút chì, thước kẻ và đồ dùng học tập cá nhân.'
    ]
  );
  const materialsDigital = fullPlan?.materials?.digitalTools || [
    'Phần mềm trò chơi học tập tương tác SmartEdu, Audio MP3 chuẩn ngữ điệu.'
  ];

  // Extract 4 activities
  const activitiesList = fullPlan?.activities || lessonPlan?.activities?.map((a, idx) => ({
    id: a.id || `act_${idx + 1}`,
    name: a.name,
    duration: a.duration,
    aims: (a as any).aims || (isEn ? 'Achieve target competency through engaging classroom interaction' : undefined),
    objective: (a as any).objective || (a as any).aims || (isEn ? 'Achieve target competency through engaging classroom interaction' : 'Hình thành và phát triển năng lực của bài học'),
    content: isEn ? 'Textbook tasks and interactive communicative activities' : 'Nhiệm vụ trong SGK và bài tập thực hành',
    teacherActivity: a.description ? a.description.split('• Hoạt động GV:')[1]?.split('•')[0]?.trim() || a.description : 'Giáo viên hướng dẫn, tổ chức các hoạt động và đặt câu hỏi gợi mở.',
    studentActivity: a.description ? a.description.split('• Hoạt động HS:')[1]?.split('•')[0]?.trim() || a.description : 'Học sinh quan sát, lắng nghe, thảo luận theo cặp/nhóm và thực hiện yêu cầu.',
    expectedOutcome: isEn ? 'Pupils complete task accurately and respond in English' : 'Học sinh hoàn thành nhiệm vụ, phát biểu tự tin và ghi nhớ kiến thức.',
    assessment: isEn ? 'Teacher observes pronunciation and awards stars' : 'Giáo viên quan sát, nhận xét và tuyên dương học sinh kịp thời.'
  })) || [];

  // Single target activity index & integration details
  const singleIntegrationTargetIdx = getSingleIntegrationTargetIndex(activitiesList);
  const singleIntegrationInfo = extractIntegrationInfo(
    fullPlan, 
    lessonPlan, 
    (fullPlan as any)?.curriculumPeriod || (fullPlan as any)?.periodData
  );

  // Post lesson adjustment
  const postAdjustments = fullPlan?.postLessonAdjustments || {
    difficulties: 'Một số học sinh còn lúng túng khi thực hành bài tập vận dụng nâng cao.',
    effectiveActivities: 'Hoạt động trò chơi tương tác và thảo luận nhóm đôi tạo không khí rất sôi nổi.',
    neededAdjustments: 'Dành thêm 2 phút để củng cố kỹ hơn các từ khóa trọng tâm ở cuối tiết học.',
    supportMeasures: 'Phân công học sinh hoàn thành tốt kèm cặp, hỗ trợ thêm bạn theo cặp đôi học tập.'
  };

  const diffObj = typeof postAdjustments === 'object' ? postAdjustments : {
    difficulties: String(postAdjustments),
    effectiveActivities: 'Học sinh hào hứng tham gia hoạt động nhóm.',
    neededAdjustments: 'Điều chỉnh thời lượng hoạt động thực hành.',
    supportMeasures: 'Tăng cường phiếu học tập trực quan.'
  };

  // Helper to build HTML string for Word Export & Clipboard
  const generateWordHtmlDocument = () => {
    return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:w="urn:schemas-microsoft-com:office:word" 
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${lessonTitle}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 595.3pt 841.9pt; /* A4 size */
      margin: 2.0cm 2.0cm 2.0cm 2.0cm;
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 13pt;
      line-height: 1.3;
      color: #000000;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    p { margin: 3pt 0; }
    h1 {
      font-size: 15pt;
      font-weight: bold;
      text-align: center;
      margin-top: 12pt;
      margin-bottom: 4pt;
      text-transform: uppercase;
    }
    h2 {
      font-size: 13pt;
      font-weight: bold;
      margin-top: 10pt;
      margin-bottom: 4pt;
      text-transform: uppercase;
    }
    h3 {
      font-size: 13pt;
      font-weight: bold;
      margin-top: 6pt;
      margin-bottom: 2pt;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 1.5pt solid #000000;
      margin-bottom: 14pt;
      padding-bottom: 4pt;
    }
    .header-table td {
      border: none;
      padding: 2pt 0;
      vertical-align: top;
      font-size: 12pt;
    }
    .text-center { text-align: center; }
    .text-left { text-align: left; }
    .text-right { text-align: right; }
    .bold { font-weight: bold; }
    .italic { font-style: italic; }
    
    /* 3-column table for activities */
    table.lesson-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 6pt;
      margin-bottom: 10pt;
      border: 1px solid #000000;
    }
    table.lesson-table th, table.lesson-table td {
      border: 1px solid #000000;
      padding: 6pt;
      vertical-align: top;
      font-size: 12.5pt;
    }
    table.lesson-table th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: center;
    }
    ul { margin: 2pt 0 4pt 18pt; padding: 0; }
    li { margin-bottom: 2pt; }
    .footer-table {
      width: 100%;
      border-collapse: collapse;
      border: none;
      margin-top: 20pt;
    }
    .footer-table td {
      border: none;
      padding: 4pt;
      text-align: center;
      vertical-align: top;
      font-size: 12pt;
    }
    .page-footer-table {
      width: 100%;
      border-collapse: collapse;
      border-top: 1pt solid #444444;
      margin-top: 24pt;
      font-size: 11pt;
    }
    .page-footer-table td {
      border: none;
      padding: 4pt 0;
      font-size: 11pt;
    }
  </style>
</head>
<body>
<div class="Section1">

  <!-- Header Section: Bên trái: Tên trường & Tổ chuyên môn | Bên phải: Khối lớp & Lớp/Ngày -->
  <table class="header-table">
    <tr>
      <td style="width: 55%; text-align: left;">
        <p class="bold" style="font-size: 12.5pt; text-transform: uppercase;">${schoolName}</p>
        <p class="italic" style="color: #333333;">${departmentName}</p>
      </td>
      <td style="width: 45%; text-align: right;">
        <p class="bold" style="font-size: 12.5pt; color: #1e3a8a; text-transform: uppercase;">
          ${isEn ? `GRADE: ${String(headerGrade || '').replace(/Grade|Lớp/i, '').trim()}` : `KHỐI LỚP: ${String(headerGrade || '').replace(/Grade|Lớp/i, '').trim()}`}
        </p>
        <p class="italic" style="color: #444444;">${teachingClass} | ${teachingDate}</p>
      </td>
    </tr>
  </table>

  <!-- Main Title -->
  <h1>${isEn ? 'LESSON PLAN' : 'KẾ HOẠCH BÀI DẠY'}</h1>
  <p class="text-center bold" style="font-size: 14pt;">${isEn ? `SUBJECT: ${selectedSubject === 'Tiếng Anh' ? 'ENGLISH' : selectedSubject.toUpperCase()} - ${headerGrade.toUpperCase()}` : `MÔN: ${selectedSubject.toUpperCase()} - ${headerGrade.toUpperCase()}`}</p>
  <p class="text-center bold" style="font-size: 14pt; color: #1e3a8a;">${isEn ? 'LESSON' : 'BÀI'}: ${lessonTitle}</p>
  <p class="text-center italic" style="margin-bottom: 12pt;">
    (${isEn ? 'Textbook' : 'Bộ sách'}: ${bookSeriesText} - ${topicTitle} - ${isEn ? 'Duration' : 'Thời lượng'}: ${durationText} - ${pageRangeText})
  </p>

  <!-- I. OBJECTIVES / YÊU CẦU CẦN ĐẠT -->
  <h2>${isEn ? 'I. OBJECTIVES' : 'I. YÊU CẦU CẦN ĐẠT (MỤC TIÊU BÀI DẠY)'}</h2>
  
  <h3>${isEn ? '1. English Language Competencies' : `1. Năng lực đặc thù (Môn ${selectedSubject})`}</h3>
  <ul>
    ${objectivesKnowledge.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
  </ul>

  <h3>${isEn ? '2. General Competencies' : '2. Năng lực chung (Theo Chương trình GDPT 2018)'}</h3>
  <ul>
    ${objectivesCompetencies.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
  </ul>

  <h3>${isEn ? '3. Personal Qualities & Moral Ethics' : '3. Phẩm chất chủ yếu & Đạo đức lối sống'}</h3>
  <ul>
    ${objectivesQualities.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
  </ul>

  <h3>${isEn ? '4. Digital Competency & AI Integration (Decision No. 2422/QD-BGDDT)' : '4. Năng lực số (CV 3456/BGDĐT) & Tích hợp AI (QĐ 2422/QĐ-BGDĐT)'}</h3>
  <ul>
    ${objectivesDigital.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
    ${objectivesAI.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
  </ul>

  ${(objectivesTrafficSafety.length > 0 || objectivesLifeSkills.length > 0) ? `
  <h3>${isEn ? '5. Traffic Safety (ATGT) & Life Skills (KNS) Integration' : '5. Tích hợp An toàn Giao thông (ATGT) & Kỹ năng sống (KNS)'}</h3>
  <ul>
    ${objectivesTrafficSafety.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
    ${objectivesLifeSkills.map(o => `<li>${o.replace(/^[•\s\d.-]+/, '')}</li>`).join('')}
  </ul>` : ''}

  <!-- II. TEACHING AIDS & LEARNING MATERIALS -->
  <h2>${isEn ? 'II. TEACHING AIDS & LEARNING MATERIALS' : 'II. ĐỒ DÙNG DẠY HỌC (THIẾT BỊ & HỌC LIỆU)'}</h2>
  <p><span class="bold">${isEn ? '1. Teacher:' : '1. Giáo viên:'}</span> ${materialsTeacher.join('; ')}.</p>
  <p><span class="bold">${isEn ? '2. Pupils / Students:' : '2. Học sinh:'}</span> ${materialsStudent.join('; ')}.</p>
  <p><span class="bold">${isEn ? '3. Digital Tools & Smart Media:' : '3. Thiết bị số & Học liệu thông minh:'}</span> ${materialsDigital.join('; ')}.</p>

  <!-- III. PROCEDURES -->
  <h2>${isEn ? 'III. TEACHING AND LEARNING PROCEDURES (5-STAGE PEDAGOGICAL FRAMEWORK)' : 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (TIẾN TRÌNH 5 GIAI ĐOẠN)'}</h2>

  <table class="lesson-table">
    <thead>
      <tr>
        <th style="width: 38%;">${isEn ? "TEACHER'S ACTIVITIES" : 'HOẠT ĐỘNG CỦA GIÁO VIÊN'}</th>
        <th style="width: 38%;">${isEn ? "PUPILS' ACTIVITIES" : 'HOẠT ĐỘNG CỦA HỌC SINH'}</th>
        <th style="width: 24%;">${isEn ? 'ASSESSMENT & PRODUCTS' : 'SẢN PHẨM & ĐÁNH GIÁ'}</th>
      </tr>
    </thead>
    <tbody>
      ${activitiesList.map((act, actIdx) => `
      <tr>
        <td colspan="3" style="background-color: #f8fafc; font-weight: bold; color: #1e3a8a;">
          ${act.name.toUpperCase()} (${act.duration || (isEn ? 'Appropriate duration' : 'Thời lượng phù hợp')})
          ${actIdx === singleIntegrationTargetIdx ? `<span style="display: inline-block; margin-left: 8pt; padding: 2pt 6pt; background-color: #2563eb; color: #ffffff; font-size: 9pt; border-radius: 3pt; font-weight: bold;">[ĐỊA CHỈ TÍCH HỢP MỤC TIÊU DUY NHẤT]</span>` : ''}
          <br/><span style="font-size: 11pt; font-weight: normal; font-style: italic; color: #334155;">
            * ${isEn ? 'Aims:' : 'Mục tiêu:'} ${act.aims || act.objective || (isEn ? 'Develop pupils active English communication skills' : 'Phát triển năng lực học tập tích cực')}
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <p class="bold" style="color: #047857;">${isEn ? 'a. Aims & Content:' : 'a. Mục tiêu & Nội dung:'}</p>
          <p>${act.content || (isEn ? 'Textbook learning task under teacher guidance.' : 'Nhiệm vụ học tập theo SGK và hướng dẫn của GV.')}</p>
          <p class="bold" style="color: #047857; margin-top: 4pt;">${isEn ? "b. Procedure / Teacher's Instructions:" : 'b. Tổ chức thực hiện:'}</p>
          <p style="white-space: pre-line;">${act.teacherActivity || (isEn ? 'Teacher guides and observes pupils.' : 'GV hướng dẫn và quan sát học sinh.')}</p>
          ${actIdx === singleIntegrationTargetIdx ? generateWordHtmlSingleIntegrationBox(singleIntegrationInfo, act.name) : ''}
        </td>
        <td>
          <p class="bold" style="color: #1d4ed8;">${isEn ? "Pupils' Activities:" : 'Nhiệm vụ của Học sinh:'}</p>
          <p style="white-space: pre-line;">${act.studentActivity || (isEn ? 'Pupils complete task in pairs/groups.' : 'HS thực hiện nhiệm vụ theo cặp/nhóm.')}</p>
        </td>
        <td>
          <p class="bold">${isEn ? 'Expected Outcomes:' : 'Dự kiến Sản phẩm:'}</p>
          <p>${act.expectedOutcome || (isEn ? 'Pupils accurately produce answers in English.' : 'HS hoàn thành câu trả lời/bài tập đúng.')}</p>
          <p class="bold" style="margin-top: 4pt;">${isEn ? 'Assessment Method:' : 'Cách thức Đánh giá:'}</p>
          <p>${act.assessment || (isEn ? 'Teacher observes, provides continuous feedback and praise.' : 'GV quan sát, nhận xét thường xuyên.')}</p>
        </td>
      </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- IV. POST-LESSON REFLECTION -->
  <h2>${isEn ? 'IV. POST-LESSON REFLECTION & ADJUSTMENTS' : 'IV. ĐIỀU CHỈNH SAU BÀI DẠY'}</h2>
  <p><span class="bold">${isEn ? '• Pupils\' Difficulties:' : '• Nội dung học sinh còn gặp khó khăn:'}</span> ${diffObj.difficulties || (isEn ? 'None identified.' : 'Không có.')}</p>
  <p><span class="bold">${isEn ? '• Effective Activities:' : '• Hoạt động dạy học thực hiện hiệu quả:'}</span> ${diffObj.effectiveActivities || (isEn ? 'Interactive pair work and games engaged pupils enthusiastically.' : 'Các hoạt động tương tác diễn ra sôi nổi.')}</p>
  <p><span class="bold">${isEn ? '• Needed Adjustments for Next Lesson:' : '• Nội dung cần điều chỉnh cho tiết sau:'}</span> ${diffObj.neededAdjustments || (isEn ? 'Maintain effective pace and active participation.' : 'Giữ vững tiến độ giảng dạy.')}</p>
  <p><span class="bold">${isEn ? '• Support Measures:' : '• Biện pháp hỗ trợ học sinh:'}</span> ${diffObj.supportMeasures || (isEn ? 'Provide additional visual cues and peer support.' : 'Tăng cường động viên học sinh yếu tự tin phát biểu.')}</p>

  <!-- V. APPROVAL & SIGNATURE -->
  <table class="footer-table">
    <tr>
      <td style="width: 33%;">
        <p class="bold">${isEn ? 'SCHOOL PRINCIPAL' : 'BAN GIÁM HIỆU DUYỆT'}</p>
        <p class="italic">${isEn ? '(Signature & Full Name)' : '(Ký và ghi rõ họ tên)'}</p>
        <br/><br/><br/><br/>
      </td>
      <td style="width: 33%;">
        <p class="bold">${isEn ? 'HEAD OF DEPARTMENT' : 'TỔ TRƯỞNG CHUYÊN MÔN'}</p>
        <p class="italic">${isEn ? '(Signature & Full Name)' : '(Ký và ghi rõ họ tên)'}</p>
        <br/><br/><br/><br/>
      </td>
      <td style="width: 34%;">
        <p class="bold">${isEn ? 'TEACHER' : 'GIÁO VIÊN SOẠN BÀI'}</p>
        <p class="italic">${isEn ? '(Signature & Full Name)' : '(Ký và ghi rõ họ tên)'}</p>
        <br/><br/><br/>
        <p class="bold">${teacherName.replace(/Cô giáo:|Thầy giáo:/i, '').trim()}</p>
      </td>
    </tr>
  </table>

  <!-- Chân trang (Footer): Tên giáo viên & Số trang -->
  <table class="page-footer-table">
    <tr>
      <td style="text-align: left; width: 50%; font-style: italic;">
        ${isEn ? 'Teacher' : 'Giáo viên'}: <span class="bold">${teacherName.replace(/Cô giáo:|Thầy giáo:/i, '').trim()}</span>
      </td>
      <td style="text-align: right; width: 50%; font-style: italic;">
        ${isEn ? 'Page 1' : 'Trang 1'}
      </td>
    </tr>
  </table>

</div>
</body>
</html>`;
  };

  // 1. Export as Real Word (.doc) File
  const handleDownloadWordDoc = () => {
    sounds.playLevelUp();
    const htmlContent = generateWordHtmlDocument();
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = (lessonTitle || 'Giao_An_CV2345').replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_').substring(0, 50);
    link.href = url;
    link.download = `${safeTitle}_GiaoAn_CV2345.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 2. Copy formatted HTML table directly to Clipboard (Pasting into Word preserves 100% tables & fonts)
  const handleCopyFormattedToWord = async () => {
    sounds.playCoin();
    try {
      const htmlContent = generateWordHtmlDocument();
      const plainText = `${lessonTitle}\n${selectedSubject} - ${selectedGrade}\n\nI. YÊU CẦU CẦN ĐẠT:\n${objectivesKnowledge.join('\n')}\n\nII. ĐỒ DÙNG DẠY HỌC:\n- GV: ${materialsTeacher.join(', ')}\n- HS: ${materialsStudent.join(', ')}`;
      
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([plainText], { type: 'text/plain' });

      if (navigator.clipboard && window.isSecureContext && (window as any).ClipboardItem) {
        try {
          await navigator.clipboard.write([
            new (window as any).ClipboardItem({
              'text/html': blobHtml,
              'text/plain': blobText
            })
          ]);
        } catch {
          await copyToClipboard(plainText);
        }
      } else {
        await copyToClipboard(plainText);
      }
      
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch (err) {
      console.warn('Clipboard write fallback:', err);
      await copyToClipboard(lessonTitle);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  // 3. Print / Export to PDF
  const handlePrintDocument = () => {
    sounds.playClick();
    window.print();
  };

  // Save customized school info
  const handleSaveSchoolInfo = () => {
    sounds.playSuccess();
    localStorage.setItem('smartedu_school_name', schoolName);
    localStorage.setItem('smartedu_teacher_name', teacherName);
    localStorage.setItem('smartedu_department_name', departmentName);
    localStorage.setItem('smartedu_header_grade', headerGrade);
    localStorage.setItem('smartedu_teaching_date', teachingDate);
    localStorage.setItem('smartedu_teaching_class', teachingClass);
    setIsEditingInfo(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Action Ribbon for Word Export & Options */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 text-white rounded-3xl p-4 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600 rounded-xl">
              <FileText className="w-5 h-5 text-white" />
            </span>
            <div>
              <h2 className="font-fredoka text-lg md:text-xl font-extrabold text-white">
                Văn Bản Giáo Án Chuẩn Công Văn 2345/BGDĐT 📄
              </h2>
              <p className="text-xs text-blue-200 font-sans">
                Trình bày chuẩn khổ A4, tiêu đề Trường & Khối lớp, chân trang Tên GV & Số trang
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Teacher Script Button */}
          <button
            type="button"
            onClick={handleOpenTeacherScript}
            disabled={isGeneratingScript}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-fredoka font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105 relative group border border-pink-300/40"
            title="Tạo kịch bản lời dẫn, lời thoại chi tiết và hiệu lệnh của giáo viên (100% tiếng Anh hoặc tiếng Việt)"
          >
            <Mic className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{isGeneratingScript ? 'Đang tạo lời dẫn...' : 'Lời Dẫn Giáo Viên 🎤'}</span>
            <span className="px-1.5 py-0.5 bg-amber-400 text-amber-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              MỚI
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditingInfo(!isEditingInfo)}
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-fredoka font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-300" />
            <span>{isEditingInfo ? 'Đóng cài đặt' : 'Cài đặt Tiêu đề'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyFormattedToWord}
            className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-fredoka font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            title="Sao chép toàn bộ bảng biểu để dán trực tiếp (Ctrl+V) vào Microsoft Word"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Sao chép sang Word</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadWordDoc}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-fredoka font-extrabold shadow-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            title="Tải ngay tệp tin .doc mở được trực tiếp trong Microsoft Word"
          >
            <Download className="w-4 h-4" />
            <span>Tải File Word (.doc) 📥</span>
          </button>

          <button
            type="button"
            onClick={handlePrintDocument}
            className="px-3.5 py-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-xl text-xs font-fredoka font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            title="In trực tiếp hoặc Lưu dưới dạng PDF chuẩn trang A4"
          >
            <Printer className="w-3.5 h-3.5 text-gray-600" />
            <span>In / PDF 🖨️</span>
          </button>
        </div>
      </div>

      {/* Customizable School/Teacher Info Dropdown Panel */}
      {isEditingInfo && (
        <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="font-fredoka text-sm font-extrabold text-indigo-950 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Chỉnh Sửa Thông Tin Đầu Trang (Trường, Khối, Giáo viên)</span>
            </h3>
            <button
              type="button"
              onClick={handleSaveSchoolInfo}
              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-fredoka font-bold hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Lưu thông tin</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Tên Trường Tiểu học (Bên trái):</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Tổ Chuyên Môn:</label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Chọn Khối Lớp (Bên phải):</label>
              <select
                value={headerGrade}
                onChange={(e) => {
                  setHeaderGrade(e.target.value);
                  setTeachingClass(`Lớp: ${String(e.target.value || '').replace(/Grade|Lớp/i, '').trim()}A1`);
                }}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Lớp 1">Khối 1 (Lớp 1)</option>
                <option value="Lớp 2">Khối 2 (Lớp 2)</option>
                <option value="Lớp 3">Khối 3 (Lớp 3)</option>
                <option value="Lớp 4">Khối 4 (Lớp 4)</option>
                <option value="Lớp 5">Khối 5 (Lớp 5)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Họ và tên Giáo viên (Chân trang):</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Ngày giảng dạy:</label>
              <input
                type="text"
                value={teachingDate}
                onChange={(e) => setTeachingDate(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Lớp giảng dạy:</label>
              <input
                type="text"
                value={teachingClass}
                onChange={(e) => setTeachingClass(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Authentic A4 Paper Sheet Preview Styled Exactly Like Microsoft Word */}
      <div className="bg-gray-200/80 p-3 sm:p-6 md:p-8 rounded-[32px] overflow-x-auto shadow-inner flex justify-center">
        
        {/* A4 Paper Container (Standard A4 Dimensions: 210mm x 297mm styled in responsive CSS) */}
        <div 
          id="printable-word-document"
          className="bg-white text-black shadow-2xl p-6 sm:p-10 md:p-14 w-full max-w-4xl mx-auto rounded-xl border border-gray-300 font-serif text-[13.5px] leading-relaxed transition-all"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {/* Header 2 Columns: Bên trái: Tên trường & Tổ chuyên môn | Bên phải: Chọn Khối & Lớp/Ngày */}
          <div className="flex justify-between items-start pb-4 border-b-2 border-gray-950">
            <div className="text-left space-y-0.5">
              <p className="font-bold uppercase text-[12.5px] md:text-[13.5px] tracking-wide text-gray-950">{schoolName}</p>
              <p className="italic text-[11.5px] md:text-[12px] text-gray-700">{departmentName}</p>
            </div>
            <div className="text-right space-y-0.5">
              <p className="font-bold uppercase text-[12.5px] md:text-[13.5px] tracking-wide text-blue-900">
                {isEn ? `GRADE: ${String(headerGrade || '').replace(/Grade|Lớp/i, '').trim().toUpperCase()}` : `KHỐI LỚP: ${String(headerGrade || '').replace(/Grade|Lớp/i, '').trim().toUpperCase()}`}
              </p>
              <p className="italic text-[11.5px] md:text-[12px] text-gray-600">{teachingClass} • {teachingDate}</p>
            </div>
          </div>

          {/* Main Document Title */}
          <div className="text-center py-6 space-y-1.5">
            <h1 className="font-bold text-lg md:text-2xl uppercase tracking-wider text-black">
              {isEn ? 'LESSON PLAN' : 'KẾ HOẠCH BÀI DẠY'}
            </h1>
            <p className="font-bold text-sm md:text-base uppercase text-blue-900">
              {isEn ? `SUBJECT: ${selectedSubject === 'Tiếng Anh' ? 'ENGLISH' : selectedSubject.toUpperCase()} - ${headerGrade.toUpperCase()}` : `MÔN: ${selectedSubject.toUpperCase()} - ${headerGrade.toUpperCase()}`}
            </p>
            <p className="font-bold text-base md:text-xl text-indigo-950 uppercase">
              {isEn ? 'LESSON' : 'BÀI'}: {lessonTitle}
            </p>
            <p className="italic text-xs md:text-sm text-gray-700">
              ({isEn ? 'Textbook' : 'Bộ sách'}: ${bookSeriesText} • ${topicTitle} • ${isEn ? 'Duration' : 'Thời lượng'}: ${durationText} • ${pageRangeText})
            </p>
          </div>

          {/* I. OBJECTIVES / YÊU CẦU CẦN ĐẠT */}
          <div className="space-y-3 py-3">
            <h2 className="font-bold text-sm md:text-base uppercase text-black border-b border-black pb-1">
              {isEn ? 'I. OBJECTIVES' : 'I. YÊU CẦU CẦN ĐẠT (MỤC TIÊU BÀI DẠY)'}
            </h2>

            <div className="space-y-2 pl-2">
              <div>
                <h3 className="font-bold text-[13px] text-gray-950">
                  {isEn ? '1. English Language Competencies' : `1. Năng lực đặc thù (Môn ${selectedSubject})`}:
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-gray-900">
                  {objectivesKnowledge.map((obj, i) => (
                    <li key={i}>{renderHtmlOrText(obj.replace(/^[•\s\d.-]+/, ''))}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[13px] text-gray-950">
                  {isEn ? '2. General Competencies' : '2. Năng lực chung (Chương trình GDPT 2018)'}:
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-gray-900">
                  {objectivesCompetencies.map((obj, i) => (
                    <li key={i}>{obj.replace(/^[•\s\d.-]+/, '')}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[13px] text-gray-950">
                  {isEn ? '3. Personal Qualities & Moral Ethics' : '3. Phẩm chất chủ yếu & Đạo đức lối sống'}:
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-gray-900">
                  {objectivesQualities.map((obj, i) => (
                    <li key={i}>{obj.replace(/^[•\s\d.-]+/, '')}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[13px] text-gray-950">
                  {isEn ? '4. Digital Competency & AI Integration (Decision No. 2422/QD-BGDDT)' : '4. Năng lực số (CV 3456/BGDĐT) & Tích hợp AI (QĐ 2422/QĐ-BGDĐT)'}:
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-gray-900">
                  {objectivesDigital.map((obj, i) => (
                    <li key={i}>{obj.replace(/^[•\s\d.-]+/, '')}</li>
                  ))}
                  {objectivesAI.map((obj, i) => (
                    <li key={i}>{obj.replace(/^[•\s\d.-]+/, '')}</li>
                  ))}
                </ul>
              </div>

              {(objectivesTrafficSafety.length > 0 || objectivesLifeSkills.length > 0) && (
                <div>
                  <h3 className="font-bold text-[13px] text-gray-950">
                    {isEn ? '5. Traffic Safety (ATGT) & Life Skills (KNS) Integration' : '5. Tích hợp An toàn Giao thông (ATGT) & Kỹ năng sống (KNS)'}:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-gray-900">
                    {objectivesTrafficSafety.map((obj, i) => (
                      <li key={i}>{obj.replace(/^[•\s\d.-]+/, '')}</li>
                    ))}
                    {objectivesLifeSkills.map((obj, i) => (
                      <li key={i}>{obj.replace(/^[•\s\d.-]+/, '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* II. TEACHING AIDS & LEARNING MATERIALS */}
          <div className="space-y-2 py-3">
            <h2 className="font-bold text-sm md:text-base uppercase text-black border-b border-black pb-1">
              {isEn ? 'II. TEACHING AIDS & LEARNING MATERIALS' : 'II. ĐỒ DÙNG DẠY HỌC (THIẾT BỊ & HỌC LIỆU)'}
            </h2>
            <div className="space-y-1.5 pl-2 text-gray-900">
              <p><strong className="font-bold">{isEn ? '1. Teacher:' : '1. Giáo viên:'}</strong> {materialsTeacher.join('; ')}.</p>
              <p><strong className="font-bold">{isEn ? '2. Pupils / Students:' : '2. Học sinh:'}</strong> {materialsStudent.join('; ')}.</p>
              <p><strong className="font-bold">{isEn ? '3. Digital Tools & Smart Media:' : '3. Thiết bị số & Học liệu thông minh:'}</strong> {materialsDigital.join('; ')}.</p>
            </div>
          </div>

          {/* III. PROCEDURES */}
          <div className="space-y-3 py-3">
            <h2 className="font-bold text-sm md:text-base uppercase text-black border-b border-black pb-1">
              {isEn ? 'III. TEACHING AND LEARNING PROCEDURES (5-STAGE PEDAGOGICAL FRAMEWORK)' : 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (TIẾN TRÌNH 5 GIAI ĐOẠN)'}
            </h2>

            {/* Complete 3-Column Formal Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black text-[13px] leading-snug">
                <thead>
                  <tr className="bg-gray-100 text-center font-bold">
                    <th className="border border-black p-2.5 w-[38%] uppercase">{isEn ? "TEACHER'S ACTIVITIES" : 'HOẠT ĐỘNG CỦA GIÁO VIÊN'}</th>
                    <th className="border border-black p-2.5 w-[38%] uppercase">{isEn ? "PUPILS' ACTIVITIES" : 'HOẠT ĐỘNG CỦA HỌC SINH'}</th>
                    <th className="border border-black p-2.5 w-[24%] uppercase">{isEn ? 'ASSESSMENT & PRODUCTS' : 'SẢN PHẨM & ĐÁNH GIÁ'}</th>
                  </tr>
                </thead>
                <tbody>
                  {activitiesList.map((act, index) => (
                    <React.Fragment key={act.id || index}>
                      {/* Activity Title Banner */}
                      <tr className="bg-gray-50/80 font-bold">
                        <td colSpan={3} className="border border-black p-2 text-blue-900">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span>{act.name.toUpperCase()} ({act.duration || (isEn ? 'Standard duration' : 'Thời lượng chuẩn')})</span>
                            {index === singleIntegrationTargetIdx && (
                              <span className="bg-blue-600 text-white text-[10px] font-fredoka font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-xs">
                                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                                <span>🎯 ĐỊA CHỈ TÍCH HỢP MỤC TIÊU DUY NHẤT (HOẠT ĐỘNG {getActivityCode(index)})</span>
                              </span>
                            )}
                          </div>
                          {(act.aims || act.objective) && (
                            <span className="block font-normal italic text-gray-700 text-[12px] mt-0.5">
                              * {isEn ? 'Aims:' : 'Mục tiêu:'} {act.aims || act.objective}
                            </span>
                          )}
                        </td>
                      </tr>

                      {/* 3 Columns Content */}
                      <tr className="align-top">
                        {/* Teacher's Column */}
                        <td className="border border-black p-3 space-y-2">
                          <div>
                            <span className="font-bold text-emerald-800 text-[12px] uppercase">{isEn ? 'a. Aims & Content:' : 'a. Mục tiêu & Nội dung:'}</span>
                            <p className="mt-0.5 text-gray-900">{act.content || (isEn ? 'Textbook learning task.' : 'Thực hiện nhiệm vụ trọng tâm bài học.')}</p>
                          </div>
                          <div>
                            <span className="font-bold text-emerald-800 text-[12px] uppercase">{isEn ? "b. Procedure / Teacher's Instructions:" : 'b. Tổ chức thực hiện:'}</span>
                            <div className="mt-1 whitespace-pre-line text-gray-900">
                              {renderHtmlOrText(act.teacherActivity || (isEn ? 'Teacher guides and models steps for pupils.' : 'GV hướng dẫn các bước chi tiết cho học sinh.'))}
                            </div>
                          </div>

                          {/* Single Target Integration Box strictly at target index */}
                          {index === singleIntegrationTargetIdx && (
                            <div className="mt-3 p-3 bg-blue-50/90 border-2 border-blue-400 rounded-xl text-[11px] space-y-1.5 font-sans shadow-xs">
                              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
                                <span className="font-bold text-blue-900 uppercase text-[11px] flex items-center gap-1">
                                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                  <span>🎯 ĐỊA CHỈ TÍCH HỢP MỤC TIÊU DUY NHẤT (CV 2345, CV 3456 & QĐ 2422)</span>
                                </span>
                                <span className="bg-blue-700 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                                  HOẠT ĐỘNG {getActivityCode(index)}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-1 text-[11px] text-gray-800">
                                <div><strong className="text-sky-800">• Năng lực số (CV 3456):</strong> {singleIntegrationInfo.digitalCompetence}</div>
                                <div><strong className="text-purple-800">• Khung GD AI (QĐ 2422):</strong> {singleIntegrationInfo.aiLiteracy}</div>
                                <div><strong className="text-amber-800">• ATGT & Kỹ năng sống:</strong> {singleIntegrationInfo.trafficSafety} | {singleIntegrationInfo.lifeSkills}</div>
                                <div><strong className="text-emerald-800">• Thiết bị & Học liệu:</strong> {singleIntegrationInfo.equipment}</div>
                              </div>
                              <p className="text-[10px] text-gray-500 italic pt-0.5 border-t border-blue-100">
                                * Quy chuẩn: Khớp nối đúng 1 hoạt động duy nhất cho toàn bài dạy theo Công văn 2345 & CV 3456, không tích hợp dàn trải.
                              </p>
                            </div>
                          )}
                        </td>

                        {/* Student's Column */}
                        <td className="border border-black p-3 space-y-2">
                          <div>
                            <span className="font-bold text-indigo-800 text-[12px] uppercase">{isEn ? "Pupils' Activities:" : 'Nhiệm vụ của Học sinh:'}</span>
                            <div className="mt-1 whitespace-pre-line text-gray-900">
                              {renderHtmlOrText(act.studentActivity || (isEn ? 'Pupils listen, repeat, and practice in pairs/groups.' : 'HS chú ý lắng nghe, làm việc cá nhân và phối hợp theo cặp/nhóm.'))}
                            </div>
                          </div>
                        </td>

                        {/* Outcome & Assessment Column */}
                        <td className="border border-black p-3 space-y-2 bg-gray-50/30">
                          <div>
                            <span className="font-bold text-gray-950 text-[12px] uppercase">{isEn ? 'Expected Products:' : 'Dự kiến sản phẩm:'}</span>
                            <p className="mt-0.5 text-gray-800 text-[12.5px]">
                              {renderHtmlOrText(act.expectedOutcome || (isEn ? 'Pupils complete task and communicate in English.' : 'HS hoàn thành câu trả lời và bài tập đúng.'))}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-gray-200">
                            <span className="font-bold text-gray-950 text-[12px] uppercase">{isEn ? 'Assessment:' : 'Đánh giá:'}</span>
                            <p className="mt-0.5 text-gray-800 text-[12.5px]">
                              {renderHtmlOrText(act.assessment || (isEn ? 'Teacher observes and provides formative feedback.' : 'GV quan sát, nhận xét và sửa lỗi phát âm/thao tác.'))}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* IV. POST-LESSON REFLECTION */}
          <div className="space-y-2 py-3">
            <h2 className="font-bold text-sm md:text-base uppercase text-black border-b border-black pb-1">
              {isEn ? 'IV. POST-LESSON REFLECTION & ADJUSTMENTS' : 'IV. ĐIỀU CHỈNH SAU BÀI DẠY'}
            </h2>
            <div className="space-y-1 pl-2 text-gray-900">
              <p><strong className="font-bold">{isEn ? '• Pupils\' Difficulties:' : '• Nội dung học sinh còn khó khăn:'}</strong> {diffObj.difficulties || (isEn ? 'None.' : 'Không có.')}</p>
              <p><strong className="font-bold">{isEn ? '• Effective Activities:' : '• Hoạt động thực hiện hiệu quả:'}</strong> {diffObj.effectiveActivities || (isEn ? 'Interactive activities engaged pupils effectively.' : 'Trò chơi tương tác sôi nổi.')}</p>
              <p><strong className="font-bold">{isEn ? '• Needed Adjustments for Next Lesson:' : '• Nội dung cần điều chỉnh cho tiết sau:'}</strong> {diffObj.neededAdjustments || (isEn ? 'Maintain teaching pace.' : 'Giữ vững nhịp độ bài giảng.')}</p>
              <p><strong className="font-bold">{isEn ? '• Support Measures:' : '• Biện pháp hỗ trợ học sinh tiếp thu chậm:'}</strong> {diffObj.supportMeasures || (isEn ? 'Provide additional visual cues and peer practice.' : 'Tăng cường kèm cặp đôi bạn cùng tiến.')}</p>
            </div>
          </div>

          {/* V. CHỮ KÝ PHÊ DUYỆT */}
          <div className="pt-8 pb-4">
            <div className="grid grid-cols-3 text-center gap-4">
              <div className="space-y-1">
                <p className="font-bold uppercase text-[12px]">{isEn ? 'SCHOOL PRINCIPAL' : 'BAN GIÁM HIỆU DUYỆT'}</p>
                <p className="italic text-[11px] text-gray-500">{isEn ? '(Signature & Full Name)' : '(Ký và ghi rõ họ tên)'}</p>
                <div className="h-16"></div>
              </div>
              <div className="space-y-1">
                <p className="font-bold uppercase text-[12px]">{isEn ? 'HEAD OF DEPARTMENT' : 'TỔ TRƯỞNG CHUYÊN MÔN'}</p>
                <p className="italic text-[11px] text-gray-500">{isEn ? '(Signature & Full Name)' : '(Ký và ghi rõ họ tên)'}</p>
                <div className="h-16"></div>
              </div>
              <div className="space-y-1">
                <p className="font-bold uppercase text-[12px]">{isEn ? 'TEACHER' : 'GIÁO VIÊN SOẠN BÀI'}</p>
                <p className="italic text-[11px] text-gray-500">{isEn ? '(Signature & Full Name)' : '(Ký và ghi rõ họ tên)'}</p>
                <div className="h-16"></div>
                <p className="font-bold text-[13px]">{teacherName.replace(/Cô giáo:|Thầy giáo:/i, '').trim()}</p>
              </div>
            </div>
          </div>

          {/* Chân trang (Footer): Tên giáo viên bên trái, Số trang bên phải */}
          <div className="mt-8 pt-3 border-t border-gray-400 flex justify-between items-center text-[12px] text-gray-700 italic">
            <div>
              <span>{isEn ? 'Teacher: ' : 'Giáo viên: '}</span>
              <span className="font-bold not-italic text-gray-950">{teacherName.replace(/Cô giáo:|Thầy giáo:/i, '').trim()}</span>
            </div>
            <div>
              <span>{isEn ? 'Page 1' : 'Trang 1 / 1'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Copy Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-8 right-8 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-fredoka font-bold z-50 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Đã sao chép toàn bộ bảng biểu! Mở Word và ấn Ctrl + V để dán ngay cô nhé! ✨</span>
        </div>
      )}

      {/* Teacher Script Modal */}
      {isScriptModalOpen && teacherScript && (
        <TeacherScriptModal
          isOpen={isScriptModalOpen}
          onClose={() => setIsScriptModalOpen(false)}
          script={teacherScript}
          onUpdateScript={(updated) => {
            setTeacherScript(updated);
            if (fullPlan && onUpdatePlan) {
              onUpdatePlan({ ...fullPlan, teacherScript: updated });
            }
          }}
          onRegenerate={handleRegenerateScript}
          isGenerating={isGeneratingScript}
          sounds={sounds}
        />
      )}

    </div>
  );
}
