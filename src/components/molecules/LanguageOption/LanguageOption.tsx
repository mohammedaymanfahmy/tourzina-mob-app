import { Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { XStack, Text, View } from 'tamagui';
import FlagIcon from '@/components/atoms/FlagIcon/FlagIcon';
import { useTheme } from '@/theme';

export type LanguageOptionProps = {
    label: string;
    countryCode: string;
    selected: boolean;
    isRTL: boolean;
    onPress: () => void;
    disabled?: boolean;
};

export function LanguageOption({
    label,
    countryCode,
    selected,
    isRTL,
    onPress,
    disabled,
}: LanguageOptionProps) {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={disabled ? undefined : onPress}
            style={({ pressed }) => ({
                opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
            })}
        >
            <XStack
                flexDirection={isRTL ? 'row-reverse' : 'row'}
                alignItems="center"
                padding={16}
                borderRadius={12}
                backgroundColor={selected ? colors.selected : colors.secondaryBg}
                borderColor={colors.border}
                borderWidth={1}
                height={60}
            >
                <FlagIcon code={countryCode} />

                <View flex={1} marginHorizontal={12}>
                    <Text color={colors.text} fontSize={16} fontWeight="500">
                        {label}
                    </Text>
                </View>

                {selected && <Check size={20} color={colors.primary} />}
            </XStack>
        </Pressable>
    );
}
