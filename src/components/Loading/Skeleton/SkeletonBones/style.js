import { StyleSheet } from "react-native";

const styles = () => {
  return StyleSheet.create({
    skeleton: {
      width: "80%",
      height: "100%",
      opacity: 0.7,
    },
    gradient: {
      zIndex: -1,
      width: "100%",
      height: "100%",
    },
    containerSkeleton: {
      height: 20,
      borderRadius: 6,
      overflow: "hidden",
    },
  });
};

export default styles;
