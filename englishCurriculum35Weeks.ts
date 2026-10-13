// =========================================================================
// PHÂN PHỐI CHƯƠNG TRÌNH TIẾNG ANH 35 TUẦN - GLOBAL SUCCESS (BỘ GD&ĐT & NXBGDVN)
// CHUẨN TẬP HUẤN taphuan.nxbgd.vn & PHỤ LỤC 2 CÔNG VĂN 2345/BGDĐT-GDTH
// KHỐI 1, 2: TỔNG 70 TIẾT / 35 TUẦN (2 TIẾT/TUẦN)
// KHỐI 3, 4, 5: TỔNG 140 TIẾT / 35 TUẦN (4 TIẾT/TUẦN)
// =========================================================================

import { CurriculumPeriod, SubjectCurriculumWeekDetailed } from './full35WeeksCurriculum';

export interface EngPeriodDetail {
  periodNumber: number; // 1 -> 70 or 1 -> 140
  periodInWeek: number; // 1, 2 (G1-2) or 1, 2, 3, 4 (G3-5)
  lessonPart: string;
  scope: string;
  activitiesList: string[];
  keyFocus: string;
  vocab: string[];
  patterns: string[];
  pageRange: string;
  integratedCV2345: {
    digitalCompetence?: string; // CV 3456
    aiLiteracy?: string; // QĐ 2422
    trafficSafety?: string; // ATGT
    lifeSkills?: string; // KNS
    localEducation?: string; // GDĐP
    stemSteam?: string;
  };
}

export interface EngWeekData {
  week: number;
  unitCode: string;
  theme: string;
  title: string;
  semester: 1 | 2;
  periodCount: number;
  periods: EngPeriodDetail[];
  keyKnowledge: string;
  vocab: string[];
  patterns: string[];
  textbookPageRange: string;
}

// -------------------------------------------------------------------------
// DATA GENERATOR FOR GRADE 1 (70 TIẾT / 35 TUẦN)
// -------------------------------------------------------------------------
const G1_UNIT_TOPICS: { unit: string; theme: string; sound: string; vocab: string[]; patterns: string[]; pages: string }[] = [
  { unit: 'Unit 1', theme: 'In the school playground', sound: 'Letter B /b/', vocab: ['book', 'bike', 'ball', 'boy', 'Bill'], patterns: ['Hello, Bill!', 'Point to the book.'], pages: 'p.6-9' },
  { unit: 'Unit 2', theme: 'In the dining room', sound: 'Letter C /k/', vocab: ['cake', 'cat', 'car', 'cup'], patterns: ['A cat. / A cake.', 'Have some cake!'], pages: 'p.10-13' },
  { unit: 'Unit 3', theme: 'At the street market', sound: 'Letter A /æ/', vocab: ['apple', 'bag', 'can', 'hat'], patterns: ['An apple. / A bag.', 'I have an apple.'], pages: 'p.14-17' },
  { unit: 'Unit 4', theme: 'In the bedroom', sound: 'Letter D /d/', vocab: ['door', 'desk', 'dog', 'duck'], patterns: ['A desk. / A door.', 'Open the door.'], pages: 'p.18-21' },
  { unit: 'Unit 5', theme: 'At the birthday party', sound: 'Letter P /p/', vocab: ['party', 'pizza', 'popcorn', 'pencil'], patterns: ['Happy birthday!', 'Have some pizza.'], pages: 'p.24-27' },
  { unit: 'Unit 6', theme: 'In the classroom', sound: 'Letter N /n/', vocab: ['notebook', 'numbers', 'nine', 'nut'], patterns: ['Sit down.', 'Open your notebook.'], pages: 'p.28-31' },
  { unit: 'Unit 7', theme: 'In the garden', sound: 'Letter G /g/', vocab: ['garden', 'girl', 'gate', 'goat'], patterns: ['Look at the girl.', 'The goat is in the garden.'], pages: 'p.32-35' },
  { unit: 'Unit 8', theme: 'In the park', sound: 'Letter T /t/', vocab: ['tree', 'turtle', 'tiger', 'tent'], patterns: ['Look at the tiger.', 'It is under the tree.'], pages: 'p.36-39' },
  { unit: 'Unit 9', theme: 'In the grocery shop', sound: 'Letter M /m/', vocab: ['mango', 'money', 'milk', 'monkey'], patterns: ['I want milk.', 'Here is the money.'], pages: 'p.42-45' },
  { unit: 'Unit 10', theme: 'At the zoo', sound: 'Letter Z /z/', vocab: ['zoo', 'zebra', 'zebu', 'zero'], patterns: ['Look at the zebra.', 'I see a zebra at the zoo.'], pages: 'p.46-49' },
  { unit: 'Unit 11', theme: 'At the bus stop', sound: 'Letter U /ʌ/', vocab: ['bus', 'sun', 'umbrella', 'run'], patterns: ['The bus is coming.', 'Under the sun.'], pages: 'p.50-53' },
  { unit: 'Unit 12', theme: 'At the lake', sound: 'Letter L /l/', vocab: ['lake', 'lemon', 'leaf', 'lock'], patterns: ['Look at the lake.', 'A yellow lemon.'], pages: 'p.54-57' },
  { unit: 'Unit 13', theme: 'In the school canteen', sound: 'Letter I /ɪ/', vocab: ['milk', 'chips', 'fish', 'dish'], patterns: ['Have some fish.', 'I like chips.'], pages: 'p.60-63' },
  { unit: 'Unit 14', theme: 'In the toy shop', sound: 'Letter Y /j/', vocab: ['yo-yo', 'yacht', 'yogurt', 'yellow'], patterns: ['I have a yellow yo-yo.', 'Play with the yo-yo.'], pages: 'p.64-67' },
  { unit: 'Unit 15', theme: 'At the football match', sound: 'Letter F /f/', vocab: ['football', 'fox', 'face', 'foot'], patterns: ['Kick the football.', 'Look at the fox.'], pages: 'p.68-71' },
  { unit: 'Unit 16', theme: 'At the campsite', sound: 'Letter E /e/', vocab: ['tent', 'elephant', 'egg', 'red'], patterns: ['A red tent.', 'Look at the big elephant.'], pages: 'p.72-75' }
];

