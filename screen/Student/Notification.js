import { StyleSheet, Text, View, Pressable, ActivityIndicator, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import moment from 'moment';
const Notification = ({ navigation, route }) => {
    const { userData } = route.params;
    console.log(userData);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const GetNotification = async () => {
        console.log('fetching...');
        // const reg_no = await AsyncStorage.getItem('username');
        // console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Notification/GetNotifications?username=${userData.username}`;
            console.log(query);
            const response = await fetch(query, {
                method: 'GET',
            });
            console.log('Done');
            const data = await response.json();
            console.log("data", data)
            setList(data)
            setLoading(false);
            console.log(list);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            GetNotification();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    const handleNavigation = (item) => {
        if (item === 'datesheet') {
            navigation.navigate('Datesheet');
        } else if (item === 'timetable') {
            navigation.navigate('Timetable');
        } else if (item === "notice_board") {
            navigation.navigate('ViewNoticeboard');
        }
        else if (item === "teacher_evaluation") {
            navigation.navigate('Assessment');
        }
        else if (item === "fee") {
            navigation.navigate('FeeDetails');
        }
        else if (item == "fine") {
            navigation.navigate('FineDetail');
        }
        else {
            // Handle other types or default case
            // navigation.navigate('OtherScreen');
        }
    };
    return (
        <View style={styles.container}>
            {/* <ScrollView>
                {loading ? (
                    <ActivityIndicator size="large" color="#099e78" />
                ) : (
                    list?.map((item, index) => (
                        
                        item.status == false ? (
                            <Pressable key={index} style={styles.card1} onPress={() => handleNavigation(item.type)}>
                                <Text style={{ fontWeight: '700' }}>{item.detail}</Text>
                                <Text style={{ fontWeight: '500' }}>{item.dateTime}</Text>
                            </Pressable>) : (
                            <Pressable key={index} style={styles.card} onPress={() => handleNavigation(item.type)}>
                                <Text style={{ fontWeight: '700' }}>{item.detail}</Text>
                                <Text style={{ fontWeight: '500' }}>{item.dateTime}</Text>
                            </Pressable>
                        )

                    ))
                )}
            </ScrollView> */}
            <ScrollView>
                {loading ? (
                    <ActivityIndicator size="large" color="#099e78" />
                ) : (
                    list?.map((item, index) => {
                        const timeDifference = moment(item.dateTime, 'DD-MM-YYYY,HH:mm:ss').fromNow();

                        return (
                            item.status === false ? (
                                <Pressable
                                    key={index}
                                    style={styles.card1}
                                    onPress={() => handleNavigation(item.type)}
                                >
                                    <Text style={{ fontWeight: '700' }}>{item.detail}</Text>
                                    <Text style={{ fontWeight: '500', textAlign: 'right' }}>{timeDifference}</Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    key={index}
                                    style={styles.card}
                                    onPress={() => handleNavigation(item.type)}
                                >
                                    <Text style={{ fontWeight: '700' }}>{item.detail}</Text>
                                    <Text style={{ fontWeight: '500', textAlign: 'right' }}>{timeDifference}</Text>
                                </Pressable>
                            )
                        );
                    })
                )}
            </ScrollView>


        </View >
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 10
    },
    card1: {
        marginHorizontal: 10,
        marginVertical: 3,
        padding: 10,
        backgroundColor: "#ADD8E6",
        elevation: 3,
        borderRadius: 2
    },
});

