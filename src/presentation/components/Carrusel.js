import { FlatList, Text, View } from 'react-native';
import Poster from './poster';

export default function Carrusel({ title, data, type }) {
  return (
    <View style={{ marginVertical: 10, marginHorizontal: 0 }}>
      {title && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          {title}
        </Text>
      )}

      <FlatList
        data={data}
        horizontal
        keyExtractor={item => item.title}
        renderItem={({ item }) => <Poster item={item} variant={type} />}
      />
    </View>
  );
}
