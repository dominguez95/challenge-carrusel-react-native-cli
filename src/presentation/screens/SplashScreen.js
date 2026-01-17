import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../redux/authSlice';
import { decodeToken, isTokenExpired } from '../../core/utils/jwt';

export default function SplashScreen({ navigation }) {
  const distpatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        await distpatch(fetchToken());
        navigation.replace('Home');
      } else {
        const decoded = decodeToken(token);
        if (isTokenExpired(decoded)) {
          await distpatch(fetchToken());
        }
        navigation.replace('Home');
      }
    };
    initAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
