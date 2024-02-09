import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      rowGap: 10,
      paddingHorizontal: 8,
    },
    slide: {
      position: "absolute",
      top: -6,
      width: 20,
      height: 20,
      borderRadius: 100,
      backgroundColor: theme.colors.primary[200],
    },
    slideTrack: {
      position: "relative",
      height: 8,
      borderRadius: 100,
      backgroundColor: theme.colors.secondary[200],
    },
    fillTrack: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 8,
      borderRadius: 100,
      backgroundColor: theme.colors.primary[200],
    },
    sliderLabel: {
      position: "absolute",
      top: -46,
      minWidth: 38,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 1,
      textAlign: "center",
      backgroundColor: theme.colors.secondary[0],
      borderWidth: 1,
      borderColor: theme.colors.secondary[300],
      ...theme.shadows[2].mobile,
      fontFamily: theme.typography.fonts.primary.semibold,
      fontSize: theme.typography.size.caption,
      color: theme.colors.text[700],
    },
  });
};

export default styles;
