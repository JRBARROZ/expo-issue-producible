import React, { useCallback, useEffect } from "react";
import { useController } from "react-hook-form";
import { TextInput, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import styles from "./styles";
import { Label, ErrorMessage } from "../FieldUtilitaries";

const AnimatedSliderLabel = Animated.createAnimatedComponent(TextInput);

export default function SliderField({
  name,
  control,
  value,
  label,
  min = 0,
  max = 100,
  step = 1,
  style,
  disabled,
  customOnChange,
  ...props
}) {
  const sliderStyles = styles();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message;

  const fieldValue = value !== undefined ? value : field.value;

  function handleChange() {
    const value =
      min + Math.round(slideXAxis.value / (maxWidth.value / ((max - min) / step))) * step;

    field.onChange(value);

    if (customOnChange instanceof Function) {
      customOnChange(value);
    }
  }

  const slideXAxis = useSharedValue(0);
  const slideScale = useSharedValue(1);
  const maxWidth = useSharedValue(0);
  const changedBy = useSharedValue("external");

  const calculateX = useCallback((value, maxWidth) => {
    const relativeValue = (value - min) / (max - min);
    const initialSlideXAxis = relativeValue * maxWidth;
    return initialSlideXAxis;
  }, []);

  useEffect(() => {
    if (fieldValue && changedBy.value === "external" && maxWidth.value) {
      slideXAxis.value = withTiming(calculateX(fieldValue, maxWidth.value));
    }

    changedBy.value = "external";
  }, [fieldValue]);

  const fillTrackAnimatedStyles = useAnimatedStyle(() => ({
    width: slideXAxis.value,
  }));

  const slideAnimatedStyles = useAnimatedStyle(() => ({
    left: slideXAxis.value - 12,
    transform: [
      {
        scale: slideScale.value,
      },
    ],
  }));

  const sliderLabelAnimatedStyles = useAnimatedStyle(() => ({
    left: slideXAxis.value - 21,
    opacity: interpolate(slideScale.value, [1, 1.3], [0, 1]),
  }));

  const slideGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = slideXAxis.value;
      slideScale.value = withTiming(1.3);
    },
    onActive: (event, context) => {
      const translationX = context.startX + event.translationX;

      if (translationX >= 0 && translationX <= maxWidth.value) {
        slideXAxis.value = translationX;
      }
    },
    onEnd: () => {
      slideScale.value = withTiming(1);
      changedBy.value = "internal";
      runOnJS(handleChange)(value);
    },
  });

  const animatedSliderLabelProps = useAnimatedProps(() => {
    const value =
      min + Math.round(slideXAxis.value / (maxWidth.value / ((max - min) / step))) * step;

    return { text: Number.isNaN(value) ? "0" : value.toString() };
  });

  return (
    <View {...props} style={[sliderStyles.container, style]}>
      <Label error={error} required={require} disabled={disabled}>
        {label}
      </Label>
      <View
        style={sliderStyles.slideTrack}
        onLayout={function (event) {
          const { width } = event.nativeEvent.layout;
          maxWidth.value = width;
          slideXAxis.value = withTiming(calculateX(fieldValue, width));
        }}
      >
        <Animated.View style={[sliderStyles.fillTrack, fillTrackAnimatedStyles]} />
        <AnimatedSliderLabel
          editable={false}
          style={[sliderStyles.sliderLabel, sliderLabelAnimatedStyles]}
          animatedProps={animatedSliderLabelProps}
        />
        <PanGestureHandler onGestureEvent={slideGesture}>
          <Animated.View style={[sliderStyles.slide, slideAnimatedStyles]} />
        </PanGestureHandler>
      </View>
      <ErrorMessage>{error}</ErrorMessage>
    </View>
  );
}
