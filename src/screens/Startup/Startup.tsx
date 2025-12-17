import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image } from 'react-native';
import { Text, YStack } from 'tamagui';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';

// Import logo directly
const Logo = require('@/theme/assets/images/logo.png');

/**
 * Startup/Splash Screen
 * Displays while app initializes
 * Dark mode background with app branding
 */
function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { isError, isFetching, isSuccess } = useQuery({
    queryFn: () => Promise.resolve(true),
    queryKey: ['startup'],
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.LanguageSelection }],
      });
    }
  }, [isSuccess, navigation]);

  return (
    <SafeScreen>
      <SafeScreen>
        <YStack
          flex={1}
          justifyContent="space-between"
          alignItems="center"
          backgroundColor={colors.background}
          paddingVertical={40}
        >
          {/* Center Logo */}
          <YStack
            space={24}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Image
              source={Logo}
              style={{
                width: 105,
                height: 105,
                resizeMode: 'contain',
              }}
            />

            {isFetching && (
              <YStack space={12} alignItems="center" marginTop={20}>
                <ActivityIndicator size="large" color={colors.primary} />
              </YStack>
            )}

            {isError && (
              <Text color={colors.error} fontSize={14} textAlign="center" marginTop={20}>
                {t('common_error')}
              </Text>
            )}
          </YStack>

          {/* Version at bottom */}
          <Text color={colors.textTertiary} fontSize={12}>
            {t('startup.version', { version: '1.0.0' })}
          </Text>
        </YStack>
      </SafeScreen>
    </SafeScreen>
  );
}

export default Startup;
