import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { OnboardContext } from "../screens/onboarding";

const ConfirmPhoneModal = ({ visible, phoneNumber, onClose, onSendOtp }: any) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
    const { verifyPhoneApiCall, isSubmitting, checked, setChecked } = useContext(OnboardContext);
  let values = {}

    const handleNavigate = async () =>{
        values.phoneNo =  phoneNumber
        await verifyPhoneApiCall(values)
        navigation.navigate("OnboardStackScreen", {
          screen: "ForgotValidatePhone",
        });
    }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Confirm Phone Number</Text>

          <Text style={styles.phoneText}>{phoneNumber}</Text>

          <TouchableOpacity onPressIn={handleNavigate} style={styles.otpButton} onPress={onSendOtp}>
            <Text style={styles.otpButtonText}>Send OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmPhoneModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  phoneText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  otpButton: {
    backgroundColor: "#FA4E61",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  otpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    color: "red",
  },
});
