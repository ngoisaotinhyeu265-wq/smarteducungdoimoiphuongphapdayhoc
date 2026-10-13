/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles, Play, Dices, RotateCcw, Copy, Download, Star, 
  Volume2, Users, BookOpen, Clock, Flame, ChevronRight,
  Plus, Trash2, Edit3, CheckCircle2, Bookmark, FolderArchive,
  ArrowRight, Award, MessageSquare, Music, Mic, HelpCircle,
  Shuffle, RefreshCw, Smile, Zap, Eye, ChevronDown, ListFilter,
  Check, X
} from 'lucide-react';
import { 
  WarmupGrade, WarmupType, WarmupLevel, WarmupIdea, 
  WarmupScript, StudentProfile, WarmupFormInput, CharacterRole 
} from '../../types/warmup';
import { 
  WARMUP_TYPES_CATALOG, 
  DEFAULT_STUDENT_ROSTER, 
  CURRICULUM_QUICK_PRESETS, 
  SAMPLE_WARMUP_SCRIPTS 
} from '../../data/warmupCurriculumData';
import WarmupIdeaCard from './WarmupIdeaCard';
import StageFormationDiagram from './StageFormationDiagram';
import PracticeTeleprompterModal from './PracticeTeleprompterModal';
import WarmupExportModal from './WarmupExportModal';
import { englishSpeech } from '../../utils/englishSpeech';
import { sounds } from '../../lib/audio';

interface EnglishWarmupStudioProps {
  onNavigateToPlan?: () => void;
  onNavigateToVocab?: () => void;
}

