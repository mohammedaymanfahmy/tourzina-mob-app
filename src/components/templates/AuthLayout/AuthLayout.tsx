import { YStack, ScrollView, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

export type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    const { colors } = useTheme();

    return (
        <View flex={1} backgroundColor={colors.background}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <YStack
                        paddingHorizontal={28}
                        paddingVertical={32}
                        flex={1}
                        justifyContent="space-between" // headers top, footer bottom
                    >
                        {children}
                    </YStack>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
