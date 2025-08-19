import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";

export default function Signup () {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const handleSubmit = () => {
        navigation.navigate('PinCode')
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={[styles.BodySpacing, {flex: 1}]}>
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
                        Signup
                    </Text>
                    <Text style={styles.descText}>Tell us a little about yourself</Text>
                    <View style={{flex: 1}}>
                    <Text style={styles.labelText}>First name</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g John" placeholderTextColor={"#898A8D"} />
                    <Text style={styles.labelText}>Last name</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g Balogun" placeholderTextColor={"#898A8D"} />
                    <Text style={styles.labelText}>Email address</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g me@gmail.com" placeholderTextColor={"#898A8D"} />
                    </View>
                    <View style={{width: "100%"}}>
                <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Submit"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                    </View>
                    </View>
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
        marginTop: 23
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