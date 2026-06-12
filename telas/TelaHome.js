import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { autenticacao, bd } from '../config/firebaseConfig';

const livrosDestaque = [
  {
    id: '1',
    titulo: 'Powerless',
    preco: 'R$ 40,00',
    imagem: require('./imagenslivros/1.png'),
  },
  {
    id: '2',
    titulo: 'Melhor do que nos filmes',
    preco: 'R$ 28,00',
    imagem: require('./imagenslivros/3.png'),
  },
  {
    id: '3',
    titulo: 'Eu beijei...',
    preco: 'R$ 30,00',
    imagem: require('./imagenslivros/2.png'),
  },
];

export default function TelaHome({ navigation }) {
  const [nome, setNome] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('home');

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

  const navegarPelaBarra = (aba, tela) => {
    setAbaAtiva(aba);

    if (tela) {
      navigation.navigate(tela);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <View>
          <Text style={estilos.saudacao}>Ola, {nome || 'leitor'}!</Text>
          <Text style={estilos.titulo}>Folha Viva</Text>
        </View>

        <TouchableOpacity style={estilos.headerButton} onPress={fazerLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      <ScrollView contentContainerStyle={estilos.content} showsVerticalScrollIndicator={false}>
        <View style={estilos.heroCard}>
          <View style={estilos.heroTextBox}>
            <Text style={estilos.heroTitle}>Encontre sua proxima leitura</Text>
            <Text style={estilos.heroText}>
              Romances, favoritos e ofertas em um so lugar.
            </Text>

            <TouchableOpacity style={estilos.heroButton} onPress={() => navigation.navigate('Favs')}>
              <Text style={estilos.heroButtonText}>Ver favoritos</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" style={estilos.buttonIcon} />
            </TouchableOpacity>
          </View>

          <Image
            source={require('./imagenslogin/BOOK FEST (2).png')}
            style={estilos.logo}
          />
        </View>

        <View style={estilos.sectionHeader}>
          <Text style={estilos.sectionTitle}>Categorias</Text>
          <Text style={estilos.sectionAction}>Explorar</Text>
        </View>

        <View style={estilos.categoryRow}>
          <TouchableOpacity style={estilos.categoryCard}>
            <Ionicons name="heart-outline" size={22} color="#31533A" />
            <Text style={estilos.categoryText}>Romance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.categoryCard}>
            <Ionicons name="sparkles-outline" size={22} color="#31533A" />
            <Text style={estilos.categoryText}>TikTok</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.categoryCard}>
            <Ionicons name="pricetag-outline" size={22} color="#31533A" />
            <Text style={estilos.categoryText}>Ofertas</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.sectionHeader}>
          <Text style={estilos.sectionTitle}>Destaques</Text>
          <Text style={estilos.sectionAction}>Hoje</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {livrosDestaque.map((livro) => (
            <TouchableOpacity
              key={livro.id}
              style={estilos.bookCard}
              onPress={() => navigation.navigate('produto')}
            >
              <View style={estilos.bookImageBox}>
                <Image source={livro.imagem} style={estilos.bookImage} />
              </View>

              <Text style={estilos.bookTitle} numberOfLines={2}>
                {livro.titulo}
              </Text>
              <Text style={estilos.bookPrice}>{livro.preco}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={estilos.tabBar}>
        <TouchableOpacity
          style={[estilos.tabButton, abaAtiva === 'home' && estilos.tabButtonActive]}
          onPress={() => navegarPelaBarra('home', 'Home')}
        >
          <Ionicons name="home-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[estilos.tabButton, abaAtiva === 'carrinho' && estilos.tabButtonActive]}
          onPress={() => navegarPelaBarra('carrinho', 'produto')}
        >
          <Ionicons name="cart-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[estilos.tabButton, abaAtiva === 'produtos' && estilos.tabButtonActive]}
          onPress={() => navegarPelaBarra('produtos', 'Produtos')}
        >
          <Ionicons name="grid-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[estilos.tabButton, abaAtiva === 'favoritos' && estilos.tabButtonActive]}
          onPress={() => navegarPelaBarra('favoritos', 'Favs')}
        >
          <Ionicons name="heart-outline" size={24} color="#FFF" />
        </TouchableOpacity>
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
  headerButton: {
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
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 92,
  },
  heroCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 24,
    padding: 18,
    minHeight: 178,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  heroTextBox: {
    flex: 1,
  },
  heroTitle: {
    color: '#1F3A24',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 27,
  },
  heroText: {
    color: '#5C6C44',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  heroButton: {
    height: 42,
    backgroundColor: '#1F3A24',
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  heroButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
  buttonIcon: {
    marginLeft: 6,
  },
  logo: {
    width: 116,
    height: 116,
    resizeMode: 'cover',
    borderRadius: 18,
    marginLeft: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#1F3A24',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionAction: {
    color: '#5C6C44',
    fontSize: 12,
    fontWeight: '800',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '31%',
    backgroundColor: '#FFF8E5',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  categoryText: {
    color: '#42503E',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 8,
  },
  bookCard: {
    width: 142,
    backgroundColor: '#FFF8E5',
    borderRadius: 22,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  bookImageBox: {
    height: 164,
    backgroundColor: '#E8E0C7',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bookImage: {
    width: '86%',
    height: 148,
    resizeMode: 'contain',
    borderRadius: 14,
  },
  bookTitle: {
    color: '#1F3A24',
    fontSize: 14,
    fontWeight: '900',
    minHeight: 36,
  },
  bookPrice: {
    color: '#16382B',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 6,
  },
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 16,
    height: 56,
    backgroundColor: '#5B7A4C',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  tabButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#41623A',
  },
});
