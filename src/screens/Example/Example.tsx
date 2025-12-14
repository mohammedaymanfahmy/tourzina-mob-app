import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useI18n } from '@/hooks';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { ButtonExamples } from '@/components/atoms/Button/Button.example';
import { SocialButtonExamples } from '@/components/atoms/SocialButton/SocialButton.example';
import { LanguageOption } from '@/components/molecules/LanguageOption/LanguageOption';

function Example() {

  const { toggleLanguage } = useI18n();
  const {
    changeTheme,
    colors,
    variant,
  } = useTheme();

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  return (
    <SafeScreen
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView style={{ flex: 1, padding: 20 }}>
        {/* Test Buttons */}
        <View style={{ gap: 16, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={onChangeTheme}
            style={{
              backgroundColor: colors.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600' }}>
              Toggle Theme ({variant === 'default' ? 'Light' : 'Dark'})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleLanguage}
            style={{
              backgroundColor: colors.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600' }}>
              Toggle Language
            </Text>
          </TouchableOpacity>
        </View>

        <LanguageOption
          label="English"
          countryCode="US"
          selected={false}
          isRTL={false}
          onPress={() => { }}
        />
        <LanguageOption
          label="English"
          countryCode="US"
          selected={true}
          isRTL={false}
          onPress={() => { }}

        />
        <LanguageOption
          label="English"
          countryCode="US"
          selected={false}
          isRTL={false}
          onPress={() => { }}
          disabled
        />
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
