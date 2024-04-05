import { useFetchWeatherForecastQuery } from '../hooks/tanstack-query/useFetchWeatherForecastQuery';
import { Backdrop } from './UI/Backdrop';
import { calculateDailyForecast } from '../utils/format-weather-forcast-data';
import { BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';
import { useEffect, useState } from 'react';
import { formatUnixTimestamp, getDateFromTimezone } from '../utils/formatters';
import { LineChart } from './UI/LineChart';
import { HourlyForecastType } from '../schemas/WeatherForecastSchema';
import { WeatherChartFilterType } from '../common/types';

type PropsType = {
  setDetailsDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { lon: number; lat: number };
  currentWeatherData: BaseWeatherResponseData;
};
export const WeatherDetailsDialog = ({
  setDetailsDialogIsOpen,
  coords,
  currentWeatherData,
}: PropsType) => {
  const closeDialog = () => setDetailsDialogIsOpen(false);

  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<WeatherChartFilterType>('Temp');

  const { data: weatherForecastData } = useFetchWeatherForecastQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });

  const onClickDay = (date: string) => {
    setActiveDay(date);
    setActiveTimestamp(null);
  };
  useEffect(() => {
    if (weatherForecastData) {
      let defaultActiveDay = getDateFromTimezone(
        weatherForecastData.list[0].dt,
        currentWeatherData.timezone
      );
      setActiveDay(defaultActiveDay);
    }
  }, [weatherForecastData]);

  if (!weatherForecastData || !activeDay) return;

  const dailyForecastData = calculateDailyForecast(
    weatherForecastData.list,
    weatherForecastData.city.timezone
  );

  let dateKeys = Object.keys(dailyForecastData);

  const mapFilteredHourlyDataForChart = (
    data: HourlyForecastType,
    filter: WeatherChartFilterType
  ) => {
    if (filter === 'Temp') {
      return Math.round(data.main.temp);
    }
    if (filter === 'Rain') {
      return Math.round(data.pop * 100);
    }
    if (filter === 'Wind') {
      return Math.round(data.wind.speed);
    }
  };

  const getdefaultActiveHourlyChartData = () => {
    let defaultActiveHourlyChartData = Object.values(dailyForecastData[activeDay]?.hourlyData).map(
      (data) => mapFilteredHourlyDataForChart(data, activeFilter)
    );

    if (defaultActiveHourlyChartData.length !== 8) {
      defaultActiveHourlyChartData = defaultActiveHourlyChartData.concat(
        Object.values(dailyForecastData[dateKeys[1]]?.hourlyData)
          .map((data) => mapFilteredHourlyDataForChart(data, activeFilter))
          .slice(0, 8 - defaultActiveHourlyChartData.length)
      );
    }

    return defaultActiveHourlyChartData;
  };

  const getAdditionalTimestampsFromNextDay = () => {
    if (Object.keys(dailyForecastData[activeDay]?.hourlyData).length !== 8) {
      return Object.keys(dailyForecastData[dateKeys[1]]?.hourlyData)?.slice(
        0,
        8 - Object.keys(dailyForecastData[activeDay]?.hourlyData).length
      );
    }
    return;
  };

  return (
    <>
      <Backdrop onClickBackdrop={closeDialog} />
      <dialog
        open
        className="z-50 flex flex-col tw-fixed-center bg-red w-[850px] max-w-[95%] h-[800px] mx-auto "
      >
        <header className="relative flex justify-between items-center tw-gradient-main py-3 px-4 text-xl font-bold">
          <h2>Weather for {`${currentWeatherData.name}, ${currentWeatherData.sys.country}`}</h2>
          <button
            className="px-1 py-0 font-extrabold text-2xl text-grey-600 enabled:hover:bg-amber-300 transition-all"
            onClick={closeDialog}
          >
            &#10005;
          </button>
        </header>
        <div className="flex justify-between gap-5 px-6">
          {/* <div>left - first timestamp temp, icon + details(wind, feels like, pop)</div> */}
          <div className="flex gap-2 items-center">
            <div className="w-24 h-auto">
              {!activeTimestamp && (
                <img
                  className="w-full h-full object-cover"
                  src={`https://openweathermap.org/img/wn/${dailyForecastData[activeDay]?.mostCommonIcon}@2x.png`}
                />
              )}
              {activeTimestamp && (
                <img
                  className="w-full h-full object-cover"
                  src={`https://openweathermap.org/img/wn/${dailyForecastData[activeDay].hourlyData[activeTimestamp]?.weather[0].icon}@2x.png`}
                />
              )}
            </div>
            <div style={{ fontFamily: 'Arial' }} className="text-5xl tracking-tight font-bold">
              {activeTimestamp &&
                Math.round(dailyForecastData[activeDay]?.hourlyData[activeTimestamp]?.main?.temp)}
              {!activeTimestamp && Math.round(dailyForecastData[activeDay]?.maxTemp || 0)}
              °C
            </div>
          </div>
          <div>
            <h2 className="text-xl">Weather</h2>
            <div>{`${dailyForecastData[activeDay]?.day} ${(activeTimestamp && formatUnixTimestamp(dailyForecastData[activeDay].hourlyData[activeTimestamp].dt, 0, true)) || ''}`}</div>

            <div>
              {!activeTimestamp && dailyForecastData[activeDay]?.avgDescription}
              {activeTimestamp &&
                dailyForecastData[activeDay].hourlyData[activeTimestamp].weather[0].description}
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-6 mx-auto">
          <div
            onClick={() => setActiveFilter('Temp')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Temp' && 'bg-slate-200'}`}
          >
            Temperature
          </div>
          <div
            onClick={() => setActiveFilter('Wind')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Wind' && 'bg-slate-200'}`}
          >
            Wind
          </div>
          <div
            onClick={() => setActiveFilter('Rain')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Rain' && 'bg-slate-200'}`}
          >
            Precipitation
          </div>
        </div>

        {getdefaultActiveHourlyChartData() && (
          <LineChart datasetValues={getdefaultActiveHourlyChartData()} mode={activeFilter} />
        )}
        {/* <div className="flex justify-between gap-5">
          clickable graph with hourly temperatures and timestamps - on click changes upper section.
          Maybe toggle graph for wind
        </div>
        <div className="flex justify-between gap-5">
          list of clickable 5 days with min/max day/night, dayname and icon. On click it changes
          data above
        </div> */}
        <div className="flex justify-between flex-col gap-10 px-6 mt-6">
          <div className="flex items-center justify-between gap-10">
            {Object.keys(dailyForecastData[activeDay]?.hourlyData)?.map((timestamp) => {
              return (
                <div
                  key={timestamp}
                  onClick={() => setActiveTimestamp(timestamp)}
                  className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeTimestamp === timestamp && 'bg-slate-200'}`}
                >
                  {formatUnixTimestamp(+timestamp, 0, true)}
                </div>
              );
            })}
            {getAdditionalTimestampsFromNextDay() &&
              getAdditionalTimestampsFromNextDay()
                ?.slice(0, 8 - Object.keys(dailyForecastData[activeDay]?.hourlyData).length)
                .map((timestamp) => {
                  return (
                    <div
                      key={timestamp}
                      onClick={() => {
                        setActiveTimestamp(timestamp);
                        setActiveDay(dateKeys[1]);
                      }}
                      className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeTimestamp === timestamp && 'bg-slate-200'}`}
                    >
                      {formatUnixTimestamp(+timestamp, 0, true)}
                    </div>
                  );
                })}
          </div>
          <div className="flex justify-between">
            {Object.keys(dailyForecastData).map((date) => {
              return (
                <div
                  key={date}
                  className={`flex flex-col
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all rounded ${activeDay === date && 'bg-slate-200'}`}
                  onClick={() => onClickDay(date)}
                >
                  <div>{dailyForecastData[date].day.substring(0, 3)}</div>
                  <div className="w-24 h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://openweathermap.org/img/wn/${dailyForecastData[date].mostCommonIcon}@2x.png`}
                    />
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">
                      {dailyForecastData[date].maxTemp}°
                    </span>
                    <span> | </span>
                    <span className="text-blue-600 font-semibold">
                      {dailyForecastData[date].minTemp}°
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end items-center mt-auto px-4 py-3">
          <button
            className="bg-slate-200 hover:bg-slate-300 transition-all text-slate-600 px-4 py-2 rounded"
            onClick={closeDialog}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};
