import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack"; 

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/login/loginScreen";
import HomeScreen from "./screens/home/homeScreen";
import { RegisterScreen } from "./screens/register/registerScreen";

const { Navigator, Screen } = createNativeStackNavigator ();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator   screenOptions={{headerShown: false}} initialRouteName="Login">
            <Screen name="Login" component={LoginScreen}></Screen>
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Home" component={HomeScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
