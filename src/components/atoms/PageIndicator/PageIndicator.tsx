import type { ViewStyle } from 'react-native';

import { I18nManager } from 'react-native';
import { View } from 'tamagui';

import { useTheme } from '@/theme';

type PageIndicatorProps = {
    readonly totalPages: number;
    readonly currentPage: number;
};

function PageIndicator({ totalPages, currentPage }: PageIndicatorProps) {
    const { colors } = useTheme();

    const dotStyle = (index: number): ViewStyle => ({
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: index === currentPage ? colors.primary : colors.border,
        marginHorizontal: 4,
    });

    // In RTL, reverse the dots array to maintain visual order
    const dots = Array.from({ length: totalPages }).map((_, index) => (
        <View key={index} style={dotStyle(index)} />
    ));

    return (
        <View flexDirection="row" alignItems="center" justifyContent="center" gap={4}>
            {I18nManager.isRTL ? dots.reverse() : dots}
        </View>
    );
}

export default PageIndicator;
