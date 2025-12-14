import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useI18n, useUser } from '@/hooks';
import { useTheme } from '@/theme';

import { AssetByVariant, IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { TamaguiTest } from '@/components/atoms/TamaguiTest/TamaguiTest';
import { ButtonExamples } from '@/components/atoms/Button/Button.example';
import { SocialButtonExamples } from '@/components/atoms/SocialButton/SocialButton.example';

const MAX_RANDOM_ID = 9;

function Example() {
  const { t } = useTranslation();
  const { useFetchOneQuery } = useUser();
  const { toggleLanguage } = useI18n();

  const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const fetchOneUserQuery = useFetchOneQuery(currentId);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(
        t('screen_example.hello_user', { name: fetchOneUserQuery.data.name }),
      );
    }
  }, [fetchOneUserQuery.isSuccess, fetchOneUserQuery.data, t]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const handleResetError = () => {
    void fetchOneUserQuery.refetch();
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={() => {
        handleResetError();
      }}
    >
      <SocialButtonExamples />
      {/* <ButtonExamples /> */}
      {/* <TamaguiTest /> */}
    </SafeScreen>
  );
}

export default Example;
