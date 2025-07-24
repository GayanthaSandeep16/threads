import {useSSO} from "@clerk/clerk-expo";
import {DMSans_700Bold, useFonts} from "@expo-google-fonts/dm-sans";
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {Ionicons} from "@expo/vector-icons";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";

export default function Index() {
    const [ontsLoaded] = useFonts({
        DMSans_700Bold,
    });

    const {startSSOFlow} = useSSO();

    const data = useQuery(api.users.getAllUsers);
    //console.log(`users`, data);

    const handleInstagramLogin = async () => {
        try {
            console.log('Instagram login initiated');
            const {createdSessionId, setActive} = await startSSOFlow({strategy: 'oauth_facebook'});
            if (createdSessionId && setActive) {
                setActive({session: createdSessionId});
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            console.log('google login initiated');
            const {createdSessionId, setActive} = await startSSOFlow({strategy:'oauth_google'});
            if (createdSessionId && setActive) {
                setActive({session: createdSessionId});
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={style.container}>
            <Image
                source={require('../../assets/images/login.jpeg')}
                style={style.loginImage}
            />
            <ScrollView>
                <Text style={style.title}>How would you like to use Threads?</Text>
                <View style={style.buttonContainer}>
                    <TouchableOpacity style={style.loginButton} onPress={handleInstagramLogin}>
                        <View style={style.loginButtonContent}>
                            <Image
                                source={require('../../assets/images/instagram_icon.png')}
                                style={style.loginButtonIcon}/>
                            <Text style={style.loginButtonText}>Continue with Instagram</Text>
                            <Ionicons name={"chevron-forward"} size={24} color={Colors.border}/>
                        </View>
                        <Text style={style.loginButtonSubtitle}> you can log with instagram. more easy and secure way.
                            more easy and secure way</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.loginButton} onPress={handleGoogleLogin}>
                        <View style={style.loginButtonContent}>
                            <Text style={style.loginButtonText}>Continue with Google</Text>
                            <Ionicons name={"chevron-forward"} size={24} color={Colors.border}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.loginButton}>
                        <View style={style.loginButtonContent}>
                            <Text style={style.loginButtonText}>Use without Profile</Text>
                            <Ionicons name={"chevron-forward"} size={24} color={Colors.border}/>
                        </View>
                        <Text style={style.loginButtonSubtitle}> you can use threads without profile go ahead </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.swithButton}>
                        <Text>Switch Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    loginImage: {
        width: '100%',
        height: 350
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.border,
    },
    buttonContainer: {
        gap: 10,
        marginHorizontal: 50,
    },
    loginButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    loginButtonIcon: {
        width: 40,
        height: 40
    },
    loginButtonText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 14,
        flex: 1,
    },
    loginButtonSubtitle: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 12,
        marginTop: 5,
        color: '#666',
    },
    swithButton: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.border,
        alignItems: 'center',
        marginTop: 20
    }
});
