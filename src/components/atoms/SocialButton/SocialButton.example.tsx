import { View } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { useTranslation } from 'react-i18next';

import SocialButton from './SocialButton';

export function SocialButtonExamples() {
    const { t } = useTranslation();

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <YStack space={24}>
                {/* Secondary Variant (Default) */}
                <YStack space={12}>
                    <Text fontSize={20} fontWeight="bold">Secondary (Default)</Text>
                    <YStack space={8}>
                        <SocialButton provider="apple" size="large">{t('social_buttons.continue_with_apple')}</SocialButton>
                        <SocialButton provider="facebook" size='medium'>{t('social_buttons.continue_with_facebook')}</SocialButton>
                        <SocialButton provider="google" size='small'>{t('social_buttons.continue_with_google')}</SocialButton>
                    </YStack>
                </YStack>

                {/* Primary Variant */}
                <YStack space={12}>
                    <Text fontSize={20} fontWeight="bold">Primary</Text>
                    <YStack space={8}>
                        <SocialButton provider="apple" variant="primary">{t('social_buttons.continue_with_apple')}</SocialButton>
                        <SocialButton provider="facebook" variant="primary">{t('social_buttons.continue_with_facebook')}</SocialButton>
                        <SocialButton provider="google" variant="primary">{t('social_buttons.continue_with_google')}</SocialButton>
                    </YStack>
                </YStack>

                {/* Black Variant */}
                <YStack space={12}>
                    <Text fontSize={20} fontWeight="bold">Black</Text>
                    <YStack space={8}>
                        <SocialButton provider="apple" variant="black">{t('social_buttons.continue_with_apple')}</SocialButton>
                        <SocialButton provider="facebook" variant="black">{t('social_buttons.continue_with_facebook')}</SocialButton>
                        <SocialButton provider="google" variant="black">{t('social_buttons.continue_with_google')}</SocialButton>
                    </YStack>
                </YStack>



                {/* Icon Only (Circular) */}
                <YStack space={12}>
                    <Text fontSize={20} fontWeight="bold">Icon Only (Circular)</Text>
                    <XStack space={8} alignItems="center">
                        <SocialButton provider="apple" iconOnly size="large" />
                        <SocialButton provider="facebook" iconOnly size="medium" />
                        <SocialButton provider="google" iconOnly size="small" />
                    </XStack>
                </YStack>

                {/* Full Width */}
                <YStack space={12}>
                    <Text fontSize={20} fontWeight="bold">Full Width</Text>
                    <YStack space={8}>
                        <SocialButton provider="apple" fullWidth>{t('social_buttons.continue_with_apple')}</SocialButton>
                        <SocialButton provider="facebook" variant="primary" fullWidth>{t('social_buttons.continue_with_facebook')}</SocialButton>
                        <SocialButton provider="google" variant="black" fullWidth>{t('social_buttons.continue_with_google')}</SocialButton>
                    </YStack>
                </YStack>
            </YStack>
        </View>
    );
}
