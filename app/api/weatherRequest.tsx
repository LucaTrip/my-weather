import {WeatherResponse} from '../models/WeatherResponse';
import axiosInstance from './client';

const endpointDefaultLocation = '/api/location';
// const endpointTrackSnippet = '/track.snippet.get';

const getWeatherInfoFromId = (woeid: number) =>
  axiosInstance.get<WeatherResponse>(`${endpointDefaultLocation}/${woeid}/`);

/* const getSmallLyric = (track_id: number) =>
  axiosInstance.get<SnippetResponse>(endpointTrackSnippet, {
    params: {track_id},
  }); */

export default {getWeatherInfoFromId};
