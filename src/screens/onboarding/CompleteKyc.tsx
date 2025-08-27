import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Avatar from "../../../assets/images/avatar.png"
import { TextBold, TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AppContext from '../../context'
import { capitalize, getStatusColor } from '../../context/actions/utils'
import { OnboardContext } from '.'
import ModalLoading from '../../component/modals/ModalLoading'

const CompleteKyc = () => {
    const { dispatch, logoutUser, removeUserData, userData, jobTypes } =
        React.useContext<any>(AppContext);
    const [imgSize, setImgSize] = useState<number | null>(null)
    const [fileUploading, setFileUploading] = useState<any>(null)
    const {UploadDocmentApi, documentUpload, passportPhotograph, meansOfIdentification, address, isSubmitting, SubmitKycApiCall} = useContext<any>(OnboardContext)
    // console.log("userData: ", userData);

    const navigation = useNavigation<StackNavigationProp<any>>();
    const selectDoc = async () => {
        
        try {
            const doc = await DocumentPicker.getDocumentAsync({
                type: "*/*",
            })
            const formData = new FormData();
            const assets = doc.assets
            if (!assets) return
            const file = assets[0]
            const uploadingFile = {
                name: file.name,
                uri: file.uri,
                size: file.size,
                type: file.mimeType
            }
            let sentUpload = doc.assets[0]
            let imageUploadedSize: any = uploadingFile?.size
            let img = imageUploadedSize / (1024 * 1024)


            formData.append('file', uploadingFile)
            formData.append('name', "PassportPhotograph")
            if (img > 5) {
                Alert.alert('Image limit is 5MB')
            }
            else {
                setImgSize(img)
                await UploadDocmentApi(formData)
                setFileUploading(uploadingFile)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const selectDocMeansOfId = async () => {
        
        try {
            const doc = await DocumentPicker.getDocumentAsync({
                type: "*/*",
            })
            const formData = new FormData();
            const assets = doc.assets
            if (!assets) return
            const file = assets[0]
            const uploadingFile = {
                name: file.name,
                uri: file.uri,
                size: file.size,
                type: file.mimeType
            }
            let sentUpload = doc.assets[0]
            let imageUploadedSize: any = uploadingFile?.size
            let img = imageUploadedSize / (1024 * 1024)


            formData.append('file', uploadingFile)
            formData.append('name', "MeansOfIdentification")
            if (img > 5) {
                Alert.alert('Image limit is 5MB')
            }
            else {
                setImgSize(img)

                await UploadDocmentApi(formData)
                setFileUploading(uploadingFile)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={[styles.container, { paddingHorizontal: 21 }]}>
                    <TextBold style={{ color: "black", fontSize: 24 }}>Complete KYC</TextBold>
                    <TextRegular style={{ color: "#696969", fontSize: 16, marginBottom: 33 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque diam</TextRegular>
                    <Pressable onPress={selectDoc} style={[styles.rowView, { borderColor: passportPhotograph? "#FA4E61" : "#696969" }]}>
                        <View style={{ backgroundColor: passportPhotograph? "#FA4E6133" : "#D9D9D980", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 50, position: "relative" }}>
                            <Ionicons name="person-outline" size={20} color={passportPhotograph? "#FA4E61" : "#696969"} />
                        </View>
                        <View style={styles.rowDesc}>
                            <TextSemiBold style={[styles.topicView, {color: passportPhotograph? "#FA4E61" : "#696969"}]}>Passport photograph</TextSemiBold>
                            <TextRegular style={{color: passportPhotograph? "#FA4E61" : "#696969", fontSize: 12}}>Lorem ipsum dolor sit, adipiscing elit adipiscing.</TextRegular>
                        </View>
                            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color={passportPhotograph? "#FA4E61" : "#696969"} />
                    </Pressable>
                    {/* {fileUploading && <TextRegular style={{ fontSize: 12, color: "black" }}>Please wait, Uploading Image...</TextRegular>} */}

                    <Pressable onPress={selectDocMeansOfId} style={[styles.rowView, { borderColor: meansOfIdentification? "#FA4E61" : "#696969" }]}>
                        <View style={{ backgroundColor: meansOfIdentification? "#FA4E6133" :"#D9D9D980", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 50, position: "relative" }}>
                            <Ionicons name="shield-checkmark-outline" size={20} color={meansOfIdentification? "#FA4E61" : "#696969"} />
                        </View>
                        <View style={styles.rowDesc}>
                            <TextSemiBold style={[styles.topicView, {color:meansOfIdentification? "#FA4E61" : "#696969"}]}>Means of identification</TextSemiBold>
                            <TextRegular style={{color: meansOfIdentification? "#FA4E61" :"#696969", fontSize: 12}}>Lorem ipsum dolor sit, adipiscing elit adipiscing.</TextRegular>
                        </View>
                            <AntDesign name="upload" size={24} color={meansOfIdentification? "#FA4E61" :"#696969"} />
                    </Pressable>

                    <Pressable onPress={()=>{
                        navigation.navigate("OnboardStackScreen", {
          screen: "ContactAddress",
        });
                    }} style={[styles.rowView, { borderColor: address? "#FA4E61" :"#696969" }]}>
                        <View style={{ backgroundColor: address? "#FA4E6133" :"#D9D9D980", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 50, position: "relative" }}>
                            <EvilIcons name="location"  size={20} color={address? "#FA4E61" :"#696969"} />
                        </View>
                        <View style={styles.rowDesc}>
                            <TextSemiBold style={[styles.topicView, {color: address? "#FA4E61" :"#696969"}]}>Contact address</TextSemiBold>
                            <TextRegular style={{color: address? "#FA4E61" :"#696969", fontSize: 12}}>Lorem ipsum dolor sit, adipiscing elit adipiscing.</TextRegular>
                        </View>
                            <AntDesign name="arrowright" size={24} color={address? "#FA4E61" :"#696969"} />
                    </Pressable>

                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        {(passportPhotograph && meansOfIdentification && address) && <Pressable onPress={async () =>{
                            console.log("documents: ", documentUpload, address);
                            await SubmitKycApiCall()
                            //                  navigation.navigate("TabNavigation", {
                            //   screen: "DashboardNavigation",
                            //   params: {
                            //     screen: "Dashboard",
                            //   },
                            // })
                            }} style={{backgroundColor: "black", paddingHorizontal: 60, paddingVertical: 13, borderRadius: 25, marginTop: 39}}>
                                            <TextMedium style={{color: "white", fontSize: 15, }}>Continue to dashboard</TextMedium>
                                        </Pressable>}
                    </View>
                    <ModalLoading verify={isSubmitting?.uploadingMOI} />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CompleteKyc

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    nameNotifyView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    profileView: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    nameHelpView: {
        marginLeft: 12
    },
    searchBar: {
        borderWidth: 1,
        borderColor: "#DADADA",
        paddingHorizontal: 15,
        paddingVertical: 13,
        marginTop: 22,
        borderRadius: 5,
        backgroundColor: "#FBFBFB",
        flexDirection: "row",
        alignItems: "center"
    },
    rowView: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 6,
        padding: 14,
        marginTop: 16,
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    rowDesc: {
        flex: 1
    },
    topicView : {
        fontSize: 14
    }
})