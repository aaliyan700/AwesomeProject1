import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatGrid } from 'react-native-super-grid';
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { amber100 } from 'react-native-paper/lib/typescript/styles/colors';
const ViewAttendenceCourses = ({ navigation, route }) => {
    const [coursesList, setCoursesList] = useState([]);
    const [studentAttendance, setStudentAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("data", studentAttendance);
    const { item } = route.params;
    const AttendenceHandler = async () => {
        console.log("fetching...")
        // const reg_no = await AsyncStorage.getItem('username')
        const reg_no = item.reg_no;
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetAttendance?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setStudentAttendance(data);
            setLoading(false);
            let temp = [];
            data.map((item) => {
                console.log(item.CourseName, item.courseCode);
                item.detail.map((item1) => {
                    console.log(item1.status, item1.date, item1.type);
                })

            })
            setCoursesList(temp);

        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        AttendenceHandler();
    }, [])
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#099e78" />
            </View>
        )
    }
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate('Attendence', { item, coursesList });
        };
        return (
            <Pressable style={styles.boxes}
                onPressIn={() => handler()}>
                <View>
                    {/* <Text style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>{item.courseName}</Text> */}
                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', fontFamily: 'fantasy' }}>{item.courseCode}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', fontFamily: 'fantasy' }}>{item.courseName}</Text>
                </View>
            </Pressable>
        )

    }
    return (
        <View style={styles.container}>
            <FlatGrid
                itemDimension={130}
                data={studentAttendance}
                renderItem={showItems}
            />
        </View>
    )
}

export default ViewAttendenceCourses

const styles = StyleSheet.create({
    container:
    {

        flex: 1,
        backgroundColor: 'white'
    },
    boxes:
    {
        borderRadius: 8,
        padding: 20,
        backgroundColor: 'white',
        elevation: 7,
    },
    box:
    {
        margin: 8,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 6,
        backgroundColor: 'white',
        opacity: 6,
        elevation: 0.4,
        borderRadius: 15,
        marginTop: "10%",
    }
})