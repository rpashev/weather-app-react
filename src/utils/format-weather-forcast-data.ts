import {
  HourlyForecastType,
  WeatherForecastHourlyListType,
} from '../schemas/WeatherForecastSchema';
import { getAdjustedTimestamp, getDate, getDayOfWeek, groupBy } from './formatters';

type DailyForecast = {
  avgTempDay: number | null;
  avgTempNight: number | null;
  minTempDay: number | null;
  minTempNight: number | null;
  maxTempDay: number | null;
  maxTempNight: number | null;
  avgDescriptionDay: string;
  mostCommonIconDay: string;
  day: string;
  date: string;
  hourlyData: HourlyForecastData;
  timezone: number;
};

type DailyForecastData = Record<string, DailyForecast>;
type HourlyForecastData = Record<string, HourlyForecastType>;

export const getForecastByDates = (data: WeatherForecastHourlyListType, timezone: number) => {
  const groupedByDate = groupBy(data, (item) => {
    const date = new Date(getAdjustedTimestamp(item.dt, timezone) * 1000);
    return date.toISOString().split('T')[0];
  });

  const keys = Object.keys(groupedByDate);

  if (keys.length > 0) {
    delete groupedByDate[keys[keys.length - 1]];
  }
  console.log(groupedByDate);
  return groupedByDate;
};

export const calculateDailyForecast = (
  data: WeatherForecastHourlyListType,
  timezone: number
): DailyForecastData => {
  const dailyForecastData: DailyForecastData = {};
  const groupedData = getForecastByDates(data, timezone);
  console.log(data);
  for (const [dateString, dailyData] of Object.entries(groupedData)) {
    const dayOfWeek = getDayOfWeek(dateString);
    const tempDaytimeArray: number[] = [];
    const tempNighttimeArray: number[] = [];
    const weatherDaytimeDescriptions: string[] = [];
    const weatherNighttimeDescriptions: string[] = [];
    const weatherDaytimeIcons: string[] = [];
    const weatherNighttimeIcons: string[] = [];
    let hourlyData: HourlyForecastData = {};
    dailyData.forEach((hourData) => {
      hourlyData[getAdjustedTimestamp(hourData.dt, timezone)] = {
        ...hourData,
        dt: getAdjustedTimestamp(hourData.dt, timezone),
      };
    });

    for (const forecast of dailyData) {
      const hour = new Date(getAdjustedTimestamp(forecast.dt, timezone) * 1000).getHours();
      if (dailyData.length < 5) {
        console.log(hour);
      }
      const isDaytime = hour >= 6 && hour <= 18;

      if (isDaytime) {
        if (dailyData.length < 5) {
          console.log(forecast.weather[0].icon);
        }
        tempDaytimeArray.push(forecast.main.temp);
        weatherDaytimeDescriptions.push(forecast.weather[0].description);
        weatherDaytimeIcons.push(forecast.weather[0].icon);
      } else {
        tempNighttimeArray.push(forecast.main.temp);
        weatherNighttimeDescriptions.push(forecast.weather[0].description);
        weatherNighttimeIcons.push(forecast.weather[0].description);
      }
    }

    const avgTempDay =
      (tempDaytimeArray.length &&
        Math.round(tempDaytimeArray.reduce((a, b) => a + b, 0) / tempDaytimeArray.length)) ||
      null;
    const avgTempNight = Math.round(
      tempNighttimeArray.reduce((a, b) => a + b, 0) / tempNighttimeArray.length
    );
    const minTempDay = Math.round(Math.min(...tempDaytimeArray));
    const minTempNight = Math.round(Math.min(...tempNighttimeArray));
    const maxTempDay = Math.round(Math.max(...tempDaytimeArray));
    const maxTempNight = Math.round(Math.max(...tempNighttimeArray));
    const avgDescriptionDay =
      getMostFrequentItem(weatherDaytimeDescriptions) ||
      getMostFrequentItem(weatherNighttimeDescriptions);
    const mostCommonIconDay =
      getMostFrequentItem(weatherDaytimeIcons) || getMostFrequentItem(weatherNighttimeIcons);

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
      hourlyData,
      timezone,
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
