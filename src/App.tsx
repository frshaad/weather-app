import { useState } from 'react';
import { SuggestOptionsType } from './types';

const BASE_URL_OPTIONS = 'http://api.openweathermap.org';
const BASE_URL_DATA = 'https://api.openweathermap.org';
const API_KEY = import.meta.env.VITE_WEATHER_API;
const suggestLimit = 5;

const App = () => {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);

  const getSearchOptions = (value: string) => {
    fetch(
      `${BASE_URL_OPTIONS}/geo/1.0/direct?q=${value.trim()}&limit=${suggestLimit}&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => setOptions(data));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTerm(value);

    if (value.length < 2) return;
    else getSearchOptions(value);
  };

  const onOptionSelect = (option: SuggestOptionsType) => {
    fetch(
      `${BASE_URL_DATA}/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <main className='flex h-screen w-full items-center justify-center bg-blue-300'>
      <section className='flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:h-[500px] md:max-w-lg md:px-10 lg:p-24 '>
        <h1 className='text-4xl font-thin'>
          Weather <span className='font-black'>Forecast</span>
        </h1>
        <p className='mt-4 w-5/6 text-sm'>
          Enter below a place you want to know the weather of and select an
          option from dropdown
        </p>

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

          <button className='cursor-pointer rounded-r-md border-2 border-zinc-100 px-2 py-1 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500'>
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
