import type { Comanda } from '../types';

const KEY = '@comandas_app';

export const comandaStorage = {
  obterTodas(): Comanda[] {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  },

  // 2. Escrita direta (filtra a antiga se existir e adiciona a nova)
  salvar: (novaComanda: Comanda): void => {
    const atualizadas = comandaStorage.obterTodas()
      .filter(c => c.id !== novaComanda.id);

    localStorage.setItem(KEY, JSON.stringify([...atualizadas, novaComanda]));
  }
};