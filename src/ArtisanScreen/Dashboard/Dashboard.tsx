import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Avatar from "../../../assets/images/avatar.png"
import { TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import { Feather, Octicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import WomanPainter from "../../../assets/images/womanPainter.png"
import innerTransparent from "../../../assets/images/innerTransparentSummary.png"
import outerTransparent from "../../../assets/images/outerTransparentSummary.png"
import cleaning from "../../../assets/images/cleaning.png"
import plumbing from "../../../assets/images/plumbing.png"
import painting from "../../../assets/images/painting.png"
import pestControl from "../../../assets/images/pestControl.png"
import delivery from "../../../assets/images/delivery.png"
import more from "../../../assets/images/more.png"
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AppContext from '../../context'
import { DashboardContext } from './DashboardStack'
import { capitalize } from '../../context/actions/utils'

const Dashboard = () => {
  const { dispatch, logoutUser, removeUserData, userData, jobTypes } =
    React.useContext<any>(AppContext);
    const {isSubmitting, getArtisanByProfessionApiCall, allArtisanByProfession} = useContext<any>(DashboardContext)
    // console.log("userData: ", userData);
    
  const navigation = useNavigation<StackNavigationProp<any>>();
    const activity = [
        {
            title: "Cleaning",
            img: cleaning
        },
        {
            title: "Plumber",
            img: plumbing
        },
        {
            title: "Painting",
            img: painting
        },
        {
            title: "Pest Control",
            img: pestControl
        },
        {
            title: "Delivery",
            img: delivery
        },
        {
            title: "More",
            img: more
        }
    ]
    const filteredJobTypes = jobTypes.map((c: any) => {
    const match = activity.find(countryApp => countryApp.title == c.name);
  
    return {
      ...c,
      img: match?.img || null,
    };
  });
    

    const logoutOnSubmit = React.useCallback(async () => {
    await logoutUser(dispatch);
  }, []);

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, {paddingHorizontal: 21}]}>
      <View style={styles.nameNotifyView}>
        <View style={styles.profileView}>
            <Image source={Avatar} style={{width: 35, height: 35}} />
            <View style={styles.nameHelpView}>
                <TextSemiBold style={{color: "#242424", fontSize: 18}}>{capitalize(userData?.data?.firstName ?? userData?.user?.firstName)}</TextSemiBold>
                <TextRegular style={{color: "#898A8D", fontSize: 14}}>Good Morning!!!</TextRegular>
            </View>
        </View>
        <View style={{position: "relative"}}>
            <Octicons name="bell" size={22} color="black" />
            <View style={{position: "absolute", backgroundColor: "#E25C5C", borderRadius: 50, width: 8, height: 8, right: 0}}></View>
        </View>
      </View>
      <View style={{gap: 15, flexDirection: "row", marginTop: 25}}>
        <View style={{backgroundColor: "#E13548", paddingLeft: 18, paddingTop: 133, paddingBottom: 33, width: 155, borderRadius: 10, position: "relative"}}>
          <Image source={outerTransparent} style={{position: "absolute", top: 0, width: 150, objectFit: "contain", zIndex: 10}} />
          <Image source={innerTransparent} style={{position: "absolute", top: 0, width: 100, objectFit: "contain", zIndex: 100}} />
          <TextRegular style={{color: "white", fontSize: 12}}>Total Income</TextRegular>
          <TextSemiBold style={{color: "white", fontSize: 28}}>₦16.4M</TextSemiBold>
        </View>
        <View style={{backgroundColor: "black", paddingLeft: 18, paddingTop: 133, paddingBottom: 33, width: 155, borderRadius: 10, position: "relative"}}>
          <TextRegular style={{color: "white", fontSize: 12}}>Total Jobs Completed</TextRegular>
          <TextSemiBold style={{color: "white", fontSize: 28}}>25</TextSemiBold>
        </View>
      </View>

{/* <Pressable
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Log out"
              onPress={async () => {
                logoutOnSubmit();
              }}
              style={{
                paddingVertical: 15,
                backgroundColor: "#33ba76",
                borderRadius: 5,
                width: "100%",
                marginTop: 22,
                opacity: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TextMedium
                style={{
                  color: "#101011",
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Logout
              </TextMedium>
            </Pressable> */}

      </View>
      </SafeAreaView>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white"
    },
    nameNotifyView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    profileView: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    nameHelpView: {
        marginLeft: 12
    },
    searchBar: {
        borderWidth: 1,
        borderColor: "#DADADA",
        paddingHorizontal: 15,
        paddingVertical: 13,
        marginTop: 22,
        borderRadius: 5,
        backgroundColor: "#FBFBFB",
        flexDirection: "row",
        alignItems: "center"
    }
})