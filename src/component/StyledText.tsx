import React, { FC } from 'react';
import { Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import Colors from '../constants/Colors';

const fSize = (size: number | null) => size ? size : 18;
const attr = (fontFamily: string, color: any, size: any) => {
  return { fontFamily, color: (color ? color : Colors.dark), fontSize: fSize(size) }
}

export const TextThin: React.FC<PropsText> = ({ lineHeight, color, size, ...props }) => {
  return <Text {...props} style={[lineHeight && { lineHeight }, attr('Font-Thin', color, size), props.style]} />;
}

export const TextRegular: React.FC<PropsText> = ({ lineHeight, color, size, ...props }) => {
  return <Text {...props} style={[lineHeight && { lineHeight }, attr('Font-Regular', color, size), props.style]} />;
}

export const TextMedium: React.FC<PropsText> = ({ lineHeight, color, size, ...props }) => {
  return <Text {...props} style={[lineHeight && { lineHeight }, attr('Font-Medium',color, size), props.style]} />;
}

export const TextSemiBold: React.FC<PropsText> = ({ lineHeight, color, size, ...props }) => {
  return <Text {...props} style={[lineHeight && { lineHeight }, attr('Font-SemiBold',color, size), props.style]} />;
}

export const TextBold: React.FC<PropsText> = ({ lineHeight, color, size, ...props }) => {
  return <Text {...props} style={[lineHeight && { lineHeight }, attr('Font-Bold',color, size), props.style]} />;
}







