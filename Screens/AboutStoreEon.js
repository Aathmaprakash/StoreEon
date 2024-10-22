import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';

const backButtonImage = require('../asserts/images/arrow.png');

const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <Image source={icon} style={styles.featureIcon} />
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const AboutStoreEon = ({ navigation }) => {
  const features = [
    {
      icon: require('../asserts/images/cloud-computing.png'),
      title: 'Secure Cloud Storage',
      description: 'Enterprise-grade security with AWS S3 integration for reliable file storage'
    },
    
    {
      icon: require('../asserts/images/cloud-storage.png'),
      title: 'Smart Organization',
      description: 'Intuitive folder management with advanced search capabilities'
    },
    {
      icon: require('../asserts/images/sync.png'),
      title: 'Real-time Sync',
      description: 'Automatic synchronization across all your devices'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#4a90e2', '#50b5e9', '#508c9b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Image source={backButtonImage} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.headerText}>About StoreEon</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../asserts/images/cloud-computing.png')} 
                style={styles.logo}
              />
            </View>

            <Text style={styles.version}>Version 2.0.1</Text>
            
            <View style={styles.descriptionCard}>
              <Text style={styles.description}>
                StoreEon is your premium cloud storage solution, designed to make file management effortless and secure. 
                With powerful features and an intuitive interface, we help you stay organized and productive.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Key Features</Text>
            
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
        </ScrollView>

        <BottomNavBar navigation={navigation} activeRoute="AboutStoreEon" />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2C3E50'
  },
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff'
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 44  // To center the text accounting for back button
  },
  scrollView: {
    flex: 1
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: '#fff'
  },
  version: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  featureIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#fff'
  },
  featureContent: {
    flex: 1,
    marginLeft: 15
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5
  },
  featureDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 20
  }
});

export default AboutStoreEon;