import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Alert, Keyboard, Pressable, useColorScheme} from 'react-native';
import {Platform} from 'react-native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../../src/context';
import Bookings from './Bookings';
import { completeBookingApi, getAllBookingsApi, getBookingDetailsApi, recentBookingsApi } from '../../services';
import { Booking } from '../../services/ApiTypes';
import BookingDetailsPage from './BookingDetailsPage';
import { commonActions } from '../../context/actions';
import ChatInterface from './ChatInterface';

const Stack = createStackNavigator();

export const BookingsContext = createContext<PropsAppContext>({});

const BookingsNavigation = ({navigation, route}: any) => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const { identifier, dispatch, errorResponse, userData, firstLogin, logOutUser, setApplicationId, setEnvironment } = useContext<any>(AppContext);
  const [isSubmitting, setIsSubmitting] = useState({
    allBookings: false,
    completeBooking: false,
    bookingDetails: false,
    recentBookings: false
  })
  const [allBookingRes, setAllBookingRes] = useState<Booking | null>(null)
  const [completeBookingRes, setCompleteBookingRes] = useState<any>(null)
  const [bookingDetailsRes, setBookingDetailsRes] = useState<any>(null)

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const shouldShowTabBar = !routeName || routeName === 'Bookings';
  
    navigation.setOptions({
      tabBarStyle: shouldShowTabBar ? { display: 'flex' } : { display: 'none' },
    });
  }, [navigation, route]);

const getAllBookingsApiCall = async (key: string) => {
      Keyboard.dismiss();
      
      setIsSubmitting((prev) => ({...prev, allBookings: true}));
      
    let userToken = await AsyncStorage.getItem("userToken");
      await getAllBookingsApi(userToken)
        .then((response) => response)
        .then(async (data) => {
        //   console.log("all artisan by profession: ", data);
          setAllBookingRes(data)
      setIsSubmitting((prev) => ({...prev, allBookings: false}));
        })
        .catch((error) => {
      setIsSubmitting((prev) => ({...prev, allBookings: false}));
          console.log(error?.response, "error_____");
          errorResponse({ error, dispatch });
        })
        .then(() => 
      setIsSubmitting((prev) => ({...prev, allBookings: false})));
    };

    const completeBookingApiCall = async (id: string, values: object) => {
      Keyboard.dismiss();
      
      setIsSubmitting((prev) => ({...prev, completeBooking: true}));
      
    let userToken = await AsyncStorage.getItem("userToken");
      await completeBookingApi(userToken, id, values)
        .then((response) => response)
        .then(async (data) => {
          setCompleteBookingRes(data)
                    commonActions.notify('success', 'Booking completed', "Booking completed successfully.");
      setIsSubmitting((prev) => ({...prev, completeBooking: false}));
        })
        .catch((error) => {
      setIsSubmitting((prev) => ({...prev, completeBooking: false}));
          console.log(error?.response, "error_____");
          errorResponse({ error, dispatch });
        })
        .then(() => 
      setIsSubmitting((prev) => ({...prev, completeBooking: false})));
    };

    const getBookingDetailsApiCall = async (id: string) => {
      Keyboard.dismiss();
      
      setIsSubmitting((prev) => ({...prev, bookingDetails: true}));
      
    let userToken = await AsyncStorage.getItem("userToken");
      await getBookingDetailsApi(userToken, id)
        .then((response) => response)
        .then(async (data) => {
          setBookingDetailsRes(data?.data)
      setIsSubmitting((prev) => ({...prev, bookingDetails: false}));
        })
        .catch((error) => {
      setIsSubmitting((prev) => ({...prev, bookingDetails: false}));
          console.log(error?.response, "error_____");
          errorResponse({ error, dispatch });
        })
        .then(() => 
      setIsSubmitting((prev) => ({...prev, bookingDetails: false})));
    };

    


  return (
    <BookingsContext.Provider
      value={{
        isSubmitting,
        getAllBookingsApiCall,
        allBookingRes,
        completeBookingRes,
        completeBookingApiCall,
        setCompleteBookingRes,
        bookingDetailsRes,
        getBookingDetailsApiCall,
      }}>
      <Stack.Navigator screenOptions={{
    headerShown: false,
    animation: 'slide_from_right', // Use specific animation types
    // animationDuration: 300,
  }}>
        <Stack.Screen
          name="Bookings"
          component={Bookings}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="BookingDetailsPage"
          component={BookingDetailsPage}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ChatInterface"
          component={ChatInterface}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </BookingsContext.Provider>
  );
};

export default BookingsNavigation;
