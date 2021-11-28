import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Dispatch} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CustomSafeAreaView from './CustomSafeAreaView';
import {addCityToSearch} from '../store/actionMethods';

type Props = {
  visibility: boolean;
  handleCloseModal: () => void;
};

const CustomModal: React.FC<Props> = ({visibility, handleCloseModal}) => {
  const [city, setCity] = useState('');

  const citiesFromStore = useSelector((state: StoreState) => state.cities);

  const dispatch: Dispatch<any> = useDispatch();

  const modalWillDismiss = () => {
    handleCloseModal();

    if (city.length) {
      setTimeout(() => {
        dispatch(addCityToSearch(city));
        setCity('');
      }, 500);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visibility}
      onRequestClose={modalWillDismiss}>
      <CustomSafeAreaView style={styles.modalInnerContainer}>
        <View style={styles.closeButtonContainer}>
          <Button mode="text" onPress={modalWillDismiss}>
            Close
          </Button>
        </View>

        <Text style={styles.info}>
          Which city do you want to know the weather for today and for the next
          5 days?
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

        <View style={styles.latestSearches}>
          <Text style={styles.latestSearchesTitle}>Latest searches</Text>

          {citiesFromStore?.length ? (
            <FlatList
              data={citiesFromStore}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.latestSearchItem,
                    index % 2 === 0 ? styles.evenItem : styles.oddItem,
                  ]}
                  onPress={() => {
                    setCity(item);
                    modalWillDismiss();
                  }}>
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
    alignItems: 'flex-end',
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
