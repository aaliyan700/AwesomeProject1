import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper';
import IP from '../ip';
const ContestScreen = ({ route }) => {
    const { absentList, contestList } = route.params;
    const [absentist, setabsentist] = useState([{}]);
    const [aid, setAid] = useState([]);
    const [contestLists, setContestLists] = useState([]);
    console.log("first", absentList);
    const courseCode = absentList[0].courseCode;
    const e_id = absentList[0].enrollmentId;
    console.log(e_id, 'eid..');
    const postContest = async () => {
        console.log("first", contestList);
        try {
            if (contestList.length === 0) {
                console.log("No attendance records to submit");
                return;
            }
            const response = await fetch(`http://${IP}/StudentPortal/api/Student/ContestAttendance`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contestLists),
            });
            alert("Contested..!")
        }
        catch (ex) { alert(ex.message) }

    }
    return (
        <ScrollView style={styles.container}>
            <View>
                {
                    contestList.map((ele) => {
                        if (ele) {
                            return (
                                <View style={{ backgroundColor: 'white', margin: 10, padding: 16, textAlign: 'center', elevation: 7 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <Text style={styles.font}>{ele.dateTime}</Text>
                                        <Text style={styles.font}>{ele.status}</Text>
                                        <Text style={styles.font}>{ele.type}</Text>
                                    </View>
                                    <Button
                                        mode="contained"
                                        color="black"
                                        style={{ marginHorizontal: 10, backgroundColor: '#099e78' }}
                                        onPress={() =>
                                            setContestLists((prevList) => [
                                                ...prevList,
                                                {
                                                    attendance_id: ele.id,
                                                    enrollment_id: e_id,
                                                    course_code: courseCode
                                                }])} >Contest</Button>
                                </View>
                            )
                        }
                    })
                }
            </View>
            <Button color="#099e78" style={{ margin: 40 }} mode="contained" onPress={() => postContest()}>Submit Contest</Button>
            {/* <View>
                {
                    absentList.map((ele) => {
                        return (
                            <View>
                                <View style={{ backgroundColor: '#F98E8E', paddingHorizontal: 10, borderRadius: 5, marginTop: 3 }}>
                                    <View style={styles.box}>

                                        <View style={{ flex: 8, marginLeft: 15, marginRight: 5, marginTop: 2 }}>
                                            <Text style={{ marginLeft: 15, fontSize: 15, color: 'black', fontFamily: 'arial' }}>{ele.status}</Text>
                                        </View>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Text style={{ fontSize: 13, color: 'black' }}>{ele.date}</Text>
                                        </View>
                                        <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                            <Button
                                                mode="contained"
                                                color="black"
                                                onPress={() =>
                                                    setContestList((prevList) => [
                                                        ...prevList,
                                                        {
                                                            attendance_id: ele.aid,
                                                            enrollment_id: ele.enrollmentId,
                                                            course_code: ele.courseCode
                                                        }])} >Contest</Button>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        )
                    })
                }
                <Button color="#099e78" style={{ margin: 40 }} mode="contained" onPress={() => postContest()}>Submit Contest</Button>
            </View> */}
        </ScrollView >
    )
}

export default ContestScreen

const styles = StyleSheet.create({
    box:
    {
        marginVertical: 7,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 6,
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    font:
    {
        fontSize: 20,
        color: 'black'
    }
})