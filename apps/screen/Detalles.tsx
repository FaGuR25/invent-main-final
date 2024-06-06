import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Product} from './model/Products';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';

export type Params = {
  product: Product;
};

export type Props = {
  route: RouteProp<RootStackParamList, 'Detalles'>;
  navigation: StackNavigationProp<RootStackParamList, 'Detalles'>;
};

function Detalles({route}: Props): React.JSX.Element {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <View style={styles.card}>
          <Text style={styles.header}>{product.nombre}</Text>
          <Text style={styles.text}>Precio: ${product.precio}</Text>
          <Text style={styles.text}>Stock Min: {product.minStock}</Text>
          <Text style={styles.text}>Stock Max: {product.maxStock}</Text>
          <Text style={styles.text}>Stock Actual: {product.currentStock}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
});

export default Detalles;
