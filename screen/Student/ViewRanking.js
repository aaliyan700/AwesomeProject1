// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ViewRanking = ({ route }) => {
//     const [item] = route.params;
//     console.log("data", item);
//     return (
//         <View>
//             <Text>ViewRanking</Text>
//         </View>
//     )
// }

// export default ViewRanking

// const styles = StyleSheet.create({})
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const ViewRanking = ({ route }) => {
    const [item] = route.params;
    const [teacherName, setTeacherName] = useState([]);
    const [teacherPercentage, setTeacherPercentage] = useState([]);
    const [questionResult, setQuestionResult] = useState([]);
    const filterData = () => {
        let name = [];
        let percenatge = [];
        item.totalResult.forEach(result => {
            const { percentage, teacherName } = result;
            console.log("Percentage:", percentage);
            name.push(result.teacherName);
            percenatge.push(result.percentage);
            console.log("Teacher Name:", teacherName);
        });
        console.log(name);
        console.log(percenatge);
        setTeacherName(name);
        setTeacherPercentage(percenatge);
        const questionResult = item.questionResult;
        console.log("questionResult", questionResult);
        setQuestionResult(questionResult);
        console.log("question..............", questionResult);
        questionResult.forEach(([question, results]) => {
            console.log("Question:", question);
            results.forEach(({ teacherName, percentage }) => {
                console.log("Teacher Name:", teacherName);
                console.log("Percentage:", percentage);
            });
            console.log("---");
        });
    }
    const renderQuestionItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.questionFont}>{item[0]}</Text>
            {item[1].map((teacher, idx) => (
                <View key={idx} style={styles.teacherContainer}>
                    <Text style={styles.answerFont}>{teacher.teacherName}</Text>
                    <Text style={styles.answerFont}>{teacher.percentage}</Text>
                </View>
            ))}
        </View>
    );
    useEffect(() => {
        filterData();
    }, [])
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Ranking</Text>
            <BarChart
                data={{
                    labels: teacherName,
                    datasets: [
                        {
                            data: teacherPercentage,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 16}
                height={200}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 12,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            <FlatList
                data={questionResult}
                renderItem={renderQuestionItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
    },
    card:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 5,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 4
    },
    card1:
    {
        flexDirection: 'row'
    },
    teacherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    questionFont:
    {
        fontWeight: '800'
    },
    answerFont:
    {
        fontWeight: '600'
    }
});

export default ViewRanking;

