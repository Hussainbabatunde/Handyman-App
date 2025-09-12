import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import AppContext from "../../context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "./ProfileStack";
import ModalLoading from "../../component/modals/ModalLoading";

// ✅ validation
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

export default function ProfileUpdateForm({ user, onSubmit }: any) {
    const {userData, dispatch, logoutUser} = useContext<any>(AppContext)
    const {uploadedImage, UploadDocmentApi, isSubmitting, updateProfileApiCall} = useContext<any>(ProfileContext)
  const [previousWork, setPreviousWork] = useState(userData?.user?.previousWork || []); // urls of images
  const [newUploads, setNewUploads] = useState<any[]>([]);
      const navigation = useNavigation<StackNavigationProp<any>>();
//   console.log("userData: ", userData);

  const handleDelete = (uri: string) => {
    setPreviousWork((prev: string[]) => prev.filter((img) => img !== uri));
    setNewUploads((prev) => prev.filter((img) => img.uri !== uri));
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (!doc.assets) return;
      const file = doc.assets[0];

      const uploadingFile = {
        name: file.name,
        uri: file.uri,
        size: file.size,
        type: file.mimeType,
      };

      const imgSize = uploadingFile.size / (1024 * 1024);
      if (imgSize > 5) {
        Alert.alert("Image limit is 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("file", uploadingFile as any);
      formData.append("name", "PreviousWork");

      await UploadDocmentApi(formData);
    //   setNewUploads((prev) => [...prev, uploadingFirle]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(uploadedImage){
        setPreviousWork((prev: any) => [...prev, uploadedImage])
    }
  }, [uploadedImage])

//   console.log("prev: ", previousWork);
const handleSubmit = async (values: any) => {
    console.log("works");
    
    let sentData = {...values, previousWork}
    await updateProfileApiCall(sentData)
    // setGuarantorDetails(values);
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 20 }}>
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
                                                Profile details
                                            </Text>
        <Formik
          initialValues={{
            firstName: userData?.user?.firstName || "",
            lastName: userData?.user?.lastName || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
          handleSubmit(values);
          // You can call your API or navigation here
        }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              {/* First Name */}
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.error}>{errors?.firstName}</Text>
              )}

              {/* Last Name */}
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.error}>{errors?.lastName}</Text>
              )}

              {/* Previous Work */}
              <Text style={[styles.label, { marginTop: 20 }]}>Previous Work</Text>
              <FlatList
                data={[...previousWork, ...newUploads.map((u) => u.uri)]}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: item }} style={styles.image} />
                    <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item)}>
                      <MaterialIcons name="close" size={18} color="white" />
                    </Pressable>
                  </View>
                )}
                ListFooterComponent={
                  <Pressable onPress={selectDoc} style={styles.addBtn}>
                    <MaterialIcons name="add" size={32} color="gray" />
                  </Pressable>
                }
              />

              <Pressable onPress={handleSubmit as any} style={styles.submitBtn}>
                <Text style={{ color: "white", fontWeight: "600" }}>Save Changes</Text>
              </Pressable>
            </View>
          )}
        </Formik>
                    <ModalLoading verify={isSubmitting?.uploadingMOI} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
    backgroundColor: "#FAFAFA",
  },
  error: { color: "red", fontSize: 12, marginTop: 3 },
  imageWrapper: {
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 3,
  },
  addBtn: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADADA",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 30,
  },
  backButton: {
        backgroundColor: "#DFE2E880",
        padding: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center"
    },
    nameIdentifier: {
        color: "#101011",
        fontSize: 20,
        marginTop: 32,
    },
});
