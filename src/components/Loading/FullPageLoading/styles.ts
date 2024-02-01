import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.secondary[0],
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      zIndex: 1000000,
    },
    message: {
      fontFamily: theme.typography.fonts.primary.semibold,
      fontSize: theme.typography.size.body,
      color: theme.colors.secondary[700],
      marginTop: 4,
    },
  });
};

export default styles;
