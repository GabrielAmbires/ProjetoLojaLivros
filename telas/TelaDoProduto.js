import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const produtosDatabase = {
  '1': { titulo: 'Powerless', autor: 'Matthew Cody', preco: '40,00', precoCheio: '80,00', desconto: '50%', imagem: require('./imagenslivros/1.png'), sinopse: 'Um jovem descobre poderes incríveis em um mundo onde super-heróis são comuns. Uma história envolvente de descoberta, amizade e poder.' },
  '2': { titulo: 'Eu beijei...', autor: 'Anne Eliot', preco: '30,00', precoCheio: '60,00', desconto: '50%', imagem: require('./imagenslivros/2.png'), sinopse: 'Uma história comovente sobre amor, descoberta pessoal e conexão humana que vai tocar seu coração de maneira inesperada.' },
  '3': { titulo: 'Melhor do que nos filmes', autor: 'Lynn Painter', preco: '28,00', precoCheio: '56,00', desconto: '50%', imagem: require('./imagenslivros/3.png'), sinopse: 'Sucesso viral no TikTok! Lynn Painter traz uma comédia romântica irresistível com uma protagonista determinada a encontrar seu "felizes para sempre".' },
  '4': { titulo: 'Romance especial', autor: 'Sarah J. Maas', preco: '35,00', precoCheio: '70,00', desconto: '50%', imagem: require('./imagenslivros/4.png'), sinopse: 'Um romance épico repleto de magia, mistério e amor. Uma narrativa envolvente que prende desde a primeira página.' },
  '5': { titulo: 'Powerless', autor: 'Matthew Cody', preco: '40,00', precoCheio: '80,00', desconto: '50%', imagem: require('./imagenslivros/5.png'), sinopse: 'Um jovem descobre poderes incríveis em um mundo onde super-heróis são comuns. Uma história envolvente de descoberta, amizade e poder.' },
  '6': { titulo: 'Eu beijei...', autor: 'Anne Eliot', preco: '30,00', precoCheio: '60,00', desconto: '50%', imagem: require('./imagenslivros/6.png'), sinopse: 'Uma história comovente sobre amor, descoberta pessoal e conexão humana que vai tocar seu coração de maneira inesperada.' },
  '7': { titulo: 'Novo romance', autor: 'Colleen Hoover', preco: '32,00', precoCheio: '64,00', desconto: '50%', imagem: require('./imagenslivros/7.png'), sinopse: 'Um romance contemporâneo que explora sentimentos profundos com a escrita sensível e tocante de um dos autores mais amados do momento.' },
  '8': { titulo: 'Livro destaque', autor: 'John Green', preco: '45,00', precoCheio: '90,00', desconto: '50%', imagem: require('./imagenslivros/8.png'), sinopse: 'Uma obra que combina humor, emoção e profundidade em uma narrativa que marca para sempre o coração do leitor.' },
  '9': { titulo: 'Favorito da semana', autor: 'Emily Henry', preco: '30,00', precoCheio: '60,00', desconto: '50%', imagem: require('./imagenslivros/9.png'), sinopse: 'Romance contemporâneo envolvente que equilibra com perfeição o humor leve e os sentimentos mais profundos e genuínos.' },
  '10': { titulo: 'Powerless', autor: 'Matthew Cody', preco: '40,00', precoCheio: '80,00', desconto: '50%', imagem: require('./imagenslivros/5.png'), sinopse: 'Um jovem descobre poderes incríveis em um mundo onde super-heróis são comuns. Uma história envolvente de descoberta, amizade e poder.' },
};

