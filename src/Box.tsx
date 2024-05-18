import React, { useEffect, useState } from 'react';

export const Box: React.FunctionComponent<{
  value: string;
  state: string;
  pos: number;
}> = ({ value, state, pos }) => {
  const [st, setSt] = useState(() => initState());

  useEffect(() => {
    setTimeout(() => {
      if (state === 'C') setSt('bg-correct text-white');
      if (state === 'E') setSt('bg-exist text-white');
      if (state === 'N') setSt('bg-wrong text-white dark:bg-gray-600');
    }, 125 * pos);
  }, [state]);

  return (
    <div
      className={
        'h-12 w-12 sm:w-14 sm:h-14 grid place-items-center p-0 m-0 font-bold text-2xl rounded-md ' +
        st
      }
    >
      {value}
    </div>
  );
};

function initState() {
  return 'text-black border-2 border-gray-300 dark:bg-zinc-800 dark:text-white rounded';
}
