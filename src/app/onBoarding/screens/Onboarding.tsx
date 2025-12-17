import type { RootScreenProps } from '@/navigation/types';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react-native';

import Button from '@/components/atoms/Button/Button';
import OnboardingCarousel from '@/components/organisms/OnboardingCarousel/OnboardingCarousel';
import type { OnboardingSlideData, OnboardingCarouselRef } from '@/components/organisms/OnboardingCarousel/OnboardingCarousel';
import { Paths } from '@/navigation/paths';
import { SafeScreen } from '@/components/templates';

// Import onboarding images
const onboarding1 = require('@/theme/assets/images/on-boarding1.png');
const onboarding2 = require('@/theme/assets/images/on-boarding2.png');
const onboarding3 = require('@/theme/assets/images/on-boarding3.png');

function Onboarding({ navigation }: RootScreenProps<Paths.Onboarding>) {
    const { t } = useTranslation();
    const carouselRef = useRef<OnboardingCarouselRef>(null);

    const slides: OnboardingSlideData[] = [
        {
            id: '1',
            image: onboarding1,
            title: t('onboarding.slide1_title'),
            description: t('onboarding.slide1_description'),
        },
        {
            id: '2',
            image: onboarding2,
            title: t('onboarding.slide2_title'),
            description: t('onboarding.slide2_description'),
        },
        {
            id: '3',
            image: onboarding3,
            title: t('onboarding.slide3_title'),
            description: t('onboarding.slide3_description'),
        },
    ];

    const handleNext = () => {
        navigation.replace(Paths.GetStarted);
    };

    const handleScrollToNext = () => {
        carouselRef.current?.scrollToNext();
    };

    const renderButton = (currentIndex: number, totalSlides: number) => {
        const isLastSlide = currentIndex === totalSlides - 1;

        if (isLastSlide) {
            // Full width button on last slide
            return (
                <Button variant="primary" onPress={handleNext} size="large" fullWidth>
                    {t('onboarding.explore_now')}
                </Button>
            );
        }

        // Icon-only circular button for other slides
        return (
            <Button
                variant="primary"
                icon={ChevronRight}
                onPress={handleScrollToNext}
                size="large"
            />
        );
    };

    return (
        <SafeScreen>
            <OnboardingCarousel ref={carouselRef} slides={slides} renderButton={renderButton} />
        </SafeScreen>
    );
}

export default Onboarding;
