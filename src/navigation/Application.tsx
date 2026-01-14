import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import ChooseLocation from '@/app/onBoarding/screens/ChooseLocation';
import { AddProfilePhotoScreen } from '@/app/onBoarding/screens/AddProfilePhotoScreen';
import { GetStarted, LanguageSelection, Onboarding } from '@/app/onBoarding';
import Startup from '@/screens/Startup/Startup';
import ImageCropScreen from '@/app/general/screens/ImageCropScreen';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={LanguageSelection} name={Paths.LanguageSelection} />
          <Stack.Screen component={GetStarted} name={Paths.GetStarted} />
          <Stack.Screen component={Onboarding} name={Paths.Onboarding} /> */}
          <Stack.Screen component={ChooseLocation} name={Paths.ChooseLocation} />
          <Stack.Screen component={AddProfilePhotoScreen} name={Paths.AddProfilePhoto} />
          <Stack.Screen component={ImageCropScreen} name={Paths.ImageCrop} />
          {/* <Stack.Screen component={Example} name={Paths.Example} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
