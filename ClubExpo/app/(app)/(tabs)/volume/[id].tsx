import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../../components/Themed';
import { useSession } from '../../../../components/ctx';
import Repository from '../../../../components/jnovel-club-api/Repository';

export default function VolumeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [parts, setParts] = useState<Part[]>();
  const session = useSession();

  const getParts = async () => {
    // TODO: This is firing multiple times. Why?
    setParts(await Repository.getVolumeParts(session?.session, id));
  };

  useEffect(() => {
    getParts();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: id
        }} />
      <FlatList
        data={parts}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/part/[id]", params: { id: item.slug } }} asChild>
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
