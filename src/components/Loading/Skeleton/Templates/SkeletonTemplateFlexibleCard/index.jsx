import React from "react";
import { View } from "react-native";
import { SkeletonBones } from "../../SkeletonBones";
import styles from "./style";

export function SkeletonTemplateFlexibleCard() {
  const skeletonStyles = styles();

  return (
    <View style={skeletonStyles.container}>
      <View style={skeletonStyles.containerPrimarySeparator}>
        <SkeletonBones style={skeletonStyles.titleTextContainer} />
        <View style={skeletonStyles.containerSecondarySeparator}>
          {[1, 2, 3].map((value) => (
            <SkeletonBones
              style={skeletonStyles.smallTextContainer}
              key={`${value}skeletonbones`}
            />
          ))}
        </View>
      </View>
      <SkeletonBones size={80} style={skeletonStyles.profileContainer} />
    </View>
  );
}
