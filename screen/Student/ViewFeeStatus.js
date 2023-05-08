import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../ip';
const ViewFeeStatus = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feeStatus, setFeeStatus] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [singleFile, setSingleFile] = useState({});
    const [feeId, setFeeId] = useState(0);
    const getFeeStatus = async () => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetFeeStatus?reg_no=${reg_no}`;
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
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.feeContainer}
                onPress={() => navigation.navigate("UploadChallan", { item })}>
                <Text style={styles.fontStyle}>Installment No:{item.installment_no}</Text>
                <Text style={styles.fontStyle}>Amount:{item.amount}</Text>
                <Text style={styles.fontStyle}>Expiry Date:{item.expiry_date}</Text>
                <Text style={styles.fontStyle}>Issue Date:{item.issue_date}</Text>
                {/* <Button mode="contained" style={styles.btn} onPress={() => uploadFile(item.id)}>Upload Challan</Button>
                <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("UploadChallan")}>Upload Challan</Button> */}
                {item.status ? (
                    <Text>Paid</Text>
                ) : (
                    <Text>Not Paid</Text>
                )}
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        getFeeStatus();
    }, []);
    const onRefresh = () => {
        setRefreshing(true);
        getFeeStatus();
        setRefreshing(false);
    };
    return (
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
        </View >
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
        alignItems: 'center',
        elevation: 7,
        borderRadius: 10,
    },
    fontStyle:
    {
        color: 'black',
        fontSize: 15
    },
    btn:
    {
        backgroundColor: '#099e78',
        margin: 5
    }
});

export default ViewFeeStatus;
