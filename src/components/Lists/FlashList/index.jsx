import React from "react";
import { Text } from "react-native";
import { FlashList as List } from "@shopify/flash-list";
import { SpinnerLoading } from "../../Loading";
import accessObjectByString from "../../../utils/accessObjectByString";
import styles from "./styles";

function FlashList({
  data,
  estimatedItemSize,
  renderItem,
  onEndReached,
  ListEmptyComponent,
  listFooterComponent,
  loading,
  itemKeyExtractor,
  emptyMessage,
  contentContainerStyle,
  style,
  ...props
}) {
  const flatListStyles = styles();

  return (
    <List
      data={data}
      style={style}
      contentContainerStyle={contentContainerStyle}
      estimatedItemSize={estimatedItemSize}
      onEndReached={onEndReached}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        itemKeyExtractor ? accessObjectByString(item, itemKeyExtractor) : index
      }
      ListFooterComponent={loading ? <SpinnerLoading /> : listFooterComponent}
      ListEmptyComponent={
        !loading
          ? ListEmptyComponent || (
              <Text style={flatListStyles.emptyMessage}>
                {emptyMessage || "Nenhum item encontrado"}
              </Text>
            )
          : null
      }
      {...props}
    />
  );
}

export default FlashList;
