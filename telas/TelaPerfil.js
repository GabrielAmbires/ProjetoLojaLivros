import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const avatares = [
  require('./imagenslivros/BOOK FEST (2).png'),
  require('./imagenslivros/1.png'),
  require('./imagenslivros/3.png'),
  require('./imagenslivros/8.png'),
];

const preferencias = ['Romance', 'Fantasia', 'Novidades', 'Favoritos da semana'];

export default function TelaPerfil({ navigation }) {
  const [avatarAtual, setAvatarAtual] = useState(0);

  const trocarFoto = () => {
    setAvatarAtual((atual) => (atual + 1) % avatares.length);
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity style={estilos.headerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={estilos.headerContent}>
          <Text style={estilos.title}>Perfil do leitor</Text>
          <Text style={estilos.subtitle}>Sua estante na Folha Viva</Text>
        </View>

        <View style={estilos.headerButtonPlaceholder} />
        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      <ScrollView contentContainerStyle={estilos.content} showsVerticalScrollIndicator={false}>
        <View style={estilos.profileCard}>
          <View style={estilos.avatarBox}>
            <Image source={avatares[avatarAtual]} style={estilos.avatar} />
            <TouchableOpacity style={estilos.cameraButton} onPress={trocarFoto}>
              <Ionicons name="camera-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={estilos.profileInfo}>
            <Text style={estilos.profileName}>Leitor Folha Viva</Text>
            <Text style={estilos.profileEmail}>cliente@folhaviva.com</Text>

            <TouchableOpacity style={estilos.changePhotoButton} onPress={trocarFoto}>
              <Ionicons name="image-outline" size={16} color="#1F3A24" />
              <Text style={estilos.changePhotoText}>Trocar foto de perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={estilos.statsRow}>
          <View style={estilos.statCard}>
            <Ionicons name="book-outline" size={22} color="#41623A" />
            <Text style={estilos.statValue}>12</Text>
            <Text style={estilos.statLabel}>compras</Text>
          </View>

          <View style={estilos.statCard}>
            <Ionicons name="heart-outline" size={22} color="#B45D5D" />
            <Text style={estilos.statValue}>8</Text>
            <Text style={estilos.statLabel}>favoritos</Text>
          </View>

          <View style={estilos.statCard}>
            <Ionicons name="star-outline" size={22} color="#9CA96A" />
            <Text style={estilos.statValue}>4,8</Text>
            <Text style={estilos.statLabel}>media</Text>
          </View>
        </View>

        <View style={estilos.sectionHeader}>
          <Text style={estilos.sectionTitle}>Preferencias de leitura</Text>
        </View>

        <View style={estilos.preferencesCard}>
          <View style={estilos.tagsRow}>
            {preferencias.map((item) => (
              <View key={item} style={estilos.tag}>
                <Text style={estilos.tagText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={estilos.preferenceLine}>
            <Ionicons name="notifications-outline" size={20} color="#41623A" />
            <Text style={estilos.preferenceText}>Avisar quando chegar livro novo</Text>
          </View>

          <View style={estilos.preferenceLine}>
            <Ionicons name="gift-outline" size={20} color="#41623A" />
            <Text style={estilos.preferenceText}>Receber cupons de romance e fantasia</Text>
          </View>
        </View>

        <View style={estilos.sectionHeader}>
          <Text style={estilos.sectionTitle}>Minha conta</Text>
        </View>

        <View style={estilos.accountCard}>
          <View style={estilos.accountLine}>
            <Ionicons name="location-outline" size={20} color="#41623A" />
            <View style={estilos.accountTextBox}>
              <Text style={estilos.accountLabel}>Endereco de entrega</Text>
              <Text style={estilos.accountText}>Rua das Letras, 120 - Centro</Text>
            </View>
          </View>

          <View style={estilos.accountLine}>
            <Ionicons name="card-outline" size={20} color="#41623A" />
            <View style={estilos.accountTextBox}>
              <Text style={estilos.accountLabel}>Pagamento favorito</Text>
              <Text style={estilos.accountText}>Pix e cartao de credito</Text>
            </View>
          </View>

          <View style={estilos.accountLine}>
            <Ionicons name="bookmark-outline" size={20} color="#41623A" />
            <View style={estilos.accountTextBox}>
              <Text style={estilos.accountLabel}>Lista atual</Text>
              <Text style={estilos.accountText}>4 livros salvos para comprar depois</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={estilos.tabBar}>
        <TouchableOpacity style={estilos.tabButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.tabButton} onPress={() => navigation.navigate('Produtos')}>
          <Ionicons name="grid-outline" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.tabButton} onPress={() => navigation.navigate('Favs')}>
          <Ionicons name="heart-outline" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.tabButton, estilos.tabButtonActive]}>
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
  headerButtonPlaceholder: {
    width: 40,
    height: 40,
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
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 94,
  },
  profileCard: {
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
  avatarBox: {
    width: 92,
    height: 92,
    marginRight: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 24,
    backgroundColor: '#E8E0C7',
    resizeMode: 'cover',
  },
  cameraButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#41623A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#1F3A24',
    fontSize: 19,
    fontWeight: '900',
  },
  profileEmail: {
    color: '#5C6C44',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  changePhotoButton: {
    height: 38,
    backgroundColor: '#E8E0C7',
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  changePhotoText: {
    color: '#1F3A24',
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  statCard: {
    width: '31%',
    backgroundColor: '#FFF8E5',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statValue: {
    color: '#1F3A24',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  statLabel: {
    color: '#5C6C44',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
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
  preferencesCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#E8E0C7',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#1F3A24',
    fontSize: 12,
    fontWeight: '900',
  },
  preferenceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  preferenceText: {
    color: '#42503E',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 10,
    flex: 1,
  },
  accountCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  accountLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  accountTextBox: {
    flex: 1,
    marginLeft: 10,
  },
  accountLabel: {
    color: '#1F3A24',
    fontSize: 13,
    fontWeight: '900',
  },
  accountText: {
    color: '#5C6C44',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
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
