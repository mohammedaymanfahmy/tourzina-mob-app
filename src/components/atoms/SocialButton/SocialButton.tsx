import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { Text, XStack } from 'tamagui';

import { useTheme } from '@/theme';

// Import SVG components directly
import AppleDark from '@/theme/assets/icons/apple-dark.svg';
import AppleLight from '@/theme/assets/icons/apple-light.svg';
import FacebookDark from '@/theme/assets/icons/facebook-dark.svg';
import FacebookLight from '@/theme/assets/icons/facebook-light.svg';
import GoogleDark from '@/theme/assets/icons/google-dark.svg';
import GoogleLight from '@/theme/assets/icons/google-light.svg';

export type SocialProvider = 'apple' | 'facebook' | 'google';
export type SocialButtonVariant = 'secondary' | 'primary' | 'black';
export type SocialButtonSize = 'large' | 'medium' | 'small';

type SocialButtonProps = {
    readonly provider: SocialProvider;
    readonly children?: string;
    readonly variant?: SocialButtonVariant;
    readonly iconOnly?: boolean;
    readonly fullWidth?: boolean;
    readonly disabled?: boolean;
    readonly onPress?: () => void;
    readonly size?: SocialButtonSize;
    readonly testID?: string;
    readonly iconMode?: 'light' | 'dark';
} & Omit<PressableProps, 'disabled' | 'onPress'>;

const SIZE_CONFIG = {
    large: { height: 52, paddingHorizontal: 24, fontSize: 20, iconSize: 24, borderRadius: 26 },
    medium: { height: 48, paddingHorizontal: 20, fontSize: 16, iconSize: 18, borderRadius: 24 },
    small: { height: 40, paddingHorizontal: 16, fontSize: 14, iconSize: 16, borderRadius: 20 },
    xSmall: { height: 30, paddingHorizontal: 12, fontSize: 12, iconSize: 16, borderRadius: 15 },
} as const;

// Social icon components map
const SOCIAL_ICONS = {
    apple: { light: AppleLight, dark: AppleDark },
    facebook: { light: FacebookLight, dark: FacebookDark },
    google: { light: GoogleLight, dark: GoogleDark },
} as const;

function SocialButton({
    provider,
    children,
    variant = 'secondary',
    iconOnly = false,
    fullWidth = false,
    disabled = false,
    onPress,
    size = 'medium',
    testID,
    iconMode = 'light',
    ...props
}: SocialButtonProps) {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const sizeConfig = SIZE_CONFIG[size];

    const styles = useMemo(() => {
        if (disabled) {
            return { bg: colors.disabled, text: colors.disabled, border: undefined, shadow: undefined };
        }

        const variantMap = {
            secondary: { bg: colors.secondaryBg, text: colors.text, border: colors.border, shadow: colors.border },
            primary: { bg: colors.primary, text: colors.white, border: undefined, shadow: colors.primary },
            black: { bg: colors.black, text: colors.white, border: undefined, shadow: colors.black },
        };

        return variantMap[variant];
    }, [variant, disabled, colors]);

    const buttonStyle: StyleProp<ViewStyle> = {
        height: iconOnly ? sizeConfig.height : undefined,
        width: iconOnly ? sizeConfig.height : undefined,
        minHeight: !iconOnly ? sizeConfig.height : undefined,
        paddingHorizontal: iconOnly ? 0 : sizeConfig.paddingHorizontal,
        borderRadius: iconOnly ? sizeConfig.height / 2 : sizeConfig.borderRadius,
        backgroundColor: styles.bg,
        borderColor: styles.border,
        borderWidth: styles.border ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: fullWidth ? 'stretch' : 'flex-start',
        opacity: disabled ? 0.6 : 1,
    };

    // Determine icon mode: explicit prop -> apple logic -> default light
    const usesDarkIcon = iconMode
        ? iconMode === 'dark'
        : provider === 'apple'
            ? (variant === 'secondary' || disabled)
            : false;
    const IconComponent = SOCIAL_ICONS[provider][usesDarkIcon ? 'dark' : 'light'];

    const renderContent = () => {
        const Icon = <IconComponent width={sizeConfig.iconSize} height={sizeConfig.iconSize} />;

        if (iconOnly) return Icon;

        const TextEl = children ? (
            <Text
                color={styles.text}
                fontSize={sizeConfig.fontSize}
                fontWeight="600"
                lineHeight={sizeConfig.height} // makes text vertically centered
            >
                {children}
            </Text>
        ) : null;

        return (
            <XStack
                alignItems="center"   // vertically center
                justifyContent="center" // horizontally center group
                gap={8}               // space between icon and text
            >
                {Icon}
                {TextEl}
            </XStack>
        );
    };


    return (
        <Pressable
            {...props}
            disabled={disabled}
            onPress={onPress}
            testID={testID}
            accessibilityRole="button"
            accessibilityLabel={props.accessibilityLabel || (children ? children : `${provider} button`)}
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

export default SocialButton;
