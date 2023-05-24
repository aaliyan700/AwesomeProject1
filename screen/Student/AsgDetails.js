import { StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatGrid } from 'react-native-super-grid';
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AsgDetails = ({ navigation }) => {
    const [coursesList, setCoursesList] = useState([]);
    const [studentAttendance, setStudentAttendance] = useState([]);
    console.log("data", studentAttendance);
    const AttendenceHandler = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetAssignmentQuizMarks?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setStudentAttendance(data);
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
        }
    };
    const AsgHandler = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetMidFinalMarks?reg_no=${reg_no}&&session=FALL2022`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            console.log("yeh hai mera data");
            console.log("data hai yeh", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        AttendenceHandler();
    }, [])
    useEffect(() => {
        AsgHandler();
    }, [])
    // useEffect(() => {
    //     console.log("first", coursesList);
    // }, [coursesList])
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate('AsgQuizzMarks', { item, coursesList });
            // navigation.navigate('Attendence', { arrayOfObject: item });
        };
        return (
            <Pressable style={styles.boxes}
                onPressIn={() => handler()}>
                <View>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, color: 'black', fontFamily: 'fantasy' }}>{item.courseCode}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', color: 'black', fontFamily: 'fantasy' }}>{item.courseName}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.container}>
            <FlatGrid
                itemDimension={150}
                data={studentAttendance}
                renderItem={showItems}
            />
        </View>
    )
}

export default AsgDetails

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