export default function TelaDoProduto({ navigation, route }) {
  const [abaAtiva, setAbaAtiva] = useState('carrinho');
  const [quantidade, setQuantidade] = useState(1);
  
  const produtoId = route?.params?.id || '3';
  const produto = produtosDatabase[produtoId] || produtosDatabase['3'];

  const navegarPelaBarra = (aba, tela) => {
    setAbaAtiva(aba);

    if (tela) {
      navigation.navigate(tela);
    }
  };

  const handleComprarAgora = () => {
    navigation.navigate('Checkout', { 
      produto, 
      quantidade, 
      tipo: 'compra'
    });
  };

  const handleAdicionarCarrinho = () => {
    // Aqui você poderia adicionar ao carrinho e mostrar uma notificação
    navigation.navigate('Checkout', { 
      produto, 
      quantidade, 
      tipo: 'carrinho'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalhes</Text>

        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Favs')}>
          <Ionicons name="heart-outline" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.decorationTop} />
        <View style={styles.decorationBottom} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.imageFrame}>
            <Image
              source={produto.imagem}
              style={styles.bookImage}
            />
          </View>

          <View style={styles.heroInfo}>
            <View style={styles.badge}>
              <Ionicons name="sparkles-outline" size={14} color="#31533A" />
              <Text style={styles.badgeText}>Mais vendido</Text>
            </View>

            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#9CA96A" />
              <Text style={styles.ratingText}>4,8</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.title}>{produto.titulo}</Text>
          <Text style={styles.author}>{produto.autor}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="book-outline" size={18} color="#31533A" />
              <Text style={styles.infoLabel}>Romance</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="language-outline" size={18} color="#31533A" />
              <Text style={styles.infoLabel}>Português</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="cube-outline" size={18} color="#31533A" />
              <Text style={styles.infoLabel}>Físico</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.oldPrice}>De R$ {produto.precoCheio}</Text>
              <Text style={styles.newPrice}>R$ {produto.preco}</Text>
            </View>

            <View style={styles.discountPill}>
              <Text style={styles.discountText}>{produto.desconto} OFF</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.description}>
            {produto.sinopse}
          </Text>

          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantidade</Text>
            <View style={styles.quantityBox}>
              <TouchableOpacity onPress={() => setQuantidade(Math.max(1, quantidade - 1))}>
                <Ionicons name="remove-circle-outline" size={24} color="#31533A" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantidade}</Text>
              <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
                <Ionicons name="add-circle-outline" size={24} color="#31533A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAdicionarCarrinho}>
          <MaterialCommunityIcons name="cart-plus" size={22} color="#31533A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={handleComprarAgora}>
          <Text style={styles.buyButtonText}>Comprar agora</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, abaAtiva === 'home' && styles.navButtonActive]}
          onPress={() => navegarPelaBarra('home', 'Home')}
        >
          <Ionicons name="home-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, abaAtiva === 'carrinho' && styles.navButtonActive]}
          onPress={() => navegarPelaBarra('carrinho', 'produto')}
        >
          <Ionicons name="cart-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, abaAtiva === 'produtos' && styles.navButtonActive]}
          onPress={() => navegarPelaBarra('produtos', 'Produtos')}
        >
          <Ionicons name="grid-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, abaAtiva === 'favoritos' && styles.navButtonActive]}
          onPress={() => navegarPelaBarra('favoritos', 'Favs')}
        >
          <Ionicons name="heart-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 9,
    zIndex: 2,
  },
  decorationTop: {
    position: 'absolute',
    right: -34,
    top: -38,
    width: 118,
    height: 118,
    borderRadius: 60,
    backgroundColor: '#E3DAB4',
    opacity: 0.22,
  },
  decorationBottom: {
    position: 'absolute',
    left: -46,
    bottom: -58,
    width: 130,
    height: 130,
    borderRadius: 70,
    backgroundColor: '#8EA57A',
    opacity: 0.28,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 176,
  },
  hero: {
    backgroundColor: '#FFF8E5',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  imageFrame: {
    width: '100%',
    height: 360,
    borderRadius: 20,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bookImage: {
    width: 250,
    height: 340,
    borderRadius: 18,
    resizeMode: 'contain',
  },
  heroInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E0C7',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#31533A',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ratingText: {
    color: '#31533A',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 5,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#1F3A24',
    lineHeight: 30,
  },
  author: {
    color: '#5C6C44',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 18,
  },
  infoItem: {
    width: '31%',
    borderRadius: 16,
    backgroundColor: '#F7F4D5',
    paddingVertical: 12,
    alignItems: 'center',
  },
  infoLabel: {
    color: '#42503E',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  priceContainer: {
    backgroundColor: '#F4EDD7',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  oldPrice: {
    fontSize: 14,
    color: '#5A6B55',
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 26,
    fontWeight: '900',
    color: '#16382B',
    marginTop: 4,
  },
  discountPill: {
    backgroundColor: '#9CA96A',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  sectionTitle: {
    color: '#1F3A24',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#42503E',
    lineHeight: 22,
    marginBottom: 12,
  },
  summary: {
    fontSize: 14,
    color: '#42503E',
    lineHeight: 22,
    marginBottom: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F7F4D5',
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#31533A',
    marginRight: 6,
  },
  quantityContainer: {
    marginTop: 18,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F4D5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#31533A',
  },
  actionBar: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 92,
    height: 64,
    backgroundColor: '#FFF8E5',
    borderRadius: 22,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  cartButton: {
    width: 48,
    height: 48,
    backgroundColor: '#E8E0C7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#1F3A24',
    borderRadius: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  navBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 16,
    height: 56,
    backgroundColor: '#5B7A4C',
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: '#41623A',
  },
});
