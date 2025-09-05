import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

const OtpModal = ({ visible, onClose, onSubmit, otp, setOtp }: {visible: boolean, onClose: any, onSubmit: any, otp: any, setOtp: any}) => {
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>

            <TextInput
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter 6-digit code"
              maxLength={6}
              autoCapitalize="characters"
              style={[styles.input, { letterSpacing: 5 }]}
            />

            <TouchableOpacity
              onPress={() => onSubmit(otp)}
              disabled={otp.length < 6}
              style={[
                styles.button,
                otp.length < 6 ? styles.buttonDisabled : styles.buttonActive,
              ]}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: "black",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
  },
  cancelText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

export default OtpModal;
