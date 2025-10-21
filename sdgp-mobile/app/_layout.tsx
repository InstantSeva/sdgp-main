import "../localization/i18n";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, LogBox } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as Font from "expo-font";
import { Slot } from "expo-router";
import { t } from "i18next";

// Fonts
import Inter from "@assets/fonts/Inter.ttf";
import InterBold from "@assets/fonts/InterBold.ttf";
import InterMedium from "@assets/fonts/InterMedium.ttf";
import InterSemiBold from "@assets/fonts/InterSemiBold.ttf";
import PoppinsBold from "@assets/fonts/Poppins-Bold.ttf";
import PoppinsMedium from "@assets/fonts/Poppins-Medium.ttf";
import PoppinsRegular from "@assets/fonts/Poppins-Regular.ttf";
import PoppinsSemiBold from "@assets/fonts/Poppins-SemiBold.ttf";
import { ThemeProvider, useAppTheme } from "../theme/ThemeContext";

LogBox.ignoreLogs(['Unsupported top level event type "topSvgLayout"']);

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const styles = MainLayoutStyle();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "poppins-regular": PoppinsRegular,
          "poppins-medium": PoppinsMedium,
          "poppins-semibold": PoppinsSemiBold,
          "poppins-bold": PoppinsBold,
          inter: Inter,
          "inter-medium": InterMedium,
          "inter-semibold": InterSemiBold,
          "inter-bold": InterBold,
        });
        setFontLoaded(true);
      } catch (error) {
        console.error("Font loading error:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontLoaded) return null;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider>
        <ThemedApp isOffline={isOffline} styles={styles} />
      </ThemeProvider>
    </>
  );
}

function ThemedApp({
  isOffline,
  styles,
}: {
  isOffline: boolean;
  styles: ReturnType<typeof MainLayoutStyle>;
}) {
  const { themeObject } = useAppTheme();

  return (
    <ApplicationProvider {...eva} theme={themeObject}>
      {isOffline && (
        <View style={styles.viewContainer}>
          <Text style={styles.text} allowFontScaling={false}>
            {t("network_error")}
          </Text>
        </View>
      )}
      <Slot initialRouteName="(public)" />
    </ApplicationProvider>
  );
}

// ✅ Typed styles
export const MainLayoutStyle = () =>
  StyleSheet.create({
    viewContainer: {
      position: "absolute",
      top: 50,
      left: "5%",
      width: "90%",
      padding: 10,
      backgroundColor: "red",
      borderRadius: 8,
      zIndex: 999,
    },
    text: {
      color: "white",
      textAlign: "center",
      fontSize: 12,
    },
  });
