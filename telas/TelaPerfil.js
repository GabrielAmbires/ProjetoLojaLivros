import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  autenticacao,
  bancoDados,
  armazenamento,
} from '../Config/firebaseConfig';

import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import {
  updateProfile,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const camposIniciais = {
  nome: '',
  sobrenome: '',
  rua: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
  telefone: '',
};

export default function TelaPerfil() {

  const [perfil, setPerfil] = useState(camposIniciais);

  const [photoUrl, setPhotoUrl] = useState(null);

  const [localImage, setLocalImage] = useState(null);

  const [editando, setEditando] = useState(false);

  const [carregando, setCarregando] = useState(true);

  const [salvando, setSalvando] = useState(false);

  const usuario = autenticacao.currentUser;

  useEffect(() => {

    const carregarDados = async () => {

      if (!usuario) {
        setCarregando(false);
        return;
      }

      const storageKey = `@perfil_usuario_${usuario.uid}`;

      try {

        const perfilLocal = await AsyncStorage.getItem(storageKey);

        if (perfilLocal) {

          const dadosLocais = JSON.parse(perfilLocal);

          setPerfil({
            nome: dadosLocais.nome || '',
            sobrenome: dadosLocais.sobrenome || '',
            rua: dadosLocais.rua || '',
            bairro: dadosLocais.bairro || '',
            cidade: dadosLocais.cidade || '',
            estado: dadosLocais.estado || '',
            cep: dadosLocais.cep || '',
            telefone: dadosLocais.telefone || '',
          });

          setPhotoUrl(dadosLocais.fotoUrl || null);

          setEditando(false);

          setCarregando(false);
        }

      } catch (e) {

        console.error('Erro ao carregar dados locais:', e);

      }

      try {

        const perfilRef = doc(bancoDados, 'users', usuario.uid);

        const perfilSnap = await getDoc(perfilRef);

        if (perfilSnap.exists()) {

          const dados = perfilSnap.data();

          const novosDados = {
            nome: dados.nome || '',
            sobrenome: dados.sobrenome || '',
            rua: dados.rua || '',
            bairro: dados.bairro || '',
            cidade: dados.cidade || '',
            estado: dados.estado || '',
            cep: dados.cep || '',
            telefone: dados.telefone || '',
            fotoUrl: dados.fotoUrl || usuario.photoURL || null,
          };

          setPerfil({
            nome: novosDados.nome,
            sobrenome: novosDados.sobrenome,
            rua: novosDados.rua,
            bairro: novosDados.bairro,
            cidade: novosDados.cidade,
            estado: novosDados.estado,
            cep: novosDados.cep,
            telefone: novosDados.telefone,
          });

          setPhotoUrl(novosDados.fotoUrl);

          setEditando(false);

          await AsyncStorage.setItem(
            storageKey,
            JSON.stringify(novosDados)
          );

        } else {

          const [primeiroNome, ...rest] =
            (usuario.displayName || '').split(' ');

          const dadosPadrao = {
            nome: primeiroNome || '',
            sobrenome: rest.join(' ') || '',
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            telefone: '',
            fotoUrl: usuario.photoURL || null,
          };

          setPerfil({
            nome: dadosPadrao.nome,
            sobrenome: dadosPadrao.sobrenome,
            rua: dadosPadrao.rua,
            bairro: dadosPadrao.bairro,
            cidade: dadosPadrao.cidade,
            estado: dadosPadrao.estado,
            cep: dadosPadrao.cep,
            telefone: dadosPadrao.telefone,
          });

          setPhotoUrl(dadosPadrao.fotoUrl);

          setEditando(true);

          await AsyncStorage.setItem(
            storageKey,
            JSON.stringify(dadosPadrao)
          );
        }

      } catch (erro) {

        console.error('Erro ao buscar dados:', erro);

        Alert.alert(
          'Erro',
          'Não foi possível carregar os dados.'
        );

      } finally {

        setCarregando(false);

      }
    };

    carregarDados();

  }, [usuario]);

  const selecionarFoto = async () => {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissao.status !== 'granted') {

      Alert.alert(
        'Permissão necessária',
        'Permita o acesso à galeria.'
      );

      return;
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

    if (!resultado.canceled &&
      resultado.assets?.length > 0) {

      setLocalImage(resultado.assets[0].uri);
    }
  };

  const uploadImageAsync = async (uri) => {

    const response = await fetch(uri);

    const blob = await response.blob();

    const imagemRef = ref(
      armazenamento,
      `profilePictures/${usuario.uid}/${Date.now()}`
    );

    const snapshot =
      await uploadBytes(imagemRef, blob);

    return await getDownloadURL(snapshot.ref);
  };

  const salvarPerfil = async () => {

    if (!usuario) {
      return;
    }

    setSalvando(true);

    try {

      let uploadedUrl = photoUrl;

      if (localImage) {

        uploadedUrl =
          await uploadImageAsync(localImage);
      }

      const nomeCompleto =
        `${perfil.nome.trim()} ${perfil.sobrenome.trim()}`.trim();

      const usuarioAtualizado = {};

      if (nomeCompleto) {
        usuarioAtualizado.displayName = nomeCompleto;
      }

      if (uploadedUrl) {
        usuarioAtualizado.photoURL = uploadedUrl;
      }

      if (Object.keys(usuarioAtualizado).length > 0) {

        await updateProfile(
          usuario,
          usuarioAtualizado
        );
      }

      const perfilRef =
        doc(bancoDados, 'users', usuario.uid);

      const novosDados = {
        nome: perfil.nome,
        sobrenome: perfil.sobrenome,
        rua: perfil.rua,
        bairro: perfil.bairro,
        cidade: perfil.cidade,
        estado: perfil.estado,
        cep: perfil.cep,
        telefone: perfil.telefone,
        fotoUrl: uploadedUrl || null,
        updatedAt: new Date(),
      };

      await setDoc(
        perfilRef,
        novosDados,
        { merge: true }
      );

      const storageKey =
        `@perfil_usuario_${usuario.uid}`;

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(novosDados)
      );

      setPhotoUrl(uploadedUrl);

      setLocalImage(null);

      setEditando(false);

      Alert.alert(
        'Sucesso',
        'Perfil atualizado.'
      );

    } catch (erro) {

      Alert.alert(
        'Erro',
        'Não foi possível salvar.'
      );

    } finally {

      setSalvando(false);

    }
  };

  const atualizarCampo = (campo, valor) => {

    setPerfil((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  };

  if (carregando) {

    return (
      <View style={estilos.centralizado}>
        <ActivityIndicator
          size="large"
          color="#0D4D4D"
        />
      </View>
    );
  }

  return (

    <ScrollView
      contentContainerStyle={estilos.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={estilos.titulo}>
        VERITY
      </Text>

      <View style={estilos.avatarContainer}>

        {
          localImage ? (

            <Image
              source={{ uri: localImage }}
              style={estilos.avatar}
            />

          ) : photoUrl ? (

            <Image
              source={{ uri: photoUrl }}
              style={estilos.avatar}
            />

          ) : (

            <View
              style={[
                estilos.avatar,
                estilos.avatarVazio,
              ]}
            >

              <Text style={estilos.avatarTexto}>
                Foto
              </Text>

            </View>
          )
        }

        {
          editando && (

            <TouchableOpacity
              style={estilos.botaoFoto}
              onPress={selecionarFoto}
            >

              <Text style={estilos.textoBotaoFoto}>
                Editar Foto
              </Text>

            </TouchableOpacity>
          )
        }

      </View>

      <Text style={estilos.label}>
        Nome
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.nome}
        onChangeText={(valor) =>
          atualizarCampo('nome', valor)
        }
        editable={editando}
        placeholder="Digite seu nome"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        Sobrenome
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.sobrenome}
        onChangeText={(valor) =>
          atualizarCampo('sobrenome', valor)
        }
        editable={editando}
        placeholder="Digite seu sobrenome"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        Rua
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.rua}
        onChangeText={(valor) =>
          atualizarCampo('rua', valor)
        }
        editable={editando}
        placeholder="Digite sua rua"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        Bairro
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.bairro}
        onChangeText={(valor) =>
          atualizarCampo('bairro', valor)
        }
        editable={editando}
        placeholder="Digite seu bairro"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        Cidade
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.cidade}
        onChangeText={(valor) =>
          atualizarCampo('cidade', valor)
        }
        editable={editando}
        placeholder="Digite sua cidade"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        Estado
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.estado}
        onChangeText={(valor) =>
          atualizarCampo('estado', valor)
        }
        editable={editando}
        placeholder="Digite seu estado"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        CEP
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.cep}
        onChangeText={(valor) =>
          atualizarCampo('cep', valor)
        }
        editable={editando}
        keyboardType="numeric"
        placeholder="Digite seu CEP"
        placeholderTextColor="#777"
      />

      <Text style={estilos.label}>
        Telefone
      </Text>

      <TextInput
        style={estilos.input}
        value={perfil.telefone}
        onChangeText={(valor) =>
          atualizarCampo('telefone', valor)
        }
        editable={editando}
        keyboardType="phone-pad"
        placeholder="Digite seu telefone"
        placeholderTextColor="#777"
      />

      {
        editando ? (

          <>

            <TouchableOpacity
              style={estilos.botaoSalvar}
              onPress={salvarPerfil}
              disabled={salvando}
            >

              <Text style={estilos.textoBotaoSalvar}>

                {
                  salvando
                    ? 'Salvando...'
                    : 'Salvar Perfil'
                }

              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoCancelar}
              onPress={() =>
                setEditando(false)
              }
            >

              <Text style={estilos.textoBotaoCancelar}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </>

        ) : (

          <TouchableOpacity
            style={estilos.botaoEditar}
            onPress={() =>
              setEditando(true)
            }
          >

            <Text style={estilos.textoBotaoEditar}>
              Editar Perfil
            </Text>

          </TouchableOpacity>
        )
      }

    </ScrollView>
  );
}

const estilos = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#ECE8D5',
    padding: 22,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 34,
    color: '#0D4D4D',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '800',
    letterSpacing: 2,
    fontFamily: 'Georgia',
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#7A9B57',
    backgroundColor: '#D9D9D9',
  },

  avatarVazio: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarTexto: {
    fontSize: 18,
    color: '#666',
  },

  botaoFoto: {
    backgroundColor: '#7A9B57',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
  },

  textoBotaoFoto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  label: {
    color: '#5E5E5E',
    marginBottom: 6,
    marginLeft: 5,
    fontSize: 14,
  },

  input: {
    backgroundColor: '#E8E3D3',
    borderWidth: 1.5,
    borderColor: '#808080',
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,
    fontSize: 15,
    color: '#333',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,

    elevation: 2,
  },

  botaoSalvar: {
    backgroundColor: '#0D4D4D',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoCancelar: {
    backgroundColor: '#A94442',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },

  textoBotaoCancelar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoEditar: {
    backgroundColor: '#7A9B57',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotaoEditar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECE8D5',
  },

});