// Helper to construct G1 & G2 70 periods
function buildGrade1or2Weeks(gradeNum: 1 | 2): SubjectCurriculumWeekDetailed[] {
  const isG1 = gradeNum === 1;
  const gradeLabel = isG1 ? 'Lớp 1' : 'Lớp 2';
  const units = isG1 ? G1_UNIT_TOPICS : [
    { unit: 'Unit 1', theme: 'At my school', sound: 'Letter J /dʒ/', vocab: ['juice', 'jelly', 'jam', 'jacket'], patterns: ['I have some jelly.', 'Drink some juice.'], pages: 'p.6-9' },
    { unit: 'Unit 2', theme: 'In the bakery', sound: 'Letter K /k/', vocab: ['cake', 'kite', 'kitchen', 'kitten'], patterns: ['I see a kitten.', 'Flying a kite.'], pages: 'p.10-13' },
    { unit: 'Unit 3', theme: 'At the seaside', sound: 'Letter S /s/', vocab: ['sea', 'sand', 'sail', 'sun'], patterns: ['Let\'s play in the sand.', 'Look at the sea.'], pages: 'p.14-17' },
    { unit: 'Unit 4', theme: 'In the countryside', sound: 'Letter R /r/', vocab: ['river', 'road', 'rainbow', 'rabbit'], patterns: ['I see a rainbow.', 'A white rabbit by the river.'], pages: 'p.18-21' },
    { unit: 'Unit 5', theme: 'In the farm', sound: 'Letter H /h/', vocab: ['horse', 'house', 'hat', 'hand'], patterns: ['Look at the horse.', 'Raise your hand.'], pages: 'p.24-27' },
    { unit: 'Unit 6', theme: 'In the kitchen', sound: 'Letter O /ɒ/', vocab: ['pot', 'mop', 'box', 'clock'], patterns: ['Where is the clock?', 'It is on the box.'], pages: 'p.28-31' },
    { unit: 'Unit 7', theme: 'In the grocery store', sound: 'Letter G /ɡ/', vocab: ['grapes', 'goat', 'girl', 'guitar'], patterns: ['I like grapes.', 'Play the guitar.'], pages: 'p.32-35' },
    { unit: 'Unit 8', theme: 'In the village', sound: 'Letter V /v/', vocab: ['village', 'van', 'volleyball', 'vase'], patterns: ['Drive the van.', 'Play volleyball.'], pages: 'p.36-39' },
    { unit: 'Unit 9', theme: 'In the grocery store', sound: 'Letter B /b/ & /bl/', vocab: ['bread', 'butter', 'banana', 'bag'], patterns: ['Pass the butter, please.', 'Here you are.'], pages: 'p.42-45' },
    { unit: 'Unit 10', theme: 'At the zoo', sound: 'Letter M /m/', vocab: ['monkey', 'mouse', 'mother', 'mouth'], patterns: ['Look at the monkey.', 'Climbing a tree.'], pages: 'p.46-49' },
    { unit: 'Unit 11', theme: 'In the art class', sound: 'Letter P /p/', vocab: ['paint', 'picture', 'paper', 'pencil'], patterns: ['Draw a picture.', 'Paint with blue.'], pages: 'p.50-53' },
    { unit: 'Unit 12', theme: 'At the lake', sound: 'Letter L /l/', vocab: ['lake', 'leaf', 'lion', 'lemon'], patterns: ['Look at the leaf.', 'A yellow lemon.'], pages: 'p.54-57' },
    { unit: 'Unit 13', theme: 'In the school canteen', sound: 'Letter N /n/', vocab: ['nuts', 'noodles', 'nurse', 'notebook'], patterns: ['I want noodles.', 'Have some nuts.'], pages: 'p.60-63' },
    { unit: 'Unit 14', theme: 'In the toy shop', sound: 'Letter T /t/', vocab: ['train', 'truck', 'teddy bear', 'top'], patterns: ['How much is the train?', 'I like the teddy bear.'], pages: 'p.64-67' },
    { unit: 'Unit 15', theme: 'In the clothes shop', sound: 'Letter SH /ʃ/', vocab: ['shoes', 'shirt', 'shorts', 'shop'], patterns: ['Put on your shoes.', 'I like the blue shirt.'], pages: 'p.68-71' },
    { unit: 'Unit 16', theme: 'At the campsite', sound: 'Letter CH /tʃ/', vocab: ['chair', 'cheese', 'chicken', 'chips'], patterns: ['Eat some chicken.', 'Sit on the chair.'], pages: 'p.72-75' }
  ];

  // 35 weeks for Grade 1 & 2 (70 periods total, 2 periods/week)
  // HK1 (Weeks 1 to 18 = 36 periods):
  // - Week 1: Starter (2 periods)
  // - Weeks 2 to 13: 8 Units x 3 periods = 24 periods (12 weeks x 2 periods)
  // - Week 14: Review 1 & Fun Time 1 (2 periods)
  // - Week 15: Review 2 & Fun Time 2 (2 periods)
  // - Week 16: Ôn tập kiến thức trọng tâm Học kỳ 1 (2 periods)
  // - Week 17: Self-check 1 & Trải nghiệm giao tiếp tiếng Anh (2 periods)
  // - Week 18: Kiểm tra định kỳ Học kỳ 1 & Sơ kết (2 periods)
  // HK2 (Weeks 19 to 35 = 34 periods):
  // - Weeks 19 to 30: 8 Units (Units 9-16) x 3 periods = 24 periods (12 weeks x 2 periods)
  // - Week 31: Review 3 & Fun Time 3 (2 periods)
  // - Week 32: Review 4 & Fun Time 4 (2 periods)
  // - Week 33: Ôn tập kiến thức trọng tâm Cuối năm (2 periods)
  // - Week 34: Self-check 2 & Giao lưu tiếng Anh (2 periods)
  // - Week 35: Kiểm tra định kỳ Cuối năm & Tổng kết năm học (2 periods)
  // Total: 36 + 34 = 70 periods

  let globalPeriodCount = 0;
  const weeks: SubjectCurriculumWeekDetailed[] = [];

  for (let w = 1; w <= 35; w++) {
    const semester: 1 | 2 = w <= 18 ? 1 : 2;
    let unitCode = '';
    let theme = '';
    let lessonTitle = '';
    let keyKnowledge = '';
    let vocab: string[] = [];
    let patterns: string[] = [];
    let pageRange = '';
    const periods: CurriculumPeriod[] = [];

    if (w === 13) {
      // Review 1 & Fun Time 1 (2 tiết)
      unitCode = 'Review 1';
      theme = 'Ôn tập giữa Học kỳ 1 (Units 1 - 4)';
      lessonTitle = 'Review 1 (Units 1 - 4) & Fun Time 1';
      keyKnowledge = 'Ôn tập hệ thống âm phonics, từ vựng và mẫu câu giao tiếp từ Unit 1 đến Unit 4.';
      vocab = ['book', 'cake', 'apple', 'desk', 'cat', 'dog', 'ball', 'door'];
      patterns = ['Hello!', 'Have some cake.', 'Point to the book.'];
      pageRange = 'SGK Trang 22-23';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Review 1',
        unitTitle: 'Review 1',
        lessonTitle: 'Review 1: Phonics & Vocabulary Recall (Units 1 - 4)',
        theme: 'Ôn tập giữa Học kỳ 1 (Units 1 - 4)',
        lessonPart: 'Review 1 - Tiết 1: Phonics & Vocabulary Recall',
        scope: 'Hoạt động 1, 2, 3: Listen and tick, Point and say, Listen and chant',
        keyFocus: 'Phân biệt chính xác các âm phonics và nhận diện từ vựng của Units 1-4.',
        pageRange: 'SGK Trang 22',
        suggestedActivity: 'Trò chơi "Phonics Bingo", "Slap the Board" trên bảng tương tác/Quizizz.',
        vocab: ['book', 'cake', 'apple', 'desk'],
        patterns: ['Point to the book.', 'Have some cake.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Review 1',
        unitTitle: 'Review 1 & Fun Time 1',
        lessonTitle: 'Fun Time 1 & Speaking Games (Units 1 - 4)',
        theme: 'Ôn tập giữa Học kỳ 1 (Units 1 - 4)',
        lessonPart: 'Review 1 - Tiết 2: Fun Time 1 & Speaking Game',
        scope: 'Hoạt động 4, 5: Let\'s talk, Board game & Project',
        keyFocus: 'Giao tiếp theo cặp, vận dụng từ ngữ vào ngữ cảnh đời sống thường nhật.',
        pageRange: 'SGK Trang 23',
        suggestedActivity: 'Trò chơi xúc xắc "Lucky Steps Board Game", đóng vai mini role-play.',
        vocab: ['cat', 'dog', 'ball', 'door'],
        patterns: ['I have an apple.', 'Look at the cat.']
      });
    }
    else if (w === 14) {
      // Review 2 & Fun Time 2 (2 tiết)
      unitCode = 'Review 2';
      theme = 'Ôn tập cuối Học kỳ 1 (Units 5 - 8)';
      lessonTitle = 'Review 2 (Units 5 - 8) & Fun Time 2';
      keyKnowledge = 'Hệ thống hóa toàn bộ kiến thức 4 Units (5 - 8); rèn luyện kỹ năng nghe - nói phản xạ.';
      vocab = ['pizza', 'notebook', 'garden', 'tree', 'tiger', 'pencil', 'numbers'];
      patterns = ['Happy birthday!', 'Open your notebook.', 'Look at the tiger.'];
      pageRange = 'SGK Trang 40-41';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Review 2',
        unitTitle: 'Review 2',
        lessonTitle: 'Review 2: Language & Skills Practice (Units 5 - 8)',
        theme: 'Ôn tập cuối Học kỳ 1 (Units 5 - 8)',
        lessonPart: 'Review 2: Language & Skills Practice (Units 5 - 8)',
        scope: 'Hoạt động 1, 2, 3: Listen and circle, Read and match, Chant',
        keyFocus: 'Củng cố nhận diện mặt chữ, âm điệu và từ vựng về bữa tiệc, lớp học, vườn cây, công viên.',
        pageRange: 'SGK Trang 40',
        suggestedActivity: 'Ứng dụng AI phát âm, nghe audio chuẩn bản ngữ và thi đọc nối tiếp.',
        vocab: ['pizza', 'notebook', 'garden', 'tree'],
        patterns: ['Happy birthday!', 'Look at the tree.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Review 2',
        unitTitle: 'Review 2 & Fun Time 2',
        lessonTitle: 'Fun Time 2 & Language Stations (Units 5 - 8)',
        theme: 'Ôn tập cuối Học kỳ 1 (Units 5 - 8)',
        lessonPart: 'Fun Time 2: Language Games & Speaking Stations',
        scope: 'Hoạt động 4, 5: Let\'s talk & Fun game stations',
        keyFocus: 'Thực hành các trạm trò chơi ngôn ngữ, rèn luyện sự tự tin khi nói tiếng Anh.',
        pageRange: 'SGK Trang 41',
        suggestedActivity: 'Trò chơi trạm ngôn ngữ "Vocabulary Mystery Box", phỏng vấn theo cặp.',
        vocab: ['tiger', 'pencil', 'numbers', 'party'],
        patterns: ['Open your notebook.', 'Look at the tiger.']
      });
    }
    else if (w === 15) {
      // Ôn tập kiến thức trọng tâm Học kỳ 1 (2 tiết)
      unitCode = 'Review HK1';
      theme = 'Ôn tập tổng hợp Học kỳ 1';
      lessonTitle = 'Ôn tập kiến thức trọng tâm Học kỳ 1 (Units 1 - 8)';
      keyKnowledge = 'Hệ thống hóa toàn bộ từ vựng, ngữ âm và mẫu câu giao tiếp Học kỳ 1 (Units 1 - 8).';
      vocab = ['book', 'cake', 'apple', 'desk', 'pizza', 'notebook', 'garden', 'tree'];
      patterns = ['Hello!', 'I have an apple.', 'Happy birthday!', 'Open your notebook.'];
      pageRange = 'Tài liệu ôn tập HK1 SGK';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Review HK1',
        unitTitle: 'Ôn tập Học kỳ 1',
        lessonTitle: 'Ôn tập Ngữ âm & Từ vựng trọng tâm Học kỳ 1',
        theme: 'Ôn tập tổng hợp Học kỳ 1',
        lessonPart: 'Ôn tập Ngữ âm & Từ vựng trọng tâm Học kỳ 1',
        scope: 'Hệ thống hóa 8 âm phonics và các từ vựng tiêu biểu trong Units 1 - 8',
        keyFocus: 'Phát âm chuẩn xác các âm đã học, nhận biết tranh từ nhanh và chính xác.',
        pageRange: 'Tài liệu ôn tập HK1',
        suggestedActivity: 'Vòng quay kỳ diệu "Phonics Wheel", thi ghép thẻ từ và tranh nhanh theo nhóm.',
        vocab: ['book', 'cake', 'apple', 'desk', 'pizza', 'notebook'],
        patterns: ['A book.', 'A cake.', 'An apple.', 'A pizza.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Review HK1',
        unitTitle: 'Ôn tập Học kỳ 1',
        lessonTitle: 'Luyện kỹ năng Nghe - Nói phản xạ giao tiếp Học kỳ 1',
        theme: 'Ôn tập tổng hợp Học kỳ 1',
        lessonPart: 'Luyện kỹ năng Nghe - Nói phản xạ giao tiếp Học kỳ 1',
        scope: 'Thực hành các mẫu câu giao tiếp hỏi - đáp chào hỏi, đồ vật, sở thích, hành động',
        keyFocus: 'Rèn luyện phản xạ nghe hiểu và nói câu hoàn chỉnh, tự tin trước thầy cô và bạn bè.',
        pageRange: 'Tài liệu ôn tập HK1',
        suggestedActivity: 'Trò chơi phỏng vấn "Speed Dating in English", nghe audio chọn tranh đúng.',
        vocab: ['garden', 'tree', 'tiger', 'pencil', 'numbers'],
        patterns: ['Happy birthday!', 'Look at the tiger.', 'Open your notebook.']
      });
    }
    else if (w === 16) {
      // Fun Time 2 & Hoạt động trải nghiệm giao lưu tiếng Anh (2 tiết)
      unitCode = 'English Carnival 1';
      theme = 'Giao lưu trải nghiệm tiếng Anh Học kỳ 1';
      lessonTitle = 'Ngày hội Tiếng Anh "English Festival HK1"';
      keyKnowledge = 'Rèn luyện sự tự tin giao tiếp, thể hiện bài hát, vè chant và đóng vai ngắn.';
      vocab = ['sing', 'dance', 'chant', 'play', 'game', 'festival'];
      patterns = ['Let\'s sing together!', 'Great job!'];
      pageRange = 'Tài liệu trải nghiệm HK1';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Carnival 1',
        unitTitle: 'English Festival HK1',
        lessonTitle: 'Biểu diễn bài hát & Đóng kịch ngắn chủ đề HK1',
        theme: 'Giao lưu trải nghiệm tiếng Anh Học kỳ 1',
        lessonPart: 'English Festival: Song & Drama Performance',
        scope: 'Biểu diễn các bài hát vui nhộn và đóng kịch ngắn theo cặp/nhóm',
        keyFocus: 'Rèn luyện kỹ năng sân khấu, sự tự tin và phản xạ phát âm tự nhiên.',
        pageRange: 'Tài liệu trải nghiệm',
        suggestedActivity: 'Biểu diễn văn nghệ tiếng Anh, trò chơi đóng vai nhân vật hoạt hình.',
        vocab: ['sing', 'dance', 'performance'],
        patterns: ['Let\'s sing!']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Carnival 1',
        unitTitle: 'English Festival HK1',
        lessonTitle: 'Trò chơi ngôn ngữ & Rung chuông vàng mini HK1',
        theme: 'Giao lưu trải nghiệm tiếng Anh Học kỳ 1',
        lessonPart: 'Language Games & Mini Ring the Golden Bell',
        scope: 'Đố vui tranh ảnh, tìm từ vựng bí ẩn và nhận biết đồ vật',
        keyFocus: 'Tạo không khí học tập hào hứng, gắn kết bạn bè và củng cố vốn từ.',
        pageRange: 'Tài liệu trải nghiệm',
        suggestedActivity: 'Rung chuông vàng mini, thi ném bóng trúng tranh từ vựng.',
        vocab: ['play', 'winner', 'star'],
        patterns: ['You are the winner!']
      });
    }
    else if (w === 17) {
      // Ôn tập tổng hợp & Hướng dẫn kỹ năng làm bài kiểm tra HK1 (2 tiết)
      unitCode = 'Self-check 1';
      theme = 'Ôn tập tổng hợp & Chuẩn bị kiểm tra HK1';
      lessonTitle = 'Ôn tập tổng hợp & Luyện kỹ năng kiểm tra HK1';
      keyKnowledge = 'Củng cố kỹ năng làm bài trắc nghiệm nghe, nối tranh và phỏng vấn hỏi - đáp.';
      vocab = ['Tất cả từ vựng HK1'];
      patterns = ['Tất cả mẫu câu HK1'];
      pageRange = 'SGK Trang 41 & Phiếu ôn tập';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Self-check 1',
        unitTitle: 'Self-check 1',
        lessonTitle: 'Self-check 1: Hoàn thành phiếu tự đánh giá năng lực HK1',
        theme: 'Ôn tập tổng hợp & Chuẩn bị kiểm tra HK1',
        lessonPart: 'Self-check 1: Phiếu tự đánh giá năng lực ngôn ngữ',
        scope: 'Hoạt động Self-check 1: Học sinh tự đánh giá theo các tiêu chí nụ cười',
        keyFocus: 'Tự nhận biết điểm mạnh và phần kiến thức cần rèn luyện thêm; rèn tính tự giác.',
        pageRange: 'SGK Trang 41',
        suggestedActivity: 'Hoàn thiện phiếu tự đánh giá nụ cười (Smile stickers), giáo viên nhận xét cá nhân hóa.',
        vocab: ['smile', 'good', 'great', 'star'],
        patterns: ['I can do it!', 'I like English.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Self-check 1',
        unitTitle: 'Chiến thuật phòng thi',
        lessonTitle: 'Luyện tập tình huống phỏng vấn nói & Kỹ năng làm bài nghe HK1',
        theme: 'Ôn tập tổng hợp & Chuẩn bị kiểm tra HK1',
        lessonPart: 'Chiến thuật làm bài: Luyện kỹ năng Nghe & Phỏng vấn nói 1-1',
        scope: 'Thực hành các trạm phỏng vấn mẫu với giáo viên và làm quen phiếu đánh giá',
        keyFocus: 'Xây dựng tâm lý tự tin, bình tĩnh và phản xạ giao tiếp trôi chảy trong phòng thi.',
        pageRange: 'Phiếu trạm phỏng vấn',
        suggestedActivity: 'Mô phỏng phỏng vấn vấn đáp 1-1 với giáo viên, bạn bè nhận xét chéo.',
        vocab: ['listen', 'speak', 'interview'],
        patterns: ['What is this? - It is a cat.']
      });
    }
    else if (w === 18) {
      // Kiểm tra định kỳ Cuối học kì 1 & Sơ kết HKI (2 tiết)
      unitCode = 'Assessment 1';
      theme = 'Đánh giá định kỳ Học kỳ 1';
      lessonTitle = 'Kiểm tra định kỳ Cuối học kì 1 & Sơ kết HKI';
      keyKnowledge = 'Đánh giá mức độ đạt chuẩn kiến thức kỹ năng nghe - nói - nhận biết mặt chữ Học kỳ 1 theo Thông tư 27.';
      vocab = ['Tất cả từ vựng Học kỳ 1'];
      patterns = ['Tất cả mẫu câu giao tiếp Học kỳ 1'];
      pageRange = 'Đề kiểm tra định kỳ HK1 chuẩn Bộ GD&ĐT';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Assessment 1',
        unitTitle: 'Kiểm tra định kỳ HK1',
        lessonTitle: 'Kiểm tra định kỳ Cuối học kì 1 (Đánh giá kỹ năng Nghe & Nói)',
        theme: 'Đánh giá định kỳ Học kỳ 1',
        lessonPart: 'Kiểm tra định kỳ Cuối học kì 1 (Listening & Speaking Evaluation)',
        scope: 'Kiểm tra năng lực nghe hiểu, nhận biết tranh ảnh, phát âm từ vựng và phỏng vấn giao tiếp.',
        keyFocus: 'Đánh giá chuẩn xác mức độ đạt chuẩn theo Thông tư 27/2020/TT-BGDĐT.',
        pageRange: 'Ma trận đề HK1',
        suggestedActivity: 'Thi trắc nghiệm nghe trên máy tính/giấy và phỏng vấn hỏi - đáp trực tiếp.',
        vocab: ['Tất cả từ vựng HK1'],
        patterns: ['Tất cả mẫu câu HK1']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: `Tiết ${globalPeriodCount}`,
        unitCode: 'Assessment 1',
        unitTitle: 'Sơ kết Học kỳ 1',
        lessonTitle: 'Sơ kết Học kỳ 1, Tuyên dương khen thưởng & Định hướng HK2',
        theme: 'Đánh giá định kỳ Học kỳ 1',
        lessonPart: 'Sơ kết Học kỳ 1, Tuyên dương khen thưởng & Định hướng HK2',
        scope: 'Nhận xét, chữa bài, tuyên dương và biểu diễn kịch, hát các bài hát Tiếng Anh HK1',
        keyFocus: 'Tạo động lực học tập, xây dựng niềm yêu thích và tự tin nói tiếng Anh.',
        pageRange: 'Tài liệu hoạt động trải nghiệm',
        suggestedActivity: 'Hát tốp ca "The ABC Song", "Happy Birthday", trao huy hiệu Tiếng Anh xuất sắc.',
        vocab: ['congratulations', 'star', 'winner', 'certificate'],
        patterns: ['Well done!', 'You are a superstar!']
      });
    }
    else if (w === 31) {
      // Review 3 & Fun Time 3 (2 tiết)
      unitCode = 'Review 3';
      theme = 'Ôn tập giữa Học kỳ 2 (Units 9 - 12)';
      lessonTitle = 'Review 3 (Units 9 - 12) & Fun Time 3';
      keyKnowledge = 'Củng cố các âm /m/, /z/, /ʌ/, /l/, từ vựng cửa hàng, vườn thú, trạm xe buýt, bờ hồ.';
      vocab = ['mango', 'zebra', 'bus', 'lake', 'milk', 'lemon', 'umbrella'];
      patterns = ['I want milk.', 'Look at the zebra.', 'The bus is coming.'];
      pageRange = 'SGK Trang 58-59';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Review 3',
        unitTitle: 'Review 3',
        lessonTitle: 'Review 3: Phonics & Listening Consolidation (Units 9 - 12)',
        theme: 'Ôn tập giữa Học kỳ 2 (Units 9 - 12)',
        lessonPart: 'Review 3: Phonics & Listening Consolidation',
        scope: 'Hoạt động 1, 2, 3: Listen and repeat, Point and say, Listen and tick',
        keyFocus: 'Rèn luyện phản xạ nghe và phân biệt phát âm chính xác các phụ âm đầu.',
        pageRange: 'SGK Trang 58',
        suggestedActivity: 'Trò chơi "Secret Word Wheel", luyện nghe qua bài vè chant.',
        vocab: ['mango', 'zebra', 'bus', 'lake'],
        patterns: ['Look at the zebra.', 'The bus is coming.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Review 3',
        unitTitle: 'Review 3 & Fun Time 3',
        lessonTitle: 'Fun Time 3 & Interactive Role-play (Units 9 - 12)',
        theme: 'Ôn tập giữa Học kỳ 2 (Units 9 - 12)',
        lessonPart: 'Review 3: Fun Time 3 & Interactive Role-play',
        scope: 'Hoạt động 4, 5: Let\'s talk, Matching & Project',
        keyFocus: 'Giao tiếp tình huống hỏi mua đồ uống, gọi tên con vật và chỉ đường.',
        pageRange: 'SGK Trang 59',
        suggestedActivity: 'Đóng vai người bán hàng và khách hàng tại quầy nước ngọt/hoa quả.',
        vocab: ['milk', 'lemon', 'umbrella', 'sun'],
        patterns: ['I want milk.', 'A yellow lemon.']
      });
    }
    else if (w === 32) {
      // Review 4 & Fun Time 4 (2 tiết)
      unitCode = 'Review 4';
      theme = 'Ôn tập cuối năm học (Units 13 - 16)';
      lessonTitle = 'Review 4 (Units 13 - 16) & Fun Time 4';
      keyKnowledge = 'Hệ thống hóa toàn diện kiến thức 4 Units (13 - 16); chuẩn bị tốt cho ôn tập cuối năm.';
      vocab = ['fish', 'yo-yo', 'football', 'tent', 'elephant', 'chips', 'red'];
      patterns = ['Have some fish.', 'Kick the football.', 'A red tent.'];
      pageRange = 'SGK Trang 76-77';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Review 4',
        unitTitle: 'Review 4',
        lessonTitle: 'Review 4: Comprehensive Skills Practice (Units 13 - 16)',
        theme: 'Ôn tập cuối năm học (Units 13 - 16)',
        lessonPart: 'Review 4: Comprehensive Skills Practice',
        scope: 'Hoạt động 1, 2, 3: Listen and number, Point and read, Chants',
        keyFocus: 'Củng cố vốn từ vựng thể thao, đồ chơi, cắm trại, căn tin.',
        pageRange: 'SGK Trang 76',
        suggestedActivity: 'Trò chơi "Kahoot Super Challenge", luyện âm phonics qua vè vui.',
        vocab: ['fish', 'yo-yo', 'football', 'tent'],
        patterns: ['Have some fish.', 'Kick the football.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Review 4',
        unitTitle: 'Review 4 & Fun Time 4',
        lessonTitle: 'Fun Time 4 & Speaking Showcase (Units 13 - 16)',
        theme: 'Ôn tập cuối năm học (Units 13 - 16)',
        lessonPart: 'Fun Time 4: Speaking Showcase & Games',
        scope: 'Hoạt động 4, 5: Let\'s talk & Project exhibition',
        keyFocus: 'Học sinh trình bày tranh vẽ yêu thích, giao tiếp tự tin về đồ chơi và món ăn.',
        pageRange: 'SGK Trang 77',
        suggestedActivity: 'Trưng bày tranh Gallery Walk, thi thuyết trình 1 phút bằng tiếng Anh.',
        vocab: ['elephant', 'chips', 'red', 'yacht'],
        patterns: ['A red tent.', 'I like chips.']
      });
    }
    else if (w === 33) {
      // Ôn tập kiến thức trọng tâm Cuối năm (2 tiết)
      unitCode = 'Review Year';
      theme = 'Ôn tập kiến thức trọng tâm Cả năm học';
      lessonTitle = 'Ôn tập kiến thức trọng tâm Cả năm học (Units 1 - 16)';
      keyKnowledge = 'Hệ thống hóa toàn bộ 16 Units tiếng Anh cả năm; củng cố các kỹ năng chuẩn bị kiểm tra cuối năm.';
      vocab = ['book', 'cake', 'apple', 'desk', 'mango', 'bus', 'fish', 'football'];
      patterns = ['Hello!', 'I have an apple.', 'I want milk.', 'Kick the football.'];
      pageRange = 'Tài liệu ôn tập tổng hợp cuối năm';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Review Year',
        unitTitle: 'Ôn tập Cả năm',
        lessonTitle: 'Ôn tập Ngữ âm & Hệ thống Từ vựng trọng tâm Cả năm',
        theme: 'Ôn tập kiến thức trọng tâm Cả năm học',
        lessonPart: 'Ôn tập Ngữ âm & Hệ thống Từ vựng trọng tâm Cả năm',
        scope: 'Tổng hợp 16 chữ cái & âm Phonics, nhận diện các trường từ vựng đã học trong năm',
        keyFocus: 'Rèn luyện phản xạ phát âm chính xác, không nhầm lẫn giữa các phụ âm tương đồng.',
        pageRange: 'Tài liệu ôn tập cuối năm',
        suggestedActivity: 'Trò chơi "Phonics Master", thi ghép tranh - chữ cái trên bảng thông minh.',
        vocab: ['book', 'cake', 'apple', 'desk', 'mango', 'bus'],
        patterns: ['A book.', 'A cake.', 'A mango.', 'A bus.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Review Year',
        unitTitle: 'Ôn tập Cả năm',
        lessonTitle: 'Luyện kỹ năng Giao tiếp & Mẫu câu hỏi - đáp thực tế',
        theme: 'Ôn tập kiến thức trọng tâm Cả năm học',
        lessonPart: 'Luyện kỹ năng Giao tiếp & Mẫu câu hỏi - đáp thực tế',
        scope: 'Thực hành các cấu trúc câu giao tiếp thường nhật theo các chủ đề cả năm',
        keyFocus: 'Nâng cao sự tự tin, ngữ điệu tự nhiên và khả năng xử lý tình huống giao tiếp cơ bản.',
        pageRange: 'Tài liệu ôn tập cuối năm',
        suggestedActivity: 'Đóng vai mini-drama theo chủ đề bốc thăm, thi hùng biện ngắn.',
        vocab: ['fish', 'football', 'tent', 'yo-yo', 'lake'],
        patterns: ['Have some fish.', 'Kick the football.', 'Look at the lake.']
      });
    }
    else if (w === 34) {
      // Self-check 2 & Giao lưu tiếng Anh (2 tiết)
      unitCode = 'Self-check 2';
      theme = 'Tự đánh giá & Giao lưu tiếng Anh Cuối năm';
      lessonTitle = 'Self-check 2 & Hoạt động trải nghiệm ngôn ngữ Cuối năm';
      keyKnowledge = 'Học sinh tự đánh giá năng lực ngôn ngữ cả năm học; tham gia ngày hội Tiếng Anh tổng kết.';
      vocab = ['Tất cả từ vựng cả năm'];
      patterns = ['Tất cả mẫu câu cả năm'];
      pageRange = 'SGK Trang 77 & Phiếu tự đánh giá';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Self-check 2',
        unitTitle: 'Self-check 2',
        lessonTitle: 'Self-check 2: Hoàn thiện hồ sơ học tập & Tự đánh giá năng lực',
        theme: 'Tự đánh giá & Giao lưu tiếng Anh Cuối năm',
        lessonPart: 'Self-check 2: Hồ sơ học tập & Tự đánh giá năng lực',
        scope: 'Hoạt động Self-check 2: Học sinh hoàn thiện bảng nụ cười và hồ sơ học tập cá nhân',
        keyFocus: 'Ghi nhận sự tiến bộ vượt bậc sau 35 tuần học tập môn Tiếng Anh.',
        pageRange: 'SGK Trang 77',
        suggestedActivity: 'Hoàn thiện hồ sơ "My English Journey", gắn huy hiệu tiến bộ.',
        vocab: ['proud', 'progress', 'journey', 'super'],
        patterns: ['I am proud of my English!', 'I can speak English.']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Self-check 2',
        unitTitle: 'Ngày hội Tiếng Anh',
        lessonTitle: 'Ngày hội Tiếng Anh "English Festival of the Year"',
        theme: 'Tự đánh giá & Giao lưu tiếng Anh Cuối năm',
        lessonPart: 'Ngày hội Tiếng Anh: English Festival & Talent Show',
        scope: 'Giao lưu câu đố tiếng Anh, thi hát tiếng Anh và kể chuyện tranh ngắn',
        keyFocus: 'Khơi dậy niềm đam mê học ngoại ngữ lâu dài cho học sinh.',
        pageRange: 'Tài liệu ngày hội',
        suggestedActivity: 'Hát tốp ca, nhảy đồng diễn bài hát tiếng Anh, đố vui nhận quà.',
        vocab: ['festival', 'talent', 'happy', 'fun'],
        patterns: ['English is fun!', 'We love English!']
      });
    }
    else if (w === 35) {
      // Kiểm tra cuối năm & Tổng kết (2 tiết)
      unitCode = 'Assessment 2';
      theme = 'Đánh giá định kỳ Cuối năm & Tổng kết';
      lessonTitle = 'Kiểm tra định kỳ Cuối năm & Tổng kết, hướng dẫn tự học hè';
      keyKnowledge = 'Đánh giá kết quả học tập môn Tiếng Anh cả năm học theo quy định của Bộ GD&ĐT.';
      vocab = ['Toàn bộ từ vựng cả năm'];
      patterns = ['Toàn bộ mẫu câu cả năm'];
      pageRange = 'Đề kiểm tra định kỳ Cuối năm học';

      globalPeriodCount++;
      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Assessment 2',
        unitTitle: 'Kiểm tra Cuối năm',
        lessonTitle: 'Kiểm tra định kỳ Cuối năm học (Listening & Speaking Exam)',
        theme: 'Đánh giá định kỳ Cuối năm & Tổng kết',
        lessonPart: 'Kiểm tra định kỳ Cuối năm học (Listening & Speaking Exam)',
        scope: 'Đánh giá các kỹ năng nghe, nói, nhận biết từ và phản xạ giao tiếp tự nhiên.',
        keyFocus: 'Ghi nhận và xếp loại mức độ hoàn thành môn học theo Thông tư 27.',
        pageRange: 'Đề kiểm tra cuối năm',
        suggestedActivity: 'Thi nghe hiểu, xem tranh gọi tên và phỏng vấn trực tiếp cùng giáo viên.',
        vocab: ['Toàn bộ từ vựng cả năm'],
        patterns: ['Toàn bộ mẫu câu cả năm']
      });

      globalPeriodCount++;
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Assessment 2',
        unitTitle: 'Tổng kết năm học',
        lessonTitle: 'Tổng kết năm học, Trao thưởng & Hướng dẫn tự học hè',
        theme: 'Đánh giá định kỳ Cuối năm & Tổng kết',
        lessonPart: 'Tổng kết năm học, Trao thưởng & Hướng dẫn tự học hè',
        scope: 'Tổng kết sự tiến bộ, trao huy hiệu "Ngôi sao Tiếng Anh", giới thiệu app tự học hè (hoclieu.vn, sachmem.vn)',
        keyFocus: 'Duy trì thói quen nghe tiếng Anh và niềm yêu thích ngôn ngữ trong kỳ nghỉ hè.',
        pageRange: 'Tài liệu tự học hè',
        suggestedActivity: 'Vinh danh học sinh, xem clip tiếng Anh hoạt hình bổ trợ hè.',
        vocab: ['summer', 'vacation', 'star', 'explore'],
        patterns: ['Have a great summer!', 'See you next year!']
      });
    }
    else {
      // Normal Units: 3 lessons per unit
      // HK1: Weeks 1 to 12 (12 weeks x 2 periods = 24 periods = 8 units x 3 periods)
      // HK2: Weeks 19 to 30 (12 weeks x 2 periods = 24 periods = 8 units x 3 periods)
      let uIdx = 0;
      let lessonPeriodOffset = 0; // 0 (Lesson 1 & 2), 1 (Lesson 3 & Next Lesson 1), 2 (Next Lesson 2 & 3)
      
      if (w >= 1 && w <= 12) {
        const offset = (w - 1) * 2; // 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22
        uIdx = Math.floor(offset / 3); // 0 to 7
        lessonPeriodOffset = (w - 1) % 3;
      } else {
        const offset = (w - 19) * 2;
        uIdx = 8 + Math.floor(offset / 3); // 8 to 15
        lessonPeriodOffset = (w - 19) % 3;
      }

      const uData = units[uIdx] || units[0];
      const nextUData = units[uIdx + 1] || uData;

      if (lessonPeriodOffset === 0) {
        // Week has Unit X: Lesson 1 (Tiết 1) & Lesson 2 (Tiết 2)
        unitCode = uData.unit;
        theme = uData.theme;
        lessonTitle = `${uData.unit}: ${uData.theme} (Lesson 1 & Lesson 2)`;
        keyKnowledge = `Âm trọng tâm: ${uData.sound}. Từ vựng: ${uData.vocab.join(', ')}. Mẫu câu: ${uData.patterns.join(' ')}`;
        vocab = uData.vocab;
        patterns = uData.patterns;
        pageRange = `SGK ${gradeLabel} - ${uData.pages}`;

        globalPeriodCount++;
        periods.push({
          periodNumber: 1,
          periodLabel: 'Tiết 1',
          unitCode: uData.unit,
          unitTitle: `${uData.unit}: ${uData.theme}`,
          lessonTitle: `${uData.unit}: ${uData.theme} - Lesson 1`,
          theme: uData.theme,
          lessonPart: `Lesson 1: Hoạt động 1, 2 (${uData.sound})`,
          scope: '1. Listen and repeat; 2. Point and say',
          keyFocus: `Luyện nghe phát âm chuẩn ${uData.sound}, nhận biết và nói đúng các từ vựng: ${uData.vocab.slice(0, 3).join(', ')}.`,
          pageRange: `SGK ${gradeLabel}, trang ${uData.pages.split('-')[0]}`,
          suggestedActivity: 'Mô hình hóa khẩu hình âm, flashcard show, trò chơi "Pointing Game" & "Whisper".',
          vocab: uData.vocab.slice(0, 2),
          patterns: [uData.patterns[0]]
        });

        globalPeriodCount++;
        periods.push({
          periodNumber: 2,
          periodLabel: 'Tiết 2',
          unitCode: uData.unit,
          unitTitle: `${uData.unit}: ${uData.theme}`,
          lessonTitle: `${uData.unit}: ${uData.theme} - Lesson 2`,
          theme: uData.theme,
          lessonPart: `Lesson 2: Hoạt động 3, 4, 5 (Chant, Tick & Trace)`,
          scope: '3. Listen and chant; 4. Listen and tick; 5. Look and trace',
          keyFocus: `Nghe và vỗ tay theo bài chant nhịp điệu, luyện kỹ năng nghe chọn tranh và đồ nét chữ cái.`,
          pageRange: `SGK ${gradeLabel}, trang tiếp theo`,
          suggestedActivity: 'Vỗ tay theo nhịp điệu bài chant, bài tập nghe trắc nghiệm trên màn hình tương tác, đồ chữ trên không trung.',
          vocab: uData.vocab.slice(2),
          patterns: [uData.patterns[0]]
        });
      } else if (lessonPeriodOffset === 1) {
        // Week has Unit X: Lesson 3 (Tiết 1) & Unit X+1: Lesson 1 (Tiết 2)
        unitCode = `${uData.unit} & ${nextUData.unit}`;
        theme = `${uData.theme} / ${nextUData.theme}`;
        lessonTitle = `${uData.unit} (Lesson 3) & ${nextUData.unit} (Lesson 1)`;
        keyKnowledge = `Củng cố Unit trước và hình thành kiến thức Unit tiếp theo (${uData.sound} & ${nextUData.sound}).`;
        vocab = [...uData.vocab.slice(2), ...nextUData.vocab.slice(0, 2)];
        patterns = [uData.patterns[0], nextUData.patterns[0]];
        pageRange = `SGK ${gradeLabel} - ${uData.pages} / ${nextUData.pages}`;

        globalPeriodCount++;
        periods.push({
          periodNumber: 1,
          periodLabel: 'Tiết 1',
          unitCode: uData.unit,
          unitTitle: `${uData.unit}: ${uData.theme}`,
          lessonTitle: `${uData.unit}: ${uData.theme} - Lesson 3`,
          theme: uData.theme,
          lessonPart: `Lesson 3: Hoạt động 6, 7, 8 (Talk, Sing & Project)`,
          scope: '6. Listen and repeat; 7. Let\'s talk; 8. Let\'s sing / Project',
          keyFocus: `Giao tiếp phản xạ với cấu trúc câu: "${uData.patterns[0]}", hát bài hát chủ đề hoặc làm sản phẩm dự án.`,
          pageRange: `SGK ${gradeLabel}, trang cuối ${uData.unit}`,
          suggestedActivity: 'Đóng vai đối thoại theo cặp, hát vận động toàn thân (TPR Action Song), trưng bày sản phẩm thủ công.',
          vocab: uData.vocab,
          patterns: uData.patterns
        });

        globalPeriodCount++;
        periods.push({
          periodNumber: 2,
          periodLabel: 'Tiết 2',
          unitCode: nextUData.unit,
          unitTitle: `${nextUData.unit}: ${nextUData.theme}`,
          lessonTitle: `${nextUData.unit}: ${nextUData.theme} - Lesson 1`,
          theme: nextUData.theme,
          lessonPart: `Lesson 1: Hoạt động 1, 2 (${nextUData.sound})`,
          scope: '1. Listen and repeat; 2. Point and say',
          keyFocus: `Khởi động bài học mới, luyện nghe phát âm chuẩn ${nextUData.sound} và nhận diện từ vựng mới: ${nextUData.vocab.slice(0, 3).join(', ')}.`,
          pageRange: `SGK ${gradeLabel}, trang đầu ${nextUData.unit}`,
          suggestedActivity: 'Mô hình hóa khẩu hình âm mới, trò chơi "Listen and Point", flashcards tương tác.',
          vocab: nextUData.vocab.slice(0, 2),
          patterns: [nextUData.patterns[0]]
        });
      } else {
        // Week has Unit X: Lesson 2 (Tiết 1) & Lesson 3 (Tiết 2)
        // Here uData is the second unit from previous span
        unitCode = uData.unit;
        theme = uData.theme;
        lessonTitle = `${uData.unit}: ${uData.theme} (Lesson 2 & Lesson 3)`;
        keyKnowledge = `Luyện tập kỹ năng chant, nghe trắc nghiệm và giao tiếp thực hành của ${uData.unit}.`;
        vocab = uData.vocab;
        patterns = uData.patterns;
        pageRange = `SGK ${gradeLabel} - ${uData.pages}`;

        globalPeriodCount++;
        periods.push({
          periodNumber: 1,
          periodLabel: 'Tiết 1',
          unitCode: uData.unit,
          unitTitle: `${uData.unit}: ${uData.theme}`,
          lessonTitle: `${uData.unit}: ${uData.theme} - Lesson 2`,
          theme: uData.theme,
          lessonPart: `Lesson 2: Hoạt động 3, 4, 5 (Chant, Tick & Trace)`,
          scope: '3. Listen and chant; 4. Listen and tick; 5. Look and trace',
          keyFocus: `Nghe và vỗ tay theo bài chant nhịp điệu, luyện kỹ năng nghe chọn tranh và đồ nét chữ cái.`,
          pageRange: `SGK ${gradeLabel}, trang giữa ${uData.unit}`,
          suggestedActivity: 'Vỗ tay theo nhịp điệu bài chant, bài tập nghe trắc nghiệm trên màn hình tương tác, đồ chữ trên không trung.',
          vocab: uData.vocab.slice(2),
          patterns: [uData.patterns[0]]
        });

        globalPeriodCount++;
        periods.push({
          periodNumber: 2,
          periodLabel: 'Tiết 2',
          unitCode: uData.unit,
          unitTitle: `${uData.unit}: ${uData.theme}`,
          lessonTitle: `${uData.unit}: ${uData.theme} - Lesson 3`,
          theme: uData.theme,
          lessonPart: `Lesson 3: Hoạt động 6, 7, 8 (Talk, Sing & Project)`,
          scope: '6. Listen and repeat; 7. Let\'s talk; 8. Let\'s sing / Project',
          keyFocus: `Giao tiếp phản xạ với cấu trúc câu: "${uData.patterns[0]}", hát bài hát chủ đề hoặc làm sản phẩm dự án.`,
          pageRange: `SGK ${gradeLabel}, trang cuối ${uData.unit}`,
          suggestedActivity: 'Đóng vai đối thoại theo cặp, hát vận động toàn thân (TPR Action Song), trưng bày sản phẩm thủ công.',
          vocab: uData.vocab,
          patterns: uData.patterns
        });
      }
    }

    weeks.push({
      week: w,
      weekLabel: `Tuần ${w}`,
      semester,
      theme,
      unitCode,
      lessonTitle,
      allLessonsInWeek: periods.map(p => `${p.periodLabel}: ${p.lessonPart} (${p.scope})`),
      periodCount: 2,
      sections: ['eng_listen_speak', 'eng_phonics_vocab', 'eng_read_write'],
      periods,
      keyKnowledge,
      keyVocabulary: vocab,
      sentencePatternsOrRules: patterns,
      textbookPageRange: pageRange,
      suggestedGame: {
        name: 'Flashcard Race & Pass the Secret Ball',
        goal: 'Rèn luyện phản xạ nghe, phát âm chuẩn xác và tạo hứng thú học tập vui vẻ cho học sinh.',
        materials: 'Bộ thẻ tranh Flashcards, bóng mềm, loa bluetooth phát nhạc.',
        rules: 'Học sinh chuyền bóng theo điệu nhạc; khi nhạc dừng, em cầm bóng sẽ giơ thẻ tranh, phát âm to rõ ràng từ vựng và câu khẩu lệnh.'
      },
      suggestedMethod: 'Communicative Language Teaching (CLT), Total Physical Response (TPR), Phonics-in-context, Gamification.',
      suggestedScenario: 'Tình huống giao tiếp tự nhiên trong lớp học, sân trường, gia đình và khu vui chơi.'
    });
  }

  // Enforce exactly 70 periods with sequential PPCT labels (Tiết 1 -> Tiết 70) and single integration activity
  let runningPPCT12 = 0;
  for (const wk of weeks) {
    for (const p of wk.periods) {
      runningPPCT12++;
      p.ppctNumber = runningPPCT12;
      p.periodLabel = `Tiết ${runningPPCT12}`;
      p.singleIntegrationActivity = 'B';
    }
  }

  return weeks;
}

