import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [volumes, setVolumes] = useState<VolumesRequest>({
    pagination: {
      lastPage: true,
      limit: 1,
      skip: 0
    }, volumes: []
  });

  const getVolumes = async () => {
    if (id) {
      try {
        const response = await fetch(`https://labs.j-novel.club/app/v1/series/${id}/volumes?format=json`);
        const json = await response.json();
        setVolumes(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getVolumes();
  }, [id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={volumes?.volumes}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/volume/[id]", params: {id: item.slug}}} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text style={{ opacity: pressed ? 0.5 : 1 }}>{item.title}{item.originalTitle ? ` (${item.originalTitle})` : ""}</Text>
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
