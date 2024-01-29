import React, { useEffect, useMemo, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Keyboard, Pressable, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import accessObjectByString from "../../../utils/accessObjectByString";
import TextField from "../TextField";
import useTheme from "../../../hooks/useTheme";
import { FlatList } from "../../Lists";
import styles from "./styles";
import { IconButton } from "../../Buttons";

function AutoCompleteField({
  value,
  name,
  label,
  control,
  multiple = false,
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
  onChangeText,
  onFocus,
  onBlur,
}) {
  const theme = useTheme();
  const autocompleteStyles = styles();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message;

  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [textValue, setTextValue] = useState(null);
  const choosedListItemRef = useRef(false);
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  useEffect(() => {
    if (field.value instanceof Object && value === undefined && !multiple) {
      setTextValue(accessObjectByString(field.value, optionLabelKey));
    } else if (optionValueKey && value === undefined && !multiple) {
      const findedOption = filteredOptions.find(
        (item) => accessObjectByString(item, optionValueKey) === field.value
      );
      setTextValue(accessObjectByString(findedOption, optionLabelKey));
    } else if (!field.value && textValue) {
      setTextValue(null);
    }
  }, [field.value, optionLabelKey]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  function filterOptionsByText(value) {
    const hasValue = field.value instanceof Object;
    const newValue =
      hasValue && textValue !== value ? (choosedListItemRef.current ? null : textValue) : value;
    if (newValue) {
      const regex = new RegExp(newValue, "i");
      const searchedOptions = options.filter((item) =>
        regex.test(accessObjectByString(item, optionLabelKey))
      );
      setFilteredOptions(searchedOptions);
    } else {
      setFilteredOptions(options);
    }
    choosedListItemRef.current = false;

    setTextValue(newValue);
    if (hasValue) field.onChange(null);

  }

  function handleChange(item) {
    if (!multiple) {
      field.onChange(item);

      if (customOnChange instanceof Function) {
        customOnChange(item);
      }
    } else {
      setTextValue(null);

      let optionsValue = [item];

      if (Array.isArray(field.value)) {
        optionsValue = [...field.value, item];

        const optionToRemove = field.value.findIndex((option) => {
          if (optionValueKey) {
            return item === option;
          }

          return (
            accessObjectByString(option, optionIdentifier) ===
            accessObjectByString(item, optionIdentifier)
          );
        });

        if (optionToRemove !== -1) {
          optionsValue = field.value.filter((option) => {
            if (optionValueKey) {
              return item !== option;
            }

            return (
              accessObjectByString(option, optionIdentifier) !==
              accessObjectByString(item, optionIdentifier)
            );
          });
        }
      }

      field.onChange(optionsValue);

      if (customOnChange instanceof Function) {
        customOnChange(optionsValue);
      }
    }
  }

  function handleRemoveOption(item) {
    const filteredOptions = field.value.filter((option) => {
      if (optionValueKey) {
        return accessObjectByString(item, optionValueKey) !== option;
      }

      return (
        accessObjectByString(option, optionIdentifier) !==
        accessObjectByString(item, optionIdentifier)
      );
    });

    field.onChange(filteredOptions);
  }

  function verifySelectedOptions(item) {
    if (multiple) {
      return field.value?.some((option) => {
        if (optionValueKey) {
          return accessObjectByString(item, optionValueKey) === option;
        }

        return (
          accessObjectByString(option, optionIdentifier) ===
          accessObjectByString(item, optionIdentifier)
        );
      });
    }

    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === field.value;
    }

    return (
      accessObjectByString(field.value, optionIdentifier) ===
      accessObjectByString(item, optionIdentifier)
    );
  }

  function togleOpen() {
    if (open) {
      setOpen(false);
      Keyboard.dismiss();
    } else {
      setOpen(true);
    }
  }

  return (
    <View {...containerProps}>
      <TextField
        {...inputProps}
        containerProps={containerProps}
        label={label}
        value={value !== undefined ? value : textValue}
        placeholder={placeholder}
        errorMessage={error}
        showErrorMessage={!open}
        disabled={disabled}
        required={required}
        onChangeText={onChangeText instanceof Function ? onChangeText : filterOptionsByText}
        rightIcon={{
          name: open ? "arrow-drop-up" : "arrow-drop-down",
          icon: MaterialIcons,
          color: theme.colors.primary[200],
        }}
        onFocus={(event) => {
          if (onFocus instanceof Function) {
            onFocus(event);
          }

          togleOpen();
        }}
        onBlur={(event) => {
          Keyboard.dismiss();
          choosedListItemRef.current = true;
          if (!(field.value instanceof Object) && !onBlur && !optionValueKey) {
            setTextValue(null);
          }

          if (onBlur instanceof Function) {
            onBlur(event);
          }

          if (open) togleOpen();
        }}
      />
      {open && (
        <FlatList
          {...listProps}
          data={filteredOptions}
          nestedScrollEnabled
          keyboardShouldPersistTaps="always"
          style={[autocompleteStyles.listContainer, listProps?.style]}
          emptyMessage={emptyMessage}
          loading={loading}
          keyExtractor={(item, index) =>
            optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor) : index
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                const value = optionValueKey ? accessObjectByString(item, optionValueKey) : item;
                handleChange(value);

                if (onChange instanceof Function) {
                  onChange(value);
                }

                togleOpen();
              }}
              style={[
                autocompleteStyles.optionContainer,
                {
                  backgroundColor: verifySelectedOptions(item)
                    ? theme.colors.primary[0]
                    : theme.colors.secondary[100],
                },
              ]}
            >
              <Text style={autocompleteStyles.optionLabel}>
                {accessObjectByString(item, optionLabelKey)}
              </Text>
            </Pressable>
          )}
        />
      )}
      {multiple && !open && field.value?.length > 0 && (
        <View style={autocompleteStyles.optionsContainer} space={2}>
          {field.value.map((option) => {
            let item = option;

            if (optionValueKey) {
              item = filteredOptions.find(
                (item) => accessObjectByString(item, optionValueKey) === option
              );
            }

            return (
              <View
                key={accessObjectByString(item, optionLabelKey)}
                space={1}
                style={autocompleteStyles.optionTag}
              >
                <Text style={autocompleteStyles.optionTagLabel}>
                  {accessObjectByString(item, optionLabelKey)}
                </Text>
                <IconButton
                  name="close"
                  icon={MaterialCommunityIcons}
                  color={theme.colors.primary[200]}
                  size={14}
                  onPress={() => handleRemoveOption(item)}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default AutoCompleteField;
