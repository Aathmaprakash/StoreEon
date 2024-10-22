import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from './BottomNavBar';
const backButtonImage = require('../asserts/images/arrow.png');

const HelpCenter = ({ navigation }) => {
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
          <Text style={styles.headerText}>Help Center</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Find answers to frequently asked questions, troubleshoot issues, or get in touch with our support team.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FAQ')}>
            <LinearGradient
              colors={['#fdbb2d', '#f8a22f']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>View FAQ</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Support')}>
            <LinearGradient
              colors={['#fdbb2d', '#f8a22f']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Contact Support</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <BottomNavBar navigation={navigation} activeRoute="HelpCenter" />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center content vertically
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30, // Added more space between text and buttons
    lineHeight: 26, // Better line spacing for readability
  },
  button: {
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a2a6c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HelpCenter;
