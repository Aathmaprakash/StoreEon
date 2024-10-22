// NestableDraggableFlatList.js
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CellDecorator } from '../Screens/CellDecorators'; // Adjust import as necessary

const NestableDraggableFlatList = ({ data, renderItem, onDragEnd }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        onDragEnd(result);
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={handleDragEnd}
            // Add any other FlatList props you need
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});

export default NestableDraggableFlatList;
