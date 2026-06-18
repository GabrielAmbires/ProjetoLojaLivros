import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import TelaLogin from './telas/TelaLogin';
import TelaCadastro from './telas/TelaCadastro';
import TelaHome from './telas/TelaHome';
import TelaFavs from './telas/TelaFavs';
import TelaDoProduto from './telas/TelaDoProduto';
import TelaProdutos from './telas/TelaProdutos';
import TelaCheckout from './telas/TelaCheckout';
import TelaPerfil from './telas/TelaPerfil';
import TelaCarrinho from './telas/TelaCarrinho';
import TelaAdm from './telas/TelaAdm';
import { CarrinhoProvider, useCarrinho } from './contexto/CarrinhoContext';
import { fontes } from './config/fontes';

const Camadas = createNativeStackNavigator();
const telasComCarrinho = ['Home', 'Produtos', 'Favs', 'produto', 'Perfil'];
const telasComAdm = ['Home', 'Produtos', 'Favs', 'produto', 'Perfil'];

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [Text.defaultProps.style, { fontFamily: fontes.principal }];
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [TextInput.defaultProps.style, { fontFamily: fontes.principal }];

function BotaoCarrinhoGlobal({ navigationRef, rotaAtual }) {
  const { totalItens } = useCarrinho();

  if (!telasComCarrinho.includes(rotaAtual)) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        estilos.botaoCarrinhoGlobal,
        estilos.botaoCarrinhoTopoDireito,
      ]}
      onPress={() => navigationRef.current?.navigate('Carrinho')}
      activeOpacity={0.85}
    >
      <Ionicons name="cart-outline" size={24} color="#FFF" />
      {totalItens > 0 ? (
        <View style={estilos.badgeCarrinho}>
          <Text style={estilos.badgeCarrinhoTexto}>{totalItens}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

function BotaoAdmGlobal({ navigationRef, rotaAtual }) {
  if (!telasComAdm.includes(rotaAtual)) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        estilos.botaoCarrinhoGlobal,
        estilos.botaoAdmTopoEsquerdo,
      ]}
      onPress={() => navigationRef.current?.navigate('Adm')}
      activeOpacity={0.85}
    >
      <Ionicons name="code-slash-outline" size={23} color="#FFF" />
    </TouchableOpacity>
  );
}

export default function App() {
  const navigationRef = useRef(null);
  const [rotaAtual, setRotaAtual] = useState('Login');

  return (
    <SafeAreaProvider>
      <CarrinhoProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => setRotaAtual(navigationRef.current?.getCurrentRoute()?.name || 'Login')}
          onStateChange={() => setRotaAtual(navigationRef.current?.getCurrentRoute()?.name || 'Login')}
        >
          <Camadas.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Camadas.Screen name="Login" component={TelaLogin} />
            <Camadas.Screen name="Cadastro" component={TelaCadastro} />
            <Camadas.Screen name="Home" component={TelaHome} />
            <Camadas.Screen name="Produtos" component={TelaProdutos} />
            <Camadas.Screen name="Favs" component={TelaFavs} />
            <Camadas.Screen name="produto" component={TelaDoProduto} />
            <Camadas.Screen name="Carrinho" component={TelaCarrinho} />
            <Camadas.Screen name="Checkout" component={TelaCheckout} />
            <Camadas.Screen name="Perfil" component={TelaPerfil} />
            <Camadas.Screen name="Adm" component={TelaAdm} />
          </Camadas.Navigator>
        </NavigationContainer>

        <BotaoAdmGlobal navigationRef={navigationRef} rotaAtual={rotaAtual} />
        <BotaoCarrinhoGlobal navigationRef={navigationRef} rotaAtual={rotaAtual} />
      </CarrinhoProvider>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  botaoCarrinhoGlobal: {
    position: 'absolute',
    top: 42,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1F3A24',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  botaoCarrinhoTopoDireito: {
    right: 18,
  },
  botaoAdmTopoEsquerdo: {
    left: 18,
  },
  badgeCarrinho: {
    position: 'absolute',
    right: -5,
    top: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#B45D5D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeCarrinhoTexto: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
});
