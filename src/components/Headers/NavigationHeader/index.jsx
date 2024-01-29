import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import useTheme from "../../../hooks/useTheme";
import styles from "./styles";
import { IconButton } from "../../Buttons";

function NavigationHeader({ title }) {
  const style = styles();
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={style.container}>
      <View style={style.horizontalView}>
        {navigation.canGoBack() && (
          <IconButton
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={26}
            icon={MaterialIcons}
            color={theme.colors.secondary[0]}
            style={style.iconContainer}
          />
        )}
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
}

export default NavigationHeader;
