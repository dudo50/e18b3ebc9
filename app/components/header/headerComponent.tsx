import React from "react";
import { Appbar } from "react-native-paper";

export const HeaderComponent = (props: HeaderComponentParams) => {
    return (
        <Appbar>
            <Appbar.BackAction/>
            <Appbar.Content title= {props.title}></Appbar.Content>
        </Appbar>
    )
}

interface HeaderComponentParams {
    title: string;
}