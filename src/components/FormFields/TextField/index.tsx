import React, { useCallback, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { formatWithMask } from "../../../utils/mask";
import styles from "./styles";
import { ErrorMessage, Label } from "../FieldUtilitaries";
import { IconButton } from "../../Buttons";
import { ITextFieldProps } from "./types";
import { ExpoVectorIcon, IconWithName } from "@/types/ExpoVectorIcons";

const defaultController: any = {
  field: {},
  formState: {
    errors: {},
  },
};

function TextField<T extends IconWithName = ExpoVectorIcon>({
  name,
  value,
  control,
  label,
  textArea,
  numberOfLines = 10,
  mask,
  password = false,
  errorMessage,
  showErrorMessage = true,
  selectionColor,
  leftIcon,
  rightIcon,
  placeholder,
  required,
  disabled,
  customOnChange,
  containerProps,
  inputProps,
  onChangeText,
  onBlur,
  onEndEditing,
  onFocus,
}: ITextFieldProps<T>) {
  const theme = useTheme();
  const textFieldStyles = styles();
  const [focused, setFocused] = useState(false);
  const [visibility, setVisibility] = useState(() => (password ? "visibility" : "visibility-off"));

  const {
    field,
    formState: { errors },
  } = name && control ? useController({ name, control }) : defaultController;
  const error = errorMessage || errors[field.name]?.message;

  const toggleFocus = useCallback(() => {
    setFocused((focused) => !focused);
  }, []);

  const toggleVisibility = useCallback(() => {
    setVisibility((visibility) => (visibility === "visibility" ? "visibility-off" : "visibility"));
  }, []);

  const textAreaStyles = useMemo(() => {
    if (!textArea) return;

    const initialHeight = 20;
    const height = numberOfLines ? numberOfLines * initialHeight : 10 * initialHeight;

    return {
      ...textFieldStyles.textArea,
      height,
    };
  }, [textArea, numberOfLines]);

  return (
    <View {...containerProps} style={[textFieldStyles.container, containerProps?.style]}>
      <Label error={error} disabled={disabled} required={required}>
        {label}
      </Label>
      <TextInput
        multiline={textArea}
        {...inputProps}
        numberOfLines={textArea ? 10 : undefined}
        style={[
          textFieldStyles.input,
          textAreaStyles,
          inputProps?.style,
          leftIcon && textFieldStyles.inputWithLeftIcon,
          (rightIcon || password) && textFieldStyles.inputWithRightIcon,
          focused && textFieldStyles.focus,
          disabled && textFieldStyles.disabled,
          error && textFieldStyles.error,
        ]}
        value={value || field.value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.secondary[400]}
        selectionColor={selectionColor || theme.colors.primary[0]}
        editable={!disabled}
        secureTextEntry={visibility === "visibility"}
        onEndEditing={onEndEditing}
        onChangeText={(value) => {
          let newValue = value;

          if (mask) {
            newValue = formatWithMask({
              mask,
              text: value,
            }).masked;
          }

          if (onChangeText instanceof Function) {
            onChangeText(newValue);

            if (customOnChange instanceof Function) {
              customOnChange(newValue);
            }
          } else {
            field.onChange(newValue);

            if (customOnChange instanceof Function) {
              customOnChange(newValue);
            }
          }
        }}
        onBlur={(event) => {
          toggleFocus();

          if (onBlur instanceof Function) {
            onBlur(event);
          }
        }}
        onFocus={(event) => {
          toggleFocus();

          if (onFocus instanceof Function) {
            onFocus(event);
          }
        }}
      />
      {leftIcon && (
        <IconButton
          style={[textFieldStyles.leftIcon, showErrorMessage && error && { bottom: 34 }]}
          name={leftIcon.name}
          icon={leftIcon.icon}
          color={leftIcon.color}
          size={24}
          activeOpacity={leftIcon.onPress ? 0.7 : 1}
          onPress={leftIcon.onPress}
        />
      )}
      {(rightIcon || password) && (
        <IconButton
          style={[textFieldStyles.rightIcon, showErrorMessage && error && { bottom: 34 }]}
          name={password ? visibility : rightIcon!.name}
          icon={password ? MaterialIcons : rightIcon!.icon}
          color={rightIcon?.color || theme.colors.primary[200]}
          size={24}
          activeOpacity={rightIcon?.onPress ? 0.7 : 1}
          onPress={password ? toggleVisibility : rightIcon!.onPress}
        />
      )}
      <ErrorMessage>{showErrorMessage ? error : null}</ErrorMessage>
    </View>
  );
}

export default TextField;
