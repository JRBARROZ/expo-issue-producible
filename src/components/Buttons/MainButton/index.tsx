import React from "react";
import { useTheme } from "styled-components/native";
import { ButtonContainer, ButtonLabel } from "./styles";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { IMainButtonProps } from "./types";

function MainButton<L extends ExpoVectorIcon, R extends ExpoVectorIcon = L>({
  children,
  loading,
  loadingText = "enviando",
  disabled,
  onPress,
  colorScheme,
  style,
  textStyle,
  variant,
  ...props
}: IMainButtonProps<L, R>) {
  const theme = useTheme();

  let color = theme.colors.secondary?.[0];

  if (variant === "outlined") {
    if (colorScheme) {
      color = theme.colors[colorScheme]?.[500];
    } else {
      color = theme.colors.secondary?.[500];
    }
  }

  return (
    <ButtonContainer
      disabled={loading || disabled}
      onPress={onPress}
      activeOpacity={0.7}
      colorScheme={colorScheme}
      variant={variant}
      style={style}
      {...props}
    >
      {(loading || children) && (
        <ButtonLabel color={color} style={textStyle}>
          {loading ? loadingText : children}
        </ButtonLabel>
      )}
    </ButtonContainer>
  );
}

export default MainButton;
