// import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import IP from '../ip';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Timetable = ({ navigation }) => {
//     const [todayTimetable, setTodayTimetable] = useState([]);
//     const [weeklyTimetable, setWeeklyTimetable] = useState({});
//     console.log(weeklyTimetable, 'weekkly')
//     const [day, setDay] = useState([]);
//     const [timetable, setTimeTable] = useState([{ day: "", detail: [{}] }])
//     const [today, setToday] = useState('');
//     const [loading, setLoading] = useState(true);
//     const timetableHandler = async () => {
//         console.log("fetching...")
//         const reg_no = await AsyncStorage.getItem('username')
//         console.log(reg_no);
//         try {
//             const query = `http://${IP}/StudentPortal/api/Student/GetTimeTable?reg_no=${reg_no}`
//             console.log(query)
//             const response = await fetch(
//                 query, {
//                 method: 'GET',
//             }
//             );
//             console.log("Done")
//             const data = await response.json();
//             setWeeklyTimetable(data);
//             setLoading(false);
//             let day = [];
//             data?.map((time) => {
//                 return day.push(time.day);
//             });
//             let uniqueChars = [...new Set(day)];
//             setDay(uniqueChars);
//             let date = new Date();
//             let d = date.toLocaleString('en-us', { weekday: 'long' }).split(',')[0];
//             console.log(d)
//             setToday(d);
//             data.map(ele => {
//                 if (ele.day == d) {
//                     console.log('TODAY IF')
//                     setTodayTimetable(ele);
//                 }
//             })
//         } catch (error) {
//             console.error("Error:", error);
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         timetableHandler();
//     }, [])
//     useEffect(() => {
//         todayTimetable;
//     }, [todayTimetable]);
//     if (loading) {
//         return (
//             <View style={styles.loading}>
//                 <ActivityIndicator size="large" color="#099e78" />
//             </View>
//         )
//     }

//     const showItems = ({ item }) => {
//         return (

//             <View style={styles.box}>

//                 <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
//                     <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{item.course_code}</Text>
//                 </View>
//                 <View style={{ flex: 8, marginLeft: 5, marginRight: 5 }}>
//                     <Text style={{ fontSize: 13, color: 'black' }}>{item.time}</Text>
//                 </View>
//                 <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
//                     <Text style={{ fontSize: 13, color: 'black' }}>{item.venue}</Text>
//                 </View>

//             </View>

//         )

//     }
//     return (
//         <>
//             <ScrollView style={{ backgroundColor: 'white' }}>
//                 {day.map((items, index) => {
//                     return (
//                         <View key={index} style={styles.container}>
//                             <Text style={{ fontSize: 18, color: 'black', marginBottom: 10, marginTop: 20, marginHorizontal: 20 }}>{items}</Text>
//                             <View style={{ elevation: 4, marginHorizontal: 9, borderRadius: 10, backgroundColor: '#099e78', opacity: 0.7 }}>
//                                 <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10 }}>
//                                     <View style={{ flex: 8, marginLeft: 5, marginRight: 5, }}>
//                                         <Text style={{ fontSize: 15, color: 'black', fontWeight: '700' }}>Course</Text>
//                                     </View>
//                                     <View style={{ flex: 5, marginLeft: 5, marginRight: 5 }}>
//                                         <Text style={{ fontSize: 15, color: 'black', fontWeight: '700' }}>Time</Text>
//                                     </View>
//                                     <View style={{ flex: 3, marginLeft: 5, marginRight: 5 }}>
//                                         <Text style={{ fontSize: 15, color: 'black', fontWeight: '700' }}>Venue</Text>
//                                     </View>
//                                 </View>

//                             </View>

