import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Provider, Menu, Divider } from 'react-native-paper';
const ViewContests = ({ navigation }) => {
    const [contestList, setContestList] = useState([]);
    const getContestHandler = async () => {
        const username = await AsyncStorage.getItem('username');
        const response = await fetch(
            `http://${IP}/StudentPortal/api/Teacher/GetContests?username=${username}`, {
            method: 'GET',
        }
        );
        const data = await response.json();
        console.log("clg", data);
        console.log("--------", data);
        setContestList(data);
        console.log(contestList, "data");
    };
    const AcceptContest = async (aid) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Teacher/AcceptContest?aid=${aid}`, {
                method: 'POST',
            }
            );
            alert("Accepted");
            ToastAndroid.show("Accepted", ToastAndroid.TOP);
        } catch (err) {
            alert(ex.message);
        }
    }
    const RejectContest = async (aid) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Teacher/RejectContest?aid=${aid}`, {
                method: 'POST',
            }
            );
            alert("Rejected");
            ToastAndroid.show("Accepted", ToastAndroid.TOP);
        } catch (err) {
            alert(ex.message);
        }
    }
    useEffect(() => {
        getContestHandler();
    }, [])
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        // <Provider>
        //     <View>
        //         <Appbar.Header style={{ backgroundColor: '#099e78' }}>
        //             <Appbar.BackAction onPress={() => navigation.navigate("TeacherDashboard")} />
        //             <Appbar.Content title="Contest Request" />
        //             <Menu
        //                 visible={visible}
        //                 onDismiss={closeMenu}
        //                 anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
        //                 <Menu.Item onPress={() => navigation.navigate('TeacherDashboard')} title="Contest Setting" />
        //                 <Menu.Item onPress={() => { }} title="View Setting" />
        //                 <Menu.Item onPress={() => { }} title="View Contest" />
        //                 <Divider />
        //                 <Menu.Item onPress={() => { }} title="Item 3" />
        //             </Menu>
        //         </Appbar.Header>

        <ScrollView>
            <View style={{}}>

                {
                    contestList?.map((ele, index) => {
                        return (
                            <View key={index} style={{ margin: 10, padding: 10, backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>
                                        {ele.name}
                                    </Text>
                                    <Text style={{}}>{ele.dateTime}</Text>
                                </View>
                                <Text>
                                    {ele.reg_no}
                                </Text>
                                <Text>
                                    {ele.course_name}
                                </Text>
                                <Text>
                                    BS{ele.program}{ele.semester}{ele.section}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button color="white" onPress={() => AcceptContest(ele.attendance_id)}
                                        mode="outlined" style={{ backgroundColor: '#099e78', margin: 2 }}>Accept</Button>
                                    <Button color="white" onPress={() => RejectContest(ele.attendance_id)}
                                        style={{ backgroundColor: '#099e78', margin: 2 }}>Reject</Button>
                                </View>
                            </View>
                        )
                    })
                }
            </View >
        </ScrollView>
    )
}
export default ViewContests
const styles = StyleSheet.create({})