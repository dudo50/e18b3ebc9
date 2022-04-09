import React from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { loginStyle } from "./loginStyle";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Image , Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";

interface LoginScreenProps {
    navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const login = async () => {
        //Req na login
        const url = "https://game-browser-application.herokuapp.com/api/login/" + text + "&" +textik 
        console.log(url)
        const resp = await fetch(url,  {method: 'PUT', headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        const data = await resp.json();
        setData(data);
        if(data == 0)
        {
            Alert.alert("Incorrect details enterred!")
        }
        else{
            props.navigation.navigate("Home")
        }
    }
    const [text, setText] = useState('');
    const [textik, setTextik] = useState('');
    console.log(text,textik)
    const register = () => props.navigation.navigate("Register")
    return(
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
            <Card>
                <Card.Title title = "Game library" titleStyle ={loginStyle.cardTitle}></Card.Title>
                <Card.Content>
                    <TextInput onChangeText={newText => setText(newText)} defaultValue={text} label = "Username" keyboardType="default"></TextInput>
                    <TextInput onChangeText={newTextik => setTextik(newTextik)} defaultValue={textik} label = "Password" secureTextEntry={true}></TextInput>
                    <Button onPress={login} style={loginStyle.cardButton} mode="contained">Login</Button>
                    <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                </Card.Content>
            </Card>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;