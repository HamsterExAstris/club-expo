import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import Repository from '../../../components/jnovel-club-api/Repository';

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [volumes, setVolumes] = useState<Volume[]>();

  const getVolumes = async () => {
    setVolumes(await Repository.getVolumes(id));
  };

  useEffect(() => {
    getVolumes();
  }, [id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={volumes}
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
