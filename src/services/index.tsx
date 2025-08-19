import * as React from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateTransactionPin, UpdateTransactionPin, ValidatePhone, createProfileType, loginType, sentParams, sentVerifyPhoneData, setupPinType, swappedCurrency } from './ApiTypes';

const API_URL = Constants.expoConfig?.extra?.eas?.API_URL;
const REQUEST_TIMEOUT = Constants.expoConfig?.extra?.eas?.REQUEST_TIMEOUT;

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = parseInt(REQUEST_TIMEOUT, 10);

// console.log("API url ", API_URL);


axios.interceptors.request.use(
  async (config) => {
    /* const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } */
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getCountriesApi = async () => {
  const { data } = await axios.get(`customers/countries`);
  return data;
}

