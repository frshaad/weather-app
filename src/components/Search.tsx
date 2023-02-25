import { SuggestOptionsType } from '../types';
import SearchInput from './SearchInput';

type SearchProps = {
  term: string;
  options: [];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: SuggestOptionsType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  onOptionSelect,
  onInputChange,
  onSubmit,
}: SearchProps) => {
  return (
    <section className='flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:h-[500px] md:max-w-lg md:px-10 lg:p-24 '>
      <h1 className='text-4xl font-thin'>
        Weather <span className='font-black'>Forecast</span>
      </h1>
      <p className='mt-4 w-5/6 text-sm'>
        Enter below a place you want to know the weather of and select an option
        from dropdown
      </p>

      <SearchInput
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
        options={options}
        term={term}
      />
    </section>
  );
};

export default Search;
