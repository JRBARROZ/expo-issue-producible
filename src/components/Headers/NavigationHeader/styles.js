import { StyleSheet } from "react-native";

import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary[200],
      paddingRight: 24,
      paddingLeft: 16,
      paddingTop: 48,
      paddingBottom: 18,
    },
    title: {
      fontSize: theme.typography.size.regular,
      fontFamily: theme.typography.fonts.primary.medium,
      color: theme.colors.secondary[0],
    },
    horizontalView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    iconContainer: {
      backgroundColor: theme.colors.primary[100],
      paddingVertical: 8,
      paddingLeft: 12,
      paddingRight: 4,
      borderRadius: 100,
    },
  });
};

export default styles;
