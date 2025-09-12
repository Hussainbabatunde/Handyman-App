import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react"
import { FlatList, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AuthSubmitButton from "../../component/SubmitActionButton";
import { TextBold, TextRegular } from "../../component/StyledText";
import { OnboardContext } from ".";
import AppContext from "../../context";

// const jobTypes = [
//   "Frontend Developer",
//   "Backend Developer",
//   "UI/UX Designer",
//   "Mobile Developer",
//   "DevOps Engineer",
//   "Project Manager",
//   "QA Tester",
// ];


export default function Signup() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [errors, setErrors] = useState<any>({}); // Store error messages
    const { valueSetupProfile, setValueSetupProfile, phoneNumber, checked, setChecked } =
        useContext(OnboardContext);
        const {jobTypes} = useContext(AppContext)
    const [confirm, setConfirm] = useState(false);
    const [focusedInput, setFocusedInput] = useState<any>(null); // Track focused input
    
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  
  

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
        setValueSetupProfile((prevState: any) => ({
            ...prevState,
            "userJobType": selected,
        }));
            navigation.navigate("OnboardStackScreen", {
          screen: "Password",
        });
        }
    }

    // filter list based on query
  const filteredJobTypes = query.trim() === ""
  ? jobTypes
  : jobTypes.filter((item: any) =>
      item?.name?.toLowerCase().includes(query.toLowerCase())
    );

    
    const toggleSelect = (name: string) => {
    console.log("selected now: ", name);
    if (selected.includes(name)) {
      setSelected(selected.filter((s) => s !== name)); // remove
    } else {
      setSelected([...selected, name]); // add
    }
    setQuery("");
    setIsOpen(false);
  };

  const removeTag = (name: string) => {
    setSelected(selected.filter((s) => s !== name));
  };

    return (
        <SafeAreaView style={[styles.container, {paddingBottom: 30}]}>
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
                    

{checked && <View style={{flex: 1}}>
                    {/* Selected tags + input */}
                    <Text style={styles.labelText}>Select Job type:</Text>
      <View style={styles.inputContainer}>
        {selected.map((name) => (
          <View key={name} style={styles.tag}>
            <Text style={styles.tagText}>{name}</Text>
            <TouchableOpacity onPress={() => removeTag(name)}>
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.textInput}
          placeholder="Search job type..."
          value={query}
  onFocus={() => {
    setIsOpen(true)
  }}
  // onBlur={() => setIsOpen(false)}
          onChangeText={(text) => {
            setQuery(text);
            setIsOpen(true);
          }}
        />
      </View>

      {/* Dropdown list */}
      {isOpen && filteredJobTypes.length > 0 && (
        <FlatList
          data={filteredJobTypes}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <TouchableOpacity
  style={[
    styles.dropdownItem,
    selected.includes(item.key) && { backgroundColor: "lightblue" },
  ]}
  onPress={() => toggleSelect(item.key)}
>
              <Text style={styles.dropdownText}>{item?.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
      </View>}
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
    inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    backgroundColor: "#FBFBFB",
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    minWidth: 120,
    padding: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: "#1e3a8a",
    marginRight: 4,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 6,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontSize: 16,
  },
})