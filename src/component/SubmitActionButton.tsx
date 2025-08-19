import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
// import { TextBold, TextSemiBold } from "../components/StyledText";

type AuthSubmitButtonProps = {
  handleSubmit: () => void; // Change the type accordingly based on the actual function signature
  marginTOP: string | number;
};

function AuthSubmitButton({
  handleSubmit,
  marginTOP,
  confirm,
  loading,
  title,
  buttonColor,
  loadColor,
  textColor
}: {
  handleSubmit: any;
  marginTOP: string | number;
  confirm: boolean;
  loading: boolean;
  title: string;
  buttonColor: string;
  loadColor: string;
  textColor: string;
}) {
  return (
    <Pressable
      style={{
        paddingVertical: 15,
        backgroundColor: confirm ? buttonColor : "#33ba76",
        borderRadius: 25,
        width: "100%",
        marginTop: marginTOP,
        opacity: confirm ? 1 : 0.3,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={handleSubmit}
      disabled={!confirm}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled: !confirm, busy: loading }}
      accessibilityLabel={title}
    >
      {loading == true ? (
        <ActivityIndicator size="small" color={loadColor} />
      ) : (
        <Text
          style={{
            color: confirm ? textColor: "#a5a5a7",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

export default AuthSubmitButton;

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
