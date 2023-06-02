import React, { useState, useEffect, ToastAndroid } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from './ip';
import a from './images/logo.png';
import { useIsFocused } from '@react-navigation/native';
const LoginScreen = ({ navigation }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    console.log(a);
    useEffect(() => {
        if (isFocused) {
            setIsLoading(false);
        }
    }, [isFocused]);
    const GetUser = async (username, role) => {
        try {
            const query = `http://${IP}/StudentPortal/api/Login/GetUser?username=${username}&role=${role}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            await AsyncStorage.setItem('data', JSON.stringify(data));
            console.log("user info", data);
            setUserInfo(data);
        } catch (err) {
            console.log(err);
        }
    }
    const loginHandler = async () => {
        console.log("fetching...")
        setIsLoading(true);
        try {
            const query = `http://${IP}/StudentPortal/api/Login/LoginUser?username=${username}&password=${password}`
            console.log(query)
            const response = await fetch(
                query, {
                method: 'GET',
            }
            );
            console.log("Done")
            const data = await response.json();
            await AsyncStorage.setItem('username', username);
            console.log(data);
            setRole(data.role);
            if (data.role == "student") {
                // ///navigation.navigate("Dashboard", { data });
                EnrollmentHandler(username, data);
                // navigation.navigate("Dashboard")
            }
            else if (data.role == "admin") {
                navigation.navigate("DashboardAdmin");
                setIsLoading(false);
            }
            else if (data.role == "parent") {
                navigation.navigate("ParentDashboard", { data });
            }
            else if (data.role == "teacher") {
                navigation.navigate("TeacherDashboard");
            }
            else if (data.role == "parent") {
                await GetUser(username, role);
                navigation.navigate("ParentDashboard");
            }
            else {
                alert("invalid user")
                setIsLoading(false);
                return;
            }

        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }
    };
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };
    const EnrollmentHandler = async (username, lst) => {
        const query = `http://${IP}/StudentPortal/api/Student/GetEnrollmentStatus?reg_no=${username}`
        console.log(query)
        const response = await fetch(
            query, {
            method: 'GET',
        }
        );
        console.log("Done")
        const data = await response.json();
        console.log("status", data);
        console.log("done", data);
        if (data) {
            console.log("andar");
            console.log(role);
            await GetUser(username, role);
            navigation.navigate("Dashboard", { lst });
            console.log("moved");
        }
        else {
            navigation.navigate("Enrollment");
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('../screen/images/arid.png')}
                style={{ alignSelf: 'center', height: 200, width: 2000, resizeMode: 'contain' }} height={470} width={100}
            />
            <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                    {/* <Icon name="user" size={20} color="#BBBBBB" /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={text => setUserName(text)}
                        value={username}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputIcon}>
                    {/* <Icon name="lock" size={20} color="#BBBBBB" /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>
                {/* <TouchableOpacity style={styles.button} onPress={loginHandler}>
                    <Text style={styles.buttonLabel}>Login</Text>
                </TouchableOpacity> */}
                <View>
                    {/* Render login button with activity indicator when loading */}
                    <TouchableOpacity onPress={loginHandler} style={styles.button}
                        disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator color="white" /> // Show activity indicator when loading
                        ) : (
                            <Text style={styles.buttonLabel}>Login</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 24,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        flex: 1,
    },
    inputIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#099e78',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;


