import { useState, useEffect } from 'react';
import { CARDAPIO_COMPLETO } from '../data/cardapio';
import { comandaStorage } from '../services/comandaStorage';
import { printerService } from '../services/printerService';
import { comandaService } from '../services/comandaService';
import type { ItemComanda, Tamanho } from '../types';

export function CardapioPage() {
  const [mesa, setMesa] = useState('');
  const [itens, setItens] = useState<ItemComanda[]>([]);

  // Carrega itens salvos ao digitar a Mesa
  useEffect(() => {
    if (!mesa.trim()) return setItens([]);
    const aberta = comandaStorage.obterTodas().find(c => c.mesa === mesa && c.status === 'aberta');
    setItens(aberta?.itens || []);
  }, [mesa]);

  // Chama o serviço em 1 linha
  const adicionarItem = (nome: string, produtoId: string, tamanho: Tamanho, precoUnitario: number) => {
    setItens(prev => comandaService.atualizarOuAdicionarItem(prev, nome, produtoId, tamanho, precoUnitario));
  };

  // Dispara o pedido (HTTP + Storage)
  const dispararPedido = async () => {
    const pendentes = itens.filter(i => !i.enviadoCozinha);
    if (!mesa || pendentes.length === 0) return alert('Informe a mesa e selecione itens pendentes!');

    try {
      await printerService.enviarCozinha(mesa, pendentes);
    } catch {
      alert('Aviso: Impressora offline. Pedido gravado localmente.');
    }

    const itensAtualizados = itens.map(i => ({ ...i, enviadoCozinha: true }));
    setItens(itensAtualizados);

    const comandaAntiga = comandaStorage.obterTodas().find(c => c.mesa === mesa && c.status === 'aberta');
    const comandaPronta = comandaService.criarOuAtualizar(comandaAntiga, mesa, itensAtualizados);

    comandaStorage.salvar(comandaPronta);
    alert('Pedido enviado com sucesso!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Atendimento / Cardápio</h2>
      
      {/* Campo Mesa */}
      <div>
        <input 
          placeholder="Mesa" 
          value={mesa} 
          onChange={e => setMesa(e.target.value)} 
          style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)' }} 
        />
      </div>

      {/* Lista de Produtos do Cardápio */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3>Produtos</h3>
        {CARDAPIO_COMPLETO.map(prod => (
          <div key={prod.id} style={{ border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '6px' }}>
            <strong>{prod.nome}</strong>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {prod.precos.map(p => (
                <button 
                  key={p.tamanho} 
                  onClick={() => adicionarItem(prod.nome, prod.id, p.tamanho, p.valor)} 
                  style={{ padding: '0.4rem 0.8rem', cursor: 'pointer' }}
                >
                  + {p.tamanho} (R$ {p.valor.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Resumo da Comanda */}
      <section style={{ borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
        <h3>Itens da Comanda ({itens.length})</h3>
        <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>
          {itens.map(i => (
            <li key={i.id} style={{ margin: '0.25rem 0' }}>
              {i.quantidade}x {i.nome} ({i.tamanho}) - R$ {(i.precoUnitario * i.quantidade).toFixed(2)}{' '}
              <small>{i.enviadoCozinha ? '✅ enviado' : '⏳ pendente'}</small>
            </li>
          ))}
        </ul>
      </section>

      {/* Botão Ação */}
      <button 
        onClick={dispararPedido} 
        disabled={!mesa || itens.length === 0} 
        style={{ padding: '1rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Enviar Pedido (Imprimir Cozinha)
      </button>
    </div>
  );
}