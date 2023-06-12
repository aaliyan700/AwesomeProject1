import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { Button } from 'react-native-paper';
import IP from '../ip';

const UploadChallan = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item);
    const [imageData, setImageData] = useState({});
    useEffect(() => {
        console.log(imageData)
    }, [imageData])
    const uploadChallan = async () => {
        try {
            let data = new FormData();
            data.append('id', item.id);
            data.append('challan', imageData);
            const requestOptions = {
                method: 'POST',
                body: data,
            };

            const response = await fetch(
                `http://${IP}/StudentPortal/api/Student/UploadChallan`,
                requestOptions
            );
            // const results = await response.json();
            // console.log(results);
            console.log("uploaded");
            ToastAndroid.show('Upload', ToastAndroid.LONG);
            // navigation.navigate("ViewFinance")
        } catch (err) {
            console.log(err);
        }

    }
    const imageUri = `http://${IP}/StudentPortal/ChallanImages/${item.challan_image}`;
    return (
        <View style={styles.container}>
            {/* <ImagePickerComponent imageData={imageData} setImageData={setImageData} /> */}
            <View style={styles.div}>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.font}>Installment No:</Text>
                    <Text style={styles.font}>{item.installment_no}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.font}>Amount:</Text>
                    <Text style={styles.font}>{item.amount}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.font}>Expiry Date:</Text>
                    <Text style={styles.font}>{item.expiry_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.font}>Issue Date:</Text>
                    <Text style={styles.font}>{item.issue_date}</Text>
                </View>
                {item.challan_image ? (
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <Text style={styles.font}>Change Image:</Text>
                        <ImagePickerComponent imageData={imageData} setImageData={setImageData} />
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <Text style={styles.font}>Upload Image:</Text>
                        <ImagePickerComponent imageData={imageData} setImageData={setImageData} />
                    </View>

                )}
                {
                    item.challan_image ? (
                        <View style={{ alignItems: 'center', borderWidth: 2, borderRadius: 20, borderColor: 'white' }}>
                            <Image source={{ uri: imageUri }} style={{ justifyContent: "flex-end", height: 300, width: 300, resizeMode: 'contain', borderRadius: 20 }}></Image>
                        </View>

                    ) : (
                        <View style={{ alignItems: 'center', borderWidth: 2, borderRadius: 20, borderColor: 'white' }}>
                            <Text style={styles.font}>Image Not Uploaded Yet</Text>
                        </View>
                    )
                }
                <View style={{ padding: 10, marginVertical: 20 }}>
                    <Button mode="contained" style={styles.btn} onPress={() => uploadChallan()}>Upload</Button>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    div:
    {
        backgroundColor: 'white',
        elevation: 7,
        marginHorizontal: 10,
        padding: 16,
        marginVertical: 5,
        borderRadius: 4,
        marginVertical: 10
    },
    font:
    {
        color: 'black',
        fontSize: 15
    },
    btn: {
        backgroundColor: '#099e78',
    },
});

export default UploadChallan;
