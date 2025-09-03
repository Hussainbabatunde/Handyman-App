import { Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { Entypo, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { TextBold, TextMedium, TextRegular, TextSemiBold } from '../../component/StyledText'
import AppContext from '../../context'
import { capitalize } from '../../context/actions/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'
import StarRating from '../../component/StarRating'
import ModalLoading from '../../component/modals/ModalLoading'
import { DashboardContext } from './DashboardStack'

const ArtisanDetails = () => {
    const { userData, dispatch, logoutUser } = useContext<any>(AppContext)
    const navigation = useNavigation<StackNavigationProp<any>>();
    let img = "yuu"
                const {isSubmitting, getArtisanByProfessionApiCall, allArtisanByProfession, createBookingApiCall} = useContext<any>(DashboardContext)
                const route = useRoute<any>();
                const {artisanDetail} = route.params;
    // console.log("artisanDetail: ", artisanDetail);

    const logoutOnSubmit = React.useCallback(async () => {
        await logoutUser(dispatch);
    }, []);

    const images = [
        "https://runnershive.s3.eu-west-1.amazonaws.com/Ellipse%2031-Xo4UJRN5hQ.png",
        "https://runnershive.s3.eu-west-1.amazonaws.com/Group 448-tk4ND0Pm7T.png",
        "https://runnershive.s3.eu-west-1.amazonaws.com/Group 449-Pw7ZtRS9R1.png",
        "https://runnershive.s3.eu-west-1.amazonaws.com/Ellipse%2031-Xo4UJRN5hQ.png",
        "https://runnershive.s3.eu-west-1.amazonaws.com/Group 449-Pw7ZtRS9R1.png",
        "https://runnershive.s3.eu-west-1.amazonaws.com/Ellipse%2031-Xo4UJRN5hQ.png",
        "https://runnershive.s3.eu-west-1.amazonaws.com/Ellipse%2031-Xo4UJRN5hQ.png",
    ];

    const [visible, setVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setVisible(true);
    };

    const closeModal = () => setVisible(false);

    const nextImage = () => {
        if (currentIndex < artisanDetail?.previousWork?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}>
                    {artisanDetail?.profileImg ?
                        <Image source={{ uri: artisanDetail?.profileImg ? artisanDetail?.profileImg : "https://runnershive.s3.eu-west-1.amazonaws.com/Portrait_Placeholder-lnhuBpImRh.png" }} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 50 }} />
                        :
                        <View style={{ backgroundColor: "#D9D9D980", paddingHorizontal: 26, paddingVertical: 24, borderRadius: 50, position: "relative" }}>
                            <Ionicons name="person-outline" size={32} color="#FA4E61" />
                        </View>}
                    <TextBold style={{color: "#FA4E61", marginTop: 10, fontSize: 18}}>{capitalize(artisanDetail?.firstName)} {capitalize(artisanDetail?.lastName)}</TextBold>
                    {/* <TextBold style={{ color: "#FA4E61", marginTop: 10, fontSize: 18 }}>samson king</TextBold> */}
                    {/* <TextRegular style={{color: "black", fontSize: 14}}>{userData?.data?.email ?? userData?.user?.email}</TextRegular> */}
                    {/* <TextRegular style={{color: "black", fontSize: 14}}>jip@gmail.com</TextRegular> */}
                    <StarRating rating={artisanDetail?.stars} />
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Pressable onPress={async () => {
                            await createBookingApiCall(artisanDetail?.id, allArtisanByProfession?.jobType?.id)
                        }} style={{ backgroundColor: "#FA4E61", paddingHorizontal: 30, paddingVertical: 5, borderRadius: 25, marginTop: 10 }}>
                            <TextMedium style={{ color: "white", fontSize: 15, }}>Assign task</TextMedium>
                        </Pressable>
                    </View>
                </View>

                <TextSemiBold style={{ color: "#9999A3", fontSize: 12, marginTop: 20 }}>Details</TextSemiBold>
                <Pressable style={{ paddingVertical: 18, flexDirection: "row" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Feather name="phone" size={20} color="black" />
                        <TextMedium style={{ color: "black", fontSize: 15, marginLeft: 15 }}>{artisanDetail?.phoneNumber}</TextMedium>
                    </View>
                    {/* <FontAwesome5 name="chevron-right" size={16} color="black" /> */}
                </Pressable>
                <Pressable style={{ paddingVertical: 18, flexDirection: "row" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <MaterialIcons name="email" size={18} color="black" />
                        <TextMedium style={{ color: "black", fontSize: 15, marginLeft: 15 }}>{artisanDetail?.email}</TextMedium>
                    </View>
                    {/* <FontAwesome5 name="chevron-right" size={16} color="black" /> */}
                </Pressable>

                <TextSemiBold style={{ color: "#9999A3", fontSize: 12, marginTop: 20 }}>Works</TextSemiBold>
                <View style={{ flexDirection: "row", gap: 5, marginTop: 15, flexWrap: "wrap" }}>
                    {artisanDetail?.previousWork && artisanDetail?.previousWork?.map((uri: "string", index: number) => (
                        <TouchableOpacity key={index} onPress={() => openModal(index)}>
                            <Image source={{ uri }} style={{ width: 100, height: 80, margin: 3 }} />
                        </TouchableOpacity>
                    ))}

                    {/* Modal for full screen image */}
                    {artisanDetail?.previousWork && <Modal visible={visible} transparent animationType="fade">
                        <View style={styles.modalBackground}>
                            {/* Close button */}
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Ionicons name="close" size={30} color="white" />
                            </TouchableOpacity>

                            {/* Current Image */}
                            <Image
                                source={{ uri: artisanDetail?.previousWork[currentIndex] }}
                                style={styles.fullImage}
                                resizeMode="contain"
                            />

                            {/* Bottom navigation bar */}
                            <View style={styles.bottomControls}>
                                {/* Prev button */}
                                <TouchableOpacity disabled={currentIndex === 0} onPress={prevImage}>
                                    <Ionicons
                                        name="chevron-back-circle"
                                        size={50}
                                        color={currentIndex === 0 ? "gray" : "white"}
                                    />
                                </TouchableOpacity>

                                {/* Next button */}
                                <TouchableOpacity
                                    disabled={currentIndex === artisanDetail?.previousWork?.length - 1}
                                    onPress={nextImage}
                                >
                                    <Ionicons
                                        name="chevron-forward-circle"
                                        size={50}
                                        color={currentIndex === artisanDetail?.previousWork?.length - 1 ? "gray" : "white"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>}

                </View>
                <ModalLoading verify={isSubmitting?.createBooking} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ArtisanDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 21
    },
    backButton: {
        backgroundColor: "#DFE2E880",
        padding: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center"
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: "90%",
        height: "70%",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 10,
    },
    leftArrow: {
        position: "absolute",
        left: 20,
        top: "50%",
    },
    rightArrow: {
        position: "absolute",
        right: 20,
        top: "50%",
    },
    bottomControls: {
        position: "absolute",
        bottom: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
})