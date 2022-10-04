import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import ImageComponent from "./components/ImageComponent";
import VideoComponent from "./components/VideoComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileComponent from "./components/ProfileComponent";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "black" },
          }}
          initialRouteName="Images"
          activeColor="#f0edf6"
          inactiveColor="#000000"
          barStyle={{ backgroundColor: "red" }}
          tabBarOptions={{
            KeyboardHidesTabBar: true,
            showLabel: false,
            activeTintColor: "white",
            style: {
              backgroundColor: "#000000", //color you want to change
            },
          }}
        >
          <Tab.Screen
            name="Images"
            component={ImageComponent}
            options={{
              tabBarLabel: "Images",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="image" color={color} size={30} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Videos"
            component={VideoComponent}
            options={{
              tabBarLabel: "videocamera",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="video" color={color} size={30} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileComponent}
            options={{
              tabBarLabel: "profile",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="snowman"
                  color={color}
                  size={30}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
