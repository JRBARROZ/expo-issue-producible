import { StyleSheet, Dimensions } from "react-native";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    alertContainer: {
      backgroundColor: theme.colors.secondary[0],
      width: Dimensions.get("window").width * 0.9,
      elevation: 10,
      padding: theme.shape.padding,
      borderRadius: 8,
      gap: 12,
    },
    messageContainer: {
      alignItems: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    boldText: {
      fontFamily: theme.typography.fonts.primary.semibold,
      color: theme.colors.secondary[700],
    },
    messageText: {
      color: theme.colors.secondary[500],
      fontFamily: theme.typography.fonts.primary.normal,
      fontSize: theme.typography.size.body,
      marginBottom: 4,
    },
    titleText: {
      color: theme.colors.secondary[900],
      fontFamily: theme.typography.fonts.primary.normal,
      fontSize: theme.typography.size.regular,
      marginBottom: 4,
    },
    button: {
      width: "40%",
      height: 42,
    },
    textButton: {
      fontSize: theme.typography.size.body,
    },
    closeButton: {
      position: "absolute",
      padding: 0,
      alignSelf: "flex-end",
      top: 0,
      right: 10,
    },
    majorCircleView: {
      backgroundColor: "rgba(252, 165, 165, 0.1)",
      padding: 8,
      borderRadius: 64 / 2,
    },
    minorCircleView: {
      backgroundColor: "rgba(252, 165, 165, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 42 / 2,
      width: 42,
      height: 42,
    },
  });
};

export default styles;
