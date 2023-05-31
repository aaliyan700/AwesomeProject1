
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import PDFView from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import IP from '../ip';
import { Button } from 'react-native-paper';
const ViewChallan = () => {
    const [pdf, setPdf] = useState('');
    const GetChallan = async () => {
        console.log('fetching...');
        const reg_no = await AsyncStorage.getItem('username');
        console.log(reg_no);
        try {
            const query = `http://${IP}/StudentPortal/api/Student/GetChallan?regNo=${reg_no}`;
            console.log(query);
            const response = await fetch(query, {
                method: 'GET',
            });
            console.log('Done');
            const data = await response.json();
            console.log("data", data);
            setPdf(data);
            console.log('Challan', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        GetChallan();
    }, []);

    const downloadPDF = async () => {
        const { config, fs } = RNFetchBlob;
        const destDir = fs.dirs.DownloadDir;
        const destPath = `${destDir}/${pdf}`;
        const url = `http://${IP}/StudentPortal/ChallanFiles/${pdf}`;
        console.log('Downloading file...');
        const res = await config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: pdf,
                path: destPath,
            },
        }).fetch('GET', url);
        console.log('Downloaded file path:', res.path());
        setPdf(res.path());
    };
    const viewPDF = () => {
        const url = `http://${IP}/StudentPortal/ChallanFiles/${pdf}`;
        Linking.openURL(url);
    };
    return (
        <View style={styles.container}>
            {pdf ? (
                <PDFView source={{ uri: `file://${pdf}` }} style={styles.pdfView} />

            ) : (
                <Text>Loading PDF...</Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button onPress={downloadPDF} mode="contained" style={styles.btn}>Download</Button>
                <Button onPress={viewPDF} mode="contained" style={styles.btn}>Open</Button>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdfView: {
        flex: 1,
    },
    btn:
    {
        marginHorizontal: 20,
        backgroundColor: '#099e78',
        marginVertical: 5,
        width: 170
    }
});
export default ViewChallan;

