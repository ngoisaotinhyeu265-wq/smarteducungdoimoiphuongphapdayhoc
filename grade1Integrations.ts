import { UnitIntegrationRule } from '../lessonSpecificIntegrations';

export const G1_SPECIFIC_INTEGRATIONS: Record<string, Partial<UnitIntegrationRule>> = {
  'Starter': {
    unitTitle: 'Starter: Getting Started & Classroom Commands',
    theme: 'Làm quen & Khởi động đầu năm',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn các khẩu lệnh khởi động: "Stand up, Sit down, Listen, Look, Open your book, Close your book"; AI nhận diện phản xạ TPR của học sinh.',
        nlsDesc: 'Khám phá giao diện kho học liệu số sachmem.vn / taphuan.nxbgd.vn; thao tác chạm/click biểu tượng âm thanh trên màn hình cảm ứng.',
        atgtDesc: '🚦 Giáo dục nề nếp xếp hàng ra vào lớp an toàn, không xô đẩy bạn ở cửa lớp và hành lang trường học.',
        knsDesc: 'Kỹ năng tập trung chú ý, lắng nghe hiệu lệnh của giáo viên và hòa nhập môi trường tiểu học.',
        ethicsDesc: '❤️ Phẩm chất Lễ phép & Kỷ luật: Vâng lời thầy cô, thực hiện đúng nội quy lớp học.',
        devicesDesc: 'SGK Tiếng Anh 1, Loa bluetooth, Thẻ biểu tượng khẩu lệnh, TV cảm ứng.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'Trò chơi AI "Simon Says" tương tác giọng nói nhận diện phản xạ khẩu lệnh lớp học của học sinh.',
        nlsDesc: 'Chơi trò chơi số hóa kéo thả khẩu lệnh đúng với hình ảnh minh họa trên Wordwall.',
        atgtDesc: 'Nề nếp di chuyển an toàn khi tham gia trò chơi vận động trong không gian lớp học.',
        knsDesc: 'Kỹ năng hợp tác nhóm, tự tin thể hiện động tác trước bạn bè.',
        ethicsDesc: '❤️ Phẩm chất Trung thực & Đoàn kết: Chơi trò chơi công bằng, vui vẻ cùng bạn.',
        devicesDesc: 'SGK Tiếng Anh 1, TV thông minh, Bộ thẻ khẩu lệnh.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn khẩu lệnh lớp học; AI nhận diện phản xạ vận động ngôn ngữ (TPR) của học sinh.',
        nlsDesc: 'Khai thác học liệu điện tử sachmem.vn, rèn luyện kỹ năng tương tác với thiết bị số.',
        atgtDesc: 'Ý thức giữ an toàn trong phòng học và hành lang trường.',
        knsDesc: 'Kỹ năng lắng nghe tích cực và phản xạ giao tiếp tự nhiên.',
        ethicsDesc: '❤️ Phẩm chất Lễ phép & Trách nhiệm: Chấp hành nội quy trường lớp.',
        devicesDesc: 'SGK Tiếng Anh 1, TV thông minh, Thẻ khẩu lệnh.'
      }
    }
  },

  'Unit 1': {
    unitTitle: 'Unit 1: In the school playground',
    theme: 'Letter B /b/ (book, bike, ball, boy, Bill)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics Visualizer mô phỏng khẩu hình phát âm âm /b/ (bật hơi môi) trong các từ: "book, bike, ball, boy, Bill"; AI Text-to-Speech phát âm chuẩn câu "Hello, Bill!".',
        nlsDesc: 'Tương tác phần mềm nghe âm số hóa trên taphuan.nxbgd.vn; chạm vào hình quả bóng (ball) và xe đạp (bike) để nghe âm thanh tương ứng.',
        atgtDesc: '🚦 Tích hợp Giáo dục ATGT (CV 3456): Làm quen với từ "bike" - Quy tắc an toàn khi đi xe đạp: Đội mũ bảo hiểm đúng quy cách, chỉ đi xe đạp trẻ em trong sân hoặc công viên có người lớn giám sát.',
        knsDesc: 'Kỹ năng chào hỏi thân thiện khi gặp bạn bè tại sân trường (HĐ 3: Let\'s talk).',
        ethicsDesc: '❤️ Phẩm chất Thân thiện & Lễ phép: Hòa đồng với bạn bè, biết chào hỏi người lớn khi đến trường.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards âm B, Mô hình xe đạp/quả bóng mini, Màn hình TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI nhận diện giọng nói chấm điểm phát âm từ vựng "book, bike, ball, boy" trong trò chơi đố vui âm thanh tại HĐ 4 & 5.',
        nlsDesc: 'Thực hành bài tập nối âm và đồ nét chữ B trên màn hình tương tác hoặc ứng dụng sachmem.vn.',
        atgtDesc: '🚦 ATGT: Không đá bóng (ball) hoặc đuổi bắt ra ngoài khu vực lòng đường gần cổng trường.',
        knsDesc: 'Kỹ năng chia sẻ đồ chơi (quả bóng, sách truyện) cùng bạn bè trong giờ ra chơi.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ: Cẩn thận đồ từng nét chữ cái B/b.',
        devicesDesc: 'SGK Tiếng Anh 1, Tranh tô màu chữ B, TV cảm ứng.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /b/ và câu chào "Hello, Bill!"; AI hỗ trợ phát âm chuẩn bản ngữ.',
        nlsDesc: 'Học liệu số sachmem.vn, kỹ năng nghe và chạm biểu tượng âm thanh.',
        atgtDesc: '🚦 ATGT (CV 3456): An toàn khi chơi ở sân trường và an toàn khi đi xe đạp trẻ em.',
        knsDesc: 'Kỹ năng giao tiếp chào hỏi tự tin và giữ an toàn giờ ra chơi.',
        ethicsDesc: '❤️ Phẩm chất Thân thiện & Kỷ luật: Giữ trật tự sân trường, hòa đồng với bạn bè.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards âm B, Quả bóng mini, TV.'
      }
    }
  },

  'Unit 2': {
    unitTitle: 'Unit 2: In the dining room',
    theme: 'Letter C /k/ (cake, cat, car, cup)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics Visualizer hướng dẫn âm vô thanh /k/ trong "cake, cat, car, cup" và mẫu câu mời lịch sự: "Have some cake!".',
        nlsDesc: 'Xem hình ảnh động 3D các đồ vật trong phòng ăn trên học liệu điện tử sachmem.vn.',
        atgtDesc: '🚦 ATGT: Từ vựng "car" - Nhận biết ô tô là phương tiện giao thông di chuyển nhanh; luôn quan sát kỹ khi đi qua đường hoặc khu vực có ô tô ra vào gara/ngõ.',
        knsDesc: 'Kỹ năng ứng xử văn minh trong phòng ăn: Mời người lớn trước khi ăn, không nghịch cốc chén dễ vỡ (cup).',
        ethicsDesc: '❤️ Phẩm chất Lễ phép: Biết nói lời cảm ơn khi được người khác mời bánh kẹo.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ C, Mô hình ô tô/chiếc cốc, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'Trợ lý AI tạo trò chơi ghép đôi tranh - chữ "car, cat, cake, cup" và kiểm tra phát âm của học sinh.',
        nlsDesc: 'Bài tập nghe và tick chọn hình đúng trên ứng dụng Wordwall/Quizizz.',
        atgtDesc: '🚦 ATGT: Quy tắc an toàn khi ngồi trong xe ô tô (car): Thắt dây an toàn, không thò đầu/tay ra ngoài cửa sổ.',
        knsDesc: 'Kỹ năng giữ gìn vệ sinh bàn ăn, thu dọn cốc chén sau khi ăn uống.',
        ethicsDesc: '❤️ Phẩm chất Tiết kiệm & Trách nhiệm: Không bỏ thừa thức ăn, quý trọng đồ ăn mẹ nấu.',
        devicesDesc: 'SGK Tiếng Anh 1, TV tương tác, Tranh tô màu chữ C.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /k/ và mẫu câu "Have some cake / A car"; AI phân tích phát âm.',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng tương tác với hình ảnh số.',
        atgtDesc: '🚦 ATGT: Thắt dây an toàn khi đi xe ô tô và quan sát tránh ô tô lùi.',
        knsDesc: 'Kỹ năng mời ăn lịch sự và giữ gìn vệ sinh phòng ăn.',
        ethicsDesc: '❤️ Phẩm chất Lễ phép & Tiết kiệm: Lịch thiệp tại bàn ăn, biết ơn cha mẹ.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ C, TV thông minh.'
      }
    }
  },

  'Unit 3': {
    unitTitle: 'Unit 3: At the street market',
    theme: 'Letter A /æ/ (apple, bag, can, hat)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI hướng dẫn mở rộng khẩu hình âm nguyên âm ngắn /æ/ trong "apple, bag, can, hat"; AI Voice phát âm mẫu "An apple / I have an apple".',
        nlsDesc: 'Khám phá video thực tế sinh động về khu chợ đường phố Việt Nam trên kênh học liệu số sachmem.vn.',
        atgtDesc: '🚦 Tích hợp Giáo dục ATGT (CV 3456): Kỹ năng đi bộ an toàn khi đi chợ cùng cha mẹ: Luôn nắm chặt tay người lớn, đi trên vỉa hè, quan sát xe cộ qua lại nơi đông người.',
        knsDesc: 'Kỹ năng tự bảo vệ bản thân nơi đông người, ghi nhớ số điện thoại cha mẹ để phòng tránh đi lạc khi đi chợ.',
        ethicsDesc: '❤️ Phẩm chất Yêu lao động: Kính trọng các cô bác tiểu thương bán hàng tại chợ.',
        devicesDesc: 'SGK Tiếng Anh 1, Giỏ hoa quả mô hình, Mũ (hat), Túi xách (bag), TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI Camera nhận diện các đồ vật thật (mũ, quả táo, túi xách) do học sinh giơ lên trước camera.',
        nlsDesc: 'Tô nét chữ A trên màn hình cảm ứng, tham gia bài tập trắc nghiệm số hóa.',
        atgtDesc: '🚦 ATGT: Đội mũ (hat) che nắng khi đi bộ ngoài trời và đội mũ bảo hiểm khi ngồi sau xe máy cùng mẹ đi chợ.',
        knsDesc: 'Kỹ năng chọn hoa quả tươi sạch và rửa sạch táo (apple) trước khi ăn.',
        ethicsDesc: '❤️ Phẩm chất Cẩn thận & Trung thực: Giữ gìn đồ đạc cá nhân khi đi chợ.',
        devicesDesc: 'SGK Tiếng Anh 1, Quả táo thật/mô hình, TV tương tác.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn âm /æ/ và nhận diện từ vựng khu chợ "apple, bag, can, hat".',
        nlsDesc: 'Khai thác video học liệu số taphuan.nxbgd.vn, tương tác bài tập số hóa.',
        atgtDesc: '🚦 ATGT (CV 3456): Nắm tay người lớn khi đi chợ ven đường, đội mũ bảo hiểm đi xe máy.',
        knsDesc: 'Kỹ năng phòng tránh đi lạc và lựa chọn thực phẩm an toàn.',
        ethicsDesc: '❤️ Phẩm chất Yêu thương gia đình: Giúp mẹ xách túi đồ nhẹ khi đi chợ.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ A, Túi đựng hoa quả, TV.'
      }
    }
  },

  'Unit 4': {
    unitTitle: 'Unit 4: In the bedroom',
    theme: 'Letter D /d/ (door, desk, dog, duck)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics Visualizer hướng dẫn âm đầu /d/ trong "door, desk, dog, duck" và khẩu lệnh: "Open the door / A desk".',
        nlsDesc: 'Xem hình ảnh 3D mô phỏng không gian phòng ngủ và góc học tập của học sinh tiểu học.',
        atgtDesc: 'Giữ an toàn khi mở cửa (door) phòng: Quan sát trước khi đẩy cửa để tránh va chạm vào người khác.',
        knsDesc: 'Kỹ năng sắp xếp bàn học (desk) ngăn nắp, tự dọn giường ngủ sau khi thức dậy.',
        ethicsDesc: '❤️ Phẩm chất Gọn gàng & Tự lập: Tự giác chăm sóc không gian phòng ngủ của mình.',
        devicesDesc: 'SGK Tiếng Anh 1, Mô hình chú chó/vịt bông, Flashcards chữ D, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'Trợ lý AI đọc chính tả âm thanh đố vui con vật và đồ vật phòng ngủ.',
        nlsDesc: 'Bài tập kéo thả hình ảnh chú chó (dog), chú vịt (duck), bàn học (desk) vào vị trí chữ D trên bảng cảm ứng.',
        atgtDesc: 'Không để vật nuôi (dog) chạy ra đường gây cản trở các phương tiện giao thông.',
        knsDesc: 'Kỹ năng đối xử yêu thương, an toàn với thú cưng (dog) trong gia đình.',
        ethicsDesc: '❤️ Phẩm chất Nhân ái: Yêu thương chăm sóc vật nuôi trong nhà.',
        devicesDesc: 'SGK Tiếng Anh 1, TV tương tác, Tranh tô màu chữ D.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /d/ và khẩu lệnh "Open the door / Close the door".',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng vẽ nét chữ số.',
        atgtDesc: 'An toàn phòng ngừa va đập cửa và giữ thú cưng an toàn.',
        knsDesc: 'Kỹ năng giữ bàn học gọn gàng và tự lập trong sinh hoạt.',
        ethicsDesc: '❤️ Phẩm chất Gọn gàng & Chăm chỉ: Tự giác lau bàn học sạch sẽ.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ D, TV thông minh.'
      }
    }
  },

  'Unit 5': {
    unitTitle: 'Unit 5: At the birthday party',
    theme: 'Letter P /p/ (party, pizza, popcorn, pencil)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI hướng dẫn âm bật hơi mạnh môi /p/ trong "party, pizza, popcorn, pencil" và câu chúc mừng: "Happy birthday!".',
        nlsDesc: 'Nghe bài hát chúc mừng sinh nhật số hóa sôi động trên sachmem.vn, hát theo nhịp điệu.',
        atgtDesc: 'Giữ an toàn khi đi dự sinh nhật bạn: Nhắc cha mẹ đội mũ bảo hiểm khi chở em đến nhà bạn.',
        knsDesc: 'Kỹ năng ứng xử văn hóa trong bữa tiệc sinh nhật: Chúc mừng bạn, xếp hàng nhận bánh kẹo, không chen lấn.',
        ethicsDesc: '❤️ Phẩm chất Đoàn kết & Tôn trọng: Tôn trọng bạn bè, sẻ chia niềm vui sinh nhật.',
        devicesDesc: 'SGK Tiếng Anh 1, Mũ sinh nhật, Hộp quà mini, Bút chì (pencil), TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI Voice Assistant nhận diện lời chúc "Happy birthday, Nam!" và chấm điểm phát âm.',
        nlsDesc: 'Thiết kế thiệp chúc mừng sinh nhật đơn giản trên ứng dụng tô màu số.',
        atgtDesc: 'Cẩn thận với nến sinh nhật và que diêm, phòng ngừa cháy bỏng.',
        knsDesc: 'Kỹ năng giữ vệ sinh chung, vứt rác vỏ bánh kẹo vào thùng rác sau bữa tiệc.',
        ethicsDesc: '❤️ Phẩm chất Tiết kiệm & Tình bạn: Trân trọng quà tặng và tình cảm của bạn bè.',
        devicesDesc: 'SGK Tiếng Anh 1, Thiệp mẫu, Bút màu, TV tương tác.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn âm /p/ và câu chúc "Happy birthday! / Have some pizza".',
        nlsDesc: 'Khai thác kho bài hát sinh nhật số sachmem.vn.',
        atgtDesc: 'An toàn đi lại và an toàn phòng chống cháy nổ trong tiệc sinh nhật.',
        knsDesc: 'Văn hóa ứng xử tiệc sinh nhật và giao tiếp văn minh.',
        ethicsDesc: '❤️ Phẩm chất Nhân ái & Đoàn kết: Gắn kết tình bạn trong sáng.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ P, Mũ tiệc, TV.'
      }
    }
  },

  'Unit 6': {
    unitTitle: 'Unit 6: In the classroom',
    theme: 'Letter N /n/ (notebook, numbers, nine, nut)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics hướng dẫn âm mũi /n/ trong "notebook, numbers, nine, nut" và khẩu lệnh: "Open your notebook / Number nine".',
        nlsDesc: 'Đếm số lượng tương tác từ 1 đến 9 trên màn hình cảm ứng sachmem.vn.',
        atgtDesc: 'Nề nếp di chuyển trật tự trong lớp học, không chạy nhảy va vào bàn ghế.',
        knsDesc: 'Kỹ năng giữ gìn vở viết (notebook) sạch đẹp, không xé giấy bừa bãi.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ & Cẩn thận: Giữ vở sạch chữ đẹp, trân trọng sách vở.',
        devicesDesc: 'SGK Tiếng Anh 1, Vở ô ly mẫu, Thẻ số 9, Flashcards chữ N, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo trò chơi đếm nhanh số lượng đồ vật trong lớp và kiểm tra phát âm số 9 (nine).',
        nlsDesc: 'Bài tập ghép số với từ tiếng Anh trên nền tảng trắc nghiệm trực tuyến.',
        atgtDesc: 'Cất gọn cặp sách dưới ngăn bàn để lối đi trong lớp luôn thông thoáng, an toàn.',
        knsDesc: 'Kỹ năng quản lý đồ dùng học tập và chia sẻ vở nháp cùng bạn khi cần.',
        ethicsDesc: '❤️ Phẩm chất Kỷ luật: Thực hiện nghiêm túc hiệu lệnh của giáo viên.',
        devicesDesc: 'SGK Tiếng Anh 1, Thẻ số 1-9, TV cảm ứng.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /n/ và từ vựng lớp học "notebook, nine, numbers".',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, tương tác chữ số thông minh.',
        atgtDesc: 'Giữ lối đi lớp học thông thoáng, an toàn phòng tránh vấp ngã.',
        knsDesc: 'Kỹ năng giữ gìn sách vở và tập trung trong giờ học.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ: Rèn luyện tính cẩn thận trong từng trang vở.',
        devicesDesc: 'SGK Tiếng Anh 1, Vở mẫu, Thẻ chữ N, TV.'
      }
    }
  },

  'Unit 7': {
    unitTitle: 'Unit 7: In the garden',
    theme: 'Letter G /g/ (garden, girl, gate, goat)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm âm cuống họng /g/ trong "garden, girl, gate, goat" và mẫu câu: "Look at the girl / The goat is in the garden".',
        nlsDesc: 'Khám phá video khu vườn sinh thái thiên nhiên 3D trên kênh học liệu số.',
        atgtDesc: '🚦 ATGT: Từ vựng "gate" (cổng) - Quy tắc an toàn khi đi qua cổng trường và cổng nhà: Dừng lại quan sát xe cộ trước khi bước ra đường lớn.',
        knsDesc: 'Kỹ năng yêu thiên nhiên, không hái hoa bẻ cành khi chơi trong vườn.',
        ethicsDesc: '❤️ Phẩm chất Yêu thiên nhiên: Có ý thức chăm sóc cây xanh và bảo vệ môi trường.',
        devicesDesc: 'SGK Tiếng Anh 1, Chậu cây mini, Flashcards chữ G, Mô hình chú dê (goat), TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'Trợ lý AI đố vui nhận diện con vật và cảnh quan trong vườn qua giọng nói học sinh.',
        nlsDesc: 'Làm bài tập tô màu bức tranh khu vườn trên thiết bị cảm ứng.',
        atgtDesc: 'Đóng cổng (gate) cẩn thận để thú nuôi không chạy ra đường gây tai nạn.',
        knsDesc: 'Kỹ năng quan sát cây cối và phân biệt các loài động vật trong vườn.',
        ethicsDesc: '❤️ Phẩm chất Trách nhiệm: Giúp cha mẹ tưới cây, nhổ cỏ trong vườn.',
        devicesDesc: 'SGK Tiếng Anh 1, Tranh tô màu khu vườn, TV tương tác.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /g/ và mẫu câu miêu tả khu vườn "In the garden".',
        nlsDesc: 'Học liệu số sachmem.vn, kỹ năng khám phá hình ảnh thiên nhiên.',
        atgtDesc: '🚦 ATGT: An toàn khu vực cổng nhà/trường và phòng ngừa thú nuôi chạy ra đường.',
        knsDesc: 'Kỹ năng bảo vệ môi trường xanh và chăm sóc cây trồng.',
        ethicsDesc: '❤️ Phẩm chất Yêu thiên nhiên & Trách nhiệm: Giữ gìn cảnh quan xanh - sạch - đẹp.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ G, TV thông minh.'
      }
    }
  },

  'Unit 8': {
    unitTitle: 'Unit 8: In the park',
    theme: 'Letter T /t/ (tree, turtle, tiger, tent)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI hướng dẫn âm đầu lưỡi /t/ trong "tree, turtle, tiger, tent" và câu: "Look at the tiger / Under the tree".',
        nlsDesc: 'Xem hình ảnh động về công viên cây xanh và các loài động vật hoang dã trên sachmem.vn.',
        atgtDesc: '🚦 Tích hợp Giáo dục ATGT (CV 3456): Chỉ đi bộ và vui chơi trên đường nội bộ công viên dành riêng cho người đi bộ; không chạy sang làn đường xe cơ giới.',
        knsDesc: 'Kỹ năng giữ an toàn khi đi dạo công viên, không trèo cây cao (tree) nguy hiểm.',
        ethicsDesc: '❤️ Phẩm chất Bảo vệ động vật: Tôn trọng và bảo vệ các loài động vật hoang dã (rùa, hổ).',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ T, Mô hình chú rùa/chú hổ, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo trò chơi thử thách phát âm nhanh các từ chứa âm T trong bài thơ chant.',
        nlsDesc: 'Thực hành bài tập trắc nghiệm nghe chọn vị trí dưới gốc cây trên Wordwall.',
        atgtDesc: 'Luôn đi cùng người lớn khi đến công viên, không tự ý đi theo người lạ.',
        knsDesc: 'Kỹ năng tự bảo vệ bản thân và ứng xử an toàn nơi công cộng.',
        ethicsDesc: '❤️ Phẩm chất Văn minh nơi công cộng: Giữ gìn vệ sinh chung, không xả rác bừa bãi trong công viên.',
        devicesDesc: 'SGK Tiếng Anh 1, TV tương tác, Tranh tô màu chữ T.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn âm /t/ và câu miêu tả công viên "Under the tree".',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng nghe chọn hình ảnh đúng.',
        atgtDesc: '🚦 ATGT: Đi đúng phần đường cho người đi bộ trong công viên, đề phòng người lạ.',
        knsDesc: 'Kỹ năng vui chơi an toàn và bảo vệ môi trường công viên.',
        ethicsDesc: '❤️ Phẩm chất Văn minh & Yêu thiên nhiên: Không hái hoa bẻ cành.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ T, Mô hình cây xanh, TV.'
      }
    }
  },

  'Unit 11': {
    unitTitle: 'Unit 11: At the bus stop',
    theme: 'Letter U /ʌ/ (bus, sun, umbrella, run)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics hướng dẫn âm /ʌ/ trong "bus, sun, umbrella, run" và mẫu câu thông báo: "The bus is coming / Under the sun".',
        nlsDesc: 'Xem mô phỏng điểm dừng xe buýt thông minh và tuyến xe buýt công cộng trên học liệu số sachmem.vn.',
        atgtDesc: '🚦 Tích hợp Giáo dục ATGT trọng tâm (CV 3456): Quy tắc an toàn tại điểm dừng xe buýt (bus stop): Đứng trên vỉa hè chờ xe, xếp hàng lần lượt lên xuống khi xe đã dừng hẳn, không chạy đuổi theo xe buýt (run after bus).',
        knsDesc: 'Kỹ năng che ô (umbrella) khi trời nắng/mưa và văn hóa nhường ghế cho người già trên xe buýt.',
        ethicsDesc: '❤️ Phẩm chất Văn hóa giao thông & Lễ phép: Ứng xử văn minh trên phương tiện công cộng.',
        devicesDesc: 'SGK Tiếng Anh 1, Chiếc ô nhỏ (umbrella), Mô hình xe buýt (bus), Flashcards chữ U, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'Trợ lý AI đóng vai bác tài xế xe buýt tương tác khẩu lệnh lên xuống xe với học sinh.',
        nlsDesc: 'Làm bài tập trắc nghiệm số nhận diện hành vi đúng/sai tại bến xe buýt trên Quizizz.',
        atgtDesc: '🚦 ATGT: Tuyệt đối không thò đầu, thò tay ra cửa sổ khi xe buýt đang chạy.',
        knsDesc: 'Kỹ năng xử lý tình huống khi đi lạc trên xe công cộng.',
        ethicsDesc: '❤️ Phẩm chất Kỷ luật & Trách nhiệm: Giữ trật tự trên xe buýt, không xả rác.',
        devicesDesc: 'SGK Tiếng Anh 1, Sa bàn bến xe buýt mini, TV cảm ứng.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /ʌ/ và câu nói về phương tiện công cộng "The bus is coming".',
        nlsDesc: 'Khai thác ứng dụng giao thông công cộng số hóa trên màn hình tương tác.',
        atgtDesc: '🚦 ATGT (CV 3456): Kỷ luật và an toàn tuyệt đối khi đón và đi xe buýt.',
        knsDesc: 'Kỹ năng đi lại bằng phương tiện công cộng và che chắn thời tiết.',
        ethicsDesc: '❤️ Phẩm chất Văn minh đô thị: Xếp hàng trật tự, tôn trọng mọi người.',
        devicesDesc: 'SGK Tiếng Anh 1, Flashcards chữ U, Mô hình xe buýt, TV.'
      }
    }
  },

  'Unit 15': {
    unitTitle: 'Unit 15: At the football match',
    theme: 'Letter F /f/ (football, fox, face, foot)',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI hướng dẫn âm răng môi /f/ trong "football, fox, face, foot" và khẩu lệnh vận động: "Kick the football / Touch your face".',
        nlsDesc: 'Xem đoạn clip hoạt hình ngắn về trận thi đấu bóng đá thiếu nhi trên sachmem.vn.',
        atgtDesc: '🚦 ATGT: Tuyệt đối không đá bóng (football) dưới lòng đường hoặc ngõ hẻm có xe cộ lưu thông; chỉ đá bóng ở sân cỏ/sân thể thao an toàn.',
        knsDesc: 'Kỹ năng vận động thể chất an toàn, khởi động khớp cổ chân (foot) trước khi chơi thể thao.',
        ethicsDesc: '❤️ Phẩm chất Tinh thần thể thao (Fair Play): Đoàn kết, trung thực và cổ vũ bạn bè hết mình.',
        devicesDesc: 'SGK Tiếng Anh 1, Quả bóng đá mini (football), Flashcards chữ F, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI Camera nhận diện động tác chạm mặt (touch face) và sút bóng mô phỏng của học sinh.',
        nlsDesc: 'Bài tập nối chữ F với các bộ phận cơ thể và trò chơi thể thao trên Wordwall.',
        atgtDesc: 'An toàn đi lại khi đến sân vận động: Đi theo hàng lối, không chen lấn xô đẩy.',
        knsDesc: 'Kỹ năng hợp tác đồng đội trong thi đấu thể thao.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ & Khiêm tốn: Chăm chỉ rèn luyện sức khỏe, tôn trọng đội bạn.',
        devicesDesc: 'SGK Tiếng Anh 1, TV tương tác, Thẻ chữ F.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /f/ và câu khẩu lệnh "Kick the football".',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, tương tác video thể thao.',
        atgtDesc: '🚦 ATGT: Không chơi bóng dưới lòng đường, an toàn sân vận động.',
        knsDesc: 'Kỹ năng thể thao an toàn và tinh thần đồng đội.',
        ethicsDesc: '❤️ Phẩm chất Đoàn kết & Trung thực: Tinh thần thể thao trong sáng.',
        devicesDesc: 'SGK Tiếng Anh 1, Quả bóng mini, Flashcards chữ F, TV.'
      }
    }
  }
};
