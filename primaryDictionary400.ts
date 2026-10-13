/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Bộ Từ Điển Tiếng Anh Tiểu Học Chuyên Biệt Global Success (Lớp 1 - Lớp 5)
 * Hơn 400+ Từ vựng, Thuật ngữ môn học, Mệnh lệnh lớp học, Mẫu câu giao tiếp & Động từ TPR
 */

export interface DictionaryEntry {
  word: string; // Original English word/phrase
  ipa: string; // International Phonetic Alphabet
  wordType: 'Noun' | 'Verb' | 'Adjective' | 'Phrase' | 'Sentence' | 'Subject' | 'Command' | 'Preposition' | 'Number' | 'Pronoun';
  vietnameseMeaning: string; // Concise & clear Vietnamese meaning for primary school
  vietnameseMeaningDetailed?: string; // More detailed nuance
  easyEnglishExplanation?: string; // Simple 1-2 sentence English definition
  modelSentence?: string; // Practical example sentence
  modelSentenceVi?: string; // Vietnamese translation of the example
  category: 'School Subjects' | 'School Things' | 'Classroom Commands' | 'Action Verbs / TPR' | 'Daily Conversation' | 'Animals' | 'Food & Drinks' | 'Family & People' | 'Body Parts' | 'Feelings & Traits' | 'Colors & Shapes' | 'Numbers & Time' | 'Weather & Nature' | 'Places & House' | 'Clothes & Hobbies';
  grade?: 1 | 2 | 3 | 4 | 5;
  teachingNotes?: string; // TPR / Pedagogical tips for teachers
}

