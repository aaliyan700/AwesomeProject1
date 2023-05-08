import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'
import { Appbar, Menu, Divider } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IP from '../ip';
const DashboardAdmin = ({ navigation }) => {
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
                    <Menu.Item title="Assessment Settings" onPress={() => navigation.navigate("AssessmentSetting")} />
                    <Menu.Item title="Logout" />
                    <Divider />
                </Menu>
            </Appbar.Header>
            <View style={{ flex: 1 }}>
                <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("CourseAllocation")}>Course Allocations</Button>
                <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("AddDateSheet")}>DateSheet Management</Button>
                <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("AddTimetable")}>Timetable management</Button>
                <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={showModal}>Feedbacks</Button>
                <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("HandleFinance")}>Finance</Button>
                {/* <Provider> */}
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
                                <Picker.Item label="Fall2022" value="Fall2022" />
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