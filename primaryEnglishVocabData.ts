/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnglishVocabItem, EnglishVocabPackage } from '../types';

export const PRIMARY_VOCAB_TOPICS = [
  { id: 'school_things', name: 'Đồ dùng học tập (School Things)', icon: '✏️', category: 'School things' },
  { id: 'body_parts', name: 'Bộ phận cơ thể (Body Parts)', icon: '👂', category: 'Body parts' },
  { id: 'animals', name: 'Động vật quen thuộc (Animals)', icon: '🐶', category: 'Animals' },
  { id: 'food_drinks', name: 'Đồ ăn & Thức uống (Food & Drinks)', icon: '🍎', category: 'Food' },
  { id: 'family', name: 'Gia đình yêu thương (Family)', icon: '👨‍👩‍👧', category: 'Family' },
  { id: 'jobs', name: 'Nghề nghiệp (Jobs)', icon: '👩‍🏫', category: 'Jobs' },
  { id: 'places', name: 'Địa điểm xung quanh (Places)', icon: '🏥', category: 'Places' },
  { id: 'activities', name: 'Hành động & Hoạt động (Activities)', icon: '🏊‍♂️', category: 'Activities' },
  { id: 'weather', name: 'Thời tiết & Thiên nhiên (Weather)', icon: '☀️', category: 'Weather' },
  { id: 'feelings', name: 'Cảm xúc (Feelings)', icon: '😊', category: 'Feelings' },
  { id: 'clothes', name: 'Trang phục (Clothes)', icon: '👕', category: 'Clothes' },
  { id: 'house', name: 'Nhà cửa & Đồ đạc (House & Furniture)', icon: '🏠', category: 'House' }
];

// Curated kid-friendly illustration image links (Unsplash high quality primary education tags)
export const VOCAB_IMAGE_MAP: Record<string, string> = {
  ear: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
  pencil: 'https://images.unsplash.com/photo-1585336261026-0e1d51a6db57?w=600&auto=format&fit=crop&q=80',
  teacher: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
  hospital: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80',
  swim: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80',
  apple: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
  dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
  book: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
  ruler: 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?w=600&auto=format&fit=crop&q=80',
  eraser: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80',
  eye: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
  nose: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80',
  mouth: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
  hand: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
  bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80',
  fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
  milk: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
  doctor: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
  nurse: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
  school: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
  park: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&auto=format&fit=crop&q=80',
  zoo: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600&auto=format&fit=crop&q=80',
  sunny: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
  rainy: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&auto=format&fit=crop&q=80',
  happy: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
  run: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
  read: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
  sing: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80'
};

