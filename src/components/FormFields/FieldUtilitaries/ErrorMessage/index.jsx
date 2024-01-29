import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default function Label({ children }) {
  const errorMessageStyles = styles();

  if (!children) return null;

  return <Text style={errorMessageStyles.message}>{children}</Text>;
}
