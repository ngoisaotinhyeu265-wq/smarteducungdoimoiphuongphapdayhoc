/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnglishVocabItem, EnglishGradeLevel } from '../types';
import { VOCAB_IMAGE_MAP } from './primaryEnglishVocabData';
import {
  findVocabEntry,
  createPedagogicalFallback
} from './comprehensiveVocabKnowledgeBase';
import {
  GRADE_3_UNITS_DATA,
  GRADE_4_UNITS_DATA,
  GRADE_5_UNITS_DATA
} from './englishCurriculum35Weeks';

export interface GlobalSuccessLessonOption {
  lessonId: string;
  lessonName: string;
  shortLabel: string;
  pageRange: string;
  phonics?: string;
  patterns: string[];
  vocab: string[];
  integratedSkills?: string[];
}

export interface GlobalSuccessUnitOption {
  unitId: string;
  unitCode: string;
  unitNumber: number;
  theme: string;
  title: string;
  category: string;
  pageRange: string;
  semester: 1 | 2;
  lessons: GlobalSuccessLessonOption[];
  allVocab: string[];
  allPatterns: string[];
}

// Map common words to IPA, Easy English definitions, Vietnamese translations, and TPR notes
export const VOCAB_KNOWLEDGE_BASE: Record<string, {
  ipa: string;
  type: string;
  category: string;
  explanation: string;
  vn: string;
  sentence: string;
  tpr: string;
}> = {
  // G1 & G2 common
  hello: { ipa: '/həˈləʊ/', type: 'Interjection', category: 'Greetings', explanation: 'We say this when we meet a friend or teacher.', vn: 'xin chào', sentence: 'Hello, teacher and friends!', tpr: 'Vẫy tay chào vui vẻ với nụ cười tươi.' },
  hi: { ipa: '/haɪ/', type: 'Interjection', category: 'Greetings', explanation: 'A short, friendly way to greet a classmate.', vn: 'chào bạn', sentence: 'Hi, Mai! Good morning.', tpr: 'Vẫy tay sang bạn bên cạnh.' },
  'stand up': { ipa: '/stænd ʌp/', type: 'Phrase', category: 'Classroom commands', explanation: 'We rise on our feet when the teacher says so.', vn: 'đứng lên', sentence: 'Stand up, please.', tpr: 'Đứng thẳng người ngay ngắn.' },
  'sit down': { ipa: '/sɪt daʊn/', type: 'Phrase', category: 'Classroom commands', explanation: 'We take our seat quietly at the desk.', vn: 'ngồi xuống', sentence: 'Sit down, please.', tpr: 'Hạ 2 tay xuống và ngồi ngay ngắn.' },
  listen: { ipa: '/ˈlɪsn/', type: 'Verb', category: 'Classroom commands', explanation: 'We use our ears to pay attention to sounds and words.', vn: 'lắng nghe', sentence: 'Listen to the audio carefully.', tpr: 'Đặt tay lên vành tai làm điệu bộ lắng nghe.' },
  look: { ipa: '/lʊk/', type: 'Verb', category: 'Classroom commands', explanation: 'We use our eyes to see pictures or the board.', vn: 'nhìn / quan sát', sentence: 'Look at the colorful picture.', tpr: 'Chỉ 2 ngón tay vào mắt rồi hướng về phía bảng.' },
  'open book': { ipa: '/ˈəʊpən bʊk/', type: 'Phrase', category: 'Classroom commands', explanation: 'To open the covers of your textbook to learn.', vn: 'mở sách ra', sentence: 'Open your English book to page 6.', tpr: 'Mở 2 lòng bàn tay như trang sách.' },
  'close book': { ipa: '/kləʊz bʊk/', type: 'Phrase', category: 'Classroom commands', explanation: 'To close the textbook after the lesson.', vn: 'gấp sách lại', sentence: 'Close your book, please.', tpr: 'Khép 2 bàn tay lại.' },
  bike: { ipa: '/baɪk/', type: 'Noun', category: 'Vehicles', explanation: 'It has two wheels. We ride it to school or in the park.', vn: 'xe đạp', sentence: 'I ride my red bike to school.', tpr: 'Hai tay cầm ghi đông xe đạp và chân đạp nhịp nhàng.' },
  ball: { ipa: '/bɔːl/', type: 'Noun', category: 'Toys & Sports', explanation: 'A round object we kick, throw, or bounce in games.', vn: 'quả bóng', sentence: 'Let us play with the yellow ball.', tpr: 'Hai tay ôm quả bóng tròn và tung hứng.' },
  book: { ipa: '/bʊk/', type: 'Noun', category: 'School things', explanation: 'It has paper pages with stories, words, and pictures.', vn: 'quyển sách', sentence: 'This is my favorite English book.', tpr: 'Làm động tác lật từng trang sách.' },
  boy: { ipa: '/bɔɪ/', type: 'Noun', category: 'People', explanation: 'A young male student.', vn: 'cậu bé / bạn trai', sentence: 'Bill is a friendly boy.', tpr: 'Chỉ vào tranh bạn trai trong lớp.' },
  cake: { ipa: '/keɪk/', type: 'Noun', category: 'Food', explanation: 'A sweet food we eat at celebrations and birthday parties.', vn: 'chiếc bánh ngọt', sentence: 'Have some delicious birthday cake!', tpr: 'Làm động tác thổi nến bánh sinh nhật.' },
  cat: { ipa: '/kæt/', type: 'Noun', category: 'Animals', explanation: 'A soft pet that likes fish and says meow meow.', vn: 'con mèo', sentence: 'I love my cute white cat.', tpr: 'Làm động tác vuốt râu mèo và kêu "Meow meow!"' },
  car: { ipa: '/kɑː(r)/', type: 'Noun', category: 'Vehicles', explanation: 'A vehicle with four wheels that drives on the road.', vn: 'xe ô tô', sentence: 'The red car is driving fast.', tpr: 'Hai tay cầm vô lăng lái xe: "Beep beep!"' },
  cup: { ipa: '/kʌp/', type: 'Noun', category: 'House things', explanation: 'A container with a small handle used for drinking.', vn: 'cái cốc / cái tách', sentence: 'A cup of warm tea on the desk.', tpr: 'Cầm quai cốc nhấp từng ngụm nước.' },
  apple: { ipa: '/ˈæpl/', type: 'Noun', category: 'Food', explanation: 'A round crunchy fruit. It can be sweet red or green.', vn: 'quả táo', sentence: 'An apple a day keeps the doctor away.', tpr: 'Làm động tác cầm quả táo cắn một miếng giòn.' },
  bag: { ipa: '/bæɡ/', type: 'Noun', category: 'School things', explanation: 'We put our books, notebooks, and pens inside to carry.', vn: 'cặp sách / túi xách', sentence: 'My school bag is blue and heavy.', tpr: 'Làm động tác đeo cặp sách lên 2 vai.' },
  hat: { ipa: '/hæt/', type: 'Noun', category: 'Clothes', explanation: 'We wear it on our head when we walk in the sunshine.', vn: 'chiếc mũ', sentence: 'Put on your sunny hat, please.', tpr: 'Làm động tác đội mũ lên đầu ngay ngắn.' },
  can: { ipa: '/kæn/', type: 'Noun', category: 'Food', explanation: 'A metal container holding cool soda or juice.', vn: 'lon nước', sentence: 'A cold can of orange soda.', tpr: 'Bật nắp lon nước và uống sảng khoái.' },
  door: { ipa: '/dɔː(r)/', type: 'Noun', category: 'House', explanation: 'We open it to enter or leave a classroom.', vn: 'cánh cửa ra vào', sentence: 'Open the door, please.', tpr: 'Gõ cửa cốc cốc rồi vặn nắm cửa mở ra.' },
  desk: { ipa: '/desk/', type: 'Noun', category: 'School things', explanation: 'A wooden table where students sit to write and learn.', vn: 'bàn học', sentence: 'Keep your desk neat and tidy.', tpr: 'Chỉ tay vào mặt bàn học.' },
  dog: { ipa: '/dɒɡ/', type: 'Noun', category: 'Animals', explanation: 'A loyal pet with a wagging tail that barks woof.', vn: 'con chó', sentence: 'The little dog is playing in the garden.', tpr: 'Làm 2 tai cún vẫy vẫy và sủa: "Woof woof!"' },
  duck: { ipa: '/dʌk/', type: 'Noun', category: 'Animals', explanation: 'A swimming water bird with feathers that says quack.', vn: 'con vịt', sentence: 'Look at the yellow duck on the lake.', tpr: 'Hai bàn tay chụm làm mỏ vịt kêu: "Quack quack!"' },
  party: { ipa: '/ˈpɑːti/', type: 'Noun', category: 'Activities', explanation: 'A fun gathering of friends with music, games, and food.', vn: 'bữa tiệc', sentence: 'Welcome to my birthday party!', tpr: 'Cả lớp vỗ tay theo nhịp bài hát sinh nhật.' },
  pizza: { ipa: '/ˈpiːtsə/', type: 'Noun', category: 'Food', explanation: 'A round flat baked bread topped with cheese and tomato.', vn: 'bánh pizza', sentence: 'I like warm cheese pizza.', tpr: 'Làm động tác cầm lát pizza cắn ngập phô mai.' },
  popcorn: { ipa: '/ˈpɒpkɔːn/', type: 'Noun', category: 'Food', explanation: 'Puffed corn kernels popped into a light, crunchy snack.', vn: 'bắp rang bơ', sentence: 'Eating popcorn while watching cartoons.', tpr: 'Làm động tác bốc bắp rang bỏ vào miệng: "Pop pop!"' },
  pencil: { ipa: '/ˈpensl/', type: 'Noun', category: 'School things', explanation: 'A wooden stick with graphite inside used for writing.', vn: 'bút chì', sentence: 'Write your name with a sharp pencil.', tpr: 'Cầm bút chì và viết nét chữ trên không.' },
  notebook: { ipa: '/ˈnəʊtbʊk/', type: 'Noun', category: 'School things', explanation: 'A book with blank or ruled pages for writing notes.', vn: 'vở ghi bài', sentence: 'Open your notebook and write down the date.', tpr: 'Làm động tác mở vở ghi chép.' },
  nine: { ipa: '/naɪn/', type: 'Number', category: 'Numbers', explanation: 'The number between eight and ten (9).', vn: 'số 9', sentence: 'There are nine pencils in the box.', tpr: 'Xòe 9 ngón tay ra đếm to rõ.' },
  numbers: { ipa: '/ˈnʌmbəz/', type: 'Noun', category: 'Numbers', explanation: 'Symbols like 1, 2, 3 used for counting things.', vn: 'các con số', sentence: 'Let us count numbers from 1 to 10.', tpr: 'Đếm ngón tay từ 1 đến 10.' },
  garden: { ipa: '/ˈɡɑːdn/', type: 'Noun', category: 'Places', explanation: 'A piece of land with green grass, trees, and flowers.', vn: 'khu vườn', sentence: 'Beautiful flowers bloom in the school garden.', tpr: 'Làm động tác tưới cây và hít hương hoa thơm.' },
  girl: { ipa: '/ɡɜːl/', type: 'Noun', category: 'People', explanation: 'A female child or young student.', vn: 'cô bé / bạn gái', sentence: 'Mai is a smart and kind girl.', tpr: 'Chỉ vào bạn nữ trong tranh minh họa.' },
  tree: { ipa: '/triː/', type: 'Noun', category: 'Nature', explanation: 'A tall plant with a wooden trunk and green leaves.', vn: 'cái cây', sentence: 'Birds are singing in the tall tree.', tpr: 'Hai tay vươn cao tạo thành tán cây xanh tỏa bóng.' },
  tiger: { ipa: '/ˈtaɪɡə(r)/', type: 'Noun', category: 'Animals', explanation: 'A big wild orange cat with black stripes.', vn: 'con hổ / con cọp', sentence: 'The strong tiger lives in the forest.', tpr: 'Giơ 2 vuốt cọp và gầm nhẹ: "Roar!"' },
  mango: { ipa: '/ˈmæŋɡəʊ/', type: 'Noun', category: 'Food', explanation: 'A sweet juicy tropical yellow fruit.', vn: 'quả xoài', sentence: 'A sweet yellow mango from the tree.', tpr: 'Làm động tác gọt vỏ xoài và thưởng thức.' },
  milk: { ipa: '/mɪlk/', type: 'Noun', category: 'Food & Drinks', explanation: 'A white healthy liquid rich in calcium from cows.', vn: 'sữa tươi', sentence: 'Drink a glass of fresh milk every day.', tpr: 'Hai tay cầm hộp sữa tươi uống qua ống hút.' },
  monkey: { ipa: '/ˈmʌŋki/', type: 'Noun', category: 'Animals', explanation: 'A playful animal with a long tail that climbs trees.', vn: 'con khỉ', sentence: 'The funny monkey is swinging on a branch.', tpr: 'Gãi đầu gãi tai nhảy nhót như chú khỉ tinh nghịch.' },
  zoo: { ipa: '/zuː/', type: 'Noun', category: 'Places', explanation: 'A park where many wild animals are kept for people to visit.', vn: 'sở thú / vườn bách thú', sentence: 'We see lions and zebras at the zoo.', tpr: 'Làm động tác ngắm các loài thú qua hàng rào.' },
  zebra: { ipa: '/ˈzebrə/', type: 'Noun', category: 'Animals', explanation: 'An African wild horse with black and white stripes.', vn: 'con ngựa vằn', sentence: 'The zebra runs fast on the grass.', tpr: 'Chạy nhanh tại chỗ mô phỏng chú ngựa vằn.' },
  bus: { ipa: '/bʌs/', type: 'Noun', category: 'Vehicles', explanation: 'A large motor vehicle carrying many passengers.', vn: 'xe buýt', sentence: 'We take the school bus every morning.', tpr: 'Làm động tác xe buýt mở cửa đón học sinh.' },
  sun: { ipa: '/sʌn/', type: 'Noun', category: 'Weather', explanation: 'The bright star that gives light and warmth to Earth.', vn: 'mặt trời', sentence: 'The morning sun shines so warmly.', tpr: 'Hai cánh tay uốn cong tạo thành vầng thái dương.' },
  umbrella: { ipa: '/ʌmˈbrelə/', type: 'Noun', category: 'Things', explanation: 'A folding canopy that protects us from rain and sun.', vn: 'cái ô / cây dù', sentence: 'Take an umbrella when it rains.', tpr: 'Làm động tác bung dù và cầm cán dù đi dưới mưa.' },
  lake: { ipa: '/leɪk/', type: 'Noun', category: 'Places', explanation: 'A large body of calm fresh water surrounded by land.', vn: 'hồ nước', sentence: 'Swan boats floating on West Lake.', tpr: 'Làm động tác chèo thuyền trên hồ nước phẳng lặng.' },
  lemon: { ipa: '/ˈlemən/', type: 'Noun', category: 'Food', explanation: 'A yellow oval citrus fruit with sour juice.', vn: 'quả chanh vàng', sentence: 'Lemon juice with honey is very good.', tpr: 'Làm điệu bộ nếm vị chua của chanh: "Sour!"' },

  // G3 & G4 & G5 Units
  name: { ipa: '/neɪm/', type: 'Noun', category: 'Daily Conversation', explanation: 'What someone is called (such as Nam or Mai).', vn: 'tên gọi', sentence: 'What is your name? - My name is Minh.', tpr: 'Chỉ tay vào ngực tự giới thiệu tên mình.' },
  fine: { ipa: '/faɪn/', type: 'Adjective', category: 'Feelings', explanation: 'Feeling good, healthy, and happy.', vn: 'khỏe mạnh / tốt', sentence: 'I am fine, thank you!', tpr: 'Giơ ngón tay cái Like thể hiện sự khỏe khoắn.' },
  'thank you': { ipa: '/ˈθæŋk juː/', type: 'Phrase', category: 'Daily Conversation', explanation: 'Polite words said to show gratitude when helped.', vn: 'cảm ơn bạn', sentence: 'Thank you very much, teacher.', tpr: 'Hai tay chắp nhẹ mỉm cười cảm ơn.' },
  goodbye: { ipa: '/ɡʊdˈbaɪ/', type: 'Interjection', category: 'Greetings', explanation: 'Words said when parting from someone.', vn: 'tạm biệt', sentence: 'Goodbye, see you tomorrow!', tpr: 'Vẫy tay chào tạm biệt ra về.' },
  spell: { ipa: '/spel/', type: 'Verb', category: 'School activities', explanation: 'To say or write the letters of a word in order.', vn: 'đánh vần', sentence: 'How do you spell your name? - M-A-I.', tpr: 'Đánh vần từng chữ cái theo nhịp vỗ tay.' },
  friend: { ipa: '/frend/', type: 'Noun', category: 'People', explanation: 'A person you like, trust, and enjoy playing with.', vn: 'người bạn', sentence: 'This is my best friend in class 3A.', tpr: 'Khoác vai bạn thân bên cạnh.' },
  eye: { ipa: '/aɪ/', type: 'Noun', category: 'Body parts', explanation: 'The body part we use to see colors and shapes.', vn: 'con mắt', sentence: 'Touch your eyes gently.', tpr: 'Chỉ tay vào mắt: "Touch your eyes!"' },
  ear: { ipa: '/ɪər/', type: 'Noun', category: 'Body parts', explanation: 'The body part on our head used for hearing.', vn: 'cái tai', sentence: 'I listen to music with my ears.', tpr: 'Chỉ tay vào tai và lắng nghe.' },
  nose: { ipa: '/nəʊz/', type: 'Noun', category: 'Body parts', explanation: 'The body part on the face used for smelling and breathing.', vn: 'cái mũi', sentence: 'Touch your nose, please.', tpr: 'Chạm nhẹ ngón tay vào mũi.' },
  mouth: { ipa: '/maʊθ/', type: 'Noun', category: 'Body parts', explanation: 'The opening on your face for eating, smiling, and talking.', vn: 'cái miệng', sentence: 'Open your mouth and smile happily.', tpr: 'Mở miệng cười tươi: "Open your mouth!"' },
  face: { ipa: '/feɪs/', type: 'Noun', category: 'Body parts', explanation: 'The front part of your head with eyes, nose, and mouth.', vn: 'khuôn mặt', sentence: 'Wash your face every morning.', tpr: 'Xoa hai lòng bàn tay lên khuôn mặt.' },
  hand: { ipa: '/hænd/', type: 'Noun', category: 'Body parts', explanation: 'At the end of each arm, with four fingers and a thumb.', vn: 'bàn tay', sentence: 'Clap your hands together.', tpr: 'Vỗ 2 bàn tay theo nhịp.' },
  arm: { ipa: '/ɑːm/', type: 'Noun', category: 'Body parts', explanation: 'The upper limb of the body between shoulder and wrist.', vn: 'cánh tay', sentence: 'Raise your arms up high.', tpr: 'Giơ 2 cánh tay vươn thẳng lên cao.' },
  leg: { ipa: '/leɡ/', type: 'Noun', category: 'Body parts', explanation: 'The lower limb used for standing, walking, and running.', vn: 'cái chân', sentence: 'Stand on one leg, please!', tpr: 'Đứng co 1 chân thăng bằng.' },
  foot: { ipa: '/fʊt/', type: 'Noun', category: 'Body parts', explanation: 'The bottom part of your leg that touches the floor.', vn: 'bàn chân', sentence: 'Stamp your feet on the ground.', tpr: 'Giậm 2 bàn chân theo nhịp điệu.' },
  singing: { ipa: '/ˈsɪŋɪŋ/', type: 'Noun', category: 'Hobbies', explanation: 'Making musical sounds with your voice.', vn: 'ca hát', sentence: 'My favorite hobby is singing English songs.', tpr: 'Hai tay cầm micro tưởng tượng và ngân nga hát.' },
  dancing: { ipa: '/ˈdɑːnsɪŋ/', type: 'Noun', category: 'Hobbies', explanation: 'Moving your body rhythmically to music.', vn: 'nhảy múa / khiêu vũ', sentence: 'She loves dancing ballet.', tpr: 'Xoay tròn một vòng nhảy múa nhẹ nhàng.' },
  drawing: { ipa: '/ˈdrɔːɪŋ/', type: 'Noun', category: 'Hobbies', explanation: 'Creating pictures with pencils, crayons, or markers.', vn: 'vẽ tranh', sentence: 'I am drawing a picture of my school.', tpr: 'Cầm cọ vẽ phác họa trên giá tranh tưởng tượng.' },
  swimming: { ipa: '/ˈswɪmɪŋ/', type: 'Noun', category: 'Hobbies', explanation: 'Moving through water for sport or fun.', vn: 'bơi lội', sentence: 'We go swimming in the summer.', tpr: 'Quạt 2 tay làm động tác bơi trườn sấp.' },
  reading: { ipa: '/ˈriːdɪŋ/', type: 'Noun', category: 'Hobbies', explanation: 'Looking at words and understanding what they say.', vn: 'đọc sách', sentence: 'Reading comic books is so exciting.', tpr: 'Làm động tác lật sách say mê đọc.' },
  school: { ipa: '/skuːl/', type: 'Noun', category: 'Places', explanation: 'A place where children go to learn with teachers.', vn: 'trường học', sentence: 'I walk to school with my friends.', tpr: 'Khoác ba lô đi tới trường.' },
  classroom: { ipa: '/ˈklɑːsruːm/', type: 'Noun', category: 'Places', explanation: 'A room in a school where lessons take place.', vn: 'phòng học / lớp học', sentence: 'Our classroom has a big smart screen.', tpr: 'Chỉ tay bao quát khắp căn phòng học.' },
  library: { ipa: '/ˈlaɪbrəri/', type: 'Noun', category: 'Places', explanation: 'A quiet room full of books to read and borrow.', vn: 'thư viện', sentence: 'We read storybooks in the school library.', tpr: 'Đặt ngón tay lên môi giữ yên lặng: "Shh!"' },
  playground: { ipa: '/ˈpleɪɡraʊnd/', type: 'Noun', category: 'Places', explanation: 'An outdoor area where students play during break time.', vn: 'sân chơi / sân trường', sentence: 'We skip rope in the playground.', tpr: 'Làm động tác nhảy dây tung tăng trên sân.' },
  'computer room': { ipa: '/kəmˈpjuːtə rʊm/', type: 'Noun', category: 'Places', explanation: 'A room with desktop computers for learning IT.', vn: 'phòng tin học / phòng máy tính', sentence: 'Let us go to the computer room.', tpr: 'Làm động tác gõ bàn phím máy tính nhanh nhẹn.' },
  ruler: { ipa: '/ˈruːlə(r)/', type: 'Noun', category: 'School things', explanation: 'A long straight strip of plastic or wood for measuring.', vn: 'thước kẻ', sentence: 'Draw a straight line with your ruler.', tpr: 'Kẻ một đường thẳng tắp trên không.' },
  eraser: { ipa: '/ɪˈreɪzə(r)/', type: 'Noun', category: 'School things', explanation: 'A small rubber tool used to remove pencil marks.', vn: 'cục tẩy / gôm', sentence: 'May I borrow your clean eraser?', tpr: 'Làm động tác tẩy sạch vết bút chì.' },
  'pencil case': { ipa: '/ˈpensl keɪs/', type: 'Noun', category: 'School things', explanation: 'A zippered pouch or box to keep stationary organized.', vn: 'hộp bút / bóp viết', sentence: 'Put your colored pencils into the pencil case.', tpr: 'Mở khóa kéo hộp bút và cất bút vào.' },
  red: { ipa: '/red/', type: 'Adjective', category: 'Colors', explanation: 'The bright warm color of ripe apples and roses.', vn: 'màu đỏ', sentence: 'I have a red backpack.', tpr: 'Chỉ vào vật có màu đỏ trong lớp.' },
  blue: { ipa: '/bluː/', type: 'Adjective', category: 'Colors', explanation: 'The cool color of the clear sky and deep ocean.', vn: 'màu xanh da trời / xanh dương', sentence: 'The sky is a bright blue.', tpr: 'Chỉ tay lên bầu trời xanh.' },
  yellow: { ipa: '/ˈjeləʊ/', type: 'Adjective', category: 'Colors', explanation: 'The radiant color of bananas and sunshine.', vn: 'màu vàng', sentence: 'Look at the yellow sunflower.', tpr: 'Chỉ vào hoa cúc vàng hoặc vệt nắng.' },
  green: { ipa: '/ɡriːn/', type: 'Adjective', category: 'Colors', explanation: 'The fresh color of leaves, trees, and grass.', vn: 'màu xanh lá cây', sentence: 'Green trees make the school look fresh.', tpr: 'Chỉ vào tán lá cây xanh ngoài cửa sổ.' },
  teacher: { ipa: '/ˈtiːtʃə(r)/', type: 'Noun', category: 'Jobs', explanation: 'A person who guides and teaches students in school.', vn: 'thầy cô giáo', sentence: 'Our English teacher is very gentle and funny.', tpr: 'Chỉ lên bục giảng mỉm cười kính trọng.' },
  doctor: { ipa: '/ˈdɒktə(r)/', type: 'Noun', category: 'Jobs', explanation: 'A person trained to care for and treat sick patients.', vn: 'bác sĩ', sentence: 'The doctor works in the central hospital.', tpr: 'Đeo ống nghe khám bệnh lên ngực.' },
  nurse: { ipa: '/nɜːs/', type: 'Noun', category: 'Jobs', explanation: 'A healthcare professional who cares for patients.', vn: 'y tá', sentence: 'The nurse took good care of the sick boy.', tpr: 'Làm động tác ân cần cặp nhiệt độ cho người bệnh.' },
  driver: { ipa: '/ˈdraɪvə(r)/', type: 'Noun', category: 'Jobs', explanation: 'A person who operates a car, bus, or train.', vn: 'tài xế / người lái xe', sentence: 'The bus driver drives safely.', tpr: 'Cầm vô lăng bẻ cua nhịp nhàng.' },
  worker: { ipa: '/ˈwɜːkə(r)/', type: 'Noun', category: 'Jobs', explanation: 'A person who works with hands or machines in a factory.', vn: 'công nhân', sentence: 'My father is a skilled factory worker.', tpr: 'Đội mũ bảo hộ và lắp ráp linh kiện.' },
  farmer: { ipa: '/ˈfɑːmə(r)/', type: 'Noun', category: 'Jobs', explanation: 'A person who grows crops and raises farm animals.', vn: 'nông dân', sentence: 'The farmer grows golden rice fields.', tpr: 'Làm động tác gặt lúa và tưới rau.' },
  swim: { ipa: '/swɪm/', type: 'Verb', category: 'Activities', explanation: 'To move through water by moving limbs.', vn: 'bơi lội', sentence: 'I can swim like a fish.', tpr: 'Quạt 2 tay bơi ếch nhịp nhàng.' },
  cook: { ipa: '/kʊk/', type: 'Verb', category: 'Activities', explanation: 'To prepare hot and tasty meals in the kitchen.', vn: 'nấu ăn / đầu bếp', sentence: 'My mother cooks delicious soup.', tpr: 'Cầm muôi đảo đều nồi súp thơm lừng.' },
  sunny: { ipa: '/ˈsʌni/', type: 'Adjective', category: 'Weather', explanation: 'Bright with lots of sunshine and few clouds.', vn: 'trời nắng', sentence: 'It is warm and sunny today.', tpr: 'Lấy tay che trán ngắm ánh nắng vàng rực rỡ.' },
  rainy: { ipa: '/ˈreɪni/', type: 'Adjective', category: 'Weather', explanation: 'Having a lot of falling rain drops.', vn: 'trời mưa', sentence: 'Do not forget your raincoat on rainy days.', tpr: 'Gõ ngón tay tí tách: "Pitter-patter rain!"' },
  windy: { ipa: '/ˈwɪndi/', type: 'Adjective', category: 'Weather', explanation: 'With strong blowing wind.', vn: 'có gió / nhiều gió', sentence: 'It is a windy afternoon for flying kites.', tpr: 'Thổi phù phù và nghiêng người theo chiều gió.' },
  cloudy: { ipa: '/ˈklaʊdi/', type: 'Adjective', category: 'Weather', explanation: 'Full of fluffy gray or white clouds in the sky.', vn: 'nhiều mây', sentence: 'The sky is cloudy before the shower.', tpr: 'Hai tay vẽ những đám mây bồng bềnh.' },
  'Vietnam': { ipa: '/ˌvjetˈnæm/', type: 'Noun', category: 'Countries', explanation: 'Our beautiful country in Southeast Asia.', vn: 'nước Việt Nam', sentence: 'I live in Hanoi, Vietnam.', tpr: 'Đặt tay lên ngực tự hào yêu quê hương đất nước.' },
  'America': { ipa: '/əˈmerɪkə/', type: 'Noun', category: 'Countries', explanation: 'The United States of America.', vn: 'nước Mỹ / Hoa Kỳ', sentence: 'Tony is from America.', tpr: 'Chỉ cờ nước Mỹ trong bản đồ thế giới.' },
  'Australia': { ipa: '/ɒˈstreɪliə/', type: 'Noun', category: 'Countries', explanation: 'A country and continent famous for kangaroos and koalas.', vn: 'nước Úc', sentence: 'Sydney is a great city in Australia.', tpr: 'Làm động tác nhảy của chú chuột túi Kangaroo.' },
  'Singapore': { ipa: '/ˌsɪŋəˈpɔː(r)/', type: 'Noun', category: 'Countries', explanation: 'A modern green island city-state in Southeast Asia.', vn: 'nước Xin-ga-po', sentence: 'Singapore is a clean and green country.', tpr: 'Làm biểu tượng chú sư tử biển Merlion.' },
  Maths: { ipa: '/mæθs/', type: 'Noun', category: 'Subjects', explanation: 'The subject where we learn about numbers, shapes, and sums.', vn: 'môn Toán', sentence: 'I have Maths on Monday and Wednesday.', tpr: 'Làm động tác tính nhẩm cộng trừ trên ngón tay.' },
  English: { ipa: '/ˈɪŋɡlɪʃ/', type: 'Noun', category: 'Subjects', explanation: 'The international language we speak, read, and write.', vn: 'môn Tiếng Anh', sentence: 'We speak English in our classroom.', tpr: 'Chỉ vào sách Tiếng Anh Global Success.' },
  Science: { ipa: '/ˈsaɪəns/', type: 'Noun', category: 'Subjects', explanation: 'The subject where we study nature, plants, and animals.', vn: 'môn Khoa học', sentence: 'We do fun nature experiments in Science class.', tpr: 'Cầm kính lúp soi tiêu bản sinh học.' },
  Music: { ipa: '/ˈmjuːzɪk/', type: 'Noun', category: 'Subjects', explanation: 'The art of combining sounds, songs, and instruments.', vn: 'môn Âm nhạc', sentence: 'We sing lively songs in Music lesson.', tpr: 'Chỉ huy dàn hợp xướng lớp học.' },
  Art: { ipa: '/ɑːt/', type: 'Noun', category: 'Subjects', explanation: 'The subject of painting, drawing, and crafting.', vn: 'môn Mỹ thuật', sentence: 'I use watercolors in my Art class.', tpr: 'Cầm bảng pha màu và cọ vẽ tranh.' },
  PE: { ipa: '/ˌpiː ˈiː/', type: 'Noun', category: 'Subjects', explanation: 'Physical Education with exercises and sports games.', vn: 'môn Thể dục / Giáo dục thể chất', sentence: 'We run and jump in PE class.', tpr: 'Khởi động xoay cổ tay cổ chân tập thể dục.' },
  IT: { ipa: '/ˌaɪ ˈtiː/', type: 'Noun', category: 'Subjects', explanation: 'Information Technology and computer skills.', vn: 'môn Tin học', sentence: 'We learn coding and typing in IT class.', tpr: 'Gõ phím máy tính 10 ngón.' },
  address: { ipa: '/əˈdres/', type: 'Noun', category: 'Addresses', explanation: 'The details of the place where someone lives.', vn: 'địa chỉ nhà', sentence: 'What is your address? - It is 45 Tran Phu Street.', tpr: 'Viết biển số nhà và tên phố lên bảng.' },
  lane: { ipa: '/leɪn/', type: 'Noun', category: 'Addresses', explanation: 'A narrow street or road between buildings.', vn: 'ngõ / ngách / đường làng', sentence: 'I live in a peaceful green lane.', tpr: 'Vẽ sơ đồ lối ngõ nhỏ yên tĩnh.' },
  street: { ipa: '/striːt/', type: 'Noun', category: 'Addresses', explanation: 'A public road in a city or town with houses alongside.', vn: 'con đường / con phố', sentence: 'The street is lined with green trees.', tpr: 'Dang 2 tay mô phỏng đại lộ trải dài.' },
  tower: { ipa: '/ˈtaʊə(r)/', type: 'Noun', category: 'Addresses', explanation: 'A very tall building or structure with many floors.', vn: 'tòa tháp / tòa nhà cao tầng', sentence: 'My uncle lives on the 10th floor of the tower.', tpr: 'Hai tay vươn thẳng lên cao vút như tòa tháp.' },
  'surf the Internet': { ipa: '/sɜːf ði ˈɪntənet/', type: 'Phrase', category: 'Hobbies', explanation: 'To browse websites and search for information online.', vn: 'lướt mạng Internet', sentence: 'I surf the Internet to find English stories.', tpr: 'Làm động tác lướt con lăn chuột và gõ phím.' },
  'clean the house': { ipa: '/kliːn ðə haʊs/', type: 'Phrase', category: 'Housework', explanation: 'To sweep, mop, and tidy up rooms at home.', vn: 'dọn dẹp nhà cửa', sentence: 'I help my mother clean the house on Sundays.', tpr: 'Cầm chổi quét nhà và lau dọn bàn ghế.' },
  'do karate': { ipa: '/duː kəˈrɑːti/', type: 'Phrase', category: 'Sports', explanation: 'To practice the Japanese martial art of self-defense.', vn: 'tập võ karate', sentence: 'He does karate twice a week.', tpr: 'Đứng tấn và ra đòn đấm dứt khoát: "Kiai!"' },
  architect: { ipa: '/ˈɑːkɪtekt/', type: 'Noun', category: 'Jobs', explanation: 'A person who designs modern buildings and houses.', vn: 'kiến trúc sư', sentence: 'I want to be an architect to design green schools.', tpr: 'Cầm thước ê-ke và bút vẽ phác thảo bản vẽ công trình.' },
  astronaut: { ipa: '/ˈæstrənɔːt/', type: 'Noun', category: 'Jobs', explanation: 'A person trained to travel in a spacecraft to outer space.', vn: 'phi hành gia', sentence: 'The brave astronaut walks on the Moon.', tpr: 'Làm động tác bay bồng bềnh trong không gian.' },
  pilot: { ipa: '/ˈpaɪlət/', type: 'Noun', category: 'Jobs', explanation: 'A skilled person who flies planes and jets through the sky.', vn: 'phi công', sentence: 'The pilot flies an airplane from Hanoi to Tokyo.', tpr: 'Dang 2 cánh tay liệng như cánh máy bay trên mây.' }
};

