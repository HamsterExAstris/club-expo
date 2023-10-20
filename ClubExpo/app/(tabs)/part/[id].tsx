import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { View } from '../../../components/Themed';

export default function PartDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [part, setPart] = useState<PartData>({
    clearData: "",
    partTitle: "Loading...",
  });

  const getPart = async () => {
    if (id) {
      try {
        const response = await fetch(`https://labs.j-novel.club/app/v1/parts/${id}/data?format=json`);
        const json = await response.json();
        setPart(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPart();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: id
        }} />
      {
        Platform.OS !== "web"
          ?
          <WebView
            source={{ html: part.clearData.replace("</head>", '<meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">body {text-align:justify;} img {max-width: 100%}</style></head>') }}
            style={{ flex: 1, marginTop: 20 }}

            pagingEnabled
          />
          : <iframe srcDoc={part.clearData} />
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
