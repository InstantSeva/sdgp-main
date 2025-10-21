import "../localization/i18n";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import { Slot } from "expo-router";
import { t } from "i18next";
import Inter from "@assets/fonts/Inter.ttf";
import InterBold from "@assets/fonts/InterBold.ttf";
import InterMedium from "@assets/fonts/InterMedium.ttf";
import InterSemiBold from "@assets/fonts/InterSemiBold.ttf";
import PoppinsBold from "@assets/fonts/Poppins-Bold.ttf";
import PoppinsMedium from "@assets/fonts/Poppins-Medium.ttf";
import PoppinsRegular from "@assets/fonts/Poppins-Regular.ttf";
import PoppinsSemiBold from "@assets/fonts/Poppins-SemiBold.ttf";

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const styles = MainLayoutStyle();

  useEffect(() => {
    const loadFontsAndSetup = async () => {
      try {
        await Font.loadAsync({
          "poppins-regular": PoppinsRegular,
          "poppins-bold": PoppinsBold,
          inter: Inter,
          "inter-medium": InterMedium,
          "poppins-semibold": PoppinsSemiBold,
          "inter-bold": InterBold,
          "inter-semibold": InterSemiBold,
          "poppins-medium": PoppinsMedium,
        });
        setFontLoaded(true);
      } catch (error) {
        console.error(
          "Error loading fonts or setting up notifications:",
          error
        );
      }
    };

    void loadFontsAndSetup();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      {isOffline && (
        <View style={styles.viewContainer}>
          <Text style={styles.text} allowFontScaling={false}>
            {t("network_error")}
          </Text>
        </View>
      )}
      <Slot initialRouteName="(public)" />
    </>
  );
}

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
    text: { color: "white", textAlign: "center", fontSize: 12 },
  });
