import React, { useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Alert } from "../Dialogs";
import accessObjectByString from "../../utils/accessObjectByString";
import Icon from "../Icon";
import styles from "./styles";

function Swipeable({
  data,
  actions,
  customActions,
  disabledActions,
  itemKeyExtractor,
  confirmMessage = "Você realmente deseja *action* este item?",
  children,
}) {
  const theme = useTheme();
  const swipeableStyles = styles();
  const actionConfirm = useRef();
  const [open, setOpen] = useState();

  const swipeSize = useMemo(
    () => (actions.length >= 1 ? 80 + 95 * (actions.length - 1) : 200),
    [actions],
  );

  const swipeActions = useMemo(
    () => ({
      more: {
        title: "mais",
        name: "more-vert",
        icon: MaterialIcons,
        color: theme.colors.primary[200],
      },
      delete: {
        title: "deletar",
        name: "delete",
        icon: MaterialIcons,
        color: theme.colors.error[500],
        confirm: true,
      },
      suspend: {
        title: "suspender",
        name: "block-helper",
        icon: MaterialCommunityIcons,
        color: theme.colors.warning[500],
        confirm: true,
      },
      edit: {
        title: "editar",
        name: "edit",
        icon: MaterialIcons,
        color: theme.colors.primary[200],
      },
      ...customActions,
    }),
    [],
  );

  function togleOpen() {
    setOpen((open) => !open);
  }

  function handleMessage(row, action) {
    const message = confirmMessage.replace("action", action);
    const splitedMessage = message.split(" ").map((str) => {
      if (str.match(/({\D+})/gi)) {
        const replacer = str.replace(/[()?]/g, "");
        const value = accessObjectByString(row, replacer.replace(/[{}]/g, "").replace("row.", ""));
        const string = str.replace(replacer, value);
        return string;
      }

      return str;
    });

    const completedMessage = splitedMessage.join(" ");

    return completedMessage;
  }

  const actionItems = (data) => (
    <View style={swipeableStyles.actionsContainer}>
      {actions?.map((action, index, array) => {
        const disabled = disabledActions ? disabledActions(data, action.name) : false;

        return (
          <TouchableOpacity
            key={`${action.name}-${
              itemKeyExtractor ? accessObjectByString(data, itemKeyExtractor) : index
            }`}
            onPress={() => {
              if (action?.onPress instanceof Function) {
                const confirmation =
                  action.confirm !== undefined ? action.confirm : swipeActions[action.name].confirm;

                if (confirmation) {
                  actionConfirm.current = {
                    message: handleMessage(data, swipeActions[action.name].title),
                    onPress: () => action.onPress(data),
                  };
                  togleOpen();
                } else {
                  action.onPress(data);
                }
              }
            }}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: swipeActions[action.name].color,
                height: "100%",
                width: index === 0 ? 95 : 80,
                borderColor: theme.colors.secondary[0],
                borderRightWidth: 1,
                borderTopRightRadius: index === array.length - 1 ? 12 : 0,
                borderBottomRightRadius: index === array.length - 1 ? 12 : 0,
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <Icon
                icon={swipeActions[action.name].icon}
                name={swipeActions[action.name].name}
                color={theme.colors.secondary[0]}
                size={24}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const xAxis = useSharedValue(0);

  const handleGesture = Gesture.Pan()
    .onChange((event) => {
      if (-xAxis.value > swipeSize) return;
      if (xAxis.value > 0) return;

      xAxis.value += event.changeX;
    })
    .onFinalize((event) => {
      const isSwipePosition = swipeSize / (actions.length * 2);
      if (-event.translationX > isSwipePosition) {
        xAxis.value = withTiming(-swipeSize);
        return;
      }
      if (xAxis.value > -swipeSize - swipeSize / 2) {
        xAxis.value = withTiming(0);
      }
    })
    .activeOffsetX([-15, 15]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xAxis.value }],
  }));

  return (
    <>
      <Alert
        title="Confirmação"
        message={actionConfirm.current?.message}
        open={open}
        onClose={togleOpen}
        onConfirm={actionConfirm.current?.onPress}
      />
      <Animated.View style={swipeableStyles.swipeable}>
        {actionItems(data)}
        <GestureDetector gesture={handleGesture}>
          <Animated.View style={animatedStyle}>{children}</Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
}

export default Swipeable;
