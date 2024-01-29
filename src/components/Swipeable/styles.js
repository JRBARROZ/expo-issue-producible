import { StyleSheet } from "react-native";

const styles = () => {
  return StyleSheet.create({
    actionsContainer: {
      width: "100%",
      height: "100%",
      position: "absolute",
      right: 0,
      bottom: 0,
      zIndex: -1000,
      justifyContent: "flex-end",
      flexDirection: "row",
      borderRadius: 12,
    },
    swipeable: {
      position: "relative",
    },
  });
};

export default styles;
