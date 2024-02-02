import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    listContainer: {
      width: "100%",
      backgroundColor: theme.colors.secondary[100],
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      maxHeight: 200,
    },
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
    optionTag: {
      borderWidth: 1,
      borderColor: theme.colors.secondary[200],
      backgroundColor: theme.colors.secondary[100],
      borderRadius: theme.shape.borderRadius,
      padding: 8,
      alignItems: "center",
      flexDirection: "row",
      gap: 4,
    },
    optionTagLabel: {
      fontSize: theme.typography.size.caption,
      fontFamily: theme.typography.fonts.primary.medium,
      color: theme.colors.text[700],
    },
  });
};

export default styles;
