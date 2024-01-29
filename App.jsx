import React from "react";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AuthProvider } from "./src/contexts/AuthContext";
import Routes from "./src/routes";
import { ErrorBoundary } from "./src/components";
import { FullPageLoading } from "./src/components/Loading";
import { GlobalContextProvider } from "./src/contexts/GlobalContext";
import { StatusNotifier } from "./src/components/Notifiers";
import useTheme from "./src/hooks/useTheme";

const queryClient = new QueryClient();

export default function App() {
  const theme = useTheme();

  const [fontLoaded] = useFonts({
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <GlobalContextProvider>
              <AuthProvider>
                    <GestureHandlerRootView
                      style={{ flex: 1, backgroundColor: theme.colors.secondary[0] }}
                    >
                      <BottomSheetModalProvider>
                        {Platform.OS === "android" ? (
                          <>
                            <StatusBar style="light" backgroundColor={theme.colors.primary[200]} />
                            <Routes />
                            <ConnectionFeedback />
                          </>
                        ) : (
                          <>
                            <StatusBar style="light" />
                            <SafeAreaView
                              style={{ flex: 1, backgroundColor: theme.colors.primary[200] }}
                            >
                              <Routes />
                              <ConnectionFeedback />
                            </SafeAreaView>
                          </>
                        )}
                      </BottomSheetModalProvider>
                      <StatusNotifier />
                      <FullPageLoading />
                    </GestureHandlerRootView>
              </AuthProvider>
          </GlobalContextProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
