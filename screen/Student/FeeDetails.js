import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
const FeeDetails = ({ navigation }) => {
    const [feeInfo, setFeeInfo] = useState({});
    const getFeeDetails = async () => {
        try {
            const user_name = await AsyncStorage.getItem('username');
            console.log(user_name);
            const query = `http://${IP}/StudentPortal/api/Student/GetFeeDetail?reg_no=${user_name}`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            console.log(data);
            setFeeInfo(data);
            setTotalFee(data.semesterFee + data.extraCourseFee + data.otherFee + data.admissionFee);
        } catch (error) {
            console.warn(error);
            setLoading(true);
            Alert.alert('Error', 'Unable to fetch fee details');
        }
    }
    useEffect(() => {
        getFeeDetails();
    }, [])

    const generateChallan = () => {
        // Call API to generate challan
        Alert.alert('Challan Generated', 'Your challan has been generated');
    }
    const [totalFee, setTotalFee] = useState(0);
    const renderButton = () => {
        if (feeInfo.status === "pending") {
            return (
                <Button mode="contained" style={styles.btn1} onPress={() => navigation.navigate("FeeChallan", { feeInfo })}>
                    Generate Challan
                </Button>
            );
        } else if (feeInfo.status === "dateEnd") {
            return (
                <Button mode="contained" style={styles.btn1}>
                    Date End
                </Button>
            )
        }
        else if (feeInfo.status === "requested") {
            return (
                <Button mode="contained" style={styles.btn1}>
                    Requested
                </Button>
            );
        } else if (feeInfo.status === "generated") {
            return (
                <View>
                    <Button mode="contained" style={styles.btn1} onPress={() => navigation.navigate("ViewFeeStatus")}>
                        View Fee Status
                    </Button>
                    <Button mode="contained" style={styles.btn1} onPress={() => navigation.navigate("ViewChallan")}>
                        View Challan
                    </Button>
                </View>

            );
        }


    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'red', padding: 50, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, backgroundColor: '#099e78', elevation: 7 }}>
                <Text style={styles.containerFont}>Total Fee</Text>
                <Text style={styles.containerFont}>{totalFee}</Text>
            </View>
            <View style={styles.container2}>
                <View style={styles.box}>
                    <Text style={styles.containerFont2}>Semester Fee</Text>
                    <Text style={styles.containerFont2}>{feeInfo.semesterFee}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 15, color: 'white' }}>Extra Course Fee</Text>
                    <Text style={{ fontSize: 15, color: 'white' }} >{feeInfo.extraCourseFee}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 15, color: 'white' }}>Other Fee</Text>
                    <Text style={{ fontSize: 15, color: 'white' }}>{feeInfo.otherFee}</Text>
                </View>
            </View>
            {/* {!feeInfo.isChallanGenerated && (
                <Button title="Generate Challan" onPress={generateChallan} />
            )} */}
            <View style={styles.btnDesign}>
                {/* <Button mode='contained' style={styles.btn1} onPress={() => navigation.navigate("ViewFeeStatus")}>View Fee Status</Button>
                <Button mode='contained' style={styles.btn1} onPress={() => navigation.navigate("FeeChallan", { feeInfo })}>Generate Challan</Button> */}
                <>{renderButton()}</>
            </View>
        </View>
    )
}

export default FeeDetails

const styles = StyleSheet.create({
    containerDesign:
    {
        alignItems: 'center',
        padding: 50,
        marginTop: "10%",
        backgroundColor: 'white',
        marginHorizontal: 20,
        elevation: 7,
        borderRadius: 20,
        backgroundColor: '#099e78'
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    containerFont:
    {
        color: 'white',
        fontSize: 20,
        marginVertical: 2
    },
    containerFont2:
    {
        color: 'white',
        fontSize: 16,
        marginVertical: 2
    },
    btn:
    {
        backgroundColor: '#099e78'
    },
    btn1:
    {
        backgroundColor: '#099e78',
        marginHorizontal: 20,
        padding: 10,
        marginVertical: 5
    },
    btnDesign:
    {
        marginVertical: '10%'
    },
    box: {
        flex: 1,
        backgroundColor: '#B8D696',
        height: 100,
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 7,
        marginBottom: 20
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        margin: 10,
    },
})
