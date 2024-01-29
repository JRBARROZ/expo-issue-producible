/* eslint-disable no-console */
import React from "react";
import { Text, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import LottieView from "lottie-react-native";
import styles from "./styles";
import errorAnimation from "../../animations/error.json";
import { MainButton } from "../Buttons";

export default function CustomErrorBoundary({ children }) {
  const errorStyles = styles();

  function FallbackComponent({ error, resetError }) {
    return (
      <View style={errorStyles.wrapper}>
        <View style={errorStyles.container}>
          <View
            style={{
              borderRadius: 250,
              width: 250,
              height: 250,
              overflow: "hidden",
            }}
          >
            <LottieView
              autoPlay
              loop={false}
              source={errorAnimation}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Text style={errorStyles.title}>Ops, algo está errado...</Text>
        </View>
        <Text style={errorStyles.message}>
          Ocorreu um erro interno no aplicativo, por favor, nos reporte o ocorrido assim que
          possível e tente novamente <Text style={errorStyles.semibold}>:D</Text>
        </Text>
        <MainButton onPress={resetError}>Tentar novamente</MainButton>
        <Text style={errorStyles.error}>{error.toString()}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary
      onError={(error) => {
        console.log(`
          ========== SYSTEM ERROR ==========
          ${error}
          ==================================
        `);
      }}
      FallbackComponent={FallbackComponent}
    >
      {children}
    </ErrorBoundary>
  );
}
