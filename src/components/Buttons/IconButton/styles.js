import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    button: {
      borderRadius: 100,
      alignSelf: "flex-start",
    },
    focus: {
      backgroundColor: theme.colors.secondary[300],
    },
  });
};

export default styles;
