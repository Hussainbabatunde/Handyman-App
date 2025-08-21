import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomModalTypes {
  visible: boolean;
  newHeight: any;
  onRequestClose: any;
  tint: string;
  content: any;
}

const CustomModal: React.FC<CustomModalTypes> = ({ visible, newHeight, onRequestClose, tint, content }) => {
  const { width, height } = Dimensions.get("window");
  const CARD_WIDTH = width * 0.9;
  const CARD_HEIGHT = CARD_WIDTH;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <BlurView
        intensity={70}
        tint={tint ? tint : "dark"}
        style={{
          // padding: 10,
          // alignSelf: "center",
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          // top: "40%",
          zIndex: 1000,
          flexDirection: "row",
          alignSelf: "center",
          height: newHeight,
          width: width,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingBottom: 10,
        }}
      >
        {content}
      </BlurView>
    </Modal>
  );
};

export default CustomModal;
