import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react"
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { splitIntoParagraphs } from "../../services/utils";
import { TextRegular } from "../../component/StyledText";
import { DashboardContext } from "./DashboardStack";

export default function ServiceSummary () {
    const navigation = useNavigation<StackNavigationProp<any>>();
        const {isSubmitting, getArtisanByProfessionApiCall, allArtisanByProfession, createBookingRes} = useContext<any>(DashboardContext)
        // console.log("createBookingRes: ", createBookingRes);
        
        const route = useRoute<any>();
    const { key } = route.params as { key: string };
    // console.log("allArtisanByProfession: ", allArtisanByProfession);

    useEffect(()=>{
        const initiate = async () =>{
            await getArtisanByProfessionApiCall(key)
        }
        initiate()
    }, [])
    
    const handleSubmit = () => {
        // navigation.navigate('PinCode')
        navigation.navigate("ArtisanTabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "BookArtisan",
      },
    })
    }

    return(
        <SafeAreaView style={styles.container}>
            {isSubmitting?.artisanByProfession ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    {/* <StatusBar backgroundColor="#fff" translucent /> */}
                    <ActivityIndicator size="small" color="black" />
                </View>
                :
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
                        {allArtisanByProfession?.jobType?.name}
                    </Text>
                    <View style={{flex: 1}}>
                        <ScrollView bounces={false}>
                    <TextRegular style={styles.descText}>{allArtisanByProfession?.jobType?.description}</TextRegular>
                    </ScrollView>
                    </View>
                    <View style={{width: "100%"}}>
                <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Book Now"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                    </View>
                    </View>
}
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