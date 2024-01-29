import React, { useMemo } from "react";
import { useController } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import accessObjectByString from "../../../utils/accessObjectByString";
import styles from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";

function RadioField({
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
  const radioFieldStyles = styles();
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
    let newValue = null;

    if (optionValueKey) {
      const value = accessObjectByString(item, optionValueKey);
      newValue = value === fieldValue ? newValue : value;
    } else {
      const optionValue = accessObjectByString(item, optionIdentifier);
      const newFieldValue = accessObjectByString(fieldValue, optionIdentifier);
      newValue = optionValue === newFieldValue ? newValue : item;
    }

    field.onChange(newValue);

    if (customOnChange instanceof Function) customOnChange(newValue);
  }

  function verifySelectedOptions(item) {
    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === fieldValue;
    }

    return (
      accessObjectByString(fieldValue, optionIdentifier) ===
      accessObjectByString(item, optionIdentifier)
    );
  }

  return (
    <View {...containerProps} style={[radioFieldStyles.container, containerProps?.style]}>
      <Label disabled={disabled} required={required} error={error}>
        {label}
      </Label>
      <View style={[radioFieldStyles.list, { flexDirection: direction }]}>
        {options?.map((item, index) => {
          const selected = verifySelectedOptions(item);

          return (
            <TouchableOpacity
              style={[
                radioFieldStyles.option,
                (item.disabled || disabled) && radioFieldStyles.disableOption,
              ]}
              disabled={item.disabled || disabled}
              onPress={() => (onChange instanceof Function ? onChange(item) : handleChange(item))}
              key={optionKeyExtractor ? accessObjectByString(item, optionKeyExtractor) : index}
            >
              <View
                style={[
                  radioFieldStyles.optionInput,
                  selected && radioFieldStyles.selectedOptionInput,
                  error && radioFieldStyles.errorOptionInput,
                ]}
              >
                <View
                  style={[
                    radioFieldStyles.optionInputSelection,
                    selected && radioFieldStyles.selectedOptionInputSelection,
                  ]}
                />
              </View>
              <Text style={[radioFieldStyles.optionText]}>
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

export default RadioField;
