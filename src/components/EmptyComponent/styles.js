import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    emptyMessage: {
      borderRadius: theme.shape.borderRadius,
      padding: theme.shape.padding,
      backgroundColor: theme.colors.secondary[100],
      fontFamily: theme.typography.fonts.primary.normal,
      fontSize: theme.typography.size.body,
      color: theme.colors.secondary[600],
    },
  });
};

export default styles;
