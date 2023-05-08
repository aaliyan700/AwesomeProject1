import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { RadioButton } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'
const ExamsMarks = ({ navigation, route }) => {
    console.log("first", route)
    const [type, setType] = useState('midterm');
    const { item } = route.params;
    // const [{ item }] = route.params;
    const [absents, setAbsents] = useState(0);
    const [present, setPresents] = useState(0);
    const [percentage, setPercentage] = useState(0.0);
    const [actionChecked, setActionChecked] = useState(false);
    const [absentList, setAbsentList] = useState([]);
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
        navigation.navigate('ContestScreen', { absentList });
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
    return (
        <View style={styles.conatiner}>
            <View style={{ backgroundColor: 'white', opacity: 9, elevation: 0.7, padding: 20, marginHorizontal: 5, borderRadius: 20, marginTop: 10 }}>
                <Text style={styles.font}>{item.courseName}</Text>
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
            </View>
            <View style={{ marginTop: 2, flexDirection: 'row', paddingHorizontal: 36, paddingVertical: 10, backgroundColor: '#77dd77', marginHorizontal: 15, borderRadius: 10, opacity: 0.7, elevation: 4, marginTop: 10 }}>
                <View style={{ flex: 6, marginLeft: 1, marginRight: 5 }}>
                    <Text style={{ fontSize: 13, color: 'black' }}>Total Marks</Text>
                </View>
                <View style={{ flex: 5, marginLeft: 5, marginRight: 5 }}>
                    <Text style={{ fontSize: 13, color: 'black' }}>Obtained Marks</Text>
                </View>

            </View>
            <ScrollView>
                {
                    item.detail.map((val, index) => {
                        if (val.type == type) {
                            return (
                                <View key={index} style={{ paddingHorizontal: 10, marginHorizontal: 5, marginTop: 3 }}>
                                    {
                                        <View style={{ backgroundColor: 'white', paddingHorizontal: 1, borderRadius: 5 }}>
                                            <View style={styles.box}>
                                                <View style={{ flex: 6, marginLeft: 50, marginRight: 5 }}>
                                                    <Text style={{ fontSize: 13, color: 'black', }}>{val.total_marks}</Text>
                                                </View>
                                                <View style={{ flex: 5, marginLeft: 5, marginRight: 5 }}>
                                                    <Text style={{ fontSize: 13, color: 'black' }}>{val.obtained_marks}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }

                                </View>

                            )
                        }

                        // else {
                        //     <View style={{ paddingHorizontal: 10, marginHorizontal: 10, marginTop: 3 }}>
                        //         {
                        //             <View style={{ backgroundColor: '#F98E8E', paddingHorizontal: 10, borderRadius: 5 }}>
                        //                 <View style={styles.box}>

                        //                     <View style={{ flex: 8, marginLeft: 15, marginRight: 5 }}>
                        //                         <Text style={{ marginLeft: 15, fontSize: 15, color: 'black', fontFamily: 'arial' }}>{val.title}</Text>
                        //                     </View>
                        //                     <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                        //                         <Text style={{ fontSize: 13, color: 'black' }}>{val.total_marks}</Text>
                        //                     </View>
                        //                     <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
                        //                         <Text style={{ fontSize: 13, color: 'black' }}>{val.obtained_marks}</Text>
                        //                     </View>
                        //                 </View>
                        //             </View>

                        //         }

                        //     </View>


                        // }









                    })
                }
            </ScrollView>
        </View>
    )
}

export default ExamsMarks;

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