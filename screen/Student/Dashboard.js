import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableRipple, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatGrid } from 'react-native-super-grid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import notifee from '@notifee/react-native';
const Dashboard = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    // async function onDisplayNotification(newNotifications) {
    //     try {
    //         // Request permissions (required for iOS)
    //         await notifee.requestPermission();

    //         // Create a channel (required for Android)
    //         const channelId = await notifee.createChannel({
    //             id: 'default',
    //             name: 'Default Channel',
    //         });

    //         // Display a notification for each new item in the list
    //         for (const item of newNotifications) {
    //             await notifee.displayNotification({
    //                 title: item.type,
    //                 body: item.detail,
    //                 android: {
    //                     channelId,
    //                     pressAction: {
    //                         id: 'default',
    //                     },
    //                 },
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error displaying notification:', error);
    //     }
    // }
    async function onDisplayNotification(newNotifications) {
        try {
            // Request permissions (required for iOS)
            await notifee.requestPermission();

            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification for each new item in the list
            for (const item of newNotifications) {
                await notifee.displayNotification({
                    title: item.type,
                    body: item.detail,
                    android: {
                        channelId,
                        pressAction: {
                            id: 'default',
                        },
                        sound: 'alarm', // Add this line to specify the sound
                        largeIcon: require('../images/arid.png'), // Add this line to specify the large ico
                    },
                });
            }
        } catch (error) {
            console.error('Error displaying notification:', error);
        }
    }
    const GetNotification = async (previousData) => {
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
            console.log('data', data);
            setLoading(false);
            // Check for new notifications
            const newNotifications = data.filter(item => !previousData.some(prevItem => prevItem.id === item.id) && item.status === false);
            if (newNotifications.length > 0) {
                // Call the notification function when there are new notifications
                onDisplayNotification(newNotifications);
            }
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        let previousData = [];

        GetNotification(previousData)
            .then(data => {
                previousData = data;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        const interval = setInterval(() => {
            GetNotification(previousData)
                .then(data => {
                    previousData = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    const [username, setUsername] = useState('');
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [userInfo, setUserInfo] = useState({});
    const [userData, setUserData] = useState({});
    const logout = async () => {
        await AsyncStorage.removeItem('username');
        console.log(username);
        navigation.navigate("LoginScreen");
    };
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };
    const fetchDataFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('data'); // Retrieve data from AsyncStorage using the key
            if (data) {
                //console.log('Data retrieved from AsyncStorage:', JSON.parse(data));
                setUserInfo(JSON.parse(data));
                // Do something with the retrieved data
            } else {
                console.log('No data found in AsyncStorage');
                // Handle case when no data is found in AsyncStorage
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    useEffect(() => {
        fetchDataFromStorage();
    }, [])

    const handleNavigation = (screenName) => {
        setIsDrawerOpen(false);
        navigation.navigate(screenName);
    };
    useEffect(() => {
        check();
        GetUser();
    }, [])
    const check = async () => {
        const user_name = await AsyncStorage.getItem('username');
        setUsername(user_name);
        console.log(username);
    }
    const GetUser = async (username) => {
        const user_name = await AsyncStorage.getItem('username');
        console.log("username", user_name);
        let role = 'student';
        console.log("role", role);
        try {
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
    const record = [
        {
            title: "Attendence",
            navigateScreen: "AttendenceCourses",
            icon: require("../images/attendance.png")
        },
        {
            title: "Time Table",
            navigateScreen: "Timetable",
            icon: require("../images/timetable.png")
        },
        {
            title: "Finance",
            navigateScreen: "Finance",
            icon: require("../images/finance.png")
        },
        {
            title: "Date Sheet",
            navigateScreen: "Datesheet",
            icon: require("../images/datesheet.png")
        },
        {
            title: "Results",
            navigateScreen: "StudentPerformance",
            icon: require("../images/assessment.png")
        },
        {
            title: "Evaluation",
            navigateScreen: "Assessment",
            icon: require("../images/evaluation.png")
        },
    ]
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate(item.navigateScreen);
        };
        return (
            <Pressable style={styles.boxes}
                onPressIn={() => handler()}>
                <View style={{ elevation: 1, marginHorizontal: 2, backgroundColor: 'white', padding: 34, borderRadius: 16 }}>

                    <Image source={item.icon} style={{ alignSelf: 'center', height: 50, width: 50, resizeMode: 'contain' }} />

                    <Text style={{ textAlign: 'center', fontSize: 13, color: 'black', paddingVertical: 10 }}>{item.title}</Text>
                </View>

            </Pressable>

        )
    }
    let imageUri = `http://${IP}/StudentPortal/ProfileImages/${userInfo.profile_photo}`;
    console.log(imageUri)
    const appbarIcon = ({ size }) => {
        return <Icon name="menu" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }

    return (
        <>
            <Provider>
                <View style={styles.conatiner}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'column' }}>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={<Appbar.Action icon={appbarIcon} onPress={openMenu} />}>
                                <Menu.Item title="View Profile" />
                                <Menu.Item title="CourseAdvisor" onPress={() => navigation.navigate("ViewAdvise")} />
                                <Menu.Item title="Noticeboard" onPress={() => navigation.navigate("ViewNoticeboard")} />
                                <Menu.Item title="Ranking" onPress={() => navigation.navigate("TeacherRanking")} />
                                <Menu.Item title="Logout" onPress={() => logout()} />
                                <Divider />
                            </Menu>
                            <Text style={styles.headerFont}>Dashboard</Text>
                            <Text style={styles.header2Font}>Welcome ,{userData.first_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                            <Icon name="notifications" size={30} color='#fff' onPress={() => navigation.navigate("Notification", { userData })} />
                            <TouchableOpacity>

                                {
                                    userData.profile_photo ? (<Image source={{ uri: imageUri }} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 20 }}></Image>) :
                                        (<Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain' }} />)
                                }

                                {/* <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain' }} /> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 3, backgroundColor: '#099e78' }}>
                        <View style={{ flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#f2f0f5' }}>
                            <FlatGrid
                                itemDimension={130}
                                data={record}
                                renderItem={showItems}>
                            </FlatGrid>
                        </View>
                    </View>
                </View >
            </Provider>
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    conatiner:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    header:
    {
        flexWrap: 'wrap',
        flex: 0.9,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#099e78',
        justifyContent: 'space-between',
        padding: 12,
    },
    headerFont:
    {
        fontSize: 22,
        fontFamily: 'fantasy',
        color: 'white',
        marginTop: 5,
        fontWeight: '700',
        marginTop: 10
    },
    header2Font:
    {
        fontSize: 18,
        fontFamily: 'fantasy',
        color: 'white'
    },

})