import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './apps/screen/Home';
import Login from './apps/screen/Login';
import Detalles, {Params as ProductDetailsParams} from './apps/screen/Detalles';
import ProducAdd from './apps/screen/ProductAdd';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import React from 'react';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detalles: ProductDetailsParams;
  ProductAdd: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function HomeHeader(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.buttonAdd}
      onPress={() => navigation.navigate('ProductAdd')}>
      <Text style={styles.buttonText}>AGREGAR</Text>
    </TouchableOpacity>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => <HomeHeader />,
            headerTitle: 'Inicio',
            headerStyle: {backgroundColor: '#ffa000'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Detalles"
          component={Detalles}
          options={{
            headerStyle: {backgroundColor: '#ffa000'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProductAdd"
          component={ProducAdd}
          options={{
            headerStyle: {backgroundColor: '#ffa000'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonAdd: {
    backgroundColor: 'teal',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
