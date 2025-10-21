import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Toggle, useTheme } from "@ui-kitten/components";
import { useAppTheme } from "../../theme/ThemeContext";

export default function SettingsPage() {
  const { themeName, toggleTheme } = useAppTheme();
  const theme = useTheme();

  return (
    <Layout
      style={[
        styles.container,
        { backgroundColor: theme["input-background-disabled-color"] as string },
      ]}
    >
      
      <Toggle
        checked={themeName === "dark"}
        onChange={toggleTheme}
        status="primary"
        style={[styles.toggle, { borderColor: theme["primary-color"] as string }]}
      >
        {themeName === "dark" ? "DARK MODE" : "LIGHT MODE"}
      </Toggle>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
    marginBottom: 30,
    fontWeight: "700",
  },
  toggle: {
    width: "100%",
    alignSelf: "center"
  },
});
