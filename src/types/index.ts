export type SuggestOptionsType = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export type ForecastType = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
      };
      weather: [
        {
          description: string;
          icon: string;
          id: number;
          main: string;
        }
      ];
      wind: { deg: number; gust: number; speed: number };
      clouds: { all: number };
      pop: number;
      visibility: number;
    }
  ];
};
