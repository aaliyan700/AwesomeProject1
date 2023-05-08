import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IP from '../ip';
const Assessment = ({ navigation }) => {
    const [assList, setAssList] = useState([]);
    const GetTeacherCourses = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetCourseAndTeachers?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            console.log("first", data);
            setAssList(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const showMessage = () => {
        ToastAndroid.show('Your feedback was sent!', ToastAndroid.SHORT);
    };
    useEffect(() => {
        GetTeacherCourses();
    }, [])
    return (
        <View style={styles.container}>
            {
                assList?.map((item, index) => {
                    if (item != null) {
                        if (item.isPending == true) {
                            return (
                                <View key={index} style={styles.courseDiv}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Evaluate", { item })}>
                                        <Text style={styles.teacherFont}>{item.teacherName}</Text>
                                        <Text style={styles.courseFont}>{item.courseName}</Text>
                                        <View>
                                            <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>Pending....</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View key={index} style={styles.courseDiv1}>
                                    <TouchableOpacity
                                        onPress={() => showMessage()}>
                                        <Text style={styles.teacherFont}>{item.teacherName}</Text>
                                        <Text style={styles.courseFont}>{item.courseName}</Text>
                                        <View>
                                            <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>Done....</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            )
                        }
                    }
                })
            }
        </View>
    )
}

export default Assessment

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    courseDiv:
    {
        backgroundColor: 'white',
        margin: 10,
        padding: 16,
        borderRadius: 5,
        opacity: 0.7,
        elevation: 4,
    },
    courseDiv1:
    {
        backgroundColor: '#099e78',
        margin: 10,
        padding: 16,
        borderRadius: 5,
        opacity: 0.7,
        elevation: 4
    },
    teacherFont: {
        fontSize: 17,
        color: 'black'
    },
    courseFont: {
        fontSize: 14,
        color: 'black'
    },
    font:
    {
        fontWeight: 'bold',
        color: 'black'
    }

})