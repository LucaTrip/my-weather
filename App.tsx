import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import CustomSafeAreaView from './app/components/CustomSafeAreaView';
import HomeNavigator from './app/navigations/HomeNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <CustomSafeAreaView>
          <HomeNavigator />
        </CustomSafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
