import { useEffect, useState, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../redux/authSlice';
import { decodeToken, isTokenExpired } from '../../core/utils/jwt';

const WELCOME_WORDS = [
  'Hola',
  'Bienvenido',
  'Por favor',
  'espere un momento...',
];

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [hasError, setHasError] = useState(false);
  const [visibleWords, setVisibleWords] = useState([]);

  const fadeAnims = useRef(
    WELCOME_WORDS.map(() => new Animated.Value(0)),
  ).current;

  const initAuth = async () => {
    setHasError(false);
    setVisibleWords([]);
    fadeAnims.forEach(anim => anim.setValue(0));

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
      setHasError(true);
      animateWords();
    }
  };

  const animateWords = () => {
    WELCOME_WORDS.forEach((word, index) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, word]);
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, index * 600);
    });
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />

      {hasError && (
        <View style={styles.content}>
          <View style={styles.wordsContainer}>
            {WELCOME_WORDS.map((word, index) => (
              <Animated.Text
                key={index}
                style={[styles.word, { opacity: fadeAnims[index] }]}
              >
                {word}
              </Animated.Text>
            ))}
          </View>

          {visibleWords.length === WELCOME_WORDS.length && (
            <TouchableOpacity style={styles.button} onPress={initAuth}>
              <Text style={styles.buttonText}>Reintentar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    marginTop: 40,
    alignItems: 'center',
  },
  wordsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  word: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#0000ff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
