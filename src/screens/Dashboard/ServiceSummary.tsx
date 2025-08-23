import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { splitIntoParagraphs } from "../../services/utils";
import { TextRegular } from "../../component/StyledText";

export default function ServiceSummary () {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const handleSubmit = () => {
        // navigation.navigate('PinCode')
        navigation.navigate("TabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "BookArtisan",
      },
    })
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
                        House Cleaning
                    </Text>
                    <View style={{flex: 1}}>
                        <ScrollView bounces={false}>
                    <TextRegular style={styles.descText}>{splitIntoParagraphs('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque diam, fermentum a hendrerit a, sollicitudin ut ex. Vivamus fermentum, dolor nec ultrices blandit, ligula tellus semper lectus, et facilisis nunc lectus a arcu. Nam in efficitur nulla. Fusce hendrerit nisi a metus malesuada faucibus. Fusce tristique blandit ligula, a gravida lorem porta nec. Morbi leo justo, efficitur sit amet justo et, elementum consectetur elit. Curabitur aliquam turpis sed lorem porttitor, sit amet mattis est gravida. Nam id eleifend nulla, eget rhoncus odio. In hac habitasse platea dictumst. Pellentesque maximus ultricies sem vel pretium. Sed a viverra ligula. Suspendisse fringilla dolor eu lorem euismod, eget pharetra mauris tempus. Sed convallis velit odio, vel dictum augue porta a. Quisque vulputate tempor mattis.')}</TextRegular>
                    </ScrollView>
                    </View>
                    <View style={{width: "100%"}}>
                <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Book Now"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
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