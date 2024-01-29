import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default function Label({ children, required, disabled, error }) {
  const labelStyles = styles();

  if (!children) return null;

  return (
    <Text style={[labelStyles.label, disabled && labelStyles.disabled, error && labelStyles.error]}>
      {children}
      <Text style={labelStyles.required}>{required && " *"}</Text>
    </Text>
  );
}
