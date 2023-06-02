import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const ViewStudentPerformance = ({ navigation, route }) => {
    const { item } = route.params;
    return (

        <View>
            <Button style={{ padding: 10, margin: 10 }} mode="contained"
                color="#099e78"
                onPress={() => navigation.navigate('ViewAsgDetails', { item })}>Assignment/Quizes</Button>
            <Button style={{ padding: 10, margin: 10 }} mode="contained" color="#099e78"
                onPress={() => navigation.navigate('ViewExamsDetails', { item })}
            >Exam Results</Button>
        </View>
    )
}
export default ViewStudentPerformance

const styles = StyleSheet.create({})