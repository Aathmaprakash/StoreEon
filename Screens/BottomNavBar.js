/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import homeIcon from '../asserts/images/home.png';
import networkIcon from '../asserts/images/paper.png';
import userIcon from '../asserts/images/user2.png';

const navItems = [
  { name: 'Home', icon: homeIcon },
  { name: 'Folders', icon: networkIcon },
  { name: 'Profile', icon: userIcon },
];

const BottomNavBar = ({ navigation, activeRoute }) => {
  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => navigation.navigate(item.name)}
        >
          <Image
            source={item.icon}
            style={[
              styles.icon,
              { tintColor: activeRoute === item.name ? '#4a90e2' : '#ffffff' },
            ]}
          />
          <Text
            style={[
              styles.navText,
              activeRoute === item.name && styles.activeNavText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1c3b5a',
    borderTopWidth: 1,
    borderTopColor: '#0b1f3a',
    height: 70,
    paddingBottom: 0,
    borderRadius:10,
    
     // Add some padding at the bottom for better touch area
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#ffffff',
  },
  activeNavText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});

export default BottomNavBar;