// -------------------------------------------------------------------------
// DATA GENERATOR FOR GRADE 3, 4, 5 (140 TIẾT / 35 TUẦN - 4 TIẾT/TUẦN)
// CẤU TRÚC MỖI UNIT (6 TIẾT / 3 LESSONS X 2 TIẾT):
// Lesson 1:
//   Tiết 1 (HĐ 1, 2, 3): 1. Look, listen and repeat; 2. Listen, point and say; 3. Let's talk
//   Tiết 2 (HĐ 4, 5, 6): 4. Listen and tick/number; 5. Look, complete and read; 6. Let's play / Let's sing
// Lesson 2:
//   Tiết 1 (HĐ 1, 2, 3): 1. Look, listen and repeat; 2. Listen, point and say; 3. Let's talk
//   Tiết 2 (HĐ 4, 5, 6): 4. Listen and number/tick; 5. Look, complete and read / Read and match; 6. Let's play / Let's chant
// Lesson 3:
//   Tiết 1 (HĐ 1, 2, 3): 1. Listen and repeat (Phonics); 2. Listen and circle/chant; 3. Let's chant / Let's say
//   Tiết 2 (HĐ 4, 5, 6): 4. Read and match/complete; 5. Let's write; 6. Project
// -------------------------------------------------------------------------

export interface UpperGradeUnitDetail {
  unitNumber: number;
  unitCode: string;
  theme: string;
  title: string;
  lesson1Focus: { vocab: string[]; patterns: string[]; page: string };
  lesson2Focus: { vocab: string[]; patterns: string[]; page: string };
  lesson3Focus: { phonics: string; vocab: string[]; patterns: string[]; page: string };
  integratedCV2345: {
    digital: string;
    ai: string;
    trafficSafety?: string;
    lifeSkills?: string;
    localEdu?: string;
  };
}

