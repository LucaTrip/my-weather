import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type WeatherStackParamList = {
  WeatherDetail: {city: string};
};

type WeatherScreenRouteProp = RouteProp<WeatherStackParamList, 'WeatherDetail'>;

const WeatherDetail = () => {
  const [placeForecast, setPlaceForecast] = useState();
  const {params} = useRoute<WeatherScreenRouteProp>();

  return (
    <View>
      <Text>{params.city}</Text>
    </View>
  );
};

export default WeatherDetail;

const styles = StyleSheet.create({});
