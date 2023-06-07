import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect, FlatList } from 'react'
import IP from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage'
const ViewNoticeboard = () => {
    const [noticeboard, setNoticeBoard] = useState([]);
    useEffect(() => {
        GetNoticeboardInformation();
    }, [])
    const GetNoticeboardInformation = async () => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetNoticeboardInformation?reg_no=${reg_no}`;
            console.log(query);
            const response = await fetch(query, {
                method: 'GET',
            });
            console.log('Done');
            const data = await response.json();
            setNoticeBoard(data);
            console.log('data', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    noticeboard?.map((item, index) => {
                        return (
                            <View key={index} style={styles.card}>
                                <Text style={styles.font}>Title:{item.title}</Text>
                                <Text style={styles.font}>Description:{item.description}</Text>
                                <Text style={styles.font}>By {item.author} On {item.date}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default ViewNoticeboard

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    card:
    {
        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 15,
        elevation: 9
    },
    font:
    {
        fontSize: 16,
        margin: 5,
        color: 'black'
    }
})

