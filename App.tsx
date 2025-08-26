/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  Alert,
  NativeEventSubscription,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
// Only import react-native-gesture-handler on native platforms
import "react-native-gesture-handler";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { AppReducer, initialState } from "./src/context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorBoundary from "react-native-error-boundary";
import {
  commonActions,
  errorResponseActions,
  authActions,
} from "./src/context/actions";

import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsAppStack, PropsErrorBoundary } from "./src/@types";
import { TextBold } from "./src/component/StyledText";
import FlashMessage from "react-native-flash-message";
import AppContext from "./src/context";
import { navigationRef } from "./src/navigation/RootNavigation";
// import TabNavigation from "./src/navigation/TabNavigation";
import OnboardStackScreen from "./src/screens/onboarding";
import TabNavigation from "./src/navigation/TabNavigation";
import { getJobTypesApi } from "./src/services";
import ArtisanTabNavigation from "./src/navigation/ArtisanTabNavigation";

SplashScreen.preventAutoHideAsync();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [state, dispatch] = React.useReducer(AppReducer, initialState);
  const [appStateSubscription, setAppStateSubscription] =
    useState<NativeEventSubscription | null>(null);
    const [jobTypes, setJobTypes] = useState([])

  let token: any;

  useEffect(() => {
    async function initApp() {
      //init customer data
      let userData, userToken, userTokenExp, identifier, identifierName;
      try {
        // Pre-load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "Font-Thin": require("./assets/fonts/IBMPlexSans-Thin.ttf"),
          "Font-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
          "Font-Medium": require("./assets/fonts/IBMPlexSans-Medium.ttf"),
          "Font-SemiBold": require("./assets/fonts/IBMPlexSans-SemiBold.ttf"),
          "Font-Bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
        })
        await getJobTypesApi().then((res) => {
          // console.log("job types: ", res?.data);
            setJobTypes(res?.data)
            
          }).catch(console.log),

        //pre load images
        // const images = [
        //   require("./src/assets/images/logo3.png"),
        //   require("./src/assets/images/firstHomeImg.png"),
        //   require("./src/assets/images/secondHome.png"),
        //   require("./src/assets/images/thirdHome.png"),
        //   require("./src/assets/images/childHome.png"),
        //   require("./src/assets/images/womanHome.png"),
        //   require('./src/assets/images/paystack.png'),
        //   require('./src/assets/images/flutterWave.png'),
        // ];

        // const chImages = images.map(image => {
        //   if (typeof image === 'string') {
        //     return Image.prefetch(image);
        //   } else {
        //     return Asset.fromModule(image).downloadAsync();
        //   }
        // });

        // await Promise.all(chImages);


        //get all customer data stored when the app is reopened
        userToken = await AsyncStorage.getItem('userToken') || null;
        userTokenExp = await AsyncStorage.getItem('userTokenExp') || null;
        userData = JSON.parse(await AsyncStorage.getItem('userData') || '{}');
        identifier = (await AsyncStorage.getItem("identifier")) || "";
        identifierName = (await AsyncStorage.getItem("identifierName")) || null;
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch({
          type: "SET_APP_DATA",
          userToken,
          userData,
          userTokenExp,
          identifier,
          identifierName,
        });
      }
    }

    initApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (state.appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [state.appIsReady]);

  if (!state.appIsReady) {
    return null as any;
  }


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const CustomFallback = ({ error, resetError }: PropsErrorBoundary) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
          flex: 1,
        }}
      >
        <TextBold>Something happened!</TextBold>
        <TextBold>{error.toString()}</TextBold>
        <TextBold>Try Again</TextBold>
      </View>
    );
  };

  function HomeScreen() {
    // useEffect(()=>{
    //   const init = async () =>{
    //     await AsyncStorage.clear()
    //   }
    //   init()
    // }, [])
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  const AppStack = ({ state, dispatch }: PropsAppStack) => {
    const [policyNumber, setPolicyNumber] = useState<string | null>("");
    const [policyInfo, setPolicyInfo] = useState<any>({
      policyDesc: "",
      policyStatus: "",
    });
    const [globalActive, setGlobalActive] = useState<any>(null);
    const [phoneToken, setPhoneToken] = useState<any>(null);
    const [showAdvert, setShowAdvert] = useState<boolean>(false);


    const requestUserPermission = async () => {
      // const authStatus = await messaging().requestPermission();
      // if (Platform.OS == 'android'){
      //   const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      // }
      // const enabled =
      //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      // if (enabled) {
      //   token = (await messaging().getToken()).toString();
      //   // console.log(token, 'in it token_____')
      //   // SendTokenApiCall(token)
      //   await setPhoneToken(token)
      // } else {
      //   // console.log('REQUEST PERMISSION DENIED');
      // }
    };
  
    const getNewFCMToken = async () => {
      try {
        await requestUserPermission();
        // console.log('Token:', token);
  
      } catch (error) {
        console.error('Error getting new FCM token:', error);
      }
    };

    // console.log("state user ", state);
    
  
    // useEffect(() => {
    //   getNewFCMToken();
    //   const unsubscribe = messaging().onMessage(async remoteMessage => {

        
    //     //  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     // Alert.alert(`${remoteMessage?.notification?.title}`, `${remoteMessage?.notification?.body}`);
    // //       // Request permissions (required for iOS)
    //       // console.log(remoteMessage);
          
    //       const channelId = await notifee.createChannel({
    //         id: "default",
    //         name: "Default Channel",
    //         sound: 'default',
    //         importance: AndroidImportance.HIGH
    //       });
    //       // Required for iOS
    //       // See https://notifee.app/react-native/docs/ios/permissions
    //       await notifee.requestPermission();
    //       await notifee.displayNotification({
    //         id: "1234",
    //         title: `${remoteMessage?.notification?.title}`,
    //         body: `${remoteMessage?.notification?.body}`,
    //         android: {
    //           channelId,
    //           color: "#6495ed",
    //           timestamp: Date.now() - 800, // 8 minutes ago
    //           showTimestamp: true,
    //         },
    //       });
          
    //       async function onMessageReceived(remoteMessage: any) {
    //         // Do something
    //         await notifee.displayNotification({
    //           id: "1234",
    //           title: `${remoteMessage?.notification?.title}`,
    //           body: `${remoteMessage?.notification?.body}`,
    //           android: {
    //             channelId,
    //             color: "#6495ed",
    //             timestamp: Date.now() - 800, // 8 minutes ago
    //             showTimestamp: true,
    //           },
    //         });
    //       }
    //       messaging().onMessage(onMessageReceived);
    //       messaging().setBackgroundMessageHandler(onMessageReceived);
          
    //   });
    //   return unsubscribe;
    // },[])
    // console.log("state.userData: ", state?.userData);
    

    return (
      <AppContext.Provider
        value={{
          dispatch,
          ...state,
          ...commonActions,
          ...errorResponseActions,
          ...authActions,
          policyInfo,
          setPolicyInfo,
          setPolicyNumber,
          policyNumber,
          globalActive,
          setGlobalActive,
          phoneToken,
          setPhoneToken,
          jobTypes
        }}
      >
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            {/* {state.userToken ? ( */}
            {(state.userData?.user?.userType == 1) ? (
              <Stack.Screen
                name="TabNavigation"
                component={TabNavigation}
                options={{ headerShown: false }}
              />
            ) 
            :
            (state.userData?.user?.userType == 2) ? (
              <Stack.Screen
                name="ArtisanTabNavigation"
                component={ArtisanTabNavigation}
                options={{ headerShown: false }}
              />
            )
            :
             (
              <Stack.Screen
                name="OnboardStackScreen"
                options={{ headerShown: false }}
                component={OnboardStackScreen}
              />
             )} 
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  };

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
          //barStyle={state.statusBarstyle}
          //showHideTransition={statusBarTransition}
          hidden={false}
          style="dark"
        /> */}
        <FlashMessage position="bottom" />
        <AppStack state={state} dispatch={dispatch} />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
