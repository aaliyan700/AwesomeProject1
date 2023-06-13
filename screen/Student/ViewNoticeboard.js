// import { StyleSheet, Text, View, ScrollView } from 'react-native'
// import React, { useState, useEffect, FlatList } from 'react'
// import IP from '../ip'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Picker } from '@react-native-picker/picker'
// const ViewNoticeboard = () => {
//     const [noticeboard, setNoticeBoard] = useState([]);
//     const [select, setSelect] = useState("")
//     const [author, setAuthor] = useState([]);
//     useEffect(() => {
//         GetNoticeboardInformation();
//     }, [])
//     const GetNoticeboardInformation = async () => {
//         console.log('fetching...');
//         const reg_no = await AsyncStorage.getItem('username');
//         console.log(reg_no);
//         try {
//             const query = `http://${IP}/StudentPortal/api/Student/GetNoticeboardInformation?reg_no=${reg_no}`;
//             console.log(query);
//             const response = await fetch(query, {
//                 method: 'GET',
//             });
//             console.log('Done');
//             const data = await response.json();
//             setNoticeBoard(data);
//             console.log('data', data);
//             let temp = [];
//             data.map((item) => {
//                 temp.push(item.author);
//             })
//             setAuthor(temp);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
//     const onValueChange = (value) => {
//         setSelect(value);
//     };
//     console.log("author", author);
//     console.log("select", select);
//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         style={styles.picker}
//                         mode='modal'
//                         selectedValue={select}
//                         onValueChange={onValueChange}
//                     >
//                         <Picker.Item label="Select Author" />
//                         {
//                             author && author.length > 0 &&
//                             author.map((session, index) => {
//                                 console.log(index, 'index');
//                                 // Check if the session is an admin session
//                                 const isAdminSession = session.includes('admin');
//                                 // Concatenate "Mr." with the label for admin sessions
//                                 const label = isAdminSession ? session : `Mr. ${session}`;
//                                 return (
//                                     <Picker.Item key={index} label={label.toUpperCase()} value={session} />
//                                 );
//                             })
//                         }
//                     </Picker>

//                 </View>
//                 {
//                     noticeboard?.map((item, index) => {
//                         return (
//                             <View key={index} style={styles.card}>
//                                 <Text style={styles.font}>Title:{item.title}</Text>
//                                 <Text style={styles.font}>Description:{item.description}</Text>
//                                 <Text style={styles.font}>By {item.author} On {item.date}</Text>
//                             </View>
//                         )
//                     })
//                 }
//             </ScrollView>
//         </View>
//     )
// }

// export default ViewNoticeboard

// const styles = StyleSheet.create({
//     container:
//     {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     card:
//     {
//         backgroundColor: "white",
//         marginHorizontal: 20,
//         marginVertical: 20,
//         padding: 15,
//         elevation: 9
//     },
//     font:
//     {
//         fontSize: 16,
//         margin: 5,
//         color: 'black'
//     },
//     picker: {
//         height: 50,
//         color: 'black',
//         fontSize: 16,
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderRadius: 4,
//         borderColor: 'gray',
//         backgroundColor: 'white',
//         marginHorizontal: 20,
//         marginBottom: 20,
//         marginTop: 20
//     },

// })


import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ViewNoticeboard = () => {
    const [noticeboard, setNoticeBoard] = useState([]);
    const [select, setSelect] = useState('');
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        GetNoticeboardInformation();
    }, []);

    const GetNoticeboardInformation = async () => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetNoticeboardInformation?reg_no=${reg_no}`;
            console.log(query);
            const response = await fetch(query, {
                method: 'GET',
            });
            console.log('Done');
            const data = await response.json();
            setNoticeBoard(data);
            console.log('data', data);
            let temp = new Set(); // Use a Set to store unique author values
            data.map((item) => {
                temp.add(item.author); // Add each author to the Set
            });
            setAuthor(Array.from(temp));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onValueChange = (value) => {
        setSelect(value);
    };

    console.log('author', author);
    console.log('select', select);

    const filteredNoticeboard = select
        ? noticeboard.filter((item) => item.author === select)
        : noticeboard;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        mode="modal"
                        selectedValue={select}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="Select Author" />
                        {author &&
                            author.length > 0 &&
                            author.map((session, index) => {
                                console.log(index, 'index');
                                const isAdminSession = session.includes('admin');
                                const label = isAdminSession ? session : `Mr. ${session}`;
                                return (
                                    <Picker.Item
                                        key={index}
                                        label={label.toUpperCase()}
                                        value={session}
                                    />
                                );
                            })}
                    </Picker>
                </View>
                {filteredNoticeboard?.map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={styles.font}>Title: {item.title}</Text>
                            <Text style={styles.font}>Description: {item.description}</Text>
                            <Text style={styles.font}>
                                By {item.author.toUpperCase()} On {item.date}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default ViewNoticeboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 15,
        elevation: 9,
    },
    font: {
        fontSize: 16,
        margin: 5,
        color: 'black',
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
        marginTop: 20,
    },
});


