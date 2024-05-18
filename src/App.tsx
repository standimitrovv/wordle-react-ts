import { useEffect, useState } from 'react';
import { Board } from './Board';
import { Keyboard } from './Keyboard';

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export const App = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  const [clicks, setClicks] = useState<number>(0);

  const handleKeydown = (e: KeyboardEvent) => {
    if (ALPHABET.includes(e.key.toLowerCase())) {
      setSelectedLetter(e.key.toUpperCase());
      setClicks((click) => click + 1);
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
      <Keyboard onClick={handleKeyboardClick} />
    </>
  );
};
