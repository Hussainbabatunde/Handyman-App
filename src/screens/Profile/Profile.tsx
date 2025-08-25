import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { TextBold, TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import AppContext from '../../context'
import { capitalize } from '../../context/actions/utils'

const Profile = () => {
  const {userData, dispatch, logoutUser} = useContext<any>(AppContext)
  // console.log("userData: ", userData);

  const logoutOnSubmit = React.useCallback(async () => {
      await logoutUser(dispatch);
    }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: "center", alignItems: "center", marginTop: 40}}>
          <View style={{backgroundColor: "#D9D9D980", paddingHorizontal: 26, paddingVertical: 24, borderRadius: 50, position: "relative"}}>
            <Ionicons name="person-outline" size={32} color="#FA4E61" />
          <View style={{backgroundColor: "#FA4E61", paddingHorizontal: 5, paddingVertical: 5, borderRadius: 50, position: "absolute", top: 5, right: 0}}>
            <Feather name="edit-3" size={10} color="white" />
          </View>
      </View>
      <TextBold style={{color: "#FA4E61", marginTop: 10, fontSize: 18}}>{capitalize(userData?.data?.firstName ?? userData?.user?.firstName)} {capitalize(userData?.data?.lastName ?? userData?.user?.lastName)}</TextBold>
      <TextRegular style={{color: "black", fontSize: 14}}>{userData?.data?.email ?? userData?.user?.email}</TextRegular>
      </View>

      <TextSemiBold style={{color: "#9999A3", fontSize: 12, marginTop: 50}}>Account</TextSemiBold>
      <Pressable style={{paddingVertical: 18, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Ionicons name="person-outline" size={20} color="black" />
          <TextMedium style={{color: "black", fontSize: 15, marginLeft: 15}}>Personal Information</TextMedium>
        </View>
        <FontAwesome5 name="chevron-right" size={16} color="black" />
      </Pressable>
      <Pressable style={{paddingVertical: 18, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Feather name="lock" size={18} color="black" />
          <TextMedium style={{color: "black", fontSize: 15, marginLeft: 15}}>Change login PIN</TextMedium>
        </View>
        <FontAwesome5 name="chevron-right" size={16} color="black" />
      </Pressable>

      <TextSemiBold style={{color: "#9999A3", fontSize: 12, marginTop: 33}}>General</TextSemiBold>
      <Pressable style={{paddingVertical: 18, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Feather name="info" size={20} color="black" />
          <TextMedium style={{color: "black", fontSize: 15, marginLeft: 15}}>Help  center</TextMedium>
        </View>
        <FontAwesome5 name="chevron-right" size={16} color="black" />
      </Pressable>
      <Pressable style={{paddingVertical: 18, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Ionicons name="newspaper-outline" size={18} color="black" />
          <TextMedium style={{color: "black", fontSize: 15, marginLeft: 15}}>Terms & Conditions</TextMedium>
        </View>
        <FontAwesome5 name="chevron-right" size={16} color="black" />
      </Pressable>
      <Pressable onPress={async () => {
                logoutOnSubmit();
              }}
               style={{paddingVertical: 18, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Ionicons name="exit-outline" size={18} color="#F42800" />
          <TextMedium style={{color: "#F42800", fontSize: 15, marginLeft: 15}}>Logout</TextMedium>
        </View>
        {/* <FontAwesome5 name="chevron-right" size={16} color="black" /> */}
      </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "white",
    paddingHorizontal: 21
  }
})