import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { HeaderComponent } from "../../components/header/headerComponent";
import { registerStyle } from "./registerStyle";
import {useState, useEffect } from "react";
import { Alert, } from "react-native";
import { Card,  } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Image , Text, FlatList, TouchableOpacity } from 'react-native';

interface RegisterScreenProps {
    navigation: any;
}



export const RegisterScreen = (props: RegisterScreenProps)  => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [textik, setTextik] = useState('');
    const [textt, setTextt] = useState('');
    async function register() {
        const url = "https://game-browser-application.herokuapp.com/api/register"
            console.log(url)
            await fetch(url,  {method: 'POST', headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": text,
                "email": textik,
                "password": textt
            })
            })
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
            if(data == 0)
            {
                Alert.alert("Incorrect details enterred!")
            }
            else{
                props.navigation.navigate("Home")
            }
    }
    return(
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="register" />
                <View style={registerStyle.content}>
                <TextInput onChangeText={newText => setText(newText)} defaultValue={text} label="Username"></TextInput>
                <TextInput onChangeText={newTextik => setTextik(newTextik)} defaultValue={textik} label="Email"></TextInput>
                <TextInput onChangeText={newTextt => setTextt(newTextt)} defaultValue={textt} label="Password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline"/>}/>    
                <Button onPress={register} style={registerStyle.button} mode="contained">Register</Button>  
                </View>     
            </ScrollView>
        </SafeAreaView>
    );
}