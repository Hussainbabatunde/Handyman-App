import React, { useContext } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SanlamLogo from "../../../assets/images/sanlamLogo.png"
import WomanWalking from "../../../assets/images/bookingSuccessImg.png"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextMedium, TextRegular, TextSemiBold } from "../../component/StyledText";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AppContext from "../../context";
import { AntDesign } from "@expo/vector-icons";
import userProfilePic from "../../../assets/images/userProfilePic.png"
import { DashboardContext } from "./DashboardStack";
import moment from "moment";
import { capitalize } from "../../context/actions/utils";
import StarRating from "../../component/StarRating";

export default function BookingSuccess() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { countries, dispatch, userData, setUserData, setLogOutUser } = useContext<any>(AppContext);

            const {createBookingRes} = useContext<any>(DashboardContext)
            // console.log("createBookingRes: ", createBookingRes?.data?.booking?.artisan);
            

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: "white" }]}>
            <SafeAreaView style={[styles.container, { marginHorizontal: 21 }]}>
                {/* <Image source={SanlamLogo} style={styles.logoImg} /> */}
                <View style={styles.GetStartedContent}>
                    <Image source={WomanWalking} style={styles.womanWalkingImg} />
                    <TextBold style={styles.descPage}>You are all set!</TextBold>
                    <TextRegular style={{ color: "#696969", fontSize: 14, textAlign: "center", maxWidth: 324, marginTop: 3, marginBottom: 22 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TextRegular>
                </View>
                    <View style={styles.detailsView}>
                        <View style={styles.detailsInfoView}>
                            <TextRegular style={styles.infoTitle}>Booking ID</TextRegular>
                            <TextMedium style={[styles.infoTitle, {color: "black"}]}>{createBookingRes?.data?.booking?.id}</TextMedium>
                        </View>
                        <View style={styles.detailsInfoView}>
                            <TextRegular style={styles.infoTitle}>Service</TextRegular>
                            <TextMedium style={[styles.infoTitle, {color: "black"}]}>{createBookingRes?.data?.booking?.jobType?.name}</TextMedium>
                        </View>
                        <View style={styles.detailsInfoView}>
                            <TextRegular style={styles.infoTitle}>Working Day</TextRegular>
                            <TextMedium style={[styles.infoTitle, {color: "black"}]}>{moment(createBookingRes?.data?.booking?.scheduledAt).format("dddd, Do YYYY")}</TextMedium>
                        </View>
                        <View style={styles.detailsInfoView}>
                            <TextRegular style={styles.infoTitle}>Start Time</TextRegular>
                            <TextMedium style={[styles.infoTitle, {color: "black"}]}>{moment(createBookingRes?.data?.booking?.scheduledAt).format('hh:mm A')}</TextMedium>
                        </View>
                    </View>
                    <Pressable style={styles.artisanView}>
                                                        <Image source={{ uri: createBookingRes?.data?.booking?.artisan?.profileImg ?? "https://runnershive.s3.eu-west-1.amazonaws.com/Portrait_Placeholder-lnhuBpImRh.png" }} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 50 }} />
                            <View style={{marginLeft: 12}}>
                                <TextSemiBold style={styles.nameTag}>{capitalize(createBookingRes?.data?.booking?.artisan?.firstName)} {capitalize(createBookingRes?.data?.booking?.artisan?.lastName)}</TextSemiBold>
                                <TextRegular style={styles.smallerText}>Joined {moment(createBookingRes?.data?.booking?.artisan?.createdAt).format("MMMM, YYYY")}</TextRegular>
                                <View style={{flexDirection: "row", marginTop: 4}}>
                                    <StarRating rating={createBookingRes?.data?.booking?.artisan?.stars} />
                                </View>
                            </View>
                        </Pressable>

                        <TextRegular style={{color: "#696969", fontSize: 14, marginTop: 10}}>Etiam dignissim felis est, nec eleifend mi faucibus id. Donec vel diam eleifend urna cursus.</TextRegular>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Pressable onPress={async () =>{
                                                 navigation.navigate("TabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "BookingDetails",
      },
    })
                                }} style={{backgroundColor: "#FA4E61", paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25, marginTop: 17}}>
                                                <TextMedium style={{color: "white", fontSize: 15, }}>See details</TextMedium>
                                            </Pressable>
                                            <Pressable onPress={async () =>{
                                                 navigation.navigate("TabNavigation", {
                                  screen: "BookingsNavigation",
                                  params: {
                                    screen: "Bookings",
                                  },
                                })
                                }} style={{ paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25, marginTop: 5}}>
                                                <TextMedium style={{color: "#474747", fontSize: 15, }}>Go to Bookings</TextMedium>
                                            </Pressable>
                        </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoImg: {
        width: 250,
        height: 29,
        // marginTop: 10
    },
    GetStartedContent: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    womanWalkingImg: {
        width: 325,
        height: 227,
        objectFit: "contain",
    },
    descPage: {
        maxWidth: 295,
        fontSize: 25,
        textAlign: "center",
        color: "black",
        // marginTop: 31
    },
    barsView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 43
    },
    bars: {
        width: 29,
        height: 4,
        borderRadius: 5,
        backgroundColor: "#FFFFFF66"
    },
    detailsView: {
        backgroundColor: "#F3F3F3B2",
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 22,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    detailsInfoView: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        flexDirection: "row"
    },
    infoTitle: {
        color: "#8B8B8B",
        fontSize: 14
    },
    artisanView: {
        backgroundColor: "#E13548",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
    }
})