// GRADE 3 - 20 UNITS FULL LIST (GLOBAL SUCCESS - BGD&ĐT & NXBGDVN)
export const GRADE_3_UNITS_DATA: UpperGradeUnitDetail[] = [
  {
    unitNumber: 1,
    unitCode: 'Unit 1',
    theme: 'Greetings & Introductions',
    title: 'Unit 1: Hello',
    lesson1Focus: { vocab: ['hello', 'hi', 'I', 'am', 'Mai', 'Nam', 'Ben', 'Lucy'], patterns: ['Hello, I am Mai.', 'Hi, Mai. I am Ben.'], page: 'p.10-11' },
    lesson2Focus: { vocab: ['how', 'fine', 'thank you', 'thanks', 'goodbye', 'bye'], patterns: ['How are you? - I am fine, thank you.', 'Goodbye, class.'], page: 'p.12-13' },
    lesson3Focus: { phonics: 'Letter H /h/ & B /b/', vocab: ['hello', 'bye', 'book', 'hat'], patterns: ['H, h, Hello. B, b, Bye.'], page: 'p.14-15' },
    integratedCV2345: { digital: 'NLS: Xem video hội thoại hoạt hình trên sachmem.vn', ai: 'AI: Luyện phát âm cùng trợ lý giọng nói thông minh', lifeSkills: 'KNS: Văn hóa chào hỏi lễ phép khi gặp thầy cô và bạn mới' }
  },
  {
    unitNumber: 2,
    unitCode: 'Unit 2',
    theme: 'Names & Spelling',
    title: 'Unit 2: Our names',
    lesson1Focus: { vocab: ['name', 'what', 'your', 'my', 'Mary', 'Peter'], patterns: ['What is your name? - My name is Linh.'], page: 'p.16-17' },
    lesson2Focus: { vocab: ['spell', 'alphabet', 'letters A-Z'], patterns: ['How do you spell your name? - L-I-N-H.'], page: 'p.18-19' },
    lesson3Focus: { phonics: 'Letter A /æ/ & M /m/', vocab: ['apple', 'Mary', 'name', 'map'], patterns: ['A, a, Apple. M, m, Mary.'], page: 'p.20-21' },
    integratedCV2345: { digital: 'NLS: Sử dụng bàn phím ảo gõ tên và đánh vần chữ cái', ai: 'AI: Tạo thẻ tên số hóa với Canva Magic Studio', lifeSkills: 'KNS: Giới thiệu bản thân tự tin trước đám đông' }
  },
  {
    unitNumber: 3,
    unitCode: 'Unit 3',
    theme: 'Friends & Classmates',
    title: 'Unit 3: Our friends',
    lesson1Focus: { vocab: ['this', 'that', 'friend', 'teacher', 'Mr Long', 'Miss Hien'], patterns: ['This is Bill. - Hello, Bill.', 'That is my teacher.'], page: 'p.22-23' },
    lesson2Focus: { vocab: ['is', 'he', 'she', 'yes', 'no', 'classmate'], patterns: ['Is this Mary? - Yes, it is. / No, it isn\'t.'], page: 'p.24-25' },
    lesson3Focus: { phonics: 'Letter T /t/ & D /d/', vocab: ['teacher', 'door', 'desk', 'ten'], patterns: ['T, t, Teacher. D, d, Door.'], page: 'p.26-27' },
    integratedCV2345: { digital: 'NLS: Tương tác trò chơi ghép nối Quizizz theo cặp', ai: 'AI: Nhận diện biểu cảm thân thiện trong giao tiếp', lifeSkills: 'KNS: Xây dựng tình bạn hòa đồng, yêu thương giúp đỡ nhau' }
  },
  {
    unitNumber: 4,
    unitCode: 'Unit 4',
    theme: 'Our bodies',
    title: 'Unit 4: Our bodies',
    lesson1Focus: { vocab: ['eye', 'ear', 'nose', 'mouth', 'face', 'touch'], patterns: ['Touch your nose.', 'Touch your face.'], page: 'p.28-29' },
    lesson2Focus: { vocab: ['hand', 'arm', 'leg', 'head', 'open', 'eyes', 'ears'], patterns: ['These are my eyes.', 'Open your mouth.'], page: 'p.30-31' },
    lesson3Focus: { phonics: 'Letter E /e/ & O /ɒ/', vocab: ['eye', 'ear', 'open', 'orange'], patterns: ['E, e, Eye. O, o, Open.'], page: 'p.32-33' },
    integratedCV2345: { digital: 'NLS: Xem mô hình 3D giải phẫu cơ thể học sinh tiểu học', ai: 'AI: Ứng dụng AI theo dõi động tác thể dục giữ gìn vệ sinh cơ thể', lifeSkills: 'KNS: Giữ gìn vệ sinh thân thể, bảo vệ mắt và tai' }
  },
  {
    unitNumber: 5,
    unitCode: 'Unit 5',
    theme: 'My hobbies',
    title: 'Unit 5: My hobbies',
    lesson1Focus: { vocab: ['singing', 'dancing', 'drawing', 'swimming', 'reading', 'hobby'], patterns: ['What is your hobby? - I like singing.'], page: 'p.34-35' },
    lesson2Focus: { vocab: ['cooking', 'running', 'walking', 'playing games'], patterns: ['Do you like swimming? - Yes, I do. / No, I don\'t.'], page: 'p.36-37' },
    lesson3Focus: { phonics: 'Letter S /s/ & D /d/', vocab: ['singing', 'dancing', 'drawing', 'swimming'], patterns: ['S, s, Singing. D, d, Dancing.'], page: 'p.38-39' },
    integratedCV2345: { digital: 'NLS: Làm khảo sát số trực tuyến (Google Forms/Mentimeter) về sở thích', ai: 'AI: Gợi ý các hoạt động thể thao phù hợp lứa tuổi', lifeSkills: 'KNS: Rèn luyện thói quen lành mạnh, phát huy năng khiếu bản thân' }
  },
  {
    unitNumber: 6,
    unitCode: 'Unit 6',
    theme: 'Our school',
    title: 'Unit 6: Our school',
    lesson1Focus: { vocab: ['school', 'classroom', 'library', 'playground', 'big', 'new'], patterns: ['Is this our school? - Yes, it is.', 'Look at the classroom.'], page: 'p.44-45' },
    lesson2Focus: { vocab: ['computer room', 'gym', 'art room', 'music room', 'large', 'beautiful'], patterns: ['Is the library big? - Yes, it is. / No, it isn\'t.'], page: 'p.46-47' },
    lesson3Focus: { phonics: 'Letter C /k/ & G /g/', vocab: ['classroom', 'gym', 'gate', 'computer'], patterns: ['C, c, Classroom. G, g, Gym.'], page: 'p.48-49' },
    integratedCV2345: { digital: 'NLS: Tham quan không gian trường học số hóa 360 độ', ai: 'AI: Vẽ sơ đồ trường học tương lai cùng Canva AI', lifeSkills: 'KNS: Giữ gìn vệ sinh chung, bảo quản cơ sở vật chất trường học' }
  },
  {
    unitNumber: 7,
    unitCode: 'Unit 7',
    theme: 'Classroom instructions',
    title: 'Unit 7: Classroom instructions',
    lesson1Focus: { vocab: ['open', 'close', 'stand up', 'sit down', 'come in', 'go out', 'speak', 'ask'], patterns: ['Open your book, please.', 'May I come in? - Yes, you can. / No, you can\'t.'], page: 'p.50-51' },
    lesson2Focus: { vocab: ['ask a question', 'speak Vietnamese', 'write', 'read', 'listen', 'may I'], patterns: ['May I ask a question? - Yes, you can.', 'May I speak Vietnamese? - No, you can\'t.'], page: 'p.52-53' },
    lesson3Focus: { phonics: 'Letter O /əʊ/ & C /k/', vocab: ['open', 'close', 'come', 'can'], patterns: ['O, o, Open. C, c, Close.'], page: 'p.54-55' },
    integratedCV2345: { digital: 'NLS: Trò chơi phản xạ khẩu lệnh tương tác trên bảng tương tác số', ai: 'AI: Nhận diện giọng nói và khẩu lệnh lớp học tiếng Anh', lifeSkills: 'KNS: Tuân thủ nội quy lớp học, xin phép lịch sự khi muốn phát biểu' }
  },
  {
    unitNumber: 8,
    unitCode: 'Unit 8',
    theme: 'My school things',
    title: 'Unit 8: My school things',
    lesson1Focus: { vocab: ['pen', 'pencil', 'ruler', 'eraser', 'school bag', 'pencil case'], patterns: ['I have a pen.', 'I have a ruler and an eraser.'], page: 'p.56-57' },
    lesson2Focus: { vocab: ['book', 'notebook', 'pencil sharpener', 'have', 'do you have'], patterns: ['Do you have a pencil case? - Yes, I do. / No, I don\'t.'], page: 'p.58-59' },
    lesson3Focus: { phonics: 'Letter P /p/ & R /r/', vocab: ['pen', 'pencil', 'rubber', 'ruler'], patterns: ['P, p, Pen. R, r, Ruler.'], page: 'p.60-61' },
    integratedCV2345: { digital: 'NLS: Trò chơi ghép thẻ Flashcard đồ dùng học tập trực tuyến trên Wordwall', ai: 'AI: Nhận diện đồ dùng học tập qua camera Google Lens', lifeSkills: 'KNS: Sắp xếp đồ dùng học tập ngăn nắp, cẩn thận' }
  },
  {
    unitNumber: 9,
    unitCode: 'Unit 9',
    theme: 'Colors',
    title: 'Unit 9: Colors',
    lesson1Focus: { vocab: ['red', 'blue', 'yellow', 'green', 'orange', 'color'], patterns: ['What color is it? - It is blue.'], page: 'p.62-63' },
    lesson2Focus: { vocab: ['black', 'white', 'brown', 'pink', 'purple', 'they are'], patterns: ['What color are they? - They are yellow and green.'], page: 'p.64-65' },
    lesson3Focus: { phonics: 'Letter B /b/ & Y /j/', vocab: ['blue', 'black', 'yellow', 'yes'], patterns: ['B, b, Blue. Y, y, Yellow.'], page: 'p.66-67' },
    integratedCV2345: { digital: 'NLS: Sử dụng bảng mã màu số (Color Picker) trên máy tính', ai: 'AI: Tạo bảng phối màu tranh vẽ bằng AI Generator', trafficSafety: 'ATGT: Nhận biết ý nghĩa màu sắc đèn tín hiệu giao thông (Đỏ, Vàng, Xanh)' }
  },
  {
    unitNumber: 10,
    unitCode: 'Unit 10',
    theme: 'Break time activities',
    title: 'Unit 10: Break time activities',
    lesson1Focus: { vocab: ['football', 'badminton', 'basketball', 'chess', 'table tennis', 'play'], patterns: ['What do you do at break time? - I play football.'], page: 'p.68-69' },
    lesson2Focus: { vocab: ['skipping', 'hide-and-seek', 'blind man\'s buff', 'word puzzles', 'let\'s'], patterns: ['Let\'s play chess together! - OK, let\'s play.'], page: 'p.70-71' },
    lesson3Focus: { phonics: 'Letter F /f/ & B /b/', vocab: ['football', 'badminton', 'basketball', 'friend'], patterns: ['F, f, Football. B, b, Badminton.'], page: 'p.72-73' },
    integratedCV2345: { digital: 'NLS: Sử dụng đồng hồ đếm giờ số để quản lý giờ ra chơi', ai: 'AI: Phân tích thói quen vận động thể thao an toàn', lifeSkills: 'KNS: Chơi các trò chơi lành mạnh, tránh xô đẩy nguy hiểm trong giờ ra chơi' }
  },
  // Semester 2 Units (Units 11 - 20)
  {
    unitNumber: 11,
    unitCode: 'Unit 11',
    theme: 'My family',
    title: 'Unit 11: My family',
    lesson1Focus: { vocab: ['father', 'mother', 'brother', 'sister', 'who', 'this'], patterns: ['Who is this? - This is my mother.'], page: 'p.6-7 (T2)' },
    lesson2Focus: { vocab: ['grandfather', 'grandmother', 'baby', 'years old', 'how old'], patterns: ['How old is your brother? - He is eight years old.'], page: 'p.8-9 (T2)' },
    lesson3Focus: { phonics: 'Letter F /f/ & M /m/', vocab: ['father', 'family', 'mother', 'man'], patterns: ['F, f, Father. M, m, Mother.'], page: 'p.10-11 (T2)' },
    integratedCV2345: { digital: 'NLS: Thiết kế cây gia đình số (Digital Family Tree)', ai: 'AI: Hỗ trợ tạo khung ảnh kỷ niệm gia đình', lifeSkills: 'KNS: Kính trọng ông bà cha mẹ, yêu thương anh chị em' }
  },
  {
    unitNumber: 12,
    unitCode: 'Unit 12',
    theme: 'Jobs',
    title: 'Unit 12: Jobs',
    lesson1Focus: { vocab: ['teacher', 'doctor', 'nurse', 'driver', 'what does', 'job'], patterns: ['What does your father do? - He is a doctor.'], page: 'p.12-13 (T2)' },
    lesson2Focus: { vocab: ['worker', 'farmer', 'cook', 'police officer', 'singer'], patterns: ['Is your mother a teacher? - Yes, she is. / No, she isn\'t.'], page: 'p.14-15 (T2)' },
    lesson3Focus: { phonics: 'Letter D /d/ & N /n/', vocab: ['doctor', 'driver', 'nurse', 'nine'], patterns: ['D, d, Doctor. N, n, Nurse.'], page: 'p.16-17 (T2)' },
    integratedCV2345: { digital: 'NLS: Xem phóng sự ngắn về các nghề nghiệp trong xã hội', ai: 'AI: Mô phỏng trang phục các nghề nghiệp với AI', lifeSkills: 'KNS: Tôn trọng mọi ngành nghề chân chính trong xã hội' }
  },
  {
    unitNumber: 13,
    unitCode: 'Unit 13',
    theme: 'My house',
    title: 'Unit 13: My house',
    lesson1Focus: { vocab: ['living room', 'bedroom', 'kitchen', 'bathroom', 'house', 'where'], patterns: ['Where is the living room? - It is here / It is there.'], page: 'p.18-19 (T2)' },
    lesson2Focus: { vocab: ['hall', 'dining room', 'garden', 'balcony', 'there is', 'there are'], patterns: ['There is a garden in my house.', 'There are two bedrooms.'], page: 'p.20-21 (T2)' },
    lesson3Focus: { phonics: 'Letter K /k/ & B /b/', vocab: ['kitchen', 'bedroom', 'bathroom', 'balcony'], patterns: ['K, k, Kitchen. B, b, Bedroom.'], page: 'p.22-23 (T2)' },
    integratedCV2345: { digital: 'NLS: Mô phỏng thiết kế ngôi nhà ảo', ai: 'AI: Trợ lý mô tả các phòng trong nhà', lifeSkills: 'KNS: Giữ gìn nhà cửa sạch sẽ, tiết kiệm điện nước' }
  },
  {
    unitNumber: 14,
    unitCode: 'Unit 14',
    theme: 'My bedroom',
    title: 'Unit 14: My bedroom',
    lesson1Focus: { vocab: ['bed', 'wardrobe', 'desk', 'chair', 'in the room'], patterns: ['Where is the bed? - It is in the bedroom.'], page: 'p.24-25 (T2)' },
    lesson2Focus: { vocab: ['lamp', 'door', 'window', 'picture', 'near', 'under', 'on'], patterns: ['Where are the chairs? - They are near the table.'], page: 'p.26-27 (T2)' },
    lesson3Focus: { phonics: 'Letter D /d/ & W /w/', vocab: ['desk', 'door', 'wardrobe', 'window'], patterns: ['D, d, Desk. W, w, Window.'], page: 'p.28-29 (T2)' },
    integratedCV2345: { digital: 'NLS: Trò chơi tìm đồ vật thất lạc trên màn hình cảm ứng', ai: 'AI: Sắp xếp vị trí đồ dùng thông minh', lifeSkills: 'KNS: Tự gấp chăn màn và dọn dẹp góc học tập của em' }
  },
  {
    unitNumber: 15,
    unitCode: 'Unit 15',
    theme: 'At the dining table',
    title: 'Unit 15: At the dining table',
    lesson1Focus: { vocab: ['rice', 'fish', 'meat', 'bread', 'eggs', 'would you like'], patterns: ['Would you like some rice? - Yes, please. / No, thanks.'], page: 'p.30-31 (T2)' },
    lesson2Focus: { vocab: ['vegetables', 'juice', 'milk', 'water', 'drink', 'eat'], patterns: ['What would you like to drink? - I\'d like some water, please.'], page: 'p.32-33 (T2)' },
    lesson3Focus: { phonics: 'Letter M /m/ & B /b/', vocab: ['meat', 'milk', 'bread', 'banana'], patterns: ['M, m, Meat. B, b, Bread.'], page: 'p.34-35 (T2)' },
    integratedCV2345: { digital: 'NLS: Thiết kế thực đơn bữa ăn dinh dưỡng trên Canva', ai: 'AI: Đề xuất tháp dinh dưỡng cân đối cho trẻ em', lifeSkills: 'KNS: Ứng xử văn minh tại bàn ăn, không bỏ thừa thức ăn' }
  },
  {
    unitNumber: 16,
    unitCode: 'Unit 16',
    theme: 'My pets',
    title: 'Unit 16: My pets',
    lesson1Focus: { vocab: ['dog', 'cat', 'bird', 'rabbit', 'pet', 'do you have'], patterns: ['Do you have any pets? - Yes, I have a cat.'], page: 'p.40-41 (T2)' },
    lesson2Focus: { vocab: ['parrot', 'goldfish', 'hamster', 'cage', 'in the tank'], patterns: ['Where are the birds? - They are in the cage.'], page: 'p.42-43 (T2)' },
    lesson3Focus: { phonics: 'Letter P /p/ & G /g/', vocab: ['parrot', 'pet', 'goldfish', 'garden'], patterns: ['P, p, Parrot. G, g, Goldfish.'], page: 'p.44-45 (T2)' },
    integratedCV2345: { digital: 'NLS: Xem video thế giới động vật trên National Geographic Kids', ai: 'AI: Nhận diện loài thú cưng qua ảnh chụp', lifeSkills: 'KNS: Tình yêu thương và trách nhiệm chăm sóc động vật' }
  },
  {
    unitNumber: 17,
    unitCode: 'Unit 17',
    theme: 'Our toys',
    title: 'Unit 17: Our toys',
    lesson1Focus: { vocab: ['doll', 'car', 'robot', 'plane', 'how many', 'toys'], patterns: ['How many cars do you have? - I have three cars.'], page: 'p.46-47 (T2)' },
    lesson2Focus: { vocab: ['kite', 'teddy bear', 'ship', 'puzzle', 'yo-yo', 'like'], patterns: ['What toys do you like? - I like robots and kites.'], page: 'p.48-49 (T2)' },
    lesson3Focus: { phonics: 'Letter R /r/ & P /p/', vocab: ['robot', 'red', 'plane', 'puzzle'], patterns: ['R, r, Robot. P, p, Plane.'], page: 'p.50-51 (T2)' },
    integratedCV2345: { digital: 'NLS: Đếm số lượng đồ chơi trong bài tập số hóa tương tác', ai: 'AI: Phân loại đồ chơi tái chế thông minh', lifeSkills: 'KNS: Chia sẻ đồ chơi với bạn bè, cất gọn sau khi chơi' }
  },
  {
    unitNumber: 18,
    unitCode: 'Unit 18',
    theme: 'Playing and doing',
    title: 'Unit 18: Playing and doing',
    lesson1Focus: { vocab: ['playing', 'singing', 'drawing', 'reading', 'dancing', 'cooking', 'doing'], patterns: ['What are you doing? - I am playing with a yo-yo.', 'I am singing.'], page: 'p.52-53 (T2)' },
    lesson2Focus: { vocab: ['swimming', 'running', 'watching TV', 'listening to music', 'he', 'she'], patterns: ['What is he doing? - He is drawing.', 'What is she doing? - She is swimming.'], page: 'p.54-55 (T2)' },
    lesson3Focus: { phonics: 'Letter P /p/ & S /s/', vocab: ['playing', 'singing', 'park', 'song'], patterns: ['P, p, Playing. S, s, Singing.'], page: 'p.56-57 (T2)' },
    integratedCV2345: { digital: 'NLS: Tương tác trò chơi ghép nối hành động trên Wordwall', ai: 'AI: Nhận diện hoạt động vận động qua camera AI', lifeSkills: 'KNS: Đoàn kết, chia sẻ đồ chơi và hợp tác vui vẻ cùng bạn bè' }
  },
  {
    unitNumber: 19,
    unitCode: 'Unit 19',
    theme: 'Outdoor activities',
    title: 'Unit 19: Outdoor activities',
    lesson1Focus: { vocab: ['skating', 'cycling', 'flying a kite', 'skipping', 'running'], patterns: ['What are you doing? - I am cycling in the park.'], page: 'p.58-59 (T2)' },
    lesson2Focus: { vocab: ['walking', 'swimming', 'playing badminton', 'park', 'what is he doing'], patterns: ['What is he doing? - He is flying a kite.'], page: 'p.60-61 (T2)' },
    lesson3Focus: { phonics: 'Letter S /s/ & C /k/', vocab: ['skating', 'skipping', 'cycling', 'city'], patterns: ['S, s, Skating. C, c, Cycling.'], page: 'p.62-63 (T2)' },
    integratedCV2345: { digital: 'NLS: Xem hướng dẫn vận động ngoài trời an toàn trên video số', ai: 'AI: Đếm bước chân và theo dõi hoạt động thể chất', trafficSafety: 'ATGT: Đội mũ bảo hiểm khi đi xe đạp, chỉ đi xe ở nơi quy định' }
  },
  {
    unitNumber: 20,
    unitCode: 'Unit 20',
    theme: 'At the zoo',
    title: 'Unit 20: At the zoo',
    lesson1Focus: { vocab: ['monkey', 'elephant', 'tiger', 'bear', 'zoo', 'see'], patterns: ['What can you see at the zoo? - I can see a tiger.'], page: 'p.64-65 (T2)' },
    lesson2Focus: { vocab: ['eating', 'climbing', 'running', 'sleeping', 'doing'], patterns: ['What is the monkey doing? - It is eating a banana.'], page: 'p.66-67 (T2)' },
    lesson3Focus: { phonics: 'Letter T /t/ & M /m/', vocab: ['tiger', 'tree', 'monkey', 'mouth'], patterns: ['T, t, Tiger. M, m, Monkey.'], page: 'p.68-69 (T2)' },
    integratedCV2345: { digital: 'NLS: Chuyến tham quan thực tế ảo sở thú (Virtual Zoo Tour)', ai: 'AI: Nhận diện tiếng kêu động vật hoang dã', lifeSkills: 'KNS: Bảo vệ động vật quý hiếm, tuân thủ biển báo tại vườn thú' }
  }
];

