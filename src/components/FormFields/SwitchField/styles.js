import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      rowGap: 6,
      paddingVertical: 4,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 6,
    },
    input: {
      position: "relative",
      width: 48,
      height: 18,
      borderRadius: 100,
      borderWidth: 1.5,
    },
    slide: {
      position: "absolute",
      top: -6,
      width: 26,
      height: 26,
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: theme.colors.secondary[0],
      borderColor: theme.colors.secondary[300],
      ...theme.shadows[2],
    },
    error: {
      borderColor: theme.colors.error[400],
    },
  });
};

export default styles;
