import { YStack } from 'tamagui';
import { useCallback } from 'react';
import SocialButton, { SocialProvider } from '@/components/atoms/SocialButton/SocialButton';
import { useTranslation } from 'react-i18next';

export type SocialAuthListProps = {
    onSocialPress: (provider: SocialProvider) => void;
};

export default function SocialAuthList({ onSocialPress }: SocialAuthListProps) {
    const { t } = useTranslation();

    const handleGooglePress = useCallback(() => onSocialPress('google'), [onSocialPress]);
    const handleFacebookPress = useCallback(() => onSocialPress('facebook'), [onSocialPress]);
    const handleApplePress = useCallback(() => onSocialPress('apple'), [onSocialPress]);

    return (
        <YStack space={16} width="100%">
            <SocialButton
                provider="google"
                fullWidth
                onPress={handleGooglePress}
                iconMode="light" // Keep standard colors
                size='large'
            >
                {t('auth.sign_in_with_google', 'Sign in with Google')}
            </SocialButton>
            <SocialButton
                provider="facebook"
                fullWidth
                onPress={handleFacebookPress}
                iconMode="light" // Keep standard colors
                size='large'
            >
                {t('auth.sign_in_with_facebook', 'Sign in with Facebook')}
            </SocialButton>
            <SocialButton
                provider="apple"
                fullWidth
                onPress={handleApplePress}
                iconMode="dark" // White icon for dark theme/dark button
                size='large'
            >
                {t('auth.sign_in_with_apple', 'Sign in with Apple')}
            </SocialButton>
        </YStack>
    );
}
