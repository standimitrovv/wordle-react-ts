import { useState } from 'react';
import { Box } from './Box';

export const Board = () => {
  const [board, setBoard] = useState(() => initDefaultBoard());

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

function initDefaultBoard(rows: number = 6, cols: number = 5) {
  const board: string[][][] = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i].push(['']);
    }
  }

  return board;
}
