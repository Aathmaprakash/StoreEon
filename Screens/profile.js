import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';

const backButtonImage = require('../asserts/images/bluearrow.png');

const Profile = ({ navigation }) => {
  const [privacyMode, setPrivacyMode] = useState(false);
  const [user] = useState({
    name: 'Aathmaprakash S',
    email: 'aathmaprakash@gmail.com',
    avatar: 'AS', 
    storageUsed: '2.4 GB',
    totalStorage: '15 GB'
  });

  const menuItems = [
    {
      section: 'Storage',
     items: [
        { id: 1, title: 'Storage Management', subtitle: `${user.storageUsed} of ${user.totalStorage} used` },
        { id: 2, title: 'Recycle Bin', subtitle: 'Recently deleted files' },
        { id: 3, title: 'Backup Status', subtitle: 'Last backup: Today 3:30 PM' },
      ]
    },
   
    {
      section: 'App Settings',
      items: [

        { id: 9, title: 'Notifications', subtitle: 'Manage alerts' },
      ]
    },
    {
      section: 'Support',
      items: [
        { id: 10, title: 'Help Center',  subtitle: 'FAQs and guides' },
        { id: 11, title: 'Send Feedback',  subtitle: 'Help us improve' },
        { id: 12, title: 'About Storeeon', subtitle: 'App version and info' },
        { id: 13, title: 'Logout',subtitle: 'Sign out of your account' },
      ]
    }
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
    key={item.id}
    style={styles.menuItem}
    onPress={() => {
      if (item.title === 'Storage Management') {
        navigation.navigate('StorageManagement');
      }
      if (item.title === 'Recycle Bin') {
        navigation.navigate('RecycleBin');
      }
      if (item.title === 'Backup Status') {
        navigation.navigate('Backup');
      }
      if (item.title === 'Security Settings') {
        navigation.navigate('Security');
      }
      if (item.title === 'Send Feedback') {
        navigation.navigate('SendFeedback');
      }
      if (item.title === 'Help Center') {
        navigation.navigate('HelpCenter');
      }
      if (item.title === 'About Storeeon') {
        navigation.navigate('AboutStoreEon');
      }
     
    
    }}
  >
    
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} size={24} color="#3b3b3b" />
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemText}>{item.title}</Text>
          <Text style={styles.menuItemSubtext}>{item.subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Image source={backButtonImage} style={styles.backButtonImage} />
    </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#4a90e2', '#50b5e9', '#508c9b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
         
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user.avatar}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.storageIndicator}>
          <View style={styles.storageTextContainer}>
            <Text style={styles.storageTitle}>Storage Used</Text>
            <Text style={styles.storageText}>{user.storageUsed} of {user.totalStorage}</Text>
          </View>
          <View style={styles.storageBar}>
            <View style={[styles.storageProgress, { width: '35%' }]} />
          </View>
        </View>

        <View style={styles.privacySection}>
          <Text style={styles.privacyTitle}>Privacy mode</Text>
          <Switch
            value={privacyMode}
            onValueChange={setPrivacyMode}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={privacyMode ? "#ffffff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {menuItems.map((section) => (
          <View key={section.section} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            {section.items.map(renderMenuItem)}
          </View>
        ))}
      </ScrollView>
      <BottomNavBar navigation={navigation} activeRoute="Profile" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4a90e2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButtonImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    color:"#fff"
  },
  profileSection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
   menuItemImage: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuItemImagePlaceholder: {
    width: 24,
    height: 24,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  storageIndicator: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  storageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  storageText: {
    fontSize: 14,
    color: '#666',
  },
  storageBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  storageProgress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  privacySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  privacyTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    padding: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtext: {
    fontSize: 12,
    color: '#999',
  },
});

export default Profile;
