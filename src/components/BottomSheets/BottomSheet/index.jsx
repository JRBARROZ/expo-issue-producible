import React, { forwardRef, useRef } from "react";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import styles from "./styles";

const BottomSheet = forwardRef(
  (
    {
      children,
      index = 0,
      snapPoints = [20, "25%", "50%", "75%", "95%"],
      enableBackdropInteractions = false,
      onChange,
      containerStyle,
      indicatorStyle,
      backDropStyle,
      scrollViewProps,
      onOpen,
      onClose,
      ...props
    },
    ref
  ) => {
    const bottomSheetStyles = styles();
    const firstRender = useRef(true);

    const CustomBackDrop = React.memo(({ style }) => (
      <View style={[style, bottomSheetStyles.backdrop, backDropStyle]} />
    ));

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        onChange={onChange}
        style={[bottomSheetStyles.container, containerStyle]}
        handleIndicatorStyle={[bottomSheetStyles.indicator, indicatorStyle]}
        backdropComponent={enableBackdropInteractions ? undefined : CustomBackDrop}
        handleStyle={backDropStyle}
        onAnimate={() => {
          if (firstRender.current && onOpen instanceof Function) {
            onOpen();
          }
        }}
        onDismiss={onClose}
        {...props}
      >
        <BottomSheetScrollView
          {...scrollViewProps}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            bottomSheetStyles.contentContainer,
            scrollViewProps?.contentContainerStyle,
          ]}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default BottomSheet;
