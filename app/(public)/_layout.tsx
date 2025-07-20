import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

const PublicLayout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerShadowVisible: false,
                    headerTintColor: "#000",
                    headerTitleStyle: {
                        fontWeight: "600",
                    },
                    animation: "slide_from_right",
                }}
            />
        </>
    );
};

export default PublicLayout;