import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import { PubBanner } from "../components/Ads/index";

const { height, width } = Dimensions.get("window");

const ImageComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  const loadWallpapers = () => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?count=30&client_id=thc1hEb-BPWhMDp12Wv8ZfYDoO9QzA9_oxLIFEEY8Wo"
      )
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log("request completed"));
  };
  useEffect(() => {
    loadWallpapers();
  }, []);

  const intestitialAds = async () => {
    await AdMobInterstitial.setAdUnitID(
      "ca-app-pub-7859617991614281/3971734406"
    ); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  };
  const renderItem = (image) => {
    return (
      <View style={{ height, width }}>
        <PubBanner />
        <Image
          style={{
            flex: 1,
            borderRadius: 16,
          }}
          source={{ uri: image.urls.regular }}
          resizeMode="cover"
        />
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <TouchableOpacity onPress={() => console.log("hi there")}>
          <View
            style={{
              flex: 1,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="grey" />
            <StatusBar style="auto" />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <FlatList
            horizontal
            pagingEnabled
            data={images}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({});