export default function EnglishWarmupStudio({
  onNavigateToPlan,
  onNavigateToVocab
}: EnglishWarmupStudioProps) {
  // Navigation Steps: 'input' | 'ideas' | 'script'
  const [activeStep, setActiveStep] = useState<'input' | 'ideas' | 'script'>('script');

  // Input Form State
  const [formData, setFormData] = useState<WarmupFormInput>({
    grade: 4,
    textbook: 'Global Success',
    unit: 'Unit 1: My Friends',
    lesson: 'Lesson 1: What is he/she like?',
    topic: 'Personalities and appearance of friends',
    vocabulary: 'friendly, kind, funny, tall, short, helpful, clever',
    sentencePatterns: "What's your friend like? - He's/She's friendly and funny. Is he tall? - Yes, he is.",
    preferredTypes: ['ai_creative_mix', 'mini_drama', 'talk_show'],
    level: 'standard',
    studentCountMode: 'ai_chooses',
    specificStudentCount: 4,
    students: DEFAULT_STUDENT_ROSTER,
    additionalNotes: ''
  });

  // Suggested Ideas State
  const [suggestedIdeas, setSuggestedIdeas] = useState<WarmupIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<WarmupIdea | null>(null);

  // Generated Script State (Initialized with ready-to-use sample script)
  const [currentScript, setCurrentScript] = useState<WarmupScript>(SAMPLE_WARMUP_SCRIPTS[0]);
  const [selectedCharacterFilter, setSelectedCharacterFilter] = useState<string | null>(null);

  // Loading States
  const [isSuggestingIdeas, setIsSuggestingIdeas] = useState<boolean>(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [isRefiningScript, setIsRefiningScript] = useState<boolean>(false);
  const [refineActionLabel, setRefineActionLabel] = useState<string>('');

  // Modals & UI States
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isLibraryDrawerOpen, setIsLibraryDrawerOpen] = useState<boolean>(false);
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [libraryFilterGrade, setLibraryFilterGrade] = useState<string>('all');
  const [playingAudioLineId, setPlayingAudioLineId] = useState<string | null>(null);

  // Saved Scripts Archive
  const [savedScripts, setSavedScripts] = useState<WarmupScript[]>(() => {
    const saved = localStorage.getItem('smartedu_warmup_scripts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return SAMPLE_WARMUP_SCRIPTS;
  });

  const saveScriptsToStorage = (list: WarmupScript[]) => {
    setSavedScripts(list);
    localStorage.setItem('smartedu_warmup_scripts', JSON.stringify(list));
  };

  // Quick Preset Handler
  const handleApplyPreset = (preset: typeof CURRICULUM_QUICK_PRESETS[0]) => {
    sounds.playClick();
    setFormData(prev => ({
      ...prev,
      grade: preset.grade,
      textbook: preset.textbook,
      unit: preset.unit,
      lesson: preset.lesson,
      topic: preset.topic,
      vocabulary: preset.vocabulary,
      sentencePatterns: preset.sentencePatterns,
      level: preset.level,
      preferredTypes: [preset.defaultType, 'mini_drama', 'rhyme_chant']
    }));
  };

  // Step 1 -> Step 2: AI Suggest Ideas (3-5 ideas)
  const handleSuggestIdeas = async () => {
    sounds.playClick();
    setIsSuggestingIdeas(true);
    try {
      const res = await fetch('/api/warmup/suggest-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ideas && data.ideas.length > 0) {
          setSuggestedIdeas(data.ideas);
          setSelectedIdea(data.ideas[0]);
          setActiveStep('ideas');
          sounds.playLevelUp?.();
          return;
        }
      }
      throw new Error('API suggest fallback');
    } catch (err) {
      console.warn('API error in suggest ideas, generating pedagogical fallback ideas:', err);
      // Generate rich fallback ideas
      const fallbackIdeas: WarmupIdea[] = [
        {
          id: 'idea_1',
          title: `The 5-Minute ${formData.topic || 'Magic'} Talk Show`,
          type: 'talk_show',
          typeLabel: '🎤 Talk Show Khởi Động',
          summary: `MC nhí dẫn dắt phỏng vấn khách mời đặc biệt về chủ đề "${formData.topic}", đối thoại hóm hỉnh với khán giả cả lớp.`,
          languageGoal: `Vận dụng từ vựng (${formData.vocabulary.slice(0, 30)}...) và mẫu câu hỏi đáp tự nhiên.`,
          targetStudents: 4,
          duration: '5 minutes',
          energyLevel: 5,
          propsNeeded: ['1 Micro đồ chơi', '1 Bảng tên khách mời'],
          keyHighlight: 'Tương tác trực tiếp với khán giả cả lớp thông qua câu đố nhanh!'
        },
        {
          id: 'idea_2',
          title: `Mystery Detective: ${formData.unit || 'Secret Case'}`,
          type: 'mini_drama',
          typeLabel: '🎭 Mini Drama (Tiểu Phẩm Kịch)',
          summary: `Nhóm thám tử nhí mở phong bì manh mối kỳ bí và diễn xuất kịch tính tìm ra câu trả lời.`,
          languageGoal: `Luyện phản xạ mẫu câu "${formData.sentencePatterns.slice(0, 40)}..."`,
          targetStudents: 4,
          duration: '4-5 minutes',
          energyLevel: 5,
          propsNeeded: ['Kính lúp đồ chơi', 'Phong bì manh mối bí ẩn'],
          keyHighlight: 'Kịch tính, hài hước, kích thích toàn bộ học sinh tò mò.'
        },
        {
          id: 'idea_3',
          title: `Energy Call & Response Beat Chant`,
          type: 'rhyme_chant',
          typeLabel: '🥁 Rhyme / Chant Nhịp Điệu',
          summary: `Leader hô nhịp điệu sôi nổi theo phách 4/4, cả lớp vỗ tay theo nhịp và đáp lời đồng thanh.`,
          languageGoal: `Chuẩn hóa phát âm từ vựng & ngữ điệu câu một cách hào hứng.`,
          targetStudents: '4 Leader + Cả lớp',
          duration: '4 minutes',
          energyLevel: 5,
          propsNeeded: ['Trống gõ hoặc vỗ tay theo nhịp'],
          keyHighlight: '100% học sinh trong lớp cùng đứng dậy vận động toàn thân!'
        },
        {
          id: 'idea_4',
          title: `Classroom Game Show: Who Am I?`,
          type: 'game_show',
          typeLabel: '🎲 Game Show Mini 5 Phút',
          summary: `Trò chơi Hot Seat đoán từ và nhân vật với đồng hồ đếm ngược kịch tính.`,
          languageGoal: `Ôn tập từ vựng chủ đề ${formData.unit} qua gợi ý và mô tả.`,
          targetStudents: '4 Đội trưởng + Cả lớp',
          duration: '5 minutes',
          energyLevel: 5,
          propsNeeded: ['Thẻ từ Flashcard', 'Đồng hồ đếm ngược'],
          keyHighlight: 'Không khí thi đua sôi động, tạo hứng khởi đầu giờ.'
        }
      ];

      setSuggestedIdeas(fallbackIdeas);
      setSelectedIdea(fallbackIdeas[0]);
      setActiveStep('ideas');
      sounds.playLevelUp?.();
    } finally {
      setIsSuggestingIdeas(false);
    }
  };

  // Step 2 -> Step 3: Generate Detailed Script from Selected Idea
  const handleGenerateScriptFromIdea = async (idea: WarmupIdea) => {
    sounds.playClick();
    setSelectedIdea(idea);
    setIsGeneratingScript(true);

    try {
      const res = await fetch('/api/warmup/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          selectedIdea: idea
        })
      });

      if (res.ok) {
        const scriptData = await res.json();
        if (scriptData && scriptData.title) {
          const completeScript: WarmupScript = {
            ...scriptData,
            id: 'script_' + Date.now(),
            createdAt: new Date().toISOString()
          };
          setCurrentScript(completeScript);
          setActiveStep('script');
          sounds.playLevelUp?.();
          return;
        }
      }
      throw new Error('API script generation fallback');
    } catch (err) {
      console.warn('API error in generate script, generating pedagogical rich script:', err);
      // Generate rich pedagogical script based on idea
      const generated: WarmupScript = {
        id: 'script_' + Date.now(),
        title: idea.title,
        warmupType: idea.type,
        warmupTypeLabel: idea.typeLabel,
        grade: formData.grade,
        textbook: formData.textbook,
        unit: formData.unit,
        lesson: formData.lesson,
        topic: formData.topic,
        duration: '5 minutes',
        participantCount: `${formData.students.length} Diễn viên + Cả Lớp`,
        languageFocus: {
          vocabulary: formData.vocabulary.split(',').map(v => v.trim()).filter(Boolean),
          sentencePatterns: formData.sentencePatterns.split('.').map(s => s.trim()).filter(Boolean)
        },
        objectives: [
          `Tạo không khí lớp học hào hứng, 100% học sinh nói tiếng Anh từ phút đầu tiên.`,
          `Ôn tập tự nhiên từ vựng chủ đề: ${formData.vocabulary.slice(0, 40)}.`,
          `Khắc sâu mẫu câu giao tiếp: ${formData.sentencePatterns.slice(0, 50)}.`,
          `Kết nối mượt mà vào bài học ${formData.unit} - ${formData.lesson}.`
        ],
        meetOurPerformers: {
          introGreeting: `Hello everyone! Welcome to our 5-Minute Morning Activity!`,
          studentIntroductions: formData.students.map((st, i) => ({
            studentName: st.name,
            introLine: i === 0 
              ? `I'm ${st.name}! I am your enthusiastic leader today!` 
              : `I'm ${st.name}! Ready to bring big energy and fun to class!`
          }))
        },
        characters: formData.students.map((st, i) => ({
          name: st.name,
          roleTitle: i === 0 ? 'Show Host / Leader' : i === 1 ? 'Main Guest' : i === 2 ? 'Reporter' : 'Mystery Performer',
          description: `Học sinh ${st.name} năng động, đảm nhận vai trò diễn xuất và dẫn dắt.`,
          speakingLoad: i === 0 ? 'heavy' : 'medium',
          personality: st.interest || 'Energetic & Cheerful',
          position: i === 0 ? 'center' : i === 1 ? 'left' : i === 2 ? 'right' : 'front_left'
        })),
        stageFormation: {
          layoutType: 'stage_and_audience',
          description: `${formData.students[0]?.name || 'Leader'} đứng giữa sân khấu. Các bạn đứng hai bên hình chữ V đối diện cả lớp.`,
          positions: formData.students.map((st, i) => ({
            characterName: st.name,
            roleTitle: i === 0 ? 'Leader' : 'Actor',
            x: i === 0 ? 50 : i === 1 ? 25 : i === 2 ? 75 : 38,
            y: i === 0 ? 35 : 45,
            facing: 'audience' as const
          }))
        },
        props: idea.propsNeeded.length > 0 ? idea.propsNeeded : ['Micro đồ chơi', 'Thẻ từ Flashcard'],
        timingBreakdown: [
          { range: '0:00 - 0:30', sectionName: 'Opening Greeting', description: 'Chào hỏi tràn đầy năng lượng & Giới thiệu' },
          { range: '0:30 - 1:30', sectionName: 'Activity / Drama', description: 'Tình huống nhập vai & đố vui tương tác' },
          { range: '1:30 - 3:00', sectionName: 'Whole-Class Interaction', description: 'Cả lớp cùng hô to, vỗ tay và làm cử chỉ TPR' },
          { range: '3:00 - 4:15', sectionName: 'Language Reinforcement', description: 'Khắc sâu mẫu câu và từ vựng trọng tâm' },
          { range: '4:15 - 5:00', sectionName: 'Teacher Bridge', description: 'Giáo viên kết nối vào nội dung bài học SGK' }
        ],
        scenes: [
          {
            id: 'sc_1',
            sceneNumber: 1,
            title: 'Opening – Energy Entrance',
            timeRange: '0:00 - 0:45',
            purpose: 'Thu hút sự chú ý ngay lập tức và tạo không khí vui vẻ.',
            lines: [
              {
                id: 'l1',
                speaker: formData.students[0]?.name || 'LEADER',
                speakerType: 'host',
                lineEnglish: `Good morning, Teacher and friends! Are you ready for our 5-Minute English Warm-up?`,
                lineVietnamese: `Chào buổi sáng cô giáo và các bạn! Các bạn đã sẵn sàng cho 5 phút khởi động tiếng Anh chưa?`,
                stageDirection: `[${formData.students[0]?.name || 'Leader'} bước ra giữa lớp, giơ tay vẫy chào tươi cười.]`,
                timing: '0:15'
              },
              {
                id: 'l2',
                speaker: 'CLASS',
                speakerType: 'class',
                lineEnglish: `YES, WE ARE! GOOD MORNING!`,
                lineVietnamese: `SẴN SÀNG! CHÀO BUỔI SÁNG!`,
                stageDirection: `[Cả lớp đồng thanh hô to và vỗ tay theo nhịp.]`,
                timing: '0:30'
              }
            ]
          },
          {
            id: 'sc_2',
            sceneNumber: 2,
            title: 'The Fun Discovery & Role Play',
            timeRange: '0:45 - 2:30',
            purpose: `Thực hành từ vựng (${formData.vocabulary.slice(0, 30)}) và mẫu câu.`,
            lines: [
              {
                id: 'l3',
                speaker: formData.students[1]?.name || 'STUDENT 2',
                speakerType: 'student',
                lineEnglish: `Look! I have a secret puzzle about: ${formData.topic}! Who can guess?`,
                lineVietnamese: `Nhìn này! Tớ có một câu đố bí mật về chủ đề này! Ai có thể đoán nào?`,
                stageDirection: `[${formData.students[1]?.name || 'Student'} giơ đạo cụ lên và làm động tác gợi ý.]`,
                timing: '1:00'
              },
              {
                id: 'l4',
                speaker: formData.students[2]?.name || 'STUDENT 3',
                speakerType: 'student',
                lineEnglish: `Listen carefully: ${formData.sentencePatterns.split('.')[0] || 'What can you see?'}`,
                lineVietnamese: `Lắng nghe kỹ nhé: Bạn nhìn thấy điều gì?`,
                stageDirection: `[Làm cử chỉ đặt tay lên tai lắng nghe.]`,
                timing: '1:30'
              },
              {
                id: 'l5',
                speaker: 'CLASS',
                speakerType: 'class',
                lineEnglish: `Let's practice together! 1, 2, 3, go!`,
                lineVietnamese: `Cùng luyện tập nào! 1, 2, 3, bắt đầu!`,
                stageDirection: `[Cả lớp cùng nhắc lại từ vựng với động tác tay vui nhộn.]`,
                timing: '2:10'
              }
            ]
          },
          {
            id: 'sc_3',
            sceneNumber: 3,
            title: 'Call & Response Rhythm Chant',
            timeRange: '2:30 - 4:00',
            purpose: 'Luyện ngữ điệu và phản xạ ngôn ngữ nhanh.',
            lines: [
              {
                id: 'l6',
                speaker: 'PERFORMERS',
                speakerType: 'student',
                lineEnglish: `Say it loud! Say it proud! English is fun!`,
                lineVietnamese: `Hô thật to! Thật tự hào! Tiếng Anh thật vui!`,
                stageDirection: `[Nhóm diễn viên dẫn dắt cả lớp cùng hô nhịp điệu.]`,
                timing: '2:50'
              },
              {
                id: 'l7',
                speaker: 'CLASS',
                speakerType: 'class',
                lineEnglish: `ENGLISH IS FUN! WE LOVE ENGLISH!`,
                lineVietnamese: `TIẾNG ANH THẬT VUI! CHÚNG TỚ YÊU TIẾNG ANH!`,
                stageDirection: `[Cả lớp đứng lên vỗ tay 3 tiếng rộn ràng.]`,
                timing: '3:30'
              }
            ]
          },
          {
            id: 'sc_4',
            sceneNumber: 4,
            title: 'Teacher Bridge to Lesson',
            timeRange: '4:00 - 5:00',
            purpose: 'Chuyển tiếp mượt mà vào bài học SGK.',
            lines: [
              {
                id: 'l8',
                speaker: 'TEACHER',
                speakerType: 'teacher',
                lineEnglish: `Excellent warm-up, everyone! You all spoke wonderful English!`,
                lineVietnamese: `Màn khởi động xuất sắc! Các con nói tiếng Anh rất tuyệt vời!`,
                stageDirection: `[Giáo viên bước lên vỗ tay khen ngợi cả lớp.]`,
                timing: '4:20'
              },
              {
                id: 'l9',
                speaker: 'TEACHER',
                speakerType: 'teacher',
                lineEnglish: `Now, let's open our books to ${formData.unit}, ${formData.lesson} to explore more exciting things!`,
                lineVietnamese: `Bây giờ, chúng ta cùng mở sách ${formData.unit}, ${formData.lesson} để khám phá nhiều điều thú vị hơn nào!`,
                stageDirection: `[Giáo viên hướng tay lên bảng và chiếu trang sách bài học.]`,
                timing: '4:50'
              }
            ]
          }
        ],
        wholeClassInteraction: {
          interactionMoments: [
            'Phút 0:30: Chào hỏi cả lớp bằng cử chỉ Thumbs-up.',
            'Phút 2:10: Cả lớp làm động tác TPR theo từ khóa.',
            'Phút 3:30: Vỗ tay đồng thanh 3 phách theo nhịp bài vè.',
            'Phút 4:50: Mở sách và sẵn sàng vào bài học mới.'
          ],
          responsePrompts: [
            `Leader hỏi: "Are you ready?" -> Cả lớp đáp: "YES, WE ARE!"`,
            `Leader hô: "English is fun!" -> Cả lớp hô: "WE LOVE ENGLISH!"`
          ]
        },
        transitionToLesson: {
          bridgeSpeech: `Chúng ta vừa ôn lại các từ vựng và mẫu câu tuyệt vời về chủ đề ${formData.topic}!`,
          teacherClosingSentence: `Cả lớp mở sách ${formData.textbook} ${formData.unit} - ${formData.lesson} để bắt đầu tiết học nhé!`,
          leadInQuestion: `Ai có thể đặt một câu với từ vựng vừa rồi trước khi vào bài nào?`
        },
        teacherGuide: {
          preparation: [
            `Chuẩn bị phiếu kịch bản 1 trang cho nhóm học sinh trước 1 ngày.`,
            `Chuẩn bị micro đồ chơi hoặc đạo cụ tương ứng.`,
            `Dành 2 phút giờ ra chơi dặn học sinh tự tin nói to rõ.`
          ],
          beforeClassBriefing: `Nhắc các con cười tươi, nhìn về phía bạn bè và nói to rõ ràng.`,
          stageArrangement: `Đứng trước bảng, khoảng cách 1-2 mét giữa các bạn.`,
          props: idea.propsNeeded,
          timingSummary: `Tổng thời lượng: 4 phút 50 giây (Đúng chuẩn 5 phút).`,
          teacherRole: `Đứng bên quan sát, mỉm cười khích lệ và bước lên ở phút 4:20 để chốt bài.`,
          classroomManagementTips: [
            `Quy định khẩu lệnh vỗ tay để giữ trật tự nhanh sau phần hô đồng thanh.`,
            `Khích lệ học sinh nhút nhát tham gia phần hô cùng cả lớp.`
          ],
          suggestedPraiseFeedback: [
            `Giọng đọc to, phát âm rất chuẩn xác!`,
            `Phối hợp nhóm rất ăn ý và tự tin!`,
            `Khởi động rất tràn đầy năng lượng!`
          ],
          speakingTipsFeedback: [
            `Nhớ ngẩng cao đầu và phát âm rõ âm cuối nhé!`,
            `Cười thật tươi khi nói tiếng Anh sẽ rất hay!`
          ]
        },
        createdAt: new Date().toISOString(),
        isFavorite: false
      };

      setCurrentScript(generated);
      setActiveStep('script');
      sounds.playLevelUp?.();
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Surprise Me 🎲 (Instant 1-Click Creative Magic)
  const handleSurpriseMe = async () => {
    sounds.playLevelUp?.();
    const randomPreset = CURRICULUM_QUICK_PRESETS[Math.floor(Math.random() * CURRICULUM_QUICK_PRESETS.length)];
    const randomType = WARMUP_TYPES_CATALOG[Math.floor(Math.random() * WARMUP_TYPES_CATALOG.length)];

    setFormData(prev => ({
      ...prev,
      grade: randomPreset.grade,
      textbook: randomPreset.textbook,
      unit: randomPreset.unit,
      lesson: randomPreset.lesson,
      topic: randomPreset.topic,
      vocabulary: randomPreset.vocabulary,
      sentencePatterns: randomPreset.sentencePatterns,
      level: randomPreset.level,
      preferredTypes: [randomType.type, 'ai_creative_mix']
    }));

    // Directly generate ideas and select the first one
    setIsSuggestingIdeas(true);
    setTimeout(() => {
      handleSuggestIdeas();
    }, 400);
  };

  // Quick Transform Refiners ("Make it funnier", "Add chant", etc.)
  const handleRefineScript = async (modifier: string, label: string) => {
    sounds.playClick();
    setIsRefiningScript(true);
    setRefineActionLabel(label);

    try {
      const res = await fetch('/api/warmup/refine-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: currentScript,
          modifier
        })
      });

      if (res.ok) {
        const updated = await res.json();
        if (updated && updated.title) {
          setCurrentScript({
            ...updated,
            id: 'script_' + Date.now(),
            createdAt: new Date().toISOString()
          });
          sounds.playLevelUp?.();
          return;
        }
      }
      throw new Error('API refine fallback');
    } catch (err) {
      console.warn('Refine fallback execution:', err);
      // Fast client-side mutation based on modifier
      const mutated: WarmupScript = {
        ...currentScript,
        title: `${currentScript.title} (${label})`,
        scenes: currentScript.scenes.map((sc, scIdx) => {
          if (scIdx === 1) {
            return {
              ...sc,
              lines: [
                ...sc.lines,
                {
                  id: 'refine_' + Date.now(),
                  speaker: currentScript.characters[0]?.name || 'LEADER',
                  speakerType: 'host',
                  lineEnglish: modifier === 'funny' 
                    ? `Wait a second! Is that a dancing dinosaur over there? No, it's our English superstar!`
                    : modifier === 'chant'
                    ? `Clap, clap! Snap, snap! English words are in my backpack!`
                    : `Speak louder! 1, 2, 3, English energy!`,
                  lineVietnamese: modifier === 'funny'
                    ? `Chờ một chút! Có phải một chú khủng long đang nhảy múa không? Không, đó là ngôi sao tiếng Anh của chúng ta!`
                    : `Vỗ tay nào! Tiếng Anh đang rộn ràng trong ba lô của chúng ta!`,
                  stageDirection: `[Làm cử chỉ hài hước và cười rạng rỡ với cả lớp.]`,
                  timing: '1:45'
                }
              ]
            };
          }
          return sc;
        })
      };
      setCurrentScript(mutated);
      sounds.playLevelUp?.();
    } finally {
      setIsRefiningScript(false);
      setRefineActionLabel('');
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = () => {
    sounds.playClick();
    const updated = {
      ...currentScript,
      isFavorite: !currentScript.isFavorite
    };
    setCurrentScript(updated);

    // Save/update in library
    const exists = savedScripts.some(s => s.id === updated.id);
    let newList = [];
    if (exists) {
      newList = savedScripts.map(s => s.id === updated.id ? updated : s);
    } else {
      newList = [updated, ...savedScripts];
    }
    saveScriptsToStorage(newList);
  };

  // Save to Library
  const handleSaveToLibrary = () => {
    sounds.playClick();
    const exists = savedScripts.some(s => s.id === currentScript.id);
    let newList = [];
    if (exists) {
      newList = savedScripts.map(s => s.id === currentScript.id ? currentScript : s);
    } else {
      newList = [currentScript, ...savedScripts];
    }
    saveScriptsToStorage(newList);
    alert('Đã lưu kịch bản vào Kho Kịch Bản Khởi Động của bạn! 🎉');
  };

  // Play Line Audio
  const handlePlayLineAudio = (line: { id: string; lineEnglish: string }) => {
    sounds.playClick();
    setPlayingAudioLineId(line.id);
    englishSpeech.speak(line.lineEnglish, {
      onEnd: () => {
        setPlayingAudioLineId(null);
      },
      onError: () => {
        setPlayingAudioLineId(null);
      }
    });
  };

  // Student Roster Helpers
  const handleAddStudent = () => {
    sounds.playClick();
    const nextIdx = formData.students.length + 1;
    const newStudent: StudentProfile = {
      id: 'st_' + Date.now(),
      name: `Student ${nextIdx}`,
      gradeClass: `${formData.grade}A`,
      interest: 'Singing & Games',
      talent: 'Speaking',
      speakingAbility: 'confident'
    };
    setFormData(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));
  };

  const handleRemoveStudent = (id: string) => {
    sounds.playClick();
    if (formData.students.length <= 2) {
      alert('Cần tối thiểu 2 học sinh để tạo kịch bản tương tác.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id)
    }));
  };

  const handleUpdateStudent = (id: string, field: keyof StudentProfile, value: any) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner Header */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 text-white shadow-2xl border border-indigo-500/30 overflow-hidden">
        
        {/* Glow Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-pink-500 text-white font-fredoka font-black text-xs shadow-md uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                AI English Warm-up Studio
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-mono">
                ⏱ Chuẩn 5 Phút Khởi Động • Lớp 1–5
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
                📚 Bám sát Global Success & Smart Start
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-fredoka font-black text-white leading-tight">
              5-Minute Creative Warm-up Generator
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Quy trình sư phạm chuẩn: <strong className="text-amber-300">INPUT → ANALYZE → GỢI Ý 3-5 Ý TƯỞNG → CHỌN → TẠO KỊCH BẢN CHI TIẾT → LUYỆN TẬP → XUẤT FILE</strong>. Giúp học sinh tự tin nói tiếng Anh, biểu diễn hào hứng ngay từ phút đầu tiên của tiết học.
            </p>

            {/* Quick Links & Preset Bar */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-fredoka font-bold text-slate-400">Mẫu gợi ý nhanh:</span>
              {CURRICULUM_QUICK_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 text-xs font-fredoka font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Lớp {p.grade} ({p.unit.split(':')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Action Hub Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            {/* Surprise Me 🎲 */}
            <button
              type="button"
              onClick={handleSurpriseMe}
              disabled={isSuggestingIdeas || isGeneratingScript}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-950 font-fredoka font-black text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Dices className="w-5 h-5 text-slate-950 animate-bounce" />
              <span>🎲 SURPRISE ME (Khởi Động Bất Ngờ)</span>
            </button>

            {/* Create New Script / Edit Input */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setActiveStep('input');
                }}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Soạn Kịch Bản Mới</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsLibraryDrawerOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <FolderArchive className="w-4 h-4 text-amber-400" />
                <span>Kho Đã Lưu ({savedScripts.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workflow Breadcrumb Steps */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-fredoka font-bold">
            <button
              type="button"
              onClick={() => setActiveStep('input')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeStep === 'input'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>1. Nhập Dữ Liệu & Học Sinh</span>
            </button>

            <ChevronRight className="w-4 h-4 text-slate-600" />

            <button
              type="button"
              onClick={() => suggestedIdeas.length > 0 && setActiveStep('ideas')}
              disabled={suggestedIdeas.length === 0}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                activeStep === 'ideas'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : suggestedIdeas.length > 0
                  ? 'text-slate-400 hover:text-slate-200 cursor-pointer'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>2. Gợi Ý 3-5 Ý Tưởng ({suggestedIdeas.length})</span>
            </button>

            <ChevronRight className="w-4 h-4 text-slate-600" />

            <button
              type="button"
              onClick={() => setActiveStep('script')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeStep === 'script'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>3. Kịch Bản Chi Tiết & Luyện Tập</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-indigo-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Primary English Specialist</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: INPUT FORM & STUDENT ROSTER */}
      {/* ========================================================================= */}
      {activeStep === 'input' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 flex-wrap gap-2">
            <div>
              <h2 className="font-fredoka font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>Bước 1: Thiết Lập Nội Dung Bài Học & Danh Sách Học Sinh</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                AI sẽ phân tích khối lớp, bài học và cá nhân hóa vai diễn theo danh sách học sinh thực tế của bạn.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSuggestIdeas}
              disabled={isSuggestingIdeas}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-fredoka font-black text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isSuggestingIdeas ? 'animate-spin' : 'text-amber-300'}`} />
              <span>{isSuggestingIdeas ? 'AI Đang Phân Tích & Đề Xuất...' : 'Phân Tích & Gợi Ý 3-5 Ý Tưởng 🚀'}</span>
            </button>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Grade Selection */}
            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-2">
                1. Khối Lớp (Grade 1-5):
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setFormData(prev => ({ ...prev, grade: g as WarmupGrade }));
                    }}
                    className={`py-2.5 rounded-2xl font-fredoka font-bold text-sm transition-all cursor-pointer ${
                      formData.grade === g
                        ? 'bg-indigo-600 text-white shadow-md scale-105 border border-indigo-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Textbook Selection */}
            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-2">
                2. Bộ Sách Giáo Khoa:
              </label>
              <select
                value={formData.textbook}
                onChange={(e) => setFormData(prev => ({ ...prev, textbook: e.target.value as any }))}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Global Success">Global Success (Bộ GD&ĐT / Kết nối tri thức)</option>
                <option value="I Learn Smart Start">I-Learn Smart Start</option>
                <option value="Other">Chương trình / Bộ sách khác</option>
              </select>
            </div>

            {/* Level Difficulty */}
            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-2">
                3. Trình Độ Lớp Học:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'easy', label: 'Cơ bản (Dễ)' },
                  { val: 'standard', label: 'Tiêu chuẩn' },
                  { val: 'advanced', label: 'Nâng cao' }
                ].map((lvl) => (
                  <button
                    key={lvl.val}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setFormData(prev => ({ ...prev, level: lvl.val as WarmupLevel }));
                    }}
                    className={`py-2.5 rounded-xl font-fredoka font-bold text-xs transition-all cursor-pointer ${
                      formData.level === lvl.val
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Unit, Lesson & Topic Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Tên Bài / Unit:
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                placeholder="Ví dụ: Unit 1: My Friends"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Tiết / Lesson:
              </label>
              <input
                type="text"
                value={formData.lesson}
                onChange={(e) => setFormData(prev => ({ ...prev, lesson: e.target.value }))}
                placeholder="Ví dụ: Lesson 1: Describing Friends"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Chủ Đề Cụ Thể (Topic):
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="Ví dụ: Tính cách bạn bè, hoạt động giờ ra chơi"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Vocabulary & Sentence Patterns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Từ Vựng Trọng Tâm (Vocabulary):</span>
                <span className="text-[10px] text-slate-400">Cách nhau bằng dấu phẩy</span>
              </label>
              <textarea
                rows={2}
                value={formData.vocabulary}
                onChange={(e) => setFormData(prev => ({ ...prev, vocabulary: e.target.value }))}
                placeholder="friendly, kind, funny, tall, short, clever, helpful"
                className="w-full px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Mẫu Câu Trọng Tâm (Sentence Patterns):</span>
                <span className="text-[10px] text-slate-400">Các mẫu câu cần thực hành</span>
              </label>
              <textarea
                rows={2}
                value={formData.sentencePatterns}
                onChange={(e) => setFormData(prev => ({ ...prev, sentencePatterns: e.target.value }))}
                placeholder="What's your friend like? - He's friendly and funny. Is he tall? - Yes, he is."
                className="w-full px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Preferred Warm-up Formats (Multi-select) */}
          <div className="space-y-2">
            <label className="block text-xs font-fredoka font-bold text-slate-700 dark:text-slate-300">
              Thể Loại Ưu Tiên (Chọn 1 hoặc nhiều):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {WARMUP_TYPES_CATALOG.map((wt) => {
                const isSelected = formData.preferredTypes.includes(wt.type);
                return (
                  <div
                    key={wt.type}
                    onClick={() => {
                      sounds.playClick();
                      setFormData(prev => {
                        const exists = prev.preferredTypes.includes(wt.type);
                        return {
                          ...prev,
                          preferredTypes: exists 
                            ? prev.preferredTypes.filter(t => t !== wt.type)
                            : [...prev.preferredTypes, wt.type]
                        };
                      });
                    }}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base">{wt.emoji}</span>
                      <span className="font-fredoka font-bold text-xs leading-tight">{wt.label.split('(')[0]}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{wt.shortDesc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student Roster Manager (Personalization) */}
          <div className="p-5 rounded-3xl bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 space-y-4">
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h3 className="font-fredoka font-bold text-sm text-slate-900 dark:text-white">
                    Danh Sách Diễn Viên Nhí ({formData.students.length} Học Sinh)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cá nhân hóa lời thoại phù hợp với sở thích, năng khiếu và mức độ tự tin của từng em.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddStudent}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Học Sinh</span>
              </button>
            </div>

            {/* Students List Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {formData.students.map((st, sIdx) => (
                <div
                  key={st.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold">
                      #{sIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStudent(st.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      title="Xóa học sinh"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Tên học sinh:</label>
                    <input
                      type="text"
                      value={st.name}
                      onChange={(e) => handleUpdateStudent(st.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Talent */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Năng khiếu / Vai trò:</label>
                    <select
                      value={st.talent || 'Speaking'}
                      onChange={(e) => handleUpdateStudent(st.id, 'talent', e.target.value)}
                      className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <option value="Singing">Ca hát / Đọc vè (Singing/Chant)</option>
                      <option value="Acting">Diễn xuất kịch tính (Acting)</option>
                      <option value="Speaking">Nói tự tin / MC (Hosting)</option>
                      <option value="Comedy">Hài hước / Biểu cảm (Comedy)</option>
                      <option value="Dancing">Vận động múa nhảy (Dancing/TPR)</option>
                    </select>
                  </div>

                  {/* Speaking Confidence */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Mức độ tự tin:</label>
                    <select
                      value={st.speakingAbility || 'confident'}
                      onChange={(e) => handleUpdateStudent(st.id, 'speakingAbility', e.target.value as any)}
                      className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <option value="confident">Tự tin (Nói nhiều câu)</option>
                      <option value="moderate">Vừa phải (Câu ngắn)</option>
                      <option value="shy">Rụt rè (Hô 1-2 từ + Động tác)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSuggestIdeas}
              disabled={isSuggestingIdeas}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-fredoka font-black text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-5 h-5 ${isSuggestingIdeas ? 'animate-spin' : 'text-amber-300'}`} />
              <span>{isSuggestingIdeas ? 'AI Đang Phân Tích & Sáng Tạo Ý Tưởng...' : 'Khám Phá 3-5 Ý Tưởng Khởi Động Độc Đáo (5 Phút) 🚀'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: SUGGESTED IDEAS SELECTION (3-5 IDEAS) */}
      {/* ========================================================================= */}
      {activeStep === 'ideas' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between flex-wrap gap-3 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-fredoka font-bold">
                BƯỚC 2: CHỌN Ý TƯỞNG HOẠT ĐỘNG
              </span>
              <h2 className="text-xl font-fredoka font-bold text-slate-900 dark:text-white mt-1">
                AI Đã Sáng Tạo {suggestedIdeas.length} Ý Tưởng Khởi Động 5 Phút Phù Hợp:
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nhấp vào ý tưởng bạn yêu thích nhất để AI viết kịch bản chi tiết có thoại, phân vai và sơ đồ sân khấu.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSuggestIdeas}
                disabled={isSuggestingIdeas}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-fredoka font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSuggestingIdeas ? 'animate-spin' : ''}`} />
                <span>Gợi ý các ý tưởng khác</span>
              </button>
            </div>
          </div>

          {/* Ideas Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {suggestedIdeas.map((idea, idx) => (
              <WarmupIdeaCard
                key={idea.id}
                idea={idea}
                index={idx}
                isSelected={selectedIdea?.id === idea.id}
                onSelect={(chosen) => handleGenerateScriptFromIdea(chosen)}
                isGenerating={isGeneratingScript}
              />
            ))}
          </div>

          {/* Loading Indicator when generating */}
          {isGeneratingScript && (
            <div className="p-8 rounded-3xl bg-indigo-900/90 text-white text-center space-y-3 shadow-2xl border border-indigo-500/40 animate-pulse">
              <Sparkles className="w-10 h-10 text-amber-300 mx-auto animate-spin" />
              <h3 className="font-fredoka font-bold text-lg">
                Đang viết toàn bộ kịch bản 5 phút có lời thoại, chỉ dẫn sân khấu và hướng dẫn giáo viên...
              </h3>
              <p className="text-xs text-indigo-200">
                Tối ưu phân phối thời gian 0:00 - 5:00 • Cá nhân hóa lời thoại cho {formData.students.map(s => s.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: FULL SCRIPT VIEWER, STAGE DIAGRAM & REHEARSAL */}
      {/* ========================================================================= */}
      {activeStep === 'script' && currentScript && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Main Action Bar for Current Script */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-fredoka font-bold text-xs">
                  {currentScript.warmupTypeLabel}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold">
                  ⏱ {currentScript.duration}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-fredoka font-semibold">
                  Lớp {currentScript.grade} • {currentScript.textbook}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-fredoka font-black text-slate-900 dark:text-white">
                {currentScript.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentScript.unit} • {currentScript.lesson} (Chủ đề: {currentScript.topic})
              </p>
            </div>

            {/* Action Buttons: Practice, Export, Favorite */}
            <div className="flex items-center gap-2 flex-wrap">
              
              {/* Practice Teleprompter Button */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsTeleprompterOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-fredoka font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Vào Chế Độ Luyện Tập (Teleprompter)</span>
              </button>

              {/* Export Word / PDF */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsExportModalOpen(true);
                }}
                className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Word / PDF</span>
              </button>

              {/* Save / Favorite Toggle */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  currentScript.isFavorite
                    ? 'bg-amber-50 dark:bg-amber-950 border-amber-400 text-amber-500'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                }`}
                title="Lưu vào mục yêu thích"
              >
                <Star className={`w-5 h-5 ${currentScript.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Transform Modifiers Strip */}
          <div className="p-4 rounded-3xl bg-slate-900 text-white border border-indigo-500/30 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-fredoka font-bold text-indigo-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Biến Hóa Nhanh Bằng 1 Nhấp (AI Refinement Modes):
              </span>
              {isRefiningScript && (
                <span className="text-amber-300 animate-pulse font-normal">
                  Đang điều chỉnh: {refineActionLabel}...
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'funny', label: '😂 Làm Hài Hước Hơn', mod: 'funny' },
                { id: 'energy', label: '⚡ Tăng Năng Lượng & TPR', mod: 'energy' },
                { id: 'chant', label: '🥁 Thêm Bài Vè (Chant)', mod: 'chant' },
                { id: 'song', label: '🎶 Thêm Điệu Hát Ngắn', mod: 'song' },
                { id: 'talkshow', label: '🎤 Chuyển Sang Talk Show', mod: 'talkshow' },
                { id: 'game', label: '🎲 Thêm Trò Chơi Mini', mod: 'game' },
                { id: 'audience', label: '👥 Tăng Tương Tác Cả Lớp', mod: 'audience' },
                { id: 'shorter', label: '✂️ Rút Ngắn Gọn Hơn (3-4p)', mod: 'shorter' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  disabled={isRefiningScript}
                  onClick={() => handleRefineScript(btn.mod, btn.label)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 disabled:opacity-50 text-slate-200 hover:text-white border border-slate-700 text-xs font-fredoka font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* SCRIPT TOP INFO TILES: Objectives & Meet Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Language Focus & Objectives */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-fredoka font-bold text-base text-slate-900 dark:text-white">
                  Mục Tiêu & Trọng Tâm Ngôn Ngữ (Language Focus)
                </h3>
              </div>

              {/* Vocabulary Badges */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Từ Vựng Trọng Tâm:</label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentScript.languageFocus.vocabulary.map((vocab, vIdx) => (
                    <span
                      key={vIdx}
                      className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-fredoka font-bold"
                    >
                      {vocab}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sentence Patterns */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Mẫu Câu Trọng Tâm:</label>
                <div className="space-y-1">
                  {currentScript.languageFocus.sentencePatterns.map((pat, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                    >
                      💬 “{pat}”
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectives List */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Mục Tiêu Sư Phạm:</label>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentScript.objectives.map((obj, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Meet Our Performers & Character Personalities */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-fredoka font-bold text-base text-slate-900 dark:text-white">
                    Gặp Gỡ Các Diễn Viên Nhí (Meet Our Performers)
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {currentScript.characters.length} Bạn nhỏ
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 italic font-medium">
                “{currentScript.meetOurPerformers.introGreeting}”
              </div>

              {/* Character Cards */}
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {currentScript.characters.map((char, cIdx) => (
                  <div
                    key={cIdx}
                    onClick={() => setSelectedCharacterFilter(selectedCharacterFilter === char.name ? null : char.name)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedCharacterFilter === char.name
                        ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 ring-2 ring-indigo-400/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-fredoka font-bold text-sm text-indigo-600 dark:text-indigo-400">
                          {char.name}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">({char.roleTitle})</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 font-mono text-slate-700 dark:text-slate-300">
                        {char.speakingLoad === 'heavy' ? 'Nói nhiều' : char.speakingLoad === 'medium' ? 'Nói vừa' : 'Nói ngắn/Động tác'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{char.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STAGE FORMATION INTERACTIVE VISUAL MAP */}
          <StageFormationDiagram
            formation={currentScript.stageFormation}
            characters={currentScript.characters}
            selectedCharacter={selectedCharacterFilter}
            onSelectCharacter={(name) => {
              setSelectedCharacterFilter(selectedCharacterFilter === name ? null : name);
            }}
          />

          {/* TIMELINE RIBBON (0:00 - 5:00) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <h3 className="font-fredoka font-bold text-sm text-slate-900 dark:text-white">
                  Phân Bổ Thời Gian Chuẩn 5 Phút (0:00 - 5:00)
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Strictly ~5 Mins
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
              {currentScript.timingBreakdown.map((tb, tIdx) => (
                <div
                  key={tIdx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">
                    {tb.range}
                  </span>
                  <p className="font-fredoka font-bold text-xs text-slate-900 dark:text-white">
                    {tb.sectionName}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tb.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FULL SCENE-BY-SCENE SCRIPT VIEW */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-fredoka font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Toàn Bộ Kịch Bản Chi Tiết (Full Script with Stage Directions)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedCharacterFilter 
                    ? `Đang lọc hiển thị lời thoại của riêng bạn: ${selectedCharacterFilter}`
                    : 'Bao gồm lời thoại tiếng Anh, nghĩa tiếng Việt, hướng dẫn động tác [Stage Directions] và nút nghe mẫu.'}
                </p>
              </div>

              {selectedCharacterFilter && (
                <button
                  type="button"
                  onClick={() => setSelectedCharacterFilter(null)}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-fredoka font-bold flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Bỏ lọc nhân vật (Hiện tất cả)</span>
                </button>
              )}
            </div>

            {/* Scenes List */}
            <div className="space-y-6">
              {currentScript.scenes.map((scene) => {
                // Filter lines if character is selected
                const visibleLines = selectedCharacterFilter
                  ? scene.lines.filter(l => l.speaker.toLowerCase().includes(selectedCharacterFilter.toLowerCase()) || l.speaker === 'CLASS' || l.speaker === 'ALL')
                  : scene.lines;

                if (visibleLines.length === 0) return null;

                return (
                  <div
                    key={scene.id}
                    className="p-5 sm:p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    {/* Scene Header */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-fredoka font-bold text-xs">
                          CẢNH {scene.sceneNumber}
                        </span>
                        <h4 className="font-fredoka font-bold text-base text-slate-900 dark:text-white">
                          {scene.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-mono">{scene.timeRange}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      Mục đích: {scene.purpose}
                    </p>

                    {/* Dialog Lines */}
                    <div className="space-y-3 pt-2">
                      {visibleLines.map((line) => {
                        const isSpeaking = playingAudioLineId === line.id;
                        return (
                          <div
                            key={line.id}
                            className={`p-4 rounded-2xl border transition-all ${
                              line.speakerType === 'host'
                                ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/60'
                                : line.speakerType === 'class'
                                ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60'
                                : line.speakerType === 'teacher'
                                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            {/* Speaker Tag + Timing + Audio Button */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-full font-fredoka font-black text-xs uppercase ${
                                  line.speakerType === 'host'
                                    ? 'bg-indigo-600 text-white'
                                    : line.speakerType === 'class'
                                    ? 'bg-amber-500 text-slate-950'
                                    : line.speakerType === 'teacher'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-purple-600 text-white'
                                }`}>
                                  {line.speaker}
                                </span>

                                {line.timing && (
                                  <span className="text-[10px] font-mono text-slate-400">
                                    [{line.timing}]
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlayLineAudio(line)}
                                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-600 dark:text-slate-300 text-xs font-fredoka font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                                title="Nghe phát âm tiếng Anh chuẩn"
                              >
                                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-amber-400' : ''}`} />
                                <span>{isSpeaking ? 'Đang phát...' : 'Nghe'}</span>
                              </button>
                            </div>

                            {/* Stage Direction */}
                            {line.stageDirection && (
                              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 italic mb-1.5">
                                🎭 {line.stageDirection}
                              </p>
                            )}

                            {/* English Dialogue */}
                            <p className="text-base font-fredoka font-bold text-slate-900 dark:text-white leading-relaxed">
                              “{line.lineEnglish}”
                            </p>

                            {/* Vietnamese Meaning */}
                            {line.lineVietnamese && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                                ({line.lineVietnamese})
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WHOLE-CLASS INTERACTION & LESSON BRIDGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Whole Class Interaction Moments */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                <h3 className="font-fredoka font-bold text-base text-slate-900 dark:text-white">
                  Điểm Tương Tác Cả Lớp (Whole-Class Interaction)
                </h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {currentScript.wholeClassInteraction.interactionMoments.map((im, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{im}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transition to Lesson Bridge */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-fredoka font-bold text-base text-emerald-950 dark:text-emerald-200">
                  Chuyển Tiếp Vào Bài Học (Transition to Lesson)
                </h3>
              </div>

              <div className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900 space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block">Lời cầu nối (Bridge Speech):</span>
                  <p className="italic">“{currentScript.transitionToLesson.bridgeSpeech}”</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900 space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block">Câu chốt của giáo viên:</span>
                  <p className="font-semibold">“{currentScript.transitionToLesson.teacherClosingSentence}”</p>
                </div>
              </div>
            </div>
          </div>

          {/* TEACHER'S QUICK GUIDE ACCORDION */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-indigo-500/40 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-2xl bg-indigo-600/40 text-indigo-300 border border-indigo-500/30">
                  <BookOpen className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-fredoka font-bold text-lg text-white">
                    Hướng Dẫn Nhanh Dành Cho Giáo Viên (Teacher's Guide)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Chuẩn bị đạo cụ, nhắc nhở trước giờ học, quản lý lớp và lời khen ngợi.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveToLibrary}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-fredoka font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Lưu Vào Thư Viện Của Tôi</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Preparation & Briefing */}
              <div className="space-y-2">
                <h4 className="font-fredoka font-bold text-xs text-indigo-300 uppercase">
                  1. Chuẩn Bị & Dặn Dò Trước Giờ:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  {currentScript.teacherGuide.beforeClassBriefing}
                </p>
                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  <span className="font-bold text-slate-300">Đạo cụ cần có:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentScript.props.map((pr, pIdx) => (
                      <span key={pIdx} className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-amber-300">
                        • {pr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Teacher Role & Management */}
              <div className="space-y-2">
                <h4 className="font-fredoka font-bold text-xs text-indigo-300 uppercase">
                  2. Vai Trò Của Cô Trong 5 Phút:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  {currentScript.teacherGuide.teacherRole}
                </p>
                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  <span className="font-bold text-slate-300">Mẹo quản lý lớp:</span>
                  <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                    {currentScript.teacherGuide.classroomManagementTips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Praise Feedback */}
              <div className="space-y-2">
                <h4 className="font-fredoka font-bold text-xs text-indigo-300 uppercase">
                  3. Nhận Xét & Lời Khen Ngợi Gợi Ý:
                </h4>
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400 block">Lời khen tích cực:</span>
                  <ul className="text-xs text-slate-200 space-y-1">
                    {currentScript.teacherGuide.suggestedPraiseFeedback.map((pf, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-1.5">
                        <Smile className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>“{pf}”</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SAVED SCRIPTS LIBRARY DRAWER / MODAL */}
      {/* ========================================================================= */}
      {isLibraryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh]">
            
            {/* Header */}
            <div className="px-6 py-4 bg-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderArchive className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-fredoka font-bold text-base">Kho Kịch Bản Khởi Động Đã Lưu</h3>
                  <p className="text-xs text-indigo-100">Tổng cộng {savedScripts.length} kịch bản 5 phút</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLibraryDrawerOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Grade Tabs */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-fredoka font-bold text-slate-500">Lọc theo khối lớp:</span>
              {['all', '1', '2', '3', '4', '5'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setLibraryFilterGrade(g)}
                  className={`px-3 py-1 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                    libraryFilterGrade === g
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {g === 'all' ? 'Tất cả' : `Lớp ${g}`}
                </button>
              ))}
            </div>

            {/* Saved List Grid */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedScripts
                .filter(s => libraryFilterGrade === 'all' || s.grade.toString() === libraryFilterGrade)
                .map((scr) => (
                  <div
                    key={scr.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-fredoka font-bold">
                          Lớp {scr.grade} • {scr.warmupTypeLabel.split('(')[0]}
                        </span>
                        {scr.isFavorite && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                      </div>

                      <h4 className="font-fredoka font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                        {scr.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {scr.unit} - {scr.lesson} ({scr.topic})
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">{scr.duration}</span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            setCurrentScript(scr);
                            setActiveStep('script');
                            setIsLibraryDrawerOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs transition-all cursor-pointer"
                        >
                          Mở Kịch Bản
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsLibraryDrawerOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-fredoka font-bold transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRACTICE / TELEPROMPTER MODAL */}
      <PracticeTeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        script={currentScript}
        initialFilterStudent={selectedCharacterFilter}
      />

      {/* EXPORT WORD / PDF MODAL */}
      <WarmupExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        script={currentScript}
      />
    </div>
  );
}
