import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerCadastro = () => {
    navigation.navigate('Home', { cadastrado: true });
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.conteudo}>
        <Image
          source={require('./imagenslogin/BOOK FEST (2).png')}
          style={estilos.logo}
        />

        <View style={estilos.formulario}>
          <Text style={estilos.label}>Nome</Text>
          <TextInput
            style={estilos.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
          />

          <Text style={estilos.label}>E-mail</Text>
          <TextInput
            style={estilos.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
          />

          <Text style={estilos.label}>Senha</Text>
          <TextInput
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#999"
          />

          <View style={estilos.botaoContainer}>
            <Button
              title="Cadastrar"
              onPress={fazerCadastro}
              color="#D3968C"
            />
          </View>

          <Button
            title="Faça login aqui"
            onPress={() => navigation.navigate('Login')}
            color="#0A3323"
          />
          <Text style={estilos.textoCadastro}>Já tem uma conta? </Text>
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
    marginTop: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#D3968C',
  },
  textoCadastro: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    marginTop: 15,
  },
});
