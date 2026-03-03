import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

import HomeScreen from "../screens/HomeScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MacroCalculatorScreen from "../screens/MacroCalculatorScreen";

/* =========================
   Profile Stack
========================= */

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="MacroCalculator" component={MacroCalculatorScreen} />
    </Stack.Navigator>
  );
}

/* =========================
   Swipe Tabs (Bottom Positioned)
========================= */

const Tab = createMaterialTopTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: { display: "none" },

        tabBarIcon: ({ focused }) => {
          let iconName: any;

          if (route.name === "Inventory") {
            iconName = focused ? "cube" : "cube-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? Colors.primary : "#9CA3AF"}
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

/* =========================
   Styles
========================= */

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 60,
    backgroundColor: Colors.card,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
});