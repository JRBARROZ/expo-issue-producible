import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "styled-components";
import Icon from "../../Icon";
import styles from "./styles";
import { SpinnerLoading } from "../../Loading";

function MainButton({
  children,
  loading,
  loadingText = "enviando",
  disabled,
  onPress,
  colorScheme,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  variant,
  ...props
}) {
  const theme = useTheme();
  const mainButtonStyles = styles();
  const isOutlined = variant === "outlined";
  const color =
    isOutlined && colorScheme
      ? theme.colors[colorScheme][500]
      : isOutlined
        ? theme.colors.secondary[500]
        : theme.colors.secondary[0];
  const backgroundColor = isOutlined
    ? "transparent"
    : colorScheme
      ? theme.colors[colorScheme][500]
      : theme.colors.primary[200];

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        mainButtonStyles.button,
        {
          backgroundColor,
          borderWidth: isOutlined ? 1 : 0,
          borderColor: colorScheme ? theme.colors[colorScheme][500] : theme.colors.secondary[400],
        },
        !isOutlined && theme.shadows[1],
        style,
        (loading || disabled) && mainButtonStyles.disabled,
      ]}
      {...props}
    >
      {!loading && leftIcon && (
        <Icon
          name={leftIcon.name}
          icon={leftIcon.icon}
          color={leftIcon.color || theme.colors.primary[200]}
          size={leftIcon.size || 36}
        />
      )}
      {(loading || children) && (
        <Text style={[mainButtonStyles.text, { color }, textStyle]}>
          {loading ? loadingText : children}
        </Text>
      )}
      {!loading && rightIcon && (
        <Icon
          name={rightIcon.name}
          icon={rightIcon.icon}
          color={rightIcon.color || theme.colors.primary[200]}
          size={rightIcon.size || 36}
        />
      )}

      {loading && <SpinnerLoading color={color} size={28} />}
    </TouchableOpacity>
  );
}

export default MainButton;
