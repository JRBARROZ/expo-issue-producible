import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";

const gradientColors = [
  "rgba(255, 255, 255, 0.1)",
  "rgba(255, 255, 255, 0.5)",
  "rgba(255, 255, 255, 1)",
  "rgba(255, 255, 255, 0.5)",
  "rgba(255, 255, 255, 0.1)",
];

export function SkeletonBones({ style, size = 180 }) {
  const skeletonStyles = styles();

  const xAxis = useSharedValue(-size / 1.2);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xAxis.value }],
    };
  });

  useEffect(() => {
    xAxis.value = withRepeat(
      withTiming(size - size / 8, {
        duration: 1000,
      }),
      -1
    );
  }, [size]);

  return (
    <View
      style={[
        skeletonStyles.containerSkeleton,
        style,
        {
          width: size,
        },
      ]}
    >
      <Animated.View style={[skeletonStyles.skeleton, animatedStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={skeletonStyles.gradient}
        />
      </Animated.View>
    </View>
  );
}
