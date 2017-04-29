import React from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
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


class EventListItem extends React.Component {    

    constructor(props, context) {
        super(props, context)

        this.state= {
            height: new Animated.Value(0)
        }
        this._onPress = this._onPress.bind(this)
    }

    componentWillReceiveProps(props) {

        const toValue = props.isSelected ? 1 : 0 

        Animated.timing(
            this.state.height,
            {
                toValue: toValue
            }
        ).start()
    }

    _onPress() {
        this.props.onEventSelected(this.props.event)       
    }


    render() {       

        const { event } = this.props 
        const height = this.state.height.interpolate({
            inputRange: [0, 1],
            outputRange: [70, 140]
        })

        return (                  
            
            <Animated.View style={[styles.container, { height: height}]}>
                <TouchableOpacity style={{flex: 1}} onPress={this._onPress}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>{event.name}</Text>
                        <NotificationButton 
                            event={event}
                            onNotificationPress={this.props.onNotificationPress}
                        />
                    </View>
                    <Text style={styles.subTitle}>{event.location ? event.location : "Location not defined"}</Text>
                    <Text style={styles.subTitle}>{event.due}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

EventListItem.propTypes = {
    onEventSelected: React.PropTypes.func,
    onNotificationPress: React.PropTypes.func,
    event: React.PropTypes.object.isRequired
}

export default EventListItem;