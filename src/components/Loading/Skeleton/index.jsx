import React from "react";
import { View } from "react-native";
import { SkeletonTemplateFlexibleCard } from "./Templates/SkeletonTemplateFlexibleCard";

const templates = {
  "flex-card": SkeletonTemplateFlexibleCard,
};

export default function Skeleton({ quantity = 1, template = "flex-card", children, style }) {
  return (
    <>
      {[...Array(quantity)].map((value) => {
        const SkeletonStructure = templates[template];
        return (
          children ?? (
            <View style={style}>
              <SkeletonStructure key={`${value}skeleton`} />
            </View>
          )
        );
      })}
    </>
  );
}
