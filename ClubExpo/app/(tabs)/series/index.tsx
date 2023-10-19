import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';

export default function SeriesListScreen() {
  const [data, setData] = useState<SeriesRequest>({
    pagination: {
      lastPage: true,
      limit: 1,
      skip: 0
    }, series: []
  });
  const [selectedId, setSelectedId] = useState<string>();

  const getSeries = async () => {
    try {
      const response = await fetch('https://labs.j-novel.club/app/v1/series?format=json');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Series</Text>
      {
        selectedId &&
        <>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text>{selectedId}</Text>
        </>
      }
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={data?.series}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/series/[id]", params: {id: item.slug}}} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text style={{ opacity: pressed ? 0.5 : 1 }}>{item.title} ({item.originalTitle})</Text>
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
