import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Keyboard,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import BottomNavBar from './BottomNavBar';
import Upload from '../asserts/images/upload.png';
import SearchIcon from '../asserts/images/find.png';
import { useClassroom } from './ClassroomContext';
import { useFiles } from './FileContext';
import { useFocusEffect } from '@react-navigation/native';
import AlertModal from './AlertModal';

const Home = ({ navigation }) => {
  const { classrooms, addClassroom } = useClassroom();
  const { addFile } = useFiles();
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newClassroomName, setNewClassroomName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      return () => {
        StatusBar.setBarStyle('default');
      };
    }, [])
  );

  useEffect(() => {
    const filtered = classrooms.filter(classroom =>
      classroom.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClassrooms(filtered);
  }, [searchQuery, classrooms]);

  const handleAddClassroom = () => {
    if (newClassroomName.trim()) {
      addClassroom(newClassroomName.trim());
      setSelectedClassroom(newClassroomName.trim());
      setNewClassroomName('');
      setModalVisible(false);
      showAlert('New folder created successfully');
    }
  };

  const handleFilePicker = async () => {
    if (!selectedClassroom) {
      showAlert('Please select a folder first');
      return;
    }

    try {
      setIsLoading(true);
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Simulate a delay for file upload (replace this with actual upload logic)
      setTimeout(() => {
        addFile(selectedClassroom, {
          id: Date.now().toString(),
          name: res[0].name,
          uri: res[0].uri,
          type: res[0].type,
          size: res[0].size,
        });

        setIsLoading(false);
        showAlert('File uploaded successfully');
      }, 2000); // 2 seconds delay
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setIsLoading(false);
      } else {
        console.error(err);
        setIsLoading(false);
        showAlert('An error occurred while uploading the file');
      }
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const renderClassroomItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.classroomItem, selectedClassroom === item && styles.selectedClassroom]}
      onPress={() => setSelectedClassroom(item)}
    >
      <Text style={[styles.classroomText, selectedClassroom === item && styles.selectedClassroomText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#4a90e2', '#50b5e9', '#508c9b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>StoreEon</Text>
        </View>

        <View style={styles.searchContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Folders..."
            placeholderTextColor="#bdc3c7"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.classroomSelector}>
          <FlatList
            data={filteredClassrooms}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderClassroomItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.classroomList}
          />
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.uploadBox} onPress={handleFilePicker}>
            <Image source={Upload} style={styles.image} />
            <Text style={styles.uploadText}>Upload Files/Images</Text>
          </TouchableOpacity>
          {selectedClassroom && (
            <Text style={styles.selectedFolderText}>Selected Folder: {selectedClassroom}</Text>
          )}
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Uploading...</Text>
          </View>
        )}

        {/* Custom Alert Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={alertVisible}
          onRequestClose={() => setAlertVisible(false)}
        >
          <View style={styles.alertContainer}>
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>{alertMessage}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setAlertVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Add New Folder Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => {
              Keyboard.dismiss();
              setModalVisible(false);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add New Folder</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewClassroomName}
                value={newClassroomName}
                placeholder="Enter Folder name"
                placeholderTextColor="#95a5a6"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={handleAddClassroom}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity style={styles.addClassroomButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addClassroomButtonText}>+</Text>
        </TouchableOpacity>

        <BottomNavBar navigation={navigation} activeRoute="Home" />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    elevation: 3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#fff',
    fontSize: 16,
  },
  classroomSelector: {
    marginBottom: 20,
  },
  classroomList: {
    paddingHorizontal: 10,
  },
  classroomItem: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedClassroom: {
    backgroundColor: '#fdbb2d',
  },
  classroomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedClassroomText: {
    color: '#1a2a6c',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  uploadBox: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 15,
    tintColor: '#fff',
  },
  uploadText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  selectedFolderText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    color: '#1a2a6c',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#fdbb2d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#1a2a6c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    color: '#1a2a6c',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#b21f1f',
    borderWidth: 1,
    borderRadius: 5,
    color: '#1a2a6c',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#fdbb2d',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#1a2a6c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#b21f1f',
  },
  addClassroomButton: {
    backgroundColor: '#fdbb2d',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addClassroomButtonText: {
    color: '#1a2a6c',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;