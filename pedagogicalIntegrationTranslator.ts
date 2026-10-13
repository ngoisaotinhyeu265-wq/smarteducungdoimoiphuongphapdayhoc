/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Bộ công cụ dịch thuật và chuẩn hóa nội dung tích hợp liên môn sang Tiếng Anh Sư Phạm
 * Theo chuẩn Công văn 2345/BGDĐT-GDTH, Công văn 3456/BGDĐT-GDPT, Thông tư 02/2025/TT-BGDĐT
 * Quyết định 2422/QĐ-BGDĐT (Khung AI) và Giáo dục hòa nhập học sinh khuyết tật (NTKT).
 */

export type IntegrationDomainId = 
  | 'gdhn'        // Giáo dục hòa nhập học sinh khuyết tật (NTKT)
  | 'kns'         // Kỹ năng sống (Life skills)
  | 'atgt'        // An toàn giao thông (Traffic safety)
  | 'nls'         // Năng lực số (Digital competence)
  | 'ai'          // Trí tuệ nhân tạo (AI Literacy)
  | 'ethics'      // Đạo đức & Lối sống (Moral & Ethics)
  | 'environment' // Bảo vệ môi trường (Environmental Protection)
  | 'stem'        // STEM / STEAM
  | 'custom';     // Tùy chỉnh khác

export interface DomainMeta {
  id: IntegrationDomainId;
  codePrefix: string;
  nameVn: string;
  nameEn: string;
  iconName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  cardBg: string;
  cardBorder: string;
  cardText: string;
  accentColor: string;
  circularRef: string;
  defaultSuggestions: Array<{
    code: string;
    vn: string;
    en: string;
  }>;
}

export interface FlexibleIntegrationItem {
  id: string;
  code: string;               // e.g. "TH-GDHN-01", "TH-NLS-02"
  domain: IntegrationDomainId;
  domainLabelVn: string;
  domainLabelEn: string;
  contentVn: string;          // Nội dung Tiếng Việt do GV nhập hoặc chọn
  contentEn: string;          // Nội dung Tiếng Anh Sư Phạm (Tự động chuyển đổi hoặc chỉnh sửa)
  enabled?: boolean;
}

