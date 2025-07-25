import {Slot, Stack, useRouter, useSegments} from "expo-router";
import {ClerkLoaded, ClerkProvider, useAuth, useUser} from "@clerk/clerk-expo";
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import * as SplashScreen from "expo-splash-screen";
import {
    useFonts,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import {useEffect} from "react";
import {ConvexReactClient, ConvexProvider} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import * as Sentry from '@sentry/react-native';


Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,
    attachScreenshot: true,
    debug: false,
    tracesSampleRate: 1.0,

    _experiments: {
        profileSampleRate: 0.1, // Adjust this value to control the profiling sample rate
        replaysSessionSampleRate: 0.1, // Adjust this value to control the replay sample rate
        replaysOnErrorSampleRate: 1.0, // Adjust this value to control the replay sample rate on error
    },

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
});


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

    const {isLoaded, isSignedIn} = useAuth();
    const segment = useSegments()
    const router = useRouter();
    const user = useUser();

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
    }, [isSignedIn]);


    useEffect(() => {
        ;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);


    useEffect(() => {
        if (user && user.user) {
            Sentry.setUser({
                id: user.user.id,
                email: user.user.emailAddresses[0]?.emailAddress || "",
                name: user.user.fullName,
            });
        } else {
            Sentry.setUser(null);
        }
    }, [user]);
    return <Slot/>
};

export default Sentry.wrap(function RootLayout() {
    return (
        <ClerkProvider publishableKey={clerkPublishKey!} tokenCache={tokenCache}>
            <ClerkLoaded>
                <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                    <InitialLayout/>
                </ConvexProviderWithClerk>
            </ClerkLoaded>
        </ClerkProvider>
    );
});