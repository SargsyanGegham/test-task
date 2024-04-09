/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './login';
import Nav from '../components/nav';
import CategoriesScreen from './categories';
import WishlistScreen from './wishlist';
import ProfileScreen from './profile';
import {useAppSelector} from '../store';
// import Nav from '../components/nav';

const Stack = createNativeStackNavigator();

const Screens = () => {
  const userToken = useAppSelector(state => state.authReducer.profile?.token);
  return (
    <>
      {userToken ? (
        <Nav />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Screens;
