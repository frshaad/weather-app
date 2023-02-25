import { SuggestOptionsType } from '../types';

type SearchProps = {
  term: string;
  options: [];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: SuggestOptionsType) => void;
  onSubmit: () => void;
};

const SearchInput = ({
  term,
  options,
  onOptionSelect,
  onInputChange,
  onSubmit,
}: SearchProps) => {
  return (
    <div className='relative mt-10 flex'>
      <input
        type='text'
        value={term}
        onChange={onInputChange}
        className='rounded-l-md border-2 border-white px-2 py-1'
      />

      {options.length != 0 && (
        <ul className='absolute top-9 ml-1 rounded-b-md bg-white'>
          {options.map((option: SuggestOptionsType, index: number) => (
            <li key={option.name + '-' + index}>
              <button
                className='w-full cursor-pointer px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white'
                onClick={() => onOptionSelect(option)}
              >
                {option.name}, {option.country}
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className='cursor-pointer rounded-r-md border-2 border-zinc-100 px-2 py-1 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500'
        onClick={onSubmit}
      >
        Search
      </button>
    </div>
  );
};
export default SearchInput;
