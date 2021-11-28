import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Modal} from 'react-native';
import {FAB, Card, TextInput, Button} from 'react-native-paper';
import moment from 'moment';

import weatherApi from '../api/weatherRequest';
import CustomSafeAreaView from './CustomSafeAreaView';
import {PlaceForecast} from '../models/WeatherResponse';
import CustomModal from './CustomModal';

type Props = {
  place?: string;
  forecastWeather?: PlaceForecast;
};

const WeatherCard: React.FC<Props> = ({place, forecastWeather}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  let formattedDate = '',
    formattedHours = '',
    iconURL = '',
    minTemp = 0,
    maxTemp = 0,
    weatherStateName = '';
  if (forecastWeather) {
    formattedDate = moment(forecastWeather.created).format('MMM DD');
    formattedHours = moment(forecastWeather.created).format('hh:mm');
    iconURL = weatherApi.getWeatherStateIconURL(
      forecastWeather.weather_state_abbr,
    );
    minTemp = Math.trunc(forecastWeather.min_temp);
    maxTemp = Math.trunc(forecastWeather.max_temp);
    weatherStateName = forecastWeather.weather_state_name;
  }

  return (
    <>
      {forecastWeather ? (
        <Card style={styles.card}>
          <View style={styles.inlineContainer}>
            <Text style={[styles.bigFont, styles.whiteFont]}>
              {formattedHours}
            </Text>
            <Text style={styles.smallFont}>{formattedDate}</Text>
          </View>

          {iconURL.length ? (
            <Image style={styles.centerImage} source={{uri: iconURL}} />
          ) : null}

          <View style={styles.inlineContainer}>
            <Text style={styles.bigFont}>
              {`${maxTemp}°`}
              <Text style={styles.smallFont}>{`/ ${minTemp}°`}</Text>
            </Text>
            <Text style={styles.smallFont}>{weatherStateName}</Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.footerContainer}>
            <Text
              style={[styles.bigFont, styles.whiteFont, styles.uppercaseFont]}>
              {place}
            </Text>
            <FAB
              style={styles.fab}
              small
              icon="plus"
              color="black"
              onPress={() => setShowModal(true)}
            />
          </View>
        </Card>
      ) : null}

      <CustomModal visibility={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#59b4ab',
    width: '100%',
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  bigFont: {fontSize: 40, color: 'black'},
  smallFont: {fontSize: 25, color: 'black'},
  whiteFont: {color: 'white'},
  uppercaseFont: {textTransform: 'uppercase'},
  inlineContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  centerImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
    alignSelf: 'center',
  },
  divider: {
    height: 3,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fab: {
    backgroundColor: 'white',
  },
});

export default WeatherCard;
