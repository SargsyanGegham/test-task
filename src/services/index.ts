import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (removeError) {
        console.error('Error removing token:', removeError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
