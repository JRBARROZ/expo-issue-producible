import { DateField, SelectField, TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import AutoCompleteField from "@/components/FormFields/AutocompleteField";
import { ScrollView } from "react-native-gesture-handler";
import PaginatedAutoCompleteField from "@/components/FormFields/PaginatedAutocompleteField";

interface IOption {
  id: number;
  label: string;
}

interface IFormValues {
  text: string;
  date: Date;
  select: IOption | null;
  autocomplete: IOption | null;
  paginated_autocomplete: IOption | null;
}

interface IGetOptionsParams {
  page: number;
  limit: number;
  label?: string;
}
const options: IOption[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  label: `Option ${index + 1}`,
}));

async function getOptions({ page, limit, label }: IGetOptionsParams) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let newOptions = options;

  if (label) {
    const regex = new RegExp(label, "i");

    newOptions = options.filter((option) => {
      return regex.test(option.label);
    });
  }

  const optionsPage = page * limit;
  const optionsLimit = optionsPage + limit;

  return {
    total: Math.floor(newOptions.length / limit),
    items: newOptions.slice(optionsPage, optionsLimit),
  };
}

export default function Index() {
  const { control, watch } = useForm<IFormValues>({
    defaultValues: {
      text: "",
      date: new Date(),
      select: null,
      autocomplete: null,
      paginated_autocomplete: null,
    },
  });

  const values = watch();

  return (
    <ScrollView
      style={{
        padding: 12,
        paddingTop: 50,
        rowGap: 4,
      }}
    >
      <View
        style={{
          padding: 12,
          backgroundColor: "#e0e0e0",
          borderRadius: 6,
          rowGap: 2,
          margin: 6,
        }}
      >
        {Object.entries(values).map(([key, value]) => (
          <Text>
            <Text
              style={{
                fontWeight: "500",
              }}
            >
              {key}:{" "}
            </Text>
            {value instanceof Date
              ? format(value, "dd/MM/yyyy")
              : value?.label
                ? value.label
                : value}
          </Text>
        ))}
      </View>

      <TextField<typeof MaterialIcons, typeof Ionicons>
        label="TextField"
        name="text"
        control={control}
        rightIcon={{
          name: "add-circle",
          icon: Ionicons,
        }}
        leftIcon={{
          name: "accessibility-new",
          icon: MaterialIcons,
        }}
      />

      <DateField label="DateField" name="date" control={control} />

      <SelectField
        label="Select"
        name="select"
        control={control}
        options={options}
        optionLabelKey="label"
        optionCompareKey="id"
      />

      <AutoCompleteField
        label="Autocomplete"
        name="autocomplete"
        control={control}
        options={options}
        optionLabelKey="label"
        optionCompareKey="id"
      />

      <PaginatedAutoCompleteField
        label="PaginatedAutocomplete"
        name="paginated_autocomplete"
        control={control}
        optionLabelKey="label"
        optionCompareKey="id"
        queryKey="paginated-autocomplete"
        filterKey="label"
        service={getOptions}
      />
    </ScrollView>
  );
}
