import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { RadioButton } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import IP from '../ip'
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'
const Attendence = ({ navigation, route }) => {
    console.log("first", route)
    const [type, setType] = useState('class');
    const { item } = route.params;
    console.log("Yeh hai id", item.enrollmentId);
    const [eid, setEid] = useState(item.enrollmentId);
    console.log("itemsss", item);
    const [absents, setAbsents] = useState(0);
    const [present, setPresents] = useState(0);
    const [percentage, setPercentage] = useState(0.0);
    const [actionChecked, setActionChecked] = useState(false);
    const [absentList, setAbsentList] = useState([]);
    const [contestList, setContestList] = useState([]);
    const filterAbsents = () => {
        console.log("Hi", item);
        console.log("Hi", item.enrollmentId);
        let enrollmentid = item.enrollmentId;
        let coursecode = item.courseCode;
        let temp = [];
        item.detail.map((ele) => {
            if (ele.status === "A") {
                temp.push({ aid: ele.aid, date: ele.date, status: ele.status, type: ele.type, enrollmentId: enrollmentid, courseCode: coursecode });
            }
        })
        setAbsentList(temp);
    }
    useEffect(() => {
        filterAbsents();
    }, [])
    const navigateList = () => {
        navigation.navigate('ContestScreen', { contestList, absentList });
    }
    const calculatePercentage = () => {
        let totalAbsents = 0;
        let totalPresents = 0;

        item.detail.forEach((ele) => {
            if (ele.status === 'A') {
                totalAbsents++;
            } else {
                totalPresents++;
            }
        });
        let total = totalAbsents + totalPresents;
        console.log("total" + total);
        let per = 0;
        if (total == 0) {
            per = 100;
        }
        else {
            let percentag = (totalPresents / total) * 100;
            per = percentag.toFixed(2)
        }
        console.log("percentage" + per);
        setAbsents(totalAbsents);
        setPresents(totalPresents);
        setPercentage(per);
    };
    useEffect(() => {
        calculatePercentage();
        console.log('absentList', absentList);
    }, [absentList])

    const GetAbsentList = async () => {
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetAbsentList?eid=${eid}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            console.log(data, "AbsentLists");
            setContestList(data);

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetAbsentList();
    }, [])
    return (
        <View style={styles.conatiner}>
            <View style={{ backgroundColor: 'white', opacity: 9, elevation: 0.7, padding: 20, marginHorizontal: 5, borderRadius: 20, marginTop: 2 }}>
                <Text style={styles.font}>{item.courseName}</Text>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ color: 'black' }}>Percentage: {percentage}%</Text>
                    <Text style={{ color: 'black' }}>Absents:      {absents}</Text>
                    <Text style={{ color: 'black' }}>Presents:     {present}</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
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
                </View>
            </View>
            <Button style={{ margin: 10, backgroundColor: '#099e78', fontWeight: 'bold' }} color="black" mode="outlined" onPress={() => navigateList()}>Contest</Button>
            <View style={{ marginTop: 2, flexDirection: 'row', paddingHorizontal: 36, paddingVertical: 10, backgroundColor: '#77dd77', marginHorizontal: 15, borderRadius: 10, opacity: 0.7, elevation: 4 }}>
                <View style={{ flex: 8, marginLeft: 5, marginRight: 5, }}>
                    <Text style={{ fontSize: 13, color: 'black', fontWeight: '700' }}>Status</Text>
                </View>
                <View style={{ flex: 8, marginLeft: 100, marginRight: 5 }}>
                    <Text style={{ fontSize: 13, color: 'black', fontWeight: '700' }}>Date</Text>
                </View>
            </View>
            <ScrollView>
                {
                    item.detail.map((val, index) => {
                        if (val.type == type) {
                            return (
                                <View key={index} style={{ paddingHorizontal: 10, marginHorizontal: 10, marginTop: 3 }}>
                                    {
                                        val.status == "A" ?
                                            <View style={{ backgroundColor: '#F98E8E', paddingHorizontal: 10, borderRadius: 5 }}>
                                                <View style={styles.box}>

                                                    <View style={{ flex: 8, marginLeft: 15, marginRight: 5 }}>
                                                        <Text style={{ marginLeft: 15, fontSize: 15, color: 'black', fontFamily: 'arial' }}>{val.status}</Text>
                                                    </View>
                                                    <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                                        <Text style={{ fontSize: 13, color: 'black' }}>{val.date}</Text>
                                                    </View>
                                                </View>
                                            </View> :
                                            <View style={{ backgroundColor: '#099e78', paddingHorizontal: 10, borderRadius: 5 }}>
                                                <View style={styles.box}>

                                                    <View style={{ flex: 8, marginLeft: 15, marginRight: 5 }}>
                                                        <Text style={{ marginLeft: 15, fontSize: 15, color: 'black', fontFamily: 'arial' }}>{val.status}</Text>
                                                    </View>
                                                    <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                                        <Text style={{ fontSize: 13, color: 'black' }}>{val.date}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                    }

                                </View>

                            )
                        }
                        else {
                            <View key={index} style={{ paddingHorizontal: 10, marginHorizontal: 10, marginTop: 3 }}>
                                {
                                    val.status == "A" ?
                                        <View style={{ backgroundColor: '#F98E8E', paddingHorizontal: 10, borderRadius: 5 }}>
                                            <View style={styles.box}>

                                                <View style={{ flex: 8, marginLeft: 15, marginRight: 5 }}>
                                                    <Text style={{ marginLeft: 15, fontSize: 15, color: 'black', fontFamily: 'arial' }}>{val.status}</Text>
                                                </View>
                                                <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                                    <Text style={{ fontSize: 13, color: 'black' }}>{val.date}</Text>
                                                </View>
                                            </View>
                                        </View> :
                                        <View style={{ backgroundColor: '#099e78', paddingHorizontal: 10, borderRadius: 5 }}>
                                            <View style={styles.box}>

                                                <View style={{ flex: 8, marginLeft: 15, marginRight: 5 }}>
                                                    <Text style={{ marginLeft: 15, fontSize: 15, color: 'black', fontFamily: 'arial' }}>{val.status}</Text>
                                                </View>
                                                <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                                                    <Text style={{ fontSize: 13, color: 'black' }}>{val.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                }

                            </View>


                        }
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Attendence

const styles = StyleSheet.create({
    conatiner:
    {
        flex: 1,

    },
    font:
    {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    box:
    {

        marginVertical: 7,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 6,
    }
})