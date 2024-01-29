import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";

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
