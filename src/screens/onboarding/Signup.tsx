import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextRegular } from "../../component/StyledText";
import { OnboardContext } from ".";

export default function Signup() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [errors, setErrors] = useState<any>({}); // Store error messages
    const { valueSetupProfile, setValueSetupProfile, phoneNumber } =
        useContext(OnboardContext);
    const [confirm, setConfirm] = useState(false);
    const [focusedInput, setFocusedInput] = useState<any>(null); // Track focused input
    const [checked, setChecked] = useState(false)
          console.log("signup page: ", phoneNumber);

    const validateInputs = () => {
        let newErrors: { [key: string]: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex validation

        if (!valueSetupProfile?.firstName)
            newErrors.firstName = "First name is required";
        if (valueSetupProfile?.firstName?.trim()?.length < 2)
            newErrors.firstName = "Minimum character length is 2.";
        if (!valueSetupProfile?.lastName)
            newErrors.lastName = "Last name is required";
        if (valueSetupProfile?.lastName?.trim()?.length < 2)
            newErrors.lastName = "Minimum character length is 2.";
        if (!valueSetupProfile?.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(valueSetupProfile.email)) {
            newErrors.email = "Enter a valid email address";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleInputChange = (name: string, value: string | number) => {
        setValueSetupProfile((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prev: any) => ({ ...prev, [name]: null })); // Clear error when user types
    };

    useEffect(() => {
        if (
            valueSetupProfile?.firstName &&
            valueSetupProfile?.lastName &&
            // valueSetupProfile?.middleName &&
            valueSetupProfile?.dateOfBirth &&
            valueSetupProfile?.email
        ) {
            setConfirm(true);
        } else {
            setConfirm(false);
        }
    }, [valueSetupProfile]);

    useEffect(()=>{
        const initiate = () =>{
            if(checked){
                handleInputChange("userType", 2)
            }
            else{
                handleInputChange("userType", 1)
            }
        }
        initiate()
    },[checked])

    const handleSubmit = () => {
        if (validateInputs()) {
        //     setConfirm(true);
        //     //   navigation.navigate("ProfileSetupStep2");
            navigation.navigate("OnboardStackScreen", {
          screen: "Password",
        });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.BodySpacing, { flex: 1 }]}>
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
                    style={[styles.nameIdentifier, { marginTop: 25, fontWeight: 600 }]}
                >
                    Signup
                </Text>
                <Text style={styles.descText}>Tell us a little about yourself</Text>
                <View style={{ flex: 1 }}>
                    <Text style={styles.labelText}>First name</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g John" placeholderTextColor={"#898A8D"} onFocus={() => setFocusedInput("firstName")}
                        returnKeyType='done'
                        onBlur={() => setFocusedInput(null)}
                        value={valueSetupProfile?.firstName}
                        onChangeText={(text) => handleInputChange("firstName", text)} />
                    {errors.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                    <Text style={styles.labelText}>Last name</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g Balogun" placeholderTextColor={"#898A8D"} onFocus={() => setFocusedInput("lastName")}
                        returnKeyType='done'
                        onBlur={() => setFocusedInput(null)}
                        value={valueSetupProfile?.lastName}
                        onChangeText={(text) => handleInputChange("lastName", text)} />
                    {errors.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                    <Text style={styles.labelText}>Email address</Text>
                    <TextInput style={styles.inputBody} placeholder="e.g me@gmail.com" placeholderTextColor={"#898A8D"} onFocus={() => setFocusedInput("email")}
                        returnKeyType='done'
                        onBlur={() => setFocusedInput(null)}
                        value={valueSetupProfile?.email}
                        onChangeText={(text) => handleInputChange("email", text)} />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <Pressable onPress={()=>{
                        setChecked(!checked)
                    }} style={styles.checkboxView}>
                        {checked? <MaterialIcons name="check-box" size={22} color="#FA4E61" /> : <MaterialCommunityIcons name="checkbox-blank-outline" size={22} color="#ABABAB" />}
                        <TextRegular style={styles.checkboxText}>Are you an <TextBold>artisan</TextBold>?</TextRegular>
                    </Pressable>
                </View>
                <View style={{ width: "100%" }}>
                    <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Submit"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                </View>
            </View>
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
        marginTop: 23
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
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
})