import React from 'react'
import { View, Text } from 'react-native'

// const


const EventListItem = ({ event }) => {
    return (
        <View>
            <Text>{event.title}</Text>
            <Text>{event.location}</Text>
            <Text>{event.date}</Text>
        </View>
    )
}

export default EventListItem;