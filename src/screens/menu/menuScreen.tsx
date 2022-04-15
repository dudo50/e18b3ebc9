
import React from "react"
import { Alert, StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from "../../components/header/headerComponent";
import { menuStyle } from "./menuStyle";


interface MainScreenProps {
    navigation: any;
}

const MainScreen = ({ route, navigation } , props: MainScreenProps) => {
    const { userId } = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const signOut = async () => {
        const url = "https://game-browser-application.herokuapp.com/api/profile/get/" + userId 
        const resp = await fetch(url)
        const data = await resp.json();
        setData(data);
        setLoading(false)
        console.log(data)
        const username = data[0]["username"]
        const password = data[0]["password"]
 

        const urll = "https://game-browser-application.herokuapp.com/api/signout/" + username + "&" +password 
        console.log(urll)
            const response = await fetch(urll,  {method: 'PUT', headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})
            const dataa = await response.json();
            setData(dataa);
            console.log(dataa)
            if(dataa == 0)
            {
                Alert.alert("Unable to signout!")
            }
            else{
                navigation.navigate("Login");
            }
    }
    return(
        <SafeAreaView>
        <HeaderComponent title="Main menu"></HeaderComponent>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.navigate("Home", {userId: userId})}>Search games</Button>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.navigate("User", {userId: userId})}>User profile</Button>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.navigate("Redirector")}>Videoconference</Button>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.goBack()}>Go back</Button>
        <Button mode='contained' style={menuStyle.listItemm} onPress={signOut}>Sign out</Button>
        </SafeAreaView>
    );
}

export default MainScreen;