import {View, Text, TouchableOpacity} from 'react-native';
import {Stack} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const TabLayOut = () => {
    return (
        <Stack screenOptions ={{
            contentStyle: {backgroundColor: 'white'},
            headerShadowVisible : false,
        }}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="(model)/create" options={{presentation: "modal",
            title: 'New Thread',
                headerRight: () => (
                    <TouchableOpacity>
                        <Ionicons name={"ellipsis-horizontal-circle"} size={24} color={'black'}/>
                    </TouchableOpacity>
                )
            }}/>
        </Stack>
    );
}


export default TabLayOut;