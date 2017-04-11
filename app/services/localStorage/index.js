import * as  API from '../api'

import React from 'react'
import { AsyncStorage } from 'react-native'

export async function getCards() {

    try {
        let data = await AsyncStorage.getItem("cards")
        if (data === null) {
            let cards = await API.getCards()
            await AsyncStorage.setItem("cards", JSON.stringify(cards))
            return cards            
        } else {
            return JSON.parse(data);
        }
    }
    catch (ex) {
        console.log("error getting cards from local storage")
        console.log(ex)
    }
}   

