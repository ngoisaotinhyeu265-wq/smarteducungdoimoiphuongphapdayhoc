/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FullLessonPlan, LessonPlan, LessonPlanActivity, StoredTextbook } from '../types';
import * as mammoth from 'mammoth';

export interface ParsedLessonTemplate {
  title: string;
  subject: string;
  grade: string;
  bookSeries: string;
  unit: string;
  lessonName: string;
  duration: string;
  objectives: {
    knowledgeAndSkills: string[];
    coreCompetencies: string[];
    personalQualities: string[];
    digitalCompetency?: string[];
    aiIntegration?: string[];
    trafficSafety?: string[];
    lifeSkills?: string[];
    ethicsAndMoral?: string[];
  };
  materials: {
    teacher: string[];
    student: string[];
    digitalTools?: string[];
  };
  activities: {
    id: string;
    name: string;
    duration: string;
    objective?: string;
    teacherActivity: string;
    studentActivity: string;
    description?: string;
    digitalTools?: string[];
    assessment?: string;
  }[];
  assessment: {
    methods: string[];
    tools: string[];
    rubrics: string[];
  };
  notes?: string;
  rawContent?: string;
}

/**
 * Extract raw text from File (.docx, .txt, .json)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.docx')) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (fileName.endsWith('.json')) {
    return await file.text();
  }

  if (fileName.endsWith('.txt') || fileName.endsWith('.doc')) {
    return await file.text();
  }

  // Fallback text read
  return await file.text();
}

/**
 * Smart Parser to detect complete lesson plan structure from arbitrary text or JSON
 */
