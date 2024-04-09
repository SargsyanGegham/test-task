/**
 * Sample E-Commerce App
 * https://github.com/facebook/react-native
 *
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