export const INTEGRATION_DOMAINS: Record<IntegrationDomainId, DomainMeta> = {
  gdhn: {
    id: 'gdhn',
    codePrefix: 'TH-GDHN',
    nameVn: 'Giáo dục hòa nhập (HS khuyết tật)',
    nameEn: 'Inclusive Education for Students with Disabilities',
    iconName: 'Accessibility',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70',
    badgeBorder: 'border-emerald-400 dark:border-emerald-600',
    badgeText: 'text-emerald-900 dark:text-emerald-200',
    cardBg: 'bg-emerald-50/90 dark:bg-emerald-950/40',
    cardBorder: 'border-emerald-300 dark:border-emerald-800',
    cardText: 'text-emerald-950 dark:text-emerald-100',
    accentColor: '#059669',
    circularRef: 'Thông tư 03/2018/TT-BGDĐT & CV 2345',
    defaultSuggestions: [
      {
        code: 'TH-GDHN-01',
        vn: 'Hỗ trợ học sinh khuyết tật nhìn/nghe qua hình ảnh phóng to, cử chỉ điệu bộ TPR và bạn học đồng hành hỗ trợ.',
        en: 'Support students with visual/auditory impairments using enlarged flashcards, TPR gestures, and collaborative peer scaffolding.'
      },
      {
        code: 'TH-GDHN-02',
        vn: 'Giảm tải yêu cầu cần đạt: cho phép học sinh nhắc lại từ đơn lẻ, chỉ vào tranh ảnh minh họa thay vì đọc đoạn văn dài.',
        en: 'Differentiate learning expectations: allow students to repeat single target words and point to visual illustrations instead of reciting long passages.'
      },
      {
        code: 'TH-GDHN-03',
        vn: 'Tạo môi trường lớp học hòa nhập, khích lệ động viên kịp thời, chống kỳ thị và xây dựng tinh thần tương thân tương ái.',
        en: 'Foster an inclusive classroom atmosphere, provide timely praise and positive reinforcement, and prevent stigma through empathy and mutual support.'
      },
      {
        code: 'TH-GDHN-04',
        vn: 'Bố trí chỗ ngồi thuận lợi gần giáo viên và bảng tương tác, tăng thời gian hoàn thành bài tập nhóm theo năng lực cá nhân.',
        en: 'Arrange accessible seating close to the teacher and interactive display, extending group task completion time aligned with individual abilities.'
      }
    ]
  },
  nls: {
    id: 'nls',
    codePrefix: 'TH-NLS',
    nameVn: 'Năng lực số',
    nameEn: 'Digital Competence',
    iconName: 'Cpu',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/70',
    badgeBorder: 'border-sky-400 dark:border-sky-600',
    badgeText: 'text-sky-900 dark:text-sky-200',
    cardBg: 'bg-sky-50/90 dark:bg-sky-950/40',
    cardBorder: 'border-sky-300 dark:border-sky-800',
    cardText: 'text-sky-950 dark:text-sky-100',
    accentColor: '#0284c7',
    circularRef: 'Thông tư 02/2025/TT-BGDĐT & CV 3456',
    defaultSuggestions: [
      {
        code: 'TH-NLS-01',
        vn: 'Khai thác kho học liệu số hoclieu.vn, sách mềm tương tác và video bài giảng trực quan.',
        en: 'Navigate digital learning repositories on hoclieu.vn, interactive digital courseware, and multimedia video tutorials.'
      },
      {
        code: 'TH-NLS-02',
        vn: 'Học sinh tương tác trực tiếp trên màn hình cảm ứng thông minh hoặc máy tính bảng để kéo thả từ vựng.',
        en: 'Students engage directly on interactive smartboards or tablet devices to drag and drop vocabulary flashcards.'
      },
      {
        code: 'TH-NLS-03',
        vn: 'Luyện tập nghe phát âm bản ngữ qua tệp âm thanh số MP3 và nhận diện thiết bị công nghệ thông tin lớp học.',
        en: 'Practice native listening pronunciation via digital MP3 audio tracks and identify classroom educational technology devices.'
      },
      {
        code: 'TH-NLS-04',
        vn: 'Hình thành thói quen bảo vệ dữ liệu cá nhân khi sử dụng thiết bị kết nối mạng Internet an toàn.',
        en: 'Develop digital citizenship habits regarding personal data privacy when using school internet-connected learning devices.'
      }
    ]
  },
  kns: {
    id: 'kns',
    codePrefix: 'TH-KNS',
    nameVn: 'Kỹ năng sống',
    nameEn: 'Life Skills',
    iconName: 'HeartHandshake',
    badgeBg: 'bg-amber-500',
    badgeBorder: 'border-amber-600',
    badgeText: 'text-slate-950 font-bold',
    cardBg: 'bg-amber-50/95 dark:bg-amber-950/40',
    cardBorder: 'border-2 border-amber-400 dark:border-amber-500 shadow-xs',
    cardText: 'text-amber-950 dark:text-amber-100',
    accentColor: '#d97706',
    circularRef: 'Thông tư 04/2014/TT-BGDĐT & CV 3456',
    defaultSuggestions: [
      {
        code: 'TH-KNS-01',
        vn: 'Rèn luyện kỹ năng làm việc nhóm, phân công nhiệm vụ và lắng nghe tôn trọng ý kiến bạn bè.',
        en: 'Cultivate collaborative teamwork skills, task delegation, and respectful active listening to classmates.'
      },
      {
        code: 'TH-KNS-02',
        vn: 'Phát triển sự tự tin giao tiếp trước tập thể, trả lời dõng dạc câu hỏi tiếng Anh và diễn đạt cảm xúc tích cực.',
        en: 'Build public speaking confidence, articulate clear English responses, and express positive interpersonal emotions.'
      },
      {
        code: 'TH-KNS-03',
        vn: 'Kỹ năng tự quản lý đồ dùng học tập cá nhân, xếp gọn gàng sách vở và giúp đỡ bạn học khi cần thiết.',
        en: 'Develop self-management of personal stationery, organize desk materials neatly, and offer peer assistance.'
      },
      {
        code: 'TH-KNS-04',
        vn: 'Kỹ năng giải quyết bất đồng hòa nhã trong trò chơi đóng vai và xử lý tình huống giao tiếp thường ngày.',
        en: 'Practice peaceful conflict resolution during English role-play games and everyday conversational interactions.'
      }
    ]
  },
  atgt: {
    id: 'atgt',
    codePrefix: 'TH-ATGT',
    nameVn: 'An toàn giao thông',
    nameEn: 'Traffic Safety',
    iconName: 'ShieldAlert',
    badgeBg: 'bg-amber-500',
    badgeBorder: 'border-amber-600',
    badgeText: 'text-slate-950 font-bold',
    cardBg: 'bg-amber-50/95 dark:bg-amber-950/40',
    cardBorder: 'border-2 border-amber-400 dark:border-amber-500 shadow-xs',
    cardText: 'text-amber-950 dark:text-amber-100',
    accentColor: '#d97706',
    circularRef: 'CV 3456/BGDĐT-GDPT & CTGDPT 2018',
    defaultSuggestions: [
      {
        code: 'TH-ATGT-01',
        vn: 'Ý thức chấp hành tín hiệu đèn giao thông (đỏ dừng, xanh đi, vàng chậm lại) khi đến trường và tan học.',
        en: 'Observe and obey traffic signal lights (red stop, green go, yellow slow down) when commuting to and from school.'
      },
      {
        code: 'TH-ATGT-02',
        vn: 'Đội mũ bảo hiểm đạt chuẩn và cài quai đúng cách khi ngồi trên xe máy, xe đạp điện tham gia giao thông.',
        en: 'Fasten standard safety helmets securely when riding as passengers on motorbikes or electric bicycles.'
      },
      {
        code: 'TH-ATGT-03',
        vn: 'Đi bộ trên vỉa hè, đi sát lề đường bên phải nơi không có vỉa hè và quan sát an toàn trước khi qua đường.',
        en: 'Walk on pedestrian sidewalks, stay close to the right roadside curb, and look both ways before crossing streets.'
      },
      {
        code: 'TH-ATGT-04',
        vn: 'Nhận biết các biển báo hiệu giao thông đường bộ cơ bản gắn liền với từ vựng tiếng Anh chủ đề thành phố/trường học.',
        en: 'Recognize fundamental road traffic signs integrated with thematic English vocabulary on school and neighborhood environments.'
      }
    ]
  },
  ai: {
    id: 'ai',
    codePrefix: 'TH-AI',
    nameVn: 'Trí tuệ nhân tạo (AI)',
    nameEn: 'Artificial Intelligence (AI) Literacy',
    iconName: 'Sparkles',
    badgeBg: 'bg-blue-600',
    badgeBorder: 'border-blue-700',
    badgeText: 'text-white font-bold',
    cardBg: 'bg-blue-50/95 dark:bg-blue-950/50',
    cardBorder: 'border-2 border-blue-500 dark:border-blue-400 shadow-xs',
    cardText: 'text-blue-950 dark:text-blue-100',
    accentColor: '#2563eb',
    circularRef: 'Quyết định 2422/QĐ-BGDĐT',
    defaultSuggestions: [
      {
        code: 'TH-AI-01',
        vn: 'Nhận biết công nghệ trí tuệ nhân tạo qua trợ lý ảo phát âm bản ngữ và ứng dụng nhận diện giọng nói.',
        en: 'Understand artificial intelligence concepts through native speech synthesis assistants and voice recognition models.'
      },
      {
        code: 'TH-AI-02',
        vn: 'Luyện tập phát âm từ vựng và ngữ điệu câu với trợ lý AI, nhận phản hồi tức thì để sửa lỗi phát âm.',
        en: 'Practice lexical pronunciation and intonation patterns with AI speech tutors, receiving immediate formative feedback.'
      },
      {
        code: 'TH-AI-03',
        vn: 'Hình thành nhận thức đạo đức AI: không chia sẻ thông tin cá nhân và sử dụng công nghệ AI trung thực.',
        en: 'Foster AI ethical awareness: protect personal privacy data and employ AI learning tools with academic honesty.'
      }
    ]
  },
  ethics: {
    id: 'ethics',
    codePrefix: 'TH-DD',
    nameVn: 'Đạo đức & Lối sống',
    nameEn: 'Moral & Ethical Values',
    iconName: 'Compass',
    badgeBg: 'bg-amber-500',
    badgeBorder: 'border-amber-600',
    badgeText: 'text-slate-950 font-bold',
    cardBg: 'bg-amber-50/95 dark:bg-amber-950/40',
    cardBorder: 'border-2 border-amber-400 dark:border-amber-500 shadow-xs',
    cardText: 'text-amber-950 dark:text-amber-100',
    accentColor: '#d97706',
    circularRef: 'Thông tư 32/2018/TT-BGDĐT',
    defaultSuggestions: [
      {
        code: 'TH-DD-01',
        vn: 'Giáo dục lòng biết ơn thầy cô giáo, yêu quý bạn bè và tôn trọng người lớn tuổi trong giao tiếp hàng ngày.',
        en: 'Inculcate gratitude towards teachers, appreciation for classmates, and respect for elders in daily communication.'
      },
      {
        code: 'TH-DD-02',
        vn: 'Rèn luyện tính trung thực trong học tập, kiên trì vượt khó và có tinh thần trách nhiệm với tập thể.',
        en: 'Cultivate academic integrity, perseverance in overcoming learning challenges, and community responsibility.'
      }
    ]
  },
  environment: {
    id: 'environment',
    codePrefix: 'TH-MT',
    nameVn: 'Bảo vệ môi trường',
    nameEn: 'Environmental Protection',
    iconName: 'Leaf',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/70',
    badgeBorder: 'border-teal-400 dark:border-teal-600',
    badgeText: 'text-teal-900 dark:text-teal-200',
    cardBg: 'bg-teal-50/90 dark:bg-teal-950/40',
    cardBorder: 'border-teal-300 dark:border-teal-800',
    cardText: 'text-teal-950 dark:text-teal-100',
    accentColor: '#0d9488',
    circularRef: 'CTGDPT 2018 & CV 3456',
    defaultSuggestions: [
      {
        code: 'TH-MT-01',
        vn: 'Ý thức giữ gìn vệ sinh lớp học, bỏ rác đúng nơi quy định và tiết kiệm giấy, nước sạch.',
        en: 'Maintain classroom tidiness, dispose of waste in designated recycling bins, and conserve clean water and paper.'
      },
      {
        code: 'TH-MT-02',
        vn: 'Yêu quý thiên nhiên cây cỏ, trồng cây xanh và tìm hiểu từ vựng tiếng Anh về động thực vật xung quanh.',
        en: 'Appreciate nature and plants, engage in school greening, and acquire English vocabulary about flora and fauna.'
      }
    ]
  },
  stem: {
    id: 'stem',
    codePrefix: 'TH-STEM',
    nameVn: 'Giáo dục STEM / STEAM',
    nameEn: 'STEM / STEAM Education',
    iconName: 'Flame',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/70',
    badgeBorder: 'border-orange-400 dark:border-orange-600',
    badgeText: 'text-orange-950 dark:text-orange-200',
    cardBg: 'bg-orange-50/90 dark:bg-orange-950/40',
    cardBorder: 'border-orange-300 dark:border-orange-800',
    cardText: 'text-orange-950 dark:text-orange-100',
    accentColor: '#ea580c',
    circularRef: 'Công văn 909/BGDĐT-GDTH',
    defaultSuggestions: [
      {
        code: 'TH-STEM-01',
        vn: 'Tạo sản phẩm thủ công mini: làm thẻ từ vựng minh họa, đồng hồ học số đếm hoặc mô hình đồ dùng học tập.',
        en: 'Create mini hands-on crafts: design illustrated flashcards, cardboard clock counters, or model classroom items.'
      }
    ]
  },
  custom: {
    id: 'custom',
    codePrefix: 'TH-TC',
    nameVn: 'Lĩnh vực tùy chỉnh khác',
    nameEn: 'Custom Interdisciplinary Domain',
    iconName: 'Sliders',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeBorder: 'border-slate-400 dark:border-slate-600',
    badgeText: 'text-slate-800 dark:text-slate-200',
    cardBg: 'bg-slate-50 dark:bg-slate-900/60',
    cardBorder: 'border-slate-300 dark:border-slate-700',
    cardText: 'text-slate-900 dark:text-slate-100',
    accentColor: '#64748b',
    circularRef: 'Theo kế hoạch chuyên môn trường',
    defaultSuggestions: [
      {
        code: 'TH-TC-01',
        vn: 'Tích hợp nội dung văn hóa địa phương và giới thiệu danh lam thắng cảnh quê hương bằng tiếng Anh.',
        en: 'Integrate local cultural heritage and introduce regional scenic landscapes through elementary English discourse.'
      }
    ]
  }
};

