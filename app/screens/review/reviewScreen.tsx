import { StatusBar } from 'expo-status-bar';
import React from "react"
import { Alert, StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button, Title } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from "../../components/header/headerComponent";
import { reviewStyle } from './reviewStyle';
import StarRating from 'react-native-star-rating-widget';


interface ReviewScreenProps {
    navigation: any;
}

const ReviewScreen = ({ route, navigation } , props: ReviewScreenProps) => {
    const { userId } = route.params;
    const { gameId } = route.params;
    const [data, setData] = useState([]);
    const [rev, setRev] = useState("0")
    const [loading, setLoading] = useState(true);
    const [rate, setRating] = useState(0);
    const [mamRev, setMamRev] = useState(0);
    console.log(rate)

    const getReview = async () => {
        const url = "https://game-browser-application.herokuapp.com/api/game/" +gameId + "/"+ userId 
        const resp = await fetch(url)
        const data = await resp.json();
        setData(data);
        setLoading(false)
        console.log(data)
        const dataLength = data.length
        if(dataLength == 0)
        {
            //AZ NEMA REVIEW
            //Nic nezmenime a vykreslime mu klasicku obrazovku

        }
        else{
            //MA REVIEW
            setMamRev(1)
            const ratis = data[0]["stars"]
            setRating(ratis)
            const texts = data[0]["text"]
            setText(texts)
            //Vykreslime obrazovku s vytiahnutym review
            

        }
        //Vytiahneme si nazov hry
        const urll = "https://game-browser-application.herokuapp.com/api/game/" +gameId
        const respp = await fetch(urll)
        const dataa = await respp.json();
        setData(dataa);
        setLoading(false)
        console.log(dataa)
        const naz =  dataa[0]["name"]
        setNazov(naz)
        
    }
    const [nazov,setNazov] = useState("")
    const [text, setText] = useState("")
    useEffect(() => {
        getReview();
      }, []);

    const updateReview = async () => {
        if(mamRev == 0){
            const url = "https://game-browser-application.herokuapp.com/api/game/post"
            console.log(url)
            const resp = await fetch(url,  {method: 'POST', headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": userId,
                "stars": rate,
                "text": text,
                "game": gameId
            })
            })
            const data = await resp.json();
            setData(data);
            if(data == 0)
            {
                Alert.alert("Unable to post review!")
            }
            else{
                Alert.alert("Review posted!")
            }
        }
        else
        {
            const url = "https://game-browser-application.herokuapp.com/api/game/" + gameId + "/edit/" + userId + "/" + rate + "&" + text
            console.log(url)
            const resp = await fetch(url,  {method: 'PUT', headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            })
            const data = await resp.json();
            setData(data);
            if(data == 0)
            {
                Alert.alert("Unable to save review!")
            }
            else{
                Alert.alert("Review saved!")
            }
        }
    }
    const deleteRev = async () => {
        const url = "https://game-browser-application.herokuapp.com/api/game/" + gameId + "/delete/" + userId
            console.log(url)
            const resp = await fetch(url,  {method: 'DELETE', headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            })
            const data = await resp.json();
            setData(data);
            if(data == 0)
            {
                Alert.alert("Unable to delete review!")
            }
            else{
                Alert.alert("Review deleted!")
                setRating(0)
                setText("")

            }
    }
    return(
        <SafeAreaView>
        <HeaderComponent title="My review"></HeaderComponent>
        <Title style={reviewStyle.textt}>{nazov}</Title>
        <Text style={reviewStyle.textt}>Select star rating:</Text>
        <StarRating maxStars = {5} starSize = {65} rating={rate} onChange={setRating}/>
        <Text style={[reviewStyle.listItem, reviewStyle.text]}>Your review text will be: {text}</Text>
        <TextInput  onChangeText={newText => setText(newText)} multiline = {true} numberOfLines = {4} style={[reviewStyle.listItem]} label="Update review text"></TextInput>
        
        <Button mode='contained' style={reviewStyle.listItem} onPress={deleteRev}>Delete review</Button>
        <Button mode='contained' style={reviewStyle.listItem} onPress={updateReview} >Save review</Button>
        <Button mode='contained' style={reviewStyle.listItem} onPress={() => navigation.goBack()}>Go back</Button>

        </SafeAreaView>
    );
}

export default ReviewScreen;