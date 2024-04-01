import * as z from 'zod';

const MainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  humidity: z.number(),
});

const WeatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const WindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
});

const CloudsSchema = z.object({
  all: z.number(),
});

const SysSchema = z.object({
  pod: z.string(),
});

const ForecastSchema = z.object({
  dt: z.number(),
  main: MainSchema,
  weather: z.array(WeatherSchema),
  wind: WindSchema,
  clouds: CloudsSchema,
  sys: SysSchema,
  dt_txt: z.string(),
  pop: z.number(),
});

const WeatherForecastHourlyListSchema = z.array(ForecastSchema);

export const WeatherForecastSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(ForecastSchema),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export type WeatherForecastResponseData = z.infer<typeof WeatherForecastSchema>;
export type WeatherForecastHourlyListType = z.infer<typeof WeatherForecastHourlyListSchema>;
