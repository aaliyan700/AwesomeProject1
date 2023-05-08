import React, { useState, useEffect, ToastAndroid } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-paper';
import IP from '../ip';
const AssessmentSetting = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker2, setShowDatePicker2] = useState(false);

    const handleConfirm = (selectedDate) => {
        setStartDate(selectedDate);
        setShowDatePicker1(false);
    };
    const handleCancel = () => {
        setShowDatePicker1(false);
    };
    const handleConfirm1 = (selectedDate) => {
        setEndDate(selectedDate);
        setShowDatePicker2(false);
    };
    const handleCancel1 = () => {
        setShowDatePicker2(false);
    };
    const formattedDate1 = endDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).split('/').join('-');
    const formattedDate = startDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).split('/').join('-');
    const allowAssessment = async () => {
        try {
            let a = { start_date: formattedDate, end_date: formattedDate1 }
            console.log(a);
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Admin/AllowAssessment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(a)
            }
            );
            alert("Success");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Button mode="contained" onPress={() => setShowDatePicker1(true)} style={{ backgroundColor: '#099e78', padding: 2, width: 200 }} >StartDate</Button>
            </View>

            <Text style={styles.selectedDate}>Start Date: {formattedDate}</Text>
            {showDatePicker1 && (
                <DatePicker date={startDate} onDateChange={handleConfirm} onCancel={handleCancel} />
            )}
            <View>
                <Button mode="contained" onPress={() => setShowDatePicker2(true)} style={{ backgroundColor: '#099e78', padding: 2, width: 200 }}>EndDate</Button>
            </View>

            <Text style={styles.selectedDate}>End Date: {formattedDate1}</Text>
            {showDatePicker2 && (
                <DatePicker date={endDate} onDateChange={handleConfirm1} onCancel={handleCancel1} />
            )}
            <View style={{ marginTop: 10 }}>
                <Button onPress={() => allowAssessment()} mode="contained" style={{ backgroundColor: '#099e78', padding: 2, width: 200 }} >Allow</Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    selectedDate: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});
export default AssessmentSetting;
// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import DateRangePicker from 'rnv-date-range-picker';

// const AssessmentSetting = () => {
//     const [selectedDates, setSelectedDates] = useState([]);
//     const dateRangePickerRef = useRef(null);

//     const handleDateChange = (dates) => {
//         setSelectedDates(dates);
//     }

//     return (
//         <View>
//             <TouchableOpacity onPress={() => dateRangePickerRef.current.open()}>
//                 <Text>Select Dates</Text>
//             </TouchableOpacity>
//             <DateRangePicker
//                 ref={dateRangePickerRef}
//                 onChange={handleDateChange}
//                 startDate={selectedDates[0]}
//                 endDate={selectedDates[1]}
//             />
//             {selectedDates.length > 0 &&
//                 <View>
//                     <Text>Start Date: {selectedDates[0].toDateString()}</Text>
//                     <Text>End Date: {selectedDates[1].toDateString()}</Text>
//                 </View>
//             }
//         </View>
//     );
// };

// export default AssessmentSetting;
