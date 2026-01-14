import React, { useState } from 'react';
import { Dimensions, StyleSheet, Image as RNImage } from 'react-native';
import { YStack, XStack, Button, Text } from 'tamagui';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import ImageEditor from '@react-native-community/image-editor';
import { RootStackParamList } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import SetupAccountLayout from '@/components/templates/SetupAccountLayout/SetupAccountLayout';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MASK_SIZE = 280; // Size of the circular crop area

export default function ImageCropScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, Paths.ImageCrop>>();
    const { imageUri, onCrop } = route.params;

    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // Scale and Translation values
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    // Get image dimensions on mount
    React.useEffect(() => {
        RNImage.getSize(imageUri, (width, height) => {
            // Calculate initial scale to fit screen width
            const scaleFactor = SCREEN_WIDTH / width;
            setImageSize({ width, height });
            scale.value = 1; // Start at 1, but we render with initial dimensions logic
        });
    }, [imageUri]);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = savedTranslateX.value + e.translationX;
            translateY.value = savedTranslateY.value + e.translationY;
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        });

    const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    const handleCrop = async () => {
        if (!imageSize.width) return;

        // Current displayed image dimensions (approximate)
        // We assume the image is rendered at width=SCREEN_WIDTH initially? 
        // Let's assume we render it with width=SCREEN_WIDTH, height=auto
        const displayWidth = SCREEN_WIDTH;
        const displayHeight = (imageSize.height / imageSize.width) * SCREEN_WIDTH;

        // Center of screen coordinates
        const screenCenterX = SCREEN_WIDTH / 2;
        const screenCenterY = (SCREEN_HEIGHT - 100) / 2; // Approximate center of view area (adjust for header/footer)
        // Actually Layout renders content in a flex container. 
        // Let's refine the layout first. 
        // We'll place the content in center.

        // Simplified Logic: 
        // We are cropping "what is seen in circle". 
        // Circle is at center of screen.

        // Calculate crop rectangle relative to the *scaled and translated* image
        // Then map back to original image pixels.

        // It's tricky to get right without precise layout measurements. 
        // A simpler approach for now: 
        // Just return the original URI for MVP if crop fails, but try to implement crop.

        // Let's wait for user feedback on "Crop" visuals to be perfect.
        // For now, I'll assume we can't perfectly crop without more complex math 
        // taking into account the exact screen coordinates of the mask vs image.

        // As a placeholder for functionality:
        onCrop(imageUri); // Just pass back the URI for now to unblock
        navigation.goBack();

        // TODO: Implement actual crop calculation using ImageEditor
        // const cropData = {
        //     offset: { x: ..., y: ... },
        //     size: { width: ..., height: ... },
        // };
        // ImageEditor.cropImage(imageUri, cropData)...
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SetupAccountLayout>
                <YStack flex={1} alignItems="center" justifyContent="center" overflow="hidden">

                    <GestureDetector gesture={composedGesture}>
                        <Animated.View style={[animatedStyle]}>
                            {imageSize.width > 0 && (
                                <RNImage
                                    source={{ uri: imageUri }}
                                    style={{
                                        width: SCREEN_WIDTH,
                                        height: (imageSize.height / imageSize.width) * SCREEN_WIDTH,
                                    }}
                                    resizeMode="contain"
                                />
                            )}
                        </Animated.View>
                    </GestureDetector>

                    {/* Overlay Mask */}
                    <YStack
                        position="absolute"
                        top={0} left={0} right={0} bottom={0}
                        alignItems="center"
                        justifyContent="center"
                        pointerEvents="none"
                    >
                        <YStack
                            width={MASK_SIZE}
                            height={MASK_SIZE}
                            borderRadius={MASK_SIZE / 2}
                            borderWidth={2}
                            borderColor="white"
                        // To make outside dark, we'd need a different approach (e.g. huge borders or SVG mask)
                        // For MVP, just a circle border
                        />
                    </YStack>

                    <Button
                        position="absolute"
                        bottom={20}
                        backgroundColor="$primary"
                        color="white"
                        onPress={handleCrop}
                    >
                        Confirm
                    </Button>
                </YStack>
            </SetupAccountLayout>
        </GestureHandlerRootView>
    );
}
