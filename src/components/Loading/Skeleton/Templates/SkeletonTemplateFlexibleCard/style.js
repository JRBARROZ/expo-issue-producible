import { StyleSheet } from "react-native";
import useTheme from "../../../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 10,
      paddingVertical: 16,
      borderRadius: 10,
      height: 160,
      zIndex: 999,
      width: "100%",
      alignSelf: "center",
      backgroundColor: theme.colors.secondary[0],
      ...theme.shadows[1],
    },
    smallTextContainer: {
      width: "100%",
      backgroundColor: theme.colors.secondary[200],
    },
    titleTextContainer: {
      height: 34,
      backgroundColor: theme.colors.secondary[200],
    },
    profileContainer: {
      height: 76,
      width: 46,
      backgroundColor: theme.colors.secondary[200],
      position: "absolute",
      right: 0,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 140,
      borderBottomRightRadius: 20,
    },
    containerPrimarySeparator: {
      gap: 14,
    },
    containerSecondarySeparator: {
      gap: 8,
    },
  });
};

export default styles;
