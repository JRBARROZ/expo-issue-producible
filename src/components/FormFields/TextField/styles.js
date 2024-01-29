import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      rowGap: 6,
      position: "relative",
    },
    input: {
      height: 64,
      paddingHorizontal: 12,
      borderWidth: 1.5,
      borderColor: theme.colors.secondary[300],
      borderRadius: theme.shape.borderRadius,
      color: theme.colors.text[600],
      fontFamily: theme.typography.fonts.primary.medium,
      backgroundColor: theme.colors.secondary[100],
    },
    textArea: {
      paddingVertical: 12,
      textAlignVertical: "top",
    },
    inputWithLeftIcon: {
      paddingLeft: 46,
    },
    inputWithRightIcon: {
      paddingRight: 46,
    },
    focus: {
      borderColor: theme.colors.primary[200],
    },
    disabled: {
      opacity: theme.shape.opacity,
    },
    error: {
      borderColor: theme.colors.error[400],
    },
    leftIcon: {
      position: "absolute",
      bottom: 18,
      left: 6,
    },
    rightIcon: {
      position: "absolute",
      bottom: 18,
      right: 6,
    },
  });
};

export default styles;
