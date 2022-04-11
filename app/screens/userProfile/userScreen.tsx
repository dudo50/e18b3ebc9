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
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'


interface UserScreenProps {
    navigation: any;
}

const UserScreen = ({ route, navigation } , props: UserScreenProps) => {
    const [data, setData] = useState([]);
    const [username, setName] = useState("");
    const [password, setPW] = useState("");
    const [email, setEmail] = useState("");
    const [lab, setLab] = useState("");
    const [labb, setLabb] = useState("");
    const [labbb, setLabbb] = useState("");
    const [psw, setPsw] = useState("");
    const [usr, setUser] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [em, setEm] = useState("");
    const [response, setResponse] = useState();
    
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
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        console.log(result)
        const { cancelled } = result as ImageInfo
        if(cancelled == false)
        {

        const { uri } = result as ImageInfo
        const imageType = uri.split('.')[1];
        const bodyy = new FormData();
        const bod = JSON.parse(JSON.stringify({ uri: uri, type: 'image/'+imageType, name: 'profilePicture'+userId+".jpg" }));
        bodyy.append('demo_image', bod);
        try{
            await fetch("https://game-browser-application.herokuapp.com/api/upload/picture/" + userId, {
                method:'POST',
                body: bodyy,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                }
            })
            Alert.alert("Profile picture uploaded!")
        }
        catch (error){
            console.log(error)
        }
        }
        else{
            Alert.alert("You did not choose picture to upload.")
        }
    }

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