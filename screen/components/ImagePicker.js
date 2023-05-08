// //npm install react-native-image-picker --save
// //Permission in Android
// //Project → android → app → src → debug → AndroidManifest.xml
// //<uses-permission android:name="android.permission.CAMERA"/>
// //<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { Button, Text } from 'react-native-paper';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = ({ imageData, setImageData }) => {
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else {
            return true;
        }
    };

    const captureImage = async type => {
        console.log("hiii");
        let options = {
            mediaType: type,
            maxWidth: 800,
            maxHeight: 500,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            console.log('Capture Image if block');
            launchCamera(options, response => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('uri -> ', response.assets[0].uri);
                console.log('width -> ', response.assets[0].width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.assets[0].fileSize);
                console.log('type -> ', response.assets[0].type);
                console.log('fileName -> ', response.assets[0].fileName);
                setImageData({
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                });
            });
            console.log("done")
        }
    };

    const chooseFile = type => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            setImageData({
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            });
        });
    };

    return (
        <View style={styles.container}>
            {/* <Image source={{ uri: imageData.uri }} style={styles.imageStyle} /> */}
            {imageData?.uri && (
                <Image source={{ uri: imageData.uri }} style={styles.imageStyle} />
            )}

            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => chooseFile('photo')}>
                    Choose Image
                </Button>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => captureImage('photo')}>
                    Capture Image
                </Button>
            </View>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    button: {
        marginHorizontal: 10,
        backgroundColor: '#099e78'
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
        borderWidth: 2,
        borderColor: 'black',
    },
});

// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     View,
//     Image,
//     Platform,
//     PermissionsAndroid,
//     FlatList,
// } from 'react-native';
// import { Button, Text } from 'react-native-paper';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const ImagePicker = ({ imageData, setImageData }) => {
//     const [images, setImages] = useState([]);
//     const requestCameraPermission = async () => {
//         if (Platform.OS === 'android') {
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.CAMERA,
//                     {
//                         title: 'Camera Permission',
//                         message: 'App needs camera permission',
//                     },
//                 );
//                 // If CAMERA Permission is granted
//                 return granted === PermissionsAndroid.RESULTS.GRANTED;
//             } catch (err) {
//                 console.warn(err);
//                 return false;
//             }
//         } else return true;
//     };

//     const requestExternalWritePermission = async () => {
//         if (Platform.OS === 'android') {
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//                     {
//                         title: 'External Storage Write Permission',
//                         message: 'App needs write permission',
//                     },
//                 );
//                 // If WRITE_EXTERNAL_STORAGE Permission is granted
//                 return granted === PermissionsAndroid.RESULTS.GRANTED;
//             } catch (err) {
//                 console.warn(err);
//                 alert('Write permission err', err);
//             }
//             return false;
//         } else {
//             return true;
//         }
//     };

//     const captureImage = async type => {
//         let options = {
//             mediaType: type,
//             maxWidth: 800,
//             maxHeight: 500,
//             quality: 1,
//             videoQuality: 'low',
//             durationLimit: 30, //Video max duration in seconds
//             saveToPhotos: true,
//         };
//         let isCameraPermitted = await requestCameraPermission();
//         let isStoragePermitted = await requestExternalWritePermission();
//         if (isCameraPermitted && isStoragePermitted) {
//             const images = [];
//             let i = 0;
//             while (i < 2) { // Take 5 pictures
//                 console.log('Capture Image if block');
//                 await launchCamera(options, response => {
//                     console.log('Response = ', response);

//                     if (response.didCancel) {
//                         alert('User cancelled camera picker');
//                         return;
//                     } else if (response.errorCode == 'camera_unavailable') {
//                         alert('Camera not available on device');
//                         return;
//                     } else if (response.errorCode == 'permission') {
//                         alert('Permission not satisfied');
//                         return;
//                     } else if (response.errorCode == 'others') {
//                         alert(response.errorMessage);
//                         return;
//                     }
//                     console.log('uri -> ', response.assets[0].uri);
//                     console.log('width -> ', response.assets[0].width);
//                     console.log('height -> ', response.height);
//                     console.log('fileSize -> ', response.assets[0].fileSize);
//                     console.log('type -> ', response.assets[0].type);
//                     console.log('fileName -> ', response.assets[0].fileName);
//                     images.push({
//                         uri: response.assets[0].uri,
//                         name: response.assets[0].fileName,
//                         type: response.assets[0].type,
//                     });
//                 });
//                 i++;
//             }
//             setImageData(images);
//         }
//     };
//     const chooseFile = type => {
//         let options = {
//             mediaType: type,
//             maxWidth: 300,
//             maxHeight: 550,
//             quality: 1,
//         };
//         launchImageLibrary(options, response => {
//             if (response.didCancel) {
//                 alert('User cancelled camera picker');
//                 return;
//             } else if (response.errorCode == 'camera_unavailable') {
//                 alert('Camera not available on device');
//                 return;
//             } else if (response.errorCode == 'permission') {
//                 alert('Permission not satisfied');
//                 return;
//             } else if (response.errorCode == 'others') {
//                 alert(response.errorMessage);
//                 return;
//             }
//             setImageData({
//                 uri: response.assets[0].uri,
//                 name: response.assets[0].fileName,
//                 type: response.assets[0].type,
//             });
//         });
//     };

//     const renderItem = ({ item }) => (
//         <Image source={{ uri: item.uri }} style={styles.imageStyle} />
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={images}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={renderItem}
//                 horizontal={true}
//                 contentContainerStyle={styles.imageList}
//             />
//             <View style={styles.buttonContainer}>
//                 <Button
//                     mode="contained"
//                     style={styles.button}
//                     onPress={() => chooseFile('photo')}>
//                     Choose Image
//                 </Button>
//                 <Button
//                     mode="contained"
//                     style={styles.button}
//                     onPress={() => captureImage('photo')}>
//                     Capture Image
//                 </Button>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         flex: 1,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginVertical: 15,
//     },
//     button: {
//         marginHorizontal: 10,
//         backgroundColor: '#099e78',
//     },
//     imageList: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     imageStyle: {
//         width: 200,
//         height: 200,
//         margin: 5,
//         borderWidth: 2,
//         borderColor: 'black',
//     },
// });

// export default ImagePicker;
