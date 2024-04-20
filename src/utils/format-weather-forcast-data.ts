import {
  type HourlyForecastType,
  type WeatherForecastHourlyListType,
} from '../schemas/WeatherForecastSchema';
import { getAdjustedTimestamp, getDate, getDayOfWeek, groupBy } from './formatters';

type DailyForecast = {
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  avgDescription: string;
  mostCommonIcon: string;
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
  return groupedByDate;
};

export const calculateDailyForecast = (
  data: WeatherForecastHourlyListType,
  timezone: number
): DailyForecastData => {
  const dailyForecastData: DailyForecastData = {};
  const groupedData = getForecastByDates(data, timezone);
  for (const [dateString, dailyData] of Object.entries(groupedData)) {
    const dayOfWeek = getDayOfWeek(dateString);
    const tempArray: number[] = [];
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

      const isDaytime = hour >= 6 && hour <= 18;

      if (isDaytime) {
        weatherDaytimeDescriptions.push(forecast.weather[0].description);
        weatherDaytimeIcons.push(forecast.weather[0].icon);
      } else {
        weatherNighttimeDescriptions.push(forecast.weather[0].description);
        weatherNighttimeIcons.push(forecast.weather[0].icon);
      }
      tempArray.push(forecast.main.temp);
    }

    const avgTemp =
      tempArray.length && Math.round(tempArray.reduce((a, b) => a + b, 0) / tempArray.length);

    const minTemp = Math.round(Math.min(...tempArray));
    const maxTemp = Math.round(Math.max(...tempArray));
    const avgDescription = weatherDaytimeDescriptions.length
      ? getMostFrequentItem(weatherDaytimeDescriptions)
      : getMostFrequentItem(weatherNighttimeDescriptions);

    const mostCommonIcon = weatherDaytimeIcons.length
      ? getMostFrequentItem(weatherDaytimeIcons)
      : getMostFrequentItem(weatherNighttimeIcons);
    dailyForecastData[dateString] = {
      maxTemp,
      avgTemp,
      minTemp,
      avgDescription,
      mostCommonIcon,
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
