import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    button: {
      borderRadius: theme.shape.borderRadius,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: theme.shape.padding,
      height: 64,
      width: "100%",
    },
    text: {
      fontSize: theme.typography.size.body,
      fontFamily: theme.typography.fonts.primary.semibold,
      textTransform: "uppercase",
    },
    disabled: {
      opacity: theme.shape.opacity,
    },
  });
};

export default styles;
