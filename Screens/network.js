import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Share,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';
import { useClassroom } from './ClassroomContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from '../asserts/images/find.png';
import Insertfile from '../asserts/images/insertfile.png';

const Folders = ({ navigation }) => {
  const { classrooms, addClassroom, removeClassroom } = useClassroom();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newClassroomName, setNewClassroomName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const filteredClassrooms = useMemo(() => {
    return classrooms.filter(classroom =>
      classroom.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [classrooms, searchQuery]);

  const addNewClassroom = useCallback(() => {
    if (newClassroomName.trim()) {
      addClassroom(newClassroomName.trim());
      setNewClassroomName('');
      setModalVisible(false);
    }
  }, [addClassroom, newClassroomName]);

  const generateInviteLink = useCallback(() => {
    const link = `https://yourapp.com/invite/${Date.now()}`;
    setInviteLink(link);
  }, []);

  const shareInviteLink = useCallback(async () => {
    try {
      await Share.share({
        message: `Join my classroom! ${inviteLink}`,
      });
    } catch (error) {
      console.error('Error sharing invite link:', error);
    }
  }, [inviteLink]);  // Close the shareInviteLink function properly

  const openDeleteModal = useCallback((classroom) => {
    setSelectedClassroom(classroom);
    setDeleteModalVisible(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirmation.trim().toLowerCase() === selectedClassroom.toLowerCase()) {
      removeClassroom(selectedClassroom);
      setDeleteModalVisible(false);
      setDeleteConfirmation('');
      setSelectedClassroom('');
    } else {
      Alert.alert("Error", "The folder name you entered doesn't match. Please try again.");
    }
  }, [deleteConfirmation, selectedClassroom, removeClassroom]);

  const navigateToFolderContents = useCallback((folderName) => {
    navigation.navigate('FolderContents', { folderName });
  }, [navigation]);

  const renderFolderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.folderItem}
      onPress={() => navigateToFolderContents(item)}
      onLongPress={() => openDeleteModal(item)}
    >
      <Image 
        source={Insertfile} 
        style={styles.folderIcon} 
      />
      <Text style={styles.folderText}>{item}</Text>
    </TouchableOpacity>
  ), [navigateToFolderContents, openDeleteModal]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#4a90e2', '#50b5e9', '#508c9b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Networks</Text>
        </View>

        <View style={styles.searchContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Search folders..."
            placeholderTextColor="#fff"
          />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.foldersContainer}>
            {filteredClassrooms.map((classroom, index) => (
              <React.Fragment key={classroom}>
                {renderFolderItem({ item: classroom })}
                {index < filteredClassrooms.length - 1 && <View style={styles.folderSeparator} />}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.addClassroomButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addClassroomButtonText}>+</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Create New Folder</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewClassroomName}
                value={newClassroomName}
                placeholder="Enter folder name"
                placeholderTextColor="#999"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={addNewClassroom}>
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={generateInviteLink}>
                  <Text style={styles.buttonText}>Generate Invite Link</Text>
                </TouchableOpacity>
              </View>
              {inviteLink ? (
                <View style={styles.inviteLinkContainer}>
                  <Text style={styles.inviteLinkText}>{inviteLink}</Text>
                  <TouchableOpacity style={styles.shareButton} onPress={shareInviteLink}>
                    <Text style={styles.buttonText}>Share Link</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Delete Folder</Text>
              <Text style={styles.deleteInstructions}>
                To confirm deletion, please type the folder name:
              </Text>
              <Text style={styles.folderNameToDelete}>{selectedClassroom}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setDeleteConfirmation}
                value={deleteConfirmation}
                placeholder="Type folder name here"
                placeholderTextColor="#999"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setDeleteModalVisible(false);
                    setDeleteConfirmation('');
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <BottomNavBar navigation={navigation} activeRoute="Folders" />
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
  scrollView: {
    flex: 1,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 10,
  },
  addClassroomButtonText: {
    color: '#1a2a6c',
    fontSize: 30,
    fontWeight: 'bold',
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
  searchInput: {
    flex: 1,
    height: 45,
    color: '#fff',
    fontSize: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  foldersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedFolder: {
     backgroundColor: '#fdbb2d',
  },
  folderIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    tintColor: '#fff',
  },
  folderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  folderSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 10,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  fileList: {
    marginTop: 10,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  fileIcon: {
    marginRight: 10,
  },
  fileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyListText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
  addClassroomButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fdbb2d',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 20,
    color: '#333',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    backgroundColor: '#4a90e2',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  inviteLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  inviteLinkText: {
    color: '#333',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteInstructions: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  folderNameToDelete: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 20,
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
});

export default Folders;