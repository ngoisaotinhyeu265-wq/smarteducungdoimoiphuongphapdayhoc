import { UnitIntegrationRule } from '../lessonSpecificIntegrations';

export const G3_SPECIFIC_INTEGRATIONS: Record<string, Partial<UnitIntegrationRule>> = {
  'Unit 1': {
    unitTitle: 'Unit 1: Hello',
    theme: 'Greetings & Introductions',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'Ứng dụng AI Text-to-Speech phát âm chuẩn bản ngữ câu chào "Hello, I am Mai/Ben"; AI nhận diện giọng nói khi học sinh chào lại tại HĐ 1 & 2.',
        nlsDesc: 'Khai thác thẻ tranh số tương tác trên hoclieu.vn; rèn kỹ năng bấm nút nghe và nhận diện nhân vật Mai, Nam, Ben, Lucy tại HĐ 1, 2, 3.',
        atgtDesc: 'Giáo dục nề nếp đi lại trật tự, an toàn khi vào lớp học đầu năm mới.',
        knsDesc: 'Kỹ năng chào hỏi lễ phép với thầy cô và thân thiện hòa nhã khi gặp gỡ bạn bè mới ở HĐ 3 (Let\'s talk).',
        ethicsDesc: '❤️ Phẩm chất Lễ phép & Thân thiện: Chủ động chào hỏi, tạo môi trường học tập cởi mở, chan hòa.',
        devicesDesc: 'SGK Tiếng Anh 3, Loa bluetooth, Thẻ từ Flashcards nhân vật, Màn hình TV tương tác.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'Trợ lý AI tạo trò chơi nối câu chào tự động trên màn hình tương tác; AI kiểm tra phát âm qua bài hát Hello song ở HĐ 6.',
        nlsDesc: 'Thực hành nghe và tick chọn ô vuông số hóa trên ứng dụng sachmem.vn tại HĐ 4 & 5.',
        atgtDesc: 'Di chuyển nhẹ nhàng, không xô đẩy bàn ghế khi tham gia trò chơi vận động trong lớp.',
        knsDesc: 'Kỹ năng làm việc cặp đôi, tự tin biểu diễn bài hát chào hỏi trước lớp.',
        ethicsDesc: '❤️ Phẩm chất Tự tin & Đoàn kết: Hào hứng tham gia hoạt động nhóm cùng bạn.',
        devicesDesc: 'SGK Tiếng Anh 3, Phần mềm sachmem.vn, Micro trợ giảng, TV thông minh.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'Hệ thống AI nhận diện giọng nói câu chào "Hello / Hi, I am..."; AI chấm điểm phát âm ngữ điệu thân thiện.',
        nlsDesc: 'Khai thác học liệu số sachmem.vn & taphuan.nxbgd.vn, kỹ năng sử dụng thiết bị nghe nhìn cơ bản.',
        atgtDesc: 'Nề nếp di chuyển an toàn trong phòng học ngoại ngữ.',
        knsDesc: 'Kỹ năng giao tiếp tự tin, biết lắng nghe và phản hồi lịch sự.',
        ethicsDesc: '❤️ Phẩm chất Lễ phép & Nhân ái: Hòa đồng, yêu quý bạn bè và kính trọng thầy cô.',
        devicesDesc: 'SGK Tiếng Anh 3, Flashcards, Loa nghe audio MP3, TV.'
      }
    },
    lesson2: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm mẫu câu hỏi thăm sức khỏe "How are you? - I am fine, thank you" và câu tạm biệt "Goodbye"; AI phân tích ngữ điệu lên xuống giọng ở HĐ 1, 2.',
        nlsDesc: 'Tương tác với video hoạt hình tình huống giao tiếp trên kho học liệu số taphuan.nxbgd.vn.',
        atgtDesc: 'Nhắc nhở học sinh nề nếp xếp hàng ra về trật tự sau giờ tan học, không ùa ra cổng trường.',
        knsDesc: 'Kỹ năng thể hiện sự quan tâm đến sức khỏe của bạn bè và văn hóa chào tạm biệt lịch thiệp.',
        ethicsDesc: '❤️ Phẩm chất Quan tâm & Biết ơn: Biết cảm ơn khi được người khác hỏi thăm, chúc sức khỏe.',
        devicesDesc: 'SGK Tiếng Anh 3, File audio MP3 Track 05-07, Tranh tình huống giao tiếp, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo bài kiểm tra nhanh nhận diện cặp câu hỏi - đáp sức khỏe qua trò chơi trắc nghiệm Quizizz/Wordwall tại HĐ 5, 6.',
        nlsDesc: 'Chơi trò chơi số hóa "Lucky Number" trên bảng cảm ứng tương tác.',
        atgtDesc: 'Giữ trật tự khu vực hành lang và cầu thang khi di chuyển giữa các phòng học bộ môn.',
        knsDesc: 'Kỹ năng phản xạ ngôn ngữ nhanh trong tình huống giao tiếp thực tế.',
        ethicsDesc: '❤️ Phẩm chất Trung thực: Tự giác tham gia trò chơi và làm bài tập.',
        devicesDesc: 'SGK Tiếng Anh 3, Bảng tương tác, Thẻ điểm thưởng học sinh.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Voice Assistant hội thoại hỏi đáp sức khỏe ("How are you? - Fine, thanks") và chào tạm biệt ("Goodbye").',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng tương tác trò chơi ngôn ngữ số hóa.',
        atgtDesc: 'Nề nếp tan học an toàn, không chen lấn tại cửa lớp.',
        knsDesc: 'Kỹ năng thăm hỏi lịch thiệp và ứng xử văn minh.',
        ethicsDesc: '❤️ Phẩm chất Lễ phép & Biết ơn: Lời cảm ơn và chào tạm biệt đúng mực.',
        devicesDesc: 'SGK Tiếng Anh 3, Audio MP3, TV thông minh.'
      }
    },
    lesson3: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics Visualizer mô phỏng khẩu hình phát âm âm /h/ trong "hello" và âm /b/ trong "bye/book" ở HĐ 1, 2.',
        nlsDesc: 'Nghe và vỗ tay theo bài chant nhịp điệu số hóa trên sachmem.vn.',
        atgtDesc: 'Bảo vệ thị lực, giữ khoảng cách đúng khi ngồi học trước màn hình TV.',
        knsDesc: 'Kỹ năng nhận diện và sửa lỗi phát âm cặp âm dễ nhầm lẫn /h/ và /b/.',
        ethicsDesc: '❤️ Phẩm chất Kiên trì: Chăm chỉ luyện đọc chuẩn xác từng âm tiết.',
        devicesDesc: 'SGK Tiếng Anh 3, Video Phonics 3D, Loa lớp học, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI hỗ trợ chấm chữa bài viết mẫu câu tự giới thiệu tên mình tại HĐ 5 (Let\'s write) & HĐ 6 (Project: Name Cards).',
        nlsDesc: 'Sử dụng công cụ đồ họa số đơn giản (Canva / Paint) thiết kế thẻ tên (Name Card) cá nhân hóa.',
        atgtDesc: 'Giữ an toàn khi sử dụng kéo, bút màu khi làm sản phẩm thẻ tên thủ công.',
        knsDesc: 'Kỹ năng sáng tạo sản phẩm học tập và tự tin thuyết trình thẻ tên trước lớp.',
        ethicsDesc: '❤️ Phẩm chất Tôn trọng: Tôn trọng và gìn giữ sản phẩm học tập của bạn bè.',
        devicesDesc: 'Giấy A4, bút màu, kéo an toàn, Mẫu Name Card trên TV.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phân tích ngữ âm Phonics âm /h/ & /b/; AI hỗ trợ tạo thẻ tên học sinh thông minh.',
        nlsDesc: 'Khai thác ứng dụng đồ họa số Canva/Paint và học liệu sachmem.vn.',
        atgtDesc: 'An toàn phòng học và thao tác đồ dùng thủ công an toàn.',
        knsDesc: 'Kỹ năng phát âm chuẩn xác và thuyết trình sản phẩm học tập.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ & Sáng tạo: Hoàn thành sản phẩm học tập chỉn chu.',
        devicesDesc: 'SGK Tiếng Anh 3, Dụng cụ vẽ, Audio Phonics, TV.'
      }
    }
  },

  'Unit 2': {
    unitTitle: 'Unit 2: Our names',
    theme: 'Names & Spelling',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Voice Assistant phát âm chuẩn mẫu câu hỏi tên: "What is your name? - My name is Linh/Mary/Peter"; AI nhận diện câu trả lời ở HĐ 1, 2.',
        nlsDesc: 'Sử dụng bàn phím ảo trên máy tính/TV gõ tên của mình và nghe máy tính đọc lại trên hoclieu.vn.',
        atgtDesc: 'Ghi nhớ họ và tên đầy đủ của bản thân để khai báo an toàn khi cần giúp đỡ ngoài đường.',
        knsDesc: 'Kỹ năng tự giới thiệu bản thân to, rõ ràng và tự tin trước đám đông ở HĐ 3.',
        ethicsDesc: '❤️ Phẩm chất Tự hào & Tôn trọng: Tự hào về tên của mình và tôn trọng tên gọi của bạn bè.',
        devicesDesc: 'SGK Tiếng Anh 3, Thẻ tên chữ cái, Audio MP3, TV tương tác.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo câu đố nhận diện tên nhân vật qua giọng nói ("Who is speaking?"); AI chấm điểm phát âm tại HĐ 4, 5.',
        nlsDesc: 'Thực hành bài tập kéo thả ghép chữ cái thành tên đúng trên Wordwall ở HĐ 6 (Let\'s play: Pass the ball).',
        atgtDesc: 'Di chuyển chuyền bóng an toàn, không ném bóng mạnh vào mặt bạn.',
        knsDesc: 'Kỹ năng phản xạ nhanh với câu hỏi và nhớ tên tất cả các bạn trong tổ.',
        ethicsDesc: '❤️ Phẩm chất Đoàn kết: Nhớ tên bạn để xưng hô thân thiện, không gọi bạn bằng biệt danh xấu.',
        devicesDesc: 'SGK Tiếng Anh 3, Quả bóng mềm, TV cảm ứng.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện mẫu câu hỏi tên "What is your name?"; AI hỗ trợ sửa lỗi phát âm đuôi /z/ trong "What\'s" và "name\'s".',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng gõ bàn phím và tương tác bài tập số.',
        atgtDesc: 'Kỹ năng an toàn thông tin cá nhân và an toàn vận động lớp học.',
        knsDesc: 'Kỹ năng giao tiếp tự tin và ghi nhớ tên bạn bè.',
        ethicsDesc: '❤️ Phẩm chất Tôn trọng & Đoàn kết: Xây dựng tình bạn thân thiện.',
        devicesDesc: 'SGK Tiếng Anh 3, Thẻ tên, Flashcards, TV thông minh.'
      }
    },
    lesson2: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm mẫu câu hỏi đánh vần: "How do you spell your name? - L-I-N-H"; AI nhận diện từng chữ cái A-Z ở HĐ 1, 2.',
        nlsDesc: 'Tương tác với bảng chữ cái số Alphabet điện tử phát âm chuẩn bản ngữ trên sachmem.vn.',
        atgtDesc: 'Giữ nề nếp trật tự, tập trung nghe hiệu lệnh của thầy cô giáo.',
        knsDesc: 'Kỹ năng đánh vần chính xác tên mình và các từ tiếng Anh cơ bản.',
        ethicsDesc: '❤️ Phẩm chất Kiên trì: Kiên nhẫn luyện tập đánh vần các chữ cái khó.',
        devicesDesc: 'SGK Tiếng Anh 3, Bảng chữ cái Alphabet treo tường, TV tương tác.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo thử thách đánh vần chính tả nhanh (Spelling Bee AI) kiểm tra phản xạ học sinh tại HĐ 5, 6.',
        nlsDesc: 'Tham gia trò chơi đánh vần trực tuyến trên Quizizz / Kahoot theo nhóm.',
        atgtDesc: 'An toàn sử dụng thiết bị điện tử trong lớp học.',
        knsDesc: 'Kỹ năng làm việc nhóm và thi đua lành mạnh trong học tập.',
        ethicsDesc: '❤️ Phẩm chất Trung thực: Nghiêm túc làm bài tập đánh vần.',
        devicesDesc: 'SGK Tiếng Anh 3, Bảng con, Phấn/Bút dạ, TV.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Speech-to-Text nhận diện từng chữ cái đánh vần ("How do you spell...?"); AI chấm điểm độ chính xác chữ cái.',
        nlsDesc: 'Kho học liệu số sachmem.vn, kỹ năng tương tác bảng chữ cái số.',
        atgtDesc: 'An toàn phòng học ngoại ngữ.',
        knsDesc: 'Kỹ năng đánh vần nhanh và phản xạ ngôn ngữ.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ: Chăm chỉ học thuộc 26 chữ cái tiếng Anh.',
        devicesDesc: 'SGK Tiếng Anh 3, Thẻ chữ cái A-Z, TV thông minh.'
      }
    },
    lesson3: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics hướng dẫn phát âm âm /æ/ trong "apple/Mary" và âm /m/ trong "map/name" ở HĐ 1, 2.',
        nlsDesc: 'Nghe và hát theo bài chant đánh vần tên số hóa trên taphuan.nxbgd.vn.',
        atgtDesc: 'Ngồi đúng tư thế chuẩn công thái học để bảo vệ cột sống và mắt.',
        knsDesc: 'Kỹ năng phân biệt âm nguyên âm ngắn /æ/ và phụ âm mũi /m/.',
        ethicsDesc: '❤️ Phẩm chất Cẩn thận: Phát âm rõ ràng, không nuốt âm.',
        devicesDesc: 'SGK Tiếng Anh 3, Audio Phonics, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI hỗ trợ khung bài viết "My Profile" (Tên, tuổi, cách đánh vần) tại HĐ 5 (Let\'s write) & HĐ 6 (Project).',
        nlsDesc: 'Tạo thẻ hồ sơ học sinh điện tử (Student Profile) trên Canva hoặc Google Slides.',
        atgtDesc: 'An toàn khi sử dụng mạng: Không chia sẻ thông tin cá nhân mật lên mạng xã hội công cộng.',
        knsDesc: 'Kỹ năng viết thông tin cá nhân cơ bản và bảo mật thông tin an toàn trên Internet.',
        ethicsDesc: '❤️ Phẩm chất Trách nhiệm: Ý thức bảo vệ thông tin cá nhân trong kỷ nguyên số.',
        devicesDesc: 'SGK Tiếng Anh 3, Giấy A4 làm Profile, TV tương tác.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phân tích ngữ âm Phonics /æ/ & /m/; AI hỗ trợ tạo hồ sơ học sinh số an toàn.',
        nlsDesc: 'Học liệu số sachmem.vn, kỹ năng tạo tài liệu cá nhân số cơ bản.',
        atgtDesc: 'Ý thức bảo mật thông tin cá nhân trên môi trường mạng.',
        knsDesc: 'Kỹ năng viết hồ sơ cá nhân và phát âm chuẩn.',
        ethicsDesc: '❤️ Phẩm chất Trách nhiệm & Tự tin: Tự tin giới thiệu bản thân.',
        devicesDesc: 'SGK Tiếng Anh 3, Mẫu Profile, Audio Phonics, TV.'
      }
    }
  },

  'Unit 3': {
    unitTitle: 'Unit 3: Our friends',
    theme: 'Friends & Teachers',
    lesson1: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm mẫu câu giới thiệu bạn bè và thầy cô: "This is Bill / That is Mr Long / Miss Hien"; AI nhận diện giọng nói học sinh khi chỉ tranh ở HĐ 1, 2.',
        nlsDesc: 'Khám phá video tương tác 360 độ về lớp học và thầy cô trên taphuan.nxbgd.vn.',
        atgtDesc: '🚦 ATGT: Kính trọng chào hỏi thầy cô giáo khi gặp ở cổng trường; xếp hàng dắt xe đạp gọn gàng vào nhà xe của trường.',
        knsDesc: 'Kỹ năng giới thiệu bạn bè với nhau một cách lịch sự, thân mật ở HĐ 3 (Let\'s talk).',
        ethicsDesc: '❤️ Phẩm chất Tôn sư trọng đạo: Lễ phép với thầy cô giáo, yêu quý bạn bè.',
        devicesDesc: 'SGK Tiếng Anh 3, Flashcards thầy cô và bạn bè, TV tương tác.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo câu đố ghép nối đúng vị trí gần (this) và xa (that) dựa trên hình ảnh tương tác.',
        nlsDesc: 'Làm bài tập trắc nghiệm số hóa chọn "This is / That is" trên Wordwall tại HĐ 4 & 5.',
        atgtDesc: 'Giữ trật tự khi di chuyển theo nhóm trong phòng học.',
        knsDesc: 'Kỹ năng phân biệt khoảng cách không gian (gần - xa) và hợp tác nhóm.',
        ethicsDesc: '❤️ Phẩm chất Hòa đồng: Không phân biệt đối xử, yêu mến tất cả các bạn trong lớp.',
        devicesDesc: 'SGK Tiếng Anh 3, Bảng tương tác, TV.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện cấu trúc giới thiệu "This is... / That is..."; AI chấm điểm phát âm tên nhân vật.',
        nlsDesc: 'Học liệu số sachmem.vn, kỹ năng tương tác trắc nghiệm trực tuyến.',
        atgtDesc: 'Nề nếp giao thông cổng trường và nề nếp xếp hàng nhà xe.',
        knsDesc: 'Kỹ năng giới thiệu người khác lịch sự và tự tin.',
        ethicsDesc: '❤️ Phẩm chất Tôn sư trọng đạo & Đoàn kết: Lễ phép với thầy cô, hòa đồng với bạn.',
        devicesDesc: 'SGK Tiếng Anh 3, Flashcards, TV thông minh.'
      }
    },
    lesson2: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn câu hỏi xác nhận danh tính: "Is this Mary? - Yes, it is. / No, it isn\'t. It is Lucy" ở HĐ 1, 2.',
        nlsDesc: 'Xem hình ảnh động phân biệt bạn bè trong lớp trên kho tài nguyên sachmem.vn.',
        atgtDesc: 'Đi lại cẩn thận, quan sát kỹ khi đi qua cửa ra vào của lớp học.',
        knsDesc: 'Kỹ năng hỏi - đáp lịch thiệp và giải thích rõ ràng khi nhận nhầm bạn.',
        ethicsDesc: '❤️ Phẩm chất Thật thà: Thẳng thắn nhận diện đúng bạn bè, không trêu chọc bạn.',
        devicesDesc: 'SGK Tiếng Anh 3, Bộ tranh nhân vật, Audio MP3, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo bài kiểm tra nghe hiểu phân vai hỏi đáp "Is that...?" tại HĐ 5, 6.',
        nlsDesc: 'Chơi trò chơi đuổi hình bắt chữ đoán tên bạn trên bảng thông minh.',
        atgtDesc: 'Giữ an toàn khi chơi trò chơi bịt mắt bắt dê (nếu có) trong phạm vi an toàn.',
        knsDesc: 'Kỹ năng quan sát tinh tế và nhận diện đặc điểm của bạn bè.',
        ethicsDesc: '❤️ Phẩm chất Thân thiện: Giúp đỡ bạn bè cùng tiến bộ trong học tập.',
        devicesDesc: 'SGK Tiếng Anh 3, TV tương tác, Trò chơi số.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Voice Assistant tương tác câu hỏi Yes/No ("Is this/that...?"); AI nhận diện phản xạ ngôn ngữ.',
        nlsDesc: 'Kho học liệu số taphuan.nxbgd.vn, tương tác màn hình cảm ứng.',
        atgtDesc: 'Nề nếp di chuyển an toàn trong phòng học.',
        knsDesc: 'Kỹ năng hỏi đáp xác nhận thông tin và quan sát.',
        ethicsDesc: '❤️ Phẩm chất Thân thiện & Nhân ái: Giúp đỡ bạn bè.',
        devicesDesc: 'SGK Tiếng Anh 3, Flashcards, TV.'
      }
    },
    lesson3: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics hướng dẫn âm /t/ trong "teacher/ten" và âm /d/ trong "door/desk" ở HĐ 1, 2.',
        nlsDesc: 'Nghe bài chant bạn bè số hóa trên sachmem.vn; vỗ tay theo nhịp.',
        atgtDesc: 'Ngồi thẳng lưng, mắt cách màn hình 50-70cm.',
        knsDesc: 'Kỹ năng phát âm phân biệt cặp âm vô thanh /t/ và hữu thanh /d/.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ: Kiên trì luyện tập ngữ âm chuẩn.',
        devicesDesc: 'SGK Tiếng Anh 3, Audio Phonics, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI hỗ trợ khung viết đoạn văn ngắn giới thiệu người bạn thân tại HĐ 5 & HĐ 6 (Project: My Best Friend Drawing).',
        nlsDesc: 'Sử dụng phần mềm vẽ số hoặc chèn ảnh bạn thân vào khung mẫu trên máy tính.',
        atgtDesc: 'An toàn phòng ngừa tai nạn thương tích khi dùng kéo, compa thủ công.',
        knsDesc: 'Kỹ năng vẽ tranh chân dung bạn và thuyết trình giới thiệu bạn trước lớp.',
        ethicsDesc: '❤️ Phẩm chất Tình bạn chân thành: Trân trọng và bảo vệ tình bạn bè trong sáng.',
        devicesDesc: 'Giấy A4, bút màu, Mẫu My Best Friend trên TV.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phân tích ngữ âm /t/ & /d/; AI hỗ trợ cấu trúc viết bài dự án giới thiệu bạn thân.',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng vẽ và trình bày trên nền tảng số.',
        atgtDesc: 'Nề nếp lớp học và an toàn dụng cụ học tập.',
        knsDesc: 'Kỹ năng viết câu tiếng Anh và thuyết trình tình bạn.',
        ethicsDesc: '❤️ Phẩm chất Chân thành & Tôn sư trọng đạo: Yêu quý thầy cô và bạn bè.',
        devicesDesc: 'SGK Tiếng Anh 3, Dụng cụ vẽ, TV thông minh.'
      }
    }
  },

  'Unit 9': {
    unitTitle: 'Unit 9: Colors',
    theme: 'Colors & Traffic Lights',
    lesson1: {
      act123: {
        aiCode: 'AI 4.C1.1',
        aiDesc: 'AI Camera nhận diện màu sắc thực tế (đỏ, xanh dương, vàng, xanh lá) và phát âm mẫu: "What color is it? - It is red / blue / yellow / green" ở HĐ 1, 2.',
        nlsDesc: 'Sử dụng bảng chọn mã màu số (Color Picker) trên máy tính/TV để pha màu và gọi tên tiếng Anh.',
        atgtDesc: '🚦 Tích hợp Giáo dục ATGT trọng tâm (CV 3456): Nhận diện 3 màu sắc của đèn tín hiệu giao thông (Đỏ - Dừng lại, Vàng - Đi chậm chuẩn bị dừng, Xanh - Được phép đi); tuân thủ tuyệt đối hiệu lệnh đèn tín hiệu khi qua đường.',
        knsDesc: 'Kỹ năng quan sát màu sắc môi trường xung quanh và phản xạ nhanh với tín hiệu cảnh báo nguy hiểm (màu đỏ).',
        ethicsDesc: '❤️ Phẩm chất Kỷ luật & Trách nhiệm: Tự giác chấp hành tín hiệu đèn giao thông để bảo vệ bản thân và mọi người.',
        devicesDesc: 'SGK Tiếng Anh 3, Mô hình cột đèn giao thông mini, Flashcards màu sắc, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo trò chơi tương tác nhận diện màu đèn giao thông và biển báo đường bộ tại HĐ 4, 5, 6.',
        nlsDesc: 'Làm bài tập trắc nghiệm số hóa tô màu đèn tín hiệu giao thông trên Quizizz.',
        atgtDesc: '🚦 ATGT: Phân biệt màu sắc biển báo giao thông: Biển báo cấm (viền đỏ), biển chỉ dẫn (nền xanh), biển cảnh báo nguy hiểm (nền vàng).',
        knsDesc: 'Kỹ năng quan sát các biển báo trên tuyến đường từ nhà đến trường.',
        ethicsDesc: '❤️ Phẩm chất Trung thực: Chấp hành luật giao thông ngay cả khi không có cảnh sát giao thông.',
        devicesDesc: 'SGK Tiếng Anh 3, Bộ biển báo giao thông mini, TV cảm ứng.'
      },
      all: {
        aiCode: 'AI 4.C1.1',
        aiDesc: 'AI Vision nhận diện màu sắc và đèn tín hiệu giao thông; AI Voice Assistant hỏi đáp "What color is it? - It\'s red/green".',
        nlsDesc: 'Khai thác ứng dụng pha màu số và sa bàn giao thông tương tác hoclieu.vn.',
        atgtDesc: '🚦 ATGT (CV 3456): Nắm vững ý nghĩa màu sắc đèn giao thông và biển báo đường bộ.',
        knsDesc: 'Kỹ năng quan sát tín hiệu an toàn và tự bảo vệ khi qua đường.',
        ethicsDesc: '❤️ Phẩm chất Kỷ luật & Trách nhiệm: Nghiêm chỉnh chấp hành luật giao thông.',
        devicesDesc: 'SGK Tiếng Anh 3, Mô hình đèn giao thông, Flashcards màu sắc, TV.'
      }
    },
    lesson2: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn câu hỏi màu sắc số nhiều: "What color are they? - They are black and white / brown / pink / purple" ở HĐ 1, 2.',
        nlsDesc: 'Xem video sinh động về màu sắc các phương tiện giao thông trên đường phố trên sachmem.vn.',
        atgtDesc: '🚦 ATGT: Nhận diện màu sắc của vạch kẻ đường cho người đi bộ (màu trắng) và áo phản quang/mũ bảo hiểm sáng màu khi đi trời tối.',
        knsDesc: 'Kỹ năng lựa chọn trang phục sáng màu hoặc có phản quang khi đi bộ vào ban đêm để người lái xe dễ nhận diện.',
        ethicsDesc: '❤️ Phẩm chất Cẩn thận: Có ý thức chủ động bảo vệ an toàn cho bản thân khi tham gia giao thông.',
        devicesDesc: 'SGK Tiếng Anh 3, Thẻ màu sắc số nhiều, Áo phản quang mini, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo câu đố đếm và phân loại màu sắc phương tiện giao thông trên màn hình tương tác tại HĐ 5, 6.',
        nlsDesc: 'Chơi trò chơi phân loại màu sắc đồ vật trên Wordwall.',
        atgtDesc: '🚦 ATGT: Không sang đường khi đèn cho người đi bộ chuyển sang màu đỏ.',
        knsDesc: 'Kỹ năng phối hợp màu sắc hài hòa trong hội họa và đời sống.',
        ethicsDesc: '❤️ Phẩm chất Đoàn kết: Cùng bạn bè hoàn thành tranh vẽ màu sắc nhóm.',
        devicesDesc: 'SGK Tiếng Anh 3, Bảng phụ màu sắc, TV tương tác.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện câu hỏi số nhiều "What color are they?"; AI hướng dẫn phản xạ màu sắc nhanh.',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng tương tác với hình ảnh đa sắc màu.',
        atgtDesc: '🚦 ATGT: Tác dụng của vạch kẻ đường trắng và áo phản quang an toàn.',
        knsDesc: 'Kỹ năng an toàn thị giác ban đêm và cảm thụ màu sắc.',
        ethicsDesc: '❤️ Phẩm chất Cẩn thận & Trách nhiệm: Giữ an toàn bản thân.',
        devicesDesc: 'SGK Tiếng Anh 3, Thẻ màu sắc, TV thông minh.'
      }
    },
    lesson3: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics phân tích âm /b/ trong "blue/black" và âm /j/ trong "yellow/yes" ở HĐ 1, 2.',
        nlsDesc: 'Nghe bài chant vần điệu sắc màu số hóa trên sachmem.vn.',
        atgtDesc: 'Giữ khoảng cách mắt an toàn khi xem màn hình điện tử.',
        knsDesc: 'Kỹ năng phát âm chuẩn xác âm bán nguyên âm /j/ và phụ âm /b/.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ: Kiên trì luyện đọc đúng âm khó.',
        devicesDesc: 'SGK Tiếng Anh 3, Audio Phonics, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI hỗ trợ khung bài viết "My favorite colors" tại HĐ 5 & HĐ 6 (Project: Color Wheel Poster).',
        nlsDesc: 'Sử dụng Canva vẽ vòng tròn bánh xe màu sắc (Color Wheel) và gắn nhãn tiếng Anh.',
        atgtDesc: 'An toàn phòng ngừa bỏng mắt và tay khi dùng màu nước, bút lông.',
        knsDesc: 'Kỹ năng vẽ poster nghệ thuật, tư duy thẩm mỹ và thuyết trình về màu sắc yêu thích.',
        ethicsDesc: '❤️ Phẩm chất Yêu cái đẹp: Bồi dưỡng tình yêu thiên nhiên tươi đẹp muôn màu.',
        devicesDesc: 'Giấy A3, bút dạ màu, Mẫu Color Wheel trên TV.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm /b/ & /j/; AI hỗ trợ thiết kế poster bánh xe màu sắc.',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng thiết kế đồ họa số cơ bản.',
        atgtDesc: 'Nề nếp học tập và an toàn dụng cụ vẽ.',
        knsDesc: 'Kỹ năng hội họa, thuyết trình tiếng Anh và phát âm chuẩn.',
        ethicsDesc: '❤️ Phẩm chất Yêu cái đẹp & Sáng tạo: Sáng tạo tranh sắc màu.',
        devicesDesc: 'SGK Tiếng Anh 3, Dụng cụ vẽ, Audio Phonics, TV.'
      }
    }
  },

  'Unit 19': {
    unitTitle: 'Unit 19: Outdoor activities',
    theme: 'Outdoor Activities & Cycling in the park',
    lesson1: {
      act123: {
        aiCode: 'AI 3.C2.1',
        aiDesc: 'AI Voice Assistant phát âm mẫu câu hỏi hoạt động ngoài trời: "What are you doing? - I am cycling in the park / skating / flying a kite / skipping" ở HĐ 1, 2.',
        nlsDesc: 'Xem video 3D hướng dẫn các kỹ thuật vận động thể thao ngoài trời an toàn trên sachmem.vn.',
        atgtDesc: '🚦 Tích hợp Giáo dục ATGT trọng tâm (CV 3456): Quy tắc an toàn khi đi xe đạp (cycling): Đội mũ bảo hiểm đạt chuẩn, kiểm tra phanh và lốp xe trước khi đi, chỉ đi xe đạp trong công viên hoặc làn đường dành riêng cho xe thô sơ, tuyệt đối không buông thả 2 tay.',
        knsDesc: 'Kỹ năng tự bảo vệ bản thân khi tham gia các hoạt động thể thao ngoài trời (khởi động kỹ, mang đồ bảo hộ đầu gối/khuỷu tay khi trượt patin - skating).',
        ethicsDesc: '❤️ Phẩm chất Ý thức kỷ luật & Chăm chỉ: Tự giác rèn luyện thể dục thể thao nâng cao sức khỏe và tuân thủ luật an toàn.',
        devicesDesc: 'SGK Tiếng Anh 3, Mũ bảo hiểm xe đạp mini, Bộ bảo hộ patin, Flashcards hoạt động, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI Camera nhận diện động tác mô phỏng đạp xe, thả diều, nhảy dây của học sinh khi nói câu tiếng Anh tại HĐ 4, 5, 6.',
        nlsDesc: 'Làm bài tập trắc nghiệm số hóa phân biệt nơi chơi an toàn (công viên, sân trường) và nơi nguy hiểm (lòng đường) trên Quizizz.',
        atgtDesc: '🚦 ATGT: Tuyệt đối không thả diều (flying a kite) gần đường dây điện cao thế hoặc gần lòng đường giao thông.',
        knsDesc: 'Kỹ năng xử lý tình huống khi bị ngã trầy xước nhẹ và sơ cứu ban đầu.',
        ethicsDesc: '❤️ Phẩm chất Trách nhiệm: Giữ an toàn cho bản thân và bạn bè xung quanh khi vui chơi.',
        devicesDesc: 'SGK Tiếng Anh 3, Sa bàn công viên mini, TV cảm ứng.'
      },
      all: {
        aiCode: 'AI 3.C2.1',
        aiDesc: 'AI nhận diện giọng nói và cử chỉ hoạt động ngoài trời ("I am cycling/skating"); AI phân tích độ chính xác thì hiện tại tiếp diễn.',
        nlsDesc: 'Khai thác ứng dụng học liệu số taphuan.nxbgd.vn, video hướng dẫn thể thao an toàn.',
        atgtDesc: '🚦 ATGT (CV 3456): Đội mũ bảo hiểm khi đi xe đạp, không thả diều gần lòng đường/đường điện.',
        knsDesc: 'Kỹ năng vận động an toàn ngoài trời và sơ cứu chấn thương nhẹ.',
        ethicsDesc: '❤️ Phẩm chất Chăm chỉ & Trách nhiệm: Rèn luyện thân thể, giữ an toàn công cộng.',
        devicesDesc: 'SGK Tiếng Anh 3, Đồ bảo hộ thể thao, Flashcards, TV thông minh.'
      }
    },
    lesson2: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI phát âm chuẩn câu hỏi ngôi thứ ba: "What is he/she doing? - He is flying a kite / She is swimming in the pool" ở HĐ 1, 2.',
        nlsDesc: 'Tương tác trò chơi kéo thả nhân vật vào đúng hoạt động thể thao ngoài trời trên hoclieu.vn.',
        atgtDesc: '🚦 ATGT: An toàn bơi lội (swimming): Chỉ bơi ở bể bơi có người cứu hộ giám sát, luôn mặc áo phao khi chưa biết bơi thành thạo, phòng chống đuối nước.',
        knsDesc: 'Kỹ năng phòng chống đuối nước và quy tắc an toàn dưới nước.',
        ethicsDesc: '❤️ Phẩm chất Tương trợ: Luôn để mắt giúp đỡ bạn nhỏ khi cùng vui chơi ngoài trời.',
        devicesDesc: 'SGK Tiếng Anh 3, Áo phao mini, Flashcards hoạt động ngoài trời, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI tạo bài kiểm tra nghe hiểu phản xạ câu hỏi thì hiện tại tiếp diễn tại HĐ 5, 6.',
        nlsDesc: 'Làm bài tập trắc nghiệm số hóa trên Wordwall ghép tranh với câu miêu tả đúng.',
        atgtDesc: 'Đi bộ sang đường an toàn sau khi chơi thể thao ở công viên về.',
        knsDesc: 'Kỹ năng phối hợp làm việc nhóm và giao tiếp bằng tiếng Anh tự nhiên.',
        ethicsDesc: '❤️ Phẩm chất Trung thực: Thật thà trong các trò chơi vận động thể thao.',
        devicesDesc: 'SGK Tiếng Anh 3, Bảng nhóm, TV tương tác.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Voice Assistant đối thoại ngôi thứ 3 ("What is he doing? - He is..."); AI nhận diện phát âm đuôi -ing.',
        nlsDesc: 'Học liệu số sachmem.vn, kỹ năng làm bài tập tương tác số.',
        atgtDesc: '🚦 ATGT: Phòng chống đuối nước và an toàn đường bộ khi đi chơi thể thao.',
        knsDesc: 'Kỹ năng an toàn dưới nước và làm việc nhóm.',
        ethicsDesc: '❤️ Phẩm chất Tương trợ & Chăm chỉ: Đoàn kết vui chơi lành mạnh.',
        devicesDesc: 'SGK Tiếng Anh 3, Flashcards, TV thông minh.'
      }
    },
    lesson3: {
      act123: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI Phonics phân tích âm /s/ trong "skating/skipping" và âm /s/ trong "cycling/city" ở HĐ 1, 2.',
        nlsDesc: 'Nghe và hát theo bài chant hoạt động ngoài trời số hóa trên sachmem.vn.',
        atgtDesc: 'Bảo vệ mắt khi học cùng màn hình điện tử.',
        knsDesc: 'Kỹ năng phát âm chuẩn xác phụ âm ghép /sk/ và âm /s/ mềm của chữ cái C.',
        ethicsDesc: '❤️ Phẩm chất Kiên trì: Luyện phát âm đúng từng âm tiết.',
        devicesDesc: 'SGK Tiếng Anh 3, Audio Phonics, TV.'
      },
      act456: {
        aiCode: 'AI 1.C1.2',
        aiDesc: 'AI hỗ trợ viết đoạn văn "My favorite outdoor activity" tại HĐ 5 & HĐ 6 (Project: Safety Sports Poster).',
        nlsDesc: 'Sử dụng Canva thiết kế poster tuyên truyền "An toàn khi chơi thể thao ngoài trời".',
        atgtDesc: 'An toàn khi sử dụng dụng cụ thể thao và thiết bị điện tử.',
        knsDesc: 'Kỹ năng thiết kế poster tuyên truyền và thuyết trình thông điệp an toàn bằng tiếng Anh.',
        ethicsDesc: '❤️ Phẩm chất Trách nhiệm xã hội: Lan tỏa thông điệp vui chơi an toàn đến cộng đồng.',
        devicesDesc: 'Giấy A3, bút màu, Mẫu poster trên TV.'
      },
      all: {
        aiCode: 'AI 1.C1.1',
        aiDesc: 'AI nhận diện âm Phonics /sk/ & /s/; AI hỗ trợ tạo poster thể thao an toàn.',
        nlsDesc: 'Học liệu số taphuan.nxbgd.vn, kỹ năng thiết kế ấn phẩm số.',
        atgtDesc: 'Ý thức tuyên truyền an toàn giao thông và thể thao ngoài trời.',
        knsDesc: 'Kỹ năng viết luận ngắn, thuyết trình và bảo vệ an toàn bản thân.',
        ethicsDesc: '❤️ Phẩm chất Trách nhiệm & Tự tin: Tuyên truyền lối sống lành mạnh.',
        devicesDesc: 'SGK Tiếng Anh 3, Dụng cụ vẽ, Audio Phonics, TV.'
      }
    }
  }
};
