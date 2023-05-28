import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
const InstallmentList = ({ navigation }) => {
    const [installment, setInstallment] = useState([]);
    const [loading, setLoading] = useState(true);
    const getInstallmentList = async () => {
        try {
            let query = `http://${IP}/StudentPortal/api/Admin/GetInstallmentRequests`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            console.log(data);
            setInstallment(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    useEffect(() => {
        getInstallmentList();
    }, [])
    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#099e78' />
                    <Text style={styles.loadingText}>Loading Students..</Text>
                </View>
            ) : (
                <View>
                    <ScrollView>
                        {
                            installment?.map((item, index) => {
                                return (
                                    <Pressable
                                        style={styles.mainDiv}
                                        onPressOut={() => navigation.navigate('InstallmentDetail', { item })}
                                    >
                                        <View>
                                            <Text style={styles.font}>{item.name}</Text>
                                            <Text style={styles.font1}>{item.reg_no}</Text>
                                            <Text style={styles.font1}>B{item.program}{item.semester}{item.section}</Text>
                                        </View>

                                        <View style={styles.subDiv}>
                                            {item?.profile_photo ? (
                                                <Image
                                                    source={{ uri: `http://${IP}/StudentPortal/ProfileImages/${item?.profile_photo}` }}
                                                    style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 50 }}
                                                />
                                            ) : (
                                                <Image
                                                    source={require('../images/avatar-icon.png')}
                                                    style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain', borderRadius: 400 / 2 }}
                                                />
                                            )}
                                        </View>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            )}
        </View>
    )
}

export default InstallmentList

const styles = StyleSheet.create({
    card:
    {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        borderRadius: 7
    },
    font:
    {
        fontWeight: '700'
    },
    font1:
    {
        fontWeight: '500'
    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    mainDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 7,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    subDiv: {
        flexDirection: 'row-reverse',
        marginRight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#099e78',
    },
})