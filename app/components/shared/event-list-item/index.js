import React from 'react'
import { View, Text } from 'react-native'
import Months from '../../../shared/months'
import NotificationButton from '../notification'

const styles = {
    container: {
        height: 70,
        backgroundColor: '#ecf0f1',
        borderBottomColor: '#bdc3c7',
        borderBottomWidth: 0.5,        
        justifyContent: 'center',
        padding: 5
    },
    title: {
        fontSize: 16,
        flex:1
    },
    subTitle: {
        fontSize:12,
        color: '#95a5a6'
    }
}


const EventListItem = ({ event, onNotificationPress }) => {    

    return (       

        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.title}>{event.name}</Text>
                <NotificationButton 
                    event={event}
                    onNotificationPress={onNotificationPress}
                />
            </View>
            <Text style={styles.subTitle}>{event.location ? event.location : "Location not defined"}</Text>
            <Text style={styles.subTitle}>{event.due}</Text>
        </View>
    )
}

export default EventListItem;