import { StatusBar } from 'expo-status-bar';
import React from "react"
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {useState, useEffect } from "react";
import axios from "axios";

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
    getAllUsers()
  }, [])
  return (
    <View style={styles.container}>
      <Text>Hello I am working</Text>
      <FlatList
      data = {users}
      renderItem={({item})=><Text>{item.username}, {item.password}</Text>}
      keyExtractor={item=> item.user_id}
      />
      <StatusBar style="auto" />
    </View>
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
