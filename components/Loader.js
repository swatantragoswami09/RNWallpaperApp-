import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Loader = () => {
  return (
    <>
      <TouchableOpacity>
        <View>
          <ActivityIndicator size="large" color="grey" />

          <StatusBar style="auto" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Loader;
