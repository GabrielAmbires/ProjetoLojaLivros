import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './telas/TelaLogin';
import TelaCadastro from './telas/TelaCadastro';
import TelaHome from './telas/TelaHome';
import TelaFavs from './telas/TelaFavs';
import TelaDoProduto from './telas/TelaDoProduto';
import TelaProdutos from './telas/TelaProdutos';
import TelaCheckout from './telas/TelaCheckout';
import TelaPerfil from './telas/TelaPerfil';

const Camadas = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Camadas.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Camadas.Screen name="Login" component={TelaLogin} />
          <Camadas.Screen name="Cadastro" component={TelaCadastro} />
          <Camadas.Screen name="Home" component={TelaHome} />
          <Camadas.Screen name="Produtos" component={TelaProdutos} />
          <Camadas.Screen name="Favs" component={TelaFavs} />
          <Camadas.Screen name="produto" component={TelaDoProduto} />
          <Camadas.Screen name="Checkout" component={TelaCheckout} />
          <Camadas.Screen name="Perfil" component={TelaPerfil} />
        </Camadas.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
