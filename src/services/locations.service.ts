import { http } from './axios';
import { type TrackedLocationInputData } from '../common/types';
export default {
  getTrackedLocations() {
    return http.get(`${import.meta.env.VITE_APP_BASE_URL}weather-api/locations`);
  },
  saveTrackedLocation(body: TrackedLocationInputData) {
    return http.post(`${import.meta.env.VITE_APP_BASE_URL}weather-api/locations`, body);
  },
  deleteTrackedLocation(locationId: string) {
    return http.delete(`${import.meta.env.VITE_APP_BASE_URL}weather-api/locations/${locationId}`);
  },
  replaceTrackedLocations(body: { locations: string[] }) {
    return http.post(`${import.meta.env.VITE_APP_BASE_URL}weather-api/locations/all`, body);
  },
};
