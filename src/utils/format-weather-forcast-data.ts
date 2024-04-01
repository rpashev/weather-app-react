import { WeatherForecastHourlyListType } from '../schemas/WeatherForecastSchema';
import { getDate, getDayOfWeek, groupBy } from './formatters';

type DailyForecast = {
  avgTempDay: number;
  avgTempNight: number;
  minTempDay: number;
  minTempNight: number;
  maxTempDay: number;
  maxTempNight: number;
  avgDescriptionDay: string;
  mostCommonIconDay: string;
  day: string;
  date: string;
  hourlyList: WeatherForecastHourlyListType;
};

type DailyForecastData = Record<string, DailyForecast>;

export const getForecastByDates = (data: WeatherForecastHourlyListType) => {
  const groupedByDate = groupBy(data, (item) => {
    return item.dt_txt.split(' ')[0];
  });

  const keys = Object.keys(groupedByDate);

  if (keys.length > 0) {
    delete groupedByDate[keys[keys.length - 1]];
  }
  return groupedByDate;
};

export const calculateDailyForecast = (data: WeatherForecastHourlyListType): DailyForecastData => {
  const dailyForecastData: DailyForecastData = {};
  const groupedData = getForecastByDates(data);

  for (const [dateString, dailyData] of Object.entries(groupedData)) {
    const dayOfWeek = getDayOfWeek(dateString);
    const tempDaytimeArray: number[] = [];
    const tempNighttimeArray: number[] = [];
    const weatherDaytimeDescriptions: string[] = [];
    const weatherDaytimeIcons: string[] = [];
    const hourlyList = dailyData;

    for (const forecast of dailyData) {
      const hour = new Date(forecast.dt * 1000).getHours();
      const isDaytime = hour >= 6 && hour <= 18;
      if (isDaytime) {
        tempDaytimeArray.push(forecast.main.temp);
        weatherDaytimeDescriptions.push(forecast.weather[0].description);
        weatherDaytimeIcons.push(forecast.weather[0].icon);
      } else {
        tempNighttimeArray.push(forecast.main.temp);
      }
    }

    const avgTempDay = Math.round(
      tempDaytimeArray.reduce((a, b) => a + b, 0) / tempDaytimeArray.length
    );
    const avgTempNight = Math.round(
      tempNighttimeArray.reduce((a, b) => a + b, 0) / tempNighttimeArray.length
    );
    const minTempDay = Math.round(Math.min(...tempDaytimeArray));
    const minTempNight = Math.round(Math.min(...tempNighttimeArray));
    const maxTempDay = Math.round(Math.max(...tempDaytimeArray));
    const maxTempNight = Math.round(Math.max(...tempNighttimeArray));
    const avgDescriptionDay = getMostFrequentItem(weatherDaytimeDescriptions);
    const mostCommonIconDay = getMostFrequentItem(weatherDaytimeIcons);

    dailyForecastData[dateString] = {
      avgTempDay,
      avgTempNight,
      minTempDay,
      minTempNight,
      avgDescriptionDay,
      mostCommonIconDay,
      maxTempDay,
      maxTempNight,
      day: dayOfWeek,
      date: getDate(dateString),
      hourlyList,
    };
  }

  return dailyForecastData;
};

function getMostFrequentItem<T>(arr: T[]): T {
  return arr.reduce(
    (acc, val) =>
      arr.filter((v) => v === acc).length > arr.filter((v) => v === val).length ? acc : val,
    arr[0]
  );
}