/**
 * Generate rich EnglishVocabItem instances from a word list
 */
export function buildVocabItemsFromWordList(
  words: string[],
  grade: EnglishGradeLevel,
  categoryFallback: string = 'General',
  unitContext: string = ''
): EnglishVocabItem[] {
  return words.map((rawWord, index) => {
    const wordKey = rawWord.trim().toLowerCase();

    // 1. Check comprehensive master database first (covers 850+ curriculum words)
    const masterEntry = findVocabEntry(rawWord);

    // Image resolution
    const cleanImgKey = wordKey.replace(/[^a-z0-9]/g, '');
    const fallbackImg = VOCAB_IMAGE_MAP[cleanImgKey] || VOCAB_IMAGE_MAP[cleanImgKey.split(' ')[0]] || `https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80`;

    if (masterEntry) {
      return {
        id: `v_gs_${grade}_${wordKey.replace(/\s+/g, '_')}_${index}`,
        word: masterEntry.word || rawWord.trim(),
        pronunciation: masterEntry.ipa,
        wordType: masterEntry.type,
        category: masterEntry.category || categoryFallback,
        easyEnglishExplanation: masterEntry.explanation,
        vietnameseMeaning: masterEntry.vn,
        imageUrl: masterEntry.img || fallbackImg,
        modelSentence: masterEntry.sentence,
        grade,
        teachingNotes: masterEntry.tpr || `Giáo viên làm mẫu phát âm chuẩn và thực hành tương tác theo ngữ cảnh ${unitContext}.`
      };
    }

    // 2. Check local quick knowledge base
    const known = VOCAB_KNOWLEDGE_BASE[wordKey];
    if (known) {
      return {
        id: `v_gs_${grade}_${wordKey.replace(/\s+/g, '_')}_${index}`,
        word: rawWord.trim(),
        pronunciation: known.ipa,
        wordType: known.type,
        category: known.category || categoryFallback,
        easyEnglishExplanation: known.explanation,
        vietnameseMeaning: known.vn,
        imageUrl: fallbackImg,
        modelSentence: known.sentence,
        grade,
        teachingNotes: known.tpr || `Giáo viên giới thiệu từ vựng '${rawWord}' gắn với ngữ cảnh ${unitContext}.`
      };
    }

    // 3. Smart pedagogical fallback generation for any other rare word
    const fallback = createPedagogicalFallback(rawWord, Number(grade) || 3, categoryFallback, unitContext);
    return {
      id: `v_gs_${grade}_${wordKey.replace(/\s+/g, '_')}_${index}`,
      word: fallback.word,
      pronunciation: fallback.ipa,
      wordType: fallback.type,
      category: fallback.category,
      easyEnglishExplanation: fallback.explanation,
      vietnameseMeaning: fallback.vn,
      imageUrl: fallback.img || fallbackImg,
      modelSentence: fallback.sentence,
      grade,
      teachingNotes: fallback.tpr
    };
  });
}

