import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const [keys, setKeys] = useState<readonly string[]>();

  const getKeys = async () => {
    setKeys(await AsyncStorage.getAllKeys());
  };

  useEffect(() => {
    getKeys();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <FlatList
        data={keys}
        renderItem={({ item }) => (
          <Text>{item}</Text>
              )}
      />
      
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
