import React, { FC, MutableRefObject } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Text, View } from 'react-native';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { useRef } from 'react';

interface HiddenTextInputProps {
  setPinReady: (pinReady: boolean) => void;
  code: string;
  setCode: (code: string) => void;
  maxLength: number;
  handleOnBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  textInputRef: MutableRefObject<TextInput | null>;
}

const HiddenTextInput: FC<HiddenTextInputProps> = ({
  setPinReady,
  code,
  setCode,
  maxLength,
  handleOnBlur,
  textInputRef,
}) => {
  return (
    <View>
      <TextInput
        style={styles.TextInputOTP}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType='number-pad'
        returnKeyType='done'
        textContentType='oneTimeCode'
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputOTP: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default HiddenTextInput;
