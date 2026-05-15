import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider as MyThemeProvider } from "@/context/ThemeContext";
import "@/lib/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MyThemeProvider>
        <SettingsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </SettingsProvider>
      </MyThemeProvider>
    </ThemeProvider>
  );
}
