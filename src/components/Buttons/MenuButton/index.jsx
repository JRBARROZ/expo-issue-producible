import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import useTheme from "../../../hooks/useTheme";
import Icon from "../../Icon";

function MenuButton({ text, icon, iconName, onPress, disabled, style }) {
  const styled = styles();
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styled.container,
        opacity: disabled ? 0.5 : 1,
        ...styled,
        ...style,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styled.icon_container}>
        <Icon
          icon={icon}
          name={iconName}
          color={theme.colors.secondary[0]}
          size={44}
          style={styled.screenIcon}
        />
      </View>
      <View style={styled.secondaryContainer}>
        <View style={styled.titleContainer}>
          <Text style={styled.title}>{text}</Text>
        </View>
        <View style={styled.rowContainer}>
          <Icon
            icon={icon}
            name={iconName}
            color={theme.colors.primary[200]}
            style={styled.opacityIcon}
            size={32}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MenuButton;
