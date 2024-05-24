export const GameRulesModal = () => {
  return (
    <div
      id='default-modal'
      tabIndex={-1}
      aria-hidden='true'
      className=' bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen'
    >
      <div className='relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 w-full max-w-2xl max-h-full text-lg'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Game Rules
            </h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='default-modal'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-4 md:p-5 space-y-2 text-black leading-relaxed'>
            <p className=''>1. You have 6 chances to guess the correct word.</p>
            <p>2. Eeach guess must be a 5-letter word.</p>
            <p>
              3. The colors of the tiles on the board and keyboard would change
              to show you how close your guess was to the correct word.
            </p>
          </div>
          <div className='p-4 md:p-5 text-black text-2xl'>
            <p>Examples:</p>
          </div>
          <div className='flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              data-modal-hide='default-modal'
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
