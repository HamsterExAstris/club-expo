import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { useSession } from '../../../components/ctx';
import Repository from '../../../components/jnovel-club-api/Repository';

export default function SeriesListScreen() {
  const [series, setSeries] = useState<Series[]>();
  const session = useSession();

  const getSeries = async () => {
    setSeries(await Repository.getAllSeries(session?.session));
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={series}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/series/[id]", params: { id: item.slug } }} asChild>
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
