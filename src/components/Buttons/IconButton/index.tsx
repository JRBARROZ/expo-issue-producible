import React, { ForwardedRef, forwardRef, useCallback, useState } from "react";
import { IconButtonContainer } from "./styles";
import { IIconButtonProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

const IconButton = forwardRef(
  <T extends ExpoVectorIcon>(
    { icon, name, color, size = 24, activeOpacity = 0.7, style, onPress }: IIconButtonProps<T>,
    ref: ForwardedRef<any>,
  ) => {
    const [focused, setFocused] = useState(false);

    const toggleFocus = useCallback(() => {
      if (onPress) setFocused((focused) => !focused);
    }, []);

    const Icon = icon as unknown;

    const isIcon = useCallback((value: any): value is ExpoVectorIcon => {
      return !!value;
    }, []);

    return (
      <IconButtonContainer
        ref={ref}
        size={size}
        focused={focused}
        style={style}
        onPressIn={toggleFocus}
        onPressOut={toggleFocus}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {isIcon(Icon) && <Icon name={name} color={color} size={size} />}
      </IconButtonContainer>
    );
  },
);

export default IconButton;
