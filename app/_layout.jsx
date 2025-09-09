import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={"pk_test_cHJlcGFyZWQtc25hcHBlci05MS5jbGVyay5hY2NvdW50cy5kZXYk"}
      tokenCache={tokenCache}>
      <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" sc/>
      </Stack>
      </SafeScreen>
    </ClerkProvider>
  );
}
