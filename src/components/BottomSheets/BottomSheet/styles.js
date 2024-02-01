import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    container: {
      backgroundColor: theme.colors.secondary[0],
      borderRadius: 12,
      ...theme.shadows[5],
    },
    contentContainer: {
      backgroundColor: theme.colors.secondary[0],
    },
    indicator: {
      backgroundColor: theme.colors.primary[200],
    },
  });
};

export default styles;
