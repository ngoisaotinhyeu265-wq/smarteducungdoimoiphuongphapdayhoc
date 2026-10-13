/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import QuestionBank from './components/QuestionBank';
import GameCenter from './components/GameCenter';
import StudentGamificationHub from './components/StudentGamification/StudentGamificationHub';
import StudentReport from './components/StudentReport';
import AIAssistant from './components/AIAssistant';
import ExamArchive from './components/ExamArchive';
import LessonPlanner from './components/LessonPlanner';
import EnglishVocabGenerator from './components/EnglishVocab/EnglishVocabGenerator';
import EnglishWarmupStudio from './components/EnglishWarmup/EnglishWarmupStudio';
import EnglishCurriculumPlan2345 from './components/EnglishCurriculumPlan2345';
import PersonalAppendix2Manager from './components/PersonalAppendix2Manager';
import KHDHPhuLuc2NTKT from './components/KHDHPhuLuc2NTKT';
import SGVComprehensiveExplorer from './components/SGVComprehensiveExplorer';
import GDPTCuratedLibrary from './components/GDPTLibrary/GDPTCuratedLibrary';
import SettingsPanel from './components/SettingsPanel';
import EditPermissionModal from './components/EditPermissionModal';
import CertificateVerifyModal, { VerifyCertificateInfo } from './components/CertificateVerifyModal';
import FloatingTextLookup from './components/FloatingTextLookup';
import PrimaryDictionaryModal from './components/PrimaryDictionaryModal';
import { NotificationItem } from './components/NotificationCenterModal';
import { Question, GameType } from './types';
import { sounds } from './lib/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMuted, setIsMuted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDictionaryModalOpen, setIsDictionaryModalOpen] = useState(false);

  // Coins & Gamification state
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('smartedu_teacher_coins');
    return saved ? parseInt(saved, 10) : 2450;
  });

  const handleAddCoins = (amount: number) => {
    setCoins(prev => {
      const next = Math.max(0, prev + amount);
      localStorage.setItem('smartedu_teacher_coins', next.toString());
      return next;
    });
  };

  // Author & Permission Lock System (ThanhNguyen)
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('smartedu_owner_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isEditLockedForGuests, setIsEditLockedForGuests] = useState<boolean>(() => {
    const saved = localStorage.getItem('smartedu_lock_for_guests');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [ownerPin, setOwnerPin] = useState<string>(() => {
    return localStorage.getItem('smartedu_owner_pin') || '123456';
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('smartedu_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'notif_1',
        type: 'ai',
        title: '🤖 Trợ lý AI đã sẵn sàng soạn Kế hoạch bài dạy CV 2345',
        content: 'Đã tích hợp đầy đủ quy chuẩn Công văn 2345/BGDĐT-GDTH, SGK Kết nối tri thức với cuộc sống & Bộ Giáo dục và Đào tạo (Global Success) trọn vẹn 35 tuần.',
        time: 'Vừa xong',
        isRead: true
      },
      {
        id: 'notif_2',
        type: 'security',
        title: '🔒 Đã kích hoạt Chế độ Bảo Vệ Quyền Tác Giả ThanhNguyen',
        content: 'Liên kết được khóa bảo vệ an toàn. Chỉ tài khoản chính chủ Cô Thanh Nguyễn mới có quyền sửa đổi nội dung.',
        time: '5 phút trước',
        isRead: true
      },
      {
        id: 'notif_3',
        type: 'game',
        title: '🎉 500+ Game lớp học & Thú cưng ảo đã đồng bộ',
        content: 'Học sinh có thể tham gia Frog Jump, Memory Match và Vòng quay may mắn trực tiếp.',
        time: '1 giờ trước',
        isRead: true
      }
    ];
  });

  const saveNotifications = (items: NotificationItem[]) => {
    setNotifications(items);
    localStorage.setItem('smartedu_notifications', JSON.stringify(items));
  };

  const handleMarkAllRead = () => {
    saveNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAllNotifications = () => {
    saveNotifications([]);
  };

  const handleApprovePermissionRequest = (notifId: string) => {
    saveNotifications(notifications.map(n => {
      if (n.id === notifId) {
        return {
          ...n,
          isRead: true,
          content: `${n.content} (ĐÃ ĐƯỢC CÔ THANH NGUYỄN PHÊ DUYỆT CẤP QUYỀN ✅)`
        };
      }
      return n;
    }));
    sounds.playLevelUp();
    alert('Đã phê duyệt cấp quyền chỉnh sửa cho đồng nghiệp! 🎉');
  };

  const handleRejectPermissionRequest = (notifId: string) => {
    saveNotifications(notifications.filter(n => n.id !== notifId));
  };

  // Permission challenge popup
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [permissionActionTitle, setPermissionActionTitle] = useState('chỉnh sửa nội dung này');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const checkCanEdit = (actionTitle: string, onAuthorized: () => void) => {
    if (isOwnerMode || !isEditLockedForGuests) {
      onAuthorized();
      return;
    }
    setPermissionActionTitle(actionTitle);
    setPendingCallback(() => onAuthorized);
    setPermissionModalOpen(true);
    sounds.playError?.();
  };

  const handleUnlockSuccess = () => {
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  const handleSendPermissionRequest = (requesterName: string, reason: string) => {
    const newNotif: NotificationItem = {
      id: 'req_' + Date.now(),
      type: 'permission_request',
      title: `📩 Yêu cầu cấp quyền sửa từ: ${requesterName}`,
      content: reason,
      time: 'Vừa xong',
      isRead: false,
      requestDetails: {
        requesterName,
        requesterSchool: 'Đồng nghiệp truy cập link'
      }
    };
    saveNotifications([newNotif, ...notifications]);
  };

  // Cross-navigation auxiliary states
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [gameStartType, setGameStartType] = useState<GameType | undefined>(undefined);
  const [gameStartQuestion, setGameStartQuestion] = useState<Question | undefined>(undefined);
  const [gameCustomQuestions, setGameCustomQuestions] = useState<Question[] | undefined>(undefined);
  const [autofillTopic, setAutofillTopic] = useState('');
  const [lessonPlannerPrefill, setLessonPlannerPrefill] = useState<any>(null);
  const [sgvPrefill, setSgvPrefill] = useState<{ subject?: string; grade?: string; week?: number } | null>(null);

  // 1. Fetch questions on mount
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/questions');
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
        // Backup to localStorage for fallback robustness
        localStorage.setItem('smartedu_questions_backup', JSON.stringify(data));
      } else {
        throw new Error('Failed to fetch questions from API');
      }
    } catch (err) {
      console.warn('API error fetching questions, falling back to local storage cache:', err);
      const cache = localStorage.getItem('smartedu_questions_backup');
      if (cache) {
        setQuestions(JSON.parse(cache));
      } else {
        // Fallback default mock list in case server completely fails
        setQuestions([
          {
            id: 'q1',
            text: 'Một con gà có 2 cái chân. Hỏi 5 con gà như thế có tất cả bao nhiêu cái chân?',
            type: 'multiple_choice',
            options: ['8 cái chân', '10 cái chân', '12 cái chân', '15 cái chân'],
            answer: '10 cái chân',
            subject: 'Toán',
            grade: 2,
            difficulty: 'Dễ',
            useCount: 12,
            explanation: 'Mỗi con gà có 2 chân, 5 con gà sẽ có: 2 x 5 = 10 cái chân nhé bé yêu!',
            tags: ['Phép nhân', 'Tính nhẩm']
          },
          {
            id: 'q2',
            text: 'Từ nào sau đây viết ĐÚNG chính tả?',
            type: 'multiple_choice',
            options: ['Trăn trở', 'Chăn chở', 'Trăn chở', 'Chăn trở'],
            answer: 'Trăn trở',
            subject: 'Tiếng Việt',
            grade: 3,
            difficulty: 'Trung bình',
            useCount: 15,
            explanation: '"Trăn trở" viết đúng với âm đầu "tr" và "tr" nhé. "Trăn trở" thể hiện sự băn khoăn suy nghĩ nhiều đấy học sinh nhỏ ơi!',
            tags: ['Chính tả', 'Từ vựng']
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Verification Modal State when QR code is scanned or URL contains verification params
  const [verifyCertificateInfo, setVerifyCertificateInfo] = useState<VerifyCertificateInfo | null>(null);

  useEffect(() => {
    fetchQuestions();

    // Check if page opened via QR code scan or URL query params
    try {
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('verify') === 'true' || params.has('code')) {
          const code = params.get('code') || 'SMARTEDU-GVST-2026-882391';
          const name = params.get('name') || 'Cô Giáo Thanh Nguyễn';
          const school = params.get('school') || 'Trường Tiểu Học & Hệ Thống Đổi Mới SmartEdu';
          const date = params.get('date') || new Date().toLocaleDateString('vi-VN');
          const title = params.get('title') || 'GIÁO VIÊN SÁNG TẠO TIÊU BIỂU';

          setVerifyCertificateInfo({
            code,
            name,
            school,
            date,
            title
          });
          sounds.playLevelUp?.();
        }
      }
    } catch (e) {
      console.warn('Error reading verification query params:', e);
    }
  }, []);

  // Sync mute state with sounds manager
  const handleMuteToggle = () => {
    const updated = !isMuted;
    setIsMuted(updated);
    sounds.toggle(!updated); // sounds.toggle takes enabled status
  };

  // 2. CRUD: Create Question
  const handleCreateQuestion = async (newQ: Omit<Question, 'id' | 'useCount'>) => {
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQ)
      });
      if (res.ok) {
        const created = await res.json();
        setQuestions(prev => [created, ...prev]);
      } else {
        throw new Error('API create failed');
      }
    } catch (err) {
      console.warn('API error creating question, appending locally:', err);
      const localItem: Question = {
        ...newQ,
        id: 'local_' + Math.random().toString(36).substring(2, 9),
        useCount: 0
      };
      setQuestions(prev => [localItem, ...prev]);
    }
  };

  // 3. CRUD: Update Question
  const handleUpdateQuestion = async (id: string, updatedQ: Question) => {
    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQ)
      });
      if (res.ok) {
        const updated = await res.json();
        setQuestions(prev => prev.map(q => q.id === id ? updated : q));
      } else {
        throw new Error('API update failed');
      }
    } catch (err) {
      console.warn('API error updating question, saving locally:', err);
      setQuestions(prev => prev.map(q => q.id === id ? updatedQ : q));
    }
  };

  // 4. CRUD: Delete Question
  const handleDeleteQuestion = async (id: string) => {
    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setQuestions(prev => prev.filter(q => q.id !== id));
      } else {
        throw new Error('API delete failed');
      }
    } catch (err) {
      console.warn('API error deleting question, removing locally:', err);
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  // 5. Reset Question Bank to default samples
  const handleResetQuestions = async () => {
    try {
      // Clean up server-side questions index
      // To keep it simple, we re-initialize locally & overwrite or call server refresh
      setQuestions([]);
      localStorage.removeItem('smartedu_questions_backup');
      await fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Append multiple questions (like imported or generated)
  const handleAddMultipleQuestions = (newQs: Question[]) => {
    setQuestions(prev => [...newQs, ...prev]);
  };

  // 7. Navigation dispatcher
  const handleNavigate = (tabId: string, payload?: any) => {
    setActiveTab(tabId);
    if (tabId === 'questions') {
      if (payload?.search !== undefined) setSearchQuery(payload.search);
      if (payload?.typeFilter !== undefined) setTypeFilter(payload.typeFilter);
    } else if (tabId === 'games') {
      if (payload?.startType !== undefined) {
        setGameStartType(payload.startType);
      } else {
        setGameStartType(undefined);
      }
      if (payload?.startQuestion !== undefined) {
        setGameStartQuestion(payload.startQuestion);
      } else {
        setGameStartQuestion(undefined);
      }
      if (payload?.customQuestions !== undefined) {
        setGameCustomQuestions(payload.customQuestions);
      } else {
        setGameCustomQuestions(undefined);
      }
    } else if (tabId === 'ai') {
      if (payload?.autofill !== undefined) {
        setAutofillTopic(payload.autofill);
      } else {
        setAutofillTopic('');
      }
    } else if (tabId === 'lesson_planner') {
      if (payload) {
        setLessonPlannerPrefill(payload);
      }
    } else if (tabId === 'sgv_explorer') {
      if (payload) {
        setSgvPrefill(payload);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] via-[#4F46E5] to-[#00C2FF] p-2 md:p-6 flex flex-col gap-4 pb-20 font-sans text-gray-800 transition-all relative overflow-hidden">
      
      {/* Dynamic Whimsical Background Icons Floating behind */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 pointer-events-none select-none animate-float">☁️</div>
      <div className="absolute top-32 right-24 text-5xl opacity-25 pointer-events-none select-none animate-pulse-star">✨</div>
      <div className="absolute bottom-40 left-12 text-6xl opacity-15 pointer-events-none select-none animate-float-slow">⭐</div>
      <div className="absolute top-1/2 right-12 text-7xl opacity-20 pointer-events-none select-none animate-float">🌈</div>
      <div className="absolute bottom-20 right-1/4 text-6xl opacity-15 pointer-events-none select-none animate-float-slow">🎈</div>
      <div className="absolute top-[30%] left-1/3 text-4xl opacity-10 pointer-events-none select-none animate-pulse-star">⭐</div>
      <div className="absolute bottom-[30%] right-[10%] text-5xl opacity-10 pointer-events-none select-none animate-float">☁️</div>

      {/* Playful Header */}
      <Header 
        onMuteToggle={handleMuteToggle} 
        isMuted={isMuted}
        coins={coins}
        onAddCoins={handleAddCoins}
        isOwnerMode={isOwnerMode}
        setIsOwnerMode={setIsOwnerMode}
        isEditLockedForGuests={isEditLockedForGuests}
        setIsEditLockedForGuests={setIsEditLockedForGuests}
        ownerPin={ownerPin}
        setOwnerPin={setOwnerPin}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onClearAllNotifications={handleClearAllNotifications}
        onApprovePermissionRequest={handleApprovePermissionRequest}
        onRejectPermissionRequest={handleRejectPermissionRequest}
        onCheckCanEdit={checkCanEdit}
        onOpenDictionary={() => setIsDictionaryModalOpen(true)}
      />

      {/* Pill Navigation menu */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Floating Text Selection Lookup Tooltip */}
      <FloatingTextLookup onOpenFullDictionary={() => setIsDictionaryModalOpen(true)} />

      {/* Primary English 400+ Words Dictionary Modal */}
      <PrimaryDictionaryModal 
        isOpen={isDictionaryModalOpen} 
        onClose={() => setIsDictionaryModalOpen(false)} 
      />

      {/* Edit Permission Modal */}
      <EditPermissionModal
        isOpen={permissionModalOpen}
        onClose={() => {
          setPermissionModalOpen(false);
          setPendingCallback(null);
        }}
        actionTitle={permissionActionTitle}
        ownerPin={ownerPin}
        onUnlockSuccess={handleUnlockSuccess}
        onRequestPermission={handleSendPermissionRequest}
      />

      {/* Render selected active workspace screen */}
      <div className="flex-1 w-full max-w-7xl mx-auto z-10 relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <RotateCw className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="font-fredoka text-sm font-bold text-indigo-600">SmartEdu đang nạp hành lý kiến thức...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard 
                questionsCount={questions.length}
                studentsCount={5} // default 5 students
                onNavigate={handleNavigate}
                onAddQuestions={handleAddMultipleQuestions}
              />
            )}

            {activeTab === 'sgv_explorer' && (
              <SGVComprehensiveExplorer 
                initialSubject={sgvPrefill?.subject || 'Tiếng Anh'}
                initialGrade={sgvPrefill?.grade || 'Lớp 3'}
                initialWeek={sgvPrefill?.week}
                onNavigateToPlanner={(params) => {
                  handleNavigate('lesson_planner', params);
                }}
                onNavigateToCurriculum={(params) => {
                  handleNavigate('curriculum_2345', params);
                }}
              />
            )}

            {activeTab === 'personal_appendix2' && (
              <PersonalAppendix2Manager 
                onNavigateToPlanner={(params) => {
                  handleNavigate('lesson_planner', params);
                }}
                onOpenDictionary={() => setIsDictionaryModalOpen(true)}
              />
            )}

            {activeTab === 'curriculum_2345' && (
              <EnglishCurriculumPlan2345 
                onNavigateToPlanner={(subject, grade, week, periodIdx) => {
                  handleNavigate('lesson_planner', { subject, grade, week, periodIdx });
                }}
                onNavigateToVocab={(grade, unitTitle) => {
                  handleNavigate('vocab_planner', { grade, unitTitle });
                }}
                onNavigateToSGV={(subject, grade, week) => {
                  handleNavigate('sgv_explorer', { subject, grade, week });
                }}
                onOpenDictionary={() => setIsDictionaryModalOpen(true)}
              />
            )}

            {activeTab === 'khdh_phuluc2_ntkt' && (
              <KHDHPhuLuc2NTKT 
                onNavigateToPlanner={(params) => {
                  handleNavigate('lesson_planner', params);
                }}
                onOpenDictionary={() => setIsDictionaryModalOpen(true)}
              />
            )}

            {activeTab === 'gdpt_library' && (
              <GDPTCuratedLibrary 
                onNavigateToGames={(startType, customQuestions) => {
                  handleNavigate('games', { startType, customQuestions });
                }}
                onAddQuestionsToBank={(newQs) => {
                  handleAddMultipleQuestions(newQs);
                }}
                onNavigateToPlanner={(params) => {
                  handleNavigate('lesson_planner', params);
                }}
              />
            )}

            {activeTab === 'vocab_planner' && (
              <EnglishVocabGenerator 
                onNavigateToPlan={() => handleNavigate('curriculum_2345')}
              />
            )}

            {activeTab === 'warmup_studio' && (
              <EnglishWarmupStudio 
                onNavigateToPlan={() => handleNavigate('curriculum_2345')}
                onNavigateToVocab={() => handleNavigate('vocab_planner')}
              />
            )}

            {activeTab === 'questions' && (
              <QuestionBank 
                questions={questions}
                onDeleteQuestion={handleDeleteQuestion}
                onUpdateQuestion={handleUpdateQuestion}
                onCreateQuestion={handleCreateQuestion}
                searchQuery={searchQuery}
                typeFilter={typeFilter}
                onNavigateToAI={() => handleNavigate('ai')}
                onPlayQuestion={(q) => handleNavigate('games', { startType: 'quiz', startQuestion: q })}
              />
            )}

            {activeTab === 'games' && (
              <GameCenter 
                questions={questions}
                startType={gameStartType}
                startQuestion={gameStartQuestion}
                customQuestions={gameCustomQuestions}
              />
            )}

            {activeTab === 'lesson_planner' && (
              <LessonPlanner 
                onAddQuestions={handleAddMultipleQuestions}
                onNavigate={handleNavigate}
                initialPlanParams={lessonPlannerPrefill}
              />
            )}

            {activeTab === 'ai' && (
              <AIAssistant 
                onAddQuestions={handleAddMultipleQuestions}
                onNavigateToQuestions={() => handleNavigate('questions')}
                onNavigateToGames={() => handleNavigate('games')}
                autofillTopic={autofillTopic}
              />
            )}

            {activeTab === 'exams' && (
              <ExamArchive 
                onNavigateToAI={(payload) => handleNavigate('ai', payload)}
                onNavigateToGames={(questionsList) => {
                  if (questionsList && questionsList.length > 0) {
                    handleAddMultipleQuestions(questionsList);
                  }
                  handleNavigate('games');
                }}
              />
            )}

            {activeTab === 'reports' && (
              <StudentGamificationHub 
                onNavigateToGames={() => handleNavigate('games')}
                onNavigateToQuestions={() => handleNavigate('questions')}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsPanel 
                isMuted={isMuted}
                onMuteToggle={handleMuteToggle}
                onResetQuestions={handleResetQuestions}
                onOpenDictionary={() => setIsDictionaryModalOpen(true)}
              />
            )}
          </>
        )}
      </div>

      {/* Official Certificate Verification Modal (Triggered by QR Code Scan or URL Query) */}
      {verifyCertificateInfo && (
        <CertificateVerifyModal
          info={verifyCertificateInfo}
          onClose={() => setVerifyCertificateInfo(null)}
          onOpenApp={() => {
            setVerifyCertificateInfo(null);
            handleNavigate('lesson_planner');
          }}
        />
      )}
    </div>
  );
}
