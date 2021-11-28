import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Dimensions, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import weatherApi from '../api/weatherRequest';
import ApiError from '../components/ApiError';
import WeatherCard from '../components/WeatherCard';
import {Location} from '../models/Location';
import {LocationSearch, WeatherResponse} from '../models/WeatherResponse';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type WeatherStackParamList = {
  WeatherDetail: {
    city?: string | undefined;
    userLocation?: Location | undefined;
  };
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
      if (params.userLocation)
        location = await weatherApi.searchLocation(
          null,
          params.userLocation.coords?.latitude,
          params.userLocation.coords?.longitude,
        );

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

      {!isError && !loading && placeForecast ? (
        <AppIntroSlider
          style={styles.sliderContainer}
          keyExtractor={item => item.id.toString()}
          data={placeForecast.consolidated_weather}
          showNextButton={false}
          showDoneButton={false}
          activeDotStyle={{backgroundColor: 'purple'}}
          renderItem={({item}) => (
            <View style={{paddingHorizontal: 20}}>
              <WeatherCard forecastWeather={item} place={placeForecast.title} />
            </View>
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
    backgroundColor: 'whitesmoke',
  },
  sliderContainer: {
    height: windowHeight,
    width: windowWidth,
  },
});
