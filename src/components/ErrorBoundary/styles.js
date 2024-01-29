import { StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary[0],
      paddingHorizontal: theme.shape.padding,
    },
    container: {
      width: '100%',
      alignItems: "center",
    },
    title: {
      fontFamily: theme.typography.fonts.primary.semibold,
      fontSize: theme.typography.size.regular,
      color: theme.colors.secondary[700],
      marginBottom: 12,
    },
    message: {
      fontFamily: theme.typography.fonts.primary.normal,
      fontSize: theme.typography.size.body,
      color: theme.colors.secondary[600],
      marginBottom: 28 
    },
    semibold: {
      fontFamily: theme.typography.fonts.primary.semibold,
    },
    error: {
      fontFamily: theme.typography.fonts.primary.medium,
      fontSize: theme.typography.size.caption,
      color: theme.colors.error[400],
      backgroundColor: theme.colors.error[50],
      marginTop: 38,
      padding: theme.shape.padding,
      borderWidth: 1,
      borderColor: theme.colors.error[100],
      borderRadius: theme.shape.borderRadius,
    }
  });
};

export default styles;
