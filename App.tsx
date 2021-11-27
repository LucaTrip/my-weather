import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import HomeNavigator from './app/navigations/HomeNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <HomeNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
