import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { GestureResponderEvent } from "react-native";

interface IIconButtonProps<T extends ExpoVectorIcon = ExpoVectorIcon> {
  name: keyof T["glyphMap"];
  icon: T;
  color?: string;
  size?: number;
  activeOpacity?: number;
  style?: any;
  onPress?(event: GestureResponderEvent): void;
}

export { IIconButtonProps };
