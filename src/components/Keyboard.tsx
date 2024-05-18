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
      <div className='flex'>{renderKeysFromLine(KEYS.line1, onClick)}</div>
      <div className='flex'>{renderKeysFromLine(KEYS.line2, onClick)}</div>
      <div className='flex'>
        <Key value='DELETE' onClick={() => onClick('DELETE')} />
        {renderKeysFromLine(KEYS.line3, onClick)}
        <Key value='Enter' onClick={() => onClick('Enter')} />
      </div>
    </div>
  );
};

const renderKeysFromLine = (line: string, onClick: (letter: string) => void) =>
  line
    .split('')
    .map((key, i) => (
      <Key
        key={`${key}-${i}`}
        value={key.toUpperCase()}
        onClick={() => onClick(key)}
      />
    ));

const Key: React.FunctionComponent<{ value: string; onClick: () => void }> = ({
  value,
  onClick,
}) => {
  return (
    <span
      className='p-4 border border-black m-1 rounded-md font-bold'
      onClick={onClick}
    >
      {value}
    </span>
  );
};
