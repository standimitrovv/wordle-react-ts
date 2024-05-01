const KEYS = {
  line1: 'qwertyuiop',
  line2: 'asdfghjkl',
  line3: 'zxcvbnm',
};

export const Keyboard = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex'>{renderKeysFromLine(KEYS.line1)}</div>
      <div className='flex'>{renderKeysFromLine(KEYS.line2)}</div>
      <div className='flex'>
        <Key value='DELETE' />
        {renderKeysFromLine(KEYS.line3)}
        <Key value='Enter' />
      </div>
    </div>
  );
};

const renderKeysFromLine = (line: string) =>
  line.split('').map((key) => <Key value={key.toUpperCase()} />);

const Key: React.FunctionComponent<{ value: string }> = ({ value }) => {
  return (
    <span className='p-4 border border-black m-1 rounded-md font-bold'>
      {value}
    </span>
  );
};
