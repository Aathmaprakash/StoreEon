/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';


enableScreens();
// Import your screen components
import Home from './Screens/home';
import Folders from './Screens/network';
import Profile from './Screens/profile';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import FolderContents from './Screens/FolderContents';
import StorageManagement from './Screens/Storagemanagement'; 
import RecycleBin from './Screens/RecycleBin';
import Backup from './Screens/BackUp';
import Security from './Screens/Security';
import SendFeedback from './Screens/SendFeedback';
import HelpCenter from './Screens/HelpCenter';
import AboutStoreEon from './Screens/AboutStoreEon';

// Import the context and provider
import { ClassroomProvider } from './Screens/ClassroomContext';
import { FileProvider } from './Screens/FileContext'; // Adjust the import path accordingly

// Export components from index.js
export { default as NestableScrollContainer } from '../StoreEon/Components/NestableScrollContainer';
export { default as NestableDraggableFlatList } from '../StoreEon/Components/NestableDraggableFlatList';
export * from '../StoreEon/Components/CellDecorators'; // Assuming you have multiple exports

const Stack = createStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ClassroomProvider>
          <FileProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator: ({ current, layouts }) => {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                },
              }}
            >
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Signup' component={Signup} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name='Folders' component={Folders} />
              <Stack.Screen name="FolderContents" component={FolderContents} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="StorageManagement" component={StorageManagement} />
              <Stack.Screen name="RecycleBin" component={RecycleBin} />
              <Stack.Screen name='Backup' component={Backup}/>
              <Stack.Screen name='Security' component={Security}/>
              <Stack.Screen name='SendFeedback' component={SendFeedback}/>
              <Stack.Screen name='HelpCenter' component={HelpCenter}/>
              <Stack.Screen name='AboutStoreEon' component={AboutStoreEon}/>
             
              {/* Add other screens here */}
            </Stack.Navigator>
          </FileProvider>
        </ClassroomProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
