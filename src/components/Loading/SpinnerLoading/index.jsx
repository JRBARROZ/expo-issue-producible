import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

function SpinnerLoading({ ...props }) {
  const theme = useTheme();

  return <ActivityIndicator color={theme.colors.primary[200]} size="large" {...props} />;
}

export default SpinnerLoading;
