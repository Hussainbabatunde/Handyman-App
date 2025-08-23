import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextBold, TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import WomanWalking from "../../../assets/images/NoBookingImg.png"

const Bookings = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View style={{flex: 1, marginHorizontal: 21}}>
      <TextSemiBold style={{fontSize: 24, color: "black"}}>Bookings</TextSemiBold>
      <View style={{marginTop: 23, borderBottomWidth: 1, borderBottomColor: "#AEAEB2", flexDirection: "row"}}>
        <Pressable style={{borderBottomWidth: 1, borderBottomColor: "#FA4E61", paddingHorizontal: 12, paddingVertical: 7}}>
            <TextMedium style={{color: "#FA4E61", fontSize: 16}}>Upcoming</TextMedium>
        </Pressable>
        <Pressable style={{borderBottomWidth: 0, borderBottomColor: "#AEAEB2", paddingHorizontal: 12, paddingVertical: 7}}>
            <TextMedium style={{color: "#FA4E61", fontSize: 16}}>Past</TextMedium>
        </Pressable>
      </View>
      <View style={styles.GetStartedContent}>
                <Image source={WomanWalking} style={styles.womanWalkingImg} />
                <TextBold style={styles.descPage}>No upcoming activity</TextBold>
<TextRegular style={{color: "#696969", fontSize: 16, textAlign: "center", maxWidth: 324, marginTop: 10, marginBottom: 22}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque diam</TextRegular>
                <Pressable onPress={async () =>{
    //                  navigation.navigate("TabNavigation", {
    //   screen: "DashboardNavigation",
    //   params: {
    //     screen: "Dashboard",
    //   },
    // })
    }} style={{backgroundColor: "#FA4E61", paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25}}>
                    <TextMedium style={{color: "white", fontSize: 15, }}>Book a task</TextMedium>
                </Pressable>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default Bookings

const styles = StyleSheet.create({
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
        fontSize: 18,
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