// =========================================================================
// GRADE 4 - 20 UNITS FULL LIST (GLOBAL SUCCESS - BGD&ĐT & NXBGDVN)
// =========================================================================
export const GRADE_4_UNITS_DATA: UpperGradeUnitDetail[] = [
  {
    unitNumber: 1,
    unitCode: 'Unit 1',
    theme: 'My friends & Countries',
    title: 'Unit 1: My friends',
    lesson1Focus: { vocab: ['Vietnam', 'America', 'Australia', 'Britain', 'Singapore', 'where', 'from'], patterns: ['Where are you from? - I am from Vietnam.'], page: 'p.10-11' },
    lesson2Focus: { vocab: ['Tokyo', 'London', 'Sydney', 'Hanoi', 'Bangkok', 'city', 'country'], patterns: ['Where is he from? - He is from London, Britain.'], page: 'p.12-13' },
    lesson3Focus: { phonics: 'Sound /æ/ in America & /ɪ/ in Britain', vocab: ['America', 'Britain', 'Singapore', 'Australia'], patterns: ['A, a, America. I, i, Britain.'], page: 'p.14-15' },
    integratedCV2345: { digital: 'NLS: Sử dụng Google Earth khám phá bản đồ các quốc gia', ai: 'AI: Trợ lý phát âm tên quốc gia chuẩn bản ngữ', lifeSkills: 'KNS: Tôn trọng sự đa dạng văn hóa quốc tế và kết bạn bốn phương' }
  },
  {
    unitNumber: 2,
    unitCode: 'Unit 2',
    theme: 'Time and daily routines',
    title: 'Unit 2: Time and daily routines',
    lesson1Focus: { vocab: ['time', 'o\'clock', 'fifteen', 'thirty', 'forty-five', 'what time'], patterns: ['What time is it? - It is seven fifteen.'], page: 'p.16-17' },
    lesson2Focus: { vocab: ['get up', 'have breakfast', 'go to school', 'have lunch', 'go to bed'], patterns: ['What time do you get up? - I get up at six o\'clock.'], page: 'p.18-19' },
    lesson3Focus: { phonics: 'Sound /cl/ in o\'clock & /th/ in thirty', vocab: ['o\'clock', 'thirty', 'thirteen', 'clock'], patterns: ['Cl, cl, O\'clock. Th, th, Thirty.'], page: 'p.20-21' },
    integratedCV2345: { digital: 'NLS: Sử dụng đồng hồ số tương tác (Interactive Clock App)', ai: 'AI: Lập thời gian biểu hàng ngày thông minh', lifeSkills: 'KNS: Rèn luyện thói quen đúng giờ và quản lý thời gian khoa học' }
  },
  {
    unitNumber: 3,
    unitCode: 'Unit 3',
    theme: 'My week & Daily schedule',
    title: 'Unit 3: My week',
    lesson1Focus: { vocab: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], patterns: ['What day is it today? - It is Monday.'], page: 'p.22-23' },
    lesson2Focus: { vocab: ['study at school', 'listen to music', 'play football', 'go to English club', 'visit grandparents'], patterns: ['What do you do on Mondays? - I study at school.'], page: 'p.24-25' },
    lesson3Focus: { phonics: 'Sound /d/ in day & /s/ in Sunday', vocab: ['day', 'Sunday', 'Saturday', 'today'], patterns: ['D, d, Day. S, s, Sunday.'], page: 'p.26-27' },
    integratedCV2345: { digital: 'NLS: Tạo lịch biểu tuần học tập trên Google Calendar', ai: 'AI: Tự động nhắc nhở các nhiệm vụ học tập trong tuần', lifeSkills: 'KNS: Cân đối giữa thời gian học tập và vui chơi giải trí' }
  },
  {
    unitNumber: 4,
    unitCode: 'Unit 4',
    theme: 'My birthday & Months',
    title: 'Unit 4: My birthday',
    lesson1Focus: { vocab: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], patterns: ['When is your birthday? - It is in May.'], page: 'p.28-29' },
    lesson2Focus: { vocab: ['birthday party', 'chips', 'sweets', 'lemonade', 'orange juice', 'want'], patterns: ['What do you want to eat? - I want some chips.'], page: 'p.30-31' },
    lesson3Focus: { phonics: 'Sound /m/ in March & /dʒ/ in June', vocab: ['March', 'May', 'June', 'July'], patterns: ['M, m, March. J, j, June.'], page: 'p.32-33' },
    integratedCV2345: { digital: 'NLS: Thiết kế thiệp chúc mừng sinh nhật số trên Canva', ai: 'AI: Tạo lời chúc sinh nhật tiếng Anh sáng tạo', lifeSkills: 'KNS: Biết ơn cha mẹ trong ngày sinh nhật và quan tâm bạn bè' }
  },
  {
    unitNumber: 5,
    unitCode: 'Unit 5',
    theme: 'Things we can do & Abilities',
    title: 'Unit 5: Things we can do',
    lesson1Focus: { vocab: ['swim', 'ride a bike', 'play the guitar', 'play the piano', 'cook', 'can'], patterns: ['Can you swim? - Yes, I can. / No, I can\'t.'], page: 'p.34-35' },
    lesson2Focus: { vocab: ['skate', 'sing English songs', 'dance', 'draw', 'what can you do'], patterns: ['What can you do? - I can play the guitar.'], page: 'p.36-37' },
    lesson3Focus: { phonics: 'Sound /sw/ in swim & /sk/ in skate', vocab: ['swim', 'swimming', 'skate', 'skating'], patterns: ['Sw, sw, Swim. Sk, sk, Skate.'], page: 'p.38-39' },
    integratedCV2345: { digital: 'NLS: Ghi hình video ngắn thuyết trình tài năng của bản thân', ai: 'AI: Nhận diện năng khiếu và gợi ý khóa học năng khiếu', lifeSkills: 'KNS: Tự tin thể hiện bản thân và rèn luyện kỹ năng mới' }
  },
  {
    unitNumber: 6,
    unitCode: 'Unit 6',
    theme: 'Our school facilities & Buildings',
    title: 'Unit 6: Our school facilities',
    lesson1Focus: { vocab: ['mountains', 'city', 'village', 'town', 'school', 'where is'], patterns: ['Where is your school? - It is in the mountains.'], page: 'p.44-45' },
    lesson2Focus: { vocab: ['building', 'playground', 'computer room', 'garden', 'how many'], patterns: ['How many buildings are there? - There are three buildings.'], page: 'p.46-47' },
    lesson3Focus: { phonics: 'Sound /v/ in village & /m/ in mountains', vocab: ['village', 'view', 'mountains', 'music'], patterns: ['V, v, Village. M, m, Mountains.'], page: 'p.48-49' },
    integratedCV2345: { digital: 'NLS: Xem mô hình trường học xanh 3D thực tế ảo', ai: 'AI: Mô phỏng không gian trường học thân thiện', lifeSkills: 'KNS: Giữ gìn cảnh quan sư phạm xanh - sạch - đẹp' }
  },
  {
    unitNumber: 7,
    unitCode: 'Unit 7',
    theme: 'Our timetables & School subjects',
    title: 'Unit 7: Our timetables',
    lesson1Focus: { vocab: ['Maths', 'Vietnamese', 'English', 'Science', 'Music', 'Art', 'PE', 'IT'], patterns: ['What subjects do you have today? - I have Maths and English.'], page: 'p.50-51' },
    lesson2Focus: { vocab: ['History', 'Geography', 'when do you have', 'on Mondays'], patterns: ['When do you have English? - I have it on Mondays and Wednesdays.'], page: 'p.52-53' },
    lesson3Focus: { phonics: 'Sound /s/ in Science & /m/ in Maths', vocab: ['Science', 'subject', 'Maths', 'Music'], patterns: ['Sc, sc, Science. M, m, Maths.'], page: 'p.54-55' },
    integratedCV2345: { digital: 'NLS: Sử dụng ứng dụng thời khóa biểu điện tử trên lớp', ai: 'AI: Gợi ý phương pháp học thông minh từng môn học', lifeSkills: 'KNS: Chuẩn bị sách vở đầy đủ theo đúng thời khóa biểu' }
  },
  {
    unitNumber: 8,
    unitCode: 'Unit 8',
    theme: 'My favourite subjects & Reasons',
    title: 'Unit 8: My favourite subjects',
    lesson1Focus: { vocab: ['favourite subject', 'Art', 'Music', 'PE', 'English', 'Maths'], patterns: ['What is your favourite subject? - It is Art.'], page: 'p.56-57' },
    lesson2Focus: { vocab: ['drawing', 'painting', 'singing', 'playing sports', 'why do you like', 'because'], patterns: ['Why do you like Art? - Because I like drawing pictures.'], page: 'p.58-59' },
    lesson3Focus: { phonics: 'Sound /f/ in favourite & /b/ in because', vocab: ['favourite', 'fun', 'because', 'book'], patterns: ['F, f, Favourite. B, b, Because.'], page: 'p.60-61' },
    integratedCV2345: { digital: 'NLS: Tạo biểu đồ số thống kê môn học yêu thích của lớp', ai: 'AI: Chatbot giải đáp câu hỏi về các môn học', lifeSkills: 'KNS: Phát triển niềm say mê học tập và khám phá tri thức' }
  },
  {
    unitNumber: 9,
    unitCode: 'Unit 9',
    theme: 'Our sports day & Future events',
    title: 'Unit 9: Our sports day',
    lesson1Focus: { vocab: ['sports day', 'May', 'November', 'when is', 'event'], patterns: ['When is your sports day? - It is in November.'], page: 'p.62-63' },
    lesson2Focus: { vocab: ['play football', 'table tennis', 'basketball', 'badminton', 'run', 'going to do'], patterns: ['What are you going to do on sports day? - I am going to play football.'], page: 'p.64-65' },
    lesson3Focus: { phonics: 'Sound /sp/ in sports & /d/ in day', vocab: ['sports', 'spring', 'day', 'dance'], patterns: ['Sp, sp, Sports. D, d, Day.'], page: 'p.66-67' },
    integratedCV2345: { digital: 'NLS: Thiết kế poster ngày hội thể thao trường học', ai: 'AI: Hướng dẫn kỹ thuật vận động an toàn trong thể thao', lifeSkills: 'KNS: Tinh thần thể thao cao thượng, fair-play và rèn luyện thể lực' }
  },
  {
    unitNumber: 10,
    unitCode: 'Unit 10',
    theme: 'Where were you yesterday? & Past actions',
    title: 'Unit 10: Where were you yesterday?',
    lesson1Focus: { vocab: ['yesterday', 'at home', 'at the zoo', 'at school', 'on the beach', 'where were you'], patterns: ['Where were you yesterday? - I was at home.'], page: 'p.68-69' },
    lesson2Focus: { vocab: ['watered the flowers', 'painted a picture', 'played badminton', 'watched TV'], patterns: ['What did you do yesterday? - I watered the flowers in the garden.'], page: 'p.70-71' },
    lesson3Focus: { phonics: 'Sound /w/ in were & /j/ in yesterday', vocab: ['were', 'was', 'yesterday', 'yellow'], patterns: ['W, w, Were. Y, y, Yesterday.'], page: 'p.72-73' },
    integratedCV2345: { digital: 'NLS: Viết nhật ký số hóa về một ngày đã qua', ai: 'AI: Trợ lý ngữ pháp thì quá khứ đơn đơn giản', lifeSkills: 'KNS: Giúp đỡ gia đình việc nhà và sống có trách nhiệm' }
  },
  // Grade 4 Semester 2 (Units 11 - 20)
  {
    unitNumber: 11,
    unitCode: 'Unit 11',
    theme: 'My home & Addresses',
    title: 'Unit 11: My home',
    lesson1Focus: { vocab: ['street', 'flat', 'tower', 'address', 'lane', 'where do you live'], patterns: ['Where do you live? - I live at 52 Ba Trieu Street.'], page: 'p.6-7 (T2)' },
    lesson2Focus: { vocab: ['modern', 'beautiful', 'quiet', 'big', 'what is your house like'], patterns: ['What is your flat like? - It is big and modern.'], page: 'p.8-9 (T2)' },
    lesson3Focus: { phonics: 'Sound /str/ in street & /fl/ in flat', vocab: ['street', 'straight', 'flat', 'floor'], patterns: ['Str, str, Street. Fl, fl, Flat.'], page: 'p.10-11 (T2)' },
    integratedCV2345: { digital: 'NLS: Sử dụng bản đồ số tìm vị trí ngôi nhà', ai: 'AI: Vẽ phối cảnh ngôi nhà tương lai', lifeSkills: 'KNS: Ghi nhớ địa chỉ nhà và số điện thoại liên lạc khẩn cấp' }
  },
  {
    unitNumber: 12,
    unitCode: 'Unit 12',
    theme: 'Jobs & Workplaces',
    title: 'Unit 12: Jobs',
    lesson1Focus: { vocab: ['teacher', 'doctor', 'nurse', 'engineer', 'pilot', 'driver', 'farmer', 'police officer'], patterns: ['What does your father do? - He is an engineer.'], page: 'p.12-13 (T2)' },
    lesson2Focus: { vocab: ['hospital', 'school', 'farm', 'factory', 'where does he work'], patterns: ['Where does he work? - He works in a factory.'], page: 'p.14-15 (T2)' },
    lesson3Focus: { phonics: 'Sound /dʒ/ in job & /w/ in work', vocab: ['job', 'juice', 'work', 'worker'], patterns: ['J, j, Job. W, w, Work.'], page: 'p.16-17 (T2)' },
    integratedCV2345: { digital: 'NLS: Xem phim tư liệu nghề nghiệp trong kỷ nguyên số', ai: 'AI: Mô phỏng công việc của kỹ sư và bác sĩ tương lai', lifeSkills: 'KNS: Trân trọng giá trị lao động và ước mơ nghề nghiệp' }
  },
  {
    unitNumber: 13,
    unitCode: 'Unit 13',
    theme: 'Appearance & Descriptions',
    title: 'Unit 13: Appearance',
    lesson1Focus: { vocab: ['tall', 'short', 'slim', 'strong', 'what does he look like'], patterns: ['What does he look like? - He is tall and slim.'], page: 'p.18-19 (T2)' },
    lesson2Focus: { vocab: ['big eyes', 'round face', 'short hair', 'long hair', 'curly hair'], patterns: ['What does she look like? - She has long hair and big eyes.'], page: 'p.20-21 (T2)' },
    lesson3Focus: { phonics: 'Sound /t/ in tall & /ʃ/ in short', vocab: ['tall', 'ten', 'short', 'shirt'], patterns: ['T, t, Tall. Sh, sh, Short.'], page: 'p.22-23 (T2)' },
    integratedCV2345: { digital: 'NLS: Tạo ảnh chân dung số avatar theo mô tả', ai: 'AI: Nhận diện đặc điểm ngoại hình qua công cụ AI Vision', lifeSkills: 'KNS: Tự hào về vẻ đẹp riêng của bản thân và tôn trọng người khác' }
  },
  {
    unitNumber: 14,
    unitCode: 'Unit 14',
    theme: 'Daily activities & Routines',
    title: 'Unit 14: Daily activities',
    lesson1Focus: { vocab: ['do morning exercise', 'surf the Internet', 'do homework', 'watch TV', 'morning'], patterns: ['What do you do in the morning? - I do morning exercise.'], page: 'p.24-25 (T2)' },
    lesson2Focus: { vocab: ['wash dishes', 'look for information', 'read comic books', 'evening'], patterns: ['What does he do in the evening? - He does his homework.'], page: 'p.26-27 (T2)' },
    lesson3Focus: { phonics: 'Sound /m/ in morning & /v/ in evening', vocab: ['morning', 'match', 'evening', 'event'], patterns: ['M, m, Morning. Ev, ev, Evening.'], page: 'p.28-29 (T2)' },
    integratedCV2345: { digital: 'NLS: Đặt lời nhắc việc học và thể dục trên thiết bị thông minh', ai: 'AI: Theo dõi và tối ưu hóa thời gian sinh hoạt lành mạnh', lifeSkills: 'KNS: Tự giác rèn luyện thân thể và làm bài tập về nhà' }
  },
  {
    unitNumber: 15,
    unitCode: 'Unit 15',
    theme: 'My family\'s weekend',
    title: 'Unit 15: My family\'s weekend',
    lesson1Focus: { vocab: ['visit grandparents', 'go to the cinema', 'go swimming', 'have a picnic', 'weekend'], patterns: ['What does your family do at weekends? - We visit our grandparents.'], page: 'p.30-31 (T2)' },
    lesson2Focus: { vocab: ['go to the park', 'stay at home', 'cook good food', 'where do you go'], patterns: ['Where do you go at weekends? - We go to the cinema.'], page: 'p.32-33 (T2)' },
    lesson3Focus: { phonics: 'Sound /w/ in weekend & /v/ in visit', vocab: ['weekend', 'water', 'visit', 'village'], patterns: ['W, w, Weekend. V, v, Visit.'], page: 'p.34-35 (T2)' },
    integratedCV2345: { digital: 'NLS: Tạo album ảnh số về chuyến đi chơi cuối tuần', ai: 'AI: Gợi ý các địa điểm dã ngoại xanh cho gia đình', lifeSkills: 'KNS: Gắn kết tình cảm gia đình và sẻ chia niềm vui' }
  },
  {
    unitNumber: 16,
    unitCode: 'Unit 16',
    theme: 'Weather & Seasons',
    title: 'Unit 16: Weather',
    lesson1Focus: { vocab: ['sunny', 'rainy', 'windy', 'cloudy', 'stormy', 'foggy', 'snowy', 'warm', 'cold'], patterns: ['What is the weather like today? - It is sunny and warm.'], page: 'p.40-41 (T2)' },
    lesson2Focus: { vocab: ['summer', 'winter', 'spring', 'autumn', 'what is the weather like in'], patterns: ['What is the weather like in summer? - It is hot and sunny.'], page: 'p.42-43 (T2)' },
    lesson3Focus: { phonics: 'Sound /s/ in sunny & /r/ in rainy', vocab: ['sunny', 'summer', 'rainy', 'running'], patterns: ['S, s, Sunny. R, r, Rainy.'], page: 'p.44-45 (T2)' },
    integratedCV2345: { digital: 'NLS: Xem bản tin dự báo thời tiết số trực tuyến', ai: 'AI: Mô phỏng hiện tượng thời tiết 4 mùa', lifeSkills: 'KNS: Chọn trang phục phù hợp với thời tiết để bảo vệ sức khỏe' }
  },
  {
    unitNumber: 17,
    unitCode: 'Unit 17',
    theme: 'In the city & Directions',
    title: 'Unit 17: In the city',
    lesson1Focus: { vocab: ['bakery', 'post office', 'bookshop', 'pharmacy', 'supermarket', 'cinema'], patterns: ['Where is the bookshop? - It is opposite the post office.'], page: 'p.46-47 (T2)' },
    lesson2Focus: { vocab: ['go straight', 'turn left', 'turn right', 'next to', 'between', 'how can I get to'], patterns: ['How can I get to the bakery? - Turn left. It is next to the pharmacy.'], page: 'p.48-49 (T2)' },
    lesson3Focus: { phonics: 'Sound /b/ in bakery & /p/ in post office', vocab: ['bakery', 'bookshop', 'post office', 'pharmacy'], patterns: ['B, b, Bakery. P, p, Post office.'], page: 'p.50-51 (T2)' },
    integratedCV2345: { digital: 'NLS: Thực hành tìm đường đi trên ứng dụng bản đồ số (Google Maps)', ai: 'AI: Hướng dẫn chỉ đường thông minh bằng tiếng Anh', trafficSafety: 'ATGT: Tuân thủ vạch kẻ đường cho người đi bộ và biển chỉ dẫn đường phố' }
  },
  {
    unitNumber: 18,
    unitCode: 'Unit 18',
    theme: 'At the shopping centre & Prices',
    title: 'Unit 18: At the shopping centre',
    lesson1Focus: { vocab: ['T-shirt', 'dress', 'skirt', 'jacket', 'shoes', 'how much is'], patterns: ['How much is this T-shirt? - It is 80,000 dong.'], page: 'p.52-53 (T2)' },
    lesson2Focus: { vocab: ['trousers', 'socks', 'sandals', 'thousand', 'how much are'], patterns: ['How much are these shoes? - They are 150,000 dong.'], page: 'p.54-55 (T2)' },
    lesson3Focus: { phonics: 'Sound /ʃ/ in shirt & /dr/ in dress', vocab: ['shirt', 'shoes', 'dress', 'drawing'], patterns: ['Sh, sh, Shirt. Dr, dr, Dress.'], page: 'p.56-57 (T2)' },
    integratedCV2345: { digital: 'NLS: Mô phỏng mua sắm và thanh toán số tại cửa hàng ảo', ai: 'AI: Tính toán tổng hóa đơn mua sắm nhanh', lifeSkills: 'KNS: Chi tiêu tiền hợp lý, tiết kiệm và kiểm tra tiền thừa cẩn thận' }
  },
  {
    unitNumber: 19,
    unitCode: 'Unit 19',
    theme: 'Special days & Celebrations',
    title: 'Unit 19: Special days',
    lesson1Focus: { vocab: ['Children\'s Day', 'Teachers\' Day', 'Christmas', 'New Year', 'when is'], patterns: ['When is Children\'s Day? - It is on the first of June.'], page: 'p.58-59 (T2)' },
    lesson2Focus: { vocab: ['give flowers', 'sing songs', 'have a party', 'celebrate', 'what do you do on'], patterns: ['What do you do on Teachers\' Day? - We give flowers to our teachers.'], page: 'p.60-61 (T2)' },
    lesson3Focus: { phonics: 'Sound /tʃ/ in Children & /t/ in Teachers', vocab: ['Children', 'chocolate', 'Teachers', 'today'], patterns: ['Ch, ch, Children. T, t, Teachers.'], page: 'p.62-63 (T2)' },
    integratedCV2345: { digital: 'NLS: Xem phóng sự các ngày lễ kỷ niệm trên thế giới', ai: 'AI: Tạo bài thuyết trình về ngày hội truyền thống', lifeSkills: 'KNS: Lòng biết ơn thầy cô và trân trọng ngày lễ thiếu nhi' }
  },
  {
    unitNumber: 20,
    unitCode: 'Unit 20',
    theme: 'At summer camp & Outdoor skills',
    title: 'Unit 20: At summer camp',
    lesson1Focus: { vocab: ['summer camp', 'put up a tent', 'build a campfire', 'play tug of war', 'what are you going to do'], patterns: ['What are you going to do at summer camp? - I am going to put up a tent.'], page: 'p.64-65 (T2)' },
    lesson2Focus: { vocab: ['tell stories', 'sing around the campfire', 'take photos', 'make new friends'], patterns: ['What are they going to do? - They are going to sing around the campfire.'], page: 'p.66-67 (T2)' },
    lesson3Focus: { phonics: 'Sound /k/ in camp & /t/ in tent', vocab: ['camp', 'campfire', 'tent', 'tell'], patterns: ['C, c, Camp. T, t, Tent.'], page: 'p.68-69 (T2)' },
    integratedCV2345: { digital: 'NLS: Tham gia trại hè trực tuyến kết nối bạn bè quốc tế', ai: 'AI: Lập danh sách đồ dùng cắm trại an toàn', lifeSkills: 'KNS: Kỹ năng sinh tồn, dựng lều và an toàn phòng chống cháy nổ' }
  }
];

