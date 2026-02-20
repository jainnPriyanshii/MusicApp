import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator.js';
import { View } from 'react-native';
import MiniPlayer from './src/components/MiniPlayer.js';



export default function App() {
  const [currentRoute, setCurrentRoute] = React.useState('MainTabs');

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        onStateChange={(state) => {
          if (state) {
            const route = state.routes[state.index];
            setCurrentRoute(route.name);
          }
        }}
      >
        <AppNavigator />
        {currentRoute !== 'Player' && <MiniPlayer />}
      </NavigationContainer>
    </View>
  );
}