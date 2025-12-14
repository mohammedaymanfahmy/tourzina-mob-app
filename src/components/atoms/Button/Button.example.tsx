import { View } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { ChevronLeft, ChevronRight, MapPin, Heart } from 'lucide-react-native';
import { useTheme } from '@/theme';
import Button from './Button';

export function ButtonExamples() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <YStack space={24}>
        <YStack space={12}>
          <Text fontSize={20} fontWeight="bold" color={colors.text}> Basic Buttons</Text>
          <XStack space={8} flexWrap="wrap">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Delete</Button>
          </XStack>
        </YStack>

        <YStack space={12}>
          <Text fontSize={20} fontWeight="bold" color={colors.text}>With Icons</Text>
          <XStack space={8} flexWrap="wrap">
            <Button variant="primary" icon={ChevronLeft}>Back</Button>
            <Button variant="secondary" icon={MapPin}>Location</Button>
            <Button variant="primary" icon={ChevronRight} iconPosition="right">Next</Button>
          </XStack>
        </YStack>

        <YStack space={12}>
          <Text fontSize={20} fontWeight="bold" color={colors.text}>Icon Only</Text>
          <XStack space={8}>
            <Button variant="primary" icon={ChevronLeft} />
            <Button variant="secondary" icon={MapPin} />
            <Button variant="destructive" icon={Heart} />
          </XStack>
        </YStack>
      </YStack>
    </View>
  );
}
