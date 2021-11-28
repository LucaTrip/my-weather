import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface Location {
  coords?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    heading: number | null;
    speed: number | null;
    altitudeAccuracy?: number | null;
  };
  timestamp?: number;
}

const useLocation = () => {
  const [lastLocation, setLastLocation] = useState<Location>({});

  const getCurrentUserLocation = async () => {
    try {
      const authStatus = await Geolocation.requestAuthorization('whenInUse');
      console.log('[requestAuthorization] success', authStatus);
      if (authStatus === 'granted') {
        Geolocation.getCurrentPosition(
          response => {
            console.log('[getCurrentPosition] success', response);
            setLastLocation(response);
          },
          error => {
            console.log('[getCurrentPosition] error', error);
            Alert.alert('Location Error', error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
      }
    } catch (error: any) {
      console.log('[requestAuthorization] error', error);
      Alert.alert('Location Error', error.message);
    }
  };

  useEffect(() => {
    getCurrentUserLocation();
  }, []);

  return lastLocation;
};

export default useLocation;

const styles = StyleSheet.create({});
