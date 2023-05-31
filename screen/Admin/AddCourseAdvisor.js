import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import IP from '../ip';
import DocumentPicker from 'react-native-document-picker';

const AddCourseAdvisor = () => {
    const [singleFile, setSingleFile] = useState({});
    const uploadImage = async () => {
        // Check if any file is selected or not
        console.log(singleFile)
        if (singleFile != null) {
            // If file selected then create FormData
            const data = new FormData();
            data.append('name', 'Image Upload');
            data.append('courseadvisorsfile', {
                uri: 'content://com.android.externalstorage.documents/document/primary%3Acourse%20advisor.xlsx',
                name: 'course advisor.xlsx',
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            console.log(singleFile);
            // data.append('timetablefile', {
            //     uri: singleFile.uri,
            //     name: singleFile.name,
            //     type: singleFile.type,
            // });
            // Please change file upload URL
            try {
                let res = await fetch(
                    `http://${IP}/StudentPortal/api/Admin/AddCourseAdvisors`,
                    {
                        method: 'post',
                        body: data,
                    }
                );
                alert("Added")
                alert(responseJson);
            } catch (err) {
                alert("something went wriong");
            }
        } else {

            alert('Please Select File first');
        }
    };

    const selectFile = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            console.log('res : ' + JSON.stringify(res));

            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    return (
        <View style={styles.mainBody}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }}>
                    Add Course Advisor
                </Text>

            </View>
            {/*Showing the data of selected Single file*/}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select File</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={uploadImage}>
                <Text style={styles.buttonTextStyle}>Upload File</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
        backgroundColor: '#099e78'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
});

export default AddCourseAdvisor;
