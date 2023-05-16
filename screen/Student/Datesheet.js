import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Datesheet = () => {
    const [datesheetlist, setDatesheetlist] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const dateSheetHandler = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetDateSheet?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            let temp = [];
            data.dateSheet.map((i) => {
                temp.push({ date: i.date, time: i.time, day: i.day, courseName: i.courseName, date: i.date });
            })
            console.log("temp", temp);
            setDatesheetlist(temp);
            setLoading(false);
            console.log("first", datesheetlist);

        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        dateSheetHandler()
    }, [])
    const showItems = ({ item }) => {
        return (
            <View style={styles.dateSheet}>
                <Text style={{ fontSize: 18, color: 'black', textAlign: 'left' }}>{item.courseName}</Text>
                <Text style={{ fontSize: 15, color: 'black' }}>{item.day}</Text>
                <Text style={{ fontSize: 15, color: 'black' }}>{item.time}</Text>
                {
                    item.time === "9:30 AM - 12:30 PM" ? (

                        <View>
                            <Text style={{ fontSize: 15, color: 'black' }}>Morning</Text>
                        </View>

                    ) : (

                        <View>
                            <Text style={{ fontSize: 15, color: 'black' }}>Evening</Text>
                        </View>

                    )


                }
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
            <Text style={{ textAlign: 'center', fontSize: 20, margin: 10, color: 'black' }}>Mid-Term Datesheet</Text>
            <FlatList
                data={datesheetlist}
                keyExtractor={(item, index) => index}
                renderItem={showItems}
            />
        </View>

    )
}
export default Datesheet

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 16,
        marginTop: 5
    },
    headerFont:
    {
        textAlign: 'center'
    },
    box:
    {
        margin: 8,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 6,
    },
    containerFont:
    {
        fontSize: 13,
        color: 'black',
        fontWeight: 700
    },
    dateSheet: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        elevation: 7,
        borderRadius: 10
    }
})