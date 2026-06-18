import React, { createContext, useContext, useMemo, useState } from 'react';

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setItens((atuais) => {
      const itemExistente = atuais.find((item) => item.id === produto.id);

      if (itemExistente) {
        return atuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...atuais, { ...produto, quantidade }];
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setItens((atuais) => atuais.filter((item) => item.id !== produtoId));
  };

  const alterarQuantidade = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }

    setItens((atuais) =>
      atuais.map((item) =>
        item.id === produtoId ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const produtoEstaFavoritado = (produtoId) =>
    favoritos.some((item) => item.id === produtoId);

  const adicionarAosFavoritos = (produto) => {
    setFavoritos((atuais) => {
      const jaFavoritado = atuais.some((item) => item.id === produto.id);

      if (jaFavoritado) {
        return atuais;
      }

      return [...atuais, produto];
    });
  };

  const removerDosFavoritos = (produtoId) => {
    setFavoritos((atuais) => atuais.filter((item) => item.id !== produtoId));
  };

  const alternarFavorito = (produto) => {
    setFavoritos((atuais) => {
      const jaFavoritado = atuais.some((item) => item.id === produto.id);

      if (jaFavoritado) {
        return atuais.filter((item) => item.id !== produto.id);
      }

      return [...atuais, produto];
    });
  };

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
  const totalFavoritos = favoritos.length;

  const valor = useMemo(
    () => ({
      itens,
      totalItens,
      favoritos,
      totalFavoritos,
      adicionarAoCarrinho,
      removerDoCarrinho,
      alterarQuantidade,
      limparCarrinho,
      produtoEstaFavoritado,
      adicionarAosFavoritos,
      removerDosFavoritos,
      alternarFavorito,
    }),
    [itens, totalItens, favoritos, totalFavoritos]
  );

  return (
    <CarrinhoContext.Provider value={valor}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);

  if (!contexto) {
    throw new Error('useCarrinho precisa estar dentro de CarrinhoProvider');
  }

  return contexto;
}
