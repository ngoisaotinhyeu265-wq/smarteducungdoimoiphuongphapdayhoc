/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuestionType = 
  | 'multiple_choice' 
  | 'fill_blank' 
  | 'reading_comprehension'
  | 'reorder_words' 
  | 'answer_question' 
  | 'reorder_letters' 
  | 'matching' 
  | 'true_false' 
  | 'essay'
  | 'listening'
  | 'speaking'
  | 'crossword'
  | 'word_search'
  | 'drag_drop'
  | 'flashcard';

export type SubjectType = 
  | 'Toán' 
  | 'Tiếng Việt' 
  | 'Tiếng Anh' 
  | 'Tự nhiên & Xã hội' 
  | 'Khoa học' 
  | 'Lịch sử & Địa lý' 
  | 'Đạo đức' 
  | 'Tin học' 
  | 'Công nghệ' 
  | 'Hoạt động trải nghiệm';

export type DifficultyType = 'Dễ' | 'Trung bình' | 'Khó' | 'Hỗn hợp';
export type CognitiveType = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  passageTitle?: string; // Tiêu đề đoạn văn đọc hiểu
  passage?: string; // Nội dung đoạn văn đọc hiểu (Reading passage)
  options?: string[]; // for multiple_choice
  pairs?: { left: string; right: string }[]; // for matching
  answer: string | string[]; // answer text, correct option, or correct pairing mapping
  subject: SubjectType;
  grade: number; // 1 to 5
  difficulty: DifficultyType;
  cognitiveLevel?: CognitiveType;
  skillCategory?: string;
  useCount: number;
  explanation?: string;
  reasonRight?: string;
  reasonWrong?: string;
  relatedKnowledge?: string;
  bookSeries?: string;
  chapter?: string;
  topicLesson?: string;
  unit?: string;
  part?: string;
  tags?: string[];
  audioUrl?: string; // TTS audio if generated
  imageUrl?: string; // AI generated cartoon illustration image if present
}

export interface ExamAnalysis {
  qualityScore: number; // e.g. 98/100
  estimatedTimeMinutes: number; // e.g. 15, 30, 45 mins
  knowledgeCoverage: string; // e.g. "98% Yêu cầu cần đạt CTGDPT 2018"
  cognitiveMatrix: {
    nhanBiet: number; // %
    thongHieu: number; // %
    vanDung: number; // %
    vanDungCao: number; // %
  };
  reviewerAudit: {
    textbookAlignment: boolean;
    curriculumCompliance: boolean;
    grammarSpellingCheck: boolean;
    unambiguousAnswers: boolean;
    notes: string;
  };
}

export interface ExamVariant {
  code: string; // "Đề 101 (A)", "Đề 102 (B)", "Đề 103 (C)", "Đề 104 (D)"
  title: string;
  questions: Question[];
}

export interface ExamPackage {
  id: string;
  title: string;
  subject: SubjectType;
  grade: number;
  bookSeries: string;
  edition: string;
  scope: string;
  purpose: string;
  units?: string[];
  language?: 'vi' | 'en';
  createdAt: string;
  questions: Question[];
  analysis: ExamAnalysis;
  variants: ExamVariant[];
}

export type GameType = 'quiz' | 'wheel' | 'flashcard' | 'memory' | 'balloon' | 'frog' | 'fill_blank' | 'crossword';

export interface Game {
  id: string;
  title: string;
  type: GameType;
  questionIds: string[];
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string; // emoji or design icon
  level: number;
  xp: number;
  coins: number;
  petName: string;
  petType: string; // e.g. "Rồng Lửa", "Mèo Cam", "Khủng Long xanh"
  badges: string[]; // e.g. "Chăm Chỉ", "Vua Toán Học", "Đồng Đội Tốt"
  streakDays?: number;
  className?: string;
  equippedBadgeId?: string;
  activePetId?: string;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'mythic';
export type BadgeCategory = 'learning' | 'streak' | 'pet' | 'quiz' | 'social' | 'stem';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  tier: BadgeTier;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  rewardCoins: number;
  rewardXp: number;
  isEquipped?: boolean;
}

export type QuestType = 'daily' | 'weekly' | 'special';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  category: string;
  progress: number;
  target: number;
  rewardCoins: number;
  rewardXp: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export type PetSpecies = 'dog' | 'cat' | 'dragon' | 'phoenix' | 'panda' | 'rabbit' | 'owl' | 'turtle';
export type PetStage = 'egg' | 'baby' | 'teen' | 'legendary';

export interface VirtualPet {
  id: string;
  name: string;
  species: PetSpecies;
  title: string;
  avatar: string;
  stage: PetStage;
  level: number;
  xp: number;
  maxXp: number;
  hunger: number; // 0 - 100
  happiness: number; // 0 - 100
  energy: number; // 0 - 100
  cleanliness: number; // 0 - 100
  friendship: number; // 0 - 100
  unlocked: boolean;
  unlockCost: number;
  favoriteFood: string;
  accessories: string[];
  currentMood: string;
  quote: string;
}

