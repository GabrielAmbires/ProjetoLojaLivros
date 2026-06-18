import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useCarrinho } from '../contexto/CarrinhoContext';

const precoNumero = (preco) => Number(String(preco).replace('R$', '').replace(',', '.').trim()) || 0;
const formatarPreco = (valor) => valor.toFixed(2).replace('.', ',');

const formasPagamento = [
  {
    id: 'pix',
    nome: 'PIX',
    icone: 'qrcode',
    tipo: 'ionicons',
    descricao: 'Transferência instantânea',
    cor: '#8B5CF6',
  },
  {
    id: 'credito',
    nome: 'Cartão de Crédito',
    icone: 'credit-card',
    tipo: 'ionicons',
    descricao: 'Crediário em até 12x',
    cor: '#EC4899',
  },
  {
    id: 'debito',
    nome: 'Cartão de Débito',
    icone: 'card',
    tipo: 'ionicons',
    descricao: 'Debitado na hora',
    cor: '#06B6D4',
  },
  {
    id: 'boleto',
    nome: 'Boleto Bancário',
    icone: 'file-document',
    tipo: 'material-community',
    descricao: 'Vencimento em 3 dias',
    cor: '#F59E0B',
  },
  {
    id: 'dinheiro',
    nome: 'Dinheiro',
    icone: 'cash',
    tipo: 'ionicons',
    descricao: 'Pagamento na entrega',
    cor: '#10B981',
  },
  {
    id: 'transferencia',
    nome: 'Transferência Bancária',
    icone: 'swap-horizontal',
    tipo: 'ionicons',
    descricao: 'TED/DOC',
    cor: '#3B82F6',
  },
];

