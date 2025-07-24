import {Slot, Stack, useRouter, useSegments} from "expo-router";
import {ClerkLoaded, ClerkProvider, useAuth} from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";



const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

const clerkPublishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!clerkPublishKey) {
    throw new Error("Missing publishableKey");


  }

  SplashScreen.preventAutoHideAsync();


const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const {isLoaded,isSignedIn}  = useAuth();
  const  segment = useSegments()
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const isAuthGroup = segment[0] === "(auth)";

    if (!isAuthGroup && isSignedIn) {
      router.replace("/(auth)/(tabs)/feed");
    } else if (!isAuthGroup && !isSignedIn) {
      router.replace("/(public)");
    }
  }, [ isSignedIn ]);


  useEffect(() => {;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return <Slot/>
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishKey!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth} >
        <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
