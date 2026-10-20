import { useState, useEffect } from 'react';
import { comandaStorage } from '../services/comandaStorage';
import type { Comanda } from '../types';

export function CozinhaPage() {
  const [comandas, setComandas] = useState<Comanda[]>([]);

  // Carrega as comandas abertas
  useEffect(() => {
    const abertas = comandaStorage.obterTodas().filter(c => c.status === 'aberta');
    setComandas(abertas);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>Cozinha / Pedidos</h2>

      {comandas.length === 0 ? (
        <p style={{ marginTop: '1rem', color: '#666' }}>Nenhum pedido pendente no momento.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {comandas.map(c => (
            <div key={c.id} style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Mesa {c.mesa}</h3>
                <small style={{ color: '#666' }}>{c.dataCriacao}</small>
              </div>

              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.75rem' }}>
                {c.itens.map(item => (
                  <li key={item.id} style={{ margin: '0.25rem 0' }}>
                    <strong>{item.quantidade}x</strong> {item.nome} ({item.tamanho})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}