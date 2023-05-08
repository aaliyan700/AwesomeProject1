import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import ChartTest from './ChartTest';
const QuestionRating = ({ route }) => {
    const { item } = route.params;
    console.log("item testing", item);
    const { selectedValue } = route.params;
    console.log("session Testing", selectedValue);
    const [teacherId, setTeacherId] = useState(item.teacher_id);
    const [courseCode, setCourseCode] = useState(item.course_code);
    console.log("testing teacherID", teacherId);
    console.log("Testing coursecode", courseCode);
    const [teacherPoint, setTeacherPoint] = useState([]);
    console.log(item.teacherName);
    console.log(item.course_name);
    const GetRating = async () => {
        try {
            const query = `http://${IP}/StudentPortal/api/Admin/GetTeacherFeedback?teacherId=${teacherId}&&courseCode=${courseCode}&&session=${selectedValue}`
            console.log("Query string", query);
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            console.log(data);
            setTeacherPoint(data);
            console.log(">>>>>>>>>>");
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetRating();
    }, [])
    const isDataFound = (data) => {
        const { average, excellent, good, poor } = data
        if (average == 0 && excellent == 0 && good == 0 && poor == 0) {
            return false
        }
        return true
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, color: 'black' }}>{item.teacherName}</Text>
                <Text style={{ fontSize: 16, color: 'black' }}>{item.course_name}</Text>
            </View>
            {
                teacherPoint.data2 && isDataFound(teacherPoint.data2) ?
                    <ChartTest data={teacherPoint?.data2} />
                    :
                    <View style={{ justifyContent: 'center' }}>
                        <Text>no Data</Text>
                    </View>
            }
            <ScrollView>
                {
                    teacherPoint.data?.map((item, index) => {
                        if (item != null) {
                            return (
                                <View key={index} style={{ flexDirection: 'row', margin: 5, backgroundColor: 'white', padding: 3, elevation: 7, borderRadius: 2 }}>
                                    <View style={{ flex: 15, margin: 10 }}>
                                        <Text style={{ color: 'black', fontSize: 15 }}>{item.question}</Text>
                                    </View>
                                    <View style={{ flex: 2, margin: 10 }}>
                                        <Text style={{ color: 'black', fontSize: 15 }}>{item.percentage}</Text>
                                    </View>

                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
        </View>
    )
}

export default QuestionRating

const styles = StyleSheet.create({
    content:
    {
        flexDirection: 'row',
    },
    header:
    {
        padding: 10,
    }
})