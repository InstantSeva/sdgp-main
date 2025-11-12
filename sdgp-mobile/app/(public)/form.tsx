import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";
import InputField from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export default function FormPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "" });
  const theme = useTheme();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout
      style={[
        styles.container,
        { backgroundColor: theme["input-background-disabled-color"] as string },
      ]}
    >

      <View style={styles.formContainer}>
        <InputField label="Name" placeholder="Enter your name" value={form.name} onChangeText={(t) => handleChange("name", t)} />
        <InputField label="Email" placeholder="Enter your email" value={form.email} onChangeText={(t) => handleChange("email", t)} />
        <InputField label="Phone" placeholder="Enter your phone number" value={form.phone} onChangeText={(t) => handleChange("phone", t)} />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton text="Submit" onPress={() => {}} />
        <SecondaryButton text="Cancel" onPress={() => {}} />
      </View>
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
  header: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
  },
});
