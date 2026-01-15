import { useState } from "react";
import { Image, Pressable } from "react-native";
import {
    YStack,
    Text,
    Button,
    Circle,
} from "tamagui";
import { Trash2 } from "@tamagui/lucide-icons";
import SetupAccountLayout from "@/components/templates/SetupAccountLayout/SetupAccountLayout";
import { useTranslation } from 'react-i18next';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types";
import { Paths } from "@/navigation/paths";

export function AddProfilePhotoScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, Paths.AddProfilePhoto>>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSelectPhoto = async () => {
        console.log("Attempting to open image library...");
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
            });
            console.log("Image picker result:", result);

            if (result.didCancel || !result.assets || result.assets.length === 0) {
                console.log("User cancelled or no assets");
                return;
            }

            const uri = result.assets[0].uri;
            if (uri) {
                console.log("Selected URI:", uri);
                navigation.navigate(Paths.ImageCrop, {
                    imageUri: uri,
                    onCrop: (croppedUri) => {
                        console.log("Cropped URI:", croppedUri);
                        setSelectedImage(croppedUri);
                    },
                });
            }
        } catch (error) {
            console.error("Error launching image library:", error);
        }
    };

    const handleDeletePhoto = () => {
        setSelectedImage(null);
    };

    return (
        <SetupAccountLayout>
            {/* Main Content */}
            <YStack flex={1} alignItems="center" gap="$4">

                <Text fontSize={28} textAlign="left" marginTop={40} fontWeight="700" color="#0D0D12" width="100%">
                    {t('add_profile_photo.title', 'Add a Profile Photo')}
                </Text>

                <Text
                    fontSize={14}
                    textAlign="left"
                    width="100%"
                    color="#818898"
                >
                    {t('add_profile_photo.subtitle', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')}
                </Text>

                {/* Avatar */}
                <YStack marginTop={60} position="relative">
                    <Pressable onPress={handleSelectPhoto}>
                        <Circle size={170} overflow="hidden" backgroundColor="#E4E7EC">
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            ) : null}
                        </Circle>
                    </Pressable>
                    {/* hjjjhjh */}
                    {/* Delete Icon */}
                    <Pressable onPress={handleDeletePhoto} style={{ position: 'absolute', bottom: 6, right: 6 }}>
                        <Circle
                            size={44}
                            backgroundColor="#e7f1fe"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Trash2 color="#0f77f0" size={18} />
                        </Circle>
                    </Pressable>
                </YStack>
            </YStack>

            {/* Continue Button */}
            <Button
                height={52}
                borderRadius={26}
                backgroundColor="#1570EF"
                color="white"
                fontWeight="600"
                fontSize={16}
                marginBottom="$3"
            >
                {t('common.continue', 'Continue')}
            </Button>
        </SetupAccountLayout>
    );
}
