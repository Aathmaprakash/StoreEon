import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';

const backButtonImage = require('../asserts/images/arrow.png');
const videoIcon = require('../asserts/images/video-call.png');
const imageIcon = require('../asserts/images/image-.png');
const genericFileIcon = require('../asserts/images/document.png');

const Backup = ({ navigation }) => {
  const [backups, setBackups] = useState([
    { id: '1', name: 'Documents Backup', status: 'Completed', progress: 1, image: genericFileIcon },
    { id: '2', name: 'Photos Backup', status: 'In Progress', progress: 0.7, image: imageIcon },
    { id: '3', name: 'Videos Backup', status: 'Pending', progress: 0, image: videoIcon },
    { id: '4', name: 'Music Backup', status: 'Completed', progress: 1, image: genericFileIcon },
  ]);

  const handleBackup = () => {
    console.log('Backup initiated');
    // Add logic to start backup process
  };

  const renderBackupItem = ({ item }) => (
    <View style={styles.backupItem}>
      <View style={styles.backupIconContainer}>
        <Image source={item.image} style={styles.iconImage} />
      </View>
      <View style={styles.backupDetails}>
        <Text style={styles.backupTitle}>{item.name}</Text>
        <Text style={styles.backupStatus}>Status: {item.status}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
        </View>
      </View>
    </View>
  );

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
          <Text style={styles.headerText}>Backup Status</Text>
        </View>

        <View style={styles.card}>
          <FlatList
            data={backups}
            renderItem={renderBackupItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <TouchableOpacity style={styles.backupButton} onPress={handleBackup}>
          <Text style={styles.backupButtonText}>Initiate Backup</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar navigation={navigation} activeRoute="Backup" />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    paddingBottom: 10,
  },
  backupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backupIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  backupDetails: {
    flex: 1,
  },
  backupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backupStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  backupButton: {
    backgroundColor: '#fdbb2d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 20,
  },
  backupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Backup;