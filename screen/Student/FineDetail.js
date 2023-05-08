import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage'
const FineDetail = ({ navigation }) => {
    const [fine, setFine] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        GetFine();
    }, [])
    const GetFine = async () => {
        try {
            const user_name = await AsyncStorage.getItem('username');
            let query = `http://${IP}/StudentPortal/api/Student/GetFine?reg_no=${user_name}`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            setFine(data);
            console.log(data);
            setLoading(false);

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainDiv}
            onPress={() => navigation.navigate("UploadFine", { item })}>
            <View>
                <Text style={styles.fontDesign}>{item.reg_no}</Text>
                <Text style={styles.fontDesign}>{item.name}</Text>
                <Text style={styles.fontDesign}>B{item.program}{item.semester}{item.section}</Text>
                <Text style={styles.fontDesign}>{item.date}</Text>
                <Text style={styles.fontDesign}>{item.description}</Text>
                <Text style={styles.fontDesign}>{item.amount}</Text>
                {item.status === false ? (
                    <Text style={styles.fontDesign}>Not Paid</Text> // Render "Not Paid" if isPending is false
                ) : (
                    <Text style={styles.fontDesign}>Paid</Text> // Render "Paid" if isPending is true
                )}
            </View>
        </TouchableOpacity>
    );
    const onRefresh = () => {
        setRefreshing(true);
        GetFine();
        setRefreshing(false);
    };
    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#099e78' />
                    <Text style={styles.loadingText}>Loading Students..</Text>
                </View>
            ) : (
                <FlatList
                    data={fine}
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

export default FineDetail

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
    }
})