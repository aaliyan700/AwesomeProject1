import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { Appbar, Menu, Divider, Provider, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IP from '../ip';
const CourseAdvisorInformation = ({ route, navigation }) => {
    const { item } = route.params;
    if (item === null) {
        // Handle the null data case
        return (
            <View>
                <Text>Error: Null data received</Text>
                {/* You can display an error message or take appropriate action */}
            </View>
        );
    }
    const { studentList } = route.params;
    console.log("studentList", studentList);
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };
    const [visible1, setVisible1] = React.useState(false);
    const openMenu = () => setVisible1(true);
    const closeMenu = () => setVisible1(false);
    console.log("item", item)
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const handleInputChange = (text) => setInputValue(text);

    const handleConfirm = () => {
        // Handle the entered value
        console.log('Entered value:', inputValue);
        hideDialog();
    };
    const appbarIcon = ({ size }) => {
        return <Icon name="menu" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }
    const backbarIcon = ({ size }) => {
        return <Icon name="arrow-left" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }
    const AddAdvise = async () => {
        const cd = {
            advise: inputValue,
            reg_no: item.reg_no,
            course_advisor_id: studentList[0].id

        }
        console.log(cd);
        try {
            if (inputValue) {
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Teacher/AddCourseAdvisorDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        advise: inputValue,
                        reg_no: item.reg_no,
                        course_advisor_id: studentList[0].id
                    }),
                }
                );
                // const data = await response.json();
                // console.log("first", data);
                alert("done");
            } else {
                alert("please advise ");
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Provider>

            <Appbar.Header style={{ backgroundColor: '#099e78' }}>
                <Appbar.Action icon={backbarIcon} onPress={() => navigation.navigate("TeacherDashboard")} />
                <Appbar.Content title="Advise" />
                <Menu
                    visible={visible1}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon={appbarIcon} onPress={openMenu} />}>
                    <Menu.Item title="AdviseStudent" onPress={showDialog} />

                    <Divider />
                </Menu>
            </Appbar.Header>
            <View style={styles.container}>

                <ScrollView style={styles.container}>
                    <Text style={styles.mainfont}>Regular Courses:</Text>
                    {item?.regular_courses.map((course, index) => (
                        <View style={styles.card} key={index}>
                            <Text> {course.course_name}</Text>
                            <Text> {course.course_code}</Text>
                        </View>
                    ))}
                    <Text style={styles.mainfont}>Failed Courses:</Text>
                    {item?.failed_courses.length > 0 ? (
                        item.failed_courses.map((course, index) => (
                            <View style={styles.card} key={index}>
                                <Text>{course.course_name}</Text>
                                <Text>{course.course_code}</Text>
                            </View>
                        ))
                    ) : (
                        <View style={styles.card}>
                            <Text style={{ textAlign: 'center' }}>No failed courses</Text>
                        </View>
                    )}

                    <Text style={styles.mainfont}>Remaning Courses:</Text>
                    {item?.remaining_courses.map((course, index) => (
                        <View style={styles.card} key={index}>
                            <Text> {course.course_name}</Text>
                            <Text> {course.course_code}</Text>
                        </View>
                    ))}
                </ScrollView>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Enter Advise</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter  Advise"
                            value={inputValue}
                            onChangeText={handleInputChange}
                            mode='outlined'
                            style={{ height: 200 }}
                            multiline
                        />
                        <Button mode="contained" style={styles.btn} onPress={AddAdvise}>Submit</Button>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} title="Cancel" />
                        <Button onPress={handleConfirm} title="Confirm" />
                    </Dialog.Actions>
                </Dialog>
            </View>
        </Provider>
    )
}

export default CourseAdvisorInformation

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    mainfont:
    {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    card: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 10,
        marginVertical: 2,
        elevation: 9
    },
    btn:
    {
        marginHorizontal: 30,
        backgroundColor: "#099e78",
        marginVertical: 10
    }
})



