import { type BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';

type WeatherLocalWidgetProps = {
  localCityData: BaseWeatherResponseData;
};

export const WeatherLocalWidget = ({ localCityData }: WeatherLocalWidgetProps) => {
  return (
    <div className="flex px-4 items-center justify-between absolute left-0 h-[70px] min-w-[200px] tw-gradient-main">
      <h2 className="text-lg font-bold">
        <span>{localCityData.name},</span>
        <br />
        <span>{localCityData.sys.country}</span>
      </h2>
      <div className="w-24 h-auto">
        <img
          className="w-full h-full object-cover"
          src={`https://openweathermap.org/img/wn/${localCityData.weather[0].icon}@2x.png`}
        />
      </div>
      <div style={{ fontFamily: 'Arial' }} className="text-3xl font-bold tracking-tighter">
        {Math.round(localCityData.main.temp)}°C
      </div>
    </div>
  );
};
