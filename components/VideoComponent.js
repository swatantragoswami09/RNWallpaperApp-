import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import { Video, AVPlaybackStatus, Audio } from "expo-av";
// import styles from "./styles";

import colors from "../styles/colors";
import axios from "axios";
import Loader from "./Loader";
import PubBanner from "./Ads/PubBanner";

const { width, height } = Dimensions.get("window");

export default function VideoComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videos, setVideos] = useState([]);

  const loadVideos = async () => {
    await axios
      .get(
        "https://pixabay.com/api/videos/?key=20975437-39656bc8d47744a6bb3aca546&q=yellow+flowers"
      )
      .then((res) => {
        setVideos(res.data.hits);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("request completed"));
  };

  useEffect(() => {
    loadVideos();
  }, []);
  const renderItem = (videos) => {
    return (
      <View
        style={{
          height: height,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width,
        }}
      >
        <PubBanner />
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videos.videos.small.url,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping={true}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <FlatList
            horizontal
            pagingEnabled
            data={videos}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 320,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonControll: {
    backgroundColor: colors.marrom,
  },
  videoStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
});
