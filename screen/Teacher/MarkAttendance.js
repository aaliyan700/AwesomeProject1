import { Image, ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'
import { RadioButton } from 'react-native-paper';
import IP from '../ip';
import ImagePicker from '../components/ImagePicker';
import { Appbar, Provider, Menu, Divider } from 'react-native-paper';
import { clearTextOnFocus } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MarkAttendance = ({ navigation, route }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedValue, setSelectedValue] = useState("java");
    const { item, courses } = route.params;
    const [courseCode, setCourseCode] = useState(item.course_code);
    const [courseName, setCourseName] = useState(item.course_name);
    const [studentList, setStudentList] = useState([]);
    const [section, SetSection] = useState();
    const [semester, SetSemester] = useState();
    const [pickerItems, setPickerItems] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('asfasd')
    const [teacherCourses] = route.params.courses;
    const [isSelected, setSelection] = useState(true);
    const [type, setType] = useState('class');
    const [alist, setAlist] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [limit, setLimit] = useState(0);
    const [courseAllocation, setCourseAllocation] = useState(item.course_allocation);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const handleClick = (id) => {
        setStudentList((prevState) =>
            prevState.map((row) =>
                row.id === id ? { ...row, status: row.status === "P" ? "A" : "P" } : row
            )
        );
    };
    function setCurrentDate() {
        const currentDate = new Date();
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = currentDate.toLocaleString('en-US', options);
        setDate(formattedDate);
    }
    useEffect(() => {
        setCurrentDate();
    }, [])
    useEffect(() => {
        let PickerItems = courses.filter((course) => {
            return course.course_code === item.course_code
        })
        setPickerItems(PickerItems)
    }, [item, courses])
    const getStudentListHandler = async (itemValue) => {
        try {
            let program = itemValue.split('-');
            let id = program[0];
            let section = program[1];
            const query1 = `http://${IP}/StudentPortal/api/Teacher/GetStudents?id=${id}&&section=${section}`;
            const response = await fetch(
                query1, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            console.log(">>>", data);
            setStudentList(data);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
    const handle = async () => {
        console.log("Saving...");
        let temp = [];
        studentList.map((i) => {
            temp.push({ enrollment_id: i.id, status: i.status, type: type });
        })
        setAlist(temp);
        console.log("saved");
        ToastAndroid.show("Attendance saved!!", ToastAndroid.TOP);
    }
    const send = async () => {
        const currentDate = new Date();
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = currentDate.toLocaleString('en-US', options);
        console.log("formatteddata", formattedDate);
        try {
            let data = new FormData();
            data.append('attendances', JSON.stringify(alist));
            data.append('allocationId', item.allocation_id);
            imageData.forEach((image, index) => {
                data.append(`image${index}`, {
                    uri: image.uri,
                    type: image.type,
                    name: `image${index}.${image.name.split('.').pop()}`,
                });
            });
            console.log("Form data", data);
            const requestOptions = {
                method: 'POST',
                body: data,
            };
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Teacher/MarkAttendance`,
                requestOptions,
            );
            console.log(response);
            ToastAndroid.show("Marked", ToastAndroid.BOTTOM);
            navigation.navigate("TeacherCourses");
        } catch (error) {
            console.log('ERROR REQUEST', error);
        }
    };

    // const send = async () => {
    //     const currentDate = new Date();
    //     const options = {
    //         day: 'numeric',
    //         month: 'long',
    //         year: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     };
    //     const formattedDate = currentDate.toLocaleString('en-US', options);
    //     console.log("formatteddata", formattedDate);
    //     try {
    //         let data = new FormData();
    //         data.append('attendances', JSON.stringify(alist));
    //         data.append('allocationId', item.allocation_id);
    //         // data.append('image', imageData);
    //         imageData.forEach((image, index) => {
    //             // data.append(`image${index}`, {
    //             //     uri: image.uri,
    //             //     type: image.type,
    //             //     name: `image${index}.${image.fileName.split('.').pop()}`,
    //             // });
    //             data.append("image", imageData);
    //         });
    //         // data.append('dateTime', formattedDate)
    //         const requestOptions = {
    //             method: 'POST',
    //             body: data,
    //         };
    //         const response = await fetch(
    //             `http://${IP}/StudentPortal/api/Teacher/MarkAttendance`,
    //             requestOptions,
    //         );
    //         console.log(response);
    //         ToastAndroid.show("Marked", ToastAndroid.BOTTOM);

    //     } catch (error) {
    //         console.log('ERROR REQUEST', error);
    //     }
    // }
    useEffect(() => {
        console.log("data", alist);
        GetContestSetting();
    }, [alist]);
    const GetContestSetting = async () => {
        try {
            const user_name = await AsyncStorage.getItem('username');
            console.log("username")
            const query1 = `http://${IP}/StudentPortal/api/Teacher/GetContestSetting?teacherId=${user_name}`;
            const response = await fetch(
                query1, {
                method: 'GET',
            }
            );
            const data = await response.json();
            console.log("data", data);
            console.log(data);
            setLimit(data);
        } catch (err) {
            console.log(err);
        }
    }
    const AlertLimt = () => {
        if (limit) {
            alert("Your Contest Limit " + limit + " Days");
        } else {
            alert("You have no contest setting yet!");
        }
    }
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const appbarIcon = ({ size }) => {
        return <Icon name="menu" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }
    const backbarIcon = ({ size }) => {
        return <Icon name="arrow-left" size={30} color='#fff' />; //just an example but doesn't matter waht you put here, real icon or anything it will rotate
    }
    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: '#099e78' }}>
                <Appbar.Action icon={backbarIcon} onPress={() => navigation.navigate("TeacherDashboard")} />
                <Appbar.Content title="Attendance" />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon={appbarIcon} onPress={openMenu} />}>
                    <Menu.Item onPress={() => navigation.navigate('ContestSetting')} title="Contest Setting" />
                    <Menu.Item onPress={() => AlertLimt()} title="View Setting" />
                    <Menu.Item onPress={() => navigation.navigate("ViewContests")} title="View Contest" />
                    <Divider />
                </Menu>
            </Appbar.Header>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 0, borderWidth: 2, borderColor: 'white', marginTop: 10, elevation: 2 }}>
                        <Picker
                            mode='modal'
                            selectedValue={selectedProgram}
                            onValueChange={(itemValue) => {
                                setSelectedProgram(itemValue)
                                getStudentListHandler(itemValue);
                            }

                            }>
                            {
                                pickerItems?.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={`BS${item.program} ${item.semester}${item.section} `} value={`${item.id}-${item.section}`} />
                                    )
                                })
                            }

                        </Picker>
                    </View>
                    <View style={{ backgroundColor: 'white', padding: 10, marginTop: 5, width: '90%', alignItems: 'center', elevation: 8, marginHorizontal: 20, borderRadius: 10 }}>

                        <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ margin: 10, color: 'black' }}>Class</Text>
                                    <RadioButton value='class' label="Class" />
                                    <Text style={{ margin: 10, color: 'black' }}>Lab</Text>
                                    <RadioButton value='lab' label="Class" />
                                </View>
                            </View>
                        </RadioButton.Group>

                        <Text style={{ color: 'black', fontSize: 18 }}>{courseName}</Text>
                        {/* <Text style={{ color: 'black', fontSize: 15 }}>{selectedProgram}</Text> */}
                        <Text style={{ color: 'black', fontSize: 18 }}>{date}</Text>
                        {/* <Button onPress={() => setOpen(true)} mode='contained' color='#099e78' style={{ marginTop: 5 }}>Select Date</Button>
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        /> */}
                    </View>

                    {studentList?.map((items, index) => {
                        const imageUri = `http://${IP}/StudentPortal/ProfileImages/${items.profile_photo}`;
                        console.log(imageUri);
                        return (
                            <View key={index} style={styles.box}>
                                <View style={{ flex: 3, marginRight: 12 }}>
                                    {
                                        items.profile_photo ? (<Image source={{ uri: imageUri }} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 50 }}></Image>) :
                                            (<Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 400 / 2 }} />)
                                    }
                                </View>
                                <View style={{ flex: 9, marginRight: 5 }}>
                                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{items.name}</Text>
                                </View>
                                <View style={{ flex: 10, marginLeft: 5, marginRight: 5 }}>
                                    <Text style={{ fontSize: 13, color: 'black' }}>{items.reg_no}</Text>
                                </View>

                                <View style={{ flex: 4, marginLeft: 5, marginRight: 5 }}>
                                    <Button
                                        color="white"
                                        style={{ backgroundColor: '#099e78', marginRight: 35 }}
                                        onPress={() => handleClick(items.id)}
                                    >
                                        {items.status}
                                    </Button>
                                </View>

                            </View>
                        )
                    })}
                    <ImagePicker imageData={imageData} setImageData={setImageData} />
                    <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                        onPress={() => handle()}
                    >Save</Button>
                    <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                        onPress={() => send()}
                    >Mark</Button>

                </View >
            </ScrollView>
        </Provider>
    )
}

export default MarkAttendance

const styles = StyleSheet.create({
    box:
    {
        margin: 8,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 2,
        backgroundColor: 'white',
        elevation: 9
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    }
})