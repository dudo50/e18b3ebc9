import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack"; 

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/login/loginScreen";
import HomeScreen from "./screens/home/homeScreen";
import { RegisterScreen } from "./screens/register/registerScreen";
import GameScreen from "./screens/game/gameScreen";
import MainScreen from "./screens/menu/menuScreen";
import UserScreen from "./screens/userProfile/userScreen";
import ReviewScreen from "./screens/review/reviewScreen";
import Navig from "./screens/webcall/navigatorScreen";

const { Navigator, Screen } = createNativeStackNavigator ();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator   screenOptions={{headerShown: false}} initialRouteName="Login">
            <Screen name="Login" component={LoginScreen}></Screen>
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Home" component={HomeScreen}></Screen>
            <Screen name="Game" component={GameScreen}></Screen>
            <Screen name="Main" component={MainScreen}></Screen>
            <Screen name="User" component={UserScreen}></Screen>
            <Screen name="Review" component={ReviewScreen}></Screen>
            <Screen name="Screen" component={Navig}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
