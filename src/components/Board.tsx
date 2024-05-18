import { useEffect, useState } from 'react';
import { Letters, createDefaultLetters } from '../Letters';
import { Box } from './Box';

// temporary solution
const possibleWords = ['wordl'];
const correctWord = possibleWords[0];

export const Board: React.FunctionComponent<{
  selectedLetter: string;
  clicks: number;
}> = ({ selectedLetter, clicks }) => {
  const [letters, setLetters] = useState<Letters>(() => createDefaultLetters());

  const [board, setBoard] = useState<string[][][]>(() => initDefaultBoard());
  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);

  const [hasWon, setHasWon] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasBoardChanged, setHasBoardChanged] = useState<boolean>(false);

  useEffect(() => {
    if (hasWon || hasLost) {
      // TODO: display a snackbar on the screen
      console.log('Game ended!');
      return;
    }

    if (clicks === 0) {
      return;
    }

    if (selectedLetter === 'DELETE') {
      setCol((prevCol) => (prevCol === 0 ? 0 : prevCol - 1));

      setBoard((prevBoard) => {
        prevBoard[row][col === 0 ? 0 : col - 1][0] = '';
        return prevBoard;
      });

      return;
    }

    setBoard((prevBoard) => {
      if (col < DEFAULT_COLS) {
        if (selectedLetter !== 'Enter') {
          prevBoard[row][col][0] = selectedLetter;
          setCol((c) => c + 1);
        } else {
          console.error('Words are 5 letters long!');
        }
      } else {
        if (selectedLetter === 'Enter') {
          let correctLetters = 0;
          let word = '';

          for (let i = 0; i < DEFAULT_COLS; i++) {
            word += prevBoard[row][i][0];
          }

          if (possibleWords.includes(word.toLowerCase())) {
            for (let i = 0; i < DEFAULT_COLS; i++) {
              if (correctWord[i] === prevBoard[row][i][0]) {
                prevBoard[row][i][1] = 'correct spot';
                correctLetters++;
              } else if (correctWord.includes(prevBoard[row][i][0])) {
                prevBoard[row][i][1] = 'wrong spot';
              } else {
                prevBoard[row][i][1] = 'doesnt exist';
              }

              setRow((r) => r + 1);
              if (row === DEFAULT_ROWS) {
                setHasLost(true);
              }

              setCol(0);

              setLetters((prev) => {
                const letter = board[row][i][0];
                prev[parseInt(letter)] = board[row][i][1];
                return prev;
              });
            }

            setHasBoardChanged((prevState) => !prevState);

            if (correctLetters === 5) {
              setHasWon(true);
            }
            return prevBoard;
          } else {
            console.error('Word is not in the dictionary...');
          }
        } else {
          // TODO: notify the user he has to click enter in order to see something happen on his screen
        }
      }
      return prevBoard;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicks]);

  return (
    <div className='px-10 py-5 grid gap-y-1 items-center w-100 justify-center'>
      {board.map((row, key) => {
        return (
          <div key={key} className='flex gap-1 w-fit'>
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const DEFAULT_ROWS = 6;
const DEFAULT_COLS = 5;

function initDefaultBoard(
  rows: number = DEFAULT_ROWS,
  cols: number = DEFAULT_COLS
) {
  const board: string[][][] = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i].push(['']);
    }
  }

  return board;
}
