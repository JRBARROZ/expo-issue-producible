import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

export default function IconButton({
  icon,
  name,
  color,
  size = 24,
  activeOpacity = 0.7,
  style,
  onPress,
}) {
  const iconButtonStyles = styles();
  const [focused, setFocused] = useState(false);

  const toggleFocus = useCallback(() => {
    if (onPress) setFocused((focused) => !focused);
  }, []);

  const Icon = icon;

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
      {Icon && <Icon name={name} color={color} size={size} />}
    </TouchableOpacity>
  );
}
