import { Slot } from "expo-router";
import { useFonts } from "expo-font";

import { QueryClientProvider } from "react-query";
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { queryClient } from "@/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import theme from "@/global/theme";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db, expo } from "@/config/db";
import migrations from "../../drizzle/migrations";
export default function Setup() {
  const { success, error } = useMigrations(db, migrations);
  console.log("[DB] Initializing Database", success, error);
  useDrizzleStudio(expo);

  const [fontLoaded] = useFonts({
    "Montserrat-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Semibold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  
  if (!success) return null;
  if (!fontLoaded) return null;

  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <GestureHandlerRootView
            style={{
              flex: 1,
            }}
          >
            <BottomSheetModalProvider>
              {Platform.OS === "android" ? (
                <>
                  <StatusBar style="light" backgroundColor={theme["light"].colors.primary?.[200]} />
                  <Slot />
                </>
              ) : (
                <>
                  <StatusBar style="light" />
                  <SafeAreaView style={{ flex: 1 }}>
                    <Slot />
                  </SafeAreaView>
                </>
              )}
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </GlobalContextProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}
