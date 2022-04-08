import React from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { Appbar } from "react-native-paper";

export const HeaderComponent = (props: HeaderComponentParams) => {
    return (
        <Appbar>
            <Appbar.Content title= {props.title}></Appbar.Content>
        </Appbar>
    )
}

interface HeaderComponentParams {
    title: string;
}