/**
 * Pedagogical Phrase Replacement Dictionary (Vietnamese -> Pedagogical English)
 */
const PEDAGOGICAL_DICTIONARY: Array<[RegExp, string]> = [
  // Inclusive education (GDHN)
  [/học sinh khuyết tật|trẻ khuyết tật|hs khuyết tật/gi, 'students with disabilities'],
  [/học sinh khiếm thính/gi, 'students with hearing impairments'],
  [/học sinh khiếm thị/gi, 'students with visual impairments'],
  [/học sinh chậm phát triển/gi, 'students with developmental delays'],
  [/giáo dục hòa nhập/gi, 'inclusive education'],
  [/giảm tải yêu cầu cần đạt|giảm nhẹ yêu cầu/gi, 'differentiate learning expectations'],
  [/bạn học đồng hành|đôi bạn cùng tiến/gi, 'collaborative peer scaffolding'],
  [/cử chỉ tpr|điệu bộ cử chỉ/gi, 'TPR gestures'],
  [/trực quan phóng to|hình ảnh phóng to/gi, 'enlarged visual aids and flashcards'],
  [/chống kỳ thị|không kỳ thị/gi, 'prevent stigma and foster mutual acceptance'],
  [/động viên kịp thời|khen ngợi kịp thời/gi, 'timely positive reinforcement and encouragement'],

  // Digital Competence (NLS)
  [/năng lực số/gi, 'digital competence'],
  [/kho học liệu số|học liệu điện tử/gi, 'digital learning repositories'],
  [/màn hình tương tác|bảng tương tác/gi, 'interactive smartboards'],
  [/máy tính bảng/gi, 'tablet devices'],
  [/thiết bị nghe nhìn/gi, 'audio-visual educational technology devices'],
  [/bảo vệ dữ liệu cá nhân|an toàn thông tin/gi, 'personal data privacy and digital safety'],
  [/kéo thả từ vựng|thao tác cảm ứng/gi, 'interactive touch drag-and-drop operations'],

  // AI
  [/trí tuệ nhân tạo|công nghệ ai/gi, 'artificial intelligence (AI)'],
  [/khung giáo dục ai|khung năng lực ai/gi, 'AI literacy framework (Decision 2422/QD-BGDDT)'],
  [/nhận diện giọng nói|nhận dạng phát âm/gi, 'voice recognition and speech evaluation'],
  [/trợ lý ảo|gia sư ai/gi, 'AI speech conversational tutors'],
  [/đạo đức ai|sử dụng ai có trách nhiệm/gi, 'AI ethics and responsible technology use'],

  // Life skills (KNS)
  [/kỹ năng sống/gi, 'life skills'],
  [/làm việc nhóm|hợp tác nhóm/gi, 'collaborative group work and peer interaction'],
  [/lắng nghe tôn trọng|lắng nghe tích cực/gi, 'respectful and active listening'],
  [/tự tin giao tiếp|tự tin phát biểu/gi, 'confident public communication'],
  [/quản lý đồ dùng học tập|giữ gìn đồ dùng/gi, 'responsible stationery self-management'],
  [/giải quyết mâu thuẫn|giải quyết xung đột/gi, 'peaceful interpersonal conflict resolution'],

  // Traffic Safety (ATGT)
  [/an toàn giao thông|luật giao thông/gi, 'traffic safety regulations'],
  [/đèn tín hiệu giao thông|đèn giao thông/gi, 'traffic signal lights (red stop, green go)'],
  [/đội mũ bảo hiểm|cài quai mũ bảo hiểm/gi, 'wearing standard safety helmets securely'],
  [/đi bộ trên vỉa hè|băng qua đường an toàn/gi, 'walking safely on pedestrian sidewalks and crosswalks'],
  [/biển báo giao thông/gi, 'road traffic signs and pedestrian symbols'],

  // Teaching terminology
  [/yêu cầu cần đạt/gi, 'learning objectives'],
  [/hoạt động khám phá/gi, 'knowledge discovery activity'],
  [/hoạt động luyện tập/gi, 'guided practice activity'],
  [/hoạt động vận dụng/gi, 'communicative production activity'],
  [/hoạt động khởi động/gi, 'warm-up and engagement activity'],
  [/hoạt động củng cố/gi, 'wrap-up and consolidation activity'],
  [/phát âm chuẩn|ngữ điệu bản ngữ/gi, 'accurate pronunciation and native intonation'],
  [/mẫu câu giao tiếp/gi, 'communicative sentence patterns'],
  [/từ vựng trọng tâm/gi, 'target vocabulary items']
];

