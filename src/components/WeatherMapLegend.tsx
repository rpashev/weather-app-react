import { type WeatherMapLayerType } from '../common/types';

type PropsType = {
  weatherLayer: WeatherMapLayerType;
};

const tempLegendData = [-40, -20, 0, 20, 40];
const windLegendData = [0, 2, 3, 6, 12, 25, 50, 100];
const rainLegendData = [0, 0.5, 1, 2, 4, 6, 7, 10, 12, 14, 16, 24, 32, 60];
const pressureLegendData = [950, 980, 1010, 1040, 1070];
const cloudsLegendData = [0, 25, 50, 75, 100];

export const WeatherMapLegend = ({ weatherLayer }: PropsType) => {
  let activeLegendData: number[] = [];
  let legendLabel: string = '';

  switch (weatherLayer) {
    case 'precipitation':
      activeLegendData = rainLegendData;
      legendLabel = 'Precipitation, mm/h';
      break;
    case 'wind':
      activeLegendData = windLegendData;
      legendLabel = 'Wind speed, m/s';
      break;
    case 'temp':
      activeLegendData = tempLegendData;
      legendLabel = "'Temperature, °C";
      break;
    case 'clouds':
      activeLegendData = cloudsLegendData;
      legendLabel = 'Clouds in %';
      break;
    case 'pressure':
      activeLegendData = pressureLegendData;
      legendLabel = 'Pressure, hPa';
      break;
  }

  return (
    <div className="absolute bottom-0 right-0 z-50 w-[390px] flex bg-white items-center p-1 rounded">
      <div className="text-[11px] font-medium ml-1 w-44">{legendLabel}</div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between bg-white text-slate-600 rounded-t">
          {activeLegendData.map((val) => (
            <label key={val} className="text-[11px] font-medium">
              {val}
            </label>
          ))}
        </div>
        <div className="w-[260px] bg-white rounded-b">
          <div className="h-[6px] w-full legend-rain-gradient"></div>
        </div>
      </div>
    </div>
  );
};
