import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      <View style={estilos.header}>
        <View>
          <Text style={estilos.saudacao}>Bem-vindo de volta</Text>
          <Text style={estilos.titulo}>Folha Viva</Text>
        </View>

        <View style={estilos.headerIcon}>
          <Ionicons name="leaf-outline" size={24} color="#FFF" />
        </View>

        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      <View style={estilos.conteudo}>
        <View style={estilos.heroCard}>
          <View style={estilos.logoBox}>
            <Image
              source={require('./imagenslogin/BOOK FEST (2).png')}
              style={estilos.logo}
            />
          </View>

          <Text style={estilos.cardTitulo}>Entrar na conta</Text>
          <Text style={estilos.cardTexto}>Acesse sua estante e continue sua proxima leitura.</Text>

          <View style={estilos.formulario}>
            <Text style={estilos.label}>E-mail</Text>
            <View style={estilos.inputBox}>
              <Ionicons name="mail-outline" size={18} color="#5C6C44" />
              <TextInput
                style={estilos.input}
                value={email}
                onChangeText={(texto) => {
                  setEmail(texto);
                  setErro('');
                }}
                placeholder="seu@email.com"
                placeholderTextColor="#9A9A8E"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={estilos.label}>Senha</Text>
            <View style={estilos.inputBox}>
              <Ionicons name="lock-closed-outline" size={18} color="#5C6C44" />
              <TextInput
                style={estilos.input}
                value={senha}
                onChangeText={(texto) => {
                  setSenha(texto);
                  setErro('');
                }}
                secureTextEntry
                placeholder="********"
                placeholderTextColor="#9A9A8E"
              />
            </View>

            {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

            <TouchableOpacity style={estilos.botaoPrincipal} onPress={fazerLogin} activeOpacity={0.85}>
              <Text style={estilos.botaoPrincipalTexto}>Login</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" style={estilos.botaoIcone} />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoSecundario}
              onPress={() => navigation.navigate('Cadastro')}
              activeOpacity={0.85}
            >
              <Text style={estilos.botaoSecundarioTexto}>Cadastre-se aqui</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD7',
  },
  header: {
    height: 132,
    backgroundColor: '#5B7A4C',
    paddingTop: 42,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  saudacao: {
    color: '#F7F4D5',
    fontSize: 13,
    fontWeight: '700',
    zIndex: 2,
  },
  titulo: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
    zIndex: 2,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#41623A',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  decorationTop: {
    position: 'absolute',
    right: -34,
    top: -38,
    width: 118,
    height: 118,
    backgroundColor: '#E3DAB4',
    borderRadius: 60,
    opacity: 0.22,
  },
  decorationBottom: {
    position: 'absolute',
    left: -46,
    bottom: -58,
    width: 130,
    height: 130,
    backgroundColor: '#8EA57A',
    borderRadius: 70,
    opacity: 0.28,
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  heroCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  logoBox: {
    alignSelf: 'center',
    width: 142,
    height: 142,
    borderRadius: 22,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  logo: {
    width: 128,
    height: 128,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  cardTitulo: {
    color: '#1F3A24',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  cardTexto: {
    color: '#5C6C44',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  formulario: {
    gap: 10,
  },
  label: {
    color: '#1F3A24',
    fontSize: 13,
    fontWeight: '800',
  },
  inputBox: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#1F3A24',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
    marginLeft: 10,
  },
  erro: {
    color: '#B45D5D',
    fontSize: 12,
    fontWeight: '800',
  },
  botaoPrincipal: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1F3A24',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  botaoPrincipalTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  botaoIcone: {
    marginLeft: 8,
  },
  botaoSecundario: {
    height: 46,
    borderRadius: 16,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSecundarioTexto: {
    color: '#31533A',
    fontSize: 14,
    fontWeight: '900',
  },
});