/**
 * Automatically translates Vietnamese pedagogical integration text to Pedagogical English.
 * Pure function with robust fallback and academic phrasing.
 */
export function translateToPedagogicalEnglish(textVn: string, domainId: IntegrationDomainId | string = 'custom'): string {
  if (!textVn || !textVn.trim()) return '';

  const clean = textVn.trim();
  const validDomain = (domainId in INTEGRATION_DOMAINS ? domainId : 'custom') as IntegrationDomainId;

  // 1. Check exact match in pre-defined suggestions
  for (const dom of Object.values(INTEGRATION_DOMAINS)) {
    const found = dom.defaultSuggestions.find(s => s.vn.trim().toLowerCase() === clean.toLowerCase());
    if (found) return found.en;
  }

  // 2. Perform intelligent phrase-level dictionary replacement
  let translated = clean;
  PEDAGOGICAL_DICTIONARY.forEach(([regex, replacement]) => {
    translated = translated.replace(regex, replacement);
  });

  // 3. Domain-specific contextual enhancements if still contains Vietnamese characters
  const hasVietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(translated);
  
  if (hasVietnameseChars) {
    switch (validDomain) {
      case 'gdhn':
        translated = `Inclusive pedagogy: Provide differentiated task scaffolding, TPR gestures, visual support, and peer buddy assistance for students with special educational needs. (${clean})`;
        break;
      case 'nls':
        translated = `Digital competence: Integrate interactive digital courseware on hoclieu.vn, multimedia listening tracks, and smartboard operations. (${clean})`;
        break;
      case 'atgt':
        translated = `Traffic safety: Practice road safety awareness, pedestrian sidewalk walking rules, and helmet compliance. (${clean})`;
        break;
      case 'kns':
        translated = `Life skills: Develop cooperative group dynamics, respectful active listening, and communicative confidence. (${clean})`;
        break;
      case 'ai':
        translated = `AI literacy: Experience speech recognition modeling, native audio pronunciation feedback, and safe digital usage. (${clean})`;
        break;
      case 'ethics':
        translated = `Moral education: Encourage respectful communication, diligence, and classroom empathy. (${clean})`;
        break;
      case 'environment':
        translated = `Environmental awareness: Foster eco-friendly habits, classroom waste reduction, and nature appreciation. (${clean})`;
        break;
      case 'stem':
        translated = `STEM practice: Engage in hands-on English crafts and thematic model creation. (${clean})`;
        break;
      default:
        translated = `Pedagogical integration: Aligned with MOET Circular 2345/3456 interdisciplinary standards. (${clean})`;
        break;
    }
  }

  // Capitalize first letter and ensure ending punctuation
  translated = translated.charAt(0).toUpperCase() + translated.slice(1);
  if (!/[.!?]$/.test(translated)) {
    translated += '.';
  }

  return translated;
}

