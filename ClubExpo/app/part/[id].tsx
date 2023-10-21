import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { View } from '../../components/Themed';
import { useSession } from '../../components/ctx';
import Repository from '../../components/jnovel-club-api/Repository';

export default function PartDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [part, setPart] = useState<PartData>();
  const session = useSession();

  const getPart = async () => {
    setPart(await Repository.getPartData(session?.session, id))
  };

  useEffect(() => {
    getPart();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      {
        Platform.OS !== "web"
          ?
          <WebView
            source={{ html: part?.clearData?.replace("</head>", '<meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">body {text-align:justify;} img {max-width: 100%}</style></head>') ?? "" }}
            style={{ flex: 1, marginTop: 20 }}

            pagingEnabled
          />
          : <iframe style={{ height: '100%' }} srcDoc={part?.clearData} />
      }
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
