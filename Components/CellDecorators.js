// CellDecorators.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CellDecorator = ({ item }) => {
    return (
        <View style={styles.cell}>
            <Text>{item.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cell: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
