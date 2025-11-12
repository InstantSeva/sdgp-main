import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { Input, useTheme } from "@ui-kitten/components";
import { typography } from "../../theme/typography";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const InputField: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChangeText,
  disabled = false,
  required = false,
  leftIcon,
  rightIcon,
}) => {
  const theme = useTheme() as Record<string, string | number>;
  const finalLabel = required ? `${label} *` : label;
  const renderLeftIcon = leftIcon ? () => leftIcon : undefined;
  const renderRightIcon = rightIcon ? () => rightIcon : undefined;
  const dynamicStyles = styles(theme, disabled);

  return (
    <Input
      label={finalLabel}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      disabled={disabled}
      accessoryLeft={renderLeftIcon}
      accessoryRight={renderRightIcon}
      style={dynamicStyles.input}
      textStyle={dynamicStyles.text}
      placeholderTextColor={theme["text-disabled-color"] as string}
    />
  );
};

const styles = (theme: Record<string, string | number>, disabled: boolean) =>
  StyleSheet.create({
    input: {
      width: "100%",
      minHeight: 50,
      marginVertical: 2,
      paddingVertical: 8,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: disabled
        ? (theme["input-border-disabled-color"] as string)
        : (theme["input-border-color"] as string),
      backgroundColor: disabled
        ? (theme["input-background-disabled-color"] as string)
        : (theme["input-background-color"] as string),
      paddingHorizontal: 0,
    },
    text: {
      fontSize: typography.fontSize.md,
      fontFamily: typography.fontFamily.medium,
      color: disabled
        ? (theme["text-disabled-color"] as string)
        : (theme["text-basic-color"] as string),
    },
  });

export default InputField;
