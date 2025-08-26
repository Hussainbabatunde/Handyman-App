import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextRegular } from "../../component/StyledText";
import { Formik } from "formik";
import * as Yup from "yup";
import { OnboardContext } from ".";
import AppContext from "../../context";

// ✅ Yup validation schema
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(8, "Phone number must be at least 11 digits")
    .max(15, "Phone number cannot be longer than 15 digits"),
});

export default function VerifyPhone () {
    const navigation = useNavigation<StackNavigationProp<any>>();
        const {jobTypes} = useContext<any>(AppContext)
        
    
  const { verifyPhoneApiCall, isSubmitting, checked, setChecked } = useContext(OnboardContext);

    const handleSubmit = async (values: any) => {
        values.phoneNo =  values.phoneNumber
        delete values.phoneNumber
        await verifyPhoneApiCall(values)
        // navigation.navigate('ValidatePhone')
    }

    return(
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
                        <MaterialIcons name="arrow-back" size={22} color="#FA4E61" />
                    </Pressable>
                </View>
                    <Text
                        style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600}]}
                    >
                        Let’s get started
                    </Text>
                    <Text style={styles.descText}>Please enter your phone number below to get started</Text>
                    <Formik
        initialValues={{ phoneNumber: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
          // You can call your API or navigation here
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
                    <Text style={styles.labelText}>Phone number</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g 08023237743" placeholderTextColor={"#898A8D"} keyboardType="phone-pad"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber} />
              <Pressable onPress={()=>{
                                      setChecked(!checked)
                                  }} style={styles.checkboxView}>
                                      {checked? <MaterialIcons name="check-box" size={22} color="#FA4E61" /> : <MaterialCommunityIcons name="checkbox-blank-outline" size={22} color="#ABABAB" />}
                                      <TextRegular style={styles.checkboxText}>Are you an <TextBold>artisan</TextBold>?</TextRegular>
                                  </Pressable>
                    {errors.phoneNumber && touched.phoneNumber && (
              <Text style={{ color: "red", marginTop: 5 }}>{errors.phoneNumber}</Text>
            )}
                    {/* <View style={styles.checkboxView}>
                        <MaterialCommunityIcons name="checkbox-blank-outline" size={22} color="#ABABAB" />
                        <TextRegular style={styles.checkboxText}>Are you an <TextBold>artisan</TextBold>?</TextRegular>
                    </View> */}
                    <View style={{width: "100%"}}>
                <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={isSubmitting?.verifyPhone} title={"Continue"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                    </View>
                    </View>
        )}
      </Formik>
                    </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
        justifyContent: "center"
    },
    BodySpacing: {
        paddingHorizontal: 25
    },
    descText: {
        color: "#696969",
        fontSize: 16,
        marginTop: 11
    },
    labelText: {
        color: "#474747",
        fontSize: 14,
        fontWeight: 500,
        marginTop: 31
    },
    inputBody: {
        borderWidth: 1,
        borderColor: "#DADADA",
        backgroundColor: "#FBFBFB",
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderRadius: 5,
        marginTop: 3
    },
    checkboxView: {
        flexDirection: "row",
        marginTop: 17
    },
    checkboxText: {
        color: "#1E1E1E",
        fontSize: 16,
        marginLeft: 12
    }
})