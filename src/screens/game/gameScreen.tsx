
import React, { useCallback } from "react"
import { StyleSheet, Image , Text, View, ScrollView, Linking } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button, Title } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { gameStyle } from "./gameStyle";
import { HeaderComponent } from "../../components/header/headerComponent";
import StarRating from 'react-native-star-rating-widget';



const GameScreen = ({ route, navigation }) => {
    const { itemId } = route.params;
    const { userId } = route.params;
    const url = "https://game-browser-application.herokuapp.com/api/game/" + itemId
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataaa, setDataaa] = useState([]);
    const [dats, setDats] = useState([]);

    const fetchReviews = async () => {
        const urll = "https://game-browser-application.herokuapp.com/api/reviews/" + itemId
        const respp = await fetch(urll)
        const dataa = await respp.json();
        setDataaa(dataa);

    }
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

        fetchReviews()
    }, []);


    const doNothing = () => {

    }
    const queryUser = async () => {
        const urlll = "https://game-browser-application.herokuapp.com/api/profile/get/" + userId
        const resppp = await fetch(urlll)
        const dataaaa = await resppp.json();
        const username = dataaaa[0]["username"]
        return username
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="Game" />
                    {data.map((item, index) => (
                    <View key={index}>
                    <Title style={[gameStyle.listItem, gameStyle.textt]}>{item.name}</Title>
                    <View style={gameStyle.container}>
                    <Image
                        style={{width: "100%", height: 220}}
                        source={{uri:"https://game-browser-application.herokuapp.com/api/gamepicture/" + itemId + "&" + new Date()}}
                        />
                    </View>
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
                    <Text style={[gameStyle.listItem, gameStyle.textt]}>Tags: {item.tags}</Text>
                    <Text style={[gameStyle.listItem, gameStyle.textt]}>Description: {item.description}</Text>
                    <Button mode='contained' style={gameStyle.listItem} onPress={() => navigation.navigate("Review", {userId: userId, gameId: itemId})}>My review</Button>
                    </View> 
                    ))}
                    {dataaa.map((item, index) => (
                        <View style={[gameStyle.listItem]} key={index}>
                        <Text style={[gameStyle.texttt]}> User: {item.user} </Text>
                        <StarRating  maxStars = {5} starSize = {20} rating={item.stars} onChange={doNothing}/>
                        <Text style={[gameStyle.texttt]}>{item.text}</Text>
                        </View> 
                    ))}
                     <Button mode='contained' style={gameStyle.listItem} onPress={() => navigation.goBack()}>Go back</Button>
            </ScrollView>
        </SafeAreaView>
    );
}

export default GameScreen;