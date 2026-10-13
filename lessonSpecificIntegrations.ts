// =========================================================================
// HỆ THỐNG DỮ LIỆU TÍCH HỢP ĐẶC THÙ THEO TỪNG BÀI HỌC & TỪNG TIẾT HỌC
// CHUẨN CÔNG VĂN 2345/BGDĐT-GDTH, QĐ 2422 (AI), TT 02/2025 (NLS), TT 32/2018 & CV 3456 (ATGT, KNS)
// TUYỆT ĐỐI KHÔNG RẬP KHUÔN - MỖI BÀI HỌC ĐỀU CÓ NỘI DUNG TÍCH HỢP GẮN CHẶT VỚI CHỦ ĐỀ, TỪ VỰNG, MẪU CÂU
// =========================================================================

export type ActivityScope = 'all' | 'act123' | 'act456';

export interface LessonIntegrationItem {
  aiCode: string;
  aiDesc: string;
  nlsDesc: string;
  atgtDesc: string;
  knsDesc: string;
  ethicsDesc: string;
  devicesDesc: string;
}

export interface UnitIntegrationRule {
  grade: string;
  unitCode: string;
  unitTitle: string;
  theme: string;
  lesson1: {
    act123: LessonIntegrationItem;
    act456: LessonIntegrationItem;
    all: LessonIntegrationItem;
  };
  lesson2?: {
    act123: LessonIntegrationItem;
    act456: LessonIntegrationItem;
    all: LessonIntegrationItem;
  };
  lesson3?: {
    act123: LessonIntegrationItem;
    act456: LessonIntegrationItem;
    all: LessonIntegrationItem;
  };
}

import { G1_SPECIFIC_INTEGRATIONS } from './integrations/grade1Integrations';
import { G2_SPECIFIC_INTEGRATIONS } from './integrations/grade2Integrations';
import { G3_SPECIFIC_INTEGRATIONS } from './integrations/grade3Integrations';
import { G4_SPECIFIC_INTEGRATIONS } from './integrations/grade4Integrations';
import { G5_SPECIFIC_INTEGRATIONS } from './integrations/grade5Integrations';

