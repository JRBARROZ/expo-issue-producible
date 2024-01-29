import React from "react";
import { Text } from "react-native";
import styles from "./styles";

function EmptyComponent({ emptyMessage }) {
  const screenStyles = styles();

  return <Text style={screenStyles.emptyMessage}>{emptyMessage || "Nenhum item encontrado"}</Text>;
}

export default EmptyComponent;
