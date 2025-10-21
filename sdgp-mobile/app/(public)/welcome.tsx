import { t } from "i18next";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: "#000" }}>{t("hello")}</Text>
        <Text style={{ color: "#000" }}>{"welcome"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
