import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage'
const ViewEvaluationTeacher = ({ navigation }) => {
    const [teacherCourses, setTeacherCourses] = useState([]);
    const GetTeachers = async () => {
        const username = await AsyncStorage.getItem('username');
        let url = `http://${IP}/StudentPortal/api/Teacher/GetEvaluatingTeachersCourses?teacher_id=${username}`
        console.log(url);
        const response = await fetch(
            `http://${IP}/StudentPortal/api/Teacher/GetEvaluatingTeachersCourses?teacher_id=${username}`, {
            method: 'GET',
        }
        );
        const data = await response.json();
        setTeacherCourses(data);
        console.log("Data", data);
    }
    useEffect(() => {
        GetTeachers();
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    teacherCourses?.map((item, index) => {
                        if (item.isPending == true) {
                            return (
                                <Pressable onPressIn={() => navigation.navigate("TeacherQuestions", { item })} key={index} style={styles.subContainer}>
                                    <Text style={styles.font}>{item.teacherName}</Text>
                                    <Text style={styles.font1}>{item.courseName}</Text>
                                    <Text style={styles.font1}>{item.courseCode}</Text>
                                    <Text style={styles.font1}>Pending...</Text>
                                </Pressable>
                            )
                        }
                        else {
                            return (
                                <Pressable style={styles.subContainer} key={index}>
                                    <Text style={styles.font}>{item.teacherName}</Text>
                                    <Text style={styles.font1}>{item.courseName}</Text>
                                    <Text style={styles.font1}>{item.courseCode}</Text>
                                    <Text>Done...</Text>
                                </Pressable>
                            )
                        }
                    })
                }
            </ScrollView>
        </View>
    )
}

export default ViewEvaluationTeacher

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "white"
    },
    subContainer:
    {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        padding: 16,
        elevation: 3
    },
    font:
    {
        fontSize: 17,
        color: 'black',
        fontWeight: '700'
    },
    font1:
    {
        fontSize: 15,
        color: 'black'
    }

})