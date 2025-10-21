import React from "react";
import { useTheme } from "@ui-kitten/components";
import { Stack } from "expo-router";
import { useAppTheme } from "../../theme/ThemeContext";

export default function PublicLayout() {
  const { themeName } = useAppTheme();
  const uiTheme = useTheme();

  const headerBackgroundColor = uiTheme["background-basic-color-1"];
  const headerTextColor = uiTheme["text-basic-color"];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: headerBackgroundColor },
        headerTintColor: headerTextColor,
        headerTitleStyle: { color: headerTextColor, fontWeight: "600" },
        contentStyle: { backgroundColor: uiTheme["background-basic-color-1"] },
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="form" options={{ title: "Form" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
