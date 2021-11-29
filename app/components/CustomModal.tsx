import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Dispatch} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import CustomSafeAreaView from './CustomSafeAreaView';
import {addCityToSearch, addLocationToSearch} from '../store/actionMethods';
import {Location} from '../models/Location';
import {StoreState} from '../store/type';

type Props = {
  visibility: boolean;
  handleCloseModal: () => void;
};

const CustomModal: React.FC<Props> = ({visibility, handleCloseModal}) => {
  const [city, setCity] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const citiesFromStore = useSelector((state: StoreState) => state.cities);

  const dispatch: Dispatch<any> = useDispatch();

  const modalWillDismiss = (cityName?: string | null, location?: Location) => {
    handleCloseModal();

    setTimeout(() => {
      if (cityName) {
        dispatch(addCityToSearch(cityName));
      } else if (location) {
        dispatch(addLocationToSearch(location));
      } else if (city.length) {
        dispatch(addCityToSearch(city));
      }

      if (city.length) setCity('');
    }, 100);
  };

  const handleUserLocation = async () => {
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
                modalWillDismiss(null, response);
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
      }
    } catch (error: any) {
      console.log('[requestAuthorization] error', error);
      Alert.alert('Location Error', error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visibility}
      onRequestClose={() => modalWillDismiss()}>
      <CustomSafeAreaView style={styles.modalInnerContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity>
            <Icon
              name="gps-fixed"
              size={30}
              color="black"
              onPress={handleUserLocation}
            />
          </TouchableOpacity>

          <Button mode="text" onPress={() => modalWillDismiss()}>
            Close
          </Button>
        </View>

        {fetchingLocation ? (
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <ActivityIndicator size="small" />
            <Text style={{color: 'black', marginLeft: 10}}>
              We are retrieving your current position
            </Text>
          </View>
        ) : null}

        <Text style={styles.info}>
          Which city do you want to know the weather for today and for the next
          5 days?
        </Text>
        <TextInput
          mode="outlined"
          label="City"
          placeholder="New York"
          value={city}
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={text => setCity(text)}
        />

        <Button
          disabled={city.length ? false : true}
          mode="contained"
          onPress={() => modalWillDismiss()}
          style={styles.submitButton}>
          Go
        </Button>

        <View style={styles.latestSearches}>
          <Text style={styles.latestSearchesTitle}>Latest searches</Text>

          {citiesFromStore?.length ? (
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{paddingBottom: 30}}
              data={citiesFromStore}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.latestSearchItem,
                    index % 2 === 0 ? styles.evenItem : styles.oddItem,
                  ]}
                  onPress={() => modalWillDismiss(item)}>
                  <Text style={styles.latestSearchText}>{item}</Text>
                  <Icon name="chevron-right" size={30} color="black" />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noSearchYet}>
              You haven't done any research yet
            </Text>
          )}
        </View>
      </CustomSafeAreaView>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalInnerContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'whitesmoke',
  },
  closeButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  info: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  latestSearches: {
    marginTop: 20,
    flex: 1,
  },
  latestSearchesTitle: {
    color: 'black',
    fontSize: 20,
  },
  noSearchYet: {
    textAlign: 'center',
    marginTop: 15,
  },
  latestSearchItem: {
    paddingVertical: 5,
    flexDirection: 'row',
    marginLeft: 15,
  },
  latestSearchText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  evenItem: {
    backgroundColor: '',
  },
  oddItem: {
    backgroundColor: '#eee',
  },
});
