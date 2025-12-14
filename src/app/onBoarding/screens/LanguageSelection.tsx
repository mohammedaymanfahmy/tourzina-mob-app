import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YStack, Text, ScrollView } from 'tamagui';
import { useTheme } from '@/theme';
import { useI18n } from '@/hooks';
import { SupportedLanguages } from '@/hooks/language/schema';
import AuthLayout from '@/components/templates/AuthLayout/AuthLayout';
import { LanguageOption } from '@/components/molecules/LanguageOption/LanguageOption';
import Button from '@/components/atoms/Button/Button';
import { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import { I18nManager } from 'react-native';
import { LANGUAGES } from '@/constants/languages';

export default function LanguageSelection({ navigation }: RootScreenProps<Paths.LanguageSelection>) {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const { changeLanguage } = useI18n();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const handleSelect = (code: string) => {
        const supported = ['en-EN', 'ar-AR', 'fr-FR'];
        const isSupported = supported.includes(code);
        if (isSupported) {
            setSelectedLang(code);
            changeLanguage(code as SupportedLanguages);
        }
    };

    const handleContinue = () => {
        navigation.replace(Paths.Onboarding); // Navigate to next screen
    };

    return (
        <AuthLayout>
            <YStack flex={1} paddingBottom={20}>
                <Text
                    fontSize={24}
                    fontWeight="bold"
                    color={colors.text}
                    textAlign="center"
                    marginBottom={32}
                >
                    {t('language.select_language', 'Select Language')}
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <YStack space={12}>
                        {LANGUAGES.map((lang) => {
                            const supported = ['en-EN', 'ar-AR', 'fr-FR'];
                            const isSupported = supported.includes(lang.code);
                            return (
                                <LanguageOption
                                    key={lang.code}
                                    label={lang.label}
                                    countryCode={lang.country}
                                    selected={selectedLang === lang.code}
                                    isRTL={I18nManager.isRTL}
                                    onPress={() => handleSelect(lang.code)}
                                    disabled={!isSupported}
                                />
                            );
                        })}
                    </YStack>
                </ScrollView>

                <Button
                    variant="primary"
                    size="large"
                    fullWidth
                    onPress={handleContinue}
                    style={{ marginTop: 20 }}
                >
                    {t('common.continue', 'Continue')}
                </Button>
            </YStack>
        </AuthLayout>
    );
}
