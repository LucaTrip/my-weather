import React, {Dispatch} from 'react';
import {Alert, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setQrScannerStatus} from '../store/actionMethods';
import {StoreState} from '../store/type';

const HomeHeaderRightButton = () => {
  const qrcodeStatus = useSelector(
    (state: StoreState) => state.qrScannerStatus,
  );
  const dispatch: Dispatch<any> = useDispatch();

  const handleCameraOpening = async () => {
    try {
      if (Platform.OS === 'android') {
        const locationPermission = await request(PERMISSIONS.ANDROID.CAMERA);
        switch (locationPermission) {
          case RESULTS.GRANTED:
            // 'The permission is granted'
            dispatch(setQrScannerStatus(true));
            break;

          case RESULTS.BLOCKED:
            // 'The permission is denied and not requestable anymore'
            Alert.alert(
              'Camera',
              'If you want to scan QR codes you have to enable camera permissions in the settings manually',
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
      Alert.alert('Camera Error', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleCameraOpening} disabled={qrcodeStatus}>
      <Icon name="qr-code-scanner" size={30} />
    </TouchableOpacity>
  );
};

export default HomeHeaderRightButton;

const styles = StyleSheet.create({});
