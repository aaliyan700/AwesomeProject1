// import {
//     StyleSheet, Text, View, FlatList, Image, ActivityIndicator,
//     RefreshControl, TouchableOpacity, Pressable
// } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import IP from '../ip';
// import { TextInput } from 'react-native-paper';
// import { RadioButton } from 'react-native-paper';
// const StudentList = ({ navigation }) => {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);
//     const [checked, setChecked] = useState('first');
//     const GetStudents = async () => {
//         try {
//             let query = `http://${IP}/StudentPortal/api/Admin/GetStudents`;
//             const response = await fetch(query, { method: 'GET' });
//             const data = await response.json();
//             console.log(data);
//             setStudents(data);
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         GetStudents();
//     }, []);
//     const renderItem = ({ item }) => (
//         <Pressable style={styles.mainDiv}
//             onPress={() => navigation.navigate('StudentFeeStatus', { item })}>
//             <View>
//                 <Text style={styles.fontDesign}>{item.regNo}</Text>
//                 <Text style={styles.fontDesign}>{item.name}</Text>
//                 <Text style={styles.fontDesign}>B{item.program}{item.semester}{item.section}</Text>
//                 <Text style={styles.fontDesign}>{item.session}</Text>
//                 {item.isPending === false ? (
//                     <Text style={styles.fontDesign}> Paid</Text> // Render "Not Paid" if isPending is false
//                 ) : (
//                     <Text style={styles.fontDesign}>Not Paid</Text> // Render "Paid" if isPending is true
//                 )}
//             </View>
//             <View style={styles.subDiv}>
//                 {
//                     item.profile_photo ? (
//                         <Image source={{ uri: `http://${IP}/StudentPortal/ProfileImages/${item.profile_photo}` }} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 50 }} />
//                     ) :
//                         (
//                             <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 400 / 2 }} />
//                         )
//                 }
//             </View>
//         </Pressable>
//     );




//     const onRefresh = () => {
//         setRefreshing(true);
//         GetStudents();
//         setRefreshing(false);
//     };

//     return (
//         <View style={styles.container}>
//             <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30 }}>
//                     <View style={{ flexDirection: 'row', backgroundColor: 'white', elevation: 7, borderRadius: 10 }}>
//                         <Text style={{ margin: 10, color: 'black' }}>All</Text>
//                         <RadioButton value='all' label="all" />
//                         <Text style={{ margin: 10, color: 'black' }}>Paid</Text>
//                         <RadioButton value='false' label="false" />
//                         <Text style={{ margin: 10, color: 'black' }}>Pending</Text>
//                         <RadioButton value='true' label="true" />
//                     </View>
//                 </View>
//             </RadioButton.Group>
//             {loading ? (
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size='large' color='#099e78' />
//                     <Text style={styles.loadingText}>Loading Students..</Text>
//                 </View>
//             ) : (
//                 <FlatList
//                     data={students}
//                     renderItem={renderItem}
//                     keyExtractor={item => item.id}
//                     refreshControl={
//                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                     }
//                 />
//             )}
//         </View>
//     )
// }

// export default StudentList

// const styles = StyleSheet.create({
//     container:
//     {
//         backgroundColor: 'white',
//         flex: 1,
//     },
//     mainDiv:
//     {
//         flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', elevation: 7, padding: 10, marginHorizontal: 10, marginVertical: 10
//     },
//     subDiv:
//     {
//         flexDirection: 'row-reverse', marginRight: 20
//     },
//     fontDesign:
//     {
//         color: 'black',
//         fontSize: 15,
//         fontStyle: 'italic',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#099e78'
//     }
// })


import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator, RefreshControl, Image, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import IP from '../ip';
import { TextInput } from 'react-native-paper';

const StudentList = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [checked, setChecked] = useState('all');

    const GetStudents = async () => {
        try {
            const query = `http://${IP}/StudentPortal/api/Admin/GetStudents`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            console.log(data);
            setStudents(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        GetStudents();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        GetStudents();
        setRefreshing(false);
    };

    const renderStudentItem = (item) => {
        const isPending = item?.isPending;

        if (checked === 'true' && isPending !== false) {
            return null; // Skip rendering for non-paid students when "Paid" filter is selected
        } else if (checked === 'asg' && isPending !== true) {
            return null; // Skip rendering for paid students when "Pending" filter is selected
        }

        return (
            <Pressable
                style={styles.mainDiv}
                onPress={() => navigation.navigate('StudentFeeStatus', { item })}
            >
                <View>
                    <Text style={styles.fontDesign}>{item?.regNo}</Text>
                    <Text style={styles.fontDesign}>{item?.name}</Text>
                    <Text style={styles.fontDesign}>B{item?.program}{item?.semester}{item?.section}</Text>
                    <Text style={styles.fontDesign}>{item?.session}</Text>
                    {isPending === false ? (
                        <Text style={styles.fontDesign}>Paid</Text>
                    ) : (
                        <Text style={styles.fontDesign}>Not Paid</Text>
                    )}
                </View>
                <View style={styles.subDiv}>
                    {item?.profile_photo ? (
                        <Image
                            source={{ uri: `http://${IP}/StudentPortal/ProfileImages/${item?.profile_photo}` }}
                            style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 50 }}
                        />
                    ) : (
                        <Image
                            source={require('../images/avatar-icon.png')}
                            style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 400 / 2 }}
                        />
                    )}
                </View>
            </Pressable>
        );
    };

    return (

        <View style={styles.container}>
            <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', elevation: 7, borderRadius: 10 }}>
                        <Text style={{ margin: 10, color: 'black' }}>All</Text>
                        <RadioButton value='all' label="all" />
                        <Text style={{ margin: 10, color: 'black' }}>Paid</Text>
                        <RadioButton value='true' label="asg" />
                        <Text style={{ margin: 10, color: 'black' }}>Pending</Text>
                        <RadioButton value='asg' label="asg" />
                    </View>
                </View>
            </RadioButton.Group>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#099e78' />
                    <Text style={styles.loadingText}>Loading Students..</Text>
                </View>
            ) : (
                <ScrollView>
                    <View>
                        {students.map((item) => renderStudentItem(item))}
                    </View>
                </ScrollView>
            )}
        </View>

    );
};

export default StudentList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    mainDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 7,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    subDiv: {
        flexDirection: 'row-reverse',
        marginRight: 20,
    },
    fontDesign: {
        color: 'black',
        fontSize: 15,
        fontStyle: 'italic',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#099e78',
    },
});









