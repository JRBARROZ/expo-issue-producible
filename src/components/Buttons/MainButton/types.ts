import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { IColors } from "@/types/Theme";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";


interface IMainButtonProps<L extends ExpoVectorIcon, R extends ExpoVectorIcon = L>
  extends TouchableOpacityProps {
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  colorScheme?: keyof IColors;
  textStyle?: StyleProp<TextStyle>;
  variant?: "outlined" | "contained";
}

export { IMainButtonProps };
