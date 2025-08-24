import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Pressable, Image, ActivityIndicator, Linking, TextInput, Platform } from "react-native";
import { AntDesign, Feather, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TextBold, TextMedium, TextRegular, TextSemiBold } from "../StyledText";
import CustomModal from "./CustomModal";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import AuthSubmitButton from "../SubmitActionButton";
import OuterCloseCustomModal from "./OuterCloseCustomModal";
import { capitalize } from "../../context/actions/utils";

interface ModalPolicyTypeProps {
  verify: boolean;
  setVerify: (value: boolean) => void;
  handleSubmit: any,
  firstName: string;
  lastName: string;
  rating: number;
  handlePress: any;
  setNarration: any;
}

const ModalCloseJob: React.FC<ModalPolicyTypeProps> = ({
  verify,
  setVerify,
  handleSubmit,
  firstName,
  lastName,
  rating,
  handlePress,
  setNarration
}) => {
  const amount = 50;
  const { height } = Dimensions.get("window");

  const handleCloseVerify = () => {
    setVerify(false);
  };

  const handleSubmitAppointment= () =>{}

  return (
    <OuterCloseCustomModal
      visible={verify}
      onRequestClose={handleCloseVerify}
      onPressOutside={handleCloseVerify}
      newHeight={height}
      tint="dark"
      content={
        <View style={styles.modalContent}>
          {/* Your existing modal content */}
        <TextSemiBold style={{color: "black"}}>Close Job</TextSemiBold>
                            <TextRegular style={{ color: "#696969", fontSize: 16, marginTop: 10, marginBottom: 8 }}>Lorem ipsum </TextRegular>
                            <TextSemiBold style={{color: "#E13548", fontSize: 15}}>Rate <TextSemiBold style={{color: "black", fontSize: 15}}>{capitalize(firstName)} {capitalize(lastName)}</TextSemiBold></TextSemiBold>
                            <View style={{ flexDirection: "row", marginTop: 11 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => handlePress(star)}>
            <AntDesign
              name="star"
              size={20}
              color={star <= rating ? "#FFC61C" : "#C1C1C1"}
              style={{ marginHorizontal: 3 }}
            />
          </Pressable>
        ))}
      </View>
      <View style={styles.inputHolderNew}>
                                      <TextInput multiline onChangeText={(text)=> setNarration(text)} placeholder="Drop a note..." style={[styles.dataInputed, { fontSize: 13, minHeight: 100 }]} />
                                  </View>
        <TextRegular style={{fontSize: 11, color: "#898A8D", marginTop: 11}}>Your review will not be shared with <TextSemiBold style={{fontSize: 11, color: "black"}}>{firstName} {lastName}</TextSemiBold></TextRegular>
<View style={{marginBottom: 10}}>
                        <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={35} confirm={true} loading={false} title={"Close Job"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
              </View>
        </View>
      }
    />
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    marginVertical: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    // height: 400
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  popupHolder:{
    width: '40%',
    padding: 3,
    backgroundColor:'#414141',
    borderRadius: 3
  },
  policyHolderView:{
    padding: 5,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft: 15,
    flex: 1
  },
  cancelPolicyTypeHolder:{
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems:'center',
    marginTop: 10
  },
  selectPolicyView:{
    paddingVertical: 10,
    backgroundColor: '#0075C9',
    marginTop: 10,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  policyTypeText:{
    fontSize: 18,
    fontWeight: '700',
    color:'#344054'
  },
  descPolicyTypeText:{
    color: '#98A2B3',
    marginTop: 5,
    fontSize: 12
  },
  textDescRenewal:{
    fontSize: 16,
    color: '#667085',
    lineHeight: 25,
    marginBottom: 20
  },
  Textcontainer: {
    flexDirection: 'row', // Arrange elements horizontally
    flexWrap: 'wrap',
    marginBottom: 25,
    // alignItems: 'center'
  },
  amount: {
    fontSize: 18
  },
  renewalIcon: {
    width: 70,
    height: 70
  },
  cancelandBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainer:{
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 80
  },
  labelView:{
    width: "47%"
  },
  labelView2:{
    width: "100%"
  },
  textViewContainer: {
    backgroundColor: 'FDFCF8',
  },
  textInput: {
    fontSize: 14, // Adjust to the size you want
    color: '#000', // You can set the text color here
  },

  phoneNumberViewContatiner: {
    width: '100%',
    backgroundColor: 'FDFCF8',
    borderColor: '#D0D5DD',
    borderWidth: 1,
    borderRadius: 5,
  },
  topicDesc:{
    color: "#667085"
  },
  buttonText: { 
    color: 'black', 
    fontWeight: '600' ,
    fontSize: 14
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#F2F4F7",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  inputTextContainer:{
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 5,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    flexDirection: "row"
  },
  inputHolderNew: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderColor: "#DADADA",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#FBFBFB",
        marginTop: 11
    },
    dataInputed: {
        flex: 1,
        color: "black",
        fontSize: 15
    }
});

export default ModalCloseJob;
