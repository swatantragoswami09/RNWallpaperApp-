import { View, Text } from "react-native";
import React from "react";
import { Video } from "expo-av";

const ProfileComponent = () => {
  return (
    <View>
      <Video
        // ref={video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        // useNativeControls
        // resizeMode="contain"
        // isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default ProfileComponent;
