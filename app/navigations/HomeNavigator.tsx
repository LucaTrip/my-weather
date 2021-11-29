import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import WeatherDetail from '../screens/WeatherDetail';
import HomeHeaderRightButton from '../components/HomeHeaderRightButton';

const HomeStack = createNativeStackNavigator();
const NestedTab = createBottomTabNavigator();

const NestedNavigator = () => (
  <NestedTab.Navigator
    screenOptions={() => ({
      tabBarIcon: ({color, size}) => (
        <Icon name="filter" size={size} color={color} />
      ),
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'gray',
      tabBarLabel: 'Weather detail',
    })}>
    <NestedTab.Screen
      name="WeatherDetail"
      component={WeatherDetail}
      options={({route}) => ({
        title: `${route.params?.city || 'Current position'} forecast`,
      })}></NestedTab.Screen>
  </NestedTab.Navigator>
);

const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerRight: () => <HomeHeaderRightButton />,
      }}></HomeStack.Screen>
    <HomeStack.Screen
      name="NestedWeatherDetail"
      component={NestedNavigator}
      options={{title: ''}}></HomeStack.Screen>
  </HomeStack.Navigator>
);

export default HomeNavigator;
