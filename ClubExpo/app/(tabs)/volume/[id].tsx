import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';

export default function VolumeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [parts, setParts] = useState<PartsRequest>({
    pagination: {
      lastPage: true,
      limit: 1,
      skip: 0
    }, parts: []
  });

  const getParts = async () => {
    if (id) {
      try {
        const response = await fetch(`https://labs.j-novel.club/app/v1/volumes/${id}/parts?format=json`);
        const json = await response.json();
        setParts(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getParts();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen 
      options={{
        title: id
      }}/>
      <FlatList
        data={parts?.parts}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/volume/[id]", params: {id: item.slug}}} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text style={{ opacity: pressed ? 0.5 : 1 }}>{item.title}</Text>
                )}
              </Pressable>
            </Link>
        )}
      />
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
