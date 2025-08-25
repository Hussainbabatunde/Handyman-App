import { AntDesign, Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react"
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { splitIntoParagraphs } from "../../services/utils";
import { TextBold, TextRegular, TextSemiBold } from "../../component/StyledText";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import userProfilePic from "../../../assets/images/userProfilePic.png"
import { FlatList } from "react-native-gesture-handler";
import { DashboardContext } from "./DashboardStack";
import { capitalize } from "../../context/actions/utils";
import ModalLoading from "../../component/modals/ModalLoading";
import StarRating from "../../component/StarRating";

export default function SelectArtisan() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const { isSubmitting, getArtisanByProfessionApiCall, allArtisanByProfession, createBookingApiCall } = useContext<any>(DashboardContext)
    // console.log("all artisans profession: ", allArtisanByProfession);



    const handleSubmit = async (item: any) => {
        // navigation.navigate('PinCode')
        // await createBookingApiCall(item?.id, allArtisanByProfession?.jobType?.id)
        navigation.navigate("TabNavigation", {
            screen: "DashboardNavigation",
            params: {
                screen: "ArtisanDetails",
                params: {
                    artisanDetail: item,
                },
            },
        })
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
                        Select a Artisan
                    </Text>
                    <TextRegular style={{ color: "#696969", fontSize: 16, marginTop: 10, marginBottom: 4 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TextRegular>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={allArtisanByProfession?.data}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingVertical: 10 }}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => handleSubmit(item)} style={styles.artisanView}>
                                    <Image source={{ uri: item?.profileImg ?? "https://runnershive.s3.eu-west-1.amazonaws.com/Portrait_Placeholder-lnhuBpImRh.png" }} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 50 }} />
                                    <View style={{ marginLeft: 12 }}>
                                        <TextSemiBold style={styles.nameTag}>{capitalize(item?.firstName)} {capitalize(item?.lastName)}</TextSemiBold>
                                        <TextRegular style={styles.smallerText}>
                                            Joined {moment(item?.createdAt).format("MMMM, YYYY")}
                                        </TextRegular>
                                        <View style={{ flexDirection: "row", marginTop: 4 }}>
                                            <StarRating rating={item?.stars} />
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
                {/* <ModalLoading verify={isSubmitting?.createBooking} /> */}
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
        marginTop: 22,
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
    }
})