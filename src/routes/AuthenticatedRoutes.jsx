import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserHeader } from "../components/Headers";

const { Navigator, Screen } = createNativeStackNavigator();

function AuthenticatedRoutes() {
  return (
    <Navigator initialRouteName="HOME">
      <Screen
        name="HOME"
        component={null}
        options={{
          header: () => <UserHeader />,
        }}
      />
    </Navigator>
  );
}

export default AuthenticatedRoutes;
