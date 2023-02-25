import { useEffect, useState } from 'react';
import { ForecastType, SuggestOptionsType } from '../types';

const BASE_URL_OPTIONS = 'http://api.openweathermap.org';
const BASE_URL_DATA = 'https://api.openweathermap.org';
const API_KEY = import.meta.env.VITE_WEATHER_API;
const suggestLimit = 5;

const useForecast = () => {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<SuggestOptionsType | null>();
  const [forecast, setForecast] = useState<ForecastType | null>(null);

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

    if (value.length > 2) getSearchOptions(value);
  };

  const getForecast = (city: SuggestOptionsType) => {
    fetch(
      `${BASE_URL_DATA}/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 17),
        };
        setForecast(forecastData);
      });
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const onOptionSelect = (option: SuggestOptionsType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(`${city.name}, ${city.country}`);
      setOptions([]);
    }
  }, [city]);

  return { term, options, forecast, onSubmit, onInputChange, onOptionSelect };
};

export default useForecast;
