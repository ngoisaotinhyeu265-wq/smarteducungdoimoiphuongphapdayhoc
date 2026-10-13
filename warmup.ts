/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WarmupGrade = 1 | 2 | 3 | 4 | 5;

export type WarmupType = 
  | 'mini_drama'
  | 'rhyme_chant'
  | 'talk_show'
  | 'song'
  | 'game_show'
  | 'interview'
  | 'news_show'
  | 'poem_poetry'
  | 'role_play'
  | 'ai_creative_mix';

export type WarmupLevel = 'easy' | 'standard' | 'advanced';

export interface StudentProfile {
  id: string;
  name: string;
  gradeClass: string;
  interest?: string;
  talent?: string; // Singing, Acting, Dancing, Speaking, Hosting, Comedy
  speakingAbility?: 'confident' | 'moderate' | 'shy';
  assignedRole?: string;
}

export interface WarmupIdea {
  id: string;
  title: string;
  type: WarmupType;
  typeLabel: string;
  summary: string;
  languageGoal: string;
  targetStudents: number | string; // e.g. 4 or "4-5 students"
  duration: string; // e.g. "5 minutes"
  energyLevel: number; // 1 to 5 stars
  propsNeeded: string[];
  keyHighlight: string;
  sampleIntro?: string;
}

export interface CharacterRole {
  name: string;
  roleTitle: string; // e.g. "Host", "Reporter", "Funny Friend", "Guest"
  description: string;
  speakingLoad: 'heavy' | 'medium' | 'light';
  personality: string;
  position: 'center' | 'left' | 'right' | 'front_left' | 'front_right' | 'audience';
}

export interface ScriptLine {
  id: string;
  speaker: string; // Character name or "TEACHER" | "HOST" | "CLASS" | "AUDIENCE" | "ALL" | "NARRATOR"
  speakerType: 'host' | 'guest' | 'reporter' | 'student' | 'teacher' | 'class' | 'narrator';
  lineEnglish: string;
  lineVietnamese?: string;
  stageDirection?: string; // e.g. "[Anna steps forward and waves cheerfully]"
  timing?: string; // e.g. "0:45"
  audioText?: string;
}

export interface ScriptScene {
  id: string;
  sceneNumber: number;
  title: string;
  timeRange: string; // e.g. "0:00 - 0:30"
  purpose: string;
  lines: ScriptLine[];
}

export interface TeacherGuide {
  preparation: string[];
  beforeClassBriefing: string;
  stageArrangement: string;
  props: string[];
  timingSummary: string;
  teacherRole: string;
  classroomManagementTips: string[];
  suggestedPraiseFeedback: string[];
  speakingTipsFeedback: string[];
}

export interface WarmupScript {
  id: string;
  title: string;
  warmupType: WarmupType;
  warmupTypeLabel: string;
  grade: WarmupGrade;
  textbook: string;
  unit: string;
  lesson: string;
  topic: string;
  duration: string; // "5 minutes"
  participantCount: number | string;
  languageFocus: {
    vocabulary: string[];
    sentencePatterns: string[];
    phonicsOrChantTheme?: string;
  };
  objectives: string[];
  meetOurPerformers: {
    introGreeting: string;
    studentIntroductions: Array<{
      studentName: string;
      introLine: string;
    }>;
  };
  characters: CharacterRole[];
  stageFormation: {
    layoutType: 'circle' | 'line' | 'v_shape' | 'talk_show_desk' | 'stage_and_audience';
    description: string;
    positions: Array<{
      characterName: string;
      roleTitle: string;
      x: number; // 0-100 percentage coordinates for stage diagram
      y: number; // 0-100 percentage coordinates
      facing: 'audience' | 'center' | 'left' | 'right';
    }>;
  };
  props: string[];
  timingBreakdown: Array<{
    range: string;
    sectionName: string;
    description: string;
  }>;
  scenes: ScriptScene[];
  wholeClassInteraction: {
    interactionMoments: string[];
    responsePrompts: string[];
  };
  transitionToLesson: {
    bridgeSpeech: string;
    teacherClosingSentence: string;
    leadInQuestion: string;
  };
  teacherGuide: TeacherGuide;
  createdAt: string;
  isFavorite?: boolean;
  notes?: string;
}

export interface WarmupFormInput {
  grade: WarmupGrade;
  textbook: 'Global Success' | 'I Learn Smart Start' | 'Other';
  unit: string;
  lesson: string;
  topic: string;
  vocabulary: string;
  sentencePatterns: string;
  preferredTypes: WarmupType[];
  level: WarmupLevel;
  studentCountMode: 'ai_chooses' | 'specific';
  specificStudentCount: number;
  students: StudentProfile[];
  additionalNotes?: string;
}
