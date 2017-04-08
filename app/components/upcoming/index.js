import React from 'react'
import { View, StyleSheet, Text, ListView } from 'react-native'
import Header from '../shared/header'
import EventItem from '../shared/event-list-item'
import * as API from '../../services/api'

const mock = [
    { title: '6º Meetup NugCE', location: 'Fortaleza', date: 'Apr, 10'},
    { title: 'Flisol', location: 'Fortaleza', date: 'Apr, 10'}
]

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
        this.getListsFromBoard = this.getListsFromBoard.bind(this)
    }

    componentDidMount() {
        this.getListsFromBoard()
        
    }

    async getListsFromBoard() {
        let lists = await API.getCards()
        this.setState({
            dataSource: dataSource.cloneWithRows(lists)
        })
    }

    renderEventsRow(item) {
        return <EventItem event={item}/>
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

export default UpcomingPage
