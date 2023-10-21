import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import PartTitle from '../../components/PartTitle';
import { Text } from '../../components/Themed';
import { useSession } from '../../components/ctx';

export default function AppLayout() {
    const session = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (session?.isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session?.session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    const colorScheme = useColorScheme();

    // This layout can be deferred because it's not the root layout.
    return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    {
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{
          presentation: 'modal',
          title: "Clear Cache"
        }} />
        <Stack.Screen name="part/[id]" options={{
          presentation: 'modal',
          headerTitle: (props) => <PartTitle />
        }} />
      </Stack>
    }
  </ThemeProvider>;
}
