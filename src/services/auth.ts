import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '.';

export const signIn = async (data: {username: string; password: string}) => {
  // Perform authentication, receive token
  try {
    try {
      const response = await apiClient.post('/auth/login', data);
      await AsyncStorage.setItem('userToken', response.data.token);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  } catch (e) {
    console.error(e);
  }
};

export const logOut = async () => {
  try {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  } catch (e) {
    console.error(e);
  }
};
