import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { Text, XStack } from 'tamagui';

import { useTheme } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive';
export type ButtonSize = 'large' | 'medium' | 'small';

type ButtonProps = {
  readonly children?: ReactNode;
  readonly icon?: LucideIcon;
  readonly iconPosition?: 'left' | 'right';
  readonly disabled?: boolean;
  readonly onPress?: () => void;
  readonly size?: ButtonSize;
  readonly testID?: string;
  readonly variant?: ButtonVariant;
  readonly fullWidth?: boolean;
} & Omit<PressableProps, 'disabled' | 'onPress'>;

const SIZE_CONFIG = {
  large: { height: 56, paddingHorizontal: 24, fontSize: 20, iconSize: 24, borderRadius: 28 },
  medium: { height: 48, paddingHorizontal: 20, fontSize: 16, iconSize: 18, borderRadius: 24 },
  small: { height: 40, paddingHorizontal: 16, fontSize: 14, iconSize: 16, borderRadius: 20 },
  xSmall: { height: 30, paddingHorizontal: 12, fontSize: 12, iconSize: 16, borderRadius: 15 },
} as const;

function Button({
  children,
  icon: IconComponent,
  iconPosition = 'left',
  disabled = false,
  onPress,
  size = 'medium',
  testID,
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const sizeConfig = SIZE_CONFIG[size];

  const styles = useMemo(() => {
    if (disabled) {
      return { bg: colors.disabled, text: colors.white, icon: colors.white, shadow: undefined, border: colors.border };
    }

    const variantMap = {
      primary: { bg: colors.primary, text: colors.white, icon: colors.white, shadow: colors.primary, border: undefined },
      secondary: { bg: colors.white, text: colors.black, icon: colors.black, border: colors.border, shadow: colors.border },
      destructive: { bg: colors.error, text: colors.white, icon: colors.white, shadow: colors.error, border: undefined },
    };

    return variantMap[variant];
  }, [variant, disabled, colors]);

  const isIconOnly = IconComponent && !children;

  const buttonStyle: StyleProp<ViewStyle> = {
    height: isIconOnly ? sizeConfig.height : undefined,
    width: isIconOnly
      ? sizeConfig.height
      : fullWidth
        ? '100%'
        : undefined,
    minHeight: !isIconOnly ? sizeConfig.height : undefined,
    paddingHorizontal: isIconOnly ? 0 : sizeConfig.paddingHorizontal,
    borderRadius: isIconOnly ? sizeConfig.height / 2 : sizeConfig.borderRadius,
    backgroundColor: styles.bg,
    borderColor: styles.border,
    borderWidth: styles.border ? 2 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
  };


  const renderContent = () => {
    const Icon = IconComponent ? <IconComponent size={sizeConfig.iconSize} color={styles.icon} /> : null;
    const TextEl = children ? <Text color={styles.text} fontSize={sizeConfig.fontSize} fontWeight="600">{children}</Text> : null;

    if (isIconOnly) return Icon;

    if (!Icon) return TextEl;

    if (iconPosition === 'right') {
      return <XStack alignItems="center" gap={8}>{TextEl}{Icon}</XStack>;
    }

    return <XStack alignItems="center" gap={8}>{Icon}{TextEl}</XStack>;
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel || (typeof children === 'string' ? children : 'Button')}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={({ pressed }) => [
        buttonStyle,
        isFocused && !disabled && {
          shadowColor: styles.shadow,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 6,
        },
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      {renderContent()}
    </Pressable>
  );
}

export default Button;
