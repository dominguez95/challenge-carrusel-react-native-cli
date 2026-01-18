import { useEffect } from 'react';

import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Carrusel from '../components/Carrusel';
import { fetchCarrusels } from '../redux/carruselSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.carrusels);

  useEffect(() => {
    dispatch(fetchCarrusels());
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <FlatList
        data={data}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <Carrusel title={item.title} data={item.items} type={item.type} />
        )}
      />
    </SafeAreaView>
  );
}
