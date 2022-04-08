import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {useState, useEffect } from "react";
import axios from "axios";
import { Provider as PaperProvider, TextInput } from "react-native-paper";
import { theme } from "./AppStyle";
import AppNavigator from './app/appNavigator';

export default function App() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    async function getAllUsers(){
    try {
      const users = await axios.get("https://game-browser-application.herokuapp.com/api/profiles")
      console.log(users.data)
      setUsers(users.data)
    } catch (error) {
      console.log(error)
    }
    }
  }, [])
  return (
    
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
