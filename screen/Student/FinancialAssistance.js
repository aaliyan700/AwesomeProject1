// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, FlatList, ToastAndroid, Text, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { Button, TextInput } from 'react-native-paper';
// import { FAB } from 'react-native-paper';
// import IP from '../ip';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const FinancialAssistance = () => {
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [description, setDescription] = useState("");
//     const [reg_no, setRegNo] = useState("");
//     console.log(selectedImages);
//     const chooseMultipleImages = () => {
//         launchImageLibrary(
//             {
//                 mediaType: 'photo',
//                 selectionLimit: 5, // Maximum number of images to be selected
//             },
//             (response) => {
//                 if (response.didCancel) {
//                     // User cancelled the picker
//                 } else if (response.error) {
//                     // Handle error
//                     console.log(response.error);
//                 } else {
//                     // Update selected images state
//                     setSelectedImages(response.assets);
//                 }
//             }
//         );
//     };

//     const renderSelectedImage = ({ item }) => (
//         <Image source={{ uri: item.uri }} style={styles.image} />
//     );

//     const handleSubmission = async () => {
//         try {
//             let data = new FormData();
//             selectedImages.forEach((image, index) => {
//                 data.append(`image${index}`, {
//                     uri: image.uri,
//                     type: image.type,
//                     name: `image${index}.${image.fileName.split('.').pop()}`,
//                 });
//             });
//             console.log("...", selectedImages);
//             data.append('reg_no', reg_no);
//             data.append('description', description);
//             if (description && selectedImages) {
//                 const requestOptions = {
//                     method: 'POST',
//                     body: data,
//                 };
//                 const response = await fetch(
//                     `http://${IP}/StudentPortal/api/Student/RequestFinancialAssistance`,
//                     requestOptions
//                 );
//                 //const results = await response.json();
//                 // console.log(results);
//                 // console.log("uploaded");
//                 ToastAndroid.show('Upload', ToastAndroid.LONG);
//             } else {
//                 alert("Please fill all fields");
//             }
//         } catch (err) {
//             console.log(err);
//         }

//     };
//     useEffect(() => {
//         check();
//     }, [])
//     const check = async () => {
//         const user_name = await AsyncStorage.getItem('username');
//         setRegNo(user_name);
//         console.log("...", reg_no);
//     }
//     return (
//         <View style={styles.container}>
//             <View style={styles.subContainer}>
//                 <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Apply for Financial Assistance</Text>
//                 <TextInput placeholder="Enter Description" multiline value={description} mode="outlined" onChangeText={(val) => setDescription(val)}
//                     style={{ height: 200 }}></TextInput>
//                 <FlatList
//                     data={selectedImages}
//                     renderItem={renderSelectedImage}
//                     keyExtractor={(item, index) => index.toString()}
//                     numColumns={2}
//                 />
//                 <Button style={styles.btn} onPress={handleSubmission} mode="contained">Submit</Button>
//             </View>


//             <FAB
//                 label='Choose Images'
//                 style={styles.fab}
//                 onPress={chooseMultipleImages}
//             />
//         </View >
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     fab: {
//         position: 'absolute',
//         margin: 16,
//         right: 0,
//         bottom: 0,
//         backgroundColor: '#099e78'
//     },
//     subContainer:
//     {
//         backgroundColor: 'white',
//         elevation: 7,
//         padding: 10,
//         marginHorizontal: 5,
//         marginVertical: 1,
//         borderRadius: 10
//     },
//     image: {
//         width: 150,
//         height: 150,
//         margin: 8,
//     },
//     btn:
//     {
//         marginVertical: 10,
//         marginHorizontal: 20,
//         backgroundColor: '#099e78'
//     }
// });

// export default FinancialAssistance;

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, ToastAndroid, Text, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinancialAssistance = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageNames, setImageNames] = useState([]); // Store image names
    const [description, setDescription] = useState('');
    const [reg_no, setRegNo] = useState('');

    const chooseMultipleImages = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 5, // Maximum number of images to be selected
            },
            (response) => {
                if (response.didCancel) {
                    // User cancelled the picker
                } else if (response.error) {
                    // Handle error
                    console.log(response.error);
                } else {
                    // Update selected images state
                    setSelectedImages([...selectedImages, ...response.assets]);
                    setImageNames([...imageNames, ...Array(response.assets.length).fill('')]); // Initialize image names array
                }
            }
        );
    };

    const renderSelectedImage = ({ item }) => (
        <View>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TextInput
                placeholder="Enter Image Name"
                value={imageNames[selectedImages.indexOf(item)]}
                onChangeText={(val) => handleImageNameChange(val, selectedImages.indexOf(item))}
                style={styles.imageNameInput}
            />
        </View>
    );

    const handleImageNameChange = (name, index) => {
        const updatedNames = [...imageNames];
        updatedNames[index] = name;
        setImageNames(updatedNames);
    };

    const handleSubmission = async () => {
        console.log(imageNames);
        try {
            let data = new FormData();
            // selectedImages.forEach((image, index) => {
            //     data.append('files', {
            //         uri: image.uri,
            //         type: image.type,
            //         name: `image${index}.${image.fileName.split('.').pop()}`,
            //     });
            // });
            selectedImages.forEach((image, index) => {
                const imageName = imageNames[index] || 'default'; // Use the image name from the array or a default value

                data.append(imageName, {
                    uri: image.uri,
                    type: image.type,
                    name: `${imageName}.${image.fileName.split('.').pop()}`,
                });
            });


            data.append('reg_no', reg_no);
            data.append('description', description);
            if (description && selectedImages.length > 0) {
                const requestOptions = {
                    method: 'POST',
                    body: data,
                };
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Student/RequestFinancialAssistance`,
                    requestOptions
                );
                if (response.ok) {
                    // Successful response
                    ToastAndroid.show('Upload', ToastAndroid.LONG);
                } else {
                    // Handle error
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }
            } else {
                alert('Please fill all fields');
            }
        } catch (err) {
            console.log(err);
            // Handle error
        }
    };
    useEffect(() => {
        check();
    }, []);

    const check = async () => {
        const user_name = await AsyncStorage.getItem('username');
        setRegNo(user_name);
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Apply for Financial Assistance</Text>
                <TextInput
                    placeholder="Enter Description"
                    multiline
                    value={description}
                    mode="outlined"
                    onChangeText={(val) => setDescription(val)}
                    style={{ height: 200 }}
                />
                <FlatList
                    data={selectedImages}
                    renderItem={renderSelectedImage}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
                <Button style={styles.btn} onPress={handleSubmission} mode="contained">
                    Submit
                </Button>
            </View>

            <FAB label="Choose Images" style={styles.fab} onPress={chooseMultipleImages} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#099e78',
    },
    subContainer: {
        backgroundColor: 'white',
        elevation: 7,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 1,
        borderRadius: 10,
    },
    image: {
        width: 150,
        height: 150,
        margin: 8,
    },
    imageNameInput: {
        marginBottom: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    btn: {
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#099e78',
    },
});

export default FinancialAssistance;


