import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Product} from './model/Products';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../App';
import LocalDB from './persistance/localdb';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({navigation}: HomeProps): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const productItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.push('Detalles', {product: item})}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDetails}>Precio: $ {item.precio}</Text>
        </View>
        <Text
          style={[
            styles.itemBadge,
            item.currentStock < item.minStock ? styles.itemBadgeError : null,
          ]}>
          {item.currentStock}
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    LocalDB.init();

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://${WebServicesParams.host}:${WebServicesParams.port}/productos',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        setProducts(await response.json());
      } catch (error) {
        console.error(error);
      }
    };

    const focusListener = navigation.addListener('focus', fetchProducts);

    return () => {
      navigation.removeListener('focus', fetchProducts);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={productItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productItem: {
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
  },
  itemBadge: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#e0f7fa',
  },
  itemBadgeError: {
    color: 'red',
    backgroundColor: '#ffebee',
  },
});

export default Home;
