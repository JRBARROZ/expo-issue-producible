import React, { useContext } from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { GlobalContext } from "../../../contexts/GlobalContext";
import heartBeat from "../../../animations/heart-beat.json";
import styles from "./styles";

function FullPageLoading() {
  const loadingStyles = styles();

  const {
    loadingConfig: { isLoading, message, opacity = 0.9 },
  } = useContext(GlobalContext)!;

  if (!isLoading) return null;

  return (
    <View style={{ ...loadingStyles.loadingContainer, opacity }}>
      <LottieView
        autoPlay
        source={heartBeat}
        style={{
          width: 300,
          height: 300,
        }}
      />
      {message && <Text style={loadingStyles.message}>{message}</Text>}
    </View>
  );
}

export default FullPageLoading;
