import { StyleSheet } from "react-native";
import useTheme from "../../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    message: {
      fontFamily: theme.typography.fonts.primary.medium,
      fontSize: theme.typography.size.caption,
      color: theme.colors.error[400],
    },
  });
};

export default styles;
