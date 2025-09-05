import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
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
import StarRating from "../../component/StarRating";
import OtpModal from "../../component/modals/ModalAcceptJobOtp";
import * as Calendar from 'expo-calendar';

export default function BookingDetailsPage() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const route = useRoute<any>();
    const { details } = route.params;
    const [closeJob, setCloseJob] = useState(false)
    const [rating, setRating] = useState(5); // user-selected rating
    const [narration, setNarration] = useState<string>("")
    const {completeBookingApiCall, getAllBookingsApiCall, isSubmitting, getBookingDetailsApiCall, completeBookingRes, bookingDetailsRes, updateBookingDetailsRes, updateBookingDetailsApiCall} = useContext<any>(BookingsContext)
    const [bookingDetailsInfo, setBookingDetailsInfo] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused();
    const [otp, setOtp] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    // console.log("booking detals: ", bookingDetailsInfo);

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
    useEffect(()=>{
        initiate()
    },[])

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
        // setLoading(true)
        // setBookingDetailsInfo(details)
        // setLoading(false)
         const calling = async () =>{
        initiate()
        await getAllBookingsApiCall()
        }
        calling()
    },[completeBookingRes, updateBookingDetailsRes])

    useEffect(() => {
  if (bookingDetailsRes) {
        setBookingDetailsInfo(bookingDetailsRes)
  }
}, [bookingDetailsRes]);

const handleAcceptJob = async () =>{
    let sentData = {
        status: "accepted",
        artisanStatus: "pending"
    }
    
    await updateBookingDetailsApiCall(details?.id, sentData)
        await getAllBookingsApiCall()
}

const handleStartJob = async () =>{

    setShowOtpModal(true)
    
    // await updateBookingDetailsApiCall(details?.id, sentData)
    //     await getAllBookingsApiCall()
}

const handleOtpSubmit = async (code: string) => {
    console.log("Entered OTP:", code);
    // 👉 verify OTP with backend
    setShowOtpModal(false);
    let sentData = {
        status: "accepted",
        artisanStatus: "ongoing",
        otp: code
    }

await new Promise((resolve) => setTimeout(resolve, 1000));
    await updateBookingDetailsApiCall(details?.id, sentData)
        await getAllBookingsApiCall()
  };


  const handlePress = (index: number) => {
    setRating(index);
  };
    // console.log("details: ", completeBookingRes);
    const handleSubmit = async () => {
        let sentData = {
            clientId: details?.requester?.id,
            rating: rating,
            narration: narration,
            type: "client",
            artisanId: null
        }
        setCloseJob(false)
        await completeBookingApiCall(details?.id, sentData)
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
                        <Entypo name="location-pin" size={24} color="#979797" />
                        <View style={styles.detailsLocationView}>
                            <TextSemiBold style={styles.mainText}>{moment(bookingDetailsInfo?.scheduledAt).format("dddd, MMMM Do, YYYY")}</TextSemiBold>
                            <TextRegular style={styles.subText}>start from <TextMedium style={{color: "black", fontSize: 16}}>{moment(bookingDetailsInfo?.scheduledAt).format('hh:mm A')}</TextMedium></TextRegular>
                        </View>
                    </View>
                    <Pressable onPress={handleSubmit} style={styles.artisanView}>
                            <Image source={userProfilePic} style={{width: 60, height: 60}} />
                            <View style={{marginLeft: 12}}>
                                <TextSemiBold style={styles.nameTag}>{capitalize(bookingDetailsInfo?.requester?.firstName)} {capitalize(bookingDetailsInfo?.requester?.lastName)}</TextSemiBold>
                                <TextRegular style={styles.smallerText}>Joined {moment(bookingDetailsInfo?.requester?.createdAt).format("MMMM, YYYY")}</TextRegular>
                                <StarRating rating={bookingDetailsInfo?.requester?.stars} />
                            </View>
                        </Pressable>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                            <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                                <FontAwesome name="phone" size={24} color="black" />
                                <TextRegular style={{marginLeft: 10}}>Phone call</TextRegular>
                            </Pressable>
                            <Pressable onPress={() =>
              navigation.navigate("ArtisanTabNavigation", {
                screen: "BookingsNavigation",
                params: {
                  screen: "ChatInterface",
                  params: {
          otherUser: bookingDetailsInfo?.requester
        }
                },
              })
            } style={{flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                                <TextRegular style={{marginLeft: 10}}>Chat</TextRegular>
                            </Pressable>
                        </View>
                        </View>
                        {(bookingDetailsInfo?.status == "pending" && bookingDetailsInfo?.artisanStatus != "completed") ? 
                        <View style={{ width: "100%" }}>
                        <AuthSubmitButton handleSubmit={handleAcceptJob} marginTOP={38} confirm={true} loading={isSubmitting?.completeBooking} title={"Accept Job"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                    </View>
                    :
                    (bookingDetailsInfo?.status == "accepted" && bookingDetailsInfo?.artisanStatus == "pending") ?
                    <View style={{ width: "100%" }}>
                        <AuthSubmitButton handleSubmit={handleStartJob} marginTOP={38} confirm={true} loading={isSubmitting?.completeBooking} title={"Start Job"} buttonColor="#8C8C8C" loadColor="black" textColor={"white"} />
                    </View>
                    :
                    (bookingDetailsInfo?.status == "accepted" && bookingDetailsInfo?.artisanStatus == "ongoing") ?
                    <View style={{ width: "100%" }}>
                        <AuthSubmitButton handleSubmit={()=> setCloseJob(true)} marginTOP={38} confirm={true} loading={isSubmitting?.completeBooking} title={"Completed Job"} buttonColor="#8C8C8C" loadColor="black" textColor={"white"} />
                    </View>
                    :
                    <View></View>
                    }
                    {(bookingDetailsInfo?.status == "pending" && bookingDetailsInfo?.artisanStatus != "completed") ?<TextRegular style={{color: "#67677A", fontSize: 13, marginTop: 10}}>This means you are at the location of the job and you are about starting</TextRegular>
                    :
                                        (bookingDetailsInfo?.status == "accepted" && bookingDetailsInfo?.artisanStatus == "ongoing") ?
                    <TextRegular style={{color: "#67677A", fontSize: 13, marginTop: 10}}>This means you are at the location of the job and you are about starting</TextRegular>
                    : 
                    <View></View>
                    }
                </View>
}
                <ModalCloseJob verify={closeJob} setVerify={setCloseJob} handleSubmit={handleSubmit} firstName={bookingDetailsInfo?.requester?.firstName} lastName={bookingDetailsInfo?.requester?.lastName} handlePress={handlePress} rating={rating} setNarration={setNarration} bookingDetails={bookingDetailsInfo} />
                <OtpModal
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSubmit={handleOtpSubmit}
        otp={otp}
        setOtp={setOtp}
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
        backgroundColor: "black",
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