import {
  FeelsIcon,
  HumidityIcon,
  PopIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from '../Icons';

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop';
  title:
    | 'Wind'
    | 'Feels Like'
    | 'Humidity'
    | 'Visibility'
    | 'Pressure'
    | 'Precipitation';
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: WindIcon,
  feels: FeelsIcon,
  humidity: HumidityIcon,
  visibility: VisibilityIcon,
  pressure: PressureIcon,
  pop: PopIcon,
};

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className='mb-5 flex h-36 w-40 flex-col justify-between rounded p-5 text-zinc-700 drop-shadow-lg backdrop-blur-lg'>
      <div className='flex items-center text-sm font-bold'>
        <Icon />
        <h4 className='ml-2'>{title}</h4>
      </div>
      <h3 className='mt-2 text-lg'>{info}</h3>
      <p className='text-xs font-bold'>{description}</p>
    </article>
  );
};
export default Tile;
