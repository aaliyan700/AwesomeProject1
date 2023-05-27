import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
const TeacherDashboard = ({ navigation }) => {
    const record = [
        {
            title: "Courses",
            navigateScreen: "TeacherCourses",
            icon: require("../images/attendance.png")
        },
        {
            title: "Grading",
            navigateScreen: "EvaluationTeacher",
            icon: require("../images/grading.png")
        },
        {
            title: "Course Advisor",
            navigateScreen: "CourseAdvisor",
            icon: require("../images/advisor.png")
        },
        {
            title: "Peer Evaluation",
            navigateScreen: "ViewEvaluationTeacher",
            icon: require("../images/advisor.png")
        },
    ]
    const [userData, setUserData] = useState({});
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    const appbarIcon = ({ size }) => {
        return <Icon name="menu" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }

    const GetUser = async (username) => {
        const user_name = await AsyncStorage.getItem('username');
        console.log("username", user_name);
        let role = 'teacher';
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
    useEffect(() => {
        GetUser();
    }, [])
    const logout = async () => {
        const user_name = await AsyncStorage.getItem('username');
        console.log(user_name);
        await AsyncStorage.removeItem('user_name');
        navigation.navigate("LoginScreen");
        //navigation.navigate("LoginScreen");
    };
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate(item.navigateScreen);
        };

        return (
            <View>
                <Pressable style={styles.boxes}
                    onPressIn={() => handler()}>
                    <View style={{ elevation: 1, marginHorizontal: 2, backgroundColor: 'white', padding: 34, borderRadius: 16 }}>

                        <Image source={item.icon} style={{ alignSelf: 'center', height: 50, width: 50, resizeMode: 'contain' }} />

                        <Text style={{ textAlign: 'center', fontSize: 13, color: 'black', paddingVertical: 10 }}>{item.title}</Text>
                    </View>

                </Pressable>
            </View>
        )
    }
    return (<>
        <Provider>
            <View style={styles.conatiner}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'column' }}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Appbar.Action icon={appbarIcon} onPress={openMenu} />}>
                            <Menu.Item title="View Profile" />
                            <Menu.Item title="Logout" onPress={logout} />
                            <Divider />
                        </Menu>
                        <Text style={styles.headerFont}>Dashboard</Text>
                        <Text style={styles.header2Font}>Welcome ,{userData.first_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                        <Icon name="notifications" size={30} color='#fff' />
                        {/* <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}>
                        <Image source={require('../images/notification.png')} style={{ marginRight: 10, alignSelf: 'center', height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity> */}
                        <TouchableOpacity>
                            <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: '#099e78' }}>
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
export default TeacherDashboard;
const styles = StyleSheet.create({
    conatiner:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    header:
    {
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#099e78',
        justifyContent: 'space-between',
        padding: 16,

    },
    headerFont:
    {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'fantasy'
    },
    header2Font:
    {
        fontFamily: 'fantasy',
        fontSize: 16,
        color: 'white'
    },
})
