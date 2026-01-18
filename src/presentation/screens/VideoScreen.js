import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';

export default function VideoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { url } = route.params;

  useEffect(() => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    });
    return () => {
      unsubscribe();
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    };
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        fullscreen={true}
      />

      <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
});