export default function TelaCheckout({ navigation, route }) {
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [etapa, setEtapa] = useState(1);
  const [freteSelecionado, setFreteSelecionado] = useState('normal');
  const { limparCarrinho } = useCarrinho();

  const itensCarrinho = route?.params?.itensCarrinho;
  const produtoParam = route?.params?.produto;
  const quantidade = route?.params?.quantidade || 1;
  const tipo = route?.params?.tipo || 'compra';
  const itensPedido = Array.isArray(itensCarrinho) && itensCarrinho.length > 0
    ? itensCarrinho
    : produtoParam
      ? [{ ...produtoParam, quantidade }]
      : [];
  const produto = itensPedido[0] || { titulo: 'Pedido', preco: '0,00' };

  const precoSubtotal = itensPedido.reduce(
    (total, item) => total + precoNumero(item.preco) * item.quantidade,
    0
  );

  // Opções de frete
  const opcoesFrente = [
    { id: 'economico', nome: 'Econômico', prazo: '15-20 dias', taxa: 10.00, icone: 'package', tipoIcone: 'material' },
    { id: 'normal', nome: 'Padrão', prazo: '10-15 dias', taxa: 20.00, icone: 'truck', tipoIcone: 'material' },
    { id: 'expresso', nome: 'Expresso', prazo: '5-7 dias', taxa: 45.00, icone: 'truck-fast', tipoIcone: 'material' },
  ];

  const freteAtual = opcoesFrente.find(f => f.id === freteSelecionado);
  const taxaFrete = freteAtual?.taxa || 20.00;
  const precoTotal = formatarPreco(precoSubtotal + taxaFrete);

  const finalizarPagamento = () => {
    if (tipo === 'carrinho') {
      limparCarrinho();
    }

    navigation.navigate('Home');
  };

  const renderIcone = (forma) => {
    if (forma.tipo === 'ionicons') {
      return <Ionicons name={forma.icone} size={32} color="#FFF" />;
    } else if (forma.tipo === 'material-community') {
      return <MaterialCommunityIcons name={forma.icone} size={32} color="#FFF" />;
    }
  };

  const renderFormularioPagamento = () => {
    switch (pagamentoSelecionado) {
      case 'pix':
        return (
          <View style={estilos.formularioContainer}>
            <Text style={estilos.tituloFormulario}>Código PIX</Text>
            <View style={estilos.pixContainer}>
              <MaterialCommunityIcons name="qrcode" size={150} color="#8B5CF6" />
              <Text style={estilos.pixTexto}>Escaneie o código QR com seu banco</Text>
            </View>
            <View style={estilos.copiarContainer}>
              <Text style={estilos.chavePix}>12345678-1234-1234-1234-123456789012</Text>
              <TouchableOpacity style={estilos.botaoCopiar}>
                <Ionicons name="copy" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'credito':
        return (
          <View style={estilos.formularioContainer}>
            <Text style={estilos.tituloFormulario}>Dados do Cartão</Text>
            <View style={estilos.inputContainer}>
              <Text style={estilos.label}>Número do Cartão</Text>
              <View style={estilos.input}>
                <MaterialCommunityIcons name="credit-card" size={20} color="#31533A" />
                <Text style={estilos.placeholder}>0000 0000 0000 0000</Text>
              </View>
            </View>

            <View style={estilos.duasColunasContainer}>
              <View style={[estilos.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={estilos.label}>Validade</Text>
                <View style={estilos.input}>
                  <Text style={estilos.placeholder}>MM/AA</Text>
                </View>
              </View>
              <View style={[estilos.inputContainer, { flex: 1 }]}>
                <Text style={estilos.label}>CVV</Text>
                <View style={estilos.input}>
                  <Text style={estilos.placeholder}>***</Text>
                </View>
              </View>
            </View>

            <View style={estilos.inputContainer}>
              <Text style={estilos.label}>Parcelamento</Text>
              <View style={estilos.selectContainer}>
                <Text style={estilos.selectTexto}>1x de R$ {formatarPreco(precoSubtotal)}</Text>
                <Ionicons name="chevron-down" size={20} color="#31533A" />
              </View>
            </View>
          </View>
        );

      case 'debito':
        return (
          <View style={estilos.formularioContainer}>
            <Text style={estilos.tituloFormulario}>Cartão de Débito</Text>
            <View style={estilos.inputContainer}>
              <Text style={estilos.label}>Número do Cartão</Text>
              <View style={estilos.input}>
                <MaterialCommunityIcons name="credit-card" size={20} color="#31533A" />
                <Text style={estilos.placeholder}>0000 0000 0000 0000</Text>
              </View>
            </View>

            <View style={estilos.duasColunasContainer}>
              <View style={[estilos.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={estilos.label}>Validade</Text>
                <View style={estilos.input}>
                  <Text style={estilos.placeholder}>MM/AA</Text>
                </View>
              </View>
              <View style={[estilos.inputContainer, { flex: 1 }]}>
                <Text style={estilos.label}>CVV</Text>
                <View style={estilos.input}>
                  <Text style={estilos.placeholder}>***</Text>
                </View>
              </View>
            </View>

            <Text style={[estilos.label, { marginTop: 12 }]}>Será debitado imediatamente na sua conta</Text>
          </View>
        );

      case 'boleto':
        return (
          <View style={estilos.formularioContainer}>
            <Text style={estilos.tituloFormulario}>Boleto Bancário</Text>
            <View style={estilos.boletoInfo}>
              <Ionicons name="document-text-outline" size={40} color="#F59E0B" />
              <Text style={estilos.boletoTexto}>Seu boleto será gerado na próxima tela</Text>
              <Text style={estilos.boletoSubTexto}>Vencimento em 3 dias úteis</Text>
            </View>
          </View>
        );

      case 'dinheiro':
        return (
          <View style={estilos.formularioContainer}>
            <Text style={estilos.tituloFormulario}>Pagamento na Entrega</Text>
            <View style={estilos.dinheiroInfo}>
              <MaterialCommunityIcons name="cash-multiple" size={40} color="#10B981" />
              <Text style={estilos.dinheiroTexto}>Pague com dinheiro na entrega</Text>
              <Text style={estilos.dinheiroSubTexto}>Receba o troco do valor informado</Text>
            </View>
          </View>
        );

      case 'transferencia':
        return (
          <View style={estilos.formularioContainer}>
            <Text style={estilos.tituloFormulario}>Dados para Transferência</Text>
            <View style={estilos.bancoContainer}>
              <Text style={estilos.bancoLabel}>Banco:</Text>
              <Text style={estilos.bancoValor}>Banco do Brasil - 001</Text>

              <Text style={estilos.bancoLabel}>Agência:</Text>
              <Text style={estilos.bancoValor}>1234</Text>

              <Text style={estilos.bancoLabel}>Conta:</Text>
              <Text style={estilos.bancoValor}>123456-7</Text>

              <Text style={estilos.bancoLabel}>Titular:</Text>
              <Text style={estilos.bancoValor}>Loja de Livros</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={estilos.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={estilos.content} showsVerticalScrollIndicator={false}>
        {/* Resumo do Pedido */}
        <View style={estilos.resumoCard}>
          <Text style={estilos.resumoTitulo}>Resumo do Pedido</Text>

          {itensPedido.map((item) => (
            <View key={item.id || item.titulo} style={estilos.itemPedido}>
              <View style={estilos.itemResumoTexto}>
                <Text style={estilos.itemNome}>{item.titulo}</Text>
                <Text style={estilos.itemLabel}>Quantidade: {item.quantidade}</Text>
              </View>
              <Text style={estilos.itemPreco}>
                R$ {formatarPreco(precoNumero(item.preco) * item.quantidade)}
              </Text>
            </View>
          ))}

          <View style={estilos.itemPedido}>
            <Text style={estilos.itemLabel}>Subtotal:</Text>
            <Text style={estilos.itemLabel}>R$ {formatarPreco(precoSubtotal)}</Text>
          </View>

          <View style={estilos.itemPedido}>
            <Text style={estilos.itemLabel}>Frete ({freteAtual?.nome}):</Text>
            <Text style={estilos.itemLabel}>R$ {taxaFrete.toFixed(2).replace('.', ',')}</Text>
          </View>

          <View style={estilos.divisor} />

          <View style={estilos.totalContainer}>
            <Text style={estilos.totalLabel}>Total</Text>
            <Text style={estilos.totalValor}>R$ {precoTotal}</Text>
          </View>
        </View>

        {/* Opções de Entrega */}
        <Text style={estilos.sectionTitle}>Opções de Entrega</Text>

        <View style={estilos.freteContainer}>
          {opcoesFrente.map((opcao) => (
            <TouchableOpacity
              key={opcao.id}
              style={[
                estilos.freteCard,
                freteSelecionado === opcao.id && estilos.freteSelecionado,
              ]}
              onPress={() => setFreteSelecionado(opcao.id)}
            >
              <View style={estilos.freteHeaderContainer}>
                <View style={estilos.freteIconContainer}>
                  {opcao.tipoIcone === 'material' ? (
                    <MaterialCommunityIcons name={opcao.icone} size={24} color="#31533A" />
                  ) : (
                    <Image source={opcao.imagem} style={estilos.freteImagem} />
                  )}
                </View>
                <View style={estilos.freteInfoContainer}>
                  <Text style={estilos.freteNome}>{opcao.nome}</Text>
                  <Text style={estilos.fretePrazo}>{opcao.prazo}</Text>
                </View>
                <Text style={estilos.fretePrice}>R$ {opcao.taxa.toFixed(2).replace('.', ',')}</Text>
              </View>
              {freteSelecionado === opcao.id && (
                <View style={estilos.freteCheckmark}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* <Text style={estilos.totalLabel}>Total</Text>
            <Text style={estilos.totalValor}>R$ {precoTotal}</Text>
          </View>
        </View>

        {/* Formas de Pagamento */}
        <Text style={estilos.sectionTitle}>Forma de Pagamento</Text>

        <View style={estilos.formasPagamentoContainer}>
          {formasPagamento.map((forma) => (
            <TouchableOpacity
              key={forma.id}
              style={[
                estilos.formaPagamentoCard,
                pagamentoSelecionado === forma.id && estilos.formaPagamentoSelecionada,
              ]}
              onPress={() => {
                setPagamentoSelecionado(forma.id);
                setEtapa(2);
              }}
            >
              <View style={[estilos.iconContainer, { backgroundColor: forma.cor }]}>
                {renderIcone(forma)}
              </View>
              <View style={estilos.formaPagamentoInfo}>
                <Text style={estilos.formaPagamentoNome}>{forma.nome}</Text>
                <Text style={estilos.formaPagamentoDescricao}>{forma.descricao}</Text>
              </View>
              {pagamentoSelecionado === forma.id && (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {pagamentoSelecionado && renderFormularioPagamento()}

        {pagamentoSelecionado && (
          <View style={estilos.acaoContainer}>
            <TouchableOpacity
              style={estilos.botaoCancelar}
              onPress={() => navigation.goBack()}
            >
              <Text style={estilos.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoConfirmar}
              onPress={finalizarPagamento}
            >
              <Text style={estilos.botaoConfirmarTexto}>Confirmar Pagamento</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
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
    height: 56,
    backgroundColor: '#5B7A4C',
    paddingTop: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
  },
  resumoCard: {
    backgroundColor: '#FFF8E5',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  resumoTitulo: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F3A24',
    marginBottom: 12,
  },
  itemPedido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: '700',
    color: '#42503E',
  },
  itemResumoTexto: {
    flex: 1,
    marginRight: 12,
  },
  itemPreco: {
    fontSize: 14,
    fontWeight: '800',
    color: '#31533A',
  },
  itemLabel: {
    fontSize: 13,
    color: '#5C6C44',
    fontWeight: '600',
  },
  divisor: {
    height: 1,
    backgroundColor: '#E0D9C9',
    marginVertical: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F3A24',
  },
  totalValor: {
    fontSize: 20,
    fontWeight: '900',
    color: '#16382B',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F3A24',
    marginBottom: 12,
  },
  formasPagamentoContainer: {
    marginBottom: 24,
  },
  formaPagamentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0D9C9',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  formaPagamentoSelecionada: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  formaPagamentoInfo: {
    flex: 1,
  },
  formaPagamentoNome: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F3A24',
  },
  formaPagamentoDescricao: {
    fontSize: 12,
    color: '#5C6C44',
    fontWeight: '500',
    marginTop: 2,
  },
  formularioContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tituloFormulario: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F3A24',
    marginBottom: 14,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#31533A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E0D9C9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F7F0',
  },
  placeholder: {
    marginLeft: 8,
    color: '#B8B8B8',
    fontSize: 14,
    fontWeight: '600',
  },
  duasColunasContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  selectContainer: {
    borderWidth: 1.5,
    borderColor: '#E0D9C9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F7F0',
  },
  selectTexto: {
    color: '#31533A',
    fontSize: 14,
    fontWeight: '600',
  },
  pixContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  pixTexto: {
    marginTop: 12,
    fontSize: 14,
    color: '#31533A',
    fontWeight: '700',
    textAlign: 'center',
  },
  copiarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
  chavePix: {
    flex: 1,
    fontSize: 12,
    color: '#31533A',
    fontWeight: '600',
  },
  botaoCopiar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  boletoInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  boletoTexto: {
    marginTop: 12,
    fontSize: 14,
    color: '#31533A',
    fontWeight: '700',
    textAlign: 'center',
  },
  boletoSubTexto: {
    marginTop: 6,
    fontSize: 12,
    color: '#5C6C44',
    fontWeight: '500',
    textAlign: 'center',
  },
  dinheiroInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  dinheiroTexto: {
    marginTop: 12,
    fontSize: 14,
    color: '#31533A',
    fontWeight: '700',
    textAlign: 'center',
  },
  dinheiroSubTexto: {
    marginTop: 6,
    fontSize: 12,
    color: '#5C6C44',
    fontWeight: '500',
    textAlign: 'center',
  },
  bancoContainer: {
    backgroundColor: '#F7F4D5',
    borderRadius: 12,
    padding: 14,
  },
  bancoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#31533A',
    marginTop: 8,
  },
  bancoValor: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16382B',
    marginTop: 2,
    marginBottom: 4,
  },
  acaoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  botaoCancelar: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#31533A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCancelarTexto: {
    color: '#31533A',
    fontSize: 15,
    fontWeight: '800',
  },
  botaoConfirmar: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#31533A',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  botaoConfirmarTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    marginRight: 8,
  },
  freteContainer: {
    marginBottom: 24,
  },
  freteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E0D9C9',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  freteSelecionado: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  freteHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  freteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F7F4D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  freteInfoContainer: {
    flex: 1,
  },
  freteNome: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F3A24',
  },
  fretePrazo: {
    fontSize: 12,
    color: '#5C6C44',
    fontWeight: '500',
    marginTop: 2,
  },
  fretePrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#31533A',
  },
  freteCheckmark: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  freteImagem: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
