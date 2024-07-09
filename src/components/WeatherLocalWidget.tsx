import { useFormatUnits } from '../hooks/useFormatUnits';
import { type BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';

type WeatherLocalWidgetProps = {
  localCityData: BaseWeatherResponseData;
};

export const WeatherLocalWidget = ({ localCityData }: WeatherLocalWidgetProps) => {
  const { tempUnits } = useFormatUnits();

  return (
    <div className="flex px-3 h-full items-center justify-between absolute left-0 min-w-[150px] tw-gradient-main">
      <h2 className="text-md font-bold">
        <span>{localCityData.name},</span>
        <br />
        <span>{localCityData.sys.country}</span>
      </h2>
      <div className="w-20 h-auto">
        <img
          className="w-full h-full object-cover"
          src={`https://openweathermap.org/img/wn/${localCityData.weather[0].icon}@2x.png`}
        />
      </div>
      <div style={{ fontFamily: 'Arial' }} className="text-2xl font-bold tracking-tighter">
        {Math.round(localCityData.main.temp)}
        {tempUnits}
      </div>
    </div>
  );
};
