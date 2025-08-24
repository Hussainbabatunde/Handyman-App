import { AntDesign, Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react"
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { splitIntoParagraphs } from "../../services/utils";
import { TextBold, TextMedium, TextRegular, TextSemiBold } from "../../component/StyledText";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import userProfilePic from "../../../assets/images/userProfilePic.png"
import { DashboardContext } from "./DashboardStack";
import { capitalize } from "../../context/actions/utils";

export default function BookingDetails() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const {createBookingRes} = useContext<any>(DashboardContext)
    const handleSubmit = () => {
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
                <View style={[styles.BodySpacing, { flex: 1 }]}>
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
                        {createBookingRes?.data?.booking?.jobType?.name}
                    </Text>
                    <TextRegular style={{ color: "#696969", fontSize: 16, marginTop: 10, marginBottom: 8 }}>{createBookingRes?.data?.booking?.notes} </TextRegular>
                    <TextRegular style={{color: "#9999A3", fontSize: 14}}>Created on <TextMedium style={{fontSize: 14, color: "black"}}>{moment(createBookingRes?.data?.booking?.createdAt).format("Do MMM, YYYY")}</TextMedium></TextRegular>
                    <View style={{alignItems: "flex-start"}}>
                        <View style={{backgroundColor: "#FF9B5E", borderRadius: 4, paddingHorizontal: 9, paddingVertical: 4, marginTop: 9}}>
                            <TextRegular style={{color: "white", fontSize: 11}}>Task {capitalize(createBookingRes?.data?.booking?.status)}</TextRegular>
                        </View>
                    </View>
                    <View style={styles.locationView}>
                        <Entypo name="location-pin" size={24} color="#979797" />
                        <View style={styles.detailsLocationView}>
                            <TextSemiBold style={styles.mainText}>{createBookingRes?.data?.booking?.location}</TextSemiBold>
                            <TextRegular style={styles.subText}>Lagos, Nigeria</TextRegular>
                        </View>
                    </View>
                    <View style={[styles.locationView, {marginTop: 0, borderTopWidth: 0}]}>
                        <Entypo name="location-pin" size={24} color="#979797" />
                        <View style={styles.detailsLocationView}>
                            <TextSemiBold style={styles.mainText}>{moment(createBookingRes?.data?.booking?.scheduledAt).format("dddd, MMMM Do, YYYY")}</TextSemiBold>
                            <TextRegular style={styles.subText}>start from <TextMedium style={{color: "black", fontSize: 16}}>{moment(createBookingRes?.data?.booking?.scheduledAt).format('hh:mm A')}</TextMedium></TextRegular>
                        </View>
                    </View>
                    <Pressable onPress={handleSubmit} style={styles.artisanView}>
                            <Image source={userProfilePic} style={{width: 60, height: 60}} />
                            <View style={{marginLeft: 12}}>
                                <TextSemiBold style={styles.nameTag}>{capitalize(createBookingRes?.data?.booking?.artisan?.firstName)} {capitalize(createBookingRes?.data?.booking?.artisan?.lastName)}</TextSemiBold>
                                <TextRegular style={styles.smallerText}>Joined {moment(createBookingRes?.data?.booking?.artisan?.createdAt).format("MMMM, YYYY")}</TextRegular>
                                <View style={{flexDirection: "row", marginTop: 4}}>
                                    <AntDesign name="star" size={14} color="#FFC61C" />
                                    <AntDesign name="star" size={14} color="#FFFFFF99" />
                                </View>
                            </View>
                        </Pressable>
                </View>
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