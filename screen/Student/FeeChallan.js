import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ToastAndroid, Alert, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import IP from '../ip';
import Pdf from 'react-native-pdf';
import PDFView from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'
import { FAB } from 'react-native-paper';
const FeeChallan = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { feeInfo } = route.params;
    const [pdf, setPdf] = useState("");
    let totalAmount = feeInfo.semesterFee + feeInfo.otherFee + feeInfo.extraCourseFee + feeInfo.admissionFee;
    console.log(totalAmount, "totalAmount");
    const [pdfUri, setPdfUri] = useState('');
    const [selectedValue, setSelectedValue] = useState(0);
    const [ins1, setIns1] = useState(0);
    const [ins2, setIns2] = useState(0);
    const [ins3, setIns3] = useState(0);
    const [amounts, setAmounts] = useState([]);

    const handleChangeAmount = (index, value) => {
        const updatedAmounts = [...amounts];
        updatedAmounts[index] = value;
        setAmounts(updatedAmounts);
        console.log(updatedAmounts);
    };
    const requestWritePermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Write Permission',
                    message: 'This app needs permission to write files to your device.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            return true;
        }
    };
    const GenerateChallan = async () => {
        // const installmentAmount = generateInstallments(totalAmount, parseInt(selectedValue));
        // console.log(installmentAmount, "Yeh haii");
        if (selectedValue == 1) {
            setIsLoading(true);
            let installmentAmount = [totalAmount];
            const user_name = await AsyncStorage.getItem('username');
            const model = {
                regNo: user_name,
                semesterFee: feeInfo.semesterFee,
                admissionFee: feeInfo.admissionFee,
                extraCourseFee: feeInfo.extraCourseFee,
                otherFee: feeInfo.otherFee,
                installmentAmount
            };
            const query = `http://${IP}/StudentPortal/api/Student/GenerateChallan`;
            try {
                const response = await fetch(query, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(model),
                });
                console.log('Generating........');
                const data = await response.json();
                setPdf(data);
                console.log(data);
                ToastAndroid.show('Challan Generated !!', ToastAndroid.SHORT);
                const granted = await requestWritePermission();
                if (granted) {
                    const dirs = RNFetchBlob.fs.dirs;
                    const path = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
                    const pdfPath = `${path}/challan${user_name}.pdf`;
                    const result = await RNFetchBlob.config({
                        path: pdfPath,
                    }).fetch('GET', `http://${IP}/StudentPortal/ChallanFiles/${data}`);
                    setPdfUri(`file://${pdfPath}`);
                    console.log('PDF downloaded and saved to:', pdfPath);
                    Alert.alert('Challan Downloaded at', pdfPath);
                } else {
                    console.log('Write permission denied.');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false)
            }
        }
        else if (selectedValue == 2 || selectedValue == 3) {
            try {
                if (amounts.length == 2 || amounts.length == 3) {
                    setIsLoading(true);
                    let installmentAmount = amounts;
                    const user_name = await AsyncStorage.getItem('username');
                    const model = {
                        regNo: user_name,
                        semesterFee: feeInfo.semesterFee,
                        admissionFee: feeInfo.admissionFee,
                        extraCourseFee: feeInfo.extraCourseFee,
                        otherFee: feeInfo.otherFee,
                        installmentAmount
                    };
                    const query = `http://${IP}/StudentPortal/api/Student/InstallmentRequest`;
                    const response = await fetch(query, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(model),
                    });
                    console.log('Generating........');
                    // const data = await response.json();
                    // console.log(data);
                    ToastAndroid.show("Request done", ToastAndroid.BOTTOM);
                    setIsLoading(false)
                }
                else {
                    ToastAndroid.show("Enter amounts", ToastAndroid.BOTTOM);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false)
            }
        }
        else {
            alert("Please select number of installments");
        }
    };
    const uri = `${IP}/StudentPortal/ChallanFiles/${pdf}`;
    console.log(uri);
    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    mode='modal'
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Select Installment" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>
            </View>
            <View style={{ marginVertical: 10 }}>
                {selectedValue === '2' && (
                    <>
                        <TextInput
                            mode="outlined"
                            onChangeText={(val) => handleChangeAmount(0, val)}
                            style={styles.btnStyle}
                            label="Enter Amount 1"
                        />
                        <TextInput
                            mode="outlined"
                            onChangeText={(val) => handleChangeAmount(1, val)}
                            style={styles.btnStyle}
                            label="Enter Amount 2"
                        />
                    </>
                )}

                {selectedValue === '3' && (
                    <>
                        <TextInput
                            mode="outlined"
                            onChangeText={(val) => handleChangeAmount(0, val)}
                            style={styles.btnStyle}
                            label="Enter Amount 1"
                        />
                        <TextInput
                            mode="outlined"
                            onChangeText={(val) => handleChangeAmount(1, val)}
                            style={styles.btnStyle}
                            label="Enter Amount 2"
                        />
                        <TextInput
                            mode="outlined"
                            onChangeText={(val) => handleChangeAmount(2, val)}
                            style={styles.btnStyle}
                            label="Enter Amount 3"
                        />
                    </>
                )}

                {/* Display the amounts stored in the array */}


            </View>
            {/* <Button style={styles.btn} color={'white'} onPress={() => GenerateChallan()}>Generate Challan</Button> */}
            <>
                <TouchableOpacity
                    style={[styles.btn, { opacity: isLoading ? 0.5 : 1 }]} // Adjust opacity when loading
                    activeOpacity={0.8}
                    onPress={() => GenerateChallan()}
                    disabled={isLoading} // Disable the button when loading
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonLabel}>Generate Challan</Text>
                    )}
                </TouchableOpacity>
            </>
            <FAB
                style={styles.fab}
                small
                label='View Challan'
                onPress={() => navigation.navigate("ViewChallan", { pdf })}
            />
        </View>
    );
};
export default FeeChallan;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#099e78'
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20
    },
    picker: {
        height: 50,
        color: 'black',
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    btn: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#099e78',
        borderRadius: 5
    },
    buttonLabel: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    btnStyle:
    {
        marginHorizontal: 50,
        marginVertical: 1
    }
});

