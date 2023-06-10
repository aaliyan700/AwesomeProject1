// import { StyleSheet, Text, View, ScrollView } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import IP from '../ip';
// import ChartTest from './ChartTest';
// const QuestionRating = ({ route }) => {
//     const { item } = route.params;
//     console.log("item testing", item);
//     const { selectedValue } = route.params;
//     console.log("session Testing", selectedValue);
//     const [teacherId, setTeacherId] = useState(item.teacher_id);
//     const [courseCode, setCourseCode] = useState(item.course_code);
//     console.log("testing teacherID", teacherId);
//     console.log("Testing coursecode", courseCode);
//     const [teacherPoint, setTeacherPoint] = useState([]);
//     console.log(item.teacherName);
//     console.log(item.course_name);
//     const GetRating = async () => {
//         try {
//             const query = `http://${IP}/StudentPortal/api/Admin/GetTeacherFeedback?teacherId=${teacherId}&&courseCode=${courseCode}&&session=${selectedValue}`
//             console.log("Query string", query);
//             const response = await fetch(
//                 query, {
//                 method: 'GET',
//             }
//             );
//             console.log("Done")
//             const data = await response.json();
//             console.log(data);
//             setTeacherPoint(data);
//             console.log(">>>>>>>>>>");
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     useEffect(() => {
//         GetRating();
//     }, [])
//     const isDataFound = (data) => {
//         const { average, excellent, good, poor } = data
//         if (average == 0 && excellent == 0 && good == 0 && poor == 0) {
//             return false
//         }
//         return true
//     }
//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <View style={styles.header}>
//                 <Text style={{ fontSize: 20, color: 'black' }}>{item.teacherName}</Text>
//                 <Text style={{ fontSize: 16, color: 'black' }}>{item.course_name}</Text>
//             </View>
//             {
//                 teacherPoint.data2 && isDataFound(teacherPoint.data2) ?
//                     <ChartTest data={teacherPoint?.data2} />
//                     :
//                     <View style={{ justifyContent: 'center' }}>
//                         <Text>no Data</Text>
//                     </View>
//             }
//             <ScrollView>
//                 {
//                     teacherPoint.data?.map((item, index) => {
//                         if (item != null) {
//                             return (
//                                 <View key={index} style={{ flexDirection: 'row', margin: 5, backgroundColor: 'white', padding: 3, elevation: 7, borderRadius: 2 }}>
//                                     <View style={{ flex: 15, margin: 10 }}>
//                                         <Text style={{ color: 'black', fontSize: 15 }}>{item.question}</Text>
//                                     </View>
//                                     <View style={{ flex: 2, margin: 10 }}>
//                                         <Text style={{ color: 'black', fontSize: 15 }}>{item.percentage}</Text>
//                                     </View>

//                                 </View>
//                             )
//                         }
//                     })
//                 }
//             </ScrollView>
//         </View>
//     )
// }

// export default QuestionRating

// const styles = StyleSheet.create({
//     content:
//     {
//         flexDirection: 'row',
//     },
//     header:
//     {
//         padding: 10,
//     }
// })



// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Picker } from '@react-native-picker/picker';
// import IP from '../ip';
// import ChartTest from './ChartTest';

// const QuestionRating = ({ route }) => {
//     const { item } = route.params;
//     console.log("first", item);

//     const [teacherPoint, setTeacherPoint] = useState([]);
//     const [selectedValue, setSelectedValue] = useState(null);

//     const sections = item.sections.map((section) => {
//         const [label, value] = section.split('-');
//         return { label, value };
//     });

//     const handleValueChange = (value) => {
//         setSelectedValue(value);
//     };

//     useEffect(() => {
//         if (selectedValue) {
//             GetRating();
//         }
//     }, [selectedValue]);

//     console.log("Selected Value:", selectedValue);

//     const GetRating = async () => {
//         try {
//             const query = `http://${IP}/StudentPortal/api/Admin/GetTeacherFeedback?id=${selectedValue}`
//             console.log("Query string", query);
//             const response = await fetch(query, {
//                 method: 'GET',
//             });
//             console.log("Done");
//             const data = await response.json();
//             console.log(data);
//             setTeacherPoint(data);
//             console.log(">>>>>>>>>>");
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text>QuestionRating</Text>
//             <Picker
//                 selectedValue={selectedValue}
//                 onValueChange={handleValueChange}
//                 style={styles.picker}
//             >
//                 {sections.map((section, index) => (
//                     <Picker.Item key={index} label={section.label} value={section.value} />
//                 ))}
//             </Picker>
//             <Text style={styles.selectedValueText}>Selected Value: {selectedValue}</Text>
//         </View>
//     );
// };

// export default QuestionRating;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     picker: {
//         width: 200,
//         height: 50,
//         borderWidth: 1,
//         borderColor: 'black',
//         marginTop: 20,
//         alignSelf: 'center',
//     },
//     selectedValueText: {
//         marginTop: 20,
//     },
// });





// import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Picker } from '@react-native-picker/picker';
// import IP from '../ip';
// import ChartTest from './ChartTest';

// const QuestionRating = ({ route }) => {
//     const { item } = route.params;
//     console.log("first", item);

//     const [teacherPoint, setTeacherPoint] = useState([]);
//     const [selectedValue, setSelectedValue] = useState(null);

//     const sections = item.sections.map((section) => {
//         const [label, value] = section.split('-');
//         return { label, value };
//     });

//     const handleValueChange = (value) => {
//         setSelectedValue(value);
//     };

//     useEffect(() => {
//         if (selectedValue) {
//             GetRating();
//         }
//     }, [selectedValue]);

//     console.log("Selected Value:", selectedValue);

//     const GetRating = async () => {
//         try {
//             const query = `http://${IP}/StudentPortal/api/Admin/GetTeacherFeedback?id=${selectedValue}`
//             console.log("Query string", query);
//             const response = await fetch(query, {
//                 method: 'GET',
//             });
//             console.log("Done");
//             const data = await response.json();
//             console.log(data);
//             setTeacherPoint(data);
//             console.log(">>>>>>>>>>");
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const renderChart = () => {
//         if (!teacherPoint.data2 || (teacherPoint.data2.average === 0 && teacherPoint.data2.excellent === 0 && teacherPoint.data2.good === 0 && teacherPoint.data2.poor === 0)) {
//             return <Text>No data available for chart.</Text>;
//         } else {
//             return <ChartTest data={teacherPoint.data2} />;
//         }
//     };

//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <Picker
//                     selectedValue={selectedValue}
//                     onValueChange={handleValueChange}
//                     style={styles.picker}
//                 >
//                     {sections.map((section, index) => (
//                         <Picker.Item key={index} label={section.label} value={section.value} />
//                     ))}
//                 </Picker>
//                 <View style={styles.chartContainer}>
//                     {renderChart()}
//                 </View>

//                 <View style={styles.cardContainer}>
//                     {teacherPoint.data && teacherPoint.data.length > 0 ? (
//                         teacherPoint.data.map((item, index) => (
//                             <View key={index} style={styles.card}>
//                                 <Text> {item.question}</Text>
//                                 <Text>Percentage {item.percentage}</Text>
//                             </View>
//                         ))
//                     ) : (
//                         <Text>No data available for cards.</Text>
//                     )}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default QuestionRating;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     picker: {
//         width: 200,
//         height: 50,
//         borderWidth: 1,
//         borderColor: 'black',
//         marginTop: 20,
//         alignSelf: 'center',
//     },
//     selectedValueText: {
//         marginTop: 20,
//     },
//     chartContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     cardContainer: {
//         marginTop: 10,
//         marginHorizontal: 10,
//         elevation: 3,
//         backgroundColor: 'white',
//     },
//     card: {
//         padding: 10,
//         marginVertical: 5,
//         borderColor: 'black',
//         borderRadius: 2,
//         marginBottom: 2,
//     },
// });


import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import IP from '../ip';
import ChartTest from './ChartTest';

const QuestionRating = ({ route }) => {
    const { item } = route.params;
    console.log("first", item);

    const [teacherPoint, setTeacherPoint] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

    const sections = item.sections.map((section) => {
        const [label, value] = section.split('-');
        return { label, value };
    });

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        if (selectedValue) {
            GetRating();
        }
    }, [selectedValue]);

    console.log("Selected Value:", selectedValue);

    const GetRating = async () => {
        try {
            const query = `http://${IP}/StudentPortal/api/Admin/GetTeacherFeedback?id=${selectedValue}`
            console.log("Query string", query);
            const response = await fetch(query, {
                method: 'GET',
            });
            console.log("Done");
            const data = await response.json();
            console.log(data);
            setTeacherPoint(data);
            console.log(">>>>>>>>>>");
        } catch (err) {
            console.log(err);
        }
    };

    const renderChart = () => {
        if (!teacherPoint.data2 || (teacherPoint.data2.average === 0 && teacherPoint.data2.excellent === 0 && teacherPoint.data2.good === 0 && teacherPoint.data2.poor === 0)) {
            return <Text>No data available for chart.</Text>;
        } else {
            return <ChartTest data={teacherPoint.data2} />;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
                style={styles.picker}
            >
                <Picker.Item label={"Select Section"} />
                {sections.map((section, index) => (
                    <Picker.Item key={index} label={section.label} value={section.value} />
                ))}
            </Picker>
            <View style={styles.chartContainer}>
                {renderChart()}
            </View>

            <View style={styles.cardContainer}>
                {teacherPoint.data && teacherPoint.data.length > 0 ? (
                    teacherPoint.data.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.questionText}>{item.question}</Text>
                            <Text style={styles.percentageText}>Percentage: {item.percentage}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No data available for cards.</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default QuestionRating;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 20,
    },
    picker: {
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 20,
        alignSelf: 'center',
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    card: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    percentageText: {
        fontSize: 14,
    },
});
