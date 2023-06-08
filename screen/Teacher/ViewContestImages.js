import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import IP from '../ip';

const ViewContestImages = ({ route }) => {
    const { ele } = route.params;
    console.log("Elements", ele);
    let imageUris = ele.images.map(
        (imageName) => `http://${IP}/StudentPortal/AttendanceImages/${imageName}`
    );

    return (
        <ScrollView horizontal={true} contentContainerStyle={styles.container}>
            {imageUris.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.image} />
                </View>
            ))}
        </ScrollView>
    );
};

export default ViewContestImages;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 400,
        height: 600, // Makes the image circular
        overflow: 'hidden',
        margin: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
