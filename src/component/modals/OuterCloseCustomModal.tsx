import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomModalTypes {
  visible: boolean;
  newHeight: any;
  onRequestClose: any;
  tint: string;
  content: any;
  onPressOutside: any
}

const OuterCloseCustomModal = ({ visible, onRequestClose, newHeight, tint, content, onPressOutside }: CustomModalTypes) => {

  // console.log('onPress outside ');
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView
          style={[styles.blurView, { height: newHeight }]}
          intensity={100}
          tint={tint}
        />
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.dismissibleArea} />
        </TouchableWithoutFeedback>
        <View style={styles.contentContainer}>
          {content}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  blurView: {
    position: 'absolute',
    width: '100%',
  },
  dismissibleArea: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default OuterCloseCustomModal;