import { IFlatLisProps } from "@/components/Lists/FlatList/types";
import { Control } from "react-hook-form";
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type IKeyOfOptions<T> = keyof T & string;

interface IAutocompleteProps<T> {
  value?: string | number | null;
  name: string;
  label?: string;
  control: Control<any, any>;
  multiple?: boolean;
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
  listProps?: Omit<IFlatLisProps<T>, "data" | "renderItem">;
  loading?: boolean;
  onChange?(value: unknown): void;
  onChangeText?(value: string): void;
  customOnChange?(value: unknown): void;
  onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
}

export { IAutocompleteProps, IKeyOfOptions };
