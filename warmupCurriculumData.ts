/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WarmupType, WarmupGrade, WarmupIdea, WarmupScript, StudentProfile } from '../types/warmup';

export interface WarmupTypeOption {
  type: WarmupType;
  label: string;
  emoji: string;
  shortDesc: string;
  energyRating: number;
  popularFor: string;
}

export const WARMUP_TYPES_CATALOG: WarmupTypeOption[] = [
  {
    type: 'ai_creative_mix',
    label: 'AI Creative Mix (Đặc Biệt ⭐)',
    emoji: '✨',
    shortDesc: 'Kết hợp 2-4 thể loại (Talk show + Drama + Chant + Tương tác) tạo màn diễn bùng nổ.',
    energyRating: 5,
    popularFor: 'Khởi động nổi bật, tiết thao giảng, học sinh năng động'
  },
  {
    type: 'mini_drama',
    label: 'Mini Drama (Kịch Ngắn)',
    emoji: '🎭',
    shortDesc: 'Tiểu phẩm 3-5 phút với tình huống hài hước, bất ngờ tại lớp học, sở thú, công viên.',
    energyRating: 5,
    popularFor: 'Học sinh thích diễn xuất, nhập vai'
  },
  {
    type: 'rhyme_chant',
    label: 'Rhyme / Chant (Vè & Rap Nhịp Điệu)',
    emoji: '🥁',
    shortDesc: 'Nhịp điệu sôi nổi Call & Response (Leader hô - Cả lớp vỗ tay đáp lời theo nhịp điệu).',
    energyRating: 5,
    popularFor: 'Luyện ngữ điệu, phát âm, từ vựng và vận động toàn thân'
  },
  {
    type: 'talk_show',
    label: 'Talk Show (Good Morning Kids!)',
    emoji: '🎤',
    shortDesc: 'MC nhí dẫn dắt phỏng vấn khách mời đặc biệt, đối thoại hóm hỉnh với khán giả.',
    energyRating: 4,
    popularFor: 'Học sinh nói tiếng Anh tự tin, MC nhí'
  },
  {
    type: 'song',
    label: 'Action Song & Sing-Along',
    emoji: '🎶',
    shortDesc: 'Bài hát vận động ngắn không bản quyền, kết hợp động tác múa tay vui nhộn.',
    energyRating: 5,
    popularFor: 'Grade 1, 2, 3, tạo không khí hào hứng'
  },
  {
    type: 'game_show',
    label: 'Game Show Lớp Học',
    emoji: '🎲',
    shortDesc: 'Who Am I, Mystery Box, Quick Quiz, Hot Seat với sự dẫn dắt của đội trưởng nhí.',
    energyRating: 5,
    popularFor: 'Kích thích tư duy, phản xạ nhanh'
  },
  {
    type: 'news_show',
    label: 'Good Morning School News',
    emoji: '📺',
    shortDesc: 'Bản tin thời sự vui nhộn: MC thời sự + Phóng viên hiện trường + Bản tin thời tiết.',
    energyRating: 4,
    popularFor: 'Grade 4, 5, phong thái chuyên nghiệp, tự tin'
  },
  {
    type: 'interview',
    label: 'Junior Interview / Phỏng Vấn',
    emoji: '🎙️',
    shortDesc: 'Phóng viên nhí cầm micro phỏng vấn các bạn trong lớp về sở thích, bạn bè, gia đình.',
    energyRating: 4,
    popularFor: 'Thực hành mẫu câu hỏi - đáp tự nhiên'
  },
  {
    type: 'poem_poetry',
    label: 'Poem & Rhythm Recitation',
    emoji: '📖',
    shortDesc: 'Đọc thơ nhịp điệu có vần điệu, kết hợp cử chỉ điệu bộ biểu cảm.',
    energyRating: 3,
    popularFor: 'Grade 1, 2, rèn phát âm êm tai'
  },
  {
    type: 'role_play',
    label: 'Role-play Giao Tiếp Thực Tế',
    emoji: '🤝',
    shortDesc: 'Tình huống gặp gỡ bạn mới, mua sắm đồ dùng học tập, đi lạc tìm đường.',
    energyRating: 4,
    popularFor: 'Thực hành ngôn ngữ tình huống thực tế'
  }
];

