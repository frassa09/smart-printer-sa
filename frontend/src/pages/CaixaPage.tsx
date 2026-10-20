import { useState } from 'react';
import { comandaStorage } from '../services/comandaStorage';
import { printerService } from '../services/printerService';
import type { Comanda } from '../types';

export function CaixaPage() {
  const [mesaBusca, setMesaBusca] = useState('');
  const [comanda, setComanda] = useState<Comanda | null>(null);

  // Busca a comanda aberta da mesa digitada
  const buscarComanda = () => {
    if (!mesaBusca.trim()) return;
    const encontrada = comandaStorage.obterTodas().find(c => c.mesa === mesaBusca && c.status === 'aberta');
    setComanda(encontrada || null);
    if (!encontrada) alert(`Nenhuma comanda aberta para a Mesa ${mesaBusca}`);
  };

  // Imprime o cupom no caixa e fecha a conta
  const encerrarConta = async () => {
    if (!comanda) return;

    try {
      await printerService.enviarCaixa(comanda);
    } catch {
      alert('Aviso: Impressora offline. A conta será encerrada localmente.');
    }

    const comandaFechada: Comanda = { ...comanda, status: 'fechada' };
    comandaStorage.salvar(comandaFechada);

    alert(`Mesa ${comanda.mesa} encerrada com sucesso!`);
    setComanda(null);
    setMesaBusca('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Caixa / Fechamento</h2>

      {/* Busca da Mesa */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          placeholder="Número da Mesa"
          value={mesaBusca}
          onChange={e => setMesaBusca(e.target.value)}
          style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border)' }}
        />
        <button onClick={buscarComanda} style={{ padding: '0.6rem 1.2rem', cursor: 'pointer' }}>
          Buscar
        </button>
      </div>

      {/* Resumo da Conta */}
      {comanda && (
        <div style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3>Resumo - Mesa {comanda.mesa}</h3>

          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {comanda.itens.map(i => (
              <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.25rem 0' }}>
                <span>{i.quantidade}x {i.nome} ({i.tamanho})</span>
                <span>R\$ {(i.precoUnitario * i.quantidade).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.5rem', textAlign: 'right' }}>
            <h3>Total: R\$ {comanda.total.toFixed(2)}</h3>
          </div>

          <button
            onClick={encerrarConta}
            style={{ padding: '1rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Encerrar e Imprimir Caixa
          </button>
        </div>
      )}
    </div>
  );
}