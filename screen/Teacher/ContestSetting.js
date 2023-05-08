import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IP from '../ip';
import { Button } from 'react-native-paper';
const ContestSetting = ({ navigation }) => {
    const [days, setDays] = useState(0);
    const [teacherId, setTeacherId] = useState(0);
    const [lim, setLim] = useState(0);
    let limit = 0;
    useEffect(() => {
        check();
    }, [])
    const check = async () => {
        const user_name = await AsyncStorage.getItem('username');
        setTeacherId(user_name);
        console.log(user_name);
    }
    const GetContestSetting = async () => {
        try {
            const query1 = `http://${IP}/StudentPortal/api/Teacher/GetContestSetting?teacherId=${teacherId}`;
            const response = await fetch(
                query1, {
                method: 'GET',
            }
            );
            const data = await response.json();
            limit = data;
            setLim(limit);
            console.log(limit);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetContestSetting();
    }, [])
    useEffect(() => {
        console.log("my limit", limit)
    }, [limit])
    const SetContestSetting = async () => {
        try {
            if (teacherId && days) {
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Teacher/SetContestSetting?teacherId=${teacherId}&days=
                    ${days}`, {
                    method: 'POST',
                }
                );
                // const data = await response.json();
                // console.log(data);
                ToastAndroid.show("Setting Done !!!", ToastAndroid.BOTTOM);
                navigation.navigate("TeacherCourses")
            }
            else {
                alert("Please fill fields")
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', margin: 10, padding: 30, borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 18 }}>Contest Setting</Text>
                <View style={{ marginHorizontal: 20, padding: 2, marginTop: 10 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setDays(val)}
                        value={days}
                        placeholder="Enter Days"
                    />
                </View>
                <View style={{ marginHorizontal: 20, padding: 10 }}>
                    <Button mode="contained"
                        onPress={() => SetContestSetting()} style={{ backgroundColor: '#099e78' }}>Save</Button>
                </View>
            </View>
        </View >
    )
}

export default ContestSetting

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#099e78'
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    },
});