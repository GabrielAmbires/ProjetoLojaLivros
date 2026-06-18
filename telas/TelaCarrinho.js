import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../contexto/CarrinhoContext';

const precoNumero = (preco) => Number(String(preco).replace('R$', '').replace(',', '.').trim()) || 0;
const formatarPreco = (valor) => valor.toFixed(2).replace('.', ',');

export default function TelaCarrinho({ navigation }) {
  const { itens, totalItens, alterarQuantidade, removerDoCarrinho } = useCarrinho();

  const subtotal = itens.reduce(
    (total, item) => total + precoNumero(item.preco) * item.quantidade,
    0
  );

  const comprar = () => {
    if (itens.length === 0) {
      return;
    }

    navigation.navigate('Checkout', {
      itensCarrinho: itens,
      tipo: 'carrinho',
    });
  };

  const renderItem = ({ item }) => (
    <View style={estilos.itemCard}>
      <Image source={item.imagem} style={estilos.itemImagem} />

      <View style={estilos.itemInfo}>
        <Text style={estilos.itemTitulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={estilos.itemPreco}>R$ {String(item.preco).replace('R$ ', '')}</Text>

        <View style={estilos.itemActions}>
          <View style={estilos.quantidadeBox}>
            <TouchableOpacity onPress={() => alterarQuantidade(item.id, item.quantidade - 1)}>
              <Ionicons name="remove-circle-outline" size={24} color="#31533A" />
            </TouchableOpacity>
            <Text style={estilos.quantidadeTexto}>{item.quantidade}</Text>
            <TouchableOpacity onPress={() => alterarQuantidade(item.id, item.quantidade + 1)}>
              <Ionicons name="add-circle-outline" size={24} color="#31533A" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={estilos.removerButton} onPress={() => removerDoCarrinho(item.id)}>
            <Ionicons name="trash-outline" size={18} color="#B45D5D" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity style={estilos.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={estilos.headerContent}>
          <Text style={estilos.title}>Carrinho</Text>
          <Text style={estilos.subtitle}>{totalItens} itens selecionados</Text>
        </View>

        <View style={estilos.headerButtonPlaceholder} />
        <View style={estilos.decorationTop} />
        <View style={estilos.decorationBottom} />
      </View>

      {itens.length === 0 ? (
        <View style={estilos.emptyState}>
          <View style={estilos.emptyIcon}>
            <Ionicons name="cart-outline" size={42} color="#31533A" />
          </View>
          <Text style={estilos.emptyTitle}>Seu carrinho esta vazio</Text>
          <Text style={estilos.emptyText}>Adicione um livro para continuar a compra.</Text>
          <TouchableOpacity style={estilos.emptyButton} onPress={() => navigation.navigate('Produtos')}>
            <Text style={estilos.emptyButtonText}>Ver produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={itens}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={estilos.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={estilos.footer}>
            <View>
              <Text style={estilos.totalLabel}>Subtotal</Text>
              <Text style={estilos.totalValor}>R$ {formatarPreco(subtotal)}</Text>
            </View>

            <TouchableOpacity style={estilos.buyButton} onPress={comprar}>
              <Text style={estilos.buyButtonText}>Comprar</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" style={estilos.buyButtonIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
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
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 118,
  },
  itemCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  itemImagem: {
    width: 86,
    height: 118,
    borderRadius: 14,
    backgroundColor: '#E8E0C7',
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitulo: {
    color: '#1F3A24',
    fontSize: 16,
    fontWeight: '900',
  },
  itemPreco: {
    color: '#16382B',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 5,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quantidadeBox: {
    minWidth: 104,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#E8E0C7',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantidadeTexto: {
    color: '#31533A',
    fontSize: 16,
    fontWeight: '900',
    marginHorizontal: 10,
  },
  removerButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F4DDCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    minHeight: 74,
    borderRadius: 22,
    backgroundColor: '#FFF8E5',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  totalLabel: {
    color: '#5C6C44',
    fontSize: 12,
    fontWeight: '800',
  },
  totalValor: {
    color: '#16382B',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  buyButton: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1F3A24',
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  buyButtonIcon: {
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: '#FFF8E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    color: '#1F3A24',
    fontSize: 20,
    fontWeight: '900',
  },
  emptyText: {
    color: '#5C6C44',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  emptyButton: {
    height: 46,
    borderRadius: 16,
    backgroundColor: '#1F3A24',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  emptyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
