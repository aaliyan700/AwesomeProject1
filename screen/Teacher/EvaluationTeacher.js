import { ActivityIndicator, StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from 'react-native-super-grid';
import { Modal, Button, Portal, Provider } from 'react-native-paper';
const EvaluationTeacher = ({ navigation }) => {
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [teacherList, setTeacherList] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const getCourseHandler = async () => {
        console.log("fetching.....")
        const username = await AsyncStorage.getItem('username')
        try {
            const query = `http://${IP}/StudentPortal/api/Teacher/GetCourses?username=${username}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            let temp = [];
            let uniqueProgram = [...new Map(data.map((m) => [m.course_code, m])).values()];
            uniqueProgram.map((i) => {
                temp.push(i);
            })
            setTeacherList(temp);
            setCourses(data);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCourseHandler();
    }, [])
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate('GradeStudent', { item, courses });
        };
        return (
            <View>
                <TouchableOpacity style={styles.boxes}
                    onPress={() => handler()}>
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', color: 'black' }}>{item.course_name}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>{item.course_code}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#099e78" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View>
                <FlatGrid
                    itemDimension={130}
                    data={teacherList}
                    renderItem={showItems}
                />
            </View>
        </View>
    )
}

export default EvaluationTeacher;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },
    boxes:
    {
        borderRadius: 8,
        padding: 20,
        backgroundColor: 'white',
        elevation: 4,
        opacity: 0.7
    },
    containerStyle: { backgroundColor: 'white', padding: 20 }
})