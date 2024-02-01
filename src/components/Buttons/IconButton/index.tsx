import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import { IIconButtonProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

export default function IconButton<T extends ExpoVectorIcon = ExpoVectorIcon>({
  icon,
  name,
  color,
  size = 24,
  activeOpacity = 0.7,
  style,
  onPress,
}: IIconButtonProps<T>) {
  const iconButtonStyles = styles();
  const [focused, setFocused] = useState(false);

  const toggleFocus = useCallback(() => {
    if (onPress) setFocused((focused) => !focused);
  }, []);

  const Icon = icon as unknown;

  function isIcon(value: any): value is ExpoVectorIcon {
    return !!value;
  }

  return (
    <TouchableOpacity
      style={[
        iconButtonStyles.button,
        { padding: size * 0.3 },
        focused && iconButtonStyles.focus,
        style,
      ]}
      onPressIn={toggleFocus}
      onPressOut={toggleFocus}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      {isIcon(Icon) && <Icon name={name} color={color} size={size} />}
    </TouchableOpacity>
  );
}
