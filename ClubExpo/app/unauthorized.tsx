import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: "<html><body>Loading</body></html>" }}
        style={{ flex: 1, marginTop: 20 }}

        pagingEnabled
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
