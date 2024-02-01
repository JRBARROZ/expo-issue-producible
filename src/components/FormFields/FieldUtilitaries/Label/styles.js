import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    label: {
      fontFamily: theme.typography.fonts.primary.semibold,
      fontSize: theme.typography.size.body,
      color: theme.colors.text[600],
    },
    required: {
      color: theme.colors.error[600],
    },
    disabled: {
      opacity: theme.shape.opacity,
    },
    error: {
      color: theme.colors.error[400],
    },
  });
};

export default styles;
