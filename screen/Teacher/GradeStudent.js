import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';
import IP from '../ip';
import { clearTextOnFocus } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
const GradeStudent = ({ navigation, route }) => {
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
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('class');
    const [alist, setAlist] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);
    const [obtMarks, setObtMarks] = useState(0);
    const [title, setTitle] = useState('');
    const updateStudentList = (id, newNumber) => {
        setStudentList(prevState => {
            // make a copy of the original state
            const newState = [...prevState];
            // use map() method to update the object
            const updatedState = newState.map(obj => {
                console.log("Obj", obj.id, "id", id)
                if (obj.id == id) {
                    console.log('entered', newNumber)
                    // create a new object with the updated property
                    return { ...obj, obtained_marks: newNumber };
                } else {
                    // return the original object if it's not the one we want to update
                    return obj;
                }
            });

            // return the new array with the updated object
            return updatedState;
        });
    };

    useEffect(() => {
        console.log("STUDENT LIST", studentList)
    }, [studentList])

    useEffect(() => {
        let PickerItems = courses.filter((course) => {
            return course.course_code === item.course_code
        })
        setPickerItems(PickerItems)
    }, [item, courses])
    const getStudentListHandler = async (itemValue) => {
        try {
            let program = itemValue.split('-');
            console.log("program", program)
            let id = program[0];
            let section = program[1];
            const query1 = `http://${IP}/StudentPortal/api/Teacher/GetStudents?id=${id}&&section=${section}`;
            console.log("Query", query1);
            const query = `http://${IP}/StudentPortal/api/Teacher/GetStudents?id=92&&section=A`
            console.log(query)
            const response = await fetch(
                query1, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            console.log(data);
            setStudentList(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handle = async () => {
        console.log('mn yhn hn', studentList);
        console.log("Saving...");
        let temp = [];
        studentList.map((i) => {
            temp.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks });
        })
        let temp1 = [];
        studentList.map((i) => {
            console.log("i objtained ", i.obtained_marks)
            temp1.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks, title: title });
        })
        setAlist(temp);
        setMarks(temp);
        setSessional(temp1);
        console.info("first", sessionalList);
        alert("Attendance Saved");
    }
    const send = async () => {
        console.log(alist, "<<<<")

        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Teacher/MarkAttendence`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(alist)
            }
            );
            alert("Marked..!")
        } catch (ex) { alert(ex.message) }


        // console.log(data);
        // console.log("done...", data);
        // alert("Attendance Marked");
    }
    const marksExams = async () => {
        console.log('mn yhn hn', studentList);
        console.log("Saving...");
        let marksList = [];
        // studentList.map((i) => {
        //     marksList.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks });
        // })
        studentList.map((i) => {
            const obtainedMarks = i.obtained_marks || 0; // Set obtained_marks to 0 if it is null
            marksList.push({
                enrollment_id: i.id,
                type: type,
                total_marks: totalMarks,
                obtained_marks: obtainedMarks
            });
        });

        let temp = [];
        studentList.map((i) => {
            temp.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks });
        })
        let sessionalList = [];
        studentList.map((i) => {
            console.log("i objtained ", i.obtained_marks)
            sessionalList.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks, title: title });
        })
        setAlist(temp);
        // setSessional(temp1);
        console.info("first", sessionalList);
        console.log(alist, "<<<<")
        // if (obtMarks == null) {
        //     ToastAndroid.show("Please enter marks for all students", ToastAndroid.BOTTOM);
        // }
        // else if (totalMarks == null) {
        //     ToastAndroid.show("Please enter marks for all students", ToastAndroid.BOTTOM);
        // }
        // else {
        try {
            if (totalMarks) {
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Teacher/MarkMidFinal`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(marksList)
                }
                );

                ToastAndroid.show("Student Marked", ToastAndroid.BOTTOM);
                navigation.navigate("TeacherDashboard");
            } else {
                alert("Please enter required fields");
            }
        } catch (ex) { alert(ex.message) }
    }
    const gradeSessional = async () => {
        console.log('mn yhn hn', studentList);
        console.log("Saving...");
        let marksList = [];
        studentList.map((i) => {
            marksList.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks });
        })
        let temp = [];
        studentList.map((i) => {
            temp.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks });
        })
        let sessionalList = [];
        // studentList.map((i) => {
        //     console.log("i objtained ", i.obtained_marks)
        //     sessionalList.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks, title: title });
        // })
        studentList.map((i) => {
            console.log("i obtained", i.obtained_marks);
            const obtainedMarks = i.obtained_marks || 0; // Set obtained_marks to 0 if it is null
            sessionalList.push({
                enrollment_id: i.id,
                type: type,
                total_marks: totalMarks,
                obtained_marks: obtainedMarks,
                title: title
            });
        });
        setAlist(temp);
        // setSessional(temp1);
        console.info("first", sessionalList);
        if (totalMarks && title) {
            try {
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Teacher/MarkAssignmentQuiz`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sessionalList)
                }
                );

                alert("Marked..!")
                navigation.navigate("TeacherDashboard");
            } catch (ex) { alert(ex.message) }
        }
        else {
            ToastAndroid.show("Please validate fields", ToastAndroid.TOP);
        }
    }
    // const gradeSessional = async () => {

    //     // let sessionalList = [];
    //     // studentList.map((i) => {
    //     //     console.log("i objtained ", i.obtained_marks)
    //     //     sessionalList.push({ enrollment_id: i.id, type: type, total_marks: totalMarks, obtained_marks: i.obtained_marks, title: title });
    //     // })
    //     try {
    //         const response = await fetch(
    //             `http://${IP}/StudentPortal/api/Teacher/MarkAssignmentQuiz`, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(sessionalList)
    //         }
    //         );
    //         alert("Marked..!")
    //     } catch (ex) { alert(ex.message) }
    // }
    useEffect(() => {
        console.log("data", alist);
    }, [alist]);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 0, borderWidth: 2, borderColor: 'white', marginTop: 10, elevation: 3 }}>
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
                <View style={{ backgroundColor: 'white', padding: 10, marginTop: 5, marginLeft: 10, width: '95%', elevation: 9, alignItems: 'center', borderRadius: 10 }}>

                    <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ margin: 10, color: 'black' }}>Mid Term</Text>
                                <RadioButton value='midterm' label="midterm" />
                                <Text style={{ margin: 10, color: 'black' }}>Final Term</Text>
                                <RadioButton value='finalterm' label="finalterm" />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ margin: 10, color: 'black' }}>Quiz</Text>
                                <RadioButton value='quiz' label="quiz" />
                                <Text style={{ margin: 10, color: 'black' }}>Assignment</Text>
                                <RadioButton value='asg' label="asg" />
                            </View>
                        </View>
                    </RadioButton.Group>

                    <Text style={{ color: 'black', fontSize: 18 }}>{courseName}</Text>
                    {/* <Text style={{ color: 'black', fontSize: 15 }}>BS-{item.program} {item.semester}{item.section}</Text> */}
                </View>

                {
                    type == "midterm" ? (
                        <TextInput label="Total Marks" mode="outlined"
                            value={totalMarks}
                            onChangeText={(val) => setTotalMarks(val)}
                            style={{ marginHorizontal: 30 }} />
                    ) : type === "finalterm" ?
                        (
                            <TextInput label="Total Marks" mode="outlined"
                                value={totalMarks}
                                onChangeText={(val) => setTotalMarks(val)}
                                style={{ marginHorizontal: 30 }} />
                        ) : type === "asg" ? (
                            <View>
                                <TextInput label="Total Marks" mode="outlined"
                                    style={{ marginHorizontal: 30 }}
                                    onChangeText={(val) => setTotalMarks(val)} value={totalMarks} />
                                <TextInput label="Assignment Title" placeholder='Assignment Title' mode="outlined"
                                    value={title}
                                    style={{ marginHorizontal: 30 }}
                                    onChangeText={(val1) => setTitle(val1)}
                                />
                            </View>
                        ) : type === "quiz" ? (
                            <View>
                                <TextInput label="Total Marks" placeholder='Total Marks' mode="outlined"
                                    style={{ marginHorizontal: 30 }}
                                    onChangeText={(val) => setTotalMarks(val)
                                    }
                                    value={totalMarks} />
                                <TextInput label="Quiz Title" placeholder='Quiz Title' mode="outlined"
                                    style={{ marginHorizontal: 30 }}
                                    onChangeText={(val1) => setTitle(val1)}
                                    value={title} />
                            </View>
                        ) : ("")
                }
                {
                    type === "midterm" ? (
                        <View>
                            {studentList?.map((items, index) => {
                                return (
                                    <View key={index} style={styles.box}>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{items.name}</Text>
                                        </View>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 13, color: 'black' }}>{items.reg_no}</Text>
                                        </View>
                                        <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
                                            {/* <TextInput onChangeText={(v) => setObtMarks(v)} mode="outline" value={obtMarks} /> */}
                                            <TextInput onChangeText={(v) => updateStudentList(items.id, v)} mode="contained" />
                                        </View>
                                    </View>
                                )
                            })}
                            <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                                onPress={() => marksExams()}
                            >Mark</Button>
                        </View>
                    ) : type === "finalterm" ? (
                        <View>
                            {studentList?.map((items, index) => {
                                return (
                                    <View key={index} style={styles.box}>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{items.name}</Text>
                                        </View>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 13, color: 'black' }}>{items.reg_no}</Text>
                                        </View>
                                        <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
                                            {/* <TextInput onChangeText={(val) => setObtMarks(val)} mode="contained" value={obtMarks} /> */}
                                            <TextInput onChangeText={(v) => updateStudentList(items.id, v)} mode="contained" />
                                        </View>
                                    </View>
                                )
                            })}
                            <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                                onPress={() => marksExams()}
                            >Mark</Button>
                        </View>
                    ) : type === "asg" ? (
                        <View>
                            {studentList?.map((items, index) => {
                                return (
                                    <View key={index} style={styles.box}>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{items.name}</Text>
                                        </View>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 13, color: 'black' }}>{items.reg_no}</Text>
                                        </View>

                                        <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
                                            {/* <TextInput onChangeText={(v) => setObtMarks(v)} mode="contained" value={obtMarks} /> */}
                                            <TextInput onChangeText={(v) => updateStudentList(items.id, v)} mode="contained" />
                                        </View>
                                    </View>
                                )
                            })}
                            {/* <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                                onPress={() => handle()}
                            >Save</Button> */}
                            <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                                onPress={() => gradeSessional()}
                            >Mark</Button>
                        </View>
                    ) : type === "quiz" ? (
                        <View>
                            {studentList?.map((items, index) => {
                                return (
                                    <View>
                                        <View key={index} style={styles.box}>
                                            <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{items.name}</Text>
                                            </View>
                                            <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                                <Text style={{ fontSize: 13, color: 'black' }}>{items.reg_no}</Text>
                                            </View>

                                            <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
                                                {/* <TextInput onChangeText={(v) => setObtMarks(v)} mode="contained" value={obtMarks} /> */}
                                                <TextInput onChangeText={(v) => updateStudentList(items.id, v)} mode="contained" />
                                            </View>
                                        </View>

                                    </View>

                                )
                            }
                            )}
                            {/* <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                                onPress={() => handle()}
                            >Save</Button> */}
                            <Button mode='contained' style={{ marginHorizontal: 40, marginTop: 10 }} color="#099e78"
                                onPress={() => gradeSessional()}
                            >Mark</Button>
                        </View>
                    ) : ("")
                }
            </View >
        </ScrollView>
    )
}

export default GradeStudent;

const styles = StyleSheet.create({
    box:
    {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 1,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 2,
        elevation: 7
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    }
})