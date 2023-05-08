import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('LoginScreen')
        }, 2000);
    }, [])
    return (
        <View style={styles.container}>
            {loading ? (<View style={styles.container}>
                <Image source={require('../screen/images/arid.png')} style={{ alignSelf: 'center', height: 260, width: 260, resizeMode: 'contain' }} height={270} width={700} />
                {/* <ActivityIndicator size="large" color="#00ff00" /> */}
            </View>) : null}
        </View>

    )
}

export default SplashScreen
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
})