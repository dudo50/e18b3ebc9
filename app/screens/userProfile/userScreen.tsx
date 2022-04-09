import { StatusBar } from 'expo-status-bar';
import React from "react"
import { Alert, StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from "../../components/header/headerComponent";
import { userStyle } from "./userStyle";


interface UserScreenProps {
    navigation: any;
}

const UserScreen = ({ route, navigation } , props: UserScreenProps) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setName] = useState("");
    const [password, setPW] = useState("");
    const [email, setEmail] = useState("");
    const [lab, setLab] = useState("");
    const [labb, setLabb] = useState("");
    const [labbb, setLabbb] = useState("");
    const [psw, setPsw] = useState("");
    const [usr, setUser] = useState("");
    const [em, setEm] = useState("");
    
    const changeDetails = async () => {
        //Req na login
        if(usr != username || em != email || psw != password){
        
            if(username == "")
            {
                setName(usr)
                if(email == "")
                {
                    setEmail(em)
                    if(password=="")
                    {
                        setPW(psw)
                    }}}
                        
                        const url = "https://game-browser-application.herokuapp.com/api/profile/update/" + userId + "&" + psw + "&" + username + "&" + password + "&" + email 
                        console.log(url)
                        const resp = await fetch(url,  {method: 'PUT', headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }})
                        const data = await resp.json();
                        setData(data);
                        console.log(data)
                        if(data == 1){
                            setLab( "Current username: " + username)
                            setLabbb("Current email: " + email)
                            setLabb("Current password: " + password)
                            setPsw(password)
                        }
                        else{
                            Alert.alert("Unable to change details, either you chose username that is taken or email that is taken.")
                        }
                    }
                    else{
                        Alert.alert("You did not change any details!")
                    }               
    }
    const { userId } = route.params;
    console.log(userId)
    console.log(username,password,email)
    const login = async () => {
            //Req na login
            const url = "https://game-browser-application.herokuapp.com/api/profile/get/" + userId 
            const resp = await fetch(url)
            const data = await resp.json();
            setData(data);
            setLoading(false)
            console.log(data)
            setName(data[0]["username"])
            setPW(data[0]["password"])
            setEmail(data[0]["email"])
            setLab( "Current username: " + data[0]["username"])
            setLabb("Current password: " + data[0]["password"])
            setLabbb("Current email: " + data[0]["email"])
            setPsw(data[0]["password"])
            setUser(data[0]["username"])
            setEm(data[0]["email"])
    }       

    useEffect(() => {
        login();
      }, []);

    return(
        <SafeAreaView>
        <HeaderComponent title="User profile"></HeaderComponent>
        <Image style={userStyle.img} source={require("./logo.png")}/>
        <Button>Change profile picture</Button>
        <TextInput onChangeText={newText => setName(newText)} defaultValue={username} label = {lab} keyboardType="default"></TextInput>
        <TextInput onChangeText={newText => setPW(newText)} defaultValue={password} label = {labb} keyboardType="default"></TextInput>
        <TextInput onChangeText={newText => setEmail(newText)} defaultValue={email} label = {labbb} keyboardType="default"></TextInput>
        <Button onPress={changeDetails} mode="contained" style={userStyle.listItem}>Change details</Button>
</SafeAreaView>
    );
}

export default UserScreen;