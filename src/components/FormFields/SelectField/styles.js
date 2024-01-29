import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    optionContainer: {
      padding: theme.shape.padding,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.secondary[200],
    },
    optionLabel: {
      fontFamily: theme.typography.fonts.primary.medium,
      fontSize: theme.typography.size.body,
      color: theme.colors.secondary[600],
    },
    optionsContainer: {
      flexWrap: "wrap",
      width: "100%",
      paddingVertical: 2,
      flexDirection: "row",
      gap: 8,
    },
  });
};

export default styles;
