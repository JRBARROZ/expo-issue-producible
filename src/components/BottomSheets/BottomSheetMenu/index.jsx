import React, { forwardRef, useMemo } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import styles from "./styles";
import BottomSheetList from "../BottomSheetList";
import { Icon } from "../..";

const BottomSheetMenu = forwardRef(({ items = [], onOpen, onClose }, ref) => {
  const bottomSheetMenuStyles = styles();

  const maxHeight = useMemo(() => Dimensions.get("window").height * 0.967);
  const isHeightBreak = useMemo(() => items.length * 60 > maxHeight, [items]);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  return (
    <BottomSheetList
      ref={ref}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      waitFor
      simultaneousHandlers
      onOpen={onOpen}
      onClose={onClose}
      flatListProps={{
        style: [isHeightBreak ? { maxHeight } : undefined],
        onLayout: handleContentLayout,
        ItemSeparatorComponent: () => {
          return <View style={bottomSheetMenuStyles.itemSeparator} />;
        },
        data: items,
        renderItem: ({ item }) => (
          <TouchableOpacity
            style={[
              bottomSheetMenuStyles.listItemContainer,
              item.disabled && bottomSheetMenuStyles.disabled,
            ]}
            onPress={() => {
              if (item.onPress instanceof Function) {
                item.onPress(item);
              }
            }}
            disabled={item.disabled}
          >
            <Icon
              icon={item.icon}
              name={item.name}
              color={bottomSheetMenuStyles.iconButton.color}
              size={bottomSheetMenuStyles.iconButton.size}
            />
            <Text style={bottomSheetMenuStyles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
});

export default BottomSheetMenu;
