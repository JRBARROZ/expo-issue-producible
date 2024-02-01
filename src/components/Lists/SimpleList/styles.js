import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      gap: 12,
    },
    horizontalView: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
    },
    emptyContainer: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.colors.secondary[100],
    },
    emptyText: {
      color: theme.colors.secondary[500],
    },
    option: {
      color: theme.colors.secondary[600],
      maxWidth: '98%'
    },
    orded: {
      color: theme.colors.secondary[700],
    },
    unorded: {
      width: 5,
      height: 5,
      borderRadius: 5,
      backgroundColor: theme.colors.primary[200],
    },
  });
};

export default styles;
