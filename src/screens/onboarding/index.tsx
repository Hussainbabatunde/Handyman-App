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
import { loginPhoneApi, registerApi, resendPhoneOtpApi, submitKycApi, uploadDocument, validatePhoneApi, verifyPhoneApi } from "../../services";
import Password from "./Password";
import ConfirmPassword from "./ConfirmPassword";
import UncompletedGetStarted from "./UncompletedGetStarted";
import ContactAddress from "./ContactAddress";
import CompleteKyc from "./CompleteKyc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GuarantorDetails from "./GuarantorDetails";

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
    register: false,
    login: false,
    uploadingMOI: false
  });
  const [verifyPhoneRes, setVerifyPhoneRes] = useState<verifyPhoneResType | null>(null)
  const [resendPhoneOtpRes, setResendPhoneOtpRes] = useState<any>(null)
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
  const [checked, setChecked] = useState(false)
  const [passportPhotograph, setPassportPhotograph] = useState<string | null>(null)
  const [meansOfIdentification, setMeansOfIdentification] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [guarantorDetails, setGuarantorDetails] = useState({
    guarantorFirstName: "",
    guarantorLastName: "",
    guarantorPhoneNumber: ""
  })
  const [documentUpload, setDocumentUpload] = useState<any>([])
  const [loginRes, setLoginRes] = useState<any>(null)

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
          params: {
            phoneNo: value?.phoneNo
          }
        });
    setIsSubmitting((prev) => ({...prev, verifyPhone: false}));
      })
      .catch((error) => {
    setIsSubmitting((prev) => ({...prev, verifyPhone: false}));
        console.log(error?.response, "error_____");
        errorResponse({ error, dispatch });
      })
      .then(() => 
    setIsSubmitting((prev) => ({...prev, verifyPhone: false})));
  };

  const resendPhoneOtpApiCall = async (value: verifyType) => {
    Keyboard.dismiss();
    // setIsSubmitting((prev) => ({...prev, verifyPhone: true}));
    // setPhoneNumber(value?.phoneNo)
    let sentData = {
      phoneNo: phoneNumber,
      sessionId: verifyPhoneRes?.sessionId
    }
    await resendPhoneOtpApi(sentData)
      .then((response) => response)
      .then(async (data) => {
        // console.log("resend phone otp: ", data);
        setResendPhoneOtpRes(data)
    setIsSubmitting((prev) => ({...prev, verifyPhone: false}));
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
    
    setIsSubmitting((prev) => ({...prev, register: true}));
    
    await registerApi(valueSetupProfile)
      .then((response) => response)
      .then(async (data) => {
        await AsyncStorage.setItem("userToken", data?.accessToken)
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

  const loginApiCall = async (password: string) => {
    Keyboard.dismiss();
    setIsSubmitting((prev) => ({...prev, login: true}));
    let sentData = {
      phoneNumber: phoneNumber,
      password: password
    }
    
    await loginPhoneApi(sentData)
      .then((response) => response)
      .then(async (data) => {
        await AsyncStorage.setItem("userToken", data?.accessToken)
        await AsyncStorage.setItem("from", "login")
        setLoginRes(data)
        setIsSubmitting((prev) => ({...prev, login: false}));
        if(data?.user?.userType == 1){
          await setUserData(dispatch, data?.accessToken, {loggedIn: "true", ...data}, data?.user);
        }
        else if(data?.user?.userType == 2 && data?.user?.completedKyc){
          await setUserData(dispatch, data?.accessToken, {loggedIn: "true", ...data}, data?.user);
        }
        else{
          navigation.navigate("OnboardStackScreen", {
          screen: "UncompletedGetStarted",
        });
        }
        // setVerifyPhoneRes(data)
        // navigation.navigate("OnboardStackScreen", {
        //   screen: "ValidatePhone",
        // });
    //     navigation.navigate("TabBancNavigation", {
    //   screen: "ProfileNavigation",
    //   params: {
    //     screen: "TransactionPin",
    //   },
    // })
      })
      .catch((error) => {
    setIsSubmitting((prev) => ({...prev, login: false}));
        console.log(error?.response, "error_____");
        errorResponse({ error, dispatch });
      })
      .then(() => 
    setIsSubmitting((prev) => ({...prev, login: false})));
  };

  const UploadDocmentApi = async (value: any) => {
      //Keyboard.dismiss();
      let userToken = await AsyncStorage.getItem("userToken");
      setIsSubmitting((prev) => ({...prev, uploadingMOI: true}));
      await uploadDocument(userToken, value).then(response => response)
        .then(async (data) => {
      setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
          // console.log("data res: ", data);
          if (data?.name == 'PassportPhotograph') {
            setPassportPhotograph(data?.url)
          }
          else if (data?.name == 'MeansOfIdentification') {
            setMeansOfIdentification(data?.url)
          }
          setDocumentUpload((prevDocs: any) => {
      // check if document with same name exists
      const exists = prevDocs.find((doc: any) => doc.name === data.name);

      if (exists) {
        // replace it
        return prevDocs.map((doc: any) =>
          doc.name === data?.name ? data : doc
        );
      } else {
        // add new one
        return [...prevDocs, {name: data?.name, document: data?.url}];
      }
    });
          // setUploadedImage(data?.data)
          // setBankInfo(data?.data)
        }).catch(error => {
          // console.log(error?.response?.message, 'error_____')
      setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
          errorResponse({ error, dispatch });
        })
      setIsSubmitting((prev) => ({...prev, uploadingMOI: false}));
    }

    const SubmitKycApiCall = async () => {
    Keyboard.dismiss();
    
    setIsSubmitting((prev) => ({...prev, uploadingMOI: true}));
    let dataSubmitted = {
      documents: [...documentUpload, {name: "address", document: address}, {name: "guarantorFirstName", document: guarantorDetails?.guarantorFirstName}, {name: "guarantorLastName", document: guarantorDetails?.guarantorLastName}, {name: "guarantorPhoneNumber", document: guarantorDetails?.guarantorPhoneNumber}]
    }
    
      let userToken = await AsyncStorage.getItem("userToken");
    await submitKycApi(userToken, dataSubmitted)
      .then((response) => response)
      .then(async (data) => {
        let from = await AsyncStorage.getItem("from")
        if(from == "login"){
          await setUserData(dispatch, loginRes?.accessToken, {loggedIn: "true", ...loginRes}, loginRes?.user);
        }
        else{
          await setUserData(dispatch, registerRes?.accessToken, {loggedIn: "true", ...registerRes}, registerRes?.data);
        }
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
        registerApiCall,
        registerRes,
        loginApiCall,
        resendPhoneOtpApiCall,
        checked, 
        setChecked,
        UploadDocmentApi,
        passportPhotograph,
        meansOfIdentification,
        setAddress,
        address,
        documentUpload,
        SubmitKycApiCall,
        guarantorDetails, 
        setGuarantorDetails
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
          name="UncompletedGetStarted"
          component={UncompletedGetStarted}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <OnboardStack.Screen
          name="ContactAddress"
          component={ContactAddress}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <OnboardStack.Screen
          name="GuarantorDetails"
          component={GuarantorDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <OnboardStack.Screen
          name="CompleteKyc"
          component={CompleteKyc}
          options={{headerShown: false, gestureEnabled: false}}
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
