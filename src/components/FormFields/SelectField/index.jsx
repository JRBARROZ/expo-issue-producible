import React, { useEffect, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { Dimensions, Keyboard, Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import { useTheme } from "styled-components";
import accessObjectByString from "../../../utils/accessObjectByString";
import TextField from "../TextField";
import styles from "./styles";
import { BottomSheetList } from "../../BottomSheets";
import { useBottomSheet } from "../../../hooks";

function SelectField({
  name,
  label,
  control,
  options = [],
  optionKeyExtractor,
  optionLabelKey = "label",
  optionValueKey,
  optionCompareKey,
  emptyMessage,
  placeholder,
  required,
  disabled,
  inputProps,
  containerProps,
  listProps,
  loading,
  onChange,
  customOnChange,
  onFocus,
  onBlur,
}) {
  const theme = useTheme();
  const autocompleteStyles = styles();
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  const [ref, handleOpen, handleClose] = useBottomSheet();
  const maxHeight = useMemo(() => {
    const height = Dimensions.get("window").height * 0.967;
    const isHeightBreak = options.length * 60 > height;
    const heightStyle = {
      maxHeight: height,
    };

    return isHeightBreak ? heightStyle : undefined;
  }, [options]);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message;

  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(null);

  useEffect(() => {
    if (field.value instanceof Object) {
      setTextValue(accessObjectByString(field.value, optionLabelKey));
    } else if (optionValueKey) {
      const findedOption = options.find(
        (item) => accessObjectByString(item, optionValueKey) === field.value,
      );
      setTextValue(accessObjectByString(findedOption, optionLabelKey));
    }
  }, [field.value, optionLabelKey]);

  function handleChange(item) {
    field.onChange(item);

    if (customOnChange instanceof Function) {
      customOnChange(item);
    }
  }

  function verifySelectedOptions(item) {
    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === field.value;
    }

    return (
      accessObjectByString(field.value, optionIdentifier) ===
      accessObjectByString(item, optionIdentifier)
    );
  }

  return (
    <>
      <TextField
        containerProps={containerProps}
        label={label}
        value={textValue}
        placeholder={placeholder}
        errorMessage={error}
        showErrorMessage={!open}
        disabled={disabled}
        required={required}
        selectionColor={theme.colors.secondary[100]}
        inputProps={{
          showSoftInputOnFocus: false,
          ...inputProps,
        }}
        rightIcon={{
          name: open ? "arrow-drop-up" : "arrow-drop-down",
          icon: MaterialIcons,
          color: theme.colors.primary[200],
        }}
        onFocus={(event) => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }

          if (onFocus instanceof Function) {
            onFocus(event);
          }

          handleOpen();
        }}
      />
      <BottomSheetList
        ref={ref}
        index={0}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        waitFor
        simultaneousHandlers
        onClose={(event) => {
          setOpen(false);
          Keyboard.dismiss();

          if (onBlur instanceof Function) {
            onBlur(event);
          }
        }}
        onOpen={() => setOpen(true)}
        flatListProps={{
          ...listProps,
          onLayout: handleContentLayout,
          style: [listProps?.style, maxHeight],
          data: options,
          nestedScrollEnabled: true,
          emptyMessage,
          loading,
          keyExtractor: (item, index) =>
            optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor) : index,
          renderItem: ({ item }) => (
            <Pressable
              onPress={() => {
                const value = optionValueKey ? accessObjectByString(item, optionValueKey) : item;

                handleChange(value);

                if (onChange instanceof Function) {
                  onChange(value);
                }

                handleClose();
              }}
              style={[
                autocompleteStyles.optionContainer,
                {
                  backgroundColor: verifySelectedOptions(item)
                    ? theme.colors.primary[0]
                    : theme.colors.secondary[0],
                },
              ]}
            >
              <Text style={autocompleteStyles.optionLabel}>
                {accessObjectByString(item, optionLabelKey)}
              </Text>
            </Pressable>
          ),
        }}
      />
    </>
  );
}

export default SelectField;
