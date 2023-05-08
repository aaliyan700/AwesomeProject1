// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { FlatGrid } from 'react-native-super-grid';
// import IP from './ip';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const StudentPerformance = ({ navigation }) => {
//     const [coursesList, setCoursesList] = useState([]);
//     const [studentAttendance, setStudentAttendance] = useState([]);
//     console.log("data", studentAttendance);
//     const ResultHandler = async () => {
//         console.log("fetching...")
//         const reg_no = await AsyncStorage.getItem('username')
//         console.log(reg_no);
//         try {
//             const query = `http://${IP}/StudentPortal/api/Student/GetAssignmentQuizMarks?reg_no=${reg_no}`
//             console.log(query)
//             const response = await fetch(
//                 query, {
//                 method: 'GET',
//             }
//             );
//             console.log("Done")
//             const data = await response.json();
//             console.log("data", data);
//             // setStudentAttendance(data);
//             // let temp = [];
//             // data.map((item) => {
//             //     console.log(item.CourseName, item.courseCode);
//             //     item.detail.map((item1) => {
//             //         console.log(item1.status, item1.date, item1.type);
//             //     })

//             // })
//             // setCoursesList(temp);

//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };
//     useEffect(() => {
//         ResultHandler();
//     }, [])
//     // useEffect(() => {
//     //     console.log("first", coursesList);
//     // }, [coursesList])
//     const showItems = ({ item }) => {
//         const handler = () => {
//             navigation.navigate('Attendence', { item, coursesList });
//             // navigation.navigate('Attendence', { arrayOfObject: item });
//         };
//         return (
//             <TouchableOpacity style={styles.boxes}
//                 onPress={() => handler()}>
//                 <View>
//                     <Text style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>{item.CourseName}</Text>
//                     <Text style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>{item.courseCode}</Text>
//                 </View>
//             </TouchableOpacity>
//         )

//     }
//     return (
//         <View style={styles.container}>
//             <FlatGrid
//                 itemDimension={130}
//                 data={studentAttendance}
//                 renderItem={showItems}
//             />
//         </View>
//     )
// }

// export default StudentPerformance

// const styles = StyleSheet.create({
//     container:
//     {

//         flex: 1,
//         backgroundColor: 'white'
//     },
//     boxes:
//     {
//         borderRadius: 8,
//         padding: 20,
//         backgroundColor: 'white',
//         elevation: 4,
//         opacity: 0.7
//     },
//     box:
//     {
//         margin: 8,
//         flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 6,
//         backgroundColor: 'white',
//         opacity: 6,
//         elevation: 0.4,
//         borderRadius: 15,
//         marginTop: "10%",
//     }
// })
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const StudentPerformance = ({ navigation }) => {
    return (

        <View>
            <Button style={{ padding: 10, margin: 10 }} mode="contained"
                color="#099e78"
                onPress={() => navigation.navigate('AsgDetails')}>Assignment/Quizes</Button>
            <Button style={{ padding: 10, margin: 10 }} mode="contained" color="#099e78"
                onPress={() => navigation.navigate('ExamsDetails')}
            >Exam Results</Button>
        </View>
    )
}
export default StudentPerformance

const styles = StyleSheet.create({})