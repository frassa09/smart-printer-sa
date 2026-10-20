import type { ItemComanda, Comanda } from '../types';

const ESP32_URL = 'http://10.219.55.8:8080'; // IP ou mDNS do microcontrolador na WiFi local

export const printerService = {
  // Envia cupom sem preços para a cozinha
  async enviarCozinha(mesa: string, itens: ItemComanda[]) {
    const payload = {
      tipo: 'cozinha',
      mesa,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      itens: itens.map(i => ({ quantidade: i.quantidade, nome: i.nome, tamanho: i.tamanho, observacao: i.observacao || '' }))
    };

    return fetch(`${ESP32_URL}/imprimir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  // Envia cupom consolidado com preços para o caixa
  async enviarCaixa(comanda: Comanda) {
    const payload = {
      tipo: 'caixa',
      mesa: comanda.mesa,
      itens: comanda.itens.map(i => ({ quantidade: i.quantidade, nome: i.nome, tamanho: i.tamanho, precoUnitario: i.precoUnitario, subtotal: i.precoUnitario * i.quantidade })),
      subtotal: comanda.subtotal,
      desconto: comanda.desconto,
      total: comanda.total
    };

    return fetch(`${ESP32_URL}/imprimir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
};