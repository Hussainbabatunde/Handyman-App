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

const Stack = createStackNavigator();

export const BookingsContext = createContext<PropsAppContext>({});

const BookingsNavigation = ({navigation, route}: any) => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const { identifier, dispatch, errorResponse, userData, firstLogin, logOutUser, setApplicationId, setEnvironment } = useContext<any>(AppContext);
  const [isSubmitting, setIsSubmitting] = useState({
    userProfile: false,
    kycAccess: false,
    fundWallet: false,
    confirmFundWallet: false,
    createTransactionPin: false
  })

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const shouldShowTabBar = !routeName || routeName === 'Bookings';
  
    navigation.setOptions({
      tabBarStyle: shouldShowTabBar ? { display: 'flex' } : { display: 'none' },
    });
  }, [navigation, route]);




  return (
    <BookingsContext.Provider
      value={{

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
      </Stack.Navigator>
    </BookingsContext.Provider>
  );
};

export default BookingsNavigation;
