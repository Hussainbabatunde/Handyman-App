import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SanlamLogo from "../../../assets/images/sanlamLogo.png"
import WomanWalking from "../../../assets/images/HandyManImg.png"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextMedium, TextRegular } from "../../component/StyledText";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function GetStarted () {
  const navigation = useNavigation<StackNavigationProp<any>>();


    return (
        <View style={[styles.container, {backgroundColor: "white"}]}>
            <SafeAreaView style={[styles.container, {alignItems: "center"}]}>
            {/* <Image source={SanlamLogo} style={styles.logoImg} /> */}
            <View style={styles.GetStartedContent}>
                <Image source={WomanWalking} style={styles.womanWalkingImg} />
                <TextBold style={styles.descPage}>Best Solution for</TextBold>
<TextBold style={[styles.descPage, {marginTop: 0}]}>Every House Problems</TextBold>
<TextRegular style={{color: "#696969", fontSize: 14, textAlign: "center", maxWidth: 324, marginVertical: 25}}>We work to ensure people comfort at their home, and to provide the best and the fastest help at fair prices.</TextRegular>
                <Pressable onPress={() => navigation.navigate("VerifyPhone")} style={{backgroundColor: "#FA4E61", paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25}}>
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
        marginTop: 103
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