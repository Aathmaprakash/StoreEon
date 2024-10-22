import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';
const backButtonImage = require('../asserts/images/arrow.png');

const RecycleBin = ({ navigation }) => {
  const [recycledItems, setRecycledItems] = useState([
    { 
      id: 1, 
      label: 'Document1.pdf', 
      size: '1.2 MB', 
      type: 'Documents', 
      folder: 'Work Documents', 
      color: '#4CAF50' 
    },
    { 
      id: 2, 
      label: 'Image1.jpg', 
      size: '700 KB', 
      type: 'Images', 
      folder: 'Vacation 2024', 
      color: '#2196f3' 
    },
    { 
      id: 3, 
      label: 'Video1.mp4', 
      size: '15 MB', 
      type: 'Videos', 
      folder: 'Movies', 
      color: '#FFC107' 
    },
    { 
      id: 4, 
      label: 'OtherFile.zip', 
      size: '5 MB', 
      type: 'Others', 
      folder: 'Downloads', 
      color: '#FF5722' 
    },
  ]);

  const restoreItem = (item) => {
    Alert.alert(
      'Restore Item',
      `Are you sure you want to restore "${item.label}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Restore', onPress: () => Alert.alert(`${item.label} restored!`) },
      ]
    );
  };

  const deleteItem = (item) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to permanently delete "${item.label}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => Alert.alert(`${item.label} permanently deleted!`) },
      ]
    );
  };

  const emptyRecycleBin = () => {
    Alert.alert(
      'Empty Recycle Bin',
      'Are you sure you want to empty the recycle bin? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Empty', onPress: () => Alert.alert('Recycle bin emptied!') },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#4a90e2', '#50b5e9', '#508c9b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={backButtonImage} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recycle Bin</Text>
        </View>

        <View style={styles.recycleBinList}>
          <Text style={styles.sectionTitle}>Deleted Items</Text>
          {recycledItems.map((item) => (
            <Animated.View key={item.id} style={styles.recycleItem}>
              <View style={[styles.recycleColor, { backgroundColor: item.color }]} />
              <View style={styles.itemDetails}>
                <Text style={styles.recycleLabel}>{item.label}</Text>
                <Text style={styles.recycleSize}>{item.size} | {item.type}</Text>
                <Text style={styles.folderLabel}>Folder: {item.folder}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.restoreButton}
                  onPress={() => restoreItem(item)}
                >
                  <Icon name="restore" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteItem(item)}
                >
                  <Icon name="delete-forever" size={24} color="#FF5722" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>

        <TouchableOpacity style={styles.emptyBinButton} onPress={emptyRecycleBin}>
          <Text style={styles.emptyBinText}>Empty Recycle Bin</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar navigation={navigation} activeRoute="RecycleBin" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#4a90e2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  recycleBinList: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  recycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  recycleColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  recycleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recycleSize: {
    fontSize: 14,
    color: '#666',
  },
  folderLabel: {   // Style for the folder name
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  restoreButton: {
    marginRight: 10,
  },
  deleteButton: {},
  emptyBinButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  emptyBinText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecycleBin;
