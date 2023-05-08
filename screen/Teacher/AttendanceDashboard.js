import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const AttendanceDashboard = ({ navigation }) => {
    return (
        <View>
            <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("TeacherCourses")}>MarkAttendance</Button>
            <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("AddTimetable")}>Timetable management</Button>
        </View>
    )
}

export default AttendanceDashboard

const styles = StyleSheet.create({})