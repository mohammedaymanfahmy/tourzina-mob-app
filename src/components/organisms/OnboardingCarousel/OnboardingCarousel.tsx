import type { ImageSourcePropType } from 'react-native';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { YStack } from 'tamagui';

import PageIndicator from '@/components/atoms/PageIndicator/PageIndicator';
import OnboardingSlide from '@/components/molecules/OnboardingSlide/OnboardingSlide';
import { useTheme } from '@/theme';

export type OnboardingSlideData = {
    readonly id: string;
    readonly image: ImageSourcePropType;
    readonly title: string;
    readonly description: string;
};

type OnboardingCarouselProps = {
    readonly slides: OnboardingSlideData[];
    readonly renderButton?: (currentIndex: number, totalSlides: number) => React.ReactNode;
};

export type OnboardingCarouselRef = {
    scrollToNext: () => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingCarousel = forwardRef<OnboardingCarouselRef, OnboardingCarouselProps>(
    ({ slides, renderButton }, ref) => {
        const { colors } = useTheme();
        const [currentIndex, setCurrentIndex] = useState(0);
        const flatListRef = useRef<FlatList>(null);

        const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
            if (viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index ?? 0);
            }
        }).current;

        const viewabilityConfig = useRef({
            itemVisiblePercentThreshold: 50,
        }).current;

        useImperativeHandle(ref, () => ({
            scrollToNext: () => {
                const nextIndex = Math.min(currentIndex + 1, slides.length - 1);
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            },
        }));

        return (
            <YStack flex={1} backgroundColor={colors.background}>
                {/* Carousel */}
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    horizontal
                    pagingEnabled
                    initialScrollIndex={0}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <YStack width={SCREEN_WIDTH}>
                            <OnboardingSlide
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                slideIndex={index}
                            />
                        </YStack>
                    )}
                    getItemLayout={(data, index) => ({
                        length: SCREEN_WIDTH,
                        offset: SCREEN_WIDTH * index,
                        index,
                    })}
                />

                {/* Bottom Section: Dots + Button */}
                <YStack paddingBottom={40} paddingHorizontal={24} gap={24} alignItems="center" width={SCREEN_WIDTH}>
                    {/* Page Indicator */}
                    <PageIndicator totalPages={slides.length} currentPage={currentIndex} />

                    {/* Button */}
                    {renderButton && renderButton(currentIndex, slides.length)}
                </YStack>
            </YStack>
        );
    },
);

OnboardingCarousel.displayName = 'OnboardingCarousel';

export default OnboardingCarousel;
