import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from "react"
import { StyleSheet, Image , Text, View, ScrollView, Linking } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button, Title } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { gameStyle } from "./gameStyle";
import { HeaderComponent } from "../../components/header/headerComponent";
import { OpenURLButton } from '../../components/header/browseRedirect';

const GameScreen = ({ route, navigation }) => {
    const { itemId } = route.params;
    const url = "https://game-browser-application.herokuapp.com/api/game/" + itemId
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="Game" />
                    {data.map((item, index) => (
                    <View key={index}>
                    <Title style={[gameStyle.listItem, gameStyle.textt]}>{item.name}</Title>
                    <Image  style={gameStyle.img} source={require("./logo.png")}/>
                    <Text style={[gameStyle.listItem, gameStyle.textt]}>Developer: {item.developer}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, paddingLeft: 0 }}>
                    <Text style={[gameStyle.listItem, gameStyle.textt]}>Release date: {item.released}</Text>
                    </View>
                    <View
                    style={{ flex: 1, paddingRight: 0 }}>
                    <Text style={[gameStyle.listItem, gameStyle.textt]} onPress={() => Linking.openURL(item.link)}>Link</Text>                 
                    </View>
                </View>
                    </View> 

                    ))}
                     <Button onPress={() => navigation.goBack()}>Go back</Button>
                    <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}

export default GameScreen;