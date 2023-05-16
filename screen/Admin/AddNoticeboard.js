import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import { TextInput } from 'react-native-paper'
const AddNoticeboard = ({ navigation }) => {
    //const [sectionList, setSectionList] = useState([]);
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    return (
        <View>
            <View style={styles.header}>
                <View>
                    <TextInput value={title} label={"Title"} placeholder='Enter Title'
                        mode="outlined"
                        onChangeText={(val) => setTitle(val)}>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={des} placeholder='Enter Description'
                        mode="outlined"
                        onChangeText={(val) => setDes(val)}
                        multiline
                        style={styles.inputDes}>
                    </TextInput>
                </View>
            </View>
            <Pressable style={styles.btn}
                onPressIn={() => navigation.navigate("NoticeboardDetail", { title, des })}>
                <Text style={styles.font}>Next</Text>
            </Pressable>
        </View>
    )
}

export default AddNoticeboard

const styles = StyleSheet.create({
    header:
    {
        marginHorizontal: 10,
        marginVertical: 20,
        padding: 10
    },
    inputDes:
    {
        height: 200
    },
    font:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    btn:
    {
        backgroundColor: '#099e78',
        marginHorizontal: 70,
        padding: 16,
        borderRadius: 20
    }

})