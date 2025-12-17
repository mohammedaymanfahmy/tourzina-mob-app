import { XStack, Text, View } from 'tamagui';
import { useTheme } from '@/theme';
// We could use the Atom Divider, but for this specific layout with text in middle, 
// flexibility with flex grow is easier with generic Views, using the same styling logic.

export type DividerWithTextProps = {
    text: string;
};

export default function DividerWithText({ text }: DividerWithTextProps) {
    const { colors } = useTheme();

    return (
        <XStack alignItems="center" width="100%">
            <View flex={1} height={1} backgroundColor={colors.border} />
            <Text
                color={colors.textSecondary}
                fontSize={12}
                paddingHorizontal={16}
            >
                {text}
            </Text>
            <View flex={1} height={1} backgroundColor={colors.border} />
        </XStack>
    );
}
