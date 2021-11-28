import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import CustomModal from './CustomModal';

type Props = {
  handleRetryButton: () => void;
};

const ApiError: React.FC<Props> = ({handleRetryButton}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View>
      <Text style={styles.text}>
        Most likely the place you have chosen has not been indexed, try changing
        places or trying again.
      </Text>
      <View style={styles.buttonsContainer}>
        <Button mode="contained" onPress={() => setShowModal(!showModal)}>
          Change place
        </Button>

        <Button mode="contained" onPress={handleRetryButton}>
          Retry
        </Button>
      </View>

      <CustomModal visibility={showModal} handleCloseModal={handleCloseModal} />
    </View>
  );
};

export default ApiError;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginBottom: 15,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
