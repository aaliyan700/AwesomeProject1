import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
const CheckFeedback = ({ route, navigation }) => {
    const { selectedValue } = route.params;
    const [teacherList, setTeacherList] = useState([]);
    const GetTeacherandCourses = async () => {
        try {
            const query = `http://${IP}/StudentPortal/api/Admin/GetAllTeachersAndCourses?session=${selectedValue}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            setTeacherList(data);
            console.log("data", data);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetTeacherandCourses();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {
                    teacherList?.map((item, index) => {
                        if (item != "") {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => navigation.navigate("QuestionRating", { item, selectedValue })}>
                                    <View key={index} style={styles.dataView}>
                                        <Text style={styles.mainFont}>{item.teacherName}</Text>
                                        <Text style={styles.subFont}>{item.course_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        else {
                            return (
                                <Text>NO DATA</Text>
                            )
                        }

                    })
                }
            </ScrollView>
        </View>
    )
}

export default CheckFeedback

const styles = StyleSheet.create({
    dataView: {
        backgroundColor: 'white',
        margin: 3,
        padding: 16,
        elevation: 4,
        opacity: 7
    },
    mainFont:
    {
        color: 'black',
        fontSize: 18
    },
    subFont:
    {
        fontSize: 15
    }
})