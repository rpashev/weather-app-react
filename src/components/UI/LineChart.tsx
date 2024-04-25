import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WeatherChartFilterType } from '../../common/types';
import { useEffect, useState } from 'react';

type PropsType = {
  datasetValues: any[];
  mode: WeatherChartFilterType;
};

export const LineChart = ({ datasetValues, mode }: PropsType) => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const [padding, setPadding] = useState<{ left: number; right: number }>({ left: 32, right: 32 });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPadding({ left: 20, right: 20 });
      } else {
        setPadding({ left: 32, right: 32 });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const labels = datasetValues.map(toString);
  const min = Math.min(...datasetValues);
  const max = Math.max(...datasetValues);

  const data: ChartData<'line'> = {
    labels,

    datasets: [
      {
        pointStyle: false,
        data: datasetValues,
        fill: 'start',
        backgroundColor: mode === 'Rain' ? '#bfdbfe' : mode === 'Wind' ? '#e7e5e4' : '#fde68a',
        borderColor: mode === 'Rain' ? '#93c5fd' : mode === 'Wind' ? '#cbd5e1' : '#fbbf24',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding,
    },
    scales: {
      x: {
        type: 'category',
        display: false,
      },

      y: {
        display: false,
        type: 'linear',
        min: min - 7,
        max: max + 15,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },

      title: {
        text:
          mode === 'Wind'
            ? 'Wind measured in m/s'
            : mode === 'Temp'
              ? 'Temperature measured in Celsius'
              : 'Probability of rainfall in %',
        display: true,
        padding: {
          top: 32,
          bottom: 32,
        },
      },

      datalabels: {
        anchor: 'end',
        align: 'end',
        offset: 5,
        clamp: true,
        color: '#aaa',
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };

  return (
    <div className="min-h-[200px] px-0">
      <Line data={data} options={options} />
    </div>
  );
};
