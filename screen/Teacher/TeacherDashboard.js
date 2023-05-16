import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import { FlatGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/MaterialIcons';
const TeacherDashboard = ({ navigation }) => {
    const record = [
        {
            title: "Courses",
            navigateScreen: "TeacherCourses",
            icon: require("../images/attendance.png")
        },
        {
            title: "Grading",
            navigateScreen: "EvaluationTeacher",
            icon: require("../images/timetable.png")
        },
    ]
    const showItems = ({ item }) => {
        const handler = () => {
            navigation.navigate(item.navigateScreen);
        };
        return (
            <View>
                <Pressable style={styles.boxes}
                    onPressIn={() => handler()}>
                    <View style={{ elevation: 1, marginHorizontal: 2, backgroundColor: 'white', padding: 34, borderRadius: 16 }}>

                        <Image source={item.icon} style={{ alignSelf: 'center', height: 50, width: 50, resizeMode: 'contain' }} />

                        <Text style={{ textAlign: 'center', fontSize: 13, color: 'black', paddingVertical: 10 }}>{item.title}</Text>
                    </View>

                </Pressable>
            </View>
        )
    }
    return (
        <View style={styles.conatiner}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text style={styles.headerFont}>Dashboard</Text>
                    <Text style={styles.header2Font}>Welcome Mr.Shabbir</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                    <Icon name="notifications" size={30} color='#fff' />
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}>
                        <Image source={require('../images/notification.png')} style={{ marginRight: 10, alignSelf: 'center', height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                        <Image source={require('../images/avatar-icon.png')} style={{ alignSelf: 'center', height: 35, width: 50, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 5, backgroundColor: '#099e78' }}>
                <View style={{ flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#f2f0f5' }}>
                    <FlatGrid
                        itemDimension={130}
                        data={record}
                        renderItem={showItems}>
                    </FlatGrid>
                </View>
            </View>
        </View >
    )
}
export default TeacherDashboard;
const styles = StyleSheet.create({
    conatiner:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    header:
    {
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#099e78',
        justifyContent: 'space-between',
        padding: 16,

    },
    headerFont:
    {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'cursive'
    },
    header2Font:
    {
        fontFamily: 'cursive',
        fontSize: 18,
        color: 'white'
    },
})
