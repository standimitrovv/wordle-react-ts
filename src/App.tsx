import { useEffect, useState } from 'react';
import { ALPHABET } from './Alphabet';
import { Letters } from './Letters';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';

export const App = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  const [letters, setLetters] = useState<Letters>({});

  const [clicks, setClicks] = useState<number>(0);

  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const handleKeydown = (e: KeyboardEvent) => {
    if (ALPHABET.includes(e.key.toLowerCase())) {
      setSelectedLetter(e.key.toUpperCase());
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  return (
    <>
      <Board clicks={clicks} selectedLetter={selectedLetter} />
      <Keyboard
        onClick={handleKeyboardClick}
        hasChanged={hasChanged}
        letters={letters}
      />
    </>
  );
};