// Convert Grade 3, 4, 5 UpperGradeUnitDetail to GlobalSuccessUnitOption
function transformUpperGradeUnits(
  rawUnits: typeof GRADE_3_UNITS_DATA,
  grade: EnglishGradeLevel,
  defaultCategory: string
): GlobalSuccessUnitOption[] {
  return rawUnits.map(unit => {
    const allVocab = Array.from(new Set([
      ...unit.lesson1Focus.vocab,
      ...unit.lesson2Focus.vocab,
      ...unit.lesson3Focus.vocab
    ]));

    const allPatterns = [
      ...unit.lesson1Focus.patterns,
      ...unit.lesson2Focus.patterns,
      ...unit.lesson3Focus.patterns
    ];

    const lessons: GlobalSuccessLessonOption[] = [
      {
        lessonId: 'all',
        lessonName: `Toàn bộ ${unit.unitCode} (${allVocab.length} từ vựng trọng tâm)`,
        shortLabel: 'Tất cả Lessons',
        pageRange: `${unit.lesson1Focus.page} - ${unit.lesson3Focus.page}`,
        patterns: allPatterns,
        vocab: allVocab,
        phonics: unit.lesson3Focus.phonics
      },
      {
        lessonId: 'lesson_1',
        lessonName: `Lesson 1: ${unit.lesson1Focus.patterns[0] || 'Khởi động & Mẫu câu 1'}`,
        shortLabel: 'Lesson 1',
        pageRange: unit.lesson1Focus.page,
        patterns: unit.lesson1Focus.patterns,
        vocab: unit.lesson1Focus.vocab
      },
      {
        lessonId: 'lesson_2',
        lessonName: `Lesson 2: ${unit.lesson2Focus.patterns[0] || 'Phát triển & Mẫu câu 2'}`,
        shortLabel: 'Lesson 2',
        pageRange: unit.lesson2Focus.page,
        patterns: unit.lesson2Focus.patterns,
        vocab: unit.lesson2Focus.vocab
      },
      {
        lessonId: 'lesson_3',
        lessonName: `Lesson 3: Phonics & Review (${unit.lesson3Focus.phonics})`,
        shortLabel: 'Lesson 3',
        pageRange: unit.lesson3Focus.page,
        phonics: unit.lesson3Focus.phonics,
        patterns: unit.lesson3Focus.patterns,
        vocab: unit.lesson3Focus.vocab
      }
    ];

    return {
      unitId: `g${grade}_u${unit.unitNumber}`,
      unitCode: unit.unitCode,
      unitNumber: unit.unitNumber,
      theme: unit.theme,
      title: unit.title,
      category: unit.theme || defaultCategory,
      pageRange: `${unit.lesson1Focus.page} - ${unit.lesson3Focus.page}`,
      semester: (unit.unitNumber <= 10 ? 1 : 2) as 1 | 2,
      lessons,
      allVocab,
      allPatterns
    };
  });
}

