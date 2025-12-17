import { View } from 'tamagui';
import { useTheme } from '@/theme';

export type DividerProps = {
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    thickness?: number;
    marginVertical?: number;
};

export default function Divider({
    orientation = 'horizontal',
    color,
    thickness = 1,
    marginVertical = 0
}: DividerProps) {
    const { colors } = useTheme();

    const dividerColor = color || colors.border;

    return (
        <View
            backgroundColor={dividerColor}
            height={orientation === 'horizontal' ? thickness : '100%'}
            width={orientation === 'vertical' ? thickness : '100%'}
            marginVertical={marginVertical}
        />
    );
}
