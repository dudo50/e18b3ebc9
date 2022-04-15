import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack"; 

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./login/loginScreen";
import HomeScreen from "./home/homeScreen";
import { RegisterScreen } from "./register/registerScreen";
import GameScreen from "./game/gameScreen";
import MainScreen from "./menu/menuScreen";
import UserScreen from "./userProfile/userScreen";
import ReviewScreen from "./review/reviewScreen";
import Redirector from "./webcall/RedirectScreen";

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
            <Screen name="Redirector" component={Redirector}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
