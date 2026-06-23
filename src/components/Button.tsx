import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, font, radius, spacing } from '@/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  style,
  icon,
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.green : colors.white} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, textStyles[variant], icon ? { marginLeft: 8 } : null]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
  primary: { backgroundColor: colors.wheat },
  secondary: { backgroundColor: colors.green },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.green },
  ghost: { backgroundColor: colors.greenSoft },
  disabled: { opacity: 0.5 },
  text: { fontSize: font.size.md, fontWeight: font.weight.bold },
});

const textStyles = StyleSheet.create({
  primary: { color: colors.greenDark },
  secondary: { color: colors.white },
  outline: { color: colors.green },
  ghost: { color: colors.green },
});
