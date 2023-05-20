import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Timetable = ({ navigation }) => {
    const [todayTimetable, setTodayTimetable] = useState([]);
    const [weeklyTimetable, setWeeklyTimetable] = useState({});
    console.log(weeklyTimetable, 'weekkly')
    const [day, setDay] = useState([]);
    const [timetable, setTimeTable] = useState([{ day: "", detail: [{}] }])
    const [today, setToday] = useState('');
    const [loading, setLoading] = useState(true);
    const timetableHandler = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetTimeTable?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setWeeklyTimetable(data);
            setLoading(false);
            let day = [];
            data?.map((time) => {
                return day.push(time.day);
            });
            let uniqueChars = [...new Set(day)];
            setDay(uniqueChars);
            let date = new Date();
            let d = date.toLocaleString('en-us', { weekday: 'long' }).split(',')[0];
            console.log(d)
            setToday(d);
            data.map(ele => {
                if (ele.day == d) {
                    console.log('TODAY IF')
                    setTodayTimetable(ele);
                }
            })
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        timetableHandler();
    }, [])
    useEffect(() => {
        todayTimetable;
    }, [todayTimetable]);
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#099e78" />
            </View>
        )
    }

    const showItems = ({ item }) => {
        return (

            <View style={styles.box}>

                <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{item.course_code}</Text>
                </View>
                <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                    <Text style={{ fontSize: 13, color: 'black' }}>{item.time}</Text>
                </View>
                <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
                    <Text style={{ fontSize: 13, color: 'black' }}>{item.venue}</Text>
                </View>

            </View>

        )

    }
    return (
        <>
            <ScrollView style={{ backgroundColor: 'white' }}>
                {day.map((items, index) => {
                    return (
                        <View key={index} style={styles.container}>
                            <Text style={{ fontSize: 18, color: 'black', marginBottom: 10, marginTop: 20, marginHorizontal: 20 }}>{items}</Text>
                            <View style={{ elevation: 4, marginHorizontal: 9, borderRadius: 10, backgroundColor: '#099e78', opacity: 0.7 }}>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10 }}>
                                    <View style={{ flex: 8, marginLeft: 5, marginRight: 5, }}>
                                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '700' }}>Course</Text>
                                    </View>
                                    <View style={{ flex: 5, marginLeft: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '700' }}>Time</Text>
                                    </View>
                                    <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '700' }}>Venue</Text>
                                    </View>
                                </View>

                            </View>

                            <View>
                                {Object.keys(weeklyTimetable).map((key, index) => {
                                    return weeklyTimetable[key].detail.map((item) => {
                                        if (items === weeklyTimetable[key].day) {
                                            return (<>
                                                <View key={index} style={{ backgroundColor: 'white', borderRadius: 2, elevation: 2, marginHorizontal: "3%", marginTop: 2 }}>
                                                    <View style={styles.box} key="index">
                                                        <View style={{ flex: 9, marginLeft: 10 }}>
                                                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{item.course}</Text>
                                                        </View>
                                                        <View style={{ flex: 7, marginLeft: 5, marginRight: 5 }}>
                                                            <Text style={{ fontSize: 13, color: 'black' }}>{item.time}</Text>
                                                        </View>
                                                        <View style={{ flex: 2, marginLeft: 5, marginRight: 5 }}>
                                                            <Text style={{ fontSize: 13, color: 'black' }}>{item.venue}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            </>);
                                        } else {

                                        }
                                    });
                                })}
                            </View>
                        </View >
                    )
                })}
            </ScrollView>
        </>

    )
}

export default Timetable

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 16,
    },
    headerFont:
    {
        textAlign: 'center'
    },
    box:
    {

        margin: 5,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 3,
        borderRadius: 15,
        padding: 15

    }
})