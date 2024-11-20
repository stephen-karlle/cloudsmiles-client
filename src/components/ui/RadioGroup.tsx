type RadioGroupProps = {
  className?: string;
  checked: string;
  onChange: (checked: string) => void;
  didError?: boolean;
  isDisabled?: boolean;
  choices: string[];
};

const RadioGroup = ({
  className = '',
  checked,
  onChange,
  didError = false,
  choices,
  isDisabled = false,
}: RadioGroupProps) => {
  
  const handleClick = (choice: string) => {
    if (!isDisabled) onChange(choice);
    if (choices.includes(checked) && checked === choice) onChange('');
  };

  return (
    <article
      className={`gap-4 ${
        choices.length <= 3 ? 'flex items-center justify-center' : ''
      } ${
        choices.length === 4 ? 'grid grid-cols-2' : ''
      } ${choices.length === 5 ? 'grid grid-cols-3' : ''}`}
    >
      {choices.map((choice, index) => {
        const isChecked = choice === checked;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(choice)}
            disabled={isDisabled}
            className={`${className} focus:outline-gray-500 transition-colors duration-300 ease-out h-10 ring-1 rounded-md w-full px-4 flex items-center justify-start gap-4 ${
              didError
                ? 'ring-red-500 outline outline-offset-1 outline-3 outline-rose-100'
                : isDisabled
                ? 'ring-gray-200 cursor-not-allowed'
                : isChecked
                ? 'ring-lime-500'
                : 'ring-gray-200'
            }`}
          >
            <div
              className={`flex-shrink-0 rounded-full w-5 h-5 ${
                didError
                  ? 'ring-red-500 ring-1'
                  : isDisabled
                  ? 'ring-1 ring-gray-200'
                  : isChecked
                  ? 'border-[6px] border-lime-500 ring-lime-500 ring-1'
                  : 'ring-1 ring-gray-300'
              }`}
            />
            <label
              className={`text-sm ${
                didError
                  ? 'text-rose-500 font-normal'
                  : isDisabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : isChecked
                  ? 'text-green-950 font-normal'
                  : 'text-gray-500 font-normal cursor-pointer'
              }`}
            >
              {choice}
            </label>
          </button>
        );
      })}
    </article>
  );
};

export default RadioGroup;
