import React, { useEffect } from "react";
import { useController } from "react-hook-form";
import { View, Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components";
import styles from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SwithcField({
  name,
  value,
  label,
  control,
  required,
  disabled,
  containerProps,
  onChange,
  customOnChange,
}) {
  const theme = useTheme();
  const switchFieldStyles = styles();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message;

  const fieldValue = value !== undefined ? value : field.value;

  const slidePosition = useSharedValue(-2);
  const activeSlide = useSharedValue(false);

  useEffect(() => {
    if (fieldValue) {
      slidePosition.value = 21;
      activeSlide.value = true;
    }
  }, []);

  const inputAnimatedStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      activeSlide.value,
      [false, true],
      [theme.colors.secondary[100], theme.colors.primary[200]],
    ),
    borderColor: interpolateColor(
      activeSlide.value,
      [false, true],
      [theme.colors.secondary[300], theme.colors.primary[200]],
    ),
  }));

  const slideAnimatedStyles = useAnimatedStyle(() => ({
    left: slidePosition.value,
  }));

  function handleChange() {
    const value = !fieldValue;

    if (value) {
      slidePosition.value = withSpring(21);
      activeSlide.value = withTiming(true);
    } else {
      slidePosition.value = withSpring(-2);
      activeSlide.value = withTiming(false);
    }

    if (onChange instanceof Function) {
      onChange(value);
    } else {
      field.onChange(value);

      if (customOnChange instanceof Function) {
        customOnChange(value);
      }
    }
  }

  return (
    <View {...containerProps} style={[switchFieldStyles.container, containerProps?.style]}>
      <View style={switchFieldStyles.labelContainer}>
        <AnimatedPressable
          style={[switchFieldStyles.input, inputAnimatedStyles]}
          onPress={handleChange}
        >
          <Animated.View
            style={[switchFieldStyles.slide, slideAnimatedStyles, error && switchFieldStyles.error]}
          />
        </AnimatedPressable>
        <Label disabled={disabled} required={required} error={error}>
          {label}
        </Label>
      </View>
      <ErrorMessage>{error}</ErrorMessage>
    </View>
  );
}

export default SwithcField;
