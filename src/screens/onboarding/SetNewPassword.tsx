import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalLoading from "../../component/modals/ModalLoading";
import { OnboardContext } from ".";

const SetNewPassword = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // states for toggling visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {isSubmitting, forgotPasswordApiCall, validatePhoneRes} = useContext<any>(OnboardContext)

  const handleSubmit = async () => {
    if (password === confirmPassword) {
    //   Alert.alert("Success", "Password confirmed!");
    let sentData = {
        id: validatePhoneRes?.data?.id,
        password: password
    }
    await forgotPasswordApiCall(sentData)
    } else {
      Alert.alert("Error", "Passwords do not match!");
    }
  };

  const isValid =
    password.length === 6 &&
    confirmPassword.length === 6 &&
    password === confirmPassword;

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 30 }]}>
      <View style={[styles.BodySpacing, { flex: 1 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          style={[styles.nameIdentifier, { marginTop: 25, fontWeight: "600" }]}
        >
          Signup
        </Text>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter 6-digit password"
            value={password}
            onChangeText={setPassword}
            maxLength={6}
            keyboardType="number-pad"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            maxLength={6}
            keyboardType="number-pad"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.icon}
          >
            <MaterialIcons
              name={showConfirmPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && { backgroundColor: "#ccc" }]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <ModalLoading verify={isSubmitting?.register} />
    </SafeAreaView>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    backgroundColor: "#FBFBFB",
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 8,
  },
  icon: {
    padding: 6,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
    justifyContent: "center",
  },
  BodySpacing: {
    paddingHorizontal: 25,
  },
});
