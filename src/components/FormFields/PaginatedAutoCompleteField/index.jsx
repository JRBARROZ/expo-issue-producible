import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { useQuery } from "react-query";
import accessObjectByString from "../../../utils/accessObjectByString";
import AutoCompleteField from "../AutoCompleteField";
import { useDebounceCallback } from "../../../hooks";

function PaginatedAutoCompleteField({
  name,
  control,
  multiple,
  optionKeyExtractor,
  optionLabelKey = "label",
  optionValueKey,
  optionCompareKey,
  emptyMessage,
  label,
  placeholder,
  required,
  disabled,
  service,
  refetchService = [],
  limit = 10,
  filterKey,
  queryKey,
  inputProps,
  containerProps,
  customOnChange,
  onChange,
  onChangeText,
  onFocus,
  onBlur,
}) {
  const { field } = useController({ name, control });

  const [options, setOptions] = useState([]);
  const [textValue, setTextValue] = useState(() => {
    return field.value ? accessObjectByString(field.value, optionLabelKey) : field.value;
  });
  const [debouncedTextValue, setDebouncedTextValue] = useState(null);

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const serviceQuery = useQuery(
    [queryKey, page, limit, debouncedTextValue, ...refetchService],
    () => {
      if (filterKey) return service({ page, limit, [filterKey]: debouncedTextValue });
      return service({ page, limit });
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!queryKey,
      onSuccess(response) {
        if (!!response?.items) {
          setTotalPage(response.total);
          setOptions((options) => [...options, ...response.items]);
        } else {
          setOptions((options) => [...options, ...response]);
        }
      },
      onError() {
        setOptions([]);
      },
    }
  );

  useEffect(() => {
    if (field.value instanceof Object && !multiple) {
      setTextValue(accessObjectByString(field.value, optionLabelKey));
    } else if (optionValueKey && !multiple) {
      const findedOption = options.find(
        (item) => accessObjectByString(item, optionValueKey) === field.value
      );
      setTextValue(accessObjectByString(findedOption, optionLabelKey));
    } else if (!field.value && textValue) {
      setTextValue(null);
    }
  }, [field.value, optionLabelKey]);

  function handleFilter(value) {
    if (queryKey) {
      if (page !== 0 || value !== debouncedTextValue) {
        setOptions([]);
        serviceQuery.refetch();
        setPage(0);
        setDebouncedTextValue(value);
      }
    }
  }

  const debouncedHandleFilter = useDebounceCallback(handleFilter);

  return (
    <AutoCompleteField
      name={name}
      label={label}
      value={textValue}
      control={control}
      multiple={multiple}
      placeholder={placeholder}
      inputProps={inputProps}
      containerProps={containerProps}
      disabled={disabled}
      required={required}
      emptyMessage={emptyMessage}
      optionKeyExtractor={optionKeyExtractor}
      optionLabelKey={optionLabelKey}
      optionValueKey={optionValueKey}
      optionCompareKey={optionCompareKey}
      options={options}
      loading={serviceQuery.isFetching}
      listProps={{
        onEndReached: () => {
          if (
            totalPage > page &&
            !serviceQuery.isFetching &&
            !serviceQuery.error &&
            options.length
          ) {
            setPage((page) => page + 1);
          }
        },
      }}
      onChange={onChange}
      customOnChange={customOnChange}
      onChangeText={(value) => {
        const hasValue = field.value instanceof Object;
        const newValue = hasValue && textValue !== value ? null : value;

        setTextValue(newValue);
        if (hasValue) field.onChange(null);
        debouncedHandleFilter(newValue);

        if (onChangeText instanceof Function) {
          onChangeText(newValue);
        }
      }}
      onFocus={onFocus}
      onBlur={(event) => {
        if (!(field.value instanceof Object) && textValue && !optionValueKey) {
          setTextValue(null);
          handleFilter(null);
        }

        if (onBlur instanceof Function) {
          onBlur(event);
        }
      }}
    />
  );
}

export default PaginatedAutoCompleteField;
