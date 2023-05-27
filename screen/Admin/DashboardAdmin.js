import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'
import { Appbar, Menu, Divider } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IP from '../ip';
import { FlatGrid } from 'react-native-super-grid'
import AsyncStorage from '@react-native-async-storage/async-storage';
const DashboardAdmin = ({ navigation }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };
    const [visible, setVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Fall2022");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [visible1, setVisible1] = React.useState(false);
    const openMenu = () => setVisible1(true);
    const closeMenu = () => setVisible1(false);
    const appbarIcon = ({ size }) => {
        return <Icon name="menu" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }
    const backbarIcon = ({ size }) => {
        return <Icon name="arrow-left" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }
    const record = [
        {
            title: "Course Allocation",
            navigateScreen: "CourseAllocation",
            icon: require("../images/courseAllocation.png"),
            modal: "none"
        },
        {
            title: "Datesheet",
            navigateScreen: "AddDateSheet",
            icon: require("../images/datesheet.png"),
            modal: 'none',
        },
        {
            title: "Finance",
            navigateScreen: "HandleFinance",
            icon: require("../images/finance.png"),
            modal: 'none'
        },
        {
            title: "Timetable",
            navigateScreen: "AddTimetable",
            icon: require("../images/timetable.png"),
            modal: 'none'
        },
        {
            title: "Feedbacks",
            navigateScreen: "none",
            icon: require("../images/assessment.png"),
            modal: 'showModal()'
        },
        {
            title: "Noticeboard",
            navigateScreen: "AddNoticeboard",
            icon: require("../images/download.png"),
            modal: 'none'
        },
        {
            title: "Course Advisor",
            navigateScreen: "AddCourseAdvisor",
            icon: require("../images/advisor.png"),
            modal: 'none'
        },
        {
            title: "Peer Evaluation",
            navigateScreen: "AddPeerEvaluation",
            icon: require("../images/evaluationteacher.png"),
            modal: 'none'
        },
    ]
    const showItems = ({ item }) => {
        const handler = () => {
            if (item.modal !== 'none') {
                // if the item has a modal, call the showModal function
                showModal();
            } else if (item.navigateScreen !== 'none') {
                // if the item has a navigate screen, navigate to it
                navigation.navigate(item.navigateScreen);
            }
        }
        return (
            <Pressable style={styles.boxes}
                onPressIn={() => handler()}>
                <View style={{ elevation: 1, marginHorizontal: 2, backgroundColor: 'white', padding: 34, borderRadius: 16 }}>

                    <Image source={item.icon} style={{ alignSelf: 'center', height: 60, width: 60, resizeMode: 'contain' }} />

                    <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', paddingVertical: 10 }}>{item.title}</Text>
                </View>

            </Pressable>

        )
    }
    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: '#099e78' }}>
                {/* <Appbar.BackAction onPress={() => navigation.navigate('LoginScreen')} /> */}
                <Appbar.Action icon={backbarIcon} onPress={() => navigation.navigate('LoginScreen')} />
                <Appbar.Content title="Dashboard" />
                <Menu
                    visible={visible1}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon={appbarIcon} onPress={openMenu} />}
                >
                    <Menu.Item title="Assessment Settings" onPress={toggleOpen} />
                    <Menu.Item title="Logout" onPress={() => navigation.navigate("LoginScreen")} />
                    <Divider />
                </Menu>
            </Appbar.Header>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3, backgroundColor: '#099e78' }}>
                    <View style={{ flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#f2f0f5' }}>
                        <FlatGrid
                            itemDimension={130}
                            data={record}
                            renderItem={showItems}>
                        </FlatGrid>
                    </View>
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal}>
                        <View style={{ backgroundColor: 'white', padding: "20%", marginHorizontal: 20, borderRadius: 20 }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, marginBottom: 20 }}>Select Session</Text>
                            <Picker
                                mode='modal'
                                selectedValue={selectedValue}
                                style={{ color: 'black', backgroundColor: 'white' }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select Session" value="Select Session" />
                                <Picker.Item label="Fall2020" value="Fall2020" />
                                <Picker.Item label="Spring2022" value="Spring2022" />
                                <Picker.Item label="Fall2023" value="Fall2023" />
                                <Picker.Item label="Spring2023" value="Spring2023" />
                            </Picker>
                            <Button style={{ marginTop: 20 }} color="#099e78" mode="contained" onPress={() => navigation.navigate("CheckFeedback", { selectedValue })}>Next</Button>
                            <FAB
                                label='Setting'
                                style={styles.fab}
                                onPress={() => navigation.navigate("AssessmentSetting")}
                            />

                        </View>
                    </Modal>
                </Portal>
                {/* </Provider> */}
            </View>
        </Provider>
    )
}

export default DashboardAdmin

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,

    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})