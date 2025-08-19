import { Dimensions, Platform, StatusBar } from 'react-native';
import Constants from "expo-constants";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusBarHeight = Constants.statusBarHeight;
//const statusBarHeight = StatusBar.currentHeight;
const appBarHeight = Platform.OS === 'ios' ? 44 : 56;
const tabBarHeight = 50;
const barsTabHeight = (tabBarHeight + statusBarHeight + appBarHeight);
const barsHeight = (statusBarHeight + appBarHeight);

export default {
  window: {
    width,
    height,
    barsTabHeight,
    barsHeight
  },
  isSmallDevice: width < 375,
  statusBarHeight,
  appBarHeight,
  barsHeight,
  statusAppBarHeight: (statusBarHeight + appBarHeight),
  windowPadding: 15,
  windowMargin: 15,
  layoutPadding: 15,
  s: 20,
  s25: 25,
  s30: 30,
  s35: 35,
  tabBarHeight,
};


