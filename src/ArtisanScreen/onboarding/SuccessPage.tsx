import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
// import AuthSubmitButton from "../component/SubmitActionButton";

export default function SuccessPage () {
    const navigation = useNavigation<StackNavigationProp<any>>();


    return(
        <View style={[styles.container, {paddingHorizontal: 25, alignItems: "center", justifyContent: "center"}]}>
            <Ionicons name="checkmark-circle-sharp" size={93} color="#14A030" />
                    <Text
                        style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600}]}
                    >
                        You are all set!
                    </Text>
                    <Text style={styles.descText}>Let’s do great things together</Text>
                    <View style={{width: "100%"}}>
                <AuthSubmitButton handleSubmit={()=> {}} marginTOP={38} confirm={true} loading={false} title={"Continue"} buttonColor="#0171B3" loadColor="black" textColor={"white"} />
                    </View>
        </View>
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
        backgroundColor: "#DFE2E8",
        padding: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center"
    },
    BodySpacing: {
        paddingHorizontal: 25,
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
    }
})