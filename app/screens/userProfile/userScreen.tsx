import { StatusBar } from 'expo-status-bar';
import React from "react"
import { Alert, StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from "../../components/header/headerComponent";
import { userStyle } from "./userStyle";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


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
    let [selectedImage, setSelectedImage] = useState("");
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
                        const resp = await fetch(url,  {method: 'PUT', headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }})
                        const data = await resp.json();
                        setData(data);
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
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        const dataa = Object.values(pickerResult);
        var data = new FormData();
        data.append('image', { 
          // @ts-ignore 
          path: dataa[2], // Don't replace the file with ''..
          originalname: "profilePic" + userId + ".jpg",
          type: "image/jpg",
          fieldname: "demo_image"
        })
        console.log(data)
        const uploadImage = await axios.post(`http://localhost:8000/api/upload/picture/` + userId, data);    }

    return(
        <SafeAreaView>
        <HeaderComponent title="User profile"></HeaderComponent>
        <>
        <ScrollView>
        <View style={userStyle.container}>
        <Image
            style={{width: "100%", height: 220}}
            source={{uri:"https://game-browser-application.herokuapp.com/api/picture/" + userId + "&" + new Date()}}
        />
        </View>
        <Button onPress={openImagePickerAsync}>Change profile picture</Button>
        <TextInput onChangeText={newText => setName(newText)} defaultValue={username} label = {lab} keyboardType="default"></TextInput>
        <TextInput onChangeText={newText => setPW(newText)} defaultValue={password} label = {labb} keyboardType="default"></TextInput>
        <TextInput onChangeText={newText => setEmail(newText)} defaultValue={email} label = {labbb} keyboardType="default"></TextInput>
        <Button onPress={changeDetails} mode="contained" style={userStyle.listItem}>Change details</Button>
        <Button mode='contained' style={userStyle.listItem} onPress={() => navigation.goBack()}>Go back</Button>
        </ScrollView>
        </>
    </SafeAreaView>
    );
}

export default UserScreen;