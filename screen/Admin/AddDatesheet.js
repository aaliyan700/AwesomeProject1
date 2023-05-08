import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import IP from '../ip';
import DocumentPicker from 'react-native-document-picker';
import { RadioButton } from 'react-native-paper';
const AddDatesheet = () => {
    const [singleFile, setSingleFile] = useState({});
    const [type, setType] = useState('mid');

    const uploadImage = async () => {
        if (singleFile != null || singleFile == null) {

            const data = new FormData();
            data.append('datesheetfile', {
                uri: 'content://com.android.externalstorage.documents/document/primary%3AFINAL%20EXAM%20Date%20sheet%20Spring%20%202022%20%20%20Ver-2.xls',
                name: 'FINAL EXAM Date sheet Spring  2022   Ver-2.xls',
                type: 'application/vnd.ms-excel',
            });
            data.append('type', type);
            console.log('data of file', data.getAll());
            if (type == null) {
                alert("Please select type");
            }
            else {
                let res = await fetch(
                    `http://${IP}/StudentPortal/api/Admin/AddDatesheet`,
                    {
                        method: 'post',
                        body: data,
                    }
                );
            }
            let responseJson = await res.json();
            console.log(responseJson);
            alert(responseJson);
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
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    return (
        <View style={styles.mainBody}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }}>
                    Upload DateSheet
                </Text>
                <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ margin: 10 }}>Mid</Text>
                            <RadioButton value='mid' label="mid" />
                            <Text style={{ margin: 10 }}>Final</Text>
                            <RadioButton value='final' label="final" />
                        </View>
                    </View>
                </RadioButton.Group>
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

export default AddDatesheet;