export interface PetFoodItem {
  id: string;
  name: string;
  icon: string;
  cost: number;
  hungerBonus: number;
  happinessBonus: number;
  energyBonus: number;
  description: string;
}

export interface PetAccessoryItem {
  id: string;
  name: string;
  icon: string;
  slot: 'hat' | 'glasses' | 'outfit' | 'wings';
  cost: number;
  owned: boolean;
  description: string;
}

export interface LeaderboardEntry {
  id: string;
  studentId: string;
  name: string;
  avatar: string;
  className: string;
  schoolName: string;
  level: number;
  xp: number;
  coins: number;
  badgesCount: number;
  petName: string;
  petAvatar: string;
  petLevel: number;
  streakDays: number;
  cheers: number;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: Partial<Question>[];
}

export interface OfficialReference {
  id: string;
  title: string;
  code: string; // e.g. "Công văn 2345/BGDĐT-GDTH", "Thông tư 27/2020/TT-BGDĐT"
  issuer: string; // e.g. "Bộ Giáo dục và Đào tạo"
  issueDate?: string; // e.g. "07/06/2021"
  url: string; // Link to official document
  summary: string;
  applicableGrades?: string[]; // e.g. ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"]
  applicableSubjects?: string[];
  isRequired: boolean;
  isActive: boolean;
  isCustom?: boolean;
}

export interface StoredTextbook {
  id: string;
  title: string; // e.g. "Tiếng Việt 3 - Tập 1 (Kết nối tri thức)"
  subject: SubjectType | string;
  grade: number | string; // 1, 2, 3, 4, 5
  bookSeries: string; // e.g. "Kết nối tri thức với cuộc sống", "Bộ Giáo dục và Đào tạo / Global Success"
  volume?: string; // "Tập 1", "Tập 2"
  chapterOrUnit?: string; // "Unit 3: Our School Things", "Chủ điểm 1: Mái trường mến yêu"
  lessonName?: string; // "Bài 5: Nhật kí tập bơi"
  pageRange?: string; // "Trang 24 - 27"
  content: string; // Extracted/Uploaded full text content of textbook
  keyVocabulary?: string[]; // Target words/concepts
  keySentences?: string[]; // Sentence patterns or core formulas
  exercises?: string[]; // Exercises in the textbook
  imagesOrVisuals?: string[]; // Description or URLs of textbook illustrations
  fileName?: string;
  fileSize?: string;
  uploadedAt: string;
  sourceType: 'file_upload' | 'text_input' | 'system_standard' | 'drive_link';
  driveOrOnlineLink?: string;
}

export interface AttachedImage {
  id: string;
  name: string;
  dataUrl: string; // base64 or object url
  size?: string;
  description?: string;
  pageType?: 'cover' | 'dialogue' | 'vocabulary' | 'exercise' | 'general';
  extractedText?: string;
}

export interface LessonPlanActivity {
  id: string;
  name: string;
  duration: string;
  aims?: string; // Standard pedagogical aims (starting with action verbs) - replaces 'objective'
  objective?: string; // Kept for backwards compatibility
  content?: string;
  methodsAndTechniques?: string;
  teacherActivity: string;
  studentActivity: string;
  description?: string;
  expectedOutcome?: string;
  assessment?: string;
  digitalCompetency?: {
    code?: string; // e.g. "1.1.CB1a"
    expression?: string;
    activity?: string;
    product?: string;
    assessment?: string;
  } | string;
  aiIntegration?: {
    purpose?: string;
    teacherActivity?: string;
    studentActivity?: string;
    product?: string;
    assessment?: string;
  } | string;
  steamInfo?: {
    science?: string;
    technology?: string;
    engineering?: string;
    arts?: string;
    maths?: string;
  };
  digitalTools?: string[];
}

export type DisabilityCategoryType =
  | 'none'
  | 'physical'
  | 'hearing_speech'
  | 'visual'
  | 'intellectual'
  | 'neurological_mental'
  | 'other';

export interface DisabilitySupportConfig {
  enabled: boolean;
  selectedTypes: DisabilityCategoryType[];
  teacherNotes?: string;
  studentCount?: number;
}

export interface FullLessonPlan {
  id?: string;
  subject: SubjectType | string;
  grade: string;
  inclusiveClassMode?: boolean;
  disabilitySupport?: DisabilitySupportConfig;
  unit?: string; // e.g. "Unit 3: Our School Things"
  lesson?: string; // e.g. "Lesson 1"
  period?: number | string; // e.g. "Tiết 1 / Period 1"
  activityScope?: string; // e.g. "Activity 1, 2, 3", "Activity 4, 5, 6", "Activity 1 - 6"
  lessonName: string;
  topic: string;
  duration: string;
  bookSeries: string;
  pageRange?: string;
  language: 'vi' | 'en';
  textbookSource?: {
    id?: string;
    title: string;
    bookSeries: string;
    pageRange?: string;
    keyVocabulary?: string[];
    keySentences?: string[];
  };
  officialReferences: OfficialReference[];
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
  activities: LessonPlanActivity[];
  differentiation?: {
    needingSupport: string[];
    advanced: string[];
  };
  consolidation?: string;
  assessment: {
    methods: string[];
    tools: string[];
    rubrics?: string[];
  };
  postLessonAdjustments?: {
    difficulties?: string;
    effectiveActivities?: string;
    neededAdjustments?: string;
    supportMeasures?: string;
  } | string;
  attachedImages?: AttachedImage[];
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  tags?: string[];
  pedagogicalRationale?: string[] | string;
  teacherScript?: TeacherScript;
}

