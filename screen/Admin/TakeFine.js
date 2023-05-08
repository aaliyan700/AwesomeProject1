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
                const response = await fetch(
                    `http://${IP}/StudentPortal/api/Admin/AddFine`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reg_no: item.reg_no, amount: amount, description: des
                    }),
                }
                );
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
            <View style={styles.subContainer}>
                <TextInput label={"Amount"} mode="outlined" value={amount}
                    onChangeText={(text) => setAmount(text)}></TextInput>
                <TextInput label={"Description"} mode="outlined" value={des}
                    onChangeText={(text) => setDes(text)}></TextInput>
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
    }
})