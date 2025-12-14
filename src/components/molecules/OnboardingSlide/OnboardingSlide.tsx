import type { ImageSourcePropType } from 'react-native';

import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { Text, YStack } from 'tamagui';

import { useTheme } from '@/theme';

type OnboardingSlideProps = {
    readonly image: ImageSourcePropType;
    readonly title: string;
    readonly description: string;
    readonly slideIndex?: number; // 0, 1, 2 for different curve styles
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function OnboardingSlide({ image, title, description, slideIndex = 1 }: OnboardingSlideProps) {
    const { colors } = useTheme();

    return (
        <YStack flex={1} backgroundColor={colors.background}>
            {/* Image - Top Half */}
            <YStack
                height={SCREEN_HEIGHT * 0.55}
            >
                <Image
                    source={image}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                    }}
                />
            </YStack>

            {/* Content - Bottom Half */}
            <YStack flex={1} paddingHorizontal={24} paddingTop={24} alignItems="center">
                {/* Title */}
                <Text
                    color={colors.text}
                    fontSize={24}
                    fontWeight="700"
                    textAlign="center"
                    lineHeight={32}
                    marginBottom={12}
                >
                    {title}
                </Text>

                {/* Description */}
                <Text
                    color={colors.textTertiary}
                    fontSize={14}
                    textAlign="center"
                    lineHeight={20}
                    paddingHorizontal={16}
                >
                    {description}
                </Text>
            </YStack>
        </YStack>
    );
}

export default OnboardingSlide;
