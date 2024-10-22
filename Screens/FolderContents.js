import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
  Switch,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import BottomNavBar from './BottomNavBar';
import { useFiles } from './FileContext';

const backButtonImage = require('../asserts/images/arrow.png');
const videoIcon = require('../asserts/images/video-call.png');
const imageIcon = require('../asserts/images/image-.png');
const genericFileIcon = require('../asserts/images/document.png');
const editIcon = require('../asserts/images/pen.png');
const deleteIcon = require('../asserts/images/delete.png');
const searchIcon = require('../asserts/images/search.png');
const filterIcon = require('../asserts/images/filter.png');
const gridViewIcon = require('../asserts/images/menu.png');
const listViewIcon = require('../asserts/images/list.png');
const starOutlineIcon = require('../asserts/images/star.png');
const starFilledIcon = require('../asserts/images/starout.png');

// Function to get the correct file icon based on extension
const getFileIcon = (file) => {
  const fileName = file.name;
  if (typeof fileName !== 'string') {
    console.error('Invalid file name:', file);
    return genericFileIcon;
  }
  const fileExtension = fileName.split('.').pop().toLowerCase();
  if (['mp4', 'mkv', 'avi'].includes(fileExtension)) {
    return videoIcon;
  } else if (['jpg', 'jpeg', 'png', 'gif', 'heic'].includes(fileExtension)) {
    return imageIcon;
  } else {
    return genericFileIcon;
  }
};

