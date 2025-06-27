using Microsoft.AspNetCore.Mvc;
using MiniCoreVentas.Server.Services;

namespace MiniCoreVentas.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MiniCoreController : ControllerBase
    {
        private readonly IMiniCoreService _miniCoreService;

        public MiniCoreController(IMiniCoreService miniCoreService)
        {
            _miniCoreService = miniCoreService;
        }

        [HttpGet("calcular-comisiones")]
        public async Task<IActionResult> CalcularComisiones([FromQuery] DateTime fechaInicio, [FromQuery] DateTime fechaFin)
        {
            var resultado = await _miniCoreService.CalcularComisionesPorRango(fechaInicio, fechaFin);
            return Ok(resultado);
        }
    }
}
