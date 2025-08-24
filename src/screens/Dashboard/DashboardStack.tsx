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
import Dashboard from './Dashboard';
import ServiceSummary from './ServiceSummary';
import BookArtisan from './BookArtisan';
import SelectArtisan from './SelectArtisan';
import BookingSuccess from './BookingSuccess';
import BookingDetails from './BookingDetails';
import { createBookingApi, getArtisanByProfessionApi } from '../../services';
import { ArtisanByProfessionType, BookingResponse } from '../../services/ApiTypes';

const Stack = createStackNavigator();

export const DashboardContext = createContext<PropsAppContext>({});

const DashboardNavigation = ({navigation, route}: any) => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const { identifier, dispatch, errorResponse, userData, firstLogin, logOutUser, setApplicationId, setEnvironment } = useContext<any>(AppContext);
  const [isSubmitting, setIsSubmitting] = useState({
    artisanByProfession: false,
    createBooking: false,
  })
  const [allArtisanByProfession, setAllArtisanByProfession] = useState<ArtisanByProfessionType[] | null>(null)
  const [createBooking, setCreateBooking] = useState<any>({
    scheduledAt: "",
    location: "",
    notes: "",
    assignedArtisan: "",
    jobTypeKey: ""
  })
  const [createBookingRes, setCreateBookingRes] = useState<BookingResponse | null>(null)

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const shouldShowTabBar = !routeName || routeName === 'Dashboard';
  
    navigation.setOptions({
      tabBarStyle: shouldShowTabBar ? { display: 'flex' } : { display: 'none' },
    });
  }, [navigation, route]);


  const getArtisanByProfessionApiCall = async (key: string) => {
      Keyboard.dismiss();
      
      setIsSubmitting((prev) => ({...prev, artisanByProfession: true}));
      
    let userToken = await AsyncStorage.getItem("userToken");
      await getArtisanByProfessionApi(userToken, key)
        .then((response) => response)
        .then(async (data) => {
          // console.log("all artisan by profession: ", data);
          setAllArtisanByProfession(data)
      // setIsSubmitting((prev) => ({...prev, artisanByProfession: false}));
      //     navigation.navigate("OnboardStackScreen", {
      //       screen: "SignupSuccess",
      //     });
        })
        .catch((error) => {
      setIsSubmitting((prev) => ({...prev, artisanByProfession: false}));
          console.log(error?.response, "error_____");
          errorResponse({ error, dispatch });
        })
        .then(() => 
      setIsSubmitting((prev) => ({...prev, artisanByProfession: false})));
    };

    const createBookingApiCall = async (artisanId: number, jobTypeId: number) => {
      Keyboard.dismiss();
      createBooking.assignedArtisan = artisanId;
      createBooking.jobTypeKey = jobTypeId;
      
      setIsSubmitting((prev) => ({...prev, createBooking: true}));
      
    let userToken = await AsyncStorage.getItem("userToken");
      await createBookingApi(userToken, createBooking)
        .then((response) => response)
        .then(async (data) => {
          // console.log("create booking: ", data);
          setCreateBookingRes(data)
      setIsSubmitting((prev) => ({...prev, createBooking: false}));
          navigation.navigate("TabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "BookingSuccess",
      },
    })
        })
        .catch((error) => {
      setIsSubmitting((prev) => ({...prev, createBooking: false}));
          console.log(error?.response, "error_____");
          errorResponse({ error, dispatch });
        })
        .then(() => 
      setIsSubmitting((prev) => ({...prev, createBooking: false})));
    };

  return (
    <DashboardContext.Provider
      value={{
        isSubmitting,
        getArtisanByProfessionApiCall,
        allArtisanByProfession,
        setCreateBooking,
        createBooking,
        createBookingRes, 
        setCreateBookingRes,
        createBookingApiCall
      }}>
      <Stack.Navigator screenOptions={{
    headerShown: false,
    animation: 'slide_from_right', // Use specific animation types
    // animationDuration: 300,
  }}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ServiceSummary"
          component={ServiceSummary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookArtisan"
          component={BookArtisan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectArtisan"
          component={SelectArtisan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingSuccess"
          component={BookingSuccess}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </DashboardContext.Provider>
  );
};

export default DashboardNavigation;
