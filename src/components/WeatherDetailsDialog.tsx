import { useFetchWeatherForecastQuery } from '../hooks/tanstack-query/useFetchWeatherForecastQuery';
import { Backdrop } from './UI/Backdrop';
import { dummyData } from '../utils/dummyForecast';
import { getDate, getDayOfWeek, groupBy } from '../utils/formatters';

type WeatherDetailsDialogProps = {
  setDetailsDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { lon: number; lat: number };
};
export const WeatherDetailsDialog = ({
  setDetailsDialogIsOpen,
  coords,
}: WeatherDetailsDialogProps) => {
  const closeDialog = () => setDetailsDialogIsOpen(false);

  const { data: weatherForecastData } = useFetchWeatherForecastQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });
  if (!weatherForecastData) return;

  const groupedByDate = groupBy(dummyData.list, (item) => {
    return item.dt_txt.split(' ')[0];
  });

  const keys = Object.keys(groupedByDate);

  // Remove the last key (last day) if it exists
  if (keys.length > 0) {
    delete groupedByDate[keys[keys.length - 1]];
  }

  interface WeatherForecast {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }

  type GroupedForecast = Record<string, WeatherForecast[]>;

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
  };

  type DailyForecastData = Record<string, DailyForecast>;

  function calculateDailyForecast(groupedData: GroupedForecast): DailyForecastData {
    const dailyForecastData: DailyForecastData = {};

    for (const [dateString, dailyData] of Object.entries(groupedData)) {
      const dayOfWeek = getDayOfWeek(dateString);
      const tempDaytimeArray: number[] = [];
      const tempNighttimeArray: number[] = [];
      const weatherDaytimeDescriptions: string[] = [];
      const weatherDaytimeIcons: string[] = [];

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
      };
    }

    return dailyForecastData;
  }

  function getMostFrequentItem<T>(arr: T[]): T {
    return arr.reduce(
      (acc, val) =>
        arr.filter((v) => v === acc).length > arr.filter((v) => v === val).length ? acc : val,
      arr[0]
    );
  }

  const dailyForecastData = calculateDailyForecast(groupedByDate);
  console.log(dailyForecastData);

  return (
    <>
      <Backdrop onClickBackdrop={closeDialog} />
      <dialog open className="z-50 tw-fixed-center bg-red w-[900px] h-[500px] mx-auto ">
        <button onClick={closeDialog}>Close</button>
        <div>WeatherDetailsDialog</div>
        <div>{JSON.stringify(weatherForecastData)}</div>
      </dialog>
    </>
  );
};
