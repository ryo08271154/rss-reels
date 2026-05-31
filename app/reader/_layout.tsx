import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

export default function ReaderLayout() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("settingReaderModeName"),
          headerRight: () => (
            <Pressable onPress={() => openBrowserAsync(url)}>
              <Ionicons name="open-outline" size={24} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