// Grade-specific Unit metadata dictionary for dynamic high-fidelity generation
const GLOBAL_SUCCESS_UNIT_PROFILES: Record<string, Record<string, {
  title: string;
  theme: string;
  aiFocus: string;
  nlsFocus: string;
  atgtFocus: string;
  knsFocus: string;
  ethicsFocus: string;
}>> = {
  'Grade 1': {
    'Unit 1': { title: 'In the school playground', theme: 'Letter B /b/ (book, bike, ball, boy, Bill)', aiFocus: 'AI nhận diện âm /b/ và mẫu câu "Hello, Bill!"; AI hỗ trợ chuẩn hóa phát âm môi.', nlsFocus: 'Học liệu số taphuan.nxbgd.vn, chạm nghe biểu tượng âm thanh.', atgtFocus: '🚦 ATGT: An toàn khi đi xe đạp trẻ em (bike) có người lớn giám sát; không chạy nhảy xô đẩy bạn ở sân trường.', knsFocus: 'Kỹ năng chào hỏi thân thiện và biết chia sẻ đồ chơi cùng bạn.', ethicsFocus: '❤️ Phẩm chất Thân thiện & Lễ phép: Hòa đồng với bạn bè, lễ phép chào hỏi.' },
    'Unit 2': { title: 'In the dining room', theme: 'Letter C /k/ (cake, cat, car, cup)', aiFocus: 'AI nhận diện âm /k/ và câu mời "Have some cake!"; AI phát âm chuẩn.', nlsFocus: 'Khám phá hình ảnh động đồ vật 3D trên sachmem.vn.', atgtFocus: '🚦 ATGT: Từ vựng "car" - Chú ý quan sát ô tô ra vào ngõ; thắt dây an toàn khi ngồi ô tô.', knsFocus: 'Kỹ năng mời người lớn trước khi ăn, cẩn thận với đồ dễ vỡ (cup).', ethicsFocus: '❤️ Phẩm chất Lễ phép: Biết cảm ơn khi được mời đồ ăn.' },
    'Unit 3': { title: 'At the street market', theme: 'Letter A /æ/ (apple, bag, can, hat)', aiFocus: 'AI Voice Assistant phát âm âm /æ/ trong "apple, bag"; AI nhận diện giọng nói.', nlsFocus: 'Xem video trực quan khu chợ đường phố trên kho học liệu số.', atgtFocus: '🚦 ATGT: Kỹ năng đi bộ an toàn khi đi chợ cùng cha mẹ: Nắm tay người lớn, đi trên vỉa hè.', knsFocus: 'Kỹ năng phòng tránh đi lạc nơi đông người, nhớ số điện thoại bố mẹ.', ethicsFocus: '❤️ Phẩm chất Yêu lao động: Tôn trọng người lao động tại chợ.' },
    'Unit 4': { title: 'In the bedroom', theme: 'Letter D /d/ (door, desk, dog, duck)', aiFocus: 'AI nhận diện âm /d/ và khẩu lệnh "Open the door / Close the door".', nlsFocus: 'Chơi game kéo thả đồ vật vào phòng ngủ trên Wordwall.', atgtFocus: 'An toàn phòng ngừa tai nạn thương tích tại nhà (không nghịch cửa kẹp tay).', knsFocus: 'Kỹ năng tự dọn dẹp góc học tập và phòng ngủ ngăn nắp.', ethicsFocus: '❤️ Phẩm chất Gọn gàng, ngăn nắp: Tự giác thu dọn đồ dùng sau khi học.' }
  },
  'Grade 3': {
    'Unit 1': { title: 'Hello', theme: 'Greetings & Introductions', aiFocus: 'AI Voice Assistant nhận diện câu chào "Hello / Hi" và "How are you? - I\'m fine, thank you".', nlsFocus: 'Học liệu số taphuan.nxbgd.vn, bài hát tương tác Hello Song.', atgtFocus: '🚦 ATGT: Kính trọng chào hỏi thầy cô và người lớn tại cổng trường; dắt xe đạp gọn gàng.', knsFocus: 'Kỹ năng giao tiếp tự tin, bắt tay và chào hỏi lịch sự.', ethicsFocus: '❤️ Phẩm chất Lễ phép & Thân thiện: Hòa đồng với mọi người.' },
    'Unit 2': { title: 'Our names', theme: 'Names & Spelling (A-Z)', aiFocus: 'AI Voice Assistant đối thoại hỏi tên "What\'s your name?" và đánh vần chữ cái "How do you spell...?".', nlsFocus: 'Bảng chữ cái số Alphabet điện tử trên sachmem.vn; gõ tên trên bàn phím số.', atgtFocus: 'Ghi nhớ họ tên đầy đủ và số điện thoại gia đình để khai báo khi gặp sự cố.', knsFocus: 'Kỹ năng tự giới thiệu bản thân to, rõ ràng và đánh vần tên chính xác.', ethicsFocus: '❤️ Phẩm chất Tôn trọng: Tôn trọng tên gọi của bạn, không gọi bạn bằng biệt danh xấu.' },
    'Unit 3': { title: 'Our friends', theme: 'Friends & Teachers (This is / That is)', aiFocus: 'AI nhận diện cấu trúc giới thiệu "This is / That is" và đại từ "He is / She is".', nlsFocus: 'Video tương tác 360 độ về lớp học thân thiện trên hoclieu.vn.', atgtFocus: 'Nề nếp di chuyển trật tự trong hành lang và sân trường giờ ra chơi.', knsFocus: 'Kỹ năng kết bạn, giới thiệu bạn bè lịch sự và hòa nhã.', ethicsFocus: '❤️ Phẩm chất Tôn sư trọng đạo: Kính trọng thầy cô giáo, yêu quý bạn bè.' },
    'Unit 4': { title: 'Our bodies', theme: 'Body Parts (Touch your eyes / nose / mouth)', aiFocus: 'AI Vision / Pose Tracking nhận diện phản xạ chỉ các bộ phận cơ thể (eyes, ears, face, hair).', nlsFocus: 'Bài tập tương tác số dán nhãn bộ phận cơ thể trên Quizizz.', atgtFocus: 'Bảo vệ cơ thể khi tham gia giao thông: Luôn đội mũ bảo hiểm để bảo vệ đầu và não bộ.', knsFocus: 'Kỹ năng vệ sinh thân thể, rửa tay sạch và bảo vệ các giác quan.', ethicsFocus: '❤️ Phẩm chất Trách nhiệm: Biết trân trọng và chăm sóc sức khỏe bản thân.' },
    'Unit 5': { title: 'My hobbies', theme: 'Hobbies (singing, dancing, drawing, swimming)', aiFocus: 'AI Speech-to-Text nhận diện mẫu câu sở thích "What\'s your hobby? - I like dancing/drawing".', nlsFocus: 'Sử dụng Canva vẽ và chia sẻ sở thích cá nhân trực tuyến.', atgtFocus: '🚦 ATGT: An toàn khi bơi lội (swimming) và thể thao ngoài trời (chỉ bơi ở nơi có cứu hộ).', knsFocus: 'Kỹ năng phát triển năng khiếu, quản lý thời gian giữa học tập và vui chơi.', ethicsFocus: '❤️ Phẩm chất Chăm chỉ: Nuôi dưỡng niềm đam mê lành mạnh, kiên trì luyện tập.' },
    'Unit 6': { title: 'Our school', theme: 'School Facilities (classroom, library, playground)', aiFocus: 'AI đối thoại mẫu câu hỏi vị trí trường học "Is that our school library? - Yes, it is".', nlsFocus: 'Bản đồ số trường học 3D trên kho học liệu taphuan.nxbgd.vn.', atgtFocus: 'Quy tắc an toàn trong khuôn viên trường: Không chạy nhảy xô đẩy ở cầu thang, lan can.', knsFocus: 'Kỹ năng định hướng không gian trường học và giữ gìn trật tự phòng thư viện.', ethicsFocus: '❤️ Phẩm chất Trách nhiệm: Giữ gìn vệ sinh chung, bảo vệ của công trường lớp.' },
    'Unit 7': { title: 'Classroom things', theme: 'School Objects (pen, pencil, ruler, eraser, bag)', aiFocus: 'AI Camera nhận diện đồ dùng học tập thực tế và phát âm mẫu "I have a pen / a ruler".', nlsFocus: 'Trò chơi số hóa phân loại dụng cụ học tập trên Wordwall.', atgtFocus: 'An toàn phòng học: Không đùa nghịch dụng cụ sắc nhọn (kéo, gọt bút chì nhọn).', knsFocus: 'Kỹ năng sắp xếp ngăn nắp cặp sách và góc học tập cá nhân.', ethicsFocus: '❤️ Phẩm chất Tiết kiệm & Cẩn thận: Giữ gìn đồ dùng học tập cẩn thận, không làm mất đồ.' },
    'Unit 8': { title: 'My school things', theme: 'Colours & School things (What colour is it? - It\'s blue/red)', aiFocus: 'AI nhận diện màu sắc và danh từ số nhiều "These are my notebooks / They are green".', nlsFocus: 'Bảng pha màu số hóa trên ứng dụng hội họa trực tuyến.', atgtFocus: '🚦 ATGT: Nhận biết ý nghĩa màu sắc đèn tín hiệu giao thông (Đỏ - Dừng lại, Vàng - Đi chậm, Xanh - Được đi).', knsFocus: 'Kỹ năng phân biệt màu sắc chính xác và ứng dụng trong trang trí.', ethicsFocus: '❤️ Phẩm chất Thẩm mỹ: Ý thức giữ gìn sách vở luôn sạch đẹp.' },
    'Unit 9': { title: 'Our colours', theme: 'Colours & Objects (Is it blue? - Yes, it is / No, it isn\'t)', aiFocus: 'AI đối thoại hỏi đáp màu sắc "What colour are they? - They are yellow".', nlsFocus: 'Tô màu số hóa tranh phong cảnh trên máy tính.', atgtFocus: '🚦 ATGT: Mặc áo phản quang hoặc trang phục màu sáng khi đi ngoài trời tối để người tham gia giao thông dễ nhận biết.', knsFocus: 'Kỹ năng quan sát tinh tế và biểu đạt thẩm mỹ.', ethicsFocus: '❤️ Phẩm chất Yêu thiên nhiên: Cảm nhận vẻ đẹp đa dạng của sắc màu cuộc sống.' },
    'Unit 10': { title: 'Break time activities', theme: 'Break time games (play football, badminton, chess)', aiFocus: 'AI nhận diện mẫu câu rủ bạn chơi "What do you do at break time? - I play chess/football".', nlsFocus: 'Chơi cờ vua số hóa trực tuyến trên sachmem.vn / Lichess.', atgtFocus: 'Chơi các trò chơi an toàn trong giờ ra chơi; không đá bóng ra đường phố hoặc hành lang.', knsFocus: 'Kỹ năng chơi đồng đội, tinh thần thể thao cao thượng (Fair Play).', ethicsFocus: '❤️ Phẩm chất Đoàn kết: Chia sẻ trò chơi cùng bạn bè, không ích kỷ.' },
    'Unit 11': { title: 'My family', theme: 'Family Members (father, mother, brother, sister)', aiFocus: 'AI Voice Assistant đối thoại giới thiệu thành viên "Who\'s that? - That\'s my mother / grandfather".', nlsFocus: 'Tạo cây gia phả số hóa (Digital Family Tree) trên Canva/Google Slides.', atgtFocus: 'An toàn khi đi cùng gia đình: Luôn đội mũ bảo hiểm khi ngồi sau xe máy của cha mẹ.', knsFocus: 'Kỹ năng quan tâm chăm sóc người thân, lễ phép chào hỏi ông bà.', ethicsFocus: '❤️ Phẩm chất Hiếu thảo: Yêu thương, kính trọng ông bà cha mẹ và giúp đỡ người thân.' },
    'Unit 12': { title: 'Jobs', theme: 'Professions (doctor, teacher, driver, cook)', aiFocus: 'AI nhận diện mẫu câu hỏi nghề nghiệp "What\'s his/her job? - He\'s a doctor / She\'s a nurse".', nlsFocus: 'Xem video hướng nghiệp số 3D trên taphuan.nxbgd.vn.', atgtFocus: '🚦 ATGT: Nghề tài xế (driver) - Chấp hành nghiêm chỉnh luật giao thông, không sử dụng điện thoại khi lái xe.', knsFocus: 'Kỹ năng định hướng ước mơ nghề nghiệp và tôn trọng mọi ngành nghề.', ethicsFocus: '❤️ Phẩm chất Tôn trọng người lao động: Trân trọng mọi công việc chân chính.' },
    'Unit 13': { title: 'My house', theme: 'Rooms & Furniture (living room, bedroom, kitchen)', aiFocus: 'AI đối thoại mẫu câu hỏi phòng "Where\'s the living room? - It\'s here / there".', nlsFocus: 'Sơ đồ nhà thông minh 3D trên ứng dụng hoclieu.vn.', atgtFocus: 'Phòng tránh tai nạn thương tích tại nhà (an toàn điện, chống trơn trượt nhà tắm).', knsFocus: 'Kỹ năng giữ gìn nhà cửa sạch sẽ, phụ giúp cha mẹ quét dọn.', ethicsFocus: '❤️ Phẩm chất Chăm chỉ: Tự giác giữ gìn phòng ngủ ngăn nắp.' },
    'Unit 14': { title: 'My bedroom', theme: 'Furniture & Position (bed, desk, chair, door, window)', aiFocus: 'AI nhận diện giới từ chỉ vị trí "Where is the book? - It\'s on the desk / in the bag".', nlsFocus: 'Kéo thả sắp xếp đồ đạc phòng ngủ trên bảng tương tác.', atgtFocus: 'Không trèo leo lên bậu cửa sổ hoặc ban công nguy hiểm.', knsFocus: 'Kỹ năng tổ chức không gian học tập khoa học.', ethicsFocus: '❤️ Phẩm chất Gọn gàng: Sắp xếp đồ dùng học tập khoa học, đúng nơi quy định.' },
    'Unit 15': { title: 'At the dining table', theme: 'Food & Drinks (rice, meat, fish, bread, milk, water)', aiFocus: 'AI đóng vai phục vụ bàn đối thoại mẫu câu mời ăn "Would you like some fish? - Yes, please".', nlsFocus: 'Thiết kế thực đơn dinh dưỡng số hóa trên Wordwall.', atgtFocus: 'Vệ sinh an toàn thực phẩm: Rửa tay bằng xà phòng trước khi ăn, ăn chín uống sôi.', knsFocus: 'Văn hóa ứng xử lịch sự tại bàn ăn, không nói khi miệng đầy thức ăn.', ethicsFocus: '❤️ Phẩm chất Tiết kiệm: Trân trọng thức ăn, không bỏ lãng phí.' },
    'Unit 16': { title: 'My pets', theme: 'Pets (dog, cat, bird, rabbit, goldfish)', aiFocus: 'AI nhận diện câu hỏi số lượng "Do you have any pets? - Yes, I have a cat / two dogs".', nlsFocus: 'Khám phá video thế giới động vật trên National Geographic Kids.', atgtFocus: 'Giữ khoảng cách an toàn khi tiếp xúc với động vật nuôi, tránh bị cắn hoặc cào xước.', knsFocus: 'Kỹ năng chăm sóc và yêu thương động vật có trách nhiệm.', ethicsFocus: '❤️ Phẩm chất Nhân ái: Yêu thương động vật và bảo vệ môi trường.' },
    'Unit 17': { title: 'Our toys', theme: 'Toys (car, plane, robot, doll, kite, ball)', aiFocus: 'AI đối thoại mẫu câu hỏi sở hữu "How many planes do you have? - I have three planes".', nlsFocus: 'Trò chơi kiểm đếm số lượng đồ chơi số hóa trên Quizizz.', atgtFocus: '🚦 ATGT: Nhận biết máy bay (plane) và ô tô (car); không thả diều (kite) gần đường điện cao thế hoặc lòng đường.', knsFocus: 'Kỹ năng chia sẻ đồ chơi cùng bạn bè và thu dọn sau khi chơi.', ethicsFocus: '❤️ Phẩm chất Đoàn kết: Biết nhường nhịn và chơi vui vẻ cùng bạn bè.' },
    'Unit 18': { title: 'Playing and doing', theme: 'Actions (cooking, cleaning, drawing, singing, dancing)', aiFocus: 'AI nhận diện thì hiện tại tiếp diễn "What are you doing? - I\'m drawing a picture".', nlsFocus: 'Xem video trực tuyến hướng dẫn vẽ tranh và nhảy flashmob.', atgtFocus: 'Cẩn thận an toàn khi nấu ăn (cooking) cùng bố mẹ: Tránh xa bếp lửa và dầu sôi.', knsFocus: 'Kỹ năng phụ giúp gia đình các công việc vừa sức.', ethicsFocus: '❤️ Phẩm chất Chăm chỉ: Tự giác làm việc nhà và chăm chỉ học tập.' },
    'Unit 19': { title: 'Outdoor activities', theme: 'Outdoor sports (cycling, skating, flying a kite, skipping)', aiFocus: 'AI Pose Tracking nhận diện động tác thể thao "What is he doing? - He is cycling/skating".', nlsFocus: 'Làm bài tập trắc nghiệm số phân biệt nơi chơi an toàn trên Quizizz.', atgtFocus: '🚦 Tích hợp Giáo dục ATGT (CV 3456): Đội mũ bảo hiểm khi đi xe đạp (cycling), đi đúng làn đường.', knsFocus: 'Kỹ năng tự bảo vệ khi chơi thể thao ngoài trời (mang đồ bảo hộ patin).', ethicsFocus: '❤️ Phẩm chất Kỷ luật: Chấp hành nghiêm chỉnh luật an toàn khi vui chơi.' },
    'Unit 20': { title: 'At the zoo', theme: 'Zoo animals (monkey, tiger, elephant, peacock, bear)', aiFocus: 'AI nhận diện âm thanh tiếng gầm gừ và tên các loài thú hoang dã ở sở thú.', nlsFocus: 'Tham quan sở thú ảo 3D qua Google Arts & Culture.', atgtFocus: 'Tuân thủ nghiêm ngặt rào chắn an toàn và biển cảnh báo nguy hiểm tại vườn thú.', knsFocus: 'Kỹ năng quan sát thế giới hoang dã và ý thức bảo vệ động vật quý hiếm.', ethicsFocus: '❤️ Phẩm chất Yêu thiên nhiên: Bảo vệ môi trường sinh thái và các loài động vật hoang dã.' }
  }
};