export const DEFAULT_SAMPLE_PACKAGES: EnglishVocabPackage[] = [
  {
    id: 'sample_body_parts',
    title: 'Bộ phận cơ thể - Body Parts (Tiểu học Chuẩn)',
    grade: 3,
    category: 'Body parts',
    unitLesson: 'Unit 4: Our Body',
    bookSeries: 'Global Success',
    createdAt: '2026-08-22T08:00:00Z',
    words: [
      {
        id: 'v_ear_01',
        word: 'ear',
        pronunciation: '/ɪər/',
        wordType: 'Noun',
        category: 'Body parts',
        easyEnglishExplanation: "It's a body part. We use it to hear.",
        vietnameseMeaning: 'cái tai',
        imageUrl: VOCAB_IMAGE_MAP.ear,
        modelSentence: 'I have two ears.',
        grade: 3,
        teachingNotes: 'GV chỉ tay vào tai và làm động tác lắng nghe (Listen). Elicit: "Touch your ears!"'
      },
      {
        id: 'v_eye_02',
        word: 'eye',
        pronunciation: '/aɪ/',
        wordType: 'Noun',
        category: 'Body parts',
        easyEnglishExplanation: "It's a body part. We use it to see things.",
        vietnameseMeaning: 'con mắt',
        imageUrl: VOCAB_IMAGE_MAP.eye,
        modelSentence: 'She has big brown eyes.',
        grade: 3,
        teachingNotes: 'GV chỉ vào mắt và làm động tác nhìn ngắm xung quanh (Look/See).'
      },
      {
        id: 'v_nose_03',
        word: 'nose',
        pronunciation: '/nəʊz/',
        wordType: 'Noun',
        category: 'Body parts',
        easyEnglishExplanation: "It's on your face. We use it to smell flowers.",
        vietnameseMeaning: 'cái mũi',
        imageUrl: VOCAB_IMAGE_MAP.nose,
        modelSentence: 'Touch your nose!',
        grade: 3,
        teachingNotes: 'GV hướng dẫn học sinh làm động tác ngửi hoa (Smell).'
      },
      {
        id: 'v_mouth_04',
        word: 'mouth',
        pronunciation: '/maʊθ/',
        wordType: 'Noun',
        category: 'Body parts',
        easyEnglishExplanation: "It's on your face. We use it to eat and talk.",
        vietnameseMeaning: 'cái miệng',
        imageUrl: VOCAB_IMAGE_MAP.mouth,
        modelSentence: 'Open your mouth and say Ah.',
        grade: 3,
        teachingNotes: 'Luyện âm cuối /θ/ thổi hơi nhẹ.'
      },
      {
        id: 'v_hand_05',
        word: 'hand',
        pronunciation: '/hænd/',
        wordType: 'Noun',
        category: 'Body parts',
        easyEnglishExplanation: "It has five fingers. We use it to hold things.",
        vietnameseMeaning: 'bàn tay',
        imageUrl: VOCAB_IMAGE_MAP.hand,
        modelSentence: 'Wash your hands before eating.',
        grade: 3,
        teachingNotes: 'Học sinh vỗ tay và xòe 5 ngón tay: "Clap your hands!"'
      }
    ]
  },
  {
    id: 'sample_school_things',
    title: 'Đồ dùng học tập - School Things',
    grade: 2,
    category: 'School things',
    unitLesson: 'Unit 3: In the Classroom',
    bookSeries: 'Global Success',
    createdAt: '2026-08-22T08:00:00Z',
    words: [
      {
        id: 'v_pencil_01',
        word: 'pencil',
        pronunciation: '/ˈpensl/',
        wordType: 'Noun',
        category: 'School things',
        easyEnglishExplanation: "It's a school thing. We use it to write and draw.",
        vietnameseMeaning: 'bút chì',
        imageUrl: VOCAB_IMAGE_MAP.pencil,
        modelSentence: 'I have a yellow pencil.',
        grade: 2,
        teachingNotes: 'GV giơ bút chì và làm động tác vẽ nhẹ nhàng.'
      },
      {
        id: 'v_book_02',
        word: 'book',
        pronunciation: '/bʊk/',
        wordType: 'Noun',
        category: 'School things',
        easyEnglishExplanation: "It has many pages. We open it to read stories.",
        vietnameseMeaning: 'quyển sách',
        imageUrl: VOCAB_IMAGE_MAP.book,
        modelSentence: 'Open your English book, please.',
        grade: 2,
        teachingNotes: 'Cả lớp cùng làm hành động mở sách: "Open your book!"'
      },
      {
        id: 'v_ruler_03',
        word: 'ruler',
        pronunciation: '/ˈruːlə(r)/',
        wordType: 'Noun',
        category: 'School things',
        easyEnglishExplanation: "It is long and straight. We use it to draw lines.",
        vietnameseMeaning: 'cây thước kẻ',
        imageUrl: VOCAB_IMAGE_MAP.ruler,
        modelSentence: 'This ruler is blue.',
        grade: 2,
        teachingNotes: 'GV giơ thước kẻ và chỉ tay kẻ một đường thẳng trên không.'
      },
      {
        id: 'v_eraser_04',
        word: 'eraser',
        pronunciation: '/ɪˈreɪzə(r)/',
        wordType: 'Noun',
        category: 'School things',
        easyEnglishExplanation: "It is small. We use it to clean pencil marks.",
        vietnameseMeaning: 'cục tẩy / gôm',
        imageUrl: VOCAB_IMAGE_MAP.eraser,
        modelSentence: 'May I borrow your eraser?',
        grade: 2,
        teachingNotes: 'Làm động tác tẩy vết vẽ trên giấy.'
      }
    ]
  },
  {
    id: 'sample_jobs_places',
    title: 'Nghề nghiệp & Địa điểm - Jobs & Places',
    grade: 4,
    category: 'Jobs',
    unitLesson: 'Unit 6: Our Jobs & Places',
    bookSeries: 'Global Success',
    createdAt: '2026-08-22T08:00:00Z',
    words: [
      {
        id: 'v_teacher_01',
        word: 'teacher',
        pronunciation: '/ˈtiːtʃə(r)/',
        wordType: 'Noun',
        category: 'Jobs',
        easyEnglishExplanation: "This person works at a school. This person helps students learn.",
        vietnameseMeaning: 'giáo viên / thầy cô giáo',
        imageUrl: VOCAB_IMAGE_MAP.teacher,
        modelSentence: 'My mother is a teacher at my school.',
        grade: 4,
        teachingNotes: 'Học sinh chỉ vào cô giáo / thầy giáo: "She is our teacher!"'
      },
      {
        id: 'v_hospital_02',
        word: 'hospital',
        pronunciation: '/ˈhɒspɪtl/',
        wordType: 'Noun',
        category: 'Places',
        easyEnglishExplanation: "It's a big place. Doctors and nurses help sick people there.",
        vietnameseMeaning: 'bệnh viện',
        imageUrl: VOCAB_IMAGE_MAP.hospital,
        modelSentence: 'My uncle works at a big hospital.',
        grade: 4,
        teachingNotes: 'Elicit: "Where do doctors work?" -> "At a hospital."'
      },
      {
        id: 'v_doctor_03',
        word: 'doctor',
        pronunciation: '/ˈdɒktə(r)/',
        wordType: 'Noun',
        category: 'Jobs',
        easyEnglishExplanation: "This person wears a white coat. This person helps you feel better when you are sick.",
        vietnameseMeaning: 'bác sĩ',
        imageUrl: VOCAB_IMAGE_MAP.doctor,
        modelSentence: 'I want to be a doctor in the future.',
        grade: 4,
        teachingNotes: 'Làm động tác khám bệnh với ống nghe.'
      },
      {
        id: 'v_swim_04',
        word: 'swim',
        pronunciation: '/swɪm/',
        wordType: 'Verb',
        category: 'Activities',
        easyEnglishExplanation: "It's an action. We move our arms and legs in water.",
        vietnameseMeaning: 'bơi lội',
        imageUrl: VOCAB_IMAGE_MAP.swim,
        modelSentence: 'I like to swim on hot sunny days.',
        grade: 4,
        teachingNotes: 'Cả lớp cùng thực hiện động tác quạt tay bơi lội (TPR).'
      }
    ]
  }
];
