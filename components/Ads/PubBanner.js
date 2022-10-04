import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
} from "expo-ads-admob";

export default PubBanner = () => {
  return (
    <>
      <PublisherBanner
        bannerSize="smartBannerLandscape"
        adUnitID="ca-app-pub-7859617991614281/1494018600" // Test ID, Replace with your-admob-unit-id
      />
    </>
  );
};
