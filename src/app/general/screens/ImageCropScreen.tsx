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

import { useTranslation } from 'react-i18next';

export default function ImageCropScreen() {
    const { t } = useTranslation();
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
        if (!imageSize.width || !imageSize.height) return;

        try {
            // 1. Calculate the resolution ratio (Original / Displayed)
            // The image is displayed with width = SCREEN_WIDTH
            const ratio = imageSize.width / SCREEN_WIDTH;

            // 2. Get current transform values
            // We need the values from the shared values. 
            // Note: Reading .value directly on JS thread inside a callback works in Reanimated 2+.
            const s = scale.value;
            const tx = translateX.value;
            const ty = translateY.value;

            // 3. Calculate Crop Rect in "View Px" (relative to the unscaled image view top-left)

            // The center of the visible area (mask) relative to the screen is (SCREEN_WIDTH/2, SCREEN_HEIGHT/2) 
            // (assuming centered layout).
            // The center of the Image View (originally) is also at (SCREEN_WIDTH/2, SCREEN_HEIGHT/2) of the container.

            // The Image View is shifted by (tx, ty) and scaled by s.
            // Vector from NewImageCenter to MaskCenter in screen pixels: (-tx, -ty).
            // Vector in "Unscaled Image" pixels: (-tx / s, -ty / s).

            // Mask radius in "Unscaled Image" pixels: (MASK_SIZE / 2) / s.

            // So, relative to the Image View Center (0,0 being center):
            // cropCenterX_rel = -tx / s
            // cropCenterY_rel = -ty / s

            // Convert to Top-Left reference (0,0 being top-left of image view):
            // Image View dimensions: 
            const viewWidth = SCREEN_WIDTH;
            const viewHeight = (imageSize.height / imageSize.width) * SCREEN_WIDTH;

            const cropCenterX = (viewWidth / 2) + (-tx / s);
            const cropCenterY = (viewHeight / 2) + (-ty / s);

            const cropWidthView = MASK_SIZE / s;
            const cropHeightView = MASK_SIZE / s;

            const cropXView = cropCenterX - (cropWidthView / 2);
            const cropYView = cropCenterY - (cropHeightView / 2);

            // 4. Map to Original Image Coordinates
            const cropData = {
                offset: {
                    x: Math.round(Math.max(0, cropXView * ratio)),
                    y: Math.round(Math.max(0, cropYView * ratio)),
                },
                size: {
                    width: Math.round(cropWidthView * ratio),
                    height: Math.round(cropHeightView * ratio),
                },
                displaySize: { width: MASK_SIZE, height: MASK_SIZE }, // Optimize output size
            };

            // Clamp checks
            if (cropData.offset.x < 0) cropData.offset.x = 0;
            if (cropData.offset.y < 0) cropData.offset.y = 0;

            // Ensure we don't exceed image bounds
            if (cropData.offset.x + cropData.size.width > imageSize.width) {
                cropData.size.width = imageSize.width - cropData.offset.x;
            }
            if (cropData.offset.y + cropData.size.height > imageSize.height) {
                cropData.size.height = imageSize.height - cropData.offset.y;
            }

            console.log('Crop Logic Debug:');
            console.log('Screen W:', SCREEN_WIDTH);
            console.log('Image Size:', imageSize);
            console.log('Ratio:', ratio);
            console.log('Transform:', { s, tx, ty });
            console.log('View Crop Rect:', { x: cropXView, y: cropYView, w: cropWidthView, h: cropHeightView });
            console.log('Final Crop Data:', cropData);

            const result = await ImageEditor.cropImage(imageUri, cropData);

            // Expected result is an object with uri (or path)
            const resultUri = (result.uri || result.path) as string;

            onCrop(resultUri);
            navigation.goBack();

        } catch (error) {
            console.error('Crop failed:', error);
            // Fallback: return original
            onCrop(imageUri);
            navigation.goBack();
        }
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
                        size="$5"
                        borderRadius={30}
                        backgroundColor="$primary"
                        color="#ffffff"
                        shadowColor="$primary"
                        shadowOffset={{ width: 0, height: 4 }}
                        shadowOpacity={0.2}
                        shadowRadius={8}
                        height={52}
                        pressStyle={{ opacity: 0.9 }}
                        marginTop="$4"
                        position="absolute"
                        bottom={20}
                        onPress={handleCrop}
                    >
                        {t('common.continue', 'Continue')}
                    </Button>
                </YStack>
            </SetupAccountLayout>
        </GestureHandlerRootView>
    );
}
