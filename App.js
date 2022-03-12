import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import {useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    async function getAllUsers(){
    try {
      const users = await axios.get("http://127.0.0.1:8000/api/profiles")
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
      <Text>Hello</Text>
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
