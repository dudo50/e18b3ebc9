import React from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { loginStyle } from "./loginStyle";

interface LoginScreenProps {
    navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {
    const login = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")
    return(
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
            <Card>
                <Card.Title title = "Game library" titleStyle ={loginStyle.cardTitle}></Card.Title>
                <Card.Content>
                    <TextInput label = "Username" keyboardType="default"></TextInput>
                    <TextInput label = "Password" secureTextEntry={true}></TextInput>
                    <Button onPress={login} style={loginStyle.cardButton} mode="contained">Login</Button>
                    <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                </Card.Content>
            </Card>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;