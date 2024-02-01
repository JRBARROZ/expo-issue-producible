import { Control } from "react-hook-form";
import {
  ColorValue,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputProps,
  ViewProps,
} from "react-native";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { IIconButtonProps } from "@/components/Buttons/IconButton/types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

type IInputIcon<T extends ExpoVectorIcon = ExpoVectorIcon> = Omit<
  IIconButtonProps<T>,
  "style" | "activeOpacity" | "size"
>;

interface ITextFieldProps<T extends ExpoVectorIcon = ExpoVectorIcon> {
  name?: string;
  value?: string;
  control?: Control<any, any>;
  label?: string;
  textArea?: boolean;
  numberOfLines?: number;
  mask?: RegExp[];
  password?: boolean;
  errorMessage?: string;
  showErrorMessage?: boolean;
  selectionColor?: ColorValue;
  leftIcon?: IInputIcon<T>;
  rightIcon?: IInputIcon<T>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  customOnChange?(value: string): void;
  containerProps?: ViewProps;
  inputProps?: TextInputProps;
  onChangeText?(value: string): void;
  onBlur?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onEndEditing?(e: NativeSyntheticEvent<TextInputEndEditingEventData>): void;
  onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
}

export { IInputIcon, ITextFieldProps };
