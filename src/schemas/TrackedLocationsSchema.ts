import * as z from 'zod';

const SingleTrackedLocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  city: z.string(),
  id: z.string(),
});

export const TrackedLocationListSchema = z.object({
  locations: z.array(SingleTrackedLocationSchema).min(0),
});

export type TrackedLocationsType = z.infer<typeof TrackedLocationListSchema>;
