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
import { createUserType, RegisterResponse, validatePhoneResponse, validateType, verifyPhoneResType, verifyType } from "../../services/ApiTypes";
import { registerApi, validatePhoneApi, verifyPhoneApi } from "../../services";
import Password from "./Password";
import ConfirmPassword from "./ConfirmPassword";

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
  const [isSubmitting, setIsSubmitting] = React.useState({
    verifyPhone: false,
    validatePhone: false,
    signup: false,
    register: false
  });
  const [verifyPhoneRes, setVerifyPhoneRes] = useState<verifyPhoneResType | null>(null)
  const [validatePhoneRes, setValidatePhoneRes] = useState<validatePhoneResponse | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [valueSetupProfile, setValueSetupProfile] = useState<createUserType>(
    {
      firstName: "",
      lastName: "",
      email: "",
      userType: 1,
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  );
  const [registerRes, setRegisterRes] = useState<RegisterResponse | null>(null)

const verifyPhoneApiCall = async (value: verifyType) => {
    Keyboard.dismiss();
    setIsSubmitting((prev) => ({...prev, verifyPhone: true}));
    setPhoneNumber(value?.phoneNo)
    
    await verifyPhoneApi(value)
      .then((response) => response)
      .then(async (data) => {
        console.log("verify phone: ", data);
        setVerifyPhoneRes(data)
        navigation.navigate("OnboardStackScreen", {
          screen: "ValidatePhone",
        });
    setIsSubmitting((prev) => ({...prev, verifyPhone: false}));
    //     navigation.navigate("TabBancNavigation", {
    //   screen: "ProfileNavigation",
    //   params: {
    //     screen: "TransactionPin",
    //   },
    // })
      })
      .catch((error) => {
    setIsSubmitting((prev) => ({...prev, verifyPhone: false}));
        console.log(error?.response, "error_____");
        errorResponse({ error, dispatch });
      })
      .then(() => 
    setIsSubmitting((prev) => ({...prev, verifyPhone: false})));
  };

  const validatePhoneApiCall = async (value: validateType) => {
    Keyboard.dismiss();
    setIsSubmitting((prev) => ({...prev, validatePhone: true}));
    
    await validatePhoneApi(value)
      .then((response) => response)
      .then(async (data) => {
        // console.log("validate phone: ", data);
        setValidatePhoneRes(data)
    setIsSubmitting((prev) => ({...prev, validatePhone: false}));
        if(data?.status){
        navigation.navigate("OnboardStackScreen", {
          screen: "PinCode",
        });
        }
        else{
          navigation.navigate("OnboardStackScreen", {
          screen: "Signup",
        });
        }

      })
      .catch((error) => {
    setIsSubmitting((prev) => ({...prev, validatePhone: false}));
        console.log(error?.response, "error_____");
        errorResponse({ error, dispatch });
      })
      .then(() => 
    setIsSubmitting((prev) => ({...prev, validatePhone: false})));
  };

  const registerApiCall = async () => {
    Keyboard.dismiss();
    
    console.log("values profile: ", valueSetupProfile);
    setIsSubmitting((prev) => ({...prev, register: true}));
    
    await registerApi(valueSetupProfile)
      .then((response) => response)
      .then(async (data) => {
        console.log("register: ", data);
        setRegisterRes(data)
    setIsSubmitting((prev) => ({...prev, register: false}));
        navigation.navigate("OnboardStackScreen", {
          screen: "SignupSuccess",
        });

      })
      .catch((error) => {
    setIsSubmitting((prev) => ({...prev, register: false}));
        console.log(error?.response, "error_____");
        errorResponse({ error, dispatch });
      })
      .then(() => 
    setIsSubmitting((prev) => ({...prev, register: false})));
  };

  return (
    <OnboardContext.Provider
      value={{
        isSubmitting,
        verifyPhoneApiCall,
        verifyPhoneRes, 
        setVerifyPhoneRes,
        validatePhoneApiCall,
        validatePhoneRes, 
        setValidatePhoneRes,
        phoneNumber,
        valueSetupProfile, 
        setValueSetupProfile,
        registerApiCall
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
          name="Password"
          component={Password}
          options={{headerShown: false}}
        />
        <OnboardStack.Screen
          name="ConfirmPassword"
          component={ConfirmPassword}
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
