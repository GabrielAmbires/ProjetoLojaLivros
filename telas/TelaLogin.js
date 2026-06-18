import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = () => {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha para continuar.');
      return;
    }

    setErro('');
    navigation.navigate('Home');
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.conteudo}>
        <Image
          source={require('./imagenslogin/BOOK FEST (2).png')}
          style={estilos.logo}
        />

        <View style={estilos.formulario}>
          <Text style={estilos.label}>E-mail</Text>
          <TextInput
            style={estilos.input}
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              setErro('');
            }}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
          />

          <Text style={estilos.label}>Senha</Text>
          <TextInput
            style={estilos.input}
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErro('');
            }}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#999"
          />

          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

          <View style={estilos.botaoContainer}>
            <Button
              title="Login"
              onPress={fazerLogin}
              color="#D3968C"
            />
          </View>
          <View style={estilos.botaoCadastro}>
            <Button 
              title="Cadastre-se aqui"
              onPress={() => navigation.navigate('Cadastro')}
              color="#0A3323" />
            <Text style={estilos.textoCadastro}>Não tem uma conta? </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4D5',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 260,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 10,
  },
  formulario: {
    gap: 5,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    fontSize: 14,
    height: 40,
    width: 250,
  },
  botaoContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#D3968C',
    marginTop: 15,
  },
  erro: {
    color: '#D32F2F',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  textoCadastro: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    marginTop: 5,
  },
  botaoCadastro: {
    marginTop: 5,
    borderRadius: 8,
    
  },
});
