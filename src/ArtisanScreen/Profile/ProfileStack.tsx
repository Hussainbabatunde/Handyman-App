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
import AppContext from '../../context';
import Profile from './Profile';
import ProfileUpdateForm from './ProfileUpdate';
import { updateProfileDetailsApi, uploadDocument } from '../../services';
import { commonActions } from '../../context/actions';

const Stack = createStackNavigator();

export const ProfileContext = createContext<PropsAppContext>({});

const ProfileNavigation = ({navigation, route}: any) => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const { identifier, dispatch, errorResponse, userData, firstLogin, logOutUser, setApplicationId, setEnvironment } = useContext<any>(AppContext);
  const [isSubmitting, setIsSubmitting] = useState({
    allBookings: false,
    completeBooking: false,
    bookingDetails: false,
    uploadingMOI: false,
  })
  const [uploadedImage, setUploadedImage] = useState("")
  const [updatedProfile, setUpdatedProfile] = useState<any>(null)
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const shouldShowTabBar = !routeName || routeName === 'Profile';
  
    navigation.setOptions({
      tabBarStyle: shouldShowTabBar ? { display: 'flex' } : { display: 'none' },
    });
  }, [navigation, route]);

  const UploadDocmentApi = async (value: any) => {
      //Keyboard.dismiss();
      let userToken = await AsyncStorage.getItem("userToken");
      setIsSubmitting((prev) => ({...prev, uploadingMOI: true}));
      await uploadDocument(userToken, value)
      .then(response => response)
        .then(async (data) => {
      setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
          // console.log("data res: ", data?.url);
          setUploadedImage(data?.url)
          // setBankInfo(data?.data)
        }).catch(error => {
          // console.log(error?.response?.message, 'error_____')
      setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
          errorResponse({ error, dispatch });
        })
      setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
    }

    const updateProfileApiCall = async (values: object) => {
    Keyboard.dismiss();
    
    setIsSubmitting((prev) => ({...prev, uploadingMOI: true}));
    
      let userToken = await AsyncStorage.getItem("userToken");
    await updateProfileDetailsApi(userToken, userData?.user?.id, values)
      .then((response) => response)
      .then(async (data) => {
        console.log("data: ", data);
        
        setUpdatedProfile(data)
    setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));

                commonActions.notify('success', "Processing", "Profile update processing.");
      })
      .catch((error) => {
    setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
        console.log(error?.response, "error_____");
        errorResponse({ error, dispatch });
      })
      .then(() => 
    setIsSubmitting((prev) => ({...prev, uploadingMOI: false})));
  };


  return (
    <ProfileContext.Provider
      value={{
        isSubmitting,
        UploadDocmentApi,
        uploadedImage,
        updateProfileApiCall
      }}>
      <Stack.Navigator screenOptions={{
    headerShown: false,
    animation: 'slide_from_right', // Use specific animation types
    // animationDuration: 300,
  }}>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ProfileUpdateForm"
          component={ProfileUpdateForm}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </ProfileContext.Provider>
  );
};

export default ProfileNavigation;
