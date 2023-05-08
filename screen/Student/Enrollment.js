import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'
import { Button } from 'react-native-paper';
const Enrollment = () => {
    const [enrollment, setEnrollment] = useState([]);
    const [isChecked, setIsChecked] = useState(true); // set all checkboxes to selected and disabled
    const [checked, setChecked] = useState({});
    const [studentList, setStudentList] = useState([]);
    const [pickerValues, setPickerValues] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('')
    const [username, setUsername] = useState('');
    console.log("selectedProgram", selectedProgram)
    const GetEnrollmentCourses = async () => {
        console.log("fetching.....")
        const username = await AsyncStorage.getItem('username')
        setUsername(username);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetEnrollmentCourses?reg_no=${username}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setEnrollment(data);
            let temp = [];
            data.enrollmentCourses.map((ele) => {
                temp.push({ course_offering_semester_id: ele.id, section: ele.section, reg_no: username });
            })
            setStudentList(temp);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        GetEnrollmentCourses();
    }, [])
    useEffect(() => {
        console.log(">>>>", studentList);
    }, [studentList])
    function fillpicker() {
        let temp = [];
        if (enrollment.failedCourses1) {
            enrollment.failedCourses1.map((failedCourse) => {
                // console.log(failedCourse.course_name);
                failedCourse.sections.map((section) => {
                    temp.push({ program: section.program, semester: section.semester, section: section.section });
                });
            });
            // console.log(".......", temp);
            setPickerValues(temp);
        }
    }
    useEffect(() => {
        fillpicker();
    }, []);
    const submit = async () => {

        console.log("final", studentList);
        // send the payload to the server for further processing
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Student/EnrollCourses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentList)
            }
            );
            alert("Enrolled")

        } catch (err) {
            alert(err)
        }
    };
    // useEffect(() => {
    //     Object.entries(checked).forEach((element) => {
    //         let key = element[0]
    //         let value = element[1]
    //         if (value) {
    //             setStudentList([...studentList, { id: key, section: selectedProgram, reg_no: username }])
    //         }
    //     })
    // }, [checked, selectedProgram]);
    const setList = (selectedProgram, item) => {
        console.log("item", item);
        const key = Object.keys(item)[0];
        console.log(key);
        setStudentList([...studentList, { course_offering_semester_id: key, section: selectedProgram, reg_no: username }])
        // Object.entries(item).forEach((element) => {
        //     let key = element[0]
        //     let value = element[1]
        //     if (value) {
        //         setStudentList([...studentList, { id: item, section: selectedProgram, reg_no: username }])
        //     }
        // })
        // console.log("student list", studentList);
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={{ color: 'black', margin: 5, fontSize: 16, padding: 16, backgroundColor: 'white', elevation: 3, borderBottomColor: 'black' }}>Regular Courses</Text>
                <View style={{ flexDirection: 'row', backgroundColor: '#099e78', marginHorizontal: 5, padding: 12, elevation: 3, borderRadius: 10 }}>
                    <View style={{ flex: 8, marginLeft: 20 }}>
                        <Text style={{ fontSize: 15 }}>Course name</Text>
                    </View>
                    <View style={{ flex: 8, marginLeft: 60 }}>
                        <Text style={{ fontSize: 15 }}>Credit-Hrs</Text>
                    </View>
                    <View style={{ flex: 8, }}>
                        <Text style={{ fontSize: 15 }}>Discpline</Text>
                    </View>
                </View>
                {
                    enrollment.enrollmentCourses?.map((ele, index) => {
                        return (
                            // 
                            <View key={index} style={{ margin: 1, padding: 20, borderRadius: 5, backgroundColor: 'white', }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flex: 19 }}>
                                        <Text style={{ fontSize: 16, color: 'black' }}>{ele.course_name}</Text>
                                    </View>
                                    <View style={{ flex: 8 }}>
                                        <Text>{ele.credit_hours}</Text>
                                    </View>
                                    <View style={{ flex: 6 }} >
                                        <Text>BS{ele.program}-{ele.semester}{ele.section}</Text>
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <CheckBox
                                            disabled={checked}
                                            value={true}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text>{ele.course_code}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {enrollment.failedCourses1 && enrollment.failedCourses1.length > 0 &&
                    enrollment.failedCourses1.map((failedCourse) => {
                        failedCourse.sections.map((section) => {
                            return (
                                <View>
                                    <Text style={{}}>{section.section}</Text>
                                </View>
                            )
                        })
                    })
                }
                <Text style={{ color: 'black', margin: 5, fontSize: 18, padding: 16 }}>Failed Courses</Text>
                {enrollment.failedCourses1 && enrollment.failedCourses1.length > 0 &&
                    enrollment.failedCourses1.map((ele, index) => (
                        <View key={index} style={{ margin: 1, padding: 20, elevation: 5, borderRadius: 5 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ flex: 19 }}>
                                    <Text style={{ fontSize: 16, color: 'red' }}>{ele.course_name}</Text>
                                </View>
                                <View style={{ flex: 8 }}>
                                    <Text>{ele.credit_hours}</Text>
                                </View>
                                <View>
                                    <CheckBox
                                        disabled={false}
                                        value={checked[ele.sections[0].id]}
                                        onValueChange={(newValue) => {
                                            console.log(`Setting checkbox value to ${newValue} `);
                                            setChecked({ ...checked, [ele.sections[0].id]: newValue });
                                        }}
                                    />
                                </View>

                                {/* <View style={{ flex: 2 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={checked[ele.course_code]}
                                        onValueChange={(newValue) => { setChecked({ ...checked, [ele.course_code]: newValue }) }}
                                    />
                                </View> */}
                            </View>
                            <View>
                                <Text>{ele.course_code}</Text>
                            </View>
                            <View>
                                <Picker
                                    mode='modal'
                                    selectedValue={selectedProgram}
                                    onValueChange={(itemValue) => {
                                        // console.log("itemValue", itemValue)
                                        setSelectedProgram(itemValue)
                                        setList(itemValue, checked)
                                        // getStudentListHandler(itemValue);
                                        // setPickerValues(itemValue)
                                        // fillpicker(itemValue);
                                    }

                                    }>
                                    {
                                        ele.sections.map((item, index) => {
                                            return (
                                                <Picker.Item key={index} label={`BS${item.program} ${item.semester}${item.section} `} value={item.section} />
                                            )
                                        })
                                    }

                                </Picker>
                            </View>
                        </View>
                    ))
                }
                <TouchableOpacity style={styles.button} onPress={submit}>
                    <Text style={styles.buttonLabel}>Enroll</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    )
}

export default Enrollment

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#099e78',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 50
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    }
})