export type LessonPlanFull = FullLessonPlan;

export type ScriptPartType = 
  | 'classroom_management'
  | 'warm_up_lead_in'
  | 'game_instruction'
  | 'vocab_teaching'
  | 'sentence_pattern'
  | 'group_instruction'
  | 'pair_work'
  | 'group_4'
  | 'individual_work'
  | 'task_guidance'
  | 'wrap_up_praise';

export interface TeacherScriptPart {
  id: string;
  type: ScriptPartType;
  title: string;
  groupFormat?: 'individual' | 'pair' | 'group_4' | 'whole_class';
  teacherSpeech: string; // The exact script to say (100% English for Tiếng Anh, Vietnamese for other subjects)
  teacherAction?: string; // Body language, gestures, visual props, audio cues
  expectedStudentResponse?: string; // What pupils say or do in response
  timing?: string; // e.g. "1-2 mins"
}

export interface TeacherScriptSection {
  activityId: string;
  activityName: string;
  duration: string;
  stageType: 'warm_up' | 'exploration' | 'knowledge_construction' | 'practice' | 'production' | 'wrap_up';
  gameName?: string;
  groupFormat?: 'individual' | 'pair' | 'group_4' | 'whole_class';
  parts: TeacherScriptPart[];
}

export interface TeacherScript {
  lessonTitle: string;
  subject: string;
  grade: string;
  bookSeries: string;
  language: 'en' | 'vi';
  totalDuration: string;
  classroomManagementCues: {
    callOut: string; // e.g. "1, 2, 3 - Eyes on me!" / "Lớp chú ý - Nghiêm!"
    response: string; // e.g. "1, 2 - Eyes on you!" / "Sẵn sàng!"
    purpose: string;
  }[];
  sections: TeacherScriptSection[];
  pedagogicalTips: string[];
  createdAt?: string;
}

export interface WarehouseLessonPlan {
  id: string;
  title: string;
  subject: SubjectType | string;
  grade: string; // e.g. "Lớp 3", "Lớp 4", "Lớp 5"
  unit: string; // e.g. "Unit 3: Our School Things", "Chủ điểm 1: Em yêu trường em"
  lesson: string; // e.g. "Lesson 1", "Bài 2"
  period: string; // e.g. "Tiết 1", "Period 1 (35 mins)"
  bookSeries: string; // "Global Success (Bộ GD&ĐT)", "Kết nối tri thức với cuộc sống"
  pageRange?: string;
  duration: string;
  summary: string;
  fullPlan: FullLessonPlan;
  attachedImages?: AttachedImage[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface LessonPlan {
  subject: SubjectType | string;
  grade: string;
  lessonName: string;
  topic: string;
  duration: string;
  objectives: string[];
  activities: {
    id: string;
    name: string;
    duration: string;
    description: string;
    steamInfo?: {
      science?: string;
      technology?: string;
      engineering?: string;
      arts?: string;
      maths?: string;
    };
    digitalTools?: string[];
    digitalCompetency?: string;
  }[];
  assessment: string[];
  materials: string[];
}

export type EnglishGradeLevel = 1 | 2 | 3 | 4 | 5;

export interface EnglishVocabItem {
  id: string;
  word: string; // The English word, e.g. "ear"
  pronunciation: string; // IPA phonetic transcription, e.g. "/ɪər/"
  wordType: string; // "Noun", "Verb", "Adjective", "Preposition", etc.
  category: string; // "Body parts", "Animals", "Food", "School things", "Family", "Jobs", "Places", "Activities", "Weather", etc.
  easyEnglishExplanation: string; // Simple 1-2 sentences for kids (NOT using target word), e.g. "It's a body part. We use it to hear."
  vietnameseMeaning: string; // Accurate Vietnamese meaning, e.g. "cái tai"
  imageUrl?: string; // Visual illustration
  modelSentence: string; // Simple primary model sentence, e.g. "I have two ears."
  grade: EnglishGradeLevel;
  teachingNotes?: string; // Optional TPR gesture / elicitation tips for teachers
}

export interface EnglishVocabPackage {
  id: string;
  title: string;
  grade: EnglishGradeLevel;
  category?: string;
  unitLesson?: string;
  bookSeries?: string;
  words: EnglishVocabItem[];
  createdAt: string;
  updatedAt?: string;
}

