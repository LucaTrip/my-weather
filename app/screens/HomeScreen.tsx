import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import weatherApi from '../api/weatherRequest';
import WeatherDetail from './WeatherDetail';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import WeatherCard from '../components/WeatherCard';

type HomeStackParamList = {
  Home: undefined;
  WeatherDetail: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDefaultWeatherLocation = () => {
    try {
      setLoading(true);
      setIsError(false);

      //const defaultWeatherResponse = await weatherApi.getWeatherInfoFromId(44418);
    } catch (error) {
      setIsError(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    handleDefaultWeatherLocation();
  }, []);

  return (
    <CustomSafeAreaView>
      <View style={styles.mainContainer}>
        <ActivityIndicator animating={loading} size="large" />

        {isError && !loading ? <Text>Something went wrong</Text> : null}

        {!isError && !loading ? <WeatherCard /> : null}
      </View>
    </CustomSafeAreaView>
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
  },
});