export const PRIMARY_DICTIONARY_ENTRIES: DictionaryEntry[] = [
  // ==========================================
  // 1. SCHOOL SUBJECTS (MÔN HỌC)
  // ==========================================
  {
    word: 'Maths',
    ipa: '/mæθs/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Toán, môn Toán học',
    vietnameseMeaningDetailed: 'Môn học về các con số, phép tính và hình học',
    easyEnglishExplanation: 'The school subject where you learn about numbers and shapes.',
    modelSentence: 'I have Maths on Monday and Wednesday.',
    modelSentenceVi: 'Tôi có môn Toán vào thứ Hai và thứ Tư.',
    category: 'School Subjects',
    grade: 3,
    teachingNotes: 'Giơ các ngón tay đếm số 1, 2, 3 và viết phép tính 1+1=2 lên bảng.'
  },
  {
    word: 'Math',
    ipa: '/mæθ/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Toán (tiếng Anh - Mỹ)',
    easyEnglishExplanation: 'The American English word for learning numbers.',
    modelSentence: 'Math is my favorite subject.',
    modelSentenceVi: 'Môn Toán là môn học yêu thích của tôi.',
    category: 'School Subjects',
    grade: 3,
    teachingNotes: 'Nhắc học sinh Math (Mỹ) và Maths (Anh) đều chỉ môn Toán.'
  },
  {
    word: 'English',
    ipa: '/ˈɪŋ.ɡlɪʃ/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Tiếng Anh, tiếng Anh',
    easyEnglishExplanation: 'The language we speak in this classroom.',
    modelSentence: 'We learn English every Tuesday morning.',
    modelSentenceVi: 'Chúng tôi học tiếng Anh vào mỗi sáng thứ Ba.',
    category: 'School Subjects',
    grade: 1,
    teachingNotes: 'GV mỉm cười chào "Hello! Welcome to English class!"'
  },
  {
    word: 'Science',
    ipa: '/ˈsaɪ.əns/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Khoa học, Tự nhiên và Xã hội',
    easyEnglishExplanation: 'The subject where you learn about animals, plants, and nature.',
    modelSentence: 'We study plants and animals in Science.',
    modelSentenceVi: 'Chúng tôi tìm hiểu về cây cối và loài vật trong môn Khoa học.',
    category: 'School Subjects',
    grade: 4,
    teachingNotes: 'Làm động tác nhìn qua kính lúp hoặc tưới cây.'
  },
  {
    word: 'Art',
    ipa: '/ɑːt/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Mỹ thuật, môn Vẽ tranh',
    easyEnglishExplanation: 'The subject where you draw pictures and paint colors.',
    modelSentence: 'I love Art because I can draw cats.',
    modelSentenceVi: 'Tôi thích môn Mỹ thuật vì tôi có thể vẽ những chú mèo.',
    category: 'School Subjects',
    grade: 3,
    teachingNotes: 'Giơ bút vẽ và làm động tác vẽ cọ màu lên không trung.'
  },
  {
    word: 'Music',
    ipa: '/ˈmjuː.zɪk/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Âm nhạc',
    easyEnglishExplanation: 'The subject where you sing beautiful songs and play instruments.',
    modelSentence: 'We sing happy songs in Music class.',
    modelSentenceVi: 'Chúng tôi hát những bài hát vui tươi trong giờ Âm nhạc.',
    category: 'School Subjects',
    grade: 3,
    teachingNotes: 'Vỗ tay theo nhịp điệu và làm động tác gảy đàn/hát.'
  },
  {
    word: 'IT',
    ipa: '/ˌaɪˈtiː/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Tin học (Information Technology)',
    easyEnglishExplanation: 'Information Technology: the subject where you learn to use computers.',
    modelSentence: 'We practice typing in IT class.',
    modelSentenceVi: 'Chúng tôi thực hành gõ phím trong giờ Tin học.',
    category: 'School Subjects',
    grade: 3,
    teachingNotes: 'Làm động tác gõ bàn phím và click chuột máy tính.'
  },
  {
    word: 'Information Technology',
    ipa: '/ˌɪn.fə.meɪ.ʃən tekˈnɒl.ə.dʒi/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Tin học, Công nghệ thông tin',
    easyEnglishExplanation: 'The full name for IT subject at school.',
    modelSentence: 'Information Technology helps us learn with computers.',
    modelSentenceVi: 'Môn Tin học giúp chúng tôi học tập với máy vi tính.',
    category: 'School Subjects',
    grade: 4,
    teachingNotes: 'Viết tắt là IT, đọc là /ˌaɪˈtiː/.'
  },
  {
    word: 'PE',
    ipa: '/ˌpiːˈiː/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Thể dục (Physical Education)',
    easyEnglishExplanation: 'Physical Education: the class where you exercise, run and play games.',
    modelSentence: 'We run and play football in PE.',
    modelSentenceVi: 'Chúng tôi chạy bộ và chơi bóng đá trong giờ Thể dục.',
    category: 'School Subjects',
    grade: 3,
    teachingNotes: 'Làm động tác vươn vai tập thể dục 1-2-3-4.'
  },
  {
    word: 'Physical Education',
    ipa: '/ˌfɪz.ɪ.kəl ed.jʊˈkeɪ.ʃən/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Giáo dục thể chất, môn Thể dục',
    easyEnglishExplanation: 'The long name for PE.',
    modelSentence: 'Physical Education keeps our body strong.',
    modelSentenceVi: 'Giáo dục thể chất giúp cơ thể chúng ta khỏe mạnh.',
    category: 'School Subjects',
    grade: 4,
    teachingNotes: 'Luyện tập phát âm /ˌfɪz.ɪ.kəl ed.jʊˈkeɪ.ʃən/.'
  },
  {
    word: 'History',
    ipa: '/ˈhɪs.tər.i/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Lịch sử',
    easyEnglishExplanation: 'The subject about famous people and stories from the past.',
    modelSentence: 'We learn about our heroes in History.',
    modelSentenceVi: 'Chúng tôi học về các vị anh hùng trong môn Lịch sử.',
    category: 'School Subjects',
    grade: 4,
    teachingNotes: 'Chỉ tay về phía sau lưng biểu thị quá khứ (in the past).'
  },
  {
    word: 'Geography',
    ipa: '/dʒiˈɒɡ.rə.fi/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Địa lí',
    easyEnglishExplanation: 'The subject about countries, mountains, rivers, and maps.',
    modelSentence: 'We look at maps in Geography class.',
    modelSentenceVi: 'Chúng tôi quan sát bản đồ trong giờ Địa lí.',
    category: 'School Subjects',
    grade: 4,
    teachingNotes: 'Làm động tác mở rộng bản đồ thế giới bằng hai tay.'
  },
  {
    word: 'Vietnamese',
    ipa: '/ˌvjet.nəˈmiːz/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Tiếng Việt, người Việt Nam, tiếng Việt',
    easyEnglishExplanation: 'Our mother tongue and national language subject.',
    modelSentence: 'We read lovely poems in Vietnamese class.',
    modelSentenceVi: 'Chúng tôi đọc những bài thơ hay trong giờ Tiếng Việt.',
    category: 'School Subjects',
    grade: 1,
    teachingNotes: 'Chỉ tay vào sách Tiếng Việt lớp 1.'
  },
  {
    word: 'Ethics',
    ipa: '/ˈeθ.ɪks/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Đạo đức',
    easyEnglishExplanation: 'The subject where we learn how to be good, polite and kind.',
    modelSentence: 'We learn to be polite in Ethics class.',
    modelSentenceVi: 'Chúng tôi học cách cư xử lễ phép trong giờ Đạo đức.',
    category: 'School Subjects',
    grade: 2,
    teachingNotes: 'Đặt tay lên ngực và mỉm cười gật đầu chào.'
  },
  {
    word: 'Moral Education',
    ipa: '/ˈmɒr.əl ed.jʊˈkeɪ.ʃən/',
    wordType: 'Subject',
    vietnameseMeaning: 'Môn Giáo dục đạo đức',
    easyEnglishExplanation: 'Another formal term for Ethics subject.',
    modelSentence: 'Moral Education teaches us good manners.',
    modelSentenceVi: 'Môn Giáo dục đạo đức dạy chúng ta những quy tắc ứng xử tốt đẹp.',
    category: 'School Subjects',
    grade: 5,
    teachingNotes: 'Rèn luyện kỹ năng sống và đạo đức.'
  },

  // ==========================================
  // 2. SCHOOL THINGS & PLACES (ĐỒ DÙNG & ĐỊA ĐIỂM HỌC TẬP)
  // ==========================================
  {
    word: 'pencil',
    ipa: '/ˈpen.səl/',
    wordType: 'Noun',
    vietnameseMeaning: 'cây bút chì',
    easyEnglishExplanation: 'A thin wooden tool you use for writing and drawing.',
    modelSentence: 'I have a new yellow pencil.',
    modelSentenceVi: 'Tôi có một cây bút chì màu vàng mới.',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Giơ bút chì lên và hướng dẫn học sinh nói "This is a pencil."'
  },
  {
    word: 'pen',
    ipa: '/pen/',
    wordType: 'Noun',
    vietnameseMeaning: 'cây bút mực, bút bi',
    easyEnglishExplanation: 'A tool with ink used for writing in notebooks.',
    modelSentence: 'Can I borrow your blue pen?',
    modelSentenceVi: 'Tôi có thể mượn cây bút mực màu xanh của bạn không?',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Phân biệt âm bật hơi /p/ với /b/ (pen vs ben).'
  },
  {
    word: 'ruler',
    ipa: '/ˈruː.lər/',
    wordType: 'Noun',
    vietnameseMeaning: 'cây thước kẻ',
    easyEnglishExplanation: 'A straight plastic or wooden stick used to draw straight lines.',
    modelSentence: 'Use a ruler to draw a straight line.',
    modelSentenceVi: 'Hãy dùng thước kẻ để vẽ một đường thẳng.',
    category: 'School Things',
    grade: 2,
    teachingNotes: 'Dùng tay làm động tác vạch một đường thẳng song song.'
  },
  {
    word: 'eraser',
    ipa: '/ɪˈreɪ.zər/',
    wordType: 'Noun',
    vietnameseMeaning: 'cục tẩy, cục gôm',
    easyEnglishExplanation: 'A small rubber piece used to clean pencil marks.',
    modelSentence: 'I need an eraser to correct my drawing.',
    modelSentenceVi: 'Tôi cần một cục tẩy để sửa lại bức vẽ của mình.',
    category: 'School Things',
    grade: 2,
    teachingNotes: 'Làm động tác chà xát ngón tay để tẩy nét viết.'
  },
  {
    word: 'rubber',
    ipa: '/ˈrʌb.ər/',
    wordType: 'Noun',
    vietnameseMeaning: 'cục tẩy, cục gôm (Anh - Anh)',
    easyEnglishExplanation: 'The British English word for eraser.',
    modelSentence: 'Pass me the rubber, please.',
    modelSentenceVi: 'Làm ơn đưa cho tôi cục tẩy.',
    category: 'School Things',
    grade: 2,
    teachingNotes: 'Rubber (Anh) tương đương Eraser (Mỹ).'
  },
  {
    word: 'pencil case',
    ipa: '/ˈpen.səl keɪs/',
    wordType: 'Noun',
    vietnameseMeaning: 'hộp bút, túi đựng bút',
    easyEnglishExplanation: 'A small bag or box where you keep your pens, pencils, and erasers.',
    modelSentence: 'My pencil case is on the desk.',
    modelSentenceVi: 'Hộp bút của tôi ở trên bàn học.',
    category: 'School Things',
    grade: 3,
    teachingNotes: 'Mở khóa kéo hộp bút và chỉ vào các đồ vật bên trong.'
  },
  {
    word: 'school bag',
    ipa: '/ˈskuːl bæɡ/',
    wordType: 'Noun',
    vietnameseMeaning: 'cặp sách, ba lô đi học',
    easyEnglishExplanation: 'A backpack you carry on your shoulders to bring books to school.',
    modelSentence: 'My school bag is blue and heavy.',
    modelSentenceVi: 'Cặp sách của tôi màu xanh dương và khá nặng.',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Đeo cặp lên hai vai và bước đi tự tin.'
  },
  {
    word: 'book',
    ipa: '/bʊk/',
    wordType: 'Noun',
    vietnameseMeaning: 'quyển sách',
    easyEnglishExplanation: 'Many pages with words and pictures to read.',
    modelSentence: 'Open your English book, please.',
    modelSentenceVi: 'Làm ơn hãy mở sách tiếng Anh của bạn ra.',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Mở sách và lật trang: "Open your book!"'
  },
  {
    word: 'notebook',
    ipa: '/ˈnəʊt.bʊk/',
    wordType: 'Noun',
    vietnameseMeaning: 'quyển vở ghi bài',
    easyEnglishExplanation: 'A book with blank lines where you write your lessons.',
    modelSentence: 'Write the new words in your notebook.',
    modelSentenceVi: 'Hãy viết các từ mới vào vở ghi của em.',
    category: 'School Things',
    grade: 2,
    teachingNotes: 'Làm động tác cầm bút viết vào vở.'
  },
  {
    word: 'crayon',
    ipa: '/ˈkreɪ.ɒn/',
    wordType: 'Noun',
    vietnameseMeaning: 'bút sáp màu',
    easyEnglishExplanation: 'A colored wax stick used for coloring pictures in Art class.',
    modelSentence: 'I color the sun with a yellow crayon.',
    modelSentenceVi: 'Tôi tô màu mặt trời bằng bút sáp màu vàng.',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Giơ các màu sáp và nói tên màu sắc (red, blue, yellow).'
  },
  {
    word: 'sharpener',
    ipa: '/ˈʃɑː.pən.ər/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái gọt bút chì',
    easyEnglishExplanation: 'A small tool to make your pencil point sharp.',
    modelSentence: 'My pencil sharpener is green.',
    modelSentenceVi: 'Cái gọt bút chì của tôi màu xanh lá cây.',
    category: 'School Things',
    grade: 3,
    teachingNotes: 'Làm động tác xoay tròn bút chì vào gọt bút.'
  },
  {
    word: 'desk',
    ipa: '/desk/',
    wordType: 'Noun',
    vietnameseMeaning: 'bàn học sinh',
    easyEnglishExplanation: 'A table where a student sits and studies.',
    modelSentence: 'Put your book on the desk.',
    modelSentenceVi: 'Hãy để quyển sách của bạn lên bàn học.',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Gõ nhẹ lên mặt bàn học sinh.'
  },
  {
    word: 'chair',
    ipa: '/tʃeər/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái ghế ngồi',
    easyEnglishExplanation: 'A seat with four legs for one person to sit on.',
    modelSentence: 'Sit down on your chair, please.',
    modelSentenceVi: 'Làm ơn hãy ngồi xuống ghế của em.',
    category: 'School Things',
    grade: 1,
    teachingNotes: 'Chỉ vào ghế và làm lệnh "Sit on your chair!"'
  },
  {
    word: 'blackboard',
    ipa: '/ˈblæk.bɔːd/',
    wordType: 'Noun',
    vietnameseMeaning: 'bảng đen, bảng lớp học',
    easyEnglishExplanation: 'A large dark board on the classroom wall for writing with chalk.',
    modelSentence: 'Look at the blackboard, class.',
    modelSentenceVi: 'Cả lớp hãy nhìn lên bảng đen nhé.',
    category: 'School Things',
    grade: 2,
    teachingNotes: 'Chỉ tay lên bảng lớp và nói "Look at the board."'
  },
  {
    word: 'whiteboard',
    ipa: '/ˈwaɪt.bɔːd/',
    wordType: 'Noun',
    vietnameseMeaning: 'bảng trắng (viết bằng bút dạ)',
    easyEnglishExplanation: 'A shiny white board for writing with dry-wipe markers.',
    modelSentence: 'The teacher writes on the whiteboard.',
    modelSentenceVi: 'Thầy cô viết chữ lên bảng trắng.',
    category: 'School Things',
    grade: 3,
    teachingNotes: 'Viết mẫu một chữ cái lớn lên bảng trắng.'
  },
  {
    word: 'school',
    ipa: '/skuːl/',
    wordType: 'Noun',
    vietnameseMeaning: 'trường học',
    easyEnglishExplanation: 'The place where children go to learn with teachers and friends.',
    modelSentence: 'I go to school every day.',
    modelSentenceVi: 'Tôi đi đến trường mỗi ngày.',
    category: 'Places & House',
    grade: 1,
    teachingNotes: 'Vẽ mái nhà trường có lá cờ tổ quốc.'
  },
  {
    word: 'classroom',
    ipa: '/ˈklɑːs.ruːm/',
    wordType: 'Noun',
    vietnameseMeaning: 'phòng học, lớp học',
    easyEnglishExplanation: 'A room in a school where lessons take place.',
    modelSentence: 'Our classroom is clean and bright.',
    modelSentenceVi: 'Phòng học của chúng tôi rất sạch sẽ và sáng sủa.',
    category: 'Places & House',
    grade: 1,
    teachingNotes: 'Dang hai tay bao quát toàn bộ không gian phòng học.'
  },
  {
    word: 'playground',
    ipa: '/ˈpleɪ.ɡraʊnd/',
    wordType: 'Noun',
    vietnameseMeaning: 'sân chơi, sân trường',
    easyEnglishExplanation: 'An outdoor area at school where children play games during break time.',
    modelSentence: 'We play games in the school playground.',
    modelSentenceVi: 'Chúng tôi chơi trò chơi ở sân trường.',
    category: 'Places & House',
    grade: 1,
    teachingNotes: 'Làm động tác đá bóng, nhảy dây trên sân.'
  },
  {
    word: 'library',
    ipa: '/ˈlaɪ.brər.i/',
    wordType: 'Noun',
    vietnameseMeaning: 'thư viện',
    easyEnglishExplanation: 'A quiet room full of books you can read and borrow.',
    modelSentence: 'We read storybooks in the library.',
    modelSentenceVi: 'Chúng tôi đọc truyện tranh trong thư viện.',
    category: 'Places & House',
    grade: 3,
    teachingNotes: 'Đặt ngón tay lên môi làm dấu yên lặng: "Shh! Be quiet in the library."'
  },
  {
    word: 'computer room',
    ipa: '/kəmˈpjuː.tər ruːm/',
    wordType: 'Noun',
    vietnameseMeaning: 'phòng máy tính, phòng tin học',
    easyEnglishExplanation: 'A special room with many computers for IT lessons.',
    modelSentence: 'We have IT lessons in the computer room.',
    modelSentenceVi: 'Chúng tôi học môn Tin học tại phòng máy tính.',
    category: 'Places & House',
    grade: 3,
    teachingNotes: 'Mô phỏng thao tác gõ phím nhẹ nhàng.'
  },

  // ==========================================
  // 3. CLASSROOM COMMANDS & TPR (MỆNH LỆNH LỚP HỌC & KHẨU LỆNH)
  // ==========================================
  {
    word: 'look and listen',
    ipa: '/lʊk ænd ˈlɪs.ən/',
    wordType: 'Command',
    vietnameseMeaning: 'Nhìn và lắng nghe (khẩu lệnh quan trọng)',
    easyEnglishExplanation: 'Use your eyes to see and your ears to hear the teacher.',
    modelSentence: 'Look and listen to the teacher, please.',
    modelSentenceVi: 'Làm ơn hãy nhìn và lắng nghe thầy cô giáo nhé.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Chỉ tay lên mắt (Look) rồi chạm tay vào tai (Listen).'
  },
  {
    word: 'listen and repeat',
    ipa: '/ˈlɪs.ən ænd rɪˈpiːt/',
    wordType: 'Command',
    vietnameseMeaning: 'Lắng nghe và nhắc lại',
    easyEnglishExplanation: 'Hear the word first, then say it out loud.',
    modelSentence: 'Listen and repeat after me: Apple!',
    modelSentenceVi: 'Hãy nghe và nhắc lại theo cô: Apple!',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Đặt tay lên tai, sau đó mở rộng bàn tay về phía cả lớp để học sinh đồng thanh.'
  },
  {
    word: 'point and say',
    ipa: '/pɔɪnt ænd seɪ/',
    wordType: 'Command',
    vietnameseMeaning: 'Chỉ vào tranh và đọc to',
    easyEnglishExplanation: 'Use your finger to touch the picture and say the word.',
    modelSentence: 'Point and say the words on page 10.',
    modelSentenceVi: 'Hãy chỉ vào tranh và đọc to các từ ở trang 10.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Dùng ngón trỏ chỉ vào từng hình ảnh trên màn hình/sách.'
  },
  {
    word: 'stand up',
    ipa: '/stænd ʌp/',
    wordType: 'Command',
    vietnameseMeaning: 'Đứng lên, đứng dậy',
    easyEnglishExplanation: 'Rise up onto your feet.',
    modelSentence: 'Stand up, please! Let us sing a song.',
    modelSentenceVi: 'Mời các em đứng dậy! Chúng ta cùng hát một bài nào.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Đưa hai lòng bàn tay hướng lên trên để ra hiệu đứng dậy.'
  },
  {
    word: 'sit down',
    ipa: '/sɪt daʊn/',
    wordType: 'Command',
    vietnameseMeaning: 'Ngồi xuống',
    easyEnglishExplanation: 'Take a seat on your chair.',
    modelSentence: 'Sit down, please, and open your books.',
    modelSentenceVi: 'Mời các em ngồi xuống và mở sách ra nào.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Đưa hai lòng bàn tay ấn nhẹ xuống dưới ra hiệu ngồi xuống.'
  },
  {
    word: 'open your book',
    ipa: '/ˈəʊ.pən jɔː bʊk/',
    wordType: 'Command',
    vietnameseMeaning: 'Mở sách của bạn ra',
    easyEnglishExplanation: 'Unfold your book to start reading.',
    modelSentence: 'Open your book to page 12, everyone.',
    modelSentenceVi: 'Cả lớp hãy mở sách đến trang 12 nhé.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Hai bàn tay úp vào nhau rồi mở rộng ra như lật quyển sách.'
  },
  {
    word: 'close your book',
    ipa: '/kləʊz jɔː bʊk/',
    wordType: 'Command',
    vietnameseMeaning: 'Gấp sách của bạn lại',
    easyEnglishExplanation: 'Shut your book when the lesson is finished.',
    modelSentence: 'Close your book and look at me.',
    modelSentenceVi: 'Hãy gấp sách lại và nhìn lên cô nào.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Hai bàn tay đang mở khép nhẹ lại vào nhau.'
  },
  {
    word: 'be quiet',
    ipa: '/biː ˈkwaɪ.ət/',
    wordType: 'Command',
    vietnameseMeaning: 'Giữ trật tự, hãy im lặng',
    easyEnglishExplanation: 'Stop talking and make no noise.',
    modelSentence: 'Be quiet, please. The test is starting.',
    modelSentenceVi: 'Làm ơn giữ trật tự nhé. Bài kiểm tra bắt đầu rồi.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Đặt nhẹ ngón trỏ lên trước môi và mỉm cười thân thiện.'
  },
  {
    word: 'hands up',
    ipa: '/hændz ʌp/',
    wordType: 'Command',
    vietnameseMeaning: 'Giơ tay lên (phát biểu)',
    easyEnglishExplanation: 'Raise your hand if you know the answer.',
    modelSentence: 'Hands up if you want to play a game!',
    modelSentenceVi: 'Hãy giơ tay lên nếu các em muốn chơi trò chơi!',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Giơ cao tay phải thẳng đứng tư thế chuẩn.'
  },
  {
    word: 'hands down',
    ipa: '/hændz daʊn/',
    wordType: 'Command',
    vietnameseMeaning: 'Hạ tay xuống',
    easyEnglishExplanation: 'Put your hands down on the desk.',
    modelSentence: 'Hands down, thank you class.',
    modelSentenceVi: 'Các em hạ tay xuống, cảm ơn cả lớp.',
    category: 'Classroom Commands',
    grade: 1,
    teachingNotes: 'Hạ tay xuống để ngay ngắn trên mặt bàn.'
  },
  {
    word: 'read aloud',
    ipa: '/riːd əˈlaʊd/',
    wordType: 'Command',
    vietnameseMeaning: 'Đọc to thành tiếng',
    easyEnglishExplanation: 'Speak the words loudly so everyone can hear you clearly.',
    modelSentence: 'Read aloud the sentence, please.',
    modelSentenceVi: 'Làm ơn hãy đọc to câu này thành tiếng.',
    category: 'Classroom Commands',
    grade: 2,
    teachingNotes: 'Khum tay cạnh miệng mô phỏng phát âm to rõ ràng.'
  },
  {
    word: 'write down',
    ipa: '/raɪt daʊn/',
    wordType: 'Command',
    vietnameseMeaning: 'Ghi chép lại vào vở',
    easyEnglishExplanation: 'Put the words on paper with your pencil.',
    modelSentence: 'Write down the new word in your notebook.',
    modelSentenceVi: 'Hãy ghi từ mới vào vở của em nhé.',
    category: 'Classroom Commands',
    grade: 2,
    teachingNotes: 'Làm động tác cầm bút viết lia lịa.'
  },
  {
    word: 'work in pairs',
    ipa: '/wɜːk ɪn peəz/',
    wordType: 'Command',
    vietnameseMeaning: 'Làm việc theo cặp (2 bạn cùng bàn)',
    easyEnglishExplanation: 'Practice talking with your classmate sitting next to you.',
    modelSentence: 'Now, work in pairs and ask each other.',
    modelSentenceVi: 'Bây giờ, hãy làm việc theo cặp và hỏi đáp lẫn nhau nhé.',
    category: 'Classroom Commands',
    grade: 3,
    teachingNotes: 'Dùng hai ngón trỏ chỉ về hai bạn ngồi cạnh nhau.'
  },
  {
    word: 'work in groups',
    ipa: '/wɜːk ɪn ɡruːps/',
    wordType: 'Command',
    vietnameseMeaning: 'Làm việc theo nhóm',
    easyEnglishExplanation: 'Work together with 4 or 5 friends.',
    modelSentence: 'Work in groups of four to complete the project.',
    modelSentenceVi: 'Hãy làm việc theo nhóm 4 bạn để hoàn thành dự án.',
    category: 'Classroom Commands',
    grade: 3,
    teachingNotes: 'Vòng tay tạo thành một hình tròn biểu thị làm việc nhóm.'
  },

  // ==========================================
  // 4. ACTION VERBS / TPR (ĐỘNG TỪ HÀNH ĐỘNG)
  // ==========================================
  {
    word: 'read',
    ipa: '/riːd/',
    wordType: 'Verb',
    vietnameseMeaning: 'đọc (sách, truyện)',
    easyEnglishExplanation: 'Look at words and understand what they mean.',
    modelSentence: 'I read an English storybook every evening.',
    modelSentenceVi: 'Tôi đọc một quyển truyện tiếng Anh mỗi tối.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Hai bàn tay mở ra như trang sách và mắt dõi theo.'
  },
  {
    word: 'write',
    ipa: '/raɪt/',
    wordType: 'Verb',
    vietnameseMeaning: 'viết (chữ, số)',
    easyEnglishExplanation: 'Make letters and numbers on paper with a pen.',
    modelSentence: 'She writes her name neatly.',
    modelSentenceVi: 'Cô ấy viết tên mình rất nắn nót.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Cầm bút tưởng tượng và viết tên lên không trung.'
  },
  {
    word: 'draw',
    ipa: '/drɔː/',
    wordType: 'Verb',
    vietnameseMeaning: 'vẽ (tranh bằng bút)',
    easyEnglishExplanation: 'Make pictures using a pencil or crayon.',
    modelSentence: 'I can draw a big blue house.',
    modelSentenceVi: 'Tôi có thể vẽ một ngôi nhà to màu xanh dương.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Vẽ một hình tròn hoặc bông hoa giữa không trung.'
  },
  {
    word: 'color',
    ipa: '/ˈkʌl.ər/',
    wordType: 'Verb',
    vietnameseMeaning: 'tô màu, màu sắc',
    easyEnglishExplanation: 'Put red, yellow or blue on a picture.',
    modelSentence: 'Color the apple red.',
    modelSentenceVi: 'Hãy tô màu quả táo thành màu đỏ nhé.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Cầm sáp màu và làm động tác tô kín hình tròn.'
  },
  {
    word: 'sing',
    ipa: '/sɪŋ/',
    wordType: 'Verb',
    vietnameseMeaning: 'hát (bài hát)',
    easyEnglishExplanation: 'Make musical sounds with your voice.',
    modelSentence: 'Let us sing the Alphabet song together.',
    modelSentenceVi: 'Chúng ta hãy cùng nhau hát bài ca Bảng chữ cái nhé.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Cầm micro tưởng tượng và cất tiếng hát du dương.'
  },
  {
    word: 'dance',
    ipa: '/dɑːns/',
    wordType: 'Verb',
    vietnameseMeaning: 'nhảy múa, khiêu vũ',
    easyEnglishExplanation: 'Move your body to music.',
    modelSentence: 'The children dance happily at the party.',
    modelSentenceVi: 'Các bạn nhỏ nhảy múa vui vẻ tại bữa tiệc.',
    category: 'Action Verbs / TPR',
    grade: 2,
    teachingNotes: 'Lắc lư hông và vẫy hai cánh tay theo điệu nhạc.'
  },
  {
    word: 'run',
    ipa: '/rʌn/',
    wordType: 'Verb',
    vietnameseMeaning: 'chạy bộ, chạy nhanh',
    easyEnglishExplanation: 'Move very fast with your legs.',
    modelSentence: 'Do not run in the hallway!',
    modelSentenceVi: 'Đừng chạy ở ngoài hành lang nhé!',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Đánh hai tay nhanh như đang chạy tại chỗ.'
  },
  {
    word: 'jump',
    ipa: '/dʒʌmp/',
    wordType: 'Verb',
    vietnameseMeaning: 'nhảy bật lên cao',
    easyEnglishExplanation: 'Push yourself up into the air with your feet.',
    modelSentence: 'Can you jump like a frog?',
    modelSentenceVi: 'Em có thể nhảy bật như chú ếch không?',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Nhún đầu gối và nhảy bật lên một bước nhỏ.'
  },
  {
    word: 'swim',
    ipa: '/swɪm/',
    wordType: 'Verb',
    vietnameseMeaning: 'bơi lội',
    easyEnglishExplanation: 'Move your arms and legs through water.',
    modelSentence: 'I can swim in the pool.',
    modelSentenceVi: 'Tôi có thể bơi trong bể bơi.',
    category: 'Action Verbs / TPR',
    grade: 2,
    teachingNotes: 'Quạt hai cánh tay như đang bơi ếch.'
  },
  {
    word: 'play',
    ipa: '/pleɪ/',
    wordType: 'Verb',
    vietnameseMeaning: 'chơi (trò chơi, thể thao, nhạc cụ)',
    easyEnglishExplanation: 'Have fun with toys, sports or friends.',
    modelSentence: 'We play football after school.',
    modelSentenceVi: 'Chúng tôi chơi bóng đá sau giờ học.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Làm động tác đá bóng hoặc bấm tay cầm chơi game.'
  },
  {
    word: 'count',
    ipa: '/kaʊnt/',
    wordType: 'Verb',
    vietnameseMeaning: 'đếm (số lượng)',
    easyEnglishExplanation: 'Say numbers one by one to find how many.',
    modelSentence: 'Count from one to ten, please.',
    modelSentenceVi: 'Làm ơn hãy đếm từ một đến mười.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Xòe từng ngón tay đếm: One, two, three...'
  },
  {
    word: 'touch',
    ipa: '/tʌtʃ/',
    wordType: 'Verb',
    vietnameseMeaning: 'chạm vào, sờ vào',
    easyEnglishExplanation: 'Put your hand or finger on something.',
    modelSentence: 'Touch your nose! Touch your ears!',
    modelSentenceVi: 'Hãy chạm vào mũi của em! Chạm vào tai của em nào!',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Chơi trò Simon Says chạm vào các bộ phận cơ thể.'
  },
  {
    word: 'open',
    ipa: '/ˈəʊ.pən/',
    wordType: 'Verb',
    vietnameseMeaning: 'mở ra',
    easyEnglishExplanation: 'Move a door or book so it is not closed.',
    modelSentence: 'Open the door, please.',
    modelSentenceVi: 'Làm ơn hãy mở cửa ra.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Mở rộng hai tay sang hai bên.'
  },
  {
    word: 'close',
    ipa: '/kləʊz/',
    wordType: 'Verb',
    vietnameseMeaning: 'đóng lại, khép lại',
    easyEnglishExplanation: 'Shut a book, bag, or door.',
    modelSentence: 'Close the window when it rains.',
    modelSentenceVi: 'Hãy đóng cửa sổ khi trời mưa.',
    category: 'Action Verbs / TPR',
    grade: 1,
    teachingNotes: 'Khép hai bàn tay lại.'
  },
  {
    word: 'ride a bike',
    ipa: '/raɪd ə baɪk/',
    wordType: 'Phrase',
    vietnameseMeaning: 'đi xe đạp, đạp xe',
    easyEnglishExplanation: 'Ride on a two-wheeled bicycle.',
    modelSentence: 'I can ride a bike in the park.',
    modelSentenceVi: 'Tôi có thể đạp xe trong công viên.',
    category: 'Action Verbs / TPR',
    grade: 2,
    teachingNotes: 'Hai tay cầm ghi đông và hai chân đạp tròn đều.'
  },
  {
    word: 'fly a kite',
    ipa: '/flaɪ ə kaɪt/',
    wordType: 'Phrase',
    vietnameseMeaning: 'thả diều',
    easyEnglishExplanation: 'Fly a paper toy high up in the wind.',
    modelSentence: 'The boys fly a kite on the windy hill.',
    modelSentenceVi: 'Các bạn nam thả diều trên ngọn đồi lộng gió.',
    category: 'Action Verbs / TPR',
    grade: 2,
    teachingNotes: 'Một tay giữ cuộn dây, một tay giật giật nhịp nhàng nhìn lên trời.'
  },

  // ==========================================
  // 5. COMMUNICATIVE PATTERNS & PHRASES (MẪU CÂU & GIAO TIẾP)
  // ==========================================
  {
    word: 'hello',
    ipa: '/həˈləʊ/',
    wordType: 'Phrase',
    vietnameseMeaning: 'xin chào (thân thiện)',
    easyEnglishExplanation: 'A friendly word used when you meet someone.',
    modelSentence: 'Hello! My name is Nam.',
    modelSentenceVi: 'Xin chào! Tên của mình là Nam.',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Vẫy tay phải và cười tươi.'
  },
  {
    word: 'hi',
    ipa: '/haɪ/',
    wordType: 'Phrase',
    vietnameseMeaning: 'chào (ngắn gọn, thân mật)',
    easyEnglishExplanation: 'A short, casual way to say hello.',
    modelSentence: 'Hi, Mai! How are you today?',
    modelSentenceVi: 'Chào Mai! Hôm nay bạn thế nào?',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Vẫy tay nhẹ nhàng chào bạn.'
  },
  {
    word: 'goodbye',
    ipa: '/ɡʊdˈbaɪ/',
    wordType: 'Phrase',
    vietnameseMeaning: 'tạm biệt',
    easyEnglishExplanation: 'What you say when you leave someone.',
    modelSentence: 'Goodbye, teacher! See you tomorrow.',
    modelSentenceVi: 'Tạm biệt cô giáo! Hẹn gặp lại cô vào ngày mai.',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Vẫy tay chào tạm biệt khi kết thúc tiết học.'
  },
  {
    word: 'bye',
    ipa: '/baɪ/',
    wordType: 'Phrase',
    vietnameseMeaning: 'chào tạm biệt (ngắn gọn)',
    easyEnglishExplanation: 'A short way of saying goodbye.',
    modelSentence: 'Bye, see you later!',
    modelSentenceVi: 'Tạm biệt, hẹn gặp lại bạn sau nhé!',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Vẫy nhẹ tay.'
  },
  {
    word: 'thank you',
    ipa: '/ˈθæŋk ˌjuː/',
    wordType: 'Phrase',
    vietnameseMeaning: 'cảm ơn bạn / cảm ơn thầy cô',
    easyEnglishExplanation: 'Polite words said when someone helps you or gives you a gift.',
    modelSentence: 'Thank you very much, teacher.',
    modelSentenceVi: 'Em cảm ơn thầy/cô rất nhiều ạ.',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Đặt tay lên ngực và cúi đầu nhẹ.'
  },
  {
    word: 'you are welcome',
    ipa: '/jɔː ˈwel.kəm/',
    wordType: 'Phrase',
    vietnameseMeaning: 'không có chi, không dám (đáp lại lời cảm ơn)',
    easyEnglishExplanation: 'A polite reply when someone says thank you to you.',
    modelSentence: 'You are welcome, my friend!',
    modelSentenceVi: 'Không có chi đâu, bạn của tôi!',
    category: 'Daily Conversation',
    grade: 2,
    teachingNotes: 'Mỉm cười xua nhẹ tay biểu thị sự thân thiện.'
  },
  {
    word: 'how are you',
    ipa: '/haʊ ɑː juː/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Bạn có khỏe không? / Em thế nào?',
    easyEnglishExplanation: 'A question to ask about someone’s health or feelings.',
    modelSentence: 'How are you today? - I am fine, thank you.',
    modelSentenceVi: 'Hôm nay bạn thế nào? - Mình khỏe, cảm ơn bạn.',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Hỏi với ngữ điệu đi xuống cuối câu.'
  },
  {
    word: 'I am fine',
    ipa: '/aɪ æm faɪn/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Tôi khỏe, em khỏe ạ',
    easyEnglishExplanation: 'I feel good and happy.',
    modelSentence: 'I am fine, thank you. And you?',
    modelSentenceVi: 'Mình khỏe, cảm ơn bạn. Còn bạn thì sao?',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Giơ ngón tay cái biểu thị "Tuyệt vời/Khỏe".'
  },
  {
    word: 'nice to meet you',
    ipa: '/naɪs tuː miːt juː/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Rất vui được gặp bạn!',
    easyEnglishExplanation: 'A polite greeting when meeting someone for the first time.',
    modelSentence: 'Hello, Tony. Nice to meet you!',
    modelSentenceVi: 'Chào Tony. Rất vui được làm quen với bạn!',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Chìa tay ra bắt tay thân thiện.'
  },
  {
    word: 'may I come in',
    ipa: '/meɪ aɪ kʌm ɪn/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Em xin phép cô cho em vào lớp ạ?',
    easyEnglishExplanation: 'A polite question to ask permission to enter the classroom.',
    modelSentence: 'May I come in, Mr. Loc? - Yes, you can.',
    modelSentenceVi: 'Thưa thầy Lộc, em xin phép vào lớp được không ạ? - Được, em vào đi.',
    category: 'Classroom Commands',
    grade: 3,
    teachingNotes: 'Đứng ngoài cửa gõ nhẹ và khoanh tay lễ phép.'
  },
  {
    word: 'may I go out',
    ipa: '/meɪ aɪ ɡəʊ aʊt/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Em xin phép ra ngoài ạ?',
    easyEnglishExplanation: 'A polite way to ask permission to leave the room.',
    modelSentence: 'May I go out, teacher? - Yes, please.',
    modelSentenceVi: 'Thưa cô, em xin phép ra ngoài được không ạ? - Được, em đi đi.',
    category: 'Classroom Commands',
    grade: 3,
    teachingNotes: 'Giơ tay xin phép trước khi rời vị trí.'
  },
  {
    word: 'what is your name',
    ipa: '/wɒt ɪz jɔː neɪm/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Tên của bạn là gì?',
    easyEnglishExplanation: 'A question to ask someone their name.',
    modelSentence: 'What is your name? - My name is Linh.',
    modelSentenceVi: 'Bạn tên là gì? - Tên mình là Linh.',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Chỉ tay nhẹ về phía bạn và hỏi bằng giọng hào hứng.'
  },
  {
    word: 'how old are you',
    ipa: '/haʊ əʊld ɑː juː/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Bạn bao nhiêu tuổi?',
    easyEnglishExplanation: 'A question to ask someone’s age in years.',
    modelSentence: 'How old are you? - I am eight years old.',
    modelSentenceVi: 'Bạn bao nhiêu tuổi? - Mình tám tuổi.',
    category: 'Daily Conversation',
    grade: 2,
    teachingNotes: 'Giơ các ngón tay tương ứng với số tuổi (6, 7, 8, 9, 10).'
  },
  {
    word: 'what is this',
    ipa: '/wɒt ɪz ðɪs/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Đây là cái gì?',
    easyEnglishExplanation: 'Used when asking about an object close to you.',
    modelSentence: 'What is this? - It is a pencil.',
    modelSentenceVi: 'Đây là cái gì? - Nó là một cây bút chì.',
    category: 'Daily Conversation',
    grade: 1,
    teachingNotes: 'Cầm một đồ vật gần tay và hỏi học sinh.'
  },
  {
    word: 'what is that',
    ipa: '/wɒt ɪz ðæt/',
    wordType: 'Sentence',
    vietnameseMeaning: 'Đó là cái gì? (ở đằng xa)',
    easyEnglishExplanation: 'Used when asking about an object far away from you.',
    modelSentence: 'What is that? - It is a clock on the wall.',
    modelSentenceVi: 'Đó là cái gì thế? - Đó là chiếc đồng hồ trên tường.',
    category: 'Daily Conversation',
    grade: 2,
    teachingNotes: 'Chỉ tay về phía xa cửa sổ hoặc bức tường.'
  },

  // ==========================================
  // 6. ANIMALS (ĐỘNG VẬT QUEN THUỘC)
  // ==========================================
  {
    word: 'cat',
    ipa: '/kæt/',
    wordType: 'Noun',
    vietnameseMeaning: 'con mèo',
    easyEnglishExplanation: 'A cute furry pet that says "meow".',
    modelSentence: 'I have a white cat. It is very cute.',
    modelSentenceVi: 'Tôi có một chú mèo trắng. Nó rất dễ thương.',
    category: 'Animals',
    grade: 1,
    teachingNotes: 'Vuốt hai má làm râu mèo và kêu "Meow meow".'
  },
  {
    word: 'dog',
    ipa: '/dɒɡ/',
    wordType: 'Noun',
    vietnameseMeaning: 'con chó, chú cún',
    easyEnglishExplanation: 'A loyal pet with four legs and a tail that barks "woof".',
    modelSentence: 'My dog likes to run and catch the ball.',
    modelSentenceVi: 'Chú chó của tôi thích chạy và bắt bóng.',
    category: 'Animals',
    grade: 1,
    teachingNotes: 'Làm động tác vẫy hai tai cún và kêu "Woof woof".'
  },
  {
    word: 'bird',
    ipa: '/bɜːd/',
    wordType: 'Noun',
    vietnameseMeaning: 'con chim',
    easyEnglishExplanation: 'An animal with feathers and wings that can fly.',
    modelSentence: 'A little bird is singing in the tree.',
    modelSentenceVi: 'Một chú chim nhỏ đang hót trên cành cây.',
    category: 'Animals',
    grade: 1,
    teachingNotes: 'Vẫy hai cánh tay bay lượn trên không.'
  },
  {
    word: 'fish',
    ipa: '/fɪʃ/',
    wordType: 'Noun',
    vietnameseMeaning: 'con cá',
    easyEnglishExplanation: 'An animal that lives and swims in water.',
    modelSentence: 'Goldfish swim in the glass bowl.',
    modelSentenceVi: 'Những chú cá vàng bơi trong bể kính.',
    category: 'Animals',
    grade: 1,
    teachingNotes: 'Úp hai lòng bàn tay vào nhau uốn lượn như cá bơi.'
  },
  {
    word: 'monkey',
    ipa: '/ˈmʌŋ.ki/',
    wordType: 'Noun',
    vietnameseMeaning: 'con khỉ',
    easyEnglishExplanation: 'A funny animal with a long tail that loves bananas and climbs trees.',
    modelSentence: 'The monkey is eating a sweet banana.',
    modelSentenceVi: 'Chú khỉ đang ăn một quả chuối ngọt.',
    category: 'Animals',
    grade: 2,
    teachingNotes: 'Gãi nách và gãi đầu mô phỏng chú khỉ tinh nghịch.'
  },
  {
    word: 'elephant',
    ipa: '/ˈel.ɪ.fənt/',
    wordType: 'Noun',
    vietnameseMeaning: 'con voi',
    easyEnglishExplanation: 'A huge grey animal with a long trunk and big ears.',
    modelSentence: 'The elephant has a long grey trunk.',
    modelSentenceVi: 'Chú voi có một chiếc vòi dài màu xám.',
    category: 'Animals',
    grade: 2,
    teachingNotes: 'Đưa một cánh tay dài trước mũi làm vòi voi đung đưa.'
  },
  {
    word: 'tiger',
    ipa: '/ˈtaɪ.ɡər/',
    wordType: 'Noun',
    vietnameseMeaning: 'con hổ, cọp',
    easyEnglishExplanation: 'A large wild orange cat with black stripes.',
    modelSentence: 'The tiger runs fast in the forest.',
    modelSentenceVi: 'Chú hổ chạy rất nhanh trong rừng sâu.',
    category: 'Animals',
    grade: 2,
    teachingNotes: 'Xòe hai vuốt sắc và gầm "Roar!".'
  },
  {
    word: 'lion',
    ipa: '/ˈlaɪ.ən/',
    wordType: 'Noun',
    vietnameseMeaning: 'con sư tử',
    easyEnglishExplanation: 'The king of animals with a big golden mane.',
    modelSentence: 'The lion sleeps under the big tree.',
    modelSentenceVi: 'Chú sư tử ngủ dưới tán cây to.',
    category: 'Animals',
    grade: 2,
    teachingNotes: 'Vuốt bờm quanh mặt và làm tiếng gầm.'
  },
  {
    word: 'rabbit',
    ipa: '/ˈræb.ɪt/',
    wordType: 'Noun',
    vietnameseMeaning: 'con thỏ',
    easyEnglishExplanation: 'A small animal with long ears that hops and loves carrots.',
    modelSentence: 'The white rabbit has long pink ears.',
    modelSentenceVi: 'Chú thỏ trắng có đôi tai dài màu hồng.',
    category: 'Animals',
    grade: 2,
    teachingNotes: 'Giơ hai ngón tay lên đầu làm tai thỏ và nhảy nhót.'
  },
  {
    word: 'duck',
    ipa: '/dʌk/',
    wordType: 'Noun',
    vietnameseMeaning: 'con vịt',
    easyEnglishExplanation: 'A water bird that swims and says "quack".',
    modelSentence: 'Five little ducks go swimming in the pond.',
    modelSentenceVi: 'Năm chú vịt con đi bơi lội trong ao.',
    category: 'Animals',
    grade: 1,
    teachingNotes: 'Chụm hai bàn tay làm mỏ vịt kêu "Quack quack".'
  },

  // ==========================================
  // 7. FOOD & DRINKS (ĐỒ ĂN & ĐỒ UỐNG)
  // ==========================================
  {
    word: 'apple',
    ipa: '/ˈæp.əl/',
    wordType: 'Noun',
    vietnameseMeaning: 'quả táo',
    easyEnglishExplanation: 'A round fruit with red or green skin and sweet juice.',
    modelSentence: 'An apple a day keeps the doctor away.',
    modelSentenceVi: 'Mỗi ngày một quả táo giúp cơ thể luôn khỏe mạnh.',
    category: 'Food & Drinks',
    grade: 1,
    teachingNotes: 'Làm động tác cắn quả táo giòn "Crunch!".'
  },
  {
    word: 'banana',
    ipa: '/bəˈnɑː.nə/',
    wordType: 'Noun',
    vietnameseMeaning: 'quả chuối',
    easyEnglishExplanation: 'A long curved yellow fruit loved by monkeys.',
    modelSentence: 'I like eating ripe yellow bananas.',
    modelSentenceVi: 'Tôi thích ăn chuối chín vàng.',
    category: 'Food & Drinks',
    grade: 1,
    teachingNotes: 'Làm động tác lột vỏ chuối và ăn.'
  },
  {
    word: 'orange',
    ipa: '/ˈɒr.ɪndʒ/',
    wordType: 'Noun',
    vietnameseMeaning: 'quả cam, màu cam',
    easyEnglishExplanation: 'A round citrus fruit full of vitamin C.',
    modelSentence: 'I drink fresh orange juice every morning.',
    modelSentenceVi: 'Tôi uống nước cam tươi mỗi buổi sáng.',
    category: 'Food & Drinks',
    grade: 1,
    teachingNotes: 'Vắt nước cam và uống một hơi ngon lành.'
  },
  {
    word: 'milk',
    ipa: '/mɪlk/',
    wordType: 'Noun',
    vietnameseMeaning: 'sữa tươi, sữa',
    easyEnglishExplanation: 'A healthy white drink from cows that makes bones strong.',
    modelSentence: 'Drink a glass of warm milk before bedtime.',
    modelSentenceVi: 'Hãy uống một ly sữa ấm trước giờ đi ngủ.',
    category: 'Food & Drinks',
    grade: 1,
    teachingNotes: 'Cầm cốc sữa và uống ừng ực: "Yummy!".'
  },
  {
    word: 'water',
    ipa: '/ˈwɔː.tər/',
    wordType: 'Noun',
    vietnameseMeaning: 'nước lọc, nước uống',
    easyEnglishExplanation: 'Clear liquid that all people and plants need to live.',
    modelSentence: 'Drink plenty of clean water every day.',
    modelSentenceVi: 'Hãy uống nhiều nước sạch mỗi ngày.',
    category: 'Food & Drinks',
    grade: 1,
    teachingNotes: 'Rót nước vào ly và uống giải khát.'
  },
  {
    word: 'bread',
    ipa: '/bred/',
    wordType: 'Noun',
    vietnameseMeaning: 'bánh mì',
    easyEnglishExplanation: 'A baked food made of flour, water and yeast.',
    modelSentence: 'I eat bread and eggs for breakfast.',
    modelSentenceVi: 'Tôi ăn bánh mì và trứng cho bữa sáng.',
    category: 'Food & Drinks',
    grade: 2,
    teachingNotes: 'Cắt lát bánh mì và phết bơ thơm phức.'
  },
  {
    word: 'rice',
    ipa: '/raɪs/',
    wordType: 'Noun',
    vietnameseMeaning: 'cơm, gạo',
    easyEnglishExplanation: 'Small white grains that are the main food in Vietnam.',
    modelSentence: 'We have hot rice with fish and soup.',
    modelSentenceVi: 'Chúng tôi ăn cơm nóng với cá và canh.',
    category: 'Food & Drinks',
    grade: 2,
    teachingNotes: 'Cầm bát cơm và đôi đũa gắp cơm.'
  },
  {
    word: 'chicken',
    ipa: '/ˈtʃɪk.ɪn/',
    wordType: 'Noun',
    vietnameseMeaning: 'thịt gà, con gà',
    easyEnglishExplanation: 'Meat from a chicken or a farm bird.',
    modelSentence: 'Fried chicken is my favorite dish.',
    modelSentenceVi: 'Gà rán là món ăn khoái khẩu của tôi.',
    category: 'Food & Drinks',
    grade: 2,
    teachingNotes: 'Vỗ hai khuỷu tay làm cánh gà kêu "Cluck cluck".'
  },
  {
    word: 'pizza',
    ipa: '/ˈpiːt.sə/',
    wordType: 'Noun',
    vietnameseMeaning: 'bánh pi-da, bánh pizza',
    easyEnglishExplanation: 'A flat round baked bread topped with cheese and tomato sauce.',
    modelSentence: 'We eat delicious pizza on weekends.',
    modelSentenceVi: 'Chúng tôi ăn pizza thơm ngon vào cuối tuần.',
    category: 'Food & Drinks',
    grade: 3,
    teachingNotes: 'Cắt bánh pizza thành các miếng tam giác.'
  },
  {
    word: 'ice cream',
    ipa: '/ˌaɪs ˈkriːm/',
    wordType: 'Noun',
    vietnameseMeaning: 'kem, que kem',
    easyEnglishExplanation: 'A sweet cold food made from milk and fruit.',
    modelSentence: 'Chocolate ice cream is very sweet and cool.',
    modelSentenceVi: 'Kem sô-cô-la rất ngọt và mát lạnh.',
    category: 'Food & Drinks',
    grade: 2,
    teachingNotes: 'Cầm que kem liếm ngon lành: "Delicious!".'
  },

  // ==========================================
  // 8. FAMILY & PEOPLE (GIA ĐÌNH & CON NGƯỜI)
  // ==========================================
  {
    word: 'family',
    ipa: '/ˈfæm.əl.i/',
    wordType: 'Noun',
    vietnameseMeaning: 'gia đình',
    easyEnglishExplanation: 'The parents and children who live together with love.',
    modelSentence: 'I love my happy family very much.',
    modelSentenceVi: 'Tôi yêu gia đình hạnh phúc của mình rất nhiều.',
    category: 'Family & People',
    grade: 1,
    teachingNotes: 'Vẽ hình trái tim ôm lấy các thành viên trong gia đình.'
  },
  {
    word: 'mother',
    ipa: '/ˈmʌð.ər/',
    wordType: 'Noun',
    vietnameseMeaning: 'mẹ, người mẹ',
    easyEnglishExplanation: 'A female parent who loves and cares for you.',
    modelSentence: 'My mother is a lovely teacher.',
    modelSentenceVi: 'Mẹ của tôi là một cô giáo đáng mến.',
    category: 'Family & People',
    grade: 1,
    teachingNotes: 'Chỉ tay vào ảnh người mẹ dịu hiền.'
  },
  {
    word: 'father',
    ipa: '/ˈfɑː.ðər/',
    wordType: 'Noun',
    vietnameseMeaning: 'bố, người cha',
    easyEnglishExplanation: 'A male parent who protects and supports the family.',
    modelSentence: 'My father is tall and strong.',
    modelSentenceVi: 'Bố tôi cao lớn và rất khỏe mạnh.',
    category: 'Family & People',
    grade: 1,
    teachingNotes: 'Gồng bắp tay biểu thị sự mạnh mẽ của người bố.'
  },
  {
    word: 'brother',
    ipa: '/ˈbrʌð.ər/',
    wordType: 'Noun',
    vietnameseMeaning: 'anh trai, em trai',
    easyEnglishExplanation: 'A boy or man who has the same parents as you.',
    modelSentence: 'My brother plays football with me.',
    modelSentenceVi: 'Anh trai tôi chơi bóng đá cùng với tôi.',
    category: 'Family & People',
    grade: 2,
    teachingNotes: 'Chỉ vào bạn nam bên cạnh.'
  },
  {
    word: 'sister',
    ipa: '/ˈsɪs.tər/',
    wordType: 'Noun',
    vietnameseMeaning: 'chị gái, em gái',
    easyEnglishExplanation: 'A girl or woman who has the same parents as you.',
    modelSentence: 'My sister is five years old.',
    modelSentenceVi: 'Em gái của tôi năm tuổi.',
    category: 'Family & People',
    grade: 2,
    teachingNotes: 'Chỉ vào bạn nữ bên cạnh.'
  },
  {
    word: 'grandfather',
    ipa: '/ˈɡræn.fɑː.ðər/',
    wordType: 'Noun',
    vietnameseMeaning: 'ông nội, ông ngoại',
    easyEnglishExplanation: 'The father of your father or mother.',
    modelSentence: 'My grandfather likes to read newspapers.',
    modelSentenceVi: 'Ông của tôi thích đọc báo.',
    category: 'Family & People',
    grade: 2,
    teachingNotes: 'Làm động tác chống gậy và vuốt râu dài.'
  },
  {
    word: 'grandmother',
    ipa: '/ˈɡræn.mʌð.ər/',
    wordType: 'Noun',
    vietnameseMeaning: 'bà nội, bà ngoại',
    easyEnglishExplanation: 'The mother of your father or mother.',
    modelSentence: 'My grandmother tells wonderful bedtime stories.',
    modelSentenceVi: 'Bà của tôi kể những câu chuyện cổ tích tuyệt vời.',
    category: 'Family & People',
    grade: 2,
    teachingNotes: 'Đeo kính lão và mỉm cười hiền hậu.'
  },
  {
    word: 'baby',
    ipa: '/ˈbeɪ.bi/',
    wordType: 'Noun',
    vietnameseMeaning: 'em bé, đứa trẻ sơ sinh',
    easyEnglishExplanation: 'A very young child who cannot walk or talk yet.',
    modelSentence: 'The cute baby is sleeping in the bed.',
    modelSentenceVi: 'Em bé dễ thương đang ngủ trên giường.',
    category: 'Family & People',
    grade: 1,
    teachingNotes: 'Hai tay bồng em bé và đung đưa nhẹ nhàng: "Ru hời ru hỡi".'
  },
  {
    word: 'friend',
    ipa: '/frend/',
    wordType: 'Noun',
    vietnameseMeaning: 'bạn bè, người bạn',
    easyEnglishExplanation: 'Someone you know well, like, and play with.',
    modelSentence: 'Nam is my best friend at school.',
    modelSentenceVi: 'Nam là người bạn thân nhất của tôi ở trường.',
    category: 'Family & People',
    grade: 1,
    teachingNotes: 'Khoác vai bạn cùng bàn và mỉm cười.'
  },
  {
    word: 'teacher',
    ipa: '/ˈtiː.tʃər/',
    wordType: 'Noun',
    vietnameseMeaning: 'thầy giáo, cô giáo',
    easyEnglishExplanation: 'A person whose job is to teach students in school.',
    modelSentence: 'Good morning, teacher!',
    modelSentenceVi: 'Kính chào thầy/cô giáo buổi sáng ạ!',
    category: 'Family & People',
    grade: 1,
    teachingNotes: 'Khoanh tay cúi chào thầy cô giáo.'
  },
  {
    word: 'student',
    ipa: '/ˈstjuː.dənt/',
    wordType: 'Noun',
    vietnameseMeaning: 'học sinh, học viên',
    easyEnglishExplanation: 'A person who is studying at school.',
    modelSentence: 'We are good students in Grade 3.',
    modelSentenceVi: 'Chúng tôi là những học sinh chăm ngoan lớp 3.',
    category: 'Family & People',
    grade: 2,
    teachingNotes: 'Chỉ tay vào chính mình: "I am a student."'
  },
  {
    word: 'doctor',
    ipa: '/ˈdɒk.tər/',
    wordType: 'Noun',
    vietnameseMeaning: 'bác sĩ (khám chữa bệnh)',
    easyEnglishExplanation: 'A person who makes sick people well again.',
    modelSentence: 'The doctor works in the big hospital.',
    modelSentenceVi: 'Bác sĩ làm việc trong bệnh viện lớn.',
    category: 'Family & People',
    grade: 3,
    teachingNotes: 'Đeo ống nghe khám bệnh lên ngực: "Thump, thump".'
  },
  {
    word: 'nurse',
    ipa: '/nɜːs/',
    wordType: 'Noun',
    vietnameseMeaning: 'y tá, điều dưỡng',
    easyEnglishExplanation: 'A person who cares for sick people alongside doctors.',
    modelSentence: 'The nurse is very kind and gentle.',
    modelSentenceVi: 'Cô y tá rất ân cần và dịu dàng.',
    category: 'Family & People',
    grade: 3,
    teachingNotes: 'Làm động tác đo nhiệt độ trán.'
  },

  // ==========================================
  // 9. BODY PARTS (BỘ PHẬN CƠ THỂ)
  // ==========================================
  {
    word: 'ear',
    ipa: '/ɪər/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái tai (dùng để nghe)',
    easyEnglishExplanation: 'The organ on either side of the head used for hearing.',
    modelSentence: 'I have two ears to listen.',
    modelSentenceVi: 'Tôi có hai cái tai để lắng nghe.',
    category: 'Body Parts',
    grade: 1,
    teachingNotes: 'Chạm nhẹ vào hai tai: "Touch your ears!"'
  },
  {
    word: 'eye',
    ipa: '/aɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'con mắt (dùng để nhìn)',
    easyEnglishExplanation: 'The organ on your face used for seeing.',
    modelSentence: 'Close your eyes and make a wish.',
    modelSentenceVi: 'Hãy nhắm mắt lại và ước một điều ước.',
    category: 'Body Parts',
    grade: 1,
    teachingNotes: 'Chớp mắt và chỉ tay vào mắt: "Touch your eyes!"'
  },
  {
    word: 'nose',
    ipa: '/nəʊz/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái mũi (dùng để ngửi và thở)',
    easyEnglishExplanation: 'The part on your face between eyes and mouth used for smelling.',
    modelSentence: 'My nose smells the sweet flower.',
    modelSentenceVi: 'Mũi tôi ngửi thấy hương hoa thơm ngát.',
    category: 'Body Parts',
    grade: 1,
    teachingNotes: 'Chạm tay vào mũi: "Touch your nose!"'
  },
  {
    word: 'mouth',
    ipa: '/maʊθ/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái miệng, cái mồm (dùng để nói và ăn)',
    easyEnglishExplanation: 'The opening on your face used for eating, speaking and smiling.',
    modelSentence: 'Open your mouth and say Ah!',
    modelSentenceVi: 'Hãy mở miệng ra và nói A nào!',
    category: 'Body Parts',
    grade: 1,
    teachingNotes: 'Mở rộng miệng cười tươi: "Open your mouth!"'
  },
  {
    word: 'hand',
    ipa: '/hænd/',
    wordType: 'Noun',
    vietnameseMeaning: 'bàn tay',
    easyEnglishExplanation: 'The part at the end of your arm with five fingers.',
    modelSentence: 'Wash your hands before eating.',
    modelSentenceVi: 'Hãy rửa sạch hai bàn tay trước khi ăn.',
    category: 'Body Parts',
    grade: 1,
    teachingNotes: 'Xòe hai bàn tay và vỗ tay theo nhịp: "Clap your hands!"'
  },
  {
    word: 'arm',
    ipa: '/ɑːm/',
    wordType: 'Noun',
    vietnameseMeaning: 'cánh tay',
    easyEnglishExplanation: 'The two long parts of your body from your shoulders to your hands.',
    modelSentence: 'Raise your arms up high!',
    modelSentenceVi: 'Hãy giơ hai cánh tay lên thật cao!',
    category: 'Body Parts',
    grade: 2,
    teachingNotes: 'Giơ hai cánh tay thẳng đứng lên trời.'
  },
  {
    word: 'leg',
    ipa: '/leɡ/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái chân (từ hông đến bàn chân)',
    easyEnglishExplanation: 'The two body parts you use for standing, walking and running.',
    modelSentence: 'I have two strong legs.',
    modelSentenceVi: 'Tôi có hai cái chân thật khỏe mạnh.',
    category: 'Body Parts',
    grade: 2,
    teachingNotes: 'Dậm chân tại chỗ: "Stamp your feet!"'
  },
  {
    word: 'foot',
    ipa: '/fʊt/',
    wordType: 'Noun',
    vietnameseMeaning: 'bàn chân (số nhiều: feet)',
    easyEnglishExplanation: 'The bottom part of your leg that touches the ground.',
    modelSentence: 'Kick the ball with your right foot.',
    modelSentenceVi: 'Hãy sút bóng bằng bàn chân phải của em.',
    category: 'Body Parts',
    grade: 2,
    teachingNotes: 'Lưu ý số ít là foot, số nhiều là feet.'
  },
  {
    word: 'head',
    ipa: '/hed/',
    wordType: 'Noun',
    vietnameseMeaning: 'cái đầu',
    easyEnglishExplanation: 'The top part of your body containing your brain, eyes, ears, and mouth.',
    modelSentence: 'Nod your head to say Yes.',
    modelSentenceVi: 'Hãy gật đầu để nói Đồng ý.',
    category: 'Body Parts',
    grade: 1,
    teachingNotes: 'Gật đầu nhẹ nhàng: "Nod your head."'
  },
  {
    word: 'hair',
    ipa: '/heər/',
    wordType: 'Noun',
    vietnameseMeaning: 'mái tóc, sợi tóc',
    easyEnglishExplanation: 'The thin threads growing on your head.',
    modelSentence: 'She has long black hair.',
    modelSentenceVi: 'Cô ấy có mái tóc dài màu đen.',
    category: 'Body Parts',
    grade: 2,
    teachingNotes: 'Vuốt nhẹ mái tóc.'
  },

  // ==========================================
  // 10. COLORS, NUMBERS & TIME (MÀU SẮC, SỐ ĐẾM & THỜI GIAN)
  // ==========================================
  {
    word: 'red',
    ipa: '/red/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu đỏ',
    easyEnglishExplanation: 'The color of ripe apples and tomatoes.',
    modelSentence: 'The rose is bright red.',
    modelSentenceVi: 'Bông hoa hồng có màu đỏ rực rỡ.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ vào vật màu đỏ trong lớp học.'
  },
  {
    word: 'blue',
    ipa: '/bluː/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu xanh da trời, xanh dương',
    easyEnglishExplanation: 'The color of the clear sky and deep sea.',
    modelSentence: 'The sky is blue and sunny.',
    modelSentenceVi: 'Bầu trời màu xanh biếc và ngập tràn ánh nắng.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ tay lên bầu trời ngoài cửa sổ.'
  },
  {
    word: 'yellow',
    ipa: '/ˈjel.əʊ/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu vàng',
    easyEnglishExplanation: 'The color of the sun, lemons and ripe bananas.',
    modelSentence: 'The sun shines in warm yellow.',
    modelSentenceVi: 'Mặt trời chiếu những tia nắng vàng ấm áp.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ vào quả chuối hoặc mặt trời.'
  },
  {
    word: 'green',
    ipa: '/ɡriːn/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu xanh lá cây',
    easyEnglishExplanation: 'The color of fresh grass and tree leaves.',
    modelSentence: 'The frog is bright green.',
    modelSentenceVi: 'Chú ếch có màu xanh lá cây rực rỡ.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ vào chậu cây xanh trong lớp.'
  },
  {
    word: 'pink',
    ipa: '/pɪŋk/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu hồng',
    easyEnglishExplanation: 'A soft color between red and white, like lotus flowers.',
    modelSentence: 'She wears a pretty pink dress.',
    modelSentenceVi: 'Cô bé mặc một chiếc váy màu hồng xinh xắn.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ vào hoa sen hoặc đồ vật màu hồng.'
  },
  {
    word: 'black',
    ipa: '/blæk/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu đen',
    easyEnglishExplanation: 'The darkest color, like the blackboard or night.',
    modelSentence: 'I have a pair of black shoes.',
    modelSentenceVi: 'Tôi có một đôi giày màu đen.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ vào bảng đen của lớp học.'
  },
  {
    word: 'white',
    ipa: '/waɪt/',
    wordType: 'Adjective',
    vietnameseMeaning: 'màu trắng',
    easyEnglishExplanation: 'The color of milk, snow and blank paper.',
    modelSentence: 'The clouds in the sky are white.',
    modelSentenceVi: 'Những đám mây trên bầu trời có màu trắng muốt.',
    category: 'Colors & Shapes',
    grade: 1,
    teachingNotes: 'Chỉ vào tờ giấy trắng hoặc bảng trắng.'
  },
  {
    word: 'one',
    ipa: '/wʌn/',
    wordType: 'Number',
    vietnameseMeaning: 'số một (1)',
    easyEnglishExplanation: 'The number 1.',
    modelSentence: 'I have one nose and one mouth.',
    modelSentenceVi: 'Tôi có một chiếc mũi và một cái miệng.',
    category: 'Numbers & Time',
    grade: 1,
    teachingNotes: 'Giơ 1 ngón tay trỏ thẳng đứng.'
  },
  {
    word: 'two',
    ipa: '/tuː/',
    wordType: 'Number',
    vietnameseMeaning: 'số hai (2)',
    easyEnglishExplanation: 'The number 2 (1 + 1).',
    modelSentence: 'I have two eyes and two ears.',
    modelSentenceVi: 'Tôi có hai con mắt và hai cái tai.',
    category: 'Numbers & Time',
    grade: 1,
    teachingNotes: 'Giơ 2 ngón tay hình chữ V (Peace sign).'
  },
  {
    word: 'three',
    ipa: '/θriː/',
    wordType: 'Number',
    vietnameseMeaning: 'số ba (3)',
    easyEnglishExplanation: 'The number 3.',
    modelSentence: 'There are three birds in the tree.',
    modelSentenceVi: 'Có ba chú chim đang đậu trên cây.',
    category: 'Numbers & Time',
    grade: 1,
    teachingNotes: 'Đặt lưỡi giữa hai hàm răng phát âm âm /θ/.'
  },
  {
    word: 'four',
    ipa: '/fɔːr/',
    wordType: 'Number',
    vietnameseMeaning: 'số bốn (4)',
    easyEnglishExplanation: 'The number 4.',
    modelSentence: 'A dog has four legs.',
    modelSentenceVi: 'Một chú chó có bốn cái chân.',
    category: 'Numbers & Time',
    grade: 1,
    teachingNotes: 'Giơ 4 ngón tay xòe đều.'
  },
  {
    word: 'five',
    ipa: '/faɪv/',
    wordType: 'Number',
    vietnameseMeaning: 'số năm (5)',
    easyEnglishExplanation: 'The number 5, all fingers on one hand.',
    modelSentence: 'Give me a high five!',
    modelSentenceVi: 'Đập tay ăn mừng nào (High five)!',
    category: 'Numbers & Time',
    grade: 1,
    teachingNotes: 'Xòe trọn vẹn 5 ngón tay đập tay với học sinh: "High five!"'
  },
  {
    word: 'Monday',
    ipa: '/ˈmʌn.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Thứ Hai (ngày đầu tuần)',
    easyEnglishExplanation: 'The first day of the school week.',
    modelSentence: 'We have flag salute on Monday morning.',
    modelSentenceVi: 'Chúng tôi làm lễ chào cờ vào sáng thứ Hai.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Chỉ vào ngày đầu tiên trong thời khóa biểu tuần.'
  },
  {
    word: 'Tuesday',
    ipa: '/ˈtʃuːz.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Thứ Ba',
    easyEnglishExplanation: 'The day after Monday.',
    modelSentence: 'I study English on Tuesday.',
    modelSentenceVi: 'Tôi học tiếng Anh vào thứ Ba.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Học sinh đọc theo nhịp các ngày trong tuần.'
  },
  {
    word: 'Wednesday',
    ipa: '/ˈwenz.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Thứ Tư',
    easyEnglishExplanation: 'The middle day of the school week.',
    modelSentence: 'We have Art and Music on Wednesday.',
    modelSentenceVi: 'Chúng tôi có môn Mỹ thuật và Âm nhạc vào thứ Tư.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Lưu ý chữ d câm, đọc là /ˈwenz.deɪ/.'
  },
  {
    word: 'Thursday',
    ipa: '/ˈθɜːz.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Thứ Năm',
    easyEnglishExplanation: 'The day before Friday.',
    modelSentence: 'On Thursday, we practice sports in PE.',
    modelSentenceVi: 'Vào thứ Năm, chúng tôi rèn luyện thể thao trong giờ Thể dục.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Luyện âm /θ/ đầu từ.'
  },
  {
    word: 'Friday',
    ipa: '/ˈfraɪ.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Thứ Sáu (ngày học cuối tuần)',
    easyEnglishExplanation: 'The last day of the school week before the weekend.',
    modelSentence: 'Friday is a happy day because tomorrow is the weekend.',
    modelSentenceVi: 'Thứ Sáu là một ngày vui vì ngày mai đã là cuối tuần.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Mỉm cười vỗ tay chào đón cuối tuần.'
  },
  {
    word: 'Saturday',
    ipa: '/ˈsæt.ə.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Thứ Bảy',
    easyEnglishExplanation: 'The first day of the weekend.',
    modelSentence: 'I go to the park with my family on Saturday.',
    modelSentenceVi: 'Tôi đi công viên cùng gia đình vào thứ Bảy.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Làm động tác đi chơi dã ngoại.'
  },
  {
    word: 'Sunday',
    ipa: '/ˈsʌn.deɪ/',
    wordType: 'Noun',
    vietnameseMeaning: 'Chủ Nhật (ngày nghỉ ngơi)',
    easyEnglishExplanation: 'The second day of the weekend.',
    modelSentence: 'On Sunday, I visit my grandparents.',
    modelSentenceVi: 'Vào Chủ Nhật, tôi về quê thăm ông bà.',
    category: 'Numbers & Time',
    grade: 3,
    teachingNotes: 'Vẽ mặt trời tỏa sáng rực rỡ.'
  }
];

