import React from "react";

export default function Icon({ icon, name, color, size = 24, ...props }) {
  const Icon = icon;

  if (!icon) return null;

  return <Icon name={name} color={color} size={size} {...props} />;
}
