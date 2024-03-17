import { z } from 'zod';

const City = z.object({
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  state: z.string().optional(),
});

export const CityListWeatherApiResponseSchema = z.array(City);

export type CityListWeatherApiResponseData = z.infer<typeof CityListWeatherApiResponseSchema>;