//                             <View>
//                                 {Object.keys(weeklyTimetable).map((key, index) => {
//                                     return weeklyTimetable[key].detail.map((item) => {
//                                         if (items === weeklyTimetable[key].day) {
//                                             return (<>
//                                                 <View key={index} style={{ backgroundColor: 'white', borderRadius: 2, elevation: 2, marginHorizontal: "3%", marginTop: 2 }}>
//                                                     <View style={styles.box} key="index">
//                                                         <View style={{ flex: 9, marginLeft: 10 }}>
//                                                             <Text style={{ fontSize: 15, color: 'black', fontFamily: 'arial' }}>{item.course}</Text>
//                                                         </View>
//                                                         <View style={{ flex: 7, marginLeft: 5, marginRight: 5 }}>
//                                                             <Text style={{ fontSize: 13, color: 'black' }}>{item.time}</Text>
//                                                         </View>
//                                                         <View style={{ flex: 2, marginLeft: 5, marginRight: 5 }}>
//                                                             <Text style={{ fontSize: 13, color: 'black' }}>{item.venue}</Text>
//                                                         </View>
//                                                     </View>

//                                                 </View>
//                                             </>);
//                                         } else {

//                                         }
//                                     });
//                                 })}
//                             </View>
//                         </View >
//                     )
//                 })}
//             </ScrollView>
//         </>

//     )
// }

// export default Timetable

// const styles = StyleSheet.create({
//     container:
//     {
//         flex: 1,
//         backgroundColor: 'white',
//         paddingBottom: 16,
//     },
//     headerFont:
//     {
//         textAlign: 'center'
//     },
//     box:
//     {

//         margin: 5,
//         flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 3,
//         borderRadius: 15,
//         padding: 15

