import * as React from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

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


export const verifyPhoneApi = async (values: object) => {
  const { data } = await axios.post(`auth/verify`, values);
  return data;
}

export const validatePhoneApi = async (values: object) => {
  const { data } = await axios.post(`auth/validate-otp`, values);
  return data;
}

export const registerApi = async (values: object) => {
  const { data } = await axios.post(`auth/register`, values);
  return data;
}

export const loginPhoneApi = async (values: object) => {
  const { data } = await axios.post(`auth/login`, values);
  return data;
}

export const getJobTypesApi = async () => {
  const { data } = await axios.get(`job-type/all`);
  return data;
}

export const getArtisanByProfessionApi = async (token: string | null, id: string) => {
  const { data } = await axios.get(`auth/artisans/${id}`, {
    headers: {
      "Authorization":"Bearer " + token
    }
  });
  return data;
}

export const createBookingApi = async (token: string | null, values: object) => {
  const { data } = await axios.post(`bookings/create`, values, {
    headers: {
      "Authorization":"Bearer " + token
    }
  });
  return data;
}