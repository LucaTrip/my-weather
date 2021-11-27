import moment from 'moment';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Modal} from 'react-native';
import {FAB, Card, TextInput, Button} from 'react-native-paper';
import CustomSafeAreaView from './CustomSafeAreaView';

type Props = {
  place: string;
  forecastDate: string;
  maxTemp: number;
  minTemp: number;
  weatherStateName: string;
  iconURL: string;
  handleModalCity: (city: string) => void;
};

const WeatherCard: React.FC<Props> = ({
  place,
  forecastDate,
  maxTemp,
  minTemp,
  weatherStateName,
  iconURL,
  handleModalCity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [city, setCity] = React.useState('');

  const modalWillDismiss = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      setCity('');
      handleModalCity(city);
    }, 500);
  };

  let formattedDate = 'MAY 12'; /* moment(forecastDate, 'MMM DD'); */
  let formattedHours = '12:12'; /* moment(forecastDate, 'hh:mm'); */

  console.log('dsadsa', iconURL);

  return (
    <>
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
            {`${Math.trunc(maxTemp)}°`}
            <Text style={styles.smallFont}>{`/${Math.trunc(minTemp)}°`}</Text>
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
            onPress={() => setModalVisible(true)}
          />
        </View>
      </Card>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={modalWillDismiss}>
        <CustomSafeAreaView style={styles.modalInnerContainer}>
          <View style={styles.closeButtonContainer}>
            <Button mode="text" onPress={modalWillDismiss}>
              Close
            </Button>
          </View>

          <Text style={styles.info}>
            Which city do you want to know the weather for today and for the
            next 5 days?
          </Text>
          <TextInput
            mode="outlined"
            label="City"
            placeholder="New York"
            value={city}
            autoCapitalize="sentences"
            onChangeText={text => setCity(text)}
          />

          <Button
            disabled={city.length ? false : true}
            mode="contained"
            onPress={modalWillDismiss}
            style={styles.submitButton}>
            Go
          </Button>
        </CustomSafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#59b4ab',
    width: '100%',
    color: 'black',
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
  modalInnerContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'whitesmoke',
  },
});

export default WeatherCard;
