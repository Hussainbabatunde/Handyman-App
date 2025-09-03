import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold } from "../../component/StyledText";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../../context";
import { OnboardContext } from ".";

// ✅ Yup validation schema
const validationSchema = Yup.object().shape({
  guarantorFirstName: Yup.string().required("First name is required"),
  guarantorLastName: Yup.string().required("Last name is required"),
  guarantorPhoneNumber: Yup.string()
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
});

export default function GuarantorDetails() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { jobTypes } = useContext<any>(AppContext);
  const { setGuarantorDetails } = useContext<any>(OnboardContext);

  const handleSubmit = async (values: any) => {
    setGuarantorDetails(values);
    navigation.navigate("OnboardStackScreen", {
      screen: "CompleteKyc",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.BodySpacing}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: StatusBar.currentHeight }}>
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Back button"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={22} color="black" />
          </Pressable>
        </View>

        <Text style={[styles.nameIdentifier, { marginTop: 25, fontWeight: "600" }]}>
          Guarantor Details
        </Text>
        <Text style={styles.descText}>Please enter your guarantor’s details below.</Text>

        <Formik
          initialValues={{
            guarantorFirstName: "",
            guarantorLastName: "",
            guarantorPhoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View>
              {/* First Name */}
              <Text style={styles.labelText}>First Name</Text>
              <TextInput
                style={styles.inputBody}
                placeholder="e.g John"
                placeholderTextColor="#898A8D"
                onChangeText={handleChange("guarantorFirstName")}
                onBlur={handleBlur("guarantorFirstName")}
                value={values.guarantorFirstName}
              />
              {errors.guarantorFirstName && touched.guarantorFirstName && (
                <Text style={{ color: "red", marginTop: 5 }}>{errors.guarantorFirstName}</Text>
              )}

              {/* Last Name */}
              <Text style={styles.labelText}>Last Name</Text>
              <TextInput
                style={styles.inputBody}
                placeholder="e.g Doe"
                placeholderTextColor="#898A8D"
                onChangeText={handleChange("guarantorLastName")}
                onBlur={handleBlur("guarantorLastName")}
                value={values.guarantorLastName}
              />
              {errors.guarantorLastName && touched.guarantorLastName && (
                <Text style={{ color: "red", marginTop: 5 }}>{errors.guarantorLastName}</Text>
              )}

              {/* Phone Number */}
              <Text style={styles.labelText}>Phone Number</Text>
              <TextInput
                style={styles.inputBody}
                placeholder="e.g 08023237743"
                placeholderTextColor="#898A8D"
                keyboardType="phone-pad"
                onChangeText={handleChange("guarantorPhoneNumber")}
                onBlur={handleBlur("guarantorPhoneNumber")}
                value={values.guarantorPhoneNumber}
              />
              {errors.guarantorPhoneNumber && touched.guarantorPhoneNumber && (
                <Text style={{ color: "red", marginTop: 5 }}>{errors.guarantorPhoneNumber}</Text>
              )}

              {/* ✅ Show submit button only if form is valid */}
              {isValid && (
                <View style={{ width: "100%" }}>
                  <AuthSubmitButton
                    handleSubmit={handleSubmit}
                    marginTOP={38}
                    confirm={true}
                    loading={false}
                    title="Continue"
                    buttonColor="black"
                    loadColor="black"
                    textColor="white"
                  />
                </View>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  descText: {
    color: "#696969",
    fontSize: 16,
    marginTop: 11,
  },
  labelText: {
    color: "#474747",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 31,
  },
  inputBody: {
    borderWidth: 1,
    borderColor: "#DADADA",
    backgroundColor: "#FBFBFB",
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 5,
    marginTop: 3,
  },
});
