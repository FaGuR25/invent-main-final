import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput} from 'react-native';
import {Product} from './model/Products';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import LocalDB from './persistance/localdb';

export type MovimientosScreenParams = {
  product: Product;
};

export function EntradasScreen(): React.JSX.Element {
  const route = useRoute<RouteProp<RootStackParamList, 'EntradasScreen'>>();
  const [product, setProduct] = useState<Product>(undefined);
  const [cantidad, setCantidad] = useState<number>(0);

  const btnOnPress = function () {
    agregarMovimiento(product, new Date(), cantidad);
  };
}
