import { TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { IconButton } from "@/components/Buttons";

export default function Index() {
  const { control, watch } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const values = watch();

  return (
    <View
      style={{
        padding: 12,
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
            {value}
          </Text>
        ))}
      </View>

      <IconButton<typeof MaterialIcons> icon={MaterialIcons} name="10k" />

      <TextField<typeof MaterialIcons>
        label="TextField"
        name="text"
        control={control}
        leftIcon={{
          name: "accessibility-new",
          icon: MaterialIcons,
        }}
      />
    </View>
  );
}
