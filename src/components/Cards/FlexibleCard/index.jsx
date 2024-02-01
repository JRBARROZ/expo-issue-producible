import React, { useMemo } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import accessObjectByString from "../../../utils/accessObjectByString";
import { IconButton } from "../../Buttons";
import { Icon } from "../..";
import styles from "./styles";

function FlexibleCard({
  data,
  title,
  descriptions = [],
  actions = [],
  icon,
  color,
  style,
  onPress,
}) {
  const theme = useTheme();
  const flexibleCardStyles = styles();

  const cardSettings = useMemo(() => {
    const settings = {
      color: color || theme.colors.primary[200],
      icon,
    };

    if (data?.queue_id) {
      // eslint-disable-next-line prefer-destructuring
      settings.color = theme.colors.warning[500];
      settings.icon = {
        name: "signal-cellular-connected-no-internet-4-bar",
        as: MaterialIcons,
      };
    }

    return settings;
  }, [icon, color, data]);

  return (
    <TouchableOpacity
      style={[flexibleCardStyles.container, style]}
      onPress={onPress}
      activeOpacity={onPress instanceof Function ? 0.2 : 1}
    >
      {title && (
        <Text
          style={[
            flexibleCardStyles.title,
            flexibleCardStyles.semibold,
            { color: cardSettings.color },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      )}
      {(icon || data?.queue_id) && (
        <View style={[flexibleCardStyles.iconContainer, { backgroundColor: cardSettings.color }]}>
          <Icon
            name={cardSettings.icon.name}
            size={42}
            icon={cardSettings.icon.as}
            color={theme.colors.secondary[0]}
            style={flexibleCardStyles.icon}
          />
        </View>
      )}
      {descriptions.map(({ label, key, formatter, shouldRender = true }) => {
        return shouldRender ? (
          <Text style={flexibleCardStyles.description} key={label}>
            <Text style={flexibleCardStyles.semibold}>{label}: </Text>
            {formatter instanceof Function
              ? formatter(accessObjectByString(data, key), data)
              : accessObjectByString(data, key)}
          </Text>
        ) : null;
      })}
      {actions.map(({ icon, iconName, handler, disabled, visible }) =>
        !visible || (visible instanceof Function && visible(data)) ? (
          <View style={flexibleCardStyles.actionsContainer}>
            <IconButton
              name={iconName}
              icon={icon}
              color={theme.colors.secondary[0]}
              size={28}
              onPress={() => {
                if (handler instanceof Function) {
                  handler(data);
                }
              }}
              activeOpacity={handler instanceof Function ? 0.7 : 1}
              disabled={disabled instanceof Function ? disabled(data) : false}
              style={{ backgroundColor: cardSettings.color }}
            />
          </View>
        ) : null,
      )}
    </TouchableOpacity>
  );
}

export default FlexibleCard;
