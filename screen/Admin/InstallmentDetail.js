import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
const InstallmentDetail = ({ route }) => {
    const { item } = route.params;
    console.log("data", item);
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
                <Button code="contained" color='white' style={{ backgroundColor: '#099e78' }}>Approve</Button>
                <Button code="outlined" color='white' style={{ backgroundColor: 'red', }}>Reject</Button>
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