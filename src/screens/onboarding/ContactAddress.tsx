import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextRegular } from "../../component/StyledText";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../../context";
import { OnboardContext } from ".";

// ✅ Yup validation schema
const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required("Address is required")
});

export default function ContactAddress () {
    const navigation = useNavigation<StackNavigationProp<any>>();
        const {jobTypes} = useContext<any>(AppContext)
        const {setAddress, setDocumentUpload} = useContext<any>(OnboardContext)
        

    const handleSubmit = async (values: any) => {
        setAddress(values?.address)
        navigation.navigate("OnboardStackScreen", {
          screen: "CompleteKyc",
        });
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
                        <MaterialIcons name="arrow-back" size={22} color="black" />
                    </Pressable>
                </View>
                    <Text
                        style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600}]}
                    >
                        Contact Address
                    </Text>
                    <Text style={styles.descText}>Please enter your contact address below.</Text>
                    <Formik
        initialValues={{ address: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
          // You can call your API or navigation here
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
                    <Text style={styles.labelText}>Address</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g 08023237743" placeholderTextColor={"#898A8D"} keyboardType="phone-pad"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address} />
                    {errors.address && touched.address && (
              <Text style={{ color: "red", marginTop: 5 }}>{errors.address}</Text>
            )}
                    {/* <View style={styles.checkboxView}>
                        <MaterialCommunityIcons name="checkbox-blank-outline" size={22} color="#ABABAB" />
                        <TextRegular style={styles.checkboxText}>Are you an <TextBold>artisan</TextBold>?</TextRegular>
                    </View> */}
                    <View style={{width: "100%"}}>
                <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Continue"} buttonColor="black" loadColor="black" textColor={"white"} />
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