// =========================================================================
// GRADE 5 - 20 UNITS FULL LIST (GLOBAL SUCCESS - BGD&ĐT & NXBGDVN)
// =========================================================================
export const GRADE_5_UNITS_DATA: UpperGradeUnitDetail[] = [
  {
    unitNumber: 1,
    unitCode: 'Unit 1',
    theme: 'All about me & Addresses',
    title: 'Unit 1: All about me',
    lesson1Focus: { vocab: ['address', 'lane', 'street', 'avenue', 'what is your address'], patterns: ['What is your address? - It is 105 Hoa Binh Lane.'], page: 'p.10-11' },
    lesson2Focus: { vocab: ['quiet village', 'busy town', 'modern city', 'hometown', 'where do you live'], patterns: ['Where do you live? - I live in a quiet village.'], page: 'p.12-13' },
    lesson3Focus: { phonics: 'Word stress on lane, street, avenue', vocab: ['lane', 'street', 'tower', 'avenue'], patterns: ['Stress on first syllable: \'Avenue, \'Village.'], page: 'p.14-15' },
    integratedCV2345: { digital: 'NLS: Tạo hồ sơ học tập cá nhân số hóa (Digital Student Portfolio)', ai: 'AI: Trợ lý sửa lỗi ngữ âm và ngữ điệu câu hỏi địa chỉ', lifeSkills: 'KNS: Giới thiệu bản thân tự tin và giữ an toàn thông tin cá nhân' }
  },
  {
    unitNumber: 2,
    unitCode: 'Unit 2',
    theme: 'Our homes & Living environments',
    title: 'Unit 2: Our homes',
    lesson1Focus: { vocab: ['big', 'busy', 'quiet', 'pretty', 'peaceful', 'what is your city like'], patterns: ['What is your city like? - It is big and busy.'], page: 'p.16-17' },
    lesson2Focus: { vocab: ['tower', 'flat', 'floor', 'grandparents', 'who do you live with'], patterns: ['Who do you live with? - I live with my parents and grandparents.'], page: 'p.18-19' },
    lesson3Focus: { phonics: 'Word stress in \'peaceful & \'busy', vocab: ['peaceful', 'pretty', 'busy', 'crowded'], patterns: ['Word stress: \'Peaceful, \'Crowded.'], page: 'p.20-21' },
    integratedCV2345: { digital: 'NLS: Xem video flycam về các vùng miền quê hương Việt Nam', ai: 'AI: Mô tả nét đẹp địa phương bằng tiếng Anh', lifeSkills: 'KNS: Tình yêu quê hương, đất nước và ý thức bảo vệ môi trường sống' }
  },
  {
    unitNumber: 3,
    unitCode: 'Unit 3',
    theme: 'My foreign friends & Nationalities',
    title: 'Unit 3: My foreign friends',
    lesson1Focus: { vocab: ['Malaysia', 'Malaysian', 'the UK', 'British', 'the USA', 'American', 'where is he from'], patterns: ['Where is he from? - He is from Malaysia.'], page: 'p.22-23' },
    lesson2Focus: { vocab: ['Japan', 'Japanese', 'Australia', 'Australian', 'nationality'], patterns: ['What nationality is she? - She is Japanese.'], page: 'p.24-25' },
    lesson3Focus: { phonics: 'Word stress on \'American & Japa\'nese', vocab: ['American', 'Australian', 'Japanese', 'Vietnamese'], patterns: ['Stress patterns in nationalities.'], page: 'p.26-27' },
    integratedCV2345: { digital: 'NLS: Giao lưu trực tuyến cùng bạn học sinh quốc tế', ai: 'AI: Dịch thuật và tra cứu văn hóa các nước', lifeSkills: 'KNS: Hội nhập quốc tế, tôn trọng bản sắc văn hóa các dân tộc' }
  },
  {
    unitNumber: 4,
    unitCode: 'Unit 4',
    theme: 'Our free-time activities & Hobbies',
    title: 'Unit 4: Our free-time activities',
    lesson1Focus: { vocab: ['surf the Internet', 'clean the house', 'ride a bike in the park', 'do karate', 'free time'], patterns: ['What do you do in your free time? - I surf the Internet.'], page: 'p.28-29' },
    lesson2Focus: { vocab: ['go fishing', 'draw pictures', 'go skating', 'what does he do'], patterns: ['What does he do in his free time? - He goes fishing by the lake.'], page: 'p.30-31' },
    lesson3Focus: { phonics: 'Sentence stress in free-time questions', vocab: ['Internet', 'karate', 'fishing', 'skating'], patterns: ['What do you do in your free time?'], page: 'p.32-33' },
    integratedCV2345: { digital: 'NLS: Sử dụng Internet an toàn, bảo vệ mắt khi dùng máy tính', ai: 'AI: Gợi ý các hoạt động ngoại khóa phát triển tư duy', lifeSkills: 'KNS: Rèn luyện kỹ năng sử dụng mạng xã hội an toàn, lành mạnh' }
  },
  {
    unitNumber: 5,
    unitCode: 'Unit 5',
    theme: 'My future job & Career dreams',
    title: 'Unit 5: My future job',
    lesson1Focus: { vocab: ['astronaut', 'pilot', 'doctor', 'architect', 'writer', 'what would you like to be'], patterns: ['What would you like to be in the future? - I would like to be an architect.'], page: 'p.34-35' },
    lesson2Focus: { vocab: ['design buildings', 'fly planes', 'look after patients', 'write stories', 'why'], patterns: ['Why would you like to be an architect? - Because I\'d like to design houses.'], page: 'p.36-37' },
    lesson3Focus: { phonics: 'Word stress on \'architect & \'astronaut', vocab: ['architect', 'astronaut', 'doctor', 'writer'], patterns: ['Stress on first syllable: \'Architect, \'Astronaut.'], page: 'p.38-39' },
    integratedCV2345: { digital: 'NLS: Khám phá các ngành nghề công nghệ cao qua video thực tế', ai: 'AI: Mô phỏng trải nghiệm nghề nghiệp tương lai', lifeSkills: 'KNS: Nuôi dưỡng ước mơ và nỗ lực học tập để đạt mục tiêu' }
  },
  {
    unitNumber: 6,
    unitCode: 'Unit 6',
    theme: 'Our school festival & Past events',
    title: 'Unit 6: Our school festival',
    lesson1Focus: { vocab: ['school festival', 'sports day', 'book fair', 'music festival', 'when was'], patterns: ['When was the school festival? - It was last weekend.'], page: 'p.44-45' },
    lesson2Focus: { vocab: ['played games', 'sang songs', 'danced', 'bought books', 'what did you do'], patterns: ['What did you do at the festival? - We sang English songs and played games.'], page: 'p.46-47' },
    lesson3Focus: { phonics: 'Pronunciation of past tense ending -ed: /t/, /d/, /ɪd/', vocab: ['played', 'danced', 'painted', 'visited'], patterns: ['Played /d/, Danced /t/, Visited /ɪd/.'], page: 'p.48-49' },
    integratedCV2345: { digital: 'NLS: Làm video recap tổng kết ngày hội trường học', ai: 'AI: Tự động ghép nhạc và hiệu ứng video kỷ niệm', lifeSkills: 'KNS: Tham gia nhiệt tình các hoạt động tập thể và phong trào đoàn đội' }
  },
  {
    unitNumber: 7,
    unitCode: 'Unit 7',
    theme: 'Our favourite school activities',
    title: 'Unit 7: Our favourite school activities',
    lesson1Focus: { vocab: ['science projects', 'reading in library', 'playing sports', 'solving math problems'], patterns: ['What is your favourite school activity? - I like doing science projects.'], page: 'p.50-51' },
    lesson2Focus: { vocab: ['experimenting', 'learning English', 'working in teams', 'why do you like it'], patterns: ['Why do you like doing science projects? - Because it is exciting and creative.'], page: 'p.52-53' },
    lesson3Focus: { phonics: 'Sentence intonation in reason clauses with because', vocab: ['science', 'project', 'creative', 'exciting'], patterns: ['Because I like discovering new things.'], page: 'p.54-55' },
    integratedCV2345: { digital: 'NLS: Thực hiện bài thuyết trình STEM/STEAM số hóa', ai: 'AI: Hỗ trợ tìm kiếm ý tưởng thí nghiệm khoa học vui', lifeSkills: 'KNS: Kỹ năng tư duy phản biện và hợp tác giải quyết vấn đề' }
  },
  {
    unitNumber: 8,
    unitCode: 'Unit 8',
    theme: 'School subjects and timetable & Frequency',
    title: 'Unit 8: School subjects and timetable',
    lesson1Focus: { vocab: ['once a week', 'twice a week', 'three times a week', 'four times a week', 'every school day'], patterns: ['How often do you have English? - I have it four times a week.'], page: 'p.56-57' },
    lesson2Focus: { vocab: ['speak English', 'listen to English stories', 'read English books', 'practise'], patterns: ['How do you practise speaking English? - I speak English with my friends every day.'], page: 'p.58-59' },
    lesson3Focus: { phonics: 'Stress and rhythm in frequency adverbs', vocab: ['once', 'twice', 'three times', 'every day'], patterns: ['How often do you have English?'], page: 'p.60-61' },
    integratedCV2345: { digital: 'NLS: Sử dụng app học tiếng Anh Duolingo / Khan Academy Kids', ai: 'AI: Luyện nói tiếng Anh 1-1 cùng trợ lý AI hàng ngày', lifeSkills: 'KNS: Xây dựng thói quen tự học ngoại ngữ bền bỉ và kiên trì' }
  },
  {
    unitNumber: 9,
    unitCode: 'Unit 9',
    theme: 'Our outdoor activities & Adventures',
    title: 'Unit 9: Our outdoor activities',
    lesson1Focus: { vocab: ['went camping', 'explored the cave', 'took photos', 'swam in the river', 'countryside'], patterns: ['What did you do last weekend? - We went camping in the countryside.'], page: 'p.62-63' },
    lesson2Focus: { vocab: ['had a barbecue', 'climbed the mountain', 'built a campfire', 'did you'], patterns: ['Did you explore the cave? - Yes, we did. / No, we didn\'t.'], page: 'p.64-65' },
    lesson3Focus: { phonics: 'Intonation in Yes/No past questions', vocab: ['camped', 'explored', 'swam', 'climbed'], patterns: ['Did you have a good time? - Yes, we did.'], page: 'p.66-67' },
    integratedCV2345: { digital: 'NLS: Xem bản đồ địa hình số 3D các danh lam thắng cảnh', ai: 'AI: Nhận diện hệ sinh thái thực vật qua camera', lifeSkills: 'KNS: Kỹ năng an toàn khi dã ngoại, phòng chống đuối nước' }
  },
  {
    unitNumber: 10,
    unitCode: 'Unit 10',
    theme: 'Our school trip & Transport',
    title: 'Unit 10: Our school trip',
    lesson1Focus: { vocab: ['Ha Long Bay', 'Phong Nha Cave', 'Ba Dinh Square', 'Cuc Phuong National Park', 'where did you go'], patterns: ['Where did you go on your school trip? - We went to Ha Long Bay.'], page: 'p.68-69' },
    lesson2Focus: { vocab: ['coach', 'train', 'boat', 'plane', 'underground', 'how did you get there'], patterns: ['How did you get there? - We went by coach.'], page: 'p.70-71' },
    lesson3Focus: { phonics: 'Stress in compound nouns (Ha Long Bay, Phong Nha Cave)', vocab: ['coach', 'train', 'boat', 'plane'], patterns: ['How did you get there? - By coach.'], page: 'p.72-73' },
    integratedCV2345: { digital: 'NLS: Tìm hiểu di sản thiên nhiên thế giới qua thư viện số', ai: 'AI: Hướng dẫn viên ảo giới thiệu vịnh Hạ Long', trafficSafety: 'ATGT: Tuân thủ quy định an toàn khi ngồi trên ô tô và tàu thuyền' }
  },
  // Grade 5 Semester 2 (Units 11 - 20)
  {
    unitNumber: 11,
    unitCode: 'Unit 11',
    theme: 'Family time & Evening routines',
    title: 'Unit 11: Family time',
    lesson1Focus: { vocab: ['have dinner together', 'watch a movie', 'talk about our day', 'play board games'], patterns: ['What does your family do in the evening? - We have dinner and talk together.'], page: 'p.6-7 (T2)' },
    lesson2Focus: { vocab: ['cook dinner', 'clean the kitchen', 'read books', 'listen to music'], patterns: ['What does your mother do after dinner? - She cleans the kitchen.'], page: 'p.8-9 (T2)' },
    lesson3Focus: { phonics: 'Sentence stress in daily routines', vocab: ['dinner', 'movie', 'together', 'evening'], patterns: ['We have dinner together every evening.'], page: 'p.10-11 (T2)' },
    integratedCV2345: { digital: 'NLS: Tạo sổ tay điện tử ghi lại công thức nấu ăn của mẹ', ai: 'AI: Đề xuất trò chơi board game gia đình thú vị', lifeSkills: 'KNS: Chia sẻ việc nhà, chăm sóc và thấu hiểu người thân' }
  },
  {
    unitNumber: 12,
    unitCode: 'Unit 12',
    theme: 'Our favourite food and drink & Quantities',
    title: 'Unit 12: Our favourite food and drink',
    lesson1Focus: { vocab: ['glass of milk', 'bottle of water', 'bowl of rice', 'bar of chocolate', 'how much'], patterns: ['How much milk do you drink every day? - I drink two glasses of milk.'], page: 'p.12-13 (T2)' },
    lesson2Focus: { vocab: ['apple', 'orange', 'banana', 'sausage', 'how many', 'eat'], patterns: ['How many apples do you eat every day? - I eat two apples.'], page: 'p.14-15 (T2)' },
    lesson3Focus: { phonics: 'Intonation in quantity questions (How much / How many)', vocab: ['bottle', 'glass', 'bowl', 'packet'], patterns: ['How much water do you drink every day?'], page: 'p.16-17 (T2)' },
    integratedCV2345: { digital: 'NLS: Sử dụng ứng dụng tính lượng calo và nước uống cần thiết mỗi ngày', ai: 'AI: Phân tích khẩu phần ăn cân đối cho học sinh', lifeSkills: 'KNS: Ăn uống điều độ, uống đủ nước và hạn chế đồ ngọt' }
  },
  {
    unitNumber: 13,
    unitCode: 'Unit 13',
    theme: 'Health and illnesses & Medical advice',
    title: 'Unit 13: Health and illnesses',
    lesson1Focus: { vocab: ['toothache', 'headache', 'stomach ache', 'sore throat', 'fever', 'cough', 'matter'], patterns: ['What is the matter with you? - I have a sore throat.'], page: 'p.18-19 (T2)' },
    lesson2Focus: { vocab: ['see a doctor', 'go to the dentist', 'take a rest', 'take some medicine', 'should'], patterns: ['You should take a rest and drink warm water.', 'You shouldn\'t eat ice cream.'], page: 'p.20-21 (T2)' },
    lesson3Focus: { phonics: 'Pronunciation of illness words (-ache /eɪk/)', vocab: ['headache', 'toothache', 'stomach ache', 'backache'], patterns: ['Ache sounds like /eɪk/.'], page: 'p.22-23 (T2)' },
    integratedCV2345: { digital: 'NLS: Tra cứu thông tin sức khỏe trẻ em trên cổng thông tin Y tế số', ai: 'AI: Trợ lý hỏi đáp sơ cứu cơ bản', lifeSkills: 'KNS: Chăm sóc sức khỏe bản thân khi bị ốm, giữ gìn răng miệng' }
  },
  {
    unitNumber: 14,
    unitCode: 'Unit 14',
    theme: 'Safety at home and school & Accident prevention',
    title: 'Unit 14: Safety at home and school',
    lesson1Focus: { vocab: ['ride bike too fast', 'play with matches', 'touch the stove', 'run down the stairs', 'don\'t'], patterns: ['Don\'t play with matches! - OK, I won\'t.'], page: 'p.24-25 (T2)' },
    lesson2Focus: { vocab: ['cut yourself', 'burn yourself', 'fall off your bike', 'break your arm', 'why shouldn\'t I'], patterns: ['Why shouldn\'t I run down the stairs? - Because you may fall and break your leg.'], page: 'p.26-27 (T2)' },
    lesson3Focus: { phonics: 'Imperative sentence intonation (Don\'t...!)', vocab: ['matches', 'stove', 'knife', 'stairs'], patterns: ['Don\'t ride your bike too fast!'], page: 'p.28-29 (T2)' },
    integratedCV2345: { digital: 'NLS: Tương tác kịch bản tình huống an toàn trên phần mềm mô phỏng', ai: 'AI: Nhận diện nguy cơ mất an toàn tại nhà qua ảnh', lifeSkills: 'KNS: Phòng tránh tai nạn thương tích, an toàn điện nước và phòng cháy chữa cháy' }
  },
  {
    unitNumber: 15,
    unitCode: 'Unit 15',
    theme: 'Music and arts & Genres',
    title: 'Unit 15: Music and arts',
    lesson1Focus: { vocab: ['pop music', 'classical music', 'folk music', 'jazz', 'what kind of music'], patterns: ['What kind of music do you like? - I like folk music.'], page: 'p.30-31 (T2)' },
    lesson2Focus: { vocab: ['musician', 'painter', 'singer', 'concert', 'exhibition', 'who is your favourite'], patterns: ['Who is your favourite singer? - My favourite singer is My Tam.'], page: 'p.32-33 (T2)' },
    lesson3Focus: { phonics: 'Word stress in music genres (\'Classical, \'Folk music)', vocab: ['classical', 'folk music', 'concert', 'musician'], patterns: ['Stress on first syllable: \'Classical, \'Singer.'], page: 'p.34-35 (T2)' },
    integratedCV2345: { digital: 'NLS: Thưởng thức dàn nhạc giao hưởng số trên YouTube Edu', ai: 'AI: Sáng tác giai điệu nhạc thiếu nhi với AI Music Generator', lifeSkills: 'KNS: Cảm thụ cái đẹp trong nghệ thuật, bồi dưỡng tâm hồn trong sáng' }
  },
  {
    unitNumber: 16,
    unitCode: 'Unit 16',
    theme: 'Seasons and weather & Forecasts',
    title: 'Unit 16: Seasons and weather',
    lesson1Focus: { vocab: ['summer', 'winter', 'spring', 'autumn', 'hot', 'cold', 'rainy', 'warm', 'dry'], patterns: ['What is the weather like in winter? - It is cold and dry.'], page: 'p.40-41 (T2)' },
    lesson2Focus: { vocab: ['tomorrow', 'weather forecast', 'degrees', 'sunny and warm', 'what will the weather be'], patterns: ['What will the weather be like tomorrow? - It will be sunny and warm.'], page: 'p.42-43 (T2)' },
    lesson3Focus: { phonics: 'Intonation in future prediction questions', vocab: ['tomorrow', 'forecast', 'degree', 'weather'], patterns: ['What will the weather be like tomorrow?'], page: 'p.44-45 (T2)' },
    integratedCV2345: { digital: 'NLS: Đọc thông số nhiệt độ và độ ẩm trên vệ tinh thời tiết', ai: 'AI: Dự đoán xu hướng biến đổi khí hậu', lifeSkills: 'KNS: Thích ứng với thời tiết cực đoan, bảo vệ môi trường chống nóng lên toàn cầu' }
  },
  {
    unitNumber: 17,
    unitCode: 'Unit 17',
    theme: 'Stories for children & Moral lessons',
    title: 'Unit 17: Stories for children',
    lesson1Focus: { vocab: ['The Fox and the Crow', 'The Story of Mai An Tiem', 'Aladdin', 'Snow White', 'what happened'], patterns: ['What happened in the story? - First, the crow had some meat. Then, the fox came.'], page: 'p.46-47 (T2)' },
    lesson2Focus: { vocab: ['clever', 'hard-working', 'greedy', 'kind', 'brave', 'what do you think of'], patterns: ['What do you think of An Tiem? - I think he is hard-working and clever.'], page: 'p.48-49 (T2)' },
    lesson3Focus: { phonics: 'Linking words in storytelling (First, Then, Next, In the end)', vocab: ['first', 'then', 'next', 'in the end'], patterns: ['Sequencing words in a story.'], page: 'p.50-51 (T2)' },
    integratedCV2345: { digital: 'NLS: Đọc truyện tranh tương tác trên kho sách điện tử', ai: 'AI: Kể chuyện cổ tích bằng giọng đọc truyền cảm', lifeSkills: 'KNS: Rút ra bài học nhân văn về lòng trung thực, chăm chỉ và nhân ái' }
  },
  {
    unitNumber: 18,
    unitCode: 'Unit 18',
    theme: 'Means of transport & Commuting',
    title: 'Unit 18: Means of transport',
    lesson1Focus: { vocab: ['railway station', 'airport', 'bus stop', 'ferry', 'underground', 'how can I get to'], patterns: ['How can I get to the railway station? - You can take a bus.'], page: 'p.52-53 (T2)' },
    lesson2Focus: { vocab: ['minutes', 'hours', 'how long does it take', 'takes twenty minutes'], patterns: ['How long does it take to get there? - It takes about fifteen minutes.'], page: 'p.54-55 (T2)' },
    lesson3Focus: { phonics: 'Rhythm in asking and answering about travel time', vocab: ['station', 'airport', 'minutes', 'hours'], patterns: ['It takes about twenty minutes.'], page: 'p.56-57 (T2)' },
    integratedCV2345: { digital: 'NLS: Tra cứu lịch trình xe buýt thông minh (BusMap App)', ai: 'AI: Tìm lộ trình di chuyển nhanh nhất và tiết kiệm năng lượng', trafficSafety: 'ATGT: Văn hóa đi xe buýt công cộng, nhường ghế cho người già và phụ nữ mang thai' }
  },
  {
    unitNumber: 19,
    unitCode: 'Unit 19',
    theme: 'Places of interest & Landscapes',
    title: 'Unit 19: Places of interest',
    lesson1Focus: { vocab: ['Trang An', 'Bai Dinh Pagoda', 'Ben Thanh Market', 'Dam Sen Park', 'which place would you like to visit'], patterns: ['Which place would you like to visit? - I would like to visit Trang An.'], page: 'p.58-59 (T2)' },
    lesson2Focus: { vocab: ['peaceful', 'beautiful', 'more expected', 'attractive', 'what do you think of it'], patterns: ['What do you think of Trang An? - It is more beautiful than I expected.'], page: 'p.60-61 (T2)' },
    lesson3Focus: { phonics: 'Comparative adjective stress (\'More beautiful, \'More peaceful)', vocab: ['beautiful', 'peaceful', 'expected', 'attractive'], patterns: ['It is more beautiful than I expected.'], page: 'p.62-63 (T2)' },
    integratedCV2345: { digital: 'NLS: Du lịch thực tế ảo 3D Di sản Văn hóa & Thiên nhiên thế giới Tràng An', ai: 'AI: Thuyết minh giới thiệu danh lam thắng cảnh', lifeSkills: 'KNS: Tự hào về danh lam thắng cảnh Việt Nam, có ý thức giữ gìn di tích' }
  },
  {
    unitNumber: 20,
    unitCode: 'Unit 20',
    theme: 'Our summer holidays & Plans',
    title: 'Unit 20: Our summer holidays',
    lesson1Focus: { vocab: ['Phu Quoc Island', 'Nha Trang', 'Da Nang', 'Sa Pa', 'where are you going this summer'], patterns: ['Where are you going this summer? - I am going to Phu Quoc Island.'], page: 'p.64-65 (T2)' },
    lesson2Focus: { vocab: ['swim in the sea', 'build sandcastles', 'eat delicious seafood', 'visit islands', 'what are you going to do'], patterns: ['What are you going to do there? - I am going to swim in the sea and build sandcastles.'], page: 'p.66-67 (T2)' },
    lesson3Focus: { phonics: 'Intonation in summer holiday plans questions and answers', vocab: ['holiday', 'island', 'seafood', 'sandcastle'], patterns: ['Where are you going this summer?'], page: 'p.68-69 (T2)' },
    integratedCV2345: { digital: 'NLS: Lập kế hoạch du lịch hè số hóa cùng gia đình', ai: 'AI: Gợi ý các địa điểm du lịch biển an toàn', lifeSkills: 'KNS: Kỹ năng chuẩn bị hành lý, an toàn khi bơi lội và tự bảo vệ bản thân khi du lịch' }
  }
];

