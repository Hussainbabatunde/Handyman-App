import { ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
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
import { capitalize, getStatusColor } from '../../context/actions/utils'
import moment from 'moment'

const Dashboard = () => {
  const { dispatch, logoutUser, removeUserData, userData, jobTypes } =
    React.useContext<any>(AppContext);
    const {isSubmitting, recentBookingDetailsApiCall, allArtisanByProfession, recentBookingsDetailsRes} = useContext<any>(DashboardContext)
    // console.log("recentBookingsDetailsRes: ", recentBookingsDetailsRes);
    
    useEffect(()=>{
      const initiate = async () =>{
        await recentBookingDetailsApiCall()
      }
      initiate()
    },[])
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
      {isSubmitting?.recentBookings ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                {/* <StatusBar backgroundColor="#fff" translucent /> */}
                                <ActivityIndicator size="small" color="black" />
                            </View>
                            :
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
          <TextRegular style={{color: "white", fontSize: 12}}>Total Jobs Pending</TextRegular>
          <TextSemiBold style={{color: "white", fontSize: 28}}>{recentBookingsDetailsRes?.bookingsCountPending}</TextSemiBold>
        </View>
        <View style={{backgroundColor: "black", paddingLeft: 18, paddingTop: 133, paddingBottom: 33, width: 155, borderRadius: 10, position: "relative"}}>
          <TextRegular style={{color: "white", fontSize: 12}}>Total Jobs Completed</TextRegular>
          <TextSemiBold style={{color: "white", fontSize: 28}}>{recentBookingsDetailsRes?.bookingsCountCompleted}</TextSemiBold>
        </View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 24}}>
        <TextSemiBold style={{color: "#696969", fontSize: 12}}>Upcoming Jobs</TextSemiBold>
        <Pressable style={{borderBottomWidth: 1, borderBottomColor: "#FA4E61"}}>
          <TextSemiBold style={{color: "#FA4E61", fontSize: 12}}>View all</TextSemiBold>
        </Pressable>
      </View>

      {recentBookingsDetailsRes?.data?.map((each: any, index: number)=> <Pressable
          // onPress={() =>
          //           navigation.navigate("TabNavigation", {
          //             screen: "BookingsNavigation",
          //             params: {
          //               screen: "BookingDetailsPage",
          //               params: {
          //       details: item
          //     }
          //             },
          //           })
          //         }
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#E4E5E7",
              paddingVertical: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
            key={index}
          >
            {/* Left icon */}
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#D9D9D933",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={WomanPainter} style={{ width: 12, height: 12 }} />
            </View>
      
            {/* Task details */}
            <View style={{ marginLeft: 13 }}>
              <Text style={{ color: "#696969", fontSize: 11, marginBottom: 3 }}>
                {moment(each?.scheduledAt).format("DD MMMM . hh:mm a")}
              </Text>
              <Text style={{ fontSize: 14, color: "black" }}>{capitalize(each?.requester?.firstName)} {capitalize(each?.requester?.lastName)}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>{each?.location}</Text>
      
              <View style={{ alignItems: "flex-start" }}>
                <View
                  style={{
                    // backgroundColor: getStatusColor(item?.status, item?.artisanStatus),
                    backgroundColor: getStatusColor(each?.status, each?.artisanStatus),
                    borderRadius: 4,
                    paddingHorizontal: 9,
                    paddingVertical: 4,
                    marginTop: 9,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Task {(each?.status == "accepted" && each?.artisanStatus != "pending") ? capitalize(each?.artisanStatus) : capitalize(each?.status)}
                    {/* Task Ongoing */}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>)}
      </View>
      </SafeAreaView>
}
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