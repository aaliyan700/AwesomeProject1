import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage'
const TeacherRanking = ({ navigation }) => {
    const [teacherCourse, setTeacherCourse] = useState([]);
    const GetTeacherCourses = async () => {
        try {
            const user_name = await AsyncStorage.getItem('username');
            console.log(user_name);
            const query = `http://${IP}/StudentPortal/api/Student/GetPeerTeacherEvaluation?reg_no=${user_name}`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            setTeacherCourse(data);
            console.log("data", data);
        } catch (error) {
            console.warn(error);
        }
    }
    useEffect(() => {
        GetTeacherCourses();
    }, [])
    return (
        <View style={styles.container}>
            {
                teacherCourse?.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("ViewRanking", [item])} key={index} style={styles.card}>
                            <Text style={styles.font}>{item.courseName}</Text>
                            <Text style={styles.font}>{item.courseCode}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default TeacherRanking

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        container: 'white'
    },
    card:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 9,
        borderRadius: 5
    },
    font:
    {
        color: 'black',
        fontWeight: '600'
    }
})