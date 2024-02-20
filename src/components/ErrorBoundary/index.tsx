/* eslint-disable no-console */
import React from "react";
import ErrorBoundary, { FallbackComponentProps } from "react-native-error-boundary";
import LottieView from "lottie-react-native";
import {
  AnimationContainer,
  Container,
  EmphasisMessage,
  ErrorViewer,
  Message,
  Title,
  Wrapper,
} from "./styles";
import errorAnimation from "../../animations/error.json";
import { MainButton } from "../Buttons";
import { IErrorBoundary } from "./types";

export default function CustomErrorBoundary({ children }: IErrorBoundary) {
  function FallbackComponent({ error, resetError }: FallbackComponentProps) {
    return (
      <Wrapper>
        <Container>
          <AnimationContainer>
            <LottieView
              autoPlay
              loop={false}
              source={errorAnimation}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </AnimationContainer>
          <Title>Ops, algo está errado...</Title>
        </Container>
        <Message>
          Ocorreu um erro interno no aplicativo, por favor, nos reporte o ocorrido assim que
          possível e tente novamente <EmphasisMessage>:D</EmphasisMessage>
        </Message>
        <MainButton onPress={resetError}>Tentar novamente</MainButton>
        <ErrorViewer>/{error.toString()}</ErrorViewer>
      </Wrapper>
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
