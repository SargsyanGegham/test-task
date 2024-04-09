/**
 * @file.
 * Contain Profile Screen.
 */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {logOut} from '../services/auth';
import {useAppDispatch, useAppSelector} from '../store';
import {removeUser} from '../store/slices/auth.slice';

type RootStackParamList = {};

export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.authReducer.profile);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image style={styles.img} source={profile.image} />
        <View>
          <Text style={styles.name}>{profile.firstName}</Text>
          <Text style={styles.gender}>{profile.gender}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          logOut();
          dispatch(removeUser());
        }}>
        <Text style={styles.logout}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  logout: {
    fontSize: 16,
    borderTopWidth: 2,
    borderColor: 'grey',
    padding: 10,
    width: '100%',
  },

  info: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
  },
  gender: {
    fontSize: 14,
    color: 'grey',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default ProfileScreen;
