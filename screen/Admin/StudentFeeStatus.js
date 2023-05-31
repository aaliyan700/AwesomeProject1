import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
import { Button, TextInput } from 'react-native-paper';
import { calendarFormat } from 'moment';
import { Appbar, Menu, Divider, Provider, Dialog } from 'react-native-paper';
const StudentFeeStatus = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState(0);
    // const showDialog = () => setVisible(true);
    const showDialog = (id) => {
        setVisible(true);
        setId(id);
        console.log("id", id);
    }
    const hideDialog = () => setVisible(false);
    const handleInputChange = (text) => setInputValue(text);
    const { item } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [feeStatus, setFeeStatus] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [singleFile, setSingleFile] = useState({});
    const [feeId, setFeeId] = useState(0);
    const [status, setStatus] = useState(item.status);
    const getFeeStatus = async () => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Admin/GetFeeStatus?reg_no=${item.regNo}`;
            console.log(query);
            const response = await fetch(query, {
                method: 'GET',
            });
            console.log('Done');
            const data = await response.json();
            setFeeStatus(data);
            setFeeId(data.fee_id);
            console.log('Fee Status', data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const approveFee = async (id) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/ApproveFee?challanId=${id}`, {
                method: 'POST',
            }
            );
            alert("Approved");
            setStatus(true);
            await getFeeStatus();
            () => navigation.navigate("StudentList")
        } catch (err) {
            console.log(err);
        }
    }
    const rejectFee = async () => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/RejectFee?challanId=${id}&&remarks=${inputValue}`, {
                method: 'POST',
            }
            );
            alert("Rejected");
            setStatus(true);
            await getFeeStatus();
            () => navigation.navigate("StudentList")
        } catch (err) {
            console.log(err);
        }
    }
    const renderItem = ({ item }) => {
        console.log("Enter")
        if (!item) {
            console.log("out")
            return <Text>No challan generated yet</Text>;
        }
        else {
            return (
                <View style={styles.feeContainer}>
                    <Text style={styles.fontStyle}>Installment No: {item.installment_no}</Text>
                    <Text style={styles.fontStyle}>Amount: {item.amount}</Text>
                    <Text style={styles.fontStyle}>Expiry Date: {item.expiry_date}</Text>
                    <Text style={styles.fontStyle}>Issue Date: {item.issue_date}</Text>
                    <View style={{ marginHorizontal: 30 }}>
                        {item.challan_image ? (
                            <Image
                                source={{ uri: `http://${IP}/StudentPortal/ChallanImages/${item.challan_image}` }}
                                style={{ alignSelf: 'center', height: 200, width: 300, resizeMode: 'contain' }}
                            />
                        ) : (
                            <Text>Not Uploaded Yet...</Text>
                        )}
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {item.status ? (
                            <Button mode="contained" style={styles.btn1} onPress={() => showDialog(item.id)}>
                                Reject
                            </Button>
                        ) : (
                            <Button mode="contained" style={styles.btn1} onPress={() => approveFee(item.id)}>
                                Approve
                            </Button>
                        )}
                    </View>
                </View>
            );
        }
    };


    // const renderItem = ({ item }) => {
    //     return (
    //         <View style={styles.feeContainer}
    //         >
    //             <Text style={styles.fontStyle}>Installment No:{item.installment_no}</Text>
    //             <Text style={styles.fontStyle}>Amount:{item.amount}</Text>
    //             <Text style={styles.fontStyle}>Expiry Date:{item.expiry_date}</Text>
    //             <Text style={styles.fontStyle}>Issue Date:{item.issue_date}</Text>
    //             <View style={{ marginHorizontal: 30 }}>
    //                 {
    //                     item.challan_image ? (
    //                         <Image source={{ uri: `http://${IP}/StudentPortal/ChallanImages/${item.challan_image}` }} style={{ alignSelf: 'center', height: 200, width: 300, resizeMode: 'contain' }} />
    //                     ) :
    //                         (
    //                             <Text>Not Uploaded Yet...</Text>
    //                         )
    //                 }
    //             </View>
    //             <View style={{ alignItems: 'center' }}>
    //                 {item.status ? (
    //                     <Button mode="contained" style={styles.btn1} onPress={() => showDialog(item.id)}>Reject</Button>
    //                 ) : (
    //                     <Button mode="contained" style={styles.btn1} onPress={() => approveFee(item.id)}>Approve</Button>
    //                 )}
    //             </View>
    //         </View>
    //     );
    // };
    useEffect(() => {
        getFeeStatus();
    }, []);
    const onRefresh = () => {
        setRefreshing(true);
        getFeeStatus();
        setRefreshing(false);
    };
    return (
        <Provider>
            <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#099e78" />
                ) : (
                    <View>
                        <FlatList
                            data={feeStatus}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        />
                    </View>
                )}
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Enter Remarks</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter  Remarks"
                            value={inputValue}
                            onChangeText={handleInputChange}
                            mode='outlined'
                            style={{ height: 200 }}
                            multiline
                        />
                        <Button mode="contained" style={styles.btn} onPress={() => rejectFee()}>Submit</Button>
                    </Dialog.Content>
                </Dialog>
            </View >
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feeContainer:
    {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        //alignItems: 'center',
        elevation: 7,
        borderRadius: 10,
    },
    fontStyle:
    {
        color: 'black',
        fontSize: 15,
        textAlign: 'left'
    },
    btn:
    {
        backgroundColor: '#099e78',
        margin: 5
    },
    btn1:
    {
        width: 150,
        backgroundColor: '#099e78',
        margin: 2
    }
});

export default StudentFeeStatus;