import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      position: "relative",
      backgroundColor: theme.colors.secondary[0],
      paddingHorizontal: 12,
      paddingVertical: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.secondary[100],
      ...theme.shadows[1],
      rowGap: 2,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 8,
    },
    title: {
      fontSize: theme.typography.size.regular,
      marginRight: 80,
      marginBottom: 6,
    },
    semibold: {
      fontFamily: theme.typography.fonts.primary.semibold,
    },
    description: {
      fontFamily: theme.typography.fonts.primary.normal,
      fontSize: theme.typography.size.body,
      color: theme.colors.text[600],
      flex: 1,
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      borderTopWidth: 1,
      borderColor: theme.colors.secondary[200],
      paddingTop: 12,
      marginTop: 12,
    },
    iconContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      width: 80,
      height: 70,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 100,
    },
    icon: {
      position: "absolute",
      top: 8,
      right: 12,
    },
  });
};

export default styles;
