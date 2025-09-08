import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import SafeScreen from "@/components/SafeScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={"pk_test_cHJlcGFyZWQtc25hcHBlci05MS5jbGVyay5hY2NvdW50cy5kZXYk"}
      tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
