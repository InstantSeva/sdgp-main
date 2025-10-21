import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { typography } from "../../theme/typography";

interface Props {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const SecondaryButton: React.FC<Props> = ({ text, onPress, style, disabled = false }) => {
  const theme = useTheme() as Record<string, string | number>;
  const dynamicStyles = styles(theme, disabled);

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.9}
      onPress={onPress}
      disabled={disabled}
      style={[dynamicStyles.button, style]}
    >
      <Text style={dynamicStyles.text}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Record<string, string | number>, disabled: boolean) =>
  StyleSheet.create({
    button: {
      width: "100%",
      minHeight: 50,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: disabled
        ? (theme["primary-disabled-color"] as string)
        : (theme["primary-color"] as string),
      backgroundColor: "transparent",
      marginVertical: 6,
      paddingVertical: 12,
    },
    text: {
      color: disabled
        ? (theme["primary-disabled-color"] as string)
        : (theme["primary-color"] as string),
      fontSize: typography.fontSize.md,
      fontFamily: typography.fontFamily.medium,
      fontWeight: "600",
      textAlign: "center",
    },
  });

export default SecondaryButton;
