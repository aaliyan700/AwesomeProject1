// import React, { useState, useEffect } from 'react';
// import { Text, TouchableOpacity, View, StyleSheet, ToastAndroid, Alert, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import RNFetchBlob from 'rn-fetch-blob';
// import IP from '../ip';
// import Pdf from 'react-native-pdf';
// import PDFView from 'react-native-pdf';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker'
// import { FAB } from 'react-native-paper';
// import { Button as PaperButton } from 'react-native-paper';
// const FeeChallan = ({ route, navigation }) => {
//     const { feeInfo } = route.params;
//     const totalAmount = feeInfo.semesterFee + feeInfo.otherFee + feeInfo.extraCourseFee + feeInfo.admissionFee;
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedValue, setSelectedValue] = useState(0);
//     const [pendingFee, setPendingFee] = useState(totalAmount);
//     const [installmentAmounts, setInstallmentAmount] = useState([]);
//     console.log(installmentAmounts, 'install')
//     const [pdfUri, setPdfUri] = useState('');
//     const [pdf, setPdf] = useState([]);
//     const GenerateChallan = async () => {
//         // const installmentAmount = generateInstallments(totalAmount, parseInt(selectedValue));
//         // console.log(installmentAmount, "Yeh haii");
//         if (selectedValue == 1) {
//             setIsLoading(true);
//             let installmentAmount = [totalAmount];
//             const user_name = await AsyncStorage.getItem('username');
//             const model = {
//                 regNo: user_name,
//                 semesterFee: feeInfo.semesterFee,
//                 admissionFee: feeInfo.admissionFee,
//                 extraCourseFee: feeInfo.extraCourseFee,
//                 otherFee: feeInfo.otherFee,
//                 installmentAmount
//             };
//             const query = `http://${IP}/StudentPortal/api/Student/GenerateChallan`;
//             try {
//                 const response = await fetch(query, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(model),
//                 });
//                 console.log('Generating........');
//                 const data = await response.json();
//                 setPdf(data);
//                 console.log(data);
//                 ToastAndroid.show('Challan Generated !!', ToastAndroid.SHORT);
//                 const granted = await requestWritePermission();
//                 if (granted) {
//                     const dirs = RNFetchBlob.fs.dirs;
//                     const path = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
//                     const pdfPath = `${path}/challan${user_name}.pdf`;
//                     const result = await RNFetchBlob.config({
//                         path: pdfPath,
//                     }).fetch('GET', `http://${IP}/StudentPortal/ChallanFiles/${data}`);
//                     setPdfUri(`file://${pdfPath}`);
//                     console.log('PDF downloaded and saved to:', pdfPath);
//                     Alert.alert('Challan Downloaded at', pdfPath);
//                     navigation.navigate("Finance")
//                 } else {
//                     console.log('Write permission denied.');
//                 }
//             } catch (err) {
//                 console.log(err);
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         else if (selectedValue == 2 || selectedValue == 3) {
//             if (pendingFee < 0 || pendingFee == 0) {
//                 alert('Please enter the valid installments')
//             }
//             else {
//                 try {
//                     console.log("Installment ", installmentAmount);
//                     setIsLoading(true);
//                     let installmentAmount = [installmentAmounts, pendingFee];

//                     console.log(installmentAmount, 'updated');
//                     //let installmentAmount = [updatedInstallment]
//                     // const user_name = await AsyncStorage.getItem('username');
//                     // const model = {
//                     //     regNo: user_name,
//                     //     semesterFee: feeInfo.semesterFee,
//                     //     admissionFee: feeInfo.admissionFee,
//                     //     extraCourseFee: feeInfo.extraCourseFee,
//                     //     otherFee: feeInfo.otherFee,
//                     //     installmentAmount
//                     // };
//                     // console.log(model);
//                     // const query = `http://${IP}/StudentPortal/api/Student/InstallmentRequest`;
//                     // const response = await fetch(query, {
//                     //     method: 'POST',
//                     //     headers: {
//                     //         'Content-Type': 'application/json',
//                     //     },
//                     //     body: JSON.stringify(model),
//                     // });
//                     // console.log('Generating........');
//                     // // const data = await response.json();
//                     // // console.log(data);
//                     // ToastAndroid.show("Request done", ToastAndroid.BOTTOM);
//                     setIsLoading(false)
//                     navigation.navigate("Finance")
//                 } catch (err) {
//                     console.log(err);
//                     setIsLoading(false)
//                 }
//             }
//         }
//         else {
//             alert("Please select number of installments");
//         }
//     };
//     const requestWritePermission = async () => {
//         if (Platform.OS === 'android') {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//                 {
//                     title: 'Write Permission',
//                     message: 'This app needs permission to write files to your device.',
//                     buttonNeutral: 'Ask Me Later',
//                     buttonNegative: 'Cancel',
//                     buttonPositive: 'OK',
//                 },
//             );
//             return granted === PermissionsAndroid.RESULTS.GRANTED;
//         } else {
//             return true;
//         }
//     };
//     // const handleChangeAmount = (value) => {
//     //     setInstallmentAmount(value);
//     //     console.log("inst", installmentAmounts);
//     //     const remainingFee = totalAmount - value;
//     //     setPendingFee(remainingFee);
//     // };
//     const handleChangeAmount = (index, value) => {
//         const updatedAmounts = [...installmentAmounts];
//         updatedAmounts[index] = value;
//         setInstallmentAmount(updatedAmounts);
//         console.log(updatedAmounts);
//     };


//     const handleSelectedValueChange = (value) => {
//         setSelectedValue(value);
//         setInstallmentAmount(0); // Reset the installment amount
//         setPendingFee(totalAmount); // Reset the pending fee
//     };
//     return (
//         <View style={styles.container}>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     mode='modal'
//                     selectedValue={selectedValue}
//                     style={styles.picker}
//                     onValueChange={handleSelectedValueChange}
//                 >
//                     <Picker.Item label="Select Installment" value="" />
//                     <Picker.Item label="1" value="1" />
//                     <Picker.Item label="2" value="2" />
//                     <Picker.Item label="3" value="3" />
//                 </Picker>
//             </View>
//             {selectedValue === '1' && (
//                 <View style={{ alignItems: 'center', marginVertical: 10 }}>
//                     <TextInput
//                         mode="outlined"
//                         value={totalAmount.toString()}
//                         style={styles.input}
//                         label="Installment 1"
//                         disabled
//                     />
//                 </View>
//             )}
//             {selectedValue === '2' && (
//                 <View style={{ alignItems: 'center', marginVertical: 10 }}>
//                     <TextInput
//                         mode="outlined"
//                         onChangeText={(value) => handleChangeAmount(parseInt(value))}
//                         style={styles.input}
//                         label="Installment 1"
//                     />
//                     <TextInput
//                         mode="outlined"
//                         value={pendingFee.toString()}
//                         style={styles.input}
//                         label="Installment 2"
//                         disabled
//                     />
//                 </View>
//             )}
//             {selectedValue === '3' && (
//                 <View style={{ alignItems: 'center', marginVertical: 10 }}>
//                     <TextInput
//                         mode="outlined"
//                         onChangeText={(value) => handleChangeAmount(parseInt(value))}
//                         style={styles.input}
//                         label="Installment 1"
//                     />
//                     <TextInput
//                         mode="outlined"
//                         onChangeText={(value) => handleChangeAmount(parseInt(value))}
//                         style={styles.input}
//                         label="Installment 2"
//                     />
//                     <TextInput
//                         mode="outlined"
//                         value={pendingFee.toString()}
//                         style={styles.input}
//                         label="Installment 3"
//                         disabled
//                     />
//                 </View>
//             )}
//             <PaperButton
//                 mode="contained"
//                 onPress={GenerateChallan}
//                 disabled={!selectedValue}
//                 style={[styles.btn, { opacity: isLoading ? 0.5 : 1 }]}
//             >
//                 {isLoading ? (
//                     <ActivityIndicator color="white" />
//                 ) : (
//                     <Text style={styles.buttonLabel}>
//                         {selectedValue === '1' ? 'Generate Challan' : 'Request Installments'}
//                     </Text>
//                 )}
//             </PaperButton>

//             {/* <PaperButton
//                 mode="contained"
//                 onPress={GenerateChallan}
//                 disabled={!selectedValue}
//             >
//                 {selectedValue === '1' ? 'Generate Challan' : 'Request Installments'}
//             </PaperButton> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: 'black',
//         borderRadius: 5,
//         marginBottom: 10,
//         width: 200,
//     },
//     picker: {
//         height: 40,
//         width: 200,
//         padding: 10,
//     },
//     input: {
//         width: 200,
//     },
//     btn: {
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonLabel: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     fab: {
//         position: 'absolute',
//         margin: 16,
//         right: 0,
//         bottom: 0,
//         backgroundColor: '#099e78'
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
//     picker: {
//         height: 50,
//         color: 'black',
//         fontSize: 16,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     btn: {
//         padding: 2,
//         marginHorizontal: 20,
//         backgroundColor: '#099e78',
//         borderRadius: 5
//     },
//     buttonLabel: {
//         fontSize: 18,
//         color: 'white',
//         textAlign: 'center'
//     },
//     btnStyle:
//     {
//         marginHorizontal: 50,
//         marginVertical: 1
//     }
// });

// export default FeeChallan;


import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ToastAndroid,
    Alert,
    Platform,
    PermissionsAndroid,
    ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import IP from '../ip';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { FAB } from 'react-native-paper';
import { Button as PaperButton } from 'react-native-paper';

const FeeChallan = ({ route, navigation }) => {
    const { feeInfo } = route.params;
    const totalAmount = feeInfo.semesterFee + feeInfo.otherFee + feeInfo.extraCourseFee + feeInfo.admissionFee;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [pendingFee, setPendingFee] = useState(totalAmount);
    const [installmentAmounts, setInstallmentAmount] = useState([]);

    const GenerateChallan = async () => {
        if (selectedValue === '1') {
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
                    navigation.navigate("Finance")
                } else {
                    console.log('Write permission denied.');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false)
            }
        } else if (selectedValue === '2' || selectedValue === '3') {
            if (pendingFee <= 0) {
                alert('Please enter a valid installment');
            } else {
                try {
                    setIsLoading(true);
                    let installmentAmount = [...installmentAmounts, pendingFee];
                    console.log(installmentAmount, 'updated');
                    const user_name = await AsyncStorage.getItem('username');
                    const model = {
                        regNo: user_name,
                        semesterFee: feeInfo.semesterFee,
                        admissionFee: feeInfo.admissionFee,
                        extraCourseFee: feeInfo.extraCourseFee,
                        otherFee: feeInfo.otherFee,
                        installmentAmount
                    };
                    console.log(model);
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
                    navigation.navigate("Finance");
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                }
            }
        } else {
            alert("Please select number of installments");
        }
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

    const handleChangeAmount = (index, value) => {
        const updatedAmounts = [...installmentAmounts];
        updatedAmounts[index] = parseInt(value);
        setInstallmentAmount(updatedAmounts);
        console.log(updatedAmounts);
        const remainingFee = totalAmount - updatedAmounts.reduce((a, b) => a + b, 0);
        setPendingFee(remainingFee);
    };

    const handleSelectedValueChange = (value) => {
        setSelectedValue(value);
        setInstallmentAmount([]); // Reset the installment amounts
        setPendingFee(totalAmount); // Reset the pending fee
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    mode='modal'
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={handleSelectedValueChange}
                >
                    <Picker.Item label="Select Installment" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>
            </View>
            {selectedValue === '1' && (
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <TextInput
                        mode="outlined"
                        value={totalAmount.toString()}
                        style={styles.input}
                        label="Installment 1"
                        disabled
                    />
                </View>
            )}
            {selectedValue === '2' && (
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <TextInput
                        mode="outlined"
                        onChangeText={(value) => handleChangeAmount(0, value)}
                        style={styles.input}
                        label="Installment 1"
                    />
                    <TextInput
                        mode="outlined"
                        value={pendingFee.toString()}
                        style={styles.input}
                        label="Installment 2"
                        disabled
                    />
                </View>
            )}
            {selectedValue === '3' && (
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <TextInput
                        mode="outlined"
                        onChangeText={(value) => handleChangeAmount(0, value)}
                        style={styles.input}
                        label="Installment 1"
                    />
                    <TextInput
                        mode="outlined"
                        onChangeText={(value) => handleChangeAmount(1, value)}
                        style={styles.input}
                        label="Installment 2"
                    />
                    <TextInput
                        mode="outlined"
                        value={pendingFee.toString()}
                        style={styles.input}
                        label="Installment 3"
                        disabled
                    />
                </View>
            )}
            <PaperButton
                mode="contained"
                onPress={GenerateChallan}
                disabled={!selectedValue}
                style={[styles.btn, { opacity: isLoading ? 0.5 : 1 }]}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonLabel}>
                        {selectedValue === '1' ? 'Generate Challan' : 'Request Installments'}
                    </Text>
                )}
            </PaperButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
    },
    picker: {
        height: 40,
        width: 200,
        padding: 10,
    },
    input: {
        width: 200,
    },
    btn: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },
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
        padding: 2,
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

export default FeeChallan;
