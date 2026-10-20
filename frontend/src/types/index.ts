export type Categoria = 'Petiscos' | 'Bebidas' | 'Sobremesas';
export type Tamanho = 'P' | 'M' | 'G' | '350g' | '500g' | 'Único';

export interface ProdutoCardapio {
    id: string;
    nome: string;
    categoria: Categoria;
    descricao?: string;
    precos: {
        tamanho: Tamanho;
        valor: number;
    }[];
}

export interface ItemComanda {
    id: string;
    produtoId: string;
    nome: string;
    tamanho: Tamanho;
    quantidade: number;
    precoUnitario: number;
    observacao?: string;
    enviadoCozinha: boolean;
}

export interface Comanda {
    id: string;
    numeroPedido: number;
    mesa: string;
    // cliente: string
    itens: ItemComanda[]
    desconto?: number;
    subtotal:number;
    total: number;
    status: 'aberta' | 'fechada';
    dataCriacao: string;
}