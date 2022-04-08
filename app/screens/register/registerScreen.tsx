import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { HeaderComponent } from "../../components/header/headerComponent";
import { registerStyle } from "./registerStyle";

export const RegisterScreen = ()  => {
    return(
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="register" />
                <View style={registerStyle.content}>
                <TextInput label="Username"></TextInput>
                <TextInput label="Email"></TextInput>
                <TextInput label="Password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline"/>}/>    
                <Button style={registerStyle.button} mode="contained">Register</Button>  
                </View>     
            </ScrollView>
        </SafeAreaView>
    );
}