// src/services/comandaService.ts
import type { Comanda, ItemComanda, Tamanho} from '../types';

export const comandaService = {
  criarOuAtualizar(comandaAntiga: Comanda | undefined, mesa: string, itens: ItemComanda[]): Comanda {
    const subtotal = itens.reduce((acc, i) => acc + i.precoUnitario * i.quantidade, 0);
    const desconto = comandaAntiga?.desconto || 0;

    return {
      id: comandaAntiga?.id || crypto.randomUUID(),
      numeroPedido: comandaAntiga?.numeroPedido || Math.floor(1000 + Math.random() * 9000),
      mesa,
      itens,
      desconto,
      subtotal,
      total: Math.max(0, subtotal - desconto),
      status: 'aberta',
      dataCriacao: comandaAntiga?.dataCriacao || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  },
  // Exemplo aceitando quantidade dinâmica (padrão = 1)
    atualizarOuAdicionarItem(
    itensAtuais: ItemComanda[],
    nome: string,
    produtoId: string,
    tamanho: Tamanho,
    precoUnitario: number,
    qtdAdicionar: number = 1 // <-- Flexibilidade para adicionar N unidades
    ): ItemComanda[] {
    const jaExiste = itensAtuais.some(
        i => i.produtoId === produtoId && i.tamanho === tamanho && !i.enviadoCozinha
    );

    if (jaExiste) {
        return itensAtuais.map(i =>
        i.produtoId === produtoId && i.tamanho === tamanho && !i.enviadoCozinha
            ? { ...i, quantidade: i.quantidade + qtdAdicionar }
            : i
        );
    }

    return [
        ...itensAtuais,
        {
        id: crypto.randomUUID(),
        produtoId,
        nome,
        tamanho,
        quantidade: qtdAdicionar,
        precoUnitario,
        enviadoCozinha: false
        }
    ];
    }
};