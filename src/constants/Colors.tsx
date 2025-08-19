import React from 'react';
import { DefaultTheme } from '@react-navigation/native';

const primary = '#048297';
const secondary = '#000000';
const tint = '#045462';

export default {
  ...DefaultTheme.colors,
  tint,
  primary,
  primaryAlt: '#0E79B8',
  secondary,

  primaryDark: tint,
  primaryLight: '#3d5690',

  secondaryDark: '#b17700',
  secondaryAlt: '#1A4372',
  secondaryLight: '#ffd756',

  danger: '#EE343E',
  success: '#5CA50C',
  warning: '#eed202',
  text: '#000',
  textDark: '#5A5A5A',
  grayDark: '#666',
  grayLight: '#929DA5',
  mute: '#D8D8D8',
  title: '#666666',
  black: '#000',
  white: '#fff',
  border: '#D8D8D8', //DADADA
  borderLight:"#DADADA",
  bgForm:"#F6F6F6",
  gray:"#E9E9EA",
};

/* {
  "colors": Object {
    "background": "rgb(242, 242, 242)",
    "border": "rgb(216, 216, 216)",
    "card": "rgb(255, 255, 255)",
    "notification": "rgb(255, 59, 48)",
    "primary": "rgb(0, 122, 255)",
    "text": "rgb(28, 28, 30)",
  },
  "dark": false,
} */
