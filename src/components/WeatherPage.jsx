import cities from '../data/cities.json';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getWeatherData } from '../helpers/getWeatherData';
import Loading from './Loading';
import Graph from './Graph';
import Icon from './Icon';
import { Context } from '../Context';

const WeatherPage = ({ city }) => {
  const { id } = useParams();
  const [cityInfo, setCityInfo] = useState(
    cities.find((item) => (city ? item.id === city : item.id === Number(id)))
  );
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCondition, setSelectedCondition, active, setActive } =
    useContext(Context);
  const [selectedDay, setSelectedDay] = useState(0);
  const [color, setColor] = useState('#f7d500');
  const [position, setPosition] = useState({});
  const [animation, setAnimation] = useState(true);
  const parentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setCityInfo(cities.find((item) => item.id === Number(id)));
    getWeatherData(cityInfo, setWeatherData, controller, setIsLoading);

    return () => {
      controller.abort();
    };
  }, [id, cityInfo]);

  const handleChange = (cityID) => {
    setCityInfo(cities.find((city) => city.id === cityID));
    navigate(`/city/${cityID}`);
  };

  const handleConditionChange = (e, condition) => {
    setSelectedCondition(condition);
    const { top, width, height } = e.target.getBoundingClientRect();
    const left = e.target.offsetLeft;
    setPosition({
      left,
      top,
      width,
      height,
    });
  };

  const handleDayChange = (dayIndex) => {
    setSelectedDay(dayIndex);
    setActive({ path: 0, point: 0 });
  };

  useEffect(() => {
    setAnimation(false);
    const timer = setTimeout(() => {
      setAnimation(true);
    }, 1);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedDay, selectedCondition]);

  return (
    <div>
      <nav className="flex justify-between items-center mb-4 py-4 border-b-2 border-color-fifth border-opacity-10">
        <Link
          to={'/'}
          className="group text-base sm:text-xl flex items-center justify-center gap-1 sm:gap-2 font-semibold text-color-fifth"
        >
          <ion-icon
            name="arrow-back-outline"
            class="group-hover:-translate-x-1 text-lg sm:text-2xl duration-300"
          ></ion-icon>
          <p className="block border-b-2 border-color-fifth border-opacity-0 duration-300 group-hover:border-opacity-100">
            Geri Dön
          </p>
        </Link>
        <select
          name="select"
          id="select-cities"
          value={cityInfo.name}
          onChange={(e) => (
            handleChange(e.target.selectedIndex + 1),
            setSelectedDay(0),
            setSelectedCondition('tempature'),
            setColor('#f7d500'),
            setPosition({}),
            setActive({ path: 0, point: 0 })
          )}
          className="text-base sm:text-lg bg-transparent border-2 border-color-secondary text-color-fifth px-1 sm:px-3 py-1 font-medium focus:outline-none"
        >
          {cities.map((city) => {
            return (
              <option
                value={city.name}
                key={city.id}
                className="bg-color-tertiary"
              >
                {city.name}
              </option>
            );
          })}
        </select>
      </nav>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Icon
                id={weatherData[selectedDay]?.status[active.point]?.id || 801}
              />
              <p className="flex text-2xl font-medium">
                {weatherData[selectedDay]?.tempature[active.point]}
                <span className="text-lg">℃</span>
              </p>
            </div>
            <div className="text-right text-sm sm:text-base font-medium text-color-fifth">
              <p className="text-2xl sm:text-4xl font-bold">{cityInfo.name}</p>
              <p className="text-zinc-500">
                {weatherData[selectedDay]?.day} -{' '}
                {String(weatherData[selectedDay]?.hours[active.point])
                  .length !== 2
                  ? '0' + weatherData[selectedDay]?.hours[active.point]
                  : weatherData[selectedDay]?.hours[active.point]}
                :00
              </p>
              <p className="text-xs sm:text-sm text-zinc-500">
                {weatherData[selectedDay]?.status[active.point]?.description}
              </p>
            </div>
          </div>

          <div
            ref={parentRef}
            className="relative flex gap-2 sm:gap-4 text-lg mb-8"
          >
            <div
              className="condition-selection bg-color-primary"
              style={{
                '--l': position.left ? position.left + 'px' : '0px',
                '--t': position.top + 'px',
                '--w': position.width ? position.width + 'px' : '58px',
                '--h': position.height + 'px' || '3px',
              }}
            />
            <button
              className={`${selectedCondition === 'tempature' ? 'active' : ''}`}
              onClick={(e) => (
                handleConditionChange(e, 'tempature'), setColor('#f7d500')
              )}
            >
              Sıcaklık
            </button>
            <button
              className={`${selectedCondition === 'feelsLike' ? 'active' : ''}`}
              onClick={(e) => (
                handleConditionChange(e, 'feelsLike'), setColor('#f7d500')
              )}
            >
              Hissedilen
            </button>
            <button
              className={`${selectedCondition === 'humidity' ? 'active' : ''}`}
              onClick={(e) => (
                handleConditionChange(e, 'humidity'), setColor('#00B4DB')
              )}
            >
              Nem
            </button>
            <button
              className={`${selectedCondition === 'wind' ? 'active' : ''}`}
              onClick={(e) => (
                handleConditionChange(e, 'wind'), setColor('#acacac')
              )}
            >
              Rüzgar
            </button>
          </div>
          <Graph
            data={[weatherData[selectedDay]?.[selectedCondition]]}
            colors={[color]}
            range={[
              0,
              selectedCondition === 'humidity'
                ? 100
                : selectedCondition === 'wind'
                ? weatherData[selectedDay]?.[selectedCondition] &&
                  Math.max(...weatherData[selectedDay]?.['wind']) * 1.5
                : weatherData[selectedDay]?.[selectedCondition] &&
                  Math.min(...weatherData[selectedDay]?.[selectedCondition]) < 0
                ? weatherData[selectedDay]?.[selectedCondition] &&
                  Math.abs(
                    Math.max(...weatherData[selectedDay]?.[selectedCondition])
                  ) +
                    Math.abs(
                      Math.min(...weatherData[selectedDay]?.[selectedCondition])
                    ) +
                    2
                : weatherData[selectedDay]?.[selectedCondition] &&
                  (Math.max(...weatherData[selectedDay]?.[selectedCondition]) +
                    1) *
                    1.5,
            ]}
            labels={weatherData[selectedDay]?.hours}
            animation={animation}
          />

          <div className="days-wrapper w-full px-4">
            {weatherData.map((item, index) => (
              <button
                key={index}
                onClick={() => handleDayChange(index)}
                className={`${
                  selectedDay === index
                    ? 'border-opacity-[.15] bg-color-secondary bg-opacity-10 -translate-y-1'
                    : ''
                } flex-1 rounded-xl flex flex-col gap-8 py-4 items-center font-medium text-color-fifth border-[3px] border-color-fifth border-opacity-0 duration-200 ${
                  selectedDay !== index
                    ? 'hover:bg-color-secondary hover:bg-opacity-5'
                    : ''
                }`}
              >
                {item.day}
                <Icon id={weatherData[index].status[0].id} />
                <p className="flex gap-2 text-color-fifth">
                  {Math.max(...weatherData[index]['tempature'])}℃
                  <span className="text-neutral-400">
                    {Math.min(...weatherData[index]['tempature'])}℃
                  </span>
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
