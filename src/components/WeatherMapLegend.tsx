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
  let gradientClass: string = '';

  switch (weatherLayer) {
    case 'precipitation':
      activeLegendData = rainLegendData;
      legendLabel = 'Precipitation, mm/h';
      gradientClass = 'legend-gradient-rain';
      break;
    case 'wind':
      activeLegendData = windLegendData;
      legendLabel = 'Wind speed, m/s';
      gradientClass = 'legend-gradient-wind';

      break;
    case 'temp':
      activeLegendData = tempLegendData;
      legendLabel = "'Temperature, °C";
      gradientClass = 'legend-gradient-temp';

      break;
    case 'clouds':
      activeLegendData = cloudsLegendData;
      legendLabel = 'Clouds in %';
      gradientClass = 'legend-gradient-clouds';

      break;
    case 'pressure':
      activeLegendData = pressureLegendData;
      legendLabel = 'Pressure, hPa';
      gradientClass = 'legend-gradient-pressure';

      break;
  }

  return (
    <div
      className="absolute bottom-0 left-0 z-50 w-[390px] max-w-[100%] overflow-hidden flex bg-white items-center p-1 rounded"
      style={{ zIndex: 1500 }}
    >
      <div className="text-[11px] font-medium ml-1 w-44">{legendLabel}</div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between bg-white text-slate-600 rounded-t">
          {activeLegendData.map((val) => (
            <label key={val} className="text-[11px] font-medium">
              {val}
            </label>
          ))}
        </div>
        <div className="w-[260px] rounded-b">
          <div className={`h-[6px] w-full ${gradientClass}`}></div>
        </div>
      </div>
    </div>
  );
};
