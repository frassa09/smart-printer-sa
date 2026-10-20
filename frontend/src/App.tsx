import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CARDAPIO_COMPLETO } from './data/cardapio';
import { CardapioPage } from './pages/CardapioPage';
import { CozinhaPage } from './pages/CozinhaPage'
import { CaixaPage } from './pages/CaixaPage'

export default function App() {
  

  return (
    <BrowserRouter>
      
      {/* Menu de navegação simples */}
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Cardápio</Link>
        <Link to="/cozinha">Cozinha</Link>
        <Link to="/caixa">Caixa</Link> 
      </nav>
      <Routes>
        {/* definir as rotas pelos elementos/paginas */}
        <Route path="/" element={<CardapioPage/>} />
        <Route path="/cozinha" element={<CozinhaPage/>} />
        <Route path="/caixa" element={<CaixaPage/>} />
      </Routes>
    </BrowserRouter>
  )
}


