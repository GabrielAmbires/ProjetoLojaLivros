import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { autenticacao, bd } from '../config/firebaseConfig';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerCadastro = async () => {
    try {
      const respostaCadastro = await createUserWithEmailAndPassword(autenticacao, email, senha);
      const usuarioId = respostaCadastro.user.uid;

      await addDoc(collection(bd, 'usuarios'), {
        nome: nome,
        email: email,
        uid: usuarioId,
        dataCriacao: new Date()
      });

      navigation.navigate('Login');
    } catch (erro) {
      setErro('Erro ao cadastrar. Tente novamente.');
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
          
          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
          
          <View style={estilos.botaoContainer}>
            <Button 
              title="Cadastrar" 
              onPress={fazerCadastro}
              color="#D3968C"
            />
          </View>
          
          <Text style={estilos.textoCadastro}>Já tem uma conta? </Text>
          <Button 
            title="Faça login aqui" 
            onPress={() => navigation.navigate('Login')}
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
    width: 210,
    height: 210,
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
    paddingHorizontal: 25,
    paddingVertical: 14,
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