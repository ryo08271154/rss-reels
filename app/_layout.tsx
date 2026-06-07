import { SavedArticleIdsProvider } from "@/context/SavedArticleIdsContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider as MyThemeProvider } from "@/context/ThemeContext";
import "@/lib/i18n";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MyThemeProvider>
        <SettingsProvider>
          <SavedArticleIdsProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="reader" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
              <Toast />
            </GestureHandlerRootView>
          </SavedArticleIdsProvider>
        </SettingsProvider>
      </MyThemeProvider>
    </ThemeProvider>
  );
}
