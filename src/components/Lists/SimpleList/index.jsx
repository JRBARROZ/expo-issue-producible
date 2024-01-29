import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function SimpleList({ data = [], customIcon, type = "unorded", message, style }) {
  const styled = styles();

  return (
    <View style={styled.container}>
      {data?.length > 0 ? (
        data.map((item, index) => {
          const icons = {
            unorded: <View style={styled.unorded} />,
            orded: <Text style={styled.orded}>{`${index + 1}.`}</Text>,
          };
          return (
            <View style={styled.horizontalView} key={index}>
              {customIcon || icons[type]}
              <Text style={[styled.option, style]}>{item}</Text>
            </View>
          );
        })
      ) : (
        <View style={styled.emptyContainer}>
          <Text style={styled.emptyText}>{message || "Nenhum item encontrado."}</Text>
        </View>
      )}
    </View>
  );
}

export default SimpleList;
