import {
    StyleSheet, Text, View, FlatList, Image, ActivityIndicator,
    RefreshControl, TouchableOpacity, Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import { FAB, Button, TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
const FineList = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [checked, setChecked] = useState('first');
    const GetStudents = async () => {
        try {
            let query = `http://${IP}/StudentPortal/api/Admin/GetFineList`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            console.log(data);
            setStudents(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    const approveFine = async (id) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/ApproveFine?id=${id}`, {
                method: 'POST',
            }
            );
            Alert.alert("Approve Fine", "Yes your fine is approved");
            await GetStudents();
        } catch (err) {
            console.log(err);
        }
    }
    const rejectFine = async (id) => {
        try {
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/RejectFine?id=${id}`, {
                method: 'POST',
            }
            );
            Alert.alert("Reject Fine", "sorry your fine is Rejected");
            await GetStudents();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetStudents();
    }, []);
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainDiv}>
            <View>
                <Text style={styles.fontDesign}>{item.reg_no}</Text>
                <Text style={styles.fontDesign}>{item.name}</Text>
                <Text style={styles.fontDesign}>B{item.program}{item.semester}{item.section}</Text>
                <Text style={styles.fontDesign}>{item.date}</Text>
                <Text style={styles.fontDesign}>{item.description}</Text>
                <Text style={styles.fontDesign}>{item.amount}</Text>
                {item.status ? (
                    <Text style={styles.fontDesign}>Paid</Text>
                ) : (
                    <Text style={styles.fontDesign}>Not Paid</Text>
                )}
                <View style={{ flexDirection: 'row' }}>
                    {item.status ? (
                        <Button mode='contained' style={styles.Btn}
                            onPress={() => rejectFine(item.id)}>Reject</Button>
                    ) : (
                        <Button mode='contained' style={styles.Btn}
                            onPress={() => approveFine(item.id)}>Approve</Button>
                    )}
                </View>
            </View>
            <View style={styles.subDiv}>
                {
                    item.profile_photo ? (
                        <Image source={{ uri: `http://${IP}/StudentPortal/ProfileImages/${item.profile_photo}` }} style={{ alignSelf: 'center', height: 80, width: 80, resizeMode: 'contain', borderRadius: 50 }} />
                    ) :
                        (
                            <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 80, width: 80, resizeMode: 'contain', borderRadius: 400 / 2 }} />
                        )
                }
            </View>
        </TouchableOpacity>
    );

    const onRefresh = () => {
        setRefreshing(true);
        GetStudents();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>

            <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', elevation: 7, borderRadius: 10 }}>
                        <Text style={{ margin: 10, color: 'black' }}>All</Text>
                        <RadioButton value='all' label="all" />
                        <Text style={{ margin: 10, color: 'black' }}>Paid</Text>
                        <RadioButton value='true' label="asg" />
                        <Text style={{ margin: 10, color: 'black' }}>Pending</Text>
                        <RadioButton value='asg' label="asg" />
                    </View>
                </View>
            </RadioButton.Group>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#099e78' />
                    <Text style={styles.loadingText}>Loading Students..</Text>
                </View>
            ) : (
                <FlatList
                    data={students}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
            <FAB
                label='Add Fine'
                style={styles.fab}
                onPress={() => navigation.navigate('AddFine')}
            />
        </View>
    )
}
export default FineList

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'white',
        flex: 1,
    },
    mainDiv:
    {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', elevation: 7, padding: 10, marginHorizontal: 10, marginVertical: 10
    },
    subDiv:
    {
        flexDirection: 'row-reverse', marginRight: 20
    },
    fontDesign:
    {
        color: 'black',
        fontSize: 15,
        fontStyle: 'italic',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#099e78'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#099e78'
    },
    Btn:
    {
        backgroundColor: '#099e78',
        marginHorizontal: 2,
        marginVertical: 5
    }
})
