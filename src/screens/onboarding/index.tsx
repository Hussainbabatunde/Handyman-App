import { Keyboard, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { createContext, useState } from "react";
import { headerPlain } from "../../navigation/headerConfig";
import TabNavigation from "../../navigation/TabNavigation";
import Constants from 'expo-constants';
import AppContext from "../../context";
import SuccessPage from "./SuccessPage";
import PinCode from "./PinCodeLogin";
import ValidatePhone from "./ValidateNumber";
import VerifyPhone from "./VerifyPhone";
import GetStarted from "./GetStarted";
import Signup from "./Signup";
import SignupSuccess from "./SignupSuccess";

export const OnboardContext = createContext<PropsAppContext>({});
const OnboardStack = createStackNavigator();

export default function OnboardStackScreen() {
  const {
    dispatch,
    errorResponse,
    identifier,
    setUserData,
    setIdentifier,
    formatPhoneCode
  } = React.useContext(AppContext);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const [isSubmitting, setIsSubmitting] = React.useState<Boolean>(false);
  const [values, setValues] = React.useState<any>({
    phone_number: null,
    dial_code: null,
    sessionId: null,
  });

const API_URL = Constants.expoConfig?.extra?.eas?.API_URL


  return (
    <OnboardContext.Provider
      value={{
        values,
        setValues,
        isSubmitting
      }}
    >
      <OnboardStack.Navigator
        screenOptions={{
          //...headerPlain,
          headerShown: false,
        }}
      >
        {identifier ? (
          <OnboardStack.Group>
            <OnboardStack.Screen name="PinCode" component={PinCode} />
          </OnboardStack.Group>
        ) : (
          <OnboardStack.Group>
            {/* <OnboardStack.Screen name="ScreenLanding" component={Home} /> */}
        <OnboardStack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{headerShown: false}}
        />
            <OnboardStack.Screen
          name="SuccessPage"
          component={SuccessPage}
          options={{headerShown: false}}
        />
        <OnboardStack.Screen
          name="PinCode"
          component={PinCode}
          options={{headerShown: false}}
        />
        <OnboardStack.Screen
          name="ValidatePhone"
          component={ValidatePhone}
          options={{headerShown: false}}
        />
        <OnboardStack.Screen
          name="VerifyPhone"
          component={VerifyPhone}
          options={{headerShown: false}}
        />
        <OnboardStack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <OnboardStack.Screen
          name="SignupSuccess"
          component={SignupSuccess}
          options={{headerShown: false}}
        />
            <OnboardStack.Screen
              name="TabNavigation"
              component={TabNavigation}
            />
          </OnboardStack.Group>
        )}
      </OnboardStack.Navigator>
    </OnboardContext.Provider>
  );
}
