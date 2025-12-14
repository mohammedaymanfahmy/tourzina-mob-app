import { XStack, Text } from 'tamagui';
import { Pressable } from 'react-native';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';

export type AuthFooterProps = {
    onSignUpPress: () => void;
};

export default function AuthFooter({ onSignUpPress }: AuthFooterProps) {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <XStack justifyContent="center" gap={4} marginTop={24}>
            <Text color={colors.textSecondary} fontSize={14}>
                {t('auth.dont_have_account', "Don't have an account?")}
            </Text>
            <Pressable onPress={onSignUpPress}>
                <Text color={colors.primary} fontWeight="bold" fontSize={14}>
                    {t('auth.sign_up', 'Sign Up')}
                </Text>
            </Pressable>
        </XStack>
    );
}
