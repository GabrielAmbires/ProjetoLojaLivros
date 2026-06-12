import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './telas/TelaLogin';
import TelaCadastro from './telas/TelaCadastro';
import TelaHome from './telas/TelaHome';
import TelaFavs from './telas/TelaFavs';
import TelaDoProduto from './telas/TelaDoProduto';
import TelaProdutos from './telas/TelaProdutos';
import { onAuthStateChanged } from 'firebase/auth';
import { autenticacao } from './config/firebaseConfig';

const Camadas = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const desinscrever = onAuthStateChanged(autenticacao, (usuarioAtual) => {
      setUsuario(usuarioAtual);
    });
    return desinscrever;
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Camadas.Navigator screenOptions={{ headerShown: false }}>
          {usuario ? (
            <>
              <Camadas.Screen name="Home" component={TelaHome} />
              <Camadas.Screen name="Produtos" component={TelaProdutos} />
              <Camadas.Screen name="Favs" component={TelaFavs} />
              <Camadas.Screen name="produto" component={TelaDoProduto} />
            </>
          ) : (
            <>
              <Camadas.Screen name="Home" component={TelaHome} />
              <Camadas.Screen name="Login" component={TelaLogin} />
              <Camadas.Screen name="Cadastro" component={TelaCadastro} />
              <Camadas.Screen name="Produtos" component={TelaProdutos} />
              <Camadas.Screen name="Favs" component={TelaFavs} />
              <Camadas.Screen name="produto" component={TelaDoProduto} />
            </>
          )}
        </Camadas.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
