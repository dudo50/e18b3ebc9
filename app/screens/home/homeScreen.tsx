import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet,Image , Text, View, FlatList, ScrollView } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeStyle } from "./homeStyle";
import { HeaderComponent } from "../../components/header/headerComponent";

const HomeScreen = () => {
    const url = "https://game-browser-application.herokuapp.com/api/games"
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        setTextik("Showing all games in library")
    }, []);

    const [text, setText] = useState('');
    const [textik, setTextik] = useState('');
    console.log(text)
    const searchSpecific = () => {
        if(text != "")
        {
        const url = "https://game-browser-application.herokuapp.com/api/game/search/" + text
        fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        setTextik("You searched for: " + text)
        }
        else {
            const url = "https://game-browser-application.herokuapp.com/api/games"
            fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
            setTextik("Showing all games in library")
            }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="Game library" />
                <View style={homeStyle.container}>
                    <View style={homeStyle.listItem}>
                    <Text style={homeStyle.textt}>{textik}</Text>
                    </View>
                    <TextInput onChangeText={newText => setText(newText)} defaultValue={text} label = "Search for game" keyboardType="default"></TextInput>
                    <Button onPress={searchSpecific} mode='contained'>Search</Button>
                    {data.map((item, index) => (
                    <View style={homeStyle.listItem} key={index}>
                    <Image style={homeStyle.image} source={require("./logo.png")}/>
                    <Text style={homeStyle.text}>{item.name + '\nRelease date: ' + item.released + "\nDeveloper: " +item.developer + "\nDescription: " + item.description}</Text>
                    </View> 
                    ))}
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;