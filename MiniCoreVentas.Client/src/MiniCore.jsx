import React, { useState } from 'react';
import axios from 'axios';

function MiniCore() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [resultados, setResultados] = useState(null);
    const [error, setError] = useState('');

    
    const vendedores = [
        { id: 1, nombre: "Jorge Negrete" },
        { id: 2, nombre: "Ricardo Vega" },
        { id: 3, nombre: "Diego Pérez" },
        { id: 4, nombre: "Martin Torres" }
    ];

    const reglas = [
        { id: 1, montoMinimo: 600, porcentaje: 0.06 },
        { id: 2, montoMinimo: 500, porcentaje: 0.08 },
        { id: 3, montoMinimo: 800, porcentaje: 0.10 },
        { id: 4, montoMinimo: 1000, porcentaje: 1.15 }
    ];

    const ventas = [
        { id: 1, fecha: "2025-05-21", monto: 400, vendedorId: 1, reglaId: 1 },
        { id: 2, fecha: "2025-05-29", monto: 600, vendedorId: 2, reglaId: 2 },
        { id: 3, fecha: "2025-06-03", monto: 200, vendedorId: 2, reglaId: 1 },
        { id: 4, fecha: "2025-06-09", monto: 300, vendedorId: 1, reglaId: 1 },
        { id: 5, fecha: "2025-06-11", monto: 900, vendedorId: 3, reglaId: 3 },
        { id: 6, fecha: "2025-06-14", monto: 500, vendedorId: 1, reglaId: 2 }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResultados(null);

        try {
            const response = await axios.get('http://localhost:5295/api/MiniCore/calcular-comisiones', {
                params: {
                    fechaInicio,
                    fechaFin
                }
            });
            setResultados(response.data);
        } catch (err) {
            setError('Error al obtener los resultados.');
            console.error('Error en la petición:', err);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', color: 'white' }}>
            <h1>MiniCore - Cálculo de Comisiones</h1>

            <p>Los siguientes son los datos de ejemplo que utiliza el sistema para calcular las comisiones.</p>

            <h3>Tabla de Vendedores</h3>
            <table border="1" cellPadding="5" style={{ marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores.map(v => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Tabla de Reglas de Comisión</h3>
            <table border="1" cellPadding="5" style={{ marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Monto Mínimo</th>
                        <th>Porcentaje (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {reglas.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>${r.montoMinimo}</td>
                            <td>{(r.porcentaje * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Tabla de Ventas</h3>
            <table border="1" cellPadding="5" style={{ marginBottom: '30px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Vendedor ID</th>
                        <th>Regla ID</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.fecha}</td>
                            <td>${venta.monto}</td>
                            <td>{venta.vendedorId}</td>
                            <td>{venta.reglaId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Filtrar por Rango de Fechas:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Fecha Inicio:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label>Fecha Fin:</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: '15px', padding: '8px 15px' }}>Calcular</button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            {resultados && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Resultados de Comisiones:</h3>
                    <table border="1" cellPadding="5">
                        <thead>
                            <tr>
                                <th>Vendedor</th>
                                <th>Comisión ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(resultados).map(([vendedor, comision]) => (
                                <tr key={vendedor}>
                                    <td>{vendedor}</td>
                                    <td>${comision.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MiniCore;
