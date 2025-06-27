using MiniCoreVentas.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCoreVentas.Server.Services
{
    public class MiniCoreService : IMiniCoreService
    {
        private readonly List<Vendedor> _vendedores;
        private readonly List<Regla> _reglas;
        private readonly List<Venta> _ventas;

        public MiniCoreService()
        {
           
            _vendedores = new List<Vendedor>
            {
                new Vendedor { Id = 1, Nombre = "Jorge Negrete" },
                new Vendedor { Id = 2, Nombre = "Ricardo Vega" },
                new Vendedor { Id = 3, Nombre = "Diego Pérez" },
                new Vendedor { Id = 4, Nombre = "Martin Torres" }
            };

            _reglas = new List<Regla>
            {
                new Regla { Id = 1, MontoMinimo = 600, Porcentaje = 0.06M },
                new Regla { Id = 2, MontoMinimo = 500, Porcentaje = 0.08M },
                new Regla { Id = 3, MontoMinimo = 800, Porcentaje = 0.10M },
                new Regla { Id = 4, MontoMinimo = 1000, Porcentaje = 1.15M }
            };

            _ventas = new List<Venta>
            {
                new Venta { Id = 1, FechaVenta = new DateTime(2025, 5, 21), Monto = 400, VendedorId = 1, ReglaId = 1 },
                new Venta { Id = 2, FechaVenta = new DateTime(2025, 5, 29), Monto = 600, VendedorId = 2, ReglaId = 2 },
                new Venta { Id = 3, FechaVenta = new DateTime(2025, 6, 3), Monto = 200, VendedorId = 2, ReglaId = 1 },
                new Venta { Id = 4, FechaVenta = new DateTime(2025, 6, 9), Monto = 300, VendedorId = 1, ReglaId = 1 },
                new Venta { Id = 5, FechaVenta = new DateTime(2025, 6, 11), Monto = 900, VendedorId = 3, ReglaId = 3 },
                new Venta { Id = 6, FechaVenta = new DateTime(2025, 6, 14), Monto = 500, VendedorId = 1, ReglaId = 2 }
            };
        }

        public async Task<Dictionary<string, decimal>> CalcularComisionesPorRango(DateTime fechaInicio, DateTime fechaFin)
        {
            var resultado = new Dictionary<string, decimal>();

            var ventasFiltradas = _ventas
                .Where(v => v.FechaVenta >= fechaInicio && v.FechaVenta <= fechaFin)
                .ToList();

            foreach (var vendedor in _vendedores)
            {
                var ventasDelVendedor = ventasFiltradas
                    .Where(v => v.VendedorId == vendedor.Id)
                    .ToList();

                decimal totalComision = 0;

                foreach (var venta in ventasDelVendedor)
                {
                    var regla = _reglas.FirstOrDefault(r => r.Id == venta.ReglaId);
                    if (regla != null && venta.Monto >= regla.MontoMinimo)
                    {
                        totalComision += venta.Monto * regla.Porcentaje;
                    }
                }

                resultado.Add(vendedor.Nombre, totalComision);
            }

            return await Task.FromResult(resultado);
        }
    }
}
