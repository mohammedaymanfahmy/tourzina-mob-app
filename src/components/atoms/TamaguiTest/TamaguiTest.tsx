/**
 * Tamagui Test Component
 * 
 * Demonstrates Tamagui integration with custom theme colors:
 * - Configured Tamagui with primary, grey, success, error, and warning color palettes
 * - Integrated light/dark theme modes with semantic color tokens
 * - Uses pixel values for spacing, sizing, and borders
 * - Theme colors automatically sync with app theme system
 */

import { Button, Card, Paragraph, Separator, Text, XStack, YStack } from 'tamagui';

export function TamaguiTest() {
  return (
    <YStack padding={16} space={16} backgroundColor="$background" flex={1}>
      {/* Header */}
      <YStack space={8}>
        <Text color="$text" fontSize={36} fontWeight="bold">
          Tamagui Test 🎨
        </Text>
        <Text color="$textSecondary" fontSize={16}>
          Showcasing Tamagui components
        </Text>
      </YStack>

      <Separator borderColor="$border" />

      {/* Typography */}
      <YStack space={8}>
        <Text color="$text" fontSize={24} fontWeight="bold">
          Typography
        </Text>
        <Text color="$text" fontSize={20}>
          Large text (size 5)
        </Text>
        <Text color="$textSecondary" fontSize={16}>
          Medium text (size 4)
        </Text>
        <Text color="$textTertiary" fontSize={12}>
          Small text (size 3)
        </Text>
      </YStack>

      <Separator borderColor="$border" />

      {/* Color Palette */}
      <YStack space={8}>
        <Text color="$text" fontSize={24} fontWeight="bold">
          Color Palette
        </Text>
        <XStack space={8} justifyContent="space-between">
          <Card flex={1} backgroundColor="$primary" padding={12} borderRadius={8}>
            <Text color="white" fontSize={12} fontWeight="bold">
              Primary
            </Text>
          </Card>
          <Card flex={1} backgroundColor="$success" padding={12} borderRadius={8}>
            <Text color="white" fontSize={12} fontWeight="bold">
              Success
            </Text>
          </Card>
          <Card flex={1} backgroundColor="$error" padding={12} borderRadius={8}>
            <Text color="white" fontSize={12} fontWeight="bold">
              Error
            </Text>
          </Card>
        </XStack>
        <Card backgroundColor="$warning" padding={12} borderRadius={8}>
          <Text color="white" fontSize={16} fontWeight="bold">
            Warning
          </Text>
        </Card>
      </YStack>

      <Separator borderColor="$border" />

      {/* Buttons */}
      <YStack space={8}>
        <Text color="$text" fontSize={24} fontWeight="bold">
          Buttons
        </Text>
        <XStack space={8}>
          <Button flex={1} backgroundColor="$primary" height={32} borderRadius={8}>
            <Text color="white" fontWeight="bold">
              Primary
            </Text>
          </Button>
          <Button
            flex={1}
            backgroundColor="transparent"
            borderColor="$primary"
            borderWidth={2}
            borderRadius={8}
            height={32}
          >
            <Text color="$primary"  fontWeight="bold">
              Outline
            </Text>
          </Button>
        </XStack>
        <Button
          width="100%"
          backgroundColor="$success"
          borderRadius={8}
          padding={12}
          height={50}
        >
          <Text color="white" fontSize={16} fontWeight="bold">
            Full Width Button
          </Text>
        </Button>
      </YStack>

      <Separator borderColor="$border" />

      {/* Card Example */}
      <Card
        backgroundColor="$background"
        borderColor="$border"
        borderWidth={1}
        borderRadius={12}
        padding={16}
        space={8}
      >
        <Text color="$text" fontSize={32} fontWeight="bold">
          Card Component
        </Text>
        <Paragraph color="$textSecondary" fontSize={16}>
          This is a card with border. Great for grouping content and creating visual hierarchy.
        </Paragraph>
      </Card>

      {/* Spacing Demo */}
      <YStack space={12}>
        <Text color="$text" fontSize={24} fontWeight="bold">
          Spacing
        </Text>
        <YStack space={4} backgroundColor="$primary" padding={8} borderRadius={8}>
          <Text color="white" fontSize={12}>
            Space: 4px
          </Text>
        </YStack>
        <YStack space={8} backgroundColor="$success" padding={8} borderRadius={8}>
          <Text color="white" fontSize={12}>
            Space: 8px
          </Text>
        </YStack>
        <YStack space={12} backgroundColor="$error" padding={8} borderRadius={8}>
          <Text color="white" fontSize={12}>
            Space: 12px
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
