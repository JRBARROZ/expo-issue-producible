import React from "react";
import { RefreshControl as Refresh } from "react-native";
import useTheme from "../../hooks/useTheme";

function RefreshControl({ refreshing, onRefresh, ...props }) {
  const theme = useTheme();

  return (
    <Refresh
      colors={[theme.colors.primary[200]]}
      tintColor={theme.colors.primary[200]}
      refreshing={refreshing}
      onRefresh={onRefresh}
      {...props}
    />
  );
}

export default RefreshControl;
