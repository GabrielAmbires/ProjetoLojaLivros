import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCarrinho } from '../contexto/CarrinhoContext';

export default function TelaFavs({ navigation }) {
  const { adicionarAoCarrinho, favoritos, removerDosFavoritos, totalFavoritos } = useCarrinho();
  const [abaAtiva, setAbaAtiva] = useState('favoritos');

  const navegarPelaBarra = (aba, tela) => {
    setAbaAtiva(aba);

    if (tela) {
      navigation.navigate(tela);
    }
  };

  const renderItem = ({ item }) => (
    <View style={estilos.card}>
      <View style={estilos.imageContainer}>
        <TouchableOpacity style={estilos.imageTouch} onPress={() => navigation.navigate('produto', { id: item.id })}>
          <Image source={item.imagem} style={estilos.cardImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.favoriteButton}
          onPress={() => removerDosFavoritos(item.id)}
        >
          <Ionicons name="heart" size={20} color="#B45D5D" />
        </TouchableOpacity>
      </View>

      <View style={estilos.cardBody}>
        <Text style={estilos.CardTitulo}>{item.titulo}</Text>
        <Text style={estilos.cardPreco}>R$ {item.preco}</Text>

        <View style={estilos.cardActions}>
          <View style={estilos.ratingBox}>
            <Ionicons name="star" size={13} color="#9CA96A" />
            <Text style={estilos.ratingText}>4,8</Text>
          </View>

          <TouchableOpacity
            style={estilos.iconButton}
            onPress={() => {
              adicionarAoCarrinho(item, 1);
              navigation.navigate('Carrinho');
            }}
          >
            <MaterialCommunityIcons name="cart-plus" size={20} color="#31533A" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={estilos.buyButton} onPress={() => navigation.navigate('produto', { id: item.id })}>
        <Text style={estilos.buyText}>Comprar</Text>
        <Ionicons name="arrow-forward" size={15} color="#FFF" style={estilos.buyIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={estilos.emptyContainer}>
      <View style={estilos.emptyIcon}>
        <Ionicons name="heart-outline" size={42} color="#5B7A4C" />
      </View>
      <Text style={estilos.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={estilos.emptyText}>
        Toque no coracao da tela do produto para salvar um livro aqui.
      </Text>
      <TouchableOpacity style={estilos.emptyButton} onPress={() => navigation.navigate('Produtos')}>
        <Text style={estilos.emptyButtonText}>Ver produtos</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFF" style={estilos.buyIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity style={estilos.headerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={estilos.headerContent}>
          <Text style={estilos.title}>Favoritos</Text>
          <Text style={estilos.subtitle}>{totalFavoritos} livros salvos</Text>
        </View>

        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      <FlatList
        data={favoritos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          estilos.listContent,
          favoritos.length === 0 && estilos.emptyListContent,
        ]}
        numColumns={2}
        columnWrapperStyle={favoritos.length > 0 ? estilos.columnWrapper : null}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
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
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 94,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
  imageTouch: {
    width: '100%',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FFF8E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginBottom: 10,
  },
  CardTitulo: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1F3A24',
  },
  cardPreco: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '900',
    color: '#16382B',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  ratingText: {
    color: '#31533A',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    backgroundColor: '#1F3A24',
    borderRadius: 16,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  buyIcon: {
    marginLeft: 6,
  },
  emptyContainer: {
    marginHorizontal: 18,
    marginBottom: 70,
    alignItems: 'center',
    backgroundColor: '#FFF8E5',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#1F3A24',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyText: {
    color: '#5C6C44',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyButton: {
    marginTop: 18,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#1F3A24',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
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
