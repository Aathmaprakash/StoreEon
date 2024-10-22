import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import BottomNavBar from './BottomNavBar';
const backButtonImage = require('../asserts/images/arrow.png');

const SendFeedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = () => {
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

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
          <Text style={styles.headerText}>Send Feedback</Text>
        </View>

        <View style={styles.contentContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write your feedback here..."
            placeholderTextColor="#ccc"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <BottomNavBar navigation={navigation} activeRoute="SendFeedback" />
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
    flex: 1, // This makes sure the headerText takes up the remaining space after the back button
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    height: 150,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: '#fdbb2d',
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

export default SendFeedback;
