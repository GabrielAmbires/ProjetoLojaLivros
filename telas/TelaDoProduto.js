import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TelaDoProduto({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1F3A24" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./imagenslivros/3.png')}
              style={styles.bookImage}
            />
          </View>

          <Text style={styles.title}>Melhor do que nos filmes</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>DE R$ 56,00</Text>
            <Text style={styles.newPrice}>POR R$ 28,00</Text>
          </View>

          <Text style={styles.description}>
            Sucesso no TikTok, livro de Lynn Painter vai conquistar os fãs de comédias românticas com uma protagonista determinada a encontrar seu “felizes para sempre”.
          </Text>

          <Text style={styles.summary}>
            Elizabeth Buxbaum sempre soube que o seu vizinho não seria um ...
          </Text>

          <TouchableOpacity style={styles.readMoreButton}>
            <Ionicons name="chevron-down" size={18} color="#31533A" />
            <Text style={styles.readMoreText}>Leia mais</Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
              <Ionicons name="cart-outline" size={18} color="#FFF" style={styles.buttonIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Carrinho</Text>
              <MaterialCommunityIcons name="cart" size={18} color="#FFF" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="cart-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialCommunityIcons name="shield-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
          <Ionicons name="heart" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4D5',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  bookImage: {
    width: 320,
    height: 440,
    borderRadius: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1F3A24',
    textAlign: 'center',
    marginBottom: 14,
  },
  priceContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  oldPrice: {
    fontSize: 14,
    color: '#5A6B55',
    textDecorationLine: 'line-through',
    marginBottom: 6,
  },
  newPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#16382B',
  },
  description: {
    width: '100%',
    fontSize: 14,
    color: '#42503E',
    lineHeight: 22,
    marginBottom: 12,
  },
  summary: {
    width: '100%',
    fontSize: 14,
    color: '#42503E',
    lineHeight: 22,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#31533A',
    marginLeft: 8,
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#1F3A24',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#9CA96A',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 4,
  },
  navBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    height: 68,
    backgroundColor: '#415B40',
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: '#31533A',
  },
});
