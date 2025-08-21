import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useRef, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import HiddenTextInput from "../../component/HiddenTextInput";
import { OnboardContext } from ".";
import ModalLoading from "../../component/modals/ModalLoading";

export default function ValidatePhone () {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [code, setCode] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const textInputRef = useRef<TextInput | null>(null);
    const [pinReady, setPinReady] = useState(false)
    const [confirm, setConfirm] = useState(false)
    // const [minutes, setMinutes] = useState(1);
    // const [seconds, setSeconds] = useState(30);
    const [loading, setLoading] = useState(false)
    // const {valuesSignup, ValidatePhoneApiCall, VerifyPhoneNumberApiCall, isSubmittingVerify} = useContext(OnboardBancContext)
    const [timeLeft, setTimeLeft] = useState(90); // total time in seconds
  const endTimeRef = useRef(Date.now() + 90 * 1000); // target time in ms
  const {verifyPhoneRes, phoneNumber, validatePhoneApiCall, isSubmitting} = useContext(OnboardContext)
//   console.log("valuesSignup ", verifyPhoneRes);
  

    const handleOnPress= () =>{
        setInputFocused(true);
        textInputRef?.current?.focus();
    }
    const MAX_CODE_LENGTH = 4;
    const handleOnBlur= () =>{
        setInputFocused(false)
    }

    useEffect(()=>{
        setPinReady(code.length === MAX_CODE_LENGTH);
        return ()=> setPinReady(false)
    }, [code])

    useEffect(()=>{
        const initiate = async () =>{
        if(code?.length == MAX_CODE_LENGTH){
            // navigation.navigate('Signup')
            let sentData = {
                otp: code,
                phoneNo: phoneNumber,
                sessionId: verifyPhoneRes?.sessionId
            }
            await validatePhoneApiCall(sentData)
        }
    }
    initiate()
    },[code])


    const codeDigitsArray = new Array(MAX_CODE_LENGTH).fill(0)

    const toCodeDigitInput = (value: number, index: number) =>{
        const exptyInputChar = '0';
        // const digit = code[index] ? "*" : exptyInputChar
        const digit = code[index] ? code[index] : exptyInputChar

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === MAX_CODE_LENGTH - 1;
        const isCodeFull = code.length === MAX_CODE_LENGTH ;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

        const StyledOTPInput = inputFocused && isDigitFocused ? styles.OTPInputFocused : styles.OTPInput

        return (
            <View key={index} style={StyledOTPInput}>
                <Text style={[styles.OTPInputText, !code[index] && styles.placeholderText]}>{digit}</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.BodySpacing}>
             <View style={{ flexDirection: "row", alignItems: "center", marginTop: StatusBar.currentHeight }}>
                    <Pressable
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Back button"
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <MaterialIcons name="arrow-back" size={22} color="#FA4E61" />
                    </Pressable>
                </View>
                    <Text
                        style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600}]}
                    >
                        Validate phone number
                    </Text>
                    <Text style={styles.descText}>Enter the 4-digit code sent to you at <Text style={[styles.descText, {fontWeight: 600}]}>08023******43</Text></Text>
                        <View style={styles.OTPInputSection}>
        <Pressable style={styles.InputContainer} onPress={handleOnPress} >
            {/* <View style={styles.OTPInput}>
                <Text style={styles.OTPInputText}>try</Text>
            </View> */}
            {codeDigitsArray.map(toCodeDigitInput)}
        </Pressable>
            <HiddenTextInput setPinReady={setPinReady} 
            code={code} 
            setCode={setCode} 
            maxLength={MAX_CODE_LENGTH} 
            textInputRef={textInputRef}
            handleOnBlur={handleOnBlur} />
        </View>

        <Pressable style={styles.bgTimer}>
            <Text style={styles.countDownText}>I haven’t received a code (0:09)</Text>
        </Pressable>
                    </ScrollView>
                    <ModalLoading verify={isSubmitting?.validatePhone} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    nameIdentifier: {
        color: "#101011",
        fontSize: 20,
        marginTop: 32,
    },
    backButton: {
        backgroundColor: "#DFE2E880",
        padding: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center"
    },
    BodySpacing: {
        paddingHorizontal: 25
    },
    descText: {
        color: "#696969",
        fontSize: 16,
        marginTop: 11
    },
    labelText: {
        color: "#474747",
        fontSize: 14,
        fontWeight: 500,
        marginTop: 31
    },
    inputBody: {
        borderWidth: 1,
        borderColor: "#DADADA",
        backgroundColor: "#FBFBFB",
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderRadius: 5,
        marginTop: 3
    },
    checkboxView: {
        flexDirection: "row",
        marginTop: 17
    },
    checkboxText: {
        color: "#1E1E1E",
        fontSize: 16,
        marginLeft: 12
    },
    OTPInputSection:{
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10
    },
    InputContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10
    },
    OTPInputFocused:{
        // borderColor:'gray',
        minWidth: 73, 
        borderWidth: 2,
        padding: 6,
        // borderColor: "#4FE75E",
        backgroundColor:'white',
        borderColor: "#FA4E61",
        // marginLeft: 10,
        marginTop: 30
    },
    OTPInput:{
        // borderColor:'gray',
        backgroundColor:'white',
        borderColor: "#DFE2E8",
        minWidth: 73, 
        borderWidth: 1,
        borderRadius: 5,
        padding: 6,
        // marginLeft: 10,
        marginTop: 30
    },
    OTPInputText:{
        fontSize: 40,
        fontWeight:'bold',
        textAlign: 'center',
        color: 'black'
    },
    otpContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: "center"
      },
      otpTextGray: {
        color: '#667085',
        fontSize: 12
      },
      signupView: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 36
      },
      placeholderText: {
        color: '#D3D3D3', // Light gray color
        opacity: 0.5, // Even lighter effect
    },
    bgTimer: {
        backgroundColor: "#F8F9FA",
        paddingVertical: 13,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25
    },
    countDownText: {
        color: "#3F3F3F",
        fontWeight: 500
    }
})