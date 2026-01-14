import { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback, Dimensions, I18nManager } from 'react-native';
import { YStack, XStack, Circle } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';

type SetupAccountLayoutProps = {
    children: ReactNode;
};

const { height } = Dimensions.get('window');

export default function SetupAccountLayout({ children }: SetupAccountLayoutProps) {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <YStack height={height} width="100%" padding="$4" backgroundColor="$background" justifyContent="space-between">
                {/* Header */}
                <XStack alignItems="center" gap="$3" marginTop="$2">
                    <Circle
                        size={44}
                        backgroundColor="#f6f8fa"
                        borderRadius={50}
                        pressStyle={{ backgroundColor: '$grey100' }}
                        onPress={() => navigation.goBack()}
                    >
                        {I18nManager.isRTL ? (
                            <ArrowRight size={25} color="#0d0d12" />
                        ) : (
                            <ArrowLeft size={25} color="#0d0d12" />
                        )}
                    </Circle>
                </XStack>

                {/* Content */}
                <YStack flex={1} marginTop="$4">
                    {children}
                </YStack>
            </YStack>
        </TouchableWithoutFeedback>
    );
}