/**
 * Generate a standard Integration Code based on domain and running index
 */
export function generateIntegrationCode(domainId: IntegrationDomainId, index: number = 1): string {
  const meta = INTEGRATION_DOMAINS[domainId] || INTEGRATION_DOMAINS.custom;
  const padded = index.toString().padStart(2, '0');
  return `${meta.codePrefix}-${padded}`;
}

/**
 * Parse an existing string like "[TH-GDHN-01] Hỗ trợ học sinh..." into code and content
 */
export function parseIntegrationCodeAndContent(rawText: string, defaultDomain: IntegrationDomainId = 'custom'): {
  code: string;
  domain: IntegrationDomainId;
  content: string;
} {
  if (!rawText) {
    return {
      code: generateIntegrationCode(defaultDomain, 1),
      domain: defaultDomain,
      content: ''
    };
  }

  const match = rawText.match(/^\s*\[([a-zA-Z0-9_-]+)\]\s*(.*)$/s);
  if (match) {
    const code = match[1].toUpperCase();
    const content = match[2].trim();
    
    // Detect domain from code
    let detectedDomain: IntegrationDomainId = defaultDomain;
    for (const [dId, meta] of Object.entries(INTEGRATION_DOMAINS)) {
      if (code.startsWith(meta.codePrefix)) {
        detectedDomain = dId as IntegrationDomainId;
        break;
      }
    }

    return {
      code,
      domain: detectedDomain,
      content
    };
  }

  return {
    code: generateIntegrationCode(defaultDomain, 1),
    domain: defaultDomain,
    content: rawText.trim()
  };
}

