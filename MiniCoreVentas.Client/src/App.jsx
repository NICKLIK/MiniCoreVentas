import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MiniCore from './MiniCore';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>MiniCore Ventas</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
          <Link to="/minicore">Comisiones</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Sistema de cálculo de comisiones como MiniCore</h2>} />
          <Route path="/minicore" element={<MiniCore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
