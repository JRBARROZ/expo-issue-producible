import React, { ForwardedRef, forwardRef, useRef } from "react";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Pressable, Text } from "react-native";
import styles from "./styles";
import accessObjectByString from "../../../utils/accessObjectByString";
import { SpinnerLoading } from "../../Loading";
import { IBottomSheetListProps } from "./types";

const BottomSheetList = forwardRef(function <T>(
  {
    children,
    index = 0,
    snapPoints = [20, "25%", "50%", "75%", "95%"],
    enableBackdropInteractions = false,
    onChange,
    indicatorStyle,
    backDropStyle,
    flatListProps,
    onOpen,
    onClose,
    ...props
  }: IBottomSheetListProps<T>,
  ref: ForwardedRef<any>,
) {
  const bottomSheetListStyles = styles();
  const firstRender = useRef(true);

  const CustomBackDrop = React.memo(({ style }) => (
    <Pressable
      style={[style, bottomSheetListStyles.backdrop, backDropStyle]}
      onPress={() => ref.current.dismiss()}
    />
  ));

  return (
    <BottomSheetModal
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      onChange={onChange}
      handleIndicatorStyle={[bottomSheetListStyles.indicator, indicatorStyle]}
      backdropComponent={enableBackdropInteractions ? undefined : CustomBackDrop}
      handleStyle={backDropStyle}
      onAnimate={() => {
        if (firstRender.current && onOpen instanceof Function) {
          onOpen();
        }

        firstRender.current = false;
      }}
      onDismiss={() => {
        if (onClose instanceof Function) {
          onClose();
        }

        firstRender.current = true;
      }}
      {...props}
    >
      <BottomSheetFlatList
        {...flatListProps}
        contentContainerStyle={[
          bottomSheetListStyles.contentContainer,
          flatListProps?.contentContainerStyle,
        ]}
        keyExtractor={(item, index) =>
          flatListProps?.itemKeyExtractor
            ? accessObjectByString(item, flatListProps.itemKeyExtractor)
            : index
        }
        ListFooterComponent={
          flatListProps?.loading ? <SpinnerLoading /> : flatListProps?.listFooterComponent
        }
        ListEmptyComponent={
          !flatListProps?.loading
            ? flatListProps?.ListEmptyComponent || (
                <Text style={bottomSheetListStyles.emptyMessage}>
                  {flatListProps?.emptyMessage || "Nenhum item encontrado"}
                </Text>
              )
            : null
        }
      />
    </BottomSheetModal>
  );
});

export default BottomSheetList;