// Helper index map for high-speed instant offline lookups
const FAST_LOOKUP_MAP = new Map<string, DictionaryEntry>();

PRIMARY_DICTIONARY_ENTRIES.forEach(entry => {
  const normWord = entry.word.toLowerCase().trim();
  FAST_LOOKUP_MAP.set(normWord, entry);
  
  // Strip punctuation & extra spaces
  const cleanWord = normWord.replace(/[.,?!:;'"()]/g, '').trim();
  if (!FAST_LOOKUP_MAP.has(cleanWord)) {
    FAST_LOOKUP_MAP.set(cleanWord, entry);
  }
});

/**
 * Tra nhanh từ điển tiếng Anh tiểu học tức thì (Offline)
 */
export function lookupPrimaryDictionaryOffline(rawQuery: string): DictionaryEntry | null {
  if (!rawQuery || typeof rawQuery !== 'string') return null;
  const q = rawQuery.toLowerCase().trim().replace(/^[.,?!:;'"()]+|[.,?!:;'"()]+$/g, '').trim();
  if (!q) return null;

  // 1. Exact match
  if (FAST_LOOKUP_MAP.has(q)) {
    return FAST_LOOKUP_MAP.get(q)!;
  }

  // 2. Singular / Plural variation
  if (q.endsWith('s') && FAST_LOOKUP_MAP.has(q.slice(0, -1))) {
    return FAST_LOOKUP_MAP.get(q.slice(0, -1))!;
  }
  if (q.endsWith('es') && FAST_LOOKUP_MAP.has(q.slice(0, -2))) {
    return FAST_LOOKUP_MAP.get(q.slice(0, -2))!;
  }
  if (q.endsWith('ing') && FAST_LOOKUP_MAP.has(q.slice(0, -3))) {
    return FAST_LOOKUP_MAP.get(q.slice(0, -3))!;
  }
  if (q.endsWith('ed') && FAST_LOOKUP_MAP.has(q.slice(0, -2))) {
    return FAST_LOOKUP_MAP.get(q.slice(0, -2))!;
  }

  // 3. Partial phrase or start-with search
  for (const entry of PRIMARY_DICTIONARY_ENTRIES) {
    const entryLow = entry.word.toLowerCase();
    if (entryLow === q || entryLow.startsWith(q) || q.startsWith(entryLow)) {
      return entry;
    }
  }

  return null;
}
