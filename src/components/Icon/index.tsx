import React, { ForwardedRef, forwardRef } from "react";
import { IIconProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

const IconComponent = <T extends ExpoVectorIcon>(
  { icon, name, color, size = 2, style }: IIconProps<T>,
  ref: ForwardedRef<any>,
) => {
  const Icon = icon as ExpoVectorIcon;

  if (!icon) return null;

  return <Icon ref={ref} name={name} color={color} size={size} style={style} />;
};

type IIconAssertion = <T extends ExpoVectorIcon>(
  props: IIconProps<T> & { ref?: ForwardedRef<any> },
) => ReturnType<typeof IconComponent>;

const Icon = forwardRef(IconComponent) as IIconAssertion;

export default Icon;
