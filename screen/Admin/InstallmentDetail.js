import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import IP from '../ip';
const InstallmentDetail = ({ route }) => {
    const { item } = route.params;
    console.log("data", item);
    console.log("ID", item.id);
    const [isLoading, setIsLoading] = useState(false);
    const approveFee = async () => {
        console.log("data");
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Student/AcceptInstallmentRequest?id=${item.id}`,
                {
                    method: 'POST',
                }
            );
            //const data = await response.json();
            //console.log("reposne", data);
            setIsLoading(false);
            Alert.alert('Approve Fine', 'Approved');
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };
    const rejectFee = async () => {
        console.log("data");
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Student/RejectInstallmentRequest?id=${item.id}`,
                {
                    method: 'POST',
                }
            );
            //const data = await response.json();
            //console.log("reposne", data);
            Alert.alert('Reject', 'Rejected');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                <Text style={{ fontWeight: '800' }}>{item.reg_no}</Text>
            </View>
            {
                item.installments?.map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={{ fontWeight: '600' }}>Installmnt No: {item.installment_no}</Text>
                            <Text style={{ fontWeight: '600' }}>Amount: {item.amount}</Text>
                        </View>
                    )
                })
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, padding: 10 }}>
                {/* <Button
                    code="contained"
                    color="white"
                    style={{ backgroundColor: '#099e78' }}
                    onPress={approveFee}
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? 'Loading...' : 'Approve'}
                </Button> */}
                <Button
                    mode="contained"
                    style={{ backgroundColor: '#099e78' }}
                    onPress={approveFee}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Approve'}
                </Button>
                <Button code="outlined" color='white' style={{ backgroundColor: 'red', }} onPress={rejectFee}>Reject</Button>
            </View>

        </View>
    )
}

export default InstallmentDetail

const styles = StyleSheet.create({
    card:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 8
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    header:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 90,
        marginTop: 30
    },
})