//     }
// })
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import { Divider } from 'react-native-paper';
const Timetable = () => {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const [day, setDay] = useState([]);
    const [weekkly, setWeeklyTimetable] = useState([])
    const [loading, setLoading] = useState(true);
    const [todayTime, setToday] = useState([])
    //console.log(weekkly, 'weekkly')
    //     const timetableHandler = async () => {
    const GetTimeTable = async () => {
        console.log("fetching...")
        const reg_no = await AsyncStorage.getItem('username')
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetTimeTable?reg_no=${reg_no}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

            const sortedData = data.sort((a, b) => {
                if (a.day === currentDay) return -1; // Place current day on top
                if (b.day === currentDay) return 1; // Place current day on top
                return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
            });
            const currentDayObject = sortedData.find((item) => item.day === currentDay.split(',')[0]);
            const filteredData = sortedData.filter((item) => item.day !== currentDay.split(',')[0]);
            console.log("filtered data", filteredData);
            console.log("current day object", currentDayObject);
            const transformedData = [currentDayObject]
            console.log("today", transformedData);
            setToday(transformedData);
            setWeeklyTimetable(filteredData);
            setLoading(false);
            let day = [];
            data?.map((time) => {
                return day.push(time.day);
            });
            let uniqueChars = [...new Set(day)];
            setDay(uniqueChars);

            //setToday(d);

        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        GetTimeTable();
    }, [])

    const [timetable, setTimeTable] = useState([]);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.bgSiteTable}>
                        {todayTime?.map((item, index) => (
                            <View style={{ padding: 10 }} key={index}>
                                {/* <Text style={styles.dayName}>{item?.day}</Text> */}
                                <Text style={styles.dayName}>{item?.day ? item.day : 'No Class Today'}</Text>
                                <Divider style={{ backgroundColor: 'black', marginHorizontal: 10 }}></Divider>
                                {item?.detail.map((detailItem, index) => (
                                    <View key={index} style={{ flexDirection: 'row', padding: 16, marginLeft: 30 }}>
                                        <Text style={{ flex: 2 }} >{detailItem.course}</Text>
                                        <Text style={{ flex: 2 }} >{detailItem.venue}</Text>
                                        <Text style={{ flex: 2 }} >{detailItem.time}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
                {weekkly.map((dayData, index) => {
                    const dayname = dayData.day;
                    const dayIndex = weekday.findIndex((day) => day === dayname);

                    return (
                        <View style={styles.col} key={index}>
                            {/* Add your LoadingOverlay component here */}
                            <View
                                style={[
                                    styles.card,
                                    dayIndex === today.getDay() ? styles.bgSiteTable : styles.bgSiteTableNone,
                                ]}
                            >
                                <Text style={styles.dayName}>{dayname}</Text>
                                <Divider style={{ backgroundColor: 'black', marginHorizontal: 10 }}></Divider>
                                <View style={{ marginTop: 2 }}>
                                    <View>
                                        {dayData?.detail.map((details, index) => (

                                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16, marginLeft: 30 }} >
                                                <Text style={{ flex: 2, color: 'black' }} >{details.course}</Text>
                                                <Text style={{ flex: 2, color: 'black' }}>{details.venue}</Text>
                                                <Text style={{ flex: 3, color: 'black' }}>{details.time}</Text>
                                                {/* <Text style={{ flex: 2, color: 'black' }} numberOfLines={1} ellipsizeMode="tail">
                                                    {details.teacher}
                                                </Text> */}

                                                {/* Add your UncontrolledTooltip component here */}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    col: {
        flex: 1,
        marginBottom: 10,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    bgSiteTable: {
        // Replace with your desired background color
        backgroundColor: '#D7DAF2', elevation: 9, borderRadius: 2,
        marginHorizontal: 10
    },
    bgSiteTableNone: {
        backgroundColor: 'white',
        marginHorizontal: 10// Replace with your desired background color
    },
    dayName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    table: {
        flex: 1,
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: 'red', // Replace with your desired background color
        padding: 16
    },
    tableHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    tableBody: {
        backgroundColor: 'red'
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    tableCell: {
        flex: 1,
        fontSize: 14,
        color: 'black'
    },
});

export default Timetable;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import IP from '../ip';
// const Timetable = () => {
//     const [weekkly, setWeeklyTimetable] = useState([])
//     const [day, setDay] = useState([]);
//     const timetableHandler = async () => {
//         console.log("fetching...")
//         const reg_no = await AsyncStorage.getItem('username')
//         console.log(reg_no);
//         try {
//             const query = `http://${IP}/StudentPortal/api/Student/GetTimeTable?reg_no=${reg_no}`
//             console.log(query)
//             const response = await fetch(
//                 query, {
//                 method: 'GET',
//             }
//             );
//             console.log("Done")
//             const data = await response.json();
//             setWeeklyTimetable(data);
//             console.log(data);
//             // setLoading(false);
//             let day = [];
//             data?.map((time) => {
//                 return day.push(time.day);
//             });
//             let uniqueChars = [...new Set(day)];
//             setDay(uniqueChars);
//             let date = new Date();
//             let d = date.toLocaleString('en-us', { weekday: 'long' }).split(',')[0];
//             console.log(d)
//             //setToday(d);
//             data.map(ele => {
//                 if (ele.day == d) {
//                     console.log('TODAY IF')
//                     //setTodayTimetable(ele);
//                 }
//             })
//         } catch (error) {
//             console.error("Error:", error);
//             //setLoading(false);
//         }
//     };
//     useEffect(() => {
//         timetableHandler();
//     }, [])
//     return (
//         <View>
//             {weekkly.map((item) => {
//                 return (
//                     <View>
//                         <Text>{item.day}</Text>

//                     </View>
//                 )
//             })}
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//     },
//     headerCell: {
//         flex: 1,
//         paddingVertical: 10,
//         alignItems: 'center',
//     },
//     headerText: {
//         fontWeight: 'bold',
//     },
//     body: {
//         flex: 1,
//     },
//     timeRow: {
//         flexDirection: 'row',
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//     },
//     timeCell: {
//         flex: 1,
//         paddingVertical: 10,
//         alignItems: 'center',
//         borderRightWidth: 1,
//         borderColor: '#ccc',
//     },
//     timeText: {
//         fontWeight: 'bold',
//     },
//     courseCell: {
//         flex: 1,
//         paddingVertical: 10,
//         alignItems: 'center',
//         borderRightWidth: 1,
//         borderColor: '#ccc',
//     },
//     course: {
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     courseText: {
//         fontWeight: 'bold',
//     },
// });

// export default Timetable;

