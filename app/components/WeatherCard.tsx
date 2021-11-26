import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FAB} from 'react-native-paper';

const WeatherCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.inlineContainer}>
        <Text style={[styles.bigFont, styles.whiteFont]}>17:24</Text>
        <Text style={styles.smallFont}>MAY 21</Text>
      </View>

      <Image
        style={styles.centerImage}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />

      <View style={styles.inlineContainer}>
        <Text style={styles.bigFont}>
          17°<Text style={styles.smallFont}>/24°</Text>
        </Text>
        <Text style={styles.smallFont}>CLOUDY</Text>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.footerContainer}>
        <Text style={[styles.bigFont, styles.whiteFont]}>LONDON</Text>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#59b4ab',
    width: '100%',
    color: 'black',
  },
  bigFont: {fontSize: 40},
  smallFont: {fontSize: 25},
  whiteFont: {color: 'white'},
  inlineContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  centerImage: {
    width: '50%',
    height: '30%',
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
