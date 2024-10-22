// NestableScrollContainer.js
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const NestableScrollContainer = ({ children }) => {
    return (
        <ScrollView style={styles.container}>
            <View>{children}</View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default NestableScrollContainer;
