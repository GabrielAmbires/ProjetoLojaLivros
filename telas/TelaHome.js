import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { autenticacao, bd } from '../config/firebaseConfig';

export default function TelaHome() {
  const [nome, setNome] = useState('');

  useEffect(() => {
    const buscarNomeUsuario = async () => {
      try {
        const usuarioId = autenticacao.currentUser?.uid;
        if (usuarioId) {
          const q = query(collection(bd, 'usuarios'), where('uid', '==', usuarioId));
          const documentos = await getDocs(q);
          if (!documentos.empty) {
            setNome(documentos.docs[0].data().nome);
          }
        }
      } catch (erro) {
        console.error('Erro ao buscar nome:', erro);
      }
    };

    buscarNomeUsuario();
  }, []);

  const fazerLogout = () => {
    signOut(autenticacao);
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.conteudo}>
        <Image 
          source={require('./imagenslogin/BOOK FEST (2).png')}
          style={estilos.logo}
        />
        
        <View style={estilos.formulario}>
          <Text style={estilos.bemvindo}>Bem-vindo, {nome}!</Text>
          
          <View style={estilos.botaoContainer}>
            <Button 
              title="Sair" 
              onPress={fazerLogout}
              color="#D3968C"
            />
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
    marginBottom: 30,
  },
  formulario: {
    gap: 15,
  },
  bemvindo: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#D3968C',
  },
});