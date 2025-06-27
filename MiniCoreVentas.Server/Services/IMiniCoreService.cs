using MiniCoreVentas.Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MiniCoreVentas.Server.Services
{
    public interface IMiniCoreService
    {
        Task<Dictionary<string, decimal>> CalcularComisionesPorRango(DateTime fechaInicio, DateTime fechaFin);
    }
}
