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
    const [selectedValue, setSelectedValue] = useState(1);
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
    const [inst, setInst] = useState([]);
    console.log(pdfUri + ">>>>>>>>>");
    const GenerateChallan = async () => {
        setIsLoading(true);
        const installmentAmount = generateInstallments(totalAmount, parseInt(selectedValue));
        console.log(installmentAmount, "Yeh haii");
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
    };
    function generateInstallments(totalFee, numInstallments) {
        let installments = [];
        if (numInstallments === 1) {
            // Only one installment, set it to the total fee
            installments.push(totalAmount);
        } else if (numInstallments === 2) {
            // Two installments, first is 60% of the total fee, second is 40%
            const firstInstallment = Math.round(totalFee * 0.6);
            const secondInstallment = totalFee - firstInstallment;
            installments.push(firstInstallment, secondInstallment);
        } else if (numInstallments === 3) {
            // Three installments, first is 60% of the total fee, second and third are 20% each
            const firstInstallment = Math.round(totalFee * 0.6);
            const remainingFee = totalFee - firstInstallment;
            const remainingInstallments = Math.round(remainingFee / 2);
            installments.push(
                firstInstallment,
                remainingInstallments,
                remainingInstallments
            );
        } else {
            // Unsupported number of installments
            throw new Error("Unsupported number of installments.");
        }
        // Make sure the installments add up to the total fee
        const sum = installments.reduce((a, b) => a + b.fee, 0);
        if (sum !== totalFee) {
            const diff = totalFee - sum;
            installments[installments.length - 1].fee += diff;
        }
        return installments;
    }
    useEffect(() => {
        console.log(generateInstallments(totalAmount, 3));
    }, [])
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
});

