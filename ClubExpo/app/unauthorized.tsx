import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://www.lipsum.com" }}
        style={{ flex: 1, marginTop: 20 }}

        pagingEnabled
      />
    </SafeAreaView>
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
