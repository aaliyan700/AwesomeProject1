// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { RadioButton, TextInput, Button } from 'react-native-paper';
// import IP from '../ip';
// const ExitForm = () => {
//     const [questionIndex, setQuestionIndex] = useState(0);
//     const [selectedValues, setSelectedValues] = useState({});
//     const [formData, setFormData] = useState({});
//     const GetQuestions = async () => {
//         console.log("fetching...")
//         // const reg_no = await AsyncStorage.getItem('username')
//         // console.log(reg_no);
//         try {
//             const query = `http://${IP}/StudentPortal/api/Student/GetExitFormQuestions`
//             console.log(query)
//             const response = await fetch(
//                 query, {
//                 method: 'GET',
//             }
//             );
//             console.log("Done")
//             const data = await response.json();
//             setFormData(data);
//             console.log("data", data);
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };
//     useEffect(() => {
//         GetQuestions();
//     }, [])
//     const handleNext = () => {
//         setQuestionIndex((prevIndex) => prevIndex + 3);
//     };

//     const handleBack = () => {
//         setQuestionIndex((prevIndex) => Math.max(0, prevIndex - 3));
//     };

//     const handleOptionChange = (questionId, value) => {
//         setSelectedValues((prevValues) => ({
//             ...prevValues,
//             [questionId]: value,
//         }));
//     };

//     const renderQuestions = () => {
//         const questions = [];
//         const categories = Object.keys(formData);
//         for (let i = questionIndex; i < questionIndex + 3; i++) {
//             if (i >= categories.length) {
//                 break;
//             }
//             const category = categories[i];
//             questions.push(
//                 <View key={category} style={styles.categoryContainer}>
//                     <Text style={styles.categoryTitle}>{category.replace(/_/g, ' ')}</Text>
//                     {formData[category].map((question) => (
//                         <View key={question.id}>
//                             <Text style={styles.question}>{question.question}</Text>
//                             <View style={styles.radioContainer}>
//                                 <RadioButton.Group
//                                     value={selectedValues[question.id]}
//                                     onValueChange={(value) =>
//                                         handleOptionChange(question.id, value)
//                                     }
//                                 >
//                                     <View style={styles.radioOption}>
//                                         <RadioButton value="excellent" />
//                                         <Text>Excellent</Text>
//                                     </View>
//                                     <View style={styles.radioOption}>
//                                         <RadioButton value="good" />
//                                         <Text>Good</Text>
//                                     </View>
//                                     <View style={styles.radioOption}>
//                                         <RadioButton value="average" />
//                                         <Text>Average</Text>
//                                     </View>
//                                     <View style={styles.radioOption}>
//                                         <RadioButton value="below_average" />
//                                         <Text>Below Average</Text>
//                                     </View>
//                                 </RadioButton.Group>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             );
//         }
//         return questions;
//     };
//     console.log("selected", selectedValues);
//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.formContainer}>
//                 {renderQuestions()}
//                 <View style={styles.buttonContainer}>
//                     {questionIndex > 0 && (

//                         <Button onPress={handleBack} mode="contained">Back</Button>
//                     )}
//                     {questionIndex + 3 < Object.keys(formData).length && (
//                         <Button onPress={handleNext} mode="contained">Next</Button>
//                     )}
//                     {
//                         questionIndex == Object.keys(formData).length && (
//                             <Button onPress={handleNext} mode="contained">Submit</Button>
//                         )
//                     }
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         backgroundColor: 'white',
//         paddingVertical: 20,
//     },
//     formContainer: {
//         paddingHorizontal: 20,
//     },
//     categoryContainer: {
//         marginBottom: 20,
//     },
//     categoryTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     question: {
//         marginBottom: 5,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     radioOption: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 20,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 20,
//     },
// });

// export default ExitForm;


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RadioButton, TextInput, Button } from 'react-native-paper';
import IP from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ExitForm = () => {
    const [formData, setFormData] = useState({});
    const [selectedValues, setSelectedValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [username, setUsername] = useState("");
    const getQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const user_name = await AsyncStorage.getItem('username');
            setUsername(user_name);
            // Simulating API call to fetch form data
            const response = await fetch(
                `http://${IP}/StudentPortal/api/Student/GetExitFormQuestions`
            );
            const data = await response.json();
            setFormData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch form data');
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    const handleRadioButtonChange = (questionId, value) => {
        setSelectedValues((prevSelectedValues) => {
            const updatedValues = prevSelectedValues.filter(
                (item) => item.question_id !== questionId
            );
            return [...updatedValues, { question_id: questionId, answer: value, reg_no: username }];
        });
    };

    const handleTextInputChange = (questionId, value) => {
        setSelectedValues((prevSelectedValues) => {
            const updatedValues = prevSelectedValues.filter(
                (item) => item.question_id !== questionId
            );
            return [...updatedValues, { question_id: questionId, answer: value, reg_no: username }];
        });
    };

    const handleNextSection = () => {
        if (currentSectionIndex < Object.keys(formData).length - 1) {
            setCurrentSectionIndex((prevIndex) => prevIndex + 1);
        } else {
            // Submit the form data
            console.log(selectedValues);
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    const sections = Object.keys(formData);
    const currentSection = sections[currentSectionIndex];
    const questions = formData[currentSection];
    console.log(selectedValues);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.categoryTitle}>{currentSection}</Text>
                {questions.map((question) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Text style={styles.question}>{question.question}</Text>
                        {question.type1 === 'radio' ? (
                            <RadioButton.Group
                                onValueChange={(value) => handleRadioButtonChange(question.id, value)}
                                value={
                                    selectedValues.find((item) => item.question_id === question.id)?.answer ||
                                    ''
                                }
                            >
                                <View style={styles.radioOption}>
                                    <RadioButton value="Good" />
                                    <Text>Good</Text>
                                </View>
                                <View style={styles.radioOption}>
                                    <RadioButton value="Average" />
                                    <Text>Average</Text>
                                </View>
                                <View style={styles.radioOption}>
                                    <RadioButton value="Below Average" />
                                    <Text>Below Average</Text>
                                </View>
                            </RadioButton.Group>
                        ) : (
                            <TextInput
                                value={
                                    selectedValues.find((item) => item.question_id === question.id)?.answer ||
                                    ''
                                }
                                onChangeText={(value) => handleTextInputChange(question.id, value)}
                                mode='outlined'
                            />
                        )}
                    </View>
                ))}
                <Button mode="contained" onPress={handleNextSection} style={{ backgroundColor: '#099e78' }}>
                    {currentSectionIndex < sections.length - 1 ? 'Next' : 'Submit'}
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    questionContainer: {
        backgroundColor: 'white',
        padding: 8,
        marginVertical: 5,
        elevation: 7
    },
    question: {
        marginBottom: 5,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    selectedValuesContainer: {
        marginTop: 20,
    },
    selectedValuesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedValuesList: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    selectedValueItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    selectedValueQuestion: {
        flex: 1,
        marginRight: 10,
    },
    selectedValue: {
        fontWeight: 'bold',
    },
});

export default ExitForm;
