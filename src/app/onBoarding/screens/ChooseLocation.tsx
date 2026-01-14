import {
    YStack,
    Text,
    Button,
    Input,
    Card,
    Image,
} from 'tamagui';
import { Search, MapPin } from '@tamagui/lucide-icons';
import { Paths } from '@/navigation/paths';
import type { RootScreenProps } from '@/navigation/types';
import { useTranslation } from 'react-i18next';
import SetupAccountLayout from '@/components/templates/SetupAccountLayout/SetupAccountLayout';

export default function ChooseLocationScreen({ navigation }: RootScreenProps<Paths.ChooseLocation>) {
    const { t } = useTranslation();
    return (
        <SetupAccountLayout>
            <YStack gap="$5" flex={1} marginTop="$2">
                <YStack gap="$2">
                    <Text fontSize={24} fontWeight="800" color="$text" lineHeight={40}>
                        {t('choose_location.title', 'Choose your Location')}
                    </Text>
                    <Text color="#818898" fontSize={14} lineHeight={24}>
                        {t('choose_location.subtitle', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')}
                    </Text>
                </YStack>

                {/* Search */}
                <YStack>
                    <Input
                        placeholder={t('choose_location.search_placeholder', 'Search location')}
                        placeholderTextColor="#666d80"
                        borderRadius={50}
                        height={52}
                        backgroundColor="#ffffff"
                        borderWidth={1}
                        borderColor="#eceff3"
                        focusStyle={{ borderColor: '$primary', borderWidth: 2 }}
                        fontSize={14}
                        paddingLeft={40}
                        paddingRight={40}
                        color="$text"
                        outlineColor="transparent"
                        outlineWidth={0}
                    />
                    <YStack position="absolute" right={16} top={16} pointerEvents="none">
                        <Search size={20} color="#a4acb9" />
                    </YStack>
                </YStack>

                {/* Set Location Button */}
                <Button
                    size="$5"
                    backgroundColor="transparent"
                    borderWidth={1}
                    borderColor="$primary"
                    borderRadius={30}
                    icon={<MapPin size={20} color="$primary" />}
                    color="$primary"
                    height={52}
                    pressStyle={{ backgroundColor: '$primary50' }}
                >
                    {t('choose_location.set_location', 'Set Location')}
                </Button>

                {/* Map Preview */}
                <YStack gap="$3" height={300}>
                    <Text fontWeight="600" color="#0d0d12" fontSize={16}>{t('choose_location.current_location', 'Current Location')}</Text>

                    <Card height={200} borderRadius="$4" backgroundColor="$grey25" bordered overflow="hidden">
                        <YStack justifyContent="center" alignItems="center" overflow="hidden">
                            <Image
                                source={require('../../../theme/assets/images/map.png')}
                                style={{ width: '100%', height: '100%' }}
                                objectFit="cover"
                            />
                        </YStack>
                    </Card>
                </YStack>
            </YStack>

            {/* Continue Button */}
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
                onPress={() => navigation.navigate(Paths.AddProfilePhoto)}
            >
                {t('common.continue', 'Continue')}
            </Button>
        </SetupAccountLayout>
    );
}