// Convert Grade 1 & 2 definitions into GlobalSuccessUnitOption
const GRADE_1_TOPICS = [
  { unitNumber: 0, unitCode: 'Starter', theme: 'Làm quen & Khởi động', title: 'Starter: Getting Started', vocab1: ['hello', 'hi', 'Bill', 'Mai'], vocab2: ['stand up', 'sit down', 'listen', 'look', 'open book'], phonics: '', patterns: ['Hello, I am Bill.', 'Stand up, please.'], pages: 'p.4-5' },
  { unitNumber: 1, unitCode: 'Unit 1', theme: 'In the school playground', title: 'Unit 1: In the school playground', vocab1: ['bike', 'ball', 'book', 'Bill'], vocab2: ['boy', 'point', 'look'], phonics: 'Letter B /b/', patterns: ['Point to the bike.', 'Look at Bill.'], pages: 'p.6-9' },
  { unitNumber: 2, unitCode: 'Unit 2', theme: 'In the dining room', title: 'Unit 2: In the dining room', vocab1: ['cake', 'cat', 'car', 'cup'], vocab2: ['eat', 'drink', 'have'], phonics: 'Letter C /k/', patterns: ['Have some cake.', 'A cat and a car.'], pages: 'p.10-13' },
  { unitNumber: 3, unitCode: 'Unit 3', theme: 'At the street market', title: 'Unit 3: At the street market', vocab1: ['apple', 'bag', 'can', 'hat'], vocab2: ['market', 'see', 'buy'], phonics: 'Letter A /æ/', patterns: ['I have an apple.', 'Look at the bag.'], pages: 'p.14-17' },
  { unitNumber: 4, unitCode: 'Unit 4', theme: 'In the bedroom', title: 'Unit 4: In the bedroom', vocab1: ['door', 'desk', 'dog', 'duck'], vocab2: ['bed', 'room', 'open'], phonics: 'Letter D /d/', patterns: ['Open the door.', 'A desk in the room.'], pages: 'p.18-21' },
  { unitNumber: 5, unitCode: 'Unit 5', theme: 'At the birthday party', title: 'Unit 5: At the birthday party', vocab1: ['party', 'pizza', 'popcorn', 'pencil'], vocab2: ['happy', 'birthday', 'gift'], phonics: 'Letter P /p/', patterns: ['Happy birthday!', 'Have some pizza.'], pages: 'p.24-27' },
  { unitNumber: 6, unitCode: 'Unit 6', theme: 'In the classroom', title: 'Unit 6: In the classroom', vocab1: ['notebook', 'nine', 'nut', 'numbers'], vocab2: ['classroom', 'write', 'count'], phonics: 'Letter N /n/', patterns: ['Open your notebook.', 'Number nine.'], pages: 'p.28-31' },
  { unitNumber: 7, unitCode: 'Unit 7', theme: 'In the garden', title: 'Unit 7: In the garden', vocab1: ['garden', 'girl', 'gate', 'goat'], vocab2: ['flower', 'tree', 'green'], phonics: 'Letter G /ɡ/', patterns: ['Look at the girl.', 'The goat is in the garden.'], pages: 'p.32-35' },
  { unitNumber: 8, unitCode: 'Unit 8', theme: 'In the park', title: 'Unit 8: In the park', vocab1: ['tree', 'turtle', 'tiger', 'tent'], vocab2: ['park', 'run', 'play'], phonics: 'Letter T /t/', patterns: ['Look at the tiger.', 'It is under the tree.'], pages: 'p.36-39' },
  { unitNumber: 9, unitCode: 'Unit 9', theme: 'In the grocery shop', title: 'Unit 9: In the grocery shop', vocab1: ['mango', 'money', 'milk', 'monkey'], vocab2: ['shop', 'buy', 'want'], phonics: 'Letter M /m/', patterns: ['I want milk.', 'Here is the money.'], pages: 'p.42-45' },
  { unitNumber: 10, unitCode: 'Unit 10', theme: 'At the zoo', title: 'Unit 10: At the zoo', vocab1: ['zoo', 'zebra', 'zebu', 'zero'], vocab2: ['animal', 'see', 'big'], phonics: 'Letter Z /z/', patterns: ['Look at the zebra.', 'I see a zebra at the zoo.'], pages: 'p.46-49' },
  { unitNumber: 11, unitCode: 'Unit 11', theme: 'At the bus stop', title: 'Unit 11: At the bus stop', vocab1: ['bus', 'sun', 'umbrella', 'run'], vocab2: ['stop', 'wait', 'go'], phonics: 'Letter U /ʌ/', patterns: ['The bus is coming.', 'Under the warm sun.'], pages: 'p.50-53' },
  { unitNumber: 12, unitCode: 'Unit 12', theme: 'At the lake', title: 'Unit 12: At the lake', vocab1: ['lake', 'lemon', 'leaf', 'lock'], vocab2: ['water', 'boat', 'yellow'], phonics: 'Letter L /l/', patterns: ['Look at the lake.', 'A yellow lemon.'], pages: 'p.54-57' },
  { unitNumber: 13, unitCode: 'Unit 13', theme: 'In the school canteen', title: 'Unit 13: In the school canteen', vocab1: ['milk', 'chips', 'fish', 'dish'], vocab2: ['eat', 'canteen', 'lunch'], phonics: 'Letter I /ɪ/', patterns: ['Have some fish.', 'I like chips and milk.'], pages: 'p.60-63' },
  { unitNumber: 14, unitCode: 'Unit 14', theme: 'In the toy shop', title: 'Unit 14: In the toy shop', vocab1: ['yo-yo', 'yacht', 'yogurt', 'yellow'], vocab2: ['toy', 'play', 'color'], phonics: 'Letter Y /j/', patterns: ['I have a yellow yo-yo.', 'Play with the toy.'], pages: 'p.64-67' },
  { unitNumber: 15, unitCode: 'Unit 15', theme: 'At the football match', title: 'Unit 15: At the football match', vocab1: ['football', 'fox', 'face', 'foot'], vocab2: ['match', 'kick', 'goal'], phonics: 'Letter F /f/', patterns: ['Kick the football.', 'Look at the fox.'], pages: 'p.68-71' },
  { unitNumber: 16, unitCode: 'Unit 16', theme: 'At the campsite', title: 'Unit 16: At the campsite', vocab1: ['tent', 'elephant', 'egg', 'red'], vocab2: ['camp', 'star', 'fire'], phonics: 'Letter E /e/', patterns: ['A red tent.', 'Look at the big elephant.'], pages: 'p.72-75' }
];

