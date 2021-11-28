import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import weatherApi from '../api/weatherRequest';
import WeatherCard from '../components/WeatherCard';
import ApiError from '../components/ApiError';
import {WeatherResponse} from '../models/WeatherResponse';

type HomeStackParamList = {
  Home: undefined;
  WeatherDetail: {city: string};
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [placeForecast, setPlaceForecast] = useState<WeatherResponse>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const cityFromStore = useSelector((state: StoreState) => state.city);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDefaultWeatherLocation = async () => {
    try {
      setLoading(true);
      setIsError(false);

      const placeWeather = await weatherApi.getWeatherInfoFromId(44418);

      setPlaceForecast(placeWeather.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!placeForecast) handleDefaultWeatherLocation();

    if (cityFromStore) navigation.push('WeatherDetail', {city: cityFromStore});
  }, [placeForecast, cityFromStore]);

  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator animating={loading} size="large" />

      {isError && !loading ? (
        <ApiError handleRetryButton={handleDefaultWeatherLocation} />
      ) : null}

      {!isError && !loading ? (
        <WeatherCard
          forecastWeather={placeForecast?.consolidated_weather[0]}
          place={placeForecast?.title}
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
