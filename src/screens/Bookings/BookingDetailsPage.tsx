import { AntDesign, Entypo, Feather, FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Modal, PermissionsAndroid, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { splitIntoParagraphs } from "../../services/utils";
import { TextBold, TextMedium, TextRegular, TextSemiBold } from "../../component/StyledText";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import userProfilePic from "../../../assets/images/userProfilePic.png"
// import { DashboardContext } from "./DashboardStack";
import { capitalize, getStatusColor } from "../../context/actions/utils";
import ModalCloseJob from "../../component/modals/ModalCloseJob";
import ModalLoading from "../../component/modals/ModalLoading";
import { BookingsContext } from "./BookingsStack";
import * as Calendar from 'expo-calendar';

// Import your existing components and contexts
import { useWebRTCCall } from '../../component/hooks/useWebRTCCall';
import { CallModal } from '../../component/hooks/CallModal';
import { useSocket } from '../../component/SocketContext';

export default function BookingDetailsPage() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const route = useRoute<any>();
    const { details } = route.params;
    const [closeJob, setCloseJob] = useState(false)
    const [rating, setRating] = useState(5); // user-selected rating
    const [narration, setNarration] = useState<string>("")
    const {completeBookingApiCall, getAllBookingsApiCall, isSubmitting, getBookingDetailsApiCall, completeBookingRes, bookingDetailsRes} = useContext<any>(BookingsContext)
    const [bookingDetailsInfo, setBookingDetailsInfo] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [callDuration, setCallDuration] = useState(0);
    const [showCallModal, setShowCallModal] = useState(false);
    const isFocused = useIsFocused();
    const { isConnected } = useSocket();

        const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
          
          if (
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('Permissions denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    
    useEffect(() => {
      requestPermissions();
    }, []);

    // Get current user info - replace with your actual user context
    const currentUserId = 'your-user-id'; // Replace with actual user ID
    const currentUserName = 'Your Name'; // Replace with actual user name

    // WebRTC calling hook
    const {
        callState,
        makeCall,
        answerCall,
        rejectCall,
        endCall,
        toggleMute,
    } = useWebRTCCall({
        userId: bookingDetailsInfo?.requester?.id,
        userName: bookingDetailsInfo?.requester?.firstName,
        onCallEnd: () => {
            setShowCallModal(false);
            setCallDuration(0);
        },
        onIncomingCall: (callerInfo) => {
            setShowCallModal(true);
        },
    });
    // console.log("callSttae: ", callState);
    

    // Call duration timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (callState.isInCall && callState.callConnected) {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            setCallDuration(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [callState.isInCall, callState.callConnected]);

    // Show/hide call modal based on call state
    useEffect(() => {
        if (callState.incomingCall || callState.isInCall) {
            setShowCallModal(true);
        } else if (!callState.incomingCall && !callState.isInCall) {
            setShowCallModal(false);
        }
    }, [callState.incomingCall, callState.isInCall]);

    // Format call duration
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle phone call press
    const handlePhoneCallPress = async () => {
        if (!isConnected) {
            Alert.alert('Connection Error', 'Not connected to server. Please check your internet connection.');
            return;
        }

        if (!bookingDetailsInfo?.artisan?.id) {
            Alert.alert('Error', 'Artisan information not available.');
            return;
        }

        const artisan = bookingDetailsInfo.artisan;
        const artisanName = `${artisan.firstName} ${artisan.lastName}`;

        Alert.alert(
            'Voice Call',
            `Call ${artisanName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Call',
                    onPress: () => {
                        makeCall(artisan.id, artisanName);
                    }
                }
            ]
        );
    };

    // Handle incoming call actions
    const handleAnswerCall = () => {
        answerCall();
    };

    const handleRejectCall = () => {
        rejectCall();
        setShowCallModal(false);
    };

    const handleEndCall = () => {
        endCall();
        setShowCallModal(false);
    };

    useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);
    

const initiate = async () =>{
            await getBookingDetailsApiCall(details?.id)
        }

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const handleSetAppointment = async () => {
  const dateStr = bookingDetailsInfo?.scheduledAt;
  const timeStr = bookingDetailsInfo?.scheduledAt;
  

  // Extract the full combined DateTime
  const combinedDateTime = new Date(dateStr);

  // End time (1 hour after start)
  const endDateTime = new Date(combinedDateTime.getTime() + 1000 * 60 * 60);

  // Get calendar source
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };

  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    timeZone: userTimeZone,
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });

  // Get all calendars and find target Google calendar (if any)
  const calendars = await Calendar.getCalendarsAsync();
  const writableGoogleCalendars = calendars.filter(
    (cal) => cal.allowsModifications && cal.isSynced && cal.accessLevel === "owner"
  );
  const targetCalendarId = writableGoogleCalendars[0]?.id || newCalendarID;

  // 🔍 Check if event already exists in the target calendar
  const existingEvents = await Calendar.getEventsAsync(
    [targetCalendarId],
    new Date(combinedDateTime.getTime() - 5 * 60 * 1000), // 5 mins before
    new Date(endDateTime.getTime() + 5 * 60 * 1000)      // 5 mins after
  );

  const alreadyExists = existingEvents.some(
    (event) =>
      event.title ===
        `Meeting with ${bookingDetailsInfo?.requester?.firstName} ${bookingDetailsInfo?.requester?.lastName}` &&
      new Date(event.startDate).getTime() === combinedDateTime.getTime()
  );

  if (alreadyExists) {
    console.log("⏩ Event already exists, skipping creation.");
    return;
  }

  // ✅ Create event if it doesn't exist
  await Calendar.createEventAsync(targetCalendarId, {
    title: `Meeting with ${bookingDetailsInfo?.requester?.firstName} ${bookingDetailsInfo?.requester?.lastName}`,
    startDate: combinedDateTime,
    endDate: endDateTime,
    alarms: [{ relativeOffset: -30 }],
    timeZone: userTimeZone,
    location: `${bookingDetailsInfo?.location}`,
  });

  console.log("✅ Event created in calendar");
};

useEffect(()=>{
    if(bookingDetailsInfo?.status == "accepted" && bookingDetailsInfo?.artisanStatus != "completed"){
        handleSetAppointment()
    }
}, [bookingDetailsInfo])


    useEffect(()=>{
        initiate()
    },[])

    useEffect(()=>{
         const calling = async () =>{
        initiate()
        await getAllBookingsApiCall()
        }
        calling()
    },[completeBookingRes])

    useEffect(() => {
  if (bookingDetailsRes) {
        setBookingDetailsInfo(bookingDetailsRes)
  }
}, [bookingDetailsRes]);

//     useEffect(() => {
//     if (isFocused) {
//       // Reset when the screen is focused
//       setCompleteBookingRes(null);
//     }
//   }, [isFocused]);

  const handlePress = (index: number) => {
    setRating(index);
  };
    // console.log("details: ", completeBookingRes);
    
    // const {details} = useContext<any>(DashboardContext)
    const handleSubmit = async () => {
        let sentData = {
            artisanId: details?.artisan?.id,
            rating: rating,
            narration: narration,
            type: "artisan",
            clientId: null
        }
        setCloseJob(false)
        await completeBookingApiCall(details?.id, sentData)
        // navigation.navigate('PinCode')
        // navigation.navigate("TabNavigation", {
        //     screen: "DashboardNavigation",
        //     params: {
        //         screen: "BookingSuccess",
        //     },
        // })
    }


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            // keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if you have header/navbar
            >
                {isSubmitting?.bookingDetails ?
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                          {/* <StatusBar backgroundColor="#fff" translucent /> */}
                                          <ActivityIndicator size="small" color="black" />
                                      </View>
                                      :
                <View style={[styles.BodySpacing, { flex: 1 }]}>
                    <View style={{flex: 1}}>
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
                        style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600 }]}
                    >
                        {bookingDetailsInfo?.jobType?.name}
                    </Text>
                    <TextRegular style={{ color: "#696969", fontSize: 16, marginTop: 10, marginBottom: 8 }}>{bookingDetailsInfo?.notes} </TextRegular>
                    <TextRegular style={{color: "#9999A3", fontSize: 14}}>Created on <TextMedium style={{fontSize: 14, color: "black"}}>{moment(bookingDetailsInfo?.createdAt).format("Do MMM, YYYY")}</TextMedium></TextRegular>
                    <View style={{alignItems: "flex-start"}}>
                        <View
                                    style={{
                                      backgroundColor: getStatusColor(bookingDetailsInfo?.status, bookingDetailsInfo?.artisanStatus),
                                      borderRadius: 4,
                                      paddingHorizontal: 9,
                                      paddingVertical: 4,
                                      marginTop: 9,
                                    }}
                                  >
                                    <Text style={{ color: "white", fontSize: 11 }}>
                                      Task {(bookingDetailsInfo?.status == "accepted" && bookingDetailsInfo?.artisanStatus != "pending") ? capitalize(bookingDetailsInfo?.artisanStatus) : capitalize(bookingDetailsInfo?.status)}
                                    </Text>
                                  </View>
                    </View>
                    <View style={styles.locationView}>
                        <Entypo name="location-pin" size={24} color="#979797" />
                        <View style={styles.detailsLocationView}>
                            <TextSemiBold style={styles.mainText}>{bookingDetailsInfo?.location}</TextSemiBold>
                            <TextRegular style={styles.subText}>Lagos, Nigeria</TextRegular>
                        </View>
                    </View>
                    <View style={[styles.locationView, {marginTop: 0, borderTopWidth: 0}]}>
                        <MaterialIcons name="verified-user" size={24} color="#979797" />
                        <View style={styles.detailsLocationView}>
                            <TextSemiBold style={styles.mainText}>Verification Code</TextSemiBold>
                            <TextMedium style={[styles.subText, {color: "black"}]}>{bookingDetailsInfo?.otp}</TextMedium>
                        </View>
                    </View>
                    <View style={[styles.locationView, {marginTop: 0, borderTopWidth: 0}]}>
                        <Fontisto name="date" size={24} color="#979797" />
                        <View style={styles.detailsLocationView}>
                            <TextSemiBold style={styles.mainText}>{moment(bookingDetailsInfo?.scheduledAt).format("dddd, MMMM Do, YYYY")}</TextSemiBold>
                            <TextRegular style={styles.subText}>start from <TextMedium style={{color: "black", fontSize: 16}}>{moment(bookingDetailsInfo?.scheduledAt).format('hh:mm A')}</TextMedium></TextRegular>
                        </View>
                    </View>
                    <Pressable onPress={handleSubmit} style={styles.artisanView}>
                            <Image source={userProfilePic} style={{width: 60, height: 60}} />
                            <View style={{marginLeft: 12}}>
                                <TextSemiBold style={styles.nameTag}>{capitalize(bookingDetailsInfo?.artisan?.firstName)} {capitalize(bookingDetailsInfo?.artisan?.lastName)}</TextSemiBold>
                                <TextRegular style={styles.smallerText}>Joined {moment(bookingDetailsInfo?.artisan?.createdAt).format("MMMM, YYYY")}</TextRegular>
                                <View style={{flexDirection: "row", marginTop: 4}}>
                                    <AntDesign name="star" size={14} color="#FFC61C" />
                                    <AntDesign name="star" size={14} color="#FFFFFF99" />
                                </View>
                            </View>
                        </Pressable>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                            <Pressable 
                                    style={{ 
                                        flexDirection: "row", 
                                        alignItems: "center",
                                        opacity: isConnected ? 1 : 0.5 
                                    }}
                                    onPress={handlePhoneCallPress}
                                    disabled={!isConnected}
                                >
                                    <FontAwesome name="phone" size={24} color="black" />
                                    <Text style={{ marginLeft: 10 }}>
                                        {callState.isInCall ? 'In Call' : 'Voice Call'}
                                    </Text>
                                    {!isConnected && (
                                        <Text style={{ marginLeft: 5, fontSize: 12, color: 'red' }}>
                                            (Offline)
                                        </Text>
                                    )}
                                </Pressable>
                            <Pressable onPress={() =>
              navigation.navigate("TabNavigation", {
                screen: "BookingsNavigation",
                params: {
                  screen: "ChatInterface",
                  params: {
          otherUser: bookingDetailsInfo?.artisan
        }
                },
              })
            } style={{flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                                <TextRegular style={{marginLeft: 10}}>Chat</TextRegular>
                            </Pressable>
                        </View>
                        </View>
                        {(bookingDetailsInfo?.status == "accepted" && bookingDetailsInfo?.artisanStatus != "completed") && <View style={{ width: "100%" }}>
                        <AuthSubmitButton handleSubmit={()=> setCloseJob(true)} marginTOP={38} confirm={true} loading={isSubmitting?.completeBooking} title={"Close Job"} buttonColor="black" loadColor="black" textColor={"white"} />
                    </View>}
                </View>
}
                <ModalCloseJob verify={closeJob} setVerify={setCloseJob} handleSubmit={handleSubmit} firstName={bookingDetailsInfo?.artisan?.firstName} lastName={bookingDetailsInfo?.artisan?.lastName} handlePress={handlePress} rating={rating} setNarration={setNarration} bookingDetails={bookingDetailsInfo} />
                <CallModal
                    visible={showCallModal}
                    isIncoming={callState.incomingCall}
                    isConnected={callState.callConnected}
                    callerName={callState.callerInfo?.name || 'Unknown'}
                    // callerImage={userProfilePic} // Add if you have artisan profile pic
                    onAnswer={handleAnswerCall}
                    onReject={handleRejectCall}
                    onEnd={handleEndCall}
                    onToggleMute={toggleMute}
                    isMuted={callState.isMuted}
                    duration={formatDuration(callDuration)}
                />
                    {/* <ModalLoading verify={isSubmitting?.completeBooking} /> */}
            </KeyboardAvoidingView>
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
        marginTop: 20
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
    dataInputed: {
        flex: 1,
        color: "black",
        fontSize: 15
    },
    artisanView: {
        marginTop: 16,
        backgroundColor: "#E13548",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    nameTag: {
        color: "white",
        fontSize: 13,
    },
    smallerText: {
        fontSize: 10,
        color: "#FFFFFFB2"
    },
    locationView: {
        borderTopWidth: 1,
        borderTopColor: "#D9D9D9B2",
        marginTop: 20,
        borderBottomColor: "#D9D9D9B2",
        borderBottomWidth: 1,
        paddingVertical: 17,
        flexDirection: "row"
    },
    detailsLocationView: {
        marginLeft: 18
    },
    mainText: {
        color: "black",
        fontSize: 16
    },
    subText: {
        color: "#979797",
        fontSize: 16
    }
})