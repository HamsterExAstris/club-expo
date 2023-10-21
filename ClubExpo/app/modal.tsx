import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Platform, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const [keys, setKeys] = useState<readonly string[]>();

  const getKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();
    setKeys(keys.toSorted());
  };

  useEffect(() => {
    getKeys();
  }, []);

  const clearCache = async () => {
    await AsyncStorage.clear();
    await getKeys();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={keys}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
      />

      <Button
        onPress={clearCache}
        title="Clear Cache"
        color="#841584"
        accessibilityLabel="Clear the cache"
      />

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
