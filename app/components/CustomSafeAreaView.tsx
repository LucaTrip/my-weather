import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const CustomSafeAreaView: React.FC<Props> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.safeAreaView, style]}>{children}</SafeAreaView>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
