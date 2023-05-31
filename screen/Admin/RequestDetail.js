// import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import IP from '../ip';
// import { Button } from 'react-native-paper';
// const RequestDetail = ({ route }) => {
//     const { item } = route.params;
//     const [fileImage, setFileImage] = useState([]);

//     const GetImages = async () => {
//         try {
//             let query = `http://${IP}/StudentPortal/api/Admin/GetFinancialAssistanceImages?id=${item.id}`;
//             const response = await fetch(query, { method: 'GET' });
//             const data = await response.json();
//             console.log(data);
//             setFileImage(data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         GetImages();
//     }, [])
//     const approveRequest = async (id) => {
//         try {
//             const response = await fetch(
//                 `http://${IP}/StudentPortal/api/Admin/AcceptFinancialAssistanceRequest?id=${id}`, {
//                 method: 'POST',
//             }
//             );
//             alert("Approved");
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     const rejectRequest = async (id) => {
//         try {
//             const response = await fetch(
//                 `http://${IP}/StudentPortal/api/Admin/RejectFinancialAssistanceRequest?id=${id}`, {
//                 method: 'POST',
//             }
//             );
//             alert("Rejected");
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     const renderItem = ({ item }) => (
//         <View style={styles.imageContainer}>
//             <Image
//                 source={{ uri: `http://${IP}/StudentPortal/FinancialAssistanceImages/${item}` }}
//                 style={styles.image}
//             />
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <View style={styles.subContainer}>
//                 <Text style={styles.font}>{item.reg_no}</Text>
//                 <Text style={styles.font}>{item.name}</Text>
//             </View>
//             {fileImage && fileImage.length > 0 ? (
//                 <FlatList
//                     data={fileImage}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                 />
//             ) : (
//                 <Image
//                     source={require('../images/avatar-icon.png')}
//                     style={styles.placeholderImage}
//                 />
//             )}

//             <View style={styles.btnView}>
//                 <Button mode="contained" style={styles.btn}
//                     onPress={() => approveRequest(item.id)}>Accept</Button>
//                 <Button mode="contained" style={styles.btn} onPress={() => rejectRequest(item.id)}>Reject</Button>
//             </View>
//         </View>
//     )
// }

// export default RequestDetail
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import IP from '../ip';
import { Button, TextInput } from 'react-native-paper';
import { Appbar, Menu, Divider, Provider, Dialog } from 'react-native-paper';
const RequestDetail = ({ route }) => {
    const { item } = route.params;
    const [fileImage, setFileImage] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState(0);
    // const showDialog = () => setVisible(true);
    const showDialog = (id) => {
        setVisible(true);
        setId(id);
        console.log("id", id);
    }
    const hideDialog = () => setVisible(false);
    const handleInputChange = (text) => setInputValue(text);
    const GetImages = async () => {
        try {
            let query = `http://${IP}/StudentPortal/api/Admin/GetFinancialAssistanceImages?id=${item.id}`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            console.log(data);
            setFileImage(data);
            setIsLoading(false); // Set isLoading to false after data fetch
        } catch (err) {
            console.log(err);
            setIsLoading(false); // Set isLoading to false on error
        }
    };

    useEffect(() => {
        GetImages();
    }, []);
    const approveRequest = async (id) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/AcceptFinancialAssistanceRequest?id=${id}`,
                {
                    method: 'POST',
                }
            );
            alert('Approved');
        } catch (err) {
            console.log(err);
        }
    };
    const rejectRequest = async () => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/RejectFinancialAssistanceRequest?id=${id}&&remarks=${inputValue}`,
                {
                    method: 'POST',
                }
            );
            alert('Rejected');
        } catch (err) {
            console.log(err);
        }
    };
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.imageContainer}>

                <Image
                    source={{ uri: `http://${IP}/StudentPortal/FinancialAssistanceImages/${item}` }}
                    style={styles.image}
                />
            </View>
        </View>
    );
    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.font}>{item.reg_no}</Text>
                    <Text style={styles.font}>{item.name}</Text>
                    <Text style={{ color: 'black' }}>Application:   {item.description}</Text>
                </View>
                {isLoading ? ( // Show activity indicator while loading data
                    <ActivityIndicator style={styles.activityIndicator} />
                ) : fileImage && fileImage.length > 0 ? (
                    <FlatList
                        data={fileImage}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                ) : (
                    <Text style={{ textAlign: 'center' }}>Not Uploaded Any Picture</Text>
                )}

                <View style={styles.btnView}>
                    <Button mode="contained" style={styles.btn} onPress={() => approveRequest(item.id)}>
                        Accept
                    </Button>
                    {/* <Button mode="contained" style={styles.btn} onPress={() => rejectRequest(item.id)}>
                    Reject
                </Button> */}
                    <Button mode="contained" style={styles.btn} onPress={() => showDialog(item.id)}>
                        Reject
                    </Button>
                </View>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Enter Remarks</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter  Remarks"
                            value={inputValue}
                            onChangeText={handleInputChange}
                            mode='outlined'
                            style={{ height: 200 }}
                            multiline
                        />
                        <Button mode="contained" style={styles.btn} onPress={() => rejectRequest()}>Submit</Button>
                    </Dialog.Content>
                </Dialog>
            </View>
        </Provider>
    );
};
export default RequestDetail
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer: {
        padding: 20,
        borderColor: 'black',
    },
    image: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
    },
    placeholderImage: {
        alignSelf: 'center',
        height: 35,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 400 / 2,
    },
    font:
    {
        textAlign: 'center',
        fontSize: 18,
        color: 'black'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer:
    {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        elevation: 7

    },
    btnView:
    {
        flexDirection: 'row',
        marginBottom: "20%",
        justifyContent: 'center'
    },
    btn:
    {
        marginHorizontal: 10,
        paddingHorizontal: 30,
        backgroundColor: '#099e78',
        marginVertical: 10
    }
})


