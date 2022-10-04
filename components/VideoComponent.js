import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Video, AVPlaybackStatus, Audio } from "expo-av";
// import styles from "./styles";
import ButtonComp from "../components/Button/Button";
import colors from "../styles/colors";

const { width, height } = Dimensions.get("window");

export default function VideoComponent() {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [soundUri, setSoundUri] = useState(null);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
    setSound(sound);
    console.log("Playing Audio");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failes to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setSoundUri(uri);
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <ButtonComp
          type="dourado"
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComp
          type="black"
          title={recording ? "StopRecording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        />
      </View>
      <View style={styles.buttons}>
        {soundUri && (
          <ButtonComp type="white" title="Play Sound" onPress={playSound} />
        )}
      </View>
    </View>
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
});
