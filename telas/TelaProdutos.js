import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../contexto/CarrinhoContext';

const produtos = [
  {
    id: '1',
    titulo: 'Melhor do que nos Filmes — Lynn Painter',
    preco: '40,00',
    imagem: require('./imagenslivros/1.png'),
  },
  {
    id: '2',
    titulo: 'Verity — Colleen Hoover',
    preco: '30,00',
    imagem: require('./imagenslivros/2.png'),
  },
  {
    id: '3',
    titulo: 'Por Lugares Incríveis — Jennifer Niven',
    preco: '28,00',
    imagem: require('./imagenslivros/3.png'),
  },
  {
    id: '4',
    titulo: 'A Guerra da Papoula — R. F. Kuang',
    preco: '35,00',
    imagem: require('./imagenslivros/4.png'),
  },
  {
    id: '5',
    titulo: 'Powerless - Lauren Roberts',
    preco: '40,00',
    imagem: require('./imagenslivros/5.png'),
  },
  {
    id: '6',
    titulo: 'Eu Beijei Shara Wheeler — Casey McQuiston',
    preco: '30,00',
    imagem: require('./imagenslivros/6.png'),
  },
  {
    id: '7',
    titulo: 'Tempestade de Ônix — Rebecca Yarros',
    preco: '32,00',
    imagem: require('./imagenslivros/7.png'),
  },
  {
    id: '8',
    titulo: 'As Vantagens de Ser Invisível — Stephen Chbosky',
    preco: '45,00',
    imagem: require('./imagenslivros/8.png'),
  },
  {
    id: '9',
    titulo: 'A Vida Invisível de Addie LaRue — V. E. Schwab',
    preco: '30,00',
    imagem: require('./imagenslivros/9.png'),
  },
  {
    id: '10',
    titulo: 'Powerless - Lauren Roberts',
    preco: '40,00',
    imagem: require('./imagenslivros/5.png'),
  },
];

export default function TelaProdutos({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('produtos');
  const [busca, setBusca] = useState('');
  const { adicionarAoCarrinho } = useCarrinho();

  const produtosFiltrados = produtos.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const navegarPelaBarra = (aba, tela) => {
    setAbaAtiva(aba);

    if (tela) {
      navigation.navigate(tela);
    }
  };

  const renderProduto = ({ item }) => (
    <TouchableOpacity style={estilos.card} onPress={() => navigation.navigate('produto', { id: item.id })}>
      <View style={estilos.imageContainer}>
        <Image source={item.imagem} style={estilos.cardImage} />
      </View>

      <Text style={estilos.cardTitulo} numberOfLines={2}>
        {item.titulo}
      </Text>

      <View style={estilos.cardFooter}>
        <Text style={estilos.cardPreco}>R$ {item.preco}</Text>

        <TouchableOpacity 
          style={estilos.iconButton}
          onPress={() => {
            adicionarAoCarrinho(item, 1);
            navigation.navigate('Carrinho');
          }}
        >
          <Ionicons name="cart-outline" size={18} color="#31533A" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity style={estilos.headerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={estilos.headerContent}>
          <Text style={estilos.title}>Produtos</Text>
          <Text style={estilos.subtitle}>{produtos.length} livros disponiveis</Text>
        </View>

        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      <View style={estilos.summaryCard}>
        <View style={estilos.summaryIcon}>
          <Ionicons name="grid-outline" size={20} color="#FFF" />
        </View>

        <View style={estilos.summaryTextBox}>
          <Text style={estilos.summaryTitle}>Catalogo completo</Text>
          <Text style={estilos.summaryText}>{produtosFiltrados.length} de {produtos.length} livros</Text>
        </View>
      </View>

      <FlatList
        data={produtosFiltrados}
        renderItem={renderProduto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.listContent}
        numColumns={2}
        columnWrapperStyle={estilos.columnWrapper}
        showsVerticalScrollIndicator={false}
      />

      <View style={estilos.tabBar}>
        <TouchableOpacity
          style={[estilos.tabButton, abaAtiva === 'home' && estilos.tabButtonActive]}
          onPress={() => navegarPelaBarra('home', 'Home')}
        >
          <Ionicons name="home-outline" size={24} color="#FFF" />
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
        <TouchableOpacity
          style={[estilos.tabButton, abaAtiva === 'perfil' && estilos.tabButtonActive]}
          onPress={() => navegarPelaBarra('perfil', 'Perfil')}
        >
          <Ionicons name="person-outline" size={24} color="#FFF" />
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
    height: 112,
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#41623A',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  subtitle: {
    marginTop: 3,
    color: '#F7F4D5',
    fontSize: 12,
    fontWeight: '700',
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
  summaryCard: {
    marginHorizontal: 18,
    marginTop: 18,
    backgroundColor: '#FFF8E5',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#41623A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryTextBox: {
    flex: 1,
  },
  summaryTitle: {
    color: '#1F3A24',
    fontSize: 15,
    fontWeight: '900',
  },
  summaryText: {
    color: '#5C6C44',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 94,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF8E5',
    borderRadius: 22,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  imageContainer: {
    backgroundColor: '#E8E0C7',
    borderRadius: 18,
    height: 176,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '86%',
    height: 158,
    borderRadius: 14,
    resizeMode: 'contain',
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1F3A24',
    minHeight: 38,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardPreco: {
    fontSize: 16,
    fontWeight: '900',
    color: '#16382B',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    marginHorizontal: 18,
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: '#FFF8E5',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F3A24',
    fontWeight: '600',
    paddingVertical: 0,
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
