import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator.js';
import { View } from 'react-native';
import MiniPlayer from './src/components/MiniPlayer.js';



export default function App() {
  return (
    <View style={{ flex: 1 }}>
    <NavigationContainer>
     <AppNavigator/>
    
    <MiniPlayer/>
    </NavigationContainer>
    </View>
  );
}