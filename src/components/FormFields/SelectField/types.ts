import { Control } from "react-hook-form";

interface ISelectFieldProps <T>{
  name: string;
  label: string;
  control: Control<any, any>;
  options: T[];
  optionKeyExtractor;
  optionLabelKey = "label";
  optionValueKey;
  optionCompareKey;
  emptyMessage;
  placeholder;
  required;
  disabled;
  inputProps;
  containerProps;
  listProps;
  loading;
  onChange;
  customOnChange;
  onFocus;
  onBlur;
}