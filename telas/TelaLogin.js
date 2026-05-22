import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async () => {
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha);
    } catch (erro) {
      setErro('Erro ao fazer login. Verifique seus dados.');
    }
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
          
          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
          
          <View style={estilos.botaoContainer}>
            <Button 
              title="Login" 
              onPress={fazerLogin}
              color="#D3968C"
            />
          </View>
          
          <Text style={estilos.textoCadastro}>Não tem uma conta? </Text>
          <Button 
            title="Cadastre-se aqui" 
            onPress={() => navigation.navigate('Cadastro')}
            color="#0A3323"
          />
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
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
  },
  input: { 
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  botaoContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#D3968C',
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
    marginTop: 15,
  },
});