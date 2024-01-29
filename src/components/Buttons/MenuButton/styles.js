import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondary[0],
      borderRadius: 12,
      width: 180,
      height: 150,
      ...theme.shadows[1],
    },
    icon_container: {
      flex: 1.3,
      backgroundColor: theme.colors.primary[200],
      alignItems: "center",
      justifyContent: "flex-end",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    title: {
      position: "absolute",
      alignSelf: "center",
      top: "50%",
      fontSize: theme.typography.size.medium,
      color: theme.colors.secondary[600],
      fontWeight: "600",
      textAlign: "center",
    },
    screenIcon: {
      alignSelf: "center",
      padding: 6,
    },
    opacityIcon: {
      padding: 6,
      position: "absolute",
      opacity: 0.1,
      alignSelf: "center",
      transform: [
        {
          rotate: "10deg",
        },
      ],
    },
    secondaryContainer: {
      flex: 1.5,
    },
    titleContainer: {
      flex: 1,
    },
    rowContainer: {
      flex: 1,
      flexDirection: "row",
    },
  });
};

export default styles;
