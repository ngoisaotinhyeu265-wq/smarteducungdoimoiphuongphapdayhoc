/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FullLessonPlan, LessonPlan, TeacherScript, TeacherScriptSection, TeacherScriptPart } from '../types';

/**
 * Generates a comprehensive, highly pedagogical Teacher's Script (Lời dẫn của giáo viên)
 * - 100% Classroom English for English subject (Primary level, crystal clear, engaging, TPR cues)
 * - 100% Pedagogical Vietnamese for other subjects (Toán, Tiếng Việt, TNXH, Khoa học...)
 * - Includes: Classroom management cues, Lead-in, Vocabulary modeling, Sentence pattern teaching,
 *   Game rules & facilitation, Pair work (Luyện nhóm đôi), Group of 4 (Luyện nhóm 4), Individual work,
 *   Formative feedback, Wrap-up & Goodbye routines.
 */
export function generateTeacherScript(plan: FullLessonPlan | LessonPlan, customOptions?: {
  subject?: string;
  grade?: string;
  bookSeries?: string;
}): TeacherScript {
  const isFullPlan = 'activities' in plan && plan.activities.length > 0 && typeof plan.activities[0] === 'object' && 'teacherActivity' in plan.activities[0];
  const fp = plan as FullLessonPlan;
  
  const subject = customOptions?.subject || plan.subject || 'Tiếng Anh';
  const grade = String(customOptions?.grade || plan.grade || 'Lớp 3');
  const bookSeries = customOptions?.bookSeries || (isFullPlan ? fp.bookSeries : 'Global Success') || 'Global Success';
  const isEn = subject === 'Tiếng Anh' || (isFullPlan && fp.language === 'en');
  const gradeNum = grade.replace(/[^0-9]/g, '') || '3';
  const lessonTitle = plan.lessonName || 'Lesson Plan';
  const unit = isFullPlan ? fp.unit || 'Unit 1' : 'Unit 1';
  const lesson = isFullPlan ? fp.lesson || 'Lesson 1' : 'Lesson 1';

  // Extract vocabulary and sentences if available
  let vocabList = 'pen, pencil, ruler, book';
  let sentenceList = "What's this? - It's a pen.";

  if (isFullPlan) {
    const act2 = fp.activities?.find(a => a.id === 'act2' || a.name.toLowerCase().includes('discovery') || a.name.toLowerCase().includes('khám phá'));
    if (act2 && act2.content) {
      vocabList = act2.content.replace(/Task \d+:?/i, '').replace(/Student's Book/i, '').trim();
    }
  }

  if (isEn) {
    return generateEnglishTeacherScript(lessonTitle, unit, lesson, grade, gradeNum, bookSeries, vocabList, sentenceList, fp);
  } else {
    return generateVietnameseTeacherScript(lessonTitle, subject, grade, bookSeries, fp);
  }
}

function generateEnglishTeacherScript(
  lessonTitle: string,
  unit: string,
  lesson: string,
  grade: string,
  gradeNum: string,
  bookSeries: string,
  vocabList: string,
  sentenceList: string,
  fp?: FullLessonPlan
): TeacherScript {
  const isGrade12 = gradeNum === '1' || gradeNum === '2';

  const sections: TeacherScriptSection[] = [
    // ----------------------------------------------------
    // STAGE 1: WARM-UP & REVIEW (4-5 mins)
    // ----------------------------------------------------
    {
      activityId: 'stage1_warmup',
      activityName: 'Stage 1. Warm-up & Review (Khởi động & Ổn định lớp)',
      duration: '4-5 mins',
      stageType: 'warm_up',
      gameName: isGrade12 ? 'Freeze Dance & Greet' : 'Pass the Magic Ball & Quick Recall',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_1_1',
          type: 'classroom_management',
          title: 'Classroom Management & Greeting Routine (Hiệu lệnh ổn định & Chào hỏi)',
          groupFormat: 'whole_class',
          teacherSpeech: `Good morning, class! How are you today?\nLet's get ready! 1, 2, 3 - Eyes on me!\nHands on your desks, sit up straight and smile!`,
          teacherAction: 'T stands in the center with an energetic smile, claps hands rhythmically (clap-clap, clap-clap-clap), and makes eye contact with all pupils.',
          expectedStudentResponse: `Good morning, Teacher! We are happy and ready!\n(Pupils clap in rhythm: 1, 2 - Eyes on you! and sit nicely).`,
          timing: '1 min'
        },
        {
          id: 'script_1_2',
          type: 'game_instruction',
          title: isGrade12 ? 'Warm-up Song & Action Game (Dẫn vào bài hát vận động)' : 'Warm-up Game: Pass the Magic Ball (Luật chơi & Dẫn dắt trò chơi)',
          groupFormat: 'whole_class',
          teacherSpeech: isGrade12
            ? `Are you ready to move? Stand up, please! Let's listen to our greeting song and do the actions together. Jump, jump, clap your hands!`
            : `Class, look at my hand! I have a Magic Ball! While the music plays, pass the ball quickly to your friend. When the music STOPS, the pupil holding the ball will name one school item on the screen! Are you ready? 3, 2, 1 - GO!`,
          teacherAction: 'T plays upbeat background music, models the passing gesture with the front row pupils, and uses a gentle countdown timer on the smart board.',
          expectedStudentResponse: `Yes, we are ready! (Pupils pass the ball eagerly, sing along, and the pupil holding the ball speaks loudly and proudly).`,
          timing: '2-3 mins'
        },
        {
          id: 'script_1_3',
          type: 'warm_up_lead_in',
          title: 'Lead-in to the New Lesson (Dẫn nhập vào bài học mới)',
          groupFormat: 'whole_class',
          teacherSpeech: `Excellent job, everyone! Big applause for our superstars! Today, we are going to explore ${unit} - ${lesson}. We will discover lots of fun new words and cool sentences! Open your books to the target page, please!`,
          teacherAction: 'T gestures to open books, writes the unit title beautifully on the board, and rewards the whole class with the first big Golden Star.',
          expectedStudentResponse: `(Pupils cheer happily, open their Student Books, and look at the smart screen).`,
          timing: '1 min'
        }
      ]
    },

    // ----------------------------------------------------
    // STAGE 2: EXPLORATION (Khám phá ngữ cảnh - 5-6 mins)
    // ----------------------------------------------------
    {
      activityId: 'stage2_exploration',
      activityName: 'Stage 2. Exploration - Context Discovery (Khám phá ngữ cảnh)',
      duration: '5-6 mins',
      stageType: 'exploration',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_2_1',
          type: 'task_guidance',
          title: 'Context Setting & Visual Elicitation (Quan sát tranh & Khám phá ngữ cảnh)',
          groupFormat: 'whole_class',
          teacherSpeech: `Look at Picture A on the screen/book! Who can you see? Yes, that's Lucy and Bill! Where are they? In the classroom! What are they talking about?\nLet's listen to the audio track. First time: Just listen and point with your finger. Ready? Listen!`,
          teacherAction: 'T points to the context pictures on the board/screen, mimes listening by cupping hand behind ear, and plays track from audio player.',
          expectedStudentResponse: `(Pupils look at the pictures, point their index fingers at speech bubbles, and listen attentively to discover the context).`,
          timing: '3 mins'
        },
        {
          id: 'script_2_2',
          type: 'task_guidance',
          title: 'Gist Discovery & Schema Activation (Khám phá ý chính & Dự đoán)',
          groupFormat: 'whole_class',
          teacherSpeech: `What did Lucy say to Bill? Can anyone guess what item they are looking at?\nListen one more time and notice when they use the special words! Ready? Track playing now!`,
          teacherAction: 'T asks guiding questions, prompts student curiosity, and plays the audio second time to confirm pupils\' discoveries.',
          expectedStudentResponse: `(Pupils answer eagerly with guesses and point out key elements in the picture scene).`,
          timing: '2-3 mins'
        }
      ]
    },

    // ----------------------------------------------------
    // STAGE 3: KNOWLEDGE CONSTRUCTION (Hình thành kiến thức mới - 8-9 mins)
    // ----------------------------------------------------
    {
      activityId: 'stage3_knowledge_construction',
      activityName: 'Stage 3. Knowledge Construction - Phonics, Vocabulary & Sentence Pattern Modeling (Hình thành kiến thức mới)',
      duration: '8-9 mins',
      stageType: 'knowledge_construction',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_3_1',
          type: 'vocab_teaching',
          title: 'Vocabulary & Phonics Modeling (Dạy phát âm từ vựng & Chuẩn hóa khẩu hình)',
          groupFormat: 'whole_class',
          teacherSpeech: `Now, listen and repeat after me! Look at my mouth: /p/ - /e/ - /n/ -> pen! Again, everyone: "pen"!\nRow 1, please! "pen"!\nRow 2, let me hear your strong voices! "pen"!\nMinh, your turn! Great pronunciation! Two thumbs up for you!`,
          teacherAction: 'T holds up flashcard with clear illustration, points to mouth shape for correct phonics articulation, and uses 3-step drilling: Choral -> Rows -> Individual.',
          expectedStudentResponse: `Whole class: "pen!" -> Row 1: "pen!" -> Row 2: "pen!" -> Individual: "pen!"`,
          timing: '4 mins'
        },
        {
          id: 'script_3_2',
          type: 'sentence_pattern',
          title: 'Sentence Pattern Modeling & Concept Check (Hình thành mẫu câu & Kiểm tra độ hiểu CCQs)',
          groupFormat: 'whole_class',
          teacherSpeech: `Now listen carefully to the question: "${sentenceList.split('|')[0] || "What's this? - It's a pen."}"\nListen to the intonation: "What's this?" (voice goes down). And the answer: "It's a pen."\nLet's practice with me! I ask, you answer: "What's this?" -> ... Perfect! Now swap: You ask, I answer! Ready? 1, 2, 3, ask me!`,
          teacherAction: 'T writes the sentence frame on the board with color-coded slots (Question word / Subject / Answer frame), highlights substitutions, and conducts Concept Checking Questions (CCQs).',
          expectedStudentResponse: `Teacher: "What's this?" -> Class: "It's a pen!"\nClass: "What's this?" -> Teacher: "It's a ruler!"`,
          timing: '4-5 mins'
        }
      ]
    },

    // ----------------------------------------------------
    // STAGE 4: PRACTICE (Luyện tập thực hành - 10-12 mins)
    // ----------------------------------------------------
    {
      activityId: 'stage4_practice',
      activityName: 'Stage 4. Guided Practice & Drills (Luyện tập có hướng dẫn: Cá nhân, Nhóm đôi & Nhóm 4)',
      duration: '10-12 mins',
      stageType: 'practice',
      gameName: 'Slap the Board & Pair Dialogue Relay',
      groupFormat: 'pair',
      parts: [
        {
          id: 'script_4_1',
          type: 'individual_work',
          title: 'Individual Practice: Look, Point and Whisper (Luyện tập cá nhân độc lập)',
          groupFormat: 'individual',
          teacherSpeech: `Now, each of you work individually for 1 minute. Look at all 4 pictures in your book: a, b, c, d. Point with your finger and whisper the words and sentences to yourself. 1 minute starts NOW!`,
          teacherAction: 'T starts a 1-minute countdown timer on screen, walks quietly around the room, and nods encouragingly to pupils.',
          expectedStudentResponse: `(Each pupil points to pictures in their book and whispers the target language independently).`,
          timing: '1-2 mins'
        },
        {
          id: 'script_4_2',
          type: 'pair_work',
          title: 'Pair Work: Ask & Answer with Partner (Hiệu lệnh luyện tập theo cặp đôi)',
          groupFormat: 'pair',
          teacherSpeech: `Time for Pair Work! Turn to your desk-mate in 3, 2, 1!\nPupil A: Point to the picture and ask: "What's this?"\nPupil B: Look and answer: "It's a..."\nThen SWAP roles for all 4 pictures! You have 3 minutes! Practice actively! Go!`,
          teacherAction: 'T models pair interaction with a student in the front row, signals with hands to show role swapping, and circulates to monitor and give immediate phonetic praise.',
          expectedStudentResponse: `(Pupil A points to picture a: "What's this?" -> Pupil B: "It's a pencil." Then Pupil B asks for picture b).`,
          timing: '4-5 mins'
        },
        {
          id: 'script_4_3',
          type: 'group_4',
          title: 'Group of 4 / Mini-Game: Fast Relay Challenge (Luyện tập nhóm 4 / Trò chơi tiếp sức)',
          groupFormat: 'group_4',
          teacherSpeech: `Now, let's form Groups of 4! Turn your chairs around to face each other!\nGroup leader, raise your hand! Each member takes turns asking the next friend. The fastest group where all 4 members complete the dialogue with zero mistakes gets 3 Super Stars! 3, 2, 1 - START!`,
          teacherAction: 'T assigns group leaders, times the relay race with a digital buzzer, and observes collaboration within the 4-student teams.',
          expectedStudentResponse: `(Group members collaborate quickly: Member 1 -> Member 2 -> Member 3 -> Member 4 -> High five together: "Finished!").`,
          timing: '3-4 mins'
        }
      ]
    },

    // ----------------------------------------------------
    // STAGE 5: PRODUCTION & WRAP-UP (Vận dụng & Tổng kết - 6-8 mins)
    // ----------------------------------------------------
    {
      activityId: 'stage5_production',
      activityName: 'Stage 5. Production, Application & Wrap-up (Vận dụng thực tế & Củng cố)',
      duration: '6-8 mins',
      stageType: 'production',
      gameName: 'Secret School Bag & Communicative Role-Play',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_5_1',
          type: 'game_instruction',
          title: 'Communicative Game: Secret School Bag (Trò chơi vận dụng thực tế với vật thật)',
          groupFormat: 'whole_class',
          teacherSpeech: `Who wants to play "Secret School Bag"? I invite 2 volunteers to come to the front!\nVolunteer 1: Put your hand inside the bag, touch an object (NO peeking!), and ask the class: "What's this?"\nVolunteer 2 or Class: Guess: "It's a ruler!"\nLet's see if our guess is correct! Pull it out! Wow, correct! Awesome!`,
          teacherAction: 'T holds a colorful mystery bag containing real classroom objects (pen, pencil, ruler, eraser), invites eager students to the front, and encourages realistic communication.',
          expectedStudentResponse: `(Student in front touches object: "What's this?" -> Whole class eagerly guesses: "It's a book!" -> Student shows book: "Yes, it is!").`,
          timing: '3-4 mins'
        },
        {
          id: 'script_5_2',
          type: 'wrap_up_praise',
          title: 'Lesson Summary, Rewards & Goodbye Routine (Tổng kết bài, Khen thưởng & Dặn dò)',
          groupFormat: 'whole_class',
          teacherSpeech: `Class, you did an extraordinary job today! Let's count our stars: Team 1 has 5 stars, Team 2 has 5 stars! Both teams are WINNERS!\nWho can tell me what 2 main words we learned today? Yes! "pen" and "pencil"!\nRemember to practice reading the words to your parents at home for 5 minutes.\nTime is up! Stand up, please! Sing with me: "Goodbye, teacher! See you again!" Bye-bye, class!`,
          teacherAction: 'T summarizes main points on board, awards stickers, leads goodbye wave, and ensures pupils pack their school bags neatly.',
          expectedStudentResponse: `Pupils stand up, wave hands, and say cheerfully: "Thank you, teacher! Goodbye, teacher! Have a nice day!"`,
          timing: '2-3 mins'
        }
      ]
    }
  ];

  return {
    lessonTitle: lessonTitle || `${unit} - ${lesson}`,
    subject: 'Tiếng Anh',
    grade: grade,
    bookSeries: bookSeries,
    language: 'en',
    totalDuration: '35 minutes',
    classroomManagementCues: [
      {
        callOut: '1, 2, 3 - Eyes on me!',
        response: '1, 2 - Eyes on you!',
        purpose: 'Thu hút sự chú ý tức thì của cả lớp về phía giáo viên và màn hình.'
      },
      {
        callOut: 'Class, class!',
        response: 'Yes, yes!',
        purpose: 'Ổn định trật tự khi lớp học đang thảo luận nhóm ồn ào.'
      },
      {
        callOut: 'Hands on heads! Hands on desks!',
        response: '(Pupils place hands on desks silently)',
        purpose: 'Dừng mọi hoạt động tay chân, sẵn sàng lắng nghe nhiệm vụ mới.'
      },
      {
        callOut: 'Ready, steady?',
        response: 'GO!',
        purpose: 'Hiệu lệnh bắt đầu trò chơi hoặc hoạt động nhóm.'
      }
    ],
    sections,
    pedagogicalTips: [
      'Sử dụng ngôn ngữ cơ thể (Body Language) và hình ảnh trực quan tối đa để học sinh lớp 1-5 hiểu ngay nghĩa mà không cần dịch sang tiếng Việt.',
      'Khen ngợi cụ thể và tích cực: "Good job!", "Super clear voice!", "High five!" kèm phần thưởng sao sticker.',
      'Quy định thời gian rõ ràng trước khi cho học sinh luyện tập nhóm đôi hoặc nhóm 4 bằng đồng hồ đếm ngược sinh động.'
    ],
    createdAt: new Date().toISOString()
  };
}

