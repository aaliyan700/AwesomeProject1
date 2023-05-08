import {
    StyleSheet, Text, View, FlatList, Image, ActivityIndicator,
    RefreshControl, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import { TextInput } from 'react-native-paper';

const AddFine = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const GetStudents = async () => {
        try {
            let query = `http://${IP}/StudentPortal/api/Admin/GetFineStudents`;
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

    useEffect(() => {
        GetStudents();
    }, []);
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainDiv}
            onPress={() => navigation.navigate("TakeFine", { item })}
        >
            <View>
                <Text style={styles.fontDesign}>{item.reg_no}</Text>
                <Text style={styles.fontDesign}>{item.name}</Text>
                <Text style={styles.fontDesign}>B{item.program}{item.semester}{item.section}</Text>
                <Text style={styles.fontDesign}>{item.session}</Text>
            </View>
            <View style={styles.subDiv}>
                {
                    item.profile_photo ? (
                        <Image source={{ uri: `http://${IP}/StudentPortal/ProfileImages/${item.profile_photo}` }} style={{ alignSelf: 'center', height: 70, width: 70, resizeMode: 'contain', borderRadius: 50 }} />
                    ) :
                        (
                            <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 70, width: 70, resizeMode: 'contain', borderRadius: 400 / 2 }} />
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
            <TextInput placeholder='Enter Section'
                mode="outlined"
                style={styles.input}>
            </TextInput>
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
        </View>
    )
}

export default AddFine;
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
    input:
    {
        marginHorizontal: 10,
        marginVertical: 10
    }
})
