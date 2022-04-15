
import React from "react"
import { StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeStyle } from "./homeStyle";
import { HeaderComponent } from "../../components/header/headerComponent";
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

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
                    <TouchableOpacity  key={index}  onPress={() => {navigation.navigate('Game', {itemId: item.game_id, userId: userId}); }}>
                        <View style={homeStyle.listItem}>
                        <Image
                        style={{width: "100%", height: 220}}
                        source={{uri:"https://game-browser-application.herokuapp.com/api/gamepicture/" + item.game_id + "&" + new Date()}}
                        />
                        <Text style={homeStyle.text}>{item.name + '\nRelease date: ' + item.released + "\nDeveloper: " +item.developer + "\nDescription: " + item.description}</Text>
                        </View> 
                    </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;