export const DEFAULT_STUDENT_ROSTER: StudentProfile[] = [
  { id: 'st_1', name: 'Anna', gradeClass: '4A', interest: 'Singing & Dancing', talent: 'Singing', speakingAbility: 'confident' },
  { id: 'st_2', name: 'Ben', gradeClass: '4A', interest: 'Football & Jokes', talent: 'Acting', speakingAbility: 'confident' },
  { id: 'st_3', name: 'Lucy', gradeClass: '4A', interest: 'Drawing & Reading', talent: 'Speaking', speakingAbility: 'confident' },
  { id: 'st_4', name: 'Tom', gradeClass: '4A', interest: 'Games & Comics', talent: 'Comedy', speakingAbility: 'moderate' },
  { id: 'st_5', name: 'Mai', gradeClass: '4A', interest: 'Music & Storytelling', talent: 'Hosting', speakingAbility: 'confident' }
];

export const CURRICULUM_QUICK_PRESETS = [
  {
    grade: 4 as WarmupGrade,
    textbook: 'Global Success' as const,
    unit: 'Unit 1: My Friends',
    lesson: 'Lesson 1: What is he/she like?',
    topic: 'Personalities and appearance of friends',
    vocabulary: 'friendly, kind, funny, tall, short, helpful, clever',
    sentencePatterns: "What's your friend like? - He's/She's friendly and funny. Is he tall? - Yes, he is.",
    level: 'standard' as const,
    defaultType: 'ai_creative_mix' as WarmupType
  },
  {
    grade: 3 as WarmupGrade,
    textbook: 'Global Success' as const,
    unit: 'Unit 3: In the Classroom',
    lesson: 'Lesson 1: School things',
    topic: 'Classroom objects and commands',
    vocabulary: 'pencil, eraser, ruler, pencil case, school bag, book, open, close',
    sentencePatterns: 'What is this? - It is a pencil. Look at the eraser. Stand up, please.',
    level: 'standard' as const,
    defaultType: 'game_show' as WarmupType
  },
  {
    grade: 5 as WarmupGrade,
    textbook: 'Global Success' as const,
    unit: 'Unit 5: My Daily Routine',
    lesson: 'Lesson 2: What time do you...?',
    topic: 'Daily routines, times of day and healthy habits',
    vocabulary: 'get up, have breakfast, brush teeth, go to school, do homework, at six o’clock',
    sentencePatterns: 'What time do you get up? - I get up at six o’clock in the morning.',
    level: 'advanced' as const,
    defaultType: 'news_show' as WarmupType
  },
  {
    grade: 2 as WarmupGrade,
    textbook: 'Global Success' as const,
    unit: 'Unit 2: In the Dining Room',
    lesson: 'Lesson 1: Food and drinks',
    topic: 'Favorite food and sharing',
    vocabulary: 'cake, milk, apple, banana, water, yummy, thirsty, hungry',
    sentencePatterns: 'I like cake. Do you like apples? - Yes, I do. / Here you are.',
    level: 'easy' as const,
    defaultType: 'rhyme_chant' as WarmupType
  },
  {
    grade: 1 as WarmupGrade,
    textbook: 'Global Success' as const,
    unit: 'Unit 1: In the School Playground',
    lesson: 'Lesson 1: Hello & Phonics /b/',
    topic: 'Greetings, name introductions and playground fun',
    vocabulary: 'hello, hi, ball, book, bike, boy, Bill, Ba',
    sentencePatterns: "Hello, I'm Bill. Hi, Bill. Look at the ball. Bounce the ball!",
    level: 'easy' as const,
    defaultType: 'song' as WarmupType
  }
];

