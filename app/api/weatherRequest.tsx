import {WeatherResponse} from '../models/WeatherResponse';
import axiosInstance from './client';

const endpointDefaultLocation = '/api/location';
const endpointWeatherStateIcon =
  'https://www.metaweather.com/static/img/weather/png/64';
const endpointPlaceInfo = '/api/location/search/';

const getWeatherInfoFromId = (woeid: number) =>
  axiosInstance.get<WeatherResponse>(`${endpointDefaultLocation}/${woeid}/`);

const getWeatherStateIconURL = (weatherState: string) => {
  return `${endpointWeatherStateIcon}/${weatherState}.png`;
};

const getWOEIdFromPlace = (query: string) => {
  axiosInstance.get<WeatherResponse>(endpointDefaultLocation, {
    params: {query},
  });
};

export default {
  getWeatherInfoFromId,
  getWeatherStateIconURL,
  getWOEIdFromPlace,
};
