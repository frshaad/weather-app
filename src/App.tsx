import { Forecast, Search, SearchInput } from './components';
import { useForecast } from './hooks';

const App = () => {
  const { term, options, forecast, onSubmit, onInputChange, onOptionSelect } =
    useForecast();

  return (
    <main className='flex h-screen w-full items-center justify-center bg-blue-300'>
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};

export default App;
