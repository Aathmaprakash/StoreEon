import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ProgressBarAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';
const backButtonImage = require('../asserts/images/arrow.png');

const StorageManagement = ({ navigation }) => {
  const [storageUsed] = useState('2.4 GB');
  const [totalStorage] = useState('15 GB');
  const [storageBreakdown] = useState([
    { id: 1, label: 'Documents', size: '1.5 GB', color: '#4CAF50' },
    { id: 2, label: 'Images', size: '600 MB', color: '#2196f3' },
    { id: 3, label: 'Videos', size: '200 MB', color: '#FFC107' },
    { id: 4, label: 'Others', size: '100 MB', color: '#FF5722' },
  ]);

  return (
    <LinearGradient
      colors={['#4a90e2', '#50b5e9', '#508c9b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={backButtonImage} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Storage Management</Text>
        </View>

        <View style={styles.storageIndicator}>
          <Text style={styles.storageTitle}>
            {storageUsed} of {totalStorage} used
          </Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={2.4 / 15}
            color="#4CAF50"
          />
        </View>

        <View style={styles.storageBreakdown}>
          <Text style={styles.sectionTitle}>Storage Breakdown</Text>
          {storageBreakdown.map((item) => (
            <View key={item.id} style={styles.breakdownItem}>
              <View style={[styles.breakdownColor, { backgroundColor: item.color }]} />
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <Text style={styles.breakdownSize}>{item.size}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.freeUpSpaceButton}
          onPress={() => alert('Freeing up space...')}
        >
          <Text style={styles.freeUpSpaceText}>Free Up Space</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavBar navigation={navigation} activeRoute="Profile" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  storageIndicator: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  storageBreakdown: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  breakdownColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  breakdownSize: {
    fontSize: 16,
    color: '#666',
  },
  freeUpSpaceButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    marginHorizontal: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  freeUpSpaceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default StorageManagement;
