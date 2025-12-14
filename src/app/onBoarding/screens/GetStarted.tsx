import { useTranslation } from 'react-i18next';
import { YStack } from 'tamagui';
import AuthLayout from '@/components/templates/AuthLayout/AuthLayout';
import AuthHeader from '@/components/molecules/AuthHeader/AuthHeader';
import SocialAuthList from '@/components/molecules/SocialAuthList/SocialAuthList';
import DividerWithText from '@/components/molecules/DividerWithText/DividerWithText';
import AuthFooter from '@/components/molecules/AuthFooter/AuthFooter';
import Button from '@/components/atoms/Button/Button';
import { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

export default function GetStarted({ navigation }: RootScreenProps<Paths.GetStarted>) {
    const { t } = useTranslation();


    const handleSocialPress = (provider: string) => {
        console.log(`Continue with ${provider}`);
        // Implement social login logic
    };

    const handleEmailSignIn = () => {
        navigation.replace(Paths.Example);
        // router.push('/sign-in');
    };

    const handleSignUp = () => {
        console.log('Navigate to Sign Up');
        // router.push('/sign-up');
    };

    return (
        <AuthLayout>
            <YStack flex={1} justifyContent="center" space={24} paddingBottom={80}>
                <AuthHeader
                    title={t('auth.get_started_title', 'Get Started')}
                    subtitle={t('auth.get_started_subtitle', 'Welcome! Let\'s dive in into account.')}
                />

                <SocialAuthList onSocialPress={handleSocialPress} />

                <DividerWithText text={t('auth.or_continue_with', 'Or continue with')} />

                <Button
                    onPress={handleEmailSignIn}
                    fullWidth
                    size="large"
                    variant="primary"
                >
                    {t('auth.sign_in_with_email', 'Sign in with Email')}
                </Button>
            </YStack>

            <AuthFooter onSignUpPress={handleSignUp} />
        </AuthLayout>
    );
}
