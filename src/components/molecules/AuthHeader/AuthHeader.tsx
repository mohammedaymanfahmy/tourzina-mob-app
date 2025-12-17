import { YStack, Text } from 'tamagui';
import Logo from '@/components/atoms/Logo/Logo';
import { useTheme } from '@/theme';

export type AuthHeaderProps = {
    title: string;
    subtitle?: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    const { colors } = useTheme();

    return (
        <YStack alignItems="center" space={16} marginBottom={32}>
            <Logo width={80} height={80} />
            <YStack alignItems="center" space={8}>
                <Text
                    fontSize={24}
                    fontWeight="bold"
                    color={colors.text}
                    textAlign="center"
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        fontSize={14}
                        color={colors.textSecondary}
                        textAlign="center"
                    >
                        {subtitle}
                    </Text>
                )}
            </YStack>
        </YStack>
    );
}
