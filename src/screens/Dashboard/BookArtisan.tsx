import { AntDesign, Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react"
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { splitIntoParagraphs } from "../../services/utils";
import { TextBold, TextRegular, TextSemiBold } from "../../component/StyledText";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";

export default function BookArtisan() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [showButtonDate, setShowButtonDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [errors, setErrors] = useState<any>({}); // Store error messages
    const [showButtonTime, setShowButtonTime] = React.useState(false);
    const [time, setTime] = React.useState(new Date());

    const today = new Date();
    const maxSelectableDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const handleSubmit = () => {
        // navigation.navigate('PinCode')
        navigation.navigate("TabNavigation", {
      screen: "DashboardNavigation",
      params: {
        screen: "SelectArtisan",
      },
    })
    }

    const onChange = async (event: any, selectedDate: any) => {
        if (selectedDate) {
            const currentDate = await selectedDate;
            //   setValueSetupProfile((prev: any) => ({
            //     ...prev,
            //     dateOfBirth: selectedDate,
            //   }));
            await setDate(currentDate);
            // setShowButtonDate(!showButtonDate);
            setErrors((prev: any) => ({ ...prev, dateOfBirth: null })); // Clear error
        }
    };

    const OnchangeShowButton = () => {
        setShowButtonDate(!showButtonDate);
        // setFocusedInput("dob");
        if (Platform.OS == "android") {
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: "date",
                is24Hour: true,
                maximumDate: maxSelectableDate
            });
        }
    };

    const handleConfirm = () => {
        setShowButtonDate(false);
    };
    const handleCancel = () => {
        setShowButtonDate(false);
    };

    const OnchangeShowButtonTime = () => {

        setShowButtonTime(!showButtonTime);
        if (Platform.OS == 'android') {
            DateTimePickerAndroid.open({
                value: time,
                onChange: onChangeTime,
                mode: 'time',
                is24Hour: true,
            });
        }
    };

    const onChangeTime = async (event: any, selectedDate: any) => {
        const currentDate = await selectedDate;
        // const localTime = new Date(currentDate).toLocaleString();
        // const correctTime = localTime.split(",")
        // console.log('current time ', currentDate);

        await setTime(currentDate);
        setShowButtonTime(!showButtonTime);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              // keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if you have header/navbar
            >
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
                    Book Artisan
                </Text>
                <View style={{ flex: 1 }}>
                    <ScrollView bounces={false}>
                        <TextBold style={{ color: "#E13548", fontSize: 16, marginTop: 12 }}>House Cleaning</TextBold>
                        <TextRegular style={{ color: "#696969", fontSize: 16 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</TextRegular>
                        <TextSemiBold style={styles.labelText}>Working Day</TextSemiBold>

                        <View
                            style={styles.inputHolderNew}
                        >
                            <TouchableOpacity style={{ flex: 1 }} onPress={OnchangeShowButton}>
                                <Text style={{ fontSize: 15 }}>
                                    {/* {date && !moment(date).isSame(moment(), 'day') ? moment(date).format("DD/MM/YY") : "DD/MM/YY"} */}
                                    {/* {valueSetupProfile?.dateOfBirth
                  ?  */}
                                    {moment(date).format("DD/MM/YYYY")}
                                    {/* : "DD/MM/YY"} */}
                                </Text>
                            </TouchableOpacity>

                            {showButtonDate && (
                                <View>
                                    {Platform.OS == "ios" && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={onChange}
                                            maximumDate={maxSelectableDate}
                                        />
                                    )}
                                    {Platform.OS === "ios" && (
                                        <Modal visible={showButtonDate} transparent animationType="slide">
                                            <View style={styles.modalContainer}>
                                                <View style={styles.pickerContainer}>
                                                    <DateTimePicker
                                                        value={date}
                                                        mode="date"
                                                        display="spinner" // or "inline"
                                                        onChange={onChange}
                                                    // maximumDate={maxSelectableDate} // or your maxSelectableDate
                                                    />
                                                    <View style={styles.actions}>
                                                        <TouchableOpacity onPress={handleCancel}>
                                                            <Text style={styles.cancel}>Cancel</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={handleConfirm}>
                                                            <Text style={styles.confirm}>Done</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    )}
                                </View>
                            )}
                            <Feather
                                onPress={OnchangeShowButton}
                                name="calendar"
                                size={24}
                                color="black"
                            />
                        </View>
                        {errors.dateOfBirth && (
                            <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                        )}

                        <TextRegular style={styles.belowTextLabel}>Sed neque diam, fermentum a hendrerit a, sollicitudin ut ex. Vivamus fermentum</TextRegular>
                        <TextSemiBold style={styles.labelText}>Start Time</TextSemiBold>
                        <Pressable onPress={OnchangeShowButtonTime} style={styles.inputHolderNew}>
                            <TextRegular style={styles.dataInputed}>{moment(time).format('hh:mm A')}</TextRegular>
                            <AntDesign name="clockcircleo" size={20} color="black" />
                        </Pressable>
                        {showButtonTime && (
                            <View>
                                {Platform.OS == 'ios' && <DateTimePicker
                                    value={time}
                                    mode="time"
                                    display="default"
                                    onChange={onChangeTime}
                                />}
                            </View>
                        )}
                        <TextRegular style={styles.belowTextLabel}>Sed neque diam, fermentum a hendrerit a, sollicitudin ut ex. Vivamus fermentum</TextRegular>
                        <TextSemiBold style={styles.labelText}>Location</TextSemiBold>
                        <View style={styles.inputHolderNew}>
                            <TextInput placeholder="Enter address" style={styles.dataInputed} />
                            <AntDesign name="clockcircleo" size={20} color="black" />
                        </View>
                        <TextRegular style={styles.belowTextLabel}>Sed neque diam, fermentum a hendrerit a, sollicitudin ut ex. Vivamus fermentum</TextRegular>

                        <TextSemiBold style={styles.labelText}>Note</TextSemiBold>
                        <View style={styles.inputHolderNew}>
                            <TextInput placeholder="Input text" style={[styles.dataInputed, {fontSize: 17}]} />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ width: "100%" }}>
                    <AuthSubmitButton handleSubmit={handleSubmit} marginTOP={38} confirm={true} loading={false} title={"Request Artisan"} buttonColor="#FA4E61" loadColor="black" textColor={"white"} />
                </View>
            </View>
            </KeyboardAvoidingView>
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
        marginTop: 20
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal: 10
    },
    pickerContainer: {
        backgroundColor: "white",
        paddingTop: 20,
        borderRadius: 10,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    cancel: {
        color: "red",
        fontSize: 16,
    },
    confirm: {
        color: "blue",
        fontSize: 16,
    },
    belowTextLabel: {
        color: "#696969",
        fontSize: 11,
        marginTop: 2
    },
    inputTextContainer: {
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
        marginTop: 3
    },
    dataInputed: {
        flex: 1,
        color: "black",
        fontSize: 15
    }
})