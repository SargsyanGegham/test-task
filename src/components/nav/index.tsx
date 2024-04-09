import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from '../../screens/home';
import ProfileScreen from '../../screens/profile';
import CategoriesScreen from '../../screens/categories';
import WishlistScreen from '../../screens/wishlist';
import SearchScreen from '../../screens/search';
import HomePng from '../../assets/home.png';
import CatPng from '../../assets/view_comfy_alt.png';
import FavPng from '../../assets/favorite.png';
import ProfilePng from '../../assets/person.png';
import SearchIcon from '../../assets/search.png';
import {Image, TouchableOpacity, View} from 'react-native';
import Logo from '../../assets/logo.png';
import {useAppDispatch, useAppSelector} from '../../store';
import {setToHideheaderTop} from '../../store/slices/home.slice';
import RealtimeSearchInput from '../search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Nav: React.FC = () => {
  const navigation = useNavigation();
  const hideheaderTop = useAppSelector(
    state => state.homeReducer.hideHeaderTop,
  );
  const dispatch = useAppDispatch();

  const getHeaderLeft = () => (
    <View style={{paddingLeft: '2.5%', paddingTop: 11, flex: 1}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image style={{width: 47, height: 28}} source={Logo} />
      </TouchableOpacity>
    </View>
  );

  const getHeaderRight = () => (
    <View style={{paddingLeft: '2.5%', paddingTop: 11, flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setToHideheaderTop());
          navigation.navigate('Search');
        }}>
        <Image style={{width: 18, height: 18}} source={SearchIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: !hideheaderTop,
        initialRouteName: 'Home',
        headerLeftContainerStyle: {
          paddingLeft: '2.5%',
          marginTop: 15,
          height: 48,
        },
        headerRightContainerStyle: {
          paddingRight: '2.5%',
          marginTop: 15,
          height: 48,
        },
        headerTitle: '',
        title: '',
        headerLeft: getHeaderLeft,
        headerRight: getHeaderRight,
      })}>
      <Tab.Screen
        name="Main"
        children={() => (
          <>
            <Stack.Navigator>
              <Stack.Screen
                options={{title: ''}}
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen
                name="Search"
                options={{
                  title: '',
                  headerRight: RealtimeSearchInput,
                }}
                component={SearchScreen}
              />
            </Stack.Navigator>
          </>
        )}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={HomePng}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={CatPng}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={FavPng}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={ProfilePng}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Nav;