// -------------------------------------------------------------------------
// DYNAMIC INTELLIGENT RESOLVER FOR ALL UNITS ACROSS GRADES 1, 2, 3, 4, 5
// -------------------------------------------------------------------------
export function getLessonSpecificIntegrations(params: {
  grade: string;
  week: number;
  unitCode: string;
  lessonTitle: string;
  periodNumber: number;
  periodInWeek: number;
  lessonPart?: string;
  scope?: string;
  vocab?: string[];
  patterns?: string[];
  activityScope?: ActivityScope;
}): LessonIntegrationItem {
  const { grade, week, unitCode, lessonTitle, periodInWeek, lessonPart = '', scope = '', vocab = [], patterns = [], activityScope = 'all' } = params;

  const unitNormalized = (unitCode || '').trim();
  const titleLower = (lessonTitle || '').toLowerCase();
  const partLower = (lessonPart || '').toLowerCase();
  const combinedContext = `${unitCode} ${lessonTitle} ${lessonPart} ${scope}`.toLowerCase();

  // Determine effective unit from lessonPart
  let effectiveUnit = unitNormalized;
  const unitMatch = lessonPart.match(/Unit\s+(\d+)/i) || lessonTitle.match(/Unit\s+(\d+)/i) || unitNormalized.match(/Unit\s+(\d+)/i);
  if (unitMatch) {
    effectiveUnit = `Unit ${unitMatch[1]}`;
  } else if (combinedContext.includes('starter')) {
    effectiveUnit = 'Starter';
  } else if (combinedContext.includes('review 1')) {
    effectiveUnit = 'Review 1';
  } else if (combinedContext.includes('review 2')) {
    effectiveUnit = 'Review 2';
  } else if (combinedContext.includes('review 3')) {
    effectiveUnit = 'Review 3';
  } else if (combinedContext.includes('review 4')) {
    effectiveUnit = 'Review 4';
  }

  // Determine effective activity scope
  let effectiveScope = activityScope;
  if (effectiveScope === 'all') {
    if (partLower.includes('hđ 1, 2, 3') || partLower.includes('hđ 1, 2') || (partLower.includes('tiết 1') && !partLower.includes('tiết 2'))) {
      effectiveScope = 'act123';
    } else if (partLower.includes('hđ 4, 5, 6') || partLower.includes('hđ 4, 5') || partLower.includes('tiết 2') || partLower.includes('project')) {
      effectiveScope = 'act456';
    }
  }

  // 1. Check if we have an exact rule in specific repository
  let gradeRepo: Record<string, Partial<UnitIntegrationRule>> | null = null;
  if (grade === 'Lớp 1' || grade === 'Grade 1') gradeRepo = G1_SPECIFIC_INTEGRATIONS;
  else if (grade === 'Lớp 2' || grade === 'Grade 2') gradeRepo = G2_SPECIFIC_INTEGRATIONS;
  else if (grade === 'Lớp 3' || grade === 'Grade 3') gradeRepo = G3_SPECIFIC_INTEGRATIONS;
  else if (grade === 'Lớp 4' || grade === 'Grade 4') gradeRepo = G4_SPECIFIC_INTEGRATIONS;
  else if (grade === 'Lớp 5' || grade === 'Grade 5') gradeRepo = G5_SPECIFIC_INTEGRATIONS;

  if (gradeRepo && gradeRepo[effectiveUnit]) {
    const unitRules = gradeRepo[effectiveUnit]!;
    let targetLesson = unitRules.lesson1;
    if (partLower.includes('lesson 2')) {
      targetLesson = unitRules.lesson2 || unitRules.lesson1;
    } else if (partLower.includes('lesson 3') || partLower.includes('phonics') || partLower.includes('project')) {
      targetLesson = unitRules.lesson3 || unitRules.lesson1;
    }
    if (targetLesson) {
      const item = targetLesson[effectiveScope] || targetLesson.all;
      if (item) return item;
    }
  }

  // 2. Check Global Success Unit Profile Dictionary
  const gradeKey = grade === 'Lớp 1' ? 'Grade 1' : grade === 'Lớp 2' ? 'Grade 2' : grade === 'Lớp 3' ? 'Grade 3' : grade === 'Lớp 4' ? 'Grade 4' : 'Grade 5';
  const profile = GLOBAL_SUCCESS_UNIT_PROFILES[gradeKey]?.[effectiveUnit] || GLOBAL_SUCCESS_UNIT_PROFILES['Grade 3']?.[effectiveUnit];
  
  const vocabSample = vocab.length > 0 ? vocab.slice(0, 4).join(', ') : '';
  const patternSample = patterns.length > 0 ? `"${patterns[0]}"` : '';
  const isLesson3Phonics = partLower.includes('lesson 3') || partLower.includes('phonics') || partLower.includes('project');
  const isLesson2 = partLower.includes('lesson 2');

  // Specialized Handler for Review, Assessment, Fun Time
  if (combinedContext.includes('review') || combinedContext.includes('fun time') || combinedContext.includes('short story')) {
    const reviewTarget = combinedContext.includes('review 1') || combinedContext.includes('short story 1') ? 'Units 1 - 5' : combinedContext.includes('review 2') ? 'Units 6 - 10 (Học kỳ 1)' : combinedContext.includes('review 3') ? 'Units 11 - 15' : 'Units 16 - 20 (Học kỳ 2)';
    return {
      aiCode: 'AI 5.C1.1',
      aiDesc: effectiveScope === 'act123'
        ? `[HĐ 1, 2, 3] Trợ lý AI tổng hợp hệ thống từ vựng và mẫu câu trọng tâm của ${reviewTarget}; AI phát âm chuẩn các cặp âm Phonics đã học ở HĐ 1, 2.`
        : effectiveScope === 'act456'
        ? `[HĐ 4, 5, 6] Hệ thống AI phân tích độ lưu loát và chấm điểm phản xạ hỏi - đáp giao tiếp trong trò chơi Board Game / Fun Time ở HĐ 4, 5, 6.`
        : `Hệ thống AI tự động hóa ngân hàng câu hỏi ôn tập ${reviewTarget}; AI phân tích lỗi sai ngữ âm và đề xuất bài luyện củng cố cá nhân hóa.`,
      nlsDesc: `Truy cập kho bài tập trắc nghiệm số hóa trên taphuan.nxbgd.vn / hoclieu.vn; hoàn thành bài tự đánh giá tiến bộ trên bảng tương tác.`,
      atgtDesc: `Nề nếp di chuyển an toàn và trật tự khi tham gia các hoạt động trò chơi ôn tập nhóm trong lớp học.`,
      knsDesc: `Kỹ năng tổng hợp và hệ thống hóa kiến thức đã học, kỹ năng làm việc nhóm và phản xạ giao tiếp nhanh.`,
      ethicsDesc: `❤️ Phẩm chất Chăm chỉ & Trung thực: Tự giác rà soát lại kiến thức chưa vững, trung thực trong tự đánh giá kết quả của bản thân.`,
      devicesDesc: `SGK Tiếng Anh ${grade}, Bảng phụ trò chơi Board Game, File Audio ôn tập MP3, TV tương tác.`
    };
  }

  if (combinedContext.includes('assessment') || combinedContext.includes('kiểm tra') || combinedContext.includes('đánh giá')) {
    return {
      aiCode: 'AI 5.C1.2',
      aiDesc: `Hệ thống AI hỗ trợ phát đề nghe chuẩn bản ngữ với tốc độ âm thanh tiêu chuẩn; AI hỗ trợ chấm điểm trắc nghiệm khách quan chuẩn Thông tư 27.`,
      nlsDesc: `Thực hiện bài kiểm tra định kỳ trên nền tảng khảo thí số hoặc phiếu trắc nghiệm chuẩn hóa; tra cứu kết quả trên sổ điện tử.`,
      atgtDesc: `Giữ trật tự, bình tĩnh và an toàn trong phòng thi và hành lang trường học.`,
      knsDesc: `Kỹ năng quản lý thời gian làm bài thi, giữ tâm lý bình tĩnh, tự tin và tập trung cao độ khi nghe audio.`,
      ethicsDesc: `❤️ Phẩm chất Trung thực: Tuyệt đối trung thực trong giờ kiểm tra, nghiêm túc làm bài bằng chính năng lực của mình.`,
      devicesDesc: `Đề kiểm tra định kỳ chuẩn ma trận Bộ GD&ĐT, File Audio MP3 chất lượng cao, Loa/Tai nghe chuẩn.`
    };
  }

  if (profile) {
    const aiDesc = isLesson3Phonics 
      ? `AI Phonics Visualizer hỗ trợ luyện phát âm âm chuẩn và ngữ điệu câu của ${effectiveUnit}; AI gợi ý cấu trúc bài viết dự án ở HĐ 5, 6.`
      : isLesson2
      ? `AI Voice Assistant đối thoại mẫu câu giao tiếp ${patternSample || profile.theme}; AI nhận diện giọng nói và chấm điểm phát âm các từ: ${vocabSample || profile.theme}.`
      : `AI Text-to-Speech phát âm chuẩn từ vựng ${profile.title} (${vocabSample || profile.theme}); AI nhận diện phản xạ ngữ âm của học sinh ở HĐ 1 & 2.`;

    const scopeAiDesc = effectiveScope === 'act123' ? `[HĐ 1, 2, 3] ${aiDesc}` : effectiveScope === 'act456' ? `[HĐ 4, 5, 6] ${aiDesc}` : aiDesc;
    const scopeNlsDesc = effectiveScope === 'act123' ? `[HĐ 1, 2, 3] ${profile.nlsFocus}` : effectiveScope === 'act456' ? `[HĐ 4, 5, 6] ${profile.nlsFocus}` : profile.nlsFocus;

    return {
      aiCode: 'AI 1.C1.1',
      aiDesc: scopeAiDesc,
      nlsDesc: scopeNlsDesc,
      atgtDesc: profile.atgtFocus,
      knsDesc: profile.knsFocus,
      ethicsDesc: profile.ethicsFocus,
      devicesDesc: `SGK Tiếng Anh ${grade} (${effectiveUnit}), File Audio MP3 bản ngữ, Flashcards từ vựng (${vocabSample || profile.theme}), Màn hình TV tương tác.`
    };
  }

  // 3. Dynamic High-Precision Generator from Vocab, Patterns, and Theme
  let aiCode = 'AI 1.C1.1';
  let aiDesc = isLesson3Phonics
    ? `AI Phonics Visualizer hỗ trợ phân tích khẩu hình âm và trọng âm từ vựng bài học (${vocabSample || effectiveUnit}); AI gợi ý cấu trúc bài viết dự án ở HĐ 5, 6.`
    : isLesson2
    ? `AI Voice Assistant đối thoại mẫu câu giao tiếp ${patternSample || 'của bài học'}; AI nhận diện giọng nói và chấm điểm phát âm các từ: ${vocabSample}.`
    : `AI Text-to-Speech phát âm chuẩn bản ngữ từ vựng ${vocabSample || effectiveUnit}; AI nhận diện phản xạ ngữ âm của học sinh ở HĐ 1 & 2.`;

  let nlsDesc = `Khai thác kho học liệu số tương tác hoclieu.vn & taphuan.nxbgd.vn; thực hành bài tập kéo thả trực tuyến trên bảng thông minh.`;
  let atgtDesc = `Nề nếp di chuyển an toàn, trật tự và giữ khoảng cách an toàn trong lớp học và sân trường.`;
  let knsDesc = `Kỹ năng giao tiếp tự tin, tích cực hợp tác cặp đôi/nhóm và chủ động hoàn thành nhiệm vụ học tập.`;
  let ethicsDesc = `❤️ Phẩm chất Chăm chỉ & Trách nhiệm: Tự giác học bài, hoàn thành tốt các hoạt động học tập và tôn trọng bạn bè.`;
  let devicesDesc = `SGK Tiếng Anh ${grade} (${effectiveUnit}), File Audio MP3 bản ngữ, Flashcards từ vựng (${vocabSample || 'chủ đề bài học'}), Màn hình TV tương tác.`;

  if (effectiveScope === 'act123') {
    aiDesc = `[HĐ 1, 2, 3] ` + aiDesc;
    nlsDesc = `[HĐ 1, 2, 3] ` + nlsDesc;
  } else if (effectiveScope === 'act456') {
    aiDesc = `[HĐ 4, 5, 6] ` + aiDesc;
    nlsDesc = `[HĐ 4, 5, 6] ` + nlsDesc;
  }

  return {
    aiCode,
    aiDesc,
    nlsDesc,
    atgtDesc,
    knsDesc,
    ethicsDesc,
    devicesDesc
  };
}
