import { StyleSheet, Text, View, Pressable, ActivityIndicator, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';

const Notification = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetNotification = async () => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Notification/GetNotifications?username=${reg_no}`;
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
        }, 4000);

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
            <ScrollView>
                {loading ? (
                    <ActivityIndicator size="large" color="#099e78" />
                ) : (
                    list?.map((item, index) => (
                        <Pressable key={index} style={styles.card} onPress={() => handleNavigation(item.type)}>
                            <Text style={{ fontWeight: '700' }}>{item.detail}</Text>
                            <Text style={{ fontWeight: '500' }}>{item.dateTime}</Text>
                        </Pressable>
                    ))
                )}
            </ScrollView>
        </View>
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
});