const GRADE_2_TOPICS = [
  { unitNumber: 0, unitCode: 'Starter', theme: 'Khởi động & Ôn tập', title: 'Starter: Welcome back!', vocab1: ['hello', 'welcome', 'friend', 'school'], vocab2: ['stand up', 'sit down', 'listen', 'look'], phonics: '', patterns: ['Welcome back to school!', 'How are you?'], pages: 'p.4-5' },
  { unitNumber: 1, unitCode: 'Unit 1', theme: 'At my school', title: 'Unit 1: At my school', vocab1: ['juice', 'jelly', 'jam', 'jacket'], vocab2: ['school', 'drink', 'wear'], phonics: 'Letter J /dʒ/', patterns: ['I have some jelly.', 'Drink some orange juice.'], pages: 'p.6-9' },
  { unitNumber: 2, unitCode: 'Unit 2', theme: 'In the bakery', title: 'Unit 2: In the bakery', vocab1: ['cake', 'kite', 'kitchen', 'kitten'], vocab2: ['bakery', 'fly', 'sweet'], phonics: 'Letter K /k/', patterns: ['I see a cute kitten.', 'Flying a colorful kite.'], pages: 'p.10-13' },
  { unitNumber: 3, unitCode: 'Unit 3', theme: 'At the seaside', title: 'Unit 3: At the seaside', vocab1: ['sea', 'sand', 'sail', 'sun'], vocab2: ['beach', 'swim', 'boat'], phonics: 'Letter S /s/', patterns: ['Let us play in the sand.', 'Look at the blue sea.'], pages: 'p.14-17' },
  { unitNumber: 4, unitCode: 'Unit 4', theme: 'In the countryside', title: 'Unit 4: In the countryside', vocab1: ['river', 'road', 'rainbow', 'rabbit'], vocab2: ['countryside', 'green', 'sky'], phonics: 'Letter R /r/', patterns: ['I see a rainbow in the sky.', 'A white rabbit by the river.'], pages: 'p.18-21' },
  { unitNumber: 5, unitCode: 'Unit 5', theme: 'In the farm', title: 'Unit 5: In the farm', vocab1: ['horse', 'house', 'hat', 'hand'], vocab2: ['farm', 'ride', 'clap'], phonics: 'Letter H /h/', patterns: ['Look at the horse.', 'Raise your hand.'], pages: 'p.24-27' },
  { unitNumber: 6, unitCode: 'Unit 6', theme: 'In the kitchen', title: 'Unit 6: In the kitchen', vocab1: ['pot', 'mop', 'box', 'clock'], vocab2: ['kitchen', 'clean', 'time'], phonics: 'Letter O /ɒ/', patterns: ['Where is the clock?', 'It is on the box.'], pages: 'p.28-31' },
  { unitNumber: 7, unitCode: 'Unit 7', theme: 'In the grocery store', title: 'Unit 7: In the grocery store', vocab1: ['grapes', 'goat', 'girl', 'guitar'], vocab2: ['fruit', 'play', 'music'], phonics: 'Letter G /ɡ/', patterns: ['I like sweet grapes.', 'Play the guitar.'], pages: 'p.32-35' },
  { unitNumber: 8, unitCode: 'Unit 8', theme: 'In the village', title: 'Unit 8: In the village', vocab1: ['village', 'van', 'volleyball', 'vase'], vocab2: ['drive', 'play', 'flower'], phonics: 'Letter V /v/', patterns: ['Drive the blue van.', 'Play volleyball in the village.'], pages: 'p.36-39' },
  { unitNumber: 9, unitCode: 'Unit 9', theme: 'In the food shop', title: 'Unit 9: In the food shop', vocab1: ['bread', 'butter', 'banana', 'bag'], vocab2: ['eat', 'breakfast', 'yellow'], phonics: 'Letter B /b/ & /bl/', patterns: ['Pass the butter, please.', 'Here you are.'], pages: 'p.42-45' },
  { unitNumber: 10, unitCode: 'Unit 10', theme: 'At the zoo', title: 'Unit 10: At the zoo', vocab1: ['monkey', 'mouse', 'mother', 'mouth'], vocab2: ['zoo', 'tree', 'cheese'], phonics: 'Letter M /m/', patterns: ['Look at the monkey.', 'Climbing a tall tree.'], pages: 'p.46-49' },
  { unitNumber: 11, unitCode: 'Unit 11', theme: 'In the art class', title: 'Unit 11: In the art class', vocab1: ['paint', 'picture', 'paper', 'pencil'], vocab2: ['draw', 'color', 'blue'], phonics: 'Letter P /p/', patterns: ['Draw a nice picture.', 'Paint with blue.'], pages: 'p.50-53' },
  { unitNumber: 12, unitCode: 'Unit 12', theme: 'At the lake', title: 'Unit 12: At the lake', vocab1: ['lake', 'leaf', 'lion', 'lemon'], vocab2: ['yellow', 'green', 'water'], phonics: 'Letter L /l/', patterns: ['Look at the green leaf.', 'A yellow lemon.'], pages: 'p.54-57' },
  { unitNumber: 13, unitCode: 'Unit 13', theme: 'In the school canteen', title: 'Unit 13: In the school canteen', vocab1: ['nuts', 'noodles', 'nurse', 'notebook'], vocab2: ['food', 'eat', 'warm'], phonics: 'Letter N /n/', patterns: ['I want warm noodles.', 'Have some nuts.'], pages: 'p.60-63' },
  { unitNumber: 14, unitCode: 'Unit 14', theme: 'In the toy shop', title: 'Unit 14: In the toy shop', vocab1: ['train', 'truck', 'teddy bear', 'top'], vocab2: ['toy', 'buy', 'play'], phonics: 'Letter T /t/', patterns: ['How much is the train?', 'I like the brown teddy bear.'], pages: 'p.64-67' },
  { unitNumber: 15, unitCode: 'Unit 15', theme: 'In the clothes shop', title: 'Unit 15: In the clothes shop', vocab1: ['shoes', 'shirt', 'shorts', 'shop'], vocab2: ['clothes', 'wear', 'blue'], phonics: 'Letter SH /ʃ/', patterns: ['Put on your shoes.', 'I like the blue shirt.'], pages: 'p.68-71' },
  { unitNumber: 16, unitCode: 'Unit 16', theme: 'At the campsite', title: 'Unit 16: At the campsite', vocab1: ['chair', 'cheese', 'chicken', 'chips'], vocab2: ['camp', 'food', 'sit'], phonics: 'Letter CH /tʃ/', patterns: ['Eat some chicken.', 'Sit on the chair.'], pages: 'p.72-75' }
];

