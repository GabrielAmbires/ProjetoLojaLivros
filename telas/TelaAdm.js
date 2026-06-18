import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const acoes = [
  {
    icone: 'shield-checkmark-outline',
    titulo: 'Acesso protegido',
    texto: 'Esta tela so aparece quando o usuario autenticado tem role admin no Firestore.',
  },
  {
    icone: 'library-outline',
    titulo: 'Produtos',
    texto: 'Area reservada para cadastrar, revisar e organizar os livros da loja.',
  },
  {
    icone: 'people-outline',
    titulo: 'Usuarios',
    texto: 'Base para consultar perfis e separar permissoes de cliente e desenvolvedor.',
  },
];

export default function TelaAdm({ navigation }) {
  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity style={estilos.headerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={estilos.headerContent}>
          <Text style={estilos.title}>Desenvolvedor</Text>
          <Text style={estilos.subtitle}>Gerenciar Produtos</Text>
        </View>

        <View style={estilos.headerButtonPlaceholder} />
        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      <ScrollView contentContainerStyle={estilos.content} showsVerticalScrollIndicator={false}>
        <View style={estilos.heroCard}>
          <View style={estilos.heroIcon}>
            <Ionicons name="code-slash-outline" size={34} color="#FFF" />
          </View>
          <Text style={estilos.heroTitle}>Painel administrativo</Text>
          <Text style={estilos.heroText}>
            O App.js libera esta tela apenas para contas autenticadas com permissao de administrador.
          </Text>
        </View>

        {acoes.map((item) => (
          <View key={item.titulo} style={estilos.actionCard}>
            <View style={estilos.actionIcon}>
              <Ionicons name={item.icone} size={22} color="#31533A" />
            </View>
            <View style={estilos.actionTextBox}>
              <Text style={estilos.actionTitle}>{item.titulo}</Text>
              <Text style={estilos.actionText}>{item.texto}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
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
    padding: 18,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#1F3A24',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#1F3A24',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroText: {
    color: '#5C6C44',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  actionCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E8E0C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTextBox: {
    flex: 1,
  },
  actionTitle: {
    color: '#1F3A24',
    fontSize: 15,
    fontWeight: '900',
  },
  actionText: {
    color: '#5C6C44',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
});
