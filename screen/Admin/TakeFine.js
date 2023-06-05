import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import IP from '../ip'
import { Button, TextInput } from 'react-native-paper'
const TakeFine = ({ route }) => {
    const { item } = route.params;
    const [amount, setAmount] = useState("");
    const [des, setDes] = useState("")
    const AddFine = async () => {
        try {
            if (amount && des) {
                let f = { reg_no: item.reg_no, amount: amount, description: des }
                console.log(f);
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Admin/AddFine`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(f),
                }
                );
                const data = await response.json();
                console.log("data", data);
                alert("Fine Added !");
            }
            else {
                alert("Please enter fields");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 30, marginTop: 10, color: 'black', fontFamily: 'cursive' }}>Fine</Text>
            <View style={styles.subContainer}>
                <TextInput placeholder='Enter Amount' mode="outlined" value={amount}
                    onChangeText={(text) => setAmount(text)}></TextInput>
                <TextInput placeholder="Enter Description" multiline value={des} mode="outlined" onChangeText={(val) => setDes(val)}
                    style={{ height: 200 }}></TextInput>
                <Button mode="contained" onPress={AddFine} style={styles.btn}
                >Submit</Button>
            </View>

        </View>
    )
}

export default TakeFine

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer:
    {
        marginHorizontal: 20,
        padding: 10
    },
    btn:
    {
        marginVertical: 20,
        backgroundColor: "#099e78"
    },
    input:
    {
        height: 200
    }
})