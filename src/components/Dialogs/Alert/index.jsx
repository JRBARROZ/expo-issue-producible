import React, { useEffect } from "react";
import { Modal, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useTheme } from "styled-components";
import styles from "./styles";
import { IconButton, MainButton } from "../../Buttons";

function Alert({
  title,
  message,
  open,
  handleClose,
  onClose,
  onConfirm,
  confirmTextButton = "Confirmar",
  cancelTextButton = "Cancelar",
  hasActions = true,
}) {
  const style = styles();
  const theme = useTheme();

  const xAxis = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      right: xAxis.value,
    };
  });
  const processMessage = (message) => {
    return message?.split(" ").map((str, index) => {
      if (str.match(/(\*\D+\*)/gi)) {
        const cleanStr = str.replace(/\*/g, "");
        return (
          <Text key={index} style={style.boldText}>
            {`${cleanStr} `}
          </Text>
        );
      }
      return `${str} `;
    });
  };

  const animation = () => {
    xAxis.value = withSequence(
      withTiming(20, { duration: 170 }),
      withTiming(-20, { duration: 170 }),
      withTiming(0),
    );
  };

  useEffect(() => {
    if (open) {
      animation();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Modal visible={open} transparent>
      <View style={style.overlay}>
        <Animated.View style={[style.alertContainer, animatedStyle]}>
          <View style={style.messageContainer}>
            {!hasActions && (
              <IconButton
                style={style.closeButton}
                onPress={() => {
                  if (handleClose instanceof Function) handleClose();
                  onClose();
                }}
                name="close-outline"
                size={26}
                icon={Ionicons}
                theme={theme.colors.secondary[900]}
              />
            )}
            <View style={style.majorCircleView}>
              <View style={style.minorCircleView}>
                <IconButton
                  style={{ padding: 0, alignSelf: "center" }}
                  name="md-alert-circle-outline"
                  size={26}
                  icon={Ionicons}
                  color={theme.colors.error[500]}
                />
              </View>
            </View>
            <Text style={style.titleText}>{title}</Text>
            <Text style={style.messageText}>{processMessage(message)}</Text>
          </View>
          {hasActions && (
            <View style={style.buttonContainer}>
              <MainButton
                style={style.button}
                textStyle={style.textButton}
                onPress={() => {
                  if (handleClose instanceof Function) handleClose();
                  onClose();
                }}
                variant="outlined"
              >
                {cancelTextButton}
              </MainButton>
              <MainButton
                style={style.button}
                textStyle={style.textButton}
                colorScheme="error"
                onPress={() => {
                  if (onConfirm instanceof Function) onConfirm();
                  onClose();
                }}
              >
                {confirmTextButton}
              </MainButton>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

export default Alert;
