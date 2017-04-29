import React from 'react'
import { View, StyleSheet, Text, ListView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as eventActions from '../../actions/events'
import Header from '../shared/header'
import EventItem from '../shared/event-list-item'
import * as LocalStorage from '../../services/localStorage'


const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
})


class UpcomingPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        

        this.state = {
            dataSource: dataSource.cloneWithRows([])
        }

        this.renderEventsRow = this.renderEventsRow.bind(this)   
        this._onNotificationButtonPress = this._onNotificationButtonPress.bind(this)     
        this._onEventSelected = this._onEventSelected.bind(this)
        this.props.eventActions.fetchEvents();
    }    

    _onNotificationButtonPress(event) {
        if(!event.registered) 
            this.props.eventActions.registerNotification(event)
        else 
            this.props.eventActions.cancelNotification(event)
    } 

    _onEventSelected(event) {

        this.props.eventActions.selectEvent(event)
    }

    renderEventsRow(item) {     

        let isSelected = false

        if(this.props.selectedEvent)
            isSelected = this.props.selectedEvent.id == item.id
        else
            isSelected = false

        return <EventItem 
                event={item}                 
                isSelected={isSelected}
                onNotificationPress={this._onNotificationButtonPress}
                onEventSelected={this._onEventSelected}
                />
    }

    componentWillReceiveProps(props) {
        console.log(props)
        this.setState({
            dataSource: dataSource.cloneWithRows(props.events)
        })
    }

    render() {
        return(    
            <View style={{flex:1}}>
                <Header title={'Upcoming Events'}/>
                <View style={{flex:1}}>
                    <ListView                         
                        renderRow={this.renderEventsRow}
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                    />
                </View>
            </View>    
        )
    }
}

export default connect(
    state => ({
        events: state.events.events,
        selectedEvent: state.events.selectedEvent
    }),
    dispatch => ({
        eventActions: bindActionCreators(eventActions, dispatch)
    })
)(UpcomingPage)
