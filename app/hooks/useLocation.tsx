import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

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
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [location, setLocation] = useState<Location>();

  const getCurrentUserLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const locationPermission = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        switch (locationPermission) {
          case RESULTS.GRANTED:
            // 'The permission is granted'
            setFetchingLocation(true);

            Geolocation.getCurrentPosition(
              response => {
                console.log('[getCurrentPosition] success', response);
                setFetchingLocation(false);
                setLocation(response);
              },
              error => {
                console.log('[getCurrentPosition] error', error);
                setFetchingLocation(false);
                Alert.alert('Location Error', error.message);
              },
              {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
              },
            );
            break;

          case RESULTS.BLOCKED:
            // 'The permission is denied and not requestable anymore'
            Alert.alert(
              'Location',
              'If you want to use your GPS position to see the forecast for your city, then you will need to enable location permission manually in the settings',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'Settings', onPress: () => openSettings()},
              ],
            );
            break;
        }
      } else {
        // TODO
        const authStatus = await Geolocation.requestAuthorization('whenInUse');
        console.log('[requestAuthorization] success', authStatus);
        if (authStatus === 'granted') {
          Geolocation.getCurrentPosition(
            response => {
              console.log('[getCurrentPosition] success', response);
              return response;
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
          console.log('SIAMO QUI');
        }
      }
    } catch (error: any) {
      console.log('[requestAuthorization] error', error);
      Alert.alert('Location Error', error.message);
    }
  };

  useEffect(() => {
    getCurrentUserLocation();
  }, []);

  return {fetchingLocation, location};
};

export default useLocation;
