import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { Link } from "expo-router";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default function WelcomePage() {
  const theme = useTheme();
  const themedStyles = createThemedStyles(theme);

  return (
    <Layout style={themedStyles.container}>
      <Text category="h1" style={themedStyles.title}>
        WELCOME
      </Text>

      <Text category="h3" style={themedStyles.subtitle}>
        SDGP JOB
      </Text>

      <Link href="/(public)/settings" asChild>
        <PrimaryButton text="Go to Settings" />
      </Link>

      <Link href="/(public)/form" asChild>
        <SecondaryButton text="Go to Form Page" />
      </Link>
    </Layout>
  );
}

const createThemedStyles = (theme: Record<string, string | number>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: theme["input-background-disabled-color"] as string,
    },
    title: {
      marginBottom: 8,
      color: theme["text-basic-color"] as string,
      fontFamily: "poppins-bold",
      textAlign: "center",
    },
    subtitle: {
      marginBottom: 40,
      color: theme["text-basic-color"] as string,
      fontFamily: "poppins-medium",
      textAlign: "center",
    },
  });