function generateVietnameseTeacherScript(
  lessonTitle: string,
  subject: string,
  grade: string,
  bookSeries: string,
  fp?: FullLessonPlan
): TeacherScript {
  const sections: TeacherScriptSection[] = [
    // ----------------------------------------------------
    // HOẠT ĐỘNG 1: KHỞI ĐỘNG (4-5 phút)
    // ----------------------------------------------------
    {
      activityId: 'stage1_warmup',
      activityName: 'Hoạt động 1: Khởi động & Dẫn nhập vào bài (Warm-up & Lead-in)',
      duration: '4-5 phút',
      stageType: 'warm_up',
      gameName: 'Đố vui thông thái & Hộp quà bí mật',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_vn_1_1',
          type: 'classroom_management',
          title: 'Hiệu lệnh ổn định nề nếp lớp học đầu giờ',
          groupFormat: 'whole_class',
          teacherSpeech: `Cô chào cả lớp mình! Hôm nay các con có khỏe không nào?\nCả lớp chú ý: "Tập trung cao độ!"\nTất cả các con hãy ngồi ngay ngắn, để sách vở và đồ dùng môn ${subject} lên góc bàn và cùng nở một nụ cười thật tươi nào!`,
          teacherAction: 'Giáo viên đứng ở vị trí trung tâm, giọng nói ấm áp, bao quát toàn bộ lớp học, gõ nhịp 2 tiếng thước kẻ nhẹ để học sinh nhanh chóng ổn định chỗ ngồi.',
          expectedStudentResponse: `Cả lớp đồng thanh: "Chăm chú lắng nghe!" và ngồi ngay ngắn, chuẩn bị sẵn sàng đồ dùng học tập.`,
          timing: '1 phút'
        },
        {
          id: 'script_vn_1_2',
          type: 'game_instruction',
          title: 'Dẫn dắt trò chơi khởi động: Hộp quà bí mật',
          groupFormat: 'whole_class',
          teacherSpeech: `Để bắt đầu tiết học hôm nay thật nhiều niềm vui, cô mang đến cho lớp mình một "Hộp quà bí mật"! Ẩn sau mỗi món quà là một câu đố cực kỳ thú vị. Bạn nào giơ tay nhanh và trả lời đúng sẽ mang về cho tổ mình 1 Ngôi sao may mắn đầu tiên! Các con đã sẵn sàng chưa nào?`,
          teacherAction: 'Giáo viên trình chiếu hình ảnh hộp quà bí mật trên màn hình tương tác, điều phối lượt giơ tay của học sinh các tổ.',
          expectedStudentResponse: `Học sinh giơ tay sôi nổi: "Con thưa cô, con sẵn sàng ạ!" và hào hứng giải câu đố khởi động.`,
          timing: '2-3 phút'
        },
        {
          id: 'script_vn_1_3',
          type: 'warm_up_lead_in',
          title: 'Dẫn nhập tự nhiên vào bài học mới',
          groupFormat: 'whole_class',
          teacherSpeech: `Rất tuyệt vời! Cả lớp hãy dành một tràng pháo tay thật lớn để khen ngợi các bạn đã trả lời rất xuất sắc nào! Từ những hình ảnh và câu đố vừa rồi, cô và các con hôm nay sẽ cùng nhau khám phá một bài học vô cùng bổ ích: "${lessonTitle}". Cô mời các con mở sách giáo khoa trang tương ứng!`,
          teacherAction: 'Giáo viên viết tên bài học lên bảng bằng nét chữ nắn nót, chiếu trang sách mẫu trên màn hình.',
          expectedStudentResponse: `Học sinh mở sách giáo khoa, ghi tên bài vào vở và hướng ánh mắt lên bảng.`,
          timing: '1 phút'
        }
      ]
    },

    // ----------------------------------------------------
    // HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI (10-12 phút)
    // ----------------------------------------------------
    {
      activityId: 'stage2_exploration',
      activityName: 'Hoạt động 2: Hình thành kiến thức mới (Khám phá & Chiếm lĩnh kiến thức)',
      duration: '10-12 phút',
      stageType: 'exploration',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_vn_2_1',
          type: 'task_guidance',
          title: 'Hướng dẫn quan sát tranh ảnh & Đặt câu hỏi gợi mở khám phá',
          groupFormat: 'whole_class',
          teacherSpeech: `Các con hãy quan sát bức tranh trong mục Khám phá trên màn hình và trong sách giáo khoa.\nBạn nào có thể cho cô biết: Con nhìn thấy những hình ảnh gì trong tranh? Các sự vật hay nhân vật trong tranh đang diễn ra điều gì nào?`,
          teacherAction: 'Giáo viên dùng que chỉ bảng chỉ vào từng chi tiết trọng tâm trong tranh, dừng lại chờ học sinh suy nghĩ từ 5-10 giây.',
          expectedStudentResponse: `Học sinh quan sát kỹ, tự tin giơ tay phát biểu ý kiến theo suy nghĩ của bản thân.`,
          timing: '3 phút'
        },
        {
          id: 'script_vn_2_2',
          type: 'vocab_teaching',
          title: 'Giảng giải kiến thức trọng tâm & Rút ra quy tắc / Khái niệm mới',
          groupFormat: 'whole_class',
          teacherSpeech: `Đúng như bạn vừa phát biểu, các con hãy chú ý vào quy tắc/khái niệm quan trọng này nhé! Khi chúng ta thực hiện, các con cần ghi nhớ 2 bước quan trọng:\n- Bước 1: Quan sát và xác định rõ yêu cầu bài toán/nhiệm vụ.\n- Bước 2: Áp dụng đúng quy tắc để tìm ra kết quả chính xác nhất.\nCô mời một bạn đọc to lại phần ghi nhớ trong khung màu vàng cho cả lớp cùng nghe nào!`,
          teacherAction: 'Giáo viên dùng phấn màu gạch chân từ khóa cốt lõi trên bảng, giải thích cặn kẽ bằng ví dụ trực quan sinh động.',
          expectedStudentResponse: `1 học sinh đọc to, rõ ràng phần ghi nhớ; cả lớp đọc thầm theo.`,
          timing: '4 phút'
        },
        {
          id: 'script_vn_2_3',
          type: 'sentence_pattern',
          title: 'Làm mẫu ví dụ cụ thể & Kiểm tra mức độ thấu hiểu của học sinh',
          groupFormat: 'whole_class',
          teacherSpeech: `Bây giờ cô sẽ làm mẫu ví dụ đầu tiên trên bảng. Các con cùng theo dõi nhé!\n(Cô thực hiện từng bước mẫu rõ ràng). Có bạn nào chưa hiểu rõ bước nào không?\nNếu các con đã nắm chắc cách làm, hãy giơ một ngón tay cái lên để cô biết nào! Tuyệt vời, 100% cánh tay đã giơ lên!`,
          teacherAction: 'Giáo viên làm mẫu từng bước, vừa viết vừa giải thích lý do, quan sát nét mặt từng học sinh để đảm bảo cả lớp đều hiểu.',
          expectedStudentResponse: `Học sinh chăm chú theo dõi từng nét bút của cô giáo và giơ ngón tay cái biểu thị đã hiểu bài.`,
          timing: '3-4 phút'
        }
      ]
    },

    // ----------------------------------------------------
    // HOẠT ĐỘNG 3: LUYỆN TẬP - THỰC HÀNH (12-14 phút)
    // ----------------------------------------------------
    {
      activityId: 'stage3_practice',
      activityName: 'Hoạt động 3: Luyện tập - Thực hành (Cá nhân, Nhóm đôi & Nhóm 4)',
      duration: '12-14 phút',
      stageType: 'practice',
      gameName: 'Trò chơi Tiếp sức bảng con & Vòng tròn tri thức',
      groupFormat: 'pair',
      parts: [
        {
          id: 'script_vn_3_1',
          type: 'individual_work',
          title: 'Thực hành cá nhân trên bảng con / Vở bài tập',
          groupFormat: 'individual',
          teacherSpeech: `Bây giờ chúng ta cùng bước vào phần Luyện tập cá nhân với Bài tập 1. Các con lấy bảng con và phấn/bút dạ ra sẵn sàng!\nCô cho các con thời gian 2 phút để tự hoàn thành bài tập vào bảng con. 2 phút bắt đầu!`,
          teacherAction: 'Giáo viên bấm đồng hồ đếm ngược, đi lại nhẹ nhàng giữa các dãy bàn để quan sát và hỗ trợ những em học sinh còn lúng túng.',
          expectedStudentResponse: `Học sinh tập trung làm bài cá nhân độc lập vào bảng con hoặc vở bài tập.`,
          timing: '3 phút'
        },
        {
          id: 'script_vn_3_2',
          type: 'pair_work',
          title: 'Hiệu lệnh & Hướng dẫn thảo luận nhóm đôi (2 bạn cùng bàn)',
          groupFormat: 'pair',
          teacherSpeech: `Hết giờ làm bài cá nhân! Bây giờ các con hãy quay sang bạn cùng bàn của mình:\n- Bạn thứ nhất chia sẻ cách làm và kết quả của mình.\n- Bạn thứ hai lắng nghe, nhận xét và đối chiếu kết quả.\nNếu hai bạn có đáp án khác nhau, hãy cùng nhau giải thích xem tại sao nhé! Thời gian cho nhóm đôi là 3 phút. Bắt đầu!`,
          teacherAction: 'Giáo viên ra hiệu lệnh tay xoay người ghép cặp, đi từng bàn lắng nghe các cặp trao đổi và động viên sự tương tác.',
          expectedStudentResponse: `Học sinh quay mặt vào nhau theo cặp đôi, đối chiếu bảng con và trao đổi tích cực: "Bạn làm thế nào ra kết quả này?", "Mình thấy kết quả của bạn đúng rồi!".`,
          timing: '4 phút'
        },
        {
          id: 'script_vn_3_3',
          type: 'group_4',
          title: 'Hiệu lệnh & Tổ chức hoạt động nhóm 4 (Phân công nhiệm vụ rõ ràng)',
          groupFormat: 'group_4',
          teacherSpeech: `Rất tốt! Bây giờ bàn trên quay xuống bàn dưới để ghép thành Nhóm 4 bạn!\n- Bạn Nhóm trưởng điều hành các bạn cùng thảo luận.\n- Bạn Thư ký ghi kết quả chung của nhóm vào phiếu học tập lớn.\n- Hai bạn còn lại kiểm tra và chuẩn bị đại diện nhóm lên báo cáo.\nNhóm nào hoàn thành nhanh nhất và trình bày đẹp nhất sẽ nhận được 3 Bông hoa điểm mười! Các nhóm bắt đầu!`,
          teacherAction: 'Giáo viên phát phiếu nhóm khổ A3, bấm giờ 4 phút, quan sát kỹ năng hợp tác và tinh thần trách nhiệm của từng thành viên trong nhóm.',
          expectedStudentResponse: `Học sinh nhanh chóng ghép nhóm 4, phân công vai trò rành mạch, cùng nhau hoàn thành phiếu học tập lớn của nhóm.`,
          timing: '4-5 phút'
        }
      ]
    },

    // ----------------------------------------------------
    // HOẠT ĐỘNG 4: VẬN DỤNG & CỦNG CỐ (5-7 phút)
    // ----------------------------------------------------
    {
      activityId: 'stage4_production',
      activityName: 'Hoạt động 4: Vận dụng thực tế & Củng cố dặn dò (Application & Wrap-up)',
      duration: '5-7 phút',
      stageType: 'production',
      gameName: 'Rung chuông vàng nhí / Ai nhanh ai đúng',
      groupFormat: 'whole_class',
      parts: [
        {
          id: 'script_vn_4_1',
          type: 'game_instruction',
          title: 'Trò chơi vận dụng: Ai nhanh ai đúng liên hệ thực tiễn',
          groupFormat: 'whole_class',
          teacherSpeech: `Để xem lớp mình đã vận dụng bài học giỏi như thế nào vào cuộc sống hàng ngày, cô có một tình huống thực tế sau đây:\n(Cô nêu tình huống thực tế gắn liền với cuộc sống của học sinh).\nCô mời các con suy nghĩ nhanh trong 30 giây để đưa ra giải pháp giúp bạn trong tình huống này nào!`,
          teacherAction: 'Giáo viên nêu câu hỏi mở kích thích tư duy giải quyết vấn đề sáng tạo của học sinh.',
          expectedStudentResponse: `Nhiều cánh tay giơ lên, học sinh hào hứng liên hệ bản thân và đưa ra câu trả lời sáng tạo, đúng bản chất bài học.`,
          timing: '3 phút'
        },
        {
          id: 'script_vn_4_2',
          type: 'wrap_up_praise',
          title: 'Tổng kết bài học, Khen thưởng và Dặn dò về nhà',
          groupFormat: 'whole_class',
          teacherSpeech: `Tiết học của chúng ta hôm nay diễn ra vô cùng sôi nổi và hiệu quả! Cô nhiệt liệt biểu dương tinh thần tự giác, hăng hái phát biểu của cả lớp, đặc biệt là Tổ 2 và các bạn nhóm 3 đã làm việc rất ăn ý!\nQua bài học này, các con nhớ áp dụng kiến thức vào thực tế nhé.\nVề nhà, các con hãy xem lại bài, hoàn thành các bài tập còn lại trong Vở bài tập và chuẩn bị trước bài học cho ngày mai.\nCô cảm ơn cả lớp mình! Chúc các con luôn chăm ngoan, học giỏi!`,
          teacherAction: 'Giáo viên ghi điểm tổng kết thi đua của các tổ lên góc bảng, tặng sticker hoa điểm 10 và tươi cười chào tạm biệt học sinh.',
          expectedStudentResponse: `Cả lớp đứng dậy nghiêm trang, đồng thanh: "Chúng con cảm ơn cô giáo ạ! Chúng con chào cô ạ!"`,
          timing: '2-3 phút'
        }
      ]
    }
  ];

  return {
    lessonTitle: lessonTitle || `Kế hoạch bài dạy môn ${subject}`,
    subject: subject,
    grade: grade,
    bookSeries: bookSeries,
    language: 'vi',
    totalDuration: '35 phút (1 tiết)',
    classroomManagementCues: [
      {
        callOut: 'Lớp chú ý - Nghiêm!',
        response: 'Sẵn sàng!',
        purpose: 'Ổn định nhanh trật tự và tư thế ngồi chuẩn của học sinh đầu giờ hoặc sau trò chơi.'
      },
      {
        callOut: 'Tập trung cao độ!',
        response: 'Chăm chú lắng nghe!',
        purpose: 'Thu hút sự chú ý khi chuyển sang nội dung kiến thức mới hoặc giảng giải quy tắc.'
      },
      {
        callOut: 'Bảng con sẵn sàng?',
        response: 'Sẵn sàng giơ cao!',
        purpose: 'Hiệu lệnh đồng loạt giơ bảng con để giáo viên kiểm tra kết quả cả lớp.'
      },
      {
        callOut: 'Hết giờ thảo luận!',
        response: '(Học sinh ngồi ngay ngắn, quay mắt về phía bảng)',
        purpose: 'Kết thúc hoạt động nhóm đôi hoặc nhóm 4 một cách dứt khoát.'
      }
    ],
    sections,
    pedagogicalTips: [
      'Giọng nói của giáo viên cần to, rõ ràng, truyền cảm, ngắt nghỉ đúng chỗ để học sinh tiểu học nghe rõ từng hiệu lệnh.',
      'Sử dụng các khẩu lệnh ngắn gọn, dứt khoát kết hợp với tiếng gõ thước kẻ hoặc chuông báo hiệu để rèn nếp lớp.',
      'Khen ngợi kịp thời và cụ thể vào hành động đúng của học sinh để tạo động lực học tập tích cực.'
    ],
    createdAt: new Date().toISOString()
  };
}
