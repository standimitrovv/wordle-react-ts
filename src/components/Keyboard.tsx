import { useEffect, useState } from 'react';
import { Letters, createDefaultLetters } from '../Letters';

const KEYS = {
  line1: 'qwertyuiop',
  line2: 'asdfghjkl',
  line3: 'zxcvbnm',
};

export const Keyboard: React.FunctionComponent<{
  onClick: (letter: string) => void;
  hasChanged: boolean;
  letters: Letters;
}> = ({ onClick, hasChanged, letters: l }) => {
  const [letters, setLetters] = useState<Letters>(() => createDefaultLetters());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLetters(l), [hasChanged]);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex'>
        {renderKeysFromLine(KEYS.line1, letters, onClick)}
      </div>
      <div className='flex'>
        {renderKeysFromLine(KEYS.line2, letters, onClick)}
      </div>
      <div className='flex'>
        <Key
          value='DELETE'
          onClick={() => onClick('DELETE')}
          state={letters['']}
        />
        {renderKeysFromLine(KEYS.line3, letters, onClick)}
        <Key
          value='Enter'
          onClick={() => onClick('Enter')}
          state={letters['']}
        />
      </div>
    </div>
  );
};

const renderKeysFromLine = (
  line: string,
  state: Letters,
  onClick: (letter: string) => void
) =>
  line
    .split('')
    .map((key, i) => (
      <Key
        key={`${key}-${i}`}
        value={key.toUpperCase()}
        state={state[key]}
        onClick={() => onClick(key)}
      />
    ));

const Key: React.FunctionComponent<{
  value: string;
  state: string;
  onClick: () => void;
}> = ({ value, state, onClick }) => {
  const [style, setStyle] = useState('');

  useEffect(() => {
    if (state === 'correct spot') {
      setStyle('bg-green-500 text-white');
    }

    if (state === 'wrong spot') {
      setStyle('bg-gray-500 text-white');
    }

    if (state === 'doesnt exist') {
      setStyle('bg-red-500 text-white dark:bg-gray-600');
    }
  }, [state]);

  return (
    <span
      className={`p-4 border border-black m-1 rounded-md font-bold ${style}`}
      onClick={onClick}
    >
      {value}
    </span>
  );
};
