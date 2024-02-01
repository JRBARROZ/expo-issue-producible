import React, { useMemo } from "react";
import { useController } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import accessObjectByString from "../../../utils/accessObjectByString";
import styles from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";

function CheckboxField({
  name,
  value,
  label,
  control,
  direction = "column",
  options,
  optionLabelKey = "label",
  optionValueKey,
  optionCompareKey,
  optionKeyExtractor,
  required,
  disabled,
  containerProps,
  onChange,
  customOnChange,
}) {
  const theme = useTheme();
  const checkboxFieldStyles = styles();
  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const error = errors[field.name]?.message;

  const fieldValue = value !== undefined ? value : field.value;

  function handleChange(item) {
    let optionsValue = [optionValueKey ? accessObjectByString(item, optionValueKey) : item];

    if (Array.isArray(fieldValue)) {
      optionsValue = [...fieldValue, ...optionsValue];

      const optionToRemove = fieldValue.findIndex((option) => {
        if (optionValueKey) {
          return accessObjectByString(item, optionValueKey) === option;
        }

        return (
          accessObjectByString(option, optionIdentifier) ===
          accessObjectByString(item, optionIdentifier)
        );
      });

      if (optionToRemove !== -1) {
        optionsValue = fieldValue.filter((option) => {
          if (optionValueKey) {
            return accessObjectByString(item, optionValueKey) !== option;
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

  function verifySelectedOptions(item) {
    return fieldValue?.some((option) => {
      if (optionValueKey) {
        return accessObjectByString(item, optionValueKey) === option;
      }

      return (
        accessObjectByString(option, optionIdentifier) ===
        accessObjectByString(item, optionIdentifier)
      );
    });
  }

  return (
    <View {...containerProps} style={[checkboxFieldStyles.container, containerProps?.style]}>
      <Label disabled={disabled} required={required} error={error}>
        {label}
      </Label>
      <View style={[checkboxFieldStyles.list, { flexDirection: direction }]}>
        {options?.map((item, index) => {
          const selected = verifySelectedOptions(item);

          return (
            <TouchableOpacity
              onPress={() => (onChange instanceof Function ? onChange(item) : handleChange(item))}
              style={[
                checkboxFieldStyles.option,
                (item.disabled || disabled) && checkboxFieldStyles.disableOption,
              ]}
              disabled={item.disabled || disabled}
              key={optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor) : index}
            >
              <View
                style={[
                  checkboxFieldStyles.optionInput,
                  selected && checkboxFieldStyles.selectedOptionInput,
                  error && checkboxFieldStyles.errorOptionInput,
                ]}
              >
                <MaterialIcons
                  style={{
                    opacity: selected ? 1 : 0,
                  }}
                  name="check"
                  size={16}
                  color={theme.colors.secondary[0]}
                />
              </View>
              <Text style={checkboxFieldStyles.optionText}>
                {accessObjectByString(item, optionLabelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ErrorMessage>{error}</ErrorMessage>
    </View>
  );
}

export default CheckboxField;
