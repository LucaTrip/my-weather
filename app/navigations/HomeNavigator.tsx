import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WeatherDetail from '../screens/WeatherDetail';

const HomeStack = createNativeStackNavigator();
const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}></HomeStack.Screen>
    <HomeStack.Screen
      name="WeatherDetail"
      component={WeatherDetail}></HomeStack.Screen>
  </HomeStack.Navigator>
);

export default HomeNavigator;