// Convert bytes to MB
const bytesToMB = (bytes) => {
  if (typeof bytes !== 'number') {
    console.error('Invalid input for bytesToMB:', bytes);
    return '0.00';
  }
  return (bytes / (1024 * 1024)).toFixed(2);
};
const FolderContents = ({ route, navigation }) => {
  const { folderName } = route.params;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { getFilesForFolder, editFile, deleteFile, toggleFavorite } = useFiles();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const [showVideos, setShowVideos] = useState(true);
  const [showDocuments, setShowDocuments] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const fetchedFiles = await getFilesForFolder(folderName);
        setFiles(fetchedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
        Alert.alert('Error', 'Failed to fetch files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [folderName, getFilesForFolder]);

 

  const filteredAndSortedFiles = useMemo(() => {
    return files
      .filter(file => {
        const fileName = file.name.toLowerCase();
        const query = searchQuery.toLowerCase();
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        const matchesSearch = fileName.includes(query);
        const matchesFilter = (
          (showImages && ['jpg', 'jpeg', 'png', 'gif', 'heic'].includes(fileExtension)) ||
          (showVideos && ['mp4', 'mkv', 'avi'].includes(fileExtension)) ||
          (showDocuments && !['jpg', 'jpeg', 'png', 'gif', 'heic', 'mp4', 'mkv', 'avi'].includes(fileExtension))
        );
        const matchesFavorite = !showOnlyFavorites || file.isFavorite;

        return matchesSearch && matchesFilter && matchesFavorite;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'size') return b.size - a.size;
        if (sortBy === 'date') return new Date(b.lastModified) - new Date(a.lastModified);
        return 0;
      });
  }, [files, searchQuery, showImages, showVideos, showDocuments, sortBy, showOnlyFavorites]);

  const handleFilePress = (file) => {
    setPreviewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  
  const renderFilePreview = () => {
    if (!previewFile) return null;

    const fileExtension = previewFile.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return (
        <Image
          source={{ uri: previewFile.uri }}
          style={styles.previewImage}
          resizeMode="contain"
        />
      );
    } else if (['mp4', 'mkv', 'avi'].includes(fileExtension)) {
      return (
        <Video
          source={{ uri: previewFile.uri }}
          style={styles.previewVideo}
          controls={true}
          resizeMode="contain"
        />
      );
    } else if (fileExtension === 'pdf') {
      return (
        <Pdf
          source={{ uri: previewFile.uri }}
          style={styles.previewPdf}
        />
      );
    } else {
      return (
        <Text style={styles.previewUnsupported}>
          Preview not available for this file type.
        </Text>
      );
    }
  };

  
  const handleToggleFavorite = useCallback((fileId) => {
    if (toggleFavorite) {
      toggleFavorite(folderName, fileId);
    } else {
      console.error('toggleFavorite function is not available');
    }
  }, [folderName, toggleFavorite]);
  const renderFileItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={[
        isGridView ? styles.gridItem : styles.listItem,
        selectedFiles.includes(item.id) && styles.selectedItem, // Highlight selected items
      ]}
      onPress={() => handleFilePress(item)}
      onLongPress={() => handleLongPressFile(item)}
    >
      <View style={styles.fileInfoContainer}>
        <Image source={getFileIcon(item)} style={styles.fileIcon} />
        <Text style={styles.fileName} numberOfLines={1}>{item.name}</Text>
        {!isGridView && <Text style={styles.fileSize}>{bytesToMB(item.size)} MB</Text>}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleToggleFavorite(item.id)} style={styles.favoriteButton}>
          <Image source={item.isFavorite ? starFilledIcon : starOutlineIcon} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const newName = prompt('Enter new file name:', item.name);
            if (newName) {
              const updatedFile = { ...item, name: newName };
              editFile(folderName, item.id, updatedFile);
            }
          }}
          style={styles.actionButton}
        >
          <Image source={editIcon} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [folderName, isGridView, selectedFiles, handleToggleFavorite, editFile, deleteFile]);
  

  const keyExtractor = useCallback((item) => item.id || item.name, []);

  const renderFilterOptions = () => (
    <View style={styles.filterOptions}>
      <Text style={styles.filterTitle}>Filter:</Text>
      <View style={styles.filterRow}>
        <Text>Images</Text>
        <Switch value={showImages} onValueChange={setShowImages} />
      </View>
      <View style={styles.filterRow}>
        <Text>Videos</Text>
        <Switch value={showVideos} onValueChange={setShowVideos} />
      </View>
      <View style={styles.filterRow}>
        <Text>Documents</Text>
        <Switch value={showDocuments} onValueChange={setShowDocuments} />
      </View>
    </View>
  );

  const deleteSelectedFiles = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${selectedFiles.length} files?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => {
            selectedFiles.forEach(fileId => deleteFile(folderName, fileId));
            setSelectedFiles([]); // Clear selection after deleting
          }
        },
      ]
    );
  };

  const handleLongPressFile = (file) => {
    if (selectedFiles.includes(file.id)) {
      setSelectedFiles(selectedFiles.filter(id => id !== file.id));
    } else {
      setSelectedFiles([...selectedFiles, file.id]);
    }
  };

  const renderSortOptions = () => (
    <View style={styles.sortOptions}>
      <Text style={styles.sortTitle}>Sort by:</Text>
      <TouchableOpacity onPress={() => setSortBy('name')} style={styles.sortButton}>
        <Text style={sortBy === 'name' ? styles.activeSortButton : null}>Name</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSortBy('size')} style={styles.sortButton}>
        <Text style={sortBy === 'size' ? styles.activeSortButton : null}>Size</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSortBy('date')} style={styles.sortButton}>
        <Text style={sortBy === 'date' ? styles.activeSortButton : null}>Date</Text>
      </TouchableOpacity>
    </View>
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={backButtonImage} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{folderName}</Text>
          <TouchableOpacity onPress={() => setShowOnlyFavorites(!showOnlyFavorites)} style={styles.favoriteToggle}>
            <Image 
              source={showOnlyFavorites ? starFilledIcon : starOutlineIcon} 
              style={styles.favoriteToggleIcon} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search files..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)} style={styles.viewToggle}>
            <Image source={isGridView ? listViewIcon : gridViewIcon} style={styles.viewToggleIcon} />
          </TouchableOpacity>
          {renderFilterOptions()}
          {renderSortOptions()}
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={filteredAndSortedFiles}
            renderItem={renderFileItem}
            keyExtractor={keyExtractor}
            style={styles.fileList}
            numColumns={isGridView ? 2 : 1}
            key={isGridView ? 'grid' : 'list'}
            ListEmptyComponent={<Text style={styles.emptyListText}>No files in this folder</Text>}
          />
        )}

        <Modal
          visible={!!previewFile}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreview}
        >
          <View style={styles.previewModal}>
            <TouchableOpacity style={styles.closePreview} onPress={closePreview}>
              <Text style={styles.closePreviewText}>Close</Text>
            </TouchableOpacity>
            {renderFilePreview()}
          </View>
        </Modal>
      </LinearGradient>
      <BottomNavBar navigation={navigation} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  
  },
  backButton: {
    marginRight: 15,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  favoriteToggle: {
    marginLeft: 'auto',
    padding: 5,
  },
  favoriteToggleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 10,

  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  viewToggle: {
    padding: 5,
  },
  viewToggleIcon: {
    width: 24,
    height: 24,
  },
  filterOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTitle: {
    color: '#fff',
    marginRight: 10,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  sortOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortTitle: {
    color: '#fff',
    marginRight: 10,
  },
  sortButton: {
    marginRight: 10,
  },
  activeSortButton: {
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Highlight selected files
  },
  deleteButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    aspectRatio: 1,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  fileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    overflow: 'hidden',
  },
  fileSize: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 5,
  },
  actionButton: {
    padding: 5,
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  emptyListText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
  previewModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closePreview: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  closePreviewText: {
    color: '#fff',
    fontSize: 18,
  },
  previewImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
  previewVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
  previewPdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  previewUnsupported: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FolderContents;
