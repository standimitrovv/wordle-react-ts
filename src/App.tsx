import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ALPHABET } from './Alphabet';
import { Letters } from './Letters';
import { Board } from './components/Board';
import { GameRulesModal } from './components/GameRulesModal';
import { Keyboard } from './components/Keyboard';

const attempts = localStorage.getItem('attempts');

export interface GameResult {
  result: 'win' | 'lose';
  message: string;
}

export const App = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  const [letters, setLetters] = useState<Letters>({});

  const [clicks, setClicks] = useState<number>(0);

  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const [isGameRulesModalOpen, setIsGameRulesModalOpen] = useState<boolean>(
    !!attempts
  );

  const [gameResult, setGameResult] = useState<GameResult | undefined>(
    undefined
  );

  const handleKeydown = (e: KeyboardEvent) => {
    if (ALPHABET.includes(e.key.toLowerCase())) {
      setSelectedLetter(e.key);
      setClicks((click) => click + 1);
    }
    if (e.key === 'Enter') {
      setSelectedLetter('Enter');
      setClicks((c) => c + 1);
    }
    if (e.key === 'Backspace') {
      setSelectedLetter('DELETE');
      setClicks((c) => c + 1);
    }
  };

  const handleKeyboardClick = (letter: string) => {
    setSelectedLetter(letter);
    setClicks((click) => click + 1);
  };

  const onBoardChange = (ls: Letters) => {
    setLetters(ls);
    setHasChanged((prevState) => !prevState);
  };

  const handleGameEnd = (result: GameResult) => {
    setGameResult(result);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  useEffect(() => {
    if (!attempts && gameResult?.result) {
      toast.success(
        'Wohoo! You finished your first wordle game! You can play again by refreshing the page!',
        {
          autoClose: false,
        }
      );
      localStorage.setItem('attempts', '1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameResult]);

  return (
    <>
      {gameResult ? (
        <div className='text-3xl flex justify-center items-center h-screen overflow-hidden'>
          <span>{gameResult.message}</span>
        </div>
      ) : (
        <>
          <div className='absolute top-5 right-8'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='35'
              height='35'
              viewBox='0 0 50 50'
              className='cursor-pointer'
              onClick={() => setIsGameRulesModalOpen(true)}
            >
              <path d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z'></path>
            </svg>
          </div>

          {isGameRulesModalOpen && (
            <GameRulesModal onClose={() => setIsGameRulesModalOpen(false)} />
          )}

          <Board
            clicks={clicks}
            selectedLetter={selectedLetter}
            onChange={onBoardChange}
            onGameEnd={handleGameEnd}
          />
          <Keyboard
            onClick={handleKeyboardClick}
            hasChanged={hasChanged}
            letters={letters}
          />
        </>
      )}

      <ToastContainer
        autoClose={3500}
        position='bottom-left'
        hideProgressBar
        newestOnTop
        pauseOnHover
        theme='dark'
      />
    </>
  );
};
