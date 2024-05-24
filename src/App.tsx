import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ALPHABET } from './Alphabet';
import { Letters } from './Letters';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';

export interface GameResult {
  result: 'win' | 'lose';
  message: string;
}

export const App = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  const [letters, setLetters] = useState<Letters>({});

  const [clicks, setClicks] = useState<number>(0);

  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const [gameResult, setGameResult] = useState<GameResult | undefined>(
    undefined
  );

  const attempts = localStorage.getItem('attempts');

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
