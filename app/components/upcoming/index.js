import React from 'react'
import { View, StyleSheet, Text, ListView } from 'react-native'
import Header from '../shared/header'

const mock = [
    { title: '6º Meetup NugCE', location: 'Fortaleza', date: 'Apr, 10'},
    { title: 'Flisol', location: 'Fortaleza', date: 'Apr, 10'}
]


class UpcomingPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: dataSource.cloneWithRows(mock)
        }

        this.renderEventsRow = this.renderEventsRow.bind(this)
    }

    renderEventsRow(item) {
        return <Text>{item.title}</Text>
    }

    render() {
        return(    
            <View style={{flex:1}}>
                <Header title={'Upcoming Events'}/>
                <View style={{flex:1}}>
                    <ListView                         
                        renderRow={this.renderEventsRow}
                        dataSource={this.state.dataSource}
                    />
                </View>
            </View>    
        )
    }
}

export default UpcomingPage
