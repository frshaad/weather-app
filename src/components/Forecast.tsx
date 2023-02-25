import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers';
import { SunriseIcon, SunsetIcon } from '../Icons';
import { ForecastType } from '../types';
import Tile from './Tile';

type Props = {
  data: ForecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className='h-full w-full rounded bg-white bg-opacity-20 px-5 py-16 drop-shadow-lg backdrop-blur-lg md:h-max md:max-w-lg md:px-10 lg:h-auto lg:px-24'>
      <div className='mx-auto md:w-96'>
        <section className='text-center'>
          <h2 className='text-2xl font-black'>
            {data.name}
            <span className='font-thin'> {data.country}</span>
          </h2>
          <h1 className='mt-2 text-4xl font-extrabold'>
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className='text-s mt-3 capitalize'>
            <span className='font-semibold'>{today.weather[0].main}</span>:{' '}
            {today.weather[0].description}
          </p>
          <p className='mt-1 text-sm'>
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className='mt-4 mb-5 flex overflow-x-scroll pb-2'>
          {data.list.map((item, index) => (
            <div
              key={index}
              className='inline-block w-12 flex-shrink-0 text-center'
            >
              <p className='text-sm'>
                {index === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`weather-icon-${item.weather[0].description}`}
              />
              <p className='text-sm font-bold'>
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className=' flex flex-wrap justify-between text-zinc-700'>
          <div className='mb-5 flex w-40 flex-col items-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg backdrop-blur-lg'>
            <SunriseIcon />{' '}
            <span className='mt-2'>
              {getSunTime(data.sunrise, data.timezone)}
            </span>
          </div>
          <div className='mb-5 flex w-40 flex-col items-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg backdrop-blur-lg'>
            <SunsetIcon />
            <span className='mt-2'>
              {getSunTime(data.sunset, data.timezone)}
            </span>
          </div>

          {/* wind */}
          <Tile
            icon='wind'
            title='Wind'
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          {/* feels like */}
          <Tile
            icon='feels'
            title='Feels Like'
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'Colder'
                : 'Warmer'
            }`}
          />
          {/* humidity */}
          <Tile
            icon='humidity'
            title='Humidity'
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          {/* pop */}
          <Tile
            icon='pop'
            title='Precipitation'
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, Cloud cover: ${
              today.clouds.all
            }%`}
          />
          {/* pressure */}
          <Tile
            icon='pressure'
            title='Pressure'
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          {/* visibility */}
          <Tile
            icon='visibility'
            title='Visibility'
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
};
export default Forecast;
