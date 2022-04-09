import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet,Image , Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect } from "react";
import { Card, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from "../../components/header/headerComponent";
import { menuStyle } from "./menuStyle";


interface MainScreenProps {
    navigation: any;
}

const MainScreen = ({ route, navigation } , props: MainScreenProps) => {
    const { userId } = route.params;
    console.log(userId)
    return(
        <SafeAreaView>
        <HeaderComponent title="Main menu"></HeaderComponent>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.navigate("Home", {userId: userId})}>Search games</Button>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.navigate("User", {userId: userId})}>User profile</Button>
        <Button mode='contained' style={menuStyle.listItem}>Videoconference</Button>
        <Button mode='contained' style={menuStyle.listItem} onPress={() => navigation.goBack()}>Go back</Button>

        </SafeAreaView>
    );
}

export default MainScreen;