export const SAMPLE_WARMUP_SCRIPTS: WarmupScript[] = [
  {
    id: 'script_preset_g4_u1',
    title: 'The Mystery Friend Talk Show',
    warmupType: 'ai_creative_mix',
    warmupTypeLabel: 'AI Creative Mix (Talk Show + Mini Drama + Chant)',
    grade: 4,
    textbook: 'Global Success',
    unit: 'Unit 1: My Friends',
    lesson: 'Lesson 1: Describing Friends',
    topic: 'Friendship, Appearance & Personality',
    duration: '5 minutes',
    participantCount: '4 performers + Whole Class',
    languageFocus: {
      vocabulary: ['friendly', 'funny', 'tall', 'kind', 'clever', 'mystery'],
      sentencePatterns: ["What's he like?", "He's very friendly and funny.", "Who is our mystery friend?"]
    },
    objectives: [
      'Create an enthusiastic, English-speaking classroom atmosphere from minute 0.',
      'Review personality & appearance adjectives naturally in context.',
      'Engage 100% of the class in whole-group guessing and chanting.',
      'Seamlessly bridge to Unit 1: My Friends Lesson 1.'
    ],
    meetOurPerformers: {
      introGreeting: 'Hello, teacher and friends! Welcome to our 5-Minute Morning Show!',
      studentIntroductions: [
        { studentName: 'Anna', introLine: "I'm Anna! Today, I am your cheerful host!" },
        { studentName: 'Ben', introLine: "I'm Ben! I love playing football and making people laugh!" },
        { studentName: 'Lucy', introLine: "I'm Lucy! I have a secret clue in my magical envelope!" },
        { studentName: 'Tom', introLine: "And I'm Tom! Can you guess my secret superpower?" }
      ]
    },
    characters: [
      { name: 'Anna', roleTitle: 'Host & Show Leader', description: 'Energetic and confident speaker, guides the whole activity', speakingLoad: 'heavy', personality: 'Energetic & bright', position: 'center' },
      { name: 'Ben', roleTitle: 'Guest Performer', description: 'Acts funny and responds to host questions', speakingLoad: 'medium', personality: 'Humorous', position: 'left' },
      { name: 'Lucy', roleTitle: 'Junior Reporter', description: 'Holds the clue box and asks the audience questions', speakingLoad: 'medium', personality: 'Curious & sharp', position: 'right' },
      { name: 'Tom', roleTitle: 'Mystery Actor', description: 'Mimes actions and interacts with the class', speakingLoad: 'light', personality: 'Playful', position: 'front_left' }
    ],
    stageFormation: {
      layoutType: 'stage_and_audience',
      description: 'Anna stands center stage with a toy microphone. Ben and Tom stand on the left. Lucy stands on the right holding the Mystery Envelope. The class sits facing the stage.',
      positions: [
        { characterName: 'Anna (Host)', roleTitle: 'Host', x: 50, y: 35, facing: 'audience' },
        { characterName: 'Ben (Guest)', roleTitle: 'Guest', x: 25, y: 45, facing: 'center' },
        { characterName: 'Tom (Actor)', roleTitle: 'Actor', x: 38, y: 55, facing: 'audience' },
        { characterName: 'Lucy (Reporter)', roleTitle: 'Reporter', x: 75, y: 45, facing: 'center' }
      ]
    },
    props: ['1 Toy Microphone (or roll of paper)', '1 Bright Mystery Envelope or Box', 'Friend cartoon cutouts'],
    timingBreakdown: [
      { range: '0:00 - 0:30', sectionName: 'Opening Greeting', description: 'Energetic show entrance and meet performers.' },
      { range: '0:30 - 1:30', sectionName: 'Mini Drama & Clues', description: 'Ben and Lucy reveal mysterious hints about a special friend.' },
      { range: '1:30 - 3:00', sectionName: 'Interactive Guessing', description: 'Whole-class guesses personality traits with TPR movements.' },
      { range: '3:00 - 4:15', sectionName: 'Rhythmic Friends Chant', description: 'Call & Response chant with clapping rhythm.' },
      { range: '4:15 - 5:00', sectionName: 'Teacher Bridge to Lesson', description: 'Teacher transition to Unit 1 page in Global Success.' }
    ],
    scenes: [
      {
        id: 'scene_1',
        sceneNumber: 1,
        title: 'Opening – Good Morning School Show',
        timeRange: '0:00 - 0:40',
        purpose: 'Capture instant attention and energize the classroom.',
        lines: [
          { id: 'l1', speaker: 'ANNA', speakerType: 'host', lineEnglish: 'Good morning, Teacher and friends! Welcome to our 5-Minute Morning Show!', lineVietnamese: 'Chào buổi sáng cô giáo và các bạn! Chào mừng đến với chương trình buổi sáng 5 phút!', stageDirection: '[Anna walks confidently to center stage, holding the toy microphone and waving warmly.]', timing: '0:10' },
          { id: 'l2', speaker: 'CLASS', speakerType: 'class', lineEnglish: 'Good morning, Anna!', lineVietnamese: 'Chào buổi sáng, Anna!', stageDirection: '[All students in class wave back and clap in unison.]', timing: '0:20' },
          { id: 'l3', speaker: 'ANNA', speakerType: 'host', lineEnglish: 'Are you ready for some big fun today?', lineVietnamese: 'Các bạn đã sẵn sàng cho điều bất ngờ hôm nay chưa?', stageDirection: '[Anna cups her hand to her ear, smiling widely at the class.]', timing: '0:28' },
          { id: 'l4', speaker: 'CLASS', speakerType: 'class', lineEnglish: 'YES, WE ARE!', lineVietnamese: 'SẴN SÀNG!', stageDirection: '[Class shouts cheerfully with thumbs up.]', timing: '0:35' }
        ]
      },
      {
        id: 'scene_2',
        sceneNumber: 2,
        title: 'The Mystery Clues & Drama',
        timeRange: '0:40 - 2:20',
        purpose: 'Present core vocabulary: friendly, kind, funny, tall.',
        lines: [
          { id: 'l5', speaker: 'LUCY', speakerType: 'reporter', lineEnglish: 'Look what I have here! A golden mystery clue!', lineVietnamese: 'Nhìn xem tớ có gì này! Một phong bì manh mối bí ẩn!', stageDirection: '[Lucy steps forward, holding up a sparkling golden envelope.]', timing: '0:50' },
          { id: 'l6', speaker: 'BEN', speakerType: 'guest', lineEnglish: "Ooh! Who is in the clue, Lucy? What's he like?", lineVietnamese: 'Ồ! Ai trong manh mối thế Lucy? Bạn ấy trông như thế nào?', stageDirection: '[Ben jumps up and down curiously, peeking over Lucy’s shoulder.]', timing: '1:05' },
          { id: 'l7', speaker: 'LUCY', speakerType: 'reporter', lineEnglish: "Clue number one: He is very tall and very friendly!", lineVietnamese: 'Manh mối số một: Bạn ấy rất cao và rất thân thiện!', stageDirection: '[Lucy makes a tall gesture with her hand up high and smiles.]', timing: '1:20' },
          { id: 'l8', speaker: 'TOM', speakerType: 'student', lineEnglish: 'And clue number two: He is super funny! Watch this!', lineVietnamese: 'Và manh mối số hai: Bạn ấy cực kỳ vui tính! Xem này!', stageDirection: '[Tom makes a silly friendly face and does a funny robot dance. The class giggles.]', timing: '1:40' },
          { id: 'l9', speaker: 'ANNA', speakerType: 'host', lineEnglish: 'Class! Repeat after me with actions: Friendly! Funny!', lineVietnamese: 'Cả lớp ơi! Nhắc lại theo tớ cùng động tác nào: Friendly! Funny!', stageDirection: '[Anna leads the gesture: open arms for Friendly, laughing clap for Funny.]', timing: '2:00' },
          { id: 'l10', speaker: 'CLASS', speakerType: 'class', lineEnglish: 'FRIENDLY! FUNNY!', lineVietnamese: 'FRIENDLY! FUNNY!', stageDirection: '[Class imitates the gestures with big smiles and energetic voices.]', timing: '2:15' }
        ]
      },
      {
        id: 'scene_3',
        sceneNumber: 3,
        title: 'Call & Response Friends Chant',
        timeRange: '2:20 - 4:00',
        purpose: 'Rhythmic reinforcement of sentence patterns and vocabulary.',
        lines: [
          { id: 'l11', speaker: 'ANNA & BEN', speakerType: 'host', lineEnglish: 'One, two, three! Let’s do the Friends Chant! Clap, clap, clap!', lineVietnamese: 'Một, hai, ba! Cùng đọc bài vè bạn bè nào! Vỗ tay theo nhịp!', stageDirection: '[All 4 performers start a steady 4-beat clapping rhythm.]', timing: '2:30' },
          { id: 'l12', speaker: 'PERFORMERS', speakerType: 'student', lineEnglish: "Who's your friend? Who's your friend?", lineVietnamese: 'Ai là bạn của bạn? Ai là bạn của bạn?', stageDirection: '[Performers chant with rhythm and point to the class.]', timing: '2:45' },
          { id: 'l13', speaker: 'CLASS', speakerType: 'class', lineEnglish: "He's tall! He's kind! He's my best friend!", lineVietnamese: 'Bạn ấy cao! Bạn ấy tốt bụng! Bạn ấy là bạn thân của tớ!', stageDirection: '[Class responds with enthusiastic claps and rhythmic voice.]', timing: '3:05' },
          { id: 'l14', speaker: 'PERFORMERS', speakerType: 'student', lineEnglish: "What's she like? What's she like?", lineVietnamese: 'Bạn ấy thế nào? Bạn ấy tính cách ra sao?', stageDirection: '[Lucy and Anna chant with rhythm.]', timing: '3:20' },
          { id: 'l15', speaker: 'CLASS', speakerType: 'class', lineEnglish: "She's clever! She's friendly! We love our friends!", lineVietnamese: 'Bạn ấy thông minh! Bạn ấy thân thiện! Chúng tớ yêu các bạn của mình!', stageDirection: '[Class cheers and throws hands up in the air.]', timing: '3:45' }
        ]
      },
      {
        id: 'scene_4',
        sceneNumber: 4,
        title: 'Grand Finale & Lesson Bridge',
        timeRange: '4:00 - 5:00',
        purpose: 'Positive wrap-up and smooth transition into textbook lesson.',
        lines: [
          { id: 'l16', speaker: 'ANNA', speakerType: 'host', lineEnglish: 'Thank you, everyone! You were fantastic stars today!', lineVietnamese: 'Cảm ơn các bạn! Hôm nay các bạn biểu diễn xuất sắc tuyệt vời!', stageDirection: '[All 4 performers take a bow and wave joyfully.]', timing: '4:15' },
          { id: 'l17', speaker: 'TEACHER', speakerType: 'teacher', lineEnglish: 'Wonderful performance, 4A! Give our performers a big round of applause!', lineVietnamese: 'Màn trình diễn tuyệt vời! Cả lớp dành một tràng pháo tay thật lớn cho các bạn nào!', stageDirection: '[Teacher walks up, clapping proudly.]', timing: '4:30' },
          { id: 'l18', speaker: 'TEACHER', speakerType: 'teacher', lineEnglish: 'Now, who can tell me: What is your best friend like? Today, we will discover more in Unit 1: My Friends! Open your books to page 6!', lineVietnamese: 'Bây giờ, ai có thể cho cô biết: Bạn thân của con thế nào? Hôm nay chúng ta sẽ khám phá nhiều điều thú vị trong Unit 1: My Friends! Mở sách trang 6 nào!', stageDirection: '[Teacher gestures to the board and displays the textbook cover.]', timing: '4:50' }
        ]
      }
    ],
    wholeClassInteraction: {
      interactionMoments: [
        'Minute 0:30: Whole-class greeting with energy thumbs-up gesture.',
        'Minute 2:00: TPR physical movements (tall arms, friendly smile, funny wiggle).',
        'Minute 2:45: Synchronized 4-beat clap and chant response.',
        'Minute 4:30: Big applause and immediate answer to teacher question.'
      ],
      responsePrompts: [
        "Host asks: 'Is our friend tall or short?' -> Class calls: 'TALL!'",
        "Host asks: 'Is he friendly?' -> Class calls: 'YES, HE IS!'"
      ]
    },
    transitionToLesson: {
      bridgeSpeech: 'Now you know all the magic words to describe our best friends: tall, short, friendly, and funny!',
      teacherClosingSentence: 'Let’s open Global Success Grade 4, Unit 1, Lesson 1 to meet all our new story friends!',
      leadInQuestion: 'Who wants to describe your desk-mate first?'
    },
    teacherGuide: {
      preparation: [
        'Print or prepare the 1-page script for the 4 student performers 1 day before class.',
        'Prepare 1 toy mic (or decorated cardboard tube) and 1 colorful envelope.',
        'Arrange front space of the classroom (approx. 2 meters wide).'
      ],
      beforeClassBriefing: 'Spend 2 minutes during recess with Anna, Ben, Lucy, and Tom. Remind them to speak loudly, smile, and make eye contact with the class.',
      stageArrangement: '4 performers line up in front of the board. Host Anna in center, Lucy right, Ben & Tom left.',
      props: ['Toy Microphone', 'Golden Envelope with cartoon face inside'],
      timingSummary: 'Total: 4:50 (within the strict 5-minute warm-up rule).',
      teacherRole: 'Stand slightly to the side during student performance; provide warm smiles and cue the class to clap; step in at 4:20 for lesson transition.',
      classroomManagementTips: [
        'Encourage quiet listening during performer lines and full-volume shouting during CLASS prompts.',
        'Use hand gestures to guide clapping tempo so it remains neat and pleasant.'
      ],
      suggestedPraiseFeedback: [
        'Super clear voices and great eye contact!',
        'Fantastic teamwork between host and audience!',
        'You made English so fun and lively this morning!'
      ],
      speakingTipsFeedback: [
        'Remember to project your voice to the last row.',
        'Keep smiling when you speak – it makes your English sound wonderful!'
      ]
    },
    createdAt: new Date().toISOString(),
    isFavorite: true
  }
];
