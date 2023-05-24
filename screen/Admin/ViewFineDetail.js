import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import IP from '../ip'
const ViewFineDetail = ({ route }) => {
    const { item } = route.params;
    console.log(">>", item);
    const approveFine = async (id) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/ApproveFine?id=${id}`,
                {
                    method: 'POST',
                }
            );
            Alert.alert('Approve Fine', 'Yes your fine is approved');
            await GetStudents();
        } catch (err) {
            console.log(err);
        }
    };

    const rejectFine = async (id) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/RejectFine?id=${id}`,
                {
                    method: 'POST',
                }
            );
            Alert.alert('Reject Fine', 'Sorry your fine is Rejected');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ elevation: 7, backgroundColor: 'white', marginHorizontal: 20, padding: 20, marginVertical: 50 }}>
                <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <View>
                        <Text style={styles.fontDesign}>Reg No</Text>
                        <Text style={styles.fontDesign}>Name</Text>
                        <Text style={styles.fontDesign}>Class</Text>
                        <Text style={styles.fontDesign}>Date</Text>
                        <Text style={styles.fontDesign}>Description</Text>
                        <Text style={styles.fontDesign}>Amount</Text>
                    </View>
                    <View>
                        <Text style={styles.fontDesign}>{item.reg_no}</Text>
                        <Text style={styles.fontDesign}>{item.name}</Text>
                        <Text style={styles.fontDesign}>B{item.program}{item.semester}{item.section}</Text>
                        <Text style={styles.fontDesign}>{item.date}</Text>
                        <Text style={styles.fontDesign}>{item.description}</Text>
                        <Text style={styles.fontDesign}>{item.amount}</Text>
                    </View>

                </View>
                <View>
                    {
                        item.receipt ? (
                            <Image source={{ uri: `http://${IP}/StudentPortal/FineReceiptImages/${item.receipt}` }} style={{ alignSelf: 'center', height: 200, width: 400, resizeMode: 'contain' }} />
                        ) :
                            (
                                <Text>Not Uploaded Yet...</Text>
                            )
                    }
                </View>
            </View>
        </View >
    )
}

export default ViewFineDetail

const styles = StyleSheet.create({
    fontDesign: {
        color: 'black',
        fontSize: 15,
        fontStyle: 'italic',
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    Btn: {
        backgroundColor: '#099e78',
        marginHorizontal: 2,
        marginVertical: 5,
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
})