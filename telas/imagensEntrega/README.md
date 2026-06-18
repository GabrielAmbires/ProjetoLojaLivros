# Imagens de Entrega

Coloque aqui as imagens de caminhão/entrega para o checkout.

## Como adicionar imagens customizadas

Para usar imagens personalizadas em vez dos ícones padrão, adicione os arquivos PNG nesta pasta:

1. **economico.png** - Imagem para entrega econômica
2. **normal.png** - Imagem para entrega padrão
3. **expresso.png** - Imagem para entrega expressa

Depois, atualize o arquivo `TelaCheckout.js` para importar as imagens:

```javascript
const opcoesFrente = [
  { 
    id: 'economico', 
    nome: 'Econômico', 
    prazo: '15-20 dias', 
    taxa: 10.00, 
    imagem: require('./imagensEntrega/economico.png'),
    tipoIcone: 'imagem'
  },
  // ... outras opções
];
```

E modifique a renderização para:

```javascript
tipoIcone === 'imagem' ? (
  <Image source={opcao.imagem} style={estilos.freteImagem} />
) : (
  <MaterialCommunityIcons name={opcao.icone} size={24} color="#31533A" />
)
```

**Tamanho recomendado:** 100x100 px com fundo transparente.

Atualmente, o checkout está usando ícones do Material Community Icons:
- 📦 Econômico = package
- 🚚 Padrão = truck
- ⚡ Expresso = truck-fast
