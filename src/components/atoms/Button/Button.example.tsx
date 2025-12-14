import { View } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { ChevronLeft, ChevronRight, MapPin, Heart } from 'lucide-react-native';

import Button from './Button';

export function ButtonExamples() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <YStack space={24}>
        <YStack space={12}>
          <Text fontSize={20} fontWeight="bold">Basic Buttons</Text>
          <XStack space={8} flexWrap="wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Delete</Button>
          </XStack>
        </YStack>

        <YStack space={12}>
          <Text fontSize={20} fontWeight="bold">With Icons</Text>
          <XStack space={8} flexWrap="wrap">
            <Button variant="primary" icon={ChevronLeft}>Back</Button>
            <Button variant="secondary" icon={MapPin}>Location</Button>
            <Button variant="primary" icon={ChevronRight} iconPosition="right">Next</Button>
          </XStack>
        </YStack>

        <YStack space={12}>
          <Text fontSize={20} fontWeight="bold">Icon Only</Text>
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
