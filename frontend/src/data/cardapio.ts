import type { ProdutoCardapio } from "../types";

export const CARDAPIO_COMPLETO: ProdutoCardapio[] = [
    // Petiscos
  {
    id: 'p1',
    nome: 'Camarão Rosa Crocante',
    categoria: 'Petiscos',
    precos: [
      { tamanho: '350g', valor: 69.90 },
      { tamanho: '500g', valor: 164.90 }
    ]
  },
  {
    id: 'p2',
    nome: 'Camarão à Milanesa',
    categoria: 'Petiscos',
    precos: [
      { tamanho: '350g', valor: 84.90 },
      { tamanho: '500g', valor: 98.90 }
    ]
  },
  {
    id: 'p3',
    nome: 'Camarão Alho e Óleo (Sem casca)',
    categoria: 'Petiscos',
    descricao: 'Sem casca',
    precos: [
      { tamanho: '350g', valor: 59.90 },
      { tamanho: '500g', valor: 120.90 }
    ]
  },
  {
    id: 'p4',
    nome: 'Camarão Alho e Óleo (Inteiro)',
    categoria: 'Petiscos',
    descricao: 'Inteiro com casca',
    precos: [
      { tamanho: '350g', valor: 58.90 },
      { tamanho: '500g', valor: 79.90 }
    ]
  },
  {
    id: 'p5',
    nome: 'Lula à Doré',
    categoria: 'Petiscos',
    precos: [
      { tamanho: '350g', valor: 76.90 },
      { tamanho: '500g', valor: 80.90 }
    ]
  },
  {
    id: 'p6',
    nome: 'Isca de Peixe (Congrio)',
    categoria: 'Petiscos',
    precos: [
      { tamanho: '350g', valor: 69.90 },
      { tamanho: '500g', valor: 109.90 }
    ]
  },
  {
    id: 'p7',
    nome: 'Polvo ao Alho e Óleo',
    categoria: 'Petiscos',
    precos: [
      { tamanho: '350g', valor: 98.90 },
      { tamanho: '500g', valor: 120.00 }
    ]
  },
  {
    id: 'p8',
    nome: 'Casquinha de Siri',
    categoria: 'Petiscos',
    precos: [
      { tamanho: 'Único', valor: 29.90 }
    ]
  },

  // Bebidas
  {
    id: 'b1',
    nome: 'Cerveja Artesanal / Pilsen',
    categoria: 'Bebidas',
    precos: [
      { tamanho: 'P', valor: 12.00 }, // 350ml
      { tamanho: 'M', valor: 18.00 }, // 500ml
      { tamanho: 'G', valor: 28.00 }  // Jarra 1L
    ]
  },
  {
    id: 'b2',
    nome: 'Refrigerante / Suco Natural',
    categoria: 'Bebidas',
    precos: [
      { tamanho: 'P', valor: 7.00 },
      { tamanho: 'M', valor: 10.00 }
    ]
  },

  // Sobremesas
  {
    id: 's1',
    nome: 'Petit Gâteau com Sorvete',
    categoria: 'Sobremesas',
    precos: [
      { tamanho: 'Único', valor: 24.90 }
    ]
  },
  {
    id: 's2',
    nome: 'Pudim de Leite Condensado',
    categoria: 'Sobremesas',
    precos: [
      { tamanho: 'P', valor: 12.00 },
      { tamanho: 'M', valor: 18.00 }
    ]
  }
]