// Build Upper Grade (3, 4, 5) 140-period curriculum (35 weeks x 4 periods)
export function buildUpperGrade35Weeks(gradeNum: 3 | 4 | 5): SubjectCurriculumWeekDetailed[] {
  const gradeLabel = `Lớp ${gradeNum}`;
  const isG3 = gradeNum === 3;
  const isG4 = gradeNum === 4;
  const isG5 = gradeNum === 5;

  // Starter info per grade based on taphuan.nxbgd.vn
  let starterA = { name: 'Part A: Numbers', desc: 'Đếm số, nhận biết chữ số & số lượng 1-10', vocab: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'], pattern: 'How old are you? - I am eight years old.' };
  let starterB = { name: 'Part B: The alphabet', desc: '26 chữ cái tiếng Anh, phát âm phonics, bài hát The ABC song', vocab: ['alphabet A-Z', 'sound /æ/', 'sound /b/'], pattern: 'How do you spell your name? - [Letters].' };
  let starterC = { name: 'Part C: Fun time', desc: 'Khẩu lệnh lớp học Classroom language & Trò chơi tương tác', vocab: ['stand up', 'sit down', 'listen', 'look', 'open book', 'close book'], pattern: 'Stand up, please. / Open your book, please.' };

  if (isG4) {
    starterA = { name: 'Part A: Hello again', desc: 'Chào hỏi, gặp lại bạn bè thầy cô đầu năm học mới', vocab: ['hello again', 'welcome', 'nice to meet you', 'classmate', 'grade 4'], pattern: 'Nice to see you again! - Nice to see you, too.' };
    starterB = { name: 'Part B: Classroom activities', desc: 'Các hoạt động và khẩu lệnh trong lớp học tiếng Anh', vocab: ['work in pairs', 'work in groups', 'ask a question', 'answer', 'read aloud'], pattern: 'May I ask a question? - Yes, you may.' };
    starterC = { name: 'Part C: Outdoor activities', desc: 'Các hoạt động ngoài trời và trò chơi vận động', vocab: ['play football', 'skip', 'run', 'ride a bike', 'playground'], pattern: 'Let\'s play in the playground!' };
  } else if (isG5) {
    starterA = { name: 'Part A: Back to school', desc: 'Trở lại trường học, chào hỏi bạn bè thầy cô sau kỳ nghỉ hè', vocab: ['welcome back', 'Grade 5', 'school year', 'excited', 'primary school'], pattern: 'Welcome back to Grade 5! - We are happy to see you.' };
    starterB = { name: 'Part B: Last summer', desc: 'Kỳ nghỉ hè vừa qua, chia sẻ các chuyến đi và hoạt động hè', vocab: ['summer holiday', 'went to', 'visited', 'seaside', 'hometown', 'beach'], pattern: 'Where did you go in the summer? - I went to my hometown.' };
    starterC = { name: 'Part C: Classroom instructions', desc: 'Khẩu lệnh lớp học, nội quy & kỹ năng học tập trực tuyến', vocab: ['online learning', 'raise hand', 'mute', 'unmute', 'share idea', 'project'], pattern: 'Please raise your hand to speak.' };
  }

  const weeks: SubjectCurriculumWeekDetailed[] = [];
  const unitsData = isG3 ? GRADE_3_UNITS_DATA : isG4 ? GRADE_4_UNITS_DATA : GRADE_5_UNITS_DATA;

  let globalPeriod = 0;

  for (let w = 1; w <= 35; w++) {
    const semester: 1 | 2 = w <= 18 ? 1 : 2;
    let unitCode = '';
    let theme = '';
    let lessonTitle = '';
    let keyKnowledge = '';
    let vocab: string[] = [];
    let patterns: string[] = [];
    let pageRange = '';
    const periods: CurriculumPeriod[] = [];

    // Week 1: Tiết 1 Làm quen sách, Tiết 2-4: Starter Parts A, B, C (4 periods)
    if (w === 1) {
      unitCode = 'Starter';
      theme = 'Làm quen SGK & Phần Starter';
      lessonTitle = `Tuần 1: Làm quen sách & Starter (${starterA.name}, ${starterB.name}, ${starterC.name})`;
      keyKnowledge = `Làm quen bộ SGK Tiếng Anh ${gradeNum} Global Success, tài liệu taphuan.nxbgd.vn, hoclieu.vn, sachmem.vn và củng cố kiến thức nền tảng trong phần Starter.`;
      vocab = [...starterA.vocab, ...starterB.vocab, ...starterC.vocab];
      patterns = [starterA.pattern, starterB.pattern, starterC.pattern];
      pageRange = `SGK Tiếng Anh ${gradeNum} - Trang 6-9`;

      // Tiết 1: Làm quen sách
      globalPeriod++;
      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        lessonPart: `Làm quen sách: Chương trình và SGK Tiếng Anh ${gradeNum} & Tài liệu bổ trợ trực tuyến`,
        scope: 'Khám phá SGK Global Success, kho học liệu hoclieu.vn, taphuan.nxbgd.vn, sachmem.vn',
        keyFocus: `Tìm hiểu cấu trúc 20 Units, các nhân vật đồng hành và phương pháp học tiếng Anh lớp ${gradeNum}.`,
        pageRange: `SGK Tiếng Anh ${gradeNum}, Trang 6`,
        suggestedActivity: 'Giới thiệu tổng quan SGK, trải nghiệm đăng nhập kho học liệu số hoclieu.vn, quy định học tập.'
      });

      // Tiết 2: Starter Part A
      globalPeriod++;
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        lessonPart: `Phần Starter - ${starterA.name}`,
        scope: starterA.desc,
        keyFocus: `Ôn tập và phản xạ với chủ điểm ${starterA.name}: ${starterA.vocab.slice(0, 5).join(', ')}.`,
        pageRange: `SGK Tiếng Anh ${gradeNum}, Trang 7`,
        suggestedActivity: 'Trò chơi "Number Relay Race", "Speed Greeting", luyện đối thoại mẫu câu theo cặp.'
      });

      // Tiết 3: Starter Part B
      globalPeriod++;
      periods.push({
        periodNumber: 3,
        periodLabel: 'Tiết 3',
        lessonPart: `Phần Starter - ${starterB.name}`,
        scope: starterB.desc,
        keyFocus: `Thực hành phát âm chuẩn bảng chữ cái/khẩu lệnh học tập và vận dụng mẫu câu giao tiếp.`,
        pageRange: `SGK Tiếng Anh ${gradeNum}, Trang 8`,
        suggestedActivity: 'Hát "The ABC Song" sôi động, trò chơi "Alphabet Twister" & "Phonics Buzzer".'
      });

      // Tiết 4: Starter Part C
      globalPeriod++;
      periods.push({
        periodNumber: 4,
        periodLabel: 'Tiết 4',
        lessonPart: `Phần Starter - ${starterC.name}`,
        scope: starterC.desc,
        keyFocus: `Rèn luyện phản xạ nhanh với các hoạt động tương tác, trò chơi ngôn ngữ và khẩu lệnh lớp học.`,
        pageRange: `SGK Tiếng Anh ${gradeNum}, Trang 9`,
        suggestedActivity: 'Trò chơi vận động "Simon Says", "Mystery Box", gắn kết tinh thần đồng đội đầu năm.'
      });
    }
    // Week 17: Review 1 & Short Story 1 (4 periods)
    else if (w === 17) {
      unitCode = 'Review 1';
      theme = 'Ôn tập Học kỳ 1 & Short Story 1';
      lessonTitle = 'Review 1 & Short Story 1 (Units 1 - 5 & Units 6 - 10)';
      keyKnowledge = 'Hệ thống hóa toàn bộ từ vựng, ngữ pháp, ngữ âm trọng tâm 10 Units Học kỳ 1; đọc hiểu truyện ngắn Short Story 1.';
      vocab = ['Consolidation of Units 1 - 10'];
      patterns = ['All Semester 1 sentence patterns'];
      pageRange = `SGK Tiếng Anh ${gradeNum} - Trang 70-73 (T1)`;

      for (let p = 1; p <= 4; p++) {
        globalPeriod++;
        let partName = '';
        let actScope = '';
        let pTitle = '';
        if (p === 1) {
          partName = 'Review 1 - Tiết 1: Listening & Phonics Mastery';
          actScope = 'Hoạt động 1, 2: Listen and tick, Listen and number';
          pTitle = 'Review 1: Listening & Phonics';
        } else if (p === 2) {
          partName = 'Review 1 - Tiết 2: Reading & Writing Consolidation';
          actScope = 'Hoạt động 3, 4: Read and match, Look and write';
          pTitle = 'Review 1: Reading & Writing';
        } else if (p === 3) {
          partName = 'Review 1 - Tiết 3: Speaking Stations & Board Games';
          actScope = 'Hoạt động 5: Ask and answer, Communicative Board Game';
          pTitle = 'Review 1: Speaking Stations';
        } else {
          partName = 'Review 1 - Tiết 4: Short Story 1 & Extension Project';
          actScope = 'Short Story 1: Read the story, Role-play and Mini Drama';
          pTitle = 'Review 1: Short Story 1 & Project';
        }

        periods.push({
          periodNumber: p,
          periodLabel: `Tiết ${p}`,
          unitCode: 'Review 1',
          unitTitle: 'Review 1 & Short Story 1',
          lessonTitle: pTitle,
          theme: 'Ôn tập Học kỳ 1 & Short Story 1',
          lessonPart: partName,
          scope: actScope,
          keyFocus: `Củng cố năng lực ngôn ngữ toàn diện chuẩn bị cho kiểm tra định kỳ Học kỳ 1.`,
          pageRange: `SGK Trang 70-${70 + p - 1}`,
          suggestedActivity: 'Trò chơi trắc nghiệm Quizizz/Kahoot, phỏng vấn theo cặp, diễn kịch ngắn phân vai.',
          vocab: ['review', 'listen', 'read', 'write', 'speak'],
          patterns: ['Review of all Semester 1 patterns']
        });
      }
    }
    // Week 18: Ôn tập & Kiểm tra Định kỳ HK1 (4 periods)
    else if (w === 18) {
      unitCode = 'Assessment 1';
      theme = 'Đánh giá định kỳ Học kỳ 1';
      lessonTitle = 'Ôn tập Tổng hợp & Kiểm tra Định kỳ Học kỳ 1';
      keyKnowledge = 'Đánh giá năng lực 4 kỹ năng Nghe - Nói - Đọc - Viết cuối Học kỳ 1 theo Thông tư 27/2020/TT-BGDĐT.';
      vocab = ['Toàn bộ từ vựng HK1'];
      patterns = ['Toàn bộ cấu trúc câu HK1'];
      pageRange = 'Đề kiểm tra định kỳ Học kỳ 1 chuẩn Bộ GD&ĐT';

      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Assessment 1',
        unitTitle: 'Đánh giá định kỳ HK1',
        lessonTitle: 'Ôn tập trọng tâm & Luyện kỹ năng làm bài kiểm tra HK1',
        theme: 'Đánh giá định kỳ Học kỳ 1',
        lessonPart: 'Ôn tập trọng tâm & Luyện kỹ năng làm bài kiểm tra HK1',
        scope: 'Hướng dẫn chiến thuật làm bài nghe, phân biệt bẫy âm và mẹo hoàn thành câu',
        keyFocus: 'Rèn luyện kỹ năng phòng thi, tâm lý tự tin và củng cố kiến thức trọng tâm.',
        pageRange: 'Tài liệu ôn tập HK1',
        suggestedActivity: 'Chữa bài tập mẫu, phân tích lỗi sai thường gặp cùng giáo viên.',
        vocab: ['revision', 'test', 'skills', 'listening', 'reading'],
        patterns: ['Semester 1 key patterns']
      });
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Assessment 1',
        unitTitle: 'Đánh giá định kỳ HK1',
        lessonTitle: 'Kiểm tra Định kỳ HK1: Kỹ năng Nghe (Listening) & Đọc hiểu (Reading)',
        theme: 'Đánh giá định kỳ Học kỳ 1',
        lessonPart: 'Kiểm tra Định kỳ HK1: Kỹ năng Nghe (Listening) & Đọc hiểu (Reading)',
        scope: 'Bài thi trắc nghiệm và điền khuyết kỹ năng Nghe - Đọc (35 phút)',
        keyFocus: 'Đánh giá chuẩn xác mức độ đạt chuẩn kiến thức kỹ năng theo ma trận đề thi.',
        pageRange: 'Đề thi chính thức',
        suggestedActivity: 'Học sinh làm bài nghiêm túc theo quy chế kiểm tra định kỳ.',
        vocab: ['listening', 'reading', 'examination'],
        patterns: ['Standard exam tasks']
      });
      periods.push({
        periodNumber: 3,
        periodLabel: 'Tiết 3',
        unitCode: 'Assessment 1',
        unitTitle: 'Đánh giá định kỳ HK1',
        lessonTitle: 'Kiểm tra Định kỳ HK1: Kỹ năng Viết (Writing) & Vấn đáp (Speaking)',
        theme: 'Đánh giá định kỳ Học kỳ 1',
        lessonPart: 'Kiểm tra Định kỳ HK1: Kỹ năng Viết (Writing) & Vấn đáp (Speaking Part 1)',
        scope: 'Bài viết hoàn thành câu và phỏng vấn hỏi - đáp trực tiếp 1-1 với giáo viên',
        keyFocus: 'Đánh giá độ trôi chảy, phát âm chuẩn và phản xạ giao tiếp tiếng Anh tự nhiên.',
        pageRange: 'Phiếu phỏng vấn nói',
        suggestedActivity: 'Phỏng vấn theo trạm trắc nghiệm giao tiếp.',
        vocab: ['writing', 'speaking', 'interview'],
        patterns: ['Oral interview patterns']
      });
      periods.push({
        periodNumber: 4,
        periodLabel: 'Tiết 4',
        unitCode: 'Assessment 1',
        unitTitle: 'Đánh giá định kỳ HK1',
        lessonTitle: 'Sơ kết Học kỳ 1, Nhận xét đánh giá & Hoạt động trải nghiệm tiếng Anh',
        theme: 'Đánh giá định kỳ Học kỳ 1',
        lessonPart: 'Sơ kết Học kỳ 1, Nhận xét đánh giá & Hoạt động trải nghiệm tiếng Anh',
        scope: 'Công bố kết quả, chữa bài, biểu dương học sinh xuất sắc và giao lưu văn nghệ',
        keyFocus: 'Khích lệ tinh thần học tập, hướng dẫn kế hoạch nâng cao trong Học kỳ 2.',
        pageRange: 'Bảng đánh giá cá nhân',
        suggestedActivity: 'Vinh danh học sinh xuất sắc, biểu diễn hát tiếng Anh tập thể.',
        vocab: ['congratulations', 'certificate', 'feedback', 'motivation'],
        patterns: ['Well done!', 'Keep up the good work!']
      });
    }
    // Week 34: Review 2 & Short Story 2 / Review 3 (4 periods)
    else if (w === 34) {
      unitCode = 'Review 2';
      theme = 'Ôn tập Cuối năm & Short Story 2';
      lessonTitle = 'Review 2 & Short Story 2 (Units 11 - 20)';
      keyKnowledge = 'Hệ thống hóa toàn bộ kiến thức 10 Units Học kỳ 2; đọc hiểu Short Story 2 và chuẩn bị kiểm tra cuối năm.';
      vocab = ['Consolidation of Units 11 - 20'];
      patterns = ['All Semester 2 sentence patterns'];
      pageRange = `SGK Tiếng Anh ${gradeNum} - Trang 70-73 (T2)`;

      for (let p = 1; p <= 4; p++) {
        const pTitle = p === 1 ? 'Listening & Phonics' : p === 2 ? 'Reading & Writing' : p === 3 ? 'Speaking Fluency' : 'Short Story 2 & Project';
        periods.push({
          periodNumber: p,
          periodLabel: `Tiết ${p}`,
          unitCode: 'Review 2',
          unitTitle: 'Review 2 & Short Story 2',
          lessonTitle: `Review 2: ${pTitle}`,
          theme: 'Ôn tập Cuối năm & Short Story 2',
          lessonPart: `Review 2 - Tiết ${p}: ${pTitle}`,
          scope: `Hoạt động rèn luyện chuyên sâu 4 kỹ năng Nghe, Nói, Đọc, Viết`,
          keyFocus: `Củng cố vững chắc kiến thức toàn bộ năm học lớp ${gradeNum}.`,
          pageRange: `SGK Trang 70-${70 + p - 1}`,
          suggestedActivity: 'Trò chơi củng cố kiến thức, giải mã ô chữ tiếng Anh, đóng vai kịch ngắn.',
          vocab: ['consolidation', 'skills', 'story', 'fluency'],
          patterns: ['Review of all Semester 2 patterns']
        });
      }
    }
    // Week 35: Ôn tập Tổng kết & Kiểm tra Cuối năm (4 periods)
    else if (w === 35) {
      unitCode = 'Assessment 2';
      theme = 'Đánh giá định kỳ Cuối năm học';
      lessonTitle = 'Kiểm tra định kỳ Cuối năm & Tổng kết năm học, hướng dẫn tự học hè';
      keyKnowledge = 'Đánh giá kết quả học tập toàn diện môn Tiếng Anh cả năm học theo quy định của Bộ GD&ĐT.';
      vocab = ['Toàn bộ từ vựng cả năm'];
      patterns = ['Toàn bộ cấu trúc câu cả năm'];
      pageRange = 'Đề kiểm tra định kỳ Cuối năm học chuẩn Bộ GD&ĐT';

      periods.push({
        periodNumber: 1,
        periodLabel: 'Tiết 1',
        unitCode: 'Assessment 2',
        unitTitle: 'Kiểm tra Cuối năm',
        lessonTitle: 'Ôn tập chiến thuật & Luyện đề thi mẫu Cuối năm',
        theme: 'Đánh giá định kỳ Cuối năm học',
        lessonPart: 'Ôn tập chiến thuật & Luyện đề thi mẫu Cuối năm',
        scope: 'Củng cố các dạng bài trọng tâm, kỹ năng quản lý thời gian làm bài',
        keyFocus: 'Tạo tâm lý tự tin và chuẩn bị chu đáo cho kỳ thi cuối năm.',
        pageRange: 'Đề luyện thi',
        suggestedActivity: 'Thực hành làm bài tập tổng hợp dưới sự hướng dẫn của giáo viên.',
        vocab: ['revision', 'exam', 'preparation'],
        patterns: ['Full year patterns review']
      });
      periods.push({
        periodNumber: 2,
        periodLabel: 'Tiết 2',
        unitCode: 'Assessment 2',
        unitTitle: 'Kiểm tra Cuối năm',
        lessonTitle: 'Kiểm tra Định kỳ Cuối năm: Kỹ năng Nghe (Listening) & Đọc hiểu (Reading)',
        theme: 'Đánh giá định kỳ Cuối năm học',
        lessonPart: 'Kiểm tra Định kỳ Cuối năm: Kỹ năng Nghe (Listening) & Đọc hiểu (Reading)',
        scope: 'Bài kiểm tra chính thức phần Nghe và Đọc theo chuẩn năng lực bậc 1 tiểu học',
        keyFocus: 'Đánh giá chuẩn xác mức độ tiếp thu kiến thức và kỹ năng ngôn ngữ của học sinh.',
        pageRange: 'Đề thi chính thức',
        suggestedActivity: 'Học sinh làm bài thi nghiêm túc theo quy chế.',
        vocab: ['listening test', 'reading test'],
        patterns: ['Standard exam patterns']
      });
      periods.push({
        periodNumber: 3,
        periodLabel: 'Tiết 3',
        unitCode: 'Assessment 2',
        unitTitle: 'Kiểm tra Cuối năm',
        lessonTitle: 'Kiểm tra Định kỳ Cuối năm: Kỹ năng Viết (Writing) & Vấn đáp (Speaking)',
        theme: 'Đánh giá định kỳ Cuối năm học',
        lessonPart: 'Kiểm tra Định kỳ Cuối năm: Kỹ năng Viết (Writing) & Vấn đáp (Speaking)',
        scope: 'Bài kiểm tra phần Viết câu và phỏng vấn giao tiếp trực tiếp với giáo viên',
        keyFocus: 'Đánh giá kỹ năng giao tiếp thực tế và mức độ thành thạo cấu trúc câu.',
        pageRange: 'Phiếu kiểm tra nói',
        suggestedActivity: 'Phỏng vấn giao tiếp theo chủ đề bốc thăm.',
        vocab: ['writing test', 'speaking interview'],
        patterns: ['Oral exam patterns']
      });
      periods.push({
        periodNumber: 4,
        periodLabel: 'Tiết 4',
        unitCode: 'Assessment 2',
        unitTitle: 'Kiểm tra Cuối năm',
        lessonTitle: 'Tổng kết năm học, Trao giải & Hướng dẫn tự học tiếng Anh trong kỳ nghỉ hè',
        theme: 'Đánh giá định kỳ Cuối năm học',
        lessonPart: 'Tổng kết năm học, Trao giải & Hướng dẫn tự học tiếng Anh trong kỳ nghỉ hè',
        scope: 'Tổng kết thành tích, vinh danh học sinh xuất sắc, giới thiệu website tự học hè (hoclieu.vn, sachmem.vn)',
        keyFocus: 'Nuôi dưỡng niềm đam mê học tiếng Anh và định hướng tự học chủ động trong mùa hè.',
        pageRange: 'Tài liệu hướng dẫn tự học hè',
        suggestedActivity: 'Trao chứng nhận "English Star of the Year", xem video giao lưu hè.',
        vocab: ['summer holiday', 'certificate', 'english star', 'self-study'],
        patterns: ['Enjoy your summer vacation!']
      });
    }
    // Normal Weeks: Units 1 to 10 (HK1: Weeks 2 to 16) and Units 11 to 20 (HK2: Weeks 19 to 33)
    else {
      // 10 units in HK1 (Weeks 2-16) -> 1.5 weeks per unit (6 periods per unit = 1.5 weeks x 4 periods = 6 periods)
      // 10 units in HK2 (Weeks 19-33) -> 1.5 weeks per unit (6 periods per unit = 1.5 weeks x 4 periods = 6 periods)
      let unitIdx = 0;
      if (semester === 1) {
        // weeks 2..16 (15 weeks total = 10 units x 6 periods = 60 periods = 15 weeks x 4 periods)
        const periodOffset = (w - 2) * 4; // 0, 4, 8, 12, 16...
        unitIdx = Math.min(9, Math.floor(periodOffset / 6));
      } else {
        // weeks 19..33 (15 weeks total = 10 units x 6 periods = 60 periods = 15 weeks x 4 periods)
        const periodOffset = (w - 19) * 4;
        unitIdx = Math.min(19, 10 + Math.floor(periodOffset / 6));
      }

      const uData = unitsData[unitIdx] || unitsData[0];
      const weekModulo = (semester === 1 ? (w - 2) : (w - 19)) % 3;

      if (weekModulo === 0) {
        // Lesson 1 (Tiết 1, 2) + Lesson 2 (Tiết 1, 2)
        unitCode = uData.unitCode;
        theme = uData.theme;
        lessonTitle = `${uData.unitCode}: ${uData.title.split(': ')[1] || uData.theme} (Lesson 1 & Lesson 2)`;
        keyKnowledge = `Mục tiêu bài học: ${uData.theme}. Từ vựng: ${uData.lesson1Focus.vocab.slice(0, 4).join(', ')}. Mẫu câu: ${uData.lesson1Focus.patterns[0]}`;
        vocab = [...uData.lesson1Focus.vocab, ...uData.lesson2Focus.vocab];
        patterns = [...uData.lesson1Focus.patterns, ...uData.lesson2Focus.patterns];
        pageRange = `SGK ${gradeLabel} - ${uData.lesson1Focus.page} & ${uData.lesson2Focus.page}`;

        periods.push({
          periodNumber: 1,
          periodLabel: 'Tiết 1',
          unitCode: uData.unitCode,
          unitTitle: `${uData.unitCode}: ${uData.theme}`,
          lessonTitle: `${uData.unitCode} - Lesson 1 (HĐ 1, 2, 3)`,
          theme: uData.theme,
          lessonPart: `${uData.unitCode} - Lesson 1: Tiết 1 (HĐ 1, 2, 3)`,
          scope: '1. Look, listen and repeat; 2. Listen, point and say; 3. Let\'s talk',
          keyFocus: `Hình thành từ vựng trọng tâm (${uData.lesson1Focus.vocab.slice(0, 3).join(', ')}) và mẫu câu cơ bản: "${uData.lesson1Focus.patterns[0]}".`,
          pageRange: `SGK ${gradeLabel}, trang ${uData.lesson1Focus.page.split('-')[0]}`,
          suggestedActivity: 'Khai thác tranh ngữ cảnh, mô hình hóa phát âm, luyện tập mẫu câu theo cặp.',
          vocab: uData.lesson1Focus.vocab.slice(0, 3),
          patterns: [uData.lesson1Focus.patterns[0]]
        });
        periods.push({
          periodNumber: 2,
          periodLabel: 'Tiết 2',
          unitCode: uData.unitCode,
          unitTitle: `${uData.unitCode}: ${uData.theme}`,
          lessonTitle: `${uData.unitCode} - Lesson 1 (HĐ 4, 5, 6)`,
          theme: uData.theme,
          lessonPart: `${uData.unitCode} - Lesson 1: Tiết 2 (HĐ 4, 5, 6)`,
          scope: '4. Listen and tick/number; 5. Look, complete and read; 6. Let\'s play / Let\'s sing',
          keyFocus: `Luyện kỹ năng nghe hiểu chọn tranh, hoàn thành câu viết và củng cố qua bài hát/trò chơi.`,
          pageRange: `SGK ${gradeLabel}, trang tiếp theo`,
          suggestedActivity: 'Bài tập nghe trắc nghiệm tương tác, điền từ vào chỗ trống, trò chơi Board Race.',
          vocab: uData.lesson1Focus.vocab.slice(3),
          patterns: [uData.lesson1Focus.patterns[0]]
        });
        periods.push({
          periodNumber: 3,
          periodLabel: 'Tiết 3',
          unitCode: uData.unitCode,
          unitTitle: `${uData.unitCode}: ${uData.theme}`,
          lessonTitle: `${uData.unitCode} - Lesson 2 (HĐ 1, 2, 3)`,
          theme: uData.theme,
          lessonPart: `${uData.unitCode} - Lesson 2: Tiết 1 (HĐ 1, 2, 3)`,
          scope: '1. Look, listen and repeat; 2. Listen, point and say; 3. Let\'s talk',
          keyFocus: `Mở rộng từ vựng (${uData.lesson2Focus.vocab.slice(0, 3).join(', ')}) và mẫu câu hỏi - đáp nâng cao: "${uData.lesson2Focus.patterns[0]}".`,
          pageRange: `SGK ${gradeLabel}, trang ${uData.lesson2Focus.page.split('-')[0]}`,
          suggestedActivity: 'Phân vai hội thoại mở rộng, substitution drill (thay thế từ ngữ), đóng kịch theo cặp.',
          vocab: uData.lesson2Focus.vocab.slice(0, 3),
          patterns: [uData.lesson2Focus.patterns[0]]
        });
        periods.push({
          periodNumber: 4,
          periodLabel: 'Tiết 4',
          unitCode: uData.unitCode,
          unitTitle: `${uData.unitCode}: ${uData.theme}`,
          lessonTitle: `${uData.unitCode} - Lesson 2 (HĐ 4, 5, 6)`,
          theme: uData.theme,
          lessonPart: `${uData.unitCode} - Lesson 2: Tiết 2 (HĐ 4, 5, 6)`,
          scope: '4. Listen and number/tick; 5. Look, complete and read / Read and match; 6. Let\'s play / Let\'s chant',
          keyFocus: `Nghe đánh số thứ tự tranh, đọc nối câu và biểu diễn bài vè chant nhịp điệu.`,
          pageRange: `SGK ${gradeLabel}, trang tiếp theo`,
          suggestedActivity: 'Trò chơi "Whisper Relay", vỗ tay theo bài chant nhịp điệu, chấm bài chéo theo cặp.',
          vocab: uData.lesson2Focus.vocab.slice(3),
          patterns: [uData.lesson2Focus.patterns[0]]
        });
      } else if (weekModulo === 1) {
        // Lesson 3 (Tiết 1, 2) + Unit tiếp theo Lesson 1 (Tiết 1, 2)
        const nextUData = unitsData[unitIdx + 1] || uData;
        unitCode = `${uData.unitCode} & ${nextUData.unitCode}`;
        theme = `${uData.theme} / ${nextUData.theme}`;
        lessonTitle = `${uData.unitCode} (Lesson 3) & ${nextUData.unitCode} (Lesson 1)`;
        keyKnowledge = `Hoàn thiện ${uData.unitCode} (Phonics & Project) và mở đầu ${nextUData.unitCode} (${nextUData.theme}).`;
        vocab = [...uData.lesson3Focus.vocab, ...nextUData.lesson1Focus.vocab];
        patterns = [...uData.lesson3Focus.patterns, ...nextUData.lesson1Focus.patterns];
        pageRange = `SGK ${gradeLabel} - ${uData.lesson3Focus.page} & ${nextUData.lesson1Focus.page}`;

        periods.push({
          periodNumber: 1,
          periodLabel: 'Tiết 1',
          unitCode: uData.unitCode,
          unitTitle: `${uData.unitCode}: ${uData.theme}`,
          lessonTitle: `${uData.unitCode} - Lesson 3 (HĐ 1, 2, 3)`,
          theme: uData.theme,
          lessonPart: `${uData.unitCode} - Lesson 3: Tiết 1 (HĐ 1, 2, 3)`,
          scope: '1. Listen and repeat (Phonics); 2. Listen and circle/chant; 3. Let\'s chant / Let\'s say',
          keyFocus: `Rèn luyện phát âm chuẩn âm ${uData.lesson3Focus.phonics}, nhận biết trọng âm và đọc chuẩn xác bài vè.`,
          pageRange: `SGK ${gradeLabel}, trang ${uData.lesson3Focus.page.split('-')[0]}`,
          suggestedActivity: 'Luyện âm chuẩn quốc tế qua trợ lý AI, thi đọc vè nối tiếp giữa các tổ.',
          vocab: uData.lesson3Focus.vocab,
          patterns: uData.lesson3Focus.patterns
        });
        periods.push({
          periodNumber: 2,
          periodLabel: 'Tiết 2',
          unitCode: uData.unitCode,
          unitTitle: `${uData.unitCode}: ${uData.theme}`,
          lessonTitle: `${uData.unitCode} - Lesson 3 (HĐ 4, 5, 6)`,
          theme: uData.theme,
          lessonPart: `${uData.unitCode} - Lesson 3: Tiết 2 (HĐ 4, 5, 6)`,
          scope: '4. Read and match/complete; 5. Let\'s write; 6. Project',
          keyFocus: `Đọc hiểu đoạn văn ngắn, viết câu hoàn chỉnh và thuyết trình sản phẩm dự án (Project).`,
          pageRange: `SGK ${gradeLabel}, trang cuối Unit`,
          suggestedActivity: 'Thực hiện dự án vẽ tranh/poster, thuyết trình nhóm trước lớp, đánh giá bằng sao.',
          vocab: uData.lesson3Focus.vocab,
          patterns: uData.lesson3Focus.patterns
        });

        // Next Unit's Lesson 1 (Tiết 1, 2)
        periods.push({
          periodNumber: 3,
          periodLabel: 'Tiết 3',
          unitCode: nextUData.unitCode,
          unitTitle: `${nextUData.unitCode}: ${nextUData.theme}`,
          lessonTitle: `${nextUData.unitCode} - Lesson 1 (HĐ 1, 2, 3)`,
          theme: nextUData.theme,
          lessonPart: `${nextUData.unitCode} - Lesson 1: Tiết 1 (HĐ 1, 2, 3)`,
          scope: '1. Look, listen and repeat; 2. Listen, point and say; 3. Let\'s talk',
          keyFocus: `Hình thành từ vựng mới (${nextUData.lesson1Focus.vocab.slice(0, 3).join(', ')}) và mẫu câu cơ bản: "${nextUData.lesson1Focus.patterns[0]}".`,
          pageRange: `SGK ${gradeLabel}, trang ${nextUData.lesson1Focus.page.split('-')[0]}`,
          suggestedActivity: 'Khám phá tình huống bài học mới, luyện phát âm từ khóa, trò chơi Point and Say.',
          vocab: nextUData.lesson1Focus.vocab.slice(0, 3),
          patterns: [nextUData.lesson1Focus.patterns[0]]
        });
        periods.push({
          periodNumber: 4,
          periodLabel: 'Tiết 4',
          unitCode: nextUData.unitCode,
          unitTitle: `${nextUData.unitCode}: ${nextUData.theme}`,
          lessonTitle: `${nextUData.unitCode} - Lesson 1 (HĐ 4, 5, 6)`,
          theme: nextUData.theme,
          lessonPart: `${nextUData.unitCode} - Lesson 1: Tiết 2 (HĐ 4, 5, 6)`,
          scope: '4. Listen and tick/number; 5. Look, complete and read; 6. Let\'s play / Let\'s sing',
          keyFocus: `Luyện nghe chọn đáp án đúng và hát bài hát vui nhộn chủ đề bài học.`,
          pageRange: `SGK ${gradeLabel}, trang tiếp theo`,
          suggestedActivity: 'Nghe audio chọn tranh, hoàn thành câu văn, hát tập thể kết hợp động tác TPR.',
          vocab: nextUData.lesson1Focus.vocab.slice(3),
          patterns: [nextUData.lesson1Focus.patterns[0]]
        });
      } else {
        // Lesson 2 (Tiết 1, 2) + Lesson 3 (Tiết 1, 2)
        const currentU = unitsData[unitIdx] || unitsData[0];
        unitCode = currentU.unitCode;
        theme = currentU.theme;
        lessonTitle = `${currentU.unitCode}: ${currentU.title.split(': ')[1] || currentU.theme} (Lesson 2 & Lesson 3)`;
        keyKnowledge = `Mở rộng từ vựng: ${currentU.lesson2Focus.vocab.slice(0, 3).join(', ')}. Cấu trúc: "${currentU.lesson2Focus.patterns[0]}". Ngữ âm: ${currentU.lesson3Focus.phonics}.`;
        vocab = [...currentU.lesson2Focus.vocab, ...currentU.lesson3Focus.vocab];
        patterns = [...currentU.lesson2Focus.patterns, ...currentU.lesson3Focus.patterns];
        pageRange = `SGK ${gradeLabel} - ${currentU.lesson2Focus.page} & ${currentU.lesson3Focus.page}`;

        periods.push({
          periodNumber: 1,
          periodLabel: 'Tiết 1',
          unitCode: currentU.unitCode,
          unitTitle: `${currentU.unitCode}: ${currentU.theme}`,
          lessonTitle: `${currentU.unitCode} - Lesson 2 (HĐ 1, 2, 3)`,
          theme: currentU.theme,
          lessonPart: `${currentU.unitCode} - Lesson 2: Tiết 1 (HĐ 1, 2, 3)`,
          scope: '1. Look, listen and repeat; 2. Listen, point and say; 3. Let\'s talk',
          keyFocus: `Thực hành giao tiếp với mẫu câu mở rộng: "${currentU.lesson2Focus.patterns[0]}".`,
          pageRange: `SGK ${gradeLabel}, trang ${currentU.lesson2Focus.page.split('-')[0]}`,
          suggestedActivity: 'Phỏng vấn nhanh theo cặp, trò chơi "Find someone who...", sửa lỗi phát âm.',
          vocab: currentU.lesson2Focus.vocab.slice(0, 3),
          patterns: [currentU.lesson2Focus.patterns[0]]
        });
        periods.push({
          periodNumber: 2,
          periodLabel: 'Tiết 2',
          unitCode: currentU.unitCode,
          unitTitle: `${currentU.unitCode}: ${currentU.theme}`,
          lessonTitle: `${currentU.unitCode} - Lesson 2 (HĐ 4, 5, 6)`,
          theme: currentU.theme,
          lessonPart: `${currentU.unitCode} - Lesson 2: Tiết 2 (HĐ 4, 5, 6)`,
          scope: '4. Listen and number/tick; 5. Look, complete and read / Read and match; 6. Let\'s play / Let\'s chant',
          keyFocus: `Rèn luyện kỹ năng nghe hiểu và đọc hiểu nối cặp câu chính xác.`,
          pageRange: `SGK ${gradeLabel}, trang tiếp theo`,
          suggestedActivity: 'Làm bài tập trắc nghiệm số, thi đọc diễn cảm bài chant.',
          vocab: currentU.lesson2Focus.vocab.slice(3),
          patterns: [currentU.lesson2Focus.patterns[0]]
        });
        periods.push({
          periodNumber: 3,
          periodLabel: 'Tiết 3',
          unitCode: currentU.unitCode,
          unitTitle: `${currentU.unitCode}: ${currentU.theme}`,
          lessonTitle: `${currentU.unitCode} - Lesson 3 (HĐ 1, 2, 3)`,
          theme: currentU.theme,
          lessonPart: `${currentU.unitCode} - Lesson 3: Tiết 1 (HĐ 1, 2, 3)`,
          scope: '1. Listen and repeat (Phonics); 2. Listen and circle/chant; 3. Let\'s chant / Let\'s say',
          keyFocus: `Luyện âm phonics (${currentU.lesson3Focus.phonics}), ngữ điệu câu và vần thơ bài học.`,
          pageRange: `SGK ${gradeLabel}, trang ${currentU.lesson3Focus.page.split('-')[0]}`,
          suggestedActivity: 'Luyện phát âm với trợ lý ảo, thi đua đọc vè giữa các tổ.',
          vocab: currentU.lesson3Focus.vocab,
          patterns: currentU.lesson3Focus.patterns
        });
        periods.push({
          periodNumber: 4,
          periodLabel: 'Tiết 4',
          unitCode: currentU.unitCode,
          unitTitle: `${currentU.unitCode}: ${currentU.theme}`,
          lessonTitle: `${currentU.unitCode} - Lesson 3 (HĐ 4, 5, 6)`,
          theme: currentU.theme,
          lessonPart: `${currentU.unitCode} - Lesson 3: Tiết 2 (HĐ 4, 5, 6)`,
          scope: '4. Read and match/complete; 5. Let\'s write; 6. Project',
          keyFocus: `Thực hành kỹ năng viết đoạn văn và hoàn thiện sản phẩm dự án sáng tạo.`,
          pageRange: `SGK ${gradeLabel}, trang cuối Unit`,
          suggestedActivity: 'Triển lãm sản phẩm dự án (Project Gallery Walk), bình chọn sản phẩm xuất sắc.',
          vocab: currentU.lesson3Focus.vocab,
          patterns: currentU.lesson3Focus.patterns
        });
      }
    }

    weeks.push({
      week: w,
      weekLabel: `Tuần ${w}`,
      semester,
      theme,
      unitCode,
      lessonTitle,
      allLessonsInWeek: periods.map(p => `${p.periodLabel}: ${p.lessonPart} (${p.scope})`),
      periodCount: 4,
      sections: ['eng_listen_speak', 'eng_read_write', 'eng_phonics_vocab', 'eng_project_review'],
      periods,
      keyKnowledge,
      keyVocabulary: vocab,
      sentencePatternsOrRules: patterns,
      textbookPageRange: pageRange,
      suggestedGame: {
        name: 'Whisper Relay & Board Race Championship',
        goal: 'Rèn luyện phản xạ phát âm trôi chảy, ngữ điệu tự nhiên, chính tả và tinh thần làm việc nhóm.',
        materials: 'Bút viết bảng, dải băng câu từ vựng, chuông bấm buzzer, bảng phụ.',
        rules: 'Các thành viên thì thầm câu tiếng Anh dọc theo hàng; học sinh cuối hàng chạy lên bảng viết lại chính xác câu và bấm chuông.'
      },
      suggestedMethod: 'PPP (Presentation - Practice - Production), Task-Based Learning (TBL), 4-Skill Integrated Approach, Gamification.',
      suggestedScenario: 'Tình huống giao tiếp thực tế về trường học, gia đình, sở thích, bạn bè quốc tế và cộng đồng.'
    });
  }

  // Enforce exactly 140 periods with sequential PPCT labels (Tiết 1 -> Tiết 140) and single integration activity
  let runningPPCT345 = 0;
  for (const wk of weeks) {
    for (const p of wk.periods) {
      runningPPCT345++;
      p.ppctNumber = runningPPCT345;
      p.periodLabel = `Tiết ${runningPPCT345}`;
      p.singleIntegrationActivity = 'B';
    }
  }

  return weeks;
}

// Main getter for 35-week curriculum
export function getEnglish35Weeks(grade: string): SubjectCurriculumWeekDetailed[] {
  if (grade === 'Lớp 1') return buildGrade1or2Weeks(1);
  if (grade === 'Lớp 2') return buildGrade1or2Weeks(2);
  if (grade === 'Lớp 3') return buildUpperGrade35Weeks(3);
  if (grade === 'Lớp 4') return buildUpperGrade35Weeks(4);
  if (grade === 'Lớp 5') return buildUpperGrade35Weeks(5);
  return buildUpperGrade35Weeks(3);
}
