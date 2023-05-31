import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import ImagePickerComponent from '../components/ImagePickerComponent';
import { Button } from 'react-native-paper';
import IP from '../ip';
const UploadFine = ({ route }) => {
    const { item } = route.params;
    const [imageData, setImageData] = useState(null);
    console.log("item", item);
    const uploadFine = async () => {
        try {
            let data = new FormData();
            data.append('id', item.id);
            data.append('receipt', imageData);
            const requestOptions = {
                method: 'POST',
                body: data,
            };
            if (imageData != null) {
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Student/UploadFineReceipt`,
                    requestOptions
                );
                // const results = await response.json();
                // console.log(results);
                console.log("uploaded");
                ToastAndroid.show('Upload', ToastAndroid.LONG);
            } else {
                alert("Please select receipt");
            }
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <View style={styles.container}>
            <Text style={styles.font}>UploadFine</Text>
            <ImagePickerComponent imageData={imageData} setImageData={setImageData} />
            <Button mode="contained" style={styles.btn}
                onPress={uploadFine}>Upload Now</Button>
        </View>
    )
}

export default UploadFine

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    btn:
    {
        marginHorizontal: 40,
        backgroundColor: "#099e78"
    },
    font:
    {
        textAlign: 'center',
        fontSize: 30,
        color: "white",
        marginVertical: 20,
        backgroundColor: "#099e78",
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        elevation: 7
    }
})