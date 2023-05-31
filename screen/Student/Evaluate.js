import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Evaluate = ({ navigation, route }) => {
    const { item } = route.params;
    console.log(item);
    // console.log("ITEM", item);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState({});
    const [id, setId] = useState(item.id);
    const [reg_no, setRegno] = useState('');
    const [counter, setCounter] = useState(1);
    const allocationId = item.id;
    useEffect(() => {
        GetQuestion();
    }, [])
    const check = async () => {
        const user_name = await AsyncStorage.getItem('username');
        setRegno(user_name);
        console.log("HELLO REGNo", reg_no);
    }
    useEffect(() => {
        check();
    }, [])
    console.log("itemssss", item.teacherName);
    console.log("itemssss", item.courseCode);
    console.log("id", item.id);
    const GetQuestion = async () => {
        console.log("Umer");
        const response = await fetch(
            `http://${IP}/StudentPortal/api/Student/GetTeacherEvaluationQuestions?allocationId=${allocationId}`, {
            method: 'GET',
        }
        );
        const data = await response.json();
        console.log("first")
        console.log(data);
        setQuestion(data);
    }
    const submit = async () => {
        let temp = [];
        myArray.map((ele) => {
            temp.push({ questionId: ele.questionId, answer: ele.answer });
        });
        const teacherEvaluatio = {
            allocationId: id,
            reg_no: reg_no,
            evaluationAnswers: temp
        };
        console.log("final", teacherEvaluatio);
        // send the payload to the server for further processing
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Student/FeedbackTeacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacherEvaluatio)
            }
            );
            ToastAndroid.show("Thankyou for your feedback!", ToastAndroid.SHORT);
        } catch (err) {
            alert(err)
        }
    };
    const [myArray, setMyArray] = useState([]);
    let arr = [];
    // const setValue = (questionId, answer) => {
    //     setMyArray(prevArray => [...prevArray, { questionId, answer }]);
    //     console.log("Arrays", myArray);
    //     setCounter(counter + 1);
    //     console.log("counter", counter);
    // }
    const setValue = (questionId, answer) => {
        // Check if the selected answer is already set for the question
        if (answers[questionId] === answer) {
            // If it is, remove the selected answer
            const updatedAnswers = { ...answers };
            delete updatedAnswers[questionId];
            setAnswers(updatedAnswers);
        } else {
            // If it is not, update the selected answer in the answers object
            setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
        }

        setMyArray(prevArray => [...prevArray, { questionId, answer }]);
        setCounter(counter + 1);
    };


    return (
        <ScrollView>
            <View style={{ backgroundColor: 'white  ', margin: 5, padding: 10 }}>
                <Text style={{ fontSize: 15 }}>{item.teacherName}</Text>
                <Text>{item.courseCode}</Text>
            </View>
            {/* <View style={{ backgroundColor: 'white', marginHorizontal: 10 }}> */}
            {
                question?.map((ele, index) => {
                    if (ele != null) {
                        const selectedAnswer = answers[ele.id];
                        return (
                            <View key={index} style={styles.questionDiv}>
                                <Text style={{ color: 'black', fontSize: 15 }}>{ele.question}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 5 }}>
                                    {/* <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 'Excellent' && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 4)}>
                                        <Text style={styles.btnText}>Excellent</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 'Good' && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 3)}>
                                        <Text style={styles.btnText}>Good</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 'Average' && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 2)}>
                                        <Text style={styles.btnText}>Average</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 'Below Average' && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 1)}>
                                        <Text style={styles.btnText}>Below Average</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 4 && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 4)}>
                                        <Text style={styles.btnText}>Excellent</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 3 && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 3)}>
                                        <Text style={styles.btnText}>Good</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 2 && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 2)}>
                                        <Text style={styles.btnText}>Average</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.btnStyle, selectedAnswer === 1 && styles.selectedBtnStyle]}
                                        onPress={() => setValue(ele.id, 1)}>
                                        <Text style={styles.btnText}>Below Average</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )
                    }
                })
            }
            <Button mode="contained" color="#099e78" style={{ marginHorizontal: 40, margin: 10 }}
                onPress={() => submit()}>Submit</Button>
        </ScrollView>
    )
}

export default Evaluate

const styles = StyleSheet.create({
    div: {
        padding: 10
    },
    questionDiv: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: 0.7,
        elevation: 4
    },
    btnStyle: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    selectedBtnStyle: {
        backgroundColor: "orange",
    },
    btnText: {
        color: 'black'
    }
})



