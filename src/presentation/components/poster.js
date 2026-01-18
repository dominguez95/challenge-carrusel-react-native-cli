import { View, Text, StyleSheet, Pressable } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

export default function Poster({ item, variant = 'thumb' }) {
  const navigation = useNavigation();
  const isThumb = variant === 'thumb';
  const imageUrl =
    variant == 'thumb'
      ? 'https://picsum.photos/640/480?random=1'
      : 'https://picsum.photos/320/480?random=1';
  const handlePressDetails = data => {
    if (data.videoUrl) {
      navigation.navigate('Video', { url: data.videoUrl });
    } else {
      navigation.navigate('Details', { data });
    }
  };

  if (isThumb) {
    // Texto encima de la imagen
    return (
      <Pressable
        onPress={() => handlePressDetails(item)}
        style={({ pressed }) => [
          styles.pressThumb,
          styles.pressContainer,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <View style={styles.posterContainer}>
          <FastImage
            source={{
              uri: imageUrl || 'https://picsum.photos/640/480',
              priority: FastImage.priority.normal,
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={() => handlePressDetails(item)}
      style={({ pressed }) => [
        styles.pressPoster,
        styles.pressContainer,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <View style={styles.cardContainer}>
        <FastImage
          source={{
            uri: imageUrl || 'https://picsum.photos/640/480',
            priority: FastImage.priority.normal,
          }}
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  posterContainer: {
    width: 200,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 12,
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardTitle: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  pressThumb: {
    width: 200,
    height: 300,
  },

  pressPoster: {
    width: 300,
    height: 250,
  },
  pressContainer: {
    marginHorizontal: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
