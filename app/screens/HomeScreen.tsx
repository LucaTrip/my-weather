import React, {Dispatch, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

import weatherApi from '../api/weatherRequest';
import WeatherCard from '../components/WeatherCard';
import ApiError from '../components/ApiError';
import {WeatherResponse} from '../models/WeatherResponse';
import {StoreState} from '../store/type';
import {Location} from '../models/Location';
import {Button} from 'react-native-paper';
import {BarCodeReadEvent} from 'react-native-camera';
import {setQrScannerStatus} from '../store/actionMethods';

type HomeStackParamList = {
  Home: undefined;
  NestedWeatherDetail: {
    screen: any;
    params: {
      city?: string | undefined;
      userLocation?: Location | undefined;
      cityId?: string | undefined;
    };
  };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [placeForecast, setPlaceForecast] = useState<WeatherResponse>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showQrCodeScanner, setShowQrCodeScanner] = useState(false);

  const cityFromStore = useSelector((state: StoreState) => state.city);
  const locationFromStore = useSelector((state: StoreState) => state.location);
  const qrcodeStatus = useSelector(
    (state: StoreState) => state.qrScannerStatus,
  );

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dispatch: Dispatch<any> = useDispatch();

  const handleDefaultWeatherLocation = async () => {
    try {
      setLoading(true);
      setIsError(false);

      const placeWeather = await weatherApi.getWeatherInfoFromId('44418');

      setPlaceForecast(placeWeather.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!placeForecast) handleDefaultWeatherLocation();

    if (cityFromStore)
      navigation.navigate('NestedWeatherDetail', {
        screen: 'WeatherDetail',
        params: {city: cityFromStore},
      });
    if (locationFromStore)
      navigation.navigate('NestedWeatherDetail', {
        screen: 'WeatherDetail',
        params: {userLocation: locationFromStore},
      });
    if (qrcodeStatus) setShowQrCodeScanner(!showQrCodeScanner);
  }, [placeForecast, cityFromStore, locationFromStore, qrcodeStatus]);

  const handleReadCamera = (e: BarCodeReadEvent) => {
    console.log('BarCodeReadEvent', e);
    dispatch(setQrScannerStatus(false));
    if (e.data) {
      setShowQrCodeScanner(!showQrCodeScanner);
      navigation.navigate('NestedWeatherDetail', {
        screen: 'WeatherDetail',
        params: {cityId: e.data.split('=')[1]},
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      {showQrCodeScanner ? (
        <QRCodeScanner
          onRead={handleReadCamera}
          topContent={
            <Button
              style={{position: 'absolute', right: 0, top: 5}}
              mode="contained"
              onPress={() => {
                setShowQrCodeScanner(!showQrCodeScanner);
                dispatch(setQrScannerStatus(false));
              }}>
              Close
            </Button>
          }
        />
      ) : (
        <View style={styles.cardContainer}>
          <ActivityIndicator animating={loading} size="large" />

          {isError && !loading && !showQrCodeScanner ? (
            <ApiError handleRetryButton={handleDefaultWeatherLocation} />
          ) : null}

          {!isError && !loading && placeForecast && !showQrCodeScanner ? (
            <WeatherCard
              forecastWeather={placeForecast.consolidated_weather[0]}
              place={placeForecast.title}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
});
