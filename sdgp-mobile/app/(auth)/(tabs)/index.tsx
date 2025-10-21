import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>index</Text>
      <Text>{t("hello")}</Text>
    </View>
  );
}
