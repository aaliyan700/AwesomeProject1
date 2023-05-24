import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IP from '../ip'
const CourseAdvisor = ({ navigation }) => {
    const [studentList, setStudentList] = useState([]);
    const GetAdvisorStudent = async () => {
        const user_name = await AsyncStorage.getItem('username');
        console.log("username", user_name);
        try {
            const query = `http://${IP}/StudentPortal/api/Teacher/GetStudentsCourseAdvisor?teacher_id=${user_name}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setStudentList(data);
            console.log("data", data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetAdvisorStudent();
    }, [])
    return (
        <View style={styles.container}>
            {
                studentList[0]?.sList?.map((item, index) => {
                    return (
                        <Pressable onPressIn={() => navigation.navigate("CourseAdvisorInformation", { studentList, item })} style={styles.subContainer} key={index}>
                            <Text style={styles.font}>Name:     {item.student_name}</Text>
                            <Text style={styles.font}>Reg No:   {item.reg_no}</Text>
                            <Text style={styles.font}>Cgpa:      {item.cgpa}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export default CourseAdvisor

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer:
    {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 9
    },
    font:
    {
        color: 'black'
    }
})