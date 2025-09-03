import { ActivityIndicator, Dimensions, FlatList, Image, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { TextBold, TextMedium, TextRegular } from '../../components/StyledText'
import { BackLogin } from '../../component/SvgFiles'
import { OnboardContext } from '.'
import { TextMedium } from '../../component/StyledText'
import ModalLoading from '../../component/modals/ModalLoading'
import AuthSubmitButton from '../../component/SubmitActionButton'

const { width } = Dimensions.get('window')

const dialpad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'biometrics', '0', 'del']

const dialPadSize = width / 2

const pinsize = 6;

type DialPadProps = {
  onPress: (item: typeof dialpad[number]) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

function DialPad({ onPress, showPassword, setShowPassword }: DialPadProps) {
  
  return <FlatList
    numColumns={3}
    data={dialpad}
    style={{ flexGrow: 0 }}
    scrollEnabled={false}
    columnWrapperStyle={{ gap: 20 }}
    contentContainerStyle={{ gap: 20 }}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item }) => {
      return <TouchableOpacity
        onPress={() => {
          onPress(item)
        }}>
        {item == 'biometrics' ?

          <Pressable onPress={()=> setShowPassword(!showPassword)} style={styles.fingerPrint}>
            {/* <MaterialIcons name="fingerprint" size={43} color="#0075C9" /> */}
                        {showPassword?<Ionicons name="eye-outline" size={30} color="black" /> : <Ionicons name="eye-off-outline" size={30} color="black" />}
          </Pressable>
          :
          item == 'del' ?

            <View style={styles.deletePin}>
              {/* <MaterialIcons name="cancel-presentation" size={43} color="black" /> */}
              <BackLogin />
            </View>
            :
            <View style={{ backgroundColor: 'white', width: 56, height: 56, borderRadius: dialPadSize, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.dialText}>{item}</Text>
            </View>}
      </TouchableOpacity>
    }} />
}

const ConfirmPassword = () => {

  const [code, setCode] = useState<number[]>([])
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [confirm, setConfirm] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const { valueSetupProfile, setValueSetupProfile, isSubmitting, registerApiCall, phoneNumber } =
          useContext(OnboardContext);
    const [showPassword, setShowPassword] = useState(false)
          // console.log("values profile: ", phoneNumber);
          
          

  useEffect(() => {
  let timer: NodeJS.Timeout;

  if (code.length === 6) {
    setConfirm(true);
    let passwordString = code.join('');
      setValueSetupProfile((prevState: any) => ({
            ...prevState,
            "confirmPassword": passwordString, "phoneNumber": phoneNumber
        }));
  } else {
    setConfirm(false);
  }
}, [code]);


  const handleSubmit = async () => {
    let passwordString = code.join('');
    await registerApiCall()
  };

  const handleSwitchUser = async ()=>{
    await AsyncStorage.removeItem('phone_number')
  }

  const handleForgotPassword = () =>{
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 21 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: StatusBar.currentHeight }}>
                            <Pressable
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityLabel="Back button"
                                onPress={() => navigation.goBack()}
                                style={styles.backButton}
                            >
                                <MaterialIcons name="arrow-back" size={22} color="#003585" />
                            </Pressable>
                        </View>
                            <Text
                                style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600}]}
                            >
                                Verify PIN
                            </Text>
                            <Text style={styles.descText}>Verify 6-digits login pin</Text>

        <View style={styles.textContainer}>
        </View>

        <View style={styles.pinContainer}>
          {showPassword ? 
                    <View style={{ flexDirection: "row", gap: 10 }}>
                {[...Array(pinsize).keys()].map((i) => {
                  const digit = code[i]; // get the digit at index i
        console.log("digit: ", digit);
                  return (
                    <TextMedium
                      key={i.toString()}
                      style={{
                        fontSize: 20,
                        marginBottom: 10,
                        color: digit ? "#E13548" : "#D3D3D3",
                      }}
                    >
                      {digit ? digit : "*"}
                    </TextMedium>
                  );
                })}
              </View>
                    :
                    <View
                      style={{ flexDirection: 'row', gap: 10 }}>
                      {[...Array(pinsize).keys()].map((i) => {
                        const isSelected = i < code.length; // Check if the index is less than the code length
          
                        return (
                          <View
                            key={i.toString()}
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 50,
                              borderWidth: isSelected ? 0 : 1,
                              borderColor: 'black',
                              marginBottom: 10,
                              backgroundColor: isSelected ? '#E13548' : 'white',
                            }}
                          />
                        );
                      })}
                    </View>}
          <Pressable onPress={() => setForgotPassword(!forgotPassword)}>
            {/* <TextRegular style={styles.forgotPinText}>Forgot your PIN?</TextRegular> */}
          </Pressable>
        </View>


        <View style={styles.dialPadContainer}>

          <DialPad onPress={(item) => {
            const typedCode = Number(item)
            if (item == 'del') {
              setCode(prevCode => prevCode.slice(0, prevCode.length - 1))
            }
            else if (typeof typedCode == 'number') {
              if (code.length == pinsize) return
              setCode(prevCode => [...prevCode, typedCode])
            }
          }} showPassword={showPassword} setShowPassword={setShowPassword}  />

          {code?.length == 6 &&<View style={{ width: "100%" }}>
                    <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Submit"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                </View>}
          {/* {confirm && <ActivityIndicator color='#0075C9' size='large' />} */}
          <ModalLoading verify={isSubmitting?.register} />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default ConfirmPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS == 'ios' ? 25 : 0
  },
  header: {
    padding: 15,
    flexDirection: 'row'
  },
  imgHeader: {
    flex: 1,
    marginHorizontal: '15%'
  },
  logoImg: {
    width: 165,
    height: 22
  },
  textContainer: {
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerTextContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  textTitle: {
    color: 'black',
    fontSize: 20
  },
  textTitle2: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20
  },
  textSubTitle: {
    color: '#667085'
  },
  pinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  forgotPinText: {
    color: '#0075C9',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14
  },
  dialPadContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#f6f6f6',
    // marginTop: 30,
    paddingHorizontal: 15
  },
  fingerPrint: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deletePin: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialText: {
    fontSize: 18,
    color: 'black'
  },
  nameIdentifier: {
        color: "#101011",
        fontSize: 20,
        marginTop: 32,
    },
    backButton: {
        backgroundColor: "#DFE2E8",
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
})