import { findDay } from './day';
import dayjs from 'dayjs';
import { toUpper } from './toUpper';

export const getWeatherData = async (
  cityInfo,
  setWeatherData,
  controller,
  loading
) => {
  loading(true);
  const response = await fetch(
    `${process.env.REACT_APP_WEATHER_LINK}forecast?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric&lang=tr`,
    controller && { signal: controller.signal }
  );
  const data = await response.json();

  const dates = [];
  const days = [];
  const hours = [];
  const tempature = [];
  const feelsLike = [];
  const humidity = [];
  const wind = [];
  const status = [];
  const allData = [];

  data.list.map((item) => {
    const dataDate = dayjs(item.dt_txt).get('date');
    const dateDay = findDay(dayjs(item.dt_txt).get('day'));
    if (!dates.includes(dataDate)) {
      dates.push(dataDate);
      days.push(dateDay);
    }
  });

  dates.map((date, index) => {
    const hourArr = [];
    const tempatureArr = [];
    const feelsLikeArr = [];
    const humidityArr = [];
    const windArr = [];
    const statusArr = [];

    data.list.map((item) => {
      if (date === dayjs(item.dt_txt).get('date')) {
        hourArr.push(dayjs(item.dt_txt).get('hours'));
        tempatureArr.push(Math.round(item.main.temp));
        feelsLikeArr.push(Math.round(item.main.feels_like));
        humidityArr.push(item.main.humidity);
        windArr.push(item.wind.speed);
        statusArr.push({
          description: toUpper(item.weather[0].description),
          id: item.weather[0].id,
        });
      }
    });
    hours.push(hourArr);
    tempature.push(tempatureArr);
    feelsLike.push(feelsLikeArr);
    humidity.push(humidityArr);
    wind.push(windArr);
    status.push(statusArr);

    allData.push({
      date,
      day: days[index],
      hours: hours[index],
      tempature: tempature[index],
      feelsLike: feelsLike[index],
      humidity: humidity[index],
      wind: wind[index],
      status: status[index],
    });
  });
  setWeatherData(allData);

  loading(false);
};
