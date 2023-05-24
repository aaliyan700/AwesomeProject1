import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage'
const ViewAdvise = () => {
    const [advise, setAdvise] = useState([]);
    const GetAdvise = async () => {
        try {
            console.log('fetching...');
            const reg_no = await AsyncStorage.getItem('username');
            console.log(reg_no);
            console.log("in api")
            const query1 = `http://${IP}/StudentPortal/api/Student/GetAdvise?reg_no=${reg_no}`;
            console.log(query1);
            const response = await fetch(query1, {
                method: 'GET'
            });
            console.log('Done');
            const data = await response.json();
            setAdvise(data);
            console.log("data", data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        GetAdvise();
    }, []);
    return (
        <View style={styles.container}>
            {
                advise?.map((item, index) => {
                    return (
                        <View style={styles.card} key={index}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={styles.font}>Advised By</Text>
                            </View>
                            <Text style={styles.font}>{item.first_name} {item.last_name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={styles.font} >Advise is:</Text>
                            </View>
                            <Text style={styles.font1}>{item.advise}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default ViewAdvise

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    card:
    {
        marginHorizontal: 30,
        backgroundColor: 'white',
        marginVertical: 30,
        elevation: 9,
        padding: 20,
        borderRadius: 10
    },
    font1:
    {
        marginLeft: 18,
        fontSize: 18,
        textAlign: "center",
        color: 'black'
    },
    font:
    {
        marginLeft: 18,
        fontSize: 18,
        textAlign: "center",
        color: 'black'
    }
})