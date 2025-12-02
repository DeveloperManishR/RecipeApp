// components/BackButton.tsx
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BackButton() {
    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            // Fallback if no history
            router.replace('/');
        }
    };

    return (
        <Pressable onPress={handleBack} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="chevron-back" size={24} color="blue" />
            <Text style={{ color: 'blue', marginLeft: 4 }}>Back</Text>
        </Pressable>
    );
}