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
        this.props.eventActions.fetchEvents();
    }    

    renderEventsRow(item) {
        return <EventItem event={item}/>
    }

    componentWillReceiveProps(props) {
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
        events: state.events.events
    }),
    dispatch => ({
        eventActions: bindActionCreators(eventActions, dispatch)
    })
)(UpcomingPage)
