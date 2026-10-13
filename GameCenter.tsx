/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, Play, Award, RotateCw, ChevronLeft, ChevronRight, 
  CheckCircle, XCircle, Volume2, Timer, Star, Trophy, Smile
} from 'lucide-react';
import { Question, GameType } from '../types';
import { sounds } from '../lib/audio';

interface GameCenterProps {
  questions: Question[];
  startType?: GameType;
  startQuestion?: Question;
  customQuestions?: Question[];
}

export default function GameCenter({ questions, startType, startQuestion, customQuestions }: GameCenterProps) {
  const [activeGame, setActiveGame] = useState<GameType | null>(startType || null);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'ended'>('lobby');

  // Load startType or startQuestion or customQuestions if passed down
  useEffect(() => {
    if (startType) {
      if (customQuestions && customQuestions.length > 0) {
        const gameQuestions = [...customQuestions];
        setSelectedQuestions(gameQuestions);
        setCurrentQIndex(0);
        setScore(0);
        setSelectedAns(null);
        setIsAnswered(false);
        setActiveGame(startType);
        setGameState('playing');
        
        if (startType === 'quiz' || startType === 'fill_blank' || startType === 'crossword') {
          setTimeout(() => {
            startQuizTimer(startType);
          }, 50);
        } else if (startType === 'memory') {
          setupMemoryCards(gameQuestions.slice(0, 4));
        } else if (startType === 'balloon') {
          setupBalloons(gameQuestions[0]);
        } else if (startType === 'frog') {
          setFrogPosition(0);
          setFrogStatus('idle');
        }
      } else if (startQuestion) {
        const otherQuestions = questions.filter(q => q.id !== startQuestion.id).sort(() => 0.5 - Math.random()).slice(0, 4);
        const gameQuestions = [startQuestion, ...otherQuestions];
        setSelectedQuestions(gameQuestions);
        setCurrentQIndex(0);
        setScore(0);
        setSelectedAns(null);
        setIsAnswered(false);
        setActiveGame(startType);
        setGameState('playing');
        
        if (startType === 'quiz') {
          setTimeout(() => {
            startQuizTimer();
          }, 50);
        } else if (startType === 'memory') {
          setupMemoryCards(gameQuestions.slice(0, 4));
        } else if (startType === 'balloon') {
          setupBalloons(startQuestion);
        } else if (startType === 'frog') {
          setFrogPosition(0);
          setFrogStatus('idle');
        }
      } else {
        initializeGame(startType);
      }
    }
  }, [startType, startQuestion, customQuestions]);

  // General game variables
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Fill in the blank & Crossword text input states
  const [userInputText, setUserInputText] = useState('');
  const [fillBlankSubmitted, setFillBlankSubmitted] = useState(false);
  const [fillBlankFeedback, setFillBlankFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Lucky Wheel states
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelSelectedIdx, setWheelSelectedIdx] = useState<number | null>(null);

  // Flashcards states
  const [cardFlipped, setCardFlipped] = useState(false);

  // Memory Game states
  interface MemoryCard {
    id: string;
    type: 'question' | 'answer';
    content: string;
    questionId: string;
    isFlipped: boolean;
    isMatched: boolean;
  }
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Balloon pop state
  interface Balloon {
    id: number;
    color: string;
    text: string;
    isPopped: boolean;
    isCorrect: boolean;
  }
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  // Frog Jump state
  const [frogPosition, setFrogPosition] = useState(0); // lilypad index 0 to 4
  const [frogStatus, setFrogStatus] = useState<'idle' | 'jumping' | 'splash'>('idle');

  // Interactive popup feedback states
  const [showCongrats, setShowCongrats] = useState(false);
  const [showWrongReset, setShowWrongReset] = useState(false);

  const gameOptions = [
    { id: 'quiz', title: '🎯 Trắc nghiệm & Trả lời nhanh', icon: '⚡', desc: 'Đấu trí nghẹt thở với đồng hồ bấm giờ 15s', color: 'bg-gradient-to-r from-purple-400 to-indigo-500' },
    { id: 'fill_blank', title: '✏️ Điền từ & Giải ô chữ', icon: '✏️', desc: 'Thử thách gõ từ, giải câu đố chữ và điền chỗ trống', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'wheel', title: '🎡 Vòng quay kỳ diệu', icon: '🎡', desc: 'Vòng quay may mắn ngẫu nhiên chọn câu hỏi', color: 'bg-gradient-to-r from-amber-400 to-orange-500' },
    { id: 'flashcard', title: '🎴 Thẻ Flashcard', icon: '🎴', desc: 'Học nhanh, nhớ lâu qua các mặt thẻ', color: 'bg-gradient-to-r from-pink-400 to-rose-500' },
    { id: 'memory', title: '🧩 Lật thẻ trí nhớ', icon: '🧩', desc: 'Ghép cặp câu hỏi với câu trả lời tương ứng', color: 'bg-gradient-to-r from-emerald-400 to-teal-500' },
    { id: 'balloon', title: '🎈 Balloon Pop', icon: '🎈', desc: 'Bắn bong bóng bay chứa đáp án đúng', color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { id: 'frog', title: '🐸 Ếch xanh qua sông', icon: '🐸', desc: 'Trả lời đúng để giúp chú ếch nhảy qua đầm sen', color: 'bg-gradient-to-r from-green-400 to-emerald-500' }
  ];

  // Helper to normalize and match student answers
  const normalizeText = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const checkAnswerMatch = (input: string, correctAns: string | string[]): boolean => {
    const cleanInput = input.trim().toLowerCase();
    if (!cleanInput) return false;
    
    if (Array.isArray(correctAns)) {
      return correctAns.some(a => checkAnswerMatch(input, a));
    }
    
    const cleanTarget = String(correctAns).trim().toLowerCase();
    if (cleanInput === cleanTarget) return true;
    if (cleanInput.replace(/[.,!?;:]/g, '').trim() === cleanTarget.replace(/[.,!?;:]/g, '').trim()) return true;
    if (normalizeText(cleanInput) === normalizeText(cleanTarget)) return true;
    
    return false;
  };

  // Initialize selected questions for game sessions
  const initializeGame = (type: GameType) => {
    sounds.playClick();
    if (questions.length === 0) {
      alert('Vui lòng tạo ít nhất một vài câu hỏi trong Kho câu hỏi trước khi bắt đầu trò chơi nhé cô!');
      return;
    }

    // Filter relevant questions if type is specific
    let pool = [...questions];
    if (type === 'fill_blank' || type === 'crossword') {
      const specific = questions.filter(q => ['fill_blank', 'crossword', 'reorder_words', 'reorder_letters', 'answer_question'].includes(q.type));
      if (specific.length > 0) pool = specific;
    }

    // Shuffle questions and select up to 5
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    setSelectedQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedAns(null);
    setIsAnswered(false);
    setUserInputText('');
    setFillBlankSubmitted(false);
    setFillBlankFeedback(null);
    setActiveGame(type);
    setGameState('playing');

    if (type === 'quiz' || type === 'fill_blank' || type === 'crossword') {
      startQuizTimer();
    } else if (type === 'memory') {
      setupMemoryCards(shuffled.slice(0, 4));
    } else if (type === 'balloon') {
      setupBalloons(shuffled[0]);
    } else if (type === 'frog') {
      setFrogPosition(0);
      setFrogStatus('idle');
    }
  };

  const quitGame = () => {
    sounds.playClick();
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveGame(null);
    setGameState('lobby');
    setUserInputText('');
    setFillBlankSubmitted(false);
    setFillBlankFeedback(null);
  };

  // --- 1. Quiz Timer & Answer Selection ---
  const startQuizTimer = (gameType?: GameType) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const targetType = gameType || activeGame;
    const duration = (targetType === 'fill_blank' || targetType === 'crossword') ? 45 : 15;
    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (targetType === 'fill_blank' || targetType === 'crossword') {
            handleFillBlankTimeout();
          } else {
            handleQuizAnswer(null); // timeout
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleFillBlankTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setFillBlankSubmitted(true);
    setFillBlankFeedback('wrong');
    sounds.playError();
    setShowWrongReset(true);
    setTimeout(() => {
      setShowWrongReset(false);
      setUserInputText('');
      setFillBlankSubmitted(false);
      setFillBlankFeedback(null);
      setIsAnswered(false);
      if (currentQIndex < selectedQuestions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        startQuizTimer();
      } else {
        setGameState('ended');
        sounds.playGameWin();
      }
    }, 2500);
  };

  // --- Handle Interactive Fill Blank / Crossword submission ---
  const handleFillBlankSubmit = () => {
    if (isAnswered || !userInputText.trim()) return;
    setIsAnswered(true);
    setFillBlankSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const currentQ = selectedQuestions[currentQIndex];
    const isCorrect = checkAnswerMatch(userInputText, currentQ.answer);

    if (isCorrect) {
      setFillBlankFeedback('correct');
      setScore(prev => prev + 200);
      sounds.playSuccess();
      setShowCongrats(true);

      setTimeout(() => {
        setShowCongrats(false);
        setUserInputText('');
        setFillBlankSubmitted(false);
        setFillBlankFeedback(null);
        setIsAnswered(false);
        if (currentQIndex < selectedQuestions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          startQuizTimer();
        } else {
          setGameState('ended');
          sounds.playGameWin();
        }
      }, 1800);
    } else {
      setFillBlankFeedback('wrong');
      sounds.playError();
      setShowWrongReset(true);
      setTimeout(() => {
        setShowWrongReset(false);
        setUserInputText('');
        setFillBlankSubmitted(false);
        setFillBlankFeedback(null);
        setIsAnswered(false);
        if (currentQIndex < selectedQuestions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          startQuizTimer();
        } else {
          setGameState('ended');
          sounds.playGameWin();
        }
      }, 2500);
    }
  };

  const handleQuizAnswer = (ans: string | null) => {
    if (isAnswered) return;
    setIsAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAns(ans);

    const currentQ = selectedQuestions[currentQIndex];
    if (ans === currentQ.answer) {
      setScore(prev => prev + 200);
      sounds.playSuccess();
      setShowCongrats(true);
      
      setTimeout(() => {
        setShowCongrats(false);
        setSelectedAns(null);
        setIsAnswered(false);
        if (currentQIndex < selectedQuestions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          startQuizTimer();
        } else {
          setGameState('ended');
          sounds.playGameWin();
        }
      }, 1500);
    } else {
      sounds.playError();
      setShowWrongReset(true);
      setTimeout(() => {
        setShowWrongReset(false);
        if (activeGame) {
          initializeGame(activeGame);
        }
      }, 1500);
    }
  };

  const nextQuizQuestion = () => {
    sounds.playClick();
    setSelectedAns(null);
    setIsAnswered(false);
    if (currentQIndex < selectedQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      startQuizTimer();
    } else {
      setGameState('ended');
      sounds.playGameWin();
    }
  };

  // --- 2. Lucky Wheel Logic ---
  const handleSpinWheel = () => {
    if (wheelSpinning) return;
    sounds.playClick();
    setWheelSpinning(true);
    setWheelSelectedIdx(null);

    // Randomize rotation: 3600 deg + random 0 to 360
    const extraRot = Math.floor(Math.random() * 360);
    const totalRotation = wheelRotation + 1800 + extraRot;
    setWheelRotation(totalRotation);

    // Play spinning ticks
    let ticks = 0;
    const tickInterval = setInterval(() => {
      sounds.playClick();
      ticks++;
      if (ticks > 15) clearInterval(tickInterval);
    }, 120);

    setTimeout(() => {
      setWheelSpinning(false);
      // Determine which slice was selected
      const numSlices = selectedQuestions.length;
      const normalizedAngle = (360 - (extraRot % 360)) % 360;
      const sliceSize = 360 / numSlices;
      const index = Math.floor(normalizedAngle / sliceSize) % numSlices;

      setWheelSelectedIdx(index);
      setCurrentQIndex(index);
      sounds.playLevelUp();
    }, 3000);
  };

  // --- 3. Memory Match Setup ---
  const setupMemoryCards = (qs: Question[]) => {
    const cards: MemoryCard[] = [];
    qs.forEach(q => {
      cards.push({
        id: `${q.id}_q`,
        type: 'question',
        content: q.text,
        questionId: q.id,
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        id: `${q.id}_a`,
        type: 'answer',
        content: typeof q.answer === 'string' ? q.answer : q.answer[0],
        questionId: q.id,
        isFlipped: false,
        isMatched: false
      });
    });
    // Shuffle cards
    setMemoryCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
  };

  const handleCardClick = (idx: number) => {
    if (memoryCards[idx].isFlipped || memoryCards[idx].isMatched || selectedCards.length >= 2) return;
    sounds.playClick();

    const updated = [...memoryCards];
    updated[idx].isFlipped = true;
    setMemoryCards(updated);

    const newSelected = [...selectedCards, idx];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstIdx, secondIdx] = newSelected;
      const card1 = updated[firstIdx];
      const card2 = updated[secondIdx];

      if (card1.questionId === card2.questionId && card1.type !== card2.type) {
        // Matched!
        setTimeout(() => {
          const matchedList = [...updated];
          matchedList[firstIdx].isMatched = true;
          matchedList[secondIdx].isMatched = true;
          setMemoryCards(matchedList);
          setSelectedCards([]);
          setScore(prev => prev + 200);
          sounds.playCoin();

          // Check if game is complete
          if (matchedList.every(c => c.isMatched)) {
            setGameState('ended');
            sounds.playGameWin();
          }
        }, 800);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          const resetList = [...updated];
          resetList[firstIdx].isFlipped = false;
          resetList[secondIdx].isFlipped = false;
          setMemoryCards(resetList);
          setSelectedCards([]);
          sounds.playError();
        }, 1200);
      }
    }
  };

  // --- 4. Balloon Pop Setup ---
  const setupBalloons = (q: Question) => {
    if (!q || !q.options) return;
    const colors = ['bg-pink-400 border-pink-500 shadow-pink-300', 'bg-blue-400 border-blue-500 shadow-blue-300', 'bg-yellow-400 border-yellow-500 shadow-yellow-300', 'bg-green-400 border-green-500 shadow-green-300'];
    const bList = q.options.map((opt, i) => ({
      id: i,
      color: colors[i % colors.length],
      text: opt,
      isPopped: false,
      isCorrect: opt === q.answer
    }));
    setBalloons(bList);
    setIsAnswered(false);
  };

  const handleBalloonClick = (balloonId: number) => {
    if (isAnswered) return;
    const balloon = balloons.find(b => b.id === balloonId);
    if (!balloon || balloon.isPopped) return;

    sounds.playCoin(); // pop sound synthesis

    const updated = balloons.map(b => b.id === balloonId ? { ...b, isPopped: true } : b);
    setBalloons(updated);

    if (balloon.isCorrect) {
      setIsAnswered(true);
      sounds.playSuccess();
      setScore(prev => prev + 200);
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
        setIsAnswered(false);
        if (currentQIndex < selectedQuestions.length - 1) {
          const nextIdx = currentQIndex + 1;
          setCurrentQIndex(nextIdx);
          setupBalloons(selectedQuestions[nextIdx]);
        } else {
          setGameState('ended');
          sounds.playGameWin();
        }
      }, 1500);
    } else {
      sounds.playError();
      setShowWrongReset(true);
      setTimeout(() => {
        setShowWrongReset(false);
        if (activeGame) {
          initializeGame(activeGame);
        }
      }, 1500);
    }
  };

  // --- 5. Frog Jump Logic ---
  const handleFrogAnswer = (opt: string) => {
    if (isAnswered) return;
    setIsAnswered(true);

    const currentQ = selectedQuestions[currentQIndex];
    if (opt === currentQ.answer) {
      setFrogStatus('jumping');
      sounds.playSuccess();
      setScore(prev => prev + 200);
      setShowCongrats(true);

      setTimeout(() => {
        setFrogPosition(prev => prev + 1);
        setFrogStatus('idle');
        setIsAnswered(false);
        setShowCongrats(false);

        if (currentQIndex < selectedQuestions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
        } else {
          setGameState('ended');
          sounds.playGameWin();
        }
      }, 1500);
    } else {
      setFrogStatus('splash');
      sounds.playError();
      setShowWrongReset(true);
      setTimeout(() => {
        setFrogStatus('idle');
        setIsAnswered(false);
        setShowWrongReset(false);
        if (activeGame) {
          initializeGame(activeGame);
        }
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 select-none animate-fade-in text-center">
      
      {/* 1. LOBBY VIEW (Select a Game) */}
      {gameState === 'lobby' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-fredoka text-xl md:text-2xl font-extrabold text-white flex items-center justify-center gap-2 drop-shadow-md">
              🎮 Sân Chơi Trò Chơi Học Tập
            </h2>
            <p className="text-xs md:text-sm text-indigo-100 font-semibold mt-1">
              Chọn một thể loại trò chơi bổ ích để học sinh tham gia rèn luyện kiến thức vui tươi!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gameOptions.map((game) => (
              <div 
                key={game.id}
                className="bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/20 p-6 shadow-2xl flex flex-col justify-between space-y-4 text-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className={`w-14 h-14 rounded-2xl ${game.color} text-white flex items-center justify-center text-3xl shadow-lg border-2 border-white`}>
                    {game.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-fredoka text-lg font-extrabold text-white">
                      {game.title}
                    </h3>
                    <p className="text-xs text-indigo-200 font-semibold leading-relaxed mt-1">
                      {game.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => initializeGame(game.id as GameType)}
                  className={`w-full py-3.5 rounded-2xl text-white font-fredoka font-extrabold text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md border border-white/20 hover:scale-103 transition-all ${game.color}`}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Bắt đầu chơi</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PLAYING VIEW */}
      {gameState === 'playing' && selectedQuestions.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/25 p-6 md:p-8 shadow-2xl space-y-6 relative text-white text-left">
          
          {/* Quit button */}
          <button 
            onClick={quitGame}
            className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-indigo-100 font-fredoka font-bold text-xs px-3.5 py-2 rounded-full cursor-pointer transition-all border border-white/10"
          >
            ← Thoát Game
          </button>

          {/* Header Progress status & Points */}
          <div className="flex justify-between items-center pt-4 border-b border-white/10 pb-3">
            <div className="text-left">
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 font-extrabold px-3 py-1 rounded-full uppercase">
                Trò chơi: {activeGame?.toUpperCase()}
              </span>
              <p className="font-fredoka text-xs text-indigo-200 font-bold mt-1.5">
                Câu hỏi {currentQIndex + 1} / {selectedQuestions.length}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-yellow-400 text-purple-950 px-4 py-2 rounded-2xl font-fredoka font-extrabold text-xs shadow-md border border-white/20 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600 animate-pulse" />
                <span>Điểm: {score}</span>
              </div>
            </div>
          </div>

          {/* GAME 1: QUIZ & FILL-IN-THE-BLANK / CROSSWORD GAME (With timer) */}
          {(activeGame === 'quiz' || activeGame === 'fill_blank' || activeGame === 'crossword') && selectedQuestions[currentQIndex] && (
            <div className="space-y-6">
              {/* Question Text & Timer bubble */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-fredoka font-bold text-yellow-300 border border-white/20">
                    {selectedQuestions[currentQIndex]?.type === 'crossword' ? '🧩 Ô CHỮ (CROSSWORD)' :
                     selectedQuestions[currentQIndex]?.type === 'fill_blank' ? '✏️ ĐIỀN VÀO CHỖ TRỐNG' :
                     selectedQuestions[currentQIndex]?.type === 'reorder_words' ? '🔤 SẮP XẾP TỪ THÀNH CÂU' :
                     selectedQuestions[currentQIndex]?.type === 'reorder_letters' ? '🔠 SẮP XẾP CHỮ CÁI' :
                     selectedQuestions[currentQIndex]?.options && selectedQuestions[currentQIndex].options!.length > 0 ? '🎯 TRẮC NGHIỆM' : '📝 TỰ LUẬN / TRẢ LỜI'}
                  </span>
                  
                  <div className={`w-12 h-12 rounded-full border-4 ${timeLeft <= 5 ? 'border-red-400 text-red-400 animate-bounce' : 'border-indigo-400 text-indigo-300'} flex items-center justify-center font-fredoka font-extrabold text-lg shadow-md`}>
                    {timeLeft}s
                  </div>
                </div>

                {/* Reading Passage if present */}
                {selectedQuestions[currentQIndex]?.passage && (
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-xs md:text-sm text-indigo-50 leading-relaxed max-h-40 overflow-y-auto">
                    {selectedQuestions[currentQIndex]?.passageTitle && (
                      <p className="font-bold text-yellow-300 mb-1">📖 {selectedQuestions[currentQIndex]?.passageTitle}</p>
                    )}
                    <p className="italic">{selectedQuestions[currentQIndex]?.passage}</p>
                  </div>
                )}

                <h3 className="font-fredoka text-lg md:text-xl font-extrabold text-white text-center drop-shadow-md">
                  {selectedQuestions[currentQIndex]?.text}
                </h3>
              </div>

              {/* Conditional: Multiple Choice Options OR Interactive Text Input */}
              {selectedQuestions[currentQIndex]?.options && selectedQuestions[currentQIndex].options!.length > 0 && 
               activeGame !== 'fill_blank' && activeGame !== 'crossword' &&
               !['fill_blank', 'crossword', 'reorder_words', 'reorder_letters', 'answer_question', 'essay'].includes(selectedQuestions[currentQIndex]?.type) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {selectedQuestions[currentQIndex]?.options?.map((opt, i) => {
                    const colors = ['from-red-400 to-rose-500 shadow-red-300', 'from-blue-400 to-indigo-500 shadow-blue-300', 'from-amber-400 to-orange-500 shadow-orange-300', 'from-green-400 to-emerald-500 shadow-green-300'];
                    const letters = ['🔴 A', '🔵 B', '🟡 C', '🟢 D'];
                    const isCorrect = opt === selectedQuestions[currentQIndex]?.answer;
                    const isUserSelection = selectedAns === opt;

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => handleQuizAnswer(opt)}
                        className={`p-5 rounded-3xl text-white font-fredoka font-bold text-left text-sm md:text-base border-2 border-white/20 shadow-md transform hover:scale-102 transition-all cursor-pointer flex flex-col justify-center space-y-1 bg-gradient-to-br ${colors[i % colors.length]}
                          ${isAnswered ? 'opacity-40' : ''}
                          ${isAnswered && isCorrect ? 'opacity-100 ring-4 ring-green-400 scale-103' : ''}
                          ${isAnswered && isUserSelection && !isCorrect ? 'opacity-100 ring-4 ring-red-400' : ''}
                        `}
                      >
                        <span className="text-xs opacity-75 uppercase">{letters[i]}</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* INTERACTIVE INPUT FOR FILL-IN-THE-BLANK / CROSSWORD / REORDER / ESSAY */
                <div className="space-y-4 bg-white/10 p-5 rounded-3xl border border-white/20 backdrop-blur-md">
                  
                  {/* Crossword Letter Boxes Preview */}
                  {selectedQuestions[currentQIndex]?.type === 'crossword' && (
                    <div className="space-y-2 text-center">
                      <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
                        Ô chữ gồm {String(selectedQuestions[currentQIndex]?.answer).replace(/\s/g, '').length} chữ cái:
                      </p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {String(selectedQuestions[currentQIndex]?.answer).replace(/\s/g, '').split('').map((char, ci) => {
                          const typedChar = userInputText.replace(/\s/g, '')[ci] || '';
                          return (
                            <div
                              key={ci}
                              className={`w-10 h-10 rounded-xl border-2 font-fredoka font-extrabold text-lg flex items-center justify-center transition-all ${
                                typedChar 
                                  ? 'bg-yellow-400 text-purple-950 border-yellow-300 shadow-md scale-105' 
                                  : 'bg-white/20 border-white/30 text-white/50'
                              }`}
                            >
                              {typedChar ? typedChar.toUpperCase() : ci + 1}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Word Bank chips for reorder_words */}
                  {selectedQuestions[currentQIndex]?.type === 'reorder_words' && selectedQuestions[currentQIndex]?.text && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-indigo-200">Gợi ý từ (Bấm vào từ để ghép nhanh vào câu):</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuestions[currentQIndex]?.text
                          .replace(/[/[\]]/g, ' ')
                          .split(/[\s/|]+/)
                          .filter(w => w.trim().length > 0 && !w.includes('?') && !w.includes(':'))
                          .map((word, wi) => (
                            <button
                              key={wi}
                              type="button"
                              onClick={() => {
                                sounds.playClick();
                                setUserInputText(prev => prev ? `${prev} ${word}` : word);
                              }}
                              className="px-3 py-1.5 bg-white/20 hover:bg-yellow-400 hover:text-purple-950 text-white text-xs font-bold rounded-xl border border-white/30 cursor-pointer transition-all active:scale-95"
                            >
                              + {word}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Text input field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-yellow-300">
                      ✍️ Ô nhập câu trả lời / từ cần điền của bé:
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={userInputText}
                        disabled={isAnswered}
                        onChange={(e) => setUserInputText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleFillBlankSubmit();
                        }}
                        placeholder={
                          selectedQuestions[currentQIndex]?.type === 'crossword'
                            ? 'Nhập từ giải ô chữ...'
                            : selectedQuestions[currentQIndex]?.type === 'fill_blank'
                            ? 'Nhập từ hoặc số cần điền...'
                            : 'Nhập câu trả lời của bé...'
                        }
                        className="w-full py-4 pl-5 pr-24 rounded-2xl bg-white text-gray-900 placeholder-gray-400 text-base md:text-lg font-bold border-3 border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300/60 shadow-lg"
                        autoFocus
                      />
                      
                      {userInputText && !isAnswered && (
                        <button
                          type="button"
                          onClick={() => setUserInputText('')}
                          className="absolute right-3 px-2.5 py-1 text-xs font-bold text-gray-400 hover:text-red-500 bg-gray-100 rounded-lg cursor-pointer transition-all"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    disabled={!userInputText.trim() || isAnswered}
                    onClick={handleFillBlankSubmit}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 font-fredoka font-extrabold text-base md:text-lg shadow-lg cursor-pointer transform hover:scale-102 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>🚀 GỬI CÂU TRẢ LỜI & KIỂM TRA (ENTER)</span>
                  </button>

                </div>
              )}

              {/* Answer explanation banner */}
              {isAnswered && (
                <div className="p-5 rounded-3xl text-left space-y-2 border bg-white/10 border-white/15 backdrop-blur-md">
                  <p className="font-fredoka font-extrabold text-sm text-white flex items-center gap-1.5">
                    {selectedAns === selectedQuestions[currentQIndex]?.answer || fillBlankFeedback === 'correct' ? (
                      <span className="text-emerald-300">🎉 Bé quá xuất sắc! Điền chính xác rồi! (+200 điểm)</span>
                    ) : (
                      <span className="text-rose-300">❌ Chưa đúng rồi bé ơi! Lần sau cố lên nhé!</span>
                    )}
                  </p>
                  
                  <p className="font-sans text-xs md:text-sm text-yellow-300 font-bold">
                    🔑 Đáp án đúng: {Array.isArray(selectedQuestions[currentQIndex]?.answer) ? selectedQuestions[currentQIndex]?.answer.join(' / ') : selectedQuestions[currentQIndex]?.answer}
                  </p>

                  {selectedQuestions[currentQIndex]?.explanation && (
                    <p className="font-sans text-xs md:text-sm text-indigo-100">
                      💡 {selectedQuestions[currentQIndex]?.explanation}
                    </p>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={nextQuizQuestion}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-md border border-white/10"
                    >
                      Tiếp tục câu sau →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: LUCKY WHEEL GAME */}
          {activeGame === 'wheel' && (
            <div className="space-y-6 flex flex-col items-center">
              <h3 className="font-fredoka text-lg md:text-xl font-extrabold text-white text-center drop-shadow-md">
                Nhấn SPIN để quay vòng quay may mắn tìm câu hỏi!
              </h3>

              {/* Spinning Wheel Component with simple CSS rotations */}
              <div className="relative w-64 h-64 my-4 flex items-center justify-center">
                {/* Pointer arrow */}
                <div className="absolute -top-3 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[20px] border-l-transparent border-r-transparent border-t-red-500 z-10 animate-bounce"></div>
                
                {/* Visual Wheel Circle */}
                <div 
                  className={`w-full h-full rounded-full border-8 border-yellow-400 bg-white shadow-xl overflow-hidden relative transition-transform`}
                  style={{ 
                    transform: `rotate(${wheelRotation}deg)`,
                    transition: wheelSpinning ? 'transform 3s cubic-bezier(0.1, 0.8, 0.1, 1)' : 'none'
                  }}
                >
                  {/* Generate slices based on available shuffled questions */}
                  {selectedQuestions.map((q, idx) => {
                    const numSlices = selectedQuestions.length;
                    const rotateAngle = (360 / numSlices) * idx;
                    const skewAngle = 90 - (360 / numSlices);
                    const colors = ['#FF4D8D', '#00C2FF', '#FFD93D', '#00E5A8', '#FF7A59', '#6C63FF'];

                    return (
                      <div 
                        key={idx}
                        className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-end justify-center pb-8 text-white font-fredoka font-extrabold text-lg select-none"
                        style={{
                          transform: `rotate(${rotateAngle}deg) skewY(-${skewAngle}deg)`,
                          backgroundColor: colors[idx % colors.length],
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                          width: '50%',
                          height: '50%',
                          left: '50%',
                          top: '0'
                        }}
                      >
                        {/* Question Badge Index Text (needs reverse rotating to keep readable) */}
                        <span 
                          className="absolute text-white font-bold"
                          style={{
                            transform: `skewY(${skewAngle}deg) rotate(45deg) translate(-10px, -20px)`,
                            fontSize: '15px'
                          }}
                        >
                          Q{idx + 1}
                        </span>
                      </div>
                    );
                  })}

                  {/* Center pin */}
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-4 border-yellow-400 shadow-md flex items-center justify-center z-10 font-bold text-gray-700 text-xs">
                    🌟
                  </div>
                </div>
              </div>

              {/* Spin controller trigger button */}
              <button
                disabled={wheelSpinning}
                onClick={handleSpinWheel}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-white font-fredoka font-extrabold rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {wheelSpinning ? 'Vòng quay đang quay...' : 'SPIN! QUAY NGAY 🎡'}
              </button>

              {/* Prompts selected Question if spin complete */}
              {wheelSelectedIdx !== null && selectedQuestions[currentQIndex] && (
                <div className="p-5 bg-white/10 border border-white/15 rounded-3xl text-left space-y-4 animate-float w-full">
                  <h4 className="font-fredoka font-extrabold text-yellow-300 flex items-center gap-1.5">
                    🎡 Vòng quay dừng ở câu hỏi {wheelSelectedIdx + 1}!
                  </h4>
                  <p className="font-sans font-bold text-white text-sm md:text-base">
                    "{selectedQuestions[currentQIndex]?.text}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedQuestions[currentQIndex]?.options ? (
                      selectedQuestions[currentQIndex]?.options?.map((opt, i) => (
                        <button
                          key={i}
                          disabled={isAnswered}
                          onClick={() => {
                            if (isAnswered) return;
                            setIsAnswered(true);
                            if (opt === selectedQuestions[currentQIndex]?.answer) {
                              setScore(prev => prev + 200);
                              sounds.playSuccess();
                              setShowCongrats(true);
                              setTimeout(() => {
                                setShowCongrats(false);
                                setIsAnswered(false);
                                setWheelSelectedIdx(null);
                                if (currentQIndex < selectedQuestions.length - 1) {
                                  setCurrentQIndex(prev => prev + 1);
                                } else {
                                  setGameState('ended');
                                  sounds.playGameWin();
                                }
                              }, 1500);
                            } else {
                              sounds.playError();
                              setShowWrongReset(true);
                              setTimeout(() => {
                                setShowWrongReset(false);
                                if (activeGame) {
                                  initializeGame(activeGame);
                                }
                              }, 1500);
                            }
                          }}
                          className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 text-white font-sans font-semibold text-xs rounded-xl shadow-sm text-left transition-all hover:scale-102 cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))
                    ) : (
                      <div className="col-span-2">
                        <button
                          onClick={() => {
                            sounds.playSuccess();
                            alert(`🔑 Đáp án chính xác là: ${selectedQuestions[currentQIndex]?.answer}. Lời khuyên: ${selectedQuestions[currentQIndex]?.explanation}`);
                          }}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold rounded-xl text-xs cursor-pointer border border-white/10 transition-all"
                        >
                          Xem đáp án và giải thích
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GAME 3: FLASHCARDS */}
          {activeGame === 'flashcard' && selectedQuestions[currentQIndex] && (
            <div className="space-y-6 flex flex-col items-center">
              <h3 className="font-fredoka text-lg md:text-xl font-extrabold text-white text-center drop-shadow-md">
                Hãy click vào tấm thẻ để lật ngược xem lời giải thích và đáp án!
              </h3>

              {/* 3D Flipping Card effect container */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  setCardFlipped(!cardFlipped);
                }}
                className="w-full max-w-sm h-64 cursor-pointer relative"
                style={{ perspective: '1000px' }}
              >
                <div 
                  className={`w-full h-full relative transition-transform duration-700`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front Side Card */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-[32px] border-4 border-white flex flex-col items-center justify-center p-6 text-white shadow-xl text-center space-y-4"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-4xl animate-bounce">🎴</span>
                    <h3 className="font-fredoka text-xs opacity-75 uppercase tracking-wide">Mặt câu hỏi</h3>
                    <p className="font-fredoka text-base md:text-lg font-extrabold max-w-xs leading-snug">
                      "{selectedQuestions[currentQIndex]?.text}"
                    </p>
                    <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase font-bold animate-pulse">
                      Nhấn để lật thẻ
                    </span>
                  </div>

                  {/* Back Side Card */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[32px] border-4 border-white flex flex-col items-center justify-center p-6 text-white shadow-xl text-center space-y-4"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <span className="text-4xl">🔑</span>
                    <h3 className="font-fredoka text-xs opacity-75 uppercase tracking-wide">Mặt giải thích</h3>
                    <div className="space-y-2">
                      <p className="font-fredoka text-sm md:text-base font-extrabold text-yellow-300">
                        Đáp án: {selectedQuestions[currentQIndex]?.answer}
                      </p>
                      <p className="font-sans text-xs max-w-xs leading-relaxed opacity-90 font-medium">
                        {selectedQuestions[currentQIndex]?.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-4 mt-2 justify-center">
                <button
                  disabled={currentQIndex === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    setCardFlipped(false);
                    setCurrentQIndex(prev => prev - 1);
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full cursor-pointer disabled:opacity-45 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-fredoka font-bold text-indigo-100 text-sm">
                  Thẻ {currentQIndex + 1} / {selectedQuestions.length}
                </span>
                <button
                  disabled={currentQIndex === selectedQuestions.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    setCardFlipped(false);
                    setCurrentQIndex(prev => prev + 1);
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full cursor-pointer disabled:opacity-45 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* GAME 4: MEMORY MATCH GAME */}
          {activeGame === 'memory' && (
            <div className="space-y-6">
              <h3 className="font-fredoka text-lg md:text-xl font-extrabold text-white text-center drop-shadow-md">
                Hãy lật lật các quân thẻ để tìm cặp câu đố và câu trả lời trùng nhau!
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-4">
                {memoryCards.map((card, i) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(i)}
                    className={`h-28 rounded-2xl border-2 flex items-center justify-center text-center p-3 cursor-pointer transition-all duration-300 transform select-none shadow-md
                      ${card.isMatched 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 opacity-70 scale-95 shadow-inner' 
                        : card.isFlipped 
                          ? 'bg-white/10 border-white/30 text-white font-sans font-bold text-[10px] md:text-xs' 
                          : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-white/20 text-white font-fredoka font-extrabold text-2xl hover:scale-103'
                      }
                    `}
                  >
                    {card.isMatched ? (
                      <div className="flex flex-col items-center">
                        <span className="text-lg">💖</span>
                        <span className="text-[9px] font-bold">Xong!</span>
                      </div>
                    ) : card.isFlipped ? (
                      <p className="line-clamp-4 leading-snug">{card.content}</p>
                    ) : (
                      <span>🧩</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GAME 5: BALLOON POP GAME */}
          {activeGame === 'balloon' && selectedQuestions[currentQIndex] && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="space-y-1 text-center">
                <span className="text-3xl animate-bounce">🎈</span>
                <h3 className="font-fredoka text-base md:text-lg font-extrabold text-white">
                  Phép thuật Bong bóng bay: Chạm bóng chứa đáp án chính xác!
                </h3>
                <p className="font-sans font-bold text-indigo-200 text-sm md:text-base italic">
                  "{selectedQuestions[currentQIndex]?.text}"
                </p>
              </div>

              {/* Grid of Floating balloons */}
              <div className="flex flex-wrap gap-5 justify-center py-6 w-full max-w-md">
                {balloons.map((b) => (
                  <button
                    key={b.id}
                    disabled={b.isPopped || isAnswered}
                    onClick={() => handleBalloonClick(b.id)}
                    className={`
                      w-28 h-36 rounded-b-full rounded-t-[50%] flex flex-col items-center justify-center p-3 text-center border border-white/20 text-white font-fredoka font-bold text-xs shadow-lg transition-all transform hover:scale-110 active:scale-90 relative cursor-pointer
                      ${b.isPopped ? 'opacity-10 scale-75 border-transparent bg-white/5 shadow-none text-transparent' : b.color}
                      animate-float
                    `}
                    style={{ animationDelay: `${b.id * 0.4}s` }}
                  >
                    {b.isPopped ? (
                      <span className="text-2xl text-white">💥</span>
                    ) : (
                      <>
                        <span className="line-clamp-3 font-semibold text-[11px] leading-tight mb-2">
                          {b.text}
                        </span>
                        {/* Balloon string */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/20"></div>
                      </>
                    )}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="p-4 rounded-3xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-fredoka font-extrabold text-xs max-w-md animate-float">
                  🎉 Chính xác! Bong bóng nổ rộn ràng, cộng thêm điểm thưởng và chuẩn bị qua màn mới!
                </div>
              )}
            </div>
          )}

          {/* GAME 6: FROG JUMP GAME */}
          {activeGame === 'frog' && selectedQuestions[currentQIndex] && (
            <div className="space-y-6 flex flex-col items-center">
              
              {/* Lilypads stage view */}
              <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-[32px] p-6 relative min-h-[140px] flex items-center justify-around overflow-hidden shadow-inner">
                {/* Pond background decor */}
                <div className="absolute top-2 left-4 text-xs select-none text-indigo-200">🌊 Đầm sen</div>

                {[0, 1, 2, 3, 4].map((idx) => {
                  const isFrogHere = frogPosition === idx;
                  return (
                    <div 
                      key={idx}
                      className="relative flex flex-col items-center"
                    >
                      {/* Lilypad */}
                      <div className="w-16 h-8 bg-emerald-500 rounded-full border-b-4 border-emerald-700 flex items-center justify-center text-[10px] font-bold text-white shadow-md relative">
                        <span>🌱</span>
                        <span className="absolute -bottom-1 font-bold text-[9px] opacity-75">{idx === 4 ? 'Đích' : `Pad ${idx + 1}`}</span>
                      </div>

                      {/* Cute Frog illustration */}
                      {isFrogHere && (
                        <div className={`absolute -top-11 text-4xl select-none transition-all
                          ${frogStatus === 'jumping' ? 'animate-bounce -translate-y-8 duration-500' : ''}
                          ${frogStatus === 'splash' ? 'translate-y-4 opacity-50 duration-500 scale-90' : ''}
                        `}>
                          {frogStatus === 'splash' ? '💦' : '🐸'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                <span className="text-xs bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 font-extrabold px-3 py-1 rounded-full uppercase">
                  Câu hỏi giúp ếch nhảy:
                </span>
                <p className="font-sans font-bold text-white text-sm md:text-base italic">
                  "{selectedQuestions[currentQIndex]?.text}"
                </p>
              </div>

              {/* Answer options */}
              <div className="grid grid-cols-2 gap-3.5 w-full max-w-md">
                {selectedQuestions[currentQIndex]?.options ? (
                  selectedQuestions[currentQIndex]?.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleFrogAnswer(opt)}
                      className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 text-white font-sans font-bold text-xs rounded-2xl shadow-sm text-left transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => handleFrogAnswer(selectedQuestions[currentQIndex]?.answer as string)}
                    className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-fredoka font-bold rounded-2xl text-xs cursor-pointer border border-white/10"
                  >
                    Xem câu trả lời
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* 3. GAME OVER END SCREEN VIEW */}
      {gameState === 'ended' && (
        <div className="max-w-md mx-auto bg-white/15 backdrop-blur-xl rounded-[32px] border border-white/25 p-8 shadow-2xl space-y-6 animate-float text-white text-center">
          
          <div className="text-6xl animate-bounce">🏆</div>
          <h2 className="font-fredoka text-2xl md:text-3xl font-extrabold text-yellow-300 drop-shadow-md">
            Trò chơi kết thúc!
          </h2>
          <p className="text-sm font-semibold text-indigo-100">
            Chúc mừng thầy cô đã hoàn thành trò chơi! Các học sinh của cô đã có một giờ học cực kỳ bùng nổ và sảng khoái! 🌸
          </p>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 flex items-center justify-around">
            <div className="text-center">
              <span className="text-xs text-yellow-300 font-extrabold block">TỔNG ĐIỂM</span>
              <span className="font-fredoka text-2xl font-extrabold text-white">{score} sao ⭐</span>
            </div>
            <div className="h-10 w-[2px] bg-white/10"></div>
            <div className="text-center">
              <span className="text-xs text-yellow-300 font-extrabold block">HẠNG ĐẠT ĐƯỢC</span>
              <span className="font-fredoka text-2xl font-extrabold text-white">Hạng S 🏅</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                setGameState('lobby');
              }}
              className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-fredoka font-bold rounded-2xl cursor-pointer transition-all"
            >
              Quay lại danh sách
            </button>
            <button
              onClick={() => {
                if (activeGame) initializeGame(activeGame);
              }}
              className="flex-1 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-fredoka font-extrabold rounded-2xl cursor-pointer transition-all hover:scale-103 shadow-md border border-white/20"
            >
              Chơi lại màn khác
            </button>
          </div>
        </div>
      )}

      {/* 4. CONGRATULATIONS OVERLAY */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in">
          <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-[32px] p-8 max-w-sm w-full mx-4 border-4 border-white shadow-2xl text-center space-y-4 animate-float">
            <div className="text-6xl animate-bounce">🎉</div>
            <h2 className="font-fredoka text-3xl font-extrabold text-white drop-shadow-md">
              CONGRATULATION!
            </h2>
            <p className="text-white font-fredoka font-bold text-lg drop-shadow-sm">
              Chính Xác! Thật Tuyệt Vời! 🌟
            </p>
            <div className="bg-white/25 rounded-2xl py-2 px-4 inline-block font-fredoka font-extrabold text-white text-lg border border-white/20">
              +200 Điểm ⭐
            </div>
            <p className="text-amber-50 text-xs font-sans font-bold italic block mt-2">
              Đang tự động chuyển tiếp...
            </p>
          </div>
        </div>
      )}

      {/* 5. WRONG RESET OVERLAY */}
      {showWrongReset && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in">
          <div className="bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 rounded-[32px] p-8 max-w-sm w-full mx-4 border-4 border-white shadow-2xl text-center space-y-4 animate-float">
            <div className="text-6xl animate-pulse">😢</div>
            <h2 className="font-fredoka text-2xl font-extrabold text-white drop-shadow-md">
              TIẾC QUÁ ĐI!
            </h2>
            <p className="text-white font-fredoka font-bold text-sm drop-shadow-sm leading-relaxed">
              Ồ, chưa đúng rồi bé ơi! Lần sau cố gắng hơn nhé!
            </p>
            <div className="bg-white/20 rounded-2xl py-2 px-4 inline-block font-fredoka font-bold text-white text-xs border border-white/10 mt-2">
              🔄 Tự động chơi lại từ đầu...
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