export function parseCompleteLessonPlanText(rawText: string, fileName?: string): ParsedLessonTemplate {
  // If JSON format
  if (rawText.trim().startsWith('{') && rawText.trim().endsWith('}')) {
    try {
      const parsed = JSON.parse(rawText);
      if (parsed.fullPlan || parsed.objectives || parsed.activities) {
        const fp = parsed.fullPlan || parsed;
        return {
          title: fp.lessonName || fp.title || fileName?.replace(/\.[^/.]+$/, '') || 'Kế hoạch bài dạy mẫu',
          subject: fp.subject || 'Tiếng Anh',
          grade: fp.grade || 'Lớp 3',
          bookSeries: fp.bookSeries || 'Global Success',
          unit: fp.unit || 'Unit 1: Hello',
          lessonName: fp.lessonName || fp.title || 'Lesson 1',
          duration: fp.duration || '35 phút (1 tiết)',
          objectives: {
            knowledgeAndSkills: fp.objectives?.knowledgeAndSkills || ['Nắm vững kiến thức trọng tâm của bài học.'],
            coreCompetencies: fp.objectives?.coreCompetencies || ['Năng lực tự chủ và tự học, giao tiếp và hợp tác.'],
            personalQualities: fp.objectives?.personalQualities || ['Chăm chỉ, trung thực và có trách nhiệm.'],
            digitalCompetency: fp.objectives?.digitalCompetency || ['Mã 1.1.CB1a: Khai thác học liệu số.'],
            aiIntegration: fp.objectives?.aiIntegration || ['QĐ 2422/QĐ-BGDĐT: Ứng dụng trợ lý AI tạo tình huống.'],
            trafficSafety: fp.objectives?.trafficSafety,
            lifeSkills: fp.objectives?.lifeSkills,
            ethicsAndMoral: fp.objectives?.ethicsAndMoral
          },
          materials: {
            teacher: fp.materials?.teacher || ['SGK, Kế hoạch bài dạy, bài giảng điện tử trình chiếu.'],
            student: fp.materials?.student || ['SGK, vở ghi bài, đồ dùng học tập cá nhân.'],
            digitalTools: fp.materials?.digitalTools || ['Màn hình tương tác thông minh, loa âm thanh.']
          },
          activities: fp.activities || [
            {
              id: 'act1',
              name: 'Hoạt động 1: Khởi động (Warm-up)',
              duration: '5 phút',
              teacherActivity: 'Giáo viên tổ chức trò chơi kết nối bài học.',
              studentActivity: 'Học sinh hào hứng tham gia và trả lời câu hỏi.'
            },
            {
              id: 'act2',
              name: 'Hoạt động 2: Khám phá kiến thức mới',
              duration: '12 phút',
              teacherActivity: 'Giáo viên hướng dẫn quan sát tranh và giải thích nội dung.',
              studentActivity: 'Học sinh lắng nghe, nhắc lại và thảo luận nhóm.'
            },
            {
              id: 'act3',
              name: 'Hoạt động 3: Luyện tập thực hành',
              duration: '12 phút',
              teacherActivity: 'Giáo viên điều phối thực hành theo cặp / nhóm.',
              studentActivity: 'Học sinh làm bài tập và đối chiếu kết quả.'
            },
            {
              id: 'act4',
              name: 'Hoạt động 4: Vận dụng & Củng cố',
              duration: '6 phút',
              teacherActivity: 'Giáo viên nhận xét tiết học và giao nhiệm vụ về nhà.',
              studentActivity: 'Học sinh tóm tắt lại kiến thức đã học.'
            }
          ],
          assessment: {
            methods: fp.assessment?.methods || ['Đánh giá thường xuyên qua quan sát và nhận xét.'],
            tools: fp.assessment?.tools || ['Bảng kiểm quan sát (Checklist), câu hỏi trắc nghiệm.'],
            rubrics: fp.assessment?.rubrics || ['Mức 1: Chưa hoàn thành; Mức 2: Hoàn thành; Mức 3: Hoàn thành tốt.']
          },
          rawContent: rawText
        };
      }
    } catch {
      // Continue to regex text parser
    }
  }

  // Regex Text-Based Intelligent Extraction
  const isEn = /lesson\s+plan|objectives|warm-up|presentation|practice|production|pupil/i.test(rawText);

  // Subject detection
  let detectedSubject = 'Tiếng Anh';
  if (/tiếng việt|tập đọc|chính tả|luyện từ và câu|tập làm văn/i.test(rawText)) detectedSubject = 'Tiếng Việt';
  else if (/toán|hình học|phép cộng|phép nhân|phép chia|số học/i.test(rawText)) detectedSubject = 'Toán';
  else if (/khoa học|vật chất|năng lượng|sinh vật/i.test(rawText)) detectedSubject = 'Khoa học';
  else if (/lịch sử|địa lý|địa lí|bản đồ/i.test(rawText)) detectedSubject = 'Lịch sử và Địa lý';
  else if (/tự nhiên và xã hội|tnxh/i.test(rawText)) detectedSubject = 'Tự nhiên và Xã hội';
  else if (/hoạt động trải nghiệm|hđtn/i.test(rawText)) detectedSubject = 'Hoạt động trải nghiệm';
  else if (/đạo đức|hành vi|chuẩn mực/i.test(rawText)) detectedSubject = 'Đạo đức';
  else if (/tin học|máy tính|phần mềm/i.test(rawText)) detectedSubject = 'Tin học';
  else if (/công nghệ|thủ công/i.test(rawText)) detectedSubject = 'Công nghệ';

  // Grade detection
  let detectedGrade = 'Lớp 3';
  const gradeMatch = rawText.match(/lớp\s*([1-5])|grade\s*([1-5])/i);
  if (gradeMatch) {
    detectedGrade = `Lớp ${gradeMatch[1] || gradeMatch[2]}`;
  }

  // Book Series detection
  let detectedBook = 'Kết nối tri thức và cuộc sống';
  if (/global\s*success/i.test(rawText)) detectedBook = 'Global Success';
  else if (/cánh\s*diều/i.test(rawText)) detectedBook = 'Cánh Diều';
  else if (/chân\s*trời\s*sáng\s*tạo/i.test(rawText)) detectedBook = 'Chân trời sáng tạo';
  else if (/i-learn\s*smart\s*start/i.test(rawText)) detectedBook = 'i-Learn Smart Start';
  else if (/family\s*and\s*friends/i.test(rawText)) detectedBook = 'Family and Friends';

  // Lesson Name / Title extraction
  const titleLines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  let lessonTitle = titleLines.find(l => /bài\s*học|kế\s*hoạch\s*bài\s*dạy|lesson\s*plan|unit\s*\d+/i.test(l)) || titleLines[0] || 'Kế hoạch bài dạy hoàn chỉnh';
  lessonTitle = lessonTitle.replace(/^(kế hoạch bài dạy|giáo án|lesson plan|bài dạy|bài học):\s*/i, '').trim();

  // Unit Extraction
  const unitMatch = rawText.match(/(unit\s*\d+[^:\n]*|chủ\s*đề\s*\d*[^:\n]*|chủ\s*điểm[^:\n]*)/i);
  const detectedUnit = unitMatch ? unitMatch[1].trim() : (isEn ? 'Unit 1: Hello' : 'Chủ đề: Mở đầu');

  // Objectives extraction
  const extractSection = (startPatterns: RegExp[], endPatterns: RegExp[]): string[] => {
    const lines = rawText.split('\n');
    let inside = false;
    const collected: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (!inside) {
        if (startPatterns.some(p => p.test(trimmed))) {
          inside = true;
          continue;
        }
      } else {
        if (endPatterns.some(p => p.test(trimmed))) {
          break;
        }
        collected.push(trimmed);
      }
    }
    return collected;
  };

  // Section 1: Objectives
  const rawObjLines = extractSection(
    [/I\.\s*(YÊU CẦU CẦN ĐẠT|MỤC TIÊU|OBJECTIVES)/i],
    [/II\.\s*(ĐỒ DÙNG|THIẾT BỊ|TEACHING AIDS|MATERIALS)/i]
  );

  const knowledgeAndSkills: string[] = [];
  const coreCompetencies: string[] = [];
  const personalQualities: string[] = [];
  const digitalCompetency: string[] = [];
  const aiIntegration: string[] = [];
  const trafficSafety: string[] = [];
  const lifeSkills: string[] = [];

  let currentCategory = 'knowledge';
  rawObjLines.forEach(line => {
    if (/năng lực đặc thù|kiến thức|kĩ năng|kỹ năng|knowledge|language/i.test(line)) {
      currentCategory = 'knowledge';
    } else if (/năng lực chung|general competenc|core competenc/i.test(line)) {
      currentCategory = 'competency';
    } else if (/phẩm chất|personal qualitie|morality/i.test(line)) {
      currentCategory = 'qualities';
    } else if (/năng lực số|digital|cv 3456|1\.1\.cb/i.test(line)) {
      currentCategory = 'digital';
    } else if (/trí tuệ nhân tạo|ai|qđ 2422|qđ 3439/i.test(line)) {
      currentCategory = 'ai';
    } else if (/an toàn giao thông|atgt/i.test(line)) {
      currentCategory = 'atgt';
    } else if (/kỹ năng sống|kns/i.test(line)) {
      currentCategory = 'kns';
    } else {
      if (currentCategory === 'knowledge') knowledgeAndSkills.push(line);
      else if (currentCategory === 'competency') coreCompetencies.push(line);
      else if (currentCategory === 'qualities') personalQualities.push(line);
      else if (currentCategory === 'digital') digitalCompetency.push(line);
      else if (currentCategory === 'ai') aiIntegration.push(line);
      else if (currentCategory === 'atgt') trafficSafety.push(line);
      else if (currentCategory === 'kns') lifeSkills.push(line);
    }
  });

  // Section 2: Materials
  const rawMatLines = extractSection(
    [/II\.\s*(ĐỒ DÙNG|THIẾT BỊ|TEACHING AIDS|MATERIALS)/i],
    [/III\.\s*(CÁC HOẠT ĐỘNG|TIẾN TRÌNH|TEACHING AND LEARNING|PROCEDURE)/i]
  );

  const teacherMaterials: string[] = [];
  const studentMaterials: string[] = [];
  const digitalMaterials: string[] = [];
  let matCat = 'teacher';

  rawMatLines.forEach(line => {
    if (/giáo viên|teacher/i.test(line)) {
      matCat = 'teacher';
      teacherMaterials.push(line.replace(/^(1\.|giáo viên:|teacher:)\s*/i, ''));
    } else if (/học sinh|student|pupil/i.test(line)) {
      matCat = 'student';
      studentMaterials.push(line.replace(/^(2\.|học sinh:|student:|pupil:)\s*/i, ''));
    } else if (/thiết bị số|phần mềm|ai|digital/i.test(line)) {
      matCat = 'digital';
      digitalMaterials.push(line);
    } else {
      if (matCat === 'teacher') teacherMaterials.push(line);
      else if (matCat === 'student') studentMaterials.push(line);
      else if (matCat === 'digital') digitalMaterials.push(line);
    }
  });

  // Section 3: Activities
  const rawActLines = extractSection(
    [/III\.\s*(CÁC HOẠT ĐỘNG|TIẾN TRÌNH|TEACHING AND LEARNING|PROCEDURE)/i],
    [/IV\.\s*(ĐIỀU CHỈNH|ĐÁNH GIÁ|ASSESSMENT|EVALUATION)/i]
  );

  // Group activities into 4 main stages
  const activities: ParsedLessonTemplate['activities'] = [];
  let currentAct: any = null;

  rawActLines.forEach(line => {
    const isActHeader = /^(hoạt động\s*\d+|activity\s*\d+|step\s*\d+|1\.\s*khởi động|2\.\s*khám phá|3\.\s*luyện tập|4\.\s*vận dụng|warm-up|presentation|practice|production)/i.test(line);
    if (isActHeader) {
      if (currentAct) {
        activities.push(currentAct);
      }
      currentAct = {
        id: 'act_' + (activities.length + 1),
        name: line,
        duration: '7 - 10 phút',
        teacherActivity: '',
        studentActivity: '',
        description: line
      };
    } else if (currentAct) {
      if (/giáo viên|gv|teacher/i.test(line)) {
        currentAct.teacherActivity += (currentAct.teacherActivity ? '\n' : '') + line;
      } else if (/học sinh|hs|pupil|student/i.test(line)) {
        currentAct.studentActivity += (currentAct.studentActivity ? '\n' : '') + line;
      } else {
        currentAct.teacherActivity += (currentAct.teacherActivity ? '\n' : '') + line;
      }
    }
  });

  if (currentAct) {
    activities.push(currentAct);
  }

  // If no activities were parsed cleanly, provide 4 standard structured activities
  if (activities.length === 0) {
    activities.push(
      {
        id: 'act1',
        name: isEn ? 'Activity 1: Warm-up (Khởi động)' : 'Hoạt động 1: Khởi động (Warm-up & Kết nối)',
        duration: '5 phút',
        objective: isEn ? 'Create exciting atmosphere and review previous knowledge.' : 'Tạo không khí hứng khởi, kết nối kiến thức bài cũ vào bài học mới.',
        teacherActivity: isEn 
          ? 'Teacher greets pupils, conducts a quick interactive warm-up game (Lucky Wheel / Chant) and leads into the new lesson.'
          : 'Giáo viên tổ chức trò chơi khởi động sôi nổi, đặt câu hỏi gợi mở kết nối vào nội dung bài học mới.',
        studentActivity: isEn
          ? 'Pupils respond to greetings, join the warm-up game enthusiastically, and get ready for the lesson.'
          : 'Học sinh tích cực tham gia trò chơi, trả lời câu hỏi và chuẩn bị sách vở sẵn sàng.',
        digitalTools: ['Interactive Smart Screen', 'Audio Player']
      },
      {
        id: 'act2',
        name: isEn ? 'Activity 2: Presentation & Discovery (Khám phá)' : 'Hoạt động 2: Khám phá & Hình thành kiến thức mới',
        duration: '12 phút',
        objective: isEn ? 'Introduce new language patterns, vocabulary, and core concepts.' : 'Học sinh tiếp thu kiến thức trọng tâm, nhận biết quy tắc và phương pháp thực hiện.',
        teacherActivity: isEn
          ? 'Teacher presents textbook dialogue/illustration, models pronunciation and sentence structures clearly.'
          : 'Giáo viên hướng dẫn quan sát tranh ảnh SGK, nêu vấn đề, làm mẫu và giải thích chi tiết các bước.',
        studentActivity: isEn
          ? 'Pupils look at the pictures, listen carefully, repeat words/phrases, and work in pairs to explore meaning.'
          : 'Học sinh quan sát, lắng nghe, phát biểu ý kiến, thao tác đồ dùng và rút ra nhận xét trọng tâm.',
        digitalTools: ['Digital Flashcards', 'AI Pronunciation Assistant']
      },
      {
        id: 'act3',
        name: isEn ? 'Activity 3: Practice (Luyện tập thực hành)' : 'Hoạt động 3: Luyện tập & Thực hành',
        duration: '12 phút',
        objective: isEn ? 'Provide structured and semi-controlled practice in pairs/groups.' : 'Học sinh rèn luyện kỹ năng, làm bài tập vận dụng các kiến thức vừa khám phá.',
        teacherActivity: isEn
          ? 'Teacher sets up pair-work tasks, monitors classroom, supports struggling pupils, and assesses progress.'
          : 'Giáo viên giao nhiệm vụ thực hành (theo cá nhân/cặp/nhóm), quan sát giúp đỡ học sinh còn lúng túng.',
        studentActivity: isEn
          ? 'Pupils practice speaking/writing in pairs, complete exercises in textbook, and give peer feedback.'
          : 'Học sinh làm bài tập vào vở/bảng con, trao đổi thảo luận nhóm và báo cáo kết quả trước lớp.',
        digitalTools: ['Smart Quizizz Mini-Test']
      },
      {
        id: 'act4',
        name: isEn ? 'Activity 4: Production & Application (Vận dụng)' : 'Hoạt động 4: Vận dụng & Củng cố',
        duration: '6 phút',
        objective: isEn ? 'Consolidate knowledge and apply skills to real-life context.' : 'Củng cố toàn bộ bài học, gắn kiến thức vào thực tế cuộc sống.',
        teacherActivity: isEn
          ? 'Teacher organizes a communicative game/mini-project, summarizes lesson objectives, and gives home practice.'
          : 'Giáo viên tổ chức trò chơi củng cố nhanh, tổng kết các phẩm chất cần ghi nhớ và dặn dò bài sau.',
        studentActivity: isEn
          ? 'Pupils present their work, participate in wrap-up game, and note down teacher’s guidance.'
          : 'Học sinh trình bày sản phẩm, tự đánh giá mức độ tiếp thu và ghi nhớ lời dặn của thầy cô.',
        digitalTools: ['Reward Badges & Starboard']
      }
    );
  }

  return {
    title: lessonTitle,
    subject: detectedSubject,
    grade: detectedGrade,
    bookSeries: detectedBook,
    unit: detectedUnit,
    lessonName: lessonTitle,
    duration: '35 phút (1 tiết)',
    objectives: {
      knowledgeAndSkills: knowledgeAndSkills.length > 0 ? knowledgeAndSkills : [
        'Nắm vững kiến thức trọng tâm, từ vựng và mẫu câu cơ bản của bài học.',
        'Vận dụng chính xác kiến thức vào giải quyết các bài tập và tình huống thực hành.'
      ],
      coreCompetencies: coreCompetencies.length > 0 ? coreCompetencies : [
        'Năng lực tự chủ và tự học: Tự giác hoàn thành các nhiệm vụ học tập được giao.',
        'Năng lực giao tiếp và hợp tác: Tích cực trao đổi, thảo luận nhóm và trình bày tự tin.'
      ],
      personalQualities: personalQualities.length > 0 ? personalQualities : [
        'Chăm chỉ: Kiên trì làm bài tập và luyện tập chăm chỉ.',
        'Trách nhiệm: Giữ gìn đồ dùng học tập, tôn trọng và hỗ trợ bạn bè trong lớp.'
      ],
      digitalCompetency: digitalCompetency.length > 0 ? digitalCompetency : [
        'Mã 1.1.CB1a (CV 3456/BGDĐT): Khai thác và tương tác hiệu quả với học liệu số trên màn hình thông minh.'
      ],
      aiIntegration: aiIntegration.length > 0 ? aiIntegration : [
        'Quyết định 2422/QĐ-BGDĐT: Ứng dụng trợ lý AI tạo tình huống học tập tương tác và nhận diện giọng nói.'
      ],
      trafficSafety: trafficSafety.length > 0 ? trafficSafety : undefined,
      lifeSkills: lifeSkills.length > 0 ? lifeSkills : undefined
    },
    materials: {
      teacher: teacherMaterials.length > 0 ? teacherMaterials : [
        'Kế hoạch bài dạy chi tiết (CV 2345), máy tính, máy chiếu hoặc màn hình tương tác.',
        'Tranh ảnh minh họa SGK số, thẻ từ (Flashcards) và bài tập tương tác.'
      ],
      student: studentMaterials.length > 0 ? studentMaterials : [
        'Sách giáo khoa, vở ghi bài, bảng con, bút và đồ dùng học tập cá nhân.'
      ],
      digitalTools: digitalMaterials.length > 0 ? digitalMaterials : [
        'Hệ thống Mini-game SmartEdu, phần mềm âm thanh MP3 tương tác.'
      ]
    },
    activities,
    assessment: {
      methods: ['Đánh giá thường xuyên trong tiến trình học qua quan sát và nhận xét trực tiếp.'],
      tools: ['Bảng kiểm quan sát (Checklist), câu hỏi tương tác nhanh, phiếu bài tập.'],
      rubrics: ['Mức 1 (Cần cố gắng), Mức 2 (Hoàn thành), Mức 3 (Hoàn thành xuất sắc).']
    },
    rawContent: rawText
  };
}

