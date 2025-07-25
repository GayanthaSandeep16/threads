import {router, Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {useAuth} from "@clerk/clerk-expo";
import * as Haptics  from "expo-haptics";

const styles = StyleSheet.create({
    createIconContainer: {
        backgroundColor : '#E8E8E8',
        padding: 1,
        borderRadius:6
    },
});


const CreateTabIcon = ({color, size, focused}: { color: string, size: number, focused: boolean }) => {
    return (
        <View style={styles.createIconContainer}>
            <Ionicons name='add' color={color} size={size}/>
        </View>
    )
}
const Layout = () => {

    const {signOut} = useAuth();
    return (
        <Tabs screenOptions={
            {
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#000000"
            }
        }>
            <Tabs.Screen
                name="feed"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size}/>
                    ),
                }}/>
            <Tabs.Screen name={"search"} options={{
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({color, size, focused}) => (
                    <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={size}/>

                ),
            }}/>
            <Tabs.Screen name={"create"} options={{
                headerShown: false,
                title: 'something',
                tabBarIcon: ({color, size, focused}) => (
                    <CreateTabIcon color={color} size={size} focused={focused}/>
                ),
            }}
            listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    // Haptics.selectionAsync();
                    router.push('/(model)/create');

                }
            }}
            />


            <Tabs.Screen name={"favorites"} options={{
                headerShown: false,
                title: 'Favorites',
                tabBarIcon: ({color, size, focused}) => (
                    <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={size}/>
                ),
            }}/>
            <Tabs.Screen name={"profile"} options={{
                headerShown: true,
                title: 'Profile',
                tabBarIcon: ({color, size, focused}) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size}/>
                ),
                headerRight: () => (
                    <TouchableOpacity>
                        <Ionicons name='log-out-outline' size={24} color={'black'} onPress={() => signOut()}/>
                    </TouchableOpacity>
                ),
            }}/>
        </Tabs>

    );
}


export default Layout;