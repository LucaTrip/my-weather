import {LocationSearch, WeatherResponse} from '../models/WeatherResponse';
import axiosInstance from './client';

const endpointDefaultLocation = '/api/location';
const endpointWeatherStateIcon =
  'https://www.metaweather.com/static/img/weather/png/64';
const endpointPlaceInfo = '/api/location/search/';

const getWeatherInfoFromId = (woeid: number) =>
  axiosInstance.get<WeatherResponse>(`${endpointDefaultLocation}/${woeid}/`);

const getWeatherStateIconURL = (weatherState: string) =>
  `${endpointWeatherStateIcon}/${weatherState}.png`;

const searchLocation = (
  place?: string | null,
  latitude?: number | null,
  longitude?: number | null,
) => {
  let customParams = {};

  if (place) customParams = {query: place};
  if (latitude && longitude)
    customParams = {lattlong: `${latitude},${longitude}`};

  return axiosInstance.get<LocationSearch[]>(endpointPlaceInfo, {
    params: customParams,
  });
};

export default {
  getWeatherInfoFromId,
  getWeatherStateIconURL,
  searchLocation,
};
