import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from "../../../assets/images/avatar.png"
import { TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import { Feather, Octicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import WomanPainter from "../../../assets/images/womanPainter.png"
import electrician from "../../../assets/images/electrician.png"
import laundry from "../../../assets/images/laundry.png"
import cleaning from "../../../assets/images/cleaning.png"
import plumbing from "../../../assets/images/plumbing.png"
import painting from "../../../assets/images/painting.png"
import pestControl from "../../../assets/images/pestControl.png"
import delivery from "../../../assets/images/delivery.png"
import more from "../../../assets/images/more.png"
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AppContext from '../../context'

const Dashboard = () => {
  const { dispatch, logoutUser, removeUserData, userData, jobTypes } =
    React.useContext<any>(AppContext);
  const navigation = useNavigation<StackNavigationProp<any>>();
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
                <TextSemiBold style={{color: "#242424", fontSize: 18}}>Oluwabusayo</TextSemiBold>
                <TextRegular style={{color: "#898A8D", fontSize: 14}}>Need some help today?</TextRegular>
            </View>
        </View>
        <View style={{position: "relative"}}>
            <Octicons name="bell" size={22} color="black" />
            <View style={{position: "absolute", backgroundColor: "#E25C5C", borderRadius: 50, width: 8, height: 8, right: 0}}></View>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#FA4E61" />
        <TextInput style={{marginLeft: 11, flex: 1, fontSize: 14}} placeholder='Search here...' placeholderTextColor={"#898A8D"} />
      </View>
            <Image source={WomanPainter} style={{width: '100%', height: 172, marginTop: 26}} />
            <View
  style={{
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // spaces them evenly
    gap: 6
  }}
>
  {filteredJobTypes.map((each: any, index: number) => (
    <Pressable
      key={index}
      style={{
        width: "23%", // ~25% minus spacing, so 4 fit in a row
        backgroundColor: "#D9D9D933",
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16, // spacing between rows
      }}
       onPress={() => navigation.navigate("TabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "ServiceSummary",
      },
    })}
    >
      <Image source={each?.img} style={{ width: 30, height: 30 }} />
      <TextMedium style={{ fontSize: 9, color: "black", textAlign: "center", marginTop: 2 }}>
        {each?.name}
      </TextMedium>
    </Pressable>
  ))}
</View>

<Pressable
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
            </Pressable>

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