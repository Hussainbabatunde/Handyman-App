import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Image,
  Modal,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useState } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TextMedium, TextSemiBold } from "../component/StyledText";
import DashboardNavigation from "../screens/Dashboard/DashboardStack";
import BookingsNavigation from "../screens/Bookings/BookingsStack";

const Tab = createBottomTabNavigator();

// Helper function to get the actual route name
const getActiveRouteName = (route: any) => {
  const nestedRouteName = getFocusedRouteNameFromRoute(route);
  const routeName = nestedRouteName ?? route.name;
  
  // Map tab navigator names to their default/main screen names
  const routeMapping: any = {
    'BookingsNavigation': 'Bookings',
    'ExchangeNavigation': 'Exchange', 
    'TransactionNavigation': 'Transaction',
    'DashboardNavigation': 'Dashboard'
  };
  
  // If we only have the navigator name, map it to the expected screen name
  if (routeMapping[routeName]) {
    return routeMapping[routeName];
  }
  
  return routeName;
};

function TabNavigation() {
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [signoutModalVisible, setSignoutModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, }}>
      <Tab.Navigator
        tabBar={(props) => {
          const currentTabRoute = props.state.routes[props.state.index];
          const routeName = getActiveRouteName(currentTabRoute);
          
          // console.log("Active tab:", currentTabRoute.name);
          console.log("Resolved routeName:", routeName);
          
          // Handle StatusBar changes
          if(routeName === 'Dashboard'){
            StatusBar.setBackgroundColor("#B8FE60", true);
            StatusBar.setTranslucent(true);
            StatusBar.setBarStyle("dark-content", true);
          }
          if(routeName === "SendMoney"){
            StatusBar.setBackgroundColor("#fff", true);
            StatusBar.setTranslucent(true);
            StatusBar.setBarStyle("dark-content", true);
          }
          
          // Define which routes should show the tab bar
          const tabBarVisibleRoutes = ['Dashboard', 'Bookings', 'Exchange', 'Transaction'];
          
          // Hide tab bar for specific routes
          if (!tabBarVisibleRoutes.includes(routeName)) {
            return null;
          }
        
          return (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: "white",
                height: "auto",
                paddingVertical: 20,
                borderWidth: 1, 
                borderColor: "#938F96"
              }}>
              {props.state.routes.map((route, index) => {
                const { options } = props.descriptors[route.key];
                const label = options.title ?? route.name;
        
                const isFocused = props.state.index === index;
        
                // Dynamically pick icons/text per route
                let iconSource;
                let textLabel;
        
                switch (route.name) {
                  case "DashboardNavigation":
                    iconSource = isFocused
                      ? require("../../assets/images/activeHome.png")
                      : require("../../assets/images/inactiveHome.png");
                    textLabel = "Home";
                    break;
                  case "BookingsNavigation":
                    iconSource = isFocused
                      ? require("../../assets/images/activeBookings.png")
                      : require("../../assets/images/inactiveBookings.png");
                    textLabel = "Bookings";
                    break;
                  // case "TransactionNavigation":
                  //   iconSource = isFocused
                  //     ? require("../assets/images/TransactionTabActive.png")
                  //     : require("../assets/images/TransactionTabInactive.png");
                  //   textLabel = "Transaction";
                  //   break;
                  // case "ProfileNavigation":
                  //   iconSource = isFocused
                  //     ? require("../assets/images/ProfileTabActive.png")
                  //     : require("../assets/images/ProfileTabInactive.png");
                  //   textLabel = "Profile";
                  //   break;
                  default:
                    break;
                }
        
                return (
                  <TouchableOpacity
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    onPress={() => props.navigation.navigate(route.name)}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={iconSource}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <TextSemiBold
                      style={{ color: isFocused ? "#E13548" : "#646568", fontSize: 12, marginTop: 5 }}
                    >
                      {textLabel}
                    </TextSemiBold>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      >
        <Tab.Screen
          name="DashboardNavigation"
          component={DashboardNavigation}
          options={{
            title: "Home",
            headerShown: false,
            tabBarActiveTintColor: "#33BA76",
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={
                  focused
                      ? require("../../assets/images/activeHome.png")
                      : require("../../assets/images/inactiveHome.png")
                }
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ),
            tabBarLabel: ({ focused, color }) => (
              <TextMedium
                style={{ color: focused ? "#E13548" : "#646568", fontSize: 12, paddingBottom: 10 }}
              >
                Home
              </TextMedium>
            ),
          }}
        />
        <Tab.Screen
          name="BookingsNavigation"
          component={BookingsNavigation}
          options={{
            title: "Bookings",
            headerShown: false,
            tabBarActiveTintColor: "#33BA76",
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={
                  focused
                      ? require("../../assets/images/activeHome.png")
                      : require("../../assets/images/inactiveHome.png")
                }
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ),
            tabBarLabel: ({ focused, color }) => (
              <TextMedium
                style={{ color: focused ? "#E13548" : "#646568", fontSize: 12, paddingBottom: 10 }}
              >
                Bookings
              </TextMedium>
            ),
          }}
        />
        {/* <Tab.Screen
          name="ExchangeNavigation"
          component={ExchangeNavigation}
          options={{
            title: "Exchange",
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
}

export default TabNavigation;