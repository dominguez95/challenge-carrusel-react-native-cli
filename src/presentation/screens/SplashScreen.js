import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../redux/authSlice';
import { decodeToken, isTokenExpired } from '../../core/utils/jwt';

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!token) {
          await dispatch(fetchToken()).unwrap();
          navigation.replace('Home');
        } else {
          const decoded = decodeToken(token);

          if (isTokenExpired(decoded.expireDate)) {
            await dispatch(fetchToken()).unwrap();
          }
          navigation.replace('Home');
        }
      } catch (error) {
        console.log(error);
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
