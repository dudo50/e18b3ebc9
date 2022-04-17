import React from "react"
import { Alert, StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from "../../components/header/headerComponent";
import { userStyle } from "./userStyle";
import ImagePicker, { launchImageLibrary } from "react-native-image-picker"
import RNFetchBlob from 'rn-fetch-blob'



const UserScreen = ({ route, navigation }) => {
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
                        try{

                        
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
                    catch (error){
                        Alert.alert("Unable to change details.")
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

    const useImageCallback = React.useCallback(response => {
        if(response.didCancel) {
            Alert.alert("You cancelled image picking.")
            console.log("cancelled")
        } else if (response.errorCode) {
            console.log(response.errorMessage)
        } else {
            handleUpload(response)
               }
    }, []); 

    const handleUpload = async (response) => {

        console.log(response)
        const formData = new FormData()

        // formData.append('profileImage',{ name, uri, type})
        
        // Example code

        formData.append('demo_image', JSON.parse(JSON.stringify({uri: response.assets[0].uri, type: "image/jpeg", name: "profilePicture" + userId + ".jpg"})))
        
        try{  
            RNFetchBlob.fetch('POST', "https://game-browser-application.herokuapp.com/api/upload/picture/" + userId, {
                'Content-Type' : 'multipart/form-data',
            }, [

                {name: "demo_image", filename:"profilePicture" + userId + ".jpg",type: "image/jpeg", data:RNFetchBlob.wrap(response.assets[0].uri)}
            ]).then((resp) => {
                Alert.alert("Image uploaded successfuly!")
              }).catch((err) => {
                console.log(err)
              })
            

        }
        catch (error){
            console.log(error);
        }
    }
    const openImagePickerAsync = async () => {
        launchImageLibrary(
            {
                selectionLimit: 1,
                mediaType: "photo",
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500
            },
            useImageCallback
        )
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