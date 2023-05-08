import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import { Picker } from '@react-native-picker/picker'
import { RadioButton } from 'react-native-paper';
const ExamsDetails = () => {
    const [sessionList, setSession] = useState([]);
    const [select, setSelect] = useState("")
    console.log(select, 'session')
    const [exams, setExams] = useState([]);
    const [type, setType] = useState("midterm");
    const GetSession = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetMySessions?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setSession(data);
            console.log("my sessions", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const GetMarks = async (select) => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        console.log(select, 'outapi');
        try {
            console.log(select, 'inapi');
            const query = `http://${IP}/StudentPortal/api/Student/GetMidFinalMarks?reg_no=${reg_no}&&session=${select}`;
            console.log(query);
            const response = await fetch(query, {
                method: 'GET'
            });
            console.log('Done');
            const data = await response.json();
            setExams(data);
            console.log('yeh hai mera data');
            console.log('data hai yeh', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const onValueChange = (value) => {
        setSelect(value);
        GetMarks(value);
    };
    useEffect(() => {
        GetSession();
    }, [])
    useEffect(() => {
        GetMarks();
    }, [])
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, padding: 20 }}>Exam Results</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    mode='modal'
                    selectedValue={select}
                    onValueChange={onValueChange}>
                    <Picker.Item label="Select Session" />
                    {
                        sessionList && sessionList.length > 0 &&
                        sessionList.map((session, index) => {
                            console.log(index, 'index')
                            return (
                                <Picker.Item key={index} label={session} value={session} />
                            )
                        })}
                </Picker>
            </View>
            <View style={{ alignItems: 'center', marginTop: 5 }}>
                <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ margin: 10, color: 'black' }}>MidTerm</Text>
                            <RadioButton value='midterm' label="midterm" />
                            <Text style={{ margin: 10, color: 'black' }}>FinalTerm</Text>
                            <RadioButton value='finalterm' label="finalterm" />
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: "#099e78", margin: 5, padding: 12 }}>
                <View style={{ flexDirection: 'row', flex: 5 }}>
                    <Text style={styles.font1}>Course name</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 3, marginLeft: 35 }}>
                    <Text style={styles.font1}>Total marks</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 3, marginLeft: 30 }}>
                    <Text style={styles.font1}>Obt-Marks</Text>
                </View>
            </View>
            {
                exams && exams.length > 0 &&
                exams?.map((item, index) => {
                    if (item.type === type) {
                        return (
                            <View key={index} style={{ flexDirection: 'row', backgroundColor: "white", margin: 5, padding: 10, elevation: 7 }}>
                                <View style={{ flexDirection: 'row', flex: 9 }}>
                                    <Text style={styles.font}>{item.courseName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 4 }}>
                                    <Text style={styles.font}>{item.total_marks}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <Text style={styles.font}>{item.obtained_marks}</Text>
                                </View>
                            </View>
                        )
                    }
                })
            }

        </View>
    )
}

export default ExamsDetails

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    font:
    {
        fontSize: 13,
        color: 'black'
    },
    font1:
    {
        fontSize: 13,
        color: 'white'
    },
    picker: {
        height: 50,
        color: 'black',
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20
    },

})
