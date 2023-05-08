import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const ChartTest = ({ data }) => {
    console.log("first")
    const { average, excellent, good, poor } = data;
    const widthAndHeight = 220
    const series = [excellent, average, good, poor]
    const sliceColor = ['#4CAF50', '#2196F3', '#FF9800', '#F44336']

    const total = average + excellent + good + poor;
    const excellentPercentage = ((excellent / total) * 100).toFixed(0);
    const goodPercentage = ((good / total) * 100).toFixed(0);
    const poorPercentage = ((poor / total) * 100).toFixed(0);
    const averagePercentage = ((average / total) * 100).toFixed(0);

    const legends = [
        { name: 'Excellent', percentage: excellentPercentage, color: '#4CAF50' },
        { name: 'Good', percentage: goodPercentage, color: '#2196F3' },
        { name: 'Average', percentage: averagePercentage, color: '#FF9800' },
        { name: 'Poor', percentage: poorPercentage, color: '#F44336' },
    ];

    return (
        <View style={styles.chartContainer}>
            <View style={styles.container}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
            </View>
            <View style={styles.legend}>
                {
                    legends?.map((legend, index) => (
                        <Text key={index} style={[styles.legendText, { backgroundColor: legend.color }]}>{legend.name} : {legend.percentage}%</Text>
                    ))
                }
            </View>
        </View>
    );

}
export default ChartTest
const styles = StyleSheet.create({
    chartContainer: {
        flexDirection: "row"
    },
    container: {
        alignItems: 'flex-start',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 24,
        margin: 10
    },
    legend: {
        justifyContent: "center",
        gap: 15,
        marginLeft: 10,
    },
    legendText: {
        paddingVertical: 2,
        color: "white",
        paddingHorizontal: 10,
        borderRadius: 10,
        textAlign: "center"
    },

});