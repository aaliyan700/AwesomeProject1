import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableRipple } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatGrid } from 'react-native-super-grid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Dashboard = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [userInfo, setUserInfo] = useState({});
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
                console.log('Data retrieved from AsyncStorage:', JSON.parse(data));
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
    }, [])
    const check = async () => {
        const user_name = await AsyncStorage.getItem('username');
        setUsername(user_name);
        console.log(username);
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
            icon: require("../images/attendance.png")
        },
        {
            title: "Assessment",
            navigateScreen: "Assessment",
            icon: require("../images/datesheet.png")
        },
    ]
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate(item.navigateScreen);
        };
        return (
            <TouchableOpacity style={styles.boxes}
                onPress={() => handler()}>
                <View style={{ elevation: 1, marginHorizontal: 2, backgroundColor: 'white', padding: 34, borderRadius: 16 }}>

                    <Image source={item.icon} style={{ alignSelf: 'center', height: 60, width: 60, resizeMode: 'contain' }} />

                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'black', paddingVertical: 10 }}>{item.title}</Text>
                </View>

            </TouchableOpacity>

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
                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Text style={styles.headerFont}>Dashboard</Text>
                            <Text style={styles.header2Font}>Welcome {userInfo.first_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                            {/* <TouchableOpacity
                                onPress={() => navigation.navigate('Notification')}>
                                <Image source={require('../images/notification.png')} style={{ marginRight: 10, alignSelf: 'center', height: 30, width: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity> */}
                            <Icon name="notifications" size={30} color='#fff' />
                            <TouchableOpacity>

                                {
                                    userInfo.profile_photo ? (<Image source={{ uri: imageUri }} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 100 }}></Image>) :
                                        (<Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain' }} />)
                                }

                                {/* <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain' }} /> */}


                            </TouchableOpacity>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={<Appbar.Action icon={appbarIcon} onPress={openMenu} />}>
                                <Menu.Item title="View Profile" />
                                <Menu.Item title="Logout" onPress={() => logout()} />
                                <Divider />
                            </Menu>
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
        fontSize: 20,
        fontWeight: 'bold',

        color: 'white'
    },
    header2Font:
    {
        fontSize: 18,

        color: 'white'
    },

})