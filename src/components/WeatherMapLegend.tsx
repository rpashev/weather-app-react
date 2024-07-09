import { type WeatherMapLayerType } from '../common/types';
import { useSettingsContext } from '../context/settings-context';
import { useFormatUnits } from '../hooks/useFormatUnits';

type PropsType = {
  weatherLayer: WeatherMapLayerType;
};

const tempLegendDataMetric = [-40, -20, 0, 20, 40];
const windLegendDataMetric = [0, 2, 3, 6, 12, 25, 50, 100];
const tempLegendDataImperial = [-40, -4, 32, 68, 104];
const windLegendDataImperial = [0, 4, 7, 13, 27, 56, 112, 224];
const rainLegendData = [0, 0.5, 1, 2, 4, 6, 7, 10, 12, 14, 16, 24, 32, 60];
const pressureLegendData = [950, 980, 1010, 1040, 1070];
const cloudsLegendData = [0, 25, 50, 75, 100];

export const WeatherMapLegend = ({ weatherLayer }: PropsType) => {
  const { translations, settings } = useSettingsContext();
  const { tempUnits, speedUnits } = useFormatUnits();

  let activeLegendData: number[] = [];
  let legendLabel: string = '';
  let gradientClass: string = '';

  switch (weatherLayer) {
    case 'precipitation':
      activeLegendData = rainLegendData;
      legendLabel = translations?.pages.map.legPrecip + ', mm/h';
      gradientClass = 'legend-gradient-rain';
      break;
    case 'wind':
      activeLegendData =
        settings.units === 'metric' ? windLegendDataMetric : windLegendDataImperial;
      legendLabel = translations?.pages.map.legWind + `, ${speedUnits}`;
      gradientClass = 'legend-gradient-wind';

      break;
    case 'temp':
      activeLegendData = activeLegendData =
        settings.units === 'metric' ? tempLegendDataMetric : tempLegendDataImperial;
      legendLabel = translations?.pages.map.legTemp + `, ${tempUnits}`;
      gradientClass = 'legend-gradient-temp';

      break;
    case 'clouds':
      activeLegendData = cloudsLegendData;
      legendLabel = translations?.pages.map.legClouds + ' %';
      gradientClass = 'legend-gradient-clouds';

      break;
    case 'pressure':
      activeLegendData = pressureLegendData;
      legendLabel = translations?.pages.map.legPressure + ', hPa';
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
