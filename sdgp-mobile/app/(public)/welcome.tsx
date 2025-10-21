import { Text, View } from "react-native";
import { t } from "i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: "#000" }}>{t("hello")}</Text>
        <Text style={{ color: "#000" }}>{"welcome"}</Text>
        <Text style={{ color: "#000" }}>{"test"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
