import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function HomeScreen() {
  const auth = useSelector(state => state.auth);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen {auth.expiresAt}</Text>
    </View>
  );
}
