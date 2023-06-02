import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import IP from '../ip';
const ParentDashboard = ({ route, navigation }) => {
    const [userData, setUserData] = useState([]);
    const GetUser = async () => {
        let role = 'parent';
        console.log("role", role);
        try {
            const user_name = await AsyncStorage.getItem('username');
            console.log("username", user_name);
            const query = `http://${IP}/StudentPortal/api/Login/GetUser?username=${user_name}&role=${role}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setUserData(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetUser();
    }, [])
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Name:{userData.name}</Text> */}
            {
                userData.parent?.map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={styles.text}>{item.reg_no}</Text>
                            <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ViewAttendenceCourses", { item })}>Attendance</Button>
                            <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ViewFinance", { item })}>Finance</Button>
                            <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ViewStudentPerformance", { item })}>Results</Button>
                        </View>
                    )
                })
            }
        </View>
    )
}
export default ParentDashboard

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
    },
    btn:
    {
        backgroundColor: '#099e78',
        marginHorizontal: 20,
        marginVertical: 10
    },
    card:
    {
        backgroundColor: 'white',
        padding: 40,
        marginVertical: 6,
        marginHorizontal: 30,
        elevation: 9,
        borderRadius: 10,
    },
    text:
    {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    }
})