function buildLowerGradeUnits(topics: typeof GRADE_1_TOPICS, grade: 1 | 2): GlobalSuccessUnitOption[] {
  return topics.map(t => {
    const allVocab = Array.from(new Set([...t.vocab1, ...t.vocab2]));
    const lessons: GlobalSuccessLessonOption[] = [
      {
        lessonId: 'all',
        lessonName: `Toàn bộ ${t.unitCode} (${allVocab.length} từ vựng)`,
        shortLabel: 'Tất cả Lessons',
        pageRange: t.pages,
        phonics: t.phonics,
        patterns: t.patterns,
        vocab: allVocab
      },
      {
        lessonId: 'lesson_1',
        lessonName: `Lesson 1: Listen & Repeat (${t.vocab1.slice(0, 3).join(', ')})`,
        shortLabel: 'Lesson 1',
        pageRange: t.pages.split('-')[0] || t.pages,
        phonics: t.phonics,
        patterns: [t.patterns[0] || 'Listen and repeat.'],
        vocab: t.vocab1
      },
      {
        lessonId: 'lesson_2',
        lessonName: `Lesson 2: Chant & Practice (${t.phonics || 'Phonics'})`,
        shortLabel: 'Lesson 2',
        pageRange: t.pages,
        phonics: t.phonics,
        patterns: [t.patterns[0] || 'Listen and chant.'],
        vocab: t.vocab1
      },
      {
        lessonId: 'lesson_3',
        lessonName: `Lesson 3: Let's talk & Sing (${t.patterns[1] || 'Mẫu câu giao tiếp'})`,
        shortLabel: 'Lesson 3',
        pageRange: t.pages.split('-')[1] || t.pages,
        patterns: t.patterns,
        vocab: allVocab
      }
    ];

    return {
      unitId: `g${grade}_u${t.unitNumber}`,
      unitCode: t.unitCode,
      unitNumber: t.unitNumber,
      theme: t.theme,
      title: t.title,
      category: t.theme,
      pageRange: t.pages,
      semester: (t.unitNumber <= 8 ? 1 : 2) as 1 | 2,
      lessons,
      allVocab,
      allPatterns: t.patterns
    };
  });
}

// Master Record of all 5 Grades
export const GS_CURRICULUM_CATALOG: Record<EnglishGradeLevel, GlobalSuccessUnitOption[]> = {
  1: buildLowerGradeUnits(GRADE_1_TOPICS, 1),
  2: buildLowerGradeUnits(GRADE_2_TOPICS, 2),
  3: transformUpperGradeUnits(GRADE_3_UNITS_DATA, 3, 'Daily Life & School'),
  4: transformUpperGradeUnits(GRADE_4_UNITS_DATA, 4, 'Community & Discovery'),
  5: transformUpperGradeUnits(GRADE_5_UNITS_DATA, 5, 'World & Future Horizons')
};

export function getUnitsByGrade(grade: EnglishGradeLevel): GlobalSuccessUnitOption[] {
  return GS_CURRICULUM_CATALOG[grade] || GS_CURRICULUM_CATALOG[3];
}
