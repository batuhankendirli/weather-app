import { WeatherIcon } from 'weather-react-icons';

const Icon = ({ id }) => (
  <WeatherIcon
    name="owm"
    iconId={id}
    className={`text-5xl ${
      id === 800
        ? 'text-yellow-400'
        : id === 500
        ? 'text-blue-300'
        : id === 801
        ? 'text-red-400'
        : id === 802
        ? 'text-red-500'
        : id === 803
        ? 'text-blue-400'
        : id === 804
        ? 'text-indigo-400'
        : id === 600
        ? 'text-gray-500'
        : id === 601
        ? 'text-gray-600'
        : id === 501
        ? 'text-blue-400'
        : ''
    }`}
  />
);

export default Icon;
