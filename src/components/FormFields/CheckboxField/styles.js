import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      rowGap: 6,
    },
    list: {
      gap: 8,
      flexWrap: "wrap",
    },
    option: {
      columnGap: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    disableOption: {
      opacity: theme.shape.opacity,
    },
    optionText: {
      fontFamily: theme.typography.fonts.primary.medium,
      fontSize: theme.typography.size.caption,
      color: theme.colors.secondary[600],
    },
    optionInput: {
      padding: 2,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.colors.secondary[400],
    },
    disableOptionInput: {
      opacity: theme.shape.opacity,
    },
    errorOptionInput: {
      borderColor: theme.colors.error[400],
    },
    selectedOptionInput: {
      borderColor: theme.colors.primary[200],
      backgroundColor: theme.colors.primary[200],
    },
  });
};

export default styles;