/**
 * High quality Pre-built Sample Templates for Instant Use
 */
export const SAMPLE_LESSON_PLAN_PRESETS: {
  id: string;
  name: string;
  subject: string;
  grade: string;
  bookSeries: string;
  description: string;
  badge: string;
  template: ParsedLessonTemplate;
}[] = [
  {
    id: 'preset_en_global_success',
    name: 'Mẫu 1: Tiếng Anh Global Success (CV 2345 & QĐ 2422)',
    subject: 'Tiếng Anh',
    grade: 'Lớp 3',
    bookSeries: 'Global Success',
    badge: '100% Tiếng Anh',
    description: 'Chuẩn 4 bước 3 cột (Warm-up, Presentation, Practice, Production), tích hợp AI nhận diện giọng nói và Năng lực số 1.1.CB1a.',
    template: {
      title: 'Unit 3: Our School Things - Lesson 1 (Period 1)',
      subject: 'Tiếng Anh',
      grade: 'Lớp 3',
      bookSeries: 'Global Success',
      unit: 'Unit 3: Our School Things',
      lessonName: 'Lesson 1 (Pages 22 - 23)',
      duration: '35 minutes (1 period)',
      objectives: {
        knowledgeAndSkills: [
          'By the end of the lesson, pupils will be able to understand and correctly pronounce the vocabulary items: pen, pencil, ruler, school bag.',
          'Use the sentence pattern "I have a (pen)." to talk about school things accurately and fluently in spoken interactions.'
        ],
        coreCompetencies: [
          'Communication and Collaboration: Work cooperatively in pairs and groups during chant and speaking games.',
          'Self-control and Independent Learning: Confidently point and name school objects without hesitation.'
        ],
        personalQualities: [
          'Diligence & Responsibility: Take great care of school supplies and keep the classroom desk tidy.',
          'Moral Ethics (TT 32/2018): Polite communication, sharing stationery nicely with peers.'
        ],
        digitalCompetency: [
          '1.1.CB1a (Official Dispatch 3456/BGDDT): Pupils interact with digital MP3 audio dialogues and smart flashcards.'
        ],
        aiIntegration: [
          'Decision No. 2422/QD-BGDDT: Pupils practice native pronunciation with smart speech recognition assistant.'
        ],
        trafficSafety: [
          'Traffic Safety: Safely pack all books and sharp pencils inside the school bag before walking to school.'
        ],
        lifeSkills: [
          'Life Skills: Organizing personal backpack and sharing supplies with classmates.'
        ]
      },
      materials: {
        teacher: [
          'Teacher Lesson Plan (Official Dispatch 2345/BGDDT-GDTH standard), Laptop, Interactive Screen/Projector.',
          'SmartEdu Digital Flashcards (pen, pencil, ruler, school bag), Audio MP3 Tracks 32 & 33.'
        ],
        student: [
          'Pupil’s Book (Global Success Grade 3, pages 22-23), Notebook.',
          'Real school things (pen, pencil, ruler, school bag).'
        ],
        digitalTools: [
          'SmartEdu Digital Interactive Audio Player with 0.8x slow playback',
          'Wheel of Fortune Classroom Quiz Game'
        ]
      },
      activities: [
        {
          id: 'act1',
          name: '1. Warm-up & Review (Khởi động)',
          duration: '5 minutes',
          objective: 'Create a joyful atmosphere and review greetings & colors.',
          teacherActivity: '• Teacher greets the class warmly: "Good morning, class! How are you today?"\n• Conducts the song "Hello, how are you?" with TPR body actions.\n• Introduces a mystery school bag and asks: "What do I have here?" to lead into Unit 3.',
          studentActivity: '• Pupils stand up, sing the song cheerfully and do clapping gestures.\n• Pupils guess the objects inside the bag with excitement.',
          digitalTools: ['Song Video Clip on Smart Screen']
        },
        {
          id: 'act2',
          name: '2. Presentation & Discovery (Khám phá)',
          duration: '12 minutes',
          objective: 'Listen, point, repeat words (pen, pencil, ruler, school bag) and sentence pattern "I have a..."',
          teacherActivity: '• Activity 1: Look, listen and repeat: Displays picture A & B on screen. Plays Track 32.\n• Models pronunciation of "pen", "pencil", "ruler", "school bag" with clear mouth shape.\n• Introduces target sentence structure: "I have a pen." Writes on board and highlights phonics.',
          studentActivity: '• Pupils look at pictures, listen to Track 32 and repeat choral & individual.\n• Pupils point to the corresponding pictures in their books and repeat.',
          digitalTools: ['Digital Textbook Pages & AI Audio Repeat']
        },
        {
          id: 'act3',
          name: '3. Practice (Luyện tập thực hành)',
          duration: '12 minutes',
          objective: 'Practice pointing and saying the vocabulary and sentence structure in pairs.',
          teacherActivity: '• Activity 2: Listen, point and say: Calls on pupil pairs to practice "I have a [pen]."\n• Organizes game "Slap the Board" / "Point and Shout": Calls 2 teams to touch the correct flashcard upon hearing the word.',
          studentActivity: '• Pupils practice in pairs: Pupil A holds up a pencil and says "I have a pencil." Pupil B confirms "Yes, a pencil."\n• Pupils participate in the game energetically.',
          digitalTools: ['Interactive Board Game']
        },
        {
          id: 'act4',
          name: '4. Production & Application (Vận dụng & Củng cố)',
          duration: '6 minutes',
          objective: 'Use the target language in real-life presentation and consolidate lesson.',
          teacherActivity: '• Activity 3: Let\'s talk: Invites 3 pupils to stand in front of class, show their own school things and introduce.\n• Summarizes the lesson with "Thumbs Up" assessment and gives praise stickers.',
          studentActivity: '• Selected pupils present: "Hello, I have a ruler. I have a school bag."\n• Whole class gives applause and packs supplies neatly.',
          digitalTools: ['Classroom Reward Stars']
        }
      ],
      assessment: {
        methods: ['Direct observation during pair-work, chant performance and game responses.'],
        tools: ['Teacher Observation Checklist, Peer assessment thumbs up.'],
        rubrics: ['Level 1: Needs teacher help to name items; Level 2: Names items correctly; Level 3: Fluent presentation.']
      }
    }
  },
  {
    id: 'preset_vi_kntt',
    name: 'Mẫu 2: Tiếng Việt Kết Nối Tri Thức (Đọc hiểu & Luyện từ)',
    subject: 'Tiếng Việt',
    grade: 'Lớp 3',
    bookSeries: 'Kết nối tri thức và cuộc sống',
    badge: 'Chuẩn KNTT',
    description: 'Bám sát tiến trình đọc đúng, đọc hiểu, mở rộng vốn từ và rèn luyện phẩm chất nhân ái, chăm chỉ theo CTGDPT 2018.',
    template: {
      title: 'Bài 1: Ngày gặp lại - Tiết 1 & 2 (Đọc & Luyện tập)',
      subject: 'Tiếng Việt',
      grade: 'Lớp 3',
      bookSeries: 'Kết nối tri thức và cuộc sống',
      unit: 'Chủ điểm 1: Những búp măng non',
      lessonName: 'Bài 1: Ngày gặp lại (Trang 10 - 12)',
      duration: '70 phút (2 tiết)',
      objectives: {
        knowledgeAndSkills: [
          'Đọc đúng từ ngữ, câu văn, đoạn văn và toàn bộ bài đọc "Ngày gặp lại"; ngắt nghỉ hơi đúng dấu câu.',
          'Hiểu nội dung bài: Niềm vui của các bạn nhỏ khi gặp lại thầy cô, bạn bè sau kì nghỉ hè bổ ích.',
          'Biết tìm từ ngữ chỉ cảm xúc, hoạt động trong ngày tựu trường.'
        ],
        coreCompetencies: [
          'Năng lực tự chủ và tự học: Tự giác luyện đọc và trả lời câu hỏi đọc hiểu.',
          'Năng lực giao tiếp và hợp tác: Biết chia sẻ cảm xúc ngày tựu trường cùng bạn trong nhóm.'
        ],
        personalQualities: [
          'Nhân ái, yêu thương thầy cô, bạn bè; hào hứng và trách nhiệm với năm học mới.',
          'Phẩm chất Đạo đức (TT 32/2018): Giữ gìn nề nếp lớp học, tôn trọng lời nói của bạn bè.'
        ],
        digitalCompetency: [
          'Mã 1.1.CB1a (CV 3456/BGDĐT): Học sinh theo dõi giọng đọc mẫu chuẩn trên màn hình tương tác.'
        ],
        aiIntegration: [
          'QĐ 2422/QĐ-BGDĐT: Giáo viên ứng dụng trợ lý AI trực quan hóa sơ đồ cây cảm xúc tựu trường.'
        ],
        trafficSafety: [
          'Giáo dục ATGT (CV 3456): Đi bộ đúng phần đường, đội mũ bảo hiểm khi được đưa đón đến trường.'
        ],
        lifeSkills: [
          'Kỹ năng sống: Tự tin chào hỏi và kết bạn mới trong ngày đầu năm học.'
        ]
      },
      materials: {
        teacher: [
          'Giáo án CV 2345, máy tính, bài giảng điện tử tương tác, tranh ảnh minh họa ngày khai trường.',
          'Video clip giọng đọc mẫu truyền cảm.'
        ],
        student: [
          'Sách giáo khoa Tiếng Việt 3 (Tập 1), vở bài tập, bút viết.'
        ],
        digitalTools: [
          'Trò chơi tương tác Ong Vàng Tìm Chữ',
          'Bảng từ ngữ thông minh'
        ]
      },
      activities: [
        {
          id: 'act1',
          name: '1. Khởi động (Warm-up & Kết nối)',
          duration: '5 phút',
          objective: 'Tạo tâm thế vui tươi, chia sẻ cảm xúc ngày tựu trường.',
          teacherActivity: '• Giáo viên bật bài hát "Niềm vui ngày tựu trường" cho cả lớp hát múa theo nhạc.\n• Đặt câu hỏi: "Sau kì nghỉ hè, em cảm thấy thế nào khi được gặp lại bạn bè và thầy cô?"',
          studentActivity: '• Học sinh hát và vỗ tay theo nhịp điệu bài hát.\n• 2-3 học sinh chia sẻ cảm xúc trước lớp.',
          digitalTools: ['Video bài hát trên YouTube / Kho học liệu']
        },
        {
          id: 'act2',
          name: '2. Khám phá & Luyện đọc (Presentation)',
          duration: '25 phút',
          objective: 'Luyện đọc đúng từ ngữ khó, đọc ngắt nghỉ câu dài và tìm hiểu nghĩa từ mới.',
          teacherActivity: '• Giáo viên đọc mẫu toàn bài (giọng diễn cảm, vui tươi).\n• Hướng dẫn chia đoạn (3 đoạn), luyện đọc từ khó: ríu rít, rộn ràng, tíu tít.\n• Hướng dẫn ngắt nghỉ câu dài.',
          studentActivity: '• Học sinh lắng nghe và đọc thầm theo.\n• Đọc nối tiếp câu, đoạn theo nhóm 3 và sửa lỗi phát âm cho nhau.',
          digitalTools: ['Màn hình hiển thị câu dài có đánh dấu nhịp ngắt']
        },
        {
          id: 'act3',
          name: '3. Luyện tập & Tìm hiểu bài (Practice)',
          duration: '25 phút',
          objective: 'Trả lời các câu hỏi đọc hiểu 1, 2, 3, 4 SGK và mở rộng từ ngữ chỉ cảm xúc.',
          teacherActivity: '• Tổ chức thảo luận nhóm 4 trả lời 4 câu hỏi đọc hiểu trong SGK.\n• Chốt ý nghĩa bài đọc: Ngày tựu trường là ngày hội ngộ đầm ấm, mở ra một năm học mới nhiều hy vọng.',
          studentActivity: '• Các nhóm thảo luận, viết câu trả lời ra bảng phụ / thẻ từ.\n• Đại diện nhóm trình bày, các nhóm khác nhận xét, bổ sung.',
          digitalTools: ['Trò chơi Hộp Quà Bí Mật trả lời câu hỏi']
        },
        {
          id: 'act4',
          name: '4. Vận dụng & Củng cố (Production)',
          duration: '15 phút',
          objective: 'Nói 1-2 câu chúc bạn nhân ngày đầu năm học và tổng kết bài.',
          teacherActivity: '• Yêu cầu học sinh quay sang bạn cùng bàn, nói lời chúc hoặc lời hẹn thi đua trong năm học.\n• Nhận xét tiết học, tuyên dương tinh thần học tập tích cực.',
          studentActivity: '• Học sinh thực hành nói lời chúc với bạn bè.\n• Lắng nghe nhận xét và chuẩn bị cho tiết học sau.',
          digitalTools: ['Bảng khen thưởng số SmartEdu']
        }
      ],
      assessment: {
        methods: ['Quan sát thái độ đọc bài, nhận xét trực tiếp câu trả lời của học sinh.'],
        tools: ['Bảng kiểm kỹ năng đọc đúng và diễn cảm (Checklist).'],
        rubrics: ['Mức 1: Đọc to, rõ ràng; Mức 2: Đọc diễn cảm đúng dấu câu; Mức 3: Hiểu sâu sắc và liên hệ bản thân tốt.']
      }
    }
  },
  {
    id: 'preset_math_kntt',
    name: 'Mẫu 3: Toán Kết Nối Tri Thức (Khám phá - Trò chơi số)',
    subject: 'Toán',
    grade: 'Lớp 3',
    bookSeries: 'Kết nối tri thức và cuộc sống',
    badge: 'Toán Tiểu học',
    description: 'Cấu trúc bài dạy Toán hiện đại: Khởi động hào hứng, Khám phá quy tắc toán học, Thực hành giải toán và Trò chơi số củng cố.',
    template: {
      title: 'Bài 15: Bảng nhân 6, Bảng chia 6 (Tiết 1)',
      subject: 'Toán',
      grade: 'Lớp 3',
      bookSeries: 'Kết nối tri thức và cuộc sống',
      unit: 'Chủ đề: Phép nhân và phép chia trong phạm vi 1000',
      lessonName: 'Bài 15: Bảng nhân 6 (Trang 45 - 46)',
      duration: '35 phút (1 tiết)',
      objectives: {
        knowledgeAndSkills: [
          'Thành lập được Bảng nhân 6 (từ 6 x 1 đến 6 x 10) dựa trên phép cộng các số hạng bằng nhau.',
          'Vận dụng Bảng nhân 6 để tính nhẩm nhanh và giải quyết bài toán thực tế có lời văn.'
        ],
        coreCompetencies: [
          'Năng lực tư duy và lập luận toán học: Phát hiện quy luật tăng thêm 6 đơn vị giữa các tích liền kề.',
          'Năng lực giải quyết vấn đề toán học: Biết áp dụng phép nhân 6 vào tính toán đồ vật trong cuộc sống.'
        ],
        personalQualities: [
          'Chăm chỉ, cẩn thận, yêu thích môn Toán và tự tin khi giải toán.',
          'Phẩm chất Đạo đức (TT 32/2018): Trung thực khi tự chấm điểm và hỗ trợ bạn cùng bàn.'
        ],
        digitalCompetency: [
          'Mã 1.1.CB1a (CV 3456/BGDĐT): Tương tác trực tiếp trên bảng số điện tử kéo thả phép nhân.'
        ],
        aiIntegration: [
          'QĐ 2422/QĐ-BGDĐT: Trợ lý AI tạo đề toán thực tế có hình ảnh minh họa sinh động.'
        ],
        trafficSafety: [
          'Tích hợp ATGT: Đếm số bánh xe đạp (mỗi xe có 2 bánh, 3 xe đạp 3 bánh...) gắn với quy tắc an toàn.'
        ],
        lifeSkills: [
          'Kỹ năng sống: Tính toán chi tiêu và sắp xếp đồ dùng ngăn nắp theo hàng.'
        ]
      },
      materials: {
        teacher: [
          'Kế hoạch bài dạy CV 2345, máy chiếu/màn hình tương tác, các tấm bìa có 6 chấm tròn.',
          'Bộ que tính toán học thông minh.'
        ],
        student: [
          'SGK Toán 3, vở bài tập, bộ đồ dùng học Toán lớp 3, bảng con.'
        ],
        digitalTools: [
          'Vòng quay may mắn Bảng nhân 6',
          'Mini-game Ai nhanh ai đúng'
        ]
      },
      activities: [
        {
          id: 'act1',
          name: '1. Khởi động (Warm-up)',
          duration: '5 phút',
          objective: 'Ôn tập đếm thêm 6 và tạo hứng thú học tập.',
          teacherActivity: '• Tổ chức trò chơi "Truyền điện": Học sinh nối tiếp nhau đếm thêm 6 (6, 12, 18, 24... 60).\n• Nhận xét, tuyên dương và dẫn dắt vào bài mới: "Hôm nay chúng mình cùng khám phá Bảng nhân 6 nhé!"',
          studentActivity: '• Cả lớp hào hứng tham gia trò chơi truyền điện theo nhịp vỗ tay.',
          digitalTools: ['Đồng hồ đếm ngược tương tác']
        },
        {
          id: 'act2',
          name: '2. Khám phá (Hình thành Bảng nhân 6)',
          duration: '12 phút',
          objective: 'Tự lập và ghi nhớ Bảng nhân 6 thông qua trực quan.',
          teacherActivity: '• Lấy 1 tấm bìa có 6 chấm tròn: "6 được lấy 1 lần, ta viết 6 x 1 = 6."\n• Lấy 2 tấm bìa: "6 được lấy 2 lần, ta có 6 x 2 = 6 + 6 = 12."\n• Hướng dẫn học sinh tương tự lập tiếp các phép tính còn lại đến 6 x 10.',
          studentActivity: '• Học sinh lấy các tấm bìa có 6 chấm tròn trong bộ đồ dùng, thao tác và ghi kết quả vào bảng con.\n• Đọc đồng thanh và đọc cá nhân bảng nhân 6.',
          digitalTools: ['Mô phỏng hình ảnh trực quan tấm bìa chấm tròn trên màn hình']
        },
        {
          id: 'act3',
          name: '3. Luyện tập - Thực hành (Practice)',
          duration: '12 phút',
          objective: 'Làm bài tập 1 (Tính nhẩm) và bài tập 2 (Giải toán có lời văn).',
          teacherActivity: '• Bài 1: Cho học sinh tính nhẩm nhanh theo cặp.\n• Bài 2: Hướng dẫn phân tích đề bài toán thực tế (Mỗi hộp có 6 cái bánh, 4 hộp có bao nhiêu cái bánh?).',
          studentActivity: '• Học sinh làm bài vào vở, 1 học sinh lên bảng giải bài 2: (Bài giải: 4 hộp có số cái bánh là: 6 x 4 = 24 (cái bánh)).\n• Cả lớp nhận xét, đối chiếu kết quả.',
          digitalTools: ['Bảng kiểm tra đáp án tự động']
        },
        {
          id: 'act4',
          name: '4. Vận dụng & Củng cố (Production)',
          duration: '6 phút',
          objective: 'Củng cố bảng nhân 6 qua trò chơi và dặn dò.',
          teacherActivity: '• Tổ chức trò chơi "Vòng quay may mắn": Quay vào phép nhân nào, học sinh đọc nhanh kết quả.\n• Dặn dò học sinh về nhà học thuộc bảng nhân 6.',
          studentActivity: '• Học sinh xung phong quay số và trả lời.\n• Lắng nghe dặn dò của giáo viên.',
          digitalTools: ['Vòng quay may mắn SmartEdu']
        }
      ],
      assessment: {
        methods: ['Quan sát thao tác đồ dùng và kiểm tra kết quả bài làm trong vở.'],
        tools: ['Phiếu đánh giá nhanh, Bảng kiểm kỹ năng tính nhẩm.'],
        rubrics: ['Mức 1: Thuộc bảng nhân có hỗ trợ; Mức 2: Tính nhẩm nhanh đúng; Mức 3: Giải toán có lời văn chính xác.']
      }
    }
  }
];
