// import { StyleSheet, Text, View, Pressable, ActivityIndicator, Button, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import IP from '../ip';

// const Notification = ({ navigation }) => {
//     const [list, setList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const GetNotification = async (select) => {
//         console.log('fetching...');
//         const reg_no = await AsyncStorage.getItem('username');
//         console.log(reg_no);
//         try {
//             console.log(select, 'inapi');
//             const query = `http://${IP}/StudentPortal/api/Notification/GetNotificatons?username=${reg_no}&&session=${select}`;
//             console.log(query);
//             const response = await fetch(query, {
//                 method: 'GET',
//             });
//             console.log('Done');
//             const data = await response.json();
//             setList(data);
//             setLoading(false);
//             console.log(list);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             GetNotification();
//         }, 4000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, []);
//     const handleNavigation = (item) => {
//         if (item === 'datesheet') {
//             navigation.navigate('Datesheet');
//         } else if (item === 'timetable') {
//             navigation.navigate('Timetable');
//         } else if (item === "notice_board") {
//             navigation.navigate('ViewNoticeboard');
//         }
//         else if (item === "teacher_evaluation") {
//             navigation.navigate('Assessment');
//         }
//         else if (item === "fee") {
//             navigation.navigate('FeeDetails');
//         }
//         else if (item == "fine") {
//             navigation.navigate('FineDetail');
//         }
//         else {
//             // Handle other types or default case
//             // navigation.navigate('OtherScreen');
//         }
//     };
//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 {loading ? (
//                     <ActivityIndicator size="large" color="#099e78" />
//                 ) : (
//                     list.map((item, index) => (
//                         <Pressable key={index} style={styles.card} onPress={() => handleNavigation(item.type)}>
//                             <Text style={{ fontWeight: '700' }}>{item.detail}</Text>
//                             <Text style={{ fontWeight: '500' }}>{item.dateTime}</Text>
//                         </Pressable>
//                     ))
//                 )}
//             </ScrollView>
//         </View>
//     );
// };

// export default Notification;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     card: {
//         marginHorizontal: 10,
//         marginVertical: 10,
//         padding: 10,
//         backgroundColor: 'white',
//         elevation: 9,
//         borderRadius: 10
//     },
// });

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
    useEffect(() => {
        // Register the device for push notifications (simulated)
        registerForPushNotifications();

        // Listen for incoming push notifications (simulated)
        const pushNotificationListener = setupPushNotificationListener();

        return () => {
            // Clean up the push notification listener
            pushNotificationListener.remove();
        };
    }, []);

    const registerForPushNotifications = () => {
        // Simulate registering for push notifications
        console.log('Registered for push notifications');
    };

    const setupPushNotificationListener = () => {
        // Simulate listening for incoming push notifications
        const listener = {
            // Simulated event listener for push notifications
            onPushNotificationReceived: (notification) => {
                console.log('Push notification received:', notification);
                // Handle the received push notification here
            },
        };

        console.log('Push notification listener set up');

        return listener;
    };

    const sendDummyPushNotification = () => {
        // Simulate sending a dummy push notification
        console.log('Sending dummy push notification');
        const dummyNotification = {
            title: 'Dummy Notification',
            message: 'This is a dummy push notification',
            data: {
                key1: 'value1',
                key2: 'value2',
            },
        };
        // Handle the dummy push notification here
        handlePushNotification(dummyNotification);
    };

    const handlePushNotification = (notification) => {
        // Handle the received push notification here
        console.log('Handling push notification:', notification);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={sendDummyPushNotification}>
                <Text style={styles.buttonText}>Send Dummy Push Notification</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
    },
});

export default App;

