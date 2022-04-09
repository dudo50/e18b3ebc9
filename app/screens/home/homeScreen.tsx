import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeStyle } from "./homeStyle";
import { HeaderComponent } from "../../components/header/headerComponent";

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen = ({ route, navigation } , props: HomeScreenProps) => {
    const { userId } = route.params;
    console.log(userId)
    const url = "https://game-browser-application.herokuapp.com/api/games"
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
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
    async function searchSpecific() {
        if(text != "")
        {
        const url = "https://game-browser-application.herokuapp.com/api/game/search/" + text
        await fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        setTextik("You searched for: " + text)
        }
        else {
            const url = "https://game-browser-application.herokuapp.com/api/games"
            await fetch(url)
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
                    <Button onPress={() => {navigation.navigate('Main', {userId: userId}); }} mode="contained">Main menu</Button>
                    <View style={homeStyle.listItem}>
                    <Text style={homeStyle.textt}>{textik}</Text>
                    </View>
                    <TextInput onChangeText={newText => setText(newText)} defaultValue={text} label = "Search for game" keyboardType="default"></TextInput>
                    <Button onPress={searchSpecific} mode='contained'>Search</Button>
                    {data.map((item, index) => (
                    <TouchableOpacity  onPress={() => {navigation.navigate('Game', {itemId: item.game_id, userId: userId}); }}>
                        <View style={homeStyle.listItem} key={index}>
                        <Image style={homeStyle.image} source={require("./logo.png")}/>
                        <Text style={homeStyle.text}>{item.name + '\nRelease date: ' + item.released + "\nDeveloper: " +item.developer + "\nDescription: " + item.description}</Text>
                        </View> 
                    </TouchableOpacity>
                    ))}
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;