import React, { useContext } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SanlamLogo from "../../../assets/images/sanlamLogo.png"
import WomanWalking from "../../../assets/images/successfulSignup.png"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextMedium, TextRegular } from "../../component/StyledText";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AppContext from "../../context";
import { OnboardContext } from ".";

export default function SignupSuccess () {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { countries ,dispatch, userData, setUserData, setLogOutUser } = useContext<any>(AppContext);
  const {registerRes} = useContext(OnboardContext)


    return (
        <View style={[styles.container, {backgroundColor: "white"}]}>
            <SafeAreaView style={[styles.container, {alignItems: "center"}]}>
            {/* <Image source={SanlamLogo} style={styles.logoImg} /> */}
            <View style={styles.GetStartedContent}>
                <Image source={WomanWalking} style={styles.womanWalkingImg} />
                <TextBold style={styles.descPage}>You are all set!</TextBold>
<TextRegular style={{color: "#696969", fontSize: 14, textAlign: "center", maxWidth: 324, marginTop: 16, marginBottom: 22}}>Let’s do great things together</TextRegular>
                <Pressable onPress={async () =>{
                    await setUserData(dispatch, registerRes?.accessToken, {loggedIn: "true", ...registerRes}, registerRes?.data);
    //                  navigation.navigate("TabNavigation", {
    //   screen: "DashboardNavigation",
    //   params: {
    //     screen: "Dashboard",
    //   },
    // })
    }} style={{backgroundColor: "#FA4E61", paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25}}>
                    <TextMedium style={{color: "white", fontSize: 15, }}>Get Started</TextMedium>
                </Pressable>
            </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoImg: {
        width: 250,
        height: 29,
        marginTop: 10
    },
    GetStartedContent: {
        flex: 1,
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
    }
})