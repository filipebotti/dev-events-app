import React from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import Months from '../../../shared/months'
import NotificationButton from '../notification'

const styles = {
    container: {
        backgroundColor: 'white',
        borderBottomColor: '#bdc3c7',
        borderBottomWidth: 0.5,        
        justifyContent: 'center',
        
    },
    titleContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 5
    },
    title: {
        fontSize: 16,
        flex:1
    },
    subTitleContainer: {
        paddingLeft: 5,        
        flex: 1
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
            animValue: new Animated.Value(0)
        }
        this._onPress = this._onPress.bind(this)
        this._renderSubtitle = this._renderSubtitle.bind(this)
        this.measureDescriptionText = this.measureDescriptionText.bind(this)
    }

    componentWillReceiveProps(props) {

        const toValue = props.isSelected ? 1 : 0 

        Animated.timing(
            this.state.animValue,
            {
                toValue: toValue
            }
        ).start()
    }


    measureDescriptionText(x, y, width, height, pageX, pageY) {
        this.setState({
            offset: height
        })
    }

    componentDidUpdate()
    {
        if(this.refs.text)
        {
            this.refs.text.measure(this.measureDescriptionText)
        }
    }

    _onPress() {
        this.props.onEventSelected(this.props.event)       
    }

    _renderSubtitle(event) {
        
        if(!this.props.isSelected)
        {
            const opacity = this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            })

            return (
                <Animated.View style={[styles.subTitleContainer]}>
                    <Text style={styles.subTitle}>{event.location ? event.location : "Location not defined"}</Text>
                    <Text style={styles.subTitle}>{event.due}</Text>
                </Animated.View>
            )
        }
        else
        {
            const backColor = this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [ 'rgb(255, 255, 255)', 'rgb(227, 227, 227)']
            })
            
            return (
                <Animated.View
                    ref={(ref) => { this.descricao = ref }}
                    style={[styles.subTitleContainer, 
                            {opacity: this.state.animValue, backgroundColor: backColor, padding: 5}]}>
                        <Text ref="text">{event.desc}</Text>
                </Animated.View>                
            )
        }
        
    }

    

    render() {       

        const { event, isSelected } = this.props 
        event.isSelected = isSelected

        const heightMax = this.state.offset == 0 ? 70 : 70 + this.state.offset

        const height = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [70, heightMax]
        })

        const backColor = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgb(255,255,255)', 'rgb(235, 194, 44)']
        })

        const titleColor = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgb(0, 0, 0)', 'rgb(255,255,255)']
        })
        
        return (                  
            
            <Animated.View style={[styles.container, { height: height }]}>
                <TouchableOpacity style={{flex: 1}} onPress={this._onPress}>
                    <Animated.View style={[ styles.titleContainer, { backgroundColor: backColor}]}>
                        <Animated.Text style={[styles.title, { color: titleColor }]}>{event.name}</Animated.Text>
                        <NotificationButton 
                            event={event}
                            onNotificationPress={this.props.onNotificationPress}
                        />
                    </Animated.View>
                    {this._renderSubtitle(event)}
                    
                    
                    
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