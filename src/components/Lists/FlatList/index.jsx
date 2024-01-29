import React from "react";
import { Text } from "react-native";
import { FlatList as List } from "react-native-gesture-handler";
import { SpinnerLoading } from "../../Loading";
import accessObjectByString from "../../../utils/accessObjectByString";
import styles from "./styles";

function FlatList({
  data,
  renderItem,
  onEndReached,
  keyExtractor,
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
      onEndReached={onEndReached}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        itemKeyExtractor ? accessObjectByString(item, itemKeyExtractor) : index
      }
      ListFooterComponent={
        loading && listFooterComponent ? listFooterComponent : loading ? <SpinnerLoading /> : null
      }
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

export default FlatList;
