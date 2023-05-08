import { StyleSheet, Text, View, ActivityIndicator, RefreshControl, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip';
import { RadioButton } from 'react-native-paper';
const FinancialAssitanceRequest = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [checked, setChecked] = useState('first');
    const GetRequests = async () => {
        try {
            let query = `http://${IP}/StudentPortal/api/Admin/GetFinancialAssistanceRequests`;
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
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainDiv}
            onPress={() => navigation.navigate("RequestDetail", { item })}
        >
            <View>

                <Text style={styles.fontDesign}>{item.reg_no}</Text>
                <Text style={styles.fontDesign}>{item.name}</Text>
                <Text style={styles.fontDesign}>B{item.program}{item.semester}{item.section}</Text>
                {/* <Text style={styles.fontDesign}>{item.session}</Text> */}
                <Text style={styles.fontDesign}>{item.description}</Text>
            </View>
            <View style={styles.subDiv}>
                {
                    item.profile_photo ? (
                        <Image source={{ uri: `http://${IP}/StudentPortal/ProfileImages/${item.profile_photo}` }} style={{ alignSelf: 'center', height: 80, width: 80, resizeMode: 'contain', borderRadius: 50 }} />
                    ) :
                        (
                            <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 400 / 2 }} />
                        )
                }
            </View>
        </TouchableOpacity>
    );
    const onRefresh = () => {
        setRefreshing(true);
        GetRequests();
        setRefreshing(false);
    };
    useEffect(() => {
        GetRequests();
    }, []);
    return (
        <View style={styles.container}>
            <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', elevation: 7, borderRadius: 10 }}>
                        <Text style={{ margin: 10, color: 'black' }}>All</Text>
                        <RadioButton value='all' label="all" />
                        <Text style={{ margin: 10, color: 'black' }}>Approved</Text>
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
        </View>
    )
}

export default FinancialAssitanceRequest

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