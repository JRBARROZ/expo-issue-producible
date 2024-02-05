import { IFlatlisProps } from "@/components/BottomSheets/BottomSheetList/types";
import { Control } from "react-hook-form";
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type IKeyOfOptions<T> = keyof T & string;

interface ISelectFieldProps<T> {
  name: string;
  label?: string;
  control: Control<any, any>;
  options: T[];
  optionKeyExtractor?: IKeyOfOptions<T>;
  optionLabelKey: IKeyOfOptions<T>;
  optionValueKey?: IKeyOfOptions<T>;
  optionCompareKey?: IKeyOfOptions<T>;
  emptyMessage?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  inputProps?: TextInputProps;
  containerProps?: ViewProps;
  listProps?: IFlatlisProps<T>;
  loading?: boolean;
  onChange?(value: T | any): void;
  customOnChange?(value: T | any): void;
  onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(): void;
}

export { ISelectFieldProps, IKeyOfOptions };
