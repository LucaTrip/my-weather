import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import weatherApi from '../api/weatherRequest';
import WeatherDetail from './WeatherDetail';
import WeatherCard from '../components/WeatherCard';

type HomeStackParamList = {
  Home: undefined;
  WeatherDetail: {city: string};
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [weatherInfo, setWeatherInfo] = useState({
    place: '',
    forecastDate: '',
    maxTemp: 0.0,
    minTemp: 0.0,
    weatherStateName: '',
    iconURL: '',
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDefaultWeatherLocation = async () => {
    try {
      setLoading(true);
      setIsError(false);

      const defaultWeatherResponse = await weatherApi.getWeatherInfoFromId(
        44418,
      );

      setWeatherInfo({
        place: defaultWeatherResponse.data.title,
        forecastDate: defaultWeatherResponse.data.time,
        maxTemp: defaultWeatherResponse.data.consolidated_weather[0].max_temp,
        minTemp: defaultWeatherResponse.data.consolidated_weather[0].min_temp,
        weatherStateName:
          defaultWeatherResponse.data.consolidated_weather[0]
            .weather_state_name,
        iconURL: weatherApi.getWeatherStateIconURL(
          defaultWeatherResponse.data.consolidated_weather[0]
            .weather_state_abbr,
        ),
      });
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDefaultWeatherLocation();
  }, []);

  const handleModalCity = (city: string) => {
    if (city) navigation.push('WeatherDetail', {city});
  };

  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator animating={loading} size="large" />

      {isError && !loading ? <Text>Something went wrong</Text> : null}

      {!isError && !loading ? (
        <WeatherCard
          handleModalCity={handleModalCity}
          place={weatherInfo.place}
          forecastDate={weatherInfo.forecastDate}
          maxTemp={weatherInfo.maxTemp}
          minTemp={weatherInfo.minTemp}
          weatherStateName={weatherInfo.weatherStateName}
          iconURL={weatherInfo.iconURL}
        />
      ) : null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'whitesmoke',
  },
});
