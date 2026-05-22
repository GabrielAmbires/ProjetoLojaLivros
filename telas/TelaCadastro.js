import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
      <Text>Nome</Text>
      <TextInput style={estilos.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" />
      <Text>Email</Text>
      <TextInput style={estilos.input} value={email} onChangeText={setEmail} placeholder="Digite seu email" />
      <Text>Senha</Text>
      <TextInput style={estilos.input} value={senha} onChangeText={setSenha} secureTextEntry placeholder="Digite sua senha" />
      <Button title="Cadastrar" onPress={fazerCadastro} />
      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  erro: { color: 'red', marginTop: 10 },
});