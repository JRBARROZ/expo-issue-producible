import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

function UnauthenticatedRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} headerMode="none" initialRouteName="LogIn">
      <Screen name="SIGIN" component={null} />
    </Navigator>
  );
}

export default UnauthenticatedRoutes;
