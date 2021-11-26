export interface WeatherLocationInfo {
  id: number; // 4578046519541760,
  weather_state_name: string; // "Heavy Rain"
  weather_state_abbr: string; // "hr",
  wind_direction_compass: string; // "W",
  created: string; // "2021-11-26T18:59:03.070266Z",
  applicable_date: string; // "2021-11-26",
  min_temp: number; // 2.675,
  max_temp: number; // 9.17,
  the_temp: number; //8.695,
  wind_speed: number; // 9.573525723415253,
  wind_direction: number; // 278.9834028662407,
  air_pressure: number; // 992.0,
  humidity: number; // 79,
  visibility: number; // 9.445463493199714,
  predictability: number; // 77
}

export interface WeatherResponse {
  consolidated_weather: WeatherLocationInfo[];
  time: string; // '2021-11-26T21:19:39.844231Z';
  title: string; // 'London';
  location_type: string; // 'City';
  woeid: number; // 44418;
  latt_long: string; // '51.506321,-0.12714';
}
