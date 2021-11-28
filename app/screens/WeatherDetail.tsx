import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import weatherApi from '../api/weatherRequest';
import ApiError from '../components/ApiError';
import WeatherCard from '../components/WeatherCard';
import {LocationSearch, WeatherResponse} from '../models/WeatherResponse';

type WeatherStackParamList = {
  WeatherDetail: {city: string};
};

type WeatherScreenRouteProp = RouteProp<WeatherStackParamList, 'WeatherDetail'>;

const WeatherDetail = () => {
  const [placeForecast, setPlaceForecast] = useState<WeatherResponse>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {params} = useRoute<WeatherScreenRouteProp>();

  const handlePlaceForecast = async () => {
    try {
      setLoading(true);
      setIsError(false);

      let location;
      if (params.city) location = await weatherApi.searchLocation(params.city);

      if (location?.data) {
        const placeWeather = await weatherApi.getWeatherInfoFromId(
          location.data[0].woeid,
        );

        setPlaceForecast(placeWeather.data);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePlaceForecast();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator animating={loading} size="large" />

      {isError && !loading ? (
        <ApiError handleRetryButton={handlePlaceForecast} />
      ) : null}

      {!isError && !loading ? (
        <AppIntroSlider
          data={placeForecast?.consolidated_weather || []}
          renderItem={({item}) => (
            <WeatherCard forecastWeather={item} place={placeForecast?.title} />
          )}
        />
      ) : null}
    </View>
  );
};

export default WeatherDetail;

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
