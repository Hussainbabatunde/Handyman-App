import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextBold, TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import WomanWalking from "../../../assets/images/NoBookingImg.png"
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BookingsContext } from './BookingsStack'
import electrician from "../../../assets/images/electrician.png"
import laundry from "../../../assets/images/laundry.png"
import cleaning from "../../../assets/images/cleaning.png"
import plumbing from "../../../assets/images/plumbing.png"
import painting from "../../../assets/images/painting.png"
import pestControl from "../../../assets/images/pestControl.png"
import delivery from "../../../assets/images/delivery.png"
import more from "../../../assets/images/more.png"
import { capitalize, getStatusColor } from '../../context/actions/utils'
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler'

const Bookings = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const {getAllBookingsApiCall, allBookingRes, isSubmitting} = useContext<any>(BookingsContext)
    const [step, setStep] = useState("upcoming")
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await getAllBookingsApiCall(); // call your API
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [getAllBookingsApiCall]);
    // console.log("allBookingRes: ", allBookingRes);
    
    const activity = [
        {
            title: "Electrician",
            img: electrician
        },
        {
            title: "Laundry",
            img: laundry
        },
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

    useEffect(()=>{
        const initiate = async () =>{
            await getAllBookingsApiCall()
        }
        initiate()
    },[])

    // Filter tasks depending on step
  // const filteredData = (allBookingRes?.data ?? [])
  // .filter((item: any) => {
  //   const scheduledDate = moment(item.scheduledAt);
  //   if (step === "upcoming") {
  //     return scheduledDate.isAfter(moment()); // future tasks
  //   } else {
  //     return scheduledDate.isBefore(moment()); // past tasks
  //   }
  // })
  // .map((item: any) => {
  //   // find matching activity by jobType.name
  //   const match = activity.find(act => act.title === item.jobType?.name);

  //   return {
  //     ...item,
  //     jobType: {
  //       ...item.jobType,
  //       img: match?.img || null, // add img into jobType
  //     },
  //   };
  // });

  const filteredData = (allBookingRes?.data ?? [])
  .filter((item: any) => {
    const scheduledDate = moment(item.scheduledAt);

    const isRejected = item.status === "rejected";
    const isCompleted = item.status === "accepted" && item.artisanStatus === "completed";

    if (step === "upcoming") {
      // only future tasks that are not rejected or completed
      return (
        // scheduledDate.isAfter(moment()) &&
        !isRejected &&
        !isCompleted
      );
    } else {
      // past includes: rejected, completed, or scheduled in the past
      return (
        // scheduledDate.isBefore(moment()) ||
        isRejected ||
        isCompleted
      );
    }
  })
  .map((item: any) => {
    const match = activity.find(act => act.title === item.jobType?.name);

    return {
      ...item,
      jobType: {
        ...item.jobType,
        img: match?.img || null,
      },
    };
  });




  const renderItem = ({ item }: any) => (
    <Pressable
    onPress={() =>
              navigation.navigate("ArtisanTabNavigation", {
                screen: "BookingsNavigation",
                params: {
                  screen: "BookingDetailsPage",
                  params: {
          details: item
        }
                },
              })
            }
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#E4E5E7",
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
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
        <Image source={item?.jobType?.img} style={{ width: 12, height: 12 }} />
      </View>

      {/* Task details */}
      <View style={{ marginLeft: 13 }}>
        <Text style={{ color: "#696969", fontSize: 11, marginBottom: 3 }}>
          {moment(item?.scheduledAt).format("DD MMMM . hh:mm a")}
        </Text>
        <Text style={{ fontSize: 14, color: "black" }}>{capitalize(item?.requester?.firstName)} {capitalize(item?.requester?.lastName)}</Text>
        <Text style={{ fontSize: 14, color: "black" }}>{item?.location}.</Text>

        <View style={{ alignItems: "flex-start" }}>
          <View
            style={{
              backgroundColor: getStatusColor(item?.status, item?.artisanStatus),
              borderRadius: 4,
              paddingHorizontal: 9,
              paddingVertical: 4,
              marginTop: 9,
            }}
          >
            <Text style={{ color: "white", fontSize: 11 }}>
              Task {(item?.status == "accepted" && item?.artisanStatus != "pending") ? capitalize(item?.artisanStatus) : capitalize(item?.status)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View style={{flex: 1, marginHorizontal: 21}}>
      <TextSemiBold style={{fontSize: 24, color: "black"}}>Bookings</TextSemiBold>
      {isSubmitting?.allBookings ?
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                          {/* <StatusBar backgroundColor="#fff" translucent /> */}
                          <ActivityIndicator size="small" color="black" />
                      </View>
                      :
      <View style={{flex: 1}}>
      <View style={{marginTop: 23, borderBottomWidth: 1, borderBottomColor: "#AEAEB2", flexDirection: "row"}}>
        <Pressable onPress={()=> setStep("upcoming")} style={{borderBottomWidth: step == "upcoming" ? 1 : 0, borderBottomColor: step == "upcoming" ? "#FA4E61" : "#AEAEB2", paddingHorizontal: 12, paddingVertical: 7}}>
            <TextMedium style={{color: step == "upcoming" ? "#FA4E61" : "#AEAEB2", fontSize: 16}}>Upcoming</TextMedium>
        </Pressable>
        <Pressable onPress={()=> setStep("past")} style={{borderBottomWidth: step == "past" ? 1 : 0, borderBottomColor: step == "past" ? "#FA4E61" : "#AEAEB2", paddingHorizontal: 12, paddingVertical: 7}}>
            <TextMedium style={{color: step == "past" ? "#FA4E61" : "#AEAEB2", fontSize: 16}}>Past</TextMedium>
        </Pressable>
      </View>
      {/* <View style={styles.GetStartedContent}>
                <Image source={WomanWalking} style={styles.womanWalkingImg} />
                <TextBold style={styles.descPage}>No upcoming activity</TextBold>
<TextRegular style={{color: "#696969", fontSize: 16, textAlign: "center", maxWidth: 324, marginTop: 10, marginBottom: 22}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque diam</TextRegular>
                <Pressable onPress={async () =>{
    navigation.navigate("TabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "Dashboard",
      },
    })
    }} style={{backgroundColor: "#FA4E61", paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25}}>
                    <TextMedium style={{color: "white", fontSize: 15, }}>Book a task</TextMedium>
                </Pressable>
            </View> */}
            <View style={{flex: 1}}>
                {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshing={refreshing}
          ListHeaderComponent={
    refreshing ? (
      <View style={{ paddingVertical: 10 }}>
        <ActivityIndicator size="small" color="gray" />
      </View>
    ) : null
  }
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
        />
      ) : (
        // Empty state
        <View style={styles.GetStartedContent}>
          <Image source={WomanWalking} style={styles.womanWalkingImg} />
          <Text style={styles.descPage}>
            {step === "upcoming"
              ? "No upcoming activity"
              : "No past activity"}
          </Text>
          <Text
            style={{
              color: "#696969",
              fontSize: 16,
              textAlign: "center",
              maxWidth: 324,
              marginTop: 10,
              marginBottom: 22,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque
            diam
          </Text>
          {/* <Pressable
            onPress={() =>
              navigation.navigate("ArtisanTabNavigation", {
                screen: "DashboardNavigation",
                params: {
                  screen: "Dashboard",
                },
              })
            }
            style={{
              backgroundColor: "#FA4E61",
              paddingHorizontal: 60,
              paddingVertical: 13,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>Book a task</Text>
          </Pressable> */}
        </View>
      )}
            </View>
            </View>
}
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