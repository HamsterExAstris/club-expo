import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';

import { useState } from 'react';
import { useSession } from '../components/ctx';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const session = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        inputMode='email'
        onChangeText={newText => setUsername(newText)}
        defaultValue={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
        secureTextEntry
      />
      <Text
        onPress={async () => {
          await session?.signIn(username, password);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/series');
        }}>
        Sign In
      </Text>
    </View>
  );
}