/**
 * Build a structured array of FlexibleIntegrationItem from a period object
 */
export function buildFlexibleItemsFromPeriod(period: any): FlexibleIntegrationItem[] {
  if (period?.customIntegrations && Array.isArray(period.customIntegrations) && period.customIntegrations.length > 0) {
    return period.customIntegrations;
  }

  const items: FlexibleIntegrationItem[] = [];
  const cv = period?.integratedCV2345 || {};

  // 1. Digital Competence (NLS)
  if (cv.digitalCompetence) {
    const parsed = parseIntegrationCodeAndContent(cv.digitalCompetence, 'nls');
    items.push({
      id: `nls-${period.ppctNumber || period.periodNumber || 1}`,
      code: parsed.code || 'TH-NLS-01',
      domain: 'nls',
      domainLabelVn: INTEGRATION_DOMAINS.nls.nameVn,
      domainLabelEn: INTEGRATION_DOMAINS.nls.nameEn,
      contentVn: parsed.content || cv.digitalCompetence,
      contentEn: translateToPedagogicalEnglish(parsed.content || cv.digitalCompetence, 'nls'),
      enabled: true
    });
  }

  // 2. Inclusive Education for Special Needs / Disabilities (GDHN)
  if (cv.inclusiveEducation) {
    const parsed = parseIntegrationCodeAndContent(cv.inclusiveEducation, 'gdhn');
    items.push({
      id: `gdhn-${period.ppctNumber || period.periodNumber || 1}`,
      code: parsed.code || 'TH-GDHN-01',
      domain: 'gdhn',
      domainLabelVn: INTEGRATION_DOMAINS.gdhn.nameVn,
      domainLabelEn: INTEGRATION_DOMAINS.gdhn.nameEn,
      contentVn: parsed.content || cv.inclusiveEducation,
      contentEn: translateToPedagogicalEnglish(parsed.content || cv.inclusiveEducation, 'gdhn'),
      enabled: true
    });
  } else {
    // Standard inclusion prompt for NTKT
    items.push({
      id: `gdhn-${period.ppctNumber || period.periodNumber || 1}`,
      code: 'TH-GDHN-01',
      domain: 'gdhn',
      domainLabelVn: INTEGRATION_DOMAINS.gdhn.nameVn,
      domainLabelEn: INTEGRATION_DOMAINS.gdhn.nameEn,
      contentVn: 'Hỗ trợ học sinh khuyết tật nhìn/nghe qua tranh ảnh trực quan, điệu bộ TPR và hỗ trợ từ bạn học.',
      contentEn: 'Support students with visual/hearing needs with enlarged visual cards, TPR, and peer buddy scaffolding.',
      enabled: true
    });
  }

  // 3. AI Literacy (AI)
  if (cv.aiLiteracy) {
    const parsed = parseIntegrationCodeAndContent(cv.aiLiteracy, 'ai');
    items.push({
      id: `ai-${period.ppctNumber || period.periodNumber || 1}`,
      code: parsed.code || 'TH-AI-01',
      domain: 'ai',
      domainLabelVn: INTEGRATION_DOMAINS.ai.nameVn,
      domainLabelEn: INTEGRATION_DOMAINS.ai.nameEn,
      contentVn: parsed.content || cv.aiLiteracy,
      contentEn: translateToPedagogicalEnglish(parsed.content || cv.aiLiteracy, 'ai'),
      enabled: true
    });
  }

  // 4. Life Skills (KNS)
  if (cv.lifeSkills) {
    const parsed = parseIntegrationCodeAndContent(cv.lifeSkills, 'kns');
    items.push({
      id: `kns-${period.ppctNumber || period.periodNumber || 1}`,
      code: parsed.code || 'TH-KNS-01',
      domain: 'kns',
      domainLabelVn: INTEGRATION_DOMAINS.kns.nameVn,
      domainLabelEn: INTEGRATION_DOMAINS.kns.nameEn,
      contentVn: parsed.content || cv.lifeSkills,
      contentEn: translateToPedagogicalEnglish(parsed.content || cv.lifeSkills, 'kns'),
      enabled: true
    });
  }

  // 5. Traffic Safety (ATGT)
  if (cv.trafficSafety) {
    const parsed = parseIntegrationCodeAndContent(cv.trafficSafety, 'atgt');
    items.push({
      id: `atgt-${period.ppctNumber || period.periodNumber || 1}`,
      code: parsed.code || 'TH-ATGT-01',
      domain: 'atgt',
      domainLabelVn: INTEGRATION_DOMAINS.atgt.nameVn,
      domainLabelEn: INTEGRATION_DOMAINS.atgt.nameEn,
      contentVn: parsed.content || cv.trafficSafety,
      contentEn: translateToPedagogicalEnglish(parsed.content || cv.trafficSafety, 'atgt'),
      enabled: true
    